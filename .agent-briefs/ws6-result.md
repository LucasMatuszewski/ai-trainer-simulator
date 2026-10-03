# WS6 result — Interaction points, NpcNeeds, equipment faults (Wave 2)

Branch `feat/jev-npc-decision-steering` (base `f98375c`). Delegate: WS6.
All work is uncommitted, exactly as instructed; only the allowed files were
created/touched. `src/version.ts` NOT bumped.

## Changed files (complete list)

| File | Status |
|---|---|
| `src/game/npc-needs.ts` | NEW — pure needs model (decay, bands, daily reset, per-NPC table) |
| `src/engine/interaction-points.ts` | NEW — D-53 registry + bounded lifecycle + fault/repair + NPC trip proposals + positional sound-source registration |
| `tests/unit/game/npc-needs.test.ts` | NEW — 15 tests |
| `tests/unit/engine/interaction-points.test.ts` | NEW — 30 tests |
| `src/audio/manifest.ts` | NOT changed (see "Manifest" below — reuse was the correct path) |

Nothing else touched. The modified `src/content/*` files in `git status` are
WS3's concurrent work, untouched by WS6.

## TDD red→green evidence

1. RED: both suites run before implementation existed →
   `Test Files 2 failed (2), Tests no tests` (Failed to load url
   `src/engine/interaction-points` / `src/game/npc-needs`).
2. GREEN: `Tests 45 passed (45)` (15 npc-needs + 30 interaction-points).
3. Mutation checks (PR-11), each reverted and re-verified green after:
   - `CAFFEINE_DECAY_PER_HOUR` 8→5 → **4 failed**
   - `caffeineBand` craving threshold 25→0 → **1 failed**
   - `usePoint` busy-guard removed (no one-actor exclusivity) → **2 failed**
   - repair auto-complete `setFault(false)`→`setFault(true)` → **1 failed**
   - `sfxId: "sfx_coffee_pour"` → `"sfx_coffee_pour_missing"` (manifest
     resolution) → **1 failed** — the AC-20 "silently skipped sound" guard
     really fires.

## Test/typecheck summary

- `pnpm test` (FULL suite): **Test Files 94 passed (94), Tests 1098 passed
  (1098)** — includes my 45; nothing previously-passing broke. (WS3's suites
  happened to pass in this run too; their type errors are separate.)
- `pnpm typecheck`: **zero errors in WS6 files.** Remaining errors all point
  at WS3's in-flight files only (`dialogue-pool-*.ts`, `dialogue-pools.ts`,
  `dialogue-turn.ts`, `dialogue-turn.test.ts`, `dialogue-wrapper.test.ts`) —
  transient per the orchestrator note; re-ran twice, counts moved (136→131),
  none ever in `npc-needs.ts` / `interaction-points.ts` / my tests.
- Constraint honored: interaction-points has NO three.js import (verified by
  the import list: `audio/positional`, `type ScheduleEntry` only).

## API shape (for review — disagreement invited)

### npc-needs.ts (pure, runtime-only, never saved)

```ts
NpcNeeds { caffeine; social }            // 0..100
CAFFEINE_DECAY_PER_HOUR = 8; SOCIAL_DECAY_PER_HOUR = 6   // ADR constants
CAFFEINE_CRAVING_BELOW = 25; CAFFEINE_LOW_BELOW = 60
initialNeeds(); resetNeedsDaily()        // {100,100}; reset = whole persistence story
decayNeeds(needs, dtMinutes)             // pure, clamped, non-mutating
caffeineBand(v) -> "craving" | "low" | "ok"   // the projector language for Jev
createNeedsTable(ids) -> Record<NpcId, NpcNeeds>
```

A full 10 h active day at 1x decays caffeine 100→20 (morning `ok` → evening
`craving`), social 100→40 — the steering gradient Jev consumes.

### interaction-points.ts

Registry (module-singleton; `resetInteractionPoints()` for isolation/scene
rebuild) + D-53 lifecycle:

```
usePoint(id, actorId)        -> { ok, actionId, durationS } | { ok:false, reason }
                                reasons: "unknown-point" | "busy" | "jammed" | "not-faulted" | "interrupted"
activateAction(actionId)     -> boolean        // reserved → in-use (on ARRIVAL)
updateInteractionPoints(dt)  -> CompletedAction[]  // in-use advances; done emits
interruptPoint(id) / interruptAll()            // companion takeover / scene close
RESERVATION_TIMEOUT_S = 30   // stale reservation expires as "interrupted" (bounded)
```

Key ordering decision: `usePoint` checks **busy BEFORE jammed** so an
in-progress repair reads "busy" (someone IS at the machine), not "jammed".
The brief's "faulted → jammed" contract still holds for the plain case
(covered by tests).

Faults (AC-21): `setFault(id, faulted)` = transient bit (tests/sim);
`setFaultReadout((id) => boolean)` = the orchestrator wires it to
`game.get().equipment`; `isFaulted(id)` reads the readout when wired, else
the bit. Only the printer (`faultable: true`) accepts faults.

