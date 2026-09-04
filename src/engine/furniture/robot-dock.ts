/**
 * A charging pad for one of Janusz's robots (C-70).
 *
 * Low-profile so it never reads as an obstacle in its own right: a
 * thin round base plate, a short charging post with a status light,
 * and a coiled cable running to the wall. Faces +Z. Origin at floor
 * level, center.
 */
import * as THREE from "three";

const PAD = 0x3a3f45;
const PAD_RIM = 0x54595f;
const POST = 0x8a8f94;
const CABLE = 0x1a1a1a;
const LED_IDLE = 0xffcc33;

function cyl(
  name: string,
  radiusTop: number,
  radiusBottom: number,
  height: number,
  material: THREE.Material,
  position: [number, number, number],
  radialSegments = 12,
): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments),
    material,
  );
  mesh.name = name;
  mesh.position.set(...position);
  return mesh;
}

export function makeRobotDock(): THREE.Group {
  const group = new THREE.Group();
  group.name = "robot-dock";

  // Base plate: a shallow disc a robot can drive onto.
  group.add(cyl("dock-pad", 0.32, 0.34, 0.02, new THREE.MeshLambertMaterial({ color: PAD }), [0, 0.01, 0]));
  group.add(cyl("dock-pad-rim", 0.34, 0.34, 0.005, new THREE.MeshLambertMaterial({ color: PAD_RIM }), [0, 0.022, 0]));

  // Short charging post at the back edge with a status LED on top.
  group.add(cyl("dock-post", 0.03, 0.035, 0.18, new THREE.MeshLambertMaterial({ color: POST }), [0, 0.11, -0.24]));
  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.02, 6, 6),
    new THREE.MeshBasicMaterial({ color: LED_IDLE }),
  );
  led.name = "dock-led";
  led.position.set(0, 0.2, -0.24);
  group.add(led);

  // A cable running from the post toward the wall (a short flat strip).
  const cable = new THREE.Mesh(
    new THREE.BoxGeometry(0.03, 0.01, 0.3),
    new THREE.MeshLambertMaterial({ color: CABLE }),
  );
  cable.name = "dock-cable";
  cable.position.set(0, 0.005, -0.4);
  group.add(cable);

  return group;
}
