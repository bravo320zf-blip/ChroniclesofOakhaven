/* ============================================================
   CORE ADVENTURES (6 Complete Adventures)
   ============================================================ */
window.OAKHAVEN.registerQuests({
      // ==========================================================
      // ADVENTURE 1: THE SUNKEN VAULT OF MALAKOR (36 PAGES)
      // ==========================================================
      malakor: {
        id: "malakor",
        title: "The Sunken Vault of Malakor",
        subtitle: "Flooded Crypt of the Undying Lich-King",
        difficulty: "Medium",
        recommendedLevel: 1,
        discoverySource: "Town Crier (Starter Lead)",
        summary: "Descend beneath the Blackspire Marshes into a 4-zone dungeon of goblin watchposts, drowned paladins, obsidian libraries, and Lich-King Malakor's throne.",
        totalPages: 36,
        pages: {
          1: { zone:"Outer Crypts", title:"The Sunken Steps", safeRetreat:true, text:"Mist curls around moss-slick limestone stairs descending into the flooded tomb of Lich-King Malakor. Ahead stands a rusted iron portcullis; to your left a weeping stone gargoyle clutches a rune tablet; to your right a bronze drainage grate hangs loose.", choices:[
            { t:"Approach the rusted iron portcullis.", to:2 },
            { t:"Inspect the gargoyle's rune tablet.", to:3, badge:"Lore / Arcana", check:{ stat:"arcana", skill:"Lore", dc:9, pass:3, fail:3, failMsg:"The script is faint, yet you still spot a hidden glint." } },
            { t:"Squeeze through the loose bronze grate.", to:4, badge:"Agility / Stealth", check:{ stat:"agility", skill:"Stealth", dc:8, pass:4, fail:4, failDmg:2, failMsg:"Jagged rust scrapes your arm (-2 HP)." } }
          ]},
          2: { zone:"Outer Crypts", title:"The Rusted Portcullis", text:"Through iron bars you see a glowing brazier and hear goblin sentries tossing bone dice. A corroded padlock secures the heavy winch wheel.", choices:[
            { t:"Pick the padlock silently.", reqSkill:"Lockpicking", badge:"Lockpicking", to:5 },
            { t:"Heave the jammed winch by brute force.", badge:"Might DC 10", check:{ stat:"might", skill:"Athletics", dc:10, pass:5, fail:6, passMsg:"The gate rises smoothly!", failMsg:"The chain snaps with a loud CLANG!" } },
            { t:"Retreat to the loose drainage grate.", to:4 }
          ]},
          3: { zone:"Outer Crypts", title:"The Gargoyle's Inscription", text:"Brushing away moss, you read the Eldritch ward-phrase: 'Vael'korith — the bronze sluice yields to the worthy.' Tucked in the gargoyle's stone palm rests a tarnished Silver Signet.", onEnter:{ cw:"RUNE_KNOWN", items:["silver_signet"], msg:"Learned RUNE_KNOWN & found Silver Signet!" }, choices:[
            { t:"Advance to the rusted portcullis.", to:2 },
            { t:"Slip into the bronze drainage grate.", to:4 }
          ]},
          4: { zone:"Outer Crypts", title:"The Damp Crawlway", text:"You crouch along a mossy aqueduct toward the rear of the guardroom. Beneath murky water glints a jagged iron bear trap!", choices:[
            { t:"Disarm the bear trap cleanly.", reqSkill:"Perception", badge:"Perception", to:5 },
            { t:"Test Your Luck stepping over the water.", badge:"Test Your Luck", luck:{ pass:5, fail:7, failDmg:3, passMsg:"Your boot clears the jaws!", failMsg:"SNAP! Rusty teeth graze your calf (-3 HP)." } },
            { t:"Slip into the tiled side corridor instead.", to:7 }
          ]},
          5: { zone:"Outer Crypts", title:"The Goblin Watchpost", text:"Two wiry Goblin Sentries leap up from a cracked barrel, drawing notched scimitars. A heavy Iron Key dangles from the leader's belt!", enemy:{ name:"Goblin Sentries", desc:"Scavenging crypt scouts.", hp:13, ac:9, atk:2, dmg:3, xp:25, gold:16, items:["bone_dust"], cw:"IRON_KEY", flee:4 }, choices:[
            { t:"Enter the Forgotten Armory to the west.", to:8 },
            { t:"Follow warm lantern light into a side alcove.", to:9 },
            { t:"March down the tiled eastern corridor.", to:7 }
          ]},
          6: { zone:"Outer Crypts", title:"The Clattering Alarm", text:"The echoing clang summons a scarred Goblin Brute in a kettle-helm! He charges down the entry arch swinging a heavy axe!", enemy:{ name:"Goblin Brute", desc:"Hulking crypt guard captain.", hp:16, ac:10, atk:3, dmg:4, xp:32, gold:22, items:["iron_ore"], cw:"IRON_KEY", flee:1 }, choices:[
            { t:"Search the Forgotten Armory.", to:8 },
            { t:"Check the lantern-lit alcove nearby.", to:9 },
            { t:"Take the tiled corridor east.", to:7 }
          ]},
          7: { zone:"Outer Crypts", title:"Corridor of Whistling Darts", text:"Checkered flagstones stretch between walls peppered with tiny dart-holes. Beyond lies a collapsed ossuary.", choices:[
            { t:"Cast Arcane Shield and stride through.", reqSpell:"Arcane Shield", mp:3, badge:"Arcane Shield (3 MP)", to:10 },
            { t:"Trace the safe flagstones carefully.", badge:"Agility / Perception DC 10", check:{ stat:"agility", skill:"Perception", dc:10, pass:10, fail:10, failDmg:4, passMsg:"Not a single dart fires!", failMsg:"Whistling darts graze your ribs (-4 HP)!" } },
            { t:"Test Your Luck and sprint through!", badge:"Test Your Luck", luck:{ pass:10, fail:10, failDmg:5, passMsg:"You roll cleanly past the volley!", failMsg:"Two darts catch your shoulder (-5 HP)!" } }
          ]},
          8: { zone:"Outer Crypts", title:"The Forgotten Armory", text:"Splintered racks hold rusted blades, yet a Fine Steel Sword still gleams on an oak peg. In the corner sits a locked iron strongbox.", onEnter:{ items:["fine_steel_blade"], msg:"Found a Fine Steel Sword!" }, choices:[
            { t:"Unlock the strongbox with your Iron Key.", reqCw:"IRON_KEY", badge:"IRON_KEY", to:11 },
            { t:"Pick the strongbox padlock.", reqSkill:"Lockpicking", badge:"Lockpicking", to:11 },
            { t:"Visit the lantern-lit alcove nearby.", to:9 },
            { t:"Descend to the Flooded Cistern.", to:12 }
          ]},
          9: { zone:"Outer Crypts", title:"Vexx's Peddler Alcove", safeRetreat:true, merchant:true, text:"A grinning gnome peddler named Vexx waves from behind a lantern-lit rug piled with vials and steel. 'Break Malakor's Soul Phylactery near his throne before fighting him,' Vexx whispers. 'Care to trade?'", choices:[
            { t:"Return to the Forgotten Armory.", to:8 },
            { t:"Descend to the Flooded Cistern (Zone 2).", to:12 },
            { t:"Take the maintenance stair to the Hall of Echoes.", reqCw:"ECHOES_REACHED", badge:"Shortcut", to:21 }
          ]},
          10: { zone:"Outer Crypts", title:"The Collapsed Ossuary", text:"Green soulfire ignites inside a visored skull! Bones clatter together into a Skeleton Sentinel guarding a Jeweled Goblet.", enemy:{ name:"Skeleton Sentinel", desc:"Animated crypt guardian.", hp:15, ac:10, atk:3, dmg:4, undead:true, xp:30, gold:18, items:["jeweled_goblet","bone_dust"], flee:8 }, choices:[
            { t:"Inspect the hidden niche behind the bier.", to:11 },
            { t:"Descend toward the Flooded Cistern.", to:12 }
          ]},
          11: { zone:"Outer Crypts", title:"The Commander's Strongbox", text:"Velvet lining protects a warm Ring of Vitality, a fresh Health Potion, and 25 imperial gold pieces.", onEnter:{ gold:25, items:["ring_vitality","health_potion"], msg:"Looted Ring of Vitality, Health Potion & 25 GP!" }, choices:[
            { t:"Stop by Vexx's Peddler Alcove.", to:9 },
            { t:"Descend to the Flooded Cistern.", to:12 }
          ]},
          12: { zone:"Flooded Cistern", title:"The Subterranean Riverbank", text:"Black subterranean water laps against mossy piers. A rotting ferry raft bobs ahead, a hanging iron cage dangles to the left, and a web-choked footpath hugs the right cliff.", choices:[
            { t:"Pole the rotting ferry across the river.", to:14 },
            { t:"Investigate the hanging iron cage.", to:13 },
            { t:"Take the web-choked cliff footpath.", to:15 },
            { t:"Return to Vexx's Alcove.", to:9 }
          ]},
          13: { zone:"Flooded Cistern", title:"Snaggle the Prisoner", text:"A scrawny goblin rattles the cage bars. 'Free Snaggle, and Snaggle helps you beat the big spider and shows you the smuggler's drain!'", choices:[
            { t:"Unlock the cage with your Iron Key.", reqCw:"IRON_KEY", badge:"IRON_KEY", to:15, onChoose:{ cw:"GOBLIN_ALLY", items:["mana_elixir"], msg:"Freed Snaggle! Gained GOBLIN_ALLY & Mana Elixir." } },
            { t:"Pry the rusted bars apart.", badge:"Might DC 10", check:{ stat:"might", skill:"Athletics", dc:10, pass:15, fail:12, passMsg:"The bars bend! Snaggle hands you a Mana Elixir!", failMsg:"The iron holds fast." }, onPass:{ cw:"GOBLIN_ALLY", items:["mana_elixir"] } },
            { t:"Leave him and take the ferry raft.", to:14 }
          ]},
          14: { zone:"Flooded Cistern", title:"The Rotting Ferry", text:"Halfway across, black water erupts as a tentacled Cistern Lurker slams onto the creaking planks!", enemy:{ name:"Cistern Lurker", desc:"Blind river predator.", hp:18, ac:10, atk:3, dmg:4, xp:35, gold:20, items:["sea_salt","glowcap_spores"], flee:12 }, choices:[
            { t:"Dock by the flooded marble chapel.", to:17 },
            { t:"Step ashore in the Glowing Mushroom Grotto.", to:18 }
          ]},
          15: { zone:"Flooded Cistern", title:"The Web-Choked Passage", text:"Curtains of sticky white silk drape the tunnel. Chittering echoes from the dome ahead.", choices:[
            { t:"Burn the webs with Firebolt!", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:16, onChoose:{ cw:"SPIDER_BURNED", msg:"Your Firebolt scorches the lair!" } },
            { t:"Slip silently between the strands.", badge:"Agility / Stealth DC 10", check:{ stat:"agility", skill:"Stealth", dc:10, pass:16, fail:16, failDmg:2, passMsg:"You glide through untouched.", failMsg:"Spiderlings nip your hand (-2 HP)." } },
            { t:"Hack straight through.", to:16 }
          ]},
          16: { zone:"Flooded Cistern", title:"Broodmother's Lair", text:"A horse-sized Giant Cave Spider drops from the ceiling, mandibles dripping venom! Behind it glints a Ruby Idol.", enemy:{ name:"Giant Cave Spider", desc:"Venomous cavern broodmother.", hp:20, ac:11, atk:3, dmg:5, xp:40, gold:25, items:["ruby_idol","antidote"], weakCw:["GOBLIN_ALLY","SPIDER_BURNED"], flee:12 }, choices:[
            { t:"Enter the Drowned Paladin's Tomb.", to:17 },
            { t:"Explore the Glowing Mushroom Grotto.", to:18 }
          ]},
          17: { zone:"Flooded Cistern", title:"The Drowned Paladin's Tomb", text:"Ankle-deep crystal water surrounds a marble sarcophagus sculpted with a sunburst. 'Only the reverent may bear the Dawn against the Undying King.'", choices:[
            { t:"Cast Turn Undead to honor the paladin's light.", reqSpell:"Turn Undead", mp:4, badge:"Turn Undead (4 MP)", to:19 },
            { t:"Kneel and offer a prayer of peace.", badge:"Spirit / Lore DC 10", check:{ stat:"spirit", skill:"Lore", dc:10, pass:19, fail:20, passMsg:"Golden warmth answers your prayer!", failMsg:"Freezing mist rises in wrath!" } },
            { t:"Pry open the tomb by force.", to:20 }
          ]},
          18: { zone:"Flooded Cistern", title:"Glowing Mushroom Grotto", text:"Azure fungi light a breathtaking grotto. Silver-gilled restorative caps grow beside toxic lookalikes.", choices:[
            { t:"Harvest pure caps with Herbalism.", reqSkill:"Herbalism", badge:"Herbalism", to:20, onChoose:{ healHp:10, healMp:5, items:["glowcap_spores","health_potion"], msg:"Restored 10 HP, 5 MP & gathered Glowcap Spores!" } },
            { t:"Test Your Luck tasting a glowing cap.", badge:"Test Your Luck", luck:{ pass:20, fail:20, failDmg:4, passMsg:"Sweet nectar restores 6 HP!", failMsg:"Bitter spores burn your throat (-4 HP)!", onPass:{ healHp:6 } } },
            { t:"Head directly to the Bronze Sluice Gate.", to:20 }
          ]},
          19: { zone:"Flooded Cistern", title:"The Dawnbringer's Blessing", text:"A spectral paladin bows and bestows his Sunfire Amulet and Sun-Forged Buckler before dissolving into golden motes.", onEnter:{ cw:"SUN_RELIC", items:["sunfire_amulet","sun_buckler"], healHp:8, msg:"Received SUN_RELIC, Sunfire Amulet & Sun-Forged Buckler!" }, choices:[
            { t:"Advance to the Rune-Sealed Sluice Gate.", to:20 }
          ]},
          20: { zone:"Flooded Cistern", title:"The Rune-Sealed Sluice Gate", text:"Massive bronze double doors hum with eldritch runes, barring the way to the obsidian upper vaults.", choices:[
            { t:"Speak the ward-phrase: 'Vael'korith!'", reqCw:"RUNE_KNOWN", badge:"RUNE_KNOWN", to:21 },
            { t:"Follow Snaggle's smuggler drain around the gate.", reqCw:"GOBLIN_ALLY", badge:"GOBLIN_ALLY", to:21, onChoose:{ gold:30, msg:"Found 30 GP in the smuggler's drain!" } },
            { t:"Unravel the runes with Detect Traps.", reqSpell:"Detect Traps", mp:2, badge:"Detect Traps (2 MP)", to:21 },
            { t:"Force the bronze wheel with Might.", badge:"Might DC 11", check:{ stat:"might", skill:"Athletics", dc:11, pass:21, fail:21, failDmg:4, passMsg:"The doors grind open!", failMsg:"Arcane sparks scorch you (-4 HP) as you force the seal!" } }
          ]},
          21: { zone:"Hall of Echoes", title:"The Hall of Echoes", onEnter:{ cw:"ECHOES_REACHED" }, text:"Polished obsidian pillars vanish into shadow. Ahead sits a colossal Stone Gargoyle atop the vault stair; east lies the Obsidian Library; west hangs a crimson reliquary.", choices:[
            { t:"Approach the Stone Gargoyle on the central stair.", to:22 },
            { t:"Enter the Obsidian Library to the east.", to:23 },
            { t:"Inspect the Cursed Reliquary to the west.", to:24 },
            { t:"Take the maintenance stair back to Vexx's Alcove.", to:9 }
          ]},
          22: { zone:"Hall of Echoes", title:"Riddle of the Gargoyle", text:"Amber eyes ignite in stone. 'Answer true: I have cities, but no houses; mountains, but no trees; water, but no fish. What am I?'", choices:[
            { t:"Answer: 'A Map.'", to:26, onChoose:{ cw:"GARGOYLE_PASS", msg:"The Gargoyle folds its wings and lets you pass!" } },
            { t:"Answer: 'A Mirage.'", to:25 },
            { t:"Use Lore to confirm the answer.", reqSkill:"Lore", badge:"Lore", to:26, onChoose:{ cw:"GARGOYLE_PASS", msg:"Your Lore mastery answers cleanly: 'A Map!'" } }
          ]},
          23: { zone:"Hall of Echoes", title:"The Obsidian Library", text:"Chained grimoires line towering mahogany stacks beneath cold blue orbs.", choices:[
            { t:"Cast Detect Traps to reveal a hidden bookcase.", reqSpell:"Detect Traps", mp:2, badge:"Detect Traps (2 MP)", to:27 },
            { t:"Search the necromancy ledger.", badge:"Arcana / Lore DC 10", check:{ stat:"arcana", skill:"Lore", dc:10, pass:27, fail:28, passMsg:"You find Malakor's ritual ledger!", failMsg:"A spectral duelist materializes!" } },
            { t:"Return to the Hall of Echoes.", to:21 }
          ]},
          24: { zone:"Hall of Echoes", title:"The Cursed Reliquary", text:"Necrotic mist curls around a Golden Censer on a black altar.", choices:[
            { t:"Purify it with Turn Undead.", reqSpell:"Turn Undead", mp:4, badge:"Turn Undead (4 MP)", to:21, onChoose:{ items:["golden_censer","greater_potion"], msg:"Claimed Golden Censer & Greater Potion!" } },
            { t:"Test Your Luck snatching it.", badge:"Test Your Luck", luck:{ pass:21, fail:28, failDmg:4, passMsg:"Wrapped safely in your cloak!", failMsg:"Cold fire burns you (-4 HP) and wakes a ghost!", onPass:{ items:["golden_censer"] } } },
            { t:"Leave it and visit the Library.", to:23 }
          ]},
          25: { zone:"Hall of Echoes", title:"Awakening of the Gargoyle", text:"'FALSE!' The obsidian sentinel leaps from its pedestal with grinding claws!", enemy:{ name:"Stone Gargoyle", desc:"Living obsidian guardian.", hp:22, ac:12, atk:4, dmg:5, xp:48, gold:30, items:["runed_shards"], flee:21 }, choices:[
            { t:"Enter the Gilded Treasury Vault.", to:26 },
            { t:"March to the Gates of the Sanctum.", to:29 }
          ]},
          26: { zone:"Hall of Echoes", title:"The Gilded Treasury", text:"Mounds of gold glitter beneath a domed ceiling. One ornate chest in the center seems to be... gently breathing.", choices:[
            { t:"Spot the Mimic with Perception & loot outer tables.", reqSkill:"Perception", badge:"Perception", to:29, onChoose:{ gold:75, items:["ruby_idol"], msg:"Avoided the Mimic! Looted 75 GP & Ruby Idol." } },
            { t:"Take loose coins from the edge and leave.", to:29, onChoose:{ gold:50, msg:"Gathered 50 GP safely." } },
            { t:"Pry open the magnificent central chest!", to:28 }
          ]},
          27: { zone:"Hall of Echoes", title:"Malakor's Ledger", text:"Malakor's black ledger reveals the counter-runes to his Sanctum Ward and the crimson tapestry hiding his Phylactery! Beside it rests a crackling Staff of Embers.", onEnter:{ cw:"RUNE_KNOWN", items:["ember_staff","runed_shards"], msg:"Learned Sanctum secrets & found Staff of Embers!" }, choices:[
            { t:"Take the secret passage to the Sanctum Gates.", to:29 }
          ]},
          28: { zone:"Hall of Echoes", title:"The Vault Guardian", text:"A Spectral Duelist glides from the shadows with a frost-rimmed blade!", enemy:{ name:"Spectral Duelist", desc:"Ghost of Malakor's fencing master.", hp:22, ac:12, atk:4, dmg:5, undead:true, xp:50, gold:40, items:["shadow_essence"], flee:21 }, choices:[
            { t:"Advance to the Gates of the Sanctum.", to:29 }
          ]},
          29: { zone:"Malakor's Sanctum", title:"Gates of the Sanctum", text:"Blackened bronze doors hum with violet lightning. Beyond lies Lich-King Malakor's inner court. Prepare your spells and potions before entering.", choices:[
            { t:"Enter the Arcane Ward Chamber.", to:30 },
            { t:"Return to the Hall of Echoes.", to:21 }
          ]},
          30: { zone:"Malakor's Sanctum", title:"The Arcane Ward", text:"Violet force crackles between two runic obelisks, powering a towering Bone Golem behind the barrier. A warm alabaster shrine sits to your left.", choices:[
            { t:"Shatter the ward with the Unbinding Runes.", reqCw:"RUNE_KNOWN", badge:"RUNE_KNOWN", to:31, onChoose:{ cw:"WARD_BROKEN", msg:"Shattered the Sanctum Ward!" } },
            { t:"Rest briefly at the side Shrine of Dawn.", to:31, onChoose:{ healHp:12, healMp:6, msg:"Shrine restored 12 HP & 6 MP!" } },
            { t:"Smash straight through the barrier!", to:31, onChoose:{ dmg:5, msg:"Lightning scorches you (-5 HP)!" } }
          ]},
          31: { zone:"Malakor's Sanctum", title:"The Bone Golem", text:"Fused marrow and iron rivets grind as a ten-foot Bone Golem strides forward to bar the throne!", enemy:{ name:"Bone Golem", desc:"Malakor's necromantic juggernaut.", hp:26, ac:12, atk:5, dmg:6, undead:true, xp:60, gold:45, items:["obsidian_core","bone_dust"], weakCw:["WARD_BROKEN"], flee:29 }, choices:[
            { t:"Slip behind the crimson tapestry (Phylactery Alcove).", to:32 },
            { t:"Stride straight to the Throne of Embers.", to:33 }
          ]},
          32: { zone:"Malakor's Sanctum", title:"The Soul Phylactery", text:"Floating above a silver brazier pulses an obsidian soul-gem—Malakor's Phylactery!", choices:[
            { t:"Destroy it with Turn Undead!", reqSpell:"Turn Undead", mp:4, badge:"Turn Undead (4 MP)", to:33, onChoose:{ cw:"PHYLACTERY_DESTROYED", msg:"Phylactery shattered in golden light!" } },
            { t:"Smash it with your weapon!", badge:"Might DC 10", check:{ stat:"might", skill:"Athletics", dc:10, pass:33, fail:33, failDmg:4, passMsg:"The soul-gem splits cleanly!", failMsg:"Arcane backlash burns you (-4 HP), yet it shatters!" }, onPass:{ cw:"PHYLACTERY_DESTROYED" } },
            { t:"Unravel it with Arcana.", badge:"Arcana DC 10", check:{ stat:"arcana", skill:"Lore", dc:10, pass:33, fail:33, failDmg:3, passMsg:"Siphoned +4 MP as it turns to ash!", failMsg:"Sparks sting (-3 HP), yet it crumbles!" }, onPass:{ cw:"PHYLACTERY_DESTROYED", healMp:4 } }
          ]},
          33: { zone:"Malakor's Sanctum", title:"Lich-King Malakor", text:"Atop the obsidian dais rises Lich-King Malakor, the Crown of Embers blazing upon his skull. 'Kneel, mortal, or join my eternal court!'", enemy:{ name:"Lich-King Malakor", desc:"Sovereign of the Sunken Vault.", hp:34, ac:13, atk:5, dmg:6, undead:true, xp:120, gold:120, items:["sunfire_blade","runed_shards"], weakCw:["PHYLACTERY_DESTROYED","SUN_RELIC","WARD_BROKEN"] }, choices:[
            { t:"Purify the Crown with the Sunfire Relic! (True Ending)", reqCw:"SUN_RELIC", badge:"True Ending", to:35 },
            { t:"Seize the Crown of Embers and escape! (Victory)", to:34 },
            { t:"Loot the side vault and slip out the smuggler shaft.", to:36 }
          ]},
          34: { zone:"Epilogue", title:"Conqueror of the Sunken Vault", text:"You sprint up the shuddering stairs and burst into cool moonlight as the Sunken Vault collapses behind you. Held high in your hands, the Crown of Embers blazes like a captured star!", ending:{ type:"victory", title:"Conqueror of the Sunken Vault", xp:90, gold:100, trophy:"Crown of Embers" }, choices:[] },
          35: { zone:"Epilogue", title:"The Dawn Restored", text:"Laying the Crown within the golden beam of the Sunfire Amulet breaks Malakor's curse forever. Tormented spirits bow in gratitude and fade into morning light. Oakhaven hails you as Sanctifier of the Realm!", ending:{ type:"true", title:"Sanctifier of Malakor's Vault", xp:140, gold:150, trophy:"Sanctified Crown" }, choices:[] },
          36: { zone:"Epilogue", title:"The Smuggler's Haul", text:"Leaving the collapsing throne behind, you haul a heavy coffer of royal sovereigns up the escape shaft beneath the stars—wealthy, alive, and already plotting your next expedition.", ending:{ type:"rogue", title:"Master Vault-Raider", xp:75, gold:160, trophy:"Malakor's Coffer" }, choices:[] }
        }
      },

      // ==========================================================
      // ADVENTURE 2: THE WHISPERING BARROWS OF THORNWOOD (22 PAGES)
      // ==========================================================
      thornwood: {
        id: "thornwood",
        title: "The Whispering Barrows of Thornwood",
        subtitle: "Haunted Forest & Ancient Druid Mounds",
        difficulty: "Easy-Medium",
        recommendedLevel: 1,
        discoverySource: "Elven Ranger Lyra (Tavern) or Thornwood Wilds",
        summary: "Venture into the mist-choked briars of Thornwood to confront corrupt druids, navigate living thorn mazes, and lay the Stag-Wraith Lord to rest.",
        totalPages: 22,
        pages: {
          1: { zone:"Thornwood Edge", title:"The Twisted Trailhead", safeRetreat:true, text:"Silver mist drapes the ancient oaks of Thornwood. Blackened briars writhe unnaturally across the mossy trail leading toward the barrow hills, while a faint trail of glowing blue spores winds into a hollow glen.", choices:[
            { t:"Follow the main mossy trail toward the Standing Stones.", to:2 },
            { t:"Track the glowing blue spores into the hollow glen.", to:3, badge:"Tracking / Perception", check:{ stat:"spirit", skill:"Tracking", dc:8, pass:3, fail:4, passMsg:"You spot a hidden dry path!", failMsg:"You wander straight into a briar thicket!" } },
            { t:"Search the roadside shrine for ranger supplies.", to:5 }
          ]},
          2: { zone:"Thornwood Edge", title:"The Standing Stones", text:"Seven moss-covered monoliths ring a cracked druid altar. Fresh crimson sap drips from carved antlers, and a hooded Briar Acolyte chants in the shadows.", choices:[
            { t:"Ambush the Briar Acolyte from the mist.", badge:"Stealth DC 9", check:{ stat:"agility", skill:"Stealth", dc:9, pass:6, fail:6, passMsg:"You strike first!", failMsg:"Dry twigs snap beneath your boot!" }, onPass:{ cw:"AMBUSH_ACOLYTE" } },
            { t:"Parley with the acolyte to learn their ritual.", badge:"Persuasion DC 10", check:{ stat:"spirit", skill:"Persuasion", dc:10, pass:7, fail:6, passMsg:"He mistakes you for an initiate and reveals the barrow password!", failMsg:"He hisses and raises his thorn-staff!" } },
            { t:"Slip west into the Hollow Glen.", to:3 }
          ]},
          3: { zone:"Hollow Glen", title:"The Fungal Clearing", text:"Bioluminescent toadstools ring a crystal spring. A wounded stag rests beside the water, an obsidian thorn lodged in its flank.", choices:[
            { t:"Pull the thorn and tend the stag with Herbalism.", reqSkill:"Herbalism", badge:"Herbalism", to:8, onChoose:{ cw:"STAG_BLESSING", items:["glowcap_spores"], msg:"The white stag bows and blesses you (STAG_BLESSING)!" } },
            { t:"Cast Mend Wounds on the noble creature.", reqSpell:"Mend Wounds", mp:3, badge:"Mend Wounds (3 MP)", to:8, onChoose:{ cw:"STAG_BLESSING", msg:"Golden warmth heals the stag (STAG_BLESSING)!" } },
            { t:"Carefully pull the thorn without magic.", badge:"Spirit DC 9", check:{ stat:"spirit", skill:"Herbalism", dc:9, pass:8, fail:4, passMsg:"The stag nuzzles your palm in gratitude!", failMsg:"Startled, it bolts into the thorns!" }, onPass:{ cw:"STAG_BLESSING" } }
          ]},
          4: { zone:"Briar Maze", title:"The Living Thicket", text:"Barbed vines lash out like serpents across the sunken path!", choices:[
            { t:"Scorch a path with Firebolt!", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:9 },
            { t:"Hack through the thorns with Might.", badge:"Might DC 9", check:{ stat:"might", skill:"Athletics", dc:9, pass:9, fail:9, failDmg:3, passMsg:"Your blade cleaves a clean gap!", failMsg:"Barbs tear at your cloak (-3 HP)." } }
          ]},
          5: { zone:"Thornwood Edge", title:"Lyra's Ranger Cache", text:"Beneath a hollow oak stump lies a waxed leather parcel marked with an elven leaf. Inside rest a Health Potion, a Pitch Torch, and 15 GP.", onEnter:{ gold:15, items:["health_potion","torch"], msg:"Found Ranger Cache: Health Potion, Torch & 15 GP!" }, choices:[
            { t:"Head to the Standing Stones.", to:2 },
            { t:"Enter the Hollow Glen.", to:3 }
          ]},
          6: { zone:"Standing Stones", title:"The Briar Acolyte", text:"The hooded druid twists his gnarled staff, summoning writhing root-whips!", enemy:{ name:"Briar Acolyte", desc:"Corrupted Thornwood druid.", hp:15, ac:10, atk:3, dmg:4, xp:30, gold:18, items:["glowcap_spores","shadow_essence"], weakCw:["AMBUSH_ACOLYTE"], flee:1 }, choices:[
            { t:"Read the ritual parchment on the altar.", to:7 },
            { t:"Press deeper into the Briar Maze.", to:9 }
          ]},
          7: { zone:"Standing Stones", title:"The Antler Chant", text:"You learn the old druidic word of opening—'Sylvaris'—and pocket a silver-inlaid Briarweave Jerkin hung beside the stones.", onEnter:{ cw:"DRUID_WORD", items:["briarweave_mail"], msg:"Learned DRUID_WORD & found Briarweave Jerkin!" }, choices:[
            { t:"Follow the stone path toward the Barrow Mound.", to:10 },
            { t:"Check the Hollow Glen first.", to:3 }
          ]},
          8: { zone:"Hollow Glen", title:"Path of the White Stag", text:"The healed stag trots ahead, parting the whispering briars until a secret stone stair appears leading straight to the Barrow Entrance.", onEnter:{ healHp:6, msg:"The glade's peace restores 6 HP." }, choices:[
            { t:"Follow the secret stair to the Barrow Entrance.", to:10 }
          ]},
          9: { zone:"Briar Maze", title:"The Wolf-Root Ambush", text:"Two moss-furred Blight Wolves leap from the brambles with glowing amber eyes!", enemy:{ name:"Blight Wolves", desc:"Thorn-corrupted forest hounds.", hp:16, ac:10, atk:3, dmg:4, xp:32, gold:12, items:["bone_dust"], flee:1 }, choices:[
            { t:"Emerge before the Great Barrow Entrance.", to:10 }
          ]},
          10: { zone:"Great Barrow", title:"Threshold of the Whispering Barrow", text:"A grass-covered burial mound rises forty feet high, its stone door sealed by interlocking wooden roots.", choices:[
            { t:"Speak the druidic word: 'Sylvaris!'", reqCw:"DRUID_WORD", badge:"DRUID_WORD", to:11 },
            { t:"Burn away the root-seal with Firebolt.", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:11 },
            { t:"Pry the root-door open by force.", badge:"Might DC 10", check:{ stat:"might", skill:"Athletics", dc:10, pass:11, fail:11, failDmg:3, passMsg:"The roots snap cleanly!", failMsg:"Thorns slice your palms (-3 HP) as you force through." } }
          ]},
          11: { zone:"Great Barrow", title:"The Whispering Nave", text:"Cold earth and cedar scent fill a vaulted burial hall. Three passages branch out: a flooded root-crypt left, an ancient reliquary right, and the sealed Hall of Antlers ahead.", choices:[
            { t:"Explore the flooded root-crypt to the left.", to:12 },
            { t:"Inspect the ancient reliquary to the right.", to:13 },
            { t:"Approach the Hall of Antlers ahead.", to:15 }
          ]},
          12: { zone:"Great Barrow", title:"The Root-Crypt", text:"Submerged flagstones conceal a skeletal Druid Wight clutching a glowing emerald orb!", enemy:{ name:"Druid Wight", desc:"Undying keeper of the barrow.", hp:18, ac:11, atk:3, dmg:4, undead:true, xp:38, gold:24, items:["shadow_essence","mana_elixir"], flee:11 }, choices:[
            { t:"Claim the Sun-Carved Sickle from the alcove.", to:14 },
            { t:"Return to the Whispering Nave.", to:11 }
          ]},
          13: { zone:"Great Barrow", title:"The Ancient Reliquary", text:"A stone coffer sits behind a web of thin silver tripwires.", choices:[
            { t:"Disarm the silver tripwires.", reqSkill:"Lockpicking", badge:"Lockpicking", to:14 },
            { t:"Test Your Luck reaching for the coffer.", badge:"Test Your Luck", luck:{ pass:14, fail:15, failDmg:4, passMsg:"Your fingers glide past the wires!", failMsg:"A dart-trap snaps (-4 HP)!" } },
            { t:"Leave it and head to the Hall of Antlers.", to:15 }
          ]},
          14: { zone:"Great Barrow", title:"The Elder's Boon", text:"Inside the reliquary rests a pristine Ring of Vitality, a Silver Signet, and a carved bone charm that weakens the Stag-Wraith's curse.", onEnter:{ cw:"BONE_CHARM", items:["ring_vitality","silver_signet"], msg:"Found BONE_CHARM, Ring of Vitality & Silver Signet!" }, choices:[
            { t:"March into the Hall of Antlers.", to:15 }
          ]},
          15: { zone:"Great Barrow", title:"The Hall of Antlers", text:"Massive elk antlers arch overhead. Before the inner sanctum stands a swirling mist-gate whispering the names of the dead.", choices:[
            { t:"Walk through under the White Stag's Blessing.", reqCw:"STAG_BLESSING", badge:"STAG_BLESSING", to:17 },
            { t:"Cast Turn Undead to part the mist.", reqSpell:"Turn Undead", mp:4, badge:"Turn Undead (4 MP)", to:17 },
            { t:"Steel your spirit and push through the chill.", badge:"Spirit DC 10", check:{ stat:"spirit", skill:"Lore", dc:10, pass:17, fail:16, passMsg:"Your will cuts through the dread!", failMsg:"Phantom antlers manifest in the gloom!" } }
          ]},
          16: { zone:"Great Barrow", title:"Antler Phantoms", text:"Hollow forest spirits coalesce into a horned Barrow Stalker!", enemy:{ name:"Barrow Stalker", desc:"Mist-born guardian spirit.", hp:19, ac:11, atk:4, dmg:4, undead:true, xp:40, gold:20, items:["shadow_essence"], flee:11 }, choices:[
            { t:"Step into the Sanctum of the Stag-Wraith.", to:17 }
          ]},
          17: { zone:"Barrow Sanctum", title:"The Corrupted Heart-Tree", text:"A colossal pale oak bursts through the barrow's ceiling, its roots choking a cracked altar. Beneath its boughs rises the Stag-Wraith Lord, crowned in blackened antlers!", choices:[
            { t:"Present the White Stag's Blessing to calm his rage!", reqCw:"STAG_BLESSING", badge:"STAG_BLESSING", to:18 },
            { t:"Charge the Stag-Wraith Lord with steel drawn!", to:19 },
            { t:"Snipe the glowing heart-sap with Firebolt!", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:19, onChoose:{ cw:"HEART_BURNED", msg:"Flames weaken the Wraith's tether!" } }
          ]},
          18: { zone:"Barrow Sanctum", title:"The Quiet Reckoning", text:"At the sight of the White Stag's mark, half the dark briars wither away. 'End my torment, mortal,' the Wraith whispers, raising his bone spear for an honorable duel.", enemy:{ name:"Stag-Wraith Lord", desc:"Fallen guardian of Thornwood (Weakened).", hp:20, ac:11, atk:4, dmg:5, undead:true, xp:75, gold:65, items:["scout_cloak","glowcap_spores"], weakCw:["BONE_CHARM"] }, choices:[
            { t:"Cleanse the Heart-Tree altar! (Pure Ending)", to:21 },
            { t:"Claim the ancient barrow gold and depart.", to:22 }
          ]},
          19: { zone:"Barrow Sanctum", title:"Wrath of the Stag-Wraith", text:"Antlers crackling with emerald lightning, the Stag-Wraith Lord charges across the roots!", enemy:{ name:"Stag-Wraith Lord", desc:"Undying sovereign of the corrupted wood.", hp:26, ac:12, atk:4, dmg:5, undead:true, xp:85, gold:70, items:["scout_cloak","shadow_essence"], weakCw:["BONE_CHARM","HEART_BURNED"] }, choices:[
            { t:"Purify the Heart-Tree's root altar.", to:20 }
          ]},
          20: { zone:"Barrow Sanctum", title:"Aftermath in the Mound", text:"As the Wraith dissolves into falling leaves, sunlight breaks through the canopy above. The barrow's ancient coffers lie open before you.", choices:[
            { t:"Restore the druid altar and accept the forest's peace.", to:21 },
            { t:"Pack the barrow's gold and return to Oakhaven.", to:22 }
          ]},
          21: { zone:"Epilogue", title:"Warden of the Living Wood", text:"Green blossoms burst across the Heart-Tree as the mist lifts from Thornwood. Elven Ranger Lyra meets you at the treeline with tears of gratitude and a pouch of elven silver.", ending:{ type:"true", title:"Warden of Thornwood", xp:95, gold:85, trophy:"Antler Crown of Peace" }, choices:[] },
          22: { zone:"Epilogue", title:"Barrow-Delver's Spoils", text:"With the Stag-Wraith banished and your pack heavy with ancient druid silver, you hike back toward the warm lanterns of Oakhaven.", ending:{ type:"victory", title:"Conqueror of the Barrows", xp:75, gold:110, trophy:"Barrow Silver Torc" }, choices:[] }
        }
      },

      // ==========================================================
      // ADVENTURE 3: THE IRONFORGE DEPTHS OF KARAK-ZUL (24 PAGES)
      // ==========================================================
      karak_zul: {
        id: "karak_zul",
        title: "The Ironforge Depths of Karak-Zul",
        subtitle: "Collapsed Dwarven Mine & Molten Vaults",
        difficulty: "Medium-Hard",
        recommendedLevel: 2,
        discoverySource: "Dwarven Prospector Thorek (Tavern) or Ironclad Armory",
        summary: "Descend the iron-railed shafts of lost Karak-Zul past kobold sappers, runaway minecarts, lava bridges, and the awakend Obsidian Golem.",
        totalPages: 24,
        pages: {
          1: { zone:"Upper Shafts", title:"The Sunken Mine-Gate", safeRetreat:true, text:"Massive carved stone beards frame the collapsed entrance to Karak-Zul. Rusting iron minecart tracks vanish into the dark, smelling of coal smoke and sulfur.", choices:[
            { t:"Follow the main minecart tracks down the slope.", to:2 },
            { t:"Inspect the ruined foreman's shack beside the gate.", to:3 },
            { t:"Squeeze into the narrow ventilation shaft.", to:4, badge:"Agility DC 9", check:{ stat:"agility", skill:"Athletics", dc:9, pass:4, fail:4, failDmg:2, failMsg:"Loose slate bruises your shoulder (-2 HP)." } }
          ]},
          2: { zone:"Upper Shafts", title:"The Kobold Barricade", text:"Overturned ore carts block the tunnel. Three grinning Kobold Sappers crouch behind them clutching sputtering black-powder fuses!", choices:[
            { t:"Snipe their fuses with Frost Nova!", reqSpell:"Frost Nova", mp:4, badge:"Frost Nova (4 MP)", to:5, onChoose:{ cw:"FUSES_FROZEN", msg:"Your frost snuffs their bombs!" } },
            { t:"Charge the barricade before they light the powder!", to:5 },
            { t:"Bluff them in booming Dwarven.", badge:"Persuasion DC 10", check:{ stat:"spirit", skill:"Persuasion", dc:10, pass:6, fail:5, passMsg:"Terrified of 'returning dwarfs', they scatter!", failMsg:"They laugh and toss a spark!" } }
          ]},
          3: { zone:"Upper Shafts", title:"The Foreman's Ledger", text:"Under a smashed desk you find a Dwarven Master-Switch Key, two chunks of Iron Ore, and an Alchemist's Bomb.", onEnter:{ cw:"SWITCH_KEY", items:["iron_ore","alchemist_bomb"], msg:"Found SWITCH_KEY, Iron Ore & Alchemist's Bomb!" }, choices:[
            { t:"Head down the main minecart tracks.", to:2 },
            { t:"Crawl into the ventilation shaft.", to:4 }
          ]},
          4: { zone:"Upper Shafts", title:"The Smelter Vent", text:"Warm air rises through a stone duct overlooking the kobold camp, letting you bypass the barricade and drop near the rail junction.", choices:[
            { t:"Drop quietly into the Rail Junction.", to:6 },
            { t:"Ambush the Kobold Sappers from behind!", to:5, onChoose:{ cw:"FUSES_FROZEN", msg:"Surprise attack catches the sappers off guard!" } }
          ]},
          5: { zone:"Upper Shafts", title:"Kobold Sapper Skirmish", text:"Yapping kobolds hurl sparks and swing iron mining picks!", enemy:{ name:"Kobold Sappers", desc:"Explosive-happy mine raiders.", hp:18, ac:10, atk:3, dmg:4, xp:38, gold:24, items:["alchemist_bomb","iron_ore"], weakCw:["FUSES_FROZEN"], flee:1 }, choices:[
            { t:"Advance to the Rail Junction.", to:6 }
          ]},
          6: { zone:"Rail Junction", title:"The Minecart Switchyard", text:"Three iron rails plunge steeply into the glowing lower depths. An empty steel ore-cart waits at the brake lever.", choices:[
            { t:"Use the Master-Switch Key to align the safe Forge Track.", reqCw:"SWITCH_KEY", badge:"SWITCH_KEY", to:8 },
            { t:"Ride the runaway minecart straight down!", badge:"Agility DC 10", check:{ stat:"agility", skill:"Perception", dc:10, pass:8, fail:7, passMsg:"You lean cleanly into every hairpin turn!", failMsg:"The cart jumps a broken rail!" } },
            { t:"Climb down the maintenance ladder on foot.", to:9 }
          ]},
          7: { zone:"Lower Mines", title:"The Derailment", text:"Sparks fly as the cart overturns near a pile of rubble (-3 HP)! Before you can rise, a chitinous Tunnel Crawler scuttles from the dark!", onEnter:{ dmg:3, msg:"Crash landing (-3 HP)!" }, enemy:{ name:"Tunnel Crawler", desc:"Armored subterranean centipede.", hp:20, ac:11, atk:4, dmg:4, xp:42, gold:15, items:["iron_ore"], flee:6 }, choices:[
            { t:"Press on to the Bridge of Slag.", to:10 }
          ]},
          8: { zone:"Lower Mines", title:"The Hidden Ore Vault", text:"The safe track coasts smoothly into an untouched dwarven storeroom! A gleaming Dwarven Waraxe and 35 GP rest beside stacked ore.", onEnter:{ gold:35, items:["dwarven_waraxe","iron_ore"], msg:"Found Dwarven Waraxe, Iron Ore & 35 GP!" }, choices:[
            { t:"Advance to the Bridge of Slag.", to:10 },
            { t:"Inspect the Clockwork Workshop.", to:9 }
          ]},
          9: { zone:"Lower Mines", title:"The Clockwork Workshop", text:"Brass gears still tick inside an oiled dwarven laboratory. A brass Automaton Sentry whirs to life, steam hissing from its visor!", enemy:{ name:"Clockwork Sentry", desc:"Brass-plated dwarven construct.", hp:22, ac:12, atk:4, dmg:5, xp:48, gold:30, items:["runed_shards","iron_ore"], flee:6 }, choices:[
            { t:"Salvage the shutdown code from its chestplate.", to:11 },
            { t:"Cross to the Bridge of Slag.", to:10 }
          ]},
          10: { zone:"Molten Caverns", title:"The Bridge of Slag", text:"A narrow basalt span arches over a roaring river of molten gold-slag. Halfway across, the stone vibrates under fierce heat.", choices:[
            { t:"Cast Arcane Shield against the searing updraft.", reqSpell:"Arcane Shield", mp:3, badge:"Arcane Shield (3 MP)", to:12 },
            { t:"Sprint across before the stone cracks!", badge:"Agility / Athletics DC 10", check:{ stat:"agility", skill:"Athletics", dc:10, pass:12, fail:12, failDmg:4, passMsg:"You leap clear onto solid granite!", failMsg:"Blistering steam scalds you (-4 HP)!" } },
            { t:"Test Your Luck leaping the cracked gap.", badge:"Test Your Luck", luck:{ pass:12, fail:12, failDmg:5, passMsg:"Clean landing!", failMsg:"Scorching rock grazes your boot (-5 HP)!" } }
          ]},
          11: { zone:"Lower Mines", title:"The Master's Shutdown Rune", text:"Etched inside the sentry's core is the dwarven override sigil for Karak-Zul's supreme guardian! You also pocket a Greater Health Potion.", onEnter:{ cw:"GOLEM_OVERRIDE", items:["greater_potion"], msg:"Learned GOLEM_OVERRIDE & found Greater Potion!" }, choices:[
            { t:"Cross the Bridge of Slag.", to:10 }
          ]},
          12: { zone:"Molten Caverns", title:"Hall of the Anvils", text:"Twelve colossal stone anvils flank a grand avenue leading toward the Great Foundry. A side door marked 'Treasury' is locked with a tumbler dial.", choices:[
            { t:"Pick the Treasury tumbler dial.", reqSkill:"Lockpicking", badge:"Lockpicking", to:13 },
            { t:"Inspect the Runic Crucible at the center.", to:14 },
            { t:"March straight to the Great Foundry Doors.", to:16 }
          ]},
          13: { zone:"Molten Caverns", title:"The Clan Treasury", text:"Stacks of stamped dwarven bullion gleam beside a masterwork suit of Dwarven Plate!", onEnter:{ gold:60, items:["dwarven_plate"], msg:"Claimed Dwarven Plate & 60 GP!" }, choices:[
            { t:"Proceed to the Great Foundry Doors.", to:16 }
          ]},
          14: { zone:"Molten Caverns", title:"The Runic Crucible", text:"Liquid fire swirls inside a rune-carved bowl. A Fire Mephit darts out of the flames, cackling!", enemy:{ name:"Magma Mephit", desc:"Mischievous elemental of molten stone.", hp:21, ac:12, atk:4, dmg:5, xp:48, gold:28, items:["runed_shards","mana_elixir"], flee:12 }, choices:[
            { t:"Dip your weapon in the Runic Crucible to empower it.", to:15 },
            { t:"Head to the Great Foundry Doors.", to:16 }
          ]},
          15: { zone:"Molten Caverns", title:"Tempered in Runefire", text:"Golden runes flare along your weapon as the crucible's magic settles into your steel! (+10 HP warmth & FORGE_BLESSED codeword).", onEnter:{ cw:"FORGE_BLESSED", healHp:10, msg:"Gained FORGE_BLESSED & restored 10 HP!" }, choices:[
            { t:"Open the Great Foundry Doors.", to:16 }
          ]},
          16: { zone:"Great Foundry", title:"The Great Foundry Gates", text:"Twin doors of hammered mithril stand ajar. Beyond, rhythmic pounding echoes like a giant's heartbeat.", choices:[
            { t:"Step boldly into the Great Foundry.", to:17 },
            { t:"Scout the upper catwalk first.", badge:"Stealth / Perception DC 11", check:{ stat:"agility", skill:"Perception", dc:11, pass:18, fail:17, passMsg:"You spot a cooling valve above the Golem!", failMsg:"Loose slag alerts the guardian below!" } }
          ]},
          17: { zone:"Great Foundry", title:"The Obsidian Golem Awakens", text:"Towering twelve feet tall in veins of glowing magma, the Obsidian Golem turns its molten eyes toward you and raises a hammer the size of a carriage!", choices:[
            { t:"Invoke the Dwarven Shutdown Rune!", reqCw:"GOLEM_OVERRIDE", badge:"GOLEM_OVERRIDE", to:19 },
            { t:"Cool its magma core with Frost Nova!", reqSpell:"Frost Nova", mp:4, badge:"Frost Nova (4 MP)", to:20, onChoose:{ cw:"CORE_CHILLED", msg:"Steam explodes! The Golem's obsidian cracks!" } },
            { t:"Face the Obsidian Golem in direct combat!", to:20 }
          ]},
          18: { zone:"Great Foundry", title:"The Cooling Valve", text:"You crank the massive brass wheel on the catwalk! Icy subterranean water pours onto the Obsidian Golem below, fracturing its volcanic armor!", onEnter:{ cw:"CORE_CHILLED", msg:"Fractured the Golem's armor (CORE_CHILLED)!" }, choices:[
            { t:"Drop down and finish the weakened Golem!", to:20 }
          ]},
          19: { zone:"Great Foundry", title:"The Master's Command", text:"Your override sigil dims the Golem's furnace heart! Half-paralyzed, it still swings wildly as its ancient wards fail.", enemy:{ name:"Obsidian Golem (Overridden)", desc:"Weakened dwarven juggernaut.", hp:22, ac:11, atk:4, dmg:5, xp:85, gold:75, items:["obsidian_core","runed_shards"], weakCw:["FORGE_BLESSED","CORE_CHILLED"] }, choices:[
            { t:"Inspect the Relighted Heart-Forge!", to:21 }
          ]},
          20: { zone:"Great Foundry", title:"Clash of Steel and Stone", text:"The floor trembles with every swing of the Obsidian Golem's colossal hammer!", enemy:{ name:"Obsidian Golem", desc:"Molten guardian of Karak-Zul.", hp:32, ac:13, atk:5, dmg:6, xp:105, gold:80, items:["obsidian_core","iron_ore"], weakCw:["FORGE_BLESSED","CORE_CHILLED"] }, choices:[
            { t:"Step up to the Heart-Forge of Karak-Zul.", to:21 }
          ]},
          21: { zone:"Great Foundry", title:"The Heart-Forge", text:"With the rogue guardian shattered, the legendary Heart-Forge of Karak-Zul glows steady and true. On the high altar rests the Clan Charter and a chest of dwarven gold.", choices:[
            { t:"Recover the Clan Charter for Prospector Thorek! (True Ending)", to:23 },
            { t:"Claim the mithril-edged spoils for yourself.", to:22 }
          ]},
          22: { zone:"Great Foundry", title:"The Delver's Claim", text:"You pack the finest ingots and gems into your sack and take the freight lift back toward daylight.", choices:[
            { t:"Ascend to Oakhaven with your fortune.", to:24 }
          ]},
          23: { zone:"Epilogue", title:"Hero of the Ironforge", text:"Returning the Clan Charter to Thorek sparks cheers across the Rusty Flagon! The grateful dwarves reward you handsomely and vow to supply Oakhaven's smithy with Karak-Zul ore.", ending:{ type:"true", title:"Savior of Karak-Zul", xp:120, gold:130, trophy:"Karak-Zul Clan Seal" }, choices:[] },
          24: { zone:"Epilogue", title:"Master of the Deep Mines", text:"You emerge from the mountain soot-stained and triumphant, pockets heavy with dwarven gold and rare runed shards.", ending:{ type:"victory", title:"Ironforge Conqueror", xp:95, gold:150, trophy:"Obsidian Forge-Shard" }, choices:[] }
        }
      },

      // ==========================================================
      // ADVENTURE 4: THE CRIMSON SPIRE OF VAELEN (22 PAGES)
      // ==========================================================
      crimson_spire: {
        id: "crimson_spire",
        title: "The Crimson Spire of Vaelen",
        subtitle: "Cursed Wizard's Tower of Shifting Stairs",
        difficulty: "Hard",
        recommendedLevel: 3,
        discoverySource: "Weeping Scholar Aldous (Tavern) or Starweaver's Curios",
        summary: "Ascend a fractured arcane tower warped by astral magic—solve mirror riddles, battle living spell-constructs, and confront the Astral Archmage's Echo.",
        totalPages: 22,
        pages: {
          1: { zone:"Spire Base", title:"The Shattered Threshold", safeRetreat:true, text:"Floating red granite blocks orbit the cracked archway of Archmage Vaelen's tower. Violet static prickles your skin as a floating brass knocker speaks: 'Enter, seeker, and be weighed by mind and steel.'", choices:[
            { t:"Step through the floating archway into the Foyer.", to:2 },
            { t:"Scan the threshold wards with Detect Traps.", reqSpell:"Detect Traps", mp:2, badge:"Detect Traps (2 MP)", to:3 },
            { t:"Circle the tower base for a servant's hatch.", badge:"Perception DC 10", check:{ stat:"spirit", skill:"Perception", dc:10, pass:3, fail:2, passMsg:"You find a ward-free cellar hatch!", failMsg:"Only sheer red stone greets you." } }
          ]},
          2: { zone:"Lower Spire", title:"The Foyer of Shifting Stairs", text:"Three marble staircases spiral upward—yet every few seconds they trade places with a chime of bells! A floating Lantern-Construct drifts near the center.", choices:[
            { t:"Time your leap onto the Golden Stair.", badge:"Agility DC 11", check:{ stat:"agility", skill:"Athletics", dc:11, pass:4, fail:5, passMsg:"You land cleanly on the moving steps!", failMsg:"The stair vanishes! You tumble into the Mirror Parlor (-3 HP)." } },
            { t:"Analyze the chime rhythm with Arcana / Lore.", badge:"Arcana / Lore DC 10", check:{ stat:"arcana", skill:"Lore", dc:10, pass:4, fail:5, passMsg:"You predict the exact shift!", failMsg:"A bell chimes early and drops you downward!" } }
          ]},
          3: { zone:"Lower Spire", title:"The Apprentice's Cache", text:"Slipping past the foyer's gravity ward, you discover an untouched alcove holding a Ring of Spellweave, a Mana Elixir, and Vaelen's astral cipher.", onEnter:{ cw:"ASTRAL_CIPHER", items:["ring_arcana","mana_elixir"], msg:"Found ASTRAL_CIPHER, Ring of Spellweave & Mana Elixir!" }, choices:[
            { t:"Ascend the stable side spiral to the Observatory.", to:4 }
          ]},
          4: { zone:"Mid Spire", title:"The Shifting Observatory", text:"Brass astrolabes spin beneath a painted star-dome. An animated Suit of Crimson Armor steps from an alcove, halberd glowing with arcane fire!", enemy:{ name:"Crimson Spell-Knight", desc:"Enchanted tower sentinel.", hp:24, ac:12, atk:5, dmg:5, xp:55, gold:35, items:["runed_shards"], flee:1 }, choices:[
            { t:"Enter the Hall of Mirrors.", to:6 },
            { t:"Climb to the Alchemical Conservatory.", to:7 }
          ]},
          5: { zone:"Mid Spire", title:"The Gravity Snare", text:"You land hard on velvet carpets (-3 HP) as two crackling Arcane Wisps swarm out of the chandeliers!", onEnter:{ dmg:3, msg:"Hard fall (-3 HP)!" }, enemy:{ name:"Arcane Wisps", desc:"Volatile orbs of living lightning.", hp:20, ac:12, atk:4, dmg:5, xp:45, gold:25, items:["shadow_essence"], flee:1 }, choices:[
            { t:"Step into the Hall of Mirrors.", to:6 }
          ]},
          6: { zone:"Mid Spire", title:"The Hall of Mirrors", text:"Seven tall silver mirrors reflect versions of you wearing crowns, chains, and wings. An inscription reads: 'Touch the mirror that never lies, and the path to the Apex opens.'", choices:[
            { t:"Touch the cracked mirror showing your bruised, true self.", to:8, onChoose:{ cw:"MIRROR_TRUE", msg:"The true mirror parts like liquid silver!" } },
            { t:"Touch the gilded mirror showing a crowned monarch.", to:9 },
            { t:"Use Lore or Detect Traps to shatter the illusion.", reqSkill:"Lore", badge:"Lore", to:8, onChoose:{ cw:"MIRROR_TRUE", msg:"You see through the vanity illusion!" } }
          ]},
          7: { zone:"Mid Spire", title:"Alchemical Conservatory", text:"Crystalline flasks bubble over blue flame. You can brew a quick restorative or search the glass cabinets.", choices:[
            { t:"Distill a Greater Health Potion with Herbalism.", reqSkill:"Herbalism", badge:"Herbalism", to:10, onChoose:{ items:["greater_potion","glowcap_spores"], msg:"Distilled a Greater Health Potion!" } },
            { t:"Test Your Luck drinking a shimmering violet vial.", badge:"Test Your Luck", luck:{ pass:10, fail:10, failDmg:4, passMsg:"Arcane nectar restores 10 HP & 6 MP!", failMsg:"Sour vapor burns your lungs (-4 HP)!", onPass:{ healHp:10, healMp:6 } } },
            { t:"Continue to the Hall of Mirrors.", to:6 }
          ]},
          8: { zone:"Upper Spire", title:"The Star-Chart Vault", text:"Beyond the true mirror lies Vaelen's private study! A pristine Astral Arch-Rod leans against a celestial globe beside 50 GP.", onEnter:{ gold:50, items:["astral_rod","runed_shards"], msg:"Claimed Astral Arch-Rod, Runed Shards & 50 GP!" }, choices:[
            { t:"Climb the Starlight Stair to the Clockwork Gallery.", to:11 }
          ]},
          9: { zone:"Mid Spire", title:"The Mirror Doppelganger", text:"Your crowned reflection steps out of the glass, drawing a shimmering blade of pure force!", enemy:{ name:"Mirror Phantom", desc:"Your own lethal reflection.", hp:24, ac:12, atk:5, dmg:6, xp:58, gold:30, items:["shadow_essence"], flee:6 }, choices:[
            { t:"Step through the shattered frame toward the Upper Spire.", to:11 }
          ]},
          10: { zone:"Upper Spire", title:"The Rune-Bridge", text:"A bridge of solid violet light spans a dizzying void inside the hollow tower.", choices:[
            { t:"Walk calmly across with Spirit.", badge:"Spirit DC 11", check:{ stat:"spirit", skill:"Lore", dc:11, pass:11, fail:11, failDmg:4, passMsg:"Your focus keeps the light solid!", failMsg:"The bridge flickers and shocks you (-4 HP)!" } },
            { t:"Cast Arcane Shield and cross safely.", reqSpell:"Arcane Shield", mp:3, badge:"Arcane Shield (3 MP)", to:11 }
          ]},
          11: { zone:"Upper Spire", title:"The Gallery of Bound Stars", text:"Two crystalline pylons channel starlight upward into the Apex Dome—fueling the Archmage's Echo above.", choices:[
            { t:"Use the Astral Cipher to invert the pylons!", reqCw:"ASTRAL_CIPHER", badge:"ASTRAL_CIPHER", to:13, onChoose:{ cw:"STARS_BOUND", msg:"Inverted the Star Pylons! The Echo above weakens!" } },
            { t:"Overload a pylon with Firebolt or Frost Nova.", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:13, onChoose:{ cw:"STARS_BOUND", msg:"A pylon shatters in violet sparks!" } },
            { t:"Smash the crystal pylon by force.", badge:"Might DC 11", check:{ stat:"might", skill:"Athletics", dc:11, pass:13, fail:12, passMsg:"The pylon shatters cleanly!", failMsg:"Backlash summons a Star-Golem!" }, onPass:{ cw:"STARS_BOUND" } }
          ]},
          12: { zone:"Upper Spire", title:"The Star-Forged Sentinel", text:"Liquid starlight condenses into a blazing Astral Elemental!", enemy:{ name:"Astral Elemental", desc:"Being of pure cosmic fire.", hp:26, ac:13, atk:5, dmg:6, xp:65, gold:40, items:["runed_shards"], flee:11 }, choices:[
            { t:"Ascend to the Apex Threshold.", to:13 }
          ]},
          13: { zone:"Spire Apex", title:"Threshold of the Astral Dome", text:"Wind howls around the open-air pinnacle of the Crimson Spire. A floating glass sanctuary hovers above, where a tall robed silhouette turns toward you.", choices:[
            { t:"Pause to catch your breath & drink a potion before ascending.", to:14 },
            { t:"Step straight onto the Astral Dais.", to:15 }
          ]},
          14: { zone:"Spire Apex", title:"Aldous's Warning", text:"You spot Scholar Aldous's dropped satchel tucked behind a pillar—containing a Greater Health Potion and Mana Elixir left for whoever climbed this high.", onEnter:{ items:["greater_potion","mana_elixir"], msg:"Found Aldous's Greater Potion & Mana Elixir!" }, choices:[
            { t:"Ascend to the Astral Dais.", to:15 }
          ]},
          15: { zone:"Spire Apex", title:"The Astral Archmage's Echo", text:"'Mortal trespasser!' thunders the radiant Echo of Archmage Vaelen, orbiting moons of fire circling his shoulders. 'My tower shall not fall to lesser minds!'", choices:[
            { t:"Challenge his thesis using Lore & the Astral Cipher!", reqCw:"ASTRAL_CIPHER", badge:"ASTRAL_CIPHER", to:16 },
            { t:"Engage the Astral Echo in a duel of steel and spell!", to:17 },
            { t:"Use Shadowstep to slip behind his fire-moons!", reqSpell:"Shadowstep", mp:3, badge:"Shadowstep (3 MP)", to:17, onChoose:{ cw:"ECHO_FLANKED", msg:"You flank the Archmage's defenses!" } }
          ]},
          16: { zone:"Spire Apex", title:"The Fractured Equation", text:"Speaking Vaelen's own unfinished theorem causes his astral form to flicker violently! Enraged yet unstable, the Echo unleashes a desperate storm!", enemy:{ name:"Vaelen's Echo (Unstable)", desc:"Weakened astral remnant of the Archmage.", hp:26, ac:12, atk:5, dmg:6, xp:115, gold:100, items:["runed_shards","shadow_essence"], weakCw:["STARS_BOUND","MIRROR_TRUE"] }, choices:[
            { t:"Bind the Spire's Astral Heart!", to:18 }
          ]},
          17: { zone:"Spire Apex", title:"Duel Beneath the Stars", text:"Arcane lightning splits the night sky as Archmage Vaelen's Echo descends in blazing crimson robes!", enemy:{ name:"Astral Archmage's Echo", desc:"Supreme arcane construct of the Crimson Spire.", hp:36, ac:13, atk:6, dmg:7, xp:140, gold:110, items:["runed_shards","obsidian_core"], weakCw:["STARS_BOUND","ECHO_FLANKED","MIRROR_TRUE"] }, choices:[
            { t:"Approach the quieted Astral Heart.", to:18 }
          ]},
          18: { zone:"Spire Apex", title:"The Astral Heart", text:"The Echo bows one last time and dissolves into falling starlight. At the dome's center hovers the Crimson Focus—a jewel pulsing with Vaelen's centuries of study.", choices:[
            { t:"Stabilize the Spire and gift Vaelen's notes to Scholar Aldous! (True Ending)", to:21 },
            { t:"Shatter the Focus to claim its priceless arcane shards.", to:19 }
          ]},
          19: { zone:"Spire Apex", title:"The Cascading Collapse", text:"As you wrench free the shards, the floating granite stairs begin to drift apart! You leap down the spiraling platforms toward the hillside below.", choices:[
            { t:"Leap clear into the night!", to:22 }
          ]},
          20: { zone:"Spire Apex", title:"The Star-Bridge Home", text:"A ribbon of gentle starlight carries you softly down to the valley road.", choices:[
            { t:"Return to Oakhaven.", to:21 }
          ]},
          21: { zone:"Epilogue", title:"Arch-Scholar of the Spire", text:"Scholar Aldous weeps with joy as you present Vaelen's stabilized notes. The Crimson Spire's curse is broken, and Oakhaven's mages honor you with a generous stipend and title.", ending:{ type:"true", title:"Master of the Crimson Spire", xp:150, gold:160, trophy:"Astral Star-Focus" }, choices:[] },
          22: { zone:"Epilogue", title:"Plunderer of the Stars", text:"The Crimson Spire dims behind you as you stride back to Oakhaven with a satchel brimming with rare runed shards and arcane gold.", ending:{ type:"victory", title:"Spire Conqueror", xp:120, gold:185, trophy:"Crimson Shard" }, choices:[] }
        }
      },

      // ==========================================================
      // ADVENTURE 5: THE SMUGGLER'S COVE OF SALTFANG (22 PAGES)
      // ==========================================================
      saltfang: {
        id: "saltfang",
        title: "The Smuggler's Cove of Saltfang",
        subtitle: "Tidal Sea Caves & the Ghost Ship Dreadtide",
        difficulty: "Easy-Medium",
        recommendedLevel: 1,
        discoverySource: "Hooded Smuggler Vex (Tavern) or Coastal Cliffs",
        summary: "Descend the fog-bound cliffs into Saltfang's tidal grottoes, battle sahuagin raiders, disarm pirate traps, and board Captain Marrowbone's ghost ship.",
        totalPages: 22,
        pages: {
          1: { zone:"Coastal Cliffs", title:"The Smuggler's Rope-Way", safeRetreat:true, text:"Salt spray stings your cheeks as waves boom inside the jagged sea-arch of Saltfang Cove. A knotted hemp rope drops down into a lantern-lit grotto, while a low tidal ledge skirts the foaming surf.", choices:[
            { t:"Climb down the knotted smuggler's rope.", to:2 },
            { t:"Creep along the low tidal ledge.", to:3, badge:"Agility / Stealth DC 8", check:{ stat:"agility", skill:"Stealth", dc:8, pass:3, fail:3, failDmg:2, failMsg:"A cold wave slams you against barnacles (-2 HP)." } },
            { t:"Scout the clifftop signal tower first.", to:4 }
          ]},
          2: { zone:"Tidal Caves", title:"The Rum-Runner's Landing", text:"Sodden crates of spiced rum line a sandy beach inside the cave. Two scaly Sahuagin Raiders hiss, leveling barbed harpoons!", enemy:{ name:"Sahuagin Raiders", desc:"Finned sea-devil scavengers.", hp:15, ac:10, atk:3, dmg:4, xp:30, gold:20, items:["sea_salt"], flee:1 }, choices:[
            { t:"Search the stacked smuggler crates.", to:5 },
            { t:"Follow the echoing sea-tunnel deeper.", to:6 }
          ]},
          3: { zone:"Tidal Caves", title:"The Barnacle Arch", text:"Ducking under dripping stalactites, you bypass the beach patrol and spot a half-buried brass spyglass and a sealed Sea-Chest.", choices:[
            { t:"Pick the corroded Sea-Chest lock.", reqSkill:"Lockpicking", badge:"Lockpicking", to:5, onChoose:{ gold:30, items:["pearl_chest"], msg:"Looted 30 GP & a Lustrous Pearl!" } },
            { t:"Slip onward into the Echoing Sea-Tunnel.", to:6 }
          ]},
          4: { zone:"Coastal Cliffs", title:"The Signal Brazier", text:"Inside the ruined watchtower lies a waterproof logbook detailing the safe low-tide reef path and a Saltfang Sea-Coat hung on a peg!", onEnter:{ cw:"TIDE_CHART", items:["sea_coat"], msg:"Found TIDE_CHART & Saltfang Sea-Coat!" }, choices:[
            { t:"Descend the knotted rope into the cove.", to:2 }
          ]},
          5: { zone:"Tidal Caves", title:"Vex's Hidden Stash", text:"Behind a false rum cask you find an Alchemist's Bomb, a Health Potion, and a tarnished silver compass pointing toward the Ghost Ship.", onEnter:{ cw:"COMPASS_FOUND", items:["alchemist_bomb","health_potion"], msg:"Found COMPASS_FOUND, Bomb & Health Potion!" }, choices:[
            { t:"Enter the Echoing Sea-Tunnel.", to:6 }
          ]},
          6: { zone:"Tidal Caves", title:"The Rising Tide Tunnel", text:"Green seawater swirls knee-deep around jagged coral pillars. Ahead, the cavern opens onto an underground lagoon lit by eerie green lanterns.", choices:[
            { t:"Use the Tide Chart to cross on dry stepping-stones.", reqCw:"TIDE_CHART", badge:"TIDE_CHART", to:8 },
            { t:"Wade swiftly through the surging current.", badge:"Might / Athletics DC 9", check:{ stat:"might", skill:"Athletics", dc:9, pass:8, fail:7, passMsg:"You brace cleanly against the surf!", failMsg:"An undertow sweeps you into a reef pool!" } }
          ]},
          7: { zone:"Tidal Caves", title:"The Reef Ambush", text:"A giant Reef Crab with barnacle-crusted pincers snaps out of the foam!", enemy:{ name:"Giant Reef Crab", desc:"Armored tide-pool monster.", hp:17, ac:11, atk:3, dmg:4, xp:34, gold:15, items:["sea_salt"], flee:6 }, choices:[
            { t:"Clamber ashore at the Lagoon Pier.", to:8 }
          ]},
          8: { zone:"Underground Lagoon", title:"The Sunken Lagoon Pier", text:"Moored in the subterranean bay floats the rotting three-masted galleon <em>Dreadtide</em>, its tattered sails glowing faintly green. A rowboat rests by the pier, and a narrow cliff bridge leads to a Sea-Witch's Alcove.", choices:[
            { t:"Row silently out to the Dreadtide's anchor chain.", to:10 },
            { t:"Visit the glowing Sea-Witch's Alcove across the bridge.", to:9 }
          ]},
          9: { zone:"Underground Lagoon", title:"The Sea-Witch's Alcove", text:"Glass fishing floats hang over a stone basin. An old spirit-lamp whispers: 'Leave 15 gold or cast light, and take the Cutlass of the Tides.'", choices:[
            { t:"Offer a prayer / Turn Undead to bless the basin.", reqSpell:"Turn Undead", mp:4, badge:"Turn Undead (4 MP)", to:10, onChoose:{ items:["cutlass_tides","mana_elixir"], msg:"Claimed Cutlass of the Tides & Mana Elixir!" } },
            { t:"Search the alcove for salt crystals and head to the ship.", to:10, onChoose:{ items:["sea_salt","antidote"], msg:"Gathered Sea Salt Crystals & Antidote." } }
          ]},
          10: { zone:"The Dreadtide", title:"Main Deck of the Dreadtide", text:"Barnacle-crusted planks creak beneath your boots. Skeletal deckhands coil ghostly ropes around the mainmast—two turn their hollow sockets toward you!", enemy:{ name:"Skeletal Buccaneers", desc:"Undead crew of the Dreadtide.", hp:18, ac:10, atk:3, dmg:4, undead:true, xp:40, gold:26, items:["bone_dust"], flee:8 }, choices:[
            { t:"Descend the hatch into the Gun Deck.", to:11 },
            { t:"Climb straight to the Quarterdeck Cabin.", to:14 }
          ]},
          11: { zone:"The Dreadtide", title:"The Flooded Gun Deck", text:"Rusting bronze cannons line the dark hold. A glowing powder keg sits beside a locked iron strongbox.", choices:[
            { t:"Pick the Quartermaster's strongbox.", reqSkill:"Lockpicking", badge:"Lockpicking", to:12 },
            { t:"Test Your Luck prying open the strongbox.", badge:"Test Your Luck", luck:{ pass:12, fail:13, failDmg:4, passMsg:"The lid pops cleanly!", failMsg:"A spring-needle traps your wrist (-4 HP)!" } },
            { t:"Climb back up to the Quarterdeck Cabin.", to:14 }
          ]},
          12: { zone:"The Dreadtide", title:"The Quartermaster's Chest", text:"Inside gleams a Lustrous Pearl, 45 GP, and Captain Marrowbone's cursed Black Doubloon—which strips him of his phantom immunity!", onEnter:{ cw:"BLACK_DOUBLOON", gold:45, items:["pearl_chest"], msg:"Found BLACK_DOUBLOON, Pearl & 45 GP!" }, choices:[
            { t:"Storm the Quarterdeck Cabin!", to:14 }
          ]},
          13: { zone:"The Dreadtide", title:"The Bilge Lurker", text:"The noise draws a bloated Drowned Bosun from the bilge water!", enemy:{ name:"Drowned Bosun", desc:"Heavy-chained undead officer.", hp:20, ac:11, atk:4, dmg:4, undead:true, xp:42, gold:25, items:["sea_salt"], flee:10 }, choices:[
            { t:"Climb up to the Quarterdeck Cabin.", to:14 }
          ]},
          14: { zone:"The Dreadtide", title:"The Captain's Cabin", text:"Lanterns sway over maps of sunken fleets. Behind a mahogany helm-desk stands Captain Marrowbone in a feathered tricorne, skeletal hand resting on a glowing cutlass!", choices:[
            { t:"Toss his Black Doubloon onto the table to break his ward!", reqCw:"BLACK_DOUBLOON", badge:"BLACK_DOUBLOON", to:16 },
            { t:"Parley with the pirate captain for a share of the vault.", badge:"Persuasion DC 11", check:{ stat:"spirit", skill:"Persuasion", dc:11, pass:15, fail:17, passMsg:"Marrowbone laughs and offers a wager!", failMsg:"'Dead men tell no bargains!' he roars!" } },
            { t:"Draw steel and challenge Captain Marrowbone!", to:17 }
          ]},
          15: { zone:"The Dreadtide", title:"The Pirate's Wager", text:"'Roll bones with me, landlubber!' Marrowbone grins, rattling ivory dice. 'Beat my luck and take half my chest!'", choices:[
            { t:"Test Your Luck at Marrowbone's dice table!", badge:"Test Your Luck", luck:{ pass:22, fail:17, passMsg:"Snake-eyes for the Captain! He honors his oath!", failMsg:"Loaded bones! Marrowbone draws his steel!" } },
            { t:"Flip the table and strike!", to:17 }
          ]},
          16: { zone:"The Dreadtide", title:"The Broken Oath", text:"The Black Doubloon hisses on the wood, shattering Marrowbone's ghostly aura! 'Curse ye, thief!' he bellows as steel meets bone!", enemy:{ name:"Captain Marrowbone (Weakened)", desc:"Cursed pirate lord without his ward.", hp:21, ac:11, atk:4, dmg:5, undead:true, xp:80, gold:75, items:["cutlass_tides","pearl_chest"] }, choices:[
            { t:"Claim the Captain's Treasure Chest!", to:18 }
          ]},
          17: { zone:"The Dreadtide", title:"Duel on the Quarterdeck", text:"Captain Marrowbone leaps atop the chart table with a chilling laugh, slashing in blinding arcs!", enemy:{ name:"Captain Marrowbone", desc:"Undying scourge of Saltfang Cove.", hp:27, ac:12, atk:4, dmg:5, undead:true, xp:95, gold:85, items:["cutlass_tides","sea_salt"], weakCw:["COMPASS_FOUND"] }, choices:[
            { t:"Open the Captain's Treasure Chest!", to:18 }
          ]},
          18: { zone:"The Dreadtide", title:"The Sunken Booty", text:"With Captain Marrowbone reduced to sea-foam and dust, the ship begins to settle lower in the lagoon! You snatch a chest overflowing with Spanish gold and pearls.", choices:[
            { t:"Free the trapped ghost-ship souls by burning the cursed ledger! (True Ending)", to:21 },
            { t:"Row back to the smuggler's rope before the tide rises!", to:19 }
          ]},
          19: { zone:"Tidal Caves", title:"Escape Before High Tide", text:"Foam surges up the cave stairs as you haul yourself up the knotted rope into the crisp sea breeze.", choices:[
            { t:"March back to Oakhaven with your pirate gold.", to:22 }
          ]},
          20: { zone:"Tidal Caves", title:"Calm Waters", text:"The sea caves quiet as sunlight breaks over the cliffs.", choices:[
            { t:"Return to Oakhaven.", to:21 }
          ]},
          21: { zone:"Epilogue", title:"Liberator of Saltfang", text:"As the cursed ledger turns to ash, the Dreadtide sails peacefully into silver mist. Hooded Smuggler Vex buys your drinks at the Rusty Flagon and pays a handsome bounty for clearing the cove.", ending:{ type:"true", title:"Liberator of Saltfang Cove", xp:105, gold:115, trophy:"Captain's Silver Compass" }, choices:[] },
          22: { zone:"Epilogue", title:"King of the Smugglers", text:"Your boots squelch with seawater, but your pouch clinks with pirate sovereigns and lustrous pearls—enough to fund any expedition in Oakhaven!", ending:{ type:"rogue", title:"Saltfang Plunderer", xp:85, gold:145, trophy:"Marrowbone's Tricorne" }, choices:[] }
        }
      },

      // ==========================================================
      // ADVENTURE 6: THE PLAGUE-CATACOMBS OF ST. JUDE (22 PAGES)
      // ==========================================================
      st_jude: {
        id: "st_jude",
        title: "The Plague-Catacombs of St. Jude",
        subtitle: "Abandoned Abbey & Alchemical Ossuary",
        difficulty: "Medium",
        recommendedLevel: 2,
        discoverySource: "High Priestess Selene (Temple) or Old Ruins",
        summary: "Infiltrate the quarantined abbey of St. Jude, solve the bell-tower chime puzzle, battle alchemical oozes and cultists, and stop the Blight Apothecary.",
        totalPages: 22,
        pages: {
          1: { zone:"Abbey Courtyard", title:"The Quarantined Gates", safeRetreat:true, text:"Withered ivy chokes the iron fence of St. Jude's Abbey. Green alchemical mist seeps from the cellar grates below, while a cracked stone bell-tower looms over the silent nave.", choices:[
            { t:"Push open the heavy oak Abbey Doors.", to:2 },
            { t:"Climb the ivy-draped Bell-Tower stair.", to:3 },
            { t:"Drop into the misty Cellar Grate.", to:4, badge:"Agility DC 9", check:{ stat:"agility", skill:"Stealth", dc:9, pass:4, fail:4, failDmg:2, failMsg:"Broken vials cut your palm (-2 HP)." } }
          ]},
          2: { zone:"Abbey Nave", title:"The Silent Nave", text:"Overturned pews litter the stone floor. Two Plague Cultists in beaked brass masks ladle green vapor from a steaming cauldron!", enemy:{ name:"Plague Cultists", desc:"Masked servants of the Blight Apothecary.", hp:17, ac:10, atk:3, dmg:4, xp:35, gold:22, items:["antidote","bone_dust"], flee:1 }, choices:[
            { t:"Inspect the High Altar behind the cauldron.", to:5 },
            { t:"Descend the crypt stairs into the Catacombs.", to:6 }
          ]},
          3: { zone:"Bell Tower", title:"The Three Bronze Bells", text:"Three ropes hang beneath bronze bells labeled Dawn, Noon, and Dusk. A carved hymn reads: 'Ring first the waking sun, then the fading light, to open St. Jude's hidden reliquary.'", choices:[
            { t:"Pull Dawn, then Dusk.", to:5, onChoose:{ cw:"BELL_SOLVED", gold:30, items:["golden_censer"], msg:"A secret niche opens! Found BELL_SOLVED, Golden Censer & 30 GP!" } },
            { t:"Pull Noon, then Dawn.", to:2, onChoose:{ dmg:2, msg:"The sour clang alerts the cultists and shakes loose mortar (-2 HP)!" } },
            { t:"Use Lore to verify the hymn before pulling.", reqSkill:"Lore", badge:"Lore", to:5, onChoose:{ cw:"BELL_SOLVED", gold:30, items:["golden_censer"], msg:"Solved cleanly! Found Golden Censer & 30 GP!" } }
          ]},
          4: { zone:"Abbey Cellars", title:"The Alchemical Drain", text:"Green sludge drips from shattered glass retorts. A quivering Caustic Ooze blocks the passage!", enemy:{ name:"Caustic Ooze", desc:"Acidic alchemical slime.", hp:18, ac:9, atk:3, dmg:4, xp:36, gold:16, items:["glowcap_spores"], flee:1 }, choices:[
            { t:"Enter the Main Catacombs.", to:6 }
          ]},
          5: { zone:"Abbey Nave", title:"St. Jude's Reliquary", text:"Beneath the altar cloth rests a vial of Pure Dawn-Water and a blessed Chainmail Hauberk untouched by rust.", onEnter:{ cw:"DAWN_WATER", items:["chainmail","greater_potion"], msg:"Found DAWN_WATER, Chainmail Hauberk & Greater Potion!" }, choices:[
            { t:"Descend into the Plague-Catacombs.", to:6 }
          ]},
          6: { zone:"Catacombs", title:"The Ossuary Crossroads", text:"Rows of bleached skulls watch over three damp tunnels. Thick green miasma drifts from the eastern arch; faint metallic clinking echoes from the west.", choices:[
            { t:"Hold your breath and push through the eastern miasma.", badge:"Spirit / Herbalism DC 10", check:{ stat:"spirit", skill:"Herbalism", dc:10, pass:8, fail:8, failDmg:4, passMsg:"You filter the fumes cleanly!", failMsg:"Noxious vapor burns your lungs (-4 HP)!" } },
            { t:"Investigate the clinking workshop to the west.", to:7 },
            { t:"Cast Turn Undead to clear the eastern miasma.", reqSpell:"Turn Undead", mp:4, badge:"Turn Undead (4 MP)", to:8 }
          ]},
          7: { zone:"Catacombs", title:"The Bone-Grinder's Bench", text:"A hunched Cult Alchemist scrambles to throw a smoking flask as you kick open the door!", enemy:{ name:"Cult Alchemist", desc:"Crazed brewer of plague tonics.", hp:20, ac:11, atk:4, dmg:4, xp:44, gold:28, items:["alchemist_bomb","antidote","bone_dust"], flee:6 }, choices:[
            { t:"Take the Apothecary's antidote formula and move east.", to:9 }
          ]},
          8: { zone:"Catacombs", title:"The Sealed Quarantine Door", text:"A heavy brass bulkhead seals the inner laboratory. A combination wheel sits beside a rusted lever.", choices:[
            { t:"Pick the brass lock.", reqSkill:"Lockpicking", badge:"Lockpicking", to:10 },
            { t:"Force the rusted lever with Might.", badge:"Might DC 10", check:{ stat:"might", skill:"Athletics", dc:10, pass:10, fail:10, failDmg:3, passMsg:"The bulkhead swings open!", failMsg:"Pressurized steam scalds your arm (-3 HP)!" } }
          ]},
          9: { zone:"Catacombs", title:"The Counter-Tonic", text:"You pocket the Apothecary's counter-formula, rendering his worst blight-vapors harmless! (+8 HP).", onEnter:{ cw:"CURE_KNOWN", healHp:8, msg:"Learned CURE_KNOWN & restored 8 HP!" }, choices:[
            { t:"Unlock the side hatch into the Inner Vat Room.", to:10 }
          ]},
          10: { zone:"Inner Catacombs", title:"The Bubbling Vat Room", text:"Giant copper vats hiss with luminescent green plague-ichor. An amalgam of bone and slime—a Blight Abomination—heaves itself out of the central vat!", enemy:{ name:"Blight Abomination", desc:"Towering undead alchemical horror.", hp:23, ac:11, atk:4, dmg:5, undead:true, xp:52, gold:32, items:["glowcap_spores","bone_dust"], flee:6 }, choices:[
            { t:"Pour Dawn-Water into the central vat!", reqCw:"DAWN_WATER", badge:"DAWN_WATER", to:12, onChoose:{ cw:"VAT_PURIFIED", msg:"The vats turn crystal clear (VAT_PURIFIED)!" } },
            { t:"Sabotage the pressure valves and press onward.", to:11 }
          ]},
          11: { zone:"Inner Catacombs", title:"The Pressure Surge", text:"You wrench the copper pipes loose, flooding the lower drains and clearing the staircase to the Apothecary's Sanctum.", choices:[
            { t:"Ascend into the Blight Apothecary's Sanctum.", to:13 }
          ]},
          12: { zone:"Inner Catacombs", title:"Purifying Mist", text:"Golden steam rises from the cleansed vats, knitting your wounds (+10 HP) and drifting up to weaken the cult leader above!", onEnter:{ healHp:10, msg:"Restored 10 HP from purifying mist!" }, choices:[
            { t:"Confront the Blight Apothecary!", to:13 }
          ]},
          13: { zone:"Apothecary Sanctum", title:"The Blight Apothecary", text:"Standing behind a wall of crackling glass coils, Master Malgrath—the Blight Apothecary—adjusts his gilded plague-mask. 'You are too late! By midnight, Oakhaven's wells shall drink my masterpiece!'", choices:[
            { t:"Throw the Counter-Tonic into his main retort!", reqCw:"CURE_KNOWN", badge:"CURE_KNOWN", to:15 },
            { t:"Shatter his glass coils with Firebolt!", reqSpell:"Firebolt", mp:3, badge:"Firebolt (3 MP)", to:15, onChoose:{ cw:"COILS_BROKEN", msg:"Exploding glass weakens Malgrath!" } },
            { t:"Charge across the laboratory with steel raised!", to:16 }
          ]},
          14: { zone:"Apothecary Sanctum", title:"The Side Cabinet", text:"You snatch a spare Health Potion before facing the master.", onEnter:{ items:["health_potion"] }, choices:[
            { t:"Confront Malgrath!", to:16 }
          ]},
          15: { zone:"Apothecary Sanctum", title:"The Ruined Brew", text:"Malgrath's coils shatter in harmless white steam! Shrieking in fury, the Apothecary draws a venom-slicked bone saw!", enemy:{ name:"Blight Apothecary (Weakened)", desc:"Cornered plague-master.", hp:22, ac:11, atk:4, dmg:5, xp:85, gold:75, items:["greater_potion","shadow_essence"], weakCw:["VAT_PURIFIED","COILS_BROKEN"] }, choices:[
            { t:"Destroy the remaining blight vials!", to:17 }
          ]},
          16: { zone:"Apothecary Sanctum", title:"Duel of the Plague-Master", text:"Malgrath hurls choking flasks and lunges with a serrated bone saw!", enemy:{ name:"Master Malgrath", desc:"The Blight Apothecary of St. Jude.", hp:28, ac:12, atk:5, dmg:5, xp:98, gold:80, items:["greater_potion","glowcap_spores"], weakCw:["VAT_PURIFIED"] }, choices:[
            { t:"Cleanse the sanctum.", to:17 }
          ]},
          17: { zone:"Apothecary Sanctum", title:"The Sanctum Cleansed", text:"With Malgrath defeated, the dark lanterns gutter out. On his oak desk sits a leather coffer of gold and St. Jude's stolen Silver Chalice.", choices:[
            { t:"Return St. Jude's Chalice to High Priestess Selene! (True Ending)", to:21 },
            { t:"Keep the Apothecary's gold and alchemical stock.", to:18 }
          ]},
          18: { zone:"Abbey Courtyard", title:"Dawn Over St. Jude", text:"Fresh morning breeze clears the last green wisps from the abbey courtyard as you pack your rewards.", choices:[
            { t:"Return to Oakhaven.", to:22 }
          ]},
          19: { zone:"Abbey Courtyard", title:"Quiet Bells", text:"The bronze bells stand silent above the cleansed abbey.", choices:[{ t:"Head home.", to:21 }] },
          20: { zone:"Abbey Courtyard", title:"The Road Back", text:"Oakhaven's rooftops appear over the hillside.", choices:[{ t:"Enter Oakhaven.", to:22 }] },
          21: { zone:"Epilogue", title:"Savior of Oakhaven", text:"High Priestess Selene rings the Dawn Bell in celebration as you return St. Jude's Chalice. The plague threat is ended forever, and the Temple rewards you with gold and eternal favor!", ending:{ type:"true", title:"Savior of St. Jude", xp:115, gold:125, trophy:"Chalice of St. Jude" }, choices:[] },
          22: { zone:"Epilogue", title:"The Plague-Hunter's Pay", text:"The abbey stands silent and purged of cultists. You stride back through Oakhaven's gates with a heavy purse of alchemist's gold and rare brewing ingredients.", ending:{ type:"victory", title:"Purger of the Catacombs", xp:95, gold:145, trophy:"Gilded Plague-Mask" }, choices:[] }
        }
      }
});
