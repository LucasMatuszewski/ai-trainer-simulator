# Final code review of the Phase 6 changes

## Context

We are building AI Trainer Simulator. Phase 6 has just shipped a
number of visual / behavioral changes. Before declaring Phase 6
done, run a thorough code review of the changes since the last
QA pass. The last code review was at commit `2658fd9` (the
"per-NPC clothing, female body tweaks, object placement, dog
orientation" commit).

## Files to read

All changes since commit `2658fd9`:
- `src/content/npcs.ts`
- `src/content/world-layout.ts`
- `src/engine/multi-room.ts`
- `src/engine/scene.ts`
- `src/engine/npc-mesh.ts`
- `src/engine/npc-idle.ts`
- `src/engine/npc-controller.ts`
- `src/engine/renderer.ts`
- `src/ui/dialogue.ts`
- `src/content/dialogue-memory.ts`
- `src/content/dialogues.ts`
- `src/main.ts`
- `src/webmcp/tools.ts`
- `tests/unit/*.test.ts` (most test files)

Run `git diff 2658fd9..HEAD --stat` first to see the full list.

## What to do

For each file that changed, do a code review. Look for:

1. **Correctness**: does the code do what it claims? Are the math,
   the geometry, the AABB checks right?
2. **Performance**: are there any obvious O(n^2) loops, repeated
   lookups, expensive operations in `update()`?
3. **Memory leaks**: are there `setTimeout` or `setInterval` calls
   that are never cleared? Are there `THREE.Object3D` / texture
   references that are never disposed?
4. **Type safety**: are there any `any` casts, or places where the
   compiler should complain but doesn't?
5. **Comments**: are the new comments accurate? Are there TODO
   comments that should be removed?
6. **Tests**: do the tests actually test the bug they claim to?
   Are there any tests that just verify "the code doesn't crash"?
7. **Edge cases**: what happens when an array is empty, when a
   value is undefined, when the page is reloaded?

For each issue, fix it. Run the test suite after each fix to
make sure nothing breaks. After all fixes, run the FULL test
suite (unit + E2E + typecheck) and verify everything is green.

Also:
- Run `pnpm exec tsc --noEmit` and verify 0 errors.
- Run `pnpm test` and verify all 207 unit tests pass.
- Run `pnpm test:e2e` and verify all 6 E2E tests pass.
- Check the test runs without ANY console errors or page errors.
  Look at the `visual-check.spec.ts` output.

## What to deliver

Write a report `.agent-briefs/final-code-review-sol.md` that
includes:
- A list of all issues found, grouped by severity (CRITICAL /
  HIGH / MEDIUM / LOW / NIT).
- For each issue, the file + line number, a one-sentence
  description, and a one-sentence fix description.
- For each fix applied, the diff or the before/after summary.
- The final test result: `pnpm test`, `pnpm typecheck`,
  `pnpm test:e2e` all green.

## Constraints

- Do NOT commit. Write the report and the fixes. Claude (the
  orchestrator) will review and commit.
- Do NOT change the public API of any module.
- Do NOT add a new dependency.

## Definition of done

- All issues found have been fixed.
- The full test suite (207 unit + 6 E2E) passes.
- `pnpm typecheck` passes.
- The report is written.
