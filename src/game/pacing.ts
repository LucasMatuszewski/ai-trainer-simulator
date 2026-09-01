/**
 * Game-time pacing constants.
 *
 * Centralized here so the value can be referenced from main.ts and tested in
 * isolation. The Phase 0 fix for "days go way too fast" was to bump
 * SECONDS_PER_PERIOD from 60 to 180 (so a day is ~9 real minutes instead of
 * ~3). This module is the single source of truth.
 *
 * Why 180s/period?
 *   - 60s/period is what shipped pre-Phase 0; the user reported it as "blink
 *     and you missed it - the day ended before I read the dialogue".
 *   - 180s gives the player time to read intro copy, click 2-3 NPCs, do a
 *     minigame, and end the day without rushing. Roughly 9 real minutes for
 *     a full in-game day.
 *   - If we ever need a "fast" mode for testing or for an end-game state
 *     where you want hours to compress, override the constant via a debug
 *     flag rather than editing this file.
 */
export const SECONDS_PER_PERIOD = 180;
export const SECONDS_PER_DAY = SECONDS_PER_PERIOD * 3;

/**
 * C-52: how many `advance-time` dispatches it takes to reach the next
 * day's morning from a given period. The reducer steps morning ->
 * afternoon -> evening -> next-day morning, so ending the day early
 * from the morning costs all three remaining periods.
 */
export function periodsUntilDayEnd(timeOfDay: "morning" | "afternoon" | "evening"): number {
  return 3 - ["morning", "afternoon", "evening"].indexOf(timeOfDay);
}
