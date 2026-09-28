/**
 * WS1 fake decision client (ADR-0009 section 3.1, test layer
 * "Integration — fake client" in section 9).
 *
 * A deterministic, network-free DecisionClient for wrapper tests:
 *  - the constructor takes a SCRIPT — a map from question id (or
 *    `surface:<surface>`, or `*`) to a canned answer or a SEQUENCE of
 *    entries consumed one per request;
 *  - every request payload is recorded in `requests`;
 *  - scripted failure modes (timeout / malformed / network / auth /
 *    unknown-id) let wrapper tests prove their fallback paths.
 *
 * Unscripted questions get a deterministic default: the FIRST
 * candidate at confidence 0.9 for choice/subset, level 5 for score,
 * 0.5 for noul — the "provider agrees with the authored default"
 * client.
 */

import type {
  DecisionAnswer,
  DecisionClient,
  DecisionFailureReason,
  DecisionRequestOptions,
  DecisionRequestResult,
  JevQuestion,
} from "./contracts";

export type FakeFailureMode = "timeout" | "malformed" | "network" | "auth" | "unknown-id";

export type FakeAnswerSpec =
  | { type: "choice"; id: string; confidence: number }
  | { type: "score"; level: number; confidence: number }
  | { type: "noul"; noul: number }
  | { type: "subset"; ids: readonly string[]; confidences: readonly number[] }
  | { failure: FakeFailureMode };

export type FakeScript = Record<string, FakeAnswerSpec | readonly FakeAnswerSpec[]>;

export const FAKE_UNKNOWN_CANDIDATE_ID = "totally-unknown-candidate";

export interface FakeDecisionClientOptions {
  configured?: boolean;
  /** Decision id stamped into answers (default "fake-decision"). */
  decisionId?: string;
}

export class FakeDecisionClient implements DecisionClient {
  private script: FakeScript;
  private configured: boolean;
  private readonly decisionId: string;
  private readonly sequenceIndexes = new Map<string, number>();
  private readonly requestLog: {
    state: Readonly<Record<string, unknown>>;
    questions: readonly JevQuestion[];
    opts: DecisionRequestOptions | undefined;
  }[] = [];

  /**
   * @param script the canned-answer map, keyed by question id
   *   (`surface:<surface>` and `*` also match). Values are a single
   *   spec or a SEQUENCE consumed one entry per request.
   */
  constructor(script: FakeScript = {}, options: FakeDecisionClientOptions = {}) {
    this.script = script;
    this.configured = options.configured ?? true;
    this.decisionId = options.decisionId ?? "fake-decision";
  }

  /** Recorded request payloads, oldest first. */
  get requests(): readonly {
    state: Readonly<Record<string, unknown>>;
    questions: readonly JevQuestion[];
    opts: DecisionRequestOptions | undefined;
  }[] {
    return this.requestLog;
  }

  get callCount(): number {
    return this.requestLog.length;
  }

  isConfigured(): boolean {
    return this.configured;
  }

  setConfigured(configured: boolean): void {
    this.configured = configured;
  }

  /** Replace or extend the script between requests. */
  setScript(script: FakeScript): void {
    this.script = script;
  }

  async request(
    state: Readonly<Record<string, unknown>>,
    questions: readonly JevQuestion[],
    opts?: DecisionRequestOptions,
  ): Promise<DecisionRequestResult> {
    this.requestLog.push({ state, questions, opts });
    if (!this.configured) return { ok: false, reason: "unconfigured" };

    const surface = opts?.surface;
    const answers: DecisionAnswer[] = [];
    let lastFailure: FakeFailureMode | undefined;
    for (const question of questions) {
      const spec = this.nextSpec(question.id, surface);
      if (spec === undefined) {
        answers.push(...this.defaultAnswer(question));
        continue;
      }
      const resolved = this.specToAnswer(spec, question, opts);
      if (resolved.kind === "failure") {
        lastFailure = resolved.mode;
        continue;
      }
      if (resolved.answer !== null) answers.push(resolved.answer);
    }
    if (answers.length === 0 && questions.length > 0) {
      // Every question failed — surface the dominant scripted failure.
      return { ok: false, reason: failureReasonOf(lastFailure ?? "malformed") };
    }
    return { ok: true, answers, rejectedCount: 0, usage: {}, model: "fake" };
  }

