You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Write your result to `.agent-briefs/ws5-r3-result.md`.

# Task: WS5 round 3 — add ~2500 more distinct strings to the v2 dialogue pools (sacs-xtma.14, target 10x)

Branch `feat/jev-npc-decision-steering` (HEAD `387009d`). Round 1+2 delivered 2109 distinct v2-pool strings; the total is 3178 against a 1069 baseline = ~3x. **Your batch: +2500 distinct strings**, roughly +165 per roster NPC (15 pools incl. generic).

## Read first

- `src/content/dialogue-schema.ts` — validatePool + the C-78 pairing contract: within each topic, `optionCandidates` and `replyCandidates` are EQUAL length and POSITIONALLY paired (option i answered by reply i). The alignment invariant test enforces per-topic equality.
- `tests/unit/content/dialogue-pools-ws5-r2.test.ts` — round-2 validation tests (copy the approach).
- `scripts/content-volume.mjs` — the counter (v2PoolStrings category; run it at the end to report your delta).
- Existing pools in `src/content/npc-content/dialogue-pool-*.ts` — the quality bar.

## What to add (ADD to existing pool files, never delete round 1-2 content)

For each of the 15 pools (generic +1 topic, roster NPCs +2 topics each):
- **+2 new topics per roster NPC** (6 paired options + 6 paired replies each — equal counts, aligned), **+1 topic for generic** (6+6),
- tag variety: relationship bands (`cold` <20, `hostile` 20-34, `neutral` 35-65, `warm` >65), periods, stats, quest/event flags from the known vocabulary,
- new topics must NOT duplicate round 1-2 themes (check the existing topic labels per NPC first).

## Quality rules (enforced by the existing tests + your new ones)

- Ironic IT-office voice, lore-consistent per NPC. No filler. No repeated joke shapes. Reply length <= 380 chars. Option texts 3-100.
- No flagged tokens: text must not match /lorem|todo|placeholder|xxx/i (the quality gate regex — reword in-voice if a joke needs one).
- Per-topic option/reply count equality MUST hold (alignment invariant).

## Tests

- `tests/unit/content/dialogue-pools-ws5-r3.test.ts`: all pools validate; per-topic alignment; no id collisions with rounds 1-2; no flagged tokens; per-NPC new-string counts (>= 150 per roster NPC, >= 75 generic — report exact counts).
- Run `node scripts/content-volume.mjs` at the end (it overwrites the baseline — `git checkout tests/unit/content/volume-baseline.json` afterward to restore the frozen file) and report the new v2PoolStrings total in your result.

## Constraints

- Allowed files: the 16 existing `dialogue-pool-*.ts` files + `tests/unit/content/dialogue-pools-ws5-r3.test.ts`. NOTHING else. No engine/jev/ui/main changes. No version bump.
- `pnpm typecheck` + full `pnpm test` green when you finish.

## Definition of done

Report at `.agent-briefs/ws5-r3-result.md`: per-NPC topic summary, counts, the new v2PoolStrings total, validation evidence, deviations.
