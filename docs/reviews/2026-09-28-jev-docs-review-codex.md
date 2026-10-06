# Jev design documents: independent review

Reviewed 2026-09-28: PRD v2, ADR-0009 D-45 through D-57, and the parallel implementation plan. Read-only code spot-checks informed the findings below. This is a design review, not a runtime test or a fresh verification of provider pricing, limits, or latency; platform semantics are compared with the supplied platform research.

## 1. Verdict

**reject**

The product direction is worth implementing, but the current documents are not a safe executable contract: timing is inconsistent with the game clock, asynchronous results lack a complete application protocol, and persistence and parallel ownership leave concrete integration holes. Resolve the blockers and major contract gaps below before launching implementation; retain the authored-content, all-roster, and conference-mission commitments while proving them through a smaller first playable slice.

## 2. Top strengths

- Selection-only steering preserves authored character identity and gives code a finite validation boundary (ADR D-45).
- Preserved legacy pickers, a fake client, off mode, and shadow mode are a strong basis for behavioral comparisons (ADR D-47/D-55/D-57).
- Feasibility filtering and code-owned effects keep the model outside movement, clock, and economy authority (ADR D-49; PRD §11).
- Relationships have visible acceptance criteria, and the conference mission tests the trainer fantasy rather than merely demonstrating an API call (PRD AC-18/19/23-26).
- Local-only development, granular verification, and human screenshot review give the PoC useful containment and feedback (plan §1/§4).

## 3. Findings by severity

### Blocker

**B1. The scheduler's time unit and interactive request policy are contradictory.**

**References:** PRD Flow B/C, AC-11, §8 Functional; ADR D-48/D-56, §8.2; plan WS4.

The documents specify a tick every six *in-game seconds*. `src/game/pacing.ts` explicitly maps one active real second to one in-game minute: the proposed interval therefore means 100 ms at 1x, or 6,000 opportunities per ten-minute day, not 100. A 700 ms request would skip approximately seven such intervals. Separately, global single-flight says ticks are skipped but never says what happens when a player pick arrives during an ambient request. Waiting for ambient completion and then the dialogue budget could consume roughly 1.9 seconds, inconsistent with Flow C's promise of no waiting. Tree selection and option curation add further potential requests outside the stated one-request-per-pick contract.

**Concrete change:** Replace the cadence with: "Ambient rounds run every 6 active simulation seconds at 1x, equivalent to 6 in-world minutes. Blocking overlays suspend accumulation; no catch-up rounds occur." Define 700 ms as a total wall-clock deadline including retries. Add: "Interactive judgments cancel/discard ambient work and receive priority; their 1200 ms hard deadline starts at input acceptance. Show immediate input feedback, accept each pick once, and use fallback at the deadline." Treat six seconds as an initial measured setting, not a universal delay for greetings or event reactions. Explicitly reconcile the bounded pending UI with Flow C and budget the complete tree/options/reply chain.

**B2. Valid-at-request-time is insufficient to execute a judgment safely.**

**References:** ADR §4/§5, D-49/D-56, §8.2/§8.3; PRD AC-08/09/16/22.

D-56 mentions freshness only in a rejected-alternative sentence. No contract carries a decision identity, conversation generation, relevant-state revision, cancellation token, or consumed-effect marker. While a request runs, the player can switch NPCs, end a day, reset/load, switch keys, or occupy equipment. Two independently valid answers can also send two actors to the same point or schedule the same NPC for both chatter and equipment use. Per-subject validation does not resolve those conflicts. In the current dialogue implementation, node effects occur in `render()` and option effects have separate click/programmatic paths; adding async re-renders creates a specific duplicate-effect hazard.

**Concrete change:** Add an application contract: "Every decision has a unique ID, session/conversation generation, subject/action revision, and candidate-set version. Apply once only after rechecking relevant preconditions. A stale decision is discarded; if its opportunity still exists, recompute fallback from current state. Never replay an expired opportunity." Define deterministic arbitration for actor and equipment reservations, with existing event/quest/player/agent priorities above ambient Jev actions. Move effect application into a single accepted transition, separate from rendering. Require tests for close/switch/reset/load during flight, two picks, late replies after timeout, and conflicting batch actions.

