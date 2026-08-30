# Phase 6.9 — Orient file cabinets + server + fix the floating whiteboard
            + move server to corner

## Context

Lucas just reported (2026-08-30):

> "you should rotate these file darwers so thay stand with
>  drawers to the center of the office. the server is also in a
>  wrong orientation, we should rotate it.
>  And what is this strange white flat objec in the middle of the
>  window, flying???
>  server also should be moved closer to the corner and rotated."

The screenshot confirms:

1. Two file cabinets with their drawer fronts facing AWAY from
   the center of the office. They should face INWARD so the user
   can "open" the drawers visually (and so the design feels
   intentional).
2. The server rack (or some other tall object) is also misrotated
   AND not tucked into the corner. It should be moved closer to a
   wall and rotated to face the office.
3. There's a strange white flat object floating outside the
   window. It looks like a "whiteboard" mesh that escaped the
   room bounds and is now floating in the skybox.

## Files to read

- `src/engine/scene.ts` — the functions that create the file
  cabinets and the server rack. Find them (likely
  `makeFilingCabinet` and `makeServerRack` or similar).
- `src/engine/multi-room.ts` — the Training Room has a whiteboard
  mesh. The user can see it through the window of the
  meeting room. Verify the whiteboard's position is INSIDE the
  Training Room and is not floating in the sky.

## What to deliver

### 1. Orient the file cabinets correctly

In `src/engine/scene.ts`, the file cabinet mesh's `rotation.y`
should be set so the drawer fronts face the center of the office.
If the cabinet is on the east wall (x = 8.25), the drawer fronts
should face west (rotation.y = 0 or π, depending on which side
the drawers are on). If the cabinet is on the west wall
(x = -8.25), the drawer fronts should face east (rotation.y = 0
or π). Pick a rotation so the drawers face INTO the office.

For a cabinet on the west wall with drawers that open toward
the east, set `rotation.y = 0` (the cabinet's "front" face is its
+X side, which after the rotation points east into the office).
For a cabinet on the east wall with drawers opening toward the
west, set `rotation.y = π` (so the +X side of the cabinet now
points west into the office).

Verify by looking at the actual cabinet mesh. If the cabinet
is a `BoxGeometry` of size (w, h, d), the "front" face is the
face that has the drawer handles or the recessed panel. Find
out which face that is in the mesh and rotate the cabinet so that
face points toward the office center.

### 2. Orient the server rack AND move it to a corner

The server rack should have its front panel (where the LEDs and
disk bays are) facing the user. Move the rack CLOSER TO A WALL
(it should not be floating in the middle of the room). Pick a
corner (e.g. the south-west corner of the office, near
(-7.5, 0, 7.5)).

The "front" of the server rack in the existing mesh is probably
the +X face (where the LEDs are drawn as a small grid pattern).
Set `rotation.y = π/2` so the rack's +X face points NORTH (into
the office) when the rack sits in the south-west corner.

Update the `OBSTACLES` entry for `server-rack` in
`src/content/npcs.ts` to match the new position and AABB. The
previous AABB was `{ minX: -8, maxX: -7, minZ: 7, maxZ: 9 }` (1×2,
centered at (-7.5, 0, 8)). If you keep the rack at x = -7.5 but
move it to z = 7.5 (closer to the wall, so the rack is now at
x = -7.5, z = 7.5 with a small AABB), the new AABB is
`{ minX: -8, maxX: -7, minZ: 7, maxZ: 8 }` (1×1, centered at
(-7.5, 0, 7.5)). Adjust the AABB to match the new visual
mesh's bounds.

### 3. Fix the floating whiteboard

The Training Room's whiteboard mesh is escaping the room
bounds. Likely the whiteboard's position in
`src/content/world-layout.ts` or in `src/engine/multi-room.ts`
is set to a Y that's too high (e.g. y = 5 instead of y = 1.5).

Find the whiteboard mesh in the multi-room code. Verify:
- Its X, Y, Z position are INSIDE the Training Room's floor
  AABB.
- The Y position is around 1.5 (chest height) so it sits on
  the wall like a real whiteboard.
- It is NOT a child of a "floating in the air" object. Make sure
  it's mounted on a specific wall (the front or back wall of
  the Training Room).

If the whiteboard is just a free-floating plane with no parent
constraint, give it a parent that anchors it to the wall. The
simplest way: explicitly set the whiteboard's position to a known
wall location and use a fixed `rotation.y` to face the room's
center.

Update the test:
- The whiteboard's Y position is between 0.5 and 2.5 (chest
  height, mounted on a wall).
- The whiteboard's X, Z position is within the Training
  Room's floor AABB (or within the wall AABB that the whiteboard
  is mounted on).

### 4. Tests

`tests/unit/furniture-orientation.test.ts`:
- Each file cabinet's `rotation.y` is either 0 or π (or some
  small offset from those — e.g. ±10°), not 90° / 270°.
- The server rack's `rotation.y` is also 0 or π.
- The server rack's AABB center is within 0.5 units of a wall
  (i.e. it is at a corner, not in the middle of the room).
- The whiteboard's Y position is in [0.5, 2.5].
- The whiteboard's X, Z position is within the Training Room's
  floor AABB.

### 5. Constraints

- Do NOT change the existing main office walls or NPC positions.
- Do NOT add any new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-6-orient-windows-sol.md`.

## Definition of done

- File cabinets face the office center.
- Server rack is in a corner (not in the middle) and faces the
  office center.
- Whiteboard is on a wall inside the Training Room, not floating.
- Tests pass.
- The brief's report is written.
