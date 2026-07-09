# 3D Card Montage Fly-Through — free companion pack

A working 3D card montage with a camera that flies straight through the cards and lands on a hero title — built entirely by script. No plugins, no paid templates, nothing to install.

## What's in here

| File | What it is |
|------|------------|
| `code/demo_3d_montage_flythrough.jsx` | A self-contained script that builds the montage (basic tier): N footage cards scattered across 3D depth, a Z-surge entrance with auto stagger, a camera fly-through, a hero reveal, and soft cast shadows. |
| `prompts.md` | The actual prompts used in the video, in order, to build it step by step (including the real "camera won't fly through" failure and the fix). |

## Run the demo

1. Open After Effects.
2. `File > Scripts > Run Script File...` and pick `code/demo_3d_montage_flythrough.jsx`.
   (Or, if you use the CLI workflow: `./adobe_cli.sh ae exec-script ".../demo_3d_montage_flythrough.jsx"`.)
3. A comp named `Montage_Demo` appears, opened on the landing frame. Press `0` on the numpad for a RAM preview of the full fly-through.

**No footage? It still runs.** Any card whose clip is missing falls back to a shape-layer placeholder card, so the montage always renders. You can run the demo with no footage at all and still see the 3D fly-through structure — then drop clips in to upgrade the cards.

## Add footage (optional, recommended)

The video cards are free, commercial-OK clips you download yourself — the pack does not bundle footage (the stock sites generally don't allow redistribution).

1. Make a folder named `assets/` next to the script.
2. Download a few clips and save them as `01_card.mp4`, `02_card.mp4`, … `09_card.mp4` (no spaces in filenames).
3. Re-run the script. Cards with a clip show video; the rest stay as placeholder cards.

**Where to download (free, commercial-OK, no attribution):**

| Site | Search URL |
|------|------------|
| Pexels | `pexels.com/search/videos/{keyword}/` |
| Pixabay | `pixabay.com/videos/search/{keyword}/` (free account to download) |
| Coverr | `coverr.co/stock-video-footage/{keyword}` (hyphenate multi-word) |

**Keywords that work well** (dark, cool-toned clips read best against the light backdrop):

- Abstract tech: `abstract technology`, `digital network`, `data stream`, `particles`, `hologram`, `blue technology background`
- UI / screens: `data visualization`, `coding screen`, `dashboard`, `technology screen`
- City night: `city night`, `neon city`, `skyline timelapse`, `aerial city`
- Devices / circuits: `circuit board`, `server room`, `macro electronics`
- Gradients / light: `gradient motion`, `light streaks`, `bokeh`

> Pick abstract / tech / city clips. Avoid clips with recognizable brand logos, real faces, or real company interfaces.

## License & crediting your footage

The standard licenses on Pexels, Pixabay and Coverr are **free for commercial use and require no attribution** — you do not have to credit them in your video. (Licenses can change, so glance at the license shown on the download page when you grab a clip: [Pexels](https://www.pexels.com/license/) · [Pixabay](https://pixabay.com/service/license-summary/) · [Coverr](https://coverr.co/license).)

Even though crediting is not required, it's worth **recording where each clip came from** — so you can re-download it, prove the license if anyone asks, and stay covered if a license ever changes. Fill in the ledger that ships with the pack: [`assets/SOURCES.md`](assets/SOURCES.md) — one row per clip (file → site → source URL → license → date).

> Heads up: if you ever swap in an asset that *does* require credit — an OpenMoji emoji (CC BY-SA) or a Freesound clip under CC-BY — you must credit it. Mark it `Yes` in the ledger and add the credit to your video description.

## Make it yours

Everything tweakable lives in the `CONFIG` block at the top of the script:

- `palette` — one-word recolor: `"blue"` / `"amber"` / `"teal"` / `"crimson"`. It drives the backdrop, the hero title/subtitle, and the placeholder-card tints all at once.
- `cards` — the number of entries IS the card count. Add or remove entries to change how many cards.
- `grid` — `cols`, `cardW`/`cardH`, and the negative `gapX`/`gapY` that cluster the cards toward center.
- `depth` — `zNear`/`zFar` spread and per-card tilt.
- `camera` — `startZ`/`endZ`/`driftX`/`zoom` to reroute the fly-through.
- `entrance` — `spreadFrames` controls how the reveals spread across the push.
- `hero` — the title and subtitle text.

Change one place, run again, and the whole montage re-lays.

## One thing worth knowing

The cards must be **3D layers** or the camera fly-through does nothing — freshly imported footage defaults to a flat 2D layer that the camera ignores. In the script that is the `layer.threeDLayer = true` line in `layoutCards`. This is the exact silent failure from the video: the script ran fine, but the field stayed flat until each card was turned 3D.

## Want the full version?

The polished, reusable toolkit — a 3D layout engine, a camera fly-through path library (Z push / Y crane / X dolly / swoop), per-card scatter with seeds, and the probe that catches the "cards still 2D" failure, all reusable across any animation and updated every episode — is in the 2D membership. The join link is in the video description.
