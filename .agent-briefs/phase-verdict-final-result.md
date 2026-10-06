# Formal closure re-verdict — final HEAD, all waves

Reviewed `feat/jev-npc-decision-steering` at `a184da7`, build `v2026.10.06-02`. HEAD remained unchanged throughout. No implementation edits, commits, pushes, Beads commands, or delegates were used. A temporary adversarial test was removed after execution.

## Verification

- `pnpm typecheck`: exit 0.
- `pnpm test`: exit 0; 108 files, 1,335 tests passed.
- Fresh `pnpm build`: exit 0. Stopped the previous 4173 listener and started a fresh `pnpm preview` on 4173.
- `pnpm test:e2e --project=chromium tests/e2e/ws9a-robot-collision.spec.ts`: exit 0; **2/2 passed on their first attempts**, total 2.0 minutes. Furniture: 38.1 seconds; reroute: 1.4 minutes. No E2E shim, mock, or network replacement was installed.
- Separate adversarial controller test: existing seven deep-conversation cases passed; replacement-pin survival case failed reproducibly. Log: `/tmp/final-verdict-adversarial.log`. Temporary file removed.
- Other logs: `/tmp/final-verdict-unit.log`, `/tmp/final-verdict-build.log`, `/tmp/final-verdict-e2e.log`.
- Existing Wave-4 perceptibility gate remains PASS (`tests/eval-results/perceptibility-gate.json`: 54 applied decisions, 11 live requests, 13.6% fallback, zero off-mode requests). No aggregate perceptibility regression established; not rerun.

## Findings by severity

### High

1. **Rendezvous settlement still deletes an override subsequently owned by another system.** `src/engine/npc-controller.ts:719-724` treats membership in `stagedByRendezvous` as sufficient authority to delete the current override. Public `setOverride` at `src/engine/npc-controller.ts:2497-2525` replaces that override without revoking rendezvous ownership. If a coffee trip, event, or another caller redirects a staged participant during its deep run, interruption/settlement deletes the replacement and replans the NPC home. The ownership fix therefore repairs normal completion but does not protect replacement pins. Independent reproduction: use the existing two-NPC harness with `lcg(41)`, release initial placements, drive until the staged Kasia/Pawel deep run starts, call `setOverride("pawel", {position:{x:0,y:0,z:-7},face:0,state:"at-desk"})`, and drive 15 seconds. Pawel ends at **z = 3.5901844177159776**, rather than the requested south destination (assertion `z < -6` fails). Clear staging ownership when an external override replaces it, or compare the current override with the exact staging-owned value before releasing it. This is the remaining ownership gap in prior final finding 6.

### Medium

2. **A valid Jev “stay” decision is consumed and then overridden by the deterministic coffee fallback.** `src/main.ts:2172` tests only whether the consumed action memo equals `"coffee-machine"`; `"stay"` becomes indistinguishable from no memo. If no coffee choice was selected, `src/main.ts:2178-2184` scans all craving NPCs again, including those explicitly judged to stay, and sends one to the machine. Thus a successful, confident “keep working” judgment cannot prevent a craving NPC's trip. The wrapper deliberately distinguishes `"stay"` from absence (`src/engine/world-tick.ts:890-899`, pinned by the “records a stay decision too” unit test), but production discards that distinction. Preserve each consumed result for the current scan and apply deterministic fallback only to NPCs with no valid decision. This is a new integration defect in the purposeful-action surface; coffee-choice execution itself is wired.

## Prior findings rechecked individually

