/**
 * UI: end-day confirmation modal.
 *
 * Z and the roster's End Day button open this instead of ending the day
 * outright — the key sits next to WASD and is easy to hit by accident
 * (Lucas, 2026-09-02). The WebMCP end_day tool deliberately bypasses it:
 * an agent calling the tool made a deliberate API call, not a stray key.
 *
 * While open the simulation clock is frozen — main.ts feeds
 * endDayModalOpen into shouldAdvanceSimulationClock, same contract as
 * the help modal. Enter / "End day" confirms; Escape, Z, "Keep working"
 * or a backdrop click cancels. Handled keys stop propagation so the
 * window-level Z handler in main.ts cannot instantly re-open the modal
 * this one just closed.
 */

export interface EndDayModalHandle {
  root: HTMLElement;
  open: () => void;
  close: () => void;
  isOpen: () => boolean;
}

export function mountEndDayModal(
  parent: HTMLElement,
  onConfirm: () => void,
): EndDayModalHandle {
  const wrap = document.createElement("div");
  wrap.className = "endday-modal";
  wrap.setAttribute("aria-hidden", "true");
  wrap.setAttribute("role", "dialog");
  wrap.innerHTML = `
    <div class="help-modal-backdrop" data-backdrop></div>
    <div class="help-modal-card endday-card" aria-modal="true" aria-labelledby="endday-title">
      <div class="help-modal-header">
        <div class="help-modal-title" id="endday-title">End the day?</div>
      </div>
      <div class="endday-body">
        <p>Any unfinished work waits until tomorrow. Rent is due either way.</p>
        <div class="endday-actions">
          <button class="roster-action primary" data-confirm type="button">End day (Enter)</button>
          <button class="roster-action" data-cancel type="button">Keep working (Esc)</button>
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

  const confirm = (): void => {
    close();
    onConfirm();
  };

  wrap.querySelector<HTMLButtonElement>("[data-confirm]")!.addEventListener("click", confirm);
  wrap.querySelector<HTMLButtonElement>("[data-cancel]")!.addEventListener("click", close);
  wrap.querySelector<HTMLElement>("[data-backdrop]")!.addEventListener("click", close);
  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      confirm();
    } else if (e.key === "Escape" || e.key === "z" || e.key === "Z") {
      e.preventDefault();
      e.stopPropagation();
      close();
    }
  });

  return {
    root: wrap,
    open,
    close,
    isOpen,
  };
}
