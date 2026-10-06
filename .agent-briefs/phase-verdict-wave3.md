You are a delegate. Do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Write your verdict to `.agent-briefs/phase-verdict-wave3-result.md`.

# Task: Wave 3 phase QA verdict — review CURRENT HEAD

Repo: /home/lucas/DEV/Projects/ai-trainer-simulator, branch `feat/jev-npc-decision-steering`. Wave 3 scope (this verdict): WS7 conference-speech mission (commits 7129724 + f765615 — content, pure runtime, Jev wrapper, UI overlay) and WS5 content batch (838e823 — v2 pools for the 11 remaining NPCs). Wave 2's collision/dialogue systems were passed by earlier verdicts; do not re-litigate them unless Wave 3 regressed them.

**Verify with your own commands:** `pnpm typecheck` (0); `pnpm test` (1234 expected: 101 files); `pnpm test:e2e --project=chromium tests/e2e/ws9a-robot-collision.spec.ts` (dev server on 5173, v2026.09.30-02). Then adversarially probe AT HEAD:

1. **WS7 mission** — the runtime state machine: can any input sequence double-pay, skip the payout, or finish without answering? Does abort/reload semantics hold (completion flag persists, in-flight run resets)? Is the Jev score truly bounded ±1 with authored baseScore fallback on timeout/low-confidence? Does the UI drive correctly via keyboard AND buttons, and does the overlay interact sanely with the pause rules (mission open = clock paused)?
2. **WS5 pools** — schema validity across all 15 pools; tag values the turn builder actually reads; candidate id uniqueness; task flags exist or are plausibly new; the pivot logic across the NEW pools (exhaustion path with 3 topics/NPC); any lore contradictions with src/content/npcs.ts and quests.ts; the reconciled stale assertion (npc-dialogue-pools.test.ts).
3. **Integration seams** — v2 gating for renata/bartek onboarding; do the new pools' task flags collide with existing flags? Does the world-tick + dialogue v2 + interactions coexist in the same frames ( Wave-2's systems are live)?

**Deliver:** findings by severity with file:line, then EXACTLY one final line: `PHASE-VERDICT: PASS` or `PHASE-VERDICT: FAIL — <reason>`. Known-accepted residue (do NOT re-report): nudge exhaustion branch; E2E sampling flake with retries:1; reroute E2E first-attempt stall.
