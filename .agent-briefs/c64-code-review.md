# Code review: `feat/c64-reception-and-meeting-room-move-opus` vs `master`

Review of `git diff master...HEAD -- src/` (committed HEAD only). Scope: C-64 (meeting room move, reception lobby, Renata) and C-63 (skin-colored hands, per-person appearance, desk poses). No source was edited.

HEAD is `52e2e9c`. The working tree already contains an uncommitted Deal Wall / Content Booth move and a Xerox copy-run; those patches are **not** in HEAD and do not count as shipped.

## Summary

C-64 does move the meeting-room **floor, walls, schedule destinations, and waypoints** to `x=[9.5,19], z=[7.5,17.5]`, and the old shell at `x=[-6,6], z=[9,19]` is a reception with Renata and a west glass wall. That part of the data is real. The visual revenue-corner props did not follow the room: on HEAD the Deal Wall and Content Booth meshes are still mounted on the old meeting-room walls, which are now reception glass and the plant wall. Meeting seats were translated into the new room AABB but not around the new table, so two of four seats sit inside the table, and the first guest seat is Zosia's exact pose. Renata's authored stand point is inside the reception-desk collision box, and she is eligible to be pulled off the desk into Zosia's meeting. C-63 (hands, authored looks, typing/stretch/gestures, yaw gate) is in much better shape; the weak spots there are tests that assert "someone typed" rather than the working-position invariant.

Dominant risk: leftover old-room mesh coordinates plus meeting seats that collide with furniture, papered over by tests that only check "inside the new room rectangle."

## Issues

### Issue 1 -- Severity: bug
- File: src/engine/scene.ts:1102
- Description: C-64 moved the Deal Wall **destination** to `(10.9, 12.6)` in the new meeting room (`src/content/npc-schedule.ts:472`) and the waypoint `meeting-deal-wall` to the same spot (`src/content/corridor-waypoints.ts:121`), but `makeDealWall()` still does `g.position.set(-6.02, 0, 12.6)`. That is the west wall of the **old** meeting room, now the reception's glass (`world-layout.ts:425`, `wall("glass", -6.5, -6, 9.5, 19)`). Comment at `scene.ts:1068` still says sales NPCs stand at `(-4.6, 12.6)`, which is also the old room. Result: a sales leaderboard hanging in the garden window, while affinity NPCs walk to a bare west wall in the new meeting room.
- Suggestion: Place the mesh on the new west wall inner face (`x≈9.78`, `z=12.6`) to match the destination that already faces `-PI/2`. Pin the mesh position in a test that reads the built scene (or a named export), not only `RANDOM_DESTINATIONS`.
- Status: open

### Issue 2 -- Severity: bug
- File: src/engine/scene.ts:1157
- Description: Same class of leftover as Issue 1. `makeContentBooth()` still does `g.position.set(5.75, 0, 12.6)` with `rotation.y = -Math.PI / 2`. That is the east wall of the old meeting room, now reception interior. The relocated destination is `(17.6, 12.6)` (`npc-schedule.ts:473`). The booth at `x=5.75, z=12.6` sits inside the plant-wall volume (plant wall at `[5.88, 0, 13.5]`, 5 m along Z, `world-layout.ts:440`), so the roll-up clips the foliage. Comment at `scene.ts:1120` still says marketing NPCs stand at `(4.6, 12.6)`.
- Suggestion: Move the mesh to the new east wall inner face (`x≈18.97`, `z=12.6`) to match `content-booth`. Exclude it from reception. Test mesh vs destination, not destination vs room AABB.
- Status: open

