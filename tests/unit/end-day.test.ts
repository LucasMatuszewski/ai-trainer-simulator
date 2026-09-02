import { describe, expect, it } from "vitest";
import { periodsUntilDayEnd } from "../../src/game/pacing";

describe("periodsUntilDayEnd (C-52)", () => {
  it("needs all four periods from a fresh morning", () => {
    expect(periodsUntilDayEnd("morning")).toBe(4);
  });

  it("needs three periods from lunch", () => {
    expect(periodsUntilDayEnd("lunch")).toBe(3);
  });

  it("needs two periods from the afternoon", () => {
    expect(periodsUntilDayEnd("afternoon")).toBe(2);
  });

  it("needs one period from the evening", () => {
    expect(periodsUntilDayEnd("evening")).toBe(1);
  });

  it("always lands on the next morning when applied to advance-time", () => {
    // Mirrors the reducer: advance-time steps morning -> lunch ->
    // afternoon -> evening -> next-day morning, so N dispatches from any period
    // must cross the day boundary exactly once.
    const order = ["morning", "lunch", "afternoon", "evening"] as const;
    for (const period of order) {
      let timeOfDay: (typeof order)[number] = period;
      let day = 1;
      for (let i = 0; i < periodsUntilDayEnd(period); i += 1) {
        const index = order.indexOf(timeOfDay);
        if (index < order.length - 1) {
          timeOfDay = order[index + 1]!;
        } else {
          day += 1;
          timeOfDay = "morning";
        }
      }
      expect(timeOfDay).toBe("morning");
      expect(day).toBe(2);
    }
  });
});
