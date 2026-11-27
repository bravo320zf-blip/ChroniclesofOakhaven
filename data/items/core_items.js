/* ============================================================
   CORE ITEMS & SHOPS
   ============================================================ */
window.OAKHAVEN.registerItems({
      // Weapons
      novice_cudgel:   { id:"novice_cudgel", name:"Novice's Cudgel", type:"weapon", atk:0, value:2, passives:{ healBonus:1, undeadDmgBonus:1 }, desc:"Humble temple-blessed oak club (+1 Healing, +1 vs Undead)." },
      iron_sword:      { id:"iron_sword", name:"Iron Longsword", type:"weapon", atk:1, value:18, passives:{ skillBonus:{ Athletics:1 } }, desc:"Dependable Oakhaven-forged frontier arming sword (+1 Athletics)." },
      steel_dagger:    { id:"steel_dagger", name:"Steel Dagger", type:"weapon", atk:1, agility:1, value:22, desc:"+1 Attack, +1 Agility" },
      runed_staff:     { id:"runed_staff", name:"Runed Oak Staff", type:"weapon", atk:1, arcana:1, value:22, passives:{ spellDmgBonus:1, skillBonus:{ Arcana:1 } }, desc:"Carved oaken staff etched with focusing runes (+1 Spell Dmg, +1 Arcana)." },
      blessed_mace:    { id:"blessed_mace", name:"Blessed Mace", type:"weapon", atk:1, spirit:1, value:22, passives:{ undeadDmgBonus:2, healBonus:1 }, desc:"Silver-chased temple mace (+2 vs Undead, +1 Healing)." },
      hunting_blade:   { id:"hunting_blade", name:"Hunting Blade", type:"weapon", atk:1, agility:1, value:20, desc:"+1 Attack, +1 Agility" },
      fine_steel_blade:{ id:"fine_steel_blade", name:"Fine Steel Sword", type:"weapon", atk:2, value:45, passives:{ critRange:11 }, desc:"Cleanly tempered frontier arming sword balanced for crisp parries and strikes (+Crit)." },
      dwarven_waraxe:  { id:"dwarven_waraxe", name:"Dwarven Waraxe", type:"weapon", atk:3, might:1, value:85, desc:"+3 Attack, +1 Might" },
      venomfang_blade: { id:"venomfang_blade", name:"Venomfang Blade", type:"weapon", atk:3, agility:1, value:80, passives:{ critRange:11 }, activeAbility:{ name:"Serpent's Sting", icon:"🐍", charges:2, dmgDice:"1d8", dmgStat:"agility", dmgType:"poison", dot:{ dmg:3, turns:3, label:"Venom" }, desc:"2/Quest: Slash with the grooved viper-blade for 1d8 + Agility dmg and Venom (3 dmg/t, 3t)!" }, desc:"Green-veined frontier sabre (+Crit) that inflicts lingering poison with Serpent's Sting." },
      ember_staff:     { id:"ember_staff", name:"Staff of Embers", type:"weapon", atk:2, arcana:2, value:90, passives:{ spellDmgBonus:2, bombDmgBonus:2 }, activeAbility:{ name:"Cinder Lance", icon:"🔥", charges:2, mp:2, dmgDice:"2d6", dmgStat:"arcana", dmgType:"fire", dot:{ dmg:3, turns:2, label:"Burn" }, desc:"2/Quest (2 MP): Hurl a crackling ember bolt for 2d6 + Arcana fire dmg and Burn (3/t, 2t)!" }, desc:"Charred ashwood staff crowned with a living coal (+2 Spell Dmg, +2 Bomb Dmg) with Cinder Lance." },
      sunfire_blade:   { id:"sunfire_blade", name:"Sunfire Greatsword", type:"weapon", atk:4, spirit:2, value:140, desc:"+4 Attack, +2 Spirit" },
      runeforged_axe:  { id:"runeforged_axe", name:"Runeforged Cleaver", type:"weapon", atk:4, might:2, value:135, desc:"+4 Attack, +2 Might (Crafted)" },
      astral_rod:      { id:"astral_rod", name:"Astral Arch-Rod", type:"weapon", atk:3, arcana:3, value:145, passives:{ spellDmgBonus:2, mpRegen:true }, activeAbility:{ name:"Starlight Bolt", icon:"🌠", charges:2, mp:2, dmgDice:"2d6", dmgStat:"arcana", dmgType:"arcane", desc:"2/Quest (2 MP): Focus astral light into a lance dealing 2d6 + Arcana arcane dmg!" }, desc:"Starlight-etched arch-rod (+2 Spell Dmg, +1 MP regen) that channels Starlight Bolt." },
      cutlass_tides:   { id:"cutlass_tides", name:"Cutlass of the Tides", type:"weapon", atk:3, agility:2, value:95, desc:"+3 Attack, +2 Agility" },

      // Armor
      scholar_robes:   { id:"scholar_robes", name:"Scholar's Robes", type:"armor", ac:1, arcana:1, value:20, passives:{ spellDmgBonus:1, skillBonus:{ Arcana:1 } }, desc:"Ink-stained academy robes stitched with minor focusing threads (+1 Spell Dmg, +1 Arcana)." },
      leather_armor:   { id:"leather_armor", name:"Studded Leather", type:"armor", ac:2, value:28, desc:"+2 AC" },
      chainmail:       { id:"chainmail", name:"Chainmail Hauberk", type:"armor", ac:3, value:65, passives:{ dmgReduce:1 }, activeAbility:{ name:"Steel-Link Brace", icon:"⛓️", charges:1, shieldTurns:1, desc:"1/Quest: Angle the riveted rings against an incoming blow for Shield (1t)." }, desc:"+3 AC, -1 Dmg Taken. Riveted frontier chainmail granting Steel-Link Brace." },
      briarweave_mail: { id:"briarweave_mail", name:"Briarweave Jerkin", type:"armor", ac:3, agility:1, value:75, desc:"+3 AC, +1 Agility" },
      dwarven_plate:   { id:"dwarven_plate", name:"Dwarven Plate", type:"armor", ac:4, might:1, value:120, passives:{ dmgReduce:2, thornsDmg:2, skillBonus:{ Athletics:1 } }, activeAbility:{ name:"Anvil-Wall Stance", icon:"🛡️", charges:1, shieldTurns:2, desc:"1/Quest: Lock your dwarven pauldrons in a stout defensive wall granting Shield (2t)!" }, desc:"+4 AC, +1 Might, -2 Dmg Taken, Thorns 2, +1 Athletics. Riveted mountain-forge plate granting Anvil-Wall Stance." },
      shadow_vestments:{ id:"shadow_vestments", name:"Shadow-Weave Armor", type:"armor", ac:4, agility:2, value:130, desc:"+4 AC, +2 Agility (Crafted)" },

      // Offhand
      wooden_shield:   { id:"wooden_shield", name:"Wooden Buckler", type:"offhand", ac:1, value:14, passives:{ dmgReduce:1 }, desc:"Iron-rimmed oak buckler (+1 AC, -1 Dmg Taken)." },
      apprentice_tome: { id:"apprentice_tome", name:"Apprentice Grimoire", type:"offhand", arcana:1, maxMp:2, value:25, desc:"+1 Arcana, +2 Max MP" },
      steel_shield:    { id:"steel_shield", name:"Steel Heater Shield", type:"offhand", ac:2, value:48, passives:{ dmgReduce:1, skillBonus:{ Athletics:1 } }, desc:"Tempered steel heater shield forged for frontier line-fighters (+2 AC, -1 Dmg Taken, +1 Athletics)." },
      sun_buckler:     { id:"sun_buckler", name:"Sun-Forged Buckler", type:"offhand", ac:2, spirit:1, value:75, desc:"+2 AC, +1 Spirit" },
      aegis_bastion:   { id:"aegis_bastion", name:"Aegis of Oakhaven", type:"offhand", ac:3, maxHp:5, value:115, desc:"+3 AC, +5 Max HP (Crafted)" },

      // Accessory
      lucky_coin:      { id:"lucky_coin", name:"Silver Lucky Coin", type:"accessory", luck:1, value:28, passives:{ goldFindPct:8 }, activeAbility:{ name:"Heads I Win", icon:"🪙", charges:1, ooc:true, restoreLuck:1, desc:"1/Quest: Flip the worn silver coin to steady fate and regain +1 Current Luck!" }, desc:"Worn Oakhaven silver piece that always lands on edge (+8% Gold) with Heads I Win." },
      ring_vitality:   { id:"ring_vitality", name:"Ring of Vitality", type:"accessory", maxHp:6, ac:1, value:65, passives:{ healBonus:2, dmgReduce:1 }, activeAbility:{ name:"Second Wind", icon:"❤️", charges:1, ooc:true, healDice:"1d8", healBonus:4, desc:"1/Quest: Draw on the ruby band's warmth to restore 1d8 + 4 HP!" }, desc:"+6 Max HP, +1 AC, +2 Heal, -1 Dmg Taken. Warm blood-ruby band granting Second Wind." },
      ring_arcana:     { id:"ring_arcana", name:"Ring of Spellweave", type:"accessory", arcana:2, maxMp:4, value:75, passives:{ spellDmgBonus:2, mpRegen:1, skillBonus:{ Arcana:1 } }, activeAbility:{ name:"Spellweave Conduit", icon:"💍", charges:1, ooc:true, restoreMp:5, desc:"1/Quest: Tap the etched sapphire band to restore +5 MP!" }, desc:"+2 Arcana, +4 Max MP, +2 Spell Dmg, +1 MP/turn, +1 Arcana. Sapphire-etched caster's band granting Spellweave Conduit." },
      sunfire_amulet:  { id:"sunfire_amulet", name:"Sunfire Amulet", type:"accessory", rarity:"rare", ac:1, spirit:2, value:110, passives:{ undeadDmgBonus:5, healBonus:2, spellDmgBonus:2 }, activeAbility:{ name:"Sunfire Radiance", icon:"☀️", charges:2, ooc:true, dmgDice:"2d6", dmgStat:"spirit", dmgType:"radiant", undeadDouble:true, healBase:8, desc:"2/Quest: Flare solar warmth for 2d6 + Spirit radiant dmg (2× vs Undead) and restore 8 HP!" }, desc:"Sun-forged gold amulet radiating dawn-light (+5 vs Undead, +2 Healing, +2 Spell Dmg) with Sunfire Radiance." },
      warding_signet:  { id:"warding_signet", name:"Runic Warding Ring", type:"accessory", ac:2, luck:1, value:105, desc:"+2 AC, +1 Luck (Crafted)" },

      // Cloak / Boots
      travel_cloak:    { id:"travel_cloak", name:"Traveler's Cloak", type:"cloak", ac:0, value:8, passives:{ skillBonus:{ Survival:1 } }, desc:"Weathered frontier wool cloak (+1 Survival)." },
      scout_cloak:     { id:"scout_cloak", name:"Thornwood Cloak", type:"cloak", ac:1, agility:1, value:45, passives:{ skillBonus:{ Stealth:1, Survival:1 } }, desc:"Leaf-mottled ranger's cloak woven in Thornwood (+1 Stealth, +1 Survival)." },
      shadow_boots:    { id:"shadow_boots", name:"Boots of Swiftness", type:"cloak", rarity:"uncommon", ac:1, agility:2, value:78, passives:{ skillBonus:{ Stealth:2, Athletics:1 } }, activeAbility:{ name:"Fleet-Foot Sidestep", icon:"👢", charges:1, evadeTurns:2, desc:"1/Quest: Blur across the battlefield in silent strides to Evade incoming strikes (2t)!" }, desc:"Supple stitched leather boots prized by frontier scouts (+2 Stealth, +1 Athletics) with Fleet-Foot Sidestep." },
      sea_coat:        { id:"sea_coat", name:"Saltfang Sea-Coat", type:"cloak", rarity:"uncommon", ac:2, luck:1, value:85, passives:{ dmgReduce:1, goldFindPct:12, skillBonus:{ Survival:2 } }, activeAbility:{ name:"Smuggler's Salt-Guard", icon:"🧥", charges:2, evadeTurns:1, restoreLuck:1, shieldTurns:2, desc:"2/Quest: Billow the salt-cured sea-coat to Evade (1t), recover +1 Luck, and gain +3 AC (2t)!" }, desc:"Salt-cured smuggler's greatcoat from Saltfang Cove (-1 Dmg Taken, +12% Gold, +2 Survival) with Smuggler's Salt-Guard." },

      // Consumables
      health_potion:   { id:"health_potion", name:"Health Potion", type:"consumable", healHp:12, value:16, desc:"Restores 12 HP" },
      greater_potion:  { id:"greater_potion", name:"Greater Health Potion", type:"consumable", healHp:22, value:34, desc:"Restores 22 HP" },
      mana_elixir:     { id:"mana_elixir", name:"Mana Elixir", type:"consumable", healMp:7, value:18, desc:"Restores 7 MP" },
      antidote:        { id:"antidote", name:"Bramble Antidote", type:"consumable", healHp:8, value:14, desc:"Restores 8 HP & clears venom" },
      alchemist_bomb:  { id:"alchemist_bomb", name:"Alchemist's Bomb", type:"bomb", dmgDice:"2d6", value:22, desc:"Throw in combat for 2d6 fire dmg" },
      torch:           { id:"torch", name:"Pitch Torch", type:"consumable", healHp:0, value:8, desc:"Quest: Light for +2 to ALL Skill Checks this quest (+4 HP). Combat: Hurl for 6 Fire dmg (2x Undead), Burn (3/t, 3t) & Dazzle (-2 Enemy ATK, 2t)." },

      // Crafting Materials
      iron_ore:        { id:"iron_ore", name:"Iron Ore", type:"material", value:12, desc:"Crafting Material (Forge)" },
      shadow_essence:  { id:"shadow_essence", name:"Shadow Essence", type:"material", value:18, desc:"Crafting Material (Workbench)" },
      glowcap_spores:  { id:"glowcap_spores", name:"Glowcap Spores", type:"material", value:14, desc:"Crafting Material (Alchemy)" },
      runed_shards:    { id:"runed_shards", name:"Runed Shards", type:"material", value:20, desc:"Crafting Material (Enchanting)" },
      bone_dust:       { id:"bone_dust", name:"Bone Dust", type:"material", value:12, desc:"Crafting Material (Alchemy/Wards)" },
      sea_salt:        { id:"sea_salt", name:"Sea Salt Crystals", type:"material", value:15, desc:"Crafting Material (Alchemy/Forge)" },

      // Valuables (Sell for Gold)
      silver_signet:   { id:"silver_signet", name:"Silver Signet", type:"valuable", value:28, desc:"Valuable — Sell in Town" },
      jeweled_goblet:  { id:"jeweled_goblet", name:"Jeweled Goblet", type:"valuable", value:48, desc:"Valuable — Sell in Town" },
      ruby_idol:       { id:"ruby_idol", name:"Ruby Idol", type:"valuable", value:70, desc:"Valuable — Sell in Town" },
      pearl_chest:     { id:"pearl_chest", name:"Lustrous Pearl", type:"valuable", value:55, desc:"Valuable — Sell in Town" },
      golden_censer:   { id:"golden_censer", name:"Golden Censer", type:"valuable", value:60, desc:"Valuable — Sell in Town" },
      obsidian_core:   { id:"obsidian_core", name:"Obsidian Core", type:"valuable", value:95, desc:"Valuable — Sell in Town" }
});

