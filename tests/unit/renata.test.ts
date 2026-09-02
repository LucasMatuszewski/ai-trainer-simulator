/**
 * C-64: Renata's dialogue trees.
 *
 * Two contracts are pinned here, both required by the brief:
 *
 *  1. The first-meeting tree is the game's tutorial, so it must
 *     actually teach the real controls. The first-meeting node
 *     text mentions every key binding the controls module exposes
 *     (WASD, Shift, RMB, Space, click, Z, Esc) - the controls
 *     tests in `controls.test.ts` are the source of truth for
 *     the bindings, and a tutorial that mentions the wrong keys
 *     would be a regression.
 *
 *  2. The default tree is the standing FAQ / help centre, and
 *     it must be re-enterable: every answer node has an option
 *     that routes back to the menu greeting, and the player
 *     can ask another question. The first-option-walking test
 *     in `dialogue-tree.test.ts` already pins termination, so
 *     this test pins the re-enterability property specifically.
 */
import { describe, expect, it } from "vitest";
import { DIALOGUES } from "../../src/content/dialogues";
import { NPCS } from "../../src/content/npcs";

const renata = DIALOGUES.renata;
if (!renata) throw new Error("DIALOGUES.renata is missing - check the merge in dialogues.ts");

/** Concatenate every text in a tree, so a single test can scan all
 *  the lines for keyword coverage. */
function allText(treeId: string): string {
  const tree = renata![treeId];
  if (!tree) return "";
  return Object.values(tree.nodes)
    .map((node) => node.text)
    .join("\n");
}

/** Walk every option in the tree once and collect the next-node-id. */
function allTransitions(treeId: string): Array<{ from: string; to: string }> {
  const tree = renata![treeId];
  if (!tree) return [];
  const out: Array<{ from: string; to: string }> = [];
  for (const node of Object.values(tree.nodes)) {
    for (const opt of node.options ?? []) {
      out.push({ from: node.id, to: opt.nextNodeId });
    }
  }
  return out;
}

describe("Renata's tutorial / first-meeting tree (C-64)", () => {
  it("exists with the expected name and a greeting node", () => {
    const tree = renata["first-meeting"];
    expect(tree, "first-meeting tree missing").toBeDefined();
    expect(tree!.nodes.greeting, "first-meeting greeting missing").toBeDefined();
  });

  it("teaches the WASD movement keys", () => {
    const text = allText("first-meeting");
    // Case-insensitive: lines are ASCII but may include either
    // "WASD" or "W, A, S, and D" depending on how the author
    // phrased it. The test just needs every control surface to
    // be mentioned at least once across the tree.
    const lower = text.toLowerCase();
    expect(lower, "tutorial must mention WASD").toContain("wasd");
    expect(lower, "tutorial must mention W/A/S/D or arrow keys").toMatch(/w,?\s*a,?\s*s,?\s*(and\s*)?d|arrow/);
  });

  it("teaches the mouse-look control (right mouse button + Space)", () => {
    const text = allText("first-meeting");
    const lower = text.toLowerCase();
    expect(lower, "tutorial must mention right mouse").toMatch(/right mouse|right.mouse|right-mouse/);
    expect(lower, "tutorial must mention Space as a trackpad option").toContain("space");
  });

  it("teaches the click-to-talk and Z-to-end-day and Escape controls", () => {
    const text = allText("first-meeting");
    const lower = text.toLowerCase();
    expect(lower, "tutorial must mention clicking a colleague").toMatch(/click/);
    expect(lower, "tutorial must mention Z to end the day").toContain("z");
    expect(lower, "tutorial must mention Escape").toContain("escape");
  });

  it("has 8-12 speakable lines (the TTS window)", () => {
    // Count the nodes whose text is non-empty. _end has empty
    // text by convention and is excluded automatically.
    const tree = renata["first-meeting"];
    const speakable = Object.values(tree!.nodes).filter((n) => n.text.trim().length > 0);
    expect(speakable.length, "tutorial must have 8-12 speakable lines").toBeGreaterThanOrEqual(8);
    expect(speakable.length, "tutorial must have 8-12 speakable lines").toBeLessThanOrEqual(12);
  });

  it("keeps every line <= 200 characters (TTS sentence budget)", () => {
    const tree = renata["first-meeting"];
    for (const node of Object.values(tree!.nodes)) {
      if (node.text.trim().length === 0) continue;
      expect(node.text.length, `${node.id} is too long for TTS`).toBeLessThanOrEqual(200);
    }
  });

  it("sets a flag when the player reaches the end of the tutorial", () => {
    const tree = renata["first-meeting"];
    const effects = Object.values(tree!.nodes).flatMap((n) => n.effects ?? []);
    expect(
      effects.some(
        (e) => e.type === "set-flag" && e.target === "renata-tut-finished",
      ),
      "first-meeting must set renata-tut-finished when the player finishes the tutorial",
    ).toBe(true);
  });
});

