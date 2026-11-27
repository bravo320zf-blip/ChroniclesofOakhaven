/* ============================================================
   BOOK QUESTS — BATCH 012 (11 Quests • All autoDiscover: false)
   Purely in-world subtitles & Inn rumor pool discovery.
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. ROGUES IN REMBALLO (6 PAGES • LV 1)
  // ==========================================================
  bk_b12_remballo_rogues: {
    id: "bk_b12_remballo_rogues",
    title: "Rogues in Remballo",
    subtitle: "Dead Fiddler Square & The Four Corners",
    difficulty: "Easy",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "House Borgandy Courier (Rusty Flagon Tavern)",
    summary: "Investigate the untouchable sanctuary-courtyard of the Four Corners in Remballo, uncover the hidden tunnel beneath Feodric Ozzerd's warehouse, and rescue House Borgandy's missing heir Savario from rival guild cutthroats!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Remballo • Dead Fiddler Square",
        title: "The Untouchable Courtyard",
        safeRetreat: true,
        text: "Ancient city charters forbid the Remballo Watch from ever searching the walled courtyard known as the Four Corners. Both House Borgandy and a shadowed agent of the local Thieves' Guild hire you to slip past the crooked alleys of Dead Fiddler Square and find out what the northern syndicate known as the Friendly Men is hiding inside!",
        choices: [
          { t: "Pick the rear slate-roofed lock of Feodric Ozzerd's silent warehouse to find the smuggler tunnel.", badge: "Sleight of Hand DC 11", check: { stat: "agility", skill: "Sleight of Hand", dc: 11, pass: 2, fail: 2, passMsg: "Click! You slip through Ozzerd's hidden basement passage undetected!", failMsg: "The lock snaps loud enough to alert the syndicate lookouts!" }, onPass: { cw: "OZZERD_TUNNEL" } },
          { t: "Scale the half-timbered wall of Aralt's Warehouse and drop directly into the Four Corners!", to: 2 }
        ]
      },
      2: {
        zone: "Four Corners • Underground Warehouse",
        title: "Stolen Cloth & Syndicate Blades",
        text: "Crates of stolen woolen bolts and smuggled wine barrels fill a lantern-lit subterranean vault. Two nimble footpads of the encroaching Friendly Men drop from the rafters with drawn shortbows and oiled blades!",
        enemy: { name: "Friendly Men Cutthroats", desc: "Northern syndicate thugs encroaching on Remballo's guild turf.", hp: 20, ac: 12, atk: 4, dmg: 4, xp: 55, gold: 35, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["OZZERD_TUNNEL"] },
        choices: [
          { t: "Break through the iron-bound south gate into the syndicate captain's cellars!", to: 3 }
        ]
      },
      3: {
        zone: "Four Corners • Inner Sanctum",
        title: "The Syndicate Boss & Missing Heir",
        text: "Bound to a wooden pillar sits young Savario of House Borgandy! Standing over him is the cold-eyed Manas guild lieutenant, flashing a wicked enchanted shortsword: 'You're too late, Watch-dog—Remballo belongs to the Friendly Men now!'",
        enemy: { name: "Manas Guild Lieutenant", desc: "Fast-handed rogue captain leading the Four Corners heist.", hp: 26, ac: 13, atk: 5, dmg: 5, xp: 75, gold: 55, items: ["bq_borgandy_signet_blade"], weakCw: ["OZZERD_TUNNEL"] },
        choices: [
          { t: "Cut Savario free and escort him safely back to House Borgandy!", to: 4 }
        ]
      },
      4: {
        zone: "Borgandy Banking House",
        title: "Gratitude of the Bankers",
        text: "Mayor Catherine and Romero Borgandy welcome Savario home with quiet relief, paying out a generous purse of freshly minted silver and marking you as a trusted friend of the city's mightiest house.",
        onEnter: { healHp: 8, msg: "House Borgandy's physicians tend your wounds (+8 HP)!" },
        choices: [
          { t: "Claim your reward and slip back into the dusk.", to: 5 }
        ]
      },
      5: {
        zone: "Dead Fiddler Square",
        title: "Order Restored in the Alleys",
        text: "With the Four Corners cell broken, the Friendly Men retreat north across the borderlands.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Savior of Remballo",
        text: "You shattered the Four Corners syndicate plot and returned Savario Borgandy alive!",
        ending: { type: "true", title: "Breaker of the Four Corners", xp: 105, gold: 95, trophy: "House Borgandy Favor Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. SANCTUARY OF BELCHES (6 PAGES • LV 5)
  // ==========================================================
  bk_b12_sanctuary_belches: {
    id: "bk_b12_sanctuary_belches",
    title: "Sanctuary of Belches",
    subtitle: "Sleepless Olsha & The Howling Alpine Temple",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Exhausted Olsha Trader (Rusty Flagon Tavern)",
    summary: "Answer Mayor Brulle Gioso's desperate plea in the frostbitten town of Olsha: trek past Camp Fraughashar and rime worms, parley with besieged duergar, and silence the maddening dissonant horn echoing from the Sanctuary of Belches!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Village of Olsha • The Icicle Inn",
        title: "A Dreadful Horn in the Peaks",
        safeRetreat: true,
        text: "Every soul in snowbound Olsha is hollow-eyed from weeks without sleep—a dreadful, dissonant horn blares down from the mountain pass day and night! Mayor Brulle Gioso begs you to ascend the ridge and silence whatever lurks in the ancient subterranean temple.",
        choices: [
          { t: "Scout Camp Fraughashar from the ridge to turn the hungry rime worm grub against Captain Doont's frost goblins!", badge: "Survival DC 13", check: { stat: "spirit", skill: "Survival", dc: 13, pass: 2, fail: 2, passMsg: "You lure the burrowing rime worm straight through the goblin camp, scattering their spears!", failMsg: "Frost-slick scree gives way, alerting both the goblins and the rime worm!" }, onPass: { cw: "WORM_AMBUSH" } },
          { t: "Charge up the frozen trail through Camp Fraughashar!", to: 2 }
        ]
      },
      2: {
        zone: "Northern Ridge • Camp Fraughashar",
        title: "Wormsign in the Snowbank",
        text: "Hide tents smolder along the icy ridge as armored fraughashar goblins under Captain Doont clash with a massive, chittering Rime Worm bursting from the snow!",
        enemy: { name: "Rime Worm & Fraughashar Raiders", desc: "Frost-armored subterranean grub and bitter ice-goblins.", hp: 46, ac: 14, atk: 6, dmg: 7, xp: 145, gold: 80, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["WORM_AMBUSH"] },
        choices: [
          { t: "Parley with the trapped duergar leader Aarne at the temple gate and clear the rubble into the inner sanctuary!", to: 3 }
        ]
      },
      3: {
        zone: "Ilda's Final Rest • Sanctuary of Belches",
        title: "The Foul Shrine & Giant Guardians",
        text: "A choking volcanic stench rolls out of the spiral-carved worship hall! Inside the Sanctuary of Belches, a monstrous Thursir giant and bloated flab-giant wardens blast the cursed bronze horn amid belching sulfur vents!",
        enemy: { name: "Thursir Giant & Horn Wardens", desc: "Runic frost-giant wielding a thunderous cursed war-horn.", hp: 58, ac: 14, atk: 7, dmg: 8, xp: 205, gold: 135, items: ["bq_belches_rime_horn"], weakCw: ["WORM_AMBUSH"] },
        choices: [
          { t: "Shatter the dissonant brass horn and seal the sulfurous sanctuary!", to: 4 }
        ]
      },
      4: {
        zone: "Olsha Mountain Pass",
        title: "Blessed Silence Returns",
        text: "For the first time in weeks, crisp mountain silence settles over the snowfields. Besieged duergar slip quietly back into the deep earth as you descend toward Olsha.",
        onEnter: { healHp: 12, msg: "Pure alpine air restores your strength (+12 HP)!" },
        choices: [
          { t: "Return to Mayor Brulle Gioso at the Icicle Inn!", to: 5 }
        ]
      },
      5: {
        zone: "Olsha • Town Square",
        title: "A Town Finally Sleeps",
        text: "Weeping with gratitude, Mayor Gioso awards you the town's collected gold and a hero's toast.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Silencer of the Mountain Horn",
        text: "The Sanctuary of Belches is quieted and Olsha sleeps in peace once more!",
        ending: { type: "true", title: "Silencer of the Sanctuary", xp: 245, gold: 225, trophy: "Cracked Bronze War-Horn" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. SEA OF BONES (6 PAGES • LV 3)
  // ==========================================================
  bk_b12_sea_of_bones: {
    id: "bk_b12_sea_of_bones",
    title: "Sea of Bones",
    subtitle: "The Bastion of Dreamsedge & The Void Prison",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Council of the Infinite Eclipse Envoy (Rusty Flagon Tavern)",
    summary: "Sail the Fey Rose across the churning gyre of bone and ooze to deliver Starlight Tincture to the Bastion of Dreamsedge, rescue alchemist Nephrus, and stop Xepothus from freeing the imprisoned World-Eater!",
    totalPages: 6,
    pages: {
      1: {
        zone: "The Fey Rose • Edge of Reality",
        title: "Wave of Bone & Ooze",
        safeRetreat: true,
        text: "A hundred yards from the drifting prison-fortress of Dreamsedge, violet Void lightning cracks beneath its glass dome! A monstrous wave of rattling skeletons and black ooze slams into the Fey Rose as you clutch the precious Starlight Tincture!",
        choices: [
          { t: "Steady the helm and cut cleanly through the bone-surge to beach beside the stone quay!", badge: "Athletics DC 12", check: { stat: "might", skill: "Athletics", dc: 12, pass: 2, fail: 2, passMsg: "You wrench the wheel true—the Fey Rose skims past the worst of the skeletal boarding wave!", failMsg: "Skeletal hands claw over the gunwales as the ship shudders!" }, onPass: { cw: "FEY_ROSE_INTACT" } },
          { t: "Leap onto the stone quay with blade drawn to carve a path into the Bastion!", to: 2 }
        ]
      },
      2: {
        zone: "Bastion of Dreamsedge • Alchemy Wing",
        title: "Rescuing Nephrus & The Font of Nightmares",
        text: "Inside the shattered workshop, renegade Void cultists corner dragonborn alchemist Nephrus! 'Quickly!' he gasps. 'Gather Void Essence from the Font of Nightmares and help me brew the Etheric Sealant before the prison breaks!'",
        enemy: { name: "Void Fanatics & Bonewalkers", desc: "Renegade cultists and corrupted skeletal wardens.", hp: 34, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["FEY_ROSE_INTACT"] },
        choices: [
          { t: "Escort Nephrus to the Font of Dreams and confront Xepothus beneath the glass dome!", to: 3 }
        ]
      },
      3: {
        zone: "Bastion of Dreamsedge • The Binding Dome",
        title: "Xepothus & The World-Eater's Wake",
        text: "Swirling black entropy roars around the cracked binding sigils! Cult leader Xepothus channels dark lightning alongside shrieking Void Dragon Wyrmlings to shatter the last seal!",
        enemy: { name: "Xepothus & Void Wyrmlings", desc: "Void-touched fanatic trying to unchain an ancient dragon of entropy.", hp: 42, ac: 14, atk: 6, dmg: 6, xp: 135, gold: 90, items: ["bq_starlight_sealant_charm"], weakCw: ["FEY_ROSE_INTACT"] },
        choices: [
          { t: "Pour the Starlight Tincture and Etheric Sealant into the binding circle!", to: 4 }
        ]
      },
      4: {
        zone: "Bastion of Dreamsedge • Glass Dome",
        title: "The Prison Holds",
        text: "Blinding starlight floods the chamber! The World-Eater's roar fades back into sealed slumber, and High Warden Mirasha bows deeply in gratitude.",
        onEnter: { healHp: 10, msg: "Nephrus shares restorative alchemical draughts (+10 HP)!" },
        choices: [
          { t: "Set sail aboard the Fey Rose back to the Council of the Infinite Eclipse!", to: 5 }
        ]
      },
      5: {
        zone: "Council of the Infinite Eclipse",
        title: "Warden's Commendation",
        text: "The arcane council rewards your speed and resolve with gold and rare starlight wards.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Savior of Dreamsedge",
        text: "You sealed the Bastion of Dreamsedge and kept the World-Eater chained in the Void!",
        ending: { type: "true", title: "Warden of the Starlight Seal", xp: 165, gold: 150, trophy: "Vial of Starlight Tincture" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. SHADOWS OF THE DUSK QUEEN (6 PAGES • LV 8)
  // ==========================================================
  bk_b12_dusk_queen: {
    id: "bk_b12_dusk_queen",
    title: "Shadows of the Dusk Queen",
    subtitle: "The Shifting Wood & The Five Mirror Shards",
    difficulty: "Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Sun-Scarred Desert Scholar (Rusty Flagon Tavern)",
    summary: "Enter an ever-shifting forest of twilight shadows, recover the five shattered shards of the Dusk Queen's enchanted mirror from shadow nymphs and wraiths, and confront the awakening Shadow Fey sovereign atop her stone tower!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Forest of Shifting Shadows",
        title: "The Sun King's Broken Prison",
        safeRetreat: true,
        text: "Towering black-barked trees stretch skyward as living shadows twist around your boots. Long ago, the desert Sun King imprisoned his cruel beloved—the Shadow Fey Dusk Queen—by shattering her arcane mirror into five shards scattered across this haunted wood. Now the seal is failing!",
        choices: [
          { t: "Read the faint solar runes along the dark stream to locate the hidden mirror shards without triggering the nymph's lure.", badge: "Arcana DC 15", check: { stat: "arcana", skill: "Arcana", dc: 15, pass: 2, fail: 2, passMsg: "Solar glints reveal three shards safely—weakening the Dusk Queen's shadow wards!", failMsg: "The dark waters ripple as a luminous Shadow Nymph rises with an eerie laugh!" }, onPass: { cw: "SOLAR_SHARDS" } },
          { t: "Plunge straight toward the glittering mirror shard embedded in the ancient heart-tree!", to: 2 }
        ]
      },
      2: {
        zone: "Twilight Pool & Heart-Tree",
        title: "Shadow Nymph & Mirror Wraiths",
        text: "As you wrench the razor-bright mirror shard from the gnarled bark, cold wraiths pour out of the tree's shadow while a haunting Shadow Nymph weaves blinding twilight illusions from the dark pool!",
        enemy: { name: "Shadow Nymph & Mirror Wraiths", desc: "Fey water-spirit and necrotic wraiths guarding the shattered mirror.", hp: 68, ac: 15, atk: 8, dmg: 10, xp: 265, gold: 150, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["SOLAR_SHARDS"] },
        choices: [
          { t: "Carry the five recovered shards up the winding steps of the Dusk Queen's stone tower!", to: 3 }
        ]
      },
      3: {
        zone: "Dusk Tower • Throne of Twilight",
        title: "The Dusk Queen Awakens",
        text: "Floating amidst a swirling storm of arcane scrolls and velvet shadows, the regal Dusk Queen turns blazing violet eyes upon you. 'You bring me the fragments of my glass—and the scent of the Sun King's betrayal!'",
        enemy: { name: "The Dusk Queen", desc: "Sovereign Shadow Fey archmage cloaked in twilight wards and ancient magic.", hp: 82, ac: 16, atk: 9, dmg: 11, xp: 350, gold: 220, items: ["bq_dusk_queen_mirror_shard"], weakCw: ["SOLAR_SHARDS"] },
        choices: [
          { t: "Reflect the Sun King's lingering light through the five shards to bind her reign forever!", to: 4 }
        ]
      },
      4: {
        zone: "Dusk Tower • Sunlit Spire",
        title: "Dawn Breaks the Shadow Wood",
        text: "Golden shafts of morning sunlight pierce the ancient canopy for the first time in centuries. The Dusk Queen dissolves into drifting silver ash, leaving behind a crown of twilight crystal.",
        onEnter: { healHp: 15, msg: "Warm morning sunlight mends your wounds (+15 HP)!" },
        choices: [
          { t: "Descend from the tower and carry the tale back to Oakhaven!", to: 5 }
        ]
      },
      5: {
        zone: "Edge of the Forest",
        title: "Shadows Lifted",
        text: "The twisting paths straighten beneath clear skies as travelers dare the road once more.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Vanquisher of the Dusk Queen",
        text: "You gathered the five mirror shards and ended the Dusk Queen's dark dominion!",
        ending: { type: "true", title: "Breaker of the Twilight Mirror", xp: 390, gold: 340, trophy: "Shard of the Dusk Mirror" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. EVERYONE LIES (6 PAGES • LV 2)
  // ==========================================================
  bk_b12_zob_everyone_lies: {
    id: "bk_b12_zob_everyone_lies",
    title: "Everyone Lies",
    subtitle: "Free City Alleys • The Missing Tiefling Heir",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Nervous Street Thug Grigori (Rusty Flagon Tavern)",
    summary: "Navigate a tangled noir web across soot-stained alleys as the Spyglass Guild, the Blue House Watch, and the Cloven Nine all hunt for Ilyana—Lord Greymark's secret tiefling daughter!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Free City • Rain-Slicked Dockside",
        title: "Grigori's Desperate Plea",
        safeRetreat: true,
        text: "A bruised street runner named Grigori begs you to find his vanished girlfriend Ilyana before the Blue House Watch or the ruthless Cloven Nine syndicate get to her first. Rumor whispers she is secretly Lord Greymark's illegitimate tiefling daughter!",
        choices: [
          { t: "Bribe Black-Eye the carriage kobold for the true back-alley route to the Silk Scabbard!", badge: "Persuasion DC 11", check: { stat: "spirit", skill: "Persuasion", dc: 11, pass: 2, fail: 2, passMsg: "Black-Eye tips you off to the Cloven Nine's rear watch-post!", failMsg: "Word of your questions leaks straight to the Spyglass Guild!" }, onPass: { cw: "BLACKEYE_TIP" } },
          { t: "March straight into Cloven Nine turf outside the Silk Scabbard!", to: 2 }
        ]
      },
      2: {
        zone: "The Silk Scabbard • Back Alley",
        title: "Cloven Nine Ambush",
        text: "Lantern light glints off brass knuckles and curved blades as Cloven Nine enforcers step out of the fog: 'Walk away from Greymark's girl, stranger, or swim the river in iron boots!'",
        enemy: { name: "Cloven Nine Enforcers", desc: "Vicious underworld syndicate bruisers guarding the alley.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["BLACKEYE_TIP"] },
        choices: [
          { t: "Track Ilyana's trail to the abandoned riverfront warehouse before Greymark's fixer arrives!", to: 3 }
        ]
      },
      3: {
        zone: "Riverfront Loft • Safe House",
        title: "Lord Greymark's Cleaner",
        text: "Ilyana cowers behind stacked crates as a masked Spyglass assassin moves in to silence the noble scandal permanently! Steel flashes in the dusty loft!",
        enemy: { name: "Greymark's Spyglass Cleaner", desc: "Cold-blooded guild assassin hired to erase noble secrets.", hp: 32, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 65, items: ["bq_spyglass_noir_cloak"], weakCw: ["BLACKEYE_TIP"] },
        choices: [
          { t: "Smuggle Ilyana safely out of the city under cover of fog!", to: 4 }
        ]
      },
      4: {
        zone: "Lower Docks • Dawn Ferry",
        title: "Out of the Shadows",
        text: "Ilyana presses a pouch of Lord Greymark's hidden hush-gold into your hand before vanishing aboard a river barge with Grigori.",
        onEnter: { healHp: 8, msg: "Safe from the Watch and the gangs (+8 HP)!" },
        choices: [
          { t: "Fade back into the morning crowds.", to: 5 }
        ]
      },
      5: {
        zone: "Free City • Market Square",
        title: "Secrets Kept",
        text: "Both the Blue House Watch and the Cloven Nine leave the alley empty-handed—and wary of your name.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Outwitted the Underworld",
        text: "You outmaneuvered the gangs, the Watch, and a noble house to save Ilyana!",
        ending: { type: "true", title: "Ghost of the Foggy Alleys", xp: 130, gold: 120, trophy: "Greymark Silver Locket" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. RUST (6 PAGES • LV 4)
  // ==========================================================
  bk_b12_zob_rust: {
    id: "bk_b12_zob_rust",
    title: "Rust",
    subtitle: "The Tarnish Markets & The Iron Night-Things",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Shifty Merchant Mister Corpulent (Rusty Flagon Tavern)",
    summary: "Untangle the bitter feud between corrupt Tarnish merchants Mister Corpulent and wererat Master Doldrum, then storm Kaple's abandoned iron workhouse to stop the vengeful clockwork 'night-things'!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Lower City • The Tarnish",
        title: "Two Cowardly Merchants",
        safeRetreat: true,
        text: "Pudgy, scheming Mister Corpulent whispers of hidden treasure inside Kaple's rusted workhouse—if only someone brave would clear out the screeching iron 'night-things' stalking the Tarnish after sundown. Across the street, his sworn rival Master Doldrum watches with twitching, rat-like eyes!",
        choices: [
          { t: "Expose Master Doldrum's wererat spy-ring before entering the workhouse so they can't stab you in the back!", badge: "Perception DC 13", check: { stat: "spirit", skill: "Perception", dc: 13, pass: 2, fail: 2, passMsg: "You catch Doldrum's ambushers early and seize their silvered crowbars!", failMsg: "The rival merchant's thugs tail you straight into the iron foundry!" }, onPass: { cw: "SILVER_CROWBARS" } },
          { t: "Break the rusted padlock on Kaple's workhouse and step into the screeching dark!", to: 2 }
        ]
      },
      2: {
        zone: "Kaple's Workhouse • Scrap Yard",
        title: "Wererat Ambush & Clockwork Scraps",
        text: "Master Doldrum's jagged-toothed wererat cutthroats leap from rusted boiler-vats just as animated iron spiders skitter down the chains!",
        enemy: { name: "Doldrum's Wererats & Scrap Spiders", desc: "Treacherous lycanthrope thugs and jagged iron constructs.", hp: 40, ac: 13, atk: 6, dmg: 6, xp: 125, gold: 70, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["SILVER_CROWBARS"] },
        choices: [
          { t: "Descend into the main furnace hall where the chief Night-Thing awaits!", to: 3 }
        ]
      },
      3: {
        zone: "Kaple's Workhouse • Furnace Core",
        title: "The Vengeful Night-Thing",
        text: "Red-hot gears grind inside a towering, rusted iron horror stitched together from betrayed gearwork! Its screeching blade-arms swing through clouds of orange oxide dust!",
        enemy: { name: "The Iron Night-Thing", desc: "Vengeful clockwork monstrosity hunting its master's betrayers.", hp: 50, ac: 15, atk: 7, dmg: 7, xp: 170, gold: 110, items: ["bq_kaple_oxide_gauntlets"], weakCw: ["SILVER_CROWBARS"] },
        choices: [
          { t: "Shut down the foundry core and claim Kaple's hidden strongbox!", to: 4 }
        ]
      },
      4: {
        zone: "The Tarnish • Dawn Market",
        title: "A Quiet Foundry",
        text: "Both Corpulent and Doldrum pale when you march out with the deactivated Night-Thing's core, hastily paying their promised gold rather than cross you.",
        onEnter: { healHp: 10, msg: "Oil and bandages patch up the foundry scratches (+10 HP)!" },
        choices: [
          { t: "Pocket the merchants' coin and leave the Tarnish behind.", to: 5 }
        ]
      },
      5: {
        zone: "Lower City Square",
        title: "No More Screams at Night",
        text: "Lantern-bearers walk the Tarnish without fear once again.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Breaker of the Iron Night-Things",
        text: "You ended the terror of Kaple's workhouse and bested the Tarnish's crooked merchants!",
        ending: { type: "true", title: "Scourge of the Rusted Foundry", xp: 205, gold: 185, trophy: "Rusted Clockwork Heart" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. THE FISH AND THE ROSE (6 PAGES • LV 5)
  // ==========================================================
  bk_b12_zob_fish_rose: {
    id: "bk_b12_zob_fish_rose",
    title: "The Fish and the Rose",
    subtitle: "Kobold Ghetto & Cartways Painting Heist",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Fast-Talking Fixer Ziv the Sly (Rusty Flagon Tavern)",
    summary: "Take Ziv the Sly's lucrative heist to steal a precognitive painting from Lord Greymark—surviving Scaler's Alley in the Kobold Ghetto, Slinger's Ambush Gang, and a Cartways barghest crew!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Kobold Ghetto • Scaler's Alley",
        title: "Easy Money, Real Easy",
        safeRetreat: true,
        text: "Ziv the Sly offers a fat purse to lift a mysterious prophetic painting—'The Fish and the Rose'—right out from under Lord Greymark's nose. The only unguarded route runs through Scaler's Alley and down into the pitch-black Cartways!",
        choices: [
          { t: "Outsmart Slinger's Ambush Gang by tossing spiced jerky to Scaler's giant monitor lizards!", badge: "Stealth DC 13", check: { stat: "agility", skill: "Stealth", dc: 13, pass: 2, fail: 2, passMsg: "The lizards scramble after the bait, clearing your sprint into the Cartways hatch!", failMsg: "Slinger's ambushers whistle from the rooftops as the lizards lunge!" }, onPass: { cw: "LIZARD_DISTRACTION" } },
          { t: "Push straight through Scaler's Alley with weapons bared!", to: 2 }
        ]
      },
      2: {
        zone: "The Cartways • Smuggler Tunnels",
        title: "The Barghest Gang",
        text: "Beneath the cobblestone streets, glowing eyes flare in the soot-choked tunnels! A ferocious gang of goblin-shaped Barghests claims toll over the secret cellar stair beneath Greymark's vault!",
        enemy: { name: "Cartways Barghest Pack", desc: "Shape-shifting fiendish hounds ruling the under-city tunnels.", hp: 46, ac: 14, atk: 6, dmg: 7, xp: 150, gold: 85, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["LIZARD_DISTRACTION"] },
        choices: [
          { t: "Crack the cellar vault and lift the precognitive painting before Greymark's guardian strikes!", to: 3 }
        ]
      },
      3: {
        zone: "Greymark Manor • Private Gallery",
        title: "The Living Canvas & Vault Warden",
        text: "Paint ripples across 'The Fish and the Rose', showing flashes of your own next move! Lord Greymark's arcane vault-captain and animated blade-wardens rush in to cut you down!",
        enemy: { name: "Greymark's Vault Warden", desc: "Spell-armored house captain protecting the precognitive painting.", hp: 56, ac: 15, atk: 7, dmg: 8, xp: 200, gold: 130, items: ["bq_rose_precog_brooch"], weakCw: ["LIZARD_DISTRACTION"] },
        choices: [
          { t: "Roll the enchanted canvas into your tube and vanish through the Cartways to meet Ziv!", to: 4 }
        ]
      },
      4: {
        zone: "The Silk Scabbard • Back Booth",
        title: "Delivering the Prize",
        text: "Beetle the busboy nods you into a shadowed booth where Ziv the Sly and his veiled patron count out heavy stacks of gold sovereigns.",
        onEnter: { healHp: 12, msg: "A stiff drink and clean bandages steady your nerves (+12 HP)!" },
        choices: [
          { t: "Collect your cut and slip into the night.", to: 5 }
        ]
      },
      5: {
        zone: "Free City Rooftops",
        title: "Clean Getaway",
        text: "By morning, Lord Greymark's guards are still scratching their heads over an empty frame.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Master of the Cartways Heist",
        text: "You pulled off the Fish and the Rose heist without leaving a trace!",
        ending: { type: "true", title: "Phantom of the Cartways", xp: 240, gold: 230, trophy: "Ziv's Silver Lockpick" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. THE FIRST LAB (6 PAGES • LV 7)
  // ==========================================================
  bk_b12_zob_first_lab: {
    id: "bk_b12_zob_first_lab",
    title: "The First Lab",
    subtitle: "The Dragged Woman & Kovac's Sealed Cartways",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Guildmaster Orlando's Messenger (Rusty Flagon Tavern)",
    summary: "Bargain with the eerie Dragged Woman for passage into a long-sealed wing of the Cartways, outfight gearforged assassins, and recover inventor Kovac's forbidden diary from the First Lab!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Gear District • Sealed Cartways Gate",
        title: "Buried History of the Revolt",
        safeRetreat: true,
        text: "Eighty years ago, the gearforged helped liberate the Free City—but Guildmaster Orlando whispers that inventor Kovac's stolen diary reveals dark secrets about the very first prototypes! To reach the hidden lab, you must first bargain with the ghostly Dragged Woman of the under-streets.",
        choices: [
          { t: "Offer the Dragged Woman an honest memory of the Revolt to earn safe passage past the clockwork traps!", badge: "History DC 14", check: { stat: "arcana", skill: "History", dc: 14, pass: 2, fail: 2, passMsg: "The Dragged Woman murmurs the forgotten gear-passphrase, disarming the entry turrets!", failMsg: "She laughs coldly and points you toward the ticking death-corridor!" }, onPass: { cw: "DRAGGED_WOMAN_BOON" } },
          { t: "Force open the rusted bulkhead into Kovac's hidden tunnel!", to: 2 }
        ]
      },
      2: {
        zone: "Hidden Cartways • Prototype Corridor",
        title: "Gearforged Assassins",
        text: "Silent, obsidian-plated gearforged assassins drop from overhead steam pipes—sent to make sure Kovac's secrets never see daylight!",
        enemy: { name: "Obsidian Gearforged Assassins", desc: "Whisper-quiet clockwork killers armed with spring-loaded blades.", hp: 58, ac: 15, atk: 8, dmg: 9, xp: 225, gold: 130, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["DRAGGED_WOMAN_BOON"] },
        choices: [
          { t: "Breach the brass vault door of Kovac's First Lab!", to: 3 }
        ]
      },
      3: {
        zone: "Kovac's First Lab • Soul-Forge",
        title: "The Diary Thief & Prototype Zero",
        text: "Among cracked soul-gems and hissing brass coils, the masked diary thief awakens Kovac's towering, deranged first prototype—an unstable iron juggernaut crackling with blue lightning!",
        enemy: { name: "Prototype Zero & The Diary Thief", desc: "Unstable soul-forged titan defending Kovac's forbidden lab.", hp: 72, ac: 16, atk: 9, dmg: 10, xp: 300, gold: 185, items: ["bq_kovac_soul_lens"], weakCw: ["DRAGGED_WOMAN_BOON"] },
        choices: [
          { t: "Seize Kovac's leather-bound diary and seal the soul-forge!", to: 4 }
        ]
      },
      4: {
        zone: "Gearworkers' Guildhall",
        title: "Secrets Safely Kept",
        text: "Guildmaster Orlando exhales sharply as you hand over the intact diary, ensuring public trust in the city's gearforged protectors remains unbroken.",
        onEnter: { healHp: 14, msg: "Guild healers mend your armor and wounds (+14 HP)!" },
        choices: [
          { t: "Accept the Guild's rich reward.", to: 5 }
        ]
      },
      5: {
        zone: "Clockwork Plaza",
        title: "The Gears Turn On",
        text: "Above ground, the great clocktower chimes noon—none the wiser to the ghosts sleeping beneath.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Keeper of the First Lab",
        text: "You recovered Kovac's diary and laid Prototype Zero to rest!",
        ending: { type: "true", title: "Guardian of the First Lab", xp: 340, gold: 295, trophy: "Kovac's Brass Master Key" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. REBUILDING A GOOD MAN (6 PAGES • LV 9)
  // ==========================================================
  bk_b12_zob_rebuilding_man: {
    id: "bk_b12_zob_rebuilding_man",
    title: "Rebuilding a Good Man",
    subtitle: "Midnight Race • Black Lotus to Hommal's Rooftop",
    difficulty: "Deadly",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Steward Michul at the Docks (Rusty Flagon Tavern)",
    summary: "Race against dawn to transfer dying philanthropist Heet Nul's soul into a gearforged body—ambushing foreign thieves at the Black Lotus, grabbing gearsmith Shean Dulak from the Silk Scabbard, and raiding Hommal's botanical rooftop!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Lower City • The Black Lotus",
        title: "One Night Left to Live",
        safeRetreat: true,
        text: "Steward Michul swears his kind-hearted master Heet Nul will die before sunrise—unless you intercept a stolen gearforged chassis at the Black Lotus, kidnap drunken gearsmith Shean Dulak from the Silk Scabbard, and snag rare alchemical oils from Hommal's upscale rooftop gala!",
        choices: [
          { t: "Strike a quiet accord with the Painted Man's guards at the Black Lotus to ambush the foreign chassis-thieves cleanly!", badge: "Persuasion DC 15", check: { stat: "spirit", skill: "Persuasion", dc: 15, pass: 2, fail: 2, passMsg: "The Painted Man looks the other way while you seize the incomplete chassis without extra bloodshed!", failMsg: "The thieves spot you at the doorway and scatter smoke bombs!" }, onPass: { cw: "PAINTED_MAN_PASS" } },
          { t: "Kick in the Black Lotus side door and snatch the gearforged body by force!", to: 2 }
        ]
      },
      2: {
        zone: "The Silk Scabbard • Street Chase",
        title: "Remmee's Bully Boys",
        text: "With drunken genius Shean Dulak slung over your shoulder, greedy grandson Remmee's hired killers box you in—determined to inherit Heet Nul's fortune by sunrise!",
        enemy: { name: "Remmee's Hired Killers", desc: "Well-paid urban mercenaries sent to ensure Heet Nul dies tonight.", hp: 74, ac: 16, atk: 9, dmg: 11, xp: 300, gold: 175, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["PAINTED_MAN_PASS"] },
        choices: [
          { t: "Crash Hommal's moonlit botanical rooftop gala for the final soul-binding oils!", to: 3 }
        ]
      },
      3: {
        zone: "Hommal's Botanical Rooftop",
        title: "Guardian of the Glass Conservatory",
        text: "Exotic carnivorous vines whip from crystal planters as Hommal's arcane conservatory guardian and Remmee's elite enforcer lunge to block your escape with the golden oils!",
        enemy: { name: "Conservatory Warden & Vine Horrors", desc: "Enchanted rooftop guardian and venomous botanical beasts.", hp: 86, ac: 16, atk: 10, dmg: 12, xp: 385, gold: 240, items: ["bq_hommal_botanical_vial"], weakCw: ["PAINTED_MAN_PASS"] },
        choices: [
          { t: "Sprint back to the Nul docks office before dawn breaks!", to: 4 }
        ]
      },
      4: {
        zone: "Nul Company Office • Sunrise",
        title: "A Soul Reborn in Brass",
        text: "With seconds to spare, Shean Dulak seals the soul-gem! The gearforged eyes flare warm amber as Heet Nul draws his first metallic breath and thanks you with a booming laugh.",
        onEnter: { healHp: 16, msg: "Heet Nul's grateful household tends every wound (+16 HP)!" },
        choices: [
          { t: "Claim your lavish reward as the sun rises over the docks.", to: 5 }
        ]
      },
      5: {
        zone: "Free City Docks",
        title: "A Good Man Lives On",
        text: "Remmee's inheritance scheme lies in ruins as the reborn Heet Nul resumes his charities.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Savior of Heet Nul",
        text: "You beat the sunrise and gave a good man a second life in brass and steel!",
        ending: { type: "true", title: "Architect of a Second Life", xp: 430, gold: 380, trophy: "Heet Nul's Brass Pocketwatch" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. RIPPER (6 PAGES • LV 10)
  // ==========================================================
  bk_b12_zob_ripper: {
    id: "bk_b12_zob_ripper",
    title: "Ripper",
    subtitle: "Blood on the River • The Silk Scabbard Stalker",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Terrified River Watchman (Rusty Flagon Tavern)",
    summary: "Hunt a fiendish serial killer stalking the Free City's riverfront, trace every victim's link to the Silk Scabbard, and confront the infernal devil Xazagra before proprietor Tyron becomes the final sacrifice!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Citadel District • Crime Scene",
        title: "The Red Trail",
        safeRetreat: true,
        text: "Panic grips the riverfront—a gladiator, a courtesan, and a Collegium apprentice have all been brutally slain! Divinations point to a single chilling connection: every victim frequented the Silk Scabbard, and its owner Tyron is marked to die tonight!",
        choices: [
          { t: "Trace the brimstone residue on the apprentice's cloak to expose Xazagra's river-cult hideout!", badge: "Investigation DC 16", check: { stat: "arcana", skill: "Investigation", dc: 16, pass: 2, fail: 2, passMsg: "Infernal ash leads you straight to the cultists' ambush positions inside the Scabbard!", failMsg: "The killer's mocking sigil flares red as cult blades strike from the crowd!" }, onPass: { cw: "INFERNAL_TRACE" } },
          { t: "Sprint straight to the Silk Scabbard to guard Tyron before midnight!", to: 2 }
        ]
      },
      2: {
        zone: "The Silk Scabbard • Bloodstained Hall",
        title: "Xazagra's Infernal Cultists",
        text: "Shrieks echo through the velvet-draped hall as red-robed river cultists bar the doors, chanting to summon their master's slaughter-blessing!",
        enemy: { name: "Infernal River Cultists", desc: "Fanatical killers serving the devil Xazagra.", hp: 82, ac: 16, atk: 10, dmg: 12, xp: 340, gold: 200, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["INFERNAL_TRACE"] },
        choices: [
          { t: "Burst into Tyron's upstairs gallery where the possessed Ripper raises his hell-forged blade!", to: 3 }
        ]
      },
      3: {
        zone: "Silk Scabbard • Upper Gallery",
        title: "Xazagra the Ripper",
        text: "A hollow-eyed river captain splits open in a burst of sulfurous flame as the terrible devil Xazagra manifests in full infernal glory—claws dripping crimson hellfire!",
        enemy: { name: "Xazagra, The Infernal Ripper", desc: "Sadistic devil possessing a river captain to bathe the city in blood.", hp: 96, ac: 17, atk: 11, dmg: 13, xp: 450, gold: 280, items: ["bq_xazagra_hell_blade"], weakCw: ["INFERNAL_TRACE"] },
        choices: [
          { t: "Banish Xazagra back to the Nine Hells and pull Tyron to safety!", to: 4 }
        ]
      },
      4: {
        zone: "Riverfront Quay • Dawn",
        title: "The Nightmare Ends",
        text: "With a final shriek, Xazagra's smoking carcass dissolves into brimstone ash. Tyron and the riverfolk weep with relief as the streets fall safe once more.",
        onEnter: { healHp: 18, msg: "Tyron's grateful healers tend your burns and cuts (+18 HP)!" },
        choices: [
          { t: "Claim the city's bounty on the Ripper.", to: 5 }
        ]
      },
      5: {
        zone: "Citadel Square",
        title: "Peace Along the River",
        text: "Bells ring out across the river wards—the Ripper's reign of terror is over.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Banisher of the Ripper",
        text: "You unmasked the Silk Scabbard murders and cast the devil Xazagra back to Hell!",
        ending: { type: "true", title: "Hunter of the Infernal Ripper", xp: 485, gold: 430, trophy: "Xazagra's Charred Horn" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. FLESH FAILS (6 PAGES • LV 11)
  // ==========================================================
  bk_b12_zob_flesh_fails: {
    id: "bk_b12_zob_flesh_fails",
    title: "Flesh Fails",
    subtitle: "Lord Streck's Gala & Konrad's Undead Plot",
    difficulty: "Deadly",
    recommendedLevel: 11,
    autoDiscover: false,
    discoverySource: "Steward Hadlen (Rusty Flagon Tavern)",
    summary: "Impersonate vanished nobleman Lord Streck at a high-stakes political gala for his steward Hadlen, uncover Konrad's grotesque necromantic obsession with Linnea, and crush an undead army before it swallows the city!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Streck Estate • Grand Ballroom",
        title: "Playing the Missing Lord",
        safeRetreat: true,
        text: "Lord Streck has vanished two days before a politically vital gala! His frantic steward Hadlen promises a king's ransom if you pose as the gruff nobleman long enough to smoke out his kidnapper—and discover who murdered his beloved Linnea!",
        choices: [
          { t: "Hold court flawlessly in disguise to trick rival noble Konrad into revealing his hidden crypt!", badge: "Deception DC 16", check: { stat: "spirit", skill: "Deception", dc: 16, pass: 2, fail: 2, passMsg: "Konrad slips up over spiced wine, exposing the cellar vault where Streck is chained!", failMsg: "Konrad sees through the disguise and signals his undead footmen!" }, onPass: { cw: "GALA_RUSE" } },
          { t: "Follow Konrad's cold trail straight down into the manor's forbidden sub-cellars!", to: 2 }
        ]
      },
      2: {
        zone: "Streck Sub-Cellars • Charnel Gallery",
        title: "Konrad's Undead Vanguard",
        text: "Beneath the music of the ballroom, armored wights and stitched flesh-golems march in silent ranks—the vanguard of Konrad's secret army meant to conquer the city!",
        enemy: { name: "Konrad's Wights & Flesh Golem", desc: "Necromantic honor guard protecting the secret charnel lab.", hp: 90, ac: 17, atk: 11, dmg: 13, xp: 380, gold: 230, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["GALA_RUSE"] },
        choices: [
          { t: "Kick open the iron sanctum door to confront Konrad and free Lord Streck!", to: 3 }
        ]
      },
      3: {
        zone: "Necromantic Sanctum • Linnea's Bier",
        title: "Konrad the Necromancer",
        text: "Beside a pale crystal sarcophagus holding the preserved spirit of Linnea, mad necromancer Konrad raises a staff of black bone! 'Flesh fails, Streck—only undeath is eternal!'",
        enemy: { name: "Konrad, Lord of Failing Flesh", desc: "Obsessed noble necromancer commanding an army of the dead.", hp: 108, ac: 17, atk: 12, dmg: 14, xp: 510, gold: 320, items: ["bq_konrad_soul_signet"], weakCw: ["GALA_RUSE"] },
        choices: [
          { t: "Shatter Konrad's bone staff, grant Linnea peaceful rest, and free Lord Streck!", to: 4 }
        ]
      },
      4: {
        zone: "Streck Estate • Quiet Courtyard",
        title: "The City Spared",
        text: "As Konrad falls, the silent undead ranks below crumble to harmless dust. Freed and humbled, Lord Streck honors Hadlen's pledge with royal favor and a chest of noble gold.",
        onEnter: { healHp: 20, msg: "Streck's private clerics restore your vigor (+20 HP)!" },
        choices: [
          { t: "Depart the estate before the morning gossip spreads.", to: 5 }
        ]
      },
      5: {
        zone: "Noble Quarter",
        title: "Crisis Averted",
        text: "The Free City wakes in peace, never knowing how close an undead army stood beneath its finest ballroom.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Shatterer of the Charnel Plot",
        text: "You rescued Lord Streck, laid Linnea to rest, and crushed Konrad's undead conquest!",
        ending: { type: "true", title: "Breaker of the Charnel Gala", xp: 545, gold: 490, trophy: "Lord Streck's Ruby Seal" },
        choices: []
      }
    }
  }
});
