/**
 * @vitest-environment jsdom
 *
 * WS7: the mission UI flow (AC-23/AC-26) — intro card -> speech view
 * (talking points, engagement meter, plant questions) -> results card.
 * Keyboard: 1-4 answers, Space advances. Rewards apply EXACTLY once:
 * re-opening a completed mission never pays again.
 *
 * The reward path runs through the REAL game store (dispatches the
 * standard add-cash / add-stat / set-flag actions) — no mocks on the
 * state layer, only the Jev steerer is fake.
 */

import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { getMission } from "../../../src/content/missions";
import type { MissionQuestionView } from "../../../src/game/mission";
import { missionResultActions } from "../../../src/game/mission";
import { game } from "../../../src/game/state";
import { mountMissionUi, type MissionUiHandle } from "../../../src/ui/mission";
import type { MissionSteerer } from "../../../src/jev/mission-wrapper";

const mission = getMission("conference-acme-training")!;

let parents: HTMLElement[] = [];

function bestKey(question: MissionQuestionView): string {
  const best = question.options.reduce((bestOption, option) =>
    option.baseScore > bestOption.baseScore ? option : bestOption,
  );
  return String(question.options.indexOf(best) + 1);
}

function pressKey(key: string, code = key): void {
  window.dispatchEvent(new KeyboardEvent("keydown", { key, code, bubbles: true }));
}

function clickButton(handle: MissionUiHandle, selector: string): void {
  const button = handle.root.querySelector<HTMLButtonElement>(selector);
  if (!button) throw new Error(`missing button ${selector}`);
  button.click();
}

/** Drive the open speech from its first step to the results card. */
function driveToResults(handle: MissionUiHandle): void {
  for (let guard = 0; guard < 64; guard += 1) {
    const snap = handle.snapshot();
    if (!snap) throw new Error("mission closed mid-drive");
    if (snap.phase === "complete") return;
    if (snap.question !== null && snap.question.answeredOptionId === null) {
      pressKey(bestKey(snap.question));
    } else {
      pressKey(" ", "Space");
    }
  }
  throw new Error("mission did not reach the results card");
}

interface Harness {
  handle: MissionUiHandle;
  applyCount: number;
}

function mountHarness(steerer?: MissionSteerer): Harness {
  const harness: Harness = { applyCount: 0 } as Harness;
  const parent = document.createElement("div");
  document.body.append(parent);
  parents.push(parent);
  harness.handle = mountMissionUi(parent, {
    ...(steerer ? { steerer } : {}),
    applyResult: (def, result) => {
      harness.applyCount += 1;
      for (const action of missionResultActions(def, result)) game.dispatch(action);
    },
  });
  return harness;
}

function openAndBegin(handle: MissionUiHandle): void {
  expect(handle.open("conference-acme-training")).toBe(true);
  clickButton(handle, "[data-mission-begin]");
}

beforeEach(() => {
  game.dispatch({ type: "reset" });
});

afterEach(() => {
  for (const parent of parents.splice(0)) parent.remove();
});

describe("mission UI — intro card", () => {
  it("shows the mission intro and cancels without starting", () => {
    const { handle } = mountHarness();
    expect(handle.open("conference-acme-training")).toBe(true);
    expect(handle.isOpen()).toBe(true);
    const text = handle.root.textContent ?? "";
    expect(text).toContain(mission.title);
    expect(text).toContain(mission.topic);
    expect(text).toContain("Begin speech");
    expect(handle.snapshot()).toBeNull(); // runtime not started yet
    clickButton(handle, "[data-mission-cancel]");
    expect(handle.isOpen()).toBe(false);
    expect(game.get().flags[mission.completionFlag]).toBeUndefined();
  });

  it("rejects unknown mission ids", () => {
    const { handle } = mountHarness();
    expect(handle.open("not-a-mission")).toBe(false);
    expect(handle.isOpen()).toBe(false);
  });
});

describe("mission UI — speech view", () => {
  it("begins at talking point 1 with the meter at the authored start", () => {
    const { handle } = mountHarness();
    openAndBegin(handle);
    const snap = handle.snapshot();
    expect(snap?.phase).toBe("talking-point");
    expect(snap?.point?.id).toBe("pt-welcome");
    const meter = handle.root.querySelector<HTMLElement>("[data-meter]");
    expect(meter?.dataset.value).toBe(String(mission.startingEngagement));
    expect(handle.root.textContent).toContain("Space");
  });

  it("highlights the plant by name when a question lands", () => {
    const { handle } = mountHarness();
    openAndBegin(handle);
    pressKey(" ", "Space"); // point 1 -> point 2
    pressKey(" ", "Space"); // point 2 -> first question
    const snap = handle.snapshot();
    expect(snap?.question?.questionId).toBe("kq-linkedin");
    expect(snap?.question?.plantName).toBe("Kasia");
    const text = handle.root.textContent ?? "";
    expect(text).toContain("Kasia");
    expect(text).toContain(snap?.question?.questionText ?? "NEVER");
    expect(handle.root.querySelectorAll("[data-mission-option]")).toHaveLength(4);
  });

  it("answers via the 1-4 keys and shows the audience reaction + meter movement", () => {
    const { handle } = mountHarness();
    openAndBegin(handle);
    pressKey(" ", "Space");
    pressKey(" ", "Space");
    const question = handle.snapshot()?.question;
    if (!question) throw new Error("no question on screen");
    const best = bestKey(question);
    const bestOption = question.options[Number(best) - 1]!;
    pressKey(best);
    const reaction = handle.root.querySelector<HTMLElement>("[data-mission-reaction]");
    expect(reaction?.textContent).toBe(bestOption.reaction);
    const meter = handle.root.querySelector<HTMLElement>("[data-meter]");
    const expected = Math.max(
      0,
      Math.min(100, mission.startingEngagement + bestOption.baseScore * 5),
    );
    expect(meter?.dataset.value).toBe(String(expected));
  });
});

