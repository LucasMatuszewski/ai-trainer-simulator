# C-64 Wave 4 — Renata's copy run: the Xerox printer, the flash, the sound

You are implementing Wave 4 of correction C-64 in `/home/lucas/DEV/Projects/ai-trainer-simulator`
on branch `feat/c64-reception-and-meeting-room-move-opus`.

## Autonomy (read this before asking anything)

**You are running fully autonomously. Nobody is awake to answer you.** Never stop to ask - decide,
implement, and record the decision in your report. A finished implementation under a stated
assumption beats a question in a log file. Disagreement goes in the report alongside finished work.

## Context

Read `.claude/plans/c64-reception-and-meeting-room-move.md` for the full picture. Earlier waves
have landed: the reception room exists at `x=[-6,6], z=[9,19]` with a reception desk at
`(3.4, 13.5)`, a big Xerox printer prop at about `(5.0, 16.5)`, and Renata the receptionist
standing at her working point `(4.4, 13.5)` facing -X.

## What Lucas asked for

> she should also have a big Xero printer next to the reception. the reception desk should be her
> working point. and she should go to the printer to make xero copies, it would be nice to have
> some flash animation when she does them + some audio effect

## The work

### 1. The copy run behaviour

Renata periodically leaves her desk, walks to the printer, makes copies for a few seconds, and
walks back. Everything about this must reuse the EXISTING NPC movement machinery rather than
inventing a parallel one:

- The controller already has `startPath(npcId, entry, delay)`, a `dwelling` state with
  `dwellRemaining`, a `returnEntry` for going back, and `settle(npcId, entry)`. The kitchen
  micro-sequence (`startKitchen`) is the closest existing analogue - read it and follow its shape.
- Cadence: a copy run every 60-120 seconds while she is at her desk, dwelling 6-10 seconds at the
  printer. Put both ranges in named exported constants so the rate is one adjustable knob, the way
  `STRETCH_INTERVAL_S` is in `npc-idle.ts`. Lucas cares about being able to tune frequencies.
- She must never start a copy run while the player is talking to her.
- If the path to the printer fails, she stays at her desk. Never leave her stranded mid-room.

### 2. The flash animation

- A pure, unit-tested function in a NEW file `src/engine/printer-flash.ts` that maps elapsed time
  to a flash intensity - the scanner bar sweeping under the lid. Something like three or four
  discrete sweeps over the dwell, each a short bright ramp and decay, returning 0 between sweeps.
  The controller only reads the value and writes it to a material; all the timing logic is pure
  and tested.
- Visually: an emissive/basic plane inside the printer's glass lid that brightens and sweeps. Keep
  it cheap - no new lights per flash. Look at how the C-63 coffee mug is toggled on the NPC mesh
  (`mug` in `npc-mesh.ts`, driven from `npc-idle.ts`) for the pattern of a prop that only appears
  during an animation.
- Write the test FIRST for the pure function (repo rule HR-6).

### 3. The sound effect

- The project has an audio pipeline already: `src/audio/AudioManager.ts`, `src/audio/sfx.ts`,
  `src/audio/manifest.ts`, and generated files under `public/assets/audio/`. Read them.
- Register a `sfx_photocopier` id and trigger it when a sweep starts. If the asset does not exist
  yet, the AudioManager is designed to no-op silently on a missing id - so wire the trigger now
  and let the audio wave generate the file. Confirm that missing-asset behaviour is real before
  relying on it; if it throws instead, guard the call.
- Do NOT generate audio in this wave and do NOT call any external API.

## Files you own

- `src/engine/printer-flash.ts` (new)
- `src/engine/npc-controller.ts`
- `src/audio/sfx.ts` and `src/audio/manifest.ts` if a new id must be registered
- `tests/unit/**`

Do NOT touch `src/engine/furniture/**` (the printer PROP is another agent's), `src/content/npcs.ts`,
the dialogue files, or `src/content/world-layout.ts`.

If Renata does not exist in the roster yet when you start, implement the behaviour generically -
keyed on an NPC id constant - so it activates the moment she lands. Say so in your report.

## Hard rules

1. **Do NOT commit. Do NOT push.** Leave the working tree dirty.
2. Never `git add -A` / `git add .`.
3. `./node_modules/.bin/tsc --noEmit` must exit 0.
4. `./node_modules/.bin/vitest run` must pass, zero failing. Fix your code, not the tests.
5. Test-first for the pure flash function.
6. Plain ASCII. Comments explain WHY and reference C-64.
7. Do not run the dev server, a build, or playwright.

## Definition of done

- Renata walks to the printer on a tunable timer, dwells, and walks back, using the existing path
  and dwell machinery.
- A pure, unit-tested flash timing function drives a visible sweep on the printer.
- A photocopier SFX id is registered and triggered, degrading silently if the asset is absent.
- typecheck clean, full suite green.
- Report to `.agent-briefs/c64-w4-report.md`: what you built, the constants and their ranges, how
  you verified the missing-audio path, and anything in this brief you think is wrong.
