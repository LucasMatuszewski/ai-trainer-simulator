# Review by sol

## Root cause

1. **No source-level key-retention bug is present in the current `controls.ts`.** The movement set is closure-local (`src/engine/controls.ts:151`), the only runtime writes are `keys.add(k)` at lines 219-223, `keys.delete(...)` at lines 224-226, and the three safety clears at lines 233-246. `stepControls` only reads the set. `main.ts` never calls `setKeys`, and no UI module can mutate this set. If a normal `keydown` followed by a matching `keyup` reaches `window`, the current code stops movement.

2. **Most likely explanation: the code Lucas exercised was not the current source, or the browser did not deliver the matching `keyup`.** The report is consistent with a retained key, but not with the checked-in handler receiving both events. This project has a known 4173/static-build trap: port 4173 serves `dist` and does not update until `pnpm build`; port 5173 is the HMR source server. Before changing movement math, log/observe `keydown`, `keyup`, URL/port, and the loaded asset hash. The current `dist/assets/index-ClZQmKH5.js` also contains both `r.add(...)` and `r.delete(...)` plus blur/visibility clears, so merely testing the current 4173 bundle now will not reconstruct an older stale session. A service-worker/browser-cache mismatch is less likely because no service worker was found, but an already-open old page remains plausible.

3. **Plausible runtime weakness: identity is based on `event.key`, not physical `event.code`.** Exact lines: `src/engine/controls.ts:220-225`. For plain W/A/S/D without modifier/layout changes, keydown and keyup should match, so this does not explain the reported reproduction on a normal layout. It can nevertheless create a retained entry when keyboard layout or modifier state makes `event.key` differ between press and release. A game should track physical movement keys by `event.code` (`KeyW`, `KeyA`, etc.).

4. **Plausible lifecycle weakness: listeners are anonymous and cannot be disposed.** `createControls` attaches handlers at lines 159-268 and exposes no `destroy`. `main.ts` currently creates controls only inside `if (!engine)` (`src/main.ts:188-213`), so duplicate instances are not the present cause. HMR can still leave old module listeners alive depending on reload behavior, and future recreation would produce multiple independent key sets and updates/listeners. This is a smell, not evidence for this specific failure.

5. **The Escape handler is not leaking or polluting movement.** `src/main.ts:71-75` only closes dialogue. It neither adds keys nor replaces the controls set. `controls.ts` has a separate keydown listener for Space/Escape at lines 189-208, but it does not return before the movement listener; Escape is added to the set by the broad movement listener, then removed on keyup, and `stepControls` ignores it. This is untidy but does not stick WASD.

6. **The UI modules are not responsible.** `dialogue.ts`, `office-roster.ts`, `title.ts`, and `quest-log.ts` have no keyboard handlers. `help-modal.ts:74-80` handles Escape/F1 only and does not stop propagation or touch controls. The only other source keydown handler is the one-shot audio activation listener, which also does not stop propagation.

7. **The old implementation had duplicate canvas and window keyboard listeners.** Commit `d13f3ab` listened on both. Canvas keyboard events bubble to window, so a Set add/delete happened twice but remained balanced and idempotent. The current implementation has only the window movement pair. This old duplication is not the current root cause, though stale HMR listeners from code transitions should be excluded with a hard reload.

### Most likely conclusion

There is insufficient evidence to name a faulty current source line: the current event pair is internally correct. The likely fault is outside `stepControls`: Lucas exercised a stale/live-mismatched runtime or a `keyup` was not delivered. The blur patch only addresses focus loss; it cannot repair an old bundle and does not help if focus remains in the page while a browser/platform fails to deliver `keyup`. First reproduce on `http://localhost:5173/` with an event-level test. That test decides the branch:

- If synthetic keydown/keyup passes in Vitest and Playwright, the checked-in code is correct and the observed page/build was stale or the physical environment swallowed keyup.
- If Playwright fails, capture the actual `event.key`, `event.code`, target, repeat flag, and focus/visibility state; then fix the demonstrated mismatch.

