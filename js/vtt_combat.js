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

  function isWalkable(grid, x, y, blocked) {
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return false;
    const t = grid[y][x];
    if (t === "wall" || t === "cover") return false;
    if (blocked) {
      if (blocked instanceof Set) {
        if (blocked.has(`${x},${y}`)) return false;
      } else if (blocked.x === x && blocked.y === y) {
        return false;
      }
    }
    return true;
  }

  function detectEnemyCount(activeCombat, page) {
    if (!activeCombat || activeCombat.isBoss) return 1;
    const name = (activeCombat.name || "").trim();
    const lowName = name.toLowerCase();
    const text = `${name} ${activeCombat.desc || ""} ${(page?.text || "").slice(0, 260)}`.toLowerCase();

    // Explicit pair/group keywords
    if (/\b(four|4)\s+[a-z-]+/.test(text) && !/\b(four|4)\s+(feet|ft|hours|days|turns|gp|gold|hp|mp|pages|pillars|torches|doors)\b/.test(text)) {
      if (/[a-z]+s\b/.test(lowName) && !/(ss|us|is|os)$/.test(lowName)) return 3;
    }
    if (/\b(three|3)\s+(snarling|hooded|greengloss|giant|fierce|skeletal|armed|prowling|cloaked|goblin|bandit|wolf|wolves|spider|crab|rat|cultist|guard|raider|scout|cutthroat|skeleton|zombie|ghoul|hound|bat|raven|mephit|assassin|sentinel|zealot|knight|mage|wraith|spirit|stalker|husk)/.test(text)) return 3;
    if (/\b(two|2|pair of|twin)\s+/.test(text)) return 2;

    // Plural enemy group name (e.g. "Saltfang Reef-Stalkers", "Oubliette Shadow-Husks", "Marblehead Cliff Crabs")
    if (/\b(twins|pair)\b/.test(lowName)) return 2;
    if (/\b(pack|swarm|band|crew|gang|patrol|trio|choir|raiders|scouts|guards|cutthroats|stalkers|crabs|whelplings|husks|hounds|sentinels|zealots|spiders|bats|ravens|mephits|assassins|goblins|kobolds|bandits|wolves|skeletons|zombies|ghouls|cultists|hunters|wardens|knights|spriggans|thralls|warriors|archers|thugs|pirates|sailors|mercenaries|rats|snakes|vipers|drakes|harpies|gnolls|orcs|trolls|mummies|wights|ghosts|shadows)\b/.test(lowName)) {
      if (/\b(three|trio|choir|pack|swarm|band|crew|gang)\b/.test(lowName)) return 3;
      return 2;
    }
    return 1;
  }

  function makeSingularLabel(name, idx, total) {
    if (total <= 1) return name;
    let base = name.replace(/\b(Twins|Pair|Pack|Swarm|Band|Crew|Gang|Trio|Choir)\b/i, "").trim();
    if (/ies$/i.test(base)) base = base.replace(/ies$/i, "y");
    else if (/ves$/i.test(base)) base = base.replace(/ves$/i, "f");
    else if (/s$/i.test(base) && !/(ss|us|is)$/i.test(base)) base = base.slice(0, -1);
    return `${base} #${idx + 1}`;
  }

  function pickEnemySpawns(grid, primarySpawn, heroSpawn, count) {
    const spawns = [{ x: primarySpawn.x, y: primarySpawn.y }];
    if (count <= 1) return spawns;
    const used = new Set([`${primarySpawn.x},${primarySpawn.y}`, `${heroSpawn.x},${heroSpawn.y}`]);
    // Collect candidate dry tiles near primarySpawn, falling back to any walkable tile
    const cands = [];
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const k = `${x},${y}`;
        if (used.has(k)) continue;
        const t = grid[y][x];
        if (t === "wall" || t === "cover" || t === "exit") continue;
        const dPrim = chebyshev(x, y, primarySpawn.x, primarySpawn.y);
        const dHero = chebyshev(x, y, heroSpawn.x, heroSpawn.y);
        if (dHero < 2) continue;
        const waterPen = t === "water" ? 20 : 0;
        cands.push({ x, y, score: dPrim * 4 + Math.abs(dHero - 5) + waterPen });
      }
    }
    cands.sort((a, b) => a.score - b.score);
    for (const c of cands) {
      if (spawns.length >= count) break;
      spawns.push({ x: c.x, y: c.y });
    }
    return spawns;
  }

  function reconstructStepPath(reachable, sx, sy, tx, ty) {
    if (!reachable || !isFinite(reachable.dist?.[ty]?.[tx])) return null;
    const steps = [];
    let cx = tx, cy = ty;
    while (cx !== sx || cy !== sy) {
      const p = reachable.prev?.[cy]?.[cx];
      if (!p) return null;
      const stepCost = reachable.dist[cy][cx] - reachable.dist[p.y][p.x];
      steps.unshift({ x: cx, y: cy, stepCost });
      cx = p.x; cy = p.y;
    }
    return steps;
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

  // Dijkstra shortest path accounting for Difficult Terrain, Water, Flying & Skills
  function computeReachable(grid, startX, startY, maxFt, blockedPos, opts = {}) {
    const isAquatic = typeof opts === "boolean" ? opts : !!opts.isAquatic;
    const flies = typeof opts === "object" && !!opts.flies;
    const ignoreDifficult = typeof opts === "object" && !!opts.ignoreDifficult;
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
        if (dx !== 0 && dy !== 0) {
          if (grid[cur.y][nx] === "wall" && grid[ny][cur.x] === "wall") continue;
        }
        const tileType = grid[ny][nx];
        const inDiffZone = VTT.state?.zones?.some(z => z.difficult && z.tiles.has(`${nx},${ny}`));
        const isSlow = !flies && (
          ((tileType === "difficult" || inDiffZone) && !ignoreDifficult) ||
          (tileType === "water" && !isAquatic)
        );
        const stepCost = isSlow ? 10 : 5;
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

      const enemyCount = detectEnemyCount(activeCombat, page);
      const spawns = pickEnemySpawns(grid, built.enemySpawn, built.heroSpawn, enemyCount);
      const artPath = window.OAKHAVEN?.monsterArt?.byName?.[activeCombat.name] || null;
      const icon = pickEnemyIcon(activeCombat);
      const isRanged = isRangedEnemy(activeCombat);
      const isAquatic = isAquaticEnemy(activeCombat);
      const totalHp = activeCombat.maxHp;
      const basePerHp = Math.max(4, Math.floor(totalHp / spawns.length));
      const perEnemyDmg = Math.max(2, Math.round((activeCombat.dmg || 4) / Math.sqrt(spawns.length)));

      const enemies = spawns.map((sp, i) => {
        const hpShare = (i === spawns.length - 1) ? Math.max(4, totalHp - basePerHp * (spawns.length - 1)) : basePerHp;
        return {
          id: i,
          name: makeSingularLabel(activeCombat.name, i, spawns.length),
          x: sp.x, y: sp.y,
          vx: sp.x, vy: sp.y,
          hp: hpShare,
          maxHp: hpShare,
          dmg: perEnemyDmg,
          speed: enemySpeed,
          isRanged,
          isAquatic,
          icon,
          artPath,
          isBoss: !!activeCombat.isBoss,
          reactionUsed: false,
          rooted: 0
        };
      });

      const vttState = {
        biome,
        mapUrl: mapInfo.url,
        mapLabel: mapInfo.label,
        hasRealMapGrid: built.hasRealMapGrid,
        grid,
        round: 1,
        turn: heroInit >= enemyInit ? "hero" : "enemy",
        moving: false,
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
          skills: new Set(heroState?.skills || []),
          className: (heroState?.className || heroState?.cls || "").toLowerCase(),
          tokenPath: callbacks?.getHeroTokenPath ? callbacks.getHeroTokenPath() : null
        },
        allies: [], // player-controlled summoned creature tokens!
        activeAllyIdx: -1, // -1 = Hero, >=0 = summoned ally index
        enemies,
        selectedEnemyIdx: 0,
        enemy: enemies[0],
        weapon: getHeroWeaponProfile(heroState, itemsDb),
        zones: [], // persistent AoE spell hazard zones: [{ tiles: Set, hazard, label, dmg, turns, difficult, color }]
        targetMode: null, // { type: "aoe"|"teleport", spell, rangeFt, radiusSq, color, onConfirm }
        reachable: null
      };

      if (artPath) getImg(artPath);
      activeCombat.vtt = vttState;
      this.state = vttState;
      this.recomputeHeroReachable();
      this.active = true;
      this.fx = [];

      const countNote = enemies.length > 1 ? ` (${enemies.length} foes on the battlefield!)` : "";
      activeCombat.log.unshift(
        `🎲 Initiative: You ${heroInit} (${heroInitRoll}+${heroInitMod}) vs ${activeCombat.name}${countNote} ${enemyInit} (${enemyInitRoll}+${enemyInitMod}) — ${vttState.turn === "hero" ? "Your Turn!" : `Enemies act first!`}`
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
      canvas.addEventListener("contextmenu", (e) => {
        if (this.active && this.state?.targetMode) {
          e.preventDefault();
          this.cancelTargetMode();
        }
      });
    },

    getLivingEnemies() {
      if (!this.state) return [];
      return this.state.enemies.filter(e => e.hp > 0);
    },

    getSelectedEnemy() {
      const s = this.state;
      if (!s) return null;
      let sel = s.enemies[s.selectedEnemyIdx];
      if (!sel || sel.hp <= 0) {
        const idx = s.enemies.findIndex(e => e.hp > 0);
        if (idx >= 0) {
          s.selectedEnemyIdx = idx;
          sel = s.enemies[idx];
        } else {
          sel = s.enemies[0];
        }
      }
      s.enemy = sel;
      return sel;
    },

    getActiveUnit() {
      const s = this.state;
      if (!s) return null;
      if (s.activeAllyIdx >= 0) {
        const a = s.allies[s.activeAllyIdx];
        if (a && a.hp > 0) return a;
        s.activeAllyIdx = -1;
      }
      return s.hero;
    },

    getLivingAllies() {
      if (!this.state) return [];
      return (this.state.allies || []).filter(a => a.hp > 0);
    },

    selectUnit(allyIdx = -1) {
      const s = this.state;
      if (!s) return;
      if (allyIdx >= 0 && (!s.allies[allyIdx] || s.allies[allyIdx].hp <= 0)) allyIdx = -1;
      s.activeAllyIdx = allyIdx;
      this.recomputeHeroReachable();
      const u = this.getActiveUnit();
      if (u) this.spawnFloat(u.x, u.y, allyIdx === -1 ? "🛡️ HERO" : `${u.icon} READY`, "#34d399");
      if (this.callbacks?.onStateChange) this.callbacks.onStateChange();
    },

    spawnAlly(keyOrTpl, custom = null) {
      const s = this.state;
      if (!s) return null;
      const bestiary = window.OAKHAVEN?.summonBestiary || {};
      const base = (typeof keyOrTpl === "string" ? bestiary[keyOrTpl] : keyOrTpl) || bestiary.wolf || {
        name: "Summoned Companion", icon: "🐾", hp: 24, ac: 13, speed: 30, atk: 5, dmgDice: "2d6", dmgBonus: 2, dmgType: "physical", rangeFt: 5
      };
      const cfg = Object.assign({}, base, custom || {});
      const blocked = this.getBlockedSet(null);
      // Find nearest open square to Hero
      let spot = null, bestD = Infinity;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (!isWalkable(s.grid, x, y, blocked)) continue;
          const d = chebyshev(x, y, s.hero.x, s.hero.y);
          if (d > 0 && d < bestD) { bestD = d; spot = { x, y }; }
        }
      }
      if (!spot) return null;
      const ally = {
        id: s.allies.length,
        isAlly: true,
        name: cfg.name,
        icon: cfg.icon || "🐾",
        artPath: cfg.artPath || null,
        x: spot.x, y: spot.y,
        vx: spot.x, vy: spot.y,
        hp: cfg.hp || 24,
        maxHp: cfg.hp || 24,
        ac: cfg.ac || 13,
        speed: cfg.speed || 30,
        moveLeft: cfg.speed || 30,
        actionUsed: false,
        atk: cfg.atk || 5,
        dmgDice: cfg.dmgDice || "2d6",
        dmgBonus: cfg.dmgBonus || 2,
        dmgType: cfg.dmgType || "physical",
        rangeFt: cfg.rangeFt || 5,
        flies: !!cfg.flies,
        stunChance: cfg.stunChance || 0,
        chillTurns: cfg.chillTurns || 0,
        rootTurns: cfg.rootTurns || 0,
        pushFt: cfg.pushFt || 0,
        undeadDouble: !!cfg.undeadDouble,
        dot: cfg.dot || null,
        desc: cfg.desc || ""
      };
      if (ally.artPath) getImg(ally.artPath);
      s.allies.push(ally);
      this.spawnRingFx(ally.x, ally.y, 1, "#34d399");
      this.spawnFloat(ally.x, ally.y, `${ally.icon} ${ally.name}!`, "#6ee7b7");
      this.recomputeHeroReachable();
      return ally;
    },

    getBlockedSet(excludeUnit) {
      const s = this.state;
      const set = new Set();
      if (!s) return set;
      if (excludeUnit !== s.hero) set.add(`${s.hero.x},${s.hero.y}`);
      for (const a of (s.allies || [])) {
        if (a.hp > 0 && a !== excludeUnit) set.add(`${a.x},${a.y}`);
      }
      for (const e of s.enemies) {
        if (e.hp > 0 && e !== excludeUnit) set.add(`${e.x},${e.y}`);
      }
      return set;
    },

    recomputeHeroReachable() {
      const s = this.state;
      if (!s) return;
      const u = this.getActiveUnit();
      if (!u) return;
      const opts = u.isAlly
        ? { flies: !!u.flies, isAquatic: !!u.flies }
        : { isAquatic: s.hero.skills?.has("Athletics"), ignoreDifficult: s.hero.skills?.has("Survival") };
      s.reachable = computeReachable(s.grid, u.x, u.y, u.moveLeft, this.getBlockedSet(u), opts);
    },

    applyDamageToEnemy(enemyObj, dmg, activeCombat) {
      const s = this.state;
      if (!s || !enemyObj) return 0;
      const dealt = Math.max(0, dmg);
      enemyObj.hp = Math.max(0, enemyObj.hp - dealt);
      if (enemyObj.hp <= 0) {
        this.spawnFloat(enemyObj.x, enemyObj.y, "💀 SLAIN!", "#fca5a5");
        if (s.enemies.length > 1 && activeCombat) {
          activeCombat.log.unshift(`💀 ${enemyObj.name} falls!`);
        }
      }
      if (activeCombat) {
        activeCombat.hp = s.enemies.reduce((sum, e) => sum + Math.max(0, e.hp), 0);
      }
      this.getSelectedEnemy();
      this.recomputeHeroReachable();
      return dealt;
    },

    applyDamageToSelected(dmg, activeCombat) {
      return this.applyDamageToEnemy(this.getSelectedEnemy(), dmg, activeCombat);
    },

    // Keep individual enemy HP synced if any ability/bomb/DoT/summon reduced activeCombat.hp directly
    syncHpDelta(activeCombat) {
      const s = this.state;
      if (!s || !activeCombat) return;
      const sum = s.enemies.reduce((acc, e) => acc + Math.max(0, e.hp), 0);
      let diff = sum - Math.max(0, activeCombat.hp);
      if (diff <= 0) return;
      while (diff > 0) {
        const tgt = this.getSelectedEnemy();
        if (!tgt || tgt.hp <= 0) break;
        const take = Math.min(tgt.hp, diff);
        tgt.hp -= take;
        diff -= take;
        if (tgt.hp <= 0) {
          this.spawnFloat(tgt.x, tgt.y, "💀 SLAIN!", "#fca5a5");
          if (s.enemies.length > 1) activeCombat.log.unshift(`💀 ${tgt.name} falls!`);
        }
      }
      activeCombat.hp = s.enemies.reduce((acc, e) => acc + Math.max(0, e.hp), 0);
      this.getSelectedEnemy();
      this.recomputeHeroReachable();
    },

    getEnemiesInTiles(tiles) {
      const set = new Set(tiles.map(t => `${t.x},${t.y}`));
      return this.getLivingEnemies().filter(e => set.has(`${e.x},${e.y}`));
    },

    startTargetMode(cfg) {
      if (!this.active || !this.state) return false;
      this.state.targetMode = cfg;
      this.render();
      return true;
    },

    cancelTargetMode() {
      if (!this.state) return;
      this.state.targetMode = null;
      this.render();
    },

    getAoeTiles(cx, cy, radiusSq) {
      const tiles = [];
      for (let y = Math.max(0, cy - radiusSq); y <= Math.min(ROWS - 1, cy + radiusSq); y++) {
        for (let x = Math.max(0, cx - radiusSq); x <= Math.min(COLS - 1, cx + radiusSq); x++) {
          if (chebyshev(cx, cy, x, y) <= radiusSq && this.state.grid[y][x] !== "wall") {
            tiles.push({ x, y });
          }
        }
      }
      return tiles;
    },

    addHazardZone(tiles, aoeCfg, label) {
      if (!this.state || !aoeCfg) return;
      const colorMap = {
        fire: "rgba(249, 115, 22, 0.34)",
        oil: "rgba(234, 88, 12, 0.42)",
        frost: "rgba(56, 189, 248, 0.34)",
        acid: "rgba(132, 204, 22, 0.34)",
        poison: "rgba(34, 197, 94, 0.32)",
        web: "rgba(226, 232, 240, 0.32)",
        darkness: "rgba(88, 28, 135, 0.45)",
        radiant: "rgba(250, 204, 21, 0.32)"
      };
      this.state.zones.push({
        tiles: new Set(tiles.map(t => `${t.x},${t.y}`)),
        hazard: aoeCfg.hazard || "fire",
        label: aoeCfg.label || label || "Spell Zone",
        dmg: aoeCfg.hazardDmg || 0,
        turns: aoeCfg.turns || 3,
        difficult: !!aoeCfg.difficult,
        color: colorMap[aoeCfg.hazard] || "rgba(249, 115, 22, 0.34)"
      });
      this.recomputeHeroReachable();
    },

    tickZones(activeCombat) {
      const s = this.state;
      if (!s || !s.zones.length) return;
      for (const z of s.zones) {
        for (const e of this.getLivingEnemies()) {
          if (z.dmg > 0 && z.tiles.has(`${e.x},${e.y}`) && e.hp > 0) {
            this.applyDamageToEnemy(e, z.dmg, activeCombat);
            this.spawnFloat(e.x, e.y, `🔥 -${z.dmg} ${z.label}`, "#fb923c");
            activeCombat.log.unshift(`🔥 ${e.name} stands in ${z.label} and suffers ${z.dmg} dmg!`);
          }
        }
        z.turns--;
      }
      s.zones = s.zones.filter(z => z.turns > 0);
    },

    displaceEnemy(ft, isPull = false, targetEnemy = null) {
      const s = this.state;
      const e = targetEnemy || this.getSelectedEnemy();
      if (!s || !e || !ft) return 0;
      const steps = Math.max(1, Math.floor(ft / FT_PER_SQ));
      let moved = 0;
      const blocked = this.getBlockedSet(e);
      for (let i = 0; i < steps; i++) {
        const dx = Math.sign(isPull ? (s.hero.x - e.x) : (e.x - s.hero.x));
        const dy = Math.sign(isPull ? (s.hero.y - e.y) : (e.y - s.hero.y));
        const nx = e.x + dx, ny = e.y + dy;
        if (!isWalkable(s.grid, nx, ny, blocked)) break;
        e.x = nx; e.y = ny;
        moved += FT_PER_SQ;
      }
      if (moved > 0) {
        this.spawnFloat(e.x, e.y, isPull ? `PULLED ${moved}ft!` : `PUSHED ${moved}ft!`, "#38bdf8");
        this.recomputeHeroReachable();
      }
      return moved;
    },

    // Check which living enemies would get an Opportunity Attack along a path
    findPathOpportunityAttacks(path) {
      const s = this.state;
      const oaSteps = new Set();
      if (!s || !path || !path.length || s.hero.disengaged) return oaSteps;
      let px = s.hero.x, py = s.hero.y;
      const living = this.getLivingEnemies();
      for (let i = 0; i < path.length; i++) {
        const nx = path[i].x, ny = path[i].y;
        for (const e of living) {
          if (!e.reactionUsed && chebyshev(px, py, e.x, e.y) <= 1 && chebyshev(nx, ny, e.x, e.y) > 1) {
            oaSteps.add(i);
          }
        }
        px = nx; py = ny;
      }
      return oaSteps;
    },

    // Move Active Unit (Hero or Summoned Ally) space-by-space along the path, triggering mid-path Opportunity Attacks!
    walkHeroPath(path, onComplete) {
      const s = this.state;
      const unit = this.getActiveUnit();
      if (!s || !unit || !path || !path.length) {
        if (onComplete) onComplete();
        return;
      }
      s.moving = true;
      let idx = 0;
      const stepNext = () => {
        if (!this.active || !this.state || (unit.isAlly && unit.hp <= 0)) {
          if (this.state) this.state.moving = false;
          return;
        }
        if (idx >= path.length) {
          s.moving = false;
          this.recomputeHeroReachable();
          if (this.callbacks?.onStateChange) this.callbacks.onStateChange();
          if (onComplete) onComplete();
          return;
        }
        const prevX = unit.x, prevY = unit.y;
        const step = path[idx++];

        // 5e Opportunity Attack check on THIS EXACT STEP against every living enemy
        if (!unit.disengaged && this.callbacks?.triggerOpportunityAttack) {
          for (const e of this.getLivingEnemies()) {
            if (!e.reactionUsed && chebyshev(prevX, prevY, e.x, e.y) <= 1 && chebyshev(step.x, step.y, e.x, e.y) > 1) {
              e.reactionUsed = true;
              this.callbacks.triggerOpportunityAttack(e, unit.isAlly ? unit : null);
              if (!this.active || (unit.isAlly && unit.hp <= 0)) {
                if (this.state) this.state.moving = false;
                return;
              }
            }
          }
        }

        unit.x = step.x;
        unit.y = step.y;
        unit.moveLeft = Math.max(0, unit.moveLeft - step.stepCost);
        this.spawnFloat(step.x, step.y, `-${step.stepCost}ft`, "#93c5fd");

        if (!unit.isAlly && s.grid[step.y][step.x] === "exit" && this.callbacks?.onStepExit) {
          s.moving = false;
          this.callbacks.onStepExit();
          return;
        }

        if (this.callbacks?.onStateChange) this.callbacks.onStateChange();
        setTimeout(stepNext, 135);
      };
      stepNext();
    },

    handleTileClick(tx, ty) {
      const s = this.state;
      if (!s || s.turn !== "hero" || s.moving) return;

      // Handle interactive AoE or Teleport target mode first!
      if (s.targetMode) {
        const tm = s.targetMode;
        const dFt = distFt(s.hero.x, s.hero.y, tx, ty);
        if (dFt > (tm.rangeFt || 30)) return;
        if (tm.type === "teleport") {
          if (!isWalkable(s.grid, tx, ty, this.getBlockedSet(s.hero))) return;
          const ox = s.hero.x, oy = s.hero.y;
          s.hero.x = tx; s.hero.y = ty;
          s.hero.vx = tx; s.hero.vy = ty;
          s.targetMode = null;
          this.recomputeHeroReachable();
          this.spawnAttackFx(ox, oy, tx, ty, "#c084fc", true);
          this.spawnFloat(tx, ty, "✨ BLINK!", "#e879f9");
          if (tm.onConfirm) tm.onConfirm({ x: tx, y: ty, hitEnemies: [], hitEnemy: false, tiles: [] });
          return;
        }
        if (tm.type === "aoe") {
          const tiles = this.getAoeTiles(tx, ty, tm.radiusSq || 1);
          const hitEnemies = this.getEnemiesInTiles(tiles);
          s.targetMode = null;
          this.spawnAttackFx(s.hero.x, s.hero.y, tx, ty, "#fb923c", true);
          if (tm.onConfirm) tm.onConfirm({ x: tx, y: ty, hitEnemies, hitEnemy: hitEnemies.length > 0, tiles });
          return;
        }
      }

      // Clicking Hero token -> switch control to Hero!
      if (tx === s.hero.x && ty === s.hero.y && s.activeAllyIdx !== -1) {
        this.selectUnit(-1);
        return;
      }

      // Clicking a living Summoned Ally token -> switch control to that Ally!
      const clickedAllyIdx = (s.allies || []).findIndex(a => a.hp > 0 && a.x === tx && a.y === ty);
      if (clickedAllyIdx >= 0) {
        this.selectUnit(clickedAllyIdx);
        return;
      }

      // Clicking a living enemy token -> select it (or attack with Active Unit if already selected!)
      const clickedIdx = s.enemies.findIndex(e => e.hp > 0 && e.x === tx && e.y === ty);
      if (clickedIdx >= 0) {
        if (s.selectedEnemyIdx !== clickedIdx) {
          s.selectedEnemyIdx = clickedIdx;
          s.enemy = s.enemies[clickedIdx];
          this.spawnFloat(tx, ty, "🎯 TARGET", "#fbbf24");
          if (this.callbacks?.onStateChange) this.callbacks.onStateChange();
          return;
        }
        if (this.callbacks?.onClickEnemy) this.callbacks.onClickEnemy();
        return;
      }

      // Clicking reachable square -> walk Active Unit space-by-space along shortest path!
      const unit = this.getActiveUnit();
      const path = reconstructStepPath(s.reachable, unit.x, unit.y, tx, ty);
      if (!path || !path.length) return;
      this.walkHeroPath(path);
    },

    // Auto-step hero into melee reach of selected enemy (returns path or immediate ok)
    tryAutoApproach(reachFt) {
      const s = this.state;
      const target = this.getSelectedEnemy();
      if (!s || !target) return { ok: true, moved: 0, path: [] };
      const curDist = distFt(s.hero.x, s.hero.y, target.x, target.y);
      if (curDist <= reachFt) return { ok: true, moved: 0, path: [] };

      const reachSq = Math.max(1, Math.floor(reachFt / FT_PER_SQ));
      let best = null;
      let bestCost = Infinity;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (chebyshev(x, y, target.x, target.y) <= reachSq) {
            const c = s.reachable?.dist?.[y]?.[x];
            if (isFinite(c) && c <= s.hero.moveLeft && c < bestCost) {
              bestCost = c;
              best = { x, y };
            }
          }
        }
      }
      if (!best) return { ok: false, distFt: curDist, moveLeft: s.hero.moveLeft };
      const path = reconstructStepPath(s.reachable, s.hero.x, s.hero.y, best.x, best.y) || [];
      return { ok: true, moved: bestCost, path };
    },

    // Tactical Actions: Dash, Dodge, Disengage (supports Rogue Cunning Action & Athletics/Stealth!)
    doDash(activeCombat) {
      const s = this.state;
      if (!s || s.turn !== "hero" || s.moving) return false;
      const isRogue = s.hero.className.includes("rogue");
      if (isRogue && !s.hero.bonusUsed) {
        s.hero.bonusUsed = true;
      } else if (!s.hero.actionUsed) {
        s.hero.actionUsed = true;
      } else {
        return false;
      }
      const bonusSpd = s.hero.skills?.has("Athletics") ? 5 : 0;
      const gain = s.hero.speed + bonusSpd;
      s.hero.moveLeft += gain;
      this.recomputeHeroReachable();
      this.spawnFloat(s.hero.x, s.hero.y, `DASH +${gain}ft`, "#38bdf8");
      activeCombat.log.unshift(`💨 [${isRogue ? "CUNNING DASH • Bonus" : "DASH"}] Sprint forward (+${gain} ft movement${bonusSpd ? ", Athletics +5ft" : ""})!`);
      this.updateHud(activeCombat);
      return true;
    },

    doDodge(activeCombat) {
      const s = this.state;
      if (!s || s.turn !== "hero" || s.moving || s.hero.actionUsed) return false;
      s.hero.actionUsed = true;
      s.hero.dodging = true;
      this.spawnFloat(s.hero.x, s.hero.y, "DODGING!", "#fbbf24");
      activeCombat.log.unshift(`🛡️ [DODGE] You focus on evasion — enemy attacks suffer Disadvantage (-3 ATK) until your next turn!`);
      this.updateHud(activeCombat);
      return true;
    },

    doDisengage(activeCombat) {
      const s = this.state;
      if (!s || s.turn !== "hero" || s.moving) return false;
      const isRogue = s.hero.className.includes("rogue");
      if (isRogue && !s.hero.bonusUsed) {
        s.hero.bonusUsed = true;
      } else if (!s.hero.actionUsed) {
        s.hero.actionUsed = true;
      } else {
        return false;
      }
      s.hero.disengaged = true;
      const hasStealth = s.hero.skills?.has("Stealth");
      if (hasStealth && this.callbacks?.grantStealthEvade) this.callbacks.grantStealthEvade();
      this.spawnFloat(s.hero.x, s.hero.y, hasStealth ? "SLIP AWAY (+2 AC)" : "DISENGAGE", "#34d399");
      activeCombat.log.unshift(`🦶 [${isRogue ? "CUNNING DISENGAGE • Bonus" : "DISENGAGE"}] Safe movement (no Opportunity Attacks${hasStealth ? " + Stealth Evade +2 AC" : ""})!`);
      this.updateHud(activeCombat);
      return true;
    },

    // Start Hero's new turn (refreshes Hero + all living Summoned Allies!)
    beginHeroTurn(activeCombat) {
      const s = this.state;
      if (!s) return;
      s.turn = "hero";
      s.moving = false;
      s.round++;
      s.hero.moveLeft = s.hero.speed;
      s.hero.actionUsed = false;
      s.hero.bonusUsed = false;
      s.hero.dodging = false;
      s.hero.disengaged = false;
      for (const a of (s.allies || [])) {
        if (a.hp > 0) {
          a.moveLeft = a.speed;
          a.actionUsed = false;
        }
      }
      this.getSelectedEnemy();
      this.recomputeHeroReachable();
      this.updateHud(activeCombat);
    },

    // Move a SINGLE enemy tactically on the grid during its individual turn
    moveSingleEnemyAI(e, activeCombat) {
      const s = this.state;
      if (!s || !e || e.hp <= 0) return { canAttack: false, isRanged: false, movedFt: 0, hasHalfCover: false };
      s.turn = "enemy";
      e.reactionUsed = false; // 5e rule: creature regains Reaction at start of its turn!
      const curDist = distFt(e.x, e.y, s.hero.x, s.hero.y);
      const enemyRange = e.isRanged ? 45 : 5;
      const los = checkLineAndCover(s.grid, e.x, e.y, s.hero.x, s.hero.y);
      const blocked = this.getBlockedSet(e);

      if (activeCombat.rooted > 0 || e.rooted > 0) {
        this.spawnFloat(e.x, e.y, "❄️ ROOTED (0ft)", "#38bdf8");
        return { canAttack: curDist <= enemyRange && !los.blocked, isRanged: e.isRanged && curDist > 5, movedFt: 0, rooted: true, hasHalfCover: curDist > 5 && los.halfCover };
      }

      if (curDist <= enemyRange && !los.blocked) {
        if (e.isRanged && curDist <= 5) {
          const reach = computeReachable(s.grid, e.x, e.y, 15, blocked, !!e.isAquatic);
          let best = null, bestD = curDist;
          for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
              if (isFinite(reach.dist[y][x]) && reach.dist[y][x] > 0) {
                const d = distFt(x, y, s.hero.x, s.hero.y);
                const l2 = checkLineAndCover(s.grid, x, y, s.hero.x, s.hero.y);
                if (!l2.blocked && d > bestD && d <= 35) { bestD = d; best = { x, y, c: reach.dist[y][x] }; }
              }
            }
          }
          if (best) {
            e.x = best.x; e.y = best.y;
            const l3 = checkLineAndCover(s.grid, e.x, e.y, s.hero.x, s.hero.y);
            return { canAttack: true, isRanged: true, movedFt: best.c, hasHalfCover: l3.halfCover };
          }
        }
        return { canAttack: true, isRanged: e.isRanged && curDist > 5, movedFt: 0, hasHalfCover: curDist > 5 && los.halfCover };
      }

      const reach = computeReachable(s.grid, e.x, e.y, e.speed, blocked, !!e.isAquatic);
      let best = null, bestScore = Infinity;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (!isFinite(reach.dist[y][x])) continue;
          const d = distFt(x, y, s.hero.x, s.hero.y);
          const l2 = checkLineAndCover(s.grid, x, y, s.hero.x, s.hero.y);
          const targetD = e.isRanged ? 25 : 5;
          const score = Math.abs(d - targetD) + (l2.blocked ? 100 : 0);
          if (score < bestScore) {
            bestScore = score;
            best = { x, y, c: reach.dist[y][x], d, blocked: l2.blocked, halfCover: l2.halfCover };
          }
        }
      }

      if (best && (best.x !== e.x || best.y !== e.y)) {
        e.x = best.x; e.y = best.y;
        const canAtk = best.d <= enemyRange && !best.blocked;
        if (!canAtk) {
          const reach2 = computeReachable(s.grid, e.x, e.y, e.speed, this.getBlockedSet(e), !!e.isAquatic);
          let dashBest = null, dashScore = best.d;
          for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
              if (!isFinite(reach2.dist[y][x])) continue;
              const d2 = distFt(x, y, s.hero.x, s.hero.y);
              if (d2 < dashScore) { dashScore = d2; dashBest = { x, y, c: reach2.dist[y][x] }; }
            }
          }
          if (dashBest) {
            e.x = dashBest.x; e.y = dashBest.y;
            this.spawnFloat(e.x, e.y, "DASH!", "#f87171");
            return { canAttack: false, isRanged: false, movedFt: best.c + dashBest.c, dashed: true, hasHalfCover: false };
          }
        }
        return { canAttack: canAtk, isRanged: e.isRanged && best.d > 5, movedFt: best.c, hasHalfCover: best.d > 5 && best.halfCover };
      }

      return { canAttack: curDist <= enemyRange && !los.blocked, isRanged: e.isRanged && curDist > 5, movedFt: 0, hasHalfCover: los.halfCover };
    },

    moveEnemyAI(activeCombat) {
      return this.moveSingleEnemyAI(this.getSelectedEnemy(), activeCombat);
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
    spawnRingFx(gx, gy, radiusSq = 1, color = "#38bdf8") {
      this.fx.push({
        type: "ring",
        x: (gx + 0.5) * TILE, y: (gy + 0.5) * TILE,
        maxR: (radiusSq + 0.6) * TILE,
        color, born: performance.now(), dur: 520
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

      // Update Active Unit Switcher Bar (Hero + Living Summoned Allies)
      const sw = document.getElementById("vtt-unit-switcher");
      if (sw) {
        const livingAllies = this.getLivingAllies();
        if (livingAllies.length === 0) {
          sw.classList.add("hidden");
          sw.innerHTML = "";
        } else {
          sw.classList.remove("hidden");
          const heroSel = s.activeAllyIdx === -1;
          let html = `<span class="text-[10px] uppercase tracking-wider text-stone-400 font-bold">Control:</span>`;
          html += `<button type="button" data-vtt-unit="-1" class="px-2 py-0.5 rounded text-[11px] font-bold border ${heroSel ? "bg-amber-900 border-amber-400 text-amber-100" : "bg-stone-900 border-stone-700 text-stone-300 hover:border-amber-500/60"}">🛡️ Hero (${s.hero.moveLeft}ft)</button>`;
          for (const a of livingAllies) {
            const aSel = s.activeAllyIdx === a.id;
            html += `<button type="button" data-vtt-unit="${a.id}" class="px-2 py-0.5 rounded text-[11px] font-bold border ${aSel ? "bg-emerald-900 border-emerald-400 text-emerald-100" : "bg-stone-900 border-stone-700 text-stone-300 hover:border-emerald-500/60"}">${a.icon} ${a.name} (${a.hp}/${a.maxHp} HP • ${a.moveLeft}ft${a.actionUsed ? " • Acted" : ""})</button>`;
          }
          sw.innerHTML = html;
          sw.querySelectorAll("[data-vtt-unit]").forEach(btn => {
            btn.onclick = () => this.selectUnit(Number(btn.dataset.vttUnit));
          });
        }
      }

      const btnDash = document.getElementById("btn-vtt-dash");
      const btnDodge = document.getElementById("btn-vtt-dodge");
      const btnDis = document.getElementById("btn-vtt-disengage");
      const btnEnd = document.getElementById("btn-vtt-end-turn");
      const isRogue = s.hero.className.includes("rogue");
      const actDisabled = s.turn !== "hero" || s.hero.actionUsed;
      const cunningDisabled = s.turn !== "hero" || (isRogue ? (s.hero.bonusUsed && s.hero.actionUsed) : s.hero.actionUsed);
      if (btnDash) {
        btnDash.disabled = cunningDisabled;
        btnDash.textContent = isRogue ? "💨 Dash (⚡)" : "💨 Dash";
      }
      if (btnDodge) btnDodge.disabled = actDisabled;
      if (btnDis) {
        btnDis.disabled = cunningDisabled;
        btnDis.textContent = isRogue ? "🦶 Disengage (⚡)" : "🦶 Disengage";
      }
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

      // Smoothly interpolate visual positions for hero, summoned allies & all enemies
      s.hero.vx += (s.hero.x - s.hero.vx) * 0.34;
      s.hero.vy += (s.hero.y - s.hero.vy) * 0.34;
      for (const a of (s.allies || [])) {
        a.vx += (a.x - a.vx) * 0.32;
        a.vy += (a.y - a.vy) * 0.32;
      }
      for (const e of s.enemies) {
        e.vx += (e.x - e.vx) * 0.24;
        e.vy += (e.y - e.vy) * 0.24;
      }

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

      // 4.5 Persistent AoE Spell Hazard Zones (Boiling Oil, Frost Fields, Webs, Acid, etc.)
      if (s.zones && s.zones.length) {
        for (const z of s.zones) {
          for (const key of z.tiles) {
            const [zx, zy] = key.split(",").map(Number);
            const px = zx * TILE, py = zy * TILE;
            ctx.fillStyle = z.color;
            ctx.fillRect(px + 2, py + 2, TILE - 4, TILE - 4);
            ctx.strokeStyle = "rgba(251, 146, 60, 0.75)";
            ctx.lineWidth = 2;
            ctx.strokeRect(px + 3, py + 3, TILE - 6, TILE - 6);
          }
        }
      }

      // 4.6 Interactive AoE / Teleport Targeting Preview
      if (s.targetMode) {
        const tm = s.targetMode;
        // Highlight valid targeting range
        for (let y = 0; y < ROWS; y++) {
          for (let x = 0; x < COLS; x++) {
            if (distFt(s.hero.x, s.hero.y, x, y) <= (tm.rangeFt || 30)) {
              if (tm.type === "teleport" && !isWalkable(s.grid, x, y, s.enemy)) continue;
              ctx.fillStyle = tm.type === "teleport" ? "rgba(192, 132, 252, 0.22)" : "rgba(251, 146, 60, 0.10)";
              ctx.fillRect(x * TILE + 2, y * TILE + 2, TILE - 4, TILE - 4);
            }
          }
        }
        // Preview AoE footprint under hovered square
        if (tm.type === "aoe" && this.hoverTile && distFt(s.hero.x, s.hero.y, this.hoverTile.x, this.hoverTile.y) <= (tm.rangeFt || 30)) {
          const prevTiles = this.getAoeTiles(this.hoverTile.x, this.hoverTile.y, tm.radiusSq || 1);
          for (const pt of prevTiles) {
            ctx.fillStyle = "rgba(249, 115, 22, 0.42)";
            ctx.fillRect(pt.x * TILE + 2, pt.y * TILE + 2, TILE - 4, TILE - 4);
            ctx.strokeStyle = "#fde047";
            ctx.lineWidth = 2.5;
            ctx.strokeRect(pt.x * TILE + 2, pt.y * TILE + 2, TILE - 4, TILE - 4);
          }
        }
        // Top targeting banner
        ctx.fillStyle = "rgba(12, 10, 9, 0.88)";
        ctx.fillRect(14, 10, W - 28, 30);
        ctx.strokeStyle = tm.type === "teleport" ? "#c084fc" : "#fb923c";
        ctx.lineWidth = 2;
        ctx.strokeRect(14, 10, W - 28, 30);
        ctx.fillStyle = "#fef3c7";
        ctx.font = "bold 14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const bannerTxt = tm.type === "teleport"
          ? `✨ ${tm.spellName}: Click any highlighted tile within ${tm.rangeFt}ft to Teleport (Right-click to cancel)`
          : `🎯 ${tm.spellName}: Click a tile within ${tm.rangeFt}ft to place AoE zone (Right-click to cancel)`;
        ctx.fillText(bannerTxt, W / 2, 25);
      }

      // 5. Hover Tile Highlight + Step-by-Step Path Preview & Mid-Path Opportunity Attack Warning
      if (this.hoverTile && !s.targetMode) {
        const { x, y } = this.hoverTile;
        const c = s.reachable?.dist?.[y]?.[x];
        const canMove = s.turn === "hero" && !s.moving && isFinite(c) && c > 0 && c <= s.hero.moveLeft;
        const previewPath = canMove ? reconstructStepPath(s.reachable, s.hero.x, s.hero.y, x, y) : null;
        const oaSteps = previewPath ? this.findPathOpportunityAttacks(previewPath) : new Set();
        const provokesOA = oaSteps.size > 0;

        if (previewPath && previewPath.length) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo((s.hero.x + 0.5) * TILE, (s.hero.y + 0.5) * TILE);
          for (const st of previewPath) ctx.lineTo((st.x + 0.5) * TILE, (st.y + 0.5) * TILE);
          ctx.strokeStyle = provokesOA ? "rgba(239, 68, 68, 0.85)" : "rgba(96, 165, 250, 0.85)";
          ctx.lineWidth = 3;
          ctx.setLineDash([7, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
          previewPath.forEach((st, i) => {
            ctx.beginPath();
            ctx.arc((st.x + 0.5) * TILE, (st.y + 0.5) * TILE, oaSteps.has(i) ? 7 : 4.5, 0, Math.PI * 2);
            ctx.fillStyle = oaSteps.has(i) ? "#ef4444" : "#93c5fd";
            ctx.fill();
          });
          ctx.restore();
        }

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

      // 6. Player-Controlled Summoned Ally Tokens (Bestiary Portraits + Emerald Rings + HP Bars)
      for (const a of (s.allies || [])) {
        if (a.hp <= 0) continue;
        const ax = (a.vx + 0.5) * TILE;
        const ay = (a.vy + 0.5) * TILE;
        const ar = 27;
        const isControlled = (s.activeAllyIdx === a.id);
        ctx.save();
        if (isControlled && s.turn === "hero") {
          const ap = 3 + Math.sin(now / 240) * 2.5;
          ctx.beginPath();
          ctx.arc(ax, ay, ar + ap, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(52, 211, 153, 0.9)";
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(ax, ay, ar, 0, Math.PI * 2);
        ctx.fillStyle = "#064e3b";
        ctx.fill();
        const aImg = a.artPath ? getImg(a.artPath) : null;
        if (aImg && aImg.complete && aImg.naturalWidth > 0 && !aImg._failed) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(ax, ay, ar - 1, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(aImg, ax - ar, ay - ar, ar * 2, ar * 2);
          ctx.restore();
        } else {
          ctx.font = "22px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(a.icon || "🐾", ax, ay);
        }
        ctx.beginPath();
        ctx.arc(ax, ay, ar, 0, Math.PI * 2);
        ctx.lineWidth = 3;
        ctx.strokeStyle = isControlled ? "#6ee7b7" : "#10b981";
        ctx.stroke();
        // Ally HP bar
        const aPct = Math.max(0, Math.min(1, a.hp / Math.max(1, a.maxHp)));
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(ax - 24, ay + ar + 3, 48, 6);
        ctx.fillStyle = "#34d399";
        ctx.fillRect(ax - 23, ay + ar + 4, Math.round(46 * aPct), 4);
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

      // 8. All Living Enemy Tokens (with Target Selection Ring & Individual HP Bars)
      const ac = this.callbacks?.getActiveCombat ? this.callbacks.getActiveCombat() : null;
      const selEnemy = this.getSelectedEnemy();
      for (const e of s.enemies) {
        if (e.hp <= 0) continue;
        const ex = (e.vx + 0.5) * TILE;
        const ey = (e.vy + 0.5) * TILE;
        const er = e.isBoss ? 35 : 29;
        const isSel = (e === selEnemy && s.enemies.length > 1);
        ctx.save();
        if (e.isBoss || isSel) {
          const bp = 4 + Math.sin(now / 220) * 2.5;
          ctx.beginPath();
          ctx.arc(ex, ey, er + bp, 0, Math.PI * 2);
          ctx.strokeStyle = isSel ? "rgba(251, 191, 36, 0.85)" : "rgba(239, 68, 68, 0.7)";
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
        const enemyImg = e.artPath ? getImg(e.artPath) : null;
        if (enemyImg && enemyImg.complete && enemyImg.naturalWidth > 0 && !enemyImg._failed) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(ex, ey, er - 1, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(enemyImg, ex - er, ey - er, er * 2, er * 2);
          ctx.restore();
        } else {
          ctx.font = e.isBoss ? "32px sans-serif" : "25px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(e.icon, ex, ey);
        }
        ctx.beginPath();
        ctx.arc(ex, ey, er, 0, Math.PI * 2);
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = ac?.stunned > 0 ? "#facc15" : (isSel ? "#fbbf24" : "#ef4444");
        ctx.stroke();
        // Number badge if multiple enemies
        if (s.enemies.length > 1) {
          ctx.fillStyle = isSel ? "#fbbf24" : "#991b1b";
          ctx.beginPath();
          ctx.arc(ex + er - 5, ey - er + 5, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = isSel ? "#1c1917" : "#fef2f2";
          ctx.font = "bold 11px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`${e.id + 1}`, ex + er - 5, ey - er + 5);
        }
        // Individual Mini Enemy HP bar under token
        const hpPct = Math.max(0, Math.min(1, e.hp / Math.max(1, e.maxHp)));
        ctx.fillStyle = "rgba(0,0,0,0.8)";
        ctx.fillRect(ex - 28, ey + er + 3, 56, 7);
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(ex - 27, ey + er + 4, Math.round(54 * hpPct), 5);
        ctx.restore();
      }

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
        } else if (f.type === "ring") {
          ctx.globalAlpha = 1 - p;
          ctx.strokeStyle = f.color;
          ctx.lineWidth = 6 * (1 - p) + 2;
          ctx.beginPath();
          ctx.arc(f.x, f.y, 18 + p * f.maxR, 0, Math.PI * 2);
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
