# Wave 1 phase QA verdict (current HEAD `c29915c`)

Checks: `pnpm typecheck` passed; `pnpm test` passed (964/964); `pnpm test:e2e --project=chromium tests/e2e/ws9a-robot-collision.spec.ts` passed (2/2, with one retry); `git diff --check d85da34..HEAD` passed. Port 5173 served `v2026.09.28-10`, matching `src/version.ts`.

## Findings by severity

None established at current HEAD. Temporary runtime probes confirmed that an NPC blocking the final frame keeps the arrival promise pending and the robot stationary; that a robot starting 0.05 m from an NPC behind it advances outward at 200 Hz; and that a short frame crossing an NPC's centre is held. The probes were removed.

The kitchen reroute E2E's first attempt stopped at the reception spawn and failed its setup distance assertion; its retry passed and demonstrated the NPC traversal. Four fresh browser starts then accepted `agent_move_to("kitchen")` and each moved the robot roughly 2.6-3.0 m within 2.5 seconds. The first-attempt stall was not reproduced, so it is recorded as test-run context rather than a new product finding. The known NPC nudge exhaustion residue and accepted E2E retry policy were not re-reported.

PHASE-VERDICT: PASS
