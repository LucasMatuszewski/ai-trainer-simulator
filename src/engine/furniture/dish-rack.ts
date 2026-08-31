/**
 * A standalone dish rack for the kitchen (C-36).
 *
 * Chrome frame with three plates (white, blue, green), a cup, and
 * a small cutlery holder. Faces +Z. Origin at floor level, center.
 */
import * as THREE from "three";

const FRAME = 0xc0c4c8;
const FRAME_DARK = 0x80858b;
const PLATE_WHITE = 0xeae6d8;
const PLATE_BLUE = 0x4f6a8a;
const PLATE_GREEN = 0x4f8a64;
const CUP = 0xc8442c;

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

export function makeDishRack(): THREE.Group {
  const group = new THREE.Group();
  group.name = "dish-rack";

  // Bottom tray.
  group.add(box("rack-tray", [0.5, 0.025, 0.4], new THREE.MeshLambertMaterial({ color: FRAME_DARK }), [0, 0.013, 0]));

  // Side rails (left and right).
  group.add(box("rack-rail-l", [0.02, 0.18, 0.4], new THREE.MeshLambertMaterial({ color: FRAME }), [-0.24, 0.11, 0]));
  group.add(box("rack-rail-r", [0.02, 0.18, 0.4], new THREE.MeshLambertMaterial({ color: FRAME }), [0.24, 0.11, 0]));

  // Plate dividers (vertical bars in the middle).
  for (let i = 0; i < 3; i++) {
    group.add(box(`rack-divider-${i}`, [0.01, 0.16, 0.4], new THREE.MeshLambertMaterial({ color: FRAME }), [-0.13 + i * 0.13, 0.1, 0]));
  }

  // Top rail (where plates rest against).
  group.add(box("rack-top-rail", [0.5, 0.015, 0.02], new THREE.MeshLambertMaterial({ color: FRAME }), [0, 0.2, 0.18]));

  // Three plates in the rack.
  const colors = [PLATE_WHITE, PLATE_BLUE, PLATE_GREEN];
  for (let i = 0; i < 3; i++) {
    const plate = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 0.01, 16),
      new THREE.MeshLambertMaterial({ color: colors[i] }),
    );
    plate.name = `rack-plate-${i}`;
    plate.position.set(-0.13 + i * 0.13, 0.16, -0.05);
    plate.rotation.x = 0.05; // slightly tilted back to rest against the top rail
    group.add(plate);
  }

  // A red cup at the end.
  const cup = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.04, 0.1, 10),
    new THREE.MeshLambertMaterial({ color: CUP }),
  );
  cup.name = "rack-cup";
  cup.position.set(0.18, 0.07, -0.05);
  group.add(cup);

  // A cutlery holder (a small box on the right).
  group.add(box("rack-cutlery-box", [0.1, 0.1, 0.1], new THREE.MeshLambertMaterial({ color: 0x3a3a3a }), [0.18, 0.075, 0.12]));

  return group;
}
