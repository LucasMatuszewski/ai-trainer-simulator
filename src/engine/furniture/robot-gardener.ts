/**
 * Halina, Janusz's gardening robot (C-70): a small wheeled base
 * carrying a two-joint arm ending in shears, plus a coiled hose to a
 * water tank on the back. Faces +Z (the arm reaches forward). Origin
 * at floor level, center.
 *
 * `userData.setWorking(active)` toggles the watering/shearing bob
 * animation; `userData.animate(dt, moving)` runs every frame.
 */
import * as THREE from "three";

const CHASSIS = 0x3b7a3f;
const CHASSIS_DARK = 0x275026;
const TANK = 0x7fb3d5;
const ARM = 0x555a5f;
const SHEARS = 0xc8c8c8;
const WHEEL = 0x1a1a1a;

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

export interface RobotGardenerHandle {
  group: THREE.Group;
  setWorking: (working: boolean) => void;
  animate: (dt: number, moving: boolean) => void;
}

export function makeRobotGardener(): RobotGardenerHandle {
  const group = new THREE.Group();
  group.name = "robot-gardener";

  const chassisMat = new THREE.MeshLambertMaterial({ color: CHASSIS });
  group.add(box("gardener-chassis", [0.22, 0.1, 0.3], chassisMat, [0, 0.09, 0]));
  group.add(box("gardener-chassis-trim", [0.24, 0.02, 0.32], new THREE.MeshLambertMaterial({ color: CHASSIS_DARK }), [0, 0.145, 0]));

  const wheelMat = new THREE.MeshLambertMaterial({ color: WHEEL });
  for (const [x, z] of [[-0.1, 0.1], [0.1, 0.1], [-0.1, -0.1], [0.1, -0.1]] as const) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.03, 10), wheelMat);
    wheel.name = "gardener-wheel";
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, 0.045, z);
    group.add(wheel);
  }

  // Water tank on the back (-Z side).
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 10), new THREE.MeshLambertMaterial({ color: TANK }));
  tank.name = "gardener-tank";
  tank.position.set(0, 0.18, -0.1);
  group.add(tank);

  // Two-joint arm reaching forward (+Z), pivoted at the front of the
  // chassis so it swings up/down while working.
  const shoulder = new THREE.Group();
  shoulder.name = "gardener-shoulder";
  shoulder.position.set(0, 0.15, 0.12);
  group.add(shoulder);

  const upperArm = box("gardener-upper-arm", [0.03, 0.03, 0.14], new THREE.MeshLambertMaterial({ color: ARM }), [0, 0, 0.07]);
  shoulder.add(upperArm);

  const elbow = new THREE.Group();
  elbow.name = "gardener-elbow";
  elbow.position.set(0, 0, 0.14);
  shoulder.add(elbow);

  const forearm = box("gardener-forearm", [0.025, 0.025, 0.12], new THREE.MeshLambertMaterial({ color: ARM }), [0, 0, 0.06]);
  elbow.add(forearm);

  // Shears at the tip: two thin blades in a slight V.
  const shearsGroup = new THREE.Group();
  shearsGroup.name = "gardener-shears";
  shearsGroup.position.set(0, 0, 0.12);
  elbow.add(shearsGroup);
  const bladeMat = new THREE.MeshLambertMaterial({ color: SHEARS });
  const bladeLeft = box("gardener-blade-left", [0.008, 0.008, 0.06], bladeMat, [-0.012, 0, 0.03]);
  bladeLeft.rotation.y = 0.15;
  shearsGroup.add(bladeLeft);
  const bladeRight = box("gardener-blade-right", [0.008, 0.008, 0.06], bladeMat, [0.012, 0, 0.03]);
  bladeRight.rotation.y = -0.15;
  shearsGroup.add(bladeRight);

  // Coiled hose from the tank toward the shears (a simple bent tube
  // suggestion via two thin boxes).
  const hoseMat = new THREE.MeshLambertMaterial({ color: 0x2a6ea5 });
  group.add(box("gardener-hose-a", [0.015, 0.015, 0.1], hoseMat, [0, 0.16, -0.02]));

  let working = false;
  let clock = 0;

  function setWorking(next: boolean): void {
    working = next;
    if (!working) {
      shoulder.rotation.x = 0;
      shearsGroup.rotation.z = 0;
    }
  }

  function animate(dt: number, moving: boolean): void {
    clock += dt;
    if (working) {
      // Arm bobs up/down (watering) with a shear snip overlay.
      shoulder.rotation.x = -0.25 + Math.sin(clock * 3) * 0.12;
      shearsGroup.rotation.z = Math.sin(clock * 6) * 0.3;
    } else if (moving) {
      // A gentle idle sway while trundling between plants.
      shoulder.rotation.x = Math.sin(clock * 4) * 0.03;
    }
  }

  return { group, setWorking, animate };
}
