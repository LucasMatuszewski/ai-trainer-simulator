/**
 * ADR 0008 D-36/D-39. Covers target resolution and companion movement
 * contracts using real meshes and paths without rendering. Appearance and
 * projected bubble placement remain browser visual checks.
 *
 * D-39 is the rule under test: an agent has never seen the floor plan, so
 * it addresses the world by NAME, and a failed lookup must hand back the
 * valid alternatives instead of a dead end.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import {
  AGENT_ANIMATIONS,
  SPAWN_FACING,
  buildTargetCatalog,
  resolveTarget,
  MAX_SAY_LENGTH,
  clampSpokenLine,
  createAgentCompanion,
  type CompanionDeps,
} from "../../src/engine/agent-companion";

const NPCS = [
  { id: "bartek", name: "Bartek", role: "Team Lead", position: { x: 1, y: 0, z: 2 } },
  { id: "renata", name: "Renata", role: "Receptionist", position: { x: 4, y: 0, z: 15 } },
  { id: "burek", name: "Burek", role: "Office Dog", position: { x: 0, y: 0, z: 0 } },
];
const ROOMS = [
  { id: "kitchen", name: "Kitchen", floor: { minX: 10, maxX: 20, minZ: -5, maxZ: 5 } },
  { id: "ceo-office", name: "CEO Office", floor: { minX: -8, maxX: 8, minZ: -19, maxZ: -9 } },
];

describe("buildTargetCatalog", () => {
  it("includes every NPC and every room", () => {
    const catalog = buildTargetCatalog(NPCS, ROOMS);
    expect(catalog.filter((t) => t.kind === "npc")).toHaveLength(3);
    expect(catalog.filter((t) => t.kind === "room")).toHaveLength(2);
  });

  it("aims a room target at its floor centre, so the walk ends inside the room", () => {
    const kitchen = buildTargetCatalog([], ROOMS).find((t) => t.id === "kitchen");
    expect(kitchen?.position).toEqual({ x: 15, z: 0 });
  });

  it("carries the role so an agent can tell who is worth talking to", () => {
    const bartek = buildTargetCatalog(NPCS, []).find((t) => t.id === "bartek");
    expect(bartek?.description).toContain("Team Lead");
  });
});

describe("resolveTarget", () => {
  const catalog = buildTargetCatalog(NPCS, ROOMS);

  it("resolves an exact id", () => {
    const result = resolveTarget("bartek", catalog);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.target.id).toBe("bartek");
  });

  it("resolves a display name regardless of case", () => {
    const result = resolveTarget("ReNaTa", catalog);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.target.id).toBe("renata");
  });

  it("resolves a room by its human name with a space", () => {
    const result = resolveTarget("CEO Office", catalog);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.target.id).toBe("ceo-office");
  });

  it("tolerates surrounding whitespace", () => {
    expect(resolveTarget("  kitchen  ", catalog).ok).toBe(true);
  });

  it("enumerates valid targets when the name is unknown (D-39)", () => {
    const result = resolveTarget("the moon", catalog);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.candidates.length).toBeGreaterThan(0);
      expect(result.candidates).toContain("bartek");
      expect(result.candidates).toContain("kitchen");
    }
  });

  it("rejects an empty query rather than picking something arbitrary", () => {
    expect(resolveTarget("   ", catalog).ok).toBe(false);
  });

  it("never resolves a partial match to a single target silently", () => {
    // "office" appears in "CEO Office" but is not a whole name. Guessing
    // here would move a character in a world the human is watching.
    const result = resolveTarget("office", catalog);
    expect(result.ok).toBe(false);
  });
});

describe("clampSpokenLine", () => {
  it("passes a normal line through unchanged", () => {
    expect(clampSpokenLine("Morning. Did anyone push to main?")).toBe(
      "Morning. Did anyone push to main?",
    );
  });

  it("truncates an overlong line instead of letting it overflow the bubble", () => {
    const clamped = clampSpokenLine("x".repeat(MAX_SAY_LENGTH + 200));
    expect(clamped.length).toBeLessThanOrEqual(MAX_SAY_LENGTH);
  });

  it("collapses newlines, which would break a single-line bubble", () => {
    expect(clampSpokenLine("one\ntwo\r\nthree")).toBe("one two three");
  });

  it("returns an empty string for whitespace, so callers can reject it", () => {
    expect(clampSpokenLine("   \n  ")).toBe("");
  });
});

describe("AGENT_ANIMATIONS", () => {
  it("offers the same gesture vocabulary the human coworkers use", () => {
    // The robot should read as a member of the cast, not as a thing with its
    // own private animation set - so the names come from DESK_GESTURES plus
    // the two standing poses.
    for (const gesture of ["facepalm", "coffee-sip", "fist-pump", "shrug"]) {
      expect(AGENT_ANIMATIONS).toContain(gesture);
    }
    expect(AGENT_ANIMATIONS).toContain("wave");
    expect(AGENT_ANIMATIONS).toContain("stretch");
  });

  it("has no duplicates, so a name always means one gesture", () => {
    expect(new Set(AGENT_ANIMATIONS).size).toBe(AGENT_ANIMATIONS.length);
  });
});

describe("SPAWN_FACING", () => {
  it("looks into the office, not back at the door", () => {
    // The mesh convention (types.ts) is that rotation.y = PI looks -Z. The
    // reception spawn sits between the entrance and the office door, so 0
    // pointed the robot at a door it never walked through.
    expect(SPAWN_FACING).toBeCloseTo(Math.PI);
  });
});

// Runtime movement is tested with real meshes and paths, without a renderer.

function companionFixture(overrides: Partial<CompanionDeps> = {}) {
  const scene = new THREE.Scene();
  const npcs = [{ id: "bartek", name: "Bartek", role: "Lead", position: { x: 8, y: 0, z: 0 } }];
  const bubbles: THREE.Vector3[] = [];
  const companion = createAgentCompanion({
    scene, obstacles: [], waypoints: [], edges: [], spawn: { x: 0, z: 0 },
    bounds: { minX: -20, maxX: 20, minZ: -20, maxZ: 20 },
    listNpcs: () => npcs, listRooms: () => ROOMS,
    showBubble: (position) => { bubbles.push(position); }, ...overrides,
  });
  companion.join("Rusty", "A helpful robot");
  return { companion, scene, npcs, bubbles };
}

function finishWalk(companion: ReturnType<typeof createAgentCompanion>) {
  for (let i = 0; i < 500 && companion.snapshot().walking; i++) companion.update(0.1);
}

afterEach(() => vi.useRealTimers());

describe("companion personal space", () => {
  it("stops beside an NPC and faces the NPC instead of occupying their center", () => {
    const { companion, scene } = companionFixture();
    expect(companion.moveTo("bartek").ok).toBe(true);
    finishWalk(companion);
    const p = companion.getPosition();
    expect(Math.hypot(p.x - 8, p.z)).toBeGreaterThanOrEqual(1.5);
    expect(Math.hypot(p.x - 8, p.z)).toBeLessThanOrEqual(2);
    expect(scene.children[0]!.rotation.y).toBeCloseTo(Math.atan2(8 - p.x, -p.z));
  });

  it("retargets a person who moved during the walk", () => {
    const { companion, npcs } = companionFixture();
    companion.moveTo("bartek");
    companion.update(1);
    npcs[0]!.position.z = 5;
    finishWalk(companion);
    const p = companion.getPosition();
    expect(Math.hypot(p.x - 8, p.z - 5)).toBeGreaterThanOrEqual(1.5);
    expect(Math.hypot(p.x - 8, p.z - 5)).toBeLessThanOrEqual(2);
  });

  it("finds another approach when the nearest spot is furniture", () => {
    const obstacle = { minX: 5.8, maxX: 6.8, minZ: -0.5, maxZ: 0.5 };
    const { companion } = companionFixture({ obstacles: [obstacle] });
    expect(companion.moveTo("bartek").ok).toBe(true);
    finishWalk(companion);
    const p = companion.getPosition();
    expect(Math.hypot(p.x - 8, p.z)).toBeGreaterThanOrEqual(1.5);
    expect(Math.hypot(p.x - 8, p.z)).toBeLessThanOrEqual(2);
    expect(p.x + 0.3 <= obstacle.minX || p.x - 0.3 >= obstacle.maxX ||
      p.z + 0.3 <= obstacle.minZ || p.z - 0.3 >= obstacle.maxZ).toBe(true);
  });

  it("still walks to the center of a room", () => {
    const { companion } = companionFixture();
    companion.moveTo("kitchen");
    finishWalk(companion);
    expect(companion.snapshot().position.x).toBeCloseTo(15);
    expect(companion.snapshot().position.z).toBeCloseTo(0);
  });

  it.each([0, 1, 8])("settles three metres from the human starting %s metres away", async (distance) => {
    const { companion } = companionFixture({ spawn: { x: distance, z: 0 } });
    const human = { x: 0, z: 0 };
    const result = companion.walkToPoint(human);
    finishWalk(companion);
    expect(await result).toEqual({ arrived: true });
    expect(companion.getPosition().length()).toBeCloseTo(3);
    expect(human).toEqual({ x: 0, z: 0 });
  });

  it("stops moving when the human approach times out", async () => {
    vi.useFakeTimers();
    const { companion } = companionFixture();
    const result = companion.walkToPoint({ x: 10, z: 0 }, 100);
    vi.advanceTimersByTime(100);
    expect(await result).toMatchObject({ arrived: false });
    const before = companion.getPosition();
    companion.update(5);
    expect(companion.snapshot().walking).toBe(false);
    expect(companion.getPosition()).toEqual(before);
  });

  it("cancels the prior waiter when a new move supersedes it", async () => {
    vi.useFakeTimers();
    const { companion } = companionFixture();
    const old = companion.walkToPoint({ x: 10, z: 0 }, 100);
    let cancelled = false;
    void old.then(() => { cancelled = true; });
    companion.moveTo("kitchen");
    await vi.advanceTimersByTimeAsync(0);
    expect(cancelled).toBe(true);
    vi.advanceTimersByTime(100);
    expect(await old).toMatchObject({ arrived: false });
    finishWalk(companion);
    expect(companion.snapshot().position.x).toBeCloseTo(15);
    expect(companion.snapshot().position.z).toBeCloseTo(0);
  });
});

describe("companion observation and text", () => {
  it("keeps the bubble anchored to the moving robot but protects getPosition", () => {
    const { companion, bubbles } = companionFixture();
    companion.say("Walking now");
    companion.moveTo("kitchen");
    companion.update(1);
    expect(bubbles[0]).toEqual(companion.getPosition());
    companion.getPosition().set(99, 99, 99);
    expect(companion.getPosition().x).not.toBe(99);
  });

  it("reports movement in lookAround and clears it on arrival", () => {
    const { companion } = companionFixture();
    companion.moveTo("kitchen");
    expect(companion.lookAround()).toMatchObject({ companion: { walking: true, movingTo: "kitchen" } });
    finishWalk(companion);
    expect(companion.lookAround()).toMatchObject({ companion: { walking: false, movingTo: null } });
  });

  it("preserves a 400-character persona while keeping speech bounded", () => {
    const { companion } = companionFixture();
    companion.leave();
    companion.join("Rusty", "p".repeat(400));
    expect(companion.getPersona()).toBe("p".repeat(400));
    expect(companion.say("p".repeat(400)).spoken!.length).toBeLessThanOrEqual(120);
    companion.leave();
    companion.join("Rusty", "p".repeat(600));
    expect(companion.getPersona().length).toBe(500);
  });
});

describe("bounded named approach", () => {
  it("resolves only after reaching and facing the named person", async () => {
    const { companion, scene } = companionFixture();
    const result = companion.awaitMoveTo("bartek", 1000);
    finishWalk(companion);
    expect(await result).toEqual({ arrived: true });
    expect(companion.getPosition().x).toBeCloseTo(6.25);
    expect(scene.children[0]!.rotation.y).toBeCloseTo(Math.PI / 2);
  });

  it("fails immediately for unknown targets", async () => {
    const { companion } = companionFixture();
    expect(await companion.awaitMoveTo("nobody")).toMatchObject({ arrived: false });
  });

  it("stops a named walk when its bounded wait expires", async () => {
    vi.useFakeTimers();
    const { companion } = companionFixture();
    const result = companion.awaitMoveTo("bartek", 100);
    vi.advanceTimersByTime(100);
    expect(await result).toMatchObject({ arrived: false });
    expect(companion.snapshot()).toMatchObject({ walking: false, movingTo: null });
  });

  it("resolves departure immediately and clears its old timer before rejoining", async () => {
    vi.useFakeTimers();
    const { companion } = companionFixture();
    const result = companion.awaitMoveTo("bartek", 100);
    companion.leave();
    expect(await result).toMatchObject({ arrived: false });
    companion.join("Rusty", "Back again");
    companion.moveTo("kitchen");
    vi.advanceTimersByTime(100);
    expect(companion.snapshot().walking).toBe(true);
  });

  it("keeps making progress with small moving-target jitter", async () => {
    const { companion, npcs } = companionFixture();
    const result = companion.awaitMoveTo("bartek");
    for (let i = 0; i < 200 && companion.snapshot().walking; i++) {
      npcs[0]!.position.z = i % 2 ? 0.1 : -0.1;
      companion.update(0.1);
    }
    expect(companion.snapshot().walking).toBe(false);
    expect(await result).toEqual({ arrived: true });
  });

  it("fails without moving when every personal-space spot is blocked", async () => {
    const { companion } = companionFixture({ obstacles: [{ minX: 5, maxX: 11, minZ: -3, maxZ: 3 }] });
    expect(await companion.awaitMoveTo("bartek")).toMatchObject({ arrived: false });
    expect(companion.getPosition().length()).toBe(0);
  });
});
