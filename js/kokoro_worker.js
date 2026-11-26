/* ============================================================
   CHRONICLES OF OAKHAVEN — KOKORO STUDIO AI WEB WORKER
   Runs Kokoro-82M WASM inference off the main UI thread with
   epoch-based cancellation so stale/cancelled lines are skipped
   immediately instead of piling up in a backlog!
   ============================================================ */

let kokoroModel = null;
let loadingPromise = null;
let latestEpoch = 0;

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
    }
  }
  throw lastErr || new Error("Could not load kokoro-js from CDN");
}

async function ensureModel() {
  if (kokoroModel) return kokoroModel;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    self.postMessage({ type: "progress", status: "loading", pct: 3, msg: "⏳ Connecting to Studio AI engine…" });
    const KokoroTTS = await importKokoroModule();

    const modelId = "onnx-community/Kokoro-82M-v1.0-ONNX";
    kokoroModel = await KokoroTTS.from_pretrained(modelId, {
      dtype: "q8",
      device: "wasm",
      progress_callback: (p) => {
        if (!p) return;
        if (typeof p.progress === "number") {
          const pct = Math.min(99, Math.max(4, Math.round(p.progress)));
          const fileHint = p.file ? ` (${p.file.split("/").pop()})` : "";
          self.postMessage({ type: "progress", status: "loading", pct, msg: `⏳ Downloading Studio AI: ${pct}%${fileHint}` });
        } else if (p.status === "initiate") {
          self.postMessage({ type: "progress", status: "loading", pct: 5, msg: "⏳ Starting Studio AI model download…" });
        } else if (p.status === "ready") {
          self.postMessage({ type: "progress", status: "loading", pct: 99, msg: "⏳ Initializing Studio AI voice engine…" });
        }
      }
    });

    self.postMessage({ type: "ready", pct: 100, msg: "✅ Studio AI (Kokoro) Downloaded & Ready!" });
    return kokoroModel;
  })();

  try {
    return await loadingPromise;
  } catch (err) {
    loadingPromise = null;
    throw err;
  }
}

self.onmessage = async (ev) => {
  const msg = ev.data || {};
  if (msg.type === "cancel") {
    if (typeof msg.epoch === "number" && msg.epoch > latestEpoch) {
      latestEpoch = msg.epoch;
    }
    return;
  }

  if (msg.type === "init") {
    try {
      await ensureModel();
      self.postMessage({ type: "init_ok", reqId: msg.reqId });
    } catch (err) {
      self.postMessage({ type: "init_err", reqId: msg.reqId, error: String(err?.message || err || "Worker init failed") });
    }
    return;
  }

  if (msg.type === "generate") {
    const { reqId, text, voice, speed, epoch } = msg;
    if (typeof epoch === "number" && epoch < latestEpoch) {
      self.postMessage({ type: "cancelled", reqId });
      return;
    }
    try {
      const model = await ensureModel();
      if (typeof epoch === "number" && epoch < latestEpoch) {
        self.postMessage({ type: "cancelled", reqId });
        return;
      }
      const rawAudio = await model.generate(text, { voice: voice || "bm_george", speed: speed || 1.0 });
      if (typeof epoch === "number" && epoch < latestEpoch) {
        self.postMessage({ type: "cancelled", reqId });
        return;
      }
      const raw = rawAudio.audio || rawAudio.data || rawAudio;
      const samples = raw instanceof Float32Array ? raw : new Float32Array(raw);
      const sampleRate = rawAudio.sampling_rate || 24000;
      self.postMessage(
        { type: "audio", reqId, samples, sampleRate },
        [samples.buffer]
      );
    } catch (err) {
      self.postMessage({ type: "gen_err", reqId, error: String(err?.message || err || "Synthesis failed") });
    }
  }
};
