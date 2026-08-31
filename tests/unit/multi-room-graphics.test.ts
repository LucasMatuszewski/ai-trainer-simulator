/** @vitest-environment jsdom */

import { beforeAll, describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { WORLD_ROOMS } from "../../src/content/world-layout";
import { buildMultiRoomMeshes } from "../../src/engine/multi-room";
import { configureRendererQuality } from "../../src/engine/renderer";

beforeAll(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

describe("multi-room graphics", () => {
  it("gives every room a ceiling and a local point light", () => {
    const scene = new THREE.Scene();
    const groups = buildMultiRoomMeshes(scene, WORLD_ROOMS);

    expect(groups).toHaveLength(WORLD_ROOMS.length);
    for (const group of groups) {
      const ceiling = group.children.find(
        (child) => child instanceof THREE.Mesh && child.userData.kind === "ceiling" && child.position.y > 2.5,
      );
      expect(ceiling, `${group.name} ceiling`).toBeDefined();
      expect(group.children.some((child) => child instanceof THREE.PointLight)).toBe(true);
    }
  });

  it("mounts a canvas-textured Batman emblem in the CEO office", () => {
    // C-35: the CEO office (formerly the CTO office) is the new
    // home of the Batman emblem. The emblem still uses the same
    // CanvasTexture pipeline.
    const scene = new THREE.Scene();
    const ceoOffice = buildMultiRoomMeshes(scene, WORLD_ROOMS).find((group) => group.name === "ceo-office");
    const emblem = ceoOffice?.children.find(
      (child) => child instanceof THREE.Mesh && child.userData.signType === "batman",
    ) as THREE.Mesh | undefined;

    expect(emblem).toBeDefined();
    expect(emblem?.userData.kind).toBe("sign");
    const material = emblem?.material as THREE.MeshBasicMaterial | undefined;
    expect(material?.map).toBeInstanceOf(THREE.CanvasTexture);
  });

  it("assigns every room a distinct wall color", () => {
    const colors = WORLD_ROOMS.map((room) => room.wallColor);
    expect(colors.every((color) => typeof color === "number")).toBe(true);
    expect(new Set(colors).size).toBe(WORLD_ROOMS.length);
  });

  it("enables soft shadow mapping in the renderer", () => {
    const shadowMap = { enabled: false, type: THREE.BasicShadowMap };
    configureRendererQuality({ shadowMap } as unknown as THREE.WebGLRenderer);
    expect(shadowMap.enabled).toBe(true);
    expect(shadowMap.type).toBe(THREE.PCFSoftShadowMap);
  });
});
