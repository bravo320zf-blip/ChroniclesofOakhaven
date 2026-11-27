#!/usr/bin/env python3
"""
Extract authentic monster portrait tokens from sourcebook PDFs (ToV Monster Vault,
Creature Codex, Tome of Beasts 1/2/3, Warlock Bestiary) and standalone Books/ art,
match them to all Chronicles of Oakhaven quest + Outskirts monsters, and output:
  - images/monsters/source/<slug>.jpg (256x256 VTT portrait tokens)
  - data/maps/monster_art_manifest.js
  - scripts/monster_art_generation_log.json
"""
import os, re, io, json, subprocess
import fitz
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT_DIR = os.path.join(ROOT, "images", "monsters", "source")
MANIFEST_JS = os.path.join(ROOT, "data", "maps", "monster_art_manifest.js")
LOG_JSON = os.path.join(ROOT, "scripts", "monster_art_generation_log.json")

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(os.path.dirname(MANIFEST_JS), exist_ok=True)

BESTIARY_PDFS = [
    ("tov", "Books/Kobold Press/Tales of the Valiant/ToV-Monster-Vault.pdf"),
    ("cc",  "Books/Kobold Press/Creature Codex/Creature Codex.pdf"),
    ("tob1","Books/Kobold Press/Tome of Beasts/Tome of Beasts.pdf"),
    ("tob2","Books/Kobold Press/Tome of Beasts 2/Tome of Beasts 2.pdf"),
    ("tob3","Books/Kobold Press/Tome of Beasts 3/Tome of Beasts 3 for 5th Edition.pdf"),
    ("wb",  "Books/Kobold Press/Warlock/Misc/Warlock Bestiary.pdf"),
]

STOP_WORDS = {
    "the", "of", "and", "in", "a", "an", "to", "from", "with", "on", "at", "by",
    "lord", "lady", "king", "queen", "chief", "chieftain", "matriarch", "patriarch",
    "elder", "ancient", "giant", "greater", "lesser", "dark", "shadow", "corrupted",
    "cursed", "risen", "fallen", "wild", "feral", "rogue", "elite", "royal", "high",
    "guard", "guards", "scout", "scouts", "raider", "raiders", "warrior", "warriors",
    "pack", "swarm", "brood", "band", "crew", "gang", "cult", "cultist", "cultists",
    "zealot", "zealots", "acolyte", "acolytes", "minion", "minions", "sentinel",
    "sentinels", "warden", "wardens", "stalker", "stalkers", "hunter", "hunters",
    "chilled", "weakened", "purged", "unbound", "staggered", "enraged", "frenzied",
    "bound", "possessed", "mad", "crazed", "veteran", "captain", "master", "boss",
    "alpha", "young", "juvenile", "hatchling", "hatchlings", "whelpling", "whelplings",
}

def slugify(s):
    s = re.sub(r"[^a-z0-9]+", "_", s.lower()).strip("_")
    return s[:64] or "monster"

def normalize_name(s):
    s = re.sub(r"\([^)]*\)", "", s)
    s = s.replace("’", "'").replace("'", "")
    # Handle inverted bestiary headings like "Drake, Cave" -> "Cave Drake"
    if "," in s:
        parts = [p.strip() for p in s.split(",", 1)]
        if len(parts) == 2 and len(parts[1].split()) <= 3:
            s = f"{parts[1]} {parts[0]}"
    s = re.sub(r"[^a-z0-9\s]", " ", s.lower())
    return re.sub(r"\s+", " ", s).strip()

def singularize(w):
    if len(w) <= 3:
        return w
    if w.endswith("ies") and len(w) > 4:
        return w[:-3] + "y"
    if w.endswith("ves") and len(w) > 4:
        return w[:-3] + "f"
    if w.endswith("es") and (w.endswith("shes") or w.endswith("ches") or w.endswith("xes") or w.endswith("zes")):
        return w[:-2]
    if w.endswith("s") and not w.endswith("ss") and not w.endswith("us"):
        return w[:-1]
    return w

def norm_words(s):
    return [singularize(w) for w in normalize_name(s).split() if w]

