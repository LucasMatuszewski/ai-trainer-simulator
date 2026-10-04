You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Write your result to `.agent-briefs/ws5-r5-result.md`.

# Task: WS5 round 5 — the closing batch: push the v2 pools to the 10x target (sacs-xtma.14)

Branch `feat/jev-npc-decision-steering` (HEAD `8eb0b15`). Batches 1-4 delivered 7370 distinct v2-pool strings; total ~8439 vs the 1069 baseline = **7.9x**. **Your batch: +2500-3000 distinct strings to cross 10x** (target: total v2PoolStrings >= 10690 distinct).

## Read first
- `src/content/dialogue-schema.ts` — validatePool + C-78 pairing contract (per-topic option/reply count equality, positional pairing).
- `tests/unit/content/dialogue-pools-ws5-r4.test.ts` — the r4 validation suite (mirror it).
- Existing pools — quality bar + the per-NPC topic labels already TAKEN (no duplicates).

## What to add
- **+2 new topics per roster NPC** (6 paired option/reply pairs each), **+1 for generic** (6+6) — same as r4.
- Tag variety across bands/periods/stats/flags. Theme-fresh per NPC (no label duplicates).
- Quality: ironic IT-office voice per NPC, lore-consistent, no flagged tokens, reply <= 380 chars, option 3-100.

## Tests
- `tests/unit/content/dialogue-pools-ws5-r5.test.ts`: schema validity; alignment; global uniqueness vs rounds 1-4; flagged-token gate; per-NPC volume floors; the batch total (>= 2400 new distinct strings); the 10x milestone assertion (total v2PoolStrings >= 8000 distinct after this batch, per the volume counter's v2PoolStrings category).

## Constraints
- Allowed: the 16 existing dialogue-pool-*.ts + the one new test file. NOTHING else. No engine/jev/ui/main. No version bump.
- `pnpm typecheck` + full `pnpm test` green (1263+ baseline).

## Definition of done
Report at `.agent-briefs/ws5-r5-result.md`: per-NPC topics, counts, validation evidence, the new v2PoolStrings total, deviations.
