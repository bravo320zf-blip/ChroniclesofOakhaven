/* ============================================================
   BOOK QUESTS — BATCH 006 (11 Quests • Two 3-Part Trilogies!)
   Sources:
   - Eldritch Lairs (All 7 unique lairs incl. 3-Part Feycircle/Qorgeth Trilogy — Complete)
   - Frozen Castle (Complete)
   - Grimalkin (3-Part Chained Sequel to Cat & Mouse — Complete)
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. PIT OF THE DUST GOBLINS (7 PAGES • LV 2)
  // Feycircle & Qorgeth Trilogy (Part 1 of 3)
  // ==========================================================
  bk_b6_eldritch_1_dust_goblins: {
    id: "bk_b6_eldritch_1_dust_goblins",
    title: "Feycircle I: Pit of the Dust Goblins",
    subtitle: "Eldritch Lairs (Part 1 of 3) • Shaman Sisskuss & Captive Selang",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Feycircle Refugees (Oakhaven Outskirts)",
    summary: "Enter the ruined fairy-ring village of Feycircle, rescue gatekeeper Hana and missing siblings Rennie and Linde from exiled dust goblin shaman Sisskuss, and uncover why their father Petring vanished beneath the town graveyard.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Ruins of Feycircle",
        title: "Hana's Plea",
        safeRetreat: true,
        text: "Refugees fled Feycircle when dust goblins exiled from the Bloody Tusks tribe occupied its ley-line fairy ring. Trapped in her shuttered cottage, loyal gatekeeper Hana whispers that young siblings Rennie and Linde are being held as bargaining chips!",
        choices: [
          { t: "Slip through the overgrown garden walls toward the goblin pit.", badge: "Stealth DC 11", check: { stat: "agility", skill: "Stealth", dc: 11, pass: 2, fail: 2, passMsg: "You evade the goblin sentries and reach the captive selang's cage!", failMsg: "Dust goblin lookouts shriek and loose jagged arrows!" }, onPass: { cw: "FEYCIRCLE_STEALTH" } },
          { t: "March boldly down the village square toward the fairy ring!", to: 2 }
        ]
      },
      2: {
        zone: "The Ley-Line Fairy Ring",
        title: "Bargain With the Captive Selang",
        text: "Bound inside a circle of salt and bone, a sly shadow fey selang hisses: 'Free me from shaman Sisskuss and slaughter these filthy goblins, mortal, and I'll shatter their wards for you!'",
        choices: [
          { t: "Agree cautiously to break Sisskuss's hold over the fairy ring.", to: 3, onChoose: { cw: "SELANG_DEAL", msg: "The fickle selang chuckles and dims the goblin wards!" } },
          { t: "Ignore the fickle fey and charge straight into the Dust Goblin Pit!", to: 3 }
        ]
      },
      3: {
        zone: "Pit of the Dust Goblins",
        title: "Shaman Sisskuss",
        text: "Surrounded by dust-pale goblin cultists waving stolen village silver, shaman Sisskuss raises a shadow-wreathed bone staff over weeping siblings Rennie and Linde!",
        enemy: { name: "Shaman Sisskuss & Dust Goblins", desc: "Shadow-fey venerating dust goblin cultists.", hp: 28, ac: 12, atk: 5, dmg: 5, xp: 70, gold: 45, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), weakCw: ["FEYCIRCLE_STEALTH", "SELANG_DEAL"] },
        choices: [
          { t: "Untie Rennie and Linde and escort them back to Hana!", to: 4 }
        ]
      },
      4: {
        zone: "Hana's Cottage",
        title: "A Chilling Clue",
        text: "Reunited with Hana, young Rennie cries out: 'Our father Petring went down a hole beneath the Heroes' Monument in the graveyard—he said he found a way to save the village, but worms came out!'",
        onEnter: { healHp: 8, msg: "Hana binds your wounds (+8 HP) and points you toward the Crypt of Green Shadows!" },
        choices: [
          { t: "Check the graveyard monument and prepare for Part 2!", to: 5 }
        ]
      },
      5: {
        zone: "Feycircle Graveyard",
        title: "The Heroes' Monument",
        text: "Foul worm-tracks burrow straight beneath the stone tomb of three ancient shadow-fey-blessed heroes.",
        choices: [
          { t: "Resupply and unlock Part 2: Crypt of Green Shadows!", to: 6 }
        ]
      },
      6: {
        zone: "Refugee Camp",
        title: "Grateful Survivors",
        text: "Feycircle's refugees cheer as Rennie, Linde, and Hana arrive safely.",
        choices: [
          { t: "Complete Part 1!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Feycircle Cleared of Goblins",
        text: "Shaman Sisskuss is defeated, yet a darker blight lurks beneath the graveyard! <strong>Feycircle II: Crypt of Green Shadows</strong> is now unlocked!",
        ending: { type: "true", title: "Liberator of Feycircle (Part I)", xp: 120, gold: 110, trophy: "Sisskuss's Ley-Bone Staff" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. CRYPT OF GREEN SHADOWS (7 PAGES • LV 4)
  // Feycircle & Qorgeth Trilogy (Part 2 of 3 • Prerequisite: bk_b6_eldritch_1_dust_goblins)
  // ==========================================================
  bk_b6_eldritch_2_green_shadows: {
    id: "bk_b6_eldritch_2_green_shadows",
    reqQuest: "bk_b6_eldritch_1_dust_goblins",
    title: "Feycircle II: Crypt of Green Shadows",
    subtitle: "Eldritch Lairs (Part 2 of 3) • Tomb of the Three Heroes",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Unlocks after Feycircle I: Pit of the Dust Goblins",
    summary: "Descend beneath Feycircle's Heroes' Monument to save the cornered shadow fey tomb-guards, purge Qorgeth's wormhearted cultists defiling the graves of Krythitas, Hassan, and Tymande, and open the secret passage to the Carrion Shrine.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Crypt of Green Shadows",
        title: "Defiled Sanctuary",
        safeRetreat: true,
        text: "Emerald shadow-torches flicker over the grand tomb of three ancient heroes—elven paladin Krythitas, wizard Hassan, and warlock Tymande Firestorm. Writhe-worms of Qorgeth chew through their sarcophagi, driving their spirits into fury while Shadow Fey defenders fight cornered in the far gallery!",
        choices: [
          { t: "Call out to the cornered Shadow Fey warriors and rally them against the worms!", badge: "Persuasion / Spirit DC 12", check: { stat: "spirit", skill: "Persuasion", dc: 12, pass: 2, fail: 2, passMsg: "The shadow fey honor your alliance and lend cover fire!", failMsg: "Suspicious of mortals, the fey stay behind their barricade." }, onPass: { cw: "FEY_ALLIES" } },
          { t: "Charge straight into the wormhearted defilers!", to: 2 }
        ]
      },
      2: {
        zone: "Hassan's Alcove",
        title: "Wormhearted Defilers",
        text: "Bloated undead cultists—Wormhearted Suffragans of Qorgeth—try to pry wizard Hassan's legendary spellbook from his stone fingers!",
        enemy: { name: "Qorgeth's Wormhearted Raiders", desc: "Necrotic worm-ridden cultists plundering the heroes' crypt.", hp: 40, ac: 13, atk: 6, dmg: 7, undead: true, xp: 105, gold: 50, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["FEY_ALLIES"] },
        choices: [
          { t: "Confront the enraged spirits of the Three Heroes and prove you came to cleanse their tomb!", to: 3 }
        ]
      },
      3: {
        zone: "Hall of the Three Heroes",
        title: "Wrath of Krythitas, Hassan & Tymande",
        text: "Blinded by agony from the invading worms, the spectral forms of Krythitas, Hassan, and Tymande surge up with emerald lightning—you must break the worm-curse gripping their sarcophagi!",
        enemy: { name: "Cursed Worm-Avatar of the Crypt", desc: "Writhing mass of Qorgeth's carrion worms puppeteering the tomb's wards.", hp: 46, ac: 14, atk: 7, dmg: 7, undead: true, xp: 145, gold: 85, items: ["bq_tymande_venom_dagger"], weakCw: ["FEY_ALLIES"] },
        choices: [
          { t: "Receive the calmed heroes' gratitude and uncover the hidden stair in Area 3!", to: 4 }
        ]
      },
      4: {
        zone: "Hall of the Three Heroes",
        title: "Blessing of the Fallen",
        text: "With the worms burned away, Hassan, Krythitas, and Tymande bow in solemn peace, sharpening your steel and pointing toward a foul tunnel burrowed beneath their altar: Petring is still alive inside the **Carrion Shrine of Qorgeth**!",
        onEnter: { healHp: 14, msg: "The Three Heroes bless your resolve (+14 HP)!" },
        choices: [
          { t: "Descend toward the Carrion Shrine in Part 3!", to: 5 }
        ]
      },
      5: {
        zone: "Twisting Worm-Passage",
        title: "Echoes of Decay",
        text: "Distant chanting rises from deep below—the Wormhearts are preparing a demonic summoning!",
        choices: [
          { t: "Prepare and unlock Part 3: Carrion Shrine of Qorgeth!", to: 6 }
        ]
      },
      6: {
        zone: "Crypt Threshold",
        title: "Part 2 Complete",
        text: "The Shadow Fey warriors vow to guard the surface tomb while you strike below.",
        choices: [
          { t: "Complete Part 2!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Defender of the Green Shadows",
        text: "The Three Heroes rest in peace once more! <strong>Feycircle III: Carrion Shrine of Qorgeth</strong> is now unlocked!",
        ending: { type: "true", title: "Champion of the Green Shadows (Part II)", xp: 185, gold: 165, trophy: "Emerald Seal of Hassan" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. CARRION SHRINE OF QORGETH (7 PAGES • LV 6)
  // Feycircle & Qorgeth Trilogy (Part 3 of 3 • Prerequisite: bk_b6_eldritch_2_green_shadows)
  // ==========================================================
  bk_b6_eldritch_3_qorgeth: {
    id: "bk_b6_eldritch_3_qorgeth",
    reqQuest: "bk_b6_eldritch_2_green_shadows",
    title: "Feycircle III: Carrion Shrine of Qorgeth",
    subtitle: "Eldritch Lairs (Part 3 of 3) • Petring & The Utterance of Decay",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Unlocks after Feycircle II: Crypt of Green Shadows",
    summary: "Descend into the foul Carrion Shrine of Qorgeth, Demon Lord of Worms, rescue guilt-ridden Petring and his fellow captives, and stop the Wormheart Suffragans from summoning a malakbel demon to speak the Utterance of Certain Decay.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Carrion Shrine Entrance",
        title: "Petring's Guilt",
        safeRetreat: true,
        text: "Chained at the threshold as bait stands Petring—the desperate villager who foolishly invoked Qorgeth hoping to protect his home. 'I've doomed us all!' he sobs. 'The Wormhearts are summoning a malakbel demon in the inner pit!'",
        choices: [
          { t: "Cut Petring free and urge him to fight beside you for his children's sake!", badge: "Persuasion / Spirit DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 2, fail: 2, passMsg: "Tears drying, Petring grabs a rusted mace and reveals the shrine's weak support pillar!", failMsg: "Petring stays behind to untie the weaker prisoners while you charge ahead." }, onPass: { cw: "PETRING_REDEEMED" } },
          { t: "Free the captive nobles Wristsnapper and Nevamira before pushing deeper!", to: 2, onChoose: { gold: 65, msg: "Freed the wealthy prisoners, who promise 65 GP reward!" } }
        ]
      },
      2: {
        zone: "Charnel Gallery",
        title: "Wormheart Suffragans",
        text: "Rotting robes boiling with pale maggots, Qorgeth's Wormheart Suffragans chant in chorus to block the central altar!",
        enemy: { name: "Wormheart Suffragans", desc: "Devoted undead priests of Qorgeth, Prince of Decay.", hp: 52, ac: 14, atk: 7, dmg: 8, undead: true, xp: 145, gold: 70, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["PETRING_REDEEMED"] },
        choices: [
          { t: "Storm the Summoning Pit before the Malakbel Demon speaks!", to: 3 }
        ]
      },
      3: {
        zone: "The Summoning Pit",
        title: "The Malakbel of Decay",
        text: "Rising from a rift of writhing shadow-worms hovers a terrifying six-winged Malakbel Demon, drawing breath to speak the Utterance of Certain Decay across Feycircle!",
        enemy: { name: "Malakbel of Certain Decay", desc: "Blazing corrupted demon summoned by Qorgeth's Wormhearts.", hp: 66, ac: 15, atk: 8, dmg: 9, xp: 215, gold: 145, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["PETRING_REDEEMED"] },
        choices: [
          { t: "Collapse the worm-altar and seal Qorgeth's shrine forever!", to: 4 }
        ]
      },
      4: {
        zone: "Feycircle Surface",
        title: "Life Returns to the Fairy Ring",
        text: "Fresh green grass sprouts instantly around the purified fairy ring as the dark blight lifts! Petring embraces Rennie and Linde in tearful relief.",
        onEnter: { healHp: 16, msg: "Feycircle is reborn (+16 HP)!" },
        choices: [
          { t: "Accept the villagers' pooled coin and heirlooms.", to: 5 }
        ]
      },
      5: {
        zone: "Rebuilt Village",
        title: "Gratitude of Feycircle",
        text: "Both villagers and rescued prisoners cheer your triumph over Qorgeth's cult.",
        choices: [
          { t: "Complete the Feycircle Trilogy!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Road",
        title: "Peace Restored",
        text: "The dead rest quiet and the living rebuild in peace.",
        choices: [
          { t: "Claim your trilogy finale reward!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Cleanser of Qorgeth's Shrine",
        text: "You broke the Demon Lord of Worms' grasp on Feycircle and saved an entire village from decay.",
        ending: { type: "true", title: "Bane of Qorgeth (Trilogy Complete)", xp: 255, gold: 250, trophy: "Purified Fairy-Ring Crown" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. UNDER THE DEVIL'S THUMB (7 PAGES • LV 5)
  // ==========================================================
  bk_b6_eldritch_4_devils_thumb: {
    id: "bk_b6_eldritch_4_devils_thumb",
    title: "Under the Devil's Thumb",
    subtitle: "Eldritch Lairs • Highgate Sewers, Sister Starkfeather & Lord Vermin",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Agents Spinel & Galena of Highgate (Oakhaven Market)",
    summary: "Enter the plague-shadowed white limestone city of Highgate on the River Nuria, navigate the deadly eight-year contest between Sister Starkfeather and roachling Lord Vermin's Umbers, and seize the Shroud of Tiberesh!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Highgate Aqueducts",
        title: "City of Fear",
        safeRetreat: true,
        text: "Gleaming white limestone walls hide a terrified city gripped by a mysterious wasting sickness. Ravenfolk devotees Spinel and Galena hire you to slip into the subterranean aqueducts beneath Highgate and recover the sacred Shroud of Tiberesh before roachling crime-lord Lord Vermin's Umbers claim it!",
        choices: [
          { t: "Follow the dry aqueduct bypass to skirt Lord Vermin's sewer traps.", badge: "Perception / Stealth DC 12", check: { stat: "agility", skill: "Stealth", dc: 12, pass: 2, fail: 2, failDmg: 5, passMsg: "You slip cleanly past the Umbers' tripwires!", failMsg: "A corroded sewer-snare bruises your ankle (-5 HP)!" }, onPass: { cw: "SEWER_BYPASS" } },
          { t: "Descend straight through the main limestone sluice-gate.", to: 2 }
        ]
      },
      2: {
        zone: "Subterranean Lairs",
        title: "The Umbers Ambush",
        text: "Chittering roachling rogues and corrupt city watchmen loyal to Lord Vermin drop from the sewer arches with poisoned blades!",
        enemy: { name: "Lord Vermin's Umbers", desc: "Subterranean roachling cutthroats serving the newest Exalted.", hp: 44, ac: 14, atk: 7, dmg: 7, xp: 120, gold: 60, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["SEWER_BYPASS"] },
        choices: [
          { t: "Enter the sunken crypt holding the Shroud of Tiberesh!", to: 3 }
        ]
      },
      3: {
        zone: "Vault of Tiberesh",
        title: "Lord Vermin's Champion",
        text: "Guarding the silver-woven Shroud of Tiberesh looms Lord Vermin's armored sewer-warden and plague-hounds! 'The eight-year contest belongs to Lord Vermin!' it hisses!",
        enemy: { name: "Umber Crypt-Warden", desc: "Elite roachling assassin guarding the Shroud of Tiberesh.", hp: 54, ac: 15, atk: 7, dmg: 8, xp: 170, gold: 115, items: ["bq_shroud_of_tiberesh"] },
        choices: [
          { t: "Claim the Shroud of Tiberesh and return to Spinel and Galena to save Etiryp!", to: 4 }
        ]
      },
      4: {
        zone: "Highgate Courtyard",
        title: "Balance of the Five Exalted",
        text: "Spinel and Galena bow deeply as you deliver the Shroud's cure—preserving Etiryp's life and gifting you a blessed replica cloak and a heavy purse!",
        choices: [
          { t: "Leave Highgate before Lord Vermin's assassins regroup.", to: 5 }
        ]
      },
      5: {
        zone: "Lotus Trail",
        title: "Desert Wind",
        text: "Behind you, the limestone towers of Highgate gleam above the River Nuria.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Market",
        title: "Southlands Intrigue",
        text: "You pocket your gold knowing the shadow war of Highgate is far from over.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Shadow-Walker of Highgate",
        text: "You outsmarted the Umbers beneath Highgate and won the Shroud of Tiberesh.",
        ending: { type: "true", title: "Victor Under the Devil's Thumb", xp: 215, gold: 205, trophy: "Limestone Seal of Highgate" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. THE LEYSTONE OF THE INDIGO STAR (7 PAGES • LV 7)
  // ==========================================================
  bk_b6_eldritch_5_indigo_star: {
    id: "bk_b6_eldritch_5_indigo_star",
    title: "The Leystone of the Indigo Star",
    subtitle: "Eldritch Lairs • Western Wastes & Void Dragon Ixaranum",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Finnius Kalarex, Agent of Bemmea (Oakhaven Guildhall)",
    summary: "Accept Bemmean agent Finnius Kalarex's ley-line chime, fend off the fanatical Sons of Vael Turog, journey into the blighted Western Wastes to disable the rogue Leystone, and confront the void dragon Ixaranum!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Bemmea Glass Gardens",
        title: "Ambush at the Teleportation Circle",
        safeRetreat: true,
        text: "Magocracy agent Finnius Kalarex hands you a humming ley-line chime to locate the runaway Leystone discovered by the late mage Askalan. Moments before you step into the teleportation circle, fanatics of the Sons of Vael Turog burst through the glass roof!",
        onEnter: { items: ["bq_indigo_star_chime"], msg: "Received the Bemmean Ley-Line Chime!" },
        enemy: { name: "Sons of Vael Turog", desc: "Arcane zealots seeking to seize the Leystone's power.", hp: 58, ac: 15, atk: 8, dmg: 9, xp: 170, gold: 80, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Activate the teleportation circle to the edge of the Western Wastes!", to: 2 }
        ]
      },
      2: {
        zone: "Western Wastes Ruins",
        title: "The Singing Leystone",
        text: "Across twisted violet glass dunes rises a humming monolith pulsing with deep indigo starlight—Askalan's notes reveal a living cosmic shard, the Indigo Star, is trapped inside!",
        choices: [
          { t: "Harmonize your Bemmean chime to calm the Leystone's defensive wards!", badge: "Arcana DC 14", check: { stat: "arcana", skill: "Arcana", dc: 14, pass: 3, fail: 3, failDmg: 7, passMsg: "The indigo wards part peacefully, weakening the void guardian ahead!", failMsg: "Arcane lightning jolts you (-7 HP) before the crystal unlocks!" }, onPass: { cw: "LEYSTONE_CALMED" } },
          { t: "Step straight into the starlit chamber!", to: 3 }
        ]
      },
      3: {
        zone: "Sanctum of the Indigo Star",
        title: "Ixaranum the Void Dragon",
        text: "Circling the glowing Indigo Star like a moth of living darkness, the young void dragon Ixaranum unleashes a shattering blast of cosmic gravity! 'The Star is my feast—begone, servants of Bemmea!'",
        enemy: { name: "Ixaranum, Young Void Dragon", desc: "Star-hungry void dragon claiming the empowered Leystone.", hp: 76, ac: 16, atk: 9, dmg: 11, xp: 265, gold: 185, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["LEYSTONE_CALMED"] },
        choices: [
          { t: "Set the sentient Indigo Star free into the safe cosmic wilds, disabling the runaway Leystone!", to: 4, onChoose: { cw: "STAR_FREED", healHp: 14, msg: "The Indigo Star pulses gratefully (+14 HP) before drifting safely away!" } },
          { t: "Seal the Indigo Star safely in a containment sphere for the Magocracy of Bemmea.", to: 4, onChoose: { gold: 100, msg: "Secured the Indigo Star for Bemmea's bonus bounty (+100 GP)!" } }
        ]
      },
      4: {
        zone: "Bemmea Glass Gardens",
        title: "Report to Finnius Kalarex",
        text: "Returning through the circle, you report the Leystone neutralized and Ixaranum defeated.",
        choices: [
          { t: "Collect the Magocracy's generous payment.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Road",
        title: "Quiet Ley Lines",
        text: "The ominous indigo glow fades from the western horizon.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Guildhall",
        title: "Arcane Acclaim",
        text: "Wizards of the guild study your notes on the Indigo Star with awe.",
        choices: [
          { t: "Finish the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Warden of the Indigo Star",
        text: "You ended the Western Wastes Leystone crisis and bested the void dragon Ixaranum.",
        ending: { type: "true", title: "Master of the Indigo Leystone", xp: 295, gold: 285, trophy: "Indigo Starlight Prism" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. PALACE OF THE WIND LORDS (7 PAGES • LV 8)
  // ==========================================================
  bk_b6_eldritch_6_wind_lords: {
    id: "bk_b6_eldritch_6_wind_lords",
    title: "Palace of the Wind Lords",
    subtitle: "Eldritch Lairs • Flying Sky Palace, Gnoll Archthieves & Djinni Leyla",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Baron Raúl Cazagoza of Capleon (Oakhaven Market)",
    summary: "Board the floating Sky Palace commandeered by gnoll archthief matriarch Odjanbago to recover Baron Cazagoza's prized ivory-white camel, aid crippled air-spirit gearforged Aechatta, and liberate the enslaved djinni Leyla!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Sky Palace Cloud-Dock",
        title: "Aboard the Flying City",
        safeRetreat: true,
        text: "Drifting high above the Seven Cities, the marble Palace of the Wind Lords has been seized by gnoll archthief Odjanbago! Hiding behind a broken column sits Aechatta—a crippled gearforged housing a trapped air spirit—who whispers where Odjanbago holds the enslaved djinni Leyla and Baron Cazagoza's white camel!",
        choices: [
          { t: "Promise Aechatta you'll use a wish to free his air spirit if you liberate Leyla!", to: 2, onChoose: { cw: "AECHATTA_PROMISE", msg: "Aechatta shares the secret breeze-vent straight into the throne gallery!" } },
          { t: "Charge boldly down the cloud-swept colonnade!", to: 2 }
        ]
      },
      2: {
        zone: "Gale Colonnade",
        title: "Gnoll Archthieves",
        text: "Cackling gnoll raiders draped in stolen Capleon silks block the marble stables where Baron Cazagoza's spotless ivory camel stands tethered!",
        enemy: { name: "Odjanbago's Gnoll Archthieves", desc: "Greedy sky-pirate gnolls serving out of fear and avarice.", hp: 64, ac: 15, atk: 8, dmg: 9, xp: 190, gold: 95, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["AECHATTA_PROMISE"] },
        choices: [
          { t: "Storm the Wind Throne Hall to confront Archthief Matriarch Odjanbago!", to: 3 }
        ]
      },
      3: {
        zone: "Hall of the Wind Throne",
        title: "Matriarch Odjanbago",
        text: "Lounging atop the floating palace's control throne with golden chains binding the weeping djinni Leyla, Archthief Matriarch Odjanbago snarls as hurricane gusts whirl around her!",
        enemy: { name: "Odjanbago, Gnoll Archthief Matriarch", desc: "Vicious gnoll warlord wielding stolen sky-palace wind magic.", hp: 82, ac: 16, atk: 10, dmg: 11, xp: 285, gold: 195, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["AECHATTA_PROMISE"] },
        choices: [
          { t: "Shatter Leyla's golden chains and ask her to free Aechatta's air spirit as well!", to: 4, onChoose: { items: ["bq_leyla_wind_ring"], healHp: 18, msg: "Stunned by your selflessness, Leyla emancipates Aechatta (+18 HP) and gifts Leyla's Freed-Djinni Band!" } }
        ]
      },
      4: {
        zone: "Sky Palace Cloud-Dock",
        title: "Flight of the Freed Spirits",
        text: "Aechatta's spirit erupts in joyous silver wind, soaring home to the Plane of Air as Leyla gently lowers you and the Baron's prized white camel safely back to Capleon!",
        choices: [
          { t: "Return the ivory camel to Baron Raúl Cazagoza!", to: 5 }
        ]
      },
      5: {
        zone: "Capleon Villa",
        title: "Baron Cazagoza's Bounty",
        text: "Overjoyed to see his beloved white camel unharmed, Baron Cazagoza pays out a princely reward.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Skies",
        title: "Ally of the Wind",
        text: "A gentle warm breeze follows your cloak—Leyla's year-and-a-day friendship.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Liberator of the Sky Palace",
        text: "Odjanbago's sky-raids are ended, and two ancient spirits of air fly free once more.",
        ending: { type: "true", title: "Champion of the Wind Lords", xp: 320, gold: 310, trophy: "Ivory Camel Medallion" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. THE UNDYING TOURNAMENT (7 PAGES • LV 9)
  // ==========================================================
  bk_b6_eldritch_7_undying_tourney: {
    id: "bk_b6_eldritch_7_undying_tourney",
    title: "The Undying Tournament",
    subtitle: "Eldritch Lairs • Gonderif Arena & The Corpse Tearer Legion",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Underworld Rescue Contract (Oakhaven Guildhall)",
    summary: "Infiltrate the brutal Corpse Tearer darakhul gladiator pits of Gonderif, ally with rebel captives Alejandra and mountain dwarf heir Khadamar, thwart treacherous gladiator Deskorma, and break out past the Masked Warden!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Gonderif Slave Pits",
        title: "Spellbinding Shackles",
        safeRetreat: true,
        text: "Beneath the bone-carved stands of Gonderif's Undying Tournament, nine defiant captives wear spellbinding shackles—including Zobeck ex-sergeant Alejandra and Ironcrag dwarf heir Khadamar, whose ruthless sister Deskorma plots his death in the sand!",
        choices: [
          { t: "Unlock Alejandra's and Khadamar's shackles and locate the secret pit escape hatch!", badge: "Lockpicking / Perception DC 14", check: { stat: "agility", skill: "Lockpicking", dc: 14, pass: 2, fail: 2, passMsg: "Freed both allies and spotted the hidden escape tunnel beneath the arena grate!", failMsg: "The arena horn blares before you can pry the grate!" }, onPass: { cw: "PIT_ALLIES" } },
          { t: "Step out onto the bloody sands to incite a duel among the proud Corpse Tearer guards!", to: 2 }
        ]
      },
      2: {
        zone: "The Undying Arena",
        title: "Deskorma & The Corpse Tearers",
        text: "Roaring mithral-armored darakhul legionaries cheer as power-hungry gladiator Deskorma and Corpse Tearer champions rush across the sand!",
        enemy: { name: "Deskorma & Corpse Tearer Champions", desc: "Treacherous dwarf gladiator and mithral-clad darakhul duelists.", hp: 76, ac: 17, atk: 10, dmg: 11, undead: true, xp: 245, gold: 120, items: ["bq_gonderif_mithral_mail"], flee: 1, weakCw: ["PIT_ALLIES"] },
        choices: [
          { t: "Lead the slave rebellion straight through the Duke's gate against the Masked Warden!", to: 3 }
        ]
      },
      3: {
        zone: "Arena Gatehouse",
        title: "The Masked Warden",
        text: "Blocking the hidden mine-lift out of Gonderif stands the towering Masked Warden and the darakhul duke's elite bodyguard! 'No meat leaves the Undying Tournament alive!'",
        enemy: { name: "The Masked Warden of Gonderif", desc: "Merciless darakhul arena-master wielding bone-cleaving steel.", hp: 92, ac: 17, atk: 11, dmg: 12, undead: true, xp: 325, gold: 215, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["PIT_ALLIES"] },
        choices: [
          { t: "Escape through the secret pit tunnel with Alejandra and Khadamar!", to: 4 }
        ]
      },
      4: {
        zone: "Ironcrag Surface Exit",
        title: "Daylight at Last",
        text: "Emerging into crisp mountain air, grandmother-mage Alejandra weeps to see the sky again while Khadamar pledges the Ironcrag canton's eternal friendship!",
        onEnter: { healHp: 18, msg: "Alejandra casts a restorative ward (+18 HP) as you reach safety!" },
        choices: [
          { t: "Escort the freed rebels home to Zobeck and the Ironcrags.", to: 5 }
        ]
      },
      5: {
        zone: "Ironcrag Canton",
        title: "Heir Restored",
        text: "Khadamar's clan pays a royal ransom in dwarven gold for delivering their rightful heir.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Guildhall",
        title: "Champions of Freedom",
        text: "The tale of the Gonderif Arena breakout inspires every sellsword in the hall.",
        choices: [
          { t: "Finish the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Breaker of the Undying Tournament",
        text: "You shattered the Masked Warden's grip and led Gonderif's bravest captives back to the sun.",
        ending: { type: "true", title: "Champion of the Undying Arena", xp: 365, gold: 350, trophy: "Broken Spellbinding Shackle" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. THE FROZEN CASTLE (7 PAGES • LV 10)
  // ==========================================================
  bk_b6_frozen_castle: {
    id: "bk_b6_frozen_castle",
    title: "The Frozen Castle",
    subtitle: "Tyranny of Dragons • Crashed Skyreach Castle on Miklos Glacier",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Council of Waterdeep Envoy (Oakhaven Guildhall)",
    summary: "Race across the howling Miklos Glacier to the crashed flying fortress of Skyreach Castle, win the alliance of cloud giant Blagothkus and ice lord Brunvild, and repel the Cult of the Dragon and white dragon Glazhael!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Miklos Glacier",
        title: "Wreck of Skyreach Castle",
        safeRetreat: true,
        text: "Half-buried in glacial crevasses lies the fallen flying fortress of Skyreach Castle, its cloudstuff vaults still holding Tiamat's stolen hoard! Cloud giant master Blagothkus and his cousin Brunvild, ice lord of Uldoveld, eye you warily as dragon-cult banners appear on the ridge.",
        choices: [
          { t: "Parley honorably with Blagothkus and Brunvild to forge an alliance against the Dragon Cult!", badge: "Persuasion / Spirit DC 15", check: { stat: "spirit", skill: "Persuasion", dc: 15, pass: 2, fail: 2, passMsg: "Impressed by your resolve, Blagothkus pledges his giants to hold the outer walls!", failMsg: "The proud giants demand proof of your steel first." }, onPass: { cw: "GIANT_ALLIES" } },
          { t: "Enter the cracked frost-vaults immediately to secure the steering tower.", to: 2 }
        ]
      },
      2: {
        zone: "Skyreach Outer Bailey",
        title: "Orc Raiders & Cult Vanguard",
        text: "Howling mountain orcs and frost-cloaked Cult of the Dragon fanatics swarm over the tilted battlements!",
        enemy: { name: "Dragon Cult & Glacier Orcs", desc: "Rival warbands racing to plunder crashed Skyreach Castle.", hp: 82, ac: 16, atk: 11, dmg: 11, xp: 250, gold: 120, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["GIANT_ALLIES"] },
        choices: [
          { t: "Hold the Cloud-Steering Tower as white wings blot out the blizzard!", to: 3 }
        ]
      },
      3: {
        zone: "Skyreach Upper Keep",
        title: "Glazhael the Cloudchaser",
        text: "Diving through the howling sleet onto the frost-rimed courtyard crashes Glazhael—the ferocious Adult White Dragon leading the Cult of the Dragon's aerial assault!",
        enemy: { name: "Glazhael, Adult White Dragon", desc: "Savage frost-breathing dragon determined to reclaim Tiamat's hoard.", hp: 108, ac: 17, atk: 12, dmg: 14, xp: 385, gold: 270, items: ["bq_skyreach_frost_greatsword"], weakCw: ["GIANT_ALLIES"] },
        choices: [
          { t: "Help Blagothkus awaken the castle's spirit and lift Skyreach back into the clouds!", to: 4 }
        ]
      },
      4: {
        zone: "Cloudstuff Vaults",
        title: "Tiamat's Hoard Reclaimed",
        text: "With Glazhael slain and the cult routed, Blagothkus shares a king's ransom of recovered northern gold for the Council of Waterdeep!",
        onEnter: { healHp: 20, gold: 150, msg: "Skyreach Castle is secured (+20 HP, +150 GP recovered hoard)!" },
        choices: [
          { t: "Descend the glacier with the Council's treasure.", to: 5 }
        ]
      },
      5: {
        zone: "Northern Outpost",
        title: "Council's Commendation",
        text: "Envoys salute your vital blow against the Cult of the Dragon.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Guildhall",
        title: "Dragonslayer's Acclaim",
        text: "Songs of the Frozen Castle echo across the frontier.",
        choices: [
          { t: "Complete the adventure!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Victor of the Frozen Castle",
        text: "Skyreach Castle is denied to the Cult of the Dragon, and Glazhael falls beneath your blade.",
        ending: { type: "true", title: "Conqueror of Skyreach Glacier", xp: 430, gold: 410, trophy: "Glazhael's Frozen Fang" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. GRIMALKIN I: THE BEAUTIFUL GNOLL (7 PAGES • LV 3)
  // Grimalkin Trilogy (Part 1 of 3 — Sequel to Cat and Mouse)
  // ==========================================================
  bk_b6_grimalkin_1: {
    id: "bk_b6_grimalkin_1",
    title: "Grimalkin I: The Beautiful Gnoll",
    subtitle: "Grimalkin Trilogy (Part 1 of 3) • Princess Karima & The Mortuary",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Salon Invitation from 'Princess' Karima Gamila (Oakhaven Market)",
    summary: "Return to Per-Bastet at the invitation of cunning gnoll salon-hostess 'Princess' Karima Gamila, investigate the dead Scholar pulled from the River of Sand, and track down werecrocodile Abdul-Haqq's spy Sweet Hasna!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Per-Bastet • Karima's Salon",
        title: "The Beautiful Gnoll",
        safeRetreat: true,
        text: "After the Grimalkin Eye surfaced in Per-Bastet, brilliant gnoll socialite 'Princess' Karima Gamila deduced there must also be a Grimalkin Body! She hires you to inspect a drowned Scholar's corpse at the charnel house—before her bitter enemy, werecrocodile thief-lord Abdul-Haqq, steals the clues!",
        choices: [
          { t: "Examine the Scholar's pockets carefully at the Per-Bastet Mortuary.", badge: "Perception DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, passMsg: "Invisible footprints! Abdul-Haqq's agent Sweet Hasna just slipped out with the Calling Cat and half a rhyming map!", failMsg: "The mortuary reeks of myrrh—you spot fresh scuffle marks toward the alley!" }, onPass: { cw: "HASNA_TRACKED" } },
          { t: "Question the frightened mortuary attendants immediately.", to: 2 }
        ]
      },
      2: {
        zone: "Charnel House Alley",
        title: "Sweet Hasna & The Dogs of Per-Bastet",
        text: "Cornered beneath striped spice-awnings, Abdul-Haqq's jealous henchwoman Sweet Hasna clutches the eerie Calling Cat pendant around her neck while Dogs of Per-Bastet thugs draw curved blades!",
        enemy: { name: "Sweet Hasna & Thieves' Guild Dogs", desc: "Jealous spy and cutthroats of the Dogs of Per-Bastet.", hp: 32, ac: 12, atk: 5, dmg: 6, xp: 85, gold: 45, items: ["bq_calling_cat_charm"], weakCw: ["HASNA_TRACKED"] },
        choices: [
          { t: "Claim Part One of the ancient rhyming map and the Calling Cat!", to: 3 }
        ]
      },
      3: {
        zone: "Per-Bastet Rooftops",
        title: "Watched From Every Shadow",
        text: "As you study the first half of the rhyme ('Walk one hundred and twenty karams from the Way of Bastet bridge...'), Abdul-Haqq's imp spy Sharbit flutters away into the dusk—and eerie undead footsteps echo from the River of Sand!",
        choices: [
          { t: "Prepare for Part 2: The Plot Thickens!", to: 4 }
        ]
      },
      4: {
        zone: "Spice-Market Inn",
        title: "Karima's Cipher",
        text: "Princess Karima smiles knowingly over spiced tea: 'Now three factions hunt us—my rivals, the Dogs, and whatever guards the Growling Sanctuary!'",
        onEnter: { healHp: 8, msg: "Rested at Karima's salon (+8 HP)." },
        choices: [
          { t: "Advance to Part 2!", to: 5 }
        ]
      },
      5: {
        zone: "District of the Cat",
        title: "Half a Riddle",
        text: "Only finding the second half of the rhyme will reveal the buried sanctuary.",
        choices: [
          { t: "Unlock Grimalkin II!", to: 6 }
        ]
      },
      6: {
        zone: "Per-Bastet Twilight",
        title: "Part 1 Complete",
        text: "The Calling Cat hums faintly against your chest.",
        choices: [
          { t: "Complete Part 1!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Caught in the Caper",
        text: "You seized the Calling Cat and the first half of the map! <strong>Grimalkin II: The Plot Thickens</strong> is now unlocked!",
        ending: { type: "true", title: "Investigator of Per-Bastet (Grimalkin I)", xp: 135, gold: 120, trophy: "Scholar's First Rhyme-Scroll" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. GRIMALKIN II: THE PLOT THICKENS (7 PAGES • LV 4)
  // Grimalkin Trilogy (Part 2 of 3 • Prerequisite: bk_b6_grimalkin_1)
  // ==========================================================
  bk_b6_grimalkin_2: {
    id: "bk_b6_grimalkin_2",
    reqQuest: "bk_b6_grimalkin_1",
    title: "Grimalkin II: The Plot Thickens",
    subtitle: "Grimalkin Trilogy (Part 2 of 3) • Abdul-Haqq & Sanctuary Undead",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Unlocks after Grimalkin I: The Beautiful Gnoll",
    summary: "Survive a three-way showdown in Per-Bastet as undead hunters pursue the Calling Cat and werecrocodile crime-lord Abdul-Haqq ambushes you from his wind-chime den—then unite both halves of the rhyming map!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Per-Bastet Night Bazaar",
        title: "Hunters of the Calling Cat",
        safeRetreat: true,
        text: "Drawn straight to the Calling Cat pendant, bandaged feline-masked undead emerge from the dry sand-waves of the River of Sand to punish anyone meddling with the Growling Sanctuary!",
        enemy: { name: "Sanctuary Sand-Undead", desc: "Mummified guardians tracking the Calling Cat charm.", hp: 38, ac: 13, atk: 6, dmg: 6, undead: true, xp: 100, gold: 45, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Track imp spy Sharbit straight to Abdul-Haqq's wind-chime lair!", to: 2 }
        ]
      },
      2: {
        zone: "Abdul-Haqq's Chime-Den",
        title: "The Jealous Werecrocodile",
        text: "Beneath dozens of chiming gold-and-obsidian wind chimes, massive gnoll-werecrocodile Abdul-Haqq lunges out from silk cushions beside a cobalt pitcher and warm crocodile eggs! 'Karima's pets will make a fine supper!'",
        enemy: { name: "Abdul-Haqq & Imp Sharbit", desc: "Cunning gnoll/werecrocodile Dogs-guild boss and his imp spy.", hp: 46, ac: 14, atk: 7, dmg: 7, xp: 150, gold: 95, items: rollRandomLoot(["weapon", "accessory"], 1, "rare") },
        choices: [
          { t: "Seize Part Two of the rhyming text and raid the gold-bound wind chimes!", to: 3, onChoose: { gold: 80, cw: "FULL_RHYME", msg: "United BOTH halves of the rhyme and claimed 80 GP in Per-Bastet curios!" } }
        ]
      },
      3: {
        zone: "Way of Bastet Bridge",
        title: "Measuring the Sand River",
        text: "With both verses combined, the exact coordinates snap into focus: 303 feet northwest upstream of the Way of Bastet bridge, and 46 feet straight down beneath the undulating River of Sand!",
        choices: [
          { t: "Buy stout rope and an iron fixing-stake for the dive into the sand!", to: 4 }
        ]
      },
      4: {
        zone: "Sand-River Bank",
        title: "Ready for the Plunge",
        text: "Princess Karima nods with glittering eyes as you knot the rope around your stake.",
        onEnter: { healHp: 12, msg: "Prepared gear and rested (+12 HP) before the dive!" },
        choices: [
          { t: "Unlock Part 3: The Growling Sanctuary!", to: 5 }
        ]
      },
      5: {
        zone: "Bridge of Bastet",
        title: "Part 2 Complete",
        text: "The hidden entrance waits beneath forty-six feet of flowing dry sand.",
        choices: [
          { t: "Advance to Part 3!", to: 6 }
        ]
      },
      6: {
        zone: "Riverbank Stake",
        title: "Ties Checked",
        text: "Everything is ready for the final chapter.",
        choices: [
          { t: "Complete Part 2!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Riddle Unlocked",
        text: "Abdul-Haqq is beaten and the secret of the Growling Sanctuary is yours! <strong>Grimalkin III: The Growling Sanctuary</strong> is now unlocked!",
        ending: { type: "true", title: "Rival of the Dogs (Grimalkin II)", xp: 185, gold: 170, trophy: "Gold-Inlaid Obsidian Chimes" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. GRIMALKIN III: THE GROWLING SANCTUARY (7 PAGES • LV 5)
  // Grimalkin Trilogy (Part 3 of 3 • Prerequisite: bk_b6_grimalkin_2)
  // ==========================================================
  bk_b6_grimalkin_3: {
    id: "bk_b6_grimalkin_3",
    reqQuest: "bk_b6_grimalkin_2",
    title: "Grimalkin III: The Growling Sanctuary",
    subtitle: "Grimalkin Trilogy (Part 3 of 3) • Beneath the River of Sand",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Unlocks after Grimalkin II: The Plot Thickens",
    summary: "Dive forty-six feet down through the dry waves of the River of Sand into the ancient Growling Sanctuary, defeat its spectral feline guardians, and claim the legendary Grimalkin Idol!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Under the River of Sand",
        title: "The Eye Entrance",
        safeRetreat: true,
        text: "Holding your breath as dry sand surges like water around your cloak, you haul yourself hand-over-hand down the knotted rope forty-six feet until your boots strike a carved stone eye-portal—the Growling Sanctuary!",
        choices: [
          { t: "Hold steady against the sand-current and slip through the stone iris!", badge: "Athletics / Might DC 12", check: { stat: "might", skill: "Athletics", dc: 12, pass: 2, fail: 2, failDmg: 5, passMsg: "You tumble cleanly onto the dry sandstone floor inside!", failMsg: "Crushing sand scrapes your lungs (-5 HP) before you push through!" } },
          { t: "Invoke Bastet's prayer from the rhyme as you enter!", badge: "Spirit DC 12", check: { stat: "spirit", skill: "Lore", dc: 12, pass: 2, fail: 2, passMsg: "The dry sand parts gently—blessing your entry!", failMsg: "The ancient temple stays silent." }, onPass: { cw: "BASTET_RHYME" } }
        ]
      },
      2: {
        zone: "Hall of Great Cats",
        title: "Spectral Lions & Sand-Mummies",
        text: "Carved basalt statues of lions and leopards shimmer with amber fire—leaping down as spectral feline guardians to protect the bloated idol at the sanctum's heart!",
        enemy: { name: "Growling Sanctuary Guardians", desc: "Ancient spectral lions and mummified cat-priests.", hp: 50, ac: 14, atk: 7, dmg: 8, undead: true, xp: 150, gold: 80, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["BASTET_RHYME"] },
        choices: [
          { t: "Enter the Vault of the Empty Socket!", to: 3 }
        ]
      },
      3: {
        zone: "Sanctum of the Grimalkin",
        title: "The Grimalkin Idol",
        text: "Upon a sandstone pedestal sits the uncanny **Grimalkin Idol**—a bloated smug-faced cat statue with a single empty, blood-stained eye socket! Rising in golden fury to defend the artifact is the High Keeper of the Sanctuary!",
        enemy: { name: "High Keeper of the Growling Sanctuary", desc: "Feline-masked immortal guardian of the Grimalkin Idol.", hp: 58, ac: 15, atk: 8, dmg: 8, undead: true, xp: 185, gold: 130, items: ["bq_grimalkin_idol"], weakCw: ["BASTET_RHYME"] },
        choices: [
          { t: "Secure the Grimalkin Idol and ascend the sand-shaft back to daylight!", to: 4 }
        ]
      },
      4: {
        zone: "Per-Bastet Riverbank",
        title: "Karima's Applause",
        text: "Spitting desert sand onto the embankment, you emerge triumphant with the legendary Grimalkin Idol! Princess Karima bows gracefully, paying a kingly finder's fee for letting her study its lore.",
        choices: [
          { t: "Celebrate the completion of the Grimalkin Trilogy!", to: 5 }
        ]
      },
      5: {
        zone: "Grand Bazaar of Per-Bastet",
        title: "Master of the Cat City",
        text: "From the Perfume District to the River of Sand, whispers of your legendary dive earn awe.",
        choices: [
          { t: "Sail north back to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Tavern",
        title: "Sand Still in Your Boots",
        text: "Even Oakhaven's tavern cats line up solemnly to purr at your feet.",
        choices: [
          { t: "Complete the Grimalkin Trilogy!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Master of the Growling Sanctuary",
        text: "You solved the ancient rhyme, braved the River of Sand, and claimed the mythic Grimalkin Idol.",
        ending: { type: "true", title: "Conqueror of the Growling Sanctuary", xp: 230, gold: 225, trophy: "Amber Fang of Bastet" },
        choices: []
      }
    }
  }
});
