# The prompts (in order)

These are the exact prompts used in the video, step by step. Each one describes the *result* we want, not the clicks. After Effects does the work; the script just gets written faster.

> The demo in `code/demo_3d_montage_flythrough.jsx` is the basic-tier result. These prompts show the full build — including the real failure where the camera would not fly through, and how a one-line probe found why.

**1. The first pass — describe the finished look, not steps**

```
clean soft light backdrop, import these clips and lay them out as a grid of cards
```

You get a wall of footage cards on a soft light-gray backdrop. Missing clips fall back to shape-layer placeholder cards. But it is flat — no depth, no motion yet.

**2. Bring the cards in along depth**

```
make the cards surge in from deeper in Z into their places, one after another
```

Each card surges forward from deeper in Z into its slot — the same direction the camera will push later, not a drop from the top.

**3. Stagger and ease the landing**

```
ease the landing, stagger them a few frames apart
```

One stagger value controls the rhythm of the whole set, and the cards settle cleanly instead of snapping.

**4. Cluster them and fly a camera through — the part that breaks**

```
cluster the cards overlapping at different depths, each tilted, and fly a 3D camera straight THROUGH them; spread their entrances across the push
```

First run, the camera moves but the field stays flat. No parallax, no sense of flying through. So we add a one-line probe to read a card layer's `threeDLayer` — and it comes back `false`. Freshly imported footage defaults to a 2D layer, which the camera ignores. That is the silent failure: the script "succeeded," but the result was wrong.

**5. The fix — turn the cards 3D**

```
fix: cards -> 3D, spread Z + tilt, entrance = Z-surge
```

Turn on 3D for each card, spread them across Z, tilt them, cluster them overlapping — and the depth snaps in. The camera genuinely flies through a stack, with cards arriving as it moves. (In the demo, this is the `layer.threeDLayer = true` line in `layoutCards` — without it, the fly-through has no effect.)

**6. Land the title**

```
as the camera decelerates, let the hero title surge into place with the push, dissolve the cards out into it; soft light-gray backdrop so cards cast soft shadows, ease the camera to a stop
```

The hero title surges into place with the push while the cards dissolve and hand the frame over. A parallel light casts each card's soft shadow onto the backdrop. It lands clean.

**7. One place to control everything**

```
pull card count, cluster/overlap, tilt-scatter, reveal window, camera path and colors into a CONFIG block so I can re-lay the whole montage in one place
```

Every value moves into one CONFIG block. Change one place and the whole montage re-lays.

**8. Re-lay it in one move**

```
5 cards, swapped footage, 2 columns, recolor warm/amber, reroute the camera
```

The nine-card blue version becomes a five-card warm amber one in a few lines — different footage, different columns, a rerouted camera, recolored in one move. Same command, completely different look. (In the demo, change the `palette` word to `"amber"` and edit the `cards` / `grid` / `camera` values to see this yourself.)

---

The reusable, productized version of all of this — a 3D layout engine, a camera fly-through path library, per-card scatter, and the probe that catches the "cards still 2D" failure — is in the 2D membership. The join link is in the video description.
