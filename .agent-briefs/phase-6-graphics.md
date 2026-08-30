# Phase 6.1 — Graphics quality pass: roofs, room-distinct colors, shadows, lights, AA

## Context

Lucas just reported (2026-08-30):

> "the training room doesn't have the roof, and is totally empty,
> somebody should go there sometimes. And I also see some strange
> artifacts on the walls now! I did not have them before! Can we
> also add shadows and lights? I did not recognize there is a
> training room because the colors were the same as the normal
> wall and it was try to realize there is another room. We need a
> little better quality graphics, maybe more antialiasing and
> shadows."

The screenshot confirms:
1. The Training Room (and the other new rooms) have NO ROOF —
   the dark band at the top of the screen is the skybox
   showing through.
2. The walls have a vertical-stripe artifact pattern (probably the
   wallpaper texture stretching or the wall meshes Z-fighting at
   the seams).
3. All four new rooms use the same wood-tan floor and the same
   wallpaper material as the main office, so the player has no
   visual cue that a new room has loaded.
4. No point lights in the new rooms (the main office has lights
   set up in `src/engine/scene.ts`; the new rooms don't).
5. No shadows at all. The renderer config doesn't enable shadow
   mapping.

This task addresses all five.

## Files to read

- `src/engine/scene.ts` — current main office lighting setup
  (around line 70: `addBoxTo` calls and the existing AmbientLight,
  DirectionalLight, fill DirectionalLight). The existing
  `makeFloor`, `addWall`, etc. helpers.
- `src/engine/multi-room.ts` — current room construction
  (returned by the previous Phase 4 task).
- `src/engine/renderer.ts` — current WebGLRenderer config. The
  pixel ratio is fixed at 1; antialias is `true` (good) but the
  internal buffer is 480x270 which is small. The user wants
  "more antialiasing".

## What to deliver

### 1. Add roofs to every room

`buildMultiRoomMeshes` in `src/engine/multi-room.ts` must add a
ceiling mesh to each room. The ceiling is a thin slab (height
0.1m) at the top of the room (at `roomHeight = 3.0` in world Y),
with the same color as the walls but slightly darker (to look
like a ceiling, not a wall). The ceiling AABB is recorded in the
room's `walls` array IF the room is closed on top — but for
collision purposes the ceiling is solid (the player cannot jump
to 3m, and there is no upward movement). For now, the ceiling is
visual only (no collision AABB needed).

### 2. Give each new room a distinct visual identity

The user explicitly says "I did not recognize there is a training
room because the colors were the same as the normal wall." Fix
this by:

- Training Room: a darker, more "classroom" feel. Walls should be
  a dark green or teal accent. The whiteboard and projector
  should be visible (add a `whiteboard` and a `projector` to the
  furniture list if not present).
- Kitchen: light blue / white tile walls. Add a `coffeemaker`
  and a `fridge` mesh.
- Meeting Room: warm grey / wood walls. Add a `meeting-table` and
  several `chair`s.
- CTO Office: dark wood paneling, the GLASS wall facing the main
  office (translucent), and a large BATMAN sign on the back wall.
  The Batman sign is drawn as a `PlaneGeometry` with a
  `CanvasTexture` of the Batman logo (a yellow ellipse on a
  black background — draw it on a canvas).

Update `src/engine/multi-room.ts` so each room has a different
wall color (passed in via the `WORLD_ROOMS` data) AND add
furniture that makes the room's purpose obvious.

### 3. Add lights to each new room

The main office has an `AmbientLight` and a `key` DirectionalLight
in `src/engine/scene.ts`. The new rooms don't have any lights of
their own — they rely on the main office's lights, but the new
rooms are in different positions, so they're dark or lit wrong.

Solution: add a `PointLight` to each room's center in
`buildMultiRoomMeshes`. The point light is dim warm-white
(`0xfff4cc`, intensity 0.6, distance 8). It's enough to make the
room feel lit without overwhelming the global lights.

### 4. Enable shadow mapping

`src/engine/renderer.ts`:
- Set `renderer.shadowMap.enabled = true`.
- Set `renderer.shadowMap.type = THREE.PCFSoftShadowMap`.

Then in `src/engine/scene.ts`, mark the floors and the lower
sections of the walls as `castShadow = true, receiveShadow = true`
on the relevant `THREE.Mesh` objects. The desk tops, monitors,
and NPC bodies should `castShadow = true`. The big `key`
DirectionalLight should `castShadow = true` and have its shadow
camera bounds configured to cover the office.

The new rooms' point lights do NOT need to cast shadows (that
would be expensive) — only the main office's key directional
light casts shadows.

### 5. Increase the internal buffer resolution

`src/engine/renderer.ts` currently uses `RENDER_PIXEL_WIDTH = 480`
and `RENDER_PIXEL_HEIGHT = 270`. The user wants "more
antialiasing". Options:

- Increase the buffer to 640x360 (a 1.33x increase). This costs
  ~2.25x the pixels but gives a much sharper final image when
  the CSS scales it up.
- Or keep the buffer at 480x270 but increase the MSAA samples
  in the WebGL context. WebGL's `antialias: true` uses 4x MSAA
  by default. There's no exposed way to bump it higher in three.js
  without manual `getContext` calls. The simplest fix is to bump
  the buffer.

Go with: increase the buffer to **640x360** (1.33x linear, ~1.78x
area). This gives a clear visual improvement without too much
performance cost.

### 6. Tests

`tests/unit/multi-room-graphics.test.ts`:
- `buildMultiRoomMeshes` returns a group that contains a ceiling
  mesh for every room (assertion: for each room, the group has
  a mesh whose `position.y` is greater than 2.5 — that's the
  ceiling).
- Each room group has a `PointLight` child.
- The CTO Office group has a mesh with a `CanvasTexture` (the
  Batman sign) mounted on a wall.
- The renderer config (in `src/engine/renderer.ts`) has
  `shadowMap.enabled = true`.
- The `WORLD_ROOMS` data has a `wallColor` field for each room
  that is distinct (different hex values).

### 7. Constraints

- Do NOT remove the existing main office lighting or walls.
- Do NOT add any new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-6-graphics-sol.md`.

## Definition of done

- Every new room has a ceiling (visual mesh).
- Every new room has a distinct wall color and recognizable
  furniture (whiteboard for Training Room, fridge for Kitchen,
  etc.).
- The CTO Office has a Batman sign.
- Every new room has a PointLight.
- Shadow mapping is enabled in the renderer. The main office's
  key light casts shadows. Floors and desk tops receive shadows.
- The internal buffer is 640x360.
- `pnpm test tests/unit/multi-room-graphics.test.ts` passes.
- `pnpm typecheck` passes.
- `pnpm test` (full suite) still passes.
- The brief's report is written.
