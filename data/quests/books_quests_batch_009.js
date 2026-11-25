/* ============================================================
   BOOK QUESTS — BATCH 009 (12 Quests)
   Sources:
   - Prepared! A Dozen Adventures (Adventures 8–12 — Complete!)
   - Tome of Beasts 2 Lairs (Lairs 1–7 of 14)
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. A BAD NIGHT FOR BETTING (6 PAGES • LV 8)
  // Prepared! #8
  // ==========================================================
  bk_b9_prep_7_betting: {
    id: "bk_b9_prep_7_betting",
    title: "A Bad Night for Betting",
    subtitle: "Prepared! • Bleak Rock & Alchemically Maddened Dogmoles",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: true,
    discoverySource: "Pit-Master of Bleak Rock (Rusty Flagon Tavern)",
    summary: "When an unscrupulous alchemist spikes the fighting dogmoles in frontier village Bleak Rock with a mutagenic rage-brew, contain the burrowing beasts and stop their panicked handlers before the town is torn apart!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Bleak Rock • Fighting Pit",
        title: "Mutagenic Mayhem",
        safeRetreat: true,
        text: "At Bleak Rock's rowdy dogmole pit, the stout Granitehold beasts suddenly swell with glowing green veins and burst straight through the timber barrier into the screaming crowd!",
        enemy: { name: "Enraged Giant Dogmoles", desc: "Alchemically supercharged burrowing beasts tearing through Bleak Rock.", hp: 66, ac: 15, atk: 9, dmg: 10, xp: 195, gold: 80, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Corner the shady alchemist and furious pit-owners in the back alley!", to: 2 }
        ]
      },
      2: {
        zone: "Bleak Rock Alley",
        title: "The Shady Peddler",
        text: "Backed by hired Granitehold bruisers and a massive Alpha Dogmole foaming with crimson alchemy, the unscrupulous peddler hurls explosive vials to cover his escape!",
        enemy: { name: "Alpha Dogmole & Alchemist's Bruisers", desc: "Mutated burrowing juggernaut and desperate pit-handlers.", hp: 82, ac: 16, atk: 10, dmg: 11, xp: 280, gold: 185, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Smash the remaining rage-vials and calm the surviving pups!", to: 3 }
        ]
      },
      3: {
        zone: "Bleak Rock Square",
        title: "Order Restored",
        text: "Townsfolk emerge from their cellars cheering as the frantic burrowing stops and the peddler is clapped in irons.",
        choices: [
          { t: "Accept Bleak Rock's gratitude and gold.", to: 4 }
        ]
      },
      4: {
        zone: "Granitehold Trade Road",
        title: "Dwarven Respect",
        text: "Dwarven metal-traders passing through toast your steady hand.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Rusty Flagon Tavern",
        title: "No More Betting",
        text: "You pocket your winnings—the honest way.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Savior of Bleak Rock",
        text: "Bleak Rock sleeps soundly, safe from alchemical mayhem.",
        ending: { type: "true", title: "Tamer of Bleak Rock", xp: 315, gold: 295, trophy: "Granitehold Pit-Bell" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. THE BURNING CRATER (6 PAGES • LV 9)
  // Prepared! #9
  // ==========================================================
  bk_b9_prep_8_burning_crater: {
    id: "bk_b9_prep_8_burning_crater",
    title: "The Burning Crater",
    subtitle: "Prepared! • Fire-Giant Hellshot & Toxic Brazier",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: true,
    discoverySource: "Eastern Pass Outpost Scouts (Oakhaven Outskirts)",
    summary: "Investigate a smoking impact crater an hour from the border outpost where fire giants are test-firing arcane 'hellshot' spheres packed with hell hounds and a toxic gas brazier!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Rim of the Burning Crater",
        title: "Choking Smoke & Metal Shards",
        safeRetreat: true,
        text: "A twenty-foot-deep smoking crater scars the pine woods, jagged fire-giant iron embedded in its blackened walls. At the center, an intricate brass brazier vents blinding poison fog while a pack of snarling Hell Hounds leaps out of the cracked sphere!",
        enemy: { name: "Hellshot Hell Hounds", desc: "Blazing infernal hounds fired inside a fire-giant arcane cannonball.", hp: 74, ac: 16, atk: 10, dmg: 11, xp: 230, gold: 105, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Examine and disarm the fire-giant gas brazier before descending the freshly bored tunnel!", badge: "Lockpicking / Arcana DC 15", check: { stat: "agility", skill: "Lockpicking", dc: 15, pass: 2, fail: 2, failDmg: 8, passMsg: "The vents click shut cleanly—clearing the choking toxic fog!", failMsg: "Searing gas burns your lungs (-8 HP) before you smash the valve!" }, onPass: { cw: "GAS_CLEARED" } }
        ]
      },
      2: {
        zone: "Crater Tunnel",
        title: "Fire-Giant Forward Spotter",
        text: "Down the freshly bored cavern waits a scouting Fire-Giant Artillerist and fiery salamander sappers recording the hellshot's impact!",
        enemy: { name: "Fire-Giant Artillerist & Sappers", desc: "Brutal giant siege-engineer testing weapons for war.", hp: 92, ac: 17, atk: 11, dmg: 12, xp: 325, gold: 215, items: ["bq_hellshot_shard_plate"], weakCw: ["GAS_CLEARED"] },
        choices: [
          { t: "Destroy the giant's range-finding lenses and bring the intel to the outpost!", to: 3 }
        ]
      },
      3: {
        zone: "Eastern Pass Outpost",
        title: "War Plot Exposed",
        text: "Garrison commanders pale at the hellshot shrapnel—thanks to your swift raid, the border forts can prepare defenses before the fire giants march!",
        choices: [
          { t: "Accept the kingdom's war-chest reward.", to: 4 }
        ]
      },
      4: {
        zone: "Border Road",
        title: "Clear Skies",
        text: "The night sky remains quiet over the eastern woods.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Forge",
        title: "Giant-Forged Iron",
        text: "Your newly tempered Fire-Giant Hellshot Cuirass radiates comforting warmth.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Breaker of the Hellshot",
        text: "You neutralized the Burning Crater and thwarted the fire giants' terror weapon.",
        ending: { type: "true", title: "Bane of the Burning Crater", xp: 365, gold: 350, trophy: "Quenched Hellshot Core" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. ATOP THE MOUNTAIN (6 PAGES • LV 10)
  // Prepared! #10
  // ==========================================================
  bk_b9_prep_9_atop_mountain: {
    id: "bk_b9_prep_9_atop_mountain",
    title: "Atop the Mountain",
    subtitle: "Prepared! • Fountain of the Planetar & Infernal Ritual",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: true,
    discoverySource: "High Clerics of the Dawn (Temple of the Dawn)",
    summary: "Climb the sacred summit to the Fountain of the Planetar where spined devils, bearded devils, and a Chain Devil are fouling the holy basin to corrupt an awakening celestial guardian!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Mountaintop Clearing",
        title: "The Darkening Basin",
        safeRetreat: true,
        text: "At the highest point of the peak stands the circular stone Fountain of the Planetar with a radiant throne-pedestal at its heart. Cavorting in the darkening water are four spined devils and two bearded devils shielding a chanting Chain Devil!",
        enemy: { name: "Spined & Bearded Devil Guard", desc: "Infernal vanguard blocking the Fountain of the Planetar.", hp: 82, ac: 16, atk: 11, dmg: 11, xp: 255, gold: 120, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Leap straight into the fountain basin to halt the Chain Devil's corruption!", to: 2 }
        ]
      },
      2: {
        zone: "Fountain of the Planetar",
        title: "The Chain Devil's Rite",
        text: "Animated barbed iron chains lash out across the circular flagstones as the Chain Devil sneers: 'Let heaven's own fountain drown in hellfire!'",
        enemy: { name: "Infernal Chain Devil", desc: "Sadistic fiend commanding animated barbed chains.", hp: 104, ac: 17, atk: 12, dmg: 13, xp: 375, gold: 255, items: ["bq_planetar_fountain_chalice"] },
        choices: [
          { t: "Invoke a prayer of restoration to cleanse the brackish waters of the Fountain!", badge: "Spirit DC 15", check: { stat: "spirit", skill: "Lore", dc: 15, pass: 3, fail: 3, passMsg: "Pure golden light surges through the basin—granting the Planetar's celestial boon (+20 HP)!", failMsg: "The ritual is broken, and the mountain rains slowly wash the stone clean." }, onPass: { healHp: 20, cw: "PLANETAR_BOON" } }
        ]
      },
      3: {
        zone: "Summit Overlook",
        title: "Celestial Peace",
        text: "A radiant warmth settles over the peak as the celestial spirit rests undisturbed once more.",
        choices: [
          { t: "Descend to report to the Temple of the Dawn.", to: 4 }
        ]
      },
      4: {
        zone: "Temple of the Dawn",
        title: "Sacred Gratitude",
        text: "The temple clergy honor your courage with consecrated gold and hymns.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Square",
        title: "Radiant Renown",
        text: "Pilgrims whisper of the champion who drove devils from the mountain's crown.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Defender of the Planetar's Fountain",
        text: "The infernal ritual is shattered and the sacred summit shines pure.",
        ending: { type: "true", title: "Purifier of the Summit Fountain", xp: 420, gold: 405, trophy: "Golden Feather of the Planetar" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. UNDER REVELERS' FEET (6 PAGES • LV 12)
  // Prepared! #11
  // ==========================================================
  bk_b9_prep_10_revelers_feet: {
    id: "bk_b9_prep_10_revelers_feet",
    title: "Under Revelers' Feet",
    subtitle: "Prepared! • The Haunted Cellar & Bone Collective",
    difficulty: "Deadly",
    recommendedLevel: 12,
    autoDiscover: true,
    discoverySource: "Palace Steward (Oakhaven Guildhall)",
    summary: "While a grand royal banquet dances overhead, descend into the refuse-choked sub-cellars beneath the hall to lay to rest a chittering Bone Collective and its rising wights—and uncover an unsettling secret about the queen's victory!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Palace Sub-Cellar",
        title: "Teetering Piles of Refuse",
        safeRetreat: true,
        text: "Muffled harp music drifts down through the stone arches as you wade between teetering mounds of cellar garbage! Skeletal hands burst from the refuse—Wights of forgotten rebels rising to drag you down!",
        enemy: { name: "Cellar Rebel Wights", desc: "Bitter undead soldiers entombed beneath the banquet hall.", hp: 94, ac: 17, atk: 12, dmg: 13, undead: true, xp: 320, gold: 155, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Confront the rattling hivemind of tiny skeletons—the Bone Collective!", to: 2 }
        ]
      },
      2: {
        zone: "Vault of Forgotten Rebels",
        title: "The Bone Collective",
        text: "Swarming together into a whispering, multi-limbed horror of fused rebel bones, the Bone Collective hisses a chilling truth about the queen's brutal purge while summoning fresh wights!",
        enemy: { name: "The Rebel Bone Collective", desc: "Unsettling hivemind swarm of vengeful skeletal fragments.", hp: 122, ac: 18, atk: 13, dmg: 15, undead: true, xp: 460, gold: 320, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Lay the restless bones to final peace and ascend back to the banquet!", to: 3 }
        ]
      },
      3: {
        zone: "Banquet Antechamber",
        title: "Music Uninterrupted",
        text: "The royal steward breathes a profound sigh of relief and slips you a heavy velvet purse—though the Bone Collective's whispered secrets linger in your mind.",
        choices: [
          { t: "Depart the palace quietly.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Road",
        title: "Echoes Below",
        text: "The haunting of the grand hall is ended at last.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Rusty Flagon Tavern",
        title: "Quiet Night",
        text: "You drink deep, grateful for honest tavern floorboards.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Silencer of the Sub-Cellar",
        text: "You ended the haunting under the revelers' feet without a single guest coming to harm.",
        ending: { type: "true", title: "Vanquisher of the Bone Collective", xp: 515, gold: 485, trophy: "Royal Banquet Silver Seal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. THE OBSIDIAN PASS (6 PAGES • LV 14)
  // Prepared! #12 (Completes Prepared! 100%!)
  // ==========================================================
  bk_b9_prep_11_obsidian_pass: {
    id: "bk_b9_prep_11_obsidian_pass",
    title: "The Obsidian Pass",
    subtitle: "Prepared! • The Sacred Grove's Mirror & Aberration Siege",
    difficulty: "Deadly",
    recommendedLevel: 14,
    autoDiscover: true,
    discoverySource: "Elders of the Sacred Grove (Oakhaven Outskirts)",
    summary: "Stand fast in the black-rock gorge of Obsidian Pass to protect an ancient woodland mirror from a once-trusted archmage corrupted by its power—and the terrifying planar aberration marching on the sacred tree!",
    totalPages: 6,
    pages: {
      1: {
        zone: "The Obsidian Pass",
        title: "A Friend Turned Covetous",
        safeRetreat: true,
        text: "Black glass cliffs funnel the trail toward the elders' sacred tree and the ancient mirror they have guarded for an era. Marching up the gorge come armored soldiers loyal to the fallen archmage who once warded this very grove!",
        enemy: { name: "Mirror-Sworn Vanguard", desc: "Enchanted elite soldiers sent to seize the grove's mirror.", hp: 108, ac: 18, atk: 13, dmg: 14, xp: 380, gold: 185, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Hold the narrow glass bridge against her summoned planar Aberration!", to: 2 }
        ]
      },
      2: {
        zone: "Threshold of the Sacred Tree",
        title: "The Mirror-Seeker's Aberration",
        text: "Warping the black obsidian cliffs into rippling reflections, a titanic, many-eyed Planar Aberration surges toward the ancient mirror at the tree's roots!",
        enemy: { name: "Planar Mirror-Aberration", desc: "Nightmarish cosmic horror unleashed to shatter the grove's defenses.", hp: 138, ac: 19, atk: 14, dmg: 16, xp: 560, gold: 390, items: ["bq_obsidian_grove_mirror"] },
        choices: [
          { t: "Turn the Ward-Glass against the aberration and seal the Obsidian Pass!", to: 3 }
        ]
      },
      3: {
        zone: "The Sacred Grove",
        title: "The Mirror Kept Safe",
        text: "The aberration dissolves in shards of harmless light. Grateful druids weave fresh wards around the ancient tree and bless you with rare woodland treasure.",
        onEnter: { healHp: 25, msg: "The Grove Elders restore your vigor (+25 HP)!" },
        choices: [
          { t: "Depart the Obsidian Pass in triumph.", to: 4 }
        ]
      },
      4: {
        zone: "Highland Trail",
        title: "Prepared! Conquered",
        text: "From Dib's wagon fortress to the Obsidian Pass, every challenge has bowed to your blade.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Guildhall",
        title: "Mythic Defender",
        text: "Champions gather to admire your shimmering Ward-Glass of Obsidian Pass.",
        choices: [
          { t: "Complete the adventure!", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Guardian of Obsidian Pass",
        text: "The sacred mirror remains uncorrupted and the grove endures for another age.",
        ending: { type: "true", title: "Protector of the Obsidian Mirror", xp: 610, gold: 575, trophy: "Obsidian Grove Shard" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. TO TRACK A THIEF (6 PAGES • LV 2)
  // Tome of Beasts 2 Lairs #1
  // ==========================================================
  bk_b9_tob2_1_track_thief: {
    id: "bk_b9_tob2_1_track_thief",
    title: "To Track a Thief",
    subtitle: "Tome of Beasts 2 Lairs • Kolchak Counting House & Greed Swarm",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: true,
    discoverySource: "Merchant Watchman (Oakhaven Market)",
    summary: "Break into the fire-scarred, boarded-up Kolchak Counting House—once a secret front for Mammon's cult—to stop a lone valkruung that awakened the vault's deadly Master Coin and Greed Swarm!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Kolchak Counting House",
        title: "Boarded-Up Bank",
        safeRetreat: true,
        text: "Scorched beams groan over the abandoned counting house of slain Mammon high priest Maxim Kolchak. Missing coins have been crawling straight toward its cellar grates!",
        choices: [
          { t: "Check the charred teller booths for hidden cult levers.", badge: "Perception DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, passMsg: "You spot the secret brass catch opening the basement vault stair!", failMsg: "Soot and ash hide the mechanism—you pry open the cellar hatch instead." }, onPass: { cw: "VAULT_SHORTCUT" } },
          { t: "Descend directly into the Basement Shrine of Mammon.", to: 2 }
        ]
      },
      2: {
        zone: "Mammon's Basement Vault",
        title: "The Valkruung & Greed Swarm",
        text: "Amid tarnished gold ingots, a sinister pale Valkruung commands a rattling, razor-edged Greed Swarm of animated coins whirling around a glowing Master Coin!",
        enemy: { name: "Valkruung & Greed Swarm", desc: "Lurking planar scavenger commanding a hurricane of biting gold coins.", hp: 28, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 65, items: ["bq_kolchak_master_coin"], weakCw: ["VAULT_SHORTCUT"] },
        choices: [
          { t: "Seize the Master Coin—causing the animated Greed Swarm to clatter harmlessly to the floor!", to: 3 }
        ]
      },
      3: {
        zone: "Counting House Street",
        title: "Stolen Coins Recovered",
        text: "With the Master Coin silenced, merchants gladly reclaim their missing purses and reward your swift work!",
        choices: [
          { t: "Return to Oakhaven Market.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Market",
        title: "Safe Strongboxes",
        text: "Shopkeepers breathe easier knowing their gold won't walk away in the night.",
        choices: [
          { t: "Collect your reward.", to: 5 }
        ]
      },
      5: {
        zone: "Rusty Flagon Tavern",
        title: "Honest Coin",
        text: "Kolchak's Master Coin gleams lucky in your pocket.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Breaker of the Greed Swarm",
        text: "Kolchak's cursed vault is cleansed and the valkruung threat is ended.",
        ending: { type: "true", title: "Master of Kolchak's Vault", xp: 120, gold: 120, trophy: "Mammon's Tarnished Ledger" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. THE FORSAKEN FORT (6 PAGES • LV 3)
  // Tome of Beasts 2 Lairs #2
  // ==========================================================
  bk_b9_tob2_2_forsaken_fort: {
    id: "bk_b9_tob2_2_forsaken_fort",
    title: "The Forsaken Fort",
    subtitle: "Tome of Beasts 2 Lairs • Plague Garrison & The Cunning Crocotta",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: true,
    discoverySource: "Plague-Stricken Village Healer (Oakhaven Outskirts)",
    summary: "Investigate the grassland fort wiped out by a virulent pestilence swarm, dodge the clever digging tunnels of its new pack of hyenas, and slay the voice-mimicking Crocotta commanding them!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Grassland Palisade",
        title: "Burrowed Under the Wall",
        safeRetreat: true,
        text: "Barred gates guard a silent, plague-emptied border fort—yet fresh dirt tunnels burrow beneath the collapsed barracks wall! From inside echoes a chillingly human cry for help...",
        choices: [
          { t: "See through the deceptive cry—a Crocotta mimics human voices to lure prey!", badge: "Perception / Survival DC 11", check: { stat: "spirit", skill: "Perception", dc: 11, pass: 2, fail: 2, passMsg: "Trap spotted! You climb the intact gatehouse instead of crawling into the hyena burrows!", failMsg: "You crawl into the tight burrow as laughing jaws snap!" }, onPass: { cw: "MIMIC_SPOTTED" } },
          { t: "Scale the timber palisade into the fort courtyard!", to: 2 }
        ]
      },
      2: {
        zone: "Forsaken Courtyard",
        title: "The Crocotta & Hyena Cackle",
        text: "Emerging from dug-out barrack tunnels, a massive, bone-crushing Crocotta and its snarling hyena pack surround the central well!",
        enemy: { name: "Crocotta & Hyena Pack", desc: "Cunning voice-mimicking predator leading a burrowing cackle.", hp: 36, ac: 13, atk: 6, dmg: 6, xp: 105, gold: 55, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), weakCw: ["MIMIC_SPOTTED"] },
        choices: [
          { t: "Burn out the remaining pestilence-swarm nest beneath the collapsed wall!", to: 3 }
        ]
      },
      3: {
        zone: "Garrison Armory",
        title: "Salvaged Pay-Chest",
        text: "Inside the sealed captain's office rests the fort's untouched pay-chest and medicine supplies for the nearby village!",
        onEnter: { gold: 55, healHp: 8, msg: "Recovered 55 GP and clean apothecary salves (+8 HP)!" },
        choices: [
          { t: "Deliver the medicines back to the village healer.", to: 4 }
        ]
      },
      4: {
        zone: "Grassland Village",
        title: "Pestilence Halted",
        text: "With the fort cleansed and the crocotta slain, the frontier road is safe once more.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Guildhall",
        title: "Fort Secured",
        text: "Militia scouts prepare to reclaim the garrison.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Cleanser of the Forsaken Fort",
        text: "The crocotta's deceptive howls are silenced forever.",
        ending: { type: "true", title: "Reclaimer of the Forsaken Fort", xp: 145, gold: 135, trophy: "Crocotta Fang Collar" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. THE TWISTED WREATH (6 PAGES • LV 4)
  // Tome of Beasts 2 Lairs #3
  // ==========================================================
  bk_b9_tob2_3_twisted_wreath: {
    id: "bk_b9_tob2_3_twisted_wreath",
    title: "The Twisted Wreath",
    subtitle: "Tome of Beasts 2 Lairs • Corrupted Druidic Obelisk & Vine Golem",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: true,
    discoverySource: "Fleeing Nature Pilgrims (Oakhaven Outskirts)",
    summary: "Enter the thorny forest maze of the Twisted Wreath where a reckless fey-summoning ritual killed gentle dryad Ilkarayda, corrupted the woods with necrotic energy, and drove her bonded Vine Golem into a murderous rage!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Thorny Maze",
        title: "Corrupted Garden",
        safeRetreat: true,
        text: "Knotted black brambles twist around a glowing rune-carved druidic obelisk. Twisted fey sprites and necrotic briar-beasts hiss from the hedges!",
        enemy: { name: "Corrupted Briar-Fey", desc: "Once-gentle woodland creatures warped by the failed ritual.", hp: 38, ac: 13, atk: 6, dmg: 6, xp: 100, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Press to the center of the Twisted Wreath beside the Druidic Obelisk!", to: 2 }
        ]
      },
      2: {
        zone: "The Druidic Obelisk",
        title: "Ilkarayda's Grieving Vine Golem",
        text: "Wreathed in necrotic purple sparks beside dryad Ilkarayda's withered oak, her colossal bonded Vine Golem thrashes in agony and fury!",
        enemy: { name: "Enraged Vine Golem", desc: "Massive thorny construct maddened by its dryad's death.", hp: 48, ac: 14, atk: 7, dmg: 8, xp: 155, gold: 90, items: ["bq_ilkarayda_vine_band"] },
        choices: [
          { t: "Reverse the reckless clerics' rune-circle on the obelisk to seal the necrotic rift!", badge: "Arcana / Spirit DC 12", check: { stat: "spirit", skill: "Arcana", dc: 12, pass: 3, fail: 3, passMsg: "Emerald light washes across the maze—green shoots sprout from Ilkarayda's oak!", failMsg: "With heavy effort you shatter the corrupting chalk sigils and calm the obelisk." } }
        ]
      },
      3: {
        zone: "Cleansed Obelisk",
        title: "A New Sprout",
        text: "As the necrotic corruption fades, a fresh golden sapling unfurls where Ilkarayda fell, and the thorny hedges bloom with white flowers.",
        choices: [
          { t: "Inform the waiting pilgrims that the Twisted Wreath is safe once more.", to: 4 }
        ]
      },
      4: {
        zone: "Forest Edge",
        title: "Pilgrims' Blessing",
        text: "Nature priests reward your reverence with silver and healing herbs.",
        onEnter: { healHp: 12, msg: "Nature's blessing restores your strength (+12 HP)!" },
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Market",
        title: "Friend of the Grove",
        text: "Ilkarayda's Blossoming Band smells faintly of spring rain.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Healer of the Twisted Wreath",
        text: "The sacred obelisk stands pure once more.",
        ending: { type: "true", title: "Purifier of the Twisted Wreath", xp: 185, gold: 170, trophy: "Runed Oak Acorn" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. SHRINE OF THE HUNGRY DEAD (6 PAGES • LV 5)
  // Tome of Beasts 2 Lairs #4
  // ==========================================================
  bk_b9_tob2_4_hungry_dead: {
    id: "bk_b9_tob2_4_hungry_dead",
    title: "Shrine of the Hungry Dead",
    subtitle: "Tome of Beasts 2 Lairs • Sea-Cliff Islands & Deathweaver Nafresi",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: true,
    discoverySource: "Coastal Fishermen (Oakhaven Outskirts)",
    summary: "Boat across churning surf to twin rocky sea-islands holding a forgotten sea-god's temple—where spider-bodied deathweaver Nafresi has struck a grisly pact with ghouls of the Unsated God!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Rocky Sea-Islands",
        title: "Temple in the Surf",
        safeRetreat: true,
        text: "Torn silver webbing flutters from salt-crusted temple columns perched on jagged sea-rocks. Inside, chanting ghouls led by a Priest of the Unsated God guard captives meant to feed their sinister arachnid landlord!",
        enemy: { name: "Ghouls of the Unsated God", desc: "Ravenous sea-shrine ghouls and their profane priest.", hp: 46, ac: 14, atk: 7, dmg: 7, undead: true, xp: 135, gold: 65, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Cross the web-strung chasm to the second island where Nafresi lurks!", to: 2 }
        ]
      },
      2: {
        zone: "Webbed Sea-Sanctuary",
        title: "Nafresi the Deathweaver",
        text: "Dropping silently from the vaulted stone ceiling on necrotic silk strands, the monstrous spider-undead Deathweaver Nafresi hisses in fury: 'My new flock feeds me well—you shall be dessert!'",
        enemy: { name: "Nafresi, Undead Deathweaver", desc: "Cunning necrotic arachnid-horror ruling the sea-cliff ruins.", hp: 56, ac: 15, atk: 8, dmg: 8, undead: true, xp: 185, gold: 125, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Cut down the surviving shipwrecked captives and burn away Nafresi's webs!", to: 3 }
        ]
      },
      3: {
        zone: "Coastal Cove",
        title: "Safe Passage Restored",
        text: "The grateful fishermen cheer as you row the rescued sailors safely back to shore.",
        choices: [
          { t: "Accept the coastal village's bounty.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Docks",
        title: "Sea-Cliffs Cleared",
        text: "Seabirds reclaim the twin sea-stacks once more.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Rusty Flagon Tavern",
        title: "Salt & Victory",
        text: "Sailors toast the slayer of the sea-cliff deathweaver.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Bane of the Hungry Dead",
        text: "Both Nafresi and the Unsated God's sea-shrine are wiped from the coast.",
        ending: { type: "true", title: "Slayer of Deathweaver Nafresi", xp: 220, gold: 210, trophy: "Silver-Webbed Sea Idol" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. TRAGEDY AT THYRDUN OUTPOST (6 PAGES • LV 6)
  // Tome of Beasts 2 Lairs #5
  // ==========================================================
  bk_b9_tob2_5_thyrdun: {
    id: "bk_b9_tob2_5_thyrdun",
    title: "Tragedy at Thyrdun Outpost",
    subtitle: "Tome of Beasts 2 Lairs • Flooded Dwarven Mine & The Overshadow",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: true,
    discoverySource: "Dwarven Mining Council (Oakhaven Forge)",
    summary: "Descend into the newly reopened dwarven colony of Thyrdun—where a twenty-year-old tailings dam flood birthed a terrifying Overshadow of hopeless, drowned souls now hunting the new colonists!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Thyrdun Minehead",
        title: "Silent Pumps",
        safeRetreat: true,
        text: "Water pumps still clank beside the repaired tailings dam, yet no living dwarf answers your hail. Mud-caked tunnels echo with desperate phantom coughs as drowned Mine-Shades drift out of the flooded shafts!",
        enemy: { name: "Drowned Thyrdun Shades", desc: "Restless spirits of colonists lost in the dam collapse.", hp: 50, ac: 14, atk: 7, dmg: 8, undead: true, xp: 145, gold: 65, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Follow the freezing dread down to the deep collapsed chamber!", to: 2 }
        ]
      },
      2: {
        zone: "The Collapsed Seam",
        title: "The Overshadow",
        text: "Swallowing your torchlight in suffocating despair, a colossal amalgam of fearful, trapped souls—the Overshadow—rises from the mud-slick floor!",
        enemy: { name: "The Thyrdun Overshadow", desc: "Nightmarish undead abomination born from collective terror.", hp: 64, ac: 15, atk: 8, dmg: 9, undead: true, xp: 215, gold: 140, items: ["bq_thyrdun_miner_pick"] },
        choices: [
          { t: "Speak a solemn prayer of release as the Overshadow breaks apart into peaceful golden motes!", to: 3 }
        ]
      },
      3: {
        zone: "Minehead Memorial",
        title: "Rest for the Lost",
        text: "You recover the colonists' clan medallions and deliver them with honor to the Dwarven Mining Council.",
        choices: [
          { t: "Accept the dwarves' solemn reward.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Forge",
        title: "Honored by Stone",
        text: "Dwarven smiths raise silent hammers in salute to the souls of Thyrdun.",
        choices: [
          { t: "Return to town.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Square",
        title: "Shadow Lifted",
        text: "Thyrdun's iron heart beats safely once more.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Liberator of Thyrdun Outpost",
        text: "The tragic Overshadow is laid to rest and the dwarven dead sleep in peace.",
        ending: { type: "true", title: "Rest-Bringer of Thyrdun", xp: 250, gold: 240, trophy: "Thyrdun Clan Medallion" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. CAVERNS OF THE CRYSTALLINE MONOLITH (6 PAGES • LV 7)
  // Tome of Beasts 2 Lairs #6
  // ==========================================================
  bk_b9_tob2_6_crystalline: {
    id: "bk_b9_tob2_6_crystalline",
    title: "Caverns of the Crystalline Monolith",
    subtitle: "Tome of Beasts 2 Lairs • Geothermal Crystal Forest & Alien Gardener",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: true,
    discoverySource: "Arcane Sage Commission (Oakhaven Guildhall)",
    summary: "Venture into dazzling geothermal caves where mineral crystals grow as tall as trees, harvest priceless spell-components, and face the alien entity tending the Crystalline Monolith like a jealous garden!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Geothermal Crystal Forest",
        title: "Trees of Singing Quartz",
        safeRetreat: true,
        text: "Steaming mineral vents mist over towering, rainbow-prism crystal pillars! As you chip a loose resonant shard, faceted Crystal Golems detach from the glowing walls!",
        enemy: { name: "Geothermal Crystal Sentinels", desc: "Razor-edged living mineral constructs guarding the caverns.", hp: 58, ac: 15, atk: 8, dmg: 9, xp: 175, gold: 90, items: rollRandomLoot(["material", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Advance into the blinding central chamber of the Crystalline Monolith!", to: 2 }
        ]
      },
      2: {
        zone: "Heart of the Monolith",
        title: "The Alien Crystal-Tender",
        text: "Hovering before a fifty-foot singing quartz monolith pulses an alien, prism-winged entity that blasts refracted beams of searing light at intruders!",
        enemy: { name: "Guardian of the Crystalline Monolith", desc: "Alien planar gardener protecting its mineral sanctum.", hp: 74, ac: 16, atk: 9, dmg: 11, xp: 265, gold: 185, items: ["bq_monolith_crystal_lens"] },
        choices: [
          { t: "Harvest the commissioned spell-crystals and exit before a steam-geyser erupts!", to: 3 }
        ]
      },
      3: {
        zone: "Surface Ridge",
        title: "Dazzling Haul",
        text: "Your pack hums softly with luminous, high-grade geothermal crystals.",
        choices: [
          { t: "Deliver the rare components to the Oakhaven sage.", to: 4 }
        ]
      },
      4: {
        zone: "Oakhaven Guildhall",
        title: "Sage's Bounty",
        text: "Overjoyed with the pristine crystals, the sage pays a handsome commission.",
        choices: [
          { t: "Pocket your gold.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Market",
        title: "Prism Light",
        text: "Your Geothermal Monolith Prism refracts firelight into tiny rainbows.",
        choices: [
          { t: "Finish the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Delver of the Crystalline Monolith",
        text: "You braved the singing crystal caverns and returned with priceless arcane relics.",
        ending: { type: "true", title: "Harvester of the Crystal Monolith", xp: 295, gold: 285, trophy: "Singing Quartz Spire" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 12. FIGHT FOR HORSESHOE ROCK OASIS (6 PAGES • LV 8)
  // Tome of Beasts 2 Lairs #7
  // ==========================================================
  bk_b9_tob2_7_horseshoe_oasis: {
    id: "bk_b9_tob2_7_horseshoe_oasis",
    title: "Fight for Horseshoe Rock Oasis",
    subtitle: "Tome of Beasts 2 Lairs • Water Scorpions vs. Nesting Kezai",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: true,
    discoverySource: "Parched Desert Caravan Masters (Oakhaven Market)",
    summary: "Reclaim vital Horseshoe Rock Oasis from a ferocious territorial clash between a mated pair of giant subterranean Water Scorpions in the pools and a deadly nesting Kezai in the date palms!",
    totalPages: 6,
    pages: {
      1: {
        zone: "Horseshoe Rock Pools",
        title: "Water Scorpions in the Shallows",
        safeRetreat: true,
        text: "Cool water cascades from the cleft of Horseshoe Rock into palm-ringed pools—now stained crimson with caravan wreckage! Surging out of the turquoise shallows come a mated pair of colossal Water Scorpions defending their brood!",
        enemy: { name: "Mated Giant Water Scorpions", desc: "Armored aquatic arachnids emerged from the subterranean river.", hp: 66, ac: 16, atk: 9, dmg: 10, xp: 195, gold: 85, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Look up—shrieking shadows drop from the date palms as the nesting Kezai attacks!", to: 2 }
        ]
      },
      2: {
        zone: "Date Palm Grove",
        title: "The Nesting Kezai",
        text: "Fiercely guarding its clutch among the sun-drenched fronds, a terrifying desert Kezai dives with flashing claws and scorching desert fury!",
        enemy: { name: "Matriarch Oasis Kezai", desc: "Deadly territorial desert predator claiming the oasis palms.", hp: 80, ac: 16, atk: 10, dmg: 11, xp: 280, gold: 185, items: ["bq_horseshoe_oasis_spear"] },
        choices: [
          { t: "Clear the pools and raise the safe-water banner atop Horseshoe Rock!", to: 3 }
        ]
      },
      3: {
        zone: "Horseshoe Rock Oasis",
        title: "Caravans Saved",
        text: "Parched desert caravans roll gratefully into the shaded grove, filling waterskins and pooling a generous desert-gold reward!",
        onEnter: { healHp: 18, msg: "Refreshed by the cool oasis spring (+18 HP)!" },
        choices: [
          { t: "Ride north with the grateful merchants.", to: 4 }
        ]
      },
      4: {
        zone: "Desert Trade Road",
        title: "Oasis Open",
        text: "The vital desert watering hole is safe for travelers once more.",
        choices: [
          { t: "Return to Oakhaven.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Market",
        title: "Caravan Heroes",
        text: "Spice merchants cheer as trade resumes across the dunes.",
        choices: [
          { t: "Complete the adventure.", to: 6 }
        ]
      },
      6: {
        zone: "Epilogue",
        title: "Liberator of Horseshoe Rock",
        text: "You cleared both Water Scorpions and the Kezai, saving the desert trade route.",
        ending: { type: "true", title: "Champion of Horseshoe Rock Oasis", xp: 320, gold: 305, trophy: "Desert Palm Caravan Seal" },
        choices: []
      }
    }
  }
});
