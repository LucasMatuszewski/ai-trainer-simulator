/**
 * UI: quest log panel.
 *
 * Shows the current quest (title + 1-sentence description) in the bottom-right
 * of the screen during the office screen. Clicking the quest body opens a
 * small expanded view with the reward and any extra context.
 *
 * This is a passive reminder, not a pop-up — the player should not have to
 * close it to play. The roster card and the office interior are still the
 * primary way to discover what to do.
 */

import type { GameState } from "../types";
import { getActiveQuest, type Quest } from "../content/quests";

export interface QuestLogHandle {
  root: HTMLElement;
  /** Re-render based on the current game state. */
  refresh: (state: Readonly<GameState>) => void;
}

export function mountQuestLog(root: HTMLElement): QuestLogHandle {
  const wrap = document.createElement("div");
  wrap.className = "quest-log";
  wrap.innerHTML = `
    <div class="quest-log-header">
      <div class="quest-log-label">Current quest</div>
      <button class="quest-log-help" data-help type="button" title="How to play" aria-label="How to play">?</button>
    </div>
    <div class="quest-log-body" data-body>
      <div class="quest-log-title" data-title>Loading...</div>
      <div class="quest-log-desc" data-desc></div>
      <div class="quest-log-extra" data-extra hidden></div>
    </div>
  `;
  root.appendChild(wrap);

  const body = wrap.querySelector<HTMLElement>("[data-body]")!;
  const titleEl = wrap.querySelector<HTMLElement>("[data-title]")!;
  const descEl = wrap.querySelector<HTMLElement>("[data-desc]")!;
  const extraEl = wrap.querySelector<HTMLElement>("[data-extra]")!;
  const helpBtn = wrap.querySelector<HTMLButtonElement>("[data-help]")!;

  let currentQuestId: string | null = null;

  function render(quest: Quest | undefined): void {
    if (quest === undefined) {
      titleEl.textContent = "Free time";
      descEl.textContent = "No active quest. Read the wiki. Pet the dog. End the day.";
      extraEl.hidden = true;
      return;
    }
    titleEl.textContent = quest.title;
    descEl.textContent = quest.description;
    const bits: string[] = [];
    if (quest.who) bits.push(`Talk to: ${capitalize(quest.who)}`);
    if (quest.reward) bits.push(`Reward: ${quest.reward}`);
    if (bits.length > 0) {
      extraEl.textContent = bits.join("  •  ");
      extraEl.hidden = false;
    } else {
      extraEl.hidden = true;
    }
  }

  body.addEventListener("click", () => {
    // Toggle expanded state — clicking the body reveals/hides extra details.
    const expanded = body.classList.toggle("expanded");
    extraEl.hidden = !expanded && extraEl.textContent !== "";
  });

  return {
    root: wrap,
    refresh(state) {
      const quest = getActiveQuest(state);
      if (quest?.id !== currentQuestId) {
        currentQuestId = quest?.id ?? null;
        render(quest);
      }
    },
    // Expose the help button so the parent can attach the modal handler
    // without us importing the modal here (avoids a circular dep).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...({ helpButton: helpBtn } as any),
  } as QuestLogHandle;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
