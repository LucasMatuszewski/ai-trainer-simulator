# C-64 Wave 1 — room geometry: move the meeting room, turn the old one into a reception shell

You are implementing Wave 1 of correction C-64 in `/home/lucas/DEV/Projects/ai-trainer-simulator`
on branch `feat/c64-reception-and-meeting-room-move-opus`.

**READ FIRST**: `.claude/plans/c64-reception-and-meeting-room-move.md`. It has the full context,
Lucas's verbatim request, and the ten decisions (D1-D10) already taken. This brief is the
executable subset. If the plan and this brief disagree, the plan wins — and say so in your report.

## What Lucas asked for (the part you are building)

> clone the meeting room next to the kitchen, so move it in one direction, with entrance from
> the kitchen, on the other side than the toilet is. We should move there all furnitures and the
> sales chart and content booth, and the points we have there for the 2 groups of npcs. move the
> sign next to the door to the kitchen, on the left of the door.
>
> if we had any references to "meeting room" we should remap them to the new building. e.g. Zosia
> has a meetings in meeting room, we should move them to the new location, and I would also move
> these meetings on the morning, not on the afternoon

## Files you own (do not touch anything else)

- `src/content/world-layout.ts`
- `src/content/corridor-waypoints.ts`
- `src/engine/npc-spawn-validator.ts`
- `src/content/npc-schedule.ts` — ONLY `RANDOM_DESTINATIONS`, `MEETING_SEATS`, and Zosia's
  period rows. Another agent owns the receptionist rows in this file later; keep your diff tight.
- `tests/unit/**` — new tests, plus updating existing ones whose expectations genuinely moved.

Another agent owns `src/engine/furniture/*`, `src/engine/scene.ts`, `src/content/npcs.ts` and the
dialogue files. Do not edit those.

## The changes

### 1. New meeting room, south of the kitchen

Keep the room id `meeting-room` and the name "Meeting Room". Only the coordinates move. This is
decision D10 and it matters: every existing `"meeting"` NPC state, roster label and dialogue
reference then keeps working untouched.

- Floor: `x=[9.5, 19], z=[7.5, 17.5]`.
- The kitchen's south wall is `wall("kitchen-south", 9.5, 19, 7, 7.5)`. The new room's own north
  wall segments must sit INSIDE the new room at `z=[7.5, 7.78]`, following the exact offset
  pattern already used by `meeting-north-west` / `meeting-north-east` and the kitchen's west
  walls. No two wall volumes may share space — that is the #47 z-fight bug class and
  `tests/unit/no-zfighting.test.ts` guards it.
- Doorway `kitchen-to-meeting` at `x=[10, 12]` in that shared boundary. Build it with the same
  `gap(...)` two-band form as `kitchen-to-toilet`, and punch the matching hole in the kitchen's
  south wall (split it into two segments the way `kitchen-east` was split for the toilet).
- Furniture, carried over and re-centred on the new floor centre `(14.25, 12.5)`:
  - table at `[14.25, 0.45, 12.5]`, size `[3, 0.9, 5.5]`
  - 8 chairs: columns at `x = 11.85` and `x = 16.65`, rows at `z = 10.3, 11.8, 13.3, 14.8`
  - projector screen at `[14.25, 1.7, 17.22]`, size `[4.5, 2, 0.12]`, on the south wall
  - the `NEXT MEETING: 5 MIN AGO` sign moves here, on a wall where someone in the room sees it

### 2. Signs on the kitchen's south wall

