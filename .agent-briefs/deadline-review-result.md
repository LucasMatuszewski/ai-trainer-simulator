# Deadline coworker review — PASS

Final bounded recheck, 2026-09-03 (Europe/Lisbon). No remaining material findings in the requested scope.

- **Finding 1 resolved:** `src/webmcp/companion-conversation.ts:10–27` snapshots the target, re-reads the human after arrival, rejects movement over 0.75 m, and requires a finite current robot/human gap of 2.5–3.5 m. `src/main.ts:529–542` opens the broker only after success and faces the live human position. Unit coverage includes human movement, too-close arrival, failed walking, and successful arrival.
- **Finding 2 resolved:** `src/main.ts:479` supplies the shared office/dialogue/Help/WebMCP/End Day/cinematic busy predicate. The helper checks it before and after walking. Unit tests cover initially busy and becoming busy during the walk; actual modal wiring was checked statically, not through a new browser run.
- **Wider NPC rings and clearance:** `src/engine/agent-companion.ts:397–425` tries 16 candidates per ring at 1.75, 2.25, then 2.75 m, retaining bounds, expanded-obstacle and route checks. Candidates within 1.5 m of the live human are rejected; main wires the position callback. The arrival range now accepts 1.5–3 m, consistent with the wider rings. Tests cover a human beside the NPC and a desk blocking the inner ring. Human clearance here is an endpoint-planning check, not continuous pedestrian avoidance.

Evidence:

- Fresh focused unit run at **20:36:35**: `pnpm exec vitest run tests/unit/companion-conversation.test.ts tests/unit/agent-companion.test.ts` — **2 files / 43 tests passed**, exit 0.
- Existing `/tmp/stack-deadline-e2e-green.log`, modified **20:35:35**, reports **1 passed (38.3 s)**. This is supplied browser-run evidence, not a rerun by this reviewer.
- Directly inspected refreshed screenshots, both after 20:35: human (**20:35:09**) shows Rusty's cyan-eyed head, readable conversation and office interior; overlays hide much of the body. NPC (**20:35:35**) shows Bartek and his desk without the previous robot foreground obstruction, but Rusty is outside the visible composition and the reply is partly obscured by the HUD. This image does not establish mutual facing or a clear two-character composition. Neither screenshot contains the title footer.

Only this report was edited. No source edits, server restart, browser tests, commit or push. Verdict excludes broader broker redesign and full visual/phase acceptance.
