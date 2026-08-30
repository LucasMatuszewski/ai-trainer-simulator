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
