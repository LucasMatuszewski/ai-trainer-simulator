# C-64 Wave 1b — fixes from an independent geometry review

You are finishing Wave 1 of correction C-64 in `/home/lucas/DEV/Projects/ai-trainer-simulator`
on branch `feat/c64-reception-and-meeting-room-move-opus`.

Wave 1 (`.agent-briefs/c64-w1-geometry.md`) has already run and moved the meeting room south of
the kitchen, turned the old room into the reception shell, and moved the NPC destinations. An
INDEPENDENT REVIEW then found defects that the Wave 1 brief never mentioned. Your job is to fix
exactly those. Read `.agent-briefs/c64-w1-report.md` first to see what Wave 1 actually did, and
`.agent-briefs/c64-plan-review.md` for the full reasoning behind each item below.

Some of these may ALREADY be fixed - Wave 1 was reading the same code. Check each one before
changing it, and say in your report which were already handled.

## Autonomy (read this before asking anything)

**You are running fully autonomously. Nobody is awake to answer you.** Never stop to ask. If
something is ambiguous, decide, implement, and record the decision in your report. A completed
implementation under a stated assumption beats a question in a log file. Disagreement goes in the
report ALONGSIDE a finished implementation, never instead of one.

## The defects, in priority order

### 1. Room classification is wrong for BOTH rooms (`src/engine/chatter.ts`) - CRITICAL

`roomAt(x, z)` ends with `if (z >= 9) return "meeting";`, and `RoomId` has no `"reception"`.
Verified against the current source. After the move this is wrong twice over:

- The old room (now the reception, `x=[-6,6], z=[9,19]`) still classifies as `"meeting"`.
- The NEW meeting room (`x=[9.5,19], z=[7.5,17.5]`) classifies as `"kitchen"` for `z<=7` and
  `"main-office"` for `z` in `[7.5, 9)`, and only accidentally as `"meeting"` above `z=9`.

Consequence beyond cosmetics: `candidatePairs` in the chatter system allows only ONE simultaneous
conversation per room, keyed on this classification. With both rooms called `"meeting"`, a
conversation in the reception silently blocks one in the meeting room.

Fix: add `"reception"` to `RoomId`, and classify by actual rectangles - reception is
`x` in `[-6,6]` and `z >= 9`; the meeting room is `x` in `[9.5,19]` and `z` in `[7.5,17.5]`.
Order the checks so the meeting room is tested before the kitchen fallthrough. Update
`tests/unit/chatter.test.ts`, which asserts `roomAt(0, 14) === "meeting"` - that point is now the
reception, so the expectation legitimately changes.

### 2. The morning meeting will have no guests (`src/engine/npc-controller.ts`) - CRITICAL

Around line 736 the controller seats 1-2 colleagues at Zosia's meeting, gated on
`if (period === "afternoon")` and filtering on `NPC_SCHEDULES[npc.id].afternoon.state === "at-desk"`.
Wave 1 moved Zosia's meeting to the MORNING (Lucas asked for this explicitly), so this block now
fires in the afternoon when Zosia is at her desk, and the morning meeting she actually attends is
unattended.

Fix: drive the guest logic off the period Zosia is actually in a `meeting` state, rather than a
hardcoded literal. Reading it from `NPC_SCHEDULES.zosia` is better than swapping one hardcoded
string for another, because the next time Lucas moves the meeting nothing breaks. Update the
eligibility filter to the same period.

### 3. The reception's west-wall band collides with the main office - CRITICAL if present

`MAIN_OFFICE_WALLS` contains `wall("main-east-south", 9, 9.5, 1.25, 9)`, which occupies
`x=[9,9.5], z=[1.25,9]`. If the new meeting room's west wall was authored at `x=[9,9.5]` anywhere
in `z=[7.5,9]`, the two wall volumes overlap by 1.5 m of z - the #47 z-fight class,
`tests/unit/no-zfighting.test.ts` should be catching it.

