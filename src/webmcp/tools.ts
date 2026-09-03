import { PLAYER_WAIT_MAX_MS } from "./agent-dialogue";
import { getMemory, pickedOptionsFor } from "../content/dialogue-memory";
import { DIALOGUES } from "../content/dialogues";
import { NPCS } from "../content/npcs";
import { game } from "../game/state";
import type { NpcId } from "../types";
import type { DialogueController } from "../ui/dialogue";

/**
 * Player-action registry. main.ts wires these callbacks so the
 * WebMCP tools can drive the actual game UI (open a dialogue,
 * pick an option, end the day, start the minigame). The registry
 * stays null in the test environment; tools that need it return
 * a clear "not wired" error so tests do not have to mock the
 * whole game.
 */
export interface PlayerActionHooks {
  isDialogueOpen: () => boolean;
  openDialogue: (npcId: NpcId) => boolean;
  pickDialogueOption: (optionId: string) => boolean;
  closeDialogue: () => boolean;
  advanceTime: () => boolean;
  endDay: () => boolean;
  openMinigame: () => boolean;
  /** Snapshot the currently-open dialogue (text + available options). */
  getDialogueSnapshot: () => ReturnType<DialogueController["snapshot"]>;
}

/**
 * The agent companion surface (ADR 0008 D-36/D-37). Separate from
 * PlayerActionHooks because these tools drive the AGENT's own character,
 * not the human's. main.ts wires them once the office scene exists; they
 * stay null on the title screen and in tests, where the tools answer with
 * an explicit "not wired" error rather than crashing.
 */
export interface AgentCompanionHooks {
  join: (name: string, persona: string) => { ok: boolean; reason?: string; name?: string };
  leave: () => boolean;
  isActive: () => boolean;
  lookAround: () => unknown;
  step: (direction: "forward" | "back" | "left" | "right", metres: number) => {
    ok: boolean; reason?: string; movedMetres?: number; blocked?: boolean;
    position?: { x: number; z: number }; facingDegrees?: number; walkSeconds?: number;
  };
  turn: (degrees: number) => {
    ok: boolean; reason?: string; position?: { x: number; z: number }; facingDegrees?: number;
  };
  moveTo: (target: string) => { ok: boolean; reason?: string; candidates?: string[]; target?: string };
  say: (line: string) => { ok: boolean; reason?: string; spoken?: string };
  peekDialogueRequest: () => unknown;
  supplyDialogue: (line: unknown, options: unknown) => { ok: boolean; reason?: string };
  /** Async: the companion walks to the player before it speaks. */
  startConversation: (line: unknown, options: unknown) => Promise<{ ok: boolean; reason?: string }>;
  awaitPlayerMessage: (timeoutMs?: number) => Promise<unknown>;
  playAnimation: (name: string) => boolean;
  animationNames: () => readonly string[];
}

let agentCompanion: AgentCompanionHooks | null = null;

export function registerAgentCompanion(hooks: AgentCompanionHooks | null): void {
  agentCompanion = hooks;
}

function requireCompanion(): AgentCompanionHooks | { error: string } {
  if (agentCompanion === null) {
    return { error: "The office is not loaded yet - start or continue a game first." };
  }
  return agentCompanion;
}

let playerActions: PlayerActionHooks | null = null;

export function registerPlayerActions(hooks: PlayerActionHooks | null): void {
  playerActions = hooks;
}

function requireActions(): PlayerActionHooks | { error: string } {
  if (playerActions === null) {
    return { error: "Player actions are not wired in this environment (test mode)" };
  }
  return playerActions;
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, {
    type: "string" | "number" | "boolean" | "array";
    description: string;
    required?: boolean;
    /** Element type, for `type: "array"` only. Agents need this to build
     *  a valid call; without it the array is untyped and they guess. */
    items?: "string";
    /**
     * A REAL value an agent could send, surfaced in the JSON Schema as
     * `examples`. Without it, tool inspectors render a placeholder like
     * "example_string" and an agent has to guess the shape from prose
     * (Lucas, 2026-09-03: "the examples should be self descriptive").
     */
    example?: unknown;
  }>;
}

export interface ToolCall {
  name: string;
  parameters: Record<string, unknown>;
}

export type ToolResult =
  | { ok: true; data: unknown }
  | { ok: false; error: string };

