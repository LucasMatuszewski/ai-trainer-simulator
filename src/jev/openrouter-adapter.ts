/**
 * WS1 OpenRouter Decisions API adapter (ADR-0009 section 3.1, D-46).
 *
 * The real decision client: POSTs `{model, state, questions}` to the
 * OpenRouter decisions endpoint and normalizes the response into the
 * discriminated `DecisionAnswer` shapes from contracts.ts. Contract
 * rules implemented here:
 *
 *  - Model pinned to `typesafe/jev-1.13`, overridable via the JEV_MODEL
 *    env (read defensively — never a VITE_* secret).
 *  - The API key travels in the Authorization header ONLY. It is never
 *    read from vite/client, never placed in the body or URL, and never
 *    appears in any error detail (redacted defensively, D-59).
 *  - 401 -> "auth", 422 -> "invalid-request", 429 -> "rate-limited",
 *    529/5xx -> "provider-unavailable", deadline -> "timeout",
 *    non-JSON -> "malformed", rest -> "network".
 *  - Timeout via AbortController; retries ONLY when explicitly asked
 *    (dialogue path), exponential backoff, capped at 2 (D-56).
 *  - request() never throws past its typed result envelope.
 *  - Structurally invalid answers (unknown candidate id, missing noul
 *    field, non-finite numbers, bad subset cardinality) are dropped
 *    and counted; callers treat a missing answer as fallback (D-49).
 */

import type {
  DecisionAnswer,
  DecisionClient,
  DecisionFailureReason,
  DecisionRequestOptions,
  DecisionRequestResult,
  DecisionUsage,
  JevQuestion,
} from "./contracts";

export const OPENROUTER_DECISIONS_URL = "https://openrouter.ai/api/alpha/decisions";
export const JEV_PINNED_MODEL = "typesafe/jev-1.13";

const MAX_RETRIES = 2;
const DEFAULT_TIMEOUT_MS = 1200;
const DEFAULT_BACKOFF_MS = 250;
const MAX_DETAIL_CHARS = 200;

/** Question id stamped on a key-check answer (key-provider test call). */
export const KEY_TEST_QUESTION_ID = "jev-keytest";

export interface OpenRouterAdapterOptions {
  /** Decisions endpoint. Default: the OpenRouter URL. A proxy URL
   *  (VITE_JEV_PROXY_URL mode) needs no local key — the proxy injects
   *  its own auth server-side. */
  endpoint?: string;
  /** Bearer key for direct OpenRouter access (BYO personal key mode). */
  apiKey?: string;
  /** Model override (default: JEV_MODEL env, else the pinned model). */
  model?: string;
  /** Injectable fetch for tests; default binds globalThis.fetch. */
  fetchFn?: typeof fetch;
}

function resolveModel(override?: string): string {
  if (override !== undefined && override.trim() !== "") return override.trim();
  try {
    const envModel: unknown = import.meta.env?.JEV_MODEL;
    if (typeof envModel === "string" && envModel.trim() !== "") return envModel.trim();
  } catch {
    // import.meta.env unavailable (plain Node) — keep the pinned model.
  }
  return JEV_PINNED_MODEL;
}

/** Remove any occurrence of the secret from an error string (D-59). */
function redact(text: string, secret?: string): string {
  if (secret === undefined || secret === "") return text;
  return text.split(secret).join("[redacted]");
}

