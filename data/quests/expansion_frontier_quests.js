/* ============================================================
   EXPANSION QUESTS — FRONTIER & PART 2 SEQUELS (15 Adventures)
   ============================================================ */
window.OAKHAVEN.registerQuests({
            // ==========================================================
      // EXPANSION QUEST 1: THE FROSTPEAK ICE-CAVERNS (12 PAGES)
      // Uniques: frostbite_halberd, winterheart_pendant
      // ==========================================================
      frostpeak: {
        id: "frostpeak",
        title: "The Frostpeak Ice-Caverns",
        subtitle: "Glacier Vault of the Frost Giant Jarl",
        difficulty: "Medium",
        recommendedLevel: 2,
        autoDiscover: true,
        discoverySource: "Frost-Scout Bjorn (Tavern) or Quest Board",
        summary: "Brave howling glacial tunnels, outwit ice stalkers, and challenge Jarl Skaldor to claim the Frostbite Halberd and Winterheart Pendant.",
        totalPages: 12,
        pages: {
          1: { zone:"Glacier Mouth", title:"The Howling Ice-Arch", safeRetreat:true, text:"Blue glacial ice arches overhead like the ribs of a titan. Freezing wind screams out of the cavern mouth, where two paths fork: a broad frost-carved stair descending into torches, and a narrow crevasse glowing with pale crystal.", choices:[
            { t:"Descend the broad frost-carved stair.", to:2 },
            { t:"Squeeze into the glowing crystal crevasse.", to:3, badge:"Survival / Agility DC 9", check:{ stat:"agility", skill:"Survival", dc:9, pass:3, fail:3, failDmg:3, passMsg:"You traverse the razor-ice cleanly!", failMsg:"Jagged icicles nick your shoulder (-3 HP)." } }
          ]},
          2: { zone:"Outer Glacier", title:"The Frozen Guardhouse", text:"Two shaggy Frost-Goblins crouch beside a whale-oil brazier, sharpening bone spears around a pile of salvaged traveler packs!", enemy:{ name:"Frost-Goblin Raiders", desc:"Fur-clad glacier scavengers.", hp:17, ac:10, atk:3, dmg:4, xp:34, gold:20, items: rollRandomLoot(["consumable","material","valuable"], 1), flee:1 }, choices:[
            { t:"Rummage through the salvaged traveler packs.", to:4 },
            { t:"Press deeper toward the Mirror-Ice Bridge.", to:5 }
          ]},
          3: { zone:"Crystal Crevasse", title:"The Trapped Explorer", text:"Frozen inside translucent blue ice rests a fallen mountaineer clutching a glowing pendant and a pack of random gear!", choices:[
            { t:"Melt the ice cleanly with Firebolt.", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:5, onChoose:{ items:["winterheart_pendant", ...rollRandomLoot(["consumable","valuable"], 1)], msg:"Freed the Winterheart Pendant & random explorer loot!" } },
            { t:"Chip the ice free carefully.", badge:"Might / Survival DC 10", check:{ stat:"might", skill:"Survival", dc:10, pass:5, fail:5, failDmg:3, passMsg:"The pendant pops free intact!", failMsg:"Frostbite stings your fingers (-3 HP), yet you claim the relic!" }, onPass:{ items:["winterheart_pendant"] } }
          ]},
          4: { zone:"Outer Glacier", title:"The Salvaged Crates", text:"Beneath frosted furs you uncover a cache of supplies left by northern traders.", onEnter:{ gold:22, items: rollRandomLoot(["weapon","armor","consumable","valuable"], 2), msg:"Looted 22 GP & 2 random items from the frost-cache!" }, choices:[
            { t:"Advance to the Mirror-Ice Bridge.", to:5 }
          ]},
          5: { zone:"Chasm of Rime", title:"The Mirror-Ice Bridge", text:"A razor-thin span of sheer blue ice crosses a bottomless glacier chasm. Halfway across, a translucent Ice Stalker uncoils from the frost!", enemy:{ name:"Glacier Ice-Stalker", desc:"Crystalline ambush predator.", hp:21, ac:11, atk:4, dmg:5, xp:45, gold:24, items:["frost_essence", ...rollRandomLoot(["material","consumable"], 1)], flee:1 }, choices:[
            { t:"Inspect the Rune-Carved Hearth on the far side.", to:6 },
            { t:"Climb straight to the Hall of the Frost Jarl.", to:8 }
          ]},
          6: { zone:"Inner Glacier", title:"The Runic Hearth", text:"An ancient dwarven fire-bowl still smolders with ember-runes, warming a hidden niche behind a curtain of icicles.", choices:[
            { t:"Warm yourself & study the Jarl's weakness.", badge:"Lore / Survival DC 10", check:{ stat:"arcana", skill:"Lore", dc:10, pass:7, fail:8, passMsg:"You discover the Jarl's frost-ward sigil!", failMsg:"The runes dim before you finish reading." } },
            { t:"Rest briefly (+8 HP) and head to the Jarl's Hall.", to:8, onChoose:{ healHp:8, msg:"The hearth restores 8 HP!" } }
          ]},
          7: { zone:"Inner Glacier", title:"The Ember Secret", text:"Inscribed beside the hearth is the shattering word 'Ignis-Vael'—stripping Jarl Skaldor's ice-armor! You also pocket a random treasure from the alcove.", onEnter:{ cw:"FROST_WARD_BROKEN", items: rollRandomLoot(["valuable","consumable","accessory"], 1), msg:"Learned FROST_WARD_BROKEN & found random loot!" }, choices:[
            { t:"Enter the Hall of Jarl Skaldor!", to:8 }
          ]},
          8: { zone:"Jarl's Hall", title:"Throne of Jarl Skaldor", text:"A ten-foot Frost Giant Jarl rises from a throne of mammoth ribs, hefting the gleaming Frostbite Halberd! 'Warm-bloods dare enter my glacier? Freeze!'", choices:[
            { t:"Speak 'Ignis-Vael' to shatter his frost armor!", reqCw:"FROST_WARD_BROKEN", badge:"FROST_WARD_BROKEN", to:9 },
            { t:"Challenge Jarl Skaldor directly!", to:10 }
          ]},
          9: { zone:"Jarl's Hall", title:"The Cracking Glacier", text:"Skaldor's icy carapace shatters in a spray of snow! Roaring in fury, the weakened giant swings his halberd!", enemy:{ name:"Jarl Skaldor (Weakened)", desc:"Frost Giant chieftain without his ice-ward.", hp:23, ac:11, atk:4, dmg:5, xp:85, gold:70, items:["frostbite_halberd", ...rollRandomLoot(["valuable","material"], 1)] }, choices:[
            { t:"Claim the Jarl's Vault and exit the glacier!", to:11 }
          ]},
          10: { zone:"Jarl's Hall", title:"Wrath of the Frost Jarl", text:"Blizzard winds swirl around the throne as Jarl Skaldor brings the Frostbite Halberd crashing down!", enemy:{ name:"Jarl Skaldor", desc:"Mighty Frost Giant of Frostpeak.", hp:29, ac:12, atk:5, dmg:6, xp:105, gold:80, items:["frostbite_halberd", ...rollRandomLoot(["valuable","consumable"], 1)] }, choices:[
            { t:"Claim the Jarl's Vault and exit the glacier!", to:11 }
          ]},
          11: { zone:"Jarl's Vault", title:"Spoils of the Glacier", text:"Behind the mammoth-rib throne sits an ironbound sea-chest overflowing with northern bullion and salvaged gear.", onEnter:{ gold:45, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 1), msg:"Looted 45 GP & a random vault item!" }, choices:[
            { t:"Return to Oakhaven as Conqueror of Frostpeak!", to:12 }
          ]},
          12: { zone:"Epilogue", title:"Bane of the Glacier", text:"Frost-Scout Bjorn raises a tankard in awe as you stride into Oakhaven bearing the spoils of Frostpeak. The northern trade pass is safe once more!", ending:{ type:"true", title:"Conqueror of Frostpeak", xp:100, gold:95, trophy:"Mammoth-Ivory Horn" }, choices:[] }
        }
      },

      // ==========================================================
      // EXPANSION QUEST 2: THE SUNKEN TEMPLE OF SSETH (12 PAGES)
      // Uniques: serpent_fang_kris, scales_of_sseth
      // ==========================================================
      sseth_temple: {
        id: "sseth_temple",
        title: "The Sunken Temple of Sseth",
        subtitle: "Venom-Trapped Shrine of the Jade Serpent",
        difficulty: "Medium",
        recommendedLevel: 2,
        discoverySource: "Treasure-Hunter Zara (Tavern)",
        summary: "Descend into a mud-swallowed serpent ziggurat, dodge poison-dart corridors, and overthrow the Yuan-Ti High Priest to claim Sseth's Jade Scales and Serpent-Fang Kris.",
        totalPages: 12,
        pages: {
          1: { zone:"Sunken Courtyard", title:"The Serpent Steps", safeRetreat:true, text:"Vine-choked jade stairs sink into a steaming marsh basin. Twin stone cobras flank the flooded entry portal, while a mossy sacrificial alcove sits to the east.", choices:[
            { t:"Descend between the stone cobras into the Main Hall.", to:2 },
            { t:"Inspect the mossy sacrificial alcove to the east.", to:3 }
          ]},
          2: { zone:"Serpent Hall", title:"Hall of Venomous Statues", text:"Emerald light filters through cracks in the ceiling. Pressure tiles etched with coiled snakes cover the floor!", choices:[
            { t:"Detect & disarm the venom-dart tiles.", reqSkill:"Perception", badge:"Perception", to:4, onChoose:{ msg:"You slip cleanly past the dart triggers!" } },
            { t:"Leap across the safe jade tiles.", badge:"Agility DC 10", check:{ stat:"agility", skill:"Stealth", dc:10, pass:4, fail:4, failDmg:4, passMsg:"Not a single dart fires!", failMsg:"Venomous needles graze your flank (-4 HP)!" } }
          ]},
          3: { zone:"Sunken Courtyard", title:"The Offering Basin", text:"Inside the dry stone cobra's mouth rests a velvet pouch of coins, random salvaged loot, and an engraved Jade Fang Key!", onEnter:{ cw:"JADE_KEY", gold:20, items: rollRandomLoot(["consumable","valuable","material"], 1), msg:"Found JADE_KEY, 20 GP & random loot!" }, choices:[
            { t:"Enter the Main Serpent Hall.", to:2 }
          ]},
          4: { zone:"Serpent Hall", title:"The Brood-Pit", text:"Hissing fills the sunken amphitheater as two scaly Serpent-Guard Cultists lunge with curved blades!", enemy:{ name:"Sseth Serpent-Guards", desc:"Fanatical temple wardens.", hp:19, ac:11, atk:3, dmg:4, xp:38, gold:25, items:["antidote", ...rollRandomLoot(["material","valuable"], 1)], flee:1 }, choices:[
            { t:"Unlock the Jade Treasury Door.", reqCw:"JADE_KEY", badge:"JADE_KEY", to:5 },
            { t:"Follow the incense smoke to the High Altar.", to:7 },
            { t:"Search the Priest's Alchemy Cellar.", to:6 }
          ]},
          5: { zone:"Jade Treasury", title:"Vault of the Coiled Scale", text:"The Jade Fang Key unlocks an untouched reliquary! Hanging on a cedar stand gleams the legendary armor: Jade Scales of Sseth, alongside random temple plunder.", onEnter:{ gold:35, items:["scales_of_sseth", ...rollRandomLoot(["weapon","valuable","accessory"], 1)], msg:"Claimed Jade Scales of Sseth, 35 GP & random loot!" }, choices:[
            { t:"March to the High Altar of Sseth.", to:7 }
          ]},
          6: { zone:"Alchemy Cellar", title:"The Venom Distiller", text:"Emerald flasks bubble over green braziers.", choices:[
            { t:"Brew a purifying draught with Alchemy or Herbalism.", reqSkill:"Alchemy", badge:"Alchemy", to:7, onChoose:{ cw:"VENOM_IMMUNE", healHp:10, items: rollRandomLoot(["consumable"], 1), msg:"Gained VENOM_IMMUNE, +10 HP & a random potion!" } },
            { t:"Test Your Luck snatching a glowing vial.", badge:"Test Your Luck", luck:{ pass:7, fail:7, failDmg:4, passMsg:"Antivenom fortifies your blood (+6 HP)!", failMsg:"Bitter acid splashes your hand (-4 HP)!", onPass:{ cw:"VENOM_IMMUNE", healHp:6 } } }
          ]},
          7: { zone:"Inner Sanctum", title:"Altar of the Jade Serpent", text:"A towering emerald cobra statue looms over a sunken pool. High Priest Sszar turns with glowing slit-pupils, raising the gleaming Serpent-Fang Kris!", choices:[
            { t:"Press your immunity and rush the High Priest!", reqCw:"VENOM_IMMUNE", badge:"VENOM_IMMUNE", to:8 },
            { t:"Engage High Priest Sszar in battle!", to:9 }
          ]},
          8: { zone:"Inner Sanctum", title:"Venom Defied", text:"Sszar's toxic cloud washes harmlessly over you! Stunned, the High Priest lunges desperately with his kris!", enemy:{ name:"High Priest Sszar (Shaken)", desc:"Serpent-lord whose poison failed.", hp:22, ac:11, atk:4, dmg:5, xp:85, gold:65, items:["serpent_fang_kris", ...rollRandomLoot(["valuable","consumable"], 1)] }, choices:[
            { t:"Inspect the Jade Idol's ruby eyes!", to:10 }
          ]},
          9: { zone:"Inner Sanctum", title:"Fangs of Sseth", text:"Green mist coils around the High Priest's blade as he strikes with blinding speed!", enemy:{ name:"High Priest Sszar", desc:"Master of the Sunken Temple.", hp:27, ac:12, atk:5, dmg:5, xp:100, gold:75, items:["serpent_fang_kris", ...rollRandomLoot(["valuable","material"], 1)] }, choices:[
            { t:"Inspect the Jade Idol's ruby eyes!", to:10 }
          ]},
          10: { zone:"Inner Sanctum", title:"The Idol's Secret", text:"With Sszar defeated, the stone cobra's jaw grinds open, revealing a hidden coffer of random ancient treasure!", onEnter:{ gold:40, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 1), msg:"Found 40 GP & a random treasure inside the idol!" }, choices:[
            { t:"Ascend from the jungle temple to Oakhaven!", to:11 },
            { t:"Topple the cursed idol into the mire before leaving.", to:12 }
          ]},
          11: { zone:"Epilogue", title:"Relic-Hunter Triumphant", text:"Treasure-Hunter Zara whistles in admiration as you lay Sseth's relics across the tavern table. You've conquered the serpent shrine and returned rich!", ending:{ type:"victory", title:"Plunderer of Sseth", xp:95, gold:110, trophy:"Emerald Cobra Eye" }, choices:[] },
          12: { zone:"Epilogue", title:"Breaker of the Serpent Cult", text:"With the idol shattered beneath the marsh waters, the serpent cult's dark whispers vanish forever. Oakhaven celebrates your courage!", ending:{ type:"true", title:"Bane of Sseth", xp:115, gold:95, trophy:"Shattered Jade Crown" }, choices:[] }
        }
      },

      // ==========================================================
      // EXPANSION QUEST 3: THE CLOCKWORK FOUNDRY OF BRASSHAVEN (12 PAGES)
      // Uniques: aether_gauntlet, chronos_monocle
      // ==========================================================
      brasshaven: {
        id: "brasshaven",
        title: "The Clockwork Foundry of Brasshaven",
        subtitle: "Rogue Gearworks & Steam-Driven Vaults",
        difficulty: "Medium-Hard",
        recommendedLevel: 3,
        discoverySource: "Tinkerer Pip Cogsworth (Tavern)",
        summary: "Infiltrate a ticking brass foundry overrun by rogue automatons, disarm steam-valves, and shut down the Arch-Machinist Core to claim the Aether-Coil Gauntlet and Chronos Monocle.",
        totalPages: 12,
        pages: {
          1: { zone:"Gear-Gate", title:"The Ticking Portal", safeRetreat:true, text:"Brass pistons hiss in unison behind Brasshaven's iron doors. A maintenance hatch ticks quietly on the left, while the main conveyor belt rumbles straight ahead.", choices:[
            { t:"Ride the main conveyor belt into the Assembly Floor.", to:2 },
            { t:"Unbolt the maintenance hatch.", badge:"Tinkering / Lockpicking DC 10", check:{ stat:"arcana", skill:"Tinkering", dc:10, pass:3, fail:2, passMsg:"You slip neatly into the Control Loft!", failMsg:"A steam jet forces you onto the main conveyor!" } }
          ]},
          2: { zone:"Assembly Floor", title:"The Steam-Hound Patrol", text:"Two brass-plated Clockwork Hounds pivot on squealing gears, spitting sparks from their copper jaws!", enemy:{ name:"Clockwork Hounds", desc:"Relentless mechanical watchdogs.", hp:22, ac:12, atk:4, dmg:5, xp:48, gold:28, items:["alchemical_oil", ...rollRandomLoot(["material","consumable"], 1)], flee:1 }, choices:[
            { t:"Climb to the Artificer's Control Loft.", to:3 },
            { t:"Enter the Spinning Gear-Maze.", to:4 }
          ]},
          3: { zone:"Control Loft", title:"Pip's Calibration Desk", text:"Atop a mahogany drafting bench rests the gleaming Chronos Monocle, a master override punch-card, and a random crate of spare gear!", onEnter:{ cw:"PUNCH_CARD", items:["chronos_monocle", ...rollRandomLoot(["consumable","valuable","material"], 1)], msg:"Found Chronos Monocle, PUNCH_CARD & random loot!" }, choices:[
            { t:"Descend into the Spinning Gear-Maze.", to:4 }
          ]},
          4: { zone:"Gear-Maze", title:"The Pressurized Piston Hall", text:"Colossal brass gears churn across the walkway while superheated steam vents every three seconds!", choices:[
            { t:"Re-time the valves with Tinkering!", reqSkill:"Tinkering", badge:"Tinkering", to:5, onChoose:{ msg:"The pistons lock safely in place!" } },
            { t:"Sprint between steam bursts!", badge:"Agility DC 11", check:{ stat:"agility", skill:"Athletics", dc:11, pass:5, fail:5, failDmg:4, passMsg:"Clean dash through the gears!", failMsg:"Scalding steam blisters your arm (-4 HP)!" } }
          ]},
          5: { zone:"Dynamo Wing", title:"The Aether Dynamo", text:"Blue lightning arcs between two copper coils. Inside a glass containment cylinder hovers the Aether-Coil Gauntlet, guarded by a Brass Sentinel!", enemy:{ name:"Brass Sentinel", desc:"Heavy-armored foundry guardian.", hp:24, ac:12, atk:4, dmg:5, xp:55, gold:34, items:["aether_gauntlet", ...rollRandomLoot(["material","valuable"], 1)], flee:1 }, choices:[
            { t:"Salvage the Dynamo Locker for extra supplies.", to:6 },
            { t:"March straight to the Arch-Machinist Core.", to:7 }
          ]},
          6: { zone:"Dynamo Wing", title:"The Artificer's Locker", text:"You crack open a brass tool-chest containing 30 GP and random workshop salvage.", onEnter:{ gold:30, items: rollRandomLoot(["weapon","armor","consumable","valuable"], 2), msg:"Looted 30 GP & 2 random items!" }, choices:[
            { t:"Enter the Core Chamber.", to:7 }
          ]},
          7: { zone:"Core Chamber", title:"The Arch-Machinist Core", text:"Suspended from golden chains hovers a twelve-foot brass sphere bristling with lightning-rods: the rogue Arch-Machinist Core! 'INTRUDER DETECTED. INITIATING PURGE.'", choices:[
            { t:"Slot Pip's Override Punch-Card into the console!", reqCw:"PUNCH_CARD", badge:"PUNCH_CARD", to:8 },
            { t:"Overload its coils with Chain Lightning!", reqSpell:"Chain Lightning", mp:4, badge:"Chain Lightning (4 MP)", to:8, onChoose:{ msg:"Sparks cascade across the Core's plating!" } },
            { t:"Attack the Arch-Machinist Core head-on!", to:9 }
          ]},
          8: { zone:"Core Chamber", title:"System Malfunction!", text:"Warning bells clang as the Core's shields drop! Sparks fly as it lashes out with erratic arcs!", enemy:{ name:"Arch-Machinist Core (Glitched)", desc:"Overloaded mechanical mastermind.", hp:24, ac:12, atk:4, dmg:5, xp:95, gold:80, items:["runed_shards", ...rollRandomLoot(["valuable","accessory"], 1)] }, choices:[
            { t:"Pull the Master Shutdown Lever!", to:10 }
          ]},
          9: { zone:"Core Chamber", title:"Full-Power Purge", text:"Twin Tesla arcs roar to life as the Arch-Machinist Core spins at lethal speed!", enemy:{ name:"Arch-Machinist Core", desc:"Apex construct of Brasshaven.", hp:32, ac:13, atk:5, dmg:6, xp:120, gold:95, items:["runed_shards", ...rollRandomLoot(["valuable","weapon"], 1)] }, choices:[
            { t:"Pull the Master Shutdown Lever!", to:10 }
          ]},
          10: { zone:"Core Chamber", title:"Silence in the Gearworks", text:"With a long, sighing hiss of steam, every piston in Brasshaven grinds to a peaceful halt. A hidden vault door clicks open, revealing 50 GP and a random treasure!", onEnter:{ gold:50, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 1), msg:"Claimed 50 GP & a random vault treasure!" }, choices:[
            { t:"Return the Foundry Keys to Pip Cogsworth!", to:11 },
            { t:"Strip the finest brass cores for yourself before leaving.", to:12 }
          ]},
          11: { zone:"Epilogue", title:"Savior of Brasshaven", text:"Pip Cogsworth dances a jig in the Rusty Flagon as you hand over the Foundry Keys, paying a generous guild bounty for restoring Brasshaven!", ending:{ type:"true", title:"Master of Brasshaven", xp:125, gold:125, trophy:"Golden Gear-Key" }, choices:[] },
          12: { zone:"Epilogue", title:"The Brass Plunderer", text:"Your satchel clinks with rare coils, gears, and artificer gold—enough to buy half the Ironclad Armory!", ending:{ type:"victory", title:"Foundry Raider", xp:105, gold:155, trophy:"Aether Dynamo Core" }, choices:[] }
        }
      },

      // ==========================================================
      // EXPANSION QUEST 4: THE ASHEN KEEP OF THE RED BARON (12 PAGES)
      // Uniques: baron_greatsword, ashen_cloak, signet_of_cinders
      // ==========================================================
      ashen_keep: {
        id: "ashen_keep",
        title: "The Ashen Keep of the Red Baron",
        subtitle: "Scorched Fortress of the Undying Warlord",
        difficulty: "Hard",
        recommendedLevel: 3,
        discoverySource: "Ser Garrick (Tavern)",
        summary: "Storm a flame-scarred hilltop castle, breach the Cinder Knights' barracks, and duel the Undying Red Baron for his Greatsword, Mantle of Cinders, and Cinder Signet.",
        totalPages: 12,
        pages: {
          1: { zone:"Scorched Ridge", title:"The Blackened Drawbridge", safeRetreat:true, text:"Embers drift like red snow over the ruined barbican of Ashen Keep. The main drawbridge stands lowered in grim invitation, while a charred stable-postern hides in the ditch below.", choices:[
            { t:"March boldly across the blackened drawbridge.", to:2 },
            { t:"Sneak through the charred stable-postern.", badge:"Stealth / Perception DC 10", check:{ stat:"agility", skill:"Stealth", dc:10, pass:3, fail:2, passMsg:"You slip unseen into the keep's armory!", failMsg:"A skeletal hound barks—you're forced to the main gate!" } }
          ]},
          2: { zone:"Outer Bailey", title:"The Cinder Vanguard", text:"Two armored Cinder Knights step through the smoke, halberds glowing cherry-red!", enemy:{ name:"Cinder Knights", desc:"Undying soldiers of the Red Baron.", hp:24, ac:12, atk:5, dmg:5, undead:true, xp:58, gold:35, items:["iron_ore", ...rollRandomLoot(["consumable","valuable"], 1)], flee:1 }, choices:[
            { t:"Raid the Smoke-Filled Armory.", to:3 },
            { t:"Ascend the Charred Keep Stairs.", to:5 }
          ]},
          3: { zone:"Keep Armory", title:"The Baron's Wardrobe", text:"Draped over an iron rack hangs the scorch-proof Mantle of Cinders, untouched by fire! Beside it sits a supply crate with random loot.", onEnter:{ items:["ashen_cloak", ...rollRandomLoot(["consumable","material","valuable"], 1)], msg:"Claimed Mantle of Cinders & random armory loot!" }, choices:[
            { t:"Check the Captain's War-Room.", to:4 },
            { t:"Ascend the Charred Keep Stairs.", to:5 }
          ]},
          4: { zone:"War-Room", title:"The Siege Banner", text:"A charred tapestry reveals the Baron's cursed oath-stone hidden behind his throne. You also pry loose the Baron's Cinder Signet from a war-map pin!", onEnter:{ cw:"OATH_KNOWN", items:["signet_of_cinders"], msg:"Found Baron's Cinder Signet & learned OATH_KNOWN!" }, choices:[
            { t:"Ascend the Charred Keep Stairs.", to:5 }
          ]},
          5: { zone:"Upper Keep", title:"The Hall of Fallen Banners", text:"A towering Ash-Wraith Champion bars the iron doors of the Great Hall, waving a flaming mace!", enemy:{ name:"Ash-Wraith Champion", desc:"The Red Baron's undead lieutenant.", hp:26, ac:12, atk:5, dmg:6, undead:true, xp:65, gold:40, items: rollRandomLoot(["weapon","armor","consumable","valuable"], 2), flee:1 }, choices:[
            { t:"Catch your breath in the Chapel Alcove (+10 HP).", to:6 },
            { t:"Kick open the doors to the Red Baron's Hall!", to:7 }
          ]},
          6: { zone:"Chapel Alcove", title:"The Quiet Ember", text:"A flicker of Dawn-light still lingers in the ruined chapel, knitting your wounds (+10 HP & +4 MP).", onEnter:{ healHp:10, healMp:4, msg:"Restored 10 HP & 4 MP!" }, choices:[
            { t:"Enter the Red Baron's Great Hall!", to:7 }
          ]},
          7: { zone:"Great Hall", title:"The Undying Red Baron", text:"Clad in crimson-enameled plate, the Red Baron rises from a charred iron chair, drawing the massive Red Baron's Greatsword. 'Another challenger for my ashes! Show me your steel!'", choices:[
            { t:"Invoke his broken oath to shatter his ember-shield!", reqCw:"OATH_KNOWN", badge:"OATH_KNOWN", to:8 },
            { t:"Shake his undead guard with Intimidation!", reqSkill:"Intimidation", badge:"Intimidation", to:8, onChoose:{ msg:"Your battle-cry rattles the Baron's dark resolve!" } },
            { t:"Cross blades with the Red Baron at full strength!", to:9 }
          ]},
          8: { zone:"Great Hall", title:"The Cracked Oath", text:"His crimson aura flickers as the Baron roars and charges across the ash-strewn flagstones!", enemy:{ name:"The Red Baron (Weakened)", desc:"Undying warlord whose dark oath falters.", hp:27, ac:12, atk:5, dmg:6, undead:true, xp:115, gold:95, items:["baron_greatsword", ...rollRandomLoot(["valuable","consumable"], 1)] }, choices:[
            { t:"Claim the War-Chest behind the throne!", to:10 }
          ]},
          9: { zone:"Great Hall", title:"Duel of Ash and Steel", text:"Sparks erupt like fireworks with every thunderous clash of the Red Baron's Greatsword!", enemy:{ name:"The Undying Red Baron", desc:"Dread lord of Ashen Keep.", hp:36, ac:13, atk:6, dmg:7, undead:true, xp:145, gold:115, items:["baron_greatsword", ...rollRandomLoot(["valuable","accessory"], 1)] }, choices:[
            { t:"Claim the War-Chest behind the throne!", to:10 }
          ]},
          10: { zone:"Great Hall", title:"The Baron's War-Chest", text:"As the Red Baron crumbles to grey cinders, his ironbound war-chest unlocks—filled with 60 GP and random battlefield spoils!", onEnter:{ gold:60, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 1), msg:"Looted 60 GP & random war-chest gear!" }, choices:[
            { t:"Raise Oakhaven's banner over Ashen Keep! (True Ending)", to:11 },
            { t:"Take the spoils and march down the ridge.", to:12 }
          ]},
          11: { zone:"Epilogue", title:"Liberator of Ashen Keep", text:"Seeing Oakhaven's banner fly over the ridge, Ser Garrick salutes you before a cheering crowd. The Red Baron's reign of ash is ended forever!", ending:{ type:"true", title:"Vanquisher of the Red Baron", xp:140, gold:145, trophy:"Crimson Helm-Crest" }, choices:[] },
          12: { zone:"Epilogue", title:"Lord of the Spoils", text:"You descend the smoky ridge weighed down by crimson steel and gold—a living legend in the Rusty Flagon!", ending:{ type:"victory", title:"Conqueror of Ashen Keep", xp:120, gold:175, trophy:"Ashen War-Banner" }, choices:[] }
        }
      },

      // ==========================================================
      // EXPANSION QUEST 5: THE GLOOMFEN WITCH-BOG (12 PAGES)
      // Uniques: witchwood_staff, bog_hag_talisman, cauldron_brew
      // ==========================================================
      gloomfen: {
        id: "gloomfen",
        title: "The Gloomfen Witch-Bog",
        subtitle: "Lantern-Lit Mire of Swamp Hag Morwenna",
        difficulty: "Medium",
        recommendedLevel: 2,
        discoverySource: "Herb-Wife Marta (Tavern)",
        summary: "Navigate the eerie boardwalks of Gloomfen Bog, resist hypnotic will-o'-wisps, and confront Swamp Hag Morwenna for her Witchwood Staff, Talisman of the Mire, and Star-Brew.",
        totalPages: 12,
        pages: {
          1: { zone:"Bog Edge", title:"The Sunken Boardwalk", safeRetreat:true, text:"Pale green lanterns bob above black peat water. A rotting cedar boardwalk winds straight toward a crooked cypress island, while a mossy log-bridge branches toward a glowing fairy-ring.", choices:[
            { t:"Follow the rotting boardwalk toward the cypress island.", to:2 },
            { t:"Cross the mossy log-bridge to the glowing fairy-ring.", to:3 }
          ]},
          2: { zone:"Peat Mire", title:"Dance of the Will-o'-Wisps", text:"Three bobbing blue lanterns drift across the planks, whispering sweet promises to lure you into the bottomless bog!", choices:[
            { t:"Steel your mind with Spirit or Survival.", badge:"Spirit / Survival DC 10", check:{ stat:"spirit", skill:"Survival", dc:10, pass:4, fail:4, failDmg:3, passMsg:"You ignore the phantom whispers!", failMsg:"You slip knee-deep into biting mire (-3 HP)!" } },
            { t:"Dispel the swamp-lights with Sunburst or Turn Undead.", reqSpell:"Turn Undead", mp:4, badge:"Turn Undead (4 MP)", to:4, onChoose:{ msg:"The wisps pop in harmless sparks!" } }
          ]},
          3: { zone:"Fairy-Ring", title:"The Sunken Shrine", text:"Inside a ring of glowing toadstools rests a forgotten traveler's satchel containing random swamp-loot and the eerie Talisman of the Mire!", onEnter:{ items:["bog_hag_talisman", ...rollRandomLoot(["consumable","material","valuable"], 1)], msg:"Found Talisman of the Mire & random loot!" }, choices:[
            { t:"Head back to the boardwalk toward the Cypress Island.", to:4 }
          ]},
          4: { zone:"Cypress Island", title:"The Bog-Toad Ambush", text:"The murky water explodes as a colossal, warty Giant Bog-Toad lashes out with a barbed tongue!", enemy:{ name:"Giant Bog-Toad", desc:"Morwenna's ravenous swamp guardian.", hp:20, ac:10, atk:4, dmg:4, xp:42, gold:22, items:["glowcap_spores", ...rollRandomLoot(["valuable","material"], 1)], flee:1 }, choices:[
            { t:"Search the Hollow Cypress Root-Cellar.", to:5 },
            { t:"Approach Morwenna's Stilted Witch-Hut.", to:7 }
          ]},
          5: { zone:"Cypress Island", title:"The Hag's Root-Cellar", text:"Hanging from dry roots are glass bottles of glowing swamp brews and a chest of lost travelers' gold.", choices:[
            { t:"Identify the true Star-Brew with Alchemy or Herbalism.", reqSkill:"Herbalism", badge:"Herbalism", to:6, onChoose:{ cw:"HEX_BROKEN", items:["cauldron_brew"], msg:"Claimed Morwenna's Star-Brew & learned HEX_BROKEN!" } },
            { t:"Test Your Luck grabbing the shimmering bottle!", badge:"Test Your Luck", luck:{ pass:6, fail:7, failDmg:4, passMsg:"You snag the genuine Star-Brew!", failMsg:"A hex-jar bursts in green smoke (-4 HP)!", onPass:{ items:["cauldron_brew"] } } }
          ]},
          6: { zone:"Cypress Island", title:"Travelers' Spoils", text:"In the corner of the cellar you also recover 25 GP and a random item left by lost marsh-wanderers.", onEnter:{ gold:25, items: rollRandomLoot(["weapon","armor","consumable","valuable"], 1), msg:"Found 25 GP & random loot!" }, choices:[
            { t:"Climb the creaking steps to Morwenna's Hut!", to:7 }
          ]},
          7: { zone:"Witch-Hut", title:"Swamp Hag Morwenna", text:"Green fire crackles beneath an iron cauldron as Swamp Hag Morwenna cackles, lifting her gnarled Witchwood Arch-Staff. 'Fresh bones for my broth! Come closer, little hero!'", choices:[
            { t:"Shatter her hex-charm before she can cast!", reqCw:"HEX_BROKEN", badge:"HEX_BROKEN", to:8 },
            { t:"Confront Swamp Hag Morwenna in battle!", to:9 }
          ]},
          8: { zone:"Witch-Hut", title:"The Broken Hex", text:"Morwenna shrieks as her protective wards unravel in violet sparks! Snarling, she swings her staff!", enemy:{ name:"Swamp Hag Morwenna (Unwarded)", desc:"Cornered witch of Gloomfen.", hp:21, ac:11, atk:4, dmg:5, xp:82, gold:65, items:["witchwood_staff", ...rollRandomLoot(["consumable","valuable"], 1)] }, choices:[
            { t:"Tip over the bubbling cauldron and search the hut!", to:10 }
          ]},
          9: { zone:"Witch-Hut", title:"Wrath of the Mire-Witch", text:"Swamp-lightning and cackling hexes fill the cramped hut as Morwenna attacks!", enemy:{ name:"Swamp Hag Morwenna", desc:"Ancient ruler of the Gloomfen Bog.", hp:26, ac:12, atk:5, dmg:5, xp:98, gold:75, items:["witchwood_staff", ...rollRandomLoot(["accessory","valuable"], 1)] }, choices:[
            { t:"Tip over the bubbling cauldron and search the hut!", to:10 }
          ]},
          10: { zone:"Witch-Hut", title:"The Cauldron's Hoard", text:"Under the floorboards beneath the overturned cauldron gleams a waterproof chest holding 45 GP and a random treasure!", onEnter:{ gold:45, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 1), msg:"Looted 45 GP & a random treasure!" }, choices:[
            { t:"Free the trapped lantern-spirits and return to Marta! (True Ending)", to:11 },
            { t:"Pack the hag's hoard and hike back to Oakhaven.", to:12 }
          ]},
          11: { zone:"Epilogue", title:"Light of the Gloomfen", text:"As you smash Morwenna's lanterns, dozens of grateful spirits rise into the night sky and the mist clears. Herb-Wife Marta rewards you warmly at the Rusty Flagon!", ending:{ type:"true", title:"Purifier of Gloomfen", xp:110, gold:105, trophy:"Silver Marsh-Lantern" }, choices:[] },
          12: { zone:"Epilogue", title:"The Bog-Delver's Haul", text:"Mud-splattered yet grinning, you stride back through Oakhaven's gates with Morwenna's treasures and a pouch heavy with marsh gold!", ending:{ type:"victory", title:"Conqueror of Gloomfen", xp:90, gold:135, trophy:"Hag's Cauldron-Charm" }, choices:[] }
        }
      },
	 // ==========================================================
      // QUEST 1 (PART 1): THE WHISPERING SALT-MINES (10 PAGES)
      // Uniques: crystal_pickaxe, echo_lantern
      // ==========================================================
      whispering_mines: {
        id: "whispering_mines",
        title: "The Whispering Salt-Mines",
        subtitle: "Part I • The Singing Salt-Flats Breach",
        difficulty: "Medium",
        recommendedLevel: 2,
        autoDiscover: true,
        discoverySource: "Foreman Durn (Tavern) or Quest Board",
        summary: "Descend into the crystalline salt-tunnels where a hypnotic hum has enthralled the miners and woken pale crystal crawlers.",
        totalPages: 10,
        pages: {
          1: { zone:"Salt-Mine Entry", title:"The Humming Shaft", safeRetreat:true, text:"White salt-crust sparkles along timber beams as a low, musical hum vibrates in your teeth. A rail-tunnel runs straight ahead while a tool-crib door hangs ajar to the left.", choices:[
            { t:"Search the miner's tool-crib to the left.", to:2 },
            { t:"Follow the humming rail-tunnel straight ahead.", to:3 }
          ]},
          2: { zone:"Tool-Crib", title:"Durn's Equipment Locker", text:"Beneath coiled ropes you recover the glittering Crystal-Edged Pickaxe and a random supply item left by the fleeing crew!", onEnter:{ items:["crystal_pickaxe", ...rollRandomLoot(["consumable","material"], 1)], msg:"Found Crystal-Edged Pickaxe & random loot!" }, choices:[
            { t:"Enter the humming rail-tunnel.", to:3 }
          ]},
          3: { zone:"Salt Tunnels", title:"The Singing Gallery", text:"Pale quartz veins pulse in rhythm with a hypnotic lullaby that tugs at your thoughts!", choices:[
            { t:"Resist the crystal hum with Spirit or Lore.", badge:"Spirit / Lore DC 10", check:{ stat:"spirit", skill:"Lore", dc:10, pass:4, fail:4, failDmg:3, passMsg:"You steady your mind against the resonance!", failMsg:"Dizzying echoes knock you against jagged salt (-3 HP)!" } },
            { t:"Smash a pulsing quartz node with Might.", badge:"Might DC 9", check:{ stat:"might", skill:"Athletics", dc:9, pass:4, fail:4, failDmg:2, passMsg:"The hum falters cleanly!", failMsg:"Flying crystal splinters nick your arm (-2 HP)!" } }
          ]},
          4: { zone:"Salt Tunnels", title:"The Crystal Crawlers", text:"Two translucent Salt-Beetles drop from the ceiling, mandibles chiming like glass bells!", enemy:{ name:"Crystal Salt-Beetles", desc:"Quartz-shelled tunnel scavengers.", hp:18, ac:11, atk:3, dmg:4, xp:38, gold:22, items:["moonstone_shard", ...rollRandomLoot(["material","valuable"], 1)], flee:1 }, choices:[
            { t:"Check the collapsed Foreman's Alcove.", to:5 },
            { t:"March toward the Sealed Breach Wall.", to:6 }
          ]},
          5: { zone:"Foreman's Alcove", title:"The Echo-Glass Lantern", text:"Hanging from an iron hook glows the Echo-Glass Lantern, its light calming the crystal vibrations! Beside it sits 25 GP and random loot.", onEnter:{ cw:"ECHO_CALM", gold:25, items:["echo_lantern", ...rollRandomLoot(["consumable","valuable"], 1)], msg:"Found Echo-Glass Lantern, 25 GP & random loot!" }, choices:[
            { t:"Advance to the Sealed Breach Wall.", to:6 }
          ]},
          6: { zone:"The Breach", title:"The Enthralled Overseer", text:"At the jagged quartz breach stands Foreman Durn's missing deputy—eyes glowing violet, swinging a crystalline maul!", choices:[
            { t:"Shine the Echo-Glass Lantern to break his trance!", reqCw:"ECHO_CALM", badge:"ECHO_CALM", to:7 },
            { t:"Subdue the Enthralled Overseer in combat!", to:8 }
          ]},
          7: { zone:"The Breach", title:"The Shattered Trance", text:"The lantern's warm beam cracks the violet crystal on his brow! Staggering, the crystal shell peels off into a furious Shard-Wraith!", enemy:{ name:"Quartz Shard-Wraith", desc:"Resonant spirit freed from the overseer.", hp:21, ac:11, atk:4, dmg:5, xp:75, gold:55, items:["moonstone_shard", ...rollRandomLoot(["valuable","accessory"], 1)] }, choices:[
            { t:"Seal the outer breach and escort the miners home!", to:9 }
          ]},
          8: { zone:"The Breach", title:"Clash at the Breach", text:"Violet arcs dance off the crystalline maul as the possessed overseer charges!", enemy:{ name:"Crystal-Bound Overseer", desc:"Resonance-controlled mine boss.", hp:26, ac:12, atk:4, dmg:5, xp:85, gold:60, items:["moonstone_shard", ...rollRandomLoot(["weapon","valuable"], 1)] }, choices:[
            { t:"Seal the outer breach and inspect the deeper cathedral!", to:9 }
          ]},
          9: { zone:"The Breach", title:"Glimpse of the Crystal Deep", text:"Through a crack in the salt-wall you glimpse an immense subterranean cathedral of singing quartz—far too vast to explore today. You pocket 35 GP and random salvage before leading the freed miners out.", onEnter:{ gold:35, items: rollRandomLoot(["consumable","valuable","material"], 1), msg:"Looted 35 GP & random salvage!" }, choices:[
            { t:"Return to Oakhaven! (Unlocks Part II: The Crystal Deep)", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Savior of the Salt-Mines", text:"Foreman Durn clasps your hand in relief as the miners stumble into daylight. Yet the deeper hum still echoes below—<strong>Part II: The Singing Heart of the Crystal Deep</strong> is now unlocked on your Quest Board!", ending:{ type:"true", title:"Cleared the Whispering Mines", xp:90, gold:95, trophy:"Singing Salt-Crystal" }, choices:[] }
        }
      },

      // ==========================================================
      // QUEST 2: THE SUNKEN LIGHTHOUSE OF DREADMOOR (10 PAGES)
      // Uniques: stormglass_blade, keepers_oilskin
      // ==========================================================
      sunken_lighthouse: {
        id: "sunken_lighthouse",
        title: "The Sunken Lighthouse of Dreadmoor",
        subtitle: "Green-Flame Beacon on the Wreckers' Reef",
        difficulty: "Medium",
        recommendedLevel: 2,
        discoverySource: "Old Keeper Barnaby (Tavern)",
        summary: "Cross the storm-lashed causeway to Dreadmoor Lighthouse, battle drowned wreckers, and extinguish the ghostly Lantern-Warden's beacon.",
        totalPages: 10,
        pages: {
          1: { zone:"Storm Causeway", title:"The Wave-Lashed Causeway", safeRetreat:true, text:"Lightning splits the black sky above Dreadmoor's tilted stone lighthouse, whose top lens burns with eerie green fire. Beside the base sits a dry oil-shed and the iron entry door.", choices:[
            { t:"Check Barnaby's oil-shed before entering.", to:2 },
            { t:"Push open the rusted lighthouse door.", to:3 }
          ]},
          2: { zone:"Oil-Shed", title:"Barnaby's Storm-Locker", text:"Dry beneath oiled canvas hangs the Keeper's Storm-Coat alongside random salvaged gear and a brass lens-wrench!", onEnter:{ cw:"LENS_WRENCH", items:["keepers_oilskin", ...rollRandomLoot(["consumable","material"], 1)], msg:"Found Keeper's Storm-Coat, LENS_WRENCH & random loot!" }, choices:[
            { t:"Enter the lighthouse base.", to:3 }
          ]},
          3: { zone:"Lower Tower", title:"The Flooded Spiral", text:"Cold surf sloshes across the bottom steps as two kelp-draped Drowned Wreckers lunge with rusted boat-hooks!", enemy:{ name:"Drowned Wreckers", desc:"Undead reef-looters.", hp:18, ac:10, atk:3, dmg:4, undead:true, xp:38, gold:22, items:["sea_salt", ...rollRandomLoot(["valuable","consumable"], 1)], flee:1 }, choices:[
            { t:"Climb to the Watchroom Gallery.", to:4 }
          ]},
          4: { zone:"Mid Tower", title:"The Cracked Gallery", text:"Gale winds howl through shattered windows across a missing stretch of spiral stair!", choices:[
            { t:"Leap the storm-swept gap with Agility / Athletics.", badge:"Agility DC 10", check:{ stat:"agility", skill:"Athletics", dc:10, pass:5, fail:5, failDmg:3, passMsg:"You catch the iron rail cleanly!", failMsg:"Slick stone bruises your ribs (-3 HP)!" } },
            { t:"Cast Arcane Shield against the gale and cross.", reqSpell:"Arcane Shield", mp:3, badge:"Arcane Shield (3 MP)", to:5 }
          ]},
          5: { zone:"Watchroom", title:"The Captain's Chart-Chest", text:"A waterproof chest lashed to the wall holds 30 GP and random shipwreck treasures.", onEnter:{ gold:30, items: rollRandomLoot(["weapon","armor","valuable","consumable"], 2), msg:"Looted 30 GP & 2 random items!" }, choices:[
            { t:"Ascend into the Green-Flame Lantern Room!", to:6 }
          ]},
          6: { zone:"Lantern Room", title:"The Lantern-Warden", text:"Green soulfire roars inside the giant brass Fresnel lens! Floating beside it, the spectral Lantern-Warden raises a gleaming Stormglass Cutlass!", choices:[
            { t:"Jam the brass lens-gear with Barnaby's Wrench!", reqCw:"LENS_WRENCH", badge:"LENS_WRENCH", to:7 },
            { t:"Confront the Lantern-Warden head-on!", to:8 }
          ]},
          7: { zone:"Lantern Room", title:"The Sputtering Beacon", text:"With a screech of brass, the green lens jams and dims! Shrieking, the weakened phantom lunges!", enemy:{ name:"Lantern-Warden (Dimmed)", desc:"Ghostly keeper severed from his beacon.", hp:21, ac:11, atk:4, dmg:5, undead:true, xp:78, gold:60, items:["stormglass_blade", ...rollRandomLoot(["valuable","consumable"], 1)] }, choices:[
            { t:"Relight the true golden oil-lamp!", to:9 }
          ]},
          8: { zone:"Lantern Room", title:"Wrath of the Green Flame", text:"Emerald lightning arcs from the spinning lens as the Lantern-Warden slashes!", enemy:{ name:"The Lantern-Warden", desc:"Undying phantom of Dreadmoor Reef.", hp:27, ac:12, atk:5, dmg:5, undead:true, xp:92, gold:70, items:["stormglass_blade", ...rollRandomLoot(["valuable","accessory"], 1)] }, choices:[
            { t:"Relight the true golden oil-lamp!", to:9 }
          ]},
          9: { zone:"Lantern Room", title:"Safe Harbor Restored", text:"Warm golden light sweeps across the dark waves once more, guiding a distant merchant brig clear of the rocks. You gather 40 GP in reef-salvage from the gallery.", onEnter:{ gold:40, items: rollRandomLoot(["valuable","consumable"], 1), msg:"Collected 40 GP & random salvage!" }, choices:[
            { t:"Return to Old Keeper Barnaby in Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Savior of Dreadmoor Reef", text:"Old Keeper Barnaby wipes his eyes as the warm golden beam rotates across the horizon. Oakhaven's merchants celebrate with a generous harbor bounty!", ending:{ type:"true", title:"Beacon-Keeper of Dreadmoor", xp:95, gold:105, trophy:"Brass Fresnel Prism" }, choices:[] }
        }
      },

      // ==========================================================
      // QUEST 3: THE RAVENCREST BANDIT CITADEL (10 PAGES)
      // Uniques: ravencrest_halberd, mercenary_pauldron
      // ==========================================================
      bandit_citadel: {
        id: "bandit_citadel",
        title: "The Ravencrest Bandit Citadel",
        subtitle: "Stronghold of the Black Banner Mercenaries",
        difficulty: "Medium",
        recommendedLevel: 2,
        discoverySource: "Captain Mireille (Tavern)",
        summary: "Infiltrate the captured hilltop fort of Ravencrest, sabotage the brigands' armory, and duel Warlord Vane for his halberd and black-banner armor.",
        totalPages: 10,
        pages: {
          1: { zone:"Fort Approach", title:"The Black Banner Gate", safeRetreat:true, text:"Tattered black pennants snap above Ravencrest's stone walls. Archers patrol the main gate, while a mossy drainage grate lies hidden in the eastern ditch.", choices:[
            { t:"Slip through the eastern drainage grate.", badge:"Stealth / Lockpicking DC 9", check:{ stat:"agility", skill:"Stealth", dc:9, pass:2, fail:3, passMsg:"You sneak straight into the fort's barracks!", failMsg:"A sentry spots you and sounds the horn!" } },
            { t:"Kick open the sally-gate and storm the courtyard!", to:3 }
          ]},
          2: { zone:"Fort Barracks", title:"The Unwatched Armory", text:"While the bandits dice outside, you lift a suit of Black-Banner Brigandine from a rack, pocket random supplies, and spike their crossbow bolts!", onEnter:{ cw:"ARROWS_SPIKED", items:["mercenary_pauldron", ...rollRandomLoot(["consumable","valuable"], 1)], msg:"Claimed Black-Banner Brigandine & spiked their arrows!" }, choices:[
            { t:"Step into the Courtyard to face the garrison.", to:3 }
          ]},
          3: { zone:"Courtyard", title:"The Black Banner Patrol", text:"Three scarred Mercenary Cutthroats leap from behind supply wagons with curved blades!", enemy:{ name:"Black Banner Cutthroats", desc:"Hardened caravan raiders.", hp:20, ac:11, atk:4, dmg:4, xp:42, gold:28, items: rollRandomLoot(["consumable","valuable","material"], 1), weakCw:["ARROWS_SPIKED"], flee:1 }, choices:[
            { t:"Raid the Quartermaster's Wagon.", to:4 },
            { t:"Climb the steps to Warlord Vane's Keep.", to:5 }
          ]},
          4: { zone:"Courtyard", title:"The Stolen Caravan Chest", text:"Inside a locked merchant wagon you recover 35 GP and two random items looted from Oakhaven traders.", onEnter:{ gold:35, items: rollRandomLoot(["weapon","armor","consumable","valuable"], 2), msg:"Recovered 35 GP & 2 random items!" }, choices:[
            { t:"Storm Warlord Vane's Keep!", to:5 }
          ]},
          5: { zone:"Keep Hall", title:"The Iron Portcullis", text:"Heavy spears line the hall leading to the Warlord's dais.", choices:[
            { t:"Bluff the door-guards with Persuasion.", badge:"Persuasion DC 10", check:{ stat:"spirit", skill:"Persuasion", dc:10, pass:6, fail:6, failDmg:3, passMsg:"They step aside in confusion!", failMsg:"A spear-butt catches your shoulder (-3 HP) as you burst through!" } },
            { t:"Charge straight through the doorway!", to:6 }
          ]},
          6: { zone:"Warlord's Dais", title:"Warlord Vane of the Black Banner", text:"A towering mercenary captain rises from a stolen gilded chair, spinning the gleaming Ravencrest Halberd. 'Mireille sent one hero to do an army's work? Come then!'", choices:[
            { t:"Taunt his weakened garrison and strike!", reqCw:"ARROWS_SPIKED", badge:"ARROWS_SPIKED", to:7 },
            { t:"Cross steel with Warlord Vane!", to:8 }
          ]},
          7: { zone:"Warlord's Dais", title:"The Cornered Warlord", text:"Realizing his archers can't back him up, Vane snarls and charges recklessly!", enemy:{ name:"Warlord Vane (Cornered)", desc:"Black Banner commander without support.", hp:23, ac:11, atk:4, dmg:5, xp:82, gold:65, items:["ravencrest_halberd", ...rollRandomLoot(["valuable","consumable"], 1)] }, choices:[
            { t:"Seize the Citadel War-Chest!", to:9 }
          ]},
          8: { zone:"Warlord's Dais", title:"Duel of the Black Banner", text:"Vane's heavy halberd whistles through the air with deadly reach!", enemy:{ name:"Warlord Vane", desc:"Ruthless leader of Ravencrest Citadel.", hp:28, ac:12, atk:5, dmg:6, xp:98, gold:75, items:["ravencrest_halberd", ...rollRandomLoot(["valuable","accessory"], 1)] }, choices:[
            { t:"Seize the Citadel War-Chest!", to:9 }
          ]},
          9: { zone:"Warlord's Dais", title:"Spoils of Ravencrest", text:"With Vane defeated, the remaining brigands scatter down the hillside. You claim 45 GP and a random treasure from his coffer.", onEnter:{ gold:45, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 1), msg:"Claimed 45 GP & random treasure!" }, choices:[
            { t:"Return to Captain Mireille in Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Breaker of the Black Banner", text:"Captain Mireille salutes you on the Town Square as Oakhaven's trade road reopens. The merchants chip in a handsome gold reward!", ending:{ type:"true", title:"Liberator of Ravencrest", xp:100, gold:115, trophy:"Black Banner Standard" }, choices:[] }
        }
      },

      // ==========================================================
      // QUEST 4: THE AMBER SANCTUARY OF SOLIS (10 PAGES)
      // Uniques: solaris_mace, amber_aegis
      // ==========================================================
      amber_sanctuary: {
        id: "amber_sanctuary",
        title: "The Amber Sanctuary of Solis",
        subtitle: "Sun-Baked Ruins of Golden Resin",
        difficulty: "Medium-Hard",
        recommendedLevel: 3,
        discoverySource: "Sun-Seeker Kaelen (Tavern)",
        summary: "Explore a desert temple frozen in translucent golden amber, outwit resin-bound constructs, and stop Dusk-Priestess Nyra from shattering the Solar Lens.",
        totalPages: 10,
        pages: {
          1: { zone:"Sun-Dunes", title:"The Golden Resin Arch", safeRetreat:true, text:"Translucent walls of golden amber glow like honey beneath the blazing sun. Ahead opens the Hall of Mirrors, while a cracked reliquary alcove glints to the right.", choices:[
            { t:"Inspect the cracked amber reliquary.", to:2 },
            { t:"Step directly into the Sun-Mirror Hall.", to:3 }
          ]},
          2: { zone:"Amber Alcove", title:"The Resin-Forged Aegis", text:"Freeing a loosened amber seal reveals the gleaming Resin-Forged Aegis and a random desert relic!", onEnter:{ items:["amber_aegis", ...rollRandomLoot(["valuable","consumable"], 1)], msg:"Claimed Resin-Forged Aegis & random loot!" }, choices:[
            { t:"Enter the Sun-Mirror Hall.", to:3 }
          ]},
          3: { zone:"Mirror Hall", title:"The Focused Sunbeam", text:"Mirrors channel a searing beam of sunlight across the narrow walkway!", choices:[
            { t:"Angle a bronze mirror with Lore / Arcana.", badge:"Arcana / Lore DC 10", check:{ stat:"arcana", skill:"Lore", dc:10, pass:4, fail:4, failDmg:4, passMsg:"You redirect the beam to melt the inner seal!", failMsg:"Blinding glare scorches your cloak (-4 HP)!" }, onPass:{ cw:"SUN_SEAL_MELTED" } },
            { t:"Roll swiftly beneath the beam with Agility.", badge:"Agility DC 10", check:{ stat:"agility", skill:"Athletics", dc:10, pass:4, fail:4, failDmg:4, passMsg:"You tumble cleanly past the heat!", failMsg:"Heat blisters your arm (-4 HP)!" } }
          ]},
          4: { zone:"Amber Nave", title:"The Amber Sentinel", text:"A tall golden construct cracks free from the wall, swinging a heavy crystal blade!", enemy:{ name:"Amber-Forged Sentinel", desc:"Ancient sun-temple automaton.", hp:24, ac:12, atk:4, dmg:5, xp:52, gold:34, items:["golden_scarab", ...rollRandomLoot(["material","consumable"], 1)], flee:1 }, choices:[
            { t:"Search the Priest's Offering Vault.", to:5 },
            { t:"Ascend to the Dome of the Solar Lens.", to:6 }
          ]},
          5: { zone:"Offering Vault", title:"Solis's Tribute", text:"Golden incense bowls hold 40 GP and two random treasures preserved in dry air.", onEnter:{ gold:40, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 2), msg:"Looted 40 GP & 2 random items!" }, choices:[
            { t:"Ascend to the Dome of the Solar Lens.", to:6 }
          ]},
          6: { zone:"Solar Dome", title:"Dusk-Priestess Nyra", text:"Beneath a shimmering crystal skylight, Dusk-Priestess Nyra lifts the radiant Solaris Sun-Mace to smash the temple's Solar Lens!", choices:[
            { t:"Unleash the redirected sunbeam to blind her!", reqCw:"SUN_SEAL_MELTED", badge:"SUN_SEAL_MELTED", to:7 },
            { t:"Charge Dusk-Priestess Nyra before she strikes!", to:8 }
          ]},
          7: { zone:"Solar Dome", title:"Blinded by Dawn", text:"Golden light floods the dome, shattering Nyra's shadow-ward as she lunges desperately!", enemy:{ name:"Dusk-Priestess Nyra (Blinded)", desc:"Shadow cultist stripped of her veil.", hp:24, ac:12, atk:4, dmg:5, xp:92, gold:75, items:["solaris_mace", ...rollRandomLoot(["valuable","consumable"], 1)] }, choices:[
            { t:"Secure the Solar Lens!", to:9 }
          ]},
          8: { zone:"Solar Dome", title:"Eclipse in the Dome", text:"Violet shadow-whips erupt around Nyra as she swings the stolen Sun-Mace!", enemy:{ name:"Dusk-Priestess Nyra", desc:"Champion of the Eclipse Cult.", hp:30, ac:13, atk:5, dmg:6, xp:110, gold:85, items:["solaris_mace", ...rollRandomLoot(["valuable","accessory"], 1)] }, choices:[
            { t:"Secure the Solar Lens!", to:9 }
          ]},
          9: { zone:"Solar Dome", title:"The Preserved Lens", text:"With Nyra vanquished, the Solar Lens hums softly in warm amber light. You gather 50 GP and a random temple treasure.", onEnter:{ gold:50, items: rollRandomLoot(["valuable","consumable","material"], 1), msg:"Found 50 GP & random loot!" }, choices:[
            { t:"Return to Sun-Seeker Kaelen in Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Guardian of Solis", text:"Kaelen cheers as you confirm the Solar Lens stands intact, rewarding you handsomely for preserving the ancient sanctuary!", ending:{ type:"true", title:"Preserver of Solis", xp:115, gold:125, trophy:"Golden Solar Medallion" }, choices:[] }
        }
      },

      // ==========================================================
      // QUEST 5 (PART 1): THE SCORCHED NEST OF WYRM RIDGE (10 PAGES)
      // Uniques: drakefang_spear, cinderhide_vest
      // ==========================================================
      wyrm_ridge: {
        id: "wyrm_ridge",
        title: "The Scorched Nest of Wyrm Ridge",
        subtitle: "Part I • Volcanic Crags of the Cinder-Brood",
        difficulty: "Hard",
        recommendedLevel: 3,
        discoverySource: "Drake-Hunter Torin (Tavern)",
        summary: "Climb the smoking basalt ledges of Wyrm Ridge, survive ember-vents, and drive out the Cinder-Drake Broodmother before the Elder Wyrm awakens.",
        totalPages: 10,
        pages: {
          1: { zone:"Lower Crags", title:"The Smoking Trail", safeRetreat:true, text:"Ash drifts down the black volcanic slopes of Wyrm Ridge. Above, leathery wings circle a jagged ledge. A burned hunter's camp lies tucked under an overhang to your left.", choices:[
            { t:"Search the burned hunter's camp.", to:2 },
            { t:"Climb directly up the basalt switchbacks.", to:3 }
          ]},
          2: { zone:"Hunter's Camp", title:"Torin's Fallen Gear", text:"Protected beneath a stone slab you find a Cinderhide Scale-Vest and random drake-hunter supplies!", onEnter:{ items:["cinderhide_vest", ...rollRandomLoot(["consumable","material"], 1)], msg:"Found Cinderhide Scale-Vest & random loot!" }, choices:[
            { t:"Climb the basalt switchbacks.", to:3 }
          ]},
          3: { zone:"Volcanic Ledge", title:"The Sulfur Vents", text:"Scalding steam jets erupt randomly across the narrow ridge!", choices:[
            { t:"Time the vents with Perception or Survival.", badge:"Perception / Agility DC 11", check:{ stat:"agility", skill:"Perception", dc:11, pass:4, fail:4, failDmg:4, passMsg:"You dart cleanly between eruptions!", failMsg:"Hot ash scorches your cloak (-4 HP)!" } },
            { t:"Cool the vents ahead with Frost Nova.", reqSpell:"Frost Nova", mp:4, badge:"Frost Nova (4 MP)", to:4, onChoose:{ cw:"DRAKE_CHILLED", msg:"Frost coats the ridge cleanly!" } }
          ]},
          4: { zone:"Outer Nest", title:"The Cinder-Whelplings", text:"Two snapping Cinder-Drakes hiss and spit gouts of sparks!", enemy:{ name:"Cinder-Drake Whelplings", desc:"Fierce volcanic hatchlings.", hp:23, ac:12, atk:5, dmg:5, xp:55, gold:32, items:["dragonscale_scrap", ...rollRandomLoot(["material","valuable"], 1)], flee:1 }, choices:[
            { t:"Inspect the Charred Hoard Alcove.", to:5 },
            { t:"Step onto the Broodmother's Crag!", to:6 }
          ]},
          5: { zone:"Hoard Alcove", title:"The Melted Caravan", text:"Among scorched wagon-iron you recover 45 GP and two random treasures.", onEnter:{ gold:45, items: rollRandomLoot(["weapon","armor","consumable","valuable"], 2), msg:"Looted 45 GP & 2 random items!" }, choices:[
            { t:"Step onto the Broodmother's Crag!", to:6 }
          ]},
          6: { zone:"Broodmother's Crag", title:"The Cinder-Drake Matriarch", text:"A twenty-foot crimson drake unfurls smoking wings atop a pile of bones, where a gleaming Drakefang Spear juts from the ash!", choices:[
            { t:"Blast her fiery throat with Frost Nova!", reqSpell:"Frost Nova", mp:4, badge:"Frost Nova (4 MP)", to:7 },
            { t:"Face the Cinder-Drake Matriarch in battle!", to:8 }
          ]},
          7: { zone:"Broodmother's Crag", title:"Frost Against Flame", text:"Your frost-burst chokes her fire-breath in billowing steam! Snarling, the weakened drake lunges with razor claws!", enemy:{ name:"Cinder-Drake Matriarch (Chilled)", desc:"Volcanic drake stripped of her flame.", hp:25, ac:12, atk:5, dmg:5, xp:95, gold:75, items:["drakefang_spear","dragonscale_scrap"] }, choices:[
            { t:"Claim the nest's spoils and gaze into the Caldera!", to:9 }
          ]},
          8: { zone:"Broodmother's Crag", title:"Fury of the Ridge", text:"Sheets of orange flame sweep the basalt ledge as the Matriarch attacks!", enemy:{ name:"Cinder-Drake Matriarch", desc:"Apex predator of the outer crags.", hp:32, ac:13, atk:5, dmg:6, xp:115, gold:85, items:["drakefang_spear","dragonscale_scrap"] }, choices:[
            { t:"Claim the nest's spoils and gaze into the Caldera!", to:9 }
          ]},
          9: { zone:"Broodmother's Crag", title:"A Roar From Below", text:"As the Matriarch falls, a seismic roar shakes the entire mountain—deep inside the volcanic caldera, an ancient Elder Wyrm has smelled blood! You snatch 50 GP and a random treasure before retreating down the ridge.", onEnter:{ gold:50, items: rollRandomLoot(["valuable","accessory","consumable"], 1), msg:"Looted 50 GP & random treasure!" }, choices:[
            { t:"Report back to Torin! (Unlocks Part II: Lair of Ignaroth)", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Clearer of Wyrm Ridge", text:"Torin pales as you describe the roar from the caldera. 'You cleared the outer brood—now Ignaroth himself is awake!' <strong>Part II: Lair of the Elder Ember-Wyrm</strong> is now unlocked!", ending:{ type:"true", title:"Slayer of the Cinder-Brood", xp:120, gold:130, trophy:"Crimson Drake-Horn" }, choices:[] }
        }
      },

      // ==========================================================
      // QUEST 6 (PART 2 OF MALAKOR): THE PHYLACTERY THRONE (12 PAGES)
      // Prerequisite: `malakor` | Uniques: soulreaver_claymore, regent_plate, phylactery_shard
      // ==========================================================
      malakor_part2: {
        id: "malakor_part2",
        reqQuest: "malakor",
        title: "Part II: The Phylactery Throne of Malakor",
        subtitle: "Sequel to The Sunken Vault • The Deep Necropolis",
        difficulty: "Hard",
        recommendedLevel: 4,
        autoDiscover: true,
        discoverySource: "Unlocks after completing The Sunken Vault of Malakor",
        summary: "Descend beneath Malakor's shattered dais into his hidden Grand Necropolis, where Death-Knight Regent Vaelor is attempting to resurrect the Lich-King!",
        totalPages: 12,
        pages: {
          1: { zone:"Shattered Dais", title:"The Rift Beneath the Throne", safeRetreat:true, text:"Where Lich-King Malakor once fell, the obsidian floor has split wide open—revealing a spiral descent of violet fire into a hidden Grand Necropolis. Cold chanting echoes from the abyss.", choices:[
            { t:"Descend the violet spiral into the Hall of Regents.", to:2 },
            { t:"Inspect a fallen Paladin's reliquary near the rim.", to:3 }
          ]},
          2: { zone:"Hall of Regents", title:"The Dread-Guard Vanguard", text:"Two towering Skeletal Knights in blackened plate step from wall-alcoves, raising soulfire halberds!", enemy:{ name:"Malakor's Dread-Guard", desc:"Elite undead honor guard.", hp:26, ac:12, atk:5, dmg:6, undead:true, xp:68, gold:42, items:["obsidian_dust", ...rollRandomLoot(["consumable","valuable"], 1)], flee:1 }, choices:[
            { t:"Enter the Soul-Forge Chamber to the east.", to:4 },
            { t:"Advance toward the Chanting Nave.", to:6 }
          ]},
          3: { zone:"Shattered Dais", title:"The Dawn-Seals", text:"You recover a starlight-blessed Phoenix Tonic and a Dawn-Seal Sigil that disrupts necromantic resurrection rituals!", onEnter:{ cw:"DAWN_SEAL", items:["phoenix_tonic", ...rollRandomLoot(["consumable"], 1)], msg:"Found DAWN_SEAL & Phoenix Tonic!" }, choices:[
            { t:"Descend into the Hall of Regents.", to:2 }
          ]},
          4: { zone:"Soul-Forge", title:"The Regent's Armory", text:"Beside a cold soul-furnace rests the legendary Regent's Dread-Plate and a cache of random necropolis plunder!", onEnter:{ gold:45, items:["regent_plate", ...rollRandomLoot(["weapon","valuable","material"], 1)], msg:"Claimed Regent's Dread-Plate, 45 GP & random loot!" }, choices:[
            { t:"Inspect the Phylactery Conduit.", to:5 },
            { t:"March into the Chanting Nave.", to:6 }
          ]},
          5: { zone:"Soul-Forge", title:"The Soul Conduit", text:"Violet energy pulses through a crystal lens toward the inner throne.", choices:[
            { t:"Shatter the conduit with Turn Undead or Arcana!", badge:"Arcana / Spirit DC 11", check:{ stat:"spirit", skill:"Lore", dc:11, pass:6, fail:6, failDmg:4, passMsg:"The conduit explodes, severing Vaelor's dark link!", failMsg:"Necrotic sparks sear you (-4 HP)!" }, onPass:{ cw:"CONDUIT_BROKEN" } }
          ]},
          6: { zone:"Chanting Nave", title:"The Necromancer Choir", text:"Three hooded Liches-in-waiting channel violet beams into an obsidian casket!", enemy:{ name:"Choir of Bone-Mages", desc:"Malakor's ritual cultists.", hp:25, ac:12, atk:5, dmg:6, undead:true, xp:72, gold:48, items:["starlight_vial", ...rollRandomLoot(["valuable","material"], 1)], flee:1 }, choices:[
            { t:"Pause to gather the Purified Phylactery Shard from the altar.", to:7 },
            { t:"Kick open the doors to the Phylactery Throne!", to:8 }
          ]},
          7: { zone:"Chanting Nave", title:"The Purified Shard", text:"You pluck the Purified Phylactery Shard from the silenced altar—humming with reclaimed arcane power!", onEnter:{ items:["phylactery_shard", ...rollRandomLoot(["consumable"], 1)], msg:"Claimed Purified Phylactery Shard!" }, choices:[
            { t:"Enter the Phylactery Throne Room!", to:8 }
          ]},
          8: { zone:"Phylactery Throne", title:"Death-Knight Regent Vaelor", text:"Standing before Malakor's reassembling crown stands Death-Knight Regent Vaelor, hefting the massive Soulreaver Claymore. 'You slew my King once, mortal! This time, your soul fuels his return!'", choices:[
            { t:"Invoke the Dawn-Seal to shatter his resurrection circle!", reqCw:"DAWN_SEAL", badge:"DAWN_SEAL", to:9 },
            { t:"Duel Regent Vaelor at full strength!", to:10 }
          ]},
          9: { zone:"Phylactery Throne", title:"The Broken Resurrection", text:"Golden light erupts across the obsidian floor, cracking Vaelor's dark armor as he charges in fury!", enemy:{ name:"Regent Vaelor (Unbound)", desc:"Death-Knight stripped of Malakor's blessing.", hp:30, ac:12, atk:5, dmg:6, undead:true, xp:130, gold:110, items:["soulreaver_claymore", ...rollRandomLoot(["valuable","accessory"], 1)], weakCw:["CONDUIT_BROKEN"] }, choices:[
            { t:"Seal the Grand Necropolis forever!", to:11 }
          ]},
          10: { zone:"Phylactery Throne", title:"Clash of the Undying", text:"Blue soulfire screams off the Soulreaver Claymore with every earth-shaking blow!", enemy:{ name:"Death-Knight Regent Vaelor", desc:"Supreme champion of Malakor's court.", hp:38, ac:13, atk:6, dmg:7, undead:true, xp:155, gold:130, items:["soulreaver_claymore", ...rollRandomLoot(["valuable","weapon"], 1)], weakCw:["CONDUIT_BROKEN"] }, choices:[
            { t:"Seal the Grand Necropolis forever!", to:11 }
          ]},
          11: { zone:"Phylactery Throne", title:"Final Silence of Malakor", text:"As Vaelor crumbles to ash, the violet fire dies forever. You claim 75 GP and a random treasure from the Regent's coffer before ascending to the marshes.", onEnter:{ gold:75, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 1), msg:"Claimed 75 GP & random treasure!" }, choices:[
            { t:"Return to Oakhaven as Conqueror of the Necropolis!", to:12 }
          ]},
          12: { zone:"Epilogue", title:"End of the Undying Reign", text:"Grave-Watcher Corvus bows deeply before the Temple of the Dawn as you present Vaelor's shattered helm. Malakor's lineage is ended for all time!", ending:{ type:"true", title:"Bane of the Necropolis (Pt. II)", xp:160, gold:175, trophy:"Vaelor's Black Crown" }, choices:[] }
        }
      },

      // ==========================================================
      // QUEST 7 (PART 2 OF THORNWOOD): HEART OF THE BLIGHT-WOOD (10 PAGES)
      // Prerequisite: `thornwood` | Uniques: heartwood_bowblade, crown_of_thorns
      // ==========================================================
      thornwood_part2: {
        id: "thornwood_part2",
        reqQuest: "thornwood",
        title: "Part II: The Heart of the Blight-Wood",
        subtitle: "Sequel to Thornwood • The Deep Root-Caverns",
        difficulty: "Medium-Hard",
        recommendedLevel: 3,
        autoDiscover: true,
        discoverySource: "Unlocks after completing The Whispering Barrows of Thornwood",
        summary: "Descend beneath the healed Heart-Tree into the subterranean Root-Caverns, where a Void-corrupted Arch-Treant still poisons the forest's deep springs.",
        totalPages: 10,
        pages: {
          1: { zone:"Root-Caverns", title:"The Hollow Below the Heart-Tree", safeRetreat:true, text:"Beneath the barrow's ancient oak, roots coil downward into a cavernous grotto dripping with black sap. Elven Ranger Lyra has tied a silver guide-rope to the upper roots.", choices:[
            { t:"Climb down into the Sap-Drenched Vault.", to:2 },
            { t:"Search the Dryad's Forgotten Shrine along the ledge.", to:3 }
          ]},
          2: { zone:"Root-Caverns", title:"The Blight-Spriggans", text:"Three gnarled bark-creatures peel off the cavern walls with jagged thorn-claws!", enemy:{ name:"Blight-Spriggans", desc:"Void-twisted forest spirits.", hp:22, ac:11, atk:4, dmg:5, xp:52, gold:30, items:["glowcap_spores", ...rollRandomLoot(["consumable","material"], 1)], flee:1 }, choices:[
            { t:"Follow the pulsing black roots to the Deep Spring.", to:4 }
          ]},
          3: { zone:"Dryad Shrine", title:"The Circlet of Living Thorns", text:"Resting in a bowl of clean springwater gleams the Circlet of Living Thorns alongside a random forest relic!", onEnter:{ cw:"DRYAD_GRACE", items:["crown_of_thorns", ...rollRandomLoot(["consumable","valuable"], 1)], msg:"Claimed Circlet of Living Thorns & DRYAD_GRACE!" }, choices:[
            { t:"Descend into the Sap-Drenched Vault.", to:2 }
          ]},
          4: { zone:"Deep Spring", title:"The Choking Vines", text:"Barbed void-vines whip across the stepping stones over the poisoned subterranean river!", choices:[
            { t:"Incinerate the void-vines with Firebolt!", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:5 },
            { t:"Weave past them with Agility or Herbalism.", badge:"Agility / Herbalism DC 11", check:{ stat:"agility", skill:"Herbalism", dc:11, pass:5, fail:5, failDmg:4, passMsg:"You slip through untouched!", failMsg:"Black thorns lash your arm (-4 HP)!" } }
          ]},
          5: { zone:"Deep Spring", title:"The Sunken Elven Cache", text:"Wedged between clean roots rests an ancient elven chest with 45 GP and two random treasures.", onEnter:{ gold:45, items: rollRandomLoot(["weapon","armor","consumable","valuable"], 2), msg:"Looted 45 GP & 2 random items!" }, choices:[
            { t:"Step into the Cavern of the Void-Treant!", to:6 }
          ]},
          6: { zone:"Root-Sanctum", title:"Arch-Treant Malgroot", text:"Towering twenty feet tall in dripping black sap, the corrupted Arch-Treant Malgroot uproots itself, clutching the gleaming Heartwood Twinblade inside its bark!", choices:[
            { t:"Raise the Dryad's Grace to purge its black sap!", reqCw:"DRYAD_GRACE", badge:"DRYAD_GRACE", to:7 },
            { t:"Battle Arch-Treant Malgroot!", to:8 }
          ]},
          7: { zone:"Root-Sanctum", title:"The Splitting Bark", text:"Emerald light cracks the void-crust across Malgroot's trunk! Groaning, the weakened giant swings its massive boughs!", enemy:{ name:"Arch-Treant Malgroot (Purged)", desc:"Corrupted elder tree losing its void armor.", hp:26, ac:12, atk:5, dmg:5, xp:98, gold:75, items:["heartwood_bowblade", ...rollRandomLoot(["valuable","consumable"], 1)] }, choices:[
            { t:"Cleanse the Deep Spring!", to:9 }
          ]},
          8: { zone:"Root-Sanctum", title:"Wrath of the Blight-Wood", text:"Tremors shake the cavern ceiling as Malgroot slams colossal root-fists down!", enemy:{ name:"Arch-Treant Malgroot", desc:"Void-corrupted heart of the forest.", hp:33, ac:13, atk:5, dmg:6, xp:118, gold:85, items:["heartwood_bowblade", ...rollRandomLoot(["valuable","accessory"], 1)] }, choices:[
            { t:"Cleanse the Deep Spring!", to:9 }
          ]},
          9: { zone:"Root-Sanctum", title:"Pure Waters Flow", text:"As the void-sap dissolves, crystal water surges upward to nourish all of Thornwood! You collect 50 GP and a random treasure washed clean by the spring.", onEnter:{ gold:50, items: rollRandomLoot(["valuable","material","consumable"], 1), msg:"Found 50 GP & random loot!" }, choices:[
            { t:"Return to Lyra and Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Champion of the Living Wood", text:"Green light ripples across the entire canopy of Thornwood. Lyra awards you the highest honor of the forest rangers!", ending:{ type:"true", title:"Savior of the Deep Wood (Pt. II)", xp:125, gold:135, trophy:"Evergreen Heart-Seed" }, choices:[] }
        }
      },

      // ==========================================================
      // QUEST 8 (PART 2 OF SALTFANG): THE ABYSSAL FLEET (10 PAGES)
      // Prerequisite: `saltfang` | Uniques: abyssal_trident, pirate_king_coat
      // ==========================================================
      saltfang_part2: {
        id: "saltfang_part2",
        reqQuest: "saltfang",
        title: "Part II: The Abyssal Fleet of Saltfang",
        subtitle: "Sequel to Saltfang Cove • The Leviathan's Maw",
        difficulty: "Medium-Hard",
        recommendedLevel: 3,
        autoDiscover: true,
        discoverySource: "Unlocks after completing The Smuggler's Cove of Saltfang",
        summary: "Descend into the drained whirlpool beneath Saltfang Lagoon to board the drowned Pirate King's flagship and defeat the Kraken-Priest commanding the abyssal tide!",
        totalPages: 10,
        pages: {
          1: { zone:"Drained Whirlpool", title:"The Sunken Flagship", safeRetreat:true, text:"Where the Dreadtide sank, a shimmering air-dome has formed around a colossal sunken galleon: <em>The Leviathan's Maw</em>. Coral-crusted gangplanks lead onto its deck.", choices:[
            { t:"Search the Admiral's Lifeboat along the seabed.", to:2 },
            { t:"Climb the coral gangplank onto the Main Deck.", to:3 }
          ]},
          2: { zone:"Seabed", title:"The Admiral's Locker", text:"Inside a barnacle-sealed chest lies the Leviathan Admiral's Coat and a random shipwreck item!", onEnter:{ items:["pirate_king_coat", ...rollRandomLoot(["consumable","valuable"], 1)], msg:"Claimed Leviathan Admiral's Coat & random loot!" }, choices:[
            { t:"Board The Leviathan's Maw.", to:3 }
          ]},
          3: { zone:"Main Deck", title:"The Coral-Bound Crew", text:"Barnacle-armored Deep-One Marauders rise from the rigging with barbed tridents!", enemy:{ name:"Deep-One Marauders", desc:"Abyssal sea-cultists.", hp:23, ac:12, atk:4, dmg:5, xp:55, gold:35, items:["sea_salt", ...rollRandomLoot(["valuable","consumable"], 1)], flee:1 }, choices:[
            { t:"Inspect the Sunken Treasure Hold.", to:4 },
            { t:"Storm the Coral-Throne Forecastle.", to:5 }
          ]},
          4: { zone:"Treasure Hold", title:"The Pirate King's Bullion", text:"Piles of gold doubloons glitter beside 45 GP and two random treasures.", onEnter:{ gold:45, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 2), msg:"Looted 45 GP & 2 random items!" }, choices:[
            { t:"Cut the Kraken-Idol's anchor chain!", badge:"Might / Lockpicking DC 10", check:{ stat:"might", skill:"Lockpicking", dc:10, pass:5, fail:5, failDmg:3, passMsg:"The ship lurches, disrupting the Kraken-Priest's ritual!", failMsg:"Snap-back iron bruises your ribs (-3 HP)!" }, onPass:{ cw:"ANCHOR_CUT" } }
          ]},
          5: { zone:"Forecastle", title:"Kraken-Priest Orlov", text:"Tentacles of green seawater coil around the ship's wheel as Kraken-Priest Orlov raises the crackling Abyssal Tide-Trident!", choices:[
            { t:"Press the advantage while the ship tilts!", reqCw:"ANCHOR_CUT", badge:"ANCHOR_CUT", to:6 },
            { t:"Challenge Kraken-Priest Orlov directly!", to:7 }
          ]},
          6: { zone:"Forecastle", title:"Broken Tide", text:"His tidal ward shatters as the listing deck throws Orlov off balance!", enemy:{ name:"Kraken-Priest Orlov (Off-Balance)", desc:"Abyssal priest severed from the whirlpool.", hp:25, ac:12, atk:5, dmg:5, xp:95, gold:80, items:["abyssal_trident", ...rollRandomLoot(["valuable","consumable"], 1)] }, choices:[
            { t:"Claim the Abyssal Vault before the dome collapses!", to:8 }
          ]},
          7: { zone:"Forecastle", title:"Wrath of the Deep", text:"Crashing waves and lightning erupt from the Abyssal Tide-Trident!", enemy:{ name:"Kraken-Priest Orlov", desc:"Master of the drowned fleet.", hp:32, ac:13, atk:5, dmg:6, xp:115, gold:95, items:["abyssal_trident", ...rollRandomLoot(["valuable","accessory"], 1)] }, choices:[
            { t:"Claim the Abyssal Vault before the dome collapses!", to:8 }
          ]},
          8: { zone:"Forecastle", title:"The Rising Waters", text:"You grab 55 GP and a random relic from the helm-chest as seawater begins pouring back into the lagoon!", onEnter:{ gold:55, items: rollRandomLoot(["valuable","consumable","material"], 1), msg:"Snatched 55 GP & random loot!" }, choices:[
            { t:"Ride the rising tide back to Saltfang Pier!", to:9 }
          ]},
          9: { zone:"Saltfang Pier", title:"Calm Seas at Last", text:"The whirlpool seals forever beneath calm blue waves.", choices:[
            { t:"Return to Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Admiral of Oakhaven", text:"Smuggler Vex raises a double rum in awe as you lay the Abyssal Trident across the bar. Saltfang's waters are truly free at last!", ending:{ type:"true", title:"Conqueror of the Abyssal Fleet (Pt. II)", xp:130, gold:150, trophy:"Kraken-Gold Astrolabe" }, choices:[] }
        }
      },

      // ==========================================================
      // QUEST 9 (PART 2 OF SALT-MINES): THE CRYSTAL DEEP (10 PAGES)
      // Prerequisite: `whispering_mines` | Uniques: prism_greatsword, quartz_bulwark
      // ==========================================================
      whispering_mines_part2: {
        id: "whispering_mines_part2",
        reqQuest: "whispering_mines",
        title: "Part II: The Singing Heart of the Crystal Deep",
        subtitle: "Sequel to Salt-Mines • Cathedral of Living Quartz",
        difficulty: "Hard",
        recommendedLevel: 4,
        autoDiscover: true,
        discoverySource: "Unlocks after completing The Whispering Salt-Mines",
        summary: "Step beyond the salt-mine breach into a blinding subterranean cathedral of living quartz to shatter the Resonant Sovereign's crystal choir.",
        totalPages: 10,
        pages: {
          1: { zone:"Crystal Cathedral", title:"The Prism Nave", safeRetreat:true, text:"Hundred-foot spires of violet and rose quartz sing in eerie harmony beneath the earth. A shattered crystal golem lies near a side pillar while the Grand Choir Hall glitters ahead.", choices:[
            { t:"Salvage the shattered crystal golem.", to:2 },
            { t:"Walk straight into the Grand Choir Hall.", to:3 }
          ]},
          2: { zone:"Prism Nave", title:"The Resonant Bulwark", text:"Prying free the golem's intact shield-arm yields the Resonant Quartz Bulwark and a random gem treasure!", onEnter:{ items:["quartz_bulwark", ...rollRandomLoot(["valuable","material"], 1)], msg:"Claimed Resonant Quartz Bulwark & random loot!" }, choices:[
            { t:"Enter the Grand Choir Hall.", to:3 }
          ]},
          3: { zone:"Choir Hall", title:"The Crystal Sentinels", text:"Two faceless Quartz Knights detach from the cathedral walls, blades humming with sonic force!", enemy:{ name:"Quartz Choir-Knights", desc:"Living crystal guardians.", hp:26, ac:13, atk:5, dmg:6, xp:68, gold:42, items:["moonstone_shard", ...rollRandomLoot(["consumable","valuable"], 1)], flee:1 }, choices:[
            { t:"Inspect the Tuning Altar.", to:4 },
            { t:"Ascend the Prism Steps to the Sovereign's Dais.", to:5 }
          ]},
          4: { zone:"Choir Hall", title:"The Tuning Altar", text:"Striking the dissonant bronze gong cracks the cathedral's harmonic shield! You also recover 45 GP and random loot.", onEnter:{ cw:"HARMONY_BROKEN", gold:45, items: rollRandomLoot(["consumable","valuable","material"], 2), msg:"Broke HARMONY_BROKEN, looted 45 GP & 2 random items!" }, choices:[
            { t:"Ascend to the Resonant Sovereign's Dais!", to:5 }
          ]},
          5: { zone:"Sovereign's Dais", title:"The Resonant Sovereign", text:"Floating atop a throne of pure diamond-quartz hovers the Resonant Sovereign, wielding the blinding Prismatic Greatsword!", choices:[
            { t:"Exploit the fractured harmony and strike!", reqCw:"HARMONY_BROKEN", badge:"HARMONY_BROKEN", to:6 },
            { t:"Engage the Resonant Sovereign head-on!", to:7 }
          ]},
          6: { zone:"Sovereign's Dais", title:"Shattered Chord", text:"Fissures spiderweb across the Sovereign's crystal crown as it lunges with blinding speed!", enemy:{ name:"Resonant Sovereign (Cracked)", desc:"Crystalline entity losing its harmonic shield.", hp:29, ac:12, atk:5, dmg:6, xp:125, gold:105, items:["prism_greatsword","moonstone_shard"] }, choices:[
            { t:"Claim the Diamond Treasury!", to:8 }
          ]},
          7: { zone:"Sovereign's Dais", title:"Symphony of Shards", text:"Prismatic beams ricochet across the cathedral as the Sovereign swings its colossal sword!", enemy:{ name:"The Resonant Sovereign", desc:"Immortal ruler of the Crystal Deep.", hp:37, ac:13, atk:6, dmg:7, xp:150, gold:125, items:["prism_greatsword","moonstone_shard"] }, choices:[
            { t:"Claim the Diamond Treasury!", to:8 }
          ]},
          8: { zone:"Sovereign's Dais", title:"Silence in the Deep", text:"With a chime like a thousand falling bells, the Sovereign shatters into harmless stardust. You gather 65 GP and a random treasure.", onEnter:{ gold:65, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 1), msg:"Looted 65 GP & random treasure!" }, choices:[
            { t:"Ascend back through the peaceful salt-mines.", to:9 }
          ]},
          9: { zone:"Salt-Mine Entry", title:"Daylight Above", text:"The hypnotic hum is gone forever—only crisp mountain air greets you at the mine gate.", choices:[
            { t:"Return to Oakhaven!", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Breaker of the Crystal Choir", text:"Foreman Durn declares a town holiday as Oakhaven's salt-mines reopen safely, gifting you a master miner's share of gold!", ending:{ type:"true", title:"Conqueror of the Crystal Deep (Pt. II)", xp:155, gold:170, trophy:"Heart of Living Quartz" }, choices:[] }
        }
      },

      // ==========================================================
      // QUEST 10 (PART 2 OF WYRM RIDGE): LAIR OF IGNAROTH (12 PAGES)
      // Prerequisite: `wyrm_ridge` | Uniques: dragonfire_blade, elder_scale_plate, heart_of_ignaroth
      // ==========================================================
      wyrm_ridge_part2: {
        id: "wyrm_ridge_part2",
        reqQuest: "wyrm_ridge",
        title: "Part II: Lair of the Elder Ember-Wyrm",
        subtitle: "Sequel to Wyrm Ridge • Caldera of Ignaroth",
        difficulty: "Very Hard",
        recommendedLevel: 5,
        autoDiscover: true,
        discoverySource: "Unlocks after completing The Scorched Nest of Wyrm Ridge",
        summary: "Descend into the molten heart of Wyrm Ridge to face the ancient Elder Dragon Ignaroth and claim the greatest hoard in the frontier!",
        totalPages: 12,
        pages: {
          1: { zone:"Caldera Rim", title:"The Magma Descent", safeRetreat:true, text:"Rivers of orange lava illuminate a colossal cavern beneath Wyrm Ridge. Far below gleams a mountain of gold—and two massive yellow eyes open in the smoke!", choices:[
            { t:"Check the Ancient Dragon-Slayer's Alcove.", to:2 },
            { t:"March down the Obsidian Causeway.", to:3 }
          ]},
          2: { zone:"Slayer's Alcove", title:"Relics of a Fallen Hero", text:"Beside a melted shield rests an intact Elder-Wyrm Scale Plate forged from shed scales and a Phoenix Tonic!", onEnter:{ items:["elder_scale_plate","phoenix_tonic"], msg:"Claimed Elder-Wyrm Scale Plate & Phoenix Tonic!" }, choices:[
            { t:"March down the Obsidian Causeway.", to:3 }
          ]},
          3: { zone:"Obsidian Causeway", title:"The Magma Drake-Guard", text:"An armored Magma Wyvern swoops across the lava bridge to bar your approach!", enemy:{ name:"Magma Wyvern", desc:"Ignaroth's fierce volcanic sentinel.", hp:30, ac:13, atk:5, dmg:6, xp:85, gold:55, items:["dragonscale_scrap", ...rollRandomLoot(["consumable","valuable"], 1)], flee:1 }, choices:[
            { t:"Inspect the Frost-Crystal Chimney on the cavern wall.", to:4 },
            { t:"Advance straight to the Dragon's Hoard!", to:6 }
          ]},
          4: { zone:"Caldera Wall", title:"The Glacial Vein", text:"A vein of ancient glacier-ice hangs precariously above the lava floor!", choices:[
            { t:"Shatter the ice-vein with Might or Firebolt to douse the caldera!", badge:"Might / Arcana DC 11", check:{ stat:"might", skill:"Athletics", dc:11, pass:5, fail:6, passMsg:"Avalanches of ice plunge down, chilling Ignaroth's fiery hide!", failMsg:"The stone holds fast—you press on toward the hoard!" }, onPass:{ cw:"WYRM_CHILLED" } }
          ]},
          5: { zone:"Caldera Wall", title:"The Frozen Advantage", text:"Steam billows across the caldera as Ignaroth roars in shock! You also snatch a random treasure and 50 GP from a cracked basalt shelf.", onEnter:{ gold:50, items: rollRandomLoot(["consumable","valuable","accessory"], 1), msg:"Looted 50 GP & random item!" }, choices:[
            { t:"Step onto the Mountain of Gold!", to:6 }
          ]},
          6: { zone:"Dragon's Hoard", title:"Ignaroth the Elder Ember-Wyrm", text:"Claws clutching mountains of gold and rubies, the colossal Elder Dragon Ignaroth rears skyward—heat radiating like a furnace! 'Little mortal! You slew my brood—now burn upon my gold!'", choices:[
            { t:"Strike while the glacier-steam weakens his scales!", reqCw:"WYRM_CHILLED", badge:"WYRM_CHILLED", to:7 },
            { t:"Challenge Ignaroth the Elder Wyrm at full fury!", to:8 }
          ]},
          7: { zone:"Dragon's Hoard", title:"Steam and Steel", text:"Cracked and steaming, Ignaroth's scales yield to your steel as the mighty wyrm lunges!", enemy:{ name:"Ignaroth (Chilled)", desc:"Ancient Ember-Wyrm weakened by glacial steam.", hp:36, ac:13, atk:6, dmg:7, xp:175, gold:150, items:["dragonfire_blade","heart_of_ignaroth"] }, choices:[
            { t:"Stand triumphant atop the Dragon's Hoard!", to:9 }
          ]},
          8: { zone:"Dragon's Hoard", title:"Legend of the Dragon-Slayer", text:"Dragonfire erupts across the gold mountain in the fiercest battle Oakhaven has ever known!", enemy:{ name:"Ignaroth the Elder Wyrm", desc:"Supreme Apex Dragon of Wyrm Ridge.", hp:45, ac:14, atk:7, dmg:8, xp:220, gold:200, items:["dragonfire_blade","heart_of_ignaroth"] }, choices:[
            { t:"Stand triumphant atop the Dragon's Hoard!", to:9 }
          ]},
          9: { zone:"Dragon's Hoard", title:"The Greatest Hoard", text:"Ignaroth collapses with a thunderous sigh, his furnace fading to embers. You fill your pack with 100 GP and two random legendary spoils!", onEnter:{ gold:100, items: rollRandomLoot(["weapon","armor","accessory","valuable"], 2), msg:"Claimed 100 GP & 2 random hoard treasures!" }, choices:[
            { t:"Ascend from the quieted caldera to Oakhaven!", to:10 }
          ]},
          10: { zone:"Caldera Rim", title:"The Quiet Mountain", text:"For the first time in a century, no smoke rises from Wyrm Ridge.", choices:[
            { t:"March back into Oakhaven!", to:11 }
          ]},
          11: { zone:"Oakhaven Gates", title:"A Hero's Welcome", text:"Town bells ring across the valley as Torin and every citizen of Oakhaven run to greet the Dragon-Slayer!", choices:[
            { t:"Accept the Dragon-Slayer's Laurel!", to:12 }
          ]},
          12: { zone:"Epilogue", title:"Dragonslayer of Oakhaven", text:"Bards will sing of your victory over Ignaroth for generations. Your name is carved in gold above the Guildhall doors!", ending:{ type:"true", title:"Dragonslayer of Wyrm Ridge (Pt. II)", xp:220, gold:250, trophy:"Crown of Ignaroth's Fangs" }, choices:[] }
        }
      },
});
