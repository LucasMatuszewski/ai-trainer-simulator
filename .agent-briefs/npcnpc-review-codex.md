# NPC-NPC deep conversations: Codex review

Date: 2026-10-03

**Recommendation: revise before implementation.** Keep authored, bounded conversations and the measurement-first Jev policy. Resolve the branch schema, session lifecycle, relationship classification and evaluation contract first. Five levels alone will make the office more talkative; memory and observable consequences will make it feel alive.

This is a review, not approval to change the PRD or gameplay. Findings are based on the current checkout, including `world-tick.ts`, `office-chatter.ts`, `npc-controller.ts`, `dialogue-turn.ts`, the Jev companion PRD and ADR-0009. I also read the shared game epic and the existing Jev-steering and content-expansion issues. No game code changed; no browser playtest, test suite or live Jev evaluation was run for this review. Proposed pacing and evaluation numbers below are starting recommendations, not measured results.

## Findings by severity

### P1: The proposed schema does not specify the branches it promises

Plan lines 33-36 give each response one scalar `next` index, while line 46 promises 2-4 next options on a response. These are different selection surfaces: choosing B's response to A, or choosing A's continuation after B has already spoken. The distinction affects transcript context, effects and prefetch timing. A correct reply can still lead to a nonsensical next starter if the continuation is not paired to that exact reply.

**Required revision:** define stable script, node, reply and edge IDs; explicit speaker slots; eligible outgoing edges; an explicit eligible fallback; and terminal nodes. Choose a single branch representation. My recommendation is a node with one authored utterance and locally authored successor choices, each identifying the next speaker and utterance. This can still be presented to authors as paired starter/response exchanges. Each edge must answer or continue its actual parent utterance, never a topic-wide bag of unrelated lines. Define a level as one starter/response exchange and count the actual traversed path, not an array index.

Validate references, role bindings, reachable terminals and the 1-5 exchange bound. Use an acyclic graph for this first slice. An authored early END should stop playback; `maxLevels` is a ceiling, not an instruction to always fill it. No eligible continuation means a safe authored ending. Array reordering must not silently retarget branches or cached answers.

The useful precedent is `dialogue-turn.ts:288-300`: `repliesFor(optionId)` resolves the picked option's own replies and forbids cross-option recycling. Preserve that invariant through every NPC-NPC edge. Do not assume its variant filtering is reusable unchanged: that resolver returns explicit replies without applying their tags there.

### P1: World-tick is not an active-conversation scheduler

The plan understates the integration work:

- `world-tick.ts:171-180` caches a pair's starter and entire `ChatterExchange`, not a conversation cursor or continuation.
- `world-tick.ts:335-385` sends starter and exchange questions independently. Exchange candidate descriptions contain only the starter text, not its response candidates. Jev currently cannot judge the complete exchange or a follow-up path.
- `npc-controller.ts:1917-1925` deletes the conversation as soon as the one response fires and begins the 40-second pair cooldown. The response itself is picked locally from `exchange.responses` at `2004-2015`.
- The candidate provider is the controller's latest start-candidate list. Active actors are excluded at `1934-1947`; active conversations therefore need a separate continuation provider, not another pass over start candidates.

The existing 6-second request cadence and a 3.8-second utterance gap are not interchangeable. A branch that becomes decidable at one node can be due before the next tick. Calling and awaiting Jev at every level would violate Flow B's instant-trigger contract.

**Required revision:** add an explicit ambient session owned by the conversation manager: session ID/generation, bound actors and speaker slots, script/node IDs, transcript IDs, next utterance deadline, consumed decision IDs and accumulated effects. Supply due continuations separately to the decision scheduler. Keep rendering thin and transition logic pure.

Specify branch prefetch deadlines before implementation. Either predecide far enough ahead with proven deadline coverage, or document a deadline-aware extension to the ambient batching cadence. Batch independent due continuations, preserve the 700 ms ceiling, single-flight and no retries, and consume the safe fallback immediately when an answer misses its deadline. Do not batch later dependent branch choices as though their earlier selected path were already known.