### Issue 3 -- Severity: bug
- File: src/content/npc-schedule.ts:200
- Description: Meeting table AABB is `x=[12.75, 15.75], z=[9.75, 15.25]` (`world-layout.ts:479` size `[3, 0.9, 5.5]` at `[14.25, 12.5]`; same numbers in `npc-spawn-validator.ts:114`). `MEETING_SEATS` east column is `x=13.45` (`npc-schedule.ts:200` and `:202`), 0.7 m inside the table from the west edge. West column `x=10.65` is clear of the table but 1.2 m west of the west chairs at `x=11.85`. Symmetric east-of-table seats would be near `x=17.85` (or on the east chairs at `16.65`), not `13.45`. Guests therefore path into the table. `planNpcPath` cannot attach a waypoint graph to a point inside an obstacle (`npc-path.ts:129-131`); it falls through to a straight line to a 1 mm depenetration (`npc-path.ts:194-195`) that ignores walls and does not account for NPC radius 0.3, so the body still overlaps the table.
- Suggestion: Put west seats at/just west of `x=11.85` and east seats at/just east of `x=16.65`, facing `+PI/2` / `-PI/2`. Assert `isSpawnBlocked(seat, getNpcObstacles()) === false` for every `MEETING_SEATS` entry (the existing test only checks the room rectangle).
- Status: open

### Issue 4 -- Severity: bug
- File: src/content/npc-schedule.ts:199
- Description: `MEETING_SEATS[0]` is `{ x: 10.65, z: 11.1, face: PI/2 }`, which is **identical** to Zosia's morning meeting pose (`npc-schedule.ts:321`). Guest assignment always starts at index 0 (`npc-controller.ts:752`). Zosia is excluded from the guest list (`npc-controller.ts:743`) but not from that seat, so the first of the 1–2 morning guests is authored on top of her. `finishWalk` can ring-park around occupants, but the destination itself is still her coordinates, so the guest walks at her and then shuffles.
- Suggestion: Drop Zosia's pose from `MEETING_SEATS`, or skip any seat within `MIN_SEPARATION` of `NPC_SCHEDULES.zosia.morning.position`.
- Status: open

### Issue 5 -- Severity: bug
- File: src/engine/npc-controller.ts:743
- Description: Morning meeting guests are every NPC whose **current period** state is `at-desk`, minus only Zosia, Burek, and Dawid. Renata's morning/afternoon/evening rows are all `at-desk` at `(4.4, 13.5)` (`npc-schedule.ts:393-397`). She is therefore in the shuffle and can be sent to `MEETING_SEATS[0]` / `[1]`. That empties the reception desk during the one scene she is supposed to be the tutorial host / help centre, and it is how a receptionist ends up inside the meeting table (Issue 3).
- Suggestion: Exclude `"renata"` (and any other station-bound NPC) from `eligible`, the same way Dawid is excluded.
- Status: open

### Issue 6 -- Severity: bug
- File: src/content/npcs.ts:291
- Description: Renata is authored at `(4.4, 13.5)`, "1 m behind" the desk at `(3.4, 13.5)`. The reception-desk collision box is `{ minX: 2.95, maxX: 4.55, minZ: 12.15, maxZ: 14.85 }` (`npc-spawn-validator.ts:124`). `4.4` is 0.15 m inside `maxX`; with `NPC_DEFAULT_RADIUS = 0.3` she is solidly in the desk. `startPath` on HEAD passes the full obstacle list (`npc-controller.ts:630`), so a path whose goal is inside that AABB cannot use the waypoint graph. Morning arrivals spawn her at `OFFICE_DOOR` `(0, 18.2)` (`npc-schedule.ts:185`) and then either strand her at the door or take the `depenetrateEndpoint` straight-line fallback through furniture (`npc-path.ts:194-195`). The visitor waypoint at `(2.2, 13.5)` is the correct *front* of the desk; nothing equivalent exists for her working point.
- Suggestion: Move her just outside `maxX` (e.g. `x≈4.85`) or shrink the desk AABB to the counter body and keep a separate non-colliding return. Do not special-case "goals may sit inside furniture" in `startPath` without also excluding that AABB from depenetration of other NPCs.
- Status: open

