# Phase 6.7 — Fix the chest: only on women, smaller, same color as shirt

## Context

Lucas just reported (2026-08-30):

> "OMG.... now some man has brest... and bres has different color
>  than the shirt!!!! fix this!!! and brest should not be that big!!!
>  Some may have smaller, some bigger, but only women!"

The screenshot confirms:

1. The chest mesh is being added to MALE NPCs too. Males should
   not have a chest.
2. The chest color does not match the shirt color — it appears to
   be skin-toned or a different hue, making it visually obvious
   that it's a separate mesh.
3. The chest is too prominent for some NPCs.

## Files to read

- `src/engine/npc-mesh.ts` — the chest-mesh creation code that
  was added in the recent Phase 6.5 female-body-fix task.
- `tests/unit/female-body.test.ts` — the existing female-body
  test that asserts chest presence.
- `tests/unit/npc-mesh.test.ts` — the existing NPC-mesh tests
  that should assert MALE NPCs do NOT have a chest.

## What to deliver

### 1. Restrict the chest to females only

In `src/engine/npc-mesh.ts`, wrap the chest-mesh creation in
`if (gender === "female") { ... }`. The current implementation
probably adds the chest for any gender (it was written before
the gender check was added). Verify by reading the code.

Update the test `tests/unit/female-body.test.ts` to assert the
chest exists for females. Update `tests/unit/npc-mesh.test.ts` to
assert:
- `createNpcMesh("male")` does NOT contain a chest mesh
  (assertion: no child mesh has a name or position matching
  "chest").
- `createNpcMesh("female")` DOES contain a chest mesh.

### 2. Match the chest color to the shirt color

Currently the chest is rendered with the same color as the torso
(skin-tone). Change it so the chest color is the SAME as the
shirt color. Pass the shirt color into the chest-mesh factory
function and use it for both the chest and the shirt.

Update the test to assert:
- The chest mesh's `material.color` is the same as the shirt
  mesh's `material.color`.

### 3. Reduce chest size and add per-NPC variation

Currently the chest radius is 0.13 (a fixed constant). Make it
smaller (default 0.08) and add per-NPC variation:
- Compute a per-NPC chest-size multiplier from a hash of the
  NPC id, in the range [0.7, 1.3]. So some NPCs have a small
  chest (multiplier 0.7, radius 0.056) and some a larger chest
  (multiplier 1.3, radius 0.104). The default is 0.08.
- Only apply this variation to FEMALE NPCs (male NPCs get no
  chest at all).

Update the test:
- Two different female NPCs can have different chest sizes
  (assert the radii differ between at least 2 of 3 sample NPCs).

### 4. Tests

- `tests/unit/female-body.test.ts`:
  - Female has a chest, smaller than before (radius ≤ 0.13).
  - Chest color matches shirt color.
  - Two female NPCs have different chest sizes (probabilistic).
- `tests/unit/npc-mesh-parenting.test.ts`:
  - Male NPC mesh has NO chest child.
  - Female NPC mesh has exactly ONE chest child.

### 5. Constraints

- Do NOT remove or rename the chest field/method.
- Do NOT change the chest position (still on the front of the
  upper torso).
- Do NOT add any new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-6-chest-fix-sol.md`.

## Definition of done

- Only FEMALE NPCs have a chest mesh.
- The chest color matches the shirt color.
- The chest size is smaller (default radius 0.08) and varies per
  NPC (0.7x to 1.3x of the default).
- `pnpm test` (full suite) still passes.
- The brief's report is written.
