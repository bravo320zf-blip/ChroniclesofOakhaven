/* ============================================================
   BOOK QUEST CONVERSIONS — BATCH 022 (10 Quests, Lv 1–9)
   - Three Little Pigs Trilogy (3-Part Chain • Lv 3):
     Nulah's Tale, Armina's Peril, Madgit's Story
   - Fowl Play Trilogy (3-Part Chain • Lv 1 → 2 → 3):
     Fowl Play, Rumble in the Henhouse, Birds of a Feather
   - 4 Standalone Quests (Lv 5–9):
     The Sunken Library of Qezzit Qire, Run Like Hell,
     Reclamation of Hallowhall, The Dark Aerie
   All quests use autoDiscover: false (Inn Rumor Pool / reqQuest chains).
   ============================================================ */
window.OAKHAVEN.registerQuests({

  // ==========================================================
  // 1. THREE LITTLE PIGS I: NULAH'S TALE (7 PAGES • LV 3)
  // Part 1 of 3
  // ==========================================================
  bk_b22_pigs_1: {
    id: "bk_b22_pigs_1",
    title: "Three Little Pigs I: Nulah's Tale",
    subtitle: "Part 1 of 3 • Per-Bastet & The Magic Pork Auction",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Help frantic Per-Bastet merchant Omar-bac-Maheem rescue his eldest daughter Nulah—accidentally polymorphed into a piglet on the Day of Pigs and seized by crooked farmer Jubb-il-Fatmina!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Per-Bastet Bazaar",
        title: "A Day of Pigs Gone Awry",
        safeRetreat: true,
        text: "Merchant Omar-bac-Maheem weeps in the sun-drenched square of Per-Bastet: a botched festival charm turned his three beloved daughters into piglets—and crooked farmer Jubb-il-Fatmina has already snatched Nulah to auction her as 'wish-granting magic pork'!",
        choices: [
          { t: "Slip behind the auction stalls to cut Nulah's tether before the bidding starts!", badge: "Stealth / Lockpicking DC 11", check: { stat: "agility", skill: "Stealth", dc: 11, pass: 2, fail: 2, failDmg: 4, passMsg: "You loose Nulah's pen-latch cleanly, throwing Jubb's thugs into chaos!", failMsg: "A wooden pitchfork jabs your ribs (-4 HP) as Jubb spots you!" }, onPass: { cw: "NULAH_UNLATCHED" } },
          { t: "Stride right onto the auction block and denounce Jubb-il-Fatmina!", to: 2 }
        ]
      },
      2: {
        zone: "Auction Pens",
        title: "Jubb's Bazaar Bruisers",
        text: "Greedy bidding spectators scatter as Jubb-il-Fatmina's hired market-bruisers swing brass knuckles and butcher hooks!",
        enemy: { name: "Jubb's Market Bruisers", desc: "Crooked auction guards defending the 'magic pig' scam.", hp: 25, ac: 12, atk: 5, dmg: 5, xp: 68, gold: 35, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["NULAH_UNLATCHED"] },
        choices: [
          { t: "Corner Jubb-il-Fatmina before she flees down the alley with Nulah!", to: 3 }
        ]
      },
      3: {
        zone: "Cul-de-Sac Alley",
        title: "Jubb-il-Fatmina's Last Stand",
        text: "Clutching a squirming ribbon-wearing piglet under one arm, repulsive farmer Jubb-il-Fatmina swings a heavy cleaver beside her snarling mastiff!",
        enemy: { name: "Jubb-il-Fatmina & Hound", desc: "Scheming pig-farmer determined to cash in on the festival.", hp: 33, ac: 13, atk: 6, dmg: 6, xp: 110, gold: 78, items: ["bq_bastet_ribbon_charm"], weakCw: ["NULAH_UNLATCHED"] },
        choices: [
          { t: "Scoop up safe, grunting Nulah and hurry back to Omar-bac-Maheem!", to: 4 }
        ]
      },
      4: {
        zone: "Omar's Courtyard",
        title: "One Daughter Home",
        text: "Omar weeps with relief as he cradles Nulah—just as an awakened vulture named Nefertari swoops onto the wall: 'Hurry! Gnoll hunters have spotted your second daughter Armina!'",
        onEnter: { gold: 45, healHp: 10, msg: "Omar gifts 45 GP & spiced tea (+10 HP)!" },
        choices: [
          { t: "Follow Nefertari's warning and prepare for Part 2: Armina's Peril!", to: 5 }
        ]
      },
      5: {
        zone: "Temple Road",
        title: "Nefertari's Lead",
        text: "The clever vulture wheels southward toward the desert hunting grounds.",
        choices: [
          { t: "Ready your gear for the chase!", to: 6 }
        ]
      },
      6: {
        zone: "City Gate",
        title: "Race Against Dawn",
        text: "Priestess Raheema's reversal spell can only be cast at dawn—every hour counts!",
        choices: [
          { t: "Complete Part 1 and unlock Part 2!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Nulah Rescued",
        text: "Nulah is safe in her father's arms! <strong>Three Little Pigs II: Armina's Peril</strong> is now unlocked!",
        ending: { type: "true", title: "Rescuer of Nulah (Part 1 of 3)", xp: 135, gold: 130, trophy: "Per-Bastet Festival Ribbon" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. THREE LITTLE PIGS II: ARMINA'S PERIL (7 PAGES • LV 3)
  // Part 2 of 3 (Prerequisite: bk_b22_pigs_1)
  // ==========================================================
  bk_b22_pigs_2: {
    id: "bk_b22_pigs_2",
    reqQuest: "bk_b22_pigs_1",
    title: "Three Little Pigs II: Armina's Peril",
    subtitle: "Part 2 of 3 • Nefertari's Gift & Gnoll Ostrich-Riders",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Unlocks after Three Little Pigs I",
    summary: "Race to the outskirts of Per-Bastet with awakened vulture Nefertari's magical dates, outmaneuver gnoll hunters mounted on war ostriches, and bring red-haired piglet Armina home!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Hunting Grounds Outskirts",
        title: "Nefertari's Rooftop Gift",
        safeRetreat: true,
        text: "Awakened vulture Nefertari glides down, dropping a carved wooden box packed with ten glowing dates and a cordial of strength! Ahead in the dusty lanes, terrified red-haired piglet Armina weaves desperately away from cackling gnoll hunters!",
        choices: [
          { t: "Cut through the weaver's courtyard to intercept Armina and calm her before the gnolls close in!", badge: "Athletics / Persuasion DC 11", check: { stat: "agility", skill: "Athletics", dc: 11, pass: 2, fail: 2, failDmg: 4, passMsg: "You scoop Armina to safety behind a wool-cart, ruining the gnolls' ambush!", failMsg: "A gnoll spear grazes your boot as you leap the wall (-4 HP)!" }, onPass: { cw: "ARMINA_CALMED" } },
          { t: "Charge straight down the dusty lane to meet the gnolls head-on!", to: 2 }
        ]
      },
      2: {
        zone: "Dusty Lanes",
        title: "Gnoll Hunting Pack",
        text: "Laughing gnoll trackers leap from rooftop awnings with jagged hyena-spears!",
        enemy: { name: "Gnoll Alley-Trackers", desc: "Ravenous desert scavengers chasing Armina through the lanes.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 70, gold: 38, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["ARMINA_CALMED"] },
        choices: [
          { t: "Face the gnoll pack-leader charging atop a fierce War Ostrich!", to: 3 }
        ]
      },
      3: {
        zone: "Dry Wash Arena",
        title: "War Ostrich Riders",
        text: "Feathers fly as a horned Gnoll Huntmaster spurs two massive, kicking War Ostriches straight across the dry wash!",
        enemy: { name: "Gnoll Huntmaster & War Ostrich", desc: "Fierce mounted hunter determined to claim the red-haired piglet.", hp: 35, ac: 13, atk: 6, dmg: 6, xp: 115, gold: 85, items: ["bq_nefertari_date_pouch"], weakCw: ["ARMINA_CALMED"] },
        choices: [
          { t: "Gather the frightened Armina and return swiftly to Omar's courtyard!", to: 4 }
        ]
      },
      4: {
        zone: "Omar's Courtyard",
        title: "Two Daughters Safe",
        text: "Armina trots gratefully beside Nulah, yet Omar's face pales: 'Only youngest Madgit—with her angelic singing voice—remains missing, and the Night of Pigs charcoal fires are already being lit!'",
        onEnter: { gold: 50, healHp: 12, msg: "Nefertari's magical dates restore +12 HP & Omar pays 50 GP!" },
        choices: [
          { t: "Ask Omar's servants for rumors of the notorious ratfolk 'Feaster'!", to: 5 }
        ]
      },
      5: {
        zone: "Evening Bazaar",
        title: "Charcoal Smoke",
        text: "A whisper in the spice-stalls speaks of a secret 100-GP-a-head cellar banquet tonight.",
        choices: [
          { t: "Track the scent of roast herbs toward the Old Cellar!", to: 6 }
        ]
      },
      6: {
        zone: "Cellar Alley",
        title: "One Sister Left",
        text: "Faint, sweet humming drifts from behind a rusted cellar bulkhead.",
        choices: [
          { t: "Complete Part 2 and unlock Part 3: Madgit's Story!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Armina Brought Home",
        text: "Two of Omar's three daughters are safe! <strong>Three Little Pigs III: Madgit's Story</strong> is now unlocked!",
        ending: { type: "true", title: "Protector of Armina (Part 2 of 3)", xp: 140, gold: 135, trophy: "Nefertari's Golden Feather" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. THREE LITTLE PIGS III: MADGIT'S STORY (7 PAGES • LV 3)
  // Part 3 of 3 (Prerequisite: bk_b22_pigs_2)
  // ==========================================================
  bk_b22_pigs_3: {
    id: "bk_b22_pigs_3",
    reqQuest: "bk_b22_pigs_2",
    title: "Three Little Pigs III: Madgit's Story",
    subtitle: "Part 3 of 3 • The Old Cellar & The Ratfolk Feaster",
    difficulty: "Medium-Hard",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Unlocks after Three Little Pigs II",
    summary: "Infiltrate the Old Cellar before the Night of Pigs banquet begins, outwit the ratfolk rogue known as The Feaster and his bride Darjenta, and reunite all three daughters by dawn!",
    totalPages: 7,
    pages: {
      1: {
        zone: "The Old Cellar",
        title: "Something Ratty This Way Cooks",
        safeRetreat: true,
        text: "Charcoal embers glow beneath a brick archway where shady host Aibtismat sells secret banquet seats for 100 GP a head. Down in the damp cellar, you hear a sweet, frightened squeak—youngest daughter Madgit—cornered by whiskered shadows!",
        choices: [
          { t: "Pick the wine-chute grate to drop behind the ratfolk brothers unseen!", badge: "Lockpicking / Stealth DC 12", check: { stat: "agility", skill: "Lockpicking", dc: 12, pass: 2, fail: 2, failDmg: 4, passMsg: "You slip silently behind the wine casks, catching the ratfolk gang off guard!", failMsg: "Glass bottles crash—a ratfolk dagger nicks your sleeve (-4 HP)!" }, onPass: { cw: "CELLAR_SURPRISE" } },
          { t: "Kick open the cellar door and spoil the Feaster's banquet!", to: 2 }
        ]
      },
      2: {
        zone: "Wine Vault",
        title: "Darjenta's Six Brothers",
        text: "Six chittering Ratfolk rogues armed with curved cheese-knives and slings swarm out from behind the dusty barrels!",
        enemy: { name: "Darjenta's Ratfolk Brothers", desc: "Nimble cellar cutthroats hunting the blonde piglet.", hp: 28, ac: 13, atk: 5, dmg: 5, xp: 75, gold: 45, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["CELLAR_SURPRISE"] },
        choices: [
          { t: "Corner The Feaster and his fierce bride Darjenta beside the glowing hearth!", to: 3 }
        ]
      },
      3: {
        zone: "Banquet Kitchen",
        title: "The Feaster & Darjenta",
        text: "Wielding twin silver-plated carving knives, the notorious ratfolk rogue known as The Feaster and his lethal bride Darjenta spring across the banquet table!",
        enemy: { name: "The Feaster & Darjenta", desc: "Cunning ratfolk rogue couple orchestrating the Night of Pigs feast.", hp: 38, ac: 14, atk: 6, dmg: 6, xp: 125, gold: 95, items: ["bq_feaster_carving_twin"], weakCw: ["CELLAR_SURPRISE"] },
        choices: [
          { t: "Lift singing little Madgit safely into your cloak and sprint for the Temple of Bastet!", to: 4 }
        ]
      },
      4: {
        zone: "Temple of Bastet • Dawn",
        title: "The Curse Lifted",
        text: "Just as dawn gilds the temple spires, Priestess Raheema chants her reversal rite—and in three bursts of rose-gold light, Nulah, Armina, and Madgit stand restored in Omar's weeping embrace!",
        onEnter: { gold: 65, healHp: 14, msg: "Omar bestows a lavish 65 GP thank-you purse (+14 HP)!" },
        choices: [
          { t: "Join the joyous dawn breakfast in Omar's garden.", to: 5 }
        ]
      },
      5: {
        zone: "Omar's Garden",
        title: "A Song of Thanks",
        text: "Madgit sings a hauntingly sweet melody of gratitude while Nefertari perches proudly on the fountain.",
        choices: [
          { t: "Accept Omar-bac-Maheem's family blessing!", to: 6 }
        ]
      },
      6: {
        zone: "Per-Bastet Square",
        title: "Heroes of the Day of Pigs",
        text: "The whole bazaar cheers the adventurers who saved all three daughters before dawn.",
        choices: [
          { t: "Complete the Three Little Pigs trilogy!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Savior of the Three Daughters",
        text: "Omar's family is whole again, and the Day of Pigs ends in laughter rather than tears!",
        ending: { type: "true", title: "Champion of Per-Bastet (Part 3 of 3)", xp: 165, gold: 160, trophy: "Golden Piglet of Omar" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. FOWL PLAY I: TROUBLE IN BELCASSEL (7 PAGES • LV 1)
  // Part 1 of 3
  // ==========================================================
  bk_b22_fowl_1: {
    id: "bk_b22_fowl_1",
    title: "Fowl Play I: Trouble in Belcassel",
    subtitle: "Part 1 of 3 • Cikavak Swarm & Belcassel House",
    difficulty: "Easy-Medium",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Investigate a bizarre flock of booze-stealing cikavak birds terrorizing Belcassel's tavern, track them to reclusive Jerome Bell's manor, and uncover a sinister road leading toward Maillon.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Belcassel Valley",
        title: "Feathers in the Ale",
        safeRetreat: true,
        text: "Tavernkeeper Ronaldo Cayune begs your help after a screeching flock of three-legged cikavak birds raided his liquor cellar! Patrons whisper the unnatural birds roost over at Jerome Bell's foul-smelling farmhouse.",
        choices: [
          { t: "Scout Belcassel House's shuttered windows before stepping inside!", badge: "Perception / Stealth DC 9", check: { stat: "spirit", skill: "Perception", dc: 9, pass: 2, fail: 2, failDmg: 2, passMsg: "You spot a two-headed death dog locked in the hall linen closet—avoiding its ambush!", failMsg: "A screeching cikavak swoops from the eaves, scratching your brow (-2 HP)!" }, onPass: { cw: "CLOSET_SPOTTED" } },
          { t: "Push straight through the reeking front door of Belcassel House!", to: 2 }
        ]
      },
      2: {
        zone: "Belcassel House",
        title: "The Death Dog Depository",
        text: "Shredded linens fly as a snarling, two-headed Death Dog bursts from the hall closet while drunken cikavak birds dive from the rafters!",
        enemy: { name: "Caged Death Dog & Cikavaks", desc: "Two-headed hound and mischievous winged pests.", hp: 14, ac: 11, atk: 3, dmg: 3, xp: 34, gold: 18, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["CLOSET_SPOTTED"] },
        choices: [
          { t: "Confront mad bird-keeper Jerome Bell in the parlor!", to: 3 }
        ]
      },
      3: {
        zone: "Belcassel Parlor",
        title: "Jerome Bell's Roost",
        text: "Surrounded by wicker birdcages and empty brandy casks, wild-eyed Jerome Bell commands his largest, razor-beaked Brood Cikavak to attack!",
        enemy: { name: "Jerome Bell & Brood Cikavak", desc: "Obsessed farm-cultist and his prized unnatural bird.", hp: 18, ac: 11, atk: 4, dmg: 4, xp: 52, gold: 32, items: ["bq_cikavak_feather_charm"], weakCw: ["CLOSET_SPOTTED"] },
        choices: [
          { t: "Search Jerome's desk for letters revealing who taught him this dark bird-craft!", to: 4 }
        ]
      },
      4: {
        zone: "Belcassel Study",
        title: "Yvette's Trail",
        text: "A mud-stained letter reveals that Jerome's wayward daughter Yvette has already departed down the narrow trade road toward Maillon—taking a charmed acolyte with her! You also recover 25 GP.",
        onEnter: { gold: 25, healHp: 6, msg: "Found Yvette's trail & 25 GP (+6 HP)!" },
        choices: [
          { t: "Report back to Ronaldo Cayune and collect your ale-cellar bounty.", to: 5 }
        ]
      },
      5: {
        zone: "The Stoat Tavern",
        title: "Ronaldo's Thanks",
        text: "Ronaldo pours foaming mugs for the whole table and presses 25 GP into your hand.",
        choices: [
          { t: "Prepare to follow Yvette's tracks down the Maillon road!", to: 6 }
        ]
      },
      6: {
        zone: "Maillon Trade Road",
        title: "Rutted Wagons",
        text: "Black feathers flutter along the hedgerows leading toward a roadside vineyard shrine.",
        choices: [
          { t: "Complete Part 1 and unlock Part 2: Rumble in the Henhouse!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Belcassel Cleared",
        text: "Belcassel's ale is safe, and Yvette's trail lies open! <strong>Fowl Play II: Rumble in the Henhouse</strong> is now unlocked!",
        ending: { type: "true", title: "Defender of Belcassel (Part 1 of 3)", xp: 75, gold: 70, trophy: "Belcassel Ale-Stein" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. FOWL PLAY II: RUMBLE IN THE HENHOUSE (7 PAGES • LV 2)
  // Part 2 of 3 (Prerequisite: bk_b22_fowl_1)
  // ==========================================================
  bk_b22_fowl_2: {
    id: "bk_b22_fowl_2",
    reqQuest: "bk_b22_fowl_1",
    title: "Fowl Play II: Rumble in the Henhouse",
    subtitle: "Part 2 of 3 • Shrine of Freyr & Freyja",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Unlocks after Fowl Play I",
    summary: "Follow Yvette's trail along the Maillon road to a quiet twin-gods shrine where tipsy, charmed Sister Charlette sells vintage wine—hiding a sinister avian ritual inside!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Shrine Vineyard",
        title: "Tipsy Sister Charlette",
        safeRetreat: true,
        text: "Stained-glass windows of Freyr and Freyja gleam above a peaceful hillside shrine. At the gate, rosy-cheeked Sister Charlette offers bottles of vintage wine for 12 GP—yet her pupils look strangely glazed!",
        choices: [
          { t: "Look closely at Sister Charlette's glazed eyes to break the charm softly!", badge: "Perception / Persuasion DC 10", check: { stat: "spirit", skill: "Perception", dc: 10, pass: 2, fail: 2, passMsg: "Charlette blinks free of the enchantment and warns you of the fiendish cockatrice-henhouse inside!", failMsg: "Charlette giggles hazily as harsh squawking erupts from the shrine courtyard!" }, onPass: { cw: "CHARLETTE_FREED" } },
          { t: "Push past the vineyard gate straight into the twin-gods shrine!", to: 2 }
        ]
      },
      2: {
        zone: "Shrine Courtyard",
        title: "Rumble in the Henhouse",
        text: "Feathers explode across the flagstones as mutated, iron-beaked Cockatrices and charmed acolytes burst from the temple coop!",
        enemy: { name: "Enraged Henhouse Cockatrices", desc: "Petrifying, foul-tempered birds loosed upon the shrine.", hp: 20, ac: 11, atk: 4, dmg: 4, xp: 48, gold: 28, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["CHARLETTE_FREED"] },
        choices: [
          { t: "Burst beneath the stained-glass windows of Freyr and Freyja!", to: 3 }
        ]
      },
      3: {
        zone: "Twin-Gods Shrine",
        title: "Yvette's Avian Warden",
        text: "Before the five statues of Freyr and Freyja stands Yvette's sinister avian guardian—a towering feathered harpy-witch keeping the shrine enthralled while Yvette flees toward Fellmire Swamp!",
        enemy: { name: "Shrine Harpy-Enchantress", desc: "Wicked bird-witch left behind to cover Yvette's escape.", hp: 27, ac: 12, atk: 5, dmg: 5, xp: 78, gold: 55, items: ["bq_freyja_vine_chalice"], weakCw: ["CHARLETTE_FREED"] },
        choices: [
          { t: "Shatter the charm-idol and free the remaining shrine sisters!", to: 4 }
        ]
      },
      4: {
        zone: "Shrine Cellar",
        title: "The Spell Lifted",
        text: "Grateful sisters press 40 GP and fresh harvest-bread (+10 HP) into your pack—pointing southward toward Fellmire Swamp and the forbidding gables of Count Yhandoulx's Manor.",
        onEnter: { gold: 40, healHp: 10, msg: "Freed the shrine (+40 GP, +10 HP)!" },
        choices: [
          { t: "Follow the chemical-scented swamp trail toward Fellmire.", to: 5 }
        ]
      },
      5: {
        zone: "Fellmire Road",
        title: "Too Many Eyes",
        text: "Animals peering from the ferns along the fen road seem to blink with far too many eyes.",
        choices: [
          { t: "Steel your nerves for Count Yhandoulx's Manor!", to: 6 }
        ]
      },
      6: {
        zone: "Swamp Causeway",
        title: "Final Confrontation Ahead",
        text: "Dark iron gates loom out of the fetid mist ahead.",
        choices: [
          { t: "Complete Part 2 and unlock Part 3: Birds of a Feather!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Savior of the Twin Shrine",
        text: "Sister Charlette and the shrine stand free! <strong>Fowl Play III: Birds of a Feather</strong> is now unlocked!",
        ending: { type: "true", title: "Liberator of the Henhouse (Part 2 of 3)", xp: 105, gold: 100, trophy: "Freyr's Golden Sheaf" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. FOWL PLAY III: BIRDS OF A FEATHER (7 PAGES • LV 3)
  // Part 3 of 3 (Prerequisite: bk_b22_fowl_2)
  // ==========================================================
  bk_b22_fowl_3: {
    id: "bk_b22_fowl_3",
    reqQuest: "bk_b22_fowl_2",
    title: "Fowl Play III: Birds of a Feather",
    subtitle: "Part 3 of 3 • Fellmire Swamp & Yhandoulx Manor",
    difficulty: "Medium-Hard",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Unlocks after Fowl Play II",
    summary: "Brave the bizarre, many-eyed beasts of Fellmire Swamp, explore the claw-scarred dining halls of Count Yhandoulx's Manor, and end the Fowl Play conspiracy for good!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Fellmire Swamp",
        title: "Little Swamp of Horrors",
        safeRetreat: true,
        text: "Fetid, chemical-tang air clings to hanging ferns where multi-eyed fen-beasts watch silently. Ahead rise the towering, claw-scarred gables of Yhandoulx Manor—where Yvette and her twisted patron conduct their final transformation!",
        choices: [
          { t: "Slip through the servant's linen room to salvage intact armor plates and flank the dining hall!", badge: "Stealth / Perception DC 11", check: { stat: "agility", skill: "Stealth", dc: 11, pass: 2, fail: 2, failDmg: 4, passMsg: "You ghost past the claw-gouged mahogany tables and catch the manor beasts flat-footed!", failMsg: "A many-eyed swamp-stalker rakes your shoulder (-4 HP)!" }, onPass: { cw: "MANOR_FLANKED" } },
          { t: "Storm straight through the splintered formal dining room!", to: 2 }
        ]
      },
      2: {
        zone: "Formal Dining Room",
        title: "Claws on Mahogany",
        text: "Splintered mahogany chairs fly as warped, feathered Swamp-Mutants and rabid guard-beasts leap from the shadowed private dining cabinets!",
        enemy: { name: "Fellmire Avian Mutants", desc: "Twisted multi-eyed horrors spawned in Count Yhandoulx's swamp.", hp: 28, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 42, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["MANOR_FLANKED"] },
        choices: [
          { t: "Ascend to the manor's grand aviary to confront Count Yhandoulx and Yvette!", to: 3 }
        ]
      },
      3: {
        zone: "Yhandoulx Aviary",
        title: "Birds of a Feather",
        text: "Beneath shattered skylight glass, monstrously transformed Count Yhandoulx spreads razor-feathered wings beside the scheming Yvette, unleashing a whirlwind of talons and chemical mist!",
        enemy: { name: "Count Yhandoulx & Yvette", desc: "Warped avian noble and the architect of the Fowl Play curse.", hp: 38, ac: 14, atk: 6, dmg: 6, xp: 125, gold: 95, items: ["bq_yhandoulx_talon_cloak"], weakCw: ["MANOR_FLANKED"] },
        choices: [
          { t: "Smash the alchemical mutagen vats and cleanse Fellmire Manor!", to: 4 }
        ]
      },
      4: {
        zone: "Manor Vault",
        title: "The Curse Broken",
        text: "Clean wind sweeps the chemical tang from Fellmire Swamp as you claim 60 GP from the manor's surviving strongbox.",
        onEnter: { gold: 60, healHp: 14, msg: "Cleansed Yhandoulx Manor (+60 GP, +14 HP)!" },
        choices: [
          { t: "Carry news of victory back to Fellmire and Belcassel.", to: 5 }
        ]
      },
      5: {
        zone: "Fellmire Village",
        title: "Clear Fen Air",
        text: "Townsfolk emerge cautiously as the eerie multi-eyed critters retreat deep into the reeds.",
        choices: [
          { t: "Receive the region's grateful bounty!", to: 6 }
        ]
      },
      6: {
        zone: "Belcassel Road",
        title: "No More Fowl Play",
        text: "From Belcassel to Fellmire, the strange avian plague is over for good.",
        choices: [
          { t: "Complete the Fowl Play trilogy!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Breaker of Yhandoulx Manor",
        text: "Count Yhandoulx's twisted aviary is silent, and peace returns to the valley!",
        ending: { type: "true", title: "Master of Fowl Play (Part 3 of 3)", xp: 165, gold: 155, trophy: "Silver Talon of Yhandoulx" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. THE SUNKEN LIBRARY OF QEZZIT QIRE (7 PAGES • LV 5)
  // ==========================================================
  bk_b22_sunken_library: {
    id: "bk_b22_sunken_library",
    title: "The Sunken Library of Qezzit Qire",
    subtitle: "Tolmezo Ruins • Undead Librarians & Scribings of Air",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Answer Sabine Felderol's commission in Tolmezo to delve into the Sunken Library of Qezzit Qire, slip past shuffling zombie librarians, and claim the lost tome from Head Librarian Amra Zabbas.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Upper Lounge",
        title: "The Stuck Librarian",
        safeRetreat: true,
        text: "Damp marble steps lead beneath Tolmezo into the hushed Sunken Library of Qezzit Qire. Behind a closed mahogany door, you hear a soft, rhythmic thump—a zombie librarian clutching too many books to turn the doorknob!",
        choices: [
          { t: "Move in librarian's silence through the Upper Stacks to bypass the cataloguing traps!", badge: "Stealth / Arcana DC 12", check: { stat: "arcana", skill: "Stealth", dc: 12, pass: 2, fail: 2, failDmg: 5, passMsg: "You glide silently past the stuck librarian and decipher Qezzit's air-ward runes!", failMsg: "A falling folio alerts the undead staff—cold spectral hands claw you (-5 HP)!" }, onPass: { cw: "LIBRARY_QUIET" } },
          { t: "Force open the Hall of Cataloguing with weapon drawn!", to: 2 }
        ]
      },
      2: {
        zone: "Hall of Cataloguing",
        title: "Overdue Undead",
        text: "Hissing 'QUIET!' through dry jaws, robed Zombie Librarians and animated flying grimoires converge down the dusty aisles!",
        enemy: { name: "Undead Library Staff", desc: "Shuffling zombie archivists and razor-edged flying tomes.", hp: 46, ac: 14, atk: 7, dmg: 7, undead: true, xp: 138, gold: 72, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["LIBRARY_QUIET"] },
        choices: [
          { t: "Enter the Head Librarian's Office and the chamber of Scribings of Air!", to: 3 }
        ]
      },
      3: {
        zone: "Head Librarian's Office",
        title: "Head Librarian Amra Zabbas",
        text: "Floating amidst swirling air-runes and glowing wind-scrolls, spectral Head Librarian Amra Zabbas refuses to let any mortal borrow Qezzit Qire's forbidden treatise!",
        enemy: { name: "Amra Zabbas, Head Librarian", desc: "Ancient undead archivist wielding wind-carved arcana.", hp: 58, ac: 15, atk: 8, dmg: 8, undead: true, xp: 198, gold: 138, items: ["bq_qezzit_air_codex"], weakCw: ["LIBRARY_QUIET"] },
        choices: [
          { t: "Retrieve Sabine Felderol's requested tome and antique library furnishings!", to: 4 }
        ]
      },
      4: {
        zone: "Scribings of Air",
        title: "Rare Folios Secured",
        text: "You pack the priceless lost treatise alongside 85 GP in gilded book-clasps and antique scholarly coin.",
        onEnter: { gold: 85, healHp: 12, msg: "Claimed 85 GP & rested in the quieted stacks (+12 HP)!" },
        choices: [
          { t: "Ascend back to sunlit Tolmezo.", to: 5 }
        ]
      },
      5: {
        zone: "Tolmezo Square",
        title: "Sabine's Delight",
        text: "Patron Sabine Felderol examines the intact binding with breathless joy.",
        choices: [
          { t: "Collect your scholar's commission!", to: 6 }
        ]
      },
      6: {
        zone: "Seven Cities Guild",
        title: "Fame Among Sages",
        text: "Word spreads across the Seven Cities that the Sunken Library has finally been mastered.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Archivist of Qezzit Qire",
        text: "The lost knowledge of Qezzit Qire is recovered, and its restless librarians rest at last!",
        ending: { type: "true", title: "Delver of Qezzit Qire", xp: 225, gold: 215, trophy: "Brass Library Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. RUN LIKE HELL (7 PAGES • LV 6)
  // ==========================================================
  bk_b22_run_like_hell: {
    id: "bk_b22_run_like_hell",
    title: "Run Like Hell",
    subtitle: "Rosedale Stables & The Infernal Centaur Ruin",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Investigate a horrifying discovery in Rosedale's locked stables, track a cabal of gnome cultists of the Eleven Hells to their watchtower ruin, and put down their crazed infernal centaur!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Rosedale Stables",
        title: "Behind Locked Barn Doors",
        safeRetreat: true,
        text: "Stablemaster Darash Ilvari bolted the barn doors pale with terror after finding hoof-prints burned with brimstone! Following the charred trail leads to a hilltop ruin where four gnome cult fanatics study rituals of the Eleven Hells!",
        choices: [
          { t: "Decipher the scattered fusion diagrams in the ruin's library to learn the centaur's weakness!", badge: "Arcana / Perception DC 13", check: { stat: "arcana", skill: "Perception", dc: 13, pass: 2, fail: 2, failDmg: 6, passMsg: "You spot the unstable brimstone-sigil binding the hybrid creature—giving you a lethal edge!", failMsg: "An infernal ward-spark jolts your fingers (-6 HP)!" }, onPass: { cw: "RITUAL_DECODED" } },
          { t: "Storm straight up the watchtower stairs toward the gnome cultists!", to: 2 }
        ]
      },
      2: {
        zone: "Ruin Watchtower",
        title: "Gnome Cult of the Eleven Hells",
        text: "Four red-robed Gnome Cult Fanatics hurl crackling hellfire bolts from the watchtower battlements!",
        enemy: { name: "Gnome Hell-Cult Fanatics", desc: "Twisted diabolists conducting forbidden creature-fusion rites.", hp: 54, ac: 15, atk: 8, dmg: 8, xp: 168, gold: 92, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["RITUAL_DECODED"] },
        choices: [
          { t: "Confront the maddened Infernal Centaur rampaging in the lower pen!", to: 3 }
        ]
      },
      3: {
        zone: "Shattered Courtyard",
        title: "The Crazed Infernal Centaur",
        text: "Smoke pours from flaming nostrils as a titanic, half-mad Infernal Centaur—forged from brimstone and agony—thunders across the flagstones!",
        enemy: { name: "Crazed Infernal Centaur", desc: "Tragic, hellfire-fused monstrosity driven insane by the cult.", hp: 68, ac: 15, atk: 9, dmg: 9, xp: 245, gold: 168, items: ["bq_hellfire_horseshoe_charm"], weakCw: ["RITUAL_DECODED"] },
        choices: [
          { t: "Burn the forbidden Eleven Hells ritual tomes and lay the beast to rest!", to: 4 }
        ]
      },
      4: {
        zone: "Cult Library",
        title: "Brimstone Extinguished",
        text: "As the profane scrolls turn to ash, you claim 95 GP from the cultists' iron strongbox.",
        onEnter: { gold: 95, healHp: 14, msg: "Destroyed the infernal tomes (+95 GP, +14 HP)!" },
        choices: [
          { t: "Return to Rosedale with news that the threat is ended.", to: 5 }
        ]
      },
      5: {
        zone: "Rosedale Square",
        title: "Peace in the Pastures",
        text: "Darash Ilvari unbolts the stables with a trembling sigh of relief.",
        choices: [
          { t: "Collect Rosedale's grateful purse!", to: 6 }
        ]
      },
      6: {
        zone: "Village Inn",
        title: "Safe Roads",
        text: "Farmers toast the heroes who ended the nightmare in the hills.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Breaker of the Hell-Cult",
        text: "Rosedale's pastures are safe, and the Eleven Hells ritual is ash!",
        ending: { type: "true", title: "Scourge of the Hell-Cult", xp: 268, gold: 255, trophy: "Charred Brimstone Horseshoe" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. RECLAMATION OF HALLOWHALL (7 PAGES • LV 9)
  // ==========================================================
  bk_b22_hallowhall: {
    id: "bk_b22_hallowhall",
    title: "Reclamation of Hallowhall",
    subtitle: "Magdar's Fallen Fortress • Angelic Pillars & Fiends",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Answer the Queen of Magdar's royal commission to reclaim overrun Hallowhall—disarming its glyph-warded entrance, clearing the fiend-held guard towers, and banishing its abyssal usurper.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Hallowhall Entrance",
        title: "Crossed Blades, Golden Eye & Rose",
        safeRetreat: true,
        text: "Four pillars carved with weeping angels support the vaulted hall of Hallowhall beneath its ancient crest—crossed blades, a golden eye, and a rose. Across the interior double doors hums a lethal Glyph of Warding!",
        choices: [
          { t: "Dispel or disarm the entrance Glyph of Warding without alerting the courtyard fiends!", badge: "Arcana / Lockpicking DC 15", check: { stat: "arcana", skill: "Lockpicking", dc: 15, pass: 2, fail: 2, failDmg: 9, passMsg: "The glyph dissolves silently—letting you ambush the fiends in the guard tower!", failMsg: "Thunderous ward-fire blasts the dusty carpet (-9 HP)!" }, onPass: { cw: "GLYPH_CLEARED" } },
          { t: "Brace your shield and burst straight through the warded doors!", to: 2 }
        ]
      },
      2: {
        zone: "Eastern Guard Tower",
        title: "Fiends of the Courtyard",
        text: "Snarling barbed fiends and corrupted mercenaries pour from the grime-coated courtyard towers!",
        enemy: { name: "Hallowhall Fiend Garrison", desc: "Infernal squatters defiling Magdar's storied keep.", hp: 82, ac: 16, atk: 10, dmg: 11, xp: 300, gold: 170, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["GLYPH_CLEARED"] },
        choices: [
          { t: "March into the great throne hall to banish Hallowhall's Abyssal Usurper!", to: 3 }
        ]
      },
      3: {
        zone: "Great Hall of Hallowhall",
        title: "The Abyssal Usurper",
        text: "Enthroned beneath the defaced rose-and-blade banner sits a horned Abyssal Warlord wreathed in shadow-flame, laughing as it hefts a colossal iron halberd!",
        enemy: { name: "Maldrath, Abyssal Usurper", desc: "Tyrannical fiend lord claiming Hallowhall as its bastion.", hp: 98, ac: 17, atk: 11, dmg: 12, xp: 425, gold: 295, items: ["bq_hallowhall_rose_aegis"], weakCw: ["GLYPH_CLEARED"] },
        choices: [
          { t: "Raise the Queen's banner over Hallowhall and claim the guard tower hoard!", to: 4 }
        ]
      },
      4: {
        zone: "Hallowhall Keep",
        title: "Fortress Reclaimed",
        text: "Sunlight streams through the tall lancet windows once more as you recover 145 GP from the fiends' looted sacks.",
        onEnter: { gold: 145, healHp: 20, msg: "Reclaimed Hallowhall (+145 GP, +20 HP)!" },
        choices: [
          { t: "Ride back to report your victory to the Queen of Magdar.", to: 5 }
        ]
      },
      5: {
        zone: "Royal Court",
        title: "The Queen's Favor",
        text: "Trumpets sound as the Queen honors the champions who restored Hallowhall's glory.",
        choices: [
          { t: "Accept the royal bounty!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven",
        title: "Masters of Hallowhall",
        text: "Songs of the rose, golden eye, and crossed blades echo through the Rusty Flagon.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Reclaimer of Hallowhall",
        text: "Hallowhall stands proud and free beneath the banners of Magdar!",
        ending: { type: "true", title: "Reclaimer of Hallowhall", xp: 455, gold: 430, trophy: "Golden Eye & Rose Crest" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. THE DARK AERIE (7 PAGES • LV 8)
  // ==========================================================
  bk_b22_dark_aerie: {
    id: "bk_b22_dark_aerie",
    title: "The Dark Aerie",
    subtitle: "The Red Wastes • Gnoll Slavers & Aerial Circus",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Brave the scorching sandstorms of the Red Wastes, outsmart gnoll slavers along collapsing canyon rims, dodge venomous boulder-snakes, and storm the sinister Dark Aerie!",
    totalPages: 7,
    pages: {
      1: {
        zone: "The Red Wastes",
        title: "Sandstorm & Unstable Rim",
        safeRetreat: true,
        text: "Blistering heat shimmers across the Red Wastes as you close on the notorious Aerial Circus. Outside the gnoll slaver camp, unstable ground rings the rocky wall—ready to collapse under heavy boots!",
        choices: [
          { t: "Spot the unstable perimeter and trigger a collapse under the gnoll slavers instead!", badge: "Survival / Perception DC 14", check: { stat: "spirit", skill: "Survival", dc: 14, pass: 2, fail: 2, failDmg: 7, passMsg: "Sand gives way beneath the gnolls' picket line, burying their spears!", failMsg: "Loose scree drops out from under your boot (-7 HP)!" }, onPass: { cw: "GNOLLS_BURIED" } },
          { t: "Charge straight through the swirling red dust into the slaver camp!", to: 2 }
        ]
      },
      2: {
        zone: "Covered Snake Hole",
        title: "Slavers & Sun-Basking Vipers",
        text: "Gnoll slavers drive captives toward the cliff-lift while a writhing swarm of giant poisonous snakes bursts from beneath a sun-baked boulder!",
        enemy: { name: "Red Wastes Slavers & Vipers", desc: "Ruthless desert gnolls and venomous boulder-snakes.", hp: 72, ac: 16, atk: 9, dmg: 10, xp: 245, gold: 135, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["GNOLLS_BURIED"] },
        choices: [
          { t: "Ascend the wind-whipped rope-crane into the Dark Aerie!", to: 3 }
        ]
      },
      3: {
        zone: "The Dark Aerie",
        title: "Forresh of Laughing Fire",
        text: "High atop the sun-scorched crag, winged aerialist horrors and their ruthless master Forresh strike from tattered silk canopies!",
        enemy: { name: "Forresh & Aerie Horrors", desc: "Winged desert tyrant commanding the sinister Aerial Circus.", hp: 88, ac: 16, atk: 10, dmg: 11, xp: 345, gold: 240, items: ["bq_dark_aerie_wingcloak"], weakCw: ["GNOLLS_BURIED"] },
        choices: [
          { t: "Release the desert captives and claim the slavers' strongbox!", to: 4 }
        ]
      },
      4: {
        zone: "Aerie Platform",
        title: "Freedom Over the Wastes",
        text: "Grateful desert travelers climb down the cliff-lift to safety as you collect 115 GP in stolen caravan gold.",
        onEnter: { gold: 115, healHp: 18, msg: "Freed the Red Wastes captives (+115 GP, +18 HP)!" },
        choices: [
          { t: "Guide the survivors across the cooling evening dunes.", to: 5 }
        ]
      },
      5: {
        zone: "Oasis Trail",
        title: "Storm Passed",
        text: "Cool starlight bathes the Red Wastes as the dark banners of the Aerial Circus fall silent.",
        choices: [
          { t: "Return to Oakhaven with the rescued travelers!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven",
        title: "Heroes of the Wastes",
        text: "Caravan guilds reward you warmly for breaking the Red Wastes slaver ring.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Conqueror of the Dark Aerie",
        text: "The Dark Aerie is broken, and the Red Wastes caravans travel free!",
        ending: { type: "true", title: "Breaker of the Dark Aerie", xp: 385, gold: 345, trophy: "Crimson Circus Plume" },
        choices: []
      }
    }
  }

});
