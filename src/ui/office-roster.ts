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
  const cards: Map<NpcId, HTMLElement> = new Map();

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
    card.addEventListener("click", () => onPick(npc));
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
        // C-45 amendment (l)(5): surface the live NPC state (kitchen,
        // dwelling, walking, gone-home) instead of the always-lying
        // "At desk". gone-home = unavailable (evening / away); the
        // other states remain clickable so the player can still
        // approach a luncher or a mid-walk NPC.
        if (!s.available) {
          statusEl.textContent = "Not in office";
          statusEl.dataset.state = "away";
        } else if (s.status === "kitchen" || s.status === "dwelling") {
          statusEl.textContent = s.status === "dwelling" ? "At kitchen" : "Walking to kitchen";
          statusEl.dataset.state = "available";
        } else if (s.status === "walking") {
          statusEl.textContent = "Walking";
          statusEl.dataset.state = "available";
        } else if (currentFocus === npc.id) {
          statusEl.textContent = "Talking...";
          statusEl.dataset.state = "talking";
        } else {
          statusEl.textContent = "At desk";
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
