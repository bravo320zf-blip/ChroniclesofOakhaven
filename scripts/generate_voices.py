#!/usr/bin/env python3
"""
Chronicles of Oakhaven — Local Kokoro-82M Pre-Recorded Voice Generator
Generates instant-play 48kbps mono MP3 voice lines using the EXACT same
Kokoro-82M voices (Lewis, Daniel, Emma, Isabella, George, Michael, Heart)
used in the game, and writes `data/audio/voice_manifest.js`.

Usage:
  python scripts/generate_voices.py --town
  python scripts/generate_voices.py --quests saltfang,thornwood_part1
  python scripts/generate_voices.py --enriched
  python scripts/generate_voices.py --town --enriched
"""

import argparse
import html
import json
import os
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

import lameenc
import numpy as np
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parent.parent
MODEL_DIR = Path(
    r"C:\Users\Zachary\.gemini\antigravity\brain\772b80ac-8c1f-42f8-9be2-3574c02c525f\scratch\kokoro_models"
)
MODEL_ONNX = MODEL_DIR / "kokoro-v1.0.int8.onnx"
VOICES_BIN = MODEL_DIR / "voices-v1.0.bin"

MODEL_URLS = {
    MODEL_ONNX: "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.int8.onnx",
    VOICES_BIN: "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin",
}

MANIFEST_JS = ROOT / "data" / "audio" / "voice_manifest.js"
TOWN_OUT = ROOT / "audio" / "voices" / "town"
QUEST_OUT = ROOT / "audio" / "voices" / "quests"

# Exact same character casting as js/narrator.js!
NAMED_TOWN_VOICES = {
    "bram": ("bm_lewis", 0.95),
    "armory": ("bm_lewis", 0.92),
    "borin": ("bm_lewis", 0.92),
    "apothecary": ("bf_emma", 1.04),
    "miri": ("bf_emma", 1.04),
    "curios": ("bm_daniel", 0.97),
    "orin": ("bm_daniel", 0.97),
    "temple": ("bf_isabella", 0.91),
    "selene": ("bf_isabella", 0.91),
    "tavern_bark": ("am_michael", 1.00),
}

QUEST_NARRATOR_VOICE = "bm_lewis"
QUEST_NARRATOR_SPEED = 1.00

EMOJI_RE = re.compile(
    "[\U0001F300-\U0001FAFF\u2600-\u27BF\uFE00-\uFE0F]", flags=re.UNICODE
)


def fnv1a_32(s: str) -> str:
    """Exact same FNV-1a 32-bit hash as js/narrator.js hashString()."""
    h = 2166136261
    for ch in s:
        h ^= ord(ch)
        h = (h * 16777619) & 0xFFFFFFFF
    return f"{h:08x}"


def clean_text(raw) -> str:
    arr = raw if isinstance(raw, list) else [raw or ""]
    parts = []
    for p in arr:
        if not p:
            continue
        s = re.sub(r"<br\s*/?>", ". ", str(p), flags=re.IGNORECASE)
        s = re.sub(r"<[^>]+>", "", s)
        s = html.unescape(s)
        s = EMOJI_RE.sub(" ", s)
        s = re.sub(r"\s+", " ", s).strip()
        if s:
            parts.append(s)
    joined = ". ".join(parts)
    joined = re.sub(r"\.\s*\.", ".", joined)
    joined = joined.replace("!.", "!").replace("?.", "?")
    joined = joined.strip().strip('"\'“”')
    return joined.strip()


def infer_gender(name: str = "", role: str = "") -> str:
    blob = f"{name} {role}".lower()
    if re.search(
        r"\b(lady|dame|sister|mistress|priestess|witch|queen|duchess|maiden|widow|mother|herbalist|sorceress|baroness|countess|matron|abbess|she|her)\b",
        blob,
    ):
        return "female"
    if re.search(
        r"\b(elara|lyra|mira|miri|sera|selene|nadia|freya|kira|astrid|rowena|talia|sylvia|helena|morgana|evelyn|isolde|maeve|clara|maren|yara|nora|anya|zara|fiona|gwen|lila|tess|wren|aria|elena|iris|vera|cora|vespera|lydia|nadya|sasha|sonya|katya|olga)\b",
        blob,
    ):
        return "female"
    return "male"


