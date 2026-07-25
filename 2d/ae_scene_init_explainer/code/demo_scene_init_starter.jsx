/**
 * demo_scene_init_starter.jsx — Scene-Init brand-title starter (FREE standalone demo)
 * 场景初始化·品牌标题起步 demo（免费 standalone）
 *
 * STANDALONE / 自包含: no @include, no external deps, no membership tools. 无 @include、无外部依赖、不需会员工具。
 *   Download, run, tweak CONFIG, re-run to verify it really works. 下载即跑，改 CONFIG 再跑，亲手验证有效。
 *
 * Run / 运行 (After Effects):
 *   File > Scripts > Run Script File... > pick this file. 菜单 文件 > 脚本 > 运行脚本文件，选本文件。
 *
 * Faithful standalone twin of ae_demos/scene_init_demo sc01 (same layout/palette/sizes, resolved to raw
 * RGB + keyframes since there is no common/ here). / 与 scene_init_demo sc01 视觉一致的自包含孪生版
 * （同布局/配色/字号，因无 common/ 库故把预设色解析为原始 RGB、动画用裸关键帧）。
 *
 * What it builds / 构建什么:
 *   A brand-title sting that ANIMATES ON: graded background world -> dark scrim -> liquid-glass center
 *   panel + cyan glass-edge border -> circle-cropped avatar mark + cyan glow ring -> kinetic title -> cyan
 *   accent divider -> tagline -> 3 LIGHT/DARK/MONO variant chips (staggered) -> sequential voiceover +
 *   timed bottom captions on a readable plate. Result-first, one easing language. Pure AE, no plugins.
 *   一张会「动起来」的品牌标题 sting：背景世界 → 暗 scrim → 居中 liquid-glass 面板 + 青色玻璃边框 →
 *   圆裁头像 + 青色发光圆环 → 动态标题 → 青色分隔线 → tagline → 三个 LIGHT/DARK/MONO 变体按钮（错峰）→
 *   顺序配音 + 带底板的定时字幕。纯 AE，无插件。
 *
 * Media + the resource-folder convention (the point of the video) / 素材 + 资源目录约定（视频主题）:
 *   Media lives in folders NEXT TO this script, by a predictable layout. The avatar (01_logo.png) and
 *   voiceover (audio/) ship with the pack; the background world (videos/01_bg_loop.mp4) is an OPTIONAL
 *   drop-in — supply your own dark loop, else the scene falls back to a dark placeholder. Anything
 *   missing degrades gracefully so it always runs.
 *   素材按可预期布局放在脚本旁边。头像（01_logo.png）与配音（audio/）随包发；背景世界
 *   （videos/01_bg_loop.mp4）是**可选自备**——放你自己的暗色 loop，否则退回暗底占位。缺任何一个都优雅降级、永远能跑。
 *
 *     <this folder>/
 *       demo_scene_init_starter.jsx   <- you are here / 你在这
 *       images/01_logo.png            <- avatar / logo (bundled) / 头像（内置）
 *       audio/01.wav .. 04.wav        <- voiceover segments (bundled) / 配音分段（内置）
 *       videos/01_bg_loop.mp4         <- background world (optional, bring your own) / 背景世界（可选自备）
 *
 *   See code/assets/SOURCES.md for every asset's source + license. 每个素材来源+许可见 code/assets/SOURCES.md。
 *
 * Tweak / 亲手验证: change brandTitle / tagline / captions / accent below, re-run, see it change.
 */

// ============================================================================
// Fixed palette (resolved from the project's COLOR_PRESETS) / 固定色板（解析自项目 COLOR_PRESETS）
// ============================================================================
var COLORS = {
    CYAN:       [0, 1, 1],           // #00FFFF neon.CYAN — accent / ring / border / glow
    WHITE:      [1, 1, 1],           // #FFFFFF BASIC.WHITE
    BLACK:      [0, 0, 0],           // #000000 BASIC.BLACK
    GRAY:       [0.5, 0.5, 0.5],     // #808080 BASIC.GRAY
    GRAY_LIGHT: [0.8, 0.8, 0.8]      // #CCCCCC BASIC.GRAY_LIGHT
};

