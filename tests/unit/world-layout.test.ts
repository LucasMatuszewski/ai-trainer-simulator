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
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
    measureText: vi.fn((text: string) => ({ width: text.length * 20 })),
  }) as unknown as CanvasRenderingContext2D);
});

describe("WORLD_ROOMS", () => {
  it("defines the requested rooms (CEO, kitchen, training, meeting, toilet)", () => {
    // C-35: the room order changed in 2026-08-31. The CEO office
    // moved into the former training room footprint (north of the
    // main office), and the training room moved into the former
    // CEO office footprint (east of the kitchen). The
    // "cto-office" id is no longer used; it was renamed to
    // "ceo-office" to match the project's PRD.
    expect(WORLD_ROOMS.map((room) => room.id)).toEqual([
      "ceo-office",
      "kitchen",
      "training-room",
      "meeting-room",
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

  it("places the main office doorways on its north, east, and south edges", () => {
    // C-57 (2026-09-01): the toilet door moved off the main office.
    // The main office now has only 3 doorways: CEO (north), kitchen
    // (east), and meeting room (south). The toilet is reached from
    // the kitchen, not the main office.
    expect(MAIN_OFFICE_DOORWAYS).toHaveLength(3);
    expect(MAIN_OFFICE_DOORWAYS[0]!.from).toEqual({ minX: -1.25, maxX: 1.25, minZ: -9.5, maxZ: -9 });
    expect(MAIN_OFFICE_DOORWAYS[1]!.from).toEqual({ minX: 9, maxX: 9.5, minZ: -1.25, maxZ: 1.25 });
    expect(MAIN_OFFICE_DOORWAYS[2]!.from).toEqual({ minX: -1.25, maxX: 1.25, minZ: 9, maxZ: 9.5 });
  });

  it("marks the CEO glass walls and Batman sign", () => {
    // C-44: the CEO office has THREE glass walls - two south
    // segments facing the main office (split around the doorway)
    // and one east segment facing the internal garden. The huge
    // Batman sign is on the north accent wall facing south.
    const ceo = WORLD_ROOMS.find((room) => room.id === "ceo-office")!;
    expect(ceo.walls.filter((wall) => wall.id === "glass")).toHaveLength(3);
    expect(ceo.signs.some((sign) => sign.text.includes("BATMAN"))).toBe(true);
    // The north wall is an accent wall with a different color.
    const north = ceo.walls.find((wall) => wall.id === "ceo-north")!;
    expect(north.accentColor).toBeDefined();
    expect(north.accentColor).not.toBe(ceo.wallColor);
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

  it("renders the CEO glass walls with a transparent material", () => {
    // C-44: the CEO office has three glass wall segments (two
    // south + one east), all rendered with the transparent
    // glass material.
    const groups = buildMultiRoomMeshes(new THREE.Scene(), WORLD_ROOMS);
    const ceo = groups.find((group) => group.name === "ceo-office")!;
    const glassMeshes = ceo.children.filter(
      (child) => child.userData.kind === "glass",
    ) as THREE.Mesh[];
    expect(glassMeshes).toHaveLength(3);
    for (const glass of glassMeshes) {
      expect((glass.material as THREE.Material).transparent).toBe(true);
    }
  });

  it("uses a CanvasTexture for every sign", () => {
    const groups = buildMultiRoomMeshes(new THREE.Scene(), WORLD_ROOMS);
    const signMeshes = groups.flatMap((group) => group.children.filter((child) => child.userData.kind === "sign")) as THREE.Mesh[];
    expect(signMeshes).toHaveLength(WORLD_ROOMS.reduce((total, room) => total + room.signs.length, 0));
    for (const mesh of signMeshes) expect((mesh.material as THREE.MeshBasicMaterial).map).toBeInstanceOf(THREE.CanvasTexture);
  });
});
