# Advanced WASD E2E test report (Codex Sol)

## Delivered

- Added `tests/e2e/movement-advanced.spec.ts`.
- Kept `tests/e2e/movement.spec.ts`; it still provides useful isolated-key and diagonal coverage.
- Did not modify source code.
- Did not commit or push.

The new real-browser test uses system Chrome with `--no-sandbox`, clears `localStorage`, waits 5.5 seconds for the cinematic, focuses the canvas, and drives this collision-free asymmetric sequence:

1. W for 500 ms
2. D for 500 ms
3. A for 300 ms
4. S for 500 ms
5. A for 300 ms

It asserts movement on every press, samples position immediately after `keyboard.up`, waits 300 ms and asserts no post-release drift, presses A twice to catch the reported "works once" failure, and checks the expected non-zero endpoint `(-0.3, 0.5, 6)`.

## Required focused run

Command:

`pnpm test:e2e --grep advanced`

Result: PASS.

```text
Running 1 test using 1 worker
  PASS 1 [chromium] tests/e2e/movement-advanced.spec.ts
    WASD advanced: full sequence with multiple A presses, asymmetric final position (12.5s)

1 passed (13.8s)
```

This run proves that the current live Vite runtime receives W, D, A, S, and a second A press, and that each key stops after keyup. The Lucas-reported retained-key behavior did not reproduce in a fresh browser against port 5173.

## Full-suite run

Command:

`pnpm test:e2e`

Result: 5 passed, 2 failed (40.0s).

Failures:

1. New advanced test: exact endpoint X was `-0.572`, expected `-0.300 +/- 0.100`.
2. Existing isolated movement test: its S release measurement was `0.157`, narrowly above its `0.150` limit.

The full suite runs three system-Chrome/WebGL workers concurrently. Under that load, fixed Playwright wall-clock holds do not yield exact travel distances: the game integrates real `requestAnimationFrame` delta time, capped at 100 ms per frame. Browser scheduling around `waitForTimeout`, position evaluation, and keyup can therefore add or omit several movement frames. The focused one-worker run passed all exact endpoint and release checks.

## Controls-code diagnosis

I inspected `src/engine/controls.ts` after the failures.

- `keydown` maps physical `KeyboardEvent.code` to a logical movement key and adds it to the `keys` Set.
- `keyup` uses the same mapping and deletes it from that Set.
- `blur`, canvas blur, hidden-document `visibilitychange`, and `pagehide` all clear the Set.
- `stepControls` reads the Set once per animation frame and moves by `WALK_SPEED * dt`.
- The main loop caps `dt` at 0.1 seconds.

No retained-key defect is present in this code path, and the advanced test's per-release checks pass in the focused run. The full-suite failures are test timing contention, not evidence that W/A/S/D remains in the Set.

One important test-design finding: a position sampled before `keyboard.up` must not be used as the release baseline. Time spent dispatching keyup is then incorrectly counted as post-release drift. The new test dispatches keyup first, samples the release position immediately afterward, then measures the 300 ms resting interval.

No source fix is recommended from these results. If the manual bug persists in the same fresh port-5173 runtime, the next diagnostic should expose the live pressed-key Set through a temporary debug hook and log real keyboard `code` values during Lucas's exact input path; this test does not reproduce a controls retention failure.
