/* ============================================================
   CHRONICLES OF OAKHAVEN — BOOK QUESTS BATCH 023
   10 standalone adventures (Lv 1 – Lv 7)
   All quests use autoDiscover: false (Inn Rumor Pool).
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. THE ADORATION OF QUOLO (8 PAGES • LV 5)
  // ==========================================================
  bk_b23_adoration_quolo: {
    id: "bk_b23_adoration_quolo",
    title: "The Adoration of Quolo",
    subtitle: "Dawnshore Village & The False Wizard's Tower",
    difficulty: "Medium",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "The seaside fisherfolk of Dawnshore worship their resident mage Quolo for heroic deeds no one can quite agree on—uncover the memory-curse radiating from his southern tower!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Dawnshore Village",
        title: "Our Wizard Is the Best Wizard",
        safeRetreat: true,
        text: "Salty sea-breezes blow across Dawnshore's piers as cheerful fisherfolk press warm mugs of cider into your hands and brag about Quolo, the 'legendary mage' in the southern tower. Yet a quiet hedge-healer pulls you aside: 'Every morning the village wakes with new memories of Quolo saving them—and every night I have to cast a ward just to keep my own mind clear.'",
        choices: [
          { t: "Question the villagers gently to map out the contradictions in their memories.", badge: "Persuasion / Spirit DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 2, fail: 3, passMsg: "You trace the nightly memory-pulses directly to a hidden cellar beneath Quolo's tower!", failMsg: "Enthusiastic townsfolk sweep you toward Quolo's celebratory beach-feast instead!" }, onPass: { cw: "MEMORY_PULSE_TRACED" } },
          { t: "Slip along the rocky cliffs toward the base of Quolo's southern tower at dusk.", badge: "Stealth / Agility DC 13", check: { stat: "agility", skill: "Stealth", dc: 13, pass: 2, fail: 3, passMsg: "You slip past the singing revelers and pry open the tower's seaward cellar grate!", failMsg: "A drunken sentry spots you and rings the bell outside the tower gate!" }, onPass: { cw: "TOWER_INFILTRATED" } },
          { t: "March straight up to the tower's front steps and demand answers from Quolo.", to: 3 }
        ]
      },
      2: {
        zone: "Quolo's Trophy Chamber",
        title: "Stolen Valor & Getaway Packs",
        text: "Inside the middle floor, shelves groan under gifts from adoring villagers—beside a stuffed leather getaway pack hidden under a workbench. A half-burned journal boasts of binding an undead angatra below to power a nightly charm over Dawnshore!",
        onEnter: { healHp: 8, msg: "You swipe two healing draughts from Quolo's getaway pack (+8 HP)!" },
        choices: [
          { t: "Descend the spiral stair into the cellar lab where twisted experiments stir.", to: 4 },
          { t: "Smash the crystal focus on the workbench to weaken Quolo's memory-wards!", badge: "Arcana / Strength DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 4, fail: 4, passMsg: "The crystal shatters in a shower of blue sparks—Quolo's wards crumble below!", failMsg: "Arcane static singes your knuckles, alerting the guards downstairs!" }, onPass: { cw: "FOCUS_SHATTERED" } }
        ]
      },
      3: {
        zone: "Tower Courtyard",
        title: "The Uninvited Guest",
        text: "Lanterns flicker along the sea-wall as Quolo's charmed watchmen and a stitched arcane construct step between you and the cellar door, eyes glassy with enchanted devotion!",
        enemy: { name: "Quolo's Charmed Experiments", desc: "Twitching arcane constructs and bewitched guardians defending the false wizard's cellar.", hp: 46, ac: 14, atk: 6, dmg: 8, xp: 110, gold: 55, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1 },
        choices: [
          { t: "Press down the damp cellar steps toward the chanting.", to: 4 }
        ]
      },
      4: {
        zone: "Seaward Cellar",
        title: "The Freed Spirits",
        text: "In the brine-slick laboratory below, bound spirits whisper from cracked glass jars around a glowing memory-loom. As you shatter their silver seals, their grateful radiance washes over you before they vanish into the sea-air!",
        onEnter: { healHp: 10, msg: "The freed spirits bless your blade and restore +10 HP!" },
        choices: [
          { t: "Kick open the iron sanctum door where Quolo and the bound angatra wait!", to: 5 },
          { t: "[Turn Undead] Channel radiant power into the cellar to stagger the bound angatra!", reqSpell: "Turn Undead", to: 5 }
        ]
      },
      5: {
        zone: "The Memory Ziggurat",
        title: "Quolo's Shattered Illusion",
        text: "Quolo snarls from behind an obsidian altar, clutching a stolen wand while a gaunt, grave-cold angatra lunges forward with a gleaming sea-witch's blade to defend its master's stolen glory!",
        enemy: { name: "Quolo & The Bound Angatra", desc: "A fraudulent illusionist backed by a cursed undead guardian wielding a sea-forged blade.", hp: 58, ac: 15, atk: 7, dmg: 10, undead: true, xp: 165, gold: 120, items: ["bq_quolo_sea_witch_blade"], weakCw: ["MEMORY_PULSE_TRACED", "TOWER_INFILTRATED", "FOCUS_SHATTERED"] },
        choices: [
          { t: "Shatter the memory-loom and climb back up into the dawn light.", to: 6 }
        ]
      },
      6: {
        zone: "Dawnshore Piers",
        title: "Waking From the Dream",
        text: "As the memory-loom cracks, a collective gasp rises across Dawnshore. The fisherfolk blink away months of false adoration and stare in dismay at the tower—before turning gratefully toward the real hero who freed their minds.",
        choices: [
          { t: "Refuse to let the villagers sink into shame and help them burn Quolo's ledgers.", to: 7 },
          { t: "Accept the harbor-guild's gratitude and claim your reward.", to: 8 }
        ]
      },
      7: {
        zone: "Dawnshore Harbor",
        title: "True Heroes of the Coast",
        text: "The hedge-healer clasps your forearm with tearful relief as the fishermen haul out genuine silver salvage they had been tricked into hoarding for Quolo.",
        onEnter: { gold: 45, msg: "Dawnshore's harbor-guild adds a +45 GP thank-you purse!" },
        choices: [
          { t: "Sail back toward Oakhaven with the sea-breeze at your back.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Dawn Over Dawnshore",
        text: "Dawnshore's memories belong to its people once more, and Quolo's hollow legend is washed away by the tide.",
        ending: { type: "true", title: "Breaker of Quolo's Charm", xp: 240, gold: 185, trophy: "Quolo's Cracked Memory Prism" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. SONG UNDYING (8 PAGES • LV 7)
  // ==========================================================
  bk_b23_song_undying: {
    id: "bk_b23_song_undying",
    title: "Song Undying",
    subtitle: "Lower Zobeck & The Virtuoso's Crypt",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Rescue a hunted boy from skilled dockside assassins in Lower Zobeck, follow his fallen bodyguard's bloodied letter, and silence the Virtuoso Lich Salamondre!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Lower Zobeck Alleys",
        title: "Steel in the Fog",
        safeRetreat: true,
        text: "Night mist clings to the cobbles of Lower Zobeck when screams shatter the quiet. Hooded killers—far deadlier than common dockside thugs—corner a wounded swordsman shielding a terrified young boy named Marko. With his last breath, the bodyguard Conte presses a blood-stained letter into your palm!",
        choices: [
          { t: "Intercept the hooded assassins to cover young Marko's escape!", to: 2 },
          { t: "Use the alley scaffolding to flank the killers from above!", badge: "Stealth / Agility DC 14", check: { stat: "agility", skill: "Stealth", dc: 14, pass: 2, fail: 2, passMsg: "You drop behind the assassins with lethal surprise!", failMsg: "Loose slate clatters—they turn with poisoned blades!" }, onPass: { cw: "ASSASSINS_FLANKED" } }
        ]
      },
      2: {
        zone: "Dockside Alley",
        title: "The Bloodied Letter",
        text: "The silent killers close in with cold, mechanical precision—sent by someone who desperately wants Marko's bloodline silenced.",
        enemy: { name: "Salamondre's Choir-Assassins", desc: "Disciplined killers wearing silver clef-pins beneath their cloaks.", hp: 64, ac: 15, atk: 8, dmg: 11, xp: 155, gold: 75, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["ASSASSINS_FLANKED"] },
        choices: [
          { t: "Lead Marko to safety and decode Conte's blood-stained letter.", to: 3 }
        ]
      },
      3: {
        zone: "Sunken Acoustic Vaults",
        title: "Echoes Beneath the Street",
        text: "Conte's letter reveals that Marko's aunt Giselle is trapped beneath an ancient resonant cavern—held captive by Salamondre, an immortal Virtuoso Lich who conducts an undead orchestra fueled by the Thrice-Cursed Heart!",
        choices: [
          { t: "Scout the Sentinels' Chamber for hollow acoustic cracks to muffle the lich's aria.", badge: "Perception / Spirit DC 14", check: { stat: "spirit", skill: "Perception", dc: 14, pass: 4, fail: 4, passMsg: "You jam heavy drapery into the resonance vents—cutting the lich's sonic power!", failMsg: "Your footsteps ring like a bell down the marble nave!" }, onPass: { cw: "ACOUSTICS_MUFFLED" } },
          { t: "Ransack the adherents' cells for silver relics and a way into the choir loft.", badge: "Lockpicking / Stealth DC 14", check: { stat: "agility", skill: "Lockpicking", dc: 14, pass: 4, fail: 4, passMsg: "You recover 70 GP in silver keepsakes and slip into the upper choir loft!", failMsg: "A rusted hinge shrieks—undead sentinels march from the shadows!" }, onPass: { cw: "CHOIR_FLANK", gold: 70 } }
        ]
      },
      4: {
        zone: "The Sentinels' Nave",
        title: "The Undying Adherents",
        text: "Pale, skeletal musicians raise bone-strung viols and rusted halberds, convinced their master's symphony will one day restore their flesh!",
        enemy: { name: "Choir Sentinels", desc: "Armored undead guardians marching in eerie tempo to Salamondre's dirge.", hp: 68, ac: 16, atk: 8, dmg: 12, undead: true, xp: 165, gold: 80, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 3 },
        choices: [
          { t: "Step onto the grand amphitheater stage where Salamondre raises his baton!", to: 5 }
        ]
      },
      5: {
        zone: "Amphitheater of Bone",
        title: "The Virtuoso Lich",
        text: "Golden chandeliers blaze over a sunken stage. Clad in tattered velvet and a gleaming porcelain mask, the Virtuoso Lich Salamondre sweeps his bone baton across the air—unleashing a shattering necrotic crescendo while Giselle struggles in silver chains behind him!",
        enemy: { name: "Salamondre, Virtuoso Lich", desc: "An undead maestro wielding sonic necromancy and a cursed conductor's baton.", hp: 82, ac: 16, atk: 9, dmg: 13, undead: true, xp: 240, gold: 160, items: ["bq_virtuoso_tuning_baton"], weakCw: ["ACOUSTICS_MUFFLED", "CHOIR_FLANK"] },
        choices: [
          { t: "Unchain Giselle and seize the Thrice-Cursed Heart before the lich can reform!", to: 6 }
        ]
      },
      6: {
        zone: "Salamondre's Reliquary",
        title: "The Thrice-Cursed Heart",
        text: "With Salamondre's masked body crumbling into ash, Giselle rushes to a golden ewer and bowl holding the pulsing phylactery. 'Destroy it now—or his song will rise again at the next new moon!'",
        choices: [
          { t: "Shatter the Thrice-Cursed Heart on the marble stage and claim the golden ewer.", to: 7 },
          { t: "[Firebolt] Incinerate the cursed phylactery in a burst of arcane flame!", reqSpell: "Firebolt", to: 7 }
        ]
      },
      7: {
        zone: "Zobeck Dawn",
        title: "A Reunion in Sunlight",
        text: "You emerge into crisp morning light where Marko throws himself into Giselle's arms. In gratitude for saving her nephew and ending Salamondre's nightmare, Giselle insists you keep the lich's golden ewer.",
        onEnter: { gold: 90, msg: "Giselle awards you the salvaged golden ewer (+90 GP)!" },
        choices: [
          { t: "Return to Oakhaven with the haunting silence of the crypt behind you.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "The Final Rest",
        text: "Salamondre's dark symphony is silenced forever, and young Marko sleeps safely under Giselle's roof.",
        ending: { type: "true", title: "Silencer of the Song Undying", xp: 340, gold: 240, trophy: "Porcelain Mask of Salamondre" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. THE WANDERING WHELP (8 PAGES • LV 4)
  // ==========================================================
  bk_b23_wandering_whelp: {
    id: "bk_b23_wandering_whelp",
    title: "The Wandering Whelp",
    subtitle: "Bad Solitz Vineyards & The Derro Cellars",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Hired by Grand Baron Dymytros to find the missing bearfolk cub Khemma, follow pawprints across a Dornig vineyard into derro-infested wine cellars!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Bad Solitz Country Road",
        title: "Pawprints Among the Vines",
        safeRetreat: true,
        text: "Grand Baron Dymytros's courier presses a waxed writ into your hand: Khemma, the young cub of an honored bearfolk emissary, wandered off northwest of Bad Solitz! Along the terraced rows of a sun-warmed vineyard, you spot small, bear-like pawprints leading straight toward an old stone chateau.",
        choices: [
          { t: "Track Khemma's pawprints carefully through the terraced grapevines.", badge: "Survival / Spirit DC 12", check: { stat: "spirit", skill: "Survival", dc: 12, pass: 2, fail: 3, passMsg: "You spot tiny derro boot-tracks overlapping Khemma's trail toward the cellar doors!", failMsg: "You lose the trail near the winepress—just as giggling silhouettes dart from the bushes!" }, onPass: { cw: "TRACKS_FOUND" } },
          { t: "Scout the vineyard chateau windows quietly before approaching.", badge: "Stealth / Agility DC 12", check: { stat: "agility", skill: "Stealth", dc: 12, pass: 2, fail: 3, passMsg: "You hear gnomish vintners shouting for help from behind a hidden cellar wall!", failMsg: "A loose barrel rolls down the slope, alerting the cellar raiders!" }, onPass: { cw: "CELLAR_SCOUTED" } }
        ]
      },
      2: {
        zone: "Chateau Finishing Room",
        title: "Voices Behind the Casks",
        text: "Muffled shouts echo from behind a false oak wine-rack: 'Free us—they've got the bearfolk cub in here!' Nearby, a tarnished bronze statue stash sits beside a derro lookout's crossbow.",
        onEnter: { gold: 25, msg: "You pocket stolen bronze bird figurines (+25 GP) before moving in!" },
        choices: [
          { t: "Pick the hidden cellar latch to ambush the derro captors!", badge: "Lockpicking / Agility DC 12", check: { stat: "agility", skill: "Lockpicking", dc: 12, pass: 4, fail: 3, passMsg: "The hidden door swings open silently—you catch the derro guards off-balance!", failMsg: "The bolt jams with a loud snap, bringing derro skirmishers running!" }, onPass: { cw: "AMBUSH_CELLAR" } },
          { t: "Kick the false wine-rack down and charge in!", to: 3 }
        ]
      },
      3: {
        zone: "Upper Wine Cellar",
        title: "Derro Raiders",
        text: "Wild-eyed pale derro leap from atop the oak casks, shrieking nonsense rhymes as they jab hooked spears and hurl sour wine bottles!",
        enemy: { name: "Derro Cellar Guards", desc: "Crazed subterranean raiders looting the vineyard and hoarding captives.", hp: 36, ac: 13, atk: 5, dmg: 7, xp: 85, gold: 45, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["TRACKS_FOUND", "CELLAR_SCOUTED"] },
        choices: [
          { t: "Unlock the back finishing room and find Khemma!", to: 4 }
        ]
      },
      4: {
        zone: "Deep Aging Vault",
        title: "The Derro Explorer",
        text: "Beside a cracked stone tunnel at the back of the vault, a burly derro explorer wearing a shaggy grizzlehide cloak tries to drag a snarling, terrified bearfolk cub toward the Underworld!",
        enemy: { name: "Derro Explorer & Pack-Beasts", desc: "A ruthless subterranean scout draped in an enchanted bear-pelt cloak.", hp: 48, ac: 14, atk: 6, dmg: 9, xp: 135, gold: 85, items: ["bq_grizzlehide_cloak"], weakCw: ["AMBUSH_CELLAR", "TRACKS_FOUND"] },
        choices: [
          { t: "Cut Khemma's ropes and calm the frightened cub.", to: 5 }
        ]
      },
      5: {
        zone: "Vineyard Courtyard",
        title: "A Grateful Cub",
        text: "Khemma butts his fuzzy head gratefully against your knee, while the freed gnomish vintners pour you a restorative goblet of Bad Solitz vintage.",
        onEnter: { healHp: 12, msg: "The vintners' cordial restores +12 HP!" },
        choices: [
          { t: "Collapse the derro tunnel mouth so the vineyard stays safe.", to: 6 },
          { t: "Escort Khemma straight back to Grand Baron Dymytros's lodge.", to: 7 }
        ]
      },
      6: {
        zone: "Cellar Tunnel",
        title: "Sealing the Breach",
        text: "You topple two empty stone wine-vats across the subterranean crack, sealing off the derro tunnel for good. The vintners press a bonus pouch of silver into your pack!",
        onEnter: { gold: 35, xp: 25, msg: "Sealing the breach earns +35 GP and +25 XP!" },
        choices: [
          { t: "Escort Khemma home to his anxious bearfolk parent.", to: 7 }
        ]
      },
      7: {
        zone: "Baron's Hunting Lodge",
        title: "Roar of Relief",
        text: "The towering bearfolk emissary scoops Khemma into a thunderous embrace and bows deeply to you, while Grand Baron Dymytros counts out your promised gold.",
        choices: [
          { t: "Collect your reward and return to Oakhaven.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Safe Return of the Cub",
        text: "Khemma is safely back with his kin, and the Baron's friendship with the bearfolk clans stands unbroken.",
        ending: { type: "true", title: "Protector of the Wandering Whelp", xp: 195, gold: 155, trophy: "Bad Solitz Silver Grape Crest" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. OUT OF PHASE (8 PAGES • LV 7)
  // ==========================================================
  bk_b23_out_of_phase: {
    id: "bk_b23_out_of_phase",
    title: "Out of Phase",
    subtitle: "Lake Jingar & Zara's Shadow-Veiled Hills",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "An unnatural, smoke-free haze hangs over Lake Jingar—aid acquisitions broker Zara Suresh before a planar phase-rift drags the whole valley into the Ethereal!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Zara's Red-Tent Camp",
        title: "When Bears Fly",
        safeRetreat: true,
        text: "Though there is no smell of smoke, the sky above Lake Jingar is dark and shimmering like oil on water. Outside the haze sit two trade wagons and red silk tents belonging to Zara Suresh, a sharp-eyed acquisitions broker. 'One of my curios cracked during the storm,' she admits grimly. 'Now creatures from the lake-hills are blinking in and out of thin air!'",
        choices: [
          { t: "Inspect Zara's shattered curio case to identify the planar frequency.", badge: "Arcana / Lore DC 14", check: { stat: "arcana", skill: "Arcana", dc: 14, pass: 2, fail: 3, passMsg: "You attune your senses to the phase-prism's resonance—you can track blinking foes!", failMsg: "A ripple of ethereal static jolts you as shadow-beasts phase right into camp!" }, onPass: { cw: "PHASE_TUNED" } },
          { t: "Press straight into the shimmering hills around Lake Jingar with steel drawn.", to: 3 }
        ]
      },
      2: {
        zone: "Lake Jingar Ridge",
        title: "Between Two Worlds",
        text: "Tuned to the rift's hum, you spot translucent bridges of ethereal mist crisscrossing the rocky shore—letting you bypass an ambush and discover a half-phased cache of silver trade ingots!",
        onEnter: { gold: 65, msg: "You pull +65 GP in silver trade ingots from the phase-shifted cache!" },
        choices: [
          { t: "Follow the rift's pulsing filaments toward the sunken lakeside shrine.", to: 4 }
        ]
      },
      3: {
        zone: "Haze-Shrouded Shore",
        title: "Blinking Predators",
        text: "The shoreline flickers—one heartbeat empty, the next teeming with translucent phase-spiders and displaced hill-beasts snapping out of silver mist!",
        enemy: { name: "Phase-Shifted Stalkers", desc: "Predators flickering unpredictably between the Material and Ethereal realms.", hp: 62, ac: 15, atk: 8, dmg: 11, xp: 155, gold: 70, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["PHASE_TUNED"] },
        choices: [
          { t: "Push deeper into the glowing lakeside cave at the eye of the haze.", to: 4 }
        ]
      },
      4: {
        zone: "The Ethereal Cavern",
        title: "The Fractured Anchor",
        text: "Inside a flooded grotto beside Lake Jingar, a towering obelisk of pale prism-stone hums violently—tearing open a swirling vortex that pulls stones, fish, and drifting spectral hunters into the air!",
        choices: [
          { t: "Wedge Zara's copper grounding-rods around the obelisk before the guardian appears!", badge: "Detect Traps / Arcana DC 14", check: { stat: "arcana", skill: "Detect Traps", dc: 14, pass: 5, fail: 5, passMsg: "The grounding-rods lock the rift's guardian into solid flesh!", failMsg: "The obelisk flares violently, hurling a shimmering rift-beast straight at you!" }, onPass: { cw: "RIFT_ANCHORED" } },
          { t: "Charge straight into the vortex to shatter the prism core!", to: 5 }
        ]
      },
      5: {
        zone: "Eye of the Phase-Rift",
        title: "The Rift-Warden",
        text: "A colossal, many-limbed ethereal horror steps halfway out of the glowing prism, its body rippling with starlight and crackling spatial force!",
        enemy: { name: "Jingar Phase-Warden", desc: "An apex ethereal predator drawn to Zara's shattered planar prism.", hp: 80, ac: 16, atk: 9, dmg: 13, xp: 235, gold: 150, items: ["bq_phase_prism_amulet"], weakCw: ["PHASE_TUNED", "RIFT_ANCHORED"] },
        choices: [
          { t: "Seal the fractured prism and watch the dark haze evaporate over Lake Jingar.", to: 6 }
        ]
      },
      6: {
        zone: "Clearing Shoreline",
        title: "Blue Sky Returns",
        text: "With a soft chime, the unnatural dusk lifts from Lake Jingar. Displaced rocks and droplets splash harmlessly back into the sunlit water.",
        onEnter: { healHp: 10, msg: "Clean mountain air steadies your pulse (+10 HP)!" },
        choices: [
          { t: "Return to Zara's red tents to collect your broker's fee.", to: 7 }
        ]
      },
      7: {
        zone: "Zara's Encampment",
        title: "An Acquisition Settled",
        text: "Zara Suresh whistles admiringly as she inspects the stabilized prism-shard. 'Worth every copper—and I'll remember your name the next time a curio bites back.'",
        choices: [
          { t: "Pocket Zara's gold and head back toward Oakhaven.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Back in Phase",
        text: "Lake Jingar rests calmly beneath clear skies once more, its planar rift sealed tight.",
        ending: { type: "true", title: "Anchor of Lake Jingar", xp: 335, gold: 245, trophy: "Stabilized Jingar Prism" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. RAID ON THE SAVAGE OASIS (8 PAGES • LV 5)
  // ==========================================================
  bk_b23_savage_oasis: {
    id: "bk_b23_savage_oasis",
    title: "Raid on the Savage Oasis",
    subtitle: "The Wasted Chasm & The Shrine Tree",
    difficulty: "Medium",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Race ahead of the castle-sized Hungering Cocoon during the Mad Spring to breach a mutated botanical oasis and claim the healing Seed of the Shrine Tree!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Chasm Rim",
        title: "Shadow of the Hungering Cocoon",
        safeRetreat: true,
        text: "Thunderous Mad Spring runoff cascades down the Wasted Chasm into a hidden green vale—the Savage Oasis, where a botanical wizard's Shrine Tree blooms once a year. Far down the canyon, the castle-sized Hungering Cocoon jags relentlessly closer. You must crack the wizard's cliffside seal and harvest a Shrine Seed before the behemoth arrives!",
        choices: [
          { t: "Decode the botanical runes on the cliffside vault door to slip in silently.", badge: "Arcana / Lockpicking DC 13", check: { stat: "arcana", skill: "Lockpicking", dc: 13, pass: 2, fail: 3, passMsg: "The stone petals part cleanly without waking the thorn-guardians!", failMsg: "The lock snaps shut with a shriek—mutated vines erupt from the waterfall!" }, onPass: { cw: "DOOR_UNLOCKED" } },
          { t: "Scale the wet waterfall terraces directly into the overgrown garden!", badge: "Athletics / Agility DC 13", check: { stat: "agility", skill: "Athletics", dc: 13, pass: 2, fail: 3, passMsg: "You drop cleanly onto the upper terrace overlooking the Shrine Tree!", failMsg: "Slick moss sends you tumbling into a snapping briar-patch!" }, onPass: { cw: "TERRACE_HIGHGROUND" } }
        ]
      },
      2: {
        zone: "Wizard's Greenhouse",
        title: "Mutated Vials & Dew",
        text: "Inside the cracked glass conservatory, glowing nectar-vials still pulse with pure Shrine-Tree sap—untainted by the Wastes' corruption!",
        onEnter: { healHp: 12, msg: "Pure Shrine-Tree dew restores +12 HP!" },
        choices: [
          { t: "Mix an alchemical defoliant from the wizard's bench to weaken the briar-guardians.", badge: "Herbalism / Arcana DC 13", check: { stat: "arcana", skill: "Herbalism", dc: 13, pass: 4, fail: 4, passMsg: "You coat your gear with salt-ash defoliant—mutated plants recoil at your touch!", failMsg: "The reagent fizzes harmlessly as tendrils slither across the tiles!" }, onPass: { cw: "DEFOLIANT_READY" } },
          { t: "Sprint straight down the terraced steps toward the glowing Shrine Tree!", to: 4 }
        ]
      },
      3: {
        zone: "Waterfall Terraces",
        title: "Thorn-Mutants of the Wastes",
        text: "Warp-touched creepers and spore-spitting shamblers surge out of the mist-drenched terraces, lashing with barbed vines!",
        enemy: { name: "Waste-Mutated Shamblers", desc: "Twisted botanical horrors warped by the chaotic magic of the Wastes.", hp: 46, ac: 14, atk: 6, dmg: 8, xp: 110, gold: 50, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1 },
        choices: [
          { t: "Hack through the last curtain of thorns to reach the Shrine Tree!", to: 4 }
        ]
      },
      4: {
        zone: "Pool of the Shrine Tree",
        title: "The Apex Bloom",
        text: "At the heart of the emerald pool stands the radiant Shrine Tree, its golden seed-pods gleaming like lanterns—guarded by a colossal, root-armored Waste-Behemoth awakened by the approaching Cocoon's tremors!",
        enemy: { name: "Blighted Oasis Guardian", desc: "A towering treant-mutant fused with crystal-studded Waste roots.", hp: 58, ac: 15, atk: 7, dmg: 10, xp: 165, gold: 110, items: ["bq_shrine_tree_seed_charm"], weakCw: ["DOOR_UNLOCKED", "TERRACE_HIGHGROUND", "DEFOLIANT_READY"] },
        choices: [
          { t: "Pluck the golden Shrine Tree Seed as the ground shakes beneath your boots!", to: 5 }
        ]
      },
      5: {
        zone: "Canyon Ascent",
        title: "Outrunning the Behemoth",
        text: "A deafening groan echoes up the chasm as the colossal Hungering Cocoon drifts over the outer waterfall! Clutching the warm golden seed, you race for the upper cliff-ledge.",
        choices: [
          { t: "Leap the crumbling rope-bridge before the chasm wall gives way!", badge: "Athletics / Agility DC 13", check: { stat: "agility", skill: "Athletics", dc: 13, pass: 6, fail: 7, passMsg: "You vault clear to the rim and even snatch a fallen prospector's satchel!", failMsg: "You scramble up the gravel just in time, bruised but intact!" }, onPass: { gold: 45, xp: 25 } },
          { t: "Take the steep switchback trail up to the canyon rim.", to: 7 }
        ]
      },
      6: {
        zone: "High Rim Overlook",
        title: "Spoils of the Wastes",
        text: "Catching your breath atop the sun-baked rim, you count the silver coins from the prospector's satchel while the Hungering Cocoon vanishes into the mist below.",
        choices: [
          { t: "Carry the healing Shrine Seed back to Oakhaven's healers.", to: 8 }
        ]
      },
      7: {
        zone: "Chasm Trail",
        title: "Escape From the Mad Spring",
        text: "Behind you, the Savage Oasis disappears beneath swirling chasm-clouds—yet the golden Shrine Seed glows warmly inside your pack.",
        choices: [
          { t: "Deliver the miraculous seed and claim your reward.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Harvest of the Shrine Tree",
        text: "With the Seed of the Shrine Tree safely secured, Oakhaven's apothecaries can brew panaceas for seasons to come.",
        ending: { type: "true", title: "Raider of the Savage Oasis", xp: 245, gold: 190, trophy: "Golden Leaf of the Shrine Tree" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. LOST AND FOUND (11 PAGES • LV 4)
  // ==========================================================
  bk_b23_lost_and_found: {
    id: "bk_b23_lost_and_found",
    title: "Lost and Found",
    subtitle: "Walker Market & The Bearowl Alehouse",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "A cryptic note stamped with House Aldous-Donner's black hammer drags you into a high-stakes festival-eve caper between Walker Market, the Bearowl Alehouse, and the lantern-lit rooftops!",
    totalPages: 11,
    pages: {
      1: {
        zone: "Walker Market",
        title: "A Brush With the Treasury",
        safeRetreat: true,
        text: "Saffron festival banners snap above Walker Market as revelers, spice-hawkers, and student buskers jostle across the cobbles. Suddenly a breathless courier in a torn gray cloak collides with your shoulder, slips a folded note into your pocket, and dives behind a puppet-cart: 'After recovery, deliver the stone with all haste, then come to the Bearowl for your 500 pieces. — RS.' At the bottom sits the unmistakable wax mark of a black hammer!",
        choices: [
          { t: "Examine the black-hammer crest and the ink's faint arcane shimmer.", badge: "Arcana / Perception DC 12", check: { stat: "arcana", skill: "Arcana", dc: 12, pass: 2, fail: 2, passMsg: "That's the crest of House Aldous-Donner—corrupt treasury brokers—with a tiny bookshop stamp along the margin!", failMsg: "The crest looks noble and dangerous, though its exact house eludes you." }, onPass: { cw: "HOUSE_KNOWN", xp: 20, msg: "Identified House Aldous-Donner (+20 XP)!" } },
          { t: "Follow the courier's hurried footprints into the side-alley beside the bookshop.", badge: "Perception / Survival DC 12", check: { stat: "spirit", skill: "Perception", dc: 12, pass: 3, fail: 2, passMsg: "You spot a torn gray satchel ditched behind a crate of lamp-oil jars!", failMsg: "A troupe of festival stilt-walkers cuts across the lane—you head for the Bearowl instead." } },
          { t: "Head straight to the Bearowl Alehouse between the student boarding house and bookshop.", to: 2 }
        ]
      },
      2: {
        zone: "The Bearowl Alehouse",
        title: "Whispers Over Cheap Ale",
        text: "The Bearowl Alehouse buzzes with scholars, minstrels, and the warm tang of spiced cider. In the shadowed rear booth sits a sharp-eyed woman in a dark wool mantle—'RS'—rolling a copper coin across her knuckles. Near the taproom doorway, two burly treasury bailiffs pretend to nurse warm ale while scanning every newcomer's hands.",
        choices: [
          { t: "Slide quietly into the booth and name House Aldous-Donner to earn RS's trust immediately.", reqCw: "HOUSE_KNOWN", badge: "HOUSE_KNOWN", to: 4, onChoose: { cw: "RS_TRUST", xp: 25, msg: "RS grins, confirms she's auditing the house's embezzlement, and slips you the cellar key (+25 XP)!" } },
          { t: "Join RS in the back booth and feel out her intentions over spiced cider.", badge: "Persuasion / Spirit DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 4, fail: 5, passMsg: "RS trusts your nerve and slips you the back-alley key to the courier's lockbox!", failMsg: "The bailiffs at the bar spot the black-hammer wax seal and overturn a table!" }, onPass: { cw: "RS_TRUST", xp: 20 } },
          { t: "Slip out the bookshop back-door to flank the treasury bailiffs in the alley!", badge: "Stealth / Agility DC 12", check: { stat: "agility", skill: "Stealth", dc: 12, pass: 4, fail: 5, passMsg: "You catch the bailiffs' lookout peeking into the cellar window and slip past unseen!", failMsg: "A stack of dusty almanacs topples—bringing the bailiffs charging!" }, onPass: { cw: "ALLEY_DROP", xp: 20 } }
        ]
      },
      3: {
        zone: "Bookshop Alley",
        title: "The Courier's Dead-Drop",
        text: "Behind a stack of lamp-oil crates beside the neighboring bookshop lies the courier's abandoned gray satchel. Inside sit 35 GP, a brass skeleton-key tagged 'Cellar — Shelf VII', and a folded bribe-slip proving House Aldous-Donner's chief fixer—a duelist named Vesper—paid off the bell-tower watchman for the night!",
        onEnter: { cw: "COURIER_KEY", gold: 35, xp: 25, msg: "Claimed the courier's brass cellar-key (COURIER_KEY), 35 GP, and Vesper's bribe-slip (+25 XP)!" },
        choices: [
          { t: "Slip into the Bearowl taproom to meet RS with the bribe-slip in hand.", to: 2 },
          { t: "Use the brass key immediately to raid the Bookshop Cellar before the bailiffs arrive!", to: 4 }
        ]
      },
      4: {
        zone: "Bookshop Cellar",
        title: "The Stolen Treasury Stone",
        text: "Down a creaking cedar stair behind a false shelf of mislabeled grimoires sits an iron-banded courier lockbox. Inside pulses a palm-sized blue ledger-stone engraved with glowing treasury ward-runes—living proof of House Aldous-Donner's skimming! Just as you lift it clear, heavy boots crash against the cellar bulkhead overhead!",
        onEnter: { xp: 25, msg: "You secure the glowing Treasury Stone (+25 XP)!" },
        choices: [
          { t: "Wedge an iron book-press beneath the stair and slip out the coal-chute behind them!", badge: "Stealth / Lockpicking DC 12", check: { stat: "agility", skill: "Stealth", dc: 12, pass: 5, fail: 5, passMsg: "You emerge right behind the startled bailiffs in the back alley!", failMsg: "The coal-chute grates loudly—the bailiffs spin with raised maces!" }, onPass: { cw: "ALLEY_DROP", xp: 20 } },
          { t: "Kick the bulkhead open and stand your ground in the narrow alley!", to: 5 }
        ]
      },
      5: {
        zone: "Alehouse Back-Alley",
        title: "House Aldous-Donner's Enforcers",
        text: "Cloaked bailiffs bearing black-hammer iron maces block both ends of the cobble lane, snarling: 'Hand over the stone, runner—or sleep beneath the river pilings!'",
        enemy: { name: "Aldous-Donner Enforcers", desc: "Corrupt noble house toughs sent to silence witnesses and seize the treasury stone.", hp: 40, ac: 13, atk: 6, dmg: 8, xp: 95, gold: 50, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1, weakCw: ["ALLEY_DROP", "HOUSE_KNOWN"] },
        choices: [
          { t: "Scale the timber rain-gutter onto the festival rooftops toward the bell-tower exchange!", to: 6 }
        ]
      },
      6: {
        zone: "Rooftop Eaves",
        title: "The Bribed Watchman's Perch",
        text: "Fireworks crackle over Walker Market as you race across slate gables toward the old clock-tower arch. On a narrow timber catwalk just below the belfry sits a nervous bribed watchman beside a crate of festival-eve Roman candles aimed right across the rooftop platform!",
        choices: [
          { t: "Flash Vesper's bribe-slip and order the watchman to run before the magistrates arrive!", reqCw: "COURIER_KEY", badge: "COURIER_KEY", to: 7, onChoose: { cw: "WATCHMAN_GONE", gold: 30, xp: 25, msg: "The terrified watchman drops his 30 GP bribe-pouch and bolts down the stair (+25 XP)!" } },
          { t: "Bluff the watchman off his post before he can signal the belfry.", badge: "Persuasion DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 7, fail: 7, passMsg: "He buys your warning, abandons his post, and drops 30 GP in his hurry!", failMsg: "He rings a quick warning chime before ducking down the ladder!" }, onPass: { cw: "WATCHMAN_GONE", gold: 30, xp: 25 } },
          { t: "Touch off the crate of festival Roman candles with Firebolt to dazzle Vesper!", reqSpell: "Firebolt", badge: "Firebolt", to: 7, onChoose: { cw: "VESPER_DAZZLED", xp: 30, msg: "Blinding emerald fireworks shower the bell-tower arch, throwing Vesper off balance (+30 XP)!" } },
          { t: "Vault silently across the slate ridge straight onto the Bell-Tower Rooftop!", to: 7 }
        ]
      },
      7: {
        zone: "Bell-Tower Rooftop",
        title: "The Black-Hammer Collector",
        text: "Beneath the great bronze bell waits House Aldous-Donner's chief fixer—Vesper, a silver-tongued duelist in dark chainmail with the onyx Black Hammer Signet glinting on his sword-hand. 'Such enthusiasm for a simple rock,' he purrs, drawing a rune-etched rapier as fireworks paint the sky crimson. 'Hand it over, and I'll let you walk down the stairs.'",
        enemy: { name: "Aldous-Donner Chief Fixer", desc: "A ruthless noble-house duelist wearing the Black Hammer Signet.", hp: 48, ac: 14, atk: 7, dmg: 9, xp: 140, gold: 90, items: ["bq_aldous_black_hammer_signet"], weakCw: ["RS_TRUST", "HOUSE_KNOWN", "VESPER_DAZZLED", "WATCHMAN_GONE"] },
        choices: [
          { t: "Deliver the recovered ledger-stone to RS beneath the festival lanterns.", to: 8 }
        ]
      },
      8: {
        zone: "Festival Square",
        title: "Debt Paid in Full",
        text: "Gold and violet fireworks bloom over Walker Market as RS steps from a garlanded arch, inspecting the unharmed crystal with crisp satisfaction. 'Every forged toll, every skimmed mint-bar—recorded right inside this stone,' she smiles. 'House Aldous-Donner's embezzlement ends tonight—and you've earned every coin of your fee.'",
        choices: [
          { t: "Ask RS what became of the courier and the bookshop owner before heading inside.", to: 9 },
          { t: "Toast straight to honest coin at the Bearowl Alehouse.", to: 10 }
        ]
      },
      9: {
        zone: "Festival Square",
        title: "Loose Ends Tied",
        text: "RS chuckles softly over the roar of street musicians. 'The courier is already across the river with a fat purse, and the bookshop's debt to House Aldous-Donner just evaporated. Here—take Vesper's forfeited retainer as a bonus for keeping your head.'",
        onEnter: { gold: 35, xp: 20, msg: "RS slips you an extra 35 GP retainer bonus (+20 XP)!" },
        choices: [
          { t: "Join RS inside the Bearowl taproom for spiced cider and a warm fire.", to: 10 }
        ]
      },
      10: {
        zone: "The Bearowl Taproom",
        title: "A Scholar's Toast",
        text: "The Bearowl's bard strikes up a jaunty festival reel while RS slides a heavy purse of festival gold across the scarred oak table, raising her mug to the sharpest runner in town.",
        onEnter: { healHp: 10, msg: "Spiced cider and a warm fire restore +10 HP!" },
        choices: [
          { t: "Slip back into the lantern-lit night road toward Oakhaven.", to: 11 }
        ]
      },
      11: {
        zone: "Epilogue",
        title: "Canny, Swift, and Safe",
        text: "The stolen ledger-stone is safely delivered, House Aldous-Donner's chief fixer is out of business, and your purse jingles merrily all the way back to Oakhaven.",
        ending: { type: "true", title: "Runner of the Bearowl", xp: 200, gold: 165, trophy: "Wax Seal of RS" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. TERROR AT THE TWELVE GOATS TAVERN (8 PAGES • LV 6)
  // ==========================================================
  bk_b23_twelve_goats: {
    id: "bk_b23_twelve_goats",
    title: "Terror at the Twelve Goats Tavern",
    subtitle: "Wormwood Trade Road & The Sacrificial Tower",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "When dark-god acolytes and lesser devils shatter the truce of the Twelve Goats Tavern, fight alongside tavernkeeper Petal and race under the high moon to save a captive!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Twelve Goats Tavern",
        title: "Truce Shattered",
        safeRetreat: true,
        text: "Along the lonely southeastern Wormwood trade road, the Twelve Goats Tavern is a known safe haven where even highwaymen leave travelers in peace. Tonight, however, a weeping woman named Malya bursts through the doors—pursued by dark-robed gnomish cultists and cackling horned imps! Behind the bar, veteran tavernkeeper Petal racks a heavy crossbow!",
        choices: [
          { t: "Rally the surprised bandits in the taproom to fight beside Petal!", badge: "Persuasion / Spirit DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 2, fail: 2, passMsg: "The bandit captain snarls 'Nobody wrecks Petal's bar!' and leaps into the fray beside you!", failMsg: "The bandits hesitate at the sight of hellfire, leaving you and Petal on point!" }, onPass: { cw: "BANDITS_RALLIED" } },
          { t: "Vault over the taproom table straight into the invading cultists!", to: 2 }
        ]
      },
      2: {
        zone: "Twelve Goats Taproom",
        title: "Brawl Beneath the Antlers",
        text: "Crossbow bolts zip from behind the bar as crimson-robed Dorograd acolytes and sulfur-reeking lesser devils try to drag Malya back out into the night!",
        enemy: { name: "Dorograd Acolytes & Imps", desc: "Fanatical dark-god cultists backed by cackling infernal minions.", hp: 52, ac: 14, atk: 7, dmg: 10, xp: 130, gold: 65, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["BANDITS_RALLIED"] },
        choices: [
          { t: "Hear Malya's plea—her husband Josef is slated for sacrifice at moon-high!", to: 3 }
        ]
      },
      3: {
        zone: "Eastern Forest Track",
        title: "Race Against the Moon",
        text: "Malya clutches your cloak: 'They dragged Josef to the old stone tower two hours east—when the moon hits its peak, they'll spill his blood!' Petal tosses you a fresh bandage and a bolt-case: 'Go! Bring him back!'",
        onEnter: { healHp: 10, msg: "Petal's field dressing restores +10 HP!" },
        choices: [
          { t: "Cut through the dense Wormwood brambles to beat the ritual clock!", badge: "Survival / Athletics DC 13", check: { stat: "agility", skill: "Survival", dc: 13, pass: 4, fail: 4, passMsg: "You arrive early and snuff out the outer summoning braziers unseen!", failMsg: "Thorns slow your sprint—the chanting is already roaring inside the tower!" }, onPass: { cw: "BRAZIERS_SNUFFED" } },
          { t: "Follow the muddy wagon-ruts straight to the tower gate.", to: 4 }
        ]
      },
      4: {
        zone: "Sacrificial Tower Yard",
        title: "Gates of Brimstone",
        text: "Moonlight bathes the crumbling watchtower as iron gates creak open and a brimstone-armored cult enforcer steps forward with a barbed glaive!",
        enemy: { name: "Infernal Tower-Warden", desc: "A hell-touched zealot guarding the sacrificial stair.", hp: 56, ac: 15, atk: 8, dmg: 10, xp: 145, gold: 70, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 3 },
        choices: [
          { t: "Charge up the spiral stair to the moonlit roof!", to: 5 }
        ]
      },
      5: {
        zone: "Tower Roof Altar",
        title: "High Moon Sacrifice",
        text: "Beneath a blazing silver moon, the Dorograd High Priest raises a jagged obsidian dagger over bound Josef while a horned devil materializes out of red smoke!",
        enemy: { name: "Dorograd High Priest & Devil", desc: "A dark-god ritualist and his summoned infernal patron.", hp: 70, ac: 15, atk: 8, dmg: 12, xp: 205, gold: 135, items: ["bq_twelve_goats_crossbow"], weakCw: ["BRAZIERS_SNUFFED", "BANDITS_RALLIED"] },
        choices: [
          { t: "Cut Josef free and smash the sacrificial altar!", to: 6 }
        ]
      },
      6: {
        zone: "Moonlit Battlements",
        title: "Josef Unbound",
        text: "Josef gasps with relief as his ropes fall away and the crimson smoke dissipates into the cool night breeze. Beneath the shattered altar sits the cult's stolen offering box!",
        onEnter: { gold: 60, msg: "You claim +60 GP from the cult's stolen offering box!" },
        choices: [
          { t: "Escort Josef safely back down the road to the Twelve Goats Tavern.", to: 7 }
        ]
      },
      7: {
        zone: "Twelve Goats Tavern",
        title: "Free Ale for Life",
        text: "Malya and Josef embrace tearfully by the hearth while Petal slides a gleaming repeater crossbow across the counter in your honor.",
        choices: [
          { t: "Raise a mug with Petal and head back to Oakhaven.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Sanctuary Preserved",
        text: "The Twelve Goats Tavern remains a safe haven on the Wormwood road, and the Dorograd cult's bloody rite is broken.",
        ending: { type: "true", title: "Defender of the Twelve Goats", xp: 295, gold: 215, trophy: "Silver Goat Mug of Petal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. A DRINKING PROBLEM (8 PAGES • LV 4)
  // ==========================================================
  bk_b23_drinking_problem: {
    id: "bk_b23_drinking_problem",
    title: "A Drinking Problem",
    subtitle: "The Broken Handle Tavern & Oban's Ruin",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Rum gremlins are ruining Vilmos's Broken Handle tavern—track the melancholy clurichaun Oban Byrne to his ruined home, win his drinking contest, and rout Rum Gremlin Lord Flix!",
    totalPages: 8,
    pages: {
      1: {
        zone: "The Broken Handle Tavern",
        title: "Sour Ale & Snickering Gremlins",
        safeRetreat: true,
        text: "Flyers across Lower Zobeck advertise trouble at the Broken Handle. Inside, tavernkeeper Vilmos wrings his apron: half his patrons are slumped in magical drunken comas, and cackling rum gremlins led by a wicked sprite named Flix are spoiling every keg! 'Only Oban Byrne—a clurichaun who wandered off to the old roadside ruins—knows how to banish Flix's aura!'",
        choices: [
          { t: "Chase off the pesky rum gremlins raiding Vilmos's cellar right now!", to: 2 },
          { t: "Follow the trail of spilled stout straight out of town toward Oban's ruins!", badge: "Survival / Spirit DC 12", check: { stat: "spirit", skill: "Survival", dc: 12, pass: 3, fail: 2, passMsg: "You dodge the tavern brawl and arrive at Oban's moonlit ruin ahead of dusk!", failMsg: "Two giggling gremlins drop from the rafters right onto your shoulders!" }, onPass: { cw: "FAST_TRACK" } }
        ]
      },
      2: {
        zone: "Broken Handle Cellar",
        title: "Gremlins in the Kegs",
        text: "Green-skinned rum gremlins slosh out of a burst ale-barrel, belching intoxicating fumes and waving broken bottle-necks!",
        enemy: { name: "Rum Gremlin Raiders", desc: "Rowdy fey pests radiating a dizzying aura of stale spirits.", hp: 36, ac: 13, atk: 5, dmg: 7, xp: 85, gold: 40, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1 },
        choices: [
          { t: "Head out to the burnt roadside ruins to find the clurichaun Oban Byrne.", to: 3 }
        ]
      },
      3: {
        zone: "Oban's Burnt Roadside Ruin",
        title: "The Clurichaun's Challenge",
        text: "Beneath the charred beams of a bandit-raided roadside inn sits Oban Byrne—a red-coated, bearded clurichaun nursing a bottomless tankard. 'Want me back in Zobeck to clean out Flix?' he growls with a wry glint. 'First prove ye've got the iron belly to match me cup for cup!'",
        choices: [
          { t: "Accept Oban's drinking contest and match him mug for mug!", badge: "Might / Spirit DC 12", check: { stat: "might", skill: "Athletics", dc: 12, pass: 4, fail: 4, passMsg: "Oban roars with laughter, claps your back, and pledges his fey luck to your cause!", failMsg: "The room spins—Oban chuckles and agrees to help anyway, though your head throbs!" }, onPass: { cw: "OBAN_WON" } },
          { t: "Speak gently of the bandits who burned his inn—and how Vilmos needs a protector now.", badge: "Persuasion / Spirit DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 4, fail: 4, passMsg: "Tears glint in Oban's eyes; he lifts his tankard and swears to guard the Broken Handle!", failMsg: "Oban grumbles into his beard, though he reluctantly grabs his coat to follow you." }, onPass: { cw: "OBAN_INSPIRED" } }
        ]
      },
      4: {
        zone: "Return to Lower Zobeck",
        title: "Flix Makes His Move",
        text: "When you and Oban kick open the doors of the Broken Handle, chaos reigns! Rum Gremlin Lord Flix sits perched atop the chandelier wearing Vilmos's copper kettle as a crown, directing a tipsy mob of gremlins!",
        onEnter: { healHp: 8, msg: "Oban's lucky fey draught steadies your nerves (+8 HP)!" },
        choices: [
          { t: "Charge into the taproom alongside Oban to dethrone Lord Flix!", to: 5 }
        ]
      },
      5: {
        zone: "Broken Handle Taproom",
        title: "Lord of the Spilled Keg",
        text: "Flix shrieks and hurls flaming high-proof spirits from the chandelier as his gremlin court swarms the bar!",
        enemy: { name: "Rum Gremlin Lord Flix", desc: "A crown-wearing fey tyrant intoxicated with chaos and stolen spirits.", hp: 48, ac: 14, atk: 6, dmg: 9, xp: 140, gold: 85, items: ["bq_clurichaun_lucky_tankard"], weakCw: ["OBAN_WON", "OBAN_INSPIRED", "FAST_TRACK"] },
        choices: [
          { t: "Watch the dizzying gremlin aura lift as the sleeping patrons wake!", to: 6 }
        ]
      },
      6: {
        zone: "The Broken Handle",
        title: "A New Guardian of the Hearth",
        text: "With Flix sent packing out the chimney, the sleeping patrons blink awake without even a hangover. Oban Byrne nods at the sturdy oak bar and grins: 'Aye, Vilmos—this place'll do nicely.'",
        choices: [
          { t: "Join Vilmos and Oban for a celebratory round of fresh, unspoiled stout.", to: 7 }
        ]
      },
      7: {
        zone: "Broken Handle Hearth",
        title: "Vilmos's Gratitude",
        text: "Vilmos insists on paying you out of his saved lockbox, and Oban taps your pack with his lucky tankard for the road.",
        onEnter: { gold: 30, msg: "Oban's fey blessing conjures +30 GP in shiny copper and silver!" },
        choices: [
          { t: "Bid farewell to the Broken Handle and head back to Oakhaven.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Last Call for Flix",
        text: "The Broken Handle thrives under Oban Byrne's watchful eye, and the rum gremlins dare not show their noses in Lower Zobeck.",
        ending: { type: "true", title: "Champion of the Broken Handle", xp: 195, gold: 155, trophy: "Copper Kettle Crown of Flix" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. THE GARDEN OF SHADE AND SHADOWS (8 PAGES • LV 5)
  // ==========================================================
  bk_b23_garden_shade_shadows: {
    id: "bk_b23_garden_shade_shadows",
    title: "The Garden of Shade and Shadows",
    subtitle: "Ogrodu Hedge-Labyrinth & Mazar Manor",
    difficulty: "Medium",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "A vast shadow-shrouded hedge labyrinth has swallowed half the village of Ogrodu—brave haunted Mazar Manor, outwit an Umbral Vampire, and deactivate the Arborstone!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Ogrodu Village Square",
        title: "Battle of Ogrodu",
        safeRetreat: true,
        text: "Half the village of Ogrodu has vanished behind towering walls of black, shadow-shrouded hedges. Behind makeshift wooden barricades, desperate villagers fend off screeching shadow goblins pouring out of the maze's northern arch!",
        choices: [
          { t: "Leap onto the barricades to drive the shadow goblins back into the hedge-maze!", to: 2 },
          { t: "[Firebolt] Ignite a torch-barrier at the maze mouth to scatter the goblins!", reqSpell: "Firebolt", to: 2 }
        ]
      },
      2: {
        zone: "Ogrodu Barricade",
        title: "Goblins of the Hedge",
        text: "Soot-skinned shadow goblins leap from the darkened foliage with jagged shears and creeping gloom-magic!",
        enemy: { name: "Shadow Goblin Raiders", desc: "Wicked shadow-fey pouring out of Mazar Manor's corrupted hedge-labyrinth.", hp: 44, ac: 14, atk: 6, dmg: 8, xp: 105, gold: 50, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 1 },
        choices: [
          { t: "Enter the shadowy hedge-labyrinth toward Mazar Manor at its heart.", to: 3 }
        ]
      },
      3: {
        zone: "Mazar Manor Kitchen",
        title: "Rozalia's Hidden Pantry",
        text: "Navigating the twisting hedges, you reach the eerie halls of Mazar Manor. Inside the candlelit kitchen, a terrified cook named Rozalia whispers that Lord Mazar's cursed Arborstone powers the maze—and that a pale Umbral Vampire stalks the portrait gallery!",
        choices: [
          { t: "Reassure Rozalia and ask for her help against the manor's horrors.", badge: "Persuasion / Spirit DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 4, fail: 4, passMsg: "Rozalia shares hidden healing potions and warns you never to linger near the painted frames!", failMsg: "Too frightened to speak further, Rozalia bolts the pantry door behind her." }, onPass: { cw: "ROZALIA_HELP", healHp: 14 } },
          { t: "Search Lord Mazar's ruined study for notes on how to deactivate the Arborstone.", badge: "Arcana / Lore DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 4, fail: 4, passMsg: "You copy Mazar's deactivation sigils—giving you a clean way to shatter the vampire's tether!", failMsg: "Shadows curl off the bookshelves, forcing you onward into the gallery!" }, onPass: { cw: "STONE_NOTES" } }
        ]
      },
      4: {
        zone: "Portrait Gallery",
        title: "Hands From the Frames",
        text: "Cold drafts rattle the gilded oil paintings lining Mazar's grand hallway. Suddenly a gaunt, ink-black hand reaches straight out of a portrait frame—an Umbral Vampire slipping effortlessly from shadow to shadow!",
        choices: [
          { t: "Smash the gilded portrait frames before the vampire can ambush you!", badge: "Perception / Strength DC 13", check: { stat: "might", skill: "Perception", dc: 13, pass: 5, fail: 5, passMsg: "Splintering the frames forces the Umbral Vampire into the open conservatory!", failMsg: "An icy umbral grasp rakes your shoulder as you rush into the conservatory!" }, onPass: { cw: "FRAMES_BROKEN" } },
          { t: "[Turn Undead] Flood the gallery with sunlight-bright radiance!", reqSpell: "Turn Undead", to: 5 }
        ]
      },
      5: {
        zone: "The Arborstone Conservatory",
        title: "Lord of the Shadow Maze",
        text: "Beneath a shattered glass dome stands the pulsing black Arborstone, thick shadow-roots snaking outward across Ogrodu. Floating before it, the Umbral Vampire hisses with void-cold fury as it draws a silvered dueling foil!",
        enemy: { name: "Mazar's Umbral Vampire", desc: "An incorporeal shadow-undead bound to the cursed Arborstone.", hp: 60, ac: 15, atk: 7, dmg: 10, undead: true, xp: 170, gold: 115, items: ["bq_arborstone_silver_blade"], weakCw: ["ROZALIA_HELP", "STONE_NOTES", "FRAMES_BROKEN"] },
        choices: [
          { t: "Trace the counter-runes to cleanly deactivate the Arborstone!", to: 6 }
        ]
      },
      6: {
        zone: "Withered Labyrinth",
        title: "Sunlight Over Ogrodu",
        text: "As the Arborstone's dark glow fades to harmless grey quartz, the towering shadow-hedges outside collapse into dry autumn leaves. Sunlight floods Ogrodu's square once more!",
        choices: [
          { t: "Escort Rozalia out of the manor and return to the cheering villagers.", to: 7 }
        ]
      },
      7: {
        zone: "Ogrodu Square",
        title: "Gratitude of the Village",
        text: "The villagers cheer as their buried cottages reappear in the afternoon sun, pressing a pooled pouch of silver into your hands.",
        onEnter: { gold: 40, msg: "Ogrodu's grateful elders add +40 GP to your reward!" },
        choices: [
          { t: "Leave the sunlit valley behind and march home to Oakhaven.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "The Maze Unwoven",
        text: "The Arborstone lies dormant, Mazar's vampire is banished, and Ogrodu breathes freely beneath open skies.",
        ending: { type: "true", title: "Bane of the Shadow Labyrinth", xp: 250, gold: 190, trophy: "Dormant Arborstone Shard" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. GOLD AND GLORY (8 PAGES • LV 1)
  // ==========================================================
  bk_b23_gold_and_glory: {
    id: "bk_b23_gold_and_glory",
    title: "Gold and Glory",
    subtitle: "Capleon Pioneer Camp & The Mharoti Spire",
    difficulty: "Easy",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Join Zavrin Tavv's Pioneer mercenaries for a daring first contract—infiltrate a suspicious finger-spired village and expose a hidden Mharoti spy-cell!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Pioneer Mercenary Camp",
        title: "Basic Training",
        safeRetreat: true,
        text: "Canvas tents snap outside Capleon where Zavrin Tavv's Pioneer company is trying to rebuild its reputation. Lieutenant Afenso Ayeshi eyes you sharply: 'Show your mettle in camp, recruit, and I've got a live scouting contract—an odd spired village that smells like Mharoti Dragon-Empire spies!'",
        choices: [
          { t: "Impress Lieutenant Ayeshi on the sparring ring and obstacle course!", badge: "Athletics / Strength DC 10", check: { stat: "might", skill: "Athletics", dc: 10, pass: 2, fail: 2, passMsg: "Ayeshi grins and issues you extra field rations and a map of the spire's blind spots!", failMsg: "You take a bruise on the spar-ring, though Ayeshi still signs your contract." }, onPass: { cw: "CAMP_FAVOR", healHp: 5 } },
          { t: "Study Ayeshi's border-intelligence charts for Mharoti troop signals.", badge: "Perception / Arcana DC 10", check: { stat: "arcana", skill: "Perception", dc: 10, pass: 2, fail: 2, passMsg: "You memorize the Mharoti courier cipher before marching out!", failMsg: "The cipher is dense, so you pack your gear and head out with the squad." }, onPass: { cw: "CIPHER_KNOWN" } }
        ]
      },
      2: {
        zone: "Spired Village Outskirts",
        title: "Fingers of Stone",
        text: "Odd rocky spires rise above the quiet village like the fingers of a hand. Masked mercenaries patrol beside the dog-pens, guarding a central stone tower where Dragon-Empire agents have set up shop!",
        choices: [
          { t: "Slip past the quiet dog-pens and pick the side-door lock into the tower!", badge: "Stealth / Lockpicking DC 10", check: { stat: "agility", skill: "Stealth", dc: 10, pass: 4, fail: 3, passMsg: "You glide past the sleeping hounds straight into the tower's ledger room!", failMsg: "A hound barks—masked mercenaries sprint out of the troop cottages!" }, onPass: { cw: "DOGS_BYPASSED" } },
          { t: "Charge straight down the village lane to draw out the masked guards!", to: 3 }
        ]
      },
      3: {
        zone: "Village Lane",
        title: "Masked Mercenaries",
        text: "Hired sellswords wearing bronze masks fan out from the cottages, barking orders to keep intruders away from the central spire!",
        enemy: { name: "Mharoti Hired Guards", desc: "Masked mercenaries paid to shield the Dragon-Empire spy cell.", hp: 16, ac: 11, atk: 3, dmg: 4, xp: 40, gold: 25, items: rollRandomLoot(["consumable", "valuable"], 1, "common"), flee: 1, weakCw: ["CAMP_FAVOR"] },
        choices: [
          { t: "Kick open the iron-bound door of the central spire!", to: 4 }
        ]
      },
      4: {
        zone: "Tower Ledger Room",
        title: "Codebooks & Strongboxes",
        text: "Inside the spire's scriptorium, stacks of Mharoti codebooks and troop-movement scrolls cover a cedar desk beside a locked pay-chest!",
        choices: [
          { t: "Pick the pay-chest lock and grab the Mharoti codebooks before climbing up!", badge: "Lockpicking / Agility DC 11", check: { stat: "agility", skill: "Lockpicking", dc: 11, pass: 5, fail: 5, passMsg: "Click! You pocket +30 GP in Dragon-Empire coin and the coded dispatches!", failMsg: "The lock jams—and footsteps patter furiously down the upper stair!" }, onPass: { cw: "CODEBOOKS_TAKEN", gold: 30 } },
          { t: "Sweep the coded scrolls into your satchel and rush the top floor!", to: 5 }
        ]
      },
      5: {
        zone: "Spire Command Loft",
        title: "The Kobold Spellclerk",
        text: "A sharp-eyed kobold spellclerk in crimson spy-robes leaps onto a map table, crackling a lightning-charged discipline rod as two edjet initiates rush to protect their officer!",
        enemy: { name: "Mharoti Kobold Spellclerk", desc: "A cunning Dragon-Empire spy-officer wielding a crackling discipline rod.", hp: 20, ac: 12, atk: 4, dmg: 5, xp: 60, gold: 40, items: ["bq_mharoti_discipline_rod"], weakCw: ["CIPHER_KNOWN", "DOGS_BYPASSED", "CODEBOOKS_TAKEN"] },
        choices: [
          { t: "Gather the last Mharoti dispatches and hurry back to Capleon camp!", to: 6 }
        ]
      },
      6: {
        zone: "Capleon Road",
        title: "Out of the Dragon's Reach",
        text: "With the spy-cell exposed and its coded ledgers tucked inside your pack, you make swift time back down the sunny Capleon highway.",
        onEnter: { healHp: 8, msg: "A quick rest along the road restores +8 HP!" },
        choices: [
          { t: "Report straight to Lieutenant Ayeshi and Captain Zavrin Tavv.", to: 7 }
        ]
      },
      7: {
        zone: "Pioneer Command Tent",
        title: "Esteem of the Pioneers",
        text: "Captain Zavrin Tavv whistles in admiration as Lieutenant Ayeshi spreads the Mharoti troop scrolls across the war-table. 'Gold and glory, recruit—you've just put the Pioneers back on the map!'",
        choices: [
          { t: "Collect your mercenary bonus and return to Oakhaven.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "First Contract Honored",
        text: "The Mharoti spy-tower is shuttered, Capleon's garrisons are forewarned, and the Pioneers toast your name!",
        ending: { type: "true", title: "Pioneer of Gold & Glory", xp: 95, gold: 85, trophy: "Broken Fang Talisman" },
        choices: []
      }
    }
  }
});
