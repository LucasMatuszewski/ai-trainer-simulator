// @vitest-environment jsdom
import { describe, expect, it, beforeEach } from "vitest";
import { game } from "../../../src/game/state";
import { pairKey } from "../../../src/game/social";

/**
 * Re-verdict minor: the social block must survive the real save path —
 * dispatch → localStorage serialize → parse — not just stay in memory.
 * jsdom provides a working localStorage for the store singleton.
 */

describe("social persistence through the live store (D-51)", () => {
  beforeEach(() => {
    window.localStorage.clear();
    game.dispatch({ type: "reset" });
  });

  it("the saved payload carries the v2 social block after a judged reaction", () => {
    game.dispatch({
      type: "apply-social-reaction",
      pair: ["bartek", "klaudia"],
      bucket: "pleased",
    });
    const raw = window.localStorage.getItem("aitrainer:save:v1");
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw!) as {
      saveVersion: number;
      social?: { relationships: Record<string, number>; touched?: string[] };
    };
    expect(parsed.saveVersion).toBe(2);
    expect(parsed.social).toBeDefined();
    const key = pairKey("bartek", "klaudia");
    expect(typeof parsed.social!.relationships[key]).toBe("number");
    expect(parsed.social!.touched).toContain(key);
  });

  it("a save → load round-trip preserves the social delta", () => {
    game.dispatch({
      type: "apply-social-reaction",
      pair: ["zosia", "pawel"],
      bucket: "offended",
    });
    const key = pairKey("pawel", "zosia");
    const afterReaction = game.get().social!.relationships[key]!;

    // Simulate a page reload: parse the persisted payload and load it
    // back through the store's load action (what GameStore.load feeds).
    const parsed = JSON.parse(window.localStorage.getItem("aitrainer:save:v1")!);
    game.dispatch({ type: "load", state: parsed });
    expect(game.get().social!.relationships[key]).toBe(afterReaction);
  });

  it("a v1 blob in storage is migrated by a fresh store load, not wiped", () => {
    // Hand-write a minimal v1 payload (what an old client left behind).
    const v1 = {
      saveVersion: 1,
      cash: 777,
      day: 3,
      timeOfDay: "afternoon",
      character: { name: "Ada", specialization: "ai", trait: "debugger" },
      stats: { credibility: 40, caffeine: 50, patience: 60, focus: 70 },
      npcRelationships: { bartek: 80 },
      flags: { "renata-tut-finished": true },
      inventory: [],
      bankruptcyStartedOnDay: 0,
      totals: { cashEarned: 0, miniGamesWon: 0, miniGamesLost: 0, dialoguesFinished: 0 },
    };
    window.localStorage.setItem("aitrainer:save:v1", JSON.stringify(v1));
    // The singleton loaded before we injected the blob, so exercise the
    // two halves of the real path separately: the store's save() calls
    // writeV1Backup(existing) before overwriting, and load() migrates.
    return import("../../../src/game/migrate").then(async ({ migrate, writeV1Backup, V1_BACKUP_KEY }) => {
      const raw = window.localStorage.getItem("aitrainer:save:v1")!;
      // save()-side: the untouched v1 blob lands under the backup key...
      expect(writeV1Backup(raw)).toBe(true);
      expect(window.localStorage.getItem(V1_BACKUP_KEY)).toContain("saveVersion");
      // ...and only once (a second write is refused).
      expect(writeV1Backup(raw)).toBe(false);
      // load()-side: the v1 blob migrates with player data preserved.
      const migrated = migrate(JSON.parse(raw));
      expect(migrated.saveVersion).toBe(2);
      expect(migrated.cash).toBe(777);
      expect(migrated.npcRelationships.bartek).toBe(80); // player map preserved
      expect(migrated.social!.relationships[pairKey("bartek", "klaudia")]).toBeDefined();
    });
  });
});
