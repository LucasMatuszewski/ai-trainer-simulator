/**
 * Save migration chain (ADR-0009 D-51, WS2).
 *
 * `migrate(raw)` upgrades ANY known save version to the current schema and
 * NEVER throws: a malformed or future-version save falls back to a fresh v2
 * game instead of silently wiping a readable one, and a readable save keeps
 * every field it owns.
 *
 * Chain: v1 -> v2. Later versions APPEND a step; the loader never resets a
 * v2 save.
 *
 * v2 adds:
 * - `social` — the NPC<->NPC relationship matrix (105 pairs, archetype
 *   seeded — player<->NPC values stay in `npcRelationships`, one authority
 *   per pair), per-NPC mood and the profilesVersion marker.
 * - `npcMemory` — the dialogue memory, serialized at the API boundary (Sets
 *   as sorted arrays; see `dialogue-memory.ts`).
 * - `worldDiary` — a capped ring of notable events (newest last).
 * - `equipment` — persistent fault states ("ok" | "faulted").
 * - `missionCompletions` — completion/reward markers (prevents duplicate
 *   payouts after reload; in-flight mission progress does NOT persist).
 *
 * Rules implemented here:
 * - Seed only MISSING pairs from the archetype seeds; existing values are
 *   never re-seeded (lazy fill on load).
 * - On a `profilesVersion` bump, re-seed ONLY pairs never touched by a delta
 *   (touched pairs are listed in `social.touched`).
 * - `writeV1Backup` keeps the untouched v1 blob under
 *   `aitrainer:save:v1:backup` before the first v2 save overwrites it. The
 *   store's save path calls this; the backup deliberately survives resets.
 */

import type { GameState, NpcId } from "../types";
import {
  emptyMemoryDtos,
  serializeMemory,
  deserializeMemory,
  type NpcMemoryDto,
} from "../content/dialogue-memory";
import {
  ALL_PAIR_KEYS,
  ARCHETYPE_SEEDS,
  NPC_IDS as MEMORY_ROSTER,
  SOCIAL_PROFILES_VERSION,
  defaultMoods,
} from "../content/npc-profiles";
import {
  seedMissingPairs,
  type Mood,
  type RelationshipMatrix,
  type SocialState,
} from "./social";
import { initialGameState } from "./initial";

/** The schema version this module migrates TO. */
export const SAVE_VERSION_V2 = 2;

/** localStorage key holding the untouched v1 blob after the first v2 write. */
export const V1_BACKUP_KEY = "aitrainer:save:v1:backup";

/** Maximum world-diary entries kept in a save (ring buffer, newest last). */
export const WORLD_DIARY_LIMIT = 30;

export type EquipmentState = "ok" | "faulted";

/**
 * The v2 GameState. A structural local definition so the pure migration core
 * compiles against the CURRENT shared types; the orchestrator's types.ts
 * patch makes `GameState` itself carry these fields (identical shapes), after
 * which GameStateV2 is directly assignable to GameState and the store can
 * return `migrate(...)` from `load()` without a cast.
 */
export type GameStateV2 = Omit<GameState, "saveVersion"> & {
  saveVersion: 2;
  social: SocialState;
  npcMemory: Record<string, NpcMemoryDto>;
  worldDiary: string[];
  equipment: Record<string, EquipmentState>;
  missionCompletions: string[];
};

