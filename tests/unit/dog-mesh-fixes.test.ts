import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { createNpcMesh } from "../../src/engine/npc-mesh";

describe("dog mesh orientation and parenting", () => {
  it("places the grouped head at the front and the tail at the back", () => {
    const dog = createNpcMesh("dog");
    const head = dog.getObjectByName("head");
    const tail = dog.getObjectByName("tail");

    expect(head).toBeInstanceOf(THREE.Group);
    expect(head?.parent).toBe(dog);
    expect(head?.position.z).toBeGreaterThan(0);
    expect(tail?.position.z).toBeLessThan(0);
  });

  it("keeps the skull, snout, ears, and eyes inside the head group", () => {
    const head = createNpcMesh("dog").getObjectByName("head");
    expect(head).toBeInstanceOf(THREE.Group);

    for (const part of ["head-mesh", "snout", "left-ear", "right-ear", "left-eye", "right-eye"]) {
      expect(head?.getObjectByName(part)?.parent).toBe(head);
    }
  });
});

describe("dog mesh C-53 fixes", () => {
  it("has no red collar poking through the flanks", () => {
    const dog = createNpcMesh("dog");
    let sawRed = false;
    dog.traverse((child) => {
      const material = (child as { material?: { color?: { getHex(): number } } }).material;
      if (material?.color?.getHex() === 0xcc2222) sawRed = true;
    });
    expect(sawRed).toBe(false);
  });

  it("colors all four legs with the body fur material", () => {
    const dog = createNpcMesh("dog");
    const body = dog.getObjectByName("body");
    expect(body).toBeDefined();
    const fur = (body as unknown as { material: { color: { getHex(): number } } }).material;
    for (const leg of ["front-left-leg", "front-right-leg", "back-left-leg", "back-right-leg"]) {
      const mesh = dog.getObjectByName(leg) as unknown as { material: { color: { getHex(): number } } };
      expect(mesh, leg).toBeDefined();
      expect(mesh.material.color.getHex(), leg).toBe(fur.color.getHex());
    }
  });
});
