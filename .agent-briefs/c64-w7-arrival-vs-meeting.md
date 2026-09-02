# C-64 Wave 7 — the morning meeting collides with the morning arrivals

Branch: `feat/c64-reception-and-meeting-room-move-opus` in
`/home/lucas/DEV/Projects/ai-trainer-simulator`.

## Autonomy

**Fully autonomous. Nobody is awake to answer you.** Decide, implement, verify, and record every
judgement call in your report. Disagreement goes in the report alongside finished work.

## The symptom

`tests/e2e/c51-morning-arrivals.spec.ts` fails on this branch and passes on `master`:

```
expect(samples[samples.length - 1].waiting).toBe(0)   ->  received 1
```

The roster sampled through the morning:

```
t~6s    waiting=8
t~46s   waiting=6
t~96s   waiting=4
t~151s  waiting=1   <- position 9 in the roster is still "Not in yet"
```

Roster order is `NPCS` order, so position 9 is **Janusz** - the pinned late arrival
(`LATE_ARRIVAL_AT` = 115 s into the morning). At ~151 s he should long since have been released.

Do NOT run playwright yourself (it is slow and the orchestrator owns it). Reason about the
controller and prove your fix with unit tests.

## The hypothesis to test first

C-64 moved Zosia's meeting from the AFTERNOON to the MORNING. The period-transition handler in
`src/engine/npc-controller.ts` (around line 865) does this:

```ts
for (const npc of npcs) {
  const state = runtime.get(npc.id)!;
  state.path = null; state.kitchenStops = null; state.dwellRemaining = 0; state.returnEntry = null;
  planForEntry(npc.id, meetingGuests.get(npc.id) ?? scheduleFor(npc.id, period));
}
```

It plans a route for **every** NPC, with no check for whether that NPC has actually arrived yet.
While the meeting was in the afternoon this was harmless: by then everyone had walked in. Now it
runs during the morning, when several people are still parked invisible off-scene waiting for
their arrival slot.

Compare `rollRandomNpcDestinations`, which explicitly skips NPCs who have not arrived
(`NpcController.hasArrived`) precisely so the day's destination roll cannot pull someone into the
office ahead of their time. This code path never got the same guard.

Confirm or refute this before fixing. If the real cause is different, fix the real one and say so.

## What the fix must preserve

- An NPC who has not arrived stays invisible and parked until their arrival slot, and then walks
  in through the entrance. Their arrival must not be cancelled, skipped, or brought forward.
- A not-yet-arrived NPC must still be able to be chosen as a meeting guest **for when they get
  in** - or must be excluded from guest selection entirely. Pick whichever is simpler to reason
  about, and say which you chose and why. Excluding them is probably right: a guest who is not in
  the building cannot attend a meeting that is already running.
- Zosia's meeting stays in the morning. Do not move it back.
- Renata stays in `ALREADY_IN_AT_DAY_START`.

## Definition of done

- Root cause named precisely in the report.
- Fixed, with a **unit** test that would catch it - something like "a period transition does not
  start a path for an NPC who has not arrived", and "meeting guest selection only considers NPCs
  who are actually in the building". The e2e caught this by luck of timing; a unit test should
  catch it directly.
- `./node_modules/.bin/tsc --noEmit` exits 0 and `./node_modules/.bin/vitest run` is fully green
  (531 tests currently, 0 failing).
- **Do NOT commit. Do NOT push.** Never `git add -A`.
- Report to `.agent-briefs/c64-w7-report.md`.
