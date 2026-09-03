/**
 * Agent-authored dialogue (ADR 0008, D-37).
 *
 * When the human talks to the robot companion, the game does NOT write its
 * lines - the agent does. This is the capability that is impossible without a
 * browser-resident model: a screenshot-and-click agent can press buttons, but
 * it cannot author a character's lines into the game's own dialogue system.
 *
 * The handshake is poll-and-supply, never await. WebMCP calls are
 * agent-initiated: the page cannot call out to the model. Any design where
 * the UI awaits the agent is a design where a disconnected agent freezes the
 * human's game. So a pending turn is readable state, the supply is an
 * ordinary tool call, and a bounded wait falls back to an in-character line
 * so the human is never held hostage to an agent's latency.
 */

export const MIN_OPTIONS = 2;
export const MAX_OPTIONS = 4;
export const MAX_LINE_LENGTH = 240;
export const MAX_OPTION_LENGTH = 120;

/** How long the human waits on the agent before the fallback line shows. */
export const SUPPLY_TIMEOUT_MS = 12_000;

/** Shown when the agent never answers. In character, never a system message. */
export const FALLBACK_LINE =
  "*the robot's status light blinks amber* ...connection to my brain is buffering. Ask me again?";
export const FALLBACK_OPTIONS: readonly string[] = ["No problem, take your time.", "Never mind."];

export interface DialogueRequestContext {
  /** Who the human is talking to. */
  companionName: string;
  /** The persona the agent gave at join time, echoed so it stays consistent. */
  persona: string;
  /** Where the conversation is happening. */
  location: { x: number; z: number };
  /** In-game clock, so the line can reference the time of day. */
  clock: string;
  /** Turn number within this conversation, starting at 1. */
  turn: number;
  /** What the human picked on the previous turn, if any. */
  lastPlayerChoice: string | null;
}

export interface SuppliedTurn {
  line: string;
  options: string[];
}

export type SupplyValidation =
  | { ok: true; value: SuppliedTurn }
  | { ok: false; reason: string };

function clean(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

/**
 * Validate and normalise what the agent supplied (D-37, D-38).
 *
 * Out-of-range option counts are REJECTED with a reason rather than silently
 * clamped: silently reshaping an agent's output teaches it nothing, and the
 * 2-4 range exists so agent-authored turns render identically to
 * hand-authored ones in the existing option-button layout.
 *
 * Length capping is a layout defence, not a correctness one - the dialogue
 * panel is a fixed region and an unbounded string overflows rather than
 * wraps. The text is rendered with textContent downstream, so markup in it is
 * displayed literally and never interpreted.
 */
export function validateSupply(rawLine: unknown, rawOptions: unknown): SupplyValidation {
  const line = clean(rawLine, MAX_LINE_LENGTH);
  if (line.length === 0) {
    return { ok: false, reason: "line must be a non-empty string" };
  }

  if (!Array.isArray(rawOptions)) {
    return {
      ok: false,
      reason: `options must be an array of ${MIN_OPTIONS}-${MAX_OPTIONS} strings`,
    };
  }

  const options = rawOptions
    .map((option) => clean(option, MAX_OPTION_LENGTH))
    .filter((option) => option.length > 0);

  if (options.length < MIN_OPTIONS || options.length > MAX_OPTIONS) {
    return {
      ok: false,
      reason:
        `expected ${MIN_OPTIONS}-${MAX_OPTIONS} non-empty options, got ${options.length}. ` +
        "These are the replies the human player will choose between.",
    };
  }

  return { ok: true, value: { line, options } };
}

export interface DialogueBroker {
  /** Called by the game when the human opens a conversation with the robot. */
  request: (context: DialogueRequestContext) => void;
  /** The pending turn an agent should answer, or null. */
  peek: () => (DialogueRequestContext & { waitingMs: number }) | null;
  /** The agent answers. Returns the normalised turn, or a reason it failed. */
  supply: (line: unknown, options: unknown) => SupplyValidation;
  /** Record what the human chose, so the agent sees it next turn. */
  recordChoice: (choice: string) => void;
  /** The human's most recent choice. */
  lastChoice: () => string | null;
  /** True once the wait has elapsed with no supply - render the fallback. */
  hasTimedOut: (nowMs?: number) => boolean;
  /** Clear everything when the conversation ends. */
  reset: () => void;
  isPending: () => boolean;
}

export function createDialogueBroker(
  now: () => number = () => Date.now(),
  onSupplied: (turn: SuppliedTurn) => void = () => {},
): DialogueBroker {
  let pending: DialogueRequestContext | null = null;
  let requestedAt = 0;
  let lastPlayerChoice: string | null = null;

  return {
    request(context) {
      pending = { ...context, lastPlayerChoice };
      requestedAt = now();
    },

    peek() {
      if (pending === null) return null;
      return { ...pending, waitingMs: now() - requestedAt };
    },

    supply(line, options) {
      if (pending === null) {
        return {
          ok: false,
          reason: "no conversation is waiting for a line - the player is not talking to the companion",
        };
      }
      const validated = validateSupply(line, options);
      if (!validated.ok) return validated;

      pending = null;
      onSupplied(validated.value);
      return validated;
    },

    recordChoice(choice) {
      lastPlayerChoice = choice;
    },

    lastChoice: () => lastPlayerChoice,

    hasTimedOut(nowMs = now()) {
      if (pending === null) return false;
      return nowMs - requestedAt >= SUPPLY_TIMEOUT_MS;
    },

    reset() {
      pending = null;
      requestedAt = 0;
      lastPlayerChoice = null;
    },

    isPending: () => pending !== null,
  };
}
