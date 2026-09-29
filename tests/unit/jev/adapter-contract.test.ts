import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { OPENROUTER_DECISIONS_URL, createOpenRouterAdapter, JEV_PINNED_MODEL } from "../../../src/jev/openrouter-adapter";
import { createResolvingClient } from "../../../src/jev/client";
import type { JevAccess, KeyProvider } from "../../../src/jev/key-provider";
import type { DecisionRequestResult, JevQuestion } from "../../../src/jev/contracts";

/**
 * WS1 adapter contract tests (ADR-0009 section 9, D-46/D-56): the
 * OpenRouter decisions adapter must normalize every provider primitive
 * into the DecisionAnswer shapes, map HTTP failure codes to typed
 * failure reasons, enforce the AbortController deadline, retry ONLY
 * when explicitly asked, and never leak the API key through any error
 * detail. NO NETWORK — fetch is a vi.stubGlobal mock.
 */

const TEST_KEY = "sk-or-v1-test-key-do-not-leak";

function makeResponse(status: number, body?: unknown, raw?: string): Response {
  const text = raw ?? JSON.stringify(body ?? {});
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => text,
    json: async () => JSON.parse(text),
  } as unknown as Response;
}

type FetchCall = { url: string | URL; init: RequestInit };

function stubFetch(handler: (url: string | URL, init: RequestInit) => Promise<Response>): FetchCall[] {
  const calls: FetchCall[] = [];
  const fetchMock = vi.fn(async (url: string | URL, init?: RequestInit) => {
    const requestInit = init ?? {};
    calls.push({ url, init: requestInit });
    return handler(url, requestInit);
  });
  vi.stubGlobal("fetch", fetchMock);
  return calls;
}

const STATE = { "npcs.bartek": { id: "bartek", relationshipBand: "neutral" } };

/**
 * The REAL Decisions API wire format (verified live 2026-09-29, see the
 * generation id in the Beads note): `questions` is a RECORD keyed by
 * question id with provider primitives, and `answers` is a RECORD keyed
 * by question id with the provider field names (`choice`, `score`,
 * `noul`). These helpers build provider-shaped payloads so the contract
 * tests pin the actual protocol, not our internal shapes.
 */
function providerChoiceResponse(questionId: string, choice: string, confidence = 0.9): Record<string, unknown> {
  return {
    model: JEV_PINNED_MODEL,
    answers: { [questionId]: { type: "choice", choice, confidence } },
  };
}