### Issue 7 -- Severity: bug
- File: src/engine/furniture/plant-wall.ts:21
- Description: Foliage is placed at local `x = 0.12` (`plant-wall.ts:29`), i.e. local **+X**. The reception plant wall is spawned at `[5.88, 0, 13.5]` with **no** `rotationY` (`world-layout.ts:440`). World +X is into the east wall at `x=6`, so leaves grow into the wall and the lobby sees the back of `pw-back`. Compare the Xerox on the same wall, which correctly sets `rotationY: -Math.PI / 2` (`world-layout.ts:448`). Combined with Issue 2, the Content Booth at `x=5.75` is occupying the space the foliage should fill.
- Suggestion: `rotationY: Math.PI` (or `-Math.PI`) so local +X points west into the lobby, and confirm the backing sits on the wall inner face.
- Status: open

### Issue 8 -- Severity: bug
- File: src/content/npc-schedule.ts:456
- Description: The C-64 "clear seat on the west side of the table" random destination is `{ x: 11.85, z: 10.3 }`, which is exactly a chair center (`world-layout.ts:480-482`). Chair AABBs are `x ± 0.22, z ± 0.22` (`npc-spawn-validator.ts:115-120`), so the point is blocked. `pickRandomDestination` returns it raw (`npc-schedule.ts:546-547`); whoever rolls `meeting` stands in a chair. The revenue-corner test at `tests/unit/npc-schedule.test.ts:327` only checks `deal-wall` and `content-booth`, so this destination never gets the `isSpawnBlocked === false` invariant.
- Suggestion: Offset the stand point off the chair (toward the aisle, e.g. `x=10.9` like the deal-wall spot, or `x=11.85, z=9.6` north of the north-west chair) and include `state === "meeting"` in the clearance test.
- Status: open

### Issue 9 -- Severity: suggestion
- File: src/engine/scene.ts:119
- Description: Two Meeting Room signs occupy the same kitchen-south wall. `DOOR_SIGN_MOUNTS.kitchenMeeting` is `[12.9, 2.1, 6.72]` with `face: 0` (plane default front is +Z, so this faces **into the wall**). `WORLD_ROOMS.kitchen.signs` already has `{ text: "MEETING ROOM", position: [12.9, 2.1, 7], face: Math.PI }` (`world-layout.ts:343`), which correctly faces back into the kitchen. The C-60 helper is leftover duplication; the player sees a backface plus the real poster stacked 0.28 m apart. The overlapping-signs test (`tests/unit/world-layout.test.ts:83`) only walks `WORLD_ROOMS.signs`, so it cannot catch the scene.ts copy.
- Suggestion: Delete `DOOR_SIGN_MOUNTS.kitchenMeeting` and the `addDoorSign(..., kitchenMeeting)` call, or move that helper onto a wall that does not already have a `WORLD_ROOMS` sign.
- Status: open

### Issue 10 -- Severity: suggestion
- File: src/content/world-layout.ts:261
- Description: `kitchen-to-meeting` / `meeting-to-kitchen` AABBs are `x=[10, 12]` — a **2.0 m** geometric gap. `gap()` defaults `width = 2.5` (`world-layout.ts:79`). Collision uses wall AABBs, so the hole is 2 m, but `tests/unit/world-layout.test.ts:127` asserts `doorway.width >= 2.5` and therefore passes on the unused field. NPCs/player can still walk it (waypoints at `x=11`), but the test no longer encodes the "2.5 m doorways" rule it claims to.
- Suggestion: Either widen the wall split to `x=[9.75, 12.25]` (or similar) so the hole is 2.5 m, or change the test to `maxX - minX` of `from`/`to` and document the 2 m kitchen door as an exception.
- Status: open

### Issue 11 -- Severity: suggestion
- File: src/content/world-layout.ts:480
- Description: Meeting chairs are emitted with no `rotationY`. West column (`x=11.85`) should face +X (into the table); east column (`x=16.65`) should face -X. Default box chairs all face the same way, so half the row has its back to the table. Same pattern as the kitchen chairs, which do set `rotationY`.
- Suggestion: `rotationY: Math.PI / 2` on the west column and `-Math.PI / 2` on the east column.
- Status: open

