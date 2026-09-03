# Performance notes

This document records measured performance concerns and links to their canonical Beads work items.
Beads remains the source of truth for task status and priority.

---

## Runtime rendering baseline (C-65)

Measured 2026-09-02 with the in-game meter (press **F3**). This section exists so a future change
has something honest to compare against, instead of re-arguing from feel.

### Verdict: healthy. Do not optimize the renderer yet.

The game holds a locked 60 FPS on ordinary laptop hardware with an integrated GPU. There is no
rendering problem to solve today, and the numbers below are the evidence.

| machine | result | notes |
|---|---|---|
| Lucas's laptop - i7 Comet Lake gen9, **integrated** GPU | **locked 60 FPS** in every room | GPU 68-72% at **570-690 MHz**, CPU 16-17% all-core at 4.2-4.5 GHz, 72C sustained, RAM small |
| w365 VM, **no GPU** (Chrome falls back to SwiftShader) | 5-9 FPS | measures software rasterisation, **not** the game - never use as a perf signal |

**Read the clock, not just the utilisation.** 68-72% GPU sounds close to the limit, but Comet Lake
gen9 boosts to roughly 1.15 GHz and the chip is sitting at 570-690 MHz. It is not clocking up
because the load does not warrant it, so real headroom is far larger than the percentage suggests
- call it a third of peak. 72C is normal for a sustained laptop iGPU load.

**The one measured dip:** the intro / exterior cinematic runs at about **53 FPS**, then settles to
60 once the player is inside. It is the only sub-60 moment in the game, and the only place the
exterior geometry (building, trees, road, skybox) is drawn. If a rendering problem ever appears,
this is where it will show first.

### What the meter actually says (`renderer.info`, per room)

| room | draw calls | triangles |
|---|---|---|
| main office | 433 | 7k |
| meeting room | 956 | 18k |
| reception | 1165 | 22k |

**Triangles are trivial** - 7-22k is nothing for any GPU made this decade. Geometry complexity is
not the constraint and should not be touched.

**Draw calls are the number to watch.** Every small box - a sofa cushion, a planter, a desk panel,
a garden tree - is its own mesh and therefore its own call. Draw calls cost CPU time even when
there is a GPU, so unlike the software-rendering figures, this cost does *not* disappear on better
hardware. It is simply well within budget right now.

---

## Optimization candidates

- **Bound test and browser CPU usage (`sacs-m2b9`, optional / P4).** A local QA run saturated
  Lucas's CPU on 2026-09-02. Profile Vitest and Playwright separately before changing
  configuration. Likely levers are explicit Vitest worker limits, an explicit Playwright worker
  limit, and guaranteed browser teardown after screenshots/tests. Keep the lightweight Vite HMR
  server running for live preview; stop only finite test runners and automated Chromium sessions
  when QA finishes. Any optimization must retain the full suite and compare elapsed time as well
  as peak CPU, so a lower peak does not silently make feedback impractically slow.

- **Merge static room geometry and instance repeated props (`sacs-f2p7`, P3, deliberately
  unscheduled).** Mechanical and low-risk, expected to take **1165 -> roughly 200-300** draw calls:
  1. Merge static per-room geometry by material with `BufferGeometryUtils.mergeGeometries`,
     limited to props that never move or animate.
  2. Use `InstancedMesh` for repeated identical props - meeting chairs, planters, garden trees and
     bushes, desk sets. `src/engine/furniture/plant-wall.ts` already does exactly this and is the
     reference implementation.

  **Do it when one of these is true, and not before:** the game has to run on a low-end laptop, a
  Chromebook or a phone; the intro dip gets worse or drops spread into normal play; a new room
  pushes draw calls materially past ~1200; or someone reports stutter on hardware that *has* a GPU.

  **Caution before anyone starts:** merging removes per-object frustum culling and makes
  individual props unpickable. Anything the interaction raycaster or the collision AABBs depend on
  must stay a separate object. Measure with the F3 meter before and after, **on real hardware** -
  a software-rendered VM cannot tell you whether this helped.
