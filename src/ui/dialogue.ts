/**
 * UI: dialogue overlay.
 */

import type { DialogueNode, DialogueTree, NPC } from "../types";
import { game } from "../game/state";

export interface DialogueController {
  open: (npc: NPC, tree: DialogueTree) => void;
  close: () => void;
  isOpen: () => boolean;
  /** Subscribe to node changes (initial open + every option pick). */
  onNodeShown: (cb: (npc: NPC, nodeId: string) => void) => void;
}

interface DialogueState {
  npc: NPC;
  tree: DialogueTree;
  currentNodeId: string;
}

export function createDialogue(root: HTMLElement, onClose: () => void): DialogueController {
  let state: DialogueState | null = null;
  let container: HTMLElement | null = null;
  let nodeListener: ((npc: NPC, nodeId: string) => void) | null = null;

  function open(npc: NPC, tree: DialogueTree): void {
    if (state) return; // already open
    state = { npc, tree, currentNodeId: "greeting" };
    nodeListener?.(npc, "greeting");
    render();
  }

  function close(): void {
    if (!state) return;
    state = null;
    if (container) {
      container.remove();
      container = null;
    }
    onClose();
  }

  function isOpen(): boolean {
    return state !== null;
  }

  function render(): void {
    if (!state) return;
    const { npc, tree, currentNodeId } = state;
    const node = tree.nodes[currentNodeId];
    if (!node) {
      close();
      return;
    }

    // Apply node-entry effects.
    if (node.effects) {
      for (const eff of node.effects) {
        applyEffect(npc, eff);
      }
    }

    // If the node has no options, auto-advance.
    if (!node.options || node.options.length === 0) {
      const next = node.next;
      if (!next || next === "_end") {
        game.dispatch({ type: "increment-total", key: "dialoguesFinished" });
        close();
        return;
      }
      state.currentNodeId = next;
      nodeListener?.(npc, next);
      render();
      return;
    }

    if (!container) {
      container = document.createElement("div");
      container.className = "dialogue";
      root.appendChild(container);
    }

    container.innerHTML = `
      <div class="portrait">${escapeHtml(npc.emoji)}</div>
      <div class="content">
        <div><span class="name">${escapeHtml(npc.name)}</span><span class="role">${escapeHtml(npc.role)}</span></div>
        <div class="text">${escapeHtml(node.text)}</div>
        <div class="options">
          ${node.options
            .map(
              (o, i) =>
                `<button data-opt="${i}">${escapeHtml(o.text)}</button>`,
            )
            .join("")}
        </div>
      </div>
      <button class="skip" data-skip>Skip</button>
    `;

    container.querySelectorAll<HTMLButtonElement>("[data-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.opt ?? "0", 10);
        const opt = node.options?.[idx];
        if (!opt) return;
        if (opt.effects) {
          for (const eff of opt.effects) {
            applyEffect(npc, eff);
          }
        }
        if (opt.nextNodeId === "_end") {
          game.dispatch({ type: "increment-total", key: "dialoguesFinished" });
          close();
          return;
        }
        state!.currentNodeId = opt.nextNodeId;
        nodeListener?.(npc, opt.nextNodeId);
        render();
      });
    });

    container.querySelector<HTMLButtonElement>("[data-skip]")!.addEventListener("click", () => {
      game.dispatch({ type: "increment-total", key: "dialoguesFinished" });
      close();
    });
  }

  return {
    open,
    close,
    isOpen,
    onNodeShown(cb) {
      nodeListener = cb;
    },
  };
}

function applyEffect(npc: NPC, eff: import("../types").Effect): void {
  switch (eff.type) {
    case "add-cash":
      game.dispatch({ type: "add-cash", amount: eff.delta });
      break;
    case "spend-cash":
      game.dispatch({ type: "spend-cash", amount: Math.abs(eff.delta) });
      break;
    case "add-stat":
      game.dispatch({ type: "add-stat", stat: eff.target, delta: eff.delta });
      break;
    case "add-relationship":
      game.dispatch({ type: "add-relationship", npcId: eff.target || npc.id, delta: eff.delta });
      break;
    case "set-flag":
      game.dispatch({ type: "set-flag", flag: eff.target, value: Boolean(eff.delta) });
      break;
    case "increment-total":
      game.dispatch({ type: "increment-total", key: eff.target });
      break;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type { DialogueNode };
