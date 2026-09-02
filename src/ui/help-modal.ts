/**
 * UI: help / how-to-play modal.
 *
 * Opens when the player clicks the "?" button in the quest log header, or
 * presses ? / F1 anywhere. Pure DOM — no game-state required. Closing it
 * returns focus to whatever was active before.
 */

export interface HelpModalHandle {
  root: HTMLElement;
  open: () => void;
  close: () => void;
  isOpen: () => boolean;
}

export function mountHelpModal(parent: HTMLElement): HelpModalHandle {
  const wrap = document.createElement("div");
  wrap.className = "help-modal";
  wrap.setAttribute("aria-hidden", "true");
  wrap.setAttribute("role", "dialog");
  wrap.innerHTML = `
    <div class="help-modal-backdrop" data-backdrop></div>
    <div class="help-modal-card" aria-modal="true" aria-labelledby="help-modal-title">
      <div class="help-modal-header">
        <div class="help-modal-title" id="help-modal-title">How to play</div>
        <button class="help-modal-close" data-close type="button" aria-label="Close">x</button>
      </div>
      <div class="help-modal-body">
        <div class="help-controls" aria-label="Complete controls">
          <section>
            <h3>Move &amp; look</h3>
            <dl class="help-control-list">
              <div><dt>WASD / Arrow keys</dt><dd>Move relative to where you are looking.</dd></div>
              <div><dt>Shift</dt><dd>Hold while moving to run.</dd></div>
              <div><dt>Right mouse button</dt><dd>Hold and move the mouse to look around.</dd></div>
              <div><dt>Space</dt><dd>Toggle locked mouse-look for a mouse or trackpad.</dd></div>
              <div><dt>Escape</dt><dd>Release mouse-look or close the active help/dialogue.</dd></div>
            </dl>
          </section>
          <section>
            <h3>Talk &amp; act</h3>
            <dl class="help-control-list">
              <div><dt>Click an NPC</dt><dd>Walk up and start a conversation.</dd></div>
              <div><dt>Click the roster</dt><dd>Find a coworker, then walk to them automatically.</dd></div>
              <div><dt>Use computer</dt><dd>Start the debug minigame after getting a contract.</dd></div>
              <div><dt>Z / End Day</dt><dd>Finish today and show the cash-and-stats summary.</dd></div>
            </dl>
          </section>
          <section>
            <h3>Interface</h3>
            <dl class="help-control-list">
              <div><dt>? button / ? / F1</dt><dd>Open or close this help reference.</dd></div>
              <div><dt>Quest log</dt><dd>Click the current quest to expand its instructions.</dd></div>
              <div><dt>Dialogue choices</dt><dd>Click a response; use Skip to leave early.</dd></div>
              <div><dt>F3</dt><dd>Show or hide FPS, frame time, 1% low, draws, and triangles.</dd></div>
            </dl>
          </section>
        </div>
        <div class="help-guidance">
          <section>
            <h3>Goal</h3>
            <p>You are a junior IT trainer. Become "the best in the GALAXY" without going bankrupt. Survive 30 days, take contracts, and keep the office relationships alive.</p>
          </section>
          <section>
            <h3>Stats</h3>
            <ul>
              <li><b>Credibility</b> unlocks contracts.</li>
              <li><b>Caffeine</b> keeps you functioning.</li>
              <li><b>Patience</b> keeps dialogue options open.</li>
              <li><b>Focus</b> helps in debug minigames.</li>
            </ul>
          </section>
          <section>
            <h3>Money</h3>
            <p>You start with 1,500 zl. Rent is 100 zl/day; contracts pay 200-500 zl. Staying below -500 for 3 days means bankruptcy.</p>
          </section>
          <section>
            <h3>The cast</h3>
            <p>14 coworkers and one office dog, each with a schedule, memories, opinions, gossip, and the occasional Friday push to main.</p>
          </section>
        </div>
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
  const isOpen = (): boolean => wrap.classList.contains("open");

  wrap.querySelector<HTMLButtonElement>("[data-close]")!.addEventListener("click", close);
  wrap.querySelector<HTMLElement>("[data-backdrop]")!.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    const isHelpShortcut = e.key === "F1" || e.key === "?" || (
      e.code === "Slash" && e.shiftKey
    );
    if (e.key === "Escape" && isOpen()) {
      close();
    } else if (isHelpShortcut) {
      e.preventDefault();
      if (isOpen()) close();
      else open();
    }
  });

  return {
    root: wrap,
    open,
    close,
    isOpen,
  };
}
