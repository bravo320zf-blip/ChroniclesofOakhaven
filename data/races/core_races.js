/* ============================================================
   CORE RACES
   Add new races by creating another file in data/races/
   and calling window.OAKHAVEN.registerRaces([...]).
   ============================================================ */
window.OAKHAVEN.registerRaces([
  {
    id: "human",
    name: "Human",
    desc: "+1 Luck, +2 Max HP, and +15 Starting GP. Adaptable frontier folk.",
    statBonuses: { luck: 1 },
    bonusHp: 2,
    bonusMp: 0,
    bonusGold: 15
  },
  {
    id: "elf",
    name: "High Elf",
    desc: "+1 Arcana, +1 Agility, +2 Max MP. Graceful and attuned to magic.",
    statBonuses: { arcana: 1, agility: 1 },
    bonusHp: 0,
    bonusMp: 2,
    bonusGold: 0
  },
  {
    id: "dwarf",
    name: "Mountain Dwarf",
    desc: "+1 Might, +1 Spirit, +4 Max HP. Hardy stone-born resilience.",
    statBonuses: { might: 1, spirit: 1 },
    bonusHp: 4,
    bonusMp: 0,
    bonusGold: 0
  },
  {
    id: "halfling",
    name: "Halfling",
    desc: "+1 Agility, +2 Luck. Nimble wanderers blessed by fortune.",
    statBonuses: { agility: 1, luck: 2 },
    bonusHp: 0,
    bonusMp: 0,
    bonusGold: 5
  },
  {
    id: "half_orc",
    name: "Half-Orc",
    desc: "+2 Might, +3 Max HP. Fierce frontier warriors built for battle.",
    statBonuses: { might: 2 },
    bonusHp: 3,
    bonusMp: 0,
    bonusGold: 0
  }
]);
