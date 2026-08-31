import { describe, expect, it, vi } from "vitest";
import {
  findClosestPair,
  INTER_NPC_LINES,
  pickLine,
  resolveBubblePool,
  shouldShowBubble,
} from "../../src/engine/bubbles";
import { BUREK_LINES } from "../../src/content/dog-dialogues";
import { LUNCH_DIALOGUES_HUMAN } from "../../src/content/lunch-dialogues";

describe("resolveBubblePool", () => {
  it.each([
    [true, false, BUREK_LINES], [true, true, BUREK_LINES],
    [false, true, LUNCH_DIALOGUES_HUMAN], [false, false, INTER_NPC_LINES],
  ] as const)("resolves dog=%s kitchen=%s", (speakerIsBurek, bothInKitchen, expected) => {
    expect(resolveBubblePool(speakerIsBurek, bothInKitchen)).toBe(expected);
  });
});

describe("shouldShowBubble", () => {
  it("shows an eligible nearby bubble", () => {
    expect(shouldShowBubble(2, 9, () => 0)).toBe(true);
  });

  it("waits at least eight seconds", () => {
    expect(shouldShowBubble(2, 7, () => 0)).toBe(false);
  });

  it("respects the probability roll", () => {
    expect(shouldShowBubble(2, 9, () => 0.5)).toBe(false);
  });

  it("rejects NPCs outside the proximity threshold", () => {
    expect(shouldShowBubble(3, 9, () => 0)).toBe(false);
  });
});

describe("findClosestPair", () => {
  it("returns the nearest pair within the threshold", () => {
    const npcs = [
      { id: "a", position: { x: 0, z: 0 } },
      { id: "b", position: { x: 1, z: 0 } },
      { id: "c", position: { x: 2.4, z: 2.4 } },
    ];
    expect(findClosestPair(npcs, 2.5)).toEqual(["a", "b"]);
  });

  it("returns null when no pair is close enough", () => {
    const npcs = [
      { id: "a", position: { x: 0, z: 0 } },
      { id: "b", position: { x: 3, z: 0 } },
    ];
    expect(findClosestPair(npcs, 2.5)).toBeNull();
  });
});

describe("pickLine", () => {
  it("selects the indexed line", () => {
    expect(pickLine(["a", "b", "c"], () => 0.5)).toBe("b");
  });

  it("does not repeat a line for the same list", () => {
    const lines = ["a", "b", "c"];
    expect(pickLine(lines, () => 0)).toBe("a");
    expect(pickLine(lines, () => 0)).toBe("b");
  });
});

describe("bubble simulation", () => {
  it("produces bubbles over twenty seconds for nearby NPCs", () => {
    const npcs = [
      { id: "a", position: { x: 0, z: 0 } },
      { id: "b", position: { x: 1, z: 0 } },
      { id: "c", position: { x: 4, z: 4 } },
      { id: "d", position: { x: 5, z: 4 } },
    ];
    const show = vi.fn();
    let elapsed = 0;
    for (let second = 0; second < 20; second += 1) {
      elapsed += 1;
      const pair = findClosestPair(npcs, 2.5);
      if (pair !== null && shouldShowBubble(1, elapsed, () => 0)) {
        show(pair[0], pickLine(INTER_NPC_LINES, () => 0));
        elapsed = 0;
      }
    }
    expect(INTER_NPC_LINES.length).toBeGreaterThan(0);
    expect(show).toHaveBeenCalled();
  });
});
