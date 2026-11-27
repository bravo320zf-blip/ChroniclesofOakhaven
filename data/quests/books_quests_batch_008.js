/* ============================================================
   BOOK QUESTS — BATCH 008 (12 Quests)
   Sources:
   - Midgard Sagas (All 6 Adventures — Complete!)
   - Prepared! A Dozen Adventures (Adventures 2–7 of 12)
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. MURDER ON THE CROSSROADS (7 PAGES • LV 3)
  // ==========================================================
  bk_b8_ms_1_crossroads: {
    id: "bk_b8_ms_1_crossroads",
    title: "Murder on the Crossroads",
    subtitle: "House Legora Deep-Winter Whodunit",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Sled Driver Vern & Crossroads Captains (Rusty Flagon Tavern)",
    summary: "Ride through Deep Winter snows to House Legora after General Vartan Legora is murdered on the eve of naming his successor—question Captains Rakel, Blademark, Hakar, and Lucia to unmask the traitor!",
    totalPages: 7,
    pages: {
      1: {
        zone: "House Legora • Snowbound Manor",
        title: "A General Slain",
        safeRetreat: true,
        text: "Summoned by Captains Rakel, al-Atam, and Blademark because you arrived after the murder and stand beyond suspicion, you examine General Vartan Legora's locked study. Witnesses murmur of Captain Hakar's strange Southlands dagger, Captain Blademark's mysterious powder, and Lucia's missing Company amulet!",
        choices: [
          { t: "Examine the fatal wound and fireplace ashes for poison residue and the missing amulet!", badge: "Perception / Lore DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, passMsg: "Bingo! Traces of Southlands sleep-powder and a scorched Company amulet link the killer!", failMsg: "The snowstorm drafts scattered the ash—you must press the suspects directly." }, onPass: { cw: "LEGORA_CLUE" } },
          { t: "Confront the bitter officers in the Great Hall immediately!", to: 2 }
        ]
      },
      2: {
        zone: "House Legora • Great Hall",
        title: "Blades Drawn at Dinner",
        text: "As you expose the conflicting alibis, the true conspirator snaps—summoning bribed Crossroads mercenaries to silence every witness in the manor!",
        enemy: { name: "Traitors of the Crossroads Company", desc: "Bribed veteran sellswords trying to cover up General Legora's murder.", hp: 32, ac: 12, atk: 5, dmg: 6, xp: 85, gold: 45, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["LEGORA_CLUE"] },
        choices: [
          { t: "Corner the mastermind trying to flee into the winter stableyard!", to: 3 }
        ]
      },
      3: {
        zone: "Manor Stableyard",
        title: "Justice for General Legora",
        text: "Clutching the forged inheritance charter and a poisoned Southlands dagger, the traitorous officer snarls in the falling snow!",
        enemy: { name: "The Crossroads Conspirator", desc: "Ruthless officer who murdered General Legora for command.", hp: 38, ac: 13, atk: 6, dmg: 6, xp: 110, gold: 75, items: ["bq_legora_company_amulet"], weakCw: ["LEGORA_CLUE"] },
        choices: [
          { t: "Deliver the traitor to the loyal Captains of the Crossroads Company!", to: 4 }
        ]
      },
      4: {
        zone: "House Legora",
        title: "Honor Preserved",
        text: "The surviving loyal captains salute your keen eye and steel, paying a generous retainer from the Company chest.",
        choices: [
          { t: "Ride Vern's sled back through the pine woods.", to: 5 }
        ]
      },
      5: {
        zone: "Winter Road",
        title: "A Company Reunited",
        text: "Without civil war tearing it apart, the Crossroads Company remains a shield for the frontier.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Guildhall",
        title: "Sleuth's Reputation",
        text: "Word spreads fast that no conspiracy stays hidden under your gaze.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Avenger of House Legora",
        text: "General Vartan Legora's murder is avenged and the Crossroads Company stands strong.",
        ending: { type: "true", title: "Detective of the Crossroads", xp: 145, gold: 140, trophy: "General Legora's Signet" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. MADMAN AT THE BRIDGE (7 PAGES • LV 4)
  // ==========================================================
  bk_b8_ms_2_bridge: {
    id: "bk_b8_ms_2_bridge",
    title: "Madman at the Bridge",
    subtitle: "The Puffing Bridge & Exploding Boiler",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Harbor Watch Alarm (Town Square)",
    summary: "Race into the steaming Engine House of the great Puffing Bridge before mad gnome saboteur Urgenef, his dire badgers, and hired ogres blow the over-pressurized boiler and split the city in half!",
    totalPages: 7,
    pages: {
      1: {
        zone: "The Puffing Bridge",
        title: "Stuck Open at Dawn",
        safeRetreat: true,
        text: "Metal screeches in the river mist as the monumental Puffing Bridge jams wide open! Inside the rumbling Engine House, rivets are popping off a glowing red-hot boiler while an ogre guard named Haltopar blocks the iron catwalk!",
        enemy: { name: "Haltopar & Bridge Ogres", desc: "Hired muscle paid to keep guards out of the Engine House.", hp: 40, ac: 13, atk: 6, dmg: 7, xp: 105, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Dive through the hissing steam clouds into the Lower Boiler Floor!", to: 2 }
        ]
      },
      2: {
        zone: "Engine House • Boiler Floor",
        title: "Urgenef & The Dire Badgers",
        text: "Scalding vapor blinds the engine room as mad gnome saboteur Urgenef laughs wildly beside the jammed firebox door, sicking armored Dire Badgers upon you while the boiler bulges!",
        enemy: { name: "Urgenef & Dire Badgers", desc: "Crazed gnome saboteur and fierce burrowing beasts.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 145, gold: 95, items: ["bq_puffing_bridge_wrench"] },
        choices: [
          { t: "Use clockwork tools to bleed the steam valve cleanly before it blows!", badge: "Lockpicking / Arcana DC 13", check: { stat: "agility", skill: "Lockpicking", dc: 13, pass: 3, fail: 3, failDmg: 7, passMsg: "HSSSS! Pressure drops safely—the Puffing Bridge lowers intact!", failMsg: "Scalding steam burns your arms (-7 HP) as you force the emergency lever!" } },
          { t: "Wrench open the jammed firebox and douse the coals by brute force!", badge: "Might DC 14", check: { stat: "might", skill: "Athletics", dc: 14, pass: 3, fail: 3, failDmg: 7, passMsg: "You smash the firebox clear and vent the pressure just in time!", failMsg: "Popping rivets bruise your shoulder (-7 HP), yet the boiler cools!" } }
        ]
      },
      3: {
        zone: "Engine House",
        title: "Disaster Averted",
        text: "With a majestic rumble, the Puffing Bridge settles smoothly back into place! You pocket Urgenef's bribe-sack of 249 GP and three sparkling garnets just as clockwork guards arrive to secure the bridge.",
        onEnter: { gold: 95, msg: "Claimed 95 GP share from Urgenef's bribe-sack and garnets!" },
        choices: [
          { t: "Hand the bound saboteur over to the bridge wardens.", to: 4 }
        ]
      },
      4: {
        zone: "Riverbank Plaza",
        title: "Traffic Resumes",
        text: "Carts and pedestrians cheer as the two halves of the city reconnect without a single life lost.",
        choices: [
          { t: "Collect the city engineers' gratitude and bounty.", to: 5 }
        ]
      },
      5: {
        zone: "Clockwork Quarter",
        title: "Hero of the Bridge",
        text: "Clockwork artificers admire your steady nerve beside a red-hot boiler.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Forge",
        title: "Fine Brass",
        text: "Your newly won Clockwork Engineer's Spanner gleams cleanly in the firelight.",
        choices: [
          { t: "Finish the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Savior of the Puffing Bridge",
        text: "You foiled Urgenef's sabotage and saved the city's vital river crossing.",
        ending: { type: "true", title: "Hero of the Puffing Bridge", xp: 185, gold: 175, trophy: "Brass Pressure-Gauge Medal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. THE MHALMET HEIST (7 PAGES • LV 5)
  // ==========================================================
  bk_b8_ms_3_mhalmet: {
    id: "bk_b8_ms_3_mhalmet",
    title: "The Mhalmet Heist",
    subtitle: "Four-Day Casino Vault Job & Black Table",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Underground Fixer (Rusty Flagon Tavern)",
    summary: "You have just four days to scout Nadi's heavily fortified Mhalmet casino, recruit an insider, crack the vault, and vanish with the syndicate's cash before the Black Table's enforcers and six clockwork myrmidons arrive at midnight!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Mhalmet • High-Stakes Casino",
        title: "Casing the Floor",
        safeRetreat: true,
        text: "Gilded roulette wheels spin beneath armed balconies at Nadi's notorious casino. Every midnight, the ruthless Black Table sends enforcers and clockwork myrmidons to collect the vault's tribute—your window is razor-thin!",
        choices: [
          { t: "Recruit a disgruntled pit-dealer to obtain the vault shift schedule.", badge: "Persuasion / Stealth DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 2, fail: 2, passMsg: "The dealer slips you the vault code and disables two floor bells!", failMsg: "You rely on your own sharp eyes to memorize the guard rotations." }, onPass: { cw: "INSIDER_HELP" } },
          { t: "Slip straight into the upper chandelier catwalks above the vault!", to: 2 }
        ]
      },
      2: {
        zone: "Casino Vault Corridor",
        title: "Nadi's House Guards",
        text: "Silent alarms flash ruby as casino enforcers and a ticking bronze sentry rush down the velvet hallway!",
        enemy: { name: "Mhalmet Casino Enforcers", desc: "Elite house bouncers protecting Nadi's counting room.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 135, gold: 65, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["INSIDER_HELP"] },
        choices: [
          { t: "Crack the reinforced vault dial before the midnight bell tolls!", badge: "Lockpicking DC 13", check: { stat: "agility", skill: "Lockpicking", dc: 13, pass: 3, fail: 3, failDmg: 5, passMsg: "Click! The heavy steel door swings open cleanly—gold stacks gleam inside!", failMsg: "A shock-ward jolts your fingertips (-5 HP) before the bolt slides free!" } }
        ]
      },
      3: {
        zone: "Midnight Alleyway",
        title: "The Black Table Arrives!",
        text: "Slinging overflowing coin-sacks over your shoulder, you slip out the service gate just as the Black Table's black wagon and six gleaming Clockwork Myrmidons rumble into the alley!",
        enemy: { name: "Black Table Myrmidon Squad", desc: "Syndicate collectors and relentless clockwork myrmidons.", hp: 56, ac: 15, atk: 8, dmg: 8, xp: 185, gold: 135, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["INSIDER_HELP"] },
        choices: [
          { t: "Vanish over the tiled rooftops into the Mhalmet night with the haul!", to: 4 }
        ]
      },
      4: {
        zone: "Safehouse Cellar",
        title: "Clean Getaway",
        text: "Counting out the glittering stacks of syndicate gold by candlelight, you toast one of the slickest heists in Midgard history.",
        onEnter: { gold: 120, healHp: 12, msg: "Split the vault take (+120 GP) and caught your breath (+12 HP)!" },
        choices: [
          { t: "Slip out of Mhalmet before sunrise.", to: 5 }
        ]
      },
      5: {
        zone: "Coastal Road",
        title: "Legend of the Underworld",
        text: "Whispered rumors of the ghost crew that outran the Black Table travel faster than your boots.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Rusty Flagon Tavern",
        title: "Heavy Pockets",
        text: "Your coin purse clinks with unmistakable Mhalmet gold.",
        choices: [
          { t: "Complete the heist!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Mastermind of the Mhalmet Heist",
        text: "You beat the four-day clock, emptied Nadi's vault, and outsmarted the Black Table.",
        ending: { type: "true", title: "Master Thief of Mhalmet", xp: 220, gold: 240, trophy: "Black Table Platinum Chip" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. RAIDERS OF THE CHAMBER OF TOMORROWS (11 PAGES • LV 6)
  // ==========================================================
  bk_b8_ms_4_tomorrows: {
    id: "bk_b8_ms_4_tomorrows",
    title: "Raiders of the Chamber of Tomorrows",
    subtitle: "Ruins of Thorn & The Effervescent Flotilla",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Saintmistress Rowanmantle (Oakhaven Guildhall)",
    summary: "Acting for Saintmistress Rowanmantle, thwart scheming ravenfolk Professor Skein Devinshire in an explosive Reywald warehouse, delve into the time-warping Ruins of Thorn for the Celestial Sextant, and race down a raging river in ancient elven boats!",
    totalPages: 11,
    pages: {
      1: {
        zone: "Reywald • Aldous-Donner Warehouse",
        title: "Crates of Blasting Powder",
        safeRetreat: true,
        text: "Tipped off by Saintmistress Rowanmantle, you creep along the salt-scented rafters of an Aldous-Donner waterfront warehouse stacked with ironbound kegs of blasting powder. Below, dapper ravenfolk antiquarian Professor Skein Devinshire taps his silver-headed cane beside a crate holding the shimmering Agua-Sintellus Orb stolen from the Ruins of Thorn—while a rolled parchment chart of the Chamber of Tomorrows lies inches from a sputtering fuse!",
        choices: [
          { t: "Swing down from the cargo crane to snatch the ruins chart before the powder ignites!", badge: "Agility / Athletics DC 13", check: { stat: "agility", skill: "Athletics", dc: 13, pass: 2, fail: 3, failDmg: 6, passMsg: "You snag the silver-inked ruins chart mid-swing as Devinshire curses and bolts for the docks!", failMsg: "A keg erupts in splinters and smoke (-6 HP), forcing you to chase Devinshire straight into the forest!" }, onPass: { cw: "THORN_CHART" } },
          { t: "Drop silently behind the crates to snip the powder fuse and pocket the ruins chart.", badge: "Agility / Detect Traps DC 13", check: { stat: "agility", skill: "Detect Traps", dc: 13, pass: 2, fail: 3, failDmg: 5, passMsg: "You pinch the fuse dead, swipe the ruins chart, and scoop 25 GP from Devinshire's dropped coin-pouch!", failMsg: "Sparks nip your fingers (-5 HP) as the blast blows the dockside shutters wide!" }, onPass: { cw: "THORN_CHART", gold: 25 } },
          { t: "Vault straight through the dockside doors to pursue Professor Devinshire into the Tommierran Forest!", to: 3 }
        ]
      },
      2: {
        zone: "Reywald Waterfront • The Smoldering Dock",
        title: "Chart of the Great Retreat",
        text: "You roll onto the wet cobbles with the Thornish parchment tucked inside your coat as the warehouse shutters blow outward in a plume of sulfurous smoke. Scanning the silver-inked annotations while sprinting for the tree line, you spot an overgrown elven boathouse sluice marked beside the Domed Apex—and a marginal note warning of the chrono-warded wight guarding the Celestial Sextant.",
        reward: { xp: 20 },
        choices: [
          { t: "Follow the silver-inked smuggler's trail straight to the Ruins of Thorn, bypassing the main road.", to: 4 },
          { t: "Cut across the sunken logging road to intercept Devinshire's rearguard scouts.", to: 3 }
        ]
      },
      3: {
        zone: "Tommierran Forest • The Sunken Causeway",
        title: "Devinshire's Rearguard",
        text: "Towering ferns and moss-draped elven mileposts crowd the mist-choked track toward the Ruins of Thorn. Where the mossy flagstones dip into a fern-draped ravine, two of Devinshire's scarred river-mercenaries step out from behind a fallen oak with cocked crossbows and boarding axes!",
        enemy: { name: "Devinshire's River-Mercs", desc: "Hard-eyed Reywald sellswords paid to delay anyone following the Professor.", hp: 42, ac: 14, atk: 7, dmg: 7, xp: 110, gold: 45, items: rollRandomLoot(["consumable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Search the fallen mercenaries' satchels and press on to the Ruins of Thorn.", to: 4 }
        ]
      },
      4: {
        zone: "Ruins of Thorn • The Domed Apex",
        title: "The Time-Warped Threshold",
        text: "Through a curtain of silver ivy rises the Domed Apex of Thorn—an alabaster rotunda where raindrops hang motionless in midair and fallen leaves drift upward in slow spirals. Two passages lead down into the Chamber of Tomorrows: the grand star-carved main archway, lit by pale blue braziers, and a half-flooded elven boathouse sluice echoing with distant whitewater.",
        choices: [
          { t: "Slip into the flooded boathouse sluice to inspect the Effervescent Flotilla first.", to: 5 },
          { t: "Trace the suspended-time runes along the main archway to calm the sentinel's ward.", badge: "Arcana / Arcana DC 14", check: { stat: "arcana", skill: "Arcana", dc: 14, pass: 6, fail: 6, failDmg: 6, passMsg: "The blue braziers dim to a calm silver glow—the guardian's chrono-ward unravels!", failMsg: "A lash of chrono-static snaps from the doorway (-6 HP) as you step inside!" }, onPass: { cw: "TIME_WARD_CALMED", xp: 25 } },
          { t: "Stride straight through the grand archway into the Chamber of Tomorrows.", to: 6 }
        ]
      },
      5: {
        zone: "Ruins of Thorn • The Effervescent Boathouse",
        title: "Vessels of the Great Retreat",
        text: "Three sleek, leaf-shaped skiffs of pale silverwood bob in a luminous underground canal, their hulls fizzing with tiny pearlescent bubbles that keep the timber weightless and unsinkable. Beside the moorings sit a sealed elven provisions chest and a brass limpet mine hastily clamped to the lead skiff's rudder by one of Devinshire's forward divers!",
        choices: [
          { t: "Disarm Devinshire's limpet mine and tune the lead skiff's silverwood rudder for rapid escape.", badge: "Agility / Detect Traps DC 14", check: { stat: "agility", skill: "Detect Traps", dc: 14, pass: 6, fail: 6, failDmg: 7, passMsg: "You pull the firing pin, pocket 40 GP in salvageable alchemical brass, and prime the silverwood rudder!", failMsg: "The percussion cap pops in a shower of sparks (-7 HP), though the enchanted hull holds!" }, onPass: { cw: "SKIFF_TUNED", gold: 40, xp: 30 } },
          { t: "Pry open the elven provisions chest for a draught of starlight cordial.", badge: "Spirit / Perception DC 13", check: { stat: "spirit", skill: "Perception", dc: 13, pass: 6, fail: 6, passMsg: "A sealed vial of starlight cordial restores your vigor (+10 HP, +4 MP) alongside 30 GP in ancient silver!", failMsg: "Most of the vials have dried to pale crystal dust, yielding nothing of use." }, onPass: { hp: 10, mp: 4, gold: 30 } },
          { t: "Leave the moorings untouched and climb the wet stairs into the Chamber of Tomorrows.", to: 6 }
        ]
      },
      6: {
        zone: "Ruins of Thorn • Chamber of Tomorrows",
        title: "The Angry Elven Wight",
        text: "Beneath the cracked crystal oculus of the Chamber of Tomorrows, a brass orrery turns in eerie silence. Upon its central plinth gleam the Thornish Nocturnal and the Celestial Sextant—relics forged for the elves' Great Retreat! As your shadow crosses the mosaic floor, frost blooms across the tiles and an armored Elven Wight rises from its watch-throne, blade singing with cold starlight!",
        enemy: { name: "Guardian Wight of Thorn", desc: "Centuries-old elven sentinel defending the secrets of the Great Retreat.", hp: 54, ac: 14, atk: 8, dmg: 8, undead: true, xp: 155, gold: 80, items: ["bq_celestial_sextant"], flee: 4, weakCw: ["THORN_CHART", "TIME_WARD_CALMED"] },
        choices: [
          { t: "Claim the Celestial Sextant and sprint for the underground canal!", to: 7 }
        ]
      },
      7: {
        zone: "Underground Canal • The Sluice Gate",
        title: "Launching the Effervescent Flotilla",
        text: "The instant you lift the Celestial Sextant, the Chamber's time-ward collapses in a thunderclap! Dust cascades from the dome as Professor Skein Devinshire appears on the upper gallery, feathers bristling, waving his cane at his armored river-barge below. You vault into the lead silverwood skiff just as the ancient sluice groans open onto a roaring subterranean river!",
        choices: [
          { t: "Engage the tuned silverwood rudder to shoot cleanly ahead of Devinshire's grappling lines!", reqCw: "SKIFF_TUNED", to: 8 },
          { t: "Blast the overhanging stalactites above Devinshire's barge with Firebolt to slow his pursuit!", reqSpell: "Firebolt", to: 8 },
          { t: "Heave hard on the steering oar to ride the foaming rapids into the gorge!", badge: "Might / Athletics DC 14", check: { stat: "might", skill: "Athletics", dc: 14, pass: 8, fail: 9, failDmg: 7, passMsg: "You wrench the skiff into the fastest current, pulling cleanly ahead into the narrow gorge!", failMsg: "A jagged boulder scrapes the gunwale (-7 HP), letting Devinshire's barge pull right alongside!" }, onPass: { cw: "RIVER_LEAD", xp: 20 } }
        ]
      },
      8: {
        zone: "Raging River Gorge • The Whitewater Drop",
        title: "Gaining the Upper Hand",
        text: "Your silverwood skiff skims effortlessly over boiling foam, pearlescent bubbles cushioning every plummet! Ahead, the gorge narrows beneath a mossy limestone arch—giving you a moment to catch your breath and angle the prow so Devinshire's boarding hooks snag clumsily in the spray.",
        reward: { cw: "RIVER_LEAD", hp: 6 },
        choices: [
          { t: "Brace your footing as Devinshire's barge surges out of the whitewater!", to: 9 }
        ]
      },
      9: {
        zone: "Raging River Gorge • Devil's Chute",
        title: "Professor Devinshire's River Ambush",
        text: "Whitewater rockets your enchanted elven skiff through churning rapids while Professor Skein Devinshire's rival treasure hunters, snapping river-alligators, and sahuagin raiders close from both sides! Iron hooks bite the silverwood rail as Devinshire leaps onto your prow with his cane-sword drawn and the glowing Agua-Sintellus Orb strapped to his sash!",
        enemy: { name: "Prof. Skein Devinshire & Mercs", desc: "Scheming ravenfolk antiquarian wielding a cane-sword alongside his ruthless treasure hunters.", hp: 64, ac: 15, atk: 8, dmg: 9, xp: 215, gold: 150, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["THORN_CHART", "RIVER_LEAD"] },
        choices: [
          { t: "Snatch the Agua-Sintellus Orb as Devinshire dives overboard and ride the storm out to sea!", to: 10 }
        ]
      },
      10: {
        zone: "Sheltered Sea Cove • The Tidal Arch",
        title: "Secret of the Great Retreat",
        text: "As the roaring gorge spills into open salt-spray, the silverwood skiff's ancient fail-safe guides you gently onto the pale sand of a sheltered sea cove. Holding the Celestial Sextant up beside the Agua-Sintellus Orb, you watch faint star-charts shimmer across the wet cliffside: these enchanted vessels were never built for ordinary oceans, but to sail beyond the rim to the mysterious underside of the world!",
        choices: [
          { t: "Return the Agua-Sintellus Orb and your report to Saintmistress Rowanmantle in Reywald.", to: 11 }
        ]
      },
      11: {
        zone: "Reywald Sanctuary • Epilogue",
        title: "Navigator of the Chamber of Tomorrows",
        text: "In the candlelit sanctuary of Yarila and Porevit, Saintmistress Rowanmantle clasps your hands in gratitude as the Agua-Sintellus Orb settles safely into its velvet cradle. She rewards your daring recovery with gold and the blessing of the Twin Deities—and insists you keep the humming Celestial Sextant as a reminder of the hidden horizons you charted.",
        ending: { type: "true", title: "Navigator of the Chamber of Tomorrows", xp: 255, gold: 245, trophy: "Agua-Sintellus Glass Sphere" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. TO WAKE WAR (7 PAGES • LV 7)
  // ==========================================================
  bk_b8_ms_5_wake_war: {
    id: "bk_b8_ms_5_wake_war",
    title: "To Wake War",
    subtitle: "Karbekul Four-Fingers & Ylia, Angel of War",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Order of Mavros Pilgrims (Oakhaven Guildhall)",
    summary: "Venture into the Western Wastes where dust goblin warlord Karbekul Four-Fingers is uniting the tribes to summon what he believes is an elder horror—actually Ylia, an Angel of War! Seize the Great King's Crown and shatter the goblin horde!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Western Wastes Mountain Pass",
        title: "The Uniting Tribes",
        safeRetreat: true,
        text: "Normally fractious dust goblin tribes are marching under a single crimson banner—that of warlord Karbekul Four-Fingers! Scouts warn he has seized an ancient Great King's Crown to summon a mighty entity atop the Seat of Mavros!",
        enemy: { name: "Karbekul's Dust Goblin Vanguard", desc: "Unusually disciplined mountain-pass goblin ambushers.", hp: 58, ac: 15, atk: 8, dmg: 9, xp: 170, gold: 75, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Ascend the pilgrim trail to the high ritual circle before the summoning finishes!", to: 2 }
        ]
      },
      2: {
        zone: "High Altar of Mavros",
        title: "Karbekul Four-Fingers",
        text: "Holding the blazing Great King's Crown aloft amid chanting shamans, Karbekul Four-Fingers laughs madly as a pillar of golden-white fire tears open the sky—summoning not an elder horror, but the radiant War-Angel Ylia!",
        enemy: { name: "Karbekul Four-Fingers & Shamans", desc: "Ambitious dust goblin warlord trying to bind an Angel of War.", hp: 72, ac: 16, atk: 9, dmg: 11, xp: 255, gold: 175, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Return the Great King's Crown respectfully to War-Angel Ylia and ask her to break the goblin alliance!", badge: "Persuasion / Spirit DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 3, fail: 3, passMsg: "Honored by your respect, Ylia scatters the goblin horde in infighting and gifts you a War-Band!", failMsg: "Ylia reclaims the crown sternly, yet her departure still shatters Karbekul's alliance!" }, onPass: { items: ["bq_ylia_war_crown"], cw: "YLIA_BOON" } }
        ]
      },
      3: {
        zone: "Seat of Mavros",
        title: "The Horde Dissolves",
        text: "With Karbekul fallen and Ylia ascending back to the heavens, the dust goblin tribes immediately turn to squabbling among themselves and melt back into the wastes—saving Savoyne and Verrayne!",
        choices: [
          { t: "Meet the arriving pilgrims of the Order of Mavros.", to: 4 }
        ]
      },
      4: {
        zone: "Seat of Mavros",
        title: "The Tablet of Legend",
        text: "Grateful priests of Mavros carve your name onto the sacred Tablet of Legend as the mountain pass reopens to pilgrims.",
        onEnter: { healHp: 16, msg: "Blessed at the Seat of Mavros (+16 HP)!" },
        choices: [
          { t: "Descend to the frontier towns.", to: 5 }
        ]
      },
      5: {
        zone: "Verrayne Road",
        title: "War Averted",
        text: "Border garrisons stand down with vast relief and reward your heroism.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Guildhall",
        title: "Name in Stone",
        text: "Veterans toast the hero inscribed on the Tablet of Legend.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Silencer of the War-Horn",
        text: "You thwarted Karbekul Four-Fingers and earned the respect of an Angel of War.",
        ending: { type: "true", title: "Champion of the Seat of Mavros", xp: 295, gold: 285, trophy: "Tablet of Legend Rubbing" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. BLOOD OF A FALLEN STAR (7 PAGES • LV 8)
  // ==========================================================
  bk_b8_ms_6_fallen_star: {
    id: "bk_b8_ms_6_fallen_star",
    title: "Blood of a Fallen Star",
    subtitle: "Beryksheim & The Alien Mi-Go Fungus",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Dwarven Envoy from Beryksheim (Oakhaven Forge)",
    summary: "Investigate a glowing meteorite that crashed above the reaver-dwarf village of Beryksheim, free the enslaved townsfolk from an alien fungal infection, and destroy the cosmic Mi-Go hive!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Village of Beryksheim",
        title: "Strange Spores in the Snow",
        safeRetreat: true,
        text: "Since a blazing green star fell onto the ridge above Beryksheim, sturdy reaver-dwarves have begun staring blankly at the sky—purple alien tendrils sprouting from their helms! You follow the humming trail up to a steaming obsidian crater.",
        choices: [
          { t: "Study the alien spore-pods carefully to resist their mind-fog.", badge: "Arcana / Survival DC 14", check: { stat: "arcana", skill: "Survival", dc: 14, pass: 2, fail: 2, failDmg: 7, passMsg: "You bind a soaked scarf over your face—blocking the confusing spores!", failMsg: "Violet dust clouds your vision (-7 HP) as alien buzzes echo!" }, onPass: { cw: "SPORE_MASK" } },
          { t: "Charge straight into the glowing fungal cavern inside the crater!", to: 2 }
        ]
      },
      2: {
        zone: "Fungal Crater Cavern",
        title: "Enthralled Reaver-Dwarves",
        text: "Grasping fungal tendrils lash from the walls as spore-controlled dwarf warriors and buzzing cosmic drones rush to defend the fallen star!",
        enemy: { name: "Spore-Bound Drones & Fungi", desc: "Alien-infected cavern horrors serving the star-hive.", hp: 66, ac: 16, atk: 9, dmg: 10, xp: 195, gold: 90, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1, weakCw: ["SPORE_MASK"] },
        choices: [
          { t: "Storm the pulsating alien brain-chamber at the crater's heart!", to: 3 }
        ]
      },
      3: {
        zone: "Heart of the Fallen Star",
        title: "The Mi-Go Star-Harvesters",
        text: "Clicking like icy locusts on leathery cosmic wings, alien Mi-Go scientists channel psychic waves through a glowing star-core to enslave Beryksheim!",
        enemy: { name: "Mi-Go Star-Hive Overseers", desc: "Winged alien fungi wielding psychic confusion and neural agonizers.", hp: 84, ac: 16, atk: 10, dmg: 11, xp: 290, gold: 190, items: ["bq_migo_neural_rod"], weakCw: ["SPORE_MASK"] },
        choices: [
          { t: "Shatter the pulsating star-core to free every infected dwarf in Beryksheim!", to: 4 }
        ]
      },
      4: {
        zone: "Village of Beryksheim",
        title: "Minds Cleared",
        text: "The purple tendrils shrivel to harmless ash as the reaver-dwarves shake off the alien trance and raise roaring battle-cheers in your honor!",
        onEnter: { healHp: 18, msg: "Beryksheim's elders feast you and tend your wounds (+18 HP)!" },
        choices: [
          { t: "Accept the reaver-dwarves' silver tribute.", to: 5 }
        ]
      },
      5: {
        zone: "Northern Ridge",
        title: "Crater Sealed",
        text: "Dwarven miners collapse the crater cavern beneath tons of granite.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Forge",
        title: "Midgard Sagas Complete",
        text: "Even the blacksmith eyes your alien Mi-Go Neural Agonizer with wary awe.",
        choices: [
          { t: "Complete the adventure!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Savior of Beryksheim",
        text: "The alien menace of the Fallen Star is crushed and Beryksheim stands free.",
        ending: { type: "true", title: "Bane of the Fallen Star", xp: 325, gold: 310, trophy: "Quenched Star-Iron Shard" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. THE MARROW MINES (6 PAGES • LV 1)
  // Prepared! #2
  // ==========================================================
  bk_b8_prep_1_marrow_mines: {
    id: "bk_b8_prep_1_marrow_mines",
    title: "The Marrow Mines",
    subtitle: "Tunnels Inside a Petrified Leviathan",
    difficulty: "Easy",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Unnerved Prospectors (Oakhaven Forge)",
    summary: "Explore a bizarre mine dug straight into the colossal petrified bones of a buried ancient leviathan—and clear out the bone-gnawing scavengers haunting its hollow marrow shafts!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Leviathan Rib-Shaft",
        title: "Walls of Fossilized Bone",
        safeRetreat: true,
        text: "Instead of granite, pale ivory ribs arch overhead like a cathedral! Miners fled when chittering subterranean scavengers burst out of a cracked marrow-vein!",
        choices: [
          { t: "Inspect the porous bone floor for hollow sinkholes.", badge: "Perception DC 10", check: { stat: "spirit", skill: "Perception", dc: 10, pass: 2, fail: 2, failDmg: 2, passMsg: "You spot a brittle marrow-crust and step right around it!", failMsg: "Your boot punches through hollow bone (-2 HP)!" } },
          { t: "Press boldly into the Marrow Chamber.", to: 2 }
        ]
      },
      2: {
        zone: "Hollow Marrow Vein",
        title: "Bone-Gnawing Scavengers",
        text: "Giant subterranean centipedes and crazed pale goblins burst from the crystallized amber marrow!",
        enemy: { name: "Marrow-Mine Scavengers", desc: "Giant bone-boring vermin and cave raiders.", hp: 17, ac: 10, atk: 3, dmg: 3, xp: 40, gold: 20, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1 },
        choices: [
          { t: "Confront the mutated Bone-Warden blocking the rich mineral heart!", to: 3 }
        ]
      },
      3: {
        zone: "Leviathan's Heart-Vault",
        title: "Guardian of the Fossil",
        text: "Animated by lingering ancient magic inside the leviathan's sternum, a hulking Skeletal Marrow-Hulk rises to defend the crystallized gems!",
        enemy: { name: "Fossilized Marrow-Hulk", desc: "Lumbering undead construct fused from leviathan bone.", hp: 22, ac: 11, atk: 4, dmg: 4, undead: true, xp: 55, gold: 40, items: rollRandomLoot(["valuable", "consumable"], 1, "uncommon") },
        choices: [
          { t: "Collect the glowing amber marrow-crystals and return to the prospectors!", to: 4 }
        ]
      },
      4: {
        zone: "Mine Entrance",
        title: "Mysteries of the Leviathan",
        text: "The grateful prospectors pay your fee—though everyone wonders what colossal beast could have left such bones beneath the hills.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Forge",
        title: "Amber Marrow Sold",
        text: "Alchemists gladly buy the fossilized mineral shavings.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Explorer of the Marrow Mines",
        text: "The eerie fossil shafts are safe for miners once more.",
        ending: { type: "true", title: "Delver of the Marrow Mines", xp: 90, gold: 85, trophy: "Fossilized Leviathan Tooth" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. THE VAULT OF PALLON THE PIOUS (6 PAGES • LV 2)
  // Prepared! #3
  // ==========================================================
  bk_b8_prep_2_pallon: {
    id: "bk_b8_prep_2_pallon",
    title: "The Vault of Pallon the Pious",
    subtitle: "The Witch's Teeth & Reformed Pirate's Crypt",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Grizzled Boatman (Oakhaven Outskirts)",
    summary: "Row past the jagged Witch's Teeth sea-rocks to the hidden underwater door built by reformed pirate captain Pallon the Pious, find the missing adventurers, and survive his pious traps!",
    totalPages: 6,
    pages: {
      1: {
        zone: "The Witch's Teeth",
        title: "Door on the Sea-Rock",
        safeRetreat: true,
        text: "A boatman drops you at a slick sea-stack where an iron-bound stone door opens beneath the tide line. Inside the briny tunnel, a skeleton clutches a stone carved 'wrongteous' beside a concealed passage to the Prayer Room!",
        choices: [
          { t: "Spot the hidden release latch and secret Prayer Room passage!", badge: "Perception DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, passMsg: "You discover Pallon's secret Prayer Room and bypass his brine-trap!", failMsg: "Briny ooze nearly trips you as you splash down the main shaft." }, onPass: { cw: "PALLON_SECRET" } },
          { t: "Descend straight down the dripping stone stairs.", to: 2 }
        ]
      },
      2: {
        zone: "The Prayer Room",
        title: "Drowned Pirate Shades",
        text: "Barnacle-crusted undead buccaneers—old crewmates who hated Pallon's pious conversion—lunge out of the flooded pews!",
        enemy: { name: "Pallon's Drowned Crew", desc: "Salt-rotted pirate skeletons guarding the sunken vault.", hp: 24, ac: 11, atk: 4, dmg: 4, undead: true, xp: 60, gold: 30, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["PALLON_SECRET"] },
        choices: [
          { t: "Enter Pallon's Pious Treasury!", to: 3 }
        ]
      },
      3: {
        zone: "Pallon's Treasury",
        title: "The Pirate's Final Test",
        text: "Guarding Pallon's gleaming cutlass and penance-chest stands an animated bronze Sea-Golem engraved with lawful vows!",
        enemy: { name: "Pallon's Vault Sentinel", desc: "Lawful sea-bronze guardian protecting the reformed captain's hoard.", hp: 28, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 55, items: ["bq_pallon_pious_cutlass"], weakCw: ["PALLON_SECRET"] },
        choices: [
          { t: "Claim Pallon's Repentant Cutlass and row back past the Witch's Teeth!", to: 4 }
        ]
      },
      4: {
        zone: "Open Surf",
        title: "Answer on the Rock",
        text: "Your boatman whistles in admiration as you haul Pallon's sea-chest aboard.",
        choices: [
          { t: "Sail back to shore.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Market",
        title: "Pirate Gold",
        text: "Coins from three different kingdoms spill across the tavern table.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Raider of Pallon's Vault",
        text: "You solved the mystery of the Witch's Teeth and claimed Pallon the Pious's legacy.",
        ending: { type: "true", title: "Conqueror of Pallon's Vault", xp: 120, gold: 120, trophy: "Carved 'Wrongteous' Stone" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. THE CLARET WELLSPRING (6 PAGES • LV 3)
  // Prepared! #4
  // ==========================================================
  bk_b8_prep_3_claret: {
    id: "bk_b8_prep_3_claret",
    title: "The Claret Wellspring",
    subtitle: "The Soundless Vault & Keeper's Armor",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Whispered Crypt Rumor (Temple of the Dawn)",
    summary: "Enter a long-sealed triangular Soundless Vault where voices die beyond five feet, defeat the spellcasting mamura piloting the animated Armor of the Keeper, and quench the crimson Claret Wellspring!",
    totalPages: 6,
    pages: {
      1: {
        zone: "The Soundless Vault",
        title: "Dead Silence",
        safeRetreat: true,
        text: "Stepping into the cramped triangular stone chamber, your footsteps make no sound—a dark ritual in the next room smothers all speech past five feet! Two carved columns hum with hostile arcane energy!",
        choices: [
          { t: "Stay low and use hand-signals to flank the animated armor!", badge: "Stealth / Perception DC 11", check: { stat: "agility", skill: "Stealth", dc: 11, pass: 2, fail: 2, passMsg: "You close in silently before the stone columns can fire!", failMsg: "Arcane bolts ricochet off the dark stone pillars!" }, onPass: { cw: "SILENT_FLANK" } },
          { t: "Rush straight at the towering Armor of the Keeper!", to: 2 }
        ]
      },
      2: {
        zone: "Soundless Vault",
        title: "Mamura & Armor of the Keeper",
        text: "Piloting a charging suit of horned plate armor from inside its ribcage, an eerie spellcasting Mamura unleashes silent arcane blasts while the columns shoot rays!",
        enemy: { name: "Mamura in Keeper's Armor", desc: "Eternal guardian creature wearing animated horned armor.", hp: 34, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), weakCw: ["SILENT_FLANK"] },
        choices: [
          { t: "Break into the inner chamber of the Claret Wellspring!", to: 3 }
        ]
      },
      3: {
        zone: "Claret Wellspring",
        title: "Quenching the Crimson Basin",
        text: "Red-glowing water bubbles up from an ancient rune-ringed font—driving back its last crimson elemental sentinel breaks the silencing ritual forever!",
        enemy: { name: "Claret Wellspring Elemental", desc: "Churning crimson water-horror guarding the ritual font.", hp: 36, ac: 13, atk: 6, dmg: 6, xp: 105, gold: 65, items: rollRandomLoot(["weapon", "accessory"], 1, "rare") },
        choices: [
          { t: "Sound floods back into the vault as the waters turn crystal clear!", to: 4 }
        ]
      },
      4: {
        zone: "Vault Threshold",
        title: "Voices Restored",
        text: "Clear spring water flows cleanly once more as you pocket ancient ritual silver.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Temple of the Dawn",
        title: "Wellspring Blessed",
        text: "Priests reward you for cleansing the forgotten crimson shrine.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Purifier of the Claret Wellspring",
        text: "The Soundless Vault is broken and the Wellspring runs pure.",
        ending: { type: "true", title: "Breaker of the Soundless Vault", xp: 145, gold: 135, trophy: "Ruby Wellspring Vial" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. THE ROOM WITH FIVE CORNERS (6 PAGES • LV 4)
  // Prepared! #5
  // ==========================================================
  bk_b8_prep_4_five_corners: {
    id: "bk_b8_prep_4_five_corners",
    title: "The Room with Five Corners",
    subtitle: "Street Gang Hideout & Planar Portal",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Watch Investigator (Town Square)",
    summary: "Raid a bizarre street gang hideout mysteriously devoid of normal stolen goods, defeat gang boss Emit and the alien horror Xlrieh'oc's minions, and seize the diamond-set compass pointing toward a fifth cardinal direction!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Back-Alley Hideout",
        title: "Crates of White Powder",
        safeRetreat: true,
        text: "Tracking a brazen street gang to a cramped tenement, you find no normal loot—only crates of eerie shimmering white powder and a room whose walls impossibly form FIVE right-angled corners!",
        choices: [
          { t: "Examine the impossible geometry before stepping across the threshold.", badge: "Arcana DC 12", check: { stat: "arcana", skill: "Arcana", dc: 12, pass: 2, fail: 2, passMsg: "A planar rift! The fifth corner links to an alien realm!", failMsg: "The crooked angles make your stomach lurch!" }, onPass: { cw: "FIFTH_ANGLE_SEEN" } },
          { t: "Burst straight into the back room!", to: 2 }
        ]
      },
      2: {
        zone: "The Five-Cornered Room",
        title: "Emit & The Planar Thugs",
        text: "Gang leader Emit clutches a dazzling gold-and-diamond compass aligned to a fifth direction while distorted thugs and a tentacled emissary of Xlrieh'oc lunge from the shimmering corner-portal!",
        enemy: { name: "Emit & Aspect of Xlrieh'oc", desc: "Planar-touched street boss and alien portal-horror.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 145, gold: 90, items: ["bq_fifth_corner_compass"], weakCw: ["FIFTH_ANGLE_SEEN"] },
        choices: [
          { t: "Smash the powder crates and seal the five-cornered portal shut!", to: 3 }
        ]
      },
      3: {
        zone: "Normal Tenement",
        title: "Four Corners Again",
        text: "With a sharp pop, the impossible fifth corner snaps shut—leaving an ordinary dusty storeroom and Emit's priceless diamond-set navigation compass in your hand!",
        choices: [
          { t: "Report the closed rift to the watch investigator.", to: 4 }
        ]
      },
      4: {
        zone: "Watch House",
        title: "Strange Cargo",
        text: "The watch pays your bounty gladly, relieved the bizarre powder is gone from the streets.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Guildhall",
        title: "A Fifth Direction",
        text: "Arcanists marvel at the diamond needle spinning softly toward nowhere on any mortal map.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Sealer of the Fifth Corner",
        text: "You closed Xlrieh'oc's back-alley rift before anything worse stepped through.",
        ending: { type: "true", title: "Warden of the Fifth Corner", xp: 180, gold: 170, trophy: "Five-Sided Brass Key" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. UPON THE ICEBOUND TERRACE (6 PAGES • LV 6)
  // Prepared! #6
  // ==========================================================
  bk_b8_prep_5_icebound: {
    id: "bk_b8_prep_5_icebound",
    title: "Upon the Icebound Terrace",
    subtitle: "Gorol's Outpost & White Dragon Halicix",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Northern Explorer Vladimir (Rusty Flagon Tavern)",
    summary: "Journey north from Gorol's Outpost to ancient glacial ruins where rogue ice-mage Oithois and ice mephits have ripped open a planar gate—accidentally dragging furious white dragon Halicix onto the Icebound Terrace!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Icebound Terrace",
        title: "Rift in the Blizzard",
        safeRetreat: true,
        text: "Days north of Gorol's Outpost, howling winds whip across ancient frost-carved ruins! Ice mage Oithois and cackling ice mephits chant before a swirling blue gate—just as an enraged White Dragon named Halicix bursts through, roaring in fury at being yanked to the Material Plane!",
        choices: [
          { t: "Shout to Halicix that Oithois—not you—trapped him, turning the dragon's wrath on the mephits!", badge: "Persuasion DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 2, fail: 2, passMsg: "Snarling, Halicix blasts Oithois's mephits with frost before lunging!", failMsg: "Blinded by rage, the dragon sweeps frost across everyone on the terrace!" }, onPass: { cw: "HALICIX_PARLEY" } },
          { t: "Charge straight at ice mage Oithois to close the blizzard gate!", to: 2 }
        ]
      },
      2: {
        zone: "Icebound Terrace",
        title: "Oithois & The Frost Gate",
        text: "Furious at being thwarted, ice mage Oithois unleashes jagged icicles while Halicix's roaring gale sweeps the terrace!",
        enemy: { name: "Oithois & White Dragon Halicix", desc: "Reckless frost-conjurer and enraged white dragon on the glacier.", hp: 66, ac: 15, atk: 8, dmg: 9, xp: 215, gold: 145, items: ["bq_halicix_frost_scale"], weakCw: ["HALICIX_PARLEY"] },
        choices: [
          { t: "Dive behind a pillar as the collapsing gate unleashes one final blizzard blast!", to: 3 }
        ]
      },
      3: {
        zone: "Quiet Glacier",
        title: "Gate Sealed",
        text: "The swirling blue portal implodes in glittering snow! Among Oithois's ruined relics gleams a frost-tempered buckler and a pouch of northern gems.",
        choices: [
          { t: "Trek back down to Gorol's Outpost.", to: 4 }
        ]
      },
      4: {
        zone: "Gorol's Outpost",
        title: "Warm Fire & Coin",
        text: "Explorer Vladimir and the outpost commander pay generously for keeping a rampaging white dragon off the frontier.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Tavern",
        title: "Frost-Touched",
        text: "Hot spiced cider never tasted finer.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Victor of the Icebound Terrace",
        text: "You survived Oithois's planar blizzard and mastered the Icebound Terrace.",
        ending: { type: "true", title: "Hero of the Icebound Terrace", xp: 250, gold: 240, trophy: "Glacial Gate-Rune" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 12. IN ITS HORRID WAKE (6 PAGES • LV 7)
  // Prepared! #7
  // ==========================================================
  bk_b8_prep_6_horrid_wake: {
    id: "bk_b8_prep_6_horrid_wake",
    title: "In Its Horrid Wake",
    subtitle: "Blighted Trail of an Abyssal Behemoth",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Frontier Rangers (Oakhaven Outskirts)",
    summary: "Follow the blackened, poisoned swath carved across the borderlands by a monstrous planar scavenger—clearing the blighted horrors spawning in its horrid wake before it reaches the valley farms!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Blackened Trail",
        title: "Earth Scorched to Ash",
        safeRetreat: true,
        text: "A thirty-foot-wide furrow of withered trees and oily black footprints cuts straight across the frontier! Mutated Carrion Crawlers and blighted hounds burst from the toxic trail!",
        enemy: { name: "Wake-Blighted Scavengers", desc: "Mutated beasts spawned from the behemoth's toxic trail.", hp: 58, ac: 15, atk: 8, dmg: 9, xp: 170, gold: 75, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Sprint ahead along the rocky ridge to intercept the Behemoth before it reaches the farms!", to: 2 }
        ]
      },
      2: {
        zone: "Shattered Ravine",
        title: "The Abyssal Behemoth",
        text: "Churning topsoil into venomous sludge, a towering, acid-dripping Abyssal Ravager turns its jagged maw toward you with a deafening bellow!",
        enemy: { name: "Abyssal Wake-Ravager", desc: "Colossal planar beast leaving toxic ruin wherever it treads.", hp: 74, ac: 16, atk: 9, dmg: 11, xp: 260, gold: 175, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Burn away its venomous ichor so the frontier soil can heal!", to: 3 }
        ]
      },
      3: {
        zone: "Valley Overlook",
        title: "Farms Spared",
        text: "Just half a mile below sit untouched green pastures—the farmers cheer as the black smoke clears from the ridge!",
        choices: [
          { t: "Accept the frontier rangers' bounty.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Outskirts",
        title: "Trail Purified",
        text: "Druids arrive to bless the scarred furrow back to life.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Guildhall",
        title: "Border Hero",
        text: "Your swift hunt saved an entire harvest season.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Stalker of the Horrid Wake",
        text: "The abyssal ravager is slain and the borderlands breathe easy once more.",
        ending: { type: "true", title: "Slayer of the Wake-Ravager", xp: 295, gold: 280, trophy: "Acid-Etched Behemoth Horn" },
        choices: []
      }
    }
  }
});
