# C-64 Design Ideas — Modern Reception Lobby

Status: DESIGN ONLY. Do not implement from this file until Wave 2 owns `src/engine/furniture/*`.
Room: old meeting room, floor `x=[-6, 6], z=[9, 19]`, ceiling `y=3` (`WALL_HEIGHT` in `src/engine/multi-room.ts`).
Orientation: south wall `z=19` is the street entrance. Everyone walks in heading `-Z` (north, toward the main office doorway at `x=[-1.25, 1.25], z=9.5`). Facing that way, **right = +X = kitchen side = desk**, **left = -X = sofa + glass**.

This note is for the Wave 2 furniture agent. It matches the existing visual language in `src/engine/furniture/` and `src/content/world-layout.ts`: chunky Box/Cylinder/Sphere primitives, `MeshLambertMaterial` for surfaces, `MeshBasicMaterial` for anything that must read as glowing, 8-10 cylinder segments, 8-10 / 6-8 sphere segments, named meshes, shared materials, no GLB, no heightmaps, no bloom composer.

---

## 0. Style contract (do not invent a second look)

The game is a low-poly 90s/00s IT office rendered as chunky pixel-art, not a 2024 coworking catalog. "Modern reception" here means: cooler stone and charcoal instead of walnut, a plant wall, a glass street wall, a linear lamp. It still has to look like it was built from the same `box()` helper as `makeFridge()` and `makeExecutiveDesk()`.

Hard rules, copied from the existing factories:

- One `THREE.Group` per prop. `group.name` is the factory name (`reception-desk`, `plant-wall`, ...).
- Local origin at floor level, group center. World pose is applied by `world-layout.ts`.
- Default material: `MeshLambertMaterial({ color })`. Never `MeshPhongMaterial`. Never untextured `MeshStandardMaterial` except the already-shipped glass wall recipe.
- Glow / screens / lamp faces / LED pips / tiny letter blocks: `MeshBasicMaterial` (see `ceiling-light.ts`, `dishwasher.ts`, `fridge.ts` letter blocks, outdoor sun in `garden.ts`).
- Canvas textures (monitor, nameplate, magazines): `NearestFilter` on mag and min, 32-128 px, same as `executive-desk.ts`.
- Cylinder segments: 8 or 10. Sphere segments: `(10, 8)` for trees, `(8, 6)` for bushes and plant leaves. Do not bump this "for smoothness".
- No `InstancedMesh` exists in the repo today. The plant wall is the justified first use (section 4). Everything else is ordinary meshes.
- Collision: every solid prop needs an AABB in `ROOM_FURNITURE_AABBS`. Scenery (garden, hills, tree row, door glass leaves if they stay visual-only) does not.
- Pathing: keep `ENTRANCE_EXIT_AREA` (`x=[-2.4, 2.4], z=[17.2, 18.6]`) and the north-south corridor `x=[-1.5, 1.5]` from `z=18.2` to the main-office doorway completely empty. `OFFICE_DOOR` stays at `(0, 0, 18.2)`. Do not move it.

Reuse, do not fork:

| Need | Existing source of truth |
|---|---|
| Glass wall material | `multi-room.ts`: `MeshStandardMaterial({ transparent: true, opacity: 0.25, color: 0xaaccff })` when `wall.id === "glass"` |
| Coffee-table glass | `coffee-table.ts`: `MeshLambertMaterial({ color: 0xbcd8e4, transparent: true, opacity: 0.45 })` |
| Chrome | `0x9aa2ad` (`coffee-table.ts`, `executive-chair.ts`) |
| Dark metal / fixture rim | `0x2c2c34` (`ceiling-light.ts`) |
| Warm lamp face | `0xfff2cc` Basic (`ceiling-light.ts`) |
| Tree / bush / hill | `garden.ts` `makeTree`, flattened `SphereGeometry` hills, `grassPlane` |
| Potted plant | `plant-counter.ts`: box pot + rim + soil + 2 leaf spheres + 1 Basic flower |
| Ceiling fixture | `makeCeilingLight()` as-is |
| PointLight budget | `multi-room.ts` already spawns one `PointLight(0xfff4cc, 0.6, 8)` per `lightPositions` entry |

---

## 1. Room palette (hex, all from or one step off the existing set)

Do not introduce neon cyan, pure white marble, or gold. The reception is the "public face" of the same brown/cream/chrome office.

### 1.1 Surfaces (room shell, suggested `world-layout` colors)

The old meeting room is `floorColor: 0x76543d`, `wallColor: 0x8a7968`. That reads as a closed conference cave. A lobby wants a cooler, lighter stone so the plant wall and the west glass are the heroes.

| Role | Hex | Why it belongs |
|---|---|---|
| Floor (warm stone) | `#A89B8C` (`0xa89b8c`) | Between toilet floor `0xc4cad0` and main-office wood `0x8c6b4a`. Still brown-family, just greyer. |
| Floor stripe (optional 2nd plane) | `#8C7F72` (`0x8c7f72`) | Same trick as `garden.ts` mowing stripe. One darker rectangle down the center aisle, `y = 0.002`. |
| Walls (north / south residual) | `#D4C8B8` (`0xd4c8b8`) | Cream wallpaper `0xc4a87a` cooled off. Matches kitchen wall `0xb8dce8` in "this room is public" temperature without going blue. |
| Ceiling | `#E8DCC8` (`0xe8dcc8`) | `multi-room.ts` already derives ceiling as `wallColor * 0.72`. If we set wall to `0xd4c8b8` that lands near this automatically. |
| East accent behind plant wall | `#1A2E22` (`0x1a2e22`) | Same job as CEO navy accent `0x1a1f3a`: a dark inner face so foliage pops. Warm-green, not black. Set via `accentColor` on the east wall. |
| Baseboard (thin box, if added) | `#6B4F33` (`0x6b4f33`) | `COLORS.wallAccent`. 0.08 x 0.12 strip along solid walls only, not on glass. |

