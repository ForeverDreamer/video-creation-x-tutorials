/**
 * demo_3d_montage_flythrough.jsx - 3D card montage fly-through, basic tier (free companion demo).
 * 3D 卡片蒙太奇穿行 · 基础版（免费配套 demo）。
 *
 * Self-contained, zero external dependency. Run it in After Effects to get a wall of cards
 * scattered across 3D depth, surging in along Z while a 3D camera flies straight THROUGH them
 * and lands on a hero title. Change the CONFIG block at the top - card count, layout, camera
 * path, palette - and the whole montage re-lays from one place.
 * 自包含、零外部依赖。在 After Effects 里跑一下，就得到一墙散布 3D 深度的卡片：卡片沿 Z 涌入，
 * 一台 3D 摄像机直接穿过去、落定到 hero 标题。改顶部 CONFIG 块（卡片数 / 布局 / 运镜 / 配色），
 * 整套蒙太奇就从一处重排。
 *
 * How to run / 怎么跑:
 *   (paste into After Effects: File > Scripts > Run Script File)
 *   RUN IN A FRESH / DEDICATED PROJECT: each run auto-clears the WHOLE project (so re-running after
 *   a CONFIG tweak rebuilds clean, no stacked comps / duplicate footage). Do NOT run it in a project
 *   that holds work you want to keep.
 *   在新建 / 专属项目里跑：每次执行会自动清空整个项目（改配置重跑即干净重建），别在有你要保留的工作的项目里跑。
 *
 * Footage / 素材:
 *   Drop free, commercial-OK clips into ./assets/ as 01_card.mp4 ... 09_card.mp4 (see README
 *   for search keywords). MISSING clips fall back to SHAPE placeholder cards, so the montage
 *   ALWAYS renders - you can run it with no footage at all and still see the 3D fly-through.
 *   把免费可商用片段放进 ./assets/，命名 01_card.mp4 ... 09_card.mp4（关键词见 README）。
 *   缺片自动用形状图层占位卡顶上 - 完全没素材也能跑出 3D 穿行结构。
 *
 * What you get here vs the full toolkit / 这里有什么、完整工具链还有什么:
 *   Here  : N 3D cards, Z-surge entrance with auto stagger, a camera fly-through, hero reveal,
 *           soft cast shadows, and ONE CONFIG block + one-word recolor to tweak.
 *   这里  : N 张 3D 卡、沿 Z 涌入 + 自动错开、摄像机穿行、hero 揭示、柔和投射阴影，
 *           一个 CONFIG 块 + 一个词重配色随手调。
 *   Toolkit: a reusable 3D layout engine, a camera fly-through path library (Z push / Y crane /
 *            X dolly / swoop), per-card scatter with seeds, and the probe that catches the silent
 *            "cards still 2D" failure - reusable across any animation, updated every episode.
 *   工具链: 可复用的 3D 布点编排器、摄像机穿行路径库（Z 推进 / Y 升降 / X 横移 / 斜向 swoop）、
 *            带种子的逐卡散布、以及逮住"卡片还是 2D"静默失败的探针 - 能复用到任意动画，每集更新。
 */

// ============================================================================
// CONFIG - the whole montage is re-laid from here / 整段蒙太奇的唯一调参入口
// ============================================================================

// Where the footage clips live, relative to this script's folder / 素材相对本脚本所在文件夹
var ASSET_DIR = (function () {
    try { return File($.fileName).parent.fsName + "/assets/"; } catch (e) { return "assets/"; }
})();