**B3. The parallel plan does not give workers the files and dependencies required to complete their work.**

**References:** plan §1.2, §2, WS1-WS8, §5; ADR §10.

WS1 owns `src/jev/*` while continuous WS8 owns `src/jev/decision-log.ts`: a direct overlap. "morning-greeting wrapper touchpoint" is not a path; the actual greeting invocation and much ambient scheduling live in `src/engine/npc-controller.ts`, which no stream owns. WS4 owns a hypothetical `tests/unit/engine/*` namespace that contains WS6's `tests/unit/engine/interactions/*`. WS3 owns `src/main.ts`, but WS4/WS6 need scheduler/input wiring there and WS7/WS8 later need mounting and teardown. `src/ui/prompt.ts` does not exist. The content schema is promised in Wave 1 by §1.2 but assigned to WS3 in Wave 2, concurrent with its consumers. WS7 starts with Author D even though its questions depend on that author's pools. Argument choreography and the settings UI have no explicit implementation owner. Finally, §5 commits before judges run, whereas §4 treats judges as a phase acceptance gate.

**Concrete change:** Replace wildcards/placeholders with an exact ownership manifest and explicit exclusions. Add a serial interface/integration step before dependent work: shared request/content/action contracts, logging interface, and explicit hooks in `main.ts`/`npc-controller.ts`. Give the orchestrator sole ownership of those integration files, shared exports, `src/version.ts`, and shared test registration. Assign settings, argument runtime, audio assets, and persistence wiring explicitly. Supply WS7 fixture pools first, then integrate Author D's reviewed content through the frozen schema. Run each judge before the corresponding verified commit. Expand WS2 ownership as specified in M1. Do not claim disjoint ownership until these paths and dependencies are enumerated.

### Major

**M1. Save migration would be easy to implement with silent memory or relationship loss.**

**References:** PRD AC-15/16; ADR §4, D-51, TAC-05/06; plan WS2/WS3.

`NpcMemory` in `src/content/dialogue-memory.ts` contains `Set<string>` values, including nested `pickedOptions` sets; simply relocating it into JSON state serializes those as `{}`. The runtime singleton also needs replacement/reset semantics. Existing player relationships already live in `GameState.npcRelationships`; seeding a new all-pairs map without a reconciliation rule either loses them or creates two disagreeing authorities. Fifteen NPCs have 105 NPC pairs, but including the player yields 120 pairs. The ADR says player pairs are included while TAC-05 and WS2 require 105. `src/game/initial.ts` still returns version 1, and `src/main.ts:hasSave()` checks a versioned storage key; neither belongs to WS2.

**Concrete change:** Specify a JSON memory DTO using arrays and records, conversion at the memory API boundary, and clearing/replacing runtime memory on reset/load. Choose one source for player relationships: either 120 canonical pairs with a compatibility view, or 105 NPC pairs plus the existing player map accessed through one API. Preserve all existing player values; seed only missing edges. Assign WS2 `initial.ts`, `dialogue-memory.ts`, and their tests, with coordinator-owned title/load wiring. Specify storage-key policy, preservation of the original v1 payload until successful v2 write, and non-destructive handling of malformed/future saves. Add real serialized fixtures covering picked-option suppression, cash/flags/pose, reset, and migration twice.

**M2. "Exactly today's game" is not defined for entirely new systems.**

**References:** PRD Flow C, AC-10, §8 candidate coverage; ADR D-47, TAC-01; plan WS1/WS5/WS7.

There is no legacy conference scorer, new equipment behavior, or argument picker to preserve. Expanding a legacy random pool changes its picks for the same seed; persisting previously transient memory changes post-reload behavior. Even unchanged picker functions do not establish equality if wrappers consume random numbers differently or defer their invocation. The current absolute guarantee cannot hold simultaneously with all these additions.

