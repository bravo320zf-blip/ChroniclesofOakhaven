/* ============================================================
   BOOK QUESTS — BATCH 010 (12 Quests • All autoDiscover: false)
   Purely in-world subtitles & Inn rumor pool discovery!
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. THE RIVER TOMB (6 PAGES • LV 8)
  // ==========================================================
  bk_b10_tob2_8_river_tomb: {
    id: "bk_b10_tob2_8_river_tomb",
    title: "The River Tomb",
    subtitle: "Exposed Riverbed Crypt of Chieftain Sgavaldyr",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Brildwyn Sunstalker (Rusty Flagon Tavern)",
    summary: "Aid dwarven survivor Brildwyn Sunstalker to enter barbarian chieftain Sgavaldyr's newly exposed riverbed tomb, recover her fallen captain Kressel's body, and destroy the ancient Hongaek unleashed from its sarcophagus.",
    totalPages: 6,
    pages: {
      1: {
        zone: "Dammed Riverbed",
        title: "Mud-Slick Crypt",
        safeRetreat: true,
        text: "A newly built river dam has drained the waters around a centuries-submerged island tomb! Brildwyn Sunstalker points with trembling hands toward the dripping doorway where mercenary captain Kressel's band fell to venomous guardians.",
        enemy: { name: "Sgavaldyr's Venom-Crypt Undead", desc: "Plague-etched tomb warriors guarding the ancient chieftain.", hp: 66, ac: 16, atk: 9, dmg: 10, undead: true, xp: 195, gold: 85, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Press into the Sarcophagus Chamber where Kressel fell!", to: 2 }
        ]
      },
      2: {
        zone: "Sarcophagus Chamber",
        title: "The Sealed Hongaek",
        text: "Beside Kressel's fallen armor coils the terrible, plague-breathing Hongaek that broke free of Sgavaldyr's stone coffin!",
        enemy: { name: "Sgavaldyr's Hongaek", desc: "Ancient venomous horror sealed inside the chieftain's tomb.", hp: 82, ac: 16, atk: 10, dmg: 11, xp: 285, gold: 185, items: ["bq_sgavaldyr_venom_axe"] },
        choices: [
          { t: "Reverently carry Kressel's body and signet back to Brildwyn!", to: 3 }
        ]
      },
      3: {
        zone: "Riverbank Camp",
        title: "A Mercenary's Rest",
        text: "Brildwyn Sunstalker bows deeply in gratitude, honoring Kressel's memory and paying your full share of the company's purse.",
        choices: [
          { t: "Return to Oakhaven.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Road",
        title: "Rising Waters",
        text: "Behind you, the sluice gates reopen and the river reclaims Sgavaldyr's silent tomb.",
        choices: [
          { t: "Head back to town.", to: 5 }
        ]
      },
      5: {
        zone: "Rusty Flagon Tavern",
        title: "A Toast to Kressel",
        text: "Brildwyn raises a mug to her fallen friends and your courage.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Conqueror of the River Tomb",
        text: "The Hongaek is destroyed and Kressel's company is avenged.",
        ending: { type: "true", title: "Slayer of the River Tomb", xp: 320, gold: 305, trophy: "Sgavaldyr's Bronze Torque" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. HOUSE OF THE WORM GOD (6 PAGES • LV 9)
  // ==========================================================
  bk_b10_tob2_9_worm_god: {
    id: "bk_b10_tob2_9_worm_god",
    title: "House of the Worm God",
    subtitle: "Slum Manor of the Cannibal Cult & Vengeful Undead",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Merchant Osdek Tanner (Rusty Flagon Tavern)",
    summary: "Track merchant Osdek Tanner's missing wife Sylvia to a dilapidated crime-boss manor in the slums—where cannibal cultists of the Worm God Hriggala were slaughtered and raised as undead horrors by their own vengeful victim!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Slum Manor Parlor",
        title: "The Slaughtered Cult",
        safeRetreat: true,
        text: "Searching for missing Sylvia Tanner, you force open the rotting shutters of an abandoned manor—and find grisly cannibal cultists transformed by Hriggala into shambling, worm-ridden undead horrors!",
        enemy: { name: "Risen Cultists of Hriggala", desc: "Slaughtered cannibal zealots animated by the Worm God.", hp: 74, ac: 16, atk: 10, dmg: 11, undead: true, xp: 230, gold: 105, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Descend to the cellar where oozes and the vengeful revenant prowl!", to: 2 }
        ]
      },
      2: {
        zone: "Manor Basement",
        title: "The Vengeful Victim & Cellar Oozes",
        text: "Beside a locked storage cage holding terrified Sylvia Tanner rises the terrifying, wrath-driven Undead Revenant that massacred the cult—flanked by acid-dripping basement oozes!",
        enemy: { name: "Hriggala's Vengeful Revenant", desc: "Powerful undead horror born from the cannibal cult's final crime.", hp: 92, ac: 17, atk: 11, dmg: 12, undead: true, xp: 325, gold: 215, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Unlock the cage and lead Sylvia Tanner out into clean street air!", to: 3 }
        ]
      },
      3: {
        zone: "Tanner Residence",
        title: "Reunion in Tears",
        text: "Overjoyed to hold his wife unharmed, Osdek Tanner pays out his full 500 GP reward and alerts the watch to burn down the cursed manor.",
        choices: [
          { t: "Return to Oakhaven.", to: 4 }
        ]
      },
      4: {
        zone: "City Slums",
        title: "Ashes of the Cult",
        text: "Clean flames purge the House of the Worm God to bare cobblestones.",
        choices: [
          { t: "Collect your reward.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Market",
        title: "Safe Streets",
        text: "Merchants praise your swift rescue.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Purger of the Worm House",
        text: "Sylvia Tanner is home safe and Hriggala's slum shrine is ash.",
        ending: { type: "true", title: "Deliverer of Sylvia Tanner", xp: 365, gold: 350, trophy: "Tanner's Silver Gratitude Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. TERROR AT MOUNTAIN LOTUS TEMPLE (6 PAGES • LV 10)
  // ==========================================================
  bk_b10_tob2_10_mountain_lotus: {
    id: "bk_b10_tob2_10_mountain_lotus",
    title: "Terror at Mountain Lotus Temple",
    subtitle: "Remote Mountain Vale & The Damned Priestess",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Storm-Stranded Pilgrim (Rusty Flagon Tavern)",
    summary: "Seek shelter from a howling mountain blizzard inside the once-peaceful Mountain Lotus Temple—only to unmask the kindly aged priestess as a damned fiendish vessel who walled up the temple's true clergy alive!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Mountain Lotus Sanctuary",
        title: "The Kindly Hostess",
        safeRetreat: true,
        text: "An aged priestess welcomes you out of the blizzard with warm herbal tea—yet faint scratching echoes from behind the newly mortared rear wall, and the tea smells faintly of bitter nightshade!",
        choices: [
          { t: "Notice the poisoned tea and fresh mortar before nightfall!", badge: "Perception DC 14", check: { stat: "spirit", skill: "Perception", dc: 14, pass: 2, fail: 2, failDmg: 8, passMsg: "You dash the cup aside—catching the fiend before her midnight ambush!", failMsg: "Bitter poison sears your throat (-8 HP) as the lanterns snap out!" }, onPass: { cw: "FIEND_UNMASKED" } },
          { t: "Demand to know who is trapped behind the mortared sanctuary wall!", to: 2 }
        ]
      },
      2: {
        zone: "Darkened Nave",
        title: "The Fiendish Vessel",
        text: "Shedding her kindly human illusion in a burst of brimstone, the damned priestess twists into a towering, clawed Fiendish Vessel commanding restless walled-up spirits!",
        enemy: { name: "The Damned Mountain Lotus Fiend", desc: "Cruel demonic vessel wearing the corpse of a fallen priestess.", hp: 104, ac: 17, atk: 12, dmg: 13, xp: 375, gold: 255, items: ["bq_mountain_lotus_rosary"], weakCw: ["FIEND_UNMASKED"] },
        choices: [
          { t: "Break down the mortared back wall to free any surviving pilgrims and consecrate the dead!", to: 3 }
        ]
      },
      3: {
        zone: "Inner Cloister",
        title: "Survivors Freed",
        text: "Weak and shivering, two trapped pilgrims stumble into the light—blessing you with tears as morning sun breaks over the snow-covered lotus vale!",
        onEnter: { healHp: 20, msg: "Consecrated the Mountain Lotus altar (+20 HP)!" },
        choices: [
          { t: "Escort the rescued travelers down the mountain pass.", to: 4 }
        ]
      },
      4: {
        zone: "Mountain Pass",
        title: "Peace Restored",
        text: "Monks from the lower valley vow to rededicate Mountain Lotus Temple to honest shelter.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Temple of the Dawn",
        title: "Blessed Beads",
        text: "The Purified Mountain Lotus Beads hum softly with mountain calm.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Purifier of Mountain Lotus",
        text: "The fiendish deception is broken and the mountain pass is safe for travelers once more.",
        ending: { type: "true", title: "Cleanser of Mountain Lotus Temple", xp: 420, gold: 405, trophy: "Carved Jade Lotus" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. TUNNELS BELOW SKULLTOP TOR (6 PAGES • LV 11)
  // ==========================================================
  bk_b10_tob2_11_skulltop_tor: {
    id: "bk_b10_tob2_11_skulltop_tor",
    title: "Tunnels Below Skulltop Tor",
    subtitle: "The Buried Giant's Skull & Thin Giants Thargoz and Valgor",
    difficulty: "Deadly",
    recommendedLevel: 11,
    autoDiscover: false,
    discoverySource: "Shrewd Diplomat Halemyr (Rusty Flagon Tavern)",
    summary: "Venture beneath the towering half-buried giant's skull crowning Skulltop Tor to recover diplomat Halemyr's sensitive legal coffer from the vicious, caravan-eating thin giants Thargoz and Valgor!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Skulltop Tor • Jaw Entrance",
        title: "Beneath the Giant's Skull",
        safeRetreat: true,
        text: "A colossal ancient giant's skull looms over the shadowed hill, its yawning mouth opening into old dwarven bedrock tunnels littered with shattered caravan crates!",
        choices: [
          { t: "Creep quietly through the narrow dwarven prayer-tunnels to outflank the giants.", badge: "Stealth DC 15", check: { stat: "agility", skill: "Stealth", dc: 15, pass: 2, fail: 2, passMsg: "You spot both thin giants arguing over the locked diplomat's coffer!", failMsg: "Loose gravel echoes down the skull-shaft!" }, onPass: { cw: "SKULLTOP_FLANK" } },
          { t: "Advance boldly down the main bone-lined cavern!", to: 2 }
        ]
      },
      2: {
        zone: "Bedrock Larder",
        title: "Thargoz & Valgor, Thin Giants",
        text: "Gaunt, towering, and impossibly swift for their size, the pair of vicious Thin Giants—Thargoz and Valgor—lunge out of the narrow tunnels swinging iron meat-hooks!",
        enemy: { name: "Thargoz & Valgor, Thin Giants", desc: "Lanky, ferocious caravan-ambushing giants of Skulltop Tor.", hp: 112, ac: 18, atk: 12, dmg: 14, xp: 415, gold: 290, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["SKULLTOP_FLANK"] },
        choices: [
          { t: "Recover Halemyr's intact iron-bound legal coffer from the giants' hoard!", to: 3 }
        ]
      },
      3: {
        zone: "Highland Road",
        title: "Discretion Rewarded",
        text: "Diplomat Halemyr checks the unbroken wax seal on his coffer with a cool smile and pays out the full 1,000 GP diplomatic retainer without asking questions.",
        choices: [
          { t: "Pocket the heavy purse and depart.", to: 4 }
        ]
      },
      4: {
        zone: "Caravan Waystation",
        title: "Safe Passages",
        text: "With Thargoz and Valgor slain, merchant wagons roll past Skulltop Tor in safety.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Guildhall",
        title: "Quiet Professionals",
        text: "Halemyr's gratitude opens influential doors across the frontier.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Conqueror of Skulltop Tor",
        text: "The thin giants' ambush days are ended and Halemyr's secrets stay secure.",
        ending: { type: "true", title: "Slayer of Skulltop Tor", xp: 460, gold: 450, trophy: "Halemyr's Wax-Sealed Signet" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. CRUCIBLE OF GOLEMS (6 PAGES • LV 12)
  // ==========================================================
  bk_b10_tob2_12_crucible: {
    id: "bk_b10_tob2_12_crucible",
    title: "Crucible of Golems",
    subtitle: "Reactivated Magocracy Foundry & Wizard Azadin",
    difficulty: "Deadly",
    recommendedLevel: 12,
    autoDiscover: false,
    discoverySource: "Elfmarked Historian Xarelian (Rusty Flagon Tavern)",
    summary: "Enter an ancient underground golem foundry reactivated by conniving wizard Azadin—who bluffed construct overseer D-064976 into churning out a war-golem army to conquer the surrounding cities!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Foundry Entry Vault",
        title: "Assembly Line of War",
        safeRetreat: true,
        text: "Arcane furnaces roar beneath centuries-old stonework as newly cast iron prototypes march off glowing conveyor rails! Historian Xarelian warned that exposing Azadin's bluff to fabricator D-064976 could turn the vault's own defenses against the wizard!",
        enemy: { name: "Azadin's Prototype War-Golems", desc: "Freshly forged iron constructs guarding the foundry floor.", hp: 94, ac: 18, atk: 12, dmg: 13, xp: 330, gold: 160, items: rollRandomLoot(["material", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Present Xarelian's authentic magocracy shutdown cipher to Fabricator D-064976!", badge: "Arcana / Persuasion DC 15", check: { stat: "arcana", skill: "Arcana", dc: 15, pass: 2, fail: 2, passMsg: "D-064976 halts the assembly line—exposing Azadin as an unauthorized intruder!", failMsg: "Azadin jams the cipher, forcing you to shut down the crucible by steel!" }, onPass: { cw: "FABRICATOR_SWAYED" } }
        ]
      },
      2: {
        zone: "The Crucible Core",
        title: "Wizard Azadin's Last Stand",
        text: "Surrounded by crackling lightning coils atop the central melting vat, conniving wizard Azadin unleashes storm-bolts alongside his elite bodyguard construct!",
        enemy: { name: "Wizard Azadin & Crucible Golem", desc: "Ambitious conqueror-mage and his towering foundry guardian.", hp: 124, ac: 18, atk: 13, dmg: 15, xp: 470, gold: 330, items: ["bq_crucible_fabricator_core"], weakCw: ["FABRICATOR_SWAYED"] },
        choices: [
          { t: "Place Fabricator D-064976 safely back into peaceful stasis and seal the vault!", to: 3 }
        ]
      },
      3: {
        zone: "Surface Ruins",
        title: "Cities Spared",
        text: "Historian Xarelian exhales in deep relief as the distant rumble of the golem forges falls silent.",
        choices: [
          { t: "Collect Xarelian's scholarly patronage reward.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Guildhall",
        title: "Ancient Lore Preserved",
        text: "Your notes on D-064976 fascinate every artificer in Oakhaven.",
        choices: [
          { t: "Return to town.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Forge",
        title: "Quiet Anvils",
        text: "No golem army will march upon the frontier.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Master of the Crucible",
        text: "You foiled Azadin's conquest and safely silenced the Crucible of Golems.",
        ending: { type: "true", title: "Breaker of the Golem Crucible", xp: 520, gold: 495, trophy: "Magocracy Shutdown Key" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. FIRE AND FURY (6 PAGES • LV 14)
  // ==========================================================
  bk_b10_tob2_13_fire_fury: {
    id: "bk_b10_tob2_13_fire_fury",
    title: "Fire and Fury",
    subtitle: "Olov Yurak Volcano & The Elemental Cherufe",
    difficulty: "Deadly",
    recommendedLevel: 14,
    autoDiscover: false,
    discoverySource: "Outraged Highland Traveler (Rusty Flagon Tavern)",
    summary: "Ascend the lava-veined slopes of active volcano Olov Yurak to slay the volatile elemental Cherufe—ending three centuries of terrifying blood sacrifices demanded from the farming villages below!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Slopes of Olov Yurak",
        title: "Rivers of Magma",
        safeRetreat: true,
        text: "Rich volcanic fields give way to jagged obsidian ridges where molten rivers hiss beneath choking ash clouds. Magma elementals and salamander zealots guard the fiery rim of the caldera!",
        enemy: { name: "Caldera Magma Guardians", desc: "Blazing volcanic elementals patrolling Olov Yurak's rim.", hp: 108, ac: 18, atk: 13, dmg: 14, xp: 385, gold: 185, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Descend onto the glowing basalt shelf to challenge the Cherufe!", to: 2 }
        ]
      },
      2: {
        zone: "Olov Yurak Caldera",
        title: "The Volcanic Cherufe",
        text: "Rising from a churning lake of liquid rock like a living mountain of glowing magma and obsidian fangs, the colossal elemental Cherufe roars for its overdue sacrifice—hurling molten boulders!",
        enemy: { name: "Cherufe of Olov Yurak", desc: "Volatile, ancient volcanic elemental titan demanding human tribute.", hp: 142, ac: 19, atk: 14, dmg: 17, xp: 580, gold: 410, items: ["bq_cherufe_magma_mantle"] },
        choices: [
          { t: "Watch the caldera's fury subside into calm, cooling stone!", to: 3 }
        ]
      },
      3: {
        zone: "Foothill Villages",
        title: "Free From Sacrifice",
        text: "When the ominous red glow over Olov Yurak cools to gentle white steam, entire villages erupt in tears and song—never again will they surrender their kin to the mountain!",
        onEnter: { healHp: 25, msg: "Celebrated as saviors of the valley (+25 HP)!" },
        choices: [
          { t: "Accept the villages' heartfelt harvest gold.", to: 4 }
        ]
      },
      4: {
        zone: "Volcanic Road",
        title: "Fertile Peace",
        text: "Golden wheat sways peacefully beneath a quiet peak.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Rusty Flagon Tavern",
        title: "Songs of the Caldera",
        text: "Your Olov Yurak Cinder-Mantle glows softly like hearth-embers.",
        choices: [
          { t: "Finish the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Slayer of the Cherufe",
        text: "Three centuries of volcanic terror are ended forever.",
        ending: { type: "true", title: "Tamer of Olov Yurak", xp: 625, gold: 590, trophy: "Cooled Obsidian Heart" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. A STARRY BREACH (10 PAGES • LV 3)
  // ==========================================================
  bk_b10_p2_1_starry_breach: {
    id: "bk_b10_p2_1_starry_breach",
    title: "A Starry Breach",
    subtitle: "Frozen Wastes Portal & The Void Wyrmling",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Frostbitten Scout (Rusty Flagon Tavern)",
    summary: "Brave a shimmering cosmic rift torn open in the frozen northern wastes, uncover a lost expedition's counter-key, shatter the void anchor-cairns, and defeat the hoarding Void Wyrmling guarding the Void-Touched Buckler!",
    totalPages: 10,
    pages: {
      1: {
        zone: "Frostbitten Trailhead",
        title: "Twilight Above the Snowline",
        safeRetreat: true,
        text: "Frostbitten scout Halvar warned you of impossible noon-day stars hanging over the northern glacier-pass. Standing atop the windswept ridge, you see it for yourself: a jagged tear into silent, starry blackness hovers twenty feet above the snow-bowl, pulling drifting snowflakes upward in slow silver spirals! Half-buried in the drifts below lie the canvas tents of an overdue surveying expedition—while strange crystalline sparks dance along the snow-rim.",
        choices: [
          { t: "Study the unnatural starlight and snow-drifts to spot the breach's anchor-stones.", badge: "Perception / Survival DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, failDmg: 3, passMsg: "You trace three glowing frost-cairns pinning the starry tear open!", failMsg: "A sudden void-chilled squall bites your face (-3 HP) as you crest the bluff." }, onPass: { cw: "RIFT_STUDIED", xp: 20, msg: "Mapped the breach's gravity pockets (RIFT_STUDIED, +20 XP)!" } },
          { t: "Circle leeward behind the buried expedition tents to search for supplies unseen.", badge: "Stealth DC 11", check: { stat: "agility", skill: "Stealth", dc: 11, pass: 3, fail: 4, passMsg: "You slip silently down the snow-bank right to the surveyors' tent!", failMsg: "Crusty snow crunches loudly—crystalline shapes peel off the rift and swoop down!" } },
          { t: "Descend straight into the snow-bowl toward the humming starry tear.", to: 4 }
        ]
      },
      2: {
        zone: "Glacier Ridge",
        title: "The Anchor-Cairns",
        text: "From the wind-scoured bluff you can see the full geometry of the anomaly: three frost-encrusted standing stones etched with spiraling void-glyphs hum around the clearing, acting as anchors for the starry tear. Beside the eastern stone sits the half-collapsed expedition tent, where a shuttered brass lantern still glows faintly beneath the drift.",
        choices: [
          { t: "Slip down to the half-collapsed expedition tent to search for notes and supplies.", to: 3 },
          { t: "Move directly on the humming eastern Rune-Cairn to destabilize the breach!", to: 5 }
        ]
      },
      3: {
        zone: "The Frozen Camp",
        title: "The Surveyors' Last Stand",
        text: "Inside the wind-torn canvas tent rests the frost-preserved journal of Cartographer Elin, a sealed brass flask of spiced mountain brandy (+8 HP), 35 GP in expedition coin, and a slender silver tuning-fork tagged 'Void-Harmonic Counter-Key'. Her final scrawled entry warns: 'The rift isn't empty—a young Void Wyrmling nested inside our supply sled, hoarding our steel! Strike this silver fork against an anchor-cairn to scramble its gravity-breath!'",
        onEnter: { cw: "SILVER_FORK", healHp: 8, gold: 35, xp: 20, msg: "Recovered Elin's journal, the Silver Counter-Fork (SILVER_FORK), +8 HP, & 35 GP (+20 XP)!" },
        choices: [
          { t: "Slip toward the eastern Rune-Cairn to test the Silver Counter-Fork first!", to: 5 },
          { t: "Stride straight into the Frozen Rift Clearing to face the wyrmling!", to: 6 }
        ]
      },
      4: {
        zone: "Snow-Bowl Rim",
        title: "Star-Touched Ice Mephits",
        text: "As you wade into the knee-deep drifts, jagged shards of starlight peel off the hovering breach and coalesce into three cackling Void-Touched Ice Mephits, their crystalline wings trailing frozen stardust!",
        enemy: { name: "Void-Touched Ice Mephits", desc: "Crystalline frost-sprites warped by cosmic starlight.", hp: 24, ac: 12, atk: 5, dmg: 5, xp: 55, gold: 25, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["RIFT_STUDIED"] },
        choices: [
          { t: "Duck into the nearby half-buried surveyors' tent to search for supplies.", to: 3 },
          { t: "Advance to the humming eastern Rune-Cairn anchoring the Starry Breach.", to: 5 }
        ]
      },
      5: {
        zone: "Eastern Rune-Cairn",
        title: "Breaking the Anchor",
        text: "Frost-rimmed void-glyphs pulse violet across the waist-high standing stone, feeding cold cosmic gravity straight into the hovering tear. High above the clearing, a sleek star-flecked shadow circles lazily over its glittering hoard of fallen explorers' gear!",
        choices: [
          { t: "Strike Elin's Silver Counter-Fork against the standing stone to shatter its harmonic tether!", reqCw: "SILVER_FORK", badge: "SILVER_FORK", to: 6, onChoose: { cw: "ANCHOR_BROKEN", xp: 25, msg: "A pure silver note shatters the void-glyphs—the Starry Breach flickers violently (ANCHOR_BROKEN, +25 XP)!" } },
          { t: "Blast the frost-runes with Firebolt to crack the anchor-stone!", reqSpell: "Firebolt", badge: "Firebolt", to: 6, onChoose: { cw: "ANCHOR_BROKEN", xp: 25, msg: "Superheated steam cracks the anchor-stone in two, destabilizing the rift (ANCHOR_BROKEN, +25 XP)!" } },
          { t: "Unravel the void-glyphs with Arcana or topple the stone with Might!", badge: "Arcana / Might DC 12", check: { stat: "arcana", skill: "Arcana", dc: 12, pass: 6, fail: 6, failDmg: 4, passMsg: "The violet glyphs flare and die—the starry rift shudders overhead!", failMsg: "Cold void-backlash singes your hands (-4 HP) as the wyrmling dives!" }, onPass: { cw: "ANCHOR_BROKEN", xp: 25 } }
        ]
      },
      6: {
        zone: "Frozen Rift Clearing",
        title: "Starlight in the Snow",
        text: "Hovering directly beneath the jagged tear into starry blackness crouches the Breach Void Wyrmling—sleek midnight scales speckled with miniature constellations, talons curled around decades of fallen explorers' relics and a gleaming Void-Touched Buckler! With a crackling cosmic hiss that bends the falling snow sideways, it lunges!",
        enemy: { name: "Breach Void Wyrmling", desc: "Young cosmic dragon hoarding fallen explorers' relics.", hp: 36, ac: 13, atk: 6, dmg: 6, xp: 105, gold: 75, items: ["bq_void_touched_buckler"], weakCw: ["ANCHOR_BROKEN", "RIFT_STUDIED"] },
        choices: [
          { t: "Claim the Void-Touched Buckler and collapse the destabilized Starry Breach!", to: 7 }
        ]
      },
      7: {
        zone: "Frozen Rift Clearing",
        title: "Closing the Starry Tear",
        text: "With the wyrmling vanquished, the jagged tear overhead groans like ripping silk, tugging loose snow and scattered packs upward into the freezing dark! Half-pinned beneath the final frost-rune stone glints the surveyors' locked pay-pouch.",
        choices: [
          { t: "Use the broken anchor's leverage to seal the rift and snatch the pay-pouch cleanly!", reqCw: "ANCHOR_BROKEN", badge: "ANCHOR_BROKEN", to: 8, onChoose: { gold: 50, items: rollRandomLoot(["consumable"], 1, "uncommon"), xp: 20, msg: "Sealed the breach cleanly and recovered 50 GP plus a frost-preserved potion (+20 XP)!" } },
          { t: "Topple the final frost-rune pillar and grab the pay-pouch before the tear snaps shut!", badge: "Athletics / Arcana DC 11", check: { stat: "might", skill: "Athletics", dc: 11, pass: 8, fail: 8, failDmg: 3, passMsg: "You kick the last stone over and snag the full pay-pouch just as the sky seals!", failMsg: "A whipped ice-shard grazes your cheek (-3 HP), though you still rescue 35 GP!" }, onPass: { gold: 50, items: rollRandomLoot(["consumable"], 1, "uncommon"), xp: 20 }, onFail: { gold: 35 } },
          { t: "Smash the last frost-rune immediately to seal the breach without risking the debris!", to: 8, onChoose: { gold: 25, msg: "Collapsed the Starry Breach safely and gathered 25 GP from the snow!" } }
        ]
      },
      8: {
        zone: "Quiet Snowfield",
        title: "Portal Collapsed",
        text: "With a soft chime like shattering frost-glass, the Starry Breach folds inward and vanishes in a swirl of harmless snowflakes. The afternoon sky clears to crisp northern blue—though Elin's salvaged journal warns that other cosmic tears may slumber deeper beyond the glacier-line.",
        choices: [
          { t: "Carry Elin's journal and the Void-Touched Buckler back down the northern trail to Oakhaven.", to: 9 }
        ]
      },
      9: {
        zone: "Oakhaven Guildhall & Rusty Flagon",
        title: "Warmth After the Void",
        text: "At the Guildhall, the cartographers solemnly accept Elin's recovered field notes so her expedition is honored, paying your containment bounty in full. Later by the roaring hearth of the Rusty Flagon, scout Halvar buys you a steaming mug of mulled wine as your new Void-Touched Buckler shimmers faintly with harmless starlight.",
        onEnter: { healHp: 10, msg: "Halvar's mulled wine and the hearthfire restore +10 HP!" },
        choices: [
          { t: "Complete the adventure.", to: 10 }
        ]
      },
      10: {
        zone: "Epilogue",
        title: "Closer of the Starry Breach",
        text: "The frozen rift is sealed, the hoarding Void Wyrmling's reign is ended, and the northern glacier-pass lies safe beneath honest winter skies once more.",
        ending: { type: "true", title: "Warden of the Starry Breach", xp: 145, gold: 135, trophy: "Star-Frosted Wyrmling Scale" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. OOZE TOMB OF THE OATHBREAKER (6 PAGES • LV 4)
  // ==========================================================
  bk_b10_p2_2_ooze_tomb: {
    id: "bk_b10_p2_2_ooze_tomb",
    title: "Ooze Tomb of the Oathbreaker",
    subtitle: "Centaur Lake & The Half-Submerged Island Crypt",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Centaur Chieftain's Messenger (Rusty Flagon Tavern)",
    summary: "Cleanse the poisoned lake of a frontier centaur band by crossing to the half-submerged island tomb of a buried betrayer, fighting off rising Gray Thirsters and the oily black-ooze Oathbreaker!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Poisoned Lake Shore",
        title: "Unquenchable Thirst",
        safeRetreat: true,
        text: "Thick black ooze streams across a muddy lake-island into the centaurs' once-pure drinking water! As you wade toward the cracked stone crypt, parched undead accomplices—Gray Thirsters—burst from the dark shallows!",
        enemy: { name: "Lake Gray Thirsters", desc: "Undead betrayers buried alive within earshot of the water.", hp: 40, ac: 13, atk: 6, dmg: 7, undead: true, xp: 110, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Step up to the slime-slick tomb entrance where a bony black hand reaches out!", to: 2 }
        ]
      },
      2: {
        zone: "Oathbreaker's Tomb",
        title: "The Ooze-Crowned Betrayer",
        text: "'Who comes to welcome me?' rasps the oil-drenched Oathbreaker, rising from the scratch-marked stone vault in a surging wave of necrotic black slime!",
        enemy: { name: "The Ooze Oathbreaker", desc: "Cursed undead betrayer fouling the sacred lake with black ooze.", hp: 48, ac: 14, atk: 7, dmg: 8, undead: true, xp: 155, gold: 95, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "rare") },
        choices: [
          { t: "Shatter the cursed burial stone so clean spring water flushes the lake!", to: 3 }
        ]
      },
      3: {
        zone: "Centaur Camp",
        title: "Pure Waters Again",
        text: "The black slick dissolves within minutes! Grateful centaur warriors hoist their spears in salute and gift you frontier silver.",
        onEnter: { healHp: 12, msg: "Shared a feast with the grateful centaurs (+12 HP)!" },
        choices: [
          { t: "Ride back toward Oakhaven.", to: 4 }
        ]
      },
      4: {
        zone: "Plains Trail",
        title: "Clear Reflections",
        text: "Sunlight sparkles cleanly off the restored lake.",
        choices: [
          { t: "Return to town.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Market",
        title: "Friend of the Herd",
        text: "Centaur scouts promise safe passage across the plains.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Purifier of the Ooze Tomb",
        text: "The Oathbreaker's malice is ended and the centaurs' lake runs pure.",
        ending: { type: "true", title: "Cleanser of the Centaur Lake", xp: 185, gold: 170, trophy: "Purified Lake-Stone" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. ASSAULT OF THE STEEL HORDE (6 PAGES • LV 5)
  // ==========================================================
  bk_b10_p2_3_steel_horde: {
    id: "bk_b10_p2_3_steel_horde",
    title: "Assault of the Steel Horde",
    subtitle: "Iron War-Machine & The Fellforged Commander",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Frontier Outrider (Rusty Flagon Tavern)",
    summary: "Intercept a clanking iron war-machine rolling across the borderlands, fight through its marching escort, board the oil-reeking hull, and destroy the wraith-possessed Fellforged Commander sealed inside its crimson cockpit!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Borderland Plain",
        title: "March of the Iron Hull",
        safeRetreat: true,
        text: "Black smoke pours from a massive riveted iron war-machine grinding toward the valley! Armored clockwork troopers form a shield wall around its rear boarding hatch!",
        enemy: { name: "Steel Horde Escort Troopers", desc: "Relentless iron-clad soldiers marching beside the war-machine.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 135, gold: 65, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Leap through the clanking rear hatch into the crimson-lit cockpit!", to: 2 }
        ]
      },
      2: {
        zone: "War-Machine Cockpit",
        title: "The Fellforged Commander",
        text: "The heavy iron doors slam shut behind you! Bathed in eerie crimson light stands a hulking Fellforged Commander possessed by a murderous wraith, hissing as it charges in close quarters!",
        enemy: { name: "Wraith-Bound Fellforged Commander", desc: "Undead-possessed iron juggernaut piloting the war-machine.", hp: 58, ac: 15, atk: 8, dmg: 8, undead: true, xp: 190, gold: 130, items: ["bq_fellforged_helm"] },
        choices: [
          { t: "Pull the cockpit's emergency release levers to halt the war-machine!", to: 3 }
        ]
      },
      3: {
        zone: "Halted War-Machine",
        title: "Engines Dead",
        text: "With a shuddering sigh of steam, the monstrous iron crawler grinds to a halt yards from the village fields!",
        choices: [
          { t: "Hand the captured war-machine over to Oakhaven's smiths and engineers.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Forge",
        title: "Priceless Salvage",
        text: "Dwarven smiths pay a generous bounty for the scrap iron and arcane drive-gears.",
        choices: [
          { t: "Collect your reward.", to: 5 }
        ]
      },
      5: {
        zone: "Town Square",
        title: "Steel Broken",
        text: "Cheers ring out for the hero who stopped the Steel Horde single-handed.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Wrecker of the Steel Horde",
        text: "The Fellforged war-machine stands silent and the frontier is safe.",
        ending: { type: "true", title: "Breaker of the Steel Horde", xp: 220, gold: 215, trophy: "Crimson Cockpit Valve" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. THE VOID WALKER (6 PAGES • LV 5)
  // ==========================================================
  bk_b10_p2_4_void_walker: {
    id: "bk_b10_p2_4_void_walker",
    title: "The Void Walker",
    subtitle: "Unraveling Watchtower & Planar Stalker",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Shaken Signal-Tower Watchman (Rusty Flagon Tavern)",
    summary: "Race to a border signal-tower where shadows fold inward and reality frays—and hunt down the terrifying Void Walker slipping between planes before the entire garrison vanishes into nothingness!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Signal-Tower Causeway",
        title: "Fraying Reality",
        safeRetreat: true,
        text: "Stones float silently off the watchtower parapet as violet starlight leaks from the arrow-slits! Warped Void-Hounds spill out of a flickering doorway!",
        enemy: { name: "Rift-Born Void Hounds", desc: "Blinking planar predators drawn by the Void Walker's wake.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 135, gold: 60, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Ascend to the lantern-deck where the Void Walker feeds on the beacon!", to: 2 }
        ]
      },
      2: {
        zone: "Tower Lantern-Deck",
        title: "The Void Walker",
        text: "Shaped like a tall silhouette cut straight out of the starry night sky, the Void Walker steps effortlessly through solid stone to strike with freezing cosmic claws!",
        enemy: { name: "The Void Walker", desc: "Elusive planar horror unraveling the mortal realm around it.", hp: 58, ac: 15, atk: 8, dmg: 8, xp: 190, gold: 130, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Relight the iron signal-brazier to anchor reality across the ridge!", to: 3 }
        ]
      },
      3: {
        zone: "Signal-Tower",
        title: "Beacon Restored",
        text: "Warm golden flame steadies the stonework as the missing watchmen stumble safely out of a fading shadow-pocket!",
        choices: [
          { t: "Accept the garrison's grateful reward.", to: 4 }
        ]
      },
      4: {
        zone: "Border Ridge",
        title: "Steady Stars",
        text: "The watchtower stands solid once more.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Guildhall",
        title: "Planar Bounty",
        text: "Guild mages pay well for your firsthand report.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Bane of the Void Walker",
        text: "You banished the Void Walker and saved the border watchtower.",
        ending: { type: "true", title: "Hunter of the Void Walker", xp: 220, gold: 210, trophy: "Starlight Signal Lens" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. HELL COMES A' GLITTERING (11 PAGES • LV 6)
  // (Enriched Pass 1)
  // ==========================================================
  bk_b10_p2_5_hell_glittering: {
    id: "bk_b10_p2_5_hell_glittering",
    title: "Hell Comes a' Glittering",
    subtitle: "Mayor Enkam's Crystal Murders & The High Alchemist",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Mayor Enkam's Courier (Rusty Flagon Tavern)",
    summary: "Investigate six horrifying murders for Mayor Enkam—every victim found in a locked room, their bones and eyes turned to dazzling crystal and their hearts missing—by unraveling High Alchemist Vaelor's infernal debt and shattering the glittering fiend behind the slaughter!",
    totalPages: 11,
    pages: {
      1: {
        zone: "Mayor's Hall • Rainy Night",
        title: "Hearts of Crystal",
        safeRetreat: true,
        text: [
          "Cold rain lashes the leaded glass of Mayor Enkam's civic hall as she spreads six silver-sealed Watch dossiers across her desk. Six respected citizens—an astronomer, a glassblower, a choir-master, a judge, a goldsmith, and a Watch captain—have been found stabbed behind bolted doors, their bones and eyes turned to glittering quartz and their hearts cleanly excised.",
          "<em>'Panic is tearing my city apart,'</em> Mayor Enkam says grimly. <em>'One thousand gold in civic shares to whoever ends this nightmare before a seventh soul falls.'</em>"
        ],
        choices: [
          { t: "Examine the sixth victim's crystallized remains in the City Morgue for arcane transmutation marks.", badge: "Arcana / Investigation DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 2, fail: 2, passMsg: "A Crystal Devil! Its jagged carapace has harmonic fault-lines vulnerable to focused strikes!", failMsg: "The eerie quartz facets reflect your lantern, though you spot crimson dust on the collar." }, onPass: { cw: "CRYSTAL_FLAW" } },
          { t: "Question the frightened street-sweepers outside the goldsmith's alley where the last murder occurred.", badge: "Persuasion / Perception DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 3, fail: 2, passMsg: "A shivering sweeper whispers of a diamond-armored silhouette slipping down High Alchemist Vaelor's coal-chute!", failMsg: "Too terrified to talk, the sweepers hurry indoors—leaving only the morgue lead." }, onPass: { cw: "ALLEY_WITNESS" } },
          { t: "Head straight to the secretive High Alchemist Vaelor's townhouse to confront him directly.", to: 4 }
        ]
      },
      2: {
        zone: "City Morgue • Stone Slab",
        title: "Traces of Ruby-Salt",
        text: "Beneath the morgue's flickering oil lamp, grains of fine crimson salt glitter inside the victim's collar—a rare transmutation catalyst distilled exclusively by <strong>High Alchemist Vaelor</strong>. Tucked inside the Watch captain's boot lies a crumpled scrap of vellum reading: <em>'Vaelor owes the Seventh Debt.'</em>",
        choices: [
          { t: "Circle around to Vaelor's rear coal-chute to scout his cellar unseen!", to: 3 },
          { t: "Knock boldly on Vaelor's brass-plated front door and watch his reaction!", to: 4 }
        ]
      },
      3: {
        zone: "Alchemist's Alley • Coal-Chute",
        title: "Violet Light Below",
        text: "Through the soot-caked iron grate behind High Alchemist Vaelor's townhouse pulses an eerie violet glow! From the sub-cellar rises the rhythmic chime of crystalline claws scraping flagstone—and a trembling human voice pleading for more time.",
        choices: [
          { t: "Pick the rusted coal-chute padlock and drop silently behind the cellar guards!", badge: "Lockpicking / Stealth DC 13", check: { stat: "agility", skill: "Lockpicking", dc: 13, pass: 6, fail: 5, passMsg: "Click! You slip down the chute cleanly—bypassing Vaelor's upstairs lab guardians completely!", failMsg: "The corroded padlock snaps with a sharp ring—crystal homunculi shriek from the lab above!" }, onPass: { cw: "CELLAR_FLANK" } },
          { t: "Squeeze silently through the narrow cellar ventilator grate using Stealth.", badge: "Stealth", reqSkill: "Stealth", to: 6, onChoose: { cw: "CELLAR_FLANK", msg: "You glide into the shadowed cellar corridor completely undetected!" } }
        ]
      },
      4: {
        zone: "Vaelor's Townhouse • Apothecary Parlor",
        title: "Nervous Lies & Shattered Glass",
        text: "High Alchemist <strong>Vaelor</strong> opens the door with trembling, acid-stained fingers and a brittle smile. Behind him, glass retorts lie smashed across the workbench, and a faint trail of shimmering ruby dust disappears beneath a heavy oak cellar trapdoor!",
        choices: [
          { t: "Confront Vaelor with the 'Seventh Debt' and the ruby-salt from the morgue until his nerve breaks!", badge: "Persuasion / Intimidation DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 6, fail: 5, passMsg: "Weeping, Vaelor confesses he summoned a Crystal Devil to erase his guild debts—and hands you a brass sonic tuning-fork that cracks its diamond shell!", failMsg: "Panicking, Vaelor smashes a glowing vial to wake his crystal constructs and bolts downstairs!" }, onPass: { cw: "SONIC_FORK" } },
          { t: "Use Detect Traps to disarm the hidden alarm-latch on the cellar trapdoor!", badge: "Detect Traps", reqSpell: "Detect Traps", to: 6, onChoose: { cw: "CELLAR_FLANK", msg: "You bypass the silent alarm and descend quietly toward the glowing cellar!" } },
          { t: "Shove past the stammering alchemist and kick the cellar door wide!", to: 5 }
        ]
      },
      5: {
        zone: "Alchemist's Lab • Shattered Retorts",
        title: "Crystal Homunculi",
        text: "Razor-winged Crystal Homunculi and animated glass-beaker servitors burst from Vaelor's shelves, chiming wildly as they swarm to cover the alchemist's retreat downstairs!",
        enemy: { name: "Vaelor's Crystal Homunculi", desc: "Razor-faceted alchemical constructs animated with infernal sparks.", hp: 48, ac: 14, atk: 7, dmg: 8, xp: 135, gold: 60, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["CRYSTAL_FLAW"] },
        choices: [
          { t: "Follow the trail of glittering ruby dust down into the sealed cellar vault!", to: 6 }
        ]
      },
      6: {
        zone: "Cellar Threshold • Ruby Stairs",
        title: "The Six Crystal Hearts",
        text: "Bitter ozone and winter frost drift up the ruby-dusted steps. Through a cracked iron archway you glimpse six luminous crystal hearts arranged at the points of a blazing infernal pentagram—awaiting a <em>seventh</em> heart to tear open a permanent rift beneath the city!",
        choices: [
          { t: "Strike Vaelor's brass sonic tuning-fork right as you step through the arch to fracture the fiend's carapace!", badge: "SONIC_FORK", reqCw: "SONIC_FORK", to: 7, onChoose: { cw: "CARAPACE_CRACKED", msg: "A pure, ringing note echoes off the vault—hairline fractures spiderweb across the Crystal Devil's armor!" } },
          { t: "Pause behind a stone pillar to bind your scratches (+8 HP) before crashing the ritual.", to: 7, onChoose: { healHp: 8, msg: "You steady your breathing and grip your weapon tight (+8 HP)!" } },
          { t: "Charge straight through the iron arch to smash the pentagram!", to: 7 }
        ]
      },
      7: {
        zone: "Alchemist's Cellar • Infernal Pentagram",
        title: "The Glittering Fiend",
        text: [
          "Stepping smoothly from the blazing ruby pentagram towers a dazzling, seven-foot <strong>Crystal Devil</strong>—its diamond-faceted limbs refracting torchlight into blinding arcs while jagged blades chime like lethal chandeliers!",
          "Behind it, desperate High Alchemist Vaelor shrieks: <em>'Take this interloper instead! Take the seventh heart and leave me be!'</em>"
        ],
        enemy: { name: "Glittering Crystal Devil & Alchemist", desc: "Infernal diamond-armored assassin harvesting crystallized mortal hearts.", hp: 66, ac: 15, atk: 8, dmg: 9, xp: 220, gold: 150, items: ["bq_crystal_heart_prism"], weakCw: ["CRYSTAL_FLAW", "CELLAR_FLANK", "CARAPACE_CRACKED"] },
        choices: [
          { t: "Inspect the still-humming ruby pentagram as the fiend shatters!", to: 8 }
        ]
      },
      8: {
        zone: "Alchemist's Cellar • Aftermath",
        title: "Breaking the Seventh Debt",
        text: "With a deafening chime, the Crystal Devil explodes into a harmless snowfall of glittering glass dust, and Vaelor collapses weeping against the wall. Yet the six crystal hearts still pulse faintly inside the ruby chalk circle!",
        choices: [
          { t: "Invert the infernal chalk-sigils with Arcana/Lore to free the trapped sparks and salvage pure uncursed rubies!", badge: "Arcana / Lore DC 13", check: { stat: "arcana", skill: "Lore", dc: 13, pass: 9, fail: 9, passMsg: "Warm golden light releases the victims' spirits (+12 HP), leaving 45 GP in purified ruby crystals!", failMsg: "You sweep the chalk away cleanly, silencing the pentagram for good (+8 HP)." }, onPass: { healHp: 12, gold: 45 }, onFail: { healHp: 8 } },
          { t: "Kick through the ruby chalk immediately and haul Vaelor upstairs to the City Watch!", to: 9, onChoose: { healHp: 8, msg: "The pentagram goes dark as Watch captains rush down the stairs (+8 HP)!" } }
        ]
      },
      9: {
        zone: "Mayor's Hall • Dawn",
        title: "Terror Ended",
        text: "Mayor Enkam exhales in profound relief as Watch captains haul the broken High Alchemist away in iron manacles. True to her word, she honors your full civic bounty share and presents you with the Silver Key of the City.",
        choices: [
          { t: "Accept the city's gratitude and carry the quieted Crystal Prism home.", to: 10 }
        ]
      },
      10: {
        zone: "Lantern-Lit Streets",
        title: "A City Sleeps Safely",
        text: "For the first time in weeks, shutters unbar beneath clear morning skies. Word spreads quickly across Oakhaven of the sleuth who shattered the Crystal Murders.",
        choices: [
          { t: "Complete the adventure!", to: 11 }
        ]
      },
      11: {
        zone: "Epilogue",
        title: "Shatterer of the Glittering Hell",
        text: "The Crystal Devil is banished, Vaelor faces justice, and Mayor Enkam's city sleeps safely once more!",
        ending: { type: "true", title: "Sleuth of the Crystal Murders", xp: 255, gold: 250, trophy: "Mayor Enkam's Silver Key" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 12. NEITHER BY SAIL, NOR BY OAR (6 PAGES • LV 7)
  // ==========================================================
  bk_b10_p2_6_neither_sail: {
    id: "bk_b10_p2_6_neither_sail",
    title: "Neither by Sail, Nor by Oar",
    subtitle: "Aboard the Silver Slipper & The Wake-Less Black Ship",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Captain Sara of the Silver Slipper (Rusty Flagon Tavern)",
    summary: "Book passage aboard Captain Sara's swift ship Silver Slipper—only to be shrouded in dead midnight fog as a terrifying black ship moving without sail or oar sidles alongside, boarding with a fext captain and noctiny crew to seize a cursed stone idol!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Deck of the Silver Slipper",
        title: "The Black Ship in the Fog",
        safeRetreat: true,
        text: "Spiked boarding planks slam onto the Silver Slipper's fog-blinded deck from a silent black hull that leaves no wake! 'We've come for the statue!' hisses an undead Fext Captain, backed by a chittering Noctiny first mate and fanatical sea-cultists!",
        enemy: { name: "Noctiny Mate & Ghost-Ship Cultists", desc: "Eldritch boarding party slaughtering the panicked crew.", hp: 58, ac: 15, atk: 8, dmg: 9, xp: 175, gold: 80, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Hold the cargo hatch against the towering undead Fext Captain!", to: 2 }
        ]
      },
      2: {
        zone: "Cargo Hold Threshold",
        title: "The Fext Captain",
        text: "Eyes burning with abyssal frost, the undead Fext Captain cleaves through the fog toward the scowling gray stone idol strapped below decks!",
        enemy: { name: "Fext Captain of the Black Ship", desc: "Relentless undead sea-warlord claiming the eldritch statue.", hp: 74, ac: 16, atk: 9, dmg: 11, undead: true, xp: 265, gold: 185, items: ["bq_silver_slipper_compass"] },
        choices: [
          { t: "Cut the spiked boarding ropes as the black ship drifts silently back into the fog!", to: 3 }
        ]
      },
      3: {
        zone: "Open Morning Sea",
        title: "Fog Lifted",
        text: "Golden dawn breaks over clear blue waves! Captain Sara and her surviving crew cheer wildly, tossing the cursed idol safely weighted into an abyssal trench and rewarding you handsomely!",
        onEnter: { healHp: 16, msg: "Captain Sara's crew celebrates your rescue (+16 HP)!" },
        choices: [
          { t: "Sail safely into port.", to: 4 }
        ]
      },
      4: {
        zone: "Harbor Quay",
        title: "Safe Harbor",
        text: "Captain Sara insists you keep her lucky silver Fog-Compass.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Rusty Flagon Tavern",
        title: "Sea-Tale of the Fog",
        text: "Sailors fall dead silent as you recount the wake-less black ship.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Defender of the Silver Slipper",
        text: "You repelled the eldritch boarders and saved Captain Sara's ship from the fog.",
        ending: { type: "true", title: "Hero of the Silver Slipper", xp: 295, gold: 285, trophy: "Iron Boarding-Spike" },
        choices: []
      }
    }
  }
});
