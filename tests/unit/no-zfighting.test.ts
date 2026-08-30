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

describe("multi-room wall depth separation", () => {
  it("separates the training-room south walls from the main-office north wall", () => {
    const mainZ = centerZ(mainWall("main-north-west"));
    expect(Math.abs(centerZ(roomWall("training-room", "training-south-west")) - mainZ)).toBeGreaterThanOrEqual(0.1);
    expect(Math.abs(centerZ(roomWall("training-room", "training-south-east")) - mainZ)).toBeGreaterThanOrEqual(0.1);
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

  it("keeps the CTO west walls distinct from the main-office east wall", () => {
    const mainX = centerX(mainWall("main-east-north"));
    expect(Math.abs(centerX(roomWall("cto-office", "cto-west-north")) - mainX)).toBeGreaterThanOrEqual(0.1);
    expect(Math.abs(centerX(roomWall("cto-office", "cto-west-south")) - mainX)).toBeGreaterThanOrEqual(0.1);
  });

  it("does not overlap the kitchen east wall and CTO west wall volumes", () => {
    const kitchenEast = roomWall("kitchen", "kitchen-east-north");
    const ctoWest = roomWall("cto-office", "cto-west-north");
    expect(kitchenEast.maxX).toBeLessThanOrEqual(ctoWest.minX);
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