Freshness must include session generation, node/parent-response identity, actor availability, candidate-set version and eligibility-relevant context. The current chatter memo checks mainly day and pool identity (`619-686`); that is insufficient once choices move relationships or set flags. A late answer for node 2 must never steer node 3, another conversation by the same pair, or a loaded save. Keep per-subject failure isolation and exactly-once effects from Flow B and ADR D-49/D-58.

### P1: The pilot classes contradict the actual relationship seeds

The schema mixes relationship and role in `friends | enemies | neutral | coworkers`. Every human pair is coworkers; friendship and hostility change during play. Approximately eight authoring families is reasonable, but these must not be eight mutually exclusive, permanently assigned social identities.

There is an immediate pilot problem:

| Proposed pilot | Current seed | Actual `social.band()` |
|---|---:|---|
| Klaudia + Zosia, labeled friends | 55 | neutral |
| Marek + Grazyna, labeled enemies | 50 | neutral |
| Paweł + Kasia, labeled neutral | 55 | neutral |

Sources: `npc-profiles.ts:140`, `293`, `197`; `social.ts:315-319` uses hostile below 35 and warm above 65. All three pilots begin neutral. Do not change established seeds just to make a showcase pass. Use existing compatible warm pairs, neutral pairs and deliberately labeled hostile test states, or separately approve a seed change. Note that ADR D-50 describes inclusive boundaries differently from the implementation; the plan must select one canonical band definition rather than introducing a third.

**Required revision:** separate role/voice compatibility, current relationship band and topic/context eligibility. Resolve speaker slots before selecting a script. Pool selection can layer a few pair-specific scenes over role-family scenes over genuinely generic office talk. This avoids authoring 105 separate trees while retaining character identity.

Also correct plan line 22: pair proximity/cooldown filtering lives in `chatter.ts` and the controller; chattiness weights choose the starter, not the pair. With live world-tick installed, `hookPickChatterPair` returns the first current pair with a fresh memo (`619-644`), so preserving equitable pair rotation requires explicit arbitration rather than assuming the old random picker still owns it.

Read live relationship state in the first pilot. `main.ts:293-295` currently returns empty relationship bands. Postponing this until step 2 means step 1 cannot demonstrate its advertised relationship-driven behavior.

### P1: The 80% gate is too weak and measures the wrong baseline

Keeping a gate is correct. "Above 80%, two iterations" is not enough to establish semantic benefit or safe activation.

`scripts/jev-eval.mjs:44-141` contains five Tomek player-reply cases, including accepted-answer sets. At that size accuracy changes in 20-point jumps. Its `judge()` builds its own payload (`146-188`), and the file contains no NPC-NPC branch cases. It does not yet compare the production branch builder, deterministic baseline, batched context, deadline coverage or whole-conversation traces. Repeated prompt tuning on those same examples would train the evaluation, not validate generalization.

**Required revision:** evaluate the same question/projection construction and adapter used by gameplay. Split tuning cases from held-out authored situations, and hold out scripts or pairs rather than paraphrases of the same scenario. Compare Jev against both authored fallback and simple contextual rules over the identical eligible candidates. Accept multiple good branches for preference cases; do not manufacture one objectively correct punchline.

Use separate gates:

- **Hard correctness:** all branches remain parent-compatible, eligible and within bounds, regardless of the model. Invalid, missing, stale or late answers fall back. Safety comes from code and content validation.
- **Cosmetic choice:** 80% may be a provisional floor, but activation also needs a credible improvement over the rules baseline. If relationship tags or event flags already settle the choice, use code. If several alternatives are equally good, seeded variation may be sufficient.
- **Consequential choice:** a branch that changes relationships, unlocks tasks or contributes to an argument cannot inherit the current cosmetic chatter threshold of 0.3 (`world-tick.ts:86-87`). Label it separately, measure accepted-prediction error and abstention coverage, and require a stronger gate. I would start with at least 95% acceptable consequential selections on held-out cases, with reported uncertainty, before considering live activation.