function choiceQuestion(overrides: Partial<JevQuestion> = {}): JevQuestion {
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

async function request(questions: JevQuestion[], opts: Record<string, unknown> = {}) {
  const adapter = createOpenRouterAdapter({ apiKey: TEST_KEY });
  return adapter.request(STATE, questions, {
    decisionId: "d1",
    generation: "g1",
    surface: "greeting",
    ...opts,
  }) as Promise<DecisionRequestResult>;
}

beforeEach(() => {
  vi.unstubAllEnvs();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("openrouter adapter — request wire format", () => {
  it("posts JSON {model, state, questions} to the decisions endpoint with a Bearer key", async () => {
    const calls = stubFetch(async () =>
      makeResponse(200, {
        model: JEV_PINNED_MODEL,
        usage: { input: 12, output: 8 },
        answers: {},
      }),
    );
    const result = await request([choiceQuestion()]);
    expect(result.ok).toBe(true);
    expect(calls).toHaveLength(1);
    expect(String(calls[0]!.url)).toBe(OPENROUTER_DECISIONS_URL);
    const headers = calls[0]!.init.headers as Record<string, string>;
    expect(headers.authorization).toBe(`Bearer ${TEST_KEY}`);
    expect(headers["content-type"]).toBe("application/json");
    const body = JSON.parse(String(calls[0]!.init.body)) as {
      questions: Record<string, { type: string; instructions: string; criteria: Record<string, string> }>;
    };
    // The provider record shape (NOT our internal array) — a live 400
    // caught the array form ("expected record, received array").
    expect(body.model).toBe(JEV_PINNED_MODEL);
    expect(body.state).toEqual(STATE);
    const wireQuestion = body.questions["greeting:bartek"];
    expect(wireQuestion.type).toBe("choice");
    expect(wireQuestion.instructions).toBe("Pick a greeting.");
    expect(Object.keys(wireQuestion.criteria)).toEqual([
      "bartek:greeting:0",
      "bartek:greeting:1",
      "bartek:greeting:2",
    ]);
  });

  it("rejects a subset question with invalid-request — the provider has no subset primitive (D-60: per-option Scores)", async () => {
    const result = await request([choiceQuestion({ id: "q", type: "subset" })]);
    expect(result).toMatchObject({ ok: false, reason: "invalid-request" });
  });

  it("pins the model to typesafe/jev-1.13 unless JEV_MODEL overrides it", async () => {
    let sentModel = "";
    const calls = stubFetch(async (_url, init) => {
      sentModel = (JSON.parse(String(init.body)) as { model: string }).model;
      return makeResponse(200, { answers: {} });
    });
    await request([choiceQuestion()]);
    expect(sentModel).toBe(JEV_PINNED_MODEL);
    expect(calls).toHaveLength(1);

    vi.stubEnv("JEV_MODEL", "typesafe/jev-1.13-beta");
    const adapter = createOpenRouterAdapter({ apiKey: TEST_KEY });
    await adapter.request(STATE, [choiceQuestion()], {});
    expect(sentModel).toBe("typesafe/jev-1.13-beta");
  });

  it("stamps decision identity (decisionId, surface, subject) onto normalized answers", async () => {
    stubFetch(async () =>
      makeResponse(200, providerChoiceResponse("greeting:bartek", "bartek:greeting:1", 0.8)),
    );
    const result = await request([choiceQuestion()]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.answers).toHaveLength(1);
    expect(result.answers[0]).toMatchObject({
      decisionId: "d1",
      surface: "greeting",
      subjectId: "bartek",
      questionId: "greeting:bartek",
      type: "choice",
      id: "bartek:greeting:1",
      confidence: 0.8,
    });
  });
});

describe("openrouter adapter — primitive normalization", () => {
  it("normalizes a provider score answer (field `score`, may be fractional between levels)", async () => {
    stubFetch(async () =>
      makeResponse(200, {
        answers: { q: { type: "score", score: 1.5, confidence: 0.6 } },
      }),
    );
    const result = await request([
      choiceQuestion({
        id: "q",
        type: "score",
        candidates: [
          { id: "low", description: "cold" },
          { id: "mid", description: "warm" },
          { id: "high", description: "hot" },
        ],
      }),
    ]);
    if (!result.ok) throw new Error("expected ok");
    expect(result.answers[0]).toMatchObject({ type: "score", level: 1.5, confidence: 0.6 });
  });

  it("normalizes a noul answer (no confidence field by contract)", async () => {
    stubFetch(async () =>
      makeResponse(200, {
        answers: { q: { type: "noul", noul: 0.42 } },
      }),
    );
    const result = await request([choiceQuestion({ id: "q", candidates: undefined, type: "noul" })]);
    if (!result.ok) throw new Error("expected ok");
    expect(result.answers[0]).toMatchObject({ type: "noul", noul: 0.42 });
    expect(result.answers[0]).not.toHaveProperty("confidence");
  });

  it("reports usage and echoes the model on success", async () => {
    stubFetch(async () =>
      makeResponse(200, {
        model: "typesafe/jev-1.13",
        usage: { input: 100, output: 20 },
        answers: {},
      }),
    );
    const result = await request([choiceQuestion()]);
    if (!result.ok) throw new Error("expected ok");
    expect(result.usage).toEqual({ input: 100, output: 20 });
    expect(result.model).toBe("typesafe/jev-1.13");
    expect(result.rejectedCount).toBe(0);
  });
});

describe("openrouter adapter — structural rejection (D-49 per-type rules)", () => {
  it("drops a choice answer naming an unknown candidate id", async () => {
    stubFetch(async () =>
      makeResponse(200, providerChoiceResponse("greeting:bartek", "not-a-candidate")),
    );
    const result = await request([choiceQuestion()]);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.answers).toHaveLength(0);
    expect(result.rejectedCount).toBe(1);
  });

  it("drops a noul answer missing its noul field", async () => {
    stubFetch(async () =>
      makeResponse(200, { answers: { q: { type: "noul" } } }),
    );
    const result = await request([choiceQuestion({ id: "q", type: "noul", candidates: undefined })]);
    if (!result.ok) throw new Error("expected ok");
    expect(result.answers).toHaveLength(0);
    expect(result.rejectedCount).toBe(1);
  });

  it("drops an answer with out-of-range confidence (record: one answer per question)", async () => {
    stubFetch(async () =>
      makeResponse(200, {
        answers: { "greeting:bartek": { type: "choice", choice: "bartek:greeting:0", confidence: 1.7 } },
      }),
    );
    const result = await request([choiceQuestion()]);
    if (!result.ok) throw new Error("expected ok");
    expect(result.answers).toHaveLength(0);
    expect(result.rejectedCount).toBe(1);
  });

  it("ignores provider answers whose key matches no request question (partial batch stays partial)", async () => {
    stubFetch(async () =>
      makeResponse(200, {
        answers: {
          "greeting:bartek": { type: "choice", choice: "bartek:greeting:0", confidence: 0.9 },
          "greeting:marek": { type: "choice", choice: "marek:greeting:0", confidence: 0.9 },
        },
      }),
    );
    const result = await request([choiceQuestion()]);
    if (!result.ok) throw new Error("expected ok");
    expect(result.answers).toHaveLength(1);
    expect(result.answers[0]).toMatchObject({ questionId: "greeting:bartek" });
  });
});

describe("openrouter adapter — typed failure mapping", () => {
  it("maps 401 to auth and never retries it", async () => {
    const calls = stubFetch(async () => makeResponse(401, { error: { message: "bad key" } }));
    const result = await request([choiceQuestion()], { retries: 2, backoffMs: 1 });
    expect(result).toMatchObject({ ok: false, reason: "auth" });
    expect(calls).toHaveLength(1);
  });

  it("maps 422 to invalid-request and surfaces the field name in detail", async () => {
    stubFetch(async () =>
      makeResponse(422, { error: { message: "Invalid field: questions[0].id" } }),
    );
    const result = await request([choiceQuestion()]);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.reason).toBe("invalid-request");
    expect(result.detail).toContain("questions[0].id");
  });

  it("maps 429 to rate-limited and 529/5xx to provider-unavailable", async () => {
    stubFetch(async () => makeResponse(429, {}));
    expect(await request([choiceQuestion()])).toMatchObject({ ok: false, reason: "rate-limited" });

    stubFetch(async () => makeResponse(529, {}));
    expect(await request([choiceQuestion()])).toMatchObject({
      ok: false,
      reason: "provider-unavailable",
    });

    stubFetch(async () => makeResponse(503, {}));
    expect(await request([choiceQuestion()])).toMatchObject({
      ok: false,
      reason: "provider-unavailable",
    });
  });

  it("maps malformed JSON with HTTP 200 to malformed", async () => {
    stubFetch(async () => makeResponse(200, undefined, "this is not json"));
    const result = await request([choiceQuestion()]);
    expect(result).toMatchObject({ ok: false, reason: "malformed" });
  });
});

describe("openrouter adapter — retries (dialogue path only)", () => {
  it("retries a 429 once and succeeds on the second attempt", async () => {
    let attempt = 0;
    const calls = stubFetch(async () => {
      attempt += 1;
      if (attempt === 1) return makeResponse(429, {});
      return makeResponse(200, { answers: {} });
    });
    const result = await request([choiceQuestion()], { retries: 2, backoffMs: 1 });
    expect(calls).toHaveLength(2);
    expect(result.ok).toBe(true);
  });

  it("caps retries at 2 and returns the last typed failure", async () => {
    const calls = stubFetch(async () => makeResponse(429, {}));
    const result = await request([choiceQuestion()], { retries: 5, backoffMs: 1 });
    expect(calls).toHaveLength(3); // 1 initial + 2 retries (ADR max)
    expect(result).toMatchObject({ ok: false, reason: "rate-limited" });
  });

  it("defaults to NO retries (ambient path never retries, D-56)", async () => {
    const calls = stubFetch(async () => makeResponse(429, {}));
    await request([choiceQuestion()]);
    expect(calls).toHaveLength(1);
  });
});

describe("openrouter adapter — timeout via AbortController", () => {
  it("aborts the request at the deadline and returns a typed timeout", async () => {
    const calls = stubFetch((_url, init) => {
      return new Promise<Response>((_resolve, reject) => {
        init.signal?.addEventListener("abort", () => {
          reject(new DOMException("The operation was aborted.", "AbortError"));
        });
      });
    });
    const result = await request([choiceQuestion()], { timeoutMs: 30 });
    expect(result).toMatchObject({ ok: false, reason: "timeout" });
    expect(calls[0]?.init.signal).toBeTruthy();
  });
});

describe("openrouter adapter — key hygiene (D-59, key scenario 10)", () => {
  it("never includes the API key in a failure detail, even when the provider echoes it", async () => {
    stubFetch(async () =>
      makeResponse(401, { error: { message: `rejected key ${TEST_KEY}` } }),
    );
    const result = await request([choiceQuestion()]);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.detail).not.toContain(TEST_KEY);
    if (result.detail !== undefined) {
      expect(result.detail).toContain("[redacted]");
    }
  });

  it("never includes the API key when fetch itself throws with the key in the message", async () => {
    const fetchMock = vi.fn(async () => {
      throw new Error(`fetch failed for ${TEST_KEY}`);
    });
    vi.stubGlobal("fetch", fetchMock);
    const result = await request([choiceQuestion()]);
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.detail).toBeDefined();
    expect(result.detail).not.toContain(TEST_KEY);
  });

  it("never puts the key in the request body or URL — Authorization header only", async () => {
    const calls = stubFetch(async () => makeResponse(200, { answers: {} }));
    await request([choiceQuestion()]);
    expect(String(calls[0]!.url)).not.toContain(TEST_KEY);
    expect(String(calls[0]!.init.body)).not.toContain(TEST_KEY);
    const headers = calls[0]!.init.headers as Record<string, string>;
    expect(headers.authorization).toBe(`Bearer ${TEST_KEY}`);
  });
});