// ============================================================================
// CONFIG / 配置 —— tweak and re-run / 改这里再跑
// ============================================================================
var CONFIG = {
    compName:    "Scene Init Starter",
    width: 1920, height: 1080, durationSec: 6, fps: 30,      // durationSec = fallback when no voiceover

    brandTitle:  "SuperAiComposer",
    tagline:     "compose  •  every canvas",        // • = bullet •
    variantLabels: ["LIGHT", "DARK", "MONO"],

    // Bottom captions (burned): one per voiceover segment; timed to each clip, else last line static.
    // 底部字幕（烤入）：一句对一段配音；有配音按段定时，无则静态显末句。
    captions: [
        "One mark, made for every canvas.",
        "It scales, it adapts, it always reads as you.",
        "Light, dark, mono, one system.",
        "One identity, composed for every screen."
    ],

    bgColor:      [0.02, 0.03, 0.04],
    accent:       [0, 1, 1],            // neon.CYAN — ring / accent line / glass edge / title glow
    titleColor:   [1, 1, 1],            // BASIC.WHITE
    taglineColor: [0.8, 0.8, 0.8],      // BASIC.GRAY_LIGHT
    captionColor: [0.92, 0.94, 0.97],

    fontName:     "ArialMT",            // Arial Regular (PostScript name; bare "Arial" falls back to serif)
    fontNameBold: "Arial-BoldMT",       // Arial Bold

    // Media (relative to THIS script's folder). Present => used; absent => shape placeholder / no audio.
    bgVideo:        "videos/01_bg_loop.mp4",
    logoImage:      "images/01_logo.png",
    voFiles:        ["audio/01.wav", "audio/02.wav", "audio/03.wav", "audio/04.wav"],
    bgVideoOpacity: 55
};

// Layout anchors (1920x1080) — matched to ae_demos/scene_init_demo sc01 / 布局锚点（对齐 sc01）
var LAYOUT = {
    scrimOpacity: 26,                                                  // full-frame black scrim
    panelPos: [960, 545], panelSize: [900, 600], panelRound: 44,       // liquid-glass center panel
    panelOpacity: 30, panelBorderStroke: 2,                            // black glass + cyan edge
    avatarPos: [960, 360], avatarDia: 150,                             // 1024 * 0.15 masked = ~150px
    ringDia: 172, ringStroke: 5,                                       // cyan glow ring around the mark
    titleY: 500, titleSize: 78,
    accentPos: [960, 572], accentSize: [340, 5], accentRound: 3,
    taglineY: 618, taglineSize: 34,
    chipY: 755, chipXs: [720, 960, 1200], chipW: 200, chipH: 72, chipRound: 16, chipStroke: 2, chipLabelSize: 30,
    capY: 1015, capSize: 46
};