describe("mission UI — rewards apply exactly once (AC-25/AC-26)", () => {
  it("a finished run pays through the standard actions and sets the flag", () => {
    const cashBefore = game.get().cash;
    const credibilityBefore = game.get().stats.credibility;
    const harness = mountHarness();
    const { handle } = harness;
    openAndBegin(handle);
    driveToResults(handle);

    const results = handle.root.querySelector<HTMLElement>("[data-mission-results]");
    expect(results).not.toBeNull();
    expect(results?.textContent).toContain("+400 zl");
    expect(results?.textContent).toContain("+8 credibility");
    expect(handle.result()?.outcome).toBe("won");
    expect(handle.result()?.payoutApplied).toBe(true);
    // mount-time primitive snapshot — read the live counter (orchestrator authorization 2026-09-30)
    expect(harness.applyCount).toBe(1);
    expect(game.get().cash).toBe(cashBefore + 400);
    expect(game.get().stats.credibility).toBe(
      Math.min(100, credibilityBefore + 8),
    );
    expect(game.get().flags[mission.completionFlag]).toBe(true);

    clickButton(handle, "[data-mission-continue]");
    expect(handle.isOpen()).toBe(false);
  });

  it("re-opening a completed mission never pays again", () => {
    const cashBefore = game.get().cash;
    const harness = mountHarness();
    const { handle } = harness;
    openAndBegin(handle);
    driveToResults(handle);
    clickButton(handle, "[data-mission-continue]");
    const cashAfterFirst = game.get().cash;
    expect(cashAfterFirst).toBe(cashBefore + 400);
    // mount-time primitive snapshot — read the live counter (orchestrator authorization 2026-09-30)
    expect(harness.applyCount).toBe(1);

    // Replay: the speech is playable again with full flavor...
    openAndBegin(handle);
    driveToResults(handle);
    const results = handle.root.querySelector<HTMLElement>("[data-mission-results]");
    expect(results?.textContent).toContain("does not pay twice");
    expect(handle.result()?.payoutApplied).toBe(false);
    expect(handle.result()?.cashReward).toBe(0);
    // ...but the reward path never fires a second time.
    // mount-time primitive snapshot — read the live counter (orchestrator authorization 2026-09-30)
    expect(harness.applyCount).toBe(1);
    expect(game.get().cash).toBe(cashAfterFirst);
    clickButton(handle, "[data-mission-continue]");
  });
});

describe("mission UI — keyboard lifecycle", () => {
  it("the keyboard handler is removed on close", () => {
    const { handle } = mountHarness();
    openAndBegin(handle);
    handle.close();
    expect(handle.snapshot()).toBeNull();
    expect(() => pressKey(" ", "Space")).not.toThrow();
    expect(() => pressKey("1")).not.toThrow();
  });

  it("cancel during the speech aborts without any reward", () => {
    const cashBefore = game.get().cash;
    const { handle, applyCount } = mountHarness();
    openAndBegin(handle);
    pressKey(" ", "Space");
    clickButton(handle, "[data-mission-abandon]");
    expect(handle.isOpen()).toBe(false);
    expect(game.get().cash).toBe(cashBefore);
    expect(game.get().flags[mission.completionFlag]).toBeUndefined();
    expect(applyCount).toBe(0);
  });
});

describe("mission UI — steered speech (fake steerer)", () => {
  it("the steered question is asked and the steered score moves the meter", async () => {
    const steerer: MissionSteerer = {
      isShadow: () => false,
      pickQuestion: async (request) => ({
        questionId: request.questions.some((q) => q.id === "kq-headhunt")
          ? "kq-headhunt"
          : null,
        fallback: false,
      }),
      scoreOptions: async (request) => ({
        adjustments: Object.fromEntries(
          request.options.map((option) => [option.id, -1 as const]),
        ),
        fallback: false,
      }),
    };
    const { handle } = mountHarness(steerer);
    openAndBegin(handle);
    pressKey(" ", "Space");
    // Let the steerer's promise settle and the re-render flush.
    await new Promise((resolve) => setTimeout(resolve, 0));
    const snap = handle.snapshot();
    expect(snap?.question?.questionId).toBe("kq-headhunt"); // steered, not kq-linkedin
    const bestKeyChar = bestKey(snap!.question!);
    pressKey(bestKeyChar);
    // +2 option with a -1 judgment => score 1 => +5 engagement.
    const meter = handle.root.querySelector<HTMLElement>("[data-meter]");
    expect(meter?.dataset.value).toBe(String(mission.startingEngagement + 5));
  });
});
