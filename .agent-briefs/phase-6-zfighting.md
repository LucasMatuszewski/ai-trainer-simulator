# Phase 6.3 — Fix Z-fighting between room walls (the "bars on the wall" bug)

## Context

Lucas just reported (2026-08-30):

> "colors in the rooms did no fix the issues with these artifacts on
>  the walls. but now we see that the bars/straps of colors are in
>  the color of the other side of the wall, like it would get on the
>  other side in some way! Search for similar issues inside three.js,
>  maybe other people had this issues and solved it already! We don't
>  see this when we enter the game and when the wall was perfectly
>  aligned with camera I guess, but when we move I see it immediatell."

This is the well-known three.js **Z-fighting** (depth-fighting) bug.
Two coplanar surfaces at the same Z position compete for the depth
buffer. When the camera moves, the GPU "wins" different fragments
in different frames, producing animated color bars. The color
that bleeds through is from the OTHER room (the side facing away
from the camera), because the room walls in
`src/engine/multi-room.ts` are single-sided (the back-face is
culled, so the GPU can't even see it — but when two coplanar
walls are at the same Z, the depth buffer ties, and the rasterizer
flips between them every few frames).

This task is a focused fix. The artifacts appear at every room
doorway, where the main-office wall and the new room's wall are
at the same Z (e.g. main office north wall at z = -9, Training
Room south wall at z = -9).

## Files to read

- `src/content/world-layout.ts` — the room layout data. Each
  room has a `floor` AABB and a `walls` AABB array. The doorway
  is implemented as a GAP in the wall AABBs (no wall AABB covers
  the doorway). The two rooms' walls should be at slightly
  DIFFERENT Z positions so the depth buffer always has a clear
  winner.
- `src/engine/multi-room.ts` — the function that creates the
  wall meshes. It probably creates one `BoxGeometry` per AABB.
  The boxes have their own thickness, but if the AABB is at
  z = -9 with thickness 0.1, the wall extends from z = -9.05 to
  z = -8.95. The main-office wall at z = -9 with thickness 0.1
  extends from z = -9.05 to z = -8.95 too — they're at the
  SAME z range.
- `src/engine/scene.ts` — the main-office walls are at
  z = -9.05, z = 8.95, x = -9.05, x = 8.95 (with the doorway
  gaps that the previous Phase 4 task split them into).

## What to deliver

### 1. Push the new rooms' walls slightly inward

The easiest fix: make the new rooms' walls a TINY bit thicker
(say 0.2 instead of 0.1) and position them so their OUTER face
is at the same Z as the main office's wall, but their INNER
face is slightly INSIDE the room. That way the main office's
wall and the new room's wall don't overlap — the new room's
wall sits just behind the main office's wall, in the direction
of the new room.

Concretely, in `src/engine/multi-room.ts`:
- For a north-side room (Training Room, at z = -9), the main
  office's north wall is at z = -9.05. The Training Room's
  south wall should be at z = -8.95 (thickness 0.2, so the
  wall extends from z = -8.85 to z = -9.05, with the OUTER
  face at z = -9.05 matching the main office's wall outer
  face).
- For a south-side room (Meeting Room, at z = 9), the new
  room's north wall should be at z = 8.95.
- For an east-side room (Kitchen and CTO Office, at x = 9 or
  further east), the new room's west wall should be at
  x = 8.95.

Each new room's wall mesh should have its outer face flush
with the main office's wall outer face, and the mesh should
be SLIGHTLY thinner than the main office's wall so they don't
overlap into the new room.

ALTERNATIVELY (simpler and more reliable):
Use `polygonOffset` on the wall materials to push them
slightly toward the camera. Set
`material.polygonOffset = true`,
`material.polygonOffsetFactor = 1`,
`material.polygonOffsetUnits = 1`. This adds a small depth
bias to the wall so it always wins the depth test against
the other room's wall.

Use the polygon offset approach as the primary fix, and ALSO
push the new rooms' walls slightly inward as a belt-and-braces
defense.

### 2. Make the wall meshes double-sided

The "back face culled" interpretation: the wall is one-sided
(`material.side = THREE.FrontSide`). When the camera is in
one room and the wall is coplanar with the other room's wall,
the camera sees the FRONT of the near wall AND the BACK of the
far wall (because the far wall is not actually behind the near
one — they're at the same depth). When the GPU can't decide
which to draw, it draws the wrong one sometimes.

Setting `material.side = THREE.DoubleSide` would make BOTH
sides render. But the better fix is to ensure the walls are
NOT coplanar (item 1 above).

If for some reason the new rooms' walls MUST be coplanar with
the main office's walls, set the new rooms' wall material to
`DoubleSide`. The main office's walls stay `FrontSide` (they
have an inside-facing normal).

### 3. Test it

`tests/unit/no-zfighting.test.ts`:
- The Training Room's south wall's z-position is NOT equal to
  the main office's north wall's z-position (they differ by at
  least 0.1 units, the wall thickness).
- The Meeting Room's north wall's z-position is NOT equal to
  the main office's south wall's z-position.
- The Kitchen and CTO Office's west walls' x-positions are NOT
  equal to the main office's east wall's x-position.
- The new rooms' wall material has `polygonOffset = true` and
  positive `polygonOffsetFactor` and `polygonOffsetUnits`.

### 4. Constraints

- Do NOT modify the existing main office wall positions or
  materials.
- Do NOT add any new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-6-zfighting-sol.md`.

## Definition of done

- No room doorway in the rendered scene exhibits Z-fighting
  (verified by static analysis: the wall AABBs are at distinct
  z/x positions, and the materials have polygon offset enabled).
- The unit test passes.
- `pnpm test` (full suite) still passes.
- The brief's report is written.
