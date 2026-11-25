/* ============================================================
   EXPANSION QUESTS — UNDERWORLD LAIRS (14 Adventures)
   ============================================================ */
window.OAKHAVEN.registerQuests({
	  // ==========================================================
      // 1. THE SANGUINE LODGE (10 PAGES • LV 2 • AUTO-DISCOVERED)
      // ==========================================================
      ul_sanguine_lodge: {
        id: "ul_sanguine_lodge",
        title: "The Sanguine Lodge",
        subtitle: "Mountain Waystation of the Red Goddess",
        difficulty: "Medium",
        recommendedLevel: 2,
        autoDiscover: true,
        discoverySource: "Weeping Mother Mira (Tavern) or Quest Board",
        summary: "Infiltrate a cozy mountain lodge run by spies of the Red Goddess, uncover the secret wine-rack prison, and free captives from a Swordbreaker Skeleton.",
        totalPages: 10,
        pages: {
          1: { zone:"Pelerin Pass", title:"Beneath the Firs", safeRetreat:true, text:"Heavy timber doors carved with a crimson-stained crown welcome travelers to the Sanguine Lodge. A warm chimney smokes against the mountain chill, while a quiet stable sits beside the main porch.", choices:[
            { t:"Enter the Common Room peaceably as a traveler.", to:2 },
            { t:"Inspect the unlocked stable and covered wagon first.", to:3 },
            { t:"Circle around back to the Kitchen door.", badge:"Stealth DC 9", check:{ stat:"agility", skill:"Stealth", dc:9, pass:4, fail:2, passMsg:"You slip quietly up to the kitchen porch!", failMsg:"Wolf-hounds bark inside—you're forced to use the front door!" } }
          ]},
          2: { zone:"Common Room", title:"Anton & Kalena Sorokin", text:"A roaring hearth warms bear-fur rugs as innkeepers Anton and Kalena size you up beside two massive wolf-dogs. 'Only one bunkroom left in the east wing,' Kalena smiles too sweetly.", choices:[
            { t:"Bluff them with a convincing traveler's tale.", badge:"Persuasion DC 10", check:{ stat:"spirit", skill:"Persuasion", dc:10, pass:4, fail:5, passMsg:"They lower their guard, letting you slip toward the kitchen!", failMsg:"Anton whistles—the wolf-dogs lunge across the rugs!" } },
            { t:"Draw steel and expose the Red Goddess spies!", to:5 }
          ]},
          3: { zone:"Lodge Stables", title:"The Pilgrim Wagon", text:"Inside the cultists' transport wagon you find iron shackles hidden beneath blankets, a Brooch of the Red Crown, and random traveler supplies!", onEnter:{ cw:"SHACKLES_SEEN", items:["ul_crimson_crown_pin", ...rollRandomLoot(["consumable","valuable"], 1, "uncommon")], msg:"Found Brooch of the Red Crown & random supplies!" }, choices:[
            { t:"Enter the Common Room.", to:2 },
            { t:"Slip around to the Kitchen back door.", to:4 }
          ]},
          4: { zone:"Kitchen", title:"The Gruel Pot & Trapdoor", text:"Besides hearty stew, a cauldron of watery prison gruel simmers over the hearth. A heavy trapdoor sits in the corner, and a faint draft leaks from a secret wall panel to the east.", choices:[
            { t:"Descend the trapdoor into the Cellar.", to:7 },
            { t:"Sneak through the secret panel into the East Wing.", badge:"Perception / Stealth DC 10", check:{ stat:"spirit", skill:"Perception", dc:10, pass:6, fail:6, failDmg:2, passMsg:"You catch the raiders off guard!", failMsg:"A creaking floorboard alerts the guards (-2 HP)!" }, onPass:{ cw:"EAST_SURPRISE" } }
          ]},
          5: { zone:"Common Room", title:"Ambush by the Hearth", text:"Anton and Kalena flick hidden daggers as their snarling wolf-dogs leap forward!", enemy:{ name:"Sorokin Spies & Hounds", desc:"Cultist innkeepers and their hounds.", hp:20, ac:11, atk:3, dmg:4, xp:40, gold:24, items: rollRandomLoot(["consumable","valuable"], 1, "uncommon"), flee:1 }, choices:[
            { t:"Check the East Wing barracks.", to:6 },
            { t:"Head through the Kitchen down to the Cellar.", to:7 }
          ]},
          6: { zone:"East Wing", title:"Morgau Raiders", text:"A Red Goddess Cult Fanatic and two Morgau raiders burst from the guest rooms with drawn steel!", enemy:{ name:"Red Goddess Raiders", desc:"Escorts bound for Morgau.", hp:21, ac:11, atk:4, dmg:4, xp:44, gold:28, items: rollRandomLoot(["weapon","armor","consumable"], 1, "uncommon"), weakCw:["EAST_SURPRISE"], flee:1 }, choices:[
            { t:"Free the pilgrims in the West Wing & head to the Cellar.", to:7, onChoose:{ cw:"PILGRIMS_FREED", xp:20, msg:"Freed the pilgrims in the West Wing (+20 XP)!" } }
          ]},
          7: { zone:"Cellar", title:"The Wine Rack Secret", text:"Sacks of root vegetables hang above salted meats. Behind the massive wine rack on the eastern wall, you hear the unmistakable sound of running water and quiet sobbing!", choices:[
            { t:"Find the hidden catch and swing open the wine rack.", badge:"Perception / Lockpicking DC 9", check:{ stat:"spirit", skill:"Perception", dc:9, pass:8, fail:8, failDmg:2, passMsg:"The rack swings open silently!", failMsg:"A falling bottle nicks your brow (-2 HP) as you force the rack!" } }
          ]},
          8: { zone:"Hidden Prison", title:"The Veteran Swordbreaker", text:"An underground stream rushes past iron cages holding eight exhausted captives! Standing watch with fossilized, blade-cracking bones is a Veteran Swordbreaker Skeleton!", enemy:{ name:"Veteran Swordbreaker Skeleton", desc:"Fossilized undead warden.", hp:25, ac:12, atk:4, dmg:5, undead:true, xp:65, gold:35, items:["ul_swordbreaker_blade", ...rollRandomLoot(["valuable","consumable"], 1, "rare")] }, choices:[
            { t:"Unlock the cages and crack open the lodge's treasure chest!", to:9 }
          ]},
          9: { zone:"Hidden Prison", title:"Captives Freed", text:"Across the stream sits the lodge's locked strongbox! Inside rest 45 GP and random salvaged valuables as the grateful prisoners cheer.", onEnter:{ gold:45, items: rollRandomLoot(["valuable","consumable","accessory"], 1, "rare"), msg:"Looted 45 GP & random treasure!" }, choices:[
            { t:"Escort the freed captives back down Pelerin Pass to Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Mercy on Pelerin Pass", text:"Weeping Mother Mira embraces her rescued kin in Oakhaven's square, pressing a reward pouch into your hands as word spreads of the Sanguine Lodge's fall!", ending:{ type:"true", title:"Liberator of the Sanguine Lodge", xp:95, gold:95, trophy:"Crimson Crown Seal" }, choices:[] }
        }
      },

      // ==========================================================
      // 2. BASTION OF THE DERANGED (13 PAGES • LV 2 • AUTO-DISCOVERED)
      // ==========================================================
      ul_bastion_deranged: {
        id: "ul_bastion_deranged",
        title: "Bastion of the Deranged",
        subtitle: "Graknir's Derro Cave Outpost",
        difficulty: "Medium",
        recommendedLevel: 2,
        autoDiscover: true,
        discoverySource: "Underworld Trade Rumor or Quest Board",
        summary: "Breach a spiked iron gatehouse run by mad derro alchemists, rescue Oakhaven's missing salt-caravan, and overthrow Shaman Graknir.",
        totalPages: 13,
        pages: {
          1: { zone:"Bastion Gate", title:"The Spiked Iron Gates", safeRetreat:true, text:"Three nights ago, Caravan-Master Tovin's salt-train vanished down the western subterranean trade road. Here, a jagged iron portcullis bristling with rusted spikes seals the basalt arch. Through a low viewing slit, a pale, wild-eyed derro sentry twirls a hooked aklys club, muttering about 'surface-sunlight thieves' and 'Graknir's grand crystal chair.'", choices:[
            { t:"Feed the paranoid sentry an absurdly solemn tale about delivering 'bottled moonbeams' for Graknir.", badge:"Persuasion DC 9", check:{ stat:"spirit", skill:"Persuasion", dc:9, pass:2, fail:3, passMsg:"The sentry giggles wildly, salutes with his hooked club, and unbolts the wicket door!", failMsg:"'SUN-SPIES!' he shrieks, slamming the slit and rallying the gatehouse!" }, onPass:{ cw:"DERRO_PASS" } },
            { t:"Wait for the sentry to laugh at his own shadow and pick the rusted wicket lock.", reqSkill:"Lockpicking", badge:"Lockpicking", to:2 },
            { t:"Squeeze through the narrow drainage culvert beneath the eastern gate-post.", badge:"Stealth / Agility DC 10", check:{ stat:"agility", skill:"Stealth", dc:10, pass:2, fail:3, failDmg:2, passMsg:"You wriggle through the damp culvert and slip inside unseen!", failMsg:"Loose scree clatters down the grate—rusty iron scrapes your arm (-2 HP) as guards rush in!" } },
            { t:"Put your shoulder to the rusted wicket and smash straight through the spiked gate!", to:3, onChoose:{ dmg:3, msg:"Iron spikes graze your shoulder (-3 HP) as you burst into the hall!" } }
          ]},
          2: { zone:"Entry Hall", title:"Guano, Lanterns & Low Walls", text:"You slip inside the fortified vestibule. Pale mushroom-oil lanterns hiss over waist-high stone barricades, and frantic chalk tally-marks on the wall count 'live surface specimens' dragged deeper inside. Three arched passages branch outward: the southern tunnel reeks of musky feathers and wet limestone; the eastern passage echoes with leathery wings and harness buckles; and the northern arch glows with sickly violet mist.", choices:[
            { t:"Investigate the musky Cockatrice Coop to the south.", to:4 },
            { t:"Creep through the Giant Bat Roost to the east.", to:5 },
            { t:"Slip into the violet-lit Fungus Garden to the north.", to:6 }
          ]},
          3: { zone:"Entry Hall", title:"Derro Gatehouse Skirmish", text:"Three cackling Derro Guards vault over the low stone barricades, snapping hooked aklys clubs on leather thongs as mushroom-oil lanterns sway overhead!", enemy:{ name:"Derro Gatehouse Guards", desc:"Wild-eyed subterranean fanatics defending the spiked gate.", hp:20, ac:11, atk:4, dmg:4, xp:42, gold:22, items: rollRandomLoot(["consumable","material"], 1, "uncommon"), flee:1 }, choices:[
            { t:"Investigate the Cockatrice Coop to the south.", to:4 },
            { t:"Press east into the Giant Bat Roost.", to:5 },
            { t:"Slip north into the Deadly Fungus Garden.", to:6 }
          ]},
          4: { zone:"Cockatrice Coop", title:"The Petrification Keeper", text:"Iron-mesh pens rattle with four agitated, scaly-winged Cockatrices! Beside a cluttered workbench stacked with glass jars labeled 'Stone-to-Flesh Balm,' a grinning derro alchemist prods a life-sized limestone statue of a terrified Oakhaven outrider—still clutching a broken caravan lantern!", enemy:{ name:"Derro Keeper & Cockatrices", desc:"Hissing scaly birds and their mad alchemist handler.", hp:22, ac:11, atk:4, dmg:4, xp:48, gold:20, items:["ul_stone_flesh_balm", ...rollRandomLoot(["material","valuable"], 1, "uncommon")], flee:2 }, choices:[
            { t:"Smear a dab of Stone-to-Flesh Balm across the petrified outrider to revive him.", to:11 },
            { t:"Pocket the balm and move east through the Giant Bat Roost.", to:5 },
            { t:"Circle back north toward the glowing Fungus Garden.", to:6 }
          ]},
          5: { zone:"Bat Roost", title:"Wings in the Dark", text:"Eight horse-sized subterranean riding bats hang inverted from the vaulted stalactites above guano-slick mounds and pegged leather saddles. A brass alarm-bell dangles beside the far archway leading directly into Shaman Graknir's Testing Chamber.", choices:[
            { t:"Glide silently beneath the sleeping rafters.", badge:"Stealth / Agility DC 10", check:{ stat:"agility", skill:"Stealth", dc:10, pass:7, fail:7, failDmg:4, passMsg:"You slip beneath the leathery canopy without waking a single beast!", failMsg:"Startled riding bats swoop through the dark, slashing your cloak (-4 HP)!" } },
            { t:"Slash the saddle-tethers and hurl a stone at the alarm-bell to stampede the bats into Graknir's hall!", badge:"Agility / Survival DC 11", check:{ stat:"agility", skill:"Survival", dc:11, pass:7, fail:7, failDmg:4, passMsg:"The bell clangs and eight panicked riding bats thunder straight into Graknir's sanctum!", failMsg:"A startled bat clips your shoulder (-4 HP) before the flock scatters into the rafters!" }, onPass:{ cw:"BATS_STAMPEDED" } },
            { t:"Scatter them with Firebolt and drive the panicked flock straight into Graknir's chamber!", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:7, onChoose:{ cw:"BATS_STAMPEDED", msg:"Blazing sparks send the giant riding bats shrieking straight into Graknir's hall!" } },
            { t:"Double back north to check the Deadly Fungus Garden first.", to:6 }
          ]},
          6: { zone:"Deadly Garden", title:"The Spore-Choked Zombies", text:"Terraced beds of bloated violet toadstools hiss pale hallucinatory spores into the humid air. Three slack-jawed zombie gardeners—former tunnel-delvers—tend the rows with rusted trowels beside a dry supply alcove stacked with stolen caravan lockboxes and a narrow ventilation shaft.", choices:[
            { t:"Read the spore-drafts with Herbalism and slip past the gardeners into the supply alcove.", badge:"Spirit / Herbalism DC 10", check:{ stat:"spirit", skill:"Herbalism", dc:10, pass:12, fail:7, failDmg:4, passMsg:"You hold your breath, time the vents, and reach the dry alcove untouched!", failMsg:"Bitter violet spores sear your lungs (-4 HP), forcing you to stumble forward into the next chamber!" } },
            { t:"Banish the shambling gardeners with Turn Undead and raid the alcove freely!", reqSpell:"Turn Undead", mp:3, badge:"Turn Undead (3 MP)", to:12, onChoose:{ msg:"Sacred radiance scatters the spore-choked zombies into the dark corners!" } },
            { t:"Ignite the drifting spore-cloud with Firebolt to burn a clean path to the alcove!", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:12, onChoose:{ msg:"The violet haze flashes away in a brief curtain of harmless blue flame!" } },
            { t:"Skirt the outer wall and push straight toward Graknir's Testing Chamber.", to:7 }
          ]},
          7: { zone:"Testing Chamber", title:"Graknir's Mad Devices", text:"Copper tubing coils around a towering iron chair studded with pulsing amethyst shards, wired to a ceiling stalactite by a taut brass grounding-chain. Beside a bubbling vat of emerald sludge, Caravan-Master Tovin hangs bound in hemp ropes—bruised, but alive. From behind an obsidian altar steps Shaman Graknir, Speaker to the Darkness, his white hair bristling with static and a notched aklys crackling in his fist. 'Ah! A fresh vessel brimming with surface-fire! Sit, sit—the Darkness hungers!'", choices:[
            { t:"Use Outrider Bram's warning: sever the brass grounding-chain to overload Graknir's crystal chair!", reqCw:"BRAM_RESCUED", badge:"BRAM_RESCUED", to:8, onChoose:{ cw:"CRYSTAL_SHATTERED", msg:"SNAP! Violet sparks erupt across the altar, shattering Graknir's crystal conduit and staggering him!" } },
            { t:"Spot the unstable amethyst conduit yourself and smash it before Graknir finishes chanting!", badge:"Arcana / Perception DC 11", check:{ stat:"arcana", skill:"Perception", dc:11, pass:8, fail:8, failDmg:3, passMsg:"You shatter the grounding crystal in a shower of purple sparks, disrupting Graknir's ritual!", failMsg:"Arcane static lashes your knuckles (-3 HP) as Graknir completes his incantation!" }, onPass:{ cw:"CRYSTAL_SHATTERED" } },
            { t:"Play along with Graknir's madness—pretend to kneel by the chair, then strike when he leans close!", badge:"Persuasion / Spirit DC 10", check:{ stat:"spirit", skill:"Persuasion", dc:10, pass:8, fail:8, passMsg:"Graknir cackles with delight and leans right into your blade—caught completely off guard!", failMsg:"His wild eyes narrow—'Trickster! Burn with the rest!'" }, onPass:{ cw:"GRAKNIR_FLANKED" } },
            { t:"Charge straight across the chamber before he can finish his chant!", to:8 }
          ]},
          8: { zone:"Graknir's Chamber", title:"Shaman of the Darkness", text:"Acrid incense swirls around a leering basalt bat-idol as Shaman Graknir shrieks dissonant incantations and hurls snapping arcs of subterranean shadow across the flagstones!", enemy:{ name:"Graknir, Derro Shaman", desc:"Deranged Speaker to the Darkness who rules the bastion.", hp:27, ac:12, atk:4, dmg:5, xp:70, gold:48, items:["ul_derro_aklys", ...rollRandomLoot(["consumable","valuable","accessory"], 1, "rare")], weakCw:["GRAKNIR_FLANKED","CRYSTAL_SHATTERED","BATS_STAMPEDED"] }, choices:[
            { t:"Cut Caravan-Master Tovin free and claim Graknir's brass strongbox key.", to:9 }
          ]},
          9: { zone:"Graknir's Chamber", title:"Spoils of the Bastion", text:"With Graknir overthrown, the amethyst shards on the iron chair dim and cool. You slash Tovin's hemp bindings—the salt-merchant collapses in relief, thanking you profusely for sparing him from Graknir's 'sun-siphon.' Using the key from Graknir's sash, you unlock his fur-lined chest to claim 50 GP and confiscated caravan goods.", onEnter:{ gold:50, items: rollRandomLoot(["weapon","armor","valuable","consumable"], 1, "rare"), msg:"Claimed 50 GP & random bastion loot!" }, choices:[
            { t:"Escort Tovin back to the spiked gatehouse where Outrider Bram is waiting.", reqCw:"BRAM_RESCUED", badge:"BRAM_RESCUED", to:13 },
            { t:"Unbar the trade tunnel and escort Tovin back to Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Bastion Cleared", text:"With Graknir overthrown and the surviving derro scattered into the sunless fissures below, the spiked iron gates are pried open for good. Back at the Rusty Flagon, Caravan-Master Tovin raises a foaming tankard in your honor while Oakhaven's guildmasters celebrate the reopening of the western Underworld salt-road!", ending:{ type:"true", title:"Conqueror of the Deranged Bastion", xp:100, gold:105, trophy:"Bat-Idol of Graknir" }, choices:[] },
          11: { zone:"Cockatrice Coop", title:"Outrider Bram's Warning", text:"The pale mineral crust flakes away in chalky ribbons as Outrider Bram gasps back to life, clutching his bruised ribs. 'Bless you, delver!' he wheezes. 'That mad shaman Graknir has Caravan-Master Tovin strapped to a crystal-studded iron chair up ahead! Listen—a brass grounding-chain bolts that chair to a ceiling stalactite. Snap that chain and his whole dark apparatus will blow back in his face!' Bram presses his spare healing tonic into your palm and limps back to hold the gate.", onEnter:{ cw:"BRAM_RESCUED", items:["healing_potion"], msg:"Revived Outrider Bram (BRAM_RESCUED) & received a Healing Potion!" }, choices:[
            { t:"Creep east through the Giant Bat Roost toward Graknir's sanctum.", to:5 },
            { t:"Circle north through the Deadly Fungus Garden to flank Graknir.", to:6 }
          ]},
          12: { zone:"Barracks Alcove", title:"Caravan Lockboxes & Air-Shaft", text:"Inside the dry stone alcove behind the mushroom beds, you pry open a brass-banded lockbox stamped with Oakhaven's oak-leaf seal—recovering 35 GP and a crumpled ledger detailing Graknir's 'Sun-Siphon.' Better still, a narrow ventilation crawlspace opens right behind the crimson curtains of the Testing Chamber, letting you drop directly at the shaman's back!", onEnter:{ gold:35, cw:"GRAKNIR_FLANKED", msg:"Recovered 35 GP & found a flanking air-shaft behind Graknir (GRAKNIR_FLANKED)!" }, choices:[
            { t:"Drop silently through the air-shaft into Graknir's Testing Chamber.", to:7 }
          ]},
          13: { zone:"Bastion Gate", title:"Reunion at the Iron Arch", text:"At the spiked iron gatehouse, Outrider Bram leaps up from behind a salt-crate with a grin as wide as a wagon-wheel when he sees Caravan-Master Tovin walking out alive. Clapping each other's shoulders, the two merchants insist on pressing an extra 30 GP purse into your palm before the three of you unbar the trade road together.", onEnter:{ gold:30, msg:"Tovin & Bram reward you with an extra 30 GP for bringing them both home!" }, choices:[
            { t:"March back to Oakhaven in triumph!", to:10 }
          ]}
        }
      },

      // ==========================================================
      // 3. MIDDEN OF THE FLAYED (10 PAGES • LV 3)
      // ==========================================================
      ul_midden_flayed: {
        id: "ul_midden_flayed",
        title: "Midden of the Flayed",
        subtitle: "The Bone Pit Beneath the Butchery",
        difficulty: "Medium-Hard",
        recommendedLevel: 3,
        discoverySource: "Tunnel-Scout Derrick (Tavern)",
        summary: "Rappel down a terrifying sinkhole beneath the darakhul Butchery, strike a bargain with a carrion-collecting otyugh, and slay the Crawling Charnel.",
        totalPages: 10,
        pages: {
          1: { zone:"Sinkhole Ledge", title:"Death and Darkness", safeRetreat:true, text:"Flickering light and faint cries echo from the Butchery hole high above. A taut rope drops at a steep angle into the 100-foot chasm, while shadowy Darkmantles cling to the ceiling.", choices:[
            { t:"Zip-line swiftly down the rope past the Darkmantles!", badge:"Agility / Athletics DC 10", check:{ stat:"agility", skill:"Athletics", dc:10, pass:2, fail:2, failDmg:4, passMsg:"You land cleanly on the lower ledge!", failMsg:"A rough landing bruises your ribs (-4 HP)!" } },
            { t:"Climb down slowly and fight off the swooping Darkmantles.", to:2, onChoose:{ dmg:2, msg:"Darkmantles graze you (-2 HP) before you kick them off!" } }
          ]},
          2: { zone:"Rattleclack Alley", title:"Vengeful Bones & Bear Traps", text:"Cracked humanoid bones carpet the stalagmite passage—concealing rusted bear traps looted by undead!", choices:[
            { t:"Spot and disarm the hidden bear traps.", reqSkill:"Perception", badge:"Perception", to:3, onChoose:{ msg:"You step cleanly around five hidden jaws!" } },
            { t:"Pick your way carefully across the bone-field.", badge:"Agility DC 10", check:{ stat:"agility", skill:"Survival", dc:10, pass:3, fail:3, failDmg:4, passMsg:"Not a single trap snaps!", failMsg:"CLANK! Iron jaws bite your boot (-4 HP)!" } }
          ]},
          3: { zone:"Bridge of Sorrows", title:"The Bloody Ambush", text:"Across a swaying rope bridge stand three blood-stained explorer tents. Two skinless Bloody Bones leap from the canvas with gleaming claws!", enemy:{ name:"Bloody Bones Stalkers", desc:"Horrific undead drawn to the sinkhole.", hp:24, ac:12, atk:4, dmg:5, undead:true, xp:56, gold:30, items: rollRandomLoot(["consumable","valuable"], 2, "rare"), flee:1 }, choices:[
            { t:"Recover Derrick's lost pack & rappel into the Bone Pit.", to:4, onChoose:{ gold:35, msg:"Recovered 35 GP & explorer tokens from the tents!" } }
          ]},
          4: { zone:"The Bone Pit", title:"Yellow-Green Glow", text:"Bioluminescent fungus dimly lights a towering mound of bones at the cavern's floor. Two side caves branch off: a gnawed den of Exiled Ghouls west, and a weirdly sorted skull-cave east.", choices:[
            { t:"Investigate the sorted bone piles in the eastern cave.", to:5 },
            { t:"Raid the Den of the Exiled Beggar Ghouls to the west.", to:6 },
            { t:"Climb straight onto the central Bone Mound!", to:8 }
          ]},
          5: { zone:"Collector's Cave", title:"The Carrion Collector", text:"Bones are sorted neatly by ribs and femurs! A tentacled Otyugh rumbles in broken Common: 'Kill pesky beggar-ghouls west... I help smash big bone-monster AND give shiny!'", choices:[
            { t:"Agree to its bargain and go clear the Beggar Ghouls!", to:6, onChoose:{ cw:"OTYUGH_PACT", msg:"Struck a bargain with the Otyugh (OTYUGH_PACT)!" } },
            { t:"Slay the Otyugh and take its shinies now!", to:7 }
          ]},
          6: { zone:"Den of Exiles", title:"Exiled Beggar Ghouls", text:"Eight starving Beggar Ghouls exiled from the Imperium snarl and swarm from the shadows!", enemy:{ name:"Exiled Beggar Ghouls", desc:"Ravenous outcast undead.", hp:25, ac:11, atk:4, dmg:5, undead:true, xp:60, gold:25, items: rollRandomLoot(["material","valuable"], 1, "rare"), flee:4 }, choices:[
            { t:"Return to the Otyugh to claim its help and shiny reward!", reqCw:"OTYUGH_PACT", badge:"OTYUGH_PACT", to:8, onChoose:{ cw:"OTYUGH_ALLY", gold:55, items:["ul_onyx_fang_dagger"], msg:"The Otyugh gifts its Onyx Dagger & 55 GP, and joins the fight!" } },
            { t:"Confront the heaving mass in the Bone Pit!", to:8 }
          ]},
          7: { zone:"Collector's Cave", title:"Wrath of the Otyugh", text:"Tentacles whip through the sorted bone piles as the Otyugh attacks!", enemy:{ name:"Carrion Otyugh", desc:"Territorial subterranean scavenger.", hp:26, ac:12, atk:5, dmg:5, xp:65, gold:55, items:["ul_onyx_fang_dagger"], flee:4 }, choices:[
            { t:"Face the monstrosity in the central Bone Pit!", to:8 }
          ]},
          8: { zone:"The Bone Pit", title:"The Crawling Charnel", text:"The entire central bone mound heaves upright—a massive, tangled horror of biting skulls and clawing hands animated by stray necromancy: The Crawling Charnel!", enemy:{ name:"The Crawling Charnel", desc:"Huge amalgam of animated bones and sinew.", hp:34, ac:13, atk:5, dmg:6, undead:true, xp:115, gold:80, items:["ul_charnel_maul", ...rollRandomLoot(["valuable","accessory"], 1, "very_rare")], weakCw:["OTYUGH_ALLY"] }, choices:[
            { t:"Escape through the Collector's exit tunnel!", to:9 }
          ]},
          9: { zone:"Exit Tunnel", title:"Out of the Pit", text:"You emerge into a quiet upper tunnel with Derrick's recovered insignia and a heavy satchel of bone-pit treasure.", onEnter:{ gold:40, items: rollRandomLoot(["consumable","valuable"], 1, "rare"), msg:"Found 40 GP & random treasure!" }, choices:[
            { t:"Return to Tunnel-Scout Derrick in Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Survivor of the Midden", text:"Derrick raises a solemn toast to his fallen crew as you hand over their tokens. The Crawling Charnel is shattered, and the hidden passage is clear!", ending:{ type:"true", title:"Vanquisher of the Flayed Midden", xp:120, gold:130, trophy:"Charnel Bone-Crown" }, choices:[] }
        }
      },

      // ==========================================================
      // 4. CAMP SICARIUS (10 PAGES • LV 3)
      // ==========================================================
      ul_camp_sicarius: {
        id: "ul_camp_sicarius",
        title: "Camp Sicarius",
        subtitle: "The Compromised Drow Outpost",
        difficulty: "Medium-Hard",
        recommendedLevel: 3,
        discoverySource: "Hooded Envoy Vaelis (Tavern)",
        summary: "Infiltrate a canyon camp of desperate drow, survive trapdoor spiders and punji pits, and unmask Commander Nizana's horrific undead secret.",
        totalPages: 10,
        pages: {
          1: { zone:"Canyon Mouth", title:"Sentry Picket & Tripwires", safeRetreat:true, text:"Oak trees shade a narrow stream cutting into the hills. Thin bell-tripwires glint in the brush while camouflaged drow scouts watch from the branches.", choices:[
            { t:"Give Vaelis's secret call-signs to be escorted inside.", to:3, onChoose:{ cw:"DROW_TRUCE", msg:"The drow scouts lower their crossbows and escort you in!" } },
            { t:"Disarm the tripwires and sneak past the picket.", badge:"Stealth / Perception DC 10", check:{ stat:"agility", skill:"Stealth", dc:10, pass:2, fail:2, failDmg:3, passMsg:"You slip past the scouts unseen!", failMsg:"A bell chimes—a drow bolt grazes your arm (-3 HP)!" } }
          ]},
          2: { zone:"Mid Canyon", title:"Trapdoor Spider Ambush", text:"Cleared dirt hides punji pit traps and two massive Trapdoor Spiders bursting from covered burrows!", enemy:{ name:"Drow Trapdoor Spiders", desc:"Trained canyon ambush predators.", hp:23, ac:11, atk:4, dmg:5, xp:52, gold:20, items: rollRandomLoot(["consumable","material"], 1, "rare"), flee:1 }, choices:[
            { t:"Advance to the Officers' Camp.", to:3 }
          ]},
          3: { zone:"Officers' Camp", title:"Lieutenant Ryld's Suspicions", text:"Drow Mage Ryld meets you beside three silk tents, glancing nervously at rival officers Sabrae and Thriza. 'Commander Nizana hasn't eaten a bite since returning from the Underworld—and her robes smell of the grave!'", choices:[
            { t:"Investigate the camp & laundry for proof of Nizana's secret.", badge:"Perception / Lore DC 10", check:{ stat:"spirit", skill:"Perception", dc:10, pass:4, fail:5, passMsg:"You find half-burned darakhul missives under a bush!", failMsg:"Sabrae and Thriza catch you snooping!" }, onPass:{ cw:"NIZANA_EXPOSED" } },
            { t:"Storm straight into the Warded Cave to confront Nizana!", to:6 }
          ]},
          4: { zone:"Officers' Camp", title:"Alliance With Ryld", text:"Seeing the forged ghoul letters, Ryld's eyes widen. 'She's a darakhul infiltrator! Take this spidersilk mantle—I'll back your blade when we confront her!'", onEnter:{ cw:"RYLD_ALLY", items:["ul_sicarius_silk"], msg:"Gained RYLD_ALLY & Spidersilk Mantle of Sicarius!" }, choices:[
            { t:"Enter the Warded Cave behind the brush!", to:6 }
          ]},
          5: { zone:"Officers' Camp", title:"Rival Officers' Ambush", text:"Priestess Sabrae and Veteran Thriza draw poisoned blades to silence you!", enemy:{ name:"Sabrae & Thriza", desc:"Ambitious drow officers.", hp:25, ac:12, atk:4, dmg:5, xp:60, gold:40, items: rollRandomLoot(["consumable","valuable"], 1, "rare"), flee:1 }, choices:[
            { t:"Push past them into the Warded Cave!", to:6 }
          ]},
          6: { zone:"Warded Cave", title:"The Glyph of Warding", text:"Spider-silk rolls and supply casks line a narrow cliff cave. A faint abjuration rune hums across the floor before the Commander's Quarters!", choices:[
            { t:"Dispel or spot the Glyph with Detect Traps / Arcana.", badge:"Arcana / Perception DC 11", check:{ stat:"arcana", skill:"Perception", dc:11, pass:7, fail:7, failDmg:4, passMsg:"You step cleanly over the paralyzing rune!", failMsg:"The rune flashes, jolting your nerves (-4 HP)!" } },
            { t:"Cast Arcane Shield and stride right over it.", reqSpell:"Arcane Shield", mp:3, badge:"Arcane Shield (3 MP)", to:7 }
          ]},
          7: { zone:"Commander's Quarters", title:"Commander Nizana Unmasked", text:"Beside an underground pool stands Commander Nizana. When confronted, her drow illusion drops—revealing the pallid flesh and fangs of a Darakhul High Priestess!", choices:[
            { t:"Expose her before Ryld and strike together!", reqCw:"NIZANA_EXPOSED", badge:"NIZANA_EXPOSED", to:8 },
            { t:"Duel the Darakhul Commander alone!", to:8 }
          ]},
          8: { zone:"Commander's Quarters", title:"Arcane Storm in the Cavern", text:"Crackling lightning and necrotic stench fill the cave as Nizana unleashes her full undead fury!", enemy:{ name:"Nizana, Darakhul Infiltrator", desc:"Undead spellcaster impersonating a drow commander.", hp:33, ac:13, atk:5, dmg:6, undead:true, xp:115, gold:95, items:["ul_black_pearl_brooch", ...rollRandomLoot(["weapon","accessory","consumable"], 1, "very_rare")], weakCw:["RYLD_ALLY","NIZANA_EXPOSED"] }, choices:[
            { t:"Open Nizana's locked footlocker!", to:9 }
          ]},
          9: { zone:"Commander's Quarters", title:"The Traitor's Footlocker", text:"Inside rest Nizana's darakhul orders, 60 GP, and random drow treasures. Ryld assumes command of Camp Sicarius and pledges an alliance against the Ghoul Imperium.", onEnter:{ gold:60, items: rollRandomLoot(["valuable","consumable"], 1, "rare"), msg:"Claimed 60 GP & random drow loot!" }, choices:[
            { t:"Return to Envoy Vaelis in Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Scourge of the Traitor", text:"Envoy Vaelis bows deeply in the Rusty Flagon and slides a heavy satchel of drow gold across the table. Camp Sicarius stands secure!", ending:{ type:"true", title:"Savior of Camp Sicarius", xp:125, gold:140, trophy:"Drow Signet of Alliance" }, choices:[] }
        }
      },

      // ==========================================================
      // 5. SKULLCAP FOREST (10 PAGES • LV 3)
      // ==========================================================
      ul_skullcap_forest: {
        id: "ul_skullcap_forest",
        title: "Skullcap Forest",
        subtitle: "Colony of the Deathcap Myconids",
        difficulty: "Medium",
        recommendedLevel: 3,
        discoverySource: "Spore-Picker Orlo (Tavern)",
        summary: "Explore a glowing mushroom jungle tended by deathcap myconids, identify toxic skullcaps, and survive a darakhul ambush.",
        totalPages: 10,
        pages: {
          1: { zone:"Forest Edge", title:"The Blue-Lit Canopy", safeRetreat:true, text:"Flickering blue fungi light a massive subterranean grove of giant mushrooms. Two silent Deathcap Myconids step out from behind towering stalks to watch your approach.", choices:[
            { t:"Raise open palms and ask to speak with their leader.", to:2 },
            { t:"Harvest glowing caps immediately with Herbalism.", reqSkill:"Herbalism", badge:"Herbalism", to:3, onChoose:{ items:["ul_skullcap_draught", ...rollRandomLoot(["material","consumable"], 1, "rare")], msg:"Harvested Myconid Slumber-Draught & random loot!" } },
            { t:"Attack the Deathcap Myconids!", to:4 }
          ]},
          2: { zone:"Mushroom Grove", title:"Audience With Ghloolhg", text:"In slow, halting Common, the elder myconid Ghloolhg greets you: 'Rest in peace... touch not the skullcaps.' Yet you sense a faint telepathic pulse leaving its cap!", choices:[
            { t:"Sense its hidden telepathic message to the ghouls!", badge:"Spirit / Arcana DC 11", check:{ stat:"spirit", skill:"Arcana", dc:11, pass:5, fail:6, passMsg:"You catch Ghloolhg warning a darakhul hunter!", failMsg:"You accept a bowl of savory mushrooms (+8 HP) and rest." }, onPass:{ cw:"AMBUSH_SPOTTED" } },
            { t:"Politely trade 15 GP for safe passage and fungal lore.", to:5, onChoose:{ healHp:8, msg:"Rested briefly (+8 HP) and learned the safe trail!" } }
          ]},
          3: { zone:"Psychoactive Patch", title:"Hallucinatory Spores", text:"Purple-gilled mushrooms hiss as you brush past them!", choices:[
            { t:"Hold your breath and navigate with Survival / Herbalism.", badge:"Spirit / Survival DC 10", check:{ stat:"spirit", skill:"Survival", dc:10, pass:5, fail:5, failDmg:4, passMsg:"You dodge the blinding spore cloud!", failMsg:"Hallucinatory spores make you stumble into thorns (-4 HP)!" } }
          ]},
          4: { zone:"Mushroom Grove", title:"Slumber Spores!", text:"The colony rises to defend its garden—four Deathcap Myconids billow clouds of choking sleep-spores!", enemy:{ name:"Deathcap Myconid Colony", desc:"Fungal guardians of Skullcap Forest.", hp:26, ac:11, atk:4, dmg:5, xp:62, gold:20, items:["glowcap_spores","ul_skullcap_draught"], flee:1 }, choices:[
            { t:"Press deeper toward the eastern cavern exit.", to:6 }
          ]},
          5: { zone:"Inner Grove", title:"The Luminescent Clearing", text:"Among ancient fallen stalks you uncover a hidden cache left by lost Underworld explorers, including a Skullcap Spore-Cloak!", onEnter:{ gold:35, items:["ul_luminescent_cloak", ...rollRandomLoot(["consumable","valuable"], 1, "rare")], msg:"Found Skullcap Spore-Cloak, 35 GP & random loot!" }, choices:[
            { t:"Head for the eastern Stert Cavern exit.", to:6 }
          ]},
          6: { zone:"Cavern Exit", title:"Dinnas Grym's Ambush", text:"Just beyond the mushrooms, Ghloolhg's undead contact—Dinnas Grym, a Necrophage Ghast—steps out with two Imperial Ghouls! 'Fresh surface meat, delivered right to my table!'", choices:[
            { t:"Spring your counter-ambush on Dinnas Grym!", reqCw:"AMBUSH_SPOTTED", badge:"AMBUSH_SPOTTED", to:7 },
            { t:"Stand your ground and battle the ghoul pack!", to:8 }
          ]},
          7: { zone:"Cavern Exit", title:"Turned Tables", text:"Anticipating Ghloolhg's betrayal, you strike Dinnas Grym before his ghouls can flank you!", enemy:{ name:"Dinnas Grym (Surprised)", desc:"Necrophage ghast caught off-guard.", hp:26, ac:12, atk:5, dmg:5, undead:true, xp:90, gold:65, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 1, "rare") }, choices:[
            { t:"Collect your trophies and hike back to Oakhaven!", to:9 }
          ]},
          8: { zone:"Cavern Exit", title:"Claws in the Spores", text:"Dinnas Grym shrieks as he and his Imperial Ghouls lunge through the mist!", enemy:{ name:"Dinnas Grym & Imperial Ghouls", desc:"Ghoul Imperium hunter and his pack.", hp:32, ac:12, atk:5, dmg:6, undead:true, xp:110, gold:75, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 1, "very_rare") }, choices:[
            { t:"Collect your trophies and hike back to Oakhaven!", to:9 }
          ]},
          9: { zone:"Stert Trail", title:"Spore-Dust Cleared", text:"With Dinnas Grym destroyed, the mushroom forest falls quiet behind you. You gather 30 GP and rare spores for Orlo.", onEnter:{ gold:30, items:["glowcap_spores"], msg:"Gathered 30 GP & Glowcap Spores!" }, choices:[
            { t:"Return to Spore-Picker Orlo in Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Walker of the Spore-Wood", text:"Orlo marvels at your samples and rewards you handsomely for mapping Skullcap Forest and ending Dinnas Grym's ambushes!", ending:{ type:"true", title:"Explorer of Skullcap Forest", xp:110, gold:120, trophy:"Glowing Skullcap Crown" }, choices:[] }
        }
      },

      // ==========================================================
      // 6. CATHEDRAL OF TEN THOUSAND FLAMES (12 PAGES • LV 4 • PART I)
      // ==========================================================
      ul_cathedral_flames: {
        id: "ul_cathedral_flames",
        title: "Cathedral of Ten Thousand Flames",
        subtitle: "Part I • Temple of Green Soul-Fire",
        difficulty: "Hard",
        recommendedLevel: 4,
        discoverySource: "Lady Vespera (Tavern)",
        summary: "Infiltrate a vampire-held cathedral blazing with green soul-flames, brave shadow-whips and Red Sisters, and overthrow the usurping Curate.",
        totalPages: 12,
        pages: {
          1: { zone:"Anointed Narthex", title:"Crystals of Blood", safeRetreat:true, text:"White marble inlaid with ten thousand tiny red crystals leads into a cathedral glowing with eerie green candle-flames. Three paths open: the Petitioner's Hall left, the Blood Font center, and the Hall of the Penitent right.", choices:[
            { t:"Enter the Petitioner's Hall with the alabaster mask door.", to:2 },
            { t:"Confront the Red Sisters in the Narthex of the Chosen.", to:3 },
            { t:"Walk through the shadowy Hall of the Penitent.", to:4 }
          ]},
          2: { zone:"Petitioner's Hall", title:"The Kissing Mask", text:"A magically sealed door bears an alabaster woman's mask with parted lips.", choices:[
            { t:"Kiss the alabaster mask to open the lock (-2 HP).", to:5, onChoose:{ dmg:2, msg:"Tiny fangs prick your lip (-2 HP), blushing the mask as the door unlocks!" } },
            { t:"Pick the arcane seal with Lockpicking.", reqSkill:"Lockpicking", badge:"Lockpicking", to:5 }
          ]},
          3: { zone:"Narthex of the Chosen", title:"The Three Red Sisters", text:"Around an alabaster font brimming with fresh blood stand three crimson-robed Red Sisters, snapping barbed whips!", enemy:{ name:"Red Sisters of Marena", desc:"Blood-magic priestesses.", hp:26, ac:12, atk:4, dmg:5, xp:62, gold:35, items: rollRandomLoot(["consumable","valuable"], 1, "rare"), flee:1 }, choices:[
            { t:"Step into the Unholy Nave.", to:5 }
          ]},
          4: { zone:"Hall of the Penitent", title:"The Shadow Whips", text:"Lithe shadows holding whips cling to the candle-lit walls, lashing anyone who passes!", choices:[
            { t:"Recite the repentance plaques while hurrying through.", badge:"Spirit / Lore DC 10", check:{ stat:"spirit", skill:"Lore", dc:10, pass:5, fail:5, failDmg:4, passMsg:"The shadow whips miss you!", failMsg:"Shadow lashes sear your back (-4 HP)!" } },
            { t:"Snuff the green flames with Turn Undead!", reqSpell:"Turn Undead", mp:4, badge:"Turn Undead (4 MP)", to:5, onChoose:{ cw:"FLAMES_SNUFFED", msg:"Extinguishing the candles banishes the shadow whips!" } }
          ]},
          5: { zone:"Unholy Nave", title:"The Curate's Spawn", text:"Massive iron chandeliers drip green light over dark pews as two snarling Vampire Spawn drop from the rafters!", enemy:{ name:"Vampire Spawn", desc:"Fanged offspring of the Curate.", hp:27, ac:12, atk:5, dmg:5, undead:true, xp:68, gold:32, items: rollRandomLoot(["valuable","material"], 1, "rare"), flee:1 }, choices:[
            { t:"Search the Vestry & Curate's Old Quarters.", to:6 },
            { t:"Ascend directly to the High Priest's Quarters!", to:8 }
          ]},
          6: { zone:"Vestry & Quarters", title:"Notes of the Soul Rivener", text:"Among silver altarware (50 GP) you discover an Eternal Soulflame Candle AND the Curate's secret notes revealing the location of Radka's <strong>Caverns of the Soul Rivener</strong>!", onEnter:{ cw:"RIVENER_NOTES", gold:50, items:["ul_soulflame_candle", ...rollRandomLoot(["consumable"], 1, "rare")], msg:"Claimed Eternal Soulflame Candle, 50 GP & Radka's Cavern Notes!" }, choices:[
            { t:"Inspect the Reflecting Apse to weaken the soul-flames.", to:7 },
            { t:"Climb the stairs to the High Priest's Quarters!", to:8 }
          ]},
          7: { zone:"Reflecting Apse", title:"Ten Thousand Candles", text:"Polished mirrors amplify thousands of green candles! Smashing the mirrored rack severs the Curate's lair magic!", choices:[
            { t:"Shatter the mirrored racks before facing the Curate!", badge:"Might / Arcana DC 10", check:{ stat:"might", skill:"Athletics", dc:10, pass:8, fail:8, failDmg:3, passMsg:"Green sparks die as the Curate's lair power breaks!", failMsg:"Searing glass cuts you (-3 HP), yet the mirrors shatter!" }, onPass:{ cw:"FLAMES_SNUFFED" } }
          ]},
          8: { zone:"High Priest's Quarters", title:"The Usurping Curate", text:"Beside a gold-trimmed coffin stands the Vampire Patrician Curate, wreathed in swirling green soul-flames! 'Radka's cathedral is MINE—and your soul shall light my next candle!'", choices:[
            { t:"Strike while his soul-flame lair power is disrupted!", reqCw:"FLAMES_SNUFFED", badge:"FLAMES_SNUFFED", to:9 },
            { t:"Challenge the Vampire Curate in his green-fire sanctum!", to:10 }
          ]},
          9: { zone:"High Priest's Quarters", title:"Fading Green Fire", text:"Without his reflected flames, the Curate hisses and lunges with a venom-slicked fang dagger!", enemy:{ name:"The Vampire Curate (Weakened)", desc:"Vampire patrician stripped of soul-flame magic.", hp:30, ac:12, atk:5, dmg:6, undead:true, xp:120, gold:95, items:["ul_curate_venom_blade", ...rollRandomLoot(["valuable","accessory"], 1, "very_rare")] }, choices:[
            { t:"Open the Curate's locked iron chest!", to:11 }
          ]},
          10: { zone:"High Priest's Quarters", title:"Inferno of Soul-Flames", text:"Rays of blinding green fire erupt from the candelabra as the Vampire Curate attacks!", enemy:{ name:"The Vampire Curate", desc:"Soul-flame empowered vampire lord.", hp:38, ac:13, atk:6, dmg:7, undead:true, xp:145, gold:115, items:["ul_curate_venom_blade", ...rollRandomLoot(["weapon","accessory"], 1, "very_rare")] }, choices:[
            { t:"Open the Curate's locked iron chest!", to:11 }
          ]},
          11: { zone:"High Priest's Quarters", title:"The Patrician's Hoard", text:"Hidden inside the coffin dirt lies the key to the iron chest: 75 GP, red garnets, and a random treasure!", onEnter:{ gold:75, items: rollRandomLoot(["weapon","armor","valuable"], 1, "very_rare"), msg:"Claimed 75 GP & random cathedral treasure!" }, choices:[
            { t:"Return to Lady Vespera! (Unlocks Part II: Caverns of the Soul Rivener)", to:12 }
          ]},
          12: { zone:"Epilogue", title:"Snuffer of the Green Flame", text:"Lady Vespera pays handsomely for the soul-flame candle and notes! Yet Radka herself still brews wraiths below—<strong>Part II: Caverns of the Soul Rivener</strong> is now unlocked on your Quest Board!", ending:{ type:"true", title:"Conqueror of the Cathedral", xp:140, gold:150, trophy:"Emerald Soul-Candle" }, choices:[] }
        }
      },

      // ==========================================================
      // 7. THE THROTTLE (10 PAGES • LV 4)
      // ==========================================================
      ul_the_throttle: {
        id: "ul_the_throttle",
        title: "The Throttle",
        subtitle: "Fortified Checkpoint of the Ghoul Imperium",
        difficulty: "Hard",
        recommendedLevel: 4,
        discoverySource: "Agent Kaspar (Tavern)",
        summary: "Infiltrate the Ghoul Imperium's fortified roadblock, play rival ghoul commanders against each other, and rescue Blue House spy Heinrek Klaussen.",
        totalPages: 10,
        pages: {
          1: { zone:"Cavern Road", title:"The Composite Barricade", safeRetreat:true, text:"Glow worms twinkle ninety feet above a mile-wide cavern choked by a rubble barricade. Imperial Ghouls man the walls, while a dark warren of side tunnels winds north.", choices:[
            { t:"Bluff the gatehouse ghouls with forged merchant papers.", badge:"Persuasion DC 11", check:{ stat:"spirit", skill:"Persuasion", dc:11, pass:4, fail:3, passMsg:"The darakhul wave you into the camp!", failMsg:"Crossbows snap at weakened stalagmites overhead!" } },
            { t:"Bypass the barricade through the northern ooze-tunnels.", to:2 },
            { t:"Charge the barricade head-on!", to:3 }
          ]},
          2: { zone:"Northern Warren", title:"Black Pudding Tunnels", text:"Corrosive Black Puddings drop from the narrow ceiling!", enemy:{ name:"Tunnel Black Puddings", desc:"Acidic subterranean oozes.", hp:26, ac:10, atk:5, dmg:5, xp:62, gold:20, items: rollRandomLoot(["material","consumable"], 1, "rare"), flee:1 }, choices:[
            { t:"Slip out behind the barricade into the Camp.", to:4, onChoose:{ cw:"CAMP_INFILTRATED", msg:"Bypassed the barricade cleanly!" } }
          ]},
          3: { zone:"Barricade", title:"Falling Stalagmites!", text:"Ghoul sentries shoot fractured pillars (-3 HP) as two Darakhul drop from the wall!", onEnter:{ dmg:3, msg:"Falling stone grazes you (-3 HP)!" }, enemy:{ name:"Throttle Darakhul Patrol", desc:"Armored ghoul border guards.", hp:27, ac:12, atk:5, dmg:5, undead:true, xp:68, gold:35, items: rollRandomLoot(["consumable","valuable"], 1, "rare"), flee:1 }, choices:[
            { t:"Push into the Outpost Camp.", to:4 }
          ]},
          4: { zone:"Outpost Camp", title:"Rivalry in the Dark", text:"Inside the camp stand Commander Pryor Ellsmark's war room, Second-in-Command Dru Wytchlight's silk quarters, and the stone Prison.", choices:[
            { t:"Bribe Jailer Barsella at the Prison to free Heinrek & Zylanthea.", to:5 },
            { t:"Parley with Dru Wytchlight to betray Commander Ellsmark!", to:6 },
            { t:"Storm Commander Pryor Ellsmark's War Room!", to:7 }
          ]},
          5: { zone:"Outpost Prison", title:"Barsella's Dice Game", text:"Jailer Barsella rattles bone dice outside Heinrek and shadow-fey Zylanthea's cell!", choices:[
            { t:"Test Your Luck wagering with Barsella for the cell keys!", badge:"Test Your Luck", luck:{ pass:7, fail:7, failDmg:4, passMsg:"She laughs and looks away as you free both prisoners!", failMsg:"Loaded dice! You cut her down (-4 HP) and grab the keys!" }, onPass:{ cw:"PRISONERS_ARMED" } },
            { t:"Ambush Barsella silently and arm the prisoners!", badge:"Stealth DC 10", check:{ stat:"agility", skill:"Stealth", dc:10, pass:7, fail:7, failDmg:3, passMsg:"Freed Heinrek & Zylanthea cleanly!", failMsg:"Brief scuffle (-3 HP), but the prisoners are free!" }, onPass:{ cw:"PRISONERS_ARMED" } }
          ]},
          6: { zone:"Wytchlight's Quarters", title:"The Shadowmancer's Offer", text:"Darakhul Shadowmancer Dru Wytchlight reclines beside two Shadow Skeletons. 'Help me topple Ellsmark, and I'll let you walk out with your spy!'", choices:[
            { t:"Strike down Dru Wytchlight right here for her Shadow-Orb!", to:8 },
            { t:"Accept her dark truce to weaken Commander Ellsmark!", to:7, onChoose:{ cw:"DRU_BETRAYAL", msg:"Dru's skeletons lock the barracks—Ellsmark stands isolated!" } }
          ]},
          7: { zone:"War Room", title:"Commander Pryor Ellsmark", text:"Surrounded by maps of Zobeck, Iron Ghoul Commander Pryor Ellsmark hefts his heavy steel! 'No spy leaves the Throttle alive!'", enemy:{ name:"Commander Pryor Ellsmark", desc:"Iron Ghoul warlord of the Throttle.", hp:35, ac:13, atk:5, dmg:6, undead:true, xp:125, gold:90, items:["ul_ellsmark_plate", ...rollRandomLoot(["weapon","valuable"], 1, "very_rare")], weakCw:["PRISONERS_ARMED","DRU_BETRAYAL"] }, choices:[
            { t:"Grab Ellsmark's war-chest and escort Heinrek to freedom!", to:9 }
          ]},
          8: { zone:"Wytchlight's Quarters", title:"Duel of Shadows", text:"Dru Wytchlight raises violet bolts as her Shadow Skeletons lunge!", enemy:{ name:"Dru Wytchlight", desc:"Darakhul shadowmancer.", hp:32, ac:12, atk:5, dmg:6, undead:true, xp:120, gold:85, items:["ul_wytchlight_focus", ...rollRandomLoot(["accessory","consumable"], 1, "very_rare")] }, choices:[
            { t:"Free Heinrek from the prison and smash through the gate!", to:9 }
          ]},
          9: { zone:"Outpost Exit", title:"Breakout From the Throttle", text:"Before the barricade's fail-safe can collapse the road, you sprint clear with Heinrek Klaussen, 60 GP in imperial pay, and random salvage!", onEnter:{ gold:60, items: rollRandomLoot(["consumable","valuable"], 1, "rare"), msg:"Escaped with 60 GP & random salvage!" }, choices:[
            { t:"Return to Agent Kaspar in Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Spies Delivered", text:"Agent Kaspar buys a round for the entire Rusty Flagon as Heinrek delivers his vital maps of Darakhan. The Blue House pays you a generous bounty!", ending:{ type:"true", title:"Breaker of the Throttle", xp:135, gold:150, trophy:"Imperial Checkpoint Seal" }, choices:[] }
        }
      },

      // ==========================================================
      // 8. CLOSED THROAT PASS (10 PAGES • LV 4)
      // ==========================================================
      ul_closed_throat: {
        id: "ul_closed_throat",
        title: "Closed Throat Pass",
        subtitle: "Gauntlet of Sir Pravus the Ghost Knight",
        difficulty: "Hard",
        recommendedLevel: 4,
        discoverySource: "Scarred Courier Bren (Tavern)",
        summary: "Survive a relentless high-speed gauntlet through a claustrophobic pass hunted by Ghost Knight Sir Pravus, ghoul archers, and a deadfall trap.",
        totalPages: 10,
        pages: {
          1: { zone:"Pass Entrance", title:"The First Pass of Sir Pravus", safeRetreat:true, text:"High jagged walls press in overhead. Suddenly, an illusory wall shatters behind you—Ghost Knight Sir Pravus charges down the pass on a rotting Ghoulsteed, leveling his glowing Breaker Lance!", choices:[
            { t:"Dive aside from his trampling charge!", badge:"Agility DC 10", check:{ stat:"agility", skill:"Athletics", dc:10, pass:2, fail:2, failDmg:4, passMsg:"You roll cleanly past the hooves!", failMsg:"The ghoulsteed clips your shoulder (-4 HP)!" } },
            { t:"Brace with Arcane Shield as he thunders past!", reqSpell:"Arcane Shield", mp:3, badge:"Arcane Shield (3 MP)", to:2 }
          ]},
          2: { zone:"Overhang Ledge", title:"Pravus's Second Pass", text:"Crossbow bolts rain down from ten Ghoul Archers perched twenty feet above as Sir Pravus wheels around!", enemy:{ name:"Pass Ghoul Archers", desc:"Undead sharpshooters dropping into melee.", hp:25, ac:11, atk:4, dmg:5, undead:true, xp:60, gold:28, items: rollRandomLoot(["consumable","valuable"], 1, "rare"), flee:1 }, choices:[
            { t:"Sprint onward toward the illusory alcoves!", to:3 }
          ]},
          3: { zone:"Illusory Alcoves", title:"The Hidden Cache", text:"Spotting shimmering rock walls, you glimpse ghoul ambushers and piles of fallen travelers' gear!", choices:[
            { t:"Expose the illusions with Detect Traps / Perception & loot them!", badge:"Perception / Arcana DC 11", check:{ stat:"spirit", skill:"Perception", dc:11, pass:4, fail:5, passMsg:"You outflank the ambush and snatch a jade scroll tube!", failMsg:"Ghouls burst straight out of the rock!" }, onPass:{ cw:"PRAVUS_SLOWED", gold:45, items: rollRandomLoot(["consumable","valuable"], 1, "rare") } },
            { t:"Sprint past the alcoves without stopping!", to:5 }
          ]},
          4: { zone:"Mid Pass", title:"Alchemist's Fire Volley!", text:"Two Darakhul perched on 15-foot ledges hurl blazing flasks of Alchemist's Fire down into the narrow canyon!", enemy:{ name:"Ledge Darakhul Bombers", desc:"Fire-hurling undead soldiers.", hp:26, ac:12, atk:5, dmg:5, undead:true, xp:68, gold:40, items:["alchemist_bomb", ...rollRandomLoot(["valuable"], 1, "rare")], flee:1 }, choices:[
            { t:"Press onward to the Deadfall Choke-Point!", to:6 }
          ]},
          5: { zone:"Mid Pass", title:"Ambush in the Narrow!", text:"Ghouls burst from the illusory walls as blazing flasks rain from above!", enemy:{ name:"Pravus's Ghoul Vanguard", desc:"Relentless pass defenders.", hp:28, ac:12, atk:5, dmg:5, undead:true, xp:70, gold:35, items: rollRandomLoot(["consumable","material"], 1, "rare"), flee:1 }, choices:[
            { t:"Press onward to the Deadfall Choke-Point!", to:6 }
          ]},
          6: { zone:"Deadfall Zone", title:"Pravus's Fifth Pass", text:"Sir Pravus charges across a stone pressure plate—unleashing an avalanche of boulders from the canyon rim!", choices:[
            { t:"Leap clear of the falling boulders!", badge:"Agility / Perception DC 11", check:{ stat:"agility", skill:"Perception", dc:11, pass:7, fail:7, failDmg:5, passMsg:"You vault clear—and the rubble slows Pravus's steed!", failMsg:"Falling rocks batter you (-5 HP)!" }, onPass:{ cw:"STEED_UNHORSED" } },
            { t:"Test Your Luck sprinting under the avalanche!", badge:"Test Your Luck", luck:{ pass:7, fail:7, failDmg:6, passMsg:"You emerge unscathed on the far side!", failMsg:"A boulder clips your ribs (-6 HP)!" }, onPass:{ cw:"STEED_UNHORSED" } }
          ]},
          7: { zone:"Pass Summit", title:"The Final Pass", text:"At the exit of Closed Throat Pass, Sir Pravus reins in his snarling Ghoulsteed and lowers the gleaming Breaker Lance for a duel to the death!", choices:[
            { t:"Engage Sir Pravus on foot among the rubble!", reqCw:"STEED_UNHORSED", badge:"STEED_UNHORSED", to:8 },
            { t:"Meet Sir Pravus's mounted charge head-on!", to:8 }
          ]},
          8: { zone:"Pass Summit", title:"Clash of the Ghost Knight", text:"Blue spectral fire trails off the Breaker Lance as Sir Pravus strikes with relentless martial fury!", enemy:{ name:"Sir Pravus, Ghost Knight", desc:"Undying warden of Closed Throat Pass.", hp:36, ac:13, atk:6, dmg:6, undead:true, xp:135, gold:95, items:["ul_breaker_lance","ul_ghost_knight_helm"], weakCw:["STEED_UNHORSED","PRAVUS_SLOWED"] }, choices:[
            { t:"Step free of Closed Throat Pass!", to:9 }
          ]},
          9: { zone:"Pass Exit", title:"Open Skies Ahead", text:"The ghost knight's armor clatters empty onto the stone. You collect 50 GP and random spoils from his saddlebags before marching home.", onEnter:{ gold:50, items: rollRandomLoot(["consumable","valuable","accessory"], 1, "very_rare"), msg:"Claimed 50 GP & random spoils!" }, choices:[
            { t:"Return to Courier Bren in Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Runner of the Gauntlet", text:"Courier Bren's jaw drops when you lay Sir Pravus's visor on the bar. Closed Throat Pass is open for the first time in years!", ending:{ type:"true", title:"Conqueror of Closed Throat Pass", xp:140, gold:155, trophy:"Ghoulsteed Bridle" }, choices:[] }
        }
      },

      // ==========================================================
      // 9. THE STARLIT CHAMBERS (10 PAGES • LV 4)
      // ==========================================================
      ul_starlit_chambers: {
        id: "ul_starlit_chambers",
        title: "The Starlit Chambers",
        subtitle: "Secret Strongpoint of the Ebon Star",
        difficulty: "Medium-Hard",
        recommendedLevel: 4,
        discoverySource: "Cloaked Rebel Soren (Tavern)",
        summary: "Locate a star-lit rebel strongpoint of rogue darakhul beneath Tannenbirg Castle, forge an alliance—or raid their armory—and survive a Ghoul Imperium strike.",
        totalPages: 10,
        pages: {
          1: { zone:"Castle Tunnels", title:"The Illusion-Covered Seam", safeRetreat:true, text:"A quarter-mile beneath Tannenbirg Castle, jagged stalagmites line a silent tunnel. Somewhere in the wall hides the illusory seam leading to the Order of the Ebon Star.", choices:[
            { t:"Feel along the stone for the illusory seam.", badge:"Perception / Arcana DC 10", check:{ stat:"spirit", skill:"Perception", dc:10, pass:2, fail:2, failDmg:2, passMsg:"Your hand passes straight through the illusion!", failMsg:"Sharp rock scrapes your hand (-2 HP) before you find the gap!" } },
            { t:"Reveal the seam cleanly with Detect Traps.", reqSpell:"Detect Traps", mp:2, badge:"Detect Traps (2 MP)", to:2 }
          ]},
          2: { zone:"Outer Chamber", title:"Starlight Beneath the Earth", text:"Tiny blue mushrooms twinkle across the ceiling like stars! Six armed Darakhul Sentries step from the stalagmites, weapons raised—yet they do not immediately strike.", choices:[
            { t:"Invoke Soren's name and declare yourself a foe of the Ghoul Emperor!", badge:"Persuasion DC 10", check:{ stat:"spirit", skill:"Persuasion", dc:10, pass:3, fail:4, passMsg:"They lower their blades and lead you to Commander Polama!", failMsg:"Suspicious of spies, they move to subdue you!" } },
            { t:"Strike first and raid the rebel strongpoint!", to:4 }
          ]},
          3: { zone:"Inner Chamber", title:"Polama Hoffe & Goffery Pales", text:"Inside the star-lit chamber, rebel Commander Polama Hoffe and void-speaker Goffery Pales study maps of Krakova. 'An Imperial hunter squad just found our Tangle of Tunnels! Help us repel them, and our armory and Signet are yours!'", choices:[
            { t:"Accept the alliance and resupply at the Ebon Star Armory (+10 HP)!", to:5, onChoose:{ cw:"EBON_ALLY", healHp:10, items: rollRandomLoot(["consumable","weapon","armor"], 1, "rare"), msg:"Allied with the Ebon Star! Restored 10 HP & resupplied!" } },
            { t:"Betray them and seize their strongpoint for yourself!", to:4 }
          ]},
          4: { zone:"Inner Chamber", title:"Clash in the Starlight", text:"Commander Polama Hoffe, Goffery Pales, and Priest Finyeas rally to defend their sanctuary!", enemy:{ name:"Order of the Ebon Star", desc:"Rogue darakhul rebels fighting for freedom.", hp:34, ac:13, atk:5, dmg:6, undead:true, xp:125, gold:95, items:["ul_ebon_star_signet", ...rollRandomLoot(["weapon","armor","valuable"], 1, "very_rare")] }, choices:[
            { t:"Plunder their armory and escape through the Tangle of Tunnels!", to:8 }
          ]},
          5: { zone:"Shrine of Sarastra", title:"Finyeas's Blessing", text:"Priest Finyeas Scurlock anoints your steel at the shrine of the Queen of Night and Magic (+6 MP) as alarms ring from the Tangle of Tunnels!", onEnter:{ cw:"SARASTRA_BLESS", healMp:6, msg:"Restored 6 MP & gained SARASTRA_BLESS!" }, choices:[
            { t:"Intercept the Ghoul Imperium strike force in the Tangle of Tunnels!", to:6 }
          ]},
          6: { zone:"Tangle of Tunnels", title:"Imperium Hunter-Killers", text:"A squad of elite Iron Ghouls and a Darakhul Executioner burst from the maze toward the Starlit Chambers!", enemy:{ name:"Imperium Executioner Squad", desc:"Elite ghoul hunters from Marrowheart.", hp:35, ac:13, atk:6, dmg:6, undead:true, xp:130, gold:85, items: rollRandomLoot(["weapon","accessory","valuable"], 1, "very_rare"), weakCw:["SARASTRA_BLESS"] }, choices:[
            { t:"Return to Polama and Goffery in triumph!", to:7 }
          ]},
          7: { zone:"Inner Chamber", title:"Friends of the Ebon Star", text:"Polama clasps your arm in gratitude, presenting you with the Signet of the Ebon Star, Goffery's tunnel maps, and 60 GP from their war-chest!", onEnter:{ gold:60, items:["ul_ebon_star_signet", ...rollRandomLoot(["consumable","valuable"], 1, "rare")], msg:"Awarded Signet of the Ebon Star & 60 GP!" }, choices:[
            { t:"Ascend back to Oakhaven via the secret castle stair!", to:9 }
          ]},
          8: { zone:"Tangle of Tunnels", title:"Escaping the Maze", text:"Navigating the twisting tunnels, you haul 70 GP and rebel supplies back toward the surface.", onEnter:{ gold:70, items: rollRandomLoot(["consumable","valuable"], 1, "rare"), msg:"Plundered 70 GP & supplies!" }, choices:[
            { t:"Return to Oakhaven!", to:10 }
          ]},
          9: { zone:"Epilogue", title:"Ally of the Starlit Chambers", text:"Cloaked Rebel Soren salutes you in the Rusty Flagon. The Order of the Ebon Star survives to strike at the Ghoul Imperium from within!", ending:{ type:"true", title:"Champion of the Ebon Star", xp:135, gold:145, trophy:"Star-Fungus Lantern" }, choices:[] },
          10: { zone:"Epilogue", title:"Raider Beneath Tannenbirg", text:"You emerge from the tunnels rich in stolen weapons and gold—though the survivors of the Ebon Star will remember your blade.", ending:{ type:"rogue", title:"Plunderer of the Starlit Chambers", xp:120, gold:165, trophy:"Sarastra's Silver Star" }, choices:[] }
        }
      },

      // ==========================================================
      // 10. CAVERNS OF THE SOUL RIVENER (12 PAGES • LV 5 • PART II OF CATHEDRAL!)
      // ==========================================================
      ul_soul_rivener: {
        id: "ul_soul_rivener",
        reqQuest: "ul_cathedral_flames",
        title: "Part II: Caverns of the Soul Rivener",
        subtitle: "Sequel to Cathedral of Ten Thousand Flames • Radka's Wraith Forge",
        difficulty: "Very Hard",
        recommendedLevel: 5,
        autoDiscover: true,
        discoverySource: "Unlocks after completing Cathedral of Ten Thousand Flames",
        summary: "Follow the Curate's notes to Vampire Priestess Radka's subterranean cavern of liquid shadow, rescue captives, and end her wraith-forging experiments!",
        totalPages: 12,
        pages: {
          1: { zone:"Sinkhole Entry", title:"The Guarded Flowstone", safeRetreat:true, text:"Following the Curate's map leads you to a mist-breathing sinkhole. Ghasts crouch behind flowstone pillars ahead, guarding a stepped passage rigged with a poisoned pit!", choices:[
            { t:"Spot the poisoned spiked pit and edge along the ledge.", badge:"Perception / Agility DC 11", check:{ stat:"spirit", skill:"Perception", dc:11, pass:2, fail:2, failDmg:5, passMsg:"You skirt the poisoned spikes cleanly!", failMsg:"You slip onto a poisoned spike (-5 HP)!" } },
            { t:"Charge the ghoul watchpost immediately!", to:2 }
          ]},
          2: { zone:"Ghoul Nest", title:"The Iron Ghoul's Den", text:"An Iron Ghoul and six shrieking ghouls erupt from bone-strewn nests!", enemy:{ name:"Radka's Ghoul Guard", desc:"Iron Ghoul and lesser undead.", hp:30, ac:12, atk:5, dmg:6, undead:true, xp:78, gold:45, items: rollRandomLoot(["accessory","valuable","consumable"], 1, "rare"), flee:1 }, choices:[
            { t:"Inspect the Prison Pit to the west.", to:3 },
            { t:"Slip into Radka's Quarters to the east.", to:4 }
          ]},
          3: { zone:"Prison Pit", title:"Wraith Wardens", text:"Nine captives huddle at the bottom of a 20-foot flooded pit while two Wraiths circle overhead! 'They just dragged another prisoner north to the black trench!' one shouts.", enemy:{ name:"Prison Wraiths", desc:"Incorporeal undead born of the black pool.", hp:28, ac:12, atk:5, dmg:6, undead:true, xp:82, gold:30, items: rollRandomLoot(["consumable","material"], 1, "rare"), flee:1 }, choices:[
            { t:"Toss down the harness to free the prisoners & rush north!", to:5, onChoose:{ cw:"CAPTIVES_SAVED", xp:30, msg:"Freed the nine captives (+30 XP)!" } }
          ]},
          4: { zone:"Radka's Quarters", title:"The Hell Hound Kennel", text:"Sulfur hangs over Radka's polished coffin and teak desk—guarded by four snarling Hell Hounds!", enemy:{ name:"Radka's Hell Hounds", desc:"Fiery fiendish guard beasts.", hp:30, ac:13, atk:5, dmg:6, xp:85, gold:55, items:["ul_ruby_rivener_set", ...rollRandomLoot(["valuable"], 1, "very_rare")], flee:1 }, choices:[
            { t:"Burn Radka's research notes & head to the Spawning Trench!", to:6, onChoose:{ cw:"HOUNDS_SLAIN", msg:"Destroyed Radka's notes & silenced her hounds!" } }
          ]},
          5: { zone:"Receiving Chamber", title:"The Imperial Supervisors", text:"Three Imperial Ghouls prepare shackles around a stone table.", enemy:{ name:"Imperial Ghoul Supervisors", desc:"Darakhul overseers.", hp:29, ac:12, atk:5, dmg:6, undead:true, xp:80, gold:40, items: rollRandomLoot(["consumable","valuable"], 1, "rare"), flee:1 }, choices:[
            { t:"Check the Shrine of Green Fire nearby (+8 HP).", to:6 },
            { t:"Burst straight into the Wraith-Spawning Chamber!", to:7 }
          ]},
          6: { zone:"Shrine of Green Fire", title:"Altar of the Red Sard", text:"Destroying the green-flame rack weakens the shadow-magic in the main chamber and yields a valuable red sard idol (50 GP)!", onEnter:{ cw:"SHRINE_BROKEN", gold:50, healHp:8, msg:"Shattered the shrine! (+50 GP, +8 HP)" }, choices:[
            { t:"Burst into the Wraith-Spawning Chamber!", to:7 }
          ]},
          7: { zone:"Spawning Chamber", title:"The Trench of Liquid Shadow", text:"A vast trench of writhing black shadow-liquid laps beneath an iron cage holding a terrified captive! Vampire Priestess Radka turns with blazing crimson eyes, cracking her barbed whip!", choices:[
            { t:"Cut the pulley rope with Agility to save the captive first!", badge:"Agility DC 11", check:{ stat:"agility", skill:"Perception", dc:11, pass:8, fail:9, passMsg:"You yank the captive clear before the shadow strikes!", failMsg:"A wraith rises from the trench to aid Radka!" }, onPass:{ cw:"NO_WRAITH" } },
            { t:"Charge Vampire Priestess Radka directly!", to:9 }
          ]},
          8: { zone:"Spawning Chamber", title:"Radka Cornered!", text:"Without her hounds or a fresh wraith, Radka snarls and lashes out with dark blood-magic!", enemy:{ name:"Vampire Priestess Radka (Cornered)", desc:"High Priestess of the Red Goddess.", hp:34, ac:13, atk:6, dmg:7, undead:true, xp:155, gold:130, items:["ul_radka_sanguine_whip", ...rollRandomLoot(["weapon","armor","accessory"], 1, "very_rare")], weakCw:["HOUNDS_SLAIN","SHRINE_BROKEN"] }, choices:[
            { t:"Purify the Trench of Liquid Shadow!", to:10 }
          ]},
          9: { zone:"Spawning Chamber", title:"Mistress of the Soul Rivener", text:"Liquid shadow flares as Radka unleashes her sanguine whip and necrotic spells!", enemy:{ name:"Vampire Priestess Radka", desc:"Master of the Soul Rivener caverns.", hp:42, ac:14, atk:6, dmg:7, undead:true, xp:180, gold:150, items:["ul_radka_sanguine_whip", ...rollRandomLoot(["weapon","armor","accessory"], 1, "legendary")], weakCw:["HOUNDS_SLAIN","SHRINE_BROKEN"] }, choices:[
            { t:"Purify the Trench of Liquid Shadow!", to:10 }
          ]},
          10: { zone:"Spawning Chamber", title:"Sealing the Dark Pool", text:"As Radka turns to ash, you topple the shrine braziers into the black trench, collapsing the cursed cavern ceiling to seal the pool forever. You gather 75 GP and random relics before retreating.", onEnter:{ gold:75, items: rollRandomLoot(["valuable","consumable","accessory"], 1, "very_rare"), msg:"Claimed 75 GP & random treasure!" }, choices:[
            { t:"Lead the rescued captives back to daylight!", to:11 }
          ]},
          11: { zone:"Sinkhole Exit", title:"Dawn Above the Marshes", text:"Cool morning air greets the tearful survivors as you emerge from the caverns.", choices:[
            { t:"Return to Lady Vespera and Oakhaven!", to:12 }
          ]},
          12: { zone:"Epilogue", title:"Bane of the Soul Rivener", text:"Radka's wraith-forge is destroyed forever! Lady Vespera and the families of the rescued captives shower you with gold and acclaim!", ending:{ type:"true", title:"Vanquisher of Radka (Pt. II)", xp:175, gold:195, trophy:"Radka's Shattered Chalice" }, choices:[] }
        }
      },

      // ==========================================================
      // 11. FUNGAL FOREST OF FORGETTING (10 PAGES • LV 5)
      // ==========================================================
      ul_fungal_forgetting: {
        id: "ul_fungal_forgetting",
        title: "Fungal Forest of Forgetting",
        subtitle: "Lair of Ilxanthiard, Paragon of Rot",
        difficulty: "Very Hard",
        recommendedLevel: 5,
        discoverySource: "Deep-Gnome Bimbil (Tavern)",
        summary: "Trek through memory-stealing spores, writhing acid-cap mushrooms, and explosive worm corpses to defeat Ilxanthiard, Paragon of Rot.",
        totalPages: 10,
        pages: {
          1: { zone:"Spore Jungle", title:"The Acid-Cap Field", safeRetreat:true, text:"Writhing Acid-Cap tendrils and paper-thin Giant Puffballs choke the cavern entrance. A twitching explorer lies half-buried in thick fungus ahead!", choices:[
            { t:"Cut the explorer free with Herbalism / Survival.", badge:"Spirit / Herbalism DC 11", check:{ stat:"spirit", skill:"Herbalism", dc:11, pass:2, fail:2, failDmg:4, passMsg:"You save the scout—she reveals Ilxanthiard's explosive worm trap!", failMsg:"A puffball bursts, stinging your eyes (-4 HP)!" }, onPass:{ cw:"WORM_TRAP_KNOWN", items: rollRandomLoot(["consumable"], 1, "rare") } },
            { t:"Burn a path straight through with Firebolt!", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:2 }
          ]},
          2: { zone:"Spore Jungle", title:"Deathcap Ambush", text:"Six bulbous Deathcap Myconids detach from the fungal floor, slinging choking clouds!", enemy:{ name:"Waktwaza's Deathcaps", desc:"Fanatical fungal servants.", hp:30, ac:12, atk:5, dmg:6, xp:85, gold:35, items: rollRandomLoot(["weapon","valuable","consumable"], 1, "very_rare"), flee:1 }, choices:[
            { t:"Advance to the rotting Giant Worm Corpses.", to:3 }
          ]},
          3: { zone:"Worm Corpses", title:"The Rigged Cadavers", text:"Colossal decaying purple worms lie draped in glowing rot—while Iron Ghouls and a Necrophage Ghast burrow out to ambush you!", choices:[
            { t:"Detonate their rigged explosive worm corpse from afar!", reqCw:"WORM_TRAP_KNOWN", badge:"WORM_TRAP_KNOWN", to:4, onChoose:{ cw:"GHOULS_BLASTED", msg:"BOOM! Fiery blasts tear through the ghoul ambush!" } },
            { t:"Meet the burrowing ghouls in melee!", to:4 }
          ]},
          4: { zone:"Worm Corpses", title:"Rotting Defenders", text:"Iron Ghouls and Imperial Ghouls lunge from the cavernous ribs of the dead worms!", enemy:{ name:"Ilxanthiard's Rot-Ghouls", desc:"Fungal-infected undead raiders.", hp:32, ac:13, atk:5, dmg:6, undead:true, xp:92, gold:48, items: rollRandomLoot(["consumable","valuable"], 1, "very_rare"), weakCw:["GHOULS_BLASTED"], flee:1 }, choices:[
            { t:"Carefully lift the spore-trapped treasure sack.", to:5 },
            { t:"Step through the spore-curtain into the Circle of Toadstools!", to:6 }
          ]},
          5: { zone:"Worm Corpses", title:"The Feeblemind Spores", text:"Strange thrumming spores surround a bulging treasure sack!", choices:[
            { t:"Snatch the sack cleanly with Stealth / Agility.", badge:"Agility / Stealth DC 11", check:{ stat:"agility", skill:"Stealth", dc:11, pass:6, fail:6, failDmg:5, passMsg:"You snag 55 GP & a rare item untouched!", failMsg:"Thrumming spores scramble your senses (-5 HP)!" }, onPass:{ gold:55, items: rollRandomLoot(["accessory","valuable"], 1, "very_rare") } }
          ]},
          6: { zone:"Toadstool Circle", title:"Ilxanthiard, Paragon of Rot", text:"Inside a ring of ten-foot multicolored toadstools towers Ilxanthiard—a darakhul grotesquely bloomed with putrescent fungi! Living prisoners hang bound to the stalks.", choices:[
            { t:"Torch the giant toadstools with Firebolt to stop them crushing you!", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:7, onChoose:{ cw:"STALKS_BURNED", msg:"Flames wither Ilxanthiard's living toadstools!" } },
            { t:"Charge the Paragon of Rot!", to:7 }
          ]},
          7: { zone:"Toadstool Circle", title:"Stream of Putrid Spores", text:"Ilxanthiard vomits streams of deadly Waktwaza spores that burn even the hardiest flesh!", enemy:{ name:"Ilxanthiard, Paragon of Rot", desc:"Fungal-mutated darakhul champion.", hp:42, ac:14, atk:6, dmg:7, undead:true, xp:185, gold:135, items:["ul_paragon_rot_blade", ...rollRandomLoot(["armor","accessory","valuable"], 1, "legendary")], weakCw:["STALKS_BURNED"] }, choices:[
            { t:"Cut down the captive explorers and claim the cavern hoard!", to:8 }
          ]},
          8: { zone:"Toadstool Circle", title:"Prisoners of the Forest", text:"You free deep gnomes, dwarves, and surface merchants alike, recovering 70 GP and a random treasure from Ilxanthiard's discarded pile!", onEnter:{ gold:70, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 1, "very_rare"), msg:"Claimed 70 GP & random treasure!" }, choices:[
            { t:"Guide the survivors out of the Forest of Forgetting!", to:9 }
          ]},
          9: { zone:"Cavern Exit", title:"Clear Air Ahead", text:"The memory-stealing haze thins as you reach the upper tunnels.", choices:[
            { t:"Return to Deep-Gnome Bimbil in Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Purifier of the Rot", text:"Bimbil and the rescued explorers celebrate your victory in the Rusty Flagon—though whispers remain of the deeper myconid prophet Waktwaza...", ending:{ type:"true", title:"Slayer of the Paragon of Rot", xp:185, gold:200, trophy:"Fungal Crown of Ilxanthiard" }, choices:[] }
        }
      },

      // ==========================================================
      // 12. BREACHING WORM CITADEL (14 PAGES • LV 6)
      // (Enriched Pass 1)
      // ==========================================================
      ul_breaching_worm: {
        id: "ul_breaching_worm",
        title: "Breaching Worm Citadel",
        subtitle: "Petrified Worm Fortress of Pact Lich Augrimm",
        difficulty: "Very Hard",
        recommendedLevel: 6,
        discoverySource: "Shadow-Fey Kaelis (Tavern)",
        summary: "Descend the coiled stone entrails of a colossal petrified purple worm, rescue a captured Shadow-Fey agent, shatter a memory-wiped decoy lich, and unravel Pact Lich Augrimm's infernal circle in the Stinger Spire.",
        totalPages: 14,
        pages: {
          1: {
            zone: "Gullet Gatehouse",
            title: "Maw of the Petrified Worm",
            safeRetreat: true,
            text: [
              "Deep beneath the underworld's basalt vault looms an impossible silhouette: a colossal purple worm petrified mid-breach, its arched stone throat hollowed into a fortress ringed by jagged, ivory-white fangs. Sulfur-lit braziers flicker between its ribs, and the air reeks of ozone and scorched parchment.",
              "Two armored Barbed Devils stand sentinel at the circular Gullet Gatehouse while towering Glabrezu demons peer lazily down from the fanged Maw Watchtower above. Somewhere in the curved stinger-tip far below, Pact Lich Augrimm bargains away stolen souls."
            ],
            choices: [
              { t: "Pose as an envoy from a wealthy surface lord seeking Augrimm's infernal contract services.", badge: "Persuasion DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 3, fail: 2, passMsg: "The Barbed Devils exchange a greedy glance and wave you straight down past the Bone Swarms!", failMsg: "An invisible imp perches on your shoulder and shrieks 'INTRUDER!'—devils lower their glaives!" } },
              { t: "Slip along the upper fang-ridge using Stealth to bypass the gatehouse watch.", badge: "Stealth", reqSkill: "Stealth", to: 3, onChoose: { cw: "FANG_SCOUT", msg: "You creep silently along the petrified gullet-ribs, gaining the drop on the Hall of the Fallen!" } },
              { t: "Draw steel and cut your way straight through the Gullet Gatehouse!", to: 2 }
            ]
          },
          2: {
            zone: "The Gizzard",
            title: "Pillars of Bone",
            text: "The worm's petrified gizzard opens into a cavernous ribbed chamber where ancient, half-digested stone pillars jut from the floor. As your boots strike the shale, two towering Bone Swarms peel away from the walls with a dry clatter alongside a grinning Barbed Devil!",
            enemy: { name: "Gizzard Bone Swarms", desc: "Animated skeletal pillars flanked by an infernal gatehouse devil.", hp: 34, ac: 13, atk: 6, dmg: 6, undead: true, xp: 105, gold: 45, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
            choices: [
              { t: "Pry open a half-petrified dwarven strongbox wedged in the gizzard ribs before descending.", badge: "Lockpicking / Athletics DC 12", check: { stat: "agility", skill: "Lockpicking", dc: 12, pass: 3, fail: 3, passMsg: "Click! Inside lies a forgotten pouch of 35 GP and a clean healing draught (+6 HP)!", failMsg: "The corroded clasp snaps shut—better keep moving before reinforcements arrive." }, onPass: { gold: 35, healHp: 6 } },
              { t: "Descend the coiled stone gut into the Hall of the Fallen.", to: 3 }
            ]
          },
          3: {
            zone: "Hall of the Fallen",
            title: "Corpse Mound & Trophies",
            text: "Broken shields, cracked wizard staves, and silver-trimmed cloaks of failed intruders line the alcoves of the Hall of the Fallen. Before a pair of rune-etched bronze double doors, desiccated bodies spill together into a shambling Corpse Mound!",
            enemy: { name: "Citadel Corpse Mound", desc: "Hulking undead sentinel stitched from defeated trespassers.", hp: 35, ac: 13, atk: 6, dmg: 6, undead: true, xp: 110, gold: 50, items: rollRandomLoot(["weapon", "armor", "consumable"], 1, "very_rare"), flee: 1, weakCw: ["FANG_SCOUT"] },
            choices: [
              { t: "Carefully disarm the crackling lightning glyph etched across the bronze double doors.", badge: "Lockpicking / Arcana DC 11", check: { stat: "arcana", skill: "Lockpicking", dc: 11, pass: 4, fail: 4, failDmg: 5, passMsg: "You ground the arcane wire cleanly—and spot Augrimm's true fiendish pact-seal etched on the latch!", failMsg: "Blue lightning snaps across your gauntlets (-5 HP) as the doors shudder open!" }, onPass: { cw: "PACT_NAME" } },
              { t: "Read the glyph's flow with Detect Traps to disarm it effortlessly.", badge: "Detect Traps", reqSpell: "Detect Traps", to: 4, onChoose: { cw: "PACT_NAME", msg: "You disarm the rune effortlessly and memorize Augrimm's true fiendish pact-seal!" } }
            ]
          },
          4: {
            zone: "Interrogation Chamber",
            title: "Automata Devils & The Captured Scout",
            text: "The rhythmic clang of brass gears echoes from a circular stone cell! Two ticking, infernal Automata Devils loom with glowing iron tongs over a bound Shadow-Fey scout—Lyris of the Moonlit Court—trying to extract Kaelis's secrets!",
            enemy: { name: "Automata Devils", desc: "Infernal clockwork torturers fueled by hellish steam.", hp: 36, ac: 13, atk: 6, dmg: 7, xp: 120, gold: 60, items: rollRandomLoot(["accessory", "valuable"], 1, "very_rare"), flee: 1 },
            choices: [
              { t: "Unbind and heal Shadow-Fey scout Lyris so she can share her intelligence and fight beside you!", to: 5, onChoose: { cw: "FEY_RESCUED", msg: "Grateful, Lyris whispers: 'Beware the lich ahead—he is a memory-wiped DECOY! And pull The Undiscovered Country in the Scriptorium!'" } },
              { t: "Press onward immediately toward the glowing chamber below before the alarm spreads.", to: 5 }
            ]
          },
          5: {
            zone: "False Lair",
            title: "The Decoy Augrimm",
            text: [
              "Purple moonlight pours through a false illusion-skylight onto a bloodstained basalt altar. Rising in tattered royal robes stands a crowned Hierophant Lich, utterly convinced by Augrimm's cruel memory-magic that it IS the master of the Worm Citadel!",
              "<em>'Insolent mortals!'</em> the proxy shrieks, clutching a cracked moon-phylactery. <em>'None shall interrupt my moon-ritual!'</em>"
            ],
            choices: [
              { t: "Heed Lyris's tip—shatter the memory-gem on the altar first to stagger the Decoy Lich!", badge: "FEY_RESCUED", reqCw: "FEY_RESCUED", to: 6, onChoose: { cw: "DECOY_CRACKED", msg: "The memory-gem shatters in a shower of violet sparks—the decoy lich clutches its skull in confusion!" } },
              { t: "Confront the Decoy Hierophant Lich directly!", to: 6 }
            ]
          },
          6: {
            zone: "False Lair • Altar",
            title: "Shattering the Proxy",
            text: "Necrotic arcs lash across the stone ribs as the Deluded Hierophant Lich unleashes its stolen spells!",
            enemy: { name: "Decoy Hierophant Lich", desc: "Memory-wiped lesser lich serving as Augrimm's expendable proxy.", hp: 38, ac: 13, atk: 6, dmg: 7, undead: true, xp: 145, gold: 110, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "legendary"), weakCw: ["DECOY_CRACKED"] },
            choices: [
              { t: "Slip through the concealed balcony arch behind the altar into the False Treasure Room.", to: 7 }
            ]
          },
          7: {
            zone: "False Treasure Room",
            title: "Amethyst Riches & The Weighted Gibbet",
            text: "Mountains of glittering chalices and gold coins shimmer beneath whispering amethyst torches—yet Kaelis warned you that Augrimm hexes his decoy hoard to track greedy thieves! Along the far wall hang five iron gibbets beside an empty, counterweighted stone cage.",
            choices: [
              { t: "Heave 500 pounds of loose rubble into the empty gibbet cage to trigger the hidden Scriptorium door!", to: 8, onChoose: { gold: 80, msg: "Chains groan and the stone wall slides open! You pocket 80 GP in untracked silver along the threshold." } },
              { t: "Purge the tracking hex from a small coffer with Arcana and take a quiet breather.", badge: "Arcana DC 12", check: { stat: "arcana", skill: "Lore", dc: 12, pass: 8, fail: 8, passMsg: "Hex dispelled! You claim 45 untracked GP and catch your breath (+10 HP)!", failMsg: "The tracking hex flares—you leave the coffer untouched and steady your nerves (+8 HP)." }, onPass: { gold: 45, healHp: 10 }, onFail: { healHp: 8 } },
              { t: "Leave the hexed gold untouched and catch your breath (+12 HP) before entering the Scriptorium.", to: 8, onChoose: { healHp: 12, msg: "You bandage your wounds beneath the amethyst glow (+12 HP)!" } }
            ]
          },
          8: {
            zone: "The Scriptorium",
            title: "The Undiscovered Country",
            text: "Towering mahogany bookshelves curve up the petrified worm-ribs, patrolled by creeping Ink Oozes and razor-edged Paper Golems! On a brass-trimmed shelf gleams a dusty volume titled <em>The Undiscovered Country</em>—while a narrow side-alcove holds Augrimm's glowing Pact-Ledger.",
            choices: [
              { t: "Slip into the Pact-Ledger Alcove first to sabotage Augrimm's secondary infernal contract!", to: 9 },
              { t: "Pull The Undiscovered Country smoothly without waking the Ink Oozes and Paper Golems!", badge: "Stealth / Lore DC 12", check: { stat: "agility", skill: "Lore", dc: 12, pass: 10, fail: 10, failDmg: 5, passMsg: "Click! The hidden bookcase pivots cleanly before a single golem stirs!", failMsg: "Razor-sharp Paper Golems slash your cloak (-5 HP) as you dive through the closing archway!" } },
              { t: "Ignite the Paper Golems with Firebolt and stride straight through the secret bookcase!", badge: "Firebolt", reqSpell: "Firebolt", to: 10, onChoose: { msg: "Flaming parchment scatters harmlessly as you step cleanly into the Stinger Spire!" } }
            ]
          },
          9: {
            zone: "Scriptorium • Pact-Ledger Alcove",
            title: "Breaking the Infernal Fine Print",
            text: "Upon a bone lectern lies a sizzling vellum ledger binding a Hezrou demon and a Deathwisp to Augrimm's service in the Stinger Spire! A single well-placed stroke across the blood-ink clause will snap their tether.",
            choices: [
              { t: "Strike through the summoning clause with Arcana/Lore and slip through The Undiscovered Country!", badge: "Arcana / Lore DC 12", check: { stat: "arcana", skill: "Lore", dc: 12, pass: 10, fail: 10, failDmg: 4, passMsg: "Brimstone hisses as the contract voids—Augrimm's summoning circle in the Stinger Spire is severely weakened!", failMsg: "The blood-ink sears your fingers (-4 HP), though you still tear out the page!" }, onPass: { cw: "CONTRACT_BURNED" } },
              { t: "Tear the ledger in half and pull The Undiscovered Country to enter the Stinger Spire!", to: 10, onChoose: { cw: "CONTRACT_BURNED", msg: "Sparks burst from the torn vellum—Augrimm's fiendish leash snaps!" } }
            ]
          },
          10: {
            zone: "Stinger Spire",
            title: "Augrimm's True Lair",
            text: [
              "At the tapering, venom-veined stinger-tip of the petrified worm stands the TRUE <strong>Pact Lich Augrimm</strong> inside a blazing silver summoning circle! A hulking Hezrou demon and a shrieking Deathwisp crouch at the circle's rim, while a calm, snow-white cat watches everything with emerald eyes from atop a marble statue.",
              "<em>'Ah,'</em> Augrimm purrs, his skeletal jaw clicking over infernal sigils. <em>'Past my proxy, past my scriptorium. Come—sign your soul in ash.'</em>"
            ],
            choices: [
              { t: "Signal Lyris to strike the Deathwisp and shatter Augrimm's silver summoning circle!", reqCw: "FEY_RESCUED", badge: "FEY_RESCUED", to: 11 },
              { t: "Speak the voided contract clause to collapse Augrimm's fiendish summoning circle!", reqCw: "CONTRACT_BURNED", badge: "CONTRACT_BURNED", to: 11 },
              { t: "Challenge Pact Lich Augrimm head-on in the Stinger Spire!", to: 12 }
            ]
          },
          11: {
            zone: "Stinger Spire",
            title: "The Pact Unraveled",
            text: "The silver summoning circle shatters in a blinding burst of sparks! Deprived of his Deathwisp and fiendish tether, Pact Lich Augrimm snarls furiously and raises his infernal staff for a desperate duel!",
            enemy: { name: "Pact Lich Augrimm (Disrupted)", desc: "Infernal lich whose summoning circle falters beneath your sabotage.", hp: 42, ac: 14, atk: 6, dmg: 7, undead: true, xp: 210, gold: 175, items: ["ul_augrimm_pact_staff", "ul_worm_carapace_mail"], weakCw: ["PACT_NAME"] },
            choices: [
              { t: "Claim the Citadel's true arcane hoard and approach the calm white cat!", to: 13 }
            ]
          },
          12: {
            zone: "Stinger Spire",
            title: "Master of Devils and Bone",
            text: "Infernal hellfire and crackling necrotic lightning erupt across the tapering Stinger Spire as Pact Lich Augrimm unleashes the full fury of his unbroken pact!",
            enemy: { name: "Pact Lich Augrimm", desc: "Supreme fiend-bound lich of the Breaching Worm Citadel.", hp: 50, ac: 15, atk: 7, dmg: 8, undead: true, xp: 245, gold: 210, items: ["ul_augrimm_pact_staff", "ul_worm_carapace_mail"], weakCw: ["PACT_NAME"] },
            choices: [
              { t: "Claim the Citadel's true arcane hoard and approach the calm white cat!", to: 13 }
            ]
          },
          13: {
            zone: "Stinger Spire",
            title: "Spoils of the Stinger",
            text: "With a hollow crack, Augrimm dissolves into sulfurous smoke and harmless ash! The snow-white cat—an enchanted familiar of the Moonlit Court trapped since Augrimm's last bargain—leaps lightly into your hood and purrs. Beneath the marble statue lies the Citadel's genuine, unhexed hoard: 100 GP and two legendary-tier relics!",
            onEnter: { gold: 100, items: rollRandomLoot(["weapon", "armor", "accessory", "valuable"], 2, "legendary"), msg: "Claimed 100 GP & 2 legendary-tier spoils from the Stinger Spire!" },
            choices: [
              { t: "Ascend from the petrified worm and return the familiar to Shadow-Fey Kaelis in Oakhaven!", to: 14 }
            ]
          },
          14: {
            zone: "Epilogue",
            title: "Breaker of the Worm Citadel",
            text: "Kaelis bows deeply in the moonlight as the white familiar leaps into her arms, pledging the lasting favor of the Court of Night while Oakhaven hails your legendary victory over Pact Lich Augrimm!",
            ending: { type: "true", title: "Conqueror of the Breaching Worm", xp: 240, gold: 260, trophy: "Augrimm's Infernal Signet" },
            choices: []
          }
        }
      },

      // ==========================================================
      // 13. TO GREET THE RISING SUN (10 PAGES • LV 6)
      // ==========================================================
      ul_rising_sun: {
        id: "ul_rising_sun",
        title: "To Greet the Rising Sun",
        subtitle: "The Sunseeker Cave Giants of the Dark River",
        difficulty: "Very Hard",
        recommendedLevel: 6,
        discoverySource: "Watch-Sergeant Hal (Tavern)",
        summary: "Journey to the underground Dark River, outwit shrunken cave giants and albino crocodiles, and stop Shaman Savvess's daylight-immunity elixir.",
        totalPages: 10,
        pages: {
          1: { zone:"Western Landing", title:"The Dark River", safeRetreat:true, text:"Sickly glowing mushrooms line the banks of the black underground river. Two oddly Medium-sized Cave Giants patrol beside a grease-coated cargo skiff!", enemy:{ name:"Sunseeker Cave Giants", desc:"Shrunken giants that snap back to Huge size!", hp:36, ac:13, atk:6, dmg:7, xp:120, gold:45, items: rollRandomLoot(["consumable","valuable"], 1, "very_rare"), flee:1 }, choices:[
            { t:"Investigate the Phosphorescent Foulness shelf for glittering gems.", to:2 },
            { t:"Cross the Dark River toward the Eastern Landing.", to:3 }
          ]},
          2: { zone:"Fungal Shelf", title:"The Corrupting Ooze", text:"Rotting remains conceal 2,000 gp worth of sparkling gems—guarded by a stinking Corrupting Ooze and Violet Fungi!", enemy:{ name:"Corrupting Ooze & Fungi", desc:"Symbiotic toxic horror.", hp:34, ac:11, atk:6, dmg:6, xp:115, gold:95, items: rollRandomLoot(["accessory","valuable"], 1, "very_rare"), flee:1 }, choices:[
            { t:"Cross the Dark River to the Eastern Landing.", to:3 }
          ]},
          3: { zone:"Eastern Landing", title:"Albino Crocs & Stone Rams", text:"Giant Albino Crocodiles lurk in the southern shallows, while a dwarven stone battering-ram pressure plate guards the barracks door!", choices:[
            { t:"Spot and wedge the stone battering-ram plate!", badge:"Perception / Tinkering DC 12", check:{ stat:"spirit", skill:"Perception", dc:12, pass:4, fail:4, failDmg:5, passMsg:"You jam the trap cleanly—the giants inside stay asleep!", failMsg:"Stone cylinders slam you into the river (-5 HP)!" }, onPass:{ cw:"BARRACKS_QUIET" } },
            { t:"Bluff the crocodiles in Giant and slip straight to the barracks.", badge:"Persuasion DC 11", check:{ stat:"spirit", skill:"Persuasion", dc:11, pass:4, fail:4, failDmg:4, passMsg:"The crocs let you pass!", failMsg:"A massive jaw snaps at your boot (-4 HP)!" } }
          ]},
          4: { zone:"Giant Barracks", title:"The Broken Dwarven Smithy", text:"Four shrunken Cave Giants snore amid shattered dwarven workbenches! Beneath the debris glints an incomplete Hammer of Thunderbolts!", enemy:{ name:"Sunseeker Barracks Giants", desc:"Brutal raiders of the Sunseeker Tribe.", hp:38, ac:13, atk:6, dmg:7, xp:130, gold:60, items:["ul_thunderbolt_hammer", ...rollRandomLoot(["material","consumable"], 1, "very_rare")], weakCw:["BARRACKS_QUIET"], flee:1 }, choices:[
            { t:"Storm Savvess's Alchemical Chamber!", to:5 }
          ]},
          5: { zone:"Alchemical Chamber", title:"Shaman Savvess", text:"Over a bubbling cauldron of Dark River water stands Cave Giant Shaman Savvess, wielding a rune-etched Impact Club! Three captives hang above the fire.", choices:[
            { t:"Shatter her cauldron with Firebolt or Chain Lightning!", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:6, onChoose:{ cw:"CAULDRON_RUINED", msg:"Boiling elixir splashes across the floor—Savvess's ward falters!" } },
            { t:"Rush Savvess before she finishes her spell!", to:6 }
          ]},
          6: { zone:"Alchemical Chamber", title:"Wrath of the Sunseeker Shaman", text:"Tattoos glowing with arcane force, Savvess swings her Impact Club and hurls shrinking darts!", enemy:{ name:"Shaman Savvess", desc:"Arcane leader of the Sunseeker Cave Giants.", hp:46, ac:14, atk:7, dmg:8, xp:225, gold:165, items:["ul_impact_club", ...rollRandomLoot(["weapon","armor","accessory"], 1, "legendary")], weakCw:["CAULDRON_RUINED"] }, choices:[
            { t:"Free the three captives and cleanse the Dark River!", to:7 }
          ]},
          7: { zone:"Alchemical Chamber", title:"Cleansing the Dark River", text:"Savvess falls! Before the Ghoul Imperium can claim the river's sun-muting waters, you pour holy water and diamond dust into the current to purify it forever.", choices:[
            { t:"Perform the cleansing ritual with Spirit / Arcana!", badge:"Spirit / Arcana DC 11", check:{ stat:"spirit", skill:"Lore", dc:11, pass:8, fail:9, passMsg:"Golden light purifies the Dark River completely!", failMsg:"You collapse the cavern mouth instead, sealing the river away!" } }
          ]},
          8: { zone:"Dark River", title:"Pure Waters", text:"The necrotic stain vanishes! You claim 85 GP and a random treasure from Savvess's satchels before leading the captives home.", onEnter:{ gold:85, items: rollRandomLoot(["valuable","accessory","consumable"], 1, "legendary"), msg:"Claimed 85 GP & random treasure!" }, choices:[
            { t:"Return to Watch-Sergeant Hal in Oakhaven!", to:10 }
          ]},
          9: { zone:"Dark River", title:"Sealed Beneath Stone", text:"The river is buried beyond the ghouls' reach. You grab 75 GP and escort the captives home.", onEnter:{ gold:75, msg:"Recovered 75 GP!" }, choices:[
            { t:"Return to Watch-Sergeant Hal in Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Guardian of the Daylight", text:"Watch-Sergeant Hal cheers as the rescued villagers return safely. No cave giant—nor ghoul—shall walk unburned beneath the sun!", ending:{ type:"true", title:"Bane of the Sunseekers", xp:220, gold:230, trophy:"Sunseeker Shaman's Tusk" }, choices:[] }
        }
      },

      // ==========================================================
      // 14. THE LAST DWARVEN REDOUBT (12 PAGES • LV 6+)
      // ==========================================================
      ul_dwarven_redoubt: {
        id: "ul_dwarven_redoubt",
        title: "The Last Dwarven Redoubt",
        subtitle: "Ashkreigel's Ziggurat of Fallen Ghouls",
        difficulty: "Very Hard",
        recommendedLevel: 6,
        discoverySource: "Dwarf Exile Brokk (Tavern)",
        summary: "Scale a towering pyramid of ghoul bones, collect three gem keys from Ashkreigel's stone-skinned dwarves, and slay the Adult Cave Dragon to free the Stoneboar Clan!",
        totalPages: 12,
        pages: {
          1: { zone:"Cavern of Bones", title:"The Crushing Entrance", safeRetreat:true, text:"In utter darkness rises a fifty-foot Ziggurat built entirely of ghoul bones! A colored tripwire spans the entry tunnel, while old dwarven workbenches sit to the west.", choices:[
            { t:"Spot and disable the crushing-ceiling tripwire.", badge:"Perception / Lockpicking DC 11", check:{ stat:"spirit", skill:"Perception", dc:11, pass:2, fail:2, failDmg:6, passMsg:"You cut the wire silently!", failMsg:"BOOM! Falling rock crushes down (-6 HP)!" } },
            { t:"Search the abandoned Tool Benches first.", to:3 }
          ]},
          2: { zone:"Cavern Floor", title:"Cave-Touched Zealots", text:"Three gray-skinned, stone-clawed Cave-Touched Dwarves leap from behind the bone heaps!", enemy:{ name:"Cave-Touched Dwarves", desc:"Dragon-blessed Stoneboar loyalists.", hp:36, ac:14, atk:6, dmg:7, xp:130, gold:55, items: rollRandomLoot(["consumable","valuable"], 1, "very_rare"), flee:1 }, choices:[
            { t:"Inspect the Tool Benches to the west.", to:3 },
            { t:"Begin climbing the Ziggurat's Quiet Tier!", to:4 }
          ]},
          3: { zone:"Tool Benches", title:"The Hidden War Pick", text:"Beneath an oilcloth on the old smith's bench gleams a razor-sharp Impaling War Pick, plus a small dwarven signal drum for calming Ashkreigel's pet purple worm!", onEnter:{ cw:"WORM_DRUM", items:["ul_impaling_pick"], msg:"Found Impaling War Pick & Worm Signal Drum!" }, choices:[
            { t:"Climb the Ziggurat's Quiet Tier!", to:4 }
          ]},
          4: { zone:"Quiet Tier", title:"First Gem Key: The Emerald", text:"Three fanatical Dwarven Assassins drop from the bone wall, guarding the Emerald Key!", enemy:{ name:"Stoneboar Assassins", desc:"Fanatical guardians of the first tier.", hp:36, ac:13, atk:6, dmg:7, xp:135, gold:65, items: rollRandomLoot(["valuable","consumable"], 1, "very_rare"), flee:1 }, choices:[
            { t:"Take the Emerald Key and climb to the Shifting Tier!", to:5, onChoose:{ cw:"KEY_EMERALD", msg:"Claimed Key 1/3: Emerald Key!" } }
          ]},
          5: { zone:"Shifting Tier", title:"Second Gem Key: The Diamond", text:"Loose bones writhe with bleached, poisonous Centipede Swarms guarding a glittering Diamond!", choices:[
            { t:"Incinerate the swarms with Firebolt / Sunburst and grab the Diamond!", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:6, onChoose:{ cw:"KEY_DIAMOND", msg:"Claimed Key 2/3: Diamond Key!" } },
            { t:"Dart in with Agility to snatch the Diamond!", badge:"Agility DC 12", check:{ stat:"agility", skill:"Survival", dc:12, pass:6, fail:6, failDmg:5, passMsg:"You snatch the Diamond unscathed!", failMsg:"Venomous bites sting your hands (-5 HP), yet you claim the Diamond!" }, onPass:{ cw:"KEY_DIAMOND" } }
          ]},
          6: { zone:"Magical Tier", title:"Third Gem Key: The Ruby", text:"Rune-inscribed bones glow as a Dwarven Archmage conjures swirling arcane fire!", enemy:{ name:"Stoneboar Archmage", desc:"Ashkreigel's supreme spellcaster.", hp:38, ac:13, atk:6, dmg:7, xp:150, gold:80, items: rollRandomLoot(["accessory","consumable"], 1, "legendary"), flee:1 }, choices:[
            { t:"Claim the Ruby Key and reach Ashkreigel's Roost!", to:7, onChoose:{ cw:"KEY_RUBY", msg:"Claimed Key 3/3: Ruby Key!" } }
          ]},
          7: { zone:"Ashkreigel's Roost", title:"The Three Skeletal Hands", text:"At the pyramid's summit, three giant skeletal arms reach skyward. Below, a massive Purple Worm shifts restlessly in the northern wall!", choices:[
            { t:"Beat the dwarven signal drum to keep the Purple Worm asleep, then place the 3 Gems!", reqCw:"WORM_DRUM", badge:"WORM_DRUM", to:8, onChoose:{ cw:"WORM_CALMED", msg:"The Purple Worm slumbers peacefully as the ziggurat trembles!" } },
            { t:"Place the three gems into the skeletal hands!", to:9 }
          ]},
          8: { zone:"Ashkreigel's Roost", title:"Ashkreigel the Cave Dragon", text:"Stone and bone part as Adult Cave Dragon Ashkreigel glides straight out of the pyramid's core! 'Impudent surface-worm! Kneel and mine my gold, or die!'", enemy:{ name:"Ashkreigel, Adult Cave Dragon", desc:"Paranoid subterranean dragon lord.", hp:48, ac:14, atk:7, dmg:8, xp:240, gold:200, items:["ul_ashkreigel_plate", ...rollRandomLoot(["weapon","accessory"], 1, "fabled")], weakCw:["WORM_CALMED"] }, choices:[
            { t:"Excavate the Ziggurat's Heart and free the Stoneboar Clan!", to:10 }
          ]},
          9: { zone:"Ashkreigel's Roost", title:"Dragon & Worm!", text:"The cavern shakes as Adult Cave Dragon Ashkreigel erupts from the ziggurat, roaring for his minions!", enemy:{ name:"Ashkreigel the Undying Tyrant", desc:"Full-fury Adult Cave Dragon.", hp:54, ac:15, atk:7, dmg:8, xp:275, gold:230, items:["ul_ashkreigel_plate", ...rollRandomLoot(["weapon","accessory"], 1, "fabled")] }, choices:[
            { t:"Excavate the Ziggurat's Heart and free the Stoneboar Clan!", to:10 }
          ]},
          10: { zone:"Ziggurat Heart", title:"Liberation of Stoneboar", text:"With Ashkreigel slain, the enslaved dwarves pour out of the deep tunnels cheering! Together you unearth the dragon's hoard: 120 GP and two legendary treasures!", onEnter:{ gold:120, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 2, "fabled"), msg:"Claimed 120 GP & 2 Fabled-tier hoard treasures!" }, choices:[
            { t:"Lead the freed Stoneboar Clan toward the surface!", to:11 }
          ]},
          11: { zone:"Upper Tunnels", title:"Return to Daylight", text:"Dwarven songs echo through the tunnels as Brokk welcomes his freed kin back into the sun.", choices:[
            { t:"March into Oakhaven as Liberator of the Redoubt!", to:12 }
          ]},
          12: { zone:"Epilogue", title:"Hero of the Stoneboar Clan", text:"The Stoneboar smiths hammer your name into Oakhaven's Guildhall arch in solid adamantine. You have conquered the deepest lair of the Underworld!", ending:{ type:"true", title:"Dragonslayer of the Last Redoubt", xp:260, gold:280, trophy:"Iron Cave-Dragon Statuette" }, choices:[] }
        }
      },
});
