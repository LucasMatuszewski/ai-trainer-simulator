You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Write your result to `.agent-briefs/ws5-r4-result.md`.

# Task: WS5 round 4 — add ~2500 more distinct strings to the v2 dialogue pools (sacs-xtma.14, batch 4 of 5)

Branch `feat/jev-npc-decision-steering` (HEAD `69b95eb`). Batches 1-3 delivered 4641 distinct v2-pool strings; total ~5749 vs the 1069 baseline = 4.34x. **Your batch: +2500 distinct strings**, ~165 per roster NPC (15 pools incl. generic).

## Read first

- `src/content/dialogue-schema.ts` — validatePool + C-78 pairing contract: within each topic, `optionCandidates` and `replyCandidates` are EQUAL length and POSITIONALLY paired (option i answered by reply i).
- `tests/unit/content/dialogue-pools-ws5-r3.test.ts` — the r3 validation suite (copy the approach).
- The existing pools — the quality bar. Round 1-3 themes are taken: check each NPC's existing topic labels and add NEW themes only.

## What to add (ADD to existing pool files, never delete prior content)

- **+2 new topics per roster NPC** (6 paired options + 6 paired replies each), **+1 topic for generic** (6+6),
- tag variety: relationship bands (cold <20, hostile 20-34, neutral 35-65, warm >65), periods, stats, quest/event flags from the known vocabulary,
- new themes must not duplicate rounds 1-3 labels per NPC.

## Quality rules

- Ironic IT-office voice, lore-consistent. No filler. No repeated joke shapes. Reply <= 380 chars. Option 3-100. No text matching /lorem|todo|placeholder|xxx/i.
- Per-topic option/reply count equality (alignment invariant).

## Tests

- `tests/unit/content/dialogue-pools-ws5-r4.test.ts`: all pools validate; per-topic alignment; global id uniqueness vs rounds 1-3; flagged-token gate; per-NPC volume floors (>= 150 per roster NPC, >= 75 generic — exact counts reported).
- Run `node scripts/content-volume.mjs` at the end (it overwrites the baseline — `git checkout tests/unit/content/volume-baseline.json` afterward) and report the new v2PoolStrings total.

## Constraints

- Allowed files: the 16 existing `dialogue-pool-*.ts` + `tests/unit/content/dialogue-pools-ws5-r4.test.ts`. NOTHING else. No engine/jev/ui/main. No version bump.
- `pnpm typecheck` + full `pnpm test` green.

## Definition of done

Report at `.agent-briefs/ws5-r4-result.md`: per-NPC topics, counts, the new v2PoolStrings total, validation evidence, deviations.
