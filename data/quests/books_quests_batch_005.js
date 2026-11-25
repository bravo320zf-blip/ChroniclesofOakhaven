/* ============================================================
   BOOK QUESTS — BATCH 005 (13 Quests • 4-Act Campaign + 9 Lairs)
   Sources:
   - Courts of the Shadow Fey (Acts I–IV — Complete 4-Part Series)
   - Creature Codex Lairs (All 9 Lairs incl. 2-Part A Rat Among Us — Complete)
   ============================================================ */
window.OAKHAVEN.registerQuests({
  // ==========================================================
  // 1. COURTS OF THE SHADOW FEY I: A CHILL IN THE AIR (8 PAGES • LV 7)
  // Part 1 of 4
  // ==========================================================
  bk_b5_shadow_fey_1: {
    id: "bk_b5_shadow_fey_1",
    title: "Courts of the Shadow Fey I: A Chill in the Air",
    subtitle: "Courts of the Shadow Fey (Part 1 of 4) • Zobeck & The Niflheim Road",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Free City Council of Zobeck (Oakhaven Guildhall)",
    summary: "When the Winter Court declares House Stross's ancient pact void and claims the Free City of Zobeck, track the Shadow Fey's hidden ambassador, defeat Thuvis Cloudshadow on the Niflheim Road, and shatter the Moebius shadowstone to reach the Shadow Realm.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Free City of Zobeck",
        title: "The Assassination",
        safeRetreat: true,
        text: "An unnatural frost blankets Zobeck as a Shadow Fey envoy declares the merchant council illegitimate: 'With House Stross gone, the city reverts to the Moonlit King and Queen of Night and Magic!' Moments later, black-clad fey assassins strike the council hall!",
        enemy: { name: "Shadow Fey Envoy's Assassins", desc: "Aristocratic elven killers delivering the Winter Court's ultimatum.", hp: 58, ac: 15, atk: 8, dmg: 9, xp: 170, gold: 80, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Track the Hidden Ambassador's trail through the chill city streets.", to: 2 }
        ]
      },
      2: {
        zone: "Clockwork Quarter",
        title: "Seeking the Hidden Ambassador",
        text: "Whispering informants point toward an abandoned cellar where the Shadow Fey maintain a concealed Shadow Road gateway—guarded by baying umbral hounds!",
        choices: [
          { t: "Decode the chalk shadow-sigils on the cellar archway.", badge: "Arcana / Perception DC 14", check: { stat: "arcana", skill: "Arcana", dc: 14, pass: 3, fail: 3, passMsg: "You learn the Shadow Road ritual phrase and spot the ambush ahead!", failMsg: "Frosty shadows coil around the stones without yielding their secret." }, onPass: { cw: "SHADOW_ROAD_RITE" } },
          { t: "Force open the frost-rimmed door and face the Dogs at the Door.", to: 3 }
        ]
      },
      3: {
        zone: "The Niflheim Shadow Road",
        title: "Thuvis Cloudshadow & The Darkstone Sculptor",
        text: "Stepping through the planar veil onto the twisting Niflheim Shadow Road, you find the way sealed in a topological loop by Thuvis Cloudshadow, a Darkstone Sculptor, and brutal Shadowrock Renders!",
        enemy: { name: "Thuvis Cloudshadow & Darkstone Sculptor", desc: "Shadow fey ambusher and stone-shaping planar guardian.", hp: 74, ac: 16, atk: 9, dmg: 11, xp: 255, gold: 165, items: ["bq_sarastra_cameo"], weakCw: ["SHADOW_ROAD_RITE"] },
        choices: [
          { t: "Smash the twisted Moebius shadowstone to break the road's prison!", to: 4 }
        ]
      },
      4: {
        zone: "The Niflheim Road",
        title: "Path to the Shadow Courts",
        text: "The Moebius stone shatters in violet sparks, uncoiling the endless road straight toward the glittering spires of the Shadow Courts! In your hand gleams a priceless mithral-and-onyx cameo of Queen Sarastra.",
        choices: [
          { t: "Step through the silver mist into the Invisible Courts.", to: 5 }
        ]
      },
      5: {
        zone: "Border of Shadow",
        title: "A Fey Welcome",
        text: "Lantern-lit pavilions drift above a dark sea of pines. Here, Status is sharper than any blade—you must win prestige among the nobles to save Zobeck.",
        choices: [
          { t: "Prepare for Act II: The Invisible Courts!", to: 6 }
        ]
      },
      6: {
        zone: "Court Outskirts",
        title: "Council's Hope",
        text: "You tuck Zobeck's diplomatic charter safely inside your coat.",
        choices: [
          { t: "Rest briefly at the edge of the Shadow Road.", to: 7, onChoose: { healHp: 12, msg: "Caught your breath at the planar threshold (+12 HP)." } }
        ]
      },
      7: {
        zone: "Threshold of Night",
        title: "Act I Complete",
        text: "The Invisible Courts await your arrival.",
        choices: [
          { t: "Complete Act I and unlock Act II!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Into the Shadow Realm",
        text: "You have broken the blockade on the Niflheim Road! <strong>Courts of the Shadow Fey II: The Invisible Courts</strong> is now unlocked!",
        ending: { type: "true", title: "Envoy of Zobeck (Act I)", xp: 285, gold: 260, trophy: "Moebius Shadowstone Shard" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 2. COURTS OF THE SHADOW FEY II: THE INVISIBLE COURTS (8 PAGES • LV 8)
  // Part 2 of 4 (Prerequisite: bk_b5_shadow_fey_1)
  // ==========================================================
  bk_b5_shadow_fey_2: {
    id: "bk_b5_shadow_fey_2",
    reqQuest: "bk_b5_shadow_fey_1",
    title: "Courts of the Shadow Fey II: The Invisible Courts",
    subtitle: "Courts of the Shadow Fey (Part 2 of 4) • Status, Duels & Lords of Light",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Unlocks after Courts of the Shadow Fey I",
    summary: "Climb the treacherous social ladder of the Shadow Courts, resist a succubus's courtly seduction, best arrogant Baron Suvid in a formal duel, and earn the Lords of Light's glowing Lantern Dragonette.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Pavilion of Whispers",
        title: "Elitism as Weaponry",
        safeRetreat: true,
        text: "Masked fey courtiers sneer at mortal envoys until you present Queen Sarastra's mithral cameo! Instantly, whispers ripple through the ballroom—and a velvet-clad courtesan invites you to a private balcony while Baron Suvid glares jealously.",
        choices: [
          { t: "See through the courtesan's demonic glamour before drinking her wine!", badge: "Spirit / Perception DC 14", check: { stat: "spirit", skill: "Perception", dc: 14, pass: 2, fail: 2, failDmg: 8, passMsg: "A succubus spy! Exposing her publicly sends your Court Status soaring!", failMsg: "Her draining kiss saps your vigor (-8 HP) before you shove her back!" }, onPass: { cw: "SUCCUBUS_EXPOSED" } },
          { t: "Decline the wine politely and seek audience with the Lords of Light.", to: 2 }
        ]
      },
      2: {
        zone: "Bridge of Moons",
        title: "Baron Suvid's Duel",
        text: "Outraged by a mortal rising in Status, arrogant Baron Suvid slaps his silver glove across the marble balustrade! 'Defend your insolence at blade's point, creature of clay!'",
        enemy: { name: "Baron Suvid of the Shadow Court", desc: "Haughty shadow fey duelist defending aristocratic pride.", hp: 74, ac: 16, atk: 9, dmg: 10, xp: 240, gold: 135, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["SUCCUBUS_EXPOSED"] },
        choices: [
          { t: "Accept the courtiers' stunned applause and climb the Tower of the Lords of Light!", to: 3 }
        ]
      },
      3: {
        zone: "Tower of the Lords of Light",
        title: "Trial of True Sight",
        text: "Within the luminous spire, the enigmatic Lords of Light test whether a mortal can bear unblinking truth amid courtly illusion—and summon a shimmering Astral Sentinel to weigh your resolve!",
        enemy: { name: "Lords of Light Trial-Keeper", desc: "Radiant fey construct testing applicants for high Status.", hp: 78, ac: 16, atk: 10, dmg: 11, xp: 270, gold: 160, items: ["bq_lantern_dragonette"] },
        choices: [
          { t: "Receive the glowing halo of dim light and your Lantern Dragonette!", to: 4 }
        ]
      },
      4: {
        zone: "Grand Pavilion",
        title: "Honored Among the Fey",
        text: "A miniature glowing Lantern Dragonette perches proudly on your shoulder as courtiers part before you. A sealed black-wax invitation arrives: Her Majesty Queen Sarastra requests a worthy gift—the mythic Firebird!",
        onEnter: { healHp: 16, msg: "Your Status soars (+16 HP) and the Queen's invitation arrives!" },
        choices: [
          { t: "Prepare for Act III: The Honored Guests!", to: 5 }
        ]
      },
      5: {
        zone: "Shadow Gardens",
        title: "Whispers of the Black Prince",
        text: "From the dark hedges, the envious Black Prince warns you not to upstage him before his mother the Queen.",
        choices: [
          { t: "Hold your head high as an Honored Guest.", to: 6 }
        ]
      },
      6: {
        zone: "Guest Pavilion",
        title: "Akyishigal's Shadow",
        text: "Even the servants of Akyishigal, Demon Lord of Roaches, now watch your every step.",
        choices: [
          { t: "Complete Act II and unlock Act III!", to: 7 }
        ]
      },
      7: {
        zone: "Court Promenade",
        title: "Act II Complete",
        text: "The royal hunt for the Firebird awaits.",
        choices: [
          { t: "Advance to Act III!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Rising Star of the Shadow Courts",
        text: "You have mastered the deadly etiquette of the Invisible Courts! <strong>Courts of the Shadow Fey III: The Honored Guests</strong> is now unlocked!",
        ending: { type: "true", title: "Favored of the Lords of Light (Act II)", xp: 320, gold: 300, trophy: "Baron Suvid's Silver Glove" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 3. COURTS OF THE SHADOW FEY III: THE HONORED GUESTS (8 PAGES • LV 9)
  // Part 3 of 4 (Prerequisite: bk_b5_shadow_fey_2)
  // ==========================================================
  bk_b5_shadow_fey_3: {
    id: "bk_b5_shadow_fey_3",
    reqQuest: "bk_b5_shadow_fey_2",
    title: "Courts of the Shadow Fey III: The Honored Guests",
    subtitle: "Courts of the Shadow Fey (Part 3 of 4) • The Firebird & The Black Prince",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Unlocks after Courts of the Shadow Fey II",
    summary: "Venture into the twilight woods to capture a gleaming feather of the mythic Firebird for Queen Sarastra, defeat the jealous Black Prince's raven assassins on the Bridge of Night, and win your Royal Audience.",
    totalPages: 8,
    pages: {
      1: {
        zone: "Twilight Hunting Grounds",
        title: "Trail of Golden Embers",
        safeRetreat: true,
        text: "Glowing embers drift down through black pines where the mythic Firebird nests. Winning its favor will secure an immediate audience with Queen Sarastra—and infuriate the plotting Black Prince!",
        choices: [
          { t: "Approach the golden nest peacefully with music and lantern-light.", badge: "Spirit / Survival DC 14", check: { stat: "spirit", skill: "Survival", dc: 14, pass: 2, fail: 2, failDmg: 8, passMsg: "Enchanted by your Lantern Dragonette, the Firebird gifts a radiant plume willingly!", failMsg: "Blazing sparks singe your cloak (-8 HP) before you catch a fallen plume!" }, onPass: { cw: "FIREBIRD_BLESSED" } },
          { t: "Track the Firebird swiftly through the thorny shadow-brambles.", to: 2 }
        ]
      },
      2: {
        zone: "The Bridge of Night",
        title: "The Black Prince's Rage",
        text: "Returning across the star-spanned Bridge of Night, you are ambushed by a double company of black-feathered Raven Assassins—led personally by the furious Black Prince! 'That gift for my mother was MINE!' he snarls!",
        enemy: { name: "The Black Prince & Raven Assassins", desc: "Treacherous royal shadow-prince and his winged killers.", hp: 90, ac: 17, atk: 11, dmg: 12, xp: 315, gold: 210, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["FIREBIRD_BLESSED"] },
        choices: [
          { t: "Stride past the humbled prince straight into Queen Sarastra's Throne Hall!", to: 3 }
        ]
      },
      3: {
        zone: "Throne of Night and Magic",
        title: "Audience With Queen Sarastra",
        text: "Seated beneath a canopy of living stars, Her Majesty Sarastra smiles coldly as you present the glowing Firebird plume. 'Bold mortals,' she purrs. 'If you wish Zobeck's charter honored, seek my estranged husband—the Moonlit King—within the Spiral Maze!'",
        onEnter: { healHp: 18, restoreMp: 8, msg: "Queen Sarastra grants royal passage to the Spiral Maze (+18 HP, +8 MP)!" },
        choices: [
          { t: "Accept the Queen's pass and depart for the Spiral Maze!", to: 4 }
        ]
      },
      4: {
        zone: "Well of Night",
        title: "Akyishigal's Whisper",
        text: "Near the Well of Night, chittering roach-demons hiss a tempting offer from their master Akyishigal: bring him the Moonlit King's Orb of Rule instead of the Queen, and he will shower you in demonic wealth.",
        choices: [
          { t: "Refuse the demon lord's corruption—Zobeck's freedom comes first!", to: 5, onChoose: { cw: "REFUSED_ROACH_LORD" } },
          { t: "Keep your counsel quiet and march toward the Spiral Maze.", to: 5 }
        ]
      },
      5: {
        zone: "Gates of the Spiral Maze",
        title: "The King's Exile",
        text: "Towering black hedges twist upward around a lonely moonlit spire.",
        choices: [
          { t: "Prepare for the grand finale in Act IV!", to: 6 }
        ]
      },
      6: {
        zone: "Maze Threshold",
        title: "Sharpening Steel",
        text: "Your Lantern Dragonette illuminates the dark path ahead.",
        choices: [
          { t: "Complete Act III and unlock Act IV!", to: 7 }
        ]
      },
      7: {
        zone: "Shadow Hedge",
        title: "Act III Complete",
        text: "The Moonlit King waits inside the Spiral Maze.",
        choices: [
          { t: "Advance to Act IV!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Honored Guest of the Queen",
        text: "You outshone the Black Prince and won Queen Sarastra's royal pass! <strong>Courts of the Shadow Fey IV: Royal Audiences and Treachery</strong> is now unlocked!",
        ending: { type: "true", title: "Champion of the Bridge of Night (Act III)", xp: 360, gold: 340, trophy: "Radiant Firebird Plume" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 4. COURTS OF THE SHADOW FEY IV: ROYAL AUDIENCES AND TREACHERY (8 PAGES • LV 10)
  // Part 4 of 4 (Prerequisite: bk_b5_shadow_fey_3)
  // ==========================================================
  bk_b5_shadow_fey_4: {
    id: "bk_b5_shadow_fey_4",
    reqQuest: "bk_b5_shadow_fey_3",
    title: "Courts of the Shadow Fey IV: Royal Audiences and Treachery",
    subtitle: "Courts of the Shadow Fey (Part 4 of 4) • The Spiral Maze & Moonlit King",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Unlocks after Courts of the Shadow Fey III",
    summary: "Brave the trapped Spiral Maze, destroy the ancient Eye Golem, confront the mad Moonlit King and his devils atop his tower, seize the Orb of Rule, and secure Zobeck's freedom from Queen Sarastra!",
    totalPages: 8,
    pages: {
      1: {
        zone: "The Spiral Maze",
        title: "The Ancient Eye Golem",
        safeRetreat: true,
        text: "Deep within the twisting black-thorn Spiral Maze, an ancient, multi-eyed stone Eye Golem and prowling Shadow Beasts block the spiral steps to the Moonlit King's tower!",
        enemy: { name: "Ancient Eye Golem & Shadow Beasts", desc: "Lethal arcane sentinel guarding the Moonlit King's exile.", hp: 86, ac: 17, atk: 11, dmg: 12, xp: 270, gold: 135, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Ascend the moonlit spire to meet the Moonlit King!", to: 2 }
        ]
      },
      2: {
        zone: "Tower of the Moonlit King",
        title: "Madness on the Throne",
        text: "Surrounded by whispering devils and clutching the glowing Orb of Rule, the wild-eyed Moonlit King laughs bitterly: 'Zobeck is MINE by ancient blood! Mortals dare bargain with winter? Take their heads!'",
        enemy: { name: "The Moonlit King & Court Devils", desc: "Unpredictable ruler of the Winter Court backed by infernal allies.", hp: 108, ac: 18, atk: 12, dmg: 14, xp: 390, gold: 280, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Seize the glowing Orb of Rule before the tower lights go dark!", to: 3 }
        ]
      },
      3: {
        zone: "Darkened Spiral Maze",
        title: "The Orb of Rule",
        text: "Every lantern in the tower extinguishes as hundreds of shadow-beasts howl outside! Grasping the Orb of Rule grants you temporary mastery over the maze—parting the monsters as you march back toward Queen Sarastra!",
        choices: [
          { t: "Deliver the Orb of Rule to Queen Sarastra in exchange for Zobeck's permanent freedom!", to: 4, onChoose: { items: ["bq_orb_of_rule_shard"], gold: 140, msg: "Queen Sarastra honors her bargain (+140 GP & Signet of the Free City Charter)!" } }
        ]
      },
      4: {
        zone: "Queen Sarastra's Court",
        title: "The Returning Mortals",
        text: "True to her royal word, Queen Sarastra solidifies her throne with the Orb of Rule, signs the eternal renunciation of Zobeck, and opens a shimmering golden road straight back to the mortal realm!",
        choices: [
          { t: "Stride back into the warm morning sun of Zobeck!", to: 5 }
        ]
      },
      5: {
        zone: "Free City of Zobeck",
        title: "The Chill Lifts",
        text: "Unnatural frost melts from the rooftops as the Free City Council raises banners in celebration of your impossible diplomatic—and martial—triumph!",
        choices: [
          { t: "Accept the grand reward of the Free City!", to: 6 }
        ]
      },
      6: {
        zone: "Council Hall",
        title: "Legends of Two Realms",
        text: "You are celebrated in both the mortal councils and the glittering halls of the Shadow Fey.",
        choices: [
          { t: "Complete Courts of the Shadow Fey!", to: 7 }
        ]
      },
      7: {
        zone: "Oakhaven Return",
        title: "Homecoming",
        text: "Your Lantern Dragonette spirals joyfully above your shoulder as you return to Oakhaven.",
        choices: [
          { t: "Claim your campaign victory!", to: 8 }
        ]
      },
      8: {
        zone: "Epilogue",
        title: "Savior of Zobeck",
        text: "The Courts of the Shadow Fey have bowed to mortal courage, and the Free City stands free forever!",
        ending: { type: "true", title: "Master of the Shadow Courts", xp: 450, gold: 430, trophy: "Crown of the Winter Pact" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 5. LAIR OF THE FIRE CULT (7 PAGES • LV 3)
  // ==========================================================
  bk_b5_fire_cult: {
    id: "bk_b5_fire_cult",
    title: "Lair of the Fire Cult",
    subtitle: "Creature Codex Lairs • Freejus Institute & Agnibarra Orbs",
    difficulty: "Medium",
    recommendedLevel: 3,
    autoDiscover: false,
    discoverySource: "Merchant Solly Steffard (Oakhaven Market)",
    summary: "Check on Solly Steffard's son Jessop at Dr. Ezra Freejus's asylum, uncover the doctor's fiery madness, defeat the trickster imp Shemoto, and extinguish the orbs summoning destructive agnibarras.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Freejus Institute",
        title: "The Locked Basement",
        safeRetreat: true,
        text: "Wealthy merchant Solly Steffard hired you to check on her son Jessop inside Dr. Ezra Freejus's asylum. Worried nurses whisper that Dr. Freejus has locked herself in the basement with Jessop for days—and acrid smoke seeps under the cellar door!",
        choices: [
          { t: "Pick the basement lock quietly to surprise whatever lurks below.", badge: "Lockpicking DC 11", check: { stat: "agility", skill: "Lockpicking", dc: 11, pass: 2, fail: 2, passMsg: "You slip down the stone stairs unseen!", failMsg: "The lock snaps loudly, alerting the fire cultists below!" }, onPass: { cw: "CELLAR_SURPRISE" } },
          { t: "Kick open the smoking basement door!", to: 2 }
        ]
      },
      2: {
        zone: "Asylum Cellar",
        title: "Scorched Cultists & Agnibarras",
        text: "Cackling fiery bird-like sprites—Agnibarras—burst from glowing braziers alongside brainwashed fire-cult orderlies!",
        enemy: { name: "Fire Cultists & Agnibarras", desc: "Pyromantic zealots and destructive fire-creatures.", hp: 30, ac: 12, atk: 5, dmg: 5, xp: 75, gold: 35, items: rollRandomLoot(["consumable", "material"], 1, "uncommon"), flee: 1, weakCw: ["CELLAR_SURPRISE"] },
        choices: [
          { t: "Burst into the inner ritual chamber where Jessop is tied!", to: 3 }
        ]
      },
      3: {
        zone: "Inner Ritual Chamber",
        title: "Dr. Freejus & Imp Shemoto",
        text: "Before two blazing summoning orbs stands mad Dr. Ezra Freejus—egged on by the grinning imp Shemoto who tricked her into believing fire cures insanity! Jessop Steffard struggles against his ropes behind the altar!",
        enemy: { name: "Dr. Ezra Freejus & Imp Shemoto", desc: "Pyromaniac healer and the manipulative imp behind the fire orbs.", hp: 38, ac: 13, atk: 6, dmg: 6, xp: 110, gold: 70, items: ["bq_freejus_ember_orb"] },
        choices: [
          { t: "Slay Shemoto to extinguish both fire orbs and untie Jessop Steffard!", to: 4 }
        ]
      },
      4: {
        zone: "Asylum Courtyard",
        title: "Flames Quenched",
        text: "As Shemoto falls, both orbs blink out instantly—stopping the flow of agnibarras before the city can burn! Behind the altar you also recover 200 GP's worth of Dr. Freejus's satchel notes and healing draughts.",
        onEnter: { healHp: 10, gold: 60, msg: "Saved Jessop Steffard and recovered 60 GP & healing tonic (+10 HP)!" },
        choices: [
          { t: "Escort Jessop safely home to Solly Steffard.", to: 5 }
        ]
      },
      5: {
        zone: "Steffard Estate",
        title: "A Mother's Gratitude",
        text: "Solly Steffard weeps with relief and rewards you generously for saving both her son and the town.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Market",
        title: "Ashes Cooled",
        text: "City healers take over the Institute to restore Dr. Freejus's former good work.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Extinguisher of the Fire Cult",
        text: "The agnibarra threat is ended and Jessop Steffard is home safe.",
        ending: { type: "true", title: "Quencher of the Fire Cult", xp: 145, gold: 140, trophy: "Dr. Freejus's Scorched Journal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 6. A RAT AMONG US I: WHARF OF CHITTR'K'K (7 PAGES • LV 4)
  // Part 1 of 2
  // ==========================================================
  bk_b5_rat_among_us_1: {
    id: "bk_b5_rat_among_us_1",
    title: "A Rat Among Us I: Wharf of Chittr'k'k",
    subtitle: "A Rat Among Us (Part 1 of 2) • Ratfolk Warlock Jeeb Kraatuhl",
    difficulty: "Medium-Hard",
    recommendedLevel: 4,
    autoDiscover: false,
    discoverySource: "Watch Informant Treniece (Rusty Flagon Tavern)",
    summary: "Infiltrate the vermin-choked wharf shrines of Chittr'k'k, Demon Lord of Rats, defeat ratfolk warlock Jeeb Kraatuhl and her familiar Fleabit, and uncover the secret cellar tunnel leading to the Gnawing Thirst Inn.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Squalid Wharf",
        title: "Shrines of the Rat Lord",
        safeRetreat: true,
        text: "Rats pour from every cellar grate along the docks! Watch informant Treniece points you to an abandoned wharf warehouse where ratfolk warlock Jeeb Kraatuhl whips cultists of Chittr'k'k into a frenzy.",
        choices: [
          { t: "Slip through the damp refuse-alley into the back cellar.", badge: "Stealth DC 12", check: { stat: "agility", skill: "Stealth", dc: 12, pass: 2, fail: 2, passMsg: "You catch the ratfolk cultists mid-chant!", failMsg: "Scurrying wharf-rats squeak a loud warning!" }, onPass: { cw: "WHARF_STEALTH" } },
          { t: "Kick open the rotting warehouse doors!", to: 2 }
        ]
      },
      2: {
        zone: "Vermin Warehouse",
        title: "Chittr'k'k's Zealot Pack",
        text: "Gnawing ratfolk fanatics and diseased swarm-rats surge out from behind barrels of spoiled grain!",
        enemy: { name: "Cultists of Chittr'k'k", desc: "Fanatical ratfolk spreading filth through the wharf.", hp: 36, ac: 13, atk: 6, dmg: 6, xp: 90, gold: 40, items: rollRandomLoot(["consumable", "material"], 1, "rare"), flee: 1, weakCw: ["WHARF_STEALTH"] },
        choices: [
          { t: "Push into the inner wharf shrine to confront Jeeb Kraatuhl!", to: 3 }
        ]
      },
      3: {
        zone: "Wharf Shrine",
        title: "Jeeb Kraatuhl & Fleabit",
        text: "Atop a crude altar of gnawed bones stands ratfolk warlock Jeeb Kraatuhl with her eerie kuunganisha familiar Fleabit perched on her shoulder! 'The city will rot for Chittr'k'k!' she screeches!",
        enemy: { name: "Jeeb Kraatuhl & Fleabit", desc: "Cunning ratfolk warlock empowered by the Demon Lord of Rats.", hp: 44, ac: 14, atk: 7, dmg: 7, xp: 135, gold: 80, items: rollRandomLoot(["weapon", "accessory"], 1, "rare") },
        choices: [
          { t: "Search beneath the floorboards and discover the secret tunnel!", to: 4 }
        ]
      },
      4: {
        zone: "Hidden Cellar Tunnel",
        title: "One Spoke of a Larger Wheel",
        text: "A freshly dug tunnel beneath the wharf leads directly under the wealthy residential quarter—toward a front called the **Gnawing Thirst Inn** where a rattok demon holds court!",
        choices: [
          { t: "Report the tunnel to Treniece and prepare for Part Two!", to: 5 }
        ]
      },
      5: {
        zone: "Docks Watchpost",
        title: "Treniece's Warning",
        text: "Treniece pledges guard backup if things get hairy inside the Gnawing Thirst Inn.",
        choices: [
          { t: "Resupply and unlock Part Two!", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Tavern",
        title: "Part One Complete",
        text: "The wharf shrine is crushed, but the demon Rathsys still lurks uptown.",
        choices: [
          { t: "Complete Part One!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Breaker of the Wharf Shrine",
        text: "Jeeb Kraatuhl's wharf staging ground is cleared! <strong>A Rat Among Us II: The Gnawing Thirst</strong> is now unlocked!",
        ending: { type: "true", title: "Scourge of the Rat Wharf (Part I)", xp: 170, gold: 155, trophy: "Jeeb's Bone Charm" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 7. A RAT AMONG US II: THE GNAWING THIRST (7 PAGES • LV 5)
  // Part 2 of 2 (Prerequisite: bk_b5_rat_among_us_1)
  // ==========================================================
  bk_b5_rat_among_us_2: {
    id: "bk_b5_rat_among_us_2",
    reqQuest: "bk_b5_rat_among_us_1",
    title: "A Rat Among Us II: The Gnawing Thirst",
    subtitle: "A Rat Among Us (Part 2 of 2) • Rattok Demon Rathsys & The Rat King",
    difficulty: "Hard",
    recommendedLevel: 5,
    autoDiscover: false,
    discoverySource: "Unlocks after A Rat Among Us I",
    summary: "Follow Jeeb Kraatuhl's tunnel to the Gnawing Thirst Inn in the residential quarter, defeat the rattok demon Rathsys and a surging Rat King, and recover the jade rat idol and Cloak of Protection.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Tunnel to the Gnawing Thirst",
        title: "Beneath Wealthy Streets",
        safeRetreat: true,
        text: "Emerging from Jeeb's secret tunnel beneath the upscale Gnawing Thirst Inn, you hear bloated chanting—Rathsys, a rattok demon loyal to Chittr'k'k, is corrupting wealthy merchants right under the city's nose!",
        choices: [
          { t: "Inspect the courtyard pit where Rathsys buried his hoard.", badge: "Perception DC 12", check: { stat: "spirit", skill: "Perception", dc: 12, pass: 2, fail: 2, passMsg: "You dig up a buried Cloak of Protection before the demon notices!", failMsg: "Loose gravel alerts the tavern's vermin guards!" }, onPass: { items: ["bq_rathsys_cloak"], cw: "CLOAK_FOUND", msg: "Found the Gnawing Thirst Cloak of Protection!" } },
          { t: "Burst straight into the Gnawing Thirst's inner sanctum!", to: 2 }
        ]
      },
      2: {
        zone: "Gnawing Thirst Sanctum",
        title: "Rathsys the Rattok Demon",
        text: "Towering behind a gleaming jade rat idol stands Rathsys—a snarling, fanged Rattok Demon reeking of abyssal filth!",
        enemy: { name: "Rathsys, Rattok Demon", desc: "Vile rat-demon corrupting the city's merchant elite.", hp: 50, ac: 14, atk: 7, dmg: 8, xp: 145, gold: 85, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1 },
        choices: [
          { t: "Watch in horror as hundreds of rats pour from the walls to form a Rat King!", to: 3 }
        ]
      },
      3: {
        zone: "Gnawing Thirst Cellar",
        title: "The Rat King",
        text: "Tails knotted in a writhing, chittering cyclone, a monstrous Rat King lunges from the shattered wainscoting just as Treniece's watchmen shout from the street door!",
        enemy: { name: "Abyssal Rat King", desc: "Tangled hive-mind horror of dozens of possessed rats.", hp: 52, ac: 14, atk: 7, dmg: 8, xp: 165, gold: 100, items: rollRandomLoot(["weapon", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Seize the 500 GP jade rat idol and hand the cellar over to Treniece's watch!", to: 4, onChoose: { gold: 110, msg: "Claimed 110 GP share from the jade idol and courtyard hoard!" } }
        ]
      },
      4: {
        zone: "Residential Quarter",
        title: "The Cult Broken",
        text: "City guards seal the Gnawing Thirst Inn as the vermin tide recedes from the district.",
        choices: [
          { t: "Accept the city's official commendation.", to: 5 }
        ]
      },
      5: {
        zone: "Town Square",
        title: "Gratitude of the Watch",
        text: "Treniece salutes your courage in rooting out Chittr'k'k's demonic foothold.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Rusty Flagon Tavern",
        title: "Clean Cellars",
        text: "The innkeeper gratefully pours a mug of your finest ale.",
        choices: [
          { t: "Complete A Rat Among Us!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Bane of Chittr'k'k's Cult",
        text: "Both Jeeb Kraatuhl and the demon Rathsys are vanquished, sparing the city from the Demon Lord of Rats.",
        ending: { type: "true", title: "Slayer of the Rat King (Part II)", xp: 220, gold: 210, trophy: "Jade Rat Idol of Chittr'k'k" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 8. CAVERNS OF THE HOWLING MOON (7 PAGES • LV 6)
  // ==========================================================
  bk_b5_howling_moon: {
    id: "bk_b5_howling_moon",
    title: "Caverns of the Howling Moon",
    subtitle: "Creature Codex Lairs • Matriarch Lamia Meziwah's Full-Moon Feast",
    difficulty: "Hard",
    recommendedLevel: 6,
    autoDiscover: false,
    discoverySource: "Merchant Consortium Invitation (Oakhaven Market)",
    summary: "Accept an exclusive full-moon invitation to a lavish underground merchant festival—only to discover the consortium's secret leader is the serpentine lamia Meziwah, who hunts rival guests during her monthly madness!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Torchlit Grotto Banquet",
        title: "Festival of the Senses",
        safeRetreat: true,
        text: "Velvet tapestries, stolen statuary, and spiced wine transform a limestone cavern into a decadent banquet hall! As the full moon rises above the sinkhole, the music turns wild—and veiled guards lock the iron gates behind the guests!",
        choices: [
          { t: "Refuse the drugged wine and spot the serpentine silhouette behind the silk curtain!", badge: "Perception DC 13", check: { stat: "spirit", skill: "Perception", dc: 13, pass: 2, fail: 2, failDmg: 6, passMsg: "A serpentine lamia! You warn the innocent merchants just in time!", failMsg: "Spiced fumes cloud your head (-6 HP) as the banquet turns violent!" }, onPass: { cw: "WINE_REFUSED" } },
          { t: "Draw steel immediately to defend the trapped merchants!", to: 2 }
        ]
      },
      2: {
        zone: "Banquet Cavern",
        title: "Meziwah's Revel-Guards",
        text: "Crazed masked cultists and glowing cavern-fungi guardians surge through the overturned feast tables!",
        enemy: { name: "Howling Moon Cultists", desc: "Hedonistic mercenaries serving Meziwah's blood-feast.", hp: 50, ac: 14, atk: 7, dmg: 8, xp: 140, gold: 65, items: rollRandomLoot(["consumable", "valuable"], 1, "rare"), flee: 1, weakCw: ["WINE_REFUSED"] },
        choices: [
          { t: "Confront the consortium's true leader beneath the moonlit sinkhole!", to: 3 }
        ]
      },
      3: {
        zone: "Moonlit Sinkhole",
        title: "Meziwah, Serpentine Lamia",
        text: "Slithering out from behind silk curtains, matriarch serpentine lamia Meziwah flashes hypnotic golden eyes! 'How rude to interrupt my full-moon hunt—you will make fine trophies!'",
        enemy: { name: "Meziwah, Matriarch Lamia", desc: "Cunning serpentine lamia ruling a secret merchant empire.", hp: 64, ac: 15, atk: 8, dmg: 9, xp: 205, gold: 140, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["WINE_REFUSED"] },
        choices: [
          { t: "Unlock the cavern gates and lead the shaken honest merchants to safety!", to: 4 }
        ]
      },
      4: {
        zone: "Side Grotto",
        title: "Stolen Art Returned",
        text: "Rather than looting the innocent guests, you return Meziwah's stolen paintings to their rightful noble owners—earning vast gratitude and honest gold!",
        onEnter: { healHp: 12, gold: 75, msg: "Grateful merchants reward your integrity (+75 GP, +12 HP)!" },
        choices: [
          { t: "Escort the survivors back to town.", to: 5 }
        ]
      },
      5: {
        zone: "Oakhaven Market",
        title: "Consortium Reformed",
        text: "Freed from Meziwah's sinister shadow, honest merchants rebuild the trade guild cleanly.",
        choices: [
          { t: "Collect your reward.", to: 6 }
        ]
      },
      6: {
        zone: "Guildhall",
        title: "Friends in High Places",
        text: "Word of your cool head at the Howling Moon spreads across every merchant house.",
        choices: [
          { t: "Finish the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Breaker of the Moon Feast",
        text: "Meziwah's bloody full-moon hunts are ended forever.",
        ending: { type: "true", title: "Survivor of the Howling Moon", xp: 245, gold: 235, trophy: "Golden Serpent Mask" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 9. PAYING THE SHADOW TOLL (7 PAGES • LV 7)
  // ==========================================================
  bk_b5_shadow_toll: {
    id: "bk_b5_shadow_toll",
    title: "Paying the Shadow Toll",
    subtitle: "Creature Codex Lairs • Hurkl's Shadow Goblins & Spy Jaffmin",
    difficulty: "Very Hard",
    recommendedLevel: 7,
    autoDiscover: false,
    discoverySource: "Local Sheriff's Bounty (Town Square)",
    summary: "Pursue escaped shadow fey spy Jaffmin onto the Dancing Shadow Path and capture her alive while outfighting shadow goblin boss Hurkl, his Wand of Fireballs, and his loyal shadhavar mount!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Dancing Shadow Path",
        title: "Toll of the Shadow Goblins",
        safeRetreat: true,
        text: "Tracking escaped shadow fey pattern dancer Jaffmin between two shadow roads, you walk into a wooded clearing blocked by grinning shadow goblins demanding a 'shadow toll!' Behind them crouches Hurkl waving a stolen Wand of Fireballs beside a horned black shadhavar steed!",
        choices: [
          { t: "Spot Hurkl's hidden ambushers in the dark ferns first.", badge: "Perception DC 13", check: { stat: "spirit", skill: "Perception", dc: 13, pass: 2, fail: 2, passMsg: "You spot Jaffmin slipping toward the shadow road—and cut off her escape!", failMsg: "Fireball sparks crackle as Hurkl cackles from a mossy boulder!" }, onPass: { cw: "JAFFMIN_CORNERED" } },
          { t: "Refuse the shadow toll and charge Hurkl's bandit camp!", to: 2 }
        ]
      },
      2: {
        zone: "Shadow Road Camp",
        title: "Hurkl & The Shadhavar",
        text: "Hurkl triggers a scorching burst from his looted wand while his devoted antlered Shadhavar mount charges through the mist!",
        enemy: { name: "Hurkl & Loyal Shadhavar", desc: "Empowered shadow goblin bandit and his fierce equine shadow-steed.", hp: 62, ac: 15, atk: 8, dmg: 9, xp: 185, gold: 100, items: ["bq_hurkl_fire_wand"], flee: 1, weakCw: ["JAFFMIN_CORNERED"] },
        choices: [
          { t: "Intercept pattern dancer Jaffmin before she leaps into the shadow road!", to: 3 }
        ]
      },
      3: {
        zone: "Threshold of Shadow",
        title: "Capturing Jaffmin Alive",
        text: "Whirling in dazzling illusory ribbons, shadow fey spy Jaffmin darts between the trees trying to slip back to her fey lords!",
        enemy: { name: "Jaffmin, Shadow Fey Pattern Dancer", desc: "Elusive fey spy wanted alive for 500 GP.", hp: 68, ac: 16, atk: 9, dmg: 10, xp: 230, gold: 130, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), weakCw: ["JAFFMIN_CORNERED"] },
        choices: [
          { t: "Bind Jaffmin alive and uncover Hurkl's boulder treasure trove!", to: 4, onChoose: { gold: 115, healHp: 12, msg: "Captured Jaffmin alive and looted Hurkl's hidden boulder cache (+115 GP, +12 HP)!" } }
        ]
      },
      4: {
        zone: "Sheriff's Office",
        title: "Bounty Collected",
        text: "The sheriff grins broadly as Jaffmin is led to the iron-warded cells and counts out your full bounty!",
        choices: [
          { t: "Take your leave—and stay alert for vengeful shadow fey.", to: 5 }
        ]
      },
      5: {
        zone: "Forest Road",
        title: "No More Toll",
        text: "Travelers along the wooded border no longer fear Hurkl's fiery ambushes.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Guildhall",
        title: "Spy's Secrets",
        text: "Interrogators uncover vital intelligence on shadow road movements thanks to your live capture.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Toll-Breaker of the Shadow Path",
        text: "Hurkl's reign of roadside fireballs is over and Jaffmin's espionage is foiled.",
        ending: { type: "true", title: "Breaker of the Shadow Toll", xp: 290, gold: 280, trophy: "Sheriff's Iron Warrant" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 10. SWEPT AWAY (7 PAGES • LV 8)
  // ==========================================================
  bk_b5_swept_away: {
    id: "bk_b5_swept_away",
    title: "Swept Away",
    subtitle: "Creature Codex Lairs • Obelisk of a Thousand Runes & Wind's Harp Devil",
    difficulty: "Very Hard",
    recommendedLevel: 8,
    autoDiscover: false,
    discoverySource: "Frightened Townsfolk (Town Square)",
    summary: "Race to the hundred-foot lucky Obelisk of a Thousand Runes outside town and slay the eerie Wind's Harp Devil trying to topple the protective monolith before an invading force can exploit its fall.",
    totalPages: 7,
    pages: {
      1: {
        zone: "Obelisk Meadow",
        title: "The Hundred-Foot Monolith",
        safeRetreat: true,
        text: "For generations townsfolk climbed ladders to touch the high lucky runes on the hundred-foot granite Obelisk of a Thousand Runes. Now, howling disharmonic chords echo from its base—where a bizarre, string-limbed Wind's Harp Devil saws away at the monolith's foundation!",
        choices: [
          { t: "Touch one of the high lucky runes on the obelisk before engaging!", badge: "Athletics / Agility DC 14", check: { stat: "agility", skill: "Athletics", dc: 14, pass: 2, fail: 2, passMsg: "Ancient fortune surges through your veins—blessing your strikes!", failMsg: "Howling wind blows you back from the sheer granite." }, onPass: { cw: "OBELISK_LUCK", healHp: 10 } },
          { t: "Plug your ears against the discordant music and charge!", to: 2 }
        ]
      },
      2: {
        zone: "Base of the Obelisk",
        title: "Infernal Wind-Servants",
        text: "Screaming dust-devils and barbed lesser fiends swirl around the vibrating granite base!",
        enemy: { name: "Infernal Gale-Imps", desc: "Lesser fiends helping undermine the ancient ward-stone.", hp: 64, ac: 15, atk: 8, dmg: 9, xp: 185, gold: 80, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1, weakCw: ["OBELISK_LUCK"] },
        choices: [
          { t: "Confront the Wind's Harp Devil before the monolith cracks!", to: 3 }
        ]
      },
      3: {
        zone: "Cracked Foundation",
        title: "The Wind's Harp Devil",
        text: "Strumming razor-sharp wind-strings across its gaunt infernal frame, the Wind's Harp Devil unleashes a deafening symphony designed to shatter both stone and bone!",
        enemy: { name: "Wind's Harp Devil", desc: "Bizarre musical fiend sent to topple the protective obelisk.", hp: 82, ac: 16, atk: 10, dmg: 11, xp: 280, gold: 180, items: ["bq_obelisk_rune_charm"], weakCw: ["OBELISK_LUCK"] },
        choices: [
          { t: "Stabilize the rune-stone and claim the devil's sinister invasion map!", to: 4 }
        ]
      },
      4: {
        zone: "Obelisk Meadow",
        title: "The Monolith Stands",
        text: "The discordant shrieking ceases. Though cracked at the base, the Obelisk of a Thousand Runes still stands upright—preserving its ancient protective ward over the town!",
        choices: [
          { t: "Return to town with the devil's map and good news.", to: 5 }
        ]
      },
      5: {
        zone: "Town Square",
        title: "Fortune Preserved",
        text: "Grateful merchants and young couples cheer as the lucky obelisk is declared safe once more.",
        choices: [
          { t: "Accept the town's reward.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Guildhall",
        title: "Mysterious Master",
        text: "You hand the devil's map to guild scholars so the realm is warned of whoever wanted the obelisk felled.",
        choices: [
          { t: "Finish the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Guardian of the Thousand Runes",
        text: "The Obelisk of a Thousand Runes endures, and its luck walks with you.",
        ending: { type: "true", title: "Defender of the Lucky Obelisk", xp: 315, gold: 295, trophy: "Snapped Infernal Harp-String" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 11. ICE MAIDEN'S KISS (7 PAGES • LV 9)
  // ==========================================================
  bk_b5_ice_maiden: {
    id: "bk_b5_ice_maiden",
    title: "Ice Maiden's Kiss",
    subtitle: "Creature Codex Lairs • Mother Rime & Reborn Ice Maiden Bruffa",
    difficulty: "Very Hard",
    recommendedLevel: 9,
    autoDiscover: false,
    discoverySource: "Northern Fishing Village Elders (Oakhaven Outskirts)",
    summary: "Brave the frozen wastes north of the fishing village to rescue three stolen children—Dove, Kallik, and Jermini—from snow hag Mother Rime, and appeal to the lingering humanity of reborn ice maiden Bruffa!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Frozen Northern Wastes",
        title: "Tracks in the Ice",
        safeRetreat: true,
        text: "The villagers thought 'kind Mother Rime' was a friend—until she vanished into the tundra with three children: Dove, Kallik, and Jermini! Outside her glacial cavern lurk frost-bitten ghouls wearing village mementos.",
        enemy: { name: "Glacial Cairn Ghouls", desc: "Frozen undead guarding Mother Rime's ice-caves.", hp: 70, ac: 16, atk: 9, dmg: 10, undead: true, xp: 210, gold: 85, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Gather the village mementos as proof of Mother Rime's cruelty and enter the cave.", to: 2, onChoose: { cw: "VILLAGE_MEMENTOS", msg: "Collected proof of Mother Rime's crimes!" } }
        ]
      },
      2: {
        zone: "Crystal Nursery",
        title: "Bruffa's Humanity",
        text: "Before the caged children stands Bruffa—the village girl Mother Rime stole a year ago and rebirthed as a radiant Ice Maiden! Tears freeze on her cheeks as she hesitates between Mother Rime's orders and her lost humanity.",
        choices: [
          { t: "Show Bruffa the village mementos and plead for Dove, Kallik, and Jermini!", reqCw: "VILLAGE_MEMENTOS", badge: "VILLAGE_MEMENTOS", to: 3, onChoose: { cw: "BRUFFA_REDEEMED", items: ["bq_bruffa_frost_pendant"], healHp: 14, msg: "Bruffa turns against Mother Rime, blessing you (+14 HP) and gifting Bruffa's Thawed Tear!" } },
          { t: "Appeal earnestly to Bruffa's memories of her fisherfolk family.", badge: "Persuasion DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 3, fail: 3, passMsg: "Bruffa lowers her frost-spear and stands beside you!", failMsg: "Mother Rime's harsh shriek drowns out your plea!" }, onPass: { cw: "BRUFFA_REDEEMED", items: ["bq_bruffa_frost_pendant"] } }
        ]
      },
      3: {
        zone: "Glacial Cavern",
        title: "Mother Rime & The Ursa Polari",
        text: "Shrieking in fury, snow hag Mother Rime unleashes her hulking monstrous Ursa Polari bear-guardian to freeze you solid before she can turn the three children into more beasts!",
        enemy: { name: "Mother Rime & Ursa Polari", desc: "Wicked snow hag and her monstrous polar-bear abomination.", hp: 92, ac: 17, atk: 11, dmg: 12, xp: 320, gold: 210, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare"), weakCw: ["BRUFFA_REDEEMED"] },
        choices: [
          { t: "Wrap Dove, Kallik, and Jermini in warm furs and guide Bruffa home!", to: 4 }
        ]
      },
      4: {
        zone: "Northern Fishing Village",
        title: "Homecoming in the Snow",
        text: "Tears of joy thaw the winter chill as all three children reunite with their families—and Bruffa's parents embrace their changed, gentle daughter.",
        choices: [
          { t: "Accept the grateful village's saved silver.", to: 5 }
        ]
      },
      5: {
        zone: "Frozen Coast",
        title: "A Safe Winter",
        text: "With Mother Rime destroyed, the fishing village no longer fears the northern blizzards.",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Rusty Flagon Tavern",
        title: "Warmth by the Fire",
        text: "Even hardened adventurers raise a glass to the redemption of Bruffa.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Heart of the Winter Wastes",
        text: "Mother Rime's icy tyranny is shattered, and four young souls are saved.",
        ending: { type: "true", title: "Redeemer of the Ice Maiden", xp: 360, gold: 345, trophy: "Mother Rime's Frost-Crystal" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 12. KING OF ILL FORTUNE (7 PAGES • LV 10)
  // ==========================================================
  bk_b5_king_ill_fortune: {
    id: "bk_b5_king_ill_fortune",
    title: "King of Ill Fortune",
    subtitle: "Creature Codex Lairs • Tower of Ill Fortune & Kobold King Qalqat",
    difficulty: "Deadly",
    recommendedLevel: 10,
    autoDiscover: false,
    discoverySource: "Wanted Poster for Brustival (Town Square)",
    summary: "Ride into the western badlands to the explosion-scarred Tower of Ill Fortune, outmaneuver rival dragonborn bounty hunters, defeat kobold King Qalqat, and capture fugitive war chaplain Brustival alive!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Western Badlands",
        title: "The Blasted Tower",
        safeRetreat: true,
        text: "A century ago a wizard's failed experiment blew the roof off the Tower of Ill Fortune. Now kobold King Qalqat gathers a miniature realm inside—advised by wanted fugitive dragonborn war chaplain Brustival, worth 500 GP alive!",
        choices: [
          { t: "Scout the rival dragonborn bounty hunters of the Order of the Coarse Pennant.", badge: "Stealth / Perception DC 14", check: { stat: "agility", skill: "Stealth", dc: 14, pass: 2, fail: 2, passMsg: "You beat the rival bounty hunters to the tower's side breach!", failMsg: "You trade brief blows with the Order's scouts before reaching the door!" }, onPass: { cw: "FIRST_IN_TOWER" } },
          { t: "March boldly up to King Qalqat's kobold gatehouse!", to: 2 }
        ]
      },
      2: {
        zone: "Cursed Courtyard",
        title: "Kobold Royal Guard",
        text: "Dozens of jittery kobold spearmen and dragon-shield zealots scramble behind overturned masonry under strange wild-magic sparks!",
        enemy: { name: "King Qalqat's Kobold Guard", desc: "Trap-happy kobold fanatics defending their self-proclaimed monarch.", hp: 78, ac: 16, atk: 10, dmg: 11, xp: 240, gold: 110, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1, weakCw: ["FIRST_IN_TOWER"] },
        choices: [
          { t: "Storm the cracked throne room atop the Tower of Ill Fortune!", to: 3 }
        ]
      },
      3: {
        zone: "Shattered Throne Room",
        title: "King Qalqat & Chaplain Brustival",
        text: "Waving a fear-wand from a makeshift throne sits gilded Kobold King Qalqat, flanked by fierce dragonborn war chaplain Brustival! 'Heretics and bounty dogs alike shall fall!' Brustival roars!",
        enemy: { name: "King Qalqat & War Chaplain Brustival", desc: "Cunning kobold monarch and wanted dragonborn zealot.", hp: 102, ac: 17, atk: 12, dmg: 13, xp: 360, gold: 250, items: ["bq_qalqat_free_ring"], weakCw: ["FIRST_IN_TOWER"] },
        choices: [
          { t: "Spare King Qalqat in exchange for his crown, scepter, and Ring of Free Action—and bind Brustival alive!", to: 4, onChoose: { gold: 150, msg: "Secured Brustival alive and claimed Qalqat's crown & scepter (+150 GP)!" } }
        ]
      },
      4: {
        zone: "Badlands Road",
        title: "Live Delivery",
        text: "The cowardly kobolds scatter into the rocks as you march the bound war chaplain safely back to the sheriff.",
        choices: [
          { t: "Turn Brustival over to the local authorities.", to: 5 }
        ]
      },
      5: {
        zone: "Sheriff's Keep",
        title: "Full 500 GP Reward",
        text: "Delighted to have Brustival alive for questioning about the wider conspiracy, the sheriff pays the full bounty!",
        choices: [
          { t: "Return to Oakhaven.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Guildhall",
        title: "Pilgrims Safe",
        text: "Travelers and clerics can walk the western roads in peace once more.",
        choices: [
          { t: "Complete the adventure.", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Victor of Ill Fortune",
        text: "You outsmarted rival hunters, humbled a kobold king, and brought Brustival to justice alive.",
        ending: { type: "true", title: "Bane of the Tower of Ill Fortune", xp: 415, gold: 410, trophy: "King Qalqat's Gilded Scepter" },
        choices: []
      }
    }
  },

  // ==========================================================
  // 13. TROLLKIN HUNT (7 PAGES • LV 12)
  // ==========================================================
  bk_b5_trollkin_hunt: {
    id: "bk_b5_trollkin_hunt",
    title: "Trollkin Hunt",
    subtitle: "Creature Codex Lairs • Red Craw Marsh & The Venom Maw Hydra",
    difficulty: "Deadly",
    recommendedLevel: 12,
    autoDiscover: false,
    discoverySource: "Patient Village Elder (Oakhaven Outskirts)",
    summary: "Prevent a bloody war between the crayfish-harvesting village and the Red Craw Marsh trollkin clan by hunting down the true culprit slaughtering both sides: a monstrous Venom Maw Hydra and its swamp worshippers!",
    totalPages: 7,
    pages: {
      1: {
        zone: "Edge of Red Craw Marsh",
        title: "A Broken Truce",
        safeRetreat: true,
        text: "Both villagers and trollkin have turned up slain in the misty Red Craw Marsh, and angry townsfolk are grabbing pitchforks! Investigating the first clearing, you find a fallen trollkin warrior beside his gleaming +2 battleaxe—covered not in human blade wounds, but corrosive hydra-venom!",
        choices: [
          { t: "Leave the fallen trollkin's battleaxe respectfully untouched and track the acid-scars!", to: 2, onChoose: { cw: "HONORED_TROLLKIN", msg: "Left the trollkin warrior's weapon intact—earning the clan's respect!" } },
          { t: "Follow the massive webbed tracks straight into the swamp's heart.", to: 2 }
        ]
      },
      2: {
        zone: "Sunken Crayfish Fen",
        title: "Hydra Worshippers",
        text: "Fanatical swamp-cultists and venomous marsh drakes guarding the hydra's hunting grounds lunge out of the reeds!",
        enemy: { name: "Venom Maw Marsh Cultists", desc: "Twisted swamp zealots serving the multi-headed beast.", hp: 92, ac: 17, atk: 12, dmg: 13, xp: 315, gold: 150, items: rollRandomLoot(["consumable", "material"], 1, "very_rare"), flee: 1 },
        choices: [
          { t: "Wading through crimson-tinged bog water, confront the Venom Maw Hydra!", to: 3 }
        ]
      },
      3: {
        zone: "Heart of Red Craw Marsh",
        title: "The Venom Maw Hydra",
        text: "Five hissing serpentine heads erupt from the black marsh pool, dripping sizzling emerald venom that melts reeds to ash!",
        enemy: { name: "Venom Maw Hydra", desc: "Terrifying multi-headed acid-spitting swamp titan.", hp: 120, ac: 18, atk: 13, dmg: 15, xp: 450, gold: 310, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "very_rare") },
        choices: [
          { t: "Meet the four approaching Trollkin Reavers searching for their fallen kin!", to: 4 }
        ]
      },
      4: {
        zone: "Red Craw Clearing",
        title: "Peace Restored",
        text: "Four heavily armed Trollkin Reavers emerge from the fog—and seeing the dead Venom Maw Hydra and their fallen brother's untouched axe, they lower their weapons in deep honor and gift you the Peacekeeper Axe!",
        onEnter: { items: ["bq_red_craw_battleaxe"], healHp: 20, msg: "The Trollkin Reavers honor your integrity (+20 HP) and gift the Red Craw Peacekeeper Axe!" },
        choices: [
          { t: "Escort the trollkin envoy back to the village elder to renew the crayfish truce.", to: 5 }
        ]
      },
      5: {
        zone: "Marshside Village",
        title: "Feast of Red Crayfish",
        text: "Villagers and trollkin alike raise mugs around a roaring bonfire as the lucrative crayfish harvest resumes in peace.",
        choices: [
          { t: "Accept the joint reward of both communities.", to: 6 }
        ]
      },
      6: {
        zone: "Oakhaven Return",
        title: "Peacemaker of the Marsh",
        text: "Bards praise both your hydra-slaying steel and your wise diplomacy.",
        choices: [
          { t: "Complete the adventure!", to: 7 }
        ]
      },
      7: {
        zone: "Epilogue",
        title: "Savior of Red Craw Marsh",
        text: "A needless war was averted, the Venom Maw Hydra is slain, and peace endures in the marsh.",
        ending: { type: "true", title: "Peacemaker of Red Craw Marsh", xp: 510, gold: 480, trophy: "Venom Maw Hydra Fang" },
        choices: []
      }
    }
  }
});
