/* ============================================================
   BOOK QUESTS — BATCH 002 (12 Quests • 3 Multi-Part Series)
   Sources:
   - 12 Peculiar Towers (Towers 11–12 — Complete)
   - The Raven's Call (Parts I–II — Complete)
   - Adventures of Dib (Parts I–II — Complete)
   - An Enigma Lost in a Maze (Parts I–III — Complete)
   - Blood Vaults of Sister Alkava (Complete)
   - Cat & Mouse (Complete)
   - Caverns of the Spore Lord (Complete)
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. BLOODSTONE TOWER (8 PAGES • LV 11)
  // ==========================================================
  bk_pt_11_bloodstone_tower: {
    id: "bk_pt_11_bloodstone_tower",
    title: "Bloodstone Tower",
    subtitle: "12 Peculiar Towers • Citadel of the Nightreaver",
    difficulty: "Deadly",
    recommendedLevel: 11,
    autoDiscover: false,
    discoverySource: "The New Lord Marshal (Oakhaven Guildhall)",
    summary: "Answer the Lord Marshal's desperate warrant and breach the windowless crimson-veined fortress of Bloodstone Tower to destroy the 200-year-old vampire blood mage known as the Nightreaver.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Morgau Borderland",
        title: "The Windowless Monolith",
        safeRetreat: true,
        text: "Built from dark green stone shot through with veins of blood-red mineral, Bloodstone Tower rises without a single window. Its only entrance is a pair of locked, spike-studded iron doors radiating an icy aura of dread.",
        choices: [
          { t: "Pick the heavy warded lock without brushing the iron spikes.", badge: "Lockpicking DC 15", check: { stat: "agility", skill: "Lockpicking", dc: 15, pass: 2, fail: 2, failDmg: 9, passMsg: "The tumblers click cleanly—you slip inside unharmed!", failMsg: "The iron spikes tear your gauntlets (-9 HP) before the bolt yields!" } },
          { t: "Ram the spiked doors with sheer might!", badge: "Might DC 15", check: { stat: "might", skill: "Athletics", dc: 15, pass: 2, fail: 2, failDmg: 10, passMsg: "The rusted hinges snap with a deafening boom!", failMsg: "Spikes bite deep (-10 HP) as you force the iron inward!" } }
        ]
      },
      2: {
        zone: "Entrance Hall",
        title: "Coppery Stains",
        text: "A thick coppery scent hangs in the dark hall. Rust-red stains coat the flagstones, and pale Vampire Spawn servants drop from the vaulted ceiling with bared fangs!",
        enemy: { name: "Bloodstone Vampire Spawn", desc: "Starved thralls guarding the Nightreaver's threshold.", hp: 86, ac: 17, atk: 11, dmg: 11, undead: true, xp: 260, gold: 120, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Inspect the hidden crimson runes beside the spiral staircase.", badge: "Arcana / Perception DC 15", check: { stat: "arcana", skill: "Arcana", dc: 15, pass: 3, fail: 3, passMsg: "You disrupt a blood-siphon sigil feeding the Nightreaver's vitality!", failMsg: "The dark runes pulse silently as you ascend." }, onPass: { cw: "BLOOD_SIGIL_BROKEN", msg: "Disrupted the Nightreaver's Blood Siphon!" } },
          { t: "Ascend directly to the Hall of Tormented Souls.", to: 3 }
        ]
      },
      3: {
        zone: "Hall of Tormented Souls",
        title: "Wails of Two Centuries",
        text: "Caged spirit-lanterns line the curved walls, trapping the ghosts of the Nightreaver's victims. A swirling Crimson Wraith bursts from a shattered lantern!",
        enemy: { name: "Crimson Blood-Wraith", desc: "Vengeful spirit twisted by blood necromancy.", hp: 90, ac: 17, atk: 11, dmg: 12, undead: true, xp: 275, gold: 130, items: rollRandomLoot(["material", "valuable"], 1, "very_rare"), flee: 2 },
        choices: [
          { t: "Shatter the spirit-lanterns to free the trapped souls before climbing.", to: 4, onChoose: { cw: "SOULS_FREED", healHp: 16, msg: "Grateful spirits bless you (+16 HP) before passing on!" } },
          { t: "Press straight up to the Sanguine Laboratory.", to: 4 }
        ]
      },
      4: {
        zone: "Sanguine Laboratory",
        title: "Alchemical Reservoirs",
        text: "Glass alembics and silver syringes surround a slab of polished bloodstone. Among the Nightreaver's relics gleams a wicked bloodstone dagger humming with dark vitality.",
        onEnter: { items: ["bq_nightreaver_fang"], msg: "Claimed the Nightreaver's Bloodstone Dagger!" },
        choices: [
          { t: "Smash the blood vats and ascend to the Nightreaver's Sanctum!", to: 5 }
        ]
      },
      5: {
        zone: "The Blood Sanctum",
        title: "The Nightreaver Awakens",
        text: "Wrapped in a cloak of living crimson mist, the ancient vampire blood mage known as the Nightreaver rises from his obsidian throne! 'The Lord Marshal sends fresh blood to my table,' he purrs, summoning swarms of bats as his Blood Feast magic flares!",
        enemy: { name: "The Nightreaver", desc: "200-year-old vampire blood mage of Bloodstone Tower.", hp: 112, ac: 18, atk: 12, dmg: 14, undead: true, xp: 380, gold: 280, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["BLOOD_SIGIL_BROKEN", "SOULS_FREED"] },
        choices: [
          { t: "Drive a stake through the Nightreaver's heart and burn his coffin!", to: 6 }
        ]
      },
      6: {
        zone: "The Blood Sanctum",
        title: "Ashes in the Dark",
        text: "The Nightreaver collapses into swirling black dust. The oppressive chill lifts from the bloodstone walls as the last of his dark enchantments unravels.",
        choices: [
          { t: "Unlock the lower cells and free any surviving captives.", to: 7 }
        ]
      },
      7: {
        zone: "Border Road",
        title: "Return to the Lord Marshal",
        text: "Dawn breaks over the Morgau hills as you escort the freed captives back to civilization, carrying the Nightreaver's shattered signet as proof.",
        choices: [
          { t: "Present the warrant to the Lord Marshal.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "End of a Two-Century Terror",
        text: "The Lord Marshal grants you a hero's pardon, a chest of royal coin, and the undying gratitude of every border village.",
        ending: { type: "true", title: "Slayer of the Nightreaver", xp: 450, gold: 440, trophy: "Nightreaver's Crimson Signet" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. COURT OF THE LUNAR KNIGHT (9 PAGES • LV 12)
  // ==========================================================
  bk_pt_12_lunar_knight: {
    id: "bk_pt_12_lunar_knight",
    title: "Court of the Lunar Knight",
    subtitle: "12 Peculiar Towers • The Shadow Fey Ivory Tower",
    difficulty: "Deadly",
    recommendedLevel: 12,
    autoDiscover: false,
    discoverySource: "Diviners of the Shadow Blight (Temple of the Dawn)",
    summary: "Pass through the moonlit Crescent Gate into a desolate white pocket plane, enter the impossible Ivory Tower of the banished Lunar Knight, and win his silver spurs or reclaim the stolen holy relic.",
    totalPages: 9,
    pages: {
      1: {
        zone: "The Crescent Gate",
        title: "Moonrise Over White Plains",
        safeRetreat: true,
        text: "Under the exact phase of the moon, a shimmering silver arch opens onto endless windswept white plains. Alone on the horizon rises the slender Ivory Tower of the Lunar Knight—banished champion of the exiled Moonlit King.",
        choices: [
          { t: "Step boldly through the Crescent Gate before dawn seals it.", to: 2 },
          { t: "Observe Shadow Fey courtly etiquette and announce your title aloud.", badge: "Spirit / Lore DC 15", check: { stat: "spirit", skill: "Persuasion", dc: 15, pass: 2, fail: 2, passMsg: "Unseen fey trumpeters answer with a respectful silver chime!", failMsg: "Cold laughter echoes across the white dust." }, onPass: { cw: "FEY_ETIQUETTE", msg: "Earned FEY_ETIQUETTE in the Lunar Court!" } }
        ]
      },
      2: {
        zone: "Ivory Antechamber",
        title: "Warped Dimensions",
        text: "Inside, the Ivory Tower is vastly wider than its slender exterior! Starlight mirrors stretch into infinity, where Shadow Fey Duelists step directly out of the silver glass!",
        enemy: { name: "Shadow Fey Mirror-Duelists", desc: "Aristocratic fey blades sworn to the Lunar Knight.", hp: 92, ac: 17, atk: 12, dmg: 12, xp: 290, gold: 140, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Ascend the floating crescent stairs to the Gallery of Eclipses.", to: 3 }
        ]
      },
      3: {
        zone: "Gallery of Eclipses",
        title: "The Queen's Bargain",
        text: "Tapestries depict the tragic madness of the Moonlit King and the cold ascent of the Queen of Night and Magic. A spectral herald offers a moon-dew draught if you swear to fight honorably.",
        choices: [
          { t: "Swear the oath of honorable combat and drink the moon-dew.", to: 4, onChoose: { healHp: 22, restoreMp: 8, cw: "LUNAR_OATH", msg: "Silver vigor fills your veins (+22 HP, +8 MP)!" } },
          { t: "Refuse fey bargains and press straight upward.", to: 4 }
        ]
      },
      4: {
        zone: "Hall of Silver Hounds",
        title: "The Moonlit Pack",
        text: "Translucent lunar hounds with eyes like burning stars prowl a marble bridge suspended over a chasm of drifting clouds!",
        enemy: { name: "Lunar Star-Hounds", desc: "Fey pack-beasts wreathed in blinding moonlight.", hp: 96, ac: 18, atk: 12, dmg: 13, xp: 310, gold: 150, items: rollRandomLoot(["material", "valuable"], 1, "very_rare"), flee: 3 },
        choices: [
          { t: "Climb to the Ivory Throne Room at the apex of the tower.", to: 5 }
        ]
      },
      5: {
        zone: "Court of the Lunar Knight",
        title: "Audience With the Exile",
        text: "Beneath an open dome of silver stars broods the Lunar Knight, clad in gleaming crescent plate. Beside his throne rests the stolen mortal plague-relic—and on his boots gleam his legendary Silver Spurs. 'You seek my spurs for the Queen, or the relic for mortals? Prove your worth on steel!'",
        choices: [
          { t: "Salute cleanly and challenge him to a formal duel of honor!", reqCw: "FEY_ETIQUETTE", badge: "FEY_ETIQUETTE", to: 6, onChoose: { cw: "HONOR_DUEL", msg: "The Lunar Knight lowers his visor with respect—no ambush tricks!" } },
          { t: "Draw steel immediately and meet his Flashing Blade Dance!", to: 6 }
        ]
      },
      6: {
        zone: "Court of the Lunar Knight",
        title: "Flashing Blade Dance",
        text: "Radiant moonbeams explode from the Lunar Knight's rapier and dagger as he teleports in silver arcs across the marble floor!",
        enemy: { name: "The Lunar Knight", desc: "Right hand of the Moonlit King, master of radiant fey bladework.", hp: 122, ac: 18, atk: 13, dmg: 15, xp: 430, gold: 320, items: ["bq_lunar_knight_spurs"], weakCw: ["HONOR_DUEL", "LUNAR_OATH"] },
        choices: [
          { t: "Stay your final blow and accept his surrender of the spurs and relic.", to: 7 }
        ]
      },
      7: {
        zone: "Court of the Lunar Knight",
        title: "The Knight's Yielding",
        text: "Kneeling on one knee, the Lunar Knight unbuckles his Silver Spurs and hands over the mortal relic. 'Tell the Queen—or the healers—that a knight of the Moonlit King remembers his honor.'",
        choices: [
          { t: "Hurry back down through the Crescent Gate before first light!", to: 8 }
        ]
      },
      8: {
        zone: "Dawn Crossing",
        title: "Return to the Mortal Realm",
        text: "The ivory gate dissolves in mist just as sunrise paints the eastern hills. Both the relic and the Lunar Knight's favor are safely in your hands.",
        choices: [
          { t: "Deliver the cure and conclude the tale of the 12 Peculiar Towers.", to: 9 }
        ]
      },
      9: {
        zone: "Epilogue",
        title: "Champion of the Moonlit Court",
        text: "The shadow blight retreats across the countryside, and legends of your duel atop the Ivory Tower spread through both mortal kingdoms and the Courts of the Shadow Fey.",
        ending: { type: "true", title: "Victor of the Lunar Court", xp: 520, gold: 500, trophy: "Ivory Crescent Medallion" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. THE RAVEN'S CALL I: SMOKE OVER NARGENSTAL (8 PAGES • LV 3)
  // Part 1 of 2
  // ==========================================================
  bk_b2_ravens_call_1: {
    id: "bk_b2_ravens_call_1",
    title: "The Raven's Call I: Smoke Over Nargenstal",
    subtitle: "The Raven's Call (Part 1 of 2) • Trollkin Raiders on the Coast",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Escaped Nargenstal Villager (Oakhaven Outskirts)",
    summary: "Answer a desperate plea from the coastal village of Nargenstal, fight through Mossback Reaver scouts and their giant sea crab, and infiltrate the occupied palisade.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Coastal Forest Road",
        title: "Smoke on the Horizon",
        safeRetreat: true,
        text: "Black smoke rises over the pine ridges above the seaside village of Nargenstal. A bloodied villager stumbles into your camp: 'The Mossback Reavers—trollkin, kobolds, and a red-armored ogre—took the whole village as slaves! Please, save my family!'",
        choices: [
          { t: "Hurry down the misty coastal trail toward Nargenstal.", to: 2 },
          { t: "Scout the ridge first to spot raider outposts.", badge: "Perception / Survival DC 11", check: { stat: "spirit", skill: "Survival", dc: 11, pass: 2, fail: 2, passMsg: "You spot Ornfisk's ambush party hiding in the fog ahead!", failMsg: "Thick sea-fog hides everything beyond twenty paces." }, onPass: { cw: "RAIDER_AMBUSH_SPOTTED", msg: "Spotted the mist ambush in advance!" } }
        ]
      },
      2: {
        zone: "Misty Pine Trail",
        title: "A Trollkin in the Mist",
        text: "Snarling out of the coastal fog steps Ornfisk, a hulking Mossback trollkin raider backed by six yipping kobold scouts armed with demonfire flasks!",
        enemy: { name: "Ornfisk & Kobold Scouts", desc: "Mossback trollkin raider and kobold skirmishers.", hp: 30, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 35, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["RAIDER_AMBUSH_SPOTTED"] },
        choices: [
          { t: "Follow the shoreline toward the palisade of Nargenstal.", to: 3 }
        ]
      },
      3: {
        zone: "Nargenstal Shore",
        title: "Execlactas the Sea King Crab",
        text: "Near the tidal rocks by Valdtor Keep's ruins, trollkin handler Svetvik and four kobold keepers tend a monstrous war-trained giant crab—Execlactas!",
        choices: [
          { t: "Slip past the rocky beach under cover of the palisade wall.", badge: "Stealth DC 12", check: { stat: "agility", skill: "Stealth", dc: 12, pass: 5, fail: 4, passMsg: "You evade Svetvik and slip over the ford gate!", failMsg: "Execlactas's eyestalks snap toward you—Svetvik sounds the horn!" } },
          { t: "Strike Svetvik and the giant sea crab to clear the shoreline!", to: 4 }
        ]
      },
      4: {
        zone: "Rocky Beach",
        title: "Claws of the Sea King",
        text: "Svetvik cracks his iron prod as Execlactas the Sea King Crab charges across the wet shingle!",
        enemy: { name: "Svetvik & Execlactas", desc: "Trollkin beast-handler and giant armored sea crab.", hp: 34, ac: 13, atk: 5, dmg: 6, xp: 85, gold: 45, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Slip through the timber palisade into Nargenstal!", to: 5, onChoose: { cw: "CRAB_SLAIN", msg: "Cleared the shore route!" } }
        ]
      },
      5: {
        zone: "Village of Nargenstal",
        title: "The Burnt Longhouse",
        text: "Inside the palisade, sheep pens stand slaughtered and the village longhouse smolders in ashes. From the Great Barn come muffled cries of bound villagers!",
        choices: [
          { t: "Creep toward the Great Barn to free the captives!", to: 6 },
          { t: "Check the Smokehouse first for supplies and a clean vantage.", to: 6, onChoose: { healHp: 8, msg: "Found dried saltfish and bandages in the smokehouse (+8 HP)." } }
        ]
      },
      6: {
        zone: "The Great Barn",
        title: "Moregoth's Watch",
        text: "Massive trollkin guard Moregoth and a pack of kobold sentries lounge before the barred barn doors, roasting stolen mutton!",
        enemy: { name: "Moregoth & Kobold Guards", desc: "Trollkin jailor and kobold spearmen guarding the captives.", hp: 36, ac: 13, atk: 6, dmg: 6, xp: 95, gold: 50, items: rollRandomLoot(["weapon", "consumable"], 1, "rare"), flee: 5 },
        choices: [
          { t: "Unbar the barn doors and rally the freed villagers!", to: 7 }
        ]
      },
      7: {
        zone: "The Great Barn",
        title: "Whispered Warning",
        text: "The grateful villagers arm themselves with pitchforks and warn you: 'The Mossback Shaman and the red-armored ogre lord Coalkell hold the Frost Maiden Inn! Night is falling—they'll counterattack soon!'",
        choices: [
          { t: "Fortify the village square and prepare for Part II!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Foothold in Nargenstal",
        text: "You have broken the outer ring of the Mossback Reavers and rescued the captives of the Great Barn. Rest and resupply—<strong>The Raven's Call II: Wrath of Coalkell</strong> is now unlocked!",
        ending: { type: "true", title: "Scout of Nargenstal (Raven's Call I)", xp: 130, gold: 115, trophy: "Mossback Raider Tusk" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. THE RAVEN'S CALL II: WRATH OF COALKELL (8 PAGES • LV 4)
  // Part 2 of 2 (Prerequisite: bk_b2_ravens_call_1)
  // ==========================================================
  bk_b2_ravens_call_2: {
    id: "bk_b2_ravens_call_2",
    reqQuest: "bk_b2_ravens_call_1",
    title: "The Raven's Call II: Wrath of Coalkell",
    subtitle: "The Raven's Call (Part 2 of 2) • Blood Price & The Frost Maiden Inn",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Unlocks after The Raven's Call I",
    summary: "Survive the trollkin night counterattack in Nargenstal, break the Mossback Shaman's dark ritual, and storm the Frost Maiden Inn to bring down the red-armored ogre lord Coalkell.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Nargenstal Square",
        title: "Counterattack by Night",
        safeRetreat: true,
        text: "Under a cold coastal moon, war-horns blare from the Frost Maiden Inn! Screaming trollkin berserkers charge down the muddy lane to retake the Great Barn!",
        enemy: { name: "Mossback Night Reavers", desc: "Ferocious trollkin counterattacking under cover of darkness.", hp: 38, ac: 13, atk: 6, dmg: 6, xp: 95, gold: 45, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Pursue the routed raiders toward the village dock.", to: 2 }
        ]
      },
      2: {
        zone: "Nargenstal Dock",
        title: "A Dark Visitor",
        text: "By the mist-shrouded pier waits a pale bandit dhampir watching the flames with idle amusement. 'Coalkell's armor has a weak clasp under the left pauldron,' he drawls. 'Give me twenty gold and I'll leave you to your heroism.'",
        choices: [
          { t: "Pay the dhampir's price for the intelligence on Coalkell.", to: 3, onChoose: { cw: "COALKELL_WEAKNESS", msg: "Learned Coalkell's armor flaw (COALKELL_WEAKNESS)!" } },
          { t: "Tell the bloodsucker to get lost and march on the Shaman!", to: 3 }
        ]
      },
      3: {
        zone: "Shepherd's Hill",
        title: "The Blood Price",
        text: "At the edge of the village stands the Mossback Trollkin Shaman, chanting over raven-bone fetishes to summon a storm of blood-ice over the harbor!",
        enemy: { name: "Mossback Trollkin Shaman", desc: "Fierce tribal spellcaster demanding the Blood Price.", hp: 40, ac: 13, atk: 6, dmg: 7, xp: 110, gold: 60, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Kick apart the bone-altar and march on the Frost Maiden Inn!", to: 4, onChoose: { healHp: 10, msg: "Broke the Shaman's curse and caught your second wind (+10 HP)!" } }
        ]
      },
      4: {
        zone: "The Frost Maiden Inn",
        title: "Barricaded Doors",
        text: "The sturdy timber Frost Maiden Inn has been turned into Coalkell's war-hall. Kobold archers peer from the upper gables.",
        choices: [
          { t: "Slip in through the cellar bulkhead behind the kitchen.", badge: "Lockpicking / Stealth DC 12", check: { stat: "agility", skill: "Stealth", dc: 12, pass: 5, fail: 5, failDmg: 5, passMsg: "You emerge behind the taproom bar completely unseen!", failMsg: "A kobold sentry spots you and drops a burning brand (-5 HP)!" } },
          { t: "Kick open the front tavern door with a warcry!", to: 5 }
        ]
      },
      5: {
        zone: "Frost Maiden Common Room",
        title: "The Red-Armored Horror",
        text: "Overturning the oak hearth-table, the towering ogre chieftain Coalkell rises in battered crimson plate! 'Little crows dare peck at Coalkell?! I'll paint the sea red with you!'",
        enemy: { name: "Coalkell the Red-Armored Ogre", desc: "Brutal ogre chieftain of the Mossback Reavers.", hp: 48, ac: 14, atk: 7, dmg: 8, xp: 155, gold: 105, items: ["bq_coalkell_maul"], weakCw: ["COALKELL_WEAKNESS"] },
        choices: [
          { t: "Cast Coalkell's crimson helm into the square to scatter the remaining kobolds!", to: 6 }
        ]
      },
      6: {
        zone: "Nargenstal Harbor",
        title: "Driven Into the Sea",
        text: "Seeing their ogre lord fallen, the surviving Mossback Reavers flee to their longboats and row frantically into the mist.",
        choices: [
          { t: "Join the villagers in raising the hearth-fires of Nargenstal.", to: 7 }
        ]
      },
      7: {
        zone: "Nargenstal",
        title: "The Raven's Gratitude",
        text: "A great black raven circles overhead as the grateful elders present you with their saved silver hoard.",
        choices: [
          { t: "Sail back toward Oakhaven as a hero of the coast.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Savior of Nargenstal",
        text: "The seaside town of Nargenstal begins rebuilding in peace, and your triumph over Coalkell and the Mossback Reavers becomes tavern legend.",
        ending: { type: "true", title: "Breaker of the Mossback Reavers", xp: 185, gold: 170, trophy: "Crimson Horn of Coalkell" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. ADVENTURES OF DIB I: IMPREGNABLE FORTRESS OF DIB (7 PAGES • LV 1)
  // Part 1 of 2
  // ==========================================================
  bk_b2_dib_1: {
    id: "bk_b2_dib_1",
    title: "Adventures of Dib I: Impregnable Fortress of Dib",
    subtitle: "Adventures of Dib (Part 1 of 2) • The Overturned-Wagon Citadel",
    difficulty: "Easy",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Irritated Trade-Caravan Master (Oakhaven Market)",
    summary: "Track down the crafty goblin Dib Halfling-Chewer, who has fortified a stolen merchant wagon into an 'impregnable' roadside fortress bristling with ridiculous goblin traps.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Oakhaven Trade Road",
        title: "Fortress of Splinters",
        safeRetreat: true,
        text: "Beside a wooded bend sits an overturned freight wagon reinforced with barrel staves, soup pots, and a crudely painted banner reading 'IMPREGNABLE FORTRESS OF DIB!' Taunting goblin laughter echoes from behind the spokes.",
        choices: [
          { t: "Inspect the muddy approach for hidden goblin snares.", badge: "Perception DC 10", check: { stat: "spirit", skill: "Perception", dc: 10, pass: 2, fail: 2, failDmg: 2, passMsg: "You spot a concealed pit full of stinging nettles and step right around it!", failMsg: "Your boot plunges into a nettle-pit (-2 HP) as goblins giggle!" } },
          { t: "March straight up and demand Dib surrender the stolen cargo!", to: 2 }
        ]
      },
      2: {
        zone: "The Wheel-Barricade",
        title: "Goblin Outriders",
        text: "Three pot-helmeted goblin lackeys pop out from behind hay bales, slinging rotten turnips and rusty shortswords!",
        enemy: { name: "Dib's Wagon Lackeys", desc: "Scrappy goblin bandits wearing soup-pot helmets.", hp: 15, ac: 10, atk: 3, dmg: 3, xp: 35, gold: 15, items: rollRandomLoot(["consumable"], 1, "common"), flee: 1 },
        choices: [
          { t: "Climb over the wagon-bed barricade into the 'throne room'!", to: 3 }
        ]
      },
      3: {
        zone: "Inside the Overturned Wagon",
        title: "The Bee-Hive Booby Trap",
        text: "A frayed rope strung across the wagon canvas is tied directly to a buzzing hornet nest!",
        choices: [
          { t: "Carefully unhook the tripwire with nimble fingers.", badge: "Agility / Lockpicking DC 10", check: { stat: "agility", skill: "Lockpicking", dc: 10, pass: 4, fail: 4, failDmg: 3, passMsg: "Snip! The hornet nest stays safely tied up!", failMsg: "Buzz! Angry hornets sting your neck (-3 HP)!" } },
          { t: "Duck and roll straight under the canvas!", to: 4 }
        ]
      },
      4: {
        zone: "Dib's Command Deck",
        title: "Dib Halfling-Chewer",
        text: "Perched atop a stack of stolen cheese wheels stands Dib Halfling-Chewer himself, brandishing a notched cleaver and an iron-rimmed wagon-wheel shield! 'None breach Dib's Fortress! Attack, my pretties!'",
        enemy: { name: "Dib Halfling-Chewer & Guard", desc: "Ambitious, surprisingly crafty goblin wagon-lord.", hp: 20, ac: 11, atk: 4, dmg: 4, xp: 50, gold: 30, items: ["bq_dib_wagon_shield"] },
        choices: [
          { t: "Corner Dib—only to watch him dive through a trapdoor in the wagon floor!", to: 5 }
        ]
      },
      5: {
        zone: "Roadside Ditch",
        title: "A Vow of Vengeance",
        text: "'You haven't seen the last of Dib!' the little goblin shrieks as he scrambles into the bushes clutching a blueprint for an even bigger wagon. At least all the merchant's stolen crates are intact!",
        choices: [
          { t: "Haul the recovered cargo back to Oakhaven Market.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Market",
        title: "Cargo Restored",
        text: "The caravan master chuckles in disbelief at Dib's soup-pot fortress and pays your full recovery fee.",
        choices: [
          { t: "Collect your reward—and keep an eye out for Dib's return!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Fortress Breached",
        text: "Dib's Impregnable Fortress has fallen—yet his sworn vengeance looms! <strong>Adventures of Dib II: Dib's Wagon of Doom</strong> is now unlocked!",
        ending: { type: "true", title: "Wreck-Master of Dib's Fortress", xp: 90, gold: 85, trophy: "Dib's Soup-Pot Crown" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. ADVENTURES OF DIB II: DIB'S WAGON OF DOOM (7 PAGES • LV 2)
  // Part 2 of 2 (Prerequisite: bk_b2_dib_1)
  // ==========================================================
  bk_b2_dib_2: {
    id: "bk_b2_dib_2",
    reqQuest: "bk_b2_dib_1",
    title: "Adventures of Dib II: Dib's Wagon of Doom",
    subtitle: "Adventures of Dib (Part 2 of 2) • Rolling Goblin Juggernaut",
    difficulty: "Medium",
    recommendedLevel: 2,
    autoDiscover: false,
    discoverySource: "Unlocks after Adventures of Dib I",
    summary: "Dib Halfling-Chewer is back—rolling down the frontier highway in an armored, spike-wheeled mobile war-wagon! Board the Wagon of Doom and end Dib's roadside menace for good.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Frontier Highway",
        title: "That Goblin Again!",
        safeRetreat: true,
        text: "Rattling like a runaway blacksmith shop, a double-decker armored carriage covered in scrap iron, fireworks, and scythe-blades thunders down the road! From the crow's nest shrieks Dib Halfling-Chewer: 'BEHOLD DIB'S WAGON OF DOOM!'",
        choices: [
          { t: "Sprint alongside and leap onto the rear footboard!", badge: "Agility / Athletics DC 11", check: { stat: "agility", skill: "Athletics", dc: 11, pass: 2, fail: 2, failDmg: 4, passMsg: "You vault smoothly onto the rattling tailgate!", failMsg: "A spinning hub-spike grazes your shin (-4 HP) as you haul yourself aboard!" } },
          { t: "Toss a grappling hook onto the upper railing and swing aboard!", to: 2 }
        ]
      },
      2: {
        zone: "Wagon Lower Deck",
        title: "The Firework Crew",
        text: "Inside the rattling wooden belly, goblin sappers light sputtering alchemical rockets aimed out the arrow-slits!",
        enemy: { name: "Dib's Goblin Sappers", desc: "Reckless goblin grenadiers riding the lower deck.", hp: 22, ac: 11, atk: 4, dmg: 4, xp: 45, gold: 25, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1 },
        choices: [
          { t: "Sabotage the steering axle before climbing to the roof!", badge: "Might / Lockpicking DC 11", check: { stat: "might", skill: "Athletics", dc: 11, pass: 3, fail: 3, passMsg: "You wedge an iron crowbar into the gear-box—the juggernaut lurches!", failMsg: "The axle shakes too violently to jam." }, onPass: { cw: "AXLE_JAMMED", msg: "Jammed the Wagon of Doom's gears!" } },
          { t: "Climb the ladder straight to the armored roof!", to: 3 }
        ]
      },
      3: {
        zone: "Wagon Roof",
        title: "The Worg Draft-Drivers",
        text: "Two armored goblin whip-masters spur the snarling draft-worgs pulling the juggernaut through the trees!",
        enemy: { name: "Goblin Outrider & Draft-Worg", desc: "Snarling worg beast and goblin driver.", hp: 25, ac: 12, atk: 4, dmg: 5, xp: 55, gold: 30, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), flee: 2 },
        choices: [
          { t: "Climb up to Dib's Iron Crow's Nest!", to: 4 }
        ]
      },
      4: {
        zone: "The Crow's Nest",
        title: "Dib's Final Contraption",
        text: "Wearing goggles and a tin-plate breastplate, Dib Halfling-Chewer cranks a multi-barrel crossbow bolted to the roof! 'This time Dib wins! Taste the Wagon of Doom!'",
        enemy: { name: "Dib, Captain of the Wagon of Doom", desc: "Armored goblin mastermind firing his homemade repeater.", hp: 30, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 55, items: rollRandomLoot(["weapon", "accessory"], 1, "rare"), weakCw: ["AXLE_JAMMED"] },
        choices: [
          { t: "Cut the worg harnesses and pull the emergency brake!", to: 5 }
        ]
      },
      5: {
        zone: "Ditch of Doom",
        title: "Crash Landing",
        text: "The Wagon of Doom slews sideways into a soft haystack in a shower of harmless sparks and flying cabbages, pinning a groaning Dib safely beneath his own tin banner.",
        choices: [
          { t: "Tie up Dib and hand him over to the Oakhaven watch.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Gate",
        title: "Peace on the Highway",
        text: "The watch captain shakes her head laughing as Dib insists his next wagon will fly. Merchants gladly pool a handsome bounty for clearing the road.",
        choices: [
          { t: "Collect your reward!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Doom Defeated",
        text: "Trade caravans roll safely along the frontier once more, and children in Oakhaven reenact your wild rooftop duel atop Dib's Wagon of Doom.",
        ending: { type: "true", title: "Nemesis of Dib Halfling-Chewer", xp: 125, gold: 120, trophy: "Brass Hubcap of Doom" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. AN ENIGMA LOST IN A MAZE I: OCCUPIED ROSHGAZI (8 PAGES • LV 6)
  // Part 1 of 3
  // ==========================================================
  bk_b2_enigma_1: {
    id: "bk_b2_enigma_1",
    title: "An Enigma Lost in a Maze I: Occupied Roshgazi",
    subtitle: "Enigma of Roshgazi (Part 1 of 3) • Temple of Hecate & The Enigma",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Minotaur Keepers of the Maze (Oakhaven Guildhall)",
    summary: "Journey to the shattered minotaur capital of Roshgazi in the Southlands, consult the Temple of Hecate, and solve the Enigma guarding the safest entrance to the mad First Labyrinth.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Ruins of Roshgazi",
        title: "City of the Fallen Moon",
        safeRetreat: true,
        text: "Three centuries ago, Mharoti dragons shattered Roshgazi—yet the magical First Labyrinth beneath its streets still lives, now growing dangerously mad. Minotaur keepers have entrusted you with an arcane curative to heal the Heart of Roshgazi before a hungry dragon claims it.",
        choices: [
          { t: "Slip past the Mharoti kobold patrols toward the Temple of Hecate.", badge: "Stealth DC 13", check: { stat: "agility", skill: "Stealth", dc: 13, pass: 2, fail: 2, failDmg: 6, passMsg: "You ghost through the shattered colonnades unseen!", failMsg: "Kobold skirmishers harry you with sling-stones (-6 HP) before you lose them!" } },
          { t: "March boldly down the sun-baked boulevard to the Temple.", to: 2 }
        ]
      },
      2: {
        zone: "Occupied Boulevard",
        title: "Dragonkin Patrol",
        text: "Scaled Mharoti dragonkin soldiers and their kobold trackers block the plaza before the crossroads temple, demanding tribute in the name of their dragon mistress!",
        enemy: { name: "Mharoti Occupation Patrol", desc: "Armored dragonkin legionaries and kobold scouts.", hp: 48, ac: 14, atk: 7, dmg: 7, xp: 125, gold: 60, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Enter the torchlit sanctuary of the Temple of Hecate.", to: 3 }
        ]
      },
      3: {
        zone: "Temple of Hecate",
        title: "Crossroads of Three Masks",
        text: "Within the three-pillared shrine of Hecate, a blind minotaur oracle hands you a bronze key-tablet. 'The First Labyrinth connects every maze in the world,' she warns. 'Solve the Enigma of the Crossroads to enter near its Heart—and beware the dragon's spies!'",
        onEnter: { healHp: 12, cw: "HECATE_BLESSING", msg: "Received the Oracle's blessing (+12 HP) and the bronze key-tablet!" },
        choices: [
          { t: "Follow the oracle's map to the hidden Enigma Gate.", to: 4 }
        ]
      },
      4: {
        zone: "Sunken Courtyard",
        title: "The Enigma of Roshgazi",
        text: "Three revolving stone rings engraved with bull-horns, crescent moons, and dragon-claws seal the subterranean stair. A riddle asks which symbol first built the walls of Tes-Qamar.",
        choices: [
          { t: "Align the Crescent Moon and Minotaur Horns together!", badge: "Arcana / Lore DC 13", check: { stat: "arcana", skill: "Lore", dc: 13, pass: 5, fail: 5, failDmg: 7, passMsg: "The stone rings grind open cleanly, revealing the spiral descent!", failMsg: "A spectral ward-fist batters you (-7 HP) before the stone reluctantly parts!" }, onPass: { cw: "ENIGMA_SOLVED" } },
          { t: "Jam the bronze tablet straight into the central keyhole.", to: 5 }
        ]
      },
      5: {
        zone: "Labyrinth Threshold",
        title: "Rival Treasure Hunters",
        text: "Before you can descend, a band of ruthless dragon-cult mercs leaps from the ruined galleries to steal the curative vial!",
        enemy: { name: "Mharoti Relic-Hunters", desc: "Cutthroat mercenaries hired to seize the Heart of Roshgazi.", hp: 52, ac: 15, atk: 7, dmg: 8, xp: 140, gold: 75, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 3 },
        choices: [
          { t: "Secure the curative vial and step onto the threshold of the First Labyrinth!", to: 6 }
        ]
      },
      6: {
        zone: "Stair of Whispers",
        title: "The Living Walls",
        text: "Behind you, the stone walls shift with a deep groan—Roshgazi's ancient maze knows you have arrived.",
        choices: [
          { t: "Check your gear and prepare to enter the Four Mazes in Part II.", to: 7 }
        ]
      },
      7: {
        zone: "Threshold Alcove",
        title: "Camp Before the Storm",
        text: "You carve a safe chalk mark beside the bronze archway and study the oracle's parchment for the shifting corridors ahead.",
        choices: [
          { t: "Complete Part I and unlock Part II: The First Labyrinth!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Gate to the World-Maze",
        text: "You have pierced the Mharoti occupation and unlocked the Enigma of Roshgazi! <strong>An Enigma Lost in a Maze II: The First Labyrinth</strong> is now unlocked!",
        ending: { type: "true", title: "Solver of the Roshgazi Enigma (Part I)", xp: 210, gold: 185, trophy: "Hecate's Crossroads Key" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. AN ENIGMA LOST IN A MAZE II: THE FIRST LABYRINTH (9 PAGES • LV 6)
  // Part 2 of 3 (Prerequisite: bk_b2_enigma_1)
  // ==========================================================
  bk_b2_enigma_2: {
    id: "bk_b2_enigma_2",
    reqQuest: "bk_b2_enigma_1",
    title: "An Enigma Lost in a Maze II: The First Labyrinth",
    subtitle: "Enigma of Roshgazi (Part 2 of 3) • The Four Living Mazes",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Unlocks after An Enigma Lost in a Maze I",
    summary: "Survive the four twisted layers of the mad First Labyrinth—The Façade, Streets of Kaptaria, Face of Broken, and Heart of Roshgazi—and administer the curative to the living world-maze.",
    totalPages: 9,
    pages: {
      1: {
        zone: "First Maze: The Façade",
        title: "Hall of False Doors",
        safeRetreat: true,
        text: "Stone corridors fold impossibly back upon themselves! A Biting Sphere of Baal rolls silently down the marble passage toward you!",
        choices: [
          { t: "Dive through a narrow side-arch before the biting sphere crushes you!", badge: "Agility DC 13", check: { stat: "agility", skill: "Acrobatics", dc: 13, pass: 2, fail: 2, failDmg: 7, passMsg: "You roll cleanly into the next corridor!", failMsg: "Stone jaws snap your cloak and shoulder (-7 HP)!" } },
          { t: "Trace the minotaur builder's chisel-marks to find the true path.", badge: "Perception / Survival DC 13", check: { stat: "spirit", skill: "Perception", dc: 13, pass: 2, fail: 2, passMsg: "You spot the safe archway leading to Kaptaria!", failMsg: "The maze twists unpredictably around you." }, onPass: { cw: "MAZE_ATTUNED" } }
        ]
      },
      2: {
        zone: "Second Maze: Streets of Kaptaria",
        title: "Phantoms of the Tannery",
        text: "Suddenly you stand on phantom cobbled streets pulled from a distant city! Spectral Fists erupt from the brickwork alongside twisted Minotaur Shades driven mad by the cracked Heart!",
        enemy: { name: "Maddened Labyrinth Shades", desc: "Lost echoes of ancient minotaur guardians.", hp: 54, ac: 15, atk: 8, dmg: 8, undead: true, xp: 150, gold: 70, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Cross the shimmering archway into the Third Maze.", to: 3 }
        ]
      },
      3: {
        zone: "Third Maze: The Face of Broken",
        title: "Breath of Broken",
        text: "A colossal carved stone face weeps luminous dust across a shattered chasm. Every few heartbeats, it exhales a gale of petrifying grit!",
        choices: [
          { t: "Time the stone face's breath and sprint across the narrow span!", badge: "Athletics / Survival DC 14", check: { stat: "might", skill: "Athletics", dc: 14, pass: 4, fail: 4, failDmg: 8, passMsg: "You clear the chasm just as the gale roars behind you!", failMsg: "Choking stone-dust scours your lungs (-8 HP)!" } },
          { t: "Channel arcane energy to calm the carved visage.", badge: "Arcana DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 4, fail: 4, failDmg: 6, passMsg: "The weeping face stills, granting clear passage!", failMsg: "The magic fractures (-6 HP), though the wind briefly dies." } }
        ]
      },
      4: {
        zone: "Third Maze: Broken Gallery",
        title: "Guardians of the Crack",
        text: "Crystalline maze-constructs born from the Labyrinth's feverish delirium rise from the shattered tiles to bar your path!",
        enemy: { name: "Fractured Maze Constructs", desc: "Jagged living stone guardians warped by the Heart's madness.", hp: 56, ac: 15, atk: 8, dmg: 9, xp: 160, gold: 80, items: rollRandomLoot(["valuable", "material"], 1, "very_rare"), flee: 3 },
        choices: [
          { t: "Enter the pulsing Fourth Maze: The Heart of Roshgazi!", to: 5 }
        ]
      },
      5: {
        zone: "Fourth Maze: Heart of Roshgazi",
        title: "The Cracked World-Core",
        text: "In a vast domed chamber hovers a giant faceted crystal pulsing like a fevered heart—hairline fractures spilling chaotic light across the floor. Beside it rests an ancient wayfinder compass!",
        onEnter: { items: ["bq_roshgazi_compass"], msg: "Recovered the Compass of the First Labyrinth!" },
        choices: [
          { t: "Pour the minotaur keepers' curative into the cracked crystal heart!", to: 6 }
        ]
      },
      6: {
        zone: "Heart of Roshgazi",
        title: "The Fever Breaks",
        text: "As the golden curative seals the fractures, a raging manifestation of the maze's 300-year madness tears free as a Living Labyrinth Elemental!",
        enemy: { name: "Avatar of the Mad Maze", desc: "Chaotic stone-and-starlight manifestation expelled from the Heart.", hp: 64, ac: 15, atk: 8, dmg: 9, xp: 195, gold: 120, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["MAZE_ATTUNED"] },
        choices: [
          { t: "Watch the Heart of Roshgazi pulse with calm, steady silver light!", to: 7 }
        ]
      },
      7: {
        zone: "Heart of Roshgazi",
        title: "A Draconic Roar Above",
        text: "The maze is healed—yet the ceiling stones tremble violently! A triumphant draconic roar echoes down the opened stairwell: the Mharoti dragon has found the path to the Heart!",
        choices: [
          { t: "Prepare to face the dragon in Part III!", to: 8 }
        ]
      },
      8: {
        zone: "Healed Sanctum",
        title: "The Maze's Gratitude",
        text: "Gentle silver light mends your wounds as the restored First Labyrinth opens a direct shortcut to the surface ruins.",
        choices: [
          { t: "Complete Part II and unlock Part III: Facing the Dragon!", to: 9 }
        ]
      },
      9: {
        zone: "Epilogue",
        title: "Heart Mended",
        text: "The First Labyrinth is cured—now only the hungry Mharoti dragon stands between Roshgazi and freedom! <strong>An Enigma Lost in a Maze III: Facing the Dragon</strong> is now unlocked!",
        ending: { type: "true", title: "Healer of the First Labyrinth (Part II)", xp: 245, gold: 215, trophy: "Silver Shard of Roshgazi" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. AN ENIGMA LOST IN A MAZE III: FACING THE DRAGON (7 PAGES • LV 7)
  // Part 3 of 3 (Prerequisite: bk_b2_enigma_2)
  // ==========================================================
  bk_b2_enigma_3: {
    id: "bk_b2_enigma_3",
    reqQuest: "bk_b2_enigma_2",
    title: "An Enigma Lost in a Maze III: Facing the Dragon",
    subtitle: "Enigma of Roshgazi (Part 3 of 3) • Showdown for the Heart",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Unlocks after An Enigma Lost in a Maze II",
    summary: "Defend the newly healed Heart of Roshgazi from the ambitious Mharoti dragon and her kobold legions before she tears the power of the world-maze loose.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Shattered Plaza",
        title: "Wings Over Roshgazi",
        safeRetreat: true,
        text: "Emerging from the healed labyrinth into the moonlit amphitheater of Roshgazi, you face a wall of torch-bearing kobold zealots—and circling above the broken dome is the gleaming Mharoti dragon who covets the Heart!",
        choices: [
          { t: "Use the Compass of the First Labyrinth to summon a protective stone ward!", to: 2, onChoose: { cw: "LABYRINTH_AID", healHp: 12, msg: "The healed maze raises lunar pillars to shield you (+12 HP)!" } },
          { t: "Charge straight into the kobold vanguard!", to: 2 }
        ]
      },
      2: {
        zone: "Moonlit Amphitheater",
        title: "The Kobold Host",
        text: "Fanatical dragon-sworn kobolds and flame-wielding drake-knights rush to pin you down before their mistress lands!",
        enemy: { name: "Mharoti Dragon-Sworn Host", desc: "Zealous kobold archers and armored dragonkin vanguard.", hp: 60, ac: 15, atk: 8, dmg: 9, xp: 175, gold: 90, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Stand your ground as the dragon crashes down onto the marble tiles!", to: 3 }
        ]
      },
      3: {
        zone: "Roshgazi Amphitheater",
        title: "Breath of the Mharoti",
        text: "With a thunderous beat of leathery wings, the ambitious Mharoti dragon alights atop the labyrinth entrance! 'You healed the Heart just in time for me to claim it, little mortal! Kneel or burn!'",
        enemy: { name: "Mharoti Flame-Dragon", desc: "Ambitious young dragon seeking dominion over the First Labyrinth.", hp: 76, ac: 16, atk: 9, dmg: 11, xp: 260, gold: 195, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["LABYRINTH_AID"] },
        choices: [
          { t: "Drive the wounded dragon from the skies of Roshgazi!", to: 4 }
        ]
      },
      4: {
        zone: "Moonlit Amphitheater",
        title: "Flight of the Tyrant",
        text: "Battered and roaring in fury, the Mharoti dragon abandons the plaza and flees toward the desert horizon as her kobold minions scatter!",
        choices: [
          { t: "Meet the emerging Minotaur Keepers at the Temple of Hecate.", to: 5 }
        ]
      },
      5: {
        zone: "Temple of Hecate",
        title: "The Keepers Return",
        text: "The minotaur keepers bow deeply as silver light stabilizes across every maze in Midgard. They open their hidden treasury in honor of your courage.",
        choices: [
          { t: "Claim the gratitude of Tes-Qamar's heirs.", to: 6 }
        ]
      },
      6: {
        zone: "Southlands Road",
        title: "Journey Home",
        text: "Every labyrinth along the trade roads now bends gently to guide your steps safely back to Oakhaven.",
        choices: [
          { t: "Complete the Enigma of Roshgazi saga!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Champion of the First Labyrinth",
        text: "The Heart of Roshgazi beats whole once more, and your name is etched into the bronze pillars of the minotaur keepers forever.",
        ending: { type: "true", title: "Savior of Roshgazi (Enigma Complete)", xp: 300, gold: 290, trophy: "Golden Bull-Seal of Tes-Qamar" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. BLOOD VAULTS OF SISTER ALKAVA (8 PAGES • LV 5)
  // ==========================================================
  bk_b2_sister_alkava: {
    id: "bk_b2_sister_alkava",
    title: "Blood Vaults of Sister Alkava",
    subtitle: "Midgard Side-Trek • The Red Goddess's Sanguine Crypts",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Elders of Karvolia (Temple of the Dawn)",
    summary: "Investigate why none of the blood-tribute donors from the village of Karvolia returned from the Festival of the Verdant Tower, and descend into the sinister Blood Vaults of Sister Alkava.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Village of Karvolia",
        title: "A Second Tribute Demanded",
        safeRetreat: true,
        text: "The frightened elders of Karvolia beg for your aid: none of the villagers sent to pay the annual blood tribute to Sister Alkava of the Red Goddess ever returned—and now she demands a dozen more! Following the red-lantern trail leads to an iron crypt set into a wooded hill.",
        choices: [
          { t: "Examine the crimson-wax seal on the Blood Vault doors.", badge: "Arcana / Perception DC 12", check: { stat: "arcana", skill: "Arcana", dc: 12, pass: 2, fail: 2, passMsg: "Necromantic storage magic! Alkava is siphoning power from sacred Blood Cauldrons.", failMsg: "The dark wax smells strongly of iron and incense." }, onPass: { cw: "CAULDRON_LORE", msg: "Learned of Alkava's Blood Cauldrons!" } },
          { t: "Push open the iron doors and descend into the Blood Vaults.", to: 2 }
        ]
      },
      2: {
        zone: "Outer Vault",
        title: "The Blood Pudding",
        text: "Crimson channels run along the vaulted floor toward a bubbling central drain. Suddenly, a glistening, acidic mass of congealed crimson rises from the basin—a Blood Pudding!",
        enemy: { name: "Sanguine Blood Pudding", desc: "Heaving necrotic ooze born from Alkava's experiments.", hp: 42, ac: 13, atk: 6, dmg: 7, xp: 105, gold: 45, items: rollRandomLoot(["material", "consumable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Advance past the storage alcoves to the Holding Cells.", to: 3 }
        ]
      },
      3: {
        zone: "Holding Cells",
        title: "Blood Zombies",
        text: "Iron cages line the damp corridor—several Karvolia villagers still breathe inside, weak and pale! Guarding the keys shamblers of crimson-drenched undead lurch forward!",
        enemy: { name: "Alkava's Blood Zombies", desc: "Necromantic corpses animated by stolen lifeblood.", hp: 44, ac: 14, atk: 7, dmg: 7, undead: true, xp: 115, gold: 50, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 2 },
        choices: [
          { t: "Unlock the cages and guide the surviving villagers to the stairs!", to: 4, onChoose: { cw: "VILLAGERS_SAVED", healHp: 10, msg: "Freed the surviving Karvolia donors and tended your wounds (+10 HP)!" } }
        ]
      },
      4: {
        zone: "Cauldron Gallery",
        title: "The Sacred Blood Cauldrons",
        text: "Three rune-etched bronze cauldrons bubble with eerie ruby light, funneling raw power into the inner sanctum. Overturning one will severely weaken Sister Alkava!",
        choices: [
          { t: "Heave over the central Blood Cauldron!", badge: "Might DC 13", check: { stat: "might", skill: "Athletics", dc: 13, pass: 5, fail: 5, failDmg: 6, passMsg: "The bronze cauldron crashes down—the ruby runes flicker out!", failMsg: "Scalding necrotic mist burns your forearms (-6 HP) as it tips!" }, onPass: { cw: "CAULDRON_TOPPLES" } },
          { t: "Slip quietly into the Inner Sanctum to surprise Alkava.", to: 5 }
        ]
      },
      5: {
        zone: "Inner Blood Sanctum",
        title: "Sister Alkava of the Red Goddess",
        text: "Intoxicated by the forbidden power she hid from her own priesthood, Sister Alkava floats inches above a crimson altar, eyes glowing ruby! 'You dare interrupt my ascension?! Your veins will fill the next cauldron!'",
        enemy: { name: "Sister Alkava", desc: "Power-drunk blood priestess of the Red Goddess.", hp: 56, ac: 15, atk: 8, dmg: 8, xp: 175, gold: 120, items: ["bq_alkava_chalice"], weakCw: ["CAULDRON_LORE", "CAULDRON_TOPPLES"] },
        choices: [
          { t: "Purify the altar and collapse the profane Blood Vaults.", to: 6 }
        ]
      },
      6: {
        zone: "Wooded Hill",
        title: "Clean Air at Last",
        text: "You emerge into cool evening air carrying the purified silver chalice as the crimson glow inside the crypt dies forever.",
        choices: [
          { t: "Escort the rescued donors back to Karvolia.", to: 7 }
        ]
      },
      7: {
        zone: "Village of Karvolia",
        title: "Tears of Relief",
        text: "Families reunite in the village square, and the elders insist you accept their saved treasury for sparing Karvolia from Alkava's madness.",
        choices: [
          { t: "Return to Oakhaven with honor.", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Breaker of the Blood Vaults",
        text: "Even the Red Goddess's superiors disavow Alkava's rogue experiments, leaving Karvolia safe under your watchful renown.",
        ending: { type: "true", title: "Deliverer of Karvolia", xp: 215, gold: 195, trophy: "Crimson Seal of Karvolia" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. CAT AND MOUSE (8 PAGES • LV 1)
  // ==========================================================
  bk_b2_cat_and_mouse: {
    id: "bk_b2_cat_and_mouse",
    title: "Cat and Mouse",
    subtitle: "Southlands Adventure • Per-Bastet & The Grimalkin Eye",
    difficulty: "Easy",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Desert Caravan Messenger (Rusty Flagon Tavern)",
    summary: "Dive into the sun-drenched bazaars of Per-Bastet, the Everlasting City of the Cat, where catfolk thief Mistress Henna Mjelidi and a sly gnoll merchant both hunt the legendary Grimalkin Eye.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Per-Bastet • River of Sand",
        title: "New Friends in the Bazaar",
        safeRetreat: true,
        text: "Through the glittering heart of Per-Bastet flows the dry River of Sand before plunging into the vast Pit. Rumor whispers a priceless 'sand-touched' artifact—the Grimalkin Eye, capable of fascinating any cat—just washed ashore! Both catfolk thief Mistress Henna Mjelidi and a grinning gnoll spice-merchant offer you coin to fetch it first.",
        choices: [
          { t: "Hear out Mistress Henna Mjelidi's streetwise lead.", to: 2, onChoose: { cw: "HENNA_LEAD", msg: "Henna points you toward the Perfume District's spice-alleys!" } },
          { t: "Accept the gnoll merchant's map to the Perfume District.", to: 2, onChoose: { cw: "GNOLL_LEAD", gold: 15, msg: "The gnoll slips you 15 GP advance coin!" } }
        ]
      },
      2: {
        zone: "The Perfume District",
        title: "Alley of Saffron & Claws",
        text: "Head-spinning scents of myrrh and rosewater fill the winding awnings. Suddenly, a gang of rival alley-thugs corners you beside a fountain of sleeping temple cats!",
        enemy: { name: "Perfume District Cutpurses", desc: "Nimble street thieves hunting the Grimalkin Eye.", hp: 16, ac: 10, atk: 3, dmg: 3, xp: 35, gold: 20, items: rollRandomLoot(["consumable", "valuable"], 1, "common"), flee: 1 },
        choices: [
          { t: "Follow the trail of sand-touched footprints toward the Pit's rim.", to: 3 }
        ]
      },
      3: {
        zone: "Edge of the Pit",
        title: "The Sand-Touched Cache",
        text: "Down a crumbling sandstone terrace overlooking the swirling Pit, an amber gem shaped like a cat's slit-pupil glints inside a broken clay amphora—surrounded by mesmerized feral alley-cats!",
        choices: [
          { t: "Offer dried fish and calm words to soothe the enchanted cats.", badge: "Spirit / Survival DC 10", check: { stat: "spirit", skill: "Survival", dc: 10, pass: 4, fail: 4, failDmg: 3, passMsg: "The cats purr and part politely as you lift the Grimalkin Eye!", failMsg: "Hissing claws scratch your wrists (-3 HP) as you snatch the amber gem!" } },
          { t: "Vault swiftly over the amphora and snag the Eye!", badge: "Agility DC 10", check: { stat: "agility", skill: "Acrobatics", dc: 10, pass: 4, fail: 4, failDmg: 3, passMsg: "Clean grab—not a single scratch!", failMsg: "Loose sand slides underfoot (-3 HP) as you grab the gem!" } }
        ]
      },
      4: {
        zone: "Rooftop Awning",
        title: "Three Sides to Every Story",
        text: "The moment the Grimalkin Eye touches your palm, both Mistress Henna's crew and the gnoll merchant's hyena-handlers leap onto the bazaar rooftops demanding you hand it over!",
        enemy: { name: "Gnoll Enforcer & Hyena", desc: "Treacherous gnoll bruiser trying to seize the relic.", hp: 20, ac: 11, atk: 4, dmg: 4, xp: 50, gold: 30, items: ["bq_grimalkin_eye"] },
        choices: [
          { t: "Return the Grimalkin Eye's guardianship to Bastet's temple priests (keep its blessing).", to: 5, onChoose: { cw: "BASTET_BLESSED", msg: "The priests of Bastet reward your honor with gold and a charm!" } },
          { t: "Strike a clever deal with Mistress Henna to split the finder's fee.", to: 5, onChoose: { gold: 35, msg: "Henna laughs in delight and shares 35 GP!" } }
        ]
      },
      5: {
        zone: "Temple of Bastet",
        title: "Purr of the Everlasting City",
        text: "Temple bells chime across the sunlit domes as order returns to the Perfume District. Every alley cat in sight dips its head as you pass.",
        choices: [
          { t: "Celebrate with chilled date-wine in the grand bazaar.", to: 6 }
        ]
      },
      6: {
        zone: "Grand Bazaar",
        title: "Sand-Touched Luck",
        text: "Caravan masters admire your deft handling of Per-Bastet's intrigue and offer free passage back north.",
        choices: [
          { t: "Collect your reward and depart Per-Bastet.", to: 7 }
        ]
      },
      7: {
        zone: "Nuria Caravan",
        title: "Tales of the Cat City",
        text: "You ride home with jingling coin and the lingering luck of the River of Sand.",
        choices: [
          { t: "Finish the adventure!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Friend of Per-Bastet",
        text: "Whether praised by Bastet's priests or toasted by Mistress Henna, your clever game of Cat and Mouse earns lasting fame.",
        ending: { type: "true", title: "Cunning of Per-Bastet", xp: 95, gold: 90, trophy: "Golden Cat Scarab" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 12. CAVERNS OF THE SPORE LORD (8 PAGES • LV 1)
  // ==========================================================
  bk_b2_spore_lord: {
    id: "bk_b2_spore_lord",
    title: "Caverns of the Spore Lord",
    subtitle: "Tales of the Valiant • Hulgig & Subterranean Bellgrove",
    difficulty: "Easy",
    recommendedLevel: 1,
    autoDiscover: false,
    discoverySource: "Hulgig Longhouse Runner (Oakhaven Outskirts)",
    summary: "Save the spore-stricken hamlet of Hulgig, descend into the glowing underground caverns of the mycolid village of Bellgrove, and cure or defeat the infected Spore Lord Enok in the Fungal Garden.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Hamlet of Hulgig",
        title: "The Quiet Village",
        safeRetreat: true,
        text: "An eerie hush hangs over the timber hamlet of Hulgig. Violet puffballs sprout from fenceposts, and shambling townsfolk crusted in glowing fungi—Sporeborn—lurch out of the mist toward the barricaded village longhouse!",
        enemy: { name: "Hulgig Sporeborn", desc: "Fungal-infected husks wandering the hamlet.", hp: 16, ac: 10, atk: 3, dmg: 3, xp: 35, gold: 15, items: rollRandomLoot(["consumable", "material"], 1, "common"), flee: 1 },
        choices: [
          { t: "Speak with the terrified survivors inside the longhouse and follow the spore trail into the caverns.", to: 2 }
        ]
      },
      2: {
        zone: "Trapped Cavern",
        title: "Dusstan's Folly",
        text: "Descending into the damp limestone tunnels beneath Hulgig, you spot an old swinging log-trap and concealed pit dug by paranoid explorers.",
        choices: [
          { t: "Spot and jam the pit cover with an iron spike.", badge: "Perception DC 10", check: { stat: "spirit", skill: "Perception", dc: 10, pass: 3, fail: 3, failDmg: 3, passMsg: "You wedge the pit shut and cross safely!", failMsg: "The false floor gives way—you drop ten feet (-3 HP) before climbing out!" } },
          { t: "Skirt along the glowing mushroom ledge into the Abandoned City.", to: 3 }
        ]
      },
      3: {
        zone: "Bellgrove Cavern",
        title: "The Barricaded Mycolids",
        text: "Behind a wall of woven fungal-wood stands Bellgrove, home of peaceful mushroom-folk called mycolids! Their elders explain through gentle spore-telepathy that their beloved leader, Enok, succumbed to the aggressive contagion and sealed themselves inside the Fungal Garden.",
        onEnter: { healHp: 8, cw: "BELLGROVE_ALLY", items: ["bq_spore_lord_cap"], msg: "The Bellgrove mycolids heal your wounds (+8 HP) and gift you a Bellgrove Mycolid Charm!" },
        choices: [
          { t: "Navigate the Gloomy Waterway toward the collapsed Fungal Garden.", to: 4 }
        ]
      },
      4: {
        zone: "Gloomy Waterway",
        title: "Subterranean Ambush",
        text: "Phosphorescent ripples shimmer across a dark underground stream as aggressive Cave Beetles and Sporeborn guards burst from the fungal banks!",
        enemy: { name: "Waterway Sporeborn & Beetles", desc: "Contagion-maddened cavern scavengers.", hp: 18, ac: 11, atk: 3, dmg: 3, xp: 40, gold: 20, items: rollRandomLoot(["material", "consumable"], 1, "uncommon"), flee: 3 },
        choices: [
          { t: "Pass Hero's Rest and clear the rubble sealing the Fungal Garden.", to: 5 }
        ]
      },
      5: {
        zone: "The Fungal Garden",
        title: "Enok, The Spore Lord",
        text: "Towering bioluminescent toadstools illuminate the vaulted garden. At its center stands Enok—swollen with virulent violet spores, weeping telepathically even as the contagion drives them to attack! 'End this blight... save Bellgrove!'",
        enemy: { name: "Enok, Corrupted Spore Lord", desc: "Infected mycolid leader wracked by the virulent fungal blight.", hp: 23, ac: 11, atk: 4, dmg: 4, xp: 60, gold: 40, items: rollRandomLoot(["consumable", "valuable"], 1, "uncommon"), weakCw: ["BELLGROVE_ALLY"] },
        choices: [
          { t: "Burn away the virulent violet core so the clean spores can regrow!", to: 6 }
        ]
      },
      6: {
        zone: "Bellgrove Cavern",
        title: "The Contagion Breaks",
        text: "With the blighted core cleansed, the aggressive violet spores dissolve into harmless golden dust. Above ground, the survivors of Hulgig cheer as the haze clears from their fields.",
        choices: [
          { t: "Accept the joint gratitude of Bellgrove and Hulgig.", to: 7 }
        ]
      },
      7: {
        zone: "Hulgig Longhouse",
        title: "A New Alliance",
        text: "The elders of Hulgig and the mycolids of Bellgrove pledge mutual trade and peace beneath the hills.",
        choices: [
          { t: "Return to Oakhaven with your reward!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Cleanser of the Spore Caverns",
        text: "Both surface-dwellers and underground mycolids honor your mercy and courage in saving Hulgig and Bellgrove.",
        ending: { type: "true", title: "Savior of Bellgrove", xp: 100, gold: 95, trophy: "Luminous Bellgrove Spore-Crystal" },
        choices: []
      }
    }
  }
});
