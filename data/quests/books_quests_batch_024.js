/* ============================================================
   CHRONICLES OF OAKHAVEN — BOOK QUESTS BATCH 024 (13 Quests)
   - 7 Standalone Adventures (Lv 2 – Lv 5):
     The Light of Memoria, Casting the Longest Shadow,
     The White Worg Accord, Death of a Mage,
     Legend of Beacon Rock, Beneath the Witchwillow,
     The Glowing Ossuary
   - Wrath of the River King (6-Part Campaign Chain • Lv 5 → 7):
     Parts I through VI linked via reqQuest
   All quests use autoDiscover: false (Inn Rumor Pool / reqQuest).
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. THE LIGHT OF MEMORIA (7 PAGES • LV 2)
  // ==========================================================
  bk_b24_light_of_memoria: {
    id: "bk_b24_light_of_memoria",
    title: "The Light of Memoria",
    subtitle: "The Fallen Archway & The Oubliette",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Apprentice Tymon accidentally opened a shadow-road portal with an uprooted relic and vanished into the surreal Oubliette—rekindle the Light of Memoria and rescue him from the Forgotten!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Uprooted Forest Archway",
        title: "The Dropped Lantern",
        safeRetreat: true,
        text: "Beside a storm-felled oak stands a moss-choked stone archway humming with pale ley-energy. Lying in the mud is the Light of Memoria—a silver lantern dropped by Gellert's missing apprentice Tymon when he stumbled headlong into the shadow-realm of the Oubliette!",
        choices: [
          { t: "Channel a spark of arcane focus into the Light of Memoria to stabilize the portal.", badge: "Arcana / Spirit DC 11", check: { stat: "arcana", skill: "Arcana", dc: 11, pass: 2, fail: 2, passMsg: "The lantern flares bright silver, opening a clean archway and warding off shadow-drain!", failMsg: "The portal flickers erratically—you leap through before it snaps shut!" }, onPass: { cw: "LANTERN_CHARGED" } },
          { t: "Hold the lantern aloft and step boldly through the shimmering archway.", to: 2 }
        ]
      },
      2: {
        zone: "The Oubliette",
        title: "Corridors of Lost Memory",
        text: "Inside the Oubliette, floating cobbles drift through violet mist while forgotten voices echo from shuttered arches. Restless shadow-husks peel away from the walls, drawn to your living warmth!",
        enemy: { name: "Oubliette Shadow-Husks", desc: "Hollow undead remnants wandering the amputated shadow-road.", hp: 22, ac: 12, atk: 4, dmg: 5, undead: true, xp: 55, gold: 25, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["LANTERN_CHARGED"] },
        choices: [
          { t: "Follow Tymon's frantic cries deeper into the floating cloister.", to: 3 }
        ]
      },
      3: {
        zone: "Cloister of Echoes",
        title: "Tymon's Trail",
        text: "You spot Tymon's torn satchel snagged on a silver railing, along with a chalk-scrawled ward circle warning of a cruel wraith called the Forgotten.",
        onEnter: { healHp: 8, msg: "You find a spare healing draught in Tymon's satchel (+8 HP)!" },
        choices: [
          { t: "Trace Tymon's silver ward-chalk onto your weapon before entering the inner cell.", badge: "Lore / Arcana DC 11", check: { stat: "lore", skill: "Arcana", dc: 11, pass: 4, fail: 4, passMsg: "Silver runes flare along your steel—ready to cut through wraith-flesh!", failMsg: "The chalk crumbles as a freezing howl shakes the cloister!" }, onPass: { cw: "SILVER_CHALK" } },
          { t: "[Turn Undead] Raise the Light of Memoria and stride straight into the Forgotten's cell!", reqSpell: "Turn Undead", to: 4 }
        ]
      },
      4: {
        zone: "Cell of the Forgotten",
        title: "Master of the Oubliette",
        text: "Huddled behind a cracked pillar, apprentice Tymon trembles as the Forgotten—a crowned wraith draped in tattered shadow-banners—sweeps down to claim his last memories!",
        enemy: { name: "The Forgotten", desc: "A tyrannical wraith ruling the undead of the Oubliette.", hp: 28, ac: 13, atk: 5, dmg: 6, undead: true, xp: 85, gold: 50, items: ["bq_memoria_lantern"], weakCw: ["LANTERN_CHARGED", "SILVER_CHALK"] },
        choices: [
          { t: "Pull Tymon to his feet and guide him back toward the silver archway.", to: 5 }
        ]
      },
      5: {
        zone: "Shifting Threshold",
        title: "Out of the Mist",
        text: "The Oubliette shudders as the Forgotten dissolves into pale motes. Holding the glowing Light of Memoria high, you haul Tymon back through the archway into crisp forest air.",
        choices: [
          { t: "Escort the shaken apprentice back to his master's lodge.", to: 6 }
        ]
      },
      6: {
        zone: "Forest Edge",
        title: "A Lesson Learned",
        text: "Tymon swears off poking uprooted relics forever and insists you keep the Light of Memoria alongside his master's rescue purse.",
        choices: [
          { t: "Collect your reward and return to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Memory Preserved",
        text: "Tymon is safe, the Forgotten is banished, and the Light of Memoria shines warmly in your keeping.",
        ending: { type: "true", title: "Bearer of the Light of Memoria", xp: 120, gold: 95, trophy: "Silver Seal of the Oubliette" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. CASTING THE LONGEST SHADOW (7 PAGES • LV 5)
  // ==========================================================
  bk_b24_longest_shadow: {
    id: "bk_b24_longest_shadow",
    title: "Casting the Longest Shadow",
    subtitle: "The Village of Shimmer & The Shadow Roads",
    difficulty: "Medium",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Cross the Shadow Roads on behalf of Ernalda and Teppen to rescue stolen children from the burning village of Shimmer and break a cruel shadow-fey hunter!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Shimmer Forest Path",
        title: "Smoke Along the Shadow Road",
        safeRetreat: true,
        text: "Sent by Ernalda from Bad Solitz to help her cousin Teppen, you step off the twilight Shadow Road expecting a quiet riverside hamlet—only to see smoke curling above the trees! Two terrified dark-folk villagers race down the path: 'Clawed beasts with pitch-black eyes are raiding Shimmer!'",
        choices: [
          { t: "Sprint straight into Shimmer's burning square to shield the villagers!", to: 2 },
          { t: "Circle along the misty riverbank to ambush the shadow-beasts from the reeds.", badge: "Stealth / Agility DC 13", check: { stat: "agility", skill: "Stealth", dc: 13, pass: 2, fail: 2, passMsg: "You slip behind the snarling raiders unseen!", failMsg: "Dry reeds snap—black-eyed stalkers whirl toward you!" }, onPass: { cw: "REED_FLANK" } }
        ]
      },
      2: {
        zone: "Village of Shimmer",
        title: "Claws in the Smoke",
        text: "Gaunt, long-clawed shadow hounds and pale fey skirmishers prowl between the thatched cottages, herding captives toward a black carriage!",
        enemy: { name: "Shadow-Road Stalkers", desc: "Pitch-eyed fey hounds and dark-court raiders pillaging Shimmer.", hp: 46, ac: 14, atk: 6, dmg: 8, xp: 110, gold: 55, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["REED_FLANK"] },
        choices: [
          { t: "Follow the black carriage tracks into the silver-thorned glade.", to: 3 }
        ]
      },
      3: {
        zone: "Silver-Thorn Glade",
        title: "Court Etiquette & Cold Iron",
        text: "Beside a ruined milestone, a wounded shadow-fey guide whispers that the raid leader is a disgraced courtier trying to buy back favor with mortal captives—and hands you a cold-iron bell that disrupts his illusions.",
        onEnter: { healHp: 10, msg: "The guide's shadow-salve restores +10 HP!" },
        choices: [
          { t: "Ring the cold-iron bell to shatter the courtier's gloom-veil before charging!", badge: "Spirit / Arcana DC 13", check: { stat: "spirit", skill: "Lore", dc: 13, pass: 4, fail: 4, passMsg: "The chime strips away the courtier's shadow-armor!", failMsg: "The bell rings flat—shadows coil tightly around the carriage!" }, onPass: { cw: "VEIL_SHATTERED" } },
          { t: "Rush the black carriage with weapon raised!", to: 4 }
        ]
      },
      4: {
        zone: "Twilight Pavilion",
        title: "The Longest Shadow",
        text: "Beneath a lantern of purple flame, the disgraced Shadow-Fey Huntsman draws a twin-edged gloom-blade, his own elongated shadow rising like a second warrior beside him!",
        enemy: { name: "Shadow-Fey Huntsman", desc: "A ruthless twilight courtier commanding a living blade of shadow.", hp: 58, ac: 15, atk: 7, dmg: 10, xp: 170, gold: 115, items: ["bq_longest_shadow_blade"], weakCw: ["VEIL_SHATTERED", "REED_FLANK"] },
        choices: [
          { t: "Unlock the black carriage and free Teppen's kin and Shimmer's captives.", to: 5 }
        ]
      },
      5: {
        zone: "Shimmer Landing",
        title: "Lanterns Relit",
        text: "With the Huntsman defeated, Shimmer's grateful dark-folk guide you and the rescued children safely back down the lantern-lit Shadow Road.",
        choices: [
          { t: "Return through the twilight arch to Bad Solitz.", to: 6 }
        ]
      },
      6: {
        zone: "Bad Solitz Embassy",
        title: "Teppen's Gratitude",
        text: "Teppen and Ernalda weep with relief as the children are safely returned, rewarding you handsomely for braving the Shadow Realm.",
        choices: [
          { t: "Collect your reward and return to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Dawn Past the Shadow Road",
        text: "Shimmer's fires are doused, the captives are home, and your name is spoken with respect on both sides of the Shadow Road.",
        ending: { type: "true", title: "Walker of the Shadow Roads", xp: 245, gold: 185, trophy: "Cold-Iron Milestone Bell" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. THE WHITE WORG ACCORD (7 PAGES • LV 3)
  // ==========================================================
  bk_b24_white_worg_accord: {
    id: "bk_b24_white_worg_accord",
    title: "The White Worg Accord",
    subtitle: "The Wellenreiter & Wolfheim's Icy Coast",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Sail aboard the Wellenreiter to Wolfheim, repel trollkin longship raiders, and recover the dwarves' stolen albino worg pup from the cursed Baleful Eye!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Deck of the Wellenreiter",
        title: "Longships on the Starboard Bow",
        safeRetreat: true,
        text: "Hired at Stannasgard's Järnhall feast to aid the dwarven White Worg clan, you sail toward Wolfheim's rocky coast aboard Captain Meeresohn's ship—when two sleek longships packed with roaring trollkin reavers cut across the waves!",
        choices: [
          { t: "Loose flaming arrows or oil-pots before their grappling hooks bite the hull!", badge: "Agility / Perception DC 12", check: { stat: "agility", skill: "Perception", dc: 12, pass: 2, fail: 2, passMsg: "Your volley splinters their lead oars and throws the raiders off balance!", failMsg: "Iron hooks slam into the gunwale—trollkin leap onto the deck!" }, onPass: { cw: "LONGSHIP_DAMAGED" } },
          { t: "Meet the boarding trollkin steel-to-steel at the mainmast!", to: 2 }
        ]
      },
      2: {
        zone: "Wellenreiter Main Deck",
        title: "Reavers of the Ice-Sea",
        text: "Snarling trollkin bandits vault over the rail, swinging notched boarding-axes as sea-spray lashes the planks!",
        enemy: { name: "Trollkin Longship Reavers", desc: "Fierce northern raiders hunting the shipping lanes off Wolfheim.", hp: 30, ac: 13, atk: 5, dmg: 6, xp: 75, gold: 35, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["LONGSHIP_DAMAGED"] },
        choices: [
          { t: "Make landfall at Wolfheim and speak with Revna Ravenstone.", to: 3 }
        ]
      },
      3: {
        zone: "Wolfheim Homestead",
        title: "The Stolen Albino Pup",
        text: "At the battered dwarven hall, Revna Ravenstone admits grimly that the trollkin raided their docks and stole their sacred albino worg pup—wielding a dread talisman, the Baleful Eye of Chernobog, that broke the defenders' nerve!",
        onEnter: { healHp: 8, msg: "Dwarven honey-mead warms your bones (+8 HP)!" },
        choices: [
          { t: "Track the reavers' sled-ruts along the icy fjord to their sea-cave hideout.", badge: "Survival / Stealth DC 12", check: { stat: "agility", skill: "Survival", dc: 12, pass: 4, fail: 4, passMsg: "You slip past the fjord lookouts and spot the glowing Baleful Eye hanging over the firepit!", failMsg: "Crunching snow alerts the trollkin chieftain inside the cave!" }, onPass: { cw: "FJORD_SNEAK" } },
          { t: "March boldly into the trollkin sea-cave with a dwarven war-horn!", to: 4 }
        ]
      },
      4: {
        zone: "Reavers' Sea-Cave",
        title: "The Baleful Eye",
        text: "Inside the torch-lit cavern, a towering trollkin jarl brandishes a pulsing violet talisman—the Baleful Eye—while the snow-white worg pup snarls fiercely from an iron cage behind him!",
        enemy: { name: "Trollkin Jarl & Ice-Hounds", desc: "A ruthless reaver captain empowered by a dread fear-talisman.", hp: 38, ac: 13, atk: 6, dmg: 7, xp: 105, gold: 65, items: ["bq_white_worg_fang_charm"], weakCw: ["FJORD_SNEAK", "LONGSHIP_DAMAGED"] },
        choices: [
          { t: "Smash the Baleful Eye and unlock the albino worg pup's iron cage!", to: 5 }
        ]
      },
      5: {
        zone: "Wolfheim Cliffs",
        title: "A Loyal Companion",
        text: "The snow-white pup bounds happily at your heels as you carry the shattered talisman back to Wolfheim's hall.",
        choices: [
          { t: "Return the sacred pup to Revna Ravenstone and the White Worg clan.", to: 6 }
        ]
      },
      6: {
        zone: "White Worg Hall",
        title: "The Accord Sealed",
        text: "Cheers shake the timber rafters as the albino pup returns home. Revna seals the White Worg Accord with a heavy chest of northern silver.",
        choices: [
          { t: "Sail back on the Wellenreiter toward Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Friend of the White Worg",
        text: "The Baleful Eye is broken, the sea-lanes off Wolfheim are safer, and the White Worg dwarves sing of your valor.",
        ending: { type: "true", title: "Champion of the White Worg Accord", xp: 155, gold: 125, trophy: "Silver Worg-Claw Clasp" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. DEATH OF A MAGE (7 PAGES • LV 3)
  // ==========================================================
  bk_b24_death_of_a_mage: {
    id: "bk_b24_death_of_a_mage",
    title: "Death of a Mage",
    subtitle: "Broomskill Alley & The Clockwork Workshop",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Clockwork artisans Ovras and Friganis fear for their reclusive colleague Uvalius—investigate his barred Broomskill Alley workshop and shut down a malfunctioning planar engine!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Broomskill Alley",
        title: "The Barred Workshop",
        safeRetreat: true,
        text: "At the Hedgehog tavern, clockwork optician Ovras and gear-grinder Friganis hire you to check on their friend Uvalius, who hasn't answered his Broomskill Alley door in days. Inside the shuttered workshop, a moldy half-eaten sandwich sits on the table while tiny brass clockwork spiders skitter uneasily across the floor!",
        choices: [
          { t: "Inspect the cellar's shimmering brass engine to understand its planar distortion.", badge: "Arcana / Lore DC 12", check: { stat: "arcana", skill: "Arcana", dc: 12, pass: 2, fail: 2, passMsg: "Half the device exists on another plane—you spot the brass cut-off valve!", failMsg: "Arcane static arcs off the gears, waking the workshop's clockwork watchdogs!" }, onPass: { cw: "VALVE_SPOTTED" } },
          { t: "Check the barred side-door and wine-cellar stairs with weapon drawn.", to: 2 }
        ]
      },
      2: {
        zone: "Uvalius's Workroom",
        title: "Runaway Automaton Guards",
        text: "Brass shutters clang down as a pair of wind-up clockwork hounds and a sparking lens-turret lunge across the workbenches!",
        enemy: { name: "Haywire Clockwork Watchdogs", desc: "Brass-and-spring workshop guardians driven berserk by planar static.", hp: 30, ac: 13, atk: 5, dmg: 6, xp: 75, gold: 40, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["VALVE_SPOTTED"] },
        choices: [
          { t: "Descend the stone stairs into the humming planar wine-cellar.", to: 3 }
        ]
      },
      3: {
        zone: "Planar Wine-Cellar",
        title: "Between Gears & Worlds",
        text: "Amid fine vintage casks, a towering brass-and-crystal contraption blinks rapidly in and out of phase! Beside it lies poor Uvalius's journal—his experiment tore open a rift and pulled a hostile planar construct into his cellar!",
        onEnter: { gold: 40, msg: "You secure a rare vintage flask and Uvalius's bench purse (+40 GP)!" },
        choices: [
          { t: "Jam the brass cut-off valve with an iron spanner before the guardian strikes!", badge: "Lockpicking / Strength DC 12", check: { stat: "agility", skill: "Lockpicking", dc: 12, pass: 4, fail: 4, passMsg: "Sparks shower the cellar as the engine powers down—weakening the planar construct!", failMsg: "The spanner snaps in half as the shimmering construct steps through the rift!" }, onPass: { cw: "ENGINE_SLOWED" } },
          { t: "Confront the shimmering planar guardian head-on!", to: 4 }
        ]
      },
      4: {
        zone: "The Phase Engine",
        title: "The Gear-Rift Construct",
        text: "Forged of half-solid crystal and whirling clockwork rings, the planar automaton levitates over the shattered workbench and fires lances of blinding optical light!",
        enemy: { name: "Planar Optical Construct", desc: "A rogue extradimensional automaton summoned by Uvalius's misfired engine.", hp: 38, ac: 14, atk: 6, dmg: 7, xp: 105, gold: 60, items: ["bq_uvalius_optic_lens"], weakCw: ["VALVE_SPOTTED", "ENGINE_SLOWED"] },
        choices: [
          { t: "Shut down the phase engine and recover Uvalius's final research ledger.", to: 5 }
        ]
      },
      5: {
        zone: "Quiet Workshop",
        title: "Silence in Broomskill Alley",
        text: "The blurring gears spin to a halt, and the tiny clockwork spiders settle peacefully along the shelves.",
        choices: [
          { t: "Bring Uvalius's ledger and optic findings back to Ovras and Friganis.", to: 6 }
        ]
      },
      6: {
        zone: "The Hedgehog Tavern",
        title: "A Guildsman's Farewell",
        text: "Ovras and Friganis raise a somber toast to their fallen colleague, thanking you for keeping Broomskill Alley from being swallowed by the rift.",
        choices: [
          { t: "Accept the clockwork guild's fee and return to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Mystery of Broomskill Alley",
        text: "Uvalius's workshop is safe, his notes are preserved by his friends, and the planar rift is sealed tight.",
        ending: { type: "true", title: "Investigator of Broomskill Alley", xp: 155, gold: 120, trophy: "Uvalius's Brass Gear-Key" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. LEGEND OF BEACON ROCK (7 PAGES • LV 4)
  // ==========================================================
  bk_b24_beacon_rock: {
    id: "bk_b24_beacon_rock",
    title: "Legend of Beacon Rock",
    subtitle: "Fog-Bound Cliffs & The Lighthouse Ruins",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Row beneath the afternoon sea-fog to Beacon Rock, stop ruthless Grave Raider mercenaries, and rescue the stranded child they abandoned in the undead-infested ruins!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Beacon Rock Cove",
        title: "Approach Under Sea-Fog",
        safeRetreat: true,
        text: "Thick coastal fog blankets the jagged cliffs of Beacon Rock. Mercenaries calling themselves the Grave Raiders beat their local guides, refused to pay, and abandoned a child and a wounded ally inside the haunted lighthouse ruins above!",
        choices: [
          { t: "Row silently into the western sea-cave under cover of the afternoon fog.", badge: "Stealth / Agility DC 12", check: { stat: "agility", skill: "Stealth", dc: 12, pass: 2, fail: 2, passMsg: "You slip right underneath the Grave Raiders' sentry nest unseen!", failMsg: "Your oar scrapes stone—the sentry blows a brass whistle!" }, onPass: { cw: "FOG_APPROACH" } },
          { t: "Beach the rowboat openly and storm the cliffside steps!", to: 2 }
        ]
      },
      2: {
        zone: "Cliffside Camp",
        title: "The Grave Raiders",
        text: "Bickering mercenaries snatch up crossbows and boarding axes as you crest the slick stone steps!",
        enemy: { name: "Grave Raider Mercenaries", desc: "Cruel tomb-looters who left innocent guides to die in the ruins.", hp: 38, ac: 13, atk: 6, dmg: 7, xp: 90, gold: 50, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["FOG_APPROACH"] },
        choices: [
          { t: "Climb into the ruined lighthouse vault before the coastal undead close in!", to: 3 }
        ]
      },
      3: {
        zone: "Sunken Reliquary",
        title: "Relics & Survivors",
        text: "Inside a barricaded storage room, you find the trembling child and injured guide huddled beside ancient gilded reliefs embedded in the masonry!",
        onEnter: { healHp: 10, msg: "The relieved guide shares a healing salve (+10 HP)!" },
        choices: [
          { t: "Carefully pry a gilded sea-idol from the cracked masonry before escorting them out.", badge: "Lockpicking / Perception DC 12", check: { stat: "agility", skill: "Lockpicking", dc: 12, pass: 4, fail: 4, passMsg: "You extract the relic intact (+50 GP) without waking extra crypt-ghouls!", failMsg: "Loose rubble clatters—drawing the lighthouse's undead keeper!" }, onPass: { cw: "RELIC_EXTRACTED", gold: 50 } },
          { t: "Lead the survivors straight up the lantern stair toward the signal fire!", to: 4 }
        ]
      },
      4: {
        zone: "Beacon Lantern Room",
        title: "The Drowned Keeper",
        text: "Green witch-fire blazes inside the shattered Fresnel lens as the Drowned Keeper—a barnacle-crusted undead captain—bars the seaward escape arch!",
        enemy: { name: "Drowned Lighthouse Keeper", desc: "An ancient sea-wight bound to Beacon Rock's cursed lantern.", hp: 48, ac: 14, atk: 6, dmg: 9, undead: true, xp: 140, gold: 85, items: ["bq_beacon_lens_buckler"], weakCw: ["FOG_APPROACH", "RELIC_EXTRACTED"] },
        choices: [
          { t: "Relight the true beacon brazier and guide the survivors down to the rowboat.", to: 5 }
        ]
      },
      5: {
        zone: "Beacon Rock Shore",
        title: "Safe Harbor",
        text: "Warm amber light cuts through the coastal fog for the first time in a century as you row the rescued child and guide back to the mainland.",
        choices: [
          { t: "Deliver the survivors safely to the harbor-master.", to: 6 }
        ]
      },
      6: {
        zone: "Coastal Harbor",
        title: "Gratitude of the Guides",
        text: "The child's family weeps with joy, and the harbor-master awards you the full salvage bounty on Beacon Rock.",
        choices: [
          { t: "Return to Oakhaven with the sea-salt still on your cloak.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Light on the Cliffs",
        text: "The Grave Raiders are routed, the Drowned Keeper rests, and Beacon Rock guides ships safely once more.",
        ending: { type: "true", title: "Savior of Beacon Rock", xp: 195, gold: 160, trophy: "Gilded Beacon Prism" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. BENEATH THE WITCHWILLOW (7 PAGES • LV 5)
  // ==========================================================
  bk_b24_beneath_witchwillow: {
    id: "bk_b24_beneath_witchwillow",
    title: "Beneath the Witchwillow",
    subtitle: "The Amberthaud Grove & Yffreyja's Demesne",
    difficulty: "Medium",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "When young Lilli Amberthaud vanishes before an arranged marriage, Lady Ollana Elincourt begs you to clear her son's name—follow Lilli's footsteps beneath the fey Witchwillow!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Amberthaud Woodland Grove",
        title: "A Mother's Plea",
        safeRetreat: true,
        text: "Grief-lined Lady Ollana Elincourt begs you to prove her son Harper had nothing to do with Lilli Amberthaud's disappearance. North of the Amberthaud estate, silver weeping-boughs cascade over a hollowed hill—the ancient Witchwillow, doorway to the fey demesne of Yffreyja!",
        choices: [
          { t: "Inspect the willow roots for Lilli's footprints and fey glamour-rings.", badge: "Survival / Perception DC 13", check: { stat: "lore", skill: "Survival", dc: 13, pass: 2, fail: 2, passMsg: "You spot Lilli's ribbon tied willingly to a willow-bough—she came here seeking refuge!", failMsg: "Dew-slick moss hides the trail as thorny fey guards step out of the mist!" }, onPass: { cw: "LILLI_TRUTH" } },
          { t: "Part the weeping silver boughs and descend beneath the Witchwillow.", to: 2 }
        ]
      },
      2: {
        zone: "Root-Woven Hall",
        title: "Sentinels of the Willow",
        text: "Beneath the earth, glowing moss lights a cavernous root-hall where thorn-masked fey wardens level briar spears to keep mortal busybodies out!",
        enemy: { name: "Witchwillow Briar-Wardens", desc: "Fey guardians sworn to protect Yffreyja's subterranean court.", hp: 46, ac: 14, atk: 6, dmg: 8, xp: 110, gold: 55, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["LILLI_TRUTH"] },
        choices: [
          { t: "Step into the lantern-lit bower where Yffreyja holds court with Lilli.", to: 3 }
        ]
      },
      3: {
        zone: "Yffreyja's Bower",
        title: "The Runaway Bride",
        text: "Amid hanging silver lanterns sits Lilli Amberthaud—unharmed, conversing earnestly with the regal fey arch-lady Yffreyja! 'My parents refused to cancel the betrothal,' Lilli cries. 'I fled here myself—Harper is innocent, yet Yffreyja's bargain demands a trial of champion's mettle to release me freely!'",
        onEnter: { healHp: 10, msg: "Lilli offers you clear spring-water from the bower (+10 HP)!" },
        choices: [
          { t: "Appeal gracefully to Yffreyja's sense of fey honor to temper the trial!", badge: "Persuasion / Spirit DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 4, fail: 4, passMsg: "Yffreyja smiles thinly and restrains her court's darkest curses during the bout!", failMsg: "Yffreyja waves a slender hand—unleashing her full gnarled champion!" }, onPass: { cw: "FEY_HONOR" } },
          { t: "Accept Yffreyja's trial of steel on Lilli's behalf!", to: 4 }
        ]
      },
      4: {
        zone: "Circle of Weeping Roots",
        title: "Yffreyja's Champion",
        text: "A towering knight woven from silver willow-heartwood and moonlit armor rises from the roots, saluting you with a crackling thorn-greatsword!",
        enemy: { name: "Willow-Heart Champion", desc: "Yffreyja's fey duelist guarding the release of mortal bargains.", hp: 58, ac: 15, atk: 7, dmg: 10, xp: 165, gold: 115, items: ["bq_witchwillow_cloak"], weakCw: ["LILLI_TRUTH", "FEY_HONOR"] },
        choices: [
          { t: "Accept Yffreyja's nod of respect and escort Lilli back to the surface.", to: 5 }
        ]
      },
      5: {
        zone: "Estate Clearing",
        title: "The Truth Spoken",
        text: "Emerging into golden afternoon light, Lilli stands tall and clears Harper's name before both families, declaring her own path.",
        choices: [
          { t: "Receive Lady Ollana Elincourt's heartfelt thanks.", to: 6 }
        ]
      },
      6: {
        zone: "Elincourt Manor",
        title: "A Mother's Relief",
        text: "Lady Ollana presses a velvet pouch of gold into your palm with tears of gratitude—her son is cleared and peace is restored.",
        choices: [
          { t: "Head back down the road to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Bargain Honored",
        text: "Harper Elincourt is exonerated, Lilli walks free of both forced marriage and fey debt, and the Witchwillow sleeps quietly.",
        ending: { type: "true", title: "Champion Beneath the Witchwillow", xp: 245, gold: 185, trophy: "Silver Bough of Yffreyja" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. THE GLOWING OSSUARY (7 PAGES • LV 5)
  // ==========================================================
  bk_b24_glowing_ossuary: {
    id: "bk_b24_glowing_ossuary",
    title: "The Glowing Ossuary",
    subtitle: "Naz'Vaza's Cursed Tomb & The Bone-Heart",
    difficulty: "Medium",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Descend into the tomb of the cruel tyrant-architect Naz'Vaza, whose glowing profane sigils bind his murdered laborers in undeath—and shatter the Heart of the Glowing Ossuary!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Ossuary Entrance",
        title: "You Can Rest When You're Dead",
        safeRetreat: true,
        text: "Long ago, the cruel overseer Naz'Vaza murdered an exhausted laborer with a snapped pulley—sparking a revolt that stoned the tyrant to death. Yet his tomb now pulses with eerie, indecipherable glowing sigils that bind undead workers to endless torment!",
        choices: [
          { t: "Study the glowing Naz'Vazian sigils to trace their power back to the central Heart.", badge: "Arcana / Perception DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 2, fail: 2, passMsg: "You spot the resonant bone-conduits feeding the sigils—you can sever them!", failMsg: "The profane light dazzles your eyes as skeletal overseers march from the alcoves!" }, onPass: { cw: "CONDUITS_SEEN" } },
          { t: "Draw steel and descend straight into the bone-lined nave.", to: 2 }
        ]
      },
      2: {
        zone: "Gallery of Bound Bones",
        title: "The Tireless Dead",
        text: "Glowing runes flare across the brows of skeletal laborers and armored overseers, forcing them to attack even against their own will!",
        enemy: { name: "Sigil-Bound Overseers", desc: "Undead tomb-guards enslaved by Naz'Vaza's glowing profane markings.", hp: 46, ac: 14, atk: 6, dmg: 8, undead: true, xp: 110, gold: 55, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["CONDUITS_SEEN"] },
        choices: [
          { t: "Press onward to the Vault of the Glowing Heart.", to: 3 }
        ]
      },
      3: {
        zone: "Pulley-Chamber",
        title: "Echoes of the Revolt",
        text: "Beside a rusted stone-hoist, a whisper of defiant laborers' spirits urges you to drop the counterweight onto Naz'Vaza's altar-shield!",
        onEnter: { healHp: 10, msg: "The grateful workers' spirits steady your breath (+10 HP)!" },
        choices: [
          { t: "Release the rusted hoist-pin to crack Naz'Vaza's bone-shield below!", badge: "Detect Traps / Strength DC 13", check: { stat: "might", skill: "Detect Traps", dc: 13, pass: 4, fail: 4, passMsg: "The stone counterweight crashes down, shattering half the profane sigils!", failMsg: "The rusted chain screeches—warning Naz'Vaza in the sanctum!" }, onPass: { cw: "WEIGHT_DROPPED" } },
          { t: "[Turn Undead] Advance into the sanctum with radiant light blazing!", reqSpell: "Turn Undead", to: 4 }
        ]
      },
      4: {
        zone: "Heart of the Ossuary",
        title: "Naz'Vaza Unmasked",
        text: "Behind a gleaming porcelain mask hides the risen revenant of Naz'Vaza, channeling blinding necrotic fire from a floating crystal Heart of fused bones!",
        enemy: { name: "Naz'Vaza, Masked Tyrant", desc: "A cruel undead overseer empowered by the Heart of the Glowing Ossuary.", hp: 60, ac: 15, atk: 7, dmg: 10, undead: true, xp: 170, gold: 115, items: ["bq_nazvaza_mask"], weakCw: ["CONDUITS_SEEN", "WEIGHT_DROPPED"] },
        choices: [
          { t: "Shatter the Glowing Heart and free every bound soul in the ossuary!", to: 5 }
        ]
      },
      5: {
        zone: "Fading Nave",
        title: "Rest at Last",
        text: "As the Glowing Heart splinters, every profane sigil across the tomb winks out. Dozens of skeletal laborers lower their tools and crumble peacefully into quiet dust.",
        choices: [
          { t: "Recover the tyrant's hoarded gold coffer and climb into the fresh air.", to: 6 }
        ]
      },
      6: {
        zone: "Hillside Cairn",
        title: "A Quiet Monument",
        text: "You lay a simple stone atop the laborers' cairn outside the tomb before turning homeward.",
        choices: [
          { t: "Return to Oakhaven with the ossuary finally laid to rest.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "The Sigils Extinguished",
        text: "Naz'Vaza's cruelty is ended forever, and the bound dead of the Glowing Ossuary have finally earned their rest.",
        ending: { type: "true", title: "Breaker of the Glowing Ossuary", xp: 250, gold: 190, trophy: "Shattered Heart-Crystal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. WRATH OF THE RIVER KING I (7 PAGES • LV 5)
  // Part 1 of 6
  // ==========================================================
  bk_b24_river_king_1: {
    id: "bk_b24_river_king_1",
    title: "Wrath of the River King I: Riverbend & The Millpond",
    subtitle: "Part 1 of 6 • Hamlet of Riverbend & Rutyer Mill",
    difficulty: "Medium",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "At the edge of Vergrace Forest, the miller of Riverbend begs you to find his missing elven bride Ellessandra—unravel fey mischief and plunge through the enchanted millpond!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Hamlet of Riverbend",
        title: "The Golden Knight Tavern",
        safeRetreat: true,
        text: "Riverbend sits where mortal farmland overlaps the ancient Vergrace Forest. At the Golden Knight Tavern, Reeve Kolya warns of restless fey—and the weeping miller begs you to rescue his missing elven bride, Ellessandra, who vanished near Rutyer Millpond!",
        choices: [
          { t: "Speak gently with the talking bear and satyrs lurking near the mill-lane.", badge: "Persuasion / Lore DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 2, fail: 2, passMsg: "The satyrs giggle and reveal that Ellessandra passed straight through the millpond gate into the Summer Lands!", failMsg: "The satyrs mock you and vanish just as hunting bugbears crash through the brush!" }, onPass: { cw: "SATYR_CLUE" } },
          { t: "Patrol the willow bank around Rutyer Millpond with steel drawn.", to: 2 }
        ]
      },
      2: {
        zone: "Rutyer Mill Road",
        title: "The Hunting Bugbears",
        text: "Fey-hired bugbear trackers burst from the reeds around the creaking waterwheel, swinging spiked morningstars!",
        enemy: { name: "Fey-Bound Hunting Bugbears", desc: "Brutish woodland hunters patrolling Riverbend for a Summer Court lord.", hp: 46, ac: 14, atk: 6, dmg: 8, xp: 110, gold: 55, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["SATYR_CLUE"] },
        choices: [
          { t: "Inspect the shimmering emerald reflection at the bottom of Rutyer Millpond.", to: 3 }
        ]
      },
      3: {
        zone: "Rutyer Millpond",
        title: "The Pond and the Knight",
        text: "Beneath the millpond's glassy surface glows a submerged archway of sunlit reeds! A spectral water-knight rises waist-deep to warn you: 'Cross the rushing river if you dare—the River King's eel hounds guard the far bank!'",
        onEnter: { healHp: 8, msg: "The cool river-mist refreshes your spirit (+8 HP)!" },
        choices: [
          { t: "Time your dive with the waterwheel's current to slip cleanly through the fey portal!", badge: "Athletics / Agility DC 13", check: { stat: "agility", skill: "Athletics", dc: 13, pass: 4, fail: 4, passMsg: "You shoot cleanly through the swirling vortex onto the far bank with momentum to spare!", failMsg: "The rushing river batters you onto the pebbles right before the eel hounds!" }, onPass: { cw: "CLEAN_SWIM" } },
          { t: "Plunge straight into the glowing millpond gate!", to: 4 }
        ]
      },
      4: {
        zone: "Threshold of the Rushing River",
        title: "The Eel Hounds",
        text: "Slick, amphibious fey hounds with crackling fins and needle-sharp fangs surge out of the foaming rapids to tear apart mortal trespassers!",
        enemy: { name: "River King's Eel Hounds", desc: "Amphibious fey beasts guarding the sunken crossing into the Summer Lands.", hp: 56, ac: 14, atk: 7, dmg: 10, xp: 155, gold: 95, items: ["bq_riverbend_pearl_ring"], weakCw: ["SATYR_CLUE", "CLEAN_SWIM"] },
        choices: [
          { t: "Climb onto the sunlit moss bank of the Fey Summer Lands.", to: 5 }
        ]
      },
      5: {
        zone: "Summer Bank",
        title: "Another Sky",
        text: "Above you, golden twilight hangs timeless over towering silver oaks. Far ahead, delicate elven footprints lead deeper into the enchanted woods.",
        choices: [
          { t: "Follow Ellessandra's trail into the Summer Lands.", to: 6 }
        ]
      },
      6: {
        zone: "Vergrace Crossing",
        title: "Into Fey Territory",
        text: "You wring river-water from your cloak and prepare for the strange customs of the Summer Kingdoms.",
        choices: [
          { t: "Complete Part 1 and unlock Part 2: Into the Summer Lands!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Through the Millpond",
        text: "You have crossed the millpond into the Summer Lands. <strong>Wrath of the River King II: Into the Summer Lands</strong> is now unlocked!",
        ending: { type: "true", title: "Crosser of Rutyer Millpond (Part 1 of 6)", xp: 230, gold: 170, trophy: "Millpond River-Stone" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. WRATH OF THE RIVER KING II (7 PAGES • LV 5)
  // Part 2 of 6 (Prerequisite: bk_b24_river_king_1)
  // ==========================================================
  bk_b24_river_king_2: {
    id: "bk_b24_river_king_2",
    reqQuest: "bk_b24_river_king_1",
    title: "Wrath of the River King II: Into the Summer Lands",
    subtitle: "Part 2 of 6 • The Dark Woods & Frog Marsh",
    difficulty: "Medium",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Unlocks after Wrath of the River King I",
    summary: "Navigate the shifting trails of the Summer Lands past the Frog Marsh, Le Nain Rouge, boar patrols, and cutting quicklings to reach the Enchantress's glade!",
    totalPages: 7,
    pages: {
      1: {
        zone: "The Dark Woods",
        title: "Customs of the Summer Lands",
        safeRetreat: true,
        text: "In the Summer Lands, silver coin means little next to riddles, favors, and hospitality. Across the croaking Frog Marsh, a crimson-capped imp—Le Nain Rouge—cackles from a toadstool while a heavily armored Boar Patrol grunts down the sunken lane!",
        choices: [
          { t: "Trade a clever riddle with Le Nain Rouge to learn the safe path around the Boar Patrol.", badge: "Lore / Persuasion DC 13", check: { stat: "lore", skill: "Persuasion", dc: 13, pass: 2, fail: 2, passMsg: "Le Nain Rouge tips his red cap and shows you a dry log-bridge behind the patrol!", failMsg: "The red imp laughs shrill alarm—bringing the Boar Patrol charging!" }, onPass: { cw: "NAIN_ROUGE_TIP" } },
          { t: "Splash straight across the Frog Marsh with steel ready.", to: 2 }
        ]
      },
      2: {
        zone: "The Frog Marsh",
        title: "The Boar Patrol",
        text: "Tusked fey war-boars ridden by bronze-armored redcaps thunder down the mossy causeway, lowering barbed lances!",
        enemy: { name: "Summer Court Boar Patrol", desc: "Aggressive fey outriders policing the marsh roads of the Summer Lands.", hp: 48, ac: 14, atk: 6, dmg: 9, xp: 115, gold: 60, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["NAIN_ROUGE_TIP"] },
        choices: [
          { t: "Press into the lantern-hung birch glade ahead.", to: 3 }
        ]
      },
      3: {
        zone: "Whispering Glade",
        title: "The Enchantress's Warning",
        text: "A serene fey enchantress and her courtiers offer you sweet honey-cakes and reveal that Ellessandra was seen heading toward the Birch Queen's Fair—but warn that razor-fast Cutting Quicklings stalk the outer meadow!",
        onEnter: { healHp: 10, msg: "The Enchantress's honey-cakes restore +10 HP!" },
        choices: [
          { t: "Scatter dried hawthorn berries along the meadow path to slow the quicklings!", badge: "Survival / Perception DC 13", check: { stat: "lore", skill: "Survival", dc: 13, pass: 4, fail: 4, passMsg: "The quicklings stumble over the hawthorn wards, losing their blurring speed!", failMsg: "Silver blurs flash past your ears before you can finish the ward!" }, onPass: { cw: "QUICKLINGS_SLOWED" } },
          { t: "Brace your guard and cross the windswept meadow!", to: 4 }
        ]
      },
      4: {
        zone: "Silver Meadow",
        title: "The Cutting Quicklings",
        text: "Moving faster than the eye can blink, wicked silver-haired quicklings dart through the tall grass with twin razor-daggers!",
        enemy: { name: "Cutting Quickling Pack", desc: "Blindingly fast fey assassins ambushing travelers bound for the Fair.", hp: 56, ac: 15, atk: 7, dmg: 10, xp: 165, gold: 105, items: ["bq_quickling_razor_dagger"], weakCw: ["NAIN_ROUGE_TIP", "QUICKLINGS_SLOWED"] },
        choices: [
          { t: "Follow the distant sound of harps and laughter toward the Birch Queen's Fair.", to: 5 }
        ]
      },
      5: {
        zone: "Lantern Road",
        title: "Banners on the Horizon",
        text: "Beyond the birch-grove rise towering silk pavilions lit by floating willow-wisps—the legendary Birch Queen's Fair!",
        choices: [
          { t: "Approach the grand fairground gates.", to: 6 }
        ]
      },
      6: {
        zone: "Fairground Outskirts",
        title: "Bargains Await",
        text: "You tighten your cloak and step toward the lively fey market where Ellessandra's trail grows warm.",
        choices: [
          { t: "Complete Part 2 and unlock Part 3: The Birch Queen's Fair!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Road to the Fair",
        text: "You have survived the Summer Lands' wilds. <strong>Wrath of the River King III: The Birch Queen's Fair</strong> is now unlocked!",
        ending: { type: "true", title: "Traveler of the Summer Lands (Part 2 of 6)", xp: 240, gold: 180, trophy: "Red Cap Token of Le Nain Rouge" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. WRATH OF THE RIVER KING III (7 PAGES • LV 6)
  // Part 3 of 6 (Prerequisite: bk_b24_river_king_2)
  // ==========================================================
  bk_b24_river_king_3: {
    id: "bk_b24_river_king_3",
    reqQuest: "bk_b24_river_king_2",
    title: "Wrath of the River King III: The Birch Queen's Fair",
    subtitle: "Part 3 of 6 • Fey Barter & The Birch Queen's Pavilion",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Unlocks after Wrath of the River King II",
    summary: "Enter the dazzling Birch Queen's Fair, get past the two-headed Ettin gatekeeper, outwit Vile Gnomes, and confront the truth about the Miller's Bride!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Gate of the Birch Fair",
        title: "The Ettin at the Gate",
        safeRetreat: true,
        text: "Silk banners ripple over stalls selling bottled starlight and forgotten songs. Blocking the flower-wreathed gate stands a grumpy two-headed Ettin demanding a steep fey toll, while whispering Vile Gnomes eye your pack from the tent-shadows!",
        choices: [
          { t: "Flatter both of the Ettin's heads into arguing over who is wiser while you slip past!", badge: "Persuasion / Stealth DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 2, fail: 2, passMsg: "Both heads bicker loudly as you stroll right into the bustling fairground!", failMsg: "Both heads agree on one thing—clobbering mortals! Yet the Vile Gnomes strike first!" }, onPass: { cw: "ETTIN_CHARMED" } },
          { t: "Toss a shiny silver token and push past the gate into the market tents.", to: 2 }
        ]
      },
      2: {
        zone: "Fey Bazaar",
        title: "The Vile Gnomes",
        text: "Behind the mages' silk pavilion, cackling Vile Gnomes—spies of the River King—leap from beneath a spice wagon with poisoned hooks!",
        enemy: { name: "Vile Gnome Saboteurs", desc: "Spiteful fey tricksters hired to keep mortal investigators away from the Queen's pavilion.", hp: 54, ac: 15, atk: 7, dmg: 10, xp: 135, gold: 70, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["ETTIN_CHARMED"] },
        choices: [
          { t: "Seek audience at the Birch Queen's pavilion—where Ellessandra herself has arrived!", to: 3 }
        ]
      },
      3: {
        zone: "Birch Queen's Pavilion",
        title: "The Miller's Bride Visits",
        text: "Beneath silver birch-canopies, you spot Ellessandra speaking urgently with the Queen's Consort! She was never merely a mortal bride—the River King claims a broken ancient pact over Riverbend's mill, and his Raid Recruiter is already rallying warbands to burn the village!",
        onEnter: { healHp: 12, msg: "The Birch Queen's elderflower cordial restores +12 HP!" },
        choices: [
          { t: "Pledge before the Birch Queen to settle the River King's wrath honorably!", badge: "Persuasion / Spirit DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 4, fail: 4, passMsg: "The Birch Queen grants you a silver birch-seal that weakens the Raid Recruiter's charms!", failMsg: "The Consort frowns—you must prove your mettle against the Recruiter right now!" }, onPass: { cw: "BIRCH_SEAL" } },
          { t: "Step out to confront the River King's Raid Recruiter in the tournament ring!", to: 4 }
        ]
      },
      4: {
        zone: "Fairground Tournament Ring",
        title: "The Raid Recruiter",
        text: "Clad in kelp-trimmed steel and crowned with river-reeds, the River King's Raid Recruiter mocks mortal weakness and summons a whirling water-glaive!",
        enemy: { name: "River King's Raid Recruiter", desc: "A ruthless fey war-captain mustering raiders to sack Riverbend.", hp: 66, ac: 15, atk: 8, dmg: 11, xp: 195, gold: 130, items: ["bq_birch_queen_mantle"], weakCw: ["ETTIN_CHARMED", "BIRCH_SEAL"] },
        choices: [
          { t: "Claim the Recruiter's Fey Road pass and head for the Deeper Woods!", to: 5 }
        ]
      },
      5: {
        zone: "Northern Fair Arch",
        title: "The Way to the River Court",
        text: "Ellessandra presses a silver willow-token into your hand: 'Only at the Source of the River can you challenge the King's wrath. Take the Fey Road through the Deeper Woods!'",
        choices: [
          { t: "Step past the fairground lanterns into the ancient Deeper Woods.", to: 6 }
        ]
      },
      6: {
        zone: "Silver Birch Trail",
        title: "Beneath Older Boughs",
        text: "The merry music of the Fair fades behind you as colossal primeval trees close overhead.",
        choices: [
          { t: "Complete Part 3 and unlock Part 4: Deeper Woods & Fey Roads!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Champion of the Fair",
        text: "The Raid Recruiter is beaten and the path to the River King lies open. <strong>Wrath of the River King IV: Deeper Woods & Fey Roads</strong> is now unlocked!",
        ending: { type: "true", title: "Guest of the Birch Queen (Part 3 of 6)", xp: 285, gold: 210, trophy: "Silver Birch Favor" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. WRATH OF THE RIVER KING IV (7 PAGES • LV 6)
  // Part 4 of 6 (Prerequisite: bk_b24_river_king_3)
  // ==========================================================
  bk_b24_river_king_4: {
    id: "bk_b24_river_king_4",
    reqQuest: "bk_b24_river_king_3",
    title: "Wrath of the River King IV: Deeper Woods & Fey Roads",
    subtitle: "Part 4 of 6 • The Dragon's Clearing & Fluttering Bridge",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Unlocks after Wrath of the River King III",
    summary: "Brave the Dragon's Clearing, cut through the silk-choked Ettercap Grove, and cross the perilous Fluttering Bridge to reach the Source of the River!",
    totalPages: 7,
    pages: {
      1: {
        zone: "The Dragon's Clearing",
        title: "Sunlit Scales",
        safeRetreat: true,
        text: "Deep in the primeval forest, dappled sunlight pours into a mossy clearing where an emerald-scaled fey wyrm watches the Fey Road! Beyond it lies the web-draped Ettercap Grove leading to the Fluttering Bridge.",
        choices: [
          { t: "Offer the wyrm a courtly bow and a tale of the Birch Queen's Fair for safe passage.", badge: "Persuasion / Lore DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 2, fail: 2, passMsg: "Pleased by your manners, the wyrm breathes a warm blessing over your cloak!", failMsg: "The wyrm snorts emerald smoke—forcing you to duck hastily into the Ettercap Grove!" }, onPass: { cw: "WYRM_BLESSED", healHp: 12 } },
          { t: "Skirt the edge of the clearing quietly toward the Ettercap Grove.", to: 2 }
        ]
      },
      2: {
        zone: "The Ettercap Grove",
        title: "Silk & Venom",
        text: "Thick silver cobwebs curtain the trail as chittering ettercaps and giant phase-spiders drop from the canopy!",
        enemy: { name: "Ettercap Web-Weavers", desc: "Venomous arachnid hunters choking the Fey Road to the bridge.", hp: 56, ac: 15, atk: 7, dmg: 10, xp: 140, gold: 75, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["WYRM_BLESSED"] },
        choices: [
          { t: "Slash free of the webs and emerge beside the canyon of the Fluttering Bridge!", to: 3 }
        ]
      },
      3: {
        zone: "Canyon Rim",
        title: "The Fluttering Bridge",
        text: "Spanning a dizzying emerald gorge hangs a living bridge woven from thousands of shimmering giant moth-wings and gossamer cables—guarded by a storm-crowned fey sentinel!",
        choices: [
          { t: "Step lightly along the taut gossamer guide-lines to keep your balance on the swaying bridge!", badge: "Acrobatics / Agility DC 14", check: { stat: "agility", skill: "Athletics", dc: 14, pass: 4, fail: 4, passMsg: "You glide across the fluttering span with effortless poise!", failMsg: "A sudden gust pitches the bridge sideways just as the sentinel strikes!" }, onPass: { cw: "SURE_FOOTED" } },
          { t: "Charge boldly across the Fluttering Bridge!", to: 4 }
        ]
      },
      4: {
        zone: "Span of Moth-Wings",
        title: "Warden of the Fey Road",
        text: "Swirling gale-winds whip across the gorge as the Wing-Bridge Warden—a tempest-spirit in shimmering bronze plate—levels a crackling lightning-spear!",
        enemy: { name: "Fluttering Bridge Warden", desc: "A gale-winged fey sentinel testing all who seek the Source of the River.", hp: 68, ac: 15, atk: 8, dmg: 12, xp: 200, gold: 135, items: ["bq_fluttering_bridge_spear"], weakCw: ["WYRM_BLESSED", "SURE_FOOTED"] },
        choices: [
          { t: "Step onto the far bank where the roaring Source of the River gleams ahead.", to: 5 }
        ]
      },
      5: {
        zone: "Fey Road Overlook",
        title: "The Singing Rapids",
        text: "Below the cliff, a silver cataract plunges into a crystalline lagoon—the legendary Court of the River King!",
        choices: [
          { t: "Follow the stone steps down toward the singing waters.", to: 6 }
        ]
      },
      6: {
        zone: "Lagoon Approach",
        title: "Threshold of the Court",
        text: "Haunting melodies drift up from the waterfall as you ready yourself for the River King's court.",
        choices: [
          { t: "Complete Part 4 and unlock Part 5: The Court of the River King!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Across the Fluttering Bridge",
        text: "You have conquered the Deeper Woods and reached the Source of the River. <strong>Wrath of the River King V: The Court of the River King</strong> is now unlocked!",
        ending: { type: "true", title: "Crosser of the Fluttering Bridge (Part 4 of 6)", xp: 295, gold: 220, trophy: "Gossamer Wing-Clasp" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 12. WRATH OF THE RIVER KING V (7 PAGES • LV 7)
  // Part 5 of 6 (Prerequisite: bk_b24_river_king_4)
  // ==========================================================
  bk_b24_river_king_5: {
    id: "bk_b24_river_king_5",
    reqQuest: "bk_b24_river_king_4",
    title: "Wrath of the River King V: The Court of the River King",
    subtitle: "Part 5 of 6 • Where the Lorelei Sing & The Sunken Court",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Unlocks after Wrath of the River King IV",
    summary: "Resist the hypnotic Lorelei at the Source of the River, enter the River King's crystalline court, and face Sir Lijon Troutscales in a high-stakes Duel of Honor!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Where the Lorelei Sing",
        title: "Song on the Rapids",
        safeRetreat: true,
        text: "Beside the thundering Source of the River, emerald-haired Lorelei comb silver reeds and weave an enchanting chorus meant to lull mortal intruders beneath the rapids!",
        choices: [
          { t: "Steel your will against the Lorelei's melody and stride straight through the spray!", badge: "Spirit / Lore DC 14", check: { stat: "spirit", skill: "Lore", dc: 14, pass: 2, fail: 2, passMsg: "Your steady mind shrugs off the enchantment, earning a respectful bow from the river-spirits!", failMsg: "The haunting melody clouds your senses as court guards surge from the foam!" }, onPass: { cw: "LORELEI_RESISTED" } },
          { t: "Plug your ears with beeswax and march boldly into the sunken crystal hall.", to: 2 }
        ]
      },
      2: {
        zone: "Hall of Cascades",
        title: "Courtiers of the River",
        text: "Inside the shimmering waterfall-palace, Lady Budena and Knurlnap the Water Bearer unleash armored nixie lancers to test whether a mortal deserves audience with their King!",
        enemy: { name: "River Court Lancers", desc: "Coral-armored fey guards defending the throne of the River King.", hp: 64, ac: 16, atk: 8, dmg: 11, xp: 160, gold: 80, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["LORELEI_RESISTED"] },
        choices: [
          { t: "Approach the driftwood-and-sapphire throne of the River King!", to: 3 }
        ]
      },
      3: {
        zone: "Throne of the River King",
        title: "The River King's Challenge",
        text: "Towering and crowned with leaping foam, the River King declares that Riverbend's mill stole his waters and broke ancient faith. 'Defeat my greatest knight in the Duel of the Court—and I shall grant your village a chance to stand trial by steel instead of drowning this night!'",
        onEnter: { healHp: 12, msg: "Pure spring-water of the Source restores +12 HP before the duel!" },
        choices: [
          { t: "Study Sir Lijon Troutscales's stance and water-magic tells before saluting!", badge: "Perception / Lore DC 14", check: { stat: "lore", skill: "Perception", dc: 14, pass: 4, fail: 4, passMsg: "You spot the gap in his shimmering scale-mail!", failMsg: "Sir Lijon lunges with blinding speed the instant the horn blows!" }, onPass: { cw: "DUEL_TELL" } },
          { t: "Salute the River King and cross blades with Sir Lijon Troutscales!", to: 4 }
        ]
      },
      4: {
        zone: "The Sunken Arena",
        title: "Duel in the Court",
        text: "Clad in iridescent fish-scale plate and wielding a pearl-hilted trident, Sir Lijon Troutscales—finest duelist of the River Court—strikes like a breaking wave!",
        enemy: { name: "Sir Lijon Troutscales", desc: "The River King's peerless champion clad in enchanted scale-mail.", hp: 82, ac: 16, atk: 9, dmg: 13, xp: 245, gold: 165, items: ["bq_troutscales_trident"], weakCw: ["LORELEI_RESISTED", "DUEL_TELL"] },
        choices: [
          { t: "Lower your blade respectfully as Sir Lijon yields the arena!", to: 5 }
        ]
      },
      5: {
        zone: "The Sapphire Dais",
        title: "The Final Trial Decreed",
        text: "The River King rises in stormy majesty: 'Well fought, mortal! Yet my wrath must be answered where the insult began—return to Rutyer Mill before midnight, for my host marches upon Riverbend!'",
        choices: [
          { t: "Leap through the River King's whirlpool-gate back toward Riverbend!", to: 6 }
        ]
      },
      6: {
        zone: "Vergrace Bank",
        title: "Race to the Mill",
        text: "Thunder rolls over Riverbend as you sprint through the twilight toward the creaking waterwheel of Rutyer Mill!",
        choices: [
          { t: "Complete Part 5 and unlock the Finale: Siege of the False Mill!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Champion of the Court",
        text: "Sir Lijon has fallen in honorable duel, and the final reckoning awaits at Riverbend. <strong>Wrath of the River King VI: Siege of the False Mill</strong> is now unlocked!",
        ending: { type: "true", title: "Duelist of the River Court (Part 5 of 6)", xp: 340, gold: 245, trophy: "Sapphire Scale of Sir Lijon" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 13. WRATH OF THE RIVER KING VI (8 PAGES • LV 7)
  // Part 6 of 6 (Prerequisite: bk_b24_river_king_5)
  // ==========================================================
  bk_b24_river_king_6: {
    id: "bk_b24_river_king_6",
    reqQuest: "bk_b24_river_king_5",
    title: "Wrath of the River King VI: Siege of the False Mill",
    subtitle: "Part 6 of 6 • The River King's Judgment & Final Defense",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Unlocks after Wrath of the River King V",
    summary: "Stand with Reeve Kolya and Ellessandra at Rutyer Mill as the River King's fey host strikes in two relentless waves—break the siege and forge a lasting peace!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Rutyer Mill",
        title: "Midnight at the Waterwheel",
        safeRetreat: true,
        text: "Storm-clouds boil above Riverbend as Reeve Kolya and Ellessandra bar the doors of Rutyer Mill. Out of the frothing millpond rise foaming fey warbands—the River King's judgment has arrived!",
        choices: [
          { t: "Fortify the mill-sluice with cold-iron horseshoe wards before the first wave hits!", badge: "Detect Traps / Lore DC 14", check: { stat: "lore", skill: "Detect Traps", dc: 14, pass: 2, fail: 2, passMsg: "Cold-iron wards crackle along the sluice-gate, searing the incoming fey raiders!", failMsg: "The waterwheel shatters in a geyser of spray as the vanguard storms the yard!" }, onPass: { cw: "MILL_WARDED" } },
          { t: "Take point on the wooden mill-bridge with weapon raised!", to: 2 }
        ]
      },
      2: {
        zone: "Mill Bridge",
        title: "The First Wave",
        text: "Snarling redcaps, eel hounds, and tide-callers swarm across the slick mill-bridge beneath flashing lightning!",
        enemy: { name: "River King's Vanguard", desc: "Fey tide-raiders and redcaps storming the barricades of Rutyer Mill.", hp: 66, ac: 15, atk: 8, dmg: 12, xp: 170, gold: 90, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["MILL_WARDED"] },
        choices: [
          { t: "Catch your breath as the millpond swells into a towering wave!", to: 3 }
        ]
      },
      3: {
        zone: "Shattered Mill-Yard",
        title: "Ellessandra's Blessing",
        text: "Ellessandra weaves silver moonlight over your wounds while Reeve Kolya shouts from the roof: 'Here comes the River King himself!'",
        onEnter: { healHp: 18, msg: "Ellessandra's fey-light restores +18 HP before the final showdown!" },
        choices: [
          { t: "Hold up the Birch Queen's Favor and Sir Lijon's Scale to invoke ancient fey law!", badge: "Persuasion / Spirit DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 4, fail: 4, passMsg: "Ancient law binds the River King to fight you cleanly without drowning the hamlet!", failMsg: "The River King roars like a cataract and surges straight into the yard!" }, onPass: { cw: "LAW_INVOKED" } },
          { t: "Meet the Wrath of the River King head-on in the storm!", to: 4 }
        ]
      },
      4: {
        zone: "The Flooded Mill-Yard",
        title: "Wrath of the River King",
        text: "Towering in armor of living current and crowned with storm-sapphires, the River King sweeps a colossal tide-halberd across the mill-yard—unleashing the full fury of the Summer Rivers!",
        enemy: { name: "The River King", desc: "Immortal fey sovereign of the Summer Rivers, wielding storm and cataract.", hp: 92, ac: 17, atk: 10, dmg: 14, xp: 310, gold: 210, items: ["bq_river_king_crown"], weakCw: ["MILL_WARDED", "LAW_INVOKED"] },
        choices: [
          { t: "Stand tall as the storm-waters subside and the River King bows his crowned head.", to: 5 }
        ]
      },
      5: {
        zone: "Calmed Millpond",
        title: "Peace Between Realms",
        text: "The raging cataract sinks back into a gentle, sparkling brook. The River King inclines his head in solemn respect: 'Your courage has paid the mill's debt in full, mortal. Let Riverbend and the Summer Kingdoms know peace!'",
        choices: [
          { t: "Watch the fey host dissolve into silver mist beneath the breaking dawn.", to: 6 }
        ]
      },
      6: {
        zone: "Golden Knight Tavern",
        title: "Heroes of Riverbend",
        text: "Cheers echo through Riverbend as Reeve Kolya, the miller, and Ellessandra celebrate the end of the fey war, presenting you with the village's pooled gratitude and a royal gift left by the River King.",
        onEnter: { gold: 100, msg: "Riverbend's grateful townsfolk add +100 GP to your triumph!" },
        choices: [
          { t: "Ride back toward Oakhaven as legends of your name spread across both realms.", to: 7 }
        ]
      },
      7: {
        zone: "Vergrace Road",
        title: "The Summer Pact",
        text: "Golden leaves drift lazily across the river-bridge—a quiet promise that the mortal and fey worlds stand in balance once more.",
        choices: [
          { t: "Complete the Wrath of the River King campaign!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Sovereign of the River's Peace",
        text: "You have braved the Millpond, the Birch Queen's Fair, the Sunken Court, and the Siege of the False Mill—forging lasting peace with the River King!",
        ending: { type: "true", title: "Pacifier of the River King (Finale • 6 of 6)", xp: 420, gold: 320, trophy: "Sapphire Crest of the River King" },
        choices: []
      }
    }
  }
});
