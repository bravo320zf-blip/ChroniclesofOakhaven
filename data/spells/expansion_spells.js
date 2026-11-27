/* ============================================================
   EXPANSION SPELLS (Reworked with Dice Rolls & Proper Stat Scaling!)
   Every spell registered here also automatically generates a
   Rare Spell Scroll in the general loot table.
   ============================================================ */
window.OAKHAVEN.registerSpells([
  {
    name: "Chain Lightning",
    mp: 4,
    castingTime: "action",
    combat: true,
    ooc: false,
    icon: "⚡",
    dmgDice: "2d6",
    dmgBonus: 2,
    dmgStat: "arcana",
    dmgType: "lightning",
    desc: "Deals 2d6 + 2 + Arcana lightning damage to your foe."
  },
  {
    name: "Sunburst",
    mp: 5,
    castingTime: "action",
    combat: true,
    ooc: false,
    icon: "🌟",
    dmgDice: "2d8",
    dmgStat: "spirit",
    dmgType: "radiant",
    undeadDouble: true,
    desc: "Deals 2d8 + Spirit radiant dmg (2x vs Undead)."
  },
  {
    name: "Vampiric Touch",
    mp: 4,
    castingTime: "action",
    combat: true,
    ooc: false,
    icon: "🩸",
    dmgDice: "1d8",
    dmgBonus: 1,
    dmgStat: "arcana",
    dmgType: "necrotic",
    healDice: "1d6",
    healStat: "spirit",
    desc: "Deals 1d8 + 1 + Arcana dmg & drains 1d6 + Spirit HP."
  },
  {
    name: "Stone Skin",
    mp: 3,
    castingTime: "bonus",
    combat: true,
    ooc: true,
    icon: "🪨",
    shieldTurns: 4,
    desc: "Hardens skin for +3 AC for 4 turns (usable anytime)."
  }
]);
