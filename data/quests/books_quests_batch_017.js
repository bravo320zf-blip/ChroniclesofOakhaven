/* ============================================================
   BOOK QUESTS — BATCH 017 (12 Quests • All autoDiscover: false)
   Purely in-world subtitles & Inn rumor pool discovery.
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. PROUDHEART'S PREDATOR PROBLEM (6 PAGES • LV 1)
  // ==========================================================
  bk_b17_tob3_proudheart: {
    id: "bk_b17_tob3_proudheart",
    title: "Proudheart's Predator Problem",
    subtitle: "Grumbo Proudheart's Wool-Off Flock & The Herd Skulker",
    difficulty: "Easy",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Farmer Grumbo Proudheart (Rusty Flagon Tavern)",
    summary: "Answer halfling farmer Grumbo Proudheart's desperate plea to discover what mysterious beast is devouring his ten-time Wool-Off champion sheep—and ambush the cunning Herd Skulker!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Proudheart Farm • Moonlit Pasture",
        title: "Missing Champions",
        safeRetreat: true,
        text: "Farmer Grumbo Proudheart wrings his wool cap beside a torn pasture fence: something clever has been picking off his prized Wool-Off champion sheep without waking a single sheepdog! Strange wool-tufts cling to a hollow oak at the edge of the meadow.",
        choices: [
          { t: "Examine the sheep-tracks closely to spot which 'sheep' in the flock is actually a disguised predator!", badge: "Perception DC 10", check: { stat: "spirit", skill: "Perception", dc: 10, pass: 2, fail: 2, passMsg: "Aha! One oversized 'ewe' has razor-sharp claws tucked beneath stolen fleece!", failMsg: "The flock scatters in panic as a snarling shape leaps from the wool!" }, onPass: { cw: "SKULKER_SPOTTED" } },
          { t: "Patrol the moonlit pasture fence with weapon bared!", to: 2 }
        ]
      },
      2: {
        zone: "Proudheart Pasture • Hay Barn",
        title: "The Herd Skulker",
        text: "Shedding its bloodied cloak of stolen champion fleece, a lithe, sharp-fanged **Herd Skulker** lunges out of the shadows beside the hayloft!",
        enemy: { name: "The Herd Skulker", desc: "Cunning fleece-draped predator that hides inside sheep flocks.", hp: 24, ac: 12, atk: 4, dmg: 4, xp: 65, gold: 40, items: ["bq_proudheart_wool_cloak"], weakCw: ["SKULKER_SPOTTED"] },
        choices: [
          { t: "Calm the remaining Wool-Off sheep and call Farmer Grumbo out of the farmhouse!", to: 3 }
        ]
      },
      3: {
        zone: "Proudheart Farmhouse • Dawn",
        title: "Flock Saved",
        text: "Grumbo Proudheart cheers so loudly the rooster crows twice, insisting on serving you hot mutton-free herb pies and paying out his prized fair-gold!",
        onEnter: { healHp: 8, msg: "Grumbo's warm halfling breakfast restores your health (+8 HP)!" },
        choices: [
          { t: "Accept Grumbo's heartfelt gratitude.", to: 4 }
        ]
      },
      4: {
        zone: "Pasture Gate",
        title: "Wool-Off Champion Ready",
        text: "The remaining sheep graze peacefully beneath the morning sun.",
        choices: [
          { t: "Head back to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Road",
        title: "A Farm at Peace",
        text: "Word spreads fast of the hero who saved Proudheart's famous flock.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Guardian of the Wool-Off",
        text: "You unmasked and slew the Herd Skulker, saving Grumbo Proudheart's farm!",
        ending: { type: "true", title: "Protector of Proudheart Farm", xp: 100, gold: 90, trophy: "Blue Ribbon of the Wool-Off" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. FLIGHT OF THE DROMEDARIES (6 PAGES • LV 1)
  // ==========================================================
  bk_b17_tob3_dromedaries: {
    id: "bk_b17_tob3_dromedaries",
    title: "Flight of the Dromedaries",
    subtitle: "Scattered Caravan Camels & Desert Slimes",
    difficulty: "Easy",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Desert Caravan Master (Rusty Flagon Tavern)",
    summary: "When a soaring dragon's shadow sends your caravan's camels bolting into the scorching dunes, track the panicked mounts across shifting sands and save them from caustic Desert Slimes!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Scorching Dunes • Broken Tether",
        title: "Shadow of Wings",
        safeRetreat: true,
        text: "A titanic dragon's shadow sweeps across the trade road—and in an instant, six laden dromedaries snap their halters and bolt deep into the shimmering dunes! The caravan master begs you to round them up before the desert's hazards swallow both mounts and cargo!",
        choices: [
          { t: "Follow the spilled spice-sacks to find the camels huddled in a shaded canyon before the slimes close in!", badge: "Survival DC 10", check: { stat: "spirit", skill: "Survival", dc: 10, pass: 2, fail: 2, passMsg: "You reach the canyon rim first and spot the translucent Desert Slimes oozing down the sandstone!", failMsg: "Mirage heat slows your stride as caustic slimes surround the frightened camels!" }, onPass: { cw: "CANYON_RIM" } },
          { t: "Sprint straight across the sun-baked dunes after the dust cloud!", to: 2 }
        ]
      },
      2: {
        zone: "Shaded Sandstone Basin",
        title: "Caustic Desert Slimes",
        text: "Shimmering like pools of false oasis water, two ravenous **Desert Slimes** ooze across the basin floor toward the cornered, spitting dromedaries!",
        enemy: { name: "Caustic Desert Slimes", desc: "Translucent sand-oozes that ambush thirsty desert travelers.", hp: 24, ac: 11, atk: 4, dmg: 4, xp: 65, gold: 40, items: ["bq_caravan_water_flask"], weakCw: ["CANYON_RIM"] },
        choices: [
          { t: "Soothe the dromedaries with oats and lead the entire string back to the caravan!", to: 3 }
        ]
      },
      3: {
        zone: "Caravan Camp • Oasis Edge",
        title: "Mounts Recovered",
        text: "The caravan master whoops with relief as every last camel and silk bale trots safely back into camp, paying out double hazard wages.",
        onEnter: { healHp: 8, msg: "Cool oasis melons and shaded rest revive your strength (+8 HP)!" },
        choices: [
          { t: "Pocket your gold.", to: 4 }
        ]
      },
      4: {
        zone: "Trade Road",
        title: "Clear Skies",
        text: "The distant dragon has long since vanished over the peaks.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Caravan Gate",
        title: "Job Well Done",
        text: "Merchants tip their hats to the wrangler of the dunes.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Wrangler of the Dunes",
        text: "You outlasted the scorching sands, slew the Desert Slimes, and saved the caravan's camels!",
        ending: { type: "true", title: "Savior of the Dromedaries", xp: 100, gold: 95, trophy: "Brass Camel Bell" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. FUROR IN THE FARMYARD (6 PAGES • LV 2)
  // ==========================================================
  bk_b17_tob3_farmyard: {
    id: "bk_b17_tob3_farmyard",
    title: "Furor in the Farmyard",
    subtitle: "Hundedel Farm & The Deceived Dragonettes",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Local Magistrate's Deputy (Rusty Flagon Tavern)",
    summary: "Storm the fortified Hundedel family farm where an escaped outlaw holds the youngest farm boy hostage—and win over the deceived Barnyard and Shovel Dragonettes helping him defend the farmhouse!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Hundedel Farm • Fortified Fence",
        title: "Bandits in the Barn",
        safeRetreat: true,
        text: "After busting out of the magistrate's cells, a notorious outlaw and his crew seized the Hundedel family farm! Worse, they tricked the farm's helpful little **Barnyard & Shovel Dragonettes** into digging trenches and guarding the yard while the youngest Hundedel boy is tied up inside!",
        choices: [
          { t: "Toss shiny copper buttons and explain the outlaws' lies to convince the Shovel Dragonettes to stand down!", badge: "Persuasion DC 11", check: { stat: "spirit", skill: "Persuasion", dc: 11, pass: 2, fail: 2, passMsg: "Chittering furiously at being tricked, the dragonettes flip sides and dig pits under the bandits!", failMsg: "The loyal little dragonettes puff sparks and dive-bomb you alongside a snapping Razorback Crab!" }, onPass: { cw: "DRAGONETTE_TRUCE" } },
          { t: "Vault the hay-bale barricade straight into the farmyard!", to: 2 }
        ]
      },
      2: {
        zone: "Hundedel Yard • Trench Line",
        title: "Razorback Crab & Bandit Guards",
        text: "A snapping, shell-spiked **Razorback Crab** and escaped outlaws charge out of the chicken coop to hold the porch!",
        enemy: { name: "Escaped Outlaws & Razorback Crab", desc: "Desperate jailbreakers and a spiky farmyard crustacean.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["DRAGONETTE_TRUCE"] },
        choices: [
          { t: "Kick open the farmhouse kitchen door to confront the Bandit Leader!", to: 3 }
        ]
      },
      3: {
        zone: "Hundedel Farmhouse • Kitchen",
        title: "The Jailbreak Ringleader",
        text: "Brandishing a stolen magistrate's saber beside the tied-up farm boy, the **Outlaw Ringleader** snarls: 'I ain't going back in irons!'",
        enemy: { name: "Outlaw Ringleader", desc: "Notorious escaped brigand holding the Hundedel boy hostage.", hp: 32, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 65, items: ["bq_hundedel_dragonette_charm"], weakCw: ["DRAGONETTE_TRUCE"] },
        choices: [
          { t: "Untie young Hundedel and hand the bound outlaws over to the magistrate's deputies!", to: 4 }
        ]
      },
      4: {
        zone: "Hundedel Porch • Reunion",
        title: "Farm Restored",
        text: "The Hundedel family weeps with relief as the apologetic Barnyard Dragonettes chirp happily around your boots, and the magistrate pays out the full jailbreak bounty.",
        onEnter: { healHp: 8, msg: "Fresh farmhouse cider and bandages restore your strength (+8 HP)!" },
        choices: [
          { t: "Collect your reward.", to: 5 }
        ]
      },
      5: {
        zone: "Country Lane",
        title: "Peace in the Barnyard",
        text: "The little dragonettes wave goodbye from the barn roof.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Hero of Hundedel Farm",
        text: "You freed the Hundedel boy and ended the farmyard siege!",
        ending: { type: "true", title: "Friend of the Dragonettes", xp: 130, gold: 120, trophy: "Magistrate's Copper Star" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. SALVAGE AT LONELY COVE (10 PAGES • LV 2)
  // ==========================================================
  bk_b17_tob3_lonely_cove: {
    id: "bk_b17_tob3_lonely_cove",
    title: "Salvage at Lonely Cove",
    subtitle: "Steep Sea Cliffs & The Storm-Wrecked Cargo",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Harbor Salvage Broker (Rusty Flagon Tavern)",
    summary: "Descend the treacherous sea cliffs to Lonely Cove—where the storm-wrecked merchant ship Gilded Tern washed ashore—rescue any survivors, and brave the Beach Weird, Guardian Archaeopteryx, and Pescavitus guarding the rising tide!",
    totalPages: 10,
    pages: {
      1: {
        zone: "Lonely Cove • Cliffside Rim",
        title: "Flotsam on the Hidden Beach",
        safeRetreat: true,
        text: [
          "Salt spray stings your cheeks as you peer over the knife-edged chalk cliffs above Lonely Cove. Far below, the broken hull of the merchant brig <em>Gilded Tern</em> lies impaled across black basalt teeth, surrounded by splintered oak ribs, sodden spice barrels, and brass-bound strongboxes glinting in the ebb tide.",
          "Strange whorls churn unnaturally inside the quiet tide pools while sharp-beaked, feathered shapes wheel beneath the overhanging rocks. Halfway down the cliff face, a faint amber lantern winks twice from a narrow sea-cleft—someone from the crew may still be alive."
        ],
        choices: [
          { t: "Anchor a taut climbing line along the dry chalk ledge to descend silently without triggering loose shale.", badge: "Athletics / Might DC 11", check: { stat: "might", skill: "Athletics", dc: 11, pass: 2, fail: 2, passMsg: "Your knots hold true—you rappel cleanly onto the shingle without alerting the cove predators!", failMsg: "Loose chalk clatters down the cliffside, snapping every predator on the beach to attention!" }, onPass: { cw: "CLEAN_DESCENT" } },
          { t: "Follow the narrow smuggler's ledge toward the winking lantern in the sea-cleft.", badge: "Perception / Agility DC 11", check: { stat: "agility", skill: "Perception", dc: 11, pass: 7, fail: 2, passMsg: "You spot carved toe-holds in the damp chalk and slip straight into the sheltered lantern cleft!", failMsg: "Slick kelp forces you to abandon the ledge and slide down onto the open beach!" } },
          { t: "Scramble straight down the wet cliff-stairs to reach the shipwreck before the tide turns.", to: 2 }
        ]
      },
      2: {
        zone: "Lonely Cove • Wrecked Hull",
        title: "Tide-Pool Predators",
        text: [
          "Your boots crunch onto wet shingle beside the <em>Gilded Tern</em>'s shattered waist. Cold brine hisses through broken planking, carrying the scent of crushed cinnamon and ozone.",
          "Without warning, the nearest tide pool rears up into a translucent, grasping <strong>Beach Weird</strong> while a razor-beaked <strong>Guardian Archaeopteryx</strong> shrieks down from the splintered mainmast to defend its newfound hoard!"
        ],
        enemy: { name: "Beach Weird & Guardian Archaeopteryx", desc: "Elemental surf-spirit and razor-beaked cliff scavenger guarding the wreck.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["CLEAN_DESCENT", "BOSUN_TIP"] },
        choices: [
          { t: "Duck into the tilted forecastle to search the sunken chart-room before the tide seals it.", to: 8 },
          { t: "Wade straight through the foaming mid-deck toward the captain's flooded stern cabin.", to: 3 }
        ]
      },
      3: {
        zone: "Lonely Cove • Flooded Stern",
        title: "The Pescavitus",
        text: [
          "Ankle-deep turquoise surf surges through the shattered stern windows of the captain's quarters. Barnacled charts bob across the water, framing a heavy brass-bound strongbox bolted beside the rudder-post.",
          "Coiled protectively around the chest lurks a spiny, armored <strong>Cove Pescavitus</strong>—its dorsal fins flaring like rusted daggers as its jaws snap through the rising foam!"
        ],
        enemy: { name: "Cove Pescavitus", desc: "Ferocious spine-backed coastal ambush predator hoarding shipwreck salvage.", hp: 32, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 70, items: ["bq_lonely_cove_spyglass"], flee: 2, weakCw: ["CLEAN_DESCENT", "BOSUN_TIP"] },
        choices: [
          { t: "Run your fingertips along the strongbox's base to check for a hidden smuggler's compartment.", badge: "Detect Traps / Luck DC 12", check: { stat: "luck", skill: "Detect Traps", dc: 12, pass: 9, fail: 4, passMsg: "Click! A spring-loaded panel slides open beneath the waxed velvet lining!", failMsg: "Nothing hidden turns up—and a booming breaker warns that high tide is minutes away!" } },
          { t: "Lash the brass strongbox into a rope sling and haul it toward the cliff-winch before high tide floods the cove!", to: 4 }
        ]
      },
      4: {
        zone: "Lonely Cove • Cliff Winch",
        title: "Race Against the Spring Tide",
        text: [
          "White surf roars over the black basalt just as you hook the heavy brass strongbox onto the broker's cliff-side rope sling. Halfway up the sheer chalk face, a salt-stiffened hemp strand groans and begins to fray as the chest swings dangerously against the rock!"
        ],
        choices: [
          { t: "Brace your boots against the timber winch-posts and haul the line hand-over-hand.", badge: "Athletics / Might DC 11", check: { stat: "might", skill: "Athletics", dc: 11, pass: 5, fail: 5, failDmg: 3, passMsg: "Muscles burning, you heave the chest cleanly over the cliff rim before the rope gives!", failMsg: "Rough hemp scorches your palms (-3 HP) as you wrestle the heavy chest onto solid grass!" } },
          { t: "Throw a quick sailor's hitch around the drum to steady the pendulum swing and ease it up.", badge: "Survival / Agility DC 11", check: { stat: "agility", skill: "Survival", dc: 11, pass: 5, fail: 5, passMsg: "Textbook seamanship! The strongbox glides smoothly over the chalk lip without a scratch!", failMsg: "The chest bangs hard against the rock face, though the iron bands hold all the way up." } },
          { t: "Weave a lifting gust of wind to take the weight off the fraying hemp.", badge: "Arcana DC 11", check: { stat: "arcana", skill: "Arcana", dc: 11, pass: 5, fail: 5, passMsg: "A whistling updraft buoys the brass chest effortlessly onto the clifftop (+20 XP)!", failMsg: "The salt breeze scatters your focus, forcing you to haul the last few yards by hand." }, onPass: { xp: 20 } }
        ]
      },
      5: {
        zone: "Oakhaven Harbor Quay",
        title: "Settlement at the Quay",
        text: [
          "Lanterns bob along the timber pilings as you cart the salvaged strongbox back to the Harbor Quay. Master Fenwick, the sharp-eyed salvage broker, runs a thumb over the unbroken wax seals and lets out a low, delighted whistle.",
          "\"Still dry inside, by the tides!\" Fenwick grins, sliding a steaming bowl of clam chowder and a dry wool blanket across his counting-table. \"Sit a spell while I tally your share.\""
        ],
        onEnter: { healHp: 8, msg: "Dry wool and hot harbor chowder warm you up (+8 HP)!" },
        choices: [
          { t: "Lay the recovered ship's manifest on Fenwick's ledger to claim the full Merchant Guild bonus!", reqCw: "SHIP_MANIFEST", badge: "Manifest Bonus", to: 10 },
          { t: "Point out the Pescavitus claw-marks on the brass lid and haggle for hazard pay.", badge: "Persuasion / Spirit DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 10, fail: 6, passMsg: "Fenwick laughs ruefully and stacks an extra thirty gold sovereigns onto your share!", failMsg: "Fenwick shakes his head with a crooked smile: 'Fair try, friend, but a contract's a contract.'" }, onPass: { gold: 30 } },
          { t: "Accept your honest salvage share and watch the evening tide roll over the coast.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Master of Lonely Cove",
        text: "As twilight settles over the chalk headlands, waves wash cleanly over the empty ribs of the <em>Gilded Tern</em>. Back in Oakhaven, sailors raise their mugs to the adventurer who outpaced the spring tide and brought Lonely Cove's treasure home.",
        ending: { type: "true", title: "Salvager of Lonely Cove", xp: 130, gold: 125, trophy: "Barnacle-Etched Ship Compass" },
        choices: []
      },
      7: {
        zone: "Lonely Cove • Lantern Cleft",
        title: "The Sea-Cave Survivor",
        text: [
          "Inside the damp chalk niche you find <strong>Tamsin</strong>, the <em>Gilded Tern</em>'s bruised bosun's mate, clutching a shuttered oil-lantern. Relief floods her face as you duck beneath the rock arch.",
          "\"Thank the harbor lights!\" she whispers, pointing down at the wreck. \"Watch the tide pools—the storm woke a water-spirit and a feathered cliff-fiend, and some spine-backed sea-beast crawled into Captain Harrow's stern cabin! Its belly-scales are soft if you strike low when it lunges.\""
        ],
        choices: [
          { t: "Bind Tamsin's scraped forearm with a soothing sea-herb compress and take her spare vial.", badge: "Herbalism / Spirit DC 10", check: { stat: "spirit", skill: "Herbalism", dc: 10, pass: 2, fail: 2, passMsg: "Tamsin clasps your hand gratefully, pressing a Bramble Antidote into your palm (+4 HP)!", failMsg: "The bandage is rough, yet Tamsin thanks you warmly and marks the safest path down to the hull." }, onPass: { cw: "BOSUN_TIP", items: ["antidote"], healHp: 4 } },
          { t: "Thank Tamsin for the warning, help her up the safe cliff-rope, and drop down to the wreck.", onChoose: { cw: "BOSUN_TIP", msg: "Tamsin's warning gives you the upper hand against the cove beasts!" }, to: 2 }
        ]
      },
      8: {
        zone: "Lonely Cove • Tilted Forecastle",
        title: "The Sunken Chart-Room",
        text: [
          "The forecastle tilts at a dizzying angle, its walls lined with brass compasses and soggy parchment rolls. Wedged beneath an overturned chart-table sits the ship's wax-sealed <strong>Cargo Manifest</strong>—worth a handsome bonus to the Merchant Guild—alongside a salt-crusted navigator's lockbox and a dry medicine rack."
        ],
        choices: [
          { t: "Pick the salt-corroded brass lock on the navigator's box before the cabin floods.", badge: "Lockpicking / Agility DC 12", onChoose: { cw: "SHIP_MANIFEST" }, check: { stat: "agility", skill: "Lockpicking", dc: 12, pass: 3, fail: 3, failDmg: 3, passMsg: "Pop! Inside rest 30 dry gold coins, Sea Salt Crystals, and the Cargo Manifest!", failMsg: "The rusted hinge snaps shut on your knuckles (-3 HP), though you still snatch the Cargo Manifest!" }, onPass: { gold: 30, items: ["sea_salt"] } },
          { t: "Tuck the Cargo Manifest into your oilskin pouch and grab a corked Health Potion from the rack.", onChoose: { cw: "SHIP_MANIFEST", items: ["health_potion"], msg: "Recovered the Cargo Manifest and a dry Health Potion!" }, to: 3 }
        ]
      },
      9: {
        zone: "Lonely Cove • Rising Tide",
        title: "The Captain's Secret Compartment",
        text: [
          "Beneath the strongbox's waxed velvet lining lies a shallow false bottom built for quiet frontier tariffs! Inside glints a dry leather purse of imperial gold sovereigns alongside an engraved <strong>Silver Signet</strong>."
        ],
        onEnter: { gold: 35, items: ["silver_signet"], msg: "Hidden compartment! Found +35 GP and a Silver Signet!" },
        choices: [
          { t: "Snap the false bottom shut and hoist the chest up the cliff before the tide surges!", to: 4 }
        ]
      },
      10: {
        zone: "Epilogue",
        title: "Master Salvager of Lonely Cove",
        text: "Master Fenwick stamps the recovered manifest with the Merchant Guild's red wax seal and counts out a brimming purse of gold sovereigns. Word of your fearless cliffside salvage—and sharp eye for every hidden ledger and lockbox—spreads across Oakhaven's docks before sundown.",
        ending: { type: "true", title: "Master Salvager of Lonely Cove", xp: 155, gold: 165, trophy: "Barnacle-Etched Ship Compass" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. AUTOMATED BANDITRY (6 PAGES • LV 3)
  // ==========================================================
  bk_b17_tob3_auto_banditry: {
    id: "bk_b17_tob3_auto_banditry",
    title: "Automated Banditry",
    subtitle: "Clockwork Brigands & The Stolen Construct Army",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Robbed Trade Guild Factor (Rusty Flagon Tavern)",
    summary: "Track down a gang of highway bandits who hijacked a hoard of mechanical constructs—fighting past a Clockwork Armadillo, Clockwork Pugilist, and Harvest Horse to dismantle their brass-plated hideout!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Forest Toll-Road • Oil-Stained Tracks",
        title: "Brass Footprints on the Highway",
        safeRetreat: true,
        text: "Merchants dare not travel the east highway since bandits stole a shipment of clockwork servants and turned them into a ticking highway army! Heavy gear-tracks and spilled machine oil lead straight to an abandoned watermill!",
        choices: [
          { t: "Jam the watermill's outer winding-gear to drain spring-tension from the bandits' constructs!", badge: "Lockpicking / Arcana DC 12", check: { stat: "arcana", skill: "Lockpicking", dc: 12, pass: 2, fail: 2, passMsg: "Clang! Several clockwork sentries wind down mid-patrol!", failMsg: "A brass alarm-horn blasts as rolling Clockwork Armadillos charge!" }, onPass: { cw: "GEARS_JAMMED" } },
          { t: "Kick open the mill-barn doors and face the mechanical brigands head-on!", to: 2 }
        ]
      },
      2: {
        zone: "Abandoned Mill • Courtyard",
        title: "Clockwork Armadillo & Harvest Horse",
        text: "A spinning, iron-shelled **Clockwork Armadillo** and a scythe-rigged **Harvest Horse** thunder across the yard alongside grinning bandits!",
        enemy: { name: "Clockwork Armadillo & Harvest Horse", desc: "Hijacked mechanical constructs turned into highway raiders.", hp: 34, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["GEARS_JAMMED"] },
        choices: [
          { t: "Storm into the mill-loft where the bandit chief commands a Clockwork Pugilist!", to: 3 }
        ]
      },
      3: {
        zone: "Mill Loft • Gearwork Control",
        title: "Bandit Chief & Clockwork Pugilist",
        text: "Cranking a brass command-box, the **Bandit Chief** unleashes a towering, iron-fisted **Clockwork Pugilist** to pulverize you!",
        enemy: { name: "Clockwork Pugilist & Bandit Chief", desc: "Heavy brass boxing construct and its clever outlaw master.", hp: 42, ac: 14, atk: 6, dmg: 6, xp: 140, gold: 95, items: ["bq_clockwork_pugilist_knuckles"], weakCw: ["GEARS_JAMMED"] },
        choices: [
          { t: "Smash the command-box and return the recovered trade goods to the guild!", to: 4 }
        ]
      },
      4: {
        zone: "Trade Guildhouse",
        title: "Highway Reopened",
        text: "Delighted merchants cheer as the ticking highway menace ends, paying your full bounty.",
        onEnter: { healHp: 10, msg: "Guild apothecaries tend your bruises (+10 HP)!" },
        choices: [
          { t: "Pocket your gold.", to: 5 }
        ]
      },
      5: {
        zone: "East Highway",
        title: "Safe Roads",
        text: "Wagons roll freely past the silent mill once more.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Wrecker of the Brass Gang",
        text: "You dismantled the clockwork bandits and reopened the trade highway!",
        ending: { type: "true", title: "Breaker of Automated Banditry", xp: 170, gold: 155, trophy: "Brass Master Winding-Key" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. EVIL RISES (6 PAGES • LV 3)
  // ==========================================================
  bk_b17_tob3_evil_rises: {
    id: "bk_b17_tob3_evil_rises",
    title: "Evil Rises",
    subtitle: "Amaranth the Bakery Drake & The Poisoned Pastries",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Weeping Pastry Apprentice (Rusty Flagon Tavern)",
    summary: "Enter the chaos-stricken shop of Amaranth—the beloved Bakery Drake framed for poisoning city nobles—battle animated oven hazards, and unmask the jealous saboteur hiding in her flour cellar!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Amaranth's Bakery • Flour-Dusted Front",
        title: "A Framed Confectioner",
        safeRetreat: true,
        text: "Amaranth the Bakery Drake was the darling of high society until tainted cream-puffs sickened three nobles! Now panicked guards have sealed her shop while monstrous dough-oozes and fire-sparks rampage inside—yet Amaranth swears someone poisoned her spice-rack!",
        choices: [
          { t: "Sniff the overturned sugar-jars to identify the foreign nightshade dust planted by a rival!", badge: "Herbalism / Investigation DC 12", check: { stat: "arcana", skill: "Herbalism", dc: 12, pass: 2, fail: 2, passMsg: "Nightshade and mimic-yeast! A trail of purple flour leads straight to the cellar hatch!", failMsg: "Sizzling animated dough-blobs flop off the counter toward you!" }, onPass: { cw: "NIGHTSHADE_TRAIL" } },
          { t: "Push through the billowing flour-clouds straight into the kitchen!", to: 2 }
        ]
      },
      2: {
        zone: "Bakery Kitchen • Blazing Ovens",
        title: "Runaway Dough & Oven Sparks",
        text: "Swellings of cursed yeast-ooze and angry fire-sparks spill out of the brick ovens as panicked Amaranth flutters overhead!",
        enemy: { name: "Cursed Yeast-Oozes & Oven Sparks", desc: "Sabotaged magical dough monsters rampaging through the kitchen.", hp: 34, ac: 12, atk: 5, dmg: 6, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["NIGHTSHADE_TRAIL"] },
        choices: [
          { t: "Drop into the flour cellar to corner the true poisoner!", to: 3 }
        ]
      },
      3: {
        zone: "Bakery Cellar • Spice Vault",
        title: "The Rival Saboteur",
        text: "Caught red-handed clutching a vial of nightshade and corrupted starter-yeast, the envious **Guild Saboteur** hurls caustic alchemical flasks to silence you!",
        enemy: { name: "Envious Confectioner Saboteur", desc: "Poison-slinging rival who framed Amaranth the Bakery Drake.", hp: 42, ac: 14, atk: 6, dmg: 6, xp: 140, gold: 95, items: ["bq_amaranth_hearth_charm"], weakCw: ["NIGHTSHADE_TRAIL"] },
        choices: [
          { t: "Drag the saboteur out to clear Amaranth's good name!", to: 4 }
        ]
      },
      4: {
        zone: "Amaranth's Bakery • Reopening",
        title: "Sweet Justice",
        text: "Purring like a warm kettle, Amaranth the Bakery Drake bakes you a fresh golden cinnamon-tart on the spot while grateful nobles pay your investigator's fee.",
        onEnter: { healHp: 12, msg: "Amaranth's warm dragon-baked pastry restores +12 HP!" },
        choices: [
          { t: "Savor the victory.", to: 5 }
        ]
      },
      5: {
        zone: "Market Square",
        title: "Name Cleared",
        text: "Lines already stretch out Amaranth's bakery door once again.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Defender of the Bakery Drake",
        text: "You cleared Amaranth's name and caught the true poisoner!",
        ending: { type: "true", title: "Champion of the Golden Oven", xp: 170, gold: 155, trophy: "Amaranth's Brass Whisk" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. FOUR-PART HARMONY (6 PAGES • LV 3)
  // ==========================================================
  bk_b17_tob3_four_part: {
    id: "bk_b17_tob3_four_part",
    title: "Four-Part Harmony",
    subtitle: "The Haunted Bardic College & Missing Budanyek",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Worried Street Orphans (Rusty Flagon Tavern)",
    summary: "Brave the eerie, music-haunted ruins of the old bardic college to rescue daring orphan Budanyek from Origami Golems, an Animated Quartet, and the relentless Clockwork Conductor!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Old Bardic College • Echoing Foyer",
        title: "Dissonant Chords",
        safeRetreat: true,
        text: "Plucky orphan Budanyek broke into the abandoned bardic college days ago on a dare—and now spine-chilling violin screeches and brass drumbeats rattle the shuttered windows! Sheet-music folds itself into sharp shapes along the dusty stairs.",
        choices: [
          { t: "Hum a calming counter-melody to lull the college's enchanted sheet-music before entering the hall!", badge: "Persuasion / Arcana DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 2, fail: 2, passMsg: "Your harmony settles the Origami Golems, letting you slip cleanly into the rehearsal wing!", failMsg: "Discordant strings shriek as folded paper-warriors leap off the stands!" }, onPass: { cw: "COUNTER_MELODY" } },
          { t: "March straight into the echoing Recital Hall calling for Budanyek!", to: 2 }
        ]
      },
      2: {
        zone: "Bardic College • Practice Wing",
        title: "Origami Golems & Animated Quartet",
        text: "Razor-edged **Origami Golems** folded from ancient scores whirl around a floating **Animated Quartet** of violins and cellos!",
        enemy: { name: "Animated Quartet & Origami Golems", desc: "Enchanted musical instruments and paper constructs gone haywire.", hp: 34, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["COUNTER_MELODY"] },
        choices: [
          { t: "Burst onto the Grand Stage where Budanyek is trapped behind the Clockwork Conductor!", to: 3 }
        ]
      },
      3: {
        zone: "Bardic College • Grand Stage",
        title: "The Clockwork Conductor",
        text: "Waving twin electrified batons before a terrified Budanyek, the towering **Clockwork Conductor** demands an encore to the death!",
        enemy: { name: "The Clockwork Conductor", desc: "Obsessive mechanical maestro commanding sonic shocks.", hp: 42, ac: 14, atk: 6, dmg: 6, xp: 140, gold: 95, items: ["bq_conductor_ivory_baton"], weakCw: ["COUNTER_MELODY"] },
        choices: [
          { t: "Silence the Conductor and lead Budanyek safely back to his friends!", to: 4 }
        ]
      },
      4: {
        zone: "College Courtyard • Sunset",
        title: "Budanyek Rescued",
        text: "Cheering street orphans swarm Budanyek, and a grateful local bard-master rewards you with gold and an enchanted baton.",
        onEnter: { healHp: 10, msg: "A soothing lullaby mends your cuts (+10 HP)!" },
        choices: [
          { t: "Accept the bard-master's purse.", to: 5 }
        ]
      },
      5: {
        zone: "Cobblestone Lane",
        title: "Final Curtain",
        text: "The old bardic college falls blissfully silent.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Silencer of the Quartet",
        text: "You defeated the Clockwork Conductor and brought Budanyek safely home!",
        ending: { type: "true", title: "Maestro of the Silent Stage", xp: 170, gold: 155, trophy: "Silver Tuning Fork" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. HARVEST FANGS (6 PAGES • LV 3)
  // ==========================================================
  bk_b17_tob3_harvest_fangs: {
    id: "bk_b17_tob3_harvest_fangs",
    title: "Harvest Fangs",
    subtitle: "Sycamore Crossing & The Blood-Soil Cult",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Escaped Traveler from Sycamore Crossing (Rusty Flagon Tavern)",
    summary: "Investigate the starving village of Sycamore Crossing—where desperate farmers fell under a sinister cult demanding human sacrifices to the soil—and uproot the Tripwire Patches and cult leader!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Sycamore Crossing • Withered Fields",
        title: "A Desperate Bargain",
        safeRetreat: true,
        text: "Crops stand black and withered around isolated Sycamore Crossing—except for one eerily lush cornfield ringed with barbed vines! Desperate villagers have fallen under a dark harvest cult abducting passing travelers to feed the soil!",
        choices: [
          { t: "Spot the camouflaged Tripwire Patches hidden along the furrows before stepping into the lush field!", badge: "Perception DC 12", check: { stat: "spirit", skill: "Perception", dc: 12, pass: 2, fail: 2, passMsg: "You sever the thorny root-snares cleanly, catching the cultists off-guard!", failMsg: "Barbed Tripwire Patches snap shut around your ankles as hooded farmers rush in!" }, onPass: { cw: "VINES_CUT" } },
          { t: "Cut straight through the tall stalks toward the midnight bonfire!", to: 2 }
        ]
      },
      2: {
        zone: "Lush Cornfield • Barbed Furrows",
        title: "Tripwire Patches & Cult Reapers",
        text: "Snapping **Tripwire Patches** of living bramble lash across the loam alongside sickle-wielding harvest cultists!",
        enemy: { name: "Harvest Cultists & Tripwire Patches", desc: "Fanatical soil-worshipers and living carnivorous bramble traps.", hp: 34, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["VINES_CUT"] },
        choices: [
          { t: "Charge the blood-soaked Scarecrow Altar where a captive traveler hangs bound!", to: 3 }
        ]
      },
      3: {
        zone: "Cornfield Heart • Scarecrow Altar",
        title: "The Harvest Hierophant",
        text: "Crowned in blackened wheat-stalks, the sinister **Harvest Hierophant** raises a bloodstained scythe over the bound traveler: 'The soil hungers—feed the roots!'",
        enemy: { name: "The Harvest Hierophant", desc: "Devious dark druid enslaving Sycamore Crossing with blood-crop magic.", hp: 42, ac: 14, atk: 6, dmg: 6, xp: 140, gold: 95, items: ["bq_sycamore_golden_sickle"], weakCw: ["VINES_CUT"] },
        choices: [
          { t: "Cut the traveler free and shatter the dark idol poisoning the village soil!", to: 4 }
        ]
      },
      4: {
        zone: "Sycamore Crossing • Village Square",
        title: "Spell Broken",
        text: "Freed from the cultist's dark glamour, the horrified villagers thank you tearfully, and the rescued merchant pays a generous reward.",
        onEnter: { healHp: 10, msg: "Clean well-water and bandages mend your scratches (+10 HP)!" },
        choices: [
          { t: "Depart Sycamore Crossing.", to: 5 }
        ]
      },
      5: {
        zone: "Country Crossroads",
        title: "Clean Earth",
        text: "Honest rain falls over the newly freed fields.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Uprooter of Harvest Fangs",
        text: "You broke the blood-soil cult and saved Sycamore Crossing's captives!",
        ending: { type: "true", title: "Breaker of the Blood Harvest", xp: 170, gold: 155, trophy: "Cleansed Sycamore Bough" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. THE PAVILION OF WHISPERS AND WONDERMENT (6 PAGES • LV 4)
  // ==========================================================
  bk_b17_tob3_pavilion: {
    id: "bk_b17_tob3_pavilion",
    title: "The Pavilion of Whispers and Wonderment",
    subtitle: "The Maestro's Extraplanar Palace of Secrets",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Blackmailed Noble Envoy (Rusty Flagon Tavern)",
    summary: "Step into the whimsical yet deadly extraplanar palace of secret-hoarding fey The Maestro—braving Doppelixirs, Lobe Lemurs, and a Veritigibbet to steal back a ruinous secret!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Extraplanar Pavilion • Silk Entry",
        title: "Palace of Scandal",
        safeRetreat: true,
        text: "Beneath striped silken spires floating in twilight operates **The Maestro**, a flamboyant fey information-hoarder who trades in ruinous scandals! Your patron needs a sealed blackmail scroll recovered from his whimsical, trap-filled Pavilion!",
        choices: [
          { t: "Trade a harmless fabricated gossip-rumor to distract the chattering Lobe Lemurs guarding the gallery!", badge: "Deception / Persuasion DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 2, fail: 2, passMsg: "The Lobe Lemurs scramble to whisper your fake scandal, leaving the side door wide open!", failMsg: "Shrieking lemurs and bubbling Doppelixirs swarm the silk carpet!" }, onPass: { cw: "FAKE_SCANDAL" } },
          { t: "Stride boldly through the mirrored gallery straight toward the Vault of Whispers!", to: 2 }
        ]
      },
      2: {
        zone: "Pavilion Gallery • Hall of Mirrors",
        title: "Doppelixirs & Veritigibbet",
        text: "Living potion-mimic **Doppelixirs** and a swinging, truth-demanding **Veritigibbet** block the archway to The Maestro's stage!",
        enemy: { name: "Doppelixirs & Veritigibbet", desc: "Whimsical yet lethal fey guardians enforcing The Maestro's secrecy.", hp: 40, ac: 14, atk: 6, dmg: 6, xp: 125, gold: 70, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["FAKE_SCANDAL"] },
        choices: [
          { t: "Confront The Maestro himself atop his velvet whisper-stage!", to: 3 }
        ]
      },
      3: {
        zone: "Pavilion Stage • Vault of Whispers",
        title: "The Maestro",
        text: "Flourishing a gilded baton amid floating whisper-orbs, **The Maestro** bows mockingly: 'Every secret has a price—and yours shall be your hide!'",
        enemy: { name: "The Maestro", desc: "Grandiose secret-hoarding fey lord commanding illusions and moppets.", hp: 50, ac: 15, atk: 7, dmg: 7, xp: 175, gold: 120, items: ["bq_maestro_whisper_mask"], weakCw: ["FAKE_SCANDAL"] },
        choices: [
          { t: "Snatch the blackmail scroll from the velvet pedestal and step back through the planar curtain!", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Parlor",
        title: "Secret Reclaimed",
        text: "Your patron burns the recovered scroll in a silver brazier with immense relief, paying out a noble purse of gold.",
        onEnter: { healHp: 10, msg: "Fine vintage cordial restores your vigor (+10 HP)!" },
        choices: [
          { t: "Pocket your fee.", to: 5 }
        ]
      },
      5: {
        zone: "Twilight Road",
        title: "Whispers Quieted",
        text: "The Maestro's striped pavilion drifts away into the mist.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Outwitter of The Maestro",
        text: "You raided the Pavilion of Whispers and Wonderment and reclaimed the stolen secret!",
        ending: { type: "true", title: "Keeper of Buried Whispers", xp: 205, gold: 195, trophy: "Maestro's Gilded Monocle" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. RAINFOREST RECKONING (6 PAGES • LV 4)
  // ==========================================================
  bk_b17_tob3_rainforest: {
    id: "bk_b17_tob3_rainforest",
    title: "Rainforest Reckoning",
    subtitle: "Jungle Village of Bukofa & The Fey Grove",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Bukofa Village Elder (Rusty Flagon Tavern)",
    summary: "Journey from the jungle village of Bukofa into an enraged fey grove—braving Monkey's Bane Vines, Leavesrot Ooze, and a towering Rainforest Ogre to end the deadly jungle reckoning!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Bukofa Jungle Trail • Canopy Edge",
        title: "From Pranks to Bloodshed",
        safeRetreat: true,
        text: "What began as harmless fey pranks against Bukofa's woodcutters has turned lethal—hunters are vanishing beneath the emerald canopy! The village elder begs you to enter the deep fey grove and end the rampage.",
        choices: [
          { t: "Identify the toxic Monkey's Bane Vines and Leavesrot Ooze before wading into the mossy clearing!", badge: "Survival / Herbalism DC 13", check: { stat: "spirit", skill: "Survival", dc: 13, pass: 2, fail: 2, passMsg: "You skirt the venomous vines cleanly and spot the Rainforest Ogre's blind side!", failMsg: "Snapping vines and acidic ooze erupt out of the ferns!" }, onPass: { cw: "CANOPY_SENSE" } },
          { t: "Hack straight through the dense jungle lianas toward the fey grove!", to: 2 }
        ]
      },
      2: {
        zone: "Deep Canopy • Mossy Clearing",
        title: "Leavesrot Ooze & Monkey's Bane Vine",
        text: "Corrosive **Leavesrot Ooze** drips from the boughs as strangling **Monkey's Bane Vines** lash across the trail!",
        enemy: { name: "Leavesrot Ooze & Monkey's Bane Vine", desc: "Lethal jungle flora and decaying forest slime.", hp: 40, ac: 13, atk: 6, dmg: 6, xp: 125, gold: 70, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["CANOPY_SENSE"] },
        choices: [
          { t: "Enter the sun-dappled Fey Grove where the Rainforest Ogre holds sway!", to: 3 }
        ]
      },
      3: {
        zone: "The Fey Grove • Emerald Hollow",
        title: "The Rainforest Ogre",
        text: "Draped in living moss and swinging a massive ironwood club, a ferocious **Rainforest Ogre** roars across the sacred grove!",
        enemy: { name: "Rainforest Ogre", desc: "Moss-cloaked jungle giant driving Bukofa's settlers back.", hp: 50, ac: 14, atk: 7, dmg: 7, xp: 175, gold: 120, items: ["bq_bukofa_jade_totem"], weakCw: ["CANOPY_SENSE"] },
        choices: [
          { t: "Make peace with the grove's gentle Aziza spirits and return to Bukofa!", to: 4 }
        ]
      },
      4: {
        zone: "Village of Bukofa",
        title: "Jungle Harmony",
        text: "Bukofa's elder promises to respect the sacred grove's borders, rewarding you with carved jade and gold.",
        onEnter: { healHp: 10, msg: "Jungle fruit and herbal poultices restore your strength (+10 HP)!" },
        choices: [
          { t: "Bid Bukofa farewell.", to: 5 }
        ]
      },
      5: {
        zone: "Emerald Trail",
        title: "Canopy Calmed",
        text: "Bright birdsong returns to the sunlit treetops.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Peacemaker of Bukofa",
        text: "You toppled the Rainforest Ogre and brought peace to Bukofa's jungle borders!",
        ending: { type: "true", title: "Warden of the Emerald Grove", xp: 205, gold: 195, trophy: "Carved Aziza Leaf-Token" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. SAFE AND SOUND (6 PAGES • LV 4)
  // ==========================================================
  bk_b17_tob3_safe_sound: {
    id: "bk_b17_tob3_safe_sound",
    title: "Safe and Sound",
    subtitle: "Bay's Burrow Trade Route & The Great Catamount",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Bay's Burrow Caravan Master (Rusty Flagon Tavern)",
    summary: "Track a monstrous, fiercely territorial Catamount stalking the major trade route outside Bay's Burrow—outsmarting its mountain-ridge ambushes to make the highway safe once more!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Bay's Burrow • Trade Ridge",
        title: "Claw Marks on the Milestones",
        safeRetreat: true,
        text: "Caravans are backing up outside Bay's Burrow after an unusually huge, ferocious **Catamount** claimed the trade pass as its hunting ground—spooking draft horses and tearing apart supply wagons!",
        choices: [
          { t: "Track the Catamount's deep paw-prints upwind to approach its rocky den from the high ridge!", badge: "Survival DC 13", check: { stat: "spirit", skill: "Survival", dc: 13, pass: 2, fail: 2, passMsg: "Staying downwind, you spoil the giant cat's favorite ambush ledge!", failMsg: "A piercing yowl echoes off the crags as the Catamount stalks you from above!" }, onPass: { cw: "UPWIND_STALK" } },
          { t: "Bait the trade road with salted meat and wait with weapon drawn!", to: 2 }
        ]
      },
      2: {
        zone: "Rocky Pass • Ambush Ledge",
        title: "Ridge Scavengers",
        text: "Bold mountain scavengers drawn by the Catamount's leftover caravan kills pounce from the boulders!",
        enemy: { name: "Pass Stalkers & Cliff Hyenas", desc: "Opportunistic predators feeding along the disrupted highway.", hp: 40, ac: 13, atk: 6, dmg: 6, xp: 125, gold: 70, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["UPWIND_STALK"] },
        choices: [
          { t: "Ascend to the sunlit boulder-den where the Great Catamount snarls!", to: 3 }
        ]
      },
      3: {
        zone: "Catamount Den • High Crag",
        title: "The Great Catamount",
        text: "Muscles rippling beneath tawny fur, the massive **Great Catamount** drops silently from an overhang with a thunderous roar and scythe-like claws!",
        enemy: { name: "The Great Catamount", desc: "Monstrous territorial mountain lion terrorizing Bay's Burrow.", hp: 50, ac: 15, atk: 7, dmg: 7, xp: 175, gold: 120, items: ["bq_catamount_claw_charm"], weakCw: ["UPWIND_STALK"] },
        choices: [
          { t: "Drive the defeated beast out of the pass and signal the waiting caravans!", to: 4 }
        ]
      },
      4: {
        zone: "Bay's Burrow • Coaching Inn",
        title: "Safe and Sound",
        text: "Merchants and drivers raise a joyful toast as the trade route reopens, pooling a generous purse of gold for your trouble.",
        onEnter: { healHp: 10, msg: "A hearty inn meal mends your scratches (+10 HP)!" },
        choices: [
          { t: "Collect your reward.", to: 5 }
        ]
      },
      5: {
        zone: "Trade Highway",
        title: "Clear Pass",
        text: "Wagon wheels rumble safely past Bay's Burrow once again.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Guardian of Bay's Burrow",
        text: "You overcame the Great Catamount and made Bay's Burrow's trade road safe and sound!",
        ending: { type: "true", title: "Hunter of the Great Catamount", xp: 205, gold: 195, trophy: "Tawny Catamount Fang" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 12. LORD GORGO'S KEEP (6 PAGES • LV 5)
  // ==========================================================
  bk_b17_tob3_lord_gorgo: {
    id: "bk_b17_tob3_lord_gorgo",
    title: "Lord Gorgo's Keep",
    subtitle: "Spiteful Keep & The Cunning Artisan Ogre",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Duped Relic Buyer (Rusty Flagon Tavern)",
    summary: "Ascend a lonely peak surrounded by dark woods to Spiteful Keep—home of cunning artisan ogre Lord Gorgo, his Dokkaebi, Daeodon, and Kobold Ettin—to expose his tricked magic wares and claim his genuine forge-hoard!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Lonely Peak • Spiteful Keep Gate",
        title: "A Cunning Ogre's Bargain",
        safeRetreat: true,
        text: "Squatting atop a craggy summit looms Spiteful Keep, workshop of **Lord Gorgo**—an unusually clever ogre artisan famed for crafting wondrous magic items. Yet buyers whisper his wares carry cruel hidden quirks, and his unruly servants guard the mountain path!",
        choices: [
          { t: "Inspect Lord Gorgo's gleaming 'gift' trinkets at the gatehouse to spot their illusory flaws before entering!", badge: "Arcana DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 2, fail: 2, passMsg: "Aha! You expose theDokkebi's trick-runes, stripping Gorgo's surprise advantage!", failMsg: "Snorting giant boars and cackling Dokkaebi charge out of the gatehouse!" }, onPass: { cw: "TRICK_EXPOSED" } },
          { t: "Stride boldly through the iron-bound doors of Spiteful Keep!", to: 2 }
        ]
      },
      2: {
        zone: "Spiteful Keep • Courtyard",
        title: "Daeodon & Kobold Ettin",
        text: "A tusked prehistoric **Daeodon** boar and a bickering two-headed **Kobold Ettin** rush across the flagstones flanked by mischievous Dokkaebi!",
        enemy: { name: "Daeodon & Kobold Ettin", desc: "Ferocious keep-beasts and two-headed draconic servants of Lord Gorgo.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 155, gold: 85, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["TRICK_EXPOSED"] },
        choices: [
          { t: "Kick open the forge-hall doors to confront Lord Gorgo himself!", to: 3 }
        ]
      },
      3: {
        zone: "Spiteful Keep • Artisan's Forge",
        title: "Lord Gorgo, Cunning Artisan Ogre",
        text: "Hefting a blazing runic forging-hammer, the towering **Lord Gorgo** grins with shrewd malice: 'You don't like Gorgo's prices? Then pay in steel!'",
        enemy: { name: "Lord Gorgo, Artisan Ogre", desc: "Cunning, magically armed ogre-smith ruling Spiteful Keep.", hp: 58, ac: 15, atk: 7, dmg: 8, xp: 215, gold: 145, items: ["bq_gorgo_artisan_hammer"], weakCw: ["TRICK_EXPOSED"] },
        choices: [
          { t: "Claim Gorgo's genuine masterwork relics from his locked anvil-chest!", to: 4 }
        ]
      },
      4: {
        zone: "Peak Trail • Sunset",
        title: "Spiteful Keep Conquered",
        text: "With Lord Gorgo bested, the mischievous Dokkaebi scatter into the dark woods and you descend with genuine treasure.",
        onEnter: { healHp: 12, msg: "A real healing potion from Gorgo's private shelf mends your wounds (+12 HP)!" },
        choices: [
          { t: "Return to Oakhaven with the proof.", to: 5 }
        ]
      },
      5: {
        zone: "Dark Wood Edge",
        title: "No More Tricks",
        text: "Buyers across the region breathe easier knowing Gorgo's scams are over.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Conqueror of Spiteful Keep",
        text: "You outmatched cunning Lord Gorgo and claimed the true treasures of Spiteful Keep!",
        ending: { type: "true", title: "Breaker of Spiteful Keep", xp: 250, gold: 240, trophy: "Gorgo's Runic Anvil Stamp" },
        choices: []
      }
    }
  }
});
