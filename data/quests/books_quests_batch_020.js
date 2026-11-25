/* ============================================================
   BOOK QUEST CONVERSIONS — BATCH 020 (10 Quests, Lv 1–9)
   - Firefalls of Ghoss, The Rune Crypt of Sianis, The Scorpion's Shadow,
     Bastion of Rime and Salt, The Infernal Salt Pits, Ill-Met By Moonlight,
     Lamassu's Secrets, Mad Maze of the Moon Kingdom,
     Storming the Queen's Desire, A Leeward Shore
   All quests use autoDiscover: false (Inn Rumor Pool).
   ============================================================ */
window.OAKHAVEN.registerQuests({

  // ==========================================================
  // 1. FIREFALLS OF GHOSS (7 PAGES • LV 9)
  // ==========================================================
  bk_b20_firefalls_ghoss: {
    id: "bk_b20_firefalls_ghoss",
    title: "Firefalls of Ghoss",
    subtitle: "Smoky Mountain Fortress & The Charms of Lada",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Follow the Temple of Loving Mercy's vague mountain map to the lost volcanic stronghold of the dragon Ghoss, fight past hell-summoned guardians, and recover the stolen Charms of Lada.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Banner Hall of Ghoss",
        title: "Caverns of Smoke",
        safeRetreat: true,
        text: "Behind a curtain of falling volcanic embers yawns the lost tunnel into Ghoss's mountain fortress. Heaps of unhung conquest banners lie dusty beside the Caverns of Smoke, where sulfuric heat rises from a portal to the Eleven Hells!",
        choices: [
          { t: "Read the stitched conquest emblems to trace the dragon's hidden flanking tunnel!", badge: "Arcana / Perception DC 15", check: { stat: "arcana", skill: "Perception", dc: 15, pass: 2, fail: 2, failDmg: 8, passMsg: "You locate a vent-passage behind the banners, bypassing the smoking choke-point!", failMsg: "Scalding ash gusts down the tunnel (-8 HP)!" }, onPass: { cw: "GHOSS_FLANKED" } },
          { t: "March straight through the Caverns of Smoke with weapon raised!", to: 2 }
        ]
      },
      2: {
        zone: "Caverns of Smoke",
        title: "Guardians of the Eleven Hells",
        text: "Brimstone-wreathed devils and ash-scaled mountain drakes lunge from the smoke-stained arches to bar intruders from Ghoss's treasure focus!",
        enemy: { name: "Infernal Ash-Guardians", desc: "Hell-bound fiends drawn to Ghoss's fiery focus.", hp: 82, ac: 16, atk: 10, dmg: 11, xp: 300, gold: 165, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["GHOSS_FLANKED"] },
        choices: [
          { t: "Push past the magma cascades into the Firefalls Sanctum!", to: 3 }
        ]
      },
      3: {
        zone: "Firefalls Sanctum",
        title: "Incinis & The Dragon's Focus",
        text: "Curtains of molten lava cascade down basalt columns around a gleaming planar focus! Incinis—the blazing draconic-infernal warden left guarding the stolen Charms of Lada—unfurls wings of living cinder!",
        enemy: { name: "Incinis, Warden of the Firefalls", desc: "Volcanic guardian of Ghoss's stolen temple hoard.", hp: 98, ac: 17, atk: 11, dmg: 12, xp: 420, gold: 290, items: ["bq_charms_of_lada"], weakCw: ["GHOSS_FLANKED"] },
        choices: [
          { t: "Claim the radiant Charms of Lada and ransack Ghoss's side-coffers!", to: 4 }
        ]
      },
      4: {
        zone: "Fortress Vault",
        title: "Hoard of the Lost Fortress",
        text: "With Incinis shattered, the golden Charms of Lada chime warmly in your pack alongside 140 GP in ancient temple tribute.",
        onEnter: { gold: 140, healHp: 20, msg: "Claimed 140 GP and soothing temple radiance (+20 HP)!" },
        choices: [
          { t: "Escape the trembling mountain tunnels before the firefalls shift.", to: 5 }
        ]
      },
      5: {
        zone: "Mountain Pass",
        title: "Cool Highland Air",
        text: "You emerge into crisp mountain starlight with the priceless relic intact.",
        choices: [
          { t: "Deliver the Charms of Lada to the Temple of Loving Mercy.", to: 6 }
        ]
      },
      6: {
        zone: "Temple of Loving Mercy",
        title: "The High Priestess's Gratitude",
        text: "Tears of joy shine in the high priestess's eyes as the sacred relic returns to its altar.",
        choices: [
          { t: "Claim your reward!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Champion of the Firefalls",
        text: "The Charms of Lada gleam once more in the Temple of Loving Mercy, and Ghoss's fiery vault is broken!",
        ending: { type: "true", title: "Conqueror of the Firefalls", xp: 450, gold: 420, trophy: "Cinder-Crown of Ghoss" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. THE RUNE CRYPT OF SIANIS (7 PAGES • LV 7)
  // ==========================================================
  bk_b20_rune_crypt_sianis: {
    id: "bk_b20_rune_crypt_sianis",
    title: "The Rune Crypt of Sianis",
    subtitle: "Helari Family Tomb • Chernobog's Bargain",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Delve into the cursed Helari family crypt where desperate ravenfolk treasure-hunters are trapped by risen kinsmen and a psoglav demon guarding Sianis's dark resurrection rune.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Disturbed Mourning Chamber",
        title: "Feathers in the Dust",
        safeRetreat: true,
        text: "A secret panel stands pried ajar inside the ransacked Helari mourning chamber. Black ravenfolk feathers and shattered ward-candles trail deeper into the crypt—while hollow groans echo from the family alcoves!",
        choices: [
          { t: "Move silently and parley with the trapped ravenfolk doom croaker ahead!", badge: "Stealth / Persuasion DC 14", check: { stat: "agility", skill: "Stealth", dc: 14, pass: 2, fail: 2, failDmg: 6, passMsg: "The surviving ravenfolk whisper the demon's weakness in exchange for safe passage!", failMsg: "Loose rubble clatters—undead Helari kin lunge from the alcoves (-6 HP)!" }, onPass: { cw: "RAVENFOLK_INTEL" } },
          { t: "Stride boldly into the candle-strewn burial hall!", to: 2 }
        ]
      },
      2: {
        zone: "Helari Catacombs",
        title: "The Betrayed Family",
        text: "Pale, frost-rimmed undead bearing the Helari family crest rise from overturned biers to defend Sianis's forbidden rune!",
        enemy: { name: "Undead Helari Kinsmen", desc: "Risen victims of Sianis's desperate pact with Chernobog.", hp: 64, ac: 15, atk: 9, dmg: 9, undead: true, xp: 210, gold: 105, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["RAVENFOLK_INTEL"] },
        choices: [
          { t: "Cross the threshold into Sianis's Inner Sanctum!", to: 3 }
        ]
      },
      3: {
        zone: "Inner Sanctum",
        title: "The Psoglav Demon",
        text: "Snarling over Sianis Helari's rune-carved sarcophagus crouches a towering, dog-headed Psoglav Demon—Chernobog's enforcer sent to guard the cursed resurrection rune!",
        enemy: { name: "Psoglav Crypt-Warden", desc: "Savage abyssal fiend guarding Sianis's sarcophagus.", hp: 78, ac: 16, atk: 10, dmg: 10, xp: 300, gold: 195, items: ["bq_sianis_rune_signet"], weakCw: ["RAVENFOLK_INTEL"] },
        choices: [
          { t: "Purify Sianis's dark rune and open the sealed Helari Vault!", to: 4 }
        ]
      },
      4: {
        zone: "Helari Vault",
        title: "Rest for the House of Helari",
        text: "With the Psoglav banished and Chernobog's rune shattered, the trapped ravenfolk slip away in silence while you claim 95 GP from the family reliquary.",
        onEnter: { gold: 95, healHp: 16, msg: "Purified the crypt (+95 GP, +16 HP)!" },
        choices: [
          { t: "Ascend the moss-grown crypt steps into fresh night air.", to: 5 }
        ]
      },
      5: {
        zone: "Hillside Graveyard",
        title: "Quiet Stones",
        text: "The oppressive shadow over the Helari mausoleum lifts at last.",
        choices: [
          { t: "Return to Oakhaven with proof of the crypt's cleansing.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven",
        title: "Tale of the Rune Crypt",
        text: "Local clerics praise you for sealing away Chernobog's dark relic.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Purifier of the Rune Crypt",
        text: "Sianis's tragic pact is undone, and the House of Helari sleeps in peace!",
        ending: { type: "true", title: "Purifier of Sianis's Crypt", xp: 330, gold: 300, trophy: "Helari Silver Rune-Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. THE SCORPION'S SHADOW (7 PAGES • LV 1)
  // ==========================================================
  bk_b20_scorpions_shadow: {
    id: "bk_b20_scorpions_shadow",
    title: "The Scorpion's Shadow",
    subtitle: "Ruins of Anu-Asir • Cults of Tiberesh & Selket",
    difficulty: "Easy-Medium",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Trace a bleeding courier's desert trail to a lonely watchtower near Anu-Asir, where scheming cultists of Tiberesh and Selket strike a dark alliance.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Desert Tower Approach",
        title: "Blood in the Sand",
        safeRetreat: true,
        text: "Fresh crimson drops lead past a wind-scoured tower where two robed figures stand over a wounded horse—while a hulking, thick-hided Trollkin stalks out of the archway hefting a heavy maul!",
        choices: [
          { t: "Circle behind the sandstone dunes to strike the Trollkin off balance!", badge: "Stealth / Agility DC 9", check: { stat: "agility", skill: "Stealth", dc: 9, pass: 2, fail: 2, failDmg: 2, passMsg: "You slip behind the dune undetected and seize the initiative!", failMsg: "Loose sand betrays your boot—a thrown handaxe grazes you (-2 HP)!" }, onPass: { cw: "DUNE_FLANK" } },
          { t: "Charge straight in to save the wounded steed and stop the cultists!", to: 2 }
        ]
      },
      2: {
        zone: "Tower Courtyard",
        title: "The Thick-Hided Mauler",
        text: "The hulking Trollkin brute roars and swings his heavy maul across the dusty courtyard!",
        enemy: { name: "Desert Trollkin Enforcer", desc: "Thick-hided hired muscle guarding the secret parley.", hp: 14, ac: 11, atk: 3, dmg: 3, xp: 34, gold: 18, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1, weakCw: ["DUNE_FLANK"] },
        choices: [
          { t: "Burst into the tower chamber before the Tibereshi Priest seals the pact!", to: 3 }
        ]
      },
      3: {
        zone: "Tower Vault",
        title: "Pact of the Scorpion",
        text: "Beside a bronze scorpion brazier stands a grim Tibereshi Priest clutching stolen survey maps of Anu-Asir!",
        enemy: { name: "Tibereshi Priest & Acolyte", desc: "Desert cultists plotting to seize the ruins of Anu-Asir.", hp: 18, ac: 11, atk: 4, dmg: 4, xp: 52, gold: 32, items: ["bq_selket_stinger_pin"], weakCw: ["DUNE_FLANK"] },
        choices: [
          { t: "Seize the stolen council maps and tend the courier's wounded horse!", to: 4 }
        ]
      },
      4: {
        zone: "Sandstone Cistern",
        title: "Stolen Survey Maps",
        text: "Inside the priest's leather case you recover the High Councilor's sealed Anu-Asir maps and 25 GP in desert silver.",
        onEnter: { gold: 25, healHp: 6, msg: "Claimed 25 GP and cooled off at the cistern (+6 HP)!" },
        choices: [
          { t: "Ride back to the city gates before sundown.", to: 5 }
        ]
      },
      5: {
        zone: "Caravan Gate",
        title: "Warning Delivered",
        text: "The city watch clears the gate immediately upon seeing the recovered council seal.",
        choices: [
          { t: "Report the cultists' scheme to the High Councilor!", to: 6 }
        ]
      },
      6: {
        zone: "Council Hall",
        title: "Anu-Asir Secured",
        text: "The High Councilor rewards you handsomely for breaking the secret cult alliance.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Breaker of the Scorpion's Shadow",
        text: "The secret pact between Tiberesh and Selket is exposed before their trap could spring!",
        ending: { type: "true", title: "Scourge of the Scorpion's Shadow", xp: 75, gold: 70, trophy: "Bronze Scorpion Signet" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. BASTION OF RIME AND SALT (7 PAGES • LV 2)
  // ==========================================================
  bk_b20_rime_and_salt: {
    id: "bk_b20_rime_and_salt",
    title: "Bastion of Rime and Salt",
    subtitle: "Cliffside Keep of Binalric • The Slatelight Ring",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Brave the frozen sea-cliff fortress of Binalric once held by seafaring dwarves, relight the extinguished hearth-brazier, and claim the storied Slatelight Ring.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Binalric Cliff Gate",
        title: "Frozen Doors",
        safeRetreat: true,
        text: "High above crashing winter surf stands Binalric, an ancient dwarven sea-fortress crusted in eerie salt-rime. Its heavy oak doors are frozen solid beneath swirling frost-mist!",
        choices: [
          { t: "Melt the rime-lock with Firebolt or chip the hinges cleanly!", badge: "Perception / Might DC 10", check: { stat: "might", skill: "Perception", dc: 10, pass: 2, fail: 2, failDmg: 3, passMsg: "The frozen iron cracks cleanly—you slip inside before the spirits stir!", failMsg: "Bitter frost-rime numbs your hands (-3 HP) as you force the door!" }, onPass: { cw: "RIME_BREACHED" } },
          { t: "Shoulder straight through the ice-encrusted sea-doors!", to: 2 }
        ]
      },
      2: {
        zone: "Hall of the Brazier",
        title: "The Extinguished Hearth",
        text: "Frost-coated dwarven shields line a silent hall centered on an unlit magical brazier—built to repel sea spirits! Pale, brine-dripping specters surge from the icy arches as you approach!",
        enemy: { name: "Rime Sea-Spirits", desc: "Vengeful ocean phantoms that overran Binalric.", hp: 20, ac: 11, atk: 4, dmg: 4, undead: true, xp: 48, gold: 25, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["RIME_BREACHED"] },
        choices: [
          { t: "Strike flint to the magical dwarven brazier to rally its warmth against the cold!", to: 3, onChoose: { cw: "BRAZIER_LIT", msg: "Roaring golden embers thaw the hall—weakening the ancient sea-curse!" } },
          { t: "Leave the brazier dark and slip straight into the Slatelight Vault!", to: 3 }
        ]
      },
      3: {
        zone: "Slatelight Vault",
        title: "The Firegeist & Frost-Warden",
        text: "Crackling embers clash with howling ocean-frost as a wild Firegeist and the spectral Sea-Warden battle for dominion over the pedestal holding the Slatelight Ring!",
        enemy: { name: "Binalric Firegeist & Frost-Warden", desc: "Elemental flame spirit and icy sea-phantom guarding the vault.", hp: 26, ac: 12, atk: 5, dmg: 5, xp: 78, gold: 55, items: ["bq_slatelight_ring"], weakCw: ["BRAZIER_LIT", "RIME_BREACHED"] },
        choices: [
          { t: "Claim the Slatelight Ring and gather the seafaring dwarves' salvaged coin!", to: 4 }
        ]
      },
      4: {
        zone: "Dwarven Sea-Cellar",
        title: "Warmth on the Cliffs",
        text: "With the spirits quieted, you recover 35 GP in dwarven sea-silver from an intact locker.",
        onEnter: { gold: 35, healHp: 8, msg: "Recovered 35 GP and warmed by the hearth (+8 HP)!" },
        choices: [
          { t: "Descend the snowy cliff-trail back toward Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Sea Cliffs",
        title: "Clear Horizon",
        text: "The unnatural rime melts away from Binalric's battlements under a pale sun.",
        choices: [
          { t: "Return to Oakhaven with the dwarven relic!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven",
        title: "Binalric Reclaimed",
        text: "Coastal mariners toast your courage as the cursed beacon-cliff stands clear.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Master of Rime and Salt",
        text: "The Bastion of Rime and Salt is freed, and the Slatelight Ring is yours!",
        ending: { type: "true", title: "Conqueror of Binalric", xp: 105, gold: 100, trophy: "Dwarven Sea-Anchor Crest" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. THE INFERNAL SALT PITS (7 PAGES • LV 6)
  // ==========================================================
  bk_b20_infernal_salt_pits: {
    id: "bk_b20_infernal_salt_pits",
    title: "The Infernal Salt Pits",
    subtitle: "Ghatazi Rock-Salt Mines • Cult of Mammon",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Infiltrate the gleaming Ghatazi salt mines operated by copper-masked cultists of Mammon, expose silver-tongued Nebmontu, and topple the coin-armored Gilded Devil.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Ghatazi Mining Camp",
        title: "Copper Half-Masks & Three Gold Coins",
        safeRetreat: true,
        text: "Blinding white salt-terraces surround a bustling desert pit guarded by white-robed cultists wearing leering copper half-masks and three-coin pendants of Mammon. At the ledger tent, unmasked overseer Nebmontu greets newcomers with a silky smile.",
        choices: [
          { t: "Pose as a wealthy salt-buyer to learn where the hidden devil-vault lies!", badge: "Persuasion / Stealth DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 2, fail: 2, failDmg: 5, passMsg: "Nebmontu boasts too freely—revealing the mine-lift down to the Gilded Devil's vault!", failMsg: "A masked cultist sees through your ruse and hurls a salt-bolas (-5 HP)!" }, onPass: { cw: "MINE_INFILTRATED" } },
          { t: "Draw steel and smash straight into Nebmontu's ledger tent!", to: 2 }
        ]
      },
      2: {
        zone: "Ledger Pavilion",
        title: "Nebmontu & The Masked Fanatics",
        text: "Dropping his polite veneer, silver-tongued Nebmontu signals three copper-masked cult fanatics to silence you beside the stacked papyrus salt-contracts!",
        enemy: { name: "Nebmontu & Mammon Fanatics", desc: "Greedy cult overseer and his copper-masked enforcers.", hp: 54, ac: 14, atk: 8, dmg: 8, xp: 165, gold: 105, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["MINE_INFILTRATED"] },
        choices: [
          { t: "Ride the timber mine-hoist down into the glittering lower salt-vault!", to: 3 }
        ]
      },
      3: {
        zone: "Gilded Salt-Vault",
        title: "The Gilded Devil",
        text: "Clad in clinking armor forged from thousands of stamped gold coins, a towering Gilded Devil steps out from behind crystalline salt pillars, eyes gleaming with infernal avarice!",
        enemy: { name: "Gilded Devil of Ghatazi", desc: "Coin-mailed devil overseeing Mammon's salt-pit tithes.", hp: 68, ac: 16, atk: 9, dmg: 9, xp: 245, gold: 195, items: ["bq_mammon_coin_mail"], weakCw: ["MINE_INFILTRATED"] },
        choices: [
          { t: "Free the chained salt-miners and confiscate Mammon's tithe-chest!", to: 4 }
        ]
      },
      4: {
        zone: "Salt-Pit Treasury",
        title: "Chains Broken",
        text: "Cheering miners shatter their shackles as you recover 110 GP in untainted trade-coin from the overturned ledger chests.",
        onEnter: { gold: 110, healHp: 14, msg: "Freed the salt-miners (+110 GP, +14 HP)!" },
        choices: [
          { t: "Escort the liberated workers out of the blinding salt basin.", to: 5 }
        ]
      },
      5: {
        zone: "Desert Road",
        title: "Salt & Freedom",
        text: "Behind you, the copper banners of Mammon burn in the dry desert wind.",
        choices: [
          { t: "Return to Oakhaven with the liberated caravan!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Market",
        title: "Guild Gratitude",
        text: "Honest salt-merchants celebrate the end of the infernal monopoly.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Breaker of the Salt Pits",
        text: "Mammon's gilded grip on Ghatazi is shattered, and the salt roads are free!",
        ending: { type: "true", title: "Liberator of the Salt Pits", xp: 270, gold: 265, trophy: "Three-Coin Copper Mask" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. ILL-MET BY MOONLIGHT (7 PAGES • LV 6)
  // ==========================================================
  bk_b20_ill_met_moonlight: {
    id: "bk_b20_ill_met_moonlight",
    title: "Ill-Met By Moonlight",
    subtitle: "Shadow-Fey Intrigue & The Chimeric Mage",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Calm an angry town mob accusing a shadow-fey traveler of local kidnappings, uncover a vile demonic sigil of Akyishigal, and defeat Lady Maedera d'Faucon the Chimeric Mage.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Moonlit Town Square",
        title: "Aspera & The Angry Mob",
        safeRetreat: true,
        text: "Torches flare around a stylishly dressed shadow-fey named Aspera cornered by furious townsfolk blaming her kind for recent midnight kidnappings. 'I am innocent!' she pleads. 'Track the real culprit to the shuttered manor on the hill!'",
        choices: [
          { t: "Calm the mob and win Aspera's trust to learn the manor's secret password!", badge: "Persuasion / Spirit DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 2, fail: 2, passMsg: "The crowd backs down, and Aspera reveals the hidden garden door and trap-ward!", failMsg: "You pull Aspera clear of the crowd, though the delay alerts the manor's sentries." }, onPass: { cw: "ASPERA_ALLY" } },
          { t: "Slip away immediately toward the shuttered hill-manor!", to: 2 }
        ]
      },
      2: {
        zone: "Manor Interior Hallway",
        title: "Shadow-Fey Guardians",
        text: "Inside the velvet-draped foyer, a bronze icon of Akyishigal glints upon a dresser—just as two sleek Shadow-Fey Guardians and a snarling gnarljak lunge from the gloom!",
        enemy: { name: "Shadow-Fey Guardians & Gnarljak", desc: "Fanatical fey bodyguards defending Lady Maedera's manor.", hp: 56, ac: 15, atk: 8, dmg: 8, xp: 170, gold: 90, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["ASPERA_ALLY"] },
        choices: [
          { t: "Kick open the moonlit conservatory doors to face Lady Maedera!", to: 3 }
        ]
      },
      3: {
        zone: "Moonlit Conservatory",
        title: "Lady Maedera d'Faucon",
        text: "Beneath cracked glass domes, Lady Maedera d'Faucon—the Chimeric Mage—weaves shimmering fey illusions and abyssal chitin-magic to shield her captive townsfolk!",
        enemy: { name: "Lady Maedera d'Faucon", desc: "Shadow-fey chimeric archmage devoted to dark bargains.", hp: 66, ac: 15, atk: 9, dmg: 9, xp: 245, gold: 165, items: ["bq_maedera_chimeric_focus"], weakCw: ["ASPERA_ALLY"] },
        choices: [
          { t: "Release the kidnapped townsfolk from the cellar cages!", to: 4 }
        ]
      },
      4: {
        zone: "Manor Cellar",
        title: "Truth Revealed",
        text: "The rescued townsfolk confirm Aspera had nothing to do with their abduction—and you recover 85 GP in stolen ransom-gold.",
        onEnter: { gold: 85, healHp: 14, msg: "Freed the captives (+85 GP, +14 HP)!" },
        choices: [
          { t: "Escort the survivors back to the town square.", to: 5 }
        ]
      },
      5: {
        zone: "Town Square",
        title: "Aspera Cleared",
        text: "Ashamed of their haste, the elders apologize to Aspera, who bows gracefully to you before vanishing into moonlit mist.",
        choices: [
          { t: "Accept the town's grateful reward!", to: 6 }
        ]
      },
      6: {
        zone: "Village Hall",
        title: "Peace Under Moonlight",
        text: "The kidnappings are over, and justice was served without spilling innocent blood.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Defender of the Moonlit Truce",
        text: "Lady Maedera's dark conservatory is broken, and every missing villager is home safe!",
        ending: { type: "true", title: "Breaker of the Chimeric Veil", xp: 265, gold: 255, trophy: "Silver Moon-Mask of Aspera" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. LAMASSU'S SECRETS (7 PAGES • LV 7)
  // ==========================================================
  bk_b20_lamassus_secrets: {
    id: "bk_b20_lamassus_secrets",
    title: "Lamassu's Secrets",
    subtitle: "House Zisuthros • Overgrown Roof & Golden Mosaic",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Ascend to the ancient dam-side palace of House Zisuthros, brave owl harpies nesting atop the ruined roof-garden, and prove yourself worthy of Mesannaki the Lamassu's hidden lore.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Dam Approach",
        title: "House Zisuthros",
        safeRetreat: true,
        text: "Below the stone causeway leading to House Zisuthros hang gilded cages bearing the warnings of greedy past raiders. Inside the northwest wing gleams an exquisite Baragisi Eridu mosaic depicting pilgrims approaching the Basilica of the Golden Lion.",
        choices: [
          { t: "Study the Golden Lion mosaic to decipher the palace's peaceful pilgrim-greeting!", badge: "Arcana / Perception DC 14", check: { stat: "arcana", skill: "Perception", dc: 14, pass: 2, fail: 2, passMsg: "You spot the sacred cipher honoring Mesannaki—earning respect in the inner hall!", failMsg: "Feathered wings shriek from the overgrown roof-garden above!" }, onPass: { cw: "MOSAIC_CIPHER" } },
          { t: "Climb the spiral stairs straight toward the overgrown roof-garden!", to: 2 }
        ]
      },
      2: {
        zone: "Overgrown Roof-Garden",
        title: "Owl Harpies of the Pyramid",
        text: "Cracked stonework bursts with wild vines around a southeast stone pyramid—where a pair of razor-taloned Owl Harpies swoop down in dead silence!",
        enemy: { name: "Roof-Garden Owl Harpies", desc: "Silent winged predators tolerated as palace sentries.", hp: 64, ac: 15, atk: 9, dmg: 9, xp: 210, gold: 95, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["MOSAIC_CIPHER"] },
        choices: [
          { t: "Descend into the Golden Sanctum to meet Mesannaki the Lamassu!", to: 3 }
        ]
      },
      3: {
        zone: "Golden Sanctum",
        title: "Trial of the Lamassu",
        text: "Towering beneath gilded pillars stands Mesannaki, an ancient winged celestial Lamassu! 'Many thieves seek my vault,' the guardian rumbles. 'Prove your strength and resolve in honorable trial!'",
        enemy: { name: "Mesannaki's Golden Construct", desc: "Celestial lion-forged guardian testing worthy seekers.", hp: 76, ac: 16, atk: 10, dmg: 10, xp: 300, gold: 190, items: ["bq_lamassu_golden_diadem"], weakCw: ["MOSAIC_CIPHER"] },
        choices: [
          { t: "Bow before Mesannaki and receive the ancient pilgrim scrolls!", to: 4 }
        ]
      },
      4: {
        zone: "Sanctum Archive",
        title: "Wisdom of Shuruppak",
        text: "Pleased by your honor, Mesannaki unlocks a cedar reliquary holding 115 GP in antique gold and rare planar maps.",
        onEnter: { gold: 115, healHp: 18, msg: "Received Mesannaki's blessing (+115 GP, +18 HP)!" },
        choices: [
          { t: "Depart House Zisuthros in peace along the sunlit dam.", to: 5 }
        ]
      },
      5: {
        zone: "Dam Causeway",
        title: "Golden Sunset",
        text: "The gilded cages behind you rattle softly—never meant for those who walk with honor.",
        choices: [
          { t: "Return to Oakhaven with the Lamassu's lore!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven",
        title: "Honored Seeker",
        text: "Scholars marvel at the genuine scrolls of Shuruppak you brought back.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Worthy of the Lamassu",
        text: "You passed the trial of House Zisuthros and earned the timeless favor of Mesannaki!",
        ending: { type: "true", title: "Chosen of the Golden Lamassu", xp: 335, gold: 310, trophy: "Golden Lion Mosaic Tile" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. MAD MAZE OF THE MOON KINGDOM (7 PAGES • LV 5)
  // ==========================================================
  bk_b20_mad_maze_moon: {
    id: "bk_b20_mad_maze_moon",
    title: "Mad Maze of the Moon Kingdom",
    subtitle: "Four Rulers' Labyrinth • The Poet & The Broken",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Navigate a pitch-black subterranean labyrinth honoring four forgotten Moon Rulers, follow the ghostly Poet's silver arrows, and defeat the mad hunter known as Broken.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Hall of Four Frescoes",
        title: "Keys of the Moon Rulers",
        safeRetreat: true,
        text: "No torch burns in the twelve-foot corridors of the Moon Kingdom's labyrinth. On the entry walls gleam four inlaid ruler frescoes: King Zenrydon in electrum & coral, Queen Pelegia in copper & greenstone, King Danilos in gold & garnet, and Queen Melenni in silver & onyx!",
        choices: [
          { t: "Match the electrum-and-coral key to the northern false door to summon the Poet's guide!", badge: "Arcana / Perception DC 12", check: { stat: "arcana", skill: "Perception", dc: 12, pass: 2, fail: 2, failDmg: 5, passMsg: "A glowing silver arrow of moonlight appears, guiding you past the labyrinth's traps!", failMsg: "A wrong key triggers a dart-snare from the masonry (-5 HP)!" }, onPass: { cw: "POET_GUIDED" } },
          { t: "Light a lantern and push straight into the pitch-black maze!", to: 2 }
        ]
      },
      2: {
        zone: "Twisting Corridors",
        title: "Echoes of the Maze",
        text: "Scratching laughter bounces off the blind corners as crazed maze-prowlers and animated stone guardians converge on your lantern-light!",
        enemy: { name: "Labyrinth Stalkers", desc: "Shadow-twisted guardians patrolling the Moon Kingdom's halls.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 135, gold: 68, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["POET_GUIDED"] },
        choices: [
          { t: "Follow the final shaft of silver moonlight into the Central Rotunda!", to: 3 }
        ]
      },
      3: {
        zone: "Central Rotunda",
        title: "Broken, Hunter of the Maze",
        text: "Crouched beneath a cracked silver moon-mirror snarls Broken—a shattered, blade-wielding horror that has hunted lost delvers in this dark maze for decades!",
        enemy: { name: "Broken, Terror of the Labyrinth", desc: "Relentless mad predator stalking the Moon Kingdom's heart.", hp: 58, ac: 15, atk: 8, dmg: 8, xp: 195, gold: 135, items: ["bq_moon_poet_keyblade"], weakCw: ["POET_GUIDED"] },
        choices: [
          { t: "Claim the four inlaid royal keys and open the Moon Kingdom's exit vault!", to: 4 }
        ]
      },
      4: {
        zone: "Moon Treasury",
        title: "The Poet's Farewell",
        text: "The ghostly Poet bows in silent gratitude as the labyrinth's curse lifts, revealing 80 GP in antique electrum and onyx.",
        onEnter: { gold: 80, healHp: 12, msg: "Claimed 80 GP and the Poet's serene blessing (+12 HP)!" },
        choices: [
          { t: "Follow the silver starlight back to the surface.", to: 5 }
        ]
      },
      5: {
        zone: "Moonlit Ridge",
        title: "Out of the Dark",
        text: "Fresh night air fills your lungs as the stone entrance seals peacefully behind you.",
        choices: [
          { t: "Return to Oakhaven with the Moon Kingdom's relics!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven",
        title: "Chronicle of the Four Rulers",
        text: "Historians eagerly copy down the inscriptions of Zenrydon, Pelegia, Danilos, and Melenni.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Master of the Moon Maze",
        text: "You solved the riddle of the four Moon Rulers and freed the Poet's labyrinth from Broken!",
        ending: { type: "true", title: "Solver of the Moon Maze", xp: 225, gold: 215, trophy: "Electrum & Coral Royal Key" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. STORMING THE QUEEN'S DESIRE (7 PAGES • LV 4)
  // ==========================================================
  bk_b20_queens_desire: {
    id: "bk_b20_queens_desire",
    title: "Storming the Queen's Desire",
    subtitle: "Messori Harbor • Cursed Galleon & Trapped Hold",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Board Captain Marie de Lech's moored galleon in Messori Harbor to break the eerie whispering 'curse' driving off her crew and disarm the baron's lightning-trapped hold.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Main Deck • Queen's Desire",
        title: "Whispers on the Waves",
        safeRetreat: true,
        text: "Lapping harbor waves hiss eerie warnings across the deck of the Queen's Desire: 'Leave this ship! You do not belong!' Previous envoys fled in terror—yet the planks smell faintly of ozone and arcane illusion!",
        choices: [
          { t: "Pierce the illusory wave-whispers and trace them to the trapped cargo hold!", badge: "Arcana / Perception DC 12", check: { stat: "arcana", skill: "Perception", dc: 12, pass: 2, fail: 2, failDmg: 5, passMsg: "It's a clever illusion masking a lightning-glyph on the hold door! You disarm it cleanly!", failMsg: "Crackling blue lightning arcs from the hold door (-5 HP)!" }, onPass: { cw: "ILLUSION_PIERCED" } },
          { t: "Charge straight down the companionway into the dark cargo hold!", to: 2 }
        ]
      },
      2: {
        zone: "Trapped Cargo Hold",
        title: "The Baron's Left-Behind Guardians",
        text: "Storm-charged constructs and stowaway smugglers hired by the ship's former baron leap from behind salt-barrels to keep Marie de Lech from sailing!",
        enemy: { name: "Baron's Storm-Smugglers", desc: "Saboteurs and spark-wards left aboard the Queen's Desire.", hp: 36, ac: 13, atk: 6, dmg: 6, xp: 98, gold: 52, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["ILLUSION_PIERCED"] },
        choices: [
          { t: "Corner the illusionist ringleader in the Captain's Cabin!", to: 3 }
        ]
      },
      3: {
        zone: "Captain's Cabin",
        title: "The Shipboard Illusionist",
        text: "Surrounded by crackling storm-bottles and whispering sea-shells, the baron's hired sea-mage unleashes a gale of illusory phantoms and lightning!",
        enemy: { name: "Baron's Storm-Illusionist", desc: "Cunning maritime mage orchestrating the 'curse' on the ship.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 155, gold: 110, items: ["bq_queens_desire_compass"], weakCw: ["ILLUSION_PIERCED"] },
        choices: [
          { t: "Shatter the whispering storm-bottles and declare the galleon clean!", to: 4 }
        ]
      },
      4: {
        zone: "Quarterdeck",
        title: "Quiet Waters",
        text: "The eerie whispers vanish instantly. Captain Marie de Lech strides aboard beaming, handing you 55 GP plus free passage whenever you need it.",
        onEnter: { gold: 55, healHp: 10, msg: "Cleared the galleon (+55 GP, +10 HP)!" },
        choices: [
          { t: "Watch the Queen's Desire raise its sails in Messori Harbor.", to: 5 }
        ]
      },
      5: {
        zone: "Messori Wharf",
        title: "Fair Winds",
        text: "Sailors cheer from the rigging as the curse-free vessel glides out of port.",
        choices: [
          { t: "Collect your full harbormaster bonus!", to: 6 }
        ]
      },
      6: {
        zone: "Harbor Tavern",
        title: "Toast to the Captain",
        text: "Dockworkers buy your round as word spreads that the Queen's Desire sails again.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Breaker of the Harbor Curse",
        text: "The baron's sabotage is undone, and Captain Marie de Lech owes you a lasting debt!",
        ending: { type: "true", title: "Savior of the Queen's Desire", xp: 175, gold: 165, trophy: "Brass Storm-Bottle" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. A LEEWARD SHORE (7 PAGES • LV 3)
  // ==========================================================
  bk_b20_leeward_shore: {
    id: "bk_b20_leeward_shore",
    title: "A Leeward Shore",
    subtitle: "Crab Island • Standing Stones & Bone Crabs",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Rusty Flagon Inn Rumor",
    summary: "Sail with weathered wharf-scout Brechen Yura to mysterious Crab Island, survive carrion bone crabs and a prowling serpopard, and unravel the ancient standing-stone ritual.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Crab Island Beach",
        title: "Standing Stones & Carrion Shore",
        safeRetreat: true,
        text: "Sheer cliffs rise to a ring of ancient standing stones above a beach littered with sun-bleached seabirds. Beside you, wharf-scout Brechen Yura stares hungrily at the ruined adjunct temple—just as pale, skeletal Bone Crabs scuttle out of the surf!",
        choices: [
          { t: "Search the ruined priest's alcove for the coral tablets before the crabs close in!", badge: "Perception / Survival DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, failDmg: 4, passMsg: "You spot the waterproof vellum and coral tablets warning of the trap-pincers!", failMsg: "A hidden stone crab-claw trap snaps your shin (-4 HP)!" }, onPass: { cw: "CORAL_TABLETS" } },
          { t: "Stand shoulder-to-shoulder with Brechen and meet the Bone Crabs on the sand!", to: 2 }
        ]
      },
      2: {
        zone: "Surf Line",
        title: "Bone Crabs of the Leeward Shore",
        text: "Three clacking, ivory-shelled Bone Crabs surge out of the foam to defend their carrion feast!",
        enemy: { name: "Swarm of Bone Crabs", desc: "Carrion-eating crustacean horrors haunting the island.", hp: 25, ac: 12, atk: 5, dmg: 5, xp: 68, gold: 30, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["CORAL_TABLETS"] },
        choices: [
          { t: "Climb the cliff-path to the Standing Stones as a sinuous predator stalks the grass!", to: 3 }
        ]
      },
      3: {
        zone: "Ring of Sacral Stones",
        title: "The Island Serpopard",
        text: "Scenting blood from the beach, a long-necked, fanged Serpopard coils between the crab-shaped standing stones—leaping straight at you as Brechen lights the ritual candles!",
        enemy: { name: "Island Serpopard", desc: "Serpentine feline apex predator guarding the sacral stones.", hp: 34, ac: 13, atk: 6, dmg: 6, xp: 112, gold: 78, items: ["bq_leeward_endless_flask"], weakCw: ["CORAL_TABLETS"] },
        choices: [
          { t: "Complete the counterclockwise candle-ritual and claim the island's hidden cache!", to: 4 }
        ]
      },
      4: {
        zone: "Sacral Stone Vault",
        title: "The Dream Answered",
        text: "A hidden recess beneath the central stone clicks open, revealing 45 GP in sunken sea-gold and answering the haunting riddle of Brechen Yura's dreams.",
        onEnter: { gold: 45, healHp: 10, msg: "Uncovered the island cache (+45 GP, +10 HP)!" },
        choices: [
          { t: "Sail back to the mainland with Brechen before the evening squall hits.", to: 5 }
        ]
      },
      5: {
        zone: "Open Sea",
        title: "Homeward Tide",
        text: "Behind the skiff, the standing stones of Crab Island fade gently into ocean mist.",
        choices: [
          { t: "Dock safely at the wharf!", to: 6 }
        ]
      },
      6: {
        zone: "Harbor Wharf",
        title: "Brechen's Peace",
        text: "Relieved of his lifelong dream-riddle, Brechen Yura splits the voyage profits generously.",
        choices: [
          { t: "Complete the quest!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Explorer of the Leeward Shore",
        text: "The mysteries of Crab Island are solved, and its ancient waterside relic is yours!",
        ending: { type: "true", title: "Voyager of the Leeward Shore", xp: 140, gold: 135, trophy: "Coral Tablet of Crab Island" },
        choices: []
      }
    }
  }

});
