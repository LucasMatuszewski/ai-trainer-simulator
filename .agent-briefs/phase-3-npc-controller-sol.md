# Phase 3.1 NPC controller - Codex Sol report

## Delivered

- Added `src/engine/npc-controller.ts` with:
  - `createNpcController`
  - two-second period-transition interpolation
  - shortest-path yaw interpolation with angle wrapping
  - walking head bob and body sway
  - `gone-home` visibility handling
  - arriving-from-home snap behavior
  - first-frame snap to the current period
  - `destroy()` guard
  - exported pure helpers `shortestPathYaw`, `interpPosition`, and `interpolate`
- Added `tests/unit/npc-controller.test.ts` with 11 tests covering yaw,
  position clamping/interpolation, schedule endpoints, midpoint, and state.
- Minimally updated `src/engine/scene.ts` to expose a typed NPC `Object3D`
  record, construct the controller, and register its update callback.

## Integration note

`src/content/npc-schedule.ts` was available, so no mock schedule was needed.

The brief expected an exported `getCurrentPeriod()` in
`src/game/pacing.ts`, but that module currently exports only pacing constants.
The task explicitly prohibited modifying existing files other than
`src/engine/scene.ts`, so `buildOfficeScene` now accepts an optional period
getter and defaults to `morning` to preserve all existing callers. Final live
integration must pass a getter backed by the current `GameState.timeOfDay`
from `main.ts`; that is a separate task because `main.ts` was outside this
task's allowed edit scope.

## Verification

- `corepack pnpm test tests/unit/npc-controller.test.ts`: PASS, 11/11 tests.
- `corepack pnpm test`: PASS, 11 files and 102/102 tests.
- `corepack pnpm typecheck`: BLOCKED by an unrelated existing/concurrent
  error in `tests/unit/dialogue-state.test.ts:38`: its NPC fixture is missing
  the newly required `gender` property. No controller-related TypeScript error
  was reported before compilation stopped on that fixture.

The initial plain `pnpm` invocation was unavailable in the non-interactive
shell. The documented nvm bootstrap exited with code 3 and no output, so the
successful checks used the installed Corepack shim.

## Scope compliance

- No dependencies added.
- No existing file changed except `src/engine/scene.ts`.
- No commit or push performed.