Repair (AC-21): `REPAIR_DURATION_S = 4`;
`beginRepair(id, actorId)` → `updateRepair(dt): progress 0..1` (auto-clears
fault + frees point at 1) → `finishRepair()` (early key release:
"interrupted", fault REMAINS). NPC simple path: beginRepair once, then
per-frame updateRepair — or one call carrying the whole duration.
`repairProgress()` reads without advancing.

Builtin points (positions ARE the world-layout prop data, rooms asserted
against `roomAt` in tests):

| id | position | room | sfxId (existing asset) | durationS | effect |
|---|---|---|---|---|---|
| coffee-machine | 13.0, 0, −6.6 | kitchen | `sfx_coffee_pour` | 4 | caffeine |
| printer | 5.15, 0, 16.75 | reception | `sfx_photocopier` (+ `sfx_printer_jam` on fault) | 6 | none |
| whiteboard | 23, 1.5, −3.06 | training | `sfx_click` | 3 | none |

Each `registerInteractionPoint` also registers a positional sound source
(`src/audio/positional.ts` registry, id = point id) so `positional-three.ts`
resolves the emitter at play time — same shape as the existing printer
source in `scene.ts:361-366`.

### Manifest (AC-20) — no data additions, deliberately

`src/audio/manifest.ts` is a LOADER; the id→asset data is the GENERATED
`public/assets/audio/manifest.json` and new ids would need new mp3 assets,
which the brief forbids. So all three points REUSE existing assets (table
above), and the test asserts every id (use + fault) resolves through the
production `resolveUrl()` against the real generated manifest — the
eighth-verdict N2 guard. A future authored sound only needs its asset
generated and the def's id swapped; the test stays as the gate.

## ScheduleEntry proposal — purposeful NPC use (AC-22)

`suggestNpcUse(npcId, pointId)` returns the exact trip; the controller's
EXISTING `setOverride` installs it (same pattern as `rollRandomNpcDestinations`):

```ts
interface NpcUseTrip {
  npcId: string; pointId: string;
  destination: ScheduleEntry;   // stand spot, state "at-desk" (NOT "kitchen" —
                                // setOverride special-cases "kitchen" into a full tour)
  dwellS: number;               // = point.durationS
  sfxId: string;
}
```

Exact ScheduleEntries shipped in the module (tests pin them):

| point | destination | face | why |
|---|---|---|---|
| printer | `{x:4.4, y:0, z:15.6}` | `0` (+Z) | byte-identical to the shipped `PRINTER_STOP` |
| coffee-machine | `{x:13.0, y:0, z:-5.5}` | `Math.PI` (−Z) | mirrors `KITCHEN_MICRO_STOPS.coffee`, minus the kitchen-tour state |
| whiteboard | `{x:23, y:0, z:-3.6}` | `0` (+Z toward board) | training room, off the z=−3 wall inner face |

Sequence: `usePoint` (reserve; "jammed" → NPC balks) →
`setOverride(npcId, trip.destination)` → on arrival `activateAction(actionId)`
+ play `trip.sfxId` → after `dwellS` → `setOverride(npcId, null)` (return leg
= back to their period schedule; no new controller API needed).

## Proposed patches (SUBMITTED, NOT APPLIED)

### Patch 1 — `src/main.ts`: bootstrap, persisted faults, effects, frame tick, teardown

After the `registerNpcController({...})` block (~line 501):

```ts
    // WS6 (D-53/AC-20..22): interaction points + needs. Registry is pure;
    // the wiring is the orchestrator's.
    registerBuiltinInteractionPoints();
    setFaultReadout((id) => game.get().equipment?.[id] === "faulted");
    setFault((id, faulted) =>
      game.dispatch({ type: "set-equipment-fault", id, faulted }));
    onActionCompleted((action) => {
      if (action.effect === "caffeine") {
        if (action.actorId === "player") {
          game.dispatch({ type: "add-stat", target: "caffeine", delta: 15 });
        } else {
          npcNeeds[action.actorId] = initialNeeds(); // NPC needs reset
        }
      }
    });
```

(To avoid touching `setFault`'s signature, the 3-line variant is: keep
`setFault` as-is for the bit and add a `setFaultDispatcher` hook analogous
to `setFaultReadout` — happy to do either; the signature change is my
preference, it keeps one fault path.)

Frame loop (`frame()`, ~line 1583, inside the same branch as
`sceneObjects.updatables`):

```ts
        updateInteractionPoints(dt);
        // Repair hold: while the player holds E at a jammed printer.
        updateRepair(heldE ? dt : 0);
```

Needs decay (needs runtime-only; in-game minutes = real seconds at 1x):

```ts
        for (const id of Object.keys(npcNeeds)) npcNeeds[id] = decayNeeds(npcNeeds[id], dt / 60);
```

