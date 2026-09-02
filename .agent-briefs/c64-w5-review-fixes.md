# C-64 Wave 5 — fix the issues found by an independent code review

You are fixing review findings on branch `feat/c64-reception-and-meeting-room-move-opus` in
`/home/lucas/DEV/Projects/ai-trainer-simulator`.

## Autonomy (read this before asking anything)

**You are running fully autonomously. Nobody is awake to answer you.** Never stop to ask a
question. If something is ambiguous, DECIDE, implement it, and record the decision in your report.
A finished implementation under a stated assumption beats a question in a log file. Disagreement
goes in the report ALONGSIDE finished work, never instead of it.

## Context

Read `.agent-briefs/c64-code-review.md` — an independent review (grok-4.6) of the whole C-64 +
C-63 branch. It is precise and cites file:line. Work from it. Issues 1 and 2 (Deal Wall and
Content Booth still on the old room's walls) are **already fixed** in commit `60afb7f`; skip them
and verify they are indeed fixed.

Fix issues 3 through 11 below. Issues 12 and 13 are optional — do them only if the rest is done
and green.

The theme of the review is worth internalising: several tests assert "the point is inside the new
room rectangle" when the invariant that actually matters is "the point is not inside a piece of
furniture". Where you fix a coordinate, also strengthen the test to the real invariant.

## The fixes

### Issue 3 — meeting seats are inside the meeting table (BUG)

The table AABB is `x=[12.75, 15.75], z=[9.75, 15.25]`. `MEETING_SEATS` east column is at
`x=13.45`, which is 0.7 m INSIDE the table. Guests path into the furniture, and
`planNpcPath` cannot attach a waypoint graph to a point inside an obstacle - it falls through to a
straight line plus a 1 mm depenetration that ignores walls and the 0.3 m NPC radius.

Fix: put the west seats at or just west of the west chair column (`x=11.85`) facing `+pi/2`, and
the east seats at or just east of the east chair column (`x=16.65`) facing `-pi/2`.
**Then assert `isSpawnBlocked(seat, getNpcObstacles()) === false` for every `MEETING_SEATS` entry.**
The existing test only checks the room rectangle, which is exactly why this got through.

### Issue 4 — the first guest is seated on top of Zosia (BUG)

`MEETING_SEATS[0]` is identical to Zosia's morning meeting pose. Guest assignment always starts at
index 0 and Zosia is excluded from the guest LIST but not from her own SEAT, so the first guest is
authored on her coordinates.

Fix: either drop Zosia's pose from `MEETING_SEATS`, or skip any seat within `MIN_SEPARATION` of
`NPC_SCHEDULES.zosia`'s meeting position. Prefer whichever keeps the data honest rather than
adding a runtime workaround. Add a test.

### Issue 5 — Renata gets pulled out of reception into the meeting (BUG)

Morning meeting guests are every NPC whose current-period state is `at-desk`, minus Zosia, Burek
and Dawid. Renata is `at-desk` in all three periods, so she can be sent to the meeting - emptying
the reception during the exact scene where she is the tutorial host and help centre.

Fix: exclude `renata` from `eligible` the way Dawid is excluded. Better: introduce a small named
set of station-bound NPCs rather than a growing list of string literals, and say why in a comment.

### Issue 6 — Renata stands inside the reception desk's collision box (BUG)

Her authored point `(4.4, 13.5)` is 0.15 m inside the desk AABB `x=[2.95, 4.55]`, and with the
0.3 m NPC radius she is solidly in the furniture. A later commit (`60afb7f`) made `startPath`
ignore obstacles that contain an endpoint, which unblocks her walking, but the underlying data is
still wrong: morning arrivals path her from the office door to a goal inside furniture, and other
NPCs' depenetration still treats that volume as solid.

Fix: move her working point just clear of the desk (about `x=4.85`) or shrink the desk AABB to the
counter body, whichever reads better against the actual mesh - she must still look like she is
standing BEHIND the counter, not floating away from it. Then assert her position is not
`isSpawnBlocked`. If you move her, update `src/content/npcs.ts` AND her `NPC_SCHEDULES` rows AND
the printer copy-run return point in `npc-controller.ts` so they stay in sync.

### Issue 7 — the plant wall's leaves grow into the wall (BUG)

`plant-wall.ts` places foliage at local `+X`, and the reception plant wall is spawned at
`[5.88, 0, 13.5]` with NO `rotationY`. World +X at x=5.88 is into the east wall at x=6, so the
lobby sees the flat back of the wall and the leaves are buried. The Xerox on the same wall
correctly sets `rotationY: -Math.PI / 2`.

Fix: give the plant wall the rotation that points its foliage west into the lobby, and confirm the
backing sits against the wall inner face. This is the single most visible defect in the room -
Lucas asked for "one wall whole in green flowers" and currently sees a blank panel.

### Issue 8 — the generic `meeting` destination is a chair (BUG)

`{ x: 11.85, z: 10.3 }` is exactly a chair centre, and chair AABBs are `+/-0.22`, so the point is
blocked. Whoever rolls "meeting" stands in a chair.

Fix: offset it clear of the chairs, and extend the clearance test to cover `state === "meeting"`,
not just `deal-wall` and `content-booth`.

### Issue 9 — two Meeting Room signs on the same wall, one facing backwards

`DOOR_SIGN_MOUNTS.kitchenMeeting` at `[12.9, 2.1, 6.72]` has `face: 0`, which points the plane
INTO the wall, and `WORLD_ROOMS.kitchen.signs` already has a correct MEETING ROOM poster at
`[12.9, 2.1, 7]` facing `Math.PI`. The player sees a backface stacked 0.28 m behind the real sign.
The overlap test only walks `WORLD_ROOMS.signs`, so it cannot see the scene.ts copy.

Fix: remove the duplicate `DOOR_SIGN_MOUNTS.kitchenMeeting` mount and its `addDoorSign` call,
keeping the `WORLD_ROOMS` poster. Update `tests/unit/signs-and-walls.test.ts` accordingly.

### Issue 10 — the doorway width test passes on an unused field

`kitchen-to-meeting` is a 2.0 m geometric gap, but the test asserts `doorway.width >= 2.5` against
a `width` field that nothing reads. The test claims to encode a "2.5 m doorways" rule and does not.

Fix: widen the wall split so the real hole is 2.5 m (e.g. `x=[9.75, 12.25]`), and change the test
to measure the ACTUAL gap from the `from`/`to` AABBs rather than the decorative field. If widening
breaks a wall or waypoint, keep 2.0 m and fix the test to measure reality plus document the
exception - but say which you chose.

### Issue 11 — half the meeting chairs have their back to the table

The chairs are emitted with no `rotationY`, so every chair faces the same way. The kitchen chairs
set theirs.

Fix: `rotationY: Math.PI / 2` on the west column, `-Math.PI / 2` on the east.

## Files you may touch

`src/content/npc-schedule.ts`, `src/content/npcs.ts`, `src/content/world-layout.ts`,
`src/engine/npc-controller.ts`, `src/engine/scene.ts`, `src/engine/furniture/plant-wall.ts`,
`src/engine/npc-spawn-validator.ts`, `tests/**`.

## Hard rules

1. **Do NOT commit. Do NOT push.** Leave the working tree dirty.
2. Never `git add -A` / `git add .`.
3. `./node_modules/.bin/tsc --noEmit` must exit 0.
4. `./node_modules/.bin/vitest run` must pass. Baseline is **526 passing, 0 failing**.
5. Strengthen the weak tests as described - a test that checks the room rectangle when the real
   invariant is furniture clearance is how every one of these shipped.
6. Plain ASCII. Comments explain WHY and reference C-64.
7. Do not run the dev server, a build, or playwright.

## Definition of done

Issues 3-11 fixed, each with a test that encodes the REAL invariant. typecheck clean, full suite
green. Report to `.agent-briefs/c64-w5-report.md`: what you fixed, the decision you took on issue
10, any issue you believe the reviewer got wrong, and anything you could not do.
