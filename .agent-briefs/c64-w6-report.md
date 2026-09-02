# C-64 Wave 6 report - Kasia walking freeze

## Result

Fixed. Renata remains in `ALREADY_IN_AT_DAY_START`; no seed or crowd-flow ceiling changed.

## Precise root cause

Kasia met stationary Grazyna while leaving in the evening. At the terminal freeze she was at approximately `(7.75, 2.24)`, brushing the north-east edge of Grazyna's temporary blocker AABB `(x 7.00..7.90, z 1.55..2.45)`.

`blockerBoxes()` discarded a standing NPC's temporary obstacle when that AABB contained either the route start or destination. Because Kasia's current point was barely inside Grazyna's box, every avoid-people re-plan omitted Grazyna and could plan straight back through her. The re-plan then pre-empted the local `insertEscape()` rung. Repeated re-plans and short escape motions never cleared the contact, so Kasia remained in `walking` until the trip allowance finally called `settleInPlace()` 53.57 seconds later.

The recent `startPath()` filtering change was the RNG-shifting trigger's most suspicious neighbor, but it was not the cause of this freeze. The broken endpoint filtering was in the dynamic standing-person obstacle builder, not the static authored-destination filtering in `startPath()`.

## Fix

- A standing blocker is now omitted only when its box contains the destination.
- A blocker containing the walker's current point stays in the re-plan. If A* cannot begin inside it, the re-plan returns false and the existing ladder correctly falls through to `insertEscape()`, which moves the walker clear before a later re-plan.
- Extracted `blockerBoxCoversDestination()` to make the endpoint rule explicit and directly testable.

## Regression coverage

- Added a direct endpoint-policy regression using Kasia's failing coordinates and Grazyna's blocker box.
- Added a controller scenario that starts Kasia inside Grazyna's blocker edge and verifies she escapes rather than remaining frozen.
- Mutation check: replacing the endpoint predicate with an always-ignore result makes the new direct regression fail; restoring the implementation makes it pass.
- Deleted the temporary `tests/unit/zz-office-day-debug.test.ts` harness.

## Measurements

Deterministic office-day seed 2024 before fix:

- Kasia maximum freeze: 53.57 s
- Kasia total frozen: 70.9 s
- Kasia walked: 50.1 m

Same seed after fix:

- Worst NPC maximum freeze: 5.3 s (Zosia)
- Kasia maximum freeze: 4.1 s
- Kasia total frozen: 27.2 s
- Kasia walked: 84.6 m and completed the departure route

The existing 12-second ceiling therefore remains appropriate.

## Verification

- `./node_modules/.bin/tsc --noEmit`: passed (exit 0).
- `./node_modules/.bin/vitest run`: 56 files passed, 531 tests passed, 0 failed (exit 0). The brief expected 529, but the branch already contains two additional tests; no test was removed or skipped.
- No commit or push was made.
