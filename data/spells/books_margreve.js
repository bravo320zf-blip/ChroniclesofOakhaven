/* ============================================================
   BOOK SPELLS — OLD MARGREVE (6 Rare Scroll Spells)
   All spells here have scrollOnly: true and drop as Rare Spell Scrolls.
   ============================================================ */
window.OAKHAVEN.registerSpells([
  {
    "name": "Ambush",
    "mp": 3,
    "combat": true,
    "ooc": true,
    "icon": "🎭",
    "scrollOnly": true,
    "scrollRarity": "rare",
    "source": "Old Margreve",
    "school": "Illusion",
    "spellLevel": 1,
    "evadeTurns": 3,
    "desc": "Tactical foresight (+2 ac for 3 turns). [Lv.1 Illusion • Old Margreve]"
  },
  {
    "name": "Greater Ley Protection",
    "mp": 6,
    "combat": true,
    "ooc": true,
    "icon": "✨",
    "scrollOnly": true,
    "scrollRarity": "rare",
    "source": "Old Margreve",
    "school": "Abjuration",
    "spellLevel": 7,
    "shieldTurns": 3,
    "desc": "Arcane ward (+3 ac for 3 turns). [Lv.7 Abjuration • Old Margreve]"
  },
  {
    "name": "Lesser Ley Protection",
    "mp": 5,
    "combat": true,
    "ooc": true,
    "icon": "✨",
    "scrollOnly": true,
    "scrollRarity": "rare",
    "source": "Old Margreve",
    "school": "Abjuration",
    "spellLevel": 5,
    "shieldTurns": 3,
    "desc": "Arcane ward (+3 ac for 3 turns). [Lv.5 Abjuration • Old Margreve]"
  },
  {
    "name": "Ley Disturbance",
    "mp": 4,
    "combat": true,
    "ooc": true,
    "icon": "👁️",
    "scrollOnly": true,
    "scrollRarity": "rare",
    "source": "Old Margreve",
    "school": "Divination",
    "spellLevel": 3,
    "evadeTurns": 3,
    "desc": "Tactical foresight (+2 ac for 3 turns). [Lv.3 Divination • Old Margreve]"
  },
  {
    "name": "Shadow's Brand",
    "mp": 3,
    "combat": true,
    "ooc": false,
    "icon": "💀",
    "scrollOnly": true,
    "scrollRarity": "rare",
    "source": "Old Margreve",
    "school": "Necromancy",
    "spellLevel": 2,
    "dmgDice": "2d6",
    "dmgStat": "arcana",
    "dmgType": "arcane",
    "desc": "Deals 2d6 + arcana arcane dmg. [Lv.2 Necromancy • Old Margreve]"
  },
  {
    "name": "Shadow Tree",
    "mp": 3,
    "combat": true,
    "ooc": false,
    "icon": "✨",
    "scrollOnly": true,
    "scrollRarity": "rare",
    "source": "Old Margreve",
    "school": "Conjuration",
    "spellLevel": 2,
    "dmgDice": "2d6",
    "dmgStat": "arcana",
    "dmgType": "arcane",
    "desc": "Deals 2d6 + arcana arcane dmg. [Lv.2 Conjuration • Old Margreve]"
  }
]);
