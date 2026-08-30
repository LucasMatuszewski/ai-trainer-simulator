# Phase 6.2 — Move the "SHIP IT!" sign to a wall + fix the wall-stripe artifact

## Context

Lucas just reported (2026-08-30):

> "another training/conference/meeting room has the SHIP IT! sign in
>  the center of the entrance! We should move it on the wall on the
>  right! and we also have this artifact on the wall, like some
>  bars/lines, strange and moving when we walk, bad UX and design,
>  looks horrible"

The screenshot confirms:

1. The "SHIP IT! or don't, your call" sign (a `CanvasTexture` plane)
   is floating in mid-air at the entrance of one of the new rooms
   instead of being mounted on a wall.
2. The walls have vertical-stripe artifacts that move (sliding)
   when the player walks. This is a UV-stretching / texture-repeat
   issue on the wall meshes.

This task fixes both.

## Files to read

- `src/content/world-layout.ts` — the room layout data. Each room
  has a `signs` array with `{ text, position, face, color }`
  entries. The "SHIP IT!" sign is one of these. The position
  `(x, y, z)` and `face` (yaw) need to be corrected so the sign
  is mounted flat on a wall.
- `src/engine/multi-room.ts` — the function that renders the
  signs. It probably uses a `PlaneGeometry` placed at the sign's
  position with `rotation.y = sign.face`. To mount on a wall
  correctly, the plane should be `rotation.y = sign.face + π/2`
  (so the plane's normal faces INTO the room, away from the wall).
- `src/engine/scene.ts` — the main office has similar walls. The
  texture-repeat / UV-stretch issue is likely there too, just
  less obvious. The fix is the same.

## What to deliver

### 1. Move the SHIP IT! sign to a wall

Find the sign in `src/content/world-layout.ts` (it's labeled
"SHIP IT!" or similar). Reposition it so it sits flat on a
specific wall, in the right-side area of the doorway. The
exact new position and face are determined by which room
the sign is in. Look at the room's `floor` AABB, find a
right-side wall, place the sign on it. The `y` should be about
1.5m (eye level for the player) and the sign should face
inward (face = wall normal + π).

The fix is data-driven: just update the sign's `position`,
`face`, and (if needed) the room. The render code in
`multi-room.ts` should already handle mounting a sign on a
wall correctly as long as `face` points OUT of the wall
(i.e. the sign's normal faces into the room).

If `multi-room.ts` is currently doing the wrong rotation
(face points INTO the wall instead of OUT of it), fix that
too. The PlaneGeometry's default normal is +Z. To mount on
the north wall (z = minZ) facing inward (toward +Z), use
`rotation.y = π`. For the east wall (x = maxX) facing inward
(toward -X), use `rotation.y = -π/2`. For the south wall
(z = maxZ) facing inward (toward -Z), use `rotation.y = 0`.
For the west wall (x = minX) facing inward (toward +X), use
`rotation.y = π/2`.

### 2. Fix the wall-stripe / UV-stretch artifact

The wall texture is repeating on the wall meshes. If the wall
is 3m tall and 5m wide, but the texture is configured to repeat
once per meter, the player sees the texture stretched or tiled
depending on the mesh UV setup. The artifact Lucas sees
"moving when we walk" is almost certainly the texture
projection shifting as the camera moves (because the texture
is being mapped via screen-space or the UVs are not anchored).

Fix:
- In `src/engine/scene.ts` (and any other place that creates wall
  meshes), set the wall texture's `wrapS = wrapT = THREE.RepeatWrapping`.
- Set the texture's `repeat.set(repeatX, repeatY)` to a value
  that gives ~1 tile per meter. For a 3m tall, 5m wide wall,
  use `repeat.set(2.5, 1.5)` so the wallpaper looks natural.
- Make sure the texture's `colorSpace` is set to
  `THREE.SRGBColorSpace` (otherwise the wallpaper looks washed
  out).
- For the new rooms, apply the same fix in `multi-room.ts`.

If the wall mesh is shared across rooms (one big mesh per
material), the same texture is used everywhere, so the fix
only needs to happen once. If each wall is its own mesh, fix
the material setup in the helper that creates walls.

### 3. Tests

`tests/unit/signs-and-walls.test.ts`:
- The "SHIP IT!" sign's `position` is now ON a wall (e.g. the
  sign's x or z matches the wall's x or z within 0.5 units), NOT
  in the middle of a doorway.
- The "SHIP IT!" sign's `face` is `face_wall + π` (the sign
  faces into the room, not into the wall).
- The wall material is set with `wrapS = wrapT = RepeatWrapping`.
- The wall texture's `repeat.x > 0` and `repeat.y > 0`.

### 4. Constraints

- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-6-signs-and-artifacts-sol.md`.
- You may modify the existing files (multi-room.ts, scene.ts,
  world-layout.ts) to fix the data and the rendering.

## Definition of done

- The "SHIP IT!" sign is repositioned to a specific wall (the
  user's preferred right-side wall).
- The sign's `face` is the wall normal + π so it faces into the
  room.
- The wall-stripe artifact is gone (texture wrap and repeat are
  set, texture is anchored, no shifting).
- `pnpm test tests/unit/signs-and-walls.test.ts` passes.
- `pnpm typecheck` passes.
- `pnpm test` (full suite) still passes.
- The brief's report is written.
