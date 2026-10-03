# PR #4 independent code review

Reviewed `git diff master...HEAD` against ADR-0009, the Jev PRD, and AGENTS.md. Findings are ordered by severity.

## Blocker

- **Live dialogue and mission judgments fail before reaching OpenRouter** - `src/jev/openrouter-adapter.ts:131-139`, `src/jev/dialogue-wrapper.ts:158-167`, `src/jev/mission-wrapper.ts:275-284`. The adapter requires `candidates` for every `score` question and throws `invalid-request` when they are absent. Both wrappers construct score questions without candidates. Since dialogue batches scores with its reply Choice, every real dialogue request fails as a whole; mission answer scoring also always falls back. Fake-client wrapper tests bypass this conversion, so they do not pin the actual integration contract.

- **The dev proxy exposes the server key to unauthenticated callers** - `vite.config.ts:15-24`, `vite.config.ts:57-65`, `vite.config.ts:91-96`. Vite binds to `0.0.0.0`, and `/api/jev` accepts any POST without an origin check or rate limit, then forwards it with `OPENROUTER_API_KEY`. Any client able to reach the dev port can spend the key and submit arbitrary judgment payloads. The 1 MB cap and pinned model do not bound request count or cost. ADR-0009 section 6 explicitly calls for origin and rate controls before exposure; this proxy is exposed beyond localhost by the existing host setting.

## Major

- **A reply can answer a different player option** - `src/game/dialogue-turn.ts:315-329`, `src/ui/dialogue.ts:709-715`. `buildTurn` unions replies paired to all visible options, the steerer picks one reply for the whole turn, and `pickV2` applies that reply regardless of the option clicked. Choosing option B can therefore produce option A's answer (or its task offer/social effect), violating the branch's v3 option-to-replies contract and AC-01/AC-02. The tests cover pool construction and wrapper selection separately, but not the click against distinct paired options.

- **Dawid's legacy CEO arc becomes unreachable after the first meeting** - `src/main.ts:1497-1508`, `src/main.ts:1519-1528`. The v2 gate opens as soon as `ceo-met` is true, while the legacy tree still needs to run `give-task`, `performance-review`, and `fireside` according to the flag chain immediately below. Subsequent conversations go straight to the v2 pool, so `ceo-workshop-offered` and `ceo-reviewed` cannot be earned through those trees.

- **`?jev=off` still steers mission choices and scores** - `src/main.ts:254-263`. Dialogue and world-tick builders return `null` in off mode, but `buildMissionSteerer` always creates a live wrapper. With configured access, the conference mission still sends requests and applies judgments, breaking the off-mode fallback/equivalence contract in ADR-0009 D-55 and TAC-01.

- **Late key activation never installs the ambient hooks** - `src/main.ts:656-660`, `src/main.ts:991-1002`, `src/engine/world-tick.ts:730-742`. On a no-key office mount, `worldTick.install()` exits because the client is unconfigured. The settings callback rebuilds only the greeting wrapper. After the player adds a key, ambient ticks can make requests and log `applied`, but the NPC controller keeps calling legacy pickers because the four world-tick hooks were never installed. This violates AC-14 and makes the decision counters misleading.

- **The promised memory-only personal-key mode does not reach the game** - `src/ui/jev-settings.ts:31`, `src/jev/client.ts:41-47`, `src/jev/key-provider.ts:79-119`. Settings and each resolving client create separate `KeyProvider` instances. When localStorage is unavailable, a successful key test stores the key only in the settings instance's `memoryKey`; the game clients read their own empty memory and denied storage. The UI says "Personal key (this session only)" while every game judgment remains unconfigured. Existing key-provider tests exercise one instance and miss this integration path.

- **The NPC social simulation has no live input or effects** - `src/main.ts:270-278`, `src/game/state.ts:201-233`. The world-tick provider always supplies an empty pair-band map. There is no production dispatch of `apply-social-reaction` or `regress-social-nightly` (only the reducer definitions), so the 105-pair matrix is seeded and saved but never changes or influences Jev's visible choices. This misses AC-15, AC-18, AC-19, and the ADR-0009 D-50/D-57 perceptibility gate despite isolated reducer tests passing.

- **NPC needs and purposeful equipment actions are not connected** - `src/main.ts:303-305`, `src/main.ts:1817-1820`, `src/engine/interaction-points.ts:458-475`. Needs are created, decayed, and reset, but no runtime path reads their bands or calls `suggestNpcUse`/`usePoint` for an NPC. Only the player interaction path starts actions. NPCs cannot be judged to walk to equipment, use it, and return as AC-22 requires; tests cover the helper in isolation rather than the game path.

- **NPC needs continue to decay while the economy clock is paused** - `src/main.ts:1804-1820`, `src/main.ts:2003-2017`. Needs decay in every office frame, before the `shouldAdvanceSimulationClock` guard. A long dialogue, help screen, or conference mission can therefore drain NPC needs while game time and world ticks are frozen. That creates stale state and contradicts the documented 10-hour active-day gradient.

- **The adapter's 700/1200 ms deadline stops at response headers** - `src/jev/openrouter-adapter.ts:246-247`, `src/jev/openrouter-adapter.ts:274-283`. `attemptOnce` returns the `parseSuccessResponse()` promise without awaiting it inside the `try`, so `finally` clears the abort timer before `res.text()` completes. A slow or stalled response body can leave the world tick single-flight forever, defeating ADR-0009 D-48/D-56's hard cutoff and breaker behavior. The timeout test only holds `fetch` open, not the body stream.

- **The branch lacks a live smoke of the adapter/game path** - `tests/unit/jev/adapter-contract.test.ts:7-14`, `scripts/jev-eval.mjs:178-188`. The adapter contract suite stubs `fetch`, and the committed live evaluation script constructs and sends its own request directly to OpenRouter instead of exercising `createOpenRouterAdapter` or the playable game. The script shows provider availability, but it cannot catch the score-question mismatch above. AGENTS.md PR-14 requires one live smoke with provider-side evidence for a new external service integration; the branch does not contain that proof.

## Minor

- **Strict mode has no distinct behavior** - `src/main.ts:229`, `src/main.ts:254-269`. `?jev=strict` is parsed but treated exactly like live mode; there is no strict fallback toast or debug action. ADR-0009 D-55 and TAC-09 require a toast on every fallback.

REVIEW: CHANGES-REQUESTED — live score requests fail, the dev proxy exposes a server key, and several required game paths do not apply their decisions.
