# Chronicles of Oakhaven — Modular Expansion Guide

The game has been split into modular folders so you can add new expansions without touching the core engine (`js/engine.js`).

## Folder Structure

- `chronicles_of_oakhaven_the_gamebook_rpg.html` — Main game page (open directly in any browser; no server required).
- `js/registry.js` — Global `window.OAKHAVEN` content registry and loot table helpers (`rollRandomLoot`, `rollEncounterVaultDrop`).
- `js/engine.js` — Core game engine (UI, combat, town map, guildhall, forge, save/load).
- `data/classes/` — Class Archetypes (`window.OAKHAVEN.registerClasses([...])`).
- `data/races/` — Playable Races (`window.OAKHAVEN.registerRaces([...])`).
- `data/subclasses/` — Subclasses linked to a `classId` (`window.OAKHAVEN.registerSubclasses([...])`).
- `data/skills/` — Skills (`window.OAKHAVEN.registerSkills([...])`).
- `data/spells/` — Spells (`window.OAKHAVEN.registerSpells([...])`). Every spell automatically generates a **Rare Spell Scroll** in the general loot table!
- `data/items/` — Items, Shops, and Vault of Magic (`window.OAKHAVEN.registerItems({...})`, `registerShops({...})`).
- `data/recipes/` — Crafting Recipes (`window.OAKHAVEN.registerRecipes([...])`).
- `data/npcs/` — Tavern NPCs (`window.OAKHAVEN.registerNpcs([...])`).
- `data/quests/` — Adventures / Quests (`window.OAKHAVEN.registerQuests({...})`).

## How to Add a New Expansion File

1. Create a new `.js` file in the appropriate `data/<category>/` folder (for example, `data/spells/my_arcane_pack.js` or `data/quests/my_dungeon.js`).
2. Register your content using the matching helper:
   ```js
   window.OAKHAVEN.registerSpells([
     {
       name: "Meteor Shard",
       mp: 5,
       combat: true,
       ooc: false,
       icon: "☄️",
       dmgDice: "2d8",
       dmgBonus: 2,
       dmgStat: "arcana",
       dmgType: "fire",
       scrollOnly: true, // Optional: only learnable from Rare Spell Scrolls in loot!
       desc: "Deals 2d8 + 2 + Arcana fire damage."
     }
   ]);
   ```
3. Add a single `<script src="data/spells/my_arcane_pack.js"></script>` line in `chronicles_of_oakhaven_the_gamebook_rpg.html` in the matching section (before `js/engine.js`, and before `data/quests/*` if quests reference the new items/spells).
