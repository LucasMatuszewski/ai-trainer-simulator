/**
 * ADR 0008 D-36/D-39. Only the PURE logic is asserted here: the
 * addressable-target catalogue and name resolution. The mesh, the walk
 * and the bubble are three.js output, verified visually per the standing
 * decision that 3D rendering is not unit-testable.
 *
 * D-39 is the rule under test: an agent has never seen the floor plan, so
 * it addresses the world by NAME, and a failed lookup must hand back the
 * valid alternatives instead of a dead end.
 */
import { describe, expect, it } from "vitest";
import {
  buildTargetCatalog,
  resolveTarget,
  MAX_SAY_LENGTH,
  clampSpokenLine,
} from "../../src/engine/agent-companion";

const NPCS = [
  { id: "bartek", name: "Bartek", role: "Team Lead", position: { x: 1, y: 0, z: 2 } },
  { id: "renata", name: "Renata", role: "Receptionist", position: { x: 4, y: 0, z: 15 } },
  { id: "burek", name: "Burek", role: "Office Dog", position: { x: 0, y: 0, z: 0 } },
];
const ROOMS = [
  { id: "kitchen", name: "Kitchen", floor: { minX: 10, maxX: 20, minZ: -5, maxZ: 5 } },
  { id: "ceo-office", name: "CEO Office", floor: { minX: -8, maxX: 8, minZ: -19, maxZ: -9 } },
];

describe("buildTargetCatalog", () => {
  it("includes every NPC and every room", () => {
    const catalog = buildTargetCatalog(NPCS, ROOMS);
    expect(catalog.filter((t) => t.kind === "npc")).toHaveLength(3);
    expect(catalog.filter((t) => t.kind === "room")).toHaveLength(2);
  });

  it("aims a room target at its floor centre, so the walk ends inside the room", () => {
    const kitchen = buildTargetCatalog([], ROOMS).find((t) => t.id === "kitchen");
    expect(kitchen?.position).toEqual({ x: 15, z: 0 });
  });

  it("carries the role so an agent can tell who is worth talking to", () => {
    const bartek = buildTargetCatalog(NPCS, []).find((t) => t.id === "bartek");
    expect(bartek?.description).toContain("Team Lead");
  });
});

describe("resolveTarget", () => {
  const catalog = buildTargetCatalog(NPCS, ROOMS);

  it("resolves an exact id", () => {
    const result = resolveTarget("bartek", catalog);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.target.id).toBe("bartek");
  });

  it("resolves a display name regardless of case", () => {
    const result = resolveTarget("ReNaTa", catalog);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.target.id).toBe("renata");
  });

  it("resolves a room by its human name with a space", () => {
    const result = resolveTarget("CEO Office", catalog);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.target.id).toBe("ceo-office");
  });

  it("tolerates surrounding whitespace", () => {
    expect(resolveTarget("  kitchen  ", catalog).ok).toBe(true);
  });

  it("enumerates valid targets when the name is unknown (D-39)", () => {
    const result = resolveTarget("the moon", catalog);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.candidates.length).toBeGreaterThan(0);
      expect(result.candidates).toContain("bartek");
      expect(result.candidates).toContain("kitchen");
    }
  });

  it("rejects an empty query rather than picking something arbitrary", () => {
    expect(resolveTarget("   ", catalog).ok).toBe(false);
  });

  it("never resolves a partial match to a single target silently", () => {
    // "office" appears in "CEO Office" but is not a whole name. Guessing
    // here would move a character in a world the human is watching.
    const result = resolveTarget("office", catalog);
    expect(result.ok).toBe(false);
  });
});

describe("clampSpokenLine", () => {
  it("passes a normal line through unchanged", () => {
    expect(clampSpokenLine("Morning. Did anyone push to main?")).toBe(
      "Morning. Did anyone push to main?",
    );
  });

  it("truncates an overlong line instead of letting it overflow the bubble", () => {
    const clamped = clampSpokenLine("x".repeat(MAX_SAY_LENGTH + 200));
    expect(clamped.length).toBeLessThanOrEqual(MAX_SAY_LENGTH);
  });

  it("collapses newlines, which would break a single-line bubble", () => {
    expect(clampSpokenLine("one\ntwo\r\nthree")).toBe("one two three");
  });

  it("returns an empty string for whitespace, so callers can reject it", () => {
    expect(clampSpokenLine("   \n  ")).toBe("");
  });
});
