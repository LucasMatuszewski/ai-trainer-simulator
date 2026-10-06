You are a delegate. Do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Write your verdict to `.agent-briefs/phase-verdict-wave1-result.md`.

# Task: per-wave phase QA verdict for Wave 1 of the Jev NPC-steering feature (PR-4.6)

Repo: /home/lucas/DEV/Projects/ai-trainer-simulator, branch `feat/jev-npc-decision-steering`. Wave 1 spans commits `d85da34..HEAD` (see `git log --oneline d85da34..HEAD` — 5 commits: WS0 seam, decision core + social model + save v2, save v2 store wiring, WS9a robot collision fix). You are the INDEPENDENT phase judge (different model family from the implementers).

**Context to read (skim, do not re-derive):** `docs/ADR/0009-jev-npc-decision-steering.md` (§9 testing strategy, TACs), `docs/plans/2026-09-28-jev-parallel-implementation.md` (§3 WS1/WS2/WS9a "Done" lines), `.agent-briefs/ws0-seam-result.md`, `.agent-briefs/ws9a-result.md`.

**Verify with your own commands (you have workspace-write; run them):**
1. `pnpm typecheck` and `pnpm test` — exit 0, ~950 tests (already reported; confirm).
2. Spot-check 3 load-bearing claims in the diffs: (a) WS0 hooks default to legacy with unchanged rng order (`src/engine/npc-controller.ts` seam block); (b) the save path migrates v1→v2 and backs up v1 before the first v2 write (`src/game/state.ts`); (c) the robot's step motion uses traced axis legs and the NPC avoidance includes the robot (`src/engine/agent-companion.ts`, `src/engine/npc-controller.ts`).
3. Check the Wave-1 "Done" lines against reality: WS1's adapter contract tests exist network-free (`tests/unit/jev/adapter-contract.test.ts` — confirm no real fetch); WS2's stability test exists and is deterministic (`tests/unit/game/social-stability.test.ts`); WS9a's no-robot regression test exists.

**Deliver:** findings by severity (blocker/major/minor) with file:line, then EXACTLY one final line: `PHASE-VERDICT: PASS` or `PHASE-VERDICT: FAIL — <reason>`. Be adversarial but judge only Wave-1 scope (mechanics correctness and test quality — visual/UX judgment happens later via screenshots).
