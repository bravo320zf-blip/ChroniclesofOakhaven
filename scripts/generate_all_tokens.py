#!/usr/bin/env python3
"""
Chronicles of Oakhaven — 504 Race x Class Round Token Batch Generator
Uses the official Google GenAI SDK (google-genai >= 3.5.0) with Gemini Nano Banana 2.1
to generate unique illustrated round portraits for every Race x Class combination
in the exact hand-drawn dark ink & warm watercolor/gouache style of the Oakhaven map.

Usage:
  1. pip install -U google-genai pillow
  2. Set your Gemini API key:
       PowerShell:  $env:GEMINI_API_KEY="YOUR_KEY_HERE"
  3. Run:
       python scripts/generate_all_tokens.py                  # Generate all missing tokens (500 remaining)
       python scripts/generate_all_tokens.py --races human bearfolk elf
       python scripts/generate_all_tokens.py --model gemini-3.1-flash-lite-image --workers 4
       python scripts/generate_all_tokens.py --dry-run
"""
import argparse
import base64
import concurrent.futures
import io
import os
import sys
import time
from PIL import Image, ImageDraw

OUT_DIR = os.path.join("images", "tokens")
REF_MAP_PATH = "Gemini_Generated_Image_8g96pf8g96pf8g96.jpg"
REF_TOKEN_PATH = os.path.join("images", "Yogi Bee Token 2.png")
TOKEN_SIZE = 512

RACES = {
    "human": "Human frontier adventurer",
    "elf": "High Elf with long pointed ears, silver-blonde hair, and regal features",
    "dwarf": "Mountain Dwarf with stout build and thick braided auburn beard",
    "halfling": "Halfling with curly hair and nimble cheerful features",
    "half_orc": "Half-Orc with olive-green skin, lower tusks, and fierce brow",
    "bearfolk": "Bearfolk anthropomorphic brown grizzly bear",
    "centaur": "Centaur with noble human upper body and equine heritage harness",
    "dhampir": "Dhampir pale aristocratic half-vampire with subtle fangs",
    "midgard_dwarf": "Midgard Dwarf ring-forger with silver-streaked braided beard",
    "midgard_elf": "Midgard River Elf with pointed ears and dark hair woven with autumn leaves",
    "gearforged": "Gearforged living clockwork construct made of riveted brass, copper gears, and glowing amber eyes",
    "gnoll": "Gnoll anthropomorphic spotted hyena with tufted mane",
    "midgard_gnome": "Midgard Gnome with expressive eyes and clever tinkering goggles",
    "elfmarked_human": "Elfmarked Human with subtly pointed ears and arcane-touched features",
    "kariv_human": "Kariv Human nomadic traveler with colorful embroidered scarf and gold earrings",
    "midgard_kobold": "Midgard Kobold small scaled reptilian dragon-kin with clever golden eyes",
    "minotaur": "Minotaur horned bull-headed warrior with brass nose ring",
    "ratfolk": "Ratfolk anthropomorphic whisker-twitching rat adventurer",
    "ravenfolk": "Ravenfolk anthropomorphic glossy black-feathered raven humanoid with sharp beak",
    "shadow_fey": "Shadow Fey pale twilight elf with dark horns and nocturnal elegance",
    "trollkin": "Trollkin rugged green-grey tusked giant-kin with rough hide",
    "winterfolk_halfling": "Winterfolk Halfling bundled in frost-trimmed northern furs",
    "alseid": "Alseid woodland deer-centaur fey with delicate branching antlers",
    "erina": "Erina anthropomorphic hedgehog folk with bristling quills and bright dark eyes",
    "piney": "Piney wooden forest-folk with bark skin, pine-needle hair, and glowing sap eyes",
    "catfolk": "Catfolk anthropomorphic tawny feline adventurer with pointed ears and whiskers",
    "darakhul": "Darakhul gaunt pale underground ghoul-kin adventurer in hooded cloak",
    "derro": "Derro wild-eyed pale-blue subterranean dwarf with unruly white hair",
    "drow": "Drow obsidian-skinned dark elf with stark white hair and pointed ears",
    "southlands_dwarf": "Southlands Dwarf sun-bronzed desert dwarf with beaded black beard",
    "southlands_elf": "Southlands Elf sun-kissed desert elf with golden jewelry and pointed ears",
    "forest_gnome": "Forest Gnome mossy-haired woodland gnome with leaf accents",
    "midgard_halfling": "Midgard Halfling traveler with weathered hood and lucky charms",
    "mushroomfolk": "Mushroomfolk anthropomorphic myconid with spotted glowing mushroom cap head",
    "satarre": "Satarre gaunt pale planar-touched humanoid with glowing faint runes on skin",
    "shade": "Shade umbral shadow-wreathed humanoid with smoky glowing eyes",
}