// ============================================================================
// Utilities / 工具（ES3-safe, standalone）
// ============================================================================
function scriptDir(){ return (new File($.fileName)).parent; }
function assetPath(rel){ return scriptDir().fsName + "/" + rel; }
function fileExists(rel){ return (new File(assetPath(rel))).exists; }
function tryImport(rel){
    try { if (!fileExists(rel)) return null; return app.project.importFile(new ImportOptions(new File(assetPath(rel)))); }
    catch (e){ return null; }
}
function scaleToCover(layer, srcW, srcH){
    if (!srcW || !srcH) return;
    var s = Math.max(CONFIG.width / srcW, CONFIG.height / srcH) * 100;
    layer.property("ADBE Transform Group").property("ADBE Scale").setValue([s, s]);
}
function addText2(comp, str, size, color, x, y, name, bold){
    var tl = comp.layers.addText(str); if (name) tl.name = name;
    var tp = tl.property("ADBE Text Properties").property("ADBE Text Document");
    var td = tp.value;
    td.fontSize = size; td.fillColor = color; td.applyFill = true;
    td.font = bold ? CONFIG.fontNameBold : CONFIG.fontName;
    try { td.justification = ParagraphJustification.CENTER_JUSTIFY; } catch (e){}
    tp.setValue(td);
    tl.property("ADBE Transform Group").property("ADBE Position").setValue([x, y]);
    return tl;
}
// Point text whose VISUAL center sits exactly at [x,y] (anchor moved to the glyph-box center) — so text
// centers on its plate/chip and scales from its middle. 文本视觉中心精确落在 [x,y]（锚点移到字框中心）。
function addCenteredText(comp, str, size, color, x, y, name, bold){
    var tl = addText2(comp, str, size, color, x, y, name, bold);
    centerTextAnchor(tl);
    tl.property("ADBE Transform Group").property("ADBE Position").setValue([x, y]);
    return tl;
}
function addRoundRect(comp, w, h, round, fillRgb, fillOp, strokeRgb, strokeW, cx, cy, name){
    var s = comp.layers.addShape(); s.name = name;
    var root = s.property("ADBE Root Vectors Group");
    var rect = root.addProperty("ADBE Vector Shape - Rect");
    rect.property("ADBE Vector Rect Size").setValue([w, h]);
    rect.property("ADBE Vector Rect Roundness").setValue(round);
    if (fillRgb){
        var f = root.addProperty("ADBE Vector Graphic - Fill");
        f.property("ADBE Vector Fill Color").setValue([fillRgb[0], fillRgb[1], fillRgb[2], 1]);
        if (fillOp != null) f.property("ADBE Vector Fill Opacity").setValue(fillOp);
    }
    if (strokeRgb){
        var st = root.addProperty("ADBE Vector Graphic - Stroke");
        st.property("ADBE Vector Stroke Color").setValue([strokeRgb[0], strokeRgb[1], strokeRgb[2], 1]);
        st.property("ADBE Vector Stroke Width").setValue(strokeW);
    }
    s.property("ADBE Transform Group").property("ADBE Position").setValue([cx, cy]);
    return s;
}
function addEllipse(comp, dia, fillRgb, strokeRgb, strokeW, cx, cy, name){
    var s = comp.layers.addShape(); s.name = name;
    var root = s.property("ADBE Root Vectors Group");
    var ell = root.addProperty("ADBE Vector Shape - Ellipse");
    ell.property("ADBE Vector Ellipse Size").setValue([dia, dia]);
    if (fillRgb){
        var f = root.addProperty("ADBE Vector Graphic - Fill");
        f.property("ADBE Vector Fill Color").setValue([fillRgb[0], fillRgb[1], fillRgb[2], 1]);
    }
    if (strokeRgb){
        var st = root.addProperty("ADBE Vector Graphic - Stroke");
        st.property("ADBE Vector Stroke Color").setValue([strokeRgb[0], strokeRgb[1], strokeRgb[2], 1]);
        st.property("ADBE Vector Stroke Width").setValue(strokeW);
    }
    s.property("ADBE Transform Group").property("ADBE Position").setValue([cx, cy]);
    return s;
}
// Source-space circular crop (mask is pre-transform → define on the image's OWN pixels; layer then scales).
// Mask group matchName is "ADBE Mask Parade" (NOT "ADBE Mask") — wrong name throws and the crop silently
// never applies. anchorPoint must be the circle center so position places it right.
// 源空间圆裁：蒙版组正确 matchName = "ADBE Mask Parade"（用错名会抛错、圆裁静默失效）；anchorPoint 设为圆心。
function circleCropSource(layer, w, h){
    var cx = w / 2, cy = h / 2, r = Math.min(w, h) / 2 * 0.99, k = 0.5523 * r;
    var mask = layer.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
    var shp = new Shape();
    shp.vertices    = [[cx, cy - r], [cx + r, cy], [cx, cy + r], [cx - r, cy]];
    shp.inTangents  = [[-k, 0], [0, -k], [k, 0], [0, k]];
    shp.outTangents = [[k, 0], [0, k], [-k, 0], [0, -k]];
    shp.closed = true;
    mask.property("ADBE Mask Shape").setValue(shp);
    try { mask.property("ADBE Mask Feather").setValue([4, 4]); } catch (e){} // clean anti-aliased edge
}
function addGlow(layer, radius, intensity){
    try {
        var g = layer.property("ADBE Effect Parade").addProperty("ADBE Glo2");
        try { g.property("ADBE Glo2-0002").setValue(radius); } catch (e1){}     // glow radius
        try { g.property("ADBE Glo2-0003").setValue(intensity); } catch (e2){}  // glow intensity
    } catch (e){}
}
// Drive a shape layer's rect Size with an expression (used to auto-fit a subtitle plate to its text,
// same pattern as common/update_subtitle_voiceover.jsx). 用表达式驱动矩形尺寸（字幕底板自适应文本宽度）。
function setRectSizeExpr(shapeLayer, expr){
    try {
        var root = shapeLayer.property("ADBE Root Vectors Group");
        for (var i = 1; i <= root.numProperties; i++){
            var p = root.property(i);
            if (p.matchName === "ADBE Vector Shape - Rect"){
                var sz = p.property("ADBE Vector Rect Size");
                sz.expression = expr;
                try { sz.expressionEnabled = true; } catch (ee){}
                return;
            }
        }
    } catch (e){}
}
// Graded radial "world" backdrop (dark teal center glow -> near-black edges) — a professional stand-in
// for the optional bg video, so the scene never looks flat/empty when the video is absent.
// 渐变径向背景（暗青中心辉光 → 近黑边缘），背景视频缺失时的体面占位，避免画面发空发平。
function addRadialBackdrop(layer){
    var r;
    try { r = layer.property("ADBE Effect Parade").addProperty("ADBE Ramp"); } catch (e){ return; }
    try { r.property("ADBE Ramp-0005").setValue(2); } catch (e1){}                    // Ramp Shape: 2 = Radial
    try { r.property("ADBE Ramp-0001").setValue([960, 430]); } catch (e2){}           // Start (center)
    try { r.property("ADBE Ramp-0003").setValue([1720, 1120]); } catch (e3){}         // End (radius reach)
    try { r.property("ADBE Ramp-0002").setValue([0.05, 0.11, 0.13]); } catch (e4){}   // center: dark teal
    try { r.property("ADBE Ramp-0004").setValue([0.01, 0.02, 0.03]); } catch (e5){}   // edge: near-black
}
function clearScene(){
    for (var i = app.project.numItems; i >= 1; i--){ try { app.project.item(i).remove(); } catch (e){} }
}