  private lookup(questionId: string, surface: unknown): FakeAnswerSpec | readonly FakeAnswerSpec[] | undefined {
    const direct = this.script[questionId];
    if (direct !== undefined) return direct;
    if (typeof surface === "string") {
      const bySurface = this.script[`surface:${surface}`];
      if (bySurface !== undefined) return bySurface;
    }
    return this.script["*"];
  }

  private nextSpec(questionId: string, surface: unknown): FakeAnswerSpec | undefined {
    const spec = this.lookup(questionId, surface);
    if (spec === undefined) return undefined;
    if (!Array.isArray(spec)) return spec as FakeAnswerSpec;
    // Sequence: consume in order; once exhausted fall through to the
    // deterministic default.
    const index = this.sequenceIndexes.get(questionId) ?? 0;
    const seq = spec as readonly FakeAnswerSpec[];
    const entry: FakeAnswerSpec | undefined = seq[index];
    if (entry === undefined) return undefined;
    this.sequenceIndexes.set(questionId, index + 1);
    return entry;
  }

  private specToAnswer(
    spec: FakeAnswerSpec,
    question: JevQuestion,
    opts: DecisionRequestOptions | undefined,
  ): { kind: "answer"; answer: DecisionAnswer | null } | { kind: "failure"; mode: FakeFailureMode } {
    if ("failure" in spec) {
      if (spec.failure === "unknown-id") {
        return {
          kind: "answer",
          answer: {
            decisionId: opts?.decisionId ?? this.decisionId,
            subjectId: question.subjectId ?? "",
            surface: opts?.surface ?? "tree-opening",
            questionId: question.id,
            type: "choice",
            id: FAKE_UNKNOWN_CANDIDATE_ID,
            confidence: 0.9,
          },
        };
      }
      return { kind: "failure", mode: spec.failure };
    }
    const key = {
      decisionId: opts?.decisionId ?? this.decisionId,
      subjectId: question.subjectId ?? "",
      surface: opts?.surface ?? "tree-opening",
      questionId: question.id,
    };
    switch (spec.type) {
      case "choice":
        return { kind: "answer", answer: { ...key, type: "choice", id: spec.id, confidence: spec.confidence } };
      case "score":
        return { kind: "answer", answer: { ...key, type: "score", level: spec.level, confidence: spec.confidence } };
      case "noul":
        return { kind: "answer", answer: { ...key, type: "noul", noul: spec.noul } };
      case "subset":
        return { kind: "answer", answer: { ...key, type: "subset", ids: spec.ids, confidences: spec.confidences } };
      default:
        return { kind: "answer", answer: null };
    }
  }

  private defaultAnswer(question: JevQuestion): DecisionAnswer[] {
    const key = {
      decisionId: this.decisionId,
      subjectId: question.subjectId ?? "",
      surface: "tree-opening" as const,
      questionId: question.id,
    };
    switch (question.type) {
      case "choice": {
        const first = question.candidates?.[0];
        return first === undefined
          ? []
          : [{ ...key, type: "choice", id: first.id, confidence: 0.9 }];
      }
      case "score":
        return [{ ...key, type: "score", level: 5, confidence: 0.9 }];
      case "noul":
        return [{ ...key, type: "noul", noul: 0.5 }];
      case "subset": {
        const first = question.candidates?.[0];
        return first === undefined
          ? []
          : [{ ...key, type: "subset", ids: [first.id], confidences: [0.9] }];
      }
      default:
        return [];
    }
  }
}

function failureReasonOf(failure: FakeFailureMode): DecisionFailureReason {
  switch (failure) {
    case "timeout":
      return "timeout";
    case "malformed":
      return "malformed";
    case "network":
      return "network";
    case "auth":
      return "auth";
    case "unknown-id":
      return "malformed";
    default:
      return "network";
  }
}
