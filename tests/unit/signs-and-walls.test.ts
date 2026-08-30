// @vitest-environment jsdom

import * as THREE from "three";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { OFFICE_BOUNDS } from "../../src/content/npcs";
import { MAIN_OFFICE_DOORWAYS } from "../../src/content/world-layout";
import { makeWallTexture } from "../../src/engine/multi-room";
import { SHIP_IT_SIGN_MOUNT } from "../../src/engine/scene";

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
});
