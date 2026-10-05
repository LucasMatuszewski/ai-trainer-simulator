# Formal closure re-verdict — Waves 2+3 and NPC-NPC v1.1

Reviewed branch `feat/jev-npc-decision-steering`, HEAD `7fcde06`, visible source build `v2026.10.04-05`. No implementation edits, commits, pushes, Beads commands, or delegates were used.

## Verification

- `pnpm typecheck`: exit 0.
- `pnpm test`: exit 0; 107 files, 1,325 tests passed, including the six controller deep-conversation tests.
- `pnpm test:e2e --project=chromium tests/e2e/ws9a-robot-collision.spec.ts`: exit 1; 1 passed, 1 failed after retry (6.7 minutes). Furniture passed in 52.1 s. Reroute attempt 1 failed at `:177`: "room route never brought the robot near the kitchen", expected <6 m, received 23.269937687926884 m. Retry failed at `:233`: `page.evaluate: TypeError: Cannot read properties of undefined (reading 'inspectNpcs')`. Logs: `/tmp/final-typecheck.log`, `/tmp/final-tests.log`, `/tmp/final-e2e.log`. HEAD remained `7fcde06` throughout.
- Existing Wave-4 perceptibility evidence (`tests/eval-results/perceptibility-gate.json`) still records PASS: 54 applied decisions, 11 live requests, 13.6% fallback, zero off-mode requests. No new aggregate perceptibility regression established; gate not rerun. That evidence does not repair the defects below.

## Findings by severity

### Critical

1. **Ending the day during a mission can permanently pause the next office session.** `src/main.ts:505` allows Z while the mission is open; its guard at `:510` omits the mission. `endDay()` at `src/main.ts:1403` closes dialogue but never closes the mission before the summary removes its DOM. `src/ui/mission.ts:191` defines open as `wrap !== null`, so the detached mission remains open. After summary Continue, the clock gate at `src/main.ts:2095` still blocks time/needs/world ticks, and the computer entry at `:1636` refuses that mission path. This is an unrepaired finding from the existing final-result audit.

### High

2. **Earning the contract still does not unlock the human mission entry in the current office session.** `src/main.ts:1050` passes a flag snapshot when mounting the roster; `src/ui/office-roster.ts:84` disables the computer using only that snapshot. `refreshRoster()` at `src/main.ts:1295` refreshes NPC cards, and `src/ui/office-roster.ts:131` never refreshes the computer. Completing Bartek's contract dialogue therefore leaves the button disabled until remount. This repeats closure finding 4.

3. **Purposeful coffee use is only partially repaired: no return, lost busy trips, and no judgment-driven action.** `src/main.ts:2124` installs the coffee override. Arrival now calls `usePoint` and `activateAction`, but `:2147` deletes the pending trip even if the machine returns busy. Completion at `src/main.ts:680` refills caffeine without calling `setOverride(npcId, null)`. The controller retains overrides until a period/day transition; the intended return operation is explicitly documented in `src/engine/interaction-points.ts:444`. Thus successful drinkers remain at the machine, and busy arrivals can lose their use attempt while retaining that placement. The world-tick projection/questions at `src/engine/world-tick.ts:323` still contain no needs/action choice; this remains a hardcoded craving check rather than the prior verdict's required Jev-steered walk/use/return flow. Wave-2 findings 2/3 and closure finding 3 are not fully repaired.

**Required E2E gate remains failed.** `tests/e2e/ws9a-robot-collision.spec.ts:177` failed robot setup on the first attempt, and `:233` lost the game inspection API during retry. This is not the accepted retry-passed traversal sampling variance, and neither error proves a collision. Both required tests did not pass, so the formal gate cannot close. This repeats the prior Wave-3/closure E2E gate finding with fresh evidence.

### Medium

4. **Dialogue session fencing still does not fence memo writes.** `src/jev/dialogue-wrapper.ts:275` writes after the awaited request without capturing/checking a session token. `nextSession()` at `:282` only increments a counter, and `resetSession()` at `:301` only clears existing entries. Escape/close at `src/ui/dialogue.ts:264` increments that token without clearing the memo. An old request can repopulate it after close/reset; reopening the same NPC/topic/used-set reads the stale curation. The UI callback token guard prevents its immediate stale render, but cannot prevent later consumption. Wave-2 finding 5 / closure finding 6 remain.

5. **Mission candidate tracking still excludes an unasked question and accepts mutations from stale runs.** `src/ui/mission.ts:452` records the authored default before awaiting the pick, then `:457` records a different chosen ID before checking `runToken` at `:459`. Replacing the default consumes both IDs in the UI set although the runtime consumed only the selected question. An abandoned run's late answer can also alter the next run's shared set. `steerQuestionPick()`'s boolean result at `:469` is ignored, so even an invalid/unapplied pick can be recorded. Closure finding 7 remains.

6. **Rendezvous staging leaves its participants pinned after the conversation ends.** `src/engine/npc-controller.ts:790` stores persistent overrides for both participants. `settleDeepRun()` at `:699` deletes the runner and settles its reaction, but never releases the staging overrides or replans their schedules. Natural completion, hush, and abandonment therefore leave NPCs at the rendezvous until another owner/period transition intervenes. `rendezvousFree()` at `:778` subsequently excludes those same overridden NPCs. Track staging ownership and release only its overrides on settlement. This is a new regression in the rendezvous integration.