**Concrete change:** Distinguish an explicit legacy comparison mode from normal runtime service failure. State: "Existing surfaces preserve baseline outputs, RNG consumption, and scheduling in legacy comparison mode. New surfaces have authored deterministic defaults and remain playable without Jev. Ordinary provider failure changes the selection source, not feature availability." If Lucas instead intends every new feature to disappear without Jev, say so explicitly and test that contract. Keep frozen baseline pools or fixtures for equivalence tests; compare multi-step traces, including RNG advancement and effect timing, rather than isolated picks alone.

**M3. The response abstraction cannot yet represent all promised judgments correctly.**

**References:** PRD Flow A/G, §11; ADR §4/§5, D-49, TAC-04; plan WS1/WS3/WS7. Supporting supplied research: `docs/research/2026-09-28-jev-typesafe-platform.md` §2.

The response is described as one selected ID plus confidence per subject, but option curation needs an ordered subset, and one NPC may have several independent questions. The validator requires confidence universally, whereas the supplied research says Noul has a probability and no separate confidence field. That research also says batched questions cannot see each other's answers: a delta cannot be conditioned on the reply selected by another question in the same batch unless all alternatives were evaluated in advance. D-49 rejects out-of-range deltas while PRD §11 says they are clamped; that changes which effect reaches the game.

**Concrete change:** Define a discriminated internal contract for choice, subset/ranking, score, and boolean probability, keyed by `(decisionId, subjectId, surface, questionId)`. Document each surface's primitive and conversion, including score rounding and Noul abstention semantics. For one-request reply-plus-delta, attach authored deltas to reply candidates or judge the already-known player action independently; do not imply cross-answer conditioning. Validate finite numbers, permitted IDs, cardinality, duplicate IDs, and distribution shape. Reject invalid provider output, then clamp valid reducer effects defensively. Define whether selection and its dependent deltas succeed atomically within a subject.

**M4. Curation can hide required progress, and the programmatic input path can bypass it.**

**References:** PRD Flow A, AC-04/05; ADR D-45/D-52; plan WS3.

Hard filtering proves an option is allowed, not that required quest/exit options remain visible among four slots. Deterministic curation could hide a required option indefinitely. In current `src/ui/dialogue.ts`, `pickOption()` searches `currentNode.options`, not the rendered `currentAvailableOptions`; keeping that path unchanged would allow WebMCP to select a hidden or previously picked option. Node effects also make "same panel, different selection" more consequential than a cosmetic change.

**Concrete change:** Add `requiredForProgress` and always-available exit semantics; reserve their slots before judging optional choices. Define an exhaustion path and a way to reach alternative topics without five visible choices. Route DOM and programmatic picks through the same eligibility/visibility/one-shot check. Keep the external WebMCP signature if required, but specify its behavior while a judgment is pending. Test a mandatory fifth option, exhausted optional pools, rejected hidden IDs, and quest completion with adversarial valid selections.

**M5. Cache lifetime does not satisfy the determinism acceptance criteria.**

**References:** PRD AC-02/03/04/26; ADR D-56, TAC-03; plan WS4.

The PRD promises identical-state stability within a session, while D-56 only guarantees a cached answer within a tick and also says unchanged state is never re-judged. A projection-only key can alias different candidate pools, question wording, providers, or model versions. Exact positions or an ever-changing timestamp could conversely destroy reuse. AC-02's twenty-trial variation test says little about whether the selections suit the changed relationship.

**Concrete change:** Define a bounded session cache keyed by normalized relevant facts, ordered candidate IDs/content version, question/policy version, surface, and resolved model/provider. State when entries expire and whether failures are cached. Invalidate pending work on mode/configuration changes. Test stability across ticks separately from purposeful variation across relationship buckets or mission histories; label acceptable selections for those states instead of accepting arbitrary differences.

**M6. Social dynamics are computationally cheap but behaviorally under-specified.**

**References:** PRD Flow H, AC-16/17/18/19; ADR §4, D-50; plan WS2/WS4.