def get_town_voice(char_key: str, name: str = "", role: str = ""):
    k = (char_key or "").lower()
    if k in NAMED_TOWN_VOICES:
        return NAMED_TOWN_VOICES[k]
    h = int(fnv1a_32(k or name or "npc"), 16)
    gender = infer_gender(name, role)
    pool = (
        ["bf_emma", "bf_isabella", "af_heart"]
        if gender == "female"
        else ["bm_george", "bm_lewis", "bm_daniel", "am_michael"]
    )
    voice = pool[h % len(pool)]
    rate_steps = [0.93, 0.97, 1.01, 1.05]
    speed = rate_steps[(h >> 6) % len(rate_steps)]
    return (voice, speed)


def ensure_models():
    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    for path, url in MODEL_URLS.items():
        if path.exists() and path.stat().st_size > 1_000_000:
            continue
        print(f"Downloading {path.name} ...", flush=True)
        urllib.request.urlretrieve(url, path)
        print(f"Saved {path.name} ({path.stat().st_size / 1e6:.1f} MB)", flush=True)


def split_for_kokoro(text: str, max_len: int = 260):
    """Split long pages into sentence chunks for Kokoro's 510-phoneme limit, then stitch cleanly."""
    sents = re.findall(r"[^.!?]+(?:[.!?]+[\"\u201d\u2019)]*|$)", text) or [text]
    chunks = []
    cur = ""
    for s in sents:
        s = s.strip()
        if not s:
            continue
        if len(cur) + len(s) + 1 <= max_len:
            cur = (cur + " " + s).strip()
        else:
            if cur:
                chunks.append(cur)
            if len(s) <= max_len:
                cur = s
            else:
                # Split very long sentence at commas/dashes
                for part in re.split(r"(?<=[,;:\u2014—])\s+", s):
                    part = part.strip()
                    if not part:
                        continue
                    if len(cur) + len(part) + 1 <= max_len:
                        cur = (cur + " " + part).strip()
                    else:
                        if cur:
                            chunks.append(cur)
                        cur = part
    if cur:
        chunks.append(cur)
    return chunks


def synth_to_mp3(kokoro: Kokoro, text: str, voice: str, speed: float, out_path: Path, bitrate: int = 48):
    chunks = split_for_kokoro(text, 260)
    if not chunks:
        return False
    lang = "en-gb" if voice.startswith("b") else "en-us"
    audio_parts = []
    sr = 24000
    pause_samples = np.zeros(int(sr * 0.18), dtype=np.float32)
    for idx, ch in enumerate(chunks):
        samples, sr = kokoro.create(ch, voice=voice, speed=speed, lang=lang)
        audio_parts.append(samples.astype(np.float32))
        if idx < len(chunks) - 1:
            audio_parts.append(pause_samples)
    full = np.concatenate(audio_parts)
    # Normalize softly and convert to 16-bit PCM
    peak = float(np.max(np.abs(full))) if len(full) else 0.0
    if peak > 0.98:
        full = full * (0.98 / peak)
    pcm = np.clip(full * 32767.0, -32768, 32767).astype(np.int16)

    encoder = lameenc.Encoder()
    encoder.set_bit_rate(bitrate)
    encoder.set_in_sample_rate(sr)
    encoder.set_channels(1)
    encoder.set_quality(4)
    mp3_bytes = encoder.encode(pcm.tobytes()) + encoder.flush()

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_bytes(mp3_bytes)
    return True


