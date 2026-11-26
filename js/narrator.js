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
    { id: "bm_lewis",    label: "Lewis — British Narrator (Deep)" },
    { id: "bm_daniel",   label: "Daniel — British Narrator (Crisp)" },
    { id: "bf_emma",     label: "Emma — British Narrator (Classic)" },
    { id: "bf_isabella", label: "Isabella — British Narrator (Lyrical)" },
    { id: "am_michael",  label: "Michael — American Narrator" },
    { id: "af_heart",    label: "Heart — American (Expressive)" }
  ];

  const DEFAULT_PREFS = {
    engine: "browser",       // "browser" | "kokoro"
    autoRead: false,
    rate: 1.0,
    browserVoiceName: "",
    kokoroVoice: "bm_george"
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

  // Kokoro AI state
  let kokoroModel = null;
  let kokoroLoadingPromise = null;
  let audioCtx = null;
  let activeSource = null;

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

  function splitIntoChunks(text, maxLen = 210) {
    if (!text) return [];
    // Split on sentence boundaries first
    const rawSentences = text.match(/[^.!?]+(?:[.!?]+["”’)]*|$)/g) || [text];
    const chunks = [];
    for (let s of rawSentences) {
      s = s.trim();
      if (!s) continue;
      if (s.length <= maxLen) {
        chunks.push(s);
      } else {
        // Split very long sentences cleanly at commas/semicolons/em-dashes
        const subParts = s.split(/(?<=[,;:\u2014—])\s+/);
        let cur = "";
        for (const part of subParts) {
          if ((cur + " " + part).trim().length <= maxLen) {
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
  function scoreBrowserVoice(v) {
    if (!v || !v.lang) return -999;
    const lang = v.lang.toLowerCase();
    if (!lang.startsWith("en")) return -500;
    const name = (v.name || "").toLowerCase();
    let score = 10;

    // Top-tier cloud/OS neural voices
    if (name.includes("natural") || name.includes("neural")) score += 100;
    if (name.includes("online")) score += 30;
    if (name.includes("enhanced") || name.includes("premium")) score += 60;
    if (name.includes("google")) score += 55;

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

    if (browserVoices.length > 0) {
      const stillExists = browserVoices.some(v => v.name === prefs.browserVoiceName);
      if (!prefs.browserVoiceName || !stillExists) {
        prefs.browserVoiceName = browserVoices[0].name;
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
  function startBrowserSpeech(text, myToken) {
    if (!global.speechSynthesis) {
      setStatus("idle", "Browser speech unsupported — try Studio AI!");
      return;
    }
    global.speechSynthesis.cancel();
    browserQueue = splitIntoChunks(text, 220);
    browserQueueIdx = 0;

    if (browserQueue.length === 0) {
      setStatus("idle", "Nothing to read");
      return;
    }

    const voices = browserVoices.length ? browserVoices : refreshBrowserVoices();
    const chosen = voices.find(v => v.name === prefs.browserVoiceName) || voices[0] || null;
    const shortVoice = chosen ? chosen.name.replace(/Microsoft |Google |Online \(Natural\) - |English \(United Kingdom\)|English \(United States\)/g, "").trim() : "System";

    setStatus("playing", `Speaking (${shortVoice || "Neural"})…`);

    const speakNext = () => {
      if (myToken !== runToken) return;
      if (browserQueueIdx >= browserQueue.length) {
        setStatus("idle", "Finished page");
        return;
      }
      const chunk = browserQueue[browserQueueIdx++];
      const u = new SpeechSynthesisUtterance(chunk);
      if (chosen) u.voice = chosen;
      u.lang = chosen?.lang || "en-GB";
      u.rate = Number(prefs.rate) || 1.0;
      u.pitch = 1.0;
      u.onend = () => {
        if (myToken !== runToken) return;
        speakNext();
      };
      u.onerror = (ev) => {
        if (myToken !== runToken) return;
        if (ev?.error === "interrupted" || ev?.error === "canceled") return;
        setStatus("idle", "Voice stopped");
      };
      global.speechSynthesis.speak(u);
    };

    speakNext();
  }

  /* ------------------------------------------------------------
     ENGINE 2: KOKORO-82M IN-BROWSER STUDIO AI NARRATOR
     ------------------------------------------------------------ */
  async function ensureKokoroModel(myToken) {
    if (kokoroModel) return kokoroModel;
    if (kokoroLoadingPromise) return kokoroLoadingPromise;

    kokoroLoadingPromise = (async () => {
      setStatus("loading", "Loading Studio AI engine…");
      const mod = await import("https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/+esm");
      const KokoroTTS = mod.KokoroTTS || mod.default?.KokoroTTS;
      if (!KokoroTTS) throw new Error("KokoroTTS export not found");

      const hasWebGpu = typeof navigator !== "undefined" && !!navigator.gpu;
      const progressCb = (p) => {
        if (myToken !== runToken) return;
        if (p && typeof p.progress === "number") {
          const pct = Math.min(99, Math.max(1, Math.round(p.progress)));
          setStatus("loading", `Downloading AI Voice (${pct}%) — cached once…`);
        } else if (p && p.status) {
          setStatus("loading", `Preparing AI Voice (${p.status})…`);
        }
      };

      const modelId = "onnx-community/Kokoro-82M-v1.0-ONNX";
      try {
        kokoroModel = await KokoroTTS.from_pretrained(modelId, {
          dtype: hasWebGpu ? "fp32" : "q8",
          device: hasWebGpu ? "webgpu" : "wasm",
          progress_callback: progressCb
        });
      } catch (gpuErr) {
        if (hasWebGpu) {
          setStatus("loading", "Switching AI Voice to WASM…");
          kokoroModel = await KokoroTTS.from_pretrained(modelId, {
            dtype: "q8",
            device: "wasm",
            progress_callback: progressCb
          });
        } else {
          throw gpuErr;
        }
      }
      return kokoroModel;
    })();

    try {
      const m = await kokoroLoadingPromise;
      return m;
    } catch (err) {
      kokoroLoadingPromise = null;
      throw err;
    }
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

  function playRawAudioBuffer(rawAudio, myToken) {
    return new Promise((resolve) => {
      if (myToken !== runToken) return resolve();
      const ctx = ensureAudioContext();
      const samples = rawAudio.audio || rawAudio.data || rawAudio;
      const sampleRate = rawAudio.sampling_rate || 24000;
      const buf = ctx.createBuffer(1, samples.length, sampleRate);
      buf.copyToChannel(samples instanceof Float32Array ? samples : new Float32Array(samples), 0);

      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.playbackRate.value = Number(prefs.rate) || 1.0;
      src.connect(ctx.destination);
      activeSource = src;
      src.onended = () => {
        if (activeSource === src) activeSource = null;
        resolve();
      };
      src.start();
    });
  }

  async function startKokoroSpeech(text, myToken) {
    const chunks = splitIntoChunks(text, 240);
    if (chunks.length === 0) {
      setStatus("idle", "Nothing to read");
      return;
    }

    let model;
    try {
      model = await ensureKokoroModel(myToken);
    } catch (err) {
      if (myToken !== runToken) return;
      console.warn("Kokoro AI Narrator failed to load, falling back to Smart Browser Voice:", err);
      setStatus("idle", "AI Voice unavailable — using Browser Voice");
      startBrowserSpeech(text, myToken);
      return;
    }

    if (myToken !== runToken) return;

    const voiceId = prefs.kokoroVoice || "bm_george";
    const voiceLabel = (KOKORO_VOICES.find(v => v.id === voiceId)?.label || voiceId).split(" — ")[0];
    setStatus("loading", `Synthesizing (${voiceLabel})…`);

    // Generate sentence 0, then prefetch sentence i+1 while sentence i plays!
    try {
      let nextPromise = model.generate(chunks[0], { voice: voiceId });
      for (let i = 0; i < chunks.length; i++) {
        if (myToken !== runToken) return;
        const rawAudio = await nextPromise;
        if (myToken !== runToken) return;

        // Kick off synthesis of the next sentence in parallel while playing this one
        if (i + 1 < chunks.length) {
          nextPromise = model.generate(chunks[i + 1], { voice: voiceId });
        }

        setStatus("playing", `Studio AI (${voiceLabel}) • ${i + 1}/${chunks.length}`);
        await playRawAudioBuffer(rawAudio, myToken);
      }
      if (myToken === runToken) {
        setStatus("idle", "Finished page");
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
    browserQueue = [];
    browserQueueIdx = 0;
    if (global.speechSynthesis) {
      try { global.speechSynthesis.cancel(); } catch (_) {}
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
    if (prefs.engine === "browser" && global.speechSynthesis) {
      global.speechSynthesis.pause();
      setStatus("paused", "Paused");
    } else if (prefs.engine === "kokoro" && audioCtx && audioCtx.state === "running") {
      audioCtx.suspend().then(() => setStatus("paused", "Paused")).catch(() => {});
    }
  }

  function resume() {
    if (playbackState !== "paused") return;
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

  function setPage(title, rawParas, allowAutoRead = true) {
    stop(true);
    currentTitle = title || "";
    currentText = cleanTextForSpeech(title, rawParas);
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

    if (voiceSel) {
      const targetKey = prefs.engine === "kokoro" ? "kokoro" : `browser:${browserVoices.length}`;
      if (voiceSel.dataset.populated !== targetKey) {
        voiceSel.dataset.populated = targetKey;
        voiceSel.innerHTML = "";
        if (prefs.engine === "kokoro") {
          KOKORO_VOICES.forEach(v => {
            const opt = document.createElement("option");
            opt.value = v.id;
            opt.textContent = v.label;
            voiceSel.appendChild(opt);
          });
        } else {
          const list = browserVoices.length ? browserVoices : [];
          if (list.length === 0) {
            const opt = document.createElement("option");
            opt.value = "";
            opt.textContent = "Default Browser Voice";
            voiceSel.appendChild(opt);
          } else {
            list.slice(0, 25).forEach(v => {
              const opt = document.createElement("option");
              opt.value = v.name;
              const isNat = /natural|neural|google/i.test(v.name);
              opt.textContent = `${isNat ? "★ " : ""}${v.name}`;
              voiceSel.appendChild(opt);
            });
          }
        }
      }
      const desiredVal = prefs.engine === "kokoro" ? prefs.kokoroVoice : prefs.browserVoiceName;
      if (desiredVal && voiceSel.value !== desiredVal) {
        voiceSel.value = desiredVal;
      }
    }

    if (statusEl) {
      statusEl.textContent = statusText;
    }
  }

  function initUI() {
    const playBtn = document.getElementById("btn-narrator-play");
    const stopBtn = document.getElementById("btn-narrator-stop");
    const autoBtn = document.getElementById("btn-narrator-auto");
    const engineSel = document.getElementById("narrator-engine");
    const voiceSel = document.getElementById("narrator-voice");
    const rateSel = document.getElementById("narrator-rate");

    if (playBtn) playBtn.onclick = togglePlayPause;
    if (stopBtn) stopBtn.onclick = () => stop(false);
    if (autoBtn) {
      autoBtn.onclick = () => {
        prefs.autoRead = !prefs.autoRead;
        savePrefs();
        renderControls();
        if (prefs.autoRead && playbackState === "idle" && currentText) {
          play();
        }
      };
    }
    if (engineSel) {
      engineSel.onchange = () => {
        const wasPlaying = playbackState === "playing" || playbackState === "loading";
        stop(false);
        prefs.engine = engineSel.value === "kokoro" ? "kokoro" : "browser";
        savePrefs();
        if (voiceSel) voiceSel.dataset.populated = "";
        renderControls();
        if (wasPlaying && currentText) play();
      };
    }
    if (voiceSel) {
      voiceSel.onchange = () => {
        const wasPlaying = playbackState === "playing";
        if (prefs.engine === "kokoro") prefs.kokoroVoice = voiceSel.value;
        else prefs.browserVoiceName = voiceSel.value;
        savePrefs();
        if (wasPlaying && currentText) play();
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
  }

  global.OAKHAVEN_NARRATOR = {
    initUI,
    setPage,
    play,
    pause,
    resume,
    stop,
    togglePlayPause,
    getPrefs: () => ({ ...prefs })
  };
})(window);
