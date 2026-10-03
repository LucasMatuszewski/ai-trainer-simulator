/**
 * UI: dialogue overlay.
 */

import { buildAgentPrompt, COPY_HINT } from "../content/webmcp-help";
import type { DialogueButton, DialogueLink, DialogueNode, DialogueTree, NPC } from "../types";
import { game } from "../game/state";
import { getMemory, setMemory, pickedOptionsFor, markOptionPicked } from "../content/dialogue-memory";
import {
  buildTurn,
  newConversationSession,
  recordExchange,
  type ConversationSession,
  type DialogueTurn,
  type TurnOption,
} from "../game/dialogue-turn";
import {
  V2_MEMORY_TREE_ID,
  type DialogueTurnMemory,
  type NpcDialoguePool,
  type ReplyCandidate,
  type TaskOffer,
} from "../content/dialogue-schema";
import { BUCKET_DELTAS } from "../game/social";
import type { DialogueSteererHandle } from "../jev/dialogue-wrapper";
import { dialoguePoolFor, v2MemoryFor } from "../content/npc-content/dialogue-pools";

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
  /**
   * WS3 (C-77): open a pool-driven v2 conversation for an NPC with
   * authored pools. Same panel; options and replies come from the pure
   * turn builder (deterministic authored fallback) with optional Jev
   * steering on top. `steerer` may be null (Jev off) - the game plays
   * the authored fallback order.
   */
  openV2: (npc: NPC, steerer: DialogueSteererHandle | null) => void;
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
    await navigator.clipboard.writeText(buildAgentPrompt(window.location.href));
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

  // --- WS3: dialogue v2 state (C-77, PRD Flow A2) ---

  /** One open pool-driven v2 conversation. Mutually exclusive with `state`. */
  interface V2Conversation {
    npc: NPC;
    pool: NpcDialoguePool;
    memory: DialogueTurnMemory;
    session: ConversationSession;
    turn: DialogueTurn;
    /** The line currently on screen (the NPC's last answer). */
    reply: ReplyCandidate | null;
    /** A task offer awaiting acceptance (rendered highlighted). */
    pendingOffer: TaskOffer | null;
    steerer: DialogueSteererHandle | null;
  }
  let v2: V2Conversation | null = null;

  function open(npc: NPC, tree: DialogueTree, treeId: string = "default"): void {
    if (state || v2) return; // already open
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
    if (!state && !agentTurnActive && !v2) return;
    agentTurnActive = false;
    v2?.steerer?.nextSession(); // fence in-flight steering (WS4 verdict)
    v2 = null;
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
    return state !== null || agentTurnActive || v2 !== null;
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
    // Repeatable trees (Renata, the support desk) never hide options, so a
    // player can ask for the basics as many times as they like and the menu
    // can never exhaust into the "already heard this story" dead end.
    const picked = tree.repeatable === true ? new Set<string>() : pickedOptionsFor(npc.id, treeId);
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
    // WS3: WebMCP picks pass through the same path as UI clicks (AC-05).
    if (v2 !== null) {
      const index = orderedV2Options().findIndex((entry) => entry.option.id === optionIdValue);
      if (index === -1) return false;
      pickV2(index);
      return true;
    }
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
    // WS3: expose v2 conversations to the WebMCP snapshot too.
    if (v2 !== null) {
      return {
        npcId: v2.npc.id,
        npcName: v2.npc.name,
        treeId: V2_MEMORY_TREE_ID,
        nodeId: v2.turn.topicId,
        text: v2.reply?.text ?? "",
        availableOptions: orderedV2Options().map((entry) => ({
          id: entry.option.id,
          text: entry.option.text,
          nextNodeId: entry.isExit ? "_end" : entry.option.topicId,
        })),
        isTerminal: false,
      };
    }
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
    if (state !== null || v2 !== null) close();
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

  // -------------------------------------------------------------------------
  // WS3: the v2 conversation-turn flow (C-77)
  // -------------------------------------------------------------------------

  /** Used option ids across the persistent memory and this session. */
  function v2UsedOptionIds(): string[] {
    if (v2 === null) return [];
    const ids = new Set<string>([...v2.memory.usedOptionIds]);
    for (const usage of Object.values(v2.session.usage)) {
      for (const id of usage.usedOptionIds) ids.add(id);
    }
    return [...ids];
  }

  /**
   * The turn's options, reordered by the stored steered curation when one
   * exists. The exit option was never sent to the steerer, so it always
   * stays last (AC-04: the exit reserves its slot).
   */
  function orderedV2Options(): TurnOption[] {
    if (v2 === null) return [];
    const entries = [...v2.turn.options];
    const steerer = v2.steerer;
    if (steerer === null) return entries;
    const stored = steerer.memoOptionOrder(v2.npc.id, v2.turn.topicId, v2UsedOptionIds());
    if (stored === null) return entries;
    const rank = new Map<string, number>(stored.map((id, index) => [id, index]));
    return entries.sort(
      (a, b) =>
        (rank.get(a.option.id) ?? Number.MAX_SAFE_INTEGER)
        - (rank.get(b.option.id) ?? Number.MAX_SAFE_INTEGER),
    );
  }

  function ensureV2Container(): HTMLElement {
    if (container === null) {
      container = document.createElement("div");
      container.className = "dialogue";
      root.appendChild(container);
    }
    return container;
  }

  function openV2(npc: NPC, steerer: DialogueSteererHandle | null): void {
    if (state !== null || v2 !== null || agentTurnActive) return;
    const pool = dialoguePoolFor(npc.id);
    if (pool === undefined) return;
    const memory = v2MemoryFor(npc.id);
    setMemory(npc.id, { visitCount: getMemory(npc.id).visitCount + 1 });
    const session = newConversationSession();
    const turn = buildTurn(game.get(), npc.id, memory, session, pool);
    if (turn === null) return;
    v2 = {
      npc,
      pool,
      memory,
      session,
      turn,
      reply: turn.replyCandidates[0] ?? null,
      pendingOffer: null,
      steerer,
    };
    setMemory(npc.id, { lastTopic: turn.topicId });
    renderV2();
  }

  function renderV2(): void {
    if (v2 === null) return;
    const { npc, reply, pendingOffer } = v2;
    const el = ensureV2Container();
    const entries = orderedV2Options();
    el.innerHTML = `
      <div class="portrait">${escapeHtml(npc.emoji)}</div>
      <div class="content">
        <div><span class="name">${escapeHtml(npc.name)}</span><span class="role">${escapeHtml(npc.role)}</span></div>
        <div class="text">${escapeHtml(reply?.text ?? "")}</div>
        <div class="options">
          ${pendingOffer !== null
            ? `<button class="task" data-v2-task>${escapeHtml(`Accept: ${pendingOffer.title}`)}</button>`
            : ""}
          ${entries
            .map((entry, index) => `<button data-v2-opt="${index}">${escapeHtml(entry.option.text)}</button>`)
            .join("")}
        </div>
      </div>
      <button class="skip" data-skip>Skip</button>
    `;
    el.querySelector<HTMLButtonElement>("[data-v2-task]")?.addEventListener("click", () => pickV2Task());
    el.querySelectorAll<HTMLButtonElement>("[data-v2-opt]").forEach((button) => {
      button.addEventListener("click", () => pickV2(Number(button.dataset.v2Opt ?? "-1")));
    });
    el.querySelector<HTMLButtonElement>("[data-skip]")!.addEventListener("click", finishV2);
  }

  /** Accepting a task sets an EXISTING flag via the standard effect path. */
  function pickV2Task(): void {
    if (v2 === null || v2.pendingOffer === null) return;
    game.dispatch({ type: "set-flag", flag: v2.pendingOffer.flagToSet, value: true });
    v2.pendingOffer = null;
    renderV2();
  }

  function pickV2(index: number): void {
    if (v2 === null) return;
    const entry = orderedV2Options()[index];
    if (entry === undefined) return;
    if (entry.isExit) {
      finishV2();
      return;
    }
    const option = entry.option;
    // C-78 (Lucas's playtest ruling): the answer to the option the player
    // clicked is its PAIRED reply — deterministic, zero Jev involvement.
    // The old steered reply ignored the clicked option entirely.
    const paired = v2.turn.repliesFor(option.id);
    const usedReplyIds = v2.memory.usedReplyIds;
    // Unused variant first; an exhausted option repeats its own answer
    // (never another option's line). Task offers ride their own option.
    const reply =
      paired.find((candidate) => !usedReplyIds.has(candidate.id))
      ?? paired[0]
      ?? null;
    const topicId = v2.turn.topicId;
    if (reply !== null) {
      // D-50: the reaction is the author-tagged bucket, mapped through the
      // social model's single bucket table to a bounded delta. No numbers
      // ever come from a judgment.
      game.dispatch({
        type: "add-relationship",
        npcId: v2.npc.id,
        delta: BUCKET_DELTAS[reply.relationshipHint ?? "neutral"].relDelta,
      });
      v2.pendingOffer =
        reply.offersTaskId !== undefined
          ? v2.pool.taskOffers.find((task) => task.id === reply.offersTaskId) ?? null
          : null;
    }
    // L-2026-08-30-02: an option the player answered never comes back.
    markOptionPicked(v2.npc.id, V2_MEMORY_TREE_ID, option.id);
    v2.memory = {
      usedOptionIds: new Set([...v2.memory.usedOptionIds, option.id]),
      usedReplyIds: new Set([...v2.memory.usedReplyIds, reply?.id ?? ""]),
    };
    v2.session = recordExchange(v2.session, topicId, option.id, reply?.id ?? "none");
    setMemory(v2.npc.id, { lastTopic: topicId });
    const nextTurn = buildTurn(game.get(), v2.npc.id, v2.memory, v2.session, v2.pool);
    if (nextTurn === null) {
      finishV2();
      return;
    }
    v2.turn = nextTurn;
    v2.reply = nextTurn.replyCandidates[0] ?? null;
    renderV2();
  }

  function finishV2(): void {
    game.dispatch({ type: "increment-total", key: "dialoguesFinished" });
    v2?.steerer?.resetSession();
    close();
  }

  return {
    open,
    openV2,
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
