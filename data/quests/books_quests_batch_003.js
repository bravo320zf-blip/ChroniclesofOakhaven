/* ============================================================
   BOOK QUESTS — BATCH 003 (12 Quests)
   Source: Book of Lairs - Revised (Kobold Press) — Lairs 1–12
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. THE RIVERFRONT RAT GANG (7 PAGES • LV 1)
  // ==========================================================
  bk_bol_01_rat_gang: {
    id: "bk_bol_01_rat_gang",
    title: "The Riverfront Rat Gang",
    subtitle: "Abandoned Dockyards & Ratfolk Den",
    difficulty: "Easy",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Watch Captain's Quiet Request (Town Square)",
    summary: "Clear the ratfolk gang, wharflings, and doppelrat leader Matimer infesting the rotting riverfront dockyards—and recover the Watch Captain's stolen parade helmet.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Old Dockyards",
        title: "Rotting Upper Walkway",
        safeRetreat: true,
        text: "A slow brown river laps beneath collapsing wooden piers choked with mold and warehouse rubble. Weakened planks groan over gaping holes dropping to the lower dock.",
        choices: [
          { t: "Scan the rotting planks for weak spots before stepping out.", badge: "Perception DC 10", check: { stat: "spirit", skill: "Perception", dc: 10, pass: 2, fail: 2, failDmg: 3, passMsg: "You sidestep the rotted joists cleanly!", failMsg: "A plank snaps—you crash onto the lower walkway (-3 HP)!" } },
          { t: "Vault across the rubble into the Rat-Filled Alley.", to: 2 }
        ]
      },
      2: {
        zone: "Rat-Filled Alley",
        title: "Wharfling Ambush",
        text: "Between two collapsed offices, trash mounds erupt as chittering wharflings and giant dock-rats surge out with rusty shivs!",
        enemy: { name: "Wharflings & Dock Rats", desc: "Scrappy rat-kin scavengers defending their alley.", hp: 16, ac: 10, atk: 3, dmg: 3, xp: 35, gold: 15, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1 },
        choices: [
          { t: "Slip inside the last intact riverside warehouse.", to: 3 }
        ]
      },
      3: {
        zone: "Intact Warehouse",
        title: "Matimer's Hoard",
        text: "Lanterns flicker over heaps of stolen keys, tarnished silverware, and a polished watch parade helmet. Out of the rafters drops Matimer—a cunning doppelrat flanked by ratfolk cutpurses!",
        enemy: { name: "Matimer the Doppelrat", desc: "Sly shape-shifting ratfolk gang boss.", hp: 21, ac: 11, atk: 4, dmg: 4, xp: 55, gold: 40, items: rollRandomLoot(["valuable", "consumable"], 1, "uncommon") },
        choices: [
          { t: "Collect the Watch Captain's parade helmet and the postern gate key.", to: 4, onChoose: { gold: 35, cw: "PARADE_HELM_FOUND", msg: "Recovered the parade helmet and 35 GP in silver trinkets!" } }
        ]
      },
      4: {
        zone: "Lower Pier",
        title: "Guild Whispers",
        text: "Among Matimer's papers lies a thieves' guild target list and a key to the town's postern gate. Returning the watch helmet quietly will win the captain's favor.",
        choices: [
          { t: "Slip quietly back to the town watch barracks.", to: 5 }
        ]
      },
      5: {
        zone: "Town Watch Barracks",
        title: "Discreet Return",
        text: "The Watch Captain exhales in vast relief when you hand over the engraved parade helmet without a word to the gossips.",
        choices: [
          { t: "Accept your bounty and depart.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Docks",
        title: "Quiet Piers",
        text: "With Matimer gone, dockworkers begin clearing the rotted pilings along the riverfront once more.",
        choices: [
          { t: "Conclude the contract.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Bane of the Dockyard Rats",
        text: "The riverfront is rid of Matimer's gang, and your discreet professionalism earns lasting respect from the watch.",
        ending: { type: "true", title: "Dockyard Exterminator", xp: 90, gold: 85, trophy: "Postern Gate Key" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. LOST HALLS OF EVERFORGE (8 PAGES • LV 2)
  // ==========================================================
  bk_bol_02_everforge: {
    id: "bk_bol_02_everforge",
    title: "Lost Halls of Everforge",
    subtitle: "Dwarven Great Forge & Flame Dragon",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Dwarven Smith Polla (Oakhaven Forge)",
    summary: "Enter the ancient dwarven Halls of Everforge, receive the blessing of the Presentation Hall, and stop the young flame dragon Igbalneum from completing a fiery planar ritual.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Hall of Armaments",
        title: "Marble Statues & Kobold Tracks",
        safeRetreat: true,
        text: "Torchlight glints off towering marble carvings of dwarven hammers and shields. Thick dust shows recent bootprints and tiny reptilian tracks leading toward the Great Forge—lined with suspicious pressure plates!",
        choices: [
          { t: "Carefully spot and step around the kobold dart-plates.", badge: "Perception DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, failDmg: 4, passMsg: "You weave safely past four spring-loaded dart plates!", failMsg: "Click! Kobold darts nick your shoulder (-4 HP) and echo down the hall!" } },
          { t: "Duck first into the carved Presentation Hall.", to: 2 }
        ]
      },
      2: {
        zone: "Presentation Hall",
        title: "Blessing of the Ancestors",
        text: "Two stone thrones sit beneath frescoes of dwarven lords presenting radiant steel to honored guests. Sitting respectfully upon the stone seat awakens an ancestral smith's spirit!",
        onEnter: { healHp: 8, cw: "EVERFORGE_BLESSED", msg: "An Everforge ancestor blesses your weapon and restores vigor (+8 HP)!" },
        choices: [
          { t: "Proceed through the Room of Respite toward the Great Forge.", to: 3 }
        ]
      },
      3: {
        zone: "Room of Respite",
        title: "Kobold Patrol",
        text: "Eight fanatical kobold minions scramble from behind crumbled stone benches, shrieking in Draconic to defend their dragon master!",
        enemy: { name: "Everforge Kobold Patrol", desc: "Frenzied kobold servants loyal to Igbalneum.", hp: 22, ac: 11, atk: 4, dmg: 4, xp: 45, gold: 25, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1 },
        choices: [
          { t: "Push open the great double doors into the blazing Great Forge!", to: 4 }
        ]
      },
      4: {
        zone: "The Great Forge",
        title: "Igbalneum & Sage Spencius",
        text: "Under a thirty-foot soot-blackened vault roars an eternal elemental furnace! Before the anvil crouches the flame dragon wyrmling Igbalneum while elderly sage Spencius chants to widen a rift to the Plane of Fire!",
        enemy: { name: "Igbalneum, Flame Wyrmling", desc: "Smoldering flame dragon attempting a planar transformation.", hp: 32, ac: 12, atk: 5, dmg: 5, xp: 80, gold: 55, items: rollRandomLoot(["material", "valuable"], 1, "rare"), weakCw: ["EVERFORGE_BLESSED"] },
        choices: [
          { t: "Halt Spencius's chanting and summon Polla to quench the fire-link!", to: 5 }
        ]
      },
      5: {
        zone: "The Great Forge",
        title: "The Quenching Ritual",
        text: "Dwarven smith Polla hurries in and pours consecrated mountain water over the glowing anvil. With a hiss of silver steam, the rift to the Plane of Fire seals shut!",
        onEnter: { items: ["bq_everforge_adamantine"], msg: "Polla gifts you a suit of Everforge Adamantine Chain!" },
        choices: [
          { t: "Help Polla seal the outer vault doors.", to: 6 }
        ]
      },
      6: {
        zone: "Mountain Pass",
        title: "Gratitude of the Clan",
        text: "Polla vows that the Everforge smithy will sing with honest hammers once more.",
        choices: [
          { t: "Return to Oakhaven with Polla's reward.", to: 7 }
        ]
      },
      7: {
        zone: "Oakhaven Forge",
        title: "Heirloom of Stone",
        text: "Even the local blacksmith marvels at the adamantine links crafted by the ancient Everforge clan.",
        choices: [
          { t: "Complete the quest.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Champion of Everforge",
        text: "By quenching Igbalneum's ritual before the wyrmling grew into a full flame dragon, you saved the valley from fire and earned dwarven renown.",
        ending: { type: "true", title: "Savior of Everforge", xp: 125, gold: 130, trophy: "Everforge Anvil Token" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. DEN OF THE ROTTEN KINGS (8 PAGES • LV 3)
  // ==========================================================
  bk_bol_03_rotten_kings: {
    id: "bk_bol_03_rotten_kings",
    title: "Den of the Rotten Kings",
    subtitle: "Wererat Crime Syndicate & Poisoned Cisterns",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "City Council Emissary (Rusty Flagon Tavern)",
    summary: "Descend fifty feet down a trapped freshwater well into the buried ruins held by King Sketch and his wererat Rotten Kings before they dump narcotic mushroom barrels into the city's water supply.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Freshwater Well",
        title: "The Fifty-Foot Descent",
        safeRetreat: true,
        text: "Beneath a featureless stone pump-house yawns a deep freshwater shaft dropping fifty feet to the buried ruins of the old city. Several stone footholds look suspiciously loose!",
        choices: [
          { t: "Test each handhold carefully as you rappel down the shaft.", badge: "Agility / Perception DC 11", check: { stat: "agility", skill: "Athletics", dc: 11, pass: 2, fail: 2, failDmg: 5, passMsg: "You spot the sabotaged stones and reach the cistern dry and silent!", failMsg: "A rigged stone gives way—you splash hard into the shallow cistern (-5 HP)!" } },
          { t: "Tie off a sturdy rope and slide straight down to the cistern.", to: 2 }
        ]
      },
      2: {
        zone: "Old City Tunnels",
        title: "Rotten Kings Cutthroats",
        text: "Torches spaced thirty feet apart light earthen corridors reeking of damp fungus. Three snarling wererat enforcers block the arched tunnel with silvered daggers!",
        enemy: { name: "Rotten Kings Enforcers", desc: "Sinister wererat gangsters patrolling the cisterns.", hp: 30, ac: 12, atk: 5, dmg: 5, xp: 70, gold: 35, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1 },
        choices: [
          { t: "Follow the purple spore glow to the Mushroom Vat Room.", to: 3 }
        ]
      },
      3: {
        zone: "Mushroom Distillery",
        title: "The Enslaved Apothecary",
        text: "Beside bubbling barrels of purple narcotic extract sits the terrified captive apothecary! 'Hurry—if King Sketch hears fighting, he'll tip those casks into the freshwater channel!'",
        choices: [
          { t: "Roll the poisoned barrels safely away from the cistern sluice first!", badge: "Might DC 11", check: { stat: "might", skill: "Athletics", dc: 11, pass: 4, fail: 4, passMsg: "Secured the casks and freed the apothecary—the water supply is safe!", failMsg: "You shove the barrels back just in time, bruising your ribs!" }, onPass: { cw: "WATER_SAVED", healHp: 8, msg: "Saved the city cistern and received a tonic from the apothecary (+8 HP)!" } },
          { t: "Rush straight into King Sketch's private chamber before he can react!", to: 4 }
        ]
      },
      4: {
        zone: "King Sketch's Chamber",
        title: "Lord of the Underbelly",
        text: "Clutching an oak treasure chest beside a three-foot sewer escape tunnel, the scarred wererat lord King Sketch bares his yellow fangs! 'No guard dog takes Sketch's crown!'",
        enemy: { name: "King Sketch, Wererat Lord", desc: "Cunning crime boss of the Rotten Kings.", hp: 38, ac: 13, atk: 6, dmg: 6, xp: 105, gold: 85, items: ["bq_rotten_king_mask"], weakCw: ["WATER_SAVED"] },
        choices: [
          { t: "Block the eastern escape tunnel and seize Sketch's ivory dice and hoard!", to: 5, onChoose: { gold: 55, msg: "Claimed King Sketch's ivory dice and coin hoard (+55 GP)!" } }
        ]
      },
      5: {
        zone: "Cistern Hall",
        title: "Destroying the Stash",
        text: "With the apothecary's help, you neutralize the remaining mushroom beds so the narcotic can never poison the town again.",
        choices: [
          { t: "Escort the freed apothecary back up the well.", to: 6 }
        ]
      },
      6: {
        zone: "City Square",
        title: "Clean Water",
        text: "The city watch seals the hidden wellhouse while the council quietly pays your full contract fee.",
        choices: [
          { t: "Collect your reward.", to: 7 }
        ]
      },
      7: {
        zone: "Tavern Toast",
        title: "Streets Made Safer",
        text: "Without King Sketch's syndicate, the lower wards breathe easier for the first time in a decade.",
        choices: [
          { t: "Finish the adventure.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Breaker of the Rotten Kings",
        text: "The city's water flows pure and the Rotten Kings' decade-long reign is shattered.",
        ending: { type: "true", title: "Scourge of the Rotten Kings", xp: 145, gold: 135, trophy: "King Sketch's Ivory Dice" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. THE CLOCKWORK TOWER (8 PAGES • LV 3)
  // ==========================================================
  bk_bol_04_clockwork_tower: {
    id: "bk_bol_04_clockwork_tower",
    title: "The Clockwork Tower",
    subtitle: "Haunted Gears & Azza Gremlins",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Townsfolk Rumor (Rusty Flagon Tavern)",
    summary: "Investigate the eerie blue flashes atop clockmaker Jenneline Gyre's sixty-foot Clockwork Tower, dodge its guild guardians, and oust the lightning-wielding azza gremlins tampering with the gears.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Clock Tower Base",
        title: "Frozen Hands",
        safeRetreat: true,
        text: "The sixty-foot wooden clock tower looms silently over town, its hands frozen on the wrong hour while crackling blue sparks flicker behind the grimy upper face. A Clockworkers' Guild warning notice is nailed to the western door.",
        choices: [
          { t: "Spot the hidden service panel between the 6 and 7 on the clock face!", badge: "Perception DC 12", check: { stat: "spirit", skill: "Perception", dc: 12, pass: 3, fail: 2, passMsg: "You climb straight into the upper gear-chamber, bypassing the ground guards!", failMsg: "The grime hides any secret hatches—you head through the western door." } },
          { t: "Enter through the main western doorway.", to: 2 }
        ]
      },
      2: {
        zone: "Pendulum Hall",
        title: "Clockwork Guardians",
        text: "Two brass-plated Clockwork Guardians left behind by the suspicious Clockworkers' Guild whirr to life, raising ticking bronze halberds!",
        enemy: { name: "Guild Clockwork Guardians", desc: "Wind-up brass sentinels patrolling Gyre's tower.", hp: 32, ac: 13, atk: 5, dmg: 6, xp: 80, gold: 35, items: rollRandomLoot(["material", "valuable"], 1, "uncommon"), flee: 1 },
        choices: [
          { t: "Climb the iron catwalks into the massive Gear Chamber.", to: 3 }
        ]
      },
      3: {
        zone: "Gears & Driver",
        title: "Crushing Teeth",
        text: "Enormous interlocking bronze cogs groan back into motion as blue arcs leap between the shafts!",
        choices: [
          { t: "Time the rotation of the main drive-gear and dart across!", badge: "Agility DC 12", check: { stat: "agility", skill: "Acrobatics", dc: 12, pass: 4, fail: 4, failDmg: 5, passMsg: "You leap smoothly onto the belfry stair!", failMsg: "A bronze tooth clips your greave (-5 HP)!" } },
          { t: "Pull the brass emergency brake lever to steady the cogs.", badge: "Arcana / Might DC 11", check: { stat: "arcana", skill: "Arcana", dc: 11, pass: 4, fail: 4, passMsg: "The cogs lock safely—cutting power to the gremlins' trap!", failMsg: "Sparks dance across the lever without slowing the wheels." }, onPass: { cw: "GEARS_LOCKED" } }
        ]
      },
      4: {
        zone: "The Belfry",
        title: "Azza Gremlins of the Spark",
        text: "Perched among disconnected solid-bronze bells, three crackling blue-skinned Azza Gremlins cackle around a jury-rigged lightning projector! 'More toys for the gears!' they hiss, firing jolts of thunder!",
        enemy: { name: "Azza Lightning Gremlins", desc: "Mischievous electrical fey powering a rogue storm device.", hp: 36, ac: 13, atk: 6, dmg: 6, xp: 100, gold: 60, items: ["bq_clockwork_chime"], weakCw: ["GEARS_LOCKED"] },
        choices: [
          { t: "Reconnect the bronze bells and restore Jenneline Gyre's monument!", to: 5 }
        ]
      },
      5: {
        zone: "The Belfry",
        title: "Noon Chimes Again",
        text: "As the last brass linkage clicks home, the great bronze bells boom cleanly across the rooftops—not a vengeful ghost after all, just Gyre's masterwork singing once more!",
        choices: [
          { t: "Inspect Gyre's hidden blueprints before descending.", to: 6 }
        ]
      },
      6: {
        zone: "Clockmaker's Desk",
        title: "Secrets of the Spark",
        text: "Her marginal notes hint the tower was designed to harvest harmless stormlight over decades—a secret the townsfolk cheer to see kept safe.",
        choices: [
          { t: "Step outside to greet the relieved crowd.", to: 7 }
        ]
      },
      7: {
        zone: "Town Square",
        title: "Gratitude of the Townsfolk",
        text: "Delighted that their beloved clock tower is no longer 'haunted,' local merchants pool a generous purse.",
        choices: [
          { t: "Collect your reward!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Keeper of the Clockwork Tower",
        text: "Every hour on the hour, the bronze chimes ring out across town in tribute to your triumph over the azza gremlins.",
        ending: { type: "true", title: "Restorer of Gyre's Clock", xp: 140, gold: 140, trophy: "Golden Escapement Gear" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. DOOM CROAKER'S BRANCHES (8 PAGES • LV 4)
  // ==========================================================
  bk_bol_05_doom_croaker: {
    id: "bk_bol_05_doom_croaker",
    title: "Doom Croaker's Branches",
    subtitle: "Yggdrasil Portal & Icy Lindwurm",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Grutilda the Ratatosk Seer (Oakhaven Outskirts)",
    summary: "Step through a shimmering Yggdrasil portal with chittering ratatosk squirrel-folk, climb the frozen World Tree boughs, rescue the captive ravenfolk Doom Croaker, and slay the vicious icy Lindwurm.",
    totalPages: 8,
    pages: {
      1: {
        zone: "World Tree Portal",
        title: "Grutilda the Great Seer",
        safeRetreat: true,
        text: "A hooded band of chittering squirrel-folk—ratatosk led by self-proclaimed seer Grutilda—beckons you through a swirling green bark-portal onto a colossal frost-rimed branch of Yggdrasil, the World Tree!",
        choices: [
          { t: "Question Grutilda closely about her 'prophecy' of the ice wyrm.", badge: "Spirit / Perception DC 12", check: { stat: "spirit", skill: "Perception", dc: 12, pass: 2, fail: 2, passMsg: "She confesses the lindwurm drove them from their home—and offers a secret shortcut!", failMsg: "Grutilda insists grandly that fate demands your sword!" }, onPass: { cw: "RATATOSK_SHORTCUT", msg: "Learned the ratatosk bark-tunnel shortcut!" } },
          { t: "Stride boldly along the mossy cosmic branch.", to: 2 }
        ]
      },
      2: {
        zone: "Frosted Boughs",
        title: "Coerced Ravenfolk Scouts",
        text: "Black-feathered ravenfolk sentries swoop down from icy needles! 'Forgive us,' one squawks—'the ice wyrm holds our Doom Croaker hostage!'",
        enemy: { name: "Press-Ganged Ravenfolk", desc: "Reluctant ravenfolk warriors forced to serve the lindwurm.", hp: 34, ac: 13, atk: 5, dmg: 6, xp: 85, gold: 35, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Promise to free their Doom Croaker and climb into the Worm Tunnels.", to: 3 }
        ]
      },
      3: {
        zone: "The Worm Tunnels",
        title: "Bored Into the Bark",
        text: "Narrow gnawed passages riddle the massive branch—too tight for a giant wyrm to squeeze through, offering tactical cover against its freezing breath!",
        choices: [
          { t: "Use the ratatosk side-tunnels to flank the lindwurm's nest!", reqCw: "RATATOSK_SHORTCUT", badge: "RATATOSK_SHORTCUT", to: 4, onChoose: { cw: "WYRM_FLANKED", healHp: 10, msg: "Flanked the nest safely and rested briefly (+10 HP)!" } },
          { t: "Advance directly into the frost-crusted central hollow.", to: 4 }
        ]
      },
      4: {
        zone: "Lindwurm's Hollow",
        title: "The Dread Ice Wyrm",
        text: "Coiled around a hoard of quartz crystals and a cage holding the ravenfolk Doom Croaker, a serpentine, frost-scaled Lindwurm rears up with a bone-chilling roar!",
        enemy: { name: "Yggdrasil Ice Lindwurm", desc: "Wingless frost-breathing drake conquering the World Tree boughs.", hp: 48, ac: 14, atk: 7, dmg: 8, xp: 150, gold: 100, items: ["bq_lindwurm_amulet"], weakCw: ["WYRM_FLANKED"] },
        choices: [
          { t: "Unlock the cage and free the ravenfolk Doom Croaker!", to: 5 }
        ]
      },
      5: {
        zone: "Lindwurm's Hollow",
        title: "Prophecy of the Doom Croaker",
        text: "Grateful for her life, the wise ravenfolk seer blesses you with a true glimpse of fortune, while Grutilda's ratatosk cheer wildly as they reclaim their ancestral branch!",
        onEnter: { healHp: 12, gold: 50, msg: "Received the Doom Croaker's blessing (+12 HP) and 50 GP in quartz gems!" },
        choices: [
          { t: "Accept the ratatosk's pledge as guides along the World Tree's portals.", to: 6 }
        ]
      },
      6: {
        zone: "Portal Root",
        title: "Return to the Mortal Woods",
        text: "Grutilda brews a fragrant acorn elixir and escorts you back through the glowing bark-archway.",
        choices: [
          { t: "Step back onto solid frontier soil.", to: 7 }
        ]
      },
      7: {
        zone: "Forest Clearing",
        title: "Allies Beyond the Worlds",
        text: "The bark-portal seals behind you, yet you know the squirrel-folk of Yggdrasil will always answer your call.",
        choices: [
          { t: "Return to Oakhaven.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Friend of the World Tree",
        text: "Both ratatosk and ravenfolk sing your praise across the cosmic branches of Yggdrasil.",
        ending: { type: "true", title: "Slayer of the Frost Lindwurm", xp: 180, gold: 165, trophy: "Frost-Quartz of Yggdrasil" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. CASTLE OF SAND (8 PAGES • LV 4)
  // ==========================================================
  bk_bol_06_castle_sand: {
    id: "bk_bol_06_castle_sand",
    title: "Castle of Sand",
    subtitle: "Imsim the Dau & The Illusory Oasis",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Sun-Baked Desert Travelers (Oakhaven Market)",
    summary: "Stumble upon a shimmering desert oasis woven entirely from mirage arcane by Imsim the trickster dau, navigate his strict rules of etiquette, and survive his feud with the captive mirager Naydleh.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Searing Dunes",
        title: "Oasis on the Horizon",
        safeRetreat: true,
        text: "Parched beneath a merciless desert sun, you crest a golden dune and behold a lush, palm-shaded pavilion beside sparkling turquoise water! Birds circle overhead—yet something about the stillness feels too perfect.",
        choices: [
          { t: "Study the shimmering ripples for signs of illusion magic.", badge: "Arcana / Perception DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 2, fail: 2, passMsg: "Mirage arcane! Every palm and marble arch is woven from pure illusion!", failMsg: "The cool breeze and sweet date-scent feel completely real." }, onPass: { cw: "MIRAGE_SEEN", msg: "Pierced the secret of Imsim's Mirage!" } },
          { t: "Approach the shaded pavilion with polite desert greetings.", to: 2 }
        ]
      },
      2: {
        zone: "Illusory Pavilion",
        title: "Host of the Sands",
        text: "A grinning, amber-eyed desert fey—Imsim the dau—welcomes you with chilled figs and warns playfully: 'Enjoy my shade, mortals, but never meddle with the veiled fountain behind the courtyard!'",
        choices: [
          { t: "Investigate the veiled fountain anyway—you hear a trapped voice whispering!", to: 3 },
          { t: "Honor Imsim's hospitality and play a game of riddles with the dau.", badge: "Spirit / Lore DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 3, fail: 3, passMsg: "Delighted by your wit, Imsim lets slip that his rival Naydleh is bound beneath the fountain!", failMsg: "Imsim chuckles slyly and vanishes in a swirl of cinnamon dust." }, onPass: { cw: "IMSIM_PLEASED" } }
        ]
      },
      3: {
        zone: "Veiled Courtyard",
        title: "Naydleh the Captive Mirager",
        text: "Beside the dry gravel pit disguised as a turquoise pool, shimmering heat-fiends—Naydleh the mirager's sand-wraiths—lunge out trying to shatter Imsim's prison and devour passing mortals!",
        enemy: { name: "Naydleh's Sand-Miragers", desc: "Treacherous desert illusion-fiends hungry for travelers' moisture.", hp: 40, ac: 13, atk: 6, dmg: 7, xp: 105, gold: 50, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Confront Imsim at his barred private den as the illusion flickers!", to: 4 }
        ]
      },
      4: {
        zone: "Imsim's Den",
        title: "Truth Beneath the Sand",
        text: "With a snap of his fingers, Imsim drops the mirage—revealing crumbling sandstone walls, a tiny exquisite rug, a hookah, and rare philosophy volumes! Testing whether you are friend or plunderer, Imsim conjures living sand-blades!",
        enemy: { name: "Imsim the Trickster Dau", desc: "Clever desert fey master of mirage arcane.", hp: 44, ac: 14, atk: 7, dmg: 7, xp: 135, gold: 80, items: ["bq_imsim_mirage_ring"], weakCw: ["MIRAGE_SEEN", "IMSIM_PLEASED"] },
        choices: [
          { t: "Accept Imsim's laughing truce and trade stories over real dates and water.", to: 5 }
        ]
      },
      5: {
        zone: "Imsim's Den",
        title: "A Trickster's Respect",
        text: "'Splendid sport!' Imsim grins, handing you rare historical volumes and pointing out the true well hidden beneath his rug.",
        onEnter: { healHp: 12, gold: 65, msg: "Rested at the true well (+12 HP) and claimed 65 GP in rare desert tomes!" },
        choices: [
          { t: "Follow Imsim's safe dune-markers back toward the caravan road.", to: 6 }
        ]
      },
      6: {
        zone: "Crescent Road",
        title: "Fading Mirage",
        text: "Looking back once from the ridge, the lush oasis is already gone—replaced by unbroken golden dunes.",
        choices: [
          { t: "Return to Oakhaven with a tale no one will quite believe.", to: 7 }
        ]
      },
      7: {
        zone: "Oakhaven Market",
        title: "Rare Volumes Sold",
        text: "Local scholars eagerly copy your notes from Imsim's desert library.",
        choices: [
          { t: "Finish the adventure.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Master of the Mirage",
        text: "Few mortals outwit a dau in his own desert palace and walk away wealthier for it.",
        ending: { type: "true", title: "Outwitter of the Castle of Sand", xp: 175, gold: 165, trophy: "Imsim's Sand-Glass" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. THE PIRATES' COVE (8 PAGES • LV 5)
  // ==========================================================
  bk_bol_07_pirates_cove: {
    id: "bk_bol_07_pirates_cove",
    title: "The Pirates' Cove",
    subtitle: "Captain Jarzon & The Cult of Shar-Ngolyeth",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Captain Jenny Harken (Oakhaven Docks)",
    summary: "Sail with Captain Jenny Harken to the jungle-fringed sea-cave hideout of the pirate ship Inheritor, rescue first mate Red Bertram, and stop Captain Jarzon's dark sacrifices to Shar-Ngolyeth.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Jungle Cave Maw",
        title: "The Inheritor's Hideout",
        safeRetreat: true,
        text: "Captain Jenny Harken's longboat drops you at a rocky jungle shore where the pirate ship Inheritor hides inside a yawning sea-cave. Flickering firelight and drunken shanties spill from the cavern mouth!",
        choices: [
          { t: "Creep along the wet ledge to catch the lookout cultists off-guard.", badge: "Stealth DC 12", check: { stat: "agility", skill: "Stealth", dc: 12, pass: 2, fail: 2, passMsg: "You slip right up behind the singing pirate-acolytes!", failMsg: "A loose shell crunches—the pirates spin with drawn cutlasses!" }, onPass: { cw: "COVE_SURPRISE" } },
          { t: "Storm straight into the cave entrance!", to: 2 }
        ]
      },
      2: {
        zone: "Cave Entrance",
        title: "Jarzon's Cultist Crew",
        text: "Seven of Captain Jarzon's most fanatical pirates—four of them newly initiated acolytes of Shar-Ngolyeth—leap up from the campfire!",
        enemy: { name: "Inheritor Pirate Acolytes", desc: "Sea-cultist buccaneers devoted to That Which Lurks Beneath the Tide.", hp: 42, ac: 13, atk: 6, dmg: 7, xp: 105, gold: 50, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["COVE_SURPRISE"] },
        choices: [
          { t: "Follow the prisoner cages deeper into the tidal grotto.", to: 3 }
        ]
      },
      3: {
        zone: "Tidal Holding Pens",
        title: "Rescuing Red Bertram",
        text: "Knee-deep in rising seawater, Jenny's first mate Red Bertram and five captured sailors rattle iron bars! 'Hurry—Jarzon's chanting on the Inheritor's deck to raise an island beneath the waves!'",
        onEnter: { cw: "BERTRAM_SAVED", healHp: 10, msg: "Freed Red Bertram and the crew! Bertram patches your wounds (+10 HP)." },
        choices: [
          { t: "Board the anchored pirate ship Inheritor and confront Captain Jarzon!", to: 4 }
        ]
      },
      4: {
        zone: "Deck of the Inheritor",
        title: "Captain Jarzon's Blood-Tide",
        text: "Draped in barnacle-crusted sea-silk atop the quarterdeck, Captain Jarzon raises a glowing obsidian idol! 'Shar-Ngolyeth rises! Your blood will crown the waves!'",
        enemy: { name: "Captain Jarzon of the Inheritor", desc: "Fanatical pirate-priest channeling abyssal tide-magic.", hp: 56, ac: 15, atk: 7, dmg: 8, xp: 170, gold: 120, items: ["bq_inheritor_cutlass"], weakCw: ["BERTRAM_SAVED"] },
        choices: [
          { t: "Plunder the Inheritor's hold before sailing out of the cove!", to: 5, onChoose: { gold: 90, msg: "Looted 90 GP and coastal gems from the Inheritor's hold!" } }
        ]
      },
      5: {
        zone: "Open Sea",
        title: "Reunion Aboard the Second Best",
        text: "Captain Jenny Harken embraces Red Bertram with tears of joy and counts out your full purse—yet a distant rumble beneath the waves hints Jarzon's ritual may already have awakened something deep below...",
        choices: [
          { t: "Sail safely back to harbor.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Harbor",
        title: "Whispers of a Rising Island",
        text: "Sailors whisper of strange fog gathering far out in the shipping lanes—perhaps a omen of the Temple of the Deep Ones.",
        choices: [
          { t: "Accept Jenny Harken's favor and reward.", to: 7 }
        ]
      },
      7: {
        zone: "Harbor Tavern",
        title: "Toast to the Rescuers",
        text: "Free ale flows all night as the rescued crew celebrates their deliverance.",
        choices: [
          { t: "Complete the adventure.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Scourge of the Inheritor",
        text: "Red Bertram and his crew are home safe, and the shipping lanes are free of the Inheritor's terror.",
        ending: { type: "true", title: "Raider of the Pirates' Cove", xp: 210, gold: 200, trophy: "Captain Jarzon's Compass" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. ALL-SEEING EYE (8 PAGES • LV 5)
  // ==========================================================
  bk_bol_08_all_seeing_eye: {
    id: "bk_bol_08_all_seeing_eye",
    title: "All-Seeing Eye",
    subtitle: "Wandering Temple of Goddess Sanvi",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Town Elders (Temple of the Dawn)",
    summary: "Enter the mysterious stone temple of Sanvi that materialized in a flash of blue light outside town, brave its night scorpions and oculo swarms, and earn an audience with caretaker Nimon Velk to heal the blinded townsfolk.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Roadside Grove",
        title: "The Materialized Shrine",
        safeRetreat: true,
        text: "A pitted stone shrine covered in faded carved eyes appeared overnight in a flash of blue lightning. Two curious townsfolk returned blinded—raving of huge insects and hundreds of floating eyes! Two pairs of glass discs gleam on the locked stone door.",
        choices: [
          { t: "Peer steadily into the glass discs to pass Sanvi's threshold test.", badge: "Spirit DC 12", check: { stat: "spirit", skill: "Perception", dc: 12, pass: 2, fail: 2, failDmg: 5, passMsg: "Blue light scans your resolve—the stone portal glides open!", failMsg: "Blinding flash sears your eyes (-5 HP) before the door unlocks!" }, onPass: { cw: "SANVI_WORTHY" } },
          { t: "Pry the ancient stone latch open with steel.", to: 2 }
        ]
      },
      2: {
        zone: "Outer Cloister",
        title: "Night Scorpions",
        text: "Shadowy carapace clicks across the mosaic floor as venomous Night Scorpions—the very beasts that poisoned the townsfolk—scuttle out from behind carved eye-pillars!",
        enemy: { name: "Temple Night Scorpions", desc: "Venomous subterranean arachnids guarding Sanvi's halls.", hp: 44, ac: 14, atk: 7, dmg: 7, xp: 115, gold: 45, items: rollRandomLoot(["material", "consumable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Press deeper into the Hall of Unblinking Vision.", to: 3 }
        ]
      },
      3: {
        zone: "Hall of Unblinking Vision",
        title: "The Oculo Swarm",
        text: "Hundreds of disembodied, blinking eyeballs drift down from the domed ceiling in a chattering, hypnotic cloud—an Oculo Swarm!",
        enemy: { name: "Sanvi's Oculo Swarm", desc: "Unsettling storm of floating, darting mystic eyes.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 125, gold: 55, items: rollRandomLoot(["valuable", "consumable"], 1, "rare"), flee: 2 },
        choices: [
          { t: "Step through the curtain of starlight into the Inner Sanctum.", to: 4 }
        ]
      },
      4: {
        zone: "Inner Sanctum",
        title: "Caretaker Nimon Velk",
        text: "Within the serene domed sanctum waits Nimon Velk, last mortal caretaker of Sanvi, goddess of destiny and vision. 'You have endured the trials,' he says softly. 'Ask one truth of the goddess—or ask her mercy for the blinded townsfolk.'",
        onEnter: { items: ["bq_sanvi_lens"], msg: "Received Sanvi's Destiny Lens!" },
        choices: [
          { t: "Ask Sanvi to restore the sight of the two blinded townsfolk!", to: 5, onChoose: { cw: "SIGHT_RESTORED", healHp: 14, msg: "Golden light washes over you (+14 HP)—the townsfolk's vision is restored!" } },
          { t: "Demand a prophecy of hidden treasure for yourself instead.", to: 5, onChoose: { gold: 95, msg: "A vision reveals a buried pouch of 95 GP beneath the grove!" } }
        ]
      },
      5: {
        zone: "Empty Grove",
        title: "The Temple Vanishes",
        text: "With a soft chime of blue light, the stone walls dissolve around you—leaving you standing alone in a quiet meadow with a whispered hint of where Sanvi's shrine will appear next.",
        choices: [
          { t: "Return to town to report the miracle.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Square",
        title: "Gratitude of the Healed",
        text: "The town elders weep with joy as the blinded victims open clear eyes once more and gladly pay the full civic reward.",
        choices: [
          { t: "Accept the town's honors.", to: 7 }
        ]
      },
      7: {
        zone: "Temple of the Dawn",
        title: "A Patient Goddess",
        text: "In your pocket, Sanvi's Destiny Lens pulses gently—the forgotten goddess has marked you as her champion.",
        choices: [
          { t: "Conclude the adventure.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Witness of the All-Seeing Eye",
        text: "You survived the wandering shrine of Sanvi and returned sight to the afflicted.",
        ending: { type: "true", title: "Chosen of the All-Seeing Eye", xp: 215, gold: 210, trophy: "Sapphire Eye of Sanvi" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. THE ALCHEMISTS' GUILDHALL (8 PAGES • LV 6)
  // ==========================================================
  bk_bol_09_alchemists_guild: {
    id: "bk_bol_09_alchemists_guild",
    title: "The Alchemists' Guildhall",
    subtitle: "Stilted Lake Hall & Zaeriez the Rusalka",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Seamstress's Worried Family (Oakhaven Market)",
    summary: "Investigate why curative potions brewed by alchemist Vernor Avilleton are leaving townsfolk listless and enthralled, infiltrate the lakeside Alchemists' Guildhall, and defeat Zaeriez the rusalka and her lake troll.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Guildhall Guardhouse",
        title: "Nervous Veterans",
        safeRetreat: true,
        text: "Half built of fine stone on shore and half perched on wooden stilts sixty feet out over a clear lake, the Alchemists' Guildhall stands shuttered. Hired guards Kewliza and Arleth admit the alchemists have been acting eerily strange lately.",
        choices: [
          { t: "Convince Kewliza and Arleth to let you inspect the tainted potions inside.", badge: "Persuasion DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 2, fail: 2, passMsg: "Relieved someone is looking into it, the veterans unlock the side gate!", failMsg: "You slip past the guardhouse along the lakeside pilings instead." }, onPass: { cw: "GUARD_TRUST" } },
          { t: "Swim quietly beneath the wooden stilts into the lakeside vat-room.", to: 2 }
        ]
      },
      2: {
        zone: "Shoreline Laboratory",
        title: "Enthralled Alchemists",
        text: "Blank-eyed alchemists—including Vernor Avilleton—mechanically drip pale green lake-nectar into healing vials! Blocking the bridge to the stilted lake pavilion lumbers a dripping, moss-covered Lake Troll!",
        enemy: { name: "Zaeriez's Lake Troll", desc: "Regenerating aquatic troll serving as the rusalka's bodyguard.", hp: 54, ac: 14, atk: 8, dmg: 8, xp: 150, gold: 65, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Cross the timber bridge into the Lakeside Vat Chamber!", to: 3 }
        ]
      },
      3: {
        zone: "Lakeside Vat Chamber",
        title: "Neutralizing the Taint",
        text: "Open vats pull water directly from the deep lake below, ringed with sandboxes meant to smother volatile alchemical fires.",
        choices: [
          { t: "Dump neutralizing salts into the main potion vat to disrupt Zaeriez's charm!", badge: "Arcana / Survival DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 4, fail: 4, passMsg: "The green shimmer dies—weakening Zaeriez's siren magic!", failMsg: "The vat foams violently, alerting the lake fey below!" }, onPass: { cw: "VAT_CLEANSED" } },
          { t: "Ready your weapon at the rim of the central water-well!", to: 4 }
        ]
      },
      4: {
        zone: "Lakeside Vat Chamber",
        title: "Zaeriez the Rusalka",
        text: "Rising gracefully from the central water-vat with streaming emerald hair and a gleaming strand of lake pearls, the wicked rusalka Zaeriez sings a haunting melody as lashing tendrils of water whip across the floor!",
        enemy: { name: "Zaeriez, Lake Rusalka", desc: "Conniving water-fey corrupting the city's potions.", hp: 62, ac: 15, atk: 8, dmg: 9, xp: 195, gold: 130, items: ["bq_rusalka_pearls"], weakCw: ["VAT_CLEANSED", "GUARD_TRUST"] },
        choices: [
          { t: "Watch the trance lift from Vernor Avilleton and the surviving alchemists!", to: 5 }
        ]
      },
      5: {
        zone: "Alchemists' Hall",
        title: "Awakening From the Spell",
        text: "Blinking in horror at the tainted vats, Master Vernor quickly brews a restorative counter-draught for the sick seamstress and heals your wounds on the spot!",
        onEnter: { healHp: 15, msg: "Master Vernor restores your health (+15 HP) and brews the seamstress's cure!" },
        choices: [
          { t: "Deliver the antidote to the seamstress's family.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Market",
        title: "Gratitude & Alchemy",
        text: "The seamstress recovers before sundown, and the Alchemists' Guild pays your bounty with a promise of rare future brews.",
        choices: [
          { t: "Accept the guild's reward.", to: 7 }
        ]
      },
      7: {
        zone: "Lakeside Pier",
        title: "Clear Waters",
        text: "Kewliza and Arleth salute as fresh banners rise over the cleansed guildhall.",
        choices: [
          { t: "Complete the adventure.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Savior of the Alchemists' Guild",
        text: "You broke Zaeriez's sinister scheme before the entire town fell under her enchanted potions.",
        ending: { type: "true", title: "Breaker of the Rusalka's Charm", xp: 240, gold: 225, trophy: "Alchemists' Silver Alembic" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. THE HIVE (8 PAGES • LV 6)
  // ==========================================================
  bk_bol_10_the_hive: {
    id: "bk_bol_10_the_hive",
    title: "The Hive",
    subtitle: "Forsaken Hills Termite Mound & Arbeyach Cult",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Townsfolk Searching for Devin Graysmith (Town Square)",
    summary: "Track the abducted blacksmith Devin Graysmith into the flesh-eating termite mounds of the Forsaken Hills and stop three Spawn of Arbeyach from summoning the demonic herald Ia'Affrat.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Forsaken Hills",
        title: "Mounds of Bone",
        safeRetreat: true,
        text: "Sun-bleached bones surround a towering clay termite mound humming with a sickening buzz. Somewhere beneath its hardened chimney, blacksmith Devin Graysmith is bound as the final sacrifice!",
        choices: [
          { t: "Locate the narrow side-tunnel that sees little daytime termite traffic.", badge: "Perception / Survival DC 12", check: { stat: "spirit", skill: "Perception", dc: 12, pass: 2, fail: 2, failDmg: 6, passMsg: "You slip into the quiet service tunnel undetected!", failMsg: "Soldier termites ambush you at the chimney rim (-6 HP)!" }, onPass: { cw: "HIVE_STEALTH" } },
          { t: "Hack straight into the fortified clay entrance.", to: 2 }
        ]
      },
      2: {
        zone: "Termite Tunnels",
        title: "Flesh-Eating Swarm",
        text: "Cramped clay passages erupt with chittering Giant Termites and crawling swarms hungry for living meat!",
        enemy: { name: "Carnivorous Termite Swarm", desc: "Voracious giant insects defending the mound.", hp: 50, ac: 14, atk: 7, dmg: 8, xp: 140, gold: 45, items: rollRandomLoot(["material", "consumable"], 1, "rare"), flee: 1, weakCw: ["HIVE_STEALTH"] },
        choices: [
          { t: "Follow the crimson demonic chanting deeper beneath the mound.", to: 3 }
        ]
      },
      3: {
        zone: "Sacrificial Cavern",
        title: "Devin Graysmith in Chains",
        text: "Beneath a swirling rift at the base of the clay chimney lies blacksmith Devin Graysmith! Three chitinous, insectoid Spawn of Arbeyach chant over a blood circle to summon the demonic herald Ia'Affrat!",
        enemy: { name: "Three Spawn of Arbeyach", desc: "Demonic vermin-fiends completing a catastrophic summoning.", hp: 64, ac: 15, atk: 8, dmg: 9, xp: 205, gold: 135, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Kick apart the blood circle and cut Devin Graysmith free!", to: 4 }
        ]
      },
      4: {
        zone: "Sacrificial Cavern",
        title: "Portal Goes Dormant",
        text: "The buzzing rift snaps shut just as monstrous mandibles begin to push through! Devin gasps in gratitude as you haul him out through the clay tunnels.",
        onEnter: { healHp: 12, msg: "Saved Devin Graysmith and escaped the collapsing mound (+12 HP)!" },
        choices: [
          { t: "Collapse the mound's outer chimney behind you.", to: 5 }
        ]
      },
      5: {
        zone: "Forsaken Hills",
        title: "Fresh Air",
        text: "The remaining termites scatter into the scrubland without the fiends' vermin empathy binding them.",
        choices: [
          { t: "Escort Devin back to town.", to: 6 }
        ]
      },
      6: {
        zone: "Town Forge",
        title: "Honorary Citizen",
        text: "Cheers erupt down the main street as Devin embraces his family—the townsfolk proclaim you an honorary citizen and present a rich purse!",
        choices: [
          { t: "Accept their gratitude and gold.", to: 7 }
        ]
      },
      7: {
        zone: "Town Square",
        title: "A Dormant Warning",
        text: "You note the mound's location for future mages, glad that Ia'Affrat never set foot in the mortal realm.",
        choices: [
          { t: "Complete the adventure.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Bane of the Hive",
        text: "By halting the Spawn of Arbeyach at the final hour, you spared the entire frontier from a demonic locust plague.",
        ending: { type: "true", title: "Crusher of the Hive", xp: 245, gold: 240, trophy: "Amber Termite-Queen Signet" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. TEMPLE OF THE DEEP ONES (8 PAGES • LV 7)
  // ==========================================================
  bk_bol_11_deep_ones: {
    id: "bk_bol_11_deep_ones",
    title: "Temple of the Deep Ones",
    subtitle: "Sunken Island of Shar-Ngolyeth",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Merchant Representative Ricard Baron (Oakhaven Market)",
    summary: "Row through churning fog to the newly risen black-stone island disrupting coastal trade, battle deep ones and their coral drake, and shatter the animated idol of Shar-Ngolyeth before a kraken consumes the sea lanes.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Rocky Shoals",
        title: "Assault on the Rowboat",
        safeRetreat: true,
        text: "Hired by merchant envoy Ricard Baron, you row through choking sea-fog toward a barnacle-clad obsidian island that rose overnight. Suddenly, four amphibian Deep Ones and a circling Coral Drake erupt from the surf!",
        enemy: { name: "Deep Ones & Coral Drake", desc: "Fish-eyed sea cultists and their tamed reef-drake.", hp: 58, ac: 15, atk: 8, dmg: 9, xp: 170, gold: 75, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Haul your rowboat onto the black basalt beach and climb toward the Temple Maw.", to: 2 }
        ]
      },
      2: {
        zone: "Basalt Causeway",
        title: "Shadow of the Kraken",
        text: "Enormous tentacles briefly coil beneath the whitewater—an aspect of Shar-Ngolyeth waiting to be fully freed! Hurrying inside the carved sea-temple is your only hope of severing its link.",
        choices: [
          { t: "Study the drowned murals for the idol's weak rune.", badge: "Arcana / Lore DC 14", check: { stat: "arcana", skill: "Lore", dc: 14, pass: 3, fail: 3, passMsg: "Destroying the altar's Idolic Deity will banish both Shar-Ngolyeth's aspect and its servants!", failMsg: "The alien glyphs make your head throb." }, onPass: { cw: "IDOL_SECRET" } },
          { t: "Press straight into the Flooded Nave.", to: 3 }
        ]
      },
      3: {
        zone: "Flooded Nave",
        title: "Tide-Priests of the Abyss",
        text: "Waist-deep freezing brine fills the pillared nave where elite Deep One Hybrid Priests chant in bubbling voices!",
        enemy: { name: "Deep One Abyssal Priests", desc: "Hulking amphibious priests channeling freezing surf.", hp: 62, ac: 15, atk: 8, dmg: 9, xp: 185, gold: 90, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 2 },
        choices: [
          { t: "Climb the slick altar steps into the Inner Maw!", to: 4 }
        ]
      },
      4: {
        zone: "The Inner Maw",
        title: "Idol of Shar-Ngolyeth",
        text: "Before a pulsating stone Idolic Deity stands the spectral, tide-bound form of Captain Jarzon! 'The oceans shall swallow the dry world!' the living idol booms as both phantom pirate and animated stone deity lunge!",
        enemy: { name: "Idolic Deity of Shar-Ngolyeth", desc: "Living stone avatar of That Which Lurks Beneath the Waves.", hp: 74, ac: 16, atk: 9, dmg: 11, xp: 255, gold: 175, items: ["bq_deep_ones_trident"], weakCw: ["IDOL_SECRET"] },
        choices: [
          { t: "Cleave the cracked obsidian idol in two!", to: 5 }
        ]
      },
      5: {
        zone: "Black Basalt Shore",
        title: "The Fog Clears",
        text: "As the idol shatters, Jarzon unravels into grey mist and the distant kraken-aspect withers beneath the waves! Blue sky breaks over the shipping lanes once more.",
        choices: [
          { t: "Row out to meet the waiting merchant brig.", to: 6 }
        ]
      },
      6: {
        zone: "Merchant Brig",
        title: "Trade Restored",
        text: "Ricard Baron greets you with cheers and hands over the second half of the trade consortium's gold.",
        choices: [
          { t: "Sail back to Oakhaven.", to: 7 }
        ]
      },
      7: {
        zone: "Oakhaven Market",
        title: "Hero of the Sea Lanes",
        text: "Captains up and down the coast raise their tankards to the breaker of the sunken temple.",
        choices: [
          { t: "Conclude the adventure.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Slayer of the Deep Idol",
        text: "Shar-Ngolyeth's grasp on the mortal coast is broken—for now.",
        ending: { type: "true", title: "Bane of Shar-Ngolyeth", xp: 290, gold: 280, trophy: "Shattered Obsidian Tentacle" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 12. MONUMENT OF THE THUNDERER (8 PAGES • LV 7)
  // ==========================================================
  bk_bol_12_thunderer: {
    id: "bk_bol_12_thunderer",
    title: "Monument of the Thunderer",
    subtitle: "Red Cliff Raiders & Half-Dragon Mage Zahiil",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Caravan Survivors of Siwal (Oakhaven Guildhall)",
    summary: "Cross the churning Green Nuria rapids to the colossal dragon monument of Zulatil the Thunderer, defeat the wyvern-riding Red Cliff Raiders, and stop the cursed half-blue dragon mage Zahiil from consuming a stolen Titan's Divine Spark.",
    totalPages: 8,
    pages: {
      1: {
        zone: "The Green Nuria Rapids",
        title: "Waterfall of the Red Cliffs",
        safeRetreat: true,
        text: "Towering above a thundering waterfall on a river island stands a colossal carved stone dragon—the Monument of Zulatil the Thunderer. Swooping overhead, wyvern-mounted Red Cliff Raiders patrol the chasm!",
        choices: [
          { t: "Swim and rope-line across the swift rapids to the stone island.", badge: "Athletics DC 14", check: { stat: "might", skill: "Athletics", dc: 14, pass: 2, fail: 2, failDmg: 7, passMsg: "You haul yourself onto the slick island rocks cleanly!", failMsg: "Whitewater slams you into jagged stone (-7 HP) before you reach shore!" } },
          { t: "Wait for a cloudbank to slip across the narrow stone aqueduct.", badge: "Stealth DC 13", check: { stat: "agility", skill: "Stealth", dc: 13, pass: 2, fail: 2, passMsg: "You evade the circling wyvern riders completely!", failMsg: "A raider spots your movement and dives!" }, onPass: { cw: "WYVERN_EVADED" } }
        ]
      },
      2: {
        zone: "Dragon's Claws Courtyard",
        title: "Red Cliff Wyvern Riders",
        text: "Hardened Nurian ex-mercenaries armed with lances and backed by a snarling tethered Wyvern charge across the sandstone plaza!",
        enemy: { name: "Red Cliff Raiders & Wyvern", desc: "Caravan-raiding mercenaries and their venomous wyvern mount.", hp: 62, ac: 15, atk: 8, dmg: 9, xp: 180, gold: 85, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["WYVERN_EVADED"] },
        choices: [
          { t: "Enter the echoing stone jaws leading into the Monument's sanctum.", to: 3 }
        ]
      },
      3: {
        zone: "Hall of Zulatil",
        title: "Stolen Caravan Plunder",
        text: "Smashed trade crates from Siwal line the carved rib-vaults. A dying raider mutters that Zahiil's first attempt to absorb the glowing Divine Spark cursed him with unstable arcane overload!",
        onEnter: { cw: "ZAHIIL_CURSE_KNOWN", healHp: 12, msg: "Learned of Zahiil's unstable curse (ZAHIIL_CURSE_KNOWN) and found desert potions (+12 HP)!" },
        choices: [
          { t: "Climb the thunder-lit stairwell into the Dragon's Crown!", to: 4 }
        ]
      },
      4: {
        zone: "Crown of the Thunderer",
        title: "Zahiil & The Divine Spark",
        text: "Crowned in crackling blue lightning beside a blinding golden orb hovers Zahiil, the power-hungry Mharoti half-blue dragon mage! 'The Titan's Spark is MINE!' he bellows as arcane thunder shakes the monument!",
        enemy: { name: "Zahiil, Half-Blue Dragon Mage", desc: "Cursed draconic archmage channeling a stolen Titan's Spark.", hp: 78, ac: 16, atk: 9, dmg: 11, xp: 265, gold: 185, items: ["bq_thunderer_spark_orb"], weakCw: ["ZAHIIL_CURSE_KNOWN"] },
        choices: [
          { t: "Contain the unstable Divine Spark as Zahiil's curse overwhelms him!", to: 5 }
        ]
      },
      5: {
        zone: "Crown of the Thunderer",
        title: "Thunder Silenced",
        text: "Overwhelmed by the stolen divine power, Zahiil collapses in a burst of sapphire sparks—leaving behind a safe, resonant echo of the Titan's light.",
        choices: [
          { t: "Signal the approaching priest-theurges of Thoth-Hermes across the river.", to: 6 }
        ]
      },
      6: {
        zone: "Red Cliffs Road",
        title: "Shrine of Safe Travel",
        text: "The priest-theurges claim the monument to consecrate a wayshrine for desert travelers, while the surviving raiders scatter to the winds.",
        choices: [
          { t: "Collect the Siwal merchants' caravan reward.", to: 7 }
        ]
      },
      7: {
        zone: "Nurian Tavern",
        title: "Song of the Thunderer",
        text: "Bards strike up a lively ballad celebrating the fall of the Red Cliff Raiders.",
        choices: [
          { t: "Return to Oakhaven.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Tamer of the Red Cliffs",
        text: "The Green Nuria trade roads stand open once more, and the Monument of the Thunderer shines as a beacon for travelers.",
        ending: { type: "true", title: "Victor of the Thunderer's Monument", xp: 295, gold: 285, trophy: "Sapphire Scale of Zahiil" },
        choices: []
      }
    }
  }
});
