import type { NpcId } from "../types";

/** A small per-NPC memory of the last conversation. */
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

const NPC_IDS: NpcId[] = [
  "bartek",
  "klaudia",
  "marek",
  "zosia",
  "pawel",
  "kasia",
  "tomek",
  "ania",
  "janusz",
  "burek",
  "grazyna",
  "maciek",
  "przemek",
  "dawid",
];

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
