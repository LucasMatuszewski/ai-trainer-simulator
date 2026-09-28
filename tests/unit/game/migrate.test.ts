/**
 * Unit tests for the save migration chain (ADR-0009 D-51, WS2).
 *
 * Covers: v1 -> v2 migration (social seeded, player map preserved, memory
 * round-trips), idempotence, malformed and future-version defense, lazy pair
 * fill, the profilesVersion re-seed rule, the worldDiary cap, and the v1
 * backup helper. Also covers the dialogue-memory serialization helpers at
 * the API boundary (Sets <-> sorted arrays) since the migration consumes
 * them (the WS2 brief routes those tests through this file).
 */

import { beforeEach, describe, expect, it } from "vitest";
import type { NpcId } from "../../../src/types";

import {
  NPC_MEMORY,
  clearMemory,
  deserializeMemory,
  getMemory,
  serializeMemory,
  setMemory,
  type NpcMemory,
} from "../../../src/content/dialogue-memory";
import {
  ALL_PAIR_KEYS,
  ARCHETYPE_SEEDS,
  SOCIAL_PROFILES,
  SOCIAL_PROFILES_VERSION,
} from "../../../src/content/npc-profiles";
import { pairKey } from "../../../src/game/social";
import type { NpcMemoryDto } from "../../../src/content/dialogue-memory";
import {
  SAVE_VERSION_V2,
  V1_BACKUP_KEY,
  WORLD_DIARY_LIMIT,
  freshV2State,
  migrate,
  writeV1Backup,
  type GameStateV2,
} from "../../../src/game/migrate";

/** A realistic v1 save: pre-C-75 shape, no social/memory/diary fields. */
function v1Fixture(): Record<string, unknown> {
  return {
    saveVersion: 1,
    cash: 2750,
    day: 4,
    timeOfDay: "afternoon",
    character: { name: "Lucas", specialization: "ai", trait: "coffee-fueled" },
    stats: { credibility: 62, caffeine: 15, patience: 44, focus: 71 },
    npcRelationships: { bartek: 72, marek: 30, zosia: 55 },
    flags: { "got-acme-contract": true, "renata-tut-finished": true },
    inventory: ["usb-stick", "cold-brew"],
    bankruptcyStartedOnDay: 0,
    totals: { cashEarned: 4200, miniGamesWon: 2, miniGamesLost: 1, dialoguesFinished: 17 },
    playerPose: { x: 2.5, z: -3.5, yaw: 1.2, pitch: -0.1 },
  };
}

/** Fake localStorage for the backup-helper tests. */
function fakeStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
    removeItem: (key: string) => {
      values.delete(key);
    },
    dump: () => Object.fromEntries(values),
  };
}

beforeEach(() => {
  clearMemory();
});

