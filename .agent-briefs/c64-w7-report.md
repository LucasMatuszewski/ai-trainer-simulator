# C-64 Wave 7 report - arrival vs morning meeting

## Result

Fixed the controller bug without moving Zosia's meeting or changing Renata's
day-start status.

## Root cause

The brief's hypothesis was confirmed. `synchronizePeriod` treated every NPC as
present during a period re-plan. It cleared `pendingArrivals` and then called
`planForEntry` for every NPC. For an NPC still parked invisible at the entrance,
that destroyed the only record of the future arrival slot and installed a route
before `releaseArrival` had admitted the NPC.

The meeting guest selector in the same function also considered schedule state
only. Once Zosia's meeting moved to the morning, an `at-desk` colleague could be
selected even while still outside waiting for a morning arrival slot.

## Fix

- `synchronizePeriod` no longer clears `pendingArrivals`.
- Its route-planning loop skips every pending arrival, leaving visibility,
  `npcState`, and the future release slot untouched.
- Meeting guest choice is now the pure `selectMeetingGuestIds` function.
- Guest eligibility requires `hasArrived(npcId)` in addition to the existing
  role and schedule-state rules.

I chose to exclude not-yet-arrived NPCs from an already-running meeting. This is
the simpler and more truthful rule: an NPC outside the building cannot attend,
and their arrival remains owned by the normal arrival controller rather than a
deferred meeting override.

## Tests

Added two unit regressions in `tests/unit/npc-controller.test.ts`:

1. A period transition does not start a path, reveal, or cancel the slot of an
   NPC who has not arrived; the NPC is later released normally.
2. Meeting guest selection includes an arrived ordinary colleague while
   excluding an unarrived colleague and the station-bound receptionist.

Mutation verification was performed before the final run. Disabling the pending
arrival route guard failed the first test, and bypassing arrival eligibility in
the guest selector failed the second test.

Final verification:

- `./node_modules/.bin/tsc --noEmit`: passed.
- `./node_modules/.bin/vitest run`: 56 files passed, 533 tests passed, 0 failed.
- Playwright: not run, per the brief and user instruction.

## Files changed

- `src/engine/npc-controller.ts`
- `tests/unit/npc-controller.test.ts`
- `.agent-briefs/c64-w7-report.md`

No commit was created and nothing was pushed.