def extract_game_data():
    node_code = r"""
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const npcs = [];
const shops = {};
const adventures = {};
const sandbox = {
  rollRandomLoot: () => [],
  window: {
    OAKHAVEN: {
      registerItems: () => {},
      registerShops: (s) => Object.assign(shops, s),
      registerNpcs: (arr) => { for (const n of arr) npcs.push(n); },
      registerQuests: (obj) => Object.assign(adventures, obj),
      registerAdventures: (obj) => Object.assign(adventures, obj),
      registerSpells: () => {},
      registerSkills: () => {},
      registerRecipes: () => {},
      registerClasses: () => {},
      registerRaces: () => {},
      registerSubclasses: () => {}
    }
  }
};
function loadFile(rel) {
  const code = fs.readFileSync(path.join(root, rel), 'utf8');
  new Function('window', 'rollRandomLoot', code)(sandbox.window, sandbox.rollRandomLoot);
}
loadFile('data/items/core_items.js');
for (const f of fs.readdirSync(path.join(root, 'data/npcs')).filter(x => x.endsWith('.js')).sort()) {
  loadFile('data/npcs/' + f);
}
for (const f of fs.readdirSync(path.join(root, 'data/quests')).filter(x => x.endsWith('.js')).sort()) {
  loadFile('data/quests/' + f);
}
console.log(JSON.stringify({ npcs, shops, adventures }));
"""
    res = subprocess.run(
        ["node", "-e", node_code],
        cwd=str(ROOT),
        capture_output=True,
        text=True,
        encoding="utf-8",
        check=True,
    )
    return json.loads(res.stdout)


def load_existing_manifest():
    if not MANIFEST_JS.exists():
        return {}
    txt = MANIFEST_JS.read_text(encoding="utf-8")
    m = re.search(r"window\.OAKHAVEN_VOICE_MANIFEST\s*=\s*(\{[\s\S]*\})\s*;", txt)
    if not m:
        return {}
    try:
        return json.loads(m.group(1))
    except Exception:
        return {}


def save_manifest(manifest: dict):
    MANIFEST_JS.parent.mkdir(parents=True, exist_ok=True)
    header = (
        "/* ============================================================\n"
        "   PRE-RECORDED KOKORO-82M STUDIO VOICE MANIFEST\n"
        "   Auto-generated by scripts/generate_voices.py\n"
        "   Key format: \"<voiceId>|<fnv1a32(cleanText)>\" -> \"audio/voices/...mp3\"\n"
        "   ============================================================ */\n"
    )
    body = json.dumps(dict(sorted(manifest.items())), indent=2, ensure_ascii=False)
    MANIFEST_JS.write_text(
        f"{header}window.OAKHAVEN_VOICE_MANIFEST = {body};\n", encoding="utf-8"
    )


