# Phase 4 — Multi-room world: Training Room, Kitchen, Meeting Room, CTO Office

## Context

The current office is a single 20x20 room (defined in `src/content/npcs.ts`
`OBSTACLES` + `OFFICE_BOUNDS`). Lucas wants four additional rooms:
Training Room, Kitchen, Meeting Room, and a CTO Office with a huge
Batman sign on the wall. The world is one continuous floor with open
doorways — no real doors. The existing main office must NOT be broken.

Full design in `docs/PRD.md` §13 C-12 and `docs/ADR/000-main-architecture.md`
D-18. Read those first.

This task is large. The minimum shippable slice is:

1. The four new rooms as `THREE.Group`s, with floor + walls + furniture.
2. Open doorways (2.5m wide) between rooms.
3. The main office has TWO new openings (one to the east, one to the
   south, or whatever layout works) so the player can walk into the
   new rooms.
4. The CTO Office has a glass wall facing the main office, with a
   large Batman sign on the back wall.
5. Player collision: player can walk through doorways; can NOT walk
   through walls.
6. The existing main office obstacles / NPC positions are unchanged.

## Files to read

- `src/content/npcs.ts` — `OBSTACLES`, `OFFICE_BOUNDS`, `PLAYER_START`.
- `src/engine/scene.ts` — `buildOfficeScene`, `addBoxTo`, the
  existing furniture patterns, NPC marker creation.
- `src/engine/collision.ts` — `applyWithCollision`, the AABB collision
  used for the player and the NPCs.
- `docs/PRD.md` §13 C-12, D-18.

## What to deliver

### 1. World layout data: `src/content/world-layout.ts`

A single exported constant `WORLD_ROOMS` describing the new rooms
plus the connections to the main office. For each room:
- `id: string`
- `floor: { minX, maxX, minZ, maxZ }` — the AABB of the floor.
- `walls: AABB[]` — wall AABBs (the AABBs the player cannot walk
  through; doorways are gaps between walls).
- `doorways: { from: AABB; to: AABB; width: number }[]` — explicit
  gaps in the walls. Width 2.5m minimum.
- `furniture: { type: string; position: Vector3Tuple; ...meta }[]` —
  simple JSON describing furniture pieces (rendered as primitive
  boxes in the scene).
- `signs: { text: string; position: Vector3Tuple; face: number;
  color: number }[]` — wall signs/text.

The main office's `OFFICE_BOUNDS` is `{ minX: -9, maxX: 9, minZ: -9, maxZ: 9 }`.
Floor 18x18 (with 1m walls). The new rooms attach to the main office
at specific edges:

- **Training Room** to the NORTH (z = -9 edge). Center around (0, 0, -14).
  Size 16x10. Doorway on the south wall (z = -9) of the main office.
- **Kitchen** to the EAST (x = 9 edge). Center around (14, 0, 0).
  Size 10x14. Doorway on the west wall (x = 9) of the main office.
- **Meeting Room** to the SOUTH (z = 9 edge). Center around (0, 0, 14).
  Size 12x10. Doorway on the north wall (z = 9) of the main office.
- **CTO Office** in the FAR EAST corner. Center around (16, 0, -8).
  Size 8x10. Doorway on the west wall, with a GLASS wall section
  facing the main office (5m wide, 3m tall). The Batman sign is
  on the back wall.

The main office's existing obstacles (desks, meeting-table, server-rack,
coffee-machine, vending) stay where they are. The new rooms do NOT
add obstacles inside the main office. The main office's walls (the
4 outer walls of the 20x20) stay where they are, but with 2.5m
gaps for the doorways (one in the north wall, one in the east wall,
one in the south wall).

Doorways (the wall AABBs do NOT include the doorway gap — the gap
is implemented as "no wall AABB covers the doorway pixels"):

- Main office north wall: x in [-1.25, 1.25], z in [-9.5, -9] — this
  is a 2.5m-wide gap in the north wall. No wall AABB here.