### 1.2 Desk / metal / light

| Role | Hex | Existing cousin |
|---|---|---|
| Desk body / kick / riser | `#2C2C34` (`0x2c2c34`) | Ceiling-light rim, monitor stand |
| Desk stone top | `#C8C2B6` (`0xc8c2b6`) | Fridge body `0xe8ecef` warmed toward kitchen top `0x76695e` |
| Desk top edge trim | `#4A3F37` (`0x4a3f37`) | Kitchen `TOP_TRIM` |
| Transaction ledge (raised) | `#9AA2AD` (`0x9aa2ad`) | Chrome |
| Monitor bezel / phone body | `#1C1C22` (`0x1c1c22`) | Executive monitor stand |
| Paper | `#FFFFFF` (`0xffffff`) | `COLORS.paper` |
| Nameplate brass | `#B8912F` (`0xb8912f`) | CEO nameplate, trophy |
| LED strip core | `#FFF2CC` (`0xfff2cc`) | Ceiling lamp face |
| LED halo | `#FFE9A0` (`0xffe9a0`) | Outdoor sun halo |
| Downlight rim | `#2C2C34` (`0x2c2c34`) | Same fixture |
| Optional desk PointLight | `#FFF4CC` (`0xfff4cc`) | Room lights already use this |

### 1.3 Sofa corner

Do not reuse the CEO brown leather (`0x4a3226` / `0x57392b`). That sofa already means "Batcave meeting corner". The lobby sofa is the office-chair navy, scaled up.

| Role | Hex | Existing cousin |
|---|---|---|
| Sofa base / arms | `#222244` (`0x222244`) | `COLORS.chair` |
| Seat / back cushions | `#2E2E55` (`0x2e2e55`) | Chair, one step lighter. New but in-family. |
| Sofa legs | `#2E2018` (`0x2e2018`) | Existing sofa wood legs |
| Coffee table chrome legs | `#9AA2AD` (`0x9aa2ad`) | Reuse `makeCoffeeTable` legs |
| Coffee table glass | `#BCD8E4` (`0xbcd8e4`) at opacity 0.45 | Reuse as-is |

### 1.4 Plants (one family, four leaf tones, never a single flat green)

| Role | Hex | Existing cousin |
|---|---|---|
| Leaf A (hero) | `#2F8F3F` (`0x2f8f3f`) | Desk / counter / coffee-table plant |
| Leaf B (dark) | `#226622` (`0x226622`) | `COLORS.plantLeafDark`, counter small leaf |
| Leaf C (tree) | `#2E7D32` (`0x2e7d32`) | `garden.ts` `LEAF` |
| Leaf D (bush / hill shadow) | `#256029` (`0x256029`) | `LEAF_DARK` |
| Bush | `#35753A` (`0x35753a`) | `garden.ts` `BUSH` |
| Grass | `#4A9C4A` (`0x4a9c4a`) | Internal garden |
| Grass dark | `#3D8440` (`0x3d8440`) | Outdoor grass + stripe |
| Hill | `#3A7340` (`0x3a7340`) | Outdoor hills, proven |
| Trunk | `#6B4A2A` (`0x6b4a2a`) | `garden.ts` `TRUNK` |
| Pot | `#8A4A2A` (`0x8a4a2a`) | Every pot in furniture/ |
| Pot rim | `#6A3A1F` (`0x6a3a1f`) | `plant-counter.ts` |
| Soil | `#3A2210` (`0x3a2210`) | `plant-counter.ts` |
| Flower white | `#FAFAFA` (`0xfafafa`) | Counter flower, soap letters |
| Flower pink | `#E66EA0` (`0xe66ea0`) | Fridge magnet pink |
| Flower yellow | `#F2C200` (`0xf2c200`) | Fridge magnet / dishwasher LED |

### 1.5 Glass / outdoors / signs

| Role | Hex | Notes |
|---|---|---|
| West wall + door glass | `#AACCFF` (`0xaaccff`) opacity 0.25 Standard | Do not invent a second glass |
| Door / window frame | `#2C2C34` (`0x2c2c34`) | Same dark metal as fixtures |
| Handle | `#9AA2AD` (`0x9aa2ad`) | Chrome cylinder |
| Door sign family | `#8A6D1F` (`0x8a6d1f`) | `DOOR_SIGN_MOUNTS` / BATCAVE |
| Funny red sign | `#AA3322` (`0xaa3322`) | `NEXT MEETING: 5 MIN AGO`, `OUT OF ORDER` |
| Funny green sign | `#2E6E3A` (`0x2e6e3a`) | `WASH YOUR HANDS` |

---

## 2. Floor plan (world meters, buildable)

Room inner volume: `x=(-6, 6)`, `z=(9, 19)`, `y=(0, 3)`.
Center aisle, keep clear: `x=[-1.5, 1.5]` for the full depth.

```
z=19  SOUTH  [planter][ glass double door ][planter]     street / spawn
z=18.2                         OFFICE_DOOR (do not move)
z=16.5   sofa wall                  aisle              Xerox (5.0, 16.5)
z=13.5   sofa (-3.4) + table        aisle              DESK (3.4) + Renata (4.4)
z=11     plant-wall starts on +X
z=9.5    north doorway to main office, x=[-1.25, 1.25]
         WEST glass  x=-6                               EAST plant wall x=6
```

Suggested `world-layout.ts` furniture rows (Wave 2, not Wave 1):

