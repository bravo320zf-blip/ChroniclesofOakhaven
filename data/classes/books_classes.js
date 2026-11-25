/* ============================================================
   BOOK EXPANSION CLASSES
   Includes the 2 full new classes from Deep Magic (Theurge, Witch)
   plus the 7 classic RPG classes supporting all sourcebook subclasses.
   ============================================================ */
window.OAKHAVEN.registerClasses([
  {
    id: "barbarian",
    name: "Barbarian",
    desc: "+6 Max HP. Fierce primal warrior. Starts with Dwarven Waraxe-style heft (Iron Longsword & Studded Leather).",
    bonusHp: 6,
    bonusMp: -2,
    gear: { weapon: "iron_sword", armor: "leather_armor", offhand: null, accessory: null, cloak: "travel_cloak" },
    skills: ["Athletics", "Survival"],
    spells: ["Mend Wounds", "Arcane Shield"]
  },
  {
    id: "bard",
    name: "Bard",
    desc: "+2 MP, +1 Luck. Charismatic loremaster. Starts with Steel Dagger & Lucky Coin.",
    bonusHp: 0,
    bonusMp: 2,
    bonusLuck: 1,
    gear: { weapon: "steel_dagger", armor: "leather_armor", offhand: null, accessory: "lucky_coin", cloak: "travel_cloak" },
    skills: ["Persuasion", "Lore"],
    spells: ["Mend Wounds", "Frost Nova"]
  },
  {
    id: "druid",
    name: "Druid",
    desc: "+2 HP, +2 MP. Guardian of the wilds. Starts with Runed Staff & Scout Cloak.",
    bonusHp: 2,
    bonusMp: 2,
    gear: { weapon: "runed_staff", armor: "leather_armor", offhand: null, accessory: null, cloak: "scout_cloak" },
    skills: ["Herbalism", "Survival"],
    spells: ["Mend Wounds", "Frost Nova"]
  },
  {
    id: "monk",
    name: "Monk",
    desc: "+2 HP, +1 Luck. Agile martial artist. Starts with Steel Dagger & Traveler's Cloak.",
    bonusHp: 2,
    bonusMp: 0,
    bonusLuck: 1,
    gear: { weapon: "steel_dagger", armor: "scholar_robes", offhand: null, accessory: null, cloak: "travel_cloak" },
    skills: ["Athletics", "Stealth"],
    spells: ["Shadowstep", "Arcane Shield"]
  },
  {
    id: "paladin",
    name: "Paladin",
    desc: "+4 HP, +2 MP. Sacred champion. Starts with Blessed Mace & Wooden Buckler.",
    bonusHp: 4,
    bonusMp: 2,
    gear: { weapon: "blessed_mace", armor: "leather_armor", offhand: "wooden_shield", accessory: null, cloak: "travel_cloak" },
    skills: ["Athletics", "Persuasion"],
    spells: ["Turn Undead", "Mend Wounds"]
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    desc: "+4 Max MP. Innate arcane conduit. Starts with Runed Staff & Scholar's Robes.",
    bonusHp: -2,
    bonusMp: 4,
    gear: { weapon: "runed_staff", armor: "scholar_robes", offhand: "apprentice_tome", accessory: null, cloak: "travel_cloak" },
    skills: ["Lore", "Persuasion"],
    spells: ["Firebolt", "Arcane Shield"]
  },
  {
    id: "warlock",
    name: "Warlock",
    desc: "+3 Max MP, +1 Luck. Pact-bound caster. Starts with Runed Staff & Grimoire.",
    bonusHp: 0,
    bonusMp: 3,
    bonusLuck: 1,
    gear: { weapon: "runed_staff", armor: "leather_armor", offhand: "apprentice_tome", accessory: null, cloak: "travel_cloak" },
    skills: ["Lore", "Intimidation"],
    spells: ["Shadowstep", "Firebolt"]
  },
  {
    id: "theurge",
    name: "Theurge",
    desc: "+4 Max MP (Deep Magic Vol. 1). Blends arcane & divine magic via a Theurgic Libram.",
    bonusHp: 0,
    bonusMp: 4,
    gear: { weapon: "blessed_mace", armor: "scholar_robes", offhand: "apprentice_tome", accessory: null, cloak: "travel_cloak" },
    skills: ["Lore", "Perception"],
    spells: ["Turn Undead", "Firebolt"]
  },
  {
    id: "witch",
    name: "Witch",
    desc: "+4 Max MP (Deep Magic Vol. 2). Weaver of hexes, covens, and old-world rituals.",
    bonusHp: 0,
    bonusMp: 4,
    gear: { weapon: "runed_staff", armor: "scholar_robes", offhand: "apprentice_tome", accessory: null, cloak: "travel_cloak" },
    skills: ["Herbalism", "Alchemy"],
    spells: ["Frost Nova", "Mend Wounds"]
  }
]);
