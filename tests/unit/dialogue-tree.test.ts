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

  it("terminates the first-option path of every tree within five hops", () => {
    for (const [npcId, treeId, tree] of allTrees()) {
      let nodeId = "greeting";
      let terminated = false;
      for (let hop = 0; hop < 5; hop += 1) {
        const node = tree.nodes[nodeId];
        expect(node, `${npcId}.${treeId}.${nodeId}`).toBeDefined();
        const option = node?.options?.[0];
        if (!option) {
          terminated = !node?.next || node.next === "_end";
          break;
        }
        if (option.nextNodeId === "_end") {
          terminated = true;
          break;
        }
        nodeId = option.nextNodeId;
      }
      expect(terminated, `${npcId}.${treeId}`).toBe(true);
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
    controller.open(npc, DIALOGUES.bartek!.default!);

    root.querySelector<HTMLButtonElement>('[data-opt="0"]')!.click();

    expect(getMemory("bartek").lastTopic).toBe("tutorial");
    expect(getMemory("bartek").seenNodes.has("tutorial")).toBe(true);
  });

  it("dispatches every effect attached to the selected option", () => {
    const root = document.createElement("div");
    const controller = createDialogue(root, vi.fn());
    controller.open(npc, DIALOGUES.bartek!.default!);

    root.querySelector<HTMLButtonElement>('[data-opt="0"]')!.click();

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
    controller.open(npc, DIALOGUES.bartek!.afterContract!);

    root.querySelector<HTMLButtonElement>('[data-opt="0"]')!.click();
    expect(controller.isOpen()).toBe(true);
    expect(root.querySelector("[data-continue]")).not.toBeNull();

    root.querySelector<HTMLButtonElement>("[data-continue]")!.click();
    expect(controller.isOpen()).toBe(false);
    expect(onClose).toHaveBeenCalledOnce();
  });
});
