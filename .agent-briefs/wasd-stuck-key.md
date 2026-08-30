# URGENT: WASD stuck-key bug + need for movement-control test suite

## Context

You are one of three independent reviewers (GLM 5.2, Codex Sol, Gemini) asked to diagnose the same bug from three different angles. **Do not look at the other reviewers' output.** I want three independent analyses, then I'll merge.

## The bug

The user (Lucas) reports: pressing W/A/S/D moves the player correctly, but the player keeps moving in the original direction AFTER the key is released. Repro (verbatim from Lucas):

> "When I click A it only stops. When I click A again it does nothing, but when I click S it goes back and blocks and I can't unblock it, it keeps moving back... When I refresh and first click A it goes left, but also blocks... I can unblock it with clicking D and it just stops but it doesn't go right when I click D again. And S still makes it move back and blocks and I can't unblock it... so it is probably exactly the same as it was, but I did not notice that right also works but blocks..."

Pattern:
- Press W → moves back; release W → keeps moving back.
- Press A → stops (because stale W + A cancel?); release A → moves back again.
- Press S → goes back; release S → keeps moving back.
- Each key gets stuck after first press.

I already added a `window.addEventListener("blur", keys.clear)` fix. User says it did not help. The fix may not be in the running build, or the bug is not a window-blur issue at all.

## What I want from you

Three deliverables, in order:

### 1. ROOT CAUSE analysis (most important)

Read the files and identify the real bug. Specifically:

- `/home/lucas/DEV/Projects/ai-trainer-simulator/src/engine/controls.ts` — the controls module
- `/home/lucas/DEV/Projects/ai-trainer-simulator/src/main.ts` — the wiring (look for any extra `keys.add` / `setKeys` / `keyup` / `keydown` calls that could be polluting the `keys` set)
- `/home/lucas/DEV/Projects/ai-trainer-simulator/src/main.ts` line 71-75 (the Escape handler) — is it leaking?
- `/home/lucas/DEV/Projects/ai-trainer-simulator/src/ui/dialogue.ts` — does the dialog have its own keyup handler that might clear the `keys` set?
- `/home/lucas/DEV/Projects/ai-trainer-simulator/src/ui/office-roster.ts` — does the roster's keyboard handler?
- `/home/lucas/DEV/Projects/ai-trainer-simulator/src/ui/title.ts` — does character creation have any?
- `/home/lucas/DEV/Projects/ai-trainer-simulator/src/ui/quest-log.ts` and `help-modal.ts` — same question.
- Any other module under `src/` that does `keydown` / `keyup` / `addEventListener("key"` or `e.key` / `e.code`.

Don't just look at controls.ts. The bug is "the keys set is retaining keys across keyup" — find every place that could cause that. Use ripgrep aggressively.

Output: a numbered list of (1) every plausible root cause, (2) the most likely one, (3) the exact code line(s) responsible, (4) the proposed fix as a diff.

### 2. TEST SUITE DESIGN (second most important)

Design a test suite that would have caught this bug. Cover:

#### a) Unit tests (vitest, in `tests/unit/`)
The pure `stepControls(state, dt, keys, consumeMouseDelta)` function is already testable. Design at least 10 test cases that:
- Drive the `keys` Set manually and assert the player position after `stepControls`.
- Cover: W, A, S, D, arrows, Shift+sprint, multiple keys, releasing all keys.
- Cover pitch/yaw/mouse-look state transitions.
- Cover the failure mode: a key in the `keys` Set should NOT survive a `stepControls` call after we manually remove it (to prove the function is correct — the bug is in the runtime layer that populates `keys`).

The existing tests in `tests/unit/controls.test.ts` are minimal. **Propose additions, do not just restate them.**

#### b) Integration test (new file, vitest + jsdom or happy-dom)
This is the key part. **Propose a way to integration-test the event handlers** without a browser. Options to consider:
- A jsdom-based test that imports the runtime `createControls`, dispatches `KeyboardEvent` on `window` (keydown + keyup), then calls `update(dt)` and checks `getPlayerPosition()`.
- A test that uses Node's `EventEmitter` to simulate the keyboard events.
- A test that uses Playwright's `_electron`-style headless dispatch (probably overkill).

Pick the option that has the best chance of catching the actual bug. The test should:
- Simulate: keydown W → keyup W → expect player to stop after keyup.
- Simulate: keydown W → keydown S → keyup W → expect player to move in S direction (not W).
- Simulate: keydown W → keyup W → wait 100ms → keydown W → expect player to move in W direction (not still moving from the first press).
- Simulate: window blur mid-press → expect player to stop.
- Simulate: key autorepeat (dispatch 30 keydown events then 1 keyup) → expect player to stop after keyup.

