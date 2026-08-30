# Phase 3.1 — NPC controller (per-frame interpolator between schedule entries)

## Context

We are building AI Trainer Simulator. The office has 13 NPCs. A
deterministic per-period schedule is being implemented in parallel
(this file is `src/content/npc-schedule.ts` — being written by
another agent). This task is the RUNTIME that consumes the schedule
and interpolates each NPC's position over time, so NPCs visibly
walk from their morning position to their afternoon position when
the period rolls over.

The current code in `src/engine/scene.ts` `makeNpcMarker()` places
each NPC at a fixed position once at scene-build time. This task
replaces that with a per-frame updater that knows the current
period and smoothly interpolates the NPC's position and yaw from
the previous period's entry to the current period's entry.

## Files to read

- `src/content/npcs.ts` (NPC data, OBSTACLES, OFFICE_BOUNDS)
- `src/content/npc-schedule.ts` (schedule data, written by another
  agent — it may not exist when you start; wait for it or read it
  if available)
- `src/engine/scene.ts` (current NPC marker creation, around line
  997-1060, `makeNpcMarker` and the per-NPC sceneObjects.updatables
  wiring)
- `src/engine/collision.ts` (AABB collision; NPC walking should
  pass through the same collision logic the player does, so NPCs
  don't walk through desks or walls)
- `src/game/pacing.ts` (Period type and `getCurrentPeriod()` helper
  — this is what tells us which schedule entry to use RIGHT NOW)

## What to deliver

### 1. New file: `src/engine/npc-controller.ts`

This module exposes one main function: `createNpcController`.

```ts
import * as THREE from "three";
import {
  NPC_SCHEDULES,
  type NpcState,
  type Period,
  type ScheduleEntry,
} from "../content/npc-schedule";

export interface NpcController {
  /** Per-frame update. Call from `frame()` after the player's
   *  update but before the render. Reads the current period from
   *  `getCurrentPeriod()`, smoothly interpolates each NPC's
   *  position and yaw from the previous period's entry to the
   *  current period's entry, and animates a "walking" state
   *  (head bob, body sway) while in transit. */
  update: (dt: number) => void;

  /** Destroy all listeners / timers. Call from the scene's
   *  dispose handler. */
  destroy: () => void;
}
```

### 2. Interpolation rules

For each NPC:

- At a period boundary, snap to the previous period's position
  for `interpDuration` seconds, then linearly interpolate to the
  current period's position over the next `interpDuration` seconds.
- `interpDuration` is 2.0 seconds (NPC walks between waypoints
  for 2 seconds, regardless of the actual distance — speed scales
  with distance). This matches the spec in the plan: 2-second
  walk between waypoints.
- The NPC's `face` (yaw) is also interpolated, taking the
  shortest-path between the two yaws (handle the wrap at ±π).
- During the interpolation, the NPC's `state` becomes `"walking"`.
  When the interpolation completes, the NPC's state becomes the
  current period's `state` (e.g. `"at-desk"`, `"coffee"`,
  `"meeting"`, `"gone-home"`).
- NPCs with `state === "gone-home"` are NOT rendered (the
  `Object3D.visible = false`). All other states are visible.

### 3. The `Object3D` per NPC

The scene's `buildOfficeScene` function already creates an
`Object3D` per NPC and stores it in the `updatables` array (see
`src/engine/scene.ts` `makeNpcMarker`). The controller takes
those same `Object3D`s and mutates `position` and `rotation.y` per
frame.

You may need to refactor the scene slightly to expose the NPC
`Object3D`s to the controller. Two options:

**Option A (preferred):** Have `buildOfficeScene` return a
`Record<NpcId, THREE.Object3D>` in addition to the existing
`SceneObjects` interface. The controller then takes both the
scene's `SceneObjects` (for the OBSTACLES and OFFICE_BOUNDS it
needs for collision) and the `Record<NpcId, Object3D>`.

**Option B:** Add the controller to `SceneObjects.updatables` and
have the controller itself reach into the scene to find the NPC
markers. Messier; avoid this.

Go with **Option A**.

### 4. Step-by-step implementation

