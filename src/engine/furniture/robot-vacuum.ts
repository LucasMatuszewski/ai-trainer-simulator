/**
 * Zdzislaw, Janusz's vacuum robot (C-70): a round, flat, white disc,
 * roomba-style. A soft grey bumper ring, a status LED that blinks
 * while working, and two spinning side brushes for the "hovering
 * across the floor" read. Faces +Z. Origin at floor level, center.
 *
 * `userData.setWorking(active)` toggles the working animation from
 * the brain wrapper; `userData.animate(dt, moving)` runs every frame.
 */
import * as THREE from "three";

const BODY = 0xf2f2ee;
const BODY_SHADE = 0xd8d8d2;
const BUMPER = 0x9aa0a6;
const LED_IDLE = 0x336699;
const LED_WORK = 0x33cc55;
const BRUSH = 0x2a2a2a;

export interface RobotVacuumHandle {
  group: THREE.Group;
  setWorking: (working: boolean) => void;
  animate: (dt: number, moving: boolean) => void;
}

export function makeRobotVacuum(): RobotVacuumHandle {
  const group = new THREE.Group();
  group.name = "robot-vacuum";

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.09, 20),
    new THREE.MeshLambertMaterial({ color: BODY }),
  );
  body.name = "vacuum-body";
  body.position.set(0, 0.05, 0);
  group.add(body);

  const shade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.185, 0.185, 0.02, 20),
    new THREE.MeshLambertMaterial({ color: BODY_SHADE }),
  );
  shade.name = "vacuum-shade-ring";
  shade.position.set(0, 0.005, 0);
  group.add(shade);

  const bumper = new THREE.Mesh(
    new THREE.TorusGeometry(0.19, 0.012, 6, 20),
    new THREE.MeshLambertMaterial({ color: BUMPER }),
  );
  bumper.name = "vacuum-bumper";
  bumper.rotation.x = Math.PI / 2;
  bumper.position.set(0, 0.05, 0);
  group.add(bumper);

  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.018, 8, 8),
    new THREE.MeshBasicMaterial({ color: LED_IDLE }),
  );
  led.name = "vacuum-led";
  led.position.set(0, 0.1, 0.1);
  group.add(led);

  const brushLeft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 0.01, 8),
    new THREE.MeshLambertMaterial({ color: BRUSH }),
  );
  brushLeft.name = "vacuum-brush-left";
  brushLeft.position.set(-0.16, 0.015, 0.12);
  group.add(brushLeft);

  const brushRight = brushLeft.clone();
  brushRight.name = "vacuum-brush-right";
  brushRight.position.set(0.16, 0.015, 0.12);
  group.add(brushRight);

  let working = false;
  let clock = 0;
  const ledMaterial = led.material as THREE.MeshBasicMaterial;

  function setWorking(next: boolean): void {
    working = next;
    if (!working) ledMaterial.color.setHex(LED_IDLE);
  }

  function animate(dt: number, moving: boolean): void {
    clock += dt;
    if (working) {
      // Blink the LED at ~2 Hz while working the lane end.
      const on = Math.floor(clock * 4) % 2 === 0;
      ledMaterial.color.setHex(on ? LED_WORK : BODY_SHADE);
      // A small wobble reads as "vacuuming in place".
      body.position.y = 0.05 + Math.sin(clock * 10) * 0.004;
    } else {
      body.position.y = 0.05;
    }
    if (moving || working) {
      brushLeft.rotation.y += dt * 8;
      brushRight.rotation.y -= dt * 8;
    }
  }

  return { group, setWorking, animate };
}
