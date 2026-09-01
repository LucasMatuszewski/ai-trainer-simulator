// @vitest-environment jsdom

import { beforeEach, describe, expect, it } from "vitest";
import * as THREE from "three";
import { createBubbleSystem, fitLine, pickLine } from "../../src/engine/bubbles";
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

describe("fitLine (C-61: DOM bubbles keep the 2x36 cap)", () => {
  it("passes a short line through unwrapped", () => {
    expect(fitLine("Hi. Works on my machine.")).toBe("Hi. Works on my machine.");
  });

  it("wraps a long line on a space near the middle", () => {
    const wrapped = fitLine(
      "a".repeat(20) + " " + "b".repeat(20) + " " + "c".repeat(20),
    );
    const rows = wrapped.split("\n");
    // Exactly 2 rows, first row within the cap. (The tail row may run
    // longer - legacy fitLine contract; with no fixed-width frame the
    // text simply extends, and the ellipsis caps the total.)
    expect(rows.length).toBe(2);
    expect(rows[0]!.length).toBeLessThanOrEqual(36);
  });

  it("ellipsizes absurdly long lines", () => {
    const wrapped = fitLine("x".repeat(200));
    expect(wrapped).toContain("...");
    for (const row of wrapped.split("\n")) expect(row.length).toBeLessThanOrEqual(36);
  });
});

describe("bubble system DOM (C-61)", () => {
  // Minimal canvas stand-in: the system only reads the rect for
  // projection (native-resolution DOM text needs nothing else).
  function makeCanvas(): HTMLCanvasElement {
    return {
      getBoundingClientRect: () =>
        ({ width: 800, height: 600, left: 0, top: 0 } as DOMRect),
    } as unknown as HTMLCanvasElement;
  }

  function makeCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(55, 16 / 9, 0.1, 100);
    camera.updateMatrixWorld();
    return camera;
  }

  let parent: HTMLDivElement;

  beforeEach(() => {
    document.querySelectorAll(".npc-bubble-layer").forEach((el) => el.remove());
    parent = document.createElement("div");
    document.body.appendChild(parent);
  });

  it("renders a shown line as DOM text, not a sprite", () => {
    const system = createBubbleSystem(new THREE.Scene(), parent, makeCanvas());
    system.show(new THREE.Vector3(0, 0, -5), "Hi. Works on my machine.");
    const bubble = parent.querySelector<HTMLElement>(".npc-bubble")!;
    expect(bubble).not.toBeNull();
    expect(bubble.hidden).toBe(false);
    expect(bubble.textContent).toBe("Hi. Works on my machine.");
    system.destroy();
    expect(parent.querySelector(".npc-bubble-layer")).toBeNull();
  });

  it("update projects the speaker position into screen space", () => {
    const system = createBubbleSystem(new THREE.Scene(), parent, makeCanvas());
    const camera = makeCamera();
    // Dead center in front of the default -Z camera.
    system.show(new THREE.Vector3(0, 0, -5), "hello");
    system.update(0.016, camera);
    const bubble = parent.querySelector<HTMLElement>(".npc-bubble")!;
    expect(bubble.style.transform).toContain("translate(400px");
    system.destroy();
  });

  it("hides the bubble after its lifetime elapses", () => {
    const system = createBubbleSystem(new THREE.Scene(), parent, makeCanvas());
    const camera = makeCamera();
    system.show(new THREE.Vector3(0, 0, -5), "hello");
    // Advance well past the 6-8 s lifetime in one step.
    system.update(10, camera);
    const bubble = parent.querySelector<HTMLElement>(".npc-bubble")!;
    expect(bubble.hidden).toBe(true);
    system.destroy();
  });

  it("setVisible(false) hides bubbles (office-screen gate)", () => {
    const system = createBubbleSystem(new THREE.Scene(), parent, makeCanvas());
    system.show(new THREE.Vector3(0, 0, -5), "hello");
    system.setVisible(false);
    const bubble = parent.querySelector<HTMLElement>(".npc-bubble")!;
    expect(bubble.hidden).toBe(true);
    // And a fresh show while hidden stays hidden.
    system.show(new THREE.Vector3(0, 0, -5), "again");
    expect(parent.querySelectorAll<HTMLElement>(".npc-bubble")[0]!.hidden).toBe(true);
    system.destroy();
  });

  it("hides bubbles without a canvas (headless / tests)", () => {
    const system = createBubbleSystem(new THREE.Scene(), parent, null);
    const camera = makeCamera();
    system.show(new THREE.Vector3(0, 0, -5), "hello");
    system.update(0.016, camera);
    const bubble = parent.querySelector<HTMLElement>(".npc-bubble")!;
    expect(bubble.hidden).toBe(true);
    system.destroy();
  });

  it("projects with the setCamera camera, not the update argument (C-61 fix)", () => {
    const system = createBubbleSystem(new THREE.Scene(), parent, makeCanvas());
    // Real engine camera stands at (3, 0, 0) looking -Z; the bubble's
    // speaker at (0, 0, -5) must project LEFT of center from there.
    const real = new THREE.PerspectiveCamera(55, 16 / 9, 0.1, 100);
    real.position.set(3, 0, 0);
    real.updateMatrixWorld();
    system.setCamera(real);
    system.show(new THREE.Vector3(0, 0, -5), "hello");
    // Garbage camera passed to update (the controller's fallback) -
    // must be IGNORED now that setCamera provided the real one.
    system.update(0.016, new THREE.PerspectiveCamera());
    const bubble = parent.querySelector<HTMLElement>(".npc-bubble")!;
    expect(bubble.hidden).toBe(false);
    const x = Number(/translate\(([\d.]+)px/.exec(bubble.style.transform)![1]);
    expect(x).toBeLessThan(400);
    system.destroy();
  });

  it("an active bubble behind the camera stays busy (not stealable)", () => {
    const system = createBubbleSystem(new THREE.Scene(), parent, makeCanvas());
    const camera = makeCamera(); // looks -Z
    // Two speakers behind the camera (+Z side): their bubbles hide...
    system.show(new THREE.Vector3(0, 0, 5), "one");
    system.show(new THREE.Vector3(1, 0, 5), "two");
    system.update(0.016, camera);
    // ...but they keep their slots busy, so the next two shows must
    // land in the two FREE slots, not steal the hidden ones.
    system.show(new THREE.Vector3(0, 0, -5), "three");
    system.show(new THREE.Vector3(2, 0, -5), "four");
    system.update(0.016, camera);
    const texts = [...parent.querySelectorAll<HTMLElement>(".npc-bubble")]
      .filter((el) => !el.hidden)
      .map((el) => el.textContent);
    expect(texts).toEqual(["three", "four"]);
    system.destroy();
  });
});
