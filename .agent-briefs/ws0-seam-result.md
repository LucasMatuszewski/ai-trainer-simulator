# WS0 result — seam commit for the Jev NPC-steering feature

Date: 2026-09-28 · Branch: `feat/jev-npc-decision-steering` · Worker: WS0 delegate (GLM)
Brief: `.agent-briefs/ws0-seam.md` · Nothing committed, nothing pushed (per brief).

**Verdict: DONE.** `pnpm typecheck` exit 0, full `pnpm test` 768/768 green,
behavior provably identical to pre-change (hook defaults are the legacy pickers
pre-bound to the controller rng; seeded-rng lockstep + full-timeline equivalence
tests pass; mutation check confirms the tests have teeth).

## 1. Changed files

| File | Status | What |
|---|---|---|
| `src/jev/contracts.ts` | NEW | Shared contract TYPES only: `DecisionSurface` (D-60 table), `DecisionCandidate`, `DecisionSubject`, `DecisionRequest`, `DecisionAnswer` (discriminated: `choice`/`score`/`noul`/`subset`; **noul carries `noul: number` and no `confidence`**), `DecisionHooks` (six optional members). Compiles to nothing at runtime. |
| `src/engine/npc-controller.ts` | MOD (+111 / −9) | `export const jevDecisionHooks` (module-level mutable holder, read LIVE per decision); `createDefaultDecisionHooks(deps)` (pre-bound legacy defaults); `NpcControllerOptions.hooks?: DecisionHooks`; five live resolvers (`pickGreetingFor`, `pickGoodbyeFor`, `pickChatterPairFor`, `pickChatterStarterFor`, `pickChatterExchangeFor`); six call sites swapped 1:1 (goodbye L1177, greetings L1261/L1275, pair L1859, starter L1870, exchange L1874–1878). Resolution order: `options.hooks` → `jevDecisionHooks` → legacy. |
| `src/main.ts` | MOD (+23) | Clearly-marked extension point: re-exports `jevDecisionHooks` with a usage comment for later waves. |
| `src/content/npc-content/registry.ts` | NEW | `NpcContentEntry` (`replyCandidates?`/`argumentPools?`/`questionPools?` + minimal member types), `NPC_CONTENT: Record<NpcId, NpcContentEntry | undefined>`, `registerNpcContent()`. Imports nothing. |
| `src/version.ts` | MOD | `v2026.09.03-08` → `v2026.09.28-01` (first code-touching commit today per C-68). Verified: console line (`main.ts`) and title footer (`title.ts` L48) both import `GAME_VERSION`; nothing hardcodes it; `title.test.ts` regex `^v\d{4}\.\d{2}\.\d{2}-\d{2}$` still matches. |
| `scripts/content-volume.mjs` | NEW | Baseline generator: imports the REAL content modules via Vite 5 `createServer` + `ssrLoadModule` (no regex parsing), counts distinct normalized strings per category, writes the frozen JSON. Run: `node scripts/content-volume.mjs`. |
| `tests/unit/content/volume-baseline.json` | NEW (generated) | Frozen baseline (numbers in §4). `frozenAgainstCommit: "42000fd"`; content tree verified identical to 42000fd (`git diff 42000fd..HEAD -- src/content/` is empty). |
| `tests/unit/jev/decision-hooks.test.ts` | NEW | 10 tests (§3). |
| `tests/unit/content/npc-content-registry.test.ts` | NEW | 7 tests (§3). |

No other file was touched (`git status --short` = the 3 modifications + 6 new
paths above). No gameplay behavior, dialogue text or rng ordering changed.

## 2. RNG-order guarantee (how identity is preserved)

Every pre-seam call site called the legacy picker with the controller rng
directly. Post-seam the call site calls a resolver whose fallback branch calls
`defaultHooks.X(...)`, where `defaultHooks = createDefaultDecisionHooks({ rng, getDay })`
and every member is the IDENTICAL legacy call (`pickMorningGreeting(npcId, rng)`,
`pickPair(pairs, rng)`, `pickStarter(a, b, rng)`, `pickExchange(pool, rng, starterId)`,
`pickEveningGoodbye(npcId, rng)`, `pickRandomDestination(npcId, rng, getDay(), period)`)
bound to the same rng instance. Same draws, same order, same points in the flow.
The exchange call site hoisted `isLunchActive() ? LUNCH_CHATTER : OFFICE_CHATTER`
into a local — same evaluation, zero rng impact. Overridden hooks consume
whatever they want; unset members never change the stream.

