# C-64 Wave 6 — a 53-second walking freeze in the crowd-flow harness

You are fixing a regression on branch `feat/c64-reception-and-meeting-room-move-opus` in
`/home/lucas/DEV/Projects/ai-trainer-simulator`.

## Autonomy

**You are running fully autonomously. Nobody is awake to answer you.** Never stop to ask. Decide,
implement, verify, and record every judgement call in your report. Disagreement goes in the report
alongside finished work, never instead of it.

## The symptom

`tests/unit/npc-office-day.test.ts` ("keeps the office flowing") now fails:

```
expect(worstFreeze).toBeLessThan(12)   ->  received 53.57
```

`worstFreeze` is the longest single stretch in which an NPC is in the `walking` state but its
position does not change. A debug run isolates the offender:

```
kasia   max 53.6s frozen, 70.9s total frozen, 50.1m walked
zosia    max  5.3s
ania     max  3.7s
```

So one NPC, Kasia, is stuck in one place for 53 seconds while the controller believes she is
walking. Everyone else is fine.

## What triggered it (and why that is probably NOT the real bug)

The immediately preceding change added `"renata"` to `ALREADY_IN_AT_DAY_START` in
`src/content/npc-schedule.ts`. That is a deliberate, correct change and must stay: the player
spawns in the reception and Renata is the tutorial host they are supposed to meet, so the
reception desk cannot be empty at t=0, and a receptionist who arrives after the visitors is wrong.

Adding her to the early-bird set removes one arrival from `planMorningArrivals`, which shifts
every subsequent draw from the controller's single shared seeded RNG. The suite was green
immediately before this one-line change.

**Treat the RNG shift as the trigger, not the cause.** A one-line data change should not be able
to strand an NPC for 53 seconds; if it can, there is a hole in the blocked/escape ladder that any
future tuning would hit just as easily. Find the actual hole. Do not "fix" this by reverting the
early-bird change, by reseeding the harness, or by raising the ceiling.

## Where to look

- `src/engine/npc-controller.ts` - the C-48 blocked ladder, `insertEscape`, `replanFrom`, the trip
  allowance (`TRIP_ALLOWANCE_FACTOR`, `TRIP_ALLOWANCE_GRACE_S`), `settleInPlace`, and the livelock
  window. A 53 s freeze means the ladder never escalated to a settle, which it is explicitly
  designed to do - "there is no terminal rung".
- Kasia's desk is `(7.45, 5.5)` on the east wall of the main office. Her likely destinations are
  the kitchen, the toilet, and the relocated meeting room - all reached through the east doorway.
  C-64 moved a room and added a new doorway on that side of the world, so a route she used to take
  may now be different.
- `src/engine/npc-controller.ts` grew a change in commit `60afb7f`: `startPath` now filters out
  obstacles that CONTAIN the start or destination point (added so Renata can walk out from behind
  her counter). Check whether that filtering can produce a path Kasia cannot actually walk - a
  route planned as if an obstacle were absent, which the per-frame collision then refuses. That
  would strand her exactly like this, and it is the most suspicious recent change on this code
  path.

## How to reproduce quickly

`tests/unit/zz-office-day-debug.test.ts` is a copy of the harness that prints the worst six NPCs
by freeze time. Use it, extend it with whatever instrumentation you need (which destination she
was walking to, where she froze, what the ladder state was), and **delete it when you are done**.

## Definition of done

- The real cause is identified and fixed, and your report NAMES it precisely.
- `"renata"` stays in `ALREADY_IN_AT_DAY_START`.
- No test ceiling is raised and no seed is changed to dodge the problem. If you conclude the
  ceiling genuinely should move, argue it with measurements in the report and leave the ceiling
  alone.
- `tests/unit/zz-office-day-debug.test.ts` is deleted.
- `./node_modules/.bin/tsc --noEmit` exits 0 and `./node_modules/.bin/vitest run` is fully green
  (529 tests, 0 failing).
- Add a regression test that would catch this class of stranding directly, rather than relying on
  the aggregate crowd-flow harness noticing it by luck.
- **Do NOT commit. Do NOT push.** Never `git add -A`.
- Report to `.agent-briefs/c64-w6-report.md`.
