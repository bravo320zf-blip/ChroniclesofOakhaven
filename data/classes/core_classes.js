/* ============================================================
   CORE CLASSES (ARCHETYPES)
   Add new classes by creating another file in data/classes/
   and calling window.OAKHAVEN.registerClasses([...]).
   ============================================================ */
window.OAKHAVEN.registerClasses([
  {
    id: "warrior",
    name: "Warrior",
    desc: "+4 Max HP. Starts with Iron Longsword & Wooden Shield.",
    bonusHp: 4,
    bonusMp: 0,
    gear: { weapon: "iron_sword", armor: "leather_armor", offhand: "wooden_shield", accessory: null, cloak: "travel_cloak" },
    skills: ["Athletics", "Perception"],
    spells: ["Mend Wounds", "Arcane Shield"],
    signatureAbility: {
      id: "action_surge",
      name: "Action Surge",
      icon: "⚔️",
      desc: "Once per quest: Immediately unleash two full weapon strikes in a single turn with +2 Attack."
    }
  },
  {
    id: "rogue",
    name: "Rogue",
    desc: "+1 Luck. Starts with Steel Dagger & Lucky Coin.",
    bonusHp: 0,
    bonusMp: 0,
    bonusLuck: 1,
    gear: { weapon: "steel_dagger", armor: "leather_armor", offhand: null, accessory: "lucky_coin", cloak: "travel_cloak" },
    skills: ["Lockpicking", "Stealth"],
    spells: ["Shadowstep", "Detect Traps"],
    signatureAbility: {
      id: "assassinate",
      name: "Assassinate",
      icon: "🗡️",
      desc: "Once per quest: Guaranteed deadly Critical Strike (2x weapon damage) and vanish into Shadow Veil (+3 AC for 2 turns)."
    }
  },
  {
    id: "arcanist",
    name: "Wizard",
    desc: "+4 Max MP. Master of arcane study. Starts with Runed Staff & Spellbook.",
    bonusHp: -2,
    bonusMp: 4,
    gear: { weapon: "runed_staff", armor: "scholar_robes", offhand: "apprentice_tome", accessory: null, cloak: "travel_cloak" },
    skills: ["Lore", "Perception"],
    spells: ["Firebolt", "Frost Nova"],
    signatureAbility: {
      id: "arcane_surge",
      name: "Arcane Surge",
      icon: "🔮",
      freeAction: true,
      desc: "Once per quest (Free Action): Restore 50% Max MP (min +5) and double the damage of your next Spell this combat."
    }
  },
  {
    id: "cleric",
    name: "Cleric",
    desc: "+2 HP, +2 MP. Starts with Blessed Mace & Shield.",
    bonusHp: 2,
    bonusMp: 2,
    gear: { weapon: "blessed_mace", armor: "leather_armor", offhand: "wooden_shield", accessory: null, cloak: "travel_cloak" },
    skills: ["Herbalism", "Lore"],
    spells: ["Turn Undead", "Mend Wounds"],
    signatureAbility: {
      id: "divine_intervention",
      name: "Divine Intervention",
      icon: "☀️",
      desc: "Once per quest: Restore 50% Max HP (min +12), gain Sacred Ward (+3 AC for 3 turns), and blast the foe for 2d6 + Spirit radiant damage (2x vs Undead)."
    }
  },
  {
    id: "ranger",
    name: "Ranger",
    desc: "+2 HP. Starts with Hunting Blade & Scout Cloak.",
    bonusHp: 2,
    bonusMp: 0,
    gear: { weapon: "hunting_blade", armor: "leather_armor", offhand: null, accessory: null, cloak: "scout_cloak" },
    skills: ["Tracking", "Herbalism"],
    spells: ["Detect Traps", "Mend Wounds"],
    signatureAbility: {
      id: "hunters_mark",
      name: "Hunter's Mark",
      icon: "🏹",
      desc: "Once per quest: Fire an immediate aimed shot and mark your prey for the entire combat (+3 Attack, +4 strike damage, Crit on 10+)."
    }
  }
]);
