/**
 * UI: dialogue overlay.
 */

import type { DialogueNode, DialogueTree, NPC } from "../types";
import { game } from "../game/state";
import { getMemory, setMemory, pickedOptionsFor, markOptionPicked } from "../content/dialogue-memory";

export interface DialogueController {
  open: (npc: NPC, tree: DialogueTree, treeId?: string) => void;
  close: () => void;
  isOpen: () => boolean;
  /** Subscribe to node changes (initial open + every option pick). */
  onNodeShown: (cb: (npc: NPC, nodeId: string) => void) => void;
}

export function closeDialogueForScreenTransition(
  controller: DialogueController | null,
): void {
  if (controller?.isOpen()) controller.close();
}

interface DialogueState {
  npc: NPC;
  tree: DialogueTree;
  /** Stable id of this tree within the NPC's dialogues map. Used to
   * scope the per-NPC option memory (so the same option text in two
   * different trees is tracked independently). */
  treeId: string;
  currentNodeId: string;
}

export function createDialogue(root: HTMLElement, onClose: () => void): DialogueController {
  let state: DialogueState | null = null;
  let container: HTMLElement | null = null;
  let nodeListener: ((npc: NPC, nodeId: string) => void) | null = null;

  function open(npc: NPC, tree: DialogueTree, treeId: string = "default"): void {
    if (state) return; // already open
    state = { npc, tree, treeId, currentNodeId: "greeting" };
    const memory = getMemory(npc.id);
    setMemory(npc.id, {
      lastTopic: "greeting",
      visitCount: memory.visitCount + 1,
      seenNodes: new Set([...memory.seenNodes, "greeting"]),
    });
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
    const { npc, tree, treeId, currentNodeId } = state;
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

    // Nodes with an explicit next auto-advance. Terminal lines stay visible
    // until the player acknowledges them.
    if (!node.options || node.options.length === 0) {
      const next = node.next;
      if (next && next !== "_end") {
        showNode(next);
        render();
        return;
      }

      ensureContainer();
      container!.innerHTML = `
        <div class="portrait">${escapeHtml(npc.emoji)}</div>
        <div class="content">
          <div><span class="name">${escapeHtml(npc.name)}</span><span class="role">${escapeHtml(npc.role)}</span></div>
          <div class="text">${escapeHtml(node.text)}</div>
          <div class="options"><button data-continue>Continue</button></div>
        </div>
        <button class="skip" data-skip>Skip</button>
      `;
      container!.querySelector<HTMLButtonElement>("[data-continue]")!.addEventListener("click", finish);
      container!.querySelector<HTMLButtonElement>("[data-skip]")!.addEventListener("click", finish);
      return;
    }

    // Filter out options the player has already picked in this tree
    // (L-2026-08-30-02: "The NPC must NEVER repeat a dialogue the player
    // has already answered — only re-show un-answered ones"). If every
    // option has been picked we show a "You have heard this story" line
    // so the dialogue is still closeable.
    const picked = pickedOptionsFor(npc.id, treeId);
    const availableOptions = node.options.filter(
      (o) => !picked.has(optionId(o)),
    );

    ensureContainer();

    if (availableOptions.length === 0) {
      // All options already answered. Show a closing line so the
      // dialogue is still closeable.
      container!.innerHTML = `
        <div class="portrait">${escapeHtml(npc.emoji)}</div>
        <div class="content">
          <div><span class="name">${escapeHtml(npc.name)}</span><span class="role">${escapeHtml(npc.role)}</span></div>
          <div class="text">${escapeHtml(node.text)}</div>
          <div class="text memory-note">You have already heard this story.</div>
          <div class="options"><button data-continue>OK</button></div>
        </div>
        <button class="skip" data-skip>Skip</button>
      `;
      container!.querySelector<HTMLButtonElement>("[data-continue]")!.addEventListener("click", finish);
      container!.querySelector<HTMLButtonElement>("[data-skip]")!.addEventListener("click", finish);
      return;
    }

    container!.innerHTML = `
      <div class="portrait">${escapeHtml(npc.emoji)}</div>
      <div class="content">
        <div><span class="name">${escapeHtml(npc.name)}</span><span class="role">${escapeHtml(npc.role)}</span></div>
        <div class="text">${escapeHtml(node.text)}</div>
        <div class="options">
          ${availableOptions
            .map(
              (o) =>
                `<button data-opt="${escapeHtml(optionId(o))}">${escapeHtml(o.text)}</button>`,
            )
            .join("")}
        </div>
      </div>
      <button class="skip" data-skip>Skip</button>
    `;

    container!.querySelectorAll<HTMLButtonElement>("[data-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const optId = btn.dataset.opt ?? "";
        const opt = availableOptions.find((o) => optionId(o) === optId);
        if (!opt) return;
        markOptionPicked(npc.id, treeId, optId);
        if (opt.effects) {
          for (const eff of opt.effects) {
            applyEffect(npc, eff);
          }
        }
        if (opt.nextNodeId === "_end") {
          finish();
          return;
        }
        showNode(opt.nextNodeId);
        render();
      });
    });

    container!.querySelector<HTMLButtonElement>("[data-skip]")!.addEventListener("click", finish);

    function ensureContainer(): void {
      if (container) return;
      container = document.createElement("div");
      container.className = "dialogue";
      root.appendChild(container);
    }

    function finish(): void {
      game.dispatch({ type: "increment-total", key: "dialoguesFinished" });
      close();
    }

    function showNode(nodeId: string): void {
      if (!state) return;
      state.currentNodeId = nodeId;
      const memory = getMemory(npc.id);
      setMemory(npc.id, {
        lastTopic: nodeId,
        seenNodes: new Set([...memory.seenNodes, nodeId]),
      });
      nodeListener?.(npc, nodeId);
    }
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

/** Stable identifier for a dialogue option. Prefers the explicit `id`
 * field; falls back to `nextNodeId` so existing trees without
 * `id` still work (two options in the same node that point to the
 * same next node will collapse into one, which is the current
 * behavior). */
function optionId(o: { id?: string; nextNodeId: string }): string {
  return o.id ?? o.nextNodeId;
}

export type { DialogueNode };
