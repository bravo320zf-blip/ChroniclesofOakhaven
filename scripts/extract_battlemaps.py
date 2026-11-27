#!/usr/bin/env python3
"""
Extract & optimize authentic top-down battle maps from Books/ into images/battlemaps/source/,
match them to Chronicles of Oakhaven quests & biomes, and generate:
  - data/maps/battle_map_manifest.js
  - scripts/battlemap_generation_log.json
"""
import os, re, json, subprocess
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT_DIR = os.path.join(ROOT, "images", "battlemaps", "source")
MANIFEST_JS = os.path.join(ROOT, "data", "maps", "battle_map_manifest.js")
LOG_JSON = os.path.join(ROOT, "scripts", "battlemap_generation_log.json")

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(os.path.dirname(MANIFEST_JS), exist_ok=True)

# 1. Sourcebook maps to copy & optimize (slug -> relative path under Books/)
SOURCE_MAPS = {
    # Creature Codex Lairs (10 clean No-Grid biome battle maps)
    "biome_arctic":   "Books/Kobold Press/Creature-Codex-Lairs/Maps/ArcticBeach_NoGrid.jpg",
    "biome_cavern":   "Books/Kobold Press/Creature-Codex-Lairs/Maps/Caverns_NoGrid.jpg",
    "biome_rooftops": "Books/Kobold Press/Creature-Codex-Lairs/Maps/CityRoofs_NoGrid.jpg",
    "biome_city":     "Books/Kobold Press/Creature-Codex-Lairs/Maps/City_NoGrid.jpg",
    "biome_dungeon":  "Books/Kobold Press/Creature-Codex-Lairs/Maps/Dungeon_NoGrid.jpg",
    "biome_forest":   "Books/Kobold Press/Creature-Codex-Lairs/Maps/ForestTrail_NoGrid.jpg",
    "biome_plains":   "Books/Kobold Press/Creature-Codex-Lairs/Maps/GrassyPlains_NoGrid.jpg",
    "biome_harbor":   "Books/Kobold Press/Creature-Codex-Lairs/Maps/Harbor_NoGrid.jpg",
    "biome_swamp":    "Books/Kobold Press/Creature-Codex-Lairs/Maps/Swamp_NoGrid.jpg",
    "biome_ruins":    "Books/Kobold Press/Creature-Codex-Lairs/Maps/TowerRuins_NoGrid.jpg",

    # 12 Peculiar Towers Map Pack (exact quest maps)
    "pt_bloodstone_tower":     "Books/Kobold Press/12 Peculiar Towers/12 Peculiar Towers Map Pack/Bloodstone Tower.jpg",
    "pt_lunar_knight":         "Books/Kobold Press/12 Peculiar Towers/12 Peculiar Towers Map Pack/Court of the Lunar Knight NO GRID.jpg",
    "pt_grimspire_ruins":      "Books/Kobold Press/12 Peculiar Towers/12 Peculiar Towers Map Pack/Grimspire Ruins.jpg",
    "pt_lighthouse":           "Books/Kobold Press/12 Peculiar Towers/12 Peculiar Towers Map Pack/Lighthouse.jpg",
    "pt_midnight_tree":        "Books/Kobold Press/12 Peculiar Towers/12 Peculiar Towers Map Pack/Midnight Tree No GRID.jpg",
    "pt_ragganis_redoubt":     "Books/Kobold Press/12 Peculiar Towers/12 Peculiar Towers Map Pack/Ragganis Redoubt.jpg",
    "pt_rough_run_respite":    "Books/Kobold Press/12 Peculiar Towers/12 Peculiar Towers Map Pack/Rough Run Respite.jpg",
    "pt_solanna_bael":         "Books/Kobold Press/12 Peculiar Towers/12 Peculiar Towers Map Pack/Solanna Bael.jpg",
    "pt_spire_sungod":         "Books/Kobold Press/12 Peculiar Towers/12 Peculiar Towers Map Pack/Spire of the Sungod.jpg",
    "pt_stormcaller_tower":    "Books/Kobold Press/12 Peculiar Towers/12 Peculiar Towers Map Pack/Stormcaller Tower.jpg",
    "pt_usurpers_tower":       "Books/Kobold Press/12 Peculiar Towers/12 Peculiar Towers Map Pack/Usurpers Tower.jpg",
    "pt_windward_tower":       "Books/Kobold Press/12 Peculiar Towers/12 Peculiar Towers Map Pack/Windward Tower NO GRID.jpg",

    # Midgard Sagas Map Pack (No-Grid maps)
    "ms_beryksheim":           "Books/Kobold Press/Midgard Sagas/Midgard Sagas Map Pack/Blood_Beryksheim NO GRID.jpg",
    "ms_blood_source":         "Books/Kobold Press/Midgard Sagas/Midgard Sagas Map Pack/Blood_The Source NO GRID.jpg",
    "ms_legora_dungeons":      "Books/Kobold Press/Midgard Sagas/Midgard Sagas Map Pack/Legora_Dungeons NO GRID.jpg",
    "ms_lounge":               "Books/Kobold Press/Midgard Sagas/Midgard Sagas Map Pack/Lounge NO GRID.jpg",
    "ms_raiders":              "Books/Kobold Press/Midgard Sagas/Midgard Sagas Map Pack/Raiders_map2 NO GRID.jpg",
    "ms_wage_war":             "Books/Kobold Press/Midgard Sagas/Midgard Sagas Map Pack/Wage_War_map4 NO GRID.jpg",
    "ms_wake_war_12":          "Books/Kobold Press/Midgard Sagas/Midgard Sagas Map Pack/Wake_War_map1&2 NO GRID.jpg",
    "ms_wake_war_3":           "Books/Kobold Press/Midgard Sagas/Midgard Sagas Map Pack/Wake_War_map3 NO GRID.jpg",
    "ms_archway":              "Books/Kobold Press/Midgard Sagas/Midgard Sagas Map Pack/archway NO GRID.jpg",
    "ms_legora":               "Books/Kobold Press/Midgard Sagas/Midgard Sagas Map Pack/legora NO GRID.jpg",
    "ms_madman":               "Books/Kobold Press/Midgard Sagas/Midgard Sagas Map Pack/madman_map_layers_v2 NO GRID.jpg",

    # Book of Lairs & Prepared 2 & Scarlet Citadel (PC / clean maps)
    "bol_everforge":           "Books/Kobold Press/Book of Lairs/Maps/Lost Halls of Everforge/Lost Halls of Everforge Map.jpg",
    "p2_ooze_tomb":            "Books/Kobold Press/Prepared2/Ooze Tomb of the Oathbreaker/Full Map.png",
    "sc_crypt":                "Books/Kobold Press/Scarlet Citadel/Scarlet-Citadel-Map-Pack-zgitz6/Map - PC 01 Family Crypt.jpg",
    "sc_scriptorium":          "Books/Kobold Press/Scarlet Citadel/Scarlet-Citadel-Map-Pack-zgitz6/Map - PC 02 Scriptorium and Alchemist's Furnace.jpg",
    "sc_clacking_caverns":     "Books/Kobold Press/Scarlet Citadel/Scarlet-Citadel-Map-Pack-zgitz6/Map - PC 03 Clacking Caverns.jpg",
    "sc_dwarven_barracks":     "Books/Kobold Press/Scarlet Citadel/Scarlet-Citadel-Map-Pack-zgitz6/Map - PC 03 Dwarven Barracks.jpg",
    "sc_bat_caverns":          "Books/Kobold Press/Scarlet Citadel/Scarlet-Citadel-Map-Pack-zgitz6/Map - PC 04 Bat Caverns.jpg",
    "sc_black_river":          "Books/Kobold Press/Scarlet Citadel/Scarlet-Citadel-Map-Pack-zgitz6/Map - PC 05 Black River 501-517.jpg",
    "sc_howling_halls":        "Books/Kobold Press/Scarlet Citadel/Scarlet-Citadel-Map-Pack-zgitz6/Map - PC 06 Howling Halls.jpg",
}

