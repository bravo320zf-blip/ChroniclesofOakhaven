/* ============================================================
   BOOK QUESTS — BATCH 004 (13 Quests — Completes Book of Lairs!)
   Source: Book of Lairs - Revised (Kobold Press) — Lairs 13–25
   Includes 2-Part Linked Series: Sky Stairs -> Citadel of the Void Dragons
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 13. HOUSE OF REEDS AND WHISPERS (7 PAGES • LV 8)
  // ==========================================================
  bk_bol_13_reeds_whispers: {
    id: "bk_bol_13_reeds_whispers",
    title: "House of Reeds and Whispers",
    subtitle: "Red Hag Sisters & Blood-Knitted Reeds",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Speaker Galnas of Farris (Oakhaven Outskirts)",
    summary: "Hack through the whispering, grasping crimson reeds creeping toward the hamlet of Farris, confront red hag sisters Liori and Ijith in dead collector Nahl Fry's swamp-house, and seal their cursed coral knitting needles.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Hamlet of Farris",
        title: "Crimson Reeds on the Wind",
        safeRetreat: true,
        text: "Speaker Galnas points with trembling hands toward fast-growing red swamp reeds encroaching on Farris's pastures. Faint feminine whispers float through the grasping stalks, leading back to eccentric collector Nahl Fry's marshland cottage.",
        choices: [
          { t: "Listen closely to the whispering reeds before cutting through.", badge: "Perception DC 13", check: { stat: "spirit", skill: "Perception", dc: 13, pass: 2, fail: 2, passMsg: "Two hag voices! They're using blood-coral needles to siphon life through the reeds!", failMsg: "The eerie whispers blur together in the marsh breeze." }, onPass: { cw: "HAG_NEEDLES_KNOWN" } },
          { t: "Slash a path straight through the grasping crimson stalks.", badge: "Might DC 14", check: { stat: "might", skill: "Athletics", dc: 14, pass: 2, fail: 2, failDmg: 7, passMsg: "You sever the thorny vines cleanly!", failMsg: "Grasping crimson reeds slice your shins (-7 HP) as you force through!" } }
        ]
      },
      2: {
        zone: "Swamp Garden",
        title: "Guardians of the Marsh",
        text: "Halfway to Nahl Fry's crooked timber house, blood-soaked vine-horrors and marsh trolls rise from the crimson mud!",
        enemy: { name: "Blood-Reed Guardians", desc: "Animated swamp horrors nourished by the hags' reeds.", hp: 64, ac: 15, atk: 8, dmg: 9, xp: 185, gold: 80, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Kick open the splintered parlor door of Nahl Fry's house.", to: 3 }
        ]
      },
      3: {
        zone: "Nahl Fry's Curio Parlor",
        title: "Liori and Ijith",
        text: "Surrounded by curios from sunken Talitheos, red hag sisters Liori and Ijith click a pair of glowing blood-coral knitting needles—weaving crimson tendrils straight through the floorboards! 'Fresh yarn for our loom!' they shriek!",
        enemy: { name: "Liori & Ijith, Red Hag Sisters", desc: "Cruel blood-hags testing an ancient artifact of Baba Yaga.", hp: 78, ac: 16, atk: 9, dmg: 11, xp: 265, gold: 170, items: ["bq_coral_knitting_needles"], weakCw: ["HAG_NEEDLES_KNOWN"] },
        choices: [
          { t: "Bind the whispering coral needles in ironwood so they cannot corrupt anyone!", to: 4 }
        ]
      },
      4: {
        zone: "Nahl Fry's Study",
        title: "Map to Lost Talitheos",
        text: "Beneath Fry's curios you also find a waterproofed parchment chart hinting at Lost Talitheos—and outside, the crimson reeds instantly wither to dry straw!",
        choices: [
          { t: "Return to the hamlet of Farris.", to: 5 }
        ]
      },
      5: {
        zone: "Hamlet of Farris",
        title: "Pastures Cleared",
        text: "Speaker Galnas and the villagers cheer as the grasping swamp growth crumbles to dust.",
        choices: [
          { t: "Accept their hard-earned reward and depart.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Road",
        title: "A Quiet Caution",
        text: "You keep the ironwood box tightly latched—rumor says Baba Yaga herself once owned those needles.",
        choices: [
          { t: "Finish the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Silencer of the Crimson Reeds",
        text: "Farris sleeps safely once more, free of the red hags' blood-knitted curse.",
        ending: { type: "true", title: "Bane of the Red Hags", xp: 305, gold: 280, trophy: "Chart of Lost Talitheos" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 14. TOMB OF THE SCORPION PRINCE (7 PAGES • LV 8)
  // ==========================================================
  bk_bol_14_scorpion_prince: {
    id: "bk_bol_14_scorpion_prince",
    title: "Tomb of the Scorpion Prince",
    subtitle: "Giant Sandstone Scorpion & Venomous Mummy",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Desert Expedition Sponsor (Oakhaven Market)",
    summary: "Descend into the colossal sandstone scorpion unearthed by a desert quake, outlast the fanatical Scorpion Cult trying to keep the tomb sealed, and destroy the venomous mummy of the Scorpion Prince.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Unearthed Monument",
        title: "The Sixty-Foot Scorpion",
        safeRetreat: true,
        text: "A titanic painted sandstone scorpion claws out of the desert dunes, its giant jaws framing wide stairs descending into darkness. Masked Scorpion Cultists bar the steps: 'Turn back! We guard the seals so the Prince never wakes!'",
        choices: [
          { t: "Assure the cultists you will destroy the Prince's body for good.", badge: "Persuasion DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 2, fail: 2, passMsg: "Reluctantly, the cult leader hands you a numbered gem-key to bypass the outer venom traps!", failMsg: "Fanatical steel flashes—you force your way past them down the stairs!" }, onPass: { cw: "SCORPION_KEY" } },
          { t: "Descend straight through the sandstone jaws into the tomb.", to: 2 }
        ]
      },
      2: {
        zone: "Hall of Stingers",
        title: "Venomous Tomb-Guards",
        text: "Carved sandstone pillars hiss with green poison darts as Giant Desert Scorpions and mummified tomb-guards scuttle from the alcoves!",
        enemy: { name: "Scorpion Tomb Guardians", desc: "Venomous undead sentinels and giant scorpions.", hp: 66, ac: 16, atk: 9, dmg: 10, undead: true, xp: 195, gold: 95, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["SCORPION_KEY"] },
        choices: [
          { t: "Solve the numbered gemstone lock on the crystal burial vault!", to: 3 }
        ]
      },
      3: {
        zone: "Sarcophagus Chamber",
        title: "The Scorpion Prince Rises",
        text: "Surrounded by two hundred turquoise gems, the gilded sarcophagus cracks open—emitting a choking cloud of emerald venom as the cursed Mummy of the Scorpion Prince lunges forward!",
        enemy: { name: "The Scorpion Prince", desc: "Ancient venomous mummy-lord of the desolate wastes.", hp: 80, ac: 16, atk: 10, dmg: 11, undead: true, xp: 275, gold: 190, items: ["bq_scorpion_prince_dagger"], weakCw: ["SCORPION_KEY"] },
        choices: [
          { t: "Burn the prince's cursed wrappings and claim the vault's turquoise hoard!", to: 4, onChoose: { gold: 120, msg: "Claimed 120 GP in ancient turquoise and bracers!" } }
        ]
      },
      4: {
        zone: "Tomb Entrance",
        title: "Judgment of the Cult",
        text: "Emerging into the desert sun, you show the Scorpion Cultists the prince's shattered stinger-crown—proving his physical vessel is ash.",
        choices: [
          { t: "Ride back toward the caravan oasis.", to: 5 }
        ]
      },
      5: {
        zone: "Oasis Outpost",
        title: "Lost Expeditions Avenged",
        text: "Sponsors of the two lost expeditions reward you generously for recovering the tomb's historical rubbings.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Market",
        title: "Desert Gold",
        text: "Jewelers eagerly inspect the vivid turquoise pieces pulled from beneath the sands.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Conqueror of the Scorpion Tomb",
        text: "The Scorpion Prince's venomous reign stays buried in the desert dust.",
        ending: { type: "true", title: "Breaker of the Scorpion Tomb", xp: 310, gold: 295, trophy: "Green Aventurine Stinger" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 15. THE DARK FOREST (7 PAGES • LV 8)
  // ==========================================================
  bk_bol_15_dark_forest: {
    id: "bk_bol_15_dark_forest",
    title: "The Dark Forest",
    subtitle: "Alseid Sacred Grove & Elder Shadow Drakes",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Surviving Alseid Tribe (Oakhaven Outskirts)",
    summary: "Aid the devastated alseid deer-folk to reclaim their sacred standing-stone grove, recover the body and diadem of shaman Riatha the Raven, and slay the two Elder Shadow Drakes guarding a skull-ringed shadow pool.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Dark Forest Path",
        title: "Plea of the Alseids",
        safeRetreat: true,
        text: "Weeping deer-bodied alseids emerge from the tangled pines: during a rite led by their shaman Riatha the Raven, a pillar of black shadow erupted from their burial mound—summoning two terrifying black-scaled drakes that slew Riatha!",
        choices: [
          { t: "Follow the shadowed forest trail cautiously toward the running stream.", badge: "Survival DC 13", check: { stat: "spirit", skill: "Survival", dc: 13, pass: 2, fail: 2, passMsg: "You skirt a nest of five giant forest spiders without waking them!", failMsg: "Webs slow your stride as giant spiders snap at your heels!" }, onPass: { cw: "SPIDERS_AVOIDED" } },
          { t: "Stride directly up the hill toward the ancient standing stones.", to: 2 }
        ]
      },
      2: {
        zone: "Forest Clearing",
        title: "Shadow-Touched Spiders",
        text: "Beneath drooping black boughs, oversized shadow-webbed spiders drop silently from the canopy!",
        enemy: { name: "Dark Forest Giant Spiders", desc: "Venomous canopy predators drawn to the shadow-rift.", hp: 62, ac: 15, atk: 8, dmg: 9, xp: 180, gold: 60, items: rollRandomLoot(["material", "consumable"], 1, "very_rare"), flee: 1, weakCw: ["SPIDERS_AVOIDED"] },
        choices: [
          { t: "Climb the burial mound into the Ring of Standing Stones!", to: 3 }
        ]
      },
      3: {
        zone: "Ring of Standing Stones",
        title: "Twin Elder Shadow Drakes",
        text: "Beside a sinister skull-ringed pool of liquid shadow lies the fallen body of Riatha the Raven. Two hulking Elder Shadow Drakes with burning red eyes unfurl leathery black wings and exhale freezing darkness!",
        enemy: { name: "Twin Elder Shadow Drakes", desc: "Deadly black-scaled shadow drakes claiming the sacred grove.", hp: 82, ac: 16, atk: 10, dmg: 11, xp: 280, gold: 165, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Reverently carry Riatha's body and silver diadem back to the surviving alseids.", to: 4, onChoose: { cw: "RIATHA_RETURNED", items: ["bq_shadow_drake_diadem"], msg: "The grateful alseids bestow Riatha's Grove Blessing upon you!" } }
        ]
      },
      4: {
        zone: "Alseid Refuge",
        title: "Undying Gratitude",
        text: "The surviving alseids sing a mournful hymn as Riatha is laid to rest, healing your wounds and pledging lifelong alliance in the deep woods.",
        onEnter: { healHp: 18, msg: "Alseid nature-magic restores your vigor (+18 HP)!" },
        choices: [
          { t: "Leave the cleansed grove in peace.", to: 5 }
        ]
      },
      5: {
        zone: "Woodland Border",
        title: "Tracks of Shadow Fey",
        text: "On the forest edge you notice fresh bootprints of shadow-elf hunters heading toward a marshy ruined tower—a chilling lead for another quest.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Outskirts",
        title: "Balance Restored",
        text: "Birds sing once more across the dark timberline.",
        choices: [
          { t: "Finish the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Friend of the Alseids",
        text: "The sacred standing stones stand free of shadow drakes, and the alseid tribe honors your name forever.",
        ending: { type: "true", title: "Avenger of Riatha the Raven", xp: 315, gold: 285, trophy: "Shadow-Drake Fang" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 16. RUINS OF THE UMBRAL TOWER (7 PAGES • LV 8)
  // ==========================================================
  bk_bol_16_umbral_tower: {
    id: "bk_bol_16_umbral_tower",
    title: "Ruins of the Umbral Tower",
    subtitle: "Shadow Fey Trophy Hunters & Planar Gate",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Merchants' Guild Patrol Contract (Oakhaven Market)",
    summary: "Track the ruthless shadow fey hunters slaughtering travelers along the forest road back to the marshy Ruins of the Umbral Tower, rescue rock gnome scholar Professor Probble, and stop the hunters before their Shadow Gate reactivates.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Forest Trade Road",
        title: "The Chase Begins",
        safeRetreat: true,
        text: "Rounding a wooded bend, you discover a butchered merchant wagon! A black-leathered shadow elf and her pony-sized hound slip into the misty marsh while two hulking shadow-goblin brutes turn to stall you!",
        enemy: { name: "Shadow Fey Outriders", desc: "Brutal oversized shadow-goblins covering their mistress's retreat.", hp: 64, ac: 15, atk: 9, dmg: 9, xp: 185, gold: 75, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Sprint through the marsh before the Umbral Tower's gate reactivates!", to: 2 }
        ]
      },
      2: {
        zone: "Marshy Approach",
        title: "Tracking Through the Bog",
        text: "No songbirds dare enter this drowned fen. Ahead rises the half-collapsed spire of the Umbral Tower, pulsing with violet planar static!",
        choices: [
          { t: "Follow the hound's pawprints across solid hummocks.", badge: "Survival DC 13", check: { stat: "spirit", skill: "Survival", dc: 13, pass: 3, fail: 3, failDmg: 6, passMsg: "You arrive swiftly before the hunters can pack their loot!", failMsg: "Sinking bog-traps slow you down (-6 HP)!" }, onPass: { cw: "CAUGHT_IN_TIME" } },
          { t: "Charge directly across the ruined courtyard.", to: 3 }
        ]
      },
      3: {
        zone: "Umbral Tower Gate-Room",
        title: "The Shadow Fey Huntress",
        text: "Beside a flickering black archway stand three bound gnome scholars—led by Professor Probble—while the Shadow Fey Huntress and her blood-muzzled Shadow Hound raise enchanted bows! 'One last trophy before the gate opens!'",
        enemy: { name: "Shadow Fey Huntress & Hound", desc: "Lethal planar trophy-hunter and her monstrous shadow-hound.", hp: 82, ac: 16, atk: 10, dmg: 11, xp: 280, gold: 180, items: rollRandomLoot(["weapon", "armor", "cloak"], 1, "very_rare"), weakCw: ["CAUGHT_IN_TIME"] },
        choices: [
          { t: "Cut Professor Probble and the two gnome scholars free!", to: 4 }
        ]
      },
      4: {
        zone: "Umbral Tower",
        title: "Professor Probble's Lore",
        text: "Brushing mud from his spectacles, rock gnome scholar Professor Probble eagerly explains the tower's Shadow Plane gateway and helps you disable its beacon so no more raiding parties can cross.",
        onEnter: { healHp: 14, gold: 80, msg: "Professor Probble shares his shadow-lore (+14 HP) and you recover 80 GP of merchant treasure!" },
        choices: [
          { t: "Escort the three gnomes back to the trade road.", to: 5 }
        ]
      },
      5: {
        zone: "Trade Road",
        title: "Road Made Safe",
        text: "With the shadow fey hunting band eliminated, caravans resume rolling past the marsh without fear.",
        choices: [
          { t: "Report back to the Merchants' Guild.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Market",
        title: "Guild Bounty Paid",
        text: "The grateful guildmasters pay your full patrol fee and thank you for saving Professor Probble.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Hunter of the Shadow Fey",
        text: "The Umbral Tower stands silent, its planar threat sealed away.",
        ending: { type: "true", title: "Warden of the Umbral Tower", xp: 315, gold: 295, trophy: "Shadow-Fey Hunting Horn" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 17. THE WARLOCK'S CRYPT (7 PAGES • LV 9)
  // ==========================================================
  // 17. THE WARLOCK'S CRYPT (11 PAGES • LV 9)
  // ==========================================================
  bk_bol_17_warlocks_crypt: {
    id: "bk_bol_17_warlocks_crypt",
    title: "The Warlock's Crypt",
    subtitle: "The King in Silver & His Undead Sons",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Grieving Noble Family (Temple of the Dawn)",
    summary: "Enter the burial mound where the ancient King in Silver traded his two sons' souls to Death for undeath as fext—rescue their latest captive and lay the three death-sworn royals to final rest.",
    totalPages: 11,
    pages: {
      1: {
        zone: "Burial Chamber",
        title: "Three Open Coffins",
        safeRetreat: true,
        text: "Three carved marble coffins stand empty inside circular alcoves around a pitted black iron brazier. Deep, frantic claw-scratches score the inside of the two smaller stone lids where the sacrificed princes first woke in undeath—and behind a slashed silver-threaded royal tapestry descends a freezing spiral stair.",
        choices: [
          { t: "Examine the defaced royal sigils for clues to the King's pact with Death.", badge: "Arcana / Lore DC 14", check: { stat: "arcana", skill: "Lore", dc: 14, pass: 2, fail: 2, passMsg: "Fext! Undead warlocks bound to Death—blessed steel and radiant light disrupt their immortality!", failMsg: "Only cold grave-dust and brittle silver thread cling to the torn tapestry." }, onPass: { cw: "FEXT_LORE" } },
          { t: "Search the two smaller coffins for a hidden keepsake left by the princes' mother.", badge: "Perception / Lockpicking DC 14", check: { stat: "spirit", skill: "Perception", dc: 14, pass: 3, fail: 2, passMsg: "You pry up a loose marble slab inside the Red Prince's coffin, uncovering a hidden alcove!", failMsg: "Cold draft rattles the stone lids as chittering shapes stir down the stairwell." }, onPass: { cw: "MOTHER_LOCKET" } },
          { t: "Descend the secret stone stairs directly into the lower catacombs.", to: 2 }
        ]
      },
      2: {
        zone: "Lower Catacombs",
        title: "Noctiny Cultists",
        text: "Leathery wings snap out of the vaulted gloom as chittering Noctiny crypt-servants—shadow-bat fanatics bound to the undead princes—drop from the arches with hooked obsidian knives!",
        enemy: { name: "Noctiny Crypt-Servants", desc: "Feral nocturnal followers of the fext royals.", hp: 70, ac: 16, atk: 9, dmg: 10, xp: 210, gold: 90, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1, weakCw: ["MOTHER_LOCKET"] },
        choices: [
          { t: "Duck into the Moon-Shaft Reliquary beside the vaulted arch to scout the upper chute.", to: 4 },
          { t: "Follow the muffled sobs straight toward the Sacrificial Antechamber.", to: 5 }
        ]
      },
      3: {
        zone: "Queen's Alcove",
        title: "The Silver Locket",
        text: "Resting beneath the loose marble slab lies a tarnished silver locket engraved with the two princes' living names—Aurelian and Cassian—beside a crystal flask of consecrated Dawn-oil hidden by their grieving mother.",
        onEnter: { healHp: 12, xp: 35, msg: "Recovered the Queen's Locket (MOTHER_LOCKET) and consecrated Dawn-oil (+12 HP, +35 XP)!" },
        choices: [
          { t: "Slip the locket into your palm and descend into the Lower Catacombs.", to: 2 }
        ]
      },
      4: {
        zone: "Moon-Shaft Reliquary",
        title: "The Gaseous Drop-Chute",
        text: "A narrow stone chimney pierces the ceiling, letting in a silver ribbon of moonlight where the fext royals drag captives down in gaseous form. Against the damp wall stands a tarnished silver mirror and an iron-bound offertory chest.",
        choices: [
          { t: "Angle the silver mirror to pour pure moonlight straight down into the Sacrificial Antechamber!", badge: "Perception / Arcana DC 15", check: { stat: "arcana", skill: "Perception", dc: 15, pass: 5, fail: 5, passMsg: "A lance of cold silver light floods the altar below, blistering the fext royals' shadows!", failMsg: "The rusted hinge shrieks—alerting the undead princes just beyond the archway!" }, onPass: { cw: "MOONLIGHT_REFLECTED" } },
          { t: "Pick the silver-locked offertory chest before stepping into the antechamber.", badge: "Lockpicking / Agility DC 15", check: { stat: "agility", skill: "Lockpicking", dc: 15, pass: 5, fail: 5, passMsg: "Click! You recover +105 GP in ancient royal silver before advancing!", failMsg: "The lock jams as cold laughter echoes from the antechamber!" }, onPass: { cw: "OFFERTORY_LOOTED", gold: 105, xp: 30 } },
          { t: "[Turn Undead] Flood the drop-chute with radiant light to shatter the crypt's wards!", reqSpell: "Turn Undead", to: 5, onChoose: { cw: "SHAFT_BLESSED", msg: "Radiant sunlight cascades down the stone shaft, weakening the fext royals ahead!" } }
        ]
      },
      5: {
        zone: "Sacrificial Antechamber",
        title: "The Black and Red Princes",
        text: "Beneath the narrow ceiling shaft, the kidnapped noblewoman Lady Evelyn huddles in frost-rimmed chains! Stepping through the candle-smoke with blazing dark blades are the cursed Black Prince and Red Prince—and behind them looms their gaunt father, the King in Silver, crowned in tarnished moonlight!",
        choices: [
          { t: "Hold up the Queen's tarnished locket and call the princes by their living names—Aurelian and Cassian!", reqCw: "MOTHER_LOCKET", to: 6, onChoose: { cw: "SONS_SHAKEN", msg: "The Black and Red Princes stagger in grief as their living names break their father's hold!" } },
          { t: "Draw steel and charge the dark pact-altar to save Lady Evelyn!", to: 6 }
        ]
      },
      6: {
        zone: "Altar of the Silver Pact",
        title: "The King in Silver",
        text: "Cold silver fire roars across the obsidian altar as the King in Silver raises his cursed warlock blade and commands his death-sworn sons to strike!",
        enemy: { name: "King in Silver & Fext Princes", desc: "Death-sworn undead warlock king and his sacrificed sons.", hp: 90, ac: 17, atk: 11, dmg: 12, undead: true, xp: 310, gold: 215, items: ["bq_king_silver_blade"], weakCw: ["FEXT_LORE", "MOONLIGHT_REFLECTED", "SHAFT_BLESSED", "SONS_SHAKEN"] },
        choices: [
          { t: "Shatter the dark pact-altar and strike off Lady Evelyn's chains!", to: 7 }
        ]
      },
      7: {
        zone: "Royal Crypt",
        title: "Release From Death's Pact",
        text: "As the King in Silver crumbles into cold metallic ash, the two princes lower their dark blades—for one quiet heartbeat, the haunted bitterness leaves their eyes before they dissolve peacefully into pale starlight. You unlock Lady Evelyn's chains and steady her trembling shoulders.",
        onEnter: { healHp: 15, msg: "The Silver Pact shatters—warm relief restores +15 HP!" },
        choices: [
          { t: "Inspect the hollow plinth beneath the shattered pact-altar before climbing out.", to: 8 },
          { t: "Lift Lady Evelyn straight up the hidden exit shaft into cool moonlight.", to: 9 }
        ]
      },
      8: {
        zone: "Shattered Plinth",
        title: "The King's Regret",
        text: "Inside the cracked plinth rests a velvet-wrapped signet pouch and a faded ledger naming every debt the King in Silver tried to bargain away—evidence that will free three border families from ruin!",
        onEnter: { gold: 75, xp: 25, msg: "Recovered +75 GP and the King's debt-ledger (+25 XP)!" },
        choices: [
          { t: "Ascend the hidden exit shaft with Lady Evelyn into the night air.", to: 9 }
        ]
      },
      9: {
        zone: "Noble Estate",
        title: "Reunion in Tears",
        text: "Lanterns blaze across the estate courtyard as Lady Evelyn runs into her weeping family's arms. Her father clasps your gauntlets in gratitude, showering you with coin and pledging his house's enduring friendship.",
        choices: [
          { t: "Accompany the Temple of the Dawn's priests back to consecrate the mound.", to: 10 }
        ]
      },
      10: {
        zone: "Temple of the Dawn",
        title: "Mound Sealed",
        text: "At sunrise, Dawn-priests pour salt and sunlit water over the three empty coffins and seal the burial mound with iron wards so the King in Silver can never rise again.",
        choices: [
          { t: "Return to Oakhaven as ender of the Silver Pact.", to: 11 }
        ]
      },
      11: {
        zone: "Epilogue",
        title: "Ender of the Silver Pact",
        text: "The nights around Oakhaven are free of the fext royals' ghostly raids, and the sacrificed princes finally know peace.",
        ending: { type: "true", title: "Slayer of the King in Silver", xp: 355, gold: 340, trophy: "Crown of the Silver Fext" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 18. THE ABOLETH'S GROTTO (7 PAGES • LV 10)
  // ==========================================================
  bk_bol_18_aboleths_grotto: {
    id: "bk_bol_18_aboleths_grotto",
    title: "The Aboleth's Grotto",
    subtitle: "Springwell's Tainted Water & Undead Nihileth",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Priest Reddick of Springwell (Temple of the Dawn)",
    summary: "Save the town of Springwell from poisoned well water and psychic drain by descending into the glowing cacklewood grotto to destroy the undead aboleth—a Nihileth—and its adoring sahuagin cult.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Springwell Grotto",
        title: "Phosphorescent Cacklewood",
        safeRetreat: true,
        text: "A mile outside fever-stricken Springwell, phosphorescent moss illuminates damp underworld caves carpeted in strange 'cacklewood' mushrooms. Priest Reddick's missing acolytes vanished down these dripping stairs!",
        choices: [
          { t: "Avoid the cacklewood spores and study the slime-trails.", badge: "Survival / Perception DC 14", check: { stat: "spirit", skill: "Survival", dc: 14, pass: 2, fail: 2, failDmg: 7, passMsg: "You hold your breath past the laughing fungus and spot sahuagin tracks!", failMsg: "Spore dust triggers painful fits of manic laughter (-7 HP)!" }, onPass: { cw: "GROTTO_READY" } },
          { t: "March straight toward the echoing subterranean pool.", to: 2 }
        ]
      },
      2: {
        zone: "Subterranean Bridge",
        title: "Sahuagin & Enthralled Acolytes",
        text: "Fanatical finned Sahuagin and mindless undead zombies lunge across a natural stone bridge where a gleaming, long-forgotten mirror-bright shield hangs wedged in the masonry!",
        enemy: { name: "Nihileth Sahuagin Guard", desc: "Adoring sea-devil servants of the undead aboleth.", hp: 78, ac: 16, atk: 10, dmg: 11, xp: 235, gold: 105, items: ["bq_springwell_aegis"], flee: 1, weakCw: ["GROTTO_READY"] },
        choices: [
          { t: "Raise the sun-mirror shield and enter the Nihileth's Deep Pool!", to: 3 }
        ]
      },
      3: {
        zone: "Pool of the Nihileth",
        title: "The Undead Aboleth",
        text: "Boiling up from the black underground river rises a nightmarish, half-ethereal undead aboleth—a Nihileth! Psychic static hammers your skull as its writhing tentacles lash across the stone shelf!",
        enemy: { name: "Nihileth, Undead Aboleth", desc: "Ancient aberration risen in undeath to poison Springwell.", hp: 100, ac: 17, atk: 11, dmg: 13, undead: true, xp: 345, gold: 235, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["GROTTO_READY"] },
        choices: [
          { t: "Drive the Nihileth back into oblivion and cleanse the springhead!", to: 4 }
        ]
      },
      4: {
        zone: "Springwell Grotto",
        title: "Clear Waters Flow",
        text: "As the undead aboleth dissolves, the remaining sahuagin flee down the abyssal river and clear cold mountain water begins flushing the taint from Springwell's cisterns.",
        choices: [
          { t: "Return to Priest Reddick in Springwell.", to: 5 }
        ]
      },
      5: {
        zone: "Town of Springwell",
        title: "Psychic Shadow Lifted",
        text: "Color rushes back into Priest Reddick's cheeks as the psychic drain vanishes. The whole town celebrates your victory with free feasts and healing!",
        onEnter: { healHp: 20, msg: "Springwell's clergy restore your strength (+20 HP)!" },
        choices: [
          { t: "Accept the town's tribute and depart.", to: 6 }
        ]
      },
      6: {
        zone: "Highland Road",
        title: "Hero of Springwell",
        text: "Springwell pledges eternal shelter and aid whenever you pass through.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Purifier of Springwell",
        text: "The deep cavern menace beneath Springwell is destroyed, and pure water flows once more.",
        ending: { type: "true", title: "Slayer of the Nihileth", xp: 400, gold: 380, trophy: "Pearlescent Nihileth Eye" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 19. BLOODWOOD OF THE CRUOR CIRCLE (7 PAGES • LV 10)
  // ==========================================================
  bk_bol_19_bloodwood: {
    id: "bk_bol_19_bloodwood",
    title: "Bloodwood of the Cruor Circle",
    subtitle: "Mother Congeala & Dark Blood Druids",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Missing Hunter's Kin (Rusty Flagon Tavern)",
    summary: "Brave the blood-weeping trees of the Bloodwood, break the Cruor Circle's grip over the local alseid herd, and defeat blood hag Mother Congeala and her dark druids beside their crimson cauldrons.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Weeping Timberline",
        title: "Sign of the Cruor Circle",
        safeRetreat: true,
        text: "Crimson sap drips from groaning oaks around a wooden sign scrawled in blood demanding a hunter's tribute! Hooves thunder through the underbrush as wild-eyed, blood-marked alseids surround your camp!",
        choices: [
          { t: "Refuse the dark blood tribute and fight your way toward the Bloodwood heart!", to: 2 },
          { t: "Spot the blood-charm binding the alseids and call out to break their trance.", badge: "Spirit / Arcana DC 14", check: { stat: "spirit", skill: "Arcana", dc: 14, pass: 2, fail: 2, passMsg: "Several alseids hesitate, pointing trembling spears toward Mother Congeala's huts!", failMsg: "The Cruor Circle's magic drives them forward!" }, onPass: { cw: "ALSEID_DOUBT" } }
        ]
      },
      2: {
        zone: "Blood Pond Glade",
        title: "Sap Demons & Dark Druids",
        text: "Beside a steaming pool of crimson sap, two twisted Druids of the Cruor Circle summon dripping Sap Demons from the bleeding bark!",
        enemy: { name: "Cruor Druids & Sap Demons", desc: "Dark blood-druids and their sticky crimson tree-fiends.", hp: 82, ac: 16, atk: 10, dmg: 11, xp: 245, gold: 115, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1, weakCw: ["ALSEID_DOUBT"] },
        choices: [
          { t: "Storm Mother Congeala's central hut and overturn her healing blood-cauldrons!", to: 3 }
        ]
      },
      3: {
        zone: "Mother Congeala's Hut",
        title: "The Blood Hag Matriarch",
        text: "Cackling beside bubbling iron cauldrons stacked with bloodstone crowns and gold, Mother Congeala sheds her mortal disguise in a spray of crimson magic!",
        enemy: { name: "Mother Congeala, Blood Hag", desc: "Terrifying hag leader of the Cruor Circle.", hp: 102, ac: 17, atk: 12, dmg: 13, xp: 355, gold: 260, items: ["bq_cruor_scimitar"], weakCw: ["ALSEID_DOUBT"] },
        choices: [
          { t: "Overturn the blood cauldrons and free the captives from the neighboring huts!", to: 4 }
        ]
      },
      4: {
        zone: "The Cleansed Glade",
        title: "The Trees Stop Weeping",
        text: "As Mother Congeala falls, the bleeding bark seals over and the surviving alseids flee into the sunlit woods, freed from her blood-bind. You raid her hut's treasure and escort the rescued captives out!",
        onEnter: { gold: 140, healHp: 16, msg: "Rescued the captives, claimed 140 GP in bloodstone relics, and recovered (+16 HP)!" },
        choices: [
          { t: "Lead the survivors back to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Outskirts",
        title: "Safe Trails Again",
        text: "Hunters and woodcutters rejoice as the sinister crimson fog lifts from the timberline.",
        choices: [
          { t: "Collect your reward.", to: 6 }
        ]
      },
      6: {
        zone: "Rusty Flagon Tavern",
        title: "A Warm Hearth",
        text: "The rescued hunter's kin buy drinks for the entire tavern in your honor.",
        choices: [
          { t: "Finish the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Breaker of the Cruor Circle",
        text: "Mother Congeala's bloody coven is no more, and the forest breathes clean again.",
        ending: { type: "true", title: "Cleanser of the Bloodwood", xp: 410, gold: 395, trophy: "Bloodstone Crown of Congeala" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 20. IMPERIAL GHOUL OUTPOST (7 PAGES • LV 10)
  // ==========================================================
  bk_bol_20_ghoul_outpost: {
    id: "bk_bol_20_ghoul_outpost",
    title: "Imperial Ghoul Outpost",
    subtitle: "Splitsoul Ore & The Iron Marshal",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Duergar Clan Leaders & Ukri Mukgrim (Oakhaven Forge)",
    summary: "Descend into the unmapped caverns where fifty duergar prospectors vanished while mining strange splitsoul ore, rescue survivor Traas Mukgrim, and smash the Iron Marshal of the Ghoul Imperium.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Mukgrim Minehead",
        title: "Ukri's Warning",
        safeRetreat: true,
        text: "Twitching survivor Ukri Mukgrim grips your sleeve: 'Corpses in armor... they want the splitsoul ore!' The duergar leaders promise masterwork arms and a priceless gem if you clear the newly excavated deep caverns.",
        choices: [
          { t: "Calm Ukri gently to learn the layout of the splitsoul vein.", badge: "Spirit / Persuasion DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 2, fail: 2, passMsg: "Ukri draws a shaky chalk map showing where the undead ambush squads wait!", failMsg: "Madness overtakes Ukri before he can say more." }, onPass: { cw: "MINE_MAP" } },
          { t: "Descend the iron lift straight into the unmapped tunnels.", to: 2 }
        ]
      },
      2: {
        zone: "Splitsoul Seam",
        title: "Armored Iron Ghouls",
        text: "Marching in eerie legionary lockstep, plate-clad Imperial Iron Ghouls advance down the glistening ore tunnel with jagged halberds!",
        enemy: { name: "Imperial Iron Ghoul Squad", desc: "Disciplined undead soldiers of the Ghoul Imperium.", hp: 84, ac: 17, atk: 11, dmg: 11, undead: true, xp: 255, gold: 120, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1, weakCw: ["MINE_MAP"] },
        choices: [
          { t: "Free captive prospector Traas Mukgrim and push into the Obelisk Vault!", to: 3, onChoose: { cw: "TRAAS_FREED", healHp: 14, msg: "Rescued Traas Mukgrim, who shares the ghouls' battle plans (+14 HP)!" } }
        ]
      },
      3: {
        zone: "Chamber of the Splitsoul Obelisk",
        title: "The Iron Marshal",
        text: "Before a ten-foot writhing obelisk of pure splitsoul ore stands the towering Iron Marshal—an elite darakhul commander of the Ghoul Imperium! 'This ore belongs to the Emperor of Bones!' it rasps, raising a rune-etched greatsword!",
        enemy: { name: "The Iron Marshal", desc: "Formidable armored commander of the Ghoul Imperium outpost.", hp: 104, ac: 17, atk: 12, dmg: 13, undead: true, xp: 360, gold: 250, items: ["bq_splitsoul_warhammer"], weakCw: ["MINE_MAP", "TRAAS_FREED"] },
        choices: [
          { t: "Collapse the Ghoul Imperium's feeder tunnel behind the obelisk!", to: 4 }
        ]
      },
      4: {
        zone: "Mukgrim Minehead",
        title: "Intelligence Won",
        text: "Traas Mukgrim carries priceless intelligence on the Ghoul Imperium's expansion plans back to the surface.",
        choices: [
          { t: "Collect the duergar leaders' promised gem and smithing reward.", to: 5 }
        ]
      },
      5: {
        zone: "Duergar Hall",
        title: "A Blow to the Imperium",
        text: "The grim duergar lords honor their bargain to the last coin.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Guildhall",
        title: "Warning Posted",
        text: "Guild scouts mark the deep mine on frontier maps so the Ghoul Imperium will not catch the realm unawares.",
        choices: [
          { t: "Finish the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Bane of the Iron Marshal",
        text: "You struck a decisive blow against the Ghoul Imperium's underground advance.",
        ending: { type: "true", title: "Crusher of the Ghoul Outpost", xp: 415, gold: 400, trophy: "Splitsoul Ore Shard" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 21. THE CISTERN (11 PAGES • LV 10)
  // ==========================================================
  bk_bol_21_the_cistern: {
    id: "bk_bol_21_the_cistern",
    title: "The Cistern",
    subtitle: "Hada the Black's Lair & The Deep Drake",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Priestess Tallenya of Charun (Town Square)",
    summary: "Armed with Priestess Tallenya's sacred undead-banishing beacon, descend into dead necromancer Hada the Black's unused city cistern, uncover her drake-tamer's study, and rescue five missing orphans from imperial ghouls and her monstrous Deep Drake.",
    totalPages: 11,
    pages: {
      1: {
        zone: "Unused City Cistern",
        title: "Tallenya's Sacred Beacon",
        safeRetreat: true,
        text: "Cold rain drums against the rusted iron street-grate above Hada the Black's abandoned cistern. The necromancer died in prison, yet five missing orphans remain trapped below with her subterranean 'pet.' Pale Priestess Tallenya of Charun presses a wrapped bronze incense-beacon into your hands—while beside the flooded main steps, a dry brick service-flue angles upward into the dark.",
        onEnter: { cw: "CHARUN_BEACON", msg: "Received Tallenya's Sacred Beacon of Charun!" },
        choices: [
          { t: "Descend the sour-smelling stone stairs straight into the flooded cistern.", to: 2 },
          { t: "Pick the rusted latch on the brick service-flue to scout above the tunnel.", badge: "Lockpicking / Agility DC 15", check: { stat: "agility", skill: "Lockpicking", dc: 15, pass: 8, fail: 2, passMsg: "The grate swings silently—you slip onto the dry upper aqueduct walk!", failMsg: "The iron pin snaps loud in the echo—ghouls hiss below the stairs!" } },
          { t: "Listen at the dark arch with Perception to time the ghoul patrol.", badge: "Perception / Spirit DC 15", check: { stat: "spirit", skill: "Perception", dc: 15, pass: 8, fail: 2, passMsg: "You catch a lull in their rasping chatter and slip up the side service-flue!", failMsg: "Claws scrape on wet stone—the ghoul picket spots your lantern!" } }
        ]
      },
      2: {
        zone: "Flooded Cistern Tunnel",
        title: "Officer Naragal's Ghouls",
        text: "Lurking waist-deep in the stagnant shadows below the city streets, Officer Naragal and his scouting pack of Imperial Ghouls bare yellowed fangs at the scent of living flesh!",
        enemy: { name: "Officer Naragal & Ghouls", desc: "Underworld ghoul scouts allied with the late necromancer.", hp: 82, ac: 16, atk: 11, dmg: 11, undead: true, xp: 250, gold: 115, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["CHARUN_BEACON"] },
        choices: [
          { t: "Climb the iron rungs to inspect Hada's dry brick study above the tunnel.", to: 8 },
          { t: "Unwrap Tallenya's Sacred Beacon to clear the lingering undead and enter the Main Basin!", to: 3 }
        ]
      },
      3: {
        zone: "Main Cistern Basin",
        title: "Hada's Pet — The Deep Drake",
        text: "Huddled trembling on a dry stone ledge weep the five missing orphans—guarded by Hada's terrifying, eyeless underground 'pet': a massive, roaring Deep Drake coiled like pale iron around the vaulted pillars!",
        enemy: { name: "Hada's Deep Drake", desc: "Ferocious subterranean drake hatched from a stolen underworld egg.", hp: 104, ac: 17, atk: 12, dmg: 13, xp: 365, gold: 240, items: ["bq_charun_oar_charm"], weakCw: ["DRAKE_WHISTLE", "DRAKE_RATTLED"] },
        choices: [
          { t: "Gather all five terrified orphans and lead them swiftly up to the daylight!", to: 4 }
        ]
      },
      4: {
        zone: "City Street",
        title: "Children Returned",
        text: "Waiting at the rain-washed cistern steps, Priestess Tallenya and the City Inquisitor greet the five unharmed children with tears of relief and hand over the full city bounty share!",
        onEnter: { healHp: 18, msg: "All five orphans saved! Tallenya tends your wounds (+18 HP)." },
        choices: [
          { t: "Hand Hada's Underworld ghoul-pact notes to Tallenya and the City Inquisitor!", reqCw: "DRAKE_WHISTLE", badge: "DRAKE_WHISTLE", to: 5, onChoose: { gold: 85, xp: 55, msg: "The City Inquisitor adds an 85 GP & 55 XP intelligence bonus for Hada's ghoul-pact notes!" } },
          { t: "Watch the watchmen seal and collapse Hada's cursed cistern.", to: 5 },
          { t: "Slip back for Hada's unclaimed black-market bullion box before the watchmen collapse the steps.", to: 11 }
        ]
      },
      5: {
        zone: "Town Square",
        title: "Blessing of the Boatman",
        text: "Tallenya dips her oar-carved staff in deep respect: 'Charun remembers those who grant the restless dead peace and spare the innocent.'",
        choices: [
          { t: "Visit the orphanage before returning to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Orphanage",
        title: "Safe Beds Tonight",
        text: "Warm soup steams on the long oak table and relieved laughter fills the sunlit courtyard once more as all five children tumble back into familiar arms.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Savior of the Cistern",
        text: "Hada the Black's dark legacy is burned away, the cistern lies sealed forever, and five young lives are saved.",
        ending: { type: "true", title: "Deliverer of the Five Orphans", xp: 415, gold: 410, trophy: "Bronze Oar of Charun" },
        choices: []
      },
      8: {
        zone: "Upper Aqueduct Walk",
        title: "Hada's Sealed Study",
        text: "Above the dark water runs a dry brick alcove serving as Hada the Black's secret study. Across her slate desk lie notes on Underworld ghoul-pacts, a silver whistle carved like a wyrm-tooth, a needle-warded coin-drawer, and a heavy brass storm-sluice wheel.",
        choices: [
          { t: "Study Hada's drake-handling notes and claim the silver Wyrm-Tooth Whistle!", badge: "Arcana DC 15", check: { stat: "arcana", skill: "Arcana", dc: 15, pass: 9, fail: 9, failDmg: 8, passMsg: "You decode her sub-audible command pitch cleanly—this will blind the eyeless drake's hearing!", failMsg: "A residual necrotic glyph scorches your palm (-8 HP), yet you secure the whistle!" } },
          { t: "Disarm the poison-needle ward on Hada's coin-drawer with Detect Traps!", reqSkill: "Detect Traps", badge: "Detect Traps", to: 9, onChoose: { gold: 95, msg: "You disarm the needle-latch cleanly and claim 95 GP alongside Hada's whistle!" } },
          { t: "Climb back down into the Flooded Cistern Tunnel.", to: 2 }
        ]
      },
      9: {
        zone: "Upper Aqueduct Walk",
        title: "The Drake-Tamer's Whistle",
        text: "You pocket Hada's silver Wyrm-Tooth Whistle and restore your strength with an unopened herbal cordial from her shelf (+15 HP, +5 MP). Beside the doorway, the brass storm-sluice wheel can flush Naragal's ghoul patrol straight downriver!",
        onEnter: { cw: "DRAKE_WHISTLE", healHp: 15, healMp: 5, msg: "Gained DRAKE_WHISTLE, +15 HP & +5 MP!" },
        choices: [
          { t: "Crank open the storm-sluice to sweep the ghouls away and slip to the Cistern Overflow!", to: 10 },
          { t: "Descend into the Flooded Tunnel to purge Officer Naragal's ghouls directly.", to: 2 }
        ]
      },
      10: {
        zone: "Cistern Overflow",
        title: "The Echoing Pillars",
        text: "From the high overflow arch you look down into the vaulted Main Cistern Basin. Five huddled orphans shiver on a dry ledge while Hada's eyeless Deep Drake stalks the central pillars below.",
        choices: [
          { t: "Blow Hada's silver Wyrm-Tooth Whistle to scramble the eyeless drake's senses!", reqCw: "DRAKE_WHISTLE", badge: "DRAKE_WHISTLE", to: 3, onChoose: { cw: "DRAKE_RATTLED", msg: "The Deep Drake thrashes wildly, its keen subterranean hearing shattered by the silver pitch!" } },
          { t: "Unwrap Tallenya's Sacred Beacon with Turn Undead to flood the basin in golden light!", reqSpell: "Turn Undead", mp: 4, badge: "Turn Undead (4 MP)", to: 3, onChoose: { cw: "DRAKE_RATTLED", msg: "Blinding Charun-light sears the dark basin, staggering the subterranean beast!" } },
          { t: "Ignite the oil-slick runoff below with Firebolt to drive the drake off its perch!", reqSpell: "Firebolt", mp: 3, badge: "Firebolt (3 MP)", to: 3, onChoose: { cw: "DRAKE_RATTLED", msg: "Roaring flames force the panicked drake away from the children's ledge!" } },
          { t: "Drop straight down into the Main Cistern Basin!", to: 3 }
        ]
      },
      11: {
        zone: "Epilogue",
        title: "Slayer of the Deep Drake",
        text: "All five orphans rest safely in Tallenya's care while you slip into the rain-washed alleys carrying Hada the Black's hidden ironbound bullion chest!",
        ending: { type: "victory", title: "Slayer of the Deep Drake", xp: 380, gold: 485, trophy: "Eyeless Drake-Fang" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 22. FANE OF SERPENTS (7 PAGES • LV 10)
  // ==========================================================
  bk_bol_22_fane_serpents: {
    id: "bk_bol_22_fane_serpents",
    title: "Fane of Serpents",
    subtitle: "Titan's Height & Thont-Aisk the Titanoboa",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Caravan Drovers (Oakhaven Market)",
    summary: "Climb the four terraced plateaus of Titan's Height, outfight rival mage Karakin Aram's mercenary band, and survive the wrath of Thont-Aisk—the colossal, monument-crushing Titanoboa!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Titan's Height • Lower Terrace",
        title: "Terraces of an Ancient Race",
        safeRetreat: true,
        text: "Four terraced plateaus of eerie, many-columned ruins rise stark above the plains. Livestock and travelers keep vanishing near the cliff—and perched on the upper colonnades wait rival mage Karakin Aram and his ruthless sellswords!",
        choices: [
          { t: "Scale the shaded eastern columns to flank Aram's sentries.", badge: "Stealth / Athletics DC 14", check: { stat: "agility", skill: "Stealth", dc: 14, pass: 2, fail: 2, passMsg: "You climb to the third terrace before Aram's mercs spot you!", failMsg: "Loose rubble clatters—Aram's band rallies to intercept you!" }, onPass: { cw: "TERRACE_FLANK" } },
          { t: "Ascend the grand central serpent-staircase.", to: 2 }
        ]
      },
      2: {
        zone: "Third Plateau Colonnade",
        title: "Karakin Aram's Mercenaries",
        text: "Experienced rival adventurers led by scheming mage Karakin Aram loose spells and crossbow bolts from behind fallen pillars!",
        enemy: { name: "Karakin Aram & Mercenaries", desc: "Ruthless rival mage and sellswords exploiting the ruins.", hp: 86, ac: 16, atk: 11, dmg: 12, xp: 265, gold: 145, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["TERRACE_FLANK"] },
        choices: [
          { t: "Brace yourself as Aram strikes the stone pit-rim—summoning Thont-Aisk!", to: 3 }
        ]
      },
      3: {
        zone: "Fourth Plateau • Serpent Pit",
        title: "Thont-Aisk, The Monument Crusher",
        text: "The earth shakes as a nightmarishly vast Titanoboa—wider than a wagon and long as a galley—slithers up from the abyssal pit, shattering marble columns with its coils!",
        enemy: { name: "Thont-Aisk the Titanoboa", desc: "Colossal, ancient monument-crushing serpent of Titan's Height.", hp: 108, ac: 17, atk: 12, dmg: 14, xp: 380, gold: 255, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["TERRACE_FLANK"] },
        choices: [
          { t: "Search the serpent's den beneath the ruins for devoured caravan treasure!", to: 4, onChoose: { gold: 130, msg: "Recovered 130 GP in ancient serpent-gold from the pit!" } }
        ]
      },
      4: {
        zone: "Titan's Height Summit",
        title: "Quiet Over the Plains",
        text: "With the colossal titanoboa slain and Aram's band broken, the surviving secretive lizardfolk bow respectfully from afar and vanish into the ravines.",
        choices: [
          { t: "Descend the four stone terraces.", to: 5 }
        ]
      },
      5: {
        zone: "Plains Road",
        title: "Herds Safe Once More",
        text: "Shepherds and caravan drovers celebrate as the shadow of Titan's Height lifts.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Market",
        title: "Slayer of the Great Serpent",
        text: "Merchants pool a handsome purse for clearing the dangerous plateau.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Conqueror of Titan's Height",
        text: "Thont-Aisk the Monument Crusher will trouble the plains no more.",
        ending: { type: "true", title: "Slayer of the Titanoboa", xp: 425, gold: 410, trophy: "Colossal Serpent Fang" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 23. SKY STAIRS OF BELDESTAN (8 PAGES • LV 14)
  // Part 1 of 2 (Leads directly into Citadel of the Void Dragons)
  // ==========================================================
  bk_bol_23_sky_stairs: {
    id: "bk_bol_23_sky_stairs",
    title: "Sky Stairs of Beldestan",
    subtitle: "Part 1 of 2 • Five-Mile Pilgrimage Into the Clouds",
    difficulty: "Deadly",
    recommendedLevel: 14,
    autoDiscover: false,
    discoverySource: "Order of Champions (Oakhaven Guildhall)",
    summary: "Undertake the brutal five-mile ascent up the ancient Sky Stairs of Beldestan into rarified, freezing air 31,000 feet above the earth—defeat vampire warlock Valeed and his voidlings to earn the title Al-Faraz!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Base of Beldestan",
        title: "Stairway to the Heavens",
        safeRetreat: true,
        text: "Rising from dusty foothills straight into the clouds, the ancient Sky Stairs of Beldestan climb five dizzying miles toward the edge of the void. Few mortals ever return from the summit—those who do are honored forever as Al-Faraz, 'Of the Summit.'",
        choices: [
          { t: "Pace your breathing and bundle against the thinning, freezing altitude.", badge: "Survival / Might DC 15", check: { stat: "might", skill: "Survival", dc: 15, pass: 2, fail: 2, failDmg: 10, passMsg: "You acclimatize steadily to the thin mountain air!", failMsg: "Biting altitude chill saps your strength (-10 HP) as you climb!" }, onPass: { cw: "ALTITUDE_READY" } },
          { t: "Press upward swiftly past the first cloudbank!", to: 2 }
        ]
      },
      2: {
        zone: "Cloud-Wrapped Steps (18,000 ft)",
        title: "Predators of the Gale",
        text: "Howling winds tear at your cloak as colossal mountain rocs and frost-wrapped undead pilgrims swoop down the narrow stone steps!",
        enemy: { name: "Beldestan Sky-Stalkers", desc: "Howling wind-undead and storm-eagles guarding the ascent.", hp: 106, ac: 18, atk: 13, dmg: 14, undead: true, xp: 370, gold: 180, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["ALTITUDE_READY"] },
        choices: [
          { t: "Climb past the Meadow of Stones into the freezing stars above 30,000 feet!", to: 3 }
        ]
      },
      3: {
        zone: "Upper Steps (31,000 ft)",
        title: "Warlock Valeed & The Voidlings",
        text: "Where the sky turns deep violet-black and fire magic sputters in the thin air, vampire warlock Valeed blocks the final landing flanked by three shimmering Voidlings! 'None pass to the Void Citadel without paying blood to the stars!'",
        enemy: { name: "Vampire Warlock Valeed & Voidlings", desc: "High-altitude vampire warlock commanding alien voidlings.", hp: 132, ac: 19, atk: 14, dmg: 16, undead: true, xp: 520, gold: 340, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["ALTITUDE_READY"] },
        choices: [
          { t: "Step onto the final stone landing at the edge of the void!", to: 4 }
        ]
      },
      4: {
        zone: "The Summit Landing",
        title: "Edge of the Firmament",
        text: "Before you looms a scorched steel portcullis marked with titanic dragon claws—the threshold to the orbital Citadel of the Void Dragons!",
        choices: [
          { t: "Catch your breath and record the sky-path before returning or pressing on in Part 2!", to: 5 }
        ]
      },
      5: {
        zone: "Summit Shrine",
        title: "Title of Al-Faraz",
        text: "A radiant celestial herald salutes your feat, restoring your vigor and naming you Al-Faraz—'Of the Summit.'",
        onEnter: { healHp: 25, restoreMp: 10, msg: "Blessed at the summit (+25 HP, +10 MP)!" },
        choices: [
          { t: "Descend to prepare for the Citadel of the Void Dragons!", to: 6 }
        ]
      },
      6: {
        zone: "Foothills of Beldestan",
        title: "Pilgrims' Acclaim",
        text: "Crowds at the base of the stairs kneel in awe as you return bearing roc-plumes and star-touched frost.",
        choices: [
          { t: "Claim your champion's honors.", to: 7 }
        ]
      },
      7: {
        zone: "Oakhaven Guildhall",
        title: "Path to the Void Opened",
        text: "The Order of Champions rewards your legendary climb—and warns that the mated Void Dragons at the summit now know your scent!",
        choices: [
          { t: "Complete Part 1 and unlock Part 2: Citadel of the Void Dragons!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Al-Faraz of Beldestan",
        text: "You have conquered the five-mile Sky Stairs! <strong>Citadel of the Void Dragons (Part 2 of 2)</strong> is now unlocked on your Quest Board!",
        ending: { type: "true", title: "Al-Faraz of the Sky Stairs", xp: 560, gold: 520, trophy: "Quiver of Roc Feathers" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 24. CITADEL OF THE VOID DRAGONS (8 PAGES • LV 15)
  // Part 2 of 2 (Prerequisite: bk_bol_23_sky_stairs)
  // ==========================================================
  bk_bol_24_void_citadel: {
    id: "bk_bol_24_void_citadel",
    reqQuest: "bk_bol_23_sky_stairs",
    title: "Citadel of the Void Dragons",
    subtitle: "Part 2 of 2 • Orbital Lair of Astraxis & Yrsinestra",
    difficulty: "Deadly",
    recommendedLevel: 15,
    autoDiscover: false,
    discoverySource: "Unlocks after Sky Stairs of Beldestan",
    summary: "Lift the claw-scarred portcullis atop the Sky Stairs into the freezing orbital citadel of the mated void dragons Astraxis and Yrsinestra, survive their star-void minions, and claim the humming Star Sapphires!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Top of the Stairs",
        title: "The Claw-Scarred Portcullis",
        safeRetreat: true,
        text: "At the freezing edge of space, a hardened steel portcullis seals the Courtyard of Bones beyond. Titanic claw marks gouge the flagstones where void dragon Astraxis hunts below while his mate Yrsinestra guards their newly laid clutch!",
        choices: [
          { t: "Heave up the scorched steel portcullis with heroic strength!", badge: "Might DC 16", check: { stat: "might", skill: "Athletics", dc: 16, pass: 2, fail: 2, failDmg: 10, passMsg: "With a metallic groan, the giant gate rises smoothly!", failMsg: "Straining in the thin air sears your lungs (-10 HP) as you squeeze beneath!" } },
          { t: "Squeeze through an astral vent using agility and arcane wards.", badge: "Arcana / Agility DC 15", check: { stat: "arcana", skill: "Arcana", dc: 15, pass: 2, fail: 2, passMsg: "You slip cleanly into the Courtyard of Bones!", failMsg: "Void-frost bites your hands (-8 HP) as you drop inside." }, onPass: { cw: "VOID_WARDED" } }
        ]
      },
      2: {
        zone: "Courtyard of Bones",
        title: "Noctiny & Mi-Go Sentinels",
        text: "Enormous whale and cattle bones litter the star-lit courtyard! Chittering Mi-Go star-fungi and Void Monolith guardians swoop down from the icy ramparts!",
        enemy: { name: "Void Citadel Star-Minions", desc: "Alien mi-go and noctiny attendants guarding Yrsinestra's nest.", hp: 112, ac: 18, atk: 13, dmg: 15, xp: 410, gold: 210, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["VOID_WARDED"] },
        choices: [
          { t: "Enter the Vault of Stars where Yrsinestra broods over her clutch!", to: 3 }
        ]
      },
      3: {
        zone: "Vault of Stars",
        title: "Yrsinestra, Void Dragon",
        text: "Coiled beneath a dome open to swirling galaxies, the terrifying star-scaled Void Dragon Yrsinestra unfurls wings of living blackness! Gravity warps around her as she unleashes a roaring breath of collapsing void!",
        enemy: { name: "Yrsinestra the Void Dragon", desc: "Colossal cosmic dragon guarding her orbital clutch and Star Sapphires.", hp: 146, ac: 19, atk: 15, dmg: 17, xp: 620, gold: 440, items: ["bq_void_star_sapphire"], weakCw: ["VOID_WARDED"] },
        choices: [
          { t: "Claim the humming Star Sapphire and sprint for the portal before Astraxis returns!", to: 4 }
        ]
      },
      4: {
        zone: "Orbital Ramparts",
        title: "A Roar From Below",
        text: "Far below in the clouds echoes the furious roar of Astraxis returning from the hunt—yet the enchanted Star Sapphire cushions your leap through the shimmering descent-gate!",
        choices: [
          { t: "Plummet safely back to the mortal peaks beneath a feather-fall glow!", to: 5 }
        ]
      },
      5: {
        zone: "Beldestan Foothills",
        title: "Echo of the Court of a Million Stars",
        text: "The Star Sapphire hums warmly against your chest, vibrating in harmony with the realm's hidden ley lines.",
        choices: [
          { t: "Return to Oakhaven in legendary triumph.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Guildhall",
        title: "Mythic Feat",
        text: "Archmages and champions alike stand to salute the mortal who raided an orbital Void Dragon's citadel and returned alive!",
        choices: [
          { t: "Complete the Sky Stairs & Void Citadel saga!", to: 7 }
        ]
      },
      7: {
        zone: "Oakhaven Square",
        title: "A Name Among the Stars",
        text: "Bards compose an epic cycle of your five-mile climb and battle at the edge of space.",
        choices: [
          { t: "Claim your mythic reward!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Raider of the Void Citadel",
        text: "Even the living stars whisper your name after your triumph over the Citadel of the Void Dragons.",
        ending: { type: "true", title: "Conqueror of the Void Citadel", xp: 660, gold: 620, trophy: "Shard of the Void Crown" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 25. A TRIANGLE IN SHADOWS (8 PAGES • LV 15)
  // ==========================================================
  bk_bol_25_triangle_shadows: {
    id: "bk_bol_25_triangle_shadows",
    title: "A Triangle in Shadows",
    subtitle: "Rotating Triangular Tower & Three Umbral Vampires",
    difficulty: "Deadly",
    recommendedLevel: 15,
    autoDiscover: false,
    discoverySource: "Carpenter Galon (Rusty Flagon Tavern)",
    summary: "Enter the pitch-black forest north of town to find three missing dwarven woodcutters, breach Caragorn's bizarre alternating-triangle shadow tower, destroy the Soul Organ, and survive the deadly love-triangle of umbral vampires Caragorn, Philadon, and Zenobia!",
    totalPages: 8,
    pages: {
      1: {
        zone: "The Forest in Shadow",
        title: "Utter Blackness",
        safeRetreat: true,
        text: "Sad-faced carpenter Galon begged you to find his three missing dwarven cousins in the northern woods—never realizing he is an unwitting pawn of umbral vampire Zenobia! Within a half-mile of the strange windowless triangular tower, even torchlight dims to twilight as tenebrous Shadows swarm from the pines!",
        enemy: { name: "Caragorn's Forest Shadows", desc: "Tenebrous undead remnants of the tower's recent victims.", hp: 108, ac: 18, atk: 13, dmg: 14, undead: true, xp: 390, gold: 170, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Step into the strange alternating-triangle shadow tower!", to: 2 }
        ]
      },
      2: {
        zone: "Second Triangle Floor",
        title: "Writhing Statues & Void Speech",
        text: "Each triangular story points opposite the one below it! Writhing stone statues line shelves of Void Speech grimoires, while an eerie bone-and-silver Soul Organ pulses with dark music powering the forest's gloom!",
        choices: [
          { t: "Smash the Soul Organ immediately to trap the tower and break its dark aura!", badge: "Might / Arcana DC 15", check: { stat: "might", skill: "Athletics", dc: 15, pass: 3, fail: 3, failDmg: 10, passMsg: "Discordant shrieks fade—the tower's shadow magic collapses!", failMsg: "Necrotic chords blast back (-10 HP) as the pipes finally shatter!" }, onPass: { cw: "SOUL_ORGAN_BROKEN" } },
          { t: "Ascend directly toward the top-floor balcony.", to: 3 }
        ]
      },
      3: {
        zone: "Top Triangle Balcony",
        title: "Caragorn, Philadon & Zenobia",
        text: "In the apex salon, umbral vampires Caragorn and Philadon leap up from a shadowed divan—just as jealous Zenobia bursts through the mist behind you! 'Clear the mortals first!' Zenobia hisses, fangs bared as all three shadow-vampires strike!",
        enemy: { name: "The Umbral Vampire Triangle", desc: "Caragorn, Philadon, and vengeful Zenobia—fiendish umbral vampires.", hp: 148, ac: 19, atk: 15, dmg: 17, undead: true, xp: 640, gold: 460, items: ["bq_umbral_soul_harp"], weakCw: ["SOUL_ORGAN_BROKEN"] },
        choices: [
          { t: "Shatter the shadow-illusion balcony and let pure sunlight flood the tower!", to: 4 }
        ]
      },
      4: {
        zone: "Shattered Balcony",
        title: "Sunlight Returns to the Woods",
        text: "Golden daylight pours over the northern canopy as the umbral vampires turn to drifting ash. Below in the cellar, you recover the fallen woodcutters' signets and Caragorn's priceless esoteric library.",
        onEnter: { gold: 180, msg: "Claimed 180 GP in archaic art and Void Speech tomes!" },
        choices: [
          { t: "Return to carpenter Galon with solemn truth and peace for his kin.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Outskirts",
        title: "End of the Shadow Swath",
        text: "Sunlight once again warms the northern timberline, and travelers pass safely beneath clear skies.",
        choices: [
          { t: "Accept the town's mythic bounty.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Guildhall",
        title: "Book of Lairs Conquered",
        text: "Every single lair from the riverfront docks to the orbital void and shadow-woods has bowed before your blade!",
        choices: [
          { t: "Celebrate your triumph!", to: 7 }
        ]
      },
      7: {
        zone: "Rusty Flagon Tavern",
        title: "Legend of Oakhaven",
        text: "Tankards rise high as your name joins the greatest heroes of the realm.",
        choices: [
          { t: "Complete the adventure!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Vanquisher of the Shadow Triangle",
        text: "Caragorn's baleful tower stands inert, and the umbral vampires' deadly intrigue ends forever.",
        ending: { type: "true", title: "Breaker of the Shadow Triangle", xp: 680, gold: 640, trophy: "Shattered Pipe of the Soul Organ" },
        choices: []
      }
    }
  }
});
