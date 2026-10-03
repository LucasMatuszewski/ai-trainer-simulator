You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Everything you need is in this brief. Write your result to `.agent-briefs/ws5-result.md`.

# Task: WS5 (RELAUNCH) — Authored content expansion for the v2 dialogue pools (Wave 3, first batch)

> **Relaunch note:** a previous worker was killed mid-batch after finishing
> ONLY zosia and pawel. Its partial files are preserved at
> `.agent-briefs/ws5-partial/` (dialogue-pool-zosia.ts, dialogue-pool-pawel.ts,
> dialogue-pools-ws5.test.ts) — read them; reuse what is usable and REWRITE
> what is incomplete. Your job remains the full assigned NPC list below.

Branch `feat/jev-npc-decision-steering` (HEAD >= `346d26f`). Read first: `src/content/dialogue-schema.ts` (the typed pool model — your output MUST validate against `validatePool`), the EXISTING authored pools as the quality bar: `src/content/npc-content/dialogue-pool-bartek.ts`, `dialogue-pool-renata.ts`, `dialogue-pool-klaudia.ts`, `dialogue-pool-marek.ts`, `dialogue-pool-generic.ts` (read all five fully — match their tag vocabulary, structure, and ironic IT-office tone exactly), `src/game/dialogue-turn.ts` (how pools are consumed: candidates are filtered by relationship band / flags / period / used-set; pivot-on-exhaustion), `src/content/npcs.ts` (the full 15-NPC roster + characterizations), and `src/content/dialogues.ts` + `office-chatter.ts` (lore, running jokes: "prod is on fire", Tomek's push to main, Janusz's robot fleet, coffee culture, Burek the dog, LinkedIn Klaudia, 10x Marek, Credibility Lucas).

## The problem (Lucas)

Current dialogue volume is placeholder-grade; when players exhaust a thread they hit loops. The v2 architecture made depth = **pools × selection × context** — now feed it.

## Your batch (assigned NPCs — disjoint from any other author):

Add **new pool files** for the NPCs that do not yet have v2 pools: **zosia, pawel, kasia, tomek, ania, janusz, grazyna, maciek, przemek, dawid, burek** (burek gets species-appropriate "pools": barks/reactions as options+replies around his existing themes). File naming: `src/content/npc-content/dialogue-pool-<npcId>.ts`, one file per NPC, following the existing pool files' structure EXACTLY (types, tag strings, registration export shape).

Per NPC (except burek: halve it):
- **3 topics** (distinct themes matching the character's role and lore; e.g. zosia: management speak / office renovation / her LinkedIn-engagement scheme; janusz: robot fleet maintenance / cleaning philosophy / secret server closet; tomek: prod-fire denial / "temporary" hotfixes / his resume),
- each topic: **6 option candidates** (what the player says — varied: curious, teasing, supportive, skeptical, self-serving) + **6 reply candidates** (in-character answers; at least 2 with `relationshipHint`, at least 1 gated by an interesting tag combination),
- **1 task offer** per NPC where lore allows (sets an EXISTING flag via `flagToSet` — check `src/content/quests.ts` + `src/game/state.ts` flag usage for the vocabulary; if no fitting existing flag exists, use a new kebab flag prefixed with the npc name, e.g. `zosia-sticker-campaign`) — funny, concrete, actionable ("go somewhere / do something / talk to someone" shaped).

Hard quality rules:
- Every string authored in the game's ironic voice. NO corporate filler, NO repeated joke structures across candidates, NO lorem.
- Option texts: 3-100 chars, player-plausible. Reply texts: 10-160 chars.
- Tags only from the established vocabulary (read the existing pools + dialogue-turn.ts filtering logic first; if you need a new tag value that the turn builder already supports — like `stats:` or `period:` values — it must be one the FILTER logic actually reads).
- Register each pool in `src/content/npc-content/dialogue-pools.ts` (append to the registration — it is YOURS to edit for registrations only).
- Bureau of truth: references to game events must match real flags/quests that exist.

## Tests

- `tests/unit/content/dialogue-pools-ws5.test.ts`: every new pool validates against `validatePool`; every candidate id globally unique; tone bounds (non-empty, length rules); every task `flagToSet` is a plausible kebab flag; counts (topics/options/replies per NPC per the brief).
- Extend nothing else. The orchestrator runs the full suite + volume counter after.

## Constraints

- Allowed files: `src/content/npc-content/dialogue-pool-<npcId>.ts` (new, one per assigned NPC), `src/content/npc-content/dialogue-pools.ts` (registration additions ONLY), `tests/unit/content/dialogue-pools-ws5.test.ts` (new). NOTHING else.
- Do NOT touch: bartek/renata/klaudia/marek/generic pools (another author owns those), dialogue-schema.ts, dialogue-turn.ts, any engine/jev/ui file, version.ts.
- `pnpm typecheck` + `pnpm vitest run tests/unit/content/` green for your scope. Full `pnpm test` may show concurrent-worker noise — note it, don't fix.

## Definition of done

Report at `.agent-briefs/ws5-result.md`: per-NPC pool summary (topics + one favorite line each), candidate counts, validation evidence, deviations. Write for quality first: Lucas will read these lines.
