/* ============================================================
   CHRONICLES OF OAKHAVEN — D&D 5e VIRTUAL TABLETOP (VTT) ENGINE
   12x8 Grid (60ft x 40ft, 5ft/square) • Initiative • Movement
   Cover • Difficult Terrain • Opportunity Attacks • Grid AI
   ============================================================ */
(function () {
  window.OAKHAVEN = window.OAKHAVEN || {};

  const COLS = 12;
  const ROWS = 8;
  const TILE = 80; // 960 x 640 internal canvas resolution
  const FT_PER_SQ = 5;

  const imgCache = {};
  function getImg(src) {
    if (!src) return null;
    if (imgCache[src]) return imgCache[src];
    const im = new Image();
    im.onload = () => { if (VTT.active) VTT.render(); };
    im.onerror = () => { im._failed = true; };
    im.src = src;
    imgCache[src] = im;
    return im;
  }

  function hashStr(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }

  function makeRng(seed) {
    let s = seed >>> 0 || 1;
    return () => {
      s = (Math.imul(1664525, s) + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function chebyshev(ax, ay, bx, by) {
    return Math.max(Math.abs(ax - bx), Math.abs(ay - by));
  }

  function distFt(ax, ay, bx, by) {
    return chebyshev(ax, ay, bx, by) * FT_PER_SQ;
  }

  function detectBiome(quest, page, enemy) {
    const hay = [
      quest?.id, quest?.title, quest?.subtitle, quest?.region,
      page?.title, page?.text?.slice(0, 260),
      enemy?.name, enemy?.desc
    ].filter(Boolean).join(" ").toLowerCase();

    if (/ice|frost|snow|glacier|tundra|winter|arctic|blizzard|frozen/.test(hay)) return "arctic";
    if (/swamp|marsh|bog|fen|mire|bayou|ooze|sludge/.test(hay)) return "swamp";
    if (/cavern|cave|underdark|mine|tunnel|grotto|chasm|stalactite|underground|spider/.test(hay)) return "cavern";
    if (/ship|harbor|dock|pier|wharf|pirate|lighthouse|kraken|cove|port/.test(hay)) return "harbor";
    if (/crypt|tomb|catacomb|grave|barrow|mausoleum|ossuary|necropolis|undead|skeleton|lich|coffin/.test(hay)) return "crypt";
    if (/tavern|inn|flagon|alehouse|lounge|parlor|hall|banquet|ballroom/.test(hay)) return "tavern";
    if (/roof|rooftop|spire|belltower|balcony|rafter/.test(hay)) return "rooftops";
    if (/tower|citadel|keep|castle|battlement|rampart/.test(hay)) return "tower";
    if (/forest|wood|grove|glade|thornwood|tree|jungle|canopy|bramble|clearing/.test(hay)) return "forest";
    if (/city|street|alley|market|square|district|zobeck|guild|shop|warehouse/.test(hay)) return "city";
    if (/ruin|abbey|temple|shrine|monastery|altar|pillar|courtyard/.test(hay)) return "ruins";
    if (/coast|beach|cliff|tide|sea|saltfang/.test(hay)) return "harbor";
    if (/plain|moor|meadow|road|trail|hill|camp|caravan|outskirts/.test(hay)) return "plains";
    return "dungeon";
  }

  function isAquaticEnemy(enemy) {
    const hay = `${enemy?.name || ""} ${enemy?.desc || ""}`.toLowerCase();
    return /crab|reef|kraken|shark|sahuagin|merfolk|tentacle|fish|sea|squid|aboleth|water|kelp|lizardfolk|frog|toad|eel|serpent|tide|aquatic|swimmer/.test(hay);
  }

  function pickEnemyIcon(enemy) {
    const hay = `${enemy?.name || ""} ${enemy?.desc || ""}`.toLowerCase();
    if (/dragon|wyrm|drake|wyvern/.test(hay)) return "🐉";
    if (/lich|skeleton|zombie|ghoul|wight|vampire|wraith|ghost|specter|undead|mummy/.test(hay)) return "💀";
    if (/spider|arachnid|ettercap|drider/.test(hay)) return "🕷️";
    if (/wolf|worg|hound|bear|boar|catamount|lion|tiger|beast|rat|bat/.test(hay)) return "🐺";
    if (/crab|kraken|shark|sahuagin|merfolk|tentacle|fish|sea|squid/.test(hay)) return "🦀";
    if (/mage|wizard|sorcerer|warlock|witch|cultist|priest|shaman|necromancer|acolyte/.test(hay)) return "🧙";
    if (/demon|devil|fiend|imp|hell|succubus|gargoyle/.test(hay)) return "👹";
    if (/goblin|kobold|orc|ogre|troll|giant|gnoll|bugbear|hobgoblin/.test(hay)) return "👺";
    if (/golem|clockwork|construct|automaton|statue|armor/.test(hay)) return "🤖";
    if (/ooze|slime|jelly|cube|fungus|myconid|spore|plant|treant/.test(hay)) return "🍄";
    if (/serpent|snake|naga|hydra|basilisk|lizard|medusa/.test(hay)) return "🐍";
    return "⚔️";
  }

  function isRangedEnemy(enemy) {
    const hay = `${enemy?.name || ""} ${enemy?.desc || ""}`.toLowerCase();
    return /archer|bow|crossbow|sniper|ranger|mage|wizard|sorcerer|warlock|witch|cultist|shaman|necromancer|priest|caster|spitter|beholder|eye|pistol|musket|sling|thrower/.test(hay);
  }

  function resolveMapUrl(quest, pageNum, biome) {
    const bm = window.OAKHAVEN.battleMaps || {};
    const qid = quest?.id || "";
    const encKey = `${qid}_p${pageNum}`;
    if (bm.encounters && bm.encounters[encKey]) return { url: bm.encounters[encKey], label: "Encounter Battle Map" };
    if (bm.quests && bm.quests[qid]) return { url: bm.quests[qid], label: "Sourcebook Battle Map" };
    if (bm.biomes && bm.biomes[biome]) return { url: bm.biomes[biome], label: `${biome.charAt(0).toUpperCase() + biome.slice(1)} Battle Map` };
    return { url: null, label: `${biome.charAt(0).toUpperCase() + biome.slice(1)} Grid` };
  }

  function getHeroSpeedFt(heroState) {
    const race = (heroState?.race || "").toLowerCase();
    const cls = (heroState?.className || heroState?.cls || "").toLowerCase();
    let spd = 30;
    if (/dwarf|gnome|halfling|kobold|derro/.test(race)) spd = 25;
    if (/elf|centaur|tabaxi|catfolk|satyr/.test(race)) spd = 35;
    if (/monk|barbarian|ranger/.test(cls)) spd += 5;
    return spd;
  }

  function getHeroWeaponProfile(heroState, itemsDb) {
    const wId = heroState?.equipment?.weapon;
    const w = wId && itemsDb ? itemsDb[wId] : null;
    const hay = `${w?.name || ""} ${w?.desc || ""}`.toLowerCase();
    if (/bow|crossbow|sling|pistol|musket|rifle|blowgun|dart/.test(hay)) {
      return { mode: "ranged", meleeReach: 5, rangeFt: 60, name: w?.name || "Ranged Weapon" };
    }
    if (/spear|halberd|pike|glaive|whip|trident|lance|polearm|staff/.test(hay)) {
      return { mode: "reach", meleeReach: 10, rangeFt: 10, name: w?.name || "Reach Weapon" };
    }
    return { mode: "melee", meleeReach: 5, rangeFt: 5, name: w?.name || "Melee Weapon" };
  }

  // Generate deterministic, always-navigable 5e tactical terrain
  function generateTerrain(seed, biome, allowFlee) {
    const rng = makeRng(seed);
    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill("open"));

    // Reserve spawn zones: Hero at (2, 4), Enemy at (9, 3..4)
    const reserved = new Set(["2,4", "2,3", "1,4", "3,4", "9,3", "9,4", "8,3", "8,4", "10,3", "10,4"]);

    // Add 4-6 impassable pillars/walls (symmetric-ish in middle columns 4..7)
    const wallCount = 4 + Math.floor(rng() * 3);
    let placed = 0, tries = 0;
    while (placed < wallCount && tries < 60) {
      tries++;
      const x = 3 + Math.floor(rng() * 6);
      const y = 1 + Math.floor(rng() * (ROWS - 2));
      const k = `${x},${y}`;
      if (reserved.has(k) || grid[y][x] !== "open") continue;
      grid[y][x] = "wall";
      placed++;
    }

    // Add 4-5 Half Cover tiles (+2 AC vs ranged/spells)
    const coverCount = 4 + Math.floor(rng() * 2);
    placed = 0; tries = 0;
    while (placed < coverCount && tries < 60) {
      tries++;
      const x = 2 + Math.floor(rng() * 8);
      const y = 1 + Math.floor(rng() * (ROWS - 2));
      const k = `${x},${y}`;
      if (reserved.has(k) || grid[y][x] !== "open") continue;
      grid[y][x] = "cover";
      placed++;
    }

    // Add 6-9 Difficult Terrain tiles (10ft cost)
    const diffCount = 6 + Math.floor(rng() * 4);
    placed = 0; tries = 0;
    while (placed < diffCount && tries < 80) {
      tries++;
      const x = 1 + Math.floor(rng() * (COLS - 2));
      const y = Math.floor(rng() * ROWS);
      const k = `${x},${y}`;
      if (reserved.has(k) || grid[y][x] !== "open") continue;
      grid[y][x] = "difficult";
      placed++;
    }

    // Escape tiles on left edge if fleeing is permitted
    if (allowFlee) {
      grid[3][0] = "exit";
      grid[4][0] = "exit";
    }

    // Ensure clear path from hero (2,4) to enemy (9,3) — carve open if blocked
    if (!findPath(grid, 2, 4, 9, 3, null)) {
      for (let x = 2; x <= 9; x++) {
        if (grid[4][x] === "wall" || grid[4][x] === "cover") grid[4][x] = "open";
      }
    }

    return grid;
  }

  function isWalkable(grid, x, y, blockedPos) {
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return false;
    const t = grid[y][x];
    if (t === "wall" || t === "cover") return false;
    if (blockedPos && blockedPos.x === x && blockedPos.y === y) return false;
    return true;
  }

  // Load real pixel-aligned mapGrid when available, else fallback to clean terrain
  function buildGridForMap(mapUrl, seed, biome, allowFlee) {
    const mapGrids = window.OAKHAVEN?.battleMaps?.mapGrids || {};
    const mg = mapUrl ? mapGrids[mapUrl] : null;
    if (mg && Array.isArray(mg.rows) && mg.rows.length === ROWS) {
      const charMap = { ".": "open", "W": "water", "#": "wall", "C": "cover", "D": "difficult" };
      const grid = mg.rows.map(row => row.split("").slice(0, COLS).map(ch => charMap[ch] || "open"));
      const hs = mg.heroSpawn || [2, 4];
      const es = mg.enemySpawn || [9, 3];
      // Place 1-2 Exit tiles on walkable left-edge squares (never in deep water if dry edge exists)
      if (allowFlee) {
        let placedExit = 0;
        for (let y = 0; y < ROWS && placedExit < 2; y++) {
          if (grid[y][0] === "open" && !(hs[0] === 0 && hs[1] === y)) {
            grid[y][0] = "exit";
            placedExit++;
          }
        }
        if (placedExit === 0) {
          for (let y = 2; y < ROWS && placedExit < 2; y++) {
            if (grid[y][0] !== "wall" && !(hs[0] === 0 && hs[1] === y)) {
              grid[y][0] = "exit";
              placedExit++;
            }
          }
        }
      }
      return { grid, heroSpawn: { x: hs[0], y: hs[1] }, enemySpawn: { x: es[0], y: es[1] }, hasRealMapGrid: true };
    }
    return {
      grid: generateTerrain(seed, biome, allowFlee),
      heroSpawn: { x: 2, y: 4 },
      enemySpawn: { x: 9, y: 3 },
      hasRealMapGrid: false
    };
  }

  // Dijkstra shortest path accounting for Difficult Terrain & Water (10ft / half movement vs 5ft)
  function computeReachable(grid, startX, startY, maxFt, blockedPos, isAquatic = false) {
    const dist = Array.from({ length: ROWS }, () => Array(COLS).fill(Infinity));
    const prev = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    dist[startY][startX] = 0;
    const pq = [{ x: startX, y: startY, d: 0 }];

    const dirs = [
      [1, 0], [-1, 0], [0, 1], [0, -1],
      [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];

    while (pq.length) {
      pq.sort((a, b) => a.d - b.d);
      const cur = pq.shift();
      if (cur.d > dist[cur.y][cur.x]) continue;

      for (const [dx, dy] of dirs) {
        const nx = cur.x + dx, ny = cur.y + dy;
        if (!isWalkable(grid, nx, ny, blockedPos)) continue;
        // Prevent corner-cutting through diagonal walls
        if (dx !== 0 && dy !== 0) {
          if (grid[cur.y][nx] === "wall" && grid[ny][cur.x] === "wall") continue;
        }
        const tileType = grid[ny][nx];
        const stepCost = (tileType === "difficult" || (tileType === "water" && !isAquatic)) ? 10 : 5;
        const nd = cur.d + stepCost;
        if (nd <= maxFt && nd < dist[ny][nx]) {
          dist[ny][nx] = nd;
          prev[ny][nx] = { x: cur.x, y: cur.y };
          pq.push({ x: nx, y: ny, d: nd });
        }
      }
    }
    return { dist, prev };
  }

  function findPath(grid, sx, sy, tx, ty, blockedPos) {
    const { dist, prev } = computeReachable(grid, sx, sy, 300, blockedPos);
    if (!isFinite(dist[ty]?.[tx])) return null;
    const path = [];
    let cx = tx, cy = ty;
    while (cx !== sx || cy !== sy) {
      path.unshift({ x: cx, y: cy, cost: dist[cy][cx] });
      const p = prev[cy][cx];
      if (!p) break;
      cx = p.x; cy = p.y;
    }
    return path;
  }

  // Bresenham Line of Sight & Cover check
  function checkLineAndCover(grid, ax, ay, bx, by) {
    let x0 = ax, y0 = ay, x1 = bx, y1 = by;
    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    let blocked = false;
    let halfCover = false;

    while (true) {
      if ((x0 !== ax || y0 !== ay) && (x0 !== bx || y0 !== by)) {
        const t = grid[y0][x0];
        if (t === "wall") blocked = true;
        if (t === "cover") halfCover = true;
      }
      if (x0 === x1 && y0 === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) { err -= dy; x0 += sx; }
      if (e2 < dx) { err += dx; y0 += sy; }
    }
    // Also check if defender is standing directly adjacent to cover on the attacker's side
    if (!halfCover && chebyshev(ax, ay, bx, by) >= 2) {
      const stepX = Math.sign(ax - bx), stepY = Math.sign(ay - by);
      const cx = bx + stepX, cy = by + stepY;
      if (cx >= 0 && cx < COLS && cy >= 0 && cy < ROWS && (grid[cy][cx] === "cover" || grid[cy][cx] === "wall")) {
        halfCover = true;
      }
    }
    return { blocked, halfCover };
  }

  const VTT = {
    active: false,
    canvas: null,
    ctx: null,
    state: null, // VTT battlefield state attached to activeCombat.vtt
    hoverTile: null,
    showGrid: true,
    autoEndTurn: false,
    fx: [], // floating texts & attack beams/slashes
    rafId: null,
    callbacks: null,

    init(activeCombat, heroState, quest, page, itemsDb, callbacks) {
      this.callbacks = callbacks;
      const biome = detectBiome(quest, page, activeCombat);
      const seed = hashStr(`${quest?.id || "outskirts"}_${activeCombat.pageNum}_${activeCombat.name}`);
      const mapInfo = resolveMapUrl(quest, activeCombat.pageNum, biome);
      const built = buildGridForMap(mapInfo.url, seed, biome, !!activeCombat.flee);
      const grid = built.grid;
      if (mapInfo.url) getImg(mapInfo.url);

      const heroSpeed = getHeroSpeedFt(heroState);
      const enemySpeed = activeCombat.isBoss ? 30 : 30;
      const heroInitRoll = Math.floor(Math.random() * 20) + 1;
      const heroInitMod = Math.floor((heroState?.stats?.agility || 1) / 2);
      const enemyInitRoll = Math.floor(Math.random() * 20) + 1;
      const enemyInitMod = Math.floor((activeCombat.atk || 2) / 2);
      const heroInit = heroInitRoll + heroInitMod;
      const enemyInit = enemyInitRoll + enemyInitMod;

      const vttState = {
        biome,
        mapUrl: mapInfo.url,
        mapLabel: mapInfo.label,
        hasRealMapGrid: built.hasRealMapGrid,
        grid,
        round: 1,
        turn: heroInit >= enemyInit ? "hero" : "enemy",
        heroInit,
        enemyInit,
        hero: {
          x: built.heroSpawn.x, y: built.heroSpawn.y,
          vx: built.heroSpawn.x, vy: built.heroSpawn.y, // visual interpolated pos
          speed: heroSpeed,
          moveLeft: heroSpeed,
          actionUsed: false,
          bonusUsed: false,
          dodging: false,
          disengaged: false,
          tokenPath: callbacks?.getHeroTokenPath ? callbacks.getHeroTokenPath() : null
        },
        enemy: {
          x: built.enemySpawn.x, y: built.enemySpawn.y,
          vx: built.enemySpawn.x, vy: built.enemySpawn.y,
          speed: enemySpeed,
          isRanged: isRangedEnemy(activeCombat),
          isAquatic: isAquaticEnemy(activeCombat),
          icon: pickEnemyIcon(activeCombat),
          artPath: window.OAKHAVEN?.monsterArt?.byName?.[activeCombat.name] || null,
          isBoss: !!activeCombat.isBoss
        },
        weapon: getHeroWeaponProfile(heroState, itemsDb),
        reachable: null
      };

      if (vttState.enemy.artPath) getImg(vttState.enemy.artPath);
      vttState.reachable = computeReachable(grid, vttState.hero.x, vttState.hero.y, vttState.hero.moveLeft, vttState.enemy);
      activeCombat.vtt = vttState;
      this.state = vttState;
      this.active = true;
      this.fx = [];

      activeCombat.log.unshift(
        `🎲 Initiative: You ${heroInit} (${heroInitRoll}+${heroInitMod}) vs ${activeCombat.name} ${enemyInit} (${enemyInitRoll}+${enemyInitMod}) — ${vttState.turn === "hero" ? "Your Turn!" : `${activeCombat.name} acts first!`}`
      );

      this.bindCanvas();
      this.startLoop();
      this.updateHud(activeCombat);

      // If enemy won initiative, run enemy opening turn after a brief beat
      if (vttState.turn === "enemy") {
        setTimeout(() => {
          if (this.active && this.callbacks?.runEnemyTurn) {
            this.callbacks.runEnemyTurn();
          }
        }, 650);
      }
    },

    stop() {
      this.active = false;
      this.state = null;
      this.hoverTile = null;
      this.fx = [];
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    },

    bindCanvas() {
      const canvas = document.getElementById("vtt-battle-canvas");
      if (!canvas) return;
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      if (canvas._vttBound) return;
      canvas._vttBound = true;

      const getTileFromEvent = (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const px = (e.clientX - rect.left) * scaleX;
        const py = (e.clientY - rect.top) * scaleY;
        const gx = Math.floor(px / TILE);
        const gy = Math.floor(py / TILE);
        if (gx < 0 || gx >= COLS || gy < 0 || gy >= ROWS) return null;
        return { x: gx, y: gy };
      };

      canvas.addEventListener("mousemove", (e) => {
        if (!this.active) return;
        this.hoverTile = getTileFromEvent(e);
      });
      canvas.addEventListener("mouseleave", () => {
        this.hoverTile = null;
      });
      canvas.addEventListener("click", (e) => {
        if (!this.active || !this.state) return;
        const t = getTileFromEvent(e);
        if (!t) return;
        this.handleTileClick(t.x, t.y);
      });
    },

    handleTileClick(tx, ty) {
      const s = this.state;
      if (!s || s.turn !== "hero") return;

      // Clicking enemy token -> attack!
      if (tx === s.enemy.x && ty === s.enemy.y) {
        if (this.callbacks?.onClickEnemy) this.callbacks.onClickEnemy();
        return;
      }

      // Clicking reachable square -> move hero!
      const cost = s.reachable?.dist?.[ty]?.[tx];
      if (!isFinite(cost) || cost <= 0 || cost > s.hero.moveLeft) return;

      const wasAdj = chebyshev(s.hero.x, s.hero.y, s.enemy.x, s.enemy.y) <= 1;
      const nowAdj = chebyshev(tx, ty, s.enemy.x, s.enemy.y) <= 1;

      // 5e Opportunity Attack check when leaving enemy's 5ft reach without Disengage
      if (wasAdj && !nowAdj && !s.hero.disengaged && this.callbacks?.triggerOpportunityAttack) {
        this.callbacks.triggerOpportunityAttack();
        if (!this.active) return; // hero might have died
      }

      s.hero.x = tx;
      s.hero.y = ty;
      s.hero.moveLeft = Math.max(0, s.hero.moveLeft - cost);
      s.reachable = computeReachable(s.grid, s.hero.x, s.hero.y, s.hero.moveLeft, s.enemy);
      this.spawnFloat(tx, ty, `-${cost} ft`, "#93c5fd");

      // Stepping on Exit tile triggers Flee!
      if (s.grid[ty][tx] === "exit" && this.callbacks?.onStepExit) {
        this.callbacks.onStepExit();
        return;
      }

      if (this.callbacks?.onStateChange) this.callbacks.onStateChange();
    },

    // Auto-step hero into melee reach if possible
    tryAutoApproach(reachFt) {
      const s = this.state;
      if (!s) return { ok: true, moved: 0 };
      const curDist = distFt(s.hero.x, s.hero.y, s.enemy.x, s.enemy.y);
      if (curDist <= reachFt) return { ok: true, moved: 0 };

      const reachSq = Math.max(1, Math.floor(reachFt / FT_PER_SQ));
      let best = null;
      let bestCost = Infinity;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (chebyshev(x, y, s.enemy.x, s.enemy.y) <= reachSq) {
            const c = s.reachable?.dist?.[y]?.[x];
            if (isFinite(c) && c <= s.hero.moveLeft && c < bestCost) {
              bestCost = c;
              best = { x, y };
            }
          }
        }
      }
      if (!best) return { ok: false, distFt: curDist, moveLeft: s.hero.moveLeft };
      s.hero.x = best.x;
      s.hero.y = best.y;
      s.hero.moveLeft = Math.max(0, s.hero.moveLeft - bestCost);
      s.reachable = computeReachable(s.grid, s.hero.x, s.hero.y, s.hero.moveLeft, s.enemy);
      return { ok: true, moved: bestCost };
    },

    // Tactical Actions: Dash, Dodge, Disengage
    doDash(activeCombat) {
      const s = this.state;
      if (!s || s.turn !== "hero" || s.hero.actionUsed) return false;
      s.hero.actionUsed = true;
      s.hero.moveLeft += s.hero.speed;
      s.reachable = computeReachable(s.grid, s.hero.x, s.hero.y, s.hero.moveLeft, s.enemy);
      this.spawnFloat(s.hero.x, s.hero.y, `DASH +${s.hero.speed}ft`, "#38bdf8");
      activeCombat.log.unshift(`💨 [DASH] You sprint forward (+${s.hero.speed} ft movement this turn)!`);
      this.updateHud(activeCombat);
      return true;
    },

    doDodge(activeCombat) {
      const s = this.state;
      if (!s || s.turn !== "hero" || s.hero.actionUsed) return false;
      s.hero.actionUsed = true;
      s.hero.dodging = true;
      this.spawnFloat(s.hero.x, s.hero.y, "DODGING!", "#fbbf24");
      activeCombat.log.unshift(`🛡️ [DODGE] You focus on evasion — enemy attacks suffer Disadvantage (-3 ATK) until your next turn!`);
      this.updateHud(activeCombat);
      return true;
    },

    doDisengage(activeCombat) {
      const s = this.state;
      if (!s || s.turn !== "hero" || s.hero.actionUsed) return false;
      s.hero.actionUsed = true;
      s.hero.disengaged = true;
      this.spawnFloat(s.hero.x, s.hero.y, "DISENGAGE", "#34d399");
      activeCombat.log.unshift(`🦶 [DISENGAGE] Your movement won't provoke Opportunity Attacks this turn!`);
      this.updateHud(activeCombat);
      return true;
    },

    // Start Hero's new turn
    beginHeroTurn(activeCombat) {
      const s = this.state;
      if (!s) return;
      s.turn = "hero";
      s.round++;
      s.hero.moveLeft = s.hero.speed;
      s.hero.actionUsed = false;
      s.hero.bonusUsed = false;
      s.hero.dodging = false;
      s.hero.disengaged = false;
      s.reachable = computeReachable(s.grid, s.hero.x, s.hero.y, s.hero.moveLeft, s.enemy);
      this.updateHud(activeCombat);
    },

    // Move enemy tactically on the grid during Enemy Turn; returns { canAttack, isRanged, movedFt, hasHalfCover }
    moveEnemyAI(activeCombat) {
      const s = this.state;
      if (!s) return { canAttack: true, isRanged: false, movedFt: 0, hasHalfCover: false };
      s.turn = "enemy";
      const curDist = distFt(s.enemy.x, s.enemy.y, s.hero.x, s.hero.y);
      const enemyRange = s.enemy.isRanged ? 45 : 5;
      const los = checkLineAndCover(s.grid, s.enemy.x, s.enemy.y, s.hero.x, s.hero.y);

      // Already in good attack position with LoS?
      if (curDist <= enemyRange && !los.blocked) {
        // Ranged enemy tries to step back if hero is right in their face (5ft)
        if (s.enemy.isRanged && curDist <= 5) {
          const reach = computeReachable(s.grid, s.enemy.x, s.enemy.y, 15, s.hero);
          let best = null, bestD = curDist;
          for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
              if (isFinite(reach.dist[y][x]) && reach.dist[y][x] > 0) {
                const d = distFt(x, y, s.hero.x, s.hero.y);
                const l2 = checkLineAndCover(s.grid, x, y, s.hero.x, s.hero.y);
                if (!l2.blocked && d > bestD && d <= 35) {
                  bestD = d; best = { x, y, c: reach.dist[y][x] };
                }
              }
            }
          }
          if (best) {
            s.enemy.x = best.x; s.enemy.y = best.y;
            const l3 = checkLineAndCover(s.grid, s.enemy.x, s.enemy.y, s.hero.x, s.hero.y);
            return { canAttack: true, isRanged: true, movedFt: best.c, hasHalfCover: l3.halfCover };
          }
        }
        return { canAttack: true, isRanged: s.enemy.isRanged && curDist > 5, movedFt: 0, hasHalfCover: curDist > 5 && los.halfCover };
      }

      // Move toward hero along shortest path (aquatic enemies swim at full 5ft speed!)
      const reach = computeReachable(s.grid, s.enemy.x, s.enemy.y, s.enemy.speed, s.hero, !!s.enemy.isAquatic);
      let best = null;
      let bestScore = Infinity;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (!isFinite(reach.dist[y][x])) continue;
          const d = distFt(x, y, s.hero.x, s.hero.y);
          const l2 = checkLineAndCover(s.grid, x, y, s.hero.x, s.hero.y);
          const targetD = s.enemy.isRanged ? 25 : 5;
          let score = Math.abs(d - targetD) + (l2.blocked ? 100 : 0);
          if (score < bestScore) {
            bestScore = score;
            best = { x, y, c: reach.dist[y][x], d, blocked: l2.blocked, halfCover: l2.halfCover };
          }
        }
      }

      if (best && (best.x !== s.enemy.x || best.y !== s.enemy.y)) {
        s.enemy.x = best.x;
        s.enemy.y = best.y;
        const canAtk = best.d <= enemyRange && !best.blocked;
        if (!canAtk) {
          // Enemy uses Dash to close remaining distance!
          const reach2 = computeReachable(s.grid, s.enemy.x, s.enemy.y, s.enemy.speed, s.hero);
          let dashBest = null, dashScore = best.d;
          for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
              if (!isFinite(reach2.dist[y][x])) continue;
              const d2 = distFt(x, y, s.hero.x, s.hero.y);
              if (d2 < dashScore) { dashScore = d2; dashBest = { x, y, c: reach2.dist[y][x] }; }
            }
          }
          if (dashBest) {
            s.enemy.x = dashBest.x;
            s.enemy.y = dashBest.y;
            this.spawnFloat(s.enemy.x, s.enemy.y, "DASH!", "#f87171");
            return { canAttack: false, isRanged: false, movedFt: best.c + dashBest.c, dashed: true, hasHalfCover: false };
          }
        }
        return { canAttack: canAtk, isRanged: s.enemy.isRanged && best.d > 5, movedFt: best.c, hasHalfCover: best.d > 5 && best.halfCover };
      }

      return { canAttack: curDist <= enemyRange && !los.blocked, isRanged: s.enemy.isRanged && curDist > 5, movedFt: 0, hasHalfCover: los.halfCover };
    },

    // Visual FX helpers
    spawnFloat(gx, gy, text, color = "#fef08a") {
      this.fx.push({ type: "float", x: (gx + 0.5) * TILE, y: (gy + 0.25) * TILE, text, color, born: performance.now(), dur: 1050 });
    },
    spawnAttackFx(fromX, fromY, toX, toY, color = "#f87171", isRanged = false) {
      this.fx.push({
        type: isRanged ? "beam" : "slash",
        x1: (fromX + 0.5) * TILE, y1: (fromY + 0.5) * TILE,
        x2: (toX + 0.5) * TILE, y2: (toY + 0.5) * TILE,
        color, born: performance.now(), dur: 420
      });
    },

    getDistFt() {
      if (!this.state) return 5;
      return distFt(this.state.hero.x, this.state.hero.y, this.state.enemy.x, this.state.enemy.y);
    },

    getLineOfSightHeroToEnemy() {
      if (!this.state) return { blocked: false, halfCover: false };
      return checkLineAndCover(this.state.grid, this.state.hero.x, this.state.hero.y, this.state.enemy.x, this.state.enemy.y);
    },

    updateHud(activeCombat) {
      const s = this.state;
      if (!s) return;
      const dist = distFt(s.hero.x, s.hero.y, s.enemy.x, s.enemy.y);
      const los = checkLineAndCover(s.grid, s.hero.x, s.hero.y, s.enemy.x, s.enemy.y);
      const elRound = document.getElementById("vtt-round-label");
      const elMove = document.getElementById("vtt-move-label");
      const elAct = document.getElementById("vtt-action-badge");
      const elBon = document.getElementById("vtt-bonus-badge");
      const elDist = document.getElementById("vtt-dist-label");
      const elMap = document.getElementById("vtt-map-label");

      if (elRound) elRound.textContent = `Round ${s.round} • ${s.turn === "hero" ? "Your Turn" : "Enemy Turn"}`;
      if (elMove) elMove.textContent = `Move: ${s.hero.moveLeft} / ${s.hero.speed} ft`;
      if (elAct) {
        elAct.textContent = s.hero.actionUsed ? "Action: Used" : "Action: Ready";
        elAct.className = `px-2 py-0.5 rounded text-[11px] font-bold border ${s.hero.actionUsed ? "bg-stone-900 border-stone-700 text-stone-500" : "bg-emerald-950 border-emerald-500/70 text-emerald-200"}`;
      }
      if (elBon) {
        elBon.textContent = s.hero.bonusUsed ? "Bonus: Used" : "Bonus: Ready";
        elBon.className = `px-2 py-0.5 rounded text-[11px] font-bold border ${s.hero.bonusUsed ? "bg-stone-900 border-stone-700 text-stone-500" : "bg-amber-950 border-amber-500/70 text-amber-200"}`;
      }
      if (elDist) {
        let covStr = "";
        if (los.blocked) covStr = " • Full Cover";
        else if (los.halfCover) covStr = " • Half Cover (+2 AC)";
        elDist.textContent = `Range: ${dist} ft${covStr}`;
      }
      if (elMap) elMap.textContent = s.mapLabel;

      const btnDash = document.getElementById("btn-vtt-dash");
      const btnDodge = document.getElementById("btn-vtt-dodge");
      const btnDis = document.getElementById("btn-vtt-disengage");
      const btnEnd = document.getElementById("btn-vtt-end-turn");
      const actDisabled = s.turn !== "hero" || s.hero.actionUsed;
      if (btnDash) btnDash.disabled = actDisabled;
      if (btnDodge) btnDodge.disabled = actDisabled;
      if (btnDis) btnDis.disabled = actDisabled;
      if (btnEnd) {
        btnEnd.disabled = s.turn !== "hero";
        btnEnd.classList.toggle("animate-pulse", s.turn === "hero" && s.hero.actionUsed);
      }
    },

    startLoop() {
      if (this.rafId) cancelAnimationFrame(this.rafId);
      const tick = (now) => {
        if (!this.active) return;
        this.render(now);
        this.rafId = requestAnimationFrame(tick);
      };
      this.rafId = requestAnimationFrame(tick);
    },

    render(now = performance.now()) {
      const canvas = this.canvas;
      const ctx = this.ctx;
      const s = this.state;
      if (!canvas || !ctx || !s) return;

      // Smoothly interpolate visual positions
      s.hero.vx += (s.hero.x - s.hero.vx) * 0.25;
      s.hero.vy += (s.hero.y - s.hero.vy) * 0.25;
      s.enemy.vx += (s.enemy.x - s.enemy.vx) * 0.22;
      s.enemy.vy += (s.enemy.y - s.enemy.vy) * 0.22;

      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // 1. Background Battle Map Image (or atmospheric fallback)
      const bgImg = s.mapUrl ? getImg(s.mapUrl) : null;
      if (bgImg && bgImg.complete && bgImg.naturalWidth > 0 && !bgImg._failed) {
        ctx.drawImage(bgImg, 0, 0, W, H);
        // Subtle dark vignette for token readability
        ctx.fillStyle = "rgba(12, 10, 9, 0.22)";
        ctx.fillRect(0, 0, W, H);
      } else {
        const grad = ctx.createRadialGradient(W / 2, H / 2, 80, W / 2, H / 2, W * 0.65);
        grad.addColorStop(0, "#2c241d");
        grad.addColorStop(1, "#16110e");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, W, H);
      }

      // 2. Reachable movement overlay (blue highlight on Hero's turn)
      if (s.turn === "hero" && s.hero.moveLeft > 0 && s.reachable) {
        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            const c = s.reachable.dist[y][x];
            if (isFinite(c) && c > 0 && c <= s.hero.moveLeft) {
              ctx.fillStyle = s.grid[y][x] === "difficult" ? "rgba(56, 189, 248, 0.16)" : "rgba(59, 130, 246, 0.20)";
              ctx.fillRect(x * TILE + 2, y * TILE + 2, TILE - 4, TILE - 4);
              ctx.strokeStyle = "rgba(96, 165, 250, 0.38)";
              ctx.lineWidth = 1.5;
              ctx.strokeRect(x * TILE + 2, y * TILE + 2, TILE - 4, TILE - 4);
            }
          }
        }
      }

      // 3. Tactical Terrain Tiles (Clean translucent overlays — no ugly floating boxes over real map art!)
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const t = s.grid[y][x];
          const px = x * TILE, py = y * TILE;
          if (t === "wall") {
            ctx.fillStyle = s.hasRealMapGrid ? "rgba(12, 10, 9, 0.35)" : "rgba(24, 20, 18, 0.72)";
            ctx.fillRect(px + 2, py + 2, TILE - 4, TILE - 4);
            ctx.strokeStyle = "rgba(239, 68, 68, 0.35)";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(px + 3, py + 3, TILE - 6, TILE - 6);
          } else if (t === "cover") {
            ctx.fillStyle = "rgba(180, 83, 9, 0.22)";
            ctx.fillRect(px + 6, py + 6, TILE - 12, TILE - 12);
            ctx.strokeStyle = "rgba(251, 191, 36, 0.65)";
            ctx.lineWidth = 2;
            ctx.strokeRect(px + 6, py + 6, TILE - 12, TILE - 12);
          } else if (t === "water") {
            // Subtle cyan wave-shimmer outline for 5e Water (Half Movement / 10ft)
            ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px + 18, py + TILE * 0.52);
            ctx.quadraticCurveTo(px + TILE * 0.35, py + TILE * 0.44, px + TILE * 0.5, py + TILE * 0.52);
            ctx.quadraticCurveTo(px + TILE * 0.65, py + TILE * 0.60, px + TILE - 18, py + TILE * 0.52);
            ctx.stroke();
          } else if (t === "difficult") {
            ctx.fillStyle = "rgba(180, 83, 9, 0.16)";
            ctx.fillRect(px + 2, py + 2, TILE - 4, TILE - 4);
            ctx.strokeStyle = "rgba(245, 158, 11, 0.28)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(px + 12, py + TILE - 12);
            ctx.lineTo(px + TILE - 12, py + 12);
            ctx.stroke();
          } else if (t === "exit") {
            ctx.fillStyle = "rgba(16, 185, 129, 0.26)";
            ctx.fillRect(px + 3, py + 3, TILE - 6, TILE - 6);
            ctx.strokeStyle = "rgba(52, 211, 153, 0.85)";
            ctx.lineWidth = 2;
            ctx.strokeRect(px + 4, py + 4, TILE - 8, TILE - 8);
            ctx.fillStyle = "#a7f3d0";
            ctx.font = "bold 11px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("🏃 EXIT", px + TILE / 2, py + TILE / 2);
          }
        }
      }

      // 4. 5e Square Grid Lines
      if (this.showGrid) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
        ctx.lineWidth = 1;
        for (let x = 0; x <= COLS; x++) {
          ctx.beginPath(); ctx.moveTo(x * TILE, 0); ctx.lineTo(x * TILE, H); ctx.stroke();
        }
        for (let y = 0; y <= ROWS; y++) {
          ctx.beginPath(); ctx.moveTo(0, y * TILE); ctx.lineTo(W, y * TILE); ctx.stroke();
        }
      }

      // 5. Hover Tile Highlight + Opportunity Attack warning
      if (this.hoverTile) {
        const { x, y } = this.hoverTile;
        const c = s.reachable?.dist?.[y]?.[x];
        const canMove = s.turn === "hero" && isFinite(c) && c > 0 && c <= s.hero.moveLeft;
        const wasAdj = chebyshev(s.hero.x, s.hero.y, s.enemy.x, s.enemy.y) <= 1;
        const provokesOA = canMove && wasAdj && !s.hero.disengaged && chebyshev(x, y, s.enemy.x, s.enemy.y) > 1;

        ctx.strokeStyle = provokesOA ? "#ef4444" : (canMove ? "#60a5fa" : "rgba(251, 191, 36, 0.65)");
        ctx.lineWidth = 3;
        ctx.strokeRect(x * TILE + 2, y * TILE + 2, TILE - 4, TILE - 4);

        const tType = s.grid[y][x];
        const label = provokesOA
          ? `⚠ OA! (${c}ft)`
          : (canMove ? (tType === "water" ? `Swim ${c}ft` : `Move ${c}ft`) : (tType === "water" ? "Water (Half Move)" : (tType === "cover" ? "Half Cover +2 AC" : (tType === "wall" ? "Impassable" : (tType === "difficult" ? "Difficult (10ft)" : `${distFt(s.hero.x, s.hero.y, x, y)}ft`)))));
        ctx.fillStyle = "rgba(12, 10, 9, 0.85)";
        ctx.fillRect(x * TILE + 2, Math.max(2, y * TILE - 20), TILE - 4, 18);
        ctx.fillStyle = provokesOA ? "#fca5a5" : "#fef3c7";
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, x * TILE + TILE / 2, Math.max(11, y * TILE - 11));
      }

      // 6. Summon Token (if active)
      const ac = this.callbacks?.getActiveCombat ? this.callbacks.getActiveCombat() : null;
      if (ac?.summon) {
        const sx = Math.max(0, s.hero.vx - 0.85) * TILE + TILE / 2;
        const sy = Math.min(ROWS - 1, s.hero.vy + 0.7) * TILE + TILE / 2;
        ctx.save();
        ctx.beginPath();
        ctx.arc(sx, sy, 20, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(88, 28, 135, 0.9)";
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#c084fc";
        ctx.stroke();
        ctx.font = "18px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(ac.summon.icon || "🐾", sx, sy);
        ctx.restore();
      }

      // 7. Hero Token
      const hx = (s.hero.vx + 0.5) * TILE;
      const hy = (s.hero.vy + 0.5) * TILE;
      const hr = 30;
      ctx.save();
      // Active turn pulse ring
      if (s.turn === "hero") {
        const pulse = 3 + Math.sin(now / 260) * 2.5;
        ctx.beginPath();
        ctx.arc(hx, hy, hr + pulse, 0, Math.PI * 2);
        ctx.strokeStyle = s.hero.dodging ? "rgba(251, 191, 36, 0.85)" : "rgba(52, 211, 153, 0.8)";
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(hx, hy, hr, 0, Math.PI * 2);
      ctx.fillStyle = "#1c1917";
      ctx.fill();
      ctx.save();
      ctx.clip();
      const heroImg = s.hero.tokenPath ? getImg(s.hero.tokenPath) : null;
      if (heroImg && heroImg.complete && heroImg.naturalWidth > 0 && !heroImg._failed) {
        ctx.drawImage(heroImg, hx - hr, hy - hr, hr * 2, hr * 2);
      } else {
        ctx.font = "28px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("🛡️", hx, hy);
      }
      ctx.restore();
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#fbbf24";
      ctx.stroke();
      ctx.restore();

      // 8. Enemy Token
      const ex = (s.enemy.vx + 0.5) * TILE;
      const ey = (s.enemy.vy + 0.5) * TILE;
      const er = s.enemy.isBoss ? 35 : 30;
      ctx.save();
      if (s.enemy.isBoss) {
        const bp = 4 + Math.sin(now / 220) * 2.5;
        ctx.beginPath();
        ctx.arc(ex, ey, er + bp, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(239, 68, 68, 0.7)";
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(ex, ey, er, 0, Math.PI * 2);
      const eGrad = ctx.createRadialGradient(ex - 6, ey - 6, 4, ex, ey, er);
      eGrad.addColorStop(0, "#7f1d1d");
      eGrad.addColorStop(1, "#2a0a0a");
      ctx.fillStyle = eGrad;
      ctx.fill();
      const enemyImg = s.enemy.artPath ? getImg(s.enemy.artPath) : null;
      if (enemyImg && enemyImg.complete && enemyImg.naturalWidth > 0 && !enemyImg._failed) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(ex, ey, er - 1, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(enemyImg, ex - er, ey - er, er * 2, er * 2);
        ctx.restore();
      } else {
        ctx.font = s.enemy.isBoss ? "32px sans-serif" : "26px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.enemy.icon, ex, ey);
      }
      ctx.beginPath();
      ctx.arc(ex, ey, er, 0, Math.PI * 2);
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = ac?.stunned > 0 ? "#facc15" : "#ef4444";
      ctx.stroke();
      // Mini Enemy HP bar under token
      if (ac) {
        const hpPct = Math.max(0, Math.min(1, ac.hp / Math.max(1, ac.maxHp)));
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(ex - 28, ey + er + 3, 56, 7);
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(ex - 27, ey + er + 4, Math.round(54 * hpPct), 5);
      }
      ctx.restore();

      // 9. Visual FX (Slash / Beam / Floating Numbers)
      this.fx = this.fx.filter(f => now - f.born < f.dur);
      for (const f of this.fx) {
        const p = (now - f.born) / f.dur;
        ctx.save();
        if (f.type === "beam") {
          ctx.globalAlpha = 1 - p;
          ctx.strokeStyle = f.color;
          ctx.lineWidth = 6 * (1 - p) + 2;
          ctx.beginPath();
          ctx.moveTo(f.x1, f.y1);
          ctx.lineTo(f.x2, f.y2);
          ctx.stroke();
        } else if (f.type === "slash") {
          ctx.globalAlpha = 1 - p;
          ctx.strokeStyle = f.color;
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(f.x2, f.y2, 26 + p * 18, -Math.PI * 0.7, Math.PI * 0.35);
          ctx.stroke();
        } else if (f.type === "float") {
          ctx.globalAlpha = 1 - p * p;
          ctx.font = "bold 18px sans-serif";
          ctx.textAlign = "center";
          ctx.fillStyle = "#000000";
          ctx.fillText(f.text, f.x + 1.5, f.y - p * 36 + 1.5);
          ctx.fillStyle = f.color;
          ctx.fillText(f.text, f.x, f.y - p * 36);
        }
        ctx.restore();
      }
    }
  };

  window.OAKHAVEN.VTT = VTT;
})();
