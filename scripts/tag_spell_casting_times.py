#!/usr/bin/env python3
"""
Scan Kobold Press Deep Magic / Tome of Heroes / Midgard sourcebook PDFs for
'Casting Time: 1 bonus action' and combine with official D&D 5e SRD/PHB Bonus Action
spell list, then update all spells in data/spells/*.js with explicit
`castingTime: "bonus"` or `castingTime: "action"`.
"""
import os, re, json
import fitz

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SPELLS_DIR = os.path.join(ROOT, "data", "spells")

# 1. Official D&D 5e PHB/SRD/XGE/TCE Bonus Action spells (lowercase)
KNOWN_5E_BONUS_SPELLS = {
    "healing word", "mass healing word", "misty step", "hex", "hunter's mark",
    "hunters mark", "shield of faith", "spiritual weapon", "shillelagh",
    "sanctuary", "expeditious retreat", "divine favor", "compelled duel",
    "ensnaring strike", "hail of thorns", "searing smite", "thunderous smite",
    "wrathful smite", "branding smite", "blinding smite", "staggering smite",
    "banishing smite", "flame blade", "magic weapon", "shadow blade",
    "zephyr strike", "far step", "swift quiver", "aura of vitality",
    "holy weapon", "blade of disaster", "kinetic jaunt", "ashardalon's stride",
    "spirit shroud", "starry wisp", "magic stone", "grasping vine",
    "dragon's breath", "dragons breath", "shadow of moil", "guardian of nature",
    "tenser's transformation", "tasha's otherworldly guise", "divine word",
    "word of radiance", "power word heal", "shield", "absorb elements",
    "counterspell", "hellish rebuke", "feather fall", "silvery barbs",
    "soul cage", "temporal shunt", "gift of gab",
    # Core Oakhaven quick wards / heals / steps
    "arcane shield", "shadow step", "stone skin", "iron skin", "barkskin",
    "battle cry", "battle hymn", "prayer of mending", "quick heal",
}

# 2. Scan Deep Magic & Warlock Grimoire PDFs in Books/ for "Casting Time: 1 bonus action"
pdf_bonus_spells = set()
spell_pdfs = []
for r, dirs, files in os.walk(os.path.join(ROOT, "Books")):
    for f in files:
        if f.lower().endswith(".pdf") and any(k in f.lower() for k in ("deep magic", "grimoire", "tome of heroes", "valiant", "midgard", "margreve")):
            spell_pdfs.append(os.path.join(r, f))

print(f"Scanning {len(spell_pdfs)} sourcebook spell PDFs for Bonus Action spells...")
for p in spell_pdfs:
    try:
        doc = fitz.open(p)
        for page in doc:
            txt = page.get_text("text")
            if "bonus action" not in txt.lower():
                continue
            lines = [ln.strip() for ln in txt.splitlines() if ln.strip()]
            for i, ln in enumerate(lines):
                if re.search(r"1\s+bonus\s+action", ln, re.I):
                    # Spell title is typically 1-4 lines above "Casting Time: 1 bonus action"
                    for back in range(1, min(6, i + 1)):
                        cand = lines[i - back]
                        if re.search(r"(casting time|cantrip|level|evocation|abjuration|conjuration|divination|enchantment|illusion|necromancy|transmutation|ritual|range:|components:|duration:)", cand, re.I):
                            continue
                        if 3 <= len(cand) <= 48 and not cand.endswith(".") and not cand[0].isdigit():
                            pdf_bonus_spells.add(cand.lower().strip())
                            break
        doc.close()
    except Exception:
        pass

ALL_BONUS_NAMES = KNOWN_5E_BONUS_SPELLS | pdf_bonus_spells
print(f"Found {len(pdf_bonus_spells)} Bonus Action spells in sourcebook PDFs (Total known Bonus spells: {len(ALL_BONUS_NAMES)})")

# 3. Update every spell object block in data/spells/*.js with castingTime: "bonus" or "action"
spell_files = sorted([f for f in os.listdir(SPELLS_DIR) if f.endswith(".js")])
total_spells = 0
bonus_count = 0
action_count = 0
bonus_examples = []

BONUS_NAME_PATTERNS = re.compile(
    r"\b(word|step|smite|mark|hex|ward|shield|cloak|mantle|veil|stride|jaunt|sprint|dash|shift|blink|flicker|grace|favor|blessing|aura|chant|hymn|whisper|quick|swift|flash|snap|instant)\b",
    re.I
)

block_re = re.compile(r"\{[^{}]*?(?:\"name\"|name)\s*:\s*\"([^\"]+)\"[^{}]*?\}", re.S)

for sf in spell_files:
    fpath = os.path.join(SPELLS_DIR, sf)
    content = open(fpath, "r", encoding="utf-8").read()
    is_quoted = '"name":' in content

    def replace_block(m):
        global total_spells, bonus_count, action_count
        blk = m.group(0)
        sname = m.group(1).strip()
        if "mp" not in blk:
            return blk
        s_low = sname.lower()
        total_spells += 1

        is_bonus = False
        if s_low in ALL_BONUS_NAMES:
            is_bonus = True
        elif ("dmgDice" not in blk and "dmgBase" not in blk) and ("shieldTurns" in blk or "evadeTurns" in blk or "healDice" in blk or "healBase" in blk) and BONUS_NAME_PATTERNS.search(sname):
            is_bonus = True

        ct = "bonus" if is_bonus else "action"
        if is_bonus:
            bonus_count += 1
            if len(bonus_examples) < 25:
                bonus_examples.append(sname)
        else:
            action_count += 1

        if re.search(r'(?:"castingTime"|castingTime)\s*:', blk):
            return re.sub(r'((?:"castingTime"|castingTime)\s*:\s*)"[^"]+"', rf'\1"{ct}"', blk)

        key_str = '"castingTime"' if is_quoted else 'castingTime'
        # Insert cleanly right after the mp line
        return re.sub(
            r'((?:"mp"|mp)\s*:\s*\d+\s*,)([ \t]*\r?\n?[ \t]*)',
            lambda mm: f'{mm.group(1)}{mm.group(2)}{key_str}: "{ct}",{mm.group(2)}',
            blk,
            count=1
        )

    new_content = block_re.sub(replace_block, content)
    if new_content != content:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_content)

print(f"Tagged {total_spells} spells across {len(spell_files)} files: {bonus_count} Bonus Action | {action_count} Action")
print("Sample Bonus Action spells:", ", ".join(bonus_examples))
