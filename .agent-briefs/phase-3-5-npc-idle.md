# Phase 3.5b — NPC idle animations

## Context

The NPC meshes are now gendered and Burek is a real dog. But the
NPCs are static — they stand still at their desks. Lucas wants
them to feel alive: small idle animations that loop (typing,
stretching, looking around).

This task adds the per-NPC idle animation system. It must integrate
with the existing NPC controller (`src/engine/npc-controller.ts`)
which already updates each NPC's `Object3D` per frame.

## Files to read

- `src/engine/npc-controller.ts` — the per-frame updater.
- `src/engine/scene.ts` — `npcMeshes` is the per-NPC `Object3D` map.
- `src/content/npcs.ts` — NPC data.
- `docs/PRD.md` §13 C-08.

## What to deliver

### 1. New file: `src/engine/npc-idle.ts`

```ts
import type * as THREE from "three";

export interface IdleState {
  /** Time the next animation of a given type will fire. */
  nextTypeAt: number;
  /** Time the next head-look will fire. */
  nextLookAt: number;
  /** The current head-look target yaw (if looking around). */
  currentLookYaw: number | null;
  /** Time the look completes and the head returns to neutral. */
  lookUntil: number;
}

export function createInitialIdleState(now: number): IdleState;

export function updateIdle(
  state: IdleState,
  dt: number,
  npcPosition: { x: number; y: number; z: number },
  npcBaseYaw: number,
  mesh: THREE.Object3D,
  now: number,
  rng: () => number,
): IdleState;
```

The implementation does:

- **Type** (every 4-8s, random within window): the NPC's right
  arm bobs up and down by 0.1m for 0.5-1.5s. Implementation:
  temporarily translate a child mesh called "arm-right" up and
  down. If the mesh has no "arm-right" child, the type animation
  is a no-op (the body just stays still).
- **Stretch** (every 8-15s): the head translates up by 0.1m and
  the body stretches by 0.1m for 1-2s, then returns.
- **Look around** (every 5-10s): the head rotates yaw by ±30°
  for 1-2s, then returns to `npcBaseYaw` (the schedule-driven
  face or the dialogue-overridden face).
- **Sip coffee** (only on NPCs in the "coffee" state, every 6-12s):
  no visual animation in the placeholder mesh (no arm to lift
  a mug); the test mocks the state. Optional for now.
- **Lean back** (every 10-20s): a small backwards lean, simulated
  by tilting the body mesh by 0.05 rad on X. Optional.

For the placeholder meshes, the only animation we can realistically
apply at this level is:
- A small "head bob" — translate the head child mesh on Y by
  ±0.02m at 2 Hz when "typing".
- A small "head turn" — rotate the head child mesh on Y by ±0.3
  rad for 1s when "looking around".

If a child mesh doesn't exist (e.g. meshes are flat), the
animation is a no-op.

### 2. Test it

`tests/unit/npc-idle.test.ts`:
- `createInitialIdleState(0)` returns a state with `nextTypeAt`
  between 4 and 8 seconds from now, `nextLookAt` between 5 and
  10 seconds from now.
- After calling `updateIdle` with `dt = 1.0` for many calls,
  the state evolves: `nextTypeAt` decreases, `nextLookAt`
  decreases. At some point, the head rotation is non-zero
  (the NPC is in the middle of a "look around").
- After enough time, the head rotation returns to 0.
- `currentLookYaw` is null when not looking, and a non-null yaw
  in [-π/3, π/3] (or similar) when looking.

### 3. Wire it into the NPC controller

`src/engine/npc-controller.ts` should call `updateIdle` on each
NPC's mesh during the per-frame update, after the position/face
update from the schedule.

### 4. Constraints

- Do NOT modify the existing NPC controller's existing
  responsibilities (position/face interpolation, walking
  animation). Only ADD the idle call.
- Do NOT add any new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-3-5-npc-idle-sol.md`.

## Definition of done

- `src/engine/npc-idle.ts` exists with `createInitialIdleState` and
  `updateIdle`.
- `src/engine/npc-controller.ts` calls `updateIdle` per NPC per
  frame.
- `tests/unit/npc-idle.test.ts` exists with at least 5 test cases.
- `pnpm test tests/unit/npc-idle.test.ts` passes.
- `pnpm typecheck` passes.
- `pnpm test` (full suite) still passes.
- The brief's report is written.