var CONFIG = {
    comp: { name: "Montage_Demo", width: 1920, height: 1080, fps: 30, duration: 7.0 },

    // ONE-WORD RECOLOR: "blue" | "amber" | "teal" | "crimson". Drives the backdrop, the hero
    // title/subtitle, AND the fallback placeholder-card tints - all in one place. Change this one
    // word, re-run, and the whole look recolors.
    // 一键重配色：把这一个词改成 "blue" / "amber" / "teal" / "crimson"，重新运行即可。
    // 它一处控制：浅色接影背景 + hero 标题/副标题 + 占位卡的底色。
    palette: "blue",
    palettes: {
        // Classic tech-launch blue (the canonical look). / 经典科技发布蓝（标准观感）。
        blue: {
            bg: [0.90, 0.91, 0.94],
            title: [0.10, 0.13, 0.20], sub: [0.16, 0.45, 0.82],
            cardTints: [
                [0.20, 0.32, 0.50], [0.16, 0.40, 0.42], [0.34, 0.22, 0.48],
                [0.22, 0.28, 0.44], [0.18, 0.44, 0.31], [0.42, 0.24, 0.36],
                [0.24, 0.34, 0.30], [0.30, 0.26, 0.46], [0.20, 0.38, 0.52]
            ]
        },
        // Warm retro amber (the re-lay shown in the video). / 暖琥珀复古（视频里的重排版）。
        amber: {
            bg: [0.95, 0.93, 0.88],
            title: [0.16, 0.11, 0.06], sub: [0.86, 0.52, 0.16],
            cardTints: [
                [0.50, 0.30, 0.16], [0.46, 0.24, 0.20], [0.40, 0.28, 0.18],
                [0.52, 0.34, 0.20], [0.44, 0.26, 0.22], [0.48, 0.32, 0.14],
                [0.42, 0.22, 0.16], [0.50, 0.28, 0.22], [0.46, 0.30, 0.18]
            ]
        },
        // Cool teal. / 冷青。
        teal: {
            bg: [0.88, 0.93, 0.93],
            title: [0.08, 0.18, 0.18], sub: [0.10, 0.58, 0.58],
            cardTints: [
                [0.12, 0.40, 0.40], [0.16, 0.46, 0.42], [0.10, 0.36, 0.44],
                [0.18, 0.44, 0.38], [0.12, 0.42, 0.46], [0.20, 0.48, 0.40],
                [0.14, 0.38, 0.42], [0.16, 0.44, 0.46], [0.12, 0.40, 0.38]
            ]
        },
        // Deep crimson. / 深绯红。
        crimson: {
            bg: [0.95, 0.90, 0.90],
            title: [0.22, 0.08, 0.10], sub: [0.80, 0.20, 0.28],
            cardTints: [
                [0.50, 0.18, 0.22], [0.46, 0.20, 0.26], [0.52, 0.16, 0.20],
                [0.48, 0.22, 0.24], [0.44, 0.18, 0.28], [0.50, 0.20, 0.22],
                [0.46, 0.16, 0.24], [0.52, 0.22, 0.26], [0.48, 0.18, 0.20]
            ]
        }
    },

    // Soft light backdrop, set DEEP (behind the hero) and 3D so it CATCHES the cards' cast
    // shadows. Its color comes from the palette above. / 浅色接影背景，置最深，3D 接住卡片投影。
    bg: { z: 2600, width: 7000, height: 4000 },

    // N cards: footage clip + the count IS the card count. Add / remove entries to change how
    // many cards. Fallback tint per card comes from the palette. / N 张卡片：条目数=卡片数，增删即可。
    cards: [
        { footage: ASSET_DIR + "01_card.mp4" },
        { footage: ASSET_DIR + "02_card.mp4" },
        { footage: ASSET_DIR + "03_card.mp4" },
        { footage: ASSET_DIR + "04_card.mp4" },
        { footage: ASSET_DIR + "05_card.mp4" },
        { footage: ASSET_DIR + "06_card.mp4" },
        { footage: ASSET_DIR + "07_card.mp4" },
        { footage: ASSET_DIR + "08_card.mp4" },
        { footage: ASSET_DIR + "09_card.mp4" }
    ],

    // NEGATIVE gaps -> cards overlap and cluster toward center (a dense stack the camera punches
    // THROUGH). / 负间距=卡片重叠向中心聚拢，密集"阻挡"层供摄像机穿越。
    grid: { cols: 3, cardW: 540, cardH: 304, gapX: -120, gapY: -90 },

    // Per-card depth + tilt: spread across Z (near->far) and lean each one. / 逐卡景深+倾斜散布。
    depth: { zNear: -400, zFar: 1200, tiltYMax: 12, tiltZMax: 7 },

    // 3D camera dollies forward through the cards (Z push) + subtle X drift, eases to a stop.
    // Reroute the camera here: zoom = lens FOV (LOWER = wide-angle, dramatic depth), endZ = how far
    // it flies through, driftX = sideways sweep. / 3D 摄像机 Z 推进穿过卡片，改这里换运镜：
    // zoom=镜头视野（越小越广角、纵深越夸张），endZ=飞多远穿透，driftX=横移扫幅。
    camera: { startZ: -2600, endZ: 1500, startFrame: 0, endFrame: 200, zoom: 1850, driftX: 40 },

    // Each card surges FORWARD from deeper along Z; reveals spread across the push (auto stagger).
    // 每张卡沿 Z 从深处涌入；揭示铺满整段穿行（自动错开）。
    entrance: { dropDistance: 750, durationFrames: 26, spreadFrames: [6, 128] },

    // Hero title: DEEPEST layer; surges forward (zRush) into place on the landing. Colors come
    // from the palette. / hero 标题：最深层，随运镜涌到位；配色取自 palette。
    hero: {
        title: "ONE COMMAND",
        subtitle: "BUILDS THE MONTAGE",
        titleFont: "ArialMT", titleSize: 92,
        subFont: "ArialMT", subSize: 24,
        z: 2300, zRush: 240, revealStartFrame: 164, revealDurFrame: 30
    },

    // Cards dissolve out as the hero forms (hand-off + clears their shadows). / 卡片在 hero 浮现时溶解。
    cardFade: { startFrame: 166, durFrame: 26 },

    // Parallel light casts each card's soft shadow onto the deep backdrop. / 平行光把卡片软影投到背景。
    shadows: { lightPosition: [860, 380, -2000], intensity: 100, darkness: 50, diffusion: 45 }
};

