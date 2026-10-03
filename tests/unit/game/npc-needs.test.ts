/**
 * WS6 (ADR-0009 D-53 / PRD AC-22): the runtime-only NPC needs model.
 *
 * NPCs act on their OWN needs (an authored per-NPC needs model decaying
 * during the day), not on player stats. Caffeine decays 8/h-equivalent,
 * social 6/h (ADR constants); both clamp to 0..100; the projector (Jev)
 * later reads named bands, never raw numbers. Needs are runtime-only:
 * resetNeedsDaily() is the whole persistence story — nothing is saved.
 */
import { describe, expect, it } from "vitest";
import {
  CAFFEINE_CRAVING_BELOW,
  CAFFEINE_DECAY_PER_HOUR,
  CAFFEINE_LOW_BELOW,
  SOCIAL_DECAY_PER_HOUR,
  caffeineBand,
  createNeedsTable,
  decayNeeds,
  initialNeeds,
  resetNeedsDaily,
  type NpcNeeds,
} from "../../../src/game/npc-needs";

describe("npc-needs constants (ADR-0009 D-53)", () => {
  it("decays caffeine by 8 per hour-equivalent", () => {
    expect(CAFFEINE_DECAY_PER_HOUR).toBe(8);
  });

  it("decays social by 6 per hour-equivalent", () => {
    expect(SOCIAL_DECAY_PER_HOUR).toBe(6);
  });

  it("band thresholds are 25 (craving) and 60 (low)", () => {
    expect(CAFFEINE_CRAVING_BELOW).toBe(25);
    expect(CAFFEINE_LOW_BELOW).toBe(60);
  });
});

describe("decayNeeds", () => {
  it("decays exactly per the ADR hourly rates over 60 in-game minutes", () => {
    const decayed = decayNeeds({ caffeine: 100, social: 100 }, 60);
    expect(decayed.caffeine).toBeCloseTo(92, 10);
    expect(decayed.social).toBeCloseTo(94, 10);
  });

  it("decays proportionally for partial hours (30 min = half an hour)", () => {
    const decayed = decayNeeds({ caffeine: 100, social: 100 }, 30);
    expect(decayed.caffeine).toBeCloseTo(96, 10);
    expect(decayed.social).toBeCloseTo(97, 10);
  });

  it("accumulates across calls (a 10h day of 60-min steps loses 80 caffeine)", () => {
    let needs: NpcNeeds = { caffeine: 100, social: 100 };
    for (let hour = 0; hour < 10; hour += 1) {
      needs = decayNeeds(needs, 60);
    }
    expect(needs.caffeine).toBeCloseTo(20, 10);
    expect(needs.social).toBeCloseTo(40, 10);
  });

  it("never decays below 0", () => {
    const decayed = decayNeeds({ caffeine: 1, social: 0.5 }, 10_000);
    expect(decayed.caffeine).toBe(0);
    expect(decayed.social).toBe(0);
  });

  it("never grows above 100 (values are clamped into 0..100)", () => {
    const decayed = decayNeeds({ caffeine: 100, social: 100 }, -60);
    expect(decayed.caffeine).toBeLessThanOrEqual(100);
    expect(decayed.social).toBeLessThanOrEqual(100);
    expect(decayed.caffeine).toBeGreaterThanOrEqual(0);
  });

  it("does not mutate its input (pure)", () => {
    const before: NpcNeeds = { caffeine: 80, social: 60 };
    decayNeeds(before, 120);
    expect(before).toEqual({ caffeine: 80, social: 60 });
  });
});

describe("caffeineBand — the projector language for Jev", () => {
  it("reads 'craving' below 25", () => {
    expect(caffeineBand(0)).toBe("craving");
    expect(caffeineBand(24.9)).toBe("craving");
  });

  it("reads 'low' from 25 up to (not including) 60", () => {
    expect(caffeineBand(25)).toBe("low");
    expect(caffeineBand(50)).toBe("low");
    expect(caffeineBand(59.9)).toBe("low");
  });

  it("reads 'ok' from 60 up", () => {
    expect(caffeineBand(60)).toBe("ok");
    expect(caffeineBand(100)).toBe("ok");
  });
});

describe("daily reset (runtime-only needs, never saved)", () => {
  it("starts every NPC fresh at full caffeine and social", () => {
    expect(initialNeeds()).toEqual({ caffeine: 100, social: 100 });
    expect(resetNeedsDaily()).toEqual({ caffeine: 100, social: 100 });
  });

  it("returns a fresh object each call (callers may mutate their copy)", () => {
    const a = resetNeedsDaily();
    const b = resetNeedsDaily();
    expect(a).not.toBe(b);
    a.caffeine = 5;
    expect(b.caffeine).toBe(100);
  });
});

describe("createNeedsTable — one NpcNeeds per NPC", () => {
  it("gives every NPC its own independent needs object", () => {
    const table = createNeedsTable(["bartek", "renata", "zosia"]);
    expect(Object.keys(table).sort()).toEqual(["bartek", "renata", "zosia"]);
    table.bartek!.caffeine = 10;
    expect(table.renata!.caffeine).toBe(100);
    expect(table.zosia!.social).toBe(100);
  });
});