describe("v1 -> v2 migration", () => {
  it("carries every v1 field through unchanged", () => {
    const out = migrate(v1Fixture());
    expect(out.saveVersion).toBe(SAVE_VERSION_V2);
    expect(out.cash).toBe(2750);
    expect(out.day).toBe(4);
    expect(out.timeOfDay).toBe("afternoon");
    expect(out.character).toEqual({ name: "Lucas", specialization: "ai", trait: "coffee-fueled" });
    expect(out.stats).toEqual({ credibility: 62, caffeine: 15, patience: 44, focus: 71 });
    expect(out.flags).toEqual({ "got-acme-contract": true, "renata-tut-finished": true });
    expect(out.inventory).toEqual(["usb-stick", "cold-brew"]);
    expect(out.bankruptcyStartedOnDay).toBe(0);
    expect(out.totals).toEqual({
      cashEarned: 4200,
      miniGamesWon: 2,
      miniGamesLost: 1,
      dialoguesFinished: 17,
    });
    expect(out.playerPose).toEqual({ x: 2.5, z: -3.5, yaw: 1.2, pitch: -0.1 });
  });

  it("PRESERVES npcRelationships exactly (the player map is the player authority)", () => {
    const out = migrate(v1Fixture());
    expect(out.npcRelationships).toEqual({ bartek: 72, marek: 30, zosia: 55 });
    // and the player map is never blended into the NPC<->NPC matrix
    expect(Object.keys(out.social.relationships)).toEqual(ALL_PAIR_KEYS.slice().sort());
  });

  it("seeds the full 105-pair matrix from archetype seeds (not flat 50)", () => {
    const out = migrate(v1Fixture());
    const relationships = out.social.relationships;
    expect(Object.keys(relationships)).toHaveLength(105);
    for (const [key, value] of Object.entries(relationships)) {
      expect(value).toBe(ARCHETYPE_SEEDS[key]);
    }
    // spot-check the brief's anchors
    expect(relationships[pairKey("zosia", "pawel")]).toBe(70);
    expect(relationships[pairKey("marek", "przemek")]).toBe(35);
  });

  it("seeds mood for all 15 NPCs from their authored baselines", () => {
    const out = migrate(v1Fixture());
    for (const [id, baseline] of Object.entries(SOCIAL_PROFILES)) {
      expect(out.social.mood[id as NpcId]).toEqual(baseline.moodBaseline);
    }
    expect(out.social.profilesVersion).toBe(SOCIAL_PROFILES_VERSION);
  });

  it("starts empty v2-only collections", () => {
    const out = migrate(v1Fixture());
    expect(out.worldDiary).toEqual([]);
    expect(out.equipment).toEqual({});
    expect(out.missionCompletions).toEqual([]);
    // npcMemory: all 15 ids present with empty serialized DTOs
    expect(Object.keys(out.npcMemory)).toHaveLength(15);
    for (const dto of Object.values(out.npcMemory)) {
      expect(dto).toEqual({ lastTopic: null, visitCount: 0, seenNodes: [], pickedOptions: {} });
    }
  });
});

describe("memory serialization at the API boundary (Sets <-> sorted arrays)", () => {
  const memory: NpcMemory = {
    lastTopic: "vacation",
    visitCount: 3,
    seenNodes: new Set(["greeting", "faq", "deep-dive"]),
    pickedOptions: {
      default: new Set(["opt-z", "opt-a"]),
      "first-meeting": new Set(["intro-2"]),
    },
  };

  it("serializes Sets as sorted arrays (D-51)", () => {
    const dto = serializeMemory(memory);
    expect(dto).toEqual({
      lastTopic: "vacation",
      visitCount: 3,
      seenNodes: ["deep-dive", "faq", "greeting"],
      pickedOptions: { default: ["opt-a", "opt-z"], "first-meeting": ["intro-2"] },
    });
    // serialization never mutates the runtime memory
    expect(memory.seenNodes.has("greeting")).toBe(true);
  });

  it("deserializes arrays back into Sets", () => {
    const dto = serializeMemory(memory);
    const runtime = deserializeMemory(dto);
    expect(runtime.lastTopic).toBe("vacation");
    expect(runtime.visitCount).toBe(3);
    expect(runtime.seenNodes).toBeInstanceOf(Set);
    expect([...runtime.seenNodes].sort()).toEqual(["deep-dive", "faq", "greeting"]);
    expect(runtime.pickedOptions.default).toBeInstanceOf(Set);
    expect(runtime.pickedOptions.default!.has("opt-a")).toBe(true);
  });

  it("round-trips through migrate: a v2 save's npcMemory survives", () => {
    const first = migrate(v1Fixture());
    const runtime = deserializeMemory({
      lastTopic: "printer",
      visitCount: 2,
      seenNodes: ["greeting", "printer-jam"],
      pickedOptions: { default: ["fix-it"] },
    });
    first.npcMemory.marek = serializeMemory(runtime);
    const second = migrate(first);
    expect(second.npcMemory.marek).toEqual({
      lastTopic: "printer",
      visitCount: 2,
      seenNodes: ["greeting", "printer-jam"],
      pickedOptions: { default: ["fix-it"] },
    });
  });

  it("clearMemory resets one NPC or the whole roster", () => {
    setMemory("marek", { visitCount: 5 });
    expect(getMemory("marek").visitCount).toBe(5);
    clearMemory("marek");
    expect(getMemory("marek").visitCount).toBe(0);
    setMemory("zosia", { visitCount: 2 });
    clearMemory();
    expect(getMemory("zosia").visitCount).toBe(0);
    expect(Object.keys(NPC_MEMORY)).toHaveLength(15);
  });

  it("treats malformed DTOs defensively (empty memory, never a throw)", () => {
    const runtime = deserializeMemory(undefined as unknown as NpcMemoryDto);
    expect(runtime).toEqual({
      lastTopic: null,
      visitCount: 0,
      seenNodes: new Set(),
      pickedOptions: {},
    });
    const junk = deserializeMemory({
      lastTopic: 42 as unknown as null,
      visitCount: "many" as unknown as number,
      seenNodes: "nope" as unknown as string[],
      pickedOptions: { t: "nope" as unknown as string[] },
    });
    expect(junk.lastTopic).toBeNull();
    expect(junk.visitCount).toBe(0);
    expect(junk.seenNodes.size).toBe(0);
    // A malformed pickedOptions entry (not a Set/array of strings) is
    // DROPPED, not coerced into an empty set — the API contract is
    // "skip junk", so no phantom "t" tree key may appear.
    expect("t" in junk.pickedOptions).toBe(false);
  });
});