For the pilot, start with at least 100 distinct held-out situations distributed across the three social bands, speaker-role orientations, periods/places, events, memory and interruption states. Report slices, sample counts, whole-trace coherence, p50/p95 latency, deadline misses and fallback reasons. Compare production batching against isolated judgments. Repeated runs reveal instability but are not additional independent labeled cases. Pin provider, resolved model, prompt, schema and content version; changed inputs invalidate the corresponding calibration. Prove one non-default branch in the real browser/provider path under PR-14; unit fakes do not establish live activation.

At a hypothetical independent 80% correctness per decision, a path with four branch decisions is entirely correct only about 41% of the time. This is illustrative, not a measured Jev result, but it shows why per-choice accuracy alone cannot be the deep-conversation gate.

### P2: Reuse a pool of bounded scenes, not the player's turn builder

Authored micrographs are a good fit for local causal continuity. A single long fixed tree for all office conversation would repeat the C-77 problem. A flat global pool would repeat the mismatched-reply problem. Use a context-filtered **pool of short, internally connected conversation scenes**, with memory-aware scene selection and local continuation only inside the selected scene.

That is compatible with Flow A2's intent: content expansion is data-driven and exhaustion does not loop. It is an explicit ambient specialization, not literal reuse of `NpcDialoguePool` merely because `npcId` accepts a string. That schema models player options, player stats and player-NPC relationships (`dialogue-schema.ts:76-113`, `154-162`; `dialogue-turn.ts:58-64`, `107-113`). Ambient sessions need two NPC identities and the pair relationship. Share tag/reference validation and paired-candidate conventions, not player-specific context or option UI semantics.

Define the replacement boundary for existing Jev surfaces. A failed NPC-NPC branch gate should disable that new surface, not silently remove already implemented greeting, destination or exchange steering. The plan's table also needs to distinguish player reply pairing from variant selection: actual `dialogue-wrapper.ts:258-266` currently steers curation only and always returns `replyId: null`.

One concrete topic trap: `eligibleExchangesForPair()` intersects both speakers' topic affinities (`world-tick.ts:196-207`), whereas legacy `pickExchange()` restricts only the starter (`chatter.ts:202-216`). Janusz alone has `janitor`; this intersection removes all of his janitor-topic exchanges with human listeners. The Paweł/Kasia pilot similarly loses both IT and sales-specific choices. For the new model, validate each utterance's speaker role separately. A recruiter can answer a developer's complaint without becoming a developer, and Janusz can explain his robots to an accountant.

### P2: Depth changes occupancy and repetition, not just line count

At 3.8 seconds between utterances, five exchanges mean ten bubbles and about 34.2 seconds from first to last utterance, before the final reading dwell. At this game's scale that is about 34 in-game minutes. The controller already stops actors while chatting (`1523-1532`, `1638`); the question is how long and under what priority, not whether to introduce freezing.

Keeping starts every 6-12 seconds while multiplying duration will fill the two-conversation ceiling and hold the same rooms busy. Two scripts per class will repeat quickly even with branch variation. Extend memory beyond the existing 40-second pair cooldown and the legacy picker's global last-exchange suppression (`chatter.ts:192-225`). Store pair/script/topic history and notable outcomes, with bounded saveable records and deliberate reset rules. Do not mark an unheard ending as completed after interruption.

As a playtest starting point, aim for roughly 70% one-exchange chats, 25% two/three-exchange chats and 5% four/five-exchange scenes, modulated by work versus Lunch. Measure room occupancy, maximum continuous actor reservation, repeated opening lines and the player's ability to follow the conversation. Keep the existing two-pair, different-room constraint; do not raise frequency to compensate for insufficient content. Short lines remain essential: `office-chatter.ts:23-28` and its tests constrain legacy lines to 60 characters.

### P2: Effects and interruption semantics need a decision now