// ============================================================================
// Animation helpers / 动画工具 —— matched to common/animation_utils.jsx + property_utils.jsx
// keyframe values + easing influence (Easy Ease 33.33 / high 80). 与引擎逐值一致，ES3-safe, 全保护。
// ============================================================================
var EASE_STD = 33.33, EASE_HI = 80;                 // Adobe Easy Ease vs high-influence (property_utils.jsx)
function _ke(inf){ return new KeyframeEase(0, inf); }
function _setEase(prop, dims, ki, inInf, outInf){   // ease one key with given in/out influence
    try {
        var inA = [], outA = [];
        for (var d = 0; d < dims; d++){ inA.push(_ke(inInf)); outA.push(_ke(outInf)); }
        prop.setInterpolationTypeAtKey(ki, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);
        prop.setTemporalEaseAtKey(ki, inA, outA);
    } catch (e){}
}
function easeOutKey(prop, dims, ki){ _setEase(prop, dims, ki, EASE_HI, EASE_STD); }   // fast start
function easeInKey(prop, dims, ki){  _setEase(prop, dims, ki, EASE_STD, EASE_HI); }   // slow start
function easeStdAll(prop, dims){                    // Easy Ease 33.33 both handles, all keys (elastic)
    try { for (var i = 1; i <= prop.numKeys; i++) _setEase(prop, dims, i, EASE_STD, EASE_STD); } catch (e){}
}
function centerTextAnchor(tl){
    try {
        var t = tl.property("ADBE Transform Group");
        var oldA = t.property("ADBE Anchor Point").value;
        var oldP = t.property("ADBE Position").value;
        var r = tl.sourceRectAtTime(0, false);
        var newA = [r.left + r.width / 2, r.top + r.height / 2];
        t.property("ADBE Anchor Point").setValue(newA);
        t.property("ADBE Position").setValue([oldP[0] + (newA[0] - oldA[0]), oldP[1] + (newA[1] - oldA[1])]);
    } catch (e){}
}
// Opacity fade 0 -> target, key1 easeOut + key2 easeIn (applyOpacityFadeIn). 淡入。
function animFadeIn(layer, startT, dur){
    var op = layer.property("ADBE Transform Group").property("ADBE Opacity");
    var target = op.value; if (target === 0) target = 100;   // preserve intended final (e.g. bg = 55)
    op.setValueAtTime(startT, 0);
    op.setValueAtTime(startT + dur, target);
    easeOutKey(op, 1, 1); easeInKey(op, 1, 2);
}
// scaleIn: default opacity fade + scale. elastic => 0 -> 1.2x@0.6dur -> 1.0x (Easy Ease all keys);
// non-elastic => 0 -> 1.0x, both keys easeOut (applyElasticScale / applyScaleIn). 缩放入场。
function animScaleIn(layer, startT, dur, elastic){
    animFadeIn(layer, startT, dur);                              // typesWithDefaultFade
    var sc = layer.property("ADBE Transform Group").property("ADBE Scale");
    var fin = sc.value;
    if (elastic){
        sc.setValueAtTime(startT, [0, 0]);
        sc.setValueAtTime(startT + dur * 0.6, [fin[0] * 1.2, fin[1] * 1.2]);   // peak 120% @ 60%
        sc.setValueAtTime(startT + dur, fin);                                  // settle at duration
        easeStdAll(sc, 2);
    } else {
        sc.setValueAtTime(startT, [0, 0]);
        sc.setValueAtTime(startT + dur, fin);
        easeOutKey(sc, 2, 1); easeOutKey(sc, 2, 2);                            // applyScaleIn: easeOut both
    }
}
// slideIn: default opacity fade + position from `distance` px away (default 80), key1 easeOut + key2
// easeIn (applySlideIn). 滑入。
function animSlideIn(layer, startT, dur, direction, distance){
    animFadeIn(layer, startT, dur);                              // typesWithDefaultFade
    var pos = layer.property("ADBE Transform Group").property("ADBE Position");
    var fin = pos.value, start = [fin[0], fin[1]];
    if (distance === undefined) distance = 80;
    if (direction === 'fromBottom')      start[1] = fin[1] + distance;
    else if (direction === 'fromTop')    start[1] = fin[1] - distance;
    else if (direction === 'fromRight')  start[0] = fin[0] + distance;
    else                                 start[0] = fin[0] - distance;         // fromLeft
    pos.setValueAtTime(startT, start);
    pos.setValueAtTime(startT + dur, fin);
    easeOutKey(pos, 2, 1); easeInKey(pos, 2, 2);
}

