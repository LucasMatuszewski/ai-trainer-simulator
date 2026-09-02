// @vitest-environment jsdom

import * as THREE from "three";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { OFFICE_BOUNDS } from "../../src/content/npcs";
import { MAIN_OFFICE_DOORWAYS, WORLD_ROOMS } from "../../src/content/world-layout";
import { makeWallTexture } from "../../src/engine/multi-room";
import { DOOR_SIGN_MOUNTS, SHIP_IT_SIGN_MOUNT } from "../../src/engine/scene";

beforeAll(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
    fillStyle: "",
    fillRect: vi.fn(),
  } as unknown as CanvasRenderingContext2D);
});

describe("sign and wall artifact fixes", () => {
  it("mounts the SHIP IT sign on the south wall to the right of the meeting-room doorway", () => {
    const [x, y, z] = SHIP_IT_SIGN_MOUNT.position;
    const doorway = MAIN_OFFICE_DOORWAYS[2]!.from;

    expect(x).toBeGreaterThan(doorway.maxX);
    expect(y).toBeCloseTo(2);
    expect(z).toBeCloseTo(OFFICE_BOUNDS.maxZ - 0.16);
    expect(SHIP_IT_SIGN_MOUNT.face).toBeCloseTo(Math.PI);
  });

  it("anchors repeating sRGB wall texture coordinates to each wall mesh", () => {
    const texture = makeWallTexture(0xc4a87a, 5);

    expect(texture.wrapS).toBe(THREE.RepeatWrapping);
    expect(texture.wrapT).toBe(THREE.RepeatWrapping);
    expect(texture.repeat.x).toBeGreaterThan(0);
    expect(texture.repeat.y).toBeGreaterThan(0);
    expect(texture.colorSpace).toBe(THREE.SRGBColorSpace);
  });

  it("mounts the Kitchen sign on the east wall right of the doorway (C-60)", () => {
    const mount = DOOR_SIGN_MOUNTS.kitchen;
    const doorway = MAIN_OFFICE_DOORWAYS[1]!.from;

    expect(mount.text).toBe("Kitchen");
    expect(mount.position[0]).toBeCloseTo(OFFICE_BOUNDS.maxX - 0.16);
    // Right of the door when facing it (south side), clear of the gap.
    expect(mount.position[2] - 0.8).toBeGreaterThan(doorway.maxZ);
    expect(mount.face).toBeCloseTo(-Math.PI / 2);
  });

  it("renames the main-office south doorway for the C-64 reception", () => {
    const mount = DOOR_SIGN_MOUNTS.meeting;
    const doorway = MAIN_OFFICE_DOORWAYS[2]!.from;

    expect(mount.text).toBe("Reception");
    expect(mount.position[2]).toBeCloseTo(OFFICE_BOUNDS.maxZ - 0.16);
    // Right of the door when facing it (west side), clear of the gap.
    expect(mount.position[0] + 0.8).toBeLessThan(doorway.minX);
    expect(mount.face).toBeCloseTo(Math.PI);
  });

  it("owns the kitchen Meeting Room sign in WORLD_ROOMS exactly once", () => {
    expect("kitchenMeeting" in DOOR_SIGN_MOUNTS).toBe(false);
    const signs = WORLD_ROOMS.flatMap((room) => room.signs)
      .filter((sign) => sign.text === "MEETING ROOM");
    expect(signs).toHaveLength(1);
    expect(signs[0]).toEqual(expect.objectContaining({ position: [12.9, 2.1, 7], face: Math.PI }));
  });
});
