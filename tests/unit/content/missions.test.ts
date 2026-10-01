/**
 * WS7 (AC-23..26, D-54): the conference-speech mission data.
 *
 * The mission is authored data, so per PR-11 the data shape is tested
 * against corruption: exactly one bounded slice (1 topic, 5 talking
 * points, 2 plants x 2 questions x 4 options), real tradeoffs in every
 * question's baseScores, flags that exist in the game's flag
 * vocabulary, and tone bounds on every authored string.
 */

import { describe, expect, it } from "vitest";
import { MISSIONS, getMission } from "../../../src/content/missions";
import { NPCS } from "../../../src/content/npcs";
import { QUESTS } from "../../../src/content/quests";

const questFlags = QUESTS.map((q) => q.completionFlag).filter(
  (flag): flag is string => flag !== undefined,
);

describe("conference mission — bounded slice shape (D-54)", () => {
  it("ships exactly one mission, the ACME conference speech", () => {
    expect(MISSIONS).toHaveLength(1);
    const mission = MISSIONS[0];
    expect(mission?.id).toBe("conference-acme-training");
    expect(mission?.topic).toBe("ACME onboarding training");
    expect(mission?.title.length).toBeGreaterThan(0);
  });

  it("unlocks on a flag the quest layer really sets", () => {
    const mission = MISSIONS[0];
    expect(mission?.unlockFlag).toBe("got-acme-contract");
    // got-acme-contract is the completion flag of the Bartek contract
    // quest — the mission must not unlock before the contract exists.
    expect(questFlags).toContain("got-acme-contract");
  });

  it("completes into a fresh, namespaced flag (no collision with quest flags)", () => {
    const mission = MISSIONS[0];
    expect(mission?.completionFlag).toBe("mission-conference-acme-done");
    expect(questFlags).not.toContain(mission?.completionFlag);
  });

  it("authored exactly 5 talking points and 2 plants x 2 questions", () => {
    const mission = MISSIONS[0];
    expect(mission?.talkingPoints).toHaveLength(5);
    expect(mission?.plants).toHaveLength(2);
    for (const plant of mission?.plants ?? []) {
      expect(plant.questions).toHaveLength(2);
    }
  });

  it("plants are existing office NPCs (not the dog)", () => {
    for (const plant of MISSIONS[0]?.plants ?? []) {
      const npc = NPCS.find((candidate) => candidate.id === plant.npcId);
      expect(npc, `plant ${plant.npcId} must exist in the office cast`).toBeDefined();
      expect(npc?.gender).not.toBe("dog");
    }
  });

  it("the script interleaves every point and every question exactly once", () => {
    const mission = MISSIONS[0];
    const script = mission?.script ?? [];
    expect(script).toHaveLength(9); // 5 points + 4 questions
    const pointIds = script
      .filter((step) => step.kind === "point")
      .map((step) => (step.kind === "point" ? step.pointId : ""));
    const pointTextIds = (mission?.talkingPoints ?? []).map((point) => point.id);
    expect([...pointIds].sort()).toEqual([...pointTextIds].sort());

    const questionSteps = script.filter((step) => step.kind === "question");
    expect(questionSteps).toHaveLength(4);
    const seen = new Set<string>();
    for (const step of questionSteps) {
      if (step.kind !== "question") continue;
      const plant = mission?.plants[step.plantIndex];
      const question = plant?.questions[step.questionIndex];
      expect(plant, `plant index ${step.plantIndex} must exist`).toBeDefined();
      expect(question, `question index ${step.questionIndex} must exist`).toBeDefined();
      seen.add(`${step.plantIndex}:${step.questionIndex}`);
    }
    expect(seen.size).toBe(4); // (0,0) (0,1) (1,0) (1,1) — each exactly once
  });

  it("getMission resolves the mission and rejects garbage", () => {
    expect(getMission("conference-acme-training")?.id).toBe("conference-acme-training");
    expect(getMission("nope")).toBeUndefined();
  });
});