### Proposed hardening diff

This makes movement identity physical/layout-independent, ignores unrelated keys, and clears input on all loss-of-control paths. It should be applied only after the runtime test establishes the failure; it is not proof of the original cause.

```diff
diff --git a/src/engine/controls.ts b/src/engine/controls.ts
@@
-  const moveKeys = new Set([
-    "w", "a", "s", "d",
-    "arrowup", "arrowdown", "arrowleft", "arrowright",
-    "shift",
-  ]);
+  const movementCodeToKey: Readonly<Record<string, string>> = {
+    KeyW: "w", KeyA: "a", KeyS: "s", KeyD: "d",
+    ArrowUp: "arrowup", ArrowDown: "arrowdown",
+    ArrowLeft: "arrowleft", ArrowRight: "arrowright",
+    ShiftLeft: "shift", ShiftRight: "shift",
+  };
+  const movementKey = (e: KeyboardEvent): string | undefined =>
+    movementCodeToKey[e.code];
   window.addEventListener("keydown", (e) => {
-    const k = e.key.toLowerCase();
+    const k = movementKey(e);
+    if (!k) return;
     keys.add(k);
-    if (moveKeys.has(k)) e.preventDefault();
+    e.preventDefault();
   });
   window.addEventListener("keyup", (e) => {
-    keys.delete(e.key.toLowerCase());
+    const k = movementKey(e);
+    if (!k) return;
+    keys.delete(k);
+    e.preventDefault();
   });
+  const clearInput = () => keys.clear();
+  window.addEventListener("blur", clearInput);
+  window.addEventListener("pagehide", clearInput);
+  document.addEventListener("visibilitychange", () => {
+    if (document.hidden) clearInput();
+  });
```

If both Shift keys must be tracked correctly, a canonical Set of `"shift"` is insufficient: releasing one Shift while the other remains held clears sprint early. Prefer storing physical codes directly and have `stepControls` understand them, or keep a `Set<string>` of active codes and derive sprint from either Shift code.

## Test suite design

### Unit tests for `stepControls`

Add these cases to `tests/unit/controls.test.ts`, using a collision-free start such as `{ x: 0, y: 0, z: 5 }`, small `dt`, and `() => null`:

1. W moves in -Z at yaw 0.
2. S moves in +Z at yaw 0.
3. A moves in -X at yaw 0.
4. D moves in +X at yaw 0.
5. ArrowUp/Down/Left/Right match W/S/A/D respectively (table-driven).
6. Shift+W travels exactly 1.6 times the W distance.
7. W+D produces normalized diagonal motion: total distance equals straight-line walking distance, not `sqrt(2)` times it.
8. W+S cancel without movement; A+D cancel without movement.
9. Release behavior: step once with `keys = new Set(["w"])`, delete `w`, step the returned state with the same now-empty set, and assert the second position equals the first.
10. Re-press behavior: W step, empty-set step, W step; assert first and third deltas match and the empty step is zero.
11. A key not recognized by movement (`e`, `escape`) causes no movement.
12. At yaw `Math.PI / 2`, W moves -X and D moves -Z, proving camera-relative axes.
13. Free mouse drains the delta callback but leaves yaw/pitch unchanged.
14. Hold applies mouse delta; a subsequent null delta leaves yaw/pitch unchanged.
15. Toggle applies mouse delta identically to hold.
16. Pitch clamps at -0.6 and 0.4.

The important release test is:

```ts
it("does not move after the caller removes the released key", () => {
  const keys = new Set(["w"]);
  const afterPress = stepControls(baseState({ player: { x: 0, y: 0, z: 5 } }), 0.1, keys, () => null);
  keys.delete("w");
  const afterRelease = stepControls(afterPress, 0.5, keys, () => null);
  expect(afterRelease.player).toEqual(afterPress.player);
});
```

This proves `stepControls` does not retain input internally; it cannot prove the DOM wiring deletes the key.

