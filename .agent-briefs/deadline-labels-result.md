# Deadline hover label result

Implemented only the assigned hover-label scope. `src/main.ts` is ready for the parent's subsequent integration work.

Changed:
- `src/main.ts`: added the helper import and replaced positioning in both branches of `updateHoverLabel` with `positionHoverLabel(hoverLabel, head, rect)`.
- `src/ui/hover-label-position.ts`: projects NDC into viewport coordinates including canvas `left`/`top`; writes both pixel offsets and replaces the transform with the shared centered-above-head alignment on every call.
- `tests/unit/hover-label-position.test.ts`: three jsdom regression tests cover nonzero canvas offsets, successive NPC/robot/NPC positions starting with legacy mixed styles, and moved/resized canvas rectangles.

The robot keeps its existing world-space anchor `(snapshot.position.x, 2.1, snapshot.position.z)`. Camera, picking, clipping and visibility behavior are unchanged.

Verification:
- Test first: initial run failed because the new helper did not exist. A temporary extraction of the existing robot positioning reproduced three assertion failures (for example `400px` instead of expected viewport `520px`).
- Green: all three tests passed with the fix.
- Mutation: temporarily removed the transform reset; all three tests failed, including the retained legacy `translate(600px, 300px)` offset. Restored the reset.
- Final `pnpm test tests/unit/hover-label-position.test.ts`: 3 passed, exit 0.
- `pnpm typecheck`: exit 0.
- `git diff --check`: exit 0. Inspected `src/main.ts` diff: only helper import and owned function changed.

No browser/server operations, repository design-document edits, commits or pushes. Browser visual QA and full-suite integration validation remain with the parent, as directed by the brief. Existing/concurrent changes outside this scope were left untouched. Commands emitted the existing pnpm configuration warning about `pnpm.onlyBuiltDependencies`; it did not prevent either check.
