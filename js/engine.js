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

  // Automatically place every standalone / Part-1 quest (that has no prerequisite and no
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
      if (!adv || adv.reqQuest || claimedQuests.has(adv.id)) return;
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
    const SHARED_VAULT_KEY = "chronicles_of_oakhaven_shared_vault_v1";
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
      spells: [...(ARCHETYPES[0]?.spells || ["Mend Wounds", "Arcane Shield"])],
      hardcore: false
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
      S: { id: "stash",     name: "Shared Account Vault",    icon: "🔐", img: "images/loc_stash.jpg" },
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
        undeadDmgBonus: 0, bossDmgBonus: 0, goldFindPct: 0,
        dmgReduce: 0, mpRegen: 0, skillBonuses: {}
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
      // Merge passive effects from all equipped items
      if (hero && hero.equipment) {
        Object.values(hero.equipment).forEach(itemId => {
          const it = itemId ? ITEMS_DB[itemId] : null;
          const p = it && it.passives;
          if (!p) return;
          if (p.bombDmgBonus) totals.bombDmgBonus += p.bombDmgBonus;
          if (p.bombChillTurns) totals.bombChillTurns = Math.max(totals.bombChillTurns, p.bombChillTurns);
          if (p.spellDmgBonus) totals.spellDmgBonus += p.spellDmgBonus;
          if (p.spellCostReduce) totals.spellCostReduce += p.spellCostReduce;
          if (p.healBonus) totals.healBonus += p.healBonus;
          if (p.critRange && p.critRange < totals.critRange) totals.critRange = p.critRange;
          if (p.lifesteal) totals.lifesteal += p.lifesteal;
          if (p.thornsDmg) totals.thornsDmg += p.thornsDmg;
          if (p.undeadDmgBonus) totals.undeadDmgBonus += p.undeadDmgBonus;
          if (p.bossDmgBonus) totals.bossDmgBonus += p.bossDmgBonus;
          if (p.goldFindPct) totals.goldFindPct += p.goldFindPct;
          if (p.dmgReduce) totals.dmgReduce += p.dmgReduce;
          if (p.mpRegen) totals.mpRegen += p.mpRegen;
          if (p.skillBonus) {
            Object.entries(p.skillBonus).forEach(([sk, val]) => {
              totals.skillBonuses[sk] = (totals.skillBonuses[sk] || 0) + (val || 0);
            });
          }
        });
      }
      return totals;
    }

    function getEquippedItemAbilities(hero = state) {
      if (!hero || !hero.equipment) return [];
      const list = [];
      Object.values(hero.equipment).forEach(itemId => {
        const it = itemId ? ITEMS_DB[itemId] : null;
        if (it && it.activeAbility) {
          list.push({ itemId, itemName: it.name, ab: it.activeAbility });
        }
      });
      return list;
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

    function isSpellcasterClass(hero = state) {
      if (!hero) return false;
      const cls = ARCHETYPES.find(a => a.id === hero.archId || a.name === hero.className);
      return !!(cls && (cls.mpRegen || (cls.bonusMp || 0) > 0));
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

    // ---- Floating Item Inspector Tooltip (Hover + Tap) ----
    let itemTooltipPinnedId = null;

    const ITEM_TYPE_META = {
      weapon:       { label: "Weapon",           icon: "⚔️" },
      armor:        { label: "Armor",            icon: "🛡️" },
      offhand:      { label: "Off-Hand",         icon: "🔰" },
      accessory:    { label: "Ring / Amulet",    icon: "💍" },
      cloak:        { label: "Cloak / Boots",    icon: "🧥" },
      consumable:   { label: "Consumable",       icon: "🧪" },
      bomb:         { label: "Throwable / Bomb", icon: "💣" },
      material:     { label: "Crafting Material",icon: "⚒️" },
      schematic:    { label: "Forge Schematic",  icon: "📜" },
      spell_scroll: { label: "Spell Scroll",     icon: "✨" },
      valuable:     { label: "Valuable",         icon: "💎" }
    };

    function collectItemStatPills(item) {
      const stats = [];
      if (!item) return stats;
      if (item.atk)          stats.push({ lbl: `⚔️ ${item.atk > 0 ? "+" : ""}${item.atk} Attack`, cls: "bg-rose-950/80 text-rose-200 border-rose-600/50" });
      if (item.ac)           stats.push({ lbl: `🛡️ ${item.ac > 0 ? "+" : ""}${item.ac} AC`, cls: "bg-sky-950/80 text-sky-200 border-sky-600/50" });
      if (item.might)        stats.push({ lbl: `💪 +${item.might} Might`, cls: "bg-rose-950/70 text-rose-200 border-rose-700/40" });
      if (item.agility)      stats.push({ lbl: `🏃 +${item.agility} Agility`, cls: "bg-emerald-950/70 text-emerald-200 border-emerald-700/40" });
      if (item.arcana)       stats.push({ lbl: `🔮 +${item.arcana} Arcana`, cls: "bg-sky-950/70 text-sky-200 border-sky-700/40" });
      if (item.spirit)       stats.push({ lbl: `🌟 +${item.spirit} Spirit`, cls: "bg-amber-950/70 text-amber-200 border-amber-700/40" });
      if (item.luck)         stats.push({ lbl: `🍀 +${item.luck} Luck`, cls: "bg-purple-950/70 text-purple-200 border-purple-700/40" });
      if (item.maxHp)        stats.push({ lbl: `❤️ +${item.maxHp} Max HP`, cls: "bg-emerald-950/80 text-emerald-200 border-emerald-600/50" });
      if (item.maxMp)        stats.push({ lbl: `🔷 +${item.maxMp} Max MP`, cls: "bg-indigo-950/80 text-indigo-200 border-indigo-600/50" });
      if (item.healHp)       stats.push({ lbl: `💚 Restores +${item.healHp} HP`, cls: "bg-emerald-950/80 text-emerald-200 border-emerald-600/50" });
      if (item.healMp)       stats.push({ lbl: `💧 Restores +${item.healMp} MP`, cls: "bg-sky-950/80 text-sky-200 border-sky-600/50" });
      if (item.dmgDice)      stats.push({ lbl: `💥 ${item.dmgDice} Damage`, cls: "bg-orange-950/80 text-orange-200 border-orange-600/50" });
      else if (item.dmg)     stats.push({ lbl: `💥 ${item.dmg} Damage`, cls: "bg-orange-950/80 text-orange-200 border-orange-600/50" });
      return stats;
    }

    function collectItemPassivePills(item) {
      const passivePills = [];
      if (!item || !item.passives) return passivePills;
      const p = item.passives;
      if (p.critRange && p.critRange < 12) passivePills.push(`🎯 Crit on ${p.critRange}+`);
      if (p.lifesteal) passivePills.push(`🩸 +${p.lifesteal} HP Drain on Hit`);
      if (p.thornsDmg) passivePills.push(`🌵 ${p.thornsDmg} Thorns Retaliation`);
      if (p.spellDmgBonus) passivePills.push(`✨ +${p.spellDmgBonus} Spell DMG`);
      if (p.spellCostReduce) passivePills.push(`🔷 -${p.spellCostReduce} Spell MP Cost`);
      if (p.healBonus) passivePills.push(`💚 +${p.healBonus} Healing Bonus`);
      if (p.undeadDmgBonus) passivePills.push(`☀️ +${p.undeadDmgBonus} DMG vs Undead`);
      if (p.bossDmgBonus) passivePills.push(`💀 +${p.bossDmgBonus} DMG vs Bosses`);
      if (p.goldFindPct) passivePills.push(`🪙 +${p.goldFindPct}% Gold Find`);
      if (p.bombDmgBonus) passivePills.push(`💣 +${p.bombDmgBonus} Bomb/Torch DMG`);
      if (p.dmgReduce) passivePills.push(`🛡️ -${p.dmgReduce} Damage Taken`);
      if (p.mpRegen) passivePills.push(`🔷 +${typeof p.mpRegen === "number" ? p.mpRegen : 1} MP/Turn`);
      if (p.skillBonus) {
        Object.entries(p.skillBonus).forEach(([sk, v]) => {
          if (v) passivePills.push(`🎲 +${v} ${sk}`);
        });
      }
      return passivePills;
    }

    function renderItemActiveAbilityBox(ab) {
      if (!ab) return "";
      return `
        <div class="p-2 rounded-lg bg-teal-950/50 border border-teal-500/50 space-y-0.5">
          <div class="flex items-center justify-between gap-1.5">
            <span class="font-bold text-teal-200">${ab.icon || "⚡"} ${ab.name}</span>
            <span class="px-1.5 py-0.5 rounded bg-teal-900/80 text-teal-200 text-[9px] font-bold uppercase shrink-0">
              ${ab.charges ? `${ab.charges}/Quest` : ""}${ab.charges && ab.mp ? " • " : ""}${ab.mp ? `${ab.mp} MP` : (!ab.charges ? "Active" : "")}
            </span>
          </div>
          <div class="text-[10px] text-teal-100/90 leading-snug">${ab.desc}</div>
        </div>`;
    }

    function getItemArtSrc(it) {
      if (!it) return null;
      const itemArtMap = window.OAKHAVEN_ITEM_IMAGES || {};
      return it.img || it.image || it.art || itemArtMap[it.id] || (it.unlocksRecipe ? itemArtMap[it.unlocksRecipe] : null) || null;
    }

    function renderItemThumbHtml(itemOrId, sizeCls = "w-11 h-11", iconCls = "text-lg") {
      const it = typeof itemOrId === "string" ? ITEMS_DB[itemOrId] : itemOrId;
      if (!it) return "";
      const meta = ITEM_TYPE_META[it.type] || { label: (it.type || "Item"), icon: "🎒" };
      const imgSrc = getItemArtSrc(it);
      if (imgSrc) {
        return `<img src="${imgSrc}" alt="${it.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" class="${sizeCls} rounded-lg object-cover border border-amber-500/60 shadow shrink-0 bg-stone-900" /><div style="display:none" class="${sizeCls} rounded-lg bg-stone-900 border border-amber-700/50 items-center justify-center ${iconCls} shrink-0">${meta.icon}</div>`;
      }
      return `<div class="${sizeCls} rounded-lg bg-stone-900 border border-amber-700/50 flex items-center justify-center ${iconCls} shrink-0">${meta.icon}</div>`;
    }

    const EQUIP_COMPARE_SLOTS = ["weapon", "armor", "offhand", "accessory", "cloak"];

    function getCompareEquippedItem(it, opts = {}) {
      if (!it || !EQUIP_COMPARE_SLOTS.includes(it.type)) return null;
      if (!state || !state.equipment) return null;
      if ((opts.slotLabel || "").startsWith("Equipped")) return null;
      const eqId = state.equipment[it.type];
      if (!eqId || !ITEMS_DB[eqId]) return null;
      return ITEMS_DB[eqId];
    }

    function buildStatDeltaStripHtml(newItem, eqItem) {
      if (!newItem || !eqItem) return "";
      const keys = [
        ["atk",     "Attack", "⚔️"],
        ["ac",      "AC",     "🛡️"],
        ["might",   "Might",  "💪"],
        ["agility", "Agility","🏃"],
        ["arcana",  "Arcana", "🔮"],
        ["spirit",  "Spirit", "🌟"],
        ["luck",    "Luck",   "🍀"],
        ["maxHp",   "Max HP", "❤️"],
        ["maxMp",   "Max MP", "🔷"]
      ];
      const diffs = [];
      for (const [k, lbl, icon] of keys) {
        const diff = (Number(newItem[k]) || 0) - (Number(eqItem[k]) || 0);
        if (diff > 0) {
          diffs.push(`<span class="px-1.5 py-0.5 rounded bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-[10px] font-bold">▲ +${diff} ${lbl}</span>`);
        } else if (diff < 0) {
          diffs.push(`<span class="px-1.5 py-0.5 rounded bg-rose-950/90 border border-rose-500/60 text-rose-300 text-[10px] font-bold">▼ ${diff} ${lbl}</span>`);
        }
      }
      if (!diffs.length) {
        return `<div class="px-2 py-1 rounded-lg bg-stone-900/80 border border-stone-700/60 text-[10px] text-stone-400">⚖️ Same base stats as equipped item (compare passives &amp; abilities →)</div>`;
      }
      return `
        <div class="p-2 rounded-lg bg-stone-900/80 border border-amber-700/40 space-y-1">
          <div class="text-[9px] font-bold uppercase tracking-wider text-amber-300/90">⚖️ Stat Change vs. Equipped</div>
          <div class="flex flex-wrap gap-1">${diffs.join("")}</div>
        </div>`;
    }

    function buildSingleItemCardHtml(it, opts = {}) {
      const meta = ITEM_TYPE_META[it.type] || { label: (it.type || "Item"), icon: "🎒" };
      const imgSrc = getItemArtSrc(it);
      const qty = opts.qty || 1;
      const rarityHtml = typeof getRarityBadgeHtml === "function" ? getRarityBadgeHtml(it.rarity || "common") : "";

      const stats = collectItemStatPills(it);
      if (it.unlocksSpell) stats.push({ lbl: `✨ Teaches: ${it.unlocksSpell}`, cls: "bg-sky-950/80 text-sky-200 border-sky-500/50" });
      if (it.unlocksRecipe) {
        const rName = ITEMS_DB[it.unlocksRecipe]?.name || it.unlocksRecipe;
        stats.push({ lbl: `📜 Unlocks: ${rName}`, cls: "bg-purple-950/80 text-purple-200 border-purple-500/50" });
      }

      const pictureHtml = imgSrc
        ? `<img src="${imgSrc}" alt="${it.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" class="w-14 h-14 rounded-lg object-cover border border-amber-500/60 shadow shrink-0" /><div style="display:none" class="w-11 h-11 rounded-lg bg-stone-900 border border-amber-700/50 items-center justify-center text-xl shrink-0">${meta.icon}</div>`
        : `<div class="w-11 h-11 rounded-lg bg-stone-900 border border-amber-700/50 flex items-center justify-center text-xl shrink-0">${meta.icon}</div>`;

      const priceLine = opts.price != null
        ? `<span>Shop Price: <strong class="text-amber-300">🪙 ${opts.price} GP</strong></span>`
        : `<span>Sell Value: <strong class="text-amber-300">🪙 ${it.value || 0} GP</strong>${qty > 1 ? ` <span class="text-stone-400">(${(it.value || 0) * qty} GP stack)</span>` : ""}</span>`;

      const passivePills = collectItemPassivePills(it);
      const activeBoxHtml = renderItemActiveAbilityBox(it.activeAbility);

      // Detailed Spell Preview for Spell Scrolls
      let spellPreviewHtml = "";
      if (it.unlocksSpell) {
        const sp = SPELLS_LIST.find(s => s.name === it.unlocksSpell);
        if (sp) {
          const alreadyKnown = !!(state && Array.isArray(state.spells) && state.spells.includes(sp.name));
          const spTags = [];
          const fmtDice = d => typeof d === "string" ? d : (d && d.count && d.sides ? `${d.count}d${d.sides}` : "");
          if (sp.dmgDice) {
            const dStr = fmtDice(sp.dmgDice);
            const statStr = sp.dmgStat ? ` + ${sp.dmgStat.charAt(0).toUpperCase() + sp.dmgStat.slice(1)}` : "";
            const bonusStr = sp.dmgBonus ? ` + ${sp.dmgBonus}` : "";
            spTags.push(`💥 ${dStr}${bonusStr}${statStr}${sp.dmgType ? ` ${sp.dmgType}` : ""}`);
          }
          if (sp.healDice) {
            const hStr = fmtDice(sp.healDice);
            const statStr = sp.healStat ? ` + ${sp.healStat.charAt(0).toUpperCase() + sp.healStat.slice(1)}` : "";
            const bonusStr = sp.healBonus ? ` + ${sp.healBonus}` : "";
            spTags.push(`💚 Heal ${hStr}${bonusStr}${statStr}`);
          }
          if (sp.undeadDouble) spTags.push(`☀️ 2× vs Undead`);
          if (sp.shieldTurns)  spTags.push(`🛡️ +3 AC (${sp.shieldTurns}t)`);
          if (sp.evadeTurns)   spTags.push(`💨 Evade (${sp.evadeTurns}t)`);
          if (sp.chillTurns)   spTags.push(`❄️ Chill (${sp.chillTurns}t)`);
          if (sp.stunTurns)    spTags.push(`💫 Stun (${sp.stunTurns}t)`);
          if (sp.ooc)          spTags.push(`🏕️ Usable Out of Combat`);
          spellPreviewHtml = `
            <div class="p-2.5 rounded-lg bg-sky-950/60 border border-sky-500/50 space-y-1.5">
              <div class="flex items-center justify-between gap-1.5">
                <span class="font-display text-xs font-bold text-sky-200">${sp.icon || "✨"} ${sp.name}</span>
                <div class="flex items-center gap-1 shrink-0">
                  <span class="px-1.5 py-0.5 rounded bg-indigo-900/80 text-indigo-200 text-[9px] font-bold uppercase">🔷 ${sp.mp} MP</span>
                  ${alreadyKnown ? `<span class="px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-200 text-[9px] font-bold uppercase">✓ Known</span>` : ""}
                </div>
              </div>
              ${spTags.length ? `<div class="flex flex-wrap gap-1">${spTags.map(t => `<span class="px-1.5 py-0.5 rounded bg-sky-900/60 border border-sky-600/40 text-sky-100 text-[9px] font-semibold">${t}</span>`).join("")}</div>` : ""}
              ${sp.desc ? `<div class="text-[10px] text-sky-100/90 leading-snug">${sp.desc}</div>` : ""}
            </div>`;
        }
      }

      // Detailed Crafted Item Preview for Forge Schematics
      let recipePreviewHtml = "";
      if (it.unlocksRecipe && ITEMS_DB[it.unlocksRecipe]) {
        const target = ITEMS_DB[it.unlocksRecipe];
        const tMeta = ITEM_TYPE_META[target.type] || { label: (target.type || "Item"), icon: "⚒️" };
        const tRarity = typeof getRarityBadgeHtml === "function" ? getRarityBadgeHtml(target.rarity || "common") : "";
        const tStats = collectItemStatPills(target);
        const tPassives = collectItemPassivePills(target);
        const tActive = renderItemActiveAbilityBox(target.activeAbility);
        const alreadyUnlocked = !!(state && Array.isArray(state.unlockedRecipes) && state.unlockedRecipes.includes(it.unlocksRecipe));
        const recipe = Array.isArray(CRAFT_RECIPES) ? CRAFT_RECIPES.find(r => r.result === it.unlocksRecipe) : null;
        let craftCostLine = "";
        if (recipe) {
          const matParts = Object.entries(recipe.mats || {}).map(([mId, cnt]) => `${cnt}× ${ITEMS_DB[mId]?.name || mId}`);
          craftCostLine = `<div class="text-[9px] text-amber-200/90 pt-1 border-t border-purple-700/40">⚒️ Forge Cost: <strong>${recipe.gold || 0} GP</strong>${matParts.length ? ` • ${matParts.join(", ")}` : ""}</div>`;
        }
        recipePreviewHtml = `
          <div class="p-2.5 rounded-lg bg-purple-950/50 border border-purple-500/50 space-y-1.5">
            <div class="flex items-center justify-between gap-1.5">
              <span class="font-display text-xs font-bold text-amber-200">${tMeta.icon} ${target.name}</span>
              <div class="flex items-center gap-1 shrink-0">
                ${tRarity}
                ${alreadyUnlocked ? `<span class="px-1.5 py-0.5 rounded bg-emerald-900/80 text-emerald-200 text-[9px] font-bold uppercase">✓ Unlocked</span>` : ""}
              </div>
            </div>
            <div class="text-[9px] uppercase tracking-wider text-purple-300/90 font-semibold">${tMeta.label} • Crafted Result</div>
            ${tStats.length ? `<div class="flex flex-wrap gap-1">${tStats.map(s => `<span class="px-1.5 py-0.5 rounded border text-[10px] font-semibold ${s.cls}">${s.lbl}</span>`).join("")}</div>` : ""}
            ${tPassives.length ? `<div class="flex flex-wrap gap-1">${tPassives.map(p => `<span class="px-1.5 py-0.5 rounded border bg-purple-900/70 border-purple-400/50 text-purple-100 text-[9px] font-semibold">${p}</span>`).join("")}</div>` : ""}
            ${tActive}
            ${target.desc ? `<div class="text-[10px] text-stone-200 leading-snug">${target.desc}</div>` : ""}
            ${craftCostLine}
          </div>`;
      }

      return `
        ${opts.headerBanner || ""}
        <div class="flex items-start gap-2.5 border-b border-amber-700/40 pb-2">
          ${pictureHtml}
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-1.5">
              <div class="font-display text-sm font-bold text-amber-200 leading-snug">${it.name}${qty > 1 ? ` <span class="text-amber-400 text-xs">x${qty}</span>` : ""}</div>
              ${opts.showClose ? `<button type="button" id="item-tip-close" class="text-stone-400 hover:text-amber-200 text-xs font-bold px-1 shrink-0" title="Close">✕</button>` : ""}
            </div>
            <div class="flex flex-wrap items-center gap-1.5 mt-1">
              <span class="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">${meta.label}</span>
              ${rarityHtml}
              ${it.unique ? `<span class="px-1.5 py-0.5 rounded bg-amber-950/90 border border-amber-500/60 text-[9px] font-bold uppercase text-amber-300">Unique</span>` : ""}
            </div>
          </div>
        </div>
        ${stats.length ? `<div class="flex flex-wrap gap-1.5">${stats.map(s => `<span class="px-2 py-0.5 rounded border text-[11px] font-semibold ${s.cls}">${s.lbl}</span>`).join("")}</div>` : ""}
        ${passivePills.length ? `<div class="flex flex-wrap gap-1.5">${passivePills.map(p => `<span class="px-2 py-0.5 rounded border bg-purple-950/70 border-purple-500/50 text-purple-200 text-[10px] font-semibold">${p}</span>`).join("")}</div>` : ""}
        ${activeBoxHtml}
        ${opts.deltaHtml || ""}
        ${spellPreviewHtml}
        ${recipePreviewHtml}
        ${it.desc ? `<p class="text-[11px] text-stone-200 leading-relaxed">${it.desc}</p>` : ""}
        ${opts.emptySlotHint || ""}
        <div class="flex items-center justify-between gap-2 pt-1.5 border-t border-stone-800 text-[10px] text-stone-400">
          ${priceLine}
          ${opts.slotLabel ? `<span class="uppercase text-stone-500">${opts.slotLabel}</span>` : ""}
        </div>
      `;
    }

    function buildItemTooltipHtml(it, opts = {}) {
      const eqItem = getCompareEquippedItem(it, opts);
      if (eqItem) {
        const meta = ITEM_TYPE_META[it.type] || { label: (it.type || "Item"), icon: "🎒" };
        const leftBanner = `<div class="flex items-center justify-between gap-2 pb-1 mb-1 border-b border-amber-600/30"><span class="text-[10px] font-bold uppercase tracking-wider text-amber-300">🔍 Selected Item</span><span class="text-[9px] uppercase text-stone-400">${opts.slotLabel || meta.label}</span></div>`;
        const rightBanner = `<div class="flex items-center justify-between gap-2 pb-1 mb-1 border-b border-emerald-600/40"><span class="text-[10px] font-bold uppercase tracking-wider text-emerald-300">✓ Currently Wearing</span>${opts.pinned ? `<button type="button" id="item-tip-close" class="text-stone-400 hover:text-amber-200 text-xs font-bold px-1 shrink-0" title="Close">✕</button>` : `<span class="text-[9px] uppercase text-emerald-400/80">${meta.label}</span>`}</div>`;
        const deltaHtml = buildStatDeltaStripHtml(it, eqItem);
        const leftHtml = buildSingleItemCardHtml(it, { ...opts, headerBanner: leftBanner, deltaHtml, showClose: false });
        const rightHtml = buildSingleItemCardHtml(eqItem, { qty: 1, slotLabel: `Equipped (${meta.label})`, headerBanner: rightBanner, showClose: false });
        return `
          <div class="flex flex-col sm:flex-row gap-3 items-stretch">
            <div class="flex-1 min-w-0 space-y-2">${leftHtml}</div>
            <div class="flex-1 min-w-0 space-y-2 pt-2.5 sm:pt-0 sm:pl-3 border-t sm:border-t-0 sm:border-l border-emerald-600/40 bg-emerald-950/15 sm:rounded-r-lg">${rightHtml}</div>
          </div>`;
      }
      let emptySlotHint = "";
      if (EQUIP_COMPARE_SLOTS.includes(it.type) && state && state.equipment && !(opts.slotLabel || "").startsWith("Equipped")) {
        const meta = ITEM_TYPE_META[it.type] || { label: it.type };
        emptySlotHint = `<div class="px-2 py-1 rounded-lg bg-emerald-950/50 border border-emerald-600/40 text-[10px] text-emerald-300 font-semibold">✨ Your ${meta.label} slot is currently empty.</div>`;
      }
      return buildSingleItemCardHtml(it, { ...opts, showClose: !!opts.pinned, emptySlotHint });
    }

    function positionItemTooltip(evtOrRect) {
      const tip = document.getElementById("item-tooltip");
      if (!tip || tip.classList.contains("hidden") || !evtOrRect) return;
      const pad = 14;
      const w = tip.offsetWidth || 320;
      const h = tip.offsetHeight || 180;
      let x, y;
      if (typeof evtOrRect.clientX === "number") {
        x = evtOrRect.clientX + pad;
        y = evtOrRect.clientY + pad;
      } else if (typeof evtOrRect.right === "number") {
        x = evtOrRect.right + 10;
        y = evtOrRect.top;
        if (x + w > window.innerWidth - 10) x = evtOrRect.left - w - 10;
      } else {
        return;
      }
      if (x + w > window.innerWidth - 10) x = Math.max(10, (evtOrRect.clientX || window.innerWidth) - w - pad);
      if (x < 10) x = 10;
      if (y + h > window.innerHeight - 10) y = Math.max(10, window.innerHeight - h - 10);
      if (y < 10) y = 10;
      tip.style.left = `${x}px`;
      tip.style.top = `${y}px`;
    }

    function showItemTooltip(itemId, evtOrEl, opts = {}) {
      const tip = document.getElementById("item-tooltip");
      const it = ITEMS_DB[itemId];
      if (!tip || !it) return;
      const pinned = !!opts.pinned;
      const isComparing = !!getCompareEquippedItem(it, opts);
      tip.classList.toggle("pointer-events-none", !pinned);
      tip.classList.toggle("w-80", !isComparing);
      tip.classList.toggle("max-w-sm", !isComparing);
      tip.classList.toggle("w-[40rem]", isComparing);
      tip.classList.toggle("max-w-[calc(100vw-20px)]", isComparing);
      tip.classList.toggle("max-h-[calc(100vh-20px)]", pinned);
      tip.classList.toggle("overflow-y-auto", pinned);
      tip.innerHTML = buildItemTooltipHtml(it, opts);
      tip.classList.remove("hidden");
      const closeBtn = tip.querySelector("#item-tip-close");
      if (closeBtn) closeBtn.onclick = (e) => { e.stopPropagation(); hideItemTooltip(true); };
      if (evtOrEl && typeof evtOrEl.getBoundingClientRect === "function") {
        positionItemTooltip(evtOrEl.getBoundingClientRect());
      } else {
        positionItemTooltip(evtOrEl);
      }
    }

    function hideItemTooltip(force = false) {
      if (!force && itemTooltipPinnedId) return;
      itemTooltipPinnedId = null;
      const tip = document.getElementById("item-tooltip");
      if (tip) {
        tip.classList.add("hidden");
        tip.classList.add("pointer-events-none");
      }
    }

    function bindItemTooltip(el, itemId, opts = {}) {
      if (!el || !itemId || !ITEMS_DB[itemId]) return;
      el.addEventListener("mouseenter", (e) => {
        if (itemTooltipPinnedId) return;
        showItemTooltip(itemId, e, { ...opts, pinned: false });
      });
      el.addEventListener("mousemove", (e) => {
        if (itemTooltipPinnedId) return;
        positionItemTooltip(e);
      });
      el.addEventListener("mouseleave", () => {
        hideItemTooltip(false);
      });
      el.addEventListener("dragstart", () => hideItemTooltip(true));
      el.addEventListener("click", (e) => {
        if (e.target && e.target.closest("button, a, input")) return;
        e.stopPropagation();
        const pinKey = `${itemId}:${opts.qty || 1}:${opts.price ?? ""}:${opts.slotLabel || ""}`;
        if (itemTooltipPinnedId === pinKey) {
          hideItemTooltip(true);
        } else {
          itemTooltipPinnedId = pinKey;
          showItemTooltip(itemId, el, { ...opts, pinned: true });
        }
      });
    }

    document.addEventListener("click", (e) => {
      if (!itemTooltipPinnedId) return;
      const tip = document.getElementById("item-tooltip");
      if (tip && tip.contains(e.target)) return;
      hideItemTooltip(true);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && itemTooltipPinnedId) hideItemTooltip(true);
    });

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

      if (String(srcContainer).startsWith("stash") || String(dstContainer).startsWith("stash")) {
        persistVaultChange();
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
        if (String(containerKey).startsWith("stash")) persistVaultChange();
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
          <div class="min-w-0"><div class="font-display text-xs font-bold truncate ${on?"text-amber-300":"text-stone-200"}">${a.name}</div><div class="text-[10px] text-stone-400 mt-0.5 line-clamp-2">${a.desc}</div>${sig ? `<div class="text-[10px] text-amber-300/90 mt-0.5 truncate font-semibold">${sig.icon} ${sig.name} (1/Quest)</div>` : ""}${a.mpRegen ? `<div class="text-[9px] text-sky-300/90 truncate">🔷 Passive: +1 MP/turn &amp; +1 MP/choice</div>` : ""}</div>`;
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
      const lvl1Pool = Object.values(ADVENTURES).filter(
        adv => adv && !adv.reqQuest && (adv.recommendedLevel || 1) === 1
      );
      const starterQuest = lvl1Pool.length
        ? lvl1Pool[Math.floor(Math.random() * lvl1Pool.length)].id
        : "malakor";
      const startingQuests = [starterQuest];

      state = {
        name,
        classId: arch.id,
        className: arch.name,
        raceId: race?.id || null,
        raceName: race?.name || "",
        subclassId: sub?.id || null,
        subclassName: sub?.name || "",
        hardcore: !!creation.hardcore,
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
        blessing: null, templeBlessed: false, innBuff: null, innRested: false, shieldTurns: 0, evadeTurns: 0,
        discoveredQuests: startingQuests,
        completedQuests: {},
        questJournal: [], // { advId: trophyName }
        kills: 0, deaths: 0,
        mode: "town",
        townPos: { x: 11, y: 11 },
        activeAdv: null,
        log: []
      };
      applySharedVaultToState(state);
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

    let lastTownAutoSpokenKey = "";

    function closeBuildingModal() {
      window.OAKHAVEN_NARRATOR?.stop(true);
      lastTownAutoSpokenKey = "";
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

    let mapCanvasCachedW = 0;
    let mapCanvasCachedH = 0;
    let mapLastDrawTs = 0;
    const MAP_MODAL_IDS = ["modal-menu", "modal-journal", "modal-slots", "modal-rules", "modal-help", "modal-io"];

    function isAnyBlockingModalOpen() {
      if (buildingModalOpen) return true;
      for (const id of MAP_MODAL_IDS) {
        const el = document.getElementById(id);
        if (el && !el.classList.contains("hidden")) return true;
      }
      return false;
    }

    function invalidateMapCanvasSize() {
      mapCanvasCachedW = 0;
      mapCanvasCachedH = 0;
    }
    window.addEventListener("resize", invalidateMapCanvasSize, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (mapAnimFrame) { cancelAnimationFrame(mapAnimFrame); mapAnimFrame = null; }
      } else if (state && state.mode === "town" && !mapAnimFrame) {
        invalidateMapCanvasSize();
        startMapLoop();
      }
    });

    function renderTownMapCanvas(ts = 0) {
      const canvas = document.getElementById("town-map-canvas");
      if (!canvas || !state || state.mode !== "town" || document.hidden) return;
      if (!mapCanvasCachedW || !mapCanvasCachedH) {
        const rect = canvas.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        mapCanvasCachedW = rect.width;
        mapCanvasCachedH = rect.height;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(mapCanvasCachedW * dpr);
      const targetH = Math.round(mapCanvasCachedH * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const ctx = canvas.getContext("2d");
      ctx.save();
      ctx.scale(dpr, dpr);
      const w = mapCanvasCachedW;
      const h = mapCanvasCachedH;
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
      mapLastDrawTs = 0;
      const tick = (ts) => {
        if (!state || state.mode !== "town" || document.hidden) {
          mapAnimFrame = null;
          return;
        }
        // Throttle idle town redraws to ~20 FPS and skip GPU blits while a modal covers the map
        if (!isAnyBlockingModalOpen() && (ts - mapLastDrawTs >= 50 || mapLastDrawTs === 0)) {
          mapLastDrawTs = ts;
          renderTownMapCanvas(ts);
        }
        mapAnimFrame = requestAnimationFrame(tick);
      };
      mapAnimFrame = requestAnimationFrame(tick);
    }

    function enterTown(district = "square", openModal = false) {
      window.OAKHAVEN_NARRATOR?.stop(true);
      lastNarratedPageKey = "";
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
      window.OAKHAVEN_NARRATOR?.preloadForTown(getActiveBoardLeads());
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

    function getActiveBoardLeads(target = state) {
      if (!target || !Array.isArray(target.discoveredQuests)) return [];
      return target.discoveredQuests
        .map(id => ADVENTURES[id])
        .filter(adv => adv && !target.completedQuests?.[adv.id] && (!adv.reqQuest || !!target.completedQuests?.[adv.reqQuest]));
    }

    function renderDistrictSquare(box) {
      const activeLeads = getActiveBoardLeads();
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

      // Prioritize NPCs offering quests you haven't discovered or completed yet
      const freshLeads = eligible.filter(npc =>
        npc.discoverQuest &&
        !state.discoveredQuests.includes(npc.discoverQuest) &&
        !state.completedQuests[npc.discoverQuest]
      );

      const shuffle = (arr) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      };

      // If the hero has NO active quests left on the board, guarantee 1 quest rumor at the Inn.
      // Otherwise roll 0 or 1 rumor patron so quests arrive at a relaxed, unhurried pace.
      const boardIsEmpty = getActiveBoardLeads().length === 0;
      const count = boardIsEmpty
        ? (freshLeads.length > 0 ? 1 : 0)
        : (freshLeads.length > 0 && Math.random() < 0.5 ? 1 : 0);

      if (count === 0) {
        state.tavernPatrons = [];
        return;
      }

      // Gently favor level-appropriate quests (within +2 of hero level) when available
      const heroLv = state.level || 1;
      const levelAppropriate = freshLeads.filter(npc => {
        const adv = ADVENTURES[npc.discoverQuest];
        return adv && (adv.recommendedLevel || 1) <= heroLv + 2;
      });
      const pickPool = shuffle(levelAppropriate.length > 0 ? levelAppropriate : freshLeads);
      state.tavernPatrons = [pickPool[0].id];
    }

    let lastTavernBarkKey = "";
    let lastTavernBarkText = "";

    function getTavernAmbientBark() {
      const done = state.completedQuests || {};
      const doneCount = Object.keys(done).length;
      const key = `${state.name || ""}|${doneCount}|${state.innRested ? 1 : 0}|${state.level || 1}`;
      if (key === lastTavernBarkKey && lastTavernBarkText) return lastTavernBarkText;

      const pool = [
        `A timber-hauler warms his palms by the hearth: "Fog's rolling thick off the Thornwood pines tonight — keep a dry torch in your pack."`,
        `Two off-duty watchmen clack bone dice in the corner, arguing whether Saltfang's tide-caves hide smugglers or sea-beasts.`,
        `Old Bram slides a foaming tankard across the oak bar: "Hearth's hot, stew's thick, and half the frontier's secrets pass through this door."`,
        `A traveling lutist plucks a quiet frontier ballad as rain patters softly against the Rusty Flagon's leaded windows.`,
        `Sparks snap up the stone chimney while a hooded mapmaker traces charcoal lines across a stained frontier chart.`,
        `A silver-haired cartographer taps a cracked brass compass: "The ley-winds shift every new moon—even old frontier trails hide fresh surprises."`,
        `A lantern-maker wipes soot from his spectacles: "Strange bells have been chiming out over the Old Abbey Moorlands—even when there's not a breath of wind."`
      ];
      if (state.hardcore) {
        pool.push(`A scarred sellsword raises a pewter mug in your direction: "Hardcore blood, eh? One slip beyond the palisade and it's curtains — drink deep while you still draw breath!"`);
      }
      if (done.malakor) {
        pool.push(`An old marsh-trapper leans across the table: "Folks still whisper about Malakor's Sunken Vault—few ever walked back out of that bog with their boots dry!"`);
      }
      if (done.bandit_citadel) {
        pool.push(`A caravan driver hoists a mug toward you: "With Warlord Vane gone from Ravencrest, the east road's finally safe for honest wagons!"`);
      }
      if (done.saltfang) {
        pool.push(`A weathered dockhand grins over his ale: "Since you cleared out Saltfang Cove, the harbor lanterns have burned twice as bright!"`);
      }
      if (done.karak_zul) {
        pool.push(`Two prospectors clink mugs near the fire: "Heard someone braved Karak-Zul and walked back out — Borin's been humming at his forge all week!"`);
      }
      if (done.brasshaven) {
        pool.push(`Pip Cogsworth's soot-smudged apprentice lifts a cider mug by the hearth: "Brasshaven's pistons finally sleep quiet thanks to you—we owe you a round!"`);
      }
      if (done.gloomfen) {
        pool.push(`Herb-Wife Marta grins from a corner booth: "Ever since you shattered Morwenna's marsh-lanterns, the evening mist off Gloomfen smells of sweet cedar again!"`);
      }
      if (done.ashen_keep) {
        pool.push(`Ser Garrick lifts a spiced cider toward you from the corner bench: "Oakhaven's banner still flies clean over Ashen Keep—never thought I'd live to see the Red Baron's fires out!"`);
      }
      if (done.whispering_mines) {
        pool.push(`Foreman Durn laughs beside the hearth: "No more singing quartz keeping my miners awake at night—drinks are on the salt-guild whenever you're in town!"`);
      }
      if ((state.level || 1) >= 7) {
        pool.push(`A hush falls near the hearth as younger sellswords study your scarred gear—word of a frontier legend travels fast in Oakhaven.`);
      }
      if (doneCount >= 5) {
        pool.push(`The hearthside bard tunes a silver string: "Deed after deed—Oakhaven's children already trade tales of your name in the square!"`);
      } else if (doneCount >= 1) {
        pool.push(`Old Bram wipes a mug and nods your way: "Word travels fast down the frontier road, traveler. Good to see a proven blade back by the fire."`);
      }

      lastTavernBarkKey = key;
      lastTavernBarkText = pool[Math.floor(Math.random() * pool.length)];
      return lastTavernBarkText;
    }

    function getShopkeeperGreeting(shopKey, shop) {
      const done = state.completedQuests || {};
      const d = getDerived(state);
      if (shopKey === "armory") {
        if (state.hardcore) return `"No second chances beyond the gates, iron-nerve. Let me check every strap and edge before you head back out."`;
        if (done.karak_zul) return `"That dwarven ore from Karak-Zul still sings on my anvil — you've earned a smith's respect, friend!"`;
        if (done.brasshaven) return `"Pip sent over a whole crate of salvaged Brasshaven springs—fine temper, too! Need anything reinforced before you head out?"`;
        if (done.ashen_keep) return `"Word of Ashen Keep's fall has every young sellsword asking for crimson-enameled pauldrons! Take first pick of my finest blades."`;
        if (done.bandit_citadel) return `"Since you cleared Ravencrest Citadel, fresh iron bars are rolling into Oakhaven again—pick yourself a proper edge!"`;
        if ((state.level || 1) >= 5) return `"You've got the stance of a seasoned frontier veteran now. Time to trade up to heavier steel!"`;
      }
      if (shopKey === "apothecary") {
        if (state.hp < d.maxHp) return `"Mercy, you've got fresh road-scrapes on you! Stock up on tonics before those bruises stiffen up."`;
        if (done.gloomfen) return `"Ever since you cleared Gloomfen Bog, my runners bring in the cleanest marsh-lotus petals I've seen in twenty years!"`;
        if (done.thornwood_part1) return `"Since you pushed back the Thornwood blight, my herb-pickers finally return with full baskets!"`;
        if ((state.skills || []).includes("Herbalism")) return `"Ah, a fellow hand with roots and poultices! Smell that fresh glowcap tincture — finest batch all season."`;
      }
      if (shopKey === "curios") {
        if (done.crimson_spire) return `"The astral tides have calmed since your venture to the Crimson Spire — my brass astrolabe finally spins true again."`;
        if (done.whispering_mines) return `"That crystal shard you brought up from the Whispering Salt-Mines still hums softly in my display case! Come see what else I've turned up."`;
        if ((state.arcana || 0) >= 4 || (state.spells || []).length >= 3) return `"A bright arcane resonance follows you in today! Step close — half these charms only wake for a true spellcaster."`;
        if ((d.s?.luck || 0) >= 6) return `"Curious... the silver pendulum behind my counter swings toward you. Fortune favors your steps today, traveler!"`;
      }
      return shop.quote;
    }

    function renderDistrictTavern(box) {
      const alreadyRested = !!(state.innRested || state.innBuff);
      const buffLbl = state.innBuff ? state.innBuff.charAt(0).toUpperCase() + state.innBuff.slice(1) : "";
      const tavernBark = getTavernAmbientBark();
      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div>
            <h3 class="font-display text-xl font-bold text-amber-300">The Rusty Flagon Tavern</h3>
            <p class="text-xs text-stone-400">Hearthfire, warm beds, and frontier rumors from seasoned travelers.</p>
          </div>
          <button id="btn-inn-rest" ${alreadyRested ? "disabled" : ""} class="px-4 py-2 rounded-xl text-xs font-display uppercase shadow ${alreadyRested ? "bg-stone-800/80 border border-stone-700 text-stone-400 cursor-not-allowed" : "btn-gold"}">
            ${alreadyRested ? `✓ Rested${buffLbl ? ` (+1 ${buffLbl})` : ""} • Quest to Rest Again` : "🛏️ Rest at Inn (10 GP)"}
          </button>
        </div>
        <div class="mb-4 px-3.5 py-2.5 rounded-xl bg-stone-950/70 border border-amber-800/35 text-xs text-amber-100/85 italic font-story leading-relaxed flex items-center justify-between gap-2">
          <span>🔥 ${tavernBark}</span>
          <button id="btn-speak-tavern-bark" type="button" class="shrink-0 px-2 py-1 rounded-lg bg-stone-900 hover:bg-amber-950/80 border border-amber-700/40 text-[11px] not-italic font-sans text-amber-200 transition" title="Hear tavern rumor">🔊</button>
        </div>
        <div id="tavern-dialogue-box" class="${activeNpcDialogue ? "" : "hidden"} mb-4 p-4 rounded-xl bg-stone-950 border border-amber-500/50 space-y-2 pop-in"></div>
        <div id="tavern-npc-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div>
      `;

      const barkBtn = box.querySelector("#btn-speak-tavern-bark");
      if (barkBtn) {
        barkBtn.onclick = () => window.OAKHAVEN_NARRATOR?.speakAs("tavern_bark", tavernBark, { name: "Rusty Flagon Patron" });
      }

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
            <div class="flex items-center justify-between gap-2">
              <div class="font-display text-sm font-bold text-amber-300">${npc.name} <span class="text-xs text-stone-400 font-normal">— ${npc.role}</span></div>
              <div class="flex items-center gap-2 shrink-0">
                <button id="btn-speak-npc" type="button" class="px-2 py-0.5 rounded-lg bg-stone-900 hover:bg-amber-950/80 border border-amber-700/40 text-[11px] text-amber-200 transition" title="Hear ${npc.name} speak">🔊 Speak</button>
                <button id="btn-close-npc" class="text-xs text-stone-400 hover:text-stone-200">Close ✕</button>
              </div>
            </div>
            <p class="font-story text-base text-stone-200 leading-relaxed">${activeNpcDialogue.text}</p>
            <div id="npc-options" class="flex flex-wrap gap-2 pt-1"></div>
          `;
          dBox.querySelector("#btn-speak-npc").onclick = () => {
            window.OAKHAVEN_NARRATOR?.speakAs(npc.id, activeNpcDialogue.text, { name: npc.name, role: npc.role });
          };
          dBox.querySelector("#btn-close-npc").onclick = () => {
            window.OAKHAVEN_NARRATOR?.stop(true);
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
              window.OAKHAVEN_NARRATOR?.speakAs(npc.id, opt.reply, { name: npc.name, role: npc.role, autoOnly: true });
              renderDistrictTavern(box);
            };
            optWrap.appendChild(b);
          });
        }
      }

      if (!Array.isArray(state.tavernPatrons)) {
        rollTavernPatrons();
      } else if (state.tavernPatrons.length > 1) {
        state.tavernPatrons = state.tavernPatrons.slice(0, 1);
      }
      // Safety net: if the Quest Board has no available quests, guarantee 1 fresh lead at the Inn
      if (getActiveBoardLeads().length === 0) {
        const hasFreshPatron = state.tavernPatrons.some(id => {
          const n = TAVERN_NPCS.find(x => x.id === id);
          return n && n.discoverQuest && !state.discoveredQuests.includes(n.discoverQuest) && !state.completedQuests[n.discoverQuest];
        });
        if (!hasFreshPatron) rollTavernPatrons();
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
          window.OAKHAVEN_NARRATOR?.speakAs(npc.id, npc.greeting, { name: npc.name, role: npc.role, autoOnly: true });
          renderDistrictTavern(box);
        };
        grid.appendChild(c);
      });
      if (visibleNpcs.length <= 1) {
        const quiet = document.createElement("div");
        quiet.className = "p-3.5 rounded-xl bg-stone-950/60 border border-dashed border-stone-800 text-xs text-stone-400 italic flex items-center";
        quiet.textContent = "A quiet evening at the Rusty Flagon — no travelers have new rumors right now. Complete a quest or rest at the inn to see who wanders in next.";
        grid.appendChild(quiet);
      }
    }

    const WILDERNESS_ZONES = [
      { id: "thornwood", name: "Thornwood Wilds", icon: "🌲", desc: "Misty pine trails, rushing river ravines, herb glades, and hidden forest ruins.", mats: ["glowcap_spores", "runed_shards"], beast: { name: "Thornwood Timber Wolves", desc: "Lean grey frontier wolves hunting along the pine ridge.", undead: false }, themeWords: ["forest", "wood", "grove", "willow", "briar", "fey", "mill", "river", "tree", "beast", "bear", "worg", "thorn"] },
      { id: "cliffs", name: "Saltfang Coast & Cliffs", icon: "🌊", desc: "Sea-sprayed headlands, tidal caves, weathered footbridges, and smuggler coves.", mats: ["sea_salt", "iron_ore"], beast: { name: "Saltfang Reef-Stalkers", desc: "Armored tide-pool predators skittering out of coastal caves.", undead: false }, themeWords: ["sea", "coast", "ship", "pirate", "island", "harbor", "cove", "dock", "barge", "beacon", "salt", "kraken", "water", "lake"] },
      { id: "ruins", name: "Old Abbey Moorlands", icon: "🏚️", desc: "Fog-wrapped cairns, crumbling border roads, bandit ambushes, and sunken crypts.", mats: ["bone_dust", "shadow_essence"], beast: { name: "Moorland Bone-Stalkers", desc: "Risen skeletal raiders prowling the fog-shrouded cairns.", undead: true }, themeWords: ["crypt", "tomb", "barrow", "undead", "ossuary", "abbey", "tower", "spire", "citadel", "shadow", "ghoul", "lich", "vampire", "dungeon", "ruin"] }
    ];

    function renderDistrictOutskirts(box) {
      const undiscoveredPool = Object.values(ADVENTURES).filter(
        adv => adv && !adv.isRandomEncounter && !adv.reqQuest && !state.discoveredQuests.includes(adv.id) && !state.completedQuests[adv.id]
      );
      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-1">
          <h3 class="font-display text-xl font-bold text-amber-300">The Outskirts — Wilderness Exploration</h3>
          <span class="px-2.5 py-1 rounded-full bg-stone-950 border border-emerald-700/40 text-xs text-emerald-300 font-semibold">
            🗺️ ${undiscoveredPool.length} Undiscovered Trails
          </span>
        </div>
        <p class="text-xs text-stone-400 mb-4">Venture beyond Oakhaven's walls into living random encounters — gather wild herbs, brave rushing rivers, fend off bandit ambushes, or stumble straight upon a hidden dungeon entrance!</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3" id="outskirts-grid"></div>
        <button id="btn-wander-random" class="w-full py-2.5 rounded-xl bg-stone-950 hover:bg-amber-950/60 border border-amber-600/50 text-xs font-display uppercase tracking-wider text-amber-200 transition">
          🧭 Wander a Random Frontier Trail
        </button>
      `;
      const grid = document.getElementById("outskirts-grid");
      WILDERNESS_ZONES.forEach(z => {
        const matNames = z.mats.map(m => ITEMS_DB[m]?.name || m).join(" • ");
        const c = document.createElement("div");
        c.className = "p-4 rounded-xl bg-stone-950/85 border border-stone-800 hover:border-amber-700/50 flex flex-col justify-between gap-3 transition";
        c.innerHTML = `
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xl">${z.icon}</span>
              <h4 class="font-display text-sm font-bold text-amber-200">${z.name}</h4>
            </div>
            <p class="text-xs text-stone-400 mt-1.5 leading-relaxed">${z.desc}</p>
            <div class="mt-2.5 text-[10px] text-emerald-300/90">🌿 Common Finds: ${matNames}</div>
          </div>
          <button class="w-full py-2 rounded-lg btn-gold text-xs font-display uppercase tracking-wider">Explore Wilds →</button>
        `;
        c.querySelector("button").onclick = () => startWildernessExpedition(z);
        grid.appendChild(c);
      });
      box.querySelector("#btn-wander-random").onclick = () => {
        const z = WILDERNESS_ZONES[Math.floor(Math.random() * WILDERNESS_ZONES.length)];
        startWildernessExpedition(z);
      };
    }

    function describeDungeonEntranceForQuest(quest, zone) {
      const blob = `${quest.title || ""} ${quest.subtitle || ""} ${quest.summary || ""}`.toLowerCase();
      if (/crypt|tomb|barrow|undead|ossuary|grave|lich|vampire|ghoul|abbey|catacomb|ghost|haunt/.test(blob)) {
        return {
          title: "A Moss-Choked Crypt Archway",
          prose: `Parting a curtain of grey brambles deep in ${zone.name}, you stop short before a sunken archway of cracked limestone. Grave-cold mist curls out between weathered skulls carved into the lintel, and faint lantern-flickers stir in the dark steps below.`
        };
      }
      if (/sea|coast|ship|pirate|island|harbor|cove|dock|barge|beacon|salt|kraken|tide|reef/.test(blob)) {
        return {
          title: "A Tide-Carved Sea-Cave",
          prose: `Following a narrow gull-crowded ledge along ${zone.name}, you discover a jagged sea-cave mouth half-hidden behind crashing surf. Smuggler rope-ladders dangle into the brine-scented gloom, and the echo of distant voices carries up from the dark water.`
        };
      }
      if (/tower|spire|wizard|mage|arcane|clockwork|alchem|crystal|portal|rift|astral|plan/.test(blob)) {
        return {
          title: "A Shimmering Rune-Carved Threshold",
          prose: `Beyond a quiet ridge in ${zone.name}, the air suddenly hums with static and the scent of ozone. Through parting mist rises an ancient, rune-etched stone threshold pulsing with restless arcane light — a gateway leading straight into a perilous mystery.`
        };
      }
      if (/cavern|cave|mine|dwarf|dwarven|underworld|deep|pit|tunnel|mountain|pass|chasm/.test(blob)) {
        return {
          title: "A Sunken Mountain Fissure",
          prose: `Behind a tumbled boulder slide in ${zone.name}, you uncover a yawning subterranean fissure shored up with iron-bolted dwarven timbers. Cold drafts carry the clang of distant metal and the unmistakable hush of an ancient underground lair.`
        };
      }
      if (/fey|forest|willow|wood|grove|river|mill|briar|thorn|garden|hedge|swamp|marsh|oasis/.test(blob)) {
        return {
          title: "A Silver-Barked Woodland Arch",
          prose: `Where the footpath narrows inside ${zone.name}, two ancient silver-barked trees lean together to form a natural living archway. Strange fireflies drift along a mossy track beyond the roots, whispering of wild magic and danger ahead.`
        };
      }
      return {
        title: "A Forgotten Frontier Trailhead",
        prose: `Off the beaten track in ${zone.name}, you stumble upon a weathered wooden signpost half-buried in ferns beside fresh boot-tracks and scorched lantern-glass. The narrow trail winds straight toward a brewing crisis on the frontier.`
      };
    }

    function pickWildernessDungeonQuest(zone) {
      const heroLv = state.level || 1;
      const undiscovered = Object.values(ADVENTURES).filter(
        adv => adv && !adv.isRandomEncounter && !adv.reqQuest && !state.discoveredQuests.includes(adv.id) && !state.completedQuests[adv.id]
      );
      if (undiscovered.length === 0) return null;

      // Prefer quests close to hero's level (<= heroLv + 2)
      const nearLevel = undiscovered.filter(a => (a.recommendedLevel || 1) <= heroLv + 2);
      const pool = nearLevel.length > 0 ? nearLevel : undiscovered;

      // Gently prefer quests whose theme matches the explored region
      const themed = pool.filter(a => {
        const txt = `${a.title || ""} ${a.subtitle || ""} ${a.summary || ""}`.toLowerCase();
        return (zone.themeWords || []).some(w => txt.includes(w));
      });
      const finalPool = themed.length > 0 ? themed : pool;
      return finalPool[Math.floor(Math.random() * finalPool.length)];
    }

    function buildWildernessEncounter(zone) {
      const lv = Math.max(1, state.level || 1);
      const dc = Math.min(16, 10 + Math.floor(lv / 2));
      const matId = zone.mats[Math.floor(Math.random() * zone.mats.length)];
      const matName = ITEMS_DB[matId]?.name || "Wild Herbs";
      const altMatId = zone.mats.find(m => m !== matId) || matId;
      const altMatName = ITEMS_DB[altMatId]?.name || matName;
      const lootRarity = lv >= 7 ? "rare" : lv >= 4 ? "uncommon" : "common";
      const baseGold = 10 + lv * 6;
      const baseXp = 18 + lv * 10;

      // 25% chance to stumble onto a themed Dungeon / Quest Entrance (if any undiscovered quests exist)
      const dungeonQuest = pickWildernessDungeonQuest(zone);
      if (dungeonQuest && Math.random() < 0.25) {
        const ent = describeDungeonEntranceForQuest(dungeonQuest, zone);
        const cleanSub = cleanQuestSubtitle(dungeonQuest.subtitle);
        return {
          id: "_wilderness_encounter",
          isRandomEncounter: true,
          title: `${zone.icon} ${zone.name} — Hidden Entrance`,
          subtitle: ent.title,
          difficulty: dungeonQuest.difficulty || "Adventure",
          recommendedLevel: dungeonQuest.recommendedLevel || lv,
          totalPages: 1,
          pages: {
            1: {
              zone: zone.name,
              title: ent.title,
              safeRetreat: true,
              text: `${ent.prose}<br/><br/><strong>Discovered Adventure:</strong> ${dungeonQuest.title}${cleanSub ? ` <em>(${cleanSub})</em>` : ""} — <strong>${dungeonQuest.difficulty || "Medium"} (Lv. ${dungeonQuest.recommendedLevel || 1}+)</strong>.<br/>${dungeonQuest.summary}`,
              choices: [
                {
                  t: `⚔️ Step Inside & Begin "${dungeonQuest.title}" Immediately!`,
                  startQuestDirect: dungeonQuest.id,
                  discoverySource: `Discovered in ${zone.name}`
                },
                {
                  t: "🗺️ Mark the Entrance on Your Quest Board & Return to Oakhaven",
                  markQuestAndReturn: dungeonQuest.id,
                  discoverySource: `Discovered in ${zone.name}`
                }
              ]
            }
          }
        };
      }

      // Otherwise roll from 8 rich wilderness encounter archetypes
      const encounterBuilders = [
        // 1. Peaceful Walk & Wild Herb Glade
        () => ({
          id: "_wilderness_encounter",
          isRandomEncounter: true,
          title: `${zone.icon} ${zone.name} — Quiet Trail`,
          subtitle: "Wilderness Foraging",
          difficulty: "Peaceful",
          recommendedLevel: lv,
          totalPages: 3,
          pages: {
            1: {
              zone: zone.name,
              title: "A Sunlit Patch of Wild Herbs",
              safeRetreat: true,
              text: `The frontier trail winds peacefully beneath birdsong and shifting light. Just off the mossy path, you spot a thriving cluster of wild ${matName} growing beside a trickling spring — untouched by travelers.`,
              choices: [
                {
                  t: `Carefully harvest the ${matName} roots and spores without bruising them.`,
                  badge: `Survival / Spirit DC ${dc}`,
                  check: {
                    stat: "spirit", skill: "Survival", dc, pass: 2, fail: 3,
                    passMsg: `Your deft harvest yields a double bundle of ${matName}!`,
                    failMsg: `You gather a modest handful of ${matName} before the breeze scatters the rest.`
                  },
                  onPass: { item: matId, gold: Math.round(baseGold * 0.5) }
                },
                {
                  t: "Pause by the cool spring to brew a soothing field poultice and catch your breath.",
                  onChoose: { healHp: 8 + lv * 2, healMp: 3, msg: `Cool spring water and wild herbs restore +${8 + lv * 2} HP and +3 MP!` },
                  to: 3
                },
                {
                  t: "Follow faint deer tracks behind the spring to see what else grows nearby.",
                  badge: `Perception / Luck DC ${dc}`,
                  check: {
                    stat: "luck", skill: "Perception", dc, pass: 2, fail: 3,
                    passMsg: `You discover a mossy waystone hiding ${altMatName} and a few silver coins!`,
                    failMsg: `The tracks fade into thick ferns, though the peaceful walk steadies your nerves.`
                  },
                  onPass: { item: altMatId, gold: baseGold }
                }
              ]
            },
            2: {
              zone: zone.name,
              title: "A Bountiful Walk",
              text: `You tuck your fresh finds safely into your pack and enjoy the quiet road back toward Oakhaven's wooden palisade.`,
              onEnter: { item: matId },
              ending: { type: "true", title: "Bountiful Foraging", xp: baseXp, gold: Math.round(baseGold * 0.4), trophy: "" },
              choices: []
            },
            3: {
              zone: zone.name,
              title: "Peaceful Return",
              text: `Refreshed by the open frontier air, you stroll back along the sunlit path toward Oakhaven.`,
              onEnter: { item: matId },
              ending: { type: "true", title: "Quiet Frontier Walk", xp: Math.round(baseXp * 0.7), gold: 0, trophy: "" },
              choices: []
            }
          }
        }),

        // 2. Raging River & Fallen Log Crossing
        () => {
          const slipDmg = Math.max(3, 2 + Math.floor(lv * 1.2));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Raging River`,
            subtitle: "Wilderness Crossing",
            difficulty: "Hazard",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "The Fallen Log Over the Rapids",
                safeRetreat: true,
                text: `Snowmelt and mountain rain have turned the creek crossing into a foaming torrent! A single moss-slick pine log spans the roaring gorge — and on the far bank gleams an abandoned pack beside a cluster of ${altMatName}.`,
                choices: [
                  {
                    t: "Sprint lightly across the slick fallen log, keeping your balance above the spray!",
                    badge: `Athletics / Agility DC ${dc}`,
                    check: {
                      stat: "agility", skill: "Athletics", dc, pass: 2, fail: 3,
                      failDmg: slipDmg,
                      passMsg: "You glide across the slick bark without a single misstep!",
                      failMsg: `Your boot slips on wet moss — icy rapids batter you (-${slipDmg} HP) before you haul yourself onto the far stones!`
                    }
                  },
                  {
                    t: "Test the bark, kick away loose moss, and cross slowly using a sturdy walking-branch.",
                    badge: `Survival / Spirit DC ${dc - 1}`,
                    check: {
                      stat: "spirit", skill: "Survival", dc: Math.max(9, dc - 1), pass: 2, fail: 3,
                      failDmg: Math.max(2, slipDmg - 2),
                      passMsg: "Patience pays off — you pick every foothold cleanly across the torrent!",
                      failMsg: `A chunk of wet bark gives way — you scrape your shins (-${Math.max(2, slipDmg - 2)} HP) scrambling to the bank!`
                    }
                  },
                  {
                    t: "Respect the raging river and follow the safer high-ridge path back to town.",
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Dry Boots & Far-Bank Spoils",
                text: `Safe on the far bank, you harvest the ${altMatName} and rummage through the weathered pack — recovering dry silver coins and a corked potion!`,
                onEnter: { item: altMatId, gold: baseGold },
                ending: { type: "true", title: "Master of the Crossing", xp: Math.round(baseXp * 1.2), gold: Math.round(baseGold * 0.6), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Soaked, But Across",
                text: `Dripping wet and shivering, you still manage to grab a bundle of ${altMatName} from the bank before taking the dry upper footbridge back toward Oakhaven.`,
                onEnter: { item: altMatId },
                ending: { type: "true", title: "Braved the Torrent", xp: baseXp, gold: Math.round(baseGold * 0.4), trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "A Wise Detour",
                text: `You follow the dry pine ridge back toward Oakhaven, spotting a stray patch of ${matName} along the way.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Safe Detour", xp: Math.round(baseXp * 0.6), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 3. Highway Bandit Ambush
        () => ({
          id: "_wilderness_encounter",
          isRandomEncounter: true,
          title: `${zone.icon} ${zone.name} — Bandit Ambush`,
          subtitle: "Highway Brigands",
          difficulty: "Combat",
          recommendedLevel: lv,
          totalPages: 4,
          pages: {
            1: {
              zone: zone.name,
              title: "Steel in the Brush!",
              safeRetreat: true,
              text: `A whistle slices through the quiet air of ${zone.name}! Three scarred frontier brigands step out from behind mossy boulders with notched blades and a strung bow: "Drop your coin-pouch, traveler — nice and slow!"`,
              choices: [
                {
                  t: "Duck into the roadside brush to turn the tables and ambush their flank!",
                  badge: `Stealth / Agility DC ${dc}`,
                  check: {
                    stat: "agility", skill: "Stealth", dc, pass: 2, fail: 2,
                    passMsg: "You circle behind the lookout and strike before they can form a line!",
                    failMsg: "A dry twig snaps — the brigands rush you with weapons raised!"
                  },
                  onPass: { cw: "AMBUSH_TURNED" }
                },
                {
                  t: "Glare coldly at their leader and warn them they picked the wrong adventurer!",
                  badge: `Persuasion / Might DC ${dc + 1}`,
                  check: {
                    stat: "might", skill: "Persuasion", dc: dc + 1, pass: 3, fail: 2,
                    passMsg: "Their leader pales at your steely composure and mutters a hasty retreat, dropping a stolen purse!",
                    failMsg: "The brigands laugh bitterly and lunge forward!"
                  }
                },
                {
                  t: "Draw your weapon and defend yourself!",
                  to: 2
                }
              ]
            },
            2: {
              zone: zone.name,
              title: "Frontier Skirmish",
              text: `The highway brigands close in across the dirt track, slashing wildly to take your pack!`,
              enemy: {
                name: "Frontier Highway Bandits",
                desc: `Desperate road-brigands preying on travelers outside ${zone.name}.`,
                hp: 14 + lv * 7,
                ac: 11 + Math.floor(lv / 2),
                atk: 3 + lv,
                dmg: 4 + Math.floor(lv * 1.1),
                xp: 26 + lv * 14,
                gold: 12 + lv * 8,
                items: rollRandomLoot(["consumable", "valuable", "weapon"], 1, lootRarity),
                flee: 4,
                weakCw: ["AMBUSH_TURNED"]
              },
              choices: [
                { t: "Search the defeated brigands' camp-sack and head back to Oakhaven.", to: 3 }
              ]
            },
            3: {
              zone: zone.name,
              title: "Road Cleared",
              text: `With the brigands routed, the frontier trail is safer for Oakhaven's merchants — and you recover a bundle of stolen supplies!`,
              onEnter: { item: matId },
              ending: { type: "true", title: "Bandit Ambush Repelled", xp: Math.round(baseXp * 1.3), gold: baseGold, trophy: "" },
              choices: []
            },
            4: {
              zone: zone.name,
              title: "Slipped Away",
              text: `You break contact through the treeline and circle safely back toward Oakhaven's gates.`,
              ending: { type: "true", title: "Escaped the Ambush", xp: Math.round(baseXp * 0.4), gold: 0, trophy: "" },
              choices: []
            }
          }
        }),

        // 4. Region Beast / Undead Skirmish
        () => ({
          id: "_wilderness_encounter",
          isRandomEncounter: true,
          title: `${zone.icon} ${zone.name} — Wild Predators`,
          subtitle: "Wilderness Skirmish",
          difficulty: "Combat",
          recommendedLevel: lv,
          totalPages: 4,
          pages: {
            1: {
              zone: zone.name,
              title: "Stalked on the Ridge",
              safeRetreat: true,
              text: `A low rattle echoes along the rocky trail in ${zone.name}. Ahead, ${zone.beast.name} emerge from the shadows, blocking the path toward a gleaming vein of ${altMatName}!`,
              choices: [
                {
                  t: "Stand your ground and drive the predators back with steel and spell!",
                  to: 2
                },
                {
                  t: "Creep along the downwind ledge to slip past them and claim the cache unseen.",
                  badge: `Stealth / Agility DC ${dc}`,
                  check: {
                    stat: "agility", skill: "Stealth", dc, pass: 3, fail: 2,
                    passMsg: "You slip silently past the prowlers and snatch the materials untouched!",
                    failMsg: "Loose gravel tumbles down the ridge — they lunge straight at you!"
                  }
                },
                {
                  t: "Back away calmly and return down the safe road to Oakhaven.",
                  to: 4
                }
              ]
            },
            2: {
              zone: zone.name,
              title: zone.beast.name,
              text: `${zone.beast.name} rush down the narrow ridge in a fury of claws and fangs!`,
              enemy: {
                name: zone.beast.name,
                desc: zone.beast.desc,
                hp: 16 + lv * 7,
                ac: 11 + Math.floor(lv / 2),
                atk: 3 + lv,
                dmg: 4 + Math.floor(lv * 1.15),
                undead: !!zone.beast.undead,
                xp: 28 + lv * 15,
                gold: 10 + lv * 6,
                items: rollRandomLoot(["material", "consumable"], 1, lootRarity),
                flee: 4
              },
              choices: [
                { t: `Gather the ${altMatName} along the ridge and return to town.`, to: 3 }
              ]
            },
            3: {
              zone: zone.name,
              title: "Spoils of the Ridge",
              text: `You gather ${altMatName} from the cleared ridge and head back toward Oakhaven.`,
              onEnter: { item: altMatId },
              ending: { type: "true", title: "Cleared the Frontier Ridge", xp: Math.round(baseXp * 1.25), gold: Math.round(baseGold * 0.6), trophy: "" },
              choices: []
            },
            4: {
              zone: zone.name,
              title: "Cautious Retreat",
              text: `You leave the predators to their territory and stroll safely back to Oakhaven.`,
              ending: { type: "true", title: "Returned Safely", xp: Math.round(baseXp * 0.4), gold: 0, trophy: "" },
              choices: []
            }
          }
        }),

        // 5. Abandoned Camp & Wayside Shrine
        () => ({
          id: "_wilderness_encounter",
          isRandomEncounter: true,
          title: `${zone.icon} ${zone.name} — Wayside Camp`,
          subtitle: "Frontier Discovery",
          difficulty: "Discovery",
          recommendedLevel: lv,
          totalPages: 3,
          pages: {
            1: {
              zone: zone.name,
              title: "The Old Wayfarer's Shrine",
              safeRetreat: true,
              text: `In a sheltered hollow of ${zone.name}, you come upon a mossy wayside shrine beside an abandoned prospector's camp. A rusted lockbox peeks out beneath a fallen canvas tarp, while clear rainwater sparkles in the shrine's stone basin.`,
              choices: [
                {
                  t: "Check the tarp for tripwires and pry open the prospector's lockbox.",
                  badge: `Lockpicking / Agility DC ${dc}`,
                  check: {
                    stat: "agility", skill: "Lockpicking", dc, pass: 2, fail: 3,
                    failDmg: 3,
                    passMsg: "Click! Inside lies dry silver coin and a corked Healing Potion!",
                    failMsg: "A rusted needle-spring nicks your thumb (-3 HP) before you pry the lid free!"
                  },
                  onPass: { item: "health_potion", gold: baseGold }
                },
                {
                  t: "Kneel quietly at the wayside shrine and wash the trail-dust from your brow.",
                  onChoose: { healHp: 10 + lv * 2, healMp: 4, msg: `A calm blessing settles over you (+${10 + lv * 2} HP, +4 MP)!` },
                  to: 3
                }
              ]
            },
            2: {
              zone: zone.name,
              title: "Prospector's Hoard",
              text: `You pack away the prospector's salvage and a stray pouch of ${matName} before heading back to Oakhaven.`,
              onEnter: { item: matId },
              ending: { type: "true", title: "Wayside Salvage", xp: baseXp, gold: Math.round(baseGold * 0.5), trophy: "" },
              choices: []
            },
            3: {
              zone: zone.name,
              title: "Quiet Blessing",
              text: `Steadied by the quiet hollow, you gather a handful of ${matName} and return to Oakhaven.`,
              onEnter: { item: matId },
              ending: { type: "true", title: "Rested at the Wayside Shrine", xp: Math.round(baseXp * 0.8), gold: 0, trophy: "" },
              choices: []
            }
          }
        }),

        // 6. Wandering Frontier Peddler
        () => ({
          id: "_wilderness_encounter",
          isRandomEncounter: true,
          title: `${zone.icon} ${zone.name} — Traveling Peddler`,
          subtitle: "Roadside Bargain",
          difficulty: "Encounter",
          recommendedLevel: lv,
          totalPages: 4,
          pages: {
            1: {
              zone: zone.name,
              title: "Barnaby Quill's Tin-Bell Cart",
              safeRetreat: true,
              text: `The cheerful clatter of tin pots and brass bells echoes along the winding track of ${zone.name}. A dappled mule pulls a canvas-topped cart led by Barnaby Quill, a grinning frontier peddler in a patched oilskin coat. "Ho there, road-walker! Care to haggle over field supplies, test your eye on my curiosity tray, or share a mug of spiced cider?"`,
              choices: [
                {
                  t: "Haggle sharply with Barnaby for a road-weary discount on his healing stock.",
                  badge: `Persuasion / Spirit DC ${dc}`,
                  check: {
                    stat: "spirit", skill: "Persuasion", dc, pass: 2, fail: 3,
                    passMsg: "Barnaby roars with laughter at your sharp tongue and tosses in a Health Potion and loose silver!",
                    failMsg: "Barnaby winks and taps his nose: 'Fair try, friend, but a peddler's got to eat!'"
                  },
                  onPass: { item: "health_potion", gold: Math.round(baseGold * 0.5) }
                },
                {
                  t: "Scan his dusty brass curiosity tray for a mispriced treasure he overlooked.",
                  badge: `Perception / Luck DC ${dc + 1}`,
                  check: {
                    stat: "luck", skill: "Perception", dc: dc + 1, pass: 2, fail: 3,
                    passMsg: `Beneath tarnished spoons you spot a pristine bundle of ${altMatName} and a stray silver trade-bar!`,
                    failMsg: "Nothing but bent candlesticks and chipped teacups today — though Barnaby appreciates your company."
                  },
                  onPass: { item: altMatId, gold: baseGold }
                },
                {
                  t: "Sit on the wagon tailboard, sip hot spiced cider, and swap frontier news.",
                  onChoose: { healHp: 8 + lv * 2, healMp: 4, msg: `Spiced cider and good company restore +${8 + lv * 2} HP and +4 MP!` },
                  to: 4
                }
              ]
            },
            2: {
              zone: zone.name,
              title: "A Bargain Well Struck",
              text: `Barnaby tips his waxed cap and hands over a spare pouch of ${matName} for the road before clicking his tongue to start the mule onward.`,
              onEnter: { item: matId },
              ending: { type: "true", title: "Frontier Bargain", xp: Math.round(baseXp * 1.15), gold: Math.round(baseGold * 0.4), trophy: "" },
              choices: []
            },
            3: {
              zone: zone.name,
              title: "No Hard Feelings",
              text: `Barnaby chuckles, hands you a complimentary pinch of ${matName} "for next time," and rolls on down the frontier track.`,
              onEnter: { item: matId },
              ending: { type: "true", title: "Met the Road Peddler", xp: Math.round(baseXp * 0.8), gold: 0, trophy: "" },
              choices: []
            },
            4: {
              zone: zone.name,
              title: "Warm Cider on the Trail",
              text: `Warmed by the cider and richer in frontier gossip, you pocket a gifted bundle of ${matName} and stroll back toward Oakhaven.`,
              onEnter: { item: matId },
              ending: { type: "true", title: "Roadside Hospitality", xp: Math.round(baseXp * 0.8), gold: 0, trophy: "" },
              choices: []
            }
          }
        }),

        // 7. Wounded Frontier Scout
        () => {
          const grazeDmg = Math.max(2, 1 + Math.floor(lv * 0.8));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Wounded Scout`,
            subtitle: "Frontier Rescue",
            difficulty: "Rescue",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "A Watch-Cloak Beneath the Boulders",
                safeRetreat: true,
                text: `Tucked beneath a wind-bent boulder in ${zone.name}, a young Oakhaven watch-scout presses a torn cloak against a bleeding shoulder while snapped arrow-shafts litter the mud. "Thank the lanterns... raiders drove me off the ridge! Could you bind this cut or help me back toward the palisade?"`,
                choices: [
                  {
                    t: "Crush wild roadside herbs into a field poultice and bind the scout's shoulder cleanly.",
                    badge: `Herbalism / Spirit DC ${dc}`,
                    check: {
                      stat: "spirit", skill: "Herbalism", dc, pass: 2, fail: 3,
                      passMsg: "Your steady hands stanch the bleeding immediately — the scout rises with renewed color!",
                      failMsg: "The bandage holds well enough to walk, though the march back is slow and tense."
                    }
                  },
                  {
                    t: "Shoulder the scout's pack, brace their arm, and haul them briskly off the ridge.",
                    badge: `Athletics / Might DC ${dc}`,
                    check: {
                      stat: "might", skill: "Athletics", dc, pass: 2, fail: 3,
                      passMsg: "You power down the rocky switchback without breaking stride, outpacing any pursuit!",
                      failMsg: "Steep shale slows your footing, yet you stubbornly drag the scout into safe treeline."
                    }
                  },
                  {
                    t: "Keep watch over the ridge-line while they catch their breath, spotting any raiders early.",
                    badge: `Perception / Agility DC ${dc - 1}`,
                    check: {
                      stat: "agility", skill: "Perception", dc: Math.max(9, dc - 1), pass: 2, fail: 4,
                      failDmg: grazeDmg,
                      passMsg: "You spot a flanking patrol in time to slip cleanly down a hidden ravine!",
                      failMsg: `A stray arrow grazes your sleeve (-${grazeDmg} HP) as you pull the scout into the brush!`
                    }
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Gratitude of the Watch",
                text: `At Oakhaven's outer lantern-post, the watch-sergeant salutes your bravery and presses a silver bounty purse, a Bramble Antidote, and a fresh satchel of ${altMatName} into your hands!`,
                onEnter: { item: "antidote", gold: baseGold },
                ending: { type: "true", title: "Frontier Rescue", xp: Math.round(baseXp * 1.35), gold: Math.round(baseGold * 0.6), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Rough March Home",
                text: `Mud-spattered and breathless, you guide the scout safely through Oakhaven's palisade. Before heading to the healer, they insist you take their gathered pouch of ${matName}.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Escorted the Scout", xp: baseXp, gold: Math.round(baseGold * 0.5), trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "Dodged the Pursuit",
                text: `You lose the pursuing shadows in thick brambles and bring the scout home by the long river-road, gathering a stray bundle of ${matName} along the bank.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Outran the Raiders", xp: Math.round(baseXp * 0.9), gold: Math.round(baseGold * 0.35), trophy: "" },
                choices: []
              }
            }
          };
        },

        // 8. Ancient Moss-Covered Waystone Riddle
        () => {
          const shockDmg = Math.max(2, 2 + Math.floor(lv * 0.8));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Ancient Waystone`,
            subtitle: "Arcane Mystery",
            difficulty: "Mystery",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "The Obelisk of Three Moons",
                safeRetreat: true,
                text: `In a quiet clearing of ${zone.name}, a leaning obelisk of pale granite rises from a ring of silver-tipped wildflowers. Faint blue runes pulse along its weathered face, framing a recessed stone basin carved with three interlocking crescent moons.`,
                choices: [
                  {
                    t: "Trace the lunar glyphs in sequence and intone the old frontier cadence aloud.",
                    badge: `Arcana DC ${dc}`,
                    check: {
                      stat: "arcana", skill: "Arcana", dc, pass: 2, fail: 3,
                      failDmg: shockDmg,
                      passMsg: "The runes flare azure — a hidden plinth glides open with a chime like crystal bells!",
                      failMsg: `A discordant spark snaps across your knuckles (-${shockDmg} HP) as the ward flickers out!`
                    }
                  },
                  {
                    t: "Inspect the moss-choked seams beneath the basin for a mechanical counter-latch.",
                    badge: `Detect Traps / Luck DC ${dc}`,
                    check: {
                      stat: "luck", skill: "Detect Traps", dc, pass: 2, fail: 3,
                      failDmg: Math.max(2, shockDmg - 1),
                      passMsg: "Your fingers find a recessed brass peg — clicking it disarms the ward and pops the secret vault!",
                      failMsg: `A frost-ward hisses across your fingers (-${Math.max(2, shockDmg - 1)} HP) before the stone seals shut!`
                    }
                  },
                  {
                    t: "Bow respectfully to the old road-spirits and harvest the wildflower ring untouched.",
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "The Waystone's Cache",
                text: `Inside the dry stone hollow rests an ancient traveler's offering: a glowing Mana Elixir, tarnished frontier silver, and a preserved bundle of ${altMatName}!`,
                onEnter: { item: "mana_elixir", gold: baseGold },
                ending: { type: "true", title: "Unlocked the Ancient Waystone", xp: Math.round(baseXp * 1.3), gold: Math.round(baseGold * 0.5), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Stung by Old Wards",
                text: `Shaking the tingle from your fingertips, you leave the dormant obelisk behind and collect a handful of ${matName} along the trail back to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Braved the Waystone Ward", xp: Math.round(baseXp * 0.85), gold: 0, trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "Respect for the Old Roads",
                text: `A cool breeze whispers across the clearing as if in quiet approval. You gather fresh ${matName} from the ring of wildflowers and return peacefully to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Keeper of the Old Roads", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 9. Sudden Frontier Tempest
        () => {
          const stormDmg = Math.max(2, 2 + Math.floor(lv * 0.9));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Frontier Tempest`,
            subtitle: "Weather Hazard",
            difficulty: "Hazard",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "Squall Over the Ridge",
                safeRetreat: true,
                text: `Iron-grey thunderheads roll fast across ${zone.name}, driving stinging sleet and howling gusts across the trail! A lightning-split pine nearby exposes a gleaming pocket of ${altMatName}, while a low granite overhang offers quick shelter.`,
                choices: [
                  {
                    t: `Sprint across the wind-lashed scree to snatch the exposed ${altMatName} before the squall peaks!`,
                    badge: `Athletics / Agility DC ${dc}`,
                    check: {
                      stat: "agility", skill: "Athletics", dc, pass: 2, fail: 3,
                      failDmg: stormDmg,
                      passMsg: `You scoop up the ${altMatName} and dive under cover just as hail hammers the ridge!`,
                      failMsg: `Driving sleet and flying branches batter you (-${stormDmg} HP) as you scramble for shelter!`
                    },
                    onPass: { item: altMatId, gold: Math.round(baseGold * 0.7) }
                  },
                  {
                    t: "Read the wind-break along the cliff to find a dry, hidden smuggler's cave.",
                    badge: `Survival / Spirit DC ${dc}`,
                    check: {
                      stat: "spirit", skill: "Survival", dc, pass: 2, fail: 3,
                      passMsg: "Tucked behind dry brambles you find a sheltered alcove with a dry Pitch Torch and loose coin!",
                      failMsg: "No cave turns up—you huddle beneath a pine bough until the downpour passes."
                    },
                    onPass: { item: "torch", gold: baseGold }
                  },
                  {
                    t: "Duck beneath the granite overhang, kindle a tiny tinder-fire, and wait out the storm.",
                    onChoose: { healHp: 6 + lv * 2, healMp: 3, msg: `Warm tinder-smoke and dry stone restore +${6 + lv * 2} HP and +3 MP!` },
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Outsmarted the Squall",
                text: `As silver sunbeams break through the parting clouds, you pack your storm-won spoils and a damp bundle of ${matName} before returning to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Weathered the Tempest", xp: Math.round(baseXp * 1.2), gold: Math.round(baseGold * 0.4), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Drenched to the Bone",
                text: `Shivering as the gale finally blows eastward, you still pluck a handful of ${matName} from the rain-washed verge on your walk home.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Survived the Squall", xp: baseXp, gold: 0, trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "After the Rain",
                text: `The air smells crisp with wet pine and ozone as you leave the overhang, gathering fresh ${matName} along the glistening trail back to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Sheltered from the Storm", xp: Math.round(baseXp * 0.8), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 10. Overturned Caravan Wagon
        () => {
          const snareDmg = Math.max(2, 1 + Math.floor(lv * 0.7));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Overturned Wagon`,
            subtitle: "Frontier Salvage",
            difficulty: "Discovery",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "Broken Axle in the Mud",
                safeRetreat: true,
                text: `Half-sunk in a muddy rut along ${zone.name} lies an abandoned merchant supply-wagon with a snapped oak axle. Torn canvas snaps in the breeze, and the heavy driver's box glints beneath the tilted timber frame.`,
                choices: [
                  {
                    t: "Brace your shoulders and heave the heavy wagon-frame aside to open the driver's lockbox!",
                    badge: `Athletics / Might DC ${dc}`,
                    check: {
                      stat: "might", skill: "Athletics", dc, pass: 2, fail: 3,
                      passMsg: "With a grunt of effort, the timber shifts—revealing a dry Health Potion and trade silver!",
                      failMsg: "The waterlogged frame refuses to budge, forcing you to settle for loose tailgate scraps."
                    },
                    onPass: { item: "health_potion", gold: baseGold }
                  },
                  {
                    t: "Inspect the mud-caked undercarriage for hidden smuggler compartments and bandit snares.",
                    badge: `Detect Traps / Luck DC ${dc}`,
                    check: {
                      stat: "luck", skill: "Detect Traps", dc, pass: 2, fail: 3,
                      failDmg: snareDmg,
                      passMsg: "You disarm a rusted wire-snare and slide out a hidden drawer holding a Silver Signet!",
                      failMsg: `A bandit's iron snare snaps across your wrist (-${snareDmg} HP) before you wrench free!`
                    },
                    onPass: { item: "silver_signet", gold: Math.round(baseGold * 0.5) }
                  },
                  {
                    t: `Grab a dry sack of ${matName} from the tailgate and slip away before scavengers arrive.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Clean Frontier Salvage",
                text: `You stow the merchant's unclaimed salvage along with a spare bundle of ${matName} and head back toward Oakhaven's gates.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Caravan Salvager", xp: Math.round(baseXp * 1.2), gold: Math.round(baseGold * 0.5), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Empty Pickings",
                text: `Distant crow-calls warn you not to linger—you grab a handful of ${matName} from the roadside and make for Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Scouted the Wreck", xp: Math.round(baseXp * 0.8), gold: 0, trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "Quick Hands, Safe Road",
                text: `You leave the broken wagon to the crows and stroll safely back to Oakhaven with fresh ${matName} tucked in your pack.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Roadside Scavenger", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 11. The Whispering Lantern-Ghost
        () => {
          const chillDmg = Math.max(2, 2 + Math.floor(lv * 0.8));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Lantern-Ghost`,
            subtitle: "Eerie Encounter",
            difficulty: "Mystery",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "The Spectral Courier",
                safeRetreat: true,
                text: `A pale azure lantern bobs silently along the mist-veiled track of ${zone.name}. Beneath its cold glow floats the translucent figure of an old frontier courier, pointing with a gloved hand toward a sunken milestone beside the road.`,
                choices: [
                  {
                    t: "Speak a gentle blessing of the Dawn to release the courier from their long watch.",
                    badge: `Persuasion / Spirit DC ${dc}`,
                    check: {
                      stat: "spirit", skill: "Persuasion", dc, pass: 2, fail: 3,
                      passMsg: "The courier bows in silent gratitude—dissolving into warm motes above a hidden Mana Elixir and silver!",
                      failMsg: "The apparition flickers sadly and drifts away into the mist without a sound."
                    },
                    onPass: { item: "mana_elixir", gold: baseGold }
                  },
                  {
                    t: "Trace the ghost's fading ley-trail with Arcana to uncover what lies buried by the milestone.",
                    badge: `Arcana DC ${dc}`,
                    check: {
                      stat: "arcana", skill: "Arcana", dc, pass: 2, fail: 3,
                      failDmg: chillDmg,
                      passMsg: `Your arcane sight reveals a dry stone cache packed with ${altMatName} and old frontier coin!`,
                      failMsg: `A wave of grave-cold mist numbs your fingers (-${chillDmg} HP) as the lantern winks out!`
                    },
                    onPass: { item: altMatId, gold: Math.round(baseGold * 1.1) }
                  },
                  {
                    t: `Step respectfully off the road, let the pale lantern pass, and gather ${matName} nearby.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Rest for the Old Courier",
                text: `With the sunken milestone's cache recovered and the mist lifting cleanly from the road, you collect a pouch of ${matName} and return to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Laid the Courier to Rest", xp: Math.round(baseXp * 1.3), gold: Math.round(baseGold * 0.5), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Faded Into Mist",
                text: `Only cold twilight remains along the trail. You gather a bundle of ${matName} and briskly walk back to Oakhaven's warm lanterns.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Crossed a Frontier Ghost", xp: Math.round(baseXp * 0.85), gold: 0, trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "Quiet Passage",
                text: `The azure lantern drifts peacefully over the treeline as you gather fresh ${matName} and return safely to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Respected the Road-Spirits", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 12. The Whispering Herb-Grove
        () => {
          const thornDmg = Math.max(2, 1 + Math.floor(lv * 0.6));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Whispering Herb-Grove`,
            subtitle: "Rare Botanical Find",
            difficulty: "Discovery",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "The Dew-Bright Hollow",
                safeRetreat: true,
                text: `Just off the winding track of ${zone.name}, sunlight pools inside a sheltered hollow thick with silverleaf and pale moon-blossoms. A tiny emerald-winged sprite darts around a mossy stump, guarding the richest cluster.`,
                choices: [
                  {
                    t: "Trim the silverleaf stalks gently with Herbalism so the roots stay whole.",
                    badge: `Herbalism / Spirit DC ${dc}`,
                    check: {
                      stat: "spirit", skill: "Herbalism", dc, pass: 2, fail: 3,
                      passMsg: "The sprite trills approvingly as you harvest pure essences—even nudging a forgotten Health Potion from the moss!",
                      failMsg: "A bruised stem releases bitter sap, sending the sprite darting away into the canopy."
                    },
                    onPass: { item: "health_potion", gold: baseGold }
                  },
                  {
                    t: "Keep still and track where the darting sprite hides its brightest cache.",
                    badge: `Perception / Luck DC ${dc}`,
                    check: {
                      stat: "luck", skill: "Perception", dc, pass: 2, fail: 3,
                      failDmg: thornDmg,
                      passMsg: "Your keen eye spots a hollow knot holding a shimmering Mana Elixir and stray silver coins!",
                      failMsg: `Snagging briars scratch your wrist (-${thornDmg} HP) as the sprite vanishes in a shower of pollen!`
                    },
                    onPass: { item: "mana_elixir", gold: Math.round(baseGold * 0.9) }
                  },
                  {
                    t: `Gather a modest handful of ${matName} from the outer verge and leave the hollow in peace.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Bounty of the Wilds",
                text: `Your satchel smells of sweet wild mint and rain-washed moss as you tuck away fresh ${matName} and stride back toward Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Master Forager", xp: Math.round(baseXp * 1.25), gold: Math.round(baseGold * 0.4), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Wilted Pickings",
                text: `With the grove quiet again, you collect a spare bundle of ${matName} along the trail and head back to town.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Brushed the Wild Grove", xp: Math.round(baseXp * 0.8), gold: 0, trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "Respect for the Hollow",
                text: `Leaving the hidden hollow undisturbed, you pocket fresh ${matName} from the verge and walk peacefully home to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Gentle Traveler", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 13. The Riddle of the Moss-Covered Cairn
        () => {
          const sparkDmg = Math.max(2, 2 + Math.floor(lv * 0.7));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Moss-Covered Cairn`,
            subtitle: "Old Frontier Puzzle",
            difficulty: "Mystery",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "Three Stones and a Chime-Lock",
                safeRetreat: true,
                text: `Where an old surveyor's path crosses ${zone.name}, three moss-draped standing stones ring an iron chime-lock etched with a rising sun, a cresting wave, and a watchman's lantern. Inside the barred niche glints a sealed wayfarer's coffer.`,
                choices: [
                  {
                    t: "Decode the archaic Oakhaven rhyme carved around the chime-lock with Arcana.",
                    badge: `Arcana DC ${dc}`,
                    check: {
                      stat: "arcana", skill: "Arcana", dc, pass: 2, fail: 3,
                      failDmg: sparkDmg,
                      passMsg: "You tap Lantern, Wave, then Sun—the chime-lock rings true, yielding Alchemical Oil and old coin!",
                      failMsg: `A dissonant ward-spark snaps across your knuckles (-${sparkDmg} HP) as the coffer seals shut!`
                    },
                    onPass: { item: "alchemical_oil", gold: baseGold }
                  },
                  {
                    t: "Feel for the worn brass tumbler pins along the chime-lock's rim.",
                    badge: `Lockpicking / Agility DC ${dc}`,
                    check: {
                      stat: "agility", skill: "Lockpicking", dc, pass: 2, fail: 3,
                      passMsg: "Your pick clicks the final pin home—revealing a tarnished Silver Signet and frontier silver!",
                      failMsg: "The old mechanism jams tight, refusing to budge any further."
                    },
                    onPass: { item: "silver_signet", gold: Math.round(baseGold * 0.85) }
                  },
                  {
                    t: `Leave the old surveyor's cairn untouched, collect ${matName} nearby, and return to town.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "The Wayfarer's Coffer",
                text: `You close the niche neatly behind you, stow a bundle of ${matName} from the cairn's base, and head back to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Solved the Cairn Riddle", xp: Math.round(baseXp * 1.3), gold: Math.round(baseGold * 0.45), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Silent Stones",
                text: `The cairn keeps its secrets for another day. You gather ${matName} along the road and turn back toward Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Tested the Old Cairn", xp: Math.round(baseXp * 0.8), gold: 0, trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "Road-Builder's Peace",
                text: `With a respectful nod to Oakhaven's early scouts, you pocket fresh ${matName} and stroll safely home.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Cautious Wayfarer", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 14. The Poacher's Snare-Camp
        () => {
          const poacherHp = 14 + lv * 4;
          const poacherAc = 10 + Math.min(4, Math.floor(lv / 2));
          const poacherAtk = 2 + Math.floor(lv * 0.8);
          const poacherDmg = 3 + Math.floor(lv * 0.7);
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Poacher's Snare-Camp`,
            subtitle: "Frontier Ambush",
            difficulty: "Skirmish",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "Smoke in the Brush",
                safeRetreat: true,
                text: `Thin grey woodsmoke curls above a brush-choked hollow in ${zone.name}. Peering through the leaves, you spot a scarred frontier poacher sharpening a skinning-knife beside a trapped white-tailed stag—and a stolen Oakhaven supply pack leaning against a log.`,
                choices: [
                  {
                    t: "Creep around the windward brush to cut the snare-rope and snatch the supply pack unseen!",
                    badge: `Stealth / Agility DC ${dc}`,
                    check: {
                      stat: "agility", skill: "Stealth", dc, pass: 2, fail: 3,
                      passMsg: "You slice the rope cleanly—the stag bolts through the camp in a panic, letting you snag the pack and slip away!",
                      failMsg: "A dry twig snaps underfoot! The poacher whirls around with a snarl and draws a heavy hunting blade!"
                    },
                    onPass: { item: "health_potion", gold: baseGold }
                  },
                  {
                    t: "Step into the clearing with weapon drawn and drive the poacher out of Oakhaven's wilds!",
                    to: 3
                  },
                  {
                    t: `Circle wide around the snare-camp, gather ${matName} along the ridge, and head home.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "The Stag Runs Free",
                text: `Leaving the bewildered poacher empty-handed, you claim a fresh bundle of ${matName} along the ridge and carry the recovered supplies back to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Outfoxed the Poacher", xp: Math.round(baseXp * 1.3), gold: Math.round(baseGold * 0.5), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Clash at the Snare-Camp",
                text: `'Mind your own business, town-folk!' The poacher kicks embers toward your boots and lunges across the clearing!`,
                enemy: {
                  name: "Frontier Poacher",
                  desc: "Wiry outlaw armed with barbed snares and a heavy hunting knife.",
                  hp: poacherHp,
                  ac: poacherAc,
                  atk: poacherAtk,
                  dmg: poacherDmg,
                  xp: Math.round(baseXp * 1.4),
                  gold: Math.round(baseGold * 1.15),
                  items: [altMatId],
                  flee: 4
                },
                choices: [
                  { t: "Cut the stag's snare free and claim the poacher's camp supplies!", to: 2 }
                ]
              },
              4: {
                zone: zone.name,
                title: "Safe Detour",
                text: `You skirt the hollow quietly, collect fresh ${matName} along the outer ridge, and return safely to Oakhaven's gates.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Avoided Trouble", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 15. The Abandoned Apothecary Cart
        () => {
          const fumeDmg = Math.max(2, 1 + Math.floor(lv * 0.7));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Apothecary Cart`,
            subtitle: "Alchemical Find",
            difficulty: "Discovery",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "Rattling Vials by the Trail",
                safeRetreat: true,
                text: `Wedged against a wind-felled pine along ${zone.name} sits an overturned apothecary's handcart. Torn oilcloth flaps over rows of stoppered amber vials and a brass-clasped dispatch satchel wedged beneath the seat.`,
                choices: [
                  {
                    t: "Sort the unmarked tinctures by scent and hue with Herbalism.",
                    badge: `Herbalism / Arcana DC ${dc}`,
                    check: {
                      stat: "arcana", skill: "Herbalism", dc, pass: 2, fail: 3,
                      failDmg: fumeDmg,
                      passMsg: "You separate the true curatives cleanly—claiming a pure Health Potion and a pouch of apothecary silver!",
                      failMsg: `A cracked flask puffs stinging sulfur-vapor across your face (-${fumeDmg} HP) before you step back!`
                    },
                    onPass: { item: "health_potion", gold: baseGold }
                  },
                  {
                    t: "Pick the corroded brass clasp on the dispatch satchel under the seat.",
                    badge: `Lockpicking / Agility DC ${dc}`,
                    check: {
                      stat: "agility", skill: "Lockpicking", dc, pass: 2, fail: 3,
                      passMsg: "The latch pops open—revealing a corked Mana Elixir and trade coin!",
                      failMsg: "The rusted clasp snaps inside the lock, jamming the satchel shut."
                    },
                    onPass: { item: "mana_elixir", gold: Math.round(baseGold * 0.9) }
                  },
                  {
                    t: `Take a dry sack of ${matName} from the lower tray and leave the fragile glass alone.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Clean Apothecary Salvage",
                text: `With the finest draughts safely padded in your pack alongside fresh ${matName}, you set off down the road toward Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Salvaged the Apothecary Cart", xp: Math.round(baseXp * 1.25), gold: Math.round(baseGold * 0.45), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Shattered Glass",
                text: `Leaving the broken vials to the wind, you scoop up a spare bundle of ${matName} from the verge and head home.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Checked the Wrecked Cart", xp: Math.round(baseXp * 0.8), gold: 0, trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "Prudent Forager",
                text: `Better safe than blistered—you tuck away fresh ${matName} and walk briskly back to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Cautious Salvager", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 16. The Sunken Bell-Shrine
        () => {
          const healAmt = 6 + lv * 2;
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Sunken Bell-Shrine`,
            subtitle: "Dawn-Watch Relic",
            difficulty: "Mystery",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "The Bronze Wayside Bell",
                safeRetreat: true,
                text: `Half-swallowed by brambles off ${zone.name} stands a weathered stone arch hung with an old Dawn-Watch bronze bell. Warm golden motes drift from the verdigris rim whenever the breeze nudges its clapper.`,
                choices: [
                  {
                    t: "Ring the bronze bell softly and speak a traveler's blessing of the Dawn.",
                    badge: `Persuasion / Spirit DC ${dc}`,
                    check: {
                      stat: "spirit", skill: "Persuasion", dc, pass: 2, fail: 3,
                      passMsg: `A clear golden chime washes away your fatigue (+${healAmt} HP) and reveals a pilgrim's Health Potion!`,
                      failMsg: "Only a dull bronze clank echoes into the brush, leaving the shrine silent."
                    },
                    onPass: { item: "health_potion", gold: Math.round(baseGold * 0.8), healHp: healAmt }
                  },
                  {
                    t: "Inspect the mossy plinth beneath the arch for a hidden pilgrim cache.",
                    badge: `Perception / Luck DC ${dc}`,
                    check: {
                      stat: "luck", skill: "Perception", dc, pass: 2, fail: 3,
                      passMsg: "Behind a loose keystone rests a tarnished Silver Signet and old wayside coin!",
                      failMsg: "You find only damp moss and fallen leaves beneath the arch."
                    },
                    onPass: { item: "silver_signet", gold: Math.round(baseGold * 0.9) }
                  },
                  {
                    t: `Rest quietly beneath the arch, gather ${matName} nearby, and return to town.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Blessing of the Wayside",
                text: `Buoyed by the shrine's quiet warmth, you gather a bundle of ${matName} along the path and stride back to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Honored the Bell-Shrine", xp: Math.round(baseXp * 1.25), gold: Math.round(baseGold * 0.4), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Quiet Stones",
                text: `The old shrine keeps its silence. You collect fresh ${matName} from the verge and head home.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Visited the Wayside Arch", xp: Math.round(baseXp * 0.8), gold: 0, trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "Peaceful Breather",
                text: `After a brief rest under the mossy arch, you stow fresh ${matName} in your pack and stroll back to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Wayfarer's Rest", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 17. The Ambush at the Old Culvert
        () => {
          const cutpurseHp = 15 + lv * 4;
          const cutpurseAc = 10 + Math.min(4, Math.floor(lv / 2));
          const cutpurseAtk = 2 + Math.floor(lv * 0.85);
          const cutpurseDmg = 3 + Math.floor(lv * 0.7);
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Old Culvert Ambush`,
            subtitle: "Frontier Skirmish",
            difficulty: "Skirmish",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "Trip-Wire Across the Stone Arch",
                safeRetreat: true,
                text: `Where ${zone.name} narrows over a mossy stone drainage-culvert, a faint copper glint catches your eye ankle-high across the dirt. In the alder bushes beyond, two hooded Highway Cutpurses crouch beside a pilfered pack-mule!`,
                choices: [
                  {
                    t: "Spot the wire, loop behind the culvert, and scatter the cutpurses with a sudden shout!",
                    badge: `Detect Traps / Perception DC ${dc}`,
                    check: {
                      stat: "luck", skill: "Detect Traps", dc, pass: 2, fail: 3,
                      passMsg: "Caught completely flat-footed, the cutpurses bolt into the scrub—leaving their coin-purse and Alchemical Oil behind!",
                      failMsg: "Loose gravel slides under your boot! Both cutpurses leap onto the culvert with daggers drawn!"
                    },
                    onPass: { item: "alchemical_oil", gold: baseGold }
                  },
                  {
                    t: "Draw your weapon and charge straight across the stone culvert!",
                    to: 3
                  },
                  {
                    t: `Circle high through the brambles around the culvert, gather ${matName}, and return to Oakhaven.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Road Cleared",
                text: `You untie the nervous pack-mule, point it back toward the farm road, and collect fresh ${matName} on your triumphant walk to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Cleared the Old Culvert", xp: Math.round(baseXp * 1.3), gold: Math.round(baseGold * 0.5), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Daggers on the Culvert",
                text: `'Drop your coin-pouch and walk!' the lead cutpurse hisses, lunging across the mossy stones!`,
                enemy: {
                  name: "Highway Cutpurses",
                  desc: "Desperate road-brigands preying on frontier travelers.",
                  hp: cutpurseHp,
                  ac: cutpurseAc,
                  atk: cutpurseAtk,
                  dmg: cutpurseDmg,
                  xp: Math.round(baseXp * 1.4),
                  gold: Math.round(baseGold * 1.15),
                  items: [altMatId],
                  flee: 4
                },
                choices: [
                  { t: "Free the pilfered pack-mule and claim the brigands' stash!", to: 2 }
                ]
              },
              4: {
                zone: zone.name,
                title: "High-Ridge Bypass",
                text: `You slip around the ambush cleanly, gather fresh ${matName} along the ridge, and return safely to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Dodged a Road Ambush", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 18. The Stranded Timber-Sled
        () => {
          const strainDmg = Math.max(2, 1 + Math.floor(lv * 0.6));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Stranded Timber-Sled`,
            subtitle: "Frontier Rescue",
            difficulty: "Discovery",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "Mud-Bogged Oxen",
                safeRetreat: true,
                text: `Halfway down a rain-slick verge along ${zone.name}, a heavy Oakhaven timber-sled has skidded into a ditch. Two nervous oxen strain against the yoke while a mud-splattered woodcutter tugs desperately at the rear rope.`,
                choices: [
                  {
                    t: "Brace your boots in the gravel and heave the timber-sled back onto the road!",
                    badge: `Athletics / Might DC ${dc}`,
                    check: {
                      stat: "might", skill: "Athletics", dc, pass: 2, fail: 3,
                      failDmg: strainDmg,
                      passMsg: "With a mighty shove the runners bite dry gravel—the grateful woodcutter presses a Health Potion and silver into your hand!",
                      failMsg: `Your boot slips on wet clay, wrenching your shoulder (-${strainDmg} HP) before you step clear.`
                    },
                    onPass: { item: "health_potion", gold: baseGold }
                  },
                  {
                    t: "Step to the oxen's heads, calm their breathing, and guide them out at an angle.",
                    badge: `Survival / Spirit DC ${dc}`,
                    check: {
                      stat: "spirit", skill: "Survival", dc, pass: 2, fail: 3,
                      passMsg: "The oxen steady at your voice and haul the sled free—the woodcutter shares a Mana Elixir and trade coin!",
                      failMsg: "A sudden gust startles the lead ox, forcing the woodcutter to unhitch and wait for help."
                    },
                    onPass: { item: "mana_elixir", gold: Math.round(baseGold * 0.9) }
                  },
                  {
                    t: `Help unhook the spare harness, accept a bundle of ${matName}, and continue on.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Grateful Timber-Crew",
                text: `Waving his cap in thanks, the woodcutter tosses you a fresh bundle of ${matName} as his sled rumbles smoothly back toward Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Aided the Timber-Crew", xp: Math.round(baseXp * 1.25), gold: Math.round(baseGold * 0.45), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Bogged Until Dusk",
                text: `Promising to send a spare team from the gate, you gather ${matName} along the road and head back to town.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Lent a Hand on the Trail", xp: Math.round(baseXp * 0.8), gold: 0, trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "Neighborly Detour",
                text: `With the oxen unhitched and safe, you pocket fresh ${matName} and walk back to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Frontier Helper", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 19. The Ring of Singing Toadstools
        () => {
          const sporeDmg = Math.max(2, 2 + Math.floor(lv * 0.65));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Singing Toadstools`,
            subtitle: "Fey Threshold",
            difficulty: "Mystery",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "The Violet Fairy-Ring",
                safeRetreat: true,
                text: `In a hushed clearing off ${zone.name}, a perfect circle of pale violet toadstools hums a soft, hypnotic melody. On a flat mossy capstone at the ring's center glints a scattering of ancient silver coins.`,
                choices: [
                  {
                    t: "Read the fey border-customs woven into the humming spores with Arcana.",
                    badge: `Arcana DC ${dc}`,
                    check: {
                      stat: "arcana", skill: "Arcana", dc, pass: 2, fail: 3,
                      failDmg: sporeDmg,
                      passMsg: "You answer the ring's cadence with three soft taps—earning a shimmering Mana Elixir and fey silver!",
                      failMsg: `A puff of stinging purple spores bursts across your face (-${sporeDmg} HP) as the melody stops!`
                    },
                    onPass: { item: "mana_elixir", gold: baseGold }
                  },
                  {
                    t: "Step lightly between the outer caps, bow low, and claim a single tribute coin.",
                    badge: `Stealth / Agility DC ${dc}`,
                    check: {
                      stat: "agility", skill: "Stealth", dc, pass: 2, fail: 3,
                      passMsg: "Unseen laughter chimes overhead as you lift a gleaming Silver Signet without bruising a single cap!",
                      failMsg: "Your heel brushes a toadstool—the coins vanish in a flash of green mist!"
                    },
                    onPass: { item: "silver_signet", gold: Math.round(baseGold * 0.85) }
                  },
                  {
                    t: `Admire the singing ring from outside, collect ${matName} nearby, and head home.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Fey Courtesy Repaid",
                text: `A warm breeze carries the scent of wild honey as you tuck away fresh ${matName} and return to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Honored the Fairy-Ring", xp: Math.round(baseXp * 1.25), gold: Math.round(baseGold * 0.45), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Vanished Glamour",
                text: `The clearing falls silent once more. You gather a bundle of ${matName} along the path and make for town.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Brushed Fey Magic", xp: Math.round(baseXp * 0.8), gold: 0, trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "Wise Distance",
                text: `Leaving the fey circle untouched, you collect fresh ${matName} from the verge and stroll safely back to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Respected the Old Ways", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 20. The Briar-Wolf Pack
        () => {
          const wolfHp = 15 + lv * 4;
          const wolfAc = 10 + Math.min(4, Math.floor(lv / 2));
          const wolfAtk = 2 + Math.floor(lv * 0.85);
          const wolfDmg = 3 + Math.floor(lv * 0.75);
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Briar-Wolf Pack`,
            subtitle: "Wilderness Stalkers",
            difficulty: "Skirmish",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "Amber Eyes in the Ferns",
                safeRetreat: true,
                text: `Low, rumbling growls vibrate through the bracken along ${zone.name}. Two lean, thorn-matted Briar-Wolves step onto the narrow track, guarding a discarded hunter's pack beside a fallen pine.`,
                choices: [
                  {
                    t: "Stand tall, clang steel, and shout the hungry pack back into the brush!",
                    badge: `Persuasion / Spirit DC ${dc}`,
                    check: {
                      stat: "spirit", skill: "Persuasion", dc, pass: 2, fail: 3,
                      passMsg: "With ears pinned flat, the Briar-Wolves slink away—leaving a dry Health Potion and coin inside the hunter's pack!",
                      failMsg: "The alpha wolf bares its fangs and lunges straight down the track!"
                    },
                    onPass: { item: "health_potion", gold: baseGold }
                  },
                  {
                    t: "Draw steel and meet the snarling Briar-Wolf Pack head-on!",
                    to: 3
                  },
                  {
                    t: `Back away slowly upwind, gather ${matName} along the ridge, and return to Oakhaven.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Trail Secured",
                text: `With the hunter's lost gear recovered and the wolves scattered, you gather fresh ${matName} and march back toward Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Drove Off the Briar-Wolves", xp: Math.round(baseXp * 1.3), gold: Math.round(baseGold * 0.5), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Fangs in the Bracken",
                text: `Thorns scatter from their bristling pelts as the Briar-Wolves leap across the muddy track!`,
                enemy: {
                  name: "Briar-Wolf Pack",
                  desc: "Thorn-matted frontier predators hunting the outskirts.",
                  hp: wolfHp,
                  ac: wolfAc,
                  atk: wolfAtk,
                  dmg: wolfDmg,
                  xp: Math.round(baseXp * 1.4),
                  gold: Math.round(baseGold * 1.1),
                  items: [altMatId],
                  flee: 4
                },
                choices: [
                  { t: "Search the discarded hunter's pack and head back to Oakhaven!", to: 2 }
                ]
              },
              4: {
                zone: zone.name,
                title: "Quiet Retreat",
                text: `You leave the pack to their thicket, collect fresh ${matName} along the outer ridge, and return safely to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Outsmarted the Pack", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 21. The Weathered Waystone Riddle
        () => {
          const zapDmg = Math.max(2, 2 + Math.floor(lv * 0.65));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Weathered Waystone`,
            subtitle: "Ancient Frontier Cipher",
            difficulty: "Mystery",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "Three Bronze Rings",
                safeRetreat: true,
                text: `Where two forgotten footpaths cross in ${zone.name}, a moss-draped frontier waystone hums softly. Three rotating bronze rings encircle its shaft, etched with sun, moon, and oak-leaf sigils above a faint seam at the stone's base.`,
                choices: [
                  {
                    t: "Align the celestial rings to solve the ancient waystone's cipher!",
                    badge: `Arcana / Arcana DC ${dc}`,
                    check: {
                      stat: "arcana", skill: "Arcana", dc, pass: 2, fail: 3, failDmg: zapDmg,
                      passMsg: "The rings lock with a warm chime—revealing a Mana Potion and a pouch of traveler's coin!",
                      failMsg: `A blue spark snaps from the bronze sigils (-${zapDmg} HP) before the stone falls silent.`
                    },
                    onPass: { item: "mana_potion", gold: Math.round(baseGold * 1.1) }
                  },
                  {
                    t: "Probe the hairline seam at the base for a concealed latch and spring-needle.",
                    badge: `Detect Traps / Agility DC ${dc}`,
                    check: {
                      stat: "agility", skill: "Detect Traps", dc, pass: 2, fail: 3, failDmg: zapDmg,
                      passMsg: "You disarm the tiny copper spring and pop open a smuggler's stash with a Health Potion and silver!",
                      failMsg: `A rusted ward-needle nicks your thumb (-${zapDmg} HP) as the hidden panel jams shut.`
                    },
                    onPass: { item: "health_potion", gold: Math.round(baseGold * 1.25) }
                  },
                  {
                    t: `Leave the old pillar undisturbed, gather ${matName} along the verge, and return to Oakhaven.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Waystone's Blessing",
                text: `With the frontier cache claimed and the ancient stone humming softly behind you, you gather fresh ${matName} along the trail back to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Solved the Waystone Cipher", xp: Math.round(baseXp * 1.3), gold: Math.round(baseGold * 0.45), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Stung by the Ward",
                text: `Nursing your tingling hand, you salvage fresh ${matName} growing around the waystone's roots and head back to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Weathered the Waystone", xp: Math.round(baseXp * 0.9), gold: Math.round(baseGold * 0.35), trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "Unbroken Silence",
                text: `You respect the old boundary marker, harvest ${matName} beside the footpath, and return safely to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Cautious Wayfarer", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 22. The Sudden Gale & Fallen Peddler
        () => {
          const strainDmg = Math.max(2, 2 + Math.floor(lv * 0.6));
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Stranded Lantern-Peddler`,
            subtitle: "Sudden Squall Rescue",
            difficulty: "Hazard",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "Storm on the Track",
                safeRetreat: true,
                text: `A fierce gust lashes ${zone.name}, cracking an overhanging bough across the muddy track! Beneath the tangled branches, a drenched lantern-peddler struggles to free his tilted mule-cart before the rain washes out the verge.`,
                choices: [
                  {
                    t: "Brace your shoulders and heave the heavy storm-felled limb clear of the wheel!",
                    badge: `Athletics / Might DC ${dc}`,
                    check: {
                      stat: "might", skill: "Athletics", dc, pass: 2, fail: 3, failDmg: strainDmg,
                      passMsg: "With a grunt you roll the limb aside! The grateful peddler presses a Health Potion and reward coin into your hand!",
                      failMsg: `The wet bark slips and bruises your shoulder (-${strainDmg} HP) before you and the peddler pry the wheel free together.`
                    },
                    onPass: { item: "health_potion", gold: Math.round(baseGold * 1.3) }
                  },
                  {
                    t: "Soothe the panicked mule and guide the cart onto firmer high ground.",
                    badge: `Survival / Spirit DC ${dc}`,
                    check: {
                      stat: "spirit", skill: "Survival", dc, pass: 2, fail: 3, failDmg: strainDmg,
                      passMsg: "The mule steadies under your hand and pulls clear! The peddler gifts you a Mana Potion and grateful silver!",
                      failMsg: `Pelting hail stings your face (-${strainDmg} HP) as you wrestle the bridle clear of the mud.`
                    },
                    onPass: { item: "mana_potion", gold: Math.round(baseGold * 1.15) }
                  },
                  {
                    t: `Wait out the worst of the squall under a rocky ledge, gather wind-shaken ${matName}, and return to Oakhaven.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "A Warm Lantern's Thanks",
                text: `The peddler lights a brass storm-lantern and waves as his cart rolls safely toward town. You gather fresh ${matName} along the rain-washed verge and follow the road back to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Rescued the Lantern-Peddler", xp: Math.round(baseXp * 1.35), gold: Math.round(baseGold * 0.5), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Muddy Rescue",
                text: `Bruised and soaked, you still manage to get the cart upright. The peddler shares a few damp silver coins as you collect ${matName} and trudge home to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Braved the Outskirts Squall", xp: Math.round(baseXp * 0.95), gold: Math.round(baseGold * 0.55), trophy: "" },
                choices: []
              },
              4: {
                zone: zone.name,
                title: "Clearing Skies",
                text: `Once the wind dies down, you gather wind-shaken ${matName} from the verge and return dry to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Waited Out the Squall", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        },

        // 23. The Moss-Bound Sentinel
        () => {
          const golemHp = 16 + lv * 4;
          const golemAc = 11 + Math.min(4, Math.floor(lv / 2));
          const golemAtk = 2 + Math.floor(lv * 0.85);
          const golemDmg = 3 + Math.floor(lv * 0.8);
          return {
            id: "_wilderness_encounter",
            isRandomEncounter: true,
            title: `${zone.icon} ${zone.name} — Moss-Bound Sentinel`,
            subtitle: "Awakened Boundary Construct",
            difficulty: "Skirmish",
            recommendedLevel: lv,
            totalPages: 4,
            pages: {
              1: {
                zone: zone.name,
                title: "Amber Eye in the Ivy",
                safeRetreat: true,
                text: `Half-buried beside a ruined boundary wall in ${zone.name} crouches a weathered stone sentinel overgrown with ivy. A tarnished bronze reliquary rests between its knees—and as your boots crunch on gravel, a single amber rune flickers awake on its brow!`,
                choices: [
                  {
                    t: "Creep through the tall reeds and lift the bronze reliquary before the construct rises!",
                    badge: `Stealth / Agility DC ${dc + 1}`,
                    check: {
                      stat: "agility", skill: "Stealth", dc: dc + 1, pass: 2, fail: 3,
                      passMsg: "Soft as falling moss, you slip the bronze reliquary free—finding a Mana Potion and old frontier coin inside!",
                      failMsg: "A pebble rolls under your heel! With a grinding roar, the Moss-Bound Sentinel heaves upright!"
                    },
                    onPass: { item: "mana_potion", gold: Math.round(baseGold * 1.35) }
                  },
                  {
                    t: "Ready your weapon and smash the awakening Moss-Bound Sentinel!",
                    to: 3
                  },
                  {
                    t: `Skirt the ruined wall, collect ${matName} from the outer stones, and return to Oakhaven.`,
                    to: 4
                  }
                ]
              },
              2: {
                zone: zone.name,
                title: "Reliquary Claimed",
                text: `With the ancient bronze reliquary secured in your pack, you gather fresh ${matName} along the boundary wall and stride back toward Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Claimed the Boundary Reliquary", xp: Math.round(baseXp * 1.35), gold: Math.round(baseGold * 0.55), trophy: "" },
                choices: []
              },
              3: {
                zone: zone.name,
                title: "Grinding Stone",
                text: `Vines snap and stone knuckles thunder as the Moss-Bound Sentinel swings to defend its post!`,
                enemy: {
                  name: "Moss-Bound Sentinel",
                  desc: "Ancient ivy-choked stone guardian of Oakhaven's forgotten borders.",
                  hp: golemHp,
                  ac: golemAc,
                  atk: golemAtk,
                  dmg: golemDmg,
                  xp: Math.round(baseXp * 1.45),
                  gold: Math.round(baseGold * 1.2),
                  items: [altMatId],
                  flee: 4
                },
                choices: [
                  { t: "Open the tarnished bronze reliquary and return to Oakhaven!", to: 2 }
                ]
              },
              4: {
                zone: zone.name,
                title: "Quiet Detour",
                text: `The amber rune fades back to dull stone as you circle wide, gather ${matName} along the ridge, and return safely to Oakhaven.`,
                onEnter: { item: matId },
                ending: { type: "true", title: "Passed the Old Sentinel", xp: Math.round(baseXp * 0.75), gold: 0, trophy: "" },
                choices: []
              }
            }
          };
        }
      ];

      return encounterBuilders[Math.floor(Math.random() * encounterBuilders.length)]();
    }

    function startWildernessExpedition(zone) {
      const enc = buildWildernessEncounter(zone);
      ADVENTURES._wilderness_encounter = enc;
      startAdventure("_wilderness_encounter");
    }

    function renderDistrictMarket(box) {
      const shop = SHOPS[currentShop];
      const shopGreeting = getShopkeeperGreeting(currentShop, shop);
      box.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h3 class="font-display text-xl font-bold text-amber-300">Market District</h3>
          <div class="flex gap-1.5">
            ${["armory","apothecary","curios"].map(k => `<button data-shop="${k}" class="shop-tab px-3 py-1.5 rounded-lg text-xs font-semibold border ${currentShop===k?"bg-amber-900/50 border-amber-400 text-amber-200":"bg-stone-950 border-stone-800 text-stone-400"}">${SHOPS[k].name.split(" ")[0]}</button>`).join("")}
          </div>
        </div>
        <div class="p-3 rounded-xl bg-stone-950/70 border border-amber-700/30 mb-4 flex flex-wrap items-center justify-between gap-2">
          <div class="flex-1 min-w-[200px]">
            <div class="font-display text-sm font-bold text-amber-200">${shop.name} — <span class="text-stone-400 font-normal">${shop.npc}</span></div>
            <div class="text-xs text-stone-300 italic">${shopGreeting}</div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button id="btn-speak-shopkeeper" type="button" class="px-2.5 py-1.5 rounded-lg bg-stone-900 hover:bg-amber-950/80 border border-amber-700/40 text-xs text-amber-200 transition" title="Hear ${shop.npc} speak">🔊</button>
            ${currentShop==="armory" && !state.discoveredQuests.includes("karak_zul") ? `<button id="btn-shop-rumor" class="px-3 py-1.5 rounded-lg btn-gold text-xs">Ask about Dwarven Ore</button>` : ""}
            ${currentShop==="curios" && !state.discoveredQuests.includes("crimson_spire") ? `<button id="btn-shop-rumor" class="px-3 py-1.5 rounded-lg btn-gold text-xs">Ask about Arcane Towers</button>` : ""}
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><h4 class="font-display text-xs uppercase text-emerald-400 mb-2">Buy Gear &amp; Supplies</h4><div id="mkt-buy" class="space-y-1.5 max-h-72 overflow-y-auto pr-1"></div></div>
          <div><h4 class="font-display text-xs uppercase text-amber-400 mb-2">Sell From Backpack</h4><div id="mkt-sell" class="space-y-1.5 max-h-72 overflow-y-auto pr-1"></div></div>
        </div>
      `;

      const speakShopBtn = box.querySelector("#btn-speak-shopkeeper");
      if (speakShopBtn) {
        speakShopBtn.onclick = () => window.OAKHAVEN_NARRATOR?.speakAs(currentShop, shopGreeting, { name: shop.npc, role: shop.name });
      }
      const shopVisitKey = `market:${currentShop}`;
      if (lastTownAutoSpokenKey !== shopVisitKey) {
        lastTownAutoSpokenKey = shopVisitKey;
        window.OAKHAVEN_NARRATOR?.speakAs(currentShop, shopGreeting, { name: shop.npc, role: shop.name, autoOnly: true });
      }

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
        bindItemTooltip(r, entry.id, { price: entry.price });
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
          bindItemTooltip(r, id, { qty });
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
        let taken = 0;
        for (let i = arr.length - 1; i >= 0 && left > 0; i--) {
          if (getEntryId(arr[i]) !== matId) continue;
          const cur = getEntryQty(arr[i]);
          if (cur <= left) {
            left -= cur;
            taken += cur;
            arr.splice(i, 1);
          } else {
            arr[i] = { id: matId, qty: cur - left };
            taken += left;
            left = 0;
          }
        }
        return taken;
      };
      takeFrom(state.backpack);
      let tookFromVault = 0;
      ensureStashTabs().forEach(tab => { tookFromVault += takeFrom(tab); });
      if (tookFromVault > 0) persistVaultChange();
    }

    // Counts materials across Backpack + ALL unlocked Stash Tabs
    function countMaterialSplit(matId) {
      const sum = (arr) => (arr || []).reduce((acc, e) => acc + (getEntryId(e) === matId ? getEntryQty(e) : 0), 0);
      const pack = sum(state.backpack);
      const vault = ensureStashTabs().reduce((acc, tab) => acc + sum(tab), 0);
      return { pack, vault, total: pack + vault };
    }

    // Spends carried Gold first, then draws any remainder from your Shared Gold Vault
    function getTownGold() {
      return (state?.gold || 0) + (state?.vaultGold || 0);
    }

    function spendGoldWithVault(amount) {
      const fromCarry = Math.min(state.gold, amount);
      state.gold -= fromCarry;
      const fromVault = amount - fromCarry;
      if (fromVault > 0) {
        state.vaultGold = Math.max(0, (state.vaultGold || 0) - fromVault);
        persistVaultChange();
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
          const matItem = ITEMS_DB[mid];
          const matImg = getItemArtSrc(matItem);
          const matThumb = matImg ? `<img src="${matImg}" alt="" loading="lazy" onerror="this.style.display='none'" class="w-4 h-4 rounded object-cover border border-amber-600/40 shrink-0" />` : "";
          const vaultTag = vault > 0 ? ` <span class="text-amber-300/90" title="${pack} in Backpack, ${vault} in Vault">(🔐${vault})</span>` : "";
          return `<span data-mat-id="${mid}" class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] cursor-help ${total >= need ? "bg-emerald-950 text-emerald-300 border border-emerald-700" : "bg-stone-900 text-rose-300 border border-stone-700"}">${matThumb}<span>${matItem?.name || mid}: ${total}/${need}${vaultTag}</span></span>`;
        }).join(" ");

        const c = document.createElement("div");
        c.className = "p-3.5 rounded-xl bg-stone-950/90 border border-amber-700/30 flex flex-col justify-between gap-2.5";
        c.innerHTML = `
          <div>
            <div class="flex items-start gap-2.5 mb-2">
              ${renderItemThumbHtml(resItem, "w-12 h-12", "text-xl")}
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-2">
                  <div class="font-display text-sm font-bold text-amber-200 truncate">${resItem.name}</div>
                  ${typeof getRarityBadgeHtml === "function" ? getRarityBadgeHtml(rec.rarity || resItem.rarity) : ""}
                </div>
                <div class="text-[11px] text-stone-400 mt-0.5 leading-snug">${rec.desc}</div>
              </div>
            </div>
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
          if (sentToVault) persistVaultChange();
          const notes = [];
          if (fromVault > 0) notes.push(`drew ${fromVault} GP from Shared Vault`);
          if (sentToVault) notes.push("sent to Shared Account Vault");
          sfx("forge");
          toast(`Crafted ${resItem.name}!${notes.length ? ` (${notes.join(", ")})` : ""}`, "good");
          addLog(`Crafted ${resItem.name} at the Forge.`, "gold");
          renderDistrictForge(box);
          renderSheet();
        };

        bindItemTooltip(c, rec.result, { slotLabel: "Crafted Result" });
        c.querySelectorAll("[data-mat-id]").forEach(mEl => {
          bindItemTooltip(mEl, mEl.dataset.matId);
        });
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
          <h3 class="font-display text-xl font-bold text-amber-300">Shared Account Vault &amp; Stash Tabs</h3>
          <span class="px-2.5 py-1 rounded-full bg-stone-950 border border-emerald-700/40 text-xs text-emerald-300 font-semibold">
            Total Stored: ${totalUsed} / ${totalCap}
          </span>
        </div>
        <p class="text-xs text-emerald-300/90 mb-4">🛡️ 100% SAFE from death &amp; shared across ALL heroes on your account! Drag items onto another Tab button to organize.</p>

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
        persistVaultChange();
        renderDistrictStash(box); renderSheet();
      });
      box.querySelectorAll(".v-wd").forEach(b => b.onclick = () => {
        const amt = b.dataset.wd === "all" ? state.vaultGold : Math.min(state.vaultGold, parseInt(b.dataset.wd, 10));
        if (amt <= 0) return;
        state.vaultGold -= amt; state.gold += amt;
        persistVaultChange();
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
          persistVaultChange();
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
          persistVaultChange();
          toast(`🔓 Unlocked Shared Stash Tab ${tabs.length} (+20 Safe Slots)!`, "gold");
          addLog(`Unlocked Shared Stash Tab ${tabs.length} for ${cost.toLocaleString()} GP.`, "gold");
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
          bindItemTooltip(r, id, { qty, slotLabel: `Stash Tab ${activeIdx + 1}` });
          r.querySelector("button").onclick = () => {
            const added = addItemToContainer("backpack", id, qty, 12);
            if (added <= 0) return toast("Backpack full (12/12)!", "bad");
            if (added >= qty) activeTabArr.splice(i, 1);
            else activeTabArr[i] = { id, qty: qty - added };
            persistVaultChange();
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
          bindItemTooltip(r, id, { qty, slotLabel: "Backpack" });
          r.querySelector("button").onclick = () => {
            const added = addItemToContainer(activeContainerKey, id, qty, 20);
            if (added <= 0) return toast(`Stash Tab ${activeIdx + 1} is full (20/20)!`, "bad");
            if (added >= qty) state.backpack.splice(i, 1);
            else state.backpack[i] = { id, qty: qty - added };
            persistVaultChange();
            renderDistrictStash(box); renderSheet();
          };
          pList.appendChild(r);
        });
      }
    }
    function renderDistrictTemple(box) {
      const hasStJude = state.discoveredQuests.includes("st_jude");
      const alreadyBlessed = !!(state.templeBlessed || state.blessing);
      const blessDisabledCls = "bg-stone-800/80 border border-stone-700 text-stone-400 cursor-not-allowed";
      box.innerHTML = `
        <h3 class="font-display text-xl font-bold text-amber-300 mb-1">The Temple of the Dawn</h3>
        <p class="text-xs text-stone-400 mb-4">Sanctuary of healing, blessings, and soul-resurrection. High Priestess Selene tends the golden brazier.</p>

        <div class="p-4 rounded-xl bg-stone-950/80 border border-amber-600/40 mb-4">
          <div class="flex items-center justify-between gap-2">
            <div class="font-display text-sm font-bold text-amber-200">High Priestess Selene</div>
            <button id="btn-speak-selene" type="button" class="px-2 py-0.5 rounded-lg bg-stone-900 hover:bg-amber-950/80 border border-amber-700/40 text-[11px] text-amber-200 transition" title="Hear High Priestess Selene speak">🔊 Speak</button>
          </div>
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
            <div><div class="font-display text-sm font-bold text-amber-300">Blessing of Aegis</div><p class="text-[11px] text-stone-400 mt-1">Gain +1 AC for your next adventure. (1 blessing between quests)</p></div>
            <button id="btn-bless-ac" ${alreadyBlessed ? "disabled" : ""} class="w-full py-2 rounded-lg text-xs ${alreadyBlessed ? blessDisabledCls : "btn-gold"}">${alreadyBlessed ? (state.blessing === "ac" ? "✓ Blessed (+1 AC) • Quest First" : "Already Blessed • Quest First") : "Bless (25 GP)"}</button>
          </div>
          <div class="p-3.5 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between gap-2">
            <div><div class="font-display text-sm font-bold text-purple-300">Blessing of Fortune</div><p class="text-[11px] text-stone-400 mt-1">Gain +1 Luck for your next adventure. (1 blessing between quests)</p></div>
            <button id="btn-bless-luck" ${alreadyBlessed ? "disabled" : ""} class="w-full py-2 rounded-lg text-xs ${alreadyBlessed ? blessDisabledCls : "btn-gold"}">${alreadyBlessed ? (state.blessing === "luck" ? "✓ Blessed (+1 Luck) • Quest First" : "Already Blessed • Quest First") : "Bless (25 GP)"}</button>
          </div>
        </div>
      `;

      const seleneQuote = "May the Dawn guard your steps. Should you fall in the dark, our bells will summon your spirit back to this altar—though whatever gold and gear you carried will be lost.";
      const seleneBtn = box.querySelector("#btn-speak-selene");
      if (seleneBtn) seleneBtn.onclick = () => window.OAKHAVEN_NARRATOR?.speakAs("selene", seleneQuote, { name: "High Priestess Selene", role: "High Priestess" });
      if (lastTownAutoSpokenKey !== "temple:selene") {
        lastTownAutoSpokenKey = "temple:selene";
        window.OAKHAVEN_NARRATOR?.speakAs("selene", seleneQuote, { name: "High Priestess Selene", role: "High Priestess", autoOnly: true });
      }

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
        if (state.templeBlessed || state.blessing) {
          return toast("You've already received a Temple blessing! Embark on a quest before receiving another.", "info");
        }
        if (getTownGold() < 25) return toast("Need 25 GP.", "bad");
        spendGoldWithVault(25);
        state.blessing = "ac";
        state.templeBlessed = true;
        sfx("heal");
        toast("Blessed with +1 AC for your next adventure!", "gold");
        addLog("Received Blessing of Aegis (+1 AC) at the Temple of the Dawn (-25 GP).", "gold");
        renderDistrictTemple(box); renderTown(); renderSheet();
      };
      box.querySelector("#btn-bless-luck").onclick = () => {
        if (state.templeBlessed || state.blessing) {
          return toast("You've already received a Temple blessing! Embark on a quest before receiving another.", "info");
        }
        if (getTownGold() < 25) return toast("Need 25 GP.", "bad");
        spendGoldWithVault(25);
        state.blessing = "luck";
        state.templeBlessed = true;
        state.currentLuck = getDerived(state).maxLuck;
        sfx("heal");
        toast("Blessed with +1 Luck for your next adventure!", "gold");
        addLog("Received Blessing of Fortune (+1 Luck) at the Temple of the Dawn (-25 GP).", "gold");
        renderDistrictTemple(box); renderTown(); renderSheet();
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
      window.OAKHAVEN_NARRATOR?.stop(true);
      lastNarratedPageKey = "";
      closeBuildingModal();
      stopAutoWalk();
      state.mode = "adventure";
      if (!adv.isRandomEncounter) {
        state.innRested = false;
        state.templeBlessed = false;
      }
      state.activeAdv = { id: advId, page: 1, codewords: [], entered: [], defeated: [], dead: false, classAbilityUsed: false, torchLit: false, itemCharges: {}, lootItems: [], lootGold: 0, lootXp: 0 };
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
        if (!adv.isRandomEncounter) {
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
          rollTavernPatrons(); // Refreshes Tavern rumors after completing a quest!
        }
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
      // Spellcaster passive: regenerate +1 MP per adventure choice made
      if (isSpellcasterClass(state)) {
        const curD = getDerived(state);
        if (state.mp < curD.maxMp) state.mp = Math.min(curD.maxMp, state.mp + 1);
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
        const itemSkBonus = (c.skill && getSubclassPassiveTotals(state).skillBonuses?.[c.skill]) || 0;
        const torchBonus = state.activeAdv?.torchLit ? 2 : 0;
        const scaledDc = c.dc + DIFFICULTY.skillDcBonus + Math.floor(Math.max(0, (state.level || 1) - 1) / 3);
        const r = roll2d6();
        const tot = r.total + statVal + skBonus + itemSkBonus + torchBonus;
        const ok = tot >= scaledDc;
        const desc = `🎲 ${c.stat.toUpperCase()} Check: [${r.d1}+${r.d2}]+${statVal}${skBonus?`+${skBonus}(${c.skill})`:""}${itemSkBonus?`+${itemSkBonus}(Relic)`:""}${torchBonus?`+${torchBonus}(🔥Torch)`:""}=${tot} vs DC ${scaledDc} — ${ok?"SUCCESS!":"FAILED!"}`;
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
      if (ch.startQuestDirect) {
        discoverAdventure(ch.startQuestDirect, ch.discoverySource || "Wilderness Exploration");
        startAdventure(ch.startQuestDirect);
        return;
      }
      if (ch.markQuestAndReturn) {
        discoverAdventure(ch.markQuestAndReturn, ch.discoverySource || "Wilderness Exploration");
        enterTown("square", true);
        return;
      }
      if (ch.returnToTown) {
        enterTown("outskirts", false);
        return;
      }
      goToAdvPage(ch.to);
    }

    function triggerDeath(lastNote = "") {
      window.OAKHAVEN_NARRATOR?.stop(true);
      activeCombat = null;
      sfx("death");
      bgm("adventure");
      state.hp = 0;
      state.activeAdv.dead = true;
      if (state.hardcore) {
        // Hardcore Permadeath: immediately erase this hero slot (Shared Vault & Crafting Recipes remain 100% intact!)
        const slots = getSaveSlots();
        slots[activeSaveSlot] = null;
        writeSaveSlots(slots);
        try {
          const legacyRaw = localStorage.getItem(SAVE_KEY);
          if (legacyRaw) {
            const leg = JSON.parse(legacyRaw);
            if (leg && leg.name === state.name && leg.hardcore) localStorage.removeItem(SAVE_KEY);
          }
        } catch (_) {}
        addLog(`💀 HARDCORE PERMADEATH: ${state.name} perished in ${ADVENTURES[state.activeAdv.id].title}!`, "bad");
      } else {
        addLog(`💀 ${state.name} perished in ${ADVENTURES[state.activeAdv.id].title}!`, "bad");
      }
      renderAdvPage(lastNote ? { type:"bad", text:lastNote } : null);
      renderSheet();
    }

    function returnToLaunchScreen() {
      window.OAKHAVEN_NARRATOR?.stop(true);
      lastNarratedPageKey = "";
      stopAutoWalk();
      closeBuildingModal();
      activeCombat = null;
      state = null;
      document.getElementById("main-screen")?.classList.add("hidden");
      document.getElementById("creation-screen")?.classList.add("hidden");
      document.getElementById("launch-screen")?.classList.remove("hidden");
      document.getElementById("btn-save")?.classList.add("hidden");
      document.getElementById("header-quests-badge")?.classList.add("hidden");
      document.getElementById("btn-toggle-sheet")?.classList.add("hidden");
      document.getElementById("sheet-sidebar")?.classList.add("hidden");
      initLaunchScreen();
      bgm("town");
    }

    function resurrectAtTemple() {
      if (state && state.hardcore) {
        toast("Your Hardcore hero has fallen. Shared Vault & Crafting Recipes remain safe!", "bad");
        returnToLaunchScreen();
        return;
      }
      // CRITICAL DEATH PENALTY: Lose all carried gold, all equipped items, all backpack items!
      state.deaths++;
      state.gold = 0;
      state.equipment = { weapon: "novice_cudgel", armor: null, offhand: null, accessory: null, cloak: null };
      state.backpack = [];
      state.blessing = null;
      state.templeBlessed = false;
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
        const diceSpec = it.dmgDice || (usedId === "alchemist_bomb" ? "2d6" : null);
        let rollInfo = "";
        let dmg = 0;
        if (diceSpec) {
          const br = rollDiceSpec(diceSpec);
          dmg = br.total + (subP.bombDmgBonus || 0);
          rollInfo = ` (${br.label}${subP.bombDmgBonus ? `+${subP.bombDmgBonus}` : ""})`;
        } else {
          dmg = (it.dmg || 10) + (subP.bombDmgBonus || 0);
        }
        if (activeCombat.rageActive) dmg *= 2;
        sfx("bomb");
        activeCombat.hp = Math.max(0, activeCombat.hp - dmg);
        let extra = activeCombat.rageActive ? " [🔥 RAGE 2x!]" : "";
        if (subP.bombChillTurns > 0) {
          activeCombat.chilled = Math.max(activeCombat.chilled, subP.bombChillTurns);
          extra += ` & weakens foe (-2 Atk, ${subP.bombChillTurns}t)`;
        }
        activeCombat.log.unshift(`💣 Threw ${it.name}${rollInfo} for ${dmg} dmg${extra}!`);
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

    function useEquippedItemAbility(itemId, ab, isOoc = false) {
      if (!ab) return;
      const chargesMax = ab.charges || 0;
      if (chargesMax > 0 && state.activeAdv) {
        if (!state.activeAdv.itemCharges) state.activeAdv.itemCharges = {};
        const used = state.activeAdv.itemCharges[itemId] || 0;
        if (used >= chargesMax) {
          return toast(`${ab.name} has no charges left this quest (${used}/${chargesMax})!`, "info");
        }
      }
      const cost = ab.mp || 0;
      if (state.mp < cost) return toast(`Need ${cost} MP!`, "bad");
      if (chargesMax > 0 && state.activeAdv) {
        if (!state.activeAdv.itemCharges) state.activeAdv.itemCharges = {};
        state.activeAdv.itemCharges[itemId] = (state.activeAdv.itemCharges[itemId] || 0) + 1;
      }
      if (isOoc) {
        useOocSubclassAbility(ab);
      } else {
        combatSubclassAbility(ab);
      }
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
        if (isSpellcasterClass(state)) {
          const vd = getDerived(state);
          if (state.mp < vd.maxMp) state.mp = Math.min(vd.maxMp, state.mp + 1);
        }
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
          if (subP.dmgReduce > 0) hitDmg = Math.max(1, hitDmg - subP.dmgReduce);
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

      // Spellcaster passive + equipped item MP regen at the end of each combat turn
      const turnMpRegen = (isSpellcasterClass(state) ? 1 : 0) + (subP.mpRegen || 0);
      if (state.hp > 0 && turnMpRegen > 0) {
        const rd = getDerived(state);
        if (state.mp < rd.maxMp) {
          state.mp = Math.min(rd.maxMp, state.mp + turnMpRegen);
          activeCombat.log.unshift(`🔷 Arcane Flow restores +${turnMpRegen} MP (${state.mp}/${rd.maxMp}).`);
        }
      }

      if (state.hp <= 0) return triggerDeath(`Slain by ${activeCombat.name}!`);
      if (activeCombat.hp <= 0) return combatAfterPlayer();
      renderCombatPanel();
      renderSheet();
    }

    let lastNarratedPageKey = "";

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
      const dead = state.activeAdv.dead;
      const narrKey = `${adv.id}:${state.activeAdv.page}:${page.title || ""}`;
      if (narrKey !== lastNarratedPageKey) {
        lastNarratedPageKey = narrKey;
        window.OAKHAVEN_NARRATOR?.setPage(page.title, paras, !dead);
      }
      document.getElementById("adv-merchant-box").classList.toggle("hidden", !page.merchant || dead);

      const deathPanel = document.getElementById("adv-death-panel");
      deathPanel.classList.toggle("hidden", !dead);
      if (dead) {
        const dTitle = document.getElementById("death-panel-title");
        const dDesc = document.getElementById("death-panel-desc");
        const dBtn = document.getElementById("btn-resurrect-temple");
        if (state.hardcore) {
          if (dTitle) dTitle.textContent = "💀 Hardcore Hero Fallen — Permadeath";
          if (dDesc) dDesc.innerHTML = `<strong>${state.name}</strong> has perished in battle and this hero slot has been permanently erased. Your <strong>Shared Account Vault &amp; Crafting Recipes</strong> remain safe for your next hero.`;
          if (dBtn) dBtn.textContent = "Return to Start Screen →";
        } else {
          if (dTitle) dTitle.textContent = "💀 You Have Fallen in Battle";
          if (dDesc) dDesc.innerHTML = `The bells of the <strong>Temple of the Dawn</strong> summon your soul back to Oakhaven. All carried Gold, equipped Gear, and Backpack items are lost—but everything in your <strong>Shared Account Vault &amp; Crafting Recipes</strong> remains untouched!`;
          if (dBtn) dBtn.textContent = "☀️ Resurrect at the Temple of the Dawn";
        }
      }
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
        // Equipped Item Active Abilities (with quest charges / MP cost)
        getEquippedItemAbilities(state).forEach(({ itemId, itemName, ab }) => {
          const cost = ab.mp || 0;
          const maxCh = ab.charges || 0;
          const usedCh = (state.activeAdv?.itemCharges?.[itemId]) || 0;
          const leftCh = maxCh > 0 ? Math.max(0, maxCh - usedCh) : null;
          const hasCharge = maxCh <= 0 || leftCh > 0;
          const ok = hasCharge && state.mp >= cost;
          const b = document.createElement("button");
          b.className = `px-2.5 py-1 rounded-lg text-xs font-semibold border ${ok ? "bg-teal-950 hover:bg-teal-900 border-teal-400/70 text-teal-200" : "bg-stone-900 border-stone-800 text-stone-500"}`;
          b.disabled = !ok;
          b.title = `[${itemName}] ${ab.desc}`;
          const parts = [];
          if (maxCh > 0) parts.push(`${leftCh}/${maxCh}`);
          if (cost > 0) parts.push(`${cost} MP`);
          b.textContent = `${ab.icon || "⚡"} ${ab.name}${parts.length ? ` (${parts.join(" • ")})` : ""}`;
          b.onclick = () => useEquippedItemAbility(itemId, ab, false);
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
      document.getElementById("sheet-class").textContent = `${racePart}${state.className}${subPart}${state.hardcore ? " • 💀 Hardcore" : ""}`;
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
        if (it) bindItemTooltip(r, state.equipment[k], { slotLabel: `Equipped (${lbl})` });
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
        bindItemTooltip(r, id, { qty, slotLabel: "Backpack" });

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
            persistVaultChange();
            const targetName = ITEMS_DB[it.unlocksRecipe]?.name || it.name;
            sfx("scroll");
            toast(`📜 Unlocked Account-Wide Forge Recipe: ${targetName}!`, "gold");
            addLog(`Learned Forge Schematic (Shared Account-Wide): ${targetName}!`, "gold");
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
            persistVaultChange();
            toast(`Stored ${added}x ${it.name} in Shared Account Vault.`, "info");
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
        if (isSpellcasterClass(state)) {
          const regenCard = document.createElement("div");
          regenCard.className = "p-2 rounded-lg border text-xs bg-sky-950/35 border-sky-500/50";
          regenCard.innerHTML = `
            <div class="flex items-center justify-between gap-1.5">
              <span class="font-bold text-sky-300">🔷 Arcane Flow (Spellcaster Passive)</span>
              <span class="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase shrink-0 bg-sky-900/80 text-sky-200">Passive</span>
            </div>
            <div class="text-[10px] text-stone-300 mt-0.5">Regenerate +1 MP every turn in combat and +1 MP for every choice made during an adventure.</div>`;
          subAbEl.appendChild(regenCard);
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
          bindItemTooltip(r, id, { qty });
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
      creation.hardcore = false;
      renderHardcoreToggle();
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

    function cloneVaultTabs(tabs) {
      if (!Array.isArray(tabs) || tabs.length === 0) return [[]];
      return tabs.map(tab => (Array.isArray(tab) ? tab.map(e => (e && typeof e === "object" ? { ...e } : e)) : []));
    }

    function normalizeSharedVaultData(raw) {
      const tabsRaw = Array.isArray(raw?.stashTabs) && raw.stashTabs.length > 0
        ? raw.stashTabs
        : [Array.isArray(raw?.stash) ? raw.stash : []];
      const stashTabs = tabsRaw.map(tab => compactContainerStacks(tab, 20));
      if (stashTabs.length === 0) stashTabs.push([]);
      const activeTab = typeof raw?.activeStashTab === "number" && raw.activeStashTab >= 0 && raw.activeStashTab < stashTabs.length
        ? raw.activeStashTab
        : 0;
      const recipes = Array.isArray(raw?.unlockedRecipes)
        ? [...new Set(raw.unlockedRecipes.filter(r => typeof r === "string" && r.length > 0))]
        : [];
      return {
        vaultGold: Math.max(0, Number(raw?.vaultGold) || 0),
        stashTabs,
        activeStashTab: activeTab,
        unlockedRecipes: recipes,
        updatedAt: raw?.updatedAt || new Date().toISOString()
      };
    }

    function addEntryToVaultTabs(tabs, itemId, qty, preferredTabIdx = 0) {
      if (!itemId || !ITEMS_DB[itemId] || qty <= 0) return;
      let rem = qty;
      const tryTab = (tab) => {
        if (isStackableMaterial(itemId)) {
          for (let i = 0; i < tab.length && rem > 0; i++) {
            if (getEntryId(tab[i]) === itemId && getEntryQty(tab[i]) < MAX_MAT_STACK) {
              const add = Math.min(rem, MAX_MAT_STACK - getEntryQty(tab[i]));
              tab[i] = { id: itemId, qty: getEntryQty(tab[i]) + add };
              rem -= add;
            }
          }
          while (rem > 0 && tab.length < 20) {
            const add = Math.min(rem, MAX_MAT_STACK);
            tab.push({ id: itemId, qty: add });
            rem -= add;
          }
        } else {
          while (rem > 0 && tab.length < 20) {
            tab.push(itemId);
            rem--;
          }
        }
      };

      const order = [];
      if (preferredTabIdx >= 0 && preferredTabIdx < tabs.length) order.push(preferredTabIdx);
      for (let i = 0; i < tabs.length; i++) if (i !== preferredTabIdx) order.push(i);
      for (const idx of order) {
        if (rem <= 0) break;
        tryTab(tabs[idx]);
      }
      while (rem > 0) {
        const overflowTab = [];
        tabs.push(overflowTab);
        tryTab(overflowTab);
      }
    }

    function collectRecipesFromSlots(slots) {
      const set = new Set();
      (slots || []).forEach(slot => {
        if (slot && Array.isArray(slot.unlockedRecipes)) {
          slot.unlockedRecipes.forEach(r => { if (typeof r === "string" && r.length > 0) set.add(r); });
        }
      });
      return [...set];
    }

    // One-time migration: merges every existing hero's individual vault gold, unlocked tabs, items, and crafting recipes into one account-wide Shared Vault without losing anything
    function migrateLegacyVaultsFromSlots(slots) {
      let totalGold = 0;
      let maxTabs = 1;
      (slots || []).forEach(slot => {
        if (!slot) return;
        totalGold += Math.max(0, Number(slot.vaultGold) || 0);
        const tabCount = Array.isArray(slot.stashTabs) && slot.stashTabs.length > 0 ? slot.stashTabs.length : 1;
        if (tabCount > maxTabs) maxTabs = tabCount;
      });
      const combinedTabs = Array.from({ length: maxTabs }, () => []);
      (slots || []).forEach(slot => {
        if (!slot) return;
        const heroTabs = Array.isArray(slot.stashTabs) && slot.stashTabs.length > 0
          ? slot.stashTabs
          : [Array.isArray(slot.stash) ? slot.stash : []];
        heroTabs.forEach((tab, tabIdx) => {
          (tab || []).forEach(entry => {
            const id = getEntryId(entry);
            const qty = getEntryQty(entry);
            if (id && qty > 0) addEntryToVaultTabs(combinedTabs, id, qty, tabIdx);
          });
        });
      });
      const migrated = normalizeSharedVaultData({
        vaultGold: totalGold,
        stashTabs: combinedTabs,
        activeStashTab: 0,
        unlockedRecipes: collectRecipesFromSlots(slots),
        updatedAt: new Date().toISOString()
      });
      try { localStorage.setItem(SHARED_VAULT_KEY, JSON.stringify(migrated)); } catch (_) {}
      return migrated;
    }

    function getSharedVault() {
      const slotRecipes = collectRecipesFromSlots(getSaveSlots());
      try {
        const raw = localStorage.getItem(SHARED_VAULT_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && typeof parsed === "object") {
            const existing = Array.isArray(parsed.unlockedRecipes) ? parsed.unlockedRecipes : [];
            const mergedSet = new Set([...existing, ...slotRecipes]);
            const needsSave = !Array.isArray(parsed.unlockedRecipes) || mergedSet.size > existing.length;
            parsed.unlockedRecipes = [...mergedSet];
            if (needsSave) parsed.updatedAt = new Date().toISOString();
            const norm = normalizeSharedVaultData(parsed);
            if (needsSave) {
              try { localStorage.setItem(SHARED_VAULT_KEY, JSON.stringify(norm)); } catch (_) {}
            }
            return norm;
          }
        }
      } catch (_) {}
      return migrateLegacyVaultsFromSlots(getSaveSlots());
    }

    function applySharedVaultToState(target = state) {
      if (!target) return;
      const sv = getSharedVault();
      target.vaultGold = sv.vaultGold;
      target.stashTabs = cloneVaultTabs(sv.stashTabs);
      target.activeStashTab = Math.min(sv.activeStashTab, target.stashTabs.length - 1);
      target.stash = target.stashTabs[0];
      const mergedRecipes = new Set(sv.unlockedRecipes || []);
      let addedNew = false;
      if (Array.isArray(target.unlockedRecipes)) {
        target.unlockedRecipes.forEach(r => {
          if (typeof r === "string" && r.length > 0 && !mergedRecipes.has(r)) {
            mergedRecipes.add(r);
            addedNew = true;
          }
        });
      }
      target.unlockedRecipes = [...mergedRecipes];
      if (addedNew) syncSharedVaultFromState(target);
    }

    function syncSharedVaultFromState(target = state) {
      if (!target) return null;
      const tabs = ensureStashTabs(target);
      const vaultObj = normalizeSharedVaultData({
        vaultGold: target.vaultGold || 0,
        stashTabs: cloneVaultTabs(tabs),
        activeStashTab: target.activeStashTab || 0,
        unlockedRecipes: Array.isArray(target.unlockedRecipes) ? target.unlockedRecipes : [],
        updatedAt: new Date().toISOString()
      });
      try { localStorage.setItem(SHARED_VAULT_KEY, JSON.stringify(vaultObj)); } catch (_) {}
      return vaultObj;
    }

    // Atomically persists both the Shared Account Vault and the active hero (preventing dupes or lost items when switching heroes)
    function persistVaultChange() {
      if (!state) return;
      syncSharedVaultFromState(state);
      saveToSlot(activeSaveSlot, true);
    }

    function writeSaveSlots(slots, sharedVault = null) {
      localStorage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots));
      const vaultToPush = sharedVault || getSharedVault();
      if (window.OAKHAVEN_CLOUD) window.OAKHAVEN_CLOUD.pushSlotsToCloud(slots, vaultToPush);
    }

    function saveToSlot(slotIdx, silent = false) {
      if (!state) return;
      const idx = Math.max(0, Math.min(MAX_SAVE_SLOTS - 1, slotIdx));
      try {
        const vaultObj = syncSharedVaultFromState(state);
        const slots = getSaveSlots();
        activeSaveSlot = idx;
        slots[idx] = { ...state, savedAt: new Date().toLocaleString() };
        writeSaveSlots(slots, vaultObj);
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
                ${slotData.hardcore ? `<span class="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-red-950 text-rose-300 border border-red-600/60">💀 Hardcore</span>` : ""}
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
      if (!Array.isArray(loaded.discoveredQuests)) {
        const lvl1Pool = Object.values(ADVENTURES).filter(
          adv => adv && !adv.reqQuest && (adv.recommendedLevel || 1) === 1
        );
        loaded.discoveredQuests = [lvl1Pool.length ? lvl1Pool[Math.floor(Math.random() * lvl1Pool.length)].id : "malakor"];
      }
	  loaded.backpack = compactContainerStacks(loaded.backpack || [], 12);
      applySharedVaultToState(loaded);
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
    function renderHardcoreToggle() {
      const btn = document.getElementById("btn-toggle-hardcore");
      const titleEl = document.getElementById("hardcore-title");
      const descEl = document.getElementById("hardcore-desc");
      const pillEl = document.getElementById("hardcore-pill");
      if (!btn) return;
      if (creation.hardcore) {
        btn.className = "w-full p-3.5 rounded-xl bg-red-950/85 hover:bg-red-950 border-2 border-red-500/80 text-left flex items-center justify-between gap-3 transition shadow-lg";
        if (titleEl) { titleEl.textContent = "Hardcore Mode: ON (Permadeath)"; titleEl.className = "font-display text-sm font-bold text-rose-200"; }
        if (descEl) { descEl.textContent = "If you die, this hero is permanently deleted and you return to the Start Screen. Shared Vault & Crafting Recipes remain safe!"; descEl.className = "text-[11px] text-rose-200/80"; }
        if (pillEl) { pillEl.textContent = "💀 Hardcore"; pillEl.className = "px-2.5 py-1 rounded-full bg-red-900 border border-red-400 text-[10px] font-bold uppercase text-rose-100 shrink-0"; }
      } else {
        btn.className = "w-full p-3.5 rounded-xl bg-stone-950/80 hover:bg-stone-900 border border-stone-700/80 text-left flex items-center justify-between gap-3 transition";
        if (titleEl) { titleEl.textContent = "Hardcore Mode: OFF"; titleEl.className = "font-display text-sm font-bold text-stone-200"; }
        if (descEl) { descEl.textContent = "Standard Hero — Fallen heroes resurrect at the Temple of the Dawn. Click to enable Permadeath."; descEl.className = "text-[11px] text-stone-400"; }
        if (pillEl) { pillEl.textContent = "Standard"; pillEl.className = "px-2.5 py-1 rounded-full bg-stone-800 border border-stone-600 text-[10px] font-bold uppercase text-stone-300 shrink-0"; }
      }
    }

    document.getElementById("btn-toggle-hardcore")?.addEventListener("click", () => {
      creation.hardcore = !creation.hardcore;
      renderHardcoreToggle();
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
          return `<span data-journal-item="${id}" class="px-2 py-0.5 rounded bg-stone-900 border border-amber-700/35 text-[11px] text-amber-100 cursor-help">${label}</span>`;
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
        card.querySelectorAll("[data-journal-item]").forEach(el => {
          bindItemTooltip(el, el.dataset.journalItem);
        });
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

    // Refresh Launch Screen, Slots Modal, and live Shared Account Vault whenever Firebase Cloud Sync pulls data
    if (window.OAKHAVEN_CLOUD) {
      window.OAKHAVEN_CLOUD.onSlotsUpdated(() => {
        initLaunchScreen();
        renderSlotsModal();
        if (state) {
          applySharedVaultToState(state);
          renderSheet();
          if (buildingModalOpen && (currentDistrict === "stash" || currentDistrict === "forge")) {
            renderTown();
          }
        }
      });
    }

    // Initialize Narrator UI, Launch Screen & queue Town Theme music
    window.OAKHAVEN_NARRATOR?.initUI();
    bgm("town");
    initLaunchScreen();
  })();
