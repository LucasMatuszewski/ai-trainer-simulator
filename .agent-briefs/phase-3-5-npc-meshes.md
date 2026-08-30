# Phase 3.5a — Replace the placeholder NPC mesh with gendered bodies + a real dog

## Context

We are building AI Trainer Simulator. Today every humanoid NPC is a
single colored box (see `src/engine/scene.ts` `makeNpcMarker` around
line 997). Lucas reported (2026-08-29):

> "Women looks same as man, no difference at all."

There is also a dog character, Burek, who currently looks exactly like
a man. This task replaces the placeholder mesh with:

1. Two gendered humanoid bodies (male and female), each clearly
   distinguishable by silhouette. The body parts stay simple
   low-poly so the retro pixel-art look is preserved.
2. A real (still low-poly) dog mesh for Burek, also clearly
   distinguishable from the human bodies by silhouette.

The `NPC` interface already has a `gender: "male" | "female" | "dog"`
field (added in a previous commit). This task uses it.

## Files to read

- `src/types.ts` — `NPC` interface has the `gender` field.
- `src/content/npcs.ts` — every NPC has a gender assigned.
- `src/engine/scene.ts` — `makeNpcMarker` (the function to replace).
  `buildOfficeScene` calls it once per NPC and stores the result in
  `sceneObjects.npcMeshes`.
- `src/engine/controls.ts` — the convention for `rotation.y`: yaw=0
  means facing -Z (the player's "north"). The body forward vector
  for a yaw θ is (-sin θ, 0, -cos θ).

## What to deliver

### 1. New file: `src/engine/npc-mesh.ts`

A factory `createNpcMesh(gender: "male" | "female" | "dog"): THREE.Group`
that returns a `THREE.Group` containing the body parts for that
gender. The group has its origin at the NPC's feet (y=0) and is
intended to be placed at `(npc.x, 0, npc.z)` with `rotation.y = npc.face`.

Use simple low-poly shapes (`BoxGeometry`, `SphereGeometry`,
`CylinderGeometry`) with `MeshLambertMaterial` in a small palette of
NPC colors (the current code already uses a body color indexed by
NPC). Keep poly count low — the player is far from most NPCs in the
480x270 internal buffer.

#### Male body (and current default)

Currently the male body is:
- body: 0.6 × 1.0 × 0.4 box, color from NPC palette, y=0.5
- belt: 0.62 × 0.08 × 0.42 box, dark grey, y=0.45
- head: 0.5 × 0.5 × 0.5 box, skin tone, y=1.25
- hair: 0.52 × 0.18 × 0.52 box, hair color, y=1.55
- eyes: two 0.06 × 0.06 × 0.01 boxes, black, y=1.3
- legs: two 0.18 × 0.3 × 0.3 boxes, dark color, y=0.15

Keep the male body the same. Add a small detail that distinguishes
it visually — for example, a tie or a slightly different head
proportion. The point of this task is the FEMALE body, not the male.

#### Female body — clearly different silhouette

The female body should be:
- narrower shoulders: body width 0.45 (was 0.6) — that's the
  biggest silhouette difference.
- slightly shorter torso: body height 0.85 (was 1.0).
- same leg height and head as male.
- add a "hair" mesh that is longer, reaching down to the shoulders
  (y around 1.0 to 1.7) — this is the visual cue that the player
  has been asking for.
- optional: add a "skirt" or "dress" mesh around the legs
  (e.g. a wider box around y=0.4 to y=0.7 that is wider at the
  bottom). A simple cone or a tapered box works.

The female body should be obviously female by silhouette from a
distance. Use the same color palette indexed by NPC id (so the
NPCs' shirts / accents are still differentiated).

#### Dog body (Burek)

The dog is on all fours. Use:
- body: 1.0 × 0.5 × 0.4 box, light brown (#c4a060), y=0.4
- head: 0.5 × 0.4 × 0.4 box, same brown, at the front (z = body.z + 0.4), y=0.55
- snout: 0.2 × 0.2 × 0.25 box, slightly darker, attached to the front
  of the head, y=0.45
- ears: two 0.1 × 0.2 × 0.05 boxes on top of the head, slightly
  back from the snout, y=0.75
- eyes: two 0.05 × 0.05 × 0.01 boxes, black, y=0.6
- legs: four 0.1 × 0.4 × 0.1 boxes, slightly darker brown, y=0.2
- tail: 0.1 × 0.1 × 0.3 box, attached to the back of the body (z = body.z - 0.4), y=0.5

The dog has a special collar — a thin red box around the neck area.

The dog should be obviously a dog from a distance: 4 legs, body
parallel to the ground, tail, snout. NOT a humanoid.

### 2. Update `src/engine/scene.ts`

Replace the inline mesh construction in `makeNpcMarker` with a
call to `createNpcMesh(npc.gender)`. The NPC color palette and the
existing yaw rotation (180° to face the monitor) stay the same.

Also: NPCs with `gender === "dog"` should NOT have the 180° yaw
flip — they should face whatever direction their schedule sets.

### 3. Tests

Create `tests/unit/npc-mesh.test.ts`. Use plain vitest. Tests:

- `createNpcMesh("male")` returns a `THREE.Group` with at least
  the same number of child meshes as the current male body.
- `createNpcMesh("female")` returns a `THREE.Group`. The body
  mesh (a `THREE.Mesh` with a `BoxGeometry` and `MeshLambertMaterial`)
  has a `BoxGeometry.parameters.width` strictly less than the
  male body's width (this is the silhouette difference).
- `createNpcMesh("dog")` returns a `THREE.Group`. The body
  mesh's `BoxGeometry.parameters.width` is greater than 0.7
  (because the dog body is wider than the humanoid body — a
  horizontal sausage). And there are at least 6 child meshes
  (body, head, snout, 2 ears, 2 eyes — or 4 legs, body, head, etc.).
  Verify the presence of at least 4 leg meshes (4 legs, the dog
  is on all fours).
- The male and female bodies should both contain a head, a
  body, two leg meshes, two eye meshes.
- The dog group should NOT contain a head mesh with the same
  proportions as a human (e.g. width < 0.6, height < 0.6).

Use `THREE` from `three` to construct a `Scene` and inspect
`mesh.geometry.parameters` etc. (`box.parameters.width`).

### 4. Constraints

- Do NOT modify `src/types.ts` or `src/content/npcs.ts` or any test
  file other than the new one.
- Do NOT change the existing `npcId → mesh` map structure or
  destroy the existing `npcMeshes` interface. Only change the
  contents of the meshes.
- Do NOT add any new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-3-5-npc-meshes-sol.md`.

## Definition of done

- `src/engine/npc-mesh.ts` exists with `createNpcMesh(gender)`.
- `src/engine/scene.ts` uses the new factory.
- `tests/unit/npc-mesh.test.ts` exists with at least 5 test
  cases covering: male body has expected child count, female
  body has narrower body, dog body has wider body and 4+ legs,
  and the silhouettes are distinguishable.
- `pnpm test tests/unit/npc-mesh.test.ts` passes.
- `pnpm typecheck` passes.
- `pnpm test` (full suite) still passes.
- The brief's report is written.
