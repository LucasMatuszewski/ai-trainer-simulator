# Phase 6.8 — Move free-standing furniture to walls + fix the
            flower-pot-in-cabinet collision

## Context

Lucas just reported (2026-08-30):

> "there is another object in the middle of the floor instead of
>  next to the wall, that we should move. And there is a flower
>  inside this huge blue object, they should not colide."

The screenshot shows:

1. A dark blue file cabinet in the middle of the office floor,
   not against a wall. It looks out of place. (The previous
   Phase 6.6 task should have caught this; if it didn't, this
   task re-catches it.)
2. A small plant/flower pot inside / clipping into a large blue
   object (the file cabinet? the CTO desk?). The flower pot is
   the placeholder for a future "plant on desk" decoration; it's
   currently being placed at a position that overlaps with the
   large blue object.

## Files to read

- `src/engine/scene.ts` — the main office scene. Find the file
  cabinet (or whatever the dark blue object is), the plant /
  flower, and the desk or other large object. Look for:
  - `makeFilingCabinet` (or similar)
  - `makePlant` (or the "plant on desk" decoration)
  - `addBoxTo` calls that build these objects
  - The `plant` or `flower` items in the scene-variation or
    procedural-furniture code (might be in
    `src/engine/scene-variation.ts` if it exists, or
    `src/engine/npc-mesh.ts`).
- `src/content/npcs.ts` — `OBSTACLES` for the file cabinet and
  desk AABBs. Verify the file cabinet is against a wall.

## What to deliver

### 1. Move the file cabinet to a wall

The file cabinet should be against one of the four walls, not in
the middle of the room. Find the current `makeFilingCabinet`
function and its position. The `OBSTACLES` entry for the
`filing-cabinet` (or similar) should also be against a wall. Move
both the visual mesh and the AABB to a position against a wall.

Suggested positions (pick one):
- North wall: e.g. `(-3, 0, -8.5)` (filing cabinet against the
  north wall, 1m wide, 0.5m deep, 2m tall).
- East wall: e.g. `(8.25, 0, 5)` (filing cabinet against the
  east wall, 0.5m wide, 1m deep, 2m tall).
- West wall: e.g. `(-8.25, 0, 0)` (filing cabinet against the
  west wall, 0.5m wide, 1m deep, 2m tall).

Make sure the cabinet's AABB is flush with the wall (the wall's
AABB is at the office's edge, so the cabinet's outer face should
match).

### 2. Fix the flower / plant collision

The flower is a small decorative object. Find where it is created
(possibly in `src/engine/npc-mesh.ts` or
`src/engine/scene-variation.ts`). The user says it's clipping into
a "huge blue object" — that sounds like a desk or a server rack.

Check the flower / plant's position. If it's a small decoration
that should sit ON TOP of a desk (e.g. on Maciek's desk or on a
manager's desk), make sure the Y position is at the desk's top
height (around 0.8m, which is the top of a desk mesh). If the
flower is clipping INTO the desk, raise its Y by 0.4m or so.

If the flower is supposed to be a floor decoration (a plant on
the floor), find a free spot of floor (not over a desk, not
over a wall AABB) and place it there.

Update the test:
- The flower / plant mesh's bounding box does NOT overlap with
  any other object's bounding box (other than the floor or a
  desk surface).
- The plant's Y position is greater than 0.7 if it's on a desk
  (desk top is at y=0.7) or less than 0.05 if it's on the floor.

### 3. Look for other free-standing objects in the middle of the room

While you're fixing the cabinet and the flower, do a pass over
the rest of `src/engine/scene.ts` to find any other object that
is NOT against a wall and NOT at a desk's natural position (e.g.
a chair that's not at a desk). Move them too.

### 4. Tests

- `tests/unit/furniture-placement.test.ts` (you may need to
  create or extend it):
  - The file cabinet AABB is against one of the four walls:
    its `minX` within 0.5 of `OFFICE_BOUNDS.minX`, OR its
    `maxX` within 0.5 of `OFFICE_BOUNDS.maxX`, OR its `minZ`
    within 0.5 of `OFFICE_BOUNDS.minZ`, OR its `maxZ` within
    0.5 of `OFFICE_BOUNDS.maxZ`.
  - The plant mesh's bounding box does not overlap with any
    other AABB in `OBSTACLES` (other than the floor).
  - The plant's Y is consistent with its position (on a desk or
    on the floor).

### 5. Constraints

- Do NOT change the existing main office walls or NPC positions.
- Do NOT add any new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-6-furniture-collision-sol.md`.

## Definition of done

- File cabinet is against a wall.
- Flower / plant is not clipping into another object.
- All other free-standing objects are also against a wall or in
  a natural position.
- Tests pass.
- The brief's report is written.
