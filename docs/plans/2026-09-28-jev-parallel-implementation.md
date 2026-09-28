# Parallel Implementation Plan — Jev Steering PoC (branch `feat/jev-npc-decision-steering`)

**Date:** 2026-09-28 · **Inputs:** PRD v2 (C-75) + ADR-0009 (D-45…D-57) ·
**Execution vehicle:** ZCode multi-subagent runs — GLM implementer subagents, GLM
judge/reviewer subagents, QA helpers; orchestrator is this ZCode session (Lucas
instructed: "Use GLM models and subagents in ZCode"). **Nothing is pushed** (PR-4 +
C-74/C-75 local-only mandate); implementers never commit (PR-7) — the orchestrator
verifies and commits granularly, bumping `vYYYY.MM.DD-NN` per commit (PR-13).

---

## 1. Ground rules for every subagent

1. Briefs go to `.agent-briefs/<task>.md` (PR-6): self-contained, exact files,
   definition of done, "Do not commit / Do not push" at the bottom.
2. **File ownership is disjoint** (manifest below) — no two concurrent workers
   touch the same file. **Shared integration files (`src/types.ts`,
   `src/game/state.ts`, `src/main.ts`, `src/ui/hud.ts`,
   `src/engine/npc-controller.ts`, `src/version.ts`) are ORCHESTRATOR-OWNED
   after WS0**: workers never edit them; they return proposed patches in their
   result and the orchestrator applies them serially. `src/engine/npc-controller.ts`
   hosts the real greeting/goodbye/chatter/override call sites (it is
   ~1,900 lines), which is exactly why WS0 installs the injection seam first.
3. **WS0 seam commit precedes all fan-out** (see §3): `DecisionHooks` injection
   into `createNpcController` (greeting, goodbye, pair, starter, exchange,
   destination, override-install) defaulting to today's functions; extension
   points in `main.ts`; pre-created `src/content/npc-content/` registry; shared
   contract types. After WS0, workers only *inject* from their own new files.
4. TDD per PR-8/PR-11: failing test first for every pure function and data file;
   mutation check before the orchestrator commits. Tests live flat in
   `tests/unit/<area>.test.ts` or `tests/unit/<area>/<name>.test.ts` — both match
   the existing convention; workers state their chosen paths in the result.
5. Every worker returns: changed-file list, proposed shared-file patches, test
   output, and any deviations from the brief. The orchestrator runs
   `pnpm typecheck && pnpm test`, inspects the diff, applies patches, and only
   then commits. **Gate order: implement (+ version bump) → verify → independent
   judge → commit → visual phase review.**
6. Judges (review subagents) get the brief + diff and return a pass/fail verdict
   with findings; per-workstream code judges may be GLM, but **the per-wave phase
   QA verdict runs on `codex exec` (different model family)** per PR-4.6, and the
   WS5 tone judge samples ≥ 10% of each author batch for orchestrator/Lucas
   review. Visual QA stays with Lucas via the PR-2 screenshot loop.

## 2. Wave plan

```mermaid
flowchart TD
    W0["WS0 seam commit (exclusive worker)\nDecisionHooks in npc-controller, main.ts extension points,\nnpc-content registry, shared contract types"] --> W1["Wave 1 (parallel)\nWS1 decision core + fallback + adapter tests\nWS2 social model + save v2 migration chain\nWS9a robot collision fix (Lucas bug, sacs-xtma.16)"]
    W1 --> W2["Wave 2 (parallel)\nWS3 dialogue steering + content schema + pool types\nWS4 world-tick batching (generalizes WS1 wrapper)\nWS6 interaction points + NpcNeeds (after WS3/WS4)"]
    W2 --> W3["Wave 3 (parallel)\nWS5 content 10x (4 authors, disjoint npc-content files)\nWS7 conference mission slice (fixture pools first)\nWS8 observability/calibration fixtures"]
    W3 --> W4["Wave 4\nIntegration pass, judge sweep (codex phase verdict),\nperceptibility gate, playtest E2E (WS9),\nscreenshot QA to Lucas, PoC demo"]
```

