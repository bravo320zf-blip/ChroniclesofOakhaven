/* ============================================================
   BOOK QUESTS — BATCH 015 (10 Quests • All autoDiscover: false)
   Purely in-world subtitles & Inn rumor pool discovery.
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. NO ONE LEAVES (6 PAGES • LV 6)
  // ==========================================================
  bk_b15_no_one_leaves: {
    id: "bk_b15_no_one_leaves",
    title: "No One Leaves",
    subtitle: "Espolmar Basalt Mine & Tangleside Raiders",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Espolmar Family Factor (Rusty Flagon Tavern)",
    summary: "Enter the Espolmar basalt-and-iron mine—newly warped into the chaotic Wastes by a freak arcane surge—to rescue missing scion Hirschel Espolmar and Nadia from ruthless Tangleside raiders!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Espolmar Mine • Warped Shaft",
        title: "A Mine Swallowed by Chaos",
        safeRetreat: true,
        text: "A sudden magical surge shifted the lucrative Espolmar Mine straight into the chaotic wasteland! Scion Hirschel Espolmar and his companion Nadia rode out to inspect the shafts and never returned—ambushed by cutthroat raiders from Tangleside!",
        choices: [
          { t: "Scout the ventilation adit along the basalt ridge to slip behind the Tangleside lookouts!", badge: "Stealth DC 14", check: { stat: "agility", skill: "Stealth", dc: 14, pass: 2, fail: 2, passMsg: "You drop down the side shaft unseen, catching the raiders off-guard!", failMsg: "Loose basalt clatters down the chute as Tangleside raiders raise the alarm!" }, onPass: { cw: "ADIT_FLANK" } },
          { t: "March straight down the lantern-lit ore-cart tunnel!", to: 2 }
        ]
      },
      2: {
        zone: "Espolmar Mine • Iron Vein Gallery",
        title: "Tangleside Ambushers",
        text: "Iron-spiked barricades block the basalt drift as Tangleside raiders and a chaos-mutated mine-hound charge out of the dark!",
        enemy: { name: "Tangleside Raiders & Mine-Hound", desc: "Ruthless wasteland scavengers holding the warped mine.", hp: 54, ac: 15, atk: 7, dmg: 8, xp: 190, gold: 110, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["ADIT_FLANK"] },
        choices: [
          { t: "Push into the deep sump where Hirschel and Nadia are held prisoner!", to: 3 }
        ]
      },
      3: {
        zone: "Espolmar Mine • The Chaos Sump",
        title: "The Tangleside Boss",
        text: "Beside a shimmering fissure of raw wasteland magic, the scarred **Tangleside War-Boss** holds Hirschel and Nadia at axe-point: 'No one leaves Espolmar alive!'",
        enemy: { name: "Tangleside War-Boss", desc: "Chaos-touched raider chieftain wielding a jagged basalt greataxe.", hp: 68, ac: 15, atk: 8, dmg: 9, xp: 265, gold: 170, items: ["bq_espolmar_basalt_maul"], weakCw: ["ADIT_FLANK"] },
        choices: [
          { t: "Cut Hirschel and Nadia free and escort them back to the surface!", to: 4 }
        ]
      },
      4: {
        zone: "Minehead • Clear Sky",
        title: "Survivors Rescued",
        text: "Shaken yet unharmed, Hirschel Espolmar clasps your hand and pledges a generous family bounty in iron-minted gold.",
        onEnter: { healHp: 14, msg: "Nadia bandages your cuts with miner's salve (+14 HP)!" },
        choices: [
          { t: "Escort the pair safely back toward Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Borderland Ridge",
        title: "Out of the Shafts",
        text: "The Espolmar Mine stands cleared of Tangleside's grip.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Rescuer of Espolmar",
        text: "You broke the Tangleside ambush and brought Hirschel Espolmar and Nadia out alive!",
        ending: { type: "true", title: "Breaker of the Basalt Mine", xp: 295, gold: 275, trophy: "Espolmar Iron Signet" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. THE CRYSTALLINE SEPULCHER (6 PAGES • LV 7)
  // ==========================================================
  bk_b15_crystalline_sepulcher: {
    id: "bk_b15_crystalline_sepulcher",
    title: "The Crystalline Sepulcher",
    subtitle: "The Island Tower of the Mage Wars",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Arcane Salvager (Rusty Flagon Tavern)",
    summary: "Cross a glassy lake to a remote island tower abandoned during the ancient Mage Wars—where runaway arcane experiments crystallized the entire sanctum and its prismatic guardians!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Mirror Lake • Crystalline Isle",
        title: "Spire of Frozen Magic",
        safeRetreat: true,
        text: "Rising from the center of a still, glassy lake stands an ancient mage-war tower encrusted in razor-bright magenta crystal! Its master fled centuries ago, leaving volatile item-experiments ticking inside the sealed sepulcher.",
        choices: [
          { t: "Tune a resonant pitch against the outer crystal archway to shatter its prismatic alarm-wards!", badge: "Arcana DC 14", check: { stat: "arcana", skill: "Arcana", dc: 14, pass: 2, fail: 2, passMsg: "A pure chime cracks the outer wards, dulling the tower's crystal constructs!", failMsg: "Refracted beams flare violet as faceted guardians step out of the walls!" }, onPass: { cw: "CRYSTAL_CHIME" } },
          { t: "Shatter the crystallized door and stride straight into the tower!", to: 2 }
        ]
      },
      2: {
        zone: "Crystalline Tower • Prismatic Stair",
        title: "Faceted Constructs",
        text: "Towering crystal golems and refracted arcane sparks glide down the spiraling steps, slicing the air with prismatic edges!",
        enemy: { name: "Prismatic Crystal Constructs", desc: "Living quartz-and-magic guardians born from runaway experiments.", hp: 60, ac: 15, atk: 8, dmg: 9, xp: 230, gold: 135, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["CRYSTAL_CHIME"] },
        choices: [
          { t: "Ascend to the Crystalline Sepulcher at the tower's peak!", to: 3 }
        ]
      },
      3: {
        zone: "Tower Peak • The Crystalline Sepulcher",
        title: "The Heart of Refracted Arcana",
        text: "At the center of the blinding chamber floats a sentient **Prismatic Arch-Warden**, coalesced from a century of leaking Mage War artifacts!",
        enemy: { name: "Prismatic Arch-Warden", desc: "Sentient crystalline entity commanding beams of pure refracted magic.", hp: 74, ac: 16, atk: 9, dmg: 10, xp: 310, gold: 195, items: ["bq_crystalline_prism_core"], weakCw: ["CRYSTAL_CHIME"] },
        choices: [
          { t: "Harvest the stabilized arcane relics from the quieted sepulcher!", to: 4 }
        ]
      },
      4: {
        zone: "Mirror Lake • Boat Landing",
        title: "Still Waters",
        text: "The blinding glow softens to a gentle lavender gleam as you row back to shore with a fortune in Mage War curios.",
        onEnter: { healHp: 15, msg: "Pure crystalline resonance mends your wounds (+15 HP)!" },
        choices: [
          { t: "Return to Oakhaven with your spoils.", to: 5 }
        ]
      },
      5: {
        zone: "Lakeshore Road",
        title: "Legacy of the Mage Wars",
        text: "The island tower stands silent at last.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Conqueror of the Sepulcher",
        text: "You tamed the Crystalline Sepulcher and claimed its ancient Mage War treasures!",
        ending: { type: "true", title: "Breaker of the Crystal Spire", xp: 345, gold: 300, trophy: "Faceted Mage-War Prism" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. THE GREAT PORTAL HUNT (6 PAGES • LV 7)
  // ==========================================================
  bk_b15_portal_hunt: {
    id: "bk_b15_portal_hunt",
    title: "The Great Portal Hunt",
    subtitle: "Everstrife's Vacated Maze & Shifting Gates",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Planar Cartographer (Rusty Flagon Tavern)",
    summary: "With the feared wasteland dragon Everstrife suddenly vanished, race rival treasure-hunters into the dragon's planar portal-maze to chart its shifting gates and claim the unguarded draconic hoard!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Everstrife's Maze • First Gate",
        title: "A Dragon's Empty Throne",
        safeRetreat: true,
        text: "For decades, the wasteland dragon Everstrife terrorized anyone who neared the ruined Portal Maze. Now Everstrife has vanished—and rival bands of treasure-hunters are pouring through the shimmering gates into a labyrinth full of stray planar beasts!",
        choices: [
          { t: "Read the draconic claw-marks beside the rune-arches to pick the true shortcut to the central vault!", badge: "Arcana DC 15", check: { stat: "arcana", skill: "Arcana", dc: 15, pass: 2, fail: 2, passMsg: "You step straight through the sapphire arch, beating the rival crew to the core!", failMsg: "A misfiring gate drops you right into a pack of planar rift-stalkers!" }, onPass: { cw: "PORTAL_SHORTCUT" } },
          { t: "Plunge boldly through the crackling obsidian archway!", to: 2 }
        ]
      },
      2: {
        zone: "Portal Maze • Crossroads of Rifts",
        title: "Rival Hunters & Rift-Stalkers",
        text: "Greedy mercenary treasure-hunters clash with phase-shifting planar beasts spilling out of an unsealed archway!",
        enemy: { name: "Rival Portal-Hunters & Rift-Beasts", desc: "Cutthroat competitors and stray planar predators in Everstrife's maze.", hp: 60, ac: 15, atk: 8, dmg: 9, xp: 235, gold: 140, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["PORTAL_SHORTCUT"] },
        choices: [
          { t: "Leap through the golden keystone portal into Everstrife's inner hoard!", to: 3 }
        ]
      },
      3: {
        zone: "Maze Heart • Everstrife's Hoard",
        title: "The Hoard-Warden & Planar Drake",
        text: "Everstrife may be gone, but the dragon left behind a ferocious **Wasteland Rift-Drake** and animated draconic wards guarding its glittering mounds of planar gold!",
        enemy: { name: "Everstrife's Rift-Drake Warden", desc: "Chaos-breathing drake sworn to guard the vanished dragon's hoard.", hp: 74, ac: 16, atk: 9, dmg: 10, xp: 315, gold: 205, items: ["bq_everstrife_portal_key"], weakCw: ["PORTAL_SHORTCUT"] },
        choices: [
          { t: "Stabilize the keystone portal and claim your share of the dragon's hoard!", to: 4 }
        ]
      },
      4: {
        zone: "Maze Entrance • Dust Plain",
        title: "Winner of the Hunt",
        text: "You emerge into the sunlight laden with planar maps and gold as the rival crews retreat empty-handed.",
        onEnter: { healHp: 15, msg: "A restorative potion from Everstrife's hoard mends your wounds (+15 HP)!" },
        choices: [
          { t: "Deliver the portal charts to the cartographer.", to: 5 }
        ]
      },
      5: {
        zone: "Frontier Camp",
        title: "Gates Charted",
        text: "Your name echoes across the Wastes as champion of the Great Portal Hunt.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Champion of the Portal Hunt",
        text: "You outraced every rival and conquered Everstrife's planar maze!",
        ending: { type: "true", title: "Master of the Shifting Gates", xp: 350, gold: 310, trophy: "Everstrife's Gold Scale" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. DEAD AND BURIED (6 PAGES • LV 8)
  // ==========================================================
  bk_b15_dead_and_buried: {
    id: "bk_b15_dead_and_buried",
    title: "Dead and Buried",
    subtitle: "Children of Tomorrow's Dream & The Horizon Glass",
    difficulty: "Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Aberrant Relic Seeker (Rusty Flagon Tavern)",
    summary: "Delve into the buried desert temple raised by the despairing Children of Tomorrow's Dream to appease dreadwalker Vh'al Zhubbuth, and claim the priceless Horizon Glass of the Aberrant Sextant!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Sunken Temple • Tomb of Despair",
        title: "Offering to a Dreadwalker",
        safeRetreat: true,
        text: "When the dreadwalker Vh'al Zhubbuth crossed the Wastes, a despairing cult—the Children of Tomorrow's Dream—built a subterranean temple above a treasure vault holding a grand offering: the Horizon Glass of the Aberrant Sextant!",
        choices: [
          { t: "Read the weeping basalt reliefs to spot the secret counterweight beneath the offering-bowl!", badge: "Investigation DC 15", check: { stat: "arcana", skill: "Investigation", dc: 15, pass: 2, fail: 2, passMsg: "You disarm the suffocating sand-trap and weaken the temple's dread-wards!", failMsg: "The flagstones tilt downward as mummified cultists rise from the burial niches!" }, onPass: { cw: "TOMB_COUNTERWEIGHT" } },
          { t: "Descend the steep obsidian steps straight into the buried vault!", to: 2 }
        ]
      },
      2: {
        zone: "Buried Temple • Hall of Tomorrow's Dream",
        title: "Dreadwalker Cult Undead",
        text: "Bandaged cultists pulsing with alien purple static lurch from their sarcophagi, whispering the dreadwalker's terrible name!",
        enemy: { name: "Children of Tomorrow's Dream", desc: "Void-mummified cultists sworn to guard the buried offering.", hp: 66, ac: 15, atk: 8, dmg: 10, undead: true, xp: 265, gold: 155, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["TOMB_COUNTERWEIGHT"] },
        choices: [
          { t: "Breach the sealed Treasure Vault holding the Horizon Glass!", to: 3 }
        ]
      },
      3: {
        zone: "Treasure Vault • Shrine of Vh'al Zhubbuth",
        title: "Herald of the Dreadwalker",
        text: "Hovering before the gleaming **Horizon Glass**, a multi-eyed **Dreadwalker Herald** tears open the air with tendrils of crushing entropy!",
        enemy: { name: "Herald of Vh'al Zhubbuth", desc: "Aberrant temple guardian bound to protect the Horizon Glass.", hp: 82, ac: 16, atk: 9, dmg: 11, xp: 355, gold: 225, items: ["bq_horizon_glass_lens"], weakCw: ["TOMB_COUNTERWEIGHT"] },
        choices: [
          { t: "Lift the Horizon Glass from the altar and ascend before the dunes collapse!", to: 4 }
        ]
      },
      4: {
        zone: "Desert Surface • Clear Noon",
        title: "Unearthed Relic",
        text: "Sunlight glints off the unblemished Horizon Glass as you leave the buried temple behind forever.",
        onEnter: { healHp: 16, msg: "Warm daylight clears the tomb's chill (+16 HP)!" },
        choices: [
          { t: "Claim your bounty in Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Wastes Edge",
        title: "Buried Once More",
        text: "Shifting sands seal the cult's entrance behind you.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Bearer of the Horizon Glass",
        text: "You conquered the buried temple of Vh'al Zhubbuth and claimed the Horizon Glass!",
        ending: { type: "true", title: "Recoverer of the Horizon Glass", xp: 395, gold: 345, trophy: "Seal of Tomorrow's Dream" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. DOWN THE GULLET (6 PAGES • LV 8)
  // ==========================================================
  bk_b15_down_the_gullet: {
    id: "bk_b15_down_the_gullet",
    title: "Down the Gullet",
    subtitle: "Observatory of the Chaos Moon & Soave Dirtscrabbler",
    difficulty: "Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Wealthy Patron Lord Avius (Rusty Flagon Tavern)",
    summary: "Answer Lord Avius's urgent request to find famed arcane archaeologist Soave Dirtscrabbler at the Observatory of the Chaos Moon—a blasted relic of the Mage War between Lich King Svatobor and Aurufina!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Observatory of the Chaos Moon • Shattered Dome",
        title: "Four Hundred Years of Chaos",
        safeRetreat: true,
        text: "Famed archaeologist Soave Dirtscrabbler vanished exploring the Observatory of the Chaos Moon—ground zero of the ancient duel between Lich King Svatobor the Dauntless and sorcerer Aurufina! Below the cracked brass telescope yawns a pulsing chasm nicknamed 'the Gullet'!",
        choices: [
          { t: "Follow Soave's chalked archaeological notes along the brass catwalks to bypass the chaos-storm vents!", badge: "Investigation DC 15", check: { stat: "arcana", skill: "Investigation", dc: 15, pass: 2, fail: 2, passMsg: "Soave's notes mark a safe ledge overlooking the Gullet's guardians!", failMsg: "Arcane lightning leaps from the brass gears as warped moon-beasts attack!" }, onPass: { cw: "SOAVE_NOTES" } },
          { t: "Rappel straight down the Gullet toward Soave's flickering lantern-light!", to: 2 }
        ]
      },
      2: {
        zone: "The Gullet • Brass Orrery",
        title: "Chaos-Warped Sentinels",
        text: "Spinning planetary gears hiss as storm-charged undead soldiers from Svatobor's ancient legions lunge across the chasm!",
        enemy: { name: "Svatobor's Chaos-Warped Guard", desc: "Undead Mage-War veterans crackling with Aurufina's storm magic.", hp: 66, ac: 16, atk: 8, dmg: 10, undead: true, xp: 265, gold: 155, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["SOAVE_NOTES"] },
        choices: [
          { t: "Reach the Observatory's sunken lens-chamber where Soave is cornered!", to: 3 }
        ]
      },
      3: {
        zone: "Observatory Core • Chaos Moon Lens",
        title: "The Gullet Horror",
        text: "Crouched behind a cracked telescope lens, archaeologist Soave Dirtscrabbler shouts a warning as a monstrous, spell-devouring **Chaos-Moon Maw** erupts from the abyss!",
        enemy: { name: "The Chaos-Moon Maw", desc: "Colossal spell-warped horror lurking at the bottom of the Gullet.", hp: 82, ac: 16, atk: 9, dmg: 11, xp: 355, gold: 230, items: ["bq_chaos_moon_astrolabe"], weakCw: ["SOAVE_NOTES"] },
        choices: [
          { t: "Haul Soave and her priceless Mage-War journals back up to the surface!", to: 4 }
        ]
      },
      4: {
        zone: "Lord Avius's Pavilion",
        title: "Archaeologist Returned",
        text: "Overjoyed to see Soave Dirtscrabbler alive and triumphant, Lord Avius pays out a lavish noble reward.",
        onEnter: { healHp: 16, msg: "Lord Avius's physicians restore your vigor (+16 HP)!" },
        choices: [
          { t: "Accept Lord Avius's gold and praise.", to: 5 }
        ]
      },
      5: {
        zone: "Observatory Ridge",
        title: "History Preserved",
        text: "Soave's journals will keep scholars debating the Mage War for decades.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Savior of the Observatory",
        text: "You braved the Gullet and brought Soave Dirtscrabbler safely back to Lord Avius!",
        ending: { type: "true", title: "Delver of the Chaos Moon", xp: 395, gold: 350, trophy: "Soave's Brass Monocle" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. THE FLESHWARPER'S WALKING FORTRESS (6 PAGES • LV 10)
  // ==========================================================
  bk_b15_walking_fortress: {
    id: "bk_b15_walking_fortress",
    title: "The Fleshwarper's Walking Fortress",
    subtitle: "Betrayed Mavrite Pilgrims & The Striding Citadel",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Escaped Mavrite Pilgrim (Rusty Flagon Tavern)",
    summary: "Intercept a betrayed caravan of sixteen Mavrite pilgrims in the Western Wastelands by storming a grotesque, striding fleshwarped siege-fortress and slaying the mad Fleshwarper before the pilgrims are twisted into monsters!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Western Wastelands • Giant Footprints",
        title: "The Striding Bastion",
        safeRetreat: true,
        text: "Tremors shake the red dust as a towering, six-legged fortress of bone, iron, and stitched sinew strides across the Western Wastelands! Inside its iron cages sit sixteen betrayed Mavrite pilgrims who sought the Seat of Mavros—now slated for the Fleshwarper's twisted vats!",
        choices: [
          { t: "Grapple up the rear tendon-leg while the fortress pauses to crush a ridge, bypassing its main barbican!", badge: "Athletics DC 16", check: { stat: "might", skill: "Athletics", dc: 16, pass: 2, fail: 2, passMsg: "You vault into the lower gear-ribs unseen, severing a primary nerve-conduit!", failMsg: "Flesh-turrets spot you scaling the leg and unleash bone-shards!" }, onPass: { cw: "NERVE_SEVERED" } },
          { t: "Charge straight into the lowering jaw-gate of the Walking Fortress!", to: 2 }
        ]
      },
      2: {
        zone: "Walking Fortress • Sinew Barracks",
        title: "Fleshwarped Wardens",
        text: "Hulking, multi-armed stitched brutes and acid-spitting homunculi stampede down the swaying iron corridor to guard the pilgrim pens!",
        enemy: { name: "Fleshwarped Siege-Wardens", desc: "Grotesque multi-limbed guardians stitched together inside the moving keep.", hp: 82, ac: 16, atk: 10, dmg: 12, xp: 345, gold: 205, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["NERVE_SEVERED"] },
        choices: [
          { t: "Smash into the swaying Crucible Spire where the mad Fleshwarper steers the fortress!", to: 3 }
        ]
      },
      3: {
        zone: "Walking Fortress • The Crucible Spire",
        title: "The Grand Fleshwarper",
        text: "Wired into the fortress's beating heart-core with brass surgical arms, the **Grand Fleshwarper** laughs maniacally: 'The pilgrims wanted to be reforged—I shall make them glorious!'",
        enemy: { name: "The Grand Fleshwarper", desc: "Deranged biomancer commanding a colossal living siege-fortress.", hp: 98, ac: 17, atk: 11, dmg: 13, xp: 455, gold: 285, items: ["bq_fleshwarper_storm_blade"], weakCw: ["NERVE_SEVERED"] },
        choices: [
          { t: "Sever the heart-core to halt the Walking Fortress and unlock the pilgrims' cages!", to: 4 }
        ]
      },
      4: {
        zone: "Western Wastelands • Fallen Colossus",
        title: "Pilgrims Freed",
        text: "With a thunderous groan, the monstrous fortress collapses into stillness! All sixteen Mavrite pilgrims kneel in tearful gratitude, sharing their storm-blessed healing and travel gold.",
        onEnter: { healHp: 18, msg: "Mavrite storm-prayers mend every wound (+18 HP)!" },
        choices: [
          { t: "Escort the pilgrims safely toward the Seat of Mavros.", to: 5 }
        ]
      },
      5: {
        zone: "Pilgrim Trail",
        title: "The Horror Halted",
        text: "No more giant footsteps shake the Western Wastelands.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Toppler of the Walking Fortress",
        text: "You slew the Grand Fleshwarper and saved the Mavrite pilgrims!",
        ending: { type: "true", title: "Breaker of the Living Keep", xp: 490, gold: 440, trophy: "Mavrite Storm-Medallion" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. THE DOOMED PATROL (6 PAGES • LV 15)
  // ==========================================================
  bk_b15_doomed_patrol: {
    id: "bk_b15_doomed_patrol",
    title: "The Doomed Patrol",
    subtitle: "Commander Raftis & Ssileficus the Slumberer",
    difficulty: "Deadly",
    recommendedLevel: 15,
    autoDiscover: false,
    discoverySource: "Wasterider Commander Raftis (Rusty Flagon Tavern)",
    summary: "Ride deep into satarre-contested badlands for Wasterider Commander Raftis to find his vanished frontier patrols—and confront the awakening of the colossal, many-eyed horror Ssileficus the Slumberer!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Satarre Badlands • Patrol Markers",
        title: "Missing Wasteriders",
        safeRetreat: true,
        text: "Pinned down by escalating satarre raids, Wasterider Commander Raftis hires you to track his vanished elite patrols. Out beyond the jagged ridges, you find cracked armor and monstrous slither-tracks leading to the waking lair of <strong>Ssileficus the Slumberer</strong>—a colossal, tentacled, hundred-eyed terror!",
        choices: [
          { t: "Read the Wasteriders' last signal-cairn to uncover the satarre ambush and Ssileficus's blind-spot!", badge: "Survival DC 17", check: { stat: "spirit", skill: "Survival", dc: 17, pass: 2, fail: 2, passMsg: "You recover the patrol's alchemical flash-bombs, blinding Ssileficus's bilious eyes!", failMsg: "Satarre war-horns echo across the canyon as their zealots close in!" }, onPass: { cw: "PATROL_BOMBS" } },
          { t: "Ride straight into the sulfurous rift where the last patrol made its stand!", to: 2 }
        ]
      },
      2: {
        zone: "Sulfurous Rift • Satarre Barricade",
        title: "Satarre Fanatics & Spawn",
        text: "Fierce satarre war-priests chanting to wake the Slumberer unleash armored pincer-spawn across the broken canyon!",
        enemy: { name: "Satarre War-Priests & Pincer-Spawn", desc: "Ruthless wasteland raiders serving the colossal Slumberer.", hp: 112, ac: 18, atk: 13, dmg: 16, xp: 520, gold: 320, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1, weakCw: ["PATROL_BOMBS"] },
        choices: [
          { t: "Descend into the shaking abyss where Ssileficus the Slumberer uncoils!", to: 3 }
        ]
      },
      3: {
        zone: "Abyssal Maw • Lair of the Slumberer",
        title: "Ssileficus the Slumberer",
        text: "Hundreds of bilious eyes snap open above a circular, jagged maw! Trailing armored tentacles and crushing pincers, **Ssileficus the Slumberer** surges upward to devour the Wastes!",
        enemy: { name: "Ssileficus the Slumberer", desc: "Colossal spiny-scaled eldritch leviathan of the deep Wastes.", hp: 138, ac: 19, atk: 14, dmg: 18, xp: 710, gold: 440, items: ["bq_ssileficus_carapace_plate"], weakCw: ["PATROL_BOMBS"] },
        choices: [
          { t: "Drive the final blow through Ssileficus's maw and rescue the surviving Wasteriders!", to: 4 }
        ]
      },
      4: {
        zone: "Wasterider Outpost • Dawn",
        title: "The Patrol Avenged",
        text: "Commander Raftis salutes grimly as you return with the rescued scouts and proof of the Slumberer's death, awarding the outpost's highest bounty.",
        onEnter: { healHp: 24, msg: "Wasterider field-medics patch your armor and wounds (+24 HP)!" },
        choices: [
          { t: "Claim the Wasteriders' tribute.", to: 5 }
        ]
      },
      5: {
        zone: "High Badlands",
        title: "The Slumberer Ends",
        text: "With Ssileficus slain, the satarre raids falter across the frontier.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Slayer of the Slumberer",
        text: "You saved the Doomed Patrol and ended the ancient terror of Ssileficus!",
        ending: { type: "true", title: "Bane of Ssileficus", xp: 760, gold: 660, trophy: "Spiny Pincer of the Slumberer" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. CITY OF THE WORM KING (6 PAGES • LV 20 ENDGAME!)
  // ==========================================================
  bk_b15_worm_king: {
    id: "bk_b15_worm_king",
    title: "City of the Worm King",
    subtitle: "The Ley-Line Nexus of the City of Wonders",
    difficulty: "Deadly",
    recommendedLevel: 20,
    autoDiscover: false,
    discoverySource: "Dying Archmage of the Flint Hills (Rusty Flagon Tavern)",
    summary: "Ascend the sweeping flint hills to the legendary, ley-line-crowned ruins of the City of Wonders—now twisted into the empire of the immortal Worm King—for an ultimate max-level showdown to save the realm!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Flint Hills • Gates of the City of Wonders",
        title: "Broken Hanging Gardens",
        safeRetreat: true,
        text: "In the age of legends, the City of Wonders stood atop intersecting ley lines, its hanging gardens blooming eternally. Now colossal pale worms coil through its shattered alabaster spires, and the immortal <strong>Worm King</strong> prepares to invert the ley nexus and swallow the entire world!",
        choices: [
          { t: "Tap the ancient sorcerer-kings' ley-conduits along the aqueducts to turn the nexus fire against the Worm King!", badge: "Arcana DC 19", check: { stat: "arcana", skill: "Arcana", dc: 19, pass: 2, fail: 2, passMsg: "Blazing ley-lightning surges through the aqueducts, searing the Worm King's outer wards!", failMsg: "The corrupted nexus lashes back as titanic worm-behemoths erupt from the gardens!" }, onPass: { cw: "LEY_NEXUS_TAP" } },
          { t: "March up the grand alabaster promenade straight toward the Worm King's throne!", to: 2 }
        ]
      },
      2: {
        zone: "City of Wonders • Sunken Hanging Gardens",
        title: "Leviathans of the Nexus",
        text: "Crashing through petrified flower-terraces, titanic ley-infused Void Worms and undead sorcerer-kings surge to tear you apart!",
        enemy: { name: "Nexus Worm-Behemoths & Undead Lords", desc: "Colossal ley-mutated wyrms guarding the City of Wonders.", hp: 150, ac: 20, atk: 16, dmg: 20, undead: true, xp: 750, gold: 450, items: rollRandomLoot(["consumable", "material"], 1, "legendary"), flee: 1, weakCw: ["LEY_NEXUS_TAP"] },
        choices: [
          { t: "Enter the Crown Spire where the immortal Worm King sits astride the world's ley lines!", to: 3 }
        ]
      },
      3: {
        zone: "Crown Spire • Throne of the Ley Nexus",
        title: "The Immortal Worm King",
        text: "Crowned in writhing arcane fire and towering amid swirling ley-storms, the legendary **Worm King** speaks with the voice of grinding continents: 'Empires turn to dust—only the Worm endures!'",
        enemy: { name: "The Worm King, Sovereign of Entropy", desc: "Mythic max-level overlord commanding the ruined City of Wonders.", hp: 185, ac: 21, atk: 17, dmg: 22, undead: true, xp: 1000, gold: 650, items: ["bq_worm_king_nexus_crown"], weakCw: ["LEY_NEXUS_TAP"] },
        choices: [
          { t: "Shatter the Worm King's staff and restore the ley-line nexus to pure light!", to: 4 }
        ]
      },
      4: {
        zone: "City of Wonders • Reborn Gardens",
        title: "A Legend Fulfilled",
        text: "As the Worm King dissolves into golden motes, pure springwater erupts from the dry fountains for the first time in a thousand years—and blossoms burst across the flint hills!",
        onEnter: { healHp: 30, msg: "Pure ley-line radiance restores your full heroic vitality (+30 HP)!" },
        choices: [
          { t: "Descend from the City of Wonders as a living legend.", to: 5 }
        ]
      },
      5: {
        zone: "Flint Hills Summit",
        title: "The Realm Saved",
        text: "Bards across every kingdom will sing of the day the Worm King fell.",
        choices: [
          { t: "Complete the ultimate adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Vanquisher of the Worm King",
        text: "You conquered the City of Wonders and slew the immortal Worm King!",
        ending: { type: "true", title: "Sovereign Slayer of the Worm King", xp: 1200, gold: 1000, trophy: "Crown Shard of the Worm King" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. THE TOMB OF MERCY (6 PAGES • LV 8)
  // ==========================================================
  bk_b15_tomb_of_mercy: {
    id: "bk_b15_tomb_of_mercy",
    title: "The Tomb of Mercy",
    subtitle: "Crater of Mother Mercy & The Ark Colossus",
    difficulty: "Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Weeping Augur of Mercy (Rusty Flagon Tavern)",
    summary: "Brave acid rain at the Crater of Mother Mercy, gather Sacred Auguries past the mummified Angel of Pestilence and cold-iron devil gears, and halt the corrupted Ark Colossus before fiendish blight consumes the world!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Crater of Mother Mercy • Acid Rain",
        title: "Tears of the Colossal Angel",
        safeRetreat: true,
        text: "Roiling storm clouds weep hissing acid rain across a colossal angel statue surrounded by titan bones! Fiendish servants of the Hells are corrupting the Tomb of Mercy to turn the final Ark Colossus into an engine of world-ending pestilence!",
        choices: [
          { t: "Plant the sacred skull-seed in the four-armed angel's dirt mote to receive the Sacred Augury!", badge: "Spirit / Lore DC 15", check: { stat: "spirit", skill: "Lore", dc: 15, pass: 2, fail: 2, passMsg: "The mossy skull flowers and whispers the true Gate, exposing the plague-angel's weakness!", failMsg: "Acid rain hisses across the altar as a swarm of apocalyptic locusts erupts!" }, onPass: { cw: "SACRED_AUGURY" } },
          { t: "Cross the iron-geared bridge straight into the Devil-Mouth Chapel!", to: 2 }
        ]
      },
      2: {
        zone: "Devil-Mouth Chapel • Churning Gears",
        title: "Angel of Pestilence",
        text: "Four monstrous cold-iron gears grind in the walls as an exalted **Mummified Angel of Pestilence** raises her plague-scarab brand and breathes a roaring cloud of locusts!",
        enemy: { name: "Mummified Angel of Pestilence", desc: "Fallen, plague-branded celestial guarding the devil-mouth bridge.", hp: 66, ac: 16, atk: 8, dmg: 10, undead: true, xp: 265, gold: 155, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["SACRED_AUGURY"] },
        choices: [
          { t: "Enter the Sun-Disk Pavilion where the corrupted Ark Colossus lumbers forth!", to: 3 }
        ]
      },
      3: {
        zone: "Sun-Disk Pavilion • The Blight Core",
        title: "The Horned Harbinger & Ark Colossus",
        text: "Two straining columns of locusts part! Out steps a horned harbinger jangling with pestilent totems beside the towering, brimstone-framed **Twisted Ark Colossus**, wailing skulls glowing in its chest!",
        enemy: { name: "Twisted Ark Colossus & Harbinger", desc: "Brimstone-corrupted colossus carrying humanity's stolen Sacred Vessels.", hp: 84, ac: 16, atk: 9, dmg: 11, xp: 360, gold: 230, items: ["bq_mercy_iron_nimbus"], weakCw: ["SACRED_AUGURY"] },
        choices: [
          { t: "Purify the Sacred Vessels and halt the Tomb's fiendish blight!", to: 4 }
        ]
      },
      4: {
        zone: "Crater Rim • Clearing Skies",
        title: "Mercy Redeemed",
        text: "The acid clouds part into pure, clean rain! The weeping angel statue gleams silver once more as the Augur of Mercy blesses you.",
        onEnter: { healHp: 16, msg: "Pure blessed rain cleanses every wound (+16 HP)!" },
        choices: [
          { t: "Depart the cleansed Tomb of Mercy.", to: 5 }
        ]
      },
      5: {
        zone: "Highland Road",
        title: "Humanity Spared",
        text: "The Hells' plague-scheme is broken for an age.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Redeemer of the Tomb of Mercy",
        text: "You shattered the blight and reclaimed the Sacred Vessels of the Ark Colossus!",
        ending: { type: "true", title: "Champion of Mother Mercy", xp: 400, gold: 350, trophy: "Sacred Vessel Augury Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. TOMB OF TIBERESH (6 PAGES • LV 2)
  // ==========================================================
  bk_b15_tomb_tiberesh: {
    id: "bk_b15_tomb_tiberesh",
    title: "Tomb of Tiberesh",
    subtitle: "Sunken Anu-Asir & The Fish-Headed God-King",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Golden Falcon Antiquities Agent (Rusty Flagon Tavern)",
    summary: "Sign on with Golden Falcon Antiquities outside the newly unearthed desert city of Anu-Asir, brave the rolling juggernaut and Scarlet Foyer, and face the cursed false god-king Tiberesh!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Anu-Asir • Alabaster Staircase",
        title: "City Beneath the Sand",
        safeRetreat: true,
        text: "Outside Per-Bastet, shifting sands have revealed the mythical submerged city of Anu-Asir—once ruled by the blasphemous sorcerer Tiberesh, depicted in hieroglyphs as a fish-headed god! Golden Falcon Antiquities hires you to descend the sand-choked alabaster stairs and recover Tiberesh's gem-studded rod!",
        choices: [
          { t: "Spot the pressure-plates along the narrow sand-drifted hallway to jam the rolling stone juggernaut trap!", badge: "Perception DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, passMsg: "You wedge the eastern niche, stopping the rolling juggernaut cold!", failMsg: "Stone rumbles behind you as tomb-scorpions and guardians burst from the drifts!" }, onPass: { cw: "JUGGERNAUT_JAMMED" } },
          { t: "Crawl boldly through the sand-choked Hallowed Halls toward the Scarlet Foyer!", to: 2 }
        ]
      },
      2: {
        zone: "Hallowed Halls • The Scarlet Foyer",
        title: "Guardians of Anubis's Columns",
        text: "Beneath two grand alabaster columns of Anubis with cupped hands, giant desert scorpions and sand-preserved tomb guards scuttle across the scarlet flagstones!",
        enemy: { name: "Tomb Guardians & Giant Scorpions", desc: "Venomous desert beasts and ancient sentinels of Anu-Asir.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["JUGGERNAUT_JAMMED"] },
        choices: [
          { t: "Push open the massive golden doors into the Funerary Sanctum of Tiberesh!", to: 3 }
        ]
      },
      3: {
        zone: "Funerary Complex • Sanctum of Tiberesh",
        title: "Tiberesh, False God-King",
        text: "Wearing an eerie finned angler-fish headdress and wielding a gem-studded hook-rod, the undead false prophet **Tiberesh** rises from his sunken sarcophagus!",
        enemy: { name: "Tiberesh, False God-King", desc: "Cursed sorcerer-king wearing an angler-fish crown and wielding a hooked rod.", hp: 32, ac: 13, atk: 5, dmg: 6, undead: true, xp: 95, gold: 65, items: ["bq_tiberesh_hooked_rod"], weakCw: ["JUGGERNAUT_JAMMED"] },
        choices: [
          { t: "Claim Tiberesh's relics and return to the Golden Falcon Antiquities camp!", to: 4 }
        ]
      },
      4: {
        zone: "Anu-Asir • Golden Falcon Camp",
        title: "Antiquities Paid in Full",
        text: "Impressed that you returned alive from the cursed funerary complex, the expedition leaders honor their contract in gleaming desert gold.",
        onEnter: { healHp: 8, msg: "Cool dates and spring water restore your strength (+8 HP)!" },
        choices: [
          { t: "Pocket your pay and leave the sand-buried ruins.", to: 5 }
        ]
      },
      5: {
        zone: "Road to Per-Bastet",
        title: "The False God Sleeps",
        text: "The river spirits' ancient curse over Anu-Asir settles into quiet peace.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Delver of Anu-Asir",
        text: "You conquered the Tomb of Tiberesh and ended the false god-king's reign!",
        ending: { type: "true", title: "Raider of Anu-Asir", xp: 130, gold: 120, trophy: "Tiberesh's Jeweled Scarab" },
        choices: []
      }
    }
  }
});
