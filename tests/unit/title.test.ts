/** @vitest-environment jsdom */

import { describe, expect, it, vi } from "vitest";

import { mountTitleScreen } from "../../src/ui/title";
import { GAME_VERSION } from "../../src/version";

describe("C-68 visible game version", () => {
  it("renders the shared CalVer build on the title screen", () => {
    const root = document.createElement("div");
    mountTitleScreen(root, false, vi.fn(), vi.fn());

    expect(GAME_VERSION).toMatch(/^v\d{4}\.\d{2}\.\d{2}-\d{2}$/);
    expect(root.querySelector(".version")?.textContent).toContain(GAME_VERSION);
    expect(root.querySelector(".version")?.textContent).not.toContain("v0.0.1");
  });
});