CLASSES = {
    "warrior": "Warrior wearing steel plate and leather armor holding an iron longsword and shield",
    "rogue": "Rogue wearing a hooded dark leather cloak holding twin gleaming steel daggers",
    "arcanist": "Wizard wearing deep blue-and-gold scholar robes holding a glowing runed oak staff and spellbook",
    "cleric": "Cleric wearing gilded mail and white-and-gold vestments wielding a radiant blessed mace and sun shield",
    "ranger": "Ranger wearing a forest-green scout cloak and leather armor with a recurve bow and quiver",
    "barbarian": "Barbarian wearing rugged fur pelts and bone talismans wielding a massive notched greataxe",
    "bard": "Bard wearing a feathered cap and crimson-and-gold doublet strumming a carved wooden lute",
    "druid": "Druid adorned with oak leaves and moss-green robes holding a gnarled living-wood staff glowing with emerald magic",
    "monk": "Monk wearing saffron-and-brown wrapped martial robes in an unarmed combat stance with golden ki aura around wrapped fists",
    "paladin": "Paladin wearing shining fluted plate armor and crimson tabard wielding a glowing golden greatsword",
    "sorcerer": "Sorcerer wearing a dramatic embroidered cloak channeling crackling fire and lightning between bare hands",
    "warlock": "Warlock wearing a dark tattered hooded mantle holding a rune-etched pact grimoire with eerie violet-emerald eldritch energy",
    "theurge": "Theurge wearing royal ivory-and-sapphire vestments holding an illuminated arcane-divine libram with golden holy and blue arcane light",
    "witch": "Witch wearing a pointed wide-brimmed hat and herbalist shawl holding a twisted hawthorn wand and glowing green potion vial",
}


def make_circular_token(img: Image.Image) -> Image.Image:
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    im = img.crop((left, top, left + side, top + side)).resize((TOKEN_SIZE, TOKEN_SIZE), Image.Resampling.LANCZOS).convert("RGBA")

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


def load_b64(path: str) -> str:
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("ascii")


def generate_one(client, model, ref_map_b64, ref_tok_b64, race_id, class_id):
    out_path = os.path.join(OUT_DIR, f"{race_id}_{class_id}.png")
    race_desc = RACES[race_id]
    class_desc = CLASSES[class_id]
    prompt = (
        f"Create a 1:1 circular tabletop RPG character token portrait in the exact hand-drawn dark ink linework "
        f"and warm watercolor/gouache storybook fantasy style of the first reference image (the Oakhaven map), "
        f"framed like the round VTT token in the second reference image. "
        f"Character: A {race_desc} who is a {class_desc}. "
        f"Centered bust/three-quarter portrait filling the circular frame, expressive character art, rich warm medieval background, "
        f"NO text, NO letters, NO numbers, NO watermarks."
    )

    for attempt in range(4):
        try:
            interaction = client.interactions.create(
                model=model,
                input=[
                    {"type": "text", "text": prompt},
                    {"type": "image", "data": ref_map_b64, "mime_type": "image/jpeg"},
                    {"type": "image", "data": ref_tok_b64, "mime_type": "image/png"},
                ],
                response_format={"type": "image", "aspect_ratio": "1:1"},
                store=False,
            )
            if not interaction.output_image or not interaction.output_image.data:
                raise RuntimeError("No image returned in response")
            raw_bytes = base64.b64decode(interaction.output_image.data)
            img = Image.open(io.BytesIO(raw_bytes))
            token = make_circular_token(img)
            token.save(out_path)
            return True, out_path
        except Exception as exc:
            wait_s = min(60, (2 ** attempt) * 3)
            print(f"  [retry {attempt+1}/4] {race_id}_{class_id}: {exc} (waiting {wait_s}s)")
            time.sleep(wait_s)
    return False, out_path


