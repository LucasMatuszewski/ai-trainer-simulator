import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { createNpcMesh } from "../../src/engine/npc-mesh";

describe("female NPC body", () => {
  const female = createNpcMesh("female", 0, "klaudia");

  it("attaches both arms close to the torso", () => {
    expect(Math.abs(female.getObjectByName("arm-left")!.position.x)).toBeGreaterThanOrEqual(0.2);
    expect(Math.abs(female.getObjectByName("arm-left")!.position.x)).toBeLessThanOrEqual(0.24);
    expect(Math.abs(female.getObjectByName("arm-right")!.position.x)).toBeGreaterThanOrEqual(0.2);
    expect(Math.abs(female.getObjectByName("arm-right")!.position.x)).toBeLessThanOrEqual(0.24);
  });

  it("uses a naturally proportioned half-metre torso", () => {
    const body = female.getObjectByName("body") as THREE.Mesh<THREE.BoxGeometry>;
    expect(body.geometry.parameters.width).toBeGreaterThanOrEqual(0.45);
    expect(body.geometry.parameters.width).toBeLessThanOrEqual(0.55);
  });

  it("adds a subtle chest sphere in front of the upper torso", () => {
    const chest = female.getObjectByName("chest") as THREE.Mesh<THREE.SphereGeometry>;
    expect(chest.geometry).toBeInstanceOf(THREE.SphereGeometry);
    expect(chest.geometry.parameters.radius).toBeGreaterThanOrEqual(0.08 * 0.7);
    expect(chest.geometry.parameters.radius).toBeLessThanOrEqual(0.08 * 1.3);
    expect(chest.position.z).toBeGreaterThan(0.2);
  });

  it("uses a darker shade of the NPC shirt color for the chest two-tone effect (L-2026-08-30 missed feedback #110)", () => {
    const chest = female.getObjectByName("chest") as THREE.Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial>;
    const shirt = female.getObjectByName("clothing-shirt") as THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
    expect(shirt).toBeInstanceOf(THREE.Mesh);
    // The chest must be visibly different from the rest of the shirt
    // (a deliberate v-neck accent, not a clipping glitch). The
    // implementation darkens the shirt by 0.7x.
    const chestHex = chest.material.color.getHex();
    const shirtHex = shirt.material.color.getHex();
    expect(chestHex).not.toBe(shirtHex);
    // Spot-check that every channel is at most 0.7x the shirt's.
    for (const shift of [16, 8, 0] as const) {
      const chestChannel = (chestHex >> shift) & 0xff;
      const shirtChannel = (shirtHex >> shift) & 0xff;
      expect(chestChannel).toBeLessThanOrEqual(Math.round(shirtChannel * 0.71));
    }
  });

  it("varies chest size deterministically between female NPCs", () => {
    const radii = ["klaudia", "zosia", "kasia"].map((id) => {
      const chest = createNpcMesh("female", 0, id).getObjectByName("chest") as THREE.Mesh<THREE.SphereGeometry>;
      return chest.geometry.parameters.radius;
    });
    expect(new Set(radii).size).toBeGreaterThan(1);
  });
});