// ============================================================================
// Inlined helpers (basic tier of common/ utilities) / 内联工具（common/ 基础版）
// ============================================================================

// Resolve the active palette / 取当前配色
function getPalette() {
    return CONFIG.palettes[CONFIG.palette] || CONFIG.palettes.blue;
}

// --- createVideoLayer (basic) -----------------------------------------------
// Import a footage clip and add it as a layer; null if the file is missing. / 导入素材为图层，缺片返回 null。
function createVideoLayer(comp, args) {
    var f = new File(args.videoPath);
    if (!f.exists) { return null; }
    try {
        var footage = app.project.importFile(new ImportOptions(f));
        var layer = comp.layers.add(footage);
        layer.name = args.layerName;
        return layer;
    } catch (e) { return null; }
}

// --- createPlaceholderCard (basic) ------------------------------------------
// Self-contained SHAPE layer (rounded rect, palette-tinted) used when a footage clip is missing,
// so the montage ALWAYS builds with zero assets. A shape layer adds NOTHING to the Project panel
// (unlike a solid, which creates a footage item) and reads cleanly as a placeholder card.
// 缺片时的自包含形状占位卡（圆角矩形 + 配色底色），零素材也能跑；形状层不往 Project 面板塞素材项。
function createPlaceholderCard(comp, args) {
    var sl = comp.layers.addShape();
    sl.name = args.name;
    var grp = sl.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group")
                .property("ADBE Vectors Group");
    var c = args.color;
    var rect = grp.addProperty("ADBE Vector Shape - Rect");
    rect.property("ADBE Vector Rect Size").setValue([args.width, args.height]);
    rect.property("ADBE Vector Rect Roundness").setValue(args.round || 14);
    var fill = grp.addProperty("ADBE Vector Graphic - Fill");   // tinted fill / 底色填充
    fill.property("ADBE Vector Fill Color").setValue([c[0], c[1], c[2], 1]);
    var stroke = grp.addProperty("ADBE Vector Graphic - Stroke"); // subtle lighter edge / 细微亮边
    stroke.property("ADBE Vector Stroke Color").setValue(
        [Math.min(c[0] + 0.18, 1), Math.min(c[1] + 0.18, 1), Math.min(c[2] + 0.18, 1), 1]);
    stroke.property("ADBE Vector Stroke Width").setValue(3);
    return sl;
}

