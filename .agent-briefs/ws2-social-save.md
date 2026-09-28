You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Everything you need is in this brief. Write your result to `.agent-briefs/ws2-result.md`.

# Task: WS2 — Social model (pure core) and save schema v2 with a migration chain (Wave 1)

Branch `feat/jev-npc-decision-steering` (base commit `d85da34`). Read first: `docs/ADR/0009-jev-npc-decision-steering.md` §4 (all data structures), §7 D-50/D-51, and `docs/PRD-jev-npc-steering.md` §6 AC-15…AC-19b. Also read `src/game/state.ts`, `src/game/initial.ts`, `src/types.ts`, `src/content/dialogue-memory.ts`, and `src/content/npcs.ts` (the `NpcId` roster — 15 ids incl. burek the dog).

## Build (pure core first, reducer glue described as patches)

1. **`src/game/social.ts`** (new, pure, no imports from engine/ui) —
   - Types: `SocialPairKey` (sorted id pair, NPC↔NPC only), `Mood {valence: -100..100, energy: 0..100}`, `NpcNeeds {caffeine, social}` (0–100).
   - `RelationshipMatrix`: `Record<string, number>` keyed `"<a>|<b>"` (a<b by id); `pairKey(a,b)` normalizes; 105 pairs for the 15-NPC roster.
   - **Reaction buckets**: `type ReactionBucket = "offended" | "annoyed" | "neutral" | "pleased" | "delighted"` and a mapping table bucket → `{relDelta, moodDelta}` (delighted +5, pleased +2, neutral 0, annoyed −2, offended −5) scaled by agreeableness (author the exact scaling: e.g. agreeableness <30 ⇒ hostile buckets ×1.5, >70 ⇒ warm buckets ×1.2, clamped ±5) — document the formula in code.
   - `applyReaction(matrix, pair, bucket, opts)` → new matrix (immutable), clamped 0–100, ONE aggregated transaction.
   - **Stability rules (D-50)**: `regressNightly(matrix, seeds, rate=0.1)` pulls each pair 10% toward its archetype seed; `decayMood(mood, baseline, dt)` bounded exponential; `decayNeeds(needs, dt)`; deadband helpers `band(value)` → "hostile"(<35)/"neutral"(35–65)/"warm"(>65); `detectImbalancedTriads(matrix)` returning triads with tension scores (shadow-only fact — no events).
   - **Witness deltas capped at ±2**; helper `applyWitnessDelta`.
2. **`src/content/npc-profiles.ts`** (new, authored data) — for each of the 15 NpcIds: OCEAN traits 0–100 (extraversion, agreeableness, conscientiousness, neuroticism, openness — consistent with existing characterizations in `npcs.ts`/dialogues: e.g. Zosia high extraversion, Renata high conscientiousness, burek fixed simple profile), `moodBaseline {valence, energy}`, and `archetypeSeeds` for plausible NPC↔NPC pairs (manager↔assistant warm +20, sales↔engineering −15, janitor↔everyone neutral-to-warm, etc. — you author a coherent seed table; unspecified pairs default 50). Export `SOCIAL_PROFILES_VERSION = 1`.
3. **`src/game/migrate.ts`** (new) — `migrate(raw: unknown): GameState` migration CHAIN: v1 → v2. v2 adds `social: { relationships (105-pair matrix), mood: Record<NpcId, Mood>, profilesVersion }`, `npcMemory` (moved from the runtime module, Sets serialized as **sorted arrays**), `worldDiary: string[]` capped 30, `equipment: Record<string, "ok" | "faulted">`, `missionCompletions: string[]`. Migration must: seed only missing pairs from archetype seeds (preserve existing `npcRelationships` values as the player-map authority — matrix is NPC↔NPC only), write the untouched v1 blob to backup key `aitrainer:save:v1:backup` before the first v2 save (export the helper; the orchestrator wires it into the save path), lazy-fill missing pairs on load, re-seed on `profilesVersion` bump only pairs never touched (mark touched pairs in `social.touched?: string[]`), and treat malformed/future saves defensively (return a fresh v2 game, never throw).
4. **`src/content/dialogue-memory.ts`** — add serialization helpers at the API boundary: `serializeMemory(memory): NpcMemoryDto` and `deserializeMemory(dto): NpcMemory` (Sets ↔ sorted arrays), plus `clearMemory(npcId?)`. Keep the existing runtime API intact.
5. **Reducer/state patches (SUBMIT AS PATCHES, do not edit)** — `src/game/state.ts`, `src/types.ts`, `src/game/initial.ts` need: `saveVersion: 2`, new `GameState.social` fields + reducer actions `apply-social-reaction {pair|npc, bucket, witnessOf?}`, `regress-social-nightly`, `shift-mood {npc, delta}`, `append-diary {entry}`, `set-equipment-fault {id, faulted}`. Write the EXACT proposed diffs (unified or precise before/after) into your report under "Proposed shared-file patches". Make sure your pure functions compile against the CURRENT types meanwhile (define local structural types where needed).
6. **`tests/unit/game/social-stability.test.ts`** — the 30-day simulation: random ± buckets each day, nightly regression, assert after 30 in-game days the matrix distribution stays off the 0/100 clamps (e.g. no pair pinned at extremes for the whole run) and returns near seeds; plus a determinism test (same seed ⇒ same matrix).

## Tests (TDD red→green; mutation-check before reporting done)

- `tests/unit/game/social-model.test.ts`: pairKey normalization; clamp bounds; bucket mapping + agreeableness scaling edges; witness cap; deadband bands; triad detection on a hand-built imbalanced triangle.
- `tests/unit/game/migrate.test.ts`: v1 fixture (build a realistic v1 save object incl. `pickedOptions` with Set-converted arrays after serialization, flags, cash) → migrate → assert social defaults seeded, npcRelationships PRESERVED exactly, memory round-trips; migrate(migrated) idempotent; malformed input → fresh v2; future version → fresh v2; missing pair lazy-fills.
- `tests/unit/content/npc-profiles.test.ts`: every NpcId has a profile (incl. burek), traits in 0–100, version constant.
- Data-shape tests per PR-11 for the seed table (deterministic, no NaN).

## Constraints

- Allowed files: `src/game/social.ts`, `src/game/migrate.ts`, `src/content/npc-profiles.ts`, `src/content/dialogue-memory.ts`, `tests/unit/game/social-*.test.ts`, `tests/unit/game/migrate.test.ts`, `tests/unit/content/npc-profiles.test.ts`. NOTHING else. Shared-file patches are submitted in the report, NOT applied.
- Do not bump `src/version.ts`. Full `pnpm typecheck` + `pnpm test` must exit 0 (your new code must compile against current types without touching shared files).

## Definition of done

Report at `.agent-briefs/ws2-result.md`: changed files, red→green evidence, vitest summary lines, the exact proposed shared-file patches (state.ts/types.ts/initial.ts + main.ts save-path backup wiring), any deviations. Disagreement invited on the scaling formula and seed table — explain your choices.
