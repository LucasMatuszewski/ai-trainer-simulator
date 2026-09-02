import { describe, expect, it } from "vitest";
import {
  CHATTER_GAP_MAX_S,
  CHATTER_GAP_MIN_S,
  CHATTER_OVERLAP_GAP_MAX_S,
  CHATTER_OVERLAP_GAP_MIN_S,
  PAIR_COOLDOWN_S,
  pairKey,
  candidatePairs,
  nextStartDelay,
  pickExchange,
  pickPair,
  pickStarter,
  roomAt,
  type ChatterCandidate,
} from "../../src/engine/chatter";
import { OFFICE_CHATTER } from "../../src/content/office-chatter";

function candidate(id: string, x: number, z: number): ChatterCandidate {
  return { id, x, z, room: roomAt(x, z) };
}

describe("roomAt", () => {
  // Bounds mirror the floor AABBs in src/content/world-layout.ts.
  it("classifies the main office block", () => {
    expect(roomAt(0, 0)).toBe("main-office");
    expect(roomAt(-7.7, -5)).toBe("main-office");
    expect(roomAt(7.7, 5.5)).toBe("main-office");
  });

  it("classifies the kitchen (x [9,19], z [-7,7])", () => {
    expect(roomAt(13, -5.3)).toBe("kitchen");
    expect(roomAt(14, 1.2)).toBe("kitchen");
    expect(roomAt(9, -7)).toBe("kitchen");
    expect(roomAt(19, 7)).toBe("kitchen");
  });

  it("classifies the training room (x [19,27], z [-19,-3])", () => {
    expect(roomAt(23, -16.4)).toBe("training");
    expect(roomAt(21, -15)).toBe("training");
  });

  it("classifies the CEO office (z < -9, west of the training room)", () => {
    expect(roomAt(0, -17)).toBe("ceo");
    expect(roomAt(-5, -12)).toBe("ceo");
  });

  it("classifies the toilet, reception, and relocated C-64 meeting room", () => {
    expect(roomAt(22, 4)).toBe("toilet");
    expect(roomAt(22, 6)).toBe("toilet");
    expect(roomAt(20, 2.5)).toBe("toilet");
    expect(roomAt(0, 14)).toBe("reception");
    expect(roomAt(14, 8)).toBe("meeting");
    expect(roomAt(14, 14)).toBe("meeting");
  });

  it("does NOT classify the old back-SW toilet corner as a toilet (C-57 removed it)", () => {
    // The old toilet room was at x=[-19, -6.5], z=[9, 19]. The
    // space at x<=-6.5, z>=9 is now outside the reception shell.
    // This regression pins the QA-found bug where the legacy
    // `x <= -6.5 ? "toilet" : "meeting"` branch was left in.
    expect(roomAt(-16, 14.5)).not.toBe("toilet");
    expect(roomAt(-16, 14.5)).toBe("corridor");
    expect(roomAt(-14, 11.5)).toBe("corridor");
  });

  it("keeps conversation rooms distinct across the kitchen doorway", () => {
    expect(roomAt(8, -5)).toBe("main-office");
    expect(roomAt(10, -5)).toBe("kitchen");
  });
});

describe("pairKey", () => {
  it("is order-independent", () => {
    expect(pairKey("ania", "bartek")).toBe(pairKey("bartek", "ania"));
    expect(pairKey("ania", "bartek")).toBe("ania|bartek");
  });
});

describe("candidatePairs", () => {
  const options = (cooldowns: ReadonlyMap<string, number> = new Map(), activeRooms: ReadonlySet<string> = new Set()) => ({
    cooldowns,
    now: 100,
    activeRooms: activeRooms as ReadonlySet<never>,
  });

  it("returns every pair within the radius, not only the nearest", () => {
    const candidates = [candidate("a", 0, 0), candidate("b", 1, 0), candidate("c", 2, 0)];
    const pairs = candidatePairs(candidates, 2.5, options());
    expect(pairs.map((p) => [p.a, p.b].sort().join("+")).sort()).toEqual(["a+b", "a+c", "b+c"]);
  });

  it("excludes pairs beyond the radius", () => {
    const pairs = candidatePairs([candidate("a", 0, 0), candidate("b", 3, 0)], 2.5, options());
    expect(pairs).toEqual([]);
  });

  it("excludes pairs that are still cooling down", () => {
    const candidates = [candidate("a", 0, 0), candidate("b", 1, 0)];
    const cooldowns = new Map([[pairKey("a", "b"), 100 + PAIR_COOLDOWN_S]]);
    expect(candidatePairs(candidates, 2.5, options(cooldowns))).toEqual([]);
    const expired = new Map([[pairKey("a", "b"), 100]]);
    expect(candidatePairs(candidates, 2.5, options(expired)).length).toBe(1);
  });

  it("excludes pairs in a room that already hosts a conversation", () => {
    // a+b in the main office (busy), c+d in the kitchen (free).
    const candidates = [candidate("a", 0, 0), candidate("b", 1, 0), candidate("c", 13, -5), candidate("d", 14, -5)];
    const busy = new Set(["main-office"]);
    expect(candidatePairs(candidates, 2.5, options(new Map(), busy)).map((p) => `${p.a}+${p.b}`)).toEqual(["c+d"]);
  });
});

