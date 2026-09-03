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

/**
 * One option is legal (L-2026-09-03-04). An agent OPENING a conversation may
 * reasonably offer a single "sure, what's up?" reply; the old floor of 2 was
 * written when only the human could start one.
 */
export const MIN_OPTIONS = 1;
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

/**
 * A reply offered to the human. `ends` marks the option that closes the
 * conversation - the text stays the agent's to write, so the exit can be in
 * character ("Anyway, I should get back to the build") rather than a generic
 * Close button (Lucas, 2026-09-03).
 */
export interface TurnOption {
  text: string;
  ends: boolean;
}

export interface SuppliedTurn {
  line: string;
  options: TurnOption[];
}

/** Default long-poll duration.
 *
 *  Deliberately short. We do not know what tool-call timeout ChatGPT's
 *  browser enforces, and a wait that outlives the host's patience looks like
 *  a hung tool rather than an empty result. 25s is responsive enough to feel
 *  like a notification and short enough to stay well inside any plausible
 *  limit. An agent on a tolerant host can ask for longer. */
export const PLAYER_WAIT_TIMEOUT_MS = 25_000;

/** Ceiling on a caller-requested wait. */
export const PLAYER_WAIT_MAX_MS = 120_000;

/**
 * The long-poll is COVERAGE, not a subscription: it lasts one call, and an
 * agent stays reachable by re-arming it. That is why nothing is lost when it
 * lapses - a player who opens a conversation while no agent is waiting has
 * their request QUEUED, and the next wait (or peek) returns it immediately.
 * The player is never talking into a void; the robot simply looks like it is
 * thinking for longer.
 */

export interface PlayerMessage {
  waiting: boolean;
  choice?: string;
  /** Index of the option the player picked. */
  optionIndex?: number;
  /** True when the player picked the option the agent marked as ending. */
  conversationEnded?: boolean;
  turn?: number;
  hint?: string;
}

/**
 * Accept either plain strings or `{text, ends}` objects.
 *
 * Agents overwhelmingly send strings, and rejecting those to force an object
 * shape would be pedantry - so strings are promoted to non-ending options
 * and everything converges on one internal type.
 */
export function normaliseOptions(raw: unknown): TurnOption[] {
  if (!Array.isArray(raw)) return [];
  const options: TurnOption[] = [];
  for (const entry of raw) {
    if (typeof entry === "string") {
      const text = clean(entry, MAX_OPTION_LENGTH);
      if (text.length > 0) options.push({ text, ends: false });
      continue;
    }
    if (typeof entry === "object" && entry !== null) {
      const record = entry as Record<string, unknown>;
      const text = clean(record.text, MAX_OPTION_LENGTH);
      if (text.length > 0) options.push({ text, ends: record.ends === true });
    }
  }
  return options;
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
      reason:
        `options must be an array of ${MIN_OPTIONS}-${MAX_OPTIONS} entries - either plain ` +
        `strings, or {text, ends} objects where ends:true closes the conversation`,
    };
  }

  const options = normaliseOptions(rawOptions);

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
  recordChoice: (choice: string, optionIndex?: number, ends?: boolean) => void;
  /** The human's most recent choice. */
  lastChoice: () => string | null;
  /** True once the wait has elapsed with no supply - render the fallback. */
  hasTimedOut: (nowMs?: number) => boolean;
  /** Clear everything when the conversation ends. */
  reset: () => void;
  isPending: () => boolean;
  /**
   * Long-poll: resolves the instant the player answers, or with
   * `{waiting: true}` when the timeout elapses.
   *
   * This is how a pull-only protocol fakes a push. WebMCP gives a page no way
   * to notify an agent, but `execute()` is async and the host awaits it, so
   * holding the promise open until the player clicks behaves like a
   * notification from the agent's side - immediate, and one call instead of
   * one every few seconds. When it times out it degrades into exactly the
   * polling loop it replaces, so it is never worse.
   */
  awaitPlayerMessage: (timeoutMs?: number) => Promise<PlayerMessage>;
  /** Open a conversation from the AGENT's side. */
  startConversation: (line: unknown, options: unknown) => SupplyValidation;
  /** True once the player picked an option flagged `ends`. */
  isFinished: () => boolean;
}

export function createDialogueBroker(
  now: () => number = () => Date.now(),
  onSupplied: (turn: SuppliedTurn) => void = () => {},
): DialogueBroker {
  let pending: DialogueRequestContext | null = null;
  let requestedAt = 0;
  let lastPlayerChoice: string | null = null;
  let lastOptionIndex: number | null = null;
  let finished = false;
  let turnCounter = 0;
  /** Resolvers for agents currently parked in awaitPlayerMessage. */
  let waiters: Array<(message: PlayerMessage) => void> = [];

  function wake(message: PlayerMessage): void {
    const pendingWaiters = waiters;
    waiters = [];
    for (const resolve of pendingWaiters) resolve(message);
  }

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

    recordChoice(choice, optionIndex = -1, ends = false) {
      lastPlayerChoice = choice;
      lastOptionIndex = optionIndex;
      if (ends) finished = true;
      turnCounter += 1;
      // Anyone parked in a long-poll hears about it on this tick, not on
      // their next scheduled poll.
      wake({
        waiting: false,
        choice,
        optionIndex: optionIndex < 0 ? undefined : optionIndex,
        conversationEnded: ends,
        turn: turnCounter,
      });
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
      lastOptionIndex = null;
      finished = false;
      turnCounter = 0;
      // Never strand a waiter across a reset: an agent still holding a
      // promise would hang until its own host gave up.
      wake({ waiting: true, hint: "The conversation ended. Call again if you start a new one." });
    },

    isPending: () => pending !== null,
    isFinished: () => finished,

    async awaitPlayerMessage(timeoutMs = PLAYER_WAIT_TIMEOUT_MS) {
      // A conversation the player opened while nobody was listening is still
      // pending: report it immediately rather than making them wait out a
      // full poll for a request that already exists.
      if (pending !== null && lastPlayerChoice === null) {
        return {
          waiting: false,
          turn: pending.turn,
          hint:
            "The player opened a conversation and is waiting for your first line. " +
            "Answer with supply_dialogue.",
        };
      }

      // If the player already answered and the agent has not consumed it,
      // return immediately rather than making it wait for the next answer.
      if (lastPlayerChoice !== null) {
        const message: PlayerMessage = {
          waiting: false,
          choice: lastPlayerChoice,
          optionIndex: lastOptionIndex === null || lastOptionIndex < 0 ? undefined : lastOptionIndex,
          conversationEnded: finished,
          turn: turnCounter,
        };
        lastPlayerChoice = null;
        return message;
      }

      return new Promise<PlayerMessage>((resolve) => {
        let settled = false;
        const settle = (message: PlayerMessage): void => {
          if (settled) return;
          settled = true;
          waiters = waiters.filter((w) => w !== onMessage);
          resolve(message);
        };
        const onMessage = (message: PlayerMessage): void => {
          if (message.choice !== undefined) lastPlayerChoice = null;
          settle(message);
        };
        waiters.push(onMessage);
        setTimeout(
          () =>
            settle({
              waiting: true,
              hint: "No reply yet. Call this again to keep waiting - it is not an error.",
            }),
          Math.max(1000, timeoutMs),
        );
      });
    },

    startConversation(line, options) {
      const validated = validateSupply(line, options);
      if (!validated.ok) return validated;
      finished = false;
      turnCounter = 1;
      pending = null;
      lastPlayerChoice = null;
      onSupplied(validated.value);
      return validated;
    },
  };
}
