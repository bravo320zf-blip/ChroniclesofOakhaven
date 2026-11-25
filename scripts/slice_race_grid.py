#!/usr/bin/env python3
"""
Chronicles of Oakhaven — 4x4 Race Class-Grid Slicer & Round Token Masker
Slices a generated 4x4 grid image of 14 class portraits for a single race
into 14 crisp 512x512 transparent-background round VTT tokens matching
images/Yogi Bee Token 2.png, saved to images/tokens/<raceId>_<classId>.png.

Grid layout (4 columns x 4 rows, row-major order, first 14 cells):
  Row 1: warrior, rogue, arcanist (Wizard), cleric
  Row 2: ranger, barbarian, bard, druid
  Row 3: monk, paladin, sorcerer, warlock
  Row 4: theurge, witch, [unused], [unused]

Usage:
  python scripts/slice_race_grid.py --status
  python scripts/slice_race_grid.py --race human --input path/to/grid.jpg
"""
import argparse
import os
import sys
from PIL import Image, ImageDraw

OUT_DIR = os.path.join("images", "tokens")
TOKEN_SIZE = 512

CLASS_ORDER = [
    "warrior", "rogue", "arcanist", "cleric",
    "ranger", "barbarian", "bard", "druid",
    "monk", "paladin", "sorcerer", "warlock",
    "theurge", "witch",
]

RACE_ORDER = [
    "human", "bearfolk", "elf", "dwarf", "halfling", "half_orc",
    "centaur", "dhampir", "gearforged", "gnoll", "minotaur", "catfolk",
    "ratfolk", "ravenfolk", "shadow_fey", "trollkin", "alseid", "erina",
    "piney", "drow", "mushroomfolk", "darakhul", "derro", "satarre",
    "shade", "midgard_dwarf", "midgard_elf", "midgard_gnome", "elfmarked_human",
    "kariv_human", "midgard_kobold", "winterfolk_halfling", "southlands_dwarf",
    "southlands_elf", "forest_gnome", "midgard_halfling",
]


def make_circular_token(img: Image.Image) -> Image.Image:
    w, h = img.size
    # Trim 4% margin off each cell edge to avoid grid lines/borders
    mx, my = int(w * 0.04), int(h * 0.04)
    im = img.crop((mx, my, w - mx, h - my))
    cw, ch = im.size
    side = min(cw, ch)
    left = (cw - side) // 2
    top = (ch - side) // 2
    im = im.crop((left, top, left + side, top + side)).resize((TOKEN_SIZE, TOKEN_SIZE), Image.Resampling.LANCZOS).convert("RGBA")

    mask = Image.new("L", (TOKEN_SIZE * 2, TOKEN_SIZE * 2), 0)
    md = ImageDraw.Draw(mask)
    pad = 12
    md.ellipse((pad, pad, TOKEN_SIZE * 2 - pad, TOKEN_SIZE * 2 - pad), fill=255)
    mask = mask.resize((TOKEN_SIZE, TOKEN_SIZE), Image.Resampling.LANCZOS)

    out = Image.new("RGBA", (TOKEN_SIZE, TOKEN_SIZE), (0, 0, 0, 0))
    out.paste(im, (0, 0), mask)

    ring = Image.new("RGBA", (TOKEN_SIZE * 2, TOKEN_SIZE * 2), (0, 0, 0, 0))
    rd = ImageDraw.Draw(ring)
    rd.ellipse((pad, pad, TOKEN_SIZE * 2 - pad, TOKEN_SIZE * 2 - pad), outline=(30, 24, 19, 255), width=46)
    rd.ellipse((pad + 40, pad + 40, TOKEN_SIZE * 2 - pad - 40, TOKEN_SIZE * 2 - pad - 40), outline=(212, 168, 84, 235), width=10)
    rd.ellipse((pad + 4, pad + 4, TOKEN_SIZE * 2 - pad - 4, TOKEN_SIZE * 2 - pad - 4), outline=(12, 10, 8, 255), width=8)
    ring = ring.resize((TOKEN_SIZE, TOKEN_SIZE), Image.Resampling.LANCZOS)
    return Image.alpha_composite(out, ring)


def print_status():
    os.makedirs(OUT_DIR, exist_ok=True)
    incomplete = []
    total_done = 0
    for r in RACE_ORDER:
        have = [c for c in CLASS_ORDER if os.path.exists(os.path.join(OUT_DIR, f"{r}_{c}.png"))]
        total_done += len(have)
        if len(have) < len(CLASS_ORDER):
            incomplete.append((r, len(have)))
    print(f"Progress: {total_done} / {len(RACE_ORDER) * len(CLASS_ORDER)} tokens complete.")
    print(f"Races needing generation ({len(incomplete)}):")
    for r, n in incomplete:
        print(f"  - {r} ({n}/14 done)")


def slice_grid(race_id: str, input_path: str, overwrite: bool = False):
    os.makedirs(OUT_DIR, exist_ok=True)
    grid = Image.open(input_path).convert("RGBA")
    gw, gh = grid.size
    cell_w = gw / 4.0
    cell_h = gh / 4.0
    saved = 0
    for idx, cid in enumerate(CLASS_ORDER):
        out_path = os.path.join(OUT_DIR, f"{race_id}_{cid}.png")
        if os.path.exists(out_path) and not overwrite:
            print(f"  [skip existing] {out_path}")
            continue
        row = idx // 4
        col = idx % 4
        box = (int(col * cell_w), int(row * cell_h), int((col + 1) * cell_w), int((row + 1) * cell_h))
        cell = grid.crop(box)
        tok = make_circular_token(cell)
        tok.save(out_path)
        saved += 1
    print(f"Sliced {saved} new round tokens for race '{race_id}' from {input_path}!")


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--status", action="store_true", help="List races still needing tokens")
    p.add_argument("--race", help="Race ID to slice")
    p.add_argument("--input", help="Path to generated 4x4 grid image")
    p.add_argument("--overwrite", action="store_true", help="Overwrite existing tokens")
    args = p.parse_args()

    if args.status:
        print_status()
        return
    if not args.race or not args.input:
        print("Provide --status OR both --race and --input.")
        sys.exit(1)
    slice_grid(args.race, args.input, args.overwrite)


if __name__ == "__main__":
    main()