Fix (if Wave 1 did not already avoid it): use an inner offset `x=[9.5,9.78]` for the
`z=[7.5,9.0]` stretch, and an exterior wall at `x=[9.0,9.5]` only for `z=[9.0,17.5]` where the
main office no longer exists.

### 4. A phantom meeting table sits in the middle of the reception

`ROOM_FURNITURE_AABBS` in `src/engine/npc-spawn-validator.ts` has the old meeting table at
`{ minX: -1.5, maxX: 1.5, minZ: 11.25, maxZ: 16.75 }`. That is now open reception floor, directly
on the path from the entrance spawn at `(0, 18.2)` into the office. Left in place it is an
invisible wall that every arriving NPC has to path around.

Fix: remove it, and make sure the NEW meeting table has an AABB at its new position.

### 5. The generic `meeting` random destination still points at the reception

`RANDOM_DESTINATIONS` contains `{ position: { x: 0, y: 0, z: 14 }, face: 0, state: "meeting" }` -
the centre of the OLD room. Any NPC that rolls "meeting" walks into the reception lobby.
The Wave 1 brief named `MEETING_SEATS`, `deal-wall` and `content-booth` but missed this one.

Fix: move it to the centre of the new meeting room.

### 6. The player will walk into the reception counter to talk to Renata

`planWalkToFace` puts the player `CONVERSATION_DISTANCE` (1.6 m) from the NPC along the line
between them. Renata stands behind the counter at `(4.4, 13.5)` facing -X, and the desk occupies
roughly `x=[2.9, 4.0]`. A player approaching from the lobby is sent to about `(2.8, 13.5)`, which
is inside the counter volume.

Fix: give the reception desk a proper AABB and make sure there is a clear visitor standing spot
in front of it at about `x=2.2`. If the walk-to-face planner needs a per-NPC override to respect
that, add one - but prefer the cheap fix (desk AABB plus a waypoint at the visitor spot) over
changing the shared planner. Say which you chose and why.

### 7. Smaller gaps

- `src/ui/office-roster.ts` (and its status mapping) has no case for a reception location. Renata
  will be added in a later wave; make sure her `at-desk` state in the reception reads sensibly in
  the roster rather than falling through to a wrong label.
- The `NEXT MEETING: 5 MIN AGO` sign needs an authored position and face in the new room. If Wave
  1 already placed it, check it is actually visible from inside the room.
- The new meeting room needs ceiling light positions like every other room.
- `DOOR_SIGN_MOUNTS` in `src/engine/scene.ts`: the sign at the main-office south doorway must read
  `Reception`, and a sign is needed at the new kitchen-to-meeting doorway. Update
  `tests/unit/signs-and-walls.test.ts` and note that `tests/e2e/c60-door-signs.spec.ts` asserts
  the old text - update that expectation too, but do NOT run playwright.

## Files you may touch

`src/engine/chatter.ts`, `src/engine/npc-controller.ts`, `src/engine/npc-spawn-validator.ts`,
`src/engine/scene.ts`, `src/ui/office-roster.ts`, `src/content/world-layout.ts`,
`src/content/npc-schedule.ts`, `src/content/corridor-waypoints.ts`, `tests/**`.

Do NOT touch `src/content/npcs.ts`, `src/types.ts`, the dialogue files, or
`src/engine/furniture/**` - other agents own those.

## Hard rules

1. **Do NOT commit. Do NOT push.** Leave the working tree dirty.
2. Never `git add -A` / `git add .`.
3. `./node_modules/.bin/tsc --noEmit` must exit 0.
4. `./node_modules/.bin/vitest run` must pass, zero failing. Fix data, not tests - except where a
   test genuinely encoded the OLD room layout, in which case update it and name it in your report.
5. Plain ASCII. Comments explain WHY and reference C-64.
6. Do not run the dev server, a build, or playwright.

## Definition of done

Every numbered defect above is either fixed or explicitly reported as already-handled by Wave 1.
typecheck clean, full suite green. Report to `.agent-briefs/c64-w1b-report.md`, including which
items were already done, what you changed, which tests you updated and why, and anything here you
believe is wrong.
