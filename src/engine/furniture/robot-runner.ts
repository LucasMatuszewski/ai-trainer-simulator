/**
 * Seba, Janusz's mug-running robot (C-70): a small box body with LED
 * eyes and a tray of mugs strapped to its back, running desks-to-
 * dishwasher loops (he "has opinions about the dishwasher" - Janusz's
 * dialogue). Faces +Z. Origin at floor level, center.
 *
 * `userData.setWorking(active)` toggles the loading/unloading bob;
 * `userData.animate(dt, moving)` runs every frame.
 */
import * as THREE from "three";

const BODY = 0xdd8833;
const BODY_DARK = 0xaa661f;
const EYE = 0x66eeff;
const TRAY = 0x8a8f94;
const MUG_COLORS = [0x2244aa, 0xcc3333, 0x33aa55, 0xffcc00];

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

export interface RobotRunnerHandle {
  group: THREE.Group;
  setWorking: (working: boolean) => void;
  animate: (dt: number, moving: boolean) => void;
}

export function makeRobotRunner(): RobotRunnerHandle {
  const group = new THREE.Group();
  group.name = "robot-runner";

  const body = box("runner-body", [0.2, 0.22, 0.24], new THREE.MeshLambertMaterial({ color: BODY }), [0, 0.14, 0]);
  group.add(body);
  group.add(box("runner-body-trim", [0.21, 0.03, 0.25], new THREE.MeshLambertMaterial({ color: BODY_DARK }), [0, 0.02, 0]));

  const eyeMat = new THREE.MeshBasicMaterial({ color: EYE });
  const eyeLeft = box("runner-eye-left", [0.03, 0.03, 0.01], eyeMat, [-0.05, 0.17, 0.121]);
  group.add(eyeLeft);
  const eyeRight = box("runner-eye-right", [0.03, 0.03, 0.01], eyeMat, [0.05, 0.17, 0.121]);
  group.add(eyeRight);

  const wheelMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
  for (const x of [-0.11, 0.11] as const) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.03, 10), wheelMat);
    wheel.name = "runner-wheel";
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, 0.05, 0);
    group.add(wheel);
  }

  // The tray of mugs on the back (-Z side, opposite the eyes).
  const tray = new THREE.Group();
  tray.name = "runner-tray";
  tray.position.set(0, 0.26, -0.08);
  group.add(tray);
  tray.add(box("runner-tray-plate", [0.18, 0.015, 0.16], new THREE.MeshLambertMaterial({ color: TRAY }), [0, 0, 0]));
  const mugPositions: Array<[number, number]> = [
    [-0.05, -0.04],
    [0.05, -0.04],
    [0, 0.04],
  ];
  mugPositions.forEach(([mx, mz], i) => {
    const mug = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.022, 0.04, 8),
      new THREE.MeshLambertMaterial({ color: MUG_COLORS[i % MUG_COLORS.length]! }),
    );
    mug.name = "runner-mug";
    mug.position.set(mx, 0.028, mz);
    tray.add(mug);
  });

  let working = false;
  let clock = 0;

  function setWorking(next: boolean): void {
    working = next;
  }

  function animate(dt: number, moving: boolean): void {
    clock += dt;
    if (working) {
      // A little "loading the tray" bob.
      tray.position.y = 0.26 + Math.sin(clock * 5) * 0.01;
      body.position.y = 0.14 - Math.abs(Math.sin(clock * 5)) * 0.005;
    } else {
      tray.position.y = 0.26;
      body.position.y = 0.14;
    }
    if (moving) {
      // Eyes flicker very subtly while rolling, for a bit of life.
      const flicker = 0.8 + Math.sin(clock * 20) * 0.2;
      eyeLeft.scale.setScalar(flicker);
      eyeRight.scale.setScalar(flicker);
    }
  }

  return { group, setWorking, animate };
}
