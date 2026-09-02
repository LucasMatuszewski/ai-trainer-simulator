import * as THREE from "three";
import { makeCoffeeTable } from "./coffee-table";

export function makeReceptionCoffeeTable(): THREE.Group {
  const group = makeCoffeeTable();
  group.name = "reception-coffee-table";
  const magazineSpecs = [
    { name: "agile-waterfall-magazine", color: 0x2255aa, x: -0.15, y: 0.465, z: 0.02, rotation: 0.2 },
    { name: "exit-vim-magazine", color: 0xaa3322, x: 0.12, y: 0.48, z: -0.04, rotation: -0.15 },
  ];
  for (const spec of magazineSpecs) {
    const magazine = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.012, 0.32), new THREE.MeshLambertMaterial({ color: spec.color }));
    magazine.name = spec.name;
    magazine.position.set(spec.x, spec.y, spec.z);
    magazine.rotation.y = spec.rotation;
    group.add(magazine);
  }
  const binder = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.03, 0.2), new THREE.MeshLambertMaterial({ color: 0x3a5a6d }));
  binder.name = "visitor-log-sign-the-sla";
  binder.position.set(0.28, 0.465, 0.14);
  group.add(binder);
  return group;
}
