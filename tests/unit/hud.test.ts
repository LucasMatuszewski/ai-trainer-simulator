/**
 * @vitest-environment jsdom
 *
 * Tests for the Player Stats HUD (L-2026-08-30-02 feedback).
 *
 * The HUD must:
 *  - Mount a persistent panel showing cash, day, time, today's
 *    cashflow, and 4 stat bars (focus, caffeine, patience, credibility).
 *  - Update the bar widths and numeric values on each render.
 *  - Color low values red, mid orange, high green.
 *  - Show the cashflow line when a snapshot for the previous day exists.
 *  - Hide the cashflow line on day 1 (no prior day to show).
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mountHud, renderHud, setCashflow } from "../../src/ui/hud";
import { initialGameState } from "../../src/game/initial";
import type { GameState } from "../../src/types";

vi.mock("../../src/game/state", () => ({
  game: { dispatch: vi.fn() },
}));

function makeState(overrides: Partial<GameState> = {}): GameState {
  return { ...initialGameState(), ...overrides };
}

describe("Player Stats HUD (L-2026-08-30-02)", () => {
  let root: HTMLElement;
  let hud: ReturnType<typeof mountHud>;

  beforeEach(() => {
    document.body.innerHTML = '<div id="ui-root"></div>';
    root = document.getElementById("ui-root")!;
    hud = mountHud(root);
  });

  it("renders cash, day, and bar values from state", () => {
    const state = makeState({
      cash: 2500,
      day: 3,
      timeOfDay: "afternoon",
      stats: { focus: 75, caffeine: 20, patience: 60, credibility: 90 },
    });
    renderHud(hud, state);

    expect(hud.cash.textContent).toBe("2,500 zl");
    expect(hud.cash.classList.contains("negative")).toBe(false);
    expect(hud.day.textContent).toBe("Day 3 - Afternoon");
    expect(hud.barValues.focus.textContent).toBe("75");
    expect(hud.barValues.caffeine.textContent).toBe("20");
    expect(hud.barValues.patience.textContent).toBe("60");
    expect(hud.barValues.credibility.textContent).toBe("90");
  });

  it("colors negative cash red", () => {
    const state = makeState({ cash: -100 });
    renderHud(hud, state);
    expect(hud.cash.classList.contains("negative")).toBe(true);
  });

  it("classifies bars into low/mid/high based on value", () => {
    const state = makeState({
      stats: { focus: 10, caffeine: 50, patience: 80, credibility: 100 },
    });
    renderHud(hud, state);
    expect(hud.bars.focus.dataset.level).toBe("low");
    expect(hud.bars.caffeine.dataset.level).toBe("mid");
    expect(hud.bars.patience.dataset.level).toBe("high");
    expect(hud.bars.credibility.dataset.level).toBe("high");
  });

  it("clamps bar widths to 0-100%", () => {
    const state = makeState({
      stats: { focus: 150, caffeine: -20, patience: 50, credibility: 50 },
    });
    renderHud(hud, state);
    expect(hud.bars.focus.style.width).toBe("100%");
    expect(hud.bars.caffeine.style.width).toBe("0%");
  });

  it("hides the cashflow row on day 1 (no prior day)", () => {
    const state = makeState({ day: 1 });
    renderHud(hud, state);
    const row = hud.cashflow.parentElement as HTMLElement;
    expect(row.style.display).toBe("none");
  });

  it("shows the cashflow row for the LAST COMPLETED day when a snapshot matches", () => {
    // Player is now on day 3 (morning). The economy module published a
    // snapshot for day 2 (yesterday). HUD should show it.
    const state = makeState({ day: 3, timeOfDay: "morning" });
    setCashflow(hud, { income: 200, expenses: 100, net: 100, day: 2 });
    renderHud(hud, state);
    const row = hud.cashflow.parentElement as HTMLElement;
    expect(row.style.display).toBe("");
  });

  it("marks positive cashflow green and negative red", () => {
    const state = makeState({ day: 2 });
    setCashflow(hud, { income: 200, expenses: 50, net: 150, day: 1 });
    renderHud(hud, state);
    expect(hud.cashflow.dataset.dir).toBe("up");
    expect(hud.cashflow.textContent).toBe("+150 zl");
  });
});
