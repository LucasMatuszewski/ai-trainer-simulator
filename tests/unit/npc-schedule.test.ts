import { describe, expect, it } from "vitest";

import {
  NPC_SCHEDULES,
  pickRandomDestination,
  RANDOM_DESTINATIONS,
  type Period,
} from "../../src/content/npc-schedule";
import { NPCS, OFFICE_BOUNDS } from "../../src/content/npcs";
import type { NpcId } from "../../src/types";

const PERIODS: readonly Period[] = ["morning", "afternoon", "evening"];

const getScheduleFor = (npcId: NpcId, period: Period) => NPC_SCHEDULES[npcId][period];

describe("NPC schedules", () => {
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
  it("defines destinations for kitchen, toilet, meeting, and training", () => {
    const states = new Set(RANDOM_DESTINATIONS.map((d) => d.state));
    expect(states.has("coffee")).toBe(true);
    expect(states.has("kitchen")).toBe(true);
    expect(states.has("toilet")).toBe(true);
    expect(states.has("meeting")).toBe(true);
    expect(states.has("training")).toBe(true);
  });

  it("places the toilet destinations inside the toilet room bounds", () => {
    // Toilet floor: x:[-19, -9], z:[9, 19].
    for (const dest of RANDOM_DESTINATIONS) {
      if (dest.state === "toilet") {
        expect(dest.position.x).toBeGreaterThanOrEqual(-19);
        expect(dest.position.x).toBeLessThanOrEqual(-9);
        expect(dest.position.z).toBeGreaterThanOrEqual(9);
        expect(dest.position.z).toBeLessThanOrEqual(19);
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
          expect(["coffee", "kitchen", "toilet", "meeting", "training"]).toContain(r.state);
        }
      }
    }
  });
});
