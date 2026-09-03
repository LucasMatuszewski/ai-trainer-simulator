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
  moveTo: (target: string) => { ok: boolean; reason?: string; candidates?: string[]; target?: string };
  say: (line: string) => { ok: boolean; reason?: string; spoken?: string };
  peekDialogueRequest: () => unknown;
  supplyDialogue: (line: unknown, options: unknown) => { ok: boolean; reason?: string };
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
  execute: (call: ToolCall) => ToolResult;
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

const implementations: ToolImplementation[] = [
  {
    definition: {
      name: "get_state",
      description: "Return a read-only snapshot of the complete game state.",
      parameters: {},
    },
    validate: validateNoParameters,
    execute: () => ({ ok: true, data: jsonSnapshot(game.get()) }),
  },
  {
    definition: {
      name: "list_npcs",
      description: "List every NPC with identity, position, and conversation memory.",
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
          description: "The NPC identifier, such as bartek.",
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
      name: "set_flag",
      description: "Set a named game flag to a boolean or numeric value.",
      parameters: {
        name: {
          type: "string",
          description: "The flag name.",
          required: true,
        },
        value: {
          type: "boolean",
          description: "The boolean or numeric value to store.",
          required: true,
        },
      },
    },
    validate: (call) => {
      const nameError = requiredString(call, "name");
      if (nameError) return nameError;
      const value = call.parameters.value;
      if (typeof value === "boolean") return null;
      return typeof value === "number" && Number.isFinite(value)
        ? null
        : "value must be a boolean or finite number";
    },
    execute: (call) => {
      const name = call.parameters.name as string;
      const value = call.parameters.value as boolean | number;
      // The existing reducer supports this JSON-safe value at runtime, while its
      // legacy Action type only advertises booleans. Keep the bridge local until
      // the save schema is deliberately widened in a separate migration.
      game.dispatch({ type: "set-flag", flag: name, value: value as boolean });
      return { ok: true, data: { name, value } };
    },
  },
  {
    definition: {
      name: "add_relationship",
      description: "Adjust an NPC relationship score by a signed amount.",
      parameters: {
        npcId: {
          type: "string",
          description: "The NPC identifier.",
          required: true,
        },
        delta: {
          type: "number",
          description: "The signed relationship adjustment.",
          required: true,
        },
      },
    },
    validate: (call) => {
      const npcIdError = requiredString(call, "npcId");
      if (npcIdError) return npcIdError;
      if (!NPCS.some((npc) => npc.id === call.parameters.npcId)) return "npc not found";
      return requiredNumber(call, "delta");
    },
    execute: (call) => {
      const npcId = call.parameters.npcId as string;
      const delta = call.parameters.delta as number;
      game.dispatch({ type: "add-relationship", npcId, delta });
      return { ok: true, data: { npcId, relationship: game.get().npcRelationships[npcId] } };
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
          description: "The NPC identifier (e.g. bartek, klaudia).",
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
          description: "The NPC identifier (e.g. bartek, klaudia).",
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
        name: { type: "string", description: "Display name for your character, e.g. 'Rusty'", required: true },
        persona: {
          type: "string",
          description:
            "How your character behaves, in a sentence. You will write this character's " +
            "dialogue later, so pick something you can play consistently.",
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
      description: "Remove your robot character from the office and free the companion seat.",
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
        "See the office from your character's position: who is nearby, their roles, and " +
        "every person and room you can walk to by name.",
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
          description: "A person id/name ('bartek', 'Renata') or a room ('kitchen', 'CEO Office')",
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
        line: { type: "string", description: "What your character says. One short line.", required: true },
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
          required: true,
        },
        options: {
          type: "array",
          items: "string",
          description: "2-4 replies the human can pick from. Write them in the human's voice.",
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
];

export const TOOLS: ToolDefinition[] = implementations.map(({ definition }) => definition);

export function callTool(call: ToolCall): ToolResult {
  const implementation = implementations.find(({ definition }) => definition.name === call.name);
  if (!implementation) return { ok: false, error: "unknown tool" };

  const validationError = implementation.validate(call);
  if (validationError) return { ok: false, error: validationError };

  return implementation.execute(call);
}