// --- applyEasingToKeyframe (basic) ------------------------------------------
// Easy-ease the keyframe at keyIndex. Temporal ease is logically 1D, BUT After Effects LOCKS the
// ease dimension per property once it is set - so we detect the existing dimension and match it,
// or setTemporalEaseAtKey throws "Value array does not have N elements". (This is the exact footgun
// from the build: setTemporalEaseAtKey on Scale wanted 3 ease elements.)
// 缓动维度逻辑上为 1，但 AE 会按属性"锁定"已设的 ease 维度 -> 先探测现有维度再匹配，
// 否则 setTemporalEaseAtKey 会报"数组没有 N 个元素"。（这正是搭建时踩的坑：Scale 要 3 个 ease 元素。）
function applyEasingToKeyframe(prop, keyIndex, easingType) {
    if (!prop || keyIndex < 1 || keyIndex > prop.numKeys) { return; }
    var dims = 1;
    try {
        var existing = prop.keyInTemporalEase(keyIndex);
        if (existing && existing.length > 0) { dims = existing.length; }
    } catch (e) {}
    var influence = (easingType === "easeIn") ? [33.33, 80]
                  : (easingType === "easeOut") ? [80, 33.33]
                  : [33.33, 33.33];                              // easeInOut (standard Easy Ease)
    var easeIn = new KeyframeEase(0, influence[0]);
    var easeOut = new KeyframeEase(0, influence[1]);
    var inArr = [], outArr = [];
    for (var i = 0; i < dims; i++) { inArr.push(easeIn); outArr.push(easeOut); }
    prop.setTemporalEaseAtKey(keyIndex, inArr, outArr);
}

// --- applyDropShadow (basic) ------------------------------------------------
// Add a Drop Shadow effect via verified matchNames (opacity 0-100 -> 0-255). / 用已验证 matchName 加投影。
function applyDropShadow(layer, args) {
    var c = args || {};
    var distance = (c.distance !== undefined) ? c.distance : 10;
    var softness = (c.softness !== undefined) ? c.softness : 14;
    var opacity = (c.opacity !== undefined) ? c.opacity : 60;
    var direction = (c.direction !== undefined) ? c.direction : 135;
    var shadow = layer.property("ADBE Effect Parade").addProperty("ADBE Drop Shadow");
    try { shadow.property("ADBE Drop Shadow-0002").setValue(opacity * 2.55); } catch (e1) {}
    try { shadow.property("ADBE Drop Shadow-0003").setValue(direction); } catch (e2) {}
    try { shadow.property("ADBE Drop Shadow-0004").setValue(distance); } catch (e3) {}
    try { shadow.property("ADBE Drop Shadow-0005").setValue(softness); } catch (e4) {}
    return shadow;
}

// Easy-ease the keyframe sitting at composition time `time`. / 给落在 time 处的关键帧加缓动。
function easeKeyAtTime(prop, time) {
    for (var k = 1; k <= prop.numKeys; k++) {
        if (Math.abs(prop.keyTime(k) - time) < 0.001) {
            applyEasingToKeyframe(prop, k, "easeInOut");
            return;
        }
    }
}

// ============================================================================
// Montage build steps / 蒙太奇搭建步骤
// ============================================================================

function removeExistingComp(name) {
    for (var i = app.project.items.length; i >= 1; i--) {
        var it = app.project.item(i);
        if (it instanceof CompItem && it.name === name) { it.remove(); }
    }
}

// Clear the whole scene so every run starts clean (standalone demo: after a CONFIG tweak, re-run
// rebuilds from scratch - no stacked comps and no re-imported card footage piling up in the project).
// 每次执行先清空场景（独立 demo：改一处 CONFIG 重跑即从零重建，不堆叠 comp、不累积重复导入的卡片素材）。
function clearScene() {
    for (var i = app.project.numItems; i >= 1; i--) {
        try { app.project.item(i).remove(); } catch (e) {}
    }
}

