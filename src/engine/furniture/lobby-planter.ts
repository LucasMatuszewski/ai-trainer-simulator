import * as THREE from "three";

export function makeLobbyPlanter(scale = 1): THREE.Group {
  const group = new THREE.Group();
  group.name = "lobby-planter";
  group.scale.setScalar(scale);
  const part = (name: string, geometry: THREE.BufferGeometry, color: number, position: [number, number, number], basic = false): void => {
    const material = basic ? new THREE.MeshBasicMaterial({ color }) : new THREE.MeshLambertMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    mesh.position.set(...position);
    group.add(mesh);
  };
  part("planter-pot", new THREE.BoxGeometry(0.42, 0.38, 0.42), 0x8a4a2a, [0, 0.19, 0]);
  part("planter-rim", new THREE.BoxGeometry(0.46, 0.04, 0.46), 0x6a3a1f, [0, 0.39, 0]);
  part("planter-soil", new THREE.BoxGeometry(0.36, 0.02, 0.36), 0x3a2210, [0, 0.415, 0]);
  part("planter-leaf-big", new THREE.SphereGeometry(0.28, 10, 8), 0x2f8f3f, [0, 0.62, 0]);
  part("planter-leaf-dark", new THREE.SphereGeometry(0.2, 8, 6), 0x226622, [0.1, 0.55, 0.08]);
  part("planter-leaf-third", new THREE.SphereGeometry(0.16, 8, 6), 0x2e7d32, [-0.08, 0.58, -0.06]);
  const colors = [0xfafafa, 0xe66ea0, 0xf2c200, 0xfafafa];
  const positions: [number, number, number][] = [[-0.16, 0.76, 0], [0.12, 0.8, 0.1], [0.02, 0.85, -0.12], [0.2, 0.7, -0.08]];
  positions.forEach((position, index) => part("planter-bloom", new THREE.SphereGeometry(0.04, 6, 4), colors[index]!, position, true));
  return group;
}