describe("openrouter adapter — configuration", () => {
  it("isConfigured: true with a key, false without one on the direct endpoint", () => {
    expect(createOpenRouterAdapter({ apiKey: TEST_KEY }).isConfigured()).toBe(true);
    expect(createOpenRouterAdapter({ apiKey: "" }).isConfigured()).toBe(false);
    expect(createOpenRouterAdapter({}).isConfigured()).toBe(false);
  });

  it("isConfigured: true for a proxy endpoint even without a local key", () => {
    const proxy = createOpenRouterAdapter({ endpoint: "https://play.devpowers.com/api/jev" });
    expect(proxy.isConfigured()).toBe(true);
  });

  it("a proxy request sends no Authorization header (the proxy injects its own auth)", async () => {
    const calls = stubFetch(async () => makeResponse(200, { answers: {} }));
    const proxy = createOpenRouterAdapter({ endpoint: "https://play.devpowers.com/api/jev" });
    await proxy.request(STATE, [choiceQuestion()], {});
    const headers = (calls[0]?.init.headers ?? {}) as Record<string, string>;
    expect(headers.authorization).toBeUndefined();
  });
});

describe("resolving client (key provider -> client)", () => {
  function stubProvider(access: JevAccess): KeyProvider {
    return {
      getAccess: () => access,
      setPersonalKey: () => undefined,
      clearKey: () => undefined,
      isPersistent: () => true,
      testKey: async () => ({ status: "connected", model: JEV_PINNED_MODEL }),
    };
  }

  it("returns unconfigured (no network) when the provider has no access", async () => {
    const client = createResolvingClient(stubProvider({ kind: "none" }));
    expect(client.isConfigured()).toBe(false);
    const result = await client.request(STATE, [choiceQuestion()]);
    expect(result).toMatchObject({ ok: false, reason: "unconfigured" });
  });

  it("resolves a personal key to the direct OpenRouter adapter at request time", async () => {
    const calls = stubFetch(async () => makeResponse(200, { answers: {} }));
    const client = createResolvingClient(stubProvider({ kind: "personal", key: TEST_KEY }));
    expect(client.isConfigured()).toBe(true);
    const result = await client.request(STATE, [choiceQuestion()]);
    expect(result.ok).toBe(true);
    expect(String(calls[0]?.url)).toBe(OPENROUTER_DECISIONS_URL);
  });

  it("resolves a proxy URL to an adapter pointed at the proxy", async () => {
    const calls = stubFetch(async () => makeResponse(200, { answers: {} }));
    const client = createResolvingClient(
      stubProvider({ kind: "proxy", url: "https://play.devpowers.com/api/jev" }),
    );
    await client.request(STATE, [choiceQuestion()]);
    expect(String(calls[0]?.url)).toBe("https://play.devpowers.com/api/jev");
  });
});