### Issue 12 -- Severity: suggestion
- File: src/content/npc-schedule.ts:571
- Description: `pickColleagueDesk` stands a visitor at `target.position.z - 1.2` using the **roster spawn**, not the live mesh. For Renata that is `(4.4, 12.3)`, which is still inside the desk AABB (`z` in `[12.15, 14.85]`, `x=4.4` in `[2.95, 4.55]`). Walk-to-face has `reception-desk-visitor` at `(2.2, 13.5)` (`corridor-waypoints.ts:112`) specifically so player approaches stay off the counter; random colleague visits ignore it.
- Suggestion: If the target is Renata, use `reception-desk-visitor` (or `x = desk.minX - 1.2`). Generally, offset along the NPC's `rotationY` / schedule `face`, not always `-Z`.
- Status: open

### Issue 13 -- Severity: suggestion
- File: src/content/corridor-waypoints.ts:130
- Description: `segmentTouchesAabb` is duplicated in `corridor-waypoints.ts:130-152` and `npc-path.ts:62-80` (and again in `tests/unit/corridor-waypoints.test.ts:27-51`). C-64 added the waypoint module as a third copy of the same slab test. Drift between them is how a graph edge can be legal in `buildWaypointEdges` and illegal in `planNpcPath` (or the reverse).
- Suggestion: One exported helper used by the graph builder, the planner, and the tests.
- Status: open

### Issue 14 -- Severity: suggestion
- File: tests/unit/npc-schedule.test.ts:277
- Description: The C-64 meeting-seat test only asserts each seat is inside `x=[9.5,19], z=[7.5,17.5]`. That is the room floor, not the invariant the seats were written for ("sit at the table, not in it"). `x=13.45` passes. The revenue-corner clearance test (`npc-schedule.test.ts:327`) checks `isSpawnBlocked` for deal-wall / content-booth destinations but not `MEETING_SEATS` or the `meeting` random dest. `tests/unit/world-layout.test.ts:54` checks room ids, furniture **types**, and the reception aisle `|x|>1.5`, and never the Deal Wall / Content Booth **mesh** coordinates — which is exactly how Issues 1–2 shipped. `tests/unit/world-layout.test.ts:125` asserts the `width` field, not the geometric gap (Issue 10).
- Suggestion: For every C-64 placement, assert (a) inside the correct room, (b) `isSpawnBlocked(..., radius 0.3) === false`, (c) mesh/destination pairs share a wall. Mutation-kill the test by putting a seat at `(14.25, 12.5)` (table center) and at `(-4.6, 12.6)` (old room).
- Status: open

### Issue 15 -- Severity: suggestion
- File: tests/e2e/c63-npc-appearance-animations.spec.ts:117
- Description: C-63 e2e requires only that **some** at-desk NPC recorded `maxForward < -0.8` over 40 s. That can pass on a single stretch/gesture leak or on one NPC while everyone else types after turning to talk. The unit tests for `isWorkingAtDesk` (`tests/unit/npc-desk-poses.test.ts:266-289`) are the real invariant; the e2e never reads `state === "at-desk"` together with yaw vs `target.face`. The "hands exist" e2e (`c63-npc-appearance-animations.spec.ts:69`) is a child-name presence check, which is fine as a mesh smoke test but does not assert hand color vs head color (the unit test at `npc-appearance.test.ts:52` does).
- Suggestion: Keep the unit tests as source of truth. If the e2e stays, sample only NPCs whose live yaw is within `WORKING_YAW_TOLERANCE` of their schedule face, and assert no typing pose on `state === "walking"` (that test at line 123 is the stronger one — keep it).
- Status: open

