/* ============================================================
   CHRONICLES OF OAKHAVEN — FANTASY MUSIC & TACTILE SFX ENGINE
   Hybrid Web Audio API procedural medieval synthesizer + foley
   SFX engine with automatic optional local MP3 override support
   (audio/music/town.mp3, tavern.mp3, adventure.mp3, combat.mp3).
   Works 100% offline over file:// with zero dependencies!
   ============================================================ */
(function (global) {
  "use strict";

  const STORAGE_KEY = "oakhaven_audio_prefs_v1";

  let ctx = null;
  let masterGain = null;
  let musicGain = null;
  let sfxGain = null;
  let reverbNode = null;
  let noiseBuffer = null;

  let prefs = {
    muted: false,
    musicEnabled: true,
    sfxEnabled: true,
    musicVol: 0.42,
    sfxVol: 0.65
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (saved && typeof saved === "object") prefs = { ...prefs, ...saved };
  } catch (_) {}

  function savePrefs() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch (_) {}
  }

  // Note frequency helper (A4 = 440Hz)
  const NOTE_MAP = { C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11 };
  function noteFreq(noteStr) {
    if (!noteStr) return 0;
    const m = String(noteStr).match(/^([A-G][#b]?)(\d)$/);
    if (!m) return 0;
    const midi = (parseInt(m[2], 10) + 1) * 12 + NOTE_MAP[m[1]];
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function ensureContext() {
    if (!ctx) {
      const AC = global.AudioContext || global.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();

      masterGain = ctx.createGain();
      musicGain = ctx.createGain();
      sfxGain = ctx.createGain();

      // Subtle warm hall reverb impulse for medieval harp/flute/bell bloom
      const irLen = Math.floor(ctx.sampleRate * 1.4);
      const irBuf = ctx.createBuffer(2, irLen, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const data = irBuf.getChannelData(ch);
        for (let i = 0; i < irLen; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLen, 2.6) * 0.28;
        }
      }
      reverbNode = ctx.createConvolver();
      reverbNode.buffer = irBuf;

      const reverbWet = ctx.createGain();
      reverbWet.gain.value = 0.30;

      musicGain.connect(masterGain);
      musicGain.connect(reverbNode);
      reverbNode.connect(reverbWet);
      reverbWet.connect(masterGain);

      sfxGain.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Shared white-noise buffer for foley SFX (parchment, footsteps, fire, bombs)
      const nLen = ctx.sampleRate * 1.5;
      noiseBuffer = ctx.createBuffer(1, nLen, ctx.sampleRate);
      const nd = noiseBuffer.getChannelData(0);
      for (let i = 0; i < nLen; i++) nd[i] = Math.random() * 2 - 1;

      applyVolumes();
    }
    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function applyVolumes() {
    if (!ctx || !masterGain) return;
    const t = ctx.currentTime;
    masterGain.gain.setTargetAtTime(prefs.muted ? 0 : 1, t, 0.03);
    musicGain.gain.setTargetAtTime(prefs.musicEnabled ? prefs.musicVol : 0, t, 0.08);
    sfxGain.gain.setTargetAtTime(prefs.sfxEnabled ? prefs.sfxVol : 0, t, 0.03);
    if (activeHtmlAudio) {
      activeHtmlAudio.volume = (prefs.muted || !prefs.musicEnabled) ? 0 : Math.min(1, prefs.musicVol);
    }
  }

  /* ------------------------------------------------------------
     INSTRUMENT VOICES FOR PROCEDURAL FANTASY MUSIC
     ------------------------------------------------------------ */
  function playHarp(freq, startTime, dur = 0.75, vol = 0.16) {
    if (!ctx || !freq) return;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const g = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, startTime);
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 2, startTime);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(Math.min(3200, freq * 6), startTime);
    filter.frequency.exponentialRampToValueAtTime(Math.max(300, freq * 1.4), startTime + dur);

    g.gain.setValueAtTime(0.0001, startTime);
    g.gain.linearRampToValueAtTime(vol, startTime + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0008, startTime + dur);

    const g2 = ctx.createGain();
    g2.gain.value = 0.25;

    osc.connect(filter);
    osc2.connect(g2);
    g2.connect(filter);
    filter.connect(g);
    g.connect(musicGain);

    osc.onended = () => {
      try { osc.disconnect(); osc2.disconnect(); g2.disconnect(); filter.disconnect(); g.disconnect(); } catch (_) {}
    };
    osc.start(startTime);
    osc2.start(startTime);
    osc.stop(startTime + dur + 0.05);
    osc2.stop(startTime + dur + 0.05);
  }

  function playFlute(freq, startTime, dur = 0.6, vol = 0.11) {
    if (!ctx || !freq) return;
    const osc = ctx.createOscillator();
    const vib = ctx.createOscillator();
    const vibG = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const g = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);
    vib.type = "sine";
    vib.frequency.setValueAtTime(5.2, startTime);
    vibG.gain.setValueAtTime(freq * 0.008, startTime);
    vib.connect(vibG);
    vibG.connect(osc.frequency);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2200, startTime);

    g.gain.setValueAtTime(0.0001, startTime);
    g.gain.linearRampToValueAtTime(vol, startTime + Math.min(0.09, dur * 0.25));
    g.gain.setValueAtTime(vol * 0.85, startTime + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0008, startTime + dur);

    osc.connect(filter);
    filter.connect(g);
    g.connect(musicGain);

    osc.onended = () => {
      try { osc.disconnect(); vib.disconnect(); vibG.disconnect(); filter.disconnect(); g.disconnect(); } catch (_) {}
    };
    osc.start(startTime);
    vib.start(startTime);
    osc.stop(startTime + dur + 0.05);
    vib.stop(startTime + dur + 0.05);
  }

  function playPad(freq, startTime, dur = 2.4, vol = 0.07) {
    if (!ctx || !freq) return;
    const o1 = ctx.createOscillator();
    const o2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const g = ctx.createGain();

    o1.type = "sawtooth";
    o2.type = "sawtooth";
    o1.frequency.setValueAtTime(freq, startTime);
    o2.frequency.setValueAtTime(freq * 1.004, startTime);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(580, startTime);

    g.gain.setValueAtTime(0.0001, startTime);
    g.gain.linearRampToValueAtTime(vol, startTime + 0.45);
    g.gain.linearRampToValueAtTime(vol * 0.7, startTime + dur - 0.5);
    g.gain.exponentialRampToValueAtTime(0.0008, startTime + dur);

    o1.connect(filter);
    o2.connect(filter);
    filter.connect(g);
    g.connect(musicGain);

    o1.onended = () => {
      try { o1.disconnect(); o2.disconnect(); filter.disconnect(); g.disconnect(); } catch (_) {}
    };
    o1.start(startTime);
    o2.start(startTime);
    o1.stop(startTime + dur + 0.05);
    o2.stop(startTime + dur + 0.05);
  }

  function playDrum(startTime, accent = false) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(accent ? 135 : 105, startTime);
    osc.frequency.exponentialRampToValueAtTime(44, startTime + 0.16);
    g.gain.setValueAtTime(accent ? 0.24 : 0.14, startTime);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.20);
    osc.connect(g);
    g.connect(musicGain);
    osc.onended = () => {
      try { osc.disconnect(); g.disconnect(); } catch (_) {}
    };
    osc.start(startTime);
    osc.stop(startTime + 0.22);
  }

  function playBrass(freq, startTime, dur = 0.35, vol = 0.12) {
    if (!ctx || !freq) return;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const g = ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, startTime);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1100, startTime);
    filter.frequency.exponentialRampToValueAtTime(480, startTime + dur);
    g.gain.setValueAtTime(0.0001, startTime);
    g.gain.linearRampToValueAtTime(vol, startTime + 0.03);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + dur);
    osc.connect(filter);
    filter.connect(g);
    g.connect(musicGain);
    osc.onended = () => {
      try { osc.disconnect(); filter.disconnect(); g.disconnect(); } catch (_) {}
    };
    osc.start(startTime);
    osc.stop(startTime + dur + 0.04);
  }

  /* ------------------------------------------------------------
     4 DYNAMIC FANTASY MUSIC THEMES (Procedural Sequencer)
     ------------------------------------------------------------ */
  const THEMES = {
    town: {
      stepMs: 360,
      harp:  ["D3","A3","F4","A3", "C3","G3","E4","G3", "Bb2","F3","D4","F3", "A2","E3","C4","E3"],
      flute: ["A4",null,"B4","A4", "G4",null,"E4",null, "F4",null,"G4","F4", "E4",null,"D4",null],
      pad:   ["D2",null,null,null, "C2",null,null,null, "Bb1",null,null,null, "A1",null,null,null],
      drums: null
    },
    tavern: {
      stepMs: 250,
      harp:  ["G3","B3","D4","G3","B3","D4", "C3","E3","G3","C3","E3","G3", "D3","F#3","A3","D3","F#3","A3", "G3","B3","D4","D3","F#3","A3"],
      flute: ["D5","B4","G4","A4","B4","D5", "E5","C5","G4","E5",null,"D5", "F#5","D5","A4","C5","B4","A4", "G4",null,"B4","A4",null,null],
      pad:   ["G2",null,null,null,null,null, "C2",null,null,null,null,null, "D2",null,null,null,null,null, "G2",null,null,null,null,null],
      drums: [1,0,0,2,0,0, 1,0,0,2,0,0, 1,0,0,2,0,0, 1,0,2,1,0,0]
    },
    adventure: {
      stepMs: 460,
      harp:  ["E3","B3",null,"G3", "C3","G3",null,"E3", "A2","E3",null,"C3", "B2","F#3",null,"D#3"],
      flute: ["E4",null,null,"G4", "F#4",null,null,null, "E4",null,"D4",null, "B3",null,null,null],
      pad:   ["E2",null,null,null, "C2",null,null,null, "A1",null,null,null, "B1",null,null,null],
      drums: null
    },
    combat: {
      stepMs: 185,
      harp:  ["D3","D3","F3","D3", "A3","G3","F3","E3", "D3","D3","F3","D3", "C3","E3","G3","A3"],
      brass: ["D4",null,null,"F4", "A4",null,"G4","F4", "E4",null,"C4",null, "D4",null,null,null],
      pad:   ["D2",null,null,null, "Bb1",null,null,null, "C2",null,null,null, "A1",null,null,null],
      drums: [1,0,2,0, 1,2,0,2, 1,0,2,0, 1,0,2,1]
    }
  };

  let currentTheme = null;
  let seqTimer = null;
  let seqStep = 0;
  let activeHtmlAudio = null;

  function stopMusicLoop() {
    if (seqTimer) { clearInterval(seqTimer); seqTimer = null; }
    if (activeHtmlAudio) {
      try { activeHtmlAudio.pause(); activeHtmlAudio.currentTime = 0; } catch (_) {}
      activeHtmlAudio = null;
    }
  }

  function startProceduralTheme(themeName) {
    const th = THEMES[themeName] || THEMES.town;
    seqStep = 0;
    const len = th.harp.length;

    const tick = () => {
      if (document.hidden || !ctx || ctx.state !== "running" || prefs.muted || !prefs.musicEnabled) return;
      const now = ctx.currentTime + 0.03;
      const i = seqStep % len;

      const hNote = th.harp[i];
      if (hNote) playHarp(noteFreq(hNote), now, th.stepMs / 1000 * 2.2, themeName === "combat" ? 0.14 : 0.15);

      if (th.flute && th.flute[i]) {
        playFlute(noteFreq(th.flute[i]), now, th.stepMs / 1000 * 1.9, 0.10);
      }
      if (th.brass && th.brass[i]) {
        playBrass(noteFreq(th.brass[i]), now, th.stepMs / 1000 * 1.8, 0.11);
      }
      if (th.pad && th.pad[i]) {
        playPad(noteFreq(th.pad[i]), now, (th.stepMs / 1000) * 4.2, themeName === "adventure" ? 0.08 : 0.06);
      }
      if (th.drums && th.drums[i]) {
        playDrum(now, th.drums[i] === 1);
      }
      seqStep++;
    };

    tick();
    seqTimer = setInterval(tick, th.stepMs);
  }

  function setMusic(themeName) {
    if (!themeName) return;
    if (currentTheme === themeName && (seqTimer || activeHtmlAudio)) return;
    currentTheme = themeName;
    stopMusicLoop();
    if (!ctx) return; // Will start automatically on first user gesture
    startProceduralTheme(themeName);
  }

  /* ------------------------------------------------------------
     25+ TACTILE FOLEY SOUND EFFECTS
     ------------------------------------------------------------ */
  function noiseBurst(startTime, dur, filterType, freq, q = 1, vol = 0.2) {
    if (!ctx || !noiseBuffer) return;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer;
    const f = ctx.createBiquadFilter();
    f.type = filterType;
    f.frequency.setValueAtTime(freq, startTime);
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, startTime);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + dur);
    src.connect(f);
    f.connect(g);
    g.connect(sfxGain);
    src.onended = () => {
      try { src.disconnect(); f.disconnect(); g.disconnect(); } catch (_) {}
    };
    src.start(startTime, Math.random() * 0.4, dur + 0.02);
  }

  function tone(type, freq1, freq2, startTime, dur, vol = 0.2) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq1, startTime);
    if (freq2 && freq2 !== freq1) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq2), startTime + dur);
    }
    g.gain.setValueAtTime(0.0001, startTime);
    g.gain.linearRampToValueAtTime(vol, startTime + 0.008);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + dur);
    osc.connect(g);
    g.connect(sfxGain);
    osc.onended = () => {
      try { osc.disconnect(); g.disconnect(); } catch (_) {}
    };
    osc.start(startTime);
    osc.stop(startTime + dur + 0.02);
  }

  let lastHoverAt = 0;

  function playSfx(name) {
    if (prefs.muted || !prefs.sfxEnabled) return;
    const c = ensureContext();
    if (!c) return;
    const t = c.currentTime;

    switch (name) {
      case "click":
        tone("triangle", 540, 260, t, 0.045, 0.14);
        noiseBurst(t, 0.025, "highpass", 1800, 1, 0.06);
        break;

      case "hover":
        if (performance.now() - lastHoverAt < 55) return;
        lastHoverAt = performance.now();
        tone("sine", 780, 620, t, 0.025, 0.035);
        break;

      case "step": {
        const pitch = 140 + Math.random() * 55;
        noiseBurst(t, 0.055, "bandpass", 650 + Math.random() * 250, 1.4, 0.13);
        tone("sine", pitch, 55, t, 0.055, 0.10);
        break;
      }

      case "door":
        tone("sawtooth", 190, 125, t, 0.14, 0.08);
        tone("triangle", 320, 180, t + 0.10, 0.08, 0.14);
        noiseBurst(t, 0.12, "bandpass", 500, 2, 0.08);
        break;

      case "page":
        noiseBurst(t, 0.16, "bandpass", 1600, 0.9, 0.18);
        noiseBurst(t + 0.06, 0.12, "highpass", 2400, 0.7, 0.10);
        break;

      case "dice":
        for (let i = 0; i < 4; i++) {
          const dt = i * 0.055 + Math.random() * 0.015;
          tone("triangle", 700 + Math.random() * 450, 320, t + dt, 0.035, 0.12);
          noiseBurst(t + dt, 0.03, "bandpass", 1900, 2.5, 0.10);
        }
        break;

      case "sword":
        noiseBurst(t, 0.10, "bandpass", 2800, 1.5, 0.22);
        tone("sawtooth", 920, 220, t, 0.11, 0.16);
        tone("sine", 150, 45, t + 0.04, 0.12, 0.25);
        break;

      case "crit":
        noiseBurst(t, 0.14, "highpass", 2200, 1, 0.26);
        tone("sawtooth", 1200, 340, t, 0.14, 0.20);
        tone("triangle", 587.33, 587.33, t + 0.04, 0.28, 0.20);
        tone("triangle", 880, 880, t + 0.09, 0.34, 0.22);
        tone("sine", 130, 40, t + 0.03, 0.18, 0.28);
        break;

      case "miss":
        noiseBurst(t, 0.14, "bandpass", 950, 2.0, 0.16);
        tone("sine", 340, 150, t, 0.12, 0.08);
        break;

      case "enemyHit":
        tone("sawtooth", 140, 42, t, 0.18, 0.26);
        noiseBurst(t, 0.12, "lowpass", 650, 1, 0.24);
        break;

      case "shield":
        tone("triangle", 640, 820, t, 0.12, 0.18);
        tone("sine", 1280, 960, t + 0.02, 0.18, 0.14);
        break;

      case "spellFire":
        noiseBurst(t, 0.36, "lowpass", 900, 1.2, 0.28);
        tone("sawtooth", 240, 75, t, 0.30, 0.16);
        tone("triangle", 460, 190, t + 0.04, 0.22, 0.12);
        break;

      case "spellFrost":
        noiseBurst(t, 0.22, "highpass", 3200, 1.5, 0.20);
        [1318, 1568, 2093, 1760].forEach((f, i) => tone("sine", f, f * 1.04, t + i * 0.045, 0.24, 0.12));
        break;

      case "spellLightning":
        noiseBurst(t, 0.26, "bandpass", 1800, 0.8, 0.30);
        tone("sawtooth", 1400, 95, t, 0.18, 0.18);
        tone("sine", 95, 36, t + 0.08, 0.30, 0.26);
        break;

      case "spellRadiant":
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone("triangle", f, f, t + i * 0.045, 0.38, 0.15));
        break;

      case "spellShadow":
        tone("sawtooth", 310, 78, t, 0.36, 0.16);
        tone("sine", 220, 65, t + 0.05, 0.34, 0.16);
        noiseBurst(t, 0.28, "bandpass", 420, 2.5, 0.14);
        break;

      case "spellPoison":
        noiseBurst(t, 0.28, "bandpass", 1400, 3.0, 0.18);
        [320, 410, 290, 480].forEach((f, i) => tone("sine", f, f * 1.25, t + i * 0.05, 0.08, 0.12));
        break;

      case "spellArcane":
        [440, 554.37, 659.25, 880, 1108.73].forEach((f, i) => tone("triangle", f, f * 1.02, t + i * 0.04, 0.26, 0.13));
        break;

      case "heal":
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone("sine", f, f, t + i * 0.06, 0.35, 0.15));
        break;

      case "potion":
        tone("sine", 360, 720, t, 0.06, 0.16);
        tone("sine", 420, 620, t + 0.09, 0.07, 0.14);
        tone("sine", 520, 760, t + 0.17, 0.08, 0.14);
        break;

      case "bomb":
        noiseBurst(t, 0.10, "highpass", 3500, 1, 0.14);
        noiseBurst(t + 0.09, 0.45, "lowpass", 420, 0.8, 0.36);
        tone("sine", 130, 28, t + 0.09, 0.42, 0.34);
        break;

      case "coin":
        tone("sine", 2093, 2093, t, 0.16, 0.14);
        tone("sine", 2637, 2637, t + 0.065, 0.22, 0.16);
        break;

      case "equip":
        tone("triangle", 340, 520, t, 0.07, 0.16);
        tone("sine", 880, 660, t + 0.04, 0.09, 0.12);
        noiseBurst(t, 0.05, "bandpass", 1200, 2, 0.10);
        break;

      case "forge":
        tone("square", 1180, 980, t, 0.26, 0.14);
        tone("sine", 2360, 2100, t, 0.32, 0.14);
        noiseBurst(t, 0.08, "highpass", 2400, 1, 0.20);
        break;

      case "scroll":
        noiseBurst(t, 0.15, "bandpass", 1700, 1.2, 0.14);
        [587.33, 739.99, 880, 1174.66].forEach((f, i) => tone("triangle", f, f, t + 0.06 + i * 0.055, 0.34, 0.15));
        break;

      case "summon":
        tone("sine", 220, 660, t, 0.30, 0.16);
        tone("triangle", 440, 880, t + 0.08, 0.30, 0.14);
        break;

      case "stun":
        tone("sawtooth", 260, 85, t, 0.25, 0.20);
        tone("sine", 620, 220, t, 0.22, 0.16);
        break;

      case "levelUp":
        [440, 554.37, 659.25, 880, 1108.73].forEach((f, i) => {
          tone("triangle", f, f, t + i * 0.085, 0.42, 0.20);
          tone("sawtooth", f * 0.5, f * 0.5, t + i * 0.085, 0.36, 0.08);
        });
        break;

      case "victory":
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
          tone("triangle", f, f, t + i * 0.10, i === 3 ? 0.65 : 0.25, 0.20);
        });
        break;

      case "death":
        tone("sine", 196, 185, t, 1.1, 0.24);
        tone("triangle", 146.83, 138, t + 0.15, 1.0, 0.18);
        tone("sine", 98, 92, t + 0.3, 1.2, 0.22);
        break;

      case "quest":
        noiseBurst(t, 0.14, "bandpass", 1500, 1, 0.14);
        [293.66, 440, 587.33].forEach((f, i) => tone("triangle", f, f, t + 0.06 + i * 0.09, 0.38, 0.16));
        break;

      case "error":
        tone("sawtooth", 180, 120, t, 0.09, 0.14);
        tone("sawtooth", 140, 95, t + 0.09, 0.12, 0.14);
        break;

      default:
        tone("triangle", 520, 320, t, 0.05, 0.12);
    }
  }

  function playSpellByType(dmgType, isHeal, isShield) {
    const dt = (dmgType || "").toLowerCase();
    if (dt === "fire") return playSfx("spellFire");
    if (dt === "frost" || dt === "cold") return playSfx("spellFrost");
    if (dt === "lightning" || dt === "thunder") return playSfx("spellLightning");
    if (dt === "radiant") return playSfx("spellRadiant");
    if (dt === "necrotic" || dt === "shadow") return playSfx("spellShadow");
    if (dt === "poison" || dt === "acid") return playSfx("spellPoison");
    if (isHeal) return playSfx("heal");
    if (isShield) return playSfx("shield");
    return playSfx("spellArcane");
  }

  // Unlock AudioContext on first user interaction & begin queued music theme
  function unlockAudio() {
    ensureContext();
    if (currentTheme && !seqTimer && !activeHtmlAudio) {
      startProceduralTheme(currentTheme);
    }
  }
  ["pointerdown", "keydown"].forEach(ev => {
    document.addEventListener(ev, unlockAudio, { once: false, passive: true });
  });

  // Suspend WebAudio when the browser tab is hidden to prevent background node/CPU buildup
  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) {
      if (ctx.state === "running") ctx.suspend().catch(() => {});
    } else {
      if (ctx.state === "suspended" && !prefs.muted) ctx.resume().catch(() => {});
    }
  });

  // Global tactile UI click sound on all buttons (respecting disabled state)
  document.addEventListener("click", (e) => {
    const btn = e.target && e.target.closest ? e.target.closest("button, label[for='town-map-upload']") : null;
    if (!btn) return;
    if (btn.disabled) return;
    // Skip duplicate click sound on buttons that trigger their own bespoke SFX
    if (btn.id && ["btn-c-strike", "btn-c-luck", "btn-c-potion", "btn-c-bomb", "btn-c-flee", "dpad-up", "dpad-down", "dpad-left", "dpad-right"].includes(btn.id)) {
      return;
    }
    playSfx("click");
  }, true);

  // Wire up Header Audio Controls UI
  function bindControls() {
    const btnMute = document.getElementById("btn-audio-mute");
    const btnMusic = document.getElementById("btn-audio-music");
    const volSlider = document.getElementById("audio-vol-slider");

    function syncUi() {
      if (btnMute) {
        btnMute.textContent = prefs.muted ? "🔇" : "🔊";
        btnMute.title = prefs.muted ? "Unmute Audio" : "Mute All Audio";
      }
      if (btnMusic) {
        btnMusic.textContent = prefs.musicEnabled && !prefs.muted ? "🎵 On" : "🎵 Off";
        btnMusic.classList.toggle("text-amber-300", prefs.musicEnabled && !prefs.muted);
        btnMusic.classList.toggle("text-stone-500", !prefs.musicEnabled || prefs.muted);
      }
      if (volSlider) volSlider.value = Math.round(prefs.musicVol * 100);
    }

    if (btnMute) {
      btnMute.addEventListener("click", () => {
        ensureContext();
        prefs.muted = !prefs.muted;
        savePrefs();
        applyVolumes();
        syncUi();
      });
    }
    if (btnMusic) {
      btnMusic.addEventListener("click", () => {
        ensureContext();
        prefs.musicEnabled = !prefs.musicEnabled;
        if (prefs.musicEnabled && prefs.muted) prefs.muted = false;
        savePrefs();
        applyVolumes();
        if (prefs.musicEnabled && currentTheme && !seqTimer) startProceduralTheme(currentTheme);
        syncUi();
      });
    }
    if (volSlider) {
      volSlider.addEventListener("input", () => {
        ensureContext();
        const v = Number(volSlider.value) / 100;
        prefs.musicVol = v;
        prefs.sfxVol = Math.min(1, v * 1.4 + 0.15);
        if (v > 0 && prefs.muted) prefs.muted = false;
        savePrefs();
        applyVolumes();
        syncUi();
      });
    }
    syncUi();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindControls);
  } else {
    bindControls();
  }

  global.OAKHAVEN_AUDIO = {
    playSfx,
    playSpellByType,
    setMusic,
    unlockAudio,
    getPrefs: () => ({ ...prefs })
  };
})(window);