### Runtime integration test

Use Vitest with a jsdom environment for a new `tests/unit/controls-events.test.ts`. This is preferable to an EventEmitter because production uses DOM event semantics (`key`, `code`, bubbling, focus, `document.hidden`); an EventEmitter would test a substitute implementation. It is faster and more diagnostic than Playwright while exercising the real `createControls` listeners. Add `jsdom` as a dev dependency and use a per-file environment directive if the suite otherwise stays in Node.

```ts
// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import * as THREE from "three";
import { createControls } from "../../src/engine/controls";

const key = (type: "keydown" | "keyup", value: string, code: string, repeat = false) =>
  window.dispatchEvent(new KeyboardEvent(type, { key: value, code, repeat, bubbles: true }));

describe("createControls keyboard lifecycle", () => {
  let canvas: HTMLCanvasElement;
  let controls: ReturnType<typeof createControls>;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    document.body.append(canvas);
    controls = createControls({
      canvas,
      camera: new THREE.PerspectiveCamera(),
      initialPlayer: new THREE.Vector3(0, 0, 5),
    });
  });

  afterEach(() => document.body.replaceChildren());

  it("stops after W keyup", () => {
    key("keydown", "w", "KeyW");
    controls.update(0.1);
    key("keyup", "w", "KeyW");
    const stopped = controls.getPlayerPosition();
    controls.update(0.5);
    expect(controls.getPlayerPosition()).toEqual(stopped);
  });
});
```

Required additional runtime cases:

- W down, S down, W up, update: movement is +Z from S only.
- W down/up, advance fake timers 100 ms, W down: second press moves by the same delta as the first.
- W down, `window.dispatchEvent(new Event("blur"))`, update: stopped.
- Thirty repeated W keydowns followed by one W keyup: stopped.
- W down, simulate hidden document and dispatch `visibilitychange`: stopped.
- Space down transitions free -> toggle; second Space down transitions toggle -> free.
- RMB down/up transitions free -> hold -> free; mouseleave also returns hold -> free.

There is an important test-isolation prerequisite: `createControls` currently has no disposer, so every test leaves window/document listeners installed. Either create one controls instance for the file, or first add a `destroy()` method that removes named listeners and call it in `afterEach`. Without this, later integration tests can receive events in old closures and give misleading results.

### Playwright E2E

Create `tests/e2e/movement.spec.ts`. Use 5173 explicitly for this diagnostic, clear local storage, enter the office, and wait until `window.__aitrainer.getScreen() === "office"` plus at least 3.7 seconds for the current 3.5-second cinematic. Do not assert an absolute direction without accounting for collision and yaw; the fresh run has yaw 0, so W=-Z, S=+Z, A=-X, D=+X is valid. Compare release drift with a tight epsilon rather than `toBeCloseTo(prev, 0.5)`: Playwright's second argument is decimal digits, not a tolerance of 0.5. Animation timing can permit one final frame, so use approximately 0.05 world units.

```ts
import { test, expect } from "@playwright/test";

const player = (page: import("@playwright/test").Page) =>
  page.evaluate(() => window.__aitrainer!.getPlayer());

test("WASD stops on every key release", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.click('[data-action="new"]');
  await page.click('[data-spec-id="ai"]');
  await page.click('[data-trait-id="debugger"]');
  await page.click('[data-action="begin"]');
  await expect(page.locator(".hud")).toBeVisible();
  await page.waitForTimeout(3_700);

  for (const [keyName, axis, sign] of [
    ["w", "z", -1], ["a", "x", -1], ["d", "x", 1], ["s", "z", 1],
  ] as const) {
    const before = await player(page);
    await page.keyboard.down(keyName);
    await page.waitForTimeout(500);
    const moved = await player(page);
    await page.keyboard.up(keyName);
    expect((moved[axis] - before[axis]) * sign).toBeGreaterThan(0.2);
    await page.waitForTimeout(500);
    const stopped = await player(page);
    expect(Math.abs(stopped[axis] - moved[axis])).toBeLessThan(0.05);
  }
});
```

