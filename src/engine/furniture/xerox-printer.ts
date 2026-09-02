import * as THREE from "three";

/** C-64: Renata's large office copier, ready for the Wave 3 flash animation. */
export function makeXeroxPrinter(): THREE.Group {
  const group = new THREE.Group();
  group.name = "xerox-printer";
  const add = (name: string, size: [number, number, number], position: [number, number, number], color: number, basic = false): void => {
    const material = basic ? new THREE.MeshBasicMaterial({ color }) : new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.name = name;
    mesh.position.set(...position);
    group.add(mesh);
  };
  add("xerox-body", [0.85, 0.82, 0.72], [0, 0.41, 0], 0xd9dde0);
  add("xerox-base", [0.72, 0.18, 0.62], [0, 0.09, 0], 0x2c2c34);
  add("xerox-scanner", [0.95, 0.18, 0.78], [0, 0.91, 0], 0xe8ecef);
  add("xerox-lid", [0.92, 0.07, 0.72], [0, 1.045, -0.02], 0x2c2c34);
  add("xerox-output", [0.55, 0.18, 0.05], [0, 0.58, 0.37], 0x1c1c22);
  add("xerox-control", [0.32, 0.08, 0.18], [0.27, 1.05, 0.25], 0x2c2c34);
  add("xerox-display", [0.16, 0.015, 0.08], [0.27, 1.095, 0.25], 0x33aaff, true);
  add("xerox-paper", [0.5, 0.02, 0.32], [0, 0.71, 0.38], 0xffffff);
  return group;
}