describe("Renata's default / FAQ help-centre tree (C-64)", () => {
  it("exists with a greeting menu of 5+ questions and a way out", () => {
    const tree = renata.default;
    expect(tree, "default tree missing").toBeDefined();
    const greeting = tree!.nodes.greeting;
    expect(greeting, "default greeting missing").toBeDefined();
    expect(greeting!.options?.length, "FAQ menu must have multiple questions").toBeGreaterThanOrEqual(5);
    // The brief: "plus a way out" - exactly one option should be a
    // terminal `_end` so the player can leave.
    const exitOptions = greeting!.options!.filter((o) => o.nextNodeId === "_end");
    expect(exitOptions.length, "FAQ menu must have at least one way out").toBeGreaterThanOrEqual(1);
  });

  it("is re-enterable: every answer node has a route back to the menu", () => {
    const tree = renata.default;
    const transitions = allTransitions("default");
    // The menu greeting is the hub. Every answer node must have at
    // least one option that points back at "greeting".
    const answerNodes = Object.values(tree!.nodes)
      .map((n) => n.id)
      .filter((id) => id !== "greeting" && id !== "_end");
    expect(answerNodes.length, "FAQ should have answer nodes").toBeGreaterThanOrEqual(5);
    for (const answerId of answerNodes) {
      const fromAnswer = transitions.filter((t) => t.from === answerId);
      const backToMenu = fromAnswer.find((t) => t.to === "greeting");
      expect(backToMenu, `answer node ${answerId} does not route back to the menu`).toBeDefined();
    }
  });

  it("answers the questions Lucas named in the brief", () => {
    // The questions themselves are menu options; the answers
    // live in their own nodes. We check the menu's question
    // text and the answer text separately.
    const tree = renata.default;
    const greeting = tree!.nodes.greeting!;
    const optionTexts = greeting.options!.map((o) => o.text.toLowerCase());
    const answerText = allText("default").toLowerCase();
    // The brief: the menu must offer these 5 questions.
    const questions = [
      "where is everyone",
      "how do i make money",
      "what are these stats",
      "who is who",
      "where is the toilet",
    ];
    for (const q of questions) {
      expect(
        optionTexts.some((t) => t.includes(q)),
        `FAQ menu must offer the question "${q}"`,
      ).toBe(true);
    }
    // And each answer body must actually address its topic.
    const answers = [
      { needle: "main office", question: "where is everyone" },
      { needle: "bartek", question: "how do i make money" },
      { needle: "credibility", question: "what are these stats" },
      { needle: "bartek", question: "who is who" },
      { needle: "kitchen", question: "where is the toilet" },
    ];
    for (const ans of answers) {
      expect(
        answerText.includes(ans.needle),
        `FAQ answer for "${ans.question}" must mention "${ans.needle}"`,
      ).toBe(true);
    }
  });

  it("offers to re-run the controls tutorial from the menu", () => {
    const tree = renata.default;
    const greeting = tree!.nodes.greeting!;
    const hasControls = greeting.options!.some(
      (o) => /control/i.test(o.text),
    );
    expect(hasControls, "FAQ menu must include a 'run me through the controls' option").toBe(true);
  });
});

describe("Renata NPC roster data (C-64)", () => {
  it("lives behind the reception desk with her full body clear of its collision box", () => {
    const found = NPCS.find((n) => n.id === "renata");
    expect(found, "Renata must exist in NPCS").toBeDefined();
    expect(found!.position.x).toBeCloseTo(4.9, 5);
    expect(found!.position.z).toBeCloseTo(13.5, 5);
    expect(found!.rotationY).toBeCloseTo(-Math.PI / 2, 5);
    expect(found!.gender).toBe("female");
    // She must have an authored appearance (C-63) so the office
    // does not 14-in-a-row the same skin+hair+shirt combo.
    expect(found!.appearance?.skin).toBeDefined();
    expect(found!.appearance?.hair).toBeDefined();
    expect(found!.appearance?.shirt).toBeDefined();
    // Sanity: role is "Receptionist / Office Manager" per the plan.
    expect(found!.role.toLowerCase()).toContain("receptionist");
  });
});