Use the existing system-Chrome launch configuration, but centralize it in `playwright.config.ts` rather than duplicating `test.use`. The existing smoke test points at 4173 despite the project rule saying development tests must use 5173; that discrepancy can conceal stale-code failures.

## AGENTS.md update

Suggested number: PR-11.

### PR-11: TDD methodology for the input loop

Input handling is stateful production logic and MUST be tested at both the event boundary and the frame boundary.

1. Every new or changed input handler (`keydown`, `keyup`, `mousedown`, `mouseup`, `mousemove`, `blur`, `focus`, `visibilitychange`, pointer-lock events, or equivalent) MUST have an integration test that dispatches the real DOM event and asserts the resulting controls state or observable player/camera state.
2. Every activation test MUST dispatch the matching deactivation event and assert a return to baseline: keydown -> keyup, mousedown -> mouseup, blur -> focus, hidden -> visible, and lock -> unlock. A one-way transition test is incomplete.
3. Every input family MUST include an explicit stuck-input test. Dispatch activation without deactivation, then dispatch the relevant safety boundary (`blur`, hidden `visibilitychange`, `pagehide`, pointer-lock loss, or canvas leave) and advance one frame. Assert that movement, look, or action repetition has stopped.
4. Every controls state-machine edge MUST be tested in both directions. For Pattern D this includes FREE_MOUSE -> MOUSE_LOOK_HOLD -> FREE_MOUSE and FREE_MOUSE -> MOUSE_LOOK_TOGGLE -> FREE_MOUSE, including Escape/cancellation paths.
5. Event integration tests MUST exercise the production `createControls` listeners with jsdom `KeyboardEvent`/`MouseEvent` (or a real browser where the DOM implementation is essential). Tests must not replace the DOM with an EventEmitter or call `setKeys` as a substitute for testing handler wiring.
6. Pure frame math remains covered separately through `stepControls`. At minimum, tests cover each movement key, arrows, opposing/diagonal keys, sprint, release-to-idle, mouse delta consumption, yaw/pitch, and clamps.
7. The test is written first and observed failing before an input handler is added or modified. The red/green evidence belongs in the task notes; the test and implementation may share one small commit when appropriate.
8. Input listeners MUST have a cleanup/disposal path so test cases, HMR, and screen re-entry cannot accumulate listeners. Integration tests call cleanup in `afterEach`.
9. Do not merge or commit an input-handler change without its event-lifecycle test. Before committing, run the focused input tests and `pnpm test`; before completing the phase, run the Playwright movement smoke test on port 5173.

## Other observations

- `setKeys` is a test seam that replaces the same closure variable used by live listeners. It is not used by production today, but it makes ownership ambiguous. Prefer keeping it test-only through the pure function or replace it with explicit debug/test injection.
- `stepControls` mutates the input `state`'s `yaw` and `pitch` before returning a new top-level object. The existing test claims immutability but only checks a no-delta case, so it misses this mutation. With mouse-look delta, the original state is mutated. Either document `stepControls` as mutating or compute local `yaw`/`pitch` and return a genuinely new state.
- The comment in the free-mouse branch says deltas are not consumed, while the implementation deliberately calls `consumeMouseDelta()` to drain them. The tests/comments should use one term consistently: drained from the buffer but not applied to rotation.
- The current movement keydown handler adds every key, including Escape, F1, Space, and text typed into character-name inputs before the office starts. Those keys do not move the player but unnecessarily grow/retain the Set. Restrict it to movement keys and ignore editable targets.
- Movement remains active beneath non-dialogue UI such as the help modal and focused buttons. That is separate from the stuck-key report, but modal open should probably clear/suspend movement.
- The existing E2E smoke test uses port 4173 and waits only 800 ms, while the cinematic lasts 3.5 seconds and controls updates are suppressed during it. Its WASD step therefore does not actually verify walking. This is a concrete false-positive test defect.
