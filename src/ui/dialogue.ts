/**
 * UI: dialogue overlay.
 */

import { AGENT_PROMPT, COPY_HINT } from "../content/webmcp-help";
import type { DialogueButton, DialogueLink, DialogueNode, DialogueTree, NPC } from "../types";
import { game } from "../game/state";
import { getMemory, setMemory, pickedOptionsFor, markOptionPicked } from "../content/dialogue-memory";

export interface DialogueController {
  open: (npc: NPC, tree: DialogueTree, treeId?: string) => void;
  close: () => void;
  isOpen: () => boolean;
  /**
   * Pick an option by id (L-2026-08-30-01: WebMCP is a PLAYER surface).
   * Returns true if the option was found and clicked. The dialogue
   * closes itself if the option's nextNodeId is "_end", or stays
   * open on the next node.
   */
  pickOption: (optionId: string) => boolean;
  /**
   * Snapshot of the dialogue's current node (for WebMCP tools that
   * need to know the current text + available options without
   * scraping the DOM). Null when no dialogue is open.
   */
  snapshot: () => DialogueSnapshot | null;
  /** Subscribe to node changes (initial open + every option pick). */
  onNodeShown: (cb: (npc: NPC, nodeId: string) => void) => void;
  /** Subscribe to close events. */
  onClose: (cb: () => void) => void;
  /**
   * ADR 0008 D-37: render one AGENT-AUTHORED turn.
   *
   * Separate from `open` on purpose. It takes a plain speaker rather than an
   * NPC, because the agent companion has no NpcId - that union is
   * exhaustively mapped by the schedule and gender tables, so widening it to
   * fit a runtime character would break both.
   *
   * It also bypasses the per-NPC option memory deliberately. That memory
   * exists to stop a hand-authored NPC repeating a story the player already
   * answered (L-2026-08-30-02), but an agent legitimately re-offers similar
   * replies across turns, and filtering them would silently blank the
   * companion's options.
   */
  openAgentTurn: (
    speaker: AgentSpeaker,
    line: string,
    options: readonly AgentTurnOption[],
    onPick: (choice: string, index: number, ends: boolean) => void,
  ) => void;
  /** True while an agent-authored conversation is on screen. */
  isAgentTurn: () => boolean;
}

/** One agent-authored reply. `ends` closes the conversation when picked. */
export interface AgentTurnOption {
  text: string;
  ends?: boolean;
}

/** A dialogue speaker that is not one of the fixed cast. */
export interface AgentSpeaker {
  name: string;
  role: string;
  emoji: string;
}

export interface DialogueSnapshot {
  npcId: string;
  npcName: string;
  treeId: string;
  nodeId: string;
  text: string;
  /** Options the player has not yet picked (filtered by the
   * per-NPC option memory). */
  availableOptions: Array<{
    id: string;
    text: string;
    nextNodeId: string;
  }>;
  /** True when this is the last node and the dialogue will close
   *  on the next action. */
  isTerminal: boolean;
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

/**
 * Render an optional external link under a dialogue line.
 *
 * Both the label and the href are escaped, and the href is checked against an
 * https allowlist before it is emitted at all - dialogue content is authored
 * data today, but this is the one place a URL reaches the DOM, and a
 * javascript: href here would be an XSS with a friendly face.
 */
function renderLink(link: DialogueLink | undefined): string {
  if (link === undefined) return "";
  return renderLinks([link]);
}

/** Render every link; each href is https-checked exactly like renderLink. */
function renderLinks(links: readonly DialogueLink[] | undefined): string {
  if (links === undefined || links.length === 0) return "";
  const anchors = links
    .map((link) => {
      let parsed: URL;
      try {
        parsed = new URL(link.href);
      } catch {
        return "";
      }
      if (parsed.protocol !== "https:") return "";
      return (
        `<a href="${escapeHtml(parsed.toString())}" target="_blank" rel="noopener noreferrer">` +
        `${escapeHtml(link.text)}</a>`
      );
    })
    .filter((anchor) => anchor.length > 0);
  if (anchors.length === 0) return "";
  return `<div class="dialogue-link">${anchors.join('<span class="dialogue-link-sep"> | </span>')}</div>`;
}

/**
 * Render the action buttons.
 *
 * Copying is done right here (clipboard is pure UI); opening a modal is
 * dispatched as a DOM event so the dialogue layer stays decoupled from which
 * modals exist - main.ts owns that.
 */
function renderButtons(buttons: readonly DialogueButton[] | undefined): string {
  if (buttons === undefined || buttons.length === 0) return "";
  const els = buttons
    .map((button, index) => {
      const action =
        button.modal !== undefined
          ? `data-open-modal="${escapeHtml(button.modal)}"`
          : button.copyPrompt === true
            ? `data-copy-prompt="${index}"`
            : "";
      if (action === "") return "";
      return `<button type="button" class="dialogue-action" ${action}>${escapeHtml(button.text)}</button>`;
    })
    .filter((el) => el.length > 0);
  if (els.length === 0) return "";
  return `<div class="dialogue-actions">${els.join("")}</div>`;
}

/** Modal-open events are consumed by main.ts, which owns the modals. */
function wireActionButtons(container: HTMLElement): void {
  container.querySelectorAll<HTMLButtonElement>("[data-copy-prompt]").forEach((button) => {
    button.addEventListener("click", () => void copyAgentPrompt(button));
  });
  container.querySelectorAll<HTMLButtonElement>("[data-open-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      window.dispatchEvent(
        new CustomEvent("stack-underflow:open-modal", { detail: { modal: button.dataset.openModal } }),
      );
    });
  });
}

