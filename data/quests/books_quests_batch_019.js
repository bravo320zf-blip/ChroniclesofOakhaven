/* ============================================================
   BOOK QUEST CONVERSIONS — BATCH 019 (11 Quests)
   - Trouble at Mossbeard Mill (3-Part Chain • Lv 2–3)
   - 8 Standalone Quests (Lv 2–16): Clattering Keep, Pride of Illyria,
     Spelldrinker's Cavern, Red Lenny's Famous Meat Pies, Seal of Rhydaas,
     A Night at the Seven Steeds, The Bagiennik Game, The Returners' Tower
   All quests use autoDiscover: false (Inn Rumor Pool / reqQuest chains).
   ============================================================ */
window.OAKHAVEN.registerQuests({

  // ==========================================================
  // 1. TROUBLE AT MOSSBEARD MILL I (8 PAGES • LV 2)
  // Part 1 of 3
  // ==========================================================
  bk_b19_mossbeard_1: {
    id: "bk_b19_mossbeard_1",
    title: "Trouble at Mossbeard Mill I: Shadows Over Moonbright",
    subtitle: "Part 1 of 3 • Northcord Timberlands & River Confluence",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Investigate frantic reports from Moonbright at the confluence of the Northcord and Saber Rivers, where ancient trees are moving in the dark and logging crews have vanished.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Moonbright Edge",
        title: "The Northcord Mill",
        safeRetreat: true,
        text: "Sawdust drifts over the timber town of Moonbright where the Northcord and Saber Rivers meet. Gnome farmers Asher and Varina Northcord wave you down beside the creaking waterwheel of Mossbeard Mill. 'The ancient woods have woken up!' Asher whispers. 'Loggers vanished at the northern bend, and thorny vine-creatures stalked the mill-race last night!'",
        choices: [
          { t: "Examine the claw-marked timber rafts and moss-slick riverbank for tracks.", badge: "Survival / Perception DC 10", check: { stat: "spirit", skill: "Survival", dc: 10, pass: 2, fail: 3, passMsg: "Huge root-prints lead straight to the logging camp—and smaller blight-tracks flank the mill!", failMsg: "Snapping vines erupt from the mill-race before you can finish reading the mud!" }, onPass: { cw: "ROOT_TRAIL" } },
          { t: "Question the frightened timber-foremen at the lumberyard first.", badge: "Persuasion DC 9", check: { stat: "spirit", skill: "Persuasion", dc: 9, pass: 2, fail: 3, passMsg: "A foreman admits they felled a sacred heart-oak marked with silver moss!", failMsg: "The surly foremen slam their gates, leaving you exposed as roots burst from the ditch!" }, onPass: { cw: "HEART_OAK_FELL" } },
          { t: "March straight up the Northcord logging trail with weapon drawn.", to: 3 }
        ]
      },
      2: {
        zone: "Mill-Race Clearing",
        title: "Forewarned Among the Stumps",
        text: "Armed with what you learned, you spot thorny twig-blights and a hulking vine-tangle coiled around a felled silver-moss oak before they can spring their ambush!",
        choices: [
          { t: "Scorch the dry briar-nest with Firebolt before the blights unfold!", reqSpell: "Firebolt", mp: 3, badge: "Firebolt (3 MP)", to: 4, onChoose: { cw: "BLIGHTS_SCORCHED", msg: "Firebolt ignites the dry brambles, searing the blights!" } },
          { t: "Circle wide behind the felled oak to ambush the vine-horrors!", badge: "Stealth / Agility DC 10", check: { stat: "agility", skill: "Stealth", dc: 10, pass: 4, fail: 4, failDmg: 3, passMsg: "You drop behind the briar-cluster undetected!", failMsg: "Thorny tendrils lash your ankles (-3 HP)!" }, onPass: { cw: "BLIGHTS_SCORCHED" } },
          { t: "Step out and hack through the corrupted undergrowth!", to: 4 }
        ]
      },
      3: {
        zone: "Northcord Trail",
        title: "Briars in the Mist",
        text: "Roots erupt from the muddy logging track as chittering twig-blights and a strangling vine-horror surge from the saw-stumps!",
        enemy: { name: "Briar Blights & Vine Stalker", desc: "Thorn-wreathed forest constructs awakened by timber-cutting.", hp: 20, ac: 11, atk: 4, dmg: 4, xp: 45, gold: 18, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1 },
        choices: [
          { t: "Follow the heavy, earth-shaking root-tracks deeper into the old grove.", to: 5 }
        ]
      },
      4: {
        zone: "Felled Heart-Oak",
        title: "Clearing the Briar-Tangle",
        text: "The briar-pack shrieks like splintering wood as it lunges across the saw-dusted clearing!",
        enemy: { name: "Briar Blights & Vine Stalker", desc: "Thorn-wreathed forest constructs awakened by timber-cutting.", hp: 20, ac: 11, atk: 4, dmg: 4, xp: 45, gold: 18, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["BLIGHTS_SCORCHED"] },
        choices: [
          { t: "Follow the massive root-tracks deeper into the ancient grove.", to: 5 }
        ]
      },
      5: {
        zone: "Old-Growth Clearing",
        title: "The Returning Treant",
        text: "Beyond the cut-line, three bound loggers huddle beneath a towering canopy as a thirty-foot figure of gnarled oak and silver lichen steps from the mist—Mossbeard, the fabled treant who planted these woods centuries ago! His amber eyes burn with grief, yet his gnarled servants—two stone-barked root-wardens—step forward to test your intent.",
        enemy: { name: "Mossbeard's Root-Wardens", desc: "Animated oaken guardians defending the ancient treant.", hp: 24, ac: 12, atk: 4, dmg: 5, xp: 58, gold: 25, items: ["bq_mossbeard_sap_vial"], flee: 1 },
        choices: [
          { t: "Lower your weapon and call out to Mossbeard about the felled heart-oak.", to: 6 }
        ]
      },
      6: {
        zone: "Old-Growth Clearing",
        title: "A Treant's Ultimatum",
        text: "Mossbeard halts his remaining roots, his voice grinding like shifting tectonic stone. 'Ninety winters I walked the Labyrinth, and I return to find my children fed to iron saws. Bring Moonbright's elders to the river docks at dusk—or I reclaim every beam of your town.' He releases the shaken loggers unharmed.",
        onEnter: { healHp: 8, msg: "Mossbeard's grove-mist soothes your wounds (+8 HP)!" },
        choices: [
          { t: "Escort the freed loggers back to Asher and Varina Northcord.", to: 7 }
        ]
      },
      7: {
        zone: "Moonbright Mill",
        title: "Preparing for Parley",
        text: "Asher and Varina greet the rescued loggers with tears of relief, but the town council argues furiously over meeting the ancient treant at the river docks.",
        choices: [
          { t: "Complete Part 1 and unlock Part 2: Missing Pieces!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Parley at Dusk",
        text: "The loggers are safe, and the truth behind the waking woods is clear. <strong>Trouble at Mossbeard Mill II: Missing Pieces</strong> is now unlocked!",
        ending: { type: "true", title: "Envoy of Mossbeard Mill (Part 1 of 3)", xp: 95, gold: 80, trophy: "Silver-Moss Sprig" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. TROUBLE AT MOSSBEARD MILL II (12 PAGES • LV 2)
  // Part 2 of 3 (Prerequisite: bk_b19_mossbeard_1)
  // ==========================================================
  bk_b19_mossbeard_2: {
    id: "bk_b19_mossbeard_2",
    reqQuest: "bk_b19_mossbeard_1",
    title: "Trouble at Mossbeard Mill II: Missing Pieces",
    subtitle: "Part 2 of 3 • Moonbright Docks & The Shattered Truce",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Unlocks after Trouble at Mossbeard Mill I",
    summary: "Broker a fragile peace between Moonbright's timber-council and the ancient treant Mossbeard at the river docks—only for ruthless Barrow-Cult saboteurs to strike from the fog!",
    totalPages: 12,
    pages: {
      1: {
        zone: "Moonbright River Docks",
        title: "The Twilight Parley",
        safeRetreat: true,
        text: "Lanterns bob along the slick pilings of Moonbright's river docks as twilight settles over the Silverrun. Mossbeard wades chest-deep into the shallows, ancient boughs dripping river-weed as he towers over the nervous timber-council. Asher Northcord slips to your elbow and whispers urgently: 'Something's wrong. Someone stacked fresh pitch-casks behind the boathouse—and a black-sailed barge just drifted into the fog past the outer pier!'",
        choices: [
          { t: "Speak earnestly for sustainable forestry to calm Mossbeard and win over the council.", badge: "Persuasion / Spirit DC 11", check: { stat: "spirit", skill: "Persuasion", dc: 11, pass: 2, fail: 3, passMsg: "Mossbeard inclines his oak-crowned brow, accepting the council's oath to spare the heart-woods!", failMsg: "Old grievances boil over on the pier—just as flaming arrows hiss out of the mist!" }, onPass: { cw: "TRUCE_BROKERED" } },
          { t: "Slip behind the boathouse to catch the hooded saboteurs beside the pitch-casks!", badge: "Stealth / Agility DC 11", check: { stat: "agility", skill: "Stealth", dc: 11, pass: 4, fail: 5, passMsg: "You climb onto the shadowed catwalk unseen, spotting pale cultists priming green-tainted pitch fuses!", failMsg: "A loose plank groans beneath your boot—bone-masked arsonists whirl with blades drawn!" }, onPass: { cw: "SABOTEURS_SPOTTED" } },
          { t: "Scan the river mist and the silent timber-barge drifting toward the pilings.", badge: "Perception / Lore DC 11", check: { stat: "lore", skill: "Perception", dc: 11, pass: 4, fail: 3, passMsg: "You spot a necrotic harpoon-rack aboard the barge and trace its lookouts back to the boathouse catwalk!", failMsg: "The river fog thickens—and a volley of black-fletched fire arrows erupts across the pier!" }, onPass: { cw: "BARGE_SPOTTED" } }
        ]
      },
      2: {
        zone: "Moonbright River Docks",
        title: "Oath of the Living Bough",
        text: "Your plea bridges decades of suspicion. The timber-council pledges to harvest only windfall and outer-ring pine, and Mossbeard rumbles with quiet relief, pressing a sprig of silver-veined mistletoe into Asher's palm. Before the elders can seal the pact, an eerie green flare bursts above the boathouse roof and the acrid reek of alchemical pitch floods the dock!",
        onEnter: { xp: 20, msg: "Brokering the truce earns Mossbeard's gratitude (+20 XP) and steadies Moonbright's council!" },
        choices: [
          { t: "Sprint for the boathouse pilings to stop the arsonists before the docks ignite!", to: 5 },
          { t: "Signal Asher and Varina to shield the elders while you rush the dark river barge!", to: 6 }
        ]
      },
      3: {
        zone: "Main Pier",
        title: "Sparks in the Mist",
        text: "Voices rise on the wet timber as two lumber-barons accuse Mossbeard of ruining their livelihoods. The treant's branches bristle—just as black-fletched fire arrows shriek from the boathouse roof, shattering the dock lanterns and igniting a slick trail of pitch racing straight toward Mossbeard's submerged roots!",
        choices: [
          { t: "Kick the burning oil-buckets into the river and flank behind the boathouse!", badge: "Agility / Strength DC 11", check: { stat: "agility", skill: "Acrobatics", dc: 11, pass: 4, fail: 5, passMsg: "You sever the burning oil-trail and vault onto the boathouse catwalk behind the arsonists!", failMsg: "The heat forces you back onto the main pier straight into the charging cultists!" }, onPass: { cw: "FIRE_CONTAINED" } },
          { t: "Charge straight through the smoke toward the bone-masked arsonists!", to: 5 }
        ]
      },
      4: {
        zone: "Boathouse Catwalk",
        title: "The Pitch-Cask Conspiracy",
        text: "From the creaking rafters above the boathouse, you look down on pale cultists wearing carved bone-sigils. They soak rope-fuses in sickly green necro-pitch, hissing to one another: 'Once the oaken ward dies, the Hollow Barrow wakes and Moonbright falls!' Beside their lantern lies an open iron-bound dock ledger and a heavy timber-beam suspended by a taut pulley-rope.",
        choices: [
          { t: "Slice the pulley-rope to drop the suspended timber-beam onto the arsonists!", badge: "Agility / Detect Traps DC 11", check: { stat: "agility", skill: "Detect Traps", dc: 11, pass: 5, fail: 5, passMsg: "The beam crashes down with a splintering roar, bruising and scattering the cultists!", failMsg: "The rope snags on the iron block—the cultists spot you and rush the catwalk stairs!" }, onPass: { cw: "BEAM_DROPPED" } },
          { t: "Snatch the Barrow-Cult's dock ledger to learn their counter-runes before leaping down.", badge: "Lockpicking / Perception DC 11", check: { stat: "lore", skill: "Perception", dc: 11, pass: 5, fail: 5, passMsg: "You memorize the wight-captain's necrotic tether-rune before dropping onto the pier!", failMsg: "A burning splinter forces you to drop the ledger and draw steel!" }, onPass: { cw: "CULT_LEDGER" } },
          { t: "[Firebolt] Ignite their spare pitch-keg from the rafters and leap straight toward the river barge!", reqSpell: "Firebolt", to: 6 }
        ]
      },
      5: {
        zone: "Boathouse Pier",
        title: "Ambush on the Pilings",
        text: "Green-tinted flames lick the damp pilings as the hooded saboteurs fan out across the boathouse pier, waving bone-hilted daggers and oil-soaked torches. 'You're too late, meddler!' their leader rasps. 'The barge is already in position!'",
        enemy: { name: "Barrow-Cult Arsonists", desc: "Hooded saboteurs hired to murder Mossbeard and break the forest ward.", hp: 22, ac: 12, atk: 4, dmg: 5, xp: 55, gold: 30, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["SABOTEURS_SPOTTED", "BEAM_DROPPED", "FIRE_CONTAINED"] },
        choices: [
          { t: "Race down the outer gangplank to board the fog-shrouded river barge!", to: 6 },
          { t: "Vault across the blazing pilings straight to Mossbeard's side!", to: 7 }
        ]
      },
      6: {
        zone: "Fog-Shrouded River Barge",
        title: "The Necrotic Harpoon",
        text: "A flat-bottomed timber barge looms out of the river fog, its lantern shrouded in black wool. At the prow, a hulking warrior in salt-rusted mail cranks a barbed, green-glowing harpoon into a swivel-mount aimed directly at Mossbeard's heartwood. Near the stern, two bound Moonbright ferrymen thrash desperately against soaked hemp ropes.",
        choices: [
          { t: "Slash the ferrymen's ropes and shove their skiff clear so they can rally the town!", badge: "Agility / Lockpicking DC 11", check: { stat: "agility", skill: "Lockpicking", dc: 11, pass: 7, fail: 7, passMsg: "The ferrymen break free and row furiously for the shore to warn Moonbright!", failMsg: "The wet knots resist—the wight-captain turns and fires the cursed harpoon!" }, onPass: { cw: "FERRYMEN_SAVED", xp: 20 } },
          { t: "[Turn Undead] Blast the barge deck with radiant light to disrupt the harpoon's curse!", reqSpell: "Turn Undead", to: 7 },
          { t: "Charge the swivel-mount to spoil the undead assassin's aim!", to: 7 }
        ]
      },
      7: {
        zone: "Blazing Docks",
        title: "The Barge Wight-Captain",
        text: "With a deafening crack of splintered oak, the cursed harpoon flies across the water and buries itself deep in Mossbeard's heartwood! Black-green rot spiders swiftly up the ancient treant's bark. Roaring a hollow battle-cry, the armored wight-captain vaults from the barge onto the blazing pier to finish the deed—and cuts off your path with a frost-rimed halberd!",
        enemy: { name: "Barge Wight-Captain", desc: "Armored undead assassin wielding a blight-forged harpoon and frost-rimed halberd.", hp: 26, ac: 12, atk: 5, dmg: 5, undead: true, xp: 75, gold: 45, items: ["bq_blight_ward_brooch"], weakCw: ["TRUCE_BROKERED", "SABOTEURS_SPOTTED", "BARGE_SPOTTED", "CULT_LEDGER"] },
        choices: [
          { t: "Kneel beside the collapsing treant as the river mist turns ice-cold.", to: 8 }
        ]
      },
      8: {
        zone: "Moonbright Shallows",
        title: "Mossbeard's Final Gift",
        text: "Even with the wight-captain shattered into bone-dust and black brine, the necrotic poison runs too deep. Mossbeard's immense boughs settle gently onto the muddy riverbank, his amber eyes fading like autumn embers. With his last breath, he presses a warm, glowing Golden Acorn into your palm: 'My roots held back the Hollow Barrow for three centuries... Now their master marches on Moonbright. Guard the seed—where it lives, the woods remember...'",
        onEnter: { healHp: 10, msg: "Mossbeard's final blessing restores +10 HP and entrusts you with the Golden Acorn!" },
        choices: [
          { t: "Wade out to the listing river barge to check the cultists' iron coffer before it sinks.", to: 9 },
          { t: "Carry the Golden Acorn straight up the cobbles to Moonbright Square as alarm bells ring.", to: 10 }
        ]
      },
      9: {
        zone: "Sinking River Barge",
        title: "Spoils of the Barrow-Cult",
        text: "Black river-water floods the tilting deck as the barge begins to founder. Wedged beneath the shattered harpoon-rack rests a salt-stained strongbox stamped with the hollow-crown sigil of the Barrow-Cult, alongside a wax-sealed scroll tube detailing the necromancer's vanguard.",
        choices: [
          { t: "Pry the rusted clasp open before the barge slips beneath the current!", badge: "Lockpicking / Strength DC 12", check: { stat: "agility", skill: "Lockpicking", dc: 12, pass: 10, fail: 10, passMsg: "You pop the latch, recovering 35 GP in stolen river-tolls and the cult's vanguard orders!", failMsg: "The barge lurches sharply—you leap clear onto the pier as the strongbox sinks!" }, onPass: { cw: "BARGE_COFFER", gold: 35, xp: 20 } },
          { t: "Leave the cursed wreckage to the Silverrun and hurry back to town.", to: 10 }
        ]
      },
      10: {
        zone: "Moonbright Square",
        title: "Bells in the Fog",
        text: "The watch-bells clang frantically from the timber-hall steeple. Pale blue corpse-lights flicker along the northern tree-line where Mossbeard's ward once stood, and frightened families stream into the lantern-lit square. Asher Northcord and Varina sprint to meet you, eyes wide at the warm golden light pulsing between your fingers.",
        choices: [
          { t: "Reveal the Barrow-Cult's plot and rally the timber-crews to fortify the mill bridge!", badge: "Persuasion / Lore DC 11", check: { stat: "spirit", skill: "Persuasion", dc: 11, pass: 11, fail: 11, passMsg: "Your steady voice turns panic into resolve—lumberjacks heft axes and drag heavy wagons toward the bridge!", failMsg: "Shaken by the corpse-lights, only the bravest mill-hands follow you toward the bridge." }, onPass: { cw: "MILITIA_RALLIED", xp: 15 } },
          { t: "Join the rescued ferrymen—who have already hauled extra oil-lanterns and axes to the bridge!", reqCw: "FERRYMEN_SAVED", to: 11 },
          { t: "Hurry straight to the Northcord Mill bridge with Asher and Varina.", to: 11 }
        ]
      },
      11: {
        zone: "Northcord Barricade",
        title: "Holding the Line",
        text: "Overturned wagons, split-oak beams, and crackling braziers form a jagged wall across the mill bridge. Asher, Varina, and Moonbright's timber-crews stand shoulder-to-shoulder beside you as the first skeletal silhouettes emerge from the freezing northern mist. Against your chest, Mossbeard's Golden Acorn beats with quiet, defiant warmth.",
        onEnter: { xp: 15, msg: "Moonbright's barricade is set—the town stands ready for the siege (+15 XP)!" },
        choices: [
          { t: "Complete Part 2 and unlock Part 3: Death Comes Creeping!", to: 12 }
        ]
      },
      12: {
        zone: "Epilogue",
        title: "The Ward Is Broken",
        text: "Mossbeard has fallen, his ancient ward is broken, and the dead of the Hollow Barrow are loose in the mist—yet the Golden Acorn endures in your keeping, and Moonbright stands united behind the bridge barricade. <strong>Trouble at Mossbeard Mill III: Death Comes Creeping</strong> is now unlocked!",
        ending: { type: "true", title: "Keeper of the Golden Acorn (Part 2 of 3)", xp: 115, gold: 100, trophy: "Golden Acorn of Mossbeard" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. TROUBLE AT MOSSBEARD MILL III (8 PAGES • LV 3)
  // Part 3 of 3 (Prerequisite: bk_b19_mossbeard_2)
  // ==========================================================
  bk_b19_mossbeard_3: {
    id: "bk_b19_mossbeard_3",
    reqQuest: "bk_b19_mossbeard_2",
    title: "Trouble at Mossbeard Mill III: Death Comes Creeping",
    subtitle: "Part 3 of 3 • Siege of Moonbright & The Hollow Barrow",
    difficulty: "Medium-Hard",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Unlocks after Trouble at Mossbeard Mill II",
    summary: "With the oaken sentinel slain, the undead once held at bay march on Moonbright! Break their siege at Mossbeard Mill, destroy the Barrow Necromancer, and plant the Golden Acorn.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Mossbeard Mill Bridge",
        title: "The Creeping Fog",
        safeRetreat: true,
        text: "Freezing grave-mist swallows the Northcord River as dozens of rusted blades glint behind the mill-wheel. At the far end of the bridge stands a crown-horned Barrow Lord raising pale legions against Moonbright's makeshift wagon-barricade!",
        choices: [
          { t: "Channel Turn Undead across the mill bridge to shatter the vanguard!", reqSpell: "Turn Undead", mp: 3, badge: "Turn Undead (3 MP)", to: 2, onChoose: { cw: "VANGUARD_BROKEN", msg: "Blinding radiance turns the skeletal front rank to dust!" } },
          { t: "Release the mill's sluice-gate to flood the ford and sweep the undead off balance!", badge: "Might / Athletics DC 11", check: { stat: "might", skill: "Athletics", dc: 11, pass: 2, fail: 2, failDmg: 3, passMsg: "A wall of river water smashes through the skeletal ranks!", failMsg: "A rusted wheel-gear snaps back against your ribs (-3 HP)!" }, onPass: { cw: "VANGUARD_BROKEN" } },
          { t: "Hold the center of the bridge and cut down the advancing dead!", to: 2 }
        ]
      },
      2: {
        zone: "Mill Ford",
        title: "The Risen Vanguard",
        text: "Rotting barrow-warriors and shrieking shadows scramble over the timber barricade!",
        enemy: { name: "Hollow Barrow Vanguard", desc: "Ancient undead unleashed by Mossbeard's death.", hp: 26, ac: 12, atk: 5, dmg: 5, undead: true, xp: 68, gold: 35, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["VANGUARD_BROKEN"] },
        choices: [
          { t: "Push across the bridge into the cursed Hollow Barrow grove!", to: 3 }
        ]
      },
      3: {
        zone: "Hollow Barrow",
        title: "Heart of the Blight",
        text: "Beneath the shattered roots of the felled heart-oak yawns a sunken burial mound pulsing with violet necromancy. The Barrow Necromancer chants beside a cracked obsidian menhir, drawing strength from Mossbeard's dying roots!",
        choices: [
          { t: "Press Mossbeard's Golden Acorn against the cracked menhir to disrupt the ritual!", badge: "Arcana / Spirit DC 12", check: { stat: "spirit", skill: "Arcana", dc: 12, pass: 4, fail: 4, failDmg: 4, passMsg: "Golden roots burst from the acorn, cracking the obsidian menhir in half!", failMsg: "Necrotic backlash sears your palm (-4 HP)!" }, onPass: { cw: "MENHIR_CRACKED" } },
          { t: "Charge straight into the Barrow Necromancer before the chant peaks!", to: 4 }
        ]
      },
      4: {
        zone: "Hollow Barrow",
        title: "Lord of the Creeping Dead",
        text: "Cloaked in grave-frost and wielding a bone-scythe, the Barrow Necromancer turns upon you with hollow, blazing eyes!",
        enemy: { name: "Malakor, Barrow Necromancer", desc: "Undead warlord who orchestrated Mossbeard's assassination.", hp: 34, ac: 13, atk: 5, dmg: 6, undead: true, xp: 110, gold: 80, items: ["bq_mossbeard_heartwood_staff"], weakCw: ["MENHIR_CRACKED"] },
        choices: [
          { t: "Plant Mossbeard's Golden Acorn in the cleansed soil of the grove!", to: 5 }
        ]
      },
      5: {
        zone: "Reborn Grove",
        title: "The Sapling Rises",
        text: "The moment the Golden Acorn touches the earth, warm emerald light sweeps across the barrow—turning the remaining undead to harmless ash as a radiant silver-barked sapling shoots ten feet skyward!",
        onEnter: { healHp: 14, gold: 45, msg: "The reborn grove heals +14 HP and reveals 45 GP in ancient barrow offerings!" },
        choices: [
          { t: "Return to Moonbright as dawn breaks over the Saber River.", to: 6 }
        ]
      },
      6: {
        zone: "Moonbright Square",
        title: "A New Compact",
        text: "Moonbright's timber-council swears an oath before Asher and Varina Northcord: the inner woods around the new sapling will remain sacred forever.",
        choices: [
          { t: "Accept the town's gratitude and claim your reward!", to: 7 }
        ]
      },
      7: {
        zone: "Mossbeard Mill",
        title: "Peace on the Northcord",
        text: "The waterwheel turns peacefully once more beneath silver-leafed boughs.",
        choices: [
          { t: "Complete the Mossbeard Mill chronicle!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Savior of Moonbright",
        text: "Moonbright stands safe, the Hollow Barrow is sealed, and a new Mossbeard grows beside the river!",
        ending: { type: "true", title: "Guardian of Mossbeard Mill (Part 3 of 3)", xp: 145, gold: 140, trophy: "Crown of Silver Oak" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. THE CLATTERING KEEP (11 PAGES • LV 4)
  // ==========================================================
  bk_b19_clattering_keep: {
    id: "bk_b19_clattering_keep",
    title: "The Clattering Keep",
    subtitle: "Keep Yellete • Necromancer & Unhatched Drakes",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Follow an overgrown cartway to ruined Keep Yellete, rescue a captive stonemason from the undercroft, shatter the necromancer Utratch's binding wards, and lay two terrifying undead Unhatched dragonlings to rest.",
    totalPages: 11,
    pages: {
      1: {
        zone: "Keep Yellete Road",
        title: "The Overgrown Cartway",
        safeRetreat: true,
        text: "Three miles up a scrubby hill-track stands ruined Keep Yellete—where locals swear dry bones clatter like wind-chimes from the battlements all night. Outside the crumbling gatehouse, four mercenaries patrol beside freshly etched necrotic binding-wards, while a briar-choked drainage culvert yawns darkly beneath the western curtain wall.",
        choices: [
          { t: "Disrupt the outer binding-ward quietly before the mercenaries notice.", badge: "Arcana / Stealth DC 12", check: { stat: "arcana", skill: "Stealth", dc: 12, pass: 2, fail: 2, failDmg: 4, passMsg: "The necrotic ward cracks—sapping Utratch's control over the keep!", failMsg: "A scout's crossbow bolt grazes your ribs (-4 HP)!" }, onPass: { cw: "WARD_BROKEN" } },
          { t: "Crawl through the briar-choked postern culvert beneath the west wall.", badge: "Stealth / Agility DC 12", check: { stat: "agility", skill: "Stealth", dc: 12, pass: 8, fail: 2, passMsg: "You slip unseen beneath the battlements into the damp undercroft!", failMsg: "Snapping briars alert the gatehouse watch—sellswords rush the courtyard!" } },
          { t: "Charge the mercenary picket at the broken gatehouse!", to: 2 }
        ]
      },
      2: {
        zone: "Outer Courtyard",
        title: "Utratch's Mercenary Rabble",
        text: "Two battle-scarred veterans and hired scouts draw steel beneath the clattering archway while Utratch shouts shrill orders from the high rookery windows!",
        enemy: { name: "Utratch's Mercenary Guard", desc: "Ruthless sell-swords hired to guard the necromancer's wards.", hp: 34, ac: 13, atk: 6, dmg: 6, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["WARD_BROKEN"] },
        choices: [
          { t: "Slip up the ruined chapel stair to scout the Rookery Gallery first.", to: 10 },
          { t: "Climb the cracked tower stairs straight into Utratch's ritual chamber!", to: 3 }
        ]
      },
      3: {
        zone: "Inner Keep",
        title: "The Unhatched Nest",
        text: "Bone-shards rattle across the flagstone hall! Utratch the Necromancer stands behind a glowing chalk circle as two skeletal, winged dragonlings—the Unhatched—hiss cold necrotic vapor from a ruined rookery! 'At last—living marrow to wake my brood!'",
        enemy: { name: "Utratch & The Unhatched", desc: "Ambitious necromancer and her skeletal undead dragonlings.", hp: 46, ac: 14, atk: 7, dmg: 7, undead: true, xp: 155, gold: 105, items: ["bq_unhatched_bone_amulet"], weakCw: ["WARD_BROKEN", "CIRCLE_CRACKED"] },
        choices: [
          { t: "Shatter the remaining binding stones and search Utratch's satchel.", to: 4 }
        ]
      },
      4: {
        zone: "Keep Vault",
        title: "Spoils of Keep Yellete",
        text: "With the Unhatched laid to rest and Utratch's plot broken, you uncover a hidden mason's niche holding 55 GP and dusty silver trade-bars.",
        onEnter: { gold: 55, healHp: 10, msg: "Recovered 55 GP and rested in the quieted keep (+10 HP)!" },
        choices: [
          { t: "Escort Garran safely down the hill and present Utratch's grimoire to Oakhaven!", reqCw: "GARRAN_FREED", badge: "GARRAN_FREED", to: 5, onChoose: { gold: 45, xp: 30, msg: "The masons' guild adds a 45 GP & 30 XP reward for bringing Garran home alive!" } },
          { t: "Carry proof of the keep's cleansing back to Oakhaven.", to: 5 },
          { t: "Strip the rare draconic bone-shards and silver fittings from the rookery before leaving.", to: 11 }
        ]
      },
      5: {
        zone: "Hill Cartway",
        title: "Silent Battlements",
        text: "Behind you, Keep Yellete stands silent beneath the scrubby hills at last—not a single bone rattles on the evening wind.",
        choices: [
          { t: "Return to the Rusty Flagon to collect the bounty!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven",
        title: "Bounty Claimed",
        text: "Oakhaven's magistrates breathe a deep sigh of relief as you lay Utratch's shattered binding-seal on the council table.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Silencer of Keep Yellete",
        text: "The Clattering Keep rattles no more, and two budding dracolich horrors will never take flight over the frontier!",
        ending: { type: "true", title: "Silencer of the Clattering Keep", xp: 175, gold: 165, trophy: "Unhatched Skull-Clasp" },
        choices: []
      },
      8: {
        zone: "West Undercroft",
        title: "The Captive Stonemason",
        text: "Inside the damp vaulted cellar beneath the battlements sits Garran, an Oakhaven stonemason locked inside a rusted grain-cage. 'Psst—over here!' he whispers. 'That mad witch forced me to chisel her binding-runes, then tossed me down here to feed her bone-drakes!'",
        choices: [
          { t: "Pick the rusted padlock on Garran's cage cleanly!", badge: "Lockpicking / Agility DC 12", check: { stat: "agility", skill: "Lockpicking", dc: 12, pass: 9, fail: 9, failDmg: 4, passMsg: "The old tumbler clicks free without a sound!", failMsg: "A rusted spring snaps against your thumb (-4 HP) before the latch yields!" } },
          { t: "Wrench the bent iron cage-bars wide with raw strength!", badge: "Might / Athletics DC 12", check: { stat: "might", skill: "Athletics", dc: 12, pass: 9, fail: 9, failDmg: 4, passMsg: "With a dull groan of iron, the cage door swings wide!", failMsg: "Jagged rust scrapes your forearm (-4 HP) as you force the door open!" } },
          { t: "Leave the undercroft and climb into the Outer Courtyard.", to: 2 }
        ]
      },
      9: {
        zone: "West Undercroft",
        title: "Garran's Keystone Secret",
        text: "Garran scrambles free, pressing a hidden pouch of 35 GP and a cool flask of spring water (+8 HP, +3 MP) into your hand. 'I carved a deliberate hairline flaw into the third chalk sigil up in the Rookery Gallery!' he grins. 'Strike it and her whole circle splits—and you can take the dry chapel stair straight up past her sellswords!'",
        onEnter: { cw: "GARRAN_FREED", gold: 35, healHp: 8, healMp: 3, msg: "Rescued Garran (+35 GP, +8 HP, +3 MP) and learned the keystone flaw!" },
        choices: [
          { t: "Slip up the hidden chapel stair straight to the Rookery Gallery!", to: 10 },
          { t: "Climb into the Outer Courtyard to clear out Utratch's mercenaries first.", to: 2 }
        ]
      },
      10: {
        zone: "Rookery Gallery",
        title: "The Flawed Binding-Stone",
        text: "Overlooking the ritual hall, pale dragon-shell fragments litter the gallery floor around Utratch's central binding-pylon and a brass necromancer's coffer.",
        choices: [
          { t: "Strike Garran's hidden keystone flaw to crack Utratch's binding circle!", reqCw: "GARRAN_FREED", badge: "GARRAN_FREED", to: 3, onChoose: { cw: "CIRCLE_CRACKED", msg: "The third rune splits in violet sparks—the Unhatched screech in wild panic!" } },
          { t: "Flood the bone-rookery with Turn Undead to sear the brood!", reqSpell: "Turn Undead", mp: 4, badge: "Turn Undead (4 MP)", to: 3, onChoose: { cw: "CIRCLE_CRACKED", msg: "Consecrated light blasts the gallery, shattering Utratch's necrotic wards!" } },
          { t: "Disarm the bone-needle trap on Utratch's brass coffer with Detect Traps.", reqSkill: "Detect Traps", badge: "Detect Traps", to: 3, onChoose: { gold: 45, cw: "CIRCLE_CRACKED", msg: "You claim 45 GP and topple her central incense-brazier into the circle!" } },
          { t: "Drop straight down into the Inner Keep to face Utratch!", to: 3 }
        ]
      },
      11: {
        zone: "Epilogue",
        title: "Raider of Keep Yellete",
        text: "Your pack clinks with rare draconic bone-reagents and stripped silver fittings—fetching a handsome sum in Oakhaven's curio stalls while Keep Yellete falls silent behind you.",
        ending: { type: "victory", title: "Raider of Keep Yellete", xp: 150, gold: 210, trophy: "Shattered Dragon-Shell" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. THE PRIDE OF ILLYRIA (7 PAGES • LV 4)
  // ==========================================================
  bk_b19_pride_illyria: {
    id: "bk_b19_pride_illyria",
    title: "The Pride of Illyria",
    subtitle: "Sea-Cliff Prison & Haunted Dungeons",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Infiltrate a secret sea-cliff tunnel into a notorious coastal prison, survive a vengeful strangled jailer ghost, and best the fire-breathing dragonborn edjet guards.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Sea-Cliff Tunnel",
        title: "Smugglers' Low-Tide Arch",
        safeRetreat: true,
        text: "Cold salt-spray whips through a concealed sea-cliff tunnel smelling of kelp and low tide. At the far end, arcane runes outline a hidden stone doorway leading straight into the lower prison cells!",
        choices: [
          { t: "Trace the arcane doorway glyphs to unseal the passage silently.", badge: "Arcana / Lockpicking DC 12", check: { stat: "arcana", skill: "Lockpicking", dc: 12, pass: 2, fail: 2, failDmg: 4, passMsg: "The hidden door swings wide without a sound!", failMsg: "A salt-ward sparks across your knuckles (-4 HP)!" }, onPass: { cw: "CLIFF_ENTRY" } },
          { t: "Force the corroded sea-door with brute strength!", to: 2 }
        ]
      },
      2: {
        zone: "Cellblock Nine",
        title: "The Strangled Jailer",
        text: "Iron bars rattle violently as the translucent ghost of a jailer—strangled against his own cell bars fifty years ago—lunges from the bare stone bench, enraged by intruders!",
        enemy: { name: "Ghost of the Strangled Jailer", desc: "Vengeful prison specter obsessed with iron discipline.", hp: 36, ac: 13, atk: 6, dmg: 6, undead: true, xp: 100, gold: 45, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["CLIFF_ENTRY"] },
        choices: [
          { t: "Slip past the expanded tunnel cell toward the Dragonborn Garrison!", to: 3 }
        ]
      },
      3: {
        zone: "Warden's Hall",
        title: "Dragonborn Edjet Captain",
        text: "Scaled boots ring on the stone as a disciplined Dragonborn Edjet Captain and his elite prison guards draw gleaming shortswords, embers curling from their jaws!",
        enemy: { name: "Dragonborn Edjet Captain", desc: "Fire-breathing imperial prison champion.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 155, gold: 110, items: ["bq_illyria_edjet_blade"], weakCw: ["CLIFF_ENTRY"] },
        choices: [
          { t: "Unlock the prisoner's cell and claim the confiscated treasure chest!", to: 4 }
        ]
      },
      4: {
        zone: "Evidence Vault",
        title: "Freedom on the Tide",
        text: "You spring the wrongfully imprisoned envoy from the upper dungeon and recover 60 GP in confiscated guild coin before racing back toward the sea-cliff arch.",
        onEnter: { gold: 60, healHp: 10, msg: "Recovered 60 GP & braced for the sea-escape (+10 HP)!" },
        choices: [
          { t: "Board the waiting skiff beneath the cliffs before high tide!", to: 5 }
        ]
      },
      5: {
        zone: "Coastal Cove",
        title: "Outrunning the Lanterns",
        text: "Alarm horns echo from the high battlements as your skiff cuts smoothly into the moonlit surf.",
        choices: [
          { t: "Sail safely back toward Oakhaven's port.", to: 6 }
        ]
      },
      6: {
        zone: "Harbor Pier",
        title: "Mission Accomplished",
        text: "The freed envoy clasps your hand and signs a generous guild writ of reward.",
        choices: [
          { t: "Claim your reward!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Ghost of the Sea-Cliffs",
        text: "The legendary prison of Illyria has been breached—and its proud edjet garrison bested!",
        ending: { type: "true", title: "Breaker of Illyria's Pride", xp: 180, gold: 170, trophy: "Illyrian Prison Key" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. SPELLDRINKER'S CAVERN (7 PAGES • LV 3)
  // ==========================================================
  bk_b19_spelldrinker_cavern: {
    id: "bk_b19_spelldrinker_cavern",
    title: "Spelldrinker's Cavern",
    subtitle: "Subterranean Arcane Academy & Ghoul Lair",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Descend into a mist-breathing cavern hiding a ruined underground mages' lecture hall, lay fallen apprentices to rest, and slay the magic-devouring Spelldrinker.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Cavern's Mouth",
        title: "Silver Steam & Ceiling Claws",
        safeRetreat: true,
        text: "Chill silver mist billows out of a towering cave mouth as if the earth itself were exhaling. High in the pitch-black stalactites, pale shapes cling silently like bats above a carved stone door!",
        choices: [
          { t: "Spot the ceiling-clinging ghouls and blast them with light or steel first!", badge: "Perception / Stealth DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, failDmg: 4, passMsg: "You catch the ceiling ghouls flat-footed before they can drop!", failMsg: "Rotting claws rake your shoulders from above (-4 HP)!" }, onPass: { cw: "GHOULS_SPOTTED" } },
          { t: "Dash straight for the carved stone academy door!", to: 2 }
        ]
      },
      2: {
        zone: "Lecture Hall",
        title: "Smashed Desks & Fallen Apprentices",
        text: "Inside the ruined underground lecture hall, snapped staffs and crushed inkwells litter the flagstones. Two ravenous ceiling ghouls drop down to defend their grisly feast!",
        enemy: { name: "Cavern Ceiling Ghouls", desc: "Pale undead stalking the ruined arcane college.", hp: 26, ac: 12, atk: 5, dmg: 5, undead: true, xp: 68, gold: 32, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["GHOULS_SPOTTED"] },
        choices: [
          { t: "Sanctify the fallen half-orc apprentice Goru so he cannot rise, then enter the sanctum!", badge: "Spirit / Herbalism DC 10", check: { stat: "spirit", skill: "Herbalism", dc: 10, pass: 3, fail: 3, passMsg: "You lay Goru to rest and claim his arcane ward-chalk!", failMsg: "You hurry onward as cold arcane whispers draw near." }, onPass: { cw: "GORU_WARD" } },
          { t: "Press straight into the glowing inner sanctum!", to: 3 }
        ]
      },
      3: {
        zone: "Inner Sanctum",
        title: "The Spelldrinker",
        text: "Arcane sparks crackle violently around a gaunt, translucent undead horror—a Spelldrinker—lapping raw blue ley-energy from shattered crystal focuses!",
        enemy: { name: "The Spelldrinker", desc: "Magic-resistant undead predator that devours arcane essence.", hp: 36, ac: 14, atk: 6, dmg: 6, undead: true, xp: 115, gold: 80, items: ["bq_spelldrinker_prism"], weakCw: ["GORU_WARD"] },
        choices: [
          { t: "Gather the surviving spellbooks and crystal focuses from the ruined hall.", to: 4 }
        ]
      },
      4: {
        zone: "Master's Archive",
        title: "Recovered Scrolls",
        text: "Inside an intact iron lectern you recover 45 GP in academy stipends and a bundle of unharmed star-charts.",
        onEnter: { gold: 45, healHp: 10, msg: "Claimed 45 GP and restored +10 HP in the cleansed archive!" },
        choices: [
          { t: "Carry word of Goru's rest back to Oakhaven's mages.", to: 5 }
        ]
      },
      5: {
        zone: "Cavern's Mouth",
        title: "Clearing Mist",
        text: "The silver steam drifting from the cave mouth no longer carries the chill of undeath.",
        choices: [
          { t: "Return to Oakhaven!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Guildhall",
        title: "Grateful Scholars",
        text: "The arcane scholars reward you warmly for recovering their lost lecture texts.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Bane of the Spelldrinker",
        text: "The magic-devouring horror is dust, and the lost subterranean academy lies at peace!",
        ending: { type: "true", title: "Slayer of the Spelldrinker", xp: 140, gold: 135, trophy: "Cracked Spelldrinker Focus" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. RED LENNY'S FAMOUS MEAT PIES (7 PAGES • LV 8)
  // ==========================================================
  bk_b19_red_lenny: {
    id: "bk_b19_red_lenny",
    title: "Red Lenny's Famous Meat Pies",
    subtitle: "Roadside Tavern of Doppelgangers & Fiendish Secrets",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Investigate a suspiciously cozy roadside tavern famous for its savory pies—where the mudroom cloaks bite, the staff are doppelgangers, and the cellar hides a fiendish workshop.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Tavern Mudroom",
        title: "Too Warm, Too Clean",
        safeRetreat: true,
        text: "Warm lantern-light, fiddle music, and the rich scent of baked meat pies greet you inside Red Lenny's roadside tavern. Two dozen traveler cloaks hang along the mudroom hooks—yet one heavy leather mantle twitches with a pale, hidden eye!",
        choices: [
          { t: "Spot the disguised Cloaker and pin it to the wall before it wraps around you!", badge: "Perception / Agility DC 14", check: { stat: "spirit", skill: "Perception", dc: 14, pass: 2, fail: 2, failDmg: 8, passMsg: "You slash the lurking Cloaker before it can shriek!", failMsg: "Leathery wings whip across your face (-8 HP)!" }, onPass: { cw: "CLOAKER_SPOTTED" } },
          { t: "Step straight into the common room and confront Red Lenny!", to: 2 }
        ]
      },
      2: {
        zone: "Common Room",
        title: "Smiling Faces, Shifting Skin",
        text: "The smiling tavern servers melt like tallow—revealing pale, eyeless Doppelgangers closing in from the spotless tile corridors alongside the swooping mudroom Cloaker!",
        enemy: { name: "Doppelganger Staff & Cloaker", desc: "Shapeshifting tavern killers and their ambush predator.", hp: 72, ac: 15, atk: 9, dmg: 10, xp: 240, gold: 130, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["CLOAKER_SPOTTED"] },
        choices: [
          { t: "Pick the heavy iron lock to Red Lenny's cellar workshop!", reqSkill: "Lockpicking", badge: "Lockpicking", to: 3, onChoose: { cw: "WORKSHOP_BREACHED", msg: "You slip silently into Lenny's workshop before he finishes his ward!" } },
          { t: "Kick down the reinforced cellar door to Lenny & Kishi's workshop!", to: 3 }
        ]
      },
      3: {
        zone: "Lenny's Workshop",
        title: "The Butcher & The Fiend-Crafter",
        text: "Demonology tomes, planar-binding scrolls, and sputtering iron constructs line the tiled workshop. Red Lenny and his ruthless partner Kishi whirl around with cleavers and hellfire!",
        enemy: { name: "Red Lenny & Kishi", desc: "Fiendish construct-smith and his deadly doppelganger partner.", hp: 88, ac: 16, atk: 10, dmg: 11, xp: 340, gold: 240, items: ["bq_lenny_planar_cleaver"], weakCw: ["WORKSHOP_BREACHED"] },
        choices: [
          { t: "Release the captive travelers in the locked pantry and burn the fiendish ledgers!", to: 4 }
        ]
      },
      4: {
        zone: "Hidden Cellar",
        title: "Travelers Freed",
        text: "Three terrified merchants stumble free from the pantry, pressing 110 GP in grateful coin into your hands alongside a salvaged planar-binding scroll.",
        onEnter: { gold: 110, healHp: 18, msg: "Freed the captives (+110 GP, +18 HP)!" },
        choices: [
          { t: "Torch the cursed workshop and escort the survivors down the highway.", to: 5 }
        ]
      },
      5: {
        zone: "King's Highway",
        title: "Smoke Over the Roadhouse",
        text: "Black smoke curls above the notorious tavern as no traveler will ever end up in Red Lenny's ovens again.",
        choices: [
          { t: "Report the tavern's true horrors to the road-wardens.", to: 6 }
        ]
      },
      6: {
        zone: "Wardens' Post",
        title: "Bounty Paid in Full",
        text: "The road-wardens count out a hefty purse for ending months of mysterious highway disappearances.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Shutting Down the Ovens",
        text: "Red Lenny's reign of culinary terror is over, and the highway stands safe once more!",
        ending: { type: "true", title: "Bane of Red Lenny's Kitchen", xp: 380, gold: 340, trophy: "Lenny's Master Keyring" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. THE SEAL OF RHYDAAS (7 PAGES • LV 16)
  // ==========================================================
  bk_b19_seal_rhydaas: {
    id: "bk_b19_seal_rhydaas",
    title: "The Seal of Rhydaas",
    subtitle: "Volcanic Dragon-Maw Temple & Molten Sanctum",
    difficulty: "Deadly",
    recommendedLevel: 16,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Enter a colossal carved Dragon's Maw billowing volcanic smoke, break through red dragonborn wyvern knights, and shatter the pulsing lava Seal of Rhydaas.",
    totalPages: 7,
    pages: {
      1: {
        zone: "The Dragon's Maw",
        title: "Bronze Doors & Flame Jets",
        safeRetreat: true,
        text: "Sulfurous wind roars out of a colossal stone dragon's throat where ten-foot bronze doors gleam before three smoldering pyres. Pressure-plates beneath the flagstones feed hidden ceiling flame-jets!",
        choices: [
          { t: "Speak the ancient draconic password 'Rhydaas' from beyond the pressure-plate!", badge: "Arcana / Perception DC 18", check: { stat: "arcana", skill: "Perception", dc: 18, pass: 2, fail: 2, failDmg: 16, passMsg: "The bronze doors part smoothly while the flame-jets stay dormant!", failMsg: "Roaring jets of volcanic fire scorch the threshold (-16 HP)!" }, onPass: { cw: "MAW_BYPASSED" } },
          { t: "Heave the massive bronze doors open by sheer titanic might!", to: 2, onChoose: { dmg: 12, msg: "Flame-jets blister your armor (-12 HP) as you force the bronze doors!" } }
        ]
      },
      2: {
        zone: "Chamber of the Seal",
        title: "Sevarra's Wyvern Knights",
        text: "In the heart of the seven-stair rotunda, a cracked stone altar pulses with molten lava like a beating heart! Two elite Red Dragonborn Wyvern Knights step before the gleaming adamantium door, blades blazing!",
        enemy: { name: "Red Dragonborn Wyvern Knights", desc: "Fire-breathing elite honor guard of the volcanic temple.", hp: 145, ac: 19, atk: 14, dmg: 16, xp: 620, gold: 320, items: rollRandomLoot(["consumable", "valuable"], 2, "legendary"), flee: 1, weakCw: ["MAW_BYPASSED"] },
        choices: [
          { t: "Storm through the adamantium portal into the Dragon Paddock & High Altar!", to: 3 }
        ]
      },
      3: {
        zone: "Molten Sanctum",
        title: "High Priestess Sevarra & Flame Drakes",
        text: "Beds of white-hot coals surround the inner sanctuary where High Priestess Sevarra commands a brood of fiery Flame Dragons to keep the Seal of Rhydaas burning!",
        enemy: { name: "High Priestess Sevarra & Flame Drakes", desc: "Draconic fire-zealot and her scorching volcanic brood.", hp: 175, ac: 20, atk: 15, dmg: 18, xp: 850, gold: 520, items: ["bq_rhydaas_adamantium_aegis"], weakCw: ["MAW_BYPASSED"] },
        choices: [
          { t: "Quench the beating lava-altar and claim the temple's silver icons!", to: 4 }
        ]
      },
      4: {
        zone: "Priests' Treasury",
        title: "Spoils of the Cooling Altar",
        text: "As the volcanic heartbeat slows to dark basalt, you recover 300 GP in silver icons and dragon-forged bullion from the priests' vaults.",
        onEnter: { gold: 300, healHp: 30, msg: "Claimed 300 GP and cooled your wounds (+30 HP)!" },
        choices: [
          { t: "Stride back out through the quieted Dragon's Maw.", to: 5 }
        ]
      },
      5: {
        zone: "Volcanic Ridge",
        title: "Ash Under Starlight",
        text: "The crimson glare over the mountain peak fades to a peaceful ember.",
        choices: [
          { t: "Return in triumph to Oakhaven!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven",
        title: "Legend of the Realm",
        text: "Bards crowd the Rusty Flagon to sing of the hero who broke the volcanic Seal of Rhydaas.",
        choices: [
          { t: "Claim your mythic reward!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Breaker of the Seal",
        text: "The molten altar is cold, Sevarra's fire-cult is broken, and the Dragon's Maw sleeps!",
        ending: { type: "true", title: "Breaker of the Seal of Rhydaas", xp: 950, gold: 800, trophy: "Adamantium Seal-Shard" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. A NIGHT AT THE SEVEN STEEDS (7 PAGES • LV 6)
  // ==========================================================
  bk_b19_seven_steeds: {
    id: "bk_b19_seven_steeds",
    title: "A Night at the Seven Steeds",
    subtitle: "Frost-Rimed Coaching House & The Detached Shadow",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Track a missing merchant shipment to the Seven Steeds Coaching House, where silent guests stare catatonically at the ceiling and a Detached Shadow freezes the upper stairs.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Coaching House Dining Room",
        title: "Eyes Fixed on the Ceiling",
        safeRetreat: true,
        text: "A wealthy trader hired you to trace a wagon that stopped at the Seven Steeds three nights ago. Inside, the hearth burns high yet the dining hall is eerie—three travelers sit frozen in silence, staring straight up at the rafters as frost creeps down the staircase!",
        choices: [
          { t: "Examine the catatonic guests' aura to uncover the curse gripping the house.", badge: "Arcana / Perception DC 13", check: { stat: "arcana", skill: "Perception", dc: 13, pass: 2, fail: 2, failDmg: 5, passMsg: "You break one guest's trance—he gasps: 'The Detached Shadow on the stairs! Burn it with light!'", failMsg: "A wave of grave-cold numbs your fingers (-5 HP)!" }, onPass: { cw: "SHADOW_KNOWN" } },
          { t: "Climb straight up the frost-rimed staircase toward the guest rooms!", to: 2 }
        ]
      },
      2: {
        zone: "Upper Hallway",
        title: "Rimy Frost & Frozen Dead",
        text: "Your breath hangs white in the upper hallway—and your own shadow refuses to move in unison with your body! Frost-covered zombie travelers lurch from the guest rooms!",
        enemy: { name: "Frost-Stricken Travelers", desc: "Frozen undead victims of the coaching house curse.", hp: 54, ac: 14, atk: 8, dmg: 8, undead: true, xp: 165, gold: 85, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["SHADOW_KNOWN"] },
        choices: [
          { t: "Confront the heartless Detached Shadow clinging to the stairwell rafters!", to: 3 }
        ]
      },
      3: {
        zone: "The Stairwell",
        title: "The Detached Shadow",
        text: "A razor-edged entity of living darkness peels free from the frost-crusted ceiling, drinking lantern-light as it lunges!",
        enemy: { name: "The Detached Shadow", desc: "Heartless entity of pure freezing shadow haunting the inn.", hp: 66, ac: 15, atk: 9, dmg: 9, undead: true, xp: 235, gold: 150, items: ["bq_seven_steeds_lantern"], weakCw: ["SHADOW_KNOWN"] },
        choices: [
          { t: "Secure the missing merchant wagon in the stableyard as warmth returns.", to: 4 }
        ]
      },
      4: {
        zone: "Seven Steeds Stables",
        title: "The Thawing Dawn",
        text: "Frost melts from the beams as the surviving innkeepers wake from their stupor. In the stableyard, the missing silk-wagon sits intact—alongside 75 GP in grateful coin.",
        onEnter: { gold: 75, healHp: 14, msg: "Warmed by the hearth (+14 HP) and recovered 75 GP!" },
        choices: [
          { t: "Escort the recovered shipment back to its anxious owner.", to: 5 }
        ]
      },
      5: {
        zone: "Post Road",
        title: "Shadows in Step",
        text: "On the morning road, your shadow finally walks where it belongs.",
        choices: [
          { t: "Deliver the shipment and collect the 250 GP fee!", to: 6 }
        ]
      },
      6: {
        zone: "Merchant's Countinghouse",
        title: "Contract Fulfilled",
        text: "The relieved merchant counts out your promised purse without hesitation.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Banisher of the Stairwell Shadow",
        text: "The Seven Steeds Coaching House welcomes warm laughter once more!",
        ending: { type: "true", title: "Savior of the Seven Steeds", xp: 265, gold: 250, trophy: "Frost-Glass Coaching Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. THE BAGIENNIK GAME (7 PAGES • LV 2)
  // ==========================================================
  bk_b19_bagiennik_game: {
    id: "bk_b19_bagiennik_game",
    title: "The Bagiennik Game",
    subtitle: "Village of Tuwold • Bucca Snares & Marsh-Feast Lair",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Answer Village Elder Tomra's plea in Tuwold to track down a missing youth, disarm mischievous bucca snares, and rescue Ulran from the marsh-lair of Ingyf the Bagiennik.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Tuwold Village Green",
        title: "Elder Tomra's Plea",
        safeRetreat: true,
        text: "Silver-haired Village Elder Tomra—a retired Reywald guard—leans on his battleaxe beside Tuwold's well. 'Four village youths crept into the old marsh shrine playing a dare,' he says grimly. 'Three ran home too terrified to speak, and young Ulran never came back!'",
        choices: [
          { t: "Speak gently to the frightened youths Ina and Halson to learn what grabbed Ulran.", badge: "Persuasion / Spirit DC 10", check: { stat: "spirit", skill: "Persuasion", dc: 10, pass: 2, fail: 2, passMsg: "Halson sobs that chittering bucca lured Ulran into a snare for 'Ingyf the Marsh-Thing!'", failMsg: "The children only point trembling fingers toward the mossy shrine." }, onPass: { cw: "YOUTHS_CLUE" } },
          { t: "Follow the muddy boot-prints straight into the marsh shrine!", to: 2 }
        ]
      },
      2: {
        zone: "Shrine Antechamber",
        title: "Bucca Snare-Traps",
        text: "Moss-draped flagstones hide a taut rope-snare rigged across the doorway! Cackling, pointy-eared Bucca bandits leap from behind fallen pillars guarding a glittering stash of stolen gemstones!",
        enemy: { name: "Marsh Bucca Tricksters", desc: "Spiteful fey-kin laying snares around the ruined shrine.", hp: 20, ac: 11, atk: 4, dmg: 4, xp: 48, gold: 45, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["YOUTHS_CLUE"] },
        choices: [
          { t: "Rush into the flooded worshipping chamber to free Ulran!", to: 3 }
        ]
      },
      3: {
        zone: "Ingyf's Lair",
        title: "Ingyf the Bagiennik",
        text: "Bubbling swamp-ooze coats the sunken altar where young Ulran hangs tied above a murky pool! A slick, acid-slicked Bagiennik—Ingyf—rises from the mud with a guttural hiss!",
        enemy: { name: "Ingyf, Marsh Bagiennik", desc: "Bizarre, acid-sputtering swamp fey ruling the flooded shrine.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 55, items: ["bq_bagiennik_marsh_charm"], weakCw: ["YOUTHS_CLUE"] },
        choices: [
          { t: "Cut Ulran down and recover the bucca's pilfered village gemstones!", to: 4 }
        ]
      },
      4: {
        zone: "Shrine Steps",
        title: "Ulran Safe",
        text: "Mud-streaked but unharmed, Ulran thanks you breathlessly as you pocket 40 GP in unclaimed marsh-gems.",
        onEnter: { gold: 40, healHp: 8, msg: "Rescued Ulran and claimed 40 GP (+8 HP)!" },
        choices: [
          { t: "Escort Ulran back to Elder Tomra in Tuwold.", to: 5 }
        ]
      },
      5: {
        zone: "Tuwold Village",
        title: "Tears of Relief",
        text: "Ulran's family rushes onto the green to embrace him as Elder Tomra raises his axe in salute.",
        choices: [
          { t: "Accept Tuwold's heartfelt reward!", to: 6 }
        ]
      },
      6: {
        zone: "Village Hearth",
        title: "A Lesson Learned",
        text: "No child in Tuwold will ever play 'the Bagiennik Game' again.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Hero of Tuwold",
        text: "Ulran is home, the bucca are scattered, and the flooded marsh shrine is cleared!",
        ending: { type: "true", title: "Rescuer of Tuwold", xp: 105, gold: 105, trophy: "Tuwold Elder's Medallion" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. THE RETURNERS' TOWER (11 PAGES • LV 5)
  // ==========================================================
  bk_b19_returners_tower: {
    id: "bk_b19_returners_tower",
    title: "The Returners' Tower",
    subtitle: "Tarrini Watchtower • Ralio's Arcane Beacon",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Investigate a storm-wreathed watchtower near Tarrini seized by Returner cultists, rescue a captive Tarrini scribe in the bell-loft, sabotage the copper conduits, and shut down Ralio's perilous planar Beacon at the summit.",
    totalPages: 11,
    pages: {
      1: {
        zone: "Tower Base",
        title: "Whispers of Rebellion",
        safeRetreat: true,
        text: "Tarrini's mayor hired you to investigate an old hillside watchtower now humming with eerie violet lightning. Hooded Returner cultists patrol the crumbling courtyard, whispering fiercely of 'recalling the ancient elves'—while a thick ivy-draped bell-rope shaft climbs the shadowed masonry beside the arrow-slit cellar.",
        choices: [
          { t: "Slip through the arrow-slit cellar to bypass the courtyard sentries!", badge: "Stealth / Lockpicking DC 12", check: { stat: "agility", skill: "Stealth", dc: 12, pass: 2, fail: 2, failDmg: 5, passMsg: "You slip silently into the stairwell behind the guards!", failMsg: "A cultist blade nicks your arm (-5 HP) before you force the door!" }, onPass: { cw: "TOWER_INFILTRATED" } },
          { t: "Scale the ivy-draped bell-rope shaft straight up to the Mid-Tower Bell-Loft!", badge: "Athletics / Agility DC 13", check: { stat: "agility", skill: "Athletics", dc: 13, pass: 8, fail: 2, passMsg: "You haul yourself cleanly onto the quiet timber ledge of the bell-loft!", failMsg: "Rotted ivy snaps underfoot—dropping you right by the watchtower door!" } },
          { t: "Storm the watchtower door with steel drawn!", to: 2 }
        ]
      },
      2: {
        zone: "Ralio's Quarters",
        title: "Cultists & Blueprints",
        text: "A humming bullseye lantern illuminates dozens of inked arcane parchments detailing an ominous four-stand metallic Beacon—while fanatical Returner zealots bar the spiral stair to the summit!",
        enemy: { name: "Returner Cult Zealots", desc: "Fanatical rebels guarding the tower stairwell.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 135, gold: 70, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["TOWER_INFILTRATED"] },
        choices: [
          { t: "Study Ralio's parchments to learn the Beacon's emergency shutdown glyph!", badge: "Arcana / Perception DC 12", check: { stat: "arcana", skill: "Perception", dc: 12, pass: 3, fail: 3, passMsg: "You memorize the shutdown rune—giving you the edge atop the tower!", failMsg: "Crackling thunder overhead forces you straight up the stairs!" }, onPass: { cw: "BEACON_SHUTDOWN" } },
          { t: "Duck up the side service stair to sabotage the Conduit Gallery first.", to: 10 },
          { t: "Race straight up to the tower roof!", to: 3 }
        ]
      },
      3: {
        zone: "Tower Summit",
        title: "Ralio & The Planar Beacon",
        text: "Violet lightning lashes around a colossal metal orb mounted on four enchanted stands! Tormented cult-architect Ralio—realizing too late the catastrophic rift Yenithia's Beacon will tear open—still refuses to surrender his dream: 'Stand back! The old glory returns tonight!'",
        enemy: { name: "Ralio, Architect of the Beacon", desc: "Desperate cult fanatic channeling the unstable planar orb.", hp: 58, ac: 15, atk: 8, dmg: 8, xp: 195, gold: 135, items: ["bq_returner_beacon_shard"], weakCw: ["BEACON_SHUTDOWN", "TOWER_INFILTRATED", "CONDUIT_CUT"] },
        choices: [
          { t: "Trigger the shutdown glyph and collapse the four enchanted stands!", to: 4 }
        ]
      },
      4: {
        zone: "Quieted Summit",
        title: "Rift Averted",
        text: "The metal orb powers down in a fading shower of harmless violet sparks. Gathering Ralio's valuable engineering parchments nets you 85 GP in scholarly salvage.",
        onEnter: { gold: 85, healHp: 12, msg: "Disabled the Beacon and salvaged 85 GP (+12 HP)!" },
        choices: [
          { t: "Escort Corin safely back to Tarrini with Yenithia's complete ley-charts!", reqCw: "CORIN_SAVED", badge: "CORIN_SAVED", to: 5, onChoose: { gold: 50, xp: 35, msg: "Tarrini's mayor adds a 50 GP & 35 XP bonus for rescuing Corin and recovering Yenithia's charts!" } },
          { t: "Descend the watchtower and report back to Tarrini's mayor.", to: 5 },
          { t: "Pry loose the Beacon's rare violet planar lenses for private trade before descending.", to: 11 }
        ]
      },
      5: {
        zone: "Tarrini Road",
        title: "Clear Skies",
        text: "The crackling violet storm-clouds above the hillside watchtower break apart into crisp, peaceful evening starlight.",
        choices: [
          { t: "Collect the mayor's bounty!", to: 6 }
        ]
      },
      6: {
        zone: "Tarrini Town Hall",
        title: "Order Restored",
        text: "Tarrini's mayor and garrison captain shake your hand warmly in front of the town council as they count out the promised bounty.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Silencer of the Beacon",
        text: "Yenithia's reckless planar Beacon is dismantled, and Tarrini rests safe beneath quiet skies!",
        ending: { type: "true", title: "Dismantler of the Returners' Beacon", xp: 220, gold: 210, trophy: "Returner's Brass Astrolabe" },
        choices: []
      },
      8: {
        zone: "Mid-Tower Bell-Loft",
        title: "The Disillusioned Scribe",
        text: "Crouched behind a cracked bronze watch-bell sits Corin, a young Tarrini clerk with ink-stained fingers. 'Don't strike—I'm no cultist!' he whispers frantically. 'Ralio hired me to copy Yenithia's ley-charts, then barred the loft when I warned him the orb would tear the hill apart!'",
        choices: [
          { t: "Reassure Corin that Tarrini's mayor sent you to dismantle the Beacon.", badge: "Persuasion / Spirit DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 9, fail: 9, passMsg: "Corin exhales in relief and pulls a folded ley-chart from his coat!", failMsg: "Shaken but hopeful, Corin hands over his marked ley-chart anyway." } },
          { t: "Trace the humming copper grounding-chain running through the loft with Arcana.", badge: "Arcana DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 9, fail: 9, failDmg: 5, passMsg: "You spot the exact weak relay feeding the roof—Corin nods eagerly!", failMsg: "Static leaps from the chain (-5 HP), though Corin pulls you back safely!" } },
          { t: "Drop down the interior ladder into Ralio's Quarters.", to: 2 }
        ]
      },
      9: {
        zone: "Mid-Tower Bell-Loft",
        title: "Corin's Ley-Chart & Service Hatch",
        text: "Corin presses 40 GP in garrison wages and a warm herbal flask (+10 HP, +4 MP) into your hand alongside his marked copy of Yenithia's Beacon Key. 'There's a timber hatch right above us into the Conduit Gallery—cut the copper busbars there and you'll starve Ralio's orb!'",
        onEnter: { cw: "CORIN_SAVED", gold: 40, healHp: 10, healMp: 4, msg: "Rescued Corin (+40 GP, +10 HP, +4 MP) and gained Yenithia's Beacon Key!" },
        choices: [
          { t: "Climb the loft hatch straight into the Conduit Gallery (bypassing the zealots)!", to: 10 },
          { t: "Descend into Ralio's Quarters to clear out the Returner Zealots first.", to: 2 }
        ]
      },
      10: {
        zone: "Conduit Gallery",
        title: "The Four Copper Busbars",
        text: "Directly beneath the thunderous summit roof, four thick copper busbars pulse with raw violet energy feeding Ralio's planar orb—beside a wire-trapped cult treasury chest.",
        choices: [
          { t: "Trip the master breaker cleanly using Corin's marked ley-chart!", reqCw: "CORIN_SAVED", badge: "CORIN_SAVED", to: 3, onChoose: { cw: "CONDUIT_CUT", msg: "Two of the four busbars arc dead—the Beacon's roof-hum drops an octave!" } },
          { t: "Disarm the lightning-wire on the treasury chest and snip the east busbar!", reqSkill: "Detect Traps", badge: "Detect Traps", to: 3, onChoose: { gold: 55, cw: "CONDUIT_CUT", msg: "You claim 55 GP cleanly and sever the east busbar!" } },
          { t: "Overload the copper grounding-coil with Firebolt!", reqSpell: "Firebolt", mp: 3, badge: "Firebolt (3 MP)", to: 3, onChoose: { cw: "CONDUIT_CUT", msg: "A crisp flare fuses the relay—starving Ralio's Beacon of storm-power!" } },
          { t: "Step straight up the spiral stairs to the Tower Summit.", to: 3 }
        ]
      },
      11: {
        zone: "Epilogue",
        title: "Salvager of the Returners' Tower",
        text: "The Beacon lies cold and Tarrini rests safe, while your private sale of Ralio's salvaged violet planar lenses fills your purse with frontier gold!",
        ending: { type: "victory", title: "Salvager of the Returners' Tower", xp: 195, gold: 260, trophy: "Violet Planar Lens" },
        choices: []
      }
    }
  }

});
