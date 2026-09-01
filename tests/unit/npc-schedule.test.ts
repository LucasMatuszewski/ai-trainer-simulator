import { describe, expect, it } from "vitest";

import {
  isLunchWindow,
  LUNCH_OUTSIDERS,
  LUNCH_STAGGER_OFFSET,
  NPC_SCHEDULES,
  pickRandomDestination,
  RANDOM_DESTINATIONS,
  REVENUE_SPOT_CHANCE,
  SOCIAL_LUNCHERS,
  type Period,
} from "../../src/content/npc-schedule";
import { NPCS, OFFICE_BOUNDS } from "../../src/content/npcs";
import { getNpcObstacles, isSpawnBlocked } from "../../src/engine/npc-spawn-validator";
import type { NpcId } from "../../src/types";

const PERIODS: readonly Period[] = ["morning", "afternoon", "evening"];

const getScheduleFor = (npcId: NpcId, period: Period) => NPC_SCHEDULES[npcId][period];

describe("NPC schedules", () => {
  it("gives every NPC a positive finite walk speed", () => {
    for (const npc of NPCS) {
      expect(Number.isFinite(npc.walkSpeed)).toBe(true);
      expect(npc.walkSpeed).toBeGreaterThan(0);
    }
  });

  it("gives Burek the mandated 1.6 m/s walk speed", () => {
    expect(NPCS.find((npc) => npc.id === "burek")?.walkSpeed).toBe(1.6);
  });

  it("returns an entry for every NPC and period", () => {
    for (const npc of NPCS) {
      for (const period of PERIODS) {
        expect(getScheduleFor(npc.id, period)).toBeDefined();
      }
    }
  });

  it("covers exactly the configured NPC roster", () => {
    expect(Object.keys(NPC_SCHEDULES).sort()).toEqual(NPCS.map((npc) => npc.id).sort());
  });

  it("covers all three periods for every NPC", () => {
    for (const schedule of Object.values(NPC_SCHEDULES)) {
      expect(Object.keys(schedule).sort()).toEqual([...PERIODS].sort());
    }
  });

  it("keeps every face angle within the accepted range", () => {
    for (const schedule of Object.values(NPC_SCHEDULES)) {
      for (const entry of Object.values(schedule)) {
        expect(entry.face).toBeGreaterThanOrEqual(-2 * Math.PI);
        expect(entry.face).toBeLessThanOrEqual(2 * Math.PI);
      }
    }
  });

  it("keeps every position within the office bounds", () => {
    // C-35 / L-2026-08-31-02: the CEO (Dawid) sits in the new
    // CEO office at (0, 0, -17.5), which is outside the main
    // office bounds (minZ = -9). The bound check now allows
    // positions anywhere in the world layout, not just the main
    // office. The new CEO office is at x=[-8, 8], z=[-19, -9];
    // any NPC whose position falls in that range is in the CEO
    // office, not the main office.
    for (const schedule of Object.values(NPC_SCHEDULES)) {
      for (const entry of Object.values(schedule)) {
        expect(entry.position.x).toBeGreaterThanOrEqual(OFFICE_BOUNDS.minX);
        expect(entry.position.x).toBeLessThanOrEqual(OFFICE_BOUNDS.maxX);
        expect(entry.position.z).toBeGreaterThanOrEqual(-19);
        expect(entry.position.z).toBeLessThanOrEqual(OFFICE_BOUNDS.maxZ);
      }
    }
  });

  it("never uses walking as a deterministic destination", () => {
    for (const schedule of Object.values(NPC_SCHEDULES)) {
      for (const entry of Object.values(schedule)) {
        expect(entry.state).not.toBe("walking");
      }
    }
  });

  it("keeps Bartek at his desk in the evening", () => {
    expect(getScheduleFor("bartek", "evening").state).toBe("at-desk");
  });

  it("sends Maciek off-site in the afternoon", () => {
    expect(getScheduleFor("maciek", "afternoon").state).toBe("gone-home");
  });

  it("keeps Janusz at his desk in the morning", () => {
    // L-2026-08-31-02: Janusz is at his desk in the morning, not
    // gone-home. He stays at his desk all three periods.
    expect(getScheduleFor("janusz", "morning").state).toBe("at-desk");
  });

  it("keeps Janusz at his desk in the afternoon", () => {
    // L-2026-08-31-02: Janusz's schedule was updated in 2026-08-31
    // to keep him at his desk all three periods (he is the
    // janitor and arrives at his post). The older "back wall"
    // test referenced a schedule that no longer exists.
    const entry = getScheduleFor("janusz", "afternoon");
    expect(entry.state).toBe("at-desk");
    expect(entry.position).toEqual({ x: -7.7, y: 0, z: 2 });
  });

  it("puts Zosia in the afternoon meeting", () => {
    expect(getScheduleFor("zosia", "afternoon").state).toBe("meeting");
  });

  it("sends Pawel for afternoon coffee", () => {
    expect(getScheduleFor("pawel", "afternoon").state).toBe("coffee");
  });

  it("sends Burek to the coffee machine in the afternoon", () => {
    expect(getScheduleFor("burek", "afternoon").state).toBe("coffee");
  });

  it("sends Grazyna home in the evening", () => {
    expect(getScheduleFor("grazyna", "evening").state).toBe("gone-home");
  });
});

