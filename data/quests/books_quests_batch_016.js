/* ============================================================
   BOOK QUESTS — BATCH 016 (12 Quests • All autoDiscover: false)
   Includes the Complete 3-Part Chained DERENDE TRILOGY!
   Purely in-world subtitles & Inn rumor pool discovery.
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. HOLLOW (6 PAGES • LV 1)
  // ==========================================================
  bk_b16_marg_hollow: {
    id: "bk_b16_marg_hollow",
    title: "Hollow",
    subtitle: "Levoča's Curdled Milk & The Singing Tree",
    difficulty: "Easy",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Terrified Levoča Milkmaid (Rusty Flagon Tavern)",
    summary: "Arrive in the eerie woodland village of Levoča where every pail of milk has curdled—an ancient omen that the Hollow Man is knocking at midnight—and trace his haunting song to the Singing Tree!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Village of Levoča • Dusk",
        title: "Curdled Milk & Midnight Knocks",
        safeRetreat: true,
        text: "Old woodland lore warns: when the milk curdles without heat, never answer a knock at midnight, for the Hollow Man has come for your head! As fog curls around Levoča's timber cottages, hungry forest wolves circle the fences and a pale, echoing melody drifts from the deep pines.",
        choices: [
          { t: "Salt the cottage thresholds and track the wolf prints toward the Singing Tree before midnight!", badge: "Survival DC 10", check: { stat: "spirit", skill: "Survival", dc: 10, pass: 2, fail: 2, passMsg: "You spot the wolves' flanking trail and drive them off the village sheepfold!", failMsg: "Snarling grey wolves burst out of the fog right along the timber fence!" }, onPass: { cw: "SALT_WARD" } },
          { t: "Keep lantern-watch in the village square for the midnight knocking!", to: 2 }
        ]
      },
      2: {
        zone: "Levoča Outskirts • Pine Line",
        title: "Wolves of the Dark Wood",
        text: "Pale-eyed forest wolves driven mad by the Singing Tree's eerie chorus leap over the split-rail fence!",
        enemy: { name: "Pale-Eyed Forest Wolves", desc: "Feral pack hunters stirred up by old woodland magic.", hp: 20, ac: 11, atk: 4, dmg: 4, xp: 55, gold: 30, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["SALT_WARD"] },
        choices: [
          { t: "Follow the haunting lullaby deep into the glade of the Singing Tree!", to: 3 }
        ]
      },
      3: {
        zone: "Glade of the Singing Tree",
        title: "The Hollow Man",
        text: "Beneath a gnarled oak whose leaves whisper a chilling melody stands the tall, bark-skinned Hollow Man—once guardian to the forest witch, now bound to the Singing Tree's dark lullaby!",
        enemy: { name: "The Hollow Man", desc: "Lanky, hollow-chested woodland construct hunting heads at midnight.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 50, items: ["bq_singing_tree_chime"], weakCw: ["SALT_WARD"] },
        choices: [
          { t: "Quiet the Singing Tree's cursed boughs and return to Levoča at dawn!", to: 4 }
        ]
      },
      4: {
        zone: "Village of Levoča • Morning",
        title: "Sweet Milk Once More",
        text: "At sunrise the village's milk pails stay sweet and fresh. Grateful elders press their saved silver into your hands.",
        onEnter: { healHp: 8, msg: "Warm bread and fresh milk restore your strength (+8 HP)!" },
        choices: [
          { t: "Bid Levoča farewell.", to: 5 }
        ]
      },
      5: {
        zone: "Woodland Trail",
        title: "Silence at Midnight",
        text: "No more hollow knuckles rap upon Levoča's doors.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Protector of Levoča",
        text: "You defeated the Hollow Man and silenced the Singing Tree!",
        ending: { type: "true", title: "Breaker of the Midnight Knock", xp: 105, gold: 95, trophy: "Singing Tree Bough" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. THE HONEY QUEEN (6 PAGES • LV 2)
  // ==========================================================
  bk_b16_marg_honey_queen: {
    id: "bk_b16_marg_honey_queen",
    title: "The Honey Queen",
    subtitle: "The Effildawnan & The Golden Honey Cave",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Go-Between Terelsa Garlook (Rusty Flagon Tavern)",
    summary: "Take up fixer Terelsa Garlook's unusual woodland commission to find auburn-haired young Lyla—tracking the sweet scent of wild nectar past the bee-kin Effildawnan into the humming Honey Cave!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Deep Forest • Meadow of Purple Flowers",
        title: "The Sweet Scent of Bees",
        safeRetreat: true,
        text: "Young Lyla vanished into a fragrant cavern humming with giant golden bees! Go-between Terelsa Garlook hires you to bring her home—warning that the proud forest bee-kin known as the Effildawnan fiercely guard their Honey Cave!",
        choices: [
          { t: "Offer wildflowers and bow respectfully to the Effildawnan scouts to earn safe passage to the inner hive!", badge: "Persuasion DC 11", check: { stat: "spirit", skill: "Persuasion", dc: 11, pass: 2, fail: 2, passMsg: "The bee-kin lower their spears, warning you of the corrupted royal jelly inside!", failMsg: "Buzzing sentinel swarms surge out of the canopy!" }, onPass: { cw: "BEE_RESPECT" } },
          { t: "Follow the golden honey-trail straight into the cave mouth!", to: 2 }
        ]
      },
      2: {
        zone: "Honey Cave • Waxen Galleries",
        title: "Swarm of the Hive",
        text: "Amber honeycomb glows along the damp cavern walls as agitated giant worker bees and wax-armored drones swoop down to protect the royal chamber!",
        enemy: { name: "Giant Hive Drones & Swarm", desc: "Fierce woodland bees defending the golden comb.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["BEE_RESPECT"] },
        choices: [
          { t: "Enter the Royal Comb where Lyla is enthralled by the Honey Queen!", to: 3 }
        ]
      },
      3: {
        zone: "Honey Cave • Royal Comb",
        title: "The Honey Queen",
        text: "Crowned in gleaming amber wax, the majestic yet jealous Honey Queen hovers before enchanted Lyla: 'She loves the bees—she shall tend our comb forever!'",
        enemy: { name: "The Honey Queen", desc: "Fey-touched giant queen bee commanding royal nectar magic.", hp: 32, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 65, items: ["bq_royal_amber_comb"], weakCw: ["BEE_RESPECT"] },
        choices: [
          { t: "Wake Lyla from the sweet trance and lead her safely out of the cave!", to: 4 }
        ]
      },
      4: {
        zone: "Forest Clearing • Terelsa's Camp",
        title: "Lyla Returned",
        text: "Lyla blinks away the golden drowsiness as Terelsa Garlook pays out your full fee with a relieved nod.",
        onEnter: { healHp: 8, msg: "A spoonful of pure golden honey mends your stings (+8 HP)!" },
        choices: [
          { t: "Collect your gold.", to: 5 }
        ]
      },
      5: {
        zone: "Woodland Path",
        title: "Peace with the Hive",
        text: "The Effildawnan hum softly in the sunlit treetops.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Rescuer from the Honey Cave",
        text: "You bested the Honey Queen and brought young Lyla safely home!",
        ending: { type: "true", title: "Breaker of the Golden Trance", xp: 130, gold: 120, trophy: "Jar of Royal Fey Honey" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. THE VENGEFUL HEART (6 PAGES • LV 3)
  // ==========================================================
  bk_b16_marg_vengeful_heart: {
    id: "bk_b16_marg_vengeful_heart",
    title: "The Vengeful Heart",
    subtitle: "The Orphaned Hamlet of Incot & Blood Marks",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Weeping Incot Child (Rusty Flagon Tavern)",
    summary: "Uncover the tragedy of the forest hamlet of Incot—whose adults perished when ruthless soldier Eagehrt burned their harvested blood marks—protect the surviving children, and end Eagehrt's dark band!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Hamlet of Incot • Silent Garden",
        title: "A Village Without Elders",
        safeRetreat: true,
        text: "Cresting a woodland hill, you find the quiet cottages of Incot strangely empty—only frightened children huddle beside the well. Cruel raider Eagehrt harvested blood marks from every adult here, then spent those marks fighting shadow fey, slaying the entire village in minutes!",
        choices: [
          { t: "Gather the rare woodland herbs the forest elders spoke of to break the lingering blood-mark tether!", badge: "Herbalism / Survival DC 12", check: { stat: "spirit", skill: "Herbalism", dc: 12, pass: 2, fail: 2, passMsg: "Crushed moon-sage severs Eagehrt's blood-ward before battle even begins!", failMsg: "Eagehrt's scouts spot you gathering herbs along the ridge!" }, onPass: { cw: "BLOOD_WARD_BROKEN" } },
          { t: "Track Eagehrt's bloodstained troop straight into the deep woods!", to: 2 }
        ]
      },
      2: {
        zone: "Deep Woods • Eagehrt's Camp",
        title: "Blood-Marked Raiders",
        text: "Hardened mercenary troops bearing glowing crimson runes on their gauntlets rush out from behind felled logs!",
        enemy: { name: "Eagehrt's Blood-Marked Troops", desc: "Ruthless forest raiders empowered by stolen life-force.", hp: 34, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 55, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["BLOOD_WARD_BROKEN"] },
        choices: [
          { t: "Confront Captain Eagehrt beside his crimson campfire!", to: 3 }
        ]
      },
      3: {
        zone: "Ravine Hollow • Crimson Camp",
        title: "Captain Eagehrt",
        text: "Clutching a pulsing blood-stone harvested from Incot, merciless Captain Eagehrt draws his notched greatsword: 'Weak villagers! Their lives bought my survival!'",
        enemy: { name: "Captain Eagehrt", desc: "Cold-blooded raider captain wielding stolen blood-mark magic.", hp: 42, ac: 14, atk: 6, dmg: 6, xp: 140, gold: 95, items: ["bq_incot_vengeance_blade"], weakCw: ["BLOOD_WARD_BROKEN"] },
        choices: [
          { t: "Shatter the blood-stone and escort Incot's children safely to Wheedon!", to: 4 }
        ]
      },
      4: {
        zone: "Village of Wheedon • Hearth",
        title: "Justice for Incot",
        text: "The elders of Wheedon take the orphaned children in with open arms and reward your justice with silver.",
        onEnter: { healHp: 10, msg: "A quiet meal at Wheedon restores your spirit (+10 HP)!" },
        choices: [
          { t: "Depart knowing Incot's ghosts rest easier.", to: 5 }
        ]
      },
      5: {
        zone: "Forest Road",
        title: "Blood Debt Settled",
        text: "Eagehrt's cruel band will never harvest another hamlet.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Avenger of Incot",
        text: "You ended Captain Eagehrt and brought Incot's children to safety!",
        ending: { type: "true", title: "Shield of the Forgotten Hamlet", xp: 170, gold: 155, trophy: "Shattered Blood-Mark Stone" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. CHALLENGE OF THE FANG (6 PAGES • LV 4)
  // ==========================================================
  bk_b16_marg_fang: {
    id: "bk_b16_marg_fang",
    title: "Challenge of the Fang",
    subtitle: "Red-Cloaked Czerwonya & The Paths of Gamayun",
    difficulty: "Medium",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Weeping Village Father (Rusty Flagon Tavern)",
    summary: "Step into an ancient woodland ritual to protect young Czerwonya in her crimson cloak—walking the misty Paths of Gamayun to defeat the monstrous wolf-lord before it devours her!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Foggy Trail • Paths of Gamayun",
        title: "A Red Cloak in the Mist",
        safeRetreat: true,
        text: "A panicked horse carried a dead hunter into the village, and ancient forest custom demands young Czerwonya walk alone into the fog wearing a crimson cloak! Her weeping father begs you to follow the Paths of Gamayun and win the Challenge of the Fang in her place!",
        choices: [
          { t: "Heed the prophetic song of the Gamayun bird in the branches to find the silvered hunter's spear!", badge: "Perception DC 13", check: { stat: "spirit", skill: "Perception", dc: 13, pass: 2, fail: 2, passMsg: "Silver runes gleam on the fallen hunter's spear—perfect for piercing wolf-hide!", failMsg: "Howls close in from every side of the misty hollow!" }, onPass: { cw: "SILVER_FANG" } },
          { t: "Sprint down the foggy trail to stand beside Czerwonya!", to: 2 }
        ]
      },
      2: {
        zone: "Paths of Gamayun • Wolf Hollow",
        title: "Hounds of the Ritual",
        text: "Dire forest wolves with silver-streaked pelts spring out of the ferns to test the chosen champion!",
        enemy: { name: "Gamayun Dire Wolves", desc: "Massive primal wolves enforcing the ancient forest trial.", hp: 40, ac: 13, atk: 6, dmg: 6, xp: 125, gold: 70, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["SILVER_FANG"] },
        choices: [
          { t: "Confront the towering Great Wolf inside the Belly of the Beast!", to: 3 }
        ]
      },
      3: {
        zone: "Ancient Glade • Belly of the Beast",
        title: "Lord of the Fang",
        text: "Towering taller than a warhorse, the ancient Great Wolf of the Fang steps from the fog with eyes like burning coals: 'Blood or steel—prove your right to leave my wood!'",
        enemy: { name: "Great Wolf of the Fang", desc: "Mythic lupine lord of the ancient woodland trial.", hp: 50, ac: 15, atk: 7, dmg: 7, xp: 175, gold: 120, items: ["bq_crimson_hood_cloak"], weakCw: ["SILVER_FANG"] },
        choices: [
          { t: "Claim victory in the Challenge of the Fang and escort Czerwonya home!", to: 4 }
        ]
      },
      4: {
        zone: "Village Green • Lanterns",
        title: "The Child Saved",
        text: "Czerwonya's father collapses in tears of joy, pressing his family's treasured purse and warm cloak upon you.",
        onEnter: { healHp: 10, msg: "Warm hearthfire and village cider heal your wounds (+10 HP)!" },
        choices: [
          { t: "Depart as champion of the Fang.", to: 5 }
        ]
      },
      5: {
        zone: "Edge of the Mist",
        title: "The Forest Accepts",
        text: "The prophetic Gamayun sings a soft, approving note from the pines.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Victor of the Fang",
        text: "You conquered the Challenge of the Fang and saved young Czerwonya!",
        ending: { type: "true", title: "Champion of the Crimson Cloak", xp: 205, gold: 195, trophy: "Silvered Fang Talisman" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. THE GRIFFON HATCHLING HEIST (6 PAGES • LV 5)
  // ==========================================================
  bk_b16_marg_griffon_heist: {
    id: "bk_b16_marg_griffon_heist",
    title: "The Griffon Hatchling Heist",
    subtitle: "Lesharrkk & The Still Tower Egg Rescue",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Talking Black Housecat Lesharrkk (Rusty Flagon Tavern)",
    summary: "Aid Lesharrkk—the fierce pride-mother of the forest's black griffons, polymorphed into a talking housecat—in infiltrating the rain-slicked Still Tower past ogres and bugbears to rescue her hatching eggs!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Muddy Woodland Road • Still Tower",
        title: "A Talking Housecat's Plea",
        safeRetreat: true,
        text: "A furious talking housecat introduces herself as Lesharrkk—proud matriarch of the black griffons, cursed into feline form when a corrupted ogre chief and his bugbears raided her eyrie! Her precious eggs are about to hatch inside the Still Tower!",
        choices: [
          { t: "Scale the ivy-draped rear wall of the Still Tower to slip past the bugbear courtyard guards!", badge: "Stealth DC 13", check: { stat: "agility", skill: "Stealth", dc: 13, pass: 2, fail: 2, passMsg: "You slip cleanly through the arrow-slit above the snoring bugbears!", failMsg: "Slick spring mud sends a stone clattering into the courtyard!" }, onPass: { cw: "TOWER_CLIMB" } },
          { t: "Kick open the Still Tower's heavy oak door and storm the stairs!", to: 2 }
        ]
      },
      2: {
        zone: "Still Tower • Guard Loft",
        title: "Bugbear Wardens",
        text: "Hulking bugbears armed with spiked morningstars scramble off their dice-table to block the winding tower stairs!",
        enemy: { name: "Still Tower Bugbears", desc: "Brutal goblinoid raiders guarding the stolen griffon clutch.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 150, gold: 85, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["TOWER_CLIMB"] },
        choices: [
          { t: "Rush the top belfry where the corrupted ogre chief hovers over the cracking eggs!", to: 3 }
        ]
      },
      3: {
        zone: "Still Tower • Belfry Nest",
        title: "The Corrupted Ogre Chief",
        text: "Tiny black beaks crack through speckled shells as the massive, Corrupted Ogre Chief swings an iron-banded greatclub to smash anyone who nears his prized loot!",
        enemy: { name: "Corrupted Ogre Chief", desc: "Towering ogre warlord holding Lesharrkk's hatching griffon clutch.", hp: 58, ac: 14, atk: 7, dmg: 8, xp: 210, gold: 140, items: ["bq_lesharrkk_feather_cloak"], weakCw: ["TOWER_CLIMB"] },
        choices: [
          { t: "Shatter the ogre's curse-fetish to restore Lesharrkk and escape with the hatchlings!", to: 4 }
        ]
      },
      4: {
        zone: "Woodland Eyrie • Spring Rain",
        title: "Wings of Obsidian",
        text: "With a mighty roar, Lesharrkk snaps back into her magnificent black-feathered griffon form, nudging her chirping hatchlings safely into the nest and dropping a pouch of ancient ridge-gold at your feet.",
        onEnter: { healHp: 12, msg: "Lesharrkk's grateful pride watches over your rest (+12 HP)!" },
        choices: [
          { t: "Leave the black griffon eyrie in peace.", to: 5 }
        ]
      },
      5: {
        zone: "Still Tower Trail",
        title: "Heist Complete",
        text: "High overhead, a proud black griffon circles in salute.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Friend of the Black Griffons",
        text: "You pulled off the Still Tower heist and reunited Lesharrkk with her hatchlings!",
        ending: { type: "true", title: "Savior of the Griffon Clutch", xp: 245, gold: 235, trophy: "Obsidian Griffon Plume" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. GALL OF THE SPIDER CRONE (6 PAGES • LV 6)
  // ==========================================================
  bk_b16_marg_spider_crone: {
    id: "bk_b16_marg_spider_crone",
    title: "Gall of the Spider Crone",
    subtitle: "The Witch's Teat Inn & Mavra's House",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Storm-Soaked Kariv Midwife (Rusty Flagon Tavern)",
    summary: "Sheltering from a raging thunderstorm at the Witch's Teat Inn, uncover why woodcutter Sandor carried the dying Spider Crone Jędza upstairs—and brave the dark woods to Mavra's House to break her lethal ivy-crown prophecy!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Witch's Teat Inn • Thunderstorm",
        title: "Screams Upstairs",
        safeRetreat: true,
        text: "Lightning splits the sky over the Witch's Teat Inn as a frantic Kariv midwife begs for healing potions while hiding who lies upstairs—not a mother in labor, but the dying Spider Crone Jędza, carried out of the woods by desperate woodcutter Sandor to save his sick babe!",
        choices: [
          { t: "Inspect Jędza's fallen ivy crown of prophecy to discover who cursed her before entering the storm!", badge: "Arcana DC 14", check: { stat: "arcana", skill: "Arcana", dc: 14, pass: 2, fail: 2, passMsg: "The ivy points straight to rival hag Mavra's web-ward—giving you the counter-charm!", failMsg: "Venomous spiders pour down the inn's chimney as the storm worsens!" }, onPass: { cw: "IVY_COUNTER" } },
          { t: "Follow Sandor's muddy tracks straight into the stormy woods toward Mavra's House!", to: 2 }
        ]
      },
      2: {
        zone: "Stormy Woods • Webbed Clearing",
        title: "Brood of the Spider Crone",
        text: "Rain-slicked giant phase-spiders and briar-constructs scuttle down lightning-lit trunks to claim Jędza's stolen power!",
        enemy: { name: "Storm-Wood Web Stalkers", desc: "Venomous arachnids and forest husks serving rival hag Mavra.", hp: 54, ac: 15, atk: 7, dmg: 8, xp: 190, gold: 110, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["IVY_COUNTER"] },
        choices: [
          { t: "Kick open the crooked door of Mavra's House and seize the cure!", to: 3 }
        ]
      },
      3: {
        zone: "Mavra's House • Cauldron Room",
        title: "Mavra, Rival of the Crone",
        text: "Cackling beside a bubbling cauldron of spider-gall, the twisted hag Mavra weaves crackling webs across the rafters: 'Jędza's crown never lies—and today her power is mine!'",
        enemy: { name: "Mavra, Hag of the Web", desc: "Cunning forest hag brewing dark venom and stolen prophecies.", hp: 68, ac: 15, atk: 8, dmg: 9, xp: 265, gold: 175, items: ["bq_spider_crone_ivy_crown"], weakCw: ["IVY_COUNTER"] },
        choices: [
          { t: "Claim the pure curative elixir and race back to the Witch's Teat Inn!", to: 4 }
        ]
      },
      4: {
        zone: "Witch's Teat Inn • Breaking Storm",
        title: "A Life Saved",
        text: "A single drop of the pure elixir restores Sandor's infant to rosy health! With a crooked smile, Jędza grants you a pouch of ancient woodland gold before vanishing into the mist.",
        onEnter: { healHp: 14, msg: "The Kariv midwife shares her finest herbal tonic (+14 HP)!" },
        choices: [
          { t: "Rest by the inn's warm hearth.", to: 5 }
        ]
      },
      5: {
        zone: "Great Northern Road",
        title: "Prophecy Fulfilled",
        text: "The thunderstorm rolls east, leaving clear stars overhead.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Breaker of Mavra's Web",
        text: "You defeated Mavra and saved Sandor's child at the Witch's Teat Inn!",
        ending: { type: "true", title: "Bane of the Web-Hag", xp: 295, gold: 275, trophy: "Vial of Cleansed Spider-Gall" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. BLOOD AND THORNS (6 PAGES • LV 7)
  // ==========================================================
  bk_b16_marg_blood_thorns: {
    id: "bk_b16_marg_blood_thorns",
    title: "Blood and Thorns",
    subtitle: "The Handfasting & Kingdom of the Briar",
    difficulty: "Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Bloodied Wedding Guest (Rusty Flagon Tavern)",
    summary: "After pain-maddened, briar-tangled boars shatter a forest handfasting ceremony, trace the thorny blight deep into Walker's Wood and storm the Briar Palace to topple the tyrannical King of Thorns!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Walker's Wood • Shattered Handfasting",
        title: "A Thorny Problem",
        safeRetreat: true,
        text: "Roses and ribbons lie trampled in the mud after briar-tangled wild boars crashed the village handfasting! Whispers spread down the Great Northern Road of a rising 'King of Thorns' raising a living Kingdom of the Briar to choke out mortal civilization!",
        choices: [
          { t: "Cut a fresh ironwood torch-trail along the thorn-wall to expose the hidden entrance to the Briar Palace!", badge: "Survival DC 14", check: { stat: "spirit", skill: "Survival", dc: 14, pass: 2, fail: 2, passMsg: "You find a dry root-archway straight into the palace courtyard, bypassing the outer briar snares!", failMsg: "Barbed vines whip across the trail as maddened thorn-boars charge!" }, onPass: { cw: "ROOT_ARCH" } },
          { t: "Hack straight through the towering hedge of blood-red thorns!", to: 2 }
        ]
      },
      2: {
        zone: "Kingdom of the Briar • Thorn Maze",
        title: "Briar-Tangled Stormboars & Vine Golems",
        text: "Snorting Stormboars tangled in barbed vines and towering Vine Golems thunder through the living thorn-corridors!",
        enemy: { name: "Briar Stormboars & Vine Golem", desc: "Pain-maddened woodland beasts and animated thorn-constructs.", hp: 60, ac: 15, atk: 8, dmg: 9, xp: 235, gold: 140, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["ROOT_ARCH"] },
        choices: [
          { t: "Breach the woven throne room of the Briar Palace!", to: 3 }
        ]
      },
      3: {
        zone: "The Briar Palace • Throne of Thorns",
        title: "The King of Thorns",
        text: "Crowned in razor-sharp crimson brambles, the towering King of Thorns rises from his living throne: 'The dominion of mortals is over! The Kingdom of the Briar shall swallow the road!'",
        enemy: { name: "The King of Thorns", desc: "Fierce fey sovereign commanding living brambles and blood-thorns.", hp: 74, ac: 16, atk: 9, dmg: 10, xp: 315, gold: 200, items: ["bq_briar_king_blade"], weakCw: ["ROOT_ARCH"] },
        choices: [
          { t: "Sever the heart-root beneath the Briar Throne to wither the thorny blight!", to: 4 }
        ]
      },
      4: {
        zone: "Walker's Wood • Clear Glade",
        title: "Thorns Withered",
        text: "The suffocating brambles recoil into harmless moss as the grateful newlyweds and road-wardens celebrate your victory.",
        onEnter: { healHp: 15, msg: "Wedding feast wine and soothing herbs restore your vigor (+15 HP)!" },
        choices: [
          { t: "Accept the road-wardens' rich bounty.", to: 5 }
        ]
      },
      5: {
        zone: "Great Northern Road",
        title: "Safe Passage",
        text: "Travelers and wagons roll peacefully past Walker's Wood once more.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Shatterer of the Briar Crown",
        text: "You toppled the King of Thorns and ended the Kingdom of the Briar!",
        ending: { type: "true", title: "Bane of the Briar Palace", xp: 350, gold: 305, trophy: "Crimson Briar Crown" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. GRANDMOTHER'S FIRE (12 PAGES • LV 8)
  // ==========================================================
  bk_b16_marg_grandmothers_fire: {
    id: "bk_b16_marg_grandmothers_fire",
    title: "Grandmother's Fire",
    subtitle: "Baba Yaga's Hut & The Vodyanoi's Pool",
    difficulty: "Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Shivering Woodland Serf (Rusty Flagon Tavern)",
    summary: "Every hearthfire across the deep forest has died as premature winter closes in! Rescue hunted serfs from Ghost Knights of Doresh, bargain at the chicken-legged Hut of Baba Yaga, and reclaim stolen fire from the Vodyanoi's Pool!",
    totalPages: 12,
    pages: {
      1: {
        zone: "Frozen Forest • Cold Hearth",
        title: "No Fires Burn",
        safeRetreat: true,
        text: "Bitter rime creeps across crimson autumn leaves weeks before winter. Across the deep woods, every hearthfire, forge, and lantern has died at once—even struck flint sparks only cold white mist. Ahead by a frozen creek, three shivering serfs led by woodcutter Vasily crouch behind a fallen birch while pale skeletal riders circle silently through the trees!",
        choices: [
          { t: "Channel Turn Undead across the creek to crack the riders' frost-forged shields!", reqSpell: "Turn Undead", mp: 3, badge: "Turn Undead (3 MP)", to: 2, onChoose: { cw: "KNIGHTS_SHAKEN", msg: "Blazing radiance shatters the Ghost Knights' rime-aura before they can charge!" } },
          { t: "Creep through the frosted brambles to ambush the undead riders from their flank!", badge: "Stealth / Agility DC 14", check: { stat: "agility", skill: "Stealth", dc: 14, pass: 2, fail: 2, failDmg: 6, passMsg: "You slip behind a birch-fall and strike their flank before they spot you!", failMsg: "Frozen twigs snap beneath your boot—a ghostly lance grazes your ribs (-6 HP)!" }, onPass: { cw: "KNIGHTS_SHAKEN" } },
          { t: "Step onto the frozen track and draw the Ghost Knights away from the serfs!", to: 2 }
        ]
      },
      2: {
        zone: "Frozen Trail • Doresh's Hunt",
        title: "Ghost Knights of Doresh",
        text: "Armored in rime-crusted iron atop skeletal steeds whose breath freezes mid-air, the ghoulish Ghost Knights of Doresh lower frost-rimmed lances and thunder down the birch trail!",
        enemy: { name: "Ghost Knights of Doresh", desc: "Undead winter riders hunting freezing woodland villagers.", hp: 66, ac: 16, atk: 8, dmg: 10, undead: true, xp: 265, gold: 155, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["KNIGHTS_SHAKEN"] },
        choices: [
          { t: "Tend to woodcutter Vasily and the rescued serfs behind the fallen birch.", to: 3 }
        ]
      },
      3: {
        zone: "Birch Clearing",
        title: "Vasily's Tale of the Stolen Flame",
        text: "Vasily clutches his threadbare wool coat, teeth chattering. 'The hearthfires didn't just go out—something sucked every ember straight up the chimneys at midnight like breath down a throat! The elders say only Baba Yaga knows who dared steal fire from her woods... Her chicken-legged hut was seen roosting in the Bone-Fence Glade west of here. Or you can follow that strange warm steam drifting east toward the sunken marsh!'",
        choices: [
          { t: "Search the fallen Ghost Knights' frosted saddlebags for orders before moving on.", badge: "Perception / Arcana DC 14", check: { stat: "spirit", skill: "Perception", dc: 14, pass: 5, fail: 4, failDmg: 4, passMsg: "Inside a frost-rimed satchel you uncover Doresh's sealed winter writ and silver coin!", failMsg: "Grave-frost bites your fingers (-4 HP) as you turn west toward Baba Yaga's glade." } },
          { t: "Follow Vasily's directions west to the Bone-Fence Glade to visit Baba Yaga's Hut.", to: 4 },
          { t: "Follow the unnatural warm steam-trail east straight toward the Vodyanoi's Pool.", to: 7 }
        ]
      },
      4: {
        zone: "Bone-Fence Glade",
        title: "The Chicken-Legged Hut",
        text: "A ring of bleached antlers and glowing skull-lanterns surrounds a crooked timber hut perched atop two gigantic, scaly chicken legs. Creaking like an old ship, the hut pivots on its talons to face you. High in the shuttered window, an iron-toothed crone leans on a wooden pestle and cackles: 'Little hero, little mouse—why do you come knocking on Grandmother's house?'",
        choices: [
          { t: "Bow low and speak the traditional woodland courtesy rhyme to Grandmother's hut.", badge: "Persuasion / Spirit DC 15", check: { stat: "spirit", skill: "Persuasion", dc: 15, pass: 6, fail: 6, failDmg: 6, passMsg: "Grandmother cackles approvingly and tosses you a white-hot ember-coal!", failMsg: "The hut stamps a scaly talon, shaking frost onto your head (-6 HP), though she still begrudges you a spark." }, onPass: { cw: "BABA_EMBER" } },
          { t: "Answer Grandmother's riddle by naming the three cold winds of the ancient woods!", badge: "Arcana / Survival DC 15", check: { stat: "arcana", skill: "Survival", dc: 15, pass: 6, fail: 6, failDmg: 6, passMsg: "'Clever little bird!' Baba Yaga grins and flicks a blazing ember-coal into your lantern!", failMsg: "Grandmother snaps her wooden pestle across your knuckles (-6 HP) before pointing east!" }, onPass: { cw: "BABA_EMBER" } },
          { t: "Refuse her riddles and march straight east along the warm steam-trail.", to: 7 }
        ]
      },
      5: {
        zone: "Birch Clearing",
        title: "Doresh's Frost-Seal",
        text: "Inside the lead Ghost Knight's saddlebag rest 55 GP in tarnished silver and a black-ice writ stamped with Doresh's ghoul-crown: 'When the bloated river-king drowns the woodland hearths, let our riders harvest every freezing village!' Better still, a rough sketch shows the Vodyanoi's sunken fire-brazier anchored to the lakebed by a single rusted iron chain beneath the shelf-ice.",
        onEnter: { gold: 55, cw: "CHAIN_KNOWN", msg: "Recovered 55 GP & learned the secret of the sunken anchor-chain (CHAIN_KNOWN)!" },
        choices: [
          { t: "Head west to the Bone-Fence Glade to bargain at Baba Yaga's Hut first.", to: 4 },
          { t: "Follow the steaming trail east straight to the Vodyanoi's Pool.", to: 7 }
        ]
      },
      6: {
        zone: "Baba Yaga's Threshold",
        title: "Grandmother's Coal",
        text: "Baba Yaga leans over the sill, her sharp eyes glinting with fiery amusement. 'That bloated frog-king in the black pool thinks he can hoard MY woods' fire beneath his belly!' she rasps. 'Drop my ember into his cold water and watch the grease boil! Now shoo before my mortar gets hungry!'",
        onEnter: { healHp: 12, msg: "Hearth-warmth radiates from Baba Yaga's threshold (+12 HP)!" },
        choices: [
          { t: "Follow the iron lantern's pull east toward the steaming Vodyanoi's Pool.", to: 7 }
        ]
      },
      7: {
        zone: "Sunken Marsh",
        title: "The Steaming Black Pool",
        text: "In the heart of the frost-bound timber, a wide black tarn hisses with thick white steam. Beneath the translucent shelf-ice glows an eerie orange heart: a massive iron village-brazier chained to the muddy lakebed, hoarding the stolen warmth of every chimney for twenty miles! Bloated bubbles burst at the center as mossy claws grip the ice-lip.",
        choices: [
          { t: "Drop Baba Yaga's white-hot ember-coal straight into the tarn to boil the Vodyanoi out!", reqCw: "BABA_EMBER", badge: "BABA_EMBER", to: 8, onChoose: { cw: "POOL_BOILED", msg: "HISSSS! Grandmother's ember erupts in a blinding geyser of steam, scalding the Vodyanoi!" } },
          { t: "Use Doresh's writ: shatter the sunken iron anchor-chain beneath the ice-shelf!", reqCw: "CHAIN_KNOWN", badge: "CHAIN_KNOWN", to: 8, onChoose: { cw: "CHAIN_SNAPPED", msg: "CLANG! The severed brazier lurches upward, searing the Vodyanoi's bloated belly!" } },
          { t: "Spot the taut anchor-chain glinting beneath the ice and smash it before he surfaces!", badge: "Might / Perception DC 15", check: { stat: "might", skill: "Perception", dc: 15, pass: 8, fail: 8, failDmg: 7, passMsg: "Steel bites iron—the sunken brazier breaks loose in a burst of steam!", failMsg: "Freezing marsh-water lashes your face (-7 HP) as the monster surges up!" }, onPass: { cw: "CHAIN_SNAPPED" } },
          { t: "Stand upon the creaking shelf-ice and challenge the Ancient Vodyanoi directly!", to: 8 }
        ]
      },
      8: {
        zone: "Heart of the Woods • The Vodyanoi's Pool",
        title: "Thief of the Forest's Fire",
        text: "Clutching the sunken brazier of trapped hearth-flames beneath his mossy bulk, a bloated, frog-faced Ancient Vodyanoi surges from the freezing black water with a thunderous croak!",
        enemy: { name: "Ancient Vodyanoi of the Pool", desc: "Malevolent water-spirit hoarding the stolen warmth of the entire forest.", hp: 82, ac: 16, atk: 9, dmg: 11, xp: 355, gold: 225, items: ["bq_grandmothers_ember_brooch"], weakCw: ["BABA_EMBER", "POOL_BOILED", "CHAIN_SNAPPED"] },
        choices: [
          { t: "Haul the glowing iron brazier above the ice and return fire to the forest!", to: 9 }
        ]
      },
      9: {
        zone: "The Tarn Bank",
        title: "Fire Unchained",
        text: "The moment the stolen brazier breaks the surface, a spiral of golden sparks leaps skyward—splitting into a hundred dancing comets that race over the pines toward every cold chimney for miles! Beneath the receding ice-shelf glints a sunken chest of drowned toll-coins.",
        choices: [
          { t: "Haul the drowned toll-chest from the thawing mud before returning to Vasily's village!", badge: "Athletics / Survival DC 14", check: { stat: "might", skill: "Athletics", dc: 14, pass: 10, fail: 10, failDmg: 5, passMsg: "You drag the muddy chest ashore and claim 65 GP in ancient river-tolls!", failMsg: "The rotten wood splits and jagged iron scrapes your arm (-5 HP) before the chest sinks." }, onPass: { gold: 65 } },
          { t: "Leave the murky tarn behind and march straight back to the village.", to: 10 }
        ]
      },
      10: {
        zone: "Woodland Village • Blazing Hearths",
        title: "Warmth Returns",
        text: "Across miles of dark timber, chimneys burst back to life with cheerful orange smoke! Woodcutter Vasily and the grateful villagers greet you with mugs of spiced cider, feasting you beside the roaring hearth until every trace of winter chill is gone.",
        onEnter: { healHp: 16, msg: "Roaring hearthfire thaws every chill (+16 HP)!" },
        choices: [
          { t: "Pause on the autumn road as a familiar creaking echoes from the pine ridge.", reqCw: "BABA_EMBER", badge: "BABA_EMBER", to: 11 },
          { t: "Accept the villages' collected tribute and head back toward Oakhaven.", to: 12 }
        ]
      },
      11: {
        zone: "Autumn Road",
        title: "Grandmother's Nod",
        text: "High on a mossy ridge, Baba Yaga's chicken-legged hut dances a single satisfied jig among the pines. A warm gust of woodsmoke drops a heavy leather pouch of 50 GP in antique gold beside your boots, accompanied by a faint, approving cackle.",
        onEnter: { gold: 50, msg: "Baba Yaga rewards your courtesy with 50 GP in antique gold!" },
        choices: [
          { t: "Complete the adventure and return to Oakhaven!", to: 12 }
        ]
      },
      12: {
        zone: "Epilogue",
        title: "Restorer of Hearthfire",
        text: "You bested the Ancient Vodyanoi, broke Doresh's winter hunt, and returned Grandmother's Fire to the freezing woods!",
        ending: { type: "true", title: "Keeper of the Woodland Flame", xp: 395, gold: 345, trophy: "Baba Yaga's Ember Coal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. THE VENGEFUL DRAGON (6 PAGES • LV 10)
  // ==========================================================
  bk_b16_marg_vengeful_dragon: {
    id: "bk_b16_marg_vengeful_dragon",
    title: "The Vengeful Dragon",
    subtitle: "Levoča & The Three-Headed Zmey Beneath the Oak",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Kariv Ranger of Levoča (Rusty Flagon Tavern)",
    summary: "Return to the woodland village of Levoča as an ancient, three-headed Zmey dragon—long bound beneath a great oak by Kariv magic—breaks free in a storm of fire and vengeance!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Levoča • Beneath the Great Oak",
        title: "Three Heads Wake",
        safeRetreat: true,
        text: "Long ago, Kariv archers lured a terrifying three-headed Zmey beneath a sacred great oak whose magic choked its dragonfire to smoke and bound it in the roots. Now the ancient seal is cracking, and Levoča trembles beneath draconic roars!",
        choices: [
          { t: "Weave the old Kariv root-ward along the oak's hollow to muffle one of the Zmey's fiery heads!", badge: "Arcana / Lore DC 16", check: { stat: "arcana", skill: "Lore", dc: 16, pass: 2, fail: 2, passMsg: "Emerald sap seals the oak's runes, choking half the Zmey's fiery breath!", failMsg: "The great oak splits with a thunderous crack as draconic minions spill from the roots!" }, onPass: { cw: "OAK_WARD" } },
          { t: "Descend straight into the smoking cavern beneath the Great Oak!", to: 2 }
        ]
      },
      2: {
        zone: "Roots of the Great Oak • Charred Tunnel",
        title: "Draconic Kin & Root-Burners",
        text: "Smoke-breathing wyrmlings and fire-scarred woodland cultists fan the Zmey's waking embers!",
        enemy: { name: "Zmey Brood & Flame Cultists", desc: "Fierce draconic servants freeing their three-headed master.", hp: 82, ac: 16, atk: 10, dmg: 12, xp: 345, gold: 205, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["OAK_WARD"] },
        choices: [
          { t: "Face the awakening three-headed Zmey in its root-bound cavern!", to: 3 }
        ]
      },
      3: {
        zone: "Cavern Beneath the Oak • Dragon's Lair",
        title: "The Three-Headed Zmey",
        text: "Sinuous scaly necks coil around the shattered oak roots as the towering, Three-Headed Vengeful Zmey roars with triple fury—jaws blazing with primordial dragonfire!",
        enemy: { name: "The Vengeful Three-Headed Zmey", desc: "Ancient multi-headed woodland dragon burning with centuries of rage.", hp: 98, ac: 17, atk: 11, dmg: 13, xp: 455, gold: 290, items: ["bq_zmey_triple_scale_mail"], weakCw: ["OAK_WARD"] },
        choices: [
          { t: "Slay the Zmey and claim its centuries-old hoard beneath the oak!", to: 4 }
        ]
      },
      4: {
        zone: "Village of Levoča • Celebration",
        title: "Levoča Stands Unburned",
        text: "The Kariv rangers and folk of Levoča hail you as the greatest hero of the woods, showering you with ancient silver and healing draughts.",
        onEnter: { healHp: 18, msg: "Kariv healing songs mend every burn (+18 HP)!" },
        choices: [
          { t: "Take your leave beneath the peaceful canopy.", to: 5 }
        ]
      },
      5: {
        zone: "Sacred Oak Glade",
        title: "Ashes Cooled",
        text: "Fresh green shoots sprout along the great oak's ancient bark.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Slayer of the Three-Headed Zmey",
        text: "You vanquished the Vengeful Zmey and saved Levoča from dragonfire!",
        ending: { type: "true", title: "Dragonslayer of the Great Oak", xp: 490, gold: 445, trophy: "Zmey's Crowned Fang" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. DERENDE I: THE FINGERS OF DERENDE (6 PAGES • LV 2)
  // Part 1 of 3
  // ==========================================================
  bk_b16_derende_1: {
    id: "bk_b16_derende_1",
    title: "Derende I: The Fingers of Derende",
    subtitle: "Part 1 of 3 • The Finger-Fortress of Family Starless",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Shaken Woodland Cutter (Rusty Flagon Tavern)",
    summary: "Investigate five colossal, sky-grasping trees known as the Fingers of Derende—where the sinister fey 'Family Starless' has built leafy treetop huts to conduct dark star-rituals!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Deep Woods • Fingers of Derende",
        title: "Trees Grasping the Sky",
        safeRetreat: true,
        text: "Five titanic, gnarled trees rise like a giant's hand clutching the twilight clouds! Woodcutters flee in terror as shadowy shapes dart among the leafy treetop huts of 'Family Starless,' who are channeling dark fey rituals atop the highest pointing finger!",
        choices: [
          { t: "Study the shifting constellation-pattern of the pointing branches to avoid their sleep-hex!", badge: "Arcana DC 11", check: { stat: "arcana", skill: "Arcana", dc: 11, pass: 2, fail: 2, passMsg: "You time your climb between the branches' hex-pulses, surprising Family Starless!", failMsg: "Dizzying starlight washes down the bark as treetop guards drop from the boughs!" }, onPass: { cw: "STAR_TIMING" } },
          { t: "Climb the knotted vine-ladders straight into the Finger-Fortress!", to: 2 }
        ]
      },
      2: {
        zone: "Finger-Fortress • Leafy Huts",
        title: "Sentinels of Family Starless",
        text: "Feral fey scouts and animated twig-guardians leap along the swaying rope-bridges linking the five massive trunks!",
        enemy: { name: "Family Starless Scouts", desc: "Sinister treetop fey defending their leafy fortress.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["STAR_TIMING"] },
        choices: [
          { t: "Ascend to the crooked ritual platform crowning the tallest Finger!", to: 3 }
        ]
      },
      3: {
        zone: "Tallest Finger • Star-Ritual Platform",
        title: "Matriarch of Family Starless",
        text: "Beside a glowing bowl of dark forest sap stands the veiled Matriarch of Family Starless, chanting to rouse the sleeping body of ancient Derende!",
        enemy: { name: "Matriarch of Family Starless", desc: "Dark fey ritualist awakening the buried limbs of Derende.", hp: 32, ac: 13, atk: 5, dmg: 6, xp: 95, gold: 65, items: ["bq_derende_finger_twig"], weakCw: ["STAR_TIMING"] },
        choices: [
          { t: "Overturn the ritual bowl and uncover her map pointing to the Tongue of Derende!", to: 4 }
        ]
      },
      4: {
        zone: "Base of the Fingers",
        title: "A Larger Mystery",
        text: "The Matriarch's bark-scroll reveals that the Fingers are only the beginning—necromancers are already marching on the ancient Tongue of Derende!",
        onEnter: { healHp: 8, msg: "Pure forest air restores your strength (+8 HP)!" },
        choices: [
          { t: "Report back to the woodcutters and prepare for Part 2!", to: 5 }
        ]
      },
      5: {
        zone: "Woodcutters' Camp",
        title: "Part 1 Complete",
        text: "Grateful cutters pay out their pooled silver as you chart the path deeper into the woods.",
        choices: [
          { t: "Complete Part 1!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Fingers Quieted",
        text: "Family Starless is broken! <strong>Derende II: The Tongue of Derende</strong> is now unlocked on your Quest Board!",
        ending: { type: "true", title: "Climber of the Fingers (Part 1 of 3)", xp: 130, gold: 120, trophy: "Starless Fey Charm" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. DERENDE II: THE TONGUE OF DERENDE (6 PAGES • LV 5)
  // Part 2 of 3 (Prerequisite: bk_b16_derende_1)
  // ==========================================================
  bk_b16_derende_2: {
    id: "bk_b16_derende_2",
    reqQuest: "bk_b16_derende_1",
    title: "Derende II: The Tongue of Derende",
    subtitle: "Part 2 of 3 • Captain Thoulous & The Speaking Glade",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Unlocks after Derende I",
    summary: "Venture to the mushroomed clearing called the Tongue of Derende—where all creatures speak one universal tongue—and stop Iron Ghoul Captain Thoulous and her necromancers from binding Derende's spirit!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Mushroomed Hollow • Tongue of Derende",
        title: "Where All Words Become One",
        safeRetreat: true,
        text: "Strange, glowing mushrooms carpet a mossy ridge where every whisper—bird, beast, or undead—becomes instantly understood! Iron Ghoul Captain Thoulous and her ghoul company 'Thoulous's Spear' have seized the Tongue so two necromancers can summon and enslave the ancient spirit of Derende!",
        choices: [
          { t: "Use the Tongue's universal speech to rally the clearing's woodland beasts against Thoulous's flank!", badge: "Persuasion DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 2, fail: 2, passMsg: "Stags and owls harry the ghoul patrol, scattering their formation!", failMsg: "Captain Thoulous hears your call and orders her iron ghouls to charge!" }, onPass: { cw: "BEAST_ALLY" } },
          { t: "Strike straight into the glowing mushroom ring to interrupt the necromancers!", to: 2 }
        ]
      },
      2: {
        zone: "Tongue of Derende • Outer Ring",
        title: "Thoulous's Spear",
        text: "Disciplined ghoul legionaries clad in black iron plate advance in a tight spear-wall across the luminescent fungi!",
        enemy: { name: "Thoulous's Ghoul Legionaries", desc: "Iron-armored undead soldiers guarding the summoning circle.", hp: 46, ac: 14, atk: 7, dmg: 7, undead: true, xp: 155, gold: 85, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["BEAST_ALLY"] },
        choices: [
          { t: "Confront Iron Ghoul Captain Thoulous and the two necromancers at the heart of the Tongue!", to: 3 }
        ]
      },
      3: {
        zone: "Tongue of Derende • Summoning Mound",
        title: "Captain Thoulous & The Necromancers",
        text: "Wielding a black-iron halberd, Captain Thoulous steps before the chanting necromancers as the ground rumbles with an ancient woodland voice: 'Derende's spirit belongs to the Imperium!'",
        enemy: { name: "Iron Ghoul Captain Thoulous", desc: "Ruthless undead commander protecting the dark spirit-binding ritual.", hp: 58, ac: 15, atk: 7, dmg: 8, undead: true, xp: 215, gold: 145, items: ["bq_thoulous_iron_spear"], weakCw: ["BEAST_ALLY"] },
        choices: [
          { t: "Break the necromancers' circle and listen to Derende's fading warning!", to: 4 }
        ]
      },
      4: {
        zone: "Tongue of Derende • Quiet Fungi",
        title: "The Voice of the Heart",
        text: "Before fading back into the soil, the ancient voice of Derende speaks clearly in your mind: a mutated abomination has seized the Heart of Derende deep within the forest!",
        onEnter: { healHp: 12, msg: "The grateful forest's magic mends your wounds (+12 HP)!" },
        choices: [
          { t: "Prepare for the final chapter: Part 3 — The Heart of Derende!", to: 5 }
        ]
      },
      5: {
        zone: "Deep Forest Trail",
        title: "Part 2 Complete",
        text: "Thoulous's Spear is shattered, leaving only the Heart of Derende to cleanse.",
        choices: [
          { t: "Complete Part 2!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Shatterer of Thoulous's Spear",
        text: "You freed the Tongue of Derende! <strong>Derende III: The Heart of Derende</strong> is now unlocked on your Quest Board!",
        ending: { type: "true", title: "Voice of the Tongue (Part 2 of 3)", xp: 250, gold: 240, trophy: "Iron Crest of Thoulous" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 12. DERENDE III: THE HEART OF DERENDE (6 PAGES • LV 9)
  // Part 3 of 3 (Prerequisite: bk_b16_derende_2)
  // ==========================================================
  bk_b16_derende_3: {
    id: "bk_b16_derende_3",
    title: "Derende III: The Heart of Derende",
    subtitle: "Part 3 of 3 • Lair of the Derendian Abomination",
    difficulty: "Deadly",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Unlocks after Derende II",
    summary: "Journey into the pulsing Heart of Derende—where a twisted ritual crowned a humble forest insect as a colossal, mutated Moth Abomination—and cleanse the living core of the ancient woods once and for all!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Heart of the Forest • Pulsing Glade",
        title: "Heart Within the Heart",
        safeRetreat: true,
        text: "Deepest in the primeval wood beats the literal Heart of Derende! When fey celebrants tried to crown a new forest avatar, a lowly moth took the blessing instead—swelling into a colossal, terrifying Derendian Moth Abomination that drove the fey away and warps every creature nearby!",
        choices: [
          { t: "Channel Archdruid Methensna's calming chant along the pulsing roots to soothe the mutated canopy!", badge: "Lore / Survival DC 15", check: { stat: "spirit", skill: "Lore", dc: 15, pass: 2, fail: 2, passMsg: "The ancient roots resonate in harmony, stripping away the abomination's spore-shield!", failMsg: "Mutated forest beasts burst from the glowing cocoons around the glade!" }, onPass: { cw: "HEART_CHANT" } },
          { t: "Cut through the shimmering silk-draped boughs into the Heart's lair!", to: 2 }
        ]
      },
      2: {
        zone: "Heart of Derende • Cocoon Canopy",
        title: "Derendian Mutants",
        text: "Warped piney rootwalkers and iridescent silk-beasts mutated by the Heart's wild magic surge through the luminous undergrowth!",
        enemy: { name: "Derendian Rootwalkers & Silk-Beasts", desc: "Mutated forest guardians warped by the Moth Abomination's aura.", hp: 74, ac: 16, atk: 9, dmg: 11, xp: 305, gold: 180, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["HEART_CHANT"] },
        choices: [
          { t: "Step into the beating timber sanctuary where the colossal Moth Abomination nests!", to: 3 }
        ]
      },
      3: {
        zone: "Heart of Derende • Beating Core",
        title: "The Derendian Moth Abomination",
        text: "Spreading titanic wings dusted in blinding, mutating spores, the Derendian Moth Abomination shrieks across the ancient canopy—draining the lifeblood of the forest's Heart!",
        enemy: { name: "Derendian Moth Abomination", desc: "Colossal fey-mutated insect avatar terrorizing the Heart of the woods.", hp: 88, ac: 16, atk: 10, dmg: 12, xp: 395, gold: 250, items: ["bq_heart_of_derende_amulet"], weakCw: ["HEART_CHANT"] },
        choices: [
          { t: "Cleanse the beating Heart of Derende and restore balance to the primeval woods!", to: 4 }
        ]
      },
      4: {
        zone: "Heart of Derende • Restored Glade",
        title: "The Woods Breathe Free",
        text: "Soft emerald light washes over the glade as the Fingers, Tongue, and Heart of Derende fall into peaceful harmony. Archdruid Methensna's spirits bestow a hero's blessing and ancient woodland gold.",
        onEnter: { healHp: 18, msg: "The cleansed Heart of Derende restores your vigor (+18 HP)!" },
        choices: [
          { t: "Step out of the primeval glade as champion of the Old Forest.", to: 5 }
        ]
      },
      5: {
        zone: "Forest Crossroads",
        title: "Trilogy Complete",
        text: "Across every glade, the ancient woods remember the hero who saved Derende.",
        choices: [
          { t: "Complete the Derende Trilogy!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Savior of Derende",
        text: "You conquered the Fingers, freed the Tongue, and cleansed the Heart of Derende!",
        ending: { type: "true", title: "Champion of the Heart of Derende (Part 3 of 3)", xp: 440, gold: 390, trophy: "Emerald Seed of Derende" },
        choices: []
      }
    }
  }
});