#### c) E2E test (Playwright, in `tests/e2e/`)
Write a Playwright test that:
- Opens `http://localhost:5173/` (the dev server, has HMR).
- Goes through title → character creation → office.
- Waits for the intro cinematic to finish (~5.5s).
- Records player position.
- Presses W, waits 500ms, records position (should have moved in -Z).
- Releases W, waits 500ms, records position (should NOT have moved further).
- Presses A, records position (should have moved in -X).
- Releases A, waits, records position (should NOT have moved further).
- Presses D, records position.
- Releases D, waits, records position (should NOT have moved further).
- Presses S, records position (should have moved in +Z).
- Releases S, waits, records position (should NOT have moved further).

Each step has an `expect(playerZ).toBeCloseTo(prev, 0.5)` style assertion. If the bug is present, the test will catch the player moving after release.

The test file should be `tests/e2e/movement.spec.ts`. Use the existing `tests/e2e/smoke.spec.ts` as a template for how to launch Chrome (this box does not have `playwright install chromium`).

### 3. TDD PROCESS UPDATE FOR AGENTS.md

Read `/home/lucas/DEV/Projects/ai-trainer-simulator/AGENTS.md` and propose a new section to add: **"PR-11: TDD methodology for the input loop"**. It should be concrete, not aspirational. Cover:

- For every input handler (keydown / keyup / mousedown / mousemove / blur / focus / visibilitychange), there must be at least one test that:
  1. Synthesizes the event (using jsdom `KeyboardEvent` or `MouseEvent`).
  2. Asserts the resulting state.
  3. Synthesizes the *opposite* event (keyup for keydown, mouseup for mousedown, focus for blur, etc.) and asserts the state returns to the baseline.
  4. Tests the "stuck input" case explicitly: dispatch the activation event but NOT the deactivation event, then assert the loop clears it on the next frame / focus loss / visibility loss.

- For every state transition in the controls state machine (FREE_MOUSE → MOUSE_LOOK_HOLD, etc.), a test that drives both directions and asserts the state.

- A workflow rule: when adding or modifying an input handler, the test must be written FIRST (in the same commit or the one before). This is similar to PR-8's TDD rule for pure functions, but extended to event-driven code.

- A "do not merge" rule: a PR that adds an input handler without a test is rejected (the agent runs `pnpm test` before committing per PR-4 and per this rule).

Output: a new PR-NN rule (suggest a number) with the full text ready to paste into AGENTS.md.

## Constraints

- **Do not commit anything.** Just write your analysis to a file under `.agent-briefs/review-wasd-<your-name>.md` (use `glm`, `sol`, or `gemini` for `<your-name>`).
- **Do not push, do not modify source code.** The agent (Claude) will merge findings and apply the fix.
- Use ripgrep / grep / your file-reading tools. The codebase is small.
- Keep your report focused: bug analysis first, then test design, then AGENTS.md proposal. Don't pad.

## What I (Claude) will do with your output

1. Read all three reports.
2. Synthesize: if two out of three agree on the root cause, that's the bug. If they all disagree, I dig deeper myself.
3. Apply the fix in a single commit.
4. Write the tests you designed (or merge the best of each).
5. Update AGENTS.md with the new PR rule.
6. Re-run the full test suite + Playwright + visual regression.

## Files you should read first

In order:
1. `/home/lucas/DEV/Projects/ai-trainer-simulator/src/engine/controls.ts` (308 lines, the suspect)
2. `/home/lucas/DEV/Projects/ai-trainer-simulator/src/main.ts` (look for the controls wiring at line 196-265, the keydown handler at line 71-75, the LMB mousedown handler at line 215)
3. `/home/lucas/DEV/Projects/ai-trainer-simulator/src/ui/dialogue.ts` (does it clear the keys set on open/close?)
4. `/home/lucas/DEV/Projects/ai-trainer-simulator/src/ui/office-roster.ts` (any focus/keyboard issues?)
5. `/home/lucas/DEV/Projects/ai-trainer-simulator/tests/unit/controls.test.ts` (the existing tests — what do they NOT cover?)
6. `/home/lucas/DEV/Projects/ai-trainer-simulator/tests/e2e/smoke.spec.ts` (the e2e template)
7. `/home/lucas/DEV/Projects/ai-trainer-simulator/AGENTS.md` (the rule format)

## Your output format

Markdown, headed:

```
# Review by <your-name>

## Root cause

(numbered list of plausible causes, then the most likely one with the exact code line)

## Test suite design

(unit + integration + e2e, with code)

## AGENTS.md update

(new PR-NN rule, ready to paste)

## Other observations

(anything else worth flagging — e.g. the controls.ts has TWO window.addEventListener("keydown") calls, is that a smell?)
```

The "Other observations" section is the most likely place for you to find a bug that the user and I missed.
