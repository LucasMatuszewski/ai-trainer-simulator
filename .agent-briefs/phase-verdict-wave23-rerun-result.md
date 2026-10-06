# Waves 2+3 formal closure re-run

Reviewed at HEAD `cdea14d` (`feat/jev-npc-decision-steering`). The run began at `a267117`; `df48e8b` and `cdea14d` landed while the Chromium E2E was running. The later commits changed Dawid's gate and authored content, but not the collision test or collision implementation. The working tree was clean before this report.

## Verification

- `pnpm typecheck`: exit 0 at `cdea14d`.
- `pnpm test`: exit 0 at `cdea14d`; 101 files, 1,231 tests passed. The suite also passed with 1,231 tests before the intervening commits.
- `pnpm test:e2e --project=chromium tests/e2e/ws9a-robot-collision.spec.ts`: exit 1; 1 passed, 1 failed. The furniture test passed on its first attempt. The reroute test's first attempt found zero qualifying office-to-kitchen traversals (`tests/e2e/ws9a-robot-collision.spec.ts:280`); retry failed at `:233` with `page.evaluate: Execution context was destroyed, most likely because of a navigation`. The test now dismisses Day Summary at `:225-228`. Source edits landed during this E2E run, so the retry's navigation cannot be attributed to a collision defect from this evidence. The required E2E gate remains unverified at final HEAD.

## Findings by severity

### High

1. **The live mission reward is still not atomic.** `src/game/mission.ts:432-447` returns separate flag, cash, and credibility actions. Production dispatches each separately at `src/main.ts:1616-1619`, and `src/game/state.ts:45-58` saves after each dispatch. An interruption after the first save records completion without its reward. The atomic `mission-complete` reducer branch at `src/game/state.ts:193-203` is never dispatched. Flag-first ordering prevents double pay, but does not provide the requested all-or-nothing completion.

2. **Dawid's CEO arc is bypassed again at final HEAD.** `src/main.ts:1558-1567` opens his v2 pool as soon as `ceo-met` is true, before the legacy `give-task` and `performance-review` branches at `src/main.ts:1581-1583` can run. Those branches set `ceo-workshop-offered` and `ceo-reviewed` (`src/content/dialogues.ts:793-796,1029-1040`). Renaming the v2 task flag to `dawid-graph-memo` does not make the skipped legacy branches reachable.

3. **NPC coffee trips never use the machine.** At `src/main.ts:2079-2089`, a craving NPC gets only a movement override. The only production `usePoint` / `activateAction` call is the player's E-key path at `src/main.ts:478-483`. `suggestNpcUse` is pure trip data (`src/engine/interaction-points.ts:458-475`), so the NPC never enters the reserved/in-use lifecycle, no completion sound/effect fires, and the NPC's caffeine cannot be restored by the completion listener at `src/main.ts:661-669`. The world-tick projection also has no needs/action question (`src/engine/world-tick.ts:323-333`), so this behavior is not Jev-steered.

4. **The computer remains disabled after a Day-1 contract until the office UI remounts.** `src/main.ts:1016-1022` passes a snapshot of `got-acme-contract` into the roster. `src/ui/office-roster.ts:84,131-155` sets the button's disabled state only at mount; `refreshRoster()` (`src/main.ts:1267-1288`) refreshes NPC cards, not that button. Bartek can set the contract flag without remounting the roster, so the intended human entry to the mounted mission at `src/main.ts:1603-1623` is unavailable in that office session. The WebMCP `openMinigame` hook is a separate agent path.

5. **The required Chromium reroute gate failed on both attempts.** The first attempt never exercised its traversal assertion (`tests/e2e/ws9a-robot-collision.spec.ts:263-280`); the retry lost its execution context while sampling (`:231-236`). This does not prove that an NPC clipped the robot, but it prevents a pass verdict for the required gate.

### Medium

6. **Dialogue session tokens do not fence memo writes.** Closing v2 dialogue increments a token (`src/ui/dialogue.ts:261-265`), but `steerTurn` does not capture or compare it before `memo.set` (`src/jev/dialogue-wrapper.ts:144-145,275-285`). Its memo is cleared only on normal `finishV2()` (`src/ui/dialogue.ts:756-759`), not on Escape/close. A pending result can therefore populate the memo after close; reopening the same NPC/topic and unused-option set can consume that prior session's curation. The UI callback no longer re-renders mid-turn, but the underlying stale memo remains.

7. **Mission question tracking marks unasked questions as used and can accept a stale run's ID.** `src/ui/mission.ts:452` adds the authored default before the steering response. If Jev selects another question, `:456-457` adds that ID too, so the next request at `:443-445` excludes both although only one was asked. The steered ID is added before the run-token check at `:459`, so a late response from an abandoned run can also poison a newly begun run's set. The runtime itself still prevents duplicate delivered questions (`src/game/mission.ts:291-295`); this finding concerns the Jev candidate request and its fallback behavior.

## Re-verified repairs without findings

- **Wave 2:** Renata and Bartek remain on legacy onboarding trees until `renata-tut-finished` / `got-acme-contract` (`src/main.ts:1551-1567`, `src/content/quests.ts:60-76`); the player's E-key path now activates a successful `usePoint` action (`src/main.ts:478-483`); needs decay by in-game minutes at 1x inside the clock gate and reset at day end (`src/main.ts:1375-1379,2053-2074`); world-tick skips a fresh upcoming-period destination memo (`src/engine/world-tick.ts:387-398`); exchange IDs require exact candidate membership (`src/engine/world-tick.ts:512-526`). The NPC equipment and dialogue memo exceptions are findings above.
- **Wave 3:** The mission UI is mounted from `openDebugMinigame()` after contract and its open state blocks the simulation clock (`src/main.ts:1603-1624,2053-2059`), subject to the disabled-button finding above. The speech script alternates all five points with questions (`src/content/missions.ts:327-336`), and the pointer Continue button calls `advanceOrFinish()` (`src/ui/mission.ts:285-299`). Partial score fallback retains valid per-option adjustments (`src/ui/mission.ts:492-500`). The Day Summary dismissal is present in the E2E (`tests/e2e/ws9a-robot-collision.spec.ts:219-229`). Flag-first ordering is present, but is not atomic. Dawid and question tracking have the findings above.
- The 15 registered v2 NPC pools pass their schema/uniqueness checks in `tests/unit/content/npc-dialogue-pools.test.ts`; `tests/unit/ui/mission.test.ts` exercises the UI speech and result flow. These passing unit tests do not exercise the production entry-button state or single-save payout.

PHASE-VERDICT: FAIL — Dawid's arc is bypassed, NPC use and mission entry/payout remain incomplete, dialogue and question fencing remain faulty, and the required E2E gate failed.
