// @vitest-environment jsdom

import * as THREE from "three";
import { beforeAll, describe, expect, it, vi } from "vitest";
import {
  MAIN_OFFICE_FILE_CABINETS,
  MAIN_OFFICE_SERVER_RACK_ROTATION_Y,
  OBSTACLES,
  OFFICE_BOUNDS,
} from "../../src/content/npcs";
import { WORLD_ROOMS } from "../../src/content/world-layout";
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
  }) as unknown as CanvasRenderingContext2D);
});

describe("furniture orientation", () => {
  it("turns east-wall filing cabinet drawer fronts west into the office", () => {
    for (const cabinet of MAIN_OFFICE_FILE_CABINETS) {
      // Drawer fronts are local +Z; -pi/2 maps that direction to world -X.
      const front = new THREE.Vector3(0, 0, 1).applyAxisAngle(
        new THREE.Vector3(0, 1, 0),
        cabinet.rotationY,
      );
      expect(front.x).toBeCloseTo(-1);
      expect(front.z).toBeCloseTo(0);
    }
  });

  it("keeps the server rack in the south-west corner with its front facing north", () => {
    const rack = OBSTACLES.find((obstacle) => obstacle.id === "server-rack")!;
    expect(rack.minX - OFFICE_BOUNDS.minX).toBeLessThanOrEqual(0.5);
    expect(OFFICE_BOUNDS.maxZ - rack.maxZ).toBeLessThanOrEqual(0.5);

    const front = new THREE.Vector3(0, 0, 1).applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      MAIN_OFFICE_SERVER_RACK_ROTATION_Y,
    );
    expect(front.z).toBeCloseTo(-1);
  });

  it("mounts the whiteboard at chest height, inside and flush with the training room", () => {
    const trainingRoom = WORLD_ROOMS.find((room) => room.id === "training-room")!;
    const definition = trainingRoom.furniture.find((item) => item.type === "whiteboard")!;
    const [x, y, z] = definition.position;
    const [width] = definition.size!;

    // C-35: the training room moved east of the kitchen. Its west
    // wall volume is inset from the floor edge (the floor extends
    // under the doorway), so flushness is checked against the
    // wall's INNER face (maxX of the west wall), not floor.minX.
    const westWall = trainingRoom.walls.find((wall) => wall.id === "training-west-north")!;

    expect(y).toBeGreaterThanOrEqual(0.5);
    expect(y).toBeLessThanOrEqual(2.5);
    expect(x).toBeGreaterThanOrEqual(trainingRoom.floor.minX);
    expect(x).toBeLessThanOrEqual(trainingRoom.floor.maxX);
    expect(z).toBeGreaterThanOrEqual(trainingRoom.floor.minZ);
    expect(z).toBeLessThanOrEqual(trainingRoom.floor.maxZ);
    expect(x - width / 2).toBeCloseTo(westWall.maxX);
    expect(x).toBeGreaterThan(westWall.maxX);

    const group = buildMultiRoomMeshes(new THREE.Scene(), [trainingRoom])[0]!;
    const mesh = group.children.find((child) => child.name === "furniture-whiteboard")!;
    expect(mesh.position.toArray()).toEqual([x, y, z]);
  });
});
