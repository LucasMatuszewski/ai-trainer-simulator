# Update AGENTS.md with a hard TDD rule (PR-11)

## Context

We are building AI Trainer Simulator. PR-8 in AGENTS.md already has
a TDD rule for "every new pure function". After completing several
phases of the project, the agent has learned a few things that
should be added as PR-11 (or whatever number is next):

1. **The "pure function" rule alone is too weak.** Agents have
   shipped features (NPC schedules, dialogue trees, world layouts)
   that are essentially data files but not pure functions. The TDD
   rule needs to cover data and behavior, not just pure functions.

2. **Input-loop handlers need tests too.** Lucas reported a
   stuck-key WASD bug that pure unit tests did not catch. The
   jsdom-based event-lifecycle test (`controls-events.test.ts`) DID
   catch it once we wrote it. So the rule must explicitly cover
   event-driven code.

3. **Mutation tests are required.** Sol wrote tests that passed
   but the bug was still there. The lesson: a test that passes
   when the code is correct is necessary but not sufficient. The
   test must also FAIL when the code is broken. Add a step to the
   TDD rule: "after writing the test, revert the implementation
   and confirm the test fails, then restore the implementation and
   confirm the test passes again."

## What to deliver

Edit `AGENTS.md` to add a new rule (suggest number PR-11) with the
following content (use the existing PR-NN formatting and tone):

```markdown
### PR-11: TDD methodology for every feature (2026-08-30)

The TDD rule in PR-8 covers pure functions. It does not cover
data files, event-loop handlers, or the "did the test actually
catch the bug?" verification step. This rule extends PR-8 to cover
all of those.

1. **Every new feature has at least one test that fails before
   the implementation.** This applies to:
   - Pure functions (already covered by PR-8).
   - Data files: every new typed data export (an NPC schedule,
     a dialogue tree, a world layout, an action list) must have
     at least one unit test that imports the data, asserts its
     shape (correct types, correct values for the specific
     "interesting" cases the data was designed to model), and
     would FAIL if the data were corrupted.
   - Event-loop handlers: every new `window.addEventListener` or
     `document.addEventListener` in the controls / input layer
     must have an integration test in jsdom (or equivalent) that
     dispatches the real event and asserts the resulting state.
   - Renderable entities: every new THREE.Object3D factory
     (NPCs, room walls, furniture, signs) must have a unit test
     that constructs the mesh and asserts its child count,
     position, and material. See the existing `npc-mesh.test.ts`
     for the pattern.

2. **Mutation test before commit.** Before committing a feature,
   revert the implementation, run the test, confirm it FAILS, then
   restore the implementation, run the test, confirm it PASSES. If
   the test does not fail when the implementation is broken, the
   test is not actually testing the feature — rewrite it. This
   step is mandatory and applies to every commit. A test that does
   not fail when the code is broken is worse than no test at all
   (it gives false confidence).

3. **The framework the test must use depends on the layer:**
   - Pure functions and data files: vitest (node env).
   - Event-loop handlers: vitest with `@vitest-environment jsdom`.
   - 3D rendering: do not unit-test (visual regression is verified
     via Playwright screenshots + agy descriptions).
   - End-to-end browser behavior: Playwright.

4. **Test naming.** The test file mirrors the source file:
   `src/foo/bar.ts` is tested by `tests/unit/foo/bar.test.ts` (or
   `tests/foo/bar.spec.ts` for E2E). The test cases describe the
   expected behavior in plain English, e.g. "stops after one
   keyup following repeated W keydowns" not "test 1".

5. **Tests run before the commit is created.** A commit that adds
   a feature without a passing test for it is reversed and rewritten.
   Agents verify by running `pnpm test` (and `pnpm test:e2e` for
   end-to-end) and pasting the test results into the commit body.
```

Place the new rule in the "Hard rules for this project" section,
after PR-10 and before "Current design direction".

## Files to read

- `AGENTS.md` — the existing file; read it to match its tone.

## What to deliver

- The PR-11 rule added to `AGENTS.md` in the right place, with the
  exact content above (reformat as needed to match the existing
  PR-NN style — numbered subsections, blockquoted snippets, etc.).

## Constraints

- Do NOT change any other rule in AGENTS.md.
- Do NOT add a new file.
- Do NOT commit. Write the file, report the changes to
  `.agent-briefs/tdd-rules-update-sol.md`, and stop.
