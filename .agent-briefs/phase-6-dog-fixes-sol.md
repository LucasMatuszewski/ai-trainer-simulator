# Phase 6.4 dog fixes - Codex Sol report

## Delivered

- Reoriented the dog body along the Z axis so its silhouette matches its +Z facing direction.
- Put the dog head at the front (+Z), the tail at the back (-Z), and moved the front/back legs to matching Z positions.
- Rebuilt the dog head as a named `THREE.Group`. The skull, snout, both ears, and both eyes are local children, so head bob/look animation carries the complete face.
- Rebuilt male and female heads as named `THREE.Group` objects. Head mesh, eyes, and all hair pieces are local children.
- Added humanoid arm meshes so the idle system has named arm parts available for present and future animation.
- Made initial idle schedules deterministic per NPC id with a stable string hash and seeded PRNG. Different ids receive different schedules; the same id reproduces the same schedule.
- Passed each NPC id from `npc-controller.ts` into idle-state initialization.
- Added three animation variants:
  - dog tail wag, with a stable per-NPC phase;
  - ear twitch on meshes that have named ears;
  - timed body bounce/squash for any mesh with a named body.

## Tests

Added:

- `tests/unit/dog-mesh-fixes.test.ts`
- `tests/unit/npc-mesh-parenting.test.ts`
- `tests/unit/npc-idle-desync.test.ts`

Extended:

- `tests/unit/npc-mesh.test.ts`
- `tests/unit/npc-idle.test.ts`

TDD red state was confirmed before implementation: 7 focused regression assertions failed for the ungrouped heads, detached parts, and nondeterministic idle schedule. After implementation:

- `pnpm typecheck`: PASS
- `pnpm test`: PASS, 25 files and 187 tests

The full suite emits existing non-fatal jsdom canvas and missing-localStorage warnings, but exits successfully.

## Scope and repository state

- No dependency added.
- No existing test removed.
- No commit or push performed.
- Pre-existing unrelated worktree changes were preserved and not edited.
