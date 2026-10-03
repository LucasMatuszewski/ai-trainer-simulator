You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Everything you need is in this brief. Write your result to `.agent-briefs/ws0-seam-result.md`.

# Task: WS0 — seam commit for the Jev NPC-steering feature (runs ALONE; no other worker is editing)

You are working on branch `feat/jev-npc-decision-steering` in this repo (a TypeScript + three.js Vite browser game). Design docs: `docs/ADR/0009-jev-npc-decision-steering.md` (read §3, §5, §10) and `docs/plans/2026-09-28-jev-parallel-implementation.md` (read §1, §3 WS0). Goal: install an injection seam so that later concurrent workers can replace NPC decision points WITHOUT ever editing the big shared files again. Behavior must be 100% identical after your change.

## Exact changes

1. **`src/jev/contracts.ts` (new)** — shared contract types ONLY (no runtime logic): `DecisionRequest`, `DecisionAnswer` (discriminated: `choice | score | noul | subset` — note Noul answers carry `noul: number` and NO confidence field), `DecisionHooks` (below), per the ADR §4.
2. **`src/engine/npc-controller.ts`** — add an optional `hooks` parameter object to `createNpcController`, defaulting to the CURRENT functions so behavior is identical:
   - `pickMorningGreeting?: (npcId) => string` (wraps the existing `pickMorningGreeting` call sites around lines 1149–1189)
   - `pickEveningGoodbye?: (npcId) => string` (wraps the `releaseDeparture` call site around line 1085)
   - `pickChatterPair?` / `pickChatterStarter?` / `pickChatterExchange?` (wrap the uniform-random picks inside the conversation-manager block around lines 1696–1814 and `pickExchange` in `src/engine/chatter.ts` call path)
   - `pickRandomDestination?: (npcId, period) => ScheduleEntry` (wraps the `rollRandomNpcDestinations`/`pickRandomDestination` path called via `src/game/events.ts:57`)
   Keep every legacy function as the default value; the call sites call `this.hooks.x ?? legacy` style (or pre-bound defaults). Do NOT change rng consumption order: the default path must consume randomness exactly as today (tests inject seeded rng).
3. **`src/main.ts`** — create and pass the default hooks object where `createNpcController` is constructed, and add a single clearly-marked extension point (an exported mutable `jevHooks` holder or an options bag) that later waves can populate. Minimal diff.
4. **`src/content/npc-content/registry.ts` (new)** — empty registry module: exports a typed record `NPC_CONTENT: Record<NpcId, NpcContentEntry | undefined>` (define a minimal `NpcContentEntry` interface: `replyCandidates?`, `argumentPools?`, `questionPools?`) and an `registerNpcContent()` helper. Nothing imports content yet.
5. **`src/version.ts`** — bump the build version to `v2026.09.28-01` (first code-touching commit today; C-68 rules: console line and title footer both read this constant — verify they import it, do not hardcode).
6. **Baseline freeze** — add `scripts/content-volume.mjs`: a Node script that imports the existing dialogue/chatter/greeting content modules, counts distinct normalized authored strings (nodes, options, reply texts, chatter lines, greeting/goodbye lines) and writes the totals to `tests/unit/content/volume-baseline.json`. It will later power the 10× volume test (AC-27). If importing TS content from a plain Node script is awkward, count from the built test environment instead (vitest fixture) — your choice, but the frozen numbers must come from the actual content modules at current commit.
7. **Tests** (failing-first per TDD): a unit test proving the hooks defaults reproduce legacy behavior with a seeded rng (same seed ⇒ same greeting/goodbye/exchange/destination picks as before your change), and a test asserting `registerNpcContent`/`NPC_CONTENT` shape.

## Constraints

- Allowed files: `src/jev/contracts.ts` (new), `src/engine/npc-controller.ts`, `src/main.ts`, `src/content/npc-content/registry.ts` (new), `src/version.ts`, `scripts/content-volume.mjs` (new), `tests/unit/content/volume-baseline.json` (generated), plus the two new test files. NOTHING else.
- Do not change any gameplay behavior, dialogue text, or rng ordering.
- `pnpm typecheck` and `pnpm test` must exit 0.

## Definition of done

Typecheck + full test suite green; the seeded-rng equivalence test passes (same picks as pre-change); report file exists listing: changed files, test output summary (paste the vitest summary lines), any deviations, and the frozen baseline numbers.

Disagreement invited: if a hook point cannot be added without changing rng order or behavior, STOP at that item, describe the obstacle precisely in the report, and continue with the rest.