```
{ type: "reception-desk",  position: [3.40, 0, 13.50], rotationY: -Math.PI / 2 }
{ type: "reception-sofa",  position: [-3.55, 0, 13.50], rotationY:  Math.PI / 2 }
{ type: "coffee-table",    position: [-2.15, 0, 13.50] }          // reuse makeCoffeeTable
{ type: "plant-wall",      position: [5.88, 0, 13.50] }           // flush to east inner face
{ type: "desk-led-bar",    position: [3.40, 0, 13.50] }           // or parented under the desk group
{ type: "floor-planter",   position: [-4.2, 0, 11.2] }            // sofa-end flowers
{ type: "door-planter",    position: [-3.05, 0, 18.35] }          // inside west of door
{ type: "door-planter",    position: [ 3.05, 0, 18.35] }          // inside east of door
{ type: "door-planter",    position: [-3.05, 0, 20.15] }          // OUTSIDE, past south wall
{ type: "door-planter",    position: [ 3.05, 0, 20.15] }          // OUTSIDE
{ type: "glass-doors",     position: [0, 0, 18.92] }
```

`lightPositions` for the reception room (feeds existing fixture + PointLight path):

```
[ 3.4, 13.5 ]    // over the desk, the one that actually sells the glow
[-3.4, 13.5 ]    // over the sofa so the west glass is not a cave
[ 0.0, 16.8 ]    // entrance, so the doors read from the spawn
```

Three PointLights is the existing CEO-office pattern (they use two). Do not add a fourth for the LED strip.

---

## 3. Reception desk (right / +X, facing -X)

Target read: a chunky hotel-style counter, not the CEO walnut desk and not the kitchen cabinet run. Charcoal body, pale stone top, a raised visitor ledge, Renata sits behind it looking `-X`.

World pose: group at `(3.40, 0, 13.50)`, `rotationY = -Math.PI / 2`. Build the factory facing `+Z` (visitor side = local `+Z`), then the rotation aims visitors at `-X`. Renata stands at world `(4.40, 0, 13.50)`, face `-Math.PI / 2`.

### 3.1 Primitive breakdown (local space, visitor at +Z)

All boxes unless noted. Shared materials: `body`, `top`, `trim`, `chrome`, `bezel`.

| # | name | geometry | size (x, y, z) | local position | material |
|---|---|---|---|---|---|
| 1 | `desk-body` | Box | 2.60, 0.72, 0.78 | (0, 0.42, -0.04) | body `0x2c2c34` |
| 2 | `desk-kick` | Box | 2.60, 0.08, 0.06 | (0, 0.04, 0.34) | body, slightly darker is optional; same hex is fine |
| 3 | `desk-top` | Box | 2.70, 0.05, 0.86 | (0, 0.805, 0.00) | stone `0xc8c2b6` |
| 4 | `desk-top-edge` | Box | 2.70, 0.05, 0.03 | (0, 0.805, 0.445) | trim `0x4a3f37` |
| 5 | `desk-ledge` | Box | 2.40, 0.04, 0.22 | (0, 0.88, 0.28) | chrome `0x9aa2ad` — the transaction shelf visitors lean on |
| 6 | `desk-modesty` | Box | 2.40, 0.50, 0.04 | (0, 0.38, 0.36) | body — front panel, so you cannot see Renata's legs |
| 7 | `desk-return` | Box | 0.70, 0.72, 1.10 | (1.15, 0.42, -0.55) | body — short L-return on Renata's right (local -Z / +X after rotation this becomes south). Holds the printer-side clutter. |
| 8 | `desk-return-top` | Box | 0.74, 0.05, 1.14 | (1.15, 0.805, -0.55) | stone |

Side panels (optional, 2 boxes): `0.04 x 0.72 x 0.78` at `x = ±1.32`. Adds a "built-in" read against the plant wall.

Do not add drawers. The CEO desk already did the three-drawer gag. This desk is a slab.

### 3.2 Desktop clutter (keep it to ~10 pieces, all facing Renata = local -Z)

| name | primitive | size | local pos | notes |
|---|---|---|---|---|
| `desk-monitor-stand` | Box | 0.18, 0.02, 0.14 | (-0.45, 0.84, -0.15) | bezel color |
| `desk-monitor-post` | Box | 0.04, 0.18, 0.04 | (-0.45, 0.94, -0.15) | |
| `desk-monitor-bezel` | Box | 0.52, 0.34, 0.03 | (-0.45, 1.16, -0.22) | |
| `desk-monitor-screen` | Plane | 0.46 x 0.28 | on bezel front | `MeshBasicMaterial` + 32x20 canvas, green code lines, copy `screenPlane()` from `executive-desk.ts`. Rotate so it faces Renata (local -Z). |
| `desk-phone-base` | Box | 0.16, 0.04, 0.22 | (0.55, 0.85, -0.10) | bezel |
| `desk-phone-handset` | Box | 0.06, 0.04, 0.18 | (0.55, 0.90, -0.10) | chrome |
| `desk-phone-cord` | Cylinder 8seg | r=0.012, h=0.16 | between base and handset, rotated | body. One bent cylinder is enough. |
| `desk-paper-stack` | 3 Boxes | 0.22, 0.01, 0.16 each | (0.15, 0.84+i*0.012, -0.25) | `0xffffff`, each rotated `y += 0.04 * i` |
| `desk-mug` | Cylinder 10seg | r=0.05/0.045, h=0.10 | (-1.05, 0.86, -0.20) | `0x8f2b2b` (CEO mug) or `0x2244aa` (`COLORS.mug`) |
| `desk-keyboard` | Box | 0.36, 0.02, 0.12 | (-0.45, 0.84, 0.05) | `0x202020` |
| `desk-vase` | Cylinder 8seg | r=0.045/0.03, h=0.14 | (1.05, 0.90, 0.05) | pot `0x8a4a2a` |
| `desk-stems` | 3 Cylinders 6seg | r=0.008, h=0.16 | jittered on vase | leaf A |
| `desk-blooms` | 3 Spheres (6,4) | r=0.03 | on stem tops | white / pink / yellow Basic — flowers on the counter, per Lucas |

Skip a second monitor. The CEO already has dual-screen energy. One reception screen plus a phone is the job.

### 3.3 Collision AABB (world, after rotation)

