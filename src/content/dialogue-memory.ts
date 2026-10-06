import type { NpcId } from "../types";
import { NPC_IDS } from "./npc-profiles";

/**
 * A small per-NPC memory of the last conversation. This module is the RUNTIME
 * authority; the save schema v2 (D-51) persists a serialized DTO copy via
 * `serializeMemory` / `deserializeMemory` (Sets become sorted arrays at the
 * API boundary) and `hydrateMemories` restores it on load.
 */
export interface NpcMemory {
  /** Last topic the player discussed with this NPC. */
  lastTopic: string | null;
  /** How many times the player has talked to this NPC. */
  visitCount: number;
  /** IDs of dialogue nodes the player has seen. */
  seenNodes: Set<string>;
  /**
   * Stable IDs of dialogue OPTIONS the player has picked, keyed by the
   * tree id. The renderer uses this to suppress options the player has
   * already answered so NPCs do not repeat the same line on the next
   * visit (L-2026-08-30-02: "The NPC must NEVER repeat a dialogue the
   * player has already answered"). Keyed by tree id because the same
   * option-id can refer to different lines in different trees.
   */
  pickedOptions: Record<string, Set<string>>;
}

function emptyMemory(): NpcMemory {
  return {
    lastTopic: null,
    visitCount: 0,
    seenNodes: new Set<string>(),
    pickedOptions: {},
  };
}

export const NPC_MEMORY = Object.fromEntries(
  NPC_IDS.map((npcId) => [npcId, emptyMemory()]),
) as Record<NpcId, NpcMemory>;

export function getMemory(npcId: NpcId): NpcMemory {
  return NPC_MEMORY[npcId];
}

export function setMemory(npcId: NpcId, patch: Partial<NpcMemory>): NpcMemory {
  const current = NPC_MEMORY[npcId];
  // Merge sets / records immutably so callers can pass a fresh value.
  const merged: NpcMemory = {
    ...current,
    ...patch,
    seenNodes: patch.seenNodes ?? current.seenNodes,
    pickedOptions: patch.pickedOptions ?? current.pickedOptions,
  };
  NPC_MEMORY[npcId] = merged;
  return merged;
}

/** Mark a dialogue option as picked in the NPC's memory for a given tree. */
export function markOptionPicked(
  npcId: NpcId,
  treeId: string,
  optionId: string,
): void {
  const memory = NPC_MEMORY[npcId];
  const existing = memory.pickedOptions[treeId] ?? new Set<string>();
  const next = new Set(existing);
  next.add(optionId);
  setMemory(npcId, {
    pickedOptions: { ...memory.pickedOptions, [treeId]: next },
  });
}

/** Return the set of option ids already picked for this NPC + tree. */
export function pickedOptionsFor(npcId: NpcId, treeId: string): Set<string> {
  return NPC_MEMORY[npcId].pickedOptions[treeId] ?? new Set<string>();
}

// ---------------------------------------------------------------------------
// Serialization at the API boundary (save schema v2, D-51)
//
// Sets never cross the save boundary: they serialize as SORTED string arrays
// (deterministic keys, stable diffs) and deserialize back into Sets. The
// runtime API above stays untouched; these helpers are the only bridge.
// ---------------------------------------------------------------------------

/** Serialized form of `NpcMemory`: Sets become sorted string arrays. */
export interface NpcMemoryDto {
  lastTopic: string | null;
  visitCount: number;
  seenNodes: string[];
  pickedOptions: Record<string, string[]>;
}

function sortedStrings(value: Iterable<unknown>): string[] {
  return [...value]
    .filter((item): item is string => typeof item === "string")
    .sort();
}

/** Converts a runtime memory into its deterministic serialized DTO. */
export function serializeMemory(memory: NpcMemory): NpcMemoryDto {
  const pickedOptions: Record<string, string[]> = {};
  for (const [treeId, options] of Object.entries(memory.pickedOptions ?? {})) {
    if (options instanceof Set) pickedOptions[treeId] = sortedStrings(options);
  }
  return {
    lastTopic: typeof memory.lastTopic === "string" ? memory.lastTopic : null,
    visitCount:
      Number.isFinite(memory.visitCount) && memory.visitCount > 0
        ? Math.floor(memory.visitCount)
        : 0,
    seenNodes: memory.seenNodes instanceof Set ? sortedStrings(memory.seenNodes) : [],
    pickedOptions,
  };
}

/** Converts a serialized DTO back into a runtime memory (defensively). */
export function deserializeMemory(dto: NpcMemoryDto): NpcMemory {
  if (!dto || typeof dto !== "object") return emptyMemory();
  const seenNodes =
    dto.seenNodes instanceof Set
      ? new Set(sortedStrings(dto.seenNodes))
      : new Set(Array.isArray(dto.seenNodes) ? sortedStrings(dto.seenNodes) : []);
  const pickedOptions: Record<string, Set<string>> = {};
  if (dto.pickedOptions && typeof dto.pickedOptions === "object") {
    for (const [treeId, options] of Object.entries(dto.pickedOptions)) {
      if (options instanceof Set) {
        pickedOptions[treeId] = new Set(sortedStrings(options));
      } else if (Array.isArray(options)) {
        pickedOptions[treeId] = new Set(sortedStrings(options));
      }
    }
  }
  return {
    lastTopic: typeof dto.lastTopic === "string" ? dto.lastTopic : null,
    visitCount:
      typeof dto.visitCount === "number" && Number.isFinite(dto.visitCount) && dto.visitCount > 0
        ? Math.floor(dto.visitCount)
        : 0,
    seenNodes,
    pickedOptions,
  };
}

/**
 * Resets one NPC's memory (or the whole roster when no id is given) back to
 * empty. Unknown ids are ignored.
 */
export function clearMemory(npcId?: NpcId): void {
  if (npcId === undefined) {
    for (const id of NPC_IDS) NPC_MEMORY[id] = emptyMemory();
    return;
  }
  if (npcId in NPC_MEMORY) NPC_MEMORY[npcId] = emptyMemory();
}

/** Serialized empty DTO map for the full roster (used by the save schema). */
export function emptyMemoryDtos(): Record<string, NpcMemoryDto> {
  return Object.fromEntries(NPC_IDS.map((id) => [id, serializeMemory(emptyMemory())]));
}

/** Serialized DTO map of the WHOLE runtime roster (used by the save path). */
export function serializeAllMemories(): Record<string, NpcMemoryDto> {
  return Object.fromEntries(NPC_IDS.map((id) => [id, serializeMemory(NPC_MEMORY[id])]));
}

/**
 * Restores the runtime roster from a save's serialized DTO map (used on
 * load). Ids without a valid DTO reset to empty. Unknown ids in the save are
 * ignored so a stale or tampered save cannot invent roster entries.
 */
export function hydrateMemories(dtos: Record<string, NpcMemoryDto>): void {
  for (const id of NPC_IDS) {
    const dto = dtos?.[id];
    NPC_MEMORY[id] = dto ? deserializeMemory(dto) : emptyMemory();
  }
}
