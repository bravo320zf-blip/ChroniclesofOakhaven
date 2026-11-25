/* ============================================================
   EXPANSION ITEMS (Frontier, Underworld Lairs & Nightfell)
   ============================================================ */
window.OAKHAVEN.registerItems({
            // --- General Pool Items (Eligible for Random Loot Table) ---
      frost_essence:       { id:"frost_essence", name:"Frost Essence", type:"material", value:18, desc:"Crafting Material (Alchemy/Forge)" },
      alchemical_oil:      { id:"alchemical_oil", name:"Alchemical Oil", type:"material", value:16, desc:"Crafting Material (Forge/Alchemy)" },
      amber_gem:           { id:"amber_gem", name:"Sun-Trapped Amber", type:"valuable", value:44, desc:"Valuable — Sell in Town" },
      gilded_compass:      { id:"gilded_compass", name:"Gilded Astrolabe", type:"valuable", value:58, desc:"Valuable — Sell in Town" },
      silver_rapier:       { id:"silver_rapier", name:"Silver Duelsword", type:"weapon", atk:2, agility:2, value:64, desc:"+2 Attack, +2 Agility" },
      elixir_heroism:      { id:"elixir_heroism", name:"Elixir of Heroism", type:"consumable", healHp:16, healMp:5, value:42, desc:"Restores 16 HP & 5 MP" },
	  moonstone_shard:     { id:"moonstone_shard", name:"Moonstone Shard", type:"material", value:22, desc:"Crafting Material (Enchanting)" },
      dragonscale_scrap:   { id:"dragonscale_scrap", name:"Dragonscale Scrap", type:"material", value:28, desc:"Crafting Material (Master Forge)" },
      obsidian_dust:       { id:"obsidian_dust", name:"Obsidian Dust", type:"material", value:19, desc:"Crafting Material (Alchemy/Wards)" },
      golden_scarab:       { id:"golden_scarab", name:"Golden Scarab", type:"valuable", value:52, desc:"Valuable — Sell in Town" },
      sapphire_brooch:     { id:"sapphire_brooch", name:"Sapphire Brooch", type:"valuable", value:68, desc:"Valuable — Sell in Town" },
      starlight_vial:      { id:"starlight_vial", name:"Starlight Vial", type:"consumable", healMp:10, value:30, desc:"Restores 10 MP" },
      phoenix_tonic:       { id:"phoenix_tonic", name:"Phoenix Tonic", type:"consumable", healHp:20, healMp:6, value:55, desc:"Restores 20 HP & 6 MP" },
      mithril_buckler:     { id:"mithril_buckler", name:"Mithril Buckler", type:"offhand", ac:3, value:85, desc:"+3 AC" },
      elven_sabre:         { id:"elven_sabre", name:"Elven Sabre", type:"weapon", atk:3, agility:1, value:78, desc:"+3 Attack, +1 Agility" },
      velvet_mantle:       { id:"velvet_mantle", name:"Velvet Mantle", type:"cloak", ac:2, spirit:1, value:65, passives:{ goldFindPct:10, skillBonus:{ Persuasion:1 } }, desc:"Plush nobleman's velvet mantle that commands respect (+1 Persuasion, +10% Gold Found)." },

      // --- Quest 1 Uniques: The Frostpeak Ice-Caverns (2 Unique Items) ---
      frostbite_halberd:   { id:"frostbite_halberd", name:"Frostbite Halberd", type:"weapon", atk:4, might:1, value:135, unique:true, desc:"+4 Attack, +1 Might (Frostpeak Unique)" },
      winterheart_pendant: { id:"winterheart_pendant", name:"Winterheart Pendant", type:"accessory", ac:2, spirit:2, value:120, unique:true, desc:"+2 AC, +2 Spirit (Frostpeak Unique)" },

      // --- Quest 2 Uniques: The Sunken Temple of Sseth (2 Unique Items) ---
      serpent_fang_kris:   { id:"serpent_fang_kris", name:"Serpent-Fang Kris", type:"weapon", atk:3, agility:2, value:115, unique:true, desc:"+3 Attack, +2 Agility (Sseth Unique)" },
      scales_of_sseth:     { id:"scales_of_sseth", name:"Jade Scales of Sseth", type:"armor", ac:4, spirit:1, value:130, unique:true, desc:"+4 AC, +1 Spirit (Sseth Unique)" },

      // --- Quest 3 Uniques: The Clockwork Foundry of Brasshaven (2 Unique Items) ---
      aether_gauntlet:     { id:"aether_gauntlet", name:"Aether-Coil Gauntlet", type:"offhand", ac:3, arcana:2, value:128, unique:true, desc:"+3 AC, +2 Arcana (Brasshaven Unique)" },
      chronos_monocle:     { id:"chronos_monocle", name:"Chronos Monocle", type:"accessory", arcana:2, luck:2, value:125, unique:true, desc:"+2 Arcana, +2 Luck (Brasshaven Unique)" },

      // --- Quest 4 Uniques: The Ashen Keep of the Red Baron (3 Unique Items) ---
      baron_greatsword:    { id:"baron_greatsword", name:"Red Baron's Greatsword", type:"weapon", atk:5, might:1, value:165, unique:true, desc:"+5 Attack, +1 Might (Ashen Keep Unique)" },
      ashen_cloak:         { id:"ashen_cloak", name:"Mantle of Cinders", type:"cloak", ac:2, might:2, value:115, unique:true, desc:"+2 AC, +2 Might (Ashen Keep Unique)" },
      signet_of_cinders:   { id:"signet_of_cinders", name:"Baron's Cinder Signet", type:"accessory", atk:1, ac:1, luck:1, value:120, unique:true, passives:{ thornsDmg:3, goldFindPct:15, skillBonus:{ Persuasion:1 } }, activeAbility:{ name:"Ashen Baron's Flare", icon:"🔥", charges:2, dmgDice:"2d6", dmgStat:"luck", dmgType:"fire", dot:{ dmg:3, turns:3, label:"Cinder Ash" }, desc:"2/Quest: Ignite the Baron's signet for 2d6 + Luck fire dmg and Cinder Ash (3/t, 3t)!" }, desc:"Smoldering iron signet of the Ashen Keep (3 Fire Thorns, +15% Gold, +1 Persuasion) with Ashen Baron's Flare." },

      // --- Quest 5 Uniques: The Gloomfen Witch-Bog (3 Unique Items) ---
      witchwood_staff:     { id:"witchwood_staff", name:"Witchwood Arch-Staff", type:"weapon", atk:3, arcana:3, value:140, unique:true, desc:"+3 Attack, +3 Arcana (Gloomfen Unique)" },
      bog_hag_talisman:    { id:"bog_hag_talisman", name:"Talisman of the Mire", type:"accessory", ac:1, maxMp:5, spirit:1, value:110, unique:true, desc:"+1 AC, +5 Max MP, +1 Spirit (Gloomfen Unique)" },
      cauldron_brew:       { id:"cauldron_brew", name:"Morwenna's Star-Brew", type:"consumable", healHp:25, healMp:10, value:65, unique:true, desc:"Restores 25 HP & 10 MP (Gloomfen Unique)" },
	  // --- Quest 6 Uniques: The Whispering Salt-Mines (Part 1) ---
      crystal_pickaxe:     { id:"crystal_pickaxe", name:"Crystal-Edged Pickaxe", type:"weapon", atk:3, might:1, value:105, unique:true, desc:"+3 Attack, +1 Might (Salt-Mines Unique)" },
      echo_lantern:        { id:"echo_lantern", name:"Echo-Glass Lantern", type:"offhand", ac:2, spirit:2, value:110, unique:true, desc:"+2 AC, +2 Spirit (Salt-Mines Unique)" },

      // --- Quest 7 Uniques: The Sunken Lighthouse of Dreadmoor ---
      stormglass_blade:    { id:"stormglass_blade", name:"Stormglass Cutlass", type:"weapon", atk:3, agility:2, value:118, unique:true, passives:{ critRange:11, spellDmgBonus:2 }, activeAbility:{ name:"Squall-Lightning Slash", icon:"⚡", charges:2, dmgDice:"2d6", dmgStat:"agility", dmgType:"lightning", chillTurns:1, desc:"2/Quest: Discharge lighthouse thunder through the stormglass edge for 2d6 + Agility lightning dmg and Chill (1t)!" }, desc:"Lightning-fused stormglass cutlass from the coastal lighthouse (+Crit, +2 Spell Dmg) with Squall-Lightning Slash." },
      keepers_oilskin:     { id:"keepers_oilskin", name:"Keeper's Storm-Coat", type:"cloak", ac:2, luck:1, value:100, unique:true, desc:"+2 AC, +1 Luck (Lighthouse Unique)" },

      // --- Quest 8 Uniques: The Ravencrest Bandit Citadel ---
      ravencrest_halberd:  { id:"ravencrest_halberd", name:"Ravencrest Halberd", type:"weapon", atk:4, agility:1, value:125, unique:true, desc:"+4 Attack, +1 Agility (Ravencrest Unique)" },
      mercenary_pauldron:  { id:"mercenary_pauldron", name:"Black-Banner Brigandine", type:"armor", ac:3, might:2, value:120, unique:true, desc:"+3 AC, +2 Might (Ravencrest Unique)" },

      // --- Quest 9 Uniques: The Amber Sanctuary of Solis ---
      solaris_mace:        { id:"solaris_mace", name:"Solaris Sun-Mace", type:"weapon", atk:4, spirit:2, value:140, unique:true, desc:"+4 Attack, +2 Spirit (Solis Unique)" },
      amber_aegis:         { id:"amber_aegis", name:"Resin-Forged Aegis", type:"offhand", ac:3, spirit:1, value:125, unique:true, desc:"+3 AC, +1 Spirit (Solis Unique)" },

      // --- Quest 10 Uniques: The Scorched Nest of Wyrm Ridge (Part 1) ---
      drakefang_spear:     { id:"drakefang_spear", name:"Drakefang Spear", type:"weapon", atk:4, might:2, value:145, unique:true, desc:"+4 Attack, +2 Might (Wyrm Ridge Unique)" },
      cinderhide_vest:     { id:"cinderhide_vest", name:"Cinderhide Scale-Vest", type:"armor", ac:4, agility:1, value:138, unique:true, desc:"+4 AC, +1 Agility (Wyrm Ridge Unique)" },

      // --- Quest 11 Uniques (PART 2 of Malakor): The Phylactery Throne ---
      soulreaver_claymore: { id:"soulreaver_claymore", name:"Soulreaver Claymore", type:"weapon", atk:5, might:2, value:185, unique:true, desc:"+5 Attack, +2 Might (Malakor Pt.2 Unique)" },
      regent_plate:        { id:"regent_plate", name:"Regent's Dread-Plate", type:"armor", ac:5, spirit:1, value:175, unique:true, desc:"+5 AC, +1 Spirit (Malakor Pt.2 Unique)" },
      phylactery_shard:    { id:"phylactery_shard", name:"Purified Phylactery Shard", type:"accessory", arcana:2, maxMp:6, value:160, unique:true, desc:"+2 Arcana, +6 Max MP (Malakor Pt.2 Unique)" },

      // --- Quest 12 Uniques (PART 2 of Thornwood): Heart of the Blight-Wood ---
      heartwood_bowblade:  { id:"heartwood_bowblade", name:"Heartwood Twinblade", type:"weapon", atk:4, agility:2, value:155, unique:true, desc:"+4 Attack, +2 Agility (Thornwood Pt.2 Unique)" },
      crown_of_thorns:     { id:"crown_of_thorns", name:"Circlet of Living Thorns", type:"accessory", ac:2, spirit:2, luck:1, value:150, unique:true, passives:{ thornsDmg:4, healBonus:2, skillBonus:{ Survival:2 } }, activeAbility:{ name:"Bramble Retribution", icon:"🌿", charges:2, mp:2, dmgDice:"2d6", dmgStat:"spirit", dmgType:"nature", dot:{ dmg:4, turns:2, label:"Briar Bleed" }, desc:"2/Quest (2 MP): Unleash whipping Thornwood briars for 2d6 + Spirit nature dmg and Briar Bleed (4 dmg/t, 2t)!" }, desc:"Living briar diadem crowned with Thornwood blossoms (4 Thorns, +2 Healing, +2 Survival) with Bramble Retribution." },

      // --- Quest 13 Uniques (PART 2 of Saltfang): The Abyssal Fleet ---
      abyssal_trident:     { id:"abyssal_trident", name:"Abyssal Tide-Trident", type:"weapon", atk:5, agility:1, value:165, unique:true, desc:"+5 Attack, +1 Agility (Saltfang Pt.2 Unique)" },
      pirate_king_coat:    { id:"pirate_king_coat", name:"Leviathan Admiral's Coat", type:"cloak", ac:3, luck:2, value:155, unique:true, desc:"+3 AC, +2 Luck (Saltfang Pt.2 Unique)" },

      // --- Quest 14 Uniques (PART 2 of Salt-Mines): The Crystal Deep ---
      prism_greatsword:    { id:"prism_greatsword", name:"Prismatic Greatsword", type:"weapon", atk:5, arcana:2, value:180, unique:true, desc:"+5 Attack, +2 Arcana (Crystal Deep Unique)" },
      quartz_bulwark:      { id:"quartz_bulwark", name:"Resonant Quartz Bulwark", type:"offhand", ac:4, might:1, value:165, unique:true, desc:"+4 AC, +1 Might (Crystal Deep Unique)" },

      // --- Quest 15 Uniques (PART 2 of Wyrm Ridge): Lair of Ignaroth ---
      dragonfire_blade:    { id:"dragonfire_blade", name:"Ignaroth's Dragonfire Blade", type:"weapon", atk:6, might:2, value:220, unique:true, desc:"+6 Attack, +2 Might (Elder Wyrm Unique)" },
      elder_scale_plate:   { id:"elder_scale_plate", name:"Elder-Wyrm Scale Plate", type:"armor", ac:5, might:2, value:210, unique:true, desc:"+5 AC, +2 Might (Elder Wyrm Unique)" },
      heart_of_ignaroth:   { id:"heart_of_ignaroth", name:"Heart of Ignaroth", type:"accessory", ac:2, maxHp:10, luck:2, value:200, unique:true, desc:"+2 AC, +10 Max HP, +2 Luck (Elder Wyrm Unique)" },
	  
	  // --- Underworld Lairs Unique Quest Relics (`unique: true`) ---
      ul_swordbreaker_blade: { id:"ul_swordbreaker_blade", name:"Swordbreaker Longsword", type:"weapon", rarity:"uncommon", atk:3, ac:1, value:95, unique:true, desc:"+3 Attack, +1 AC (Sanguine Lodge Unique)" },
      ul_crimson_crown_pin:  { id:"ul_crimson_crown_pin", name:"Brooch of the Red Crown", type:"accessory", rarity:"uncommon", spirit:2, maxHp:5, value:85, unique:true, desc:"+2 Spirit, +5 Max HP (Sanguine Lodge Unique)" },

      ul_derro_aklys:        { id:"ul_derro_aklys", name:"Graknir's Hooked Aklys", type:"weapon", rarity:"uncommon", atk:3, agility:1, value:90, unique:true, desc:"+3 Attack, +1 Agility (Deranged Bastion Unique)" },
      ul_stone_flesh_balm:   { id:"ul_stone_flesh_balm", name:"Stone-to-Flesh Balm", type:"consumable", rarity:"rare", healHp:24, value:50, unique:true, desc:"Restores 24 HP & reverses petrification" },

      ul_charnel_maul:       { id:"ul_charnel_maul", name:"Bone-Midden Crusher", type:"weapon", rarity:"rare", atk:3, might:2, value:125, unique:true, desc:"+3 Attack, +2 Might (Flayed Midden Unique)" },
      ul_onyx_fang_dagger:   { id:"ul_onyx_fang_dagger", name:"Otyugh's Onyx Dagger", type:"weapon", rarity:"rare", atk:3, agility:2, value:120, unique:true, passives:{ critRange:11, lifesteal:2, skillBonus:{ Stealth:2 } }, activeAbility:{ name:"Midden-Venom Fang", icon:"🗡️", charges:2, dmgDice:"2d6", dmgStat:"agility", dmgType:"poison", dot:{ dmg:4, turns:3, label:"Carrion Rot" }, desc:"2/Quest: Drive the onyx fang for 2d6 + Agility poison dmg and Carrion Rot (4/t, 3t)!" }, desc:"Onyx dagger gifted by the Carrion Collector of the Flayed Midden (+Crit, Lifesteal 2, +2 Stealth) with Midden-Venom Fang." },

      ul_sicarius_silk:      { id:"ul_sicarius_silk", name:"Spidersilk Mantle of Sicarius", type:"cloak", rarity:"rare", ac:2, agility:2, value:130, unique:true, desc:"+2 AC, +2 Agility (Camp Sicarius Unique)" },
      ul_black_pearl_brooch: { id:"ul_black_pearl_brooch", name:"Nizana's Black-Pearl Brooch", type:"accessory", rarity:"rare", arcana:2, luck:1, value:145, unique:true, desc:"+2 Arcana, +1 Luck (Camp Sicarius Unique)" },

      ul_skullcap_draught:   { id:"ul_skullcap_draught", name:"Myconid Slumber-Draught", type:"bomb", rarity:"rare", dmg:16, value:55, unique:true, desc:"Throw in combat for 16 toxic spore dmg" },
      ul_luminescent_cloak:  { id:"ul_luminescent_cloak", name:"Skullcap Spore-Cloak", type:"cloak", rarity:"rare", ac:2, spirit:2, value:125, unique:true, desc:"+2 AC, +2 Spirit (Skullcap Forest Unique)" },

      ul_soulflame_candle:   { id:"ul_soulflame_candle", name:"Eternal Soulflame Candle", type:"offhand", rarity:"rare", ac:2, spirit:2, maxMp:4, value:140, unique:true, desc:"+2 AC, +2 Spirit, +4 Max MP (Cathedral Unique)" },
      ul_curate_venom_blade: { id:"ul_curate_venom_blade", name:"Curate's Venom Fang", type:"weapon", rarity:"rare", atk:4, agility:1, value:145, unique:true, desc:"+4 Attack, +1 Agility (Cathedral Unique)" },

      ul_ellsmark_plate:     { id:"ul_ellsmark_plate", name:"Commander Ellsmark's Plate", type:"armor", rarity:"rare", ac:4, might:1, value:145, unique:true, desc:"+4 AC, +1 Might (The Throttle Unique)" },
      ul_wytchlight_focus:   { id:"ul_wytchlight_focus", name:"Dru Wytchlight's Shadow-Orb", type:"offhand", rarity:"rare", ac:2, arcana:3, value:140, unique:true, desc:"+2 AC, +3 Arcana (The Throttle Unique)" },

      ul_breaker_lance:      { id:"ul_breaker_lance", name:"Sir Pravus's Breaker Lance", type:"weapon", rarity:"rare", atk:4, might:2, value:155, unique:true, desc:"+4 Attack, +2 Might (Shatters barriers)" },
      ul_ghost_knight_helm:  { id:"ul_ghost_knight_helm", name:"Visor of the Closed Throat", type:"accessory", rarity:"rare", ac:2, might:1, spirit:1, value:135, unique:true, desc:"+2 AC, +1 Might, +1 Spirit (Pass Unique)" },

      ul_ebon_star_signet:   { id:"ul_ebon_star_signet", name:"Signet of the Ebon Star", type:"accessory", rarity:"rare", ac:2, arcana:2, luck:1, value:145, unique:true, desc:"+2 AC, +2 Arcana, +1 Luck (Starlit Unique)" },

      ul_radka_sanguine_whip:{ id:"ul_radka_sanguine_whip", name:"Radka's Sanguine Whip", type:"weapon", rarity:"very_rare", atk:4, agility:2, maxHp:6, value:175, unique:true, desc:"+4 Attack, +2 Agility, +6 Max HP (Rivener Unique)" },
      ul_ruby_rivener_set:   { id:"ul_ruby_rivener_set", name:"Blood-Ruby Pendant of Radka", type:"accessory", rarity:"very_rare", ac:2, spirit:3, maxMp:5, value:170, unique:true, desc:"+2 AC, +3 Spirit, +5 Max MP (Rivener Unique)" },

      ul_paragon_rot_blade:  { id:"ul_paragon_rot_blade", name:"Spore-Bitten Greatsword", type:"weapon", rarity:"very_rare", atk:5, might:1, spirit:1, value:180, unique:true, desc:"+5 Attack, +1 Might, +1 Spirit (Forgetting Unique)" },

      ul_augrimm_pact_staff: { id:"ul_augrimm_pact_staff", name:"Augrimm's Pact-Lich Staff", type:"weapon", rarity:"legendary", atk:5, arcana:4, maxMp:8, value:240, unique:true, desc:"+5 Attack, +4 Arcana, +8 Max MP (Citadel Unique)" },
      ul_worm_carapace_mail: { id:"ul_worm_carapace_mail", name:"Petrified Worm-Scale Mail", type:"armor", rarity:"legendary", ac:5, might:2, maxHp:10, value:235, unique:true, desc:"+5 AC, +2 Might, +10 Max HP (Citadel Unique)" },

      ul_impact_club:        { id:"ul_impact_club", name:"Savvess's Impact Club", type:"weapon", rarity:"very_rare", atk:5, might:2, value:190, unique:true, desc:"+5 Attack, +2 Might (Sunseeker Shaman's club)" },
      ul_thunderbolt_hammer: { id:"ul_thunderbolt_hammer", name:"Reforged Hammer of Thunderbolts", type:"weapon", rarity:"legendary", atk:6, might:3, value:250, unique:true, desc:"+6 Attack, +3 Might (Dwarven Storm-Hammer)" },

      ul_impaling_pick:      { id:"ul_impaling_pick", name:"Impaling War Pick", type:"weapon", rarity:"very_rare", atk:5, agility:2, value:185, unique:true, desc:"+5 Attack, +2 Agility (Redoubt Unique)" },
      ul_ashkreigel_plate:   { id:"ul_ashkreigel_plate", name:"Adamantine Plate of Stoneboar", type:"armor", rarity:"legendary", ac:6, might:2, spirit:1, value:260, unique:true, passives:{ dmgReduce:4, thornsDmg:5, bossDmgBonus:4 }, activeAbility:{ name:"Stoneboar Unbreakable", icon:"🐗", charges:2, ooc:true, shieldTurns:3, healBase:12, selfBuffAtk:{ atk:3, turns:3 }, desc:"2/Quest: Lock into adamantine stance — restore 12 HP, gain +3 AC (3t) and +3 Attack (3t)!" }, desc:"Legendary adamantine plate of the Stoneboar Redoubt (-4 Dmg Taken, 5 Thorns, +4 Boss Dmg) with Stoneboar Unbreakable." },
	  // --- Part I: Secrets in the Ice ---
      nf_krampus_cleaver:    { id:"nf_krampus_cleaver", name:"Bloodthirsty Krampus Cleaver", type:"weapon", rarity:"uncommon", atk:3, might:1, value:95, unique:true, desc:"+3 Attack, +1 Might (Secrets in the Ice Unique)" },
      nf_blood_moon_ring:    { id:"nf_blood_moon_ring", name:"Signet of the Blood Moon", type:"accessory", rarity:"uncommon", ac:1, spirit:2, value:90, unique:true, desc:"+1 AC, +2 Spirit (Murian's dark seal)" },

      // --- Part II: Child of Blood ---
      nf_circlet_last_light: { id:"nf_circlet_last_light", name:"Circlet of Last Light", type:"accessory", rarity:"rare", arcana:2, spirit:2, maxMp:4, value:140, unique:true, desc:"+2 Arcana, +2 Spirit, +4 Max MP (Child of Blood Unique)" },
      nf_spry_eyes_dirk:     { id:"nf_spry_eyes_dirk", name:"Iximisi's Shadow-Dirk", type:"weapon", rarity:"rare", atk:3, agility:2, value:135, unique:true, desc:"+3 Attack, +2 Agility (Spry Eyes Unique)" },
      nf_lunar_blessing_orb: { id:"nf_lunar_blessing_orb", name:"Mirithlen's Lunar Focus", type:"offhand", rarity:"rare", ac:2, spirit:2, maxHp:6, value:145, unique:true, desc:"+2 AC, +2 Spirit, +6 Max HP (Child of Blood Unique)" },

      // --- Part III: Under a Pale Moon ---
      nf_baurjien_necklace:  { id:"nf_baurjien_necklace", name:"Baurjien's Skull Necklace", type:"accessory", rarity:"rare", ac:2, agility:2, luck:2, value:155, unique:true, desc:"+2 AC, +2 Agility, +2 Luck (Appendix B Relic)" },
      nf_murian_grim_dagger: { id:"nf_murian_grim_dagger", name:"Murian's Grim Wyrm-Dagger", type:"weapon", rarity:"rare", atk:4, agility:1, value:145, unique:true, desc:"+4 Attack, +1 Agility (Poisons ancient frost wyrms)" },
      nf_tatzelwurm_tiara:   { id:"nf_tatzelwurm_tiara", name:"Sapphire Tiara of the Wyrm", type:"accessory", rarity:"very_rare", ac:2, arcana:3, maxMp:5, value:185, unique:true, desc:"+2 AC, +3 Arcana, +5 Max MP (Tatzelwurm Hoard)" },
      nf_silvermoon_blade:   { id:"nf_silvermoon_blade", name:"Katryna's Silvermoon Blade", type:"weapon", rarity:"very_rare", atk:5, spirit:2, value:195, unique:true, desc:"+5 Attack, +2 Spirit (Paladin's radiant longsword)" },

      // --- Part IV: The Curse of Owlrock ---
      nf_holy_dust_salvation:{ id:"nf_holy_dust_salvation", name:"Holy Dust of Salvation", type:"consumable", rarity:"rare", healHp:32, healMp:12, value:75, unique:true, desc:"Restores 32 HP & 12 MP (Appendix B Moonstone Dust)" },
      nf_oversea_longsword:  { id:"nf_oversea_longsword", name:"Apotropaic Oversea Sword", type:"weapon", rarity:"very_rare", atk:5, spirit:2, ac:1, value:190, unique:true, desc:"+5 Attack, +1 AC, +2 Spirit (Purges dark curses)" },
      nf_mirgan_grimoire:    { id:"nf_mirgan_grimoire", name:"Mirgan's Petrified Grimoire", type:"offhand", rarity:"very_rare", ac:2, arcana:3, spirit:2, maxMp:6, value:195, unique:true, passives:{ spellDmgBonus:4, spellCostReduce:1, dmgReduce:2, mpRegen:true }, activeAbility:{ name:"Petrifying Moon-Rite", icon:"🗿", charges:2, mp:2, dmgDice:"2d8", dmgStat:"arcana", dmgType:"arcane", stunTurns:1, shieldTurns:2, desc:"2/Quest (2 MP): Channel Owlrock's petrified runes for 2d8 + Arcana dmg, Stun (1t), and +3 AC (2t)!" }, desc:"Stone-bound lunar grimoire from Owlrock (+4 Spell Dmg, -1 MP cost, -2 dmg taken, +1 MP regen) with Petrifying Moon-Rite." },

      // --- Part V: The House that Drowns in the Woods ---
      nf_vanisia_hammer:     { id:"nf_vanisia_hammer", name:"Vanisia's Grim Hammer", type:"weapon", rarity:"very_rare", atk:5, might:2, spirit:1, value:205, unique:true, desc:"+5 Attack, +2 Might, +1 Spirit (Vaas Crypt Unique)" },
      nf_leliam_grim_dagger: { id:"nf_leliam_grim_dagger", name:"Leliam's Grim Dagger +2", type:"weapon", rarity:"very_rare", atk:5, agility:3, value:215, unique:true, passives:{ critRange:11, lifesteal:2, undeadDmgBonus:3 }, activeAbility:{ name:"Grim Heartseeker", icon:"🗡️", charges:2, guaranteedCrit:true, dot:{ dmg:4, turns:3, label:"Shadow Bleed" }, evadeTurns:2, desc:"2/Quest: Guaranteed Critical shadow-thrust inflicting Shadow Bleed (4/t, 3t) and granting +2 AC for 2 turns!" }, desc:"Shadow-forged stiletto pulled from Leliam's chest, hungering for lethal heartstrikes." },
      nf_arkea_scimitar:     { id:"nf_arkea_scimitar", name:"Arkea's Cursed Scimitar", type:"weapon", rarity:"legendary", atk:6, agility:2, spirit:2, value:245, unique:true, desc:"+6 Attack, +2 Agility, +2 Spirit (Mazarol-touched blade)" },

      // --- Part VI: Vengeance is Mine ---
      nf_alchemy_jug_relic:  { id:"nf_alchemy_jug_relic", name:"Malleon's Alchemical Vessel", type:"offhand", rarity:"legendary", ac:3, arcana:4, maxMp:10, value:240, unique:true, desc:"+3 AC, +4 Arcana, +10 Max MP (Ervenrun Unique)" },
      nf_amelera_mantle:     { id:"nf_amelera_mantle", name:"Shroud of the Ghost Witch", type:"cloak", rarity:"legendary", ac:4, agility:3, arcana:3, value:265, unique:true, desc:"+4 AC, +3 Agility, +3 Arcana (Amelera's spectral veil)" },
      nf_erven_truth_plate:  { id:"nf_erven_truth_plate", name:"Alabaster Plate of Erven", type:"armor", rarity:"fabled", ac:6, might:2, spirit:3, maxHp:12, value:295, unique:true, desc:"+6 AC, +2 Might, +3 Spirit, +12 Max HP (Ervenrun Finale)" },
});