describe("Random walk destinations (L-2026-08-30-01)", () => {
  it("classifies every human and Burek as social lunchers except the two outsiders", () => {
    const expectedSocialLunchers = NPCS
      .filter((npc) => npc.gender !== "dog" || npc.id === "burek")
      .map((npc) => npc.id)
      .filter((id) => id !== "maciek" && id !== "marek");

    expect([...SOCIAL_LUNCHERS].sort()).toEqual(expectedSocialLunchers.sort());
    expect([...LUNCH_OUTSIDERS].sort()).toEqual(["maciek", "marek"]);
  });

  it("opens lunch only during the first 120 seconds of the afternoon", () => {
    expect(isLunchWindow({ period: "afternoon", periodElapsed: 0 })).toBe(true);
    expect(isLunchWindow({ period: "afternoon", periodElapsed: 119.9 })).toBe(true);
    expect(isLunchWindow({ period: "afternoon", periodElapsed: 120 })).toBe(false);
    expect(isLunchWindow({ period: "morning", periodElapsed: 0 })).toBe(false);
    expect(isLunchWindow({ period: "evening", periodElapsed: 0 })).toBe(false);
  });

  it("always sends Burek to a jittered kitchen stop during lunch", () => {
    for (const value of [0, 0.25, 0.5, 0.99]) {
      const result = pickRandomDestination(
        "burek",
        () => value,
        1,
        { period: "afternoon", periodElapsed: 30 },
      );
      expect(result?.state).toBe("kitchen");
      expect(result?.position.x).toBeGreaterThanOrEqual(10.2);
      expect(result?.position.x).toBeLessThanOrEqual(17.9);
      expect(result?.position.z).toBeGreaterThanOrEqual(-6.6);
      expect(result?.position.z).toBeLessThanOrEqual(2.9);
    }
  });

  it("sends a social human to the kitchen when the lunch roll is below 60%", () => {
    const result = pickRandomDestination(
      "bartek",
      () => 0.5,
      1,
      { period: "afternoon", periodElapsed: 30 },
    );
    expect(result?.state).toBe("kitchen");
  });

  it("preserves the old 90% stay behavior when no lunch context is supplied", () => {
    expect(pickRandomDestination("bartek", () => 0.5, 1)).toBeNull();
  });

  it("returns lunch stagger offsets in the inclusive 0 to 2 second range", () => {
    expect(LUNCH_STAGGER_OFFSET("bartek", 1, () => 0)).toBe(0);
    expect(LUNCH_STAGGER_OFFSET("bartek", 1, () => 0.5)).toBe(1);
    expect(LUNCH_STAGGER_OFFSET("bartek", 1, () => 1)).toBe(2);
  });

  it("defines destinations for kitchen, toilet, meeting, and training", () => {
    const states = new Set(RANDOM_DESTINATIONS.map((d) => d.state));
    expect(states.has("coffee")).toBe(true);
    expect(states.has("kitchen")).toBe(true);
    expect(states.has("toilet")).toBe(true);
    expect(states.has("meeting")).toBe(true);
    expect(states.has("training")).toBe(true);
  });

  it("places the toilet destinations inside the toilet room bounds", () => {
    // C-57 (2026-09-01): toilet moved east of the kitchen. New
    // bounds: x [19, 24], z [2, 7].
    for (const dest of RANDOM_DESTINATIONS) {
      if (dest.state === "toilet") {
        expect(dest.position.x).toBeGreaterThanOrEqual(19);
        expect(dest.position.x).toBeLessThanOrEqual(24);
        expect(dest.position.z).toBeGreaterThanOrEqual(2);
        expect(dest.position.z).toBeLessThanOrEqual(7);
      }
    }
  });

  it("orients the toilet NPCs at their fixtures (C-57 yaw convention)", () => {
    // Per the world-layout yaw convention (C-45 amendment j):
    //   - face: 0 faces +Z (south)
    //   - face: Math.PI faces -Z (north)
    //   - face: Math.PI / 2 faces +X (east)
    // Stalls are at z=3 (door faces +Z at z=3.78); the NPC stands
    // south of the door (z=2.8) and must look +Z toward the door.
    // Basin is at z=6.7 on the north wall; the NPC stands south
    // of it (z=6.0) and must look -Z toward the basin.
    // Urinal is at x=23.5 on the east wall; the NPC stands west
    // of it (x=22.5) and must look +X (east) toward the urinal.
    const byPos = (z: number) =>
      RANDOM_DESTINATIONS.filter(
        (d) => d.state === "toilet" && Math.abs(d.position.z - z) < 0.1,
      );
    // Two stalls at z=2.8: face must be 0 (toward +Z).
    for (const d of byPos(2.8)) {
      expect(d.face).toBe(0);
    }
    // Basin at z=6.0: face must be Math.PI (toward -Z).
    for (const d of byPos(6.0)) {
      expect(d.face).toBe(Math.PI);
    }
    // Urinal at x=22.5: face must be Math.PI / 2 (toward +X).
    for (const d of RANDOM_DESTINATIONS) {
      if (d.state === "toilet" && Math.abs(d.position.x - 22.5) < 0.1) {
        expect(d.face).toBe(Math.PI / 2);
      }
    }
  });

  it("places the training destinations inside the training room bounds", () => {
    // C-44: the training room was elongated north (the projector
    // wall moved from z=-13 to z=-19). New bounds: x=[19, 27],
    // z=[-19, -3].
    for (const dest of RANDOM_DESTINATIONS) {
      if (dest.state === "training") {
        expect(dest.position.x).toBeGreaterThanOrEqual(19);
        expect(dest.position.x).toBeLessThanOrEqual(27);
        expect(dest.position.z).toBeGreaterThanOrEqual(-19);
        expect(dest.position.z).toBeLessThanOrEqual(-3);
      }
    }
  });

  it("places the kitchen destinations inside the kitchen bounds", () => {
    for (const dest of RANDOM_DESTINATIONS) {
      if (dest.state === "coffee" || dest.state === "kitchen") {
        expect(dest.position.x).toBeGreaterThanOrEqual(9);
        expect(dest.position.x).toBeLessThanOrEqual(19);
        expect(dest.position.z).toBeGreaterThanOrEqual(-7);
        expect(dest.position.z).toBeLessThanOrEqual(7);
      }
    }
  });

  it("returns null or a ScheduleEntry (never throws) for any NPC", () => {
    for (const npc of NPCS) {
      for (let i = 0; i < 25; i += 1) {
        const r = pickRandomDestination(npc.id, () => (i / 25 + npc.id.length) % 1, i + 1);
        if (r !== null) {
          expect(r.position.x).toBeDefined();
          expect(r.position.z).toBeDefined();
          expect(["coffee", "kitchen", "toilet", "meeting", "training", "deal-wall", "content-booth"]).toContain(r.state);
        }
      }
    }
  });

  it("routes affinity NPCs to their C-47 revenue-corner prop", () => {
    const stayPass = 0.95; // >= the 0.9 stay probability
    const revenueHit = REVENUE_SPOT_CHANCE / 2; // < REVENUE_SPOT_CHANCE

    const seq = (first: number, second: number) => {
      let calls = 0;
      return (): number => {
        calls += 1;
        return calls === 1 ? first : second;
      };
    };
    for (const npcId of ["przemek", "kasia", "zosia", "dawid"] as NpcId[]) {
      const dest = pickRandomDestination(npcId, seq(stayPass, revenueHit), 1);
      expect(dest?.state).toBe("deal-wall");
    }
    // ...and marketing to the Content Booth.
    for (const npcId of ["ania", "klaudia"] as NpcId[]) {
      const dest = pickRandomDestination(npcId, seq(stayPass, revenueHit), 1);
      expect(dest?.state).toBe("content-booth");
    }
    // NPCs without a revenue affinity never get the props.
    for (const npcId of ["bartek", "tomek", "grazyna", "janusz", "burek"] as NpcId[]) {
      const dest = pickRandomDestination(npcId, seq(stayPass, revenueHit), 1);
      expect(["deal-wall", "content-booth"]).not.toContain(dest?.state);
    }
  });

  it("stands the revenue-corner destination spots clear of furniture", () => {
    const obstacles = getNpcObstacles();
    for (const state of ["deal-wall", "content-booth"] as const) {
      const entry = RANDOM_DESTINATIONS.find((candidate) => candidate.state === state);
      expect(entry).toBeDefined();
      expect(isSpawnBlocked({ x: entry!.position.x, z: entry!.position.z, radius: 0.3 }, obstacles)).toBe(false);
    }
  });
});
