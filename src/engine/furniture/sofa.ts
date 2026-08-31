/**
 * A leather sofa for the CEO office meeting corner
 * (L-2026-08-31-04 #8). Faces +Z by default; rotate for wall
 * placement.
 */
import * as THREE from "three";

const LEATHER_BASE = 0x4a3226;
const LEATHER_CUSHION = 0x57392b;
const WOOD = 0x2e2018;

function box(
  name: string,
  dimensions: [number, number, number],
  material: THREE.Material,
  position: [number, number, number],
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...dimensions), material);
  mesh.name = name;
  mesh.position.set(...position);
  return mesh;
}

export function makeSofa(): THREE.Group {
  const group = new THREE.Group();
  group.name = "sofa";

  const base = new THREE.MeshLambertMaterial({ color: LEATHER_BASE });
  const cushion = new THREE.MeshLambertMaterial({ color: LEATHER_CUSHION });

  // Base and legs.
  group.add(box("sofa-base", [2.2, 0.32, 0.9], base, [0, 0.26, 0]));
  for (const [x, z] of [[-1.0, 0.35], [1.0, 0.35], [-1.0, -0.35], [1.0, -0.35]] as const) {
    group.add(box("sofa-leg", [0.08, 0.1, 0.08], new THREE.MeshLambertMaterial({ color: WOOD }), [x, 0.05, z]));
  }

  // Two seat cushions + two back cushions.
  group.add(box("sofa-seat-left", [1.02, 0.14, 0.82], cushion, [-0.53, 0.49, 0.03]));
  group.add(box("sofa-seat-right", [1.02, 0.14, 0.82], cushion, [0.53, 0.49, 0.03]));
  group.add(box("sofa-back-left", [1.02, 0.52, 0.18], cushion, [-0.53, 0.72, -0.36]));
  group.add(box("sofa-back-right", [1.02, 0.52, 0.18], cushion, [0.53, 0.72, -0.36]));

  // Armrests.
  group.add(box("sofa-arm-left", [0.18, 0.5, 0.9], base, [-1.1, 0.55, 0]));
  group.add(box("sofa-arm-right", [0.18, 0.5, 0.9], base, [1.1, 0.55, 0]));

  return group;
}
