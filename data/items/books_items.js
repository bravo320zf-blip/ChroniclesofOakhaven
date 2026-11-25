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
    "desc": "+1 AC, +1 Luck, +4 Max HP (Tome of Heroes)"
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
    "source": "Tome of Heroes",
    "ac": 1,
    "luck": 1,
    "maxHp": 4,
    "desc": "+1 AC, +1 Luck, +4 Max HP (Tome of Heroes)"
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
    "desc": "+2 AC, +2 Agility (Tome of Heroes)"
  },
  "bk_deepstone_cestus": {
    "id": "bk_deepstone_cestus",
    "name": "Deepstone Cestus",
    "type": "accessory",
    "rarity": "very_rare",
    "value": 200,
    "source": "Tome of Heroes",
    "ac": 2,
    "luck": 3,
    "maxHp": 8,
    "desc": "+2 AC, +3 Luck, +8 Max HP (Tome of Heroes)"
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
    "desc": "+1 AC, +2 Arcana, +6 Max MP (Tome of Heroes)"
  },
  "bk_fletcher_s_retort_gloves": {
    "id": "bk_fletcher_s_retort_gloves",
    "name": "Fletcher's Retort Gloves",
    "type": "accessory",
    "rarity": "rare",
    "value": 135,
    "source": "Tome of Heroes",
    "ac": 1,
    "luck": 2,
    "maxHp": 6,
    "desc": "+1 AC, +2 Luck, +6 Max HP (Tome of Heroes)"
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
    "desc": "+5 AC, +8 Max HP (Tome of Heroes)"
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
    "desc": "+3 Attack, +1 Might (Tome of Heroes)"
  },
  "bk_knight_sergeant_s_surcoat": {
    "id": "bk_knight_sergeant_s_surcoat",
    "name": "Knight-Sergeant's Surcoat",
    "type": "cloak",
    "rarity": "uncommon",
    "value": 75,
    "source": "Tome of Heroes",
    "ac": 1,
    "luck": 1,
    "desc": "+1 AC, +1 Luck (Tome of Heroes)"
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
    "desc": "+1 AC, +1 Arcana, +4 Max MP (Tome of Heroes)"
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
    "desc": "+3 AC, +4 Max HP (Tome of Heroes)"
  },
  "bk_phase_arrow": {
    "id": "bk_phase_arrow",
    "name": "Phase Arrow",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 75,
    "source": "Tome of Heroes",
    "atk": 3,
    "arcana": 1,
    "desc": "+3 Attack, +1 Arcana (Tome of Heroes)"
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
    "source": "Tome of Heroes",
    "ac": 1,
    "spirit": 2,
    "maxHp": 6,
    "desc": "+1 AC, +2 Spirit, +6 Max HP (Tome of Heroes)"
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
    "desc": "+3 Attack, +1 Might (Tome of Heroes)"
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
    "source": "Tome of Heroes",
    "ac": 2,
    "arcana": 3,
    "maxMp": 8,
    "desc": "+2 AC, +3 Arcana, +8 Max MP (Tome of Heroes)"
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
    "source": "Old Margreve",
    "arcana": 1,
    "maxMp": 2,
    "desc": "+1 Arcana, +2 Max MP (Old Margreve)"
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
    "desc": "+1 AC, +1 Luck, +4 Max HP (Old Margreve)"
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
    "source": "Old Margreve",
    "atk": 3,
    "might": 1,
    "desc": "+3 Attack, +1 Might (Old Margreve)"
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
    "desc": "+4 Attack, +2 Arcana (Midgard Heroes)"
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
    "desc": "+3 Attack, +1 Might (Blackpowder Scattergun • Tome of Heroes)"
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
    "desc": "+4 Attack, +1 Might (Heavy Firearm • Tome of Heroes)"
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
    "desc": "+2 AC, +1 Agility (Tome of Heroes)"
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
    "desc": "+3 AC Heavy Shield (Tome of Heroes)"
  },
  "bk_spiked_buckler": {
    "id": "bk_spiked_buckler",
    "name": "Spiked Buckler",
    "type": "offhand",
    "rarity": "common",
    "value": 35,
    "ac": 1,
    "atk": 1,
    "desc": "+1 AC, +1 Attack (Tome of Heroes)"
  },
  "bk_khopesh": {
    "id": "bk_khopesh",
    "name": "Khopesh",
    "type": "weapon",
    "rarity": "common",
    "value": 32,
    "atk": 2,
    "desc": "+2 Attack Curved Blade (Tome of Heroes)"
  },
  "bk_katar": {
    "id": "bk_katar",
    "name": "Katar Punch-Dagger",
    "type": "weapon",
    "rarity": "common",
    "value": 28,
    "atk": 1,
    "agility": 1,
    "desc": "+1 Attack, +1 Agility (Tome of Heroes)"
  },
  "bk_estoc": {
    "id": "bk_estoc",
    "name": "Estoc",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 55,
    "atk": 2,
    "agility": 1,
    "desc": "+2 Attack, +1 Agility (Tome of Heroes)"
  },
  "bk_war_scythe": {
    "id": "bk_war_scythe",
    "name": "War Scythe",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 58,
    "atk": 3,
    "desc": "+3 Attack Polearm (Tome of Heroes)"
  },
  "bk_spiked_chain": {
    "id": "bk_spiked_chain",
    "name": "Spiked Chain",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 52,
    "atk": 2,
    "agility": 1,
    "desc": "+2 Attack, +1 Agility (Tome of Heroes)"
  },
  "bk_bastard_sword": {
    "id": "bk_bastard_sword",
    "name": "Bastard Sword",
    "type": "weapon",
    "rarity": "uncommon",
    "value": 60,
    "atk": 3,
    "desc": "+3 Attack Hand-and-a-Half Blade (Tome of Heroes)"
  },
  "bk_chakram": {
    "id": "bk_chakram",
    "name": "Steel Chakram",
    "type": "weapon",
    "rarity": "common",
    "value": 26,
    "atk": 1,
    "agility": 1,
    "desc": "+1 Attack, +1 Agility (Tome of Heroes)"
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
    "desc": "+1 AC, +1 Attack, +1 Agility (Tome of Heroes)"
  }
});
