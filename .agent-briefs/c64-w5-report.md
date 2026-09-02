# C-64 Wave 5 review-fix report

## Result

Implemented review issues 3 through 11. Issues 1 and 2 were already fixed: the Deal Wall is at
`(9.8, 0, 12.6)` on the relocated meeting room west wall and the Content Booth is at
`(18.97, 0, 12.6)` on its east wall.

## Fixes

- Issue 3: moved meeting guest poses beside, rather than inside, the table and chair AABBs. Tests
  now validate every pose with `isSpawnBlocked` and a 0.3 m NPC radius.
- Issue 4: removed the guest pose that duplicated Zosia's meeting position and added an explicit
  minimum-separation assertion against her authored pose.
- Issue 5: introduced a named station-bound set for Burek, Dawid, and Renata, and added a controller
  regression test proving Renata remains at reception during the morning meeting.
- Issue 6: moved Renata's roster and all schedule rows to `(4.9, 0, 13.5)`, fully clear of the
  reception desk. The Xerox return path reads the schedule as its single source of truth; its
  copy-run test now verifies the new return point.
- Issue 7: rotated the plant wall by PI so its local +X foliage faces west into reception.
- Issue 8: moved the generic meeting destination off the chair to `(11.25, 0, 9.35)` and extended
  furniture-clearance coverage to the `meeting` state.
- Issue 9: removed the duplicate `DOOR_SIGN_MOUNTS.kitchenMeeting` sign and its scene call. The
  WORLD_ROOMS poster is now asserted to be the sole Meeting Room sign.
- Issue 10: widened the actual kitchen-meeting wall opening from 2.0 m to 2.5 m. The test now
  calculates geometric width from both `from` and `to` AABBs instead of trusting the unused
  decorative `width` field. Other authored doorways retain their existing 2.0 m minimum.
- Issue 11: west meeting chairs now face +PI/2 and east chairs face -PI/2, with orientation tests.

## Decisions and scope

- Issue 10 uses the preferred 2.5 m geometric opening. The central waypoint remains valid because
  x=11 is still inside the widened opening.
- Optional issues 12 and 13 were not changed; they are outside the required 3-11 scope.
- I found no review issue that was technically incorrect.
- Nothing in the required scope could not be completed.

## Verification

- `./node_modules/.bin/tsc --noEmit`: pass.
- `./node_modules/.bin/vitest run`: 56 files passed, 529 tests passed, 0 failed.
- `git diff --check`: pass.
- No dev server, build, Playwright, commit, or push was run.
