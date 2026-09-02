import { describe, expect, it } from "vitest";
import {
  INTER_NPC_LINES,
  OFFICE_CHATTER,
  SPEAKER_TOPICS,
  chatterWeightFor,
} from "../../src/content/office-chatter";
import { LUNCH_DIALOGUES_HUMAN } from "../../src/content/lunch-dialogues";
import { BUREK_LINES } from "../../src/content/dog-dialogues";

const ASCII = /^[\x20-\x7E]+$/;
const MAX_LENGTH = 60;

describe("OFFICE_CHATTER (C-46)", () => {
  it("has exchanges with 5-6 responses each (C-61 amendment)", () => {
    expect(OFFICE_CHATTER.length).toBeGreaterThanOrEqual(10);
    for (const exchange of OFFICE_CHATTER) {
      expect(exchange.responses.length).toBeGreaterThanOrEqual(5);
      expect(exchange.responses.length).toBeLessThanOrEqual(6);
    }
  });

  it("keeps every line at or under 60 characters (bubble canvas limit)", () => {
    for (const line of INTER_NPC_LINES) {
      expect(line.length).toBeLessThanOrEqual(MAX_LENGTH);
    }
  });

  it("is plain ASCII only", () => {
    for (const line of INTER_NPC_LINES) {
      expect(line).toMatch(ASCII);
    }
  });

  it("has no empty lines and no duplicates", () => {
    for (const line of INTER_NPC_LINES) {
      expect(line.trim().length).toBeGreaterThan(0);
    }
    expect(new Set(INTER_NPC_LINES).size).toBe(INTER_NPC_LINES.length);
  });

  it("reuses the whole legacy contest pool (no line was dropped)", () => {
    // The 30 pre-C-46 lines must all survive as starters or responses.
    const legacy = [
      "Did you restart it?", "The printer is jammed again.", "Standup in 5, be ready.",
      "At 5?! Am or Pm?", "I'll merge it after lunch.", "Chat Bot is down again.",
      "Who broke the build? Again!", "Coffee? I just had 4.", "Can you review my PR?",
      "What Freud would say about that bat?", "I guess it's some bat-complex",
      "Did the deploy go out?", "The wifi is being weird today.", "!!! $#%#$@$% !!!",
      "Is he still staring at me?", "Shh... They are watching...", "Have you seen my pierogi?",
      "Just KISS, ok?", "I have 47 tabs open and one fear.",
      "The intern pushed to main. We're so proud.", "I asked AI to fix it. Now there are two bugs.",
      "My rubber duck got upgraded to an LLM. It lies.", "I left a TODO in 2019. It's load-bearing now.",
      "The standup ran 40 minutes. Nobody stood.", "Kubernetes is just astrology for sysadmins.",
      "We don't need tests, our users test in prod for free.", "I recycle bugs. It's called QA.",
      "I'm not asleep, I'm doing deep mental architecture.",
    ];
    const pool = new Set(INTER_NPC_LINES);
    for (const line of legacy) expect(pool.has(line)).toBe(true);
  });

  it("never overlaps the lunch pool or the dog pool", () => {
    const lunch = new Set(LUNCH_DIALOGUES_HUMAN);
    const dog = new Set(BUREK_LINES);
    for (const line of INTER_NPC_LINES) {
      expect(lunch.has(line)).toBe(false);
      expect(dog.has(line)).toBe(false);
    }
  });

  it("weights quiet roles lower than talkative ones (C-46)", () => {
    // Lucas: outsiders (CTO, DevOps) quiet; marketing/sales talkative.
    expect(chatterWeightFor("maciek")).toBeLessThan(0.5); // CTO
    expect(chatterWeightFor("marek")).toBeLessThan(0.5); // DevOps
    expect(chatterWeightFor("dawid")).toBeLessThan(0.5); // CEO
    expect(chatterWeightFor("przemek")).toBeGreaterThan(1.5); // Sales
    expect(chatterWeightFor("ania")).toBeGreaterThan(1.5); // Marketing
    expect(chatterWeightFor("kasia")).toBeGreaterThan(1.2); // Recruiter
    // Unlisted NPCs default to 1.
    expect(chatterWeightFor("nobody")).toBe(1);
  });
});

describe("OFFICE_CHATTER topic affinities (C-46 amendment)", () => {
  it("only uses known topics or none (general)", () => {
    const known = new Set(["it", "finance", "janitor", "sales", "marketing"]);
    for (const exchange of OFFICE_CHATTER) {
      if (exchange.topic !== undefined) expect(known.has(exchange.topic)).toBe(true);
    }
  });

  it("gives finance jokes to the accountant and manager, janitor jokes to Janusz", () => {
    const finance = OFFICE_CHATTER.filter((e) => e.topic === "finance");
    expect(finance.length).toBeGreaterThanOrEqual(3);
    const janitor = OFFICE_CHATTER.filter((e) => e.topic === "janitor");
    expect(janitor.length).toBeGreaterThanOrEqual(2);
    expect(SPEAKER_TOPICS.grazyna).toContain("finance");
    expect(SPEAKER_TOPICS.zosia).toContain("finance");
    expect(SPEAKER_TOPICS.janusz).toContain("janitor");
  });

  it("keeps the dog on general exchanges only", () => {
    expect(SPEAKER_TOPICS.burek).toBeUndefined();
    // Techies + CEO tell IT jokes; zosia gets finance (+it).
    expect(SPEAKER_TOPICS.bartek).toContain("it");
    expect(SPEAKER_TOPICS.tomek).toContain("it");
    expect(SPEAKER_TOPICS.marek).toContain("it");
    expect(SPEAKER_TOPICS.maciek).toContain("it");
    expect(SPEAKER_TOPICS.pawel).toContain("it");
    expect(SPEAKER_TOPICS.dawid).toContain("it");
    expect(SPEAKER_TOPICS.zosia).toContain("it");
  });

  it("gives sales and marketing their own C-47 exchange pools", () => {
    // Lucas: "at least 2 objects with dialogues (starter + 3 responses)
    // specific to marketing and sales".
    expect(SPEAKER_TOPICS.przemek).toContain("sales");
    expect(SPEAKER_TOPICS.kasia).toContain("sales");
    expect(SPEAKER_TOPICS.ania).toContain("marketing");
    expect(SPEAKER_TOPICS.klaudia).toContain("marketing");
    // The manager and the CEO are fluent in the revenue corner.
    expect(SPEAKER_TOPICS.zosia).toContain("sales");
    expect(SPEAKER_TOPICS.zosia).toContain("marketing");
    expect(SPEAKER_TOPICS.dawid).toContain("sales");
    expect(SPEAKER_TOPICS.dawid).toContain("marketing");
    for (const topic of ["sales", "marketing"] as const) {
      const exchanges = OFFICE_CHATTER.filter((e) => e.topic === topic);
      expect(exchanges.length).toBeGreaterThanOrEqual(4);
      for (const exchange of exchanges) {
        expect(exchange.responses.length).toBeGreaterThanOrEqual(3);
      }
    }
  });

  it("leaves every speaker a healthy general pool (>= 10 starters)", () => {
    const generalStarters = OFFICE_CHATTER.filter((e) => e.topic === undefined);
    expect(generalStarters.length).toBeGreaterThanOrEqual(10);
  });
});
