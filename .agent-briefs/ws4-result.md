# WS4 result — World-tick batching: the office decides in bulk (C-77)

Branch `feat/jev-npc-decision-steering`, base HEAD `346d26f` (WS3 landed).
Status: **DONE** — 4 allowed files written, TDD red→green, 14/14 mutations
caught, `pnpm typecheck` exit 0, full `pnpm test` exit 0 (96 files, 1138
tests). Nothing committed, nothing pushed, no `bd`, `src/version.ts` untouched.

## 1. Changed files (exhaustive)

| File | Kind | Content |
|---|---|---|
| `src/game/world-projection.ts` | new (PURE) | `buildWorldTickProjection`, `pairProjectionKey`, `distanceBand` — per-subject namespaced tick projection (`world`, `events`, `npcs.<id>`, `pairs.<a>_<b>`), pre-computed named facts only. Imports only `CHATTER_RADIUS` from `engine/chatter` (pure). No three.js, no DOM, no clock. |
| `src/engine/world-tick.ts` | new | `createWorldTickWrapper` + `eligibleExchangesForPair` + policy constants. Scheduler (`update(dt)` accumulator @ 6 s unpaused + `onPeriodTransition()`), single request per tick, 700 ms cutoff, `retries: 0`, single-flight, 3-fail/60 s circuit breaker, per-subject validation, memo-backed instant-serve WS0 hooks (pair/starter/exchange + destination), decision-log on every outcome, `mode: "live" \| "shadow" \| "off"`. Headless-constructible (mode "off" never even builds a client). |
| `tests/unit/game/world-projection.test.ts` | new | 11 tests: namespacing + order-independent pair keys, bands/events, no raw arithmetic (raw coords/distances asserted absent from the JSON), band boundaries vs `CHATTER_RADIUS`, purity (frozen input). |
| `tests/unit/engine/world-tick.test.ts` | new | 29 tests with `FakeDecisionClient`/`PendingClient` + injected providers/legacy spies: scale assertion, batch composition, steered serve, exactly-once, cold cache, stale pool/day/period, per-subject partial fallback (4+1), thresholds (0.3 chatter / 0.5 destination), provider timeout, cadence, single-flight, breaker open/close/reset, `?jev=off`, shadow, unconfigured, uninstall restore, provider-throw containment. |

`git status --short` on the working tree shows exactly these 4 files, nothing else.

## 2. Red→green evidence

- `tests/unit/game/world-projection.test.ts` first run:
  `Test Files 1 failed (1) / Tests no tests` (module missing) → after
  implementing: `11 passed (11)`.
- `tests/unit/engine/world-tick.test.ts` first run:
  `Test Files 1 failed (1) / Tests no tests` (module missing) → after
  implementing: `29 passed`, after fixing one wrong test expectation
  (shadow test: BOTH judged questions log `shadow`, so 2 not 1 —
  implementation was right, the test undercounted): `29 passed (29)`.

### Mutation checks (PR-11) — 14 applied, 14 caught, all reverted

| # | Mutation (behavior broken) | Result |
|---|---|---|
| M1 | projection emits raw distance float | 2 failed |
| M2 | relationship band spread deleted | 1 failed |
| M3 | pair key no longer sorted (order-dependent) | 2 failed |
| M4b | single-flight guard removed from `tick()` | 1 failed |
| M5 | breaker never opens (`if (false)`) | 2 failed |
| M6 | one bad destination answer wipes the whole dest memo batch | 1 failed |
| M7 | shadow mode installs hooks | 1 failed |
| M8 | `off` mode still requests | 1 failed |
| M9 | exchange serve skips the pool-identity freshness check | 1 failed |
| M10 | destination serve ignores the period freshness key | 1 failed |
| M11 | chat memo never consumed (double apply) | 2 failed |
| M12 | `retries: 1` on the ambient path | 1 failed |
| M13 | exchange candidates truncated to 5 | 1 failed |
| M4 (first try) | removed the redundant `inFlight` check in `update()` only | 29 passed — NOT caught, because `tick()` itself re-checks `inFlight`; re-ran the mutation at the enforcement point (M4b) → caught. Defense-in-depth kept, but the test pins the behavior at the layer that enforces it. |

All mutations were applied to scratch copies and reverted (`diff -q` verified
byte-identical restore for both source files).

## 3. Vitest / typecheck summary

