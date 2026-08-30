/**
 * UI: HUD (cash, day, time) + context prompt.
 * Mounted in #ui-root, re-renders on game state changes.
 *
 * Phase 6+ (L-2026-08-30-02 feedback): added a persistent "Player Stats"
 * panel on the top-left. The player must always see their focus, caffeine,
 * patience, credibility, cash, day, time, and a financial summary at a
 * glance. The bar values come from GameState.stats; the financial line
 * shows today's net income/expense.
 */

import type { GameState } from "../types";

export interface HudElements {
  root: HTMLElement;
  cash: HTMLElement;
  day: HTMLElement;
  time: HTMLElement;
  prompt: HTMLElement;
  /** Container for stacked toasts. The container itself is always
   * present; the toasts are appended/removed dynamically. */
  toastStack: HTMLElement;
  /** Top-left player stats panel. */
  statsPanel: HTMLElement;
  /** Bar fill elements for each stat. */
  bars: {
    focus: HTMLElement;
    caffeine: HTMLElement;
    patience: HTMLElement;
    credibility: HTMLElement;
  };
  /** Numeric readouts next to each bar. */
  barValues: {
    focus: HTMLElement;
    caffeine: HTMLElement;
    patience: HTMLElement;
    credibility: HTMLElement;
  };
  /** Today (or last-completed) net cashflow line. */
  cashflow: HTMLElement;
}

export function mountHud(root: HTMLElement): HudElements {
  root.innerHTML = `
    <div class="player-stats" data-stats-panel aria-label="Player status">
      <div class="stats-row stats-day">
        <span class="stats-day-text" data-day>Day 1 - Morning</span>
      </div>
      <div class="stats-row stats-cash">
        <span class="stats-cash-label">Cash</span>
        <span class="stats-cash-value" data-cash>1,500 zl</span>
      </div>
      <div class="stats-row stats-cashflow" data-cashflow-row>
        <span class="stats-cashflow-label">Yesterday</span>
        <span class="stats-cashflow-value" data-cashflow>--</span>
      </div>
      <div class="stats-bars" data-bars>
        ${statBarHtml("focus", "Focus", "data-focus-bar", "data-focus-value")}
        ${statBarHtml("caffeine", "Caffeine", "data-caffeine-bar", "data-caffeine-value")}
        ${statBarHtml("patience", "Patience", "data-patience-bar", "data-patience-value")}
        ${statBarHtml("credibility", "Credibility", "data-credibility-bar", "data-credibility-value")}
      </div>
    </div>
    <div class="hud">
      <div></div>
      <div class="prompt" data-prompt style="display:none">
        <span class="key">E</span><span data-prompt-text></span>
      </div>
    </div>
    <div class="toast-stack" data-toast-stack></div>
  `;
  return {
    root,
    cash: root.querySelector("[data-cash]")!,
    day: root.querySelector("[data-day]")!,
    time: root.querySelector("[data-day]")!, // aliased
    prompt: root.querySelector("[data-prompt]")!,
    toastStack: root.querySelector("[data-toast-stack]")!,
    statsPanel: root.querySelector("[data-stats-panel]")!,
    bars: {
      focus: root.querySelector<HTMLElement>("[data-focus-bar]")!,
      caffeine: root.querySelector<HTMLElement>("[data-caffeine-bar]")!,
      patience: root.querySelector<HTMLElement>("[data-patience-bar]")!,
      credibility: root.querySelector<HTMLElement>("[data-credibility-bar]")!,
    },
    barValues: {
      focus: root.querySelector("[data-focus-value]")!,
      caffeine: root.querySelector("[data-caffeine-value]")!,
      patience: root.querySelector("[data-patience-value]")!,
      credibility: root.querySelector("[data-credibility-value]")!,
    },
    cashflow: root.querySelector("[data-cashflow]")!,
  };
}

function statBarHtml(
  _key: string,
  label: string,
  barAttr: string,
  valueAttr: string,
): string {
  return `
    <div class="stat-bar-row">
      <span class="stat-bar-label">${label}</span>
      <div class="stat-bar-track">
        <div class="stat-bar-fill" ${barAttr} style="width:0%"></div>
      </div>
      <span class="stat-bar-value" ${valueAttr}>0</span>
    </div>
  `;
}

const TIME_LABEL: Record<GameState["timeOfDay"], string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