def optimize_map(src_rel, slug):
    src = os.path.join(ROOT, src_rel)
    if not os.path.exists(src):
        return None
    dst = os.path.join(OUT_DIR, f"{slug}.jpg")
    if not os.path.exists(dst):
        img = Image.open(src).convert("RGB")
        # Crop/fit nicely to 12:8 (3:2) aspect ratio or max 960x640
        w, h = img.size
        target_ratio = 1.5
        cur_ratio = w / float(h)
        if cur_ratio > target_ratio * 1.15:
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            img = img.crop((left, 0, left + new_w, h))
        elif cur_ratio < target_ratio * 0.85:
            new_h = int(w / target_ratio)
            top = (h - new_h) // 2
            img = img.crop((0, top, w, top + new_h))
        img.thumbnail((960, 640), Image.Resampling.LANCZOS)
        img.save(dst, "JPEG", quality=82, optimize=True)
    return f"images/battlemaps/source/{slug}.jpg"

extracted = {}
for slug, rel in SOURCE_MAPS.items():
    out = optimize_map(rel, slug)
    if out:
        extracted[slug] = out

print(f"Extracted/verified {len(extracted)} sourcebook battle maps into images/battlemaps/source/")

# 2. Load all quests & combat encounters via node
node_script = r"""
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
const out = [];
for (const [qid, q] of Object.entries(ctx.window.OAKHAVEN.quests)) {
  const combats = [];
  for (const [pn, p] of Object.entries(q.pages || {})) {
    if (p.enemy) {
      combats.push({
        page: Number(pn),
        pageTitle: p.title || '',
        enemyName: p.enemy.name || '',
        enemyDesc: p.enemy.desc || '',
        textSnippet: (p.text || '').slice(0, 220)
      });
    }
  }
  out.push({
    id: qid,
    title: q.title || '',
    subtitle: q.subtitle || '',
    region: q.region || '',
    combats
  });
}
console.log(JSON.stringify(out));
"""
res = subprocess.run(["node", "-e", node_script], cwd=ROOT, capture_output=True, text=True, check=True)
quests_data = json.loads(res.stdout)

