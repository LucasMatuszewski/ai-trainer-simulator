/**
 * A small houseplant for the kitchen counter (C-36).
 *
 * Brown pot with a green leafy top (a sphere). Sits flat. Origin
 * at floor level, center.
 */
import * as THREE from "three";

const POT = 0x8a4a2a;
const POT_RIM = 0x6a3a1f;
const LEAF = 0x2f8f3f;
const LEAF_DARK = 0x226622;
const SOIL = 0x3a2210;

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

export function makePlantCounter(): THREE.Group {
  const group = new THREE.Group();
  group.name = "plant-counter";

  // Pot.
  group.add(box("plant-pot", [0.18, 0.18, 0.18], new THREE.MeshLambertMaterial({ color: POT }), [0, 0.09, 0]));

  // Pot rim (slightly wider, darker).
  group.add(box("plant-pot-rim", [0.2, 0.025, 0.2], new THREE.MeshLambertMaterial({ color: POT_RIM }), [0, 0.19, 0]));

  // Soil (a dark top surface).
  group.add(box("plant-soil", [0.16, 0.01, 0.16], new THREE.MeshLambertMaterial({ color: SOIL }), [0, 0.2, 0]));

  // Leaves (two spheres for a more leafy look).
  const leafBig = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 10, 8),
    new THREE.MeshLambertMaterial({ color: LEAF }),
  );
  leafBig.name = "plant-leaf-big";
  leafBig.position.set(0, 0.32, 0);
  group.add(leafBig);

  const leafSmall = new THREE.Mesh(
    new THREE.SphereGeometry(0.1, 8, 6),
    new THREE.MeshLambertMaterial({ color: LEAF_DARK }),
  );
  leafSmall.name = "plant-leaf-small";
  leafSmall.position.set(0.05, 0.28, 0.05);
  group.add(leafSmall);

  // A single flower (a small white sphere) for a kitchen-window vibe.
  const flower = new THREE.Mesh(
    new THREE.SphereGeometry(0.025, 6, 4),
    new THREE.MeshBasicMaterial({ color: 0xfafafa }),
  );
  flower.name = "plant-flower";
  flower.position.set(-0.05, 0.42, 0.02);
  group.add(flower);

  return group;
}