Desk occupies roughly `x=[2.95, 4.55]`, `z=[12.15, 14.85]`, `y=[0, 0.90]`. Keep the visitor face (`x < 2.95`) walkable so the player can walk-to-face Renata. The L-return sits toward +Z (south) so it does not eat the aisle.

---

## 4. Plant wall (east wall, behind the desk) — fake it with instanced boxes

Lucas asked for the wall behind the desk "whole in green flowers, like plant wall". Do not place one giant green box. Do not spawn 200 unique `Mesh` leaves (that is a draw-call bomb next to the existing office).

Coverage: a panel 5.0 m long (`z = 11.0` to `16.0`), 2.45 m tall (`y = 0.20` to `2.65`), 0.10 m thick, flush to the east inner face. World group at `(5.88, 0, 13.50)`, no rotation. The Xerox at `(5.0, 16.5)` sits just south of the panel; leave `z > 16.05` empty for it. Leave `z < 11.0` empty so the north doorway is not a hedge.

### 4.1 Unique meshes (the frame, ~8 boxes)

| name | size | pos (local) | color |
|---|---|---|---|
| `pw-back` | 0.04, 2.45, 5.00 | (0.02, 1.42, 0) | `0x1a2e22` — dark backing, also the east accent |
| `pw-frame-l` | 0.08, 2.50, 0.08 | (0.00, 1.45, -2.46) | chrome or body `0x2c2c34` |
| `pw-frame-r` | 0.08, 2.50, 0.08 | (0.00, 1.45,  2.46) | same |
| `pw-frame-t` | 0.08, 0.08, 5.00 | (0.00, 2.68, 0) | same |
| `pw-frame-b` | 0.08, 0.10, 5.00 | (0.00, 0.15, 0) | same, slightly taller, reads as a planter trough |
| `pw-trough-soil` | 0.10, 0.03, 4.84 | (0.04, 0.22, 0) | soil `0x3a2210` |

A real trough at the bottom sells "living wall" even if the foliage is cubes.

### 4.2 Instanced foliage (the cheap trick)

This is the first `THREE.InstancedMesh` in the project. Use it only here.

1. Geometry: **one** `BoxGeometry(0.16, 0.20, 0.10)`. Boxes, not spheres. Spheres would look like the garden trees; boxes look like chunky pixel leaves and batch perfectly.
2. Four meshes, one per leaf color, so we never need per-instance color attributes:

```
leafA: InstancedMesh(geo, Lambert(0x2f8f3f), 70)
leafB: InstancedMesh(geo, Lambert(0x226622), 50)
leafC: InstancedMesh(geo, Lambert(0x2e7d32), 40)
leafD: InstancedMesh(geo, Lambert(0x256029), 30)
```

Total 190 instances, **4 draw calls**, plus the 6 frame boxes.

3. Layout: a 16 (along Z) by 10 (along Y) grid, cell `0.30 x 0.22`. For each cell, pick a color by `index % 7` (so it does not stripe), then:

   - position: `x = 0.08 + jitter*0.04` (jitter toward the room, so the wall is shaggy, not tiled)
   - `y = 0.40 + row * 0.22 + (col % 2) * 0.06` (brick stagger)
   - `z = -2.30 + col * 0.30 + jitter*0.05`
   - rotation: `x += ±0.25`, `z += ±0.35` (leaves tilt, grid disappears)
   - scale: `sx = 0.85 + (i%3)*0.12`, `sy = 0.75 + (i%4)*0.14`, `sz = 0.8`

   Deterministic jitter from `i * 13 % 10`, same spirit as `makeBookRow` in `bookshelf.ts`. No `Math.random()` at runtime (the wall would shimmer every load).

4. Skip ~12 cells near the bottom trough and ~8 cells in a loose diamond around `(local z=0, y=1.6)` so the wall is dense but not a green brick. The holes read as depth.

5. Flowers on the wall (NOT instanced, 10-12 unique meshes): `SphereGeometry(0.035, 6, 4)` with `MeshBasicMaterial` in white / pink / yellow. Scatter on the front face (`x = 0.16`). Basic material makes them pop against Lambert leaves the same way the kitchen counter flower already does.

6. Optional "irrigation" gag: one thin chrome cylinder `r=0.015, h=4.9` along the top inside the frame, plus three drip cylinders `h=0.08` — reads as a drip line, costs nothing.

### 4.3 What not to do

- Do not use a texture atlas on a single plane. NearestFilter plant photos will look like a poster, and this game's plants are geometry.
- Do not use `SphereGeometry` instances. They fight the box language of the desk and sofa.
- Do not add a real RectAreaLight behind the foliage. The dark backing plus the desk LED is enough separation.

---

## 5. LED strip + downlights (glow with almost no light cost)

The existing engine already teaches the right cheat: **the lamp face is `MeshBasicMaterial`, the actual `PointLight` is a separate cheap omni with distance 8** (`ceiling-light.ts` + `multi-room.ts`). Server LEDs, dishwasher pips, microwave digits, the outdoor sun and its halo (`garden.ts` `0xffe9a0` opacity 0.35) are all unlit Basic meshes. There is no bloom pass. Do not add one.

### 5.1 The strip (parent under the desk group, or its own group at the desk world xz)

Local to the desk (before the `-PI/2` rotation, so the strip runs along local X = world Z):

| name | geo | size | pos | material |
|---|---|---|---|---|
| `led-channel` | Box | 2.40, 0.05, 0.08 | (0, 2.58, 0.05) | body `0x2c2c34` — the aluminium extrusion |
| `led-core` | Box | 2.28, 0.02, 0.05 | (0, 2.545, 0.05) | **Basic** `0xfff2cc` — this is the "on" strip |
| `led-halo` | Box | 2.36, 0.10, 0.16 | (0, 2.50, 0.05) | **Basic** `0xffe9a0`, `transparent: true`, `opacity: 0.22`, `depthWrite: false` — fake glow volume, same recipe as `outdoor-sun-halo` |
| `led-pool` | Plane | 2.20 x 0.70 | (0, 0.84, 0.05), rotX = -PI/2 | **Basic** `0xfff2cc`, opacity 0.10, `depthWrite: false` — a faint rectangle on the stone top so the desk looks lit even if the PointLight is weak |