| Prior verdict | Finding | Final HEAD result |
| --- | --- | --- |
| Wave 2 | 1: inaccessible Day-1 onboarding | Repaired: Renata/Bartek legacy gates retain required quest flags. |
| Wave 2 | 2: player activation and absent NPC use | Activation and NPC reserve/use/completion/return now wired; action integration exception is finding 2 above. |
| Wave 2 | 3: needs rate/reset and absent steering | Correct dt and daily reset retained; banded projection, action choice and memo exist; stay-consumption exception above. |
| Wave 2 | 4: repeated destination judgments | Fresh upcoming-period memo skips retained. |
| Wave 2 | 5: late dialogue answer | Awaited request now checks captured session before memo write; stale UI callback also fenced. |
| Wave 2 | 6: malformed exchange IDs | Exact sent-candidate membership retained. |
| Wave 3 | 1: mission unreachable/clock unblocked | Contract-gated mission mount and clock blocker retained. |
| Wave 3 | 2: failed E2E | Fresh required gate passed 2/2. |
| Wave 3 | 3: missing speech points | Five authored points alternate with questions. |
| Wave 3 | 4: bypassed Dawid arc | V2 requires `ceo-reviewed`; legacy introduction/offer/review remain reachable. |
| Wave 3 | 5: absent pointer Continue | Continue button invokes advance flow. |
| Wave 3 | 6: partial score fallback discarded | Valid adjustment map used despite partial fallback. |
| Wave 3 | 7: used questions advertised | Asked-set filtering retained; only applied/delivered question recorded after token check. |
| Wave 3 | 8: non-atomic payout | Production dispatches one `mission-complete`; reducer combines rewards and marker in one persisted transaction. |
| Closure rerun | 1: non-atomic reward | Repaired as above. |
| Closure rerun | 2: Dawid arc | Repaired as above. |
| Closure rerun | 3: NPC coffee/steering | Lifecycle and return repaired; purposeful surface exists, with finding 2 exception. |
| Closure rerun | 4: computer unlock | `refreshRoster` updates `setComputerUnlocked` from current contract flag. |
| Closure rerun | 5: required E2E | Passed as above. |
| Closure rerun | 6: memo fencing | Captured token now fences post-await memo writes. |
| Closure rerun | 7: mission tracking/fencing | Applied-pick bookkeeping follows run-token check; unasked default not consumed alongside replacement. |
| Final at 7fcde06 | 1: endDay mission orphan | Z guard includes mission; `endDay` closes mission before summary removal. |
| Final at 7fcde06 | 2: computer unlock | Repaired as above. |
| Final at 7fcde06 | 3: coffee return/busy/steering | Owned trip release and bounded busy retry present; valid stay handling remains finding 2. |
| Final at 7fcde06 | required E2E failure | Passed as above. |
| Final at 7fcde06 | 4: dialogue memo fencing | Repaired for in-flight post-close writes. |
| Final at 7fcde06 | 5: mission asked-set fencing | Repaired as above. |
| Final at 7fcde06 | 6: rendezvous release | Normal release repaired; replacement ownership remains finding 1. |
| Final at 7fcde06 | 7: interaction SFX | Player and NPC activation call `playInteractionSfx`. |
| Final at 7fcde06 | 8: E autorepeat/modal bypass | Repeat, WebMCP modal and mission guards present. |
| Final at 7fcde06 | 9: E2E fake host | Removed; calls real bridge/tool implementations through game QA handle. |

## Additional scope checks

Deep-first selection retains `bothSettled`. Staging retains quiet gating, initial 45–90-second delay, 90–150-second cooldown, and override/path/kitchen/canSpeak exclusions. Settlement removes the run before its one non-neutral reaction callback; production dispatches `apply-social-reaction`. Player-dialogue hush, all three transition abandonment calls, active/debug hooks, and the seven-case controller suite are present. The script pool contains 12 authored conversations; schema/content tests pass. QA movement and tick surfaces invoke real controller/companion logic. Social nightly regression, live band reads, save-v2 migration/persistence, dialogue curation and mission entry/reward wiring were inspected without additional supported findings. Known-accepted residue is excluded.

PHASE-VERDICT: FAIL — rendezvous settlement can erase replacement pins, and valid purposeful “stay” judgments are overridden by fallback
