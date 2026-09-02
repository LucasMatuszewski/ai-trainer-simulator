import * as THREE from "three";

export function makeReceptionSofa(): THREE.Group {
  const group = new THREE.Group();
  group.name = "reception-sofa";
  const body = new THREE.MeshLambertMaterial({ color: 0x222244 });
  const cushion = new THREE.MeshLambertMaterial({ color: 0x2e2e55 });
  const wood = new THREE.MeshLambertMaterial({ color: 0x2e2018 });
  const add = (name: string, size: [number, number, number], position: [number, number, number], material: THREE.Material): THREE.Mesh => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
    mesh.name = name;
    mesh.position.set(...position);
    group.add(mesh);
    return mesh;
  };
  add("sofa-base", [2.2, 0.32, 0.9], [0, 0.26, 0], body);
  for (const [x, z] of [[-0.95, -0.32], [0.95, -0.32], [-0.95, 0.32], [0.95, 0.32]] as const) add("sofa-leg", [0.08, 0.1, 0.08], [x, 0.05, z], wood);
  add("sofa-seat-left", [1.02, 0.14, 0.82], [-0.53, 0.49, 0.03], cushion);
  add("sofa-seat-right", [1.02, 0.14, 0.82], [0.53, 0.49, 0.03], cushion);
  add("sofa-back-left", [1.02, 0.52, 0.18], [-0.53, 0.72, -0.36], cushion);
  add("sofa-back-right", [1.02, 0.52, 0.18], [0.53, 0.72, -0.36], cushion);
  add("sofa-arm-left", [0.18, 0.5, 0.9], [-1.1, 0.55, 0], body);
  add("sofa-arm-right", [0.18, 0.5, 0.9], [1.1, 0.55, 0], body);
  const pillow = add("sofa-pillow", [0.28, 0.22, 0.1], [-0.7, 0.72, -0.2], new THREE.MeshLambertMaterial({ color: 0x2f8f3f }));
  pillow.rotation.z = 0.15;
  const pillow2 = add("sofa-pillow-2", [0.28, 0.22, 0.1], [0.75, 0.72, -0.18], new THREE.MeshLambertMaterial({ color: 0xb8912f }));
  pillow2.rotation.z = -0.1;
  return group;
}
