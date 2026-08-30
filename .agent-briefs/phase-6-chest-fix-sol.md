# Phase 6.7 chest fix - Codex Sol report

## Delivered

- Kept the `chest` mesh exclusive to the female mesh construction path. Male NPC meshes have no child named `chest`.
- Changed the chest material from the torso/body material to a `MeshLambertMaterial` using the NPC's deterministic `shirtColor`.
- Reduced the base sphere radius from `0.13` to `0.08`.
- Added stable per-NPC size variation derived from the existing NPC-id hash. The multiplier spans `[0.7, 1.3]`, producing radii in `[0.056, 0.104]`.
- Preserved the chest name, position, scale, and external `createNpcMesh` API.

## Tests added/updated

- `tests/unit/female-body.test.ts`
  - chest exists and remains in front of the torso
  - radius is within the specified smaller range
  - chest and shirt material colors match
  - three female NPC ids produce more than one chest radius
- `tests/unit/npc-mesh.test.ts`
  - male has no chest and female has a chest
- `tests/unit/npc-mesh-parenting.test.ts`
  - male has zero chest children
  - female has exactly one chest child

## Verification

- Focused tests: 3 files passed, 17 tests passed.
- `pnpm typecheck`: passed.
- Full `pnpm test`: 29 files passed, 204 tests passed.
- `git diff --check`: passed.
- Mutation check: temporarily restored the old fixed `0.13` radius. The female-body suite failed on both the maximum-size and variation assertions. Restored the implementation and reran the focused suite successfully.

The full suite still emits pre-existing jsdom canvas/localStorage warnings, but exits successfully.

No commit or push was made.
