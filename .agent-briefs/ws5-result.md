# WS5 (RELAUNCH) — Result: authored v2 dialogue pools for the full assigned roster

Branch `feat/jev-npc-decision-steering` (HEAD f765615). All eleven assigned NPCs are
authored, registered and validated. WS7's `missions.ts` / `mission.ts` / `ui/mission.ts`
were not touched (verified via `git status`).

## Deliverables

- 11 new pool files: `src/content/npc-content/dialogue-pool-{zosia,pawel,kasia,tomek,ania,janusz,grazyna,maciek,przemek,dawid,burek}.ts`
- Registration: 11 `registerNpcContent(...)` calls appended in `src/content/npc-content/dialogue-pools.ts` (idempotent block; WS3 entries untouched)
- Validation test: `tests/unit/content/dialogue-pools-ws5.test.ts` (from the preserved partial, one scoping bug fixed)

## Per-NPC pool summary (topics + one favorite line each)

| NPC | Topics (label) | Favorite line |
|---|---|---|
| **zosia** (reused partial) | Strategic vocabulary / The office refresh / The employer branding scheme | "Engagement peaks while people pretend to start work. Positivity at 7am, obstacles at 10am, wins at 4pm. The week is a narrative arc and someone has to showrun it, and the someone has a blazer." |
| **pawel** (reused partial, 1 option fixed) | The backup script / Schrodinger's employee / Learning to build | "Dariusz left in 2023 and his laptop left with him, but the script kept shipping Fridays to an empty desk. Two years of data, straight into a ghost. When I found out I laughed for a while, and then I was quiet for a week. Growth." |
| **kasia** | The forty-seven open roles / Compensation feelings / The engagement survey | "Once. Marek, 2022. Every answer was the word 'no', including the free-text box. I framed it. It remains the only survey response ever read aloud at an all-hands, and it was read as poetry, because it was." |
| **tomek** | Prod is fine, probably / The temporary fixes / The resume | "Documentation happens at the funeral. While a hotfix is alive, writing about it feels rude, like eulogizing a soldier mid-battle. It has happened once. The deck was one slide and it said 'goodbye'." |
| **ania** | Friend or Frenemy logistics / Your personal brand / The growth campaign | "I A/B tested your face against a stock robot and the robot lost. You beat a robot at sadness. That is the brand: human, relatable, mildly damp." |
| **janusz** | Robot fleet maintenance / Cleaning philosophy / The janitor closet | "A clean desk at nine is a person who arrived early and cares. A desk that was already clean at seven the night before is a person interviewing elsewhere. I dust both the same. I salute the second one quietly." |
| **grazyna** | The real budget / The candle empire / The approval process | "...once tried to expense a boat as 'client entertainment at sea'. The sea, apparently, is a client." |
| **maciek** | The board deck / The buzzword of the quarter / The technical legacy | "A rate limiter, 2019. Forty lines, no dependencies, still in prod, and nobody knows it is there. The best engineering is invisible. That is also the problem with it, career-wise." |
| **przemek** | The bootcamp / The robot question / The craft of sales | "Sold a training program to a man by complimenting his pen. Two-year contract. The pen was plastic. It does not write anymore. It does not need to." |
| **dawid** | The meeting economy / The graph / Bruce | "Companies are bought for their graphs. They are REMEMBERED for their bats." |
| **burek** (half-size) | The audit / Food and toys | "*the exhale* (Conservatively, double. Realistically, half of that.) [watches Przemek correct himself in real time]" |

## Candidate counts

- 10 human NPCs x (3 topics x 6 options + 6 replies + 1 task) = 32 topics, 192 options, 192 replies, 10 tasks.
- burek (species-appropriate half): 2 topics x 6 options + 6 replies (every reply speaks dog: `*sound*` / `[action]` / `(thought)`) + 1 task = 12 options, 12 replies.
- Every task sets an EXISTING flag: kasia→`kasia-referral-open`, tomek→`tomek-apprentice`, ania→`ania-webinar-volunteered`, janusz→`janusz-knows-the-plug`, grazyna→`grazyna-candle-partner`, maciek→`maciek-training-buzzword`, przemek→`przemek-robot-plan`, dawid→`ceo-workshop-offered`, burek→`burek-person`. No new flags were minted (zosia/pawel partials mint `zosia-sticker-campaign` / `pawel-restore-drill`, both npc-prefixed and test-sanctioned).
- Tag coverage across the batch: all five families exercised (`relationship:` x12 distinct uses, `stats:low/high-*` x5, `period:*` x10, `event:event-coffee-broken` (Janusz's closet percolator), `quest:*` x12 — every quest/event flag verified against the known vocabulary).

## Validation evidence

- `pnpm vitest run tests/unit/content/dialogue-pools-ws5.test.ts` → 19/19 green (schema validity via `validatePool`, global id uniqueness, 3x6x6+1 structure per human, burek half-size + dog-marker rule, task reachability, tone bounds, hint/gating minimums, tag families, flag vocabulary, lore regexes, registration identity).
- `pnpm typecheck` → exit 0.
- Full `pnpm test` → **101 files, 1234/1234 passed**. Baseline before this batch was 1215; +19 = the new WS5 test file. Nothing else moved.
- TDD proof the checks bite: during authoring the validation test failed on three real data violations (the partial pawel option `"npm install fixes..."` lowercase; tomek and grazyna options opening with a quote char) and on one latent bug in the preserved partial test itself. Each was fixed and the suite re-run to green. No `lorem/todo/placeholder`, no duplicate texts across the batch, no engine-identifier leaks.

## Deviations (flagged, not silent)

1. **WS3 registration test reconciled** (`tests/unit/content/npc-dialogue-pools.test.ts`, one test). It pinned `hasDialoguePool("grazyna"|"burek") === false` ("...and nobody else"), which the brief-mandated registration necessarily flips. The file is not on the brief's do-not-touch list, the relaunch instructions require the full suite green, and the edit is limited to restating reality (WS3 four + WS5 eleven true; `generic` and unknown ids still false). If the orchestrator prefers, this test can be reworded, but the assertion as it stood was un-satisfiable together with the registration requirement.
2. **Reply length bounds** follow `dialogue-schema.ts` (20-520) and the preserved partial test (`<= 380`), not the brief's stale "10-160" figure — the schema is the source of truth and matches the WS3 pool voice. Observed reply range: 84-335 chars.
3. **Burek gets exactly 1 task** (the toy contract, an existing-flag, dog-shaped offer) rather than a rounded-down zero: "halve it" is ambiguous for the single task, the legacy lore already defines the toy contract, and the tests permit it. `burek-fed` duty remains solely Renata's.
4. **Partial-test bug fixed**: the `requiresFlags`/`blockedByFlags` vocabulary check sat outside its `topic` loop (ReferenceError); moved into scope, semantics unchanged.
5. **zosia/pawel reuse**: copied verbatim from `.agent-briefs/ws5-partial/` except one pawel option rephrased for the capitalization rule; both validated against every rule before reuse.

Constraints honored: no commit/push/`bd`, no version bump, no touching of bartek/renata/klaudia/marek/generic pools, `dialogue-schema.ts`, `dialogue-turn.ts`, any engine/jev/ui/main file, or the WS7 mission files.
