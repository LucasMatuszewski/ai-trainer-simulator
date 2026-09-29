You are a delegate. Do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Write your verdict to `.agent-briefs/phase-verdict-wave1-result-9.md`.

# Task: Wave 1 phase QA verdict — review CURRENT HEAD

Repo: /home/lucas/DEV/Projects/ai-trainer-simulator, branch `feat/jev-npc-decision-steering`. Wave 1 spans `d85da34..HEAD`. Verdict history: results 4-8 each found progressively deeper robot/NPC collision issues; the CURRENT HEAD commit fixes result-8's three findings: (1) the join ring search is furniture/bounds-viability-checked; (2) the person-yield holds on centre-crossing frames (point-to-segment < 0.2 m while ending inside the radius); (3) the shared NPC nudge's exhaustion path places at the farthest-from-robot candidate.

**Verify with your own commands:** `pnpm typecheck`; `pnpm test` (964 expected); `pnpm test:e2e --project=chromium tests/e2e/ws9a-robot-collision.spec.ts` (dev server on 5173, v2026.09.28-09). Then adversarially probe AT HEAD: (1) the join viability search (furniture near spawn candidates); (2) the centre-crossing hold (does it re-trap the escape case? does it actually catch crossings?); (3) the farthest-candidate nudge; (4) any remaining Wave-1-scope hole you can find — this is the ninth pass, so hunt especially for anything ALL previous passes missed: interaction BETWEEN the systems (dodge + shove + settle + arrival in the same frames), save/load mid-walk, speed-multiplier effects.

**Deliver:** findings by severity with file:line, then EXACTLY one final line: `PHASE-VERDICT: PASS` or `PHASE-VERDICT: FAIL — <reason>`.