describe("conference mission — every question has real tradeoffs", () => {
  const mission = MISSIONS[0];

  for (const plant of mission?.plants ?? []) {
    for (const question of plant.questions) {
      describe(`${plant.npcId}/${question.id}`, () => {
        it("has exactly 4 options with unique ids", () => {
          expect(question.options).toHaveLength(4);
          const ids = question.options.map((option) => option.id);
          expect(new Set(ids).size).toBe(4);
        });

        it("scores are authored integers in [-2, 2] — not one obviously-right answer", () => {
          const scores = question.options.map((option) => option.baseScore);
          for (const score of scores) {
            expect(Number.isInteger(score)).toBe(true);
            expect(score).toBeGreaterThanOrEqual(-2);
            expect(score).toBeLessThanOrEqual(2);
          }
          // At least 3 distinct values, a genuinely bad option and a
          // genuinely good one: the player must weigh the answer, not
          // spot the highlighted one.
          expect(new Set(scores).size).toBeGreaterThanOrEqual(3);
          expect(Math.min(...scores)).toBeLessThanOrEqual(-1);
          expect(Math.max(...scores)).toBeGreaterThanOrEqual(1);
        });

        it("every answer carries a non-empty audience reaction", () => {
          for (const option of question.options) {
            expect(option.reaction.length).toBeGreaterThan(0);
          }
        });

        it("is actually a question", () => {
          expect(question.text).toContain("?");
        });
      });
    }
  }
});

describe("conference mission — engagement and reward math", () => {
  const mission = MISSIONS[0];

  it("starts below the win threshold so answering well is required", () => {
    expect(mission?.startingEngagement).toBeGreaterThanOrEqual(0);
    expect(mission?.startingEngagement).toBeLessThanOrEqual(100);
    expect(mission?.winEngagement).toBeGreaterThan(mission?.startingEngagement ?? 0);
    expect(mission?.winEngagement).toBeLessThanOrEqual(100);
  });

  it("pays real money on a win and costs credibility on a loss", () => {
    expect(mission?.rewardOnWin.cash).toBeGreaterThan(0);
    expect(mission?.rewardOnWin.credibility).toBeGreaterThan(0);
    expect(mission?.rewardOnLoss.cash).toBe(0);
    expect(mission?.rewardOnLoss.credibility).toBeLessThan(0);
  });

  it("authored closing quotes for both outcomes", () => {
    expect(mission?.closingQuotes.won.length).toBeGreaterThan(0);
    expect(mission?.closingQuotes.lost.length).toBeGreaterThan(0);
  });
});

describe("conference mission — tone bounds on every authored string", () => {
  const mission = MISSIONS[0];

  it("no empty, placeholder or oversized strings anywhere", () => {
    const strings: [string, string][] = [
      ["title", mission?.title ?? ""],
      ["topic", mission?.topic ?? ""],
      ["intro", mission?.intro ?? ""],
      ["description", mission?.description ?? ""],
    ];
    for (const point of mission?.talkingPoints ?? []) {
      strings.push([`point ${point.id}`, point.text]);
    }
    for (const plant of mission?.plants ?? []) {
      for (const question of plant.questions) {
        strings.push([`question ${question.id}`, question.text]);
        strings.push([`question ${question.id} description`, question.description]);
        for (const option of question.options) {
          strings.push([`option ${option.id}`, option.text]);
          strings.push([`option ${option.id} reaction`, option.reaction]);
        }
      }
    }
    for (const [name, value] of strings) {
      expect(value.trim().length, `${name} must be non-empty`).toBeGreaterThan(0);
      expect(value.length, `${name} must stay inside tone bounds`).toBeLessThanOrEqual(320);
      expect(value.toLowerCase(), `${name} must be finished copy`).not.toContain("todo");
      expect(value.toLowerCase(), `${name} must be finished copy`).not.toContain("lorem");
    }
  });

  it("mentions the ACME lore it is grounded in", () => {
    const all = JSON.stringify(MISSIONS).toLowerCase();
    expect(all).toContain("acme");
    expect(all).toContain("excel");
  });
});
