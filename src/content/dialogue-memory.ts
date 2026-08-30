import type { NpcId } from "../types";

/** A small per-NPC memory of the last conversation. */
export interface NpcMemory {
  /** Last topic the player discussed with this NPC. */
  lastTopic: string | null;
  /** How many times the player has talked to this NPC. */
  visitCount: number;
  /** IDs of dialogue nodes the player has seen. */
  seenNodes: Set<string>;
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
];

function emptyMemory(): NpcMemory {
  return { lastTopic: null, visitCount: 0, seenNodes: new Set<string>() };
}

export const NPC_MEMORY = Object.fromEntries(
  NPC_IDS.map((npcId) => [npcId, emptyMemory()]),
) as Record<NpcId, NpcMemory>;

export function getMemory(npcId: NpcId): NpcMemory {
  return NPC_MEMORY[npcId];
}

export function setMemory(npcId: NpcId, patch: Partial<NpcMemory>): NpcMemory {
  const current = NPC_MEMORY[npcId];
  const updated = { ...current, ...patch };
  NPC_MEMORY[npcId] = updated;
  return updated;
}