The halo must be a *slightly larger* box around the core, not a scaled copy of the whole desk. Keep opacity <= 0.25 or the lobby turns into a yellow fog.

### 5.2 Three downlights (re-skin `makeCeilingLight`, do not call it three extra times at ceiling height)

Pendants that actually hang over the visitor ledge, so you see them in the first-person view when talking to Renata.

Each downlight = 3 meshes:

1. `down-can` — `CylinderGeometry(0.09, 0.11, 0.10, 10)` Lambert `0x2c2c34`, pos y=2.52
2. `down-lamp` — `CylinderGeometry(0.07, 0.07, 0.02, 10)` **Basic** `0xfff2cc`, pos y=2.46 (the visible source)
3. `down-cone` — `CylinderGeometry(0.05, 0.18, 0.22, 8)` **Basic** `0xffe9a0`, opacity 0.12, `depthWrite: false`, pos y=2.34 — a short volumetric cone. This is the "beam". Cheap, reads instantly, no SpotLight.

Place three along the strip: local x = `-0.85, 0, 0.85` (world z = `12.65, 13.50, 14.35` after rotation).

### 5.3 The one real light

Do **not** create a PointLight per LED. Use the room's existing `lightPositions` entry at `[3.4, 13.5]`. If the desk still feels dark in a screenshot, drop intensity from 0.6 to 0.85 and distance from 8 to 5 so it pools on the stone instead of washing the plant wall. Color stays `0xfff4cc`.

Forbidden: `SpotLight`, `RectAreaLight`, `MeshStandardMaterial.emissive` plus a custom shader, per-frame intensity animation on the strip. A static Basic strip already reads as "on". Save blinking for the witty incident sign (section 9).

---

## 6. Sofa + coffee table (left / -X)

World: sofa `(-3.55, 0, 13.50)`, `rotationY = PI/2` so it faces +X (the desk, across the aisle). Coffee table `(-2.15, 0, 13.50)`, no rotation. Gap to the west glass inner face (`x = -6`) is ~2.0 m, enough for the sofa depth plus a person walking behind it. Do not pin the sofa to the glass; first-person look-west must see garden, not upholstery.

### 6.1 Sofa — clone `makeSofa()` proportions, re-skin navy

`makeSofa()` is already the right primitive count. Copy the structure, change colors and name it `reception-sofa` so the CEO corner keeps its brown identity.

Existing sizes (keep):

| name | size | pos | change |
|---|---|---|---|
| `sofa-base` | 2.20, 0.32, 0.90 | (0, 0.26, 0) | body `0x222244` |
| 4x `sofa-leg` | 0.08, 0.10, 0.08 | corners | wood `0x2e2018` |
| `sofa-seat-left/right` | 1.02, 0.14, 0.82 | (±0.53, 0.49, 0.03) | cushion `0x2e2e55` |
| `sofa-back-left/right` | 1.02, 0.52, 0.18 | (±0.53, 0.72, -0.36) | cushion |
| `sofa-arm-left/right` | 0.18, 0.50, 0.90 | (±1.10, 0.55, 0) | body |

Two extra cheap details so it is not a palette-swap:

- `sofa-pillow` Box `0.28, 0.22, 0.10` at `(-0.7, 0.72, -0.20)`, rotZ=0.15, color leaf A `0x2f8f3f` — a plant-wall echo cushion.
- `sofa-pillow-2` same at `(0.75, 0.72, -0.18)`, rotZ=-0.1, color `0xb8912f` (brass / mustard, `COLORS`-adjacent). Two pillows = "lobby", one pillow = forgotten.

Collision AABB world: `x=[-4.05, -3.05]`, `z=[12.35, 14.65]`, `y=[0, 0.90]`.

### 6.2 Coffee table

Call existing `makeCoffeeTable()`. It already has chrome legs, glass top, a book, a tiny plant. Then **add two magazines on top** as the witty layer (section 9) instead of rebuilding the table. If the tiny plant fights the new floor planter, hide it by not adding a second plant; one green thing on the table is enough.

Magazine recipe (parented to the table group, y = 0.455):

- Box `0.24, 0.012, 0.32`, color `0x2255aa` (training-room sign blue), rotY = 0.2, pos `(-0.15, 0.455, 0.02)`
- Box `0.24, 0.012, 0.32`, color `0xaa3322`, rotY = -0.15, pos `(0.12, 0.468, -0.04)`
- Optional canvas on the top face, 64x80, NearestFilter, two-line titles (section 9). If canvas is too much, the two colored slabs already read as magazines next to the existing maroon book `0x6d3a3a`.

---

## 7. Flowers (inside the lobby, not the plant wall)

Lucas asked for flowers as their own beat. Three placements, all using the `plant-counter.ts` grammar (pot + rim + soil + spheres), just taller.

### 7.1 Shared factory `makeLobbyPlanter(scale = 1)`

| part | geo | size at scale=1 | color |
|---|---|---|---|
| pot | Box (chunkier than a cylinder; matches the desk) | 0.42, 0.38, 0.42 | `0x8a4a2a` |
| rim | Box | 0.46, 0.04, 0.46 | `0x6a3a1f` |
| soil | Box | 0.36, 0.02, 0.36 | `0x3a2210` |
| leaf big | Sphere (10,8) | r=0.28 | `0x2f8f3f` at y=0.62 |
| leaf dark | Sphere (8,6) | r=0.20 | `0x226622` at (0.10, 0.55, 0.08) |
| leaf 3 | Sphere (8,6) | r=0.16 | `0x2e7d32` at (-0.08, 0.58, -0.06) |
| blooms | 4x Sphere (6,4) r=0.04 | on leaf tops | Basic white / pink / yellow / white |

