/**
 * A fire extinguisher for the kitchen wall (C-36).
 *
 * Red cylinder body, black handle on top, a small black nozzle on
 * the side, and a white label band. Mounted vertically. Origin at
 * floor level, center.
 */
import * as THREE from "three";

const BODY = 0xcc2222;
const BODY_DARK = 0x8a1414;
const TOP = 0x1a1a1a;
const LABEL = 0xfafafa;
const NOZZLE = 0x1a1a1a;
const BAND = 0x222222;

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

function letterBlock(
  parent: THREE.Group,
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
  color = 0x1a1a1a,
): void {
  parent.add(box("fire-letter", [w, h, 0.005], new THREE.MeshBasicMaterial({ color }), [x, y, z]));
}

export function makeFireExtinguisherKitchen(): THREE.Group {
  const group = new THREE.Group();
  group.name = "fire-extinguisher-kitchen";

  // Main cylinder body.
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.12, 0.6, 12),
    new THREE.MeshLambertMaterial({ color: BODY }),
  );
  body.name = "fire-body";
  body.position.set(0, 0.3, 0);
  group.add(body);

  // Bottom cap (slightly narrower).
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.1, 0.04, 12),
    new THREE.MeshLambertMaterial({ color: BODY_DARK }),
  );
  cap.name = "fire-cap";
  cap.position.set(0, 0.02, 0);
  group.add(cap);

  // Top cap (where the handle attaches).
  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.12, 0.04, 12),
    new THREE.MeshLambertMaterial({ color: TOP }),
  );
  top.name = "fire-top";
  top.position.set(0, 0.62, 0);
  group.add(top);

  // Handle (a small bar on top).
  group.add(box("fire-handle", [0.16, 0.04, 0.04], new THREE.MeshLambertMaterial({ color: TOP }), [0, 0.66, 0]));

  // Pressure gauge (a tiny disc on the top cap).
  const gauge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.01, 10),
    new THREE.MeshLambertMaterial({ color: 0xeeeeee }),
  );
  gauge.name = "fire-gauge";
  gauge.position.set(-0.05, 0.65, 0.12);
  group.add(gauge);

  // Nozzle (a small horizontal cylinder pointing forward).
  const nozzle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.16, 10),
    new THREE.MeshLambertMaterial({ color: NOZZLE }),
  );
  nozzle.name = "fire-nozzle";
  nozzle.rotation.x = Math.PI / 2;
  nozzle.position.set(0.08, 0.62, 0.1);
  group.add(nozzle);

  // Nozzle tip.
  group.add(box("fire-nozzle-tip", [0.06, 0.06, 0.025], new THREE.MeshLambertMaterial({ color: NOZZLE }), [0.08, 0.62, 0.2]));

  // White label band on the body.
  const label = new THREE.Mesh(
    new THREE.CylinderGeometry(0.121, 0.121, 0.18, 12),
    new THREE.MeshLambertMaterial({ color: LABEL }),
  );
  label.name = "fire-label";
  label.position.set(0, 0.35, 0);
  group.add(label);

  // Tiny black "FIRE" letters on the label.
  for (let i = 0; i < 4; i++) letterBlock(group, -0.045 + i * 0.03, 0.36, 0.12, 0.014, 0.012);

  // Dark band at the top of the label.
  const band = new THREE.Mesh(
    new THREE.CylinderGeometry(0.122, 0.122, 0.02, 12),
    new THREE.MeshLambertMaterial({ color: BAND }),
  );
  band.name = "fire-band";
  band.position.set(0, 0.45, 0);
  group.add(band);

  return group;
}
