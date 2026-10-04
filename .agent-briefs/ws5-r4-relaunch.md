You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Write your result to `.agent-briefs/ws5-r4-relaunch-result.md`.

# Task: WS5-r4 RELAUNCH — add ~2500 distinct strings to the v2 dialogue pools (batch 4 of 5 toward 10x)

Branch `feat/jev-npc-decision-steering` (HEAD `543154b`). Batches 1-3 delivered 4641 distinct v2-pool strings; total 5749 vs the 1069 baseline = 4.34x. A previous r4 worker died mid-batch (quota) and left a partial test at `.agent-briefs/ws5-partial/ws5-r4-test.ts` — read it as your seed, but the POOL files at HEAD are the committed batch-3 state (your starting point; the partial test's expectations may not match — adapt them).

## Read first
- `src/content/dialogue-schema.ts` — validatePool + C-78 pairing contract: per-topic `optionCandidates.length === replyCandidates.length`, positionally paired.
- `tests/unit/content/dialogue-pools-ws5-r3.test.ts` — the r3 validation suite to mirror.
- Existing pools — quality bar. Round 1-3 themes per NPC are TAKEN: add new themes only.

## What to add
- **+2 new topics per roster NPC** (6 paired options + 6 paired replies each), **+1 for generic** (6+6).
- Tag variety: relationship bands (cold <20, hostile 20-34, neutral 35-65, warm >65), periods, stats, quest/event flags from the known vocabulary (see the ws5-r3 suite).
- Quality: ironic IT-office voice per NPC, lore-consistent, no repeats of rounds 1-3 themes, no flagged tokens (/lorem|todo|placeholder|xxx/i), reply <= 380 chars, option 3-100.

## Tests
- `tests/unit/content/dialogue-pools-ws5-r4.test.ts`: schema validity for all pools; per-topic alignment; global id uniqueness vs rounds 1-3; flagged-token gate; per-NPC new-string floors (>= 150 roster, >= 75 generic); run `node scripts/content-volume.mjs` at the end (restore volume-baseline.json via git checkout afterward) and report the new v2PoolStrings total (target >= 6900).

## Constraints
- Allowed: the 16 existing dialogue-pool-*.ts + the one new test file. NOTHING else. No engine/jev/ui/main. No version bump.
- `pnpm typecheck` + full `pnpm test` green (1247+ baseline).

## Definition of done
Report at `.agent-briefs/ws5-r4-relaunch-result.md`: per-NPC topics, counts, validation evidence, the volume total, deviations.
