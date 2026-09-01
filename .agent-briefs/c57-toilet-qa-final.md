# Task: final QA review of the C-57 toilet move

Re-verify the three blocking issues from
`.agent-briefs/c57-toilet-qa-report.md` are now fixed.

The latest commits on `feat/c57-toilet-relocate-next-to-kitchen`:

  599638e  feat(c-57): move toilet next to kitchen, door right of the menu sign
  d53d5b3  fix(c-57): QA fixes for toilet move
  6d62003  test(c-57): add structural tests for toilet fixtures
  dbb52b7  fix(c-57): correct stall NPC facing direction

Check:

1. Stale `roomAt()` for the old back-SW toilet corner was
   removed (now returns "meeting"). The new regression test in
   chatter.test.ts pins `roomAt(-16, 14.5) === "meeting"`.

2. The new toilet-stall, toilet-sink and urinal factories now
   have structural tests in furniture-library.test.ts that pin
   the key child names and realistic heights.

3. The stall NPC destinations now use `face: 0` (looking +Z
   into the stall door) instead of the previous `face: Math.PI`
   which pointed -Z away from the fixtures. The basin and urinal
   were already correct.

Run the project test suite once to confirm 414/414 pass and
typecheck is clean, then write a short re-verdict to
`.agent-briefs/c57-toilet-qa-final-report.md` and print a
one-line PASS/FAIL summary to stdout.
