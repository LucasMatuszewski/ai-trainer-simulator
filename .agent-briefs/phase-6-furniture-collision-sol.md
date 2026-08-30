# Phase 6.8 furniture collision report - Codex Sol

## Changes made

- Added two filing-cabinet collision AABBs in `src/content/npcs.ts`, matching the visual cabinets at `(8.7, -5)` and `(8.7, 2)`. Their east faces sit at `x = 8.95`, flush with the east-wall edge at `x = 9` within the required tolerance.
- Centralized the filing-cabinet visual placements in `MAIN_OFFICE_FILE_CABINETS`, so scene meshes and placement tests use the same coordinates.
- Replaced the plant that overlapped the south-east vending-machine footprint at `(8.5, 8.5)` with a clear floor plant at `(-6, -8.5)` along the north wall. The north-west plant remains at `(-8.5, -8.5)`.
- Centralized floor-plant placements and their collision radius in `MAIN_OFFICE_PLANTS`.
- Extended `tests/unit/furniture-placement.test.ts` to verify:
  - both filing cabinets are wall-adjacent;
  - visual cabinet centers match their collision AABBs;
  - both plants are floor decorations;
  - neither plant footprint overlaps any obstacle.

## Other free-standing object audit

- Coffee machine: already tucked into the north-east corner.
- Server rack: already tucked into the south-west corner.
- Vending machine: already tucked into the south-east corner.
- Fire extinguisher: already mounted at the east wall.
- Floor lamp: already placed at the west wall.
- Meeting table: intentionally centered and natural for its use.
- Desks and dog bed: intentional workstation positions.

No additional misplaced free-standing objects were found.

## Verification

- `pnpm test`: PASS - 29 files, 199 tests.
- `pnpm typecheck`: PASS.
- Existing jsdom canvas/localStorage warnings remain non-failing and are unrelated to this change.

## Files changed by this task

- `src/content/npcs.ts`
- `src/engine/scene.ts`
- `tests/unit/furniture-placement.test.ts`
- `.agent-briefs/phase-6-furniture-collision-sol.md`

No commit was created.