```
NpcController.update(dt):
  currentPeriod = getCurrentPeriod()
  for each NPC id:
    currentEntry = NPC_SCHEDULES[id][currentPeriod]
    previousEntry = NPC_SCHEDULES[id][previousPeriod]

    # Determine the "transition progress" from 0 to 1.
    # progress = 0 means: at previousEntry (still in previous period).
    # progress = 1 means: at currentEntry (fully in current period).
    # Linear interpolation between them.
    progress = clamp((now - periodStartTime) / interpDuration, 0, 1)

    if state was "gone-home" and is now "at-desk":
      # The NPC just arrived. Snap to currentEntry position.
      ...
    else:
      # Linear interpolation:
      pos = lerp(previousEntry.position, currentEntry.position, progress)
      face = shortestPathYaw(previousEntry.face, currentEntry.face, progress)
      state = progress < 1 ? "walking" : currentEntry.state
      apply to Object3D: position = pos, rotation.y = face, visible = state != "gone-home"
```

### 5. Period boundary detection

The controller tracks the last seen period. When `currentPeriod`
differs from the last seen period, the controller resets the
transition timer (so the NPC smoothly walks from the previous
period's position to the new current period's position).

This means the controller needs to be initialized with a "previous
period" and a transition timer. On the first frame, treat the
NPC as already at the current period's entry (progress = 1) — no
animation. After that, watch for period changes.

### 6. Collision during walking

NPCs are not players. They do not need to follow the exact same
collision rules. Simplest: when interpolating, do a straight line.
If the line passes through a desk, that's OK — the NPC appears
to "phase through" for the 2-second transition. Future work
can add pathfinding. For now, straight-line interpolation is fine.

### 7. Tests

Create `tests/unit/npc-controller.test.ts`. Use plain vitest
(no DOM). Test these pure helpers (extracted into the controller
module so they are testable):

- `shortestPathYaw(from, to, t)`: returns the angle along the
  shortest path from `from` to `to` at progress `t` in [0, 1].
  Test cases:
  - `from = 0, to = π, t = 0.5` → π/2 (straight-line through 0
    would be π, but the shortest path is the other way around
    through -π, so the answer is -π/2 or +π/2 depending on
    convention).
  - `from = 0.9π, to = -0.9π, t = 0.5` → π or -π (the wrap
    point: going through π or going through -π is the same
    distance, so the helper picks one).
  - `from = 0, to = 0, t = 0.5` → 0 (no change).
  - `from = π/4, to = -π/4, t = 0` → π/4.
  - `from = π/4, to = -π/4, t = 1` → -π/4.
  - The helper must clamp the result to [-π, π] (or [-2π, 2π]).

- `interpPosition(a, b, t)`: linear interpolation between two
  `{x, y, z}` points. Test cases: t=0 returns a; t=1 returns b;
  t=0.5 returns the midpoint; values are clamped to [0, 1].

- A higher-level test: `interpolate(id, fromPeriod, toPeriod,
  transitionProgress)` returns the right position and yaw for the
  NPC at the given progress. Use this to assert that:
  - At progress 0, the NPC is exactly at `fromEntry.position`.
  - At progress 1, the NPC is exactly at `toEntry.position`.
  - At progress 0.5, the NPC is at the midpoint (within 0.01
    tolerance).
  - The state at progress < 1 is `"walking"`, at progress 1 is
    the toEntry.state.

### 8. Integration in `src/engine/scene.ts`

Modify `buildOfficeScene` to:
1. Build the per-NPC `Object3D` map (return it from the function).
2. Construct a `createNpcController(npcs, npcMeshes, sceneObjects,
   getCurrentPeriod)` and push `controller.update` to
   `sceneObjects.updatables`.

This is a small refactor. Keep the `SceneObjects` interface
backward compatible.

### 9. Add to `src/game/pacing.ts` if needed

Check that `getCurrentPeriod()` is exported. It should already be
there (it was in Phase 0). If not, add it.

## Constraints

- Do NOT modify `src/content/npcs.ts` (the NPC data) or
  `src/content/npc-schedule.ts` (the schedule data — being written
  by another agent in parallel; just READ it).
- Do NOT add any new keys to OBSTACLES.
- Do NOT change the player's controls.
- Do NOT add any new dependencies.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-3-npc-controller-sol.md`.

## Definition of done

- `src/engine/npc-controller.ts` exists with `createNpcController`
  and the extracted pure helpers (`shortestPathYaw`, `interpPosition`,
  `interpolate`).
- `tests/unit/npc-controller.test.ts` exists with at least 8 test
  cases covering both pure helpers and the integration test.
- `src/engine/scene.ts` is refactored minimally to construct the
  controller and push it to `updatables`.
- `pnpm test tests/unit/npc-controller.test.ts` passes.
- `pnpm typecheck` passes.
- The full test suite still passes (`pnpm test`).
- The brief's report is written.
