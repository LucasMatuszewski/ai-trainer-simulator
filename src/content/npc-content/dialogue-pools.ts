/**
 * WS3 dialogue v2 pool registration index (C-77).
 *
 * One import of this module activates the authored v2 pools for bartek,
 * renata, klaudia and marek via the WS0 npc-content registry. NPCs without
 * pools keep their legacy trees (grazyna, maciek, ...); the generic pool is
 * the fallback any v2 conversation pivots onto when every authored thread
 * is exhausted. Registration is idempotent.
 */

import type { NpcId } from "../../types";
import {
  V2_MEMORY_TREE_ID,
  type DialogueTurnMemory,
  type NpcDialoguePool,
} from "../dialogue-schema";
import { pickedOptionsFor } from "../dialogue-memory";
import { NPC_CONTENT, registerNpcContent } from "./registry";
import { BARTEK_DIALOGUE_POOL } from "./dialogue-pool-bartek";
import { RENATA_DIALOGUE_POOL } from "./dialogue-pool-renata";
import { KLAUDIA_DIALOGUE_POOL } from "./dialogue-pool-klaudia";
import { MAREK_DIALOGUE_POOL } from "./dialogue-pool-marek";

export { GENERIC_DIALOGUE_POOL } from "./dialogue-pool-generic";

let registered = false;

/** Registers every authored v2 pool into the WS0 registry. Idempotent. */
export function registerNpcDialoguePools(): void {
  if (registered) return;
  registered = true;
  registerNpcContent("bartek", { dialoguePool: BARTEK_DIALOGUE_POOL });
  registerNpcContent("renata", { dialoguePool: RENATA_DIALOGUE_POOL });
  registerNpcContent("klaudia", { dialoguePool: KLAUDIA_DIALOGUE_POOL });
  registerNpcContent("marek", { dialoguePool: MAREK_DIALOGUE_POOL });
}

/** True when this NPC has an authored v2 pool (v2 conversations allowed). */
export function hasDialoguePool(npcId: string): boolean {
  return NPC_CONTENT[npcId as NpcId]?.dialoguePool !== undefined;
}

/** The authored v2 pool for an NPC, or undefined when it has none. */
export function dialoguePoolFor(npcId: string): NpcDialoguePool | undefined {
  return NPC_CONTENT[npcId as NpcId]?.dialoguePool;
}

/**
 * Assembles the v2 turn-builder memory for an NPC from the persistent
 * per-NPC option memory (L-2026-08-30-02: an option the player has already
 * answered never comes back). Reply usage is session-scoped and is tracked
 * by the conversation session, not persisted.
 */
export function v2MemoryFor(npcId: NpcId): DialogueTurnMemory {
  const picked = pickedOptionsFor(npcId, V2_MEMORY_TREE_ID);
  return {
    usedOptionIds: new Set(picked),
    usedReplyIds: new Set<string>(),
  };
}
