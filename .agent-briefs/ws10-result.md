# WS10 result — Positional audio system + photocopier fix (C-77)

Branch `feat/jev-npc-decision-steering`. No commits, no `bd`, no `src/version.ts` bump (as instructed).

## Files changed (all new; nothing else touched)

| File | Status |
|---|---|
| `src/audio/positional.ts` | NEW — pure gain math + sound-source registry (no three.js) |
| `src/audio/positional-three.ts` | NEW — thin adapter; reuses the existing SfxBus `play(id, { volume })` path |
| `tests/unit/audio/positional.test.ts` | NEW — 21 tests, node env, pure formulas |
| `tests/unit/audio/positional-three.test.ts` | NEW — 6 tests, jsdom env, bus-volume spy + position resolution |

`src/audio/sfx.ts` NOT changed: `SfxBus.play` already accepts a per-shot `volume` option and multiplies it into its own per-shot GainNode, so no setter was needed. The adapter passes the computed gain as that option — one audio pipeline, no parallel WebAudio graph.

## The exact gain formulas (documented in `src/audio/positional.ts` header)

```
finalGain = clamp01(base * distanceFactor(d) * roomFactor * facingFactor)
```

1. **distanceFactor(d)** — piecewise linear on distance d in metres:
   - `d <= 3` → `1.0`
   - `3 < d <= 15` → `1.0 − 0.75·(d−3)/12`  (1.0 → 0.25 at 15 m)
   - `15 < d <= 30` → `0.25 − 0.20·(d−15)/15` (0.25 → 0.05), floored with `Math.max(MIN_DISTANCE_GAIN, …)` against float rounding just before the knot
   - `d > 30` → `0.05` (floor: faintly present office-wide, never pops out)
2. **roomFactor** (same-room boolean resolved by the caller via `sameRoomFor`): same room `×1.0`, different room `×0.25` (walls muffle).
3. **facingFactor(a)** — a = angle between the listener's forward vector and the direction to the source (controls.ts convention: yaw 0 faces −Z, `forward = (−sin yaw, −cos yaw)`): `a ≤ 60°` → `1.0`, `60° < a ≤ 120°` → `0.8`, `> 120°` (behind) → `0.6`. Co-located source = dead ahead.
4. **base** defaults to `0.35` — the copier peaks at 0.35 next to it.

**"Background everywhere except near it" is guaranteed by construction.** Sample final gains (same room, dead ahead, base 0.35): 2 m → 0.350, 5 m → 0.306, 10 m → 0.197, 15 m → 0.088, 30 m → 0.018. Cross-room ×0.25 (e.g. 5 m → 0.077); behind ×0.6. Through the default SfxBus (0.85) and master (0.7) volumes that is ~0.21 effective next to the machine vs ~0.6 today (~3x quieter near, ~34x quieter across the office). Contrast near-vs-10 m is >2x, monotonic decreasing everywhere.

`sameRoomFor(listenerRoom, sourceRoom)`: string equality; `null` (unknown room) on either side resolves to SAME-room so missing metadata can never mute an existing sound (behavior-preservation default; the production wiring supplies real rooms via `roomAt`).

Registry: `registerSoundSource(id, { getPos, getRoom? })` / `getSoundSource` / `unregisterSoundSource` / `clearSoundSources` (test isolation). Position getters are re-read on every play, so moving sources (robots) work. Only the photocopier is wired (by the proposed patches); future sources plug in without engine changes.

## TDD evidence

- **RED:** both new test files run against missing modules → `Test Files 2 failed (2), Tests no tests` (module-resolution failure). Confirmed 22:05.
- **GREEN:** after implementing both modules → `Test Files 2 passed (2), Tests 27 passed (27)`. (Two test-side fixes en route: import depth `../../` → `../../../`, a missing room override in the moving-source test, and a drift-free `i * 0.5` loop. One implementation fix: the 15–30 m segment now floors with `Math.max` because `0.25 − 0.20·(14.5/15)` evaluates to 0.05 − 1.4e−17, violating strict monotonicity — fixed in code, not in the test.)
- **Mutation checks** (sed-mutate → run → restore; restored files verified `diff`-identical):
  - `CROSS_ROOM_FACTOR 0.25 → 1.0` → **4 tests failed** (room muffle is covered)
  - `FACING_BEHIND_FACTOR 0.6 → 1.0` → **1 test failed** (facing factor is covered)
  - `MIN_DISTANCE_GAIN 0.05 → 0.5` → **2 tests failed** (distance curve/floor is covered)
  - adapter drops the gain: `sfx.play(sfxId, { volume: gain }) → sfx.play(sfxId)` → **4 tests failed** (bus-volume application is covered)
- **Full gates:**
  - `pnpm typecheck` → exit 0.
  - `pnpm test` → **Test Files 89 passed (89), Tests 990 passed (990)** — includes WS3's concurrently-edited files; no failures anywhere, none of my business to touch.

## Proposed patches (NOT applied — orchestrator applies)

The controller's `playSfx` option (`src/engine/npc-controller.ts:463`) already exists, so no npc-controller change is needed. Two files patched; behavior when `positionalSfx` is omitted (tests, headless) is byte-identical to today.

