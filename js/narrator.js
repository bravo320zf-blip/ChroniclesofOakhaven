/* ============================================================
   CHRONICLES OF OAKHAVEN — DUAL-ENGINE ADVENTURE NARRATOR
   1) Smart Browser Neural Voice (window.speechSynthesis — instant,
      auto-selects Edge/Chrome/Apple Natural & Neural voices,
      sentence-chunked to avoid Chrome's 15s cutoff bug).
   2) Studio AI Narrator (Kokoro-82M via kokoro-js in-browser
      WebGPU/WASM — 100% free, audiobook-quality voices with
      sentence-by-sentence streaming & one-time browser cache).
   ============================================================ */
(function (global) {
  "use strict";

  const STORAGE_KEY = "oakhaven_narrator_prefs_v1";

  const KOKORO_VOICES = [
    { id: "bm_george",   label: "George — British Narrator (Warm)" },
    { id: "bm_lewis",    label: "Lewis — British Narrator (Deep • Bram/Borin)" },
    { id: "bm_daniel",   label: "Daniel — British Narrator (Crisp • Orin)" },
    { id: "bf_emma",     label: "Emma — British Narrator (Classic • Miri)" },
    { id: "bf_isabella", label: "Isabella — British Narrator (Lyrical • Selene)" },
    { id: "am_michael",  label: "Michael — American Narrator" },
    { id: "af_heart",    label: "Heart — Expressive Narrator" },
    { id: "bm_fable",    label: "Fable — British Storyteller" },
    { id: "am_fenrir",   label: "Fenrir — Deep Fantasy Narrator" },
    { id: "af_bella",    label: "Bella — Warm Storyteller" },
    { id: "bf_lily",     label: "Lily — British Narrator (Natural)" },
    { id: "bf_alice",    label: "Alice — British Narrator (Clear)" },
    { id: "am_onyx",     label: "Onyx — Gravelly Deep" },
    { id: "am_puck",     label: "Puck — Lively Rogue / Bard" },
    { id: "af_nicole",   label: "Nicole — Intimate Storyteller" },
    { id: "af_nova",     label: "Nova — Bright & Clear" }
  ];

  const DEFAULT_PREFS = {
    engine: "browser",       // "browser" | "kokoro"
    language: "en",          // "en" | "en-GB" | "en-US" | "en-AU"
    autoRead: false,
    rate: 1.0,
    browserVoiceName: "",
    kokoroVoice: "bm_lewis"
  };

  let prefs = { ...DEFAULT_PREFS };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && typeof saved === "object") prefs = { ...prefs, ...saved };
  } catch (_) {}

  function savePrefs() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch (_) {}
  }

  // Runtime state
  let currentText = "";
  let currentTitle = "";
  let playbackState = "idle"; // "idle" | "loading" | "playing" | "paused"
  let statusText = "Ready";
  let runToken = 0;

  // Browser speechSynthesis state
  let browserVoices = [];
  let browserQueue = [];
  let browserQueueIdx = 0;
  let activeUtterance = null; // Prevent Chrome GC mid-sentence bug
  let browserStartTimer = null;

  // Kokoro AI state (runs in a background Web Worker so UI NEVER freezes!)
  let kokoroWorker = null;
  let kokoroWorkerFailed = false;
  let kokoroWorkerReqId = 0;
  const kokoroPending = new Map();
  const kokoroAudioCache = new Map(); // LRU cache of synthesized clips (instant replay for town NPCs!)
  const MAX_AUDIO_CACHE = 45;
  let kokoroModel = null;
  let kokoroLoadingPromise = null;
  let kokoroState = "idle"; // "idle" | "loading" | "ready" | "error"
  let kokoroPct = 0;
  let kokoroStatusMsg = "Not downloaded yet (~86 MB, cached once)";
  let audioCtx = null;
  let activeSource = null;
  let activeHtmlAudio = null; // Instant pre-recorded Kokoro MP3 player

  /* ------------------------------------------------------------
     PER-CHARACTER TOWN VOICE CASTING
     ------------------------------------------------------------ */
  const NAMED_TOWN_VOICES = {
    bram:       { gender: "male",   kokoro: "bm_lewis",    pitch: 0.90, rateMul: 0.95, hints: ["ryan", "george", "guy", "daniel"] },
    armory:     { gender: "male",   kokoro: "bm_lewis",    pitch: 0.80, rateMul: 0.92, hints: ["george", "brian", "christopher", "guy"] },
    borin:      { gender: "male",   kokoro: "bm_lewis",    pitch: 0.80, rateMul: 0.92, hints: ["george", "brian", "christopher", "guy"] },
    apothecary: { gender: "female", kokoro: "bf_emma",     pitch: 1.08, rateMul: 1.04, hints: ["sonia", "libbie", "aria", "emma", "jenny"] },
    miri:       { gender: "female", kokoro: "bf_emma",     pitch: 1.08, rateMul: 1.04, hints: ["sonia", "libbie", "aria", "emma", "jenny"] },
    curios:     { gender: "male",   kokoro: "bm_daniel",   pitch: 1.03, rateMul: 0.97, hints: ["daniel", "arthur", "ryan", "oliver"] },
    orin:       { gender: "male",   kokoro: "bm_daniel",   pitch: 1.03, rateMul: 0.97, hints: ["daniel", "arthur", "ryan", "oliver"] },
    temple:     { gender: "female", kokoro: "bf_isabella", pitch: 1.04, rateMul: 0.91, hints: ["libbie", "isabella", "serena", "sonia", "martha"] },
    selene:     { gender: "female", kokoro: "bf_isabella", pitch: 1.04, rateMul: 0.91, hints: ["libbie", "isabella", "serena", "sonia", "martha"] },
    tavern_bark:{ gender: "male",   kokoro: "am_michael",  pitch: 0.96, rateMul: 1.00, hints: ["guy", "michael", "ryan", "christopher"] }
  };

  function hashString(str) {
    let h = 2166136261;
    const s = String(str || "");
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function inferGender(name = "", role = "") {
    const blob = `${name} ${role}`.toLowerCase();
    if (/\b(lady|dame|sister|mistress|priestess|witch|queen|duchess|maiden|widow|mother|herbalist|sorceress|baroness|countess|matron|abbess|she|her)\b/.test(blob)) {
      return "female";
    }
    if (/\b(elara|lyra|mira|miri|sera|selene|nadia|freya|kira|astrid|rowena|talia|sylvia|helena|morgana|evelyn|isolde|maeve|clara|maren|yara|nora|anya|zara|fiona|gwen|lila|tess|wren|aria|elena|iris|vera|cora|astrid|vespera|lydia|nadya|sasha|sonya|katya|olga)\b/.test(blob)) {
      return "female";
    }
    return "male";
  }

  function isLikelyFemaleBrowserVoice(v) {
    const n = (v?.name || "").toLowerCase();
    return /(female|sonia|libbie|aria|jenny|emma|isabella|serena|martha|samantha|victoria|karen|moira|tessa|hazel|susan|zira|eva|clara|ava|michelle|natasha|neerja|clara)/.test(n);
  }

  function getCharacterVoiceProfile(characterKey, name = "", role = "") {
    const k = String(characterKey || "").toLowerCase();
    if (NAMED_TOWN_VOICES[k]) return NAMED_TOWN_VOICES[k];

    const h = hashString(k || name || "npc");
    const gender = inferGender(name, role);
    const maleKokoro = ["bm_george", "bm_lewis", "bm_daniel", "am_michael"];
    const femaleKokoro = ["bf_emma", "bf_isabella", "af_heart"];
    const pool = gender === "female" ? femaleKokoro : maleKokoro;
    const kokoro = pool[h % pool.length];

    // Subtle deterministic pitch & cadence variation so every town patron sounds distinct
    const pitchSteps = gender === "female" ? [0.98, 1.03, 1.07, 1.11] : [0.85, 0.91, 0.97, 1.03];
    const rateSteps = [0.93, 0.97, 1.01, 1.05];
    return {
      gender,
      kokoro,
      pitch: pitchSteps[(h >>> 3) % pitchSteps.length],
      rateMul: rateSteps[(h >>> 6) % rateSteps.length],
      hints: [],
      hash: h
    };
  }

  function pickBrowserVoiceForProfile(profile) {
    const voices = browserVoices.length ? browserVoices : refreshBrowserVoices();
    if (!voices.length) return null;
    if (!profile) {
      return voices.find(v => v.name === prefs.browserVoiceName) || voices[0];
    }

    // 1. Try explicit named hints first (matching top-ranked voices)
    if (profile.hints && profile.hints.length) {
      for (const hint of profile.hints) {
        const hit = voices.find(v => v.name.toLowerCase().includes(hint));
        if (hit) return hit;
      }
    }

    // 2. Filter top-quality English voices by inferred gender so men & women sound distinct
    const topTier = voices.filter(v => scoreBrowserVoice(v) >= 50);
    const searchPool = topTier.length >= 2 ? topTier : voices;
    const genderMatches = searchPool.filter(v =>
      profile.gender === "female" ? isLikelyFemaleBrowserVoice(v) : !isLikelyFemaleBrowserVoice(v)
    );
    const finalPool = genderMatches.length ? genderMatches : searchPool;
    const idx = (profile.hash || 0) % finalPool.length;
    return finalPool[idx];
  }

  /* ------------------------------------------------------------
     TEXT CLEANING & SENTENCE CHUNKING
     ------------------------------------------------------------ */
  function cleanTextForSpeech(title, rawParas) {
    const parts = [];
    if (title) parts.push(String(title).trim());
    const arr = Array.isArray(rawParas) ? rawParas : [rawParas || ""];
    arr.forEach(p => {
      if (!p) return;
      const tmp = document.createElement("div");
      tmp.innerHTML = String(p).replace(/<br\s*\/?>/gi, ". ");
      let txt = (tmp.textContent || tmp.innerText || "").trim();
      // Strip decorative symbols/emojis while keeping normal punctuation
      txt = txt.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, " ");
      txt = txt.replace(/\s+/g, " ").trim();
      if (txt) parts.push(txt);
    });
    return parts.join(". ").replace(/\.\s*\./g, ".").replace(/!\./g, "!").replace(/\?\./g, "?").trim();
  }

  function splitIntoChunks(text, maxLen = 210, firstMaxLen = null) {
    if (!text) return [];
    // Split on sentence boundaries first
    const rawSentences = text.match(/[^.!?]+(?:[.!?]+["”’)]*|$)/g) || [text];
    const chunks = [];
    for (let s of rawSentences) {
      s = s.trim();
      if (!s) continue;
      const limit = (chunks.length === 0 && firstMaxLen) ? firstMaxLen : maxLen;
      if (s.length <= limit) {
        chunks.push(s);
      } else {
        // Split long sentences cleanly at commas/semicolons/em-dashes
        const subParts = s.split(/(?<=[,;:\u2014—])\s+/);
        let cur = "";
        for (const part of subParts) {
          const curLimit = (chunks.length === 0 && firstMaxLen) ? firstMaxLen : maxLen;
          if ((cur + " " + part).trim().length <= curLimit) {
            cur = (cur + " " + part).trim();
          } else {
            if (cur) chunks.push(cur);
            cur = part.trim();
          }
        }
        if (cur) chunks.push(cur);
      }
    }
    return chunks;
  }

  /* ------------------------------------------------------------
     SMART BROWSER VOICE RANKING (PREFERS NATURAL / NEURAL VOICES)
     ------------------------------------------------------------ */
  function matchesLanguageFilter(v, langFilter) {
    if (!v || !v.lang) return false;
    const vl = v.lang.toLowerCase().replace("_", "-");
    const fl = String(langFilter || "en").toLowerCase();
    if (fl === "en") return vl.startsWith("en");
    return vl === fl || vl.startsWith(fl + "-");
  }

  function getFilteredBrowserVoices() {
    const filtered = browserVoices.filter(v => matchesLanguageFilter(v, prefs.language));
    return filtered.length ? filtered : browserVoices;
  }

  function getFilteredKokoroVoices() {
    const fl = String(prefs.language || "en").toLowerCase();
    if (fl === "en-gb") return KOKORO_VOICES.filter(v => v.id.startsWith("b"));
    if (fl === "en-us") return KOKORO_VOICES.filter(v => v.id.startsWith("a"));
    return KOKORO_VOICES;
  }

  function scoreBrowserVoice(v) {
    if (!v || !v.lang) return -999;
    const lang = v.lang.toLowerCase();
    if (!lang.startsWith("en")) return -500;
    const name = (v.name || "").toLowerCase();
    let score = 10;

    // Top-tier native English neural voices (avoid Multilingual auto-detect voices speaking wrong languages)
    if (name.includes("natural") || name.includes("neural")) score += 100;
    if (name.includes("online")) score += 30;
    if (name.includes("enhanced") || name.includes("premium")) score += 60;
    if (name.includes("google")) score += 55;
    if (name.includes("multilingual")) score -= 45;

    // Fantasy audiobook feel: prefer UK English & warm narrator voices
    if (lang.includes("gb") || name.includes("united kingdom") || name.includes("british") || name.includes("uk")) score += 22;
    if (/(ryan|sonia|libbie|george|daniel|arthur|oliver|martha|serena|guy|aria|brian|christopher)/.test(name)) score += 16;

    // Penalize classic robotic voices so they're only used as fallback
    if (/(david|zira|mark|hazel|susan|espeak|compact)/.test(name) && !name.includes("natural") && !name.includes("neural")) {
      score -= 35;
    }
    return score;
  }

  function refreshBrowserVoices() {
    if (!global.speechSynthesis) return [];
    const all = global.speechSynthesis.getVoices() || [];
    browserVoices = all
      .filter(v => v.lang && v.lang.toLowerCase().startsWith("en"))
      .sort((a, b) => scoreBrowserVoice(b) - scoreBrowserVoice(a));

    const pool = getFilteredBrowserVoices();
    if (pool.length > 0) {
      const stillExists = pool.some(v => v.name === prefs.browserVoiceName);
      if (!prefs.browserVoiceName || !stillExists) {
        prefs.browserVoiceName = pool[0].name;
      }
    }
    renderControls();
    return browserVoices;
  }

  if (global.speechSynthesis) {
    refreshBrowserVoices();
    global.speechSynthesis.onvoiceschanged = refreshBrowserVoices;
  }

  /* ------------------------------------------------------------
     ENGINE 1: BROWSER NEURAL SPEECH SYNTHESIS
     ------------------------------------------------------------ */
  function startBrowserSpeech(text, myToken, profile = null) {
    if (!global.speechSynthesis) {
      setStatus("idle", "Browser speech unsupported — try Studio AI!");
      return;
    }
    if (browserStartTimer) { clearTimeout(browserStartTimer); browserStartTimer = null; }
    global.speechSynthesis.cancel();
    browserQueue = splitIntoChunks(text, 180);
    browserQueueIdx = 0;

    if (browserQueue.length === 0) {
      setStatus("idle", "Nothing to read");
      return;
    }

    const chosen = pickBrowserVoiceForProfile(profile);
    const shortVoice = chosen ? chosen.name.replace(/Microsoft |Google |Online \(Natural\) - |English \(United Kingdom\)|English \(United States\)/g, "").trim() : "System";
    const effRate = Math.max(0.8, Math.min(1.35, (Number(prefs.rate) || 1.0) * (profile?.rateMul || 1.0)));
    const effPitch = profile?.pitch || 1.0;

    setStatus("playing", `Speaking (${shortVoice || "Neural"})…`);

    const speakNext = () => {
      if (myToken !== runToken) return;
      if (browserQueueIdx >= browserQueue.length) {
        activeUtterance = null;
        setStatus("idle", "Finished");
        return;
      }
      const chunk = browserQueue[browserQueueIdx++];
      const u = new SpeechSynthesisUtterance(chunk);
      activeUtterance = u; // Keep strong ref so Chrome GC cannot cut off speech
      if (chosen) u.voice = chosen;
      u.lang = chosen?.lang || "en-US";
      u.rate = effRate;
      u.pitch = effPitch;
      u.onend = () => {
        if (myToken !== runToken) return;
        activeUtterance = null;
        speakNext();
      };
      u.onerror = (ev) => {
        if (myToken !== runToken) return;
        activeUtterance = null;
        if (ev?.error === "interrupted" || ev?.error === "canceled") return;
        setStatus("idle", "Voice stopped");
      };
      global.speechSynthesis.speak(u);
    };

    // Short 45ms settle after cancel() prevents Chrome/Edge from clipping the first word
    browserStartTimer = setTimeout(() => {
      browserStartTimer = null;
      if (myToken !== runToken) return;
      speakNext();
    }, 45);
  }

  /* ------------------------------------------------------------
     ENGINE 2: KOKORO-82M IN-BROWSER STUDIO AI NARRATOR
     ------------------------------------------------------------ */
  function setKokoroState(st, msg, pct = null) {
    kokoroState = st;
    if (msg) kokoroStatusMsg = msg;
    if (typeof pct === "number") kokoroPct = Math.max(0, Math.min(100, Math.round(pct)));
    if (st === "ready") kokoroPct = 100;
    if (prefs.engine === "kokoro" && playbackState !== "playing") {
      statusText = kokoroStatusMsg;
    }
    renderControls();
  }

  async function importKokoroModule() {
    const urls = [
      "https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/+esm",
      "https://esm.sh/kokoro-js@1.2.1"
    ];
    let lastErr = null;
    for (const url of urls) {
      try {
        const mod = await import(url);
        const KokoroTTS = mod.KokoroTTS || mod.default?.KokoroTTS;
        if (KokoroTTS) return KokoroTTS;
      } catch (err) {
        lastErr = err;
        console.warn(`Kokoro CDN import failed (${url}):`, err);
      }
    }
    throw lastErr || new Error("Could not load kokoro-js from CDN");
  }

  function getKokoroWorker() {
    if (kokoroWorkerFailed || typeof Worker === "undefined") return null;
    if (kokoroWorker) return kokoroWorker;
    try {
      const w = new Worker("js/kokoro_worker.js?v=2", { type: "module" });
      w.onmessage = (ev) => {
        const msg = ev.data || {};
        if (msg.type === "progress") {
          setKokoroState("loading", msg.msg, msg.pct);
        } else if (msg.type === "ready") {
          setKokoroState("ready", msg.msg, 100);
        } else if (msg.type === "init_ok") {
          const p = kokoroPending.get(msg.reqId);
          if (p) { kokoroPending.delete(msg.reqId); p.resolve(true); }
        } else if (msg.type === "init_err") {
          const p = kokoroPending.get(msg.reqId);
          if (p) { kokoroPending.delete(msg.reqId); p.reject(new Error(msg.error || "Worker init failed")); }
        } else if (msg.type === "audio") {
          const p = kokoroPending.get(msg.reqId);
          if (p) { kokoroPending.delete(msg.reqId); p.resolve({ audio: msg.samples, sampling_rate: msg.sampleRate }); }
        } else if (msg.type === "cancelled") {
          const p = kokoroPending.get(msg.reqId);
          if (p) { kokoroPending.delete(msg.reqId); p.resolve(null); }
        } else if (msg.type === "gen_err") {
          const p = kokoroPending.get(msg.reqId);
          if (p) { kokoroPending.delete(msg.reqId); p.reject(new Error(msg.error || "Synthesis failed")); }
        }
      };
      w.onerror = (err) => {
        console.warn("Kokoro Web Worker error, will fallback:", err);
        kokoroWorkerFailed = true;
        kokoroWorker = null;
        kokoroPending.forEach(p => p.reject(new Error("Web Worker error")));
        kokoroPending.clear();
      };
      kokoroWorker = w;
      return w;
    } catch (err) {
      console.warn("Kokoro Web Worker unavailable:", err);
      kokoroWorkerFailed = true;
      return null;
    }
  }

  function workerRequest(payload) {
    return new Promise((resolve, reject) => {
      const w = getKokoroWorker();
      if (!w) return reject(new Error("Worker unavailable"));
      const reqId = ++kokoroWorkerReqId;
      kokoroPending.set(reqId, { resolve, reject });
      w.postMessage({ ...payload, reqId });
    });
  }

  async function ensureKokoroModel() {
    if (kokoroState === "ready" && (kokoroWorker || kokoroModel)) {
      return true;
    }
    if (kokoroLoadingPromise) return kokoroLoadingPromise;

    kokoroLoadingPromise = (async () => {
      // Primary path: Background Web Worker (zero UI freeze!)
      const w = getKokoroWorker();
      if (w) {
        try {
          setKokoroState("loading", "⏳ Connecting to Studio AI engine…", 3);
          await workerRequest({ type: "init" });
          setKokoroState("ready", "✅ Studio AI (Kokoro) Downloaded & Ready!", 100);
          return true;
        } catch (workerErr) {
          console.warn("Kokoro Worker init failed, falling back to main thread:", workerErr);
          kokoroWorkerFailed = true;
          if (kokoroWorker) { try { kokoroWorker.terminate(); } catch (_) {} kokoroWorker = null; }
        }
      }

      // Fallback path if module workers are blocked
      setKokoroState("loading", "⏳ Connecting to Studio AI engine…", 3);
      const KokoroTTS = await importKokoroModule();

      const progressCb = (p) => {
        if (!p) return;
        if (typeof p.progress === "number") {
          const pct = Math.min(99, Math.max(4, Math.round(p.progress)));
          const fileHint = p.file ? ` (${p.file.split("/").pop()})` : "";
          setKokoroState("loading", `⏳ Downloading Studio AI: ${pct}%${fileHint}`, pct);
        } else if (p.status === "initiate") {
          setKokoroState("loading", "⏳ Starting Studio AI model download…", Math.max(kokoroPct, 5));
        } else if (p.status === "ready") {
          setKokoroState("loading", "⏳ Initializing Studio AI voice engine…", 99);
        }
      };

      const modelId = "onnx-community/Kokoro-82M-v1.0-ONNX";
      kokoroModel = await KokoroTTS.from_pretrained(modelId, {
        dtype: "q8",
        device: "wasm",
        progress_callback: progressCb
      });
      setKokoroState("ready", "✅ Studio AI (Kokoro) Downloaded & Ready!", 100);
      return kokoroModel;
    })();

    try {
      const m = await kokoroLoadingPromise;
      return m;
    } catch (err) {
      kokoroLoadingPromise = null;
      const reason = (err && (err.message || String(err))) || "Download blocked";
      setKokoroState("error", `⚠️ Studio AI unavailable (${reason.slice(0, 60)}) — using Browser Voice`, 0);
      throw err;
    }
  }

  async function synthesizeKokoroChunk(text, voiceId, speed, epoch) {
    const cacheKey = `${voiceId}|${speed.toFixed(2)}|${text}`;
    if (kokoroAudioCache.has(cacheKey)) {
      const cached = kokoroAudioCache.get(cacheKey);
      // Refresh LRU position
      kokoroAudioCache.delete(cacheKey);
      kokoroAudioCache.set(cacheKey, cached);
      return cached;
    }

    let result;
    if (kokoroWorker && !kokoroWorkerFailed) {
      result = await workerRequest({ type: "generate", text, voice: voiceId, speed, epoch });
    } else {
      if (!kokoroModel) await ensureKokoroModel();
      result = await kokoroModel.generate(text, { voice: voiceId, speed });
    }

    if (result && result.audio) {
      if (kokoroAudioCache.size >= MAX_AUDIO_CACHE) {
        const oldestKey = kokoroAudioCache.keys().next().value;
        kokoroAudioCache.delete(oldestKey);
      }
      kokoroAudioCache.set(cacheKey, result);
    }
    return result;
  }

  function ensureAudioContext() {
    if (!audioCtx) {
      const AC = global.AudioContext || global.webkitAudioContext;
      audioCtx = new AC();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  async function playRawAudioBuffer(rawAudio, myToken) {
    if (myToken !== runToken) return;
    const ctx = ensureAudioContext();
    if (ctx.state === "suspended") {
      try { await ctx.resume(); } catch (_) {}
    }
    if (myToken !== runToken) return;

    const raw = rawAudio.audio || rawAudio.data || rawAudio;
    const samples = raw instanceof Float32Array ? raw : new Float32Array(raw);
    const sampleRate = rawAudio.sampling_rate || 24000;
    const buf = ctx.createBuffer(1, samples.length, sampleRate);
    buf.copyToChannel(samples, 0);

    await new Promise((resolve) => {
      if (myToken !== runToken) return resolve();
      const src = ctx.createBufferSource();
      src.buffer = buf;
      // Keep native playbackRate = 1.0 (speed is passed natively to Kokoro to avoid pitch distortion)
      src.playbackRate.value = 1.0;
      src.connect(ctx.destination);
      activeSource = src;
      src.onended = () => {
        if (activeSource === src) activeSource = null;
        resolve();
      };
      src.start();
    });
  }

  function hashHex(str) {
    return hashString(str).toString(16).padStart(8, "0");
  }

  function findPreRecordedMp3(voiceId, text) {
    const manifest = global.OAKHAVEN_VOICE_MANIFEST;
    if (!manifest || !voiceId || !text) return null;
    const norm = String(text).trim().replace(/^[“”"']+|[“”"']+$/g, "").trim();
    const key = `${voiceId}|${hashHex(norm)}`;
    return manifest[key] || null;
  }

  function playPreRecordedMp3(url, voiceLabel, myToken) {
    return new Promise((resolve, reject) => {
      if (myToken !== runToken) return resolve(true);
      const a = new Audio(url);
      a.playbackRate = Math.max(0.8, Math.min(1.35, Number(prefs.rate) || 1.0));
      activeHtmlAudio = a;
      setStatus("playing", `Studio AI (${voiceLabel}) • Instant`);
      a.onended = () => {
        if (activeHtmlAudio === a) activeHtmlAudio = null;
        if (myToken === runToken) setStatus("idle", "Finished");
        resolve(true);
      };
      a.onerror = (err) => {
        if (activeHtmlAudio === a) activeHtmlAudio = null;
        reject(err);
      };
      a.play().catch((err) => {
        if (activeHtmlAudio === a) activeHtmlAudio = null;
        reject(err);
      });
    });
  }

  async function startKokoroSpeech(text, myToken, profile = null) {
    const voiceId = profile?.kokoro || prefs.kokoroVoice || "bm_lewis";
    const voiceLabel = (KOKORO_VOICES.find(v => v.id === voiceId)?.label || voiceId).split(" — ")[0];

    // 1. Instant pre-recorded Kokoro MP3 check (0.0s delay, zero pauses, zero CPU!)
    const mp3Url = findPreRecordedMp3(voiceId, text);
    if (mp3Url) {
      try {
        await playPreRecordedMp3(mp3Url, voiceLabel, myToken);
        return;
      } catch (err) {
        if (myToken !== runToken) return;
        console.warn("Pre-recorded MP3 failed, falling back to live Kokoro:", err);
      }
    }

    // 2. Live Kokoro Web Worker fallback (dynamic Outskirts encounters or custom voices)
    const chunks = splitIntoChunks(text, 170, 90);
    if (chunks.length === 0) {
      setStatus("idle", "Nothing to read");
      return;
    }

    let model;
    try {
      setStatus("loading", kokoroState === "loading" ? kokoroStatusMsg : "⏳ Loading Studio AI…");
      model = await ensureKokoroModel();
    } catch (err) {
      if (myToken !== runToken) return;
      console.warn("Kokoro AI Narrator failed to load, falling back to Smart Browser Voice:", err);
      startBrowserSpeech(text, myToken, profile);
      return;
    }

    if (myToken !== runToken) return;

    const effSpeed = Math.max(0.8, Math.min(1.35, (Number(prefs.rate) || 1.0) * (profile?.rateMul || 1.0)));
    setStatus("loading", `Synthesizing (${voiceLabel})…`);

    // Synthesize in the background Web Worker (prefetching next sentence off-thread
    // so playback flows seamlessly with ZERO UI freeze and ZERO audio stutter!)
    try {
      let nextPromise = synthesizeKokoroChunk(chunks[0], voiceId, effSpeed, myToken);
      for (let i = 0; i < chunks.length; i++) {
        if (myToken !== runToken) return;
        setStatus("loading", `Synthesizing (${voiceLabel}) • ${i + 1}/${chunks.length}…`);
        const rawAudio = await nextPromise;
        if (!rawAudio || myToken !== runToken) return;

        // Only prefetch in parallel when running inside the off-thread Web Worker!
        if (i + 1 < chunks.length && kokoroWorker && !kokoroWorkerFailed) {
          nextPromise = synthesizeKokoroChunk(chunks[i + 1], voiceId, effSpeed, myToken);
        }

        setStatus("playing", `Studio AI (${voiceLabel}) • ${i + 1}/${chunks.length}`);
        await playRawAudioBuffer(rawAudio, myToken);

        if (i + 1 < chunks.length && (!kokoroWorker || kokoroWorkerFailed)) {
          nextPromise = synthesizeKokoroChunk(chunks[i + 1], voiceId, effSpeed, myToken);
        }
      }
      if (myToken === runToken) {
        setStatus("idle", "Finished");
      }
    } catch (err) {
      if (myToken !== runToken) return;
      console.warn("Kokoro playback error:", err);
      setStatus("idle", "AI playback interrupted");
    }
  }

  /* ------------------------------------------------------------
     PUBLIC PLAYBACK CONTROLS
     ------------------------------------------------------------ */
  function stop(quiet = false) {
    runToken++;
    if (kokoroWorker && !kokoroWorkerFailed) {
      try { kokoroWorker.postMessage({ type: "cancel", epoch: runToken }); } catch (_) {}
    }
    if (browserStartTimer) { clearTimeout(browserStartTimer); browserStartTimer = null; }
    activeUtterance = null;
    browserQueue = [];
    browserQueueIdx = 0;
    if (global.speechSynthesis) {
      try { global.speechSynthesis.cancel(); } catch (_) {}
    }
    if (activeHtmlAudio) {
      try { activeHtmlAudio.onended = null; activeHtmlAudio.onerror = null; activeHtmlAudio.pause(); activeHtmlAudio.currentTime = 0; } catch (_) {}
      activeHtmlAudio = null;
    }
    if (activeSource) {
      try { activeSource.onended = null; activeSource.stop(); } catch (_) {}
      activeSource = null;
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    if (!quiet) {
      setStatus("idle", "Ready");
    } else {
      playbackState = "idle";
      statusText = "Ready";
    }
  }

  function play() {
    if (!currentText) return;
    if (playbackState === "paused") {
      resume();
      return;
    }
    stop(true);
    const myToken = ++runToken;
    if (prefs.engine === "kokoro") {
      startKokoroSpeech(currentText, myToken);
    } else {
      startBrowserSpeech(currentText, myToken);
    }
  }

  function pause() {
    if (playbackState !== "playing") return;
    if (activeHtmlAudio && !activeHtmlAudio.paused) {
      activeHtmlAudio.pause();
      setStatus("paused", "Paused");
      return;
    }
    if (prefs.engine === "browser" && global.speechSynthesis) {
      global.speechSynthesis.pause();
      setStatus("paused", "Paused");
    } else if (prefs.engine === "kokoro" && audioCtx && audioCtx.state === "running") {
      audioCtx.suspend().then(() => setStatus("paused", "Paused")).catch(() => {});
    }
  }

  function resume() {
    if (playbackState !== "paused") return;
    if (activeHtmlAudio && activeHtmlAudio.paused) {
      activeHtmlAudio.play().then(() => setStatus("playing", "Studio AI speaking…")).catch(() => {});
      return;
    }
    if (prefs.engine === "browser" && global.speechSynthesis) {
      global.speechSynthesis.resume();
      setStatus("playing", "Speaking…");
    } else if (prefs.engine === "kokoro" && audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().then(() => setStatus("playing", "Studio AI speaking…")).catch(() => {});
    }
  }

  function togglePlayPause() {
    if (playbackState === "playing") pause();
    else if (playbackState === "paused") resume();
    else if (playbackState === "loading") stop();
    else play();
  }

  function speakAs(characterKey, rawText, opts = {}) {
    if (opts.autoOnly && !prefs.autoRead) return;
    const cleaned = cleanTextForSpeech("", [rawText]).replace(/^[“”"']+|[“”"']+$/g, "").trim();
    if (!cleaned) return;
    stop(true);
    const myToken = ++runToken;
    const profile = getCharacterVoiceProfile(characterKey, opts.name || "", opts.role || "");
    const launch = () => {
      if (myToken !== runToken) return;
      if (prefs.engine === "kokoro") {
        startKokoroSpeech(cleaned, myToken, profile);
      } else {
        startBrowserSpeech(cleaned, myToken, profile);
      }
    };
    // Defer auto-voice slightly so building modal fade-in paints immediately
    if (opts.autoOnly) setTimeout(launch, 120);
    else launch();
  }

  function setPage(title, rawParas, allowAutoRead = true) {
    stop(true);
    currentTitle = title || "";
    currentText = cleanTextForSpeech("", rawParas);
    setStatus("idle", prefs.autoRead ? "Auto-Read active" : "Ready");
    if (allowAutoRead && prefs.autoRead && currentText) {
      play();
    }
  }

  /* ------------------------------------------------------------
     UI BINDING & RENDERING
     ------------------------------------------------------------ */
  function setStatus(newState, label) {
    playbackState = newState;
    statusText = label || "Ready";
    renderControls();
  }

  function renderControls() {
    const playBtn = document.getElementById("btn-narrator-play");
    const stopBtn = document.getElementById("btn-narrator-stop");
    const autoBtn = document.getElementById("btn-narrator-auto");
    const engineSel = document.getElementById("narrator-engine");
    const voiceSel = document.getElementById("narrator-voice");
    const rateSel = document.getElementById("narrator-rate");
    const statusEl = document.getElementById("narrator-status");

    if (playBtn) {
      if (playbackState === "playing") {
        playBtn.textContent = "⏸ Pause";
        playBtn.className = "px-3 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-amber-50 text-xs font-bold shadow transition";
      } else if (playbackState === "paused") {
        playBtn.textContent = "▶ Resume";
        playBtn.className = "px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-50 text-xs font-bold shadow transition";
      } else if (playbackState === "loading") {
        playBtn.textContent = "⏳ Loading…";
        playBtn.className = "px-3 py-1.5 rounded-lg bg-purple-900 hover:bg-purple-800 text-purple-100 text-xs font-bold shadow transition";
      } else {
        playBtn.textContent = "🔊 Read Page";
        playBtn.className = "px-3 py-1.5 rounded-lg bg-[#241910] hover:bg-[#3b2718] text-amber-200 border border-amber-700/50 text-xs font-bold shadow transition";
      }
    }

    if (stopBtn) {
      stopBtn.classList.toggle("hidden", playbackState === "idle");
    }

    if (autoBtn) {
      autoBtn.textContent = prefs.autoRead ? "Auto-Read: ON" : "Auto-Read: OFF";
      autoBtn.className = prefs.autoRead
        ? "px-2.5 py-1.5 rounded-lg bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 border border-emerald-600/60 text-[11px] font-bold transition"
        : "px-2.5 py-1.5 rounded-lg bg-amber-900/15 hover:bg-amber-900/25 text-[#3b210a] border border-amber-900/30 text-[11px] font-semibold transition";
    }

    if (engineSel && engineSel.value !== prefs.engine) {
      engineSel.value = prefs.engine;
    }

    if (rateSel && String(rateSel.value) !== String(prefs.rate)) {
      rateSel.value = String(prefs.rate);
    }

    const voiceSelectors = [
      document.getElementById("narrator-voice"),
      document.getElementById("menu-narrator-voice")
    ].filter(Boolean);

    const targetKey = prefs.engine === "kokoro"
      ? `kokoro:${prefs.language}`
      : `browser:${prefs.language}:${browserVoices.length}`;

    voiceSelectors.forEach(sel => {
      if (sel.dataset.populated !== targetKey) {
        sel.dataset.populated = targetKey;
        sel.innerHTML = "";
        if (prefs.engine === "kokoro") {
          getFilteredKokoroVoices().forEach(v => {
            const opt = document.createElement("option");
            opt.value = v.id;
            opt.textContent = v.label;
            sel.appendChild(opt);
          });
        } else {
          const list = getFilteredBrowserVoices();
          if (list.length === 0) {
            const opt = document.createElement("option");
            opt.value = "";
            opt.textContent = "Default Browser Voice";
            sel.appendChild(opt);
          } else {
            list.slice(0, 30).forEach(v => {
              const opt = document.createElement("option");
              opt.value = v.name;
              const isNat = /natural|neural|google/i.test(v.name) && !/multilingual/i.test(v.name);
              opt.textContent = `${isNat ? "★ " : ""}${v.name}`;
              sel.appendChild(opt);
            });
          }
        }
      }
      const desiredVal = prefs.engine === "kokoro" ? prefs.kokoroVoice : prefs.browserVoiceName;
      if (desiredVal && Array.from(sel.options).some(o => o.value === desiredVal) && sel.value !== desiredVal) {
        sel.value = desiredVal;
      }
    });

    if (statusEl) {
      statusEl.textContent = statusText;
    }

    // Sync Menu Narrator controls (accessible from Town as well as Adventures)
    const menuEngineSel = document.getElementById("menu-narrator-engine");
    const menuLangSel = document.getElementById("menu-narrator-lang");
    const menuAutoBtn = document.getElementById("menu-narrator-auto");
    const menuStatusEl = document.getElementById("menu-narrator-status");
    const menuProgWrap = document.getElementById("menu-narrator-progress-wrap");
    const menuProgBar = document.getElementById("menu-narrator-progress-bar");
    if (menuEngineSel && menuEngineSel.value !== prefs.engine) {
      menuEngineSel.value = prefs.engine;
    }
    if (menuLangSel && menuLangSel.value !== (prefs.language || "en")) {
      menuLangSel.value = prefs.language || "en";
    }
    if (menuAutoBtn) {
      menuAutoBtn.textContent = prefs.autoRead ? "🎙️ Auto-Voice: ON" : "🎙️ Auto-Voice: OFF";
      menuAutoBtn.className = prefs.autoRead
        ? "px-2.5 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 border border-emerald-500/60 text-xs font-semibold text-emerald-100 transition"
        : "px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-xs font-semibold text-stone-300 transition";
    }
    if (menuStatusEl) {
      if (prefs.engine === "kokoro") {
        menuStatusEl.textContent = kokoroStatusMsg;
        menuStatusEl.className = kokoroState === "ready"
          ? "text-[11px] font-semibold text-emerald-300"
          : kokoroState === "error"
            ? "text-[11px] font-semibold text-rose-300"
            : "text-[11px] font-medium text-amber-200";
      } else {
        const topName = browserVoices[0]?.name ? browserVoices[0].name.replace(/Microsoft |Google |Online \(Natural\) - /g, "").trim() : "System Voice";
        menuStatusEl.textContent = `✅ Smart Browser Voice Ready (${topName})`;
        menuStatusEl.className = "text-[11px] font-medium text-stone-300";
      }
    }
    if (menuProgWrap && menuProgBar) {
      const showBar = prefs.engine === "kokoro" && kokoroState === "loading";
      menuProgWrap.classList.toggle("hidden", !showBar);
      if (showBar) menuProgBar.style.width = `${Math.max(4, kokoroPct)}%`;
    }
  }

  function initUI() {
    const playBtn = document.getElementById("btn-narrator-play");
    const stopBtn = document.getElementById("btn-narrator-stop");
    const autoBtn = document.getElementById("btn-narrator-auto");
    const engineSel = document.getElementById("narrator-engine");
    const voiceSel = document.getElementById("narrator-voice");
    const rateSel = document.getElementById("narrator-rate");
    const menuEngineSel = document.getElementById("menu-narrator-engine");
    const menuLangSel = document.getElementById("menu-narrator-lang");
    const menuVoiceSel = document.getElementById("menu-narrator-voice");
    const menuAutoBtn = document.getElementById("menu-narrator-auto");
    const menuTestBtn = document.getElementById("btn-menu-narrator-test");

    if (playBtn) playBtn.onclick = togglePlayPause;
    if (stopBtn) stopBtn.onclick = () => stop(false);
    const handleToggleAuto = () => {
      prefs.autoRead = !prefs.autoRead;
      savePrefs();
      renderControls();
      if (prefs.autoRead && playbackState === "idle" && currentText) {
        play();
      }
    };
    if (autoBtn) autoBtn.onclick = handleToggleAuto;
    if (menuAutoBtn) menuAutoBtn.onclick = handleToggleAuto;

    const handleEngineChange = (val) => {
      const wasPlaying = playbackState === "playing" || playbackState === "loading";
      stop(false);
      prefs.engine = val === "kokoro" ? "kokoro" : "browser";
      savePrefs();
      if (voiceSel) voiceSel.dataset.populated = "";
      if (menuVoiceSel) menuVoiceSel.dataset.populated = "";
      renderControls();
      if (prefs.engine === "kokoro" && !kokoroModel && kokoroState !== "loading") {
        // Begin downloading Studio AI immediately so user sees live progress & completion badge
        ensureKokoroModel().catch(() => {});
      }
      if (wasPlaying && currentText) play();
    };
    if (engineSel) engineSel.onchange = () => handleEngineChange(engineSel.value);
    if (menuEngineSel) menuEngineSel.onchange = () => handleEngineChange(menuEngineSel.value);

    if (menuLangSel) {
      menuLangSel.onchange = () => {
        prefs.language = menuLangSel.value || "en";
        if (prefs.engine === "kokoro") {
          const kList = getFilteredKokoroVoices();
          if (kList.length && !kList.some(v => v.id === prefs.kokoroVoice)) {
            prefs.kokoroVoice = kList[0].id;
          }
        } else {
          const bList = getFilteredBrowserVoices();
          if (bList.length && !bList.some(v => v.name === prefs.browserVoiceName)) {
            prefs.browserVoiceName = bList[0].name;
          }
        }
        savePrefs();
        if (voiceSel) voiceSel.dataset.populated = "";
        if (menuVoiceSel) menuVoiceSel.dataset.populated = "";
        renderControls();
      };
    }

    const handleVoiceChange = (val) => {
      const wasPlaying = playbackState === "playing";
      if (prefs.engine === "kokoro") prefs.kokoroVoice = val;
      else prefs.browserVoiceName = val;
      savePrefs();
      renderControls();
      if (wasPlaying && currentText) play();
    };
    if (voiceSel) voiceSel.onchange = () => handleVoiceChange(voiceSel.value);
    if (menuVoiceSel) menuVoiceSel.onchange = () => handleVoiceChange(menuVoiceSel.value);

    if (menuTestBtn) {
      menuTestBtn.onclick = () => {
        stop(true);
        const myToken = ++runToken;
        const sample = "The lantern light flickers across the frontier road as a new adventure begins beyond Oakhaven's gates.";
        if (prefs.engine === "kokoro") startKokoroSpeech(sample, myToken, null);
        else startBrowserSpeech(sample, myToken, null);
      };
    }
    if (rateSel) {
      rateSel.onchange = () => {
        const wasPlaying = playbackState === "playing";
        prefs.rate = parseFloat(rateSel.value) || 1.0;
        savePrefs();
        if (wasPlaying && currentText) play();
      };
    }

    refreshBrowserVoices();
    renderControls();
    if (prefs.engine === "kokoro" && !kokoroModel && kokoroState === "idle") {
      ensureKokoroModel().catch(() => {});
    }
  }

  global.OAKHAVEN_NARRATOR = {
    initUI,
    setPage,
    speakAs,
    play,
    pause,
    resume,
    stop,
    togglePlayPause,
    getPrefs: () => ({ ...prefs })
  };
})(window);
