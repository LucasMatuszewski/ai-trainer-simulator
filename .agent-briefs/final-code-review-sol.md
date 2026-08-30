# Phase 6 final code review - Codex Sol

Date: 2026-08-30

## Scope note

`git diff 2658fd9..HEAD` is empty because `HEAD` is exactly `2658fd9`. The actual post-baseline work was uncommitted in the working tree. I reviewed that working diff and the current contents of every source file named in `final-code-review.md`. I preserved unrelated pre-existing worktree changes and did not commit or push.

## CRITICAL

None found.

## HIGH

1. `src/content/dialogues.ts` (previously lines 54, 636, 692) - Three dialogue options incremented `dialoguesFinished` before the controller also incremented it on terminal acknowledgement, so those conversations counted twice. Fix: removed the three content-level completion effects and added a structural regression assertion in `tests/unit/dialogue-tree.test.ts` that completion is not counted by dialogue data.

## MEDIUM

1. `src/main.ts:63,284-287` - Every office re-entry added another permanent game-store subscription, causing stale UI refreshes and duplicated audio work over successive days. Fix: retain the unsubscribe callback and replace the previous subscription whenever the office UI is remounted.

2. `src/engine/renderer.ts:118-120` - `Engine.dispose()` disposed WebGL but left the global resize listener attached. Fix: remove the exact resize listener before disposing the renderer.

3. `src/webmcp/tools.ts:162-166` - `add_relationship` accepted any non-empty NPC ID and silently created invalid relationship keys. Fix: validate the ID against `NPCS` and return `npc not found`; added a regression test proving state is not mutated.

4. `tests/e2e/visual-check.spec.ts:103-107` - The visual route turned south before clearing Ania's inflated desk AABB and consistently stopped at x=5.47, so Phase 6 room QA could not reach the kitchen or CTO office. Fix: route through the clear east-wall lane first, then align with the kitchen doorway. The corrected visual test now covers all intended rooms.

## LOW

1. `src/engine/npc-controller.ts:97-102` - Constructing a controller with an empty NPC list dereferenced an invented `bartek` fallback object. Fix: use a nullable root and create the bubble system only when a real NPC object resolves to a scene root; added an empty-list edge-case test.

2. `src/ui/quest-log.ts:16-20,73-83` and `src/main.ts:273` - The help button existed at runtime but was hidden behind `any` and `unknown` casts. Fix: accurately type `helpButton` on `QuestLogHandle` and consume it directly.

3. `tests/unit/multi-room-graphics.test.ts:9-11` - jsdom emitted repeated `HTMLCanvasElement.getContext()` errors even though the tests passed. Fix: stub the unsupported canvas method for this structure-only suite.

4. `tests/unit/reducer.test.ts:11-22` - Importing the game store without browser storage emitted a caught `localStorage is not defined` error. Fix: install a hoisted in-memory storage stub before module evaluation.

## NIT

1. `src/engine/renderer.ts:45,67-68,100` - Comments still described a 480x270 over-the-shoulder renderer even though the implementation is 640x360 and first-person. Fix: corrected the comments; runtime behavior is unchanged.

## Fix summary

- Dialogue totals: removed three duplicate completion effects; controller remains the single completion owner.
- Store lifecycle: one active office subscription instead of one additional subscription per day.
- Renderer lifecycle: resize listener is removed on disposal.
- NPC controller: empty input is safe and no fallback object is fabricated.
- WebMCP: unknown relationship targets are rejected without state mutation.
- Quest log typing: removed the only explicit `any` bridge in the reviewed UI path.
- Unit-test hygiene: eliminated the prior jsdom canvas and missing-localStorage stderr.
- Visual E2E: corrected collision-aware navigation into the kitchen and CTO office.

## Final verification

- `pnpm exec tsc --noEmit`: PASS, 0 errors.
- `pnpm typecheck`: PASS, 0 errors.
- `pnpm test`: PASS, 30 files and 210 tests. The brief expected 207; three regression tests were added during this review.
- `pnpm test:e2e`: PASS, 6 of 6 tests.
- `visual-check.spec.ts`: PASS. `VISUAL_CHECK_CONSOLE_ERRORS=[]` and `VISUAL_CHECK_PAGE_ERRORS=[]`.

Non-application warnings remain from pnpm configuration (`pnpm.onlyBuiltDependencies` is ignored by pnpm 11) and Playwright color environment variables. They do not represent browser console or page errors.

## Verdict

PASS after fixes. No critical issues remain in the reviewed scope. No public module behavior was removed, no dependency was added, and no commit was created.