describe("idempotence and lazy fill (v2 -> v2)", () => {
  it("is idempotent: migrate(migrate(x)) deep-equals migrate(x)", () => {
    const once = migrate(v1Fixture());
    const twice = migrate(once);
    expect(twice).toEqual(once);
  });

  it("lazy-fills only missing pairs, preserving everything else", () => {
    const once = migrate(v1Fixture());
    const relationships = { ...once.social.relationships };
    const removed = {
      zosia: relationships[pairKey("zosia", "pawel")]!,
      marek: relationships[pairKey("marek", "przemek")]!,
    };
    delete relationships[pairKey("zosia", "pawel")];
    delete relationships[pairKey("marek", "przemek")];
    const refilled = migrate({ ...once, social: { ...once.social, relationships } });
    expect(Object.keys(refilled.social.relationships)).toHaveLength(105);
    expect(refilled.social.relationships[pairKey("zosia", "pawel")]).toBe(removed.zosia);
    expect(refilled.social.relationships[pairKey("marek", "przemek")]).toBe(removed.marek);
    // untouched pairs were not disturbed
    expect(refilled.social.relationships[pairKey("ania", "bartek")]).toBe(
      once.social.relationships[pairKey("ania", "bartek")],
    );
  });

  it("re-seeds only pairs never touched when profilesVersion bumps", () => {
    const once = migrate(v1Fixture());
    const kept = pairKey("zosia", "pawel");
    const dropped = pairKey("marek", "przemek");
    const advanced: GameStateV2 = {
      ...once,
      social: {
        ...once.social,
        relationships: {
          ...once.social.relationships,
          [kept]: 88, // touched by a delta
          [dropped]: 12, // also moved by a delta...
        },
        touched: [kept, dropped], // ...but only `kept` is declared touched below
      },
    };
    // Simulate an older profilesVersion with one touched pair: `dropped` was
    // moved by an OLD profile table, so it is NOT in touched and must re-seed.
    advanced.social.profilesVersion = SOCIAL_PROFILES_VERSION - 1;
    advanced.social.touched = [kept];
    const out = migrate(advanced);
    expect(out.social.profilesVersion).toBe(SOCIAL_PROFILES_VERSION);
    expect(out.social.relationships[kept]).toBe(88); // touched -> preserved
    expect(out.social.relationships[dropped]).toBe(ARCHETYPE_SEEDS[dropped]); // re-seeded
    // and the re-seed is itself stable across another migration
    expect(migrate(out)).toEqual(out);
  });

  it("preserves equipment faults, mission completions and the diary", () => {
    const v2 = migrate(v1Fixture());
    const withProgress: GameStateV2 = {
      ...v2,
      equipment: { printer: "faulted", "coffee-machine": "ok", junk: "bogus" as "ok" },
      missionCompletions: ["conference-day1"],
      worldDiary: Array.from({ length: 40 }, (_, i) => `entry-${i}`),
    };
    const out = migrate(withProgress);
    expect(out.equipment).toEqual({ printer: "faulted", "coffee-machine": "ok" });
    expect(out.missionCompletions).toEqual(["conference-day1"]);
    // diary keeps the LAST 30 entries (ring buffer semantics)
    expect(out.worldDiary).toHaveLength(WORLD_DIARY_LIMIT);
    expect(out.worldDiary[0]).toBe(`entry-${40 - WORLD_DIARY_LIMIT}`);
    expect(out.worldDiary[WORLD_DIARY_LIMIT - 1]).toBe("entry-39");
  });
});