Box pots, sphere leaves. That is the kitchen plant, grown up. Do not switch the lobby planters to cylinders while the kitchen uses boxes.

### 7.2 Where they go

1. **Desk vase** — already in section 3.2 (small, on the stone).
2. **Sofa-end floor planter** — `makeLobbyPlanter(1.0)` at `(-4.2, 0, 11.2)`, the north-west corner, so look-west from the desk sees flowers then glass then garden. Collision radius ~0.35.
3. **Four door planters** — `makeLobbyPlanter(0.85)` at the four corners of the entrance (section 8). Inside pair MUST sit outside `ENTRANCE_EXIT_AREA`: `x=±3.05`, `z=18.35` is 0.65 m west/east of the ±2.4 lane and 0.25 m south of the area's maxZ, so NPCs do not spawn inside a pot.

---

## 8. Huge glass west wall, double glass entrance, exterior garden

### 8.1 West glass

Wave 1 already replaces `meeting-west` with `wall("glass", ...)`. Do not invent a second glass material. The sofa sits in front of it; the garden lives at `x < -6.5`.

Optional interior mullions so it reads as a designed window, not a missing wall (CEO south glass has no mullions, training-room east glass has no mullions — so keep this light). If added, 2 vertical dark-metal boxes `0.06 x 2.6 x 0.06` at world `x=-6.02`, `z=12.2` and `z=15.8`, plus 1 horizontal bar at `y=1.5`. Parent them in `makeReceptionGarden` or a `makeGlassMullions` group. Skip them if the first screenshot already reads as a window.

### 8.2 Double glass entrance on the south wall

Spawn is *inside* the room at `z=18.2`. The south wall volume is `z=[19, 19.5]`. NPCs never walk in from `z>19`; they appear at the door and walk north. So the doors are a **set dressing on the inner face**, and collision stays the south wall (glass or solid). Do not punch a walkable hole into the garden. Glass in this game is transparent, not passable (`WORLD_COLLISION_WALLS` includes glass).

Build `makeGlassDoors()` at world `(0, 0, 18.92)` so the leaves sit just inside the wall.

**Frame (collision-safe, visual):**

| name | size | pos | color |
|---|---|---|---|
| `door-frame-l` | 0.10, 2.50, 0.10 | (-1.15, 1.25, 0) | `0x2c2c34` |
| `door-frame-r` | 0.10, 2.50, 0.10 | ( 1.15, 1.25, 0) | |
| `door-frame-t` | 2.40, 0.10, 0.10 | (0, 2.50, 0) | transom bar |
| `door-sill` | 2.40, 0.04, 0.16 | (0, 0.02, 0) | chrome, a threshold you can see at spawn |
| `door-transom-glass` | 2.20, 0.35, 0.03 | (0, 2.28, 0) | same glass material as walls |

**Leaves (visual, slightly ajar so they read as doors, not a shop window):**

Each leaf is a group:

- `leaf-glass` Box `1.00, 2.10, 0.03`, glass material
- `leaf-rail-t` Box `1.00, 0.06, 0.05` at y top
- `leaf-rail-b` Box `1.00, 0.10, 0.05` at y=0.12 (kick plate)
- `leaf-stile-outer` Box `0.06, 2.10, 0.05`
- `leaf-stile-inner` Box `0.06, 2.10, 0.05`
- `leaf-mullion` Box `0.04, 2.00, 0.02` at mid-width (one vertical bar, office-building language)
- `leaf-handle` Cylinder 8seg `r=0.02, h=0.42`, chrome, vertical, at the inner stile, z=+0.05

Left leaf group at x=-0.52, `rotationY = +0.20` (~11 deg, opens inward / north, which is -Z... wait).