def collect_town_jobs(data):
    jobs = []

    def add(char_key, slug, raw_text, name="", role=""):
        txt = clean_text(raw_text)
        if not txt:
            return
        voice, speed = get_town_voice(char_key, name, role)
        h = fnv1a_32(txt)
        key = f"{voice}|{h}"
        rel = f"audio/voices/town/{slug}_{h}.mp3"
        jobs.append((key, rel, txt, voice, speed))

    # Static shop quotes & Temple quote
    for shop_key, shop in data["shops"].items():
        add(shop_key, f"shop_{shop_key}", shop.get("quote", ""), shop.get("npc", ""), shop.get("name", ""))

    # Reactive shopkeeper greetings from js/engine.js (static ones without hero name)
    reactive_shop_lines = [
        ("armory", "shop_armory_hc", "No second chances beyond the gates, iron-nerve. Let me check every strap and edge before you head back out."),
        ("armory", "shop_armory_karak", "That dwarven ore from Karak-Zul still sings on my anvil — you've earned a smith's respect, friend!"),
        ("armory", "shop_armory_raven", "Since you cleared Ravencrest Citadel, fresh iron bars are rolling into Oakhaven again—pick yourself a proper edge!"),
        ("armory", "shop_armory_vet", "You've got the stance of a seasoned frontier veteran now. Time to trade up to heavier steel!"),
        ("apothecary", "shop_apoth_hurt", "Mercy, you've got fresh road-scrapes on you! Stock up on tonics before those bruises stiffen up."),
        ("apothecary", "shop_apoth_thorn", "Since you pushed back the Thornwood blight, my herb-pickers finally return with full baskets!"),
        ("apothecary", "shop_apoth_herb", "Ah, a fellow hand with roots and poultices! Smell that fresh glowcap tincture — finest batch all season."),
        ("curios", "shop_curios_spire", "The astral tides have calmed since your venture to the Crimson Spire — my brass astrolabe finally spins true again."),
        ("curios", "shop_curios_arc", "A bright arcane resonance follows you in today! Step close — half these charms only wake for a true spellcaster."),
        ("curios", "shop_curios_luck", "Curious... the silver pendulum behind my counter swings toward you. Fortune favors your steps today, traveler!"),
        ("selene", "temple_selene", "May the Dawn guard your steps. Should you fall in the dark, our bells will summon your spirit back to this altar—though whatever gold and gear you carried will be lost."),
    ]
    for ck, slug, txt in reactive_shop_lines:
        add(ck, slug, txt)

    # Tavern ambient barks
    barks = [
        "A timber-hauler warms his palms by the hearth: \"Fog's rolling thick off the Thornwood pines tonight — keep a dry torch in your pack.\"",
        "Two off-duty watchmen clack bone dice in the corner, arguing whether Saltfang's tide-caves hide smugglers or sea-beasts.",
        "Old Bram slides a foaming tankard across the oak bar: \"Hearth's hot, stew's thick, and half the frontier's secrets pass through this door.\"",
        "A traveling lutist plucks a quiet frontier ballad as rain patters softly against the Rusty Flagon's leaded windows.",
        "Sparks snap up the stone chimney while a hooded mapmaker traces charcoal lines across a stained frontier chart.",
        "A scarred sellsword raises a pewter mug in your direction: \"Hardcore blood, eh? One slip beyond the palisade and it's curtains — drink deep while you still draw breath!\"",
        "An old marsh-trapper leans across the table: \"Folks still whisper about Malakor's Sunken Vault—few ever walked back out of that bog with their boots dry!\"",
        "A caravan driver hoists a mug toward you: \"With Warlord Vane gone from Ravencrest, the east road's finally safe for honest wagons!\"",
        "A weathered dockhand grins over his ale: \"Since you cleared out Saltfang Cove, the harbor lanterns have burned twice as bright!\"",
        "Two prospectors clink mugs near the fire: \"Heard someone braved Karak-Zul and walked back out — Borin's been humming at his forge all week!\"",
        "A hush falls near the hearth as younger sellswords study your scarred gear—word of a frontier legend travels fast in Oakhaven.",
        "The hearthside bard tunes a silver string: \"Deed after deed—Oakhaven's children already trade tales of your name in the square!\"",
        "Old Bram wipes a mug and nods your way: \"Word travels fast down the frontier road, traveler. Good to see a proven blade back by the fire.\"",
    ]
    for idx, b in enumerate(barks):
        add("tavern_bark", f"bark_{idx+1}", b)

    # All Tavern NPCs (greetings + all option replies)
    for npc in data["npcs"]:
        nid = npc.get("id", "npc")
        name = npc.get("name", "")
        role = npc.get("role", "")
        safe_id = re.sub(r"[^a-z0-9_]+", "_", nid.lower())
        add(nid, f"npc_{safe_id}_greet", npc.get("greeting", ""), name, role)
        for idx, opt in enumerate(npc.get("options", [])):
            add(nid, f"npc_{safe_id}_opt{idx+1}", opt.get("reply", ""), name, role)

    return jobs


