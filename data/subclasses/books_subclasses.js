/* ============================================================
   BOOK EXPANSION SUBCLASSES (182 Subclasses • Authentic 5E Synergies • Lv 1 / 5 / 10)
   ============================================================ */
window.OAKHAVEN.registerSubclasses([
  {
    "id": "theurge_dweomercrafter",
    "classId": "theurge",
    "name": "Dweomercrafter",
    "source": "Deep Magic Vol. 1",
    "desc": "Artificer-theurge who distills divine and arcane dweomers into elixirs and wards.",
    "abilities": [
      {
        "level": 1,
        "name": "Dweomer Distillation",
        "type": "active",
        "ooc": true,
        "icon": "🧪",
        "mp": 8,
        "craftItem": "mana_elixir",
        "spellDmgBonus": 1,
        "desc": "Passive: +1 spell dmg. Active (8 MP, anytime): Distill a free Mana Elixir into your pack."
      },
      {
        "level": 5,
        "name": "Runed Ward",
        "type": "active",
        "icon": "🛡️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Spirit force dmg & binds a +3 AC dweomer ward (3t)."
      },
      {
        "level": 10,
        "name": "Masterwork Dweomer",
        "type": "active",
        "icon": "✨",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgStat": "spirit",
        "dmgType": "radiant",
        "craftItem": "greater_potion",
        "desc": "Active (5 MP): Deals 3d6 + Spirit radiant dmg & condenses a free Greater Health Potion!"
      }
    ]
  },
  {
    "id": "theurge_mystic",
    "classId": "theurge",
    "name": "Mystic",
    "source": "Deep Magic Vol. 1",
    "desc": "Tempest wielder stunning foes with thunderclaps and crackling storm retaliation. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Third Eye",
        "type": "passive",
        "icon": "⚡",
        "thornsDmg": 3,
        "spellDmgBonus": 1,
        "desc": "Passive: +1 spell dmg and attackers take 3 storm-arc retaliation dmg on hit."
      },
      {
        "level": 5,
        "name": "Psychic Blast",
        "type": "active",
        "icon": "⚡",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Spirit lightning dmg and STUNS foe for 1 turn!"
      },
      {
        "level": 10,
        "name": "Psychic Storm",
        "type": "active",
        "icon": "🌩️",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 2,
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "evadeTurns": 2,
        "desc": "Active (5 MP): Deals 3d6 + 2 + Spirit storm dmg, STUNS (1t), & +2 AC (2t)."
      }
    ]
  },
  {
    "id": "arcanist_alkemancer",
    "classId": "arcanist",
    "name": "Alkemancer",
    "source": "Deep Magic Vol. 1",
    "desc": "Master alchemist who brews free Alchemist's Bombs with mana and empowers explosives.",
    "abilities": [
      {
        "level": 1,
        "name": "Alchemical Concoction",
        "type": "active",
        "ooc": true,
        "icon": "🧪",
        "mp": 10,
        "craftItem": "alchemist_bomb",
        "desc": "Active (10 MP, in or out of combat): Transmute mana into a free Alchemist's Bomb in your backpack."
      },
      {
        "level": 5,
        "name": "Volatile Formula",
        "type": "passive",
        "icon": "💣",
        "bombDmgBonus": 6,
        "bombChillTurns": 2,
        "desc": "Passive: Your thrown Alchemist's Bombs deal +6 bonus damage and weaken foes (-2 Enemy Atk for 2t)."
      },
      {
        "level": 10,
        "name": "Philosopher's Catalyst",
        "type": "active",
        "icon": "⚗️",
        "mp": 6,
        "dmgDice": "3d6",
        "dmgBonus": 4,
        "dmgStat": "arcana",
        "dmgType": "acid",
        "dot": {
          "dmg": 5,
          "turns": 3,
          "label": "Acid Burn"
        },
        "craftItem": "alchemist_bomb",
        "desc": "Active (6 MP): Detonate 3d6 + 4 + Arcana acid dmg, apply Acid Burn (5/t, 3t), & brew a free Alchemist's Bomb!"
      }
    ]
  },
  {
    "id": "arcanist_blood_mage",
    "classId": "arcanist",
    "name": "Blood Mage",
    "source": "Deep Magic Vol. 1",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Blood Savant",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Internal Fortitude",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Thicken or Quicken Blood",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "arcanist_dragon_mage",
    "classId": "arcanist",
    "name": "Dragon Mage",
    "source": "Deep Magic Vol. 1",
    "desc": "Blazing elemental specialist amplifying spells and scorching foes with burning fire. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Dragon Magic Savant",
        "type": "passive",
        "icon": "🔥",
        "spellDmgBonus": 2,
        "bossDmgBonus": 2,
        "desc": "Passive: +2 bonus damage on all combat spells and +2 dmg vs Boss enemies."
      },
      {
        "level": 5,
        "name": "Invoke Dragon Mask",
        "type": "active",
        "icon": "🔥",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "fire",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Burning"
        },
        "desc": "Active (3 MP): Deals 2d6 + Arcana fire dmg & ignites foe (4 Burning dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Invoke Dragon Tail",
        "type": "active",
        "icon": "🐉",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 3,
        "dmgStat": "arcana",
        "dmgType": "fire",
        "dot": {
          "dmg": 6,
          "turns": 3,
          "label": "Dragonfire"
        },
        "desc": "Active (5 MP): Deals 3d6 + 3 + Arcana fire dmg & Dragonfire burn (6/t, 3t)."
      }
    ]
  },
  {
    "id": "arcanist_elementalist",
    "classId": "arcanist",
    "name": "Elementalist",
    "source": "Deep Magic Vol. 1",
    "desc": "Arcane master cutting spell MP costs, amplifying spellcraft, and siphoning mana. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Elemental Savant",
        "type": "passive",
        "icon": "✨",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: All spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Elemental Mastery",
        "type": "active",
        "icon": "🔷",
        "mp": 0,
        "oncePerCombat": true,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "restoreMp": 5,
        "desc": "Active (1/Combat, 0 MP): Deals 2d6 + Arcana arcane dmg & channels +5 MP."
      },
      {
        "level": 10,
        "name": "Masteries",
        "type": "active",
        "icon": "🌌",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "chillTurns": 2,
        "desc": "Active (5 MP): Unleashes 3d8 + Arcana arcane dmg & weakens foe (-2 Atk, 2t)."
      }
    ]
  },
  {
    "id": "arcanist_entropist",
    "classId": "arcanist",
    "name": "Entropist",
    "source": "Deep Magic Vol. 1",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Chaos Magic Savant",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Long Odds",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "Master of Chaos",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Arcana dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "arcanist_illuminator",
    "classId": "arcanist",
    "name": "Illuminator",
    "source": "Deep Magic Vol. 1",
    "desc": "Radiant champion amplifying healing, smiting undead, and blinding foes in light. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Illumination Magic Savant",
        "type": "passive",
        "icon": "☀️",
        "undeadDmgBonus": 4,
        "healBonus": 3,
        "desc": "Passive: +4 bonus dmg vs Undead and +3 extra HP from all heals & potions."
      },
      {
        "level": 5,
        "name": "Omen of Warning",
        "type": "active",
        "icon": "☀️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "radiant",
        "undeadDouble": true,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana radiant dmg (2x Undead) & blinds (-2 Atk, 2t)."
      },
      {
        "level": 10,
        "name": "Comprehension of the Starry Sky",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "undeadDouble": true,
        "desc": "Active (5 MP): Deals 2d8 + Arcana radiant dmg (2x Undead) & heals 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "arcanist_master_of_fiends",
    "classId": "arcanist",
    "name": "Master of Fiends",
    "source": "Deep Magic Vol. 1",
    "desc": "Arcane master cutting spell MP costs, amplifying spellcraft, and siphoning mana. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Dark Arts",
        "type": "passive",
        "icon": "✨",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: All spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Fiendish Presence",
        "type": "active",
        "icon": "🔷",
        "mp": 0,
        "oncePerCombat": true,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "restoreMp": 5,
        "desc": "Active (1/Combat, 0 MP): Deals 2d6 + Arcana arcane dmg & channels +5 MP."
      },
      {
        "level": 10,
        "name": "Master of Dark Conjuration",
        "type": "active",
        "icon": "🌌",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "chillTurns": 2,
        "desc": "Active (5 MP): Unleashes 3d8 + Arcana arcane dmg & weakens foe (-2 Atk, 2t)."
      }
    ]
  },
  {
    "id": "arcanist_necrophage",
    "classId": "arcanist",
    "name": "Necrophage",
    "source": "Deep Magic Vol. 1",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Undead Familiar",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Memory of Flesh",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Feed on Life",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "arcanist_ring_warden",
    "classId": "arcanist",
    "name": "Ring Warden",
    "source": "Deep Magic Vol. 1",
    "desc": "Master of ring magic who reduces spell costs and channels focused arcane rings.",
    "abilities": [
      {
        "level": 1,
        "name": "Ring Attunement",
        "type": "passive",
        "icon": "💍",
        "spellCostReduce": 1,
        "bonusAc": 1,
        "desc": "Passive: +1 AC and all prepared spells cost 1 less MP (minimum 1 MP)."
      },
      {
        "level": 5,
        "name": "Ring of Force",
        "type": "active",
        "icon": "💍",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgBonus": 2,
        "dmgStat": "arcana",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + 2 + Arcana force dmg & projects +3 AC (3t)."
      },
      {
        "level": 10,
        "name": "Sovereign Ring",
        "type": "active",
        "icon": "👑",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "force",
        "restoreMp": 4,
        "desc": "Active (5 MP): Deals 3d8 + Arcana force dmg and recycles +4 MP."
      }
    ]
  },
  {
    "id": "arcanist_timekeeper",
    "classId": "arcanist",
    "name": "Timekeeper",
    "source": "Deep Magic Vol. 1",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Temporal Magic Savant",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Temporal Points",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "Time Mastery",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Arcana dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "bard_college_of_wyrdsingers",
    "classId": "bard",
    "name": "College of Wyrdsingers",
    "source": "Deep Magic Vol. 1",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Braggart",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Inspire Greatness",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "luck",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Luck psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "Make Your Own Fate",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "luck",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Luck dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "cleric_angelic_scribe",
    "classId": "cleric",
    "name": "Angelic Scribe",
    "source": "Deep Magic Vol. 1",
    "desc": "Radiant champion amplifying healing, smiting undead, and blinding foes in light. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Wizard or Cleric Specialty",
        "type": "passive",
        "icon": "☀️",
        "undeadDmgBonus": 4,
        "healBonus": 3,
        "desc": "Passive: +4 bonus dmg vs Undead and +3 extra HP from all heals & potions."
      },
      {
        "level": 5,
        "name": "Angelic Savant",
        "type": "active",
        "icon": "☀️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "radiant",
        "undeadDouble": true,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit radiant dmg (2x Undead) & blinds (-2 Atk, 2t)."
      },
      {
        "level": 10,
        "name": "Angelic Seals",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "undeadDouble": true,
        "desc": "Active (5 MP): Deals 2d8 + Spirit radiant dmg (2x Undead) & heals 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "cleric_beer_domain",
    "classId": "cleric",
    "name": "Beer Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Jovial brew-priest whose sacred ales fortify allies and daze enemies.",
    "abilities": [
      {
        "level": 1,
        "name": "Sacred Brew",
        "type": "active",
        "ooc": true,
        "icon": "🍺",
        "mp": 8,
        "craftItem": "health_potion",
        "bonusHp": 4,
        "desc": "Passive: +4 Max HP. Active (8 MP, anytime): Bless a mug into a free Health Potion."
      },
      {
        "level": 5,
        "name": "Intoxicating Aura",
        "type": "active",
        "icon": "🍺",
        "mp": 3,
        "dmgDice": "1d8",
        "dmgStat": "spirit",
        "dmgType": "poison",
        "chillTurns": 3,
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Daze foe (-2 Atk, 3t) for 1d8 + Spirit dmg & quaff 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Keg of Liquid Courage",
        "type": "active",
        "icon": "🍻",
        "mp": 5,
        "oncePerCombat": true,
        "healDice": "2d8",
        "healStat": "spirit",
        "selfBuffAtk": {
          "atk": 3,
          "turns": 4
        },
        "shieldTurns": 3,
        "desc": "Active (5 MP, 1/Combat): +2d8 + Spirit HP, +3 Attack (4t), & +3 AC (3t)."
      }
    ]
  },
  {
    "id": "cleric_cat_domain",
    "classId": "cleric",
    "name": "Cat Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Bond-weaver fighting alongside a summoned Spirit Stalker and nature's resilience. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Silent Claws",
        "type": "active",
        "icon": "🐆",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Spirit Stalker",
          "icon": "🐆",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Spirit Stalker (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Feline Finesse",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Spirit dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Emissary of the Cat",
        "type": "active",
        "icon": "🐆",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Spirit Stalker",
          "icon": "🐆",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Spirit dmg & calls Elder Spirit Stalker (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "cleric_dragon_domain",
    "classId": "cleric",
    "name": "Dragon Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Blazing elemental specialist amplifying spells and scorching foes with burning fire. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Channel Divinity: Charmer of Reptiles",
        "type": "passive",
        "icon": "🔥",
        "spellDmgBonus": 2,
        "bossDmgBonus": 2,
        "desc": "Passive: +2 bonus damage on all combat spells and +2 dmg vs Boss enemies."
      },
      {
        "level": 5,
        "name": "Dragon's Resistance",
        "type": "active",
        "icon": "🔥",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "fire",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Burning"
        },
        "desc": "Active (3 MP): Deals 2d6 + Spirit fire dmg & ignites foe (4 Burning dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Frightful Presence",
        "type": "active",
        "icon": "🐉",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 3,
        "dmgStat": "spirit",
        "dmgType": "fire",
        "dot": {
          "dmg": 6,
          "turns": 3,
          "label": "Dragonfire"
        },
        "desc": "Active (5 MP): Deals 3d6 + 3 + Spirit fire dmg & Dragonfire burn (6/t, 3t)."
      }
    ]
  },
  {
    "id": "cleric_frost_domain",
    "classId": "cleric",
    "name": "Frost Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Tempest wielder stunning foes with thunderclaps and crackling storm retaliation. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "A Cold Wind",
        "type": "passive",
        "icon": "⚡",
        "thornsDmg": 3,
        "spellDmgBonus": 1,
        "desc": "Passive: +1 spell dmg and attackers take 3 storm-arc retaliation dmg on hit."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Snow Walker",
        "type": "active",
        "icon": "⚡",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Spirit lightning dmg and STUNS foe for 1 turn!"
      },
      {
        "level": 10,
        "name": "Bringer of Winter's Wrath",
        "type": "active",
        "icon": "🌩️",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 2,
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "evadeTurns": 2,
        "desc": "Active (5 MP): Deals 3d6 + 2 + Spirit storm dmg, STUNS (1t), & +2 AC (2t)."
      }
    ]
  },
  {
    "id": "cleric_hunger_domain",
    "classId": "cleric",
    "name": "Hunger Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Unsated",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Ferocious Feast",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Ravening Horde",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Spirit necrotic dmg & drains 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "cleric_hunting_domain",
    "classId": "cleric",
    "name": "Hunting Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Bond-weaver fighting alongside a summoned Spirit Stalker and nature's resilience. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Forest Master",
        "type": "active",
        "icon": "🐆",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Spirit Stalker",
          "icon": "🐆",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Spirit Stalker (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Undetected",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Spirit dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Deadly Stalker",
        "type": "active",
        "icon": "🐆",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Spirit Stalker",
          "icon": "🐆",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Spirit dmg & calls Elder Spirit Stalker (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "cleric_justice_domain",
    "classId": "cleric",
    "name": "Justice Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Cryomancer freezing enemies solid and coating themselves in glacial armor. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Channel Divinity: No Hiding Place",
        "type": "passive",
        "icon": "❄️",
        "bonusAc": 1,
        "thornsDmg": 3,
        "desc": "Passive: +1 AC frost armor and attackers take 3 frostbite dmg on hit."
      },
      {
        "level": 5,
        "name": "Hand of Justice",
        "type": "active",
        "icon": "❄️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "frost",
        "chillTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Spirit frost dmg & deeply chills foe (-2 Atk, 3t)."
      },
      {
        "level": 10,
        "name": "Channel Divinity: Holy Denunciation",
        "type": "active",
        "icon": "🧊",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgBonus": 2,
        "dmgStat": "spirit",
        "dmgType": "frost",
        "stunTurns": 1,
        "shieldTurns": 3,
        "desc": "Active (5 MP): Encases foe in ice — 2d8 + 2 + Spirit dmg, STUNS (1t), & +3 AC."
      }
    ]
  },
  {
    "id": "cleric_lust_domain",
    "classId": "cleric",
    "name": "Lust Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Inspiring mystic blending amplified restoration, tactical wards, and radiant bursts. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Gifts of Lust",
        "type": "passive",
        "icon": "💚",
        "healBonus": 3,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and all healing spells & potions restore +3 extra HP."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Lustful Distraction",
        "type": "active",
        "ooc": true,
        "icon": "✨",
        "mp": 4,
        "healDice": "2d6",
        "healStat": "spirit",
        "shieldTurns": 2,
        "desc": "Active (4 MP, anytime): Restore 2d6 + Spirit HP and raise a +3 AC ward (2t)."
      },
      {
        "level": 10,
        "name": "Master of Seduction",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Spirit radiant dmg & restores 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "cleric_moon_domain",
    "classId": "cleric",
    "name": "Moon Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Moon's Grace",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Night's Chill",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "The Moonlit Way",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Spirit necrotic dmg & drains 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "cleric_mountain_domain",
    "classId": "cleric",
    "name": "Mountain Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Tongues of the Mountains",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Ever Upward",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Avalanche",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "spirit",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Spirit dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "cleric_ocean_domain",
    "classId": "cleric",
    "name": "Ocean Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Tempest wielder stunning foes with thunderclaps and crackling storm retaliation. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Envoy to the Waves",
        "type": "passive",
        "icon": "⚡",
        "thornsDmg": 3,
        "spellDmgBonus": 1,
        "desc": "Passive: +1 spell dmg and attackers take 3 storm-arc retaliation dmg on hit."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Sea Speaker",
        "type": "active",
        "icon": "⚡",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Spirit lightning dmg and STUNS foe for 1 turn!"
      },
      {
        "level": 10,
        "name": "Scales of the Sea",
        "type": "active",
        "icon": "🌩️",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 2,
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "evadeTurns": 2,
        "desc": "Active (5 MP): Deals 3d6 + 2 + Spirit storm dmg, STUNS (1t), & +2 AC (2t)."
      }
    ]
  },
  {
    "id": "cleric_prophecy_domain",
    "classId": "cleric",
    "name": "Prophecy Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "A Path Foretold",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Channel Divinity: One Move Ahead",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "It Was Foretold",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Spirit dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "cleric_speed_domain",
    "classId": "cleric",
    "name": "Speed Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Celerity in Thought and Action",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Burst of Speed",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "Channel Divinity: Time Stop",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Spirit dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "cleric_time_domain",
    "classId": "cleric",
    "name": "Time Domain",
    "source": "Deep Magic Vol. 1",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Prescient Glimpses",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Time Shift",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "Master of Time",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Spirit dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "druid_circle_of_oaks",
    "classId": "druid",
    "name": "Circle of Oaks",
    "source": "Deep Magic Vol. 1",
    "desc": "Ancient forest guardian with iron-hard oak bark and crushing roots.",
    "abilities": [
      {
        "level": 1,
        "name": "Heartwood Bark",
        "type": "passive",
        "icon": "🌳",
        "bonusAc": 1,
        "bonusHp": 4,
        "thornsDmg": 3,
        "desc": "Passive: +1 AC, +4 Max HP, and attackers take 3 splintering bark dmg on hit."
      },
      {
        "level": 5,
        "name": "Grasping Oak Roots",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "stunTurns": 1,
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Spirit dmg, STUNS foe in roots (1t), & +3 AC (3t)."
      },
      {
        "level": 10,
        "name": "Ancient Oak Sentinel",
        "type": "active",
        "icon": "🌳",
        "mp": 5,
        "summon": {
          "name": "Ancient Oak Guardian",
          "icon": "🌳",
          "dmg": 7,
          "turns": 5
        },
        "shieldTurns": 4,
        "desc": "Active (5 MP): Calls an Ancient Oak Guardian (7 dmg/t, 5t) & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "druid_circle_of_owls",
    "classId": "druid",
    "name": "Circle of Owls",
    "source": "Deep Magic Vol. 1",
    "desc": "Nocturnal Margreve mystic aided by silent great-owl spirits.",
    "abilities": [
      {
        "level": 1,
        "name": "Spirit Owl Familiar",
        "type": "active",
        "icon": "🦉",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Great Grey Owl",
          "icon": "🦉",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon your Great Grey Owl (4 dmg/t, 4t)."
      },
      {
        "level": 5,
        "name": "Silent Swoop",
        "type": "active",
        "icon": "🦉",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit dmg, blinds foe (-2 Atk, 2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "Parliament of Night",
        "type": "active",
        "icon": "🌙",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "radiant",
        "summon": {
          "name": "Spectral Owl Flock",
          "icon": "🦉",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Spirit lunar dmg & summons Spectral Owl Flock (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "warlock_frozen_one",
    "classId": "warlock",
    "name": "Frozen One",
    "source": "Deep Magic Vol. 1",
    "desc": "Cryomancer freezing enemies solid and coating themselves in glacial armor. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Deflective Ice",
        "type": "passive",
        "icon": "❄️",
        "bonusAc": 1,
        "thornsDmg": 3,
        "desc": "Passive: +1 AC frost armor and attackers take 3 frostbite dmg on hit."
      },
      {
        "level": 5,
        "name": "Frozen Path",
        "type": "active",
        "icon": "❄️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "frost",
        "chillTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Arcana frost dmg & deeply chills foe (-2 Atk, 3t)."
      },
      {
        "level": 10,
        "name": "Eldritch Invocations",
        "type": "active",
        "icon": "🧊",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgBonus": 2,
        "dmgStat": "arcana",
        "dmgType": "frost",
        "stunTurns": 1,
        "shieldTurns": 3,
        "desc": "Active (5 MP): Encases foe in ice — 2d8 + 2 + Arcana dmg, STUNS (1t), & +3 AC."
      }
    ]
  },
  {
    "id": "warlock_genie_lord",
    "classId": "warlock",
    "name": "Genie Lord",
    "source": "Deep Magic Vol. 1",
    "desc": "Arcane master cutting spell MP costs, amplifying spellcraft, and siphoning mana. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Genie Lord's Favor",
        "type": "passive",
        "icon": "✨",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: All spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Release Energy",
        "type": "active",
        "icon": "🔷",
        "mp": 0,
        "oncePerCombat": true,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "restoreMp": 5,
        "desc": "Active (1/Combat, 0 MP): Deals 2d6 + Arcana arcane dmg & channels +5 MP."
      },
      {
        "level": 10,
        "name": "Pact Boons",
        "type": "active",
        "icon": "🌌",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "chillTurns": 2,
        "desc": "Active (5 MP): Unleashes 3d8 + Arcana arcane dmg & weakens foe (-2 Atk, 2t)."
      }
    ]
  },
  {
    "id": "ranger_griffon_scout",
    "classId": "ranger",
    "name": "Griffon Scout",
    "source": "Deep Magic Vol. 1",
    "desc": "Tempest wielder stunning foes with thunderclaps and crackling storm retaliation. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Griffon Scout Magic",
        "type": "passive",
        "icon": "⚡",
        "thornsDmg": 3,
        "spellDmgBonus": 1,
        "desc": "Passive: +1 spell dmg and attackers take 3 storm-arc retaliation dmg on hit."
      },
      {
        "level": 5,
        "name": "Mounted Scout",
        "type": "active",
        "icon": "⚡",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "lightning",
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Agility lightning dmg and STUNS foe for 1 turn!"
      },
      {
        "level": 10,
        "name": "Strike and Fade",
        "type": "active",
        "icon": "🌩️",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 2,
        "dmgStat": "agility",
        "dmgType": "lightning",
        "stunTurns": 1,
        "evadeTurns": 2,
        "desc": "Active (5 MP): Deals 3d6 + 2 + Agility storm dmg, STUNS (1t), & +2 AC (2t)."
      }
    ]
  },
  {
    "id": "paladin_oath_of_radiance",
    "classId": "paladin",
    "name": "Oath of Radiance",
    "source": "Deep Magic Vol. 1",
    "desc": "Radiant champion amplifying healing, smiting undead, and blinding foes in light. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Tenets of Radiance",
        "type": "passive",
        "icon": "☀️",
        "undeadDmgBonus": 4,
        "healBonus": 3,
        "desc": "Passive: +4 bonus dmg vs Undead and +3 extra HP from all heals & potions."
      },
      {
        "level": 5,
        "name": "Aura of Resolve",
        "type": "active",
        "icon": "☀️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "radiant",
        "undeadDouble": true,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Might radiant dmg (2x Undead) & blinds (-2 Atk, 2t)."
      },
      {
        "level": 10,
        "name": "Radiant Champion",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "might",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "undeadDouble": true,
        "desc": "Active (5 MP): Deals 2d8 + Might radiant dmg (2x Undead) & heals 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "sorcerer_boreal",
    "classId": "sorcerer",
    "name": "Boreal",
    "source": "Deep Magic Vol. 1",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Boreal Magic",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Numbing Cold",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Winter's Soul",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "sorcerer_elemental_essence",
    "classId": "sorcerer",
    "name": "Elemental Essence",
    "source": "Deep Magic Vol. 1",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Elemental Magic",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Elemental Heritage",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Elemental Soul",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "sorcerer_farseer",
    "classId": "sorcerer",
    "name": "Farseer",
    "source": "Deep Magic Vol. 1",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Farseer Magic",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Blood of the Seer",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Sharing the Dream",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "sorcerer_serophage",
    "classId": "sorcerer",
    "name": "Serophage",
    "source": "Deep Magic Vol. 1",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Deep Magic Vol. 1)",
    "abilities": [
      {
        "level": 1,
        "name": "Serophage Magic",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Serophage Strike",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Serophage Mastery",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "witch_hex",
    "classId": "witch",
    "name": "Hex",
    "source": "Deep Magic Vol. 2",
    "desc": "Arcane master cutting spell MP costs, amplifying spellcraft, and siphoning mana. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Hex Training",
        "type": "passive",
        "icon": "✨",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: All spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Hex Surge",
        "type": "active",
        "icon": "🔷",
        "mp": 0,
        "oncePerCombat": true,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "restoreMp": 5,
        "desc": "Active (1/Combat, 0 MP): Deals 2d6 + Arcana arcane dmg & channels +5 MP."
      },
      {
        "level": 10,
        "name": "Hex Mastery",
        "type": "active",
        "icon": "🌌",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "chillTurns": 2,
        "desc": "Active (5 MP): Unleashes 3d8 + Arcana arcane dmg & weakens foe (-2 Atk, 2t)."
      }
    ]
  },
  {
    "id": "witch_ability_score_improvement",
    "classId": "witch",
    "name": "Ability Score Improvement",
    "source": "Deep Magic Vol. 2",
    "desc": "Arcane master cutting spell MP costs, amplifying spellcraft, and siphoning mana. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Ability Score Improvement Training",
        "type": "passive",
        "icon": "✨",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: All spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Ability Score Improvement Surge",
        "type": "active",
        "icon": "🔷",
        "mp": 0,
        "oncePerCombat": true,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "restoreMp": 5,
        "desc": "Active (1/Combat, 0 MP): Deals 2d6 + Arcana arcane dmg & channels +5 MP."
      },
      {
        "level": 10,
        "name": "Ability Score Improvement Mastery",
        "type": "active",
        "icon": "🌌",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "chillTurns": 2,
        "desc": "Active (5 MP): Unleashes 3d8 + Arcana arcane dmg & weakens foe (-2 Atk, 2t)."
      }
    ]
  },
  {
    "id": "witch_greater_binding",
    "classId": "witch",
    "name": "Greater Binding",
    "source": "Deep Magic Vol. 2",
    "desc": "Arcane master cutting spell MP costs, amplifying spellcraft, and siphoning mana. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Greater Binding Training",
        "type": "passive",
        "icon": "✨",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: All spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Greater Binding Surge",
        "type": "active",
        "icon": "🔷",
        "mp": 0,
        "oncePerCombat": true,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "restoreMp": 5,
        "desc": "Active (1/Combat, 0 MP): Deals 2d6 + Arcana arcane dmg & channels +5 MP."
      },
      {
        "level": 10,
        "name": "Greater Binding Mastery",
        "type": "active",
        "icon": "🌌",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "chillTurns": 2,
        "desc": "Active (5 MP): Unleashes 3d8 + Arcana arcane dmg & weakens foe (-2 Atk, 2t)."
      }
    ]
  },
  {
    "id": "witch_coven_of_the_hidden_moon",
    "classId": "witch",
    "name": "Coven of the Hidden Moon",
    "source": "Deep Magic Vol. 2",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Coven Spells",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "HIDDEN MOON SPELLS",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Arcana dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Empty Vastness",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Arcana dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "witch_coven_of_the_roiling_hearth",
    "classId": "witch",
    "name": "Coven of the Roiling Hearth",
    "source": "Deep Magic Vol. 2",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Coven Spells",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "ROILING HEARTH SPELLS",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Arcana dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Blazing Spirit",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Arcana dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "bard_college_of_cuisine",
    "classId": "bard",
    "name": "College of Cuisine",
    "source": "Deep Magic Vol. 2",
    "desc": "Adventuring celebrity chef who infuses food and drink with restorative magic.",
    "abilities": [
      {
        "level": 1,
        "name": "Magical Treats",
        "type": "active",
        "ooc": true,
        "icon": "🍲",
        "mp": 8,
        "craftItem": "health_potion",
        "healBonus": 3,
        "desc": "Passive: +3 HP from all heals & potions. Active (8 MP, anytime): Cook a free Health Potion."
      },
      {
        "level": 5,
        "name": "Hearty Feast",
        "type": "active",
        "ooc": true,
        "icon": "🍖",
        "mp": 5,
        "healDice": "2d6",
        "healStat": "spirit",
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (5 MP, anytime): Restore 2d6 + Spirit HP and gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Grand Banquet",
        "type": "active",
        "ooc": true,
        "icon": "👑",
        "mp": 10,
        "craftItem": "greater_potion",
        "healDice": "2d8",
        "healStat": "spirit",
        "restoreLuck": 1,
        "desc": "Active (10 MP, anytime): Brew a Greater Health Potion, heal 2d8 + Spirit HP, & +1 Luck."
      }
    ]
  },
  {
    "id": "bard_college_of_festivals",
    "classId": "bard",
    "name": "College of Festivals",
    "source": "Deep Magic Vol. 2",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Bastion of Joy",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "Infinite Revelry",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Make Flow the Wine and Song",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "luck",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Luck dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "cleric_darkness_domain",
    "classId": "cleric",
    "name": "Darkness Domain",
    "source": "Deep Magic Vol. 2",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Creature of Darkness",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Shadowsight",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Shadow Shield",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Spirit necrotic dmg & drains 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "cleric_doom_domain",
    "classId": "cleric",
    "name": "Doom Domain",
    "source": "Deep Magic Vol. 2",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Herald of the Apocalypse",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Damnation",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Apex of Doom Domain",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Spirit necrotic dmg & drains 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "cleric_labyrinth_domain",
    "classId": "cleric",
    "name": "Labyrinth Domain",
    "source": "Deep Magic Vol. 2",
    "desc": "Tempest wielder stunning foes with thunderclaps and crackling storm retaliation. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "First Passage",
        "type": "passive",
        "icon": "⚡",
        "thornsDmg": 3,
        "spellDmgBonus": 1,
        "desc": "Passive: +1 spell dmg and attackers take 3 storm-arc retaliation dmg on hit."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Wisdom of the Winding Way",
        "type": "active",
        "icon": "⚡",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Spirit lightning dmg and STUNS foe for 1 turn!"
      },
      {
        "level": 10,
        "name": "Banish to the Maze",
        "type": "active",
        "icon": "🌩️",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 2,
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "evadeTurns": 2,
        "desc": "Active (5 MP): Deals 3d6 + 2 + Spirit storm dmg, STUNS (1t), & +2 AC (2t)."
      }
    ]
  },
  {
    "id": "cleric_pestilent_domain",
    "classId": "cleric",
    "name": "Pestilent Domain",
    "source": "Deep Magic Vol. 2",
    "desc": "Venom and blight specialist inflicting stacking toxins and brewing remedies. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Remedies Foul and Fair",
        "type": "active",
        "ooc": true,
        "icon": "☠️",
        "mp": 8,
        "craftItem": "antidote",
        "thornsDmg": 2,
        "desc": "Passive: Attackers take 2 toxic splash dmg. Active (8 MP, anytime): Brew a free Antidote."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Mark of the Unclean",
        "type": "active",
        "icon": "🧪",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "poison",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Poisoned"
        },
        "desc": "Active (3 MP): Deals 2d6 + Spirit poison dmg & Poisons foe (4 dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Poxcaster",
        "type": "active",
        "icon": "☠️",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "poison",
        "dot": {
          "dmg": 7,
          "turns": 4,
          "label": "Plague Rot"
        },
        "chillTurns": 2,
        "desc": "Active (5 MP): Deals 2d8 + Spirit dmg, Plague Rot (7/t, 4t), & -2 Enemy Atk."
      }
    ]
  },
  {
    "id": "druid_circle_of_scavengers",
    "classId": "druid",
    "name": "Circle of Scavengers",
    "source": "Deep Magic Vol. 2",
    "desc": "Inspiring mystic blending amplified restoration, tactical wards, and radiant bursts. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "CIRCLE OF SCAVENGER SPELLS",
        "type": "passive",
        "icon": "💚",
        "healBonus": 3,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and all healing spells & potions restore +3 extra HP."
      },
      {
        "level": 5,
        "name": "Halo of Feathers",
        "type": "active",
        "ooc": true,
        "icon": "✨",
        "mp": 4,
        "healDice": "2d6",
        "healStat": "spirit",
        "shieldTurns": 2,
        "desc": "Active (4 MP, anytime): Restore 2d6 + Spirit HP and raise a +3 AC ward (2t)."
      },
      {
        "level": 10,
        "name": "Decompose",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Spirit radiant dmg & restores 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "paladin_oath_of_annihilation",
    "classId": "paladin",
    "name": "Oath of Annihilation",
    "source": "Deep Magic Vol. 2",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Tenets of Annihilation",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "OATH OF ANNIHILATION SPELLS",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Harbinger of the End",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Might dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "sorcerer_doomridden",
    "classId": "sorcerer",
    "name": "Doomridden",
    "source": "Deep Magic Vol. 2",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Doomridden Magic",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "DOOMRIDDEN SPELLS",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Apocalyptic",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "warlock_swarm_patron",
    "classId": "warlock",
    "name": "Swarm Patron",
    "source": "Deep Magic Vol. 2",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "SWARM EXPANDED SPELLS",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Gather the Swarm",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Arcana dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Overwhelm",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Arcana dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "arcanist_doomsayer",
    "classId": "arcanist",
    "name": "Doomsayer",
    "source": "Deep Magic Vol. 2",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Doom Savant",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Wicked Presence",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Power from Darkness",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "arcanist_fey_mage",
    "classId": "arcanist",
    "name": "Fey Mage",
    "source": "Deep Magic Vol. 2",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Wild Nights",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Student of Fey Magics",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Master of Fey Magics",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "arcanist_vril_caster",
    "classId": "arcanist",
    "name": "Vril Caster",
    "source": "Deep Magic Vol. 2",
    "desc": "Arcane master cutting spell MP costs, amplifying spellcraft, and siphoning mana. (Deep Magic Vol. 2)",
    "abilities": [
      {
        "level": 1,
        "name": "Vril Vitality",
        "type": "passive",
        "icon": "✨",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: All spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Vril Transfer",
        "type": "active",
        "icon": "🔷",
        "mp": 0,
        "oncePerCombat": true,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "restoreMp": 5,
        "desc": "Active (1/Combat, 0 MP): Deals 2d6 + Arcana arcane dmg & channels +5 MP."
      },
      {
        "level": 10,
        "name": "Vril Caster Mastery",
        "type": "active",
        "icon": "🌌",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "chillTurns": 2,
        "desc": "Active (5 MP): Unleashes 3d8 + Arcana arcane dmg & weakens foe (-2 Atk, 2t)."
      }
    ]
  },
  {
    "id": "barbarian_path_of_the_ancestors",
    "classId": "barbarian",
    "name": "Path of the Ancestors",
    "source": "Midgard Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Ancestral Warrior and nature's resilience. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Path of the Ancestors Training",
        "type": "active",
        "icon": "👻",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Ancestral Warrior",
          "icon": "👻",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Ancestral Warrior (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Path of the Ancestors Surge",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Might dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Path of the Ancestors Mastery",
        "type": "active",
        "icon": "👻",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Ancestral Warrior",
          "icon": "👻",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Might dmg & calls Elder Ancestral Warrior (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "bard_college_of_entropy",
    "classId": "bard",
    "name": "College of Entropy",
    "source": "Midgard Heroes",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Spell",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Level",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "luck",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Luck psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "College of Entropy Mastery",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "luck",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Luck dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "bard_greenleaf_college",
    "classId": "bard",
    "name": "Greenleaf College",
    "source": "Midgard Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Spell",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Level",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "luck",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Luck dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Weapon. When a creature is hit with an improved",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "luck",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Luck dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "warrior_clanking_mercenary",
    "classId": "warrior",
    "name": "Clanking Mercenary",
    "source": "Midgard Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Armor (Option 1). When the creature wearing the",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Armor (Option 2). The creature wearing the armor can",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Might force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Weapon. When a creature is hit with an improved",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "might",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Might shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "warrior_edjet",
    "classId": "warrior",
    "name": "Edjet",
    "source": "Midgard Heroes",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Edjet Training",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "Edjet Surge",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Edjet Mastery",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Might dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "warrior_ghost_knight",
    "classId": "warrior",
    "name": "Ghost Knight",
    "source": "Midgard Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Ghost Knight Training",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Ghost Knight Surge",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Might necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Ghost Knight Mastery",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "might",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "might",
        "desc": "Active (5 MP): Deals 2d8 + Might necrotic dmg & drains 2d6 + Might HP."
      }
    ]
  },
  {
    "id": "warrior_griffon_knight",
    "classId": "warrior",
    "name": "Griffon Knight",
    "source": "Midgard Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Blackfeather's Fury. When a creature hits you or your",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Sir Andros's Daring Flyby. When you make a melee",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Might necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Two-Weapon Fighting. You are proficient with",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "might",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "might",
        "desc": "Active (5 MP): Deals 2d8 + Might necrotic dmg & drains 2d6 + Might HP."
      }
    ]
  },
  {
    "id": "warrior_shieldbearer",
    "classId": "warrior",
    "name": "Shieldbearer",
    "source": "Midgard Heroes",
    "desc": "Master of heavy shields who crushes foes behind an impenetrable wall.",
    "abilities": [
      {
        "level": 1,
        "name": "Shield Wall",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 2,
        "thornsDmg": 3,
        "desc": "Passive: +2 AC and attackers take 3 shield-rim retaliation dmg when they hit you."
      },
      {
        "level": 5,
        "name": "Staggering Bash",
        "type": "active",
        "icon": "🛡️",
        "mp": 2,
        "dmgDice": "1d8",
        "dmgStat": "might",
        "dmgType": "bludgeoning",
        "stunTurns": 1,
        "shieldTurns": 3,
        "desc": "Active (2 MP): Deals 1d8 + Might dmg, STUNS foe (1t), & +3 AC (3t)."
      },
      {
        "level": 10,
        "name": "Aegis Charge",
        "type": "active",
        "icon": "🏰",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "bludgeoning",
        "shieldTurns": 4,
        "stunTurns": 1,
        "desc": "Active (4 MP): Deals 2d8 + 3 + Might dmg, STUNS foe (1t), & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "warrior_sword_dancer",
    "classId": "warrior",
    "name": "Sword-Dancer",
    "source": "Midgard Heroes",
    "desc": "Whirling blade acrobat chaining rapid critical strikes and graceful parries.",
    "abilities": [
      {
        "level": 1,
        "name": "Whirling Steel",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "statBonuses": {
          "agility": 1
        },
        "desc": "Passive: +1 Agility and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Blade Dance",
        "type": "active",
        "icon": "🌪️",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Strike twice in a whirling arc & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Tempest of Blades",
        "type": "active",
        "icon": "⚔️",
        "mp": 4,
        "multiStrike": 3,
        "evadeTurns": 3,
        "desc": "Active (4 MP): Unleash 3 rapid weapon strikes & gain +2 AC evasion for 3 turns."
      }
    ]
  },
  {
    "id": "paladin_oath_of_thunder",
    "classId": "paladin",
    "name": "Oath of Thunder",
    "source": "Midgard Heroes",
    "desc": "Storm-sworn paladin whose thunderous smites stun foes and shake the earth.",
    "abilities": [
      {
        "level": 1,
        "name": "Storm-Forged Armament",
        "type": "passive",
        "icon": "⚡",
        "bonusAtk": 1,
        "thornsDmg": 3,
        "desc": "Passive: +1 Attack and attackers take 3 crackling lightning dmg on hit."
      },
      {
        "level": 5,
        "name": "Thunderous Smite",
        "type": "active",
        "icon": "⚡",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "lightning",
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Might thunder dmg and STUNS foe for 1 turn!"
      },
      {
        "level": 10,
        "name": "Avatar of the Tempest",
        "type": "active",
        "icon": "🌩️",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "lightning",
        "stunTurns": 1,
        "selfBuffAtk": {
          "atk": 3,
          "turns": 3
        },
        "desc": "Active (5 MP): Deals 3d6 + 3 + Might thunder dmg, STUNS foe (1t), & +3 ATK (3t)."
      }
    ]
  },
  {
    "id": "ranger_vampire_slayer",
    "classId": "ranger",
    "name": "Vampire Slayer",
    "source": "Midgard Heroes",
    "desc": "Relentless hunter of the undead armed with silvered stakes and holy fire.",
    "abilities": [
      {
        "level": 1,
        "name": "Undead Nemesis",
        "type": "passive",
        "icon": "🧄",
        "undeadDmgBonus": 5,
        "critRange": 11,
        "desc": "Passive: +5 bonus damage vs Undead on all hits/spells & Critical Hits on 11+."
      },
      {
        "level": 5,
        "name": "Heartseeker Stake",
        "type": "active",
        "icon": "🗡️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "radiant",
        "undeadDouble": true,
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Agility radiant dmg (2x Undead) & STUNS foe (1t)."
      },
      {
        "level": 10,
        "name": "Dawn's Execution",
        "type": "active",
        "icon": "☀️",
        "mp": 5,
        "guaranteedCrit": true,
        "dmgDice": "2d8",
        "dmgStat": "agility",
        "dmgType": "radiant",
        "undeadDouble": true,
        "desc": "Active (5 MP): Guaranteed Critical strike + 2d8 + Agility radiant dmg (2x Undead)."
      }
    ]
  },
  {
    "id": "ranger_zobecker_scout",
    "classId": "ranger",
    "name": "Zobecker Scout",
    "source": "Midgard Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Empowered Strike. Your expertise in fighting undead",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Straight Through the Heart. When you use an",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Agility necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Saving Throws. Some of your techniques require your",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "agility",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "agility",
        "desc": "Active (5 MP): Deals 2d8 + Agility necrotic dmg & drains 2d6 + Agility HP."
      }
    ]
  },
  {
    "id": "rogue_duelist",
    "classId": "rogue",
    "name": "Duelist",
    "source": "Midgard Heroes",
    "desc": "Cryomancer freezing enemies solid and coating themselves in glacial armor. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Sustained Reaction. These two small vials of paste",
        "type": "passive",
        "icon": "❄️",
        "bonusAc": 1,
        "thornsDmg": 3,
        "desc": "Passive: +1 AC frost armor and attackers take 3 frostbite dmg on hit."
      },
      {
        "level": 5,
        "name": "Techniques. You learn three techniques of your choice",
        "type": "active",
        "icon": "❄️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "frost",
        "chillTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Agility frost dmg & deeply chills foe (-2 Atk, 3t)."
      },
      {
        "level": 10,
        "name": "Witty Repartee. As a reaction after a creature you can",
        "type": "active",
        "icon": "🧊",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgBonus": 2,
        "dmgStat": "agility",
        "dmgType": "frost",
        "stunTurns": 1,
        "shieldTurns": 3,
        "desc": "Active (5 MP): Encases foe in ice — 2d8 + 2 + Agility dmg, STUNS (1t), & +3 AC."
      }
    ]
  },
  {
    "id": "rogue_fixer",
    "classId": "rogue",
    "name": "Fixer",
    "source": "Midgard Heroes",
    "desc": "Zobeck underworld broker who profits from every fight and bribes fortune.",
    "abilities": [
      {
        "level": 1,
        "name": "Underworld Cut",
        "type": "passive",
        "icon": "💰",
        "goldFindPct": 35,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Luck and +35% bonus Gold looted from every defeated enemy."
      },
      {
        "level": 5,
        "name": "Smuggler's Stash",
        "type": "active",
        "ooc": true,
        "icon": "💣",
        "mp": 8,
        "craftItem": "alchemist_bomb",
        "restoreLuck": 1,
        "desc": "Active (8 MP, anytime): Produce a contraband Alchemist's Bomb & restore +1 Luck."
      },
      {
        "level": 10,
        "name": "Loaded Dice",
        "type": "active",
        "icon": "🎲",
        "mp": 4,
        "guaranteedCrit": true,
        "restoreLuck": 2,
        "desc": "Active (4 MP): Guaranteed Critical strike and restore +2 Current Luck."
      }
    ]
  },
  {
    "id": "rogue_whisper",
    "classId": "rogue",
    "name": "Whisper",
    "source": "Midgard Heroes",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Arcing Slash. When you attack with a greatsword, you",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Grinding Halt. Whenever you must make a Strength",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Agility psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "Whisper Mastery",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "agility",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Agility dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "cleric_apocalypse_domain",
    "classId": "cleric",
    "name": "Apocalypse Domain",
    "source": "Midgard Heroes",
    "desc": "Inspiring mystic blending amplified restoration, tactical wards, and radiant bursts. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Cleric",
        "type": "passive",
        "icon": "💚",
        "healBonus": 3,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and all healing spells & potions restore +3 extra HP."
      },
      {
        "level": 5,
        "name": "Level",
        "type": "active",
        "ooc": true,
        "icon": "✨",
        "mp": 4,
        "healDice": "2d6",
        "healStat": "spirit",
        "shieldTurns": 2,
        "desc": "Active (4 MP, anytime): Restore 2d6 + Spirit HP and raise a +3 AC ward (2t)."
      },
      {
        "level": 10,
        "name": "Apex of Apocalypse Domain",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Spirit radiant dmg & restores 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "cleric_clockwork_domain",
    "classId": "cleric",
    "name": "Clockwork Domain",
    "source": "Midgard Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Cleric Level",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Clockwork Domain Strike",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Spirit force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Result",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Spirit shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "cleric_travel_domain",
    "classId": "cleric",
    "name": "Travel Domain",
    "source": "Midgard Heroes",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Cleric Level Spells",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Travel Domain Strike",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "Travel Domain Mastery",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Spirit dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "cleric_void_domain",
    "classId": "cleric",
    "name": "Void Domain",
    "source": "Midgard Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Cleric Level Spells",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Void Domain Strike",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Druid Level",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Spirit necrotic dmg & drains 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "druid_circle_of_the_stones",
    "classId": "druid",
    "name": "Circle of the Stones",
    "source": "Midgard Heroes",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Druid Level",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Circle of the Stones Strike",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Circle of the Stones Mastery",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "sorcerer_mazeborn_bloodline",
    "classId": "sorcerer",
    "name": "Mazeborn Bloodline",
    "source": "Midgard Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Spell",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Level",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "• The gem can capture and store elemental power. When",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "sorcerer_shadow_bloodline",
    "classId": "sorcerer",
    "name": "Shadow Bloodline",
    "source": "Midgard Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Spell",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Level",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "• The gem can capture and store elemental power. When",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "warlock_the_genie_lord",
    "classId": "warlock",
    "name": "The Genie Lord",
    "source": "Midgard Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Spell",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Level",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Arcana force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Pact of the Chain: The Great Machine grants a",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Arcana shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "warlock_the_great_machine",
    "classId": "warlock",
    "name": "The Great Machine",
    "source": "Midgard Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Prerequisite: 9th level",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Spell Level",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Arcana force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Apex of The Great Machine",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Arcana shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "warlock_the_light_eater",
    "classId": "warlock",
    "name": "The Light Eater",
    "source": "Midgard Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Pact of the Blade: The blade of the Great Machine is a",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Pact of the Tome: The Great Machine grants no",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Arcana force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Pact of the Tome: Your",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Arcana shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "arcanist_angelic_scribe",
    "classId": "arcanist",
    "name": "Angelic Scribe",
    "source": "Midgard Heroes",
    "desc": "Radiant champion amplifying healing, smiting undead, and blinding foes in light. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Pact of the Chain: Your familiar can take the Hide",
        "type": "passive",
        "icon": "☀️",
        "undeadDmgBonus": 4,
        "healBonus": 3,
        "desc": "Passive: +4 bonus dmg vs Undead and +3 extra HP from all heals & potions."
      },
      {
        "level": 5,
        "name": "Pact of the Blade: The Light",
        "type": "active",
        "icon": "☀️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "radiant",
        "undeadDouble": true,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana radiant dmg (2x Undead) & blinds (-2 Atk, 2t)."
      },
      {
        "level": 10,
        "name": "Cantrips",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "undeadDouble": true,
        "desc": "Active (5 MP): Deals 2d8 + Arcana radiant dmg (2x Undead) & heals 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "arcanist_school_of_clockwork",
    "classId": "arcanist",
    "name": "School of Clockwork",
    "source": "Midgard Heroes",
    "desc": "Zobeck gear-mage who deploys clockwork automatons and precision-timed blasts.",
    "abilities": [
      {
        "level": 1,
        "name": "Clockwork Familiar",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Beetle",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Beetle (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Gear-Bomb Assembly",
        "type": "active",
        "ooc": true,
        "icon": "💣",
        "mp": 9,
        "craftItem": "alchemist_bomb",
        "bombDmgBonus": 4,
        "desc": "Passive: Bombs deal +4 dmg. Active (9 MP, anytime): Assemble a Clockwork Bomb."
      },
      {
        "level": 10,
        "name": "Brass Automaton",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "lightning",
        "summon": {
          "name": "Brass Automaton",
          "icon": "🤖",
          "dmg": 8,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Arcana shock dmg & deploys a Brass Automaton (8 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "arcanist_doom_croaker",
    "classId": "arcanist",
    "name": "Doom Croaker",
    "source": "Midgard Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Cantrips",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Doom Croaker Strike",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Doom Croaker Mastery",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "arcanist_dragon_masks",
    "classId": "arcanist",
    "name": "Dragon Masks",
    "source": "Midgard Heroes",
    "desc": "Blazing elemental specialist amplifying spells and scorching foes with burning fire. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "• You gain advantage on Wisdom (Perception) checks, as",
        "type": "passive",
        "icon": "🔥",
        "spellDmgBonus": 2,
        "bossDmgBonus": 2,
        "desc": "Passive: +2 bonus damage on all combat spells and +2 dmg vs Boss enemies."
      },
      {
        "level": 5,
        "name": "• Any ranged or melee attack spells you cast while",
        "type": "active",
        "icon": "🔥",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "fire",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Burning"
        },
        "desc": "Active (3 MP): Deals 2d6 + Arcana fire dmg & ignites foe (4 Burning dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Damage Type",
        "type": "active",
        "icon": "🐉",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 3,
        "dmgStat": "arcana",
        "dmgType": "fire",
        "dot": {
          "dmg": 6,
          "turns": 3,
          "label": "Dragonfire"
        },
        "desc": "Active (5 MP): Deals 3d6 + 3 + Arcana fire dmg & Dragonfire burn (6/t, 3t)."
      }
    ]
  },
  {
    "id": "arcanist_elven_high_magic",
    "classId": "arcanist",
    "name": "Elven High Magic",
    "source": "Midgard Heroes",
    "desc": "Ancient elven spellweaver wielding effortless, amplified high arcana.",
    "abilities": [
      {
        "level": 1,
        "name": "High Arcana",
        "type": "passive",
        "icon": "🌟",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: Spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Starlight Cascade",
        "type": "active",
        "icon": "✨",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgBonus": 2,
        "dmgStat": "arcana",
        "dmgType": "radiant",
        "evadeTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + 2 + Arcana starlight dmg & +2 AC shimmer (2t)."
      },
      {
        "level": 10,
        "name": "Mythallar Surge",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "radiant",
        "restoreMp": 5,
        "desc": "Active (5 MP): Deals 3d8 + Arcana radiant dmg & restores +5 MP."
      }
    ]
  },
  {
    "id": "arcanist_school_of_entropy",
    "classId": "arcanist",
    "name": "School of Entropy",
    "source": "Midgard Heroes",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "d100",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Effect",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "School of Entropy Mastery",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Arcana dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "arcanist_geomancy",
    "classId": "arcanist",
    "name": "Geomancy",
    "source": "Midgard Heroes",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Geomancy Training",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "Geomancy Surge",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Geomancy Mastery",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "arcana",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Arcana dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "arcanist_school_of_illumination",
    "classId": "arcanist",
    "name": "School of Illumination",
    "source": "Midgard Heroes",
    "desc": "Radiant champion amplifying healing, smiting undead, and blinding foes in light. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Comet: Comets are the harbingers of change and",
        "type": "passive",
        "icon": "☀️",
        "undeadDmgBonus": 4,
        "healBonus": 3,
        "desc": "Passive: +4 bonus dmg vs Undead and +3 extra HP from all heals & potions."
      },
      {
        "level": 5,
        "name": "Conjunction: Planetary conjunctions destabilize minds",
        "type": "active",
        "icon": "☀️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "radiant",
        "undeadDouble": true,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana radiant dmg (2x Undead) & blinds (-2 Atk, 2t)."
      },
      {
        "level": 10,
        "name": "Cantrips",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "undeadDouble": true,
        "desc": "Active (5 MP): Deals 2d8 + Arcana radiant dmg (2x Undead) & heals 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "arcanist_necrophagy",
    "classId": "arcanist",
    "name": "Necrophagy",
    "source": "Midgard Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Midgard Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Cantrips",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Necrophagy Strike",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Necrophagy Mastery",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "barbarian_path_of_the_hive_tender",
    "classId": "barbarian",
    "name": "Path of the Hive Tender",
    "source": "Old Margreve",
    "desc": "Margreve berserker crowned by a living swarm of giant honey bees.",
    "abilities": [
      {
        "level": 1,
        "name": "Living Hive",
        "type": "active",
        "icon": "🐝",
        "mp": 0,
        "oncePerCombat": true,
        "thornsDmg": 3,
        "summon": {
          "name": "Margreve Bee Swarm",
          "icon": "🐝",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Passive: Attackers take 3 sting dmg. Active (1/Combat, 0 MP): Release Bee Swarm (4 dmg/t, 4t)."
      },
      {
        "level": 5,
        "name": "Royal Jelly Surge",
        "type": "active",
        "ooc": true,
        "icon": "🍯",
        "mp": 8,
        "craftItem": "health_potion",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Venomous Stings"
        },
        "desc": "Active (8 MP, anytime): Harvest Royal Jelly (free Health Potion) or sting foe in combat (4 dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Wrath of the Queen",
        "type": "active",
        "icon": "🐝",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgStat": "might",
        "dmgType": "poison",
        "summon": {
          "name": "Giant Hornet Swarm",
          "icon": "🐝",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (4 MP): Deals 2d8 + Might venom dmg & summons Giant Hornet Swarm (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "barbarian_path_of_the_shadow_chewer",
    "classId": "barbarian",
    "name": "Path of the Shadow Chewer",
    "source": "Old Margreve",
    "desc": "Feral hunter who devours darkness and drains vitality from every strike.",
    "abilities": [
      {
        "level": 1,
        "name": "Devour Shadow",
        "type": "passive",
        "icon": "🌑",
        "lifesteal": 2,
        "undeadDmgBonus": 3,
        "desc": "Passive: Melee hits drain +2 HP and deal +3 bonus damage against Undead."
      },
      {
        "level": 5,
        "name": "Gloom Fang Frenzy",
        "type": "active",
        "icon": "🦷",
        "mp": 2,
        "multiStrike": 2,
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Shadow Rot"
        },
        "desc": "Active (2 MP): Bite twice with weapon attacks & inflict Shadow Rot (4 dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Eclipse Feast",
        "type": "active",
        "icon": "🌑",
        "mp": 4,
        "dmgDice": "3d6",
        "dmgStat": "might",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "might",
        "desc": "Active (4 MP): Deals 3d6 + Might necrotic dmg and devours 2d6 + Might HP."
      }
    ]
  },
  {
    "id": "cleric_hunt_domain",
    "classId": "cleric",
    "name": "Hunt Domain",
    "source": "Old Margreve",
    "desc": "Bond-weaver fighting alongside a summoned Spirit Stalker and nature's resilience. (Old Margreve)",
    "abilities": [
      {
        "level": 1,
        "name": "Hunt Domain Training",
        "type": "active",
        "icon": "🐆",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Spirit Stalker",
          "icon": "🐆",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Spirit Stalker (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Hunt Domain Surge",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Spirit dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Hunt Domain Mastery",
        "type": "active",
        "icon": "🐆",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Spirit Stalker",
          "icon": "🐆",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Spirit dmg & calls Elder Spirit Stalker (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "druid_circle_of_roses",
    "classId": "druid",
    "name": "Circle of Roses",
    "source": "Old Margreve",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Old Margreve)",
    "abilities": [
      {
        "level": 1,
        "name": "Circle of Roses Training",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Circle of Roses Surge",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Spirit dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Circle of Roses Mastery",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Spirit dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "ranger_grove_warden",
    "classId": "ranger",
    "name": "Grove Warden",
    "source": "Old Margreve",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Old Margreve)",
    "abilities": [
      {
        "level": 1,
        "name": "Grove Warden Training",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Grove Warden Surge",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Agility dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Grove Warden Mastery",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Agility dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "ranger_spear_of_the_weald",
    "classId": "ranger",
    "name": "Spear of the Weald",
    "source": "Old Margreve",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Old Margreve)",
    "abilities": [
      {
        "level": 1,
        "name": "Spear of the Weald Training",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Spear of the Weald Surge",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Spear of the Weald Mastery",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "rogue_the_underfoot",
    "classId": "rogue",
    "name": "The Underfoot",
    "source": "Old Margreve",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Old Margreve)",
    "abilities": [
      {
        "level": 1,
        "name": "The Underfoot Training",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "The Underfoot Surge",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Agility psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "The Underfoot Mastery",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "agility",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Agility dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "warlock_the_hunter_in_darkness",
    "classId": "warlock",
    "name": "The Hunter in Darkness",
    "source": "Old Margreve",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Old Margreve)",
    "abilities": [
      {
        "level": 1,
        "name": "The Hunter in Darkness Training",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "The Hunter in Darkness Surge",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "The Hunter in Darkness Mastery",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "warlock_the_old_wood",
    "classId": "warlock",
    "name": "The Old Wood",
    "source": "Old Margreve",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Old Margreve)",
    "abilities": [
      {
        "level": 1,
        "name": "Doom Hound",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Entangling Blast",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Knowledge of the Wood",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "arcanist_courser_mage",
    "classId": "arcanist",
    "name": "Courser Mage",
    "source": "Old Margreve",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Old Margreve)",
    "abilities": [
      {
        "level": 1,
        "name": "Courser Mage Training",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Courser Mage Surge",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Courser Mage Mastery",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "barbarian_path_of_booming_magnificence",
    "classId": "barbarian",
    "name": "Path of Booming Magnificence",
    "source": "Tome of Heroes",
    "desc": "Cryomancer freezing enemies solid and coating themselves in glacial armor. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Roar of Defiance",
        "type": "passive",
        "icon": "❄️",
        "bonusAc": 1,
        "thornsDmg": 3,
        "desc": "Passive: +1 AC frost armor and attackers take 3 frostbite dmg on hit."
      },
      {
        "level": 5,
        "name": "Running Leap",
        "type": "active",
        "icon": "❄️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "frost",
        "chillTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Might frost dmg & deeply chills foe (-2 Atk, 3t)."
      },
      {
        "level": 10,
        "name": "Victorious Roar",
        "type": "active",
        "icon": "🧊",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgBonus": 2,
        "dmgStat": "might",
        "dmgType": "frost",
        "stunTurns": 1,
        "shieldTurns": 3,
        "desc": "Active (5 MP): Encases foe in ice — 2d8 + 2 + Might dmg, STUNS (1t), & +3 AC."
      }
    ]
  },
  {
    "id": "barbarian_path_of_hellfire",
    "classId": "barbarian",
    "name": "Path of Hellfire",
    "source": "Tome of Heroes",
    "desc": "Infernal berserker wreathed in devil-fire that scorches everyone who strikes them.",
    "abilities": [
      {
        "level": 1,
        "name": "Hellish Mantle",
        "type": "passive",
        "icon": "🔥",
        "thornsDmg": 4,
        "bonusHp": 3,
        "desc": "Passive: +3 Max HP and attackers suffer 4 hellfire burn dmg whenever they hit you."
      },
      {
        "level": 5,
        "name": "Brimstone Cleave",
        "type": "active",
        "icon": "🔥",
        "mp": 2,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "fire",
        "dot": {
          "dmg": 5,
          "turns": 3,
          "label": "Hellfire"
        },
        "desc": "Active (2 MP): Deals 2d6 + Might fire dmg & ignites foe with Hellfire (5/t, 3t)."
      },
      {
        "level": 10,
        "name": "Infernal Juggernaut",
        "type": "active",
        "icon": "😈",
        "mp": 4,
        "oncePerCombat": true,
        "dmgDice": "3d6",
        "dmgStat": "might",
        "dmgType": "fire",
        "selfBuffAtk": {
          "atk": 3,
          "turns": 4
        },
        "dot": {
          "dmg": 6,
          "turns": 3,
          "label": "Hellfire"
        },
        "desc": "Active (4 MP, 1/Combat): 3d6 + Might fire dmg, Hellfire (6/t, 3t), & +3 ATK (4t)."
      }
    ]
  },
  {
    "id": "barbarian_path_of_mistwood",
    "classId": "barbarian",
    "name": "Path of Mistwood",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Mistwood Defender",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "From the Mist",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Might dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "War Band's Passage",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Might dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "barbarian_path_of_the_dragon",
    "classId": "barbarian",
    "name": "Path of the Dragon",
    "source": "Tome of Heroes",
    "desc": "Blazing elemental specialist amplifying spells and scorching foes with burning fire. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Totem Dragon",
        "type": "passive",
        "icon": "🔥",
        "spellDmgBonus": 2,
        "bossDmgBonus": 2,
        "desc": "Passive: +2 bonus damage on all combat spells and +2 dmg vs Boss enemies."
      },
      {
        "level": 5,
        "name": "Wyrm Teeth",
        "type": "active",
        "icon": "🔥",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "fire",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Burning"
        },
        "desc": "Active (3 MP): Deals 2d6 + Might fire dmg & ignites foe (4 Burning dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Wyrm Lungs",
        "type": "active",
        "icon": "🐉",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "fire",
        "dot": {
          "dmg": 6,
          "turns": 3,
          "label": "Dragonfire"
        },
        "desc": "Active (5 MP): Deals 3d6 + 3 + Might fire dmg & Dragonfire burn (6/t, 3t)."
      }
    ]
  },
  {
    "id": "barbarian_path_of_the_herald",
    "classId": "barbarian",
    "name": "Path of the Herald",
    "source": "Tome of Heroes",
    "desc": "Tempest wielder stunning foes with thunderclaps and crackling storm retaliation. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Oral Tradition",
        "type": "passive",
        "icon": "⚡",
        "thornsDmg": 3,
        "spellDmgBonus": 1,
        "desc": "Passive: +1 spell dmg and attackers take 3 storm-arc retaliation dmg on hit."
      },
      {
        "level": 5,
        "name": "Battle Fervor",
        "type": "active",
        "icon": "⚡",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "lightning",
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Might lightning dmg and STUNS foe for 1 turn!"
      },
      {
        "level": 10,
        "name": "Thunderous Oratory",
        "type": "active",
        "icon": "🌩️",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 2,
        "dmgStat": "might",
        "dmgType": "lightning",
        "stunTurns": 1,
        "evadeTurns": 2,
        "desc": "Active (5 MP): Deals 3d6 + 2 + Might storm dmg, STUNS (1t), & +2 AC (2t)."
      }
    ]
  },
  {
    "id": "barbarian_path_of_the_inner_eye",
    "classId": "barbarian",
    "name": "Path of the Inner Eye",
    "source": "Tome of Heroes",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Anticipatory Stance",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "Insightful Dodge",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Preemptive Parry",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Might dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "barbarian_path_of_thorns",
    "classId": "barbarian",
    "name": "Path of Thorns",
    "source": "Tome of Heroes",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Blossoming Thorns",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "Thorned Grasp",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Thorn Barrage",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Might dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "bard_college_of_echoes",
    "classId": "bard",
    "name": "College of Echoes",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Spirit Stalker and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Echolocation",
        "type": "active",
        "icon": "🐆",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Spirit Stalker",
          "icon": "🐆",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Spirit Stalker (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Alter Sound",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "luck",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Luck dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Reverberating Strikes",
        "type": "active",
        "icon": "🐆",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "luck",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Spirit Stalker",
          "icon": "🐆",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Luck dmg & calls Elder Spirit Stalker (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "bard_college_of_investigation",
    "classId": "bard",
    "name": "College of Investigation",
    "source": "Tome of Heroes",
    "desc": "Inspiring mystic blending amplified restoration, tactical wards, and radiant bursts. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Quick Read",
        "type": "passive",
        "icon": "💚",
        "healBonus": 3,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and all healing spells & potions restore +3 extra HP."
      },
      {
        "level": 5,
        "name": "Bardic Instinct",
        "type": "active",
        "ooc": true,
        "icon": "✨",
        "mp": 4,
        "healDice": "2d6",
        "healStat": "spirit",
        "shieldTurns": 2,
        "desc": "Active (4 MP, anytime): Restore 2d6 + Spirit HP and raise a +3 AC ward (2t)."
      },
      {
        "level": 10,
        "name": "Hot Pursuit",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "luck",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Luck radiant dmg & restores 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "bard_college_of_shadows",
    "classId": "bard",
    "name": "College of Shadows",
    "source": "Tome of Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Mantle of Shadows",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Cunning Insight",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "luck",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Luck necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Shadowed Performance",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "luck",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "luck",
        "desc": "Active (5 MP): Deals 2d8 + Luck necrotic dmg & drains 2d6 + Luck HP."
      }
    ]
  },
  {
    "id": "bard_college_of_sincerity",
    "classId": "bard",
    "name": "College of Sincerity",
    "source": "Tome of Heroes",
    "desc": "Inspiring mystic blending amplified restoration, tactical wards, and radiant bursts. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Entourage",
        "type": "passive",
        "icon": "💚",
        "healBonus": 3,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and all healing spells & potions restore +3 extra HP."
      },
      {
        "level": 5,
        "name": "Kind-Eyed Smile",
        "type": "active",
        "ooc": true,
        "icon": "✨",
        "mp": 4,
        "healDice": "2d6",
        "healStat": "spirit",
        "shieldTurns": 2,
        "desc": "Active (4 MP, anytime): Restore 2d6 + Spirit HP and raise a +3 AC ward (2t)."
      },
      {
        "level": 10,
        "name": "Artist of Renown",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "luck",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Luck radiant dmg & restores 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "bard_college_of_tactics",
    "classId": "bard",
    "name": "College of Tactics",
    "source": "Tome of Heroes",
    "desc": "Inspiring mystic blending amplified restoration, tactical wards, and radiant bursts. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Combat Tactician",
        "type": "passive",
        "icon": "💚",
        "healBonus": 3,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and all healing spells & potions restore +3 extra HP."
      },
      {
        "level": 5,
        "name": "Setting the Board",
        "type": "active",
        "ooc": true,
        "icon": "✨",
        "mp": 4,
        "healDice": "2d6",
        "healStat": "spirit",
        "shieldTurns": 2,
        "desc": "Active (4 MP, anytime): Restore 2d6 + Spirit HP and raise a +3 AC ward (2t)."
      },
      {
        "level": 10,
        "name": "Ablative Inspiration",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "luck",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Luck radiant dmg & restores 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "bard_college_of_the_cat",
    "classId": "bard",
    "name": "College of the Cat",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Spirit Stalker and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Bonus Proficiencies",
        "type": "active",
        "icon": "🐆",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Spirit Stalker",
          "icon": "🐆",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Spirit Stalker (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Inspired Pounce",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "luck",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Luck dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "College of the Cat Mastery",
        "type": "active",
        "icon": "🐆",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "luck",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Spirit Stalker",
          "icon": "🐆",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Luck dmg & calls Elder Spirit Stalker (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "cleric_black_powder_domain",
    "classId": "cleric",
    "name": "Black Powder Domain",
    "source": "Tome of Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Gunpowder Blessing",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Imbue/Remove Explosivity",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Spirit force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Greater Explosive Infusion",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Spirit shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "cleric_mercy_domain",
    "classId": "cleric",
    "name": "Mercy Domain",
    "source": "Tome of Heroes",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Threshold Guardian",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Involuntary Aid",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Hand of Grace and Execution",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "spirit",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Spirit dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "cleric_portal_domain",
    "classId": "cleric",
    "name": "Portal Domain",
    "source": "Tome of Heroes",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Portal Magic",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Portal Bond",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "Portal Mastery",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Spirit dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "cleric_serpent_domain",
    "classId": "cleric",
    "name": "Serpent Domain",
    "source": "Tome of Heroes",
    "desc": "Venom and blight specialist inflicting stacking toxins and brewing remedies. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Envenomed",
        "type": "active",
        "ooc": true,
        "icon": "☠️",
        "mp": 8,
        "craftItem": "antidote",
        "thornsDmg": 2,
        "desc": "Passive: Attackers take 2 toxic splash dmg. Active (8 MP, anytime): Brew a free Antidote."
      },
      {
        "level": 5,
        "name": "Ophidian Tongue",
        "type": "active",
        "icon": "🧪",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "poison",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Poisoned"
        },
        "desc": "Active (3 MP): Deals 2d6 + Spirit poison dmg & Poisons foe (4 dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Transformative Molt",
        "type": "active",
        "icon": "☠️",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "poison",
        "dot": {
          "dmg": 7,
          "turns": 4,
          "label": "Plague Rot"
        },
        "chillTurns": 2,
        "desc": "Active (5 MP): Deals 2d8 + Spirit dmg, Plague Rot (7/t, 4t), & -2 Enemy Atk."
      }
    ]
  },
  {
    "id": "cleric_shadow_domain",
    "classId": "cleric",
    "name": "Shadow Domain",
    "source": "Tome of Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Cover of Night",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Lengthen Shadow",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Spirit necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Army of Shadow",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Spirit necrotic dmg & drains 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "cleric_vermin_domain",
    "classId": "cleric",
    "name": "Vermin Domain",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "The Unseen",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Swarm Step",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Spirit dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Verminform Blessing",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Spirit dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "cleric_wind_domain",
    "classId": "cleric",
    "name": "Wind Domain",
    "source": "Tome of Heroes",
    "desc": "Tempest wielder stunning foes with thunderclaps and crackling storm retaliation. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Wind's Chosen",
        "type": "passive",
        "icon": "⚡",
        "thornsDmg": 3,
        "spellDmgBonus": 1,
        "desc": "Passive: +1 spell dmg and attackers take 3 storm-arc retaliation dmg on hit."
      },
      {
        "level": 5,
        "name": "Channel Divinity: Grasp Not the Wind",
        "type": "active",
        "icon": "⚡",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Spirit lightning dmg and STUNS foe for 1 turn!"
      },
      {
        "level": 10,
        "name": "Wind Domain Mastery",
        "type": "active",
        "icon": "🌩️",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 2,
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "evadeTurns": 2,
        "desc": "Active (5 MP): Deals 3d6 + 2 + Spirit storm dmg, STUNS (1t), & +2 AC (2t)."
      }
    ]
  },
  {
    "id": "druid_circle_of_ash",
    "classId": "druid",
    "name": "Circle of Ash",
    "source": "Tome of Heroes",
    "desc": "Blazing elemental specialist amplifying spells and scorching foes with burning fire. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Ash Cloud",
        "type": "passive",
        "icon": "🔥",
        "spellDmgBonus": 2,
        "bossDmgBonus": 2,
        "desc": "Passive: +2 bonus damage on all combat spells and +2 dmg vs Boss enemies."
      },
      {
        "level": 5,
        "name": "Firesight",
        "type": "active",
        "icon": "🔥",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "fire",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Burning"
        },
        "desc": "Active (3 MP): Deals 2d6 + Spirit fire dmg & ignites foe (4 Burning dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "From the Ashes",
        "type": "active",
        "icon": "🐉",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 3,
        "dmgStat": "spirit",
        "dmgType": "fire",
        "dot": {
          "dmg": 6,
          "turns": 3,
          "label": "Dragonfire"
        },
        "desc": "Active (5 MP): Deals 3d6 + 3 + Spirit fire dmg & Dragonfire burn (6/t, 3t)."
      }
    ]
  },
  {
    "id": "druid_circle_of_bees",
    "classId": "druid",
    "name": "Circle of Bees",
    "source": "Tome of Heroes",
    "desc": "Inspiring mystic blending amplified restoration, tactical wards, and radiant bursts. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Bee Bond",
        "type": "passive",
        "icon": "💚",
        "healBonus": 3,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and all healing spells & potions restore +3 extra HP."
      },
      {
        "level": 5,
        "name": "Bee Stinger",
        "type": "active",
        "ooc": true,
        "icon": "✨",
        "mp": 4,
        "healDice": "2d6",
        "healStat": "spirit",
        "shieldTurns": 2,
        "desc": "Active (4 MP, anytime): Restore 2d6 + Spirit HP and raise a +3 AC ward (2t)."
      },
      {
        "level": 10,
        "name": "Mantle of Bees",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Spirit radiant dmg & restores 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "druid_circle_of_crystals",
    "classId": "druid",
    "name": "Circle of Crystals",
    "source": "Tome of Heroes",
    "desc": "Inspiring mystic blending amplified restoration, tactical wards, and radiant bursts. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Resonant Crystal",
        "type": "passive",
        "icon": "💚",
        "healBonus": 3,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and all healing spells & potions restore +3 extra HP."
      },
      {
        "level": 5,
        "name": "Crystalline Skin",
        "type": "active",
        "ooc": true,
        "icon": "✨",
        "mp": 4,
        "healDice": "2d6",
        "healStat": "spirit",
        "shieldTurns": 2,
        "desc": "Active (4 MP, anytime): Restore 2d6 + Spirit HP and raise a +3 AC ward (2t)."
      },
      {
        "level": 10,
        "name": "Crystalline Form",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "desc": "Active (5 MP): Deals 2d8 + Spirit radiant dmg & restores 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "druid_circle_of_sand",
    "classId": "druid",
    "name": "Circle of Sand",
    "source": "Tome of Heroes",
    "desc": "Tempest wielder stunning foes with thunderclaps and crackling storm retaliation. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Sand Form",
        "type": "passive",
        "icon": "⚡",
        "thornsDmg": 3,
        "spellDmgBonus": 1,
        "desc": "Passive: +1 spell dmg and attackers take 3 storm-arc retaliation dmg on hit."
      },
      {
        "level": 5,
        "name": "Diffuse Form",
        "type": "active",
        "icon": "⚡",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Spirit lightning dmg and STUNS foe for 1 turn!"
      },
      {
        "level": 10,
        "name": "Sandstorm",
        "type": "active",
        "icon": "🌩️",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 2,
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "evadeTurns": 2,
        "desc": "Active (5 MP): Deals 3d6 + 2 + Spirit storm dmg, STUNS (1t), & +2 AC (2t)."
      }
    ]
  },
  {
    "id": "druid_circle_of_the_green",
    "classId": "druid",
    "name": "Circle of the Green",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Circle Spells",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Summon Green Spirit",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Spirit dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Circle of the Green Mastery",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Spirit dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "druid_green_spirit",
    "classId": "druid",
    "name": "Green Spirit",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Gift of the Green",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Verdant Interference",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Spirit dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Spirit Symbiosis",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Spirit dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "druid_circle_of_the_shapeless",
    "classId": "druid",
    "name": "Circle of the Shapeless",
    "source": "Tome of Heroes",
    "desc": "Venom and blight specialist inflicting stacking toxins and brewing remedies. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Ooze Form",
        "type": "active",
        "ooc": true,
        "icon": "☠️",
        "mp": 8,
        "craftItem": "antidote",
        "thornsDmg": 2,
        "desc": "Passive: Attackers take 2 toxic splash dmg. Active (8 MP, anytime): Brew a free Antidote."
      },
      {
        "level": 5,
        "name": "Slimy Pseudopod",
        "type": "active",
        "icon": "🧪",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "poison",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Poisoned"
        },
        "desc": "Active (3 MP): Deals 2d6 + Spirit poison dmg & Poisons foe (4 dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Engulfing Embrace",
        "type": "active",
        "icon": "☠️",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "spirit",
        "dmgType": "poison",
        "dot": {
          "dmg": 7,
          "turns": 4,
          "label": "Plague Rot"
        },
        "chillTurns": 2,
        "desc": "Active (5 MP): Deals 2d8 + Spirit dmg, Plague Rot (7/t, 4t), & -2 Enemy Atk."
      }
    ]
  },
  {
    "id": "druid_circle_of_wind",
    "classId": "druid",
    "name": "Circle of Wind",
    "source": "Tome of Heroes",
    "desc": "Tempest wielder stunning foes with thunderclaps and crackling storm retaliation. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Bonus Cantrip",
        "type": "passive",
        "icon": "⚡",
        "thornsDmg": 3,
        "spellDmgBonus": 1,
        "desc": "Passive: +1 spell dmg and attackers take 3 storm-arc retaliation dmg on hit."
      },
      {
        "level": 5,
        "name": "Circle Spells",
        "type": "active",
        "icon": "⚡",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Spirit lightning dmg and STUNS foe for 1 turn!"
      },
      {
        "level": 10,
        "name": "Circle of Wind Mastery",
        "type": "active",
        "icon": "🌩️",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 2,
        "dmgStat": "spirit",
        "dmgType": "lightning",
        "stunTurns": 1,
        "evadeTurns": 2,
        "desc": "Active (5 MP): Deals 3d6 + 2 + Spirit storm dmg, STUNS (1t), & +2 AC (2t)."
      }
    ]
  },
  {
    "id": "warrior_fighting_style_options",
    "classId": "warrior",
    "name": "Fighting Style Options",
    "source": "Tome of Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Gunfighting",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Fighting Style Options Strike",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Might force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Fighting Style Options Mastery",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "might",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Might shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "warrior_buccaneer",
    "classId": "warrior",
    "name": "Buccaneer",
    "source": "Tome of Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Black Powder and Sailcloth",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Bullet and Blade",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Might force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Vicious Marauder",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "might",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Might shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "warrior_chaplain",
    "classId": "warrior",
    "name": "Chaplain",
    "source": "Tome of Heroes",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Student of Faith",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "Field Medic",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Hospitaler",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Might dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "warrior_legionary",
    "classId": "warrior",
    "name": "Legionary",
    "source": "Tome of Heroes",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Coordinated Fighting",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Move As One",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Cooperative Strike",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "warrior_pugilist",
    "classId": "warrior",
    "name": "Pugilist",
    "source": "Tome of Heroes",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Unarmed Warrior",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "Resilient Fighter",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Opportunistic Brawler",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Might dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "warrior_radiant_pikeman",
    "classId": "warrior",
    "name": "Radiant Pikeman",
    "source": "Tome of Heroes",
    "desc": "Radiant champion amplifying healing, smiting undead, and blinding foes in light. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Harassing Strike",
        "type": "passive",
        "icon": "☀️",
        "undeadDmgBonus": 4,
        "healBonus": 3,
        "desc": "Passive: +4 bonus dmg vs Undead and +3 extra HP from all heals & potions."
      },
      {
        "level": 5,
        "name": "Radiant Fighting",
        "type": "active",
        "icon": "☀️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "radiant",
        "undeadDouble": true,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Might radiant dmg (2x Undead) & blinds (-2 Atk, 2t)."
      },
      {
        "level": 10,
        "name": "The Sun's Protection",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "might",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "undeadDouble": true,
        "desc": "Active (5 MP): Deals 2d8 + Might radiant dmg (2x Undead) & heals 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "warrior_timeblade",
    "classId": "warrior",
    "name": "Timeblade",
    "source": "Tome of Heroes",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Temporal Strike",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Chronologic Echo",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Might psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "Temporal Warrior",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "might",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Might dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "monk_tunnel_watcher",
    "classId": "monk",
    "name": "Tunnel Watcher",
    "source": "Tome of Heroes",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "First Line of Defense",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Fight for Every Step",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Against the Tide",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "monk_way_of_concordant_motion",
    "classId": "monk",
    "name": "Way of Concordant Motion",
    "source": "Tome of Heroes",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Cooperative Ki",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Deflect Strike",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Concordant Mind",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "monk_way_of_the_dragon",
    "classId": "monk",
    "name": "Way of the Dragon",
    "source": "Tome of Heroes",
    "desc": "Blazing elemental specialist amplifying spells and scorching foes with burning fire. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Draconic Affiliation",
        "type": "passive",
        "icon": "🔥",
        "spellDmgBonus": 2,
        "bossDmgBonus": 2,
        "desc": "Passive: +2 bonus damage on all combat spells and +2 dmg vs Boss enemies."
      },
      {
        "level": 5,
        "name": "Draconic Onslaught",
        "type": "active",
        "icon": "🔥",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "fire",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Burning"
        },
        "desc": "Active (3 MP): Deals 2d6 + Agility fire dmg & ignites foe (4 Burning dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Scales of the Wyrm",
        "type": "active",
        "icon": "🐉",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 3,
        "dmgStat": "agility",
        "dmgType": "fire",
        "dot": {
          "dmg": 6,
          "turns": 3,
          "label": "Dragonfire"
        },
        "desc": "Active (5 MP): Deals 3d6 + 3 + Agility fire dmg & Dragonfire burn (6/t, 3t)."
      }
    ]
  },
  {
    "id": "monk_way_of_the_humble_elephant",
    "classId": "monk",
    "name": "Way of the Humble Elephant",
    "source": "Tome of Heroes",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Slow to Anger",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Unyielding Step",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Thick Hide",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "monk_way_of_the_still_waters",
    "classId": "monk",
    "name": "Way of the Still Waters",
    "source": "Tome of Heroes",
    "desc": "Tempest wielder stunning foes with thunderclaps and crackling storm retaliation. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Perfect Calm",
        "type": "passive",
        "icon": "⚡",
        "thornsDmg": 3,
        "spellDmgBonus": 1,
        "desc": "Passive: +1 spell dmg and attackers take 3 storm-arc retaliation dmg on hit."
      },
      {
        "level": 5,
        "name": "Turbulent Waters",
        "type": "active",
        "icon": "⚡",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "lightning",
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Agility lightning dmg and STUNS foe for 1 turn!"
      },
      {
        "level": 10,
        "name": "Tempestuous Waters",
        "type": "active",
        "icon": "🌩️",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 2,
        "dmgStat": "agility",
        "dmgType": "lightning",
        "stunTurns": 1,
        "evadeTurns": 2,
        "desc": "Active (5 MP): Deals 3d6 + 2 + Agility storm dmg, STUNS (1t), & +2 AC (2t)."
      }
    ]
  },
  {
    "id": "monk_way_of_the_tipsy_monkey",
    "classId": "monk",
    "name": "Way of the Tipsy Monkey",
    "source": "Tome of Heroes",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Adaptive Fighting",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Sway and Strike",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Stumbling Stance",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "monk_way_of_the_unerring_arrow",
    "classId": "monk",
    "name": "Way of the Unerring Arrow",
    "source": "Tome of Heroes",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Archery Training",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Flurry of Deflection",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Improbable Shot",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "monk_way_of_the_wildcat",
    "classId": "monk",
    "name": "Way of the Wildcat",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Spirit Stalker and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Enhanced Agility",
        "type": "active",
        "icon": "🐆",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Spirit Stalker",
          "icon": "🐆",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Spirit Stalker (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Feline Reflexes",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Agility dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Hundred Step Strike",
        "type": "active",
        "icon": "🐆",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Spirit Stalker",
          "icon": "🐆",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Agility dmg & calls Elder Spirit Stalker (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "paladin_fighting_style_options",
    "classId": "paladin",
    "name": "Fighting Style Options",
    "source": "Tome of Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Gunfighting",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Fighting Style Options Strike",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Might force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Fighting Style Options Mastery",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "might",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Might shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "paladin_oath_of_justice",
    "classId": "paladin",
    "name": "Oath of Justice",
    "source": "Tome of Heroes",
    "desc": "Cryomancer freezing enemies solid and coating themselves in glacial armor. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Tenets of Justice",
        "type": "passive",
        "icon": "❄️",
        "bonusAc": 1,
        "thornsDmg": 3,
        "desc": "Passive: +1 AC frost armor and attackers take 3 frostbite dmg on hit."
      },
      {
        "level": 5,
        "name": "Disciplined Pursuant",
        "type": "active",
        "icon": "❄️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "frost",
        "chillTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Might frost dmg & deeply chills foe (-2 Atk, 3t)."
      },
      {
        "level": 10,
        "name": "Avatar of Perfect Order",
        "type": "active",
        "icon": "🧊",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgBonus": 2,
        "dmgStat": "might",
        "dmgType": "frost",
        "stunTurns": 1,
        "shieldTurns": 3,
        "desc": "Active (5 MP): Encases foe in ice — 2d8 + 2 + Might dmg, STUNS (1t), & +3 AC."
      }
    ]
  },
  {
    "id": "paladin_oath_of_safeguarding",
    "classId": "paladin",
    "name": "Oath of Safeguarding",
    "source": "Tome of Heroes",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Tenets of Safeguarding",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "Aura of Preservation",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Redoubtable Defender",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Might dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "paladin_oath_of_the_elements",
    "classId": "paladin",
    "name": "Oath of the Elements",
    "source": "Tome of Heroes",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Tenets of the Elements",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "Elemental Language",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Elemental Champion",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Might dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "paladin_oath_of_the_guardian",
    "classId": "paladin",
    "name": "Oath of the Guardian",
    "source": "Tome of Heroes",
    "desc": "Frontline powerhouse combining hardened armor, battle fury, and crushing strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Tenets of the Guardian",
        "type": "passive",
        "icon": "🛡️",
        "bonusAc": 1,
        "bonusHp": 3,
        "thornsDmg": 2,
        "desc": "Passive: +1 AC, +3 Max HP, and attackers take 2 counter-strike dmg on hit."
      },
      {
        "level": 5,
        "name": "Aura of Awareness",
        "type": "active",
        "icon": "⚔️",
        "mp": 2,
        "oncePerCombat": true,
        "multiStrike": 2,
        "selfBuffAtk": {
          "atk": 2,
          "turns": 3
        },
        "desc": "Active (2 MP, 1/Combat): Strike twice immediately & gain +2 Attack for 3 turns."
      },
      {
        "level": 10,
        "name": "Band of Heroes",
        "type": "active",
        "icon": "🏆",
        "mp": 4,
        "dmgDice": "2d8",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "force",
        "shieldTurns": 4,
        "desc": "Active (4 MP): Crushing blow dealing 2d8 + 3 + Might dmg & +3 AC (4t)."
      }
    ]
  },
  {
    "id": "paladin_oath_of_the_hearth",
    "classId": "paladin",
    "name": "Oath of the Hearth",
    "source": "Tome of Heroes",
    "desc": "Blazing elemental specialist amplifying spells and scorching foes with burning fire. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Tenets of the Hearth",
        "type": "passive",
        "icon": "🔥",
        "spellDmgBonus": 2,
        "bossDmgBonus": 2,
        "desc": "Passive: +2 bonus damage on all combat spells and +2 dmg vs Boss enemies."
      },
      {
        "level": 5,
        "name": "Divine Sense",
        "type": "active",
        "icon": "🔥",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "fire",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Burning"
        },
        "desc": "Active (3 MP): Deals 2d6 + Might fire dmg & ignites foe (4 Burning dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Roaring Fire",
        "type": "active",
        "icon": "🐉",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 3,
        "dmgStat": "might",
        "dmgType": "fire",
        "dot": {
          "dmg": 6,
          "turns": 3,
          "label": "Dragonfire"
        },
        "desc": "Active (5 MP): Deals 3d6 + 3 + Might fire dmg & Dragonfire burn (6/t, 3t)."
      }
    ]
  },
  {
    "id": "paladin_oath_of_the_plaguetouched",
    "classId": "paladin",
    "name": "Oath of the Plaguetouched",
    "source": "Tome of Heroes",
    "desc": "Venom and blight specialist inflicting stacking toxins and brewing remedies. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Restriction: Non-Darakhul",
        "type": "active",
        "ooc": true,
        "icon": "☠️",
        "mp": 8,
        "craftItem": "antidote",
        "thornsDmg": 2,
        "desc": "Passive: Attackers take 2 toxic splash dmg. Active (8 MP, anytime): Brew a free Antidote."
      },
      {
        "level": 5,
        "name": "Tenets of the Plaguetouched",
        "type": "active",
        "icon": "🧪",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "might",
        "dmgType": "poison",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Poisoned"
        },
        "desc": "Active (3 MP): Deals 2d6 + Might poison dmg & Poisons foe (4 dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Oath of the Plaguetouched Mastery",
        "type": "active",
        "icon": "☠️",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "might",
        "dmgType": "poison",
        "dot": {
          "dmg": 7,
          "turns": 4,
          "label": "Plague Rot"
        },
        "chillTurns": 2,
        "desc": "Active (5 MP): Deals 2d8 + Might dmg, Plague Rot (7/t, 4t), & -2 Enemy Atk."
      }
    ]
  },
  {
    "id": "ranger_fighting_style_options",
    "classId": "ranger",
    "name": "Fighting Style Options",
    "source": "Tome of Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Gunfighting",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Fighting Style Options Strike",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Agility force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Fighting Style Options Mastery",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "agility",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Agility shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "ranger_beast_trainer",
    "classId": "ranger",
    "name": "Beast Trainer",
    "source": "Tome of Heroes",
    "desc": "Tempest wielder stunning foes with thunderclaps and crackling storm retaliation. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Beast Whisperer",
        "type": "passive",
        "icon": "⚡",
        "thornsDmg": 3,
        "spellDmgBonus": 1,
        "desc": "Passive: +1 spell dmg and attackers take 3 storm-arc retaliation dmg on hit."
      },
      {
        "level": 5,
        "name": "Trained Animals",
        "type": "active",
        "icon": "⚡",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "lightning",
        "stunTurns": 1,
        "desc": "Active (3 MP): Deals 2d6 + Agility lightning dmg and STUNS foe for 1 turn!"
      },
      {
        "level": 10,
        "name": "Primal Whirlwind",
        "type": "active",
        "icon": "🌩️",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 2,
        "dmgStat": "agility",
        "dmgType": "lightning",
        "stunTurns": 1,
        "evadeTurns": 2,
        "desc": "Active (5 MP): Deals 3d6 + 2 + Agility storm dmg, STUNS (1t), & +2 AC (2t)."
      }
    ]
  },
  {
    "id": "ranger_gunslinger",
    "classId": "ranger",
    "name": "Gunslinger",
    "source": "Tome of Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Gunslinger Magic",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Trick Shot",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Agility force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Deadeye",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "agility",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Agility shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "ranger_haunted_warden",
    "classId": "ranger",
    "name": "Haunted Warden",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Beyond the Pale",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Haunted Warden Magic",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Agility dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Spirit Usher",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Agility dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "ranger_spirit_usher",
    "classId": "ranger",
    "name": "Spirit Usher",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Merge Spirit",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Guardian Geist",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Agility dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "True Psychopomp",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Agility dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "ranger_snake_speaker",
    "classId": "ranger",
    "name": "Snake Speaker",
    "source": "Tome of Heroes",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Snake Speaker Magic",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Scaly Transition",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Decoy Skin",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "ranger_wasteland_strider",
    "classId": "ranger",
    "name": "Wasteland Strider",
    "source": "Tome of Heroes",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Chaotic Strikes",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Wasteland Strider Strike",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Wasteland Strider Mastery",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "rogue_cat_burglar",
    "classId": "rogue",
    "name": "Cat Burglar",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Spirit Stalker and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Up, Over, and In",
        "type": "active",
        "icon": "🐆",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Spirit Stalker",
          "icon": "🐆",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Spirit Stalker (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Artful Dodger",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Agility dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Master Burglar",
        "type": "active",
        "icon": "🐆",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Spirit Stalker",
          "icon": "🐆",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Agility dmg & calls Elder Spirit Stalker (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "rogue_dawn_blade",
    "classId": "rogue",
    "name": "Dawn Blade",
    "source": "Tome of Heroes",
    "desc": "Radiant champion amplifying healing, smiting undead, and blinding foes in light. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Eyes of the Dawn",
        "type": "passive",
        "icon": "☀️",
        "undeadDmgBonus": 4,
        "healBonus": 3,
        "desc": "Passive: +4 bonus dmg vs Undead and +3 extra HP from all heals & potions."
      },
      {
        "level": 5,
        "name": "Dawn Strike",
        "type": "active",
        "icon": "☀️",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "radiant",
        "undeadDouble": true,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Agility radiant dmg (2x Undead) & blinds (-2 Atk, 2t)."
      },
      {
        "level": 10,
        "name": "Dawn Flare",
        "type": "active",
        "icon": "🌟",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "agility",
        "dmgType": "radiant",
        "healDice": "2d6",
        "healStat": "spirit",
        "undeadDouble": true,
        "desc": "Active (5 MP): Deals 2d8 + Agility radiant dmg (2x Undead) & heals 2d6 + Spirit HP."
      }
    ]
  },
  {
    "id": "rogue_sapper",
    "classId": "rogue",
    "name": "Sapper",
    "source": "Tome of Heroes",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Combat Engineer",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Sculpt Terrain",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "All Clear",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "rogue_smuggler",
    "classId": "rogue",
    "name": "Smuggler",
    "source": "Tome of Heroes",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Dab-handed Dealer",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Smuggler's Legerdemain",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Slippery as an Eel",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "rogue_soulspy",
    "classId": "rogue",
    "name": "Soulspy",
    "source": "Tome of Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Spellcasting",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Cantrips",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Agility necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Life Thief",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "agility",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "agility",
        "desc": "Active (5 MP): Deals 2d8 + Agility necrotic dmg & drains 2d6 + Agility HP."
      }
    ]
  },
  {
    "id": "rogue_underfoot",
    "classId": "rogue",
    "name": "Underfoot",
    "source": "Tome of Heroes",
    "desc": "Master of fate and tempo who bends Luck, slips past blows, and disrupts enemy turns. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Restriction: Erina",
        "type": "active",
        "ooc": true,
        "icon": "🔮",
        "mp": 4,
        "restoreLuck": 1,
        "statBonuses": {
          "luck": 1
        },
        "desc": "Passive: +1 Max Luck. Active (4 MP, anytime): Bend fate to restore +1 Current Luck."
      },
      {
        "level": 5,
        "name": "Spellcasting",
        "type": "active",
        "icon": "⏳",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "agility",
        "dmgType": "psychic",
        "evadeTurns": 3,
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Agility psychic dmg, -2 Enemy Atk (2t), & +2 AC (3t)."
      },
      {
        "level": 10,
        "name": "Undermine",
        "type": "active",
        "icon": "🌀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "agility",
        "dmgType": "psychic",
        "stunTurns": 1,
        "restoreLuck": 2,
        "desc": "Active (5 MP): Fractures tempo — 2d8 + Agility dmg, STUNS (1t), & +2 Luck."
      }
    ]
  },
  {
    "id": "sorcerer_metamagic_options",
    "classId": "sorcerer",
    "name": "Metamagic Options",
    "source": "Tome of Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Autonomous Spell",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Bewildering Spell",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Shared Hunger Spell",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "sorcerer_black_powder_sorcery",
    "classId": "sorcerer",
    "name": "Black Powder Sorcery",
    "source": "Tome of Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Gun Mage",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Gun Hand",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Arcana force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Ensuing Shot",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Arcana shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "sorcerer_cold_blooded",
    "classId": "sorcerer",
    "name": "Cold-Blooded",
    "source": "Tome of Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Ophidian Metabolism",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Patterned Scales",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Mirrored Lamina",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "sorcerer_hungering",
    "classId": "sorcerer",
    "name": "Hungering",
    "source": "Tome of Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Hungry Eyes",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Thirsty Soul",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Greedy Heart",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "sorcerer_resonant_body",
    "classId": "sorcerer",
    "name": "Resonant Body",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Reverberating Quintessence",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Signature Sound",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Arcana dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Resounding Spellcasting",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Arcana dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "sorcerer_rifthopper",
    "classId": "sorcerer",
    "name": "Rifthopper",
    "source": "Tome of Heroes",
    "desc": "Arcane master cutting spell MP costs, amplifying spellcraft, and siphoning mana. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Teleport Object",
        "type": "passive",
        "icon": "✨",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: All spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Shift Space",
        "type": "active",
        "icon": "🔷",
        "mp": 0,
        "oncePerCombat": true,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "restoreMp": 5,
        "desc": "Active (1/Combat, 0 MP): Deals 2d6 + Arcana arcane dmg & channels +5 MP."
      },
      {
        "level": 10,
        "name": "Dimensional Ambler",
        "type": "active",
        "icon": "🌌",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "chillTurns": 2,
        "desc": "Active (5 MP): Unleashes 3d8 + Arcana arcane dmg & weakens foe (-2 Atk, 2t)."
      }
    ]
  },
  {
    "id": "sorcerer_spore_sorcery",
    "classId": "sorcerer",
    "name": "Spore Sorcery",
    "source": "Tome of Heroes",
    "desc": "Venom and blight specialist inflicting stacking toxins and brewing remedies. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Nature Magic",
        "type": "active",
        "ooc": true,
        "icon": "☠️",
        "mp": 8,
        "craftItem": "antidote",
        "thornsDmg": 2,
        "desc": "Passive: Attackers take 2 toxic splash dmg. Active (8 MP, anytime): Brew a free Antidote."
      },
      {
        "level": 5,
        "name": "Spore Transmission",
        "type": "active",
        "icon": "🧪",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "poison",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Poisoned"
        },
        "desc": "Active (3 MP): Deals 2d6 + Arcana poison dmg & Poisons foe (4 dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Spore Form",
        "type": "active",
        "icon": "☠️",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "poison",
        "dot": {
          "dmg": 7,
          "turns": 4,
          "label": "Plague Rot"
        },
        "chillTurns": 2,
        "desc": "Active (5 MP): Deals 2d8 + Arcana dmg, Plague Rot (7/t, 4t), & -2 Enemy Atk."
      }
    ]
  },
  {
    "id": "sorcerer_wastelander",
    "classId": "sorcerer",
    "name": "Wastelander",
    "source": "Tome of Heroes",
    "desc": "Precision skirmisher chaining expanded critical hits and rapid multi-strikes. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Alien Alteration",
        "type": "passive",
        "icon": "⚔️",
        "critRange": 11,
        "bonusAtk": 1,
        "desc": "Passive: +1 Attack and melee strikes score Critical Hits on 11+ (2d6)."
      },
      {
        "level": 5,
        "name": "Wastelander Strike",
        "type": "active",
        "icon": "💨",
        "mp": 2,
        "multiStrike": 2,
        "evadeTurns": 2,
        "desc": "Active (2 MP): Unleash 2 rapid weapon strikes & gain +2 AC evasion for 2 turns."
      },
      {
        "level": 10,
        "name": "Wastelander Mastery",
        "type": "active",
        "icon": "⚡",
        "mp": 4,
        "oncePerCombat": true,
        "guaranteedCrit": true,
        "stunTurns": 1,
        "desc": "Active (4 MP, 1/Combat): Guaranteed Critical strike that STUNS the enemy for 1 turn!"
      }
    ]
  },
  {
    "id": "warlock_ancient_dragons",
    "classId": "warlock",
    "name": "Ancient Dragons",
    "source": "Tome of Heroes",
    "desc": "Blazing elemental specialist amplifying spells and scorching foes with burning fire. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Dragon Tongue",
        "type": "passive",
        "icon": "🔥",
        "spellDmgBonus": 2,
        "bossDmgBonus": 2,
        "desc": "Passive: +2 bonus damage on all combat spells and +2 dmg vs Boss enemies."
      },
      {
        "level": 5,
        "name": "Wyrmling Blessing",
        "type": "active",
        "icon": "🔥",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "fire",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Burning"
        },
        "desc": "Active (3 MP): Deals 2d6 + Arcana fire dmg & ignites foe (4 Burning dmg/t, 3t)."
      },
      {
        "level": 10,
        "name": "Draconic Manifestation",
        "type": "active",
        "icon": "🐉",
        "mp": 5,
        "dmgDice": "3d6",
        "dmgBonus": 3,
        "dmgStat": "arcana",
        "dmgType": "fire",
        "dot": {
          "dmg": 6,
          "turns": 3,
          "label": "Dragonfire"
        },
        "desc": "Active (5 MP): Deals 3d6 + 3 + Arcana fire dmg & Dragonfire burn (6/t, 3t)."
      }
    ]
  },
  {
    "id": "warlock_animal_lords",
    "classId": "warlock",
    "name": "Animal Lords",
    "source": "Tome of Heroes",
    "desc": "Arcane master cutting spell MP costs, amplifying spellcraft, and siphoning mana. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Natural Blessing",
        "type": "passive",
        "icon": "✨",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: All spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Animalistic Insight",
        "type": "active",
        "icon": "🔷",
        "mp": 0,
        "oncePerCombat": true,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "restoreMp": 5,
        "desc": "Active (1/Combat, 0 MP): Deals 2d6 + Arcana arcane dmg & channels +5 MP."
      },
      {
        "level": 10,
        "name": "Call the Legions",
        "type": "active",
        "icon": "🌌",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "chillTurns": 2,
        "desc": "Active (5 MP): Unleashes 3d8 + Arcana arcane dmg & weakens foe (-2 Atk, 2t)."
      }
    ]
  },
  {
    "id": "warlock_hunter_in_darkness",
    "classId": "warlock",
    "name": "Hunter in Darkness",
    "source": "Tome of Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Savage Hunter",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "The Hunter in Darkness and Your Pact Boons",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Avatar of Death",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "warlock_old_wood",
    "classId": "warlock",
    "name": "Old Wood",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Sap Magic",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Forest's Defender",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Arcana dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Avatar of the Wood",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Arcana dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "warlock_primordial",
    "classId": "warlock",
    "name": "Primordial",
    "source": "Tome of Heroes",
    "desc": "Arcane master cutting spell MP costs, amplifying spellcraft, and siphoning mana. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Convulsion of the Worldbuilder",
        "type": "passive",
        "icon": "✨",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: All spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Redirection",
        "type": "active",
        "icon": "🔷",
        "mp": 0,
        "oncePerCombat": true,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "restoreMp": 5,
        "desc": "Active (1/Combat, 0 MP): Deals 2d6 + Arcana arcane dmg & channels +5 MP."
      },
      {
        "level": 10,
        "name": "Crushing Regard of the Primordial One",
        "type": "active",
        "icon": "🌌",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "chillTurns": 2,
        "desc": "Active (5 MP): Unleashes 3d8 + Arcana arcane dmg & weakens foe (-2 Atk, 2t)."
      }
    ]
  },
  {
    "id": "warlock_wyrdweaver",
    "classId": "warlock",
    "name": "Wyrdweaver",
    "source": "Tome of Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Probability Wellspring",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Appropriate Advantage",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Favored Soul",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "arcanist_cantrip_adept",
    "classId": "arcanist",
    "name": "Cantrip Adept",
    "source": "Tome of Heroes",
    "desc": "Arcane master cutting spell MP costs, amplifying spellcraft, and siphoning mana. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Cantrip Polymath",
        "type": "passive",
        "icon": "✨",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: All spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Arcane Alacrity",
        "type": "active",
        "icon": "🔷",
        "mp": 0,
        "oncePerCombat": true,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "restoreMp": 5,
        "desc": "Active (1/Combat, 0 MP): Deals 2d6 + Arcana arcane dmg & channels +5 MP."
      },
      {
        "level": 10,
        "name": "Empowered Cantrips",
        "type": "active",
        "icon": "🌌",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "chillTurns": 2,
        "desc": "Active (5 MP): Unleashes 3d8 + Arcana arcane dmg & weakens foe (-2 Atk, 2t)."
      }
    ]
  },
  {
    "id": "arcanist_familiar_master",
    "classId": "arcanist",
    "name": "Familiar Master",
    "source": "Tome of Heroes",
    "desc": "Bond-weaver fighting alongside a summoned Grove Guardian and nature's resilience. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Familiar Savant",
        "type": "active",
        "icon": "🌿",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Grove Guardian",
          "icon": "🌿",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Summon Grove Guardian (4 dmg/turn for 4 turns)."
      },
      {
        "level": 5,
        "name": "Greater Familiar",
        "type": "active",
        "icon": "🌿",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "nature",
        "healDice": "1d6",
        "healStat": "spirit",
        "desc": "Active (3 MP): Deals 2d6 + Arcana dmg & mends 1d6 + Spirit HP."
      },
      {
        "level": 10,
        "name": "Companion Concentration",
        "type": "active",
        "icon": "🌿",
        "mp": 5,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "nature",
        "summon": {
          "name": "Elder Grove Guardian",
          "icon": "🌿",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d6 + Arcana dmg & calls Elder Grove Guardian (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "arcanist_gravebinding",
    "classId": "arcanist",
    "name": "Gravebinding",
    "source": "Tome of Heroes",
    "desc": "Dark conduit draining enemy vitality with lifesteal and lingering necrotic rot. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Restriction: The Dead Must Rest",
        "type": "passive",
        "icon": "🩸",
        "lifesteal": 2,
        "bonusMp": 2,
        "desc": "Passive: +2 Max MP and every melee strike drains +2 HP from your target."
      },
      {
        "level": 5,
        "name": "Gravebinder Lore",
        "type": "active",
        "icon": "🌑",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "dot": {
          "dmg": 4,
          "turns": 3,
          "label": "Withered"
        },
        "chillTurns": 2,
        "desc": "Active (3 MP): Deals 2d6 + Arcana necrotic dmg, Withers foe (4/t, 3t), & -2 Atk."
      },
      {
        "level": 10,
        "name": "Radiant Nimbus",
        "type": "active",
        "icon": "💀",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "necrotic",
        "healDice": "2d6",
        "healStat": "arcana",
        "desc": "Active (5 MP): Deals 2d8 + Arcana necrotic dmg & drains 2d6 + Arcana HP."
      }
    ]
  },
  {
    "id": "arcanist_school_of_black_powder",
    "classId": "arcanist",
    "name": "School of Black Powder",
    "source": "Tome of Heroes",
    "desc": "Mechanical innovator deploying clockwork allies, bombs, and armored steel. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Gun Savant",
        "type": "active",
        "icon": "⚙️",
        "mp": 0,
        "oncePerCombat": true,
        "summon": {
          "name": "Clockwork Servitor",
          "icon": "⚙️",
          "dmg": 4,
          "turns": 4
        },
        "desc": "Active (1/Combat, 0 MP): Deploy a Clockwork Servitor (4 dmg/t for 4 turns)."
      },
      {
        "level": 5,
        "name": "Arcane Arms",
        "type": "active",
        "icon": "🔧",
        "mp": 3,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "force",
        "shieldTurns": 3,
        "desc": "Active (3 MP): Deals 2d6 + Arcana force dmg & deploys +3 AC plating (3t)."
      },
      {
        "level": 10,
        "name": "Hand Cannon",
        "type": "active",
        "icon": "🤖",
        "mp": 5,
        "dmgDice": "2d8",
        "dmgStat": "arcana",
        "dmgType": "lightning",
        "summon": {
          "name": "Arc-Gear Colossus",
          "icon": "🤖",
          "dmg": 7,
          "turns": 5
        },
        "desc": "Active (5 MP): Deals 2d8 + Arcana shock dmg & deploys Arc-Gear Colossus (7 dmg/t, 5t)."
      }
    ]
  },
  {
    "id": "arcanist_school_of_liminality",
    "classId": "arcanist",
    "name": "School of Liminality",
    "source": "Tome of Heroes",
    "desc": "Arcane master cutting spell MP costs, amplifying spellcraft, and siphoning mana. (Tome of Heroes)",
    "abilities": [
      {
        "level": 1,
        "name": "Liminal Savant",
        "type": "passive",
        "icon": "✨",
        "spellCostReduce": 1,
        "spellDmgBonus": 2,
        "desc": "Passive: All spells cost 1 less MP (min 1) and deal +2 bonus damage."
      },
      {
        "level": 5,
        "name": "Mulligan",
        "type": "active",
        "icon": "🔷",
        "mp": 0,
        "oncePerCombat": true,
        "dmgDice": "2d6",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "restoreMp": 5,
        "desc": "Active (1/Combat, 0 MP): Deals 2d6 + Arcana arcane dmg & channels +5 MP."
      },
      {
        "level": 10,
        "name": "Spell Duality",
        "type": "active",
        "icon": "🌌",
        "mp": 5,
        "dmgDice": "3d8",
        "dmgStat": "arcana",
        "dmgType": "arcane",
        "chillTurns": 2,
        "desc": "Active (5 MP): Unleashes 3d8 + Arcana arcane dmg & weakens foe (-2 Atk, 2t)."
      }
    ]
  }
]);
