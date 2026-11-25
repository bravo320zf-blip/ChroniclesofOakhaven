/* ============================================================
   CHRONICLES OF OAKHAVEN — CORE GAME ENGINE
   Reads all content dynamically from window.OAKHAVEN.
   ============================================================ */
(() => {
  "use strict";

	// Global Difficulty Tuning (Adjust these multipliers anytime!)
    const DIFFICULTY = {
      enemyHpMult: 1.50,      // +50% Enemy HP across all quests
      enemyAcBonus: 2,        // +2 Enemy AC base (+1 extra every 3 hero levels)
      enemyAtkBonus: 2,       // +2 Enemy Attack base (+1 extra every 2 hero levels)
      enemyDmgMult: 1.40,     // +40% Enemy Damage (+1 flat floor)
      skillDcBonus: 2,        // +2 DC on all Skill Checks (+1 every 3 hero levels)
      hazardDmgMult: 1.45,    // +45% Trap & Failed-Check damage
      bossEnrageThreshold: 0.5 // Bosses (base HP >= 28) enrage below 50% HP (+2 DMG, +1 ATK)
    };

  // Pull modular content from window.OAKHAVEN
  const ARCHETYPES = window.OAKHAVEN.classes;
  const RACES = window.OAKHAVEN.races;
  const SUBCLASSES = window.OAKHAVEN.subclasses;
  const SKILLS_LIST = window.OAKHAVEN.skills;
  const SPELLS_LIST = window.OAKHAVEN.spells;
  const ITEMS_DB = window.OAKHAVEN.items;
  const SHOPS = window.OAKHAVEN.shops;
  const CRAFT_RECIPES = window.OAKHAVEN.recipes;
  const TAVERN_NPCS = window.OAKHAVEN.npcs;
  const ADVENTURES = window.OAKHAVEN.quests;

  // Strip real-world sourcebook names from quest subtitles while preserving in-world locations & Part X of Y labels
  function cleanQuestSubtitle(raw) {
    if (!raw) return "";
    const SOURCE_PREFIXES = [
      "12 Peculiar Towers",
      "Book of Lairs",
      "Creature Codex Lairs",
      "Eldritch Lairs",
      "Midgard Sagas",
      "Midgard Side-Trek",
      "Prepared!",
      "Tome of Beasts 2 Lairs",
      "Tome of Beasts Lairs",
      "Southlands Adventure",
      "Tales of the Valiant",
      "Tyranny of Dragons",
      "City of Cats",
      "Underworld Lairs",
      "Warlock Lairs",
      "Warlock Lair"
    ];
    let s = String(raw).trim();
    for (const src of SOURCE_PREFIXES) {
      const esc = src.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // e.g. "Book of Lairs (Part 1 of 2) • Foo" -> "Part 1 of 2 • Foo"
      s = s.replace(new RegExp(`^${esc}\\s*\\((Part\\s+\\d+\\s+of\\s+\\d+)\\)\\s*(?:[•\\-–—:]\\s*)?`, "i"), "$1 • ");
      // e.g. "12 Peculiar Towers • Foo" -> "Foo"
      s = s.replace(new RegExp(`^${esc}\\s*(?:[•\\-–—:]\\s*)?`, "i"), "");
    }
    return s.replace(/^\s*[•\-–—:]\s*/, "").replace(/\s*[•\-–—:]\s*$/, "").trim();
  }

  // Automatically place every non-autoDiscover quest (that has no prerequisite and no
  // dedicated NPC/location trigger) into the Rusty Flagon Inn's rotating rumor patron pool.
  (() => {
    const claimedQuests = new Set(["thornwood", "saltfang", "st_jude", "karak_zul", "crimson_spire"]);
    TAVERN_NPCS.forEach(npc => {
      if (npc.discoverQuest) claimedQuests.add(npc.discoverQuest);
      if (Array.isArray(npc.options)) {
        npc.options.forEach(opt => { if (opt.unlock) claimedQuests.add(opt.unlock); });
      }
    });
    Object.values(ADVENTURES).forEach(adv => {
      if (!adv || adv.autoDiscover || adv.reqQuest || claimedQuests.has(adv.id)) return;
      claimedQuests.add(adv.id);
      const rawSrc = (adv.discoverySource || "Frontier Traveler").replace(/\s*\([^)]*\)\s*/g, "").trim();
      const patronName = rawSrc || "Frontier Traveler";
      const lvlTag = adv.recommendedLevel ? `Lv. ${adv.recommendedLevel}+` : "Frontier";
      const cleanSub = cleanQuestSubtitle(adv.subtitle);
      TAVERN_NPCS.push({
        id: `inn_rumor_${adv.id}`,
        name: patronName,
        role: `Tavern Rumor • ${adv.difficulty || "Adventure"} (${lvlTag})`,
        discoverQuest: adv.id,
        greeting: `"You look handy with steel and spell, friend. Have you heard the talk about ${adv.title}? ${adv.summary}"`,
        options: [
          {
            label: `Ask for the trail to ${adv.title}`,
            unlock: adv.id,
            reply: `"I've marked the route to ${adv.title} on the Town Square Quest Board for you. Stay sharp—${cleanSub || "danger awaits"}!"`
          },
          {
            label: "Buy them a mug and listen to local gossip",
            reply: `"Much obliged! If you decide to take on ${adv.title}, stop back by and I'll point you straight to the trail."`
          }
        ]
      });
    });
  })();
  const RARITY_META = window.OAKHAVEN.RARITY_META;
  const getRarityBadgeHtml = window.OAKHAVEN.getRarityBadgeHtml;
  const rollRandomLoot = window.OAKHAVEN.rollRandomLoot;
  const rollEncounterVaultDrop = window.OAKHAVEN.rollEncounterVaultDrop;
  const sfx = (name) => window.OAKHAVEN_AUDIO?.playSfx(name);
  const sfxSpell = (dt, isH, isS) => window.OAKHAVEN_AUDIO?.playSpellByType(dt, isH, isS);
  const bgm = (theme) => window.OAKHAVEN_AUDIO?.setMusic(theme);

  function updateHeaderTotals() {
    const subText = "Solo Fantasy Gamebook RPG • Frontier Tales & Rumors";
    const subEl = document.getElementById("header-subtitle");
    if (subEl) subEl.textContent = subText;
    const launchSub = document.getElementById("launch-subtitle");
    if (launchSub) launchSub.textContent = subText;
  }
  updateHeaderTotals();

    /* ------------------------------------------------------------
       4. APPLICATION STATE
       ------------------------------------------------------------ */
    const SAVE_KEY = "chronicles_of_oakhaven_v1";
    const SAVE_SLOTS_KEY = "chronicles_of_oakhaven_slots_v1";
    const MAX_SAVE_SLOTS = 5;
    let activeSaveSlot = 0;
    const GUILD_STAT_UPGRADE_COSTS = [500, 1000, 1500];
    const GUILD_SKILL_COST = 500;
    const GUILD_MAX_SKILLS = 3;
    const GUILD_SPELL_COST = 500;
    const GUILD_MAX_SPELLS = 2;
    const MAX_PREPARED_SPELLS = 4;

    const defaultArchId = ARCHETYPES[0]?.id || "warrior";
    const defaultRaceId = RACES[0]?.id || "human";
    const defaultSubclassId = SUBCLASSES.find(sc => sc.classId === defaultArchId)?.id || null;
    let creation = {
      archId: defaultArchId,
      raceId: defaultRaceId,
      subclassId: defaultSubclassId,
      pts: 6,
      bonus: { might: 0, agility: 0, arcana: 0, spirit: 0, luck: 0 },
      skills: [...(ARCHETYPES[0]?.skills || ["Athletics", "Perception"])],
      spells: [...(ARCHETYPES[0]?.spells || ["Mend Wounds", "Arcane Shield"])]
    };
    let state = null;
    let activeCombat = null;
    let currentDistrict = "square";
    let currentShop = "armory";
    let currentSheetTab = "gear";
    let activeNpcDialogue = null;
    let buildingModalOpen = false;

    /* ------------------------------------------------------------
       4B. INTERACTIVE TOWN MAP GRID (24 COLS x 18 ROWS)
       Legend:
         '.' = Invisible Wall (Impassable)
         '#' = Walkable Dirt / Cobblestone Path
         'T' = Rusty Flagon (tavern)
         'S' = Stash Vault (stash)
         'O' = Outskirts Trail (outskirts)
         'M' = Market Stalls (market)
         'D' = Dawn Temple (temple)
         'F' = Forge & Craft (forge)
         'G' = Guildhall (guild)
         'Q' = Town Square Notice Board (square)
       ------------------------------------------------------------ */
    const MAP_COLS = 24;
    const MAP_ROWS = 18;
    const MAP_IMG_CACHE_KEY = "oakhaven_custom_town_map_v1";
    const TOWN_MAP_LAYOUT = [
      "......................#.", // y=0  (NE Outskirts exit)
      "....................###.", // y=1
      "...................#O#..", // y=2  (Outskirts trailhead)
      "..................###...", // y=3
      ".................###....", // y=4
      "............SS..###.....", // y=5  (Stash Vault doors)
      "........T...######......", // y=6  (Rusty Flagon porch steps + Vault cobbles)
      ".......#########........", // y=7  (Wide north ring road)
      ".#########....##M.......", // y=8  (West road + East road + Market stalls)
      "......####....##M.......", // y=9  (Oak Tree at x=10..13 is walled)
      ".......####Q#####.......", // y=10 (Town Square Notice Board under tree)
      ".......##########.......", // y=11 (Wide south ring road bypassing Q & F)
      ".......###.F..###.......", // y=12 (Road to Bridge/Guild + Forge & Craft + Temple road)
      ".....G####.....###......", // y=13 (Guildhall front door + Temple road)
      "......###.......###D....", // y=14 (Bridge approach + Dawn Temple steps)
      ".....###.........###....", // y=15 (Stone Bridge + Temple gate)
      "....###...........##....", // y=16 (South exits)
      "........................"  // y=17
    ];

    const TILE_TO_BUILDING = {
      T: { id: "tavern",    name: "The Rusty Flagon Tavern", icon: "🍺", img: "images/loc_tavern.jpg" },
      S: { id: "stash",     name: "Personal Stash Vault",    icon: "🔐", img: "images/loc_stash.jpg" },
      O: { id: "outskirts", name: "Oakhaven Outskirts",      icon: "🌲", img: "images/loc_outskirts.jpg" },
      M: { id: "market",    name: "Market District",         icon: "⚖️", img: "images/loc_market.jpg" },
      D: { id: "temple",    name: "The Temple of the Dawn",  icon: "☀️", img: "images/loc_temple.jpg" },
      F: { id: "forge",     name: "Forge & Arcane Workbench",icon: "⚒️", img: "images/loc_forge.jpg" },
      G: { id: "guild",     name: "Adventurer's Guildhall",  icon: "⚔️", img: "images/loc_guild.jpg" },
      Q: { id: "square",    name: "Town Square & Quest Board",icon: "🏛️", img: "images/loc_square.jpg" }
    };

    // Preload all town location interior illustrations for seamless fade transitions
    Object.values(TILE_TO_BUILDING).forEach(b => {
      if (b.img) { const im = new Image(); im.src = b.img; }
    });

    // Round Character Token Image Cache (Single Race+Class token with fallback to Class token)
    const tokenImgCache = {};
    function getTokenImg(primarySrc, fallbackSrc) {
      const key = `${primarySrc}|${fallbackSrc || ""}`;
      if (!tokenImgCache[key]) {
        const im = new Image();
        im._ready = false;
        im.onload = () => { im._ready = true; };
        im.onerror = () => {
          if (fallbackSrc && im.src.indexOf(fallbackSrc) === -1) {
            im.src = fallbackSrc;
          }
        };
        im.src = primarySrc;
        tokenImgCache[key] = im;
      }
      return tokenImgCache[key];
    }

    function getHeroTokenPaths(hero) {
      const raceId = hero?.raceId || "human";
      let classId = hero?.classId;
      if (!classId && hero?.className) {
        const found = ARCHETYPES.find(a => a.name.toLowerCase() === hero.className.toLowerCase() || (hero.className === "Arcanist" && a.id === "arcanist"));
        classId = found ? found.id : "warrior";
      }
      if (!classId) classId = "warrior";
      return {
        primarySrc: `images/tokens/${raceId}_${classId}.png`,
        fallbackSrc: `images/tokens/classes/${classId}.png`
      };
    }

    function setImgWithFallback(imgEl, primarySrc, fallbackSrc) {
      if (!imgEl) return;
      imgEl.onerror = () => {
        imgEl.onerror = null;
        if (fallbackSrc) imgEl.src = fallbackSrc;
      };
      imgEl.src = primarySrc;
    }

    const BUILDING_SPAWN_POS = {
      square:    { x: 11, y: 11 },
      tavern:    { x: 8,  y: 7  },
      stash:     { x: 12, y: 6  },
      outskirts: { x: 18, y: 3  },
      market:    { x: 15, y: 8  },
      temple:    { x: 18, y: 15 },
      forge:     { x: 11, y: 11 },
      guild:     { x: 6,  y: 13 }
    };

    let showGridOverlay = false;
    let mapImage = new Image();
    let mapImageReady = false;
    let walkQueue = [];
    let walkTimer = null;
    let bumpOffset = { x: 0, y: 0 };
    let mapAnimFrame = null;

    function loadTownMapSource(src, isFallbackCheck = false) {
      const img = new Image();
      img.onload = () => {
        mapImage = img;
        mapImageReady = true;
        const hint = document.getElementById("map-fallback-hint");
        if (hint) hint.classList.add("hidden");
      };
      img.onerror = () => {
        if (isFallbackCheck) {
          mapImageReady = false;
          const hint = document.getElementById("map-fallback-hint");
          if (hint) hint.classList.remove("hidden");
        }
      };
      img.src = src;
    }

    // Try cached user-loaded map first, then local filename
    (() => {
      let cached = null;
      try { cached = localStorage.getItem(MAP_IMG_CACHE_KEY); } catch (e) {}
      if (cached) {
        loadTownMapSource(cached, true);
      } else {
        loadTownMapSource("Gemini_Generated_Image_8g96pf8g96pf8g96.jpg", true);
      }
    })();

    /* ------------------------------------------------------------
       5. CORE UTILITIES (DICE, TOASTS, DERIVED STATS, XP & PACK)
       ------------------------------------------------------------ */
    function roll(sides = 6) {
      return Math.floor(Math.random() * sides) + 1;
    }

    function roll2d6() {
      const d1 = roll(6), d2 = roll(6);
      return { d1, d2, total: d1 + d2 };
    }

    function rollDiceSpec(spec) {
      let count = 1, sides = 6;
      if (typeof spec === "string") {
        const m = spec.trim().match(/^(\d+)d(\d+)$/i);
        if (m) { count = parseInt(m[1], 10); sides = parseInt(m[2], 10); }
      } else if (spec && typeof spec === "object") {
        count = spec.count || 1;
        sides = spec.sides || 6;
      }
      const rolls = [];
      let total = 0;
      for (let i = 0; i < count; i++) {
        const r = roll(sides);
        rolls.push(r);
        total += r;
      }
      return { total, rolls, label: `[${rolls.join("+")}]` };
    }

    function ensureHeroProgressionState(target = state) {
      if (!target) return;
      if (!target.guildStatUpgrades || typeof target.guildStatUpgrades !== "object") {
        target.guildStatUpgrades = { might: 0, agility: 0, arcana: 0, spirit: 0, luck: 0 };
      } else {
        ["might", "agility", "arcana", "spirit", "luck"].forEach(k => {
          if (typeof target.guildStatUpgrades[k] !== "number") target.guildStatUpgrades[k] = 0;
        });
      }
      if (typeof target.guildSkillsLearned !== "number") target.guildSkillsLearned = 0;
      if (typeof target.guildSpellsLearned !== "number") target.guildSpellsLearned = 0;
      if (!Array.isArray(target.spells)) target.spells = [];
      if (!Array.isArray(target.preparedSpells)) {
        target.preparedSpells = target.spells.slice(0, MAX_PREPARED_SPELLS);
      } else {
        target.preparedSpells = target.preparedSpells
          .filter((n, idx, arr) => target.spells.includes(n) && arr.indexOf(n) === idx)
          .slice(0, MAX_PREPARED_SPELLS);
      }
    }

    function toast(msg, type = "gold") {
      if (type === "bad") sfx("error");
      const box = document.getElementById("toast-container");
      if (!box) return;
      const el = document.createElement("div");
      const cls = {
        gold: "bg-stone-900 border-amber-500/70 text-amber-200",
        good: "bg-emerald-950 border-emerald-500/70 text-emerald-200",
        bad:  "bg-red-950 border-red-500/70 text-red-200",
        info: "bg-sky-950 border-sky-500/70 text-sky-200"
      };
      el.className = `pointer-events-auto px-3.5 py-2 rounded-xl border shadow-xl text-xs font-medium pop-in ${cls[type] || cls.gold}`;
      el.textContent = msg;
      box.appendChild(el);
      setTimeout(() => {
        el.style.opacity = "0";
        el.style.transition = "opacity 0.25s ease";
        setTimeout(() => el.remove(), 260);
      }, 3000);
    }

    function addLog(text, type = "normal") {
      if (!state) return;
      state.log.unshift({ text, type });
      if (state.log.length > 45) state.log.pop();
      renderLog();
    }

    function getHeroSubclass(hero) {
      if (!hero || !hero.subclassId) return null;
      return SUBCLASSES.find(sc => sc.id === hero.subclassId) || null;
    }

    function getUnlockedSubclassAbilities(hero) {
      const sub = getHeroSubclass(hero);
      if (!sub || !Array.isArray(sub.abilities)) return [];
      const lvl = hero.level || 1;
      return sub.abilities.filter(ab => lvl >= (ab.level || 1));
    }

    function getSubclassPassiveTotals(hero) {
      const totals = {
        might: 0, agility: 0, arcana: 0, spirit: 0, luck: 0,
        ac: 0, atk: 0, hp: 0, mp: 0,
        bombDmgBonus: 0, bombChillTurns: 0,
        spellDmgBonus: 0, spellCostReduce: 0, healBonus: 0,
        critRange: 12, lifesteal: 0, thornsDmg: 0,
        undeadDmgBonus: 0, bossDmgBonus: 0, goldFindPct: 0
      };
      const unlocked = getUnlockedSubclassAbilities(hero);
      unlocked.forEach(ab => {
        if (ab.statBonuses) {
          Object.entries(ab.statBonuses).forEach(([k, v]) => {
            if (totals[k] !== undefined) totals[k] += (v || 0);
          });
        }
        if (ab.bonusAc) totals.ac += ab.bonusAc;
        if (ab.bonusAtk) totals.atk += ab.bonusAtk;
        if (ab.bonusHp) totals.hp += ab.bonusHp;
        if (ab.bonusMp) totals.mp += ab.bonusMp;
        if (ab.bombDmgBonus) totals.bombDmgBonus += ab.bombDmgBonus;
        if (ab.bombChillTurns) totals.bombChillTurns = Math.max(totals.bombChillTurns, ab.bombChillTurns);
        if (ab.spellDmgBonus) totals.spellDmgBonus += ab.spellDmgBonus;
        if (ab.spellCostReduce) totals.spellCostReduce += ab.spellCostReduce;
        if (ab.healBonus) totals.healBonus += ab.healBonus;
        if (ab.critRange && ab.critRange < totals.critRange) totals.critRange = ab.critRange;
        if (ab.lifesteal) totals.lifesteal += ab.lifesteal;
        if (ab.thornsDmg) totals.thornsDmg += ab.thornsDmg;
        if (ab.undeadDmgBonus) totals.undeadDmgBonus += ab.undeadDmgBonus;
        if (ab.bossDmgBonus) totals.bossDmgBonus += ab.bossDmgBonus;
        if (ab.goldFindPct) totals.goldFindPct += ab.goldFindPct;
      });
      return totals;
    }

    function getEffectiveSpellMp(sp, hero = state) {
      if (!sp) return 0;
      if (activeCombat && activeCombat.overchargeTurns > 0) return 0;
      const subP = getSubclassPassiveTotals(hero);
      return Math.max(1, (sp.mp || 0) - (subP.spellCostReduce || 0));
    }

    function getHeroClassAbility(hero = state) {
      if (!hero) return null;
      const cls = ARCHETYPES.find(a => a.id === hero.archId || a.name === hero.className);
      return cls?.signatureAbility || null;
    }

    function showSubclassTooltip(sc, evt) {
      const tip = document.getElementById("subclass-tooltip");
      if (!tip || !sc) return;
      const abilities = Array.isArray(sc.abilities) ? sc.abilities : [];
      const lvlBadgeCls = (lv) => lv === 1
        ? "bg-emerald-950 text-emerald-300 border-emerald-500/60"
        : lv === 5
          ? "bg-sky-950 text-sky-300 border-sky-500/60"
          : "bg-amber-950 text-amber-300 border-amber-500/60";
      tip.innerHTML = `
        <div class="flex items-center justify-between gap-2 border-b border-purple-700/40 pb-1.5">
          <span class="font-display text-sm font-bold text-purple-200">${sc.name}</span>
          ${sc.source ? `<span class="text-[9px] px-1.5 py-0.5 rounded bg-stone-900 border border-stone-700 text-stone-400 uppercase">${sc.source}</span>` : ""}
        </div>
        <div class="space-y-2">
          ${abilities.map(ab => `
            <div class="p-2 rounded-lg bg-stone-900/90 border border-stone-800">
              <div class="flex items-center justify-between gap-1.5 mb-0.5">
                <span class="font-bold text-amber-200">${ab.icon || "✨"} ${ab.name}</span>
                <span class="px-1.5 py-0.5 rounded border text-[9px] font-bold uppercase shrink-0 ${lvlBadgeCls(ab.level)}">Lv. ${ab.level}</span>
              </div>
              <div class="text-[11px] text-stone-300 leading-snug">${ab.desc}</div>
            </div>
          `).join("")}
        </div>
      `;
      tip.classList.remove("hidden");
      positionSubclassTooltip(evt);
    }

    function positionSubclassTooltip(evt) {
      const tip = document.getElementById("subclass-tooltip");
      if (!tip || tip.classList.contains("hidden") || !evt) return;
      const pad = 14;
      const w = tip.offsetWidth || 320;
      const h = tip.offsetHeight || 220;
      let x = (evt.clientX || 0) + pad;
      let y = (evt.clientY || 0) + pad;
      if (x + w > window.innerWidth - 10) x = Math.max(10, (evt.clientX || 0) - w - pad);
      if (y + h > window.innerHeight - 10) y = Math.max(10, window.innerHeight - h - 10);
      tip.style.left = `${x}px`;
      tip.style.top = `${y}px`;
    }

    function hideSubclassTooltip() {
      const tip = document.getElementById("subclass-tooltip");
      if (tip) tip.classList.add("hidden");
    }

    function getDerived(hero) {
      const s = { ...hero.baseStats };
      const subB = getSubclassPassiveTotals(hero);
      s.might += subB.might;
      s.agility += subB.agility;
      s.arcana += subB.arcana;
      s.spirit += subB.spirit;
      s.luck += subB.luck;
      let ac = 7 + (hero.bonusAc || 0) + subB.ac, atk = (hero.bonusAtk || 0) + subB.atk, hpB = subB.hp, mpB = subB.mp;
      Object.values(hero.equipment || {}).forEach(id => {
        if (!id || !ITEMS_DB[id]) return;
        const it = ITEMS_DB[id];
        if (it.ac) ac += it.ac;
        if (it.atk) atk += it.atk;
        if (it.might) s.might += it.might;
        if (it.agility) s.agility += it.agility;
        if (it.arcana) s.arcana += it.arcana;
        if (it.spirit) s.spirit += it.spirit;
        if (it.luck) s.luck += it.luck;
        if (it.maxHp) hpB += it.maxHp;
        if (it.maxMp) mpB += it.maxMp;
      });
      if (hero.blessing === "ac") ac += 1;
      if (hero.blessing === "luck") s.luck += 1;
      if (hero.innBuff && s[hero.innBuff] !== undefined) s[hero.innBuff] += 1;
      ac += Math.floor(s.agility / 2);
      if (hero.shieldTurns > 0) ac += 3;
      if (hero.evadeTurns > 0) ac += 2;
      atk += Math.max(s.might, s.agility);
      const lvl = hero.level || 1;
      const maxHp = 14 + s.might * 2 + (lvl - 1) * 4 + (hero.bonusHp || 0) + hpB;
      const maxMp = 4 + s.arcana * 2 + (lvl - 1) * 2 + (hero.bonusMp || 0) + mpB;
      return { s, ac, atk, maxHp, maxMp, maxLuck: s.luck };
    }

    const MAX_HERO_LEVEL = 20;

    function gainXp(amt) {
      if (!amt || !state) return;
      if (state.level >= MAX_HERO_LEVEL) {
        state.level = MAX_HERO_LEVEL;
        state.xp = 0;
        return;
      }
      state.xp += amt;
      let needed = state.level * 100;
      while (state.level < MAX_HERO_LEVEL && state.xp >= needed) {
        state.xp -= needed;
        state.level++;
        state.unspentStatPts++;
        const d = getDerived(state);
        state.hp = d.maxHp;
        state.mp = d.maxMp;
        const maxTag = state.level >= MAX_HERO_LEVEL ? " (MAX LEVEL!)" : "";
        toast(`⭐ LEVEL UP! Reached Level ${state.level}${maxTag}! (+4 Max HP, +2 Max MP, +1 Stat Point)`, "gold");
        sfx("levelUp");
        addLog(`Leveled up to Level ${state.level}${maxTag}!`, "gold");
        const sub = getHeroSubclass(state);
        if (sub && Array.isArray(sub.abilities)) {
          sub.abilities.filter(ab => ab.level === state.level).forEach(ab => {
            toast(`🌟 SUBCLASS ABILITY UNLOCKED (Lv.${state.level}): ${ab.name}!`, "info");
            addLog(`Unlocked ${sub.name} Ability (Lv.${state.level}): ${ab.name} — ${ab.desc}`, "gold");
          });
        }
        if (state.level >= MAX_HERO_LEVEL) {
          state.xp = 0;
          break;
        }
        needed = state.level * 100;
      }
    }
	
	const MAX_MAT_STACK = 20;
    let dragStackInfo = null; // { container: "backpack"|"stash", index: number }

    function isStackableMaterial(itemId) {
      const t = ITEMS_DB[itemId]?.type;
      return t === "material" || t === "consumable" || t === "bomb";
    }

    function getEntryId(entry) {
      return typeof entry === "string" ? entry : entry?.id;
    }

    function getEntryQty(entry) {
      return typeof entry === "string" ? 1 : Math.max(1, entry?.qty || 1);
    }

    function makeStackEntry(itemId, qty = 1) {
      return isStackableMaterial(itemId) ? { id: itemId, qty } : itemId;
    }

    // Safely consumes 1 item from a slot (decrements stack or removes if qty === 1)
    function consumeOneFromSlot(containerKey, index) {
      const arr = state[containerKey];
      const entry = arr[index];
      if (!entry) return null;
      const id = getEntryId(entry);
      const qty = getEntryQty(entry);
      if (qty <= 1) arr.splice(index, 1);
      else arr[index] = { id, qty: qty - 1 };
      return id;
    }
	
	let currentForgeTab = "all";
    let forgeCraftableOnly = false;

    // Ensures `state.stashTabs` exists and migrates legacy single `state.stash` saves
    function ensureStashTabs(target = state) {
      if (!target) return [];
      if (!Array.isArray(target.stashTabs) || target.stashTabs.length === 0) {
        const legacy = Array.isArray(target.stash) ? target.stash : [];
        target.stashTabs = [legacy];
      }
      if (
        typeof target.activeStashTab !== "number" ||
        target.activeStashTab < 0 ||
        target.activeStashTab >= target.stashTabs.length
      ) {
        target.activeStashTab = 0;
      }
      // Keep legacy pointer synced to Tab 1
      target.stash = target.stashTabs[0];
      return target.stashTabs;
    }

    // Cost of the next Stash Tab: 500 -> 1000 -> 2000 -> 4000 -> ...
    function getNextStashTabCost() {
      const tabs = ensureStashTabs();
      return 500 * Math.pow(2, tabs.length - 1);
    }

    // Resolves "backpack", "stash" (active tab), or "stash:<idx>" to its array
    function getContainerArray(containerKey) {
      if (containerKey === "backpack") return state.backpack;
      const tabs = ensureStashTabs();
      if (containerKey === "stash") return tabs[state.activeStashTab];
      if (typeof containerKey === "string" && containerKey.startsWith("stash:")) {
        const idx = parseInt(containerKey.split(":")[1], 10);
        return tabs[idx] || tabs[0];
      }
      return state.backpack;
    }

    function getContainerMaxSlots(containerKey) {
      return containerKey === "backpack" ? 12 : 20;
    }

    function getContainerLabel(containerKey) {
      if (containerKey === "backpack") return "Backpack";
      if (typeof containerKey === "string" && containerKey.startsWith("stash:")) {
        const idx = parseInt(containerKey.split(":")[1], 10);
        return `Stash Tab ${idx + 1}`;
      }
      return `Stash Tab ${(state?.activeStashTab || 0) + 1}`;
    }

    // Adds an item into the active Stash Tab first, then tries other unlocked tabs
    function addItemToAnyStashTab(itemId, qty = 1) {
      const tabs = ensureStashTabs();
      let remaining = qty;
      const order = [state.activeStashTab];
      for (let i = 0; i < tabs.length; i++) {
        if (i !== state.activeStashTab) order.push(i);
      }
      for (const tabIdx of order) {
        if (remaining <= 0) break;
        const added = addItemToContainer(`stash:${tabIdx}`, itemId, remaining, 20);
        remaining -= added;
      }
      return qty - remaining;
    }

    // Adds `qty` of `itemId` to a container ("backpack" or "stash"), filling
    // existing stacks up to 20 before occupying new slots. Returns qty added.
    function addItemToContainer(containerKey, itemId, qty = 1, maxSlots = null) {
      if (!state || !ITEMS_DB[itemId] || qty <= 0) return 0;
      const arr = getContainerArray(containerKey);
      const limit = maxSlots ?? getContainerMaxSlots(containerKey);
      let remaining = qty;

      if (isStackableMaterial(itemId)) {
        for (let i = 0; i < arr.length && remaining > 0; i++) {
          if (getEntryId(arr[i]) === itemId) {
            const cur = getEntryQty(arr[i]);
            if (cur < MAX_MAT_STACK) {
              const add = Math.min(remaining, MAX_MAT_STACK - cur);
              arr[i] = { id: itemId, qty: cur + add };
              remaining -= add;
            }
          }
        }
        while (remaining > 0 && arr.length < limit) {
          const add = Math.min(remaining, MAX_MAT_STACK);
          arr.push({ id: itemId, qty: add });
          remaining -= add;
        }
      } else {
        while (remaining > 0 && arr.length < limit) {
          arr.push(itemId);
          remaining--;
        }
      }
      return qty - remaining;
    }

    // Compacts loose material strings from older saves into stacks of up to 20
    function compactContainerStacks(arr, maxSlots) {
      if (!Array.isArray(arr)) return [];
      const out = [];
      for (const entry of arr) {
        const id = getEntryId(entry);
        let rem = getEntryQty(entry);
        if (!id || !ITEMS_DB[id]) continue;
        if (isStackableMaterial(id)) {
          for (let i = 0; i < out.length && rem > 0; i++) {
            if (getEntryId(out[i]) === id && getEntryQty(out[i]) < MAX_MAT_STACK) {
              const add = Math.min(rem, MAX_MAT_STACK - getEntryQty(out[i]));
              out[i].qty += add;
              rem -= add;
            }
          }
          while (rem > 0 && out.length < maxSlots) {
            const add = Math.min(rem, MAX_MAT_STACK);
            out.push({ id, qty: add });
            rem -= add;
          }
        } else if (out.length < maxSlots) {
          out.push(id);
        }
      }
      return out;
    }

    // Handles Drag-and-Drop merging (e.g., 5 + 5 = 10) or slot swapping
    function handleStackDrop(srcContainer, srcIdx, dstContainer, dstIdx) {
      if (!state) return;
      if (srcContainer === dstContainer && srcIdx === dstIdx) return;

      const srcArr = getContainerArray(srcContainer);
      const dstArr = getContainerArray(dstContainer);
      const srcEntry = srcArr[srcIdx];
      const dstEntry = dstArr[dstIdx];
      if (!srcEntry || !dstEntry) return;

      const srcId = getEntryId(srcEntry);
      const dstId = getEntryId(dstEntry);
      const srcQty = getEntryQty(srcEntry);
      const dstQty = getEntryQty(dstEntry);

      if (srcId === dstId && isStackableMaterial(srcId)) {
        const space = MAX_MAT_STACK - dstQty;
        if (space <= 0) {
          toast(`${ITEMS_DB[dstId].name} stack is already full (${MAX_MAT_STACK}/${MAX_MAT_STACK}).`, "info");
          return;
        }
        const moved = Math.min(srcQty, space);
        dstArr[dstIdx] = { id: dstId, qty: dstQty + moved };
        if (srcQty - moved <= 0) srcArr.splice(srcIdx, 1);
        else srcArr[srcIdx] = { id: srcId, qty: srcQty - moved };
        toast(`Merged ${ITEMS_DB[dstId].name} into a stack of ${dstQty + moved}!`, "good");
      } else if (srcContainer === dstContainer) {
        srcArr[srcIdx] = dstEntry;
        dstArr[dstIdx] = srcEntry;
      } else {
        const added = addItemToContainer(dstContainer, srcId, srcQty);
        if (added <= 0) {
          toast(`${getContainerLabel(dstContainer)} is full!`, "bad");
          return;
        }
        if (added >= srcQty) srcArr.splice(srcIdx, 1);
        else srcArr[srcIdx] = { id: srcId, qty: srcQty - added };
        toast(`Moved ${added}x ${ITEMS_DB[srcId].name} to ${getContainerLabel(dstContainer)}.`, "info");
      }

      if (buildingModalOpen && (currentDistrict === "stash" || currentDistrict === "forge" || currentDistrict === "market")) {
        renderTown();
      }
      renderSheet();
    }

    // Wires drag-and-drop & right-click stack splitting onto any item row element
    function attachStackInteractions(el, containerKey, index) {
      const arr = getContainerArray(containerKey);
      const entry = arr[index];
      const id = getEntryId(entry);
      const qty = getEntryQty(entry);
      const stackable = isStackableMaterial(id);

      el.setAttribute("draggable", "true");
      if (stackable) {
        el.title = qty > 1
          ? "Drag onto another stack or Stash Tab • Right-click to split stack"
          : "Drag onto another stack or Stash Tab to move/merge";
      }

      el.addEventListener("dragstart", (e) => {
        dragStackInfo = { container: containerKey, index };
        e.dataTransfer.effectAllowed = "move";
        try { e.dataTransfer.setData("text/plain", `${containerKey}:${index}`); } catch (_) {}
        el.classList.add("opacity-50");
      });

      el.addEventListener("dragend", () => {
        dragStackInfo = null;
        el.classList.remove("opacity-50");
      });

      el.addEventListener("dragover", (e) => {
        if (!dragStackInfo) return;
        e.preventDefault();
        const srcArr = getContainerArray(dragStackInfo.container);
        const srcEntry = srcArr?.[dragStackInfo.index];
        const canMerge = srcEntry && getEntryId(srcEntry) === id && stackable && qty < MAX_MAT_STACK;
        el.classList.add("ring-2", canMerge ? "ring-emerald-400" : "ring-amber-400/70");
      });

      el.addEventListener("dragleave", () => {
        el.classList.remove("ring-2", "ring-emerald-400", "ring-amber-400/70");
      });

      el.addEventListener("drop", (e) => {
        e.preventDefault();
        el.classList.remove("ring-2", "ring-emerald-400", "ring-amber-400/70");
        if (!dragStackInfo) return;
        const { container, index: srcIdx } = dragStackInfo;
        dragStackInfo = null;
        handleStackDrop(container, srcIdx, containerKey, index);
      });

      el.addEventListener("contextmenu", (e) => {
        if (!stackable || qty <= 1) return;
        e.preventDefault();
        openSplitStackModal(containerKey, index);
      });
    }

    // Custom Split Stack Popup Modal (no browser prompt()!)
    function openSplitStackModal(containerKey, index) {
      const arr = getContainerArray(containerKey);
      const entry = arr[index];
      if (!entry) return;
      const id = getEntryId(entry);
      const qty = getEntryQty(entry);
      const maxSlots = getContainerMaxSlots(containerKey);
      if (qty <= 1) return;

      if (arr.length >= maxSlots) {
        toast(`No free slot in ${getContainerLabel(containerKey)} to hold a split stack!`, "bad");
        return;
      }

      let modal = document.getElementById("modal-split-stack");
      if (!modal) {
        modal = document.createElement("div");
        modal.id = "modal-split-stack";
        modal.className = "hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4";
        document.body.appendChild(modal);
      }

      const item = ITEMS_DB[id];
      const maxTake = qty - 1;
      const defVal = Math.max(1, Math.floor(qty / 2));

      modal.innerHTML = `
        <div class="leather-panel rounded-2xl max-w-sm w-full p-5 border-2 border-amber-600/60 shadow-2xl pop-in">
          <div class="flex items-center justify-between border-b border-amber-700/30 pb-2.5 mb-3">
            <h3 class="font-display text-base font-bold text-amber-300">Split Item Stack</h3>
            <button id="split-close-x" class="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs">✕</button>
          </div>
          <p class="text-xs text-stone-300 mb-3">
            How many <strong class="text-amber-200">${item.name}</strong> do you want to take from this stack of <strong>${qty}</strong>?
          </p>
          <div class="flex items-center gap-3 mb-3">
            <input id="split-range" type="range" min="1" max="${maxTake}" value="${defVal}" class="flex-1 accent-amber-500 cursor-pointer" />
            <input id="split-num" type="number" min="1" max="${maxTake}" value="${defVal}"
              class="w-16 px-2 py-1.5 rounded-lg bg-stone-950 border border-amber-700/50 text-center text-sm font-bold text-amber-200 focus:outline-none focus:border-amber-400" />
          </div>
          <div class="flex items-center justify-between gap-1.5 mb-4 text-[11px]">
            <button data-q="1" class="split-quick flex-1 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200">Take 1</button>
            <button data-q="${Math.max(1, Math.floor(qty / 2))}" class="split-quick flex-1 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200">Half (${Math.max(1, Math.floor(qty / 2))})</button>
            <button data-q="${maxTake}" class="split-quick flex-1 py-1 rounded bg-stone-800 hover:bg-stone-700 text-stone-200">Leave 1</button>
          </div>
          <div class="flex justify-end gap-2">
            <button id="split-cancel" class="px-3.5 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold">Cancel</button>
            <button id="split-confirm" class="px-4 py-2 rounded-lg btn-gold text-xs font-display uppercase">Take Stack</button>
          </div>
        </div>
      `;

      const close = () => modal.classList.add("hidden");
      const rangeEl = modal.querySelector("#split-range");
      const numEl = modal.querySelector("#split-num");

      const syncVal = (v) => {
        const clamped = Math.max(1, Math.min(maxTake, parseInt(v, 10) || 1));
        rangeEl.value = clamped;
        numEl.value = clamped;
      };
      rangeEl.oninput = () => syncVal(rangeEl.value);
      numEl.oninput = () => syncVal(numEl.value);
      modal.querySelectorAll(".split-quick").forEach(b => b.onclick = () => syncVal(b.dataset.q));
      modal.querySelector("#split-close-x").onclick = close;
      modal.querySelector("#split-cancel").onclick = close;
      modal.onclick = (e) => { if (e.target === modal) close(); };

      modal.querySelector("#split-confirm").onclick = () => {
        const take = Math.max(1, Math.min(maxTake, parseInt(numEl.value, 10) || 1));
        arr[index] = { id, qty: qty - take };
        arr.push({ id, qty: take });
        close();
        toast(`Split ${take}x ${item.name} into a new slot.`, "gold");
        if (buildingModalOpen && currentDistrict === "stash") renderTown();
        renderSheet();
      };

      modal.classList.remove("hidden");
      numEl.focus();
      numEl.select();
    }

    function addToPack(itemId, qty = 1) {
      if (!state || !ITEMS_DB[itemId]) return false;
      const added = addItemToContainer("backpack", itemId, qty, 12);
      if (added <= 0) {
        toast(`Backpack full (12/12)! Could not carry ${ITEMS_DB[itemId].name}.`, "bad");
        return false;
      }
      return true;
    }

    function discoverAdventure(advId, sourceNote = "") {
      if (!ADVENTURES[advId]) return;
      if (!state.discoveredQuests.includes(advId)) {
        state.discoveredQuests.push(advId);
        const title = ADVENTURES[advId].title;
        toast(`🗺️ New Adventure Discovered: ${title}!`, "gold");
        addLog(`Discovered adventure: ${title}${sourceNote ? ` (${sourceNote})` : ""}.`, "gold");
      }
    }

    /* ------------------------------------------------------------
       6. CHARACTER CREATION
       ------------------------------------------------------------ */
    function initCreation() {
      // Races
      const raceGrid = document.getElementById("race-grid");
      if (raceGrid) {
        raceGrid.innerHTML = "";
        RACES.forEach(r => {
          const on = creation.raceId === r.id;
          const b = document.createElement("button");
          b.type = "button";
          b.className = `text-left p-2.5 rounded-xl border transition ${on ? "bg-amber-900/40 border-amber-400 text-amber-100" : "bg-stone-950/70 border-stone-800 text-stone-300 hover:border-amber-700/60"}`;
          b.innerHTML = `<div class="font-display text-xs font-bold truncate ${on?"text-amber-300":"text-stone-200"}">${r.name}</div><div class="text-[10px] text-stone-400 mt-0.5 line-clamp-2">${r.desc}</div>`;
          b.onclick = () => {
            creation.raceId = r.id;
            initCreation();
          };
          raceGrid.appendChild(b);
        });
      }

      // Classes (Archetypes) — dynamically show the selected Race's version of each Class token!
      const archGrid = document.getElementById("archetype-grid");
      archGrid.innerHTML = "";
      const selRaceId = creation.raceId || "human";
      ARCHETYPES.forEach(a => {
        const on = creation.archId === a.id;
        const b = document.createElement("button");
        b.type = "button";
        const sig = a.signatureAbility;
        b.className = `text-left p-2 rounded-xl border transition flex items-center gap-2.5 ${on ? "bg-amber-900/40 border-amber-400 text-amber-100" : "bg-stone-950/70 border-stone-800 text-stone-300 hover:border-amber-700/60"}`;
        if (sig) b.title = `${sig.icon} ${sig.name}: ${sig.desc}`;
        b.innerHTML = `<img src="images/tokens/${selRaceId}_${a.id}.png" onerror="this.onerror=null;this.src='images/tokens/classes/${a.id}.png'" alt="${a.name}" class="w-10 h-10 rounded-full object-cover shrink-0 shadow" />
          <div class="min-w-0"><div class="font-display text-xs font-bold truncate ${on?"text-amber-300":"text-stone-200"}">${a.name}</div><div class="text-[10px] text-stone-400 mt-0.5 line-clamp-2">${a.desc}</div>${sig ? `<div class="text-[10px] text-amber-300/90 mt-0.5 truncate font-semibold">${sig.icon} ${sig.name} (1/Quest)</div>` : ""}</div>`;
        b.onclick = () => {
          creation.archId = a.id;
          const firstSub = SUBCLASSES.find(sc => sc.classId === a.id);
          creation.subclassId = firstSub ? firstSub.id : null;
          creation.skills = [...a.skills];
          creation.spells = [...a.spells];
          initCreation();
        };
        archGrid.appendChild(b);
      });

      // Subclasses for selected Class
      const subGrid = document.getElementById("subclass-grid");
      const availSubs = SUBCLASSES.filter(sc => sc.classId === creation.archId);
      if (availSubs.length && !availSubs.some(sc => sc.id === creation.subclassId)) {
        creation.subclassId = availSubs[0].id;
      }
      if (subGrid) {
        subGrid.innerHTML = "";
        if (!availSubs.length) {
          subGrid.innerHTML = `<div class="text-xs text-stone-500 italic">No subclasses registered for this class yet.</div>`;
        } else {
          availSubs.forEach(sc => {
            const on = creation.subclassId === sc.id;
            const b = document.createElement("button");
            b.type = "button";
            b.className = `text-left p-2.5 rounded-xl border transition ${on ? "bg-purple-950/50 border-purple-400 text-purple-100" : "bg-stone-950/70 border-stone-800 text-stone-300 hover:border-purple-700/60"}`;
            const abPreview = Array.isArray(sc.abilities) && sc.abilities[0] ? sc.abilities[0].desc : (sc.desc || "");
            b.innerHTML = `<div class="flex items-center justify-between gap-1"><span class="font-display text-xs font-bold ${on?"text-purple-300":"text-stone-200"}">${sc.name}</span>${sc.source ? `<span class="text-[9px] text-stone-500">${sc.source}</span>` : ""}</div><div class="text-[10px] text-stone-400 mt-0.5 line-clamp-2">${abPreview}</div>`;
            b.onmouseenter = (e) => { sfx("hover"); showSubclassTooltip(sc, e); };
            b.onmousemove = (e) => positionSubclassTooltip(e);
            b.onmouseleave = () => hideSubclassTooltip();
            b.onblur = () => hideSubclassTooltip();
            b.onclick = () => {
              creation.subclassId = sc.id;
              hideSubclassTooltip();
              initCreation();
            };
            subGrid.appendChild(b);
          });
        }
      }

      document.getElementById("points-left").textContent = creation.pts;
      const sb = document.getElementById("stats-builder");
      sb.innerHTML = "";
      const arch = ARCHETYPES.find(x => x.id === creation.archId) || ARCHETYPES[0];
      const race = RACES.find(x => x.id === creation.raceId) || null;
      const sub = SUBCLASSES.find(x => x.id === creation.subclassId) || null;
      const getStatExtra = (k) =>
        (k === "luck" ? (arch.bonusLuck || 0) : 0) +
        (race?.statBonuses?.[k] || 0);
      const subLv1Stats = sub?.abilities?.find(a => a.level === 1)?.statBonuses || {};

      [["might","Might","text-rose-300"],["agility","Agility","text-emerald-300"],["arcana","Arcana","text-sky-300"],["spirit","Spirit","text-amber-300"],["luck","Luck","text-purple-300"]].forEach(([k,lbl,col]) => {
        const extra = getStatExtra(k) + (subLv1Stats[k] || 0);
        const val = 5 + creation.bonus[k] + extra;
        const c = document.createElement("div");
        c.className = "p-2.5 rounded-xl bg-stone-900 border border-stone-800 flex flex-col items-center";
        c.innerHTML = `<span class="text-[11px] font-semibold ${col}">${lbl}${extra ? ` <span class="text-[9px] text-amber-300">(+${extra})</span>` : ""}</span>
          <div class="flex items-center gap-2.5 mt-1.5">
            <button type="button" class="w-7 h-7 rounded bg-stone-800 hover:bg-stone-700 font-bold disabled:opacity-30" ${creation.bonus[k]<=0?"disabled":""}>-</button>
            <span class="font-display text-lg font-bold text-amber-100 w-6 text-center">${val}</span>
            <button type="button" class="w-7 h-7 rounded bg-stone-800 hover:bg-amber-800 font-bold disabled:opacity-30" ${creation.pts<=0?"disabled":""}>+</button>
          </div>`;
        const btns = c.querySelectorAll("button");
        btns[0].onclick = () => { if (creation.bonus[k]>0) { creation.bonus[k]--; creation.pts++; initCreation(); } };
        btns[1].onclick = () => { if (creation.pts>0) { creation.bonus[k]++; creation.pts--; initCreation(); } };
        sb.appendChild(c);
      });

      // Skills
      document.getElementById("skill-counter").textContent = `${creation.skills.length}/2`;
      const skEl = document.getElementById("skills-selector");
      skEl.innerHTML = "";
      SKILLS_LIST.forEach(sk => {
        const on = creation.skills.includes(sk.name);
        const b = document.createElement("button");
        b.type = "button";
        b.className = `text-left p-2 rounded-xl border text-xs transition ${on ? "bg-amber-900/35 border-amber-400 text-amber-100" : "bg-stone-900 border-stone-800 text-stone-300"}`;
        b.innerHTML = `<div class="font-bold ${on?"text-amber-300":""}">${on?"✓ ":""}${sk.name}</div><div class="text-[10px] text-stone-400">${sk.desc}</div>`;
        b.onclick = () => {
          if (on) creation.skills = creation.skills.filter(x => x !== sk.name);
          else if (creation.skills.length < 2) creation.skills.push(sk.name);
          else toast("Deselect a skill first (max 2 starting skills).", "info");
          initCreation();
        };
        skEl.appendChild(b);
      });

      // Spells
      document.getElementById("spell-counter").textContent = `${creation.spells.length}/2`;
      const spEl = document.getElementById("spells-selector");
      spEl.innerHTML = "";
      SPELLS_LIST.filter(sp => !sp.scrollOnly).forEach(sp => {
        const on = creation.spells.includes(sp.name);
        const b = document.createElement("button");
        b.type = "button";
        b.className = `text-left p-2 rounded-xl border text-xs transition ${on ? "bg-sky-950/60 border-sky-400 text-sky-100" : "bg-stone-900 border-stone-800 text-stone-300"}`;
        b.innerHTML = `<div class="flex justify-between font-bold ${on?"text-sky-300":""}"><span>${on?"✓ ":""}${sp.name}</span><span class="text-[10px]">${sp.mp} MP</span></div><div class="text-[10px] text-stone-400">${sp.desc}</div>`;
        b.onclick = () => {
          if (on) creation.spells = creation.spells.filter(x => x !== sp.name);
          else if (creation.spells.length < 2) creation.spells.push(sp.name);
          else toast("Deselect a spell first (max 2 starting spells).", "info");
          initCreation();
        };
        spEl.appendChild(b);
      });

      // Preview
      const mock = {
        level: 1,
        subclassId: creation.subclassId,
        bonusHp: (arch.bonusHp || 0) + (race?.bonusHp || 0),
        bonusMp: (arch.bonusMp || 0) + (race?.bonusMp || 0),
        bonusAc: (race?.bonusAc || 0),
        bonusAtk: (race?.bonusAtk || 0),
        equipment: { ...arch.gear },
        shieldTurns: 0,
        evadeTurns: 0,
        baseStats: {
          might: 5 + creation.bonus.might + getStatExtra("might"),
          agility: 5 + creation.bonus.agility + getStatExtra("agility"),
          arcana: 5 + creation.bonus.arcana + getStatExtra("arcana"),
          spirit: 5 + creation.bonus.spirit + getStatExtra("spirit"),
          luck: 5 + creation.bonus.luck + getStatExtra("luck")
        }
      };
      const d = getDerived(mock);
      document.getElementById("preview-hp").textContent = d.maxHp;
      document.getElementById("preview-mp").textContent = d.maxMp;
      document.getElementById("preview-ac").textContent = d.ac;
      document.getElementById("preview-atk").textContent = `+${d.atk}`;
      const pht = document.getElementById("preview-hero-token");
      if (pht) {
        const rId = creation.raceId || "human";
        const cId = creation.archId || "warrior";
        setImgWithFallback(pht, `images/tokens/${rId}_${cId}.png`, `images/tokens/classes/${cId}.png`);
      }

      // Refresh inline validation checklist if currently shown
      const valBox = document.getElementById("creation-validation-msg");
      if (valBox && !valBox.classList.contains("hidden")) {
        const missing = getCreationMissingItems();
        if (missing.length === 0) valBox.classList.add("hidden");
        else renderCreationValidation(missing);
      }
    }

    function getCreationMissingItems() {
      const missing = [];
      const nameVal = document.getElementById("char-name").value.trim();
      if (!nameVal) missing.push("Enter a Hero Name.");
      if (creation.pts > 0) missing.push(`Spend all remaining Core Attribute points (${creation.pts} point${creation.pts === 1 ? "" : "s"} left).`);
      if (creation.skills.length < 2) missing.push(`Select ${2 - creation.skills.length} more Starting Skill${2 - creation.skills.length === 1 ? "" : "s"} (${creation.skills.length}/2 selected).`);
      if (creation.spells.length < 2) missing.push(`Select ${2 - creation.spells.length} more Starting Spell${2 - creation.spells.length === 1 ? "" : "s"} (${creation.spells.length}/2 selected).`);
      return missing;
    }

    function renderCreationValidation(missing) {
      const valBox = document.getElementById("creation-validation-msg");
      if (!valBox) return;
      valBox.innerHTML = `
        <div class="font-display font-bold text-rose-300">⚠️ Finish building your character before entering Oakhaven:</div>
        <ul class="list-disc pl-5 space-y-0.5 text-rose-100/95">
          ${missing.map(m => `<li>${m}</li>`).join("")}
        </ul>
      `;
      valBox.classList.remove("hidden");
    }

    function startNewHero() {
      const missing = getCreationMissingItems();
      if (missing.length > 0) {
        renderCreationValidation(missing);
        toast(missing[0], "bad");
        document.getElementById("creation-validation-msg").scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      document.getElementById("creation-validation-msg").classList.add("hidden");

      const arch = ARCHETYPES.find(x => x.id === creation.archId) || ARCHETYPES[0];
      const race = RACES.find(x => x.id === creation.raceId) || null;
      const sub = SUBCLASSES.find(x => x.id === creation.subclassId) || null;
      const getStatExtra = (k) =>
        (k === "luck" ? (arch.bonusLuck || 0) : 0) +
        (race?.statBonuses?.[k] || 0);

      const name = document.getElementById("char-name").value.trim();
      const startingQuests = ["malakor"];
      Object.values(ADVENTURES).forEach(adv => {
        if (adv.autoDiscover && !startingQuests.includes(adv.id)) startingQuests.push(adv.id);
      });

      state = {
        name,
        classId: arch.id,
        className: arch.name,
        raceId: race?.id || null,
        raceName: race?.name || "",
        subclassId: sub?.id || null,
        subclassName: sub?.name || "",
        level: 1, xp: 0, unspentStatPts: 0,
        baseStats: {
          might: 5 + creation.bonus.might + getStatExtra("might"),
          agility: 5 + creation.bonus.agility + getStatExtra("agility"),
          arcana: 5 + creation.bonus.arcana + getStatExtra("arcana"),
          spirit: 5 + creation.bonus.spirit + getStatExtra("spirit"),
          luck: 5 + creation.bonus.luck + getStatExtra("luck")
        },
        currentLuck: 5 + creation.bonus.luck + getStatExtra("luck"),
        bonusHp: (arch.bonusHp || 0) + (race?.bonusHp || 0),
        bonusMp: (arch.bonusMp || 0) + (race?.bonusMp || 0),
        bonusAc: (race?.bonusAc || 0),
        bonusAtk: (race?.bonusAtk || 0),
        hp: 0, mp: 0, gold: 35 + (race?.bonusGold || 0),
        skills: [...creation.skills],
        spells: [...creation.spells],
        preparedSpells: [...creation.spells].slice(0, MAX_PREPARED_SPELLS),
        guildStatUpgrades: { might: 0, agility: 0, arcana: 0, spirit: 0, luck: 0 },
        guildSkillsLearned: 0,
        guildSpellsLearned: 0,
        equipment: { ...arch.gear },
        backpack: ["health_potion", "health_potion", "torch"],
        stash: [], vaultGold: 0,
        blessing: null, innBuff: null, innRested: false, shieldTurns: 0, evadeTurns: 0,
        discoveredQuests: startingQuests,
        completedQuests: {},
        questJournal: [], // { advId: trophyName }
        kills: 0, deaths: 0,
        mode: "town",
        townPos: { x: 11, y: 11 },
        activeAdv: null,
        log: []
      };
      const d = getDerived(state);
      state.hp = d.maxHp; state.mp = d.maxMp; state.currentLuck = d.maxLuck;

      addLog(`${state.name} arrives in the frontier town of Oakhaven.`, "gold");
      saveToSlot(activeSaveSlot, true);
      showMainScreen();
      enterTown("square");
    }

    function showMainScreen() {
      document.getElementById("launch-screen")?.classList.add("hidden");
      document.getElementById("creation-screen").classList.add("hidden");
      document.getElementById("main-screen").classList.remove("hidden");
      document.getElementById("btn-save")?.classList.remove("hidden");
      document.getElementById("header-quests-badge")?.classList.remove("hidden");
      document.getElementById("btn-toggle-sheet")?.classList.remove("hidden");
    }

    /* ------------------------------------------------------------
       7. OAKHAVEN INTERACTIVE TOWN MAP & BUILDING POPUPS
       ------------------------------------------------------------ */
    function getMapTile(x, y) {
      if (x < 0 || y < 0 || x >= MAP_COLS || y >= MAP_ROWS) return ".";
      return TOWN_MAP_LAYOUT[y][x] || ".";
    }

    function isTileWalkable(x, y) {
      return getMapTile(x, y) !== ".";
    }

    function openBuildingModal(districtId) {
      const info = Object.values(TILE_TO_BUILDING).find(b => b.id === districtId) || TILE_TO_BUILDING.Q;
      currentDistrict = info.id;
      activeNpcDialogue = null;
      buildingModalOpen = true;
      stopAutoWalk();
      sfx("door");
      if (info.id === "tavern") bgm("tavern");

      document.getElementById("building-modal-icon").textContent = info.icon;
      document.getElementById("building-modal-title").textContent = info.name;

      // Update interior illustration backdrop & banner
      const bgImg = document.getElementById("building-bg-img");
      const bannerImg = document.getElementById("building-banner-img");
      if (bgImg && info.img) bgImg.src = info.img;
      if (bannerImg && info.img) bannerImg.src = info.img;

      renderActiveBuildingContent();

      // Smooth fade transition: fade out full-screen map, fade in location interior
      const townView = document.getElementById("town-hub-view");
      if (townView) {
        townView.classList.remove("opacity-100");
        townView.classList.add("opacity-0");
      }
      const modal = document.getElementById("modal-building");
      if (modal) {
        modal.classList.remove("opacity-0", "pointer-events-none");
        modal.classList.add("opacity-100", "pointer-events-auto");
      }
    }

    function closeBuildingModal() {
      const wasOpen = buildingModalOpen;
      buildingModalOpen = false;
      const modal = document.getElementById("modal-building");
      if (modal) {
        modal.classList.remove("opacity-100", "pointer-events-auto");
        modal.classList.add("opacity-0", "pointer-events-none");
      }
      const townView = document.getElementById("town-hub-view");
      if (townView) {
        townView.classList.remove("opacity-0");
        townView.classList.add("opacity-100");
      }
      if (wasOpen) {
        sfx("door");
        if (state && state.mode === "town") bgm("town");
      }
      updateMapHud();
    }

    function renderActiveBuildingContent() {
      const box = document.getElementById("town-district-content");
      if (!box) return;
      if (currentDistrict === "square") renderDistrictSquare(box);
      else if (currentDistrict === "tavern") renderDistrictTavern(box);
      else if (currentDistrict === "outskirts") renderDistrictOutskirts(box);
      else if (currentDistrict === "market") renderDistrictMarket(box);
      else if (currentDistrict === "guild") renderDistrictGuild(box);
      else if (currentDistrict === "forge") renderDistrictForge(box);
      else if (currentDistrict === "stash") renderDistrictStash(box);
      else if (currentDistrict === "temple") renderDistrictTemple(box);
    }

    function stopAutoWalk() {
      walkQueue = [];
      if (walkTimer) {
        clearTimeout(walkTimer);
        walkTimer = null;
      }
    }

    function movePlayer(dx, dy) {
      if (!state || state.mode !== "town" || buildingModalOpen) return false;
      if (!state.townPos) state.townPos = { x: 11, y: 11 };

      const nx = state.townPos.x + dx;
      const ny = state.townPos.y + dy;

      if (!isTileWalkable(nx, ny)) {
        // Invisible wall bump feedback
        bumpOffset = { x: dx * 0.25, y: dy * 0.25 };
        setTimeout(() => { bumpOffset = { x: 0, y: 0 }; }, 110);
        return false;
      }

      state.townPos = { x: nx, y: ny };
      sfx("step");
      updateMapHud();

      const tile = getMapTile(nx, ny);
      if (TILE_TO_BUILDING[tile]) {
        openBuildingModal(TILE_TO_BUILDING[tile].id);
      }
      return true;
    }

    function findPathBFS(sx, sy, tx, ty) {
      if (!isTileWalkable(tx, ty)) return [];
      if (sx === tx && sy === ty) return [];
      const visited = new Set([`${sx},${sy}`]);
      const queue = [[sx, sy, []]];
      const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
      while (queue.length > 0) {
        const [cx, cy, path] = queue.shift();
        for (const [dx, dy] of dirs) {
          const nx = cx + dx, ny = cy + dy;
          const key = `${nx},${ny}`;
          if (!isTileWalkable(nx, ny) || visited.has(key)) continue;
          // Avoid routing through other building triggers unless it is the clicked destination
          const tile = getMapTile(nx, ny);
          const isDest = (nx === tx && ny === ty);
          if (TILE_TO_BUILDING[tile] && !isDest) continue;
          const nextPath = [...path, { dx, dy }];
          if (isDest) return nextPath;
          visited.add(key);
          queue.push([nx, ny, nextPath]);
        }
      }
      return [];
    }

    function walkToTile(tx, ty) {
      if (!state || state.mode !== "town" || buildingModalOpen) return;
      stopAutoWalk();
      if (!state.townPos) state.townPos = { x: 11, y: 11 };

      // If clicking the exact building tile the hero is already standing on, re-open it
      if (tx === state.townPos.x && ty === state.townPos.y) {
        const t = getMapTile(tx, ty);
        if (TILE_TO_BUILDING[t]) openBuildingModal(TILE_TO_BUILDING[t].id);
        return;
      }

      const path = findPathBFS(state.townPos.x, state.townPos.y, tx, ty);
      if (!path.length) {
        // Visual bump if clicking an impassable area
        toast("That area is off the town path.", "info");
        return;
      }
      walkQueue = path;
      stepWalkQueue();
    }

    function stepWalkQueue() {
      if (!walkQueue.length || buildingModalOpen || !state || state.mode !== "town") {
        stopAutoWalk();
        return;
      }
      const next = walkQueue.shift();
      const moved = movePlayer(next.dx, next.dy);
      if (moved && walkQueue.length && !buildingModalOpen) {
        walkTimer = setTimeout(stepWalkQueue, 120);
      } else {
        stopAutoWalk();
      }
    }

    function updateMapHud() {
      if (!state) return;
      if (!state.townPos) state.townPos = { x: 11, y: 11 };
      const { x, y } = state.townPos;
      const tile = getMapTile(x, y);
      const bldg = TILE_TO_BUILDING[tile];
      document.getElementById("map-location-label").textContent = bldg ? `${bldg.icon} ${bldg.name}` : "Oakhaven Town Path";
      document.getElementById("map-coords-label").textContent = `(${x}, ${y})`;

      const reenterBtn = document.getElementById("btn-reenter-building");
      if (bldg) {
        reenterBtn.classList.remove("hidden");
        reenterBtn.textContent = `Enter ${bldg.name.split(" ")[0]}`;
      } else {
        reenterBtn.classList.add("hidden");
      }
    }

    function drawFallbackTownMap(ctx, w, h) {
      const cw = w / MAP_COLS;
      const ch = h / MAP_ROWS;

      // Lush grass backdrop
      ctx.fillStyle = "#3a4f2d";
      ctx.fillRect(0, 0, w, h);

      // Stylized river at bottom-left
      ctx.strokeStyle = "#3b768f";
      ctx.lineWidth = cw * 1.9;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.68);
      ctx.quadraticCurveTo(w * 0.25, h * 0.85, w * 0.55, h * 1.05);
      ctx.stroke();

      // Draw walkable dirt/cobblestone paths
      for (let y = 0; y < MAP_ROWS; y++) {
        for (let x = 0; x < MAP_COLS; x++) {
          const t = getMapTile(x, y);
          if (t !== ".") {
            ctx.fillStyle = t === "#" ? "#c8a978" : "#d9b77a";
            ctx.fillRect(x * cw, y * ch, cw + 0.5, ch + 0.5);
          }
        }
      }

      // Central Oak Tree
      ctx.fillStyle = "#2b5e27";
      ctx.beginPath();
      ctx.arc(11.5 * cw, 8.7 * ch, cw * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Stylized Building Footprints & Labels
      const landmarks = [
        { x: 3.5, y: 2.5, w: 5.2, h: 4.0, color: "#7a4a2b", label: "Rusty Flagon" },
        { x: 11.8, y: 2.8, w: 2.6, h: 2.4, color: "#6e7378", label: "Stash Vault" },
        { x: 18.2, y: 2.2, w: 3.2, h: 1.8, color: "#567044", label: "Outskirts" },
        { x: 15.8, y: 6.8, w: 3.5, h: 3.8, color: "#8c3b3b", label: "Market" },
        { x: 18.8, y: 11.8, w: 4.0, h: 3.6, color: "#c2ab7c", label: "Dawn Temple" },
        { x: 9.8, y: 12.2, w: 4.2, h: 3.2, color: "#5e4638", label: "Forge & Craft" },
        { x: 2.8, y: 9.2, w: 4.2, h: 3.4, color: "#6b4f3a", label: "Guildhall" },
        { x: 9.8, y: 9.6, w: 3.4, h: 1.1, color: "rgba(30,22,14,0.7)", label: "Town Square" }
      ];
      landmarks.forEach(l => {
        ctx.fillStyle = l.color;
        ctx.strokeStyle = "#1f160d";
        ctx.lineWidth = 2;
        ctx.fillRect(l.x * cw, l.y * ch, l.w * cw, l.h * ch);
        ctx.strokeRect(l.x * cw, l.y * ch, l.w * cw, l.h * ch);

        ctx.fillStyle = "#fff5dd";
        ctx.font = `bold ${Math.max(10, Math.round(cw * 0.42))}px Cinzel, serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(l.label, (l.x + l.w / 2) * cw, (l.y + l.h / 2) * ch);
      });
    }

    function renderTownMapCanvas(ts = 0) {
      const canvas = document.getElementById("town-map-canvas");
      if (!canvas || !state || state.mode !== "town") return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const targetW = Math.round(rect.width * dpr);
      const targetH = Math.round(rect.height * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const ctx = canvas.getContext("2d");
      ctx.save();
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;
      const cw = w / MAP_COLS;
      const ch = h / MAP_ROWS;

      // 1. Background Map Image or Procedural Fallback
      if (mapImageReady) {
        ctx.drawImage(mapImage, 0, 0, w, h);
      } else {
        drawFallbackTownMap(ctx, w, h);
      }

      // 2. Subtle Doorway Glow Indicators (and optional full grid overlay)
      const pulse = 0.55 + 0.35 * Math.sin(ts / 350);
      for (let y = 0; y < MAP_ROWS; y++) {
        for (let x = 0; x < MAP_COLS; x++) {
          const t = getMapTile(x, y);
          if (showGridOverlay) {
            if (t === ".") {
              ctx.fillStyle = "rgba(180, 30, 30, 0.28)";
              ctx.fillRect(x * cw, y * ch, cw, ch);
            } else {
              ctx.fillStyle = t === "#" ? "rgba(255, 240, 190, 0.16)" : "rgba(245, 190, 60, 0.42)";
              ctx.fillRect(x * cw, y * ch, cw, ch);
            }
            ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
            ctx.lineWidth = 0.75;
            ctx.strokeRect(x * cw, y * ch, cw, ch);
          }

          // Subtle golden threshold marker on building entrance tiles
          if (TILE_TO_BUILDING[t]) {
            ctx.fillStyle = `rgba(251, 191, 36, ${0.22 * pulse + 0.12})`;
            ctx.beginPath();
            ctx.arc((x + 0.5) * cw, (y + 0.5) * ch, Math.min(cw, ch) * 0.32, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = `rgba(254, 243, 199, ${0.55 * pulse + 0.25})`;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        }
      }

      // 3. Hero Round Character Token (Race Token + Class Crest Badge)
      const pos = state.townPos || { x: 11, y: 11 };
      const px = (pos.x + 0.5 + bumpOffset.x) * cw;
      const py = (pos.y + 0.5 + bumpOffset.y) * ch;
      const radius = Math.min(cw, ch) * 0.56;
      const bob = Math.sin(ts / 260) * 1.8;

      // Ground shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.48)";
      ctx.beginPath();
      ctx.ellipse(px, py + radius * 0.62, radius * 0.88, radius * 0.38, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing selection halo
      ctx.strokeStyle = `rgba(251, 191, 36, ${0.45 + 0.4 * pulse})`;
      ctx.lineWidth = 2.6;
      ctx.beginPath();
      ctx.arc(px, py + bob, radius * (1.08 + 0.08 * pulse), 0, Math.PI * 2);
      ctx.stroke();

      const tokPaths = getHeroTokenPaths(state);
      const heroIm = getTokenImg(tokPaths.primarySrc, tokPaths.fallbackSrc);

      if (heroIm && heroIm._ready) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py + bob, radius, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(heroIm, px - radius, py + bob - radius, radius * 2, radius * 2);
        ctx.restore();
      } else {
        // Fallback while loading
        const grad = ctx.createRadialGradient(px - radius * 0.3, py + bob - radius * 0.3, 1, px, py + bob, radius);
        grad.addColorStop(0, "#fef08a");
        grad.addColorStop(0.55, "#d97706");
        grad.addColorStop(1, "#7f1d1d");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py + bob, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    function startMapLoop() {
      if (mapAnimFrame) cancelAnimationFrame(mapAnimFrame);
      const tick = (ts) => {
        if (state && state.mode === "town") {
          renderTownMapCanvas(ts);
          mapAnimFrame = requestAnimationFrame(tick);
        } else {
          mapAnimFrame = null;
        }
      };
      mapAnimFrame = requestAnimationFrame(tick);
    }

    function enterTown(district = "square", openModal = false) {
      bgm("town");
      state.mode = "town";
      state.activeAdv = null;
      activeCombat = null;
      currentDistrict = district;
      stopAutoWalk();

      if (BUILDING_SPAWN_POS[district]) {
        state.townPos = { ...BUILDING_SPAWN_POS[district] };
      } else if (!state.townPos) {
        state.townPos = { x: 11, y: 11 };
      }

      document.getElementById("town-hub-view").classList.remove("hidden");
      document.getElementById("adventure-view").classList.add("hidden");

      if (openModal) openBuildingModal(district);
      else closeBuildingModal();

      renderTown();
      renderSheet();
      startMapLoop();
    }

    function renderTown() {
      const blessBadge = document.getElementById("town-blessing-badge");
      const buffParts = [];
      if (state.blessing) {
        buffParts.push(state.blessing === "ac" ? "☀️ Dawn Blessing: +1 AC" : "🍀 Dawn Blessing: +1 Luck");
      }
      if (state.innBuff) {
        const lbl = state.innBuff.charAt(0).toUpperCase() + state.innBuff.slice(1);
        buffParts.push(`🛏️ Well-Rested: +1 ${lbl}`);
      }
      if (buffParts.length) {
        blessBadge.classList.remove("hidden");
        blessBadge.textContent = buffParts.join("  •  ");
      } else {
        blessBadge.classList.add("hidden");
      }

      updateMapHud();
      if (buildingModalOpen) {
        renderActiveBuildingContent();
      }
    }

    function renderDistrictSquare(box) {
      const activeLeads = state.discoveredQuests
          .map(id => ADVENTURES[id])
          .filter(adv => adv && !state.completedQuests[adv.id] && (!adv.reqQuest || !!state.completedQuests[adv.reqQuest]));
      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 class="font-display text-xl font-bold text-amber-300">Town Square &amp; Quest Board</h3>
            <p class="text-xs text-stone-400">Talk to patrons in the Rusty Flagon, Market, and Temple—or scout the Outskirts—to uncover rumors of new adventures.</p>
          </div>
          <span class="px-3 py-1 rounded-full bg-stone-950 border border-amber-700/40 text-xs text-amber-200 font-semibold">
            Active Leads: ${activeLeads.length}
          </span>
        </div>
        <div id="quest-board-grid" class="grid grid-cols-1 md:grid-cols-2 gap-3"></div>
      `;
      const grid = box.querySelector("#quest-board-grid");
      if (activeLeads.length === 0) {
        grid.innerHTML = `
          <div class="col-span-full p-5 rounded-xl bg-stone-950/90 border border-amber-700/35 text-center space-y-2">
            <div class="font-display text-sm font-bold text-amber-200">No Active Leads on the Board</div>
            <p class="text-xs text-stone-400">Visit patrons at the <strong>Rusty Flagon Tavern</strong>, explore the <strong>Market</strong> and <strong>Temple</strong>, or scout the <strong>Outskirts</strong> to uncover new rumors. View your completed deeds anytime in <strong>☰ Menu → 📓 Hero Journal</strong>.</p>
          </div>
        `;
        return;
      }
      activeLeads.forEach(adv => {
        const cleanSub = cleanQuestSubtitle(adv.subtitle);
        const card = document.createElement("div");
        card.className = "p-4 rounded-xl bg-stone-950/90 border border-amber-700/35 flex flex-col justify-between gap-3";
        card.innerHTML = `
          <div>
            <div class="flex items-start justify-between gap-2">
              <h4 class="font-display text-base font-bold text-amber-200 leading-snug">${adv.title}</h4>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold shrink-0 bg-amber-950 text-amber-300 border border-amber-600/40">
                Active Lead
              </span>
            </div>
            <div class="text-[11px] text-amber-400/80 mt-0.5">${cleanSub ? `${cleanSub} &bull; ` : ""}${adv.difficulty} (Lv. ${adv.recommendedLevel}+)</div>
            <p class="text-xs text-stone-300 mt-2 leading-relaxed">${adv.summary}</p>
          </div>
          <button class="w-full py-2 rounded-lg btn-gold font-display text-xs uppercase tracking-wider">
            Embark on Adventure →
          </button>
        `;
        card.querySelector("button").onclick = () => startAdventure(adv.id);
        grid.appendChild(card);
      });
    }
	
	function rollTavernPatrons() {
      if (!state) return;

      // Only include quest-givers whose Part 1 prerequisite (if any) is complete
      const eligible = TAVERN_NPCS.filter(npc =>
        npc.id !== "bram" &&
        (!npc.reqQuest || !!state.completedQuests[npc.reqQuest])
      );

      // Prioritize NPCs offering quests you haven't discovered yet
      const freshLeads = eligible.filter(npc =>
        npc.discoverQuest && !state.discoveredQuests.includes(npc.discoverQuest)
      );
      const otherPatrons = eligible.filter(npc => !freshLeads.includes(npc));

      const shuffle = (arr) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      };

      const pool = [...shuffle(freshLeads), ...shuffle(otherPatrons)];
      const count = Math.min(pool.length, 1 + Math.floor(Math.random() * 2)); // 1 to 2 patrons
      state.tavernPatrons = pool.slice(0, count).map(npc => npc.id);
    }

    function renderDistrictTavern(box) {
      const alreadyRested = !!(state.innRested || state.innBuff);
      const buffLbl = state.innBuff ? state.innBuff.charAt(0).toUpperCase() + state.innBuff.slice(1) : "";
      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h3 class="font-display text-xl font-bold text-amber-300">The Rusty Flagon Tavern</h3>
            <p class="text-xs text-stone-400">Hearthfire, warm beds, and frontier rumors from seasoned travelers.</p>
          </div>
          <button id="btn-inn-rest" ${alreadyRested ? "disabled" : ""} class="px-4 py-2 rounded-xl text-xs font-display uppercase shadow ${alreadyRested ? "bg-stone-800/80 border border-stone-700 text-stone-400 cursor-not-allowed" : "btn-gold"}">
            ${alreadyRested ? `✓ Rested${buffLbl ? ` (+1 ${buffLbl})` : ""} • Quest to Rest Again` : "🛏️ Rest at Inn (10 GP)"}
          </button>
        </div>
        <div id="tavern-dialogue-box" class="${activeNpcDialogue ? "" : "hidden"} mb-4 p-4 rounded-xl bg-stone-950 border border-amber-500/50 space-y-2 pop-in"></div>
        <div id="tavern-npc-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div>
      `;

      box.querySelector("#btn-inn-rest").onclick = () => {
        if (state.innRested || state.innBuff) {
          return toast("You've already rested! Go on a quest before resting at the inn again.", "info");
        }
        if (getTownGold() < 10) return toast("Need 10 GP for a room at the Rusty Flagon.", "bad");
        spendGoldWithVault(10);
        const statPool = [
          ["might", "Might"],
          ["agility", "Agility"],
          ["arcana", "Arcana"],
          ["spirit", "Spirit"],
          ["luck", "Luck"]
        ];
        const [statKey, statLabel] = statPool[Math.floor(Math.random() * statPool.length)];
        state.innRested = true;
        state.innBuff = statKey;
        const d = getDerived(state);
        state.hp = d.maxHp; state.mp = d.maxMp; state.currentLuck = d.maxLuck;
        rollTavernPatrons(); // Fresh travelers arrive at the Rusty Flagon overnight!
        sfx("heal");
        toast(`Rested! Full HP/MP/Luck & Well-Rested Buff: +1 ${statLabel} for your next adventure!`, "good");
        addLog(`Rested at the Rusty Flagon (-10 GP) — Well-Rested: +1 ${statLabel} for next adventure.`, "good");
        renderTown();
        renderSheet();
      };

      const dBox = box.querySelector("#tavern-dialogue-box");
      if (activeNpcDialogue) {
        const npc = TAVERN_NPCS.find(n => n.id === activeNpcDialogue.npcId);
        if (npc) {
          dBox.innerHTML = `
            <div class="flex items-center justify-between">
              <div class="font-display text-sm font-bold text-amber-300">${npc.name} <span class="text-xs text-stone-400 font-normal">— ${npc.role}</span></div>
              <button id="btn-close-npc" class="text-xs text-stone-400 hover:text-stone-200">Close ✕</button>
            </div>
            <p class="font-story text-base text-stone-200 leading-relaxed">${activeNpcDialogue.text}</p>
            <div id="npc-options" class="flex flex-wrap gap-2 pt-1"></div>
          `;
          dBox.querySelector("#btn-close-npc").onclick = () => {
            activeNpcDialogue = null;
            renderDistrictTavern(box);
          };
          const optWrap = dBox.querySelector("#npc-options");
          npc.options.forEach(opt => {
            const b = document.createElement("button");
            b.className = "px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-amber-950/70 border border-amber-700/40 text-xs text-amber-200 transition";
            b.textContent = opt.label;
            b.onclick = () => {
              if (opt.unlock) discoverAdventure(opt.unlock, npc.name);
              activeNpcDialogue = { npcId: npc.id, text: opt.reply };
              renderDistrictTavern(box);
            };
            optWrap.appendChild(b);
          });
        }
      }

      if (!Array.isArray(state.tavernPatrons) || state.tavernPatrons.length === 0) {
        rollTavernPatrons();
      } else if (state.tavernPatrons.length > 2) {
        state.tavernPatrons = state.tavernPatrons.slice(0, 2);
      }

      const visibleNpcs = TAVERN_NPCS.filter(npc =>
        npc.id === "bram" ||
        (state.tavernPatrons.includes(npc.id) &&
          (!npc.reqQuest || !!state.completedQuests[npc.reqQuest]))
      );

      const grid = box.querySelector("#tavern-npc-grid");
      visibleNpcs.forEach(npc => {
        const hasNewLead = npc.discoverQuest && !state.discoveredQuests.includes(npc.discoverQuest);
        const c = document.createElement("button");
        c.type = "button";
        c.className = "text-left p-3.5 rounded-xl bg-stone-950/85 hover:bg-stone-900 border border-stone-800 hover:border-amber-600/50 transition";
        c.innerHTML = `
          <div class="flex items-center justify-between gap-2">
            <span class="font-display text-sm font-bold text-amber-200">${npc.name}</span>
            ${hasNewLead ? `<span class="px-2 py-0.5 rounded-full bg-amber-950 border border-amber-500/60 text-[10px] text-amber-300 font-bold">❗ New Quest</span>` : ""}
          </div>
          <div class="text-[11px] text-stone-400 mt-0.5">${npc.role}</div>
        `;
        c.onclick = () => {
          activeNpcDialogue = { npcId: npc.id, text: npc.greeting };
          renderDistrictTavern(box);
        };
        grid.appendChild(c);
      });
    }

    function renderDistrictOutskirts(box) {
      const zones = [
        { id:"thornwood", name:"Thornwood Forest", desc:"Misty pines rich in Glowcap Spores & hidden barrow trails.", quest:"thornwood", mat:"glowcap_spores" },
        { id:"cliffs", name:"Coastal Cliffs", desc:"Wave-battered sea arches hiding Sea Salt Crystals & smuggler coves.", quest:"saltfang", mat:"sea_salt" },
        { id:"ruins", name:"Old Abbey Ruins", desc:"Overgrown stonework hiding Bone Dust & quarantined catacombs.", quest:"st_jude", mat:"bone_dust" }
      ];
      box.innerHTML = `
        <h3 class="font-display text-xl font-bold text-amber-300 mb-1">The Outskirts — Explore the Wilds</h3>
        <p class="text-xs text-stone-400 mb-4">Scout the frontier to forage crafting materials, earn stray coins, and stumble directly upon hidden adventure entrances!</p>
        <div id="explore-result" class="hidden mb-4 p-3.5 rounded-xl bg-stone-950 border border-amber-600/50 text-sm text-amber-100 pop-in"></div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3" id="outskirts-grid"></div>
      `;
      const grid = document.getElementById("outskirts-grid");
      zones.forEach(z => {
        const discovered = state.discoveredQuests.includes(z.quest);
        const c = document.createElement("div");
        c.className = "p-4 rounded-xl bg-stone-950/80 border border-stone-800 flex flex-col justify-between gap-3";
        c.innerHTML = `
          <div>
            <h4 class="font-display text-sm font-bold text-amber-200">${z.name}</h4>
            <p class="text-xs text-stone-400 mt-1">${z.desc}</p>
            <div class="mt-2 text-[11px] ${discovered ? "text-emerald-400" : "text-amber-400"}">
              ${discovered ? "✓ Hidden Dungeon Located" : "❓ Rumored Hidden Entrance"}
            </div>
          </div>
          <button class="w-full py-2 rounded-lg btn-gold text-xs font-display uppercase">Scout Area</button>
        `;
        c.querySelector("button").onclick = () => scoutWilderness(z);
        grid.appendChild(c);
      });
    }

    function scoutWilderness(zone) {
      const resEl = document.getElementById("explore-result");
      resEl.classList.remove("hidden");
      const r = roll(6);

      // 50% chance to stumble on undiscovered quest immediately
      if (!state.discoveredQuests.includes(zone.quest) && r >= 3) {
        discoverAdventure(zone.quest, `Explored ${zone.name}`);
        resEl.innerHTML = `🗺️ <strong>Hidden Entrance Found!</strong> While scouting ${zone.name}, you stumble directly upon the entrance to <strong>${ADVENTURES[zone.quest].title}</strong>! It has been added to your Quest Board.`;
        renderDistrictOutskirts(document.getElementById("town-district-content"));
        document.getElementById("explore-result").innerHTML = resEl.innerHTML;
        document.getElementById("explore-result").classList.remove("hidden");
        return;
      }

      if (r <= 2) {
        const ok = addToPack(zone.mat);
        const msg = ok ? `🌿 Foraged <strong>${ITEMS_DB[zone.mat].name}</strong> in ${zone.name}!` : `🌿 Found ${ITEMS_DB[zone.mat].name}, but your backpack is full.`;
        resEl.innerHTML = msg;
        addLog(`Scouted ${zone.name} and found ${ITEMS_DB[zone.mat].name}.`, "good");
      } else if (r <= 4) {
        const gp = 6 + roll(10);
        state.gold += gp;
        gainXp(10);
        resEl.innerHTML = `🪙 You drove off a lone bandit scout in ${zone.name} and claimed <strong>${gp} GP</strong> and <strong>10 XP</strong>!`;
        addLog(`Skirmished in ${zone.name}: +${gp} GP, +10 XP.`, "gold");
      } else {
        const dmg = 2 + roll(2);
        state.hp = Math.max(1, state.hp - dmg);
        const gp = 8;
        state.gold += gp;
        resEl.innerHTML = `⚠️ A thicket beast ambushed you in ${zone.name} (-${dmg} HP), though you escaped with ${gp} GP from an old campsite.`;
        addLog(`Wilderness ambush (-${dmg} HP, +${gp} GP).`, "bad");
      }
      renderSheet();
    }

    function renderDistrictMarket(box) {
      const shop = SHOPS[currentShop];
      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h3 class="font-display text-xl font-bold text-amber-300">Market District</h3>
          <div class="flex gap-1.5">
            ${["armory","apothecary","curios"].map(k => `<button data-shop="${k}" class="shop-tab px-3 py-1.5 rounded-lg text-xs font-semibold border ${currentShop===k?"bg-amber-900/50 border-amber-400 text-amber-200":"bg-stone-950 border-stone-800 text-stone-400"}">${SHOPS[k].name.split(" ")[0]}</button>`).join("")}
          </div>
        </div>
        <div class="p-3 rounded-xl bg-stone-950/70 border border-amber-700/30 mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div class="font-display text-sm font-bold text-amber-200">${shop.name} — <span class="text-stone-400 font-normal">${shop.npc}</span></div>
            <div class="text-xs text-stone-300 italic">${shop.quote}</div>
          </div>
          ${currentShop==="armory" && !state.discoveredQuests.includes("karak_zul") ? `<button id="btn-shop-rumor" class="px-3 py-1.5 rounded-lg btn-gold text-xs">Ask about Dwarven Ore</button>` : ""}
          ${currentShop==="curios" && !state.discoveredQuests.includes("crimson_spire") ? `<button id="btn-shop-rumor" class="px-3 py-1.5 rounded-lg btn-gold text-xs">Ask about Arcane Towers</button>` : ""}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><h4 class="font-display text-xs uppercase text-emerald-400 mb-2">Buy Gear &amp; Supplies</h4><div id="mkt-buy" class="space-y-1.5 max-h-72 overflow-y-auto pr-1"></div></div>
          <div><h4 class="font-display text-xs uppercase text-amber-400 mb-2">Sell From Backpack</h4><div id="mkt-sell" class="space-y-1.5 max-h-72 overflow-y-auto pr-1"></div></div>
        </div>
      `;

      box.querySelectorAll(".shop-tab").forEach(b => b.onclick = () => { currentShop = b.dataset.shop; renderDistrictMarket(box); });
      const rumorBtn = box.querySelector("#btn-shop-rumor");
      if (rumorBtn) {
        rumorBtn.onclick = () => {
          if (currentShop === "armory") discoverAdventure("karak_zul", "Master Smith Borin");
          if (currentShop === "curios") discoverAdventure("crimson_spire", "Arcanist Starweaver");
          renderDistrictMarket(box);
        };
      }

      const buyEl = box.querySelector("#mkt-buy");
      shop.stock.forEach(entry => {
        const it = ITEMS_DB[entry.id];
        const ok = getTownGold() >= entry.price && state.backpack.length < 12;
        const r = document.createElement("div");
        r.className = "flex items-center justify-between gap-2 p-2 rounded-lg bg-stone-950 border border-stone-800 text-xs";
        r.innerHTML = `<div><div class="font-bold text-amber-200">${it.name}</div><div class="text-[10px] text-stone-400">${it.desc}</div></div>
          <button class="px-2.5 py-1 rounded-lg font-bold shrink-0 ${ok?"btn-gold":"bg-stone-800 text-stone-500"}" ${ok?"":"disabled"}>${entry.price} GP</button>`;
        r.querySelector("button").onclick = () => {
          if (getTownGold() < entry.price) return toast("Not enough gold!", "bad");
          if (!addToPack(entry.id)) return;
          spendGoldWithVault(entry.price);
          sfx("coin");
          toast(`Bought ${it.name}!`, "gold");
          renderDistrictMarket(box); renderSheet();
        };
        buyEl.appendChild(r);
      });

      const sellEl = box.querySelector("#mkt-sell");
      if (state.backpack.length === 0) {
        sellEl.innerHTML = `<div class="text-xs text-stone-500 italic p-3 text-center">Backpack empty.</div>`;
      } else {
        state.backpack.forEach((entry, i) => {
          const id = getEntryId(entry);
          const qty = getEntryQty(entry);
          const it = ITEMS_DB[id];
          if (!it) return;
          const r = document.createElement("div");
          r.className = "flex items-center justify-between gap-2 p-2 rounded-lg bg-stone-950 border border-stone-800 text-xs";
          r.innerHTML = `<div><div class="font-bold text-stone-200">${it.name}${qty > 1 ? ` <span class="text-amber-300">x${qty}</span>` : ""}</div><div class="text-[10px] text-stone-400">${it.desc}</div></div>
            <div class="flex items-center gap-1 shrink-0">
              ${qty > 1 ? `<button data-sell="1" class="px-2 py-1 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-emerald-100 font-bold">Sell 1 (+${it.value}g)</button>` : ""}
              <button data-sell="all" class="px-2.5 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-bold">+${it.value * qty} GP</button>
            </div>`;
          r.querySelectorAll("button").forEach(b => b.onclick = () => {
            const sellQty = b.dataset.sell === "1" ? 1 : qty;
            if (sellQty >= qty) state.backpack.splice(i, 1);
            else state.backpack[i] = { id, qty: qty - sellQty };
            state.gold += it.value * sellQty;
            sfx("coin");
            toast(`Sold ${sellQty}x ${it.name} for ${it.value * sellQty} GP!`, "good");
            if (typeof renderDungeonMerchant === "function" && !document.getElementById("modal-dungeon-merchant").classList.contains("hidden")) {
              renderDungeonMerchant();
            } else {
              renderDistrictMarket(box);
            }
            renderSheet();
          });
          sellEl.appendChild(r);
        });
      }
    }

    function renderDistrictGuild(box) {
      ensureHeroProgressionState(state);
      const skillsRem = Math.max(0, GUILD_MAX_SKILLS - state.guildSkillsLearned);
      const spellsRem = Math.max(0, GUILD_MAX_SPELLS - state.guildSpellsLearned);

      box.innerHTML = `
        <h3 class="font-display text-xl font-bold text-amber-300 mb-1">The Adventurer's Guildhall</h3>
        <p class="text-xs text-stone-400 mb-4">Spend Gold to train Attributes (max 3 upgrades each: 500 / 1000 / 1500 GP), master up to ${GUILD_MAX_SKILLS} new Skills (${GUILD_SKILL_COST} GP), or study up to ${GUILD_MAX_SPELLS} new Spells (${GUILD_SPELL_COST} GP).</p>
        <div class="space-y-5">
          <div>
            <h4 class="font-display text-xs uppercase text-amber-400 mb-2">Attribute Training (Max 3 Upgrades per Stat)</h4>
            <div id="guild-stats" class="grid grid-cols-1 sm:grid-cols-5 gap-2"></div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 class="font-display text-xs uppercase text-amber-400 mb-1">Learn New Skills (${GUILD_SKILL_COST} GP &bull; ${skillsRem}/${GUILD_MAX_SKILLS} Left)</h4>
              <div id="guild-skills" class="space-y-1.5"></div>
            </div>
            <div>
              <h4 class="font-display text-xs uppercase text-sky-400 mb-1">Learn New Spells (${GUILD_SPELL_COST} GP &bull; ${spellsRem}/${GUILD_MAX_SPELLS} Left)</h4>
              <p class="text-[10px] text-stone-400 mb-2">Additional spells can be learned from Rare Spell Scrolls found in dungeon loot.</p>
              <div id="guild-spells" class="space-y-1.5"></div>
            </div>
          </div>
        </div>
      `;

      const gs = box.querySelector("#guild-stats");
      [["might","Might"],["agility","Agility"],["arcana","Arcana"],["spirit","Spirit"],["luck","Luck"]].forEach(([k,lbl]) => {
        const val = state.baseStats[k];
        const used = state.guildStatUpgrades[k] || 0;
        const maxUp = GUILD_STAT_UPGRADE_COSTS.length;
        const maxed = used >= maxUp;
        const cost = maxed ? null : GUILD_STAT_UPGRADE_COSTS[used];
        const ok = !maxed && getTownGold() >= cost;
        const c = document.createElement("div");
        c.className = "p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-center";
        c.innerHTML = `<div class="text-xs font-bold text-amber-200">${lbl}: ${val}</div>
          <div class="text-[10px] ${maxed ? "text-emerald-400" : "text-stone-400"} mt-0.5">Trained: ${used}/${maxUp}</div>
          <button class="mt-2 w-full py-1 rounded-lg text-[11px] font-bold ${ok?"btn-gold":"bg-stone-800 text-stone-500"}" ${ok?"":"disabled"}>${maxed ? "Maxed (3/3)" : `+1 (${cost} GP)`}</button>`;
        c.querySelector("button").onclick = () => {
          if (maxed || getTownGold() < cost) return;
          spendGoldWithVault(cost);
          state.baseStats[k]++;
          state.guildStatUpgrades[k] = used + 1;
          if (k === "luck") state.currentLuck++;
          const d = getDerived(state);
          state.hp = Math.min(d.maxHp, state.hp + 2);
          sfx("coin");
          toast(`Trained +1 ${lbl} (${used + 1}/${maxUp})!`, "good");
          renderDistrictGuild(box); renderSheet();
        };
        gs.appendChild(c);
      });

      const gsk = box.querySelector("#guild-skills");
      const unlearnedSkills = SKILLS_LIST.filter(s => !state.skills.includes(s.name));
      if (skillsRem <= 0) {
        gsk.innerHTML = `<div class="p-2.5 rounded-lg bg-stone-950 border border-amber-700/40 text-xs text-amber-300/90 italic">Guild skill training limit reached (${GUILD_MAX_SKILLS}/${GUILD_MAX_SKILLS}).</div>`;
      } else if (!unlearnedSkills.length) {
        gsk.innerHTML = `<div class="text-xs text-emerald-400 italic">All skills mastered!</div>`;
      } else {
        unlearnedSkills.forEach(sk => {
          const ok = getTownGold() >= GUILD_SKILL_COST && skillsRem > 0;
          const r = document.createElement("div");
          r.className = "flex items-center justify-between gap-2 p-2 rounded-lg bg-stone-950 border border-stone-800 text-xs";
          r.innerHTML = `<div><div class="font-bold text-amber-200">${sk.name}</div><div class="text-[10px] text-stone-400">${sk.desc}</div></div>
            <button class="px-2.5 py-1 rounded font-bold shrink-0 ${ok?"btn-gold":"bg-stone-800 text-stone-500"}" ${ok?"":"disabled"}>${GUILD_SKILL_COST} GP</button>`;
          r.querySelector("button").onclick = () => {
            if (state.guildSkillsLearned >= GUILD_MAX_SKILLS || getTownGold() < GUILD_SKILL_COST) return;
            spendGoldWithVault(GUILD_SKILL_COST);
            state.skills.push(sk.name);
            state.guildSkillsLearned++;
            sfx("scroll");
            toast(`Mastered Skill: ${sk.name} (${state.guildSkillsLearned}/${GUILD_MAX_SKILLS})!`, "good");
            renderDistrictGuild(box); renderSheet();
          };
          gsk.appendChild(r);
        });
      }

      const gsp = box.querySelector("#guild-spells");
      const unlearnedSpells = SPELLS_LIST.filter(s => !state.spells.includes(s.name) && !s.scrollOnly);
      if (spellsRem <= 0) {
        gsp.innerHTML = `<div class="p-2.5 rounded-lg bg-stone-950 border border-sky-700/40 text-xs text-sky-300/90 italic">Guild spell training limit reached (${GUILD_MAX_SPELLS}/${GUILD_MAX_SPELLS}). Find Rare Spell Scrolls in dungeon loot to learn more spells!</div>`;
      } else if (!unlearnedSpells.length) {
        gsp.innerHTML = `<div class="text-xs text-sky-400 italic">All Guildhall spells learned!</div>`;
      } else {
        unlearnedSpells.forEach(sp => {
          const ok = getTownGold() >= GUILD_SPELL_COST && spellsRem > 0;
          const r = document.createElement("div");
          r.className = "flex items-center justify-between gap-2 p-2 rounded-lg bg-stone-950 border border-stone-800 text-xs";
          r.innerHTML = `<div><div class="font-bold text-sky-300">${sp.name} (${sp.mp} MP)</div><div class="text-[10px] text-stone-400">${sp.desc}</div></div>
            <button class="px-2.5 py-1 rounded font-bold shrink-0 ${ok?"btn-gold":"bg-stone-800 text-stone-500"}" ${ok?"":"disabled"}>${GUILD_SPELL_COST} GP</button>`;
          r.querySelector("button").onclick = () => {
            if (state.guildSpellsLearned >= GUILD_MAX_SPELLS || getTownGold() < GUILD_SPELL_COST) return;
            spendGoldWithVault(GUILD_SPELL_COST);
            state.spells.push(sp.name);
            state.guildSpellsLearned++;
            if (state.preparedSpells.length < MAX_PREPARED_SPELLS && !state.preparedSpells.includes(sp.name)) {
              state.preparedSpells.push(sp.name);
            }
            sfx("scroll");
            toast(`Learned Spell: ${sp.name} (${state.guildSpellsLearned}/${GUILD_MAX_SPELLS})!`, "info");
            renderDistrictGuild(box); renderSheet();
          };
          gsp.appendChild(r);
        });
      }
    }

    function countMaterial(matId) {
      return countMaterialSplit(matId).total;
    }

    function consumeMaterial(matId, qty) {
      let left = qty;
      const takeFrom = (arr) => {
        for (let i = arr.length - 1; i >= 0 && left > 0; i--) {
          if (getEntryId(arr[i]) !== matId) continue;
          const cur = getEntryQty(arr[i]);
          if (cur <= left) {
            left -= cur;
            arr.splice(i, 1);
          } else {
            arr[i] = { id: matId, qty: cur - left };
            left = 0;
          }
        }
      };
      takeFrom(state.backpack);
      ensureStashTabs().forEach(tab => takeFrom(tab));
    }

    // Counts materials across Backpack + ALL unlocked Stash Tabs
    function countMaterialSplit(matId) {
      const sum = (arr) => (arr || []).reduce((acc, e) => acc + (getEntryId(e) === matId ? getEntryQty(e) : 0), 0);
      const pack = sum(state.backpack);
      const vault = ensureStashTabs().reduce((acc, tab) => acc + sum(tab), 0);
      return { pack, vault, total: pack + vault };
    }

    // Spends carried Gold first, then draws any remainder from your Personal Gold Vault
    function getTownGold() {
      return (state?.gold || 0) + (state?.vaultGold || 0);
    }

    function spendGoldWithVault(amount) {
      const fromCarry = Math.min(state.gold, amount);
      state.gold -= fromCarry;
      const fromVault = amount - fromCarry;
      if (fromVault > 0) {
        state.vaultGold = Math.max(0, (state.vaultGold || 0) - fromVault);
      }
      return { fromCarry, fromVault };
    }

    function renderDistrictForge(box) {
      if (!Array.isArray(state.unlockedRecipes)) state.unlockedRecipes = [];
      const tabs = ensureStashTabs();
      const totalGold = (state.gold || 0) + (state.vaultGold || 0);
      const totalSchemRecipes = CRAFT_RECIPES.filter(r => r.requiresSchematic).length;

      const unlockedList = CRAFT_RECIPES.filter(
        rec => !rec.requiresSchematic || state.unlockedRecipes.includes(rec.result)
      );

      const FORGE_CATEGORIES = [
        { id: "all",        label: "All",               match: () => true },
        { id: "weapon",     label: "⚔️ Weapons",        match: t => t === "weapon" },
        { id: "armor",      label: "🛡️ Armor",          match: t => t === "armor" },
        { id: "offhand",    label: "🔰 Off-Hand",       match: t => t === "offhand" },
        { id: "accessory",  label: "💍 Accessories",    match: t => t === "accessory" },
        { id: "cloak",      label: "🧥 Cloaks",         match: t => t === "cloak" },
        { id: "consumable", label: "🧪 Potions & Bombs",match: t => t === "consumable" || t === "bomb" }
      ];

      const canAffordRecipe = (rec) => {
        const hasSpace = state.backpack.length < 12 || tabs.some(t => t.length < 20);
        if (!hasSpace || totalGold < rec.gold) return false;
        return Object.entries(rec.mats).every(([mid, need]) => countMaterial(mid) >= need);
      };

      const activeCat = FORGE_CATEGORIES.find(c => c.id === currentForgeTab) || FORGE_CATEGORIES[0];
      const filteredList = unlockedList.filter(rec => {
        const item = ITEMS_DB[rec.result];
        if (!item) return false;
        if (!activeCat.match(item.type)) return false;
        if (forgeCraftableOnly && !canAffordRecipe(rec)) return false;
        return true;
      });

      const tabButtonsHtml = FORGE_CATEGORIES.map(cat => {
        const count = unlockedList.filter(rec => {
          const item = ITEMS_DB[rec.result];
          return item && cat.match(item.type);
        }).length;
        const on = currentForgeTab === cat.id;
        return `
          <button data-forge-tab="${cat.id}" class="forge-tab-btn px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
            on
              ? "bg-amber-900/60 border-amber-400 text-amber-100 shadow"
              : "bg-stone-950 border-stone-800 text-stone-400 hover:text-amber-200 hover:border-amber-700/50"
          }">
            ${cat.label} <span class="text-[10px] opacity-75">(${count})</span>
          </button>
        `;
      }).join("");

      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 class="font-display text-xl font-bold text-amber-300">The Forge &amp; Arcane Workbench</h3>
            <p class="text-xs text-stone-400">
              Pulls <strong>Materials &amp; Gold</strong> from your Backpack and all <strong>${tabs.length} Vault Tab${tabs.length === 1 ? "" : "s"}</strong>.
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-stone-950 border border-amber-700/40 text-xs text-amber-200 font-semibold" title="Carried Gold + Vault Gold">
              🪙 <strong class="text-amber-300">${totalGold} GP</strong>
              <span class="text-[10px] text-stone-400">(${state.gold} + 🔐${state.vaultGold || 0})</span>
            </span>
            <span class="px-3 py-1 rounded-full bg-stone-950 border border-amber-700/40 text-xs text-amber-200 font-semibold">
              Schematics: <strong class="text-amber-400">${state.unlockedRecipes.length}</strong> / ${totalSchemRecipes}
            </span>
          </div>
        </div>

        <!-- Category Tabs + Craftable-Only Filter -->
        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-amber-700/30">
          <div class="flex flex-wrap gap-1.5">${tabButtonsHtml}</div>
          <label class="flex items-center gap-1.5 text-xs text-emerald-300 cursor-pointer select-none px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800">
            <input id="forge-craftable-toggle" type="checkbox" ${forgeCraftableOnly ? "checked" : ""} class="accent-emerald-500 cursor-pointer" />
            <span>Craftable Only</span>
          </label>
        </div>

        <div id="craft-list" class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[52vh] overflow-y-auto pr-1"></div>
      `;

      box.querySelectorAll(".forge-tab-btn").forEach(btn => {
        btn.onclick = () => {
          currentForgeTab = btn.dataset.forgeTab;
          renderDistrictForge(box);
        };
      });

      const toggleEl = box.querySelector("#forge-craftable-toggle");
      if (toggleEl) {
        toggleEl.onchange = () => {
          forgeCraftableOnly = toggleEl.checked;
          renderDistrictForge(box);
        };
      }

      const list = box.querySelector("#craft-list");
      if (!filteredList.length) {
        list.innerHTML = `<div class="col-span-full text-center text-xs text-stone-500 italic py-8 rounded-xl bg-stone-950/60 border border-stone-800">
          ${forgeCraftableOnly ? "No recipes in this category are currently craftable with your materials & gold." : "No unlocked recipes in this category yet. Find & learn Schematics on adventures!"}
        </div>`;
        return;
      }

      filteredList.forEach(rec => {
        const resItem = ITEMS_DB[rec.result];
        if (!resItem) return;

        const hasSpace = state.backpack.length < 12 || tabs.some(t => t.length < 20);
        let canCraft = totalGold >= rec.gold && hasSpace;

        const matBadges = Object.entries(rec.mats).map(([mid, need]) => {
          const { pack, vault, total } = countMaterialSplit(mid);
          if (total < need) canCraft = false;
          const vaultTag = vault > 0 ? ` <span class="text-amber-300/90" title="${pack} in Backpack, ${vault} in Vault">(🔐${vault})</span>` : "";
          return `<span class="px-2 py-0.5 rounded text-[10px] ${total >= need ? "bg-emerald-950 text-emerald-300 border border-emerald-700" : "bg-stone-900 text-rose-300 border border-stone-700"}">${ITEMS_DB[mid]?.name || mid}: ${total}/${need}${vaultTag}</span>`;
        }).join(" ");

        const c = document.createElement("div");
        c.className = "p-3.5 rounded-xl bg-stone-950/90 border border-amber-700/30 flex flex-col justify-between gap-2.5";
        c.innerHTML = `
          <div>
            <div class="flex items-center justify-between gap-2">
              <div class="font-display text-sm font-bold text-amber-200">${resItem.name}</div>
              ${typeof getRarityBadgeHtml === "function" ? getRarityBadgeHtml(rec.rarity || resItem.rarity) : ""}
            </div>
            <div class="text-[11px] text-stone-400 mb-2 mt-0.5">${rec.desc}</div>
            <div class="flex flex-wrap gap-1">${matBadges}</div>
          </div>
          <button class="w-full py-2 rounded-lg text-xs font-bold ${canCraft ? "btn-gold" : "bg-stone-800 text-stone-500 cursor-not-allowed"}" ${canCraft ? "" : "disabled"}>
            ⚒️ Craft (${rec.gold} GP)
          </button>
        `;

        c.querySelector("button").onclick = () => {
          const curTotalGold = (state.gold || 0) + (state.vaultGold || 0);
          if (curTotalGold < rec.gold) return toast("Not enough Gold (carried + Vault)!", "bad");
          for (const [mid, need] of Object.entries(rec.mats)) {
            if (countMaterial(mid) < need) return toast(`Not enough ${ITEMS_DB[mid]?.name || mid}!`, "bad");
          }

          Object.entries(rec.mats).forEach(([mid, need]) => consumeMaterial(mid, need));

          let sentToVault = false;
          if (addItemToContainer("backpack", rec.result, 1, 12) <= 0) {
            if (addItemToAnyStashTab(rec.result, 1) <= 0) {
              return toast("Both Backpack and all Stash Tabs are full!", "bad");
            }
            sentToVault = true;
          }

          const { fromVault } = spendGoldWithVault(rec.gold);
          const notes = [];
          if (fromVault > 0) notes.push(`drew ${fromVault} GP from Vault`);
          if (sentToVault) notes.push("sent to Personal Vault");
          sfx("forge");
          toast(`Crafted ${resItem.name}!${notes.length ? ` (${notes.join(", ")})` : ""}`, "good");
          addLog(`Crafted ${resItem.name} at the Forge.`, "gold");
          renderDistrictForge(box);
          renderSheet();
        };

        list.appendChild(c);
      });
    }

    function renderDistrictStash(box) {
      const tabs = ensureStashTabs();
      const activeIdx = state.activeStashTab;
      const activeTabArr = tabs[activeIdx];
      const nextCost = getNextStashTabCost();
      const totalGold = (state.gold || 0) + (state.vaultGold || 0);
      const canBuyTab = totalGold >= nextCost;
      const totalUsed = tabs.reduce((sum, t) => sum + t.length, 0);
      const totalCap = tabs.length * 20;

      const tabButtonsHtml = tabs.map((tabArr, idx) => {
        const on = idx === activeIdx;
        return `
          <button data-stash-tab="${idx}" class="stash-tab-btn px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
            on
              ? "bg-amber-900/60 border-amber-400 text-amber-100 shadow"
              : "bg-stone-950 border-stone-800 text-stone-400 hover:text-amber-200 hover:border-amber-700/50"
          }" title="Click to view Tab ${idx + 1} • Drop an item here to move it into Tab ${idx + 1}">
            📦 Tab ${idx + 1} <span class="text-[10px] opacity-80">(${tabArr.length}/20)</span>
          </button>
        `;
      }).join("");

      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <h3 class="font-display text-xl font-bold text-amber-300">Personal Vault &amp; Stash Tabs</h3>
          <span class="px-2.5 py-1 rounded-full bg-stone-950 border border-emerald-700/40 text-xs text-emerald-300 font-semibold">
            Total Stored: ${totalUsed} / ${totalCap}
          </span>
        </div>
        <p class="text-xs text-emerald-300/90 mb-4">🛡️ Everything stored here is 100% SAFE from death! Drag items onto another Tab button to organize.</p>

        <!-- Gold Vault -->
        <div class="p-4 rounded-xl bg-stone-950 border border-amber-600/40 mb-4">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div class="text-sm">Vaulted Gold: <strong class="font-display text-lg text-amber-300">🪙 ${state.vaultGold} GP</strong></div>
            <div class="text-xs text-stone-400">Carried Gold: <strong class="text-amber-200">${state.gold} GP</strong></div>
          </div>
          <div class="flex flex-wrap gap-2 items-center text-xs">
            <span class="text-stone-400 font-semibold">Deposit:</span>
            <button data-dep="10" class="v-dep px-2.5 py-1 rounded bg-emerald-900 hover:bg-emerald-800 text-emerald-100">10</button>
            <button data-dep="50" class="v-dep px-2.5 py-1 rounded bg-emerald-900 hover:bg-emerald-800 text-emerald-100">50</button>
            <button data-dep="all" class="v-dep px-2.5 py-1 rounded bg-emerald-800 hover:bg-emerald-700 text-emerald-50 font-bold">All</button>
            <span class="text-stone-400 font-semibold ml-2">Withdraw:</span>
            <button data-wd="10" class="v-wd px-2.5 py-1 rounded bg-amber-900 hover:bg-amber-800 text-amber-100">10</button>
            <button data-wd="50" class="v-wd px-2.5 py-1 rounded bg-amber-900 hover:bg-amber-800 text-amber-100">50</button>
            <button data-wd="all" class="v-wd px-2.5 py-1 rounded bg-amber-800 hover:bg-amber-700 text-amber-50 font-bold">All</button>
          </div>
        </div>

        <!-- Stash Tab Bar + Unlock New Tab Button -->
        <div class="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-amber-700/30">
          <div class="flex flex-wrap gap-1.5">${tabButtonsHtml}</div>
          <button id="btn-unlock-stash-tab" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${
            canBuyTab ? "btn-gold shadow" : "bg-stone-900 border border-stone-700 text-stone-500 cursor-not-allowed"
          }" ${canBuyTab ? "" : "disabled"} title="Uses Carried Gold + Vaulted Gold (${totalGold} GP total)">
            🔓 Unlock Tab ${tabs.length + 1} (${nextCost.toLocaleString()} GP)
          </button>
        </div>

        <!-- Active Stash Tab vs Backpack -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-display text-xs uppercase text-amber-400 mb-2">Stash Tab ${activeIdx + 1} (${activeTabArr.length} / 20)</h4>
            <div id="stash-items-list" class="space-y-1.5 max-h-64 overflow-y-auto pr-1"></div>
          </div>
          <div>
            <h4 class="font-display text-xs uppercase text-sky-400 mb-2">Deposit From Backpack (${state.backpack.length} / 12)</h4>
            <div id="stash-pack-list" class="space-y-1.5 max-h-64 overflow-y-auto pr-1"></div>
          </div>
        </div>
      `;

      // Gold Deposit / Withdraw
      box.querySelectorAll(".v-dep").forEach(b => b.onclick = () => {
        const amt = b.dataset.dep === "all" ? state.gold : Math.min(state.gold, parseInt(b.dataset.dep, 10));
        if (amt <= 0) return;
        state.gold -= amt; state.vaultGold += amt;
        renderDistrictStash(box); renderSheet();
      });
      box.querySelectorAll(".v-wd").forEach(b => b.onclick = () => {
        const amt = b.dataset.wd === "all" ? state.vaultGold : Math.min(state.vaultGold, parseInt(b.dataset.wd, 10));
        if (amt <= 0) return;
        state.vaultGold -= amt; state.gold += amt;
        renderDistrictStash(box); renderSheet();
      });

      // Stash Tab Switching + Drag-Onto-Tab Transfer
      box.querySelectorAll(".stash-tab-btn").forEach(btn => {
        const targetTabIdx = parseInt(btn.dataset.stashTab, 10);
        btn.onclick = () => {
          state.activeStashTab = targetTabIdx;
          renderDistrictStash(box);
        };
        btn.addEventListener("dragover", (e) => {
          if (!dragStackInfo) return;
          e.preventDefault();
          btn.classList.add("ring-2", "ring-emerald-400");
        });
        btn.addEventListener("dragleave", () => {
          btn.classList.remove("ring-2", "ring-emerald-400");
        });
        btn.addEventListener("drop", (e) => {
          e.preventDefault();
          btn.classList.remove("ring-2", "ring-emerald-400");
          if (!dragStackInfo) return;
          const { container, index: srcIdx } = dragStackInfo;
          dragStackInfo = null;
          const dstKey = `stash:${targetTabIdx}`;
          if (container === dstKey) return;
          const srcArr = getContainerArray(container);
          const srcEntry = srcArr?.[srcIdx];
          if (!srcEntry) return;
          const id = getEntryId(srcEntry);
          const qty = getEntryQty(srcEntry);
          const added = addItemToContainer(dstKey, id, qty, 20);
          if (added <= 0) return toast(`Stash Tab ${targetTabIdx + 1} is full (20/20)!`, "bad");
          if (added >= qty) srcArr.splice(srcIdx, 1);
          else srcArr[srcIdx] = { id, qty: qty - added };
          toast(`Moved ${added}x ${ITEMS_DB[id].name} to Stash Tab ${targetTabIdx + 1}!`, "good");
          renderDistrictStash(box);
          renderSheet();
        });
      });

      // Unlock Next Stash Tab Button (500, 1000, 2000, 4000...)
      const unlockBtn = box.querySelector("#btn-unlock-stash-tab");
      if (unlockBtn) {
        unlockBtn.onclick = () => {
          const cost = getNextStashTabCost();
          const curTotalGold = (state.gold || 0) + (state.vaultGold || 0);
          if (curTotalGold < cost) return toast(`Need ${cost.toLocaleString()} GP to unlock Tab ${tabs.length + 1}!`, "bad");
          spendGoldWithVault(cost);
          tabs.push([]);
          state.activeStashTab = tabs.length - 1;
          toast(`🔓 Unlocked Stash Tab ${tabs.length} (+20 Safe Slots)!`, "gold");
          addLog(`Unlocked Stash Tab ${tabs.length} for ${cost.toLocaleString()} GP.`, "gold");
          renderDistrictStash(box);
          renderSheet();
        };
      }

      // Active Stash Tab Items
      const activeContainerKey = `stash:${activeIdx}`;
      const sList = box.querySelector("#stash-items-list");
      if (!activeTabArr.length) {
        sList.innerHTML = `<div class="text-xs text-stone-500 italic p-3 text-center">Stash Tab ${activeIdx + 1} is empty.</div>`;
      } else {
        activeTabArr.forEach((entry, i) => {
          const id = getEntryId(entry);
          const qty = getEntryQty(entry);
          const it = ITEMS_DB[id];
          if (!it) return;
          const r = document.createElement("div");
          r.className = "flex items-center justify-between gap-2 p-2 rounded-lg bg-stone-950 border border-stone-800 text-xs cursor-grab active:cursor-grabbing";
          r.innerHTML = `<div><div class="font-bold text-amber-200">${it.name}${qty > 1 ? ` <span class="px-1.5 py-0.5 rounded bg-amber-900/80 text-[10px]">x${qty}</span>` : ""}</div><div class="text-[10px] text-stone-400">${it.desc}</div></div>
            <button class="px-2.5 py-1 rounded bg-sky-900 hover:bg-sky-800 text-sky-100 text-[11px] shrink-0">Withdraw</button>`;
          attachStackInteractions(r, activeContainerKey, i);
          r.querySelector("button").onclick = () => {
            const added = addItemToContainer("backpack", id, qty, 12);
            if (added <= 0) return toast("Backpack full (12/12)!", "bad");
            if (added >= qty) activeTabArr.splice(i, 1);
            else activeTabArr[i] = { id, qty: qty - added };
            renderDistrictStash(box); renderSheet();
          };
          sList.appendChild(r);
        });
      }

      // Deposit from Backpack into Active Stash Tab
      const pList = box.querySelector("#stash-pack-list");
      if (!state.backpack.length) {
        pList.innerHTML = `<div class="text-xs text-stone-500 italic p-3 text-center">Backpack is empty.</div>`;
      } else {
        state.backpack.forEach((entry, i) => {
          const id = getEntryId(entry);
          const qty = getEntryQty(entry);
          const it = ITEMS_DB[id];
          if (!it) return;
          const r = document.createElement("div");
          r.className = "flex items-center justify-between gap-2 p-2 rounded-lg bg-stone-950 border border-stone-800 text-xs cursor-grab active:cursor-grabbing";
          r.innerHTML = `<div><div class="font-bold text-stone-200">${it.name}${qty > 1 ? ` <span class="px-1.5 py-0.5 rounded bg-amber-900/80 text-[10px]">x${qty}</span>` : ""}</div><div class="text-[10px] text-stone-400">${it.desc}</div></div>
            <button class="px-2.5 py-1 rounded bg-emerald-900 hover:bg-emerald-800 text-emerald-100 text-[11px] shrink-0">Deposit</button>`;
          attachStackInteractions(r, "backpack", i);
          r.querySelector("button").onclick = () => {
            const added = addItemToContainer(activeContainerKey, id, qty, 20);
            if (added <= 0) return toast(`Stash Tab ${activeIdx + 1} is full (20/20)!`, "bad");
            if (added >= qty) state.backpack.splice(i, 1);
            else state.backpack[i] = { id, qty: qty - added };
            renderDistrictStash(box); renderSheet();
          };
          pList.appendChild(r);
        });
      }
    }
    function renderDistrictTemple(box) {
      const hasStJude = state.discoveredQuests.includes("st_jude");
      box.innerHTML = `
        <h3 class="font-display text-xl font-bold text-amber-300 mb-1">The Temple of the Dawn</h3>
        <p class="text-xs text-stone-400 mb-4">Sanctuary of healing, blessings, and soul-resurrection. High Priestess Selene tends the golden brazier.</p>

        <div class="p-4 rounded-xl bg-stone-950/80 border border-amber-600/40 mb-4">
          <div class="font-display text-sm font-bold text-amber-200">High Priestess Selene</div>
          <p class="font-story text-base text-stone-200 mt-1 mb-3">
            "May the Dawn guard your steps. Should you fall in the dark, our bells will summon your spirit back to this altar—though whatever gold and gear you carried will be lost."
          </p>
          ${!hasStJude ? `<button id="btn-selene-quest" class="px-4 py-2 rounded-lg btn-gold text-xs">☀️ Ask about the Quarantined Abbey (New Quest)</button>` : `<span class="text-xs text-emerald-400">✓ You have accepted Selene's lead to St. Jude's Catacombs.</span>`}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between gap-2">
            <div><div class="font-display text-sm font-bold text-emerald-300">Prayer of Mending</div><p class="text-[11px] text-stone-400 mt-1">Restore full HP, MP, and Luck.</p></div>
            <button id="btn-temple-heal" class="w-full py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-bold">Pray (5 GP)</button>
          </div>
          <div class="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between gap-2">
            <div><div class="font-display text-sm font-bold text-amber-300">Blessing of Aegis</div><p class="text-[11px] text-stone-400 mt-1">Gain +1 AC for your next adventure.</p></div>
            <button id="btn-bless-ac" class="w-full py-2 rounded-lg btn-gold text-xs">Bless (25 GP)</button>
          </div>
          <div class="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between gap-2">
            <div><div class="font-display text-sm font-bold text-purple-300">Blessing of Fortune</div><p class="text-[11px] text-stone-400 mt-1">Gain +1 Luck for your next adventure.</p></div>
            <button id="btn-bless-luck" class="w-full py-2 rounded-lg btn-gold text-xs">Bless (25 GP)</button>
          </div>
        </div>
      `;

      const sq = box.querySelector("#btn-selene-quest");
      if (sq) sq.onclick = () => { discoverAdventure("st_jude", "High Priestess Selene"); renderDistrictTemple(box); };

      box.querySelector("#btn-temple-heal").onclick = () => {
        if (getTownGold() < 5) return toast("Need 5 GP for a Temple offering.", "bad");
        spendGoldWithVault(5);
        const d = getDerived(state);
        state.hp = d.maxHp; state.mp = d.maxMp; state.currentLuck = d.maxLuck;
        toast("Golden light restores your HP, MP & Luck!", "good");
        renderSheet();
      };
      box.querySelector("#btn-bless-ac").onclick = () => {
        if (getTownGold() < 25) return toast("Need 25 GP.", "bad");
        spendGoldWithVault(25); state.blessing = "ac";
        sfx("heal");
        toast("Blessed with +1 AC for your next adventure!", "gold");
        renderTown(); renderSheet();
      };
      box.querySelector("#btn-bless-luck").onclick = () => {
        if (getTownGold() < 25) return toast("Need 25 GP.", "bad");
        spendGoldWithVault(25); state.blessing = "luck";
        state.currentLuck = getDerived(state).maxLuck;
        sfx("heal");
        toast("Blessed with +1 Luck for your next adventure!", "gold");
        renderTown(); renderSheet();
      };
    }

    /* ------------------------------------------------------------
       8. ADVENTURE ENGINE, SKILL CHECKS, COMBAT & DEATH
       ------------------------------------------------------------ */
    function startAdventure(advId) {
      const adv = ADVENTURES[advId];
      if (!adv) return;
      if (state.completedQuests[advId]) {
        return toast("You have already completed this adventure! Check your Hero Journal for its record.", "info");
      }
      closeBuildingModal();
      stopAutoWalk();
      state.mode = "adventure";
      state.innRested = false;
      state.activeAdv = { id: advId, page: 1, codewords: [], entered: [], defeated: [], dead: false, classAbilityUsed: false, torchLit: false, lootItems: [], lootGold: 0, lootXp: 0 };
      activeCombat = null;
      sfx("quest");
      bgm("adventure");
      document.getElementById("town-hub-view").classList.add("hidden");
      document.getElementById("adventure-view").classList.remove("hidden");
      addLog(`Embarked on ${adv.title}!`, "gold");
      goToAdvPage(1);
    }

    function goToAdvPage(pageNum, banner = null) {
      const adv = ADVENTURES[state.activeAdv.id];
      const page = adv.pages[pageNum];
      if (!page) return toast(`Error: Page ${pageNum} missing!`, "bad");

      activeCombat = null;
      state.activeAdv.page = pageNum;
      if (pageNum > 1) sfx("page");

      if (page.onEnter && !state.activeAdv.entered.includes(pageNum)) {
        state.activeAdv.entered.push(pageNum);
        applyAdvEffect(page.onEnter);
      }

      if (state.hp <= 0) {
        triggerDeath();
        return;
      }

      if (page.enemy && !state.activeAdv.defeated.includes(pageNum)) {
        initCombat(page.enemy, pageNum);
      }

      if (page.ending && !state.activeAdv.entered.includes(`end_${pageNum}`)) {
        state.activeAdv.entered.push(`end_${pageNum}`);
        state.gold += page.ending.gold || 0;
        gainXp(page.ending.xp || 0);
        state.completedQuests[adv.id] = page.ending.trophy;
        if (!Array.isArray(state.questJournal)) state.questJournal = [];
        if (!state.questJournal.some(e => e.id === adv.id)) {
          state.questJournal.push({
            id: adv.id,
            title: adv.title,
            subtitle: cleanQuestSubtitle(adv.subtitle),
            endingTitle: page.ending.title || "Victory",
            trophy: page.ending.trophy || "",
            xp: (state.activeAdv.lootXp || 0) + (page.ending.xp || 0),
            gold: (state.activeAdv.lootGold || 0) + (page.ending.gold || 0),
            items: [...(state.activeAdv.lootItems || [])],
            completedAt: new Date().toISOString()
          });
        }
        // Automatically unlock any follow-up chapter in a multi-part quest series
        Object.values(ADVENTURES).forEach(nextAdv => {
          if (nextAdv && nextAdv.reqQuest === adv.id && !state.discoveredQuests.includes(nextAdv.id)) {
            discoverAdventure(nextAdv.id, adv.title);
          }
        });
        state.blessing = null;
        state.innBuff = null;
        rollTavernPatrons(); // Refreshes the 3-6 Tavern patrons!
        sfx("victory");
        addLog(`Completed ${adv.title}: ${page.ending.title}! (+${page.ending.xp} XP, +${page.ending.gold} GP)`, "gold");
      }

      renderAdvPage(banner);
      renderSheet();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function applyAdvEffect(eff) {
      if (!eff) return;
      const d = getDerived(state);
      if (eff.cw && !state.activeAdv.codewords.includes(eff.cw)) state.activeAdv.codewords.push(eff.cw);
      if (eff.gold) {
        state.gold += eff.gold;
        if (state.activeAdv) state.activeAdv.lootGold = (state.activeAdv.lootGold || 0) + eff.gold;
      }
      if (eff.xp) {
        gainXp(eff.xp);
        if (state.activeAdv) state.activeAdv.lootXp = (state.activeAdv.lootXp || 0) + eff.xp;
      }
      if (eff.items) eff.items.forEach(id => {
        if (addToPack(id) && state.activeAdv) {
          if (!Array.isArray(state.activeAdv.lootItems)) state.activeAdv.lootItems = [];
          state.activeAdv.lootItems.push(id);
        }
      });
      if (eff.healHp) state.hp = Math.min(d.maxHp, state.hp + eff.healHp);
      if (eff.healMp) state.mp = Math.min(d.maxMp, state.mp + eff.healMp);
      if (eff.dmg) state.hp = Math.max(0, state.hp - eff.dmg);
      if (eff.msg) { toast(eff.msg, eff.dmg ? "bad" : "good"); addLog(eff.msg, eff.dmg ? "bad" : "good"); }
    }

    function handleAdvChoice(ch) {
      if (ch.mp) {
        if (state.mp < ch.mp) return toast(`Need ${ch.mp} MP!`, "bad");
        state.mp -= ch.mp;
      }
      if (ch.onChoose) {
        applyAdvEffect(ch.onChoose);
        if (state.hp <= 0) return triggerDeath();
      }
      if (ch.check) {
        sfx("dice");
        const c = ch.check;
        const d = getDerived(state);
        const statVal = d.s[c.stat] || 0;
        const skBonus = (c.skill && state.skills.includes(c.skill)) ? 2 : 0;
        const torchBonus = state.activeAdv?.torchLit ? 2 : 0;
        const scaledDc = c.dc + DIFFICULTY.skillDcBonus + Math.floor(Math.max(0, (state.level || 1) - 1) / 3);
        const r = roll2d6();
        const tot = r.total + statVal + skBonus + torchBonus;
        const ok = tot >= scaledDc;
        const desc = `🎲 ${c.stat.toUpperCase()} Check: [${r.d1}+${r.d2}]+${statVal}${skBonus?`+${skBonus}(${c.skill})`:""}${torchBonus?`+${torchBonus}(🔥Torch)`:""}=${tot} vs DC ${scaledDc} — ${ok?"SUCCESS!":"FAILED!"}`;
        addLog(desc, ok ? "good" : "bad");
        if (ok) {
          if (ch.onPass) applyAdvEffect(ch.onPass);
          goToAdvPage(c.pass, { type:"good", text:`${desc} ${c.passMsg||""}` });
        } else {
          if (c.failDmg) {
            const hardDmg = Math.max(c.failDmg + 1, Math.round(c.failDmg * DIFFICULTY.hazardDmgMult));
            state.hp = Math.max(0, state.hp - hardDmg);
          }
          if (state.hp <= 0) return triggerDeath(desc);
          goToAdvPage(c.fail, { type:"bad", text:`${desc} ${c.failMsg||""}` });
        }
        return;
      }
      if (ch.luck) {
        sfx("dice");
        const l = ch.luck;
        const cur = state.currentLuck;
        const r = roll2d6();
        const ok = r.total <= cur;
        state.currentLuck = Math.max(1, state.currentLuck - 1);
        const desc = `🍀 Test Your Luck: [${r.d1}+${r.d2}]=${r.total} vs Luck ${cur} — ${ok?"LUCKY!":"UNLUCKY!"} (Luck -1)`;
        addLog(desc, ok ? "good" : "bad");
        if (ok) {
          if (l.onPass) applyAdvEffect(l.onPass);
          goToAdvPage(l.pass, { type:"good", text:`${desc} ${l.passMsg||""}` });
        } else {
          if (l.failDmg) {
            const hardDmg = Math.max(l.failDmg + 1, Math.round(l.failDmg * DIFFICULTY.hazardDmgMult));
            state.hp = Math.max(0, state.hp - hardDmg);
          }
          if (state.hp <= 0) return triggerDeath(desc);
          goToAdvPage(l.fail, { type:"bad", text:`${desc} ${l.failMsg||""}` });
        }
        return;
      }
      goToAdvPage(ch.to);
    }

    function triggerDeath(lastNote = "") {
      activeCombat = null;
      sfx("death");
      bgm("adventure");
      state.hp = 0;
      state.activeAdv.dead = true;
      addLog(`💀 ${state.name} perished in ${ADVENTURES[state.activeAdv.id].title}!`, "bad");
      renderAdvPage(lastNote ? { type:"bad", text:lastNote } : null);
      renderSheet();
    }

    function resurrectAtTemple() {
      // CRITICAL DEATH PENALTY: Lose all carried gold, all equipped items, all backpack items!
      state.deaths++;
      state.gold = 0;
      state.equipment = { weapon: "novice_cudgel", armor: null, offhand: null, accessory: null, cloak: null };
      state.backpack = [];
      state.blessing = null;
      state.innBuff = null;
      state.shieldTurns = 0;
      state.evadeTurns = 0;

      const d = getDerived(state);
      state.hp = d.maxHp;
      state.mp = d.maxMp;
      state.currentLuck = d.maxLuck;

      toast("Awakened at the Temple of the Dawn. Carried gold & gear lost; Stash is safe!", "bad");
      sfx("heal");
      addLog("Resurrected at the Temple of the Dawn (gifted Novice's Cudgel).", "info");
      enterTown("temple", true);
    }

    /* ------------------------------------------------------------
       9. TURN-BASED COMBAT ENGINE
       ------------------------------------------------------------ */
    function initCombat(tpl, pageNum) {
      const heroLvl = Math.max(1, state.level || 1);
      const isBoss = (tpl.hp || 15) >= 28;

      let hp = Math.round((tpl.hp || 15) * DIFFICULTY.enemyHpMult) + (heroLvl - 1) * 3;
      let ac = (tpl.ac || 10) + DIFFICULTY.enemyAcBonus + Math.floor((heroLvl - 1) / 3);
      let atk = (tpl.atk || 3) + DIFFICULTY.enemyAtkBonus + Math.floor((heroLvl - 1) / 2);
      let dmg = Math.max(2, Math.round((tpl.dmg || 4) * DIFFICULTY.enemyDmgMult) + 1);

      const notes = [];
      if (tpl.weakCw) {
        let hits = 0;
        tpl.weakCw.forEach(cw => { if (state.activeAdv.codewords.includes(cw)) hits++; });
        if (hits > 0) {
          hp = Math.max(12, hp - hits * 6);
          ac = Math.max(11, ac - 1);
          notes.push("✨ Your prior preparation weakens this enemy!");
        }
      }
      if (isBoss) notes.push("💀 Boss Foe: Enrages below 50% HP (+2 DMG, +1 ATK)!");
      if (tpl.undead) notes.push("🌑 Dread Aura: Hits can drain 1 MP!");

      bgm("combat");
      activeCombat = {
        ...tpl,
        pageNum,
        hp,
        maxHp: hp,
        ac,
        atk,
        dmg,
        isBoss,
        enraged: false,
        chilled: 0,
        stunned: 0,
        dot: null,
        summon: null,
        heroAtkBuff: 0,
        heroAtkBuffTurns: 0,
        rageActive: false,
        nextSpellDouble: false,
        overchargeTurns: 0,
        wildShapeActive: false,
        huntersMark: false,
        grandHex: false,
        bardAcTurns: 0,
        usedAbilities: [],
        log: [`⚔ [HARDCORE] Battle begins against ${tpl.name}!`, ...notes]
      };
    }

    function combatStrike(lucky = false) {
      if (!activeCombat) return;
      const d = getDerived(state);
      const subP = getSubclassPassiveTotals(state);
      const effAtk = d.atk
        + (activeCombat.heroAtkBuffTurns > 0 ? activeCombat.heroAtkBuff : 0)
        + (activeCombat.huntersMark ? 3 : 0);
      const effEnemyAc = activeCombat.grandHex ? Math.max(8, activeCombat.ac - 2) : activeCombat.ac;
      const r = roll2d6();
      let bonus = 0;
      if (lucky) {
        const lr = roll2d6();
        const cur = state.currentLuck;
        state.currentLuck = Math.max(1, state.currentLuck - 1);
        if (lr.total <= cur) { bonus = 4; activeCombat.log.unshift(`🍀 LUCKY HIT! (${lr.total}≤${cur}, Luck -1) +4 dmg!`); }
        else activeCombat.log.unshift(`🍀 Unlucky (${lr.total}>${cur}, Luck -1).`);
      }
      const tot = r.total + effAtk;
      const critThreshold = activeCombat.huntersMark ? Math.min(subP.critRange || 12, 10) : (subP.critRange || 12);
      const isCrit = r.total >= critThreshold;
      if (tot >= effEnemyAc || bonus > 0 || isCrit) {
        let dmg = roll(6) + Math.max(1, Math.floor(effAtk / 3)) + bonus;
        if (activeCombat.huntersMark) dmg += 4;
        if (activeCombat.wildShapeActive) dmg += 4;
        if (activeCombat.undead && subP.undeadDmgBonus) dmg += subP.undeadDmgBonus;
        if (activeCombat.isBoss && subP.bossDmgBonus) dmg += subP.bossDmgBonus;
        if (isCrit) dmg = Math.round(dmg * 1.5);
        if (activeCombat.rageActive) dmg *= 2;
        sfx(isCrit ? "crit" : "sword");
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        let extra = "";
        if (activeCombat.rageActive) extra += " [🔥 RAGE 2x!]";
        if (subP.lifesteal > 0) {
          state.hp = Math.min(d.maxHp, state.hp + subP.lifesteal);
          extra += ` (+${subP.lifesteal} HP drained)`;
        }
        activeCombat.log.unshift(`⚔ ${isCrit ? "CRIT! " : ""}Hit [${r.d1}+${r.d2}]+${effAtk}=${tot} vs AC ${effEnemyAc} for ${dmg} dmg!${extra}`);
      } else {
        sfx("miss");
        activeCombat.log.unshift(`⚔ Missed [${r.d1}+${r.d2}]+${effAtk}=${tot} vs AC ${effEnemyAc}!`);
      }
      combatAfterPlayer();
    }

    function combatSpell(name) {
      if (!activeCombat) return;
      ensureHeroProgressionState(state);
      if (!state.preparedSpells.includes(name)) {
        return toast(`${name} is not prepared! Prepare spells in Oakhaven.`, "bad");
      }
      const sp = SPELLS_LIST.find(s => s.name === name);
      const mpCost = getEffectiveSpellMp(sp, state);
      if (!sp || state.mp < mpCost) return toast(`Need ${mpCost} MP!`, "bad");
      state.mp -= mpCost;
      const d = getDerived(state);
      const subP = getSubclassPassiveTotals(state);
      const icon = sp.icon || "✨";
      sfxSpell(sp.dmgType, !!(sp.healDice || sp.healBase), !!(sp.shieldTurns || sp.evadeTurns));

      if (sp.dmgDice || sp.dmgBase) {
        const dmgStatKey = sp.dmgStat || sp.stat || "arcana";
        const statVal = d.s[dmgStatKey] || 0;
        const bonus = (sp.dmgBonus || 0) + (sp.dmgBase || 0) + (subP.spellDmgBonus || 0);
        let rolled = 0;
        let rollText = "";
        if (sp.dmgDice) {
          const dr = rollDiceSpec(sp.dmgDice);
          rolled = dr.total;
          rollText = `${dr.label}${bonus ? `+${bonus}` : ""}+${statVal}`;
        } else {
          rollText = `${bonus}+${statVal}`;
        }
        let dmg = rolled + bonus + statVal;
        if (activeCombat.undead && subP.undeadDmgBonus) dmg += subP.undeadDmgBonus;
        if (activeCombat.isBoss && subP.bossDmgBonus) dmg += subP.bossDmgBonus;
        const doubled = !!(sp.undeadDouble && activeCombat.undead);
        if (doubled) dmg *= 2;
        const mods = [];
        if (doubled) mods.push("2x Undead!");
        if (activeCombat.overchargeTurns > 0) {
          dmg = Math.round(dmg * 1.5);
          mods.push("☄️ Overcharge +50%!");
        }
        if (activeCombat.nextSpellDouble) {
          dmg *= 2;
          activeCombat.nextSpellDouble = false;
          mods.push("🔮 Arcane Surge 2x!");
        }
        if (activeCombat.rageActive) {
          dmg *= 2;
          mods.push("🔥 RAGE 2x!");
        }
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        const typeStr = sp.dmgType ? ` ${sp.dmgType}` : "";
        activeCombat.log.unshift(`${icon} ${sp.name} rolls ${rollText} = ${dmg}${typeStr} dmg${mods.length ? ` (${mods.join(" ")})` : ""}!`);
      }

      if (sp.healDice || sp.healBase) {
        const healStatKey = sp.healStat || sp.stat || "spirit";
        const statVal = d.s[healStatKey] || 0;
        const bonus = (sp.healBonus || 0) + (sp.healBase || 0) + (subP.healBonus || 0);
        let rolled = 0;
        let rollText = "";
        if (sp.healDice) {
          const hr = rollDiceSpec(sp.healDice);
          rolled = hr.total;
          rollText = `${hr.label}${bonus ? `+${bonus}` : ""}+${statVal}`;
        } else {
          rollText = `${bonus}+${statVal}`;
        }
        const heal = rolled + bonus + statVal;
        state.hp = Math.min(d.maxHp, state.hp + heal);
        activeCombat.log.unshift(`💚 ${sp.name} rolls ${rollText} = +${heal} HP restored!`);
      }

      if (sp.chillTurns) {
        activeCombat.chilled = Math.max(activeCombat.chilled, sp.chillTurns);
        activeCombat.log.unshift(`❄️ ${activeCombat.name} is chilled (-2 Enemy Atk for ${sp.chillTurns} turns)!`);
      }
      if (sp.shieldTurns) {
        state.shieldTurns = Math.max(state.shieldTurns, sp.shieldTurns);
        activeCombat.log.unshift(`🛡️ ${sp.name} grants +3 AC for ${sp.shieldTurns} turns!`);
      }
      if (sp.evadeTurns) {
        state.evadeTurns = Math.max(state.evadeTurns, sp.evadeTurns);
        activeCombat.log.unshift(`🌑 ${sp.name} grants +2 AC for ${sp.evadeTurns} turns!`);
      }

      combatAfterPlayer();
    }

    function combatItem(kind) {
      if (!activeCombat) return;
      const subP = getSubclassPassiveTotals(state);
      if (kind === "potion") {
        const i = state.backpack.findIndex(e => ITEMS_DB[getEntryId(e)]?.type === "consumable" && (ITEMS_DB[getEntryId(e)]?.healHp || 0) > 0);
        if (i === -1) return toast("No healing potions or foods in backpack!", "bad");
        const usedId = consumeOneFromSlot("backpack", i);
        const it = ITEMS_DB[usedId];
        const d = getDerived(state);
        const healAmt = (it.healHp || 0) + (subP.healBonus || 0);
        state.hp = Math.min(d.maxHp, state.hp + healAmt);
        if (it.healMp) state.mp = Math.min(d.maxMp, state.mp + it.healMp);
        sfx("potion");
        activeCombat.log.unshift(`🧪 Used ${it.name} (+${healAmt} HP${it.healMp ? `, +${it.healMp} MP` : ""})!`);
      } else if (kind === "bomb") {
        const i = state.backpack.findIndex(e => ITEMS_DB[getEntryId(e)]?.type === "bomb");
        if (i === -1) return toast("No bombs or throwables in backpack!", "bad");
        const usedId = consumeOneFromSlot("backpack", i);
        const it = ITEMS_DB[usedId];
        let dmg = (it.dmg || 10) + (subP.bombDmgBonus || 0);
        if (activeCombat.rageActive) dmg *= 2;
        sfx("bomb");
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        let extra = activeCombat.rageActive ? " [🔥 RAGE 2x!]" : "";
        if (subP.bombChillTurns > 0) {
          activeCombat.chilled = Math.max(activeCombat.chilled, subP.bombChillTurns);
          extra += ` & weakens foe (-2 Atk, ${subP.bombChillTurns}t)`;
        }
        activeCombat.log.unshift(`💣 Threw ${it.name} for ${dmg} dmg${extra}!`);
      } else if (kind === "torch") {
        const i = state.backpack.findIndex(e => getEntryId(e) === "torch");
        if (i === -1) return toast("No Pitch Torches in backpack!", "bad");
        consumeOneFromSlot("backpack", i);
        let dmg = 6 + (subP.bombDmgBonus || 0);
        const undeadDouble = !!activeCombat.undead;
        if (undeadDouble) dmg *= 2;
        if (activeCombat.rageActive) dmg *= 2;
        sfx("bomb");
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        activeCombat.dot = { dmg: 3, turns: 3, label: "Burning" };
        activeCombat.chilled = Math.max(activeCombat.chilled, 2);
        const mods = [];
        if (undeadDouble) mods.push("2x Undead!");
        if (activeCombat.rageActive) mods.push("🔥 RAGE 2x!");
        activeCombat.log.unshift(`🔥 Hurled Pitch Torch for ${dmg} fire dmg${mods.length ? ` (${mods.join(" ")})` : ""}, igniting foe (3 Burning/t, 3t) & dazzling (-2 Enemy ATK, 2t)!`);
      }
      combatAfterPlayer();
    }

    function useOocSubclassAbility(ab) {
      if (!ab || activeCombat) return;
      const cost = ab.mp || 0;
      if (state.mp < cost) return toast(`Need ${cost} MP!`, "bad");
      const d = getDerived(state);
      if (ab.craftItem) {
        if (!addToPack(ab.craftItem, ab.craftQty || 1)) return;
        state.mp -= cost;
        sfx("potion");
        const itemName = ITEMS_DB[ab.craftItem]?.name || ab.craftItem;
        toast(`${ab.icon || "🧪"} ${ab.name}: Crafted ${ab.craftQty || 1}x ${itemName}!`, "good");
        addLog(`${ab.name}: Crafted ${ab.craftQty || 1}x ${itemName} (-${cost} MP).`, "info");
        renderSheet();
        return;
      }
      state.mp -= cost;
      if (ab.healDice || ab.healBase) {
        const statVal = d.s[ab.healStat || "spirit"] || 0;
        const bonus = (ab.healBonus || 0) + (ab.healBase || 0);
        const hr = ab.healDice ? rollDiceSpec(ab.healDice) : { total: 0, label: "" };
        const heal = hr.total + bonus + statVal;
        state.hp = Math.min(d.maxHp, state.hp + heal);
        toast(`${ab.icon || "💚"} ${ab.name} ${hr.label}: +${heal} HP!`, "good");
      }
      if (ab.restoreLuck) {
        state.currentLuck = Math.min(d.maxLuck, state.currentLuck + ab.restoreLuck);
        toast(`${ab.icon || "🍀"} ${ab.name}: +${ab.restoreLuck} Current Luck!`, "good");
      }
      if (ab.shieldTurns) {
        state.shieldTurns = Math.max(state.shieldTurns, ab.shieldTurns);
        toast(`${ab.icon || "🛡️"} ${ab.name}: +3 AC for ${ab.shieldTurns} turns!`, "info");
      }
      renderSheet();
    }

    function combatSubclassAbility(ab) {
      if (!activeCombat || !ab) return;
      if (ab.oncePerCombat && activeCombat.usedAbilities.includes(ab.name)) {
        return toast(`${ab.name} can only be used once per combat!`, "info");
      }
      const cost = ab.mp || 0;
      if (state.mp < cost) return toast(`Need ${cost} MP!`, "bad");
      if (ab.craftItem && !ab.dmgDice && !ab.healDice && !ab.multiStrike) {
        if (!addToPack(ab.craftItem, ab.craftQty || 1)) return;
      }
      state.mp -= cost;
      if (ab.oncePerCombat) activeCombat.usedAbilities.push(ab.name);
      const d = getDerived(state);
      const subP = getSubclassPassiveTotals(state);
      const icon = ab.icon || "🌟";
      if (ab.summon) sfx("summon");
      else if (ab.stunTurns) sfx("stun");
      else if (ab.guaranteedCrit) sfx("crit");
      else if (ab.multiStrike) sfx("sword");
      else if (ab.craftItem && !ab.dmgDice) sfx("potion");
      else sfxSpell(ab.dmgType, !!(ab.healDice || ab.healBase), !!(ab.shieldTurns || ab.evadeTurns));

      if (ab.craftItem) {
        const added = (ab.dmgDice || ab.healDice || ab.multiStrike) ? addToPack(ab.craftItem, ab.craftQty || 1) : true;
        if (added) {
          const itemName = ITEMS_DB[ab.craftItem]?.name || ab.craftItem;
          activeCombat.log.unshift(`${icon} [${ab.name}] conjured ${ab.craftQty || 1}x ${itemName} into your pack!`);
        }
      }

      if (ab.multiStrike) {
        const effAtk = d.atk + (activeCombat.heroAtkBuffTurns > 0 ? activeCombat.heroAtkBuff : 0) + (activeCombat.huntersMark ? 3 : 0);
        const effEnemyAc = activeCombat.grandHex ? Math.max(8, activeCombat.ac - 2) : activeCombat.ac;
        let totalDmg = 0, hits = 0;
        for (let k = 0; k < ab.multiStrike; k++) {
          const r = roll2d6();
          if (r.total + effAtk >= effEnemyAc || r.total >= (subP.critRange || 12)) {
            let sd = roll(6) + Math.max(1, Math.floor(effAtk / 3));
            if (r.total >= (subP.critRange || 12)) sd = Math.round(sd * 1.5);
            if (activeCombat.rageActive) sd *= 2;
            totalDmg += sd;
            hits++;
          }
        }
        activeCombat.hp = Math.max(0, activeCombat.hp - totalDmg);
        activeCombat.log.unshift(`${icon} [${ab.name}] unleashed ${ab.multiStrike} strikes (${hits} hit) for ${totalDmg} dmg${activeCombat.rageActive ? " [🔥 RAGE 2x!]" : ""}!`);
      }

      if (ab.guaranteedCrit) {
        const effAtk = d.atk + (activeCombat.heroAtkBuffTurns > 0 ? activeCombat.heroAtkBuff : 0) + (activeCombat.huntersMark ? 3 : 0);
        let dmg = Math.round((roll(6) + roll(6) + Math.max(2, Math.floor(effAtk / 2))) * 1.5);
        if (activeCombat.rageActive) dmg *= 2;
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        activeCombat.log.unshift(`${icon} [${ab.name}] CRITICAL STRIKE for ${dmg} dmg${activeCombat.rageActive ? " [🔥 RAGE 2x!]" : ""}!`);
      }

      if (ab.dmgDice || ab.dmgBase) {
        const statKey = ab.dmgStat || "might";
        const statVal = d.s[statKey] || 0;
        const bonus = (ab.dmgBonus || 0) + (ab.dmgBase || 0);
        const dr = ab.dmgDice ? rollDiceSpec(ab.dmgDice) : { total: 0, label: "" };
        let dmg = dr.total + bonus + statVal;
        if (activeCombat.undead && subP.undeadDmgBonus) dmg += subP.undeadDmgBonus;
        if (activeCombat.isBoss && subP.bossDmgBonus) dmg += subP.bossDmgBonus;
        const doubled = !!(ab.undeadDouble && activeCombat.undead);
        if (doubled) dmg *= 2;
        if (activeCombat.rageActive) dmg *= 2;
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        const typeStr = ab.dmgType ? ` ${ab.dmgType}` : "";
        activeCombat.log.unshift(`${icon} [${ab.name}] rolls ${dr.label}${bonus ? `+${bonus}` : ""}+${statVal} = ${dmg}${typeStr} dmg${doubled ? " (2x Undead!)" : ""}${activeCombat.rageActive ? " [🔥 RAGE 2x!]" : ""}!`);
      }

      if (ab.healDice || ab.healBase) {
        const statKey = ab.healStat || "spirit";
        const statVal = d.s[statKey] || 0;
        const bonus = (ab.healBonus || 0) + (ab.healBase || 0) + (subP.healBonus || 0);
        const hr = ab.healDice ? rollDiceSpec(ab.healDice) : { total: 0, label: "" };
        const heal = hr.total + bonus + statVal;
        state.hp = Math.min(d.maxHp, state.hp + heal);
        activeCombat.log.unshift(`💚 [${ab.name}] rolls ${hr.label}${bonus ? `+${bonus}` : ""}+${statVal} = +${heal} HP!`);
      }

      if (ab.restoreMp) {
        state.mp = Math.min(d.maxMp, state.mp + ab.restoreMp);
        activeCombat.log.unshift(`🔷 [${ab.name}] restored +${ab.restoreMp} MP!`);
      }
      if (ab.restoreLuck) {
        state.currentLuck = Math.min(d.maxLuck, state.currentLuck + ab.restoreLuck);
        activeCombat.log.unshift(`🍀 [${ab.name}] restored +${ab.restoreLuck} Current Luck!`);
      }
      if (ab.dot) {
        activeCombat.dot = { dmg: ab.dot.dmg, turns: ab.dot.turns, label: ab.dot.label || "Afflicted" };
        activeCombat.log.unshift(`☠️ ${activeCombat.name} is ${activeCombat.dot.label} (${ab.dot.dmg} dmg/turn for ${ab.dot.turns}t)!`);
      }
      if (ab.summon) {
        activeCombat.summon = { name: ab.summon.name, icon: ab.summon.icon || "🐾", dmg: ab.summon.dmg, turns: ab.summon.turns };
        activeCombat.log.unshift(`${activeCombat.summon.icon} Summoned ${activeCombat.summon.name} (${ab.summon.dmg} dmg/turn for ${ab.summon.turns}t)!`);
      }
      if (ab.selfBuffAtk) {
        activeCombat.heroAtkBuff = ab.selfBuffAtk.atk;
        activeCombat.heroAtkBuffTurns = Math.max(activeCombat.heroAtkBuffTurns, ab.selfBuffAtk.turns);
        activeCombat.log.unshift(`🔥 [${ab.name}] grants +${ab.selfBuffAtk.atk} Attack for ${ab.selfBuffAtk.turns} turns!`);
      }
      if (ab.stunTurns) {
        activeCombat.stunned = Math.max(activeCombat.stunned, ab.stunTurns);
        activeCombat.log.unshift(`⚡ ${activeCombat.name} is STUNNED (${ab.stunTurns}t)!`);
      }
      if (ab.chillTurns) {
        activeCombat.chilled = Math.max(activeCombat.chilled, ab.chillTurns);
        activeCombat.log.unshift(`❄️ ${activeCombat.name} weakened (-2 Enemy Atk for ${ab.chillTurns}t)!`);
      }
      if (ab.shieldTurns) {
        state.shieldTurns = Math.max(state.shieldTurns, ab.shieldTurns);
        activeCombat.log.unshift(`🛡️ [${ab.name}] grants +3 AC for ${ab.shieldTurns} turns!`);
      }
      if (ab.evadeTurns) {
        state.evadeTurns = Math.max(state.evadeTurns, ab.evadeTurns);
        activeCombat.log.unshift(`🌑 [${ab.name}] grants +2 AC for ${ab.evadeTurns} turns!`);
      }
      combatAfterPlayer();
    }

    function combatClassAbility(ab) {
      if (!activeCombat || !ab || !state.activeAdv) return;
      if (state.activeAdv.classAbilityUsed) {
        return toast(`${ab.name} can only be used once per quest!`, "info");
      }
      state.activeAdv.classAbilityUsed = true;
      const d = getDerived(state);
      const subP = getSubclassPassiveTotals(state);
      const effAtk = d.atk + (activeCombat.heroAtkBuffTurns > 0 ? activeCombat.heroAtkBuff : 0);
      const effEnemyAc = activeCombat.grandHex ? Math.max(8, activeCombat.ac - 2) : activeCombat.ac;
      const id = ab.id;

      if (id === "rage") {
        activeCombat.rageActive = true;
        sfx("crit");
        activeCombat.log.unshift(`🔥 [RAGE!] Primal fury erupts! For this entire combat, ALL damage you deal is DOUBLED — and ALL damage you take is DOUBLED! (Free Action)`);
        toast("🔥 RAGE ACTIVE! 2x Damage Dealt & 2x Damage Taken this combat!", "gold");
        renderCombatPanel();
        renderSheet();
        return;
      }

      if (id === "arcane_surge") {
        const mpGain = Math.max(5, Math.ceil(d.maxMp * 0.5));
        state.mp = Math.min(d.maxMp, state.mp + mpGain);
        activeCombat.nextSpellDouble = true;
        sfx("heal");
        activeCombat.log.unshift(`🔮 [ARCANE SURGE!] Restored +${mpGain} MP! Your next Spell this combat deals DOUBLE damage! (Free Action)`);
        toast(`🔮 Arcane Surge! +${mpGain} MP & 2x Next Spell!`, "info");
        renderCombatPanel();
        renderSheet();
        return;
      }

      if (id === "metamagic_overcharge") {
        activeCombat.overchargeTurns = 2;
        sfx("crit");
        activeCombat.log.unshift(`☄️ [METAMAGIC OVERCHARGE!] For the next 2 turns, all Spells cost 0 MP and deal +50% damage! (Free Action)`);
        toast("☄️ Metamagic Overcharge! 0 MP Spells & +50% Spell DMG (2 turns)!", "info");
        renderCombatPanel();
        renderSheet();
        return;
      }

      if (id === "wild_shape") {
        const hpGain = Math.max(10, Math.ceil(d.maxHp * 0.4));
        state.hp = Math.min(d.maxHp, state.hp + hpGain);
        activeCombat.wildShapeActive = true;
        sfx("heal");
        activeCombat.log.unshift(`🐻 [WILD SHAPE!] You shift into a towering Dire Bear (+${hpGain} HP, +3 AC & +4 strike damage for this combat)! (Free Action)`);
        toast(`🐻 Wild Shape! +${hpGain} HP, +3 AC & +4 Strike DMG!`, "good");
        renderCombatPanel();
        renderSheet();
        return;
      }

      if (id === "action_surge") {
        const surgeAtk = effAtk + 2;
        let totalDmg = 0, hits = 0;
        for (let k = 0; k < 2; k++) {
          const r = roll2d6();
          const isCrit = r.total >= (subP.critRange || 12);
          if (r.total + surgeAtk >= effEnemyAc || isCrit) {
            let sd = roll(6) + Math.max(1, Math.floor(surgeAtk / 3));
            if (isCrit) sd = Math.round(sd * 1.5);
            totalDmg += sd;
            hits++;
          }
        }
        sfx("sword");
        activeCombat.hp = Math.max(0, activeCombat.hp - totalDmg);
        activeCombat.log.unshift(`⚔️ [ACTION SURGE!] Unleashed 2 surging weapon strikes at +${surgeAtk} ATK (${hits}/2 hit) for ${totalDmg} dmg!`);
      } else if (id === "assassinate") {
        const dmg = Math.round((roll(6) + roll(6) + Math.max(2, Math.floor(effAtk / 2))) * 2);
        state.shieldTurns = Math.max(state.shieldTurns, 2);
        sfx("crit");
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        activeCombat.log.unshift(`🗡️ [ASSASSINATE!] Lethal shadow-strike deals ${dmg} CRITICAL dmg & grants Shadow Veil (+3 AC, 2t)!`);
      } else if (id === "divine_intervention") {
        const heal = Math.max(12, Math.ceil(d.maxHp * 0.5));
        state.hp = Math.min(d.maxHp, state.hp + heal);
        state.shieldTurns = Math.max(state.shieldTurns, 3);
        const dr = rollDiceSpec("2d6");
        let dmg = dr.total + (d.s.spirit || 0);
        if (activeCombat.undead) dmg *= 2;
        sfx("heal");
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        activeCombat.log.unshift(`☀️ [DIVINE INTERVENTION!] Restored +${heal} HP, Sacred Ward (+3 AC, 3t), and blasted foe for ${dmg} radiant dmg${activeCombat.undead ? " (2x Undead!)" : ""}!`);
      } else if (id === "hunters_mark") {
        activeCombat.huntersMark = true;
        const shotAtk = effAtk + 3;
        const dmg = roll(6) + Math.max(2, Math.floor(shotAtk / 3)) + 4;
        sfx("sword");
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        activeCombat.log.unshift(`🏹 [HUNTER'S MARK!] Aimed shot strikes for ${dmg} dmg! Prey is marked for the entire combat (+3 ATK, +4 strike DMG, Crit 10+)!`);
      } else if (id === "bardic_inspiration") {
        state.currentLuck = Math.min(d.maxLuck, state.currentLuck + 3);
        activeCombat.heroAtkBuff = Math.max(activeCombat.heroAtkBuff, 3);
        activeCombat.heroAtkBuffTurns = Math.max(activeCombat.heroAtkBuffTurns, 3);
        activeCombat.bardAcTurns = 3;
        activeCombat.chilled = Math.max(activeCombat.chilled, 3);
        sfx("heal");
        activeCombat.log.unshift(`🎵 [BARDIC INSPIRATION!] +3 Luck, +3 ATK & +2 AC (3t), and foe rattled (-2 Enemy ATK, 3t)!`);
      } else if (id === "flurry_of_blows") {
        let totalDmg = 0, hits = 0;
        for (let k = 0; k < 3; k++) {
          const r = roll2d6();
          const isCrit = r.total >= (subP.critRange || 12);
          if (r.total + effAtk >= effEnemyAc || isCrit) {
            let sd = roll(6) + Math.max(1, Math.floor(effAtk / 3));
            if (isCrit) sd = Math.round(sd * 1.5);
            totalDmg += sd;
            hits++;
          }
        }
        activeCombat.stunned = Math.max(activeCombat.stunned, 1);
        sfx("stun");
        activeCombat.hp = Math.max(0, activeCombat.hp - totalDmg);
        activeCombat.log.unshift(`👊 [FLURRY OF BLOWS!] 3 rapid ki strikes (${hits}/3 hit) for ${totalDmg} dmg & STUNNED ${activeCombat.name} (1t)!`);
      } else if (id === "divine_smite") {
        const dr = rollDiceSpec("3d6");
        let dmg = roll(6) + Math.max(1, Math.floor(effAtk / 3)) + dr.total + (d.s.spirit || 0);
        const doubled = !!(activeCombat.undead || activeCombat.isBoss);
        if (doubled) dmg *= 2;
        const heal = Math.max(2, Math.floor(dmg * 0.5));
        state.hp = Math.min(d.maxHp, state.hp + heal);
        sfx("crit");
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        activeCombat.log.unshift(`⚡ [DIVINE SMITE!] Radiant blow deals ${dmg} dmg${doubled ? " (2x vs Undead/Boss!)" : ""} and heals you for +${heal} HP!`);
      } else if (id === "eldritch_pact") {
        const hpCost = Math.min(Math.max(0, state.hp - 1), Math.max(2, Math.floor(state.hp * 0.2)));
        state.hp = Math.max(1, state.hp - hpCost);
        state.mp = d.maxMp;
        const dr = rollDiceSpec("3d6");
        const dmg = dr.total + (d.s.arcana || 0) + (d.s.spirit || 0);
        activeCombat.dot = { dmg: 4, turns: 3, label: "Eldritch Curse" };
        sfx("crit");
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        activeCombat.log.unshift(`👁️ [ELDRITCH PACT!] Paid ${hpCost} HP to unleash ${dmg} necrotic dmg, refill 100% MP, and curse foe (4/t, 3t)!`);
      } else if (id === "arcane_divine_convergence") {
        const dr = rollDiceSpec("2d6");
        const hr = rollDiceSpec("2d6");
        const dmg = dr.total + (d.s.arcana || 0) + (d.s.spirit || 0);
        const heal = hr.total + (d.s.spirit || 0);
        state.hp = Math.min(d.maxHp, state.hp + heal);
        state.mp = Math.min(d.maxMp, state.mp + 4);
        sfx("heal");
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        activeCombat.log.unshift(`⚖️ [ARCANE-DIVINE CONVERGENCE!] Dealt ${dmg} radiant-arcane dmg, healed +${heal} HP, and restored +4 MP!`);
      } else if (id === "grand_hex") {
        activeCombat.grandHex = true;
        sfx("stun");
        activeCombat.log.unshift(`🕯️ [GRAND HEX!] ${activeCombat.name} is cursed for the entire combat (-3 ATK, -2 AC, and 4 hex dmg every turn)!`);
      }

      combatAfterPlayer();
    }

    function combatFlee() {
      if (!activeCombat || !activeCombat.flee) return toast("No escape from this battle!", "bad");
      const dest = activeCombat.flee;
      if (!state.skills.includes("Stealth")) {
        const dmg = Math.max(1, activeCombat.dmg - 1);
        state.hp = Math.max(0, state.hp - dmg);
        if (state.hp <= 0) return triggerDeath("Struck down while fleeing!");
      }
      activeCombat = null;
      sfx("miss");
      bgm("adventure");
      goToAdvPage(dest, { type:"info", text:"You disengaged and fell back." });
    }

    function combatAfterPlayer() {
      if (!activeCombat) return;
      const subP = getSubclassPassiveTotals(state);

      // Active Summon & Damage-Over-Time ticks
      if (activeCombat.hp > 0 && activeCombat.summon && activeCombat.summon.turns > 0) {
        const sm = activeCombat.summon;
        activeCombat.hp = Math.max(0, activeCombat.hp - sm.dmg);
        activeCombat.log.unshift(`${sm.icon} ${sm.name} strikes for ${sm.dmg} dmg!`);
        sm.turns--;
        if (sm.turns <= 0) activeCombat.summon = null;
      }
      if (activeCombat.hp > 0 && activeCombat.dot && activeCombat.dot.turns > 0) {
        const dt = activeCombat.dot;
        activeCombat.hp = Math.max(0, activeCombat.hp - dt.dmg);
        activeCombat.log.unshift(`☠️ ${activeCombat.name} suffers ${dt.dmg} ${dt.label} dmg!`);
        dt.turns--;
        if (dt.turns <= 0) activeCombat.dot = null;
      }
      if (activeCombat.hp > 0 && activeCombat.grandHex) {
        activeCombat.hp = Math.max(0, activeCombat.hp - 4);
        activeCombat.log.unshift(`🕯️ Grand Hex sears ${activeCombat.name} for 4 dmg!`);
      }

      if (activeCombat.hp <= 0) {
        const c = activeCombat;
        state.activeAdv.defeated.push(c.pageNum);
        state.kills++;
        const baseGold = c.gold || 0;
        const goldAward = subP.goldFindPct > 0 ? Math.round(baseGold * (1 + subP.goldFindPct / 100)) : baseGold;
        state.gold += goldAward;
        gainXp(c.xp || 25);
        if (state.activeAdv) {
          state.activeAdv.lootGold = (state.activeAdv.lootGold || 0) + goldAward;
          state.activeAdv.lootXp = (state.activeAdv.lootXp || 0) + (c.xp || 25);
          if (!Array.isArray(state.activeAdv.lootItems)) state.activeAdv.lootItems = [];
        }
        const names = [];
        (c.items || []).forEach(id => {
          if (addToPack(id)) {
            names.push(ITEMS_DB[id].name);
            if (state.activeAdv) state.activeAdv.lootItems.push(id);
          }
        });
        if (typeof rollEncounterVaultDrop === "function") {
          const bonusDrop = rollEncounterVaultDrop(c);
          if (bonusDrop && addToPack(bonusDrop)) {
            names.push(ITEMS_DB[bonusDrop].name);
            if (state.activeAdv) state.activeAdv.lootItems.push(bonusDrop);
          }
        }
        if (c.cw && !state.activeAdv.codewords.includes(c.cw)) state.activeAdv.codewords.push(c.cw);
        const msg = `🏆 Defeated ${c.name}! +${c.xp||25} XP, +${goldAward} GP${names.length?` & ${names.join(", ")}`:""}.`;
        sfx("victory");
        bgm("adventure");
        addLog(msg, "good"); toast(msg, "good");
        activeCombat = null;
        renderAdvPage({ type:"good", text:msg });
        renderSheet();
        return;
      }

      // Check Boss Enrage trigger at <= 50% HP
      if (activeCombat.isBoss && !activeCombat.enraged && activeCombat.hp <= Math.floor(activeCombat.maxHp * DIFFICULTY.bossEnrageThreshold)) {
        activeCombat.enraged = true;
        activeCombat.atk += 1;
        activeCombat.dmg += 2;
        activeCombat.log.unshift(`🔥 ${activeCombat.name} ENRAGES! (+1 ATK, +2 DMG!)`);
      }

      // Enemy Turn (Stun check + Natural 12 Crits + Undead MP Drain + Thorns retaliation)
      if (activeCombat.stunned > 0) {
        activeCombat.stunned--;
        activeCombat.log.unshift(`⚡ ${activeCombat.name} is STUNNED and loses its turn!`);
      } else {
        const d = getDerived(state);
        const heroAc = d.ac + (activeCombat.wildShapeActive ? 3 : 0) + (activeCombat.bardAcTurns > 0 ? 2 : 0);
        const er = roll2d6();
        const atk = activeCombat.atk - (activeCombat.chilled > 0 ? 2 : 0) - (activeCombat.grandHex ? 3 : 0);
        const tot = er.total + atk;
        const enemyCrit = er.total === 12;

        if (tot >= heroAc || enemyCrit) {
          let hitDmg = enemyCrit ? Math.round(activeCombat.dmg * 1.5) : activeCombat.dmg;
          if (activeCombat.rageActive) hitDmg *= 2;
          sfx("enemyHit");
          state.hp = Math.max(0, state.hp - hitDmg);
          let extra = activeCombat.rageActive ? " [🔥 RAGE 2x Taken!]" : "";
          if (activeCombat.undead && state.mp > 0 && roll(6) >= 4) {
            state.mp = Math.max(0, state.mp - 1);
            extra += " (-1 MP drained!)";
          }
          if (subP.thornsDmg > 0) {
            const retDmg = activeCombat.rageActive ? subP.thornsDmg * 2 : subP.thornsDmg;
            activeCombat.hp = Math.max(0, activeCombat.hp - retDmg);
            extra += ` [Retaliated ${retDmg} dmg!]`;
          }
          activeCombat.log.unshift(`💥 ${enemyCrit ? "ENEMY CRIT! " : ""}${activeCombat.name} hits (${tot} vs AC ${heroAc}) for ${hitDmg} dmg!${extra}`);
        } else {
          sfx("shield");
          activeCombat.log.unshift(`🛡️ ${activeCombat.name} misses (${tot} vs AC ${heroAc})!`);
        }
      }

      if (activeCombat.chilled > 0) activeCombat.chilled--;
      if (activeCombat.heroAtkBuffTurns > 0) activeCombat.heroAtkBuffTurns--;
      if (activeCombat.overchargeTurns > 0) activeCombat.overchargeTurns--;
      if (activeCombat.bardAcTurns > 0) activeCombat.bardAcTurns--;
      if (state.shieldTurns > 0) state.shieldTurns--;
      if (state.evadeTurns > 0) state.evadeTurns--;

      if (state.hp <= 0) return triggerDeath(`Slain by ${activeCombat.name}!`);
      if (activeCombat.hp <= 0) return combatAfterPlayer();
      renderCombatPanel();
      renderSheet();
    }

    function renderAdvPage(banner = null) {
      const adv = ADVENTURES[state.activeAdv.id];
      const page = adv.pages[state.activeAdv.page];

      document.getElementById("adv-header-meta").textContent = `${adv.title} • ${page.zone}${state.activeAdv?.torchLit ? " • 🔥 Torch Lit (+2 Checks)" : ""}`;
      document.getElementById("adv-page-title").textContent = page.title;
      document.getElementById("adv-page-num").textContent = state.activeAdv.page;
      const pageTotalEl = document.getElementById("adv-page-total");
      if (pageTotalEl) pageTotalEl.textContent = "";

      const bEl = document.getElementById("adv-roll-banner");
      if (banner?.text) {
        const cls = { good:"bg-emerald-950/90 border-emerald-600/70 text-emerald-100", bad:"bg-red-950/90 border-red-600/70 text-red-100", info:"bg-stone-900 border-amber-600/60 text-amber-100" };
        bEl.className = `mb-5 p-3 rounded-xl border text-xs sm:text-sm font-medium pop-in ${cls[banner.type]||cls.info}`;
        bEl.textContent = banner.text;
        bEl.classList.remove("hidden");
      } else bEl.classList.add("hidden");

      const paras = Array.isArray(page.text) ? page.text : [page.text];
      document.getElementById("adv-prose").innerHTML = paras.map(p => `<p>${p}</p>`).join("");
      document.getElementById("adv-merchant-box").classList.toggle("hidden", !page.merchant || state.activeAdv.dead);

      const dead = state.activeAdv.dead;
      document.getElementById("adv-death-panel").classList.toggle("hidden", !dead);
      document.getElementById("combat-panel").classList.toggle("hidden", !activeCombat || dead);
      if (activeCombat && !dead) renderCombatPanel();

      const endPanel = document.getElementById("adv-ending-panel");
      const chWrap = document.getElementById("adv-choices-wrap");
      if (page.ending && !dead) {
        endPanel.classList.remove("hidden");
        chWrap.classList.add("hidden");
        document.getElementById("ending-title").textContent = page.ending.title;
        document.getElementById("ending-rewards-text").textContent = `Rewards Earned: +${page.ending.xp} XP, +${page.ending.gold} GP, Trophy: ${page.ending.trophy}`;
      } else {
        endPanel.classList.add("hidden");
        chWrap.classList.toggle("hidden", !!activeCombat || dead);
        document.getElementById("btn-retreat-town").classList.toggle("hidden", !page.safeRetreat);
        const list = document.getElementById("adv-choices-list");
        list.innerHTML = "";
        ensureHeroProgressionState(state);
        (page.choices || []).forEach(ch => {
          if (ch.reqSkill && !state.skills.includes(ch.reqSkill)) return;
          if (ch.reqSpell && !state.preparedSpells.includes(ch.reqSpell)) return;
          if (ch.reqCw && !state.activeAdv.codewords.includes(ch.reqCw)) return;
          const sp = !!(ch.reqSkill || ch.reqSpell || ch.reqCw || ch.badge);
          const btn = document.createElement("button");
          btn.className = `w-full text-left px-4 py-3 rounded-xl flex flex-wrap items-center justify-between gap-2 ${sp?"choice-btn choice-btn-special":"choice-btn"}`;
          btn.innerHTML = `<span class="font-story text-base sm:text-lg font-semibold">${ch.t}</span>${ch.badge?`<span class="px-2 py-0.5 rounded bg-[#241910] text-amber-300 text-[11px] font-bold">${ch.badge}</span>`:""}`;
          btn.onclick = () => handleAdvChoice(ch);
          list.appendChild(btn);
        });
      }
    }

    function renderCombatPanel() {
      if (!activeCombat) return;
      document.getElementById("enemy-name").textContent = activeCombat.name;
      document.getElementById("enemy-desc").textContent = activeCombat.desc;
      const effEnemyAc = activeCombat.grandHex ? Math.max(8, activeCombat.ac - 2) : activeCombat.ac;
      const effEnemyAtk = activeCombat.atk - (activeCombat.chilled > 0 ? 2 : 0) - (activeCombat.grandHex ? 3 : 0);
      document.getElementById("enemy-ac").textContent = effEnemyAc;
      document.getElementById("enemy-atk").textContent = `${effEnemyAtk >= 0 ? "+" : ""}${effEnemyAtk}`;
      document.getElementById("enemy-hp-text").textContent = `${activeCombat.hp} / ${activeCombat.maxHp}`;
      document.getElementById("enemy-hp-bar").style.width = `${Math.max(0, Math.round((activeCombat.hp/activeCombat.maxHp)*100))}%`;

      const hd = getDerived(state);
      const chHpTxt = document.getElementById("combat-hero-hp-text");
      const chHpBar = document.getElementById("combat-hero-hp-bar");
      const chMpTxt = document.getElementById("combat-hero-mp-text");
      const chMpBar = document.getElementById("combat-hero-mp-bar");
      if (chHpTxt) chHpTxt.textContent = `${state.hp} / ${hd.maxHp}`;
      if (chHpBar) chHpBar.style.width = `${Math.max(0, Math.min(100, Math.round((state.hp / hd.maxHp) * 100)))}%`;
      if (chMpTxt) chMpTxt.textContent = `${state.mp} / ${hd.maxMp}`;
      if (chMpBar) chMpBar.style.width = `${Math.max(0, Math.min(100, Math.round((state.mp / hd.maxMp) * 100)))}%`;

      const tags = [];
      if (activeCombat.undead) tags.push(`<span class="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/50 text-[10px] text-purple-200">Undead (2x Turn Undead)</span>`);
      if (activeCombat.stunned > 0) tags.push(`<span class="px-2 py-0.5 rounded bg-yellow-950 border border-yellow-500/50 text-[10px] text-yellow-200">Stunned (${activeCombat.stunned}t)</span>`);
      if (activeCombat.chilled > 0) tags.push(`<span class="px-2 py-0.5 rounded bg-sky-950 text-[10px] text-sky-200">Weakened (${activeCombat.chilled}t)</span>`);
      if (activeCombat.dot) tags.push(`<span class="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/50 text-[10px] text-emerald-200">${activeCombat.dot.label} (${activeCombat.dot.dmg}/t, ${activeCombat.dot.turns}t)</span>`);
      if (activeCombat.summon) tags.push(`<span class="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/50 text-[10px] text-purple-200">${activeCombat.summon.icon} ${activeCombat.summon.name} (${activeCombat.summon.dmg}/t, ${activeCombat.summon.turns}t)</span>`);
      if (activeCombat.heroAtkBuffTurns > 0) tags.push(`<span class="px-2 py-0.5 rounded bg-rose-950 text-[10px] text-rose-200">+${activeCombat.heroAtkBuff} ATK (${activeCombat.heroAtkBuffTurns}t)</span>`);
      if (activeCombat.rageActive) tags.push(`<span class="px-2 py-0.5 rounded bg-red-950 border border-red-500/70 text-[10px] text-red-200 font-bold">🔥 RAGE (2x Dealt / 2x Taken)</span>`);
      if (activeCombat.nextSpellDouble) tags.push(`<span class="px-2 py-0.5 rounded bg-sky-950 border border-sky-400/70 text-[10px] text-sky-200 font-bold">🔮 Arcane Surge (2x Next Spell)</span>`);
      if (activeCombat.overchargeTurns > 0) tags.push(`<span class="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-400/70 text-[10px] text-indigo-200 font-bold">☄️ Overcharge (0 MP, +50% Spell, ${activeCombat.overchargeTurns}t)</span>`);
      if (activeCombat.wildShapeActive) tags.push(`<span class="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-400/70 text-[10px] text-emerald-200 font-bold">🐻 Wild Shape (+3 AC, +4 DMG)</span>`);
      if (activeCombat.huntersMark) tags.push(`<span class="px-2 py-0.5 rounded bg-amber-950 border border-amber-400/70 text-[10px] text-amber-200 font-bold">🏹 Hunter's Mark (+3 ATK, +4 DMG, Crit 10+)</span>`);
      if (activeCombat.grandHex) tags.push(`<span class="px-2 py-0.5 rounded bg-fuchsia-950 border border-fuchsia-400/70 text-[10px] text-fuchsia-200 font-bold">🕯️ Grand Hex (-3 ATK, -2 AC, 4/t)</span>`);
      if (activeCombat.bardAcTurns > 0) tags.push(`<span class="px-2 py-0.5 rounded bg-pink-950 border border-pink-400/60 text-[10px] text-pink-200">🎵 Inspired (+2 AC, ${activeCombat.bardAcTurns}t)</span>`);
      if (state.shieldTurns > 0) tags.push(`<span class="px-2 py-0.5 rounded bg-amber-950 text-[10px] text-amber-200">Ward (+3 AC)</span>`);
      document.getElementById("combat-tags").innerHTML = tags.join("");

      const fleeBtn = document.getElementById("btn-c-flee");
      fleeBtn.disabled = !activeCombat.flee;
      fleeBtn.classList.toggle("opacity-40", !activeCombat.flee);

      const torchBtn = document.getElementById("btn-c-torch");
      if (torchBtn) {
        const torchCount = state.backpack.reduce((sum, e) => sum + (getEntryId(e) === "torch" ? getEntryQty(e) : 0), 0);
        torchBtn.disabled = torchCount <= 0;
        torchBtn.classList.toggle("opacity-40", torchCount <= 0);
        torchBtn.textContent = torchCount > 0 ? `🔥 Torch (${torchCount})` : "🔥 Torch";
      }

      const abRow = document.getElementById("combat-abilities");
      if (abRow) {
        abRow.innerHTML = "";
        const classAb = getHeroClassAbility(state);
        if (classAb) {
          const used = !!state.activeAdv?.classAbilityUsed;
          const b = document.createElement("button");
          b.className = `px-3 py-1 rounded-lg text-xs font-bold border shadow-sm ${!used ? "bg-amber-950 hover:bg-amber-900 border-amber-400/80 text-amber-200" : "bg-stone-900 border-stone-800 text-stone-500"}`;
          b.disabled = used;
          b.title = classAb.desc;
          b.textContent = `${classAb.icon} ${classAb.name} (${used ? "Used This Quest" : "1/Quest"})`;
          b.onclick = () => combatClassAbility(classAb);
          abRow.appendChild(b);
        }
        const activeAbs = getUnlockedSubclassAbilities(state).filter(ab => ab.type === "active");
        activeAbs.forEach(ab => {
          const cost = ab.mp || 0;
          const used = ab.oncePerCombat && activeCombat.usedAbilities.includes(ab.name);
          const ok = !used && state.mp >= cost;
          const b = document.createElement("button");
          b.className = `px-2.5 py-1 rounded-lg text-xs font-semibold border ${ok?"bg-purple-950 hover:bg-purple-900 border-purple-500/60 text-purple-200":"bg-stone-900 border-stone-800 text-stone-500"}`;
          b.disabled = !ok;
          b.title = ab.desc;
          const tag = used ? "Used" : (cost > 0 ? `${cost} MP` : "1/Combat");
          b.textContent = `${ab.icon || "🌟"} ${ab.name} (${tag})`;
          b.onclick = () => combatSubclassAbility(ab);
          abRow.appendChild(b);
        });
      }

      const spRow = document.getElementById("combat-spells");
      spRow.innerHTML = "";
      ensureHeroProgressionState(state);
      let shownCombatSpells = 0;
      state.preparedSpells.forEach(n => {
        const sp = SPELLS_LIST.find(s => s.name === n);
        if (!sp || !sp.combat) return;
        shownCombatSpells++;
        const mpCost = getEffectiveSpellMp(sp, state);
        const ok = state.mp >= mpCost;
        const b = document.createElement("button");
        b.className = `px-2.5 py-1 rounded-lg text-xs font-semibold border ${ok?"bg-sky-950 hover:bg-sky-900 border-sky-500/50 text-sky-200":"bg-stone-900 border-stone-800 text-stone-500"}`;
        b.disabled = !ok;
        b.textContent = `${sp.icon || "✨"} ${sp.name} (${mpCost} MP)`;
        b.onclick = () => combatSpell(sp.name);
        spRow.appendChild(b);
      });
      if (shownCombatSpells === 0) {
        spRow.innerHTML = `<span class="text-[11px] text-stone-500 italic">No combat spells prepared (swap prepared spells in Oakhaven).</span>`;
      }
      document.getElementById("combat-log").innerHTML = activeCombat.log.map(l => `<div>${l}</div>`).join("");
    }

    /* ------------------------------------------------------------
       10. CHARACTER SHEET SIDEBAR & LOG RENDERERS
       ------------------------------------------------------------ */
    function renderSheet() {
      if (!state) return;
      const d = getDerived(state);
      if (state.hp > d.maxHp) state.hp = d.maxHp;
      if (state.mp > d.maxMp) state.mp = d.maxMp;
      if (state.currentLuck > d.maxLuck) state.currentLuck = d.maxLuck;

      document.getElementById("hdr-completed-count").textContent = Object.keys(state.completedQuests).length;
      document.getElementById("sheet-name").textContent = state.name;
      const racePart = state.raceName ? `${state.raceName} • ` : "";
      const subPart = state.subclassName ? ` (${state.subclassName})` : "";
      document.getElementById("sheet-class").textContent = `${racePart}${state.className}${subPart}`;
      const tokPaths = getHeroTokenPaths(state);
      const sht = document.getElementById("sheet-hero-token");
      if (sht) setImgWithFallback(sht, tokPaths.primarySrc, tokPaths.fallbackSrc);
      if (state.level > MAX_HERO_LEVEL) { state.level = MAX_HERO_LEVEL; state.xp = 0; }
      document.getElementById("sheet-level").textContent = state.level;
      document.getElementById("sheet-gold").textContent = state.gold;

      document.getElementById("sheet-hp-text").textContent = `${state.hp} / ${d.maxHp}`;
      document.getElementById("sheet-hp-bar").style.width = `${Math.max(0, Math.round((state.hp/d.maxHp)*100))}%`;
      document.getElementById("sheet-mp-text").textContent = `${state.mp} / ${d.maxMp}`;
      document.getElementById("sheet-mp-bar").style.width = `${Math.max(0, Math.round((state.mp/d.maxMp)*100))}%`;
      if (state.level >= MAX_HERO_LEVEL) {
        document.getElementById("sheet-xp-text").textContent = "MAX LEVEL";
        document.getElementById("sheet-xp-bar").style.width = "100%";
      } else {
        const xpNeed = state.level * 100;
        document.getElementById("sheet-xp-text").textContent = `${state.xp} / ${xpNeed}`;
        document.getElementById("sheet-xp-bar").style.width = `${Math.min(100, Math.round((state.xp/xpNeed)*100))}%`;
      }

      document.getElementById("sheet-ac").textContent = d.ac;
      document.getElementById("sheet-atk").textContent = `+${d.atk}`;
      document.getElementById("sheet-luck").textContent = `${state.currentLuck}/${d.maxLuck}`;

      const ptsBanner = document.getElementById("stat-points-banner");
      ptsBanner.classList.toggle("hidden", state.unspentStatPts <= 0);
      document.getElementById("unspent-pts").textContent = state.unspentStatPts;

      const sRow = document.getElementById("sheet-stats-row");
      sRow.innerHTML = "";
      [["might","STR","text-rose-300"],["agility","DEX","text-emerald-300"],["arcana","INT","text-sky-300"],["spirit","WIS","text-amber-300"],["luck","LCK","text-purple-300"]].forEach(([k,lbl,col]) => {
        const box = document.createElement("div");
        box.className = "p-1.5 rounded-lg bg-stone-950 border border-stone-800";
        box.innerHTML = `<div class="text-[9px] text-stone-400 font-semibold">${lbl}</div>
          <div class="font-display text-sm font-bold ${col}">${d.s[k]}</div>
          ${state.unspentStatPts>0 ? `<button class="mt-0.5 w-full rounded bg-emerald-800 hover:bg-emerald-700 text-[10px] font-bold text-white">+</button>` : ""}`;
        const plus = box.querySelector("button");
        if (plus) plus.onclick = () => {
          state.baseStats[k]++;
          if (k === "luck") state.currentLuck++;
          state.unspentStatPts--;
          toast(`Increased ${lbl} by +1!`, "good");
          renderSheet();
        };
        sRow.appendChild(box);
      });

      // Equipment 5 slots
      const eqEl = document.getElementById("equipment-slots");
      eqEl.innerHTML = "";
      [["weapon","Weapon"],["armor","Armor"],["offhand","Off-Hand"],["accessory","Ring/Amulet"],["cloak","Cloak/Boots"]].forEach(([k,lbl]) => {
        const it = state.equipment[k] ? ITEMS_DB[state.equipment[k]] : null;
        const r = document.createElement("div");
        r.className = "flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs";
        r.innerHTML = `<div class="min-w-0"><span class="text-[9px] uppercase text-stone-500 block">${lbl}</span>
          <span class="${it?"text-amber-200 font-semibold":"text-stone-600 italic"} truncate block">${it?`${it.name} <span class="text-[10px] text-stone-400 font-normal">(${it.desc})</span>`:"Empty"}</span></div>
          ${it?`<button class="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-[10px] text-stone-300 shrink-0">Unequip</button>`:""}`;
        const u = r.querySelector("button");
        if (u) u.onclick = () => {
          if (!addToPack(state.equipment[k])) return;
          state.equipment[k] = null;
          renderSheet();
        };
        eqEl.appendChild(r);
      });

      // Backpack 12 slots
      document.getElementById("backpack-count").textContent = `${state.backpack.length} / 12 Slots`;
      const bpEl = document.getElementById("backpack-grid");
      bpEl.innerHTML = "";
      if (!state.backpack.length) bpEl.innerHTML = `<div class="text-xs text-stone-500 italic p-2 text-center">Backpack empty.</div>`;
      else state.backpack.forEach((entry, i) => {
        const id = getEntryId(entry);
        const qty = getEntryQty(entry);
        const it = ITEMS_DB[id];
        if (!it) return;
        const equippable = ["weapon","armor","offhand","accessory","cloak"].includes(it.type);
        const usable = it.type === "consumable";
        const isSchematic = it.type === "schematic";
        const isSpellScroll = it.type === "spell_scroll";
        const inTown = state.mode === "town";
        const rarityBadge = typeof getRarityBadgeHtml === "function" ? getRarityBadgeHtml(it.rarity) : "";
        const qtyBadge = qty > 1 ? `<span class="px-1.5 py-0.5 rounded bg-amber-900/80 border border-amber-500/60 text-[10px] font-bold text-amber-200">x${qty}</span>` : "";

        const r = document.createElement("div");
        r.className = "flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-lg bg-stone-950 border border-stone-800 text-xs cursor-grab active:cursor-grabbing transition";
        r.innerHTML = `<div class="min-w-0">
            <div class="flex items-center gap-1.5">
              <span class="text-stone-100 font-semibold truncate">${it.name}</span>
              ${qtyBadge}
              <span class="text-amber-400/80 text-[10px]">(${it.value * qty}g)</span>
              ${rarityBadge}
            </div>
            <div class="text-[10px] text-stone-400 truncate">${it.desc}</div>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            ${equippable?`<button data-act="eq" class="px-1.5 py-0.5 rounded bg-amber-900/70 hover:bg-amber-800 text-[10px] text-amber-100">Eq</button>`:""}
            ${usable?`<button data-act="use" class="px-1.5 py-0.5 rounded bg-emerald-900/70 hover:bg-emerald-800 text-[10px] text-emerald-100">Use</button>`:""}
            ${isSchematic?`<button data-act="learn" class="px-1.5 py-0.5 rounded bg-purple-900/80 hover:bg-purple-800 text-[10px] text-purple-100 font-bold">📜 Learn</button>`:""}
            ${isSpellScroll?`<button data-act="learn_spell" class="px-1.5 py-0.5 rounded bg-sky-900/80 hover:bg-sky-800 text-[10px] text-sky-100 font-bold">✨ Learn</button>`:""}
            ${inTown?`<button data-act="stash" class="px-1.5 py-0.5 rounded bg-sky-900/70 hover:bg-sky-800 text-[10px] text-sky-100" title="Deposit to Stash">Vault</button>`:""}
            <button data-act="drop" class="px-1.5 py-0.5 rounded bg-stone-800 hover:bg-red-900 text-[10px] text-stone-400">✕</button>
          </div>`;

        attachStackInteractions(r, "backpack", i);

        r.querySelectorAll("button").forEach(b => b.onclick = () => {
          const act = b.dataset.act;
          if (act === "eq") {
            const prev = state.equipment[it.type];
            state.equipment[it.type] = id;
            state.backpack.splice(i, 1);
            if (prev) state.backpack.push(prev);
            sfx("equip");
            toast(`Equipped ${it.name}!`, "gold");
          } else if (act === "use") {
            if (id === "torch") {
              if (activeCombat) {
                combatItem("torch");
                return;
              }
              if (state.mode !== "adventure" || !state.activeAdv) {
                toast("Save your Pitch Torch for a dungeon! Light it during a quest for +2 to all Skill Checks, or hurl it in combat.", "info");
                return;
              }
              if (state.activeAdv.torchLit) {
                toast("Your Pitch Torch is already lit (+2 to all Skill Checks this quest)!", "info");
                return;
              }
              consumeOneFromSlot("backpack", i);
              const curD = getDerived(state);
              state.activeAdv.torchLit = true;
              state.hp = Math.min(curD.maxHp, state.hp + 4);
              sfx("heal");
              toast("🔥 Lit Pitch Torch! +2 to ALL Skill Checks for this quest (+4 HP warmth)!", "gold");
              addLog("Lit a Pitch Torch (+2 to all Skill Checks for this quest, +4 HP warmth).", "gold");
              renderAdvPage();
              renderSheet();
              return;
            }
            consumeOneFromSlot("backpack", i);
            const curD = getDerived(state);
            if (it.healHp) state.hp = Math.min(curD.maxHp, state.hp + it.healHp);
            if (it.healMp) state.mp = Math.min(curD.maxMp, state.mp + it.healMp);
            sfx("potion");
            toast(`Used ${it.name}!`, "good");
          } else if (act === "learn") {
            if (!Array.isArray(state.unlockedRecipes)) state.unlockedRecipes = [];
            if (state.unlockedRecipes.includes(it.unlocksRecipe)) {
              toast("You already know this recipe! Sell the extra schematic in Town.", "info");
              return;
            }
            state.unlockedRecipes.push(it.unlocksRecipe);
            state.backpack.splice(i, 1);
            const targetName = ITEMS_DB[it.unlocksRecipe]?.name || it.name;
            sfx("scroll");
            toast(`📜 Unlocked Forge Recipe: ${targetName}!`, "gold");
            addLog(`Learned Forge Schematic: ${targetName}!`, "gold");
            if (currentDistrict === "forge" && buildingModalOpen) renderTown();
          } else if (act === "learn_spell") {
            ensureHeroProgressionState(state);
            const spellName = it.unlocksSpell;
            if (!spellName) return;
            if (state.spells.includes(spellName)) {
              toast("You already know this spell! Sell the extra scroll in Town.", "info");
              return;
            }
            state.spells.push(spellName);
            if (state.preparedSpells.length < MAX_PREPARED_SPELLS) {
              state.preparedSpells.push(spellName);
            }
            consumeOneFromSlot("backpack", i);
            sfx("scroll");
            toast(`✨ Learned Spell from Scroll: ${spellName}!`, "info");
            addLog(`Learned Spell from Scroll: ${spellName}!`, "gold");
            if (currentDistrict === "guild" && buildingModalOpen) renderTown();
          } else if (act === "stash") {
            const added = addItemToAnyStashTab(id, qty);
            if (added <= 0) return toast("All Stash Tabs are full!", "bad");
            if (added >= qty) state.backpack.splice(i, 1);
            else state.backpack[i] = { id, qty: qty - added };
            toast(`Stored ${added}x ${it.name} in Personal Vault.`, "info");
            if (currentDistrict === "stash") renderTown();
          } else if (act === "drop") {
            state.backpack.splice(i, 1);
          }
          renderSheet();
        });
        bpEl.appendChild(r);
      });

      // Class Signature Ability (1/Quest) + Subclass Abilities (Lv 1 / Lv 5 / Lv 10)
      const subAbEl = document.getElementById("sheet-subclass-abilities");
      if (subAbEl) {
        subAbEl.innerHTML = "";
        const classAb = getHeroClassAbility(state);
        if (classAb) {
          const usedThisQuest = state.mode === "adventure" && !!state.activeAdv?.classAbilityUsed;
          const sigCard = document.createElement("div");
          sigCard.className = `p-2 rounded-lg border text-xs ${usedThisQuest ? "bg-stone-950 border-stone-800 opacity-65" : "bg-amber-950/35 border-amber-500/60"}`;
          sigCard.innerHTML = `
            <div class="flex items-center justify-between gap-1.5">
              <span class="font-bold ${usedThisQuest ? "text-stone-400" : "text-amber-300"}">${classAb.icon} ${classAb.name}</span>
              <span class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 ${usedThisQuest ? "bg-stone-800 text-stone-400" : "bg-amber-900/80 text-amber-200"}">${usedThisQuest ? "Used (1/Quest)" : "Ready (1/Quest)"}</span>
            </div>
            <div class="text-[10px] text-stone-300 mt-0.5">${classAb.desc}</div>`;
          subAbEl.appendChild(sigCard);
        }
        const sub = getHeroSubclass(state);
        if (!sub || !Array.isArray(sub.abilities) || !sub.abilities.length) {
          if (!classAb) subAbEl.innerHTML = `<div class="text-xs text-stone-500 italic">No subclass abilities active.</div>`;
        } else {
          sub.abilities.forEach(ab => {
            const unlocked = (state.level || 1) >= ab.level;
            const canUseOoc = unlocked && ab.ooc && !activeCombat;
            const card = document.createElement("div");
            card.className = `p-2 rounded-lg border text-xs ${unlocked ? "bg-purple-950/35 border-purple-500/50" : "bg-stone-950 border-stone-800 opacity-60"}`;
            card.innerHTML = `
              <div class="flex items-center justify-between gap-1.5">
                <span class="font-bold ${unlocked ? "text-purple-200" : "text-stone-400"}">${ab.icon || "✨"} ${ab.name}</span>
                <div class="flex items-center gap-1 shrink-0">
                  <span class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${unlocked ? "bg-emerald-900/80 text-emerald-200" : "bg-stone-800 text-stone-400"}">${unlocked ? `Lv.${ab.level}` : `🔒 Lv.${ab.level}`}</span>
                  ${canUseOoc ? `<button class="px-2 py-0.5 rounded bg-purple-800 hover:bg-purple-700 text-purple-100 text-[10px] font-bold">Use${ab.mp ? ` (${ab.mp} MP)` : ""}</button>` : ""}
                </div>
              </div>
              <div class="text-[10px] text-stone-400 mt-0.5">${ab.desc}</div>`;
            const useBtn = card.querySelector("button");
            if (useBtn) useBtn.onclick = () => useOocSubclassAbility(ab);
            subAbEl.appendChild(card);
          });
        }
      }

      // Skills & Spells
      document.getElementById("sheet-skills").innerHTML = state.skills.map(n => {
        const s = SKILLS_LIST.find(x => x.name === n);
        return `<div class="p-2 rounded-lg bg-stone-950 border border-stone-800 text-xs"><div class="font-bold text-amber-300">${s.name}</div><div class="text-[10px] text-stone-400">${s.desc}</div></div>`;
      }).join("");

      ensureHeroProgressionState(state);
      const spEl = document.getElementById("sheet-spells");
      spEl.innerHTML = "";
      const inTownNow = state.mode === "town";
      const prepHdr = document.createElement("div");
      prepHdr.className = "flex items-center justify-between text-[10px] px-2 py-1 rounded-lg bg-stone-950/80 border border-sky-800/40 text-sky-300 mb-1.5";
      prepHdr.innerHTML = `<span>Prepared Spells: <strong>${state.preparedSpells.length} / ${MAX_PREPARED_SPELLS}</strong></span>
        <span class="text-stone-400">${inTownNow ? "Swap freely in Town" : "Locked while adventuring"}</span>`;
      spEl.appendChild(prepHdr);

      state.spells.forEach(n => {
        const sp = SPELLS_LIST.find(x => x.name === n);
        if (!sp) return;
        const isPrepared = state.preparedSpells.includes(n);
        const r = document.createElement("div");
        r.className = `p-2 rounded-lg border text-xs flex items-center justify-between gap-2 ${isPrepared ? "bg-sky-950/35 border-sky-500/50" : "bg-stone-950 border-stone-800 opacity-75"}`;
        r.innerHTML = `<div class="min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="font-bold ${isPrepared ? "text-sky-300" : "text-stone-300"}">${sp.icon || "✨"} ${sp.name} (${sp.mp} MP)</span>
              ${isPrepared ? `<span class="px-1.5 py-0.5 rounded bg-sky-900/80 text-sky-200 text-[9px] font-bold uppercase">Prepared</span>` : `<span class="px-1.5 py-0.5 rounded bg-stone-800 text-stone-400 text-[9px] uppercase">Unprepared</span>`}
            </div>
            <div class="text-[10px] text-stone-400 mt-0.5">${sp.desc}</div>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            ${inTownNow ? `<button data-act="prep" class="px-2 py-1 rounded text-[10px] font-bold ${isPrepared ? "bg-stone-800 hover:bg-stone-700 text-stone-300" : "bg-amber-900/70 hover:bg-amber-800 text-amber-100"}">${isPrepared ? "Unprepare" : "Prepare"}</button>` : ""}
            ${sp.ooc && !activeCombat && isPrepared ? `<button data-act="cast" class="px-2 py-1 rounded bg-sky-900 hover:bg-sky-800 text-sky-100 text-[10px] font-bold">Cast</button>` : ""}
          </div>`;

        const pb = r.querySelector('[data-act="prep"]');
        if (pb) pb.onclick = () => {
          if (state.mode !== "town") return toast("You can only change prepared spells while in Oakhaven!", "bad");
          if (isPrepared) {
            state.preparedSpells = state.preparedSpells.filter(x => x !== n);
            toast(`Unprepared ${sp.name}.`, "info");
          } else {
            if (state.preparedSpells.length >= MAX_PREPARED_SPELLS) {
              return toast(`You can only prepare up to ${MAX_PREPARED_SPELLS} spells! Unprepare one first.`, "bad");
            }
            state.preparedSpells.push(n);
            toast(`Prepared ${sp.name}!`, "good");
          }
          renderSheet();
        };

        const cb = r.querySelector('[data-act="cast"]');
        if (cb) cb.onclick = () => {
          if (!state.preparedSpells.includes(n)) return toast(`${sp.name} must be prepared to cast!`, "bad");
          if (state.mp < sp.mp) return toast(`Need ${sp.mp} MP!`, "bad");
          state.mp -= sp.mp;
          const curD = getDerived(state);
          if (sp.healDice || sp.healBase) {
            const statVal = curD.s[sp.healStat || sp.stat || "spirit"] || 0;
            const bonus = (sp.healBonus || 0) + (sp.healBase || 0);
            const dr = sp.healDice ? rollDiceSpec(sp.healDice) : { total: 0, label: "" };
            const h = dr.total + bonus + statVal;
            state.hp = Math.min(curD.maxHp, state.hp + h);
            sfx("heal");
            toast(`${sp.name} ${dr.label} (+${h} HP)!`, "good");
          }
          if (sp.shieldTurns) {
            state.shieldTurns = Math.max(state.shieldTurns, sp.shieldTurns);
            sfx("shield");
            toast(`${sp.name} (+3 AC for ${sp.shieldTurns} turns)!`, "info");
          }
          renderSheet();
        };
        spEl.appendChild(r);
      });

      // Quests & Flags
      const cqEl = document.getElementById("sheet-completed-quests");
      const doneEntries = Object.entries(state.completedQuests);
      cqEl.innerHTML = !doneEntries.length ? `<div class="text-stone-500 italic">None completed yet.</div>` :
        doneEntries.map(([id, tr]) => `<div class="text-emerald-300">🏆 ${ADVENTURES[id]?.title} <span class="text-stone-400">(${tr})</span></div>`).join("");

      const cws = state.activeAdv?.codewords || [];
      document.getElementById("sheet-codewords").innerHTML = !cws.length
        ? `<span class="text-xs text-stone-500 italic">None active.</span>`
        : cws.map(w => `<span class="px-2 py-0.5 rounded bg-amber-950 border border-amber-600/40 text-[10px] font-mono text-amber-300">${w}</span>`).join("");

      document.getElementById("sheet-vault-gold").textContent = `${state.vaultGold} GP`;
      const allStashTabs = ensureStashTabs();
      const totalStashed = allStashTabs.reduce((sum, t) => sum + t.length, 0);
      document.getElementById("sheet-vault-items").textContent = `${totalStashed} / ${allStashTabs.length * 20} (${allStashTabs.length} Tab${allStashTabs.length === 1 ? "" : "s"})`;
      document.getElementById("sheet-kills").textContent = state.kills;
      document.getElementById("sheet-deaths").textContent = state.deaths;
    }

    function renderLog() {
      const el = document.getElementById("adventure-log");
      if (!state?.log.length) {
        el.innerHTML = `<div class="text-stone-500 italic">Chronicle awaits...</div>`;
        return;
      }
      const c = {
        good: "text-emerald-300",
        bad: "text-rose-300",
        gold: "text-amber-300",
        info: "text-sky-300",
        normal: "text-stone-300"
      };
      el.innerHTML = state.log
        .map(entry => `<div class="${c[entry.type] || c.normal}">${entry.text}</div>`)
        .join("");
    }

    /* ------------------------------------------------------------
       11. MID-DUNGEON MERCHANT MODAL (VEXX'S STALL)
       ------------------------------------------------------------ */
    function openDungeonMerchant() {
      document.getElementById("modal-dungeon-merchant").classList.remove("hidden");
      renderDungeonMerchant();
    }

    function renderDungeonMerchant() {
      document.getElementById("dm-gold").textContent = state.gold;

      const buyEl = document.getElementById("dm-buy");
      buyEl.innerHTML = "";
      SHOPS.vexx_dungeon.stock.forEach(entry => {
        const it = ITEMS_DB[entry.id];
        const ok = state.gold >= entry.price && state.backpack.length < 12;
        const r = document.createElement("div");
        r.className = "flex items-center justify-between gap-2 p-2 rounded-lg bg-stone-950 border border-stone-800 text-xs";
        r.innerHTML = `<div><div class="font-bold text-amber-200">${it.name}</div><div class="text-[10px] text-stone-400">${it.desc}</div></div>
          <button class="px-2.5 py-1 rounded-lg font-bold shrink-0 ${ok ? "btn-gold" : "bg-stone-800 text-stone-500"}" ${ok ? "" : "disabled"}>${entry.price} GP</button>`;
        r.querySelector("button").onclick = () => {
          if (!addToPack(entry.id)) return;
          state.gold -= entry.price;
          sfx("coin");
          toast(`Bought ${it.name} from Vexx!`, "gold");
          addLog(`Bought ${it.name} from Vexx (-${entry.price} GP).`, "gold");
          renderDungeonMerchant();
          renderSheet();
        };
        buyEl.appendChild(r);
      });

      const sellEl = document.getElementById("dm-sell");
      sellEl.innerHTML = "";
      if (!state.backpack.length) {
        sellEl.innerHTML = `<div class="text-xs text-stone-500 italic p-3 text-center">Backpack empty.</div>`;
      } else {
        state.backpack.forEach((entry, i) => {
          const id = getEntryId(entry);
          const qty = getEntryQty(entry);
          const it = ITEMS_DB[id];
          if (!it) return;
          const r = document.createElement("div");
          r.className = "flex items-center justify-between gap-2 p-2 rounded-lg bg-stone-950 border border-stone-800 text-xs";
          r.innerHTML = `<div><div class="font-bold text-stone-200">${it.name}${qty > 1 ? ` <span class="text-amber-300">x${qty}</span>` : ""}</div><div class="text-[10px] text-stone-400">${it.desc}</div></div>
            <div class="flex items-center gap-1 shrink-0">
              ${qty > 1 ? `<button data-sell="1" class="px-2 py-1 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-emerald-100 font-bold">Sell 1 (+${it.value}g)</button>` : ""}
              <button data-sell="all" class="px-2.5 py-1 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-100 font-bold">+${it.value * qty} GP</button>
            </div>`;
          r.querySelectorAll("button").forEach(b => b.onclick = () => {
            const sellQty = b.dataset.sell === "1" ? 1 : qty;
            if (sellQty >= qty) state.backpack.splice(i, 1);
            else state.backpack[i] = { id, qty: qty - sellQty };
            state.gold += it.value * sellQty;
            sfx("coin");
            toast(`Sold ${sellQty}x ${it.name} for ${it.value * sellQty} GP!`, "good");
            if (typeof renderDungeonMerchant === "function" && !document.getElementById("modal-dungeon-merchant").classList.contains("hidden")) {
              renderDungeonMerchant();
            } else {
              renderDistrictMarket(box);
            }
            renderSheet();
          });
          sellEl.appendChild(r);
        });
      }
    }

    /* ------------------------------------------------------------
       12. SAVE / LOAD, EXPORT / IMPORT & SCREEN NAVIGATION
       ------------------------------------------------------------ */
    function showCreationScreen() {
      activeCombat = null;
      closeBuildingModal();
      document.getElementById("launch-screen")?.classList.add("hidden");
      document.getElementById("sheet-sidebar")?.classList.add("hidden");
      document.getElementById("main-screen").classList.add("hidden");
      document.getElementById("creation-screen").classList.remove("hidden");
      document.getElementById("btn-save")?.classList.add("hidden");
      document.getElementById("header-quests-badge")?.classList.add("hidden");
      document.getElementById("btn-toggle-sheet")?.classList.add("hidden");
      initCreation();
    }

    function getSaveSlots() {
      let slots = [null, null, null, null, null];
      try {
        const raw = localStorage.getItem(SAVE_SLOTS_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            for (let i = 0; i < MAX_SAVE_SLOTS; i++) slots[i] = parsed[i] || null;
          }
        } else {
          // One-time migration from legacy single-slot SAVE_KEY into Slot 1
          const legacy = localStorage.getItem(SAVE_KEY);
          if (legacy) {
            const parsedLegacy = JSON.parse(legacy);
            if (parsedLegacy && parsedLegacy.name && parsedLegacy.baseStats) {
              slots[0] = parsedLegacy;
              localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots));
            }
          }
        }
      } catch (_) {}
      return slots;
    }

    function writeSaveSlots(slots) {
      localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots));
      if (window.OAKHAVEN_CLOUD) window.OAKHAVEN_CLOUD.pushSlotsToCloud(slots);
    }

    function saveToSlot(slotIdx, silent = false) {
      if (!state) return;
      const idx = Math.max(0, Math.min(MAX_SAVE_SLOTS - 1, slotIdx));
      try {
        const slots = getSaveSlots();
        activeSaveSlot = idx;
        slots[idx] = { ...state, savedAt: new Date().toLocaleString() };
        writeSaveSlots(slots);
        localStorage.setItem(SAVE_KEY, JSON.stringify(slots[idx]));
        if (!silent) {
          sfx("scroll");
          toast(`Saved ${state.name} to Slot ${idx + 1}!`, "good");
        }
      } catch (err) {
        if (!silent) toast("Could not save to LocalStorage.", "bad");
      }
    }

    function loadFromSlot(slotIdx) {
      const slots = getSaveSlots();
      const chosen = slots[slotIdx];
      if (!chosen) return toast(`Slot ${slotIdx + 1} is empty.`, "info");
      try {
        activeSaveSlot = slotIdx;
        applyLoadedState(chosen);
        document.getElementById("modal-slots")?.classList.add("hidden");
        toast(`Loaded ${state.name} (Slot ${slotIdx + 1})!`, "good");
      } catch (err) {
        toast(`Failed to load Slot ${slotIdx + 1}.`, "bad");
      }
    }

    function deleteSlot(slotIdx) {
      const slots = getSaveSlots();
      const target = slots[slotIdx];
      if (!target) return;
      if (!confirm(`Delete "${target.name}" from Slot ${slotIdx + 1}? This cannot be undone.`)) return;
      slots[slotIdx] = null;
      writeSaveSlots(slots);
      toast(`Cleared Slot ${slotIdx + 1}.`, "info");
      initLaunchScreen();
      renderSlotsModal();
    }

    function renderSlotRow(slotData, idx, mode) {
      const row = document.createElement("div");
      const isCurrent = state && activeSaveSlot === idx && mode === "modal";
      if (slotData && slotData.name && slotData.baseStats) {
        const tokPaths = getHeroTokenPaths(slotData);
        const racePart = slotData.raceName ? `${slotData.raceName} ` : "";
        const subPart = slotData.subclassName ? ` (${slotData.subclassName})` : "";
        const doneCount = Object.keys(slotData.completedQuests || {}).length;
        row.className = `p-3 rounded-xl bg-stone-950/90 border ${isCurrent ? "border-emerald-500/70" : "border-amber-700/40"} flex items-center justify-between gap-2.5`;
        row.innerHTML = `
          <div class="flex items-center gap-2.5 min-w-0">
            <img src="${tokPaths.primarySrc}" onerror="this.onerror=null;this.src='${tokPaths.fallbackSrc}'" alt="" class="w-11 h-11 rounded-full object-cover shadow shrink-0" />
            <div class="min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-stone-800 text-amber-300">Slot ${idx + 1}</span>
                ${isCurrent ? `<span class="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600/50">Active</span>` : ""}
              </div>
              <div class="font-display text-sm font-bold text-amber-100 truncate mt-0.5">${slotData.name}</div>
              <div class="text-[10px] text-stone-400 truncate">Lv.${slotData.level || 1} ${racePart}${slotData.className || ""}${subPart} • ${doneCount} Quests</div>
            </div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <button data-act="load" class="px-2.5 py-1.5 rounded-lg btn-gold text-[11px] font-display uppercase">▶ Play</button>
            ${mode === "modal" && state ? `<button data-act="save" class="px-2 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-600/50 text-[10px] font-semibold text-emerald-200">Save</button>` : ""}
            <button data-act="del" class="px-2 py-1.5 rounded-lg bg-stone-800 hover:bg-red-900 text-[10px] text-stone-400 hover:text-red-200" title="Delete Slot">✕</button>
          </div>`;
        row.querySelector('[data-act="load"]').onclick = () => loadFromSlot(idx);
        const sb = row.querySelector('[data-act="save"]');
        if (sb) sb.onclick = () => { saveToSlot(idx); renderSlotsModal(); };
        row.querySelector('[data-act="del"]').onclick = () => deleteSlot(idx);
      } else {
        row.className = "p-3 rounded-xl bg-stone-950/60 border border-dashed border-stone-700 flex items-center justify-between gap-2.5";
        row.innerHTML = `
          <div class="flex items-center gap-2.5">
            <span class="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">Slot ${idx + 1}</span>
            <span class="text-xs text-stone-500 italic">Empty Hero Slot</span>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            ${mode === "modal" && state ? `<button data-act="save" class="px-2.5 py-1.5 rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-600/50 text-[11px] font-semibold text-emerald-200">💾 Save Here</button>` : ""}
            <button data-act="new" class="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-amber-900/60 border border-amber-600/40 text-[11px] font-semibold text-amber-200">⚔ Create</button>
          </div>`;
        const sb = row.querySelector('[data-act="save"]');
        if (sb) sb.onclick = () => { saveToSlot(idx); renderSlotsModal(); };
        row.querySelector('[data-act="new"]').onclick = () => {
          activeSaveSlot = idx;
          document.getElementById("modal-slots")?.classList.add("hidden");
          showCreationScreen();
        };
      }
      return row;
    }

    function initLaunchScreen() {
      const list = document.getElementById("launch-slots-list");
      if (!list) return;
      list.innerHTML = "";
      const slots = getSaveSlots();
      slots.forEach((slotData, idx) => {
        list.appendChild(renderSlotRow(slotData, idx, "launch"));
      });
    }

    function renderSlotsModal() {
      const list = document.getElementById("modal-slots-list");
      if (!list) return;
      list.innerHTML = "";
      const slots = getSaveSlots();
      slots.forEach((slotData, idx) => {
        list.appendChild(renderSlotRow(slotData, idx, "modal"));
      });
    }

    function openSlotsModal() {
      renderSlotsModal();
      document.getElementById("modal-slots")?.classList.remove("hidden");
    }

    function applyLoadedState(loaded) {
      if (!loaded || !loaded.name || !loaded.baseStats) {
        throw new Error("Invalid save data format.");
      }
      if (!loaded.townPos) loaded.townPos = { x: 11, y: 11 };
      if (!Array.isArray(loaded.discoveredQuests)) loaded.discoveredQuests = ["malakor"];
      Object.values(ADVENTURES).forEach(adv => {
        if (adv.autoDiscover && !loaded.discoveredQuests.includes(adv.id)) {
          loaded.discoveredQuests.push(adv.id);
        }
      });
	  loaded.backpack = compactContainerStacks(loaded.backpack || [], 12);
      const loadedTabs = ensureStashTabs(loaded);
      loaded.stashTabs = loadedTabs.map(tab => compactContainerStacks(tab, 20));
      loaded.stash = loaded.stashTabs[0];
      ensureHeroProgressionState(loaded);
      state = loaded;
      activeCombat = null;
      showMainScreen();
      if (state.mode === "adventure" && state.activeAdv && ADVENTURES[state.activeAdv.id]) {
        closeBuildingModal();
        document.getElementById("town-hub-view").classList.add("hidden");
        document.getElementById("adventure-view").classList.remove("hidden");
        const page = ADVENTURES[state.activeAdv.id].pages[state.activeAdv.page];
        if (page && page.enemy && !state.activeAdv.defeated.includes(state.activeAdv.page) && !state.activeAdv.dead) {
          initCombat(page.enemy, state.activeAdv.page);
        }
        renderAdvPage({ type: "info", text: `Loaded saved chronicle for ${state.name}.` });
      } else {
        enterTown(currentDistrict || "square", false);
      }
      renderSheet();
      renderLog();
    }

    function saveGame() {
      if (!state) return;
      saveToSlot(activeSaveSlot, false);
    }

    function loadGame() {
      openSlotsModal();
    }

    // Event Listeners
    document.getElementById("char-name").addEventListener("input", () => {
      const valBox = document.getElementById("creation-validation-msg");
      if (valBox && !valBox.classList.contains("hidden")) {
        const missing = getCreationMissingItems();
        if (missing.length === 0) valBox.classList.add("hidden");
        else renderCreationValidation(missing);
      }
    });
    document.getElementById("btn-begin-game").addEventListener("click", startNewHero);
    document.getElementById("btn-save").addEventListener("click", saveGame);
    document.getElementById("btn-load").addEventListener("click", loadGame);

    // Rules Modal
    document.getElementById("btn-rules").addEventListener("click", () => {
      document.getElementById("modal-rules").classList.remove("hidden");
    });
    document.getElementById("close-rules").addEventListener("click", () => {
      document.getElementById("modal-rules").classList.add("hidden");
    });

    // Export / Import Modal
    document.getElementById("btn-io-modal").addEventListener("click", () => {
      document.getElementById("io-textarea").value = state ? JSON.stringify(state) : "";
      document.getElementById("modal-io").classList.remove("hidden");
    });
    document.getElementById("close-io").addEventListener("click", () => {
      document.getElementById("modal-io").classList.add("hidden");
    });
    document.getElementById("btn-io-copy").addEventListener("click", () => {
      const ta = document.getElementById("io-textarea");
      if (!ta.value.trim()) return toast("No active hero save to copy.", "info");
      ta.select();
      try {
        document.execCommand("copy");
        toast("Save JSON copied to clipboard!", "good");
      } catch (err) {
        toast("Select the text and press Ctrl+C to copy.", "info");
      }
    });
    document.getElementById("btn-io-import").addEventListener("click", () => {
      const raw = document.getElementById("io-textarea").value.trim();
      if (!raw) return toast("Paste a saved JSON string first.", "bad");
      try {
        applyLoadedState(JSON.parse(raw));
        document.getElementById("modal-io").classList.add("hidden");
        toast(`Imported ${state.name}!`, "good");
      } catch (err) {
        toast("Invalid JSON save string.", "bad");
      }
    });

    // Dungeon Merchant Modal
    document.getElementById("btn-open-dungeon-merchant").addEventListener("click", openDungeonMerchant);
    document.getElementById("close-dm").addEventListener("click", () => {
      document.getElementById("modal-dungeon-merchant").classList.add("hidden");
    });

    // New Hero Confirmation Modal
    document.getElementById("btn-new-hero").addEventListener("click", () => {
      document.getElementById("modal-confirm-reset").classList.remove("hidden");
    });
    document.getElementById("cancel-reset").addEventListener("click", () => {
      document.getElementById("modal-confirm-reset").classList.add("hidden");
    });
    document.getElementById("confirm-reset").addEventListener("click", () => {
      document.getElementById("modal-confirm-reset").classList.add("hidden");
      showCreationScreen();
    });

    // Combat Controls
    document.getElementById("btn-c-strike").addEventListener("click", () => combatStrike(false));
    document.getElementById("btn-c-luck").addEventListener("click", () => combatStrike(true));
    document.getElementById("btn-c-potion").addEventListener("click", () => combatItem("potion"));
    document.getElementById("btn-c-bomb").addEventListener("click", () => combatItem("bomb"));
    const btnCTorch = document.getElementById("btn-c-torch");
    if (btnCTorch) btnCTorch.addEventListener("click", () => combatItem("torch"));
    document.getElementById("btn-c-flee").addEventListener("click", combatFlee);

    // Adventure Navigation Controls
    document.getElementById("btn-return-town-victory").addEventListener("click", () => enterTown("square", false));
    document.getElementById("btn-resurrect-temple").addEventListener("click", resurrectAtTemple);
    document.getElementById("btn-retreat-town").addEventListener("click", () => {
      state.innBuff = null;
      addLog("Retreated safely back to Oakhaven.", "info");
      enterTown("square", false);
    });

    // Building Popup Modal Controls
    document.getElementById("btn-exit-building-top").addEventListener("click", closeBuildingModal);
    document.getElementById("btn-exit-building-bottom").addEventListener("click", closeBuildingModal);
    document.getElementById("modal-building").addEventListener("click", (e) => {
      if (e.target.id === "modal-building") closeBuildingModal();
    });
    document.getElementById("btn-reenter-building").addEventListener("click", () => {
      if (!state || !state.townPos) return;
      const t = getMapTile(state.townPos.x, state.townPos.y);
      if (TILE_TO_BUILDING[t]) openBuildingModal(TILE_TO_BUILDING[t].id);
    });

    // Menu, Journal & Help Modals (Bottom-Center Dock)
    const menuModal = document.getElementById("modal-menu");
    const helpModal = document.getElementById("modal-help");
    const journalModal = document.getElementById("modal-journal");
    const closeMenu = () => menuModal && menuModal.classList.add("hidden");

    function renderJournalModal() {
      const listEl = document.getElementById("journal-list");
      const badgeEl = document.getElementById("journal-count-badge");
      if (!listEl || !state) return;

      // Combine recorded journal entries with any legacy completedQuests lacking detailed entries
      const recorded = Array.isArray(state.questJournal) ? [...state.questJournal] : [];
      const seen = new Set(recorded.map(e => e.id));
      Object.entries(state.completedQuests || {}).forEach(([advId, trophy]) => {
        if (seen.has(advId)) return;
        const adv = ADVENTURES[advId];
        let endXp = 0, endGold = 0, endTitle = "Completed";
        if (adv && adv.pages) {
          const endPage = Object.values(adv.pages).find(p => p && p.ending);
          if (endPage && endPage.ending) {
            endXp = endPage.ending.xp || 0;
            endGold = endPage.ending.gold || 0;
            endTitle = endPage.ending.title || "Completed";
          }
        }
        recorded.push({
          id: advId,
          title: adv ? adv.title : advId,
          subtitle: adv ? cleanQuestSubtitle(adv.subtitle) : "",
          endingTitle: endTitle,
          trophy: typeof trophy === "string" ? trophy : "",
          xp: endXp,
          gold: endGold,
          items: [],
          completedAt: null
        });
      });

      if (badgeEl) badgeEl.textContent = `${recorded.length} Completed`;

      if (recorded.length === 0) {
        listEl.innerHTML = `
          <div class="p-6 rounded-xl bg-stone-950/90 border border-stone-800 text-center space-y-2">
            <div class="font-display text-sm font-bold text-amber-200">Your Journal Is Empty</div>
            <p class="text-xs text-stone-400">Complete adventures from the Town Square Quest Board to record your victories, trophies, and earned rewards here.</p>
          </div>
        `;
        return;
      }

      listEl.innerHTML = "";
      recorded.slice().reverse().forEach(entry => {
        const card = document.createElement("div");
        card.className = "p-4 rounded-xl bg-stone-950/90 border border-amber-700/40 space-y-2";
        const itemBadges = (entry.items || []).map(id => {
          const it = ITEMS_DB[id];
          const label = it ? it.name : id;
          return `<span class="px-2 py-0.5 rounded bg-stone-900 border border-amber-700/35 text-[11px] text-amber-100">${label}</span>`;
        }).join("");
        const dateStr = entry.completedAt ? new Date(entry.completedAt).toLocaleDateString() : "";
        card.innerHTML = `
          <div class="flex items-start justify-between gap-2">
            <div>
              <h4 class="font-display text-base font-bold text-amber-200 leading-snug">${entry.title}</h4>
              ${entry.subtitle ? `<div class="text-[11px] text-stone-400">${entry.subtitle}</div>` : ""}
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold shrink-0 bg-emerald-950 text-emerald-300 border border-emerald-600/50">✓ ${entry.endingTitle}</span>
          </div>
          <div class="flex flex-wrap items-center gap-2 text-xs pt-1">
            ${entry.trophy ? `<span class="px-2.5 py-0.5 rounded-full bg-amber-950/90 border border-amber-500/45 text-amber-200 font-semibold">🏆 ${entry.trophy}</span>` : ""}
            <span class="px-2.5 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-200 font-semibold">✨ +${entry.xp || 0} XP</span>
            <span class="px-2.5 py-0.5 rounded-full bg-amber-950/70 border border-amber-600/40 text-amber-300 font-semibold">🪙 +${entry.gold || 0} GP</span>
            ${dateStr ? `<span class="text-[10px] text-stone-500 ml-auto">${dateStr}</span>` : ""}
          </div>
          ${itemBadges ? `<div class="pt-1 border-t border-stone-800/80"><div class="text-[10px] uppercase tracking-wider text-stone-400 font-semibold mb-1">Loot &amp; Relics Earned</div><div class="flex flex-wrap gap-1.5">${itemBadges}</div></div>` : ""}
        `;
        listEl.appendChild(card);
      });
    }

    document.getElementById("btn-open-menu")?.addEventListener("click", () => {
      menuModal.classList.toggle("hidden");
    });
    document.getElementById("close-menu")?.addEventListener("click", closeMenu);
    menuModal?.addEventListener("click", (e) => { if (e.target.id === "modal-menu") closeMenu(); });

    document.getElementById("btn-journal-modal")?.addEventListener("click", () => {
      closeMenu();
      renderJournalModal();
      journalModal?.classList.remove("hidden");
    });
    document.getElementById("close-journal")?.addEventListener("click", () => journalModal?.classList.add("hidden"));
    journalModal?.addEventListener("click", (e) => { if (e.target.id === "modal-journal") journalModal.classList.add("hidden"); });

    document.getElementById("btn-help-modal")?.addEventListener("click", () => {
      closeMenu();
      helpModal?.classList.remove("hidden");
    });
    document.getElementById("close-help")?.addEventListener("click", () => helpModal?.classList.add("hidden"));
    helpModal?.addEventListener("click", (e) => { if (e.target.id === "modal-help") helpModal.classList.add("hidden"); });

    ["btn-save", "btn-load", "btn-io-modal", "btn-rules"].forEach(id => {
      document.getElementById(id)?.addEventListener("click", closeMenu);
    });

    // Grid Overlay Toggle (inside Help modal)
    document.getElementById("btn-toggle-grid")?.addEventListener("click", (e) => {
      showGridOverlay = !showGridOverlay;
      e.target.textContent = showGridOverlay ? "Grid: On" : "Grid: Off";
    });

    document.getElementById("town-map-canvas").addEventListener("click", (e) => {
      const canvas = e.currentTarget;
      const rect = canvas.getBoundingClientRect();
      const tx = Math.floor(((e.clientX - rect.left) / rect.width) * MAP_COLS);
      const ty = Math.floor(((e.clientY - rect.top) / rect.height) * MAP_ROWS);
      walkToTile(tx, ty);
    });

    window.addEventListener("keydown", (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "Escape") {
        const sheet = document.getElementById("sheet-sidebar");
        if (journalModal && !journalModal.classList.contains("hidden")) { journalModal.classList.add("hidden"); return; }
        if (helpModal && !helpModal.classList.contains("hidden")) { helpModal.classList.add("hidden"); return; }
        if (menuModal && !menuModal.classList.contains("hidden")) { menuModal.classList.add("hidden"); return; }
        if (sheet && !sheet.classList.contains("hidden")) { sheet.classList.add("hidden"); return; }
        if (buildingModalOpen) { e.preventDefault(); closeBuildingModal(); return; }
      }

      if (!state || state.mode !== "town" || buildingModalOpen) return;
      const anyModalOpen = ["modal-rules", "modal-io", "modal-confirm-reset", "modal-menu", "modal-help", "modal-journal", "sheet-sidebar"].some(
        id => { const el = document.getElementById(id); return el && !el.classList.contains("hidden"); }
      );
      if (anyModalOpen) return;

      const key = e.key.toLowerCase();
      if (key === "arrowup" || key === "w")    { e.preventDefault(); stopAutoWalk(); movePlayer(0, -1); }
      else if (key === "arrowdown" || key === "s")  { e.preventDefault(); stopAutoWalk(); movePlayer(0, 1); }
      else if (key === "arrowleft" || key === "a")  { e.preventDefault(); stopAutoWalk(); movePlayer(-1, 0); }
      else if (key === "arrowright" || key === "d") { e.preventDefault(); stopAutoWalk(); movePlayer(1, 0); }
      else if (key === "enter" || key === " ") {
        const t = getMapTile(state.townPos.x, state.townPos.y);
        if (TILE_TO_BUILDING[t]) {
          e.preventDefault();
          openBuildingModal(TILE_TO_BUILDING[t].id);
        }
      }
    });

    // Character Sheet Tabs
    document.querySelectorAll(".sheet-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentSheetTab = btn.dataset.tab;
        document.querySelectorAll(".sheet-tab-btn").forEach(b => {
          const on = b.dataset.tab === currentSheetTab;
          b.className = `sheet-tab-btn py-1.5 rounded-lg transition ${on ? "bg-amber-900/50 text-amber-200" : "text-stone-400 hover:text-stone-200"}`;
        });
        ["gear", "magic", "quests"].forEach(t => {
          document.getElementById(`tab-${t}`).classList.toggle("hidden", t !== currentSheetTab);
        });
      });
    });

    // Character Sheet Modal Toggle (Bottom-Center Dock)
    const sidebar = document.getElementById("sheet-sidebar");
    document.getElementById("btn-toggle-sheet")?.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
    document.getElementById("btn-close-mobile-sheet")?.addEventListener("click", () => {
      sidebar.classList.add("hidden");
    });
    sidebar?.addEventListener("click", (e) => {
      if (e.target.id === "sheet-sidebar") sidebar.classList.add("hidden");
    });

    // Launch Screen & 5-Slot Save Modal Controls
    document.getElementById("btn-launch-new")?.addEventListener("click", () => {
      const slots = getSaveSlots();
      const firstEmpty = slots.findIndex(s => !s);
      activeSaveSlot = firstEmpty >= 0 ? firstEmpty : 0;
      showCreationScreen();
    });
    document.getElementById("btn-launch-import")?.addEventListener("click", () => {
      document.getElementById("io-textarea").value = "";
      document.getElementById("modal-io").classList.remove("hidden");
    });
    const slotsModal = document.getElementById("modal-slots");
    document.getElementById("close-slots")?.addEventListener("click", () => slotsModal?.classList.add("hidden"));
    slotsModal?.addEventListener("click", (e) => { if (e.target.id === "modal-slots") slotsModal.classList.add("hidden"); });

    // Refresh Launch Screen & Slots Modal whenever Firebase Cloud Sync pulls slots
    if (window.OAKHAVEN_CLOUD) {
      window.OAKHAVEN_CLOUD.onSlotsUpdated(() => {
        initLaunchScreen();
        renderSlotsModal();
      });
    }

    // Initialize Launch Screen & queue Town Theme music
    bgm("town");
    initLaunchScreen();
  })();