### Issue 16 -- Severity: nit
- File: src/content/world-layout.ts:124
- Description: `MAIN_OFFICE_DOORWAYS[2]` is still id `"main-to-meeting"` and the comment at `:132` still says the south door is the meeting room. The door now opens into reception. Downstream uses coordinates, not the id, so this is naming leftover rather than a pathing break. Same stale "meeting room" language in `scene.ts:372` / `main.ts:484` (the cinematic still *lands* at `(0, 17.8)`, which is correct for the entrance-now-reception) and `corridor-waypoints.ts:38`.
- Suggestion: Rename the doorway id to `main-to-reception` and update comments so the next move does not grep the wrong room.
- Status: open

### Issue 17 -- Severity: nit
- File: src/ui/office-roster.ts:44
- Description: `rosterStatusFor("meeting")` → `"Meeting room"` is fine. Renata's live state is `at-desk`, so her card reads "At desk" rather than "Reception" even though `rosterStatusFor` already has a `"reception"` branch (`office-roster.ts:46`) that nothing ever sets. Not a functional break; the new room is invisible on the roster for the one NPC who lives there.
- Suggestion: Map Renata's settled `at-desk` (or a new `reception` schedule state) onto the existing label.
- Status: open

## C-63 (hands / appearance / desk poses)

No correctness bug on the pose state machine comparable to the C-64 coordinate leftovers.

- Hands are children of `arm-left` / `arm-right` at `y = -SLEEVE_LENGTH - HAND_LENGTH/2` (`npc-mesh.ts:176`), total length still 0.65 m. Tests in `npc-appearance.test.ts` actually check parent, skin color vs shirt, and length.
- Authored `appearance` is required for every human (`npc-appearance.test.ts:108`) and combinations are unique (`:117`).
- `isWorkingAtDesk` + cancel-to-ramp (`npc-idle.ts:420-425`) is the right fix for typing-while-turned. Stretch is intentionally exempt. `resetIdlePose` on `startPath` (`npc-controller.ts` HEAD, C-63 comment above the walk start) stops facepalm-into-walk.
- `updateIdle` is skipped while `npcState === "walking"`, so timers do not run during a walk; they do not get stuck at `left < 0` in that path. Off-desk, `nextTypeAt` / `nextGestureAt` are re-armed (`npc-idle.ts:452-453`); stretch is allowed off-desk by design.

C-63 leftover to watch: Renata is `at-desk` facing `-PI/2`, so she will type toward -X (across the counter). That is acceptable if she stays at the desk (Issue 5/6). If she is meeting-guested, she can type inside the table.

## What looks correct

- Reception floor `[-6,6] x [9,19]`, west glass, south solid wall, north split around the old office doorway (`world-layout.ts:416-430`). Meeting floor `[9.5,19] x [7.5,17.5]`, doorway shared with kitchen at `x=[10,12]` (`:455-470`). Floors do not overlap.
- `roomAt` classifies the new meeting room before kitchen (`chatter.ts:82-86`) and reception as `[-6,6] x [9,19]`.
- Entrance / evening exit stayed in the old room: `OFFICE_DOOR` `(0, 18.2)`, `ENTRANCE_EXIT_AREA` `z=[17.2, 18.6]`, player start `(0, 17.8)`. That matches C-62+C-64 (lobby is the entrance).
- Renata dialogue trees exist, FAQ is re-enterable, tutorial mentions WASD / RMB / Space / click / Z / Escape (`dialogues-renata.ts`, `tests/unit/renata.test.ts`).
- Waypoints `door-kitchen-meeting` / `meeting-entry` sit on either side of the new door; `reception-desk-visitor` is outside the desk AABB.

## Note on uncommitted work

`git status` shows dirty `src/engine/scene.ts` (Deal Wall → `(9.8, 12.6)`, Content Booth → `(18.97, 12.6)`), dirty `src/engine/npc-controller.ts` (Xerox copy-run, `pathObstacles` endpoint filter), and untracked `src/engine/printer-flash.ts`. Those look like in-progress fixes for Issues 1, 2, and 6. They are not on HEAD. This review is of the branch as committed.
