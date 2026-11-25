/* ============================================================
   BOOK QUESTS — BATCH 007 (11 Quests • 6-Part Mega-Campaign + 3-Part Trilogy!)
   Sources:
   - Empire of the Ghouls (Chapters I–VI — Complete 6-Part Campaign!)
   - City of Cats: Three Little Pigs (Completes City of Cats!)
   - Hidden Tomb of Nargoth (Parts I–III — Complete 3-Part Series!)
   - Last Gasp (Complete!)
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. EMPIRE OF THE GHOULS I: DREAD CHAMBERS OF THE UNDERCITY (8 PAGES • LV 2)
  // Part 1 of 6
  // ==========================================================
  bk_b7_eog_1_undercity: {
    id: "bk_b7_eog_1_undercity",
    title: "Empire of the Ghouls I: Dread Chambers of the Undercity",
    subtitle: "Empire of the Ghouls (Part 1 of 6) • Zobeck Catacombs & Temple of Marena",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Desperate Kobold & Zobeck Watch (Rusty Flagon Tavern)",
    summary: "Investigate mysterious disappearances beneath Zobeck's Crown Square, treat with the Court of the Kobold King, descend into the Zobeck Catacombs, and disrupt the darakhul cult inside the hidden Temple of Marena.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Zobeck • Kobold Ghetto",
        title: "The Desperate Kobold",
        safeRetreat: true,
        text: "Citizens south of Crown Square have been vanishing into the night, and angry mobs blame the Kobold Ghetto! A trembling kobold runner grabs your sleeve: 'We didn't take them—pale bone-eaters from the cartways did! Please, speak to the Kobold King before the mob burns us!'",
        choices: [
          { t: "Calm the angry mob and win safe passage to the Court of the Kobold King.", badge: "Persuasion DC 11", check: { stat: "spirit", skill: "Persuasion", dc: 11, pass: 2, fail: 2, passMsg: "The crowd stands down—the Kobold King gifts you a map of the Zobeck Catacombs!", failMsg: "You push past the shouting crowd into the cramped ghetto tunnels." }, onPass: { cw: "KOBOLD_MAP" } },
          { t: "Head straight down the iron cartway grates into the Zobeck Catacombs!", to: 2 }
        ]
      },
      2: {
        zone: "Zobeck Catacombs",
        title: "Cartway Stalkers",
        text: "Damp masonry stretches beneath Zobeck's bustling streets. Snarling bone-pale Ghouls and their iron-shod darakhul scout leap out from behind stacked caskets!",
        enemy: { name: "Undercity Ghoul Scouts", desc: "Flesh-hungry ghouls kidnapping Zobeck citizens for the Imperium.", hp: 24, ac: 11, atk: 4, dmg: 4, undead: true, xp: 55, gold: 25, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["KOBOLD_MAP"] },
        choices: [
          { t: "Follow the crimson wax-drippings to the hidden Temple of Marena!", to: 3 }
        ]
      },
      3: {
        zone: "Temple of Marena",
        title: "Red Sisters & Darakhul",
        text: "Beneath a blood-red mosaic of Marena stands a rogue darakhul envoy of High Priest Radomir Marrowblight, inspecting bound Zobeck prisoners! 'The Creed of All Flesh rises—none shall warn the surface!'",
        enemy: { name: "Darakhul Temple Envoy", desc: "Armored ghoul agent forging an alliance beneath Zobeck.", hp: 32, ac: 12, atk: 5, dmg: 5, undead: true, xp: 85, gold: 55, items: rollRandomLoot(["weapon", "accessory"], 1, "rare"), weakCw: ["KOBOLD_MAP"] },
        choices: [
          { t: "Free the captive Zobeck citizens and seize the darakhul's coded dispatches!", to: 4 }
        ]
      },
      4: {
        zone: "Temple of Marena",
        title: "Whispers of the Clockwork Oracle",
        text: "The dispatches mention a high-priority hunt for exiled Krakovan Archduke Avgost Walerska—and back above ground, Zobeck's patron goddess Rava's Clockwork Oracle awakens calling your name!",
        onEnter: { healHp: 8, msg: "Rescued the captives and caught your breath (+8 HP)!" },
        choices: [
          { t: "Escort the citizens safely back to Crown Square.", to: 5 }
        ]
      },
      5: {
        zone: "Crown Square",
        title: "Kobolds Vindicated",
        text: "With the real culprits exposed, the Kobold Ghetto is spared and Zobeck's guildmasters pay a handsome bounty.",
        choices: [
          { t: "Prepare for Chapter II: The Holy Robes of Sister Adelind!", to: 6 }
        ]
      },
      6: {
        zone: "Temple of Rava",
        title: "Chapter I Complete",
        text: "The brass gears of the Clockwork Oracle click ominously—the Ghoul Imperium's true plot has only begun.",
        choices: [
          { t: "Unlock Chapter II!", to: 7 }
        ]
      },
      7: {
        zone: "Zobeck Square",
        title: "Girding for the Mountains",
        text: "Your pack is stocked for the mountain road to the Ironcrags.",
        choices: [
          { t: "Complete Chapter I!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Shadow Beneath Zobeck",
        text: "You shattered the Undercity cell! <strong>Empire of the Ghouls II: The Holy Robes of Sister Adelind</strong> is now unlocked!",
        ending: { type: "true", title: "Defender of Zobeck (Empire of Ghouls I)", xp: 125, gold: 115, trophy: "Darakhul Cipher-Scroll" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. EMPIRE OF THE GHOULS II: THE HOLY ROBES OF SISTER ADELIND (8 PAGES • LV 4)
  // Part 2 of 6 (Prerequisite: bk_b7_eog_1_undercity)
  // ==========================================================
  bk_b7_eog_2_sister_adelind: {
    id: "bk_b7_eog_2_sister_adelind",
    reqQuest: "bk_b7_eog_1_undercity",
    title: "Empire of the Ghouls II: The Holy Robes of Sister Adelind",
    subtitle: "Empire of the Ghouls (Part 2 of 6) • Ironcrags, Jozht & Castle Orzelbirg",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Unlocks after Empire of the Ghouls I",
    summary: "Heed the Clockwork Oracle of Rava, cross the mountain road through the Black Canton to find exiled Archduke Avgost Walerska, outwit darakhul spymaster Vukas Shroudson, and storm Castle Orzelbirg for the Holy Robes of Sister Adelind!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Ironcrags • Black Canton",
        title: "The Clockwork Oracle's Charge",
        safeRetreat: true,
        text: "Rava's Clockwork Oracle warned that darakhul High Priest Radomir Marrowblight seeks the royal blood of Archduke Avgost Walerska! Crossing the mountain road to the dwarven Black Canton and Free City of Jozht, you learn spymaster Vukas Shroudson's agents are closing in on the Archduke—and the sacred Holy Robes of Sister Adelind inside dread Castle Orzelbirg!",
        choices: [
          { t: "Secure shelter for Archduke Avgost at Jozht's Temple of the Shield Maiden first!", to: 2, onChoose: { cw: "AVGOST_SHELTERED", healHp: 10, msg: "Shielded Archduke Avgost in Jozht and rested (+10 HP)!" } },
          { t: "March straight across the haunted Ruins of Yarosbirg toward Castle Orzelbirg!", to: 2 }
        ]
      },
      2: {
        zone: "Ruins of Yarosbirg",
        title: "Vampire & Ghoul Skirmishers",
        text: "Beneath storm-torn battlements in conquered Krakovar, undead patrols serving Vukas Shroudson ambush you among the shattered stone walls!",
        enemy: { name: "Krakovar Undead Patrol", desc: "Darakhul scouts and vampire thralls hunting royal survivors.", hp: 40, ac: 13, atk: 6, dmg: 7, undead: true, xp: 105, gold: 50, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["AVGOST_SHELTERED"] },
        choices: [
          { t: "Scale the crags to the Dread Fortress of Castle Orzelbirg!", to: 3 }
        ]
      },
      3: {
        zone: "Castle Orzelbirg • Upper Tower",
        title: "Spymaster Vukas Shroudson",
        text: "Inside the towering chapel of Castle Orzelbirg, darakhul spymaster Vukas Shroudson stands over the reliquary holding the Holy Robes of Sister Adelind! 'Avgost's blood will unlock the Hunger God's secret—you are too late!'",
        enemy: { name: "Vukas Shroudson, Darakhul Spymaster", desc: "Cunning undead lieutenant of Radomir Marrowblight.", hp: 48, ac: 14, atk: 7, dmg: 8, undead: true, xp: 155, gold: 100, items: ["bq_adelind_holy_robes"], weakCw: ["AVGOST_SHELTERED"] },
        choices: [
          { t: "Reclaim the Holy Robes of Sister Adelind and escape Castle Orzelbirg!", to: 4 }
        ]
      },
      4: {
        zone: "Free City of Jozht",
        title: "Omen From the North",
        text: "Delivering the Holy Robes to the Temple of the Shield Maiden strengthens Jozht's wards—yet haunted dwarves arrive from across the Nieder Strait whispering of Ragnarok and an unholy Blood Marriage!",
        choices: [
          { t: "Prepare for Chapter III: The Blood Marriage!", to: 5 }
        ]
      },
      5: {
        zone: "Temple of the Shield Maiden",
        title: "Archduke's Gratitude",
        text: "Archduke Avgost Walerska thanks you solemnly as priests bless your northern voyage.",
        choices: [
          { t: "Unlock Chapter III!", to: 6 }
        ]
      },
      6: {
        zone: "Mountain Road",
        title: "Chapter II Complete",
        text: "Vukas Shroudson is beaten, yet the Creed of All Flesh turns its gaze northward.",
        choices: [
          { t: "Advance to Chapter III!", to: 7 }
        ]
      },
      7: {
        zone: "Harbor of the North",
        title: "Boarding the Longship",
        text: "Cold salt winds fill the sails bound for Huldramose.",
        choices: [
          { t: "Complete Chapter II!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Bearer of Sister Adelind's Robes",
        text: "Castle Orzelbirg's reliquary is reclaimed! <strong>Empire of the Ghouls III: The Blood Marriage</strong> is now unlocked!",
        ending: { type: "true", title: "Champion of Castle Orzelbirg (Empire of Ghouls II)", xp: 185, gold: 170, trophy: "Vukas Shroudson's Signet" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. EMPIRE OF THE GHOULS III: THE BLOOD MARRIAGE (8 PAGES • LV 6)
  // Part 3 of 6 (Prerequisite: bk_b7_eog_2_sister_adelind)
  // ==========================================================
  bk_b7_eog_3_blood_marriage: {
    id: "bk_b7_eog_3_blood_marriage",
    reqQuest: "bk_b7_eog_2_sister_adelind",
    title: "Empire of the Ghouls III: The Blood Marriage",
    subtitle: "Empire of the Ghouls (Part 3 of 6) • Huldramose, Nordheim & Midnight Temple",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Unlocks after Empire of the Ghouls II",
    summary: "Answer the Spear Maidens' plea in the Northlands, raid the Ragnarok Cultists after the Memorial Feast of Randgrid Ironeyes, cross the Cursed Multitude to Nordheim, and shatter the unholy Blood Wedding at the Midnight Temple!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Huldramose • Memorial Hall",
        title: "The Spear Maidens' Plea",
        safeRetreat: true,
        text: "At the solemn Memorial Feast of Randgrid Ironeyes, northern jarls warn that the Creed of All Flesh, Red Sisters of Marena, and Night Cauldron of Chernobog plan a 'Blood Marriage' at the Midnight Temple in Nordheim—binding vampire and ghoul deities to blot out the sun!",
        choices: [
          { t: "Raid the Ragnarok Cultists' camp outside Huldramose first to cut off their reinforcements!", to: 2, onChoose: { cw: "RAGNAROK_RAIDED", msg: "Scattered the Ragnarok Cultists and weakened the Midnight Temple's guard!" } },
          { t: "Sail straight north toward the frozen cliffs of Nordheim!", to: 2 }
        ]
      },
      2: {
        zone: "The Cursed Multitude",
        title: "March of the Frozen Dead",
        text: "Across howling glacial wastes, a shambling army of frost-bitten ghouls and blood-sworn thralls blocks the canyon to the Midnight Temple!",
        enemy: { name: "Cursed Multitude Vanguard", desc: "Frost-rimed undead legionaries guarding the Blood Marriage.", hp: 52, ac: 14, atk: 7, dmg: 8, undead: true, xp: 150, gold: 70, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["RAGNAROK_RAIDED"] },
        choices: [
          { t: "Storm the obsidian doors of the Midnight Temple before the vows are sealed!", to: 3 }
        ]
      },
      3: {
        zone: "The Midnight Temple",
        title: "The Unholy Vows",
        text: "Beneath an eclipsing blood-moon altar stand the ghoul Bridegroom of Vardesain and the vampire Bride of Marena, flanked by a Night Cauldron officiant! 'By fang and hunger, let eternal night begin!' they roar as you crash the wedding!",
        enemy: { name: "The Blood Bride & Darakhul Groom", desc: "Vampire priestess of Marena and darakhul priest of Vardesain.", hp: 68, ac: 15, atk: 8, dmg: 10, undead: true, xp: 225, gold: 155, items: ["bq_spear_maiden_aegis"], weakCw: ["RAGNAROK_RAIDED"] },
        choices: [
          { t: "Shatter the Night Cauldron's eclipse-chalice and break the Blood Marriage!", to: 4 }
        ]
      },
      4: {
        zone: "Nordheim Coast",
        title: "Dawn Breaks Over the Ice",
        text: "Golden northern sunlight pierces the black clouds as the unholy union dissolves! Yet a breathless messenger arrives from Jozht with terrible news: while you were in the North, Radomir Marrowblight's spies kidnapped Archduke Avgost!",
        onEnter: { healHp: 16, msg: "The Spear Maidens tend your wounds (+16 HP) as urgent news arrives from Queen Urzula!" },
        choices: [
          { t: "Sail south immediately for Chapter IV: Catacombs of the Ghul King!", to: 5 }
        ]
      },
      5: {
        zone: "Huldramose",
        title: "Gratitude of the North",
        text: "The Spear Maidens salute you with clashing shields and silver tribute.",
        choices: [
          { t: "Unlock Chapter IV!", to: 6 }
        ]
      },
      6: {
        zone: "Nieder Strait",
        title: "Chapter III Complete",
        text: "Queen Urzula's sealed letter awaits you in Kariessen.",
        choices: [
          { t: "Advance to Chapter IV!", to: 7 }
        ]
      },
      7: {
        zone: "Road to Dornig",
        title: "Race Against Time",
        text: "Archduke Avgost's life hangs by a thread.",
        choices: [
          { t: "Complete Chapter III!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Breaker of the Blood Marriage",
        text: "You prevented an unholy alliance of vampire and ghoul! <strong>Empire of the Ghouls IV: Catacombs of the Ghul King</strong> is now unlocked!",
        ending: { type: "true", title: "Shatterer of the Blood Wedding (Empire of Ghouls III)", xp: 260, gold: 245, trophy: "Shattered Eclipse Ring" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. EMPIRE OF THE GHOULS IV: CATACOMBS OF THE GHUL KING (8 PAGES • LV 8)
  // Part 4 of 6 (Prerequisite: bk_b7_eog_3_blood_marriage)
  // ==========================================================
  bk_b7_eog_4_ghul_king: {
    id: "bk_b7_eog_4_ghul_king",
    reqQuest: "bk_b7_eog_3_blood_marriage",
    title: "Empire of the Ghouls IV: Catacombs of the Ghul King",
    subtitle: "Empire of the Ghouls (Part 4 of 6) • Queen Urzula, Siwal & The Ghul King",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Unlocks after Empire of the Ghouls III",
    summary: "Answer deposed Queen Urzula's urgent plea to rescue Archduke Avgost, travel via Shadow Road to desert Siwal, win the Gravebinders' secret of walking unseen among undead, and conquer the Catacombs of the Ghul King!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Siwal • Grand Necropolis",
        title: "Secret of the Gravebinders",
        safeRetreat: true,
        text: "Queen Urzula revealed that Archduke Avgost was taken to Duke Morreto Lichmark's Pure City of Vandekhul! Following dwarven counsel across a Shadow Road to desert Siwal, the secretive Gravebinders agree to teach you how to walk undetected among darakhul—if you first cleanse the restless **Catacombs of the Ghul King**!",
        choices: [
          { t: "Study the Gravebinders' funeral wards carefully before descending.", badge: "Arcana / Lore DC 14", check: { stat: "arcana", skill: "Lore", dc: 14, pass: 2, fail: 2, passMsg: "You master the Gravebinder incantation—undead guardians hesitate before you!", failMsg: "The desert script is dense, yet you press down into the crypt." }, onPass: { cw: "GRAVEBINDER_WARD" } },
          { t: "Descend immediately into the sandstone vaults of the Ghul King!", to: 2 }
        ]
      },
      2: {
        zone: "Catacomb Level 1 & 2",
        title: "Desert Ghuls & Tomb Guardians",
        text: "Shifting sands spill down ancient stairs as howling Southlands Ghuls and gilded jackal-headed mummies surge out of the burial niches!",
        enemy: { name: "Siwal Necropolis Ghuls", desc: "Ancient desert undead haunting the Ghul King's labyrinth.", hp: 66, ac: 16, atk: 9, dmg: 10, undead: true, xp: 195, gold: 95, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["GRAVEBINDER_WARD"] },
        choices: [
          { t: "Descend into the sunken amphitheater known as The Bowl!", to: 3 }
        ]
      },
      3: {
        zone: "The Bowl",
        title: "The Ancient Ghul King",
        text: "Seated atop a bone-inlaid sandstone dais in The Bowl rises the crowned, emerald-eyed Ghul King! 'Living flesh dares tread my necropolis? Join my eternal court!'",
        enemy: { name: "The Ancient Ghul King", desc: "Formidable desert ghoul monarch guarding the secrets of undeath.", hp: 84, ac: 16, atk: 10, dmg: 11, undead: true, xp: 290, gold: 190, items: ["bq_gravebinder_shroud"], weakCw: ["GRAVEBINDER_WARD"] },
        choices: [
          { t: "Claim the Gravebinder Shroud and learn the hidden passage into the Underworld!", to: 4 }
        ]
      },
      4: {
        zone: "Siwal • Hall of Gravebinders",
        title: "Passage to the Fuligin Realm",
        text: "Honoring their pact, the Gravebinders anoint you with their undead-veiling rites and open the deep fissure descending into the **Fuligin Realm**—the lightless Underworld of the Ghoul Imperium!",
        onEnter: { healHp: 18, msg: "Anointed by the Gravebinders (+18 HP) for the descent into the Underworld!" },
        choices: [
          { t: "Prepare for Chapter V: Into the Fuligin Realm!", to: 5 }
        ]
      },
      5: {
        zone: "Desert Fissure",
        title: "Eyes on Vandekhul",
        text: "Somewhere leagues below lies Duke Morreto's Pure City of Vandekhul.",
        choices: [
          { t: "Unlock Chapter V!", to: 6 }
        ]
      },
      6: {
        zone: "Siwal Gate",
        title: "Chapter IV Complete",
        text: "With the Gravebinder Shroud, you can walk the Ghoul Imperium's roads.",
        choices: [
          { t: "Advance to Chapter V!", to: 7 }
        ]
      },
      7: {
        zone: "Underworld Threshold",
        title: "Into Darkness",
        text: "You light your lantern and step beneath the world.",
        choices: [
          { t: "Complete Chapter IV!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Conqueror of the Ghul King",
        text: "The Gravebinders' secret is yours! <strong>Empire of the Ghouls V: Into the Fuligin Realm</strong> is now unlocked!",
        ending: { type: "true", title: "Master of Siwal's Catacombs (Empire of Ghouls IV)", xp: 325, gold: 310, trophy: "Golden Mask of the Ghul King" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. EMPIRE OF THE GHOULS V: INTO THE FULIGIN REALM (8 PAGES • LV 10)
  // Part 5 of 6 (Prerequisite: bk_b7_eog_4_ghul_king)
  // ==========================================================
  bk_b7_eog_5_fuligin_realm: {
    id: "bk_b7_eog_5_fuligin_realm",
    reqQuest: "bk_b7_eog_4_ghul_king",
    title: "Empire of the Ghouls V: Into the Fuligin Realm",
    subtitle: "Empire of the Ghouls (Part 5 of 6) • Narosain the Last King & Dragon Graveyard",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Unlocks after Empire of the Ghouls IV",
    summary: "Traverse the dark Pillars of the Underworld past Lillefor and the Pit of All Flesh, forge an uneasy alliance with exiled ghoul lord Narosain the Last King, and wrest his Staff of the Underworld from cave dragon Gondecap in the Dragon Graveyard!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Pillars of the Underworld",
        title: "The Pit of All Flesh",
        safeRetreat: true,
        text: "Miles below Midgard's surface, colossal fungal pillars hold up the roof of the Fuligin Realm! Passing the kobold trade-city of Lillefor, you find the road to Vandekhul patrolled by the Derro Cult of the Withered Hand and ghoul legions!",
        choices: [
          { t: "Seek out the secret court of Narosain, the exiled Last King, for an inside way into Vandekhul!", to: 2, onChoose: { cw: "LAST_KING_PACT", msg: "Narosain promises secret entry to Vandekhul if you recover his Staff from the Dragon Graveyard!" } },
          { t: "Fight straight through the Pit of All Flesh outpost!", to: 2 }
        ]
      },
      2: {
        zone: "Cult of the Withered Hand",
        title: "Derro & Ghoul Patrol",
        text: "Crazed pale Derro cultists and patrolling Iron Ghouls ambush you along the bone-strewn chasm!",
        enemy: { name: "Withered Hand Derro & Ghouls", desc: "Mad subterranean cultists and darakhul legion scouts.", hp: 82, ac: 16, atk: 11, dmg: 11, undead: true, xp: 255, gold: 125, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["LAST_KING_PACT"] },
        choices: [
          { t: "Enter the colossal cavern of the Dragon Graveyard!", to: 3 }
        ]
      },
      3: {
        zone: "The Dragon Graveyard",
        title: "Gondecap the Cave Dragon",
        text: "Amid ribs of ancient wyrms taller than cathedrals coils the ferocious, blind-scaled Cave Dragon Gondecap—hoarding Narosain's glowing **Staff of the Underworld** beneath its talons!",
        enemy: { name: "Gondecap, Underworld Cave Dragon", desc: "Terrifying subterranean dragon guarding the Staff of the Underworld.", hp: 106, ac: 17, atk: 12, dmg: 14, xp: 380, gold: 270, items: ["bq_narosain_underworld_staff"], weakCw: ["LAST_KING_PACT"] },
        choices: [
          { t: "Claim the Staff of the Underworld and secure Narosain's secret route into Vandekhul!", to: 4 }
        ]
      },
      4: {
        zone: "Narosain's Hidden Sanctum",
        title: "Gates of the Pure City",
        text: "True to his ruthless bargain, the Last King hands you imperial transit seals and the hidden catacomb map leading straight beneath Duke Morreto's **Pure City of Vandekhul**!",
        onEnter: { healHp: 22, restoreMp: 8, msg: "Rested at Narosain's camp (+22 HP, +8 MP) before the final assault!" },
        choices: [
          { t: "March on Vandekhul in Chapter VI!", to: 5 }
        ]
      },
      5: {
        zone: "Underworld Causeway",
        title: "Spires of White Bone",
        text: "Ahead glows the pale, terrible silhouette of Vandekhul—the Bone Cathedral looms over all.",
        choices: [
          { t: "Unlock the Grand Finale: Chapter VI!", to: 6 }
        ]
      },
      6: {
        zone: "Catacomb Gate",
        title: "Chapter V Complete",
        text: "Radomir Marrowblight's final ritual is about to begin.",
        choices: [
          { t: "Advance to Chapter VI!", to: 7 }
        ]
      },
      7: {
        zone: "Shadow Tunnel",
        title: "Final Breath",
        text: "All of Midgard depends on what happens in the Bone Cathedral.",
        choices: [
          { t: "Complete Chapter V!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Survivor of the Fuligin Realm",
        text: "You braved the Underworld and slew Gondecap! <strong>Empire of the Ghouls VI: The Pure City of Vandekhul</strong> is now unlocked!",
        ending: { type: "true", title: "Walker of the Fuligin Realm (Empire of Ghouls V)", xp: 425, gold: 405, trophy: "Gondecap's Cavern Fang" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. EMPIRE OF THE GHOULS VI: THE PURE CITY OF VANDEKHUL (8 PAGES • LV 12)
  // Part 6 of 6 (Prerequisite: bk_b7_eog_5_fuligin_realm)
  // ==========================================================
  bk_b7_eog_6_vandekhul: {
    id: "bk_b7_eog_6_vandekhul",
    reqQuest: "bk_b7_eog_5_fuligin_realm",
    title: "Empire of the Ghouls VI: The Pure City of Vandekhul",
    subtitle: "Empire of the Ghouls (Part 6 of 6) • Bone Cathedral Finale",
    difficulty: "Deadly",
    recommendedLevel: 12,
    autoDiscover: false,
    discoverySource: "Unlocks after Empire of the Ghouls V",
    summary: "Infiltrate the Pure City of Vandekhul, rally Emperor Nicoforus's loyalists against the coup, storm the Bone Cathedral to rescue Archduke Avgost Walerska, and destroy High Priest Radomir Marrowblight and Duke Morreto Lichmark!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Pure City of Vandekhul",
        title: "The Kingdom of Hunger",
        safeRetreat: true,
        text: "Beneath pale domes of carved bone, Vandekhul hums with fevered darakhul legions! Loyalists to Emperor Nicoforus the Pale whisper that Duke Morreto Lichmark and High Priest Radomir Marrowblight plan to sacrifice Archduke Avgost at the Bone Cathedral tonight to seize the secret of mass-creating darakhul and overthrow the Emperor!",
        choices: [
          { t: "Expose Morreto's coup plot to the Emperor's loyalist officers to spark chaos in the square!", badge: "Persuasion / Spirit DC 15", check: { stat: "spirit", skill: "Persuasion", dc: 15, pass: 2, fail: 2, passMsg: "Civil war erupts in Vandekhul's streets—drawing half of Morreto's guards away from the Cathedral!", failMsg: "The bone-armored loyalists hesitate, leaving you to storm the steps alone." }, onPass: { cw: "IMPERIAL_LOYALISTS" } },
          { t: "Slip straight up the ivory steps into the Bone Cathedral!", to: 2 }
        ]
      },
      2: {
        zone: "Nave of the Bone Cathedral",
        title: "Duke Morreto's Honor Guard",
        text: "Elite Hunger-Knights of Vardesain bar the crimson nave while dark chants shake the rib-vaulted ceiling!",
        enemy: { name: "Vandekhul Hunger-Knights", desc: "Fanatical darakhul paladins of the Hunger God.", hp: 94, ac: 18, atk: 12, dmg: 13, undead: true, xp: 330, gold: 165, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["IMPERIAL_LOYALISTS"] },
        choices: [
          { t: "Burst onto the High Altar before Radomir's knife falls on Archduke Avgost!", to: 3 }
        ]
      },
      3: {
        zone: "High Altar of Vardesain",
        title: "Duke Morreto & Radomir Marrowblight",
        text: "Chained to the bloodstained altar gasps Archduke Avgost Walerska! Turning with blazing crimson eyes stand scheming Duke Morreto Lichmark and High Priest Radomir Marrowblight! 'Surface insects! Your flesh will consecrate the Kingdom of Hunger!'",
        enemy: { name: "Duke Morreto & Radomir Marrowblight", desc: "Mastermind darakhul duke and High Priest of the Hunger God.", hp: 128, ac: 18, atk: 13, dmg: 16, undead: true, xp: 520, gold: 380, items: ["bq_krakova_royal_signet"], weakCw: ["IMPERIAL_LOYALISTS"] },
        choices: [
          { t: "Topple the altar of Vardesain and carry Archduke Avgost through the surface portal!", to: 4 }
        ]
      },
      4: {
        zone: "Surface Dawn",
        title: "The Kingdom of Hunger Foiled",
        text: "With both traitors slain and the secret of mass-creating darakhul lost forever, the Ghoul Imperium's surface invasion collapses! Archduke Avgost breathes fresh sunlit air for the first time in months.",
        choices: [
          { t: "Escort Archduke Avgost safely back to Queen Urzula!", to: 5 }
        ]
      },
      5: {
        zone: "Court-in-Exile",
        title: "Reunion of Krakova",
        text: "Queen Urzula and Zobeck's council hail you as saviors of the entire Crossroads!",
        choices: [
          { t: "Accept the royal treasury's tribute!", to: 6 }
        ]
      },
      6: {
        zone: "Free City of Zobeck",
        title: "Bells Across Midgard",
        text: "Even the Clockwork Oracle chimes a triumphant chord in honor of your six-chapter odyssey.",
        choices: [
          { t: "Complete Empire of the Ghouls!", to: 7 }
        ]
      },
      7: {
        zone: "Oakhaven Return",
        title: "Legends Immortalized",
        text: "From the Zobeck Catacombs to the Pure City of Vandekhul, your campaign will be sung for centuries.",
        choices: [
          { t: "Claim your epic campaign victory!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Conqueror of the Empire of Ghouls",
        text: "The Kingdom of Hunger is broken, Archduke Avgost lives, and Midgard's surface stands free!",
        ending: { type: "true", title: "Vanquisher of the Ghoul Imperium", xp: 580, gold: 560, trophy: "Shattered Bone Crown of Vandekhul" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. THREE LITTLE PIGS (7 PAGES • LV 3)
  // Source: City of Cats (Completes City of Cats!)
  // ==========================================================
  bk_b7_three_little_pigs: {
    id: "bk_b7_three_little_pigs",
    title: "Three Little Pigs",
    subtitle: "City of Cats • Per-Bastet's Day of Pigs Festival Rescue",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Weeping Merchant Omar-bac-Maheem (Oakhaven Market)",
    summary: "During Per-Bastet's riotous Day of Pigs festival, rescue respected merchant Omar-bac-Maheem's three daughters—Nulah, Armina, and Madgit—who have been cursed into prize hogs before the dusk Night of Pigs hog-roast!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Per-Bastet • Grand Souk",
        title: "Porcine Misery!",
        safeRetreat: true,
        text: "Citizens in colorful pig masks oink merrily through Per-Bastet's Day of Pigs! Suddenly, frantic merchant Omar-bac-Maheem grabs your cloak: a jealous curse has transformed his three daughters—Nulah, Armina, and Madgit—into plump prize pigs and scattered them into the souk pens before tonight's giant hog roast!",
        choices: [
          { t: "Track the cleverest piglet—mathematician Nulah—using clues in the spice-market!", badge: "Perception / Survival DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, passMsg: "You spot a curly-haired piglet scratching neat sums in the dust—Nulah found!", failMsg: "Snorting festival crowds nearly trip you up before you spot Nulah!" }, onPass: { cw: "NULAH_FOUND" } },
          { t: "Dash straight for the Wharf District hog-pens!", to: 2 }
        ]
      },
      2: {
        zone: "Wharf District Hog-Pens",
        title: "Greedy Suitor Khangi-Jann's Thugs",
        text: "Hired bruisers working for scheming, corpulent suitor Khangi-Jann try to haul away the poetic red-maned piglet Armina and singing blonde piglet Madgit in a covered cart!",
        enemy: { name: "Khangi-Jann's Souk Bruisers", desc: "Ruffians hired to kidnap Omar's enchanted daughters.", hp: 32, ac: 12, atk: 5, dmg: 6, xp: 85, gold: 45, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["NULAH_FOUND"] },
        choices: [
          { t: "Corner the rogue bazaar hedge-mage holding the polymorph charm!", to: 3 }
        ]
      },
      3: {
        zone: "Alley of the Pork-Roasters",
        title: "Breaking the Pig Curse",
        text: "Beside crackling roasting pits, a cackling street-sorcerer waves a carved ivory pig-wand to keep the daughters transformed until sunset!",
        enemy: { name: "Festival Curse-Weaver", desc: "Treacherous hedge-mage paid to ruin Omar's family.", hp: 36, ac: 13, atk: 6, dmg: 6, xp: 105, gold: 65, items: ["bq_omar_golden_truffle"] },
        choices: [
          { t: "Snap the ivory pig-wand—restoring Nulah, Armina, and Madgit in a puff of pink smoke!", to: 4 }
        ]
      },
      4: {
        zone: "Omar's Courtyard",
        title: "A Joyous Wedding",
        text: "All three daughters laugh in relief as Armina joyfully accepts her true love Mahmud's proposal—right under corpulent Khangi-Jann's scowling nose! Omar insists you attend as guests of honor and pays his full generous reward!",
        onEnter: { healHp: 10, msg: "Feasted as guests of honor at Armina's wedding (+10 HP)!" },
        choices: [
          { t: "Raise a cup to Omar-bac-Maheem's family!", to: 5 }
        ]
      },
      5: {
        zone: "Grand Souk",
        title: "Status in Per-Bastet",
        text: "Your fame across the Everlasting City of the Cat grows brighter than ever.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Market",
        title: "A Tale for the Tavern",
        text: "Nobody quite believes the story of rescuing three enchanted pigs—until they see your heavy purse!",
        choices: [
          { t: "Finish the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Hero of the Day of Pigs",
        text: "Omar's daughters are safe, true love won the day, and Per-Bastet salutes your wit.",
        ending: { type: "true", title: "Savior of the Three Little Pigs", xp: 140, gold: 150, trophy: "Gilded Festival Pig-Mask" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. HIDDEN TOMB OF NARGOTH I: LOCATE THE TOMB (7 PAGES • LV 4)
  // Part 1 of 3
  // ==========================================================
  bk_b7_nargoth_1: {
    id: "bk_b7_nargoth_1",
    title: "Hidden Tomb of Nargoth I: Locate the Tomb",
    subtitle: "Hidden Tomb of Nargoth (Part 1 of 3) • Wilderness Search",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Frontier Scholars (Oakhaven Guildhall)",
    summary: "Follow crumbling star-charts into the overgrown badlands to locate the long-lost Hidden Tomb of Nargoth before a sinister void cult unseals its buried sanctum.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Overgrown Badlands",
        title: "Star-Carved Waystones",
        safeRetreat: true,
        text: "Ancient star-carved waystones point toward the forgotten Hidden Tomb of Nargoth—yet fresh bootprints and dark cult banners reveal void-worshippers have already reached the valley!",
        choices: [
          { t: "Decipher the weathered star-waystones to find the secret upper entrance.", badge: "Arcana / Survival DC 12", check: { stat: "spirit", skill: "Survival", dc: 12, pass: 2, fail: 2, passMsg: "You locate the concealed hillside arch ahead of the cult patrol!", failMsg: "Scree slides underfoot, alerting the cult lookouts below!" }, onPass: { cw: "TOMB_FOUND_EARLY" } },
          { t: "Follow the cultists' torch-smoke directly up the ravine.", to: 2 }
        ]
      },
      2: {
        zone: "Ravine Approach",
        title: "Void-Cult Outriders",
        text: "Cloaked void-zealots and tethered dark-hounds block the moss-choked stone doorway!",
        enemy: { name: "Nargoth Void-Cult Scouts", desc: "Fanatical raiders excavating the forgotten tomb.", hp: 38, ac: 13, atk: 6, dmg: 6, xp: 100, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["TOMB_FOUND_EARLY"] },
        choices: [
          { t: "Pry open the heavy star-etched threshold and enter the Upper Level!", to: 3 }
        ]
      },
      3: {
        zone: "Tomb Threshold",
        title: "Echoes Below",
        text: "Cold drafts smelling of ozone and ancient dust rise from the torchlit upper vaults where the cult has set up camp.",
        choices: [
          { t: "Check your gear and prepare for Part 2: Infiltrate the Cult!", to: 4 }
        ]
      },
      4: {
        zone: "Entry Alcove",
        title: "Cult Camp Mapped",
        text: "You sketch the guard rotations from the shadowed balcony.",
        onEnter: { healHp: 8, msg: "Rested briefly in the entry alcove (+8 HP)." },
        choices: [
          { t: "Advance to Part 2!", to: 5 }
        ]
      },
      5: {
        zone: "Upper Landing",
        title: "Part 1 Complete",
        text: "The Hidden Tomb of Nargoth stands open before you.",
        choices: [
          { t: "Unlock Part 2!", to: 6 }
        ]
      },
      6: {
        zone: "Star-Carved Arch",
        title: "Ready to Descend",
        text: "Deep chanting rumbles from beneath the stone floor.",
        choices: [
          { t: "Complete Part 1!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Tomb Discovered",
        text: "You located Nargoth's hidden entrance and broke the outer patrol! <strong>Hidden Tomb of Nargoth II: Infiltrate the Cult</strong> is now unlocked!",
        ending: { type: "true", title: "Finder of Nargoth's Tomb (Part I)", xp: 165, gold: 145, trophy: "Star-Carved Waystone Rubbing" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. HIDDEN TOMB OF NARGOTH II: INFILTRATE THE CULT (7 PAGES • LV 4)
  // Part 2 of 3 (Prerequisite: bk_b7_nargoth_1)
  // ==========================================================
  bk_b7_nargoth_2: {
    id: "bk_b7_nargoth_2",
    reqQuest: "bk_b7_nargoth_1",
    title: "Hidden Tomb of Nargoth II: Infiltrate the Cult",
    subtitle: "Hidden Tomb of Nargoth (Part 2 of 3) • The Upper Level",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Unlocks after Hidden Tomb of Nargoth I",
    summary: "Slip through the cult-occupied Upper Level of Nargoth's Tomb, bypass ancient mechanical crypt-traps, defeat the cult captain, and unlock the sealed stairs to the Lower Level.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Upper Level • Guardroom",
        title: "The Cult Encampment",
        safeRetreat: true,
        text: "Bedrolls, stolen relics, and void-banners fill the pillared upper gallery. Two ancient swinging-blade crypt traps guard the vault stair!",
        choices: [
          { t: "Disarm the ancient pendulum-blade trigger cleanly.", badge: "Lockpicking / Perception DC 12", check: { stat: "agility", skill: "Lockpicking", dc: 12, pass: 2, fail: 2, failDmg: 5, passMsg: "Locked the gears—clearing the path to the cult captain!", failMsg: "A rusted blade grazes your shoulder (-5 HP)!" }, onPass: { cw: "UPPER_TRAPS_CLEARED" } },
          { t: "Sprint straight past the pillars into the Cult Barracks!", to: 2 }
        ]
      },
      2: {
        zone: "Upper Level • Reliquary",
        title: "The Cult Captain",
        text: "Clad in void-etched mail, the Cult Captain and his zealots guard the iron wheel that opens the Lower Level!",
        enemy: { name: "Nargoth Cult Captain & Zealots", desc: "Hardened void-cult defenders holding the upper crypt.", hp: 44, ac: 14, atk: 7, dmg: 7, xp: 140, gold: 80, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), weakCw: ["UPPER_TRAPS_CLEARED"] },
        choices: [
          { t: "Turn the great star-wheel to open the spiral descent into the Lower Level!", to: 3 }
        ]
      },
      3: {
        zone: "Spiral Descent",
        title: "Whispers of the Void",
        text: "Violet starlight pulses up from the Lower Level—the cult's high priest is moments away from tearing open Nargoth's void seal!",
        onEnter: { healHp: 10, msg: "Found healing supplies in the cult camp (+10 HP)!" },
        choices: [
          { t: "Prepare for Part 3: Face the Void!", to: 4 }
        ]
      },
      4: {
        zone: "Lower Threshold",
        title: "Seal Vibrating",
        text: "Loose dust floats upward against gravity as the void rift strains.",
        choices: [
          { t: "Unlock Part 3!", to: 5 }
        ]
      },
      5: {
        zone: "Star-Wheel Landing",
        title: "Part 2 Complete",
        text: "The Upper Level is cleared.",
        choices: [
          { t: "Advance to Part 3!", to: 6 }
        ]
      },
      6: {
        zone: "Deep Stair",
        title: "Ready for the Finale",
        text: "You grip your weapon and descend.",
        choices: [
          { t: "Complete Part 2!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Upper Vault Cleared",
        text: "The cult's upper garrison is broken! <strong>Hidden Tomb of Nargoth III: Face the Void</strong> is now unlocked!",
        ending: { type: "true", title: "Breaker of the Upper Crypt (Part II)", xp: 180, gold: 165, trophy: "Cult Captain's Void-Banner" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. HIDDEN TOMB OF NARGOTH III: FACE THE VOID (7 PAGES • LV 5)
  // Part 3 of 3 (Prerequisite: bk_b7_nargoth_2)
  // ==========================================================
  bk_b7_nargoth_3: {
    id: "bk_b7_nargoth_3",
    reqQuest: "bk_b7_nargoth_2",
    title: "Hidden Tomb of Nargoth III: Face the Void",
    subtitle: "Hidden Tomb of Nargoth (Part 3 of 3) • Lower Level & Void Breach",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Unlocks after Hidden Tomb of Nargoth II",
    summary: "Enter the star-warped Lower Level of Nargoth's Tomb, defeat the void-touched High Priest and the emerging cosmic horror, and lock the Star-Disk of Nargoth to seal the breach forever!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Lower Level • Hall of Stars",
        title: "Warped Gravity",
        safeRetreat: true,
        text: "Chunks of stone drift weightlessly around a howling violet rift above Nargoth's sarcophagus! Void-warped tomb skeletons lumber forward to shield the chanting cult leader!",
        enemy: { name: "Void-Touched Tomb Guardians", desc: "Star-blighted undead animated by the cracking rift.", hp: 46, ac: 14, atk: 7, dmg: 7, undead: true, xp: 130, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Leap across the floating flagstones to Nargoth's Sarcophagus!", to: 2 }
        ]
      },
      2: {
        zone: "Nargoth's Sanctum",
        title: "Avatar of the Cracked Void",
        text: "As the cult's High Priest raises both arms in madness, a tentacled Star-Void Horror tears halfway through the portal above Nargoth's tomb! 'Behold the endless dark!'",
        enemy: { name: "Void High Priest & Star-Horror", desc: "Mad cult leader and emerging planar terror.", hp: 58, ac: 15, atk: 8, dmg: 8, xp: 185, gold: 130, items: ["bq_nargoth_void_seal"] },
        choices: [
          { t: "Slam the Sealed Star-Disk into Nargoth's sarcophagus to snap the rift shut!", to: 3 }
        ]
      },
      3: {
        zone: "Nargoth's Sanctum",
        title: "Gravity Restored",
        text: "With a booming chime, the violet tear seals completely! Floating stones clatter harmlessly to the floor as peace returns to Nargoth's ancient tomb.",
        choices: [
          { t: "Ascend back into the badlands sunlight!", to: 4 }
        ]
      },
      4: {
        zone: "Badlands Ridge",
        title: "Tomb Resealed",
        text: "You roll the outer boulder over the star-carved arch so no cult can disturb Nargoth again.",
        choices: [
          { t: "Report back to the Oakhaven Guildhall.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Guildhall",
        title: "Scholars' Reward",
        text: "Relieved that the void breach was stopped in time, the guild pays a rich bounty.",
        choices: [
          { t: "Complete the Hidden Tomb of Nargoth Trilogy!", to: 6 }
        ]
      },
      6: {
        zone: "Rusty Flagon Tavern",
        title: "Safe Skies Above",
        text: "The night stars shine clean and steady over Oakhaven.",
        choices: [
          { t: "Finish the trilogy!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Sealer of Nargoth's Void",
        text: "You located the tomb, shattered the cult, and sealed the void breach forever.",
        ending: { type: "true", title: "Warden of Nargoth's Tomb", xp: 225, gold: 220, trophy: "Starlight Seal of Nargoth" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. LAST GASP (7 PAGES • LV 6)
  // Source: Last Gasp.pdf (Southlands Adventure — Complete!)
  // ==========================================================
  bk_b7_last_gasp: {
    id: "bk_b7_last_gasp",
    title: "Last Gasp",
    subtitle: "Southlands Adventure • The Airless Desert Tomb",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Desert Storyteller by the Campfire (Oakhaven Outskirts)",
    summary: "Descend into an ancient Southlands tomb sealed tighter than a pharaoh's lung—where every room drains your breath, cursed sand-mummies guard the vaults, and survival hinges on claiming the Ampoule of Eternal Breath before your last gasp!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Chilled Desert Dunes",
        title: "Unto Your Final Breath",
        safeRetreat: true,
        text: "Guided by a campfire storyteller's tale of untouched treasure, you uncover a sealed bronze hatch in the dunes. The moment you drop inside, a stone slab slams shut overhead—and you feel the stale tomb air growing thin and suffocating!",
        choices: [
          { t: "Pace your breathing calmly and inspect the sandstone ventilation glyphs.", badge: "Spirit / Survival DC 13", check: { stat: "spirit", skill: "Survival", dc: 13, pass: 2, fail: 2, failDmg: 6, passMsg: "You spot a hairline crack feeding fresh desert air—buying precious time!", failMsg: "Your lungs burn (-6 HP) in the heavy, dust-choked gloom!" }, onPass: { cw: "BREATH_PACED" } },
          { t: "Sprint straight down the torchless sandstone corridor!", to: 2 }
        ]
      },
      2: {
        zone: "Hall of Stolen Air",
        title: "Suffocating Guardians",
        text: "Dust-dry Tomb Mummies and howling Sand-Wraiths lunge out from choked alcoves, trying to snuff your lantern and steal your breath!",
        enemy: { name: "Airless Tomb Mummies", desc: "Desiccated undead guardians thriving in the oxygen-starved crypt.", hp: 52, ac: 14, atk: 7, dmg: 8, undead: true, xp: 150, gold: 75, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["BREATH_PACED"] },
        choices: [
          { t: "Press into the Vault of the Final Breath where a cool blue light glows!", to: 3 }
        ]
      },
      3: {
        zone: "Vault of the Final Breath",
        title: "Lord of the Stifled Crypt",
        text: "Guarding the glowing **Ampoule of Eternal Breath**—and the counterweight wheel that opens the tomb's roof—rises the ancient Breathless Pharaoh, wreathed in choking desert dust!",
        enemy: { name: "The Breathless Pharaoh", desc: "Ancient Southlands undead monarch draining air from his tomb.", hp: 64, ac: 15, atk: 8, dmg: 9, undead: true, xp: 210, gold: 150, items: ["bq_last_gasp_ampoule"], weakCw: ["BREATH_PACED"] },
        choices: [
          { t: "Uncork a breath of cool air from the Ampoule and haul open the roof counterweight!", to: 4 }
        ]
      },
      4: {
        zone: "Moonlit Dunes",
        title: "Sweet Desert Night Air",
        text: "Stone grinds open above you and cool desert night air floods your lungs! You climb out onto the sand clutching gold funerary treasures and the Ampoule of Eternal Breath.",
        onEnter: { healHp: 14, gold: 80, msg: "Escaped the airless tomb (+14 HP, +80 GP desert gold)!" },
        choices: [
          { t: "Return to the caravan campfire with a tale to top the storyteller's!", to: 5 }
        ]
      },
      5: {
        zone: "Caravan Oasis",
        title: "Wonder by the Fire",
        text: "The desert storyteller stares wide-eyed at the glowing Ampoule and buys you spiced tea.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Market",
        title: "Southlands Treasure",
        text: "Antiquarians pay handsomely for the tomb's carved alabaster vessels.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Survivor of Last Gasp",
        text: "You outlasted the suffocating curse of the Southlands tomb and emerged richer and stronger.",
        ending: { type: "true", title: "Master of the Final Breath", xp: 250, gold: 245, trophy: "Alabaster Wind-Canopic" },
        choices: []
      }
    }
  }
});