```
pnpm typecheck  → exit 0
pnpm test       → Test Files 96 passed (96) / Tests 1138 passed (1138) — exit 0
  of which new: tests/unit/game/world-projection.test.ts (11)
                tests/unit/engine/world-tick.test.ts (29)
```

No pre-existing test broke. Concurrent-worker caveat is moot this run: the
full suite is green, so no "their files" failures to note.

## 4. Design notes for review

- **Batch composition (brief invites disagreement).** One request per tick
  carries: per due pair a starter Choice (2 candidates) + an exchange Choice
  (ALL eligible exchanges, ~28-37 candidates for an IT pair), plus one
  destination Choice per NPC (13 candidates: `dest:stay` + 12 authored
  `RANDOM_DESTINATIONS`). Realistic tick = 0-3 pairs + 15 destinations ⇒
  ~16-21 questions. Context-rot tradeoff: the payload grows linearly in
  questions, but every subject's FACTS stay isolated in its own
  projection subtree (`npcs.<id>`, `pairs.<a>_<b>`, D-49) and each question
  is answerable from its own candidates + subtree alone, so added batch size
  does not add cross-subject noise. Splitting destinations into a second
  request would halve nothing at these sizes and double ambient request
  count; I kept D-48's "one request covers all due judgments". Revisit only
  if labeled tick-vs-per-subject accuracy (D-48 review trigger) says
  otherwise.
- **Chatter at scale.** Candidate ids are `exchange:<office|lunch>:<index>`
  indexing the eligible list that was actually sent; the memo stores the
  exchange OBJECT, and serve-time freshness re-checks `pool.includes(...)`,
  so a morning-decided office line can never leak into a lunch conversation.
- **Per-subject = per-question fallback granularity.** Starter and exchange
  are validated independently; a rejected starter does not discard a valid
  steered exchange for the same pair (and vice versa). Destinations are one
  subject each. The "4 applied / 1 legacy" shape from the brief is pinned
  for 5 destinations with 1 bad answer.
- **Destination steering = prefetch next period, consume at transition.**
  Ticks during period P store memos for NEXT(P); the `pickRandomDestination`
  hook serves only the exact (day, period) and consumes the memo (exactly
  once, D-58). A steered `null` ("stay at desk") is served as a decision
  with NO legacy roll — matching events.ts's presence-first contract.
