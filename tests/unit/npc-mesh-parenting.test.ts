import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { createNpcMesh } from "../../src/engine/npc-mesh";

describe("humanoid head parenting", () => {
  it.each([
    ["male", "hair"],
    ["female", "hair-back"],
  ] as const)("parents the %s face and hair to the head", (gender, hairName) => {
    const head = createNpcMesh(gender).getObjectByName("head");
    expect(head).toBeInstanceOf(THREE.Group);
    for (const part of ["head-mesh", "left-eye", "right-eye", hairName]) {
      expect(head?.getObjectByName(part)?.parent).toBe(head);
    }
  });

  it("moves a humanoid eye in world space when the head moves", () => {
    const npc = createNpcMesh("male");
    const head = npc.getObjectByName("head")!;
    const eye = npc.getObjectByName("left-eye")!;
    const before = eye.getWorldPosition(new THREE.Vector3());

    head.position.y += 0.1;
    npc.updateMatrixWorld(true);
    const after = eye.getWorldPosition(new THREE.Vector3());

    expect(after.y - before.y).toBeCloseTo(0.1);
  });

  it("does not add a separate breast object to a male NPC", () => {
    expect(createNpcMesh("male", 0, "bartek").getObjectByName("breast")).toBeUndefined();
  });

  it("adds two breasts to a female NPC (left + right)", () => {
    const breasts: THREE.Object3D[] = [];
    createNpcMesh("female", 0, "klaudia").traverse((child) => {
      if (child.name === "breast") breasts.push(child);
    });
    expect(breasts).toHaveLength(2);
  });

  it("does not add a clothing-shirt object to a female NPC", () => {
    const shirts: THREE.Object3D[] = [];
    createNpcMesh("female", 0, "klaudia").traverse((child) => {
      if (child.name === "clothing-shirt") shirts.push(child);
    });
    expect(shirts).toHaveLength(0);
  });
});