- Add a `MEETING ROOM` sign on the KITCHEN face of the kitchen's south wall, centred at
  `x = 12.9`, size about `[1.4, 0.6]`. That is the +X side of the doorway, which is the LEFT of
  the door for a player in the kitchen facing the new room (facing +Z, left is +X — this is
  Lucas's own convention, see D2 in the plan).
- Move the existing `TODAY'S MENU: COFFEE` sign from `x=14` to `x=16.5` so the two do not
  overlap (D3).
- Add a unit test asserting no two signs mounted on the same wall plane overlap in their
  projected extents. This is a general guard, not a one-off.

### 3. Old meeting room becomes the reception SHELL

You do the shell only; the interior furniture is another agent's job.

- Room id becomes `reception`, name "Reception". Floor unchanged: `x=[-6,6], z=[9,19]`.
- Replace the solid `meeting-west` wall with a GLASS wall / huge window, reusing the SAME
  technique the training room already uses for its glass. Find it and reuse it; do not invent a
  second glass style.
- Leave a clear, unobstructed floor area for the interior agent: the reception desk will land
  around `(3.4, 13.5)`, the sofa around `(-3.4, 13.5)`, and a Xerox printer around `(5.0, 16.5)`.
  Do not put walls or waypoints through those spots.
- The `MEETING ROOM` door sign that the C-60 `DOOR_SIGN_MOUNTS` code mounts at the main-office
  doorway must now read `RECEPTION`. If that sign lives in `scene.ts` rather than your files,
  DO NOT edit it — note it in your report and leave it to the orchestrator.
- **Do not move the entrance.** `OFFICE_DOOR` is at `z=18.2`, and `ENTRANCE_EXIT_AREA`,
  `MEETING_SEATS` and the whole C-62 arrival/departure system depend on it. The C-62 e2e tests
  will fail if the spawn point moves.

### 4. NPC destinations and Zosia

- `RANDOM_DESTINATIONS`: `deal-wall` moves `(-4.6, 12.6)` -> `(10.9, 12.6)`; `content-booth`
  moves `(4.6, 12.6)` -> `(17.6, 12.6)`. Keep each facing the wall it stands against. These are
  "the points we have there for the 2 groups of npcs".
- `MEETING_SEATS`: move all four to the new table, keeping the same relative offsets.
- Zosia: her meeting moves from AFTERNOON to MORNING (Lucas asked for this explicitly). Her
  morning row becomes the `meeting` state at a new-room seat; her afternoon row becomes
  `at-desk` at her existing desk position.

### 5. Pathing — the part most likely to break

- Add waypoints for the new room: one at the kitchen side of the new doorway, one at the meeting
  side, and 2-4 interior points (table ends, deal-wall, content-booth) so A* can route to every
  destination.
- Add waypoints for the reception if the old meeting-room ones no longer serve it.
- `corridor-waypoints.ts` computes its edges at module load by testing segments against furniture
  AABBs, so it does NOT need hand-maintained edges — but it DOES need enough nodes.
- The all-pairs connectivity test must pass: every waypoint reachable from every other.

### 6. Collision

Every new solid prop (table, chairs, projector screen) needs a matching AABB in
`ROOM_FURNITURE_AABBS` in `src/engine/npc-spawn-validator.ts`, and the old meeting-room furniture
AABBs must be removed or moved. Miss this and NPCs walk through the table.

## Hard rules

1. **Do NOT commit. Do NOT push.** Leave the working tree dirty; the orchestrator reviews and commits.
2. Never `git add -A` / `git add .`.
3. `./node_modules/.bin/tsc --noEmit` must exit 0.
4. `./node_modules/.bin/vitest run` must pass. The baseline on this branch is **481 passing, 0 failing**.
   If an existing test genuinely encoded the old coordinates, update it and SAY SO in your report,
   naming each one. Never delete or weaken a test to get green.
5. Write the test FIRST for any new pure function (repo rule HR-6).
6. Plain ASCII only in comments and strings — no em dashes, smart quotes or emoji.
7. Comments explain WHY, reference C-64, and quote Lucas where it helps a future reader.
8. Do not run the dev server or a build. Do not run playwright.

## Definition of done

- New meeting room exists south of the kitchen, reachable through a kitchen doorway, with the
  table, 8 chairs, projector screen and the meeting sign.
- Both signs on the kitchen south wall, not overlapping, with the MEETING ROOM sign on the +X
  side of the door.
- Old room is `reception` with a glass west wall and an unobstructed interior.
- deal-wall, content-booth and all four meeting seats are in the new room.
- Zosia meets in the morning, at her desk in the afternoon.
- Waypoint connectivity holds; new furniture has AABBs.
- typecheck clean, full vitest suite green, plus your new tests.
- Write your report to `.agent-briefs/c64-w1-report.md`: what you changed, every test you had to
  update and why, anything you could not do, and anything in this brief you think is WRONG.

## Please argue with me

If any coordinate, decision or instruction here looks wrong — the room placement, the left/right
convention for the sign, the id-stays-coordinates-move approach, anything — say so plainly in your
report. I would rather find out now than after three more waves are built on top of it. Implement
your best reading, and flag the disagreement.

## Autonomy (read this before asking anything)

**You are running fully autonomously. Nobody is awake to answer you.** Lucas is asleep and the
orchestrator will not interactively unblock you mid-run.

- Never stop to ask a question. If something is ambiguous, MAKE A DECISION, implement it, and
  record the decision plus your reasoning in your report.
- Never leave the work half-done pending a clarification. A completed implementation under a
  stated assumption is worth far more than a question in a log file nobody reads until morning.
- If a sub-part turns out to be genuinely impossible, finish everything else in full and say
  exactly what you skipped and why.
- "Please argue with me" above means: write the disagreement in the report AND implement your
  best reading anyway. It does not mean pause.
