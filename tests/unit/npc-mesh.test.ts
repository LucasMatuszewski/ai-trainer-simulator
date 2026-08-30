import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { createNpcMesh } from "../../src/engine/npc-mesh";

function namedMesh(group: THREE.Group, name: string): THREE.Mesh {
  const mesh = group.getObjectByName(name);
  expect(mesh).toBeInstanceOf(THREE.Mesh);
  return mesh as THREE.Mesh;
}

function boxDimensions(mesh: THREE.Mesh): THREE.BoxGeometry["parameters"] {
  expect(mesh.geometry).toBeInstanceOf(THREE.BoxGeometry);
  return (mesh.geometry as THREE.BoxGeometry).parameters;
}

describe("createNpcMesh", () => {
  it("creates a male group with at least the original nine body-part meshes", () => {
    const male = createNpcMesh("male");
    expect(male).toBeInstanceOf(THREE.Group);
    expect(male.children.length).toBeGreaterThanOrEqual(9);
  });

  it("gives the female body narrower shoulders than the male body", () => {
    const maleBody = namedMesh(createNpcMesh("male"), "body");
    const femaleBody = namedMesh(createNpcMesh("female"), "body");
    expect(femaleBody.material).toBeInstanceOf(THREE.MeshLambertMaterial);
    expect(boxDimensions(femaleBody).width).toBeLessThan(boxDimensions(maleBody).width);
  });

  it("gives both humanoid silhouettes a head, body, two legs, and two eyes", () => {
    for (const gender of ["male", "female"] as const) {
      const group = createNpcMesh(gender);
      for (const part of ["head", "body", "left-leg", "right-leg", "left-eye", "right-eye"]) {
        expect(namedMesh(group, part)).toBeDefined();
      }
    }
  });

  it("creates a wide dog body and four separate legs", () => {
    const dog = createNpcMesh("dog");
    const dogBody = namedMesh(dog, "body");
    const legs = dog.children.filter((child) => child.name.endsWith("-leg"));
    expect(dog).toBeInstanceOf(THREE.Group);
    expect(dog.children.length).toBeGreaterThanOrEqual(6);
    expect(boxDimensions(dogBody).width).toBeGreaterThan(0.7);
    expect(legs).toHaveLength(4);
  });

  it("uses a dog head rather than human head proportions", () => {
    const dogHead = boxDimensions(namedMesh(createNpcMesh("dog"), "head"));
    expect(dogHead.width).toBeLessThan(0.6);
    expect(dogHead.height).toBeLessThan(0.6);
    expect(dogHead.depth).toBeLessThan(0.6);
  });

  it("keeps every mesh origin at floor level or above", () => {
    for (const gender of ["male", "female", "dog"] as const) {
      const bounds = new THREE.Box3().setFromObject(createNpcMesh(gender));
      expect(bounds.min.y).toBeGreaterThanOrEqual(-Number.EPSILON * 1e8);
    }
  });
});
