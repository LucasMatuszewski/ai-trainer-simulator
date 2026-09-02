import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { createNpcMesh } from "../../src/engine/npc-mesh";

describe("female NPC body", () => {
  const female = createNpcMesh("female", 0, "klaudia");

  it("attaches both arms close to the torso", () => {
    // 0.28 / y 0.95 since Lucas's 2026-09-01 mesh pass (commit
    // 609816d): arms sit slightly wider and lower than the old
    // 0.24-by-1.05 pose so they read as relaxed, not glued on.
    expect(Math.abs(female.getObjectByName("arm-left")!.position.x)).toBeGreaterThanOrEqual(0.2);
    expect(Math.abs(female.getObjectByName("arm-left")!.position.x)).toBeLessThanOrEqual(0.3);
    expect(Math.abs(female.getObjectByName("arm-right")!.position.x)).toBeGreaterThanOrEqual(0.2);
    expect(Math.abs(female.getObjectByName("arm-right")!.position.x)).toBeLessThanOrEqual(0.3);
  });

  it("uses a naturally proportioned half-metre torso", () => {
    const body = female.getObjectByName("body") as THREE.Mesh<THREE.BoxGeometry>;
    expect(body.geometry.parameters.width).toBeGreaterThanOrEqual(0.45);
    expect(body.geometry.parameters.width).toBeLessThanOrEqual(0.55);
  });

  it("adds two breast spheres in front of the upper torso (L-2026-08-31-01: chest is part of the body model)", () => {
    // L-2026-08-30: Lucas asked for the breast to be the same
    // color/texture as the body, because separate chest boxes
    // with a different color read as "a clipping glitch" or
    // "a colored rectangle on the chest". The chest is now
    // two `bodyMaterial` spheres of the SAME color as the
    // `body` box, so it blends into the torso and looks like
    // part of the same mesh.
    const breasts: THREE.Mesh<THREE.SphereGeometry>[] = [];
    female.traverse((child) => {
      if (child.name === "breast" && child instanceof THREE.Mesh) breasts.push(child);
    });
    expect(breasts).toHaveLength(2);
    for (const breast of breasts) {
      expect(breast.geometry).toBeInstanceOf(THREE.SphereGeometry);
      // 0.18 since Lucas's 2026-09-01 mesh pass (609816d): the chest
      // is smaller and sits closer to the torso than the old 0.21.
      expect(breast.position.z).toBeGreaterThanOrEqual(0.15);
    }
  });

  it("uses the EXACT body color for the breasts (no clipping-glitch different shade; missed feedback #110 + L-2026-08-30)", () => {
    // Per missed feedback #110 and Lucas 2026-08-30, the chest
    // must wear the same color as the rest of the body. The
    // assertion is now "breast color == body color" so the
    // breast reads as part of the same mesh, not a separate
    // plate.
    const body = female.getObjectByName("body") as THREE.Mesh<THREE.BoxGeometry, THREE.MeshLambertMaterial>;
    const breasts: THREE.Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial>[] = [];
    female.traverse((child) => {
      if (child.name === "breast" && child instanceof THREE.Mesh) breasts.push(child as THREE.Mesh<THREE.SphereGeometry, THREE.MeshLambertMaterial>);
    });
    for (const breast of breasts) {
      expect(breast.material.color.getHex()).toBe(body.material.color.getHex());
    }
  });

  it("places the two breasts symmetrically on the X axis (one left, one right)", () => {
    const breasts: THREE.Mesh[] = [];
    female.traverse((child) => {
      if (child.name === "breast" && child instanceof THREE.Mesh) breasts.push(child);
    });
    expect(breasts).toHaveLength(2);
    const xs = breasts.map((b) => b.position.x).sort();
    const [leftX, rightX] = xs as [number, number];
    expect(leftX).toBeLessThan(0);
    expect(rightX).toBeGreaterThan(0);
    expect(Math.abs(leftX + rightX)).toBeLessThan(Number.EPSILON);
  });
});
