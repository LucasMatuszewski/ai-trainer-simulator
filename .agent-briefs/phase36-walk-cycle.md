# Phase 3.6 (part 2): procedural NPC walk cycle

You are implementing part 2 of PRD C-45 (docs/PRD.md section 13 entry C-45; spec sub-section 11.6) for a three.js office-simulator game. Work ONLY on the files listed under "Files you create". Do NOT touch any other file. Do NOT commit or push or run git write commands.

## Context

- Repo: ~/DEV/Projects/ai-trainer-simulator (TypeScript, vitest, three.js). Node at /usr/bin/node; run tests with `./node_modules/.bin/vitest run <file>`, typecheck with `./node_modules/.bin/tsc --noEmit`.
- NPCs are groups built by `src/engine/npc-mesh.ts` with named children (`body`, `arm-left`, `arm-right`, `leg-left`, `leg-right`). The current controller animates a wall-clock bob/sway that runs even when the NPC is not moving (the bug this phase fixes). Your module provides speed-coupled gait angles; the controller integration happens in a LATER part - do not touch the controller.
- READ `src/engine/npc-idle.ts` and `src/engine/npc-controller.ts` (lines ~150-200) for the existing animation style and the constants used (amplitudes, frequencies), and match their code style.

## Files you create

### 1. `src/engine/npc-walk-cycle.ts` (pure function module)

```ts
export interface WalkCycleState {
  /** Total metres travelled since the cycle started (the phase source). */
  distanceTraveled: number;
}

export interface WalkCycleOutput {
  legSwing: number;   // radians, symmetric swing of left/right legs (right = -left)
  armSwing: number;   // radians, counter-phase to legs
  bobAmount: number;  // metres of Y bob, always >= 0
  state: WalkCycleState;
}

export function updateWalkCycle(
  state: WalkCycleState,
  dt: number,
  speed: number,
): WalkCycleOutput;
```

Rules (from the PRD):
- The gait phase is a function of DISTANCE, not wall-clock: `distanceTraveled += speed * dt` (clamped: negative or zero speed MUST NOT advance the phase). Angles derive from `Math.sin(distanceTraveled * radiansPerMetre)` and friends.
- Gait rate: at the default walk speed of 1.2 m/s the leg swing completes 4 full cycles per second (so radiansPerMetre = 2 * Math.PI * 4 / 1.2). Export the reference constants (`DEFAULT_WALK_SPEED_MPS = 1.2`, `GAIT_HZ_AT_DEFAULT = 4`).
- Amplitudes (export as constants): leg swing ~0.6 rad, arm swing ~0.35 rad in counter-phase to the legs, Y bob = `Math.abs(Math.sin(...)) * 0.05` m (never negative).
- When `speed === 0` the cycle is FROZEN: same distances, and the returned angles equal the previous angles (i.e. computed from the unchanged `distanceTraveled`). A later resume continues from the same phase - no snap to zero.
- Pure function: no mutation of the input state (return a NEW state object), no globals, no scene access.
- Negative `dt` or `NaN` inputs: treat as 0 / return frozen output defensively (test this).

### 2. `tests/unit/npc-walk-cycle.test.ts` (WRITE THE TEST FIRST, watch it fail, then implement)

Required assertions (per the plan):
- `speed === 0` with any `dt` -> `distanceTraveled` unchanged, angles identical across repeated calls (frozen);
- `speed = 1.2` integrated over 1 s (e.g. 60 steps of 1/60 s) -> `distanceTraveled ~= 1.2` AND the leg-swing phase completed ~4 full cycles (count sign changes / zero crossings, or compare `sin` phase at start vs end);
- speed 0 for a while, then 1.2, then 0 again -> after the freeze the phase resumes from the stored distance (no discontinuity: output right after resume equals output computed from the pre-freeze distance);
- `bobAmount >= 0` always; negative dt and NaN speed are handled without NaN leaking into any output;
- purity: calling with the same state object twice returns equal outputs and does not mutate the input.

## Definition of done

- Both files exist; `./node_modules/.bin/vitest run tests/unit/npc-walk-cycle.test.ts` GREEN; `./node_modules/.bin/tsc --noEmit` exits 0.
- `git status --short` shows ONLY your two new files. No commits, no pushes.
