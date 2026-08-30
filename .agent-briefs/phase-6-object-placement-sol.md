# Phase 6.6 object placement report

## Diagnosis

The coffee machine and server rack mesh factories were not offset. `scene.ts`
derives each mesh center and footprint directly from its `OBSTACLES` AABB, then
sets the group position to that center. The AABBs themselves left a 1 m gap from
one or both adjacent office walls.

The vending machine used the same free-standing footprint pattern. The plants,
filing cabinets, fire extinguisher, and floor lamp also sat noticeably inward
from their intended wall or corner positions.

## Changes

- Moved the coffee-machine AABB to `x=7.5..8.5`, `z=-8.5..-7.5`, centered at
  `(8, -8)` in the north-east corner.
- Moved the server-rack AABB to `x=-8.5..-7.5`, `z=7.5..8.5`, centered at
  `(-8, 8)` in the south-west corner. Its footprint is now 1 x 1 m, matching a
  1 m wide, 2 m tall, 1 m deep rack.
- Moved the vending-machine AABB to `x=7.5..8.5`, `z=7.5..8.5`, centered at
  `(8, 8)` in the south-east corner.
- Tucked both plants into corners, both filing cabinets and the fire
  extinguisher against the east wall, and the floor lamp against the west wall.
- Added `tests/unit/furniture-placement.test.ts` covering the coffee machine and
  server rack wall clearances.

No walls or NPC positions were changed by this task. Existing unrelated edits
were preserved. No dependency was added. No commit was created.

## Verification

- Red check before implementation: focused regression suite failed both tests,
  each reporting the original 1 m wall gap.
- Focused regression suite after implementation: 2 tests passed.
- TypeScript: `tsc --noEmit` passed.
- Full Vitest suite: 29 files passed, 196 tests passed.

The shell did not expose `pnpm` through its normal non-interactive PATH, and nvm
initialization exited with code 3. Verification therefore used the same local
project binaries directly with `/usr/bin/node`. The full suite emitted existing
jsdom canvas/localStorage warnings but had no failures.
