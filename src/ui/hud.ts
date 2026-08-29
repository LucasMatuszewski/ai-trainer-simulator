/**
 * UI: HUD (cash, day, time) + context prompt.
 * Mounted in #ui-root, re-renders on game state changes.
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
}

export function mountHud(root: HTMLElement): HudElements {
  root.innerHTML = `
    <div class="hud">
      <div>
        <div class="cash" data-cash>1,500 zl</div>
        <div class="day" data-day>Day 1 - Morning</div>
      </div>
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
  };
}

const TIME_LABEL: Record<GameState["timeOfDay"], string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

export function renderHud(hud: HudElements, state: Readonly<GameState>): void {
  const cash = state.cash;
  const formatted = new Intl.NumberFormat("en-US").format(Math.round(cash)) + " zl";
  hud.cash.textContent = formatted;
  hud.cash.classList.toggle("negative", cash < 0);
  hud.day.textContent = `Day ${state.day} - ${TIME_LABEL[state.timeOfDay]}`;
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