interface ToolImplementation {
  definition: ToolDefinition;
  validate: (call: ToolCall) => string | null;
  /**
   * May return a promise. `wait_for_player_message` needs it: it holds the
   * call open until the human answers, which is the only way to imitate a
   * push over a protocol that only lets the agent call us.
   */
  execute: (call: ToolCall) => ToolResult | Promise<ToolResult>;
}

function validateNoParameters(call: ToolCall): string | null {
  return Object.keys(call.parameters).length === 0
    ? null
    : "tool does not accept parameters";
}

function requiredString(call: ToolCall, name: string): string | null {
  const value = call.parameters[name];
  if (typeof value !== "string" || value.trim().length === 0) {
    return `${name} must be a non-empty string`;
  }
  return null;
}

function requiredNumber(call: ToolCall, name: string): string | null {
  const value = call.parameters[name];
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return `${name} must be a finite number`;
  }
  return null;
}

function jsonSnapshot(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value)) as unknown;
}

type StepDirection = "forward" | "back" | "left" | "right";
const STEP_DIRECTIONS: readonly StepDirection[] = ["forward", "back", "left", "right"];
const MAX_STEP_METRES = 3;

/**
 * The protocol, in plain language (L-2026-09-03-04). Tool descriptions are
 * too small to carry a multi-step loop, and an agent left to infer the
 * conversation handshake from them gets it wrong - so this is a skill-style
 * briefing the agent can ask for.
 */
const AGENT_INSTRUCTIONS = [
  "You are a PLAYER in this office game, not an administrator. You control one character.",
  "You cannot give yourself money or reputation, set game flags, teleport, move the human's",
  "camera, or answer the human's dialogue for them. Those tools do not exist on purpose.",
  "",
  "GETTING IN",
  "1. agent_join({name, persona}) - spawns your robot character. Do this first.",
  "2. agent_look_around({}) - who is nearby, and the exact names you may walk to.",
  "",
  "MOVING",
  "- agent_move_to({target}) walks you to a person or room BY NAME, pathing around furniture.",
  "  Never send coordinates; they are not accepted. A wrong name returns every valid one.",
  "- agent_step({direction, metres}) and agent_turn({degrees}) are the raw controls, the",
  "  equivalent of W/A/S/D and the mouse. Use them for fine positioning only.",
  "- agent_say({line}) puts a speech bubble over your head that the human can read.",
  "",
  "- agent_play_animation({name}) plays a gesture: wave, facepalm, coffee-sip, fist-pump,",
  "  shrug, stretch, nod. Gestures layer over walking, so you can wave while crossing a room.",
  "",
  "CONVERSATIONS - BOTH DIRECTIONS",
  "The human can start one by walking up and clicking you. You can start one with",
  "start_conversation({line, options}) - your character WALKS OVER to them first, so they see",
  "you coming; the call returns once you have arrived and spoken.",
  "",
  "Either way the loop is the same:",
  "1. wait_for_player_message({}) BLOCKS until the human answers, then returns their choice.",
  "2. supply_dialogue({line, options}) writes your next line and the 1-4 replies the human",
  "   chooses between. Write the options in the HUMAN\u0027s voice, not yours.",
  "3. Repeat. Mark one option with ends:true when the conversation should finish.",
  "",
  "STAYING REACHABLE - READ THIS",
  "wait_for_player_message covers ONE window (25s by default, up to 120 via timeout_seconds).",
  "It is not a subscription. To stay reachable, CALL IT AGAIN every time it returns",
  "{waiting: true} - that is a normal empty result, not an error. Looping it is how you",
  "notice the human walking up to you five minutes from now.",
  "",
  "If you do stop waiting, nothing is lost. A human who starts a conversation while you are",
  "not listening has their request QUEUED, and your next wait_for_player_message returns it",
  "straight away. They just see your character thinking for longer. So: loop if you can, and",
  "check back whenever you can if you cannot.",
  "",
  "You are writing this character. The game's author wrote none of your lines. Stay in the",
  "persona you gave at join time, keep lines short, and remember what the human already said -",
  "each request tells you their previous choice.",
].join("\n");

