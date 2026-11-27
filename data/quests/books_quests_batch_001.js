/* ============================================================
   BOOK QUESTS — BATCH 001 (10 Quests)
   Source: 12 Peculiar Towers (Kobold Press) — Towers 1–10
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. THE OLD MARBLEHEAD LIGHTHOUSE (8 PAGES • LV 1)
  // ==========================================================
  bk_pt_01_marblehead: {
    id: "bk_pt_01_marblehead",
    title: "The Old Marblehead Lighthouse",
    subtitle: "Coastal Cliff & Smugglers' Sea Cave",
    difficulty: "Easy",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Oakhaven Quest Board (Northwatch Harbor Charter)",
    summary: "Survey the abandoned sixty-foot lighthouse on Marblehead Point, clear out what nests in its damp stone halls, and uncover the forgotten smugglers' sea cave below.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Marblehead Point",
        title: "The White Cliffs",
        safeRetreat: true,
        text: "A three-mile overgrown track winds up onto windswept chalk cliffs once mistaken for marble. Before you rises the hexagonal, sixty-foot Marblehead Lighthouse. Its swollen wooden door sticks fast in its frame, while a rusted rope-and-pulley supply lift creaks on the western face.",
        choices: [
          { t: "Put your shoulder to the swollen lighthouse door.", badge: "Might DC 10", check: { stat: "might", skill: "Athletics", dc: 10, pass: 2, fail: 2, failDmg: 2, passMsg: "The swollen oak gives way with a loud crack!", failMsg: "You bruise your shoulder (-2 HP) before wrenching the door open." } },
          { t: "Inspect the cliffside trail for a lower entrance before entering.", badge: "Perception DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, passMsg: "You spot old smuggler winch marks leading toward a sea cave below!", failMsg: "Only sea spray and tangled scrub meet your gaze." }, onPass: { cw: "SMUGGLER_TRAIL", msg: "Spotted SMUGGLER_TRAIL!" } }
        ]
      },
      2: {
        zone: "Ground Floor",
        title: "Damp Entrance & Keeper's Quarters",
        text: "Moldy crates and rotten barrels clutter the ground floor around a central spiral staircase. In the old keeper's domicile nearby, a salt-crusted chest sits unlocked beside a moldering logbook detailing coded lantern flashes for midnight ships.",
        choices: [
          { t: "Search the keeper's chest and logbook carefully.", to: 3, onChoose: { gold: 25, cw: "KEEPER_LOG", msg: "Recovered 25 GP and the keeper's smuggler logbook!" } },
          { t: "Climb the central spiral stairs directly toward the upper beacon.", to: 4 }
        ]
      },
      3: {
        zone: "Storage Room",
        title: "The Oil Casks",
        text: "On the second landing, leaking whale-oil casks slick the stone floor. Giant cliff-scuttling crabs burst from behind the broken barrels, clacking their salt-encrusted pincers!",
        enemy: { name: "Marblehead Cliff Crabs", desc: "Armored giant crabs nesting among oil barrels.", hp: 16, ac: 10, atk: 3, dmg: 3, xp: 35, gold: 15, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1 },
        choices: [
          { t: "Ascend to the glass-paned Beacon Room.", to: 4 },
          { t: "Use the keeper's log clue to find the hidden cellar trapdoor.", reqCw: "KEEPER_LOG", badge: "KEEPER_LOG", to: 5 }
        ]
      },
      4: {
        zone: "The Beacon",
        title: "Lantern of Northwatch",
        text: "Broken glass crunches underfoot at the sixty-foot summit. The great brass Fresnel reflector still hangs intact, and tucked inside the oil locker sits a pristine storm-lantern alongside a hatchway leading down a maintenance shaft to the cellar.",
        onEnter: { items: ["bq_marblehead_lantern"], msg: "Claimed the Marblehead Beacon Lantern!" },
        choices: [
          { t: "Descend the maintenance shaft into the dark cellar beneath the tower.", to: 5 }
        ]
      },
      5: {
        zone: "The Cellar",
        title: "Smugglers' Passage",
        text: "Beneath the lighthouse lies a natural limestone cellar stacked with rotted silk bales. Cold ocean air drafts through a jagged tunnel leading down into a echoing sea cavern where hundreds of eyes glint in the dark.",
        choices: [
          { t: "Slip quietly past the roosting bats using Stealth.", badge: "Agility / Stealth DC 10", check: { stat: "agility", skill: "Stealth", dc: 10, pass: 7, fail: 6, passMsg: "You glide beneath the sleeping bat colony untouched!", failMsg: "Your boot kicks loose scree—the cavern erupts in leathery wings!" } },
          { t: "Raise your lantern and march boldly into the Bat Cave.", to: 6 }
        ]
      },
      6: {
        zone: "Bat Cave",
        title: "Swarm of the Sea Cave",
        text: "Shrieking cave bats swirl down from the stalactites in a blinding cloud!",
        enemy: { name: "Sea-Cave Bat Swarm", desc: "Frenzied cave bats defending their roost.", hp: 18, ac: 11, atk: 3, dmg: 3, xp: 40, gold: 10, items: rollRandomLoot(["material"], 1, "common"), flee: 5 },
        choices: [
          { t: "Press deeper toward the eerie violet glow at the tidal cove.", to: 7 }
        ]
      },
      7: {
        zone: "Aberrant Acolyte's Shrine",
        title: "Whispers Beneath the Cliff",
        text: "In the forgotten smugglers' sea cave, a twisted cultist kneels before a barnacle-encrusted idol pulled from the deep. 'The beacon stays dark!' the aberrant acolyte hisses, raising a crackling coral staff as tide-water surges around your boots!",
        enemy: { name: "Aberrant Tide Acolyte", desc: "Deep-sea cultist guarding a profane tidal shrine.", hp: 22, ac: 11, atk: 4, dmg: 4, xp: 55, gold: 45, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon") },
        choices: [
          { t: "Shatter the coral idol and return to Northwatch with your survey.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Beacon Restored",
        text: "With the aberrant shrine cleansed and the sea cave mapped, Northwatch's mayor gladly pays the full charter bounty. Within a fortnight, the Marblehead Beacon blazes brightly over safe merchant lanes once more.",
        ending: { type: "true", title: "Keeper of Marblehead Point", xp: 95, gold: 100, trophy: "Northwatch Harbor Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. THE MIDNIGHT TREE (12 PAGES • LV 2)
  // ==========================================================
  bk_pt_02_midnight_tree: {
    id: "bk_pt_02_midnight_tree",
    title: "The Midnight Tree",
    subtitle: "Margreve Forest Ravenfolk Fortress",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Albino Starkfeather Elder (Rusty Flagon Tavern)",
    summary: "Storm the hollowed towering Midnight Tree at the edge of the Margreve Forest and drive out the treacherous Greengloss ravenfolk bandits so the Starkfeather Clan may reclaim their ancestral perch.",
    totalPages: 12,
    pages: {
      1: {
        zone: "Margreve Forest Edge",
        title: "The Hollow Colossus",
        safeRetreat: true,
        text: "Towering above the misty trade road stands the Midnight Tree—an ancient charcoal-barked oak hollowed into a multi-story bandit fortress. The elderly albino matriarch of the Starkfeather Clan promised you all the plunder you can carry if you oust the usurping Greengloss ravenfolk.",
        choices: [
          { t: "Inspect the root-arch entranceway for bandit snares before stepping in.", badge: "Spirit / Perception DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, failDmg: 4, passMsg: "You disarm a tensioned thorn-dart wire hidden in the bark!", failMsg: "A hidden thorn-dart trap snaps across your arm (-4 HP)!" }, onPass: { cw: "SNARES_CLEARED", xp: 15 } },
          { t: "Scale the lower boughs to slip quietly in through a knotted second-floor window.", badge: "Agility / Athletics DC 12", check: { stat: "agility", skill: "Athletics", dc: 12, pass: 3, fail: 2, failDmg: 3, passMsg: "You hoist yourself quietly onto the second-floor ledge, bypassing the front sentries!", failMsg: "Mossy bark slips underfoot—you tumble back to the root door (-3 HP)!" }, onPass: { cw: "BOUGH_INFILTRATOR", xp: 20 } },
          { t: "Creep around the mossy roots to listen at the kitchen vent for guard chatter.", badge: "Agility / Stealth DC 11", check: { stat: "agility", skill: "Stealth", dc: 11, pass: 2, fail: 2, failDmg: 3, passMsg: "You map the sentries' blind spots and snatch a dropped 15 GP dice-pouch!", failMsg: "A dry twig snaps underfoot, drawing an arrow grazing your shoulder (-3 HP)!" }, onPass: { cw: "SNARES_CLEARED", gold: 15 } }
        ]
      },
      2: {
        zone: "Lower Trunk • Guard Room",
        title: "Greengloss Sentries",
        text: "Two black-feathered Greengloss scouts crouch behind timber arrow-slits, rattling bone dice beside a smoky brazier. Spotting you, they mimic a hawk's shriek and draw curved sabres!",
        enemy: { name: "Greengloss Ravenfolk Scouts", desc: "Cunning feathered highwaymen.", hp: 22, ac: 11, atk: 4, dmg: 4, xp: 45, gold: 25, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["SNARES_CLEARED"] },
        choices: [
          { t: "Advance into the Central Hall and check the Jailor's Room.", to: 3 }
        ]
      },
      3: {
        zone: "Second Bough • Jailor's Room",
        title: "The Captive Courier",
        text: "A ring of iron keys hangs beside a cramped wooden cage holding Courier Alaric, a bruised noble messenger captured along the Margreve road. A hulking Greengloss jailor steps from the storeroom, hefting a spiked cudgel!",
        enemy: { name: "Greengloss Jailor", desc: "Cruel ravenfolk turnkey.", hp: 24, ac: 12, atk: 4, dmg: 4, xp: 50, gold: 30, items: rollRandomLoot(["consumable"], 1, "uncommon"), flee: 1, weakCw: ["BOUGH_INFILTRATOR"] },
        choices: [
          { t: "Unlock the cage and free Courier Alaric.", to: 4 },
          { t: "Leave the cells for later and climb toward the Common Room.", to: 5 }
        ]
      },
      4: {
        zone: "The Sticky Hand",
        title: "Sap-Slick Shortcut",
        text: "Freed from his cage, Courier Alaric rubs his wrists and warns you of The Sticky Hand—an amber-sap pit chamber the bandits use to trap intruders. Forewarned, you skirt the adhesive resin along dry bark-ribs and uncover a hidden cubby stuffed with stolen traveler purses!",
        onEnter: { cw: "FREED_COURIER", gold: 55, healHp: 6, msg: "Freed Courier Alaric (FREED_COURIER), avoided the sap trap (+6 HP), and claimed 55 GP!" },
        choices: [
          { t: "Slip up the narrow dumbwaiter loft behind the kitchen to spy on the Common Room.", to: 5 },
          { t: "Climb the winding timber steps straight into the Common Room.", to: 6 }
        ]
      },
      5: {
        zone: "Kitchen Loft • Dumbwaiter Ledge",
        title: "Spiced Wine and Smoke",
        text: "Peering through slatted cedar shutters above the tree's broad midsection, you see three rowdy Greengloss cutthroats feasting on stolen pheasants and uncorked wine casks beside a crackling hearth.",
        choices: [
          { t: "Dust drowsy Margreve poppy-ash into their open wine pitcher from the loft!", badge: "Spirit / Herbalism DC 12", check: { stat: "spirit", skill: "Herbalism", dc: 12, pass: 6, fail: 6, failDmg: 4, passMsg: "The cutthroats gulp down the laced wine, staggering half-drowsy as you drop in!", failMsg: "A loose shutter creaks—a thrown dagger grazes your sleeve (-4 HP)!" }, onPass: { cw: "WINE_DRUGGED", xp: 20 } },
          { t: "Blast the chimney-flue with Firebolt to choke the hall with blinding woodsmoke!", reqSpell: "Firebolt", to: 6 },
          { t: "Drop straight down into the Common Room with steel drawn!", to: 6 }
        ]
      },
      6: {
        zone: "Mid-Trunk • Common Room",
        title: "Feast of Stolen Wine",
        text: "Half-plucked pheasants and stolen casks litter the tree's broad midsection. Three Greengloss cutthroats overturn tables and vault toward you with flashing daggers!",
        enemy: { name: "Greengloss Cutthroats", desc: "Rowdy ravenfolk raiders defending their hoard.", hp: 26, ac: 12, atk: 4, dmg: 5, xp: 60, gold: 35, items: rollRandomLoot(["valuable", "material"], 1, "uncommon"), flee: 3, weakCw: ["WINE_DRUGGED", "FREED_COURIER"] },
        choices: [
          { t: "Pick the lock on the Bandit Treasure Chamber.", badge: "Agility / Lockpicking DC 12", check: { stat: "agility", skill: "Lockpicking", dc: 12, pass: 7, fail: 8, passMsg: "The iron clasp clicks open!", failMsg: "The lock jams—you head straight for the Chieftain's Chamber." } },
          { t: "Ascend directly to the Chieftain's Chamber.", to: 8 }
        ]
      },
      7: {
        zone: "Treasure Chamber",
        title: "Bandit Hoard",
        text: "Two iron-banded chests sit opposite a rack of stolen trade goods. Inside gleam silver trade bars, coin pouches, and an exquisite Starkfeather heirloom cloak woven with pale silver plumage!",
        onEnter: { gold: 65, items: ["bq_starkfeather_cloak"], msg: "Looted 65 GP and the Starkfeather Mantle!" },
        choices: [
          { t: "Peer through a ceiling knothole to study the Chieftain's stance before climbing.", badge: "Spirit / Perception DC 12", check: { stat: "spirit", skill: "Perception", dc: 12, pass: 8, fail: 8, passMsg: "You note his favored off-hand feint before kicking open the hatch!", failMsg: "Dust drifts into your eyes, forcing you straight up the ladder." }, onPass: { cw: "CHIEFTAIN_STUDIED", xp: 20 } },
          { t: "Confront the Greengloss Chieftain above.", to: 8 }
        ]
      },
      8: {
        zone: "Upper Crown • Chieftain's Chamber",
        title: "Lord of the Midnight Tree",
        text: "Draped in stolen silks, the Greengloss Chieftain perches atop a carved mahogany throne. 'That pale old crow sent a ground-walker to do her dirty work?' he mocks, leaping forward with twin wicked blades!",
        enemy: { name: "Greengloss Chieftain", desc: "Agile ravenfolk bandit lord.", hp: 30, ac: 13, atk: 5, dmg: 5, xp: 75, gold: 50, items: rollRandomLoot(["weapon", "accessory"], 1, "rare"), weakCw: ["CHIEFTAIN_STUDIED", "BOUGH_INFILTRATOR"] },
        choices: [
          { t: "Snatch the Chieftain's brass falconer's whistle and climb out toward the canopy!", to: 9 }
        ]
      },
      9: {
        zone: "Canopy Ledge • Below the Aerie",
        title: "Whistle of the Crown",
        text: "Cold forest wind rushes through the high branches as two enormous war-trained Giant Ravens circle the Ceremonial Platform above, talons clicking angrily at the scent of blood.",
        choices: [
          { t: "Blow the Chieftain's brass whistle with a sharp command to rattle the Giant Ravens!", badge: "Spirit / Persuasion DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 10, fail: 10, failDmg: 4, passMsg: "The startled Giant Ravens wheel off-balance—giving you the opening!", failMsg: "A discordant note enrages the lead raven, which rakes your shoulder (-4 HP)!" }, onPass: { cw: "RAVENS_RATTLED", xp: 20 } },
          { t: "Step straight out onto the starlit Ceremonial Platform to meet the Giant Ravens!", to: 10 }
        ]
      },
      10: {
        zone: "Giant Ravens' Aerie",
        title: "Wings Over the Canopy",
        text: "High in the starlit crown of the oak, two massive war-trained Giant Ravens dive with obsidian wings to avenge their fallen master!",
        enemy: { name: "Greengloss Giant Ravens", desc: "Enormous black-winged canopy predators.", hp: 28, ac: 12, atk: 5, dmg: 5, xp: 70, gold: 20, items: rollRandomLoot(["material", "valuable"], 1, "rare"), weakCw: ["RAVENS_RATTLED"] },
        choices: [
          { t: "Signal the Starkfeather Clan and meet Courier Alaric at the root-arch below!", reqCw: "FREED_COURIER", to: 11 },
          { t: "Signal the Starkfeather Clan from the starlit crown of the tree.", to: 12 }
        ]
      },
      11: {
        zone: "Root-Arch Courtyard • Dawn",
        title: "Alaric's Court Favor",
        text: "Waiting beside the charcoal root-arch as dawn breaks over the Margreve, Courier Alaric presses a wax-sealed merchant's purse and a warm flask of spiced cider into your hands. 'The guild courts will hear of your courage today!'",
        onEnter: { gold: 35, xp: 25, healHp: 8, msg: "Courier Alaric's gratitude grants +35 GP, +25 XP, and +8 HP!" },
        choices: [
          { t: "Step forward to greet the returning Starkfeather Clan.", to: 12 }
        ]
      },
      12: {
        zone: "Epilogue",
        title: "Return of the Starkfeathers",
        text: "White-feathered silhouettes glide silently onto the boughs as the albino elder bows solemnly. With the Greengloss driven from the Margreve road, your name is honored among the Starkfeather Clan.",
        ending: { type: "true", title: "Scourge of the Midnight Tree", xp: 120, gold: 110, trophy: "Albino Raven Plume" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. USURPER'S TOWER (8 PAGES • LV 3)
  // ==========================================================
  bk_pt_03_usurpers_tower: {
    id: "bk_pt_03_usurpers_tower",
    title: "Usurper's Tower",
    subtitle: "Borderland Bergfried Rescue",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Oakhaven Militia Captain (Town Square)",
    summary: "Infiltrate the blood-stained border bergfried claimed by the cunning ogre Gragmir and goblin witchdoctor Skorg to rescue local war hero Dagny before Skorg exacts his vengeance.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Borderland Crag",
        title: "The Fallen Bergfried",
        safeRetreat: true,
        text: "Surrounded by shattered curtain walls from a decades-old siege, the stark stone keep known as Usurper's Tower looms over the mountain pass. Smoke curls from its upper arrow-slits—Gragmir the ogre and goblin witchdoctor Skorg hold war hero Dagny captive inside.",
        choices: [
          { t: "Creep up to the ground-floor breach under cover of rubble.", badge: "Stealth DC 11", check: { stat: "agility", skill: "Stealth", dc: 11, pass: 2, fail: 2, failDmg: 4, passMsg: "You slip past the lookout unnoticed!", failMsg: "A goblin sentry looses a jagged arrow from above (-4 HP)!" } },
          { t: "Charge straight through the splintered gatehouse.", to: 2 }
        ]
      },
      2: {
        zone: "Ground Floor",
        title: "Goblinoid Guardhouse",
        text: "Cracked flagstones and rusted shields from the ancient siege litter the guardroom. A pack of snarling hobgoblins and goblin skirmishers overturn a mess table to block the stairs!",
        enemy: { name: "Gragmir's Goblinoid Raiders", desc: "Disciplined borderland hobgoblins and goblin scouts.", hp: 28, ac: 12, atk: 5, dmg: 5, xp: 65, gold: 30, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1 },
        choices: [
          { t: "Examine the iron grate in the floor leading down to the Oubliette.", to: 3 },
          { t: "Press upward to the First Floor barracks.", to: 4 }
        ]
      },
      3: {
        zone: "The Oubliette",
        title: "Dagny in Chains",
        text: "Lowering a rope into the damp stone pit, you find war hero Dagny and two battered militia survivors! 'Skorg's gone mad with vengeance,' Dagny rasps. 'Take my spare blade—Gragmir keeps our gear and the moonstone chest on the upper floor!'",
        onEnter: { cw: "DAGNY_FREED", items: ["bq_dagny_warblade"], healHp: 8, msg: "Freed Dagny! Claimed Dagny's Border Blade and caught your breath (+8 HP)." },
        choices: [
          { t: "Climb back up and storm the First Floor!", to: 4 }
        ]
      },
      4: {
        zone: "First Floor",
        title: "Skorg's Fetish Chamber",
        text: "Bone rattles and smoldering incense choke the first floor. Goblin witchdoctor Skorg screeches curses, waving a skull-topped staff as dark hexes crackle through the air!",
        enemy: { name: "Skorg, Goblin Witchdoctor", desc: "Vengeful hex-slinging goblin shaman.", hp: 30, ac: 12, atk: 5, dmg: 6, xp: 80, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 2 },
        choices: [
          { t: "Search Skorg's bone altar for stolen moonstones and climb to the Second Floor.", to: 5, onChoose: { gold: 40, msg: "Found a pouch of borderland moonstones (40 GP)!" } }
        ]
      },
      5: {
        zone: "Second Floor",
        title: "The Usurper's Hall",
        text: "Faded banners of the long-dead usurper hang above a battered oak chest pinned with daggers. Before you can pry it open, heavy footsteps shake the timber ceiling!",
        choices: [
          { t: "Quickly pry open the trapped treasury chest before Gragmir descends.", badge: "Lockpicking DC 12", check: { stat: "agility", skill: "Lockpicking", dc: 12, pass: 6, fail: 6, failDmg: 5, passMsg: "Disarmed the needle spring and grabbed 50 GP!", failMsg: "A poisoned dart pricks your wrist (-5 HP) as you grab the coins!" }, onPass: { gold: 50 } },
          { t: "Take high ground on the stairwell leading to the Roof.", to: 6 }
        ]
      },
      6: {
        zone: "Tower Roof",
        title: "Gragmir's Last Stand",
        text: "Wind howls across the crenellated roof where the usurper once fell. Towering nine feet tall in scavenged mail, Gragmir hefts a spiked iron beam. 'Little hero wants to bleed on my stones? Come try!'",
        enemy: { name: "Gragmir the Clever Ogre", desc: "Cunning, heavily armored ogre war-chief.", hp: 40, ac: 13, atk: 6, dmg: 7, xp: 115, gold: 80, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "rare"), weakCw: ["DAGNY_FREED"] },
        choices: [
          { t: "Ensure Dagny and her squad are safe before marching back to town.", to: 7 }
        ]
      },
      7: {
        zone: "Border Pass",
        title: "Escort Home",
        text: "With Gragmir cast down from the battlements and Skorg's dark hexes broken, the remaining goblins scatter into the crags. Dagny salutes you as the mountain road opens once more.",
        choices: [
          { t: "Claim your bounty and hero's welcome.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Savior of the Pass",
        text: "Songs of your daring ascent of Usurper's Tower echo through the border taverns, and the local militia honors you with a chest of silver and the gratitude of Dagny's company.",
        ending: { type: "true", title: "Liberator of Usurper's Tower", xp: 145, gold: 135, trophy: "Usurper's Broken Crown" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. RAGANNI'S REDOUBT (9 PAGES • LV 4)
  // ==========================================================
  bk_pt_04_ragannis_redoubt: {
    id: "bk_pt_04_ragannis_redoubt",
    title: "Raganni's Redoubt",
    subtitle: "Triangular Sanctum of the Salt Flats",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Desert Caravan Scholar (Oakhaven Market)",
    summary: "Venture into the blinding Kephani Salt Flats to breach the triangular arcane tower of the vanished archmage Raganni—and stop Bastet priestess Asenath from raising him in undeath.",
    totalPages: 9,
    pages: {
      1: {
        zone: "Kephani Salt Flats",
        title: "The Triangular Mirage",
        safeRetreat: true,
        text: "Shimmering heat ripples across the white salt desert around an impossible three-sided obsidian tower. The sealed portal bears an arcane glyph whispering for a spoken password in ancient desert script.",
        choices: [
          { t: "Decode the desert glyph and speak the password 'Monsoon'.", badge: "Arcana DC 12", check: { stat: "arcana", skill: "Arcana", dc: 12, pass: 2, fail: 2, failDmg: 5, passMsg: "The ward dissolves cleanly—the triangular doors glide wide!", failMsg: "Arcane lightning jolts you (-5 HP) before the seal cracks!" }, onPass: { cw: "WARD_BYPASSED", msg: "Bypassed Raganni's outer ward cleanly!" } },
          { t: "Force the bronze portal hinges with raw strength.", badge: "Might DC 13", check: { stat: "might", skill: "Athletics", dc: 13, pass: 2, fail: 2, failDmg: 5, passMsg: "You wrench the heavy portal open!", failMsg: "The ward scorches you (-5 HP) as the doors finally yield!" } }
        ]
      },
      2: {
        zone: "Front Hall & Library",
        title: "Guardians of the Archive",
        text: "Cool perfumed air greets you inside Raganni's triangular hall. Two jackal-headed sandstone constructs step down from marble alcoves to defend the scroll-lined Library!",
        enemy: { name: "Sandstone Arcane Sentinels", desc: "Animated desert constructs built by Raganni.", hp: 36, ac: 13, atk: 5, dmg: 6, xp: 85, gold: 40, items: rollRandomLoot(["material", "valuable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Explore the Workshop and Summoning Chamber.", to: 3 },
          { t: "Slip into the Hanging Indoor Garden.", to: 4 }
        ]
      },
      3: {
        zone: "Summoning Chamber",
        title: "Bound Dust Mephits",
        text: "A cracked brass binding circle hums on the floor, releasing swirling desert-fire elementals left behind from Raganni's final experiments!",
        enemy: { name: "Bound Desert Mephits", desc: "Cackling creatures of salt-wind and ember.", hp: 34, ac: 13, atk: 6, dmg: 6, xp: 85, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 2 },
        choices: [
          { t: "Claim Raganni's crystal-capped Prism Staff from the workbench and climb higher.", to: 5, onChoose: { items: ["bq_raganni_prism_staff"], msg: "Claimed Raganni's Prism Staff!" } }
        ]
      },
      4: {
        zone: "The Indoor Garden",
        title: "Oasis of Illusions",
        text: "Enchanted sunlight illuminates palm fronds and a clear basin of restorative desert spring water. A carved tablet warns that Raganni's lover, Asenath, has already entered the upper sanctum with his corpse!",
        onEnter: { healHp: 12, restoreMp: 4, cw: "ASENATH_WARNED", msg: "Refreshed by the oasis basin (+12 HP, +4 MP) and learned of Asenath's ritual!" },
        choices: [
          { t: "Ascend to Raganni's Trophy & Treasure Rooms.", to: 5 }
        ]
      },
      5: {
        zone: "Treasure & Crafting Rooms",
        title: "Spools of Gold Thread",
        text: "Silk tapestries, gilded astrolabes, and a dozen spools of spun gold and silver thread glitter behind a shimmering curtain of force.",
        choices: [
          { t: "Unravel the containment rune to raid the vault.", badge: "Arcana / Lockpicking DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 6, fail: 6, failDmg: 5, passMsg: "The curtain drops—you pocket 85 GP in desert gold!", failMsg: "Feedback sparks burn your hands (-5 HP) before the barrier fades." }, onPass: { gold: 85 } },
          { t: "Bypass the vault and hurry straight to Raganni's Bedchamber!", to: 6 }
        ]
      },
      6: {
        zone: "Antechamber",
        title: "Asenath's Temple Guard",
        text: "Gold-masked catfolk zealots loyal to the Bastet priestess bar the stairs to the pinnacle, flashing curved khopeshes!",
        enemy: { name: "Bastet Temple Zealots", desc: "Lithe desert warriors protecting Asenath's ritual.", hp: 38, ac: 14, atk: 6, dmg: 6, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 5 },
        choices: [
          { t: "Burst into Raganni's Bedchamber at the peak of the redoubt!", to: 7 }
        ]
      },
      7: {
        zone: "Raganni's Bedchamber",
        title: "The Soul-Binding Ritual",
        text: "In the apex chamber, Bastet priestess Asenath chants over Raganni's preserved corpse, black soul-fire spiraling toward his eyes! 'You will not steal him from me a second time!' she cries, summoning necrotic desert winds!",
        enemy: { name: "Asenath & Risen Raganni", desc: "Grief-mad Bastet priestess and the half-awakened archmage.", hp: 46, ac: 14, atk: 7, dmg: 7, undead: true, xp: 145, gold: 100, items: rollRandomLoot(["weapon", "accessory", "armor"], 1, "rare"), weakCw: ["ASENATH_WARNED"] },
        choices: [
          { t: "Shatter the soul-binding urn so Raganni may finally rest.", to: 8 }
        ]
      },
      8: {
        zone: "Tower Pinnacle",
        title: "Silence Over the Salt",
        text: "The obsidian urn bursts into harmless sand. As the necromantic storm fades, Raganni's spirit bows once in quiet gratitude before dissolving into the desert sky.",
        choices: [
          { t: "Depart the Kephani Salt Flats with the tower's arcane lore.", to: 9 }
        ]
      },
      9: {
        zone: "Epilogue",
        title: "Secrets of the Redoubt",
        text: "Caravan scholars in Oakhaven pay handsomely for your charts of the Kephani Salt Flats and Raganni's surviving research notes.",
        ending: { type: "true", title: "Master of Raganni's Redoubt", xp: 175, gold: 165, trophy: "Obsidian Triangle Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. RUINS OF GRIMSPIRE (9 PAGES • LV 5)
  // ==========================================================
  bk_pt_05_grimspire: {
    id: "bk_pt_05_grimspire",
    title: "Ruins of Grimspire",
    subtitle: "Ethereal Gate & Phase Spider Nest",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Shepherds of Therun's Vale (Oakhaven Outskirts)",
    summary: "Ascend the cliffside ruins of Grimspire, step through its reawakened Ethereal Gate into a floating mist-tower, and confront the Phase Spider Matriarch hunting Therun's Vale.",
    totalPages: 9,
    pages: {
      1: {
        zone: "Therun's Vale Cliff",
        title: "The Crumbling Landmark",
        safeRetreat: true,
        text: "Crowning a sheer crag above Therun's Vale, Grimspire has stood empty for centuries—until livestock and travelers began vanishing in shimmering silver mists. Thick, pearlescent webs now drape its broken archway.",
        choices: [
          { t: "Study the silver webbing for ethereal residue.", badge: "Arcana / Survival DC 12", check: { stat: "arcana", skill: "Survival", dc: 12, pass: 2, fail: 2, passMsg: "Phase spiders! Their venom strikes from the Ethereal Plane—you ready your reflexes.", failMsg: "The eerie silk resists your blade but reveals little." }, onPass: { cw: "SPIDER_LORE", msg: "Gained SPIDER_LORE (+edge against the brood)!" } },
          { t: "Cut through the curtains of silk and enter the Ground Level.", to: 2 }
        ]
      },
      2: {
        zone: "Ground & First Floor",
        title: "Flickering Ambush",
        text: "Halfway up the crumbling stone steps, the air ripples like heat-haze—two pale, eight-eyed Phase Spiders materialize out of nowhere, fangs dripping paralytic venom!",
        enemy: { name: "Grimspire Phase Spiders", desc: "Planar arachnids flickering between realms.", hp: 40, ac: 14, atk: 6, dmg: 7, xp: 100, gold: 40, items: rollRandomLoot(["material", "consumable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Climb past the collapsed Second Floor to the Ethereal Gate.", to: 3 }
        ]
      },
      3: {
        zone: "Third Floor",
        title: "The Shimmering Gate",
        text: "Where the tower roof once stood, an archway of swirling violet mist hovers above a ring of debris. Buried half in silk beside it gleams a silvered sabre attuned to the planar rift!",
        onEnter: { items: ["bq_ethereal_fang_blade"], msg: "Recovered the Phase-Fang Sabre from the webs!" },
        choices: [
          { t: "Step through the Ethereal Gate into the floating mirror-tower!", to: 4 }
        ]
      },
      4: {
        zone: "Ethereal Tower • Fourth Level",
        title: "Adrift in Silver Mist",
        text: "You emerge inside an intact twin of Grimspire floating in endless grey fog! Gravity feels faintly buoyant as spectral wisps drift past glassless windows.",
        choices: [
          { t: "Search the silk-draped chest buried in the alcove.", badge: "Perception / Lockpicking DC 13", check: { stat: "spirit", skill: "Perception", dc: 13, pass: 5, fail: 5, failDmg: 6, passMsg: "You pull free 75 GP and a healing draught without waking the hatchlings!", failMsg: "Biting spiderlings swarm your hands (-6 HP)!" }, onPass: { gold: 75, healHp: 10 } },
          { t: "Descend carefully toward the pulsing egg-chamber below.", to: 5 }
        ]
      },
      5: {
        zone: "Ethereal Tower • Third Level",
        title: "Hunters in the Fog",
        text: "Three oversized Phase Spider Hunters drop from the ceiling rafters on invisible strands of ethereal silk!",
        enemy: { name: "Ethereal Brood Hunters", desc: "Fierce guardians of the matriarch's lair.", hp: 44, ac: 14, atk: 7, dmg: 7, xp: 115, gold: 50, items: rollRandomLoot(["material", "valuable"], 1, "rare"), flee: 4 },
        choices: [
          { t: "Descend to the Second Level where the air hums with planar energy.", to: 6 }
        ]
      },
      6: {
        zone: "Ethereal Tower • Second Level",
        title: "The Planar Anchor",
        text: "A cracked crystal obelisk anchors the Ethereal Gate open. If you stabilize or reverse its runes, you can seal the rift once the Matriarch falls!",
        choices: [
          { t: "Attune the obelisk to weaken ethereal phasing in the chamber below.", badge: "Arcana DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 7, fail: 7, failDmg: 5, passMsg: "Golden ripples ground the spiders' planar shift!", failMsg: "A feedback pulse numbs your arms (-5 HP)!" }, onPass: { cw: "ANCHOR_TUNED", msg: "Tuned the Planar Anchor!" } },
          { t: "Drop straight down into the First Level Egg-Sanctum.", to: 7 }
        ]
      },
      7: {
        zone: "Ethereal Tower • First Level",
        title: "The Phase Spider Matriarch",
        text: "Towering over glowing clusters of translucent eggs, the colossal Phase Spider Matriarch shrieks like rending silk! Her chitin shimmers between flesh and mist as she lunges!",
        enemy: { name: "Phase Spider Matriarch", desc: "Colossal planar arachnid queen defending her clutch.", hp: 54, ac: 15, atk: 7, dmg: 8, xp: 165, gold: 110, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["SPIDER_LORE", "ANCHOR_TUNED"] },
        choices: [
          { t: "Destroy the rift crystal and sprint back through the closing Ethereal Gate!", to: 8 }
        ]
      },
      8: {
        zone: "Grimspire Summit",
        title: "The Mist Collapses",
        text: "You dive back onto the stone flagstones of Therun's Vale just as the violet archway implodes with a thunderclap, severing the Ethereal Tower from the mortal cliffs forever.",
        choices: [
          { t: "Descend to Therun's Vale to report the victory.", to: 9 }
        ]
      },
      9: {
        zone: "Epilogue",
        title: "Peace in Therun's Vale",
        text: "The grateful villagers pool coins and heirlooms in celebration—Grimspire stands silent once more above safe pastures.",
        ending: { type: "true", title: "Bane of the Ethereal Brood", xp: 205, gold: 190, trophy: "Phase-Crystal Prism" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. RESPITE AT ROUGH RUN (11 PAGES • LV 6)
  // ==========================================================
  bk_pt_06_rough_run: {
    id: "bk_pt_06_rough_run",
    title: "Respite at Rough Run",
    subtitle: "River Fortress of the Marauder Twins",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Riverfolk Council (Oakhaven Market)",
    summary: "While Captain Maren's riverfolk stage a diversion at the marauders' timber dam, infiltrate the heavily trapped island tower in the Rough Run rapids, sabotage its clockwork defenses, and topple the Marauder Twins.",
    totalPages: 11,
    pages: {
      1: {
        zone: "The Rough Run Rapids",
        title: "Island in the Whitewater",
        safeRetreat: true,
        text: "Brass horn-blasts echo downstream—Captain Maren and the riverfolk have begun their diversion at the timber dam! Perched on a slick basalt crag mid-river rises the marauders' four-story toll tower, cold whitewater hissing over its mossy stone quay. You lash a grapnel across the foaming rapids and haul yourself ashore. Ahead, a heavy bronze sluice-door opens onto the ground hall, while along the spray-drenched leeward cliff runs a narrow iron boat-winch ledge leading to a shuttered barge-loft.",
        choices: [
          { t: "Scale the slick boat-winch ledge to slip into the shuttered barge-loft.", badge: "Athletics / Stealth DC 13", check: { stat: "agility", skill: "Athletics", dc: 13, pass: 2, fail: 3, failDmg: 6, passMsg: "You vault onto the iron hoist-beam dry-shod and pry open the barge-loft shutter!", failMsg: "Foaming spray slams you against the crag (-6 HP) before you scramble through the main gate!" } },
          { t: "Study the bronze entrance sluice for mechanical pressure-plates.", badge: "Perception DC 13", check: { stat: "spirit", skill: "Perception", dc: 13, pass: 3, fail: 3, passMsg: "You spot recessed pressure-plate grooves leading into the Hall of a Hundred Spears!", failMsg: "The thunder of the rapids drowns out any mechanical clicks." }, onPass: { cw: "SPEAR_TRAP_SPOTTED", xp: 30, msg: "Spotted the spear-plates in advance (+30 XP)!" } },
          { t: "Wedge the bronze trigger-plates silently before breaching.", badge: "Detect Traps", reqSkill: "Detect Traps", to: 3, onChoose: { cw: "SPEAR_TRAP_SPOTTED", xp: 35, msg: "Jam-pinned the entrance spear-plates silently (+35 XP)!" } }
        ]
      },
      2: {
        zone: "Smuggler's Barge-Loft",
        title: "The Captive River-Pilot",
        text: "Inside the shadowed hoist-loft, tarred rope coils and stolen flour sacks surround a trussed riverfolk pilot named Oren, gagged with oiled canvas. Cutting his ropes, he gasps in relief: 'Bless you! Listen—the twins' whirling blade-traps on the third floor run off a brass drive-chain right behind the second-floor maze's east wall, and the crossbowmen below never look up from the spear-hall!' He presses 40 GP of hidden river-silver into your palm.",
        onEnter: { cw: "GALLERY_FLANKED", gold: 40, xp: 35, msg: "Freed pilot Oren (+40 GP, +35 XP) and gained the tower's blind spots (GALLERY_FLANKED)!" },
        choices: [
          { t: "Climb Oren's narrow rope-dumbwaiter directly into the second-floor Defensive Maze!", badge: "Stealth DC 13", check: { stat: "agility", skill: "Stealth", dc: 13, pass: 4, fail: 3, passMsg: "You haul yourself up the silent chute, bypassing the ground-floor guards entirely!", failMsg: "The rusted pulley shrieks—marauder crossbowmen spot you from the hall below!" }, onPass: { xp: 25 } },
          { t: "Slip out onto the overhead gallery to ambush the Tower Guards from behind!", to: 3 }
        ]
      },
      3: {
        zone: "Hall of a Hundred Spears",
        title: "The Skewer Corridor",
        text: "Iron-tipped spears jut from concealed wall slots the length of the ground hall, guarding the spiral stair. Hardened marauder crossbowmen crouch behind overturned oak tables along the overhead gallery, bolts glinting in the lantern-light!",
        enemy: { name: "Rough Run Tower Guards", desc: "Hardened river-bandit veterans.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 120, gold: 55, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["SPEAR_TRAP_SPOTTED", "GALLERY_FLANKED"] },
        choices: [
          { t: "Weave past the spear-ports and climb into the Defensive Maze above.", to: 4 }
        ]
      },
      4: {
        zone: "Defensive Maze",
        title: "Murder-Holes & False Doors",
        text: "The second floor is a claustrophobic stone labyrinth studded with slit murder-holes, false oak doors, and jammed iron grilles designed to bleed boarders dry. Behind the eastern masonry hums the rhythmic clack-clack of a heavy brass drive-chain feeding the floor above.",
        choices: [
          { t: "Pry open the eastern masonry panel to reach the humming brass drive-chain!", badge: "Athletics / Lockpicking DC 13", check: { stat: "might", skill: "Athletics", dc: 13, pass: 5, fail: 6, failDmg: 6, passMsg: "The iron service plate groans open, revealing the greased gear-shaft!", failMsg: "A concealed spring-bar snaps across your knuckles (-6 HP) as you force the main stair!" } },
          { t: "Track the fresh river-mud boot-scuffs through the true corridor.", badge: "Survival / Perception DC 13", check: { stat: "spirit", skill: "Survival", dc: 13, pass: 6, fail: 6, failDmg: 7, passMsg: "You bypass three dead-end bolt traps cleanly!", failMsg: "A spring-loaded bolt grazes your ribs (-7 HP) before you find the stair!" }, onPass: { xp: 25 } },
          { t: "Smash straight through a weakened timber partition.", badge: "Might DC 14", check: { stat: "might", skill: "Athletics", dc: 14, pass: 6, fail: 6, failDmg: 6, passMsg: "Splinters fly—you cut straight to the third floor!", failMsg: "The reinforced oak jars your arm (-6 HP) before giving way!" }, onPass: { xp: 25 } }
        ]
      },
      5: {
        zone: "Gear-Shaft Vault",
        title: "The Brass Drive-Chain",
        text: "Inside a grease-slick service shaft, a massive bronze flywheel spins furiously, driving the clockwork gears of the Room of Whirling Death directly overhead. Tucked into a mechanic's niche sits a leather pouch holding 55 GP and a jar of thick axle-grease.",
        onEnter: { gold: 55, xp: 30, msg: "Claimed the marauders' gear-vault cache (+55 GP, +30 XP)!" },
        choices: [
          { t: "Wedge a heavy iron crowbar straight into the flywheel teeth to jam the sword-trees!", to: 6, onChoose: { cw: "SWORDS_JAMMED", xp: 30, msg: "With a thunderous shriek of sheared brass, the sword-trees overhead grind to a dead halt (SWORDS_JAMMED, +30 XP)!" } },
          { t: "Ignite the grease-coated flywheel axle with Firebolt to fuse the gears!", badge: "Firebolt", reqSpell: "Firebolt", to: 6, onChoose: { cw: "SWORDS_JAMMED", xp: 35, msg: "Roaring grease-fire warps the drive-shaft, ruining the clockwork traps above (SWORDS_JAMMED, +35 XP)!" } }
        ]
      },
      6: {
        zone: "Room of Whirling Death",
        title: "The Sword Trees",
        text: "The third floor opens into a circular stone chamber scored with concentric brass floor-tracks. Towering iron 'sword trees' bristling with spinning longswords line the room—ready to shred any intruder who missteps!",
        choices: [
          { t: "Stride calmly past the sheared, motionless sword-trees straight to the upper stair!", reqCw: "SWORDS_JAMMED", badge: "SWORDS_JAMMED", to: 7 },
          { t: "Jam the nearest brass floor-track with a fallen spear from the ground hall!", reqCw: "SPEAR_TRAP_SPOTTED", badge: "SPEAR_TRAP_SPOTTED", to: 7, onChoose: { cw: "SWORDS_JAMMED", xp: 25, msg: "The steel spear wedges the track—the sword trees shudder to a screeching halt (+25 XP)!" } },
          { t: "Time the spinning arcs and dash cleanly to the far stair!", badge: "Agility / Athletics DC 14", check: { stat: "agility", skill: "Athletics", dc: 14, pass: 7, fail: 7, failDmg: 8, passMsg: "You tumble gracefully between the whirling blades unscathed!", failMsg: "A spinning steel edge slashes your shoulder (-8 HP)!" }, onPass: { xp: 30 } }
        ]
      },
      7: {
        zone: "Quarters of the Twins",
        title: "The Marauders' Payroll",
        text: "Plush wolf-fur rugs, stolen silk tapestries, and charted maps of the dammed river valley fill the twins' lavish quarters. An iron-bound payroll chest sits locked at the foot of the bunks, while a tarnished copper speaking-tube runs straight up to the roof parapet—carrying the muffled voices of Kael and Korra arguing over the dam diversion!",
        choices: [
          { t: "Crack open the payroll chest before confronting the twins on the roof!", badge: "Lockpicking DC 13", check: { stat: "agility", skill: "Lockpicking", dc: 13, pass: 8, fail: 8, failDmg: 5, passMsg: "Popped the lock! Claimed 110 GP and a Rough Run Twin-Blade!", failMsg: "A poison needle snaps (-5 HP), though you still seize the blade!" }, onPass: { gold: 110, items: ["bq_whirling_edge"] }, onFail: { items: ["bq_whirling_edge"] } },
          { t: "Bark a false alarm up the speaking-tube ('Dam's breached—militia on the north wall!') to rattle them!", badge: "Persuasion DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 8, fail: 8, passMsg: "Curses erupt overhead as the twins break formation to check the north wall!", failMsg: "They laugh down the copper tube and draw their blades at the trapdoor!" }, onPass: { cw: "TWINS_RATTLED", xp: 30, msg: "Rattled the Marauder Twins' coordination (TWINS_RATTLED, +30 XP)!" } },
          { t: "Leave the quarters untouched and burst immediately onto the Rooftop!", to: 8 }
        ]
      },
      8: {
        zone: "Tower Rooftop",
        title: "The Marauder Twins",
        text: "Cold mist rises from the roaring rapids around the open parapet. Back-to-back beneath their tattered black river-banner stand Kael and Korra, the notorious Marauder Twins—twin warlords fighting in deadly synchronized rhythm! 'Our dam, our river, our toll!' they roar in unison as steel flashes through the spray!",
        enemy: { name: "The Marauder Twins", desc: "Synchronized twin warlords commanding the Rough Run.", hp: 62, ac: 15, atk: 8, dmg: 9, xp: 190, gold: 130, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["SWORDS_JAMMED", "TWINS_RATTLED"] },
        choices: [
          { t: "Light the green alchemical signal flare atop the parapet for Captain Maren!", to: 9 }
        ]
      },
      9: {
        zone: "The Broken Dam",
        title: "Waters Unleashed",
        text: "Emerald fire streaks into the dusk above the rapids. Seeing their warlords' black standard topple from the island spire, the marauders guarding the dam fling down their weapons and scatter into the pines. Moments later, Captain Maren's riverfolk knock loose the sluice-pins, sending fresh water roaring downstream!",
        choices: [
          { t: "Ferry the salvaged toll-ledgers back to the Oakhaven river quay.", to: 10 }
        ]
      },
      10: {
        zone: "Oakhaven River Quay",
        title: "The Tolls Burned",
        text: "Lanterns bob along the crowded dock as cheering bargemen toss the marauders' extortion ledgers onto a crackling bonfire. The Riverfolk Council presents you with the twins' shattered bronze crest and your full share of the bounty.",
        choices: [
          { t: "Accept the Council's reward and complete the quest.", to: 11 }
        ]
      },
      11: {
        zone: "Epilogue",
        title: "Freedom of the Rough Run",
        text: "Merchant barges glide freely along the restored Rough Run once more, and the riverfolk of the valley hail you as the breaker of the Marauder Twins' tyranny.",
        ending: { type: "true", title: "Breaker of the Rough Run", xp: 240, gold: 220, trophy: "Twin Warlords' Crest" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. SOLANNA BAEL (8 PAGES • LV 7)
  // ==========================================================
  bk_pt_07_solanna_bael: {
    id: "bk_pt_07_solanna_bael",
    title: "Solanna Bael",
    subtitle: "Ancient Elven Archive Spire",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Elven Emissary (Guildhall)",
    summary: "Ascend the alpine elven archive Solanna Bael ('History Guarded by its Makers'), pass its three living trials of battle, knowledge, and schism, and unlock the Vault of Ages.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Southern Mountain Ridge",
        title: "History Guarded by its Makers",
        safeRetreat: true,
        text: "Above the timberline gleams Solanna Bael—a slender spire of pearlescent elven stone etched with silver constellations. Its archway parts silently at your approach, revealing the first trial chamber.",
        choices: [
          { t: "Enter the Chamber of Lost Battles with weapon drawn.", to: 2 },
          { t: "Bow respectfully to the elven inscriptions before stepping inside.", badge: "Arcana / Lore DC 13", check: { stat: "spirit", skill: "Lore", dc: 13, pass: 2, fail: 2, passMsg: "The archive recognizes your reverence—the wards hum peacefully!", failMsg: "The runes remain cold and watchful." }, onPass: { cw: "ELVEN_RESPECT", msg: "Earned ELVEN_RESPECT within the archive!" } }
        ]
      },
      2: {
        zone: "Chamber of Lost Battles",
        title: "The Possessed Pillar",
        text: "In the center of a frescoed rotunda, a marble statue of an ancient blademaster holds an ornate silver sword point-down upon its palms—the first key to the Vault of Ages. The moment you lift the blade, the stone pillar animates in a swirl of arcane fire!",
        enemy: { name: "Possessed Elven Pillar", desc: "Animated marble sentinel of the Lost Battles.", hp: 56, ac: 15, atk: 8, dmg: 9, xp: 155, gold: 65, items: ["bq_solanna_keyblade"], flee: 1 },
        choices: [
          { t: "Bear the Archive Keyblade upward to the Chamber of Lost Knowledge.", to: 3 }
        ]
      },
      3: {
        zone: "Chamber of Lost Knowledge",
        title: "Riddle of the Star-Tomes",
        text: "Floating crystal lecterns orbit a glowing globe of starlight. A resonant voice asks which pillar sustains an empire when steel fails: Conquest, Gold, or Memory?",
        choices: [
          { t: "Answer 'Memory—for without history, a people forget who they are.'", to: 4, onChoose: { cw: "MEMORY_ANSWER", healHp: 12, restoreMp: 5, msg: "The starlight warms you (+12 HP, +5 MP) and unlocks the next seal!" } },
          { t: "Attempt to force the arcane lock with raw magical energy.", badge: "Arcana DC 14", check: { stat: "arcana", skill: "Arcana", dc: 14, pass: 4, fail: 4, failDmg: 8, passMsg: "Your spell harmonizes with the star-globe!", failMsg: "Starfire lashes back (-8 HP) before the seal yields!" } }
        ]
      },
      4: {
        zone: "Chamber of Societal Schism",
        title: "Echoes of the Sundering",
        text: "Spectral figures of high-elven mages and shadow-cloaked exiles clash endlessly across a mirrored floor! As you cross, two shimmering Echo Wardens turn their spectral spears upon you!",
        enemy: { name: "Schism Echo Wardens", desc: "Manifested phantoms of ancient elven civil war.", hp: 60, ac: 15, atk: 8, dmg: 9, undead: true, xp: 170, gold: 80, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 3 },
        choices: [
          { t: "Insert the Keyblade into the gilded doors of the Vault of Ages.", to: 5 }
        ]
      },
      5: {
        zone: "Threshold of the Vault",
        title: "The Final Seal",
        text: "Three concentric rings of star-metal lock the Vault of Ages. Ancient ward-constructs hover beside the threshold, weighing your worthiness.",
        choices: [
          { t: "Present the Keyblade and invoke the wisdom of Memory.", reqCw: "MEMORY_ANSWER", badge: "MEMORY_ANSWER", to: 6, onChoose: { cw: "VAULT_BLESSED", msg: "The Vault opens with a chime of silver bells—its guardian weakens!" } },
          { t: "Turn the Keyblade and prepare to face the Vault Guardian!", to: 6 }
        ]
      },
      6: {
        zone: "Vault of Ages",
        title: "Keeper of the Archive",
        text: "Within the domed vault gleam millennia of elven manuscripts, star-charts, and jeweled regalia. Rising from the floor mosaic, a radiant Astral Sentinel raises a halberd of pure starlight for your final trial!",
        enemy: { name: "Astral Archive Sentinel", desc: "Supreme magical construct guarding Solanna Bael.", hp: 70, ac: 16, atk: 9, dmg: 10, xp: 225, gold: 150, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["ELVEN_RESPECT", "VAULT_BLESSED"] },
        choices: [
          { t: "Claim the sealed scrolls of elven heritage from the Vault.", to: 7 }
        ]
      },
      7: {
        zone: "Vault of Ages",
        title: "Legacy Reclaimed",
        text: "The Sentinel kneels and fades into golden motes. You carefully pack the priceless historical codices to return to the elven emissaries waiting in Oakhaven.",
        choices: [
          { t: "Descend the mountain spire in triumph.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Worthy of Solanna Bael",
        text: "The elven emissary weeps with joy upon receiving the lost histories of Solanna Bael, rewarding you with an enormous purse and eternal renown among the elder folk.",
        ending: { type: "true", title: "Champion of Solanna Bael", xp: 280, gold: 265, trophy: "Starlight Codex of Solanna" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. THE GUILDMASTER'S RETREAT (9 PAGES • LV 8)
  // ==========================================================
  bk_pt_08_guildmasters_retreat: {
    id: "bk_pt_08_guildmasters_retreat",
    title: "The Guildmaster's Retreat",
    subtitle: "Windward Tower Heist & Showdown",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Harbor Magistrate Bounty Notice (Town Square)",
    summary: "Breach Windward Tower high on the harbor cliffs, outsmart the deadly traps and decoys of thieves' guildmaster Jerron Vaine, and collect the massive bounty on his head.",
    totalPages: 9,
    pages: {
      1: {
        zone: "Harbor Cliffs",
        title: "Windward Tower",
        safeRetreat: true,
        text: "Perched above crashing surf, Windward Tower is the heavily fortified hideout of master thief Jerron Vaine. Whether to recover stolen heirlooms or claim the city's massive bounty, you stand before its iron-studded Entry Hall.",
        choices: [
          { t: "Check the entry lock and floor tiles for poison needles.", badge: "Perception / Lockpicking DC 14", check: { stat: "agility", skill: "Lockpicking", dc: 14, pass: 2, fail: 2, failDmg: 8, passMsg: "Disarmed a spring-dart in the keyhole and slipped inside!", failMsg: "A concealed dart nicks your palm (-8 HP) as the lock clicks open!" } },
          { t: "Scale the ivy-clad kitchen chimney into the servants' wing.", badge: "Athletics DC 14", check: { stat: "might", skill: "Athletics", dc: 14, pass: 3, fail: 2, failDmg: 7, passMsg: "You drop quietly into the Pantry behind the guards!", failMsg: "A loose stone sends you tumbling back to the entry steps (-7 HP)!" } }
        ]
      },
      2: {
        zone: "Dining Hall & Parlor",
        title: "Vaine's Hired Blades",
        text: "Beneath crystal chandeliers, three cloaked guild assassins rise from the velvet settees, drawing balanced rapiers!",
        enemy: { name: "Windward Guild Assassins", desc: "Elite thieves' guild bodyguards.", hp: 64, ac: 15, atk: 8, dmg: 9, xp: 175, gold: 85, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Search the Parlor bookshelves for a hidden passage.", to: 3 }
        ]
      },
      3: {
        zone: "Servants' Hall & Secret Room",
        title: "Behind the Wainscoting",
        text: "A hollow sconce swings open a narrow maintenance passage bypassing the main stairs! Inside hangs a blueprint showing that Vaine's 'Treasure Room' is a lethal decoy!",
        onEnter: { cw: "DECOY_KNOWN", gold: 65, msg: "Found Vaine's blueprints (DECOY_KNOWN) and a stash of 65 GP!" },
        choices: [
          { t: "Ascend to the Trophy Room and False Treasure Room.", to: 4 }
        ]
      },
      4: {
        zone: "Trophy Room",
        title: "Stolen Splendor",
        text: "Glass cases display royal signets, jeweled daggers, and gilded masks stolen from across the realm. Two clockwork hound-constructs spring to life from the corners!",
        enemy: { name: "Clockwork Vault Hounds", desc: "Whirring brass-and-steel guard constructs.", hp: 66, ac: 16, atk: 9, dmg: 9, xp: 185, gold: 90, items: rollRandomLoot(["material", "valuable"], 1, "very_rare"), flee: 3 },
        choices: [
          { t: "Ignore the trapped False Treasure Room and open the true secret vault!", reqCw: "DECOY_KNOWN", badge: "DECOY_KNOWN", to: 5 },
          { t: "Test the gleaming gilded door marked with Vaine's crest.", to: 6 }
        ]
      },
      5: {
        zone: "True Secret Room",
        title: "Vaine's Emergency Stash",
        text: "Sliding aside a mirrored panel in Vaine's bathroom reveals his real escape cache: bags of platinum trade coin, healing draughts, and his prized Shadow Mantle!",
        onEnter: { gold: 135, healHp: 15, items: ["bq_vaine_shadow_mantle"], msg: "Raided Vaine's true stash (+135 GP, +15 HP, Guildmaster Vaine's Mantle)!" },
        choices: [
          { t: "Burst up the stairs onto the Roof before Vaine escapes!", to: 7 }
        ]
      },
      6: {
        zone: "False Treasure Room",
        title: "The Gilded Gas Trap",
        text: "The gilded chest clicks—releasing choking sleeping-gas and a hail of spring-loaded darts! Coughing violently, you dive out through the shattered door toward the rooftop stairs.",
        onEnter: { dmg: 10, msg: "Caught in Vaine's decoy trap (-10 HP)!" },
        choices: [
          { t: "Sprint up to the Roof to cut off Jerron Vaine!", to: 7 }
        ]
      },
      7: {
        zone: "Windward Roof",
        title: "Duel With the Guildmaster",
        text: "Salt wind whips across the slate roof where a tethered glider awaits! Jerron Vaine turns with an effortless smirk, twirling twin poisoned stilettos. 'Impressive climb—pity your story ends over the rocks!'",
        enemy: { name: "Guildmaster Jerron Vaine", desc: "Cunning master thief armed with poisoned twin blades.", hp: 78, ac: 16, atk: 10, dmg: 10, xp: 255, gold: 180, items: rollRandomLoot(["weapon", "accessory", "cloak"], 1, "very_rare"), weakCw: ["DECOY_KNOWN"] },
        choices: [
          { t: "Bind Vaine in iron cuffs and signal the harbor watch.", to: 8 }
        ]
      },
      8: {
        zone: "Harbor Watch",
        title: "Justice on the Cliffs",
        text: "Lanterns bob up the cliff road as the Harbor Magistrate's guards arrive to take the notorious guildmaster into custody.",
        choices: [
          { t: "Collect the full magistrate's bounty!", to: 9 }
        ]
      },
      9: {
        zone: "Epilogue",
        title: "Fall of the Guildmaster",
        text: "With Jerron Vaine captured alive and his stolen hoards accounted for, the harbor merchants toast your cunning and pay out a legendary reward.",
        ending: { type: "true", title: "Bane of Windward Tower", xp: 315, gold: 310, trophy: "Vaine's Master Skeleton Key" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. SPIRE OF THE SUN GOD (9 PAGES • LV 9)
  // ==========================================================
  bk_pt_09_spire_sun_god: {
    id: "bk_pt_09_spire_sun_god",
    title: "Spire of the Sun God",
    subtitle: "Sealed Temple of Divine Trials",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "High Priest of the Dawn (Temple of the Dawn)",
    summary: "Enter the centuries-sealed Spire of the Sun God, prove your virtue in the Tests of the Saints and Light, and purge the Gilded Apostate imprisoned at its summit.",
    totalPages: 9,
    pages: {
      1: {
        zone: "Sun-Bleached Courtyard",
        title: "The Unsealed Spire",
        safeRetreat: true,
        text: "For centuries the golden Spire of the Sun God stood sealed by divine wrath after evil overran its decadent clergy. Guided by fresh omens, the High Priest has entrusted you to pass the spire's sacred trials and cleanse any lingering taint.",
        choices: [
          { t: "Step reverently into the Entry Hall and Sacristy.", to: 2 },
          { t: "Offer a brief prayer at the sun-dial threshold.", badge: "Spirit DC 13", check: { stat: "spirit", skill: "Lore", dc: 13, pass: 2, fail: 2, passMsg: "Warm golden radiance blesses your armor (+10 HP)!", failMsg: "The sun-dial remains silent." }, onPass: { healHp: 10, cw: "SUN_FAVOR", msg: "Received SUN_FAVOR!" } }
        ]
      },
      2: {
        zone: "Sacristy & Vestry",
        title: "Ashes of the Corrupt",
        text: "Tarnished thuribles and scorched vestments litter the Sacristy. Wreathed in dark smoke, ash-wraiths of the fallen invaders rise to bar the Sanctuary doors!",
        enemy: { name: "Cinder-Wraith Invaders", desc: "Scorched undead remnants of the spire's desecrators.", hp: 72, ac: 16, atk: 9, dmg: 10, undead: true, xp: 205, gold: 95, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Pass through the Sanctuary to the Test of the Saints.", to: 3 }
        ]
      },
      3: {
        zone: "Test of the Saints",
        title: "Sword, Stone, and Pitcher",
        text: "Three marble pedestals bear a steel sword, a rough hearthstone, and a silver water pitcher before a statue of a kneeling pilgrim. The inscription reads: 'What first restores the weary traveler in the desert?'",
        choices: [
          { t: "Place the silver pitcher into the pilgrim's outstretched hands.", to: 4, onChoose: { cw: "SAINTS_PASSED", healHp: 14, msg: "Pure light bathes the chamber (+14 HP)—the Test of the Saints is passed!" } },
          { t: "Place the sword in the statue's hands.", to: 4, onChoose: { dmg: 9, msg: "Radiant fire rebukes your pride (-9 HP), though the stair opens!" } }
        ]
      },
      4: {
        zone: "Test of Light",
        title: "Hall of Mirrors",
        text: "Blinding shafts of focused sunlight crisscross a circular gallery. Shadow-fiends lurking in the dark alcoves lunge whenever a beam shifts!",
        enemy: { name: "Eclipse Shadow-Fiends", desc: "Darkness-born creatures trapped between sunbeams.", hp: 76, ac: 16, atk: 10, dmg: 10, undead: true, xp: 215, gold: 105, items: rollRandomLoot(["material", "valuable"], 1, "very_rare"), flee: 3 },
        choices: [
          { t: "Align the central prism mirror to illuminate the upper shrine.", badge: "Spirit / Arcana DC 14", check: { stat: "spirit", skill: "Perception", dc: 14, pass: 5, fail: 5, failDmg: 7, passMsg: "Golden light floods the upper chamber—the Sun God's Boons open!", failMsg: "A stray beam sears your cloak (-7 HP) before clicking into place!" }, onPass: { cw: "LIGHT_ALIGNED" } }
        ]
      },
      5: {
        zone: "Sun God's Boons",
        title: "Chamber of Radiance",
        text: "A floating solar orb warms the gilded sanctuary, offering divine restoration and an ancient relic medallion to the faithful before the final ascent.",
        onEnter: { healHp: 20, restoreMp: 8, items: ["bq_sun_god_thurible"], msg: "Blessed by the Sun God (+20 HP, +8 MP) and claimed the Gilded Sun-Spire Medallion!" },
        choices: [
          { t: "Unseal the Prison of the Gilded Apostate at the spire's crown!", to: 6 }
        ]
      },
      6: {
        zone: "Prison of the Gilded Apostate",
        title: "The Fallen High Cleric",
        text: "Chained in melted gold within the domed apex stands the Gilded Apostate—the treacherous priest who first opened the spire to darkness! Breaking free in a roar of profane flame, he raises a blackened sun-mace!",
        enemy: { name: "The Gilded Apostate", desc: "Cursed fallen arch-priest clad in molten gold.", hp: 90, ac: 17, atk: 11, dmg: 12, undead: true, xp: 295, gold: 210, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["SUN_FAVOR", "SAINTS_PASSED", "LIGHT_ALIGNED"] },
        choices: [
          { t: "Consecrate the apex altar with the purified solar flame.", to: 7 }
        ]
      },
      7: {
        zone: "Spire Crown",
        title: "Dawn Reborn",
        text: "A pillar of golden morning light pierces the clouds above the spire, visible for leagues around. The ancient curse is broken at last.",
        choices: [
          { t: "Descend to report the reconsecration to the Temple of the Dawn.", to: 8 }
        ]
      },
      8: {
        zone: "Temple of the Dawn",
        title: "Bells of Triumph",
        text: "Every bell in Oakhaven tolls in celebration as the clergy proclaim the Spire of the Sun God reclaimed.",
        choices: [
          { t: "Accept the High Priest's solemn blessing and reward.", to: 9 }
        ]
      },
      9: {
        zone: "Epilogue",
        title: "Herald of the Sun Spire",
        text: "Your name is inscribed in gold upon the temple pillars, and the faithful shower you with consecrated coin and relics.",
        ending: { type: "true", title: "Purifier of the Sun Spire", xp: 365, gold: 350, trophy: "Crown of Solar Radiance" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. STORMCALLER'S TOWER (12 PAGES • LV 10)
  // ==========================================================
  bk_pt_10_stormcallers_tower: {
    id: "bk_pt_10_stormcallers_tower",
    title: "Stormcaller's Tower",
    subtitle: "Lightning-Crowned Mountain Spire",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Desperate Border Lord (Oakhaven Guildhall)",
    summary: "Climb the lightning-lashed mountain pinnacle of the Storm God's fanatics, survive the Hall of Coronas and Cascading Energy, and end the devastating tempest in the Cathedral of the Tempest.",
    totalPages: 12,
    pages: {
      1: {
        zone: "Thunderhead Peak",
        title: "Spikes of Burning Sky",
        safeRetreat: true,
        text: "Black thunderheads churn around a jagged iron-spiked tower perched on the mountain crest. Every few seconds, blinding spears of lightning strike the crown and course down copper conduits into the stone! Below in the valley, unnatural hurricanes threaten to wipe out an entire settlement.",
        choices: [
          { t: "Dash across the charged bridge between lightning strikes!", badge: "Agility / Athletics DC 15", check: { stat: "agility", skill: "Athletics", dc: 15, pass: 2, fail: 2, failDmg: 10, passMsg: "You dive through the bronze doors just ahead of a thunderbolt!", failMsg: "Arcing static scorches your armor (-10 HP) as you burst inside!" } },
          { t: "Ground your gear with a copper anchor-chain before crossing.", badge: "Arcana / Arcana DC 14", check: { stat: "arcana", skill: "Arcana", dc: 14, pass: 2, fail: 2, passMsg: "Your makeshift grounding tether wards off stray arcs!", failMsg: "The gale snaps the chain before you cross." }, onPass: { cw: "STORM_GROUNDED", msg: "Gained STORM_GROUNDED protection!" } },
          { t: "Scale the wind-scoured rain-gutter ledge to slip in through the upper maintenance grate!", badge: "Might / Athletics DC 15", check: { stat: "might", skill: "Athletics", dc: 15, pass: 3, fail: 2, failDmg: 8, passMsg: "You pry open the copper grate above the guardroom, bypassing the front sentries!", failMsg: "A wet handhold gives way (-8 HP), dropping you onto the bridge outside the bronze doors!" }, onPass: { cw: "GUTTER_INFILTRATOR", xp: 35 } }
        ]
      },
      2: {
        zone: "Entry Hall & Antechamber",
        title: "Disciples of the Gale",
        text: "Ozone stings your throat as armored Stormcaller Zealots chant around crackling iron braziers, hurling javelins of thunder down the nave!",
        enemy: { name: "Stormcaller Temple Guards", desc: "Lightning-infused warrior-priests of the Storm God.", hp: 82, ac: 16, atk: 10, dmg: 11, xp: 240, gold: 115, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["STORM_GROUNDED"] },
        choices: [
          { t: "Inspect the muffled knocking behind the copper maintenance grate beside the stairs.", to: 3 },
          { t: "Ascend directly into the crackling Hall of Coronas.", to: 4 }
        ]
      },
      3: {
        zone: "Lower Maintenance Gallery",
        title: "The Captive Weather-Warden",
        text: "Inside a cramped conduit gallery huddles Warden Torin, a bruised border-lord weather-seer chained beside a humming grounding-rod. 'They forced me to tune their storm-mirrors,' he whispers hoarsely. 'Free me and I'll give you the shutdown sequence for the Surge Room capacitors above!'",
        choices: [
          { t: "Pick Torin's lightning-locked shackles and learn his capacitor shutdown sequence.", badge: "Agility / Lockpicking DC 15", check: { stat: "agility", skill: "Lockpicking", dc: 15, pass: 4, fail: 4, failDmg: 6, passMsg: "The lock snaps open! Torin presses 65 GP and a healing salve (+10 HP, +5 MP) into your hand before slipping down the back stair!", failMsg: "A static ward bites your knuckles (-6 HP) before Torin's chain finally gives way." }, onPass: { cw: "WARDEN_FREED", xp: 40, gold: 65, hp: 10, mp: 5 } },
          { t: "Wrench the rusted iron anchor-ring straight out of the wet masonry!", badge: "Might / Athletics DC 15", check: { stat: "might", skill: "Athletics", dc: 15, pass: 4, fail: 4, failDmg: 6, passMsg: "Stone crumbles as the ring pops free! Grateful, Torin shares the Surge Room sequence and 65 GP!", failMsg: "Sparks jump the chain (-6 HP) as you yank Torin loose." }, onPass: { cw: "WARDEN_FREED", xp: 40, gold: 65 } },
          { t: "Promise to return once the storm breaks and hurry up to the Hall of Coronas.", to: 4 }
        ]
      },
      4: {
        zone: "Hall of Coronas",
        title: "Orbs of St. Elmo's Fire",
        text: "Floating spheres of violet-blue plasma drift between tall copper pillars, coalescing into twin Air Elementals roaring with mountain thunder!",
        enemy: { name: "Tempest Lightning Elementals", desc: "Living cyclones crackling with mountain thunder.", hp: 86, ac: 17, atk: 11, dmg: 11, xp: 255, gold: 120, items: rollRandomLoot(["material", "valuable"], 1, "very_rare"), flee: 3, weakCw: ["STORM_GROUNDED", "GUTTER_INFILTRATOR"] },
        choices: [
          { t: "Climb the bronze spiral stair into the humming Surge Room.", to: 5 }
        ]
      },
      5: {
        zone: "Surge Room",
        title: "The Copper Capacitors",
        text: "Massive copper coils store the mountain's fury behind glass insulators, channeling raw lightning straight into the High Stormcaller's cathedral above. Disabling the primary shunt will gut the tempest's power!",
        choices: [
          { t: "Pull Warden Torin's exact three-valve shutdown sequence to bleed the coils dry!", reqCw: "WARDEN_FREED", to: 6 },
          { t: "Overload the copper shunt valve carefully using arcane grounding!", badge: "Arcana / Arcana DC 15", check: { stat: "arcana", skill: "Arcana", dc: 15, pass: 6, fail: 7, failDmg: 10, passMsg: "Sparks shower harmlessly as half the coils go dark!", failMsg: "A violent surge blasts you backward (-10 HP) toward the upper stair!" }, onPass: { cw: "COILS_DRAINED", xp: 35 } },
          { t: "Snip the insulated trigger-wires along the pressure manifold.", badge: "Agility / Detect Traps DC 15", check: { stat: "agility", skill: "Detect Traps", dc: 15, pass: 6, fail: 7, failDmg: 10, passMsg: "You sever the live leads cleanly and pocket 70 GP in pure silver relay-bars!", failMsg: "An arc leaps from the manifold (-10 HP), forcing you up the stairs!" }, onPass: { cw: "COILS_DRAINED", gold: 70, xp: 35 } },
          { t: "Leave the screaming coils alone and climb straight to the Hall of Cascading Energy.", to: 7 }
        ]
      },
      6: {
        zone: "Surge Room • Dead Coils",
        title: "Power Bleed",
        text: "With a deep resonant thrum, half the towering copper coils gutter out into harmless blue embers! Upstairs, the howling gale drops a full octave—stripping the High Stormcaller of his strongest tempest-wards.",
        onEnter: { cw: "COILS_DRAINED", mp: 6, xp: 30, msg: "Capacitors drained (COILS_DRAINED)! Ambient static restores +6 MP and +30 XP!" },
        choices: [
          { t: "Climb past the dimming conduits into the Hall of Cascading Energy.", to: 7 }
        ]
      },
      7: {
        zone: "Hall of Cascading Energy",
        title: "Treasury of the Tempest",
        text: "Crackling waterfalls of lightning frame a shielded obsidian alcove holding the cult's tribute: electrum bracers, uncut mountain opals, and a gleaming Winged Helm chased in gold!",
        onEnter: { gold: 150, items: ["bq_tempest_winged_helm"], healHp: 15, msg: "Claimed 150 GP, the Stormcaller's Winged Helm, and caught your breath (+15 HP)!" },
        choices: [
          { t: "Step onto the outer storm-balcony to scout the Cathedral's wind-currents first.", to: 8 },
          { t: "Throw open the bronze doors straight into the Cathedral of the Tempest!", to: 9 }
        ]
      },
      8: {
        zone: "Outer Storm-Balcony",
        title: "Eye of the Gale",
        text: "Clinging to the rain-slick parapet above a sheer two-thousand-foot drop, you peer through the open arches of the Cathedral. The High Stormcaller hovers amid three silver tuning-spires that focus the mountain hurricane.",
        choices: [
          { t: "Shatter the windward tuning-spire with Firebolt before vaulting inside!", reqSpell: "Firebolt", to: 9 },
          { t: "Time the brief lulls between thunderbolts to strike from the High Stormcaller's blind side.", badge: "Spirit / Perception DC 15", check: { stat: "spirit", skill: "Perception", dc: 15, pass: 9, fail: 9, failDmg: 7, passMsg: "You spot the exact rhythm of the storm-arcs—gaining a decisive tactical edge!", failMsg: "Driving hail lashes your face (-7 HP) as you duck back inside." }, onPass: { cw: "EYE_OF_STORM", xp: 30 } },
          { t: "Drop back inside and kick open the Cathedral's bronze doors!", to: 9 }
        ]
      },
      9: {
        zone: "Cathedral of the Tempest",
        title: "Wrath of the High Stormcaller",
        text: "Open to the raging sky beneath a forest of glowing iron spires, the Cathedral of the Tempest roars like a waterfall. Floating amid blue lightning, the High Stormcaller raises his storm-staff: 'No mortal defies the Thunder Lord! Perish in the gale!'",
        enemy: { name: "High Stormcaller of the Peak", desc: "Master tempest-cleric channeling the mountain hurricane.", hp: 104, ac: 17, atk: 12, dmg: 13, xp: 345, gold: 250, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["STORM_GROUNDED", "COILS_DRAINED", "EYE_OF_STORM"] },
        choices: [
          { t: "Shatter the central lightning-conduit spire!", to: 10 }
        ]
      },
      10: {
        zone: "Cathedral of the Tempest • Summit",
        title: "The Sky Clears",
        text: "You drive steel into the humming electrum core of the central spire. With a deafening crack that shakes the peak, the iron conduit splits apart—uncoiling the black thunderheads into silver mist as warm golden sunlight breaks across the valley far below!",
        choices: [
          { t: "Meet Warden Torin at the valley keep and report the spire's fall.", reqCw: "WARDEN_FREED", to: 11 },
          { t: "Descend the sunlit mountain switchbacks to the valley keep.", to: 12 }
        ]
      },
      11: {
        zone: "Valley Keep • Warden's Tribute",
        title: "Grateful Seer of the Border",
        text: "At the keep's barbican, townsfolk spill out of storm-cellars cheering as Warden Torin hurries forward with the border lord's own signet-pouch—pressing an extra purse of electrum coin and a warm restorative draught into your pack for sparing his life!",
        onEnter: { gold: 90, xp: 50, healHp: 20, msg: "Warden Torin's gratitude grants +90 GP, +50 XP, and a restorative draught (+20 HP)!" },
        choices: [
          { t: "Accept the valley's tribute and ride back to Oakhaven in triumph.", to: 12 }
        ]
      },
      12: {
        zone: "Valley Keep • Epilogue",
        title: "Conqueror of the Tempest",
        text: "The grateful border lord empties his war-chest in tribute as clear blue sky stretches unbroken from Thunderhead Peak to Oakhaven. For seasons to come, bards at the Rusty Flagon sing of the hero who climbed into the lightning itself and silenced the Stormcaller's Tower.",
        ending: { type: "true", title: "Tempest-Breaker of the Peak", xp: 420, gold: 410, trophy: "Electrum Lightning Crown" },
        choices: []
      }
    }
  }
});
