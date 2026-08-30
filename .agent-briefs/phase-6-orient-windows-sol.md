# Phase 6.9 orientation and whiteboard report

## Result

- Rotated both east-wall filing cabinets by `-Math.PI / 2`. Their drawer meshes are on local `+Z`, so this rotation makes the drawers face world `-X`, toward the office center.
- Rotated the server rack by `Math.PI`. Its LED and vent panel is on local `+Z`, so it now faces world `-Z`, into the office from the south-west corner.
- Kept the server rack's existing corrected AABB at `x: [-8.5, -7.5]`, `z: [7.5, 8.5]`. Its center is `(-8, 8)`, 0.5 m from both the west and south office walls, so no further collision-box move was needed.
- Moved the Training Room whiteboard from `x=-7.75` to `x=-7.94`. With its 0.12 m depth, its back face is now exactly at the west wall's inner surface (`x=-8`) instead of floating 0.25 m away. It remains at chest height (`y=1.5`) and inside the Training Room (`z=-14`).
- Added optional `rotationY` support to typed multi-room furniture and applied it when constructing furniture meshes.
- Named filing-cabinet and server-rack groups for easier scene inspection.

## Tests

- Added `tests/unit/furniture-orientation.test.ts` with 3 tests covering cabinet front direction, server corner/front direction, and whiteboard height/bounds/wall mounting.
- Mutation check: temporarily broke one cabinet rotation, the server rotation, and whiteboard height/offset; the new suite failed. Restored the implementation and reran verification.
- `pnpm test`: 30 files passed, 207 tests passed.
- `pnpm typecheck`: passed.
- `git diff --check`: passed.

The test run still prints pre-existing jsdom canvas and `localStorage` warnings, but exits successfully.

## Files changed for this task

- `src/content/npcs.ts`
- `src/engine/scene.ts`
- `src/content/world-layout.ts`
- `src/engine/multi-room.ts`
- `tests/unit/furniture-orientation.test.ts`
- `.agent-briefs/phase-6-orient-windows-sol.md`

No commit was created.
