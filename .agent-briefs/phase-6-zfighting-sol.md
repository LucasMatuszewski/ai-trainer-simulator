# Phase 6.3 Z-fighting fix - Codex Sol report

## Outcome

Implemented the focused wall-depth fix without changing the main-office wall geometry or material and without adding dependencies.

## Changes

- `src/content/world-layout.ts`
  - Moved the Training Room south wall segments inward (north) and reduced their shared-boundary thickness to 0.28 units.
  - Moved the Meeting Room north wall segments inward (south) and reduced their shared-boundary thickness to 0.28 units.
  - Moved the Kitchen west wall segments inward (east) and reduced their shared-boundary thickness to 0.28 units.
  - Moved the CTO Office west wall segments behind the Kitchen east wall's outer face and reduced their thickness to 0.3 units.
  - The outer faces remain flush at the room boundary, but adjacent wall volumes no longer overlap.
- `src/engine/multi-room.ts`
  - Enabled `polygonOffset` on every solid new-room wall material.
  - Set `polygonOffsetFactor = 1` and `polygonOffsetUnits = 1`.
  - Glass remains on its existing transparent material path.
- `tests/unit/no-zfighting.test.ts`
  - Added six regression tests covering Training Room, Meeting Room, Kitchen, CTO separation, Kitchen/CTO non-overlap, and positive polygon-offset material settings.

## TDD evidence

Before implementation, the focused suite failed 4 of 5 tests: all three main-office shared boundaries were coplanar and wall materials had polygon offset disabled. After implementation, the focused suite passes all 6 tests.

## Verification

- `pnpm exec vitest run tests/unit/no-zfighting.test.ts`: PASS, 6/6.
- `git diff --check`: PASS.
- `pnpm typecheck`: BLOCKED by unrelated concurrent work in `tests/unit/npc-idle-desync.test.ts`; it passes a second argument to `createInitialIdleState`, whose current signature accepts one.
- `pnpm test`: current shared-worktree result is 178 passed, 7 failed. All 6 Z-fighting tests pass. The failures are unrelated concurrent NPC mesh/idle tests in `npc-mesh.test.ts`, `npc-mesh-parenting.test.ts`, `dog-mesh-fixes.test.ts`, and `npc-idle-desync.test.ts`. Earlier in this task, before those new concurrent tests appeared, the full suite passed 177/177.

## Notes

- Existing unrelated dirty-worktree changes were preserved.
- No commit was created.
