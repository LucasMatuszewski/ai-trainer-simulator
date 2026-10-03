You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Everything you need is in this brief. Write your result to `.agent-briefs/ws3-result.md`.

# Task: WS3 — Dialogue architecture v2 (the conversation turn builder + steering + first content)

Branch `feat/jev-npc-decision-steering`. Read first: `docs/PRD-jev-npc-steering.md` **Flow A2** (the architecture you are building), `docs/CHANGELOG.md` **C-77**, and the existing seams: `src/jev/contracts.ts` (DecisionClient + DecisionHooks), `src/jev/greeting-wrapper.ts` (the wrapper pattern to follow: prefetch → store → install → instant hook, honest logging), `src/ui/dialogue.ts`, `src/main.ts` (`openDialogueWith` around line 1135), `src/content/dialogues.ts`, `src/content/npc-content/registry.ts` (WS0 registry), `src/content/dialogue-memory.ts`, and `src/game/social.ts` (relationship bands).

## The problem (Lucas, C-77)

Today each NPC has ONE static tree of 3-6 options; when exhausted, the dialogue loops the same lines ("same stupid interaction") — not immersive. Build the architecture so depth comes from **pools × selection × context**, and future content is pure data.

## Build

1. **`src/content/dialogue-schema.ts`** (new, typed): the v2 pool model —
   `DialogueTopic { id, label, optionCandidates: OptionCandidate[], replyCandidates: ReplyCandidate[], minRelationship?, maxRelationship?, requiresFlags?, blockedByFlags?, periods? }`;
   `OptionCandidate { id, text, topicId, tags? }` (what the player says);
   `ReplyCandidate { id, text, tags?, offersTaskId?, relationshipHint? (bucket name from the social model) }` (what the NPC answers);
   `TaskOffer { id, title, description, flagToSet, rewardHint? }` — a task offer sets an EXISTING flag via the standard effect path (funny lore-grounded tasks: Burek duty, coffee emergency for Klaudia, Janusz robot maintenance, Tomek push-to-main aftermath, sticker on the monitor...). Tag conventions: `relationship:warm|neutral|hostile`, `stats:low-caffeine|high-credibility|...`, `period:morning|...`, `event:<flag>`, `quest:<flag>`.
2. **`src/content/npc-content/` pools** (data, schema-validated): authored pools for **bartek, renata, klaudia, marek** + one **generic** pool any NPC falls back on. Per NPC: 4 topics × (6-8 option candidates + 6-8 reply candidates) + 1-2 task offers. Irony/lore must match existing characterization (read `src/content/npcs.ts` + `dialogues.ts` tone). Register via the WS0 registry. This is the "more dialogues" start — the architecture must make later authoring pure-data.
3. **`src/game/dialogue-turn.ts`** (new, PURE, fully TDD): the turn builder —
   `buildTurn(state, npcId, memory, topicStates) => { options: OptionCandidate[≤4], replyCandidates: ReplyCandidate[], topicId }`:
   - hard-filter by context tags (relationship band via `GameState.npcRelationships`, flags, period), exclude already-used candidate ids (memory),
   - **pivot on exhaustion:** if the current topic has < 2 unused options, switch to the richest eligible topic; if NOTHING is left, return the always-available exit set ("Wrap it up" + generic small talk that is NOT memory-suppressed),
   - never loops the same 4 options: used ids are consumed for the session.
   `pickReply(candidates, context) => ReplyCandidate` is Jev's job at runtime, but the pure module provides the deterministic fallback order (first-unused by priority).
4. **`src/jev/dialogue-wrapper.ts`** (new) — two steered surfaces, following the greeting-wrapper pattern:
   - **option curation:** given the turn's eligible option candidates, one Score question per option (relevance to current state) → top-4 (authored priority as tie-break). Live per D-60 (cosmetic).
   - **reply selection + reaction:** one Choice over the reply candidates (fits the situation) + the social reaction is CODE-mapped from the reply's `relationshipHint` (author-tagged; NO numeric deltas from the model). Consequential → conservative threshold, fallback = first-unused candidate.
   Both: session memo keyed by (npcId, topicId, used-set hash), fallback = pure builder output, decision-log entries, `?jev=off|shadow` honored via the same options the greeting wrapper takes.
5. **Integration patches (SUBMIT, do not apply — orchestrator-owned files):**
   - `src/ui/dialogue.ts`: replace the static node render with the turn builder flow — options come from `buildTurn`, the NPC reply comes from the wrapper's stored answer (instant), "already heard" from dialogue memory, task offers render as a highlighted option that sets its flag on pick.
   - `src/main.ts`: construct + install the dialogue wrapper alongside the greeting wrapper (same `?jev` mode handling); `openDialogueWith` starts a v2 conversation when the NPC has registered pools, else falls back to the legacy tree (both paths must work).
   Keep the legacy tree path fully functional for NPCs without pools (grazyna, maciek... keep their existing trees working).
6. **Tests (TDD red→green, mutation-check):**
   - `tests/unit/game/dialogue-turn.test.ts`: filtering by band/flags/period; ≤4 curation fallback order; pivot when < 2 unused; exhaustion → exit set; no option ever repeats within a session; task offer gating by flags.
   - `tests/unit/jev/dialogue-wrapper.test.ts` (fake client): steered curation applies; fallback on timeout/error/low-confidence; shadow logs `shadow` outcome and never installs; live-path proof (non-default answers get applied — counters prove applied > 0).
   - `tests/unit/content/npc-dialogue-pools.test.ts`: schema validity for every pool; every candidate id unique; task flags exist in the game's flag vocabulary (spot-check the known ones); tone spot-assertions (non-empty, length bounds).
   - jsdom test for the patched dialogue UI flow is NOT yours (main.ts/dialogue.ts are orchestrator files) — instead export pure helpers the orchestrator's patch will call, and test those.

## Constraints

- Allowed files: `src/content/dialogue-schema.ts`, `src/content/npc-content/*.ts` (pool files), `src/game/dialogue-turn.ts`, `src/jev/dialogue-wrapper.ts`, `tests/unit/game/dialogue-turn.test.ts`, `tests/unit/jev/dialogue-wrapper.test.ts`, `tests/unit/content/npc-dialogue-pools.test.ts`. NOTHING else. `dialogue.ts`, `main.ts`, `types.ts`, `state.ts` patches go in the report as exact proposed diffs.
- All lines authored. Jev selects; it never writes text. No new npm dependencies.
- `pnpm typecheck` + `pnpm test` green at the end. Do not bump `src/version.ts`.

## Definition of done

Report at `.agent-briefs/ws3-result.md`: changed files, red→green evidence, vitest summary, proposed shared-file patches (exact), pool content summary (topics/tasks per NPC), deviations. Disagreement invited on the tag vocabulary and pivot policy — explain choices.