def save_square_token(img, dst_path):
    if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
        rgba = img.convert("RGBA")
        bg = Image.new("RGBA", rgba.size, (28, 22, 20, 255))
        bg.alpha_composite(rgba)
        img = bg.convert("RGB")
    else:
        img = img.convert("RGB")

    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    # Bias vertical crop slightly toward top (18%) to frame creature heads/torsos
    top = int((h - side) * 0.18)
    img = img.crop((left, top, left + side, top + side))
    img = img.resize((256, 256), Image.Resampling.LANCZOS)
    img.save(dst_path, "JPEG", quality=84, optimize=True)

# 1. Collect all unique monsters from quests + Outskirts via Node
node_code = r"""
const fs = require('fs'), vm = require('vm'), path = require('path');
const ctx = {
  rollRandomLoot: () => ['health_potion'],
  window: { OAKHAVEN: {
    quests: {},
    registerQuests(q){ Object.assign(this.quests, q); },
    registerQuest(id, q){ this.quests[id] = q; },
    registerItems(){}, registerSpells(){}, items:{}, spells:{},
    rollRandomLoot: () => ['health_potion']
  }}
};
ctx.OAKHAVEN = ctx.window.OAKHAVEN;
for (const f of fs.readdirSync('data/quests').filter(x => x.endsWith('.js'))) {
  vm.runInNewContext(fs.readFileSync(path.join('data/quests', f), 'utf8'), ctx);
}
const monsters = {};
for (const [qid, q] of Object.entries(ctx.window.OAKHAVEN.quests)) {
  for (const [pn, p] of Object.entries(q.pages || {})) {
    if (p.enemy && p.enemy.name) {
      const n = p.enemy.name.trim();
      if (!monsters[n]) monsters[n] = { name: n, desc: p.enemy.desc || '', questId: qid, questTitle: q.title || '' };
    }
  }
}
// Also pull Outskirts zone enemies from js/engine.js
const eng = fs.readFileSync('js/engine.js', 'utf8');
const zM = eng.match(/const WILDERNESS_ZONES = \[[\s\S]*?\n    \];/);
if (zM) {
  const zones = new Function(zM[0] + '; return WILDERNESS_ZONES;')();
  for (const z of zones) {
    for (const e of (z.enemies || [])) {
      if (e && e.name && !monsters[e.name]) {
        monsters[e.name] = { name: e.name, desc: e.desc || '', questId: 'outskirts_' + z.id, questTitle: z.name };
      }
    }
  }
}
console.log(JSON.stringify(Object.values(monsters)));
"""
res = subprocess.run(["node", "-e", node_code], cwd=ROOT, capture_output=True, text=True, check=True)
game_monsters = json.loads(res.stdout)
print(f"Total unique game monsters (quests + outskirts): {len(game_monsters)}")

# 2. Index standalone monster images in Books/
standalone_index = {}
for r, dirs, files in os.walk(os.path.join(ROOT, "Books")):
    if "monsters" not in r.lower():
        continue
    for f in files:
        if not f.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
            continue
        base = re.sub(r"\s*token$", "", os.path.splitext(f)[0], flags=re.I).strip()
        base = re.sub(r"\.jpg$", "", base, flags=re.I).strip()
        key = " ".join(norm_words(base))
        if key and (key not in standalone_index or "token" in f.lower()):
            standalone_index[key] = os.path.join(r, f)
print(f"Indexed {len(standalone_index)} standalone monster images in Books/")

# 3. Index bestiary PDFs (TOC entries + repeated-image filter)
bestiary_entries = []  # list of { norm, words, raw, pdf_idx, page, slug }
open_docs = []
repeated_xrefs = []