- **Wave 1** — plumbing only, no visible behavior change; `?jev=off` proves TAC-01.
- **Wave 2** — mechanics become steerable; content schema lands here so Wave 3
  authors have stable types.
- **Wave 3** — the big parallel expansion (content authors are the widest fan-out)
  plus the mission; observability runs continuously from Wave 1.
- **Wave 4** — integration: full-suite green, judge sweep across all workstreams,
  Playwright screenshot set + vision-model descriptions for Lucas, demo notes.

## 3. Workstreams

### WS0 — Seam commit (runs ALONE, before any fan-out) — 1 implementer
**Scope (review B3):** install the injection seam so concurrent workers never edit
shared files: add a `DecisionHooks` parameter object to `createNpcController`
(greeting, goodbye, pair, starter, exchange, destination, override-install),
defaulting to today's functions; add extension points in `main.ts`; pre-create the
`src/content/npc-content/` directory with a registry that currently imports
nothing; define the shared contract types (`DecisionRequest`/`DecisionAnswer`/
`DecisionHooks`) in a new module `src/jev/contracts.ts` (types only, no runtime).
**Owns (exclusive):** `src/engine/npc-controller.ts`, `src/main.ts`,
`src/content/npc-content/registry.ts`, `src/jev/contracts.ts`, `src/version.ts`.
**Done:** typecheck + all existing tests green; behavior identical (hooks default
to legacy); the volume counter baseline script freezes the `42000fd` numbers.

### WS1 — Decision core & invisible fallback (Wave 1) — 1 implementer
**Scope (ADR §3.1–3.8, D-45/46/47/56):** `DecisionClient` interface + OpenRouter
adapter (pinned `typesafe/jev-1.13`, timeout, 429/529 backoff) + fake client +
unconfigured client + key provider (proxy URL / BYO localStorage / none) +
`FallbackRegistry` wrapping the legacy pickers + first steered wrapper (morning
greetings, lowest risk) + `?jev=off|shadow` URL modes.
**Owns:** `src/jev/client.ts`, `src/jev/openrouter-adapter.ts`, `src/jev/fake-client.ts`,
`src/jev/key-provider.ts`, `src/jev/decision-log.ts` (moved from WS8 — one owner),
`src/jev/greeting-wrapper.ts`, `vite.config.ts` (proxy middleware),
`src/ui/jev-settings.ts`, `tests/unit/jev/*` incl. **adapter contract tests**
(provider fixtures, primitive normalization, retry/deadline, partial/malformed —
no network). Shared-file patches (npc-controller/main.ts wiring) submitted, not
applied.
**Done:** fallback-equivalence test green (TAC-01); shadow log rows visible; fake
client covers happy/timeout/malformed/unknown-id/partial/low-confidence.

### WS2 — Social model & save v2 (Wave 1) — 1 implementer
**Scope (D-50/51):** OCEAN profiles data (15 NPCs, authored values + archetype
seeds for the pair matrix), relationship matrix (105 pairs), mood valence/energy
with hourly decay, ±5 clamped delta reducer actions, Heider triad detection,
reciprocity summary helper, save schema v2 + v1 migration, worldDiary ring buffer.
**Owns:** `src/game/social.ts` (new), `src/game/migrate.ts` (new migration chain),
`src/content/dialogue-memory.ts` (Sets → array DTOs at the API boundary),
`src/game/initial.ts`, `src/content/npc-profiles.ts` (new),
`tests/unit/game/*`. Shared-file patches (`state.ts`, `types.ts`) submitted, not
applied. Storage-key policy: first v2 write keeps the untouched v1 blob under a
backup key; v2 saves never silently wiped.
**Done:** round-trip + migration tests; clamp/decay/triad table tests; matrix
serialized size < 10 KB (TAC-05).