- **Circuit breaker** counts provider-level failures only (per-subject
  validation failures don't trip it); success resets; while open both
  `update()` ticks and `onPeriodTransition()` are silent; after 60 s the
  next tick is the half-open probe.
- **Breaker-open behavior keeps hooks installed:** fresh memos still serve
  instantly; anything cold falls to legacy. No new requests for 60 s.
- **Logging** follows decision-log pinned semantics: 1 entry per judged
  subject-question (`applied`/`shadow`/`rejected`), 1 per subject on
  provider failure (`legacy`, reason `provider-*`), plus serve-time `stale`.
  Surfaces: `chatter-exchange` (starter+exchange), `destination`. Subject
  ids: sorted `a|b` pair key (same key the controller cooldowns use), or
  npcId.

## 5. Proposed shared-file patches (NOT applied — orchestrator-owned)

All line numbers refer to HEAD `346d26f`. Three patch groups: the
conversation-candidate provider (npc-controller.ts), and the main.ts wiring
(frame-loop accumulator, construction/install point, period transitions,
fired-event feed).

### Patch A — `src/engine/npc-controller.ts` (4 small hunks)

**A1** — `NpcController` interface, after `getActiveConversations` (line 130):

```ts
  /** C-46 debug/test hook: the conversations currently in flight. */
  getActiveConversations: () => readonly ActiveConversationView[];
+ /**
+  * WS4 (C-77): the most recent eligible chatter pair list the update
+  * loop computed (the `candidatePairs` output). The world-tick scheduler
+  * reads this as its conversation-candidate provider, so Jev judges
+  * exactly the pairs the controller could pick. Stale by at most one
+  * frame — far inside the 6 s tick cadence.
+  */
+ getChatterCandidatePairs: () => readonly ChatterPair[];
```

**A2** — state, after `const pairCooldowns = new Map<string, number>();` (line 557):

```ts
  const pairCooldowns = new Map<string, number>();
+ // WS4 (C-77): last eligible-pair list computed by the chatter block,
+ // exposed via getChatterCandidatePairs for the world-tick scheduler.
+ let lastChatterCandidatePairs: readonly ChatterPair[] = [];
```

**A3** — inside the chatter block, right after the `candidatePairs(...)` call
(lines 1968-1972):

```ts
        const pairs = candidatePairs(candidates, CHATTER_RADIUS, {
          cooldowns: pairCooldowns,
          now: controllerElapsed,
          activeRooms,
        });
+       lastChatterCandidatePairs = pairs;
```

**A4** — controller return object, after the `getActiveConversations` entry
(lines 2059-2064):

```ts
    getActiveConversations: () => [...conversations.values()].map((conversation) => ({
      a: conversation.aId,
      b: conversation.bId,
      responseIn: Math.max(0, RESPONSE_DELAY_S - (controllerElapsed - conversation.starterAt)),
      starterLine: conversation.starterLine,
    })),
+   getChatterCandidatePairs: () => lastChatterCandidatePairs,
```

### Patch B — `src/main.ts` (6 hunks)

**B1** — imports. Line 69 currently:

```ts
import { jevDecisionHooks } from "./engine/npc-controller";
```
becomes:

```ts
import {
  createDefaultDecisionHooks,
  jevDecisionHooks,
} from "./engine/npc-controller";
import {
  createWorldTickWrapper,
  type WorldTickHandle,
} from "./engine/world-tick";
```

**B2** — state, after `let dialogueSteerer: DialogueSteererHandle | null = null;`
(line 228):

```ts
// WS4 (C-77): the world-tick scheduler — ONE batched ambient request per
// 6 unpaused real seconds (+ every period transition) covering chatter
// pair/starter/exchange and next-period destinations. Same ?jev modes as
// the other wrappers: "off" never constructs, "shadow" judges + logs
// without steering, live otherwise (still inert while unconfigured).
let worldTick: WorldTickHandle | null = null;
// WS4: today's fired random-event slugs for the tick projection
// (allowlisted content ids only; D-59). Reset at each day rollover.
let worldTickFiredEvents: string[] = [];
```

**B3** — builder, after `buildDialogueSteerer` (after line 233):

```ts
function buildWorldTick(): WorldTickHandle | null {
  if (JEV_MODE === "off") return null;
  return createWorldTickWrapper({
    hooks: jevDecisionHooks,
    mode: JEV_MODE === "shadow" ? "shadow" : "live",
    providers: {
      getDay: () => game.get().day,
      getPeriod: () => game.get().timeOfDay,
      getChatCandidates: () => sceneObjects?.npcController.getChatterCandidatePairs() ?? [],
      getDestinationNpcs: () => NPCS.map((npc) => npc.id),
      getFiredEvents: () => worldTickFiredEvents,
      // WS-note: pair relationship bands arrive when the WS-social pair
      // matrix is exposed; until then the projection omits them.
      getRelationshipBands: () => ({}),
    },
    // TAC-01 rng-order preservation: the exact pre-bound legacy pickers
    // the events dispatcher uses as its fallback.
    legacy: createDefaultDecisionHooks({
      rng: Math.random,
      getDay: () => game.get().day,
    }),
  });
}
```

**B4** — office mount, after `prefetchGreetingsNow();` (line 590):

```ts
    // WS4: a fresh world-tick scheduler per office mount. install() is a
    // no-op while Jev is unconfigured, so the game plays legacy (TAC-01).
    worldTick?.uninstall();
    worldTick = buildWorldTick();
    worldTick?.install();
    worldTickFiredEvents = [];
```

**B5** — frame loop, inside the unpaused-clock block (lines 1878-1888):

```ts
  if (shouldAdvanceSimulationClock({
    screen,
    dialogueOpen: dialogue?.isOpen() ?? false,
    cinematicPlaying,
    helpOpen: helpModal?.isOpen() ?? false,
    endDayModalOpen: endDayModal?.isOpen() ?? false,
  })) {
    const advanced = advancePeriodElapsed(game.get().timeOfDay, currentPeriodElapsed, dt);
    currentPeriodElapsed = advanced.elapsedInPeriod;
    if (advanced.periodsAdvanced > 0) advanceOfficePeriods(advanced.periodsAdvanced);
+   // WS4 (D-48): the tick cadence counts UNPAUSED simulation seconds —
+   // exactly the frames that feed the C-67 clock. Blocking overlays
+   // freeze chatter/destination pre-decisions with everything else.
+   worldTick?.update(dt);
  }
```

**B6** — period transitions, in `advanceOfficePeriods` (lines 1544-1557) and
the day-start morning event (lines 1021-1025):

```ts
function advanceOfficePeriods(periodCount: number): void {
  const prevDay = game.get().day;
  for (let i = 0; i < periodCount; i++) {
    game.dispatch({ type: "advance-time" });
-   if (game.get().day === prevDay) runPeriodEvent(hud, game.get().timeOfDay);
+   if (game.get().day === prevDay) {
+     const fired = runPeriodEvent(hud, game.get().timeOfDay);
+     // WS4: feed the fired event slug into the tick projection.
+     if (fired && !worldTickFiredEvents.includes(fired.id)) worldTickFiredEvents.push(fired.id);
+     // WS4 (D-48): transition trigger — pre-decides this period's
+     // chatter and prefetches NEXT period's destinations.
+     worldTick?.onPeriodTransition();
+   }
    else break;
  }
  if (game.get().day !== prevDay) {
    currentPeriodElapsed = 0;
+   worldTickFiredEvents = []; // WS4: a new day, a fresh event list
    // The rollover already moved the calendar; endDay must not advance
    // it a second time (C-52).
    endDay(true);
  }
}
```

and at the day-start event:

```ts
  if (game.get().flags["_seen-intro-toast"]) {
    setTimeout(() => {
-     runPeriodEvent(hud, "morning");
+     const fired = runPeriodEvent(hud, "morning");
+     if (fired && !worldTickFiredEvents.includes(fired.id)) worldTickFiredEvents.push(fired.id);
+     worldTick?.onPeriodTransition(); // WS4: day-start pre-decision round
    }, 1200);
  }
```

Notes for the orchestrator when applying:
- `advanceOfficePeriods` and the mount code are the only transition sites I
  found (`runPeriodEvent` call sites: lines 1023, 1548). If a screen
  unmount path should detach the scheduler, `worldTick?.uninstall()` there;
  the greeting wrapper has the same open question today, so I mirrored it.
- `getDestinationNpcs` returns ALL npc ids; not-yet-arrived NPCs simply
  never get their memo consumed (events.ts skips them) and it goes stale —
  harmless. Filter by `hasArrived` at prefetch time if you prefer.
- Destination candidates are `dest:stay` + the 12 authored
  `RANDOM_DESTINATIONS`. Kitchen micro-sequences and colleague-desk visits
  stay legacy-only: they are rng-computed entries, not stable authored
  candidates (D-45). Enrich later if you want Jev to pick those too.

## 6. Deviations / decisions to flag

1. **Exchange eligibility = BOTH speakers' affinities (per brief), not the
   legacy starter-only filter.** `chatter.ts pickExchange` filters by the
   STARTER only ("responses are unrestricted"); the WS4 brief says the
   candidate set is "filtered by both speakers' SPEAKER_TOPICS affinities".
   I followed the brief: `eligibleExchangesForPair` intersects. Effect: a
   grazyna+janusz pair sees only general lines as candidates, whereas legacy
   could have grazyna start a finance line at janusz. `?jev=off` behavior is
   UNCHANGED (legacy picker untouched), so TAC-01 holds; only the steered
   candidate set is narrower. If Lucas wants the wider set, delete one line
   (`topicsB` check) — pinned by a dedicated test that would then need
   updating.
2. **`mode` option instead of `shadow` boolean** (greeting wrapper uses
   `shadow?: boolean`). The brief says "`?jev=off|shadow` honored via
   constructor options"; a single tri-state `mode` makes "off constructs
   nothing" explicit and testable. The main.ts patch maps
   `?jev=shadow` → `mode: "shadow"`.
3. **Provider-throw containment policy:** optional providers (chat
   candidates, destinations, events, bands) degrade to defaults and the tick
   proceeds; `getDay`/`getPeriod` failures ABORT the tick (every freshness
   key would be fabricated). Pinned by the containment test.
4. **Starter steering included.** The brief lists "pair/starter/exchange" —
   starter is a steered 2-candidate Choice per pair with the chattiness
   weight as authored `priority` (tie-break hint), threshold 0.3 (cosmetic,
   D-60).
5. **No `version.ts` bump, no commits, no `bd`** — per the brief.
6. **Test-side caveat discovered during mutations:** `FakeDecisionClient`
   sequence scripts keep per-question consume indexes across `setScript`
   (fake-client is not mine to change); the breaker "fresh streak" test
   works around it with a single-spec `"*"` script. Harmless, noted for
   future suite authors.
