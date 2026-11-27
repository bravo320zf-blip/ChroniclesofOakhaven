/* ============================================================
   CHRONICLES OF OAKHAVEN — SOURCEBOOK SUMMONED CREATURE BESTIARY
   Authentic 5e / Kobold Press stat blocks for player-controlled
   VTT summoned ally tokens (HP, AC, Speed, ATK, DMG, Special, Art)
   ============================================================ */
window.OAKHAVEN = window.OAKHAVEN || {};
window.OAKHAVEN.summonBestiary = {
  ghoul: {
    name: "Risen Ghoul",
    icon: "🧟",
    artPath: "images/monsters/source/tov_ghoul.jpg",
    hp: 22, ac: 12, speed: 30, atk: 4, dmgDice: "2d4", dmgBonus: 2, dmgType: "slashing",
    rangeFt: 5, stunChance: 0.25,
    desc: "Undead ghoul with Paralyzing Claws (25% Stun 1t)."
  },
  skeleton: {
    name: "Skeletal Warrior",
    icon: "💀",
    artPath: "images/monsters/source/tov_skeletons.jpg",
    hp: 26, ac: 13, speed: 30, atk: 5, dmgDice: "1d8", dmgBonus: 3, dmgType: "physical",
    rangeFt: 5,
    desc: "Armored undead skeleton armed with rusted shortsword."
  },
  shadow_mastiff: {
    name: "Shadow Mastiff",
    icon: "🐺",
    artPath: "images/monsters/source/tov_hell_hound.jpg",
    hp: 33, ac: 12, speed: 40, atk: 5, dmgDice: "2d6", dmgBonus: 3, dmgType: "piercing",
    rangeFt: 5, chillTurns: 2,
    desc: "Swift shadow-plane hound whose terrifying bay weakens foes (-2 ATK, 2t)."
  },
  fey_hound: {
    name: "Fey Spellhound",
    icon: "🦊",
    artPath: "images/monsters/source/tov_worg.jpg",
    hp: 28, ac: 13, speed: 40, atk: 5, dmgDice: "2d6", dmgBonus: 2, dmgType: "arcane",
    rangeFt: 5,
    desc: "Agile fey-touched hound with arcane-infused fangs."
  },
  nightmare: {
    name: "Conjured Nightmare",
    icon: "🔥",
    artPath: "images/monsters/source/tov_nightmare.jpg",
    hp: 48, ac: 13, speed: 45, atk: 6, dmgDice: "2d8", dmgBonus: 4, dmgType: "fire",
    rangeFt: 5, dot: { dmg: 4, turns: 2, label: "Hellfire Hooves" },
    desc: "Blazing fiendish steed whose fiery hooves ignite foes (4 fire/t, 2t)."
  },
  forest_defender: {
    name: "Forest Defender",
    icon: "🌳",
    artPath: "images/monsters/source/tov_treant.jpg",
    hp: 42, ac: 15, speed: 25, atk: 6, dmgDice: "2d6", dmgBonus: 4, dmgType: "physical",
    rangeFt: 5, rootTurns: 1,
    desc: "Animated ironwood guardian whose slam roots foes in place (0ft move, 1t)."
  },
  spectral_dead: {
    name: "Spectral Wraith",
    icon: "👻",
    artPath: "images/monsters/source/tov_ghost.jpg",
    hp: 34, ac: 13, speed: 35, atk: 5, dmgDice: "2d8", dmgBonus: 3, dmgType: "necrotic",
    rangeFt: 5, flies: true, chillTurns: 2,
    desc: "Incorporeal spirit that glides over water & terrain, chilling foes (-2 ATK, 2t)."
  },
  fiend: {
    name: "Conjured Barbed Fiend",
    icon: "👹",
    artPath: "images/monsters/source/tov_devil_barbed.jpg",
    hp: 46, ac: 15, speed: 30, atk: 6, dmgDice: "2d8", dmgBonus: 3, dmgType: "fire",
    rangeFt: 45,
    desc: "Infernal warrior capable of hurling searing flame up to 45ft."
  },
  giant: {
    name: "Conjured Frost Giant",
    icon: "🗿",
    artPath: "images/monsters/source/tov_giant_frost.jpg",
    hp: 64, ac: 15, speed: 35, atk: 7, dmgDice: "3d8", dmgBonus: 4, dmgType: "physical",
    rangeFt: 10, pushFt: 10,
    desc: "Towering giant with 10ft reach whose greataxe shoves foes back 10ft."
  },
  swarm: {
    name: "Conjured Swarm",
    icon: "🪲",
    artPath: "images/monsters/source/tob1_bone_swarm.jpg",
    hp: 24, ac: 12, speed: 30, atk: 4, dmgDice: "2d4", dmgBonus: 2, dmgType: "piercing",
    rangeFt: 5, chillTurns: 1,
    desc: "Seething swarm of biting vermin that distracts foes (-2 ATK, 1t)."
  },
  celestial_avatar: {
    name: "Celestial Avatar",
    icon: "🌟",
    artPath: "images/monsters/source/cc_angels.jpg",
    hp: 54, ac: 16, speed: 40, atk: 7, dmgDice: "2d8", dmgBonus: 4, dmgType: "radiant",
    rangeFt: 45, flies: true, undeadDouble: true,
    desc: "Radiant celestial champion that flies freely and deals 2x radiant dmg vs Undead."
  },
  eldritch_servitor: {
    name: "Eldritch Servitor",
    icon: "👁️",
    artPath: "images/monsters/source/cc_void.jpg",
    hp: 38, ac: 14, speed: 30, atk: 6, dmgDice: "2d6", dmgBonus: 3, dmgType: "necrotic",
    rangeFt: 45, flies: true,
    desc: "Void-born servitor firing necrotic bolts up to 45ft."
  },
  wolf: {
    name: "Timber Wolf",
    icon: "🐺",
    artPath: "images/monsters/source/tov_worg.jpg",
    hp: 24, ac: 13, speed: 40, atk: 5, dmgDice: "2d4", dmgBonus: 3, dmgType: "piercing",
    rangeFt: 5,
    desc: "Loyal pack-hunter with swift 40ft speed."
  }
};
