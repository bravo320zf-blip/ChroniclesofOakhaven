/* ============================================================
   CORE CRAFTING RECIPES
   Add new recipes by creating another file in data/recipes/
   and calling window.OAKHAVEN.registerRecipes([...]).
   ============================================================ */
window.OAKHAVEN.registerRecipes([
  { result: "greater_potion", gold: 12, mats: { glowcap_spores: 1, bone_dust: 1 }, desc: "Brew a potent +22 HP draught." },
  { result: "alchemist_bomb", gold: 10, mats: { sea_salt: 1, iron_ore: 1 }, desc: "Pack a 10-damage combat bomb." },
  { result: "warding_signet", gold: 45, mats: { runed_shards: 2, sea_salt: 1 }, desc: "Enchant a +2 AC, +1 Luck ring." },
  { result: "aegis_bastion", gold: 55, mats: { iron_ore: 2, runed_shards: 1 }, desc: "Forge a +3 AC, +5 Max HP shield." },
  { result: "shadow_vestments", gold: 65, mats: { shadow_essence: 2, glowcap_spores: 1 }, desc: "Stitch +4 AC, +2 Agility armor." },
  { result: "runeforged_axe", gold: 75, mats: { iron_ore: 2, runed_shards: 2 }, desc: "Hammer a +4 Atk, +2 Might cleaver." }
]);