- Main office east wall: x in [9, 9.5], z in [-1.25, 1.25] — 2.5m
  gap in the east wall. No wall AABB.
- Main office south wall: x in [-1.25, 1.25], z in [9, 9.5] — 2.5m
  gap in the south wall. No wall AABB.

So the main office wall AABBs become:
- North wall: split into two — west piece x in [-9, -1.25] and
  east piece x in [1.25, 9].
- East wall: split into two — north piece z in [-9, -1.25] and
  south piece z in [1.25, 9].
- South wall: split into two — west piece x in [-9, -1.25] and
  east piece x in [1.25, 9].
- West wall: unchanged (no doorway to the west, so the existing
  AABB z in [-9, 9], x in [-9.5, -9] stays).

### 2. Test the world layout

Add `tests/unit/world-layout.test.ts`:
- All rooms' floors are non-overlapping with each other.
- All rooms' floors are non-overlapping with `OFFICE_BOUNDS`'s
  INTERIOR (the floor can touch the office wall AABBs but not
  overlap the inside of the office).
- Each doorway's width is >= 2.5.
- The main office's 3 doorways are correctly placed (north, east,
  south).
- The CTO Office has a glass wall AABB (its `walls` array contains
  an AABB with `id: "glass"`).
- The CTO Office has a Batman sign in `signs`.

### 3. Render the rooms: `src/engine/multi-room.ts`

A function `buildMultiRoomMeshes(layout, worldLayout): THREE.Group[]`
that, given the layout data, returns a list of `THREE.Group`s, one
per room (plus the main office's outer walls if not already there).
Each group is parented at the world position.

Each room contains:
- a floor mesh (a flat `PlaneGeometry` with a `MeshLambertMaterial`
  in a wood-tan color, like the main office's floor).
- wall meshes (boxes) for each `walls` entry.
- furniture meshes (boxes) for each `furniture` entry, with primitive
  colors per `type` (e.g. a "chair" is a small dark-grey box on the
  floor, a "whiteboard" is a big white rectangle on the wall).
- sign meshes for each `signs` entry, drawn as a `THREE.PlaneGeometry`
  with a `CanvasTexture` of the text, mounted on the wall at the
  given position and face.
- The glass wall AABB is rendered as a translucent blue box (a
  `MeshStandardMaterial({ transparent: true, opacity: 0.25, color:
  0xaaccff })`) for the GPU compatibility fallback (per the plan,
  use this until the full physical material is added later).

Add tests for `buildMultiRoomMeshes`:
- It returns one `THREE.Group` per room.
- Each group has at least one floor mesh.
- The CTO Office group has the glass wall mesh (a mesh whose material
  is transparent).
- Each sign produces a child mesh with a `CanvasTexture`.

### 4. Wire into the scene

`buildOfficeScene` (in `src/engine/scene.ts`) should now ALSO call
`buildMultiRoomMeshes` and add each room group to the scene. The
main office's existing obstacles and NPC positions are unchanged.

Add a `multiRoom` field to the returned `SceneObjects` so the
controller can iterate over rooms for collision / AI / etc.

### 5. Constraints

- Do NOT remove or move the existing main office obstacles or NPC
  positions.
- Do NOT change the player's starting position.
- Do NOT add any new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-4-multi-room-sol.md`.

## Definition of done

- `src/content/world-layout.ts` exists with `WORLD_ROOMS` exporting
  the 4 new rooms and the main-office doorway gap data.
- `src/engine/multi-room.ts` exists with `buildMultiRoomMeshes`.
- `src/engine/scene.ts` is updated to call `buildMultiRoomMeshes`
  and add the new rooms to the scene.
- `tests/unit/world-layout.test.ts` exists with at least 6 cases.
- `pnpm test tests/unit/world-layout.test.ts` passes.
- `pnpm typecheck` passes.
- `pnpm test` (full suite) still passes.
- The brief's report is written.