### Patch 1 — `src/engine/scene.ts` (3 hunks)

Hunk A, imports (after line 30, near the other engine imports):

```ts
import { registerSoundSource } from "../audio/positional";
import type { PositionalSfx } from "../audio/positional-three";
import { roomAt } from "./chatter";
```

Hunk B, `buildOfficeScene` signature (line ~248): add one optional 5th parameter after `isLunchActive`:

```ts
  isLunchActive: () => boolean = () => false,
  // WS10 (C-77): when provided, the photocopier SFX is positioned
  // (distance x room x facing gain on the shared SfxBus); when
  // omitted, the controller's default full-volume play is kept.
  positionalSfx?: PositionalSfx | null,
): SceneObjects {
```

Hunk B2, the controller call (line 333) — pass the option through:

```ts
  const npcController = createNpcController(NPCS, npcObjects, getCurrentPeriod, getDay, Math.random, isLunchActive, positionalSfx ? {
    playSfx: (id: "sfx_photocopier") => positionalSfx.play(id, "photocopier"),
  } : {});
```

Hunk C, register the source AFTER the multi-room build (immediately after line 348 `const multiRoom = buildMultiRoomMeshes(scene, WORLD_ROOMS);`). The registration must come after that line — the `xerox-printer` mesh is created inside `buildMultiRoomMeshes`, and `createNpcController` (line 333) runs BEFORE it, so any lookup done at controller-creation time finds nothing (same reason the controller's own `printer` lookup at npc-controller.ts:642 currently resolves to null in production):

```ts
  // WS10 (C-77): the photocopier is the first registered positional
  // sound source. getPos/getRoom are re-read on every play, so the
  // gain follows the player and the live printer object.
  const printerObject = scene.getObjectByName("xerox-printer");
  if (printerObject && positionalSfx) {
    registerSoundSource("photocopier", {
      getPos: () => ({ x: printerObject.position.x, z: printerObject.position.z }),
      getRoom: () => roomAt(printerObject.position.x, printerObject.position.z),
    });
  }
```

### Patch 2 — `src/main.ts` (2 hunks)

Hunk A, imports (top, near `./audio` / `./engine` imports) + module state near `let controls` (line 160):

```ts
import { createPositionalSfx, type PositionalSfx } from "./audio/positional-three";
import { roomAt } from "./engine/chatter";
```

```ts
// WS10 (C-77): shared positional-audio player. Created lazily on the
// first office mount; reads player position/yaw/room LIVE via the
// getters, so it is safe to build before `controls` exists.
let positionalSfx: PositionalSfx | null = null;
```

Hunk B, inside `startOffice()` immediately before `const built = buildOfficeScene(...)` (line ~439), and pass it as the 5th argument:

```ts
    if (!positionalSfx) {
      const playerPos = (): { x: number; z: number } => {
        const p = controls?.getPlayerPosition();
        return { x: p?.x ?? 0, z: p?.z ?? 0 };
      };
      positionalSfx = createPositionalSfx({
        sfx: audio().sfx,
        listener: {
          getPosition: playerPos,
          getFacingRad: () => controls?.getYaw() ?? 0,
          getRoom: () => {
            const p = controls?.getPlayerPosition();
            return p ? roomAt(p.x, p.z) : null;
          },
        },
      });
    }
    const built = buildOfficeScene(
      engine.scene,
      () => game.get().timeOfDay,
      () => game.get().day,
      isLunchActive,
      positionalSfx,
    );
```

Notes for the applier:
- `controls.getYaw()` and `controls.getPlayerPosition()` exist (controls.ts:560/562); `roomAt(x, z)` is exported from `src/engine/chatter.ts:73`.
- Re-mounting the office (title → office → title) re-runs `buildOfficeScene`; `registerSoundSource` overwrites by id (Map.set), so re-registration is idempotent. `positionalSfx` is created once and its getters always read live state.
- Behavior when Lucas stands next to the copier vs in the kitchen follows the table above; Renata's copy-run cadence (60–120 s re-trigger) is untouched.

## Deviations from the brief (deliberate, reported)

1. **No `THREE.AudioListener` / PannerNode in the adapter.** The brief suggested the adapter "holds the three.js AudioListener"; routing through it would build a parallel spatialization graph, which the same brief forbids ("REUSE it — do not build a parallel audio pipeline"). The adapter instead injects a plain listener-state provider (`getPosition/getFacingRad/getRoom`) and applies the gain via the existing `SfxBus.play(id, { volume })` option. Same audible result, one pipeline, zero new WebAudio nodes.
2. **Anchor points on the distance curve.** The brief's example was "1.0 at ≤3 m → ~0.25 at 15 m → min 0.05 beyond". Adopted exactly (0.25 at 15 m, 0.05 floor from 30 m), with the extra guarantee that final gain (base included) is already < 0.3 at 10 m same-room-front — required by the brief's own "background beyond 10 m" assertion.
3. **`sameRoomFor` with unknown rooms resolves to same-room** (never mute an existing sound when room metadata is absent) — documented in code and covered by tests; production wiring always supplies rooms via `roomAt`.
4. **`sfx.ts` untouched** — the anticipated volume setter was unnecessary (see above).