const implementations: ToolImplementation[] = [
  {
    definition: {
      name: "get_state",
      description: "Return a read-only snapshot of the complete game state. Takes no arguments; call with {}.",
      parameters: {},
    },
    validate: validateNoParameters,
    execute: () => ({ ok: true, data: jsonSnapshot(game.get()) }),
  },
  {
    definition: {
      name: "list_npcs",
      description: "List every NPC with identity, position, and conversation memory. Takes no arguments; call with {}.",
      parameters: {},
    },
    validate: validateNoParameters,
    execute: () => ({
      ok: true,
      data: NPCS.map((npc) => {
        const memory = getMemory(npc.id);
        return {
          id: npc.id,
          name: npc.name,
          role: npc.role,
          position: { ...npc.position },
          gender: npc.gender,
          ...(memory.lastTopic === null ? {} : { lastTopic: memory.lastTopic }),
          visitCount: memory.visitCount,
        };
      }),
    }),
  },
  {
    definition: {
      name: "get_npc",
      description: "Return the full record for one NPC.",
      parameters: {
        id: {
          type: "string",
          description: "The NPC identifier.",
          example: "bartek",
          required: true,
        },
      },
    },
    validate: (call) => requiredString(call, "id"),
    execute: (call) => {
      const npc = NPCS.find((candidate) => candidate.id === call.parameters.id);
      return npc
        ? { ok: true, data: jsonSnapshot(npc) }
        : { ok: false, error: "npc not found" };
    },
  },
  {
    definition: {
      name: "advance_time",
      description: "Advance the simulation to the next time period.",
      parameters: {},
    },
    validate: validateNoParameters,
    execute: () => {
      const actions = requireActions();
      if ("error" in actions) return { ok: false, error: actions.error };
      if (!actions.advanceTime()) return { ok: false, error: "time could not be advanced" };
      return { ok: true, data: { day: game.get().day, timeOfDay: game.get().timeOfDay } };
    },
  },
  {
    // L-2026-08-30-01: WebMCP is a PLAYER surface. Add tools an agent
    // can use to actually play the game: see what an NPC will say
    // and which options are still available, without admin actions
    // like set_flag / add_relationship (which remain in the test
    // suite but are NOT exposed to the player).
    definition: {
      name: "get_dialogue",
      description: "Return the current greeting node for an NPC plus the dialogue options the player has not yet answered.",
      parameters: {
        npcId: {
          type: "string",
          description: "The NPC identifier.",
          example: "bartek",
          required: true,
        },
      },
    },
    validate: (call) => {
      const idError = requiredString(call, "npcId");
      if (idError) return idError;
      if (!NPCS.some((n) => n.id === (call.parameters.npcId as string))) {
        return "npc not found";
      }
      return null;
    },
    execute: (call) => {
      const npcId = call.parameters.npcId as NpcId;
      const npc = NPCS.find((n) => n.id === npcId)!;
      const trees = DIALOGUES[npcId];
      if (!trees) return { ok: false, error: "no dialogues for this npc" };
      // Pick the first matching tree for the current state. Mirrors
      // main.ts' tree selection so an agent that calls get_dialogue
      // before talking to the NPC sees exactly what the player will
      // see when they click the NPC's card.
      const state = game.get();
      let treeKey: string = "default";
      if (npc.id === "bartek") {
        if (state.flags["got-acme-contract"] && state.flags["bartek-advanced-contract"]) treeKey = "afterContract";
        else if (state.flags["got-acme-contract"]) treeKey = "after-tutorial";
      }
      // The "more" / "after-*" trees added by GLM 5.3 (Phase 7) are
      // picked by the per-NPC `available` predicate; the default
      // tree is the fallback.
      const matched = Object.entries(trees).find(([key, tree]) => {
        if (key === treeKey) return true;
        return tree.available?.(state) ?? false;
      });
      const activeTreeKey = matched?.[0] ?? treeKey;
      const tree = trees[activeTreeKey] ?? trees[treeKey] ?? Object.values(trees)[0];
      if (!tree) return { ok: false, error: "no dialogue tree" };
      const greeting = tree.nodes["greeting"];
      if (!greeting) return { ok: false, error: "no greeting node" };
      const picked = pickedOptionsFor(npcId, activeTreeKey);
      const options = (greeting.options ?? [])
        .filter((o) => !picked.has(o.id ?? o.nextNodeId))
        .map((o) => ({
          id: o.id ?? o.nextNodeId,
          text: o.text,
          nextNodeId: o.nextNodeId,
        }));
      return {
        ok: true,
        data: {
          npcId: npc.id,
          npcName: npc.name,
          treeId: activeTreeKey,
          nodeId: greeting.id,
          text: greeting.text,
          availableOptions: options,
        },
      };
    },
  },
  {
    // L-2026-08-30-01: actually open a dialogue with an NPC. The
    // player-action registry must be wired (main.ts does this at
    // startup); in test mode this returns a clear "not wired" error.
    definition: {
      name: "talk_to_npc",
      description: "Open a dialogue with an NPC. Equivalent to clicking the NPC's roster card.",
      parameters: {
        npcId: {
          type: "string",
          description: "The NPC identifier.",
          example: "bartek",
          required: true,
        },
      },
    },
    validate: (call) => {
      const idError = requiredString(call, "npcId");
      if (idError) return idError;
      if (!NPCS.some((n) => n.id === (call.parameters.npcId as string))) {
        return "npc not found";
      }
      return null;
    },
    execute: (call) => {
      const actions = requireActions();
      if ("error" in actions) return { ok: false, error: actions.error };
      const ok = actions.openDialogue(call.parameters.npcId as NpcId);
      if (!ok) return { ok: false, error: "could not open dialogue" };
      return { ok: true, data: actions.getDialogueSnapshot() };
    },
  },
  {
    definition: {
      name: "pick_dialogue_option",
      description: "Pick a dialogue option by id (the id you got from get_dialogue / talk_to_npc).",
      parameters: {
        optionId: {
          type: "string",
          description: "The option id returned by get_dialogue or talk_to_npc.",
          required: true,
          example: "opt-1",
        },
      },
    },
    validate: (call) => requiredString(call, "optionId"),
    execute: (call) => {
      const actions = requireActions();
      if ("error" in actions) return { ok: false, error: actions.error };
      const ok = actions.pickDialogueOption(call.parameters.optionId as string);
      if (!ok) return { ok: false, error: "option not available" };
      return { ok: true, data: actions.getDialogueSnapshot() };
    },
  },
  {
    definition: {
      name: "close_dialogue",
      description: "Close the currently-open dialogue (if any).",
      parameters: {},
    },
    validate: validateNoParameters,
    execute: () => {
      const actions = requireActions();
      if ("error" in actions) return { ok: false, error: actions.error };
      return { ok: true, data: { closed: actions.closeDialogue() } };
    },
  },
  {
    definition: {
      name: "end_day",
      description: "End the current in-game day. Triggers the daily-tick economy and the next morning's events.",
      parameters: {},
    },
    validate: validateNoParameters,
    execute: () => {
      const actions = requireActions();
      if ("error" in actions) return { ok: false, error: actions.error };
      return { ok: true, data: { ended: actions.endDay() } };
    },
  },
  {
    definition: {
      name: "open_minigame",
      description: "Open the debug minigame (must have the 'got-acme-contract' flag set first).",
      parameters: {},
    },
    validate: validateNoParameters,
    execute: () => {
      const actions = requireActions();
      if ("error" in actions) return { ok: false, error: actions.error };
      return { ok: true, data: { opened: actions.openMinigame() } };
    },
  },

  // -------------------------------------------------------------
  // Agent companion (ADR 0008). These are the tools that make this a
  // WebMCP entry rather than a remote control: the agent gets its own
  // BODY in the world and authors its own character's dialogue. It gets
  // no capability the human lacks - no cash, no flags, no teleport
  // (D-40).
  // -------------------------------------------------------------
  {
    definition: {
      name: "agent_join",
      description:
        "Join the office as an AI coworker. Spawns a visible robot character the human " +
        "player can see, walk up to, and talk to. Call this once before any other agent_* tool.",
      parameters: {
        name: {
          type: "string",
          description: "Display name for your character.",
          example: "Rusty",
          required: true,
        },
        persona: {
          type: "string",
          description:
            "How your character behaves, in a sentence. You will write this character's " +
            "dialogue later, so pick something you can play consistently.",
          example: "A sarcastic QA engineer who blames every bug on the intern.",
          required: true,
        },
      },
    },
    validate: (call) => requiredString(call, "name") ?? requiredString(call, "persona"),
    execute: (call) => {
      const companion = requireCompanion();
      if ("error" in companion) return { ok: false, error: companion.error };
      const result = companion.join(
        String(call.parameters.name),
        String(call.parameters.persona),
      );
      if (!result.ok) return { ok: false, error: result.reason ?? "could not join" };
      return {
        ok: true,
        data: {
          joined: true,
          name: result.name,
          hint: "Use agent_look_around to see who is here, then agent_move_to and agent_say.",
        },
      };
    },
  },
  {
    definition: {
      name: "agent_leave",
      description: "Remove your robot character from the office and free the companion seat. Takes no arguments; call with {}.",
      parameters: {},
    },
    validate: validateNoParameters,
    execute: () => {
      const companion = requireCompanion();
      if ("error" in companion) return { ok: false, error: companion.error };
      return { ok: true, data: { left: companion.leave() } };
    },
  },
  {
    definition: {
      name: "agent_look_around",
      description:
        "See the office from your character's position: who is nearby, their roles, and the " +
        "exact list of every person and room you can walk to by name. Call this before " +
        "agent_move_to. Takes no arguments; call with {}.",
      parameters: {},
    },
    validate: validateNoParameters,
    execute: () => {
      const companion = requireCompanion();
      if ("error" in companion) return { ok: false, error: companion.error };
      if (!companion.isActive()) return { ok: false, error: "call agent_join first" };
      return { ok: true, data: jsonSnapshot(companion.lookAround()) };
    },
  },
  {
    definition: {
      name: "agent_move_to",
      description:
        "Walk your character to a person or a room, addressed by name (not coordinates). " +
        "If the name is unknown the error lists every valid target.",
      parameters: {
        target: {
          type: "string",
          description:
            "The NAME of a person or room to walk to - never coordinates. Coordinates are " +
            "deliberately not accepted: you have not seen the floor plan, and a raw position " +
            "could put your character inside a desk. Call agent_look_around for the exact list " +
            "of valid names; a wrong name comes back with all of them.",
          example: "bartek",
          required: true,
        },
      },
    },
    validate: (call) => requiredString(call, "target"),
    execute: (call) => {
      const companion = requireCompanion();
      if ("error" in companion) return { ok: false, error: companion.error };
      if (!companion.isActive()) return { ok: false, error: "call agent_join first" };
      const result = companion.moveTo(String(call.parameters.target));
      if (!result.ok) {
        const list = result.candidates ? ` Valid targets: ${result.candidates.join(", ")}` : "";
        return { ok: false, error: `${result.reason ?? "could not move"}.${list}` };
      }
      return { ok: true, data: { walkingTo: result.target } };
    },
  },
  {
    definition: {
      name: "agent_say",
      description:
        "Make your character say one line out loud, shown as a speech bubble above its head " +
        "that the human player can read.",
      parameters: {
        line: {
          type: "string",
          description: "What your character says out loud. One short line - it renders as a speech bubble.",
          example: "Morning. Who broke the build?",
          required: true,
        },
      },
    },
    validate: (call) => requiredString(call, "line"),
    execute: (call) => {
      const companion = requireCompanion();
      if ("error" in companion) return { ok: false, error: companion.error };
      const result = companion.say(String(call.parameters.line));
      if (!result.ok) return { ok: false, error: result.reason ?? "could not speak" };
      return { ok: true, data: { said: result.spoken } };
    },
  },
  {
    definition: {
      name: "get_pending_dialogue_request",
      description:
        "Check whether the human player has started a conversation with your character and is " +
        "waiting for you to write its next line. Returns null when nobody is talking to you. " +
        "Poll this after agent_join; when it returns a request, answer with supply_dialogue.",
      parameters: {},
    },
    validate: validateNoParameters,
    execute: () => {
      const companion = requireCompanion();
      if ("error" in companion) return { ok: false, error: companion.error };
      return { ok: true, data: jsonSnapshot(companion.peekDialogueRequest()) };
    },
  },
  {
    definition: {
      name: "supply_dialogue",
      description:
        "Write your character's next spoken line and the 2-4 replies the human player will " +
        "choose between. This is YOUR character speaking in the game's own dialogue window - " +
        "the game's author never wrote these words. Answer a request from " +
        "get_pending_dialogue_request.",
      parameters: {
        line: {
          type: "string",
          description: "What your character says on this turn. One or two sentences.",
          example: "You must be the new trainer. I do QA, which mostly means I find out what Tomek did.",
          required: true,
        },
        options: {
          type: "array",
          items: "string",
          description: "2-4 replies the human can pick from. Write them in the human's voice, not yours.",
          example: ["What did Tomek do?", "Nice to meet you.", "Are you... a robot?"],
          required: true,
        },
      },
    },
    validate: (call) => {
      const lineError = requiredString(call, "line");
      if (lineError) return lineError;
      return Array.isArray(call.parameters.options) ? null : "options must be an array of 2-4 strings";
    },
    execute: (call) => {
      const companion = requireCompanion();
      if ("error" in companion) return { ok: false, error: companion.error };
      const result = companion.supplyDialogue(call.parameters.line, call.parameters.options);
      if (!result.ok) return { ok: false, error: result.reason ?? "could not supply dialogue" };
      return { ok: true, data: { delivered: true } };
    },
  },
  {
    definition: {
      name: "agent_step",
      description:
        "Walk your character a short distance in one direction, like tapping W/A/S/D. The " +
        "step is ANIMATED at normal walking speed and the result says how long it takes, so " +
        "the human sees the movement. " +
        "Directions are relative to the way your character is currently facing. Use this for " +
        "fine positioning - to cross the office, use agent_move_to, which paths around " +
        "furniture instead of bumping into it. Walls and desks still block you; the result " +
        "reports how far you actually got.",
      parameters: {
        direction: {
          type: "string",
          description: "One of: forward, back, left, right. Relative to your current facing.",
          example: "forward",
          required: true,
        },
        metres: {
          type: "number",
          description: `How far to step, in metres. Clamped to ${MAX_STEP_METRES}.`,
          example: 1,
          required: true,
        },
      },
    },
    validate: (call) => {
      const directionError = requiredString(call, "direction");
      if (directionError) return directionError;
      if (!STEP_DIRECTIONS.includes(String(call.parameters.direction) as StepDirection)) {
        return `direction must be one of: ${STEP_DIRECTIONS.join(", ")}`;
      }
      return requiredNumber(call, "metres");
    },
    execute: (call) => {
      const companion = requireCompanion();
      if ("error" in companion) return { ok: false, error: companion.error };
      const result = companion.step(
        String(call.parameters.direction) as StepDirection,
        Number(call.parameters.metres),
      );
      if (!result.ok) return { ok: false, error: result.reason ?? "could not step" };
      return {
        ok: true,
        data: {
          movedMetres: result.movedMetres,
          // The step is WALKED, not teleported - this is how long it takes.
          walkSeconds: result.walkSeconds,
          blocked: result.blocked,
          position: result.position,
          facingDegrees: result.facingDegrees,
          ...(result.blocked === true
            ? { hint: "Something is in the way. Turn, or use agent_move_to to path around it." }
            : {}),
        },
      };
    },
  },
  {
    definition: {
      name: "agent_turn",
      description:
        "Rotate your character in place, like moving the mouse. Positive degrees turn right, " +
        "negative turn left. This changes what 'forward' means for agent_step.",
      parameters: {
        degrees: {
          type: "number",
          description: "How far to turn. Positive is right (clockwise), negative is left.",
          example: 90,
          required: true,
        },
      },
    },
    validate: (call) => requiredNumber(call, "degrees"),
    execute: (call) => {
      const companion = requireCompanion();
      if ("error" in companion) return { ok: false, error: companion.error };
      const result = companion.turn(Number(call.parameters.degrees));
      if (!result.ok) return { ok: false, error: result.reason ?? "could not turn" };
      return { ok: true, data: { facingDegrees: result.facingDegrees, position: result.position } };
    },
  },
  {
    definition: {
      name: "get_instructions",
      description:
        "READ THIS FIRST. Explains how to play this game as a character: how to join, how to " +
        "move, and how conversations with the human player work in both directions. " +
        "Takes no arguments; call with {}.",
      parameters: {},
    },
    validate: validateNoParameters,
    execute: () => ({ ok: true, data: { instructions: AGENT_INSTRUCTIONS } }),
  },
  {
    definition: {
      name: "start_conversation",
      description:
        "START a conversation with the human player: your character speaks and the dialogue " +
        "window opens on their screen. Use this to approach them rather than waiting to be " +
        "clicked. Then call wait_for_player_message to hear their reply.",
      parameters: {
        line: {
          type: "string",
          description: "Your character's opening line.",
          example: "Hey - you're the new trainer, right? I have a bug with your name on it.",
          required: true,
        },
        options: {
          type: "array",
          items: "string",
          description:
            "1-4 replies for the human, written in THEIR voice. Either plain strings, or " +
            "{text, ends} objects - ends:true marks the reply that finishes the conversation, " +
            "so you can write the goodbye instead of leaving them a bare Close button.",
          example: ["What bug?", "Not now, I'm busy.", "Who are you?"],
          required: true,
        },
      },
    },
    validate: (call) => {
      const lineError = requiredString(call, "line");
      if (lineError) return lineError;
      return Array.isArray(call.parameters.options) ? null : "options must be an array of 1-4 replies";
    },
    execute: async (call) => {
      const companion = requireCompanion();
      if ("error" in companion) return { ok: false, error: companion.error };
      if (!companion.isActive()) return { ok: false, error: "call agent_join first" };
      // Resolves after the walk, so the agent's own call reflects the fact
      // that its character physically crossed the room to speak.
      const result = await companion.startConversation(call.parameters.line, call.parameters.options);
      if (!result.ok) return { ok: false, error: result.reason ?? "could not start the conversation" };
      return {
        ok: true,
        data: {
          started: true,
          walkedToPlayer: true,
          next: "Call wait_for_player_message to hear their reply.",
        },
      };
    },
  },
  {
    definition: {
      name: "wait_for_player_message",
      description:
        "WAIT until the human player replies, then return what they chose. This BLOCKS - it " +
        "does not return immediately, and that is deliberate: it is how you find out about a " +
        "reply the moment it happens instead of polling. If it returns {waiting: true} nothing " +
        "was said in time; that is not an error, CALL IT AGAIN. Re-arming it in a loop is how " +
        "you stay reachable: each call only covers its own window, and a player who starts " +
        "talking while you are not waiting has their request QUEUED, so the next call returns " +
        "it immediately. Nothing is ever lost - the robot just looks like it is thinking for " +
        "longer.",
      parameters: {
        timeout_seconds: {
          type: "number",
          description:
            "How long to wait before returning 'nothing yet' (default 25, max 120). Use a " +
            "longer wait if your host tolerates long tool calls - it covers more time per call.",
          example: 25,
        },
      },
    },
    validate: (call) => {
      if (call.parameters.timeout_seconds === undefined) return null;
      return requiredNumber(call, "timeout_seconds");
    },
    execute: async (call) => {
      const companion = requireCompanion();
      if ("error" in companion) return { ok: false, error: companion.error };
      const requested = call.parameters.timeout_seconds;
      const timeoutMs =
        typeof requested === "number" && Number.isFinite(requested)
          ? Math.min(Math.max(requested, 1) * 1000, PLAYER_WAIT_MAX_MS)
          : undefined;
      return { ok: true, data: jsonSnapshot(await companion.awaitPlayerMessage(timeoutMs)) };
    },
  },
  {
    definition: {
      name: "agent_play_animation",
      description:
        "Play a gesture on your character - the same body language the human coworkers use. " +
        "Gestures layer over walking, so you can wave while crossing the room.",
      parameters: {
        name: {
          type: "string",
          description: "One of: wave, facepalm, coffee-sip, fist-pump, shrug, stretch, nod.",
          example: "wave",
          required: true,
        },
      },
    },
    validate: (call) => requiredString(call, "name"),
    execute: (call) => {
      const companion = requireCompanion();
      if ("error" in companion) return { ok: false, error: companion.error };
      if (!companion.isActive()) return { ok: false, error: "call agent_join first" };
      const name = String(call.parameters.name);
      if (!companion.playAnimation(name)) {
        return {
          ok: false,
          error: `unknown animation "${name}". Valid: ${companion.animationNames().join(", ")}`,
        };
      }
      return { ok: true, data: { playing: name } };
    },
  },
];

export const TOOLS: ToolDefinition[] = implementations.map(({ definition }) => definition);

/**
 * Always async, even though most tools answer synchronously.
 *
 * One tool - wait_for_player_message - holds its call open until the human
 * replies, which is the only way to imitate a push over a protocol where the
 * agent is the only one who can initiate. A union return type would push that
 * asymmetry onto every caller, so the whole surface is a promise instead.
 */
export async function callTool(call: ToolCall): Promise<ToolResult> {
  const implementation = implementations.find(({ definition }) => definition.name === call.name);
  if (!implementation) return { ok: false, error: "unknown tool" };

  const validationError = implementation.validate(call);
  if (validationError) return { ok: false, error: validationError };

  return implementation.execute(call);
}
