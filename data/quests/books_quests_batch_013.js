/* ============================================================
   BOOK QUESTS — BATCH 013 (13 Quests • All autoDiscover: false)
   Purely in-world subtitles & Inn rumor pool discovery.
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. THE NIGHT MESSENGERS (6 PAGES • LV 1)
  // ==========================================================
  bk_b13_night_messengers: {
    id: "bk_b13_night_messengers",
    title: "The Night Messengers",
    subtitle: "The Sable Forest & Road to Corremel",
    difficulty: "Easy",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Wounded Shadow-Road Courier (Rusty Flagon Tavern)",
    summary: "Take up a fallen courier's sacred badge as a deputy Night Messenger, navigate the treacherous forks of the Sable Forest past Doomsand and Witchlight snares, and deliver the sealed parcel safely to Corremel!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Sable Forest • First Fork",
        title: "A Courier's Sacred Oath",
        safeRetreat: true,
        text: "Clutching a silver-pinned dispatch satchel, a bleeding Night Messenger presses the wax-sealed parcel into your hands before collapsing beneath twilight pines. 'Take the road to Corremel,' he gasps. 'Beware the Doomsand Path and the shadow wolves stalking the forks!'",
        choices: [
          { t: "Read the faint silver courier-marks carved into the bark to avoid the Witchlight bog and Doomsand!", badge: "Survival DC 10", check: { stat: "spirit", skill: "Survival", dc: 10, pass: 2, fail: 2, passMsg: "You follow the secret courier trail straight past the sinking Doomsand!", failMsg: "Deceptive witchlights lure you straight into a hunting pack's ambush!" }, onPass: { cw: "COURIER_MARKS" } },
          { t: "Sprint down the Briar Path with lantern raised!", to: 2 }
        ]
      },
      2: {
        zone: "Sable Forest • Tertso's Stand",
        title: "Shadow Wolf Hunt",
        text: "Smoke-furred Shadow Wolves burst from the thorny undergrowth beside Sohana's Hollow, their glowing amber eyes fixed squarely on the Night Messenger's dispatch satchel!",
        enemy: { name: "Sable Shadow Wolves", desc: "Twilight-born pack hunters stalking the forest road.", hp: 20, ac: 11, atk: 4, dmg: 4, xp: 55, gold: 30, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["COURIER_MARKS"] },
        choices: [
          { t: "Push past the Third Fork toward the ancient Warding Circle!", to: 3 }
        ]
      },
      3: {
        zone: "Sable Forest • The Warding Circle",
        title: "The Waylayer at the Circle",
        text: "At the moonlit stones of the Warding Circle stands a hooded highway-fey flanked by thorny shadow hounds: 'Hand over the Corremel parcel, deputy, and walk away breathing!'",
        enemy: { name: "Sable Road Waylayer", desc: "Cunning shadow-road bandit hired to intercept the Night Messengers.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 50, items: ["bq_night_messenger_pin"], weakCw: ["COURIER_MARKS"] },
        choices: [
          { t: "Cross the Warding Circle onto the lantern-lit road to Corremel!", to: 4 }
        ]
      },
      4: {
        zone: "Gates of Corremel",
        title: "Delivery Fulfilled",
        text: "The Corremel courier-master breaks the intact seal with a grin of genuine respect, paying out the full hazard bounty and tending your scratches.",
        onEnter: { healHp: 8, msg: "Warm cider and courier-salve mend your wounds (+8 HP)!" },
        choices: [
          { t: "Accept the Night Messengers' gratitude.", to: 5 }
        ]
      },
      5: {
        zone: "Corremel Post-House",
        title: "Oath Kept",
        text: "Word spreads quickly along the dark roads: a new hero keeps the Night Messengers' sacred word.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Deputy of the Shadow Road",
        text: "You braved the Sable Forest and delivered the Night Messengers' parcel unbroken!",
        ending: { type: "true", title: "Sworn Night Messenger", xp: 105, gold: 95, trophy: "Silver Night Messenger Badge" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. HUNTERS OF THE TENEBROUS PLAIN (10 PAGES • LV 2)
  // ==========================================================
  bk_b13_tenebrous_plain: {
    id: "bk_b13_tenebrous_plain",
    title: "Hunters of the Tenebrous Plain",
    subtitle: "The River Lethe & Oma Rattenfanger's Orphans",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Grieving Frontier Parent (Rusty Flagon Tavern)",
    summary: "Cross the mist-choked Tenebrous Plain along the forgetful waters of the River Lethe, untie the stolen name-ribbons at the ferry-post, and rescue ten-year-old Mery from Oma Rattenfanger before loneliness turns her into an orphan of the black!",
    totalPages: 10,
    pages: {
      1: {
        zone: "Tenebrous Plain • Banks of the Lethe",
        title: "Lost Through the Cracks",
        safeRetreat: true,
        text: "Across the silver-grey grasses of the Tenebrous Plain glides the silent, forgetful River Lethe. Here, a grandmotherly fey named Oma Rattenfanger gathers lonely children—including ten-year-old Mery, sitting hollow-eyed beside a reed skiff—slowly turning them into 'orphans of the black.' Nearby, pale cloth ribbons flutter from a dead willow by an old stone ferry-post.",
        choices: [
          { t: "Offer Mery a warm keepsake from home so she remembers her real name despite Lethe's mist!", badge: "Persuasion / Spirit DC 11", check: { stat: "spirit", skill: "Persuasion", dc: 11, pass: 2, fail: 2, passMsg: "Tears clear Mery's eyes—she whispers the weakness of Oma's hunting hounds!", failMsg: "Oma's cold bell chimes across the plain, summoning her shadow pack!" }, onPass: { cw: "MERY_MEMORY" } },
          { t: "Inspect the fluttering cloth ribbons tied to the dead willow at the Ferry-Post.", to: 7 },
          { t: "Track the howling Shadow Beasts across Ash-Hollow to force Oma's hand!", to: 2 }
        ]
      },
      2: {
        zone: "Tenebrous Plain • Ash-Hollow",
        title: "Shadow Beast Hunt",
        text: "Gaunt, ink-black Shadow Beasts prowl out of the dry reeds with amber eyes, driven forward by the haunting, breathless whistle of Oma's iron reed pipe!",
        enemy: { name: "Tenebrous Shadow Beasts", desc: "Lithe twilight predators stalking the banks of the Lethe.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["MERY_MEMORY", "RIBBON_FREED"] },
        choices: [
          { t: "Creep behind Oma's cottage to inspect her glowing Lantern-Shed first.", to: 9 },
          { t: "Confront Oma Rattenfanger at her front hearth to claim Mery's freedom!", to: 3 }
        ]
      },
      3: {
        zone: "Oma's Cottage • The Black Hearth",
        title: "Oma Rattenfanger",
        text: "Her kindly grandmotherly smile splits into a jagged fey snarl as Oma Rattenfanger lifts her iron piper's crook: 'Ungrateful guests! Nobody comes looking for the lost ones—Mery belongs to the plain now!'",
        enemy: { name: "Oma Rattenfanger", desc: "Sinister fey kidnapper who feeds on lost children's loneliness.", hp: 32, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 65, items: ["bq_lethe_memory_locket"], weakCw: ["MERY_MEMORY", "RIBBON_FREED", "LAUGHS_FREED"] },
        choices: [
          { t: "Snap Oma's iron pipe and lead Mery safely back through the twilight veil!", to: 4 }
        ]
      },
      4: {
        zone: "Edge of the Mortal Road",
        title: "Homeward Bound",
        text: "As warm morning sunlight touches Mery's cheeks, the grey shadow-chill melts away and she laughs brightly for the first time in months.",
        onEnter: { healHp: 8, msg: "Morning warmth clears the Lethe's chill (+8 HP)!" },
        choices: [
          { t: "Escort Mery home and return the other unbound name-ribbons to Oakhaven's families!", reqCw: "RIBBON_FREED", badge: "RIBBON_FREED", to: 5, onChoose: { gold: 30, xp: 25, msg: "Grateful frontier families add 30 GP & 25 XP for returning the lost name-ribbons!" } },
          { t: "Escort Mery back to safety.", to: 5 },
          { t: "Slip Oma's silver keepsake-box from the hearth into your satchel before crossing back.", to: 10 }
        ]
      },
      5: {
        zone: "Oakhaven Border",
        title: "A Child Restored",
        text: "Tears of joy stream down her parents' faces at the town gate as relieved villagers press a heavy purse of silver into your palm.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Rescuer of the Lost",
        text: "You broke Oma Rattenfanger's iron pipe and brought Mery safely home from the Tenebrous Plain!",
        ending: { type: "true", title: "Breaker of the Black Piper", xp: 130, gold: 115, trophy: "Oma's Broken Reed Pipe" },
        choices: []
      },
      7: {
        zone: "Riverbank Ferry-Post",
        title: "The Ribbon-Tree of Names",
        text: "Dozens of pale cloth ribbons flutter from the dead willow beside the Lethe—each stitched in faded thread with a missing child's mortal name, held fast by cold fey knots.",
        choices: [
          { t: "Burn a pinch of bitter sweetgrass with Herbalism to clear the Lethe-mist!", reqSkill: "Herbalism", badge: "Herbalism", to: 8, onChoose: { msg: "Warm green smoke drifts through the boughs—every stitched name glows silver!" } },
          { t: "Unravel the cold fey binding-knots with Arcana.", badge: "Arcana DC 11", check: { stat: "arcana", skill: "Arcana", dc: 11, pass: 8, fail: 8, failDmg: 3, passMsg: "The fey knots loosen cleanly, freeing Mery's stitched name!", failMsg: "Frosty thread nips your fingertips (-3 HP), yet the knot gives way!" } },
          { t: "Leave the ferry-post and follow the beast tracks into Ash-Hollow.", to: 2 }
        ]
      },
      8: {
        zone: "Riverbank Ferry-Post",
        title: "The Unbound Ribbons",
        text: "You slip Mery's embroidered ribbon free along with 22 GP in old river-tolls left at the post, feeling the Lethe's numb chill lift from your bones (+6 HP, +3 MP). Beyond the reeds, a dry ditch circles straight behind Oma's cottage!",
        onEnter: { cw: "RIBBON_FREED", gold: 22, healHp: 6, healMp: 3, msg: "Freed RIBBON_FREED, found 22 GP, +6 HP & +3 MP!" },
        choices: [
          { t: "Follow the dry reed-ditch straight to Oma's Lantern-Shed (bypassing the beasts)!", to: 9 },
          { t: "Cross into Ash-Hollow to hunt down Oma's Shadow Beasts for their spoils.", to: 2 }
        ]
      },
      9: {
        zone: "Oma's Cottage • Lantern-Shed",
        title: "Jars of Stolen Laughter",
        text: "Behind the cottage hang three iron-stoppered glass jars pulsing softly with trapped childhood laughter, beside a small iron strongbox of hoarded fairy-coin.",
        choices: [
          { t: "Touch Mery's unbound ribbon to the jars to pop the iron stoppers cleanly!", reqCw: "RIBBON_FREED", badge: "RIBBON_FREED", to: 3, onChoose: { cw: "LAUGHS_FREED", msg: "Bright laughter chimes across the yard—shattering Oma's cold fey glamour!" } },
          { t: "Shatter the iron-bound jars with Firebolt!", reqSpell: "Firebolt", mp: 3, badge: "Firebolt (3 MP)", to: 3, onChoose: { cw: "LAUGHS_FREED", msg: "The jars burst in warm golden sparks—Oma shrieks as her stolen power fades!" } },
          { t: "Pick the iron strongbox padlock for Oma's hoarded coin!", badge: "Lockpicking / Agility DC 11", check: { stat: "agility", skill: "Lockpicking", dc: 11, pass: 3, fail: 3, failDmg: 3, passMsg: "You snag 35 GP and tip over the laugh-jars on your way inside!", failMsg: "A cold iron latch bites your knuckle (-3 HP) as Oma hears you!" }, onPass: { gold: 35, cw: "LAUGHS_FREED" } },
          { t: "Leave the shed and step straight around to the Black Hearth.", to: 3 }
        ]
      },
      10: {
        zone: "Epilogue",
        title: "Raider of the Black Hearth",
        text: "Mery runs safely into her parents' arms at the border road while your pack jingles with Oma Rattenfanger's hoarded fey silver!",
        ending: { type: "victory", title: "Raider of the Black Hearth", xp: 110, gold: 150, trophy: "Silver Memory-Ribbon" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. THE WEEPER IN SHADOW (6 PAGES • LV 3)
  // ==========================================================
  bk_b13_weeper_shadow: {
    id: "bk_b13_weeper_shadow",
    title: "The Weeper in Shadow",
    subtitle: "The Swallowed Village of Womford",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Shaken Woodsman (Rusty Flagon Tavern)",
    summary: "Step into the lost village of Womford—swallowed whole by a living, malicious fairy-tale wood—and confront the weeping horror that holds its vanished folk in perpetual twilight!",
    totalPages: 6,
    pages: {
      1: {
        zone: "The Living Wood • Womford Road",
        title: "Trees That Watch",
        safeRetreat: true,
        text: "Long ago, the thriving village of Womford vanished overnight—absorbed whole into a dreadful, living forest that hates every living soul who treads its roots. Ahead, lantern-lit cottages stand frozen in gloom while a heartbreaking sob echoes from the village green!",
        choices: [
          { t: "Listen closely to the weeping melody to separate the true village spirits from the wood's hungry illusions!", badge: "Perception DC 12", check: { stat: "spirit", skill: "Perception", dc: 12, pass: 2, fail: 2, passMsg: "You spot the grasping root-tendrils before they snare your ankles!", failMsg: "Black boughs whip down across the lane as shadow-husk villagers emerge!" }, onPass: { cw: "ROOT_SIGHT" } },
          { t: "March down Womford's silent cobbled lane with blade raised!", to: 2 }
        ]
      },
      2: {
        zone: "Womford Green • Frozen Cottages",
        title: "Briar Husks of Womford",
        text: "Twisted thorn-puppets wearing faded villagers' aprons lurch out of the darkened bakery and smithy, dragging barbed root-whips across the cobbles!",
        enemy: { name: "Briar Husks & Living Roots", desc: "Thorn-animated puppets of the swallowed village.", hp: 34, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["ROOT_SIGHT"] },
        choices: [
          { t: "Follow the echoing sobs into Womford's overgrown chapel!", to: 3 }
        ]
      },
      3: {
        zone: "Womford Chapel • The Weeping Altar",
        title: "The Weeper in Shadow",
        text: "Draped in black moss and tears of liquid shadow, the towering Weeper in Shadow rises from the ruined altar—its sorrowful shriek rattling every timber in the lost village!",
        enemy: { name: "The Weeper in Shadow", desc: "Malevolent spirit of grief binding Womford to the living wood.", hp: 42, ac: 14, atk: 6, dmg: 6, xp: 135, gold: 90, items: ["bq_womford_tear_pendant"], weakCw: ["ROOT_SIGHT"] },
        choices: [
          { t: "Shatter the shadow-root heart beneath the altar to free Womford's trapped spirits!", to: 4 }
        ]
      },
      4: {
        zone: "Womford Green • Lifting Mist",
        title: "Peace for the Lost",
        text: "The oppressive boughs recoil as pale ghostly townsfolk bow in silent gratitude and drift peacefully into the dawn light.",
        onEnter: { healHp: 10, msg: "A gentle spectral blessing restores your strength (+10 HP)!" },
        choices: [
          { t: "Gather the chapel's untouched silver offerings and leave the dark wood.", to: 5 }
        ]
      },
      5: {
        zone: "Forest Edge",
        title: "Silence in the Pines",
        text: "Behind you, the weeping stops at last.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Liberator of Womford",
        text: "You vanquished the Weeper in Shadow and granted Womford's lost souls their final rest!",
        ending: { type: "true", title: "Silencer of the Weeper", xp: 165, gold: 150, trophy: "Womford Silver Bell" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. A DEATH AMONG THE PALE ROSES (6 PAGES • LV 4)
  // ==========================================================
  bk_b13_pale_roses: {
    id: "bk_b13_pale_roses",
    title: "A Death Among the Pale Roses",
    subtitle: "Fey Murder Mystery • Court of Pale Roses",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Liveried Fey Herald (Rusty Flagon Tavern)",
    summary: "Step into the hushed, scheming Court of Pale Roses to investigate the shocking murder of Lady Vindesol's handmaid, untangle venomous fey courtier lies, and unmask the killer before the King's wrath falls!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Court of Pale Roses • Audience Chamber",
        title: "Silence in the Rose Hall",
        safeRetreat: true,
        text: "Wide-eyed fey courtiers in silver silk stand frozen in utter silence as the King summons you before the throne: Lady Vindesol's handmaid has been murdered in the moonlit conservatory, and every noble suspects a rival plot!",
        choices: [
          { t: "Examine the frost-rimmed thorn puncture on the handmaid's cloak before the courtiers disturb the scene!", badge: "Investigation DC 13", check: { stat: "arcana", skill: "Investigation", dc: 13, pass: 2, fail: 2, passMsg: "White-rose venom! Only one jealous lord carries thorns steeped in winter-bane!", failMsg: "Whispering courtiers mislead you straight into a hedge-maze ambush!" }, onPass: { cw: "THORN_PROOF" } },
          { t: "Question Lady Vindesol's rivals directly in the Moonlit Conservatory!", to: 2 }
        ]
      },
      2: {
        zone: "Moonlit Conservatory • Briar Maze",
        title: "Hired Fey Duelists",
        text: "Before you can present your findings to the throne, two masked shadow-fey duelists step out from behind the pale rose hedges with poisoned rapiers drawn!",
        enemy: { name: "Masked Rose-Court Duelists", desc: "Silken assassins sent to silence your investigation.", hp: 40, ac: 14, atk: 6, dmg: 6, xp: 125, gold: 70, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["THORN_PROOF"] },
        choices: [
          { t: "Storm back into the Rose Ballroom and accuse the true murderer before the King!", to: 3 }
        ]
      },
      3: {
        zone: "Court of Pale Roses • Grand Ballroom",
        title: "The Unmasked Conspirator",
        text: "Cornered by your evidence, the venomous court noble drops all pretense—conjuring a storm of razor-sharp pale rose petals and drawing an enchanted thorn-blade!",
        enemy: { name: "Lord of the Poisoned Rose", desc: "Treacherous fey noble behind the handmaid's assassination.", hp: 50, ac: 15, atk: 7, dmg: 7, xp: 170, gold: 115, items: ["bq_pale_rose_rapier"], weakCw: ["THORN_PROOF"] },
        choices: [
          { t: "Disarm the conspirator and present the proof to the King and Lady Vindesol!", to: 4 }
        ]
      },
      4: {
        zone: "Court of Pale Roses • Royal Dais",
        title: "Justice in the Fey Court",
        text: "The King pronounces swift exile upon the traitor while Lady Vindesol rewards your sharp eyes with a chest of moon-silver and courtly healing.",
        onEnter: { healHp: 10, msg: "Fey nectar restores your vigor (+10 HP)!" },
        choices: [
          { t: "Take your leave before the court's next intrigue begins.", to: 5 }
        ]
      },
      5: {
        zone: "Rose Gate",
        title: "Honored Guest",
        text: "The liveried herald bows low as you step back onto the mortal road.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Solver of the Rose-Court Murder",
        text: "You exposed the killer in the Court of Pale Roses and earned Lady Vindesol's lasting favor!",
        ending: { type: "true", title: "Investigator of Pale Roses", xp: 205, gold: 190, trophy: "Silver Rose Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. REFLECTIONS AND REMEMBRANCE (6 PAGES • LV 4)
  // ==========================================================
  bk_b13_reflections_remembrance: {
    id: "bk_b13_reflections_remembrance",
    title: "Reflections and Remembrance",
    subtitle: "Brightsigh Tower & The Blackwood Orchard",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Arborin Emissary (Rusty Flagon Tavern)",
    summary: "Traverse the undead-haunted Blackwood Forest to Brightsigh Tower—a spire built of jagged mirrored glass in a bitter cherry orchard—and break the ensorcelled stupor trapping Fultaris of Arborin!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Blackwood Forest • Bitter Cherry Orchard",
        title: "Spire of Jagged Glass",
        safeRetreat: true,
        text: "Deep inside the sunless Blackwood, bitter red-black cherries hang heavy around Brightsigh Tower—a gleaming spire built from jagged shards of mirrored glass. Inside sits Fultaris of Arborin, trapped in an endless magical stupor after foolishly paying the Queen of Night and Magic an unsolicited compliment!",
        choices: [
          { t: "Study the shifting mirror reflections along the orchard wall to spot the real doorway!", badge: "Arcana DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 2, fail: 2, passMsg: "You pierce the mirror-glamour and weaken the glass guardians inside!", failMsg: "Your own reflection steps out of the orchard glass with bared steel!" }, onPass: { cw: "MIRROR_INSIGHT" } },
          { t: "Shatter the glass vestibule lock and push into Brightsigh Tower!", to: 2 }
        ]
      },
      2: {
        zone: "Brightsigh Tower • Hall of Shards",
        title: "Blackwood Undead & Mirror Shades",
        text: "Restless Blackwood undead and razor-edged glass reflections peel themselves from the mirrored walls, slashing silently from every angle!",
        enemy: { name: "Mirror Shades & Blackwood Dead", desc: "Glass-born reflections and forest undead guarding the tower.", hp: 40, ac: 14, atk: 6, dmg: 6, xp: 125, gold: 70, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["MIRROR_INSIGHT"] },
        choices: [
          { t: "Climb the crystalline stair to Fultaris's ensorcelled study!", to: 3 }
        ]
      },
      3: {
        zone: "Brightsigh Tower • Summit Chamber",
        title: "The Queen's Mirror-Warden",
        text: "While Fultaris stares blankly into a silver basin, a towering crystalline Mirror-Warden left by the Queen of Night and Magic coalesces from swirling shards to guard his endless penance!",
        enemy: { name: "The Glass Mirror-Warden", desc: "Spell-reflecting construct enforcing the Queen's bitter curse.", hp: 50, ac: 15, atk: 7, dmg: 7, xp: 175, gold: 115, items: ["bq_brightsigh_glass_buckler"], weakCw: ["MIRROR_INSIGHT"] },
        choices: [
          { t: "Smash the enchanted basin and rouse Fultaris from his stupor!", to: 4 }
        ]
      },
      4: {
        zone: "Brightsigh Orchard • Clearing Mist",
        title: "Awakened Memory",
        text: "Blinking away years of magical fog, Fultaris thanks you profusely—swearing never to offer unsolicited compliments to fey queens again—and shares his saved coin.",
        onEnter: { healHp: 10, msg: "Fultaris brews a restorative cherry-bark draught (+10 HP)!" },
        choices: [
          { t: "Escort Fultaris safely out of the Blackwood.", to: 5 }
        ]
      },
      5: {
        zone: "Blackwood Border",
        title: "Out of the Looking-Glass",
        text: "Brightsigh Tower glitters quietly behind you, its curse broken.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Breaker of Brightsigh",
        text: "You shattered the Mirror-Warden and freed Fultaris of Arborin!",
        ending: { type: "true", title: "Shatterer of the Glass Curse", xp: 205, gold: 190, trophy: "Brightsigh Mirror Shard" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. BIG BRIAR'S BLESSINGS (6 PAGES • LV 5)
  // ==========================================================
  bk_b13_big_briar: {
    id: "bk_b13_big_briar",
    title: "Big Briar's Blessings",
    subtitle: "The Swine-Cursed Village of Leer",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Whispering Peddler from Leer (Rusty Flagon Tavern)",
    summary: "Investigate the unsettling umbral village of Leer—where the folk snort like swine and the pigs look eerily human—and confront the monstrous fey 'Big Briar' when her trollstone heralds her demand for offerings!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Village of Leer • Muddy Square",
        title: "Pigs with Human Eyes",
        safeRetreat: true,
        text: "Something is deeply wrong in Leer: the snorting townsfolk have unsettlingly porcine faces, while three penned pigs stare at you with desperate, unmistakably human eyes! A mossy trollstone has just appeared in the square—heralding the arrival of 'Big Briar' to claim her 'presents'!",
        choices: [
          { t: "Inspect the mossy trollstone to disrupt Big Briar's summoning ward before sunset!", badge: "Arcana DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 2, fail: 2, passMsg: "You scrape away the fey binding runes, weakening Big Briar's thorny hide!", failMsg: "The trollstone pulses green as enraged village brutes rush to defend their 'blessing'!" }, onPass: { cw: "TROLLSTONE_CRACKED" } },
          { t: "Break open the pig-pen gate and stand between the cursed captives and the dark woods!", to: 2 }
        ]
      },
      2: {
        zone: "Leer Village • The Briar Hedge",
        title: "Thorn-Brutes of the Trollstone",
        text: "Snorting umbral cultists and twisted bramble-hounds charge out of the muddy alleyways, determined to keep Big Briar fed!",
        enemy: { name: "Leer Cultists & Bramble Hounds", desc: "Fey-touched villagers and thorny beasts guarding the offerings.", hp: 46, ac: 14, atk: 6, dmg: 7, xp: 145, gold: 80, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["TROLLSTONE_CRACKED"] },
        choices: [
          { t: "Face the towering fey horror Big Briar as she crashes out of the brambles!", to: 3 }
        ]
      },
      3: {
        zone: "Leer Square • The Trollstone Circle",
        title: "Big Briar Arrives",
        text: "Wreathed in barbed vines and reeking of dark loam, monstrous fey hag-troll Big Briar stomps into the square, licking her crooked fangs: 'Where are my sweet little piggies?!'",
        enemy: { name: "Big Briar", desc: "Hulking, thorny fey monstrosity feasting on transformed villagers.", hp: 58, ac: 14, atk: 7, dmg: 8, xp: 205, gold: 135, items: ["bq_big_briar_trollstone"], weakCw: ["TROLLSTONE_CRACKED"] },
        choices: [
          { t: "Shatter the mossy trollstone to break Big Briar's transformation curse!", to: 4 }
        ]
      },
      4: {
        zone: "Leer Village • Breaking Dawn",
        title: "The Curse Lifts",
        text: "With a crack like thunder, the trollstone splits! The three penned pigs shimmer back into weeping human travelers, and the villagers' monstrous spell breaks.",
        onEnter: { healHp: 12, msg: "The freed travelers tend your thorn-wounds (+12 HP)!" },
        choices: [
          { t: "Accept the grateful survivors' saved silver.", to: 5 }
        ]
      },
      5: {
        zone: "Outskirts of Leer",
        title: "No More Offerings",
        text: "The twisted brambles wither into ordinary mud as Leer wakes from its nightmare.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Bane of Big Briar",
        text: "You slew Big Briar, broke the trollstone, and restored the cursed captives of Leer!",
        ending: { type: "true", title: "Breaker of Big Briar's Curse", xp: 245, gold: 225, trophy: "Shattered Trollstone Core" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. THE LOST TREASURE OF PALETREE RISE (6 PAGES • LV 5)
  // ==========================================================
  bk_b13_paletree_rise: {
    id: "bk_b13_paletree_rise",
    title: "The Lost Treasure of Paletree Rise",
    subtitle: "The Whispering Plains & Shuttered Tower",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Scholar of the Shuttered Tower (Rusty Flagon Tavern)",
    summary: "Follow an ancient Melgros treatise from the cloistered scholars of the Shuttered Tower into the monster-haunted hills of Paletree Rise—braving prowling manticores and dusk-trumpeting horrors to claim the buried vault!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Whispering Plains • Paletree Rise",
        title: "Trumpets at Dusk",
        safeRetreat: true,
        text: "North of Corremel rise the jagged rocky hills of Paletree Rise, shunned by travelers for prowling manticores, dancing shadows, and eerie trumpeting cries at dusk. Armed with a lost treatise from the Shuttered Tower, you ascend toward the ancient Melgros cairn!",
        choices: [
          { t: "Use the Shuttered Tower treatise to read the star-carved trail markers and bypass the manticore's cliff-nest!", badge: "History DC 13", check: { stat: "arcana", skill: "History", dc: 13, pass: 2, fail: 2, passMsg: "The old Melgros glyphs reveal a sheltered ridge path above the manticore!", failMsg: "Loose shale tumbles down the cliff, drawing a roaring shadow-manticore!" }, onPass: { cw: "MELGROS_MAP" } },
          { t: "Climb boldly up the pale-tree ridge with weapon ready!", to: 2 }
        ]
      },
      2: {
        zone: "Paletree Rise • Jagged Crags",
        title: "Shadow-Touched Manticore",
        text: "A winged, tail-spiked Manticore with eyes like embers swoops out of the twilight sky, unleashing a volley of iron-hard quills across the rocks!",
        enemy: { name: "Shadow-Touched Manticore", desc: "Ferocious winged predator hunting the crags of Paletree Rise.", hp: 48, ac: 14, atk: 7, dmg: 7, xp: 155, gold: 85, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["MELGROS_MAP"] },
        choices: [
          { t: "Enter the sunken stone vault beneath the withered pale tree!", to: 3 }
        ]
      },
      3: {
        zone: "Melgros Vault • The Echoing Hall",
        title: "Guardian of Paletree Rise",
        text: "Eerie brass-like trumpeting shakes the stone vault as the ancient shadow-guardian of Melgros rises from its gilded sarcophagus to defend the lost treasure!",
        enemy: { name: "The Trumpeting Vault-Warden", desc: "Resonant shadow-construct guarding Melgros's buried hoard.", hp: 58, ac: 15, atk: 7, dmg: 8, xp: 210, gold: 145, items: ["bq_melgros_vault_circlet"], weakCw: ["MELGROS_MAP"] },
        choices: [
          { t: "Claim the Melgros relics and carry word back to the Shuttered Tower!", to: 4 }
        ]
      },
      4: {
        zone: "The Shuttered Tower",
        title: "Scholars' Reward",
        text: "The cloistered scholars marvel at the intact Melgros artifacts, paying out a generous research bounty.",
        onEnter: { healHp: 12, msg: "Tower apothecaries tend your quill-wounds (+12 HP)!" },
        choices: [
          { t: "Collect your gold and depart the Whispering Plains.", to: 5 }
        ]
      },
      5: {
        zone: "Queen's Wood Border",
        title: "Secrets Unearthed",
        text: "At dusk, Paletree Rise falls quiet at last.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Finder of Paletree Rise",
        text: "You conquered Paletree Rise and recovered the lost treasure of Melgros!",
        ending: { type: "true", title: "Seeker of Paletree Rise", xp: 245, gold: 235, trophy: "Gilded Melgros Treatise" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. THE HORN OF REVELS (6 PAGES • LV 6)
  // ==========================================================
  bk_b13_horn_revels: {
    id: "bk_b13_horn_revels",
    title: "The Horn of Revels",
    subtitle: "Palace of Wine and Roses & The Wereboar Tusks",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Exiled Revelry Bard (Rusty Flagon Tavern)",
    summary: "Infiltrate the ruined fey palace of the Court of Wine and Roses—now seized by barrel-chested wereboar Fergus ap Hywell and his Tusk raiders—and recover the enchanted Horn of Revels!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Court of Wine and Roses • Ruined Vineyard",
        title: "A Palace Overrun",
        safeRetreat: true,
        text: "Once famed for divine vintages and endless music, the abandoned palace of the Court of Wine and Roses now echoes with drunken roars! A ruthless gang called the Tusks—led by the hulking wereboar Fergus ap Hywell—has claimed the halls and the priceless Horn of Revels!",
        choices: [
          { t: "Slip through the overgrown wine-cellar grates while the Tusks feast in the courtyard!", badge: "Stealth DC 14", check: { stat: "agility", skill: "Stealth", dc: 14, pass: 2, fail: 2, passMsg: "You bypass the outer lookouts and spike their reserve casks!", failMsg: "Snuffling boar-guards catch your scent by the cellar stairs!" }, onPass: { cw: "CELLAR_ENTRY" } },
          { t: "Crash straight through the rose-draped banquet doors!", to: 2 }
        ]
      },
      2: {
        zone: "Palace of Wine • Sunken Banquet Hall",
        title: "The Tusk Raiders",
        text: "Overturning silver wine-tables, burly Tusk brigands and snarling tusked hounds charge across the stained marble!",
        enemy: { name: "The Tusk Raiders", desc: "Brutal bandits and war-boars occupying the fey palace.", hp: 52, ac: 14, atk: 7, dmg: 8, xp: 185, gold: 105, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["CELLAR_ENTRY"] },
        choices: [
          { t: "Ascend to the shattered Music Balcony where Fergus holds the Horn of Revels!", to: 3 }
        ]
      },
      3: {
        zone: "Palace of Wine • The Music Balcony",
        title: "Fergus ap Hywell",
        text: "Bristling into monstrous hybrid form, barrel-chested wereboar Fergus ap Hywell blows a deafening note on the golden Horn of Revels and charges with wicked ivory tusks!",
        enemy: { name: "Fergus ap Hywell, Wereboar Chief", desc: "Ferocious wereboar warlord wielding the enchanted Horn of Revels.", hp: 66, ac: 15, atk: 8, dmg: 9, xp: 255, gold: 165, items: ["bq_horn_of_revels_charm"], weakCw: ["CELLAR_ENTRY"] },
        choices: [
          { t: "Wrest the Horn of Revels from Fergus's grasp and drive the Tusks out!", to: 4 }
        ]
      },
      4: {
        zone: "Vineyard Terrace",
        title: "Music Restored",
        text: "A single pure chord from the Horn sends the remaining raiders fleeing into the twilight, and the exiled bard weeps with joy.",
        onEnter: { healHp: 14, msg: "A goblet of vintage fey wine restores your vigor (+14 HP)!" },
        choices: [
          { t: "Claim your reward from the grateful courtier.", to: 5 }
        ]
      },
      5: {
        zone: "Rose Archway",
        title: "Last Toast",
        text: "Gentle music lingers in the vines as you depart.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Reclaimer of the Horn",
        text: "You toppled Fergus ap Hywell and reclaimed the Horn of Revels!",
        ending: { type: "true", title: "Champion of Wine and Roses", xp: 295, gold: 265, trophy: "Gilded Grapevine Chalice" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. THE SODALITY OF SILENT RITES (6 PAGES • LV 6)
  // ==========================================================
  bk_b13_silent_rites: {
    id: "bk_b13_silent_rites",
    title: "The Sodality of Silent Rites",
    subtitle: "Corremel Shadows & The Stolen Winter Relic",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "King Marrow's Envoy Pritha (Rusty Flagon Tavern)",
    summary: "Take up a discreet commission from King Marrow's envoy Pritha to track a stolen statue of the fallen Winter Court through Corremel and break into the hidden sanctum of the Sodality of Silent Rites!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Corremel • Whispering Quarter",
        title: "A Discreet Commission",
        safeRetreat: true,
        text: "Pritha explains quietly that an esoteric relic once guarded by the Winter Court's Order of the Sovereign's Circle has been stolen and smuggled into Corremel. Because King Marrow lacks the Black Prince's favor, you must recover the statue without alerting the city's rival courts!",
        choices: [
          { t: "Follow the frost-etched sigils along Corremel's silent alleys to locate the Sodality's secret vault!", badge: "Investigation DC 14", check: { stat: "arcana", skill: "Investigation", dc: 14, pass: 2, fail: 2, passMsg: "You slip past the Sodality's silent bells into their rear cloister!", failMsg: "Hooded initiates spot you at the threshold and strike without a word!" }, onPass: { cw: "SILENT_ENTRY" } },
          { t: "Force the iron postern gate into the Sodality's candlelit chapel!", to: 2 }
        ]
      },
      2: {
        zone: "Sodality Cloister • Hall of Vows",
        title: "Silent Initiates",
        text: "Masked initiates of the Sodality of Silent Rites glide across the flagstones—fighting in eerie, spell-enforced silence with curved shadow-knives!",
        enemy: { name: "Sodality Silent Initiates", desc: "Disciplined shadow-monks sworn to guard forbidden Winter secrets.", hp: 54, ac: 15, atk: 7, dmg: 8, xp: 190, gold: 110, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["SILENT_ENTRY"] },
        choices: [
          { t: "Descend into the frost-rimmed reliquary where the Sodality Master channels the stolen statue!", to: 3 }
        ]
      },
      3: {
        zone: "Sodality Reliquary • Sovereign's Circle",
        title: "Master of Silent Rites",
        text: "Before the glowing Winter Court statue stands the gaunt Master of Silent Rites, weaving frost-veined shadow magic to unlock the Moonlit King's buried power!",
        enemy: { name: "Master of Silent Rites", desc: "Esoteric shadow-mage commanding winter-forged wards.", hp: 68, ac: 15, atk: 8, dmg: 9, xp: 265, gold: 170, items: ["bq_sovereign_circle_ring"], weakCw: ["SILENT_ENTRY"] },
        choices: [
          { t: "Secure the stolen Winter statue and slip back out into Corremel's fog!", to: 4 }
        ]
      },
      4: {
        zone: "Corremel • Hidden Rendezvous",
        title: "King Marrow's Thanks",
        text: "Pritha inspects the unharmed statue with quiet awe and counts out the full 500-gold bonus in heavy shadow-minted coin.",
        onEnter: { healHp: 14, msg: "Pritha's restorative tonic mends your wounds (+14 HP)!" },
        choices: [
          { t: "Part ways before the Black Prince's spies catch wind.", to: 5 }
        ]
      },
      5: {
        zone: "Corremel Gate",
        title: "Unspoken Debt",
        text: "King Marrow remembers those who keep silent counsel.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Keeper of the Silent Relic",
        text: "You outmatched the Sodality of Silent Rites and returned the Winter Court statue intact!",
        ending: { type: "true", title: "Envoy of the Sovereign's Circle", xp: 295, gold: 280, trophy: "Frost-Etched Sovereign Medallion" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. THE HOUSE OF RECIPROCITIES (6 PAGES • LV 7)
  // ==========================================================
  bk_b13_house_reciprocities: {
    id: "bk_b13_house_reciprocities",
    title: "The House of Reciprocities",
    subtitle: "Shadow Crossroads & Urshaka's Pilgrimage",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Bearfolk Shaman Urshaka (Rusty Flagon Tavern)",
    summary: "Aid bearfolk shaman Urshaka along the shadow-road crossroads between Veiled Grove and Solvheim, enter the sinister House of Reciprocities, and break the cruel fey debt trapping her pilgrim family!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Crossroads Market • Urshaka's Tent",
        title: "A Debt of Light",
        safeRetreat: true,
        text: "En route to the Moonlit Glades, bearfolk shaman Urshaka's family took shelter at a gleaming manor called the House of Reciprocities—where every kindness carries a crushing, twisted fey price! She begs you to enter the manor and break their unfair contract!",
        choices: [
          { t: "Study the fine print of the House's hospitality ledgers to find a legal loophole in the fey bargain!", badge: "Lore DC 14", check: { stat: "arcana", skill: "Lore", dc: 14, pass: 2, fail: 2, passMsg: "You spot a broken hospitality clause that strips the manor's wardens of half their protection!", failMsg: "The smiling steward snaps the ledger shut and summons the debt-collectors!" }, onPass: { cw: "LEDGER_LOOPHOLE" } },
          { t: "Stride through the lantern-lit foyer and demand the bearfolk's release!", to: 2 }
        ]
      },
      2: {
        zone: "House of Reciprocities • Parlor of Scales",
        title: "The Debt-Collectors",
        text: "Porcelain-masked servants carrying weighted brass scales glide out of the tapestries to collect 'payment in blood and light'!",
        enemy: { name: "Manor Debt-Collectors", desc: "Porcelain-masked fey enforcers wielding weighted chains.", hp: 58, ac: 15, atk: 8, dmg: 9, xp: 225, gold: 130, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["LEDGER_LOOPHOLE"] },
        choices: [
          { t: "Break into the Vault of Contracts where the House's Mistress holds Urshaka's kin!", to: 3 }
        ]
      },
      3: {
        zone: "House of Reciprocities • Vault of Contracts",
        title: "Mistress of Reciprocities",
        text: "Surrounded by glowing jars of stolen memories and light, the towering Mistress of Reciprocities tips her golden balance: 'Nothing is free beneath my roof, brightlander!'",
        enemy: { name: "Mistress of Reciprocities", desc: "Ruthless fey broker who enslaves travelers through twisted debts.", hp: 72, ac: 16, atk: 9, dmg: 10, xp: 300, gold: 190, items: ["bq_urshaka_light_totem"], weakCw: ["LEDGER_LOOPHOLE"] },
        choices: [
          { t: "Burn the blood-ink ledger and lead Urshaka's family back to the crossroads!", to: 4 }
        ]
      },
      4: {
        zone: "Crossroads • Moonlit Glades Trail",
        title: "Pilgrimage Resumed",
        text: "Tears streaming through her fur, Urshaka embraces her freed kin and blesses your gear with the sacred light of the bearfolk druids.",
        onEnter: { healHp: 14, msg: "Urshaka's ancestral blessing mends your wounds (+14 HP)!" },
        choices: [
          { t: "Accept the tribe's heartfelt gratitude and gift of gold.", to: 5 }
        ]
      },
      5: {
        zone: "Shadow Crossroads",
        title: "All Debts Paid",
        text: "Behind you, the House of Reciprocities closes its doors in bitter silence.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Breaker of Cruel Bargains",
        text: "You shattered the House of Reciprocities' ledger and freed Urshaka's family!",
        ending: { type: "true", title: "Redeemer of the Crossroads", xp: 340, gold: 295, trophy: "Golden Scale of Reciprocity" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. AMONG THE SHADES AND SHADOWS (6 PAGES • LV 7)
  // ==========================================================
  bk_b13_shades_shadows: {
    id: "bk_b13_shades_shadows",
    title: "Among the Shades and Shadows",
    subtitle: "Corremel's Pluming Lantern & Stolen Memories",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Bewildered Noble Eldreth Umbril (Rusty Flagon Tavern)",
    summary: "Follow fragments of song, oil paint, and wine across Corremel's Horn Gate Inn and the Pluming Lantern Pleasure Salon to recover noble Eldreth Umbril's stolen memories from insidious dream-thieves!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Corremel • The Horn Gate Inn",
        title: "Fragments of a Forgotten Song",
        safeRetreat: true,
        text: "Gentle shadow-fey lord Eldreth Umbril can barely recall his own life—only a woman's lute melody, the scent of oil paints, and two enigmatic strangers he met at the Pluming Lantern Pleasure Salon. Something has been siphoning his mind night by night!",
        choices: [
          { t: "Trace the hummed lute melody at the Horn Gate Inn to pinpoint which patron is a dream-thief in disguise!", badge: "Perception DC 14", check: { stat: "spirit", skill: "Perception", dc: 14, pass: 2, fail: 2, passMsg: "You catch the faint violet shimmer of stolen memories leaking from a velvet lantern!", failMsg: "The dream-thieves sense your probing and unleash nightmare hounds in the salon!" }, onPass: { cw: "MELODY_CLUE" } },
          { t: "March straight into the Pluming Lantern Pleasure Salon to confront the mysterious pair!", to: 2 }
        ]
      },
      2: {
        zone: "Pluming Lantern • Velvet Parlor",
        title: "Shades of the Salon",
        text: "Perfumed smoke twists into razor-clawed Nightmare Shades as the salon's velvet curtains slam shut behind you!",
        enemy: { name: "Velvet Nightmare Shades", desc: "Memory-fed apparitions guarding the Pluming Lantern's back rooms.", hp: 60, ac: 15, atk: 8, dmg: 9, xp: 230, gold: 135, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["MELODY_CLUE"] },
        choices: [
          { t: "Kick open the gilded memory-vault where the two Dream-Thieves feast on Eldreth's past!", to: 3 }
        ]
      },
      3: {
        zone: "Pluming Lantern • Memory Vault",
        title: "The Two Dream-Thieves",
        text: "Surrounded by glowing glass bottles filled with stolen laughter and song, the twin Dream-Thieves lash out with psychic blades: 'His memories taste far too sweet to return!'",
        enemy: { name: "The Twin Dream-Thieves", desc: "Insidious mind-predators harvesting noble memories in Corremel.", hp: 74, ac: 16, atk: 9, dmg: 10, xp: 310, gold: 195, items: ["bq_pluming_lantern_charm"], weakCw: ["MELODY_CLUE"] },
        choices: [
          { t: "Uncork the glowing memory-vials to restore Eldreth Umbril's mind!", to: 4 }
        ]
      },
      4: {
        zone: "Umbril Estate • Studio",
        title: "Remembrance Restored",
        text: "As silver motes swirl back into Eldreth's eyes, he laughs with tears of joy—remembering every song, friend, and painting—and rewards you handsomely from his family vault.",
        onEnter: { healHp: 14, msg: "Peaceful music and fine wine restore your vigor (+14 HP)!" },
        choices: [
          { t: "Bid Lord Umbril farewell.", to: 5 }
        ]
      },
      5: {
        zone: "Corremel Promenade",
        title: "Clear Skies of the Mind",
        text: "The Pluming Lantern's dark harvest is ended.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Restorer of Memories",
        text: "You defeated the Dream-Thieves and returned Eldreth Umbril's stolen past!",
        ending: { type: "true", title: "Warden of Stolen Dreams", xp: 345, gold: 300, trophy: "Eldreth's Gilded Lute Pin" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 12. THE TIME-TWISTER'S DAUGHTER (6 PAGES • LV 7)
  // ==========================================================
  bk_b13_time_twister: {
    id: "bk_b13_time_twister",
    title: "The Time-Twister's Daughter",
    subtitle: "Shattered Oshragora & The Temporal Vault",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Chronomancer's Clockwork Messenger (Rusty Flagon Tavern)",
    summary: "Enter the time-ravaged ruins of Oshragora—ripped from the mortal plane by temporal storms—dodge blinking timelines, and rescue the sealed chronomancer's daughter before her vault collapses!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Ruins of Oshragora • Temporal Splinter",
        title: "A City Frozen in Storms",
        safeRetreat: true,
        text: "Raindrops hang motionless in midair over shattered marble streets! When Oshragora's time-wards failed, its greatest architect transferred his chronomantic mastery to his youngest daughter and sealed her in an inner vault. Now chaotic temporal storms are tearing the vault apart!",
        choices: [
          { t: "Attune your breathing to the flickering timeline-pulses so the blur-storms don't disorient you!", badge: "Arcana DC 15", check: { stat: "arcana", skill: "Arcana", dc: 15, pass: 2, fail: 2, passMsg: "You step cleanly between the blinking timelines, catching the time-stalkers flat-footed!", failMsg: "A wave of reversed seconds slams into you as temporal predators materialize!" }, onPass: { cw: "CHRONO_STEP" } },
          { t: "Dash straight through the shimmering ruins toward the sealed vault spire!", to: 2 }
        ]
      },
      2: {
        zone: "Oshragora • Clockwork Plaza",
        title: "Temporal Stalkers",
        text: "Flickering in and out of two timelines at once, jagged hourglass-constructs and time-warped hounds lunge to devour anyone carrying mortal time!",
        enemy: { name: "Oshragora Temporal Stalkers", desc: "Blinking chrono-beasts born from Oshragora's shattered wards.", hp: 60, ac: 15, atk: 8, dmg: 9, xp: 235, gold: 140, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["CHRONO_STEP"] },
        choices: [
          { t: "Breach the fracturing doors of the Architect's Temporal Vault!", to: 3 }
        ]
      },
      3: {
        zone: "Architect's Vault • The Pendulum Core",
        title: "The Paradox Sentinel",
        text: "Inside the vault, the architect's daughter strains to hold the collapsing wards as a towering Paradox Sentinel—corrupted by centuries of storm-echoes—strikes with twin scythes of frozen light!",
        enemy: { name: "The Paradox Sentinel", desc: "Corrupted chronomantic guardian swinging blades of fractured time.", hp: 74, ac: 16, atk: 9, dmg: 10, xp: 315, gold: 200, items: ["bq_oshragora_hourglass"], weakCw: ["CHRONO_STEP"] },
        choices: [
          { t: "Stabilize the vault-stone and escort the Time-Twister's daughter to safety!", to: 4 }
        ]
      },
      4: {
        zone: "Edge of the Splinter",
        title: "Second Chances",
        text: "With a graceful twist of her silver astrolabe, the chronomancer's daughter rewinds your bruises and rewards you with ancient Oshragoran gold.",
        onEnter: { healHp: 15, msg: "A touch of gentle time-magic rewinds your wounds (+15 HP)!" },
        choices: [
          { t: "Step back into the steady flow of the mortal world.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Road",
        title: "Time Flows True",
        text: "The rain falls normally once more as Oshragora's heir begins a new life.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Savior of Oshragora's Heir",
        text: "You braved the temporal storms and rescued the Time-Twister's daughter!",
        ending: { type: "true", title: "Walker Between Seconds", xp: 350, gold: 305, trophy: "Oshragoran Brass Astrolabe" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 13. RADIANCE LOST (6 PAGES • LV 8)
  // ==========================================================
  bk_b13_radiance_lost: {
    id: "bk_b13_radiance_lost",
    title: "Radiance Lost",
    subtitle: "The Vanished Palace of the Sun King",
    difficulty: "Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Black Silk Bag & Sealed Letter (Rusty Flagon Tavern)",
    summary: "Answer a mysterious black-silk invitation to escort a scholar into the long-vanished Shadow Realm palace of the grieving Sun King—confronting eclipse-twisted guardians to recover his lost solar radiance!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Shadow Realm • Approach to the Sun Palace",
        title: "Palace of Grief",
        safeRetreat: true,
        text: "Over a thousand years ago, after imprisoning his cruel beloved—the Dusk Queen—the heartbroken Sun King built a gleaming golden palace in the Shadow Realm and vanished inside. Now your mysterious patron has uncovered its veiled gates, pulsing with eclipsed golden fire!",
        choices: [
          { t: "Align the tarnished solar mirrors along the colonnade to banish the eclipse-gloom guarding the inner hall!", badge: "Arcana DC 15", check: { stat: "arcana", skill: "Arcana", dc: 15, pass: 2, fail: 2, passMsg: "Golden sunbeams lance through the gloom, searing the eclipsed sentinels!", failMsg: "The dark mirrors flare black, awakening the palace's corrupted solar wardens!" }, onPass: { cw: "SOLAR_BEAM" } },
          { t: "Escort your patron straight through the golden eclipse-doors!", to: 2 }
        ]
      },
      2: {
        zone: "Sun Palace • Hall of Eclipsed Gold",
        title: "Eclipsed Solar Sentinels",
        text: "Burnished golden armor animated by bitter grief marches down the grand stair, blades blazing with cold black-gold flame!",
        enemy: { name: "Eclipsed Solar Sentinels", desc: "Corrupted golden palace guards burning with dark eclipse fire.", hp: 66, ac: 16, atk: 8, dmg: 10, xp: 265, gold: 155, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["SOLAR_BEAM"] },
        choices: [
          { t: "Enter the Sun King's Sanctum where the trapped Heart of Radiance flickers!", to: 3 }
        ]
      },
      3: {
        zone: "Sun Palace • Throne of the Lost Sun",
        title: "The Shade of Grief",
        text: "Crowning the empty golden throne looms a towering manifestation of the Sun King's undying sorrow—wielding a blazing greatsword of eclipsed sunlight!",
        enemy: { name: "Avatar of the Eclipsed Sun", desc: "Incarnate grief of the vanished Sun King guarding his final radiance.", hp: 82, ac: 16, atk: 9, dmg: 11, xp: 355, gold: 225, items: ["bq_sun_king_radiant_crest"], weakCw: ["SOLAR_BEAM"] },
        choices: [
          { t: "Purify the Heart of Radiance and release the Sun King's thousand-year sorrow!", to: 4 }
        ]
      },
      4: {
        zone: "Sun Palace • Sunlit Courtyard",
        title: "Dawn Rekindled",
        text: "Pure golden warmth floods the Shadow Realm courtyard! Your patron bows in awe and presents the promised sack of ancient sun-minted sovereigns.",
        onEnter: { healHp: 16, msg: "Pure solar radiance heals every scar (+16 HP)!" },
        choices: [
          { t: "Step out of the gleaming palace before the mists close once more.", to: 5 }
        ]
      },
      5: {
        zone: "Twilight Veil",
        title: "A Warm Horizon",
        text: "Even in the darkest shadows, a spark of the Sun King's light endures.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Restorer of Lost Radiance",
        text: "You quieted the Sun King's grief and brought his golden radiance back to the light!",
        ending: { type: "true", title: "Bearer of the Lost Sun", xp: 395, gold: 345, trophy: "Sun King's Golden Laurel" },
        choices: []
      }
    }
  }
});
