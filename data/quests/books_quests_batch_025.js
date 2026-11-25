/* ============================================================
   CHRONICLES OF OAKHAVEN — BOOK QUESTS BATCH 025 (FINAL BATCH!)
   11 Wastes-Border Adventures (Lv 4 – Lv 11):
   - Bleakspire, Tower of the Lich King (Lv 10)
   - Rustspike, Castle of the Lord of Ruin (Lv 9)
   - Cathedral of the Black Goat (Lv 7)
   - Ghost Light Marshes (Lv 5)
   - Goblin Town of Nichenevin (Lv 4)
   - Tangleside, Chaos Wastes Village (Lv 5)
   - Maze Caverns of the Wasteland Drake (Lv 8)
   - Nygethuaac, the Dread Colossus (Lv 10)
   - Raw Chaos Portal (Lv 9)
   - River of Alchemy (Lv 6)
   - Vault of the God-King (Lv 11)
   All quests use autoDiscover: false (Inn Rumor Pool).
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // 1. BLEAKSPIRE, TOWER OF THE LICH KING (7 PAGES • LV 10)
  bk_b25_bleakspire: {
    id: "bk_b25_bleakspire",
    title: "Bleakspire: Tower of the Lich King",
    subtitle: "The Flinty Hills & The Black Obsidian Spire",
    difficulty: "Very Hard",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Venture into a remote valley of the flinty hills where the ancient Lich King of Bleakspire gathers fallen warlords beneath a lightning-scarred spire!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Flinty Valley Approach",
        title: "Shadow of Bleakspire",
        safeRetreat: true,
        text: "Four hundred years of ash and flint surround the needle-black tower of Bleakspire. Pale violet arcs dance down its iron lightning-rods while skeletal legionnaires patrol the shattered causeway.",
        choices: [
          { t: "Scale the cracked flint-ridge behind the tower to bypass the main gatehouse.", badge: "Stealth / Athletics DC 16", check: { stat: "agility", skill: "Stealth", dc: 16, pass: 2, fail: 2, passMsg: "You drop onto the upper battlement unseen, flanking the spire's guards!", failMsg: "Loose flint clatters down the slope—undead sentinels lock shields!" }, onPass: { cw: "SPIRE_FLANKED" } },
          { t: "March straight across the causeway with steel and ward-light ready!", to: 2 }
        ]
      },
      2: {
        zone: "Bleakspire Gatehouse",
        title: "Ash-Bound Legion",
        text: "Tall skeletal doom-champions in pitted bronze armor march out of the smoking archway, leveling crackling necrotic glaives!",
        enemy: { name: "Bleakspire Doom-Guards", desc: "Ancient undead sentinels bound to the Lich King's iron tower.", hp: 92, ac: 17, atk: 11, dmg: 14, undead: true, xp: 260, gold: 135, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1, weakCw: ["SPIRE_FLANKED"] },
        choices: [
          { t: "Ascend the spiral gallery toward the Lich King's lightning-crowned sanctum.", to: 3 }
        ]
      },
      3: {
        zone: "Lightning Gallery",
        title: "The Grounding Rods",
        text: "Copper coils channel storm-energy directly into the Lich King's phylactery dais above!",
        onEnter: { healHp: 14, msg: "A forgotten paladin's restorative draught mends +14 HP!" },
        choices: [
          { t: "Sever the copper storm-conduit to drain the Lich King's necrotic shield!", badge: "Arcana / Detect Traps DC 16", check: { stat: "arcana", skill: "Detect Traps", dc: 16, pass: 4, fail: 4, passMsg: "Blue lightning grounds harmlessly into the stone—shattering the Lich King's ward!", failMsg: "An arc singes your cloak as the iron throne doors swing wide!" }, onPass: { cw: "RODS_SEVERED" } },
          { t: "[Turn Undead] Stride straight into the storm-lit throne room!", reqSpell: "Turn Undead", to: 4 }
        ]
      },
      4: {
        zone: "Bleakspire Crown Sanctum",
        title: "The Lich King of Bleakspire",
        text: "Enthroned amid swirling ash and jagged storm-glass sits the Lich King of Bleakspire, raising a crackling scepter of blackened bone!",
        enemy: { name: "Lich King of Bleakspire", desc: "An immortal undead sovereign commanding storm-fire and ash.", hp: 116, ac: 18, atk: 12, dmg: 16, undead: true, xp: 390, gold: 260, items: ["bq_bleakspire_scepter"], weakCw: ["SPIRE_FLANKED", "RODS_SEVERED"] },
        choices: [
          { t: "Shatter the obsidian phylactery altar before the spire collapses!", to: 5 }
        ]
      },
      5: {
        zone: "Crumbling Causeway",
        title: "Out of the Ash",
        text: "As the phylactery cracks, the storm-clouds above Bleakspire part for the first time in centuries.",
        choices: [
          { t: "Salvage the Lich King's gilded war-chest and descend into the valley.", to: 6 }
        ]
      },
      6: {
        zone: "Flinty Hills Overlook",
        title: "A Valley Freed",
        text: "Border scouts cheer from the ridge as Bleakspire's violet beacon goes dark forever.",
        choices: [
          { t: "Return to Oakhaven in triumph.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Fall of Bleakspire",
        text: "The Lich King of Bleakspire is reduced to silent dust, and the flinty hills breathe free once more.",
        ending: { type: "true", title: "Conqueror of Bleakspire", xp: 520, gold: 410, trophy: "Iron Lightning-Crown of Bleakspire" },
        choices: []
      }
    }
  },

  // 2. RUSTSPIKE, CASTLE OF THE LORD OF RUIN (7 PAGES • LV 9)
  bk_b25_rustspike: {
    id: "bk_b25_rustspike",
    title: "Rustspike: Castle of the Lord of Ruin",
    subtitle: "The Iron-Spiked Tor & The Oni Tyrant's Keep",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Storm the rusted iron fortress of Rustspike atop its bleak tor and topple the ferocious oni tyrant known as the Lord of Ruin!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Base of Rustspike Tor",
        title: "Walls of Jagged Iron",
        safeRetreat: true,
        text: "Sheathed in rusting plate and studded with blades taken from fallen foes, Rustspike looms over the blasted plains. The oni warlord inside demands crushing tribute from every border village!",
        choices: [
          { t: "Slip through the rusted drainage grate beneath the iron barbican.", badge: "Lockpicking / Stealth DC 15", check: { stat: "agility", skill: "Lockpicking", dc: 15, pass: 2, fail: 2, passMsg: "The rusted bars give way silently—you catch the courtyard garrison unawares!", failMsg: "Screaming iron alerts the warlord's doom-champions!" }, onPass: { cw: "GRATE_BREACHED" } },
          { t: "Challenge the iron gates openly to draw out the tyrant's vanguard!", to: 2 }
        ]
      },
      2: {
        zone: "Spiked Courtyard",
        title: "Warlord's Vanguard",
        text: "Chaos-scarred mercenaries and horned doom-champions charge across the rusted flagstones!",
        enemy: { name: "Rustspike Doom-Champions", desc: "Brutal spiked-plate enforcers sworn to the Lord of Ruin.", hp: 84, ac: 16, atk: 10, dmg: 13, xp: 235, gold: 120, items: rollRandomLoot(["consumable", "weapon"], 1, "very_rare"), flee: 1, weakCw: ["GRATE_BREACHED"] },
        choices: [
          { t: "Climb the rusted grand stair into the Lord of Ruin's hall.", to: 3 }
        ]
      },
      3: {
        zone: "Trophy Hall of Blades",
        title: "Stolen Banners",
        text: "Rows of captured village shields line the iron pillars beside a locked tribute coffer.",
        onEnter: { healHp: 12, gold: 80, msg: "You liberate +80 GP in village tribute and patch your wounds (+12 HP)!" },
        choices: [
          { t: "Knock over the burning oil-braziers to fill the throne-hall with blinding smoke!", badge: "Strength / Athletics DC 15", check: { stat: "might", skill: "Athletics", dc: 15, pass: 4, fail: 4, passMsg: "Choking smoke blinds the oni tyrant as you burst into the throne room!", failMsg: "The heavy brazier clangs loudly—the Lord of Ruin stands waiting!" }, onPass: { cw: "BRAZIER_SMOKE" } },
          { t: "Kick open the spiked iron doors to the Great Hall!", to: 4 }
        ]
      },
      4: {
        zone: "Throne of Scrap-Iron",
        title: "The Lord of Ruin",
        text: "Towering in crimson skin and jagged iron plate, the ferocious oni tyrant hefts a colossal rusted glaive crackling with frost and ruin!",
        enemy: { name: "The Lord of Ruin", desc: "A colossal oni warlord commanding the iron fortress of Rustspike.", hp: 106, ac: 17, atk: 11, dmg: 15, xp: 350, gold: 230, items: ["bq_rustspike_glaive"], weakCw: ["GRATE_BREACHED", "BRAZIER_SMOKE"] },
        choices: [
          { t: "Lower the tyrant's iron banner and free the captive tribute-bearers.", to: 5 }
        ]
      },
      5: {
        zone: "Rustspike Ramparts",
        title: "Breaking the Tyranny",
        text: "Without their feared oni master, the remaining raiders scatter into the badlands while the freed villagers cheer.",
        choices: [
          { t: "Escort the liberated villagers down from the bleak tor.", to: 6 }
        ]
      },
      6: {
        zone: "Borderland Road",
        title: "Tribute Returned",
        text: "The borderland elders insist you keep a generous champion's bounty from the tyrant's iron vault.",
        choices: [
          { t: "Ride back toward Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Ruin Undone",
        text: "Rustspike stands empty atop its tor, and the border villages sleep free of the Lord of Ruin's shadow.",
        ending: { type: "true", title: "Breaker of Rustspike", xp: 470, gold: 365, trophy: "Iron Horn of the Lord of Ruin" },
        choices: []
      }
    }
  },

  // 3. CATHEDRAL OF THE BLACK GOAT (7 PAGES • LV 7)
  bk_b25_cathedral_black_goat: {
    id: "bk_b25_cathedral_black_goat",
    title: "Cathedral of the Black Goat",
    subtitle: "The Blasted Forest & Mother Speaker Bonabella's Fane",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Infiltrate a half-rebuilt dark cathedral in the Blasted Forest where Mother Speaker Bonabella's cult is tainting village food with cursed 'mother's milk'!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Blasted Forest Edge",
        title: "Tainted Tribute",
        safeRetreat: true,
        text: "Twisted black pines frame a sprawling stone cathedral being rebuilt by fanatical cultists. Several nearby villages have fallen ill from tainted provisions laced with foul cult brew!",
        choices: [
          { t: "Slip past the chanting acolytes into the tainted larder behind the nave.", badge: "Stealth / Perception DC 14", check: { stat: "agility", skill: "Stealth", dc: 14, pass: 2, fail: 2, passMsg: "You overturn the tainted vats silently, weakening the cultists' zeal!", failMsg: "A horned priestess spots you and raises the alarm bell!" }, onPass: { cw: "VATS_DESTROYED" } },
          { t: "March straight through the thorn-draped cathedral doors!", to: 2 }
        ]
      },
      2: {
        zone: "Cathedral Nave",
        title: "Cult of the Woods",
        text: "Antler-masked cultists and twisted woodland zealots rush down the mossy aisles waving curved sacrificial sickles!",
        enemy: { name: "Black Goat Cultists", desc: "Fanatical ritualists restoring the dark cathedral in the Blasted Forest.", hp: 66, ac: 15, atk: 8, dmg: 11, xp: 170, gold: 85, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["VATS_DESTROYED"] },
        choices: [
          { t: "Press into the flickering candle-lit apse where Mother Speaker Bonabella chants.", to: 3 }
        ]
      },
      3: {
        zone: "Sacristy Alcove",
        title: "Purifying Herbs",
        text: "Hidden inside a captive herbalist's satchel sit pure silverleaf bundles that neutralize the cult's toxic brew.",
        onEnter: { healHp: 12, msg: "Pure silverleaf tea restores +12 HP!" },
        choices: [
          { t: "Toss silverleaf into the main incense brazier to break Bonabella's trance!", badge: "Lore / Arcana DC 14", check: { stat: "lore", skill: "Arcana", dc: 14, pass: 4, fail: 4, passMsg: "Clean white smoke floods the altar—shattering Bonabella's dark ward!", failMsg: "Dark fumes billow back as Bonabella turns with eyes blazing!" }, onPass: { cw: "ALTAR_PURGED" } },
          { t: "Confront Mother Speaker Bonabella at the stone altar!", to: 4 }
        ]
      },
      4: {
        zone: "High Altar of the Goat",
        title: "Mother Speaker Bonabella",
        text: "Draped in braided black wool and crowned with twisted ram-horns, Mother Speaker Bonabella calls down eldritch lightning to defend her profane fane!",
        enemy: { name: "Mother Speaker Bonabella", desc: "High priestess of the Blasted Forest's dark cathedral.", hp: 82, ac: 16, atk: 9, dmg: 13, xp: 245, gold: 165, items: ["bq_black_goat_censer"], weakCw: ["VATS_DESTROYED", "ALTAR_PURGED"] },
        choices: [
          { t: "Topple the dark altar and burn the remaining tainted supplies.", to: 5 }
        ]
      },
      5: {
        zone: "Blasted Forest Clearing",
        title: "Clean Air Returns",
        text: "The sickly mist lifts from the shattered cathedral roof as freed laborers hurry homeward.",
        choices: [
          { t: "Deliver the antidote herbs to the afflicted border villages.", to: 6 }
        ]
      },
      6: {
        zone: "Border Village Green",
        title: "Grateful Folk",
        text: "The village healers weep with relief as the silverleaf brew cures every afflicted family.",
        choices: [
          { t: "Collect your reward and return to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Fane Cast Down",
        text: "Mother Speaker Bonabella's cult is scattered, and the Blasted Forest's dark cathedral lies silent.",
        ending: { type: "true", title: "Purifier of the Blasted Forest", xp: 345, gold: 255, trophy: "Cleansed Silverleaf Censer" },
        choices: []
      }
    }
  },

  // 4. GHOST LIGHT MARSHES (7 PAGES • LV 5)
  bk_b25_ghost_light_marshes: {
    id: "bk_b25_ghost_light_marshes",
    title: "Ghost Light Marshes",
    subtitle: "Amabel Merryweather's Reed-Shack & The Mire",
    difficulty: "Medium",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Brave the bobbing corpse-lights of the Ghost Light Marshes to unmask the 'wise woman' Amabel Merryweather—a cunning green hag luring travelers into the mire!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Edge of Ghost Light Marsh",
        title: "Fetishes in the Reeds",
        safeRetreat: true,
        text: "Pale lanterns bob over black peat-water where otterfolk whisper of Amabel Merryweather, a 'wise woman' living in a stilt-shack draped with reed fetishes. Yet travelers who visit her porch never return!",
        choices: [
          { t: "Pole a borrowed skiff quietly through the misty reeds to watch her porch unseen.", badge: "Stealth / Perception DC 13", check: { stat: "agility", skill: "Stealth", dc: 13, pass: 2, fail: 2, passMsg: "You pierce Amabel's illusion—she's a wicked green hag brewing swamp-hexes!", failMsg: "Your pole splashes loudly—mire-fiends surface around your skiff!" }, onPass: { cw: "HAG_UNMASKED" } },
          { t: "Follow the floating ghost-lights straight toward the wooden shack.", to: 2 }
        ]
      },
      2: {
        zone: "Black Peat Channel",
        title: "Lurkers Beneath the Lilies",
        text: "Bubbling mud erupts beside the reed-banks as clawed mire-fiends lunge toward your boat!",
        enemy: { name: "Ghost-Light Mire Fiends", desc: "Bog-dwelling demons bound to guard the hag's watery approach.", hp: 46, ac: 14, atk: 6, dmg: 8, xp: 110, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["HAG_UNMASKED"] },
        choices: [
          { t: "Tie off at the mossy dock and step onto Amabel's fetish-hung porch.", to: 3 }
        ]
      },
      3: {
        zone: "Swamp Porch",
        title: "Reed Fetishes",
        text: "Dozens of bone-and-reed charms clatter in the damp breeze around the crooked doorway.",
        onEnter: { healHp: 10, msg: "You find a clean otterfolk herb-flask on the dock (+10 HP)!" },
        choices: [
          { t: "Cut down her protective reed-fetishes before kicking open the door!", badge: "Arcana / Survival DC 13", check: { stat: "lore", skill: "Survival", dc: 13, pass: 4, fail: 4, passMsg: "The charms crumble to wet straw, stripping away Amabel's swamp-wards!", failMsg: "A cursed charm snaps shut—Alerted, Amabel drops her sweet disguise!" }, onPass: { cw: "FETISH_BROKEN" } },
          { t: "Throw open the cabin door and confront Amabel Merryweather!", to: 4 }
        ]
      },
      4: {
        zone: "The Hag's Stilt-Shack",
        title: "Amabel Merryweather",
        text: "Her kindly grandmother illusion melts away in green smoke—revealing a taloned green hag shrieking curses from beside her bubbling cauldron!",
        enemy: { name: "Amabel Merryweather, Green Hag", desc: "A deceitful swamp hag preying on lost wayfarers in the Ghost Light Marshes.", hp: 60, ac: 15, atk: 7, dmg: 10, xp: 170, gold: 115, items: ["bq_ghost_light_lantern"], weakCw: ["HAG_UNMASKED", "FETISH_BROKEN"] },
        choices: [
          { t: "Tip the hag's cauldron and free the trapped swamp-sprites.", to: 5 }
        ]
      },
      5: {
        zone: "Clearing Marsh",
        title: "The Otterfolk's Thanks",
        text: "With Amabel defeated, the deceptive ghost-lights fade and friendly otterfolk guide your skiff swiftly back to dry land.",
        choices: [
          { t: "Accept the otterfolk's salvaged silver pearls.", to: 6 }
        ]
      },
      6: {
        zone: "Marsh Landing",
        title: "Safe Waters",
        text: "The misty causeway stands safe for travelers and fisherfolk once more.",
        choices: [
          { t: "Return to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "End of the Bog-Hex",
        text: "Amabel Merryweather's reed-shack sits empty, and the Ghost Light Marshes hold no more traps.",
        ending: { type: "true", title: "Bane of the Ghost Light Marsh", xp: 245, gold: 185, trophy: "Otterfolk River-Pearl" },
        choices: []
      }
    }
  },

  // 5. GOBLIN TOWN OF NICHENEVIN (7 PAGES • LV 4)
  bk_b25_nichenevin: {
    id: "bk_b25_nichenevin",
    title: "Goblin Town of Nichenevin",
    subtitle: "The Scrap-Spire Bazaar & Dust-Goblin Warrens",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Infiltrate the chaotic ramshackle bazaar of Nichenevin to recover a stolen border-caravan's relic before the Dust Goblin Archmage auctions it off!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Nichenevin Scrap-Gate",
        title: "Market of Stolen Wonders",
        safeRetreat: true,
        text: "Built from salvaged wagon-wheels, rusted tin, and canvas awnings, Nichenevin buzzes with haggling dust goblins and wild-eyed scrap-tinkers. Somewhere in the central auction tent sits a stolen Oakhaven merchant strongbox!",
        choices: [
          { t: "Bluff your way past the scrap-gate guards as a high-roller buyer!", badge: "Persuasion / Stealth DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 2, fail: 2, passMsg: "The impressed goblins wave you straight toward the VIP auction stalls!", failMsg: "A suspicious goblin yells 'Thief!'—bringing scrap-spears running!" }, onPass: { cw: "VIP_PASS" } },
          { t: "Slip over the canvas roofs straight toward the auction tent!", to: 2 }
        ]
      },
      2: {
        zone: "Tin-Roof Bazaar",
        title: "Chaos Goblin Enforcers",
        text: "Giggling chaos goblins leap off spice-carts swinging jagged scrap-cleavers and hurling smoke-pots!",
        enemy: { name: "Nichenevin Scrap-Guards", desc: "Rowdy dust-goblin enforcers protecting the black-market auction.", hp: 38, ac: 13, atk: 6, dmg: 7, xp: 90, gold: 50, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["VIP_PASS"] },
        choices: [
          { t: "Duck beneath the crimson velvet flaps of the Archmage's auction pavilion!", to: 3 }
        ]
      },
      3: {
        zone: "Backstage Tent",
        title: "Stolen Merchant Crates",
        text: "Stacked behind the auctioneer's platform are crates stamped with Oakhaven's trade-mark—along with a gleaming brass relic!",
        onEnter: { gold: 35, healHp: 8, msg: "You recover +35 GP and a healing draught from the merchant crate (+8 HP)!" },
        choices: [
          { t: "Swap the auction orb for a painted stone before the Archmage steps onstage!", badge: "Lockpicking / Stealth DC 12", check: { stat: "agility", skill: "Lockpicking", dc: 12, pass: 4, fail: 4, passMsg: "The swap works—throwing the Dust Goblin Archmage into a spluttering rage!", failMsg: "A trip-bell jingles, bringing the Archmage firing wild sparks!" }, onPass: { cw: "ORB_SWAPPED" } },
          { t: "Step straight onto the auction stage and demand the caravan's property!", to: 4 }
        ]
      },
      4: {
        zone: "Grand Auction Ring",
        title: "Dust Goblin Archmage",
        text: "Perched on a pile of mismatched cushions in a tattered velvet robe, the Dust Goblin Archmage cackles and fires erratic bolts of raw wasteland magic!",
        enemy: { name: "Dust Goblin Archmage", desc: "An eccentric goblin spellcaster hoarding stolen arcane wares.", hp: 48, ac: 14, atk: 6, dmg: 9, xp: 140, gold: 90, items: ["bq_nichenevin_spark_wand"], weakCw: ["VIP_PASS", "ORB_SWAPPED"] },
        choices: [
          { t: "Grab the Oakhaven strongbox and dash out before the whole bazaar riots!", to: 5 }
        ]
      },
      5: {
        zone: "Scrap-Road Exit",
        title: "Clean Getaway",
        text: "You vault the scrap-fence as arguing goblins scramble over spilled trinkets behind you.",
        choices: [
          { t: "Return the recovered strongbox to Oakhaven's merchant guild.", to: 6 }
        ]
      },
      6: {
        zone: "Frontier Highway",
        title: "Caravan Restored",
        text: "The relieved merchants pay out your full recovery fee with heartfelt gratitude.",
        choices: [
          { t: "Return to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Outwitted Nichenevin",
        text: "The stolen caravan goods are home, and Nichenevin's goblins still argue over who robbed whom.",
        ending: { type: "true", title: "Raider of Nichenevin", xp: 195, gold: 160, trophy: "Scrap-King's Tin Gavel" },
        choices: []
      }
    }
  },

  // 6. TANGLESIDE, CHAOS WASTES VILLAGE (7 PAGES • LV 5)
  bk_b25_tangleside: {
    id: "bk_b25_tangleside",
    title: "Tangleside: Village on the Brink",
    subtitle: "The Thorn-Walled Wastes Outpost",
    difficulty: "Medium",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Aid the gritty frontier outpost of Tangleside when a swarm of mutated chaos-trolls and slitherjacks tests its thorn-barricades!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Tangleside Thorn-Wall",
        title: "Alarm at the Palisade",
        safeRetreat: true,
        text: "Hardy prospectors and wastelanders built Tangleside behind living walls of iron-hard briars. Tonight, crimson dust-clouds roll across the flats as mutated wasteland beasts hurl themselves at the east gate!",
        choices: [
          { t: "Help the town smith soak the thorn-gate in pitch-oil before the assault!", badge: "Survival / Craft DC 13", check: { stat: "lore", skill: "Survival", dc: 13, pass: 2, fail: 2, passMsg: "Flaming pitch-barriers weaken the incoming raiders!", failMsg: "No time to finish—slitherjacks leap straight over the briars!" }, onPass: { cw: "PITCH_GATE" } },
          { t: "Sprint straight to the breached east gate with steel drawn!", to: 2 }
        ]
      },
      2: {
        zone: "East Gate Breach",
        title: "Slitherjack Pack",
        text: "Wirily coiled wasteland slitherjacks whip across the dirt lane, snapping venom-dripping jaws!",
        enemy: { name: "Wasteland Slitherjacks", desc: "Lithe, warp-touched predators raiding Tangleside's livestock.", hp: 46, ac: 14, atk: 6, dmg: 8, xp: 110, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["PITCH_GATE"] },
        choices: [
          { t: "Rally the defenders as a massive two-headed Chaos Troll slams the timber arch!", to: 3 }
        ]
      },
      3: {
        zone: "Tangleside Well-Square",
        title: "Hold the Center",
        text: "Tangleside's apothecary presses an alchemical fire-flask into your palm before the towering troll crashes through!",
        onEnter: { healHp: 10, msg: "Tangleside's healer patches your wounds (+10 HP)!" },
        choices: [
          { t: "[Firebolt] Blast the Chaos Troll's regenerating hide before it closes in!", reqSpell: "Firebolt", to: 4 },
          { t: "Hurl the apothecary's fire-flask and meet the monster head-on!", to: 4 }
        ]
      },
      4: {
        zone: "Burning Barricade",
        title: "The Chaos Troll",
        text: "Towering and warped with crackling raw-magic spines, the Chaos Troll roars as it swings an uprooted wagon-axle!",
        enemy: { name: "Mutated Chaos Troll", desc: "A monstrous wasteland brute driven into frenzy by border storms.", hp: 60, ac: 15, atk: 7, dmg: 10, xp: 170, gold: 115, items: ["bq_tangleside_thorn_buckler"], weakCw: ["PITCH_GATE"] },
        choices: [
          { t: "Cauterize the fallen monster and cheer with the relieved townsfolk!", to: 5 }
        ]
      },
      5: {
        zone: "Tangleside Hearth",
        title: "Toast of the Wastes",
        text: "The battered prospectors raise tin mugs of cactus-ale in your honor, pooling rough wasteland silver for their savior.",
        choices: [
          { t: "Rest briefly by the forge-fire before heading home.", to: 6 }
        ]
      },
      6: {
        zone: "West Trail",
        title: "Barricades Mended",
        text: "Tangleside's thorn-wall stands strong once more against the wild badlands.",
        choices: [
          { t: "Return to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Defender of Tangleside",
        text: "The frontier village of Tangleside endures, grateful for the hero who held its gate.",
        ending: { type: "true", title: "Shield of Tangleside", xp: 245, gold: 190, trophy: "Iron-Thorn Medallion" },
        choices: []
      }
    }
  },

  // 7. MAZE CAVERNS OF THE WASTELAND DRAKE (7 PAGES • LV 8)
  bk_b25_wasteland_drake: {
    id: "bk_b25_wasteland_drake",
    title: "Maze Caverns of the Wasteland Drake",
    subtitle: "The Glass-Fused Tunnels & The Chaos Drake's Hoard",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Navigate a labyrinth of lightning-fused glass tunnels beneath the badlands to slay a marauding Chaos Drake and recover its stolen caravan hoard!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Glass-Tunnel Mouth",
        title: "Echoes in the Labyrinth",
        safeRetreat: true,
        text: "Deep beneath a scorched mesa twists a natural maze of smooth, heat-fused caverns. Winged scales scrape through the side-passages—a savage Chaos Drake has made this labyrinth its hunting den!",
        choices: [
          { t: "Chalk the tunnel forks carefully to avoid the drake's ambush loops.", badge: "Survival / Perception DC 15", check: { stat: "lore", skill: "Survival", dc: 15, pass: 2, fail: 2, passMsg: "You map the acoustic dead-zones, denying the drake its favorite blind-side!", failMsg: "Echoing tunnels mislead you right into a brood of ruins-drakes!" }, onPass: { cw: "MAZE_MAPPED" } },
          { t: "Follow the heat-shimmer straight into the glowing central cavern.", to: 2 }
        ]
      },
      2: {
        zone: "Vitrified Junction",
        title: "Ruins-Drake Brood",
        text: "Scaled lesser drakes hiss from ledges of melted rock, spitting caustic ash!",
        enemy: { name: "Lesser Ruins-Drakes", desc: "Territorial winged reptiles nesting in the Chaos Drake's outer maze.", hp: 74, ac: 16, atk: 9, dmg: 12, xp: 205, gold: 100, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["MAZE_MAPPED"] },
        choices: [
          { t: "Climb through the crystal-lined vent into the great hoard cavern.", to: 3 }
        ]
      },
      3: {
        zone: "Upper Ledge",
        title: "Stalactite Drop",
        text: "From a narrow glass ledge, you look down on heaps of melted trade-silver and a sleeping Chaos Drake!",
        onEnter: { healHp: 12, msg: "Catching your breath above the den restores +12 HP!" },
        choices: [
          { t: "Pry loose a heavy crystal stalactite right above the Chaos Drake's snout!", badge: "Strength / Athletics DC 15", check: { stat: "might", skill: "Athletics", dc: 15, pass: 4, fail: 4, passMsg: "CRASH! The crystal spire shatters across the drake's scales, staggering it!", failMsg: "Pebbles drop first—the drake snaps awake with a roar of prismatic fire!" }, onPass: { cw: "SPIRE_DROPPED" } },
          { t: "Drop straight onto the hoard floor with steel blazing!", to: 4 }
        ]
      },
      4: {
        zone: "The Vitrified Hoard",
        title: "The Wasteland Chaos Drake",
        text: "Unfurling jagged wings pulsing with shifting arcane colors, the Wasteland Chaos Drake unleashes a torrent of crackling prismatic flame!",
        enemy: { name: "Wasteland Chaos Drake", desc: "An apex chaos-infused drake hoarding borderland treasure.", hp: 94, ac: 17, atk: 10, dmg: 14, xp: 310, gold: 210, items: ["bq_chaos_drake_scale_mail"], weakCw: ["MAZE_MAPPED", "SPIRE_DROPPED"] },
        choices: [
          { t: "Claim the unmelted bullion and climb out of the glass labyrinth.", to: 5 }
        ]
      },
      5: {
        zone: "Mesa Ridge",
        title: "Clear Skies",
        text: "You emerge into cool dusk air with the drake's menace ended forever.",
        choices: [
          { t: "Return the merchant guild's trade-charters and keep your share.", to: 6 }
        ]
      },
      6: {
        zone: "Trade Road",
        title: "Safe Passages",
        text: "Caravan masters breathe easy knowing the badland skies are clear.",
        choices: [
          { t: "Head back to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Slayer of the Chaos Drake",
        text: "The Maze Caverns lie silent, and the Wasteland Drake's reign of terror is over.",
        ending: { type: "true", title: "Bane of the Chaos Drake", xp: 415, gold: 325, trophy: "Prismatic Drake Fang" },
        choices: []
      }
    }
  },

  // 8. NYGETHUAAC, THE DREAD COLOSSUS (7 PAGES • LV 10)
  bk_b25_dread_colossus: {
    id: "bk_b25_dread_colossus",
    title: "Nygethuaac, the Dread Colossus",
    subtitle: "The Walking Ruin & The Heart-Furnace",
    difficulty: "Very Hard",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Scale the colossal, animated corpse-titan Nygethuaac as it lumbers toward the borderlands, fight through its internal guardians, and extinguish its arcane Heart-Furnace!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Shadow of the Titan",
        title: "The Walking Mountain",
        safeRetreat: true,
        text: "Earth-shaking footsteps herald Nygethuaac—a towering flesh-and-stone Dread Colossus stitched together by mad ancient sorcerers! Only by scaling its jagged ankle-chains and breaching its chest-vault can you stop its march!",
        choices: [
          { t: "Grapple onto the swinging iron ankle-chains and scale straight to the rib-hatch!", badge: "Athletics / Agility DC 16", check: { stat: "agility", skill: "Athletics", dc: 16, pass: 2, fail: 2, passMsg: "You vault smoothly into the chest-vault ahead of the titan's defenders!", failMsg: "A shuddering stride slams you against the hull—alerting the internal golems!" }, onPass: { cw: "CLEAN_BOARDING" } },
          { t: "Leap from a rocky ridge directly onto the titan's shoulder-arch!", to: 2 }
        ]
      },
      2: {
        zone: "Rib-Cage Gallery",
        title: "Colossus Flesh-Golems",
        text: "Inside the pulsing arcane corridors of the giant, stitched flesh-golems and crackling brass drones lumber out of alcoves to repel boarders!",
        enemy: { name: "Dread Colossus Golems", desc: "Internal constructs maintaining Nygethuaac's colossal frame.", hp: 94, ac: 17, atk: 11, dmg: 14, xp: 265, gold: 140, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1, weakCw: ["CLEAN_BOARDING"] },
        choices: [
          { t: "Descend the iron ladder into the roaring Heart-Furnace!", to: 3 }
        ]
      },
      3: {
        zone: "Furnace Catwalk",
        title: "The Arcane Regulator",
        text: "Blinding violet fire roars inside a bronze rib-cage, pumping raw animating force through thick copper veins!",
        onEnter: { healHp: 14, msg: "A brief breather behind a cooling pipe restores +14 HP!" },
        choices: [
          { t: "Jam the master pressure-valve before the Heart-Warden activates!", badge: "Lockpicking / Arcana DC 16", check: { stat: "arcana", skill: "Lockpicking", dc: 16, pass: 4, fail: 4, passMsg: "Steam vents violently—draining half the Heart-Warden's arcane armor!", failMsg: "The valve snaps white-hot as the Heart-Warden leaps down!" }, onPass: { cw: "VALVE_JAMMED" } },
          { t: "Smash straight into the bronze Heart-Furnace!", to: 4 }
        ]
      },
      4: {
        zone: "The Heart-Furnace",
        title: "Core of Nygethuaac",
        text: "Crowned in crackling blue arcs, the Dread Heart-Warden—an eldritch horror fused to the titan's arcane engine—lashes out with lightning-charged tendrils!",
        enemy: { name: "Nygethuaac's Heart-Warden", desc: "The eldritch core intelligence animating the Dread Colossus.", hp: 118, ac: 18, atk: 12, dmg: 16, xp: 395, gold: 265, items: ["bq_colossus_heart_plate"], weakCw: ["CLEAN_BOARDING", "VALVE_JAMMED"] },
        choices: [
          { t: "Shatter the bronze heart-crystal and leap clear as the titan kneels forever!", to: 5 }
        ]
      },
      5: {
        zone: "Fallen Titan Plain",
        title: "Silence Across the Flats",
        text: "With a thunderous sigh, Nygethuaac drops to one knee and freezes into a lifeless monument of stone and iron.",
        choices: [
          { t: "Collect the salvaged power-gems from the cooled chest-vault.", to: 6 }
        ]
      },
      6: {
        zone: "Borderland Outpost",
        title: "A City Spared",
        text: "Riders from three border towns gallop out to hail the hero who halted the walking mountain.",
        choices: [
          { t: "Return to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Titan Felled",
        text: "Nygethuaac stands motionless on the horizon—a permanent testament to your courage.",
        ending: { type: "true", title: "Feller of the Dread Colossus", xp: 530, gold: 420, trophy: "Cooled Heart-Crystal of Nygethuaac" },
        choices: []
      }
    }
  },

  // 9. RAW CHAOS PORTAL (7 PAGES • LV 9)
  bk_b25_raw_chaos_portal: {
    id: "bk_b25_raw_chaos_portal",
    title: "The Raw Chaos Portal",
    subtitle: "The Swirling Rift & The Void Lord's Anchor",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "A screaming tear of raw planar chaos is warping the borderlands—fight past alien Chaos Orbs and seal the Void Lord's anchor before the rift swallows the valley!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Rift Perimeter",
        title: "Gravity Unbound",
        safeRetreat: true,
        text: "Boulders float lazily in midair around a roaring violet vortex tearing through the rocky plain. Maddened warlocks and floating Chaos Orbs drift out of the portal, widening the breach!",
        choices: [
          { t: "Attune your footing to the pulsing ley-waves to move cleanly through the gravity-well.", badge: "Arcana / Athletics DC 15", check: { stat: "arcana", skill: "Arcana", dc: 15, pass: 2, fail: 2, passMsg: "You ride the arcane current right behind the floating Chaos Orbs!", failMsg: "A gravity jolt pitches you forward straight into the rift's guardians!" }, onPass: { cw: "RIFT_ATTUNED" } },
          { t: "Charge across the floating boulders toward the violet vortex!", to: 2 }
        ]
      },
      2: {
        zone: "Floating Stone Ring",
        title: "Chaos Orbs & Diabolists",
        text: "Crackling spheres of raw prismatic energy and horned tiefling diabolists unleash bolts of wild warp-fire!",
        enemy: { name: "Chaos Orbs & Rift Diabolists", desc: "Volatile planar entities guarding the widening Raw Chaos Portal.", hp: 84, ac: 16, atk: 10, dmg: 13, xp: 240, gold: 125, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1, weakCw: ["RIFT_ATTUNED"] },
        choices: [
          { t: "Leap onto the obsidian anchor-ring floating at the center of the portal!", to: 3 }
        ]
      },
      3: {
        zone: "Obsidian Anchor-Ring",
        title: "The Three Seal-Stones",
        text: "Three hovering runestones keep the Raw Chaos Portal pried open—while a towering Void Lord steps halfway through the vortex!",
        onEnter: { healHp: 12, msg: "Pure ley-sparks knit your bruises (+12 HP)!" },
        choices: [
          { t: "Invert the central seal-stone to snap the rift halfway shut on the Void Lord!", badge: "Arcana / Lore DC 15", check: { stat: "arcana", skill: "Lore", dc: 15, pass: 4, fail: 4, passMsg: "The portal contracts sharply, stripping the Void Lord's planar aura!", failMsg: "Wild magic rebounds as the Void Lord steps fully onto the ring!" }, onPass: { cw: "SEAL_INVERTED" } },
          { t: "Confront the Void Lord before the breach widens further!", to: 4 }
        ]
      },
      4: {
        zone: "Eye of the Chaos Portal",
        title: "The Void Lord",
        text: "Crowned in starless darkness and wielding a blade of condensed antimagic, the Void Lord roars with the sound of shattering glass!",
        enemy: { name: "Borderland Void Lord", desc: "An alien planar sovereign attempting to anchor a permanent Chaos Rift.", hp: 108, ac: 17, atk: 11, dmg: 15, xp: 355, gold: 235, items: ["bq_chaos_portal_ring"], weakCw: ["RIFT_ATTUNED", "SEAL_INVERTED"] },
        choices: [
          { t: "Shatter the obsidian anchor-ring and watch the Raw Chaos Portal implode!", to: 5 }
        ]
      },
      5: {
        zone: "Settling Crater",
        title: "Gravity Restored",
        text: "Floating stones thump gently back to earth as the violet vortex snaps shut in a harmless flash of silver light.",
        choices: [
          { t: "Collect the stabilized star-glass shards from the crater rim.", to: 6 }
        ]
      },
      6: {
        zone: "Quiet Plain",
        title: "Sky Clear Once More",
        text: "The unnatural storm dissipates, leaving crisp mountain air over the borderlands.",
        choices: [
          { t: "Return to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Rift Sealed",
        text: "The Raw Chaos Portal is closed forever, and the Void Lord's anchor lies shattered.",
        ending: { type: "true", title: "Sealer of the Chaos Portal", xp: 475, gold: 370, trophy: "Stabilized Void-Anchor Shard" },
        choices: []
      }
    }
  },

  // 10. RIVER OF ALCHEMY (7 PAGES • LV 6)
  bk_b25_river_of_alchemy: {
    id: "bk_b25_river_of_alchemy",
    title: "The River of Alchemy",
    subtitle: "The Glowing Reagent Stream & The Mad Alchemist's Mill",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Trace a rainbow-slick river of glowing alchemical runoff to a mad wizard's riverside distillery before his volatile experiments poison Oakhaven's watershed!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Rainbow Riverbank",
        title: "Glowing Waters",
        safeRetreat: true,
        text: "Upstream from the frontier farms, the river shimmers in unnatural bands of gold, crimson, and acid-green! Upstream stands a smoking brass-piped watermill belonging to a deranged alchemist whose mutated guardians prowl the sluice!",
        choices: [
          { t: "Test the shimmering foam to mix a quick neutralizing salve before approaching.", badge: "Lore / Arcana DC 14", check: { stat: "lore", skill: "Arcana", dc: 14, pass: 2, fail: 2, passMsg: "Your salve coats your armor against acid-splash and weakens the slime-beasts!", failMsg: "The foam hisses wildly—awakening tentacled river-crabs along the bank!" }, onPass: { cw: "SALVE_MIXED" } },
          { t: "Follow the smoking brass pipes straight to the alchemical watermill!", to: 2 }
        ]
      },
      2: {
        zone: "Alchemical Sluice",
        title: "Mutated River-Crabs",
        text: "Towering tentacled crabs dripping iridescent sludge scuttle out of the glowing mill-race!",
        enemy: { name: "Alchemical Tentacled Crabs", desc: "River crustaceans mutated by volatile runoff into armored horrors.", hp: 56, ac: 15, atk: 7, dmg: 10, xp: 140, gold: 75, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["SALVE_MIXED"] },
        choices: [
          { t: "Kick open the brass-bolted door of the bubbling distillery!", to: 3 }
        ]
      },
      3: {
        zone: "Glass Alembic Hall",
        title: "The Pressure Valves",
        text: "Giant glass retorts hiss with rainbow steam, feeding directly into the river sluice!",
        onEnter: { healHp: 10, msg: "You uncork a pure ruby healing elixir from the cooling rack (+10 HP)!" },
        choices: [
          { t: "Reverse the main brass spillway to cut off the mad wizard's reagent supply!", badge: "Lockpicking / Detect Traps DC 14", check: { stat: "agility", skill: "Lockpicking", dc: 14, pass: 4, fail: 4, passMsg: "The retorts drain safely into lead vats—starving the wizard's abomination!", failMsg: "A glass pipe shatters—the Mad Alchemist unleashes his prized horror!" }, onPass: { cw: "VALVES_REVERSED" } },
          { t: "Charge into the upper laboratory to stop the Mad Alchemist!", to: 4 }
        ]
      },
      4: {
        zone: "Distillery Loft",
        title: "The Mad Alchemist & Abomination",
        text: "Cackling behind brass goggles, the Mad Alchemist hurls volatile flasks while his stitched alchemical abomination stomps forward!",
        enemy: { name: "Mad Alchemist & Abomination", desc: "A reckless borderland transmuter and his glowing vat-born guardian.", hp: 70, ac: 15, atk: 8, dmg: 12, xp: 205, gold: 135, items: ["bq_alchemy_river_flask"], weakCw: ["SALVE_MIXED", "VALVES_REVERSED"] },
        choices: [
          { t: "Shut down the distillery furnaces and flush the sluice with clean spring water!", to: 5 }
        ]
      },
      5: {
        zone: "Clearing Stream",
        title: "Clear Waters Flow",
        text: "Within minutes, the rainbow sheen washes away, leaving crisp, drinkable mountain water tumbling downstream.",
        choices: [
          { t: "Pack the salvaged pure alchemical reagents and return to the valley farms.", to: 6 }
        ]
      },
      6: {
        zone: "River Road",
        title: "Watershed Saved",
        text: "Grateful farmers and millers pool a generous bounty for saving their crops and wells.",
        choices: [
          { t: "Return to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Pure Waters Restored",
        text: "The River of Alchemy runs clear again, and the mad distillery's furnaces lie cold.",
        ending: { type: "true", title: "Cleanser of the Alchemy River", xp: 295, gold: 220, trophy: "Iridescent Alembic Vial" },
        choices: []
      }
    }
  },

  // 11. VAULT OF THE GOD-KING (8 PAGES • LV 11)
  bk_b25_vault_god_king: {
    id: "bk_b25_vault_god_king",
    title: "Vault of the God-King",
    subtitle: "The Buried Golden Pyramid & The Immortal Warden",
    difficulty: "Very Hard",
    recommendedLevel: 11,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Shifting wasteland dunes have uncovered the legendary buried Vault of the God-King—brave its clockwork sentinels and claim the crown-relics of a fallen empire!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Buried Pyramid Entrance",
        title: "Gates of Sun-Gold",
        safeRetreat: true,
        text: "Wind-scoured sands part to reveal towering doors of tarnished sun-gold sealed since an age of forgotten empires. Ancient runes warn that only a champion who survives the Warden's trial may enter the God-King's Vault!",
        choices: [
          { t: "Trace the solar alignment glyphs to disarm the outer sun-beam traps!", badge: "Arcana / Detect Traps DC 16", check: { stat: "arcana", skill: "Detect Traps", dc: 16, pass: 2, fail: 2, passMsg: "The golden mirrors fold cleanly aside—silencing the outer sentry turrets!", failMsg: "Blinding beams flash across the sand as golden warden-automatons awaken!" }, onPass: { cw: "TRAPS_DISARMED" } },
          { t: "Heave open the sun-gold doors and descend into the torch-lit vault!", to: 2 }
        ]
      },
      2: {
        zone: "Hall of Sun-Mirrors",
        title: "Automaton Wardens",
        text: "Gleaming bronze warden-robots with sun-forged halberds step smoothly from their niches to bar the inner pyramid!",
        enemy: { name: "God-King's Warden Automatons", desc: "Ancient empire constructs powered by immortal solar crystals.", hp: 98, ac: 18, atk: 11, dmg: 15, xp: 295, gold: 160, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["TRAPS_DISARMED"] },
        choices: [
          { t: "Step through the mirrored archway into the Royal Treasury.", to: 3 }
        ]
      },
      3: {
        zone: "Antechamber of Crowns",
        title: "Offerings of an Empire",
        text: "Golden amphorae and star-sapphire scarabs glitter beneath a vaulted dome—beside a solar prism focusing power onto the inner sarcophagus!",
        onEnter: { healHp: 16, gold: 110, msg: "You claim +110 GP in imperial scarabs and draw warm solar vitality (+16 HP)!" },
        choices: [
          { t: "Tilt the solar prism away from the inner throne before the God-King wakes!", badge: "Strength / Lore DC 16", check: { stat: "might", skill: "Lore", dc: 16, pass: 4, fail: 4, passMsg: "The beam shifts off-axis—weakening the Immortal God-King's golden shield!", failMsg: "The prism locks fast as the sarcophagus lid explodes in golden fire!" }, onPass: { cw: "PRISM_SHIFTED" } },
          { t: "Stride directly into the God-King's Inner Vault!", to: 4 }
        ]
      },
      4: {
        zone: "Sanctum of the God-King",
        title: "The Immortal God-King",
        text: "Rising from his golden sarcophagus in radiant sun-plate and a blazing khopesh, the ancient God-King declares: 'Prove yourself worthy of an empire's legacy—or turn to ash!'",
        enemy: { name: "The Immortal God-King", desc: "Undying sovereign of a buried wasteland empire wielding solar fury.", hp: 126, ac: 18, atk: 12, dmg: 17, undead: true, xp: 450, gold: 300, items: ["bq_god_king_khopesh"], weakCw: ["TRAPS_DISARMED", "PRISM_SHIFTED"] },
        choices: [
          { t: "Claim the fallen sovereign's royal seal as the vault bows in silent tribute.", to: 5 }
        ]
      },
      5: {
        zone: "The Golden Vault",
        title: "Legacy of the Sands",
        text: "With the Immortal Warden defeated, the golden vault doors unlock cleanly—revealing chests of ancient imperial gold untouched for millennia.",
        choices: [
          { t: "Pack as much imperial treasure as you can carry and ascend toward the sun.", to: 6 }
        ]
      },
      6: {
        zone: "Dune Summit",
        title: "The Sands Close Behind",
        text: "As you crest the sunlit dunes, desert winds sweep gently over the golden doors, hiding the Vault of the God-King once more.",
        choices: [
          { t: "Ride back toward Oakhaven as a living legend.", to: 7 }
        ]
      },
      7: {
        zone: "Oakhaven Gate",
        title: "Triumphant Return",
        text: "Word of the buried Golden Vault spreads like wildfire through the Rusty Flagon!",
        choices: [
          { t: "Complete this legendary expedition.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Heir to the God-King's Vault",
        text: "You have conquered the buried Vault of the God-King and returned with the storied blade of a fallen empire!",
        ending: { type: "true", title: "Conqueror of the God-King's Vault", xp: 580, gold: 480, trophy: "Sun-Gold Seal of the God-King" },
        choices: []
      }
    }
  }
});
