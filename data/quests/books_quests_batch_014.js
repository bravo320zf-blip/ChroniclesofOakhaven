/* ============================================================
   BOOK QUESTS — BATCH 014 (10 Quests • All autoDiscover: false)
   Purely in-world subtitles & Inn rumor pool discovery.
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. THE SANCTUM (6 PAGES • LV 3)
  // ==========================================================
  bk_b14_wastes_sanctum: {
    id: "bk_b14_wastes_sanctum",
    title: "The Sanctum",
    subtitle: "Buried Elder Shrine & The Dreaming Zealot",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Shaken Wastes Caravan Scout (Rusty Flagon Tavern)",
    summary: "Follow echoing eldritch whispers across the scorched Wastes to a buried Elder shrine, disrupt the cryptic runes of a dreaming zealot, and stop her from awakening the ancient horror she calls Mother!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Scorched Wastes • Sunken Threshold",
        title: "Whispers in the Ruins",
        safeRetreat: true,
        text: "Half-swallowed by ash dunes stands a jagged basalt archway carved with alien, spiraling eyes. Travelers along the border road have been plagued by haunting dreams of a 'Sanctum' where a hooded zealot is rousing a forgotten Elder presence!",
        choices: [
          { t: "Trace the counter-spirals along the lintel to muffle the shrine's maddening whispers before descending!", badge: "Arcana DC 12", check: { stat: "arcana", skill: "Arcana", dc: 12, pass: 2, fail: 2, passMsg: "You invert the outer glyph, weakening the shrine's psychic ward!", failMsg: "Cold laughter echoes in your skull as warped cult sentinels rise from the ash!" }, onPass: { cw: "GLYPH_INVERTED" } },
          { t: "Descend the cracked obsidian stair into the glowing sanctum!", to: 2 }
        ]
      },
      2: {
        zone: "The Sanctum • Hall of Icons",
        title: "Warped Shrine Sentinels",
        text: "Twisted cultists clutching obsidian censers step from behind weeping stone icons, chanting in an unearthly cadence!",
        enemy: { name: "Sanctum Zealots & Ash-Hounds", desc: "Dream-addled cultists guarding the buried Elder shrine.", hp: 34, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["GLYPH_INVERTED"] },
        choices: [
          { t: "Breach the circular inner sanctum before the awakening ritual peaks!", to: 3 }
        ]
      },
      3: {
        zone: "Inner Sanctum • Altar of the Mother",
        title: "The Dreaming Priestess",
        text: "Floating above a pulsing pool of star-flecked shadow, the Dreaming Priestess raises a jagged icon: 'Mother wakes! The Wastes shall kneel!'",
        enemy: { name: "The Dreaming Priestess", desc: "Eldritch conduit channeling the whispers of a buried Elder power.", hp: 42, ac: 14, atk: 6, dmg: 6, xp: 135, gold: 90, items: ["bq_sanctum_obsidian_icon"], weakCw: ["GLYPH_INVERTED"] },
        choices: [
          { t: "Shatter the pulsing obsidian icon and collapse the ritual circle!", to: 4 }
        ]
      },
      4: {
        zone: "Ash Dunes • Quiet Horizon",
        title: "Silence Over the Wastes",
        text: "As the icon cracks, the oppressive whispers vanish from the wind. Relieved caravan scouts reward your courage with silver and supplies.",
        onEnter: { healHp: 10, msg: "Clear desert air restores your resolve (+10 HP)!" },
        choices: [
          { t: "Return to Oakhaven with the silenced relic.", to: 5 }
        ]
      },
      5: {
        zone: "Borderland Road",
        title: "Peaceful Dreams",
        text: "Campfires burn quietly along the frontier road once more.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Silencer of the Sanctum",
        text: "You broke the Dreaming Priestess's ritual and sealed the buried Sanctum!",
        ending: { type: "true", title: "Breaker of the Elder Sanctum", xp: 165, gold: 150, trophy: "Cracked Obsidian Eye" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. THE LOST TEMPLE OF ANAX APOGEION (6 PAGES • LV 3)
  // ==========================================================
  bk_b14_anax_apogeion: {
    id: "bk_b14_anax_apogeion",
    title: "The Lost Temple of Anax Apogeion",
    subtitle: "Sand-Buried Shrine & The Forbidden Scroll",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Desert Relic Hunter (Rusty Flagon Tavern)",
    summary: "Enter the sun-bleached, sand-buried ruins where the Cult of Anax Apogeion starved seeking alien enlightenment, and recover the fabled Scroll of Anax Apogeion from their restless cosmic guardians!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Dunes of the Wastes • Buried Pylon",
        title: "The Starved Cult",
        safeRetreat: true,
        text: "Wind-scoured sandstone columns jut from a sunken crater—the Lost Temple of Anax Apogeion, where fanatics starved to death trying to glimpse the alien minds of the Great Old Ones. Deep within still rests the priceless Scroll of Anax Apogeion!",
        choices: [
          { t: "Clear the drift-sand from the ancient astronomy dial to open the priest's side-vault safely!", badge: "History DC 12", check: { stat: "arcana", skill: "History", dc: 12, pass: 2, fail: 2, passMsg: "The dial clicks true, letting you bypass the temple's collapsing sand-traps!", failMsg: "Dry bones rattle to life beneath the sand as cosmic-touched husks rise!" }, onPass: { cw: "STAR_DIAL" } },
          { t: "Descend the sand-choked central ramp into the temple nave!", to: 2 }
        ]
      },
      2: {
        zone: "Temple Nave • Hall of Starved Monks",
        title: "Star-Touched Husks",
        text: "Desiccated cultists with glowing violet starlight burning inside their empty eye sockets shamble from the sand-drifted alcoves!",
        enemy: { name: "Star-Touched Cult Husks", desc: "Undead remnants of the starved Cult of Anax Apogeion.", hp: 34, ac: 13, atk: 5, dmg: 6, undead: true, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["STAR_DIAL"] },
        choices: [
          { t: "Enter the Star-Vault where the Scroll of Anax Apogeion rests!", to: 3 }
        ]
      },
      3: {
        zone: "Inner Star-Vault • Dais of Apogeion",
        title: "The Void-Touched Hierophant",
        text: "Cradling the glowing silver Scroll of Anax Apogeion, the skeletal Hierophant of Apogeion levitates amid orbiting chunks of meteoric iron!",
        enemy: { name: "Hierophant of Anax Apogeion", desc: "Undead cosmic prophet guarding the forbidden star-scroll.", hp: 42, ac: 14, atk: 6, dmg: 6, undead: true, xp: 135, gold: 95, items: ["bq_anax_star_scroll_case"], weakCw: ["STAR_DIAL"] },
        choices: [
          { t: "Claim the sealed Scroll of Anax Apogeion and ascend into the sunlight!", to: 4 }
        ]
      },
      4: {
        zone: "Desert Camp • Oasis Edge",
        title: "Relic Secured",
        text: "The relic hunter gasps in awe at the unbroken silver scroll-case, paying out a hefty bounty in gold.",
        onEnter: { healHp: 10, msg: "Cool oasis water revives your spirit (+10 HP)!" },
        choices: [
          { t: "Leave the sunken temple to the shifting sands.", to: 5 }
        ]
      },
      5: {
        zone: "Caravan Trail",
        title: "Dust Over Stars",
        text: "By dusk, the wind has already begun burying the sandstone pylons once more.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Finder of Anax Apogeion",
        text: "You braved the starved cult's ruins and claimed the Scroll of Anax Apogeion!",
        ending: { type: "true", title: "Seeker of the Star-Scroll", xp: 165, gold: 155, trophy: "Scroll-Seal of Anax Apogeion" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. STRANGE ALCHEMY (6 PAGES • LV 3)
  // ==========================================================
  bk_b14_strange_alchemy: {
    id: "bk_b14_strange_alchemy",
    title: "Strange Alchemy",
    subtitle: "Vivi Sparksprocket & The Arc of the Sextant",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Gnome Tinkerer Vivi Sparksprocket (Rusty Flagon Tavern)",
    summary: "Assist Barsella gnome tinkerer Vivi Sparksprocket in tracking down the Arc of the Aberrant Sextant—crossing a magically warped river to confront the erratic alchemist hoarding its planar power!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Warped Riverbank • Alchemist's Isle",
        title: "Rainbow Foam & Strange Currents",
        safeRetreat: true,
        text: "Gnome tinkerer Vivi Sparksprocket has hunted for years for a piece of the fabled Aberrant Sextant—an artifact capable of opening planar gateways! Now its brass Arc glows atop a rocky island in a river bubbling with shimmering, alchemically mutated foam!",
        choices: [
          { t: "Tune Vivi's brass compass to chart a safe skiff-channel through the mutating rapids!", badge: "Arcana DC 12", check: { stat: "arcana", skill: "Arcana", dc: 12, pass: 2, fail: 2, passMsg: "You steer cleanly around the boiling eddies and land right beside the alchemist's rear alembic!", failMsg: "Swirling rainbow foam rocks the skiff as mutated river-oozes surge aboard!" }, onPass: { cw: "VIVI_COMPASS" } },
          { t: "Row hard straight for the island's stone landing!", to: 2 }
        ]
      },
      2: {
        zone: "Alchemist's Isle • Bubbling Shore",
        title: "Mutated River Oozes",
        text: "Iridescent, crackling alchemical oozes and warped brass homunculi slither across the wet stones to defend the island laboratory!",
        enemy: { name: "Alchemical Oozes & Homunculi", desc: "Volatile spill-creatures mutated by planar river magic.", hp: 34, ac: 12, atk: 5, dmg: 6, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["VIVI_COMPASS"] },
        choices: [
          { t: "Storm into the glass-domed island workshop!", to: 3 }
        ]
      },
      3: {
        zone: "Island Laboratory • Planar Alembic",
        title: "The Warped Alchemist",
        text: "Clutching the glowing brass Arc of the Sextant, the wild-eyed island alchemist hurls shimmering planar flasks across the stone floor: 'The river speaks to me—you'll never take the Arc!'",
        enemy: { name: "The Warped Island Alchemist", desc: "Planar-obsessed experimenter armed with unstable transmutation flasks.", hp: 42, ac: 14, atk: 6, dmg: 6, xp: 140, gold: 95, items: ["bq_sextant_brass_arc"], weakCw: ["VIVI_COMPASS"] },
        choices: [
          { t: "Secure the Arc of the Sextant and ferry back to Vivi Sparksprocket!", to: 4 }
        ]
      },
      4: {
        zone: "Barsella Camp • Vivi's Workshop",
        title: "Tinkerer's Triumph",
        text: "Vivi leaps onto her workbench cheering as she examines the intact brass Arc, showering you with gold and a fresh restorative draught.",
        onEnter: { healHp: 10, msg: "Vivi's sparkling ginger-elixir restores your health (+10 HP)!" },
        choices: [
          { t: "Collect your reward.", to: 5 }
        ]
      },
      5: {
        zone: "River Road",
        title: "Calmer Waters",
        text: "Without the Sextant's Arc warping the currents, the river slowly clears.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Finder of the Sextant Arc",
        text: "You braved the warped river island and delivered the Arc of the Sextant to Vivi Sparksprocket!",
        ending: { type: "true", title: "Recoverer of the Brass Arc", xp: 170, gold: 155, trophy: "Vivi's Tuning Compass" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. DUST TO DUST (6 PAGES • LV 4)
  // ==========================================================
  bk_b14_dust_to_dust: {
    id: "bk_b14_dust_to_dust",
    title: "Dust to Dust",
    subtitle: "The Pillars of the Gods & Amniox's Amulet",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Basalt Valley Lorekeeper (Rusty Flagon Tavern)",
    summary: "Ascend the towering hexagonal basalt formations known as the Pillars of the Gods to uncover the ancient tomb of the mystic Amniox and recover the cursed amulet of the fallen celestial Arakiel!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Valley of Basalt • Pillars of the Gods",
        title: "Hexagonal Spires",
        safeRetreat: true,
        text: "Towering hexagonal columns of black basalt rise like colossal organ pipes across the arid valley. Inside the tallest spire rests the ancient mystic Amniox, who once pledged himself to the fallen celestial Arakiel—and whose golden amulet still radiates dark power!",
        choices: [
          { t: "Climb the wind-carved basalt ledges to reach Amniox's upper burial chamber without waking the lower dust-guards!", badge: "Athletics DC 13", check: { stat: "might", skill: "Athletics", dc: 13, pass: 2, fail: 2, passMsg: "You scale the hexagonal spire cleanly, catching the tomb's wardens off-guard!", failMsg: "Crumbling basalt sends dust cascading down, waking the valley's ash-guardians!" }, onPass: { cw: "SPIRE_CLIMB" } },
          { t: "Enter through the cracked bronze doors at the base of the Pillar!", to: 2 }
        ]
      },
      2: {
        zone: "Basalt Pillar • Hall of Dust",
        title: "Ashen Wardens",
        text: "Swirling dust-devils coalesce into bronze-armored skeletal guardians wielding sun-bleached halberds!",
        enemy: { name: "Basalt Dust-Wardens", desc: "Ancient undead sentinels bound to the Pillars of the Gods.", hp: 40, ac: 14, atk: 6, dmg: 6, undead: true, xp: 125, gold: 70, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["SPIRE_CLIMB"] },
        choices: [
          { t: "Step into the skylit burial pinnacle of the mystic Amniox!", to: 3 }
        ]
      },
      3: {
        zone: "Pillar Summit • Amniox's Tomb",
        title: "The Shade of Amniox",
        text: "Black celestial feathers drift through the dusty shaft of sunlight as the undead mystic Amniox rises from his basalt bier, clutching the blazing amulet of fallen Arakiel!",
        enemy: { name: "Amniox, Mystic of Arakiel", desc: "Fallen-celestial-touched undead sorcerer guarding his tomb.", hp: 50, ac: 15, atk: 7, dmg: 7, undead: true, xp: 175, gold: 115, items: ["bq_arakiel_fallen_amulet"], weakCw: ["SPIRE_CLIMB"] },
        choices: [
          { t: "Lay Amniox to dust and claim the cleansed celestial amulet!", to: 4 }
        ]
      },
      4: {
        zone: "Valley Floor • Sunset",
        title: "Dust Returns to Dust",
        text: "The dark hum radiating from the hexagonal pillars fades to silence as the lorekeeper rewards your perilous climb.",
        onEnter: { healHp: 10, msg: "A cool valley breeze refreshes your spirit (+10 HP)!" },
        choices: [
          { t: "Descend from the Pillars of the Gods.", to: 5 }
        ]
      },
      5: {
        zone: "Basalt Pass",
        title: "Quiet Spires",
        text: "The black columns stand watch over the silent sands once more.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Climber of the Pillars",
        text: "You laid Amniox to rest and claimed the amulet of Arakiel!",
        ending: { type: "true", title: "Conqueror of the Basalt Pillars", xp: 205, gold: 190, trophy: "Black Feather of Arakiel" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. VAULT OF THE GOD-KING (6 PAGES • LV 4)
  // ==========================================================
  bk_b14_vault_god_king: {
    id: "bk_b14_vault_god_king",
    title: "Vault of the God-King",
    subtitle: "The Fallen Metal Meteor & Dreadwalker Cult",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Wasteland Star-Seeker (Rusty Flagon Tavern)",
    summary: "Breach the twisted wreckage of a fallen metallic meteor in the Wastes, fight past fanatical disciples claiming descent from the dreadwalkers, and shut down the alien Vault of the God-King!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Meteor Crater • Twisted Hull",
        title: "The Metal Meteor",
        safeRetreat: true,
        text: "Half-buried in fused glass sands lies the ribbed, metallic hull of a sky-fallen vessel! Fanatical cultists call its ancient antehuman pilot the 'God-King'—claiming he travels between worlds and communes with terrifying dreadwalkers!",
        choices: [
          { t: "Examine the humming silver hull-seams to slip through a maintenance hatch without tripping the meteor's lightning wards!", badge: "Arcana DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 2, fail: 2, passMsg: "The silver hatch slides silently open—bypassing the outer laser-wards!", failMsg: "Blue arcs snap across the crater as cult guards rush the hull!" }, onPass: { cw: "HULL_HATCH" } },
          { t: "March straight through the jagged impact tear into the metal wreck!", to: 2 }
        ]
      },
      2: {
        zone: "Metal Meteor • Corridors of Glass",
        title: "Disciples of the God-King",
        text: "Silver-masked cultists wielding crackling metallic rods and alien hound-constructs swarm down the tilted corridor!",
        enemy: { name: "God-King Disciples & Constructs", desc: "Zealous wasteland cultists armed with salvaged star-metal rods.", hp: 40, ac: 14, atk: 6, dmg: 6, xp: 125, gold: 75, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["HULL_HATCH"] },
        choices: [
          { t: "Breach the humming inner Vault where the God-King's arcane engine pulses!", to: 3 }
        ]
      },
      3: {
        zone: "Vault of the God-King • Core Chamber",
        title: "The Star-Born Champion",
        text: "Bathed in blinding violet light from the meteor's planar engine, the armored High Disciple of the God-King channels dreadwalker lightning to tear open a rift!",
        enemy: { name: "High Disciple of the God-King", desc: "Star-armored sorcerer channeling an alien planar engine.", hp: 50, ac: 15, atk: 7, dmg: 7, xp: 175, gold: 120, items: ["bq_godking_star_rod"], weakCw: ["HULL_HATCH"] },
        choices: [
          { t: "Shut down the unstable planar engine and salvage the Vault's treasures!", to: 4 }
        ]
      },
      4: {
        zone: "Crater Rim • Cooling Sands",
        title: "The Engine Sleeps",
        text: "The ominous violet hum dies away as the meteor goes dark, sparing the frontier from a dreadwalker breach.",
        onEnter: { healHp: 10, msg: "You catch your breath atop the crater rim (+10 HP)!" },
        choices: [
          { t: "Carry your salvaged star-metal relics back to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Wasteland Trail",
        title: "Sky-Iron Silenced",
        text: "Only cold, silent metal remains buried in the dunes.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Breaker of the Metal Vault",
        text: "You shut down the Vault of the God-King and scattered the dreadwalker cult!",
        ending: { type: "true", title: "Raider of the Star-Vault", xp: 205, gold: 195, trophy: "Shard of Star-Metal Hull" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. A CRY FOR HELP (6 PAGES • LV 4)
  // ==========================================================
  bk_b14_cry_for_help: {
    id: "bk_b14_cry_for_help",
    title: "A Cry for Help",
    subtitle: "Mikos Addlebury & The Marshland Wisps",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Passing Marshland Carrier (Rusty Flagon Tavern)",
    summary: "Follow the bloody trail of slain mercenaries along the marshland fringes to find antique-trader Mikos Addlebury, brave treacherous will-o'-wisps, and banish the ruin-haunt lured by his latest curio!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Marshland Road • Ambush Site",
        title: "Fallen Mercenaries",
        safeRetreat: true,
        text: "Beside a splintered wagon-wheel along the foggy marsh road lie two fallen mercenaries—burned by eerie blue sparks! Antique-trader Mikos Addlebury's mule tracks veer deep into the peat bog, followed by a distant, desperate cry for help!",
        choices: [
          { t: "Track Mikos's lantern-smoke and mule prints carefully so the marsh's deceptive wisps can't lure you into quicksand!", badge: "Survival DC 13", check: { stat: "spirit", skill: "Survival", dc: 13, pass: 2, fail: 2, passMsg: "You spot the false bobbing lights and stay on firm peat all the way to Mikos's wagon!", failMsg: "Bobbing blue wisps swarm out of the reeds to ambush you mid-bog!" }, onPass: { cw: "FIRM_PEAT" } },
          { t: "Sprint straight toward the cries for help through the waist-deep mist!", to: 2 }
        ]
      },
      2: {
        zone: "Sunken Peat Bog • The Lantern Trail",
        title: "Marsh Will-o'-Wisps",
        text: "Crackling spheres of ghostly blue lightning—hungry Will-o'-Wisps—dart out of the reeds, trying to drain the life from anyone near Mikos's bogged-down wagon!",
        enemy: { name: "Swarm of Will-o'-Wisps", desc: "Lethal marshland spirit-lights feeding on fear and life-force.", hp: 40, ac: 15, atk: 6, dmg: 6, undead: true, xp: 125, gold: 70, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["FIRM_PEAT"] },
        choices: [
          { t: "Reach Mikos's mired wagon where a cursed marsh-artifact is waking a bog horror!", to: 3 }
        ]
      },
      3: {
        zone: "Mired Wagon • The Cursed Curio",
        title: "The Bog-Ruin Wraith",
        text: "Cowering under his canvas tarp, trader Mikos Addlebury points at a glowing jade idol in his crate—from which rises a towering, peat-dripping Bog-Ruin Wraith!",
        enemy: { name: "The Bog-Ruin Wraith", desc: "Vengeful marshland specter bound to Mikos's newly purchased curio.", hp: 50, ac: 14, atk: 7, dmg: 7, undead: true, xp: 175, gold: 120, items: ["bq_mikos_marsh_lantern"], weakCw: ["FIRM_PEAT"] },
        choices: [
          { t: "Banish the wraith and help Mikos haul his wagon back to firm ground!", to: 4 }
        ]
      },
      4: {
        zone: "Marshland Fringe • Dry Road",
        title: "A Grateful Trader",
        text: "Mikos Addlebury wipes bog-mud from his spectacles, swears off buying glowing ruin-idols without an appraisal, and pays you handsomely from his strongbox.",
        onEnter: { healHp: 10, msg: "Mikos shares hot tea and healing salve from his wagon (+10 HP)!" },
        choices: [
          { t: "Escort Mikos safely down the road.", to: 5 }
        ]
      },
      5: {
        zone: "Dry Causeway",
        title: "Out of the Mire",
        text: "The eerie blue lights fade back into the distant swamp.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Rescuer of the Marsh Road",
        text: "You answered Mikos Addlebury's cry for help and broke the marshland haunt!",
        ending: { type: "true", title: "Savior of Addlebury's Caravan", xp: 205, gold: 195, trophy: "Cleansed Jade Marsh Idol" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. CRATER OF THE FLAYING STAR (10 PAGES • LV 5)
  // ==========================================================
  bk_b14_flaying_star: {
    id: "bk_b14_flaying_star",
    title: "Crater of the Flaying Star",
    subtitle: "Okalveka's Shattered Pyramid & The Omen Star",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Wastes Historian (Rusty Flagon Tavern)",
    summary: "Cross the gnoll-stalked desert wastes to the sunken pyramid shattered centuries ago by the falling Omen Star, uncover Princess Mynna's ridge-shrine, and confront the undying wrath of Tyrant Queen Okalveka!",
    totalPages: 10,
    pages: {
      1: {
        zone: "Desert Wastes • Crater Rim",
        title: "The Fallen Omen Star",
        safeRetreat: true,
        text: "Under a bruised violet twilight, the rim of the Flaying Star's crater glitters with fused green desert glass. Centuries ago, Princess Mynna prayed for a streaking omen star to shatter the cruel reign of her mother, Tyrant Queen Okalveka—and the heavens obeyed, cleaving the tyrant's pyramid in two. Now cackling gnolls and caustic slimes swarm the glowing nave below, while a wind-scoured sandstone shrine clings to the western ridge.",
        choices: [
          { t: "Circle the vitrified crater rim at dusk to slip past the gnoll raiders!", badge: "Stealth / Agility DC 13", check: { stat: "agility", skill: "Stealth", dc: 13, pass: 2, fail: 2, passMsg: "You drop cleanly into the cleaved pyramid nave unseen!", failMsg: "Howling desert gnolls spot your silhouette against the glowing crater!" }, onPass: { cw: "CRATER_STEALTH" } },
          { t: "Climb the western ridge to inspect Princess Mynna's weathered Star-Shrine.", to: 7 },
          { t: "Charge straight down the glass-fused crater slope into the cleaved pyramid!", to: 2 }
        ]
      },
      2: {
        zone: "Cleaved Pyramid • Outer Gallery",
        title: "Desert Gnolls & Caustic Slimes",
        text: "Cackling wasteland gnolls drive oozing, sun-baked Desert Slimes ahead of them through the cracked sandstone corridors, their rusty spears glinting in the crater's eerie blue glow!",
        enemy: { name: "Wastes Gnolls & Desert Slimes", desc: "Scavenging hyena-folk and corrosive sand-oozes.", hp: 46, ac: 14, atk: 6, dmg: 7, xp: 150, gold: 85, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["CRATER_STEALTH"] },
        choices: [
          { t: "Inspect the cracked Scribe's Vault off the outer gallery first.", to: 9 },
          { t: "Descend straight into the glowing impact chamber where the Flaying Star burns!", to: 3 }
        ]
      },
      3: {
        zone: "Pyramid Heart • The Flaying Star",
        title: "Tyrant Queen Okalveka",
        text: "Crowned in razor-bright meteoric shards, the undying Tyrant Queen Okalveka rises beside the humming Flaying Star—radiating blistering starlight and ancient fury! 'Another worm crawling into my tomb? Even the heavens could not unseat me!'",
        enemy: { name: "Tyrant Queen Okalveka", desc: "Star-scarred undead sovereign fused with the fallen Omen Star.", hp: 58, ac: 15, atk: 7, dmg: 8, undead: true, xp: 210, gold: 140, items: ["bq_flaying_star_diadem"], weakCw: ["CRATER_STEALTH", "MYNNA_BLESSING", "STAR_MIRROR"] },
        choices: [
          { t: "Shatter the tyrant's star-scepter and claim the buried royal hoard!", to: 4 }
        ]
      },
      4: {
        zone: "Crater Rim • Cool Night",
        title: "A Tyrant's Final Fall",
        text: "As Okalveka's crown-shards crumble into harmless silver dust, the blinding star-crater dims to a gentle, warm ember. At long last, Princess Mynna's ancient wish is fulfilled.",
        onEnter: { healHp: 12, msg: "Cool desert night air eases your burns (+12 HP)!" },
        choices: [
          { t: "Lay Okalveka's broken scepter at Mynna's ridge-shrine to honor her prayer!", reqCw: "MYNNA_BLESSING", badge: "MYNNA_BLESSING", to: 5, onChoose: { gold: 50, xp: 35, msg: "A warm silver chime answers from the stars—nomad scouts add 50 GP & 35 XP in tribute!" } },
          { t: "Carry the royal relics back across the Wastes.", to: 5 },
          { t: "Pry loose a rich vein of vitrified star-glass for Oakhaven's jewelers before leaving.", to: 10 }
        ]
      },
      5: {
        zone: "Sands of the Wastes",
        title: "Peace Under Clear Stars",
        text: "At the oasis crossroads, desert tribes pour spiced date-tea and whisper your name beneath a clear, uncursed canopy of stars—the hero who finally quelled Okalveka's crater.",
        choices: [
          { t: "Return to Oakhaven!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Queller of the Flaying Star",
        text: "You vanquished Tyrant Queen Okalveka inside the Crater of the Flaying Star, bringing long-overdue peace to the Wastes!",
        ending: { type: "true", title: "Breaker of the Omen Crater", xp: 245, gold: 230, trophy: "Vitrified Omen-Star Shard" },
        choices: []
      },
      7: {
        zone: "West Ridge • Star-Shrine",
        title: "Princess Mynna's Prayer Alcove",
        text: "Carved into the wind-scoured ridge stands a small sandstone relief of Princess Mynna lifting a silver astrolabe toward the sky. A faint silver ember still warms the offering-bowl, and a sand-drifted pilgrim's chest rests at her feet.",
        choices: [
          { t: "Trace the fading celestial prayer-glyphs around the astrolabe with Arcana.", badge: "Arcana DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 8, fail: 8, failDmg: 4, passMsg: "The silver glyphs answer in a clear chime—revealing Mynna's counter-ward!", failMsg: "Starlight arcs singe your fingertips (-4 HP), yet the alcove opens!" } },
          { t: "Speak a gentle prayer of release over the offering-bowl.", badge: "Spirit / Persuasion DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 8, fail: 2, passMsg: "A cool desert breeze carries Mynna's blessing straight into your spirit!", failMsg: "Only dry wind answers—you turn back toward the cleaved pyramid." } },
          { t: "Drop down the glass slope into the Outer Gallery.", to: 2 }
        ]
      },
      8: {
        zone: "West Ridge • Star-Shrine",
        title: "Mynna's Astrolabe Blessing",
        text: "The altar-bowl flares cool silver, and a gentle voice drifts on the night wind: 'My mother's crown feeds on the star's wound—carry my name into the crater and her light will falter!' Beneath the sand you recover 40 GP in ancient pilgrim silver and spot a narrow skylight shaft bypassing the gnolls below.",
        onEnter: { cw: "MYNNA_BLESSING", gold: 40, healHp: 10, healMp: 4, msg: "Received MYNNA_BLESSING, 40 GP, +10 HP & +4 MP!" },
        choices: [
          { t: "Slip down the cracked skylight shaft straight into the Scribe's Vault!", to: 9 },
          { t: "Descend into the Outer Gallery to clear out the gnoll raiders first.", to: 2 }
        ]
      },
      9: {
        zone: "Cleaved Pyramid • Scribe's Vault",
        title: "The Vitrified Treasury",
        text: "Half-melted limestone shelves hold gilded funerary urns, a tilted obsidian mirror aimed toward the crater heart, and a sand-locked royal tax-coffer gleaming behind glass stalactites.",
        choices: [
          { t: "Disarm the glass-needle latch with Detect Traps and align the obsidian mirror.", reqSkill: "Detect Traps", badge: "Detect Traps", to: 3, onChoose: { gold: 55, cw: "STAR_MIRROR", msg: "You claim 55 GP and angle the obsidian mirror to disrupt Okalveka's star-aura!" } },
          { t: "Cleanse the funerary wards with Turn Undead to drain the Queen's power!", reqSpell: "Turn Undead", mp: 4, badge: "Turn Undead (4 MP)", to: 3, onChoose: { cw: "MYNNA_BLESSING", msg:"Consecrated light floods the vault, cracking Okalveka's undead wards below!" } },
          { t: "Test Your Luck prying open the royal tax-coffer!", badge: "Test Your Luck", luck: { pass: 3, fail: 3, failDmg: 5, passMsg: "You snag 55 GP and tilt the obsidian mirror cleanly!", failMsg: "Vitrified glass shards nick your knuckles (-5 HP)!", onPass: { gold: 55, cw: "STAR_MIRROR" } } },
          { t: "Leave the vault and descend into the Pyramid Heart.", to: 3 }
        ]
      },
      10: {
        zone: "Epilogue",
        title: "Star-Glass Prospector",
        text: "Your pack groans with rare fused star-glass and royal bullion—enough to keep Oakhaven's finest jewelers bidding for a month while the Wastes breathe easy once more!",
        ending: { type: "victory", title: "Star-Glass Prospector", xp: 220, gold: 275, trophy: "Crown-Glass Meteorite" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. THE SPIDER'S EYE (6 PAGES • LV 5)
  // ==========================================================
  bk_b14_spiders_eye: {
    id: "bk_b14_spiders_eye",
    title: "The Spider's Eye",
    subtitle: "Merchant Lords & The Venomous Trade Canyon",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Wasteland Caravan Factor (Rusty Flagon Tavern)",
    summary: "Hire on with a proud wasteland merchant house to escort a bullion caravan through the web-draped canyon known as the Spider's Eye—breaking the ambush of ruthless raiders and giant phase-arachnids!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Wasteland Trade Road • Canyon Mouth",
        title: "Where Gold Reigns Supreme",
        safeRetreat: true,
        text: "In the desolate Wastes, not even kings command the merchant houses—only gold rules the road! Ahead narrows the jagged ravine called the Spider's Eye, where silver-strung webs glint high on the cliffs and a rival syndicate has laid a deadly trap for your bullion wagons!",
        choices: [
          { t: "Scout the high canyon rim to cut the ambushers' drop-ropes before the wagons roll through!", badge: "Perception DC 13", check: { stat: "spirit", skill: "Perception", dc: 13, pass: 2, fail: 2, passMsg: "You sever three silk drop-lines, throwing the canyon ambush into chaos!", failMsg: "Barbed web-nets rain down across the lead wagon as raiders drop from the ledges!" }, onPass: { cw: "WEB_CUT" } },
          { t: "Ride beside the lead bullion wagon with steel drawn!", to: 2 }
        ]
      },
      2: {
        zone: "Spider's Eye Canyon • Webbed Chokepoint",
        title: "Canyon Raiders & Silk Stalkers",
        text: "Masked trade-bandits and giant chittering wasteland spiders rappel down silk cables to hijack the gold chests!",
        enemy: { name: "Web-Raiders & Giant Spiders", desc: "Cutthroat caravan pirates teamed with venomous canyon arachnids.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 155, gold: 90, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["WEB_CUT"] },
        choices: [
          { t: "Climb into the Spider's Eye cavern overlook to crush the ambush leader!", to: 3 }
        ]
      },
      3: {
        zone: "Spider's Eye Overlook • Brood Lair",
        title: "The Silk-Lord & Broodmother",
        text: "Perched beside a glittering hoard of looted trade-gems, the ruthless Silk-Lord commands a monstrous Wasteland Broodmother with clicking mandibles!",
        enemy: { name: "Silk-Lord & Broodmother", desc: "Venomous bandit captain and her giant arachnid matriarch.", hp: 58, ac: 15, atk: 7, dmg: 8, xp: 210, gold: 145, items: ["bq_spiders_eye_emerald"], weakCw: ["WEB_CUT"] },
        choices: [
          { t: "Clear the canyon pass and guide the merchant wagons safely through!", to: 4 }
        ]
      },
      4: {
        zone: "Trade Outpost • Caravan Gate",
        title: "Bullion Delivered",
        text: "Impressed by your steel, the merchant factor counts out a gleaming share of bullion coin and binds your wounds.",
        onEnter: { healHp: 12, msg: "Caravan medics neutralize every trace of venom (+12 HP)!" },
        choices: [
          { t: "Pocket the merchant house's gold.", to: 5 }
        ]
      },
      5: {
        zone: "Wasteland Highway",
        title: "Open Trade Road",
        text: "Caravans roll through the Spider's Eye unmolested once more.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Master of the Spider's Eye",
        text: "You shattered the Spider's Eye ambush and delivered the bullion caravan intact!",
        ending: { type: "true", title: "Warden of the Trade Canyon", xp: 245, gold: 240, trophy: "Merchant House Gold Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. THE SHATTERED HALLS OF THE FALLEN STAR (6 PAGES • LV 6)
  // ==========================================================
  bk_b14_shattered_halls: {
    id: "bk_b14_shattered_halls",
    title: "The Shattered Halls of the Fallen Star",
    subtitle: "Doctor Terlyn & Captain Ocras's Void-Vessel",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Inventor Doctor Terlyn (Rusty Flagon Tavern)",
    summary: "Investigate a crashed interplanar vessel in the Wastes after inventor Doctor Terlyn decodes a plea from Captain Ocras—uncovering stasis-trapped void-voyagers desperate to claim living bodies!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Crashed Void-Vessel • Shattered Hull",
        title: "A Message in Star-Metal",
        safeRetreat: true,
        text: "Friendly inventor Doctor Terlyn found a humming metal construct bearing a distress call from 'Captain Ocras' of a crashed void-vessel—begging for aid to save his stasis-bound crew. Inside the tilted, shimmering halls, however, you realize Ocras wants living hosts to transfer his crew's minds into!",
        choices: [
          { t: "Override the flickering stasis-door panel using Doctor Terlyn's cipher to lock down the security drones!", badge: "Arcana DC 14", check: { stat: "arcana", skill: "Arcana", dc: 14, pass: 2, fail: 2, passMsg: "Sparking relays disable half the ship's automated defense turrets!", failMsg: "Crimson alarms flash through the shattered halls as metal drones converge!" }, onPass: { cw: "TERLYN_CIPHER" } },
          { t: "Force the warped bulkhead doors and march toward the stasis bridge!", to: 2 }
        ]
      },
      2: {
        zone: "Void-Vessel • Stasis Corridor",
        title: "Vessel Security Drones",
        text: "Hovering spheres of polished star-iron and mind-swapped thralls emerge from cracked crystal stasis pods, firing arcs of pale lightning!",
        enemy: { name: "Void-Vessel Drones & Thralls", desc: "Automated ship guardians and mind-hijacked wasteland scouts.", hp: 54, ac: 15, atk: 7, dmg: 8, xp: 190, gold: 110, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["TERLYN_CIPHER"] },
        choices: [
          { t: "Breach the Shattered Bridge where Captain Ocras's mind-engine hums!", to: 3 }
        ]
      },
      3: {
        zone: "Void-Vessel • The Shattered Bridge",
        title: "Captain Ocras, Void-Voyager",
        text: "Encased in a gleaming crystalline exo-frame wired to the ship's psychic core, Captain Ocras speaks with a chilling chorus of voices: 'Your living shells will carry my crew back to the stars!'",
        enemy: { name: "Captain Ocras, Void-Voyager", desc: "Ancient planar captain wielding psychic lightning and an exo-frame.", hp: 68, ac: 16, atk: 8, dmg: 9, xp: 265, gold: 170, items: ["bq_ocras_chrono_lens"], weakCw: ["TERLYN_CIPHER"] },
        choices: [
          { t: "Power down the mind-transfer core and free the captive scouts!", to: 4 }
        ]
      },
      4: {
        zone: "Doctor Terlyn's Camp",
        title: "The Fallen Star Sleeps",
        text: "Horrified by Ocras's true plan yet fascinated by your salvaged components, Doctor Terlyn pays out a lavish inventor's bounty.",
        onEnter: { healHp: 14, msg: "Terlyn's galvanic salve mends your wounds (+14 HP)!" },
        choices: [
          { t: "Leave the silent void-vessel to the desert sands.", to: 5 }
        ]
      },
      5: {
        zone: "Edge of the Wastes",
        title: "Stars Kept at Bay",
        text: "No more eerie distress beacons echo from the crashed hull.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Silencer of the Fallen Star",
        text: "You thwarted Captain Ocras's mind-theft and shut down the Shattered Halls!",
        ending: { type: "true", title: "Breaker of the Fallen Star", xp: 295, gold: 275, trophy: "Ocras's Star-Metal Medallion" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. WHISPERS OF THE TUMULTUOUS DARK (6 PAGES • LV 6)
  // ==========================================================
  bk_b14_tumultuous_dark: {
    id: "bk_b14_tumultuous_dark",
    title: "Whispers of the Tumultuous Dark",
    subtitle: "Salzbach's Missing Daughter & Calviana's Cult",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Weeping Mother Dinah of Salzbach (Rusty Flagon Tavern)",
    summary: "Track young Sylphie Generet from Salzbach into the chaotic Wastes after a sinister stranger named Calviana lures her away—and shatter the cult of the Tumultuous Dark before Sylphie is lost forever!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Wastes Border • Calviana's Trail",
        title: "Sweet Promises in the Dark",
        safeRetreat: true,
        text: "Dinah Generet of Salzbach begs you to bring back her rebellious daughter Sylphie, who vanished into the Wastes with a soft-spoken recruiter named Calviana—promising a sanctuary where she would 'finally belong.' Ahead looms a jagged ravine humming with chaotic shadow!",
        choices: [
          { t: "Call out with Dinah's silver keepsake so Sylphie recognizes your voice above Calviana's whispers!", badge: "Persuasion DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 2, fail: 2, passMsg: "Sylphie hesitates at the altar edge, disrupting Calviana's shadow-channeling!", failMsg: "Calviana's hooded devotees step from the ravine mist with curved blades!" }, onPass: { cw: "SYLPHIE_DOUBT" } },
          { t: "Descend swiftly into the ravine sanctuary to confront Calviana!", to: 2 }
        ]
      },
      2: {
        zone: "Ravine Sanctuary • Outer Veil",
        title: "Devotees of the Tumultuous Dark",
        text: "Shadow-veiled cultists chanting chaotic hymns surge out of the jagged caves alongside shifting void-stalkers!",
        enemy: { name: "Tumultuous Dark Cultists", desc: "Chaos-touched fanatics guarding Calviana's wasteland sanctuary.", hp: 54, ac: 15, atk: 7, dmg: 8, xp: 190, gold: 110, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["SYLPHIE_DOUBT"] },
        choices: [
          { t: "Push into the swirling shadow-amphitheater where Calviana prepares the final rite!", to: 3 }
        ]
      },
      3: {
        zone: "Shadow Amphitheater • Abyssal Rift",
        title: "Calviana, Voice of the Dark",
        text: "Wreathed in crackling tendrils of chaotic gloom, Calviana tries to pull trembling Sylphie toward the whispering rift: 'She chose the Dark—and now the Dark claims you both!'",
        enemy: { name: "Calviana, Voice of the Dark", desc: "Silver-tongued wasteland warlock serving the Tumultuous Dark.", hp: 68, ac: 15, atk: 8, dmg: 9, xp: 265, gold: 175, items: ["bq_tumultuous_dark_mantle"], weakCw: ["SYLPHIE_DOUBT"] },
        choices: [
          { t: "Pull Sylphie clear of the closing rift and lead her home to Salzbach!", to: 4 }
        ]
      },
      4: {
        zone: "Salzbach • Generet Cottage",
        title: "Mother and Daughter Reunited",
        text: "Tears flow freely as Sylphie embraces her mother Dinah, vowing never to heed honeyed wasteland whispers again. Dinah insists you take her family's saved silver.",
        onEnter: { healHp: 14, msg: "A warm hearth and hearty stew restore your strength (+14 HP)!" },
        choices: [
          { t: "Bid Salzbach farewell.", to: 5 }
        ]
      },
      5: {
        zone: "Salzbach Road",
        title: "Whispers Silenced",
        text: "The ravine behind you lies quiet beneath clear stars.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Rescuer from the Dark",
        text: "You defeated Calviana and brought Sylphie Generet safely home to Salzbach!",
        ending: { type: "true", title: "Breaker of the Tumultuous Dark", xp: 295, gold: 270, trophy: "Calviana's Cracked Obsidian Mirror" },
        choices: []
      }
    }
  }
});
