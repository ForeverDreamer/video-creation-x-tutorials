# Scene-Init Starter — free companion pack

The video is about one idea: **a single command reconciles every scattered resource — your videos, images, and sound effects — into a scene, on the beat of your voiceover.** This pack gives you the two things you need to try that yourself: the **resource-folder convention** (below) and a **complete, runnable scene** — everything the companion demo shows except the rendered video is bundled.

## What's in here

| File | What it is |
|------|------------|
| `code/demo_scene_init_starter.jsx` | A self-contained script that builds the full brand-title sting — background world, a glass-style rounded frame, a hexagon + avatar mark, a big title, a cyan accent underline, a tagline, three responsive variant chips (LIGHT / DARK / MONO), the sequential voiceover, and timed bottom captions. |
| `code/images/01_logo.png`, `code/audio/01.wav … 04.wav` | The bundled media — the channel avatar and the 4 voiceover segments (creator-owned). Swap any for your own. |
| `code/videos/01_bg_loop.mp4` | **Not bundled** — an optional drop-in. Supply your own dark / slow / low-contrast loop here, or leave it out and the scene falls back to a dark placeholder. |
| `code/assets/SOURCES.md` | Source + license for every asset (creator-owned bundled; the background loop is yours to supply). |

## The resource-folder convention (the point of the video)

A scene reads its media from folders with a **predictable layout**. Lay your files out this way and the tooling finds each one automatically — no hand-wiring paths:

```text
<project>/
  videos/         <- screen recordings, b-roll, background loops   (e.g. 01_bg_loop.mp4)
  images/         <- logos, screenshots, stills                    (e.g. 01_logo.png)
  images/emojis/  <- emoji PNGs (locale-neutral, shared)           (e.g. emoji_2728.png)
  audio/          <- voiceover / narration segments                (e.g. 01.wav … 04.wav)
  sfxs/           <- sound effects, whooshes, clicks               (e.g. 01_whoosh.wav)
```

Two rules worth knowing:

- **Number your files by scene / segment.** A `01_` prefix means "scene 1"; the voiceover splits into `01.wav … 04.wav`. Keeping the numbering consistent is what lets one command line up every asset — and every caption — a scene needs.
- **Emojis are locale-neutral.** They live in their own `emojis/` folder (shared across languages), not under a per-language folder — a very common silent-failure trap when a scene "loses" its icons.

The starter demonstrates this: it reads its media from these folders. The avatar and voiceover ship with the pack; drop your own dark loop at `videos/01_bg_loop.mp4` for the background world (else it falls back to a dark placeholder). Swap any file for your own and re-run — remove one and that piece degrades gracefully, so it always runs.

## Run the demo

1. Open After Effects.
2. `File > Scripts > Run Script File...` and pick `code/demo_scene_init_starter.jsx`.
3. A comp named `Scene Init Starter` appears with the full sting — background world, avatar, title, chips, and the voiceover with timed captions. Press `0` on the numpad for a RAM preview to hear it.
4. Swap any bundled file for your own (`images/01_logo.png`, `audio/01.wav`, …) and run again — the scene picks up the change.

## Make it yours

Everything tweakable lives in the `CONFIG` block at the top of the script:

- `brandTitle`, `tagline` — your channel/brand name and tagline.
- `captions` — the bottom-caption lines, one per voiceover segment (timed to each clip).
- `variantLabels` — the three responsive-variant chip labels (default `LIGHT` / `DARK` / `MONO`).
- `accent` — the accent color `[r, g, b]` (0–1) for the frame, avatar ring, and underline. Try a warm orange `[0.98, 0.55, 0.15]`.
- `bgColor`, `titleColor`, `taglineColor`, `captionColor` — the background world and text colors.
- `fontName` — the typeface, a PostScript font name (`ArialMT` = Arial Regular; use a no-space name).
- `bgVideo`, `logoImage`, `voFiles` — the media paths, relative to the script's folder (`bgVideo` is the optional drop-in).

Change one value, run again, and the sting updates.

## About this free code

This is a starter, not the full episode build. Running it as-is may need a small tweak — After Effects version, fonts, and OS differences can vary. If you just want to **see how a scene is scaffolded from its resource folder**, the script is enough to read and run.

## Want the full version?

The polished, reusable toolkit — the shared `common/` helpers behind every episode (scene builders, cameras, easing, layout, render helpers) and the workflow tooling that turns a voiceover line into a finished scene — is in the 2D membership, updated every episode. The join link is in the video description.
