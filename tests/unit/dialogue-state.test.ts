import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  closeDialogueForScreenTransition,
  createDialogue,
} from "../../src/ui/dialogue";
import type { DialogueTree, NPC } from "../../src/types";

vi.mock("../../src/game/state", () => ({
  game: { dispatch: vi.fn() },
}));

class FakeElement {
  className = "";
  innerHTML = "";
  readonly children: FakeElement[] = [];
  removed = false;

  appendChild(child: FakeElement): FakeElement {
    this.children.push(child);
    return child;
  }

  remove(): void {
    this.removed = true;
  }

  querySelectorAll(): FakeElement[] {
    return [];
  }

  querySelector(): FakeElement {
    return new FakeElement();
  }

  addEventListener(): void {}
}

const npc: NPC = {
  id: "bartek",
  name: "Bartek",
  role: "Team Lead",
  emoji: "B",
  position: { x: 0, y: 0, z: 0 },
  triggerRadius: 1.5,
  gender: "male",
  dialogues: {},
};

const tree: DialogueTree = {
  nodes: {
    greeting: {
      id: "greeting",
      text: "Welcome aboard.",
      options: [{ text: "Thanks.", nextNodeId: "_end" }],
    },
  },
};

describe("dialogue state reset (C-17)", () => {
  let root: FakeElement;
  let controller: ReturnType<typeof createDialogue>;
  let screen: "office" | "summary" | "minigame";

  function setScreen(next: typeof screen): void {
    closeDialogueForScreenTransition(controller);
    screen = next;
  }

  beforeEach(() => {
    screen = "office";
    root = new FakeElement();
    vi.stubGlobal("document", {
      createElement: () => new FakeElement(),
    });
    controller = createDialogue(root as unknown as HTMLElement, vi.fn());
  });

  it("can open again after close", () => {
    controller.open(npc, tree);
    expect(controller.isOpen()).toBe(true);

    controller.close();
    expect(controller.isOpen()).toBe(false);

    controller.open(npc, tree);
    expect(controller.isOpen()).toBe(true);
  });

  it("can open again after transitioning to the summary screen", () => {
    controller.open(npc, tree);

    setScreen("summary");
    expect(screen).toBe("summary");
    expect(controller.isOpen()).toBe(false);

    controller.open(npc, tree);
    expect(controller.isOpen()).toBe(true);
  });

  it("can open again after minigame and office screen transitions", () => {
    controller.open(npc, tree);

    setScreen("minigame");
    setScreen("office");
    expect(screen).toBe("office");
    expect(controller.isOpen()).toBe(false);

    controller.open(npc, tree);
    expect(controller.isOpen()).toBe(true);
  });
});
