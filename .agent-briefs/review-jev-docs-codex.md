You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Everything you need is in this brief. Write your result to `docs/reviews/2026-09-28-jev-docs-review-codex.md`.

## Goal — independent second-opinion review of three design documents

Before implementation starts, the orchestrator wants an expert review of the design docs for the "Jev NPC decision steering" feature of this game (Stack Underflow — a TypeScript + three.js single-player browser office simulator; NPCs are hardcoded/rng-driven today; Jev = TypeSafe's System One judgment model that returns typed answers with probabilities, reached via OpenRouter).

**Read (in this repo, read-only for you):**
1. `docs/PRD-jev-npc-steering.md` — the product requirements (v2)
2. `docs/ADR/0009-jev-npc-decision-steering.md` — the technical architecture decisions (D-45…D-57)
3. `docs/plans/2026-09-28-jev-parallel-implementation.md` — the multi-subagent execution plan

Optional context (skim only if needed): `docs/research/2026-09-28-jev-typesafe-platform.md` (the Jev platform facts), `docs/PRD.md` (main game PRD), and spot-check the codebase (`src/engine/`, `src/content/`, `src/game/`) to verify claims the docs make about existing seams.

## Task — produce a structured review

Write the report with exactly these sections:

1. **Verdict** — one of: `approve` / `approve-with-changes` / `reject`, with a 2-3 sentence rationale.
2. **Top strengths** — max 5 bullets.
3. **Findings by severity** — Blocker / Major / Minor. Each finding: which doc + section, what is wrong or risky, and a *concrete* suggested change (text-level, not vibes). Be adversarial; hunt for: over-engineering vs PoC scope, under-specified failure modes, contradictions between the three docs, unrealistic content-volume assumptions (the "10x" target), social-model complexity creep, latency/feel risks in a real-time game, key/security gaps, save-migration hazards, and anything in the plan that will collide (files, sequencing, judge coverage).
4. **Direct answers** — give your opinion, with reasoning, on: (a) world-tick batching vs per-surface: is the 6 s cadence and 700 ms budget sane for a game that must feel alive? (b) is the all-pairs NPC↔NPC relationship matrix + Heider triads the right complexity for a PoC, or is it over/under-built? (c) is "invisible fallback = preserved legacy pickers" sound, or does it hide integration bugs? (d) is the conference-speech mission well-scoped for a first playable? (e) is the parallel plan's file-ownership actually disjoint enough to avoid merge races? (f) what failure mode of the whole feature worries you most and is it addressed?
5. **Missing entirely** — anything important no doc covers.

## Rules

- Read-only except your single report file above. Do NOT modify any other file.
- Cite doc sections (e.g. "ADR-0009 D-48", "PRD §6 AC-09") for every finding.
- Invite reasoned disagreement: if you think a core decision (e.g. D-45 selection-only, D-46 OpenRouter route) is wrong, say so plainly and argue it.
- No commit, no push, no tracking tools.

## Definition of done

The report file exists at the exact path above, contains all 5 sections, every finding is actionable and cited, and your answers in section 4 are direct (no "it depends" without a recommendation).
