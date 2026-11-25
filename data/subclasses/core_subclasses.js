/* ============================================================
   CORE SUBCLASSES (Reworked with Authentic 5E Synergies • Lv 1 / 5 / 10)
   ============================================================ */
window.OAKHAVEN.registerSubclasses([
  // Warrior Subclasses
  {
    id: "champion",
    classId: "warrior",
    name: "Champion",
    source: "Core",
    desc: "Master of raw weapon precision, expanded critical hits, and relentless action surges.",
    abilities: [
      { level: 1, name: "Improved Critical", type: "passive", icon: "⚔️", critRange: 11, bonusAtk: 1, desc: "Passive: Weapon strikes land Critical Hits on 11+ (2d6) and gain +1 Attack." },
      { level: 5, name: "Action Surge", type: "active", icon: "⚡", mp: 0, oncePerCombat: true, multiStrike: 2, selfBuffAtk: { atk: 2, turns: 2 }, desc: "Active (1/Combat, 0 MP): Immediately strike twice and gain +2 Attack for 2 turns." },
      { level: 10, name: "Survivor's Triumph", type: "active", icon: "🏆", mp: 4, guaranteedCrit: true, healDice: "1d8", healStat: "might", desc: "Active (4 MP): Guaranteed Critical weapon strike & second-wind heal (1d8 + Might HP)." }
    ]
  },
  {
    id: "vanguard",
    classId: "warrior",
    name: "Vanguard",
    source: "Core",
    desc: "Immovable iron bulwark that punishes attackers with thorns and shield bashes.",
    abilities: [
      { level: 1, name: "Spiked Bulwark", type: "passive", icon: "🛡️", bonusAc: 1, bonusHp: 4, thornsDmg: 3, desc: "Passive: +1 AC, +4 Max HP, and attackers suffer 3 retaliation dmg when they hit you." },
      { level: 5, name: "Concussive Shield Bash", type: "active", icon: "🛡️", mp: 3, dmgDice: "1d6", dmgStat: "might", dmgType: "bludgeoning", stunTurns: 1, shieldTurns: 3, desc: "Active (3 MP): Deals 1d6 + Might dmg, STUNS foe for 1 turn, & raises +3 AC (3t)." },
      { level: 10, name: "Unbreakable Fortress", type: "active", icon: "🏰", mp: 4, oncePerCombat: true, dmgDice: "2d8", dmgStat: "might", dmgType: "bludgeoning", shieldTurns: 4, healDice: "2d6", healStat: "might", desc: "Active (4 MP, 1/Combat): Deals 2d8 + Might dmg, restores 2d6 + Might HP, & +3 AC (4t)." }
    ]
  },

  // Rogue Subclasses
  {
    id: "shadowblade",
    classId: "rogue",
    name: "Shadowblade",
    source: "Core",
    desc: "Lethal assassin specializing in critical ambushes and lingering venom.",
    abilities: [
      { level: 1, name: "Assassinate", type: "passive", icon: "🗡️", critRange: 11, statBonuses: { agility: 1 }, desc: "Passive: +1 Agility and melee attacks land Critical Hits on 11+ (2d6)." },
      { level: 5, name: "Venom-Coated Ambush", type: "active", icon: "☠️", mp: 2, dmgDice: "2d6", dmgStat: "agility", dmgType: "piercing", dot: { dmg: 4, turns: 3, label: "Poisoned" }, evadeTurns: 2, desc: "Active (2 MP): Deals 2d6 + Agility dmg, poisons foe (4 dmg/t, 3t), & +2 AC (2t)." },
      { level: 10, name: "Deathmark Execution", type: "active", icon: "💀", mp: 4, oncePerCombat: true, guaranteedCrit: true, dot: { dmg: 6, turns: 3, label: "Bleeding" }, evadeTurns: 2, desc: "Active (4 MP, 1/Combat): Guaranteed Critical ambush + heavy bleed (6 dmg/t, 3t)." }
    ]
  },
  {
    id: "arcane_trickster",
    classId: "rogue",
    name: "Arcane Trickster",
    source: "Core",
    desc: "Clever spell-thief who bends luck, pilfers gold, and siphons arcane power.",
    abilities: [
      { level: 1, name: "Legerdemain", type: "active", ooc: true, icon: "🎭", mp: 4, restoreLuck: 1, statBonuses: { arcana: 1 }, goldFindPct: 20, desc: "Passive: +1 Arcana & +20% Gold from foes. Active (4 MP, anytime): Restore +1 Current Luck." },
      { level: 5, name: "Magical Ambush", type: "active", icon: "✨", mp: 3, dmgDice: "2d6", dmgStat: "arcana", dmgType: "psychic", chillTurns: 2, restoreMp: 2, desc: "Active (3 MP): Deals 2d6 + Arcana psychic dmg, rattles foe (-2 Atk, 2t), & siphons +2 MP." },
      { level: 10, name: "Spell Thief", type: "active", icon: "🔮", mp: 4, dmgDice: "2d8", dmgStat: "arcana", dmgType: "psychic", restoreMp: 6, evadeTurns: 3, desc: "Active (4 MP): Steals arcane vigor — deals 2d8 + Arcana dmg, +6 MP, & +2 AC (3t)." }
    ]
  },

  // Wizard Subclasses
  {
    id: "pyromancer",
    classId: "arcanist",
    name: "Pyromancer",
    source: "Core",
    desc: "Elemental fire specialist whose spells ignite foes with relentless burning damage.",
    abilities: [
      { level: 1, name: "Heart of Fire", type: "passive", icon: "🔥", spellDmgBonus: 2, bonusMp: 2, desc: "Passive: +2 Max MP and ALL combat spells deal +2 bonus damage." },
      { level: 5, name: "Combustion Wave", type: "active", icon: "🔥", mp: 3, dmgDice: "2d6", dmgStat: "arcana", dmgType: "fire", dot: { dmg: 4, turns: 3, label: "Burning" }, desc: "Active (3 MP): Deals 2d6 + Arcana fire dmg & ignites foe (4 Burning dmg/t, 3t)." },
      { level: 10, name: "Solar Cataclysm", type: "active", icon: "☄️", mp: 5, dmgDice: "3d6", dmgBonus: 3, dmgStat: "arcana", dmgType: "fire", dot: { dmg: 6, turns: 3, label: "Inferno" }, desc: "Active (5 MP): Deals 3d6 + 3 + Arcana fire dmg & scorches foe (6 Inferno dmg/t, 3t)." }
    ]
  },
  {
    id: "battlemage",
    classId: "arcanist",
    name: "Battlemage",
    source: "Core",
    desc: "Armored war-wizard combining arcane thorns, melee flurries, and concussive force.",
    abilities: [
      { level: 1, name: "Arcane Retribution", type: "passive", icon: "🛡️", bonusAc: 1, bonusHp: 3, thornsDmg: 2, desc: "Passive: +1 AC, +3 Max HP, and attackers take 2 arcane backlash dmg on hit." },
      { level: 5, name: "Spellblade Flurry", type: "active", icon: "⚡", mp: 3, multiStrike: 2, shieldTurns: 3, desc: "Active (3 MP): Strike twice with enchanted steel & raise +3 AC ward for 3 turns." },
      { level: 10, name: "Forcewave Nova", type: "active", icon: "✨", mp: 5, dmgDice: "2d8", dmgStat: "arcana", dmgType: "force", stunTurns: 1, shieldTurns: 4, desc: "Active (5 MP): Deals 2d8 + Arcana force dmg, STUNS foe (1t), & +3 AC ward (4t)." }
    ]
  },

  // Cleric Subclasses
  {
    id: "dawnbringer",
    classId: "cleric",
    name: "Dawnbringer",
    source: "Core",
    desc: "Radiant temple healer whose prayers amplify all healing and incinerate the undead.",
    abilities: [
      { level: 1, name: "Disciple of Life", type: "passive", icon: "☀️", healBonus: 4, undeadDmgBonus: 3, desc: "Passive: All healing spells & potions restore +4 extra HP; +3 dmg vs Undead." },
      { level: 5, name: "Preserve Life", type: "active", ooc: true, icon: "💚", mp: 4, healDice: "2d6", healBonus: 2, healStat: "spirit", shieldTurns: 2, desc: "Active (4 MP, anytime): Restores 2d6 + 2 + Spirit HP & grants +3 AC (2t)." },
      { level: 10, name: "Avatar of Dawn", type: "active", icon: "🌟", mp: 5, dmgDice: "2d8", dmgStat: "spirit", dmgType: "radiant", healDice: "2d6", healStat: "spirit", undeadDouble: true, desc: "Active (5 MP): Deals 2d8 + Spirit radiant dmg (2x Undead) & heals 2d6 + Spirit HP." }
    ]
  },
  {
    id: "inquisitor",
    classId: "cleric",
    name: "Inquisitor",
    source: "Core",
    desc: "Relentless witch-hunter who stuns heretics and smites undead & bosses.",
    abilities: [
      { level: 1, name: "Bane of the Wicked", type: "passive", icon: "⚖️", undeadDmgBonus: 4, bossDmgBonus: 2, bonusAtk: 1, desc: "Passive: +1 Attack, +4 dmg vs Undead, and +2 dmg vs Boss enemies." },
      { level: 5, name: "Holy Condemnation", type: "active", icon: "☀️", mp: 3, dmgDice: "2d6", dmgStat: "spirit", dmgType: "radiant", stunTurns: 1, undeadDouble: true, desc: "Active (3 MP): Deals 2d6 + Spirit radiant dmg (2x Undead) & STUNS foe (1t)." },
      { level: 10, name: "Verdict of Light", type: "active", icon: "⚡", mp: 5, guaranteedCrit: true, dmgDice: "2d6", dmgStat: "spirit", dmgType: "radiant", undeadDouble: true, desc: "Active (5 MP): Guaranteed Critical weapon smite + 2d6 + Spirit radiant dmg (2x Undead)." }
    ]
  },

  // Ranger Subclasses
  {
    id: "stalker",
    classId: "ranger",
    name: "Beaststalker",
    source: "Core",
    desc: "Pack-bonded hunter fighting alongside a summoned wolf companion.",
    abilities: [
      { level: 1, name: "Summon Hunting Wolf", type: "active", icon: "🐺", mp: 0, oncePerCombat: true, summon: { name: "Hunting Wolf", icon: "🐺", dmg: 4, turns: 4 }, desc: "Active (1/Combat, 0 MP): Summon your Wolf Companion (4 dmg/turn for 4 turns)." },
      { level: 5, name: "Twin Volley", type: "active", icon: "🏹", mp: 2, multiStrike: 2, bossDmgBonus: 3, desc: "Passive: +3 dmg vs Bosses. Active (2 MP): Fire two rapid strikes at your quarry." },
      { level: 10, name: "Alpha Pack Hunt", type: "active", icon: "🐺", mp: 4, dmgDice: "2d6", dmgStat: "agility", dmgType: "piercing", summon: { name: "Dire Wolf Alpha", icon: "🐺", dmg: 7, turns: 5 }, desc: "Active (4 MP): Deals 2d6 + Agility dmg & calls a Dire Wolf Alpha (7 dmg/t, 5t)." }
    ]
  },
  {
    id: "warden",
    classId: "ranger",
    name: "Wild Warden",
    source: "Core",
    desc: "Forest guardian who brews herbal remedies, grows briar thorns, and calls treants.",
    abilities: [
      { level: 1, name: "Briar & Poultice", type: "active", ooc: true, icon: "🌿", mp: 8, craftItem: "health_potion", bonusAc: 1, thornsDmg: 3, desc: "Passive: +1 AC & 3 thorn dmg on hit. Active (8 MP, anytime): Brew a free Health Potion." },
      { level: 5, name: "Entangling Thorns", type: "active", icon: "🌿", mp: 3, dmgDice: "2d6", dmgStat: "spirit", dmgType: "nature", dot: { dmg: 4, turns: 3, label: "Bleeding" }, chillTurns: 2, desc: "Active (3 MP): Deals 2d6 + Spirit dmg, inflicts Bleed (4/t, 3t), & -2 Enemy Atk (2t)." },
      { level: 10, name: "Awaken Treant", type: "active", icon: "🌳", mp: 5, shieldTurns: 4, summon: { name: "Awakened Treant", icon: "🌳", dmg: 6, turns: 5 }, desc: "Active (5 MP): Calls an Awakened Treant (6 dmg/t, 5t) & grants +3 AC barkskin (4t)." }
    ]
  }
]);
