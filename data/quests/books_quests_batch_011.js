/* ============================================================
   BOOK QUESTS — BATCH 011 (12 Quests • All autoDiscover: false)
   Includes the Complete 7-Part Chained SCARLET CITADEL Campaign!
   Purely in-world subtitles & Inn rumor pool discovery.
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. SCARLET CITADEL I: THE RUINS ABOVE & GAOLER'S CRYPT (7 PAGES • LV 2)
  // Part 1 of 7
  // ==========================================================
  bk_b11_sc_1_ruins: {
    id: "bk_b11_sc_1_ruins",
    title: "Scarlet Citadel I: The Ruins Above & Gaoler's Crypt",
    subtitle: "Part 1 of 7 • Redtower, The Gaoler & Holzanger Crypts",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Frightened Redtower Townsfolk (Rusty Flagon Tavern)",
    summary: "Answer Redtower's plea to breach the ruined hilltop fortress of the Scarlet Citadel, descend into the Holzanger family crypts, and defeat the infamous bogeyman Gaoler and his crimson ogre Scar!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Scarlet Citadel • Ruins Above",
        title: "Smashed Gateway",
        safeRetreat: true,
        text: "Atop a brush-choked hill above Redtower rise the shattered walls of House Holzanger's Scarlet Citadel. Smashed oak gates lie in chunks along the main archway, leading down into the castle's old fallback bunkers—lair of the dreaded kidnapper known as 'the Gaoler'!",
        choices: [
          { t: "Scout the collapsed outbuildings for a hidden staircase into the crypts.", badge: "Perception DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, passMsg: "You spot a concealed entry past the Gaoler's trip-bells!", failMsg: "Overgrown brambles force you down the main underkeep stair." }, onPass: { cw: "CRYPT_SNEAK" } },
          { t: "Descend boldly into Level 1: Dungeon and Crypts!", to: 2 }
        ]
      },
      2: {
        zone: "Level 1 • Shrine of Charun & Cells",
        title: "Ushulx & The Crimson Ogre Scar",
        text: "Flickering oil lamps reveal iron torture racks and a grim Shrine of Charun. Charging out of Cell 109 lumbers Scar—the Gaoler's tusked crimson ogre assistant—while blood cultist Ushulx bargains desperately for her life!",
        enemy: { name: "Scar the Crimson Ogre & Guards", desc: "Tusked crimson brute enforcing the Gaoler's dungeons.", hp: 28, ac: 12, atk: 5, dmg: 5, xp: 70, gold: 40, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["CRYPT_SNEAK"] },
        choices: [
          { t: "Confront the infamous Gaoler inside his iron-barred bedchamber!", to: 3 }
        ]
      },
      3: {
        zone: "Level 1 • Gaoler's Chamber",
        title: "The Bogeyman of Redtower",
        text: "Rattling heavy manacles and a wicked flensing hook, the terrifying Gaoler steps from the shadows beside the stairs leading down to the Alchemist's Furnace! 'Fresh guests for the oubliette!'",
        enemy: { name: "The Gaoler of Scarlet Citadel", desc: "Notorious torturer and kidnapper feared across Redtower.", hp: 32, ac: 12, atk: 5, dmg: 5, xp: 85, gold: 60, items: ["bq_gaoler_iron_keys"], weakCw: ["CRYPT_SNEAK"] },
        choices: [
          { t: "Unlock the cells to free the Redtower captives and uncover the stairs to Level 2!", to: 4 }
        ]
      },
      4: {
        zone: "Holzanger Ancestral Shrine",
        title: "Whispers of Gellert the Gruesome",
        text: "Freed prisoners whisper that the Gaoler was merely a surface watchdog—far deeper below lurks **Gellert the Gruesome**, last scion of House Holzanger, tampering with Void magic and ley lines!",
        onEnter: { healHp: 8, msg: "Freed the Redtower captives and caught your breath (+8 HP)!" },
        choices: [
          { t: "Escort the survivors back to Redtower and prepare for Level 2!", to: 5 }
        ]
      },
      5: {
        zone: "Village of Redtower",
        title: "Redtower's Relief",
        text: "Grateful villagers cheer as the Gaoler's terror ends, paying out their saved silver.",
        choices: [
          { t: "Unlock Part 2: Arcane Scriptorium & Alchemist's Furnace!", to: 6 }
        ]
      },
      6: {
        zone: "Citadel Hill",
        title: "Stairs Going Deeper",
        text: "Strange acrid smoke drifts up from the second level below.",
        choices: [
          { t: "Complete Part 1!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Dungeon & Crypts Cleared",
        text: "The Gaoler is fallen! <strong>Scarlet Citadel II: Arcane Scriptorium & Alchemist's Furnace</strong> is now unlocked on your Quest Board!",
        ending: { type: "true", title: "Breaker of the Gaoler's Crypt (Part 1 of 7)", xp: 125, gold: 115, trophy: "The Gaoler's Iron Manacles" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. SCARLET CITADEL II: SCRIPTORIUM & ALCHEMIST'S FURNACE (7 PAGES • LV 3)
  // Part 2 of 7 (Prerequisite: bk_b11_sc_1_ruins)
  // ==========================================================
  bk_b11_sc_2_scriptorium: {
    id: "bk_b11_sc_2_scriptorium",
    reqQuest: "bk_b11_sc_1_ruins",
    title: "Scarlet Citadel II: Scriptorium & Alchemist's Furnace",
    subtitle: "Part 2 of 7 • Danaska Maksilov's Oozes & Cagoth-ze",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Unlocks after Scarlet Citadel I",
    summary: "Descend to Level 2 of the Scarlet Citadel, slip past raiding dust goblins, smash alchemist Danaska Maksilov's bubbling ooze-essence incubators, and defeat Gellert's lieutenant Cagoth-ze beside the Time Construct!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Level 2 • Alchemist's Furnace",
        title: "Ooze Incubators & Dust Goblins",
        safeRetreat: true,
        text: "Hissing glass vats of glowing acidic plasma line the Alchemist's Furnace! Sneaky dust goblin raiders offer to trade their ancient dungeon map if you distract alchemist Danaska Maksilov's intelligent oozes!",
        choices: [
          { t: "Strike a quick truce with the dust goblins for their map of the Scriptorium!", badge: "Persuasion DC 11", check: { stat: "spirit", skill: "Persuasion", dc: 11, pass: 2, fail: 2, passMsg: "The goblins point out the ooze-baffle bypass straight to Cagoth-ze!", failMsg: "The jittery goblins bolt into the shadows as Maksilov's oozes surge!" }, onPass: { cw: "GOBLIN_PLAN" } },
          { t: "Smash the glass ooze-plasma tanks and fight straight through!", to: 2 }
        ]
      },
      2: {
        zone: "Level 2 • Ooze Essence Extractor",
        title: "Danaska Maksilov & Super-Oozes",
        text: "Drenched in glowing reagents, obsessed alchemist Danaska Maksilov unleashes her alchemically supercharged, intelligent Acid Oozes across the furnace floor!",
        enemy: { name: "Danaska Maksilov & Acid Oozes", desc: "Mad alchemist and her hyper-corrosive distilled oozes.", hp: 34, ac: 12, atk: 5, dmg: 6, xp: 90, gold: 50, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["GOBLIN_PLAN"] },
        choices: [
          { t: "Cross the shimmering Time Tributary into the Arcane Scriptorium!", to: 3 }
        ]
      },
      3: {
        zone: "Level 2 • Arcane Scriptorium",
        title: "Cagoth-ze & The Time Construct",
        text: "Beside a hovering brass Time Construct bending the citadel's ley lines stands Cagoth-ze, Gellert's formidable arcane lieutenant! 'You dare disturb the master's research?!'",
        enemy: { name: "Cagoth-ze, Lieutenant of Gellert", desc: "Powerful spellcaster harnessing the Scriptorium's Time Construct.", hp: 40, ac: 13, atk: 6, dmg: 6, xp: 115, gold: 80, items: ["bq_time_construct_gear"], weakCw: ["GOBLIN_PLAN"] },
        choices: [
          { t: "Stabilize the Time Construct and unbar the spiral stair descending to Level 3!", to: 4 }
        ]
      },
      4: {
        zone: "Restored Scriptorium",
        title: "Way to the Dwarven Barracks",
        text: "Old dwarven blueprints on the scribes' desks reveal an entire subterranean fortress level excavated 150 years ago directly beneath your boots!",
        onEnter: { healHp: 10, msg: "Claimed healing draughts from Maksilov's bench (+10 HP)!" },
        choices: [
          { t: "Prepare for Part 3: The Dwarven Barracks!", to: 5 }
        ]
      },
      5: {
        zone: "Level 2 Stairwell",
        title: "Drums Below",
        text: "Deep, guttural war-drums echo up from the dwarven halls below.",
        choices: [
          { t: "Unlock Part 3!", to: 6 }
        ]
      },
      6: {
        zone: "Redtower Camp",
        title: "Part 2 Complete",
        text: "Cagoth-ze's hold over the upper levels is shattered.",
        choices: [
          { t: "Complete Part 2!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Master of the Scriptorium",
        text: "Level 2 is cleared! <strong>Scarlet Citadel III: The Dwarven Barracks</strong> is now unlocked!",
        ending: { type: "true", title: "Breaker of the Scriptorium (Part 2 of 7)", xp: 155, gold: 145, trophy: "Maksilov's Ooze Vial" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. SCARLET CITADEL III: THE DWARVEN BARRACKS (7 PAGES • LV 5)
  // Part 3 of 7 (Prerequisite: bk_b11_sc_2_scriptorium)
  // ==========================================================
  bk_b11_sc_3_barracks: {
    id: "bk_b11_sc_3_barracks",
    reqQuest: "bk_b11_sc_2_scriptorium",
    title: "Scarlet Citadel III: The Dwarven Barracks",
    subtitle: "Part 3 of 7 • Trollkin Garrison & The Clacking Caverns",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Unlocks after Scarlet Citadel II",
    summary: "Fight through the grand subterranean barracks carved by dwarven mercenary ring-mages 150 years ago, break the occupying Trollkin warband, and survive the terrifying insectoid Swarm of the Clacking Caverns!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Level 3 • Dwarven Barracks",
        title: "Halls of Gerhardt's Mercenaries",
        safeRetreat: true,
        text: "Monumental dwarven pillars bear ring-mage runes—now defaced with crude trollkin war-paint! Hulking Trollkin Raiders bang spears against iron shields to block the main mess hall!",
        enemy: { name: "Barracks Trollkin Warband", desc: "Disciplined trollkin mercenaries holding Level 3 for Gellert.", hp: 48, ac: 14, atk: 7, dmg: 7, xp: 140, gold: 70, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Push past the dwarven ring-mage vaults into the echoing Clacking Caverns!", to: 2 }
        ]
      },
      2: {
        zone: "Level 3 • Clacking Caverns",
        title: "The Swarm & Trollkin Chief",
        text: "Chitinous clicking rattles through natural caverns adjoining the barracks as a monstrous subterranean Swarm and the armored Trollkin Garrison Chief converge on the rope-ladder shaft!",
        enemy: { name: "Trollkin Chief & Cavern Swarm", desc: "Brutal warband commander and skittering underground horrors.", hp: 58, ac: 15, atk: 8, dmg: 8, xp: 190, gold: 130, items: ["bq_dwarven_ring_mage_band"] },
        choices: [
          { t: "Secure the eighty-foot rope ladder dropping straight down into Level 4!", to: 3 }
        ]
      },
      3: {
        zone: "Shaft 317",
        title: "Eighty Feet Into Darkness",
        text: "Leathery wings flutter far below in the pitch-black abyss—the **Bat Caverns** await, where retreating back up the ladder under fire will be impossible!",
        onEnter: { healHp: 14, msg: "Secured the dwarven barracks armory (+14 HP)!" },
        choices: [
          { t: "Prepare for Part 4: Bat Caverns & The Diabolist!", to: 4 }
        ]
      },
      4: {
        zone: "Dwarven Armory",
        title: "Ring-Mage Lore",
        text: "Ancient dwarven journals warn that three bitter factions vie for control of the Bat Caverns below.",
        choices: [
          { t: "Unlock Part 4!", to: 5 }
        ]
      },
      5: {
        zone: "Redtower Inn",
        title: "Part 3 Complete",
        text: "The Dwarven Barracks stand clear of trollkin raiders.",
        choices: [
          { t: "Advance to Part 4!", to: 6 }
        ]
      },
      6: {
        zone: "Shaft Landing",
        title: "Ropes Checked",
        text: "You double-knot your harness for the eighty-foot descent.",
        choices: [
          { t: "Complete Part 3!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Conqueror of the Barracks",
        text: "Level 3 is won! <strong>Scarlet Citadel IV: Bat Caverns & The Diabolist</strong> is now unlocked!",
        ending: { type: "true", title: "Victor of the Dwarven Barracks (Part 3 of 7)", xp: 225, gold: 215, trophy: "Dwarven Ring-Mage Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. SCARLET CITADEL IV: BAT CAVERNS & THE DIABOLIST (7 PAGES • LV 6)
  // Part 4 of 7 (Prerequisite: bk_b11_sc_3_barracks)
  // ==========================================================
  bk_b11_sc_4_bat_caverns: {
    id: "bk_b11_sc_4_bat_caverns",
    reqQuest: "bk_b11_sc_3_barracks",
    title: "Scarlet Citadel IV: Bat Caverns & The Diabolist",
    subtitle: "Part 4 of 7 • Three Rival Factions & Infernal Vaults",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Unlocks after Scarlet Citadel III",
    summary: "Descend the eighty-foot rope ladder into the echoing Bat Caverns of Level 4, play three ruthless underworld factions against each other, and overthrow Gellert's Diabolist guarding the stairs to the Black River!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Level 4 • Bat Caverns",
        title: "Balance of Power",
        safeRetreat: true,
        text: "Stepping off the eighty-foot rope ladder into towering stalactite halls, you realize three rival factions—feral cavern stalkers, scheming shadow-dwellers, and Gellert's Diabolist cult—hold a tense stalemate!",
        choices: [
          { t: "Use stealth and cunning diplomacy to pit two rival factions against each other!", badge: "Persuasion / Stealth DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 2, fail: 2, passMsg: "Chaos erupts across the Bat Caverns—drawing the Diabolist's devils away!", failMsg: "Winged bat-horrors shriek your position across the cavern!" }, onPass: { cw: "FACTIONS_DIVIDED" } },
          { t: "Fight straight through the shrieking cavern sentries!", to: 2 }
        ]
      },
      2: {
        zone: "Level 4 • Guano Gallery",
        title: "Winged Cavern Predators",
        text: "Monstrous cave-bats and bound infernal imps dive out of the darkness around the sulfur-lit pillars!",
        enemy: { name: "Cavern Dire-Bats & Imps", desc: "Screaming winged guardians patrolling the Diabolist's halls.", hp: 54, ac: 15, atk: 8, dmg: 8, xp: 160, gold: 75, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1, weakCw: ["FACTIONS_DIVIDED"] },
        choices: [
          { t: "Storm the brimstone summoning circle of the Citadel Diabolist!", to: 3 }
        ]
      },
      3: {
        zone: "Level 4 • Diabolist's Sanctum",
        title: "The Citadel Diabolist",
        text: "Wreathed in hellfire beside a bound Barbed Devil stands Gellert's loyal Diabolist, sworn to bar all intruders from descending to the Black River! 'None reach the master's river alive!'",
        enemy: { name: "Gellert's Diabolist & Barbed Devil", desc: "Infernal summoner and fiendish bodyguard holding Level 4.", hp: 68, ac: 15, atk: 8, dmg: 9, xp: 225, gold: 155, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["FACTIONS_DIVIDED"] },
        choices: [
          { t: "Banish the devil and unlock the wet stone stairs descending to the Black River!", to: 4 }
        ]
      },
      4: {
        zone: "Stair to Level 5",
        title: "Murmur of Dark Waters",
        text: "Cold, ley-charged air rises from the oldest level of the Scarlet Citadel—where the mysterious subterranean **Black River** flows!",
        onEnter: { healHp: 14, msg: "Claimed infernal ward-tonics (+14 HP)!" },
        choices: [
          { t: "Prepare for Part 5: The Black River!", to: 5 }
        ]
      },
      5: {
        zone: "Bat Caverns Overlook",
        title: "Part 4 Complete",
        text: "The Diabolist's blockade is broken.",
        choices: [
          { t: "Unlock Part 5!", to: 6 }
        ]
      },
      6: {
        zone: "Deep Threshold",
        title: "Lanterns Lit",
        text: "Strange violet ripples glow far below.",
        choices: [
          { t: "Complete Part 4!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Master of the Bat Caverns",
        text: "Level 4 is conquered! <strong>Scarlet Citadel V: The Black River</strong> is now unlocked!",
        ending: { type: "true", title: "Bane of the Diabolist (Part 4 of 7)", xp: 260, gold: 245, trophy: "Brimstone Summoning Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. SCARLET CITADEL V: THE BLACK RIVER (7 PAGES • LV 8)
  // Part 5 of 7 (Prerequisite: bk_b11_sc_4_bat_caverns)
  // ==========================================================
  bk_b11_sc_5_black_river: {
    id: "bk_b11_sc_5_black_river",
    reqQuest: "bk_b11_sc_4_bat_caverns",
    title: "Scarlet Citadel V: The Black River",
    subtitle: "Part 5 of 7 • Shadow Currents & The Horror in the Pool",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Unlocks after Scarlet Citadel IV",
    summary: "Enter the oldest level of the Scarlet Citadel where the paradoxical Black River flows along intersecting shadow roads and ley lines—and slay the eldritch Horror in the Pool guarding the descent to the Howling Halls!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Level 5 • Banks of the Black River",
        title: "The Reversing Current",
        safeRetreat: true,
        text: "A glossy subterranean river flows silently through ancient obsidian docks—then abruptly reverses its current in a pulse of blue ley-line magic! Shadow-fey river-stalkers emerge from the dark mist!",
        enemy: { name: "Black River Shadow-Stalkers", desc: "Planar river-beasts drawn to the shadow road's overlap.", hp: 66, ac: 16, atk: 9, dmg: 10, xp: 200, gold: 95, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Cross the ley-lit ferry stone toward the deep Pool at the far bend!", to: 2 }
        ]
      },
      2: {
        zone: "Level 5 • The Deep Pool",
        title: "Horror in the Pool",
        text: "Boiling up from the confluence of water, shadow road, and ley energy rises an ancient, tentacled eldritch **Horror in the Pool** that Gellert uses to guard the stair to Level 6!",
        enemy: { name: "The Horror in the Pool", desc: "Abyssal shadow-river monstrosity guarding the lowest stairs.", hp: 84, ac: 16, atk: 10, dmg: 11, xp: 295, gold: 195, items: ["bq_black_river_oar_staff"] },
        choices: [
          { t: "Step through the screaming wind-gate descending into Level 6: The Howling Halls!", to: 3 }
        ]
      },
      3: {
        zone: "Threshold of the Howling Halls",
        title: "Roar of the Vacuum",
        text: "A gale blasts past your cloak, pulling air down toward the deepest chamber of the citadel—where a Sphere of Annihilation feeds Gellert's Void research!",
        onEnter: { healHp: 18, msg: "Attuned to the ley current (+18 HP)!" },
        choices: [
          { t: "Prepare for Part 6: The Howling Halls!", to: 4 }
        ]
      },
      4: {
        zone: "Black River Quay",
        title: "Part 5 Complete",
        text: "The Black River's ancient terror is vanquished.",
        choices: [
          { t: "Unlock Part 6!", to: 5 }
        ]
      },
      5: {
        zone: "Obsidian Pier",
        title: "Steadying Your Boots",
        text: "Only the Howling Halls and Gellert himself remain.",
        choices: [
          { t: "Advance to Part 6!", to: 6 }
        ]
      },
      6: {
        zone: "Wind-Gate",
        title: "Gale Rising",
        text: "You brace your shield against the pull of the abyss.",
        choices: [
          { t: "Complete Part 5!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Navigator of the Black River",
        text: "Level 5 is cleared! <strong>Scarlet Citadel VI: The Howling Halls</strong> is now unlocked!",
        ending: { type: "true", title: "Conqueror of the Black River (Part 5 of 7)", xp: 330, gold: 315, trophy: "Ley-Line River Pearl" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. SCARLET CITADEL VI: THE HOWLING HALLS (7 PAGES • LV 9)
  // Part 6 of 7 (Prerequisite: bk_b11_sc_5_black_river)
  // ==========================================================
  bk_b11_sc_6_howling_halls: {
    id: "bk_b11_sc_6_howling_halls",
    reqQuest: "bk_b11_sc_5_black_river",
    title: "Scarlet Citadel VI: The Howling Halls",
    subtitle: "Part 6 of 7 • Vacuum Cyclones & Sphere of Annihilation",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Unlocks after Scarlet Citadel V",
    summary: "Endure howling vacuum winds torn through Level 6 by a floating Sphere of Annihilation, survive elemental maelstroms, and smash the Void Sentinels sealing Gellert the Gruesome's inner sanctum!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Level 6 • The Howling Halls",
        title: "Pull of the Sphere",
        safeRetreat: true,
        text: "Screaming cyclones tear loose stones down the carved corridors toward Area 610, where a pitch-black Sphere of Annihilation devours the very air! You must anchor yourself against the vacuum while elemental storm-horrors strike!",
        choices: [
          { t: "Brace against the howling vacuum wind and slip into the Abandoned Refuge!", badge: "Might / Athletics DC 14", check: { stat: "might", skill: "Athletics", dc: 14, pass: 2, fail: 2, failDmg: 8, passMsg: "You slam the wind-baffle door shut—calming the gale in the outer hall!", failMsg: "Flying stone shards batter you (-8 HP) before you reach cover!" }, onPass: { cw: "WIND_BAFFLED" } },
          { t: "Charge straight through the elemental maelstrom!", to: 2 }
        ]
      },
      2: {
        zone: "Level 6 • Chamber of the Sphere",
        title: "Void-Storm Sentinels",
        text: "Crackling Void Elementals and twisted ley-constructs rise around the humming black Sphere to shred anyone approaching Gellert's sanctuary!",
        enemy: { name: "Howling Hall Void Sentinels", desc: "Elemental maelstrom horrors fueled by intersecting ley lines.", hp: 92, ac: 17, atk: 11, dmg: 12, xp: 330, gold: 215, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["WIND_BAFFLED"] },
        choices: [
          { t: "Unseal the obsidian doors to Gellert the Gruesome's Inner Sanctum!", to: 3 }
        ]
      },
      3: {
        zone: "Area 611 • Abandoned Refuge",
        title: "Calm Before the Finale",
        text: "Within the sole sheltered alcove of the Howling Halls, you catch a precious breath—beyond the next door waits the legendary sorcerer himself!",
        onEnter: { healHp: 20, restoreMp: 8, msg: "Rested in the Abandoned Refuge (+20 HP, +8 MP)!" },
        choices: [
          { t: "Prepare for the Grand Finale: Part 7 — Gellert the Gruesome!", to: 4 }
        ]
      },
      4: {
        zone: "Sanctum Doors",
        title: "Part 6 Complete",
        text: "Every lieutenant and guardian of the Scarlet Citadel has fallen.",
        choices: [
          { t: "Unlock Part 7!", to: 5 }
        ]
      },
      5: {
        zone: "Ley Nexus",
        title: "Void Hum",
        text: "Your weapons vibrate with the raw power of the deep earth.",
        choices: [
          { t: "Advance to Part 7!", to: 6 }
        ]
      },
      6: {
        zone: "Obsidian Threshold",
        title: "Final Confrontation",
        text: "House Holzanger's dark legacy ends tonight.",
        choices: [
          { t: "Complete Part 6!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Survivor of the Howling Halls",
        text: "You braved the Sphere of Annihilation! <strong>Scarlet Citadel VII: Gellert the Gruesome</strong> is now unlocked!",
        ending: { type: "true", title: "Walker of the Howling Halls (Part 6 of 7)", xp: 375, gold: 355, trophy: "Wind-Carved Ley Crystal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. SCARLET CITADEL VII: GELLERT THE GRUESOME (7 PAGES • LV 10)
  // Part 7 of 7 (Prerequisite: bk_b11_sc_6_howling_halls)
  // ==========================================================
  bk_b11_sc_7_gellert: {
    id: "bk_b11_sc_7_gellert",
    reqQuest: "bk_b11_sc_6_howling_halls",
    title: "Scarlet Citadel VII: Gellert the Gruesome",
    subtitle: "Part 7 of 7 • The Void Nexus & Final Showdown",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Unlocks after Scarlet Citadel VI",
    summary: "Confront the unifying villain of the entire Scarlet Citadel—Gellert the Gruesome, last scion of House Holzanger—at the blinding intersection of Void magic and ley energy, and end his shadow over Redtower forever!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Gellert's Void Sanctum",
        title: "Scion of House Holzanger",
        safeRetreat: true,
        text: "Floating amid crisscrossing rivers of violet ley light stands the gaunt, terrifying master of the Scarlet Citadel—**Gellert the Gruesome**! 'You slew my Gaoler, broke my Scriptorium, and crossed my Black River? Then behold the majesty of the Void itself!'",
        choices: [
          { t: "Disrupt his ley-line focus crystal before he unleashes his grand Void spell!", badge: "Arcana / Agility DC 15", check: { stat: "arcana", skill: "Arcana", dc: 15, pass: 2, fail: 2, failDmg: 9, passMsg: "Crack! The focus crystal splinters—robbing Gellert of his ley-shield!", failMsg: "Void lightning sears you (-9 HP) as Gellert laughs!" }, onPass: { cw: "LEY_BROKEN" } },
          { t: "Charge straight through the violet storm at Gellert the Gruesome!", to: 2 }
        ]
      },
      2: {
        zone: "The Void Nexus",
        title: "Battle for the Scarlet Citadel",
        text: "Channeling screaming spheres of Void energy and undead guardians of House Holzanger, Gellert the Gruesome fights with centuries of cold malice!",
        enemy: { name: "Gellert the Gruesome", desc: "Legendary Void-sorcerer and master of the Scarlet Citadel.", hp: 114, ac: 18, atk: 12, dmg: 14, xp: 430, gold: 320, items: ["bq_gellert_void_grimoire"], weakCw: ["LEY_BROKEN"] },
        choices: [
          { t: "Shatter Gellert's Void lectern and seal the deep ley nexus forever!", to: 3 }
        ]
      },
      3: {
        zone: "The Quiet Nexus",
        title: "End of a Dark Legacy",
        text: "With Gellert the Gruesome vanquished, the howling vacuum winds die away and the oppressive dread lifts from every stone of the seven-level mega-dungeon!",
        choices: [
          { t: "Ascend in triumph back to the sunlit hills of Redtower!", to: 4 }
        ]
      },
      4: {
        zone: "Village of Redtower",
        title: "Heroes of the Scarlet Citadel",
        text: "Bells ring wildly across Redtower as townsfolk hoist you onto their shoulders—the shadow that loomed over their hill for generations is gone!",
        choices: [
          { t: "Accept the town's grand tribute and royal commendation.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Guildhall",
        title: "Seven Levels Conquered",
        text: "Your complete conquest of the Scarlet Citadel is recorded in gold ink at the Guildhall.",
        choices: [
          { t: "Celebrate your mythic campaign victory!", to: 6 }
        ]
      },
      6: {
        zone: "Rusty Flagon Tavern",
        title: "Legends of the Frontier",
        text: "Every patron raises a tankard to the conqueror of Gellert the Gruesome.",
        choices: [
          { t: "Complete the Scarlet Citadel saga!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Conqueror of the Scarlet Citadel",
        text: "From the Ruins Above to the Howling Halls, you mastered all seven levels of the Scarlet Citadel!",
        ending: { type: "true", title: "Slayer of Gellert the Gruesome (7/7 Complete)", xp: 485, gold: 475, trophy: "Shattered Crown of House Holzanger" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. DARK NIGHT AT THE ODEUM (6 PAGES • LV 7)
  // ==========================================================
  bk_b11_p2_7_odeum: {
    id: "bk_b11_p2_7_odeum",
    title: "Dark Night at the Odeum",
    subtitle: "Fey Theater of Crones & The Herald of Darkness",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Shaken Theater Patron (Rusty Flagon Tavern)",
    summary: "Attend an eerie midnight performance at a twilight Odeum where three prophetic crones recite your darkest secrets aloud—before the impossibly tall, dreadful Herald of Darkness steps onto the stage!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Twilight Odeum",
        title: "Act Two: The Crones' Verses",
        safeRetreat: true,
        text: "Beneath velvet shadows, three cackling crones onstage suddenly turn directly toward you—reciting private memories no mortal stranger could ever know! Then the curtains part for an impossibly tall, dreadful elven figure: the **Herald of Darkness**!",
        choices: [
          { t: "Steel your mind against her enchanting, melancholy song!", badge: "Spirit DC 14", check: { stat: "spirit", skill: "Lore", dc: 14, pass: 2, fail: 2, failDmg: 7, passMsg: "You resist her dreadful melody and leap straight onto the stage!", failMsg: "Sorrowful dread chills your marrow (-7 HP) as her priests close in!" }, onPass: { cw: "SONG_RESISTED" } },
          { t: "Vault over the orchestra pit with weapon drawn!", to: 2 }
        ]
      },
      2: {
        zone: "Odeum Stage",
        title: "The Herald of Darkness",
        text: "As the fey audience writhes in dark ecstasy, the Herald of Darkness and her three shadow-priests unleash waves of blinding gloom across the footlights!",
        enemy: { name: "Herald of Darkness & Priests", desc: "Dreadful fey master of ceremonies and her shadow-clergy.", hp: 74, ac: 16, atk: 9, dmg: 11, xp: 265, gold: 180, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["SONG_RESISTED"] },
        choices: [
          { t: "Shatter the shadow-lanterns to break the Odeum's spell over the mortal guests!", to: 3 }
        ]
      },
      3: {
        zone: "Empty Theater",
        title: "Curtain Call",
        text: "The dreadful stage dissolves into morning mist, freeing the stunned mortal audience—who reward you handsomely for snapping them out of the fey trance.",
        choices: [
          { t: "Return to Oakhaven.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Square",
        title: "Playbill of Ash",
        text: "Only a single silver theater mask remains in your pack as proof of the night.",
        choices: [
          { t: "Collect your reward.", to: 5 }
        ]
      },
      5: {
        zone: "Rusty Flagon Tavern",
        title: "Cheerful Music",
        text: "A lively tavern lute has never sounded sweeter.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Breaker of the Dark Odeum",
        text: "You defied the Herald of Darkness and saved the theater's captive audience.",
        ending: { type: "true", title: "Encore of the Odeum", xp: 295, gold: 280, trophy: "Silver Mask of the Odeum" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. THE TANGLED TEMPLE (6 PAGES • LV 8)
  // ==========================================================
  bk_b11_p2_8_tangled_temple: {
    id: "bk_b11_p2_8_tangled_temple",
    title: "The Tangled Temple",
    subtitle: "Root-Choked Ruins & The Vine Troll Skeleton",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Excavation Leader (Rusty Flagon Tavern)",
    summary: "Enter an overgrown jungle shrine where grasping ceiling roots conceal an awakened, lashing Vine Troll Skeleton—defeat the malevolent guardian and claim the glyph-carved Staff of the Python!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Overgrown Shrine",
        title: "Eyes in the Ceiling Tangle",
        safeRetreat: true,
        text: "Thick roots burst through ancient glyph-carved stone above gilded funerary urns. Excavators fled screaming when the tangled ceiling itself reached down and snatched their lanterns!",
        choices: [
          { t: "Scan the knotted canopy carefully before touching the urns!", badge: "Perception DC 14", check: { stat: "spirit", skill: "Perception", dc: 14, pass: 2, fail: 2, failDmg: 7, passMsg: "You spot the skeletal troll woven into the vines and dodge its first lash!", failMsg: "Whipping vines trip you hard (-7 HP) as the guardian drops!" }, onPass: { cw: "TANGLE_SPOTTED" } },
          { t: "Slash the hanging vines and step boldly into the sanctuary!", to: 2 }
        ]
      },
      2: {
        zone: "Root-Choked Sanctum",
        title: "The Vine Troll Skeleton",
        text: "Swinging effortlessly between whipping ceiling tendrils, the ancient undead Vine Troll Skeleton lunges with bone-rending claws!",
        enemy: { name: "Awakened Vine Troll Skeleton", desc: "Malevolent root-bound undead guardian of the buried temple.", hp: 82, ac: 16, atk: 10, dmg: 11, undead: true, xp: 285, gold: 185, items: ["bq_tangled_python_staff"], weakCw: ["TANGLE_SPOTTED"] },
        choices: [
          { t: "Claim the glyph-carved Staff of the Python and the gilded temple urns!", to: 3 }
        ]
      },
      3: {
        zone: "Temple Steps",
        title: "Excavation Safe",
        text: "The grateful scholars reward you richly for clearing the lethal shrine.",
        choices: [
          { t: "Return to Oakhaven.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Market",
        title: "Ancient Gold",
        text: "Jewelry from the temple urns fetches a fine price.",
        choices: [
          { t: "Pocket your coin.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Guildhall",
        title: "Serpent Staff",
        text: "The carved glyphs on your Staff of the Python gleam with old woodland magic.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Conqueror of the Tangled Temple",
        text: "The Vine Troll Skeleton is laid to rest and the shrine's relics are yours.",
        ending: { type: "true", title: "Master of the Tangled Temple", xp: 320, gold: 305, trophy: "Gilded Temple Urn" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. THE SPARKING SPIRE (6 PAGES • LV 9)
  // ==========================================================
  bk_b11_p2_9_sparking_spire: {
    id: "bk_b11_p2_9_sparking_spire",
    title: "The Sparking Spire",
    subtitle: "Lightning-Charged Tower & Runaway Storm Construct",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Alarmed Valley Artificer (Rusty Flagon Tavern)",
    summary: "Climb an abandoned arcane lightning-spire whose cracked storm-capacitors have awakened a rampaging Lightning Construct threatening to fry the surrounding valley!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Base of the Sparking Spire",
        title: "Crackling Copper Stairs",
        safeRetreat: true,
        text: "Blue arcs dance across copper stair-rails as rogue storm-sparks animate brass sentinel-drones on the lower landings!",
        enemy: { name: "Spire Spark-Drones", desc: "Overcharged copper constructs jolting intruders.", hp: 74, ac: 16, atk: 10, dmg: 11, xp: 235, gold: 105, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Ascend to the crackling Apex Capacitor!", to: 2 }
        ]
      },
      2: {
        zone: "Apex Capacitor",
        title: "The Runaway Storm-Colossus",
        text: "Surrounded by spinning copper rings shooting thunderbolts into the clouds stands a towering, overcharged Storm-Colossus!",
        enemy: { name: "Overcharged Storm-Colossus", desc: "Massive lightning-infused construct on the verge of overload.", hp: 92, ac: 17, atk: 11, dmg: 12, xp: 330, gold: 215, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Throw the grounding breaker to bleed the lightning harmlessly into the earth!", to: 3 }
        ]
      },
      3: {
        zone: "Valley Meadow",
        title: "Static Cleared",
        text: "The blinding arcs vanish from the spire's crown as grateful artificers cheer below.",
        choices: [
          { t: "Accept the valley's reward.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Road",
        title: "Quiet Clouds",
        text: "Your hair finally settles back down from the static charge.",
        choices: [
          { t: "Return to town.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Forge",
        title: "Salvaged Copper",
        text: "Fine conductive coils bring a tidy bonus.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Grounder of the Sparking Spire",
        text: "The runaway storm construct is shut down and the valley is safe.",
        ending: { type: "true", title: "Tamer of the Sparking Spire", xp: 365, gold: 350, trophy: "Copper Lightning Rod" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. VALLEY OF BLACK TEARS (6 PAGES • LV 10)
  // ==========================================================
  bk_b11_p2_10_black_tears: {
    id: "bk_b11_p2_10_black_tears",
    title: "Valley of Black Tears",
    subtitle: "Trail of Shadows & Lurinax, Master of Visions",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Haunted Seer (Rusty Flagon Tavern)",
    summary: "Brave the dead wood where even the stones weep, survive the gibbering mouthers and the painted Ocular Sigil, and defeat the wicked oracular spirit naga Lurinax, Master of Visions!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Trail of Shadows",
        title: "Weeping Stones",
        safeRetreat: true,
        text: "Through a dead forest whose shadows dredge up bitter memories, black droplets weep down canyon walls toward the bone-strewn lair of evil oracle Lurinax—who divined the season the world will end!",
        enemy: { name: "Eyes of Lurinax (Gibbering Mouthers)", desc: "Maddening multi-eyed horrors babbling forbidden prophecies.", hp: 82, ac: 16, atk: 11, dmg: 11, xp: 255, gold: 120, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Step onto the painted Ocular Sigil to confront Lurinax himself!", to: 2 }
        ]
      },
      2: {
        zone: "Meditation Mound of Bones",
        title: "Lurinax, Master of Visions",
        text: "Coiled atop splintered bones beside arcane tomes rises a colossal spectral serpent with a bearded old man's head and shadowy arms—the wicked spirit naga Lurinax! The floor's glowing Ocular Sigil flares with impending doom!",
        enemy: { name: "Lurinax, Oracular Spirit Naga", desc: "Centuries-old serpent oracle guarding end-of-days prophecies.", hp: 104, ac: 17, atk: 12, dmg: 13, xp: 380, gold: 265, items: ["bq_lurinax_ocular_charm"] },
        choices: [
          { t: "Scatter Lurinax's dark ritual mortar and free the trapped souls of his victims!", to: 3 }
        ]
      },
      3: {
        zone: "Quiet Valley",
        title: "The Stones Stop Weeping",
        text: "As Lurinax falls, the maddening winds die down and sunlit mist replaces the suffocating gloom.",
        choices: [
          { t: "Recover the fallen victims' heirlooms and depart the valley.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Guildhall",
        title: "Dark Prophecy Contained",
        text: "Wise scholars reward you generously for keeping Lurinax's doom-lore out of cultist hands.",
        choices: [
          { t: "Return to town.", to: 5 }
        ]
      },
      5: {
        zone: "Rusty Flagon Tavern",
        title: "Clear Mind",
        text: "Your Ocular Prism gleams quietly—free of maddening whispers.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Vanquisher of Lurinax",
        text: "The Valley of Black Tears rests silent and Lurinax's dark visions are ended.",
        ending: { type: "true", title: "Silencer of Black Tears", xp: 420, gold: 410, trophy: "Lurinax's Calendar Astrolabe" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 12. A SHROUD FOR AGANATHA (6 PAGES • LV 11)
  // ==========================================================
  bk_b11_p2_11_aganatha: {
    id: "bk_b11_p2_11_aganatha",
    title: "A Shroud for Aganatha",
    subtitle: "The Cursed Reliquary & Restless Shadow-Queen",
    difficulty: "Deadly",
    recommendedLevel: 11,
    autoDiscover: false,
    discoverySource: "Weeping Funerary Priest (Rusty Flagon Tavern)",
    summary: "Enter a frost-rimmed obsidian reliquary where the unburied spirit of ancient shadow-queen Aganatha raises ghostly legions—defeat her spectral honor guard and drape the consecrated shroud to lay her to final rest!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Obsidian Reliquary",
        title: "Court of the Unburied",
        safeRetreat: true,
        text: "Silver cobwebs drape frozen marble columns where Aganatha's spectral honor guard patrols in silent lockstep!",
        enemy: { name: "Aganatha's Spectral Honor Guard", desc: "Frost-wreathed phantom knights defending their restless queen.", hp: 88, ac: 17, atk: 11, dmg: 12, undead: true, xp: 295, gold: 145, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Carry the blessed silver shroud into Aganatha's Throne-Crypt!", to: 2 }
        ]
      },
      2: {
        zone: "Throne-Crypt of Aganatha",
        title: "The Restless Shadow-Queen",
        text: "Crowned in swirling shadow-frost, the towering phantom Queen Aganatha shrieks in centuries-old sorrow as necrotic lightning arcs across the crypt!",
        enemy: { name: "Queen Aganatha, Shadow-Wraith", desc: "Mighty undead sovereign trapped between life and rest.", hp: 112, ac: 18, atk: 12, dmg: 14, undead: true, xp: 420, gold: 295, items: ["bq_aganatha_shroud"] },
        choices: [
          { t: "Drape the consecrated shroud over her sarcophagus to grant her eternal peace!", to: 3 }
        ]
      },
      3: {
        zone: "Peaceful Reliquary",
        title: "A Crown Laid Down",
        text: "The shadow-frost melts into gentle silver dew as Aganatha's spirit bows gracefully and fades into the dawn.",
        onEnter: { healHp: 20, msg: "Aganatha's peaceful departure restores your spirit (+20 HP)!" },
        choices: [
          { t: "Report back to the funerary priest.", to: 4 }
        ]
      },
      4: {
        zone: "Temple of the Dawn",
        title: "Rite Fulfilled",
        text: "The temple clergy honor your mercy with consecrated gold.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Square",
        title: "Quiet Night",
        text: "The ghostly chimes no longer haunt the northern hills.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Rest-Bringer for Aganatha",
        text: "Queen Aganatha sleeps in peace, and her reliquary troubles the living no more.",
        ending: { type: "true", title: "Bearer of Aganatha's Shroud", xp: 465, gold: 450, trophy: "Silver Funerary Diadem" },
        choices: []
      }
    }
  }
});
