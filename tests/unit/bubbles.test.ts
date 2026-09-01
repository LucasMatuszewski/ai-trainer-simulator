import { describe, expect, it } from "vitest";
import {
  pickLine,
} from "../../src/engine/bubbles";
import { INTER_NPC_LINES } from "../../src/content/office-chatter";

describe("pickLine", () => {
  it("selects the indexed line", () => {
    expect(pickLine(["a", "b", "c"], () => 0.5)).toBe("b");
  });

  it("does not repeat a line for the same list", () => {
    const lines = ["a", "b", "c"];
    expect(pickLine(lines, () => 0)).toBe("a");
    expect(pickLine(lines, () => 0)).toBe("b");
  });

  it("answers with an empty string for an empty list", () => {
    expect(pickLine([], () => 0)).toBe("");
  });
});

describe("INTER_NPC_LINES (C-46 exchange union)", () => {
  it("still has content after the exchange rework", () => {
    expect(INTER_NPC_LINES.length).toBeGreaterThanOrEqual(30);
  });
});

describe("bubble simulation", () => {
  it("keeps pool content available after the C-46 rework", () => {
    expect(INTER_NPC_LINES.length).toBeGreaterThan(0);
    expect(pickLine(INTER_NPC_LINES, () => 0)).toBeTypeOf("string");
  });
});