function truncate(text: string): string {
  return text.length <= MAX_DETAIL_CHARS ? text : `${text.slice(0, MAX_DETAIL_CHARS)}...`;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isUnitInterval(value: unknown): value is number {
  return isFiniteNumber(value) && value >= 0 && value <= 1;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function classifyStatus(status: number): DecisionFailureReason {
  if (status === 400 || status === 422) return "invalid-request";
  if (status === 401 || status === 403) return "auth";
  if (status === 408) return "timeout";
  if (status === 429) return "rate-limited";
  if (status >= 500) return "provider-unavailable";
  return "network";
}

function isRetryable(reason: DecisionFailureReason): boolean {
  return (
    reason === "rate-limited" ||
    reason === "provider-unavailable" ||
    reason === "timeout" ||
    reason === "network"
  );
}

/**
 * Converts our internal question array into the Decisions API record
 * shape: `{ [questionId]: { type, instructions, criteria } }`. Throws
 * on unsupported internal types (e.g. "subset" is OUR curation concept —
 * the ADR's D-60 sends per-option Scores instead).
 */
function toProviderQuestions(
  questions: readonly JevQuestion[],
): Record<string, Record<string, unknown>> {
  const wire: Record<string, Record<string, unknown>> = {};
  for (const q of questions) {
    switch (q.type) {
      case "choice": {
        if (!q.candidates || q.candidates.length === 0) {
          throw new Error(`choice question "${q.id}" has no candidates`);
        }
        const criteria: Record<string, string> = {};
        for (const c of q.candidates) criteria[c.id] = c.description;
        wire[q.id] = { type: "choice", instructions: q.prompt, criteria };
        break;
      }
      case "score": {
        // Levels come either as candidates or as plain criteria strings.
        const levels = q.candidates
          ? q.candidates.map((c) => c.description)
          : q.criteria;
        if (!levels || levels.length === 0) {
          throw new Error(`score question "${q.id}" has no levels`);
        }
        wire[q.id] = { type: "score", instructions: q.prompt, criteria: levels };
        break;
      }
      case "noul": {
        wire[q.id] = { type: "noul", instructions: q.prompt };
        break;
      }
      default:
        throw new Error(`question "${q.id}" type is not provider-addressable`);
    }
  }
  return wire;
}

interface MinimalResponse {
  ok: boolean;
  status: number;
  text(): Promise<string>;
}

/** Extract a short, key-free message from an error response body. */
async function describeErrorBody(res: MinimalResponse, secret?: string): Promise<string> {
  let detail = `HTTP ${res.status}`;
  try {
    const text = await res.text();
    try {
      const parsed = JSON.parse(text) as {
        error?: { message?: unknown } | string;
        message?: unknown;
      };
      const message =
        typeof parsed.error === "object" && parsed.error !== null
          ? parsed.error.message
          : typeof parsed.error === "string"
            ? parsed.error
            : parsed.message;
      if (typeof message === "string" && message.trim() !== "") {
        detail = `HTTP ${res.status}: ${message.trim()}`;
      }
    } catch {
      // Body was not JSON — the HTTP status alone is context enough.
    }
  } catch {
    // Reading the body failed — keep the status-only detail.
  }
  return truncate(redact(detail, secret));
}

function parseUsage(raw: unknown): DecisionUsage {
  if (raw === null || typeof raw !== "object") return {};
  const usage = raw as { input?: unknown; output?: unknown };
  const out: DecisionUsage = {};
  if (isFiniteNumber(usage.input)) out.input = usage.input;
  if (isFiniteNumber(usage.output)) out.output = usage.output;
  return out;
}

function parseProbabilities(raw: unknown): readonly number[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  if (!raw.every(isFiniteNumber)) return undefined;
  return raw;
}

export function createOpenRouterAdapter(
  options: OpenRouterAdapterOptions = {},
): DecisionClient {
  const endpoint = options.endpoint ?? OPENROUTER_DECISIONS_URL;
  const apiKey = options.apiKey;
  const fetchFn = options.fetchFn;
  let decisionSeq = 0;

  const isDirectOpenRouter = endpoint === OPENROUTER_DECISIONS_URL;

  const client: DecisionClient = {
    isConfigured(): boolean {
      if (apiKey !== undefined && apiKey !== "") return true;
      // A non-default endpoint is a proxy; the proxy owns its own key.
      return !isDirectOpenRouter;
    },

    async request(
      state: Readonly<Record<string, unknown>>,
      questions: readonly JevQuestion[],
      opts: DecisionRequestOptions = {},
    ): Promise<DecisionRequestResult> {
      const attempts = Math.min(Math.max(0, opts.retries ?? 0), MAX_RETRIES) + 1;
      const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
      const backoffMs = opts.backoffMs ?? DEFAULT_BACKOFF_MS;
      const model = resolveModel(options.model);
      let last: DecisionRequestResult = { ok: false, reason: "network" };
      for (let attempt = 0; attempt < attempts; attempt += 1) {
        if (attempt > 0) await sleep(backoffMs * 2 ** (attempt - 1));
        last = await attemptOnce(state, questions, opts, timeoutMs, model);
        if (last.ok) return last;
        if (!isRetryable(last.reason)) return last;
      }
      return last;
    },
  };

  async function attemptOnce(
    state: Readonly<Record<string, unknown>>,
    questions: readonly JevQuestion[],
    opts: DecisionRequestOptions,
    timeoutMs: number,
    model: string,
  ): Promise<DecisionRequestResult> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const headers: Record<string, string> = { "content-type": "application/json" };
    if (apiKey !== undefined && apiKey !== "") headers.authorization = `Bearer ${apiKey}`;
    const decisionId = opts.decisionId ?? `jev-${Date.now()}-${(decisionSeq += 1)}`;
    // The Decisions API expects `questions` as a RECORD keyed by question
    // id with provider-shaped primitives — not our internal array. A
    // live call caught this (400 "expected record, received array");
    // wire-format conversion lives here so callers keep the typed array.
    let wireQuestions: Record<string, unknown>;
    try {
      wireQuestions = toProviderQuestions(questions);
    } catch (err) {
      return {
        ok: false,
        reason: "invalid-request",
        detail: err instanceof Error ? err.message : "unsupported question shape",
      };
    }
    try {
      const doFetch: typeof fetch =
        fetchFn ?? ((url: RequestInfo | URL, init?: RequestInit) => globalThis.fetch(url, init));
      const res = await doFetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({ model, state, questions: wireQuestions }),
        signal: controller.signal,
      });
      if (res.status < 200 || res.status >= 300) {
        return { ok: false, reason: classifyStatus(res.status), detail: await describeErrorBody(res, apiKey) };
      }
      // PR review fix (major): await INSIDE the try — returning the parse
      // promise directly cleared the abort timer before the body finished
      // reading, so a stalled body escaped the deadline forever.
      return await parseSuccessResponse(res, questions, opts, decisionId, model);
    } catch (err) {
      if (controller.signal.aborted) return { ok: false, reason: "timeout" };
      const message = err instanceof Error ? err.message : String(err);
      return { ok: false, reason: "network", detail: truncate(redact(message, apiKey)) };
    } finally {
      clearTimeout(timer);
    }
  }

  function parseSuccessResponse(
    res: MinimalResponse,
    questions: readonly JevQuestion[],
    opts: DecisionRequestOptions,
    decisionId: string,
    model: string,
  ): Promise<DecisionRequestResult> {
    let parsed: unknown;
    return res
      .text()
      .then((text) => {
        try {
          parsed = JSON.parse(text);
        } catch {
          return { ok: false as const, reason: "malformed" as const, detail: "provider returned a non-JSON body" };
        }
        return normalizeResponse(parsed, questions, opts, decisionId, model);
      })
      .catch(() => ({ ok: false as const, reason: "network" as const, detail: "failed to read the provider response" }));
  }

  function normalizeResponse(
    parsed: unknown,
    questions: readonly JevQuestion[],
    opts: DecisionRequestOptions,
    decisionId: string,
    model: string,
  ): DecisionRequestResult {
    if (parsed === null || typeof parsed !== "object") {
      return { ok: false, reason: "malformed", detail: "provider response was not an object" };
    }
    const body = parsed as { answers?: unknown; usage?: unknown; model?: unknown };
    // The provider returns `answers` as a RECORD keyed by question id
    // with provider field names (e.g. `choice`, not our `id`). Bridge it
    // into the array our normalizer expects.
    if (body.answers === null || typeof body.answers !== "object" || Array.isArray(body.answers)) {
      return { ok: false, reason: "malformed", detail: "provider response missing answers record" };
    }
    const answerRecord = body.answers as Record<string, Record<string, unknown>>;
    const answers: DecisionAnswer[] = [];
    let rejectedCount = 0;
    for (const question of questions) {
      const rawEntry = answerRecord[question.id];
      if (rawEntry === undefined) continue; // missing answer = caller falls back (D-47)
      const raw = {
        questionId: question.id,
        subjectId: question.subjectId,
        ...rawEntry,
      };
      const normalized = normalizeAnswer(raw, questions, opts, decisionId);
      if (normalized === null) rejectedCount += 1;
      else answers.push(normalized);
    }
    const responseModel =
      typeof body.model === "string" && body.model.trim() !== "" ? body.model.trim() : model;
    return { ok: true, answers, rejectedCount, usage: parseUsage(body.usage), model: responseModel };
  }

  function normalizeAnswer(
    raw: unknown,
    questions: readonly JevQuestion[],
    opts: DecisionRequestOptions,
    decisionId: string,
  ): DecisionAnswer | null {
    if (raw === null || typeof raw !== "object") return null;
    const answer = raw as {
      questionId?: unknown;
      subjectId?: unknown;
      type?: unknown;
      id?: unknown;
      /** Decisions API field name for the selected choice option. */
      choice?: unknown;
      /** Decisions API field name for the score value (may be fractional). */
      score?: unknown;
      level?: unknown;
      noul?: unknown;
      ids?: unknown;
      confidences?: unknown;
      confidence?: unknown;
      probabilities?: unknown;
    };
    const selectedId =
      typeof answer.id === "string" && answer.id !== "" ? answer.id : answer.choice;
    if (typeof answer.questionId !== "string") return null;
    const question = questions.find((q) => q.id === answer.questionId);
    if (question === undefined) return null;
    const subjectId =
      typeof answer.subjectId === "string" && answer.subjectId !== ""
        ? answer.subjectId
        : question.subjectId;
    if (subjectId === undefined || subjectId === "") return null;
    const key = {
      decisionId,
      subjectId,
      // Callers should always declare their surface; "tree-opening" is
      // the documented neutral default for ad-hoc calls.
      surface: opts.surface ?? "tree-opening",
      questionId: answer.questionId,
    };

    switch (answer.type) {
      case "choice": {
        if (typeof selectedId !== "string" || selectedId === "") return null;
        if (!isUnitInterval(answer.confidence)) return null;
        if (
          question.candidates !== undefined &&
          !question.candidates.some((candidate) => candidate.id === selectedId)
        ) {
          return null; // unknown candidate id (D-49)
        }
        return {
          ...key,
          type: "choice",
          id: selectedId,
          confidence: answer.confidence,
          probabilities: parseProbabilities(answer.probabilities),
        };
      }
      case "score": {
        // The Decisions API names the field `score` and it may fall
        // BETWEEN levels (fractional) — consumers round per D-60.
        const levelValue = answer.level ?? answer.score;
        if (!isFiniteNumber(levelValue)) return null;
        if (!isUnitInterval(answer.confidence)) return null;
        return {
          ...key,
          type: "score",
          level: levelValue,
          confidence: answer.confidence,
          probabilities: parseProbabilities(answer.probabilities),
        };
      }
      case "noul": {
        // Noul has NO confidence field — gating is on distance from 0.5.
        if (!isUnitInterval(answer.noul)) return null;
        return { ...key, type: "noul", noul: answer.noul };
      }
      case "subset": {
        if (!Array.isArray(answer.ids) || !answer.ids.every((id) => typeof id === "string" && id !== "")) {
          return null;
        }
        if (!Array.isArray(answer.confidences) || !answer.confidences.every(isUnitInterval)) {
          return null;
        }
        const ids = answer.ids as string[];
        const confidences = answer.confidences as number[];
        if (ids.length !== confidences.length) return null;
        if (new Set(ids).size !== ids.length) return null; // duplicates rejected
        const candidates = question.candidates;
        if (candidates !== undefined && !ids.every((id) => candidates.some((c) => c.id === id))) {
          return null;
        }
        const min = question.minSelections ?? 0;
        const max = question.maxSelections ?? candidates?.length ?? ids.length;
        if (ids.length < min || ids.length > max) return null;
        return { ...key, type: "subset", ids, confidences };
      }
      default:
        return null;
    }
  }

  return client;
}