### WS3 — Dialogue steering (Wave 2) — 1 implementer
**Scope (D-45/52):** content schema v2 (`replyCandidates`, option metadata,
relationship bands), migration of the existing 48 trees into the schema, wrappers
for reply selection / option curation (≤4) / tree opening, per-pick relDelta
application, `NpcMemory` consumption from persisted state (WS2).
**Owns:** `src/content/dialogue-schema.ts` (new — includes the argument/question/
audience pool types needed by WS5/WS7), `src/content/dialogues*.ts` (schema
migration only), `src/ui/dialogue.ts` (curation + requiredForProgress slots +
unified programmatic-pick eligibility), `tests/unit/content/*`. Shared-file patch
for `main.ts` (openDialogueWith replacement) submitted, not applied.
**Done:** AC-01..05 pass with fake client; legacy replies byte-identical when
`?jev=off`.

### WS4 — World-tick batching (Wave 2) — 1 implementer
**Scope (D-48/49/56):** world projector + candidate builder (pure), answer
validator (per-subject), world-tick scheduler (6 s in-game cadence + period
transitions, single-flight, 700 ms budget, projection-hash cache), wrappers for
chatter exchange / greetings / destinations.
**Owns:** `src/engine/world-tick.ts` (new), `src/game/projection.ts` (new —
per-subject namespaced allowlist), `src/engine/chatter.ts` +
`src/content/npc-schedule.ts` (pure-picker replacements only; the call sites are
WS0 hooks — WS4 **generalizes WS1's greeting wrapper**, never re-wraps),
`tests/unit/engine/*` (world-tick/projection files). Shared-file patches
(`npc-controller.ts` hook wiring) submitted, not applied.
**Done:** TAC-02/03/04; partial-batch test; with fake latency injected, fallback
path identical to legacy picks.

### WS5 — Content expansion 10× (Wave 3) — 4 author subagents + 1 judge
**Scope (AC-27/28, D-52):** per-NPC-group authoring into disjoint new files:
- **Author A:** bartek, klaudia, marek, zosia — trees, replyCandidate pools,
  personal arcs, jokes, miseries.
- **Author B:** pawel, kasia, tomek, ania — same + lunch-chatter pools.
- **Author C:** janusz, grazyna, maciek, przemek (+ burek lines) — same + office
  chatter exchanges referencing events.
- **Author D:** dawid, renata arcs + **argument pools** (per pair-class),
  **conference question pools** (hard questions per topic), audience murmur/applause
  lines, morning/evening pool extensions for all NPCs.
All drafts authored in the game's ironic tone; GLM drafts are reviewed by the
author judge for character consistency (PR-5 taste work), then shape-tested.
**Owns:** `src/content/npc-content/<npc>.ts` files (new per group; registry
pre-created by WS0 — authors never edit it), group pool files, plus one
**reachability + completion-trace test** per batch; the volume test runs from the
frozen `42000fd` baseline (orchestrator-run). Every candidate carries its
Jev-facing `description` (authoring cost is in scope).
**Done:** volume test ≥10× baseline (AC-27) with zero shape violations; tone judge
verdict pass.

### WS6 — Interaction points (Wave 2) — 1 implementer
**Scope (D-53, AC-20..22):** interaction-point registry (coffee machine, printer,
whiteboard minimum), prompts, fault state (printer jam) + repair interaction, sfx
ids wired into the existing audio manifest, NPC purposeful-use schedule overrides.
**Owns:** `src/engine/interaction-points.ts` (new, with the bounded action
lifecycle), `src/game/npc-needs.ts` (new: `NpcNeeds {caffeine, social}` — runtime
only, decays hourly, resets daily), **registered sfx assets** (source stated in
the brief) + a test asserting every interaction sfx id resolves in the manifest
(the loader's silent no-op hides missing audio), `tests/unit/engine/interactions/*`.
Prompt UI changes are `src/ui/hud.ts` patches (there is no `src/ui/prompt.ts`),
submitted not applied. Runs after WS3/WS4 in the wave; its `npc-controller`
changes go only through the WS0 seam.
**Done:** jsdom prompt tests; e2e: player fixes printer → Renata errand resumes.

### WS7 — Conference mission (Wave 3) — 1 implementer (+ Author D pools)
**Scope (D-54, AC-23..26):** mission definition + prep card, speech state machine
(talking points → plant question → options → audience score → reactions), audience
crowd (seated background NPCs reusing mesh factory; gesture/walk reactions),
mission results card, outcome effects via existing systems.
**Owns:** `src/game/mission.ts` (new — bounded slice: 1 topic, 5 talking points,
2 plants × 2 questions, panel engagement meter, `baseScore` ± 1 level),
`src/ui/mission.ts` (new),
`src/engine/audience.ts` (new), `tests/unit/game/mission/*`, Playwright e2e.
Fixture question/argument pools ship with WS7; Author D's reviewed pools
integrate afterwards through the frozen schema (dependency, not late content).
Reload/abort semantics + persisted completion/reward marker are in scope.
**Done:** e2e start→results green; two different answer paths produce different
sequences (AC-26).

### WS8 — Observability & calibration (continuous, Wave 1→4) — 1 implementer
**Scope (D-55, AC-30):** decision ring buffer, debug panel (rows + deltas +
fallback flag), shadow-mode comparison logging, labeled evaluation datasets per
surface and the `evaluate.mjs` calibration run; TAC-09.
**Owns:** `src/ui/debug-panel.ts` (new — counters: requested/applied/legacy/
rejected/stale/skipped; `?jev=strict` toasts; startup mode line),
`tests/eval/*` (labeled datasets + policy-table fixtures from Wave 1), no
`src/jev/*` ownership (decision-log is WS1's) and no game-loop files. The
orchestrator records evaluation results in Beads (delegates never run `bd`).
**Done:** panel off by default; shadow dataset results recorded in Beads `sacs-xtma.13`.

### WS9a — Companion-robot collision & NPC avoidance fix (Wave 1) — 1 implementer
**Scope (Lucas bug, 2026-09-28, Beads `sacs-xtma.16`):** the WebMCP companion robot
walks through desks/props as if they were air, and NPCs neither avoid it nor react
to it. Give the robot the same collision treatment as every other walking actor:
include its body in the obstacle set for its own pathing (it must route around
furniture like NPCs do) and make it visible to NPC avoidance and path planning
(NPCs must not walk through it; a blocked NPC replays its existing escape/replan
behavior). No new engine subsystem — reuse the existing AABB collision and
path/avoidance passes.
**Owns:** `src/webmcp/*` robot movement files, `src/engine/collision.ts`,
`src/engine/npc-controller.ts` (avoidance pass only), `tests/unit/engine/*` for
these files.
**Done:** unit tests assert the robot's planned path never intersects a furniture
AABB; an NPC whose path crosses the robot replans; Playwright e2e where the robot
crosses the office without clipping a desk and a nearby NPC routes around it.

### WS9 — Playable E2E harness: the game is tested by PLAYING it (Wave 1 tooling, used every wave after)
**Scope (Lucas mandate, 2026-09-28: "you must find a way to test this game e2e by
playing it — the ONLY way to make this game high quality and playable"):** a
repeatable agent playtest loop, not just input-simulation smoke tests:
- **Driver:** Playwright (dev server 5173 per PR-13: kill zombie servers, read the
  version footer/console line and assert they match).
- **Two play styles:** (a) *human-like* — synthetic keyboard/mouse events (WASD,
  E, dialogue keys) through the real controls; (b) *agent-like* — drive the
  existing WebMCP tool registry from the page (the 24 registered tools are the
  game's own agent API; the playtester acts as the agent: get_state, walk, talk,
  pick options, advance time).
- **Artifacts:** every playtest writes screenshots + a structured
  playtest-log (decisions taken, anomalies, console errors) into `playtests/`
  (**gitignored** — Lucas, 2026-09-28: screens live in the repo but never
  committed).
- **Playtester role (GLM subagent + vision):** runs the game for N in-game
  minutes from the title screen, follows quests, talks to NPCs, uses the world,
  then writes a bug report (severity + reproduction + screenshot refs) judging
  *logic and real-world simulation feel*, not just "no crash". This is how bugs
  like WS9a's robot clipping get found before Lucas finds them.
**Owns:** `tests/e2e/play.spec.ts` + `tests/e2e/playtest-helpers.ts`, `playtests/`
(gitignored), `.gitignore` entry.
**Done:** `pnpm test:e2e` includes one full autonomous playthrough asserting: day
advances, a dialogue completes, a quest progresses, zero console errors; a
playtest run leaves the artifact set in `playtests/<timestamp>/`.

## 4. Judge / QA topology (per PR-4.6, PR-7)

| Role | When | Model (ZCode subagent) | Checks |
|---|---|---|---|
| Code judge (per workstream) | after each implementer finishes | GLM (independent context) | diff vs brief, scope creep, test quality incl. mutation-check evidence, PR-11 naming |
| **Phase verdict (per wave)** | wave boundary, before Lucas sees the phase | **`codex exec` (different model family — PR-4.6)** | whole-diff phase QA verdict; also inspects WS8's counters/evaluation results, not just fake-client tests |
| Tone/content judge (WS5) | per author batch | GLM + ≥10% sample reviewed by orchestrator/Lucas | character consistency, game's ironic tone, no placeholder slop, lore accuracy vs `npcs.ts`, near-duplicate check |
| QA helper | per wave | GLM + Playwright CLI | fresh dev server (kill zombies first, PR-13), version footer matches console, screenshots to `screenshots/` |
| Playtester (WS9) | per wave from Wave 2 | GLM agent + vision | *plays* the game via real controls + WebMCP tools for N in-game minutes; judges logic and real-world simulation feel; writes severity-ranked bug reports with screenshots into `playtests/` |
| Vision description | per PR-2 gate | vision-capable model per AGENTS.md PR-5 | describes screenshot; regression phrases block the phase |
| Orchestrator (this session) | always | session model | apply shared-file patches serially, verify → judge → granular commit with version bump → Beads notes; Lucas is the final visual QA |

Escalation rule: any judge FAIL ⇒ work returns to the implementer with findings;
two consecutive fails ⇒ orchestrator re-briefs or reverts (PR-4 revert rule).

## 5. Execution checklist (orchestrator, on Lucas's "go")

1. Create `.agent-briefs/` files for Wave 1 (WS1, WS2, WS9a) — self-contained, with the
   ADR/PRD excerpts each worker needs.
2. Launch Wave 1 implementers as parallel GLM subagents (background), collect
   results, verify (`pnpm typecheck && pnpm test`), commit granularly with version
   bumps, run code judges. WS9 (playable E2E harness) lands in Wave 1 so every
   later wave is playtested.
3. Repeat for Wave 2/3 with the same verify→commit→judge loop; QA helper takes the
   per-phase screenshots, the playtester runs a full playtest per wave (WS9
   artifacts + bug report); PR-2 gate with Lucas at each wave boundary.
4. Wave 4: full judge sweep + calibration readout + screenshot set + autonomous
   playtest report + PoC demo notes; update Beads `sacs-xtma.13/.14/.15/.16`;
   report push URL = none (local-only until Lucas approves).

## 6. Risk register (PoC)

| Risk | Mitigation |
|---|---|
| 10× content is the long pole | Wave 3 fan-out with disjoint files; volume test tracks progress; mission/question pools can ship after dialogue pools |
| Whole-tick request latency gates ambient life | 700 ms budget + per-subject fallback + D-48 measurement to split per domain |
| Content quality drift (AI-assisted drafting) | tone judge + shape tests + human review before commit; nothing auto-merges |
| Save migration breaks existing saves | v1 fixtures in tests; migration is Wave 1-blocked until green |
| Key leakage | key hygiene tests (string-absence), `.env*` gitignored (C-74), BYO stored in localStorage only |