async function copyAgentPrompt(button: HTMLButtonElement): Promise<void> {
  const original = button.textContent;
  try {
    await navigator.clipboard.writeText(AGENT_PROMPT);
    button.textContent = COPY_HINT;
    button.disabled = true;
  } catch {
    // Clipboard can be denied (permissions policy, non-secure context). The
    // prompt is short enough to show in place of the button label.
    button.textContent = "Copy blocked - select it in the setup guide";
  }
  setTimeout(() => {
    button.textContent = original;
    button.disabled = false;
  }, 2500);
}

export function createDialogue(root: HTMLElement, onClose: () => void): DialogueController {
  let state: DialogueState | null = null;
  let container: HTMLElement | null = null;
  let nodeListener: ((npc: NPC, nodeId: string) => void) | null = null;
  let closeListener: (() => void) | null = null;
  // The current node's full info (rebuilt on every render so
  // pickOption / snapshot can read it without scraping the DOM).
  let currentNode: DialogueNode | null = null;
  let currentAvailableOptions: DialogueSnapshot["availableOptions"] = [];
  /** Set while an agent-authored turn owns the panel. */
  let agentTurnActive = false;

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
    if (!state && !agentTurnActive) return;
    agentTurnActive = false;
    state = null;
    currentNode = null;
    currentAvailableOptions = [];
    if (container) {
      container.remove();
      container = null;
    }
    onClose();
    closeListener?.();
  }

  function isOpen(): boolean {
    return state !== null || agentTurnActive;
  }

  function render(): void {
    if (!state) return;
    const { npc, tree, treeId, currentNodeId } = state;
    const node = tree.nodes[currentNodeId];
    if (!node) {
      close();
      return;
    }
    currentNode = node;

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

      // Terminal node (no options, no auto-next). The "Continue" button
      // is the only thing the player can press, so we record an empty
      // option list and `isTerminal` will be derived from it.
      currentAvailableOptions = [];
      ensureContainer();
      container!.innerHTML = `
        <div class="portrait">${escapeHtml(npc.emoji)}</div>
        <div class="content">
          <div><span class="name">${escapeHtml(npc.name)}</span><span class="role">${escapeHtml(npc.role)}</span></div>
          <div class="text">${escapeHtml(node.text)}</div>
          ${renderLink(node.link)}
          ${renderLinks(node.links)}
          ${renderButtons(node.buttons)}
          <div class="options"><button data-continue>Continue</button></div>
        </div>
        <button class="skip" data-skip>Skip</button>
      `;
wireActionButtons(container!);
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
    currentAvailableOptions = availableOptions.map((o) => ({
      id: optionId(o),
      text: o.text,
      nextNodeId: o.nextNodeId,
    }));

    ensureContainer();

    if (availableOptions.length === 0) {
      // All options already answered. Show a closing line so the
      // dialogue is still closeable.
      container!.innerHTML = `
        <div class="portrait">${escapeHtml(npc.emoji)}</div>
        <div class="content">
          <div><span class="name">${escapeHtml(npc.name)}</span><span class="role">${escapeHtml(npc.role)}</span></div>
          <div class="text">${escapeHtml(node.text)}</div>
          ${renderLink(node.link)}
          ${renderLinks(node.links)}
          ${renderButtons(node.buttons)}
          <div class="text memory-note">You have already heard this story.</div>
          <div class="options"><button data-continue>OK</button></div>
        </div>
        <button class="skip" data-skip>Skip</button>
      `;
wireActionButtons(container!);
      container!.querySelector<HTMLButtonElement>("[data-continue]")!.addEventListener("click", finish);
      container!.querySelector<HTMLButtonElement>("[data-skip]")!.addEventListener("click", finish);
      return;
    }

    container!.innerHTML = `
      <div class="portrait">${escapeHtml(npc.emoji)}</div>
      <div class="content">
        <div><span class="name">${escapeHtml(npc.name)}</span><span class="role">${escapeHtml(npc.role)}</span></div>
        <div class="text">${escapeHtml(node.text)}</div>
          ${renderLink(node.link)}
          ${renderLinks(node.links)}
          ${renderButtons(node.buttons)}
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

wireActionButtons(container!);
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

  function pickOption(optionIdValue: string): boolean {
    if (!state || !currentNode) return false;
    const opt = currentNode.options?.find((o) => optionId(o) === optionIdValue);
    if (!opt) return false;
    const npc = state.npc;
    const treeId = state.treeId;
    markOptionPicked(npc.id, treeId, optionIdValue);
    if (opt.effects) {
      for (const eff of opt.effects) {
        applyEffect(npc, eff);
      }
    }
    if (opt.nextNodeId === "_end") {
      game.dispatch({ type: "increment-total", key: "dialoguesFinished" });
      close();
      return true;
    }
    showNodePublic(opt.nextNodeId);
    render();
    return true;
  }

  function snapshot(): DialogueSnapshot | null {
    if (!state || !currentNode) return null;
    return {
      npcId: state.npc.id,
      npcName: state.npc.name,
      treeId: state.treeId,
      nodeId: state.currentNodeId,
      text: currentNode.text,
      availableOptions: currentAvailableOptions,
      isTerminal: currentAvailableOptions.length === 0 && !currentNode.next,
    };
  }

  function showNodePublic(nodeId: string): void {
    if (!state) return;
    state.currentNodeId = nodeId;
    const memory = getMemory(state.npc.id);
    setMemory(state.npc.id, {
      lastTopic: nodeId,
      seenNodes: new Set([...memory.seenNodes, nodeId]),
    });
    nodeListener?.(state.npc, nodeId);
  }

  /**
   * Render a single agent-authored turn (D-37).
   *
   * Markup in the agent's text is escaped exactly like authored copy, so a
   * model that emits HTML gets it shown as characters rather than parsed.
   * The panel is the same .dialogue element the hand-authored trees use, so
   * an agent turn is visually indistinguishable from a written one - which is
   * the point.
   */
  function openAgentTurn(
    speaker: AgentSpeaker,
    line: string,
    options: readonly AgentTurnOption[],
    onPick: (choice: string, index: number, ends: boolean) => void,
  ): void {
    // An agent turn replaces the previous turn in place; a normal NPC
    // dialogue is closed first so the two can never share the panel.
    if (state !== null) close();
    agentTurnActive = true;

    if (!container) {
      container = document.createElement("div");
      container.className = "dialogue";
      root.appendChild(container);
    }

    container.innerHTML = `
      <div class="portrait">${escapeHtml(speaker.emoji)}</div>
      <div class="content">
        <div><span class="name">${escapeHtml(speaker.name)}</span><span class="role">${escapeHtml(speaker.role)}</span></div>
        <div class="text">${escapeHtml(line)}</div>
        <div class="options">
          ${options
            .map(
              (option, i) =>
                `<button data-agent-opt="${i}"${option.ends === true ? ' class="ends"' : ""}>` +
                `${escapeHtml(option.text)}</button>`,
            )
            .join("")}
        </div>
      </div>
      <button class="skip" data-skip>Leave</button>
    `;

    container.querySelectorAll<HTMLButtonElement>("[data-agent-opt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = Number(btn.dataset.agentOpt ?? "-1");
        const option = options[index];
        if (option === undefined) return;
        onPick(option.text, index, option.ends === true);
      });
    });

    container.querySelector<HTMLButtonElement>("[data-skip]")!.addEventListener("click", () => {
      game.dispatch({ type: "increment-total", key: "dialoguesFinished" });
      close();
    });
  }

  return {
    open,
    openAgentTurn,
    isAgentTurn: () => agentTurnActive,
    close,
    isOpen,
    pickOption,
    snapshot,
    onNodeShown(cb) {
      nodeListener = cb;
    },
    onClose(cb) {
      closeListener = cb;
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
