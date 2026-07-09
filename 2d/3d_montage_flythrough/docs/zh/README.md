# 3D 卡片蒙太奇穿行 — 免费配套包

一套能跑的 3D 卡片蒙太奇：摄像机直接穿过卡片、落定到 hero 标题，全部用脚本生成。不用插件，不用付费模板，无需安装任何东西。

## 包里有什么

| 文件 | 是什么 |
|------|--------|
| `code/demo_3d_montage_flythrough.jsx` | 自包含脚本，建出这套蒙太奇（基础版）：N 张 footage 卡片散布 3D 深度、沿 Z 涌入 + 自动错开、摄像机穿行、hero 揭示、柔和投射阴影。 |
| `prompts.md` | 视频里真实用过的提示词，按顺序一步步把它搭出来（含"摄像机穿不过去"的真实失败与修复）。 |

## 跑一下 demo

1. 打开 After Effects。
2. `文件 > 脚本 > 运行脚本文件...`，选 `code/demo_3d_montage_flythrough.jsx`。
   （如果你用 CLI 工作流：`./adobe_cli.sh ae exec-script ".../demo_3d_montage_flythrough.jsx"`。）
3. 出现一个叫 `Montage_Demo` 的合成，停在落定帧。按小键盘 `0` 做 RAM 预览，看完整穿行。

**没有素材？照样能跑。** 任何缺片的卡片会自动回退成形状图层占位卡，所以蒙太奇永远渲得出来。你完全没素材也能跑出 3D 穿行结构 —— 之后再放片进去把卡片升级成视频。

## 加素材（可选，推荐）

视频卡片用的是你自己下载的免费可商用片段 —— 这个包**不打包素材**（各站 license 一般不允许二次分发）。

1. 在脚本旁边建一个叫 `assets/` 的文件夹。
2. 下几段片子，命名为 `01_card.mp4`、`02_card.mp4`、…… `09_card.mp4`（文件名不要带空格）。
3. 重新运行脚本。有片的卡片显示视频，其余继续是占位卡。

**去哪下（免费、可商用、免署名）：**

| 站 | 搜索 URL |
|----|----------|
| Pexels | `pexels.com/search/videos/{关键词}/` |
| Pixabay | `pixabay.com/videos/search/{关键词}/`（下载需免费账号） |
| Coverr | `coverr.co/stock-video-footage/{关键词}`（多词用连字符） |

**好用的关键词**（深色、冷调的片子在浅底上对比最好看）：

- 抽象科技：`abstract technology`、`digital network`、`data stream`、`particles`、`hologram`、`blue technology background`
- UI / 屏幕：`data visualization`、`coding screen`、`dashboard`、`technology screen`
- 城市夜景：`city night`、`neon city`、`skyline timelapse`、`aerial city`
- 设备 / 电路：`circuit board`、`server room`、`macro electronics`
- 渐变 / 光效：`gradient motion`、`light streaks`、`bokeh`

> 选抽象 / 科技 / 城市类片子。避开带可辨识品牌 logo、真人正脸、真实公司界面的片段。

## License 与素材标注

Pexels、Pixabay、Coverr 的标准 license 都是**可商用、免署名** —— 你的视频里**不需要**给它们标来源。（license 会变，下片时顺手看一眼下载页显示的条款：[Pexels](https://www.pexels.com/license/) · [Pixabay](https://pixabay.com/service/license-summary/) · [Coverr](https://coverr.co/license)。）

虽然不强制署名，仍**建议把每个素材的来源记下来** —— 方便重下载、被问起时能证明 license、万一 license 变更也能自保。包里随附了台账，照填即可：[`assets/SOURCES.md`](assets/SOURCES.md) —— 每段片记一行（文件 → 站点 → 来源链接 → license → 日期）。

> 提醒：如果你换用了**需要署名**的素材 —— OpenMoji emoji（CC BY-SA）或 Freesound 的 CC-BY 片段 —— 就**必须**署名。台账里那一行"需署名"填 `Yes`，并在视频描述区写出署名。

## 调成你自己的

所有可调项都在脚本顶部的 `CONFIG` 块里：

- `palette` — 一个词重配色：`"blue"` / `"amber"` / `"teal"` / `"crimson"`。它一处控制背景 + hero 标题/副标题 + 占位卡底色。
- `cards` — 条目数**就是**卡片数。增删条目就能改卡片数量。
- `grid` — `cols`、`cardW`/`cardH`，以及把卡片往中心聚拢的负 `gapX`/`gapY`。
- `depth` — `zNear`/`zFar` 景深散布、逐卡倾斜。
- `camera` — `startZ`/`endZ`/`driftX`/`zoom`，重新规划穿行路线。
- `entrance` — `spreadFrames` 控制揭示怎么铺满整段推进。
- `hero` — 标题和副标题文字。

改一处，再跑一次，整套蒙太奇立刻重排。

## 一个值得知道的点

卡片必须是 **3D 图层**，否则摄像机穿行毫无效果 —— 新导入的 footage 默认是平的 2D 图层，摄像机会直接忽略。在脚本里这就是 `layoutCards` 里的 `layer.threeDLayer = true` 那一行。这正是视频里的那个静默失败：脚本跑得好好的，画面却一直是平的，直到每张卡都打开 3D。

## 想要完整版？

精修后、可复用的完整工具链 —— 3D 布点编排器、摄像机穿行路径库（Z 推进 / Y 升降 / X 横移 / 斜向 swoop）、带种子的逐卡散布、以及逮住"卡片还是 2D"静默失败的探针，全都能复用到任意动画、每集持续更新 —— 在 2D 会员里，入口见视频描述区。
