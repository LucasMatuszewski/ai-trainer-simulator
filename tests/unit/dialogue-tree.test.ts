// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import { DIALOGUES } from "../../src/content/dialogues";
import {
  getMemory,
  NPC_MEMORY,
  setMemory,
} from "../../src/content/dialogue-memory";
import { createDialogue } from "../../src/ui/dialogue";
import type { DialogueTree, NPC, NpcId } from "../../src/types";
import { game } from "../../src/game/state";

vi.mock("../../src/game/state", () => ({
  game: { dispatch: vi.fn() },
}));

const npc: NPC = {
  id: "bartek",
  name: "Bartek",
  role: "Senior Consultant",
  emoji: "B",
  position: { x: 0, y: 0, z: 0 },
  triggerRadius: 1.5,
  walkSpeed: 1.2,
  gender: "male",
  dialogues: {},
};

function allTrees(): Array<[string, string, DialogueTree]> {
  return Object.entries(DIALOGUES).flatMap(([npcId, trees]) =>
    Object.entries(trees).map<[string, string, DialogueTree]>(([treeId, tree]) => [
      npcId,
      treeId,
      tree,
    ]),
  );
}

describe("multi-turn dialogue trees", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    for (const npcId of Object.keys(NPC_MEMORY) as NpcId[]) {
      setMemory(npcId, {
        lastTopic: null,
        visitCount: 0,
        seenNodes: new Set<string>(),
        pickedOptions: {},
      });
    }
    document.body.innerHTML = "";
  });

  it("gives every NPC tree at least two authored nodes", () => {
    for (const [npcId, treeId, tree] of allTrees()) {
      const authoredNodes = Object.keys(tree.nodes).filter((id) => id !== "_end");
      expect(authoredNodes.length, `${npcId}.${treeId}`).toBeGreaterThanOrEqual(2);
    }
  });

  it("gives every greeting at least one response option", () => {
    for (const [npcId, treeId, tree] of allTrees()) {
      expect(tree.nodes.greeting?.options?.length, `${npcId}.${treeId}`).toBeGreaterThanOrEqual(1);
    }
  });

  it("keeps every option target inside its own tree", () => {
    for (const [npcId, treeId, tree] of allTrees()) {
      for (const node of Object.values(tree.nodes)) {
        for (const option of node.options ?? []) {
          expect(tree.nodes[option.nextNodeId], `${npcId}.${treeId}.${node.id}`).toBeDefined();
        }
      }
    }
  });

  it("terminates the first-option path of every tree within ten hops", () => {
    // C-10: conversations run 4-8+ turns with no hard cap, so a
    // first-option path may legitimately take more than five
    // hops (the CEO first-meeting runs six). The walk mirrors
    // the real UI (src/ui/dialogue.ts): pick the first option
    // when present, otherwise follow the node's auto-advance
    // `next`. The cap exists to catch non-terminating trees.
    for (const [npcId, treeId, tree] of allTrees()) {
      let nodeId = "greeting";
      let terminated = false;
      for (let hop = 0; hop < 10; hop += 1) {
        const node = tree.nodes[nodeId];
        expect(node, `${npcId}.${treeId}.${nodeId}`).toBeDefined();
        const option = node?.options?.[0];
        if (option !== undefined) {
          if (option.nextNodeId === "_end") {
            terminated = true;
            break;
          }
          nodeId = option.nextNodeId;
          continue;
        }
        // No options: auto-advance like the UI does.
        if (!node?.next || node.next === "_end") {
          terminated = true;
          break;
        }
        nodeId = node.next;
      }
      expect(terminated, `${npcId}.${treeId}`).toBe(true);
    }
  });

  it("does not count completion in content before the controller closes", () => {
    for (const [, , tree] of allTrees()) {
      for (const node of Object.values(tree.nodes)) {
        const effects = [
          ...(node.effects ?? []),
          ...(node.options ?? []).flatMap((option) => option.effects ?? []),
        ];
        expect(effects.some(
          (effect) => effect.type === "increment-total" && effect.target === "dialoguesFinished",
        ), `dialogue ${node.id} counts completion twice`).toBe(false);
      }
    }
  });

  it("records visits and the greeting when a conversation opens", () => {
    const root = document.createElement("div");
    const controller = createDialogue(root, vi.fn());
    controller.open(npc, DIALOGUES.bartek!.default!);

    expect(getMemory("bartek").visitCount).toBe(1);
    expect(getMemory("bartek").lastTopic).toBe("greeting");
    expect(getMemory("bartek").seenNodes.has("greeting")).toBe(true);
  });

  it("updates lastTopic and seen nodes after choosing an effectful option", () => {
    const root = document.createElement("div");
    const controller = createDialogue(root, vi.fn());
    controller.open(npc, DIALOGUES.bartek!.default!, "default");

    // The first option in bartek.default.greeting now has a stable id
    // (added by the dialogue-id fixer because two options shared
    // nextNodeId "tutorial"). We pick the first option by index.
    const firstOpt = root.querySelector<HTMLButtonElement>("[data-opt]")!;
    firstOpt.click();

    expect(getMemory("bartek").lastTopic).toBe("tutorial");
    expect(getMemory("bartek").seenNodes.has("tutorial")).toBe(true);
  });

  it("dispatches every effect attached to the selected option", () => {
    const root = document.createElement("div");
    const controller = createDialogue(root, vi.fn());
    controller.open(npc, DIALOGUES.bartek!.default!, "default");

    const firstOpt = root.querySelector<HTMLButtonElement>("[data-opt]")!;
    firstOpt.click();

    expect(game.dispatch).toHaveBeenCalledWith({
      type: "add-relationship",
      npcId: "bartek",
      delta: 5,
    });
  });

  it("keeps a terminal line visible until the player acknowledges it", () => {
    const root = document.createElement("div");
    const onClose = vi.fn();
    const controller = createDialogue(root, onClose);
    controller.open(npc, DIALOGUES.bartek!.afterContract!, "afterContract");

    const firstOpt = root.querySelector<HTMLButtonElement>("[data-opt]")!;
    firstOpt.click();
    expect(controller.isOpen()).toBe(true);
    expect(root.querySelector("[data-continue]")).not.toBeNull();

    root.querySelector<HTMLButtonElement>("[data-continue]")!.click();
    expect(controller.isOpen()).toBe(false);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("suppresses options the player has already picked (L-2026-08-30-02)", () => {
    const root = document.createElement("div");
    const controller = createDialogue(root, vi.fn());

    // First visit: open, pick the README option (id "tutorial-0").
    controller.open(npc, DIALOGUES.bartek!.default!, "default");
    const firstOpt = root.querySelector<HTMLButtonElement>("[data-opt]")!;
    const firstOptId = firstOpt.dataset.opt!;
    firstOpt.click();

    // Close the dialogue by clicking continue at the terminal.
    while (controller.isOpen()) {
      const btn = root.querySelector<HTMLButtonElement>("[data-continue]") ?? root.querySelector<HTMLButtonElement>("[data-opt]");
      if (!btn) break;
      btn.click();
    }

    // Second visit: the README option should NOT be shown again.
    controller.open(npc, DIALOGUES.bartek!.default!, "default");
    const optIds = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-opt]")).map(
      (b) => b.dataset.opt,
    );
    expect(optIds).not.toContain(firstOptId);
  });
});
