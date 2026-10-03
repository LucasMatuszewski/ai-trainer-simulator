You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Everything you need is in this brief. Write your result to `.agent-briefs/ws5-r2-result.md`.

# Task: WS5 relaunch round 2 — extend the v2 dialogue pools toward the 10x volume target (sacs-xtma.14)

Branch `feat/jev-npc-decision-steering` (HEAD `a267117` or later). A previous author completed round 1: pools exist for ALL 15 NPCs in `src/content/npc-content/dialogue-pool-*.ts` (bartek, renata, klaudia, marek + zosia, pawel, kasia, tomek, ania, janusz, grazyna, maciek, przemek, dawid, burek + generic), currently 1715 distinct strings = **1.6x** the frozen baseline (1069). **Your job: grow the pools toward the 10x target by ADDING content to the EXISTING pool files** — new topics, new option/reply candidates, new task offers — never by deleting or rewriting what validates today.

Read first: `src/content/dialogue-schema.ts` (validatePool + the C-78 pairing contract: topic-level `replyCandidates` are POSITIONALLY PAIRED to `optionCandidates` — option i is answered by reply i; keep counts EQUAL per topic), `src/game/dialogue-turn.ts` (how pools are consumed: tagsEligible filters by relationship band `cold/hostile/neutral/warm`, stats, period, flags), the existing pools (quality bar), and `src/content/npc-profiles.ts` (personality sources of truth).

## Your batch (ADD to every existing pool file, preserving all current content):

For EACH of the 15 NPC pools (generic included):
- **+2 new topics per major NPC** (14 roster NPCs) / **+1 for generic**, each with 6 paired option/reply candidates (6 options, 6 positionally-matched replies — equal counts, aligned pairs),
- **+1 new task offer** for 8 roster NPCs of your choice (existing-flag rule: `<npcId>-<kebab>` new flags allowed, matching the PRD Flow A2 note),
- tone: ironic IT-office voice, lore-consistent (Tomek pastes/hotfixes, Janusz robots, Klaudia LinkedIn, Marek 10x, Burek, "prod is on fire", the jamming printer, DavID bats, Grazyna candles),
- new candidates must carry tags where natural: `relationship:cold|hostile|neutral|warm` (band thresholds: cold <20, hostile 20-34, neutral 35-65, warm >65 per `src/game/social.ts`), `period:`, `stats:low-caffeine|high-credibility|...`, `quest:<flag>`, `event:<flag>` — so the turn builder's filters have real variety to select from at different relationship stages (Lucas: an NPC must feel DIFFERENT on day 1 vs day 15).

## Tests

- `tests/unit/content/dialogue-pools-ws5-r2.test.ts`: every pool still validates against `validatePool`; per-topic option/reply COUNT EQUALITY (positional pairing invariant); no candidate id collisions with round 1; the new tags are from the supported vocabulary; new task flags are plausible kebab; volume assertion: total distinct strings across all pools >= 2.5x baseline (i.e. the batch adds >= 1300 new distinct strings — the file `tests/unit/content/volume-baseline.json` holds the frozen 1069 baseline).
- All existing pool tests (`dialogue-pools-ws5.test.ts`, `npc-dialogue-pools.test.ts`) must stay green — no regressions, no rewrites of round-1 content.

## Constraints

- Allowed files: the 16 existing `dialogue-pool-*.ts` files + `dialogue-pools.ts` (only if registration needs it — it likely doesn't, pools are keyed by export), `tests/unit/content/dialogue-pools-ws5-r2.test.ts`. NOTHING else. No engine/jev/ui/main changes. No version bump.
- `pnpm typecheck` + `pnpm test` green (another worker may land mission fixes concurrently — if `mission*.test.ts` files fail, note it, don't fix; your gate is your suites + no previously-passing breaks).

## Definition of done

Report at `.agent-briefs/ws5-r2-result.md`: per-NPC additions (topics + counts), validation evidence, vitest summary, the new total distinct-string count vs baseline, deviations. Quality first: Lucas reads these lines.
