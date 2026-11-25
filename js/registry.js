/* ============================================================
   CHRONICLES OF OAKHAVEN — MODULAR CONTENT REGISTRY
   Loads before all data/* packs and js/engine.js.
   Works over both file:// and HTTP with zero build step.
   ============================================================ */
(function (global) {
  "use strict";

  const RARITY_META = {
    common:    { label: "Common",    rank: 1, cls: "bg-stone-800 text-stone-300 border-stone-600/60" },
    uncommon:  { label: "Uncommon",  rank: 2, cls: "bg-emerald-950/90 text-emerald-300 border-emerald-500/60" },
    rare:      { label: "Rare",      rank: 3, cls: "bg-sky-950/90 text-sky-300 border-sky-500/60" },
    very_rare: { label: "Very Rare", rank: 4, cls: "bg-purple-950/90 text-purple-300 border-purple-500/60" },
    legendary: { label: "Legendary", rank: 5, cls: "bg-amber-950/90 text-amber-300 border-amber-500/70" },
    fabled:    { label: "Fabled",    rank: 6, cls: "bg-rose-950/90 text-rose-200 border-rose-400/80" }
  };

  const RARITY_WEIGHTS = {
    common: 55,
    uncommon: 30,
    rare: 12,
    very_rare: 4,
    legendary: 1.5,
    fabled: 0.6
  };

  function getRarityBadgeHtml(rarity) {
    const m = RARITY_META[rarity];
    if (!m) return "";
    return `<span class="px-1.5 py-0.5 rounded border text-[9px] font-bold uppercase tracking-wider ${m.cls}">${m.label}</span>`;
  }

  function slugifySpell(name) {
    return String(name || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_|_$/g, "");
  }

  const OAKHAVEN = {
    classes: [],
    races: [],
    subclasses: [],
    skills: [],
    spells: [],
    items: {},
    shops: {},
    recipes: [],
    npcs: [],
    quests: {},
    RARITY_META,
    RARITY_WEIGHTS,
    getRarityBadgeHtml,

    registerClasses(list) {
      (list || []).forEach(c => {
        if (!c || !c.id) return;
        const idx = this.classes.findIndex(x => x.id === c.id);
        if (idx >= 0) this.classes[idx] = c;
        else this.classes.push(c);
      });
    },

    registerRaces(list) {
      (list || []).forEach(r => {
        if (!r || !r.id) return;
        const idx = this.races.findIndex(x => x.id === r.id);
        if (idx >= 0) this.races[idx] = r;
        else this.races.push(r);
      });
    },

    registerSubclasses(list) {
      (list || []).forEach(sc => {
        if (!sc || !sc.id) return;
        const idx = this.subclasses.findIndex(x => x.id === sc.id);
        if (idx >= 0) this.subclasses[idx] = sc;
        else this.subclasses.push(sc);
      });
    },

    registerSkills(list) {
      (list || []).forEach(sk => {
        if (!sk || !sk.name) return;
        const idx = this.skills.findIndex(x => x.name === sk.name);
        if (idx >= 0) this.skills[idx] = sk;
        else this.skills.push(sk);
      });
    },

    registerSpells(list) {
      (list || []).forEach(sp => {
        if (!sp || !sp.name) return;
        const idx = this.spells.findIndex(x => x.name === sp.name);
        if (idx >= 0) this.spells[idx] = sp;
        else this.spells.push(sp);

        // Auto-register a Rare Spell Scroll in the general loot table for each spell
        if (!sp.noScroll) {
          const scrollId = sp.scrollId || `scroll_${slugifySpell(sp.name)}`;
          const rarity = sp.scrollRarity || "rare";
          this.items[scrollId] = {
            id: scrollId,
            name: `Spell Scroll: ${sp.name}`,
            type: "spell_scroll",
            rarity,
            unlocksSpell: sp.name,
            value: sp.scrollValue || 110,
            desc: `Use to permanently learn ${sp.name} (${sp.mp} MP).`
          };
        }
      });
    },

    registerItems(map) {
      Object.entries(map || {}).forEach(([k, v]) => {
        if (v && v.name) this.items[k] = { id: k, ...v };
      });
    },

    registerShops(map) {
      Object.entries(map || {}).forEach(([k, v]) => {
        if (v) this.shops[k] = v;
      });
    },

    registerRecipes(list) {
      (list || []).forEach(rec => {
        if (!rec || !rec.result) return;
        const idx = this.recipes.findIndex(x => x.result === rec.result);
        if (idx >= 0) this.recipes[idx] = rec;
        else this.recipes.push(rec);
      });
    },

    registerNpcs(list) {
      (list || []).forEach(npc => {
        if (!npc || !npc.id) return;
        const idx = this.npcs.findIndex(x => x.id === npc.id);
        if (idx >= 0) this.npcs[idx] = npc;
        else this.npcs.push(npc);
      });
    },

    registerQuests(map) {
      Object.entries(map || {}).forEach(([k, adv]) => {
        if (adv && adv.title && adv.pages) {
          this.quests[k] = {
            id: k,
            totalPages: adv.totalPages || Object.keys(adv.pages).length,
            ...adv
          };
        }
      });
    }
  };

  // General random loot roller (used by quests at load-time and combat drops)
  function rollRandomLoot(types = null, count = 1, maxRarity = "rare") {
    const allItems = OAKHAVEN.items;
    const maxRank = (RARITY_META[maxRarity] || RARITY_META.rare).rank;

    const candidates = Object.values(allItems).filter(it => {
      if (it.unique || it.id === "novice_cudgel") return false;
      if (types && !types.includes(it.type)) return false;
      const rKey = it.rarity || "common";
      const rank = (RARITY_META[rKey] || RARITY_META.common).rank;
      return rank <= maxRank;
    });

    const picks = [];
    for (let i = 0; i < count && candidates.length > 0; i++) {
      const totalW = candidates.reduce((sum, it) => sum + (RARITY_WEIGHTS[it.rarity || "common"] || 20), 0);
      let r = Math.random() * totalW;
      let chosen = candidates[0];
      for (const it of candidates) {
        r -= (RARITY_WEIGHTS[it.rarity || "common"] || 20);
        if (r <= 0) { chosen = it; break; }
      }
      picks.push(chosen.id);
    }
    return picks;
  }

  // Encounter-scaled bonus drop helper (called when defeating enemies in combat)
  function rollEncounterVaultDrop(enemy) {
    const xp = enemy.xp || 25;
    let maxRarity = "common";
    let dropChance = 0.30;

    if (xp >= 150)      { maxRarity = "fabled";    dropChance = 0.85; }
    else if (xp >= 110) { maxRarity = "legendary"; dropChance = 0.65; }
    else if (xp >= 70)  { maxRarity = "very_rare"; dropChance = 0.50; }
    else if (xp >= 45)  { maxRarity = "rare";      dropChance = 0.40; }
    else if (xp >= 30)  { maxRarity = "uncommon";  dropChance = 0.35; }

    if (Math.random() > dropChance) return null;

    const maxRank = (RARITY_META[maxRarity] || RARITY_META.common).rank;
    const rollType = Math.random();
    let types;
    // Rare+ encounters can drop Rare Spell Scrolls from the general loot table
    if (maxRank >= RARITY_META.rare.rank && rollType < 0.16) {
      types = ["spell_scroll"];
    } else if (rollType < 0.60) {
      types = ["schematic"];
    } else {
      types = ["weapon", "armor", "offhand", "accessory", "cloak", "consumable", "bomb"];
    }

    const rolled = rollRandomLoot(types, 1, maxRarity);
    return rolled[0] || null;
  }

  OAKHAVEN.rollRandomLoot = rollRandomLoot;
  OAKHAVEN.rollEncounterVaultDrop = rollEncounterVaultDrop;

  global.OAKHAVEN = OAKHAVEN;
  global.RARITY_META = RARITY_META;
  global.RARITY_WEIGHTS = RARITY_WEIGHTS;
  global.getRarityBadgeHtml = getRarityBadgeHtml;
  global.rollRandomLoot = rollRandomLoot;
  global.rollEncounterVaultDrop = rollEncounterVaultDrop;
})(window);