describe("malformed and future saves (never throw, never wipe a v2 save)", () => {
  it("returns a fresh v2 game for null, primitives and arrays", () => {
    const fresh = freshV2State();
    for (const raw of [null, undefined, 42, "save", [], true]) {
      expect(migrate(raw), String(raw)).toEqual(fresh);
    }
  });

  it("returns a fresh v2 game when the core fields are not a plausible save", () => {
    expect(migrate({})).toEqual(freshV2State());
    expect(migrate({ saveVersion: 1, cash: "lots" })).toEqual(freshV2State());
    expect(migrate({ saveVersion: 1, cash: 100, day: "many" })).toEqual(freshV2State());
    expect(migrate({ saveVersion: 1, cash: 100, day: 1, character: "Lucas" })).toEqual(
      freshV2State(),
    );
  });

  it("returns a fresh v2 game for a FUTURE version (no time travel)", () => {
    const future = { ...v1Fixture(), saveVersion: 99 };
    expect(migrate(future).saveVersion).toBe(SAVE_VERSION_V2);
    expect(migrate(future)).toEqual(freshV2State());
  });

  it("repairs malformed sub-objects instead of throwing", () => {
    const raw = {
      ...v1Fixture(),
      npcRelationships: { bartek: "friendly", zosia: 55, burek: 999 },
      flags: { ok: true, bad: "yes" },
      inventory: "not-an-array",
      totals: { cashEarned: 10 },
      stats: { credibility: 500, caffeine: -5 },
    };
    const out = migrate(raw);
    expect(out.npcRelationships).toEqual({ zosia: 55, burek: 100 }); // junk dropped, 999 clamped
    expect(out.flags).toEqual({ ok: true });
    expect(out.inventory).toEqual([]);
    expect(out.totals).toEqual({ cashEarned: 10, miniGamesWon: 0, miniGamesLost: 0, dialoguesFinished: 0 });
    expect(out.stats).toEqual({ credibility: 100, caffeine: 0, patience: 50, focus: 50 });
  });
});

describe("writeV1Backup (the orchestrator wires this into the save path)", () => {
  it("backs up the untouched v1 blob exactly once", () => {
    const storage = fakeStorage();
    const v1Raw = JSON.stringify(v1Fixture());
    expect(writeV1Backup(v1Raw, storage)).toBe(true);
    expect(storage.dump()[V1_BACKUP_KEY]).toBe(v1Raw);
    // second call is a no-op: the backup already exists
    expect(writeV1Backup(JSON.stringify({ ...v1Fixture(), cash: 1 }), storage)).toBe(false);
    expect(storage.dump()[V1_BACKUP_KEY]).toBe(v1Raw);
  });

  it("never backs up a v2 blob, an empty string, or garbage", () => {
    const storage = fakeStorage();
    const v2 = migrate(v1Fixture());
    expect(writeV1Backup(JSON.stringify(v2), storage)).toBe(false);
    expect(writeV1Backup("", storage)).toBe(false);
    expect(writeV1Backup("{{{not json", storage)).toBe(false);
    expect(storage.dump()[V1_BACKUP_KEY]).toBeUndefined();
  });

  it("survives a missing storage (memory-only mode) without throwing", () => {
    expect(writeV1Backup(JSON.stringify(v1Fixture()), undefined)).toBe(false);
  });

  it("exports the backup key used by the save path", () => {
    expect(V1_BACKUP_KEY).toBe("aitrainer:save:v1:backup");
  });
});
