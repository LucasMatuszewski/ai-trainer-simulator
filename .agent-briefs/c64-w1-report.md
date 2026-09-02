# C-64 Wave 1 geometry report

## Implemented

- Moved `meeting-room` to `x=[9.5, 19]`, `z=[7.5, 17.5]` south of the kitchen.
- Split the kitchen south wall and added matching `kitchen-to-meeting` / `meeting-to-kitchen` doorway bands at `x=[10, 12]`.
- Re-centred the meeting table, eight chairs and projector screen on the new room.
- Moved `NEXT MEETING: 5 MIN AGO` into the new meeting room.
- Added the kitchen-face `MEETING ROOM` sign at `x=12.9` and moved `TODAY'S MENU: COFFEE` to `x=16.5`.
- Re-identified the old meeting room as `reception`, retained its entrance, removed its furniture, and replaced its west wall with the existing `glass` wall technique.
- Moved `deal-wall`, `content-booth`, all four meeting seats, and Zosia's morning meeting to the new room. Zosia returns to her desk in the afternoon.
- Replaced old meeting waypoints with reception-shell routes and added doorway, table-end, side-destination and south-aisle waypoints for the relocated room.
- Moved the old meeting furniture collision AABB and added AABBs for all eight chairs and the projector screen.
- Added general coplanar sign-overlap coverage plus C-64 room, doorway, schedule and waypoint coverage.

## Existing tests updated

- `tests/unit/world-layout.test.ts`: the authoritative room list now includes `reception`; added exact C-64 shell/room/doorway checks and the general coplanar sign-overlap guard.
- `tests/unit/no-zfighting.test.ts`: the old main-office boundary assertion now names the reception walls, and a new assertion checks separation between the kitchen south walls and meeting north walls.
- `tests/unit/corridor-waypoints.test.ts`: added checks for every new C-64 meeting route stop.
- `tests/unit/npc-schedule.test.ts`: world-coordinate bounds now use `WORLD_BOUNDS`, Zosia's meeting expectation moved from afternoon to morning, and new-room destinations/seats are checked.
- `tests/unit/npc-controller.test.ts`: C-64's morning meeting participant selection advances the controller's shared deterministic RNG prefix. The old arbitrary `Dawid <= 2 starts` fixture changed even though the chatter weights did not. The assertion now checks the actual invariant: quiet CEO Dawid starts less often than highly chatty salesperson Przemek.

No test was deleted. The full suite passes with 497 tests.

## Verification

- `./node_modules/.bin/tsc --noEmit`: pass.
- `./node_modules/.bin/vitest run`: pass, 54 files and 497 tests.
- The existing jsdom `HTMLCanvasElement.getContext()` warnings from `furniture-library.test.ts` remain non-failing.

## Not changed because another agent owns it

- `src/engine/scene.ts` still mounts the main-office doorway sign as `Meeting Room`. The brief explicitly forbids editing that file. The orchestrator / scene owner must change `DOOR_SIGN_MOUNTS.meeting.text` to `RECEPTION` and update `tests/unit/signs-and-walls.test.ts` in the wave that owns `scene.ts`.
- Deal Wall and Content Booth prop meshes are owned by the furniture / scene agent. Their destination coordinates are moved here as requested.

## Decisions and disagreements

- I followed D2's `+X is left when facing +Z` convention exactly.
- I translated `MEETING_SEATS` by the room-centre delta `(14.25, -1.5)`, which is the literal reading of "keeping the same relative offsets." Two legacy relative positions lie over the table footprint, as they did before. This looks questionable for visible seated NPC placement, but changing the offsets would contradict the explicit instruction. The orchestrator should visually verify the seats when the furniture wave renders the room.
- I added two south-aisle waypoints beyond the brief's suggested 2-4 interior points. They are necessary for all-pairs path connectivity around the table, chair rows and projector-screen collision AABBs.
- I found no conflict between the plan and the brief.

No commit or push was made.
