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

  it("uses the EXACT shirt color for the chest (no clipping-glitch darker shade; missed feedback #110 + Lucas 2026-08-30)", () => {
    // Lucas explicitly asked for the chest to be the same color
    // as the rest of the body/shirt. The earlier 'two-tone'
    // implementation made the chest a darker shade, but he
    // read that as a clipping glitch. The fix: chest wears the
    // EXACT same color as the NPC's `shirtColor` (the bright
    // SHIRT_COLORS palette value), so when no clothing-shirt is
    // added, the chest reads as part of the shirt. When the
    // clothing-shirt is added (50% of NPCs), it sits ON TOP of
    // the chest in the same color, so the chest never appears
    // as a darker patch.
    const chest = female.getObjectByName("chest") as THREE.Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial>;
    const shirt = female.getObjectByName("clothing-shirt") as THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
    expect(shirt).toBeInstanceOf(THREE.Mesh);
    // Chest and clothing-shirt use the SAME color.
    expect(chest.material.color.getHex()).toBe(shirt.material.color.getHex());
  });

  it("varies chest size deterministically between female NPCs", () => {
    const radii = ["klaudia", "zosia", "kasia"].map((id) => {
      const chest = createNpcMesh("female", 0, id).getObjectByName("chest") as THREE.Mesh<THREE.SphereGeometry>;
      return chest.geometry.parameters.radius;
    });
    expect(new Set(radii).size).toBeGreaterThan(1);
  });
});