// Deep 3D backdrop that CATCHES the cards' cast shadows (accepts, doesn't cast). / 接影背景。
function createBackground(comp) {
    var b = CONFIG.bg;
    var bg = comp.layers.addSolid(getPalette().bg, "00_background", b.width, b.height, 1.0);
    bg.threeDLayer = true;
    bg.property("ADBE Transform Group").property("ADBE Position")
        .setValue([comp.width / 2, comp.height / 2, b.z]);
    var mat = bg.property("ADBE Material Options Group");
    try { mat.property("ADBE Casts Shadows").setValue(0); } catch (e1) {}
    try { mat.property("ADBE Accepts Shadows").setValue(1); } catch (e2) {}
    try { mat.property("ADBE Accepts Lights").setValue(1); } catch (e3) {}
    return bg;
}

// Parallel light: casts each card's shadow back onto the deep backdrop. / 平行光投影。
function createShadowLight(comp) {
    var s = CONFIG.shadows;
    var light = comp.layers.addLight("shadow_light", [comp.width / 2, comp.height / 2]);
    try { light.lightType = LightType.PARALLEL; } catch (eT) {}
    light.property("ADBE Transform Group").property("ADBE Position").setValue(s.lightPosition);
    var opt = light.property("ADBE Light Options Group");
    try { opt.property("ADBE Light Intensity").setValue(s.intensity); } catch (e1) {}
    try { opt.property("ADBE Casts Shadows").setValue(1); } catch (e2) {}
    try { opt.property("ADBE Light Shadow Darkness").setValue(s.darkness); } catch (e3) {}
    try { opt.property("ADBE Light Shadow Diffusion").setValue(s.diffusion); } catch (e4) {}
    return light;
}

// Lay the cards in a clustered 3D grid: spread near->far across Z, lean each one, cast/accept
// shadows. Footage fits the card box; a missing clip falls back to a palette-tinted SHAPE card.
// CRITICAL: the cards MUST be 3D layers (threeDLayer=true) or the camera fly-through has NO
// effect - freshly imported footage defaults to 2D, which is the silent failure to watch for.
// 把卡片排成聚拢的 3D 网格：沿 Z 散布、各自倾斜、投/接阴影。footage 适配卡框，缺片回退形状占位卡。
// 🔴 卡片必须是 3D 图层，否则摄像机穿行无效 - 新导入 footage 默认 2D，是要警惕的静默失败。
function layoutCards(comp) {
    var L = CONFIG.grid, D = CONFIG.depth, cards = CONFIG.cards, tints = getPalette().cardTints;
    var n = cards.length;
    var cols = L.cols;
    var rows = Math.ceil(n / cols);
    var stepX = L.cardW + L.gapX;
    var stepY = L.cardH + L.gapY;
    var x0 = comp.width / 2 - (cols - 1) * stepX / 2;
    var y0 = comp.height / 2 - (rows - 1) * stepY / 2;

    var withFootage = 0, fallback = 0;
    var infos = [];

    for (var i = 0; i < n; i++) {
        var card = cards[i];
        var col = i % cols;
        var row = Math.floor(i / cols);
        var x = x0 + col * stepX;
        var y = y0 + row * stepY;
        var pad = (i < 9) ? ("0" + (i + 1)) : ("" + (i + 1));
        var tint = tints[i % tints.length];

        var layer = null;
        var usedFootage = false;
        if (card.footage && new File(card.footage).exists) {
            layer = createVideoLayer(comp, { videoPath: card.footage, layerName: "card_" + pad });
            if (layer && typeof layer.property === "function") { usedFootage = true; }
        }
        if (!layer) {
            layer = createPlaceholderCard(comp, {
                name: "card_" + pad, color: tint, width: L.cardW, height: L.cardH
            });
        }
        if (!layer || typeof layer.property !== "function") { continue; }

        // Fit footage into the card box (placeholder shapes are already card-sized). / footage 适配卡框。
        var fitScale = 100;
        if (usedFootage) {
            try {
                var sw = layer.source.width || L.cardW;
                var sh = layer.source.height || L.cardH;
                fitScale = Math.min(L.cardW / sw, L.cardH / sh) * 100;
            } catch (eFit) {}
        }

        // 3D: spread cards near->far across Z, lean each one (deterministic tilt, no RNG needed).
        var tt = (n > 1) ? (i / (n - 1)) : 0;
        var z = D.zNear + tt * (D.zFar - D.zNear);
        var tiltY = ((((i * 37) % 100) / 100) * 2 - 1) * D.tiltYMax;
        var tiltZ = ((((i * 71) % 100) / 100) * 2 - 1) * D.tiltZMax;

        layer.threeDLayer = true;                     // <- WITHOUT this the camera flies past flat 2D cards
        var tg = layer.property("ADBE Transform Group");
        tg.property("ADBE Scale").setValue([fitScale, fitScale, fitScale]);
        tg.property("ADBE Position").setValue([x, y, z]);
        tg.property("ADBE Rotate Y").setValue(tiltY);
        tg.property("ADBE Rotate Z").setValue(tiltZ);

        var cmat = layer.property("ADBE Material Options Group");
        try { cmat.property("ADBE Casts Shadows").setValue(1); } catch (eM1) {}
        try { cmat.property("ADBE Accepts Shadows").setValue(1); } catch (eM2) {}

        infos.push({ layer: layer, fitScale: fitScale, restZ: z });
        if (usedFootage) { withFootage++; } else { fallback++; }
    }
    return { withFootage: withFootage, fallback: fallback, cards: infos };
}

