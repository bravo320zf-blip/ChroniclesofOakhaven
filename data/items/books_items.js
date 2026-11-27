/* ============================================================
   BOOK EXPANSION ITEMS (57 Magic Items & Adventuring Gear)
   Sources: Tome of Heroes, Old Margreve, Midgard Heroes Handbook
   ============================================================ */
window.OAKHAVEN.registerItems({
  "bk_argent_mantle": {
    "id": "bk_argent_mantle",
    "name": "Argent Mantle",
    "type": "cloak",
    "rarity": "rare",
    "value": 135,
    "source": "Tome of Heroes",
    "ac": 2,
    "luck": 2,
    "passives": {
      "undeadDmgBonus": 2,
      "skillBonus": {
        "Persuasion": 2,
        "Perception": 1
      }
    },
    "activeAbility": {
      "name": "Golden Nimbus",
      "icon": "👑",
      "charges": 1,
      "ooc": true,
      "healBase": 6,
      "healStat": "spirit",
      "selfBuffAtk": { "atk": 3, "turns": 3 },
      "shieldTurns": 2,
      "desc": "1/Quest: Crown yourself in a nimbus of golden light — restore 6 + Spirit HP, gain +3 ATK (3t), and +3 AC (2t)!"
    },
    "desc": "Silver-threaded mantle of monastic knight-commanders. Inspires allies (+2 Persuasion, +1 Perception, +2 vs Undead) and ignites a Golden Nimbus."
  },
  "bk_axe_of_many_strikes": {
    "id": "bk_axe_of_many_strikes",
    "name": "Axe of Many Strikes",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 75,
    "source": "Tome of Heroes",
    "atk": 3,
    "might": 1,
    "desc": "+3 Attack, +1 Might (Tome of Heroes)"
  },
  "bk_beads_of_contemplation": {
    "id": "bk_beads_of_contemplation",
    "name": "Beads of Contemplation",
    "type": "accessory",
    "rarity": "uncommon",
    "value": 75,
    "source": "Tome of Heroes",
    "ac": 1,
    "luck": 1,
    "maxHp": 4,
    "passives": { "healBonus": 2, "mpRegen": 1, "skillBonus": { "Perception": 2 } },
    "activeAbility": { "name": "Still-Mind Mantra", "icon": "📿", "charges": 1, "ooc": true, "restoreMp": 5, "restoreLuck": 1, "desc": "1/Quest: Roll the polished prayer beads to restore +5 MP and +1 Luck!" },
    "desc": "+1 AC, +1 Luck, +4 Max HP, +2 Heal, +1 MP/turn, +2 Perception. Smooth sandalwood prayer beads granting Still-Mind Mantra."
  },
  "bk_bloodspeed_elixir": {
    "id": "bk_bloodspeed_elixir",
    "name": "Bloodspeed Elixir",
    "type": "consumable",
    "rarity": "rare",
    "value": 135,
    "source": "Tome of Heroes",
    "healHp": 28,
    "desc": "Restores 28 HP (Tome of Heroes)"
  },
  "bk_campaign_field_tent": {
    "id": "bk_campaign_field_tent",
    "name": "Campaign Field Tent",
    "type": "accessory",
    "rarity": "rare",
    "value": 135,
    "source": "Tome of Heroes",
    "ac": 1,
    "arcana": 2,
    "maxMp": 6,
    "desc": "+1 AC, +2 Arcana, +6 Max MP (Tome of Heroes)"
  },
  "bk_cestus": {
    "id": "bk_cestus",
    "name": "Cestus",
    "type": "accessory",
    "rarity": "uncommon",
    "value": 75,
    "source": "Tome of Heroes",
    "ac": 1,
    "luck": 1,
    "maxHp": 4,
    "desc": "+1 AC, +1 Luck, +4 Max HP (Tome of Heroes)"
  },
  "bk_chain_cilice": {
    "id": "bk_chain_cilice",
    "name": "Chain Cilice",
    "type": "accessory",
    "rarity": "uncommon",
    "value": 75,
    "ac": 1,
    "luck": 1,
    "maxHp": 4,
    "passives": {
      "dmgReduce": 1,
      "thornsDmg": 2,
      "healBonus": 1
    },
    "activeAbility": {
      "name": "Penitent's Resolve",
      "icon": "⛓️",
      "charges": 2,
      "ooc": true,
      "healBase": 6,
      "shieldTurns": 2,
      "restoreLuck": 1,
      "desc": "2/Quest: Draw grit from the iron links to steady yourself — restore 6 HP, +1 Luck, and gain +3 AC (2t)!"
    },
    "desc": "Spiked iron penitent's chain worn beneath armor (-1 Dmg Taken, 2 Thorns, +1 Healing) with Penitent's Resolve."
  },
  "bk_cloak_of_tentacles": {
    "id": "bk_cloak_of_tentacles",
    "name": "Cloak of Tentacles",
    "type": "cloak",
    "rarity": "rare",
    "value": 135,
    "source": "Tome of Heroes",
    "ac": 2,
    "agility": 2,
    "passives": { "thornsDmg": 3, "dmgReduce": 1, "skillBonus": { "Stealth": 2, "Athletics": 2 } },
    "activeAbility": { "name": "Lashing Tendril-Grasp", "icon": "🐙", "charges": 2, "dmgDice": "2d8", "dmgStat": "agility", "dmgType": "bludgeoning", "stunTurns": 1, "desc": "2/Quest: Whip dark writhing tendrils from the hem for 2d8 + Agility bludgeoning dmg and Stun (1t)!" },
    "desc": "+2 AC, +2 Agility, Thorns 3, -1 Dmg Taken, +2 Stealth & Athletics. Ink-dark sea-woven mantle granting Lashing Tendril-Grasp."
  },
  "bk_deepstone_cestus": {
    "id": "bk_deepstone_cestus",
    "name": "Deepstone Cestus",
    "type": "accessory",
    "rarity": "very_rare",
    "value": 200,
    "ac": 2,
    "luck": 3,
    "maxHp": 8,
    "passives": {
      "dmgReduce": 2,
      "thornsDmg": 3,
      "bossDmgBonus": 4,
      "skillBonus": { "Athletics": 2 }
    },
    "activeAbility": {
      "name": "Deepstone Haymaker",
      "icon": "🪨",
      "charges": 2,
      "dmgDice": "3d6",
      "dmgStat": "might",
      "dmgType": "physical",
      "stunTurns": 1,
      "shieldTurns": 2,
      "desc": "2/Quest: Drive rune-carved stone knuckles for 3d6 + Might dmg, Stun (1t), and +3 AC (2t)!"
    },
    "desc": "Subterranean basalt knuckle-guards etched with mountain wards (-2 Dmg Taken, 3 Thorns, +4 vs Bosses, +2 Athletics) with Deepstone Haymaker."
  },
  "bk_esquire_s_rowels": {
    "id": "bk_esquire_s_rowels",
    "name": "Esquire's Rowels",
    "type": "accessory",
    "rarity": "rare",
    "value": 135,
    "source": "Tome of Heroes",
    "ac": 1,
    "arcana": 2,
    "maxMp": 6,
    "passives": {
      "spellDmgBonus": 2,
      "skillBonus": {
        "Athletics": 2,
        "Perception": 1
      }
    },
    "activeAbility": {
      "name": "Spur the Arcane",
      "icon": "✨",
      "charges": 2,
      "mp": 1,
      "ooc": true,
      "evadeTurns": 2,
      "selfBuffAtk": {
        "atk": 3,
        "turns": 2
      },
      "restoreMp": 3,
      "desc": "2/Quest (1 MP): Click the silver rowels to surge forward — gain Evade (2t), +3 ATK (2t), and recover +3 MP!"
    },
    "desc": "Silver-spurred arcane rowels worn by spell-squired riders (+1 AC, +2 Arcana, +6 Max MP, +2 Spell Dmg, +2 Athletics, +1 Perception) with Spur the Arcane."
  },
  "bk_fletcher_s_retort_gloves": {
    "id": "bk_fletcher_s_retort_gloves",
    "name": "Fletcher's Retort Gloves",
    "type": "accessory",
    "rarity": "rare",
    "value": 135,
    "ac": 1,
    "luck": 2,
    "maxHp": 6,
    "passives": {
      "critRange": 11,
      "dmgReduce": 1,
      "skillBonus": { "Perception": 2, "Athletics": 1 }
    },
    "activeAbility": {
      "name": "Catch & Return",
      "icon": "🧤",
      "charges": 2,
      "dmgDice": "2d8",
      "dmgStat": "agility",
      "dmgType": "physical",
      "evadeTurns": 2,
      "desc": "2/Quest: Deflect an incoming strike and whip back a razor counter-shot for 2d8 + Agility dmg and Evade (2t)!"
    },
    "desc": "Reinforced archer's leather gauntlets stitched for mid-air deflection (+Crit, -1 Dmg Taken, +2 Perception, +1 Athletics) with Catch & Return."
  },
  "bk_giantstrike_cestus": {
    "id": "bk_giantstrike_cestus",
    "name": "Giantstrike Cestus",
    "type": "armor",
    "rarity": "very_rare",
    "value": 200,
    "source": "Tome of Heroes",
    "ac": 5,
    "maxHp": 8,
    "passives": {
      "bossDmgBonus": 5,
      "thornsDmg": 4,
      "dmgReduce": 2
    },
    "activeAbility": {
      "name": "Titanic Knuckle-Breaker",
      "icon": "🥊",
      "charges": 2,
      "dmgDice": "2d10",
      "dmgStat": "might",
      "dmgType": "physical",
      "stunTurns": 1,
      "desc": "2/Quest: Drive the giant-forged cestus home for 2d10 + Might crushing dmg and Stun (1t)!"
    },
    "desc": "Heavy giant-forged war-cestus (+5 vs Bosses, 4 Thorns, -2 dmg taken) with Titanic Knuckle-Breaker."
  },
  "bk_javelin_of_teleportation": {
    "id": "bk_javelin_of_teleportation",
    "name": "Javelin of Teleportation",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 75,
    "source": "Tome of Heroes",
    "atk": 3,
    "might": 1,
    "passives": {
      "critRange": 11,
      "skillBonus": { "Athletics": 1 }
    },
    "activeAbility": {
      "name": "Blink-Spear Lunge",
      "icon": "⚡",
      "charges": 2,
      "dmgDice": "1d10",
      "dmgStat": "might",
      "dmgType": "arcane",
      "evadeTurns": 1,
      "desc": "2/Quest: Hurl the rune-etched javelin and blink straight to its point of impact for 1d10 + Might dmg and Evade (1t)!"
    },
    "desc": "Rune-etched throwing javelin that flashes its wielder across the battlefield (+Crit, +1 Athletics) with Blink-Spear Lunge."
  },
  "bk_knight_sergeant_s_surcoat": {
    "id": "bk_knight_sergeant_s_surcoat",
    "name": "Knight-Sergeant's Surcoat",
    "type": "cloak",
    "rarity": "uncommon",
    "value": 75,
    "ac": 1,
    "luck": 1,
    "passives": {
      "dmgReduce": 1,
      "skillBonus": {
        "Persuasion": 2,
        "Athletics": 1
      }
    },
    "activeAbility": {
      "name": "Sergeant's Rally",
      "icon": "🛡️",
      "charges": 2,
      "ooc": true,
      "shieldTurns": 2,
      "selfBuffAtk": {
        "atk": 2,
        "turns": 2
      },
      "healBase": 5,
      "desc": "2/Quest: Bark a crisp battle-order to restore 5 HP, gain +3 AC (2t), and +2 Attack (2t)!"
    },
    "desc": "Heraldic wool-and-mail officer's surcoat (-1 Dmg Taken, +2 Persuasion, +1 Athletics) with Sergeant's Rally."
  },
  "bk_medic_s_sash": {
    "id": "bk_medic_s_sash",
    "name": "Medic's Sash",
    "type": "accessory",
    "rarity": "uncommon",
    "value": 75,
    "source": "Tome of Heroes",
    "ac": 1,
    "arcana": 1,
    "maxMp": 4,
    "passives": {
      "healBonus": 3,
      "skillBonus": { "Lore": 1 }
    },
    "activeAbility": {
      "name": "Field Triage",
      "icon": "🩹",
      "charges": 2,
      "ooc": true,
      "healDice": "1d10",
      "healStat": "spirit",
      "desc": "2/Quest: Draw fresh herbs and bandages from the sash to restore 1d10 + Spirit HP!"
    },
    "desc": "Herb-stocked field healer's linen bandolier (+3 Healing, +1 Lore) with Field Triage."
  },
  "bk_momentblade": {
    "id": "bk_momentblade",
    "name": "Momentblade",
    "type": "weapon",
    "rarity": "rare",
    "value": 135,
    "source": "Tome of Heroes",
    "atk": 4,
    "arcana": 2,
    "desc": "+4 Attack, +2 Arcana (Tome of Heroes)"
  },
  "bk_ninefold_swarmdagger": {
    "id": "bk_ninefold_swarmdagger",
    "name": "Ninefold Swarmdagger",
    "type": "weapon",
    "rarity": "rare",
    "value": 135,
    "source": "Tome of Heroes",
    "atk": 4,
    "agility": 2,
    "passives": {
      "critRange": 11,
      "spellDmgBonus": 2
    },
    "activeAbility": {
      "name": "Ninefold Spectral Volley",
      "icon": "🗡️",
      "charges": 2,
      "mp": 2,
      "dmgDice": "1d6",
      "dmgStat": "agility",
      "dmgType": "arcane",
      "multiStrike": 3,
      "desc": "2/Quest (2 MP): Unleash three ghostly dagger duplicates striking for 3× (1d6 + Agility) force damage!"
    },
    "desc": "Etched silver dagger that splits into ghostly duplicates mid-strike (+Crit, +2 Spell Dmg) and fires a Ninefold Spectral Volley."
  },
  "bk_paired_gauntlets_of_striking": {
    "id": "bk_paired_gauntlets_of_striking",
    "name": "Paired Gauntlets of Striking",
    "type": "armor",
    "rarity": "uncommon",
    "value": 75,
    "source": "Tome of Heroes",
    "ac": 3,
    "maxHp": 4,
    "passives": {
      "thornsDmg": 2,
      "skillBonus": { "Athletics": 1 }
    },
    "activeAbility": {
      "name": "Twin-Fist Combination",
      "icon": "👊",
      "charges": 2,
      "dmgDice": "1d6",
      "dmgStat": "might",
      "dmgType": "physical",
      "multiStrike": 2,
      "desc": "2/Quest: Unleash a crisp left-right steel gauntlet combo for 2× (1d6 + Might) dmg!"
    },
    "desc": "Balanced steel brawling gauntlets (2 Thorns, +1 Athletics) with Twin-Fist Combination."
  },
  "bk_phase_arrow": {
    "id": "bk_phase_arrow",
    "name": "Phase Arrow",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 75,
    "atk": 3,
    "arcana": 1,
    "passives": {
      "critRange": 11,
      "spellDmgBonus": 1,
      "skillBonus": { "Perception": 1 }
    },
    "activeAbility": {
      "name": "Spectral Piercer",
      "icon": "🏹",
      "charges": 2,
      "dmgDice": "2d6",
      "dmgStat": "arcana",
      "dmgType": "arcane",
      "guaranteedCrit": true,
      "desc": "2/Quest: Loose a shimmering phase-bolt that slips straight through armor for a guaranteed critical 2d6 + Arcana arcane strike!"
    },
    "desc": "Ghost-silver war-shaft that slips through solid steel (+Crit, +1 Spell Dmg, +1 Perception) with Spectral Piercer."
  },
  "bk_potion_of_infinite_possibilities": {
    "id": "bk_potion_of_infinite_possibilities",
    "name": "Potion of Infinite Possibilities",
    "type": "consumable",
    "rarity": "very_rare",
    "value": 200,
    "source": "Tome of Heroes",
    "healHp": 34,
    "desc": "Restores 34 HP (Tome of Heroes)"
  },
  "bk_pouch_of_runestones": {
    "id": "bk_pouch_of_runestones",
    "name": "Pouch of Runestones",
    "type": "accessory",
    "rarity": "rare",
    "value": 135,
    "ac": 1,
    "spirit": 2,
    "maxHp": 6,
    "passives": {
      "spellDmgBonus": 2,
      "healBonus": 2,
      "skillBonus": {
        "Arcana": 2,
        "Perception": 2
      }
    },
    "activeAbility": {
      "name": "Cast the Runes",
      "icon": "🪨",
      "charges": 2,
      "ooc": true,
      "restoreMp": 4,
      "restoreLuck": 1,
      "shieldTurns": 2,
      "desc": "2/Quest: Scatter carved stone runes to read the omen — restore 4 MP, +1 Luck, and gain +3 AC (2t)!"
    },
    "desc": "Weathered leather pouch of hand-carved divination runestones (+2 Spell Dmg, +2 Healing, +2 Arcana/Perception) with Cast the Runes."
  },
  "bk_serpentine_sandals": {
    "id": "bk_serpentine_sandals",
    "name": "Serpentine Sandals",
    "type": "cloak",
    "rarity": "rare",
    "value": 135,
    "source": "Tome of Heroes",
    "ac": 2,
    "agility": 2,
    "desc": "+2 AC, +2 Agility (Tome of Heroes)"
  },
  "bk_shattershot_arrow": {
    "id": "bk_shattershot_arrow",
    "name": "Shattershot Arrow",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 75,
    "source": "Tome of Heroes",
    "atk": 3,
    "might": 1,
    "passives": { "bossDmgBonus": 2, "bombDmgBonus": 2 },
    "activeAbility": { "name": "Splinter-Burst Volley", "icon": "🏹", "charges": 2, "dmgDice": "2d6", "dmgStat": "might", "dmgType": "piercing", "chillTurns": 1, "desc": "2/Quest: Loose a scored iron-headed shaft that bursts on impact for 2d6 + Might piercing dmg and Chill (1t)!" },
    "desc": "+3 Attack, +1 Might, +2 Boss & Bomb Dmg. Quiver of scored shrapnel-tipped war arrows granting Splinter-Burst Volley."
  },
  "bk_soulbound_wraps": {
    "id": "bk_soulbound_wraps",
    "name": "Soulbound Wraps",
    "type": "accessory",
    "rarity": "rare",
    "value": 135,
    "source": "Tome of Heroes",
    "ac": 1,
    "luck": 2,
    "maxHp": 6,
    "desc": "+1 AC, +2 Luck, +6 Max HP (Tome of Heroes)"
  },
  "bk_stasis_stone": {
    "id": "bk_stasis_stone",
    "name": "Stasis Stone",
    "type": "accessory",
    "rarity": "very_rare",
    "value": 200,
    "source": "Tome of Heroes",
    "ac": 2,
    "arcana": 3,
    "maxMp": 8,
    "desc": "+2 AC, +3 Arcana, +8 Max MP (Tome of Heroes)"
  },
  "bk_stormheart_bow": {
    "id": "bk_stormheart_bow",
    "name": "Stormheart Bow",
    "type": "weapon",
    "rarity": "rare",
    "value": 135,
    "source": "Tome of Heroes",
    "atk": 4,
    "arcana": 2,
    "desc": "+4 Attack, +2 Arcana (Tome of Heroes)"
  },
  "bk_victory_banner": {
    "id": "bk_victory_banner",
    "name": "Victory Banner",
    "type": "accessory",
    "rarity": "very_rare",
    "value": 200,
    "ac": 2,
    "arcana": 3,
    "maxMp": 8,
    "passives": {
      "spellDmgBonus": 3,
      "healBonus": 2,
      "bossDmgBonus": 4,
      "skillBonus": { "Persuasion": 2 }
    },
    "activeAbility": {
      "name": "Rallying Standard",
      "icon": "🚩",
      "charges": 2,
      "ooc": true,
      "healDice": "2d6",
      "healStat": "arcana",
      "selfBuffAtk": { "atk": 3, "turns": 3 },
      "shieldTurns": 2,
      "desc": "2/Quest: Plant the radiant war-standard to heal 2d6 + Arcana HP, +3 ATK (3t), and +3 AC (2t)!"
    },
    "desc": "Gold-braided battle standard stitched with triumphant sigils (+3 Spell Dmg, +2 Healing, +4 vs Bosses, +2 Persuasion) with Rallying Standard."
  },
  "bk_bracelet_of_the_fire_tender": {
    "id": "bk_bracelet_of_the_fire_tender",
    "name": "Bracelet Of The Fire Tender",
    "type": "accessory",
    "rarity": "uncommon",
    "value": 75,
    "source": "Old Margreve",
    "ac": 1,
    "arcana": 1,
    "maxMp": 4,
    "desc": "+1 AC, +1 Arcana, +4 Max MP (Old Margreve)"
  },
  "bk_charm_of_restoration": {
    "id": "bk_charm_of_restoration",
    "name": "Charm Of Restoration",
    "type": "accessory",
    "rarity": "common",
    "value": 30,
    "arcana": 1,
    "maxMp": 2,
    "passives": {
      "healBonus": 1,
      "skillBonus": {
        "Herbalism": 1
      }
    },
    "activeAbility": {
      "name": "Woodland Mend",
      "icon": "🌿",
      "charges": 1,
      "ooc": true,
      "healBase": 5,
      "restoreMp": 2,
      "desc": "1/Quest: Warm the carved charm to restore 5 HP and 2 MP!"
    },
    "desc": "Carved woodland bone-and-amber charm (+1 Healing, +1 Herbalism) with 1 charge of Woodland Mend."
  },
  "bk_circlet_of_holly": {
    "id": "bk_circlet_of_holly",
    "name": "Circlet Of Holly",
    "type": "accessory",
    "rarity": "uncommon",
    "value": 75,
    "source": "Old Margreve",
    "ac": 1,
    "luck": 1,
    "maxHp": 4,
    "passives": { "healBonus": 2, "thornsDmg": 2, "skillBonus": { "Herbalism": 2, "Survival": 1 } },
    "activeAbility": { "name": "Winter-Bough Vigor", "icon": "🌿", "charges": 1, "ooc": true, "healDice": "2d6", "healBonus": 2, "restoreLuck": 1, "desc": "1/Quest: Draw evergreen vitality from the braided holly to restore 2d6 + 2 HP and +1 Luck!" },
    "desc": "+1 AC, +1 Luck, +4 Max HP, +2 Heal, Thorns 2, +2 Herbalism, +1 Survival. Evergreen woodland circlet granting Winter-Bough Vigor."
  },
  "bk_moon_through_the_trees": {
    "id": "bk_moon_through_the_trees",
    "name": "Moon Through The Trees",
    "type": "accessory",
    "rarity": "rare",
    "value": 135,
    "source": "Old Margreve",
    "ac": 1,
    "arcana": 2,
    "maxMp": 6,
    "desc": "+1 AC, +2 Arcana, +6 Max MP (Old Margreve)"
  },
  "bk_rowan_staff": {
    "id": "bk_rowan_staff",
    "name": "Rowan Staff",
    "type": "weapon",
    "rarity": "very_rare",
    "value": 200,
    "source": "Old Margreve",
    "atk": 5,
    "arcana": 3,
    "desc": "+5 Attack, +3 Arcana (Old Margreve)"
  },
  "bk_sickle_of_thorns": {
    "id": "bk_sickle_of_thorns",
    "name": "Sickle Of Thorns",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 75,
    "atk": 3,
    "might": 1,
    "passives": {
      "critRange": 11,
      "skillBonus": {
        "Herbalism": 2,
        "Survival": 1
      }
    },
    "activeAbility": {
      "name": "Bramble-Hook Rend",
      "icon": "🌿",
      "charges": 2,
      "dmgDice": "1d8",
      "dmgStat": "might",
      "dmgType": "physical",
      "dot": {
        "dmg": 3,
        "turns": 3,
        "label": "Briar Bleed"
      },
      "desc": "2/Quest: Hook and tear with living iron briars for 1d8 + Might dmg and Briar Bleed (3/t, 3t)!"
    },
    "desc": "Curved woodland iron sickle entwined with living thorns (+Crit, +2 Herbalism, +1 Survival) with Bramble-Hook Rend."
  },
  "bk_ward_against_wild_appetites": {
    "id": "bk_ward_against_wild_appetites",
    "name": "Ward Against Wild Appetites",
    "type": "accessory",
    "rarity": "uncommon",
    "value": 75,
    "ac": 1,
    "luck": 1,
    "maxHp": 4,
    "passives": {
      "dmgReduce": 1,
      "skillBonus": { "Survival": 2 }
    },
    "activeAbility": {
      "name": "Hearth-Ward",
      "icon": "🌿",
      "charges": 1,
      "ooc": true,
      "healDice": "1d6",
      "healBonus": 3,
      "healStat": "spirit",
      "shieldTurns": 2,
      "desc": "1/Quest: Invoke the woodland ward to restore 1d6 + 3 + Spirit HP and gain +3 AC for 2 turns."
    },
    "desc": "Woven rowan-and-herb charm blessed to shield forest travelers from ravenous beasts and dark hunger."
  },
  "bk_elk_horn_rod": {
    "id": "bk_elk_horn_rod",
    "name": "Elk Horn Rod",
    "type": "weapon",
    "rarity": "rare",
    "value": 135,
    "source": "Midgard Heroes",
    "atk": 4,
    "arcana": 2,
    "passives": { "spellDmgBonus": 3, "healBonus": 2, "skillBonus": { "Survival": 2, "Herbalism": 2 } },
    "activeAbility": { "name": "Antler-Grove Charge", "icon": "🦌", "charges": 2, "mp": 2, "dmgDice": "2d8", "dmgStat": "arcana", "dmgType": "force", "chillTurns": 1, "healDice": "1d6", "healStat": "arcana", "desc": "2/Quest (2 MP): Call a spectral stag-burst for 2d8 + Arcana force dmg, Chill (1t), and heal 1d6 + Arcana HP!" },
    "desc": "+4 Attack, +2 Arcana, +3 Spell Dmg, +2 Heal, +2 Survival & Herbalism. Rune-carved antler staff granting Antler-Grove Charge."
  },
  "bk_nithing_pole": {
    "id": "bk_nithing_pole",
    "name": "Nithing Pole",
    "type": "accessory",
    "rarity": "rare",
    "value": 135,
    "source": "Midgard Heroes",
    "ac": 1,
    "arcana": 2,
    "maxMp": 6,
    "desc": "+1 AC, +2 Arcana, +6 Max MP (Midgard Heroes)"
  },
  "bk_arquebus": {
    "id": "bk_arquebus",
    "name": "Arquebus",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 75,
    "atk": 3,
    "agility": 1,
    "desc": "+3 Attack, +1 Agility (Blackpowder Firearm • Tome of Heroes)"
  },
  "bk_blunderbuss": {
    "id": "bk_blunderbuss",
    "name": "Blunderbuss",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 80,
    "atk": 3,
    "might": 1,
    "passives": { "bombDmgBonus": 3, "bossDmgBonus": 2 },
    "activeAbility": { "name": "Bell-Muzzle Scatter", "icon": "💥", "charges": 2, "dmgDice": "2d8", "dmgStat": "might", "dmgType": "fire", "chillTurns": 1, "desc": "2/Quest: Blast a wide cone of black-powder shot for 2d8 + Might fire dmg and Chill (1t)!" },
    "desc": "+3 Attack, +1 Might, +3 Bomb Dmg, +2 Boss Dmg. Bell-muzzled black-powder scattergun granting Bell-Muzzle Scatter."
  },
  "bk_flintlock_pistol": {
    "id": "bk_flintlock_pistol",
    "name": "Flintlock Pistol",
    "type": "weapon",
    "rarity": "common",
    "value": 45,
    "atk": 2,
    "agility": 1,
    "desc": "+2 Attack, +1 Agility (Blackpowder Pistol • Tome of Heroes)"
  },
  "bk_hand_cannon": {
    "id": "bk_hand_cannon",
    "name": "Hand Cannon",
    "type": "weapon",
    "rarity": "rare",
    "value": 120,
    "atk": 4,
    "might": 1,
    "passives": { "bossDmgBonus": 3, "bombDmgBonus": 4 },
    "activeAbility": { "name": "Thunder-Bore Blast", "icon": "💥", "charges": 2, "dmgDice": "3d6", "dmgStat": "might", "dmgType": "fire", "stunTurns": 1, "desc": "2/Quest: Touch off a double-powder iron slug for 3d6 + Might fire dmg and Stun (1t)!" },
    "desc": "+4 Attack, +1 Might, +3 Boss Dmg, +4 Bomb Dmg. Heavy brass-bound black-powder firearm granting Thunder-Bore Blast."
  },
  "bk_powder_bomb": {
    "id": "bk_powder_bomb",
    "name": "Blackpowder Bomb",
    "type": "bomb",
    "rarity": "uncommon",
    "value": 35,
    "dmg": 14,
    "desc": "Throw in combat for 14 explosive dmg (Tome of Heroes)"
  },
  "bk_smoke_bomb": {
    "id": "bk_smoke_bomb",
    "name": "Alchemical Smoke Bomb",
    "type": "consumable",
    "rarity": "common",
    "value": 20,
    "healHp": 6,
    "desc": "Clears danger & restores 6 HP (Tome of Heroes)"
  },
  "bk_brigandine": {
    "id": "bk_brigandine",
    "name": "Brigandine Armor",
    "type": "armor",
    "rarity": "common",
    "value": 45,
    "ac": 2,
    "agility": 1,
    "passives": {
      "dmgReduce": 1,
      "skillBonus": {
        "Stealth": 1
      }
    },
    "desc": "Supple canvas-backed armor lined with overlapping riveted steel plates (-1 Dmg Taken, +1 Stealth)."
  },
  "bk_lamellar_armor": {
    "id": "bk_lamellar_armor",
    "name": "Lamellar Armor",
    "type": "armor",
    "rarity": "uncommon",
    "value": 75,
    "ac": 3,
    "might": 1,
    "passives": {
      "dmgReduce": 1,
      "thornsDmg": 1,
      "skillBonus": { "Athletics": 1 }
    },
    "desc": "Overlapping laced steel plates that flex smoothly in combat (-1 dmg taken, 1 thorns, +1 Athletics)."
  },
  "bk_gambeson": {
    "id": "bk_gambeson",
    "name": "Reinforced Gambeson",
    "type": "armor",
    "rarity": "common",
    "value": 25,
    "ac": 2,
    "passives": {
      "dmgReduce": 1
    },
    "desc": "Quilted linen-and-leather gambeson that cushions incoming blows (-1 damage taken)."
  },
  "bk_tower_shield": {
    "id": "bk_tower_shield",
    "name": "Tower Shield",
    "type": "offhand",
    "rarity": "uncommon",
    "value": 65,
    "ac": 3,
    "passives": {
      "dmgReduce": 2
    },
    "activeAbility": {
      "name": "Bulwark Stance",
      "icon": "🛡️",
      "charges": 2,
      "shieldTurns": 2,
      "desc": "2/Quest: Plant the massive iron-rimmed tower shield to gain +3 AC for 2 turns!"
    },
    "desc": "Full-length iron-rimmed bulwark shield (-2 Dmg Taken) with Bulwark Stance."
  },
  "bk_spiked_buckler": {
    "id": "bk_spiked_buckler",
    "name": "Spiked Buckler",
    "type": "offhand",
    "rarity": "common",
    "value": 35,
    "ac": 1,
    "atk": 1,
    "passives": {
      "thornsDmg": 2,
      "skillBonus": {
        "Athletics": 1
      }
    },
    "desc": "Compact iron-rimmed buckler fitted with a sharpened center boss (2 Thorns, +1 Athletics)."
  },
  "bk_khopesh": {
    "id": "bk_khopesh",
    "name": "Khopesh",
    "type": "weapon",
    "rarity": "common",
    "value": 32,
    "atk": 2,
    "passives": {
      "critRange": 11,
      "skillBonus": { "Athletics": 1 }
    },
    "desc": "Hooked bronze-and-steel desert sickle-sword balanced to tear past shields (+Crit, +1 Athletics)."
  },
  "bk_katar": {
    "id": "bk_katar",
    "name": "Katar Punch-Dagger",
    "type": "weapon",
    "rarity": "common",
    "value": 28,
    "atk": 1,
    "agility": 1,
    "passives": {
      "critRange": 11,
      "skillBonus": {
        "Stealth": 1
      }
    },
    "desc": "Twin-barred horizontal punch-dagger built for swift close-quarters thrusts (+Crit, +1 Stealth)."
  },
  "bk_estoc": {
    "id": "bk_estoc",
    "name": "Estoc",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 55,
    "atk": 2,
    "agility": 1,
    "passives": { "critRange": 19, "bossDmgBonus": 2 },
    "activeAbility": { "name": "Armor-Piercing Lunge", "icon": "🤺", "charges": 2, "dmgDice": "2d6", "dmgStat": "agility", "dmgType": "piercing", "guaranteedCrit": true, "desc": "2/Quest: Thread the stiff triangular blade between armor plates for a guaranteed critical 2d6 + Agility piercing strike!" },
    "desc": "+2 Attack, +1 Agility, Crit 19-20, +2 Boss Dmg. Rigid mail-piercing tuck sword granting Armor-Piercing Lunge."
  },
  "bk_war_scythe": {
    "id": "bk_war_scythe",
    "name": "War Scythe",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 58,
    "atk": 3,
    "passives": {
      "critRange": 11,
      "lifesteal": 0.08
    },
    "activeAbility": {
      "name": "Reaping Arc",
      "icon": "🌾",
      "charges": 2,
      "dmgDice": "1d10",
      "dmgStat": "might",
      "dmgType": "physical",
      "dot": { "dmg": 3, "turns": 2, "label": "Deep Gash" },
      "desc": "2/Quest: Sweep the curved polearm blade for 1d10 + Might dmg and Deep Gash (3 dmg/t, 2t)!"
    },
    "desc": "Long-hafted curved steel war scythe built for sweeping cuts (+Crit, 8% Lifesteal) with Reaping Arc."
  },
  "bk_spiked_chain": {
    "id": "bk_spiked_chain",
    "name": "Spiked Chain",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 52,
    "atk": 2,
    "agility": 1,
    "passives": {
      "critRange": 11,
      "skillBonus": { "Athletics": 1 }
    },
    "activeAbility": {
      "name": "Barbed Lash",
      "icon": "⛓️",
      "charges": 2,
      "dmgDice": "1d8",
      "dmgStat": "agility",
      "dmgType": "physical",
      "stunTurns": 1,
      "desc": "2/Quest: Whip the weighted spiked chain around a foe's legs for 1d8 + Agility dmg and Stun (1t)!"
    },
    "desc": "Ten-foot length of razor-barbed iron chain built to trip and entangle (+Crit, +1 Athletics) with Barbed Lash."
  },
  "bk_bastard_sword": {
    "id": "bk_bastard_sword",
    "name": "Bastard Sword",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 60,
    "atk": 3,
    "passives": { "critRange": 19, "skillBonus": { "Athletics": 1 } },
    "activeAbility": { "name": "Two-Handed Pommel Smash", "icon": "⚔️", "charges": 2, "dmgDice": "2d6", "dmgStat": "might", "dmgType": "slashing", "stunTurns": 1, "desc": "2/Quest: Grip the long hilt with both hands for 2d6 + Might slashing dmg and Stun (1t)!" },
    "desc": "+3 Attack, Crit 19-20, +1 Athletics. Balanced hand-and-a-half steel blade granting Two-Handed Pommel Smash."
  },
  "bk_chakram": {
    "id": "bk_chakram",
    "name": "Steel Chakram",
    "type": "weapon",
    "rarity": "common",
    "value": 26,
    "atk": 1,
    "agility": 1,
    "passives": {
      "critRange": 11,
      "skillBonus": {
        "Athletics": 1
      }
    },
    "desc": "Balanced steel throwing ring honed along its outer rim (+Crit, +1 Athletics)."
  },
  "bk_war_fan": {
    "id": "bk_war_fan",
    "name": "Iron War Fan",
    "type": "offhand",
    "rarity": "common",
    "value": 30,
    "ac": 1,
    "agility": 1,
    "desc": "+1 AC, +1 Agility (Tome of Heroes)"
  },
  "bk_bec_de_corbin": {
    "id": "bk_bec_de_corbin",
    "name": "Bec de Corbin",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 62,
    "atk": 3,
    "might": 1,
    "passives": {
      "bossDmgBonus": 2,
      "critRange": 11
    },
    "activeAbility": {
      "name": "Armor-Piercing Beak",
      "icon": "🔨",
      "charges": 1,
      "dmgDice": "1d10",
      "dmgStat": "might",
      "dmgType": "physical",
      "stunTurns": 1,
      "desc": "1/Quest: Drive the crow's-beak spike through heavy armor for 1d10 + Might dmg and Stun (1t)!"
    },
    "desc": "Steel-beaked polearm forged to punch through plate armor (+2 vs Bosses, +Crit) with Armor-Piercing Beak."
  },
  "bk_parrying_dagger": {
    "id": "bk_parrying_dagger",
    "name": "Parrying Dagger",
    "type": "offhand",
    "rarity": "uncommon",
    "value": 45,
    "ac": 1,
    "atk": 1,
    "agility": 1,
    "passives": {
      "critRange": 11,
      "thornsDmg": 2,
      "skillBonus": {
        "Athletics": 1
      }
    },
    "activeAbility": {
      "name": "Main-Gauche Riposte",
      "icon": "🗡️",
      "charges": 2,
      "evadeTurns": 1,
      "dmgDice": "1d8",
      "dmgStat": "agility",
      "dmgType": "physical",
      "desc": "2/Quest: Catch the foe's blade on the forked guard to Evade (1t) and riposte for 1d8 + Agility dmg!"
    },
    "desc": "Fork-guarded duelist's offhand dagger (+Crit, 2 Counter Thorns, +1 Athletics) with Main-Gauche Riposte."
  }
});