// ============================================================================
// Main / 主函数
// ============================================================================
function main(){
    app.beginUndoGroup("Build Scene Init Starter");
    try {
        clearScene();

        var C = COLORS, L = LAYOUT, used = [];

        // 0) pre-scan voiceover to size the comp + capture per-segment start times / 预扫配音定时长 + 段起点
        var vo = [], segStart = [], totalVO = 0;
        for (var v = 0; v < CONFIG.voFiles.length; v++){
            var vit = tryImport(CONFIG.voFiles[v]);
            if (!vit) break;
            segStart.push(totalVO); vo.push(vit); totalVO += vit.duration;
        }
        var haveVO = vo.length > 0;
        var D = haveVO ? totalVO : CONFIG.durationSec;

        var W = CONFIG.width, H = CONFIG.height, cx = W / 2;
        var comp = app.project.items.addComp(CONFIG.compName, W, H, 1.0, D, CONFIG.fps);

        // reveal-time clamp: never schedule an entrance past the very end / 入场时刻钳到片尾内
        function at(t){ var m = D - 0.35; if (m < 0) m = 0; return t < m ? t : m; }

        // 1) background world (bottom): near-black base -> optional bundled video (looped), else a graded
        //    radial backdrop placeholder / 背景世界：近黑底 → 可选背景视频（循环），缺则渐变径向占位
        comp.layers.addSolid(CONFIG.bgColor, "_bg_base", W, H, 1.0, D);
        var bgItem = tryImport(CONFIG.bgVideo);
        if (bgItem){
            var bgL = comp.layers.add(bgItem); bgL.name = "01_bg_loop";
            scaleToCover(bgL, bgItem.width, bgItem.height);
            bgL.property("ADBE Transform Group").property("ADBE Opacity").setValue(CONFIG.bgVideoOpacity);
            try { bgL.timeRemapEnabled = true; bgL.property("ADBE Time Remapping").expression = "loopOut('cycle')"; bgL.outPoint = D; } catch (eLoop){}
            animFadeIn(bgL, at(0), 0.5);
            used.push("videos/01_bg_loop.mp4");
        } else {
            // Bg video absent -> graded radial "world" placeholder so the scene reads intentional, not empty.
            var bgPh = comp.layers.addSolid(CONFIG.bgColor, "_bg_placeholder", W, H, 1.0, D);
            addRadialBackdrop(bgPh);
            animFadeIn(bgPh, at(0), 0.5);
        }

        // 2) full-frame dark scrim for text contrast (backdrop) / 全屏暗 scrim
        var scrim = addRoundRect(comp, W, H, 0, C.BLACK, L.scrimOpacity, null, 0, 960, 540, "_scrim");
        animFadeIn(scrim, at(0), 0.4);

        // 3) liquid-glass center panel holding the whole sting / 居中 liquid-glass 面板
        var panel = addRoundRect(comp, L.panelSize[0], L.panelSize[1], L.panelRound, C.BLACK, L.panelOpacity, null, 0, L.panelPos[0], L.panelPos[1], "_panel");
        animFadeIn(panel, at(0.2), 0.4);

        // 4) cyan glass-edge border hugging the panel (same geometry) / 面板边缘青色高光 border
        var pBorder = addRoundRect(comp, L.panelSize[0], L.panelSize[1], L.panelRound, null, null, C.CYAN, L.panelBorderStroke, L.panelPos[0], L.panelPos[1], "_panel_border");
        addGlow(pBorder, 12, 0.3);
        animFadeIn(pBorder, at(0.27), 0.4);

        // 5) avatar: circle-cropped logo (mark) — or dark placeholder ONLY if no image / 头像圆裁标记
        var logoItem = tryImport(CONFIG.logoImage), avatarShown = false;
        if (logoItem){
            var lw = logoItem.width || L.avatarDia, lh = logoItem.height || L.avatarDia;
            var lg = comp.layers.add(logoItem); lg.name = "01_logo";
            var lt = lg.property("ADBE Transform Group");
            lt.property("ADBE Anchor Point").setValue([lw / 2, lh / 2]);        // circle center = anchor
            var ls = (L.avatarDia / 0.99 / Math.min(lw, lh)) * 100;             // masked circle => avatarDia
            lt.property("ADBE Scale").setValue([ls, ls]);
            lt.property("ADBE Position").setValue([L.avatarPos[0], L.avatarPos[1]]);
            try { circleCropSource(lg, lw, lh); } catch (eMask){}               // mask fail => uncropped, but NO dark disc over it
            animScaleIn(lg, at(0.5), 0.5, true);                                 // SAME as title (elastic 0.5)
            used.push("images/01_logo.png"); avatarShown = true;
        }
        if (!avatarShown){
            var ph = addEllipse(comp, L.avatarDia, [0.10, 0.13, 0.17], null, 0, L.avatarPos[0], L.avatarPos[1], "_avatar_placeholder");
            animScaleIn(ph, at(0.5), 0.5, true);
        }
        // 6) cyan glow ring (hollow) around the avatar mark / 头像发光圆环
        var ring = addEllipse(comp, L.ringDia, null, C.CYAN, L.ringStroke, L.avatarPos[0], L.avatarPos[1], "_avatar_ring");
        addGlow(ring, 18, 0.5);
        animFadeIn(ring, at(1.0), 0.5);

        // 7) kinetic title (hero) — white bold + cyan glow, scaleIn elastic (IDENTICAL to 01_logo) / 动态品牌标题
        var title = addCenteredText(comp, CONFIG.brandTitle, L.titleSize, CONFIG.titleColor, cx, L.titleY, "01_title", true);
        addGlow(title, 14, 0.4);
        animScaleIn(title, at(1.5), 0.5, true);                                  // SAME as 01_logo (elastic 0.5)

        // 8) cyan accent divider under the title — uniform scaleIn (matches sc01) / 标题下青色 accent 分隔线
        var accent = addRoundRect(comp, L.accentSize[0], L.accentSize[1], L.accentRound, C.CYAN, 100, null, 0, L.accentPos[0], L.accentPos[1], "_accent");
        addGlow(accent, 12, 0.4);
        animScaleIn(accent, at(2.03), 0.4, false);

        // 9) tagline — slides up from below (fromBottom, 80px, matches sc01) / 标语上滑入
        var tagline = addCenteredText(comp, CONFIG.tagline, L.taglineSize, CONFIG.taglineColor, cx, L.taglineY, "01_tagline", false);
        animSlideIn(tagline, at(2.5), 0.4, 'fromBottom', 80);

        // 10) three responsive variant chips (LIGHT / DARK / MONO), staggered pop-in / 三个变体按钮错峰弹入
        var chipFill   = [ C.WHITE, C.BLACK, C.GRAY ];
        var chipOp     = [ 88, 72, 58 ];
        var chipStroke = [ C.GRAY, C.WHITE, C.GRAY_LIGHT ];
        var labelCol   = [ C.BLACK, C.WHITE, C.WHITE ];
        var chipBase   = (haveVO && segStart.length >= 3) ? segStart[2] : D * 0.58;   // reveal during clip 3
        for (var b = 0; b < 3; b++){
            var bx = L.chipXs[b];
            var chip = addRoundRect(comp, L.chipW, L.chipH, L.chipRound, chipFill[b], chipOp[b], chipStroke[b], L.chipStroke, bx, L.chipY, "_chip_" + CONFIG.variantLabels[b]);
            var lbl = addCenteredText(comp, CONFIG.variantLabels[b], L.chipLabelSize, labelCol[b], bx, L.chipY, "01_chip_label_" + CONFIG.variantLabels[b], true);
            var ct = at(chipBase + b * 0.27);                                    // 8-frame stagger (sc01: 139/147/155)
            animScaleIn(chip, ct, 0.35, false);                                 // non-elastic scaleIn (matches sc01)
            animFadeIn(lbl, ct + 0.03, 0.3);
        }

        // 11) voiceover (sequential audio) + timed bottom captions on a readable plate / 配音 + 带底板的定时字幕
        if (haveVO){
            for (var s2 = 0; s2 < vo.length; s2++){
                var t0 = segStart[s2], t1 = t0 + vo[s2].duration;
                var aL = comp.layers.add(vo[s2]); aL.name = "01_vo_" + (s2 + 1); aL.startTime = t0;
                var capTxt = CONFIG.captions[s2] || "";
                if (capTxt) addCaption(comp, capTxt, cx, L, t0, t1, s2 + 1);
            }
            used.push(vo.length + " voiceover segment(s)");
        } else {
            var last = CONFIG.captions[CONFIG.captions.length - 1];
            if (last) addCaption(comp, last, cx, L, 0, D, 1);
        }

        comp.openInViewer();
        var mode = used.length ? "with " + used.join(", ") : "shape placeholders only";
        return "Built '" + CONFIG.compName + "', " + Math.round(D * 100) / 100 + "s — " + mode + ".";
    } catch (e){
        return "ERROR: " + e.toString();
    } finally {
        app.endUndoGroup();
    }
}

