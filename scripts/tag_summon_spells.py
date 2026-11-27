#!/usr/bin/env python3
"""
Tag all summoning/conjuring/animating spells across data/spells/*.js with
`summonKey: "<bestiary_key>"` so casting them spawns a real player-controlled
sourcebook creature token onto the VTT battlemap!
"""
import os, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SPELLS_DIR = os.path.join(ROOT, "data", "spells")

RULES = [
    (r"ghoul", "ghoul"),
    (r"shadow mastiff", "shadow_mastiff"),
    (r"fey hound|spellhound|hound|wolf|beast|mock animal", "fey_hound"),
    (r"nightmare|steed", "nightmare"),
    (r"forest defender|thicket|treant|dryad", "forest_defender"),
    (r"spectral|ghost|wraith|spirit|ferryman|elder", "spectral_dead"),
    (r"fiend|demon|devil|imp", "fiend"),
    (r"giant|titan|colossus", "giant"),
    (r"scarab|rat|vermin|swarm|scroll|animated object|mantelet", "swarm"),
    (r"avatar|star|angel|celestial", "celestial_avatar"),
    (r"eldritch|servitor|void|aberration|shadow", "eldritch_servitor"),
    (r"undead|skeleton|zombie|dead", "skeleton"),
]

SUMMON_TITLE_RE = re.compile(r"\b(summon|conjure|animate|animated|raise|call shadow)\b", re.I)
block_re = re.compile(r"\{[^{}]*?(?:\"name\"|name)\s*:\s*\"([^\"]+)\"[^{}]*?\}", re.S)

tagged = []
for sf in sorted(os.listdir(SPELLS_DIR)):
    if not sf.endswith(".js"):
        continue
    fpath = os.path.join(SPELLS_DIR, sf)
    content = open(fpath, "r", encoding="utf-8").read()
    is_quoted = '"name":' in content

    def repl(m):
        blk = m.group(0)
        sname = m.group(1).strip()
        if not SUMMON_TITLE_RE.search(sname):
            return blk
        if "summonKey" in blk:
            return blk
        low = sname.lower()
        key = "eldritch_servitor"
        for pat, k in RULES:
            if re.search(pat, low):
                key = k
                break
        tagged.append((sname, key))
        kstr = '"summonKey"' if is_quoted else 'summonKey'
        return re.sub(
            r'((?:"castingTime"|castingTime)\s*:\s*"[^"]+"\s*,)([ \t]*\r?\n?[ \t]*)',
            lambda mm: f'{mm.group(1)}{mm.group(2)}{kstr}: "{key}",{mm.group(2)}',
            blk,
            count=1
        )

    new_c = block_re.sub(repl, content)
    if new_c != content:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_c)

print(f"Tagged {len(tagged)} summon spells across data/spells/*.js:")
for n, k in tagged[:35]:
    print(f"  {n} -> {k}")