def main():
    parser = argparse.ArgumentParser(description="Generate all 504 Race x Class round tokens for Chronicles of Oakhaven.")
    parser.add_argument("--races", nargs="*", help="Optional subset of race IDs (e.g. --races human bearfolk elf)")
    parser.add_argument("--classes", nargs="*", help="Optional subset of class IDs (e.g. --classes warrior arcanist)")
    parser.add_argument("--model", default="gemini-nano-banana-2.1", help="Gemini image model (default: gemini-nano-banana-2.1, or gemini-3.1-flash-lite-image)")
    parser.add_argument("--workers", type=int, default=3, help="Concurrent worker threads (default: 3)")
    parser.add_argument("--overwrite", action="store_true", help="Regenerate tokens even if they already exist")
    parser.add_argument("--dry-run", action="store_true", help="Show how many tokens would be generated without calling the API")
    args = parser.parse_args()

    os.makedirs(OUT_DIR, exist_ok=True)
    target_races = args.races if args.races else list(RACES.keys())
    target_classes = args.classes if args.classes else list(CLASSES.keys())

    todo = []
    skipped = 0
    for r in target_races:
        if r not in RACES:
            print(f"Unknown race ID: {r}")
            sys.exit(1)
        for c in target_classes:
            if c not in CLASSES:
                print(f"Unknown class ID: {c}")
                sys.exit(1)
            out_path = os.path.join(OUT_DIR, f"{r}_{c}.png")
            if os.path.exists(out_path) and not args.overwrite:
                skipped += 1
            else:
                todo.append((r, c))

    print(f"Target combinations: {len(target_races)} races x {len(target_classes)} classes = {len(todo) + skipped} total")
    print(f"Already generated (skipped): {skipped} | Remaining to generate: {len(todo)}")
    if args.dry_run or not todo:
        return

    if not os.environ.get("GEMINI_API_KEY"):
        print("ERROR: GEMINI_API_KEY environment variable is not set!")
        print('Set it first in PowerShell:  $env:GEMINI_API_KEY="YOUR_KEY_HERE"')
        sys.exit(1)

    try:
        from google import genai
    except ImportError:
        print("ERROR: google-genai SDK not installed. Run:  pip install -U google-genai")
        sys.exit(1)

    ref_map_b64 = load_b64(REF_MAP_PATH)
    ref_tok_b64 = load_b64(REF_TOKEN_PATH)
    client = genai.Client()

    done, failed = 0, 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=max(1, args.workers)) as pool:
        futs = {
            pool.submit(generate_one, client, args.model, ref_map_b64, ref_tok_b64, r, c): (r, c)
            for r, c in todo
        }
        for fut in concurrent.futures.as_completed(futs):
            r, c = futs[fut]
            ok, path = fut.result()
            if ok:
                done += 1
                print(f"[{done}/{len(todo)}] Generated {path}")
            else:
                failed += 1
                print(f"[FAILED] {r}_{c}")

    print(f"\nFinished! Generated: {done}, Failed: {failed}, Previously existing: {skipped}")


if __name__ == "__main__":
    main()
