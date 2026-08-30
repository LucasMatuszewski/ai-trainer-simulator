# Phase 3.5b NPC idle animations - Codex Sol report

## Implemented

- Added `src/engine/npc-idle.ts` with `IdleState`, `createInitialIdleState`, and `updateIdle`.
- Added randomized typing intervals (4-8 seconds), 0.5-1.5 second typing duration, a 2 Hz head bob, and optional `arm-right` movement when that named child exists.
- Added randomized look intervals (5-10 seconds), 1-2 second look duration, bounded left/right head yaw, and return to neutral.
- Missing named mesh children are handled as no-ops.
- Added per-NPC idle state and post-schedule idle updates to `src/engine/npc-controller.ts`. Walking and hidden NPCs do not receive idle animation updates.
- Added `tests/unit/npc-idle.test.ts` with 6 test cases covering initialization windows, countdowns, look start, look completion, typing bob/reset, and flat meshes.

## Verification

- `corepack pnpm test tests/unit/npc-idle.test.ts`: PASS - 1 file, 6 tests.
- `corepack pnpm test`: PASS - 17 files, 144 tests.
- `corepack pnpm typecheck`: BLOCKED by two pre-existing errors outside this task's permitted edit scope:
  - `src/engine/controls.ts(27,10)`: `OFFICE_BOUNDS` is declared but never read.
  - `src/engine/scene.ts(150,9)`: `wallThickness` is declared but never read.
- `git diff --check`: PASS.

The plain `pnpm` command was not available in the non-interactive shell PATH, so checks were run through the installed Corepack pnpm shim.

## Scope

No existing file other than `src/engine/npc-controller.ts` was modified by this task. Existing unrelated worktree changes were left untouched. No commit or push was made.