// Surge each card FORWARD from deeper along Z into its slot + fade in. Reveals spread across the
// push so cards keep arriving as the camera moves. / 卡片沿 Z 从深处涌入卡位 + 淡入，揭示铺满穿行。
function animateEntrance(cards) {
    var fps = CONFIG.comp.fps, E = CONFIG.entrance;
    var n = cards.length;
    var sf = E.spreadFrames;
    for (var i = 0; i < n; i++) {
        var layer = cards[i].layer;
        var p = layer.property("ADBE Transform Group").property("ADBE Position");
        var rest = p.value;
        var delay = (n > 1) ? (sf[0] + (i / (n - 1)) * (sf[1] - sf[0])) : sf[0];
        var t0 = delay / fps;
        var t1 = t0 + E.durationFrames / fps;

        p.setValueAtTime(t0, [rest[0], rest[1], rest[2] + E.dropDistance]);
        p.setValueAtTime(t1, [rest[0], rest[1], rest[2]]);
        easeKeyAtTime(p, t0);
        easeKeyAtTime(p, t1);

        var op = layer.property("ADBE Transform Group").property("ADBE Opacity");
        op.setValueAtTime(t0, 0);
        op.setValueAtTime(t1, 100);
        easeKeyAtTime(op, t0);
        easeKeyAtTime(op, t1);
    }
}

// 3D camera that flies forward through the card field (Z push) + subtle X drift, anchored toward
// the hero so it lands facing it; eases to a stop. / 3D 摄像机穿过卡片场，落定朝向 hero。
function addFlythroughCamera(comp) {
    var C = CONFIG.camera;
    var fps = CONFIG.comp.fps;
    var cx = comp.width / 2, cy = comp.height / 2;
    var cam = comp.layers.addCamera("Camera_Main", [cx, cy]);
    try { cam.property("ADBE Camera Options Group").property("ADBE Camera Zoom").setValue(C.zoom); } catch (eZ) {}
    try { cam.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([cx, cy, CONFIG.hero.z]); } catch (eP) {}
    var pos = cam.property("ADBE Transform Group").property("ADBE Position");
    var t0 = C.startFrame / fps;
    var t1 = C.endFrame / fps;
    pos.setValueAtTime(t0, [cx, cy, C.startZ]);
    pos.setValueAtTime(t1, [cx + (C.driftX || 0), cy, C.endZ]);
    easeKeyAtTime(pos, t0);
    easeKeyAtTime(pos, t1);
    return cam;
}

