# Phase 6.6 — Move coffee machine and server rack against the wall

## Context

Lucas just reported (2026-08-30):

> "move these object in one corner of the office in correct
>  positions, some should be next to the wall, not in the middle
>  of the floor. find proper positions for them."

The screenshot shows the coffee machine and the server rack
sitting in the middle of the office floor, not against any wall.
They look out of place. Other furniture (desks, the meeting table,
filing cabinet) is positioned against walls. These two should
be too.

## Files to read

- `src/engine/scene.ts` — the existing main-office scene. Find
  the `coffee-machine` and `server-rack` AABBs in
  `OBSTACLES` (`src/content/npcs.ts`) and the corresponding
  `makeCoffeeMachine` / `makeServerRack` (or similar) functions
  in `src/engine/scene.ts`.
- `src/content/npcs.ts` — `OBSTACLES` defines the AABBs the
  player cannot walk through. The `coffee-machine` AABB is
  `{ minX: 7, maxX: 8, minZ: -8, maxZ: -7 }` and the
  `server-rack` AABB is `{ minX: -8, maxX: -7, minZ: 7, maxZ: 9 }`.
  These positions look like they ARE against walls (the office
  bounds are -9..9). The bug is that the visual meshes are
  rendered at different positions than the AABBs. Or the meshes
  are rendered at the AABB positions but the AABBs are off
  (e.g. the AABB is correct but the visual mesh is at the wrong
  scale or center).

## What to deliver

### 1. Diagnose

Open `src/engine/scene.ts` and find the `makeCoffeeMachine` (or
equivalent) and `makeServerRack` (or equivalent) functions.
Also find where they are added to the scene (probably
`scene.add(makeCoffeeMachine(cx, cz, ...))` calls inside the
furniture loop). Verify that the visual mesh is centered on the
same position as the AABB. If the visual mesh is offset, fix it.

The bug is likely one of:
- The visual mesh is rendered at the AABB center but the AABB
  itself is too narrow (e.g. 1 unit wide when it should be at
  least 1.5 units to look proportional).
- The visual mesh is rendered with the WRONG scale (e.g. the
  coffee machine is rendered at 0.4x scale when it should be
  larger).
- The visual mesh is rendered at the right position but the
  AABB is offset, so the player can walk "through" the visual
  but not the AABB.

### 2. Fix the placement

After diagnosing, fix the actual bug. The expected behavior:
- The coffee machine is a 1×1×1 m cube (matching the AABB
  7..8 × -8..-7, which is 1×1) placed against the east wall
  (x=8) and the north wall (z=-8), with the visual mesh
  centered at the AABB center (cx=7.5, cz=-7.5).
- The server rack is a 1×2×1 m box (matching the AABB
  -8..-7 × 7..9, which is 1×2) placed against the west wall
  (x=-8) and the south wall (z=7..9), with the visual mesh
  centered at the AABB center (cx=-7.5, cz=8).

If the visual meshes are correctly placed at the AABB centers
but the AABBs are too small, expand the AABBs:
- coffee-machine: `{ minX: 7.5, maxX: 8.5, minZ: -8.5, maxZ: -7.5 }`
  (1×1)
- server-rack: `{ minX: -8.5, maxX: -7.5, minZ: 7.5, maxZ: 8.5 }`
  (1×1)

The coffee machine should be tucked into the north-east corner
(against both the east and north walls). The server rack
should be tucked into the south-west corner (against both the
west and south walls).

### 3. Other objects that might have the same issue

While you're at it, look at the other furniture in
`src/engine/scene.ts`:
- The `filing cabinet` (mentioned in the existing code).
- The `vending` machine (right side of the office).
- Any other free-standing objects.

If any are floating in the middle of the room, fix them too by
moving them against a wall.

### 4. Tests

Add a regression test `tests/unit/furniture-placement.test.ts`:
- The `coffee-machine` AABB is against the north wall: its
  `maxZ` is within 0.5 of the office's `minZ + 1`
  (i.e. touching the north wall).
- The `coffee-machine` AABB is against the east wall: its
  `maxX` is within 0.5 of the office's `maxX`.
- The `server-rack` AABB is against the west wall: its
  `minX` is within 0.5 of the office's `minX`.
- The `server-rack` AABB is against the south wall: its
  `minZ` is within 0.5 of the office's `maxZ - 1`.

### 5. Constraints

- Do NOT change the main office walls or NPC positions.
- Do NOT add any new dependency.
- Do NOT commit. Write your files, run the tests, report the
  results to `.agent-briefs/phase-6-object-placement-sol.md`.

## Definition of done

- The coffee machine is rendered against the north-east corner
  of the main office, with the visual mesh on the same position
  as the AABB.
- The server rack is rendered against the south-west corner,
  with the visual mesh on the same position as the AABB.
- All free-standing objects in the main office are now against
  a wall.
- The regression test passes.
- `pnpm test` (full suite) still passes.
- The brief's report is written.