// Bottom caption = dark rounded plate (added first, sits BELOW) + centered text (added after, on top),
// both windowed to [t0,t1] and faded in for readability. Text is vertically centered on the plate.
// 字幕 = 深色圆角底板 + 居中文本（垂直居中于底板），限定时窗并淡入。
function addCaption(comp, str, cx, L, t0, t1, idx){
    var plateCy = L.capY - 4, capName = "01_caption_" + idx;
    // Plate size is a placeholder — the expression below auto-fits it to the real text. / 尺寸占位，下方表达式自适应。
    var bar = addRoundRect(comp, 400, L.capSize + 30, 16, COLORS.BLACK, 55, null, 0, cx, plateCy, "_caption_bg_" + idx);
    bar.inPoint = t0; bar.outPoint = t1;
    var cap = addCenteredText(comp, str, L.capSize, CONFIG.captionColor, cx, plateCy, capName, false);
    cap.inPoint = t0; cap.outPoint = t1;
    // Auto-fit the plate to the actual rendered text (width+height), padded — same pattern as
    // common/update_subtitle_voiceover.jsx. 底板宽高随实际文本自适应 + 内边距。
    setRectSizeExpr(bar, 'var t = thisComp.layer("' + capName + '");\n' +
                         'var r = t.sourceRectAtTime(time, false);\n' +
                         '[r.width + 40, r.height + 30];');
    var fadeDur = 0.2, fadeEnd = t0 + fadeDur; if (fadeEnd > t1) fadeEnd = t1;
    var bo = bar.property("ADBE Transform Group").property("ADBE Opacity"); var bt = bo.value;
    bo.setValueAtTime(t0, 0); bo.setValueAtTime(fadeEnd, bt); easeOutKey(bo, 1, 1); easeInKey(bo, 1, 2);
    var co = cap.property("ADBE Transform Group").property("ADBE Opacity");
    co.setValueAtTime(t0, 0); co.setValueAtTime(fadeEnd, 100); easeOutKey(co, 1, 1); easeInKey(co, 1, 2);
}

var result = main();
result;
