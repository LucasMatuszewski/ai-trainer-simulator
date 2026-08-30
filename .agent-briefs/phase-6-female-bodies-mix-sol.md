# Phase 6.5 female bodies, clothing, and desk mix - Sol report

## Delivered

- Fixed female geometry in `src/engine/npc-mesh.ts`:
  - arm roots moved from `x = +/-0.38` to `x = +/-0.22`;
  - torso widened from `0.45` to `0.5`;
  - removed the always-on oversized lower-body cylinder;
  - added a subtle radius-`0.13` chest sphere, flattened with scale to avoid exaggeration;
  - optional skirts now taper from `0.45` wide at the hips to `0.35` wide at the hem.
- Added deterministic per-NPC clothing derived from NPC id:
  - optional shirt with one of five colors;
  - no lower garment, trousers, or a female-only tapered skirt;
  - optional dark shoes;
  - clothing metadata is exposed on `group.userData.clothing` for deterministic tests.
- Updated `src/engine/scene.ts` to pass `npc.id` into `createNpcMesh`.
- Mixed NPCs across office sides in `src/content/npcs.ts` using the brief's swaps:
  - Klaudia/Tomek, Ania/Janusz, and Kasia/Marek.
  - Both male and female NPCs now have representatives on negative and positive X.
- Kept furniture and `src/content/npc-schedule.ts` unchanged, as required by the constraints.

## Tests added

- `tests/unit/female-body.test.ts` - arm attachment, torso width, subtle chest geometry.
- `tests/unit/npc-clothing.test.ts` - cross-NPC variation and repeat-call determinism.
- `tests/unit/npc-positions.test.ts` - mixed genders on both sides and unique positions.

## Verification

- `pnpm typecheck`: pass.
- Full `pnpm test`: pass, 28 files and 194 tests.
- Focused new tests after final restoration: pass, 3 files and 7 tests.
- `git diff --check`: pass.
- Mutation check: changed female arm offset from `0.22` to `0.30`; the arm attachment test failed as expected. Restored `0.22`; focused suite passed.

Existing jsdom canvas warnings and the reducer's handled `localStorage` warning were printed by the full suite, but did not fail any tests.

No dependencies were added. No commit or push was made.
