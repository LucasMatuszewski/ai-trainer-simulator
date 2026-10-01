# Wave 3 phase QA verdict (HEAD `6f33b03`)

Verification: `pnpm typecheck` passed; `pnpm test` passed (101 files, 1,234 tests). Port 5173 served `v2026.09.30-02`. The required Chromium E2E command exited 1: the furniture-crossing test passed on retry; the NPC reroute test failed on both attempts because no qualifying traversal was observed. The latter did not demonstrate a collision.

## Blockers

1. **WS7 is unreachable in the game and cannot pause the clock.** `src/ui/mission.ts:162` exports `mountMissionUi`, but no production module imports or calls it; `src/main.ts:1964-1969` passes no mission-open blocker to `shouldAdvanceSimulationClock` (`src/game/pacing.ts:71-84`). Thus no player action starts the conference speech, the `unlockFlag` in `src/content/missions.ts:106` is not enforced in a live flow, and an eventual overlay mount would let office time and world ticks continue. Unit tests mount the UI directly and miss this integration seam.
2. **Required E2E gate failed on its allowed retry.** `tests/e2e/ws9a-robot-collision.spec.ts:219-272` observed zero office-to-kitchen reroute provers on both attempts. The retry's error snapshot showed `Day 1 Summary`; the loop calls `debugSkipPeriod()` at line 220 but does not dismiss that blocking screen before sampling later windows. This is a failure to exercise/verify rerouting, not evidence of a new collision or a Wave 3 collision regression. The first test's initial no-travel sample passed on retry and is the accepted sampling residue.

## High

3. **The speech silently drops two of its five talking points.** `src/game/mission.ts:305-320` advances past every consecutive `point`. The authored script in `src/content/missions.ts:322-331` has consecutive pairs at positions 0-1 and 5-6, so `pt-spreadsheets` and `pt-qa` are never shown. This violates AC-23's five-point sequence. The UI test's comments at `tests/unit/ui/mission.test.ts:128-129` assume both Spaces advance a point, but the second press occurs on an unanswered question and does nothing.
4. **The new Dawid pool bypasses his existing CEO story arc.** `src/content/npc-content/dialogue-pools.ts:57` registers Dawid, and `src/main.ts:1484-1495` gates only Renata and Bartek before choosing v2. Dawid therefore never reaches the legacy `first-meeting`, `give-task`, or `performance-review` branches at `src/main.ts:1502-1511`; their `ceo-met` and `ceo-reviewed` flags are not set. The new pool can instead set `ceo-workshop-offered` directly (`src/content/npc-content/dialogue-pool-dawid.ts:227-233`), skipping the introductory story and gating its own `quest:ceo-met` reply forever on a fresh save.

## Medium

5. **Mouse/button play dead-ends after each talking point and answer.** `src/ui/mission.ts:275-295` renders an Abandon button and answer option buttons, but no Continue/Advance button; `src/ui/mission.ts:518-522` only advances with Space. This contradicts the brief's keyboard-and-buttons flow and strands pointer-only players.
6. **A partial Jev score fallback discards valid sibling judgments.** The wrapper deliberately returns valid adjustments with `fallback: true` when one option is low-confidence (`src/jev/mission-wrapper.ts:316-360`; pinned by `tests/unit/jev/mission-wrapper.test.ts:232-248`). The UI accepts adjustments only when `!scores.fallback` (`src/ui/mission.ts:468-473`), so one rejected option forces all four answers back to authored scores.
7. **Question steering sends already-used questions again.** `src/ui/mission.ts:398-420` submits the plant's entire question array at every question step. The runtime tracks and rejects exhausted IDs (`src/game/mission.ts:249-255`), but the second question's Jev request still advertises the first question as available; a valid-looking pick of it silently falls back. The wrapper's single-remaining-candidate optimization (`src/jev/mission-wrapper.ts:150-154`) never activates in this live request shape.
8. **Reward persistence is not atomic across cash, credibility, and the completion marker.** `src/game/mission.ts:432-444` orders cash and stat actions before the flag; `src/ui/mission.ts:166-170` dispatches them separately, and each dispatch saves immediately (`src/game/state.ts:45-58`). A browser interruption after the cash save but before the flag save leaves a paid, incomplete mission that can pay again after reload. Ordinary repeated UI input is guarded, but AC-25's durable exactly-once claim does not hold at this interruption point.

## Checks without findings

The 15 registered pools validate; candidate IDs and tag values match the turn builder's vocabulary. The new 3-topic pools have enough eligible authored options for normal pivot and eventual exhaustion. Renata and Bartek retain their first-run onboarding gates (`src/main.ts:1479-1495`). The mission runtime blocks advancing an unanswered question, bounds score adjustments to -1/0/+1, and uses authored scores on full timeout or low-confidence fallback. Aborting or reloading an in-flight run does not itself persist completion.

PHASE-VERDICT: FAIL — WS7 is not playable, core speech/CEO flows regress, and the required reroute E2E gate fails after retry.