const TIME_IDS = ["morning", "lunch", "afternoon", "evening"] as const;
const SPECIALIZATIONS = ["frontend", "backend", "devops", "ai", "generalist"] as const;
const TRAITS = ["coffee-fueled", "linkedin-influencer", "debugger", "wing-it"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function finiteOr(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function sanitizeRecordNumbers(value: unknown, min: number, max: number): Record<string, number> {
  const out: Record<string, number> = {};
  if (!isRecord(value)) return out;
  for (const [key, raw] of Object.entries(value)) {
    const num = finiteOr(raw, Number.NaN);
    if (Number.isNaN(num)) continue; // drop junk entries, keep the rest
    out[key] = clamp(num, min, max);
  }
  return out;
}

function sanitizeRecordBooleans(value: unknown): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  if (!isRecord(value)) return out;
  for (const [key, raw] of Object.entries(value)) {
    if (typeof raw === "boolean") out[key] = raw;
  }
  return out;
}

function sanitizeStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

// ---------------------------------------------------------------------------
// Fresh state
// ---------------------------------------------------------------------------

/** A brand-new v2 game: core defaults plus the fully seeded social model. */
export function freshV2State(): GameStateV2 {
  const base = initialGameState();
  return {
    ...base,
    saveVersion: 2,
    social: freshSocialState(),
    npcMemory: emptyMemoryDtos(),
    worldDiary: [],
    equipment: {},
    missionCompletions: [],
  };
}

/** Fully archetype-seeded social state (AC-15: never flat 50). */
function freshSocialState(): SocialState {
  return {
    relationships: seedMissingPairs({}, ARCHETYPE_SEEDS, ALL_PAIR_KEYS),
    mood: defaultMoods(),
    profilesVersion: SOCIAL_PROFILES_VERSION,
  };
}

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

/**
 * Migrates any known save (or garbage) to the current schema. Never throws;
 * malformed and future-version inputs become a fresh v2 game.
 */
export function migrate(raw: unknown): GameStateV2 {
  try {
    if (!isRecord(raw)) return freshV2State();
    const version = Math.floor(finiteOr(raw.saveVersion, 1));
    if (version > SAVE_VERSION_V2) return freshV2State(); // future save
    if (!plausibleSave(raw)) return freshV2State(); // garbage

    return {
      ...sanitizeCore(raw),
      saveVersion: 2,
      social: migrateSocial(isRecord(raw.social) ? raw.social : undefined, version),
      npcMemory: sanitizeMemoryMap(raw.npcMemory),
      worldDiary: sanitizeDiary(raw.worldDiary),
      equipment: sanitizeEquipment(raw.equipment),
      missionCompletions: sanitizeStringArray(raw.missionCompletions).slice(0, 1000),
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("MIGRATE-DIAG", err);
    // A migration bug must never take the player's session down.
    return freshV2State();
  }
}

/** Minimum shape shared by every real save the v1/v2 writers produce. */
function plausibleSave(raw: Record<string, unknown>): boolean {
  return (
    typeof raw.cash === "number" &&
    Number.isFinite(raw.cash) &&
    typeof raw.day === "number" &&
    Number.isFinite(raw.day) &&
    isRecord(raw.character) &&
    typeof raw.character.name === "string"
  );
}

/** v1/v2 core fields, sanitized field-by-field against current defaults. */
function sanitizeCore(raw: Record<string, unknown>): Omit<GameStateV2, "saveVersion" | "social" | "npcMemory" | "worldDiary" | "equipment" | "missionCompletions"> {
  const base = initialGameState();
  const character = isRecord(raw.character) ? raw.character : {};
  const stats = isRecord(raw.stats) ? raw.stats : {};
  const totals = isRecord(raw.totals) ? raw.totals : {};
  const pose = isRecord(raw.playerPose) ? raw.playerPose : undefined;
  const time = TIME_IDS.find((id) => id === raw.timeOfDay);
  const specialization = SPECIALIZATIONS.find((id) => id === character.specialization);
  const trait = TRAITS.find((id) => id === character.trait);
  return {
    cash: finiteOr(raw.cash, base.cash),
    day: Math.max(1, Math.floor(finiteOr(raw.day, base.day))),
    timeOfDay: time ?? base.timeOfDay,
    character: {
      name: typeof character.name === "string" && character.name ? character.name : base.character.name,
      specialization: specialization ?? base.character.specialization,
      trait: trait ?? base.character.trait,
    },
    stats: {
      credibility: clamp(finiteOr(stats.credibility, base.stats.credibility), 0, 100),
      caffeine: clamp(finiteOr(stats.caffeine, base.stats.caffeine), 0, 100),
      patience: clamp(finiteOr(stats.patience, base.stats.patience), 0, 100),
      focus: clamp(finiteOr(stats.focus, base.stats.focus), 0, 100),
    },
    // The player<->NPC map is the single player authority: preserved (and
    // clamped, never re-seeded or blended into the NPC matrix).
    npcRelationships: sanitizeRecordNumbers(raw.npcRelationships, 0, 100),
    flags: sanitizeRecordBooleans(raw.flags),
    inventory: sanitizeStringArray(raw.inventory),
    bankruptcyStartedOnDay: Math.max(0, Math.floor(finiteOr(raw.bankruptcyStartedOnDay, 0))),
    totals: {
      cashEarned: Math.max(0, finiteOr(totals.cashEarned, 0)),
      miniGamesWon: Math.max(0, finiteOr(totals.miniGamesWon, 0)),
      miniGamesLost: Math.max(0, finiteOr(totals.miniGamesLost, 0)),
      dialoguesFinished: Math.max(0, finiteOr(totals.dialoguesFinished, 0)),
    },
    playerPose:
      pose &&
      Number.isFinite(pose.x) &&
      Number.isFinite(pose.z) &&
      Number.isFinite(pose.yaw) &&
      Number.isFinite(pose.pitch)
        ? { x: pose.x as number, z: pose.z as number, yaw: pose.yaw as number, pitch: pose.pitch as number }
        : undefined,
  };
}

/**
 * Social state migration: lazy pair fill from the archetype seeds; on a
 * profilesVersion bump re-seed only pairs never touched by a delta; mood
 * re-seeded from baselines for missing/invalid entries.
 */
function migrateSocial(social: Record<string, unknown> | undefined, fromVersion: number): SocialState {
  const existing = sanitizeRecordNumbers(social?.relationships, 0, 100) as RelationshipMatrix;
  const touched = sanitizeStringArray(social?.touched).filter((key) => existing[key] !== undefined);
  const savedProfilesVersion = finiteOr(social?.profilesVersion, 0);

  let relationships = existing;
  if (fromVersion >= 2 && savedProfilesVersion < SOCIAL_PROFILES_VERSION) {
    // Profile table changed: re-seed ONLY pairs never moved by a delta.
    const keep = new Set(touched);
    relationships = Object.fromEntries(
      Object.entries(existing).filter(([key]) => keep.has(key)),
    );
  }
  relationships = seedMissingPairs(relationships, ARCHETYPE_SEEDS, ALL_PAIR_KEYS);

  return {
    relationships,
    mood: sanitizeMoodMap(social?.mood),
    profilesVersion: SOCIAL_PROFILES_VERSION,
    touched: touched.length > 0 ? touched : undefined,
  };
}

/** Mood map covering the whole roster; missing/invalid entries fall back to baseline. */
function sanitizeMoodMap(value: unknown): Record<NpcId, Mood> {
  const out = defaultMoods();
  if (!isRecord(value)) return out;
  for (const id of MEMORY_ROSTER) {
    const raw = value[id];
    if (!isRecord(raw)) continue;
    const valence = raw.valence;
    const energy = raw.energy;
    if (typeof valence !== "number" || typeof energy !== "number") continue;
    if (!Number.isFinite(valence) || !Number.isFinite(energy)) continue;
    out[id as NpcId] = { valence: clamp(valence, -100, 100), energy: clamp(energy, 0, 100) };
  }
  return out;
}

/**
 * Memory DTO map for the whole roster; unknown ids dropped, junk entries
 * normalized through the serialize/deserialize round-trip (sorted arrays).
 */
function sanitizeMemoryMap(value: unknown): Record<string, NpcMemoryDto> {
  const out = emptyMemoryDtos();
  if (!isRecord(value)) return out;
  const roster = new Set<string>(MEMORY_ROSTER);
  for (const [id, raw] of Object.entries(value)) {
    if (!roster.has(id)) continue;
    out[id] = serializeMemory(deserializeMemory(raw as NpcMemoryDto));
  }
  return out;
}

/** Diary ring buffer: strings only, capped at WORLD_DIARY_LIMIT (newest last). */
function sanitizeDiary(value: unknown): string[] {
  const entries = sanitizeStringArray(value);
  return entries.slice(-WORLD_DIARY_LIMIT);
}

/** Equipment map with only the two legal states; anything else is dropped. */
function sanitizeEquipment(value: unknown): Record<string, EquipmentState> {
  const out: Record<string, EquipmentState> = {};
  if (!isRecord(value)) return out;
  for (const [key, raw] of Object.entries(value)) {
    if (raw === "ok" || raw === "faulted") out[key] = raw;
  }
  return out;
}

// ---------------------------------------------------------------------------
// v1 backup (wired into the save path by the store)
// ---------------------------------------------------------------------------

/**
 * Persists the untouched v1 blob under `aitrainer:save:v1:backup` before the
 * first v2 save overwrites it. Idempotent: an existing backup is never
 * overwritten, and only a parseable saveVersion-1 blob is backed up. Best
 * effort: without storage (or on quota errors) this is a no-op that returns
 * false — the migration itself is lossless for everything the game reads.
 */
export function writeV1Backup(
  raw: string,
  storage?: Pick<Storage, "getItem" | "setItem">,
): boolean {
  try {
    const store = storage ?? globalThis.localStorage;
    if (!store || typeof store.getItem !== "function") return false;
    if (!raw) return false;
    if (store.getItem(V1_BACKUP_KEY) != null) return false;
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed) || parsed.saveVersion !== 1) return false;
    store.setItem(V1_BACKUP_KEY, raw);
    return true;
  } catch {
    return false;
  }
}