An undirected pair value implies reciprocal liking, although reciprocity summaries suggest asymmetric experiences; this can be a valid PoC simplification but needs to be explicit. There is no sign/deadband definition for Heider triangles, triad scheduling cap, pair-history structure for reciprocity, argument thresholds, or daily relationship-change budget. ±5 per action still saturates a relationship after ten same-sign actions from neutral. A thirty-entry global diary does not guarantee recent history for each pair. Existing authored relationship effects plus an additional judged delta could also exceed the intended per-action bound.

**Concrete change:** Retain the all-pairs map and profiles; declare symmetric relationships an intentional PoC approximation. Specify friendship/hostility bands with a neutral deadband, a bounded pair-interaction history, and one aggregated relationship transaction per action. Add per-pair cooldown/rate limits and daily aggregate bounds. Define finite-time mood return rather than an unspecified decay that may never reach baseline. Initially expose triad scores in shadow; enable one capped tension event only after direct pair behavior passes a multi-day simulation demonstrating no runaway hostility, argument loops, or universal saturation. This stages the required social grounding without deleting it.

**M7. Calibration is simultaneously mandatory and deferred, with no passing threshold.**

**References:** PRD §8 Business/§12; ADR §1, D-57, TAC-10; plan §2, WS8, §4.

The PRD/ADR scope defer "calibration sign-off" to production, but D-57 prohibits live consequential steering until labeled evaluation. WS8 is both a Wave 3 workstream and continuous from Wave 1. No surface policy defines consequential versus cosmetic, minimum usable coverage, or a passing threshold. With invisible fallbacks, all mechanics tests and screenshots could pass while almost no Jev results apply. Identifier-only recent rows cannot reconstruct the evaluated projection, candidate set, or policy version.

**Concrete change:** State: "Production certification is deferred; local consequential activation still requires a documented per-surface evaluation gate." Assign calibration fixtures and a minimal log to Wave 1. Freeze a per-surface policy table before activation, with acceptable-choice sets, dangerous-error limits, coverage, latency, and threshold selection on held-out scenarios. Record model/question/content versions and safe scenario IDs that resolve to reproducible fictional inputs. Add reason-coded counters for requested/applied/legacy/rejected/stale/skipped and a live smoke check proving each enabled surface actually applies Jev answers. The judge must inspect these results, not just fake-client tests.

**M8. Key storage is covered better than the actual data boundary and access-mode behavior.**

**References:** PRD Flow D, AC-13/14, §8 Business, §11; ADR §3.2/§6, D-46; plan WS1/WS8.

The user can enter a real name in `Character.name`, and WebMCP can supply arbitrary companion text. A compact projection is not automatically fictional or free of secrets. "Player and agent text never becomes instructions" does not prevent those values entering state. Local-only "nothing leaves this machine" also contradicts the intended external requests. The key UI has no clear/remove action or handling for denied localStorage access. The server mode is described without a concrete proxy owner or a clear local-only unavailable state; a server URL must never receive the personal OpenRouter key accidentally.

**Concrete change:** Specify a field allowlist for outbound projections, stable fictional actor IDs instead of user-entered names, and exclusion of companion-authored free text from this feature. Add negative projection fixtures containing synthetic names/secrets. Clarify that local-only means no code push/deployment, while minimized fictional requests to the approved provider are intentional. Bind BYO credentials to the fixed approved provider origin, separate proxy authentication from BYO mode, add Clear key and memory-only behavior when storage is unavailable, and redact typed test-call errors. Assign the settings UI and either a local proxy with fixed upstream/body limits or an explicit unavailable Server status. Public proxy deployment can remain deferred for this PoC.

**M9. The 10x target is numerically ambiguous and does not prove usable content.**

**References:** PRD §2, AC-27/28/29; ADR D-52; plan WS5, §6.