7. **Equipment use still never plays its registered interaction sound.** `src/engine/interaction-points.ts:279` activates by changing only lifecycle; its update/completion path at `:299` emits no audio. The player caller at `src/main.ts:500`, NPC caller at `:2145`, and completion listener at `:680` likewise never call positional audio with the definition's `sfxId` and point ID. Registering sources/assets is not playback: coffee and whiteboard use are silent, and NPC purposeful coffee's comment claiming sound is inaccurate. This is a remaining Wave-2 interaction scope gap.

8. **E-key equipment use bypasses the WebMCP modal and accepts key autorepeat.** `src/main.ts:481` checks several overlays but omits `webmcpModal?.isOpen()` and `e.repeat`. Holding E can start another use after the first completes; pressing E near equipment can use it behind the WebMCP modal. This remains from the existing final-result audit.

9. **The required E2E still installs a fake WebMCP host, contrary to PR-14.** `tests/e2e/ws9a-robot-collision.spec.ts:18` replaces `document.modelContext` using `addInitScript`, registers tools into an in-page Map, and invokes them through its fabricated `window.__mcp`. Game motion is real, but the host integration is shimmed in `tests/e2e/`, where the explicit no-shim rule applies. Use real browser host support or an existing real game control/debug surface. This remains from the existing final-result audit.

## Prior findings rechecked individually

| Prior verdict | Finding | HEAD result |
| --- | --- | --- |
| Wave 2 | 1 — onboarding quest flags | Repaired: Renata/Bartek legacy gates remain at `src/main.ts:1580`. |
| Wave 2 | 2 — player activation / NPC use | Player activation repaired; NPC return/steering incomplete (finding 3). |
| Wave 2 | 3 — needs rate/reset/action | Rate and daily reset repaired at `src/main.ts:2108` / `:1407`; action steering incomplete (finding 3). |
| Wave 2 | 4 — repeated destination judgments | Repaired: fresh upcoming-period memo skips at `src/engine/world-tick.ts:389`. |
| Wave 2 | 5 — stale dialogue | Unrepaired (finding 4). |
| Wave 2 | 6 — malformed exchange IDs | Repaired: exact sent-candidate membership at `src/engine/world-tick.ts:519`. |
| Wave 3 | 1 — mission mount/clock | Mounted at `src/main.ts:1639`; clock blocker present at `:2095`; end-day escape is finding 1. |
| Wave 3 | 2 — required E2E | Independently rerun; final command outcome recorded below. |
| Wave 3 | 3 — five speech points | Repaired: all five alternate with questions in `src/content/missions.ts:332`. |
| Wave 3 | 4 — Dawid arc | Repaired: v2 requires `ceo-reviewed` at `src/main.ts:1585`; legacy introduction/offer/review branches remain. |
| Wave 3 | 5 — pointer Continue | Repaired: button and listener at `src/ui/mission.ts:287`. |
| Wave 3 | 6 — partial score fallback | Repaired: valid adjustment map used at `src/ui/mission.ts:503`. |
| Wave 3 | 7 — exhausted question candidates | Filtering present, tracking still wrong (finding 5). |
| Wave 3 | 8 — atomic rewards | Repaired: one `mission-complete` dispatch at `src/main.ts:1648`, one reducer transaction at `src/game/state.ts:193`. |
| Closure rerun | 1 — atomic rewards | Repaired as above. |
| Closure rerun | 2 — full Dawid arc | Repaired as above. |
| Closure rerun | 3 — NPC coffee | Partial repair only (finding 3). |
| Closure rerun | 4 — computer unlock | Unrepaired (finding 2). |
| Closure rerun | 5 — required E2E | Independently rerun; final command outcome recorded below. |
| Closure rerun | 6 — memo fencing | Unrepaired (finding 4). |
| Closure rerun | 7 — question tracking | Unrepaired (finding 5). |

The supplied closure-rerun file contains seven numbered findings; all seven were checked. The additional existing final-result audit was also read: live dialogue curation is now reconnected (`src/ui/dialogue.ts:631`), the NPC-NPC runner is mounted, and the visible build identity is now current. Its mission orphan, computer unlock, question tracking, E-key guard, and E2E shim findings remain above.

## NPC-NPC v1.1 checks

- Deep-first eligible selection and `bothSettled` guard: `src/engine/npc-controller.ts:2311`.
- Initial rendezvous 45–90 s, cooldown 90–150 s, quiet gate, visibility/arrival-in-practice, override/path/kitchen/canSpeak exclusions: `:767`, `:771`, `:2391`.
- Production live relationship/flags reads and reaction dispatch: `src/main.ts:701`.
- Exactly one controller settlement per removed run; neutral/null excluded: `src/engine/npc-controller.ts:699`. Six new integration tests pass, including completed non-neutral settlement and early hush with no delivered reaction.
- Player-dialogue hush: `:2433`; abandonment at all three transitions: `:1342`, `:1398`, `:1466`.
- `getActiveDeepConversations()` / `getDeepDebug()` and browser hooks: `:2460`, `:2471`, `src/main.ts:2268`.
- Social nightly regression, live band provider, save-v2 migration/persistence, exact candidate-ID validation, and real dialogue curation calls are present; no additional supported finding from those seams. Accepted nudge exhaustion/social dispatch residue is not reported.

PHASE-VERDICT: FAIL — mission day-end can orphan a permanent clock blocker; mission entry, NPC use/return, dialogue fencing, and question tracking remain incomplete, with rendezvous ownership gaps and a failed required E2E gate
