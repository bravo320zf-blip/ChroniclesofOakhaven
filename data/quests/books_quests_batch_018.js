/* ============================================================
   BOOK QUESTS — BATCH 018 (11 Quests • All autoDiscover: false)
   Purely in-world subtitles & Inn rumor pool discovery.
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. REDOUBT OF THE PERFIDIOUS GURU (10 PAGES • LV 5)
  // ==========================================================
  bk_b18_tob3_perfidious_guru: {
    id: "bk_b18_tob3_perfidious_guru",
    title: "Redoubt of the Perfidious Guru",
    subtitle: "Mountain Sanctuary & The Infernal Tutor",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Disillusioned Mountain Acolyte (Rusty Flagon Tavern)",
    summary: "Ascend to a secretive alpine sanctuary promising inner peace and soul-divination—uncovering the fiendish machinations of its elusive Lesser Infernal Tutor past Alpine Creepers and Cloudhoof Assassins!",
    totalPages: 10,
    pages: {
      1: {
        zone: "High Peaks • Sanctuary Trail",
        title: "False Enlightenment",
        safeRetreat: true,
        text: "Pilgrims climb the cloud-wrapped switchbacks seeking a celebrated guru said to read every visitor's soul—yet those who descend wear vacant smiles and hollow eyes. Sweet juniper incense drifts from copper censers along the cliff path, masking a faint tang of brimstone while pale Alpine Creepers cling to the icicles overhead.",
        choices: [
          { t: "Inspect the copper censers and spot the camouflaged Alpine Creepers along the cliff!", badge: "Spirit / Perception DC 13", check: { stat: "spirit", skill: "Perception", dc: 13, pass: 2, fail: 3, failDmg: 5, passMsg: "You unmask the soothing incense as a devilish charm and spot a back stair!", failMsg: "Claws rake from the frost (-5 HP) as Cloudhoof Assassins drop onto the terrace!" }, onPass: { cw: "INCENSE_EXPOSED" } },
          { t: "Scale the sheer prayer-flag cliff to reach the sanctuary's rear cloister unseen!", badge: "Might / Athletics DC 13", check: { stat: "might", skill: "Athletics", dc: 13, pass: 4, fail: 3, failDmg: 6, passMsg: "You haul yourself over the snow-drifted parapet behind the guards!", failMsg: "Rime-slick slate gives way (-6 HP), tumbling you straight onto the main terrace!" }, onPass: { cw: "CLIFF_FLANK", xp: 25 } },
          { t: "March boldly up the carved stone steps to confront the sanctuary's guards!", to: 3 }
        ]
      },
      2: {
        zone: "Sanctuary Trail • Brimstone Censer",
        title: "The Honeyed Glamour",
        text: "Snuffing a brass censer in the snow, you scrape out a lump of crimson resin stamped with an infernal seal—a mind-clouding charm meant to dull pilgrims' wills before they ever reach the Meditation Hall. Tying a damp scarf over your mouth, you spot both the front prayer-terrace and a narrow servant's stair leading toward the novices' cloister.",
        onEnter: { xp: 20, msg: "Unmasked the fiendish incense (+20 XP)!" },
        choices: [
          { t: "Slip quietly up the servant's stair toward the Dormitory Cloister.", to: 4 },
          { t: "Advance onto the Terrace of Clouds to clear out the outer guards.", to: 3 }
        ]
      },
      3: {
        zone: "Mountain Redoubt • Terrace of Clouds",
        title: "Cloudhoof Assassins & Alpine Creepers",
        text: "Prayer flags snap in the freezing gale as silent, sure-footed Cloudhoof Assassins drop from the eaves alongside frost-scaled Alpine Creepers, steel gleaming to silence nosy outsiders!",
        enemy: { name: "Cloudhoof Assassins & Alpine Creepers", desc: "Swift alpine killers guarding the deceptive mountain sanctuary.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 155, gold: 85, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["INCENSE_EXPOSED"] },
        choices: [
          { t: "Investigate the quiet Dormitory Cloister beside the terrace before facing the Guru.", to: 4 },
          { t: "Kick open the gilded doors straight into the Meditation Hall!", to: 7 }
        ]
      },
      4: {
        zone: "Dormitory Cloister • Novice's Cell",
        title: "Acolyte Tenzin's Ledger",
        text: "Behind a sliding cedar screen kneels Acolyte Tenzin, a young novice who stopped breathing the sanctuary's sweet smoke just in time. He clutches a leather Soul-Ledger listing twelve entranced pilgrims—and points toward a crawlspace running beneath the Meditation Hall's grand soul-mirror.",
        choices: [
          { t: "Reassure Tenzin and ask how to weaken the Guru's soul-mirror before the duel.", badge: "Spirit / Persuasion DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 5, fail: 7, passMsg: "Tenzin trusts you—handing you 35 GP, warm tea (+8 HP, +4 MP), and the latch to the mirror crawlspace!", failMsg: "Footsteps echo down the hall; Tenzin bolts for cover, leaving you to face the Guru directly!" }, onPass: { cw: "TENZIN_TRUST", xp: 25, gold: 35, hp: 8, mp: 4 } },
          { t: "Study the infernal binding-glyphs scribbled in the margins of Tenzin's ledger.", badge: "Arcana / Arcana DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 5, fail: 7, passMsg: "You trace the mirror's resonance-seam straight to the crawlspace beneath the dais!", failMsg: "The cramped infernal script blurs before footsteps force you toward the Meditation Hall." }, onPass: { cw: "MIRROR_FLAW", xp: 25 } },
          { t: "Tell Tenzin to stay hidden and stride straight to the Meditation Hall doors.", to: 7 }
        ]
      },
      5: {
        zone: "Sub-Floor Gallery • The Silvered Backing",
        title: "Cracking the Soul-Mirror",
        text: "Crawling beneath the cedar floorbeams, you reach the tarnished silver backing of the Guru's grand soul-mirror. Pulsing veins of crimson sulfur snake through brass pins bolted into the frame, feeding his serene mortal disguise above!",
        choices: [
          { t: "Pry loose the brass sulfur-focusing pins without tripping the fiendish ward!", badge: "Agility / Detect Traps DC 13", check: { stat: "agility", skill: "Detect Traps", dc: 13, pass: 6, fail: 7, failDmg: 6, passMsg: "You slip the brass pins free and pocket 45 GP in pure silver mirror-filigree!", failMsg: "Brimstone sparks sear your palm (-6 HP), alerting the Guru overhead!" }, onPass: { cw: "MIRROR_CRACKED", gold: 45, xp: 30 } },
          { t: "Scorch the sulfur-veined mirror backing with a quick burst of Firebolt!", reqSpell: "Firebolt", to: 6 },
          { t: "Leave the warded frame alone and slip up to the Meditation Hall doors.", to: 7 }
        ]
      },
      6: {
        zone: "Meditation Hall • Cracked Reflection",
        title: "Glamour Unraveled",
        text: "A hairline fracture spiderwebs across the great soul-mirror above as acrid smoke hisses from the seam! The Guru's serene illusion flickers violently—stripping away his fiendish ward before the clash even begins.",
        onEnter: { cw: "MIRROR_CRACKED", xp: 25, msg: "Soul-Mirror cracked (MIRROR_CRACKED, +25 XP)!" },
        choices: [
          { t: "Throw open the gilded doors and unmask the Perfidious Guru!", to: 7 }
        ]
      },
      7: {
        zone: "Meditation Hall • Soul-Mirror",
        title: "The Perfidious Guru",
        text: "Shedding his serene mortal illusion in a burst of sulfur, the Lesser Infernal Tutor unfolds barbed wings beside the towering soul-trapping mirror: 'Your devotion is mine—sign in ash!'",
        enemy: { name: "Lesser Infernal Tutor", desc: "Fiendish deceiver harvesting seekers' souls atop the mountain.", hp: 58, ac: 15, atk: 7, dmg: 8, xp: 215, gold: 145, items: ["bq_guru_prayer_beads"], weakCw: ["INCENSE_EXPOSED", "MIRROR_CRACKED", "CLIFF_FLANK"] },
        choices: [
          { t: "Shatter the soul-mirror completely and free the entranced pilgrims!", to: 8 }
        ]
      },
      8: {
        zone: "Sanctuary Courtyard • Clear Sky",
        title: "Awakened Seekers",
        text: "Silver shards rain across the flagstones as twelve dazed pilgrims blink awake in the crisp alpine air. Freed from the fiend's honeyed glamour, they gather around the spring-fed basin, pouring steaming mountain tea and pooling their rescued travel silver.",
        onEnter: { healHp: 12, msg: "Pure mountain springwater restores your vigor (+12 HP)!" },
        choices: [
          { t: "Meet Acolyte Tenzin by the bell-arch before leading the pilgrims down.", reqCw: "TENZIN_TRUST", to: 9 },
          { t: "Lead the awakened pilgrims safely down the snowy pass toward Oakhaven.", to: 10 }
        ]
      },
      9: {
        zone: "Sanctuary Courtyard • Tenzin's Gratitude",
        title: "True Enlightenment",
        text: "Acolyte Tenzin bows deeply beneath the prayer-bell, pressing a velvet pouch of hidden temple silver and a crisp vial of alpine tonic into your pack. 'You saved more than our lives today—you gave us back our own minds.'",
        onEnter: { gold: 50, xp: 35, mp: 5, msg: "Acolyte Tenzin's gratitude grants +50 GP, +35 XP, and +5 MP!" },
        choices: [
          { t: "Escort the pilgrims down the sunlit switchbacks toward Oakhaven.", to: 10 }
        ]
      },
      10: {
        zone: "Alpine Switchbacks • Epilogue",
        title: "Unmasker of the Perfidious Guru",
        text: "Behind you, the false guru's redoubt stands quiet beneath clean snow as mountain wind scatters the last trace of brimstone. Back at the Rusty Flagon, the disillusioned acolyte raises a mug in your honor as word spreads of the fiend you cast from the high peaks.",
        ending: { type: "true", title: "Breaker of the False Redoubt", xp: 250, gold: 240, trophy: "Shattered Soul-Mirror Shard" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. INCIDENT AT WRACKWATER (6 PAGES • LV 6)
  // ==========================================================
  bk_b18_tob3_wrackwater: {
    id: "bk_b18_tob3_wrackwater",
    title: "Incident at Wrackwater",
    subtitle: "Fog-Bound Harbor & The Dark Lighthouse",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Wrackwater Harbor Master (Rusty Flagon Tavern)",
    summary: "Brave the fog-bound spit of Wrackwater Cove to find two missing search parties and relight the dark harbor lighthouse before the supply ship wrecks—battling Bilge Gremlins, Gullkin Hunters, and a fierce Muraenid!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Wrackwater Spit • Foggy Causeway",
        title: "A Darkened Beacon",
        safeRetreat: true,
        text: "Thick sea-fog blankets Wrackwater Cove—the harbor lighthouse has gone dark, two village patrols have vanished, and a vital supply ship is due before dawn! Screeching Gullkin circle the dark lantern-tower.",
        choices: [
          { t: "Use the harbor master's storm-whistle to spot the Bilge Gremlins sabotaging the breakwater!", badge: "Perception DC 14", check: { stat: "spirit", skill: "Perception", dc: 14, pass: 2, fail: 2, passMsg: "You catch the sabotaging gremlins mid-scheme and free a trapped scout!", failMsg: "Swooping Gullkin Hunters dive through the fog with barbed harpoons!" }, onPass: { cw: "FOG_SCOUT" } },
          { t: "Sprint down the wave-lashed stone causeway straight to the lighthouse door!", to: 2 }
        ]
      },
      2: {
        zone: "Lighthouse Base • Flooded Cellar",
        title: "Bilge Gremlins & Gullkin Hunters",
        text: "Cackling Bilge Gremlins led by a bosun swarm up from the tide-pool cellar while Gullkin Hunters strike from the broken shutters!",
        enemy: { name: "Bilge Gremlin Bosun & Gullkin", desc: "Sabotaging sea-fey and feathered coastal raiders.", hp: 54, ac: 15, atk: 7, dmg: 8, xp: 190, gold: 110, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["FOG_SCOUT"] },
        choices: [
          { t: "Climb the spiraling iron stair to the dark lantern-room!", to: 3 }
        ]
      },
      3: {
        zone: "Lighthouse Peak • Lantern Room",
        title: "The Eel-Muraenid",
        text: "Coiled around the unlit oil-mirror, a monstrous, snapping Muraenid sea-horror lunges through the shattered glass to keep Wrackwater's beacon dark!",
        enemy: { name: "Wrackwater Muraenid", desc: "Ferocious amphibious eel-beast commanding the lighthouse ambush.", hp: 68, ac: 15, atk: 8, dmg: 9, xp: 265, gold: 175, items: ["bq_wrackwater_beacon_lens"], weakCw: ["FOG_SCOUT"] },
        choices: [
          { t: "Ignite the great lighthouse mirror and guide the supply ship safely into harbor!", to: 4 }
        ]
      },
      4: {
        zone: "Wrackwater Quay • Dawn",
        title: "Safe Harbor",
        text: "A brilliant golden beam sweeps across the waves! The supply vessel docks intact, the trapped patrols are freed, and the village cheers your name.",
        onEnter: { healHp: 14, msg: "Hot spiced rum and harbor rations restore your strength (+14 HP)!" },
        choices: [
          { t: "Accept Wrackwater's grateful bounty.", to: 5 }
        ]
      },
      5: {
        zone: "Harbor Road",
        title: "The Light Burns True",
        text: "The steady golden beam turns faithfully over the cove.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Keeper of Wrackwater Light",
        text: "You cleared the lighthouse, saved the patrols, and brought the supply ship safely home!",
        ending: { type: "true", title: "Savior of Wrackwater Cove", xp: 295, gold: 275, trophy: "Brass Lighthouse Key" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. THE LOST FORGE (10 PAGES • LV 6)
  // ==========================================================
  bk_b18_tob3_lost_forge: {
    id: "bk_b18_tob3_lost_forge",
    title: "The Lost Forge",
    subtitle: "Ruined Dwarven Fort & The Twin Thursir Giants",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Dwarf Pike Guard Captain (Rusty Flagon Tavern)",
    summary: "Reclaim a dragon-scarred mountain dwarven fort whose ancient forge has blazed back to life under twin Thursir Giants and their Ogre Alleybashers raiding ore-and-ale caravans!",
    totalPages: 10,
    pages: {
      1: {
        zone: "Mountain Fort • Dragon-Scarred Gate",
        title: "Smoke Over the Dormant Anvil",
        safeRetreat: true,
        text: [
          "Black coal-smoke curls above the timberline from basalt chimneys that stood cold for forty winters. Far below the dragon-clawed battlements, deep hammer-blows vibrate through the frost-rimmed scree as sparks drift across the snow.",
          "<strong>Captain Thorek Ironpike</strong> spits into the slush and grips his rune-etched halberd. \"Twin Thursir Giants—an Armorer and a Hearth Priestess—have relit our ancestors' forge, and their ogre thugs are looting every ore-and-ale caravan on the pass. Give the word, friend, and we take it back.\""
        ],
        choices: [
          { t: "Slip with two dwarven scouts through the frozen ventilation aqueduct to flank the courtyard!", badge: "Athletics / Might DC 14", check: { stat: "might", skill: "Athletics", dc: 14, pass: 2, fail: 2, passMsg: "You breach the upper foundry walkway unseen, dropping straight behind the ogres!", failMsg: "Ringing hammers stop dead as Ogre Alleybashers roar and charge the main gate!" }, onPass: { cw: "FOUNDRY_FLANK" } },
          { t: "Scale the dragon-cracked watchtower to reach the upper bellows gallery and sabotage their furnace.", badge: "Stealth / Agility DC 14", check: { stat: "agility", skill: "Stealth", dc: 14, pass: 7, fail: 2, passMsg: "You slip silently over the soot-black parapet into the roaring bellows gallery!", failMsg: "Loose masonry clatters down the wall—ogre lookouts bellow an alarm!" } },
          { t: "March straight up the stone switchback alongside Captain Thorek's pike-wall!", to: 2 }
        ]
      },
      2: {
        zone: "Dwarven Fort • Bellows Courtyard",
        title: "Ogre Alleybashers",
        text: [
          "Broken dwarven ale-kegs bleed dark stout across the steaming cobblestones while molten slag gutters hiss beside the inner foundry gates.",
          "With a booming laugh, brutal <strong>Ogre Alleybashers</strong> hoist iron crowbars and banded casks, smashing straight through the courtyard barricades!"
        ],
        enemy: { name: "Ogre Alleybashers", desc: "Hulking street-brawling ogres serving the Thursir twins.", hp: 54, ac: 14, atk: 7, dmg: 8, xp: 190, gold: 110, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["FOUNDRY_FLANK", "FURNACE_CHOKED"] },
        choices: [
          { t: "Inspect the soot-stained Clan Vault off the courtyard before the giants bar the Great Hall.", to: 8 },
          { t: "Storm straight into the blazing Great Anvil Hall where the Twin Thursir Giants forge runic iron!", to: 3 }
        ]
      },
      3: {
        zone: "Lost Forge • Great Anvil Hall",
        title: "Twin Thursir Giants",
        text: [
          "Heat hits like a hammer as you burst beneath the vaulted granite arches of the Great Anvil Hall. White-hot embers rain like falling stars from a colossal central crucible.",
          "Towering beside the sacred anvil, the frost-bearded <strong>Thursir Armorer Giant</strong> and flame-crowned <strong>Thursir Hearth Priestess</strong> lift glowing runic hammers: <em>\"This mountain iron belongs to the Thursir now!\"</em>"
        ],
        enemy: { name: "Twin Thursir Forge-Giants", desc: "Runic frost-giant armorer and flame-channeling hearth priestess.", hp: 68, ac: 15, atk: 8, dmg: 9, xp: 265, gold: 180, items: ["bq_lost_forge_tongs"], flee: 2, weakCw: ["FOUNDRY_FLANK", "FURNACE_CHOKED"] },
        choices: [
          { t: "Search behind the Hearth Priestess's basalt heat-shields for the stolen caravan strongboxes!", badge: "Perception / Luck DC 13", check: { stat: "luck", skill: "Perception", dc: 13, pass: 9, fail: 4, passMsg: "Behind the iron screens sit three intact dwarven caravan chests!", failMsg: "The crucible groans violently—no time to search before it blows!" } },
          { t: "Rush to stabilize the runaway runic crucible before it cracks the Great Anvil!", to: 4 }
        ]
      },
      4: {
        zone: "Great Anvil Hall • Molten Hearth",
        title: "Quenching the Runic Crucible",
        text: [
          "With the Hearth Priestess fallen, the unfinished runic ingot boiling inside the central crucible flares blinding white! Cracks spiderweb across the hearth-stone—if the molten charge detonates, the dwarves' sacred Great Anvil will be ruined forever."
        ],
        choices: [
          { t: "Heave the rusted iron floodgate lever to douse the crucible in glacial snowmelt!", badge: "Athletics / Might DC 13", check: { stat: "might", skill: "Athletics", dc: 13, pass: 5, fail: 5, failDmg: 5, passMsg: "Steam roars up the flue as snowmelt quenches the forge cleanly (+35 XP)!", failMsg: "Scalding steam blisters your arms (-5 HP) before the heavy gate slams open!" }, onPass: { xp: 35 } },
          { t: "Trace a cooling ward over the crucible's runes to vent the excess fire up the chimney.", badge: "Arcana / Spirit DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 5, fail: 5, failDmg: 4, passMsg: "The runes sigh and dim to a calm amber glow (+35 XP, +4 MP)!", failMsg: "A spark leaps across your sleeve (-4 HP) as the molten charge finally settles!" }, onPass: { xp: 35, healMp: 4 } },
          { t: "Duck behind Captain Thorek's tower-shields and let the crucible burn itself out.", to: 5 }
        ]
      },
      5: {
        zone: "Great Anvil Hall • Victory Ale",
        title: "Caravans Safe",
        text: [
          "Cheers echo through the vaulted stonework as dwarven pike-guards tap an unbroken barrel of highland stout. Captain Thorek Ironpike raises a foaming iron tankard in your honor and slides a hefty clan silver chest across the cooled anvil.",
          "\"You fought like granite, friend! The ore-road is ours again, and our hammers will sing your name across the peaks.\""
        ],
        onEnter: { healHp: 14, msg: "Stout dwarven ale and warm hearth-rest mend your bruises (+14 HP)!" },
        choices: [
          { t: "Present the recovered Ancestral Hammer-Seal so the clans can reconsecrate the Lost Forge!", reqCw: "ANCESTRAL_SEAL", badge: "Clan Relic Bonus", to: 10 },
          { t: "Ask Captain Thorek for a champion's share of the newly tempered runic iron.", badge: "Persuasion / Spirit DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 10, fail: 6, passMsg: "Thorek booms with laughter and adds fifty gold sovereigns to your chest!", failMsg: "Thorek grins under his braided beard: 'Fair ask, hero, though the clan needs every ingot to rebuild.'" }, onPass: { gold: 50 } },
          { t: "Clink tankards with the pike-guard and descend the high ore-road back toward Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Liberator of the Lost Forge",
        text: "As you descend the winding mountain pass, honest dwarven hammers ring cleanly across the valley once more. Back in Oakhaven, caravan masters toast the adventurer who toppled the Twin Thursir Giants and reclaimed the Lost Forge.",
        ending: { type: "true", title: "Reclaimer of the Lost Forge", xp: 295, gold: 280, trophy: "Dwarven Master-Anvil Token" },
        choices: []
      },
      7: {
        zone: "Lost Forge • Upper Bellows Gallery",
        title: "Sabotaging the Giant Furnace",
        text: [
          "From the soot-blackened iron catwalk, you look straight down onto colossal leather bellows pumping white-hot air into the Great Anvil Hall. Brass pressure-valves hiss beside a rack of runic quenching-oils."
        ],
        choices: [
          { t: "Wedge the brass pressure-valves shut to choke the Hearth Priestess's furnace and pocket refined Iron Ore!", badge: "Lockpicking / Agility DC 13", check: { stat: "agility", skill: "Lockpicking", dc: 13, pass: 2, fail: 2, passMsg: "HISS! Superheated steam blasts across the foundry floor—the giants' forge-wards falter (+45 GP, Iron Ore)!", failMsg: "The stubborn valve jams halfway, though you still drop cleanly onto the courtyard flank!" }, onPass: { cw: "FURNACE_CHOKED", gold: 45, items: ["iron_ore"] }, onChoose: { cw: "FOUNDRY_FLANK" } },
          { t: "Snatch a corked Greater Health Potion from the side rack and drop quietly onto the courtyard flank.", onChoose: { cw: "FOUNDRY_FLANK", items: ["greater_potion"], msg: "Secured a Greater Health Potion and flanked the courtyard!" }, to: 2 }
        ]
      },
      8: {
        zone: "Lost Forge • Ancestral Clan Vault",
        title: "The Soot-Stained Reliquary",
        text: [
          "Dragon-claw furrows scar the granite lintel of the old Clan Vault, yet its amber dwarven wards still hum faintly. Inside a recessed stone alcove gleams the clan's ceremonial <strong>Ancestral Hammer-Seal</strong> beside a tray of uncut Runed Shards."
        ],
        choices: [
          { t: "Unweave the dwarven fire-wards to claim the Ancestral Hammer-Seal and Runed Shards.", badge: "Arcana DC 14", check: { stat: "arcana", skill: "Arcana", dc: 14, pass: 3, fail: 3, failDmg: 5, passMsg: "The amber sigils part smoothly—you claim the Ancestral Hammer-Seal, Runed Shards, and +55 GP!", failMsg: "A flame-glyph singes your gauntlet (-5 HP), forcing you back into the hall!" }, onPass: { cw: "ANCESTRAL_SEAL", items: ["runed_shards"], gold: 55 } },
          { t: "Inspect the flagstones for pressure-triggers and lift the Ancestral Hammer-Seal cleanly.", badge: "Detect Traps / Luck DC 14", check: { stat: "luck", skill: "Detect Traps", dc: 14, pass: 3, fail: 3, failDmg: 4, passMsg: "You wedge the hidden trigger-stone and recover the Ancestral Hammer-Seal, Iron Ore, and +45 GP!", failMsg: "A soot-dart grazes your shoulder (-4 HP) as you retreat toward the Great Hall!" }, onPass: { cw: "ANCESTRAL_SEAL", items: ["iron_ore"], gold: 45 } },
          { t: "Leave the ancient clan wards untouched and charge into the Great Anvil Hall.", to: 3 }
        ]
      },
      9: {
        zone: "Lost Forge • Priestess's Alcove",
        title: "The Stolen Caravan Strongboxes",
        text: [
          "Tucked behind the Hearth Priestess's basalt heat-shields sit three iron-banded dwarven trade chests—their locks still intact! Inside glints highland silver alongside a preserved <strong>Mana Elixir</strong>."
        ],
        onEnter: { gold: 65, items: ["mana_elixir"], msg: "Recovered stolen caravan silver (+65 GP) and a Mana Elixir!" },
        choices: [
          { t: "Hurry back to the roaring crucible before it cracks the Great Anvil!", to: 4 }
        ]
      },
      10: {
        zone: "Epilogue",
        title: "Hearth-Friend of the Mountain Clans",
        text: "Captain Thorek kneels in solemn respect as the Ancestral Hammer-Seal is set back into the Great Anvil's plinth. The mountain clans declare you a sworn Hearth-Friend of the Lost Forge, sending you back to Oakhaven with a brimming chest of runic gold and eternal dwarven gratitude.",
        ending: { type: "true", title: "Hearth-Friend of the Lost Forge", xp: 345, gold: 340, trophy: "Dwarven Master-Anvil Token" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. THE MONSTROUS MACHINATIONS OF MARGRAVE MILLARD (6 PAGES • LV 7)
  // ==========================================================
  bk_b18_tob3_margrave_millard: {
    id: "bk_b18_tob3_margrave_millard",
    title: "The Monstrous Machinations of Margrave Millard",
    subtitle: "The Eccentric Menagerie & Hybrid Beasts",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Escaped Estate Keeper (Rusty Flagon Tavern)",
    summary: "Infiltrate eccentric Margrave Millard's secluded menagerie—where he has escalated from harmless show-pets to testing lethal Dire Owlbears, Razorfeather Raptors, and a Grolar Bear Alpha on kidnapped citizens!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Millard Estate • Iron Menagerie Gate",
        title: "Show-Pets Gone Monstrous",
        safeRetreat: true,
        text: "Once laughed off as a harmless eccentric breeding odd show-pets, Margrave Millard has crossed a bloody line—kidnapping local townsfolk to test his latest arcane crossbreeds inside a walled hunting arena!",
        choices: [
          { t: "Uncouple the brass feeding-bell above the beast-pens to lure the Razorfeather Raptors into the empty kennel!", badge: "Stealth / Survival DC 14", check: { stat: "agility", skill: "Stealth", dc: 14, pass: 2, fail: 2, passMsg: "Half the hybrid pack bolts after the feeding-bell, clearing your path to the arena!", failMsg: "Shrill screeches echo from the iron cages as chimeric beasts burst loose!" }, onPass: { cw: "KENNEL_LURE" } },
          { t: "Cut the iron padlock on the menagerie courtyard and charge in!", to: 2 }
        ]
      },
      2: {
        zone: "Menagerie Courtyard • Caged Pens",
        title: "Dire Owlbear & Razorfeather Raptors",
        text: "A roaring Dire Owlbear and slashing Razorfeather Raptors leap across the flagstones alongside darting Slithy Toves!",
        enemy: { name: "Dire Owlbear & Razorfeather Raptors", desc: "Arcanely engineered apex predators guarding Millard's estate.", hp: 60, ac: 15, atk: 8, dmg: 9, xp: 235, gold: 140, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["KENNEL_LURE"] },
        choices: [
          { t: "Burst into the Hunting Arena where Margrave Millard unleashes his Grolar Bear Alpha!", to: 3 }
        ]
      },
      3: {
        zone: "Hunting Arena • Margrave's Balcony",
        title: "Margrave Millard & Grolar Bear Alpha",
        text: "Clapping madly from his box, Margrave Millard pulls a lever—releasing his towering, frost-furred Grolar Bear Alpha straight at you and the bound captives!",
        enemy: { name: "Grolar Bear Alpha & Margrave Millard", desc: "Colossal hybrid bear-titan and its deranged aristocratic creator.", hp: 74, ac: 16, atk: 9, dmg: 10, xp: 315, gold: 205, items: ["bq_millard_beast_whistle"], weakCw: ["KENNEL_LURE"] },
        choices: [
          { t: "Subdue the Margrave, unlock the captive cages, and seal the breeding vats!", to: 4 }
        ]
      },
      4: {
        zone: "Estate Gate • Watch Arrival",
        title: "Captives Freed",
        text: "Town watchmen haul the raving Margrave away in chains while freed citizens weep with relief and award you the civic bounty.",
        onEnter: { healHp: 15, msg: "A gentle Capybear nudges a healing satchel to your boots (+15 HP)!" },
        choices: [
          { t: "Leave the quieted menagerie behind.", to: 5 }
        ]
      },
      5: {
        zone: "Country Estate Road",
        title: "Machinations Ended",
        text: "No more monstrous hybrids will prowl the countryside.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Tamer of Millard's Menagerie",
        text: "You defeated the Grolar Bear Alpha, stopped Margrave Millard, and freed every captive!",
        ending: { type: "true", title: "Breaker of the Menagerie", xp: 350, gold: 305, trophy: "Margrave's Silver Whistle" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. THE GREEN SANCTUM (6 PAGES • LV 7)
  // ==========================================================
  bk_b18_tob3_green_sanctum: {
    id: "bk_b18_tob3_green_sanctum",
    title: "The Green Sanctum",
    subtitle: "The Remote Island Arboretum & Ice Willow",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Botanical Academy Scholar (Rusty Flagon Tavern)",
    summary: "Sail to a remote island housing a deceased botanist's overgrown glass arboretum—surviving Alpine Creepers, a freezing Ice Willow, and an implacable Ice Golem to claim a priceless exotic specimen!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Remote Island • Glass Arboretum",
        title: "Overgrown Conservatory",
        safeRetreat: true,
        text: "Since its eccentric botanist passed away, her glass-domed island arboretum has run wild with frost-blooming exotic flora! Rival scholars hire you to retrieve her rarest specimen—if you can survive the conservatory's lethal plants and tireless guardian!",
        choices: [
          { t: "Open the brass steam-vents along the greenhouse floor to thaw the frost-coated walkways!", badge: "Herbalism / Arcana DC 14", check: { stat: "arcana", skill: "Herbalism", dc: 14, pass: 2, fail: 2, passMsg: "Warm steam melts the rime-slick tiles and weakens the Ice Willow's frost aura!", failMsg: "Shattering icicles rain from the glass dome as frozen vines lunge!" }, onPass: { cw: "STEAM_THAW" } },
          { t: "Push open the frosted glass doors and step into the Green Sanctum!", to: 2 }
        ]
      },
      2: {
        zone: "Arboretum • Winter Gallery",
        title: "Ice Willow & Alpine Creepers",
        text: "Whipping frozen tendrils like crystal chains, a towering Ice Willow and predatory Alpine Creepers seal the central conservatory!",
        enemy: { name: "Ice Willow & Alpine Creepers", desc: "Subzero botanical horrors guarding the overgrown island greenhouse.", hp: 60, ac: 15, atk: 8, dmg: 9, xp: 235, gold: 140, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["STEAM_THAW"] },
        choices: [
          { t: "Approach the crystalline specimen-pedestal guarded by the Ice Golem!", to: 3 }
        ]
      },
      3: {
        zone: "Green Sanctum • Specimen Pedestal",
        title: "The Ice Golem Guardian",
        text: "Bound to protect its late mistress's prized botanical treasure, a colossal, translucent Ice Golem steps before the glowing rare plant!",
        enemy: { name: "Arboretum Ice Golem", desc: "Unrelenting glacial construct defending the scholar's rarest bloom.", hp: 74, ac: 16, atk: 9, dmg: 10, xp: 315, gold: 205, items: ["bq_green_sanctum_bloom"], weakCw: ["STEAM_THAW"] },
        choices: [
          { t: "Carefully pot the priceless exotic bloom and sail back to the Academy!", to: 4 }
        ]
      },
      4: {
        zone: "Island Dock • Academy Skiff",
        title: "Specimen Secured",
        text: "The academy scholars gasps in wonder at the unblemished bloom, paying out a handsome scholarly endowment.",
        onEnter: { healHp: 15, msg: "Aromatic nectar from the conservatory restores your vigor (+15 HP)!" },
        choices: [
          { t: "Sail back toward Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Sunlit Harbor",
        title: "Botanical Triumph",
        text: "The rare bloom will yield life-saving tonics for generations.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Delver of the Green Sanctum",
        text: "You braved the frozen conservatory and claimed the priceless exotic plant!",
        ending: { type: "true", title: "Warden of the Green Sanctum", xp: 350, gold: 305, trophy: "Pressed Frost-Lotus Blossom" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. THE SALONS OF MOTHER CELESTE (11 PAGES • LV 8)
  // ==========================================================
  bk_b18_tob3_mother_celeste: {
    id: "bk_b18_tob3_mother_celeste",
    title: "The Salons of Mother Celeste",
    subtitle: "The Sunken Merchant Wreck & Brine Hag",
    difficulty: "Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Coastal Port Authority (Rusty Flagon Tavern)",
    summary: "Dive to the reef-trapped wreck of the merchant galleon Silver Gull—navigating flooded decks, severing a sea-witch's anchor-binding, and battling Dire Lionfish, a Breakwater Troll, a Wrackwraith, and the sinister Brine Hag Mother Celeste!",
    totalPages: 11,
    pages: {
      1: {
        zone: "Reef Shallows • Sunken Hull",
        title: "Beneath the Waves",
        safeRetreat: true,
        text: "Cold emerald currents sweep around the broken ribs of the merchant galleon Silver Gull, wedged deep in a razor-coral reef. Through its cracked stern-windows flicker eerie jade sea-witch lanterns, illuminating drifting silk banners and the silhouettes of patrolling reef-predators. With water-breathing charms fizzing warm at your throat, you survey three approaches into the flooded wreck.",
        choices: [
          { t: "Glide silently through the breached stern-window to flank the reef-guardians!", badge: "Stealth / Agility DC 15", check: { stat: "agility", skill: "Stealth", dc: 15, pass: 2, fail: 2, passMsg: "You slip cleanly through the kelp-draped window, catching the deck-guardians off guard!", failMsg: "Spiny Dire Lionfish and a roaring Breakwater Troll spot your bubbles and lunge!" }, onPass: { cw: "STERN_DIVE", xp: 35 } },
          { t: "Scout the shattered bowsprit and kelp-draped figurehead first.", to: 7 },
          { t: "Descend straight through the splintered main deck hatch!", to: 2 }
        ]
      },
      2: {
        zone: "Sunken Ship • Flooded Cargo Deck",
        title: "Breakwater Troll & Dire Lionfish",
        text: "Shattered spice-casks and drifting velvet drift across the murky cargo deck. Out of the coral-crusted bilge surges a barnacle-armored Breakwater Troll, its jagged claws sweeping through the water beside darting venomous Dire Lionfish!",
        enemy: { name: "Breakwater Troll & Dire Lionfish", desc: "Regenerating sea-troll and venomous reef predators nesting in the wreck.", hp: 66, ac: 15, atk: 8, dmg: 10, xp: 265, gold: 155, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["STERN_DIVE"] },
        choices: [
          { t: "Swim into the Flooded Purser's Vault behind the fallen cargo net.", to: 8 },
          { t: "Investigate the eerie violet glow seeping from the Quartermaster's Cabin.", to: 9 },
          { t: "Swim directly to the gilded doors of the Grand Salon.", to: 10 }
        ]
      },
      3: {
        zone: "Grand Salon • Mother Celeste's Bower",
        title: "The Brine Hag & Wrackwraith",
        text: "Beneath a chandelier tangled in glowing sea-kelp, the hideous Brine Hag Mother Celeste perches atop a stack of barnacle-bound treasure chests, her silver-ringed claws weaving freezing brine-curses. 'Fresh guests for my salon!' she cackles as a wailing Wrackwraith sweeps out of the flooded gallery to strike!",
        enemy: { name: "Mother Celeste, Brine Hag & Wrackwraith", desc: "Sinister sea-hag and drowned spirit haunting the sunken salons.", hp: 82, ac: 16, atk: 9, dmg: 11, undead: true, xp: 355, gold: 230, items: ["bq_celeste_pearl_chalice"], weakCw: ["STERN_DIVE", "ANCHOR_SEVERED"] },
        choices: [
          { t: "Rig salvage-floats to the merchant chests and surface with the cargo!", to: 4 }
        ]
      },
      4: {
        zone: "Harbor Pier • Salvage Boat",
        title: "Cargo Raised",
        text: "Port officials and cheering deckhands haul the sealed trade-chests aboard as the jade sea-witch lights wink out beneath the waves. Dry wool blankets and hot spiced port-broth chase the reef-chill from your bones as the harbor master counts out your share of sea-gold.",
        onEnter: { healHp: 16, msg: "Dry blankets and warm port broth mend your strength (+16 HP)!" },
        choices: [
          { t: "Collect your salvage fee along the coastal wharf.", to: 5 }
        ]
      },
      5: {
        zone: "Coastal Wharf",
        title: "Reef Cleansed",
        text: "Bright sails fill with clean salt wind above the quieted reef once more, and sailors toast your name from every pier-tavern along the harbor.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Salvager of the Sunken Salons",
        text: "You slew the Brine Hag Mother Celeste, laid the bound Wrackwraith to rest, and raised the Silver Gull's lost cargo for the Port Authority!",
        ending: { type: "true", title: "Bane of the Brine Hag", xp: 395, gold: 350, trophy: "Barnacle-Crowned Sea Pearl" },
        choices: []
      },
      7: {
        zone: "Reef Shallows • The Drowned Figurehead",
        title: "The Captain's Sea-Pouch",
        text: "Tangled beneath the carved silver-gull figurehead hangs a brass ship's bell and an oilskin captain's pouch wedged in a coral crook. Peering through a split plank below, you also spot the exact patrol rhythm of the Breakwater Troll inside the cargo hold.",
        choices: [
          { t: "Work the oilskin pouch free without clanging the brass bell.", badge: "Perception / Agility DC 14", check: { stat: "agility", skill: "Perception", dc: 14, pass: 2, fail: 2, passMsg: "You claim 60 GP, a Health Potion, and the troll's blind spot without a sound!", failMsg: "The bell tolls a dull underwater chime—alerting the creatures inside as you dive in!" }, onPass: { cw: "STERN_DIVE", gold: 60, items: ["health_potion"], xp: 30 } },
          { t: "Leave the bell untouched and enter through the main hatch.", to: 2 }
        ]
      },
      8: {
        zone: "Sunken Ship • Purser's Vault",
        title: "The Sealed Strongbox",
        text: "Pinned beneath sodden bolts of crimson merchant silk rests the purser's brass-bound strongbox, its iron lock already crusted with salt-verdigris.",
        choices: [
          { t: "Pick the salt-crusted lock cleanly before the brine-hag notices.", badge: "Lockpicking / Agility DC 15", check: { stat: "agility", skill: "Lockpicking", dc: 15, pass: 10, fail: 10, passMsg: "The tumblers yield! Inside lie 85 GP and a rare salvaged treasure!", failMsg: "Your pick snaps in the corroded keyhole—you leave the strongbox and swim toward the Grand Salon." }, onPass: { gold: 85, items: rollRandomLoot(["valuable", "consumable"], 1, "rare"), xp: 35 } },
          { t: "Wrench the corroded hasp apart by sheer strength.", badge: "Athletics / Might DC 16", check: { stat: "might", skill: "Athletics", dc: 16, pass: 10, fail: 10, failDmg: 6, passMsg: "The rusted iron snaps clean, yielding 85 GP and a rare salvaged treasure!", failMsg: "Jagged brass slices your gauntlet (-6 HP) before you press on toward the Grand Salon!" }, onPass: { gold: 85, items: rollRandomLoot(["valuable", "consumable"], 1, "rare"), xp: 35 } },
          { t: "Check the Quartermaster's Cabin next door instead.", to: 9 }
        ]
      },
      9: {
        zone: "Sunken Ship • Quartermaster's Cabin",
        title: "The Bound Anchor-Chain",
        text: "Coiled around a sunken teak desk lies a heavy iron anchor-chain inscribed with glowing sea-witch runes. Cold violet whispers coil along the links—this fetter binds the Silver Gull's drowned first mate to serve Mother Celeste as her Wrackwraith!",
        choices: [
          { t: "Unravel the brine-hag's binding runes with focused Arcana.", badge: "Arcana / Spirit DC 15", check: { stat: "arcana", skill: "Arcana", dc: 15, pass: 10, fail: 10, failDmg: 5, passMsg: "The violet runes shatter in a burst of silver bubbles—freeing the Wrackwraith from Mother Celeste's command!", failMsg: "Cold necrotic brine jolts your fingers (-5 HP), though the tether weakens!" }, onPass: { cw: "ANCHOR_SEVERED", xp: 45 } },
          { t: "Snap the glowing rune-link with a mighty heave!", badge: "Athletics / Might DC 16", check: { stat: "might", skill: "Athletics", dc: 16, pass: 10, fail: 10, failDmg: 6, passMsg: "The cursed chain breaks with a resonant clang—releasing the captive spirit!", failMsg: "Freezing metal numbs your grip (-6 HP) as you swim on toward the Grand Salon." }, onPass: { cw: "ANCHOR_SEVERED", xp: 45 } },
          { t: "Leave the cursed chain alone and approach the Grand Salon.", to: 10 }
        ]
      },
      10: {
        zone: "Sunken Ship • Salon Threshold",
        title: "Doors of the Grand Salon",
        text: "Through the parted gilded doors of the Grand Salon, jade lanterns sway above velvet couches and barnacle-encrusted treasure chests. Mother Celeste hovers beside her pearl-inlaid chalice, humming a drowning lullaby while cold shadows ripple along the water.",
        choices: [
          { t: "Stride in while the severed anchor-chain frees the Wrackwraith to rest!", reqCw: "ANCHOR_SEVERED", badge: "ANCHOR_SEVERED", to: 11 },
          { t: "[Turn Undead] Flood the flooded salon with dawnlight to banish the Wrackwraith!", reqSpell: "Turn Undead", badge: "Turn Undead", to: 11 },
          { t: "Burst through the gilded doors and confront Mother Celeste and her Wrackwraith!", to: 3 }
        ]
      },
      11: {
        zone: "Grand Salon • Mother Celeste's Bower",
        title: "The Hag Alone",
        text: "With a grateful sigh of drifting silver bubbles, the Wrackwraith dissolves into peaceful light—leaving Mother Celeste screeching in fury! Stripped of her spectral bodyguard, the Brine Hag lashes out alone with freezing kelp-hexes and hooked claws!",
        enemy: { name: "Mother Celeste, the Brine Hag", desc: "Furious sea-hag stripped of her spectral Wrackwraith.", hp: 68, ac: 15, atk: 9, dmg: 10, xp: 340, gold: 240, items: ["bq_celeste_pearl_chalice"], weakCw: ["STERN_DIVE"] },
        choices: [
          { t: "Rig salvage-floats to the merchant chests and surface with the cargo!", to: 4 }
        ]
      }
    }
  },

  // ==========================================================
  // 7. CHAOS AT THE CALDERA (6 PAGES • LV 8)
  // ==========================================================
  bk_b18_tob3_caldera: {
    id: "bk_b18_tob3_caldera",
    title: "Chaos at the Caldera",
    subtitle: "Mount Magra & The Planar Lava Portals",
    difficulty: "Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Dorma Village Elder (Rusty Flagon Tavern)",
    summary: "Ascend smoking Mount Magra above the fertile town of Dorma to close violent planar portals tearing open its caldera—battling rampaging Ibexians and a molten Obsidian Ophidian before the volcano erupts!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Mount Magra • Ash-Covered Slopes",
        title: "Tremors Above Dorma",
        safeRetreat: true,
        text: "Long dormant above the fertile fields of Dorma, Mount Magra now rumbles with thunderous tremors! Planar rifts have torn open inside the volcano's caldera, spewing fiery extraplanar beasts toward the trembling town below!",
        choices: [
          { t: "Trace the cool basalt wind-chimneys up the caldera rim to avoid the falling magma-bombs!", badge: "Survival / Athletics DC 15", check: { stat: "might", skill: "Survival", dc: 15, pass: 2, fail: 2, passMsg: "You reach the high crater ledge unharmed, flanking the planar portal-guards!", failMsg: "Blistering ash-gusts sweep the ridge as horned Ibexians charge!" }, onPass: { cw: "BASALT_RIDGE" } },
          { t: "Climb straight up the smoking lava-trail into the caldera bowl!", to: 2 }
        ]
      },
      2: {
        zone: "Caldera Rim • Smoking Fissures",
        title: "Planar Ibexians",
        text: "Fierce, bronze-horned Ibexian marauders leap across glowing lava fissures, trying to widen the volcano's planar rifts!",
        enemy: { name: "Rampaging Planar Ibexians", desc: "Horned extraplanar raiders pouring out of Mount Magra's rifts.", hp: 66, ac: 16, atk: 8, dmg: 10, xp: 265, gold: 155, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["BASALT_RIDGE"] },
        choices: [
          { t: "Descend to the blazing magma-heart where an Obsidian Ophidian coils around the rift!", to: 3 }
        ]
      },
      3: {
        zone: "Caldera Heart • Planar Magma Rift",
        title: "The Obsidian Ophidian",
        text: "Wreathed in volcanic glass and searing magma, a colossal Obsidian Ophidian rears out of the crackling portal—threatening to trigger Mount Magra's eruption!",
        enemy: { name: "The Obsidian Ophidian", desc: "Volcanic-glass serpent guardian channeling planar eruption fire.", hp: 84, ac: 16, atk: 9, dmg: 11, xp: 360, gold: 230, items: ["bq_magra_obsidian_fang"], weakCw: ["BASALT_RIDGE"] },
        choices: [
          { t: "Collapse the planar rift-anchor and calm the trembling caldera!", to: 4 }
        ]
      },
      4: {
        zone: "Town of Dorma • Vineyards",
        title: "The Mountain Sleeps",
        text: "The ash-plume fades to white steam as Mount Magra settles back into slumber! Grateful Dorma vintners celebrate with gold and rich valley wine.",
        onEnter: { healHp: 16, msg: "Cool mountain air and Dorma's finest vintage mend your burns (+16 HP)!" },
        choices: [
          { t: "Accept Dorma's heartfelt tribute.", to: 5 }
        ]
      },
      5: {
        zone: "Fertile Valley Road",
        title: "Eruption Averted",
        text: "Green vineyards thrive safely beneath the quiet peak.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Savior of Dorma",
        text: "You slew the Obsidian Ophidian, sealed the caldera portals, and saved Dorma from eruption!",
        ending: { type: "true", title: "Queller of Mount Magra", xp: 400, gold: 350, trophy: "Vitrified Magra Ember-Stone" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. THE ECLIPSED CHAPEL (6 PAGES • LV 9)
  // ==========================================================
  bk_b18_tob3_eclipsed_chapel: {
    id: "bk_b18_tob3_eclipsed_chapel",
    title: "The Eclipsed Chapel",
    subtitle: "Painter Pol's Miracle Mural & The Dark Apostle",
    difficulty: "Deadly",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Inspired Painter Pol (Rusty Flagon Tavern)",
    summary: "Stand vigil for earnest painter Pol as he races to paint a miracle mural in an abandoned chapel—defending him against Stained Glass Moths, Copperkill Slimes, Gearmasses, and a twisted Apostle!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Abandoned Chapel • Nave of Dust",
        title: "A Leap of Faith",
        safeRetreat: true,
        text: "Paint-splattered visionary Pol swears an angel tasked him with completing a luminous magic mural inside this ruined chapel before sundown! Yet the moment his brush touches plaster, dark oozes, shimmering Stained Glass Moths, and a ticking Gearmass awaken to stop the miracle!",
        choices: [
          { t: "Consecrate the chapel's dry stone font before Pol begins painting to weaken the corrupting oozes!", badge: "Spirit / Lore DC 15", check: { stat: "spirit", skill: "Lore", dc: 15, pass: 2, fail: 2, passMsg: "Pale radiance gleams across the nave, searing the creeping slimes!", failMsg: "Shattered window-shards flutter to life as Stained Glass Moths descend!" }, onPass: { cw: "FONT_BLESSED" } },
          { t: "Plant yourself before Pol's scaffolding with weapon drawn!", to: 2 }
        ]
      },
      2: {
        zone: "Eclipsed Chapel • Shattered Windows",
        title: "Stained Glass Moths & Copperkill Slimes",
        text: "Razor-winged Stained Glass Moths swoop from the rose window while Copperkill & Sinoper Oozes and a grinding Gearmass surge toward Pol's ladder!",
        enemy: { name: "Stained Glass Moths & Gearmass", desc: "Lethal living glass insects and corrosive chapel constructs.", hp: 74, ac: 16, atk: 9, dmg: 11, xp: 305, gold: 180, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["FONT_BLESSED"] },
        choices: [
          { t: "Hold the final vigil as a shadowed Apostle steps out of the eclipsed altar!", to: 3 }
        ]
      },
      3: {
        zone: "Eclipsed Chapel • The Miracle Mural",
        title: "The Eclipsed Apostle",
        text: "With Pol's final brushstroke moments away, a terrifying Dark Apostle erupts from the cracked altar to smear the radiant mural in shadow!",
        enemy: { name: "The Eclipsed Apostle", desc: "Malevolent heresy-spirit determined to snuff out Pol's angelic mural.", hp: 88, ac: 16, atk: 10, dmg: 12, undead: true, xp: 400, gold: 255, items: ["bq_pol_radiant_brush"], weakCw: ["FONT_BLESSED"] },
        choices: [
          { t: "Watch Pol's final brushstroke ignite the chapel in dazzling angelic light!", to: 4 }
        ]
      },
      4: {
        zone: "Sanctified Chapel • Golden Dusk",
        title: "A Miracle Complete",
        text: "Golden warmth pours straight from the finished mural! Weeping with joy, Pol and grateful pilgrims shower you with blessed coin and radiant healing.",
        onEnter: { healHp: 18, msg: "Angelic light from Pol's finished mural heals your wounds (+18 HP)!" },
        choices: [
          { t: "Leave the newly sanctified chapel in peace.", to: 5 }
        ]
      },
      5: {
        zone: "Hilltop Path",
        title: "Faith Rewarded",
        text: "The mural's warm glow shines through the chapel windows like a beacon.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Guardian of the Miracle Mural",
        text: "You held the vigil at the Eclipsed Chapel and protected Pol's miracle!",
        ending: { type: "true", title: "Vigilant Shield of the Chapel", xp: 440, gold: 390, trophy: "Stained-Glass Angel Medallion" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. THE TWISTED SANCTUARY (6 PAGES • LV 10)
  // ==========================================================
  bk_b18_tob3_twisted_sanctuary: {
    id: "bk_b18_tob3_twisted_sanctuary",
    title: "The Twisted Sanctuary",
    subtitle: "The Veiled Mannequin & Rakshasa Safehouse",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Suspicious City Inspector (Rusty Flagon Tavern)",
    summary: "Uncover the secret entrance hidden inside the upscale Veiled Mannequin tailor's shop and raid the Sanctuary of the Twisted Claw—a deadly Rakshasa safehouse plotting ruin from the heart of the city!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Upscale Quarter • The Veiled Mannequin",
        title: "Silk & Backwards Hands",
        safeRetreat: true,
        text: "Behind the plush velvet curtains of the Veiled Mannequin tailor's shop lies a hidden stair down into the Sanctuary of the Twisted Claw—a fiendish Rakshasa cabal manipulating city officials from the shadows!",
        choices: [
          { t: "Spot the silver-threaded illusion seam in the fitting-room mirror to slip past the tailor's alarm!", badge: "Investigation DC 16", check: { stat: "arcana", skill: "Investigation", dc: 16, pass: 2, fail: 2, passMsg: "You slip cleanly behind the mirrored door, catching the Rakshasa guards off-balance!", failMsg: "The tailor's eyes flash fiery tiger-gold as Rakshasa servitors spring from the curtains!" }, onPass: { cw: "MIRROR_SEAM" } },
          { t: "Kick through the fitting-room mirror straight into the hidden sanctuary!", to: 2 }
        ]
      },
      2: {
        zone: "Sanctuary of the Twisted Claw • Velvet Hall",
        title: "Rakshasa Myrmidon & Servitors",
        text: "Tiger-headed Rakshasa Myrmidons and spell-cloaked Rakshasa Servitors draw curved, cursed blades amidst burning incense!",
        enemy: { name: "Rakshasa Myrmidon & Servitors", desc: "Fiendish feline warriors defending the hidden urban cabal.", hp: 82, ac: 16, atk: 10, dmg: 12, xp: 345, gold: 210, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["MIRROR_SEAM"] },
        choices: [
          { t: "Storm the inner sanctum where the Rakshasa Slayer and Pustakam guard their blackmail vault!", to: 3 }
        ]
      },
      3: {
        zone: "Twisted Sanctuary • Blackmail Vault",
        title: "Rakshasa Slayer & Pustakam",
        text: "Wreathed in shimmering spell-wards, the lethal Rakshasa Slayer and tome-bound Rakshasa Pustakam snarl: 'No mortal leaves the Twisted Claw alive!'",
        enemy: { name: "Rakshasa Slayer & Pustakam", desc: "Fiendish master assassin and arcane grimoire-lord of the cabal.", hp: 98, ac: 17, atk: 11, dmg: 13, xp: 455, gold: 295, items: ["bq_twisted_claw_stiletto"], weakCw: ["MIRROR_SEAM"] },
        choices: [
          { t: "Seize the Rakshasa cabal's ledgers and expose the safehouse to the city!", to: 4 }
        ]
      },
      4: {
        zone: "City Watch Headquarters",
        title: "Cabal Broken",
        text: "Stunned magistrates pay out the city's highest secret bounty as the Veiled Mannequin is sealed for good.",
        onEnter: { healHp: 18, msg: "City clerics mend your cursed wounds (+18 HP)!" },
        choices: [
          { t: "Collect your gold and fade into the crowd.", to: 5 }
        ]
      },
      5: {
        zone: "Market Street",
        title: "Illusions Shattered",
        text: "The city's halls breathe free of fiendish manipulation.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Bane of the Twisted Claw",
        text: "You raided the Veiled Mannequin and crushed the Rakshasa safehouse!",
        ending: { type: "true", title: "Hunter of the Twisted Claw", xp: 490, gold: 450, trophy: "Rakshasa Silk Signet" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. A MIDNIGHT RIDE (6 PAGES • LV 11)
  // ==========================================================
  bk_b18_tob3_midnight_ride: {
    id: "bk_b18_tob3_midnight_ride",
    title: "A Midnight Ride",
    subtitle: "The Silver-Chained Púca & Psychophant Cultists",
    difficulty: "Deadly",
    recommendedLevel: 11,
    autoDiscover: false,
    discoverySource: "Frightened Village Farmer (Rusty Flagon Tavern)",
    summary: "Answer a rural village's plea to drive off sinister Psychophant Cultists hunting a silver-chained black fey horse—the legendary Púca—to rip open planar gates, and settle accounts with the wild fey itself!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Moonlit Pastures • Silver Hoofprints",
        title: "Chains in the Mist",
        safeRetreat: true,
        text: "A gleaming black stallion draped in silver chains—a trickster Púca—has been luring village youths toward the twilight hills! Worse, hooded Psychophant Cultists have arrived with grotesque Leashed Lesions to capture the fey steed and force open planar rifts!",
        choices: [
          { t: "Track the cultists' psychic beacons across the clover-field to ambush their binding-circle first!", badge: "Arcana / Survival DC 16", check: { stat: "arcana", skill: "Survival", dc: 16, pass: 2, fail: 2, passMsg: "You shatter two planar anchor-stones, disrupting the cultists' leashes!", failMsg: "Twisted Leashed Lesions shriek through the mist as cultists close in!" }, onPass: { cw: "ANCHOR_BROKEN" } },
          { t: "Ride straight toward the clinking silver chains on the moonlit ridge!", to: 2 }
        ]
      },
      2: {
        zone: "Twilight Ridge • Binding Circle",
        title: "Psychophant Cultists & Leashed Lesions",
        text: "Mind-warping Psychophant Cultists unleash horrifying Leashed Lesions to capture the rearing black stallion—and slay anyone interfering!",
        enemy: { name: "Psychophant Cultists & Leashed Lesions", desc: "Planar zealots and writhing psychic horrors hunting the Púca.", hp: 90, ac: 17, atk: 11, dmg: 13, xp: 385, gold: 235, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["ANCHOR_BROKEN"] },
        choices: [
          { t: "Confront the wild, silver-chained Púca before it bolts through the village!", to: 3 }
        ]
      },
      3: {
        zone: "Standing Stones • Midnight Crossing",
        title: "The Silver-Chained Púca",
        text: "Eyes blazing with wild fey fire, the shapeshifting Púca rears amid whipping silver chains—testing your mettle in a furious midnight clash!",
        enemy: { name: "The Silver-Chained Púca", desc: "Powerful shapeshifting fey trickster draped in enchanted silver chains.", hp: 108, ac: 17, atk: 12, dmg: 14, xp: 510, gold: 325, items: ["bq_puca_silver_bridle"], weakCw: ["ANCHOR_BROKEN"] },
        choices: [
          { t: "Earn the Púca's grudging truce and send it galloping far beyond the village!", to: 4 }
        ]
      },
      4: {
        zone: "Farming Village • Sunrise",
        title: "Safe Pastures",
        text: "Both the cultists and the midnight trickster are gone! Overjoyed farmers pay out the full promised bonus.",
        onEnter: { healHp: 20, msg: "Warm farmhouse breakfast and rest mend every bruise (+20 HP)!" },
        choices: [
          { t: "Collect the village's bounty.", to: 5 }
        ]
      },
      5: {
        zone: "Country Road",
        title: "Quiet Midnights",
        text: "Only ordinary crickets sing across the clover fields at dusk.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Tamer of the Midnight Ride",
        text: "You routed the Psychophant Cultists and bested the silver-chained Púca!",
        ending: { type: "true", title: "Rider of the Silver Chains", xp: 545, gold: 495, trophy: "Silver Link of the Púca" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. DOWN IN THE DARK OF THE DEEP KING'S DOMAIN (6 PAGES • LV 12)
  // ==========================================================
  bk_b18_tob3_deep_king: {
    id: "bk_b18_tob3_deep_king",
    title: "Down in the Dark of The Deep King's Domain",
    subtitle: "Bioluminescent Caverns & The Cave Sovereign",
    difficulty: "Deadly",
    recommendedLevel: 12,
    autoDiscover: false,
    discoverySource: "Sole Survivor of the Deep Delve (Rusty Flagon Tavern)",
    summary: "Descend into twisting bioluminescent fungal caverns far beneath the earth—braving necrotic Duskwilt horrors to slay the fell alien intelligence known as the Deep King!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Deep Underworld • Bioluminescent Grotto",
        title: "Motes of Light in the Abyss",
        safeRetreat: true,
        text: "Far below the roots of the mountains, glowing fungi drift like pale stars through echoing caverns—hunting ground of the Deep King, an alien Cave Sovereign that feeds on the spiritual essence of every expedition sent against it!",
        choices: [
          { t: "Read the bioluminescent spore-currents to avoid the soul-draining Duskwilt pockets!", badge: "Arcana / Survival DC 17", check: { stat: "arcana", skill: "Survival", dc: 17, pass: 2, fail: 2, passMsg: "You chart a clean dry-stone ridge straight into the Sovereign's throne grotto!", failMsg: "Spore-clouds burst purple as withered Duskwilt stalkers close in!" }, onPass: { cw: "SPORE_RIDGE" } },
          { t: "Descend boldly into the luminous cavern depths with lantern raised!", to: 2 }
        ]
      },
      2: {
        zone: "Fungal Caverns • Ossuary Trail",
        title: "Duskwilt Horrors",
        text: "Twisted, essence-draining Duskwilt predators rise from the remains of previous fallen heroes along the glowing cavern floor!",
        enemy: { name: "Cavern Duskwilt Pack", desc: "Soul-siphoning subterranean predators serving the Deep King.", hp: 96, ac: 17, atk: 12, dmg: 14, xp: 420, gold: 260, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1, weakCw: ["SPORE_RIDGE"] },
        choices: [
          { t: "Enter the echoing Cathedral of Spores where the Deep King awaits!", to: 3 }
        ]
      },
      3: {
        zone: "Cathedral of Spores • Throne of the Deep",
        title: "The Deep King, Cave Sovereign",
        text: "Radiating crushing psychic pressure amid drifting emerald spores, the alien Cave Sovereign—the dreaded Deep King—reaches out to harvest your spirit!",
        enemy: { name: "The Deep King, Cave Sovereign", desc: "Fell alien intelligence feeding on spiritual essence deep beneath the world.", hp: 118, ac: 18, atk: 13, dmg: 15, xp: 575, gold: 360, items: ["bq_deep_king_sovereign_crown"], weakCw: ["SPORE_RIDGE"] },
        choices: [
          { t: "Shatter the Deep King's essence-nexus and claim the fallen expeditions' hoard!", to: 4 }
        ]
      },
      4: {
        zone: "Upper Cavern • Returning Light",
        title: "The Abyss Quieted",
        text: "As the alien intelligence dissolves, trapped spirits drift peacefully upward and the surviving guide salutes you in awe.",
        onEnter: { healHp: 22, msg: "Pure released essence mends every wound (+22 HP)!" },
        choices: [
          { t: "Ascend back to the sunlit surface.", to: 5 }
        ]
      },
      5: {
        zone: "Mountain Tunnel Exit",
        title: "Deep Delve Triumphant",
        text: "No more expeditions will vanish into the Deep King's domain.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Slayer of the Deep King",
        text: "You succeeded where so many fell and ended the reign of the Cave Sovereign!",
        ending: { type: "true", title: "Conqueror of the Deep King", xp: 615, gold: 550, trophy: "Bioluminescent Sovereign Crest" },
        choices: []
      }
    }
  }
});