One bounded aggregate social transaction per conversation is preferable to five independent +/-5 deltas: otherwise chatty pairs change much faster simply because their scenes are longer. Mostly neutral small talk should remain neutral; warmth should not automatically compound into universal friendship, and hostility should not force every encounter into an argument.

Accumulate effects only for utterances actually delivered, then settle that aggregate exactly once on completion or interruption. If an insult was already spoken, player interruption should not erase its consequence. A task offer or action should commit at its authored accepted beat, not speculatively at scene selection. Handle its flag/action idempotently through existing systems. Witness effects require actual local presence, not every NPC in a batch. Retain the PRD's two-arguments-per-day ceiling, cooldown and nightly regression.

Give player dialogue, scheduled events, departure and equipment ownership explicit priority over ambient sessions. Release actors and rooms on every cancellation path. A passing implementation should demonstrate valid short/long terminal paths, context changes, no eligible branch, player interruption, period/day transitions, load/reset, stale answers and duplicate completion without duplicate effects. Keep coffee-needs wiring in its existing purposeful-action scope unless a conversation specifically triggers it; it is not a dependency of the branch schema.

## Game direction

An office feels alive when people have something to do, something they want and a reason to remember each other. Much of `OFFICE_CHATTER` is already good sitcom material: "Who broke the build? Again!", "Can you review my PR?", and "The printer is jammed again." The weakness is that these are largely interchangeable punchlines with little connection to an actual build incident, promised review or equipment fault. Appending four more jokes does not supply that connection.

Keep everyday talk brief and grounded in what is happening: work coordination, coffee, small successes, mundane irritation, assistance and occasional vulnerability. Save deeper scenes for a specific motive: a favor owed, an unresolved dispute, a birthday, a failed deploy or a colleague covering for someone. Friends can disagree; rivals can cooperate. Let a practical dependency produce awkward civility rather than making relationship bands dictate identical emotional endings.

The player should be able to catch a scene halfway through, understand the current exchange and decide whether to listen, interrupt or pursue it later. Use local facing, a pause in work, a glance or a return to a task to communicate attention. Important scenes can afford longer timing; ordinary desk chatter should not become a blocking cutscene. An optional recent-overheard transcript can support reading, but only record what the player could actually hear or observe. The world may remember an off-screen conversation without granting the player knowledge of it.

Ambient and player conversations should share facts and outcomes, not automatically share every line or mark the player's reply pool exhausted. Overhearing a concern can unlock a new player topic; privately helping a colleague can change their next exchange with somebody else. Keep pair history separate from player-NPC history, and track player knowledge explicitly. An ambient reveal should not silently complete a quest or spoil a personal arc the player has not reached.

## Top 3 suggestions for making NPC-NPC talk feel alive

1. **Make one incident travel through the office with visible consequences.** Use the existing printer fault as the pilot: Renata complains, Janusz explains the robot workaround, Grazyna challenges the toner expense. If the player fixes it, later exchanges refer to the fix; if not, frustration escalates within the drama budget. This supplies topic variety, role-specific voices and player relevance from one shared state change.
2. **Give pairs unfinished business across days.** A borrowed mug, promised PR review or expense dispute gets an opening, a remembered outcome and a later callback. A friend can refuse a favor; a rival can reluctantly help. Persist a small structured pair-topic record, suppress the same opening for a chosen cooldown, and let player dialogue address the outcome without consuming that dialogue's own option memory.
3. **Use depth selectively and let the player disturb it naturally.** Most chats are quick; rare motivated scenes reach four/five levels. Actors face each other, react, then return to work. Player interruption wins immediately, commits only already-delivered consequences and can unlock "What were you two discussing?" afterward. Tune for readable bubbles and alternating pairs, not continuous chatter.

PLAN: REVISE — specify paired branch graphs and ambient session/prefetch lifecycle, separate role classes from live relationship bands, correct the pilot seeds, and replace the aggregate 80% gate with production-path, baseline-compared evaluation per surface.
