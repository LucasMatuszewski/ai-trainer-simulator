import { describe, expect, it } from "vitest";
import {
  buildWorldTickProjection,
  distanceBand,
  pairProjectionKey,
  type ProjectionNpcFact,
  type ProjectionPairFact,
  type WorldTickProjectionInput,
} from "../../../src/game/world-projection";
import { CHATTER_RADIUS } from "../../../src/engine/chatter";

/**
 * WS4 world projection (ADR-0009 D-48/D-49, PRD Flow B): the PURE
 * projector that turns one world tick's worth of live state into the
 * compact slice Jev judges.
 *
 * Pinned here:
 *  - per-subject namespacing (`npcs.<id>`, `pairs.<a>_<b>`): each
 *    subject's facts live in their own subtree (context-rot defense,
 *    D-49) and a question references only its own subtree;
 *  - today's fired events + pre-computed relationship bands ride along;
 *  - NO raw arithmetic is left for the model: distances become named
 *    bands, live positions become a named room — the projector computes,
 *    the model only reads named facts (D-59 allowlist spirit);
 *  - purity: same input -> equal output, input never mutated.
 */

const ROSTER: readonly ProjectionNpcFact[] = [
  {
    id: "bartek",
    name: "Bartek",
    role: "Senior Consultant",
    position: { x: 7.45, z: -5 },
    room: "main-office",
  },
  {
    id: "grazyna",
    name: "Grazyna",
    role: "Accountant",
    position: { x: -3.25, z: 2 },
    room: "main-office",
  },
];

const PAIRS: readonly ProjectionPairFact[] = [
  { a: "bartek", b: "grazyna", distance: 1.7 },
];

function input(overrides: Partial<WorldTickProjectionInput> = {}): WorldTickProjectionInput {
  return {
    day: 2,
    period: "lunch",
    npcRoster: ROSTER,
    pairs: PAIRS,
    events: ["slack-mention"],
    relationshipBands: { bartek_grazyna: "friend" },
    ...overrides,
  };
}

describe("world projection — per-subject namespacing (D-49)", () => {
  it("gives every NPC its own npcs.<id> subtree with allowlisted facts", () => {
    const projection = buildWorldTickProjection(input());
    expect(projection["npcs.bartek"]).toEqual({
      id: "bartek",
      name: "Bartek",
      role: "Senior Consultant",
      room: "main-office",
    });
    expect(projection["npcs.grazyna"]).toMatchObject({ id: "grazyna", role: "Accountant" });
  });

  it("gives every pair one order-independent pairs.<a>_<b> subtree", () => {
    const projection = buildWorldTickProjection(input());
    // The key is sorted; the subtree preserves the provider's orientation.
    expect(projection["pairs.bartek_grazyna"]).toMatchObject({ a: "bartek", b: "grazyna" });

    const flipped = buildWorldTickProjection(
      input({ pairs: [{ a: "grazyna", b: "bartek", distance: 1.7 }] }),
    );
    expect(flipped["pairs.bartek_grazyna"]).toMatchObject({ a: "grazyna", b: "bartek" });
    expect(Object.keys(flipped).filter((key) => key.startsWith("pairs."))).toEqual([
      "pairs.bartek_grazyna",
    ]);
  });

  it("keeps global context under world and omits unknown rooms", () => {
    const projection = buildWorldTickProjection(
      input({ npcRoster: [{ id: "janusz", name: "Janusz", role: "Janitor" }] }),
    );
    expect(projection.world).toEqual({ day: 2, period: "lunch" });
    expect(projection["npcs.janusz"]).toEqual({ id: "janusz", name: "Janusz", role: "Janitor" });
  });
});

describe("world projection — bands and events ride along (Flow B)", () => {
  it("projects the pre-computed relationship band inside the pair subtree", () => {
    const projection = buildWorldTickProjection(input());
    expect(projection["pairs.bartek_grazyna"]).toMatchObject({ relationshipBand: "friend" });
  });

  it("omits the band when the pair has none", () => {
    const projection = buildWorldTickProjection(input({ relationshipBands: {} }));
    expect(projection["pairs.bartek_grazyna"]).not.toHaveProperty("relationshipBand");
  });

  it("carries today's fired event slugs at the top level", () => {
    const projection = buildWorldTickProjection(
      input({ events: ["slack-mention", "printer-fault"] }),
    );
    expect(projection.events).toEqual(["slack-mention", "printer-fault"]);
  });
});

describe("world projection — pre-computed facts only (no raw arithmetic)", () => {
  it("bands pair distance into adjacent / nearby / far", () => {
    const projection = buildWorldTickProjection(
      input({
        pairs: [
          { a: "bartek", b: "tomek", distance: 1.7 },
          { a: "bartek", b: "zosia", distance: 3.2 },
          { a: "bartek", b: "dawid", distance: CHATTER_RADIUS + 1 },
        ],
      }),
    );
    expect(projection["pairs.bartek_tomek"]).toMatchObject({ distance: "adjacent" });
    expect(projection["pairs.bartek_zosia"]).toMatchObject({ distance: "nearby" });
    expect(projection["pairs.bartek_dawid"]).toMatchObject({ distance: "far" });
  });

  it("never leaks raw coordinates or raw distances into the payload", () => {
    const projection = buildWorldTickProjection(input());
    const json = JSON.stringify(projection);
    expect(json).not.toContain("7.45"); // roster position x
    expect(json).not.toContain("-3.25"); // roster position z
    expect(json).not.toContain("1.7"); // raw pair distance
    expect(json).not.toContain("position");
  });

  it("bands around the CHATTER_RADIUS eligibility ceiling", () => {
    expect(distanceBand(0)).toBe("adjacent");
    expect(distanceBand(2.49)).toBe("adjacent");
    expect(distanceBand(2.5)).toBe("nearby");
    expect(distanceBand(CHATTER_RADIUS)).toBe("nearby");
    expect(distanceBand(CHATTER_RADIUS + 0.01)).toBe("far");
    expect(distanceBand(Number.NaN)).toBe("far");
  });
});

describe("world projection — purity (D-49)", () => {
  it("returns equal output for equal input without mutating the input", () => {
    const frozen = Object.freeze({
      day: 2,
      period: "lunch" as const,
      npcRoster: Object.freeze([...ROSTER]),
      pairs: Object.freeze([...PAIRS]),
      events: Object.freeze(["slack-mention"]),
      relationshipBands: Object.freeze({ bartek_grazyna: "friend" }),
    });
    const first = buildWorldTickProjection(frozen);
    const second = buildWorldTickProjection(frozen);
    expect(first).toEqual(second);
    // The caller's arrays are copied, never reordered or consumed.
    expect(frozen.npcRoster).toHaveLength(2);
    expect(frozen.pairs).toHaveLength(1);
  });

  it("exposes the stable pair key used by the relationship-band map", () => {
    expect(pairProjectionKey("bartek", "zosia")).toBe("bartek_zosia");
    expect(pairProjectionKey("zosia", "bartek")).toBe("bartek_zosia");
  });
});
