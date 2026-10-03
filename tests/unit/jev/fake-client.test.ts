import { describe, expect, it } from "vitest";
import {
  FakeDecisionClient,
  type FakeAnswerSpec,
} from "../../../src/jev/fake-client";
import { unconfiguredDecisionClient } from "../../../src/jev/unconfigured-client";
import type { DecisionRequestResult, JevQuestion } from "../../../src/jev/contracts";

/**
 * WS1 fake client (ADR-0009 section 3.1): a deterministic, network-free
 * DecisionClient for wrapper/integration tests. It scripts answers by
 * question id or surface, records every request, and can simulate the
 * provider failure modes (timeout / malformed / network / auth /
 * unknown-id) so fallback paths can be proven without a provider.
 */

const STATE = { "npcs.bartek": { id: "bartek" } };

function question(overrides: Partial<JevQuestion> = {}): JevQuestion {
  return {
    id: "greeting:bartek",
    type: "choice",
    prompt: "Pick a greeting.",
    subjectId: "bartek",
    candidates: [
      { id: "bartek:greeting:0", description: "Morning. Standup in 5." },
      { id: "bartek:greeting:1", description: "Hi. Build is red." },
      { id: "bartek:greeting:2", description: "Hello. Prod is on fire." },
    ],
    ...overrides,
  };
}

async function request(
  client: FakeDecisionClient,
  questions: JevQuestion[],
  opts: Record<string, unknown> = {},
): Promise<DecisionRequestResult> {
  return client.request(STATE, questions, {
    decisionId: "d1",
    surface: "greeting",
    ...opts,
  }) as Promise<DecisionRequestResult>;
}

describe("unconfigured client", () => {
  it("is never configured and answers with a typed unconfigured failure", async () => {
    expect(unconfiguredDecisionClient.isConfigured()).toBe(false);
    const result = await unconfiguredDecisionClient.request(STATE, [question()]);
    expect(result).toEqual({ ok: false, reason: "unconfigured" });
  });
});

describe("fake client — scripting", () => {
  it("is configured by default and records every request", async () => {
    const client = new FakeDecisionClient();
    expect(client.isConfigured()).toBe(true);
    await request(client, [question()]);
    await request(client, [question({ id: "greeting:marek" })]);
    expect(client.callCount).toBe(2);
    expect(client.requests).toHaveLength(2);
    expect(client.requests[0]?.questions[0]?.id).toBe("greeting:bartek");
    expect(client.requests[0]?.state).toEqual(STATE);
  });

  it("answers a scripted question id with a fully keyed canned answer", async () => {
    const client = new FakeDecisionClient({
      "greeting:bartek": { type: "choice", id: "bartek:greeting:2", confidence: 0.75 },
    });
    const result = await request(client, [question()]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.answers[0]).toMatchObject({
      decisionId: "d1",
      surface: "greeting",
      subjectId: "bartek",
      questionId: "greeting:bartek",
      type: "choice",
      id: "bartek:greeting:2",
      confidence: 0.75,
    });
  });

  it("falls back to a surface-keyed script entry when no question id matches", async () => {
    const client = new FakeDecisionClient({
      "surface:greeting": { type: "choice", id: "bartek:greeting:1", confidence: 0.6 },
    });
    const result = await request(client, [question({ id: "greeting:marek", subjectId: "marek" })]);
    if (!result.ok) throw new Error("expected ok");
    expect(result.answers[0]).toMatchObject({ questionId: "greeting:marek", id: "bartek:greeting:1" });
  });

  it("consumes a scripted sequence in order, then uses the deterministic default", async () => {
    const script: FakeAnswerSpec[] = [
      { type: "choice", id: "bartek:greeting:0", confidence: 0.9 },
      { failure: "timeout" },
    ];
    const client = new FakeDecisionClient({ "greeting:bartek": script });
    const first = await request(client, [question()]);
    expect(first).toMatchObject({ ok: true });
    if (!first.ok) return;
    expect(first.answers[0]).toMatchObject({ id: "bartek:greeting:0" });

    const second = await request(client, [question()]);
    expect(second).toMatchObject({ ok: false, reason: "timeout" });

    // Sequence exhausted -> deterministic default (first candidate, 0.9).
    const third = await request(client, [question()]);
    if (!third.ok) throw new Error("expected ok");
    expect(third.answers[0]).toMatchObject({ id: "bartek:greeting:0", confidence: 0.9 });
  });

  it("defaults unscripted questions deterministically per primitive type", async () => {
    const client = new FakeDecisionClient();
    const choice = await request(client, [question()]);
    if (!choice.ok) throw new Error("expected ok");
    expect(choice.answers[0]).toMatchObject({ type: "choice", id: "bartek:greeting:0", confidence: 0.9 });

    const score = await request(client, [question({ id: "q-score", type: "score", candidates: undefined })]);
    if (!score.ok) throw new Error("expected ok");
    // C-78: the unscripted score default is NEUTRAL (level 2 on the
    // 3-authored-level scale the adapter sends).
    expect(score.answers[0]).toMatchObject({ type: "score", level: 2, confidence: 0.9 });

    const noul = await request(client, [question({ id: "q-noul", type: "noul", candidates: undefined })]);
    if (!noul.ok) throw new Error("expected ok");
    expect(noul.answers[0]).toMatchObject({ type: "noul", noul: 0.5 });

    const subset = await request(client, [question({ id: "q-subset", type: "subset", maxSelections: 2 })]);
    if (!subset.ok) throw new Error("expected ok");
    expect(subset.answers[0]).toMatchObject({ type: "subset", ids: ["bartek:greeting:0"] });
  });

  it("supports a wildcard script entry for any unmatched question", async () => {
    const client = new FakeDecisionClient({
      "*": { failure: "network" },
    });
    const result = await request(client, [question({ id: "anything" })]);
    expect(result).toMatchObject({ ok: false, reason: "network" });
  });
});

describe("fake client — scripted failure modes", () => {
  const failureCases: ReadonlyArray<[FakeAnswerSpec & { failure: string }, string]> = [
    [{ failure: "timeout" }, "timeout"],
    [{ failure: "malformed" }, "malformed"],
    [{ failure: "network" }, "network"],
    [{ failure: "auth" }, "auth"],
  ];

  for (const [spec, reason] of failureCases) {
    it(`simulates "${reason}" without throwing`, async () => {
      const client = new FakeDecisionClient({ "greeting:bartek": spec });
      const result = await request(client, [question()]);
      expect(result).toMatchObject({ ok: false, reason });
    });
  }

  it("simulates an unknown-id answer (ok, but not a real candidate)", async () => {
    const client = new FakeDecisionClient({ "greeting:bartek": { failure: "unknown-id" } });
    const result = await request(client, [question()]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.answers[0]).toMatchObject({ type: "choice", id: "totally-unknown-candidate" });
    const first = result.answers[0];
    expect(first !== undefined && first.type === "choice").toBe(true);
    expect(
      first !== undefined && first.type === "choice"
        ? !(question().candidates?.some((c) => c.id === first.id) ?? false)
        : false,
    ).toBe(true);
  });
});

describe("fake client — configuration toggle", () => {
  it("setConfigured(false) mirrors the unconfigured client", async () => {
    const client = new FakeDecisionClient({ "greeting:bartek": { failure: "timeout" } });
    client.setConfigured(false);
    expect(client.isConfigured()).toBe(false);
    const result = await request(client, [question()]);
    expect(result).toEqual({ ok: false, reason: "unconfigured" });
  });
});
