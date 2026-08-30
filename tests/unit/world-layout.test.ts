// @vitest-environment jsdom

import * as THREE from "three";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { OFFICE_BOUNDS } from "../../src/content/npcs";
import {
  MAIN_OFFICE_DOORWAYS,
  WORLD_ROOMS,
  type WorldRoom,
} from "../../src/content/world-layout";
import { buildMultiRoomMeshes } from "../../src/engine/multi-room";
import { applyWithCollision } from "../../src/engine/collision";
import { OBSTACLES } from "../../src/content/npcs";
import { WORLD_BOUNDS, WORLD_COLLISION_WALLS } from "../../src/content/world-layout";

function overlaps(a: WorldRoom["floor"], b: WorldRoom["floor"]): boolean {
  return a.minX < b.maxX && a.maxX > b.minX && a.minZ < b.maxZ && a.maxZ > b.minZ;
}

beforeAll(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(() => ({
    fillStyle: "",
    strokeStyle: "",
    lineWidth: 1,
    font: "",
    textAlign: "center",
    textBaseline: "middle",
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    fillText: vi.fn(),
  }) as unknown as CanvasRenderingContext2D);
});

describe("WORLD_ROOMS", () => {
  it("defines the requested rooms (training, kitchen, meeting, CTO, toilet)", () => {
    expect(WORLD_ROOMS.map((room) => room.id)).toEqual([
      "training-room",
      "kitchen",
      "meeting-room",
      "cto-office",
      "toilet",
    ]);
  });

  it("keeps every room floor separate from every other room floor", () => {
    for (let i = 0; i < WORLD_ROOMS.length; i += 1) {
      for (let j = i + 1; j < WORLD_ROOMS.length; j += 1) {
        expect(overlaps(WORLD_ROOMS[i]!.floor, WORLD_ROOMS[j]!.floor)).toBe(false);
      }
    }
  });

  it("does not overlap room floors with the main office interior", () => {
    for (const room of WORLD_ROOMS) expect(overlaps(room.floor, OFFICE_BOUNDS)).toBe(false);
  });

  it("makes every doorway at least 2.5 metres wide", () => {
    for (const room of WORLD_ROOMS) {
      for (const doorway of room.doorways) expect(doorway.width).toBeGreaterThanOrEqual(2.5);
    }
  });

  it("places the main office doorways on its north, east, south, and south-toilet edges", () => {
    expect(MAIN_OFFICE_DOORWAYS).toHaveLength(4);
    expect(MAIN_OFFICE_DOORWAYS[0]!.from).toEqual({ minX: -1.25, maxX: 1.25, minZ: -9.5, maxZ: -9 });
    expect(MAIN_OFFICE_DOORWAYS[1]!.from).toEqual({ minX: 9, maxX: 9.5, minZ: -1.25, maxZ: 1.25 });
    expect(MAIN_OFFICE_DOORWAYS[2]!.from).toEqual({ minX: -1.25, maxX: 1.25, minZ: 9, maxZ: 9.5 });
    // L-2026-08-30-01: south-west corner doorway into the new toilet.
    expect(MAIN_OFFICE_DOORWAYS[3]!.from).toEqual({ minX: -9, maxX: -8.5, minZ: 9, maxZ: 9.5 });
  });

  it("marks the CTO glass wall and Batman sign", () => {
    const cto = WORLD_ROOMS.find((room) => room.id === "cto-office")!;
    expect(cto.walls.some((wall) => wall.id === "glass")).toBe(true);
    expect(cto.signs.some((sign) => sign.text.includes("BATMAN"))).toBe(true);
  });

  it("lets the player cross the north doorway", () => {
    const result = applyWithCollision(
      { x: 0, z: -8.8 },
      0.3,
      0,
      -0.6,
      WORLD_BOUNDS,
      [...OBSTACLES, ...WORLD_COLLISION_WALLS],
    );
    expect(result.z).toBeCloseTo(-9.4);
  });

  it("blocks the player at a solid section of the north wall", () => {
    const result = applyWithCollision(
      { x: 3, z: -8.6 },
      0.3,
      0,
      -0.6,
      WORLD_BOUNDS,
      [...OBSTACLES, ...WORLD_COLLISION_WALLS],
    );
    expect(result.z).toBe(-8.6);
  });
});

describe("buildMultiRoomMeshes", () => {
  it("returns and parents one group per room, each with a floor", () => {
    const scene = new THREE.Scene();
    const groups = buildMultiRoomMeshes(scene, WORLD_ROOMS);
    expect(groups).toHaveLength(WORLD_ROOMS.length);
    expect(groups.every((group) => group.children.some((child) => child.userData.kind === "floor"))).toBe(true);
    expect(groups.every((group) => group.parent === scene)).toBe(true);
  });

  it("renders the CTO glass wall with a transparent material", () => {
    const groups = buildMultiRoomMeshes(new THREE.Scene(), WORLD_ROOMS);
    const cto = groups.find((group) => group.name === "cto-office")!;
    const glass = cto.children.find((child) => child.userData.kind === "glass") as THREE.Mesh;
    expect((glass.material as THREE.Material).transparent).toBe(true);
  });

  it("uses a CanvasTexture for every sign", () => {
    const groups = buildMultiRoomMeshes(new THREE.Scene(), WORLD_ROOMS);
    const signMeshes = groups.flatMap((group) => group.children.filter((child) => child.userData.kind === "sign")) as THREE.Mesh[];
    expect(signMeshes).toHaveLength(WORLD_ROOMS.reduce((total, room) => total + room.signs.length, 0));
    for (const mesh of signMeshes) expect((mesh.material as THREE.MeshBasicMaterial).map).toBeInstanceOf(THREE.CanvasTexture);
  });
});
