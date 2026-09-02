# C-64 Wave 3 — Renata the receptionist: data, dialogues, tutorial, chatter

You are implementing Wave 3 of correction C-64 in `/home/lucas/DEV/Projects/ai-trainer-simulator`
on branch `feat/c64-reception-and-meeting-room-move-opus`.

**READ FIRST**: `.claude/plans/c64-reception-and-meeting-room-move.md` for the full context and
the decisions D1-D10 already taken.

## Autonomy (read this before asking anything)

**You are running fully autonomously. Nobody is awake to answer you.** Lucas is asleep and the
orchestrator will not interactively unblock you mid-run.

- Never stop to ask a question. If something is ambiguous, MAKE A DECISION, implement it, and
  record the decision plus your reasoning in your report.
- Never leave the work half-done pending a clarification. A completed implementation under a
  stated assumption is worth far more than a question in a log file nobody reads until morning.
- If a sub-part is genuinely impossible, finish everything else in full and say what you skipped.
- Disagreement is welcome, but it goes in the report ALONGSIDE a finished implementation.

## What Lucas asked for

> add a new NPC, the receptionist, add here a new dialogues both for the player and other
> automatic bubble chats. adequate to her role as a receptionist and office manager. she should
> also have a big Xero printer next to the reception. the reception desk should be her working
> point. and she should go to the printer to make xero copies
>
> we should use receptionist as the first guide and tutorial at the game start! we need audio for
> this, and we can do some kind of tutorial and FAQ from this first dialogue, she can be some kind
> of Help Center for a player.

## The character

**Renata**, id `renata`, role "Receptionist / Office Manager". She is the person who actually
knows how the company works: where everything is, whose expense report is late, which meeting
room is double-booked, and why the printer hates Tomek specifically. Warm and unflappable to the
player's face; quietly devastating about everyone else. She has been here longer than the CEO.

Comedy register: IT Crowd / Silicon Valley, same as the existing cast. Read
`src/content/dialogues.ts` and `src/content/office-chatter.ts` first and MATCH THAT VOICE - do not
invent a new tone. She is the straight-talking hub of the office, not a joke delivery machine.

## Files you own (do not touch anything else)

- `src/types.ts` - add `renata` to the `NpcId` union
- `src/content/npcs.ts` - her NPC entry
- `src/content/dialogues.ts` or a new `src/content/dialogues-renata.ts` - her trees
- `src/content/office-chatter.ts` - receptionist-flavoured exchanges
- `src/content/morning-greetings.ts`, `src/content/evening-goodbyes.ts` - her lines
- `src/content/npc-schedule.ts` - **ONLY her three period rows**. Another agent owns the rest of
  this file; keep your diff to the `renata:` block plus the roster additions that require it.
- `tests/unit/**` - new tests

Do NOT touch `src/engine/**`, `src/content/world-layout.ts`, or `src/content/corridor-waypoints.ts`.

## The work

### 1. NPC entry

- Position: behind the reception desk at `{ x: 4.4, y: 0, z: 13.5 }`, `rotationY: -Math.PI / 2`
  so she looks -X, across the lobby at whoever walks in through the entrance.
- `walkSpeed: 1.2`, `triggerRadius: 1.8`, `gender: "female"`.
- **`appearance`** is required (C-63 landed this): pick `skin`, `hair` and `shirt` tones that fit
  her, from the unions in `src/types.ts`, and add a one-line comment saying why. Every other human
  has one; a test asserts no two colleagues share an identical skin+hair+shirt combination, so
  check the existing entries before choosing.
- Schedule (`NPC_SCHEDULES.renata`): `at-desk` at her reception position in ALL THREE periods,
  facing `-Math.PI / 2`. She is the last to leave; do not send her home in the evening.
  She is NOT in `ALREADY_IN_AT_DAY_START` unless you have a reason - she can arrive like anyone
  else, but if you make her an early bird (a receptionist opening the office is plausible), say so.

### 2. Dialogue: the tutorial / help centre tree

This is the important one. Lucas wants her first conversation to be the game's tutorial AND a
standing FAQ / help centre the player can come back to.

- A `first-meeting` tree that plays as the player's introduction: who she is, what the company
  does, what the player is here to do, and the CONTROLS (WASD to walk, right mouse button held to
  look around, Space toggles mouse-look for trackpads, Tab for the office roster, click a
  colleague to walk over and talk, Z to end the day). Check `src/engine/controls.ts` and
  `src/ui/help-modal.ts` for the ACTUAL current bindings - do not write controls from memory.
- A `default` tree that is a re-enterable FAQ hub: a menu node whose options are questions
  ("Where is everyone?", "How do I make money?", "What are these stats?", "Who is who around
  here?", "Where is the toilet?"), each answering and returning to the menu, plus a way out.
  This is the "Help Center" Lucas asked for.
- 8-12 lines in the first-meeting tree, because those are the lines that get TTS audio generated
  in a later wave. Keep each one a single spoken sentence or two - no line longer than about 200
  characters, and no line that only makes sense as text on screen.
- Give every option a stable `id` (the dialogue memory in `dialogue-memory.ts` suppresses
  already-answered options and falls back to `nextNodeId`, which collides).
- Respect the existing rule: an NPC must never repeat a dialogue the player already answered.

### 3. Bubble chatter, greetings, goodbyes

- Add receptionist-flavoured exchanges to `office-chatter.ts`. Every starter needs 5-6 responses
  (that is the current standard in that file). Her material: couriers, visitors with no
  appointment, the printer, room bookings, the fire drill, expense reports, whose birthday cake
  it is, someone's laptop left in a meeting room.
- Add her morning greetings and evening goodbyes to the matching pools.
- **Hard constraints, enforced by existing tests**: plain ASCII only (no em dashes, smart quotes
  or emoji), human lines <= 60 characters, no duplicate lines, and no line may appear in more
  than one pool. Read the tests in `tests/unit/office-chatter.test.ts` and
  `tests/unit/lunch-dialogues.test.ts` before writing, then run them.

### 4. Tests

- Extend whatever roster tests exist so Renata is covered like everyone else (she will likely be
  picked up automatically by the "every NPC has X" loops - run the suite and see).
- Add a test that her first-meeting tree actually teaches the controls: assert that the tree's
  text mentions the real key bindings.
- Add a test that the FAQ hub is re-enterable (every answer node routes back to the menu).

## Hard rules

1. **Do NOT commit. Do NOT push.** Leave the working tree dirty.
2. Never `git add -A` / `git add .`.
3. `./node_modules/.bin/tsc --noEmit` must exit 0.
4. `./node_modules/.bin/vitest run` must pass. Adding an NPC will make several "every NPC has X"
   tests fail until you fill in every required field - that is the suite doing its job, so fix the
   data, never the test. If a test genuinely encoded "there are exactly 14 NPCs", update it and
   say so in your report.
5. Plain ASCII everywhere.
6. Comments explain WHY and reference C-64.
7. Do not run the dev server, a build, or playwright.

## Definition of done

- Renata exists as a full NPC with an authored appearance and a reception working point.
- A first-meeting tutorial tree covering the real controls, 8-12 speakable lines.
- A re-enterable FAQ / help-centre default tree.
- Receptionist chatter, greetings and goodbyes that pass the ASCII/length/uniqueness tests.
- typecheck clean, full suite green.
- Report to `.agent-briefs/c64-w3-report.md`: what you built, the exact list of TTS-able tutorial
  line ids and their text (the audio wave needs this), every test you had to change and why, and
  anything in this brief you think is wrong.