Teardown (wherever the scene is disposed/rebuilt — the `interruptAll()` call
must precede rebuilding the office):

```ts
    interruptAll();          // releases every reserved/in-use/repairing point
    resetInteractionPoints();
```

Day end (`endDay()`, ~line 1144): `npcNeeds = createNeedsTable(npcIds)` (the
daily reset).

### Patch 2 — `src/engine/npc-controller.ts`: Renata's errand visibly balks (AC-21)

In `startCopyRun()` (~line 990), first lines of the body:

```ts
  const startCopyRun = (): void => {
    if (isFaulted(PRINTER_POINT_ID)) {
      // AC-21: the printer is jammed — Renata balks visibly (a bubble +
      // the error-buzzer once), stays at her desk, retries next window.
      showBubble(npcObjects[RENATA_COPY_NPC_ID].position, PRINTER_JAM_BALK_LINE);
      playSfx("sfx_error_buzzer");
      scheduleNextCopyRun();
      return;
    }
    // …existing body unchanged…
```

(`PRINTER_JAM_BALK_LINE` = one authored line, e.g. `"Not again. Someone fix
the copier!"` — author's choice.) Optional guard in the `copyPhase ===
"copying"` sweep block (~line 1459): skip `playSfx("sfx_photocopier")` while
faulted.

### Patch 3 — `src/engine/npc-controller.ts` (or a small `src/game/npc-steering.ts`): needs-driven purposeful use (AC-22)

Inside the controller's per-second chatter dice (or a `steerNpcUse(npcId)`
called from main's frame): when `caffeineBand(npcNeeds[id].caffeine) ===
"craving"` and the NPC is at-desk and not talking:

```ts
const trip = suggestNpcUse(id, "coffee-machine");
if (trip) {
  const reserved = usePoint(trip.pointId, id);
  if (reserved.ok) {
    pendingUseTrips.set(id, { trip, actionId: reserved.actionId });
    setOverride(id, trip.destination);          // EXISTING API
  }
}
```

On that NPC's arrival (`onArrival` path where `copyPhase` is handled,
~line 1388) detect a pending trip: `activateAction(actionId)` +
`playSfx(trip.sfxId)`; after `dwellS` → `setOverride(id, null)`. The
completion listener (Patch 1) resets their needs. Cleaner long-term home is
the DecisionHooks seam (`useInteractionPoint` hook member) — noted for WS0
follow-up; the above needs NO seam change.

### Patch 4 — `src/ui/hud.ts` + prompt path: use/repair prompts (AC-20/21)

Where the context prompt is shown (nearest-interactable check in main's
hover/periodic logic), by distance to `INTERACTION_POINT_DEFS` positions:

```ts
if (distTo(player, def.position) < 1.6) {
  if (isFaulted(def.id)) showPrompt(`Hold E to repair ${def.label}`);   // printer jam
  else showPrompt(`Press E to use ${def.label}`);
}
```

E keydown at a faulted printer → `beginRepair("printer", "player")`; keyup →
`finishRepair()`; per-frame `updateRepair(dt)` (Patch 1). E keydown at a
normal point → `usePoint(...)` + `activateAction(...)` immediately (player is
already there) + `playSfx(def.sfxId)`.

## Deviations / interpretations (explicit)

1. **"One usePoint call completes the repair after the duration"**: I read
   this as the scripted-NPC convenience path (beginRepair, then one
   `updateRepair(REPAIR_DURATION_S)`), since the brief separately fixes
   `usePoint("printer", …) → { ok:false, reason:"jammed" }` while faulted —
   a jammed point cannot also complete a repair through the same call.
   Documented on `updateRepair`.
2. **`"failed"` lifecycle state** exists in the type union (D-53 names it)
   but nothing produces it yet — reserved for future feasibility aborts of
   activated actions. Called out in the type comment.
3. **`finishRepair()` with no active repair** returns
   `{ ok:false, reason:"not-faulted" }` (no dedicated "no-repair" reason; not
   worth a new union member for an orchestrator-error case).
4. **Busy-before-jammed ordering** in `usePoint` (see API section) — test
   pins it; if the orchestrator prefers jammed-always, it is a one-line flip
   plus one test.
5. **`src/audio/manifest.ts` untouched** — see Manifest section; the AC-20
   gate is the test against the real generated manifest.
6. Test reads the manifest via Vite JSON import, NOT `node:fs` — `@types/node`
   is not installed, so unit tests cannot import node builtins (typecheck
   proved it; e2e gets away with it only because tsconfig excludes `tests/e2e`).

## Gates

- My suites: 45/45 green. Full `pnpm test`: 1098/1098 green, 94/94 files.
- `pnpm typecheck`: WS6 files clean; all remaining errors are WS3's
  transient, in-flight files.
- No commits, no pushes, no `bd`, no `version.ts` bump, WS0 seam block in
  `npc-controller.ts` untouched.