AC-27 combines nodes, options, and candidate replies but cites a baseline of approximately 218 nodes and 210 options without defining whether replies already inside nodes count again. One plausible reading requires at least 4,280 counted items; another requires each category to grow tenfold. No fixed per-NPC minimum prevents most volume accumulating in a few characters. Shape checks cannot prove the ADR's claim that dead data is impossible: `src/content/npcs.ts` manually registers dialogue trees, and `openDialogueWith()` uses hardcoded tree selection. Valid authored files can remain unreachable. Burek is only an add-on in Author C's brief despite AC-28 applying to every NPC.

**Concrete change:** Freeze a machine-readable baseline from a named commit, with exact counting categories, de-duplication rules, and explicit per-NPC allocation. Clarify that this is the full delivery target, not a prerequisite for the first playable proof. Give Burek explicit species-appropriate story/complaint coverage. Assign registry integration, stable IDs, reachability tests from registered roots under representative flags, and a required branch/mission completion trace to each author batch. Have the tone judge sample complete playable arcs before increasing batch size; plan authoring throughput from that pilot rather than assuming four authors solve volume.

**M10. The conference mission is a good anchor but an unbounded first playable.**

**References:** PRD Flow G, AC-23-26, §9; ADR D-54; plan WS7, §6.

There is no bound on topics, rounds, crowd count, duration, or authored question combinations. Abort/reload behavior, reward idempotency, retries, and reuse of an already-occupied conference room are unspecified. "Existing systems" supply effect primitives, not this mission lifecycle. Pausing the game clock while expecting crowd walk-outs and gestures also needs a separate presentation-time update path. Moving question pools after dialogue pools as the risk register suggests leaves WS7's acceptance gate unresolved.

**Concrete change:** Specify an initial slice of one topic, two plants, three answer rounds, and a small capped audience, with two authored outcome tiers and a target play duration; grow variety afterward. Define unlock/entry/room-reservation rules, an authored offline score/reaction default, exit and reload semantics, and a persisted completion/reward marker preventing duplicate payouts. State that mission presentation animation continues while the economy clock and ordinary NPC scheduling pause. Require no-key, timeout, abort, reload, repeat-completion, and two contrasting answer-path tests. Make question-pool delivery a dependency, not optional late content.

### Minor

**N1. The validation and phase gates contain stale or conflicting descriptions.**

**References:** ADR §3.8, D-52, §9; plan §1/§4/§5.

"AC-18-of-v1" is a stale acceptance reference in an otherwise v2 document. The plan attributes the no-push mandate partly to PR-4, which ordinarily requires pushing; the actual exception is the later explicit local-only instruction. GLM code judges can be useful, but the plan cites PR-4.6 without reconciling its named independent QA runner requirement. Ordering commits before version bumps in the topology row also conflicts with a version bump in every commit.

**Concrete change:** Remove stale AC references, cite the explicit C-74/C-75 no-push override, document whether Lucas's ZCode/GLM instruction supersedes the named final QA runner or retain that final review, and use one consistent gate order: implement plus version bump, verify, independent judge, commit, visual phase review. Do not reopen already settled model choices implicitly.

**N2. Asset ownership does not yet demonstrate sound feedback.**

**References:** PRD AC-20; ADR D-53; plan WS6.

`src/audio/manifest.ts` is the manifest loader/types, not the sound asset registry itself. Adding IDs there alone does not create audible coffee/printer/whiteboard feedback; the loader explicitly tolerates missing entries by returning null.

**Concrete change:** Assign exact sound implementation/asset paths and the runtime manifest or procedural-sfx registration used by the game. Require an audible manual check plus a missing-asset assertion for the three interaction sounds; a passing prompt test cannot satisfy AC-20.

## 4. Direct answers

**(a) World-tick batching versus per-surface:** Use a hybrid: batch due ambient judgments every six **active simulation seconds**, trigger urgent event/greeting opportunities when they occur, and prioritize dialogue/mission input. Six *in-game* seconds is wrong for this clock. A 700 ms ambient deadline is a reasonable initial ceiling, not evidence of good feel; preserve the existing visible scheduler by preparing decisions ahead of due actions and immediately using fallback when no valid answer is ready. Compare end-to-end p50/p95, applied coverage, and stale/rejected rates on identical scenarios. Do not choose whole-world defaults from output-token pricing alone.

