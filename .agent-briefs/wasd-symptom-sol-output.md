# WASD symptom analysis - Codex Sol

## Root cause

The source-level bug is in `src/engine/controls.ts`, in `physicalToMoveKey()` and `onKeyUp()`.

`physicalToMoveKey()` falls back from `KeyboardEvent.code` to `KeyboardEvent.key` whenever `code` is empty:

```ts
const byCode = codeToMoveKey[e.code];
if (byCode !== undefined) return byCode;
return keyToMoveKey[e.key.toLowerCase()] ?? null;
```

That fallback assumes `key` identifies the same movement key on keydown and keyup. Lucas's runtime disproves that assumption. It supplies these pairs:

```text
keydown key=d code=""
keyup   key=w code=""
```

The handler therefore executes `keys.add("d")`, followed by `keys.delete("w")`. The release cannot remove `d`, so `d` remains held permanently. Pressing A adds `a`; `a` and `d` cancel each other in `stepControls()`, which exactly produces Lucas's report that A stopped the continuous D movement. Later S adds `s`; the retained `a` and `d` still cancel, while retained `s` produces continuous backward movement. The logged Set states are a complete reproduction of the symptom.

The movement vector, collision code, frame loop, screen state, dialogue state, focus detection, and HMR are not the cause. `controls.update(dt)` is running, and it is correctly applying the contents of a corrupted held-key Set.

## Origin of the malformed events

No application source file creates or redispatches keyboard events. The complete source search finds runtime keyboard listeners only:

- `src/engine/controls.ts`: movement and mouse-look listeners
- `src/main.ts`: Escape closes dialogue
- `src/ui/help-modal.ts`: Escape/F1 modal handling
- `src/audio/AudioManager.ts`: one-shot audio activation

None calls `dispatchEvent`, constructs `KeyboardEvent`, mutates `key`, or stops propagation for WASD. The only `new KeyboardEvent(...)` calls are test code and are not in the browser application bundle. `KeyboardEvent.key` and `.code` are read-only browser event fields, so the controls listener cannot turn a D/A/S keyup into W.

Therefore the `keyup key="w" code=""` events are produced before application code receives them, by the browser's input source/forwarding layer rather than by this codebase. A normal trusted Chrome hardware-key event has a physical code such as `KeyD`; an empty code together with a release value unrelated to the preceding press is the signature of a synthetic or remotely translated keyboard event. Focus is not responsible: `target: BODY` is accepted by `isTextEntryTarget`, and focus changes cannot rewrite `key` or `code`.

The application bug is nevertheless definite: it treats malformed `key` fallback data as reliable held-key identity and has no release-safe behavior for a code-less input source.

## Minimal fix

Keep the existing physical-code path unchanged. In `onKeyUp`, distinguish reliable physical events from code-less compatibility events:

```ts
const onKeyUp = (e: KeyboardEvent): void => {
  const moveKey = physicalToMoveKey(e);
  if (moveKey === null) return;

  if (e.code === "") {
    keys.clear();
  } else {
    keys.delete(moveKey);
  }

  if (!isTextEntryTarget(e.target)) e.preventDefault();
};
```

Reason: when `code` is absent, Lucas's input path provides no trustworthy release identity. Deleting the reported fallback key is demonstrably wrong. Clearing movement state on a code-less movement keyup is the only safe stop behavior: it guarantees that released movement cannot remain latched. It preserves full multi-key behavior for standard keyboard events because those use non-empty physical codes. In the degraded code-less path, releasing one key stops all movement keys; that is preferable to irreversible movement and is required because the event contains insufficient information to identify which physical key was released.

Do not change `stepControls()`, the frame loop, focus handling, listener targets, or movement math. Do not remove the `key` fallback from keydown: Lucas needs it because his runtime supplies no code, and removing it would make all WASD keydowns inert.

Optionally log `e.isTrusted`, `navigator.userAgent`, and the embedding context during verification to identify the faulty browser/input bridge. Those diagnostics are not required for the application fix.

## Regression test

Add a jsdom test to `tests/unit/controls-events.test.ts` that reproduces Lucas's exact malformed event contract, not a normal Playwright keyboard pair:

```ts
it("releases code-less movement when keyup is mislabeled as W", () => {
  const start = controls.getPlayerPosition();

  keyboard("keydown", "", "d");
  controls.update(0.25);
  const afterD = controls.getPlayerPosition();
  expect(afterD.x).toBeGreaterThan(start.x);

  keyboard("keyup", "", "w");
  controls.update(0.25);
  expect(controls.getPlayerPosition().x).toBeCloseTo(afterD.x, 8);
});
```

Add the full symptom sequence as a second assertion/test if desired:

1. `keydown('', 'd')`, update: X changes.
2. `keyup('', 'w')`, update: position does not change.
3. `keydown('', 'a')`, update: X changes in the opposite direction.
4. `keyup('', 'w')`, update: position does not change.
5. `keydown('', 's')`, update: Z increases.
6. `keyup('', 'w')`, update: position does not change.

This test fails against the current implementation because D/A/S remain in the Set. It passes only when the code-less release path clears the held movement state. Existing tests with `KeyW`, `KeyA`, `KeyS`, and `KeyD` continue to verify precise simultaneous-key release behavior for normal physical keyboard events.

## Direct answers to the brief

1. Every keyup is W because the browser/input forwarding layer is delivering malformed code-less events. The application does not generate them.
2. Empty `code` confirms the events did not arrive through Chrome's normal physical-key path. BODY focus cannot cause this and cannot rewrite event fields.
3. The Set grows because `keys.delete("w")` cannot delete retained `d`, `a`, or `s` entries.
4. BODY is not treated as text entry. Focus is not the cause.
5. HMR cannot produce the observed per-event mismatch. Duplicate controls listeners would duplicate logs/actions, not rewrite every release to W.
6. No other source listener consumes or synthesizes WASD events.
7. Roster, dialogue, toast, and help focus management does not produce this event shape.
8. The frame loop is active; continuous movement proves it.
9. A second `createControls()` invocation does not explain the single logged Set progression or malformed event fields.
10. Screen transitions can clear focus but cannot turn D/A/S releases into code-less W releases.
