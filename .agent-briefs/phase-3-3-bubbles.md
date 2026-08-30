# Phase 3.3 — Inter-NPC speech bubbles

## Context

We are building AI Trainer Simulator. Phase 3.0/3.1 added the NPC
schedule and controller. This task adds the next piece from the
Phase 3 plan: when two NPCs are within 2.5m of each other, every
8-12 seconds, with 25% probability, one of them "says something"
to the other. A small sprite with a text bubble appears above the
speaker's head for 4-6 seconds.

The text comes from a curated inter-NPC line list (~50 lines). For
this task, ship 10 starter lines. A future task can expand to 50.

## Files to read

- `src/engine/npc-controller.ts` — the per-frame controller you
  may need to extend or use as a reference.
- `src/engine/scene.ts` — `npcMeshes` is the per-NPC `Object3D` map.
- `src/content/npcs.ts` — NPC positions and ids.
- `src/types.ts` — shared types.
- `docs/PRD.md` §13 C-08 / C-15 — the "bubbles" and "lines" reqs.

## What to deliver

### 1. New file: `src/engine/bubbles.ts`

```ts
import * as THREE from "three";

export interface BubbleHandle {
  /** Per-frame update. Drives the bubble's lifetime and updates
   *  the sprite's opacity and screen-position. */
  update: (dt: number, camera: THREE.Camera) => void;
  /** Show a bubble above the speaker's head. The line is selected
   *  from a curated list. The bubble is a 3D Sprite that always
   *  faces the camera. The line is rendered to a CanvasTexture
   *  at the moment of show so the texture is fresh. */
  show: (speakerPosition: THREE.Vector3, line: string) => void;
  /** Force-clear any active bubble. Called when the dialogue UI
   *  opens so the player is not visually overloaded. */
  clear: () => void;
  /** Destroy all listeners / textures. */
  destroy: () => void;
}

export function createBubbleSystem(scene: THREE.Scene): BubbleHandle;
```

Implementation notes:

- The bubble is a single `THREE.Sprite` with a `SpriteMaterial`
  using a `CanvasTexture` of the current line. The sprite has
  `sizeAttenuation: false` so it stays a constant size on screen.
- The sprite's `position` is set to the speaker's head height
  (approximately `speaker.y + 1.7`). On `update`, the sprite is
  also repositioned to follow the speaker.
- Opacity fades from 1 → 0 over the last 0.5s of the bubble's
  lifetime.
- When the bubble expires, the sprite is set to invisible (do
  NOT remove it from the scene, since removing/re-adding each
  time is wasteful).
- The `CanvasTexture` is rebuilt each time `show` is called. The
  canvas is 256 × 64 pixels. The line is rendered in a pixel font
  with a 4px padding. Background is the panel color, text is
  bright. Wrap long lines at 32 chars (truncate with ellipsis
  if longer).

### 2. The trigger logic

In `bubbles.ts` add a pure function:

```ts
export function shouldShowBubble(
  distance: number,
  dtSinceLastCheck: number,
  rng: () => number,
): boolean;
```

This returns true when:
- `distance <= 2.5`, AND
- `dtSinceLastCheck >= 8 + rng() * 4` (i.e. 8-12 seconds since
  the last bubble attempt), AND
- `rng() < 0.25`.

The caller is responsible for finding the pairs and passing the
distance. `bubbles.ts` exports a helper:

```ts
export function findClosestPair(
  npcs: ReadonlyArray<{ id: string; position: { x: number; z: number } }>,
  threshold: number,
): [string, string] | null;
```

which returns the closest pair of NPCs whose distance is below the
threshold, or null. The pair is found in O(n^2) — for 13 NPCs
that's 78 distance checks per call, trivial.

### 3. The inter-NPC line list

Export a constant `INTER_NPC_LINES: string[]` with at least 10
starter lines. Tone: IT Crowd / Silicon Valley dry humor, office
banter, complaints about printers, etc. Lines:

```ts
export const INTER_NPC_LINES: string[] = [
  "Did you restart it?",
  "The printer is jammed again.",
  "Standup in 5, be ready.",
  "I'll merge it after lunch.",
  "Slack is down again.",
  "Who broke the build?",
  "Coffee? I just made a fresh pot.",
  "Can you review my PR?",
  "Did the deploy go out?",
  "The wifi is being weird today.",
];
```

10 lines is enough to demonstrate the system. Future work
expands the list.

### 4. The bubble line picker

Export:

```ts
export function pickLine(
  lines: ReadonlyArray<string>,
  rng: () => number,
): string;
```

that returns `lines[Math.floor(rng() * lines.length)]`. Wrap so it
never returns the same line twice in a row — keep a "last line"
in a closure if convenient, or just use `Math.floor(rng() * (lines.length - 1))`
and skip the most-recent index. Simpler is fine for the spec.

### 5. Wire it into the NPC controller

`src/engine/npc-controller.ts` is the per-frame updater. Add
the bubble trigger logic there:

- On each `update(dt)`:
  - Accumulate `dtBubbleCheck`. When `dtBubbleCheck >= 1.0`
    (i.e. once per second), reset the accumulator and call
    `findClosestPair(npcs, 2.5)`.
  - If a pair is found AND `shouldShowBubble(distance, timeSinceLastBubble, rng)`
    is true, pick a line and call `bubbles.show(pos, line)` for
    one of the two NPCs (the one closer to the other, or the
    first one for determinism).
  - Track `timeSinceLastBubble` and reset on show.
- Also: when `bubbles.show` is called, animate the speaker's
  head by a small `±0.2` rad rotation for the duration of the
  bubble. (Optional. Skipping is fine if it complicates things.)

The RNG is `Math.random` for production. The test uses a seeded
RNG. Expose a way to inject the RNG in `createNpcController` (e.g.
a third argument with a default of `Math.random`).

### 6. Tests

Create `tests/unit/bubbles.test.ts`. Use plain vitest. Cover:

- `shouldShowBubble(2.0, 9.0, () => 0.0)` is true (in range, 25%
  chance, hits).
- `shouldShowBubble(2.0, 7.0, () => 0.0)` is false (less than
  8 seconds).
- `shouldShowBubble(2.0, 9.0, () => 0.5)` is false (rng >= 0.25).
- `shouldShowBubble(3.0, 9.0, () => 0.0)` is false (out of range).
- `findClosestPair([{a, pos0}, {b, pos1}, {c, pos2}], 2.5)`
  returns the closest pair (a, b) or (a, c) — depends on
  positions. Use clearly different positions.
- `pickLine(["a", "b", "c"], () => 0.5)` returns "b" (index 1).
- A higher-level test: feed 4 NPCs in a 5x5 area, simulate 20
  seconds of updates, verify the bubble system produces some
  bubbles (count > 0) and the line list is non-empty.

### 7. Constraints

- Do NOT modify the existing `npc-controller.ts` semantically.
  Only ADD the bubble trigger logic on top. (You may add an
  optional `rng` parameter to `createNpcController`.)
- Do NOT add any new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-3-3-bubbles-sol.md`.

## Definition of done

- `src/engine/bubbles.ts` exists with the types, functions, and
  line list above.
- `src/engine/npc-controller.ts` is updated to call `bubbles.show`
  at the right cadence.
- `tests/unit/bubbles.test.ts` exists with at least 7 test cases.
- `pnpm test tests/unit/bubbles.test.ts` passes.
- `pnpm typecheck` passes.
- `pnpm test` (full suite) still passes.
- The brief's report is written.