# 3. Exact quest -> sourcebook map matching rules (substring match on id or lowercase title)
EXACT_MATCH_RULES = [
    (["bloodstone_tower", "bloodstone tower"], "pt_bloodstone_tower"),
    (["lunar_knight", "court of the lunar"], "pt_lunar_knight"),
    (["grimspire"], "pt_grimspire_ruins"),
    (["lighthouse", "sunken_lighthouse"], "pt_lighthouse"),
    (["midnight_tree", "midnight tree"], "pt_midnight_tree"),
    (["ragganis"], "pt_ragganis_redoubt"),
    (["rough_run", "rough run"], "pt_rough_run_respite"),
    (["solanna_bael", "solanna bael"], "pt_solanna_bael"),
    (["sungod", "sun god", "spire of the sun"], "pt_spire_sungod"),
    (["stormcaller"], "pt_stormcaller_tower"),
    (["usurper"], "pt_usurpers_tower"),
    (["windward"], "pt_windward_tower"),
    (["beryksheim", "blood_in_the_water", "ms_1_"], "ms_beryksheim"),
    (["legora"], "ms_legora_dungeons"),
    (["everforge"], "bol_everforge"),
    (["ooze_tomb", "oathbreaker"], "p2_ooze_tomb"),
    (["scarlet_citadel", "crypt", "catacomb", "ossuary", "barrows", "mausoleum"], "sc_crypt"),
    (["scriptorium", "alchemist", "laboratory", "atelier"], "sc_scriptorium"),
    (["howling_halls", "citadel", "fortress", "keep"], "sc_howling_halls"),
]

BIOMES = {
    "dungeon":  extracted.get("biome_dungeon"),
    "cavern":   extracted.get("biome_cavern"),
    "forest":   extracted.get("biome_forest"),
    "coast":    extracted.get("biome_harbor"),
    "harbor":   extracted.get("biome_harbor"),
    "city":     extracted.get("biome_city"),
    "rooftops": extracted.get("biome_rooftops"),
    "plains":   extracted.get("biome_plains"),
    "swamp":    extracted.get("biome_swamp"),
    "ruins":    extracted.get("biome_ruins"),
    "arctic":   extracted.get("biome_arctic"),
    "crypt":    extracted.get("sc_crypt") or extracted.get("biome_dungeon"),
    "tavern":   extracted.get("ms_lounge") or extracted.get("biome_city"),
    "tower":    extracted.get("pt_windward_tower") or extracted.get("biome_ruins"),
}

quest_map_entries = {}
encounters_log = []
exact_matched_quests = 0
exact_matched_combats = 0
total_combats = 0

for q in quests_data:
    hay = f"{q['id']} {q['title']} {q['subtitle']}".lower()
    matched_slug = None
    # Strictly exact sourcebook matches (only the explicit 1-to-1 adventures)
    for keys, slug in EXACT_MATCH_RULES[:16]:
        if any(k in hay for k in keys) and slug in extracted:
            matched_slug = slug
            break
    if matched_slug:
        quest_map_entries[q["id"]] = extracted[matched_slug]
        exact_matched_quests += 1

    for c in q["combats"]:
        total_combats += 1
        key = f"{q['id']}_p{c['page']}"
        has_exact = matched_slug is not None
        if has_exact:
            exact_matched_combats += 1
        encounters_log.append({
            "key": key,
            "questId": q["id"],
            "questTitle": q["title"],
            "page": c["page"],
            "pageTitle": c["pageTitle"],
            "enemyName": c["enemyName"],
            "status": "sourcebook" if has_exact else "pending_gen",
            "mapPath": extracted[matched_slug] if has_exact else None
        })

# 4. Write data/maps/battle_map_manifest.js
manifest_obj = {
    "biomes": BIOMES,
    "quests": quest_map_entries,
    "encounters": {}
}
js_content = (
    "// Auto-generated Battle Map Manifest for Chronicles of Oakhaven VTT Combat\n"
    "window.OAKHAVEN = window.OAKHAVEN || {};\n"
    "window.OAKHAVEN.battleMaps = " + json.dumps(manifest_obj, indent=2) + ";\n"
)
with open(MANIFEST_JS, "w", encoding="utf-8") as f:
    f.write(js_content)

# 5. Write scripts/battlemap_generation_log.json
log_obj = {
    "totalQuestCombats": total_combats,
    "sourcebookMatched": exact_matched_combats,
    "customGenerated": 0,
    "pendingGeneration": total_combats - exact_matched_combats,
    "exactMatchedQuests": exact_matched_quests,
    "encounters": encounters_log
}
with open(LOG_JSON, "w", encoding="utf-8") as f:
    json.dump(log_obj, f, indent=2)

print(f"Quests with exact sourcebook maps: {exact_matched_quests} ({exact_matched_combats} combats)")
print(f"Total combats: {total_combats} | Pending custom generation: {total_combats - exact_matched_combats}")
print(f"Wrote {MANIFEST_JS} and {LOG_JSON}")
