# C-64 Wave 1b review-fix report

## Implemented

1. Fixed `roomAt` to classify the actual C-64 rectangles. Added the `reception` room id, made the relocated meeting room win before kitchen/main-office fallthroughs, and returned `corridor` outside authored room bounds. Reception and meeting conversations now use independent room concurrency keys.
2. Removed the hardcoded afternoon guest logic. The controller now discovers the period where `NPC_SCHEDULES.zosia` has state `meeting` and uses that same period when selecting eligible at-desk guests.
3. Added the future reception counter collision AABB at `x=[2.9,4.0], z=[12.2,14.8]` and a clear visitor waypoint at `(2.2,13.5)`. I chose the brief's cheap AABB-plus-waypoint option because it solves shared NPC routing without adding a Renata-specific exception to `planWalkToFace` before Renata exists.
4. Added a `reception` roster status mapping. Assumption for the later Renata wave: her controller-visible location state will be `reception` while she is at the reception desk; the current generic `at-desk` string contains no room information and cannot distinguish her from office desk workers.
5. Added two visible ceiling-light positions to the relocated meeting room: `(12,12.5)` and `(16.5,12.5)`.
6. Renamed the main-office south doorway sign to `Reception` and added a `Meeting Room` sign at the kitchen-to-meeting doorway.

## Already handled by Wave 1

3. The meeting room west wall already used the inner offset `x=[9.5,9.78]`, so it did not overlap `main-east-south`. No geometry change was needed.
4. The old reception-area meeting-table AABB had already been removed, and the relocated table, eight chairs, and projector screen already had collision AABBs.
5. The generic random `meeting` destination had already moved to `(11.85,10.3)` inside the relocated meeting room.
7. The `NEXT MEETING: 5 MIN AGO` sign was already authored at `(16.5,2.2,7.8)`, facing into the new room. I retained it and added a regression assertion for its position and face.

## Tests updated

- `tests/unit/chatter.test.ts`: changed the old-room expectation from meeting to reception, added relocated-meeting coverage at both sides of the former `z=9` fallthrough, and changed unauthored south-west space to corridor.
- `tests/unit/npc-controller.test.ts`: changed the stationary no-bob fixture from Bartek to Burek because corrected morning guest selection legitimately sends Bartek to Zosia's meeting; Burek is explicitly excluded, keeping the test on its intended invariant.
- `tests/unit/corridor-waypoints.test.ts`: asserts the reception counter is blocked and the visitor stop is clear.
- `tests/unit/office-roster-status.test.ts`: asserts the reception label.
- `tests/unit/world-layout.test.ts`: asserts meeting-room lights and the existing next-meeting sign mount.
- `tests/unit/signs-and-walls.test.ts`: asserts the Reception sign and the new kitchen-side Meeting Room sign.
- `tests/e2e/c60-door-signs.spec.ts`: updated the old south-door title and screenshot name from Meeting Room to Reception. Per brief, Playwright was not run.

## Verification

- `./node_modules/.bin/tsc --noEmit`: pass.
- `./node_modules/.bin/vitest run`: pass, 54 files and 499 tests.
- Focused regression run: pass, 8 files and 105 tests.
- `git diff --check`: pass.
- Existing jsdom `HTMLCanvasElement.getContext()` warnings from `furniture-library.test.ts` remain non-failing.

## Brief issue noted

- Defect 3 calls the overlap a reception west-wall problem, but the cited coordinates and requested fix concern the relocated meeting room's west wall. I applied the coordinate intent and recorded that Wave 1 had already avoided the overlap.
- The roster cannot infer a room from generic `at-desk` alone. The explicit `reception` mapping is ready for Renata's later controller state; changing the roster API or NPC types now would violate the brief's file ownership boundary.

No commit or push was made. Pre-existing deleted PNGs and untracked Wave 2/Wave 4 briefs were left untouched.