def collect_quest_jobs(data, quest_ids):
    jobs = []
    advs = data["adventures"]
    for qid in quest_ids:
        adv = advs.get(qid)
        if not adv:
            print(f"Warning: quest '{qid}' not found.", flush=True)
            continue
        safe_q = re.sub(r"[^a-z0-9_]+", "_", qid.lower())
        pages = adv.get("pages", {})
        for pnum, page in sorted(pages.items(), key=lambda kv: int(kv[0]) if str(kv[0]).isdigit() else 9999):
            txt = clean_text(page.get("text", ""))
            if not txt:
                continue
            h = fnv1a_32(txt)
            key = f"{QUEST_NARRATOR_VOICE}|{h}"
            rel = f"audio/voices/quests/{safe_q}_p{pnum}_{h}.mp3"
            jobs.append((key, rel, txt, QUEST_NARRATOR_VOICE, QUEST_NARRATOR_SPEED))
    return jobs


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--town", action="store_true", help="Generate all Oakhaven town NPC & tavern voices")
    ap.add_argument("--enriched", action="store_true", help="Generate all core + enriched quests")
    ap.add_argument("--all-quests", action="store_true", help="Generate all 325 quests in data/quests/*.js")
    ap.add_argument("--quests", type=str, default="", help="Comma-separated quest IDs to generate")
    ap.add_argument("--bitrate", type=int, default=48, help="MP3 bitrate in kbps (32 or 48)")
    ap.add_argument("--limit", type=int, default=0, help="Optional cap on newly generated clips this run")
    args = ap.parse_args()

    if not args.town and not args.enriched and not args.all_quests and not args.quests:
        ap.print_help()
        return

    ensure_models()
    data = extract_game_data()
    manifest = load_existing_manifest()

    jobs = []
    if args.town:
        jobs.extend(collect_town_jobs(data))

    quest_ids = []
    if args.all_quests:
        quest_ids.extend(sorted(data["adventures"].keys()))
    elif args.enriched:
        # Core quests + all enriched quests from scripts/quest_enrichment_log.json
        core_ids = ["malakor", "thornwood_part1", "thornwood_part2", "saltfang", "st_jude", "karak_zul", "crimson_spire"]
        quest_ids.extend(core_ids)
        log_path = ROOT / "scripts" / "quest_enrichment_log.json"
        if log_path.exists():
            qlog = json.loads(log_path.read_text(encoding="utf-8"))
            for qid in qlog.get("questPasses", {}).keys():
                if qid not in quest_ids:
                    quest_ids.append(qid)
    if args.quests:
        for qid in [x.strip() for x in args.quests.split(",") if x.strip()]:
            if qid not in quest_ids:
                quest_ids.append(qid)

    if quest_ids:
        jobs.extend(collect_quest_jobs(data, quest_ids))

    # Deduplicate by manifest key
    unique = {}
    for job in jobs:
        if job[0] not in unique:
            unique[job[0]] = job

    todo = []
    for key, rel, txt, voice, speed in unique.values():
        out_path = ROOT / rel
        if key in manifest and (ROOT / manifest[key]).exists():
            continue
        if out_path.exists():
            manifest[key] = rel
            continue
        todo.append((key, rel, txt, voice, speed))

    print(f"Total unique clips requested: {len(unique)} | Already cached: {len(unique) - len(todo)} | To generate: {len(todo)}", flush=True)
    if args.limit and len(todo) > args.limit:
        todo = todo[: args.limit]
        print(f"Capped to {args.limit} clips for this run.", flush=True)

    if not todo:
        save_manifest(manifest)
        print("All requested voice clips are already up to date!", flush=True)
        return

    kokoro = Kokoro(str(MODEL_ONNX), str(VOICES_BIN))
    generated = 0
    for idx, (key, rel, txt, voice, speed) in enumerate(todo, 1):
        out_path = ROOT / rel
        try:
            ok = synth_to_mp3(kokoro, txt, voice, speed, out_path, bitrate=args.bitrate)
            if ok:
                manifest[key] = rel
                generated += 1
                if generated % 20 == 0 or generated == len(todo):
                    save_manifest(manifest)
                    print(f"Progress: {idx}/{len(todo)} ({rel})", flush=True)
        except Exception as e:
            print(f"Error generating {rel}: {e}", flush=True)

    save_manifest(manifest)
    print(f"Done! Generated {generated} new MP3 clips. Total in manifest: {len(manifest)}.", flush=True)


if __name__ == "__main__":
    main()
