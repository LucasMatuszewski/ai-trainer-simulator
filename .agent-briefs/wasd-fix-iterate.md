# Iterate on the fix until the test passes. Do not change the test.

## Context (already established, do not re-derive)

Lucas's runtime supplies code-less keyboard events whose reported `key` is unreliable. Every keyup has `key: 'w'`, regardless of which key the user actually released. This is a real defect, not a hardware issue, not a focus issue, not HMR.

Your previous diagnosis (`/home/lucas/DEV/Projects/ai-trainer-simulator/.agent-briefs/wasd-symptom-sol-output.md`) was correct. The proposed fix to `onKeyUp` in `src/engine/controls.ts` was:

```ts
if (e.code === "") {
  keys.clear();
} else {
  keys.delete(moveKey);
}
```

I have already applied that fix locally. The regression test Sol proposed (jsdom-based) is in `tests/unit/controls-events.test.ts`. Do not modify the test.

## Your job

Run the test suite. If it fails, fix the code (not the test). Repeat until the test passes. Then run the full e2e suite. If the full suite fails, fix more code. Do not stop until everything passes.

### Step 1 — confirm Sol's fix passes the test

Run:
```bash
cd /home/lucas/DEV/Projects/ai-trainer-simulator
pnpm test tests/unit/controls-events.test.ts
```

If it fails, look at the failure, understand WHY, fix the code. Do not change the test. Repeat.

### Step 2 — add the symptom-sequence regression test

Sol proposed a second test in his output:
1. `keydown('', 'd')`, update: X changes.
2. `keyup('', 'w')`, update: position does not change.
3. `keydown('', 'a')`, update: X changes in the opposite direction.
4. `keyup('', 'w')`, update: position does not change.
5. `keydown('', 's')`, update: Z increases.
6. `keyup('', 'w')`, update: position does not change.

This is the EXACT sequence Lucas reported in his console log. Add this as a new test in `tests/unit/controls-events.test.ts`. Do not modify any existing test. The new test should reproduce Lucas's symptom precisely.

### Step 3 — run the full unit + e2e suite

```bash
cd /home/lucas/DEV/Projects/ai-trainer-simulator
pnpm test
pnpm test:e2e
```

If anything fails, fix the code. Repeat. Do not change tests except to ADD the new symptom test in step 2.

### Step 4 — Vite W hypothesis

Lucas mentioned "Vite W shortcut" as a hypothesis. The Vite dev client has a `w` keypress shortcut to full-reload the page. In `node_modules/.vite/deps/...` there is a file that dispatches `keydown`/`keyup` events for HMR. Investigate:

- Does the Vite dev client send synthetic keyboard events to the page?
- Does it interfere with our `window.addEventListener("keydown", ...)`?
- If yes, is there a way to opt out of the Vite W shortcut (e.g., via Vite config) without breaking HMR?

If the Vite W shortcut is the source of the malformed events, document this. Then either:
- Opt out of the shortcut in `vite.config.ts`.
- Or keep the defensive `keys.clear()` on code-less releases (which is still correct regardless of the event source).

Either fix is acceptable. The defensive clear is the minimum. If Vite has a knob to disable the shortcut, do that too as defense-in-depth.

### What to return

- The current test results (`pnpm test` + `pnpm test:e2e`).
- If you had to fix the code, show the diff.
- The diagnosis of whether Vite's W shortcut is the actual source of the malformed events.
- A short summary: "all tests pass, here's why" or "here's the remaining failure, here's the fix I applied".

### Constraints

- Do not modify any existing test. Only ADD the new symptom test.
- Do not commit or push. Claude (the orchestrator) will verify and commit.
- The dev server is on `http://localhost:5173/`. Playwright tests use the system Chrome at `/usr/bin/google-chrome`.
