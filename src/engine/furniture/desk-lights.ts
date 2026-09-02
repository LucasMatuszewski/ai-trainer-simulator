import * as THREE from "three";

/** C-64: Basic-material glow backed by the room's single real PointLight. */
export function makeDeskLedBar(): THREE.Group {
  const group = new THREE.Group();
  group.name = "desk-led-bar";
  const box = (name: string, size: [number, number, number], position: [number, number, number], material: THREE.Material): void => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.name = name;
    mesh.position.set(...position);
    group.add(mesh);
  };
  box("led-channel", [2.4, 0.05, 0.08], [0, 2.58, 0.05], new THREE.MeshLambertMaterial({ color: 0x2c2c34 }));
  box("led-core", [2.28, 0.02, 0.05], [0, 2.545, 0.05], new THREE.MeshBasicMaterial({ color: 0xfff2cc }));
  box("led-halo", [2.36, 0.1, 0.16], [0, 2.5, 0.05], new THREE.MeshBasicMaterial({ color: 0xffe9a0, transparent: true, opacity: 0.22, depthWrite: false }));
  const pool = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.7), new THREE.MeshBasicMaterial({ color: 0xfff2cc, transparent: true, opacity: 0.1, depthWrite: false }));
  pool.name = "led-pool";
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(0, 0.84, 0.05);
  group.add(pool);
  for (const x of [-0.85, 0, 0.85]) {
    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.1, 10), new THREE.MeshLambertMaterial({ color: 0x2c2c34 }));
    can.name = "down-can";
    can.position.set(x, 2.52, 0.05);
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.02, 10), new THREE.MeshBasicMaterial({ color: 0xfff2cc }));
    lamp.name = "down-lamp";
    lamp.position.set(x, 2.46, 0.05);
    const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.18, 0.22, 8), new THREE.MeshBasicMaterial({ color: 0xffe9a0, transparent: true, opacity: 0.12, depthWrite: false }));
    cone.name = "down-cone";
    cone.position.set(x, 2.34, 0.05);
    group.add(can, lamp, cone);
  }
  return group;
}
