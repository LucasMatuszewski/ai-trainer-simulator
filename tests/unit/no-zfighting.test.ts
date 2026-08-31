// @vitest-environment jsdom

import * as THREE from "three";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { MAIN_OFFICE_WALLS, WORLD_ROOMS, type WorldWall } from "../../src/content/world-layout";
import { buildMultiRoomMeshes } from "../../src/engine/multi-room";

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
    beginPath: vi.fn(),
    ellipse: vi.fn(),
    fill: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
    measureText: vi.fn((text: string) => ({ width: text.length * 20 })),
  }) as unknown as CanvasRenderingContext2D);
});

function centerX(wall: WorldWall): number {
  return (wall.minX + wall.maxX) / 2;
}

function centerZ(wall: WorldWall): number {
  return (wall.minZ + wall.maxZ) / 2;
}

function roomWall(roomId: string, wallId: string): WorldWall {
  const room = WORLD_ROOMS.find((candidate) => candidate.id === roomId);
  const wall = room?.walls.find((candidate) => candidate.id === wallId);
  if (!wall) throw new Error(`Missing wall ${roomId}/${wallId}`);
  return wall;
}

function mainWall(wallId: string): WorldWall {
  const wall = MAIN_OFFICE_WALLS.find((candidate) => candidate.id === wallId);
  if (!wall) throw new Error(`Missing main-office wall ${wallId}`);
  return wall;
}

describe("no two world walls share a volume", () => {
  // L-2026-08-31 (#47): the kitchen's east wall overlapped the
  // training room's south wall in the doorway corner cube and
  // z-fought (blue vs green). This general check catches that
  // whole bug class: every pair of walls (main office + every
  // room) may TOUCH on a face but must never overlap in both x
  // and z.
  it("keeps every wall pair volume-disjoint", () => {
    const allWalls = [...MAIN_OFFICE_WALLS, ...WORLD_ROOMS.flatMap((room) => room.walls)];
    const normalize = (wall: WorldWall) => ({
      id: wall.id,
      minX: Math.min(wall.minX, wall.maxX),
      maxX: Math.max(wall.minX, wall.maxX),
      minZ: Math.min(wall.minZ, wall.maxZ),
      maxZ: Math.max(wall.minZ, wall.maxZ),
    });
    const walls = allWalls.map(normalize);
    for (let i = 0; i < walls.length; i += 1) {
      for (let j = i + 1; j < walls.length; j += 1) {
        const a = walls[i]!;
        const b = walls[j]!;
        const overlapsX = a.minX < b.maxX && b.minX < a.maxX;
        const overlapsZ = a.minZ < b.maxZ && b.minZ < a.maxZ;
        expect(
          !(overlapsX && overlapsZ),
          `${a.id} overlaps ${b.id} (${JSON.stringify(a)} vs ${JSON.stringify(b)})`,
        ).toBe(true);
      }
    }
  });
});

describe("multi-room wall depth separation", () => {
  it("uses the CEO south glass as the only wall on the main-office north boundary", () => {
    // C-44 #5: the solid main-office north segments that covered
    // the CEO glass are gone. The boundary is now the CEO
    // office's own south glass; only the two corner strips
    // beyond the CEO side walls remain solid on the main shell.
    const ceo = WORLD_ROOMS.find((room) => room.id === "ceo-office")!;
    // South boundary glass: inside the boundary band z=[-9.5,-9.2]
    // AND within the CEO office's x span [-8, 8] (excludes the
    // east garden glass, which also reaches z=-9.5).
    const southGlass = ceo.walls.filter(
      (wall) => wall.id === "glass" && wall.maxZ <= -9.2 && wall.minX >= -8 && wall.maxX <= 8,
    );
    expect(southGlass).toHaveLength(2);
    expect(MAIN_OFFICE_WALLS.some((wall) => wall.id === "main-north-far-west")).toBe(true);
    expect(MAIN_OFFICE_WALLS.some((wall) => wall.id === "main-north-far-east")).toBe(true);
    // The corner strips share no x-range with the glass (which
    // spans x=[-8, 8] with the doorway gap).
    for (const corner of ["main-north-far-west", "main-north-far-east"]) {
      const solid = mainWall(corner);
      for (const glass of southGlass) {
        expect(solid.minX >= glass.maxX || solid.maxX <= glass.minX).toBe(true);
      }
    }
  });

  it("separates the meeting-room north walls from the main-office south wall", () => {
    const mainZ = centerZ(mainWall("main-south-west"));
    expect(Math.abs(centerZ(roomWall("meeting-room", "meeting-north-west")) - mainZ)).toBeGreaterThanOrEqual(0.1);
    expect(Math.abs(centerZ(roomWall("meeting-room", "meeting-north-east")) - mainZ)).toBeGreaterThanOrEqual(0.1);
  });

  it("separates the kitchen west walls from the main-office east wall", () => {
    const mainX = centerX(mainWall("main-east-north"));
    expect(Math.abs(centerX(roomWall("kitchen", "kitchen-west-north")) - mainX)).toBeGreaterThanOrEqual(0.1);
    expect(Math.abs(centerX(roomWall("kitchen", "kitchen-west-south")) - mainX)).toBeGreaterThanOrEqual(0.1);
  });

  it("keeps the training-room west glass distinct from the kitchen east wall", () => {
    // L-2026-08-31 (#46): the training room's west glass sits in
    // the SAME x band as the kitchen's east wall (x=[19, 19.5])
    // so there is no pocket between them. They must share no
    // volume: the z ranges are disjoint (glass z=[-19, -7],
    // kitchen east wall z=[-3, 7]).
    const kitchenEast = roomWall("kitchen", "kitchen-east");
    // The training room has two glass walls (east outdoor view +
    // west garden view); select the WEST one by its minX.
    const westGlass = WORLD_ROOMS.find((room) => room.id === "training-room")!
      .walls.filter((entry) => entry.id === "glass")
      .reduce((west, entry) => (entry.minX < west.minX ? entry : west));
    const trainingGlass = westGlass;
    expect(trainingGlass.minX).toBeCloseTo(kitchenEast.minX, 5);
    expect(trainingGlass.maxX).toBeCloseTo(kitchenEast.maxX, 5);
    expect(
      kitchenEast.minZ >= trainingGlass.maxZ || kitchenEast.maxZ <= trainingGlass.minZ,
      "kitchen east wall and training glass must not overlap in z",
    ).toBe(true);
  });

  it("adds a positive polygon offset to every solid new-room wall material", () => {
    const groups = buildMultiRoomMeshes(new THREE.Scene(), WORLD_ROOMS);
    const walls = groups.flatMap((group) =>
      group.children.filter((child) => child instanceof THREE.Mesh && child.userData.kind === "wall"),
    ) as THREE.Mesh[];

    expect(walls.length).toBeGreaterThan(0);
    for (const wall of walls) {
      const material = wall.material as THREE.Material;
      expect(material.polygonOffset, wall.name).toBe(true);
      expect(material.polygonOffsetFactor, wall.name).toBeGreaterThan(0);
      expect(material.polygonOffsetUnits, wall.name).toBeGreaterThan(0);
    }
  });
});