// One 3D hero text line, centered, that surges forward from deeper Z (zRush) into place while
// fading + scaling up. / 一条 3D hero 文本，从更深处随推力涌到位、淡入放大。
function createHeroLine(comp, args) {
    var t = comp.layers.addText(args.text);
    t.name = args.name;
    var tp = t.property("ADBE Text Properties").property("ADBE Text Document");
    var td = tp.value;
    td.font = args.font;
    td.fontSize = args.size;
    td.fillColor = args.color;
    td.applyFill = true;
    td.applyStroke = false;
    try { td.justification = ParagraphJustification.CENTER_JUSTIFY; } catch (eJ) {}
    tp.setValue(td);

    t.threeDLayer = true;
    try {
        var rect = t.sourceRectAtTime(0, false);
        t.property("ADBE Transform Group").property("ADBE Anchor Point")
            .setValue([rect.left + rect.width / 2, rect.top + rect.height / 2]);
    } catch (eR) {}

    var fps = CONFIG.comp.fps;
    var t0 = args.revealStartFrame / fps;
    var t1 = (args.revealStartFrame + args.revealDurFrame) / fps;

    var pos = t.property("ADBE Transform Group").property("ADBE Position");
    pos.setValueAtTime(t0, [comp.width / 2, args.y, args.z + args.zRush]);
    pos.setValueAtTime(t1, [comp.width / 2, args.y, args.z]);
    easeKeyAtTime(pos, t0);
    easeKeyAtTime(pos, t1);

    var op = t.property("ADBE Transform Group").property("ADBE Opacity");
    op.setValueAtTime(t0, 0);
    op.setValueAtTime(t1, 100);
    easeKeyAtTime(op, t0);
    easeKeyAtTime(op, t1);

    var sc = t.property("ADBE Transform Group").property("ADBE Scale");
    sc.setValueAtTime(t0, [78, 78, 78]);
    sc.setValueAtTime(t1, [100, 100, 100]);
    easeKeyAtTime(sc, t0);
    easeKeyAtTime(sc, t1);

    try { applyDropShadow(t, { distance: 10, softness: 14, opacity: 60, direction: 135 }); } catch (eDS) {}
    return t;
}

function createHero(comp) {
    var h = CONFIG.hero, pal = getPalette();
    createHeroLine(comp, {
        text: h.title, name: "hero_title", font: h.titleFont, size: h.titleSize,
        color: pal.title, y: comp.height / 2 - 12, z: h.z, zRush: h.zRush,
        revealStartFrame: h.revealStartFrame, revealDurFrame: h.revealDurFrame
    });
    createHeroLine(comp, {
        text: h.subtitle, name: "hero_subtitle", font: h.subFont, size: h.subSize,
        color: pal.sub, y: comp.height / 2 + 64, z: h.z, zRush: h.zRush,
        revealStartFrame: h.revealStartFrame + 8, revealDurFrame: h.revealDurFrame
    });
}

// Dissolve the cards out as the hero forms (hand-off + clears their cast shadows). / 卡片溶解交接。
function fadeOutCards(cards) {
    var fps = CONFIG.comp.fps, F = CONFIG.cardFade;
    var t0 = F.startFrame / fps;
    var t1 = (F.startFrame + F.durFrame) / fps;
    for (var i = 0; i < cards.length; i++) {
        var op = cards[i].layer.property("ADBE Transform Group").property("ADBE Opacity");
        op.setValueAtTime(t0, 100);
        op.setValueAtTime(t1, 0);
        easeKeyAtTime(op, t0);
        easeKeyAtTime(op, t1);
    }
}

// ============================================================================
// Main / 主流程
// ============================================================================

function main() {
    app.beginUndoGroup("3D Montage Fly-Through Demo");
    try {
        var c = CONFIG.comp;
        clearScene(); // auto-clear the whole scene each run (no stacked comps / duplicate footage)
        var comp = app.project.items.addComp(c.name, c.width, c.height, 1.0, c.duration, c.fps);

        createBackground(comp);
        var laid = layoutCards(comp);
        animateEntrance(laid.cards);
        createShadowLight(comp);
        createHero(comp);
        fadeOutCards(laid.cards);
        addFlythroughCamera(comp);

        // Land on the title so the comp opens on a representative frame (not the empty frame 0).
        comp.time = CONFIG.camera.endFrame / c.fps;
        comp.openInViewer();

        return {
            success: true,
            composition: c.name,
            palette: CONFIG.palette,
            layers: comp.numLayers,
            cards: laid.cards.length,
            withFootage: laid.withFootage,
            fallback: laid.fallback
        };
    } catch (error) {
        return { success: false, message: error.toString(), line: error.line };
    } finally {
        app.endUndoGroup();
    }
}

JSON.stringify(main(), null, 2);
