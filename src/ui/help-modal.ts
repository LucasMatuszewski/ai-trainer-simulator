/**
 * UI: help / how-to-play modal.
 *
 * Opens when the player clicks the "?" button in the quest log header, or
 * presses F1 anywhere. Pure DOM — no game-state required. Closing it
 * returns focus to whatever was active before.
 */

export interface HelpModalHandle {
  root: HTMLElement;
  open: () => void;
  close: () => void;
}

export function mountHelpModal(parent: HTMLElement): HelpModalHandle {
  const wrap = document.createElement("div");
  wrap.className = "help-modal";
  wrap.setAttribute("aria-hidden", "true");
  wrap.setAttribute("role", "dialog");
  wrap.innerHTML = `
    <div class="help-modal-backdrop" data-backdrop></div>
    <div class="help-modal-card">
      <div class="help-modal-header">
        <div class="help-modal-title">How to play</div>
        <button class="help-modal-close" data-close type="button" aria-label="Close">x</button>
      </div>
      <div class="help-modal-body">
        <section>
          <h3>Goal</h3>
          <p>You are a junior IT trainer. Grow from "Bartek's new hire" to "the best in the GALAXY" without going bankrupt. Survive 30 days. The win condition is decided at the end, not in this manual.</p>
        </section>
        <section>
          <h3>Controls</h3>
          <ul>
            <li><b>Click an NPC</b> in the roster (right side) to walk to them and start a conversation.</li>
            <li><b>Click "Use computer"</b> to debug a client script (minigame, +cash on win).</li>
            <li><b>Click "End day"</b> to finish the day and roll up your income/expenses.</li>
            <li><b>Esc</b> closes any open dialogue.</li>
            <li><b>F3</b> shows or hides the performance meter (FPS, frame time, 1% low).</li>
          </ul>
        </section>
        <section>
          <h3>Stats</h3>
          <ul>
            <li><b>Credibility</b> — how much clients trust you. Low = no contracts.</li>
            <li><b>Caffeine</b> — current coffee level. Below 0 and you cannot focus.</li>
            <li><b>Patience</b> — how much nonsense you can absorb. Low = dialogue options disappear.</li>
            <li><b>Focus</b> — debug-minigame success depends on this.</li>
          </ul>
        </section>
        <section>
          <h3>Money</h3>
          <p>You start with 1,500 zl. Rent is 100 zl/day. Contracts pay 200-500 zl on completion. You can go into debt, but if you stay under -500 for 3 days, you are bankrupt and the game ends.</p>
        </section>
        <section>
          <h3>The cast</h3>
          <p>13 coworkers. They have lives. They have opinions about each other. They will ask you for help, gossip, and occasionally push to main on a Friday.</p>
        </section>
      </div>
    </div>
  `;
  parent.appendChild(wrap);

  const close = (): void => {
    wrap.classList.remove("open");
    wrap.setAttribute("aria-hidden", "true");
  };
  const open = (): void => {
    wrap.classList.add("open");
    wrap.setAttribute("aria-hidden", "false");
  };

  wrap.querySelector<HTMLButtonElement>("[data-close]")!.addEventListener("click", close);
  wrap.querySelector<HTMLElement>("[data-backdrop]")!.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && wrap.classList.contains("open")) {
      close();
    } else if (e.key === "F1") {
      e.preventDefault();
      if (wrap.classList.contains("open")) close();
      else open();
    }
  });

  return {
    root: wrap,
    open,
    close,
  };
}
