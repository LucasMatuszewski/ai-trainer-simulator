# Waves 2+3 formal closure re-verdict at `77fb6df`

Verification: `pnpm typecheck` exited 0. `pnpm test` exited 0 (106 files, 1,319 tests). `pnpm test:e2e --project=chromium tests/e2e/ws9a-robot-collision.spec.ts` exited 1: the furniture test passed on retry, while the reroute test failed both attempts before reaching its encounter sampling. Port 5173 served the same `v2026.10.01-05` as `src/version.ts`. The previously recorded Wave-4 perceptibility gate passed (54 applied, 13.6% fallback, zero off-mode requests), but its current validity is limited by the dialogue steering regression below; the gate could not be rerun with a live provider because this environment reported `OPENROUTER_API_KEY not set`.

## Blocker

1. **Required reroute E2E gate is red.** `tests/e2e/ws9a-robot-collision.spec.ts:168-177`: on both attempts the robot remained 21.51 m / 23.46 m from the coffee stop after three room-route requests. The test failed before the parking drive or any NPC traversal could be observed. This is a setup/travel failure, distinct from the accepted reroute sampling variance; it does not establish a collision defect, but the mandatory gate cannot pass.

## High

2. **Dawid's later CEO story beats remain unreachable.** `src/main.ts:1571-1587,1599-1603`: the v2 gate opens immediately after `ceo-met`, so the legacy `give-task` and `performance-review` selections never execute. `ceo-workshop-offered` and `ceo-reviewed` are only set by those legacy branches (`src/content/dialogues.ts:953,979,1029,1040`); the v2 graph-memo flag does not replace them.

3. **NPC coffee trips still stop at the walk instruction.** `src/main.ts:2098-2113`: craving selects an NPC and installs a movement override, but `pendingNpcTrips` is never read anywhere in production, and only the player calls `usePoint`/`activateAction` (`src/main.ts:501-502`). On arrival, no action starts, caffeine is never refilled, and the NPC is never returned to its schedule. The world-tick projection has no needs/action question (`src/engine/world-tick.ts:323-333`), so this path is not Jev steered either.

4. **The mission payout still consists of separate saves.** `src/main.ts:1634-1639` dispatches every action from `missionResultActions` separately; `src/game/state.ts:45-58` saves after each. The first action sets the completion flag (`src/game/mission.ts:432-447`), so interruption before the cash/credibility actions permanently marks an unpaid mission complete. The atomic `mission-complete` reducer action at `src/game/state.ts:193-203` remains unused.

5. **The computer remains disabled after a contract is earned in the same office session.** `src/main.ts:1036-1042,1287-1308` gives the roster a one-time `got-acme-contract` snapshot, and `src/ui/office-roster.ts:84,131-155` does not refresh the computer button. The player therefore cannot enter the contract-gated mission through that button until the roster remounts.

6. **Jev player-dialogue curation has become dead code.** `src/ui/dialogue.ts:611-631` opens and renders the v2 turn without ever invoking the wrapper's `steerTurn` (`src/jev/dialogue-wrapper.ts:144`); the only production read is `memoOptionOrder` at `src/ui/dialogue.ts:587-599`. A source-wide search finds no production `steerTurn` call, so the memo is never populated and live player-dialogue choices remain authored order. The earlier Wave-4 aggregate count cannot demonstrate this surface works at current HEAD. The earlier stale-memo finding is dormant only because no request is now made; `src/jev/dialogue-wrapper.ts:275-285` still writes without checking its session token if steering is reconnected.

7. **The new NPC-NPC deep-conversation runner is not in the game.** `src/engine/npc-npc-runner.ts:92-139,193-235` and the six scripts exist and pass unit tests, but `src/engine/npc-controller.ts:1992-2029` still always runs a single legacy starter/response; no production module imports `createNpcNpcRunner`, `flattenPath`, or `npcNpcConversationFor`. The authored multi-level lines, interruption handling, and reaction settlement cannot occur in play.

## Medium

8. **Mission question steering still tracks questions that were never asked.** `src/ui/mission.ts:452-459` adds the authored default before the asynchronous pick, then also adds an alternative even when it replaces that default. The next request excludes an unused question; a late response can also add its ID before the `runToken` check. Runtime consumption protects against duplicate delivery, but the Jev candidate set and fallback are wrong.

## Reverified repairs

Renata/Bartek onboarding remains gated until its quest flags; player E-key equipment use activates; needs decay at the intended rate and reset daily; world-tick skips fresh destination memos and validates exchange IDs by exact candidate membership. The mission overlay mounts after contract and pauses the clock, all five talking points alternate with questions, pointer Continue exists, and partial score fallback retains valid sibling adjustments. Save v2 migration and social bands/nightly regression are present. These passing checks do not resolve the findings above.

PHASE-VERDICT: FAIL — the required E2E gate is red and CEO progression, NPC equipment use, mission entry/payout, dialogue curation, and NPC-NPC deep conversations remain incomplete
