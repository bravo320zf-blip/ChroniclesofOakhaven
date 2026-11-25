/* ============================================================
   BOOK QUEST CONVERSIONS — BATCH 021 (10 Quests, Lv 1–12)
   - 7 Standalone Quests: Monkey Business, Black Sarcophagus,
     Smuggler's Run, Wrath of the Bramble King, Pride of the Mushroom Queen,
     Shadow's Envy, Skeletons of the Illyrian Fleet
   - 3-Part Linked Series (Trollheim Chronicles • Lv 2 → 7 → 12):
     The Empty Village, The Wilding Call, The Beacon at the Top of the World
   All quests use autoDiscover: false (Inn Rumor Pool / reqQuest chains).
   ============================================================ */
window.OAKHAVEN.registerQuests({

  // ==========================================================
  // 1. MONKEY BUSINESS (7 PAGES • LV 1)
  // ==========================================================
  bk_b21_monkey_business: {
    id: "bk_b21_monkey_business",
    title: "Monkey Business",
    subtitle: "Bab-el-Fanban's Pier & The Iron Flask",
    difficulty: "Easy-Medium",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Untangle the tall tales of three scheming brothers at Bab-el-Fanban's Pier and recover a dropped iron flask hosting a mischievous efreeti-bound monkey spirit before chaos consumes the docks.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Bab-el-Fanban's Pier",
        title: "Three Brothers, Three Tall Tales",
        safeRetreat: true,
        text: "A dandy rogue in an impossibly clean white robe—Kassir the Charmer—flashes a silver pocket-mirror and begs your help recovering a 'family heirloom' iron flask dropped into the Furnace docks. Behind a spice-crate, his two rival brothers hiss conflicting whispers that the flask actually traps an efreeti-serving monkey spirit!",
        choices: [
          { t: "See through Kassir's flattery to learn the iron flask's true command word!", badge: "Persuasion / Perception DC 9", check: { stat: "spirit", skill: "Perception", dc: 9, pass: 2, fail: 2, passMsg: "Caught off guard, Kassir blurts out the flask's binding phrase!", failMsg: "Kassir slips away in the crowd as frantic shrieks erupt from the Furnace warehouse!" }, onPass: { cw: "FLASK_PHRASE" } },
          { t: "Dash straight into the Furnace warehouse after the chittering commotion!", to: 2 }
        ]
      },
      2: {
        zone: "The Furnace Docks",
        title: "Dockside Cutthroats",
        text: "Hired dock-toughs paid by the scheming brothers bar the smokestack alley while a glowing, brass-collared monkey-spirit pelts lanterns from the rafters!",
        enemy: { name: "Kassir's Hired Cutthroats", desc: "Greedy dockside thugs racing to snatch the iron flask.", hp: 14, ac: 11, atk: 3, dmg: 3, xp: 34, gold: 20, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["FLASK_PHRASE"] },
        choices: [
          { t: "Corner the blazing monkey spirit beside the glowing Furnace kiln!", to: 3 }
        ]
      },
      3: {
        zone: "The Furnace Kiln",
        title: "The Efreeti's Monkey Spirit",
        text: "Sparks dance off the soot-blackened kiln as the furious, fire-tailed Monkey Spirit leaps onto the dropped iron flask, hurling cinders and snapping fangs!",
        enemy: { name: "Cinder-Tailed Monkey Spirit", desc: "Fiery elemental trickster bound to an ancient efreeti flask.", hp: 18, ac: 12, atk: 4, dmg: 4, xp: 52, gold: 32, items: ["bq_efreeti_monkey_flask"], weakCw: ["FLASK_PHRASE"] },
        choices: [
          { t: "Seal the iron flask safely and confiscate the brothers' bribery purse!", to: 4 }
        ]
      },
      4: {
        zone: "Harbor Pier",
        title: "Brothers Outsmarted",
        text: "With the spirit safely stoppered, the three squabbling brothers flee down the quay—leaving behind 25 GP in dropped coin.",
        onEnter: { gold: 25, healHp: 6, msg: "Secured the flask (+25 GP, +6 HP)!" },
        choices: [
          { t: "Report the averted dockside fire to the harbormaster.", to: 5 }
        ]
      },
      5: {
        zone: "Harbormaster's Office",
        title: "Quay Saved",
        text: "Grateful that Bab-el-Fanban's Pier did not go up in efreeti flame, the harbormaster counts out a crisp bounty.",
        choices: [
          { t: "Claim your reward!", to: 6 }
        ]
      },
      6: {
        zone: "Dockside Tavern",
        title: "Quiet Wharves",
        text: "Sailors laugh over the tale of the three dandy brothers and their runaway monkey.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Tamer of the Iron Flask",
        text: "The mischievous cinder-spirit is sealed, and Bab-el-Fanban's Pier stands unburned!",
        ending: { type: "true", title: "Tamer of the Iron Flask", xp: 75, gold: 70, trophy: "Kassir's Silver Pocket-Mirror" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. BLACK SARCOPHAGUS (7 PAGES • LV 6)
  // ==========================================================
  bk_b21_black_sarcophagus: {
    id: "bk_b21_black_sarcophagus",
    title: "Black Sarcophagus",
    subtitle: "Tomb of Xulthas-Ka • Black Lotus Mesa",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Scale the mile-high western cliffs of Black Lotus Mesa to breach the Tomb of Xulthas-Ka, survive urn-bound serpent wraiths, and confront the obsidian Black Sarcophagus.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Black Lotus Mesa",
        title: "Hall of Serpent Urns",
        safeRetreat: true,
        text: "Cut straight into the mile-high western cliff stands the dust-sealed Tomb of Xulthas-Ka. Rows of painted clay urns crowd the echoing antechamber—vibrating faintly with trapped necrotic whispers!",
        choices: [
          { t: "Step delicately around the humming urns to spot the hidden spade-chamber lever!", badge: "Stealth / Perception DC 13", check: { stat: "agility", skill: "Stealth", dc: 13, pass: 2, fail: 2, failDmg: 6, passMsg: "You slip past the fragile clay jars without waking the urn-wraith early!", failMsg: "Three urns shatter—a hissing serpent-wraith lashes out from the dust (-6 HP)!" }, onPass: { cw: "URNS_INTACT" } },
          { t: "Smash through the urn-rows and force the tiled stone slab!", to: 2 }
        ]
      },
      2: {
        zone: "Burial Antechamber",
        title: "Serpent Wraith & Servant of Yig",
        text: "Luminous green mist curls from shattered jars as a coiled Snake-Wraith and a clattering Skeletal Servant of Yig lunge to bar the hidden chamber!",
        enemy: { name: "Serpent Wraith & Yig Servant", desc: "Undead reptilian guardians of Xulthas-Ka's tomb.", hp: 56, ac: 15, atk: 8, dmg: 8, undead: true, xp: 170, gold: 90, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["URNS_INTACT"] },
        choices: [
          { t: "Slide back the tiled rock slab into the hidden obsidian chamber!", to: 3 }
        ]
      },
      3: {
        zone: "Hidden Obsidian Chamber",
        title: "The Black Sarcophagus",
        text: "In the center of the spade-shaped vault rests a solid obsidian sarcophagus traced with void calligraphy! Luminous green vapor coalesces into the towering, serpent-headed shade of Xulthas-Ka!",
        enemy: { name: "Xulthas-Ka, Serpent Shade", desc: "Ancient void-touched serpent lich bound to the obsidian tomb.", hp: 68, ac: 16, atk: 9, dmg: 9, undead: true, xp: 245, gold: 175, items: ["bq_xulthas_obsidian_scarab"], weakCw: ["URNS_INTACT"] },
        choices: [
          { t: "Claim the void-etched relic within the sarcophagus and seal the slab!", to: 4 }
        ]
      },
      4: {
        zone: "Tomb Reliquary",
        title: "Lotus-Mesa Gold",
        text: "Inside the quieted sarcophagus rest 90 GP in antique gold rings and a bundle of rare black-lotus incense.",
        onEnter: { gold: 90, healHp: 14, msg: "Claimed 90 GP & rested before the climb down (+14 HP)!" },
        choices: [
          { t: "Rappel down the western cliffs of Black Lotus Mesa.", to: 5 }
        ]
      },
      5: {
        zone: "Mesa Floor",
        title: "Starlit Desert",
        text: "The cold green glow fades from the cliff-mouth high above.",
        choices: [
          { t: "Return to Oakhaven with the relic of Xulthas-Ka!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven",
        title: "Void Tamed",
        text: "Arcanists study your account of the obsidian calligraphy with hushed awe.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Breaker of the Black Sarcophagus",
        text: "The serpent shade of Xulthas-Ka is banished, and Black Lotus Mesa lies quiet!",
        ending: { type: "true", title: "Conqueror of Black Lotus Mesa", xp: 270, gold: 260, trophy: "Obsidian Serpent Glyph" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. SMUGGLER'S RUN (7 PAGES • LV 5)
  // ==========================================================
  bk_b21_smugglers_run: {
    id: "bk_b21_smugglers_run",
    title: "Smuggler's Run",
    subtitle: "Trombei Docks & The Swamp Grotto Hideout",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Track a vanished Trombei townsfolk to a net-trapped smuggler warehouse, enlist Beatriz's aid along the swamp waterway, and smash Graydion's cueyatl ambush.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Trombei Back Alley",
        title: "The Trapped Warehouse",
        safeRetreat: true,
        text: "Your search for a missing Trombei resident leads to a shuttered dockside warehouse with a concealed back door. Inside, taut tripwires connect to weighted net-traps strung across the ceiling beams!",
        choices: [
          { t: "Spot and disarm the falling net-traps before slipping inside to question Beatriz!", badge: "Perception / Lockpicking DC 12", check: { stat: "agility", skill: "Perception", dc: 12, pass: 2, fail: 2, failDmg: 5, passMsg: "You cut the net-wires cleanly—winning smuggler Beatriz's respect so she guides you to the swamp grotto!", failMsg: "Weighted hemp nets drop over your shoulders (-5 HP) as cutthroats rush in!" }, onPass: { cw: "BEATRIZ_GUIDE" } },
          { t: "Kick open the warehouse door and demand answers at blade-point!", to: 2 }
        ]
      },
      2: {
        zone: "Swamp Waterway",
        title: "The Former Hideout",
        text: "Hidden behind drooping cypress roots yawns the smugglers' flooded swamp grotto—now overrun by frog-faced Cueyatl ambushers hired by Graydion!",
        enemy: { name: "Swamp Cueyatl Raiders", desc: "Amphibious jungle-stalkers guarding Graydion's captives.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 135, gold: 68, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["BEATRIZ_GUIDE"] },
        choices: [
          { t: "Storm the inner grotto dock where Graydion awaits!", to: 3 }
        ]
      },
      3: {
        zone: "Inner Grotto",
        title: "Graydion's Double-Cross",
        text: "Standing beside a moored smuggling skiff, ruthless schemer Graydion sneers and draws twin poisoned sabers as his cueyatl champion leaps from the murky water!",
        enemy: { name: "Graydion & Cueyatl Champion", desc: "Treacherous smuggler-hunter and his amphibious bodyguard.", hp: 58, ac: 15, atk: 8, dmg: 8, xp: 195, gold: 135, items: ["bq_trombei_smuggler_blade"], weakCw: ["BEATRIZ_GUIDE"] },
        choices: [
          { t: "Untie the missing Trombei captives and claim Graydion's contraband chest!", to: 4 }
        ]
      },
      4: {
        zone: "Grotto Pier",
        title: "Captives Rescued",
        text: "You free the bound Trombei townsfolk from the skiff and recover 80 GP in confiscated trade-coin.",
        onEnter: { gold: 80, healHp: 12, msg: "Freed the captives (+80 GP, +12 HP)!" },
        choices: [
          { t: "Pole the skiff back out through the cypress waterway to Trombei.", to: 5 }
        ]
      },
      5: {
        zone: "Trombei Wharf",
        title: "Home Safe",
        text: "Relieved families embrace the returned captives along the lantern-lit docks.",
        choices: [
          { t: "Collect the townsfolk's grateful reward!", to: 6 }
        ]
      },
      6: {
        zone: "Harbor Square",
        title: "Graydion's Fall",
        text: "Beatriz raises a quiet mug from the shadows—the waterway belongs to honest haulers again.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Hero of Smuggler's Run",
        text: "Graydion's deadly double-cross is ended, and Trombei's missing citizens are safe!",
        ending: { type: "true", title: "Breaker of Smuggler's Run", xp: 220, gold: 210, trophy: "Trombei Smuggler's Compass" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. WRATH OF THE BRAMBLE KING (7 PAGES • LV 2)
  // ==========================================================
  bk_b21_bramble_king: {
    id: "bk_b21_bramble_king",
    title: "Wrath of the Bramble King",
    subtitle: "The Overgrown Tower & The Missing Crown",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Stop thorny bramble-beasts tearing apart a frontier village in search of a stolen crown, brave the halberd-traps of the Overgrown Tower, and face the heartbroken Bramble King.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Overgrown Tower Base",
        title: "Thorns & Halberd Tripwires",
        safeRetreat: true,
        text: "Massive thorny vines swallow a crooked stone tower where the grieving Bramble King believes villagers stole his cherished crown. Across the entry arch gleams a razor-sharp halberd rigged to a hidden tripwire!",
        choices: [
          { t: "Disarm the halberd tripwire and listen for the real crown-thief's tracks!", badge: "Lockpicking / Perception DC 10", check: { stat: "agility", skill: "Lockpicking", dc: 10, pass: 2, fail: 2, failDmg: 4, passMsg: "You unhook the halberd cleanly and spot shiny magpie-feathers leading to a roof niche!", failMsg: "WHOOSH! The swinging halberd grazes your shoulder (-4 HP)!" }, onPass: { cw: "CROWN_CLUE" } },
          { t: "Hack straight through the thorny doorway into the tower!", to: 2 }
        ]
      },
      2: {
        zone: "Briar Stairwell",
        title: "Bramble-Hounds",
        text: "Snarling hounds woven from twisting rose-thorns and roots bound down the spiraling stone steps!",
        enemy: { name: "Thorny Bramble-Hounds", desc: "Fierce plant-beasts sent to hunt the missing crown.", hp: 20, ac: 11, atk: 4, dmg: 4, xp: 48, gold: 25, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["CROWN_CLUE"] },
        choices: [
          { t: "Ascend to the vine-choked throne room of the Bramble King!", to: 3 }
        ]
      },
      3: {
        zone: "Tower Crown",
        title: "The Broken King",
        text: "Standing a head taller than any mortal, a figure woven from hundreds of thorny vines weeps with rage and despair—the Bramble King, still a heartbroken boy beneath his briar form!",
        enemy: { name: "The Bramble King", desc: "Towering vine-monarch consumed by grief over his lost crown.", hp: 27, ac: 12, atk: 5, dmg: 5, xp: 78, gold: 55, items: ["bq_bramble_king_circlet"], weakCw: ["CROWN_CLUE"] },
        choices: [
          { t: "Return the tarnished crown plucked from the magpie nest and calm his wrath!", to: 4 }
        ]
      },
      4: {
        zone: "Quieted Tower",
        title: "Thorns Recede",
        text: "Softened by peace, the Bramble King withdraws his thorny beasts from the village and offers 40 GP in ancient tower coins buried beneath his roots.",
        onEnter: { gold: 40, healHp: 8, msg: "Calmed the Bramble King (+40 GP, +8 HP)!" },
        choices: [
          { t: "Carry news of peace back to the frightened villagers.", to: 5 }
        ]
      },
      5: {
        zone: "Village Green",
        title: "Homes Spared",
        text: "The villagers cheer as the tangled vines around their cottages wilt harmlessly away.",
        choices: [
          { t: "Accept the village elders' reward!", to: 6 }
        ]
      },
      6: {
        zone: "Village Hearth",
        title: "A Gentle Truce",
        text: "Young Tremika smiles safely beside the hearth, grateful the Bramble King was spared.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Peacemaker of the Overgrown Tower",
        text: "The Bramble King's wrath is soothed, and the frontier village stands safe!",
        ending: { type: "true", title: "Soother of the Bramble King", xp: 105, gold: 100, trophy: "Silver-Thorn Sprig" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. PRIDE OF THE MUSHROOM QUEEN (7 PAGES • LV 6)
  // ==========================================================
  bk_b21_mushroom_queen: {
    id: "bk_b21_mushroom_queen",
    title: "Pride of the Mushroom Queen",
    subtitle: "The Fungal Citadel & The Enoki Scepter",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Breach the black-and-red striped doors of the Fungal Citadel blighting the Arbonesse woods, free the elf-shaped fungal thralls, and shatter the Mushroom Queen's Enoki Scepter.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Fungal Citadel Gate",
        title: "Black-and-Red Striped Doors",
        safeRetreat: true,
        text: "Towering caps of crimson and obsidian fungus form a living citadel deep in the Arbonesse woods. Handleless striped doors block entry—yet a faint recessed nodule pulses in the spongy jamb!",
        choices: [
          { t: "Locate the hidden spore-nodule to swing the doors open without tripping the spore-vent!", badge: "Perception / Herbalism DC 13", check: { stat: "spirit", skill: "Perception", dc: 13, pass: 2, fail: 2, failDmg: 6, passMsg: "You press the slimy nodule gently—slipping inside unseen without choking on spores!", failMsg: "Hacking the spongy door releases a blistering spore-cloud (-6 HP)!" }, onPass: { cw: "NODULE_OPENED" } },
          { t: "Hack straight through the striped fungal doors with steel!", to: 2 }
        ]
      },
      2: {
        zone: "The Gallery of Statues",
        title: "Awakened Fungal Thralls",
        text: "Lining the vaulted hall stand eerie, elf-shaped fungal 'statues'—tragic Arbonesse victims claimed by the Enoki Scepter—suddenly stepping off their plinths to block your path!",
        enemy: { name: "Fungal Elf-Thralls", desc: "Spore-animated woodland guardians of the Fungal Citadel.", hp: 55, ac: 14, atk: 8, dmg: 8, xp: 168, gold: 88, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["NODULE_OPENED"] },
        choices: [
          { t: "Press into the glowing cap-throne room of the Mushroom Queen!", to: 3 }
        ]
      },
      3: {
        zone: "Mycelial Throne Room",
        title: "The Mushroom Queen",
        text: "Crowned in bioluminescent toadstools and brandishing the pulsing Enoki Scepter, the proud Mushroom Queen unleashes billowing violet clouds of virulent spores!",
        enemy: { name: "The Mushroom Queen", desc: "Imperious fungal sovereign wielding the blighted Enoki Scepter.", hp: 68, ac: 15, atk: 9, dmg: 9, xp: 245, gold: 170, items: ["bq_enoki_spore_scepter"], weakCw: ["NODULE_OPENED"] },
        choices: [
          { t: "Shatter the blight-core beneath her throne and cleanse the Arbonesse glade!", to: 4 }
        ]
      },
      4: {
        zone: "Cleansed Citadel",
        title: "Spores Dissolved",
        text: "As the Mushroom Queen falls, the virulent haze evaporates in golden sunlight—leaving 90 GP in salvaged elven silver beside the throne.",
        onEnter: { gold: 90, healHp: 14, msg: "Cleansed the citadel (+90 GP, +14 HP)!" },
        choices: [
          { t: "Bring word of the blight's end to the surviving Arbonesse elves.", to: 5 }
        ]
      },
      5: {
        zone: "Arbonesse Clearing",
        title: "Green Shoots",
        text: "Fresh green moss replaces the red-and-black fungal crust along the forest road.",
        choices: [
          { t: "Receive the elves' heartfelt tribute!", to: 6 }
        ]
      },
      6: {
        zone: "Woodland Camp",
        title: "Gratitude of the Grove",
        text: "Elven wardens bow deeply as you hand over the purified remnants of the Enoki Scepter.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Bane of the Fungal Citadel",
        text: "The Mushroom Queen's pride is broken, and the Arbonesse woods breathe clean air once more!",
        ending: { type: "true", title: "Breaker of the Fungal Citadel", xp: 270, gold: 255, trophy: "Purified Enoki Crown" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. SHADOW'S ENVY (7 PAGES • LV 10)
  // ==========================================================
  bk_b21_shadows_envy: {
    id: "bk_b21_shadows_envy",
    title: "Shadow's Envy",
    subtitle: "The Blot • Night Hag Coven & Cauldron of Souls",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Cross the hazy boundary of The Blot where a bitter clash between shadow fey and planar elves birthed a nightmare, and destroy the night hags' soul-harvesting Cauldron of Souls.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Edge of The Blot",
        title: "Shifting Shadowstuff",
        safeRetreat: true,
        text: "A swirling curtain of living twilight swallows the Summer Lands trail—The Blot, where compasses spin wildly and every step threatens to twist your soul toward the Weft of Shadow!",
        choices: [
          { t: "Anchor your spirit with arcane focus to navigate straight through the shifting haze!", badge: "Arcana / Spirit DC 16", check: { stat: "arcana", skill: "Spirit", dc: 16, pass: 2, fail: 2, failDmg: 10, passMsg: "You pierce the Blot's hazy veil and catch the shadow-guards completely off balance!", failMsg: "Disorienting twilight tears at your vitality (-10 HP)!" }, onPass: { cw: "BLOT_ANCHORED" } },
          { t: "March boldly into the twisting shadowstuff with blade gleaming!", to: 2 }
        ]
      },
      2: {
        zone: "Twilight Boundary",
        title: "Weft of Shadow Sentinels",
        text: "Blade-dancing shadow fey assassins serving the Weft of Shadow materialize out of the hazy air around Qeldar's shattered planar road!",
        enemy: { name: "Weft of Shadow Sentinels", desc: "Elusive twilight duelists defending the Blot's heart.", hp: 92, ac: 17, atk: 11, dmg: 12, xp: 340, gold: 185, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["BLOT_ANCHORED"] },
        choices: [
          { t: "Storm the boiling chamber of the Cauldron of Souls!", to: 3 }
        ]
      },
      3: {
        zone: "Chamber of the Cauldron",
        title: "The Night Hag Coven",
        text: "Around a colossal iron Cauldron of Souls boiling with captured starlight cackles a coven of three Night Hags—harvesting essence to expand The Blot across the Summer Lands!",
        enemy: { name: "Night Hag Coven of The Blot", desc: "Wicked planar hags fueling the soul-harvesting Cauldron.", hp: 112, ac: 18, atk: 12, dmg: 13, xp: 475, gold: 325, items: ["bq_blot_soul_lantern"], weakCw: ["BLOT_ANCHORED"] },
        choices: [
          { t: "Overturn the Cauldron of Souls and release the trapped planar spirits!", to: 4 }
        ]
      },
      4: {
        zone: "Dissipating Blot",
        title: "Souls Unbound",
        text: "Golden motes stream skyward as the Cauldron cracks in two—revealing 160 GP in astral silver offered by the grateful planar elves.",
        onEnter: { gold: 160, healHp: 22, msg: "Shattered the Cauldron (+160 GP, +22 HP)!" },
        choices: [
          { t: "Step out of the fading twilight onto the sunlit Summer Road.", to: 5 }
        ]
      },
      5: {
        zone: "Summer Lands Road",
        title: "Shadow Banished",
        text: "Behind you, the last ribbons of The Blot dissolve into harmless mist.",
        choices: [
          { t: "Return to Oakhaven with proof of the coven's fall!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven",
        title: "Planar Peace",
        text: "Both mortal and fey envoys salute your triumph over the Weft of Shadow.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Shatterer of The Blot",
        text: "The Cauldron of Souls is broken, and the shadow roads are safe once more!",
        ending: { type: "true", title: "Breaker of Shadow's Envy", xp: 510, gold: 480, trophy: "Shard of the Soul Cauldron" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. SKELETONS OF THE ILLYRIAN FLEET (7 PAGES • LV 5)
  // ==========================================================
  bk_b21_illyrian_fleet: {
    id: "bk_b21_illyrian_fleet",
    title: "Skeletons of the Illyrian Fleet",
    subtitle: "Blighted Shoreline & Wreck of the Lost Menalcas",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Board the broken hull of the Lost Menalcas along a blighted shoreline, survive gas spores in the flooded hold, and lay the tragic Nameless Warrior to rest.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Blighted Shoreline",
        title: "Wreck of the Lost Menalcas",
        safeRetreat: true,
        text: "Ragged sails drape like a shroud over the snapped hull of the Lost Menalcas, littered with the salt-bleached colors of both Illyrian and Mharoti dead. On the port side, a shadowed hull-breach offers a quiet route straight into the flooded hold!",
        choices: [
          { t: "Spot the concealed port-side hull breach and slip past the deck hazards!", badge: "Perception / Athletics DC 12", check: { stat: "agility", skill: "Athletics", dc: 12, pass: 2, fail: 2, failDmg: 5, passMsg: "You climb smoothly through the port breach without disturbing the bloated spores!", failMsg: "Slick barnacles tear your boot as you tumble onto the splintered deck (-5 HP)!" }, onPass: { cw: "PORT_BREACH" } },
          { t: "Scale the barnacle-slick starboard hull straight onto the main deck!", to: 2 }
        ]
      },
      2: {
        zone: "Main Hold",
        title: "Gas Spores & Drowned Marines",
        text: "Water-rotted crates float across the dark hold where bloated fungal Gas Spores drift beside risen Illyrian deck-skeletons!",
        enemy: { name: "Drowned Marines & Gas Spores", desc: "Salt-crusted undead sailors and bursting hold-fungi.", hp: 46, ac: 14, atk: 7, dmg: 7, undead: true, xp: 138, gold: 70, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["PORT_BREACH"] },
        choices: [
          { t: "Descend the flooded stairs into the lower hold to face the Nameless Warrior!", to: 3 }
        ]
      },
      3: {
        zone: "Flooded Lower Hold",
        title: "The Nameless Warrior",
        text: "Clinging eternally to the shattered keel where rescue never came, the armored, salt-weeping Nameless Warrior raises a notched naval glaive in silent, heartbroken fury!",
        enemy: { name: "The Nameless Warrior", desc: "Vengeful undead survivor of the forgotten naval slaughter.", hp: 58, ac: 15, atk: 8, dmg: 8, undead: true, xp: 195, gold: 135, items: ["bq_menalcas_sea_glaive"], weakCw: ["PORT_BREACH"] },
        choices: [
          { t: "Salute the fallen soldier and salvage the ship's intact pay-chest!", to: 4 }
        ]
      },
      4: {
        zone: "Captain's Strongbox",
        title: "Rest at Last",
        text: "As the Nameless Warrior finally dissolves into peaceful sea-foam, you pry open the brine-sealed naval pay-chest for 85 GP.",
        onEnter: { gold: 85, healHp: 12, msg: "Claimed 85 GP from the naval pay-chest (+12 HP)!" },
        choices: [
          { t: "Wade back onto the clearing shoreline.", to: 5 }
        ]
      },
      5: {
        zone: "Coastal Bluffs",
        title: "Calm Tide",
        text: "For the first time in years, gentle surf laps quietly against the Lost Menalcas.",
        choices: [
          { t: "Return to Oakhaven with the naval salvage!", to: 6 }
        ]
      },
      6: {
        zone: "Harbor Guild",
        title: "Honoring the Dead",
        text: "Naval chroniclers record the Nameless Warrior's valor and pay your salvage share.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Silencer of the Lost Menalcas",
        text: "The restless dead of the Illyrian Fleet sleep peacefully beneath the waves!",
        ending: { type: "true", title: "Salvager of the Lost Menalcas", xp: 225, gold: 215, trophy: "Illyrian Naval Medallion" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. TROLLHEIM CHRONICLES I: THE EMPTY VILLAGE (8 PAGES • LV 2)
  // Part 1 of 3
  // ==========================================================
  bk_b21_trollheim_1: {
    id: "bk_b21_trollheim_1",
    title: "Trollheim Chronicles I: The Empty Village",
    subtitle: "Part 1 of 3 • Fjellgard Snows & Kettek's Hunt",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Investigate why dispatches from the northern village of Fjellgard have stopped—only to find fey hunter Kettek, wicked fraughashar, and prowling snowcats besieging the surviving villagers!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Fjellgard Outskirts",
        title: "Silent Chimneys",
        safeRetreat: true,
        text: "A worried Trollheim courier hired you to learn why Fjellgard's dispatch is two days overdue. Snow blankets the empty village lane, yet faint torchlight leaks through a timber blockade across the frozen stream—while pale winter-fey lurk in the barns!",
        choices: [
          { t: "Track the frost-clawed snowcat prints to flank the hunting party from the mill-roof!", badge: "Stealth / Survival DC 10", check: { stat: "agility", skill: "Stealth", dc: 10, pass: 2, fail: 2, failDmg: 3, passMsg: "You drop behind the freezing fey hunters completely unseen!", failMsg: "Icicles clatter down—a jagged frost-dart grazes your shoulder (-3 HP)!" }, onPass: { cw: "FJELLGARD_FLANK" } },
          { t: "Charge straight down the snowy lane to break the siege!", to: 2 }
        ]
      },
      2: {
        zone: "Frozen Stream",
        title: "Fraughashar & Snowcats",
        text: "Three cackling, icicle-toothed Fraughashar winter-fey and prowling Snowcats snarl across the frozen stream beside the villagers' desperate barricade!",
        enemy: { name: "Fraughashar & Prowling Snowcats", desc: "Sadistic winter-fey and Kettek's feline hunting pack.", hp: 20, ac: 11, atk: 4, dmg: 4, xp: 50, gold: 28, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["FJELLGARD_FLANK"] },
        choices: [
          { t: "Confront the grinning fey hunter Kettek in the village hall!", to: 3 }
        ]
      },
      3: {
        zone: "Fjellgard Hall",
        title: "Kettek the Cheshirian Hunter",
        text: "Perched atop the overturned mead-table grins Kettek, a cruel cheshirian fey hunter who turned Fjellgard into his personal winter hunting preserve!",
        enemy: { name: "Kettek, Fey Hunter", desc: "Cruel cheshirian stalker terrorizing Fjellgard.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 78, gold: 55, items: ["bq_fjellgard_frost_cloak"], weakCw: ["FJELLGARD_FLANK"] },
        choices: [
          { t: "Unbar the villagers' timber barricade and tend to the grateful survivors!", to: 4 }
        ]
      },
      4: {
        zone: "Fjellgard Barricade",
        title: "The Village Saved",
        text: "Cheerful cries ring across the snow as Fjellgard's trapped villagers emerge unharmed, offering warm stew (+10 HP) and 35 GP alongside the delayed Trollheim dispatch.",
        onEnter: { gold: 35, healHp: 10, msg: "Saved Fjellgard (+35 GP, +10 HP)!" },
        choices: [
          { t: "Deliver the dispatch to Uffi Toothless's agents in Trollheim.", to: 5 }
        ]
      },
      5: {
        zone: "Trollheim Road",
        title: "Whispers of the Pack",
        text: "Along the snowy road, scouts whisper of another threat rising near Hoydeholm—the Pack of the Howling Sun.",
        choices: [
          { t: "Present the Fjellgard dispatch to Uffi Toothless!", to: 6 }
        ]
      },
      6: {
        zone: "Trollheim Hall",
        title: "Uffi Toothless Takes Notice",
        text: "Impressed by your rescue of Fjellgard, Trollheim's shrewd spymaster Uffi Toothless marks your name for a far deeper northern mission.",
        choices: [
          { t: "Complete Part 1 and unlock Part 2: The Wilding Call!", to: 7 }
        ]
      },
      7: {
        zone: "Frosty Hearth",
        title: "Ready for the North",
        text: "You pack silvered steel and warm furs for whatever waits beyond Trollheim.",
        choices: [
          { t: "Finish Part 1!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Savior of Fjellgard",
        text: "Fjellgard lives again! <strong>Trollheim Chronicles II: The Wilding Call</strong> is now unlocked!",
        ending: { type: "true", title: "Savior of Fjellgard (Part 1 of 3)", xp: 105, gold: 100, trophy: "Fjellgard Silver Dispatch" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. TROLLHEIM CHRONICLES II: THE WILDING CALL (8 PAGES • LV 7)
  // Part 2 of 3 (Prerequisite: bk_b21_trollheim_1)
  // ==========================================================
  bk_b21_trollheim_2: {
    id: "bk_b21_trollheim_2",
    reqQuest: "bk_b21_trollheim_1",
    title: "Trollheim Chronicles II: The Wilding Call",
    subtitle: "Part 2 of 3 • Bearfolk Parley & Pack of the Howling Sun",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Unlocks after Trollheim Chronicles I",
    summary: "Sent north by Uffi Toothless to investigate the Pack of the Howling Sun near Hoydeholm, parley with bearfolk chieftain Esben Frosttuft and shatter the werewolves' hidden compound!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Hoydeholm Pine Ridge",
        title: "Esben Frosttuft's Silvered Axe",
        safeRetreat: true,
        text: "Uffi Toothless dispatched you north to track captives taken by the Pack of the Howling Sun. On a snow-draped ridge, towering bearfolk chieftain Esben Frosttuft steps out with a gleaming silvered battleaxe—suspicious that you might be werewolf spies!",
        choices: [
          { t: "Lower your steel and speak calmly to Esben Frosttuft about hunting the Pack together!", badge: "Persuasion / Spirit DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 2, fail: 2, passMsg: "Surprised by your honor, Esben lowers her silvered axe and reveals the Pack's weak palisade!", failMsg: "Esben grunts skeptically and stalks off, leaving you to scout the snowy compound alone." }, onPass: { cw: "ESBEN_ALLY" } },
          { t: "Circle wide past the bearfolk lodge straight toward the Pack's compound!", to: 2 }
        ]
      },
      2: {
        zone: "Howling Sun Palisade",
        title: "Werewolf Initiates",
        text: "Howling beneath a blood-pale sun, feral initiates of the Pack of the Howling Sun leap from the timber palisade alongside falseman Albrus Svendig!",
        enemy: { name: "Howling Sun Werewolves", desc: "Savage lycanthrope raiders loyal to the Pack's Mother.", hp: 66, ac: 15, atk: 9, dmg: 9, xp: 215, gold: 110, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["ESBEN_ALLY"] },
        choices: [
          { t: "Storm the bone-hung longhouse to confront the Pack's Mother!", to: 3 }
        ]
      },
      3: {
        zone: "Pack Longhouse",
        title: "Mother of the Howling Sun",
        text: "Wreathed in lunar frenzy beside vats of mutagenic serum, the towering alpha known as Mother lunges with razor claws to silence Uffi Toothless's spies forever!",
        enemy: { name: "Mother, Alpha of the Howling Sun", desc: "Cunning werewolf matriarch commanding the northern raiders.", hp: 78, ac: 16, atk: 10, dmg: 10, xp: 305, gold: 200, items: ["bq_frosttuft_silver_axe"], weakCw: ["ESBEN_ALLY"] },
        choices: [
          { t: "Shatter the serum vats and release the captives from Hoydeholm!", to: 4 }
        ]
      },
      4: {
        zone: "Compound Yard",
        title: "Hoydeholm Freed",
        text: "The grateful Hoydeholm captives emerge from the timber cages as you claim 115 GP in silvered furs and pelts.",
        onEnter: { gold: 115, healHp: 16, msg: "Freed the captives (+115 GP, +16 HP)!" },
        choices: [
          { t: "Ride south to Trollheim as strange crimson lights flare on the far polar horizon!", to: 5 }
        ]
      },
      5: {
        zone: "Northern Horizon",
        title: "Heat at the Pole",
        text: "Even through freezing gales, an unnatural pillar of orange fire glows far to the north at the very top of the world.",
        choices: [
          { t: "Report to Uffi Toothless in Trollheim!", to: 6 }
        ]
      },
      6: {
        zone: "Trollheim Hall",
        title: "A Dire Commission",
        text: "Uffi Toothless stares gravely northward. 'You broke Fjellgard's curse and shattered the Pack—now only you can stop whatever burns at the pole!'",
        choices: [
          { t: "Complete Part 2 and unlock Part 3: The Beacon at the Top of the World!", to: 7 }
        ]
      },
      7: {
        zone: "Trollheim Armory",
        title: "Polar Provisions",
        text: "You load crampons, ice-picks, and fire-wards for the journey to the edge of the icecap.",
        choices: [
          { t: "Finish Part 2!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Bane of the Howling Sun",
        text: "The Pack is broken, and Hoydeholm is free! <strong>Trollheim Chronicles III: The Beacon at the Top of the World</strong> is now unlocked!",
        ending: { type: "true", title: "Breaker of the Howling Sun (Part 2 of 3)", xp: 335, gold: 310, trophy: "Silver Fang of the Pack" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. TROLLHEIM CHRONICLES III: THE BEACON AT THE TOP OF THE WORLD (8 PAGES • LV 12)
  // Part 3 of 3 (Prerequisite: bk_b21_trollheim_2)
  // ==========================================================
  bk_b21_trollheim_3: {
    id: "bk_b21_trollheim_3",
    reqQuest: "bk_b21_trollheim_2",
    title: "Trollheim Chronicles III: The Beacon at the Top of the World",
    subtitle: "Part 3 of 3 • Polar Temple of Surtur & Thursir Giants",
    difficulty: "Deadly",
    recommendedLevel: 12,
    autoDiscover: false,
    discoverySource: "Unlocks after Trollheim Chronicles II",
    summary: "Expedition to the frozen pole on Uffi Toothless's grand commission! Infiltrate the ancient Polar Temple of Surtur, defeat rune-forged thursir giants, and extinguish the apocalyptic fire-beacon!",
    totalPages: 8,
    pages: {
      1: {
        zone: "Polar Icecap",
        title: "The Melting Glacier",
        safeRetreat: true,
        text: "Steam roars off ancient glaciers surrounding a colossal basalt temple blazing with unnatural heat! Inside, the Children of Surtur prepare to sacrifice eleven captive commoners to ignite a planar beacon to Surtur's fiery realm!",
        choices: [
          { t: "Creep through the glacial melt-tunnel to catch the thursir giants before they inscribe their warhammers!", badge: "Stealth / Survival DC 17", check: { stat: "agility", skill: "Stealth", dc: 17, pass: 2, fail: 2, failDmg: 12, passMsg: "You slip into the temple unseen before the giants can carve the thurs-rune!", failMsg: "Blistering heat-vents scorch your cloak (-12 HP) as horns echo!" }, onPass: { cw: "RUNES_PREVENTED" } },
          { t: "March straight through the blazing basalt archway of Surtur's temple!", to: 2 }
        ]
      },
      2: {
        zone: "Sacrificial Altar",
        title: "Thursir Giants of Surtur",
        text: "Towering, iron-bearded Thursir Giants heft glowing warhammers around the sacrificial altar where eleven terrified northern captives huddle in chains!",
        enemy: { name: "Rune-Forged Thursir Giants", desc: "Massive fire-sworn giants guarding the polar altar.", hp: 112, ac: 18, atk: 12, dmg: 14, xp: 450, gold: 240, items: rollRandomLoot(["consumable", "valuable"], 2, "very_rare"), flee: 1, weakCw: ["RUNES_PREVENTED"] },
        choices: [
          { t: "Free the eleven captives and storm the blazing Polar Beacon Sanctum!", to: 3 }
        ]
      },
      3: {
        zone: "Polar Beacon Sanctum",
        title: "High Flame-Speaker of Surtur",
        text: "Beneath an open roof pouring molten starfire into the polar sky stands the High Flame-Speaker of Surtur, channeling the full fury of the Fire Giant King's realm!",
        enemy: { name: "High Flame-Speaker of Surtur", desc: "Apocalyptic fire-zealot igniting the Polar Beacon.", hp: 132, ac: 19, atk: 13, dmg: 15, xp: 620, gold: 410, items: ["bq_surtur_polar_brand"], weakCw: ["RUNES_PREVENTED"] },
        choices: [
          { t: "Quench the Polar Beacon in glacial meltwater and seal Surtur's rift!", to: 4 }
        ]
      },
      4: {
        zone: "Cooled Sanctum",
        title: "The North Saved",
        text: "With an earth-shaking hiss, the fiery pillar vanishes! You gather 220 GP in ancient temple bullion as the rescued captives weep with gratitude.",
        onEnter: { gold: 220, healHp: 26, msg: "Extinguished the Polar Beacon (+220 GP, +26 HP)!" },
        choices: [
          { t: "Lead the eleven rescued northerners south across the aurora-lit icecap.", to: 5 }
        ]
      },
      5: {
        zone: "Aurora Trail",
        title: "Peace Under Northern Lights",
        text: "Green-and-gold auroras replace the ominous crimson glare across the polar sky.",
        choices: [
          { t: "Return to Uffi Toothless in Trollheim!", to: 6 }
        ]
      },
      6: {
        zone: "Trollheim Hall",
        title: "Uffi Toothless's Grand Reward",
        text: "Uffi Toothless raises a horn of mead before the jarl's entire court, paying your full expedition bounty in gleaming northern gold.",
        choices: [
          { t: "Claim your legendary title!", to: 7 }
        ]
      },
      7: {
        zone: "Oakhaven",
        title: "Legend of the Icecap",
        text: "Skalds across the Northlands sing of the hero who quenched Surtur's flame at the top of the world.",
        choices: [
          { t: "Complete the Trollheim Chronicles!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Quencher of the Polar Beacon",
        text: "From Fjellgard to the Top of the World, the Northlands stand unbroken thanks to your blade!",
        ending: { type: "true", title: "Champion of the Northlands (Part 3 of 3)", xp: 650, gold: 600, trophy: "Runed Thurs-Ember Shard" },
        choices: []
      }
    }
  }

});