## 3. Tests (TDD red → green: FOLLOWED)

- **RED first:** wrote `tests/unit/jev/decision-hooks.test.ts` (10 tests) and
  `tests/unit/content/npc-content-registry.test.ts` (7 tests) BEFORE any
  implementation. Run result: registry suite `FAIL ... Failed to load url
  ../../src/content/npc-content/registry`; decision-hooks `10 tests | 9 failed`
  (the 6 lockstep equivalence tests, 2 override tests, 1 holder test failed on
  missing `createDefaultDecisionHooks`/`jevDecisionHooks`; the timeline test
  passed trivially because both runs were still pure legacy). (Two early path
  bugs in the test file itself — wrong `../` depth, then legacy-rng streams not
  paired — were fixed before implementation.)
- **GREEN after implementing:** `2 passed (2) / 17 passed (17)`.
- **Mutation check (PR-11) — PASSED:** temporarily mutated the factory to
  `pickMorningGreeting: (npcId) => pickEveningGoodbye(npcId, deps.rng)` and
  `pickChatterPair: (pairs) => pairs[0] ?? null` → exactly the 3 guard tests
  failed (greeting lockstep, pair lockstep, full-timeline equivalence). Restored
  → 17/17 green again.

Test content (paths chosen per plan §1.4, `<area>/<name>.test.ts` convention):

- `tests/unit/jev/decision-hooks.test.ts`
  1. `pickMorningGreeting` default ≡ legacy, lockstep streams, 15 NPCs × 3 seeds.
  2. `pickEveningGoodbye` default ≡ legacy, same matrix.
  3. `pickChatterPair` default ≡ `pickPair` incl. empty-list null, 5 rounds × 3 seeds.
  4. `pickChatterStarter` default ≡ `pickStarter`, 5 duos × 5 rounds × 3 seeds.
  5. `pickChatterExchange` default ≡ `pickExchange` over 50-pick streams on both pools (per-side pool copies isolate the last-pick WeakMap).
  6. `pickRandomDestination` default ≡ legacy, 15 NPCs × 4 periods × 3 seeds.
  7. Hook `pickChatterPair → null` prevents every conversation (controller-level).
  8. Hook `pickChatterStarter` decides who starts (controller-level, `a < b`).
  9. Holder test: installing on module-level `jevDecisionHooks` is picked up live; cleaned up in `finally`.
  10. **Full-timeline equivalence:** two 70 s controller runs, same seed; run A defaults, run B routes every decision through explicit legacy-bound hooks — identical conversation timelines. Each run executes inside a FRESH module registry (`vi.resetModules()` + dynamic imports) because `pickLine`/`pickExchange` keep per-array-identity "no repeat" memories in module WeakMaps that two runs would otherwise desync. Also asserts chatter actually fired (non-empty frames).
- `tests/unit/content/npc-content-registry.test.ts`
  1. Registry starts empty. 2. `registerNpcContent` stores. 3. Re-register overwrites. 4. `NpcContentEntry` fields optional/independent (cleanup in `afterEach`).
  5. `DecisionHooks`: empty object typechecks (all optional); full object typechecks; six members present.
  6. `DecisionAnswer` discrimination; **noul has `noul`, no `confidence`**.
  7. `DecisionRequest` shape (decisionId/generation/surface/subjects/projection).

## 4. Frozen baseline numbers (`tests/unit/content/volume-baseline.json`)

| Category | raw | distinct (normalized) |
|---|---|---|
| dialogueNodes | 220 | 220 |
| dialogueOptions | 209 | 182 |
| chatterStarters | 91 | 91 |
| chatterResponses | 408 | 408 |
| greetingLines | 108 | 108 |
| goodbyeLines | 42 | 42 |
| burekLines | 18 | 18 |
| **TOTAL** | **1096** | **1069** (global unique: 1069) |