window.OAKHAVEN.registerShops({
      armory: {
        name: "Ironclad Armory",
        npc: "Master Smith Borin",
        quote: "\"Good steel keeps you out of the Temple's resurrection slab!\"",
        stock: [
          { id:"iron_sword", price:22 }, { id:"fine_steel_blade", price:55 }, { id:"dwarven_waraxe", price:105 },
          { id:"leather_armor", price:35 }, { id:"chainmail", price:80 }, { id:"dwarven_plate", price:145 },
          { id:"wooden_shield", price:18 }, { id:"steel_shield", price:58 }
        ]
      },
      apothecary: {
        name: "Bramble's Apothecary",
        npc: "Herbalist Miri Bramble",
        quote: "\"Fresh brews, volatile flasks, and remedies for every crypt-rot!\"",
        stock: [
          { id:"health_potion", price:20 }, { id:"greater_potion", price:42 }, { id:"mana_elixir", price:22 },
          { id:"antidote", price:18 }, { id:"alchemist_bomb", price:28 }, { id:"torch", price:10 }
        ]
      },
      curios: {
        name: "Starweaver's Curios",
        npc: "Arcanist Orin Starweaver",
        quote: "\"Enchanted baubles from fallen spires and sunken tombs.\"",
        stock: [
          { id:"runed_staff", price:28 }, { id:"ember_staff", price:110 }, { id:"apprentice_tome", price:32 },
          { id:"lucky_coin", price:35 }, { id:"ring_vitality", price:80 }, { id:"ring_arcana", price:92 },
          { id:"scout_cloak", price:55 }, { id:"shadow_boots", price:95 }
        ]
      },
      vexx_dungeon: {
        name: "Vexx's Crypt Stall",
        stock: [
          { id:"health_potion", price:22 }, { id:"greater_potion", price:44 }, { id:"mana_elixir", price:22 },
          { id:"alchemist_bomb", price:30 }, { id:"fine_steel_blade", price:58 }, { id:"steel_shield", price:60 }
        ]
      }
});
