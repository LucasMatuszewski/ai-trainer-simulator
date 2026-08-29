import { describe, expect, it } from "vitest";

import { NPC_SCHEDULES, type Period } from "../../src/content/npc-schedule";
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
    for (const schedule of Object.values(NPC_SCHEDULES)) {
      for (const entry of Object.values(schedule)) {
        expect(entry.position.x).toBeGreaterThanOrEqual(OFFICE_BOUNDS.minX);
        expect(entry.position.x).toBeLessThanOrEqual(OFFICE_BOUNDS.maxX);
        expect(entry.position.z).toBeGreaterThanOrEqual(OFFICE_BOUNDS.minZ);
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

  it("keeps Janusz away in the morning", () => {
    expect(getScheduleFor("janusz", "morning").state).toBe("gone-home");
  });

  it("brings Janusz to the back wall in the afternoon", () => {
    const entry = getScheduleFor("janusz", "afternoon");
    expect(entry.state).toBe("at-desk");
    expect(entry.position).toEqual({ x: 0, y: 0, z: -8 });
    expect(entry.face).toBe(Math.PI / 2);
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
