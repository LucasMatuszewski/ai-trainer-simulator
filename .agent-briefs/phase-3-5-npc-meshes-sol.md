# Phase 3.5a NPC meshes - Codex Sol report

## Delivered

- Added `src/engine/npc-mesh.ts` with `createNpcMesh(gender, paletteIndex?)`.
- Preserved the male low-poly body and added a tie as a distinct detail.
- Added a clearly narrower female silhouette with a shorter torso, long rear hair, and a tapered skirt.
- Added a horizontal low-poly Burek mesh with four named legs, head, snout, ears, eyes, tail, and red collar.
- Retained NPC-indexed shirt and hair palette variation through the optional factory palette index.
- Updated only the minimal NPC construction path in `src/engine/scene.ts`; humanoids retain the 180-degree desk-facing rotation and dogs do not receive that flip.
- Added six unit tests in `tests/unit/npc-mesh.test.ts` covering group structure, humanoid anatomy, gender width difference, dog width, four dog legs, dog head proportions, and floor-level origins.

## Verification

- `pnpm test tests/unit/npc-mesh.test.ts`: PASS - 1 file, 6 tests.
- `pnpm typecheck`: PASS.
- `pnpm test`: PASS - 14 files, 120 tests.

The full test run emits the existing `localStorage is not defined` diagnostic from `src/game/state.ts`, but the affected reducer suite passes. pnpm also emits an existing warning that the `pnpm.onlyBuiltDependencies` package field is ignored by the installed pnpm version.

## Scope and git

- No dependencies added.
- No existing file modified other than `src/engine/scene.ts`.
- Existing unrelated worktree changes were left untouched.
- No commit or push performed.
