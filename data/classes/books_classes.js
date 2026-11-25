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
    spells: ["Mend Wounds", "Arcane Shield"],
    signatureAbility: {
      id: "rage",
      name: "Rage",
      icon: "🔥",
      freeAction: true,
      desc: "Once per quest (Free Action): Enter primal fury for this entire combat — all damage you deal is DOUBLED, but all damage you take is DOUBLED!"
    }
  },
  {
    id: "bard",
    name: "Bard",
    desc: "+2 MP, +1 Luck. Charismatic loremaster. Starts with Steel Dagger & Lucky Coin.",
    bonusHp: 0,
    bonusMp: 2,
    mpRegen: true,
    bonusLuck: 1,
    gear: { weapon: "steel_dagger", armor: "leather_armor", offhand: null, accessory: "lucky_coin", cloak: "travel_cloak" },
    skills: ["Persuasion", "Lore"],
    spells: ["Mend Wounds", "Frost Nova"],
    signatureAbility: {
      id: "bardic_inspiration",
      name: "Bardic Inspiration",
      icon: "🎵",
      desc: "Once per quest: Restore +3 Current Luck, gain +3 Attack & +2 AC for 3 turns, and rattle the foe (-2 Enemy Attack for 3 turns)."
    }
  },
  {
    id: "druid",
    name: "Druid",
    desc: "+2 HP, +2 MP. Guardian of the wilds. Starts with Runed Staff & Scout Cloak.",
    bonusHp: 2,
    bonusMp: 2,
    mpRegen: true,
    gear: { weapon: "runed_staff", armor: "leather_armor", offhand: null, accessory: null, cloak: "scout_cloak" },
    skills: ["Herbalism", "Survival"],
    spells: ["Mend Wounds", "Frost Nova"],
    signatureAbility: {
      id: "wild_shape",
      name: "Wild Shape",
      icon: "🐻",
      freeAction: true,
      desc: "Once per quest (Free Action): Shift into a Dire Bear for this combat — restore 40% Max HP (min +10) and gain +3 AC & +4 strike damage!"
    }
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
    spells: ["Shadowstep", "Arcane Shield"],
    signatureAbility: {
      id: "flurry_of_blows",
      name: "Flurry of Blows",
      icon: "👊",
      desc: "Once per quest: Unleash 3 rapid ki-infused strikes in a single turn and STUN the enemy for 1 full turn!"
    }
  },
  {
    id: "paladin",
    name: "Paladin",
    desc: "+4 HP, +2 MP. Sacred champion. Starts with Blessed Mace & Wooden Buckler.",
    bonusHp: 4,
    bonusMp: 2,
    mpRegen: true,
    gear: { weapon: "blessed_mace", armor: "leather_armor", offhand: "wooden_shield", accessory: null, cloak: "travel_cloak" },
    skills: ["Athletics", "Persuasion"],
    spells: ["Turn Undead", "Mend Wounds"],
    signatureAbility: {
      id: "divine_smite",
      name: "Divine Smite",
      icon: "⚡",
      desc: "Once per quest: Guaranteed radiant strike dealing Weapon + 3d6 + Spirit damage (2x vs Undead & Bosses) and healing you for half the damage dealt!"
    }
  },
  {
    id: "sorcerer",
    name: "Sorcerer",
    desc: "+4 Max MP. Innate arcane conduit. Starts with Runed Staff & Scholar's Robes.",
    bonusHp: -2,
    bonusMp: 4,
    mpRegen: true,
    gear: { weapon: "runed_staff", armor: "scholar_robes", offhand: "apprentice_tome", accessory: null, cloak: "travel_cloak" },
    skills: ["Lore", "Persuasion"],
    spells: ["Firebolt", "Arcane Shield"],
    signatureAbility: {
      id: "metamagic_overcharge",
      name: "Metamagic Overcharge",
      icon: "☄️",
      freeAction: true,
      desc: "Once per quest (Free Action): For the next 2 turns, all your Spells cost 0 MP and deal +50% damage!"
    }
  },
  {
    id: "warlock",
    name: "Warlock",
    desc: "+3 Max MP, +1 Luck. Pact-bound caster. Starts with Runed Staff & Grimoire.",
    bonusHp: 0,
    bonusMp: 3,
    mpRegen: true,
    bonusLuck: 1,
    gear: { weapon: "runed_staff", armor: "leather_armor", offhand: "apprentice_tome", accessory: null, cloak: "travel_cloak" },
    skills: ["Lore", "Intimidation"],
    spells: ["Shadowstep", "Firebolt"],
    signatureAbility: {
      id: "eldritch_pact",
      name: "Eldritch Pact",
      icon: "👁️",
      desc: "Once per quest: Sacrifice 20% current HP to deal 3d6 + Arcana + Spirit necrotic damage, restore 100% Max MP, and hex the foe (4 dmg/turn for 3 turns)!"
    }
  },
  {
    id: "theurge",
    name: "Theurge",
    desc: "+4 Max MP. Blends arcane & divine magic via a Theurgic Libram.",
    bonusHp: 0,
    bonusMp: 4,
    mpRegen: true,
    gear: { weapon: "blessed_mace", armor: "scholar_robes", offhand: "apprentice_tome", accessory: null, cloak: "travel_cloak" },
    skills: ["Lore", "Perception"],
    spells: ["Turn Undead", "Firebolt"],
    signatureAbility: {
      id: "arcane_divine_convergence",
      name: "Arcane-Divine Convergence",
      icon: "⚖️",
      desc: "Once per quest: Blast the enemy for 2d6 + Arcana + Spirit damage, heal yourself for 2d6 + Spirit HP, and restore +4 MP!"
    }
  },
  {
    id: "witch",
    name: "Witch",
    desc: "+4 Max MP. Weaver of hexes, covens, and old-world rituals.",
    bonusHp: 0,
    bonusMp: 4,
    mpRegen: true,
    gear: { weapon: "runed_staff", armor: "scholar_robes", offhand: "apprentice_tome", accessory: null, cloak: "travel_cloak" },
    skills: ["Herbalism", "Alchemy"],
    spells: ["Frost Nova", "Mend Wounds"],
    signatureAbility: {
      id: "grand_hex",
      name: "Grand Hex",
      icon: "🕯️",
      desc: "Once per quest: Curse the enemy for the entire combat — they suffer -3 Attack, -2 AC, and take 4 hex damage at the end of every turn!"
    }
  }
]);
