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
  toast: HTMLElement;
  toastTimer: number | null;
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
    <div class="toast" data-toast style="display:none"></div>
  `;
  return {
    root,
    cash: root.querySelector("[data-cash]")!,
    day: root.querySelector("[data-day]")!,
    time: root.querySelector("[data-day]")!, // aliased
    prompt: root.querySelector("[data-prompt]")!,
    toast: root.querySelector("[data-toast]")!,
    toastTimer: null,
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
 */
const TOAST_DURATION_MS = 7500;

export function showToast(hud: HudElements, message: string, type: "info" | "success" | "warning" | "error" = "info"): void {
  hud.toast.textContent = message;
  hud.toast.className = `toast ${type}`;
  hud.toast.style.display = "";
  if (hud.toastTimer !== null) {
    clearTimeout(hud.toastTimer);
  }
  hud.toastTimer = window.setTimeout(() => {
    hud.toast.style.display = "none";
    hud.toastTimer = null;
  }, TOAST_DURATION_MS);
}
