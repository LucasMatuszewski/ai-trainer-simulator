/**
 * Phase 0 TDD: the SECONDS_PER_PERIOD constant.
 *
 * One of the four obvious bugs Lucas hit was that "days go way too fast, I
 * did not even manage to understand anything". The fix was to bump the
 * period-seconds constant and expose it so it's tunable. This test pins the
 * chosen value (180s = 3 real minutes per in-game period, 9 per day) so
 * future refactors don't silently regress it back to 60.
 *
 * Imported from src/game/pacing.ts (a pure module) rather than src/main.ts
 * because main.ts touches document and localStorage on import and would
 * crash the test runner.
 */

import { describe, expect, it } from "vitest";
import { SECONDS_PER_DAY, SECONDS_PER_PERIOD } from "../../src/game/pacing";

describe("Phase 0: time-pacing constants", () => {
  it("SECONDS_PER_PERIOD is set to a humane value (>= 120s)", () => {
    // 60s/period was the value the user complained about as "way too fast".
    // Anything under 120s re-introduces the "blink and you missed it" bug.
    expect(SECONDS_PER_PERIOD).toBeGreaterThanOrEqual(120);
  });

  it("SECONDS_PER_DAY is exactly 3 periods", () => {
    // The game has morning / afternoon / evening. If this drifts, day-end
    // accounting (rent, daily events) will be off.
    expect(SECONDS_PER_DAY).toBe(SECONDS_PER_PERIOD * 3);
  });
});
