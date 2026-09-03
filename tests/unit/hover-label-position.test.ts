// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { positionHoverLabel } from "../../src/ui/hover-label-position";

describe("positionHoverLabel", () => {
  const rect = { left: 120, top: 80, width: 800, height: 600 };

  it("anchors a centered projection to the canvas offset in the viewport", () => {
    const label = document.createElement("div");

    positionHoverLabel(label, { x: 0, y: 0 }, rect);

    expect(label.style.left).toBe("520px");
    expect(label.style.top).toBe("380px");
    expect(label.style.transform).toBe("translate(-50%, -100%)");
  });

  it("replaces legacy offsets when switching NPC to robot and back to NPC", () => {
    const label = document.createElement("div");
    label.style.left = "400px";
    label.style.top = "250px";
    label.style.transform = "translate(600px, 300px) translate(-50%, -100%)";

    for (const { projected, left, top } of [
      { projected: { x: -0.5, y: 0.5 }, left: "320px", top: "230px" },
      { projected: { x: 0.5, y: -0.5 }, left: "720px", top: "530px" },
      { projected: { x: -0.5, y: 0.5 }, left: "320px", top: "230px" },
    ]) {
      positionHoverLabel(label, projected, rect);

      expect(label.style.left).toBe(left);
      expect(label.style.top).toBe(top);
      expect(label.style.transform).toBe("translate(-50%, -100%)");
    }
  });

  it("uses the current canvas rectangle after the viewport moves or resizes", () => {
    const label = document.createElement("div");
    positionHoverLabel(label, { x: 1, y: -1 }, rect);
    expect(label.style.left).toBe("920px");
    expect(label.style.top).toBe("680px");

    positionHoverLabel(label, { x: 1, y: -1 }, {
      left: 30, top: 40, width: 400, height: 300,
    });

    expect(label.style.left).toBe("430px");
    expect(label.style.top).toBe("340px");
    expect(label.style.transform).toBe("translate(-50%, -100%)");
  });
});