/**
 * Tracks today's net cash flow at the granularity of one in-game day.
 * The economy module (economy.ts) updates this on each daily tick; the
 * HUD reads it via `setCashflow()`. Stored on a WeakMap keyed by the
 * HUD root so multiple HUDs do not stomp each other (the game has one
 * HUD, but the API stays safe for tests and future layouts).
 */
interface CashflowSnapshot {
  income: number;
  expenses: number;
  net: number;
  /** In-game day this snapshot is for. */
  day: number;
}
const cashflowByHud = new WeakMap<HTMLElement, CashflowSnapshot>();

/** Economy module calls this to publish the most recent daily tick. */
export function setCashflow(
  hud: HudElements,
  snapshot: { income: number; expenses: number; net: number; day: number },
): void {
  cashflowByHud.set(hud.root, snapshot);
  renderCashflow(hud);
}

export function renderHud(hud: HudElements, state: Readonly<GameState>): void {
  const cash = state.cash;
  const formatted = new Intl.NumberFormat("en-US").format(Math.round(cash)) + " zl";
  hud.cash.textContent = formatted;
  hud.cash.classList.toggle("negative", cash < 0);
  hud.day.textContent = `Day ${state.day} - ${TIME_LABEL[state.timeOfDay]}`;

  // Stats bars.
  setBar(hud.bars.focus, hud.barValues.focus, state.stats.focus);
  setBar(hud.bars.caffeine, hud.barValues.caffeine, state.stats.caffeine);
  setBar(hud.bars.patience, hud.barValues.patience, state.stats.patience);
  setBar(hud.bars.credibility, hud.barValues.credibility, state.stats.credibility);

  renderCashflow(hud, state);
}

function setBar(barEl: HTMLElement, valueEl: HTMLElement, value: number): void {
  const v = Math.max(0, Math.min(100, value));
  barEl.style.width = `${v}%`;
  barEl.dataset.level = barLevel(v);
  valueEl.textContent = String(Math.round(v));
}

function barLevel(v: number): "low" | "mid" | "high" {
  if (v < 25) return "low";
  if (v < 70) return "mid";
  return "high";
}

function renderCashflow(hud: HudElements, state?: Readonly<GameState>): void {
  const row = hud.cashflow.parentElement as HTMLElement;
  const snap = cashflowByHud.get(hud.root);
  if (!snap) {
    row.style.display = "none";
    return;
  }
  // The snapshot's "day" is the LAST COMPLETED day. The current state
  // may be on the next morning; if so, this snapshot matches. If state
  // is not provided (e.g. direct setCashflow call), accept the snapshot
  // unconditionally.
  const matchesDay = !state || state.day === snap.day + 1 || state.day === snap.day;
  if (matchesDay && snap.net !== 0) {
    const net = snap.net;
    const sign = net > 0 ? "+" : "";
    const text = `${sign}${new Intl.NumberFormat("en-US").format(Math.round(net))} zl`;
    hud.cashflow.textContent = text;
    hud.cashflow.dataset.dir = net > 0 ? "up" : net < 0 ? "down" : "flat";
    row.style.display = "";
  } else {
    row.style.display = "none";
  }
}

export function showPrompt(hud: HudElements, text: string | null): void {
  if (text === null) {
    hud.prompt.style.display = "none";
    return;
  }
  hud.prompt.style.display = "";
  hud.prompt.querySelector("[data-prompt-text]")!.textContent = text;
}

/**
 * Toast duration in milliseconds. Default 7.5s (3x the previous 2.5s).
 * Lucas reported that 1-2s was too short to read; the toast
 * disappears before the player can finish reading the line. 7.5s is
 * still short enough to not feel intrusive, and long enough to read
 * a one-sentence hint.
 *
 * Toasts STACK: when a new toast comes in, the previous one is not
 * replaced. They are appended to the toast-stack container and each
 * has its own timer. The new toast is placed ABOVE the old one (at
 * the top of the stack). The player can read both.
 */
const TOAST_DURATION_MS = 7500;

export function showToast(hud: HudElements, message: string, type: "info" | "success" | "warning" | "error" = "info"): void {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = message;
  // Newest toast on top of the stack.
  hud.toastStack.prepend(el);
  window.setTimeout(() => {
    // Fade-out animation handled by CSS (opacity transition + max-height).
    el.classList.add("fade-out");
    // After the fade transition, remove the element from the DOM.
    window.setTimeout(() => el.remove(), 400);
  }, TOAST_DURATION_MS);
}