for idx, (tag, rel_path) in enumerate(BESTIARY_PDFS):
    full = os.path.join(ROOT, rel_path)
    if not os.path.exists(full):
        open_docs.append(None)
        repeated_xrefs.append(set())
        continue
    doc = fitz.open(full)
    open_docs.append(doc)
    # Count xref occurrences across a sample of pages to identify recurring backgrounds/borders
    xref_counts = {}
    step = max(1, len(doc) // 120)
    for pno in range(0, len(doc), step):
        for im in doc[pno].get_images(full=False):
            xref = im[0]
            xref_counts[xref] = xref_counts.get(xref, 0) + 1
    repeated_xrefs.append({x for x, c in xref_counts.items() if c >= 3})

    toc = doc.get_toc()
    for level, title, page_num in toc:
        t = (title or "").strip()
        if len(t) < 3 or t.lower().startswith(("chapter", "appendix", "table of", "introduction", "monsters by", "index", "credits", "ogl", "legal", "customizing", "elements of", "understanding", "terrain", "creature types", "npcs")):
            continue
        if len(t) == 1:
            continue
        words = norm_words(t)
        if not words:
            continue
        bestiary_entries.append({
            "norm": " ".join(words),
            "words": set(words),
            "word_list": words,
            "raw": t,
            "tag": tag,
            "pdf_idx": idx,
            "page": max(0, page_num - 1),
            "slug": f"{tag}_{slugify(t)}"
        })

print(f"Indexed {len(bestiary_entries)} bestiary TOC entries across {len(BESTIARY_PDFS)} PDFs")

# Fast lookup structures
exact_map = {}
for e in bestiary_entries:
    if e["norm"] not in exact_map:
        exact_map[e["norm"]] = e

def find_bestiary_match(monster_name, monster_desc=""):
    m_words = norm_words(monster_name)
    m_norm = " ".join(m_words)
    if not m_norm:
        return None

    # A. Exact standalone image match
    if m_norm in standalone_index:
        return ("standalone", m_norm, standalone_index[m_norm])

    # B. Exact bestiary match
    if m_norm in exact_map:
        return ("pdf", exact_map[m_norm]["slug"], exact_map[m_norm])

    # C. Try multi-word n-grams (longest first, 3 -> 2 -> 1 words) inside monster_name
    for n in (3, 2):
        for i in range(len(m_words) - n + 1):
            sub = " ".join(m_words[i:i+n])
            if sub in exact_map:
                return ("pdf", exact_map[sub]["slug"], exact_map[sub])
            if sub in standalone_index:
                return ("standalone", sub, standalone_index[sub])

    # D. Try single meaningful creature noun (excluding generic STOP_WORDS) from the end of monster_name first
    for w in reversed(m_words):
        if len(w) >= 4 and w not in STOP_WORDS:
            if w in standalone_index:
                return ("standalone", w, standalone_index[w])
            if w in exact_map:
                return ("pdf", exact_map[w]["slug"], exact_map[w])

    # E. Check if a 2-word bestiary entry is fully contained in monster_name words
    m_set = set(m_words)
    best_e = None
    best_score = 0
    for e in bestiary_entries:
        ew = e["words"]
        if len(ew) >= 2 and ew.issubset(m_set):
            # Must contain at least one non-stop word
            if any(w not in STOP_WORDS for w in ew):
                sc = len(ew) * 10
                if sc > best_score:
                    best_score = sc
                    best_e = e
    if best_e:
        return ("pdf", best_e["slug"], best_e)

    # F. Check creature nouns in monster_desc as a careful fallback (only exact 2-word bestiary names or iconic single-word monsters)
    d_words = norm_words(monster_desc)
    for n in (2, 1):
        for i in range(len(d_words) - n + 1):
            sub = " ".join(d_words[i:i+n])
            if n == 1 and (len(sub) < 4 or sub in STOP_WORDS):
                continue
            if sub in exact_map:
                return ("pdf", exact_map[sub]["slug"], exact_map[sub])

    return None

def extract_pdf_monster_image(entry):
    slug = entry["slug"]
    dst = os.path.join(OUT_DIR, f"{slug}.jpg")
    if os.path.exists(dst):
        return f"images/monsters/source/{slug}.jpg"

    doc = open_docs[entry["pdf_idx"]]
    if not doc:
        return None
    rep = repeated_xrefs[entry["pdf_idx"]]

    # Search the entry page (and +1 page if illustration is on facing/next page)
    best_img = None
    best_area = 0
    for p_off in (0, 1):
        pno = entry["page"] + p_off
        if pno < 0 or pno >= len(doc):
            continue
        page = doc[pno]
        for im in page.get_images(full=True):
            xref, smask, w, h = im[0], im[1], im[2], im[3]
            if xref in rep:
                continue
            if w < 140 or h < 140:
                continue
            aspect = w / float(h)
            if aspect < 0.35 or aspect > 2.6:
                continue
            # Skip full-page scanned backgrounds
            if w > 1900 and h > 2400:
                continue
            area = w * h
            if area > best_area:
                best_area = area
                best_img = (xref, smask)
        if best_img:
            break

    if not best_img:
        return None

    xref, smask = best_img
    try:
        base = doc.extract_image(xref)
        pil_img = Image.open(io.BytesIO(base["image"]))
        if smask and smask > 0:
            try:
                mask_data = doc.extract_image(smask)
                mask_img = Image.open(io.BytesIO(mask_data["image"])).convert("L")
                if mask_img.size != pil_img.size:
                    mask_img = mask_img.resize(pil_img.size, Image.Resampling.LANCZOS)
                pil_img = pil_img.convert("RGBA")
                pil_img.putalpha(mask_img)
            except Exception:
                pass
        save_square_token(pil_img, dst)
        return f"images/monsters/source/{slug}.jpg"
    except Exception:
        return None

by_name = {}
log_entries = []
matched_count = 0
pending_count = 0
unique_files_extracted = set()

for m in game_monsters:
    name = m["name"]
    match = find_bestiary_match(name, m.get("desc", ""))
    rel_out = None
    source_label = None

    if match:
        kind, slug_key, payload = match
        if kind == "standalone":
            slug = f"book_{slugify(slug_key)}"
            dst = os.path.join(OUT_DIR, f"{slug}.jpg")
            if not os.path.exists(dst):
                try:
                    save_square_token(Image.open(payload), dst)
                except Exception:
                    dst = None
            if dst and os.path.exists(dst):
                rel_out = f"images/monsters/source/{slug}.jpg"
                source_label = f"standalone:{os.path.basename(payload)}"
        elif kind == "pdf":
            rel_out = extract_pdf_monster_image(payload)
            if rel_out:
                source_label = f"{payload['tag']}:{payload['raw']}"

    if rel_out:
        by_name[name] = rel_out
        unique_files_extracted.add(rel_out)
        matched_count += 1
        log_entries.append({
            "name": name,
            "desc": m.get("desc", ""),
            "questId": m.get("questId", ""),
            "status": "sourcebook",
            "source": source_label,
            "artPath": rel_out
        })
    else:
        pending_count += 1
        log_entries.append({
            "name": name,
            "desc": m.get("desc", ""),
            "questId": m.get("questId", ""),
            "status": "pending_gen",
            "source": None,
            "artPath": None
        })

for d in open_docs:
    if d:
        d.close()

# Write data/maps/monster_art_manifest.js
js_out = (
    "// Auto-generated Monster Portrait Art Manifest for Chronicles of Oakhaven VTT\n"
    "window.OAKHAVEN = window.OAKHAVEN || {};\n"
    "window.OAKHAVEN.monsterArt = " + json.dumps({"byName": by_name}, indent=2) + ";\n"
)
with open(MANIFEST_JS, "w", encoding="utf-8") as f:
    f.write(js_out)

# Write scripts/monster_art_generation_log.json
log_out = {
    "totalMonsters": len(game_monsters),
    "sourcebookMatched": matched_count,
    "uniqueArtFilesExtracted": len(unique_files_extracted),
    "customGenerated": 0,
    "pendingGeneration": pending_count,
    "monsters": log_entries
}
with open(LOG_JSON, "w", encoding="utf-8") as f:
    json.dump(log_out, f, indent=2)

print(f"Matched {matched_count}/{len(game_monsters)} monsters ({len(unique_files_extracted)} unique token portraits extracted)!")
print(f"Pending custom monster art generation (Phase 4): {pending_count}")
print(f"Wrote {MANIFEST_JS} and {LOG_JSON}")