describe("pickPair", () => {
  it("picks uniformly (rng drives the index)", () => {
    const pairs = ["first", "second", "third"];
    expect(pickPair(pairs, () => 0)).toBe("first");
    expect(pickPair(pairs, () => 0.99)).toBe("third");
    expect(pickPair([], () => 0.5)).toBeNull();
  });

  it("does not always return the first pair across the rng space (C-46: not always-nearest)", () => {
    const pairs = ["first", "second"];
    const seen = new Set<string>();
    for (let i = 0; i < 20; i += 1) {
      const picked = pickPair(pairs, () => i / 20);
      if (picked !== null) seen.add(picked);
    }
    expect(seen.size).toBe(2);
  });
});

describe("pickStarter", () => {
  it("tilts the starter toward the chattier NPC (C-46 weights)", () => {
    // maciek (CTO, 0.3) vs przemek (Sales, 1.8): with rng -> 0.99 the
    // roll lands past maciek's 0.3/(0.3+1.8) share, so Sales starts.
    expect(pickStarter("maciek", "przemek", () => 0.99)).toBe("przemek");
    // A zero roll always lands on the first NPC's share.
    expect(pickStarter("maciek", "przemek", () => 0)).toBe("maciek");
  });

  it("is a fair coin between equal weights", () => {
    expect(pickStarter("tomek", "bartek", () => 0.49)).toBe("tomek");
    expect(pickStarter("tomek", "bartek", () => 0.51)).toBe("bartek");
  });
});

describe("nextStartDelay (C-46 amendment: scheduled, even cadence)", () => {
  it("always stays inside the normal 6-12 s window when idle", () => {
    for (let i = 0; i < 50; i += 1) {
      const delay = nextStartDelay(0, () => i / 50);
      expect(delay).toBeGreaterThanOrEqual(CHATTER_GAP_MIN_S);
      expect(delay).toBeLessThanOrEqual(CHATTER_GAP_MAX_S);
    }
  });

  it("with one active conversation, 35% of gaps are short overlaps", () => {
    let short = 0;
    let normal = 0;
    for (let i = 0; i < 100; i += 1) {
      const delay = nextStartDelay(1, () => i / 100);
      if (delay < CHATTER_GAP_MIN_S) {
        short += 1;
        expect(delay).toBeGreaterThanOrEqual(CHATTER_OVERLAP_GAP_MIN_S);
        expect(delay).toBeLessThanOrEqual(CHATTER_OVERLAP_GAP_MAX_S);
      } else {
        normal += 1;
      }
    }
    // i/100 < 0.35 for i = 0..34 -> exactly 35 short gaps.
    expect(short).toBe(35);
    expect(normal).toBe(65);
  });

  it("never rolls the overlap gap when nothing is active (no bursts)", () => {
    for (let i = 0; i < 50; i += 1) {
      expect(nextStartDelay(0, () => i / 50)).toBeGreaterThanOrEqual(CHATTER_GAP_MIN_S);
    }
  });
});

describe("pickExchange", () => {
  it("never repeats the previous exchange", () => {
    const seen: number[] = [];
    for (let i = 0; i < 50; i += 1) {
      seen.push(OFFICE_CHATTER.indexOf(pickExchange(OFFICE_CHATTER, () => i / 50)));
    }
    for (let i = 1; i < seen.length; i += 1) {
      expect(seen[i]).not.toBe(seen[i - 1]);
    }
  });

  it("filters starters by the speaker's topic affinities (C-46 amendment)", () => {
    // Sales (general only) never starts an IT or finance exchange.
    for (let i = 0; i < 60; i += 1) {
      const chosen = pickExchange(OFFICE_CHATTER, () => i / 60, "przemek");
      expect(["it", "finance", "janitor"]).not.toContain(chosen.topic);
    }
    // The accountant (finance) never starts IT or janitor ones.
    for (let i = 0; i < 60; i += 1) {
      const chosen = pickExchange(OFFICE_CHATTER, () => i / 60, "grazyna");
      expect(["it", "janitor"]).not.toContain(chosen.topic);
    }
    // The CTO (it) never starts finance or janitor ones.
    for (let i = 0; i < 60; i += 1) {
      const chosen = pickExchange(OFFICE_CHATTER, () => i / 60, "maciek");
      expect(["finance", "janitor"]).not.toContain(chosen.topic);
    }
  });
});