Normalization: trim + collapse whitespace + lowercase. Scope notes are inside
the JSON (`scopeNotes`): the un-exported private pools (morning `FALLBACK`,
evening `GENERIC`/`DOG`) and UI affordance text (links/buttons) are not counted.
Content tree verified byte-identical to `42000fd`, so these are the numbers the
ADR means by "the frozen `42000fd` baseline"; AC-27's 10× test measures against
this file. Moving the baseline = re-running the script = orchestrator decision.

## 5. Deviations / obstacles (disagreement clause)

1. **`pickRandomDestination` hook is declared + defaulted but its live call site could NOT be wired.** Obstacle, precisely: the destination pick happens in
   `src/game/events.ts:67` — `rollRandomNpcDestinations()` calls
   `pickRandomDestination(npcId, Math.random, state.day, period)` directly after
   obtaining the controller via `registerNpcController(...)`; `src/game/events.ts`
   is NOT in the brief's allowed-files list, so touching it would violate the
   hard constraint. What exists instead: the `pickRandomDestination` member on
   `DecisionHooks` (with `ScheduleEntry | null` — the legacy contract returns
   `null` for "stay at desk"; the brief's `=> ScheduleEntry` signature would
   have broken that, so this is a deliberate type correction), its legacy
   default in `createDefaultDecisionHooks`, and holder support. **One-line
   orchestrator patch when wiring (WS4 or direct):** in `rollRandomNpcDestinations`,
   resolve `const dest = jevDecisionHooks.pickRandomDestination?.(npcId, period)
   ?? defaultDestinationHooks.pickRandomDestination(npcId, period)` with
   `defaultDestinationHooks = createDefaultDecisionHooks({ rng: Math.random, getDay: () => state.day })`
   built once — this reproduces today's `Math.random`+`state.day` semantics
   exactly. NOTE: `events.ts` importing `main.ts` would be a cycle; the holder
   is importable cycle-free from `./engine/npc-controller` (its home).
2. **Item 3 "create and pass the default hooks object where `createNpcController` is constructed" could not be done in main.ts** — the controller is constructed in `src/engine/scene.ts:333` (`buildOfficeScene`), which is not in the allowed-files list either. Consequence-free by design: the controller self-defaults to the legacy pickers and resolves `options.hooks` → `jevDecisionHooks` → legacy on every call, so nothing needs to be passed at construction and later waves can install hooks at any time without a constructor change. Documented in the main.ts comment block.
3. **`DecisionHooks.pickChatterExchange` receives `(pool, starterId)`** (the active pool as candidate list) rather than a lunch flag — so a steered implementation sees the full candidate set (ADR D-60 "Chatter exchange | Choice"). Pool (lunch vs office) selection stays at the call site.
4. **Test detail, not a code deviation:** the timeline-equivalence scenario runs in fresh module registries per run and needs no other special-casing; Burek stays in the roster there. The earlier per-side pool copies used in the function-level exchange test are required by the same WeakMap mechanism and are documented in-test.

## 6. Verification transcript (summary lines)

- `pnpm typecheck` → `tsc --noEmit`, exit 0 (final state).
- `pnpm test` (final state): `Test Files  73 passed (73)` / `Tests  768 passed (768)`.
- New suites alone: `Test Files  2 passed (2)` / `Tests  17 passed (17)`.
- RED (pre-implementation): `Test Files  2 failed (2)`; decision-hooks `10 tests | 9 failed`; registry suite failed to load (module absent).
- Mutation check: `Tests  3 failed | 7 passed (10)` under the two injected faults; restored → green.

## 7. Notes for the orchestrator

- `createDefaultDecisionHooks` is exported and is the intended single source of
  legacy defaults; WS1's greeting wrapper and WS4's wrappers should install via
  `jevDecisionHooks` (import from `./engine/npc-controller` or the `main.ts`
  re-export) rather than editing `npc-controller.ts` again.
- The six hook names/signatures are pinned by `tests/unit/content/npc-content-registry.test.ts`
  ("DecisionHooks exposes the six WS0 surfaces") — changing them breaks the test.
- Do not re-run `scripts/content-volume.mjs` casually: it overwrites the frozen
  baseline JSON (that is its job, but moving the baseline is an AC-27 decision).
