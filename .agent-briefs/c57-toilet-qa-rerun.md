# Task: re-QA review of the C-57 toilet move after fixes

You previously reviewed commit 599638e on branch
`feat/c57-toilet-relocate-next-to-kitchen` and filed three blocking
issues in `.agent-briefs/c57-toilet-qa-report.md`. Since then the
following commits have landed on the same branch:

  599638e  feat(c-57): move toilet next to kitchen, door right of the menu sign
  d53d5b3  fix(c-57): QA fixes for toilet move
  6d62003  test(c-57): add structural tests for toilet fixtures

The "QA fixes" commit changed:

1. `src/engine/chatter.ts` — removed the legacy
   `if (z >= 9) return x <= -6.5 ? "toilet" : "meeting"` branch
   and replaced it with a plain `if (z >= 9) return "meeting"`.
   The new function comment explains the C-57 cleanup.

2. `src/content/npc-schedule.ts` — flipped the two stall NPC
   destinations from `face: 0` to `face: Math.PI` (now facing
   -Z = north, into the stall entrance) and updated the comment
   block. The urinal + basin destinations were unchanged because
   the basin was already correct.

3. `src/main.ts` — added a `teleport(x, z, yaw)` dev hook to
   `__aitrainer` (mirrors the existing `inspectNpcs`,
   `debugSkipPeriod` hooks).

4. `tests/unit/chatter.test.ts` — added a regression test
   "does NOT classify the old back-SW toilet corner as a toilet"
   pinning the old coordinates to `meeting`.

The "structural tests" commit added `tests/unit/furniture-library.test.ts`
describe blocks for `makeToiletStall`, `makeToiletSink`, `makeUrinal`
that pin the key child names and realistic heights.

Re-run the QA checks for issues 2 and 3:

- The new `roomAt` for `(-16, 14.5)` and `(-14, 11.5)` should
  be `"meeting"`, not `"toilet"`.
- The stall NPC at `(20, 2.8)` with `face: Math.PI` should now
  face -Z (north) toward the stall door at z=3.8.
- The basin NPC at `(22, 6.0)` with `face: Math.PI` was already
  facing -Z (north) toward the basin at z=6.7.

You may keep your original issue 1 verdict (the "right vs. left"
of the menu sign from the player's view) as a documented product
decision, OR revisit it - the placement is east of the sign,
which is what most readers would call "to the right of the sign"
in 2D space.

## Output

Write a short re-verdict (PASS/FAIL) to
`.agent-briefs/c57-toilet-qa-rerun-report.md` and print a
one-line summary to stdout.
