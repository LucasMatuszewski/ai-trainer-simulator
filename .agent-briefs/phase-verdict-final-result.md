# Waves 2+3 formal closure re-verdict at `9b45bda`

Verification: `pnpm typecheck` exited 0; `pnpm test` exited 0 (106 files, 1,319 tests). `pnpm test:e2e --project=chromium tests/e2e/ws9a-robot-collision.spec.ts` exited 0: furniture passed, rerouting passed on its one allowed retry after the first attempt found no qualifying traversal. The live adapter evidence at `tests/eval-results/live-smoke-pr14.json` records a successful provider response. The shared key provider, late activation of greetings/dialogue/world-tick wrappers, strict-mode warning, gated needs decay and daily reset, onboarding gates, destination memo skip, exact exchange membership, five alternating speech points, Dawid's `ceo-reviewed` gate, pointer Continue, partial score fallback, and single-dispatch mission reward are present at HEAD.

## Critical

1. **Z during the mission can freeze the next day's simulation.** `src/main.ts:505-519` opens End Day without checking `missionUi?.isOpen()`. Confirming it runs `endDay()` (`src/main.ts:1394-1435`) and `showDailySummary()` clears `uiRoot`, but never calls `missionUi.close()`. The mission handle's `isOpen()` is `wrap !== null` (`src/ui/mission.ts:191`), so after Continue, `shouldAdvanceSimulationClock` still receives `missionOpen: true` (`src/main.ts:2080-2087`). The overlay has disappeared but time, needs and world ticks remain frozen. The next computer click also bypasses the mission entry check (`src/main.ts:1625-1648`).

## High

2. **The newly earned contract does not unlock the computer in the same office session.** `src/main.ts:1035-1042` passes a one-time flag snapshot to the roster; `refreshRoster()` only refreshes NPC cards (`src/main.ts:1286-1307`, `src/ui/office-roster.ts:131-155`). The computer button's disabled state is set only at mount (`src/ui/office-roster.ts:84`), so the human cannot start the contract-gated mission until a remount.

3. **NPC coffee trips never complete.** The craving branch stores `pendingNpcTrips` and sets a destination (`src/main.ts:2102-2117`), but the map has no production reader or deletion path. No NPC caller reserves/activates `usePoint`; only the player E-key does (`src/main.ts:497-502`). Arrival therefore never triggers machine use, caffeine refill, or return to schedule. The world-tick projection has no needs/action question (`src/engine/world-tick.ts:323-343`), so this action is not Jev-steered either.

4. **Player-dialogue Jev curation is unwired; its session fence remains ineffective.** `openV2` renders immediately (`src/ui/dialogue.ts:611-631`), and no production caller invokes `steerTurn`; `memoOptionOrder` merely reads an empty memo (`src/ui/dialogue.ts:587-599`). The wrapper's `sessionToken` is incremented/read but never checked before `memo.set` (`src/jev/dialogue-wrapper.ts:275-301`), so reconnecting the call as written would still allow a stale result after close. The earlier aggregate perceptibility result does not establish live player-dialogue curation at this HEAD.

5. **The authored NPC-NPC deep-conversation runner is not mounted.** `src/engine/npc-npc-runner.ts:92` exports the runner, but no production module imports it. `src/engine/npc-controller.ts:1992-2029` still emits only the legacy starter/response exchange, so the six new multi-level scripts and runner behavior are unreachable in play.

## Medium

6. **Mission steering removes an unasked question and lets stale runs alter the asked set.** `src/ui/mission.ts:452-459` adds the authored default before the pick, adds a different steered ID even when it replaces the default, and mutates the set before checking `runToken`. The next request excludes a question the audience never asked; an abandoned run can poison the next run's candidate set.

7. **E-key use still passes through the WebMCP modal and auto-repeat.** The guard in `src/main.ts:481-502` excludes dialogue/help/end-day/mission and text entry, but omits `webmcpModal?.isOpen()` and `e.repeat`. A player near equipment can use it behind that modal or trigger another use after a held key's four-second coffee action completes.

8. **The required reroute E2E uses a host shim despite PR-14.** `tests/e2e/ws9a-robot-collision.spec.ts:18-38` replaces `document.modelContext` with an in-page fake registration host and calls tools through `window.__mcp`. The game movement remains real, and the command passed on retry, but this is still a shim in `tests/e2e/`, where PR-14 forbids mocked or shimmed integration surfaces.

9. **HEAD reuses the prior visible build identity.** `src/version.ts:2` still exports `v2026.10.01-05`, while `9b45bda` claims `v2026.10.01-06`. Both title and console import the stale constant (`src/ui/title.ts:6,48`, `src/main.ts:114,2338-2342`), so users cannot distinguish this committed code from the previous build as PR-13 requires.

PHASE-VERDICT: FAIL — mission controls can freeze the next day, and mission entry, NPC equipment use, Jev dialogue curation, and NPC-NPC conversations remain unwired
