import { describe, expect, it } from "vitest";

import {
  advancePeriodElapsed,
  formatGameClock,
  shouldAdvanceSimulationClock,
} from "../../src/game/pacing";

describe("C-67 variable-period simulation clock", () => {
  it("crosses from the 180-second morning into lunch", () => {
    expect(advancePeriodElapsed("morning", 179, 2)).toEqual({
      periodsAdvanced: 1,
      elapsedInPeriod: 1,
    });
  });

  it("crosses multiple unequal periods without losing elapsed time", () => {
    expect(advancePeriodElapsed("morning", 170, 320)).toEqual({
      periodsAdvanced: 3,
      elapsedInPeriod: 10,
    });
  });

  it("renders quarter-hour game time from active elapsed seconds", () => {
    expect(formatGameClock("morning", 0)).toBe("09:00");
    expect(formatGameClock("morning", 15)).toBe("09:15");
    expect(formatGameClock("lunch", 45)).toBe("12:45");
    expect(formatGameClock("afternoon", 165)).toBe("16:45");
    expect(formatGameClock("evening", 105)).toBe("18:45");
  });

  it("advances only in an unblocked office simulation", () => {
    expect(shouldAdvanceSimulationClock({ screen: "office" })).toBe(true);
    expect(shouldAdvanceSimulationClock({ screen: "office", dialogueOpen: true })).toBe(false);
    expect(shouldAdvanceSimulationClock({ screen: "office", cinematicPlaying: true })).toBe(false);
    expect(shouldAdvanceSimulationClock({ screen: "office", helpOpen: true })).toBe(false);
    expect(shouldAdvanceSimulationClock({ screen: "summary" })).toBe(false);
  });
});