Spawn faces -Z. Doors on the south wall face the player as they spawn (player looks -Z, doors are at +Z from them? No: player at z=18.2 looking north is looking -Z, the doors are *behind* them on the south wall. Visitors *entering* look -Z and see the lobby; they would see the inner face of the doors only if they turn around.

So the doors must read from TWO views:
1. Player walks in, turns around: inner face, handles, planters inside.
2. Player at sofa looking south-east, or from main office doorway looking south: the doors at the far end of the lobby, backlit by... there is no outside south garden except the two exterior planters. The west garden is the hero view.

Ajar direction: open the leaves **into the room** (rotation around Y, inner edges swing toward -Z) by ±0.18 rad. That puts the inner edges around `z≈18.7`, still north of the wall, and keeps the center gap on `x=0` where `OFFICE_DOOR` lives. Handle the collision by **not** putting AABBs on the leaves. Frame boxes can be visual-only too; the south wall already blocks.

Logo on the transom: a canvas plane 1.6 x 0.28, NearestFilter, text `DEVPOWERS` in `0x8a6d1f` on dark `0x2c2c34`, same family as door signs. Soft-rebrand C-13, no new font stack.

### 8.3 Planters both sides, inside and outside

Four calls to `makeLobbyPlanter(0.85)`:

| id | world xz | side |
|---|---|---|
| inside-west | (-3.05, 18.35) | lobby, left of door, west of spawn lane |
| inside-east | ( 3.05, 18.35) | lobby, right of door, still west of the desk's south return |
| outside-west | (-3.05, 20.15) | past `z=19.5`, visible through the door glass |
| outside-east | ( 3.05, 20.15) | same |

Outside planters have no collision (player cannot go there). Inside planters do (radius 0.30). Keep them off `ENTRANCE_EXIT_AREA`.

A fifth, optional: two tiny box hedges `0.50 x 0.28 x 0.22`, bush color, sitting on the outside sill against the wall at `x=±1.7, z=19.7` — fills the gap between door frame and the big planters so the elevation is not two lonely pots.

---

## 9. Corporate garden west of the glass (hills without a heightmap)

New scenery group `makeReceptionGarden()`, decoration only, no collision, same contract as `makeGarden()` / `makeOutdoorScenery()`. Bounds: `x=[-16, -6.5]`, `z=[8, 20.5]`. Do not overlap the main-office west wall at `x=[-9.5, -9], z=[-9, 9]` more than the grass plane; keep trees and hills at `z >= 9.2` so they belong to the lobby window.

### 9.1 Grass (two planes, already proven)

Copy `grassPlane()` from `garden.ts`:

- Big plane `x=[-16, -6.55]`, `z=[8, 20.5]`, color `0x4a9c4a`, y=0.005
- Stripe plane `x=[-13, -8]`, `z=[10, 18]`, color `0x3d8440`, y=0.01

That is the whole "lawn". No vertex displacement.

### 9.2 Rolling hills — flattened spheres, the existing cheat

`makeOutdoorScenery()` already did this: `SphereGeometry(radius, 12, 8)`, `scale.y = 0.4..0.5`, color `0x3a7340`, parked on y=0 so the equator is buried and the upper hemisphere is a hill.

For this garden, **three overlapping spheres in a row receding from the glass**, plus one far hero:

| name | xz | radius | scale.y | notes |
|---|---|---|---|---|
| `hill-near-n` | (-13.5, 10.5) | 2.8 | 0.42 | north end, behind the tree row |
| `hill-mid` | (-14.5, 14.0) | 3.4 | 0.38 | biggest, center of the window |
| `hill-near-s` | (-13.8, 17.8) | 2.6 | 0.45 | south end, toward the entrance |
| `hill-far` | (-16.5, 13.5) | 3.8 | 0.32 | sits mostly outside the grass plane, horizon bump |

Why this works without a heightmap: Lambert lighting on a squashed sphere already gives a gradient from crown to grass. Overlap the spheres by ~1 m so there is no "planet sitting on a lawn" silhouette. Hide the buried equator with the grass plane at y=0.005.

Do **not** use `PlaneGeometry` with `displace`. Do **not** stack Minecraft boxes (that would read as a warehouse, not a campus). Do **not** clone the outdoor sun here; the training-room sun already owns the sky and a second sun west would fight it.

If the buried sphere still shows a dark ring at the grass join (it can, depending on camera), add a thin disc `CircleGeometry(radius * 0.85, 12)` Lambert grass color, rotX=-PI/2, y=0.02, as a "skirt" per hill. Two extra draw calls, kills the seam.

### 9.3 ROW of trees / bushes (Lucas: "in a raw")

A straight row, parallel to the glass, between the glass and the hills. This is the shot: sofa -> glass -> trunks -> hills.

Reuse `makeTree(scale)` from `garden.ts` (cylinder trunk 8seg + 2 spheres). Do not rewrite it.

Tree row at `x = -8.2` (about 1.7 m west of the glass, so they do not clip the StandardMaterial glass and they stay in frame from the sofa):

| z | scale | leaf color override |
|---|---|---|
| 9.6 | 0.85 | default `LEAF` |
| 11.1 | 1.05 | `LEAF_DARK` upper already handled inside makeTree |
| 12.6 | 0.90 | |
| 14.1 | 1.15 | the hero tree, dead-center of the sofa view |
| 15.6 | 0.88 | |
| 17.1 | 1.00 | |
| 18.6 | 0.80 | south end, visible when you look out near the doors |

Seven trees, even spacing 1.5 m. That is a *row*. Jitter x by ±0.15 only (`-8.35, -8.10, -8.25, ...`) so it is planted, not a palisade.

Bushes in the gaps, `SphereGeometry(0.48, 8, 6)`, `scale.y = 0.7`, color `0x35753a`, y=0.30, x=-7.6 (slightly closer to the glass than the trunks, fills the understory):

`z = 10.35, 11.85, 13.35, 14.85, 16.35, 17.85` — six bushes, six gaps.

Optional 3 ground shrubs at `x=-10.5` (behind the row, in front of hills) at `z=12, 14, 16`, scale 0.9, just so the row is not a single depth plane.

### 9.4 Cheap sky read

The west glass will show whatever clear color / hemisphere the renderer already uses. Do not add a second sun. If the view feels empty above the hills, one more flattened sphere at `(-17, 11)` with leaf-dark color and scale.y=0.25 can fake a distant treeline. Stop there.

---

## 10. Three witty details (IT Crowd / Silicon Valley, Polish software house)

Build these as geometry, not as a wall of poster text. The game already has `OUT OF ORDER` on a stall door, `NEXT MEETING: 5 MIN AGO`, fridge magnets (`GIT PUSH --FORCE`, `DO NOT EAT MY YOGURT`), and `BATCAVE - KNOCK TWICE`. Match that density: one readable canvas, the rest readable as shapes.

### 10.1 "DAYS SINCE LAST INCIDENT" — blinking zero

A small wall sign on the east wall, south of the plant wall, above the Xerox, world `(5.92, 2.15, 16.55)`, face `-PI/2`.

- Back plate: Box `0.04, 0.36, 0.70`, body `0x2c2c34`
- Canvas plane `0.32 x 0.62` (or 0.62 x 0.32 if you mount it landscape), NearestFilter, 128x64, cream `0xf2e1bf` field, maroon header `DAYS SINCE LAST INCIDENT` in monospace
- The digit is **not** on the canvas. A separate Box `0.10, 0.16, 0.02`, `MeshBasicMaterial({ color: 0xaa3322 })`, shaped as a chunky "0" using 4 boxes (top, bottom, left, right) with a hole — the same letter-block trick as `fridge.ts`
- Reuse the server-rack LED updater: `userData.update(dt)` toggles the digit material between `0xaa3322` and `0x331100` (`COLORS.serverLightOff`) on a 1.2 s period, same as `microwave.ts` blinking LED

Joke: the number has never been allowed to become 1. It is the reception's heartbeat. Costs ~8 meshes and one updater already in the engine pattern.

### 10.2 Bowl of complimentary dongles

On the transaction ledge, local `(0.85, 0.91, 0.28)` (visitor side, they can see it).

- Bowl: `CylinderGeometry(0.09, 0.07, 0.05, 10)`, cream `0xf2e1bf`
- 5 USB sticks: Box `0.02, 0.012, 0.05`, colors `0x1c1c22`, `0x2255aa`, `0xaa3322`, `0x2f8f3f`, `0xb8912f`, jittered in the bowl, rotY random-deterministic
- One stick standing up like a gravestone
- Tiny canvas flag on the bowl rim, 64x16, text `COMPLIMENTARY DONGLES` in maroon, or skip the canvas and put a folded Box "tent card" `0.10, 0.06, 0.002` with the same canvas

Joke: every Polish IT reception has a dish of mints. This one has USB-A sticks in 2026. Nobody knows what they fit. Pairs with Renata as Office Manager / keeper of the sacred adapters.

### 10.3 Visitor log + "SIGN THE SLA"

On the coffee table, replacing or sitting next to the existing maroon book:

- Closed binder: Box `0.28, 0.03, 0.20`, color `0x3a5a6d` (bookshelf blue)
- Binder spine: Box `0.03, 0.04, 0.20`, brass `0xb8912f`
- Pen: Cylinder 6seg `r=0.008, h=0.14`, `0x1c1c22`, lying at 35 deg
- Cover canvas 64x48, NearestFilter, two lines: `VISITOR LOG` / `SIGN THE SLA`

Joke: you do not sign in, you execute a contract. Silicon Valley paperwork energy, IT Crowd reception energy (the red chair / "have you tried turning it off and on" desk, but legal). ASCII only.

### Honorable mentions (do not build unless the first three feel thin)

- Nameplate on the desk, same brass canvas as Dawid's, text `RENATA - I AM THE TICKET SYSTEM`.
- A tiny brass bell (`Cylinder` + `Sphere` r=0.04, `0xb8912f`) next to a mechanical-keyboard switch (Box `0xcccccc`) labeled with letter-blocks `RING`.
- Magazine titles if the canvas is already in hand: `THE AGILE WATERFALL` (blue) and `HOW TO EXIT VIM` (red).

---

## 11. Suggested factory files (Wave 2, not this brief)

Keep each factory in its own file under `src/engine/furniture/`, same as the kitchen premium pass.

| file | exports | mesh budget |
|---|---|---|
| `reception-desk.ts` | `makeReceptionDesk()` | ~28 (body + clutter + vase) |
| `plant-wall.ts` | `makePlantWall()` | 6 unique + 4 InstancedMesh + ~12 flowers |
| `desk-lights.ts` | `makeDeskLedBar()` | 4 (channel, core, halo, pool) + 3x3 downlights = 13 |
| `reception-sofa.ts` | `makeReceptionSofa()` | 11 + 2 pillows |
| `lobby-planter.ts` | `makeLobbyPlanter(scale)` | ~11, reused 5 times |
| `glass-doors.ts` | `makeGlassDoors()` | ~20 |
| `reception-garden.ts` | `makeReceptionGarden()` | 2 planes + 4 hills + 7 trees*(3) + 6 bushes + 4 outside planters if not laid out in world-layout |

Reuse as-is: `makeCoffeeTable()`, `makeCeilingLight()`, `makeTree()` (export it from `garden.ts` if it is currently file-private).

`makeFurniture()` in `multi-room.ts` gains the new `type` strings. Garden and exterior planters can be spawned from `scene.ts` next to `makeGarden()` / `makeOutdoorScenery()` so they are not inside the room's furniture AABB pass.

---

## 12. Screenshot checklist for the implementer

Take these from 5173 after a fresh `BUILD_VERSION` bump, not from 4173.

1. **Spawn turnaround:** player at `OFFICE_DOOR`, look -Z: aisle, desk on the right with LED pool on the stone, plant wall behind it, sofa on the left, west glass, tree row, hills. If you see a solid south wall and no doors when you turn +Z, the door group is in the wall volume — pull it to `z=18.92`.
2. **At the desk, look +X:** plant wall is shaggy cubes, not a green quad; flowers tick; LED strip is a bright line with a soft halo, not a white blowout.
3. **On the sofa, look -X:** glass, then a ROW of trunks (count 5+), then overlapping hills, grass in between. No floating sphere equators. No second sun.
4. **Door elevation:** inside planters left and right of the glass doors, matching pair visible through the glass outside. Center lane empty. Handles chrome, kick plates dark.
5. **Comedy readable at 3 m:** incident sign with a chunky zero, dongle bowl on the ledge, visitor-log binder on the table.

If `agy` describes "a roof from outside", "no NPCs", or "solid green wall", that is a fail under PR-2, same as every other room.

---

## 13. Decisions baked into this note (so Wave 2 does not ask)

- Desk is charcoal + stone, not CEO walnut. Lobby vs Batcave.
- Sofa is navy, not brown leather. Same reason.
- Plant wall is instanced boxes, 4 colors, brick stagger. First InstancedMesh in the repo, justified.
- LED glow is Basic core + Basic halo + Basic desk pool + the one existing PointLight. No SpotLights.
- Hills are squashed spheres, copied from `makeOutdoorScenery`. Tree row is `makeTree` at x=-8.2.
- Glass doors are set dressing inside the south wall. Collision stays. Spawn does not move.
- Four door planters, box pots, sphere leaves, inside pair clears `ENTRANCE_EXIT_AREA`.
- Three jokes: blinking incident zero, complimentary dongles, visitor-log SLA. ASCII only.

If Lucas overrules any of these in the morning, change the note before the factory files, not after.
