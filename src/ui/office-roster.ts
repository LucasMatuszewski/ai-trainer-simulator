/**
 * UI: office roster panel.
 *
 * This is the main game-screen UI: a sidebar that lists every NPC in the
 * office as a clickable card. Clicking a card opens that NPC's dialogue
 * (and animates the 3D camera to focus on them). The roster also exposes
 * the "End day" button so the player can leave the office.
 *
 * Why this exists: the previous office view expected the player to walk
 * around with WASD and press E near an NPC to talk to them. That is the
 * wrong shape for a dialogue-driven economic sim (and it is fragile in
 * headless browsers). The roster makes the game playable in one click.
 */

import type { NPC, NpcId } from "../types";

/**
 * C-46: map the controller's live `userData.npcState` to the truth the
 * roster shows - a room name (where the NPC IS) or "Not in office"
 * (where the player cannot reach them). Pure so it is unit-testable.
 */
export function rosterStatusFor(npcState: string): { label: string; available: boolean } {
  switch (npcState) {
    case "gone-home":
      return { label: "Not in office", available: false };
    // C-62: the CEO's conference days - out of the office entirely.
    case "conference":
      return { label: "Out. Conference", available: false };
    // C-51: they have not walked in yet this morning. Same treatment
    // as gone-home - the card is disabled, because there is no body in
    // the office for the player to walk up to.
    case "arriving":
      return { label: "Not in yet", available: false };
    case "walking":
      return { label: "Walking", available: true };
    case "kitchen":
    case "dwelling":
    case "coffee":
    case "lunch":
    case "break-room":
      return { label: "Kitchen", available: true };
    case "toilet":
      return { label: "Toilet", available: true };
    case "meeting":
      return { label: "Meeting room", available: true };
    case "reception":
      return { label: "Reception", available: true };
    case "training":
      return { label: "Training room", available: true };
    case "deal-wall":
      return { label: "Deal Wall", available: true };
    case "content-booth":
      return { label: "Content Booth", available: true };
    default:
      return { label: "At desk", available: true };
  }
}

export interface OfficeRosterHandle {
  root: HTMLElement;
  /** Re-render the relationship numbers / availability state. */
  refresh: (npcStates: Map<NpcId, { relationship: number; available: boolean; status?: string }>) => void;
  /** Set the currently-focused NPC (camera will pan to them). */
  setFocus: (id: NpcId | null) => void;
}

export function mountOfficeRoster(
  root: HTMLElement,
  npcs: readonly NPC[],
  onPick: (npc: NPC) => void,
  onEndDay: () => void,
  onOpenComputer: () => void,
  hasContract: boolean,
): OfficeRosterHandle {
  const wrap = document.createElement("div");
  wrap.className = "office-roster";
  wrap.innerHTML = `
    <div class="roster-header">
      <div class="roster-title">Who is in the office today?</div>
      <div class="roster-sub">Click someone to talk to them.</div>
    </div>
    <div class="roster-list" data-list></div>
    <div class="roster-actions">
      <button data-action="computer" class="roster-action" ${hasContract ? "" : "disabled"} title="${hasContract ? "Debug a client script (+cash on win)" : "You need a contract before you can debug"}">
        <span class="roster-action-glyph">{"</span>
        <span class="roster-action-label">Use computer (debug minigame)</span>
      </button>
      <button data-action="end-day" class="roster-action primary">
        <span class="roster-action-glyph">Z</span>
        <span class="roster-action-label">End day</span>
      </button>
    </div>
  `;
  root.appendChild(wrap);

  const list = wrap.querySelector<HTMLElement>("[data-list]")!;
  const cards: Map<NpcId, HTMLButtonElement> = new Map();

  for (const npc of npcs) {
    const card = document.createElement("button");
    card.className = "roster-card";
    card.dataset.npcId = npc.id;
    card.innerHTML = `
      <div class="roster-portrait">${escapeHtml(npc.emoji)}</div>
      <div class="roster-meta">
        <div class="roster-name">${escapeHtml(npc.name)}</div>
        <div class="roster-role">${escapeHtml(npc.role)}</div>
        <div class="roster-rel" data-rel>Relationship: 0</div>
      </div>
      <div class="roster-status" data-status></div>
    `;
    card.addEventListener("click", () => {
      // C-46: away NPCs are not talkable; the disabled attribute is
      // the primary gate, this guard keeps the callback honest.
      if (card.disabled) return;
      onPick(npc);
    });
    list.appendChild(card);
    cards.set(npc.id, card);
  }

  wrap.querySelector<HTMLButtonElement>('[data-action="end-day"]')!.addEventListener("click", onEndDay);
  const compBtn = wrap.querySelector<HTMLButtonElement>('[data-action="computer"]')!;
  compBtn.addEventListener("click", () => {
    if (!compBtn.disabled) onOpenComputer();
  });

  let currentFocus: NpcId | null = null;
  return {
    root: wrap,
    refresh(npcStates) {
      for (const npc of npcs) {
        const card = cards.get(npc.id)!;
        const s = npcStates.get(npc.id) ?? { relationship: 0, available: true };
        const relEl = card.querySelector<HTMLElement>("[data-rel]")!;
        relEl.textContent = relationshipLabel(s.relationship);
        relEl.dataset.mood = relationshipMood(s.relationship);
        const statusEl = card.querySelector<HTMLElement>("[data-status]")!;
        // C-46: the caller passes the LIVE location label (see
        // rosterStatusFor). Away NPCs get a disabled card - they
        // cannot be talked to while not in the office.
        card.disabled = !s.available;
        if (!s.available) {
          statusEl.textContent = s.status ?? "Not in office";
          statusEl.dataset.state = "away";
        } else if (currentFocus === npc.id) {
          statusEl.textContent = "Talking...";
          statusEl.dataset.state = "talking";
        } else {
          statusEl.textContent = s.status ?? "At desk";
          statusEl.dataset.state = "available";
        }
        card.classList.toggle("focused", currentFocus === npc.id);
        card.classList.toggle("away", !s.available);
      }
    },
    setFocus(id) {
      currentFocus = id;
      for (const [npcId, card] of cards) {
        card.classList.toggle("focused", npcId === id);
      }
    },
  };
}

function relationshipLabel(rel: number): string {
  if (rel >= 50) return `Relationship: BFF (${rel})`;
  if (rel >= 20) return `Relationship: Friend (${rel})`;
  if (rel >= 5) return `Relationship: Acquaintance (${rel})`;
  if (rel > -5) return `Relationship: Neutral (${rel})`;
  if (rel > -20) return `Relationship: Annoyed (${rel})`;
  return `Relationship: Hostile (${rel})`;
}

function relationshipMood(rel: number): string {
  if (rel >= 20) return "good";
  if (rel > -5) return "neutral";
  return "bad";
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
