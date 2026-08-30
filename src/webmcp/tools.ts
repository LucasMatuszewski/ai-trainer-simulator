import { getMemory } from "../content/dialogue-memory";
import { NPCS } from "../content/npcs";
import { game } from "../game/state";

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, {
    type: "string" | "number" | "boolean";
    description: string;
    required?: boolean;
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
    validate: (call) => requiredString(call, "npcId") ?? requiredNumber(call, "delta"),
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
      game.dispatch({ type: "advance-time" });
      return { ok: true, data: { day: game.get().day, timeOfDay: game.get().timeOfDay } };
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
