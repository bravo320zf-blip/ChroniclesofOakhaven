/* ============================================================
   CORE SPELLS (Reworked with Dice Rolls!)
   Supported fields:
     dmgDice: "2d6" (or { count: 2, sides: 6 }), dmgBonus: number, dmgStat: "arcana"|"spirit"|"agility"|"might"
     healDice: "2d6", healBonus: number, healStat: "spirit"|"arcana"|...
     undeadDouble: true/false, chillTurns: number, shieldTurns: number, evadeTurns: number
     scrollOnly: true (if only learnable via Rare Spell Scrolls, not Guild Hall)
     scrollRarity: "rare" (default) | "very_rare" | "legendary"
   ============================================================ */
window.OAKHAVEN.registerSpells([
  {
    name: "Firebolt",
    mp: 3,
    combat: true,
    ooc: false,
    icon: "🔥",
    dmgDice: "2d6",
    dmgStat: "arcana",
    dmgType: "fire",
    desc: "Deals 2d6 + Arcana fire damage. Burns webs & roots."
  },
  {
    name: "Mend Wounds",
    mp: 3,
    combat: true,
    ooc: true,
    icon: "💚",
    healDice: "2d6",
    healBonus: 2,
    healStat: "spirit",
    desc: "Restores 2d6 + 2 + Spirit HP in or out of combat."
  },
  {
    name: "Arcane Shield",
    mp: 3,
    combat: true,
    ooc: true,
    icon: "🛡️",
    shieldTurns: 3,
    desc: "+3 AC for 3 turns or blocks dungeon traps."
  },
  {
    name: "Shadowstep",
    mp: 3,
    combat: true,
    ooc: false,
    icon: "🌑",
    dmgDice: "1d6",
    dmgBonus: 2,
    dmgStat: "agility",
    dmgType: "shadow",
    evadeTurns: 2,
    desc: "Deals 1d6 + 2 + Agility dmg & grants +2 AC for 2 turns."
  },
  {
    name: "Turn Undead",
    mp: 4,
    combat: true,
    ooc: false,
    icon: "☀️",
    dmgDice: "2d6",
    dmgStat: "spirit",
    dmgType: "radiant",
    undeadDouble: true,
    desc: "Deals 2d6 + Spirit radiant dmg (2x vs Undead). Purifies curses."
  },
  {
    name: "Frost Nova",
    mp: 4,
    combat: true,
    ooc: false,
    icon: "❄️",
    dmgDice: "1d6",
    dmgBonus: 2,
    dmgStat: "arcana",
    dmgType: "frost",
    chillTurns: 2,
    desc: "Deals 1d6 + 2 + Arcana frost dmg & chills foe (-2 Enemy Atk)."
  },
  {
    name: "Detect Traps",
    mp: 2,
    combat: false,
    ooc: false,
    icon: "👁️",
    desc: "Reveals hidden passages, illusions, and deadly wards."
  }
]);