**(b) All-pairs relationships and Heider triads:** Keep the all-pairs representation; 105 NPC edges, plus 15 player edges if unified, are trivial in size and match Lucas's explicit requirement. Automatic triad-driven escalation is overbuilt for the first proof because its behavioral tuning is unresolved, not because 455 NPC triangles are expensive. First prove pair relationships and mood cause visible, understandable choices; calculate triads in shadow, then activate a capped trigger. Do not remove the social-model commitment or replace it with unrelated per-NPC scripts.

**(c) Invisible legacy fallback:** Sound for resilience and preservation of existing surfaces, but insufficient as integration evidence. It can perfectly conceal missing keys, universally rejected responses, unregistered wrappers, or stale-answer rejection. Keep it, add explicit authored defaults for new systems, and make applied-decision coverage and reason-coded fallbacks acceptance gates. A demo that looks normal while every request falls back has failed the feature even if it passes a smoke test.

**(d) Conference mission:** It is the strongest first playable concept, but currently too loosely bounded. Build the one-topic/two-plant/three-round slice in M10 early, with fake judgments and deterministic offline behavior, then attach calibrated scoring and expand content. Do not wait for all 10x content to test whether giving a speech is enjoyable.

**(e) File ownership:** No. There is a literal WS1/WS8 file overlap, nested test ownership overlap, unspecified call-site ownership, and a shared `main.ts` integration bottleneck. Parallel authors can be independent after schema and registry contracts land; the current mechanics streams need the serial integration owner and dependency corrections in B3.

**(f) Most worrying whole-feature failure:** A polished-looking office in which Jev rarely affects play, while the few applied answers occasionally use stale context or double-apply social/economy effects. Fallback makes the absence hard to notice, and synthetic fake-client tests do not establish live decision coverage. D-55/D-57 partially address visibility and calibration, but the design still needs coverage gates, reproducible decision identities, current-state revalidation, and exactly-once application. Those are PoC correctness requirements, not deferred production hardening.

I support D-45 selection-only and D-46's explicit pinned OpenRouter route. Neither needs reversal to fix these problems; silently switching providers would instead complicate calibration and diagnosis.

## 5. Missing entirely

- **A bounded action lifecycle and ownership protocol.** ADR D-53/D-54 and plan WS6/WS7 lack reservation, interruption, timeout, cancellation, and cleanup states. Add a small shared lifecycle contract, not a general-purpose activity engine, and specify who releases actors/props when scenes close or the agent takes control.
- **A mission/equipment persistence decision.** ADR D-51 lists social state, memory, and diary but no policy for equipment faults, mission progress, or reward claims. Specify which survive reload and which reset; persist the minimal state needed to prevent reward duplication and inconsistent blocked errands.
- **A multi-day playability evaluation.** PRD AC-15-19 and ADR §9 test isolated bounds but not relationship saturation, repetitive arguments, action starvation, or whether players can explain why NPCs reacted. Add a seeded multi-day scenario suite plus a short human playtest rubric for recognizable motivation and observed variety.
- **An adapter contract test distinct from fake-client tests.** ADR D-57 correctly decouples game tests from `fetch`, but no stream explicitly owns representative provider request/response fixtures, primitive normalization, and retry/deadline behavior at the adapter boundary. Add these to WS1, including partial/malformed responses and cancellation; no network is needed for these tests.
- **End-to-end performance budgets.** PRD §8 and ADR D-56 constrain network wait but not projection/candidate construction, JSON serialization, repeated synchronous save writes, or audience rendering. Add measured main-thread and frame-time acceptance checks on the existing reference scene, and coalesce applied batch effects before persistence/UI notification where practical.

The report changes no product decision. The proposed scope staging preserves the accepted final deliverables and identifies the smaller experiments needed before multiplying content and social behavior.
