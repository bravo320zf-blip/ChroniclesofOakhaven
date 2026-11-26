/* ============================================================
   EXPANSION QUESTS — NIGHTFELL SAGA (6 Chapters)
   ============================================================ */
window.OAKHAVEN.registerQuests({
	  // ==========================================================
      // NIGHTFELL PART I: SECRETS IN THE ICE (12 PAGES • LV 2)
      // ==========================================================
      nf_1_secrets_ice: {
        id: "nf_1_secrets_ice",
        title: "Nightfell I: Secrets in the Ice",
        subtitle: "Alper Cycle (Part 1 of 6) • The Watchers of Alper & Black Log",
        difficulty: "Medium-Hard",
        recommendedLevel: 2,
        autoDiscover: true,
        discoverySource: "Watcher Recruiter Nikolas (Tavern) or Quest Board",
        summary: "Enlist in the Watchers of Alper at Northern Lookout, pursue Krampus raiders across the Crystal Mounts and Lake of Mounds, and uncover the horrifying truth of Black Log.",
        totalPages: 12,
        pages: {
          1: { zone:"Northern Lookout", title:"The Protectors of the North", safeRetreat:true, text:"In the frost-rimmed fortress of Northern Lookout, a bleeding messenger collapses before your Sergeant: 'Captain Snaer needs aid at Darkmist—Krampus slaughtered the lumbermen!' Summoned to General Aivar's private quarters, you notice a painting of young Aivar with a pale red-haired woman, a frost-crystal pendant, and a parchment mentioning 'Black Log.'", choices:[
            { t:"Set out under the Ascending/Full Moon (sharper sight, fiercer beasts).", to:2, onChoose:{ cw:"FULL_MOON", msg:"Chose the Full Moon phase! (+Insight, fiercer foes)" } },
            { t:"Set out under the Descending/New Moon (dimmer trail, calmer night).", to:2, onChoose:{ cw:"NEW_MOON", msg:"Chose the New Moon phase! (Shadowed trails)" } },
            { t:"Quietly study Aivar's desk and bookshelf before leaving.", badge:"Perception / Lore DC 12", check:{ stat:"spirit", skill:"Perception", dc:12, pass:2, fail:2, passMsg:"You spot frost grooves behind his shelf and note 'Black Log'!", failMsg:"Aivar's icy glare cuts your inspection short." }, onPass:{ cw:"AIVAR_SUSPECT", msg:"Gained AIVAR_SUSPECT!" } }
          ]},
          2: { zone:"Darkmist Stronghold", title:"Captain Snaer 'The Bear'", text:"Three days later you reach Captain Snaer's mountain stronghold above Darkmist. Snaer claims twelve Krampus devoured the lumbermen—yet his eyes dart nervously when questioned. That night, you hear a key turn quietly in your bedroom lock!", choices:[
            { t:"Pick the lock and sneak into Snaer's dungeons!", badge:"Lockpicking / Stealth DC 11", check:{ stat:"agility", skill:"Lockpicking", dc:11, pass:3, fail:4, failDmg:3, passMsg:"You slip down to the cells unseen!", failMsg:"Guards catch you in the hall and rough you up (-3 HP)!" } },
            { t:"Rest until dawn and march into the Crystal Mounts with the Sergeant.", to:4, onChoose:{ healHp:6, msg:"Rested briefly (+6 HP) before the ascent." } }
          ]},
          3: { zone:"Darkmist Dungeons", title:"The Tortured Lumbermen", text:"In Snaer's cellar lie two lumbermen—not mauled by beasts, but tortured to silence! You realize the Krampus were a 'shipment' that escaped Snaer's custody! You pocket a hidden pouch before slipping back before dawn.", onEnter:{ cw:"SNAER_SECRET", gold:30, items: rollRandomLoot(["consumable","valuable"], 1, "uncommon"), msg:"Uncovered SNAER_SECRET! (+30 GP & loot)" }, choices:[
            { t:"Depart at dawn for the Crystal Mounts.", to:4 }
          ]},
          4: { zone:"Crystal Mounts", title:"Bloodstained Snow", text:"Blizzards howl across thin ice bridges and crevasses. Suddenly, a starving Polar Bear and mountain wolves lunge from the snowdrifts!", enemy:{ name:"Crystal Mounts Predators", desc:"Starving polar bear and frost-wolves.", hp:22, ac:11, atk:4, dmg:4, xp:45, gold:15, items: rollRandomLoot(["consumable","material"], 1, "uncommon"), flee:1 }, choices:[
            { t:"Follow the Krampus tracks toward the burning fires of Bedrock Barn!", to:5 }
          ]},
          5: { zone:"Bedrock Barn", title:"The Garnars' Despair", text:"Horrific screams echo from a Garnar settlement built near Bedrock Barn! Six horned Krampus and their hulking Bloodthirsty Krampus leader tear through the wooden palisade!", enemy:{ name:"Bloodthirsty Krampus Pack", desc:"Feral horned raiders fighting to the death.", hp:26, ac:12, atk:4, dmg:5, xp:60, gold:30, items:["nf_krampus_cleaver", ...rollRandomLoot(["consumable"], 1, "uncommon")], flee:1 }, choices:[
            { t:"Speak with elderly Headman Rotvaast.", to:6 }
          ]},
          6: { zone:"Bedrock Barn", title:"Rotvaast's Plea", text:"Headman Rotvaast grips your arm with bleeding fists. 'The remaining Krampus kidnapped six of our children and fled east across the Lake of Mounds! Please—save them!' Your Sergeant insists you pursue them immediately.", onEnter:{ healHp:8, msg:"Rotvaast shares 5 days of Garnar rations (+8 HP)." }, choices:[
            { t:"March east onto the frozen Lake of Mounds.", to:7 }
          ]},
          7: { zone:"Lake of Mounds", title:"Ghosts in the Mist", text:"Perennial ice stretches past countless Garnar burial mounds shrouded in choking white fog. The air freezes your soul as a Heathen Horror skull-fire and Glacier Skeletons rise from the snow!", enemy:{ name:"Heathen Horror & Glacier Skeletons", desc:"Cursed burning skull and frozen undead.", hp:26, ac:12, atk:5, dmg:5, undead:true, xp:65, gold:25, items: rollRandomLoot(["material","valuable"], 1, "rare"), flee:6 }, choices:[
            { t:"Press onward through the Mist Labyrinth.", badge:"Survival / Spirit DC 11", check:{ stat:"spirit", skill:"Survival", dc:11, pass:8, fail:8, failDmg:5, passMsg:"You navigate the blinding whiteout safely!", failMsg:"Exhaustion and frostbite drain your strength (-5 HP)!" } }
          ]},
          8: { zone:"Eternal Tundra", title:"The Slaughtered Krampus", text:"Emerging from the mist, you stare in horror at the snow soaked in crimson: the five Krampus you chased lie dismembered—slaughtered by something far deadlier. Human footprints lead straight to a hidden village lit in the tundra: Black Log.", choices:[
            { t:"Enter Black Log under the New Moon (crowded tavern).", reqCw:"NEW_MOON", badge:"NEW_MOON", to:9 },
            { t:"Enter Black Log under the Full Moon (eerie silent village).", to:10 }
          ]},
          9: { zone:"Black Log", title:"Carald's Crimson Feast", text:"The Sergeant slips off to find the headwoman, leaving you at the inn. Innkeeper Carald serves red wine and meat stew—one sip reveals it is warm blood and human remains! Five pale villagers hiss, baring fangs: Progeny of Acirenzia!", enemy:{ name:"Progeny of Acirenzia", desc:"Vampire villagers of Black Log.", hp:28, ac:12, atk:5, dmg:5, undead:true, xp:75, gold:40, items: rollRandomLoot(["valuable","consumable"], 1, "rare") }, choices:[
            { t:"Burst out into the square as twenty vampires surround you!", to:11 }
          ]},
          10: { zone:"Black Log", title:"The Silent Houses & Tunnels", text:"The village stands eerily empty, yet pantries overflow with jars of blood! Following children's cries down a floor trapdoor leads into a subterranean altar cavern—where dozens of vampires hang upside down from the ceiling!", enemy:{ name:"Cavern Progeny of Acirenzia", desc:"Feral vampire ambushers.", hp:28, ac:12, atk:5, dmg:5, undead:true, xp:75, gold:40, items: rollRandomLoot(["valuable","consumable"], 1, "rare") }, choices:[
            { t:"Fight until the Sergeant and a red-haired woman step from the shadows!", to:11 }
          ]},
          11: { zone:"Black Log", title:"Betrayal of the Blood Moon", text:"The vampires part for your Sergeant and Murian—the red-haired woman from General Aivar's portrait! 'The Watchers of Alper are merely our front,' the Sergeant smirks. 'We are the Sect of the Blood Moon! The Krampus were meant as tribute; when they escaped, you recruits became their replacement. Swear a false oath to survive and infiltrate us, or fight your way out of the ring!'", choices:[
            { t:"Feign an oath to the Sect of the Blood Moon to survive & uncover Aivar's plans!", to:12, onChoose:{ cw:"SECT_INFILTRATOR", items:["nf_blood_moon_ring"], msg:"Joined the Sect in secret! Claimed Signet of the Blood Moon." } },
            { t:"Defy Murian and cut through her honor guard to escape into the night!", to:12, onChoose:{ dmg:6, items:["nf_blood_moon_ring"], msg:"Bloodied (-6 HP), you tear a Signet from a fallen acolyte and survive!" } }
          ]},
          12: { zone:"Epilogue", title:"Secrets in the Ice", text:"Whether bound by a bitter oath or marked by Murian's vampires, you have learned the dark secret of Alper. Return to Oakhaven to prepare—<strong>Nightfell Part II: Child of Blood</strong> is now unlocked on your Quest Board!", ending:{ type:"true", title:"Survivor of Black Log (Nightfell I)", xp:115, gold:110, trophy:"Blood Moon Medallion" }, choices:[] }
        }
      },

      // ==========================================================
      // NIGHTFELL PART II: CHILD OF BLOOD (12 PAGES • LV 3)
      // Prerequisite: nf_1_secrets_ice
      // ==========================================================
      nf_2_child_blood: {
        id: "nf_2_child_blood",
        reqQuest: "nf_1_secrets_ice",
        title: "Nightfell II: Child of Blood",
        subtitle: "Alper Cycle (Part 2 of 6) • Northern Lookout & The Wailing Mire",
        difficulty: "Hard",
        recommendedLevel: 3,
        autoDiscover: true,
        discoverySource: "Unlocks after Nightfell I: Secrets in the Ice",
        summary: "Survive Murian's arena test, hunt dissident vampires beneath Northern Lookout, meet Lyvar thief-lord Iximisi Darkeye, and decide the fate of the prophesied Child of Blood.",
        totalPages: 12,
        pages: {
          1: { zone:"Black Log Arena", title:"A Test of Loyalty", safeRetreat:true, text:"Beneath Murian's cold gaze in Black Log's underground arena, two enslaved Garnar Bear Warriors charge with one-handed greataxes! Murian demands you prove your worth before sending you to Northern Lookout to hunt a coven of dissident vampires.", enemy:{ name:"Garnar Bear Warriors", desc:"Desperate enslaved warriors fighting in Murian's pit.", hp:28, ac:12, atk:5, dmg:6, xp:70, gold:30, items: rollRandomLoot(["consumable","valuable"], 1, "rare"), flee:1 }, choices:[
            { t:"Accept Murian's mission and depart with her two Vampire Acolyte watchers.", to:2 }
          ]},
          2: { zone:"Northern Range", title:"The Cold Night Road", text:"Five freezing days lie between Black Log and Northern Lookout, with Murian's two Vampire Acolytes watching your every whisper. On the third night, a Shadow of the Echoes detaches from the snow!", enemy:{ name:"Shadow of the Echoes", desc:"Soul-hungry entity from the Dark Mirror.", hp:29, ac:13, atk:5, dmg:6, undead:true, xp:75, gold:25, items: rollRandomLoot(["material","consumable"], 1, "rare"), flee:1 }, choices:[
            { t:"Enter the underground district of Northern Lookout.", to:3 }
          ]},
          3: { zone:"Northern Lookout Hypogea", title:"The Tavern of the Last Sun", text:"Carved deep beneath the fortress-city, the Last Sun district houses Rizadrin moon-satyrs and Lyvar faelings. Murian's acolytes remain at the tavern while you explore the Deep Alleys and Sanctuary of Mirithlen.", choices:[
            { t:"Rescue a Night Faeling from Cursed Fanatics in the Deep Alleys!", to:4 },
            { t:"Seek information at the Sanctuary of Mirithlen.", badge:"Persuasion / Lore DC 11", check:{ stat:"spirit", skill:"Persuasion", dc:11, pass:5, fail:4, passMsg:"The priestesses praise peaceful vampires and whisper of Darkeye!", failMsg:"Suspicious of Black Log, they turn you away toward the alleys!" } }
          ]},
          4: { zone:"Deep Alleys", title:"Foiling a Kidnapping", text:"Two Cursed Fanatics corner the tavern-keeper's Lyvar son in a dead-end alley!", enemy:{ name:"Cursed Fanatics", desc:"Undead cultists stalking the hypogea.", hp:28, ac:12, atk:5, dmg:6, undead:true, xp:72, gold:35, items: rollRandomLoot(["consumable","valuable"], 1, "rare"), flee:3 }, choices:[
            { t:"Light four candles at the Tavern of the Last Sun to summon Iximisi Darkeye!", to:5, onChoose:{ cw:"LYVAR_TRUST", msg:"Earned the gratitude of the Last Sun (LYVAR_TRUST)!" } }
          ]},
          5: { zone:"Abandoned Sanctuary", title:"Iximisi Darkeye's Trap", text:"Mohawked Lyvar thief-lord Iximisi Darkeye of the Spry Eyes Guild leads you into a ruined underground hall—where Lyvar Raiders drop from the rafters with poisoned blades!", choices:[
            { t:"Prove you oppose Murian and offer an alliance against the Blood Moon!", reqCw:"LYVAR_TRUST", badge:"LYVAR_TRUST", to:7, onChoose:{ cw:"IXIMISI_ALLY", items:["nf_spry_eyes_dirk"], msg:"Iximisi lowers his blades and gifts Iximisi's Shadow-Dirk!" } },
            { t:"Fight through Iximisi Darkeye and his Spry Eyes ambush!", to:6 }
          ]},
          6: { zone:"Abandoned Sanctuary", title:"Clash With the Spry Eyes", text:"Iximisi Darkeye weaves through shadows with poisoned shortswords!", enemy:{ name:"Iximisi Darkeye & Raiders", desc:"Cunning Lyvar guildmaster and assassins.", hp:32, ac:13, atk:5, dmg:6, xp:85, gold:50, items:["nf_spry_eyes_dirk"], flee:3 }, choices:[
            { t:"Spare Iximisi in exchange for leading you to the dissident vampires' temple.", to:7, onChoose:{ cw:"IXIMISI_SPARED", msg:"Iximisi agrees to guide you to the hidden temple." } }
          ]},
          7: { zone:"Hidden Lunar Temple", title:"Birth of the Child of Blood", text:"Through a rift in the cave ceiling, a pure beam of moonlight illuminates a stone altar where pacifist Vampire Cultists chant around a dying mother—birthing the prophesied Child of Blood, Mirithlen's chosen weapon against Acirenzia! Suddenly, Murian's Vampire Acolytes burst in with drawn steel!", choices:[
            { t:"REBEL against the Sect: Defend the Child & escort him to the Apostates of Rahidra!", to:8, onChoose:{ cw:"REBEL_PATH", msg:"Chose to defend the Child of Blood!" } },
            { t:"SERVE the Sect: Slay the Cultists & bring the Child to the Strix witches!", to:9, onChoose:{ cw:"SECT_PATH", msg:"Chose to serve Murian's Sect!" } }
          ]},
          8: { zone:"Hidden Lunar Temple", title:"Defending Mirithlen's Chosen", text:"Murian's Vampire Acolytes hiss in fury as you turn your blade against the Sect!", enemy:{ name:"Murian's Vampire Acolytes", desc:"Loyal blood-hunters of Black Log.", hp:33, ac:13, atk:5, dmg:6, undead:true, xp:90, gold:45, items:["nf_lunar_blessing_orb"], flee:3 }, choices:[
            { t:"Climb the frozen Northern Range toward the Wailing Mire!", to:10 }
          ]},
          9: { zone:"Hidden Lunar Temple", title:"Purge of the Dissidents", text:"The Vampire Cultists of the Child raise lunar magic to shield the newborn!", enemy:{ name:"Vampire Cultists of the Child", desc:"Devout dissident vampires.", hp:32, ac:12, atk:5, dmg:6, undead:true, xp:90, gold:55, items: rollRandomLoot(["valuable","accessory"], 1, "rare"), flee:3 }, choices:[
            { t:"Drag the unharmable Child across the Northern Range to the Wailing Mire!", to:10 }
          ]},
          10: { zone:"Northern Range", title:"The Long Climb & Centicores", text:"On a sheer frozen ridge, howling Centicores trigger a snowslide! Reaching the summit reveals a gleaming Circlet of Last Light wedged in the ice.", choices:[
            { t:"Scale the ridge with Athletics / Survival to claim the Circlet!", badge:"Might / Survival DC 12", check:{ stat:"might", skill:"Survival", dc:12, pass:11, fail:11, failDmg:5, passMsg:"Flawless climb! Claimed Circlet of Last Light!", failMsg:"Avalanche stone batters you (-5 HP), yet you snatch the Circlet!" }, onPass:{ items:["nf_circlet_last_light"] } }
          ]},
          11: { zone:"The Wailing Mire", title:"Showdown in the Fog", text:"Ghostly fog blankets the Wailing Mire as the Child of Blood stands between the coven of Strix witches and the howling Apostates of Rahidra! Steel and dark magic collide!", enemy:{ name:"Lesser Strix & Mire Coven", desc:"Ancient bog-witches and rivals of the Wailing Mire.", hp:38, ac:13, atk:6, dmg:7, xp:135, gold:95, items: rollRandomLoot(["weapon","armor","accessory"], 1, "very_rare"), weakCw:["IXIMISI_ALLY"] }, choices:[
            { t:"Witness the Prime soul of the Child surge into the night!", to:12 }
          ]},
          12: { zone:"Epilogue", title:"Tides of War", text:"The Child's radiant essence shatters across the mire, empowering your spirit—yet war between Murian's Blood Moon army and Northern Lookout is now unavoidable! <strong>Nightfell Part III: Under a Pale Moon</strong> is now unlocked on your Quest Board!", ending:{ type:"true", title:"Bearer of the Child's Fate (Nightfell II)", xp:140, gold:135, trophy:"Lunar Shard of Mirithlen" }, choices:[] }
        }
      },

      // ==========================================================
      // NIGHTFELL PART III: UNDER A PALE MOON (12 PAGES • LV 4)
      // Prerequisite: nf_2_child_blood
      // ==========================================================
      nf_3_pale_moon: {
        id: "nf_3_pale_moon",
        reqQuest: "nf_2_child_blood",
        title: "Nightfell III: Under a Pale Moon",
        subtitle: "Alper Cycle (Part 3 of 6) • Frozen Rock & The Ice Wyrm",
        difficulty: "Hard",
        recommendedLevel: 4,
        autoDiscover: true,
        discoverySource: "Unlocks after Nightfell II: Child of Blood",
        summary: "Escape Paladin Katryna Silvermoon's dungeon, infiltrate Murian's war camp, confront the Serpent Cult of Frozen Rock, slay the ancient Tatzelwurm, and settle the war under a pale moon!",
        totalPages: 12,
        pages: {
          1: { zone:"The Old Tower", title:"Captured by Katryna Silvermoon", safeRetreat:true, text:"Flaming arrows rain down from the Old Tower as the Blood Moon's assault falters! Paladin Katryna Silvermoon and Archmage Blackraven capture you—yet in the damp dungeon, Katryna's squire Anselmus unlocks your cell! At the east gate, Blackraven hands you a bronze tracking coin: 'Stop Murian, or Alper burns.'", choices:[
            { t:"Accept Blackraven's coin and return to Murian's war camp as a double agent.", to:2, onChoose:{ cw:"KATRYNA_PACT", msg:"Allied secretly with Katryna & Blackraven!" } },
            { t:"Refuse the coin and ride back to Murian's camp on your own terms.", to:2 }
          ]},
          2: { zone:"Blood Moon War Camp", title:"A Nest of Snakes", text:"Inside Murian's lavish war-tent sit General Sadira, crow-masked Strix Pekka, and feral Moon Satyr chieftain Baurjien. Murian opens a velvet box of crimson Grim Daggers: 'Find the hidden mountain passage near Frozen Rock and slay the ancient evil blocking it!'", onEnter:{ items:["nf_murian_grim_dagger"], msg:"Received Murian's Grim Wyrm-Dagger!" }, choices:[
            { t:"Challenge Moon Satyr Baurjien in the sand wrestling ring!", badge:"Might / Athletics DC 12", check:{ stat:"might", skill:"Athletics", dc:12, pass:3, fail:3, failDmg:4, passMsg:"You throw his champion out of the ring! Baurjien gifts his Skull Necklace!", failMsg:"Bruised in the sand (-4 HP), yet Baurjien warns you of the ice wyrm!" }, onPass:{ items:["nf_baurjien_necklace"] } },
            { t:"Consult Pekka's cauldron (-2 HP) for a prophecy before departing.", to:3, onChoose:{ dmg:2, cw:"PEKKA_OMEN", msg:"Pekka whispers: 'Strike the dragon's blind right side!'" } }
          ]},
          3: { zone:"Crystal Mounts Trail", title:"Ice Red Blood", text:"A sudden blizzard drops a pack of weapon-hungry Squasc monkeys onto you from the frozen cliffs!", enemy:{ name:"Mountain Squasc Pack", desc:"Feral white-haired cliff predators.", hp:30, ac:12, atk:5, dmg:6, xp:80, gold:30, items: rollRandomLoot(["consumable","material"], 1, "rare"), flee:1 }, choices:[
            { t:"Follow the forged weapon brands to the village of Frozen Rock.", to:4 }
          ]},
          4: { zone:"Frozen Rock", title:"The Serpent Cult Mines", text:"Black forge smoke rises from Frozen Rock, where High Priest Irikur's Serpent Cultists forge weapons for Murian using undead Servants of the Serpent in the mines! Inside the prison cages you spot Sergeant Sighurt and his captured Watchers patrol!", choices:[
            { t:"Storm the mine guards and free Sergeant Sighurt's patrol!", to:5 },
            { t:"Sneak past the village straight up the goat path to the Cave of Eternal Frost.", badge:"Stealth DC 12", check:{ stat:"agility", skill:"Stealth", dc:12, pass:6, fail:5, passMsg:"You slip past the cultists unseen!", failMsg:"Horn blasts echo—the Serpent Priest spots you!" } }
          ]},
          5: { zone:"Frozen Rock Mines", title:"Priest of the Serpent", text:"A hooded Priest of the Serpent unleashes undead miners to stop you from freeing Sighurt!", enemy:{ name:"Priest & Servants of the Serpent", desc:"Dragon-worshipping necromancer and undead miners.", hp:34, ac:13, atk:5, dmg:6, undead:true, xp:95, gold:55, items: rollRandomLoot(["valuable","consumable"], 1, "rare"), flee:1 }, choices:[
            { t:"Free Sighurt's patrol (they reveal the secret path & warn Northern Lookout)!", to:6, onChoose:{ cw:"SIGHURT_FREED", msg:"Freed Sighurt's Watchers patrol (SIGHURT_FREED)!" } }
          ]},
          6: { zone:"Cave of Eternal Frost", title:"Room of Mirrors", text:"Inside the mountain's breathing ice-rift, your reflection in a mirror-smooth wall warps into a screaming corpse—and shatters as a Glacier Mummy bursts forth!", enemy:{ name:"Glacier Mummy & Skeletons", desc:"Frozen guardians entombed behind ice mirrors.", hp:34, ac:13, atk:6, dmg:6, undead:true, xp:98, gold:40, items: rollRandomLoot(["consumable","material"], 1, "very_rare"), flee:1 }, choices:[
            { t:"Cross the cracking underground ice lake!", badge:"Agility / Athletics DC 12", check:{ stat:"agility", skill:"Athletics", dc:12, pass:7, fail:7, failDmg:6, passMsg:"You slide cleanly to the far rock shore!", failMsg:"Freezing water bites your legs (-6 HP) as you haul yourself out!" } }
          ]},
          7: { zone:"Tatzelwurm's Cavern", title:"The Scarred Ice Dragon", text:"Coiled in the heart of the mountain slumbers the ancient Tatzelwurm—the right side of its skull stripped to bare ivory bone, its right wing a severed stump! Your Grim Dagger glows an eerie green in its presence!", choices:[
            { t:"Collapse the ceiling stalactites & flank its blind right eye!", badge:"Perception / Arcana DC 12", check:{ stat:"arcana", skill:"Perception", dc:12, pass:8, fail:8, passMsg:"Falling ice pins the wyrm as your Grim Dagger poisons its blood!", failMsg:"The wyrm awakens with a deafening frost roar!" }, onPass:{ cw:"WYRM_BLINDED" } },
            { t:"Charge the ancient Tatzelwurm head-on!", to:8 }
          ]},
          8: { zone:"Tatzelwurm's Cavern", title:"Wrath of Eternal Frost", text:"Blizzard breath and sword-length ivory fangs tear through the cavern!", enemy:{ name:"Ancient Tatzelwurm", desc:"Scarred frost-dragon of the Crystal Mounts.", hp:44, ac:14, atk:6, dmg:7, xp:165, gold:130, items:["nf_tatzelwurm_tiara", ...rollRandomLoot(["weapon","armor","accessory"], 1, "very_rare")], weakCw:["WYRM_BLINDED","PEKKA_OMEN"] }, choices:[
            { t:"Return to Murian's war camp with the mountain passage cleared!", to:9 }
          ]},
          9: { zone:"Ancient Temple Ruins", title:"Meeting Under a Pale Moon", text:"Blackraven has arranged a fragile truce at the ruined stone altar between the two armies: General Aivar, Arthor, and Katryna Silvermoon face Murian and Sadira! Suddenly, war-horns blare across the valley!", choices:[
            { t:"Betray Murian—stand with Katryna and end the Blood Moon's tyranny!", to:10 },
            { t:"Stand with Murian—clash against Katryna Silvermoon and the Watchers!", to:11 }
          ]},
          10: { zone:"Ancient Temple Ruins", title:"Fall of the Blood Moon", text:"The Moon Satyrs desert the camp! Shrieking 'TRAITOR!', Murian and General Sadira lunge with crimson claws!", enemy:{ name:"Murian & General Sadira", desc:"Vampire sovereign of Black Log and her war-general.", hp:46, ac:14, atk:7, dmg:7, undead:true, xp:190, gold:150, items:["nf_silvermoon_blade", ...rollRandomLoot(["accessory","valuable"], 1, "legendary")], weakCw:["SIGHURT_FREED","KATRYNA_PACT"] }, choices:[
            { t:"Watch the pale moon rise over a liberated Alper!", to:12 }
          ]},
          11: { zone:"Ancient Temple Ruins", title:"Steel Against Silverlight", text:"Katryna Silvermoon raises her radiant blade as Blackraven's spells crackle overhead!", enemy:{ name:"Katryna Silvermoon & Defenders", desc:"Radiant champion of Mirithlen.", hp:48, ac:15, atk:7, dmg:7, xp:195, gold:160, items:["nf_silvermoon_blade", ...rollRandomLoot(["armor","valuable"], 1, "legendary")] }, choices:[
            { t:"Claim the battlefield under the pale moon!", to:12 }
          ]},
          12: { zone:"Epilogue", title:"End of the Alper Cycle", text:"The frozen north is changed forever by your choices. Leaving the snows of Alper behind, you travel south toward the Eastern Mark—<strong>Nightfell Part IV: The Curse of Owlrock</strong> (Witches' Cycle) is now unlocked!", ending:{ type:"true", title:"Champion of the Pale Moon (Nightfell III)", xp:185, gold:180, trophy:"Silvermoon War-Signet" }, choices:[] }
        }
      },

      // ==========================================================
      // NIGHTFELL PART IV: THE CURSE OF OWLROCK (10 PAGES • LV 5)
      // Prerequisite: nf_3_pale_moon
      // ==========================================================
      nf_4_curse_owlrock: {
        id: "nf_4_curse_owlrock",
        reqQuest: "nf_3_pale_moon",
        title: "Nightfell IV: The Curse of Owlrock",
        subtitle: "Witches' Cycle (Part 4 of 6) • Mirgan Grimfeather's Hex",
        difficulty: "Very Hard",
        recommendedLevel: 5,
        autoDiscover: true,
        discoverySource: "Unlocks after Nightfell III: Under a Pale Moon",
        summary: "Arrive in the besieged lunar city of Owlrock, exorcise the Moonsong Inn, learn the secret of the Eldritch Cluster from High Priestess Anvernia, and confront witch Mirgan Grimfeather.",
        totalPages: 10,
        pages: {
          1: { zone:"Owlrock Gates", title:"Assault at the Palisade", safeRetreat:true, text:"Emerging from the fringes of the Forest of Streghi, you hear steel clashing at Owlrock's gates! Captain Panvéus and his Wardens of the Dead battle four stinking Foul Guls drawn by a creeping city-wide curse!", enemy:{ name:"Owlrock Foul Guls", desc:"Paralyzing fiendish corpse-eaters.", hp:36, ac:13, atk:6, dmg:7, xp:115, gold:40, items: rollRandomLoot(["consumable","material"], 1, "very_rare"), flee:1 }, choices:[
            { t:"Seek an audience with High Priestess Anvernia at Mirithrun.", to:2 },
            { t:"Investigate the Wells District and Moonsong Inn first.", to:3 }
          ]},
          2: { zone:"Mirithrun Temple", title:"Audience With Anvernia", text:"Beneath hanging pearls and moonstones, High Priestess Anvernia reveals the suspect: outcast witch Mirgan Grimfeather, who cast an Eldritch Cluster hex! She explains the purification ritual—turn away, scatter salt and red wine, seal it with iron—and whispers warnings about the vanished village of Vaas.", choices:[
            { t:"Impress Anvernia with Persuasion to earn Holy Dust of Salvation!", badge:"Persuasion / Spirit DC 12", check:{ stat:"spirit", skill:"Persuasion", dc:12, pass:3, fail:3, passMsg:"Anvernia gifts you Holy Dust of Salvation & her Lunar Blessing!", failMsg:"She grants you her writ of investigation." }, onPass:{ cw:"CLUSTER_RITE", items:["nf_holy_dust_salvation"], healHp:10 } }
          ]},
          3: { zone:"Owlrock Streets", title:"Darkness Breaches the City!", text:"Purple lightning splits poison-black clouds as Owlrock's curse peaks! Screams erupt simultaneously from the Graveyard of the Ancestors, the Moonsong Inn, and Master Gadris's Library!", choices:[
            { t:"Rush to the Moonsong Inn to exorcise possessed innkeeper Thorgrun!", badge:"Spirit / Lore DC 12", check:{ stat:"spirit", skill:"Lore", dc:12, pass:4, fail:4, failDmg:6, passMsg:"You banish the Echoes! Samath rewards you with 80 GP & salt/wine!", failMsg:"Thorgrun lashes out (-6 HP) before you pin and free him!" }, onPass:{ cw:"INN_SAVED", gold:80 } },
            { t:"Defend Sareth & Priestess Niryu at the Graveyard of Ancestors!", to:5 }
          ]},
          4: { zone:"Tradition Square", title:"Rescuing Master Gadris", text:"Pouring rain extinguishes the braziers as Sepulchral Guls trap the Masters of Tradition inside the Library!", enemy:{ name:"Sepulchral Guls", desc:"Wailing fiends of the Dark Mirror.", hp:38, ac:14, atk:6, dmg:7, xp:130, gold:55, items: rollRandomLoot(["consumable","valuable"], 1, "very_rare"), flee:1 }, choices:[
            { t:"Approach the breathing, ruined villa in Builder Square!", to:6, onChoose:{ cw:"GADRIS_SAVED", msg:"Master Gadris hands you enchanted salt crystals!" } }
          ]},
          5: { zone:"Graveyard of Ancestors", title:"Presences in the Cemetery", text:"Eight soulless Lemures shamble through the cemetery fog toward wounded guard Sareth!", enemy:{ name:"Cemetery Lemures", desc:"Walking corpses animated by the curse.", hp:35, ac:13, atk:6, dmg:7, undead:true, xp:120, gold:45, items:["nf_oversea_longsword"], flee:1 }, choices:[
            { t:"Approach the cursed abandoned villa in Builder Square!", to:6 }
          ]},
          6: { zone:"Haunted Villa", title:"The Lair of Hatred", text:"The bricks of the abandoned villa seem to expand and contract like a beating heart! Inside, the cellar trapdoor is magically sealed. Upstairs you find Mirgan's torn diary, her petrified Grimoire, and a fireplace chimney leading down—while a dark whisper calls from the dusty loft: a Lost Page of Lagoran!", choices:[
            { t:"Leave the corrupt Lost Page untouched & dispel Mirgan's petrified Grimoire!", badge:"Arcana / Spirit DC 12", check:{ stat:"arcana", skill:"Lore", dc:12, pass:7, fail:7, failDmg:5, passMsg:"You unlock her Grimoire's secrets & gain tactical advantage!", failMsg:"Dark backlash stings you (-5 HP) as you climb down the chimney!" }, onPass:{ cw:"GRIMOIRE_READ", items:["nf_mirgan_grimoire"] } },
            { t:"Climb straight down the narrow chimney into the Cellar!", to:7 }
          ]},
          7: { zone:"Villa Cellar", title:"The Eldritch Cluster", text:"In the stinking old kitchen hides the pulsating Eldritch Cluster of hair, feathers, and bone—beside a skull totem reading: 'Hail, Mazarol, Devourer of Reality.'", choices:[
            { t:"Perform Anvernia's ritual blindly with salt, wine, and iron!", badge:"Arcana / Lore DC 12", check:{ stat:"arcana", skill:"Lore", dc:12, pass:8, fail:8, failDmg:6, passMsg:"You bag the Cluster safely, weakening Mirgan's curse!", failMsg:"The Cluster sears your spirit (-6 HP) before you trap it!" }, onPass:{ cw:"CLUSTER_SECURED" } }
          ]},
          8: { zone:"Villa Pantry", title:"Mirgan Grimfeather", text:"Surrounded by dripping candles stands Mirgan Grimfeather, eyes glassy with hatred: 'They mocked me, cast me out—now Owlrock drowns in the Dark Mirror!' She summons a blazing Heathen Horror to her side!", enemy:{ name:"Mirgan Grimfeather & Horror", desc:"Corrupted Black Druid witch of Owlrock.", hp:48, ac:15, atk:7, dmg:8, xp:215, gold:150, items: rollRandomLoot(["weapon","armor","accessory"], 1, "legendary"), weakCw:["GRIMOIRE_READ","CLUSTER_SECURED"] }, choices:[
            { t:"Dissolve the Eldritch Cluster using Mirgan's Grimoire!", to:9 }
          ]},
          9: { zone:"Mirithrun Temple", title:"Light Returns to Owlrock", text:"As the Cluster turns to ash, the poison clouds break! High Priestess Anvernia awards you 120 GP and an Apotropaic Oversea Sword—and asks you to uncover what befell the cursed village of Vaas on the road to Ervenrun.", onEnter:{ gold:120, items:["nf_oversea_longsword"], msg:"Rewarded 120 GP & Apotropaic Oversea Sword!" }, choices:[
            { t:"Depart Owlrock toward Vaas & Ervenrun! (Unlocks Part V)", to:10 }
          ]},
          10: { zone:"Epilogue", title:"Bringer of Light", text:"Owlrock hails you as a savior, yet the name carved on Mirgan's cellar totem—Mazarol—echoes in your dreams. <strong>Nightfell Part V: The House that Drowns in the Woods</strong> is now unlocked!", ending:{ type:"true", title:"Curse-Breaker of Owlrock (Nightfell IV)", xp:210, gold:190, trophy:"Purified Moonstone Seal" }, choices:[] }
        }
      },

      // ==========================================================
      // NIGHTFELL PART V: THE HOUSE THAT DROWNS IN THE WOODS (10 PAGES • LV 6)
      // Prerequisite: nf_4_curse_owlrock
      // ==========================================================
      nf_5_drowning_house: {
        id: "nf_5_drowning_house",
        reqQuest: "nf_4_curse_owlrock",
        title: "Nightfell V: The House that Drowns in the Woods",
        subtitle: "Witches' Cycle (Part 5 of 6) • Ghost Village of Vaas & Mazarol",
        difficulty: "Very Hard",
        recommendedLevel: 6,
        autoDiscover: true,
        discoverySource: "Unlocks after Nightfell IV: The Curse of Owlrock",
        summary: "Take shelter from a storm in the eerie village of Vaas, survive the deconsecrated hilltop temple, brave the Forest of Streghi, and escape the awakening of Mazarol!",
        totalPages: 10,
        pages: {
          1: { zone:"Village of Vaas", title:"The Nameless Inn", safeRetreat:true, text:"Driven by a lightning storm off the road to Ervenrun, you shelter in Albar's weirdly cold Nameless Inn. By the dead hearth, madman Aldur screams: 'Ghelion's house in the Forest of Streghi is alive—Mazarol is taking revenge!' Upstairs in a sumptuous bedroom, a pale little girl in white shoes bursts laughing from the closet and vanishes!", choices:[
            { t:"Follow the trail of small candles through the fog to Francés Rek's shop.", to:2 },
            { t:"Brave the blinding fog blindly without following the candles.", badge:"Spirit / Survival DC 13", check:{ stat:"spirit", skill:"Survival", dc:13, pass:2, fail:2, failDmg:6, passMsg:"You spot Francés Rek's lantern through the mist!", failMsg:"Supernatural dread chills your bones (-6 HP) before you find the candles!" } }
          ]},
          2: { zone:"Vaas Square", title:"Francés Rek's Emporium", text:"Strange shopkeeper Francés Rek—who sells 'forgotten memories and lost courage'—whispers that the Brass Key to the forest house is held by the Lunar Priestess at the hilltop church. Stepping outside, her shop is suddenly empty and abandoned, while disappearing boot-prints lead uphill!", choices:[
            { t:"Climb the dead-tree path to the Hilltop Cemetery & Church.", to:3 }
          ]},
          3: { zone:"Hilltop Cemetery", title:"The Mosaic Fragments", text:"On a tombstone marked 'Tora & Dure' you spot a stone Mosaic Fragment—just as fifteen rotting Lemures claw out of the graves! Behind the barred church door a trembling voice begs you to flee!", enemy:{ name:"Vaas Cemetery Lemures", desc:"Risen villagers of forgotten Vaas.", hp:40, ac:13, atk:6, dmg:7, undead:true, xp:140, gold:35, items: rollRandomLoot(["consumable","valuable"], 1, "very_rare"), flee:1 }, choices:[
            { t:"Break into the church and confront the voice behind the altar!", to:4 }
          ]},
          4: { zone:"Deconsecrated Church", title:"The Crumbling Watcher", text:"The man behind the altar is a long-dead corpse—touching him reduces him to dust, revealing the second Mosaic Fragment! Fitting both fragments into the metal door opens the freezing crypt below.", choices:[
            { t:"Descend into the crypt toward the rhythmic ringing of a hammer!", to:5 }
          ]},
          5: { zone:"Church Crypt", title:"Vanisia, Nailed to the Throne", text:"Seated on a wooden throne sits Lunar Priestess Vanisia, her own legs nailed to the wood with iron spikes to keep her possessed body from escaping! With an inhuman shriek, she rips free and swings her cursed hammer!", enemy:{ name:"Vanisia, Enthralled Priestess", desc:"Possessed receptacle of the Echoes of Death.", hp:48, ac:14, atk:7, dmg:8, undead:true, xp:185, gold:80, items:["nf_vanisia_hammer", ...rollRandomLoot(["accessory","consumable"], 1, "very_rare")] }, choices:[
            { t:"Read Vanisia's diary, take the Brass Key & follow the little girl into the Forest of Streghi!", to:6, onChoose:{ cw:"VAAS_TRUTH", msg:"Learned of the four witches burned at the stake in Vaas!" } }
          ]},
          6: { zone:"Forest of Streghi", title:"The Breathing Woods", text:"The forest itself seems to inhale and exhale! Along the candle-lit path, a clearing of charred corpses animates into a bone-and-wood Badelisk, while dark Mazarol footprints scar the mud!", enemy:{ name:"Streghi Badelisk", desc:"Dark construct of bones and witch-wood.", hp:46, ac:14, atk:7, dmg:8, xp:175, gold:60, items: rollRandomLoot(["material","valuable"], 1, "very_rare"), flee:1 }, choices:[
            { t:"Dodge the Mazarol footprints and unlock Ghelion's forest house!", badge:"Agility / Perception DC 13", check:{ stat:"agility", skill:"Perception", dc:13, pass:7, fail:7, failDmg:8, passMsg:"You step cleanly around the necrotic tracks!", failMsg:"A Mazarol footprint sears your soul (-8 HP)!" } }
          ]},
          7: { zone:"Ghelion's House", title:"Leliam's Bedroom", text:"Unlocking the door with the wailing Brass Key reveals portraits of gamekeeper Ghelion, his son Leliam, and a little girl. Following the ghostly child to the bedroom, you find Leliam's corpse pinned to the bed by a glowing Grim Dagger +2—and 80 GP in a drawer!", onEnter:{ gold:80, items:["nf_leliam_grim_dagger"], msg:"Pulled Leliam's Grim Dagger +2 (+80 GP)!" }, choices:[
            { t:"Step outside as a furious, burn-scarred witch screams from the trees!", to:8 }
          ]},
          8: { zone:"Forest Clearing", title:"Arkea the Burned Witch", text:"'He burned my sisters—I summoned Mazarol to swallow Vaas whole!' shrieks Arkea, one of the surviving witches, leaping forward with twin cursed scimitars!", enemy:{ name:"Arkea, Witch of Mazarol", desc:"Vengeful witch imbued with primordial darkness.", hp:56, ac:15, atk:8, dmg:8, xp:240, gold:150, items:["nf_arkea_scimitar", ...rollRandomLoot(["armor","accessory"], 1, "legendary")] }, choices:[
            { t:"RUN! Trees snap as the mammoth fanged darkness of MAZAROL awakens!", to:9 }
          ]},
          9: { zone:"Forest Clearing", title:"Flight From Mazarol", text:"A whirlwind of teeth and shadow crushes the house and devours Arkea's corpse! You cannot fight a forgotten god—ahead, the ghostly little girl beckons from inside a circle of purple flames!", choices:[
            { t:"Sprint at breakneck speed into the little girl's purple-flame circle!", badge:"Might / Agility DC 13", check:{ stat:"agility", skill:"Athletics", dc:13, pass:10, fail:10, failDmg:12, passMsg:"Purple fire flashes—you teleport cleanly into Vaas square!", failMsg:"Mazarol's shadow clips you (-12 HP) as you tumble into the circle!" } }
          ]},
          10: { zone:"Epilogue", title:"The Ghost Village", text:"Back in Vaas, the fog vanishes—revealing rotting ruins dead for decades! Every villager you met was an illusion woven by Leliam's ghostly daughter to free her father's soul. On a dust-covered table lies a single note: 'THANK YOU.' You turn toward Ervenrun—<strong>Nightfell Part VI: Vengeance is Mine</strong> is now unlocked!", ending:{ type:"true", title:"Escaped the Jaws of Mazarol (Nightfell V)", xp:250, gold:220, trophy:"Little Girl's White Ribbon" }, choices:[] }
        }
      },

      // ==========================================================
      // NIGHTFELL PART VI: VENGEANCE IS MINE (15 PAGES • LV 7+ FINALE)
      // Prerequisite: nf_5_drowning_house
      // (Enriched Pass 1)
      // ==========================================================
      nf_6_vengeance_mine: {
        id: "nf_6_vengeance_mine",
        reqQuest: "nf_5_drowning_house",
        title: "Nightfell VI: Vengeance is Mine",
        subtitle: "Witches' Cycle Finale (Part 6 of 6) • Ervenrun & The Ghost Witch",
        difficulty: "Very Hard",
        recommendedLevel: 7,
        autoDiscover: true,
        discoverySource: "Unlocks after Nightfell V: The House that Drowns in the Woods",
        summary: "Save White Town's burning Temple of Truths, track a deadly alchemical conspiracy through Ervenrun's subterranean Enclave, and confront Amelera the Ghost Witch in the Pit of Tears!",
        totalPages: 15,
        pages: {
          1: {
            zone: "Ervenrun Upper City • Temple Plaza",
            title: "Shattered Truth",
            safeRetreat: true,
            text: [
              "At the stroke of midnight, a thunderous green-flame detonation blows the sculpted alabaster face clean off Ervenrun's sacred <strong>Temple of Truths</strong>! Acrid emerald smoke boils across White Town's marble colonnades while bells clang in frantic alarm.",
              "Out of the shattered nave surge roaring <strong>Alchemical Fire Elementals</strong>, tearing across the courtyard as panicked pilgrims scatter for cover!"
            ],
            enemy: { name: "Alchemical Fire Elementals", desc: "Roaring green-flame spirits unleashed by the temple bomb.", hp: 48, ac: 14, atk: 7, dmg: 8, xp: 185, gold: 65, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
            choices: [
              { t: "Accept Master of Tradition Gideon Reth's commission and consult his mage ally Alacia Deserete first.", onChoose: { cw: "RETH_PATRON", msg: "Gideon Reth hires you to stop civil war in Ervenrun!" }, to: 13 },
              { t: "Accept Gideon Reth's commission and head straight into the Lower City to confront the suspect alchemists!", onChoose: { cw: "RETH_PATRON", msg: "Gideon Reth hires you to save Ervenrun from civil war!" }, to: 2 }
            ]
          },
          2: {
            zone: "Ervenrun Lower City • Porphyr's Workshop",
            title: "Alchemical Stains",
            text: [
              "Alacia Deserete's shortlist points to three minds capable of brewing emerald wildfire: dying professor Malleon the Chemyst, murdered Febrick Mandleson, and bitter recluse <strong>Popin Porphyr</strong>.",
              "The moment you force the latched shutter of Porphyr's reeking workshop, green residue gleams across his benches—and Porphyr shrieks, unleashing two hulking <strong>Flesh Golems</strong> to silence you!"
            ],
            enemy: { name: "Popin Porphyr & Flesh Golems", desc: "Bitter alchemist and his stitched workshop guardians.", hp: 52, ac: 14, atk: 7, dmg: 8, xp: 205, gold: 110, items: ["nf_alchemy_jug_relic", ...rollRandomLoot(["consumable"], 1, "very_rare")], weakCw: ["ALCHEMICAL_COUNTER"], flee: 1 },
            choices: [
              { t: "Force Porphyr to confess—he names agent Cryster Clem and admits FIVE more bombs went to the Enclave—then check missing guard Urid!", to: 3, onChoose: { cw: "CLEM_NAMED", msg: "Porphyr confesses: five more green-fire bombs are hidden inside the Enclave!" } }
            ]
          },
          3: {
            zone: "Moonlight Boarding House",
            title: "Shattered Oaths",
            text: [
              "Beside Olga's Moonlight Tavern, wide-eyed little Syra points trembling fingers across the narrow corridor toward missing Temple guard Urid's locked door. A dry, sickening hum vibrates through the timber.",
              "Inside hangs Urid's betrayed corpse—which suddenly snaps free in a choking cloud of black vermin, rising as an <strong>Unspeakable Revenant</strong>!"
            ],
            enemy: { name: "Urid, Unspeakable Revenant", desc: "Vermin-swarming undead fueled by bitter betrayal.", hp: 56, ac: 15, atk: 8, dmg: 8, undead: true, xp: 225, gold: 75, items: rollRandomLoot(["weapon", "accessory"], 1, "legendary"), flee: 1 },
            choices: [
              { t: "Descend beneath the mountain into the crowded refugee tunnels of the Enclave!", to: 4 }
            ]
          },
          4: {
            zone: "The Enclave • Subterranean Crossroads",
            title: "Mob Rules",
            text: [
              "Torchlight flickers over damp stonework where thousands of mountain refugees huddle in tense silence. Three factions circle one another like wolves: <strong>United Enclave</strong> (Amresh Kai), the outspoken <strong>PLA</strong> (Father Euclides), and <strong>EROC</strong> (Maia Rent).",
              "A whispered meeting with Father Euclides confirms the truth—the PLA is being framed, while pale, hollow-eyed lieutenants inside United Enclave and EROC quietly plant the remaining green-fire bombs!"
            ],
            choices: [
              { t: "Negotiate a calm truce with Amresh Kai & Father Euclides before exposing the traitors!", badge: "Persuasion / Spirit DC 13", check: { stat: "spirit", skill: "Persuasion", dc: 13, pass: 5, fail: 5, failDmg: 6, passMsg: "Amresh Kai sees the unnatural frost in her lieutenants' eyes and backs your strike!", failMsg: "Hidden blades slash out of the crowded tunnel (-6 HP) as panic erupts!" }, onPass: { cw: "ENCLAVE_TRUCE" } },
              { t: "Use Alacia's subterranean service-map to flank the possessed lieutenants directly!", reqCw: "ENCLAVE_MAP", badge: "ENCLAVE_MAP", onChoose: { cw: "ENCLAVE_TRUCE", msg: "You flank the saboteurs cleanly through a forgotten drainage arch!" }, to: 5 },
              { t: "Confront the ghost-possessed lieutenants openly and expose the conspiracy!", to: 5 }
            ]
          },
          5: {
            zone: "The Enclave • Bomb-Store Archway",
            title: "The Possessing Daughters",
            text: [
              "As you disarm the green-fire fuses and cut down the traitor captains, six soot-blackened spectral girls tear straight out of their hosts' chests—shrieking <em>\"MOTHER!\"</em> as they stream downward toward the Pit of Tears, leaving a squad of possessed shadow-assassins to cover their flight!"
            ],
            enemy: { name: "Possessed Enclave Assassins", desc: "Shadow-driven killers puppets of Amelera's daughters.", hp: 54, ac: 15, atk: 8, dmg: 8, xp: 230, gold: 120, items: rollRandomLoot(["consumable", "valuable"], 2, "legendary"), weakCw: ["ENCLAVE_TRUCE"], flee: 1 },
            choices: [
              { t: "Follow the wailing spectral trail deep into the Hypogea of the Lost!", to: 6 }
            ]
          },
          6: {
            zone: "Hypogea of the Lost • Broken Vault",
            title: "Visions of Loss",
            text: [
              "Searing psychic visions hammer your mind as you descend into the ancient ossuary: a proud noblewoman stripped of everything at Ervenrun's gates... her six young daughters trapped inside a burning orphanage during a city riot... a frightened mob stoning her and casting her broken body into the Pit of Tears!",
              "From the shadowed arches of the Broken Vault, starving <strong>Ghasts</strong> drop silently onto the flagstones!"
            ],
            enemy: { name: "Broken Vault Ghasts", desc: "Cunning undead ambushers haunting the deep ossuary.", hp: 52, ac: 14, atk: 7, dmg: 8, undead: true, xp: 210, gold: 130, items: rollRandomLoot(["consumable", "valuable"], 1, "very_rare"), flee: 1 },
            choices: [
              { t: "Pause by a charred stone memorial alcove glinting with six small bronze medallions.", to: 14 },
              { t: "Descend the 210-foot switchback stair straight toward the Pit of Tears!", to: 7 }
            ]
          },
          7: {
            zone: "Pit of Tears • Switchback Stair",
            title: "Daughters of Vengeance",
            text: [
              "Freezing wind howls up the vertical abyss as six horribly burned apparitions—<strong>Amelera's Daughters</strong>—swoop out of the gloom, clawing furiously to hurl you off the narrow stone steps!"
            ],
            enemy: { name: "Daughters of Vengeance", desc: "Six vengeful ghosts fiercely defending their mother.", hp: 54, ac: 15, atk: 8, dmg: 8, undead: true, xp: 240, gold: 80, items: rollRandomLoot(["accessory", "consumable"], 1, "legendary"), weakCw: ["DAUGHTERS_NAMED"], flee: 1 },
            choices: [
              { t: "Press down onto the cold stone overhang overlooking the Pit of Tears!", to: 8 }
            ]
          },
          8: {
            zone: "The Pit of Tears • Chasm Rim",
            title: "The Maggot Men",
            text: [
              "Lantern-light spilling down the 300-foot chasm wakes horrific, writhing silhouettes along the damp rock—sentient swarms of corpse-eating <strong>Maggot Men</strong> slithering up the cliff walls toward your ledge!"
            ],
            enemy: { name: "Swarm of Maggot Men", desc: "Sentient mounds of flesh-eating abyssal larvae.", hp: 56, ac: 14, atk: 8, dmg: 8, xp: 245, gold: 115, items: rollRandomLoot(["weapon", "armor", "accessory"], 1, "legendary"), flee: 1 },
            choices: [
              { t: "Step to the rim and call out 'AMELERA!' across the Pit of Tears to summon the Ghost Witch!", to: 9 }
            ]
          },
          9: {
            zone: "Pit of Tears Overhang",
            title: "Amelera, The Ghost Witch",
            text: [
              "Silence drops like a shroud across the chasm. Then, rising slow as smoke from the bottomless dark, <strong>Amelera</strong> ascends—her pale aristocratic face splitting into writhing serpents of violet shadow!",
              "<em>\"Masters and Enclave alike—ALL OF ERVENRUN SHALL BURN FOR MY DAUGHTERS!\"</em>"
            ],
            enemy: { name: "Amelera, The Ghost Witch", desc: "Ancient undead arch-witch of grief and vengeance.", hp: 68, ac: 16, atk: 9, dmg: 9, undead: true, xp: 320, gold: 240, items: ["nf_amelera_mantle", ...rollRandomLoot(["weapon", "armor", "accessory"], 1, "fabled")], weakCw: ["DAUGHTERS_NAMED", "ALCHEMICAL_COUNTER"] },
            choices: [
              { t: "Pursue her screaming spirit across the narrow ledge into the Chamber of the Skull!", to: 10 }
            ]
          },
          10: {
            zone: "Chamber of the Skull",
            title: "Bone Spiders & The Blackened Skull",
            text: [
              "Squeezing through a jagged fissure swarming with clicking <strong>Bone Spiders</strong>, you discover Amelera's mortal anchor resting upon a cairn of wet stones—her blackened, rune-scarred skull! Unless it is shattered or laid cleanly to rest, the Ghost Witch will reform within a day."
            ],
            choices: [
              { t: "Speak the six daughters' true names over the cairn and shatter the blackened skull with sacred mercy!", reqCw: "DAUGHTERS_NAMED", badge: "DAUGHTERS_NAMED", onChoose: { cw: "MERCIFUL_REST", xp: 50, msg: "Amelera's weeping shadow softens into pale silver light as the skull crumbles to peaceful dust (+50 XP)!" }, to: 11 },
              { t: "Invoke Turn Undead to purify Amelera's mortal anchor cleanly!", reqSpell: "Turn Undead", mp: 4, badge: "Turn Undead (4 MP)", onChoose: { cw: "MERCIFUL_REST", xp: 40, msg: "Radiant dawn-fire turns the blackened skull to harmless ash (+40 XP)!" }, to: 11 },
              { t: "Cleave straight through the bone spiders and smash the blackened skull to dust!", badge: "Athletics / Might DC 13", check: { stat: "might", skill: "Athletics", dc: 13, pass: 11, fail: 11, failDmg: 8, passMsg: "The skull shatters cleanly—releasing Amelera and her six daughters into silence!", failMsg: "Bone spiders sink venomous fangs into your arm (-8 HP) as you smash the skull to dust!" } }
            ]
          },
          11: {
            zone: "Temple of Truths • White Town",
            title: "Peace Restored to White Town",
            text: [
              "The moment Amelera's anchor turns to dust, the feverish madness gripping Ervenrun's tunnels vanishes before civil war can ignite. Beneath the dawn sky, Archmaster Gherek Viiruk and Gideon Reth present you with the city's greatest heirloom: the gleaming <strong>Alabaster Plate of Erven</strong> and <strong>300 GP</strong>!"
            ],
            onEnter: { gold: 300, items: ["nf_erven_truth_plate"], msg: "Awarded Alabaster Plate of Erven & 300 GP!" },
            choices: [
              { t: "Dedicate a quiet memorial to Amelera's six daughters before returning to Oakhaven!", reqCw: "MERCIFUL_REST", badge: "Merciful Finale", to: 15 },
              { t: "Return to Oakhaven as Conqueror of the Eternal Night!", to: 12 }
            ]
          },
          12: {
            zone: "Epilogue",
            title: "Legend of Nightfell",
            text: "From the frozen blood-snows of Alper to the cursed streets of Owlrock, the drowned house in the woods, and the deep Pit of Tears beneath Ervenrun, you have conquered all six chapters of the Eternal Night!",
            ending: { type: "true", title: "Conqueror of Nightfell (All 6 Chapters)", xp: 350, gold: 350, trophy: "Crown of the Eternal Night" },
            choices: []
          },
          13: {
            zone: "Ervenrun Upper City • Alacia's Study",
            title: "Alacia Deserete's Ward-Chamber",
            text: [
              "Silver astrolabes and glass retorts crowd <strong>Alacia Deserete</strong>'s candlelit study. She presses a cool tonic into your palm and points toward two tables: one holds a smoking shard of the temple's green-fire bomb; the other displays an ancient parchment map of Ervenrun's subterranean refugee tunnels."
            ],
            choices: [
              { t: "Analyze the green-fire residue with Alacia to brew a neutralizing counter-tincture.", badge: "Arcana DC 13", check: { stat: "arcana", skill: "Arcana", dc: 13, pass: 2, fail: 2, passMsg: "You isolate the alchemical binder—gaining a Greater Health Potion, +12 HP, and an edge against Porphyr & Amelera!", failMsg: "The volatile ash fizzles out, though Alacia still hands you her shortlist of suspect alchemists." }, onPass: { cw: "ALCHEMICAL_COUNTER", healHp: 12, items: ["greater_potion"] } },
              { t: "Study the old drainage blueprints of Ervenrun's Enclave to memorize hidden flank passages.", badge: "Perception / Agility DC 13", check: { stat: "agility", skill: "Perception", dc: 13, pass: 2, fail: 2, passMsg: "You trace a forgotten service arch into the Enclave and pocket Alacia's 45 GP expense purse!", failMsg: "Half the map is water-damaged, yet you still head straight into the Lower City." }, onPass: { cw: "ENCLAVE_MAP", gold: 45 } }
            ]
          },
          14: {
            zone: "Hypogea of the Lost • Memorial Alcove",
            title: "The Six Names on the Cairn",
            text: [
              "Beneath a cracked limestone arch lie six tiny charred bronze medallions arranged in a neat semicircle—each engraved with the name of one of Amelera's lost daughters. Cold sorrow hangs heavy in the air, yet the medallions hum softly when touched."
            ],
            choices: [
              { t: "Read all six engraved names aloud with quiet reverence so their spirits remember who they were.", badge: "Persuasion / Spirit DC 14", check: { stat: "spirit", skill: "Persuasion", dc: 14, pass: 7, fail: 7, passMsg: "A soft sigh echoes down the chasm—the Daughters' wrath falters (+45 XP, DAUGHTERS_NAMED)!", failMsg: "Cold wind snuffs your torch before you finish, though the sorrow lingers in your heart." }, onPass: { cw: "DAUGHTERS_NAMED", xp: 45 } },
              { t: "Trace the residual grief-magic on the medallions with Arcana to weaken Amelera's tether.", badge: "Arcana DC 14", check: { stat: "arcana", skill: "Arcana", dc: 14, pass: 7, fail: 7, passMsg: "You bind all six names into a calming counter-litany (+45 XP, DAUGHTERS_NAMED)!", failMsg: "The sorrowful echo slips away into the dark abyss below." }, onPass: { cw: "DAUGHTERS_NAMED", xp: 45 } },
              { t: "Leave the memorial undisturbed and descend the switchback stair toward the Pit of Tears.", to: 7 }
            ]
          },
          15: {
            zone: "Epilogue",
            title: "Redeemer of Nightfell",
            text: "Six white lanterns burn gently beside the rebuilt Temple of Truths, honoring the daughters whose names you restored to peace. From the frozen blood-snows of Alper to the Pit of Tears beneath Ervenrun, your mercy and courage have brought the Eternal Night to a triumphant close!",
            ending: { type: "true", title: "Redeemer of Nightfell (All 6 Chapters)", xp: 420, gold: 420, trophy: "Crown of the Eternal Night" },
            choices: []
          }
        }
      },
});
