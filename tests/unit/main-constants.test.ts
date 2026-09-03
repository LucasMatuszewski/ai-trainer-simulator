/**
 * C-67 TDD: the four-period pacing table.
 *
 * Pins the approved Morning/Lunch/Afternoon/Evening durations and the
 * ten-minute active day so future refactors cannot silently collapse Lunch
 * back into Afternoon or lengthen the whole game loop.
 *
 * Imported from src/game/pacing.ts (a pure module) rather than src/main.ts
 * because main.ts touches document and localStorage on import and would
 * crash the test runner.
 */

import { describe, expect, it } from "vitest";
import {
  PERIOD_DEFINITIONS,
  PERIOD_ORDER,
  SECONDS_PER_DAY,
} from "../../src/game/pacing";

describe("C-67: time-pacing constants", () => {
  it("uses the approved four-period 3/2/3/2 schedule", () => {
    expect(PERIOD_ORDER).toEqual(["morning", "lunch", "afternoon", "evening"]);
    expect(PERIOD_DEFINITIONS.morning.durationSeconds).toBe(180);
    expect(PERIOD_DEFINITIONS.lunch.durationSeconds).toBe(120);
    expect(PERIOD_DEFINITIONS.afternoon.durationSeconds).toBe(180);
    expect(PERIOD_DEFINITIONS.evening.durationSeconds).toBe(120);
  });

  it("keeps the full in-game day at exactly ten active real minutes", () => {
    expect(SECONDS_PER_DAY).toBe(600);
  });
});
