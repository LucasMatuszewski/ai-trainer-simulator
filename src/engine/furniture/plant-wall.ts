import * as THREE from "three";

/** C-64: a four-tone instanced foliage wall, dense without 190 draw calls. */
export function makePlantWall(): THREE.Group {
  const group = new THREE.Group();
  group.name = "plant-wall";
  const addBox = (name: string, size: [number, number, number], position: [number, number, number], color: number): void => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), new THREE.MeshLambertMaterial({ color }));
    mesh.name = name;
    mesh.position.set(...position);
    group.add(mesh);
  };
  addBox("pw-back", [0.04, 2.45, 5], [0.02, 1.42, 0], 0x1a2e22);
  addBox("pw-frame-l", [0.08, 2.5, 0.08], [0, 1.45, -2.46], 0x2c2c34);
  addBox("pw-frame-r", [0.08, 2.5, 0.08], [0, 1.45, 2.46], 0x2c2c34);
  addBox("pw-frame-t", [0.08, 0.08, 5], [0, 2.68, 0], 0x2c2c34);
  addBox("pw-frame-b", [0.08, 0.1, 5], [0, 0.15, 0], 0x2c2c34);
  addBox("pw-trough-soil", [0.1, 0.03, 4.84], [0.04, 0.22, 0], 0x3a2210);

  const geometry = new THREE.BoxGeometry(0.16, 0.2, 0.1);
  const colors = [0x2f8f3f, 0x226622, 0x2e7d32, 0x256029];
  const buckets: THREE.Matrix4[][] = colors.map(() => []);
  const transform = new THREE.Object3D();
  for (let row = 0; row < 10; row += 1) {
    for (let col = 0; col < 16; col += 1) {
      const i = row * 16 + col;
      if ((row < 2 && i % 13 === 0) || (Math.abs(col - 8) < 2 && Math.abs(row - 5) < 2 && i % 2 === 0)) continue;
      const jitter = ((i * 13) % 10) / 9 - 0.5;
      transform.position.set(0.12 + jitter * 0.04, 0.4 + row * 0.22 + (col % 2) * 0.06, -2.3 + col * 0.3 + jitter * 0.05);
      transform.rotation.set(jitter * 0.5, 0, -jitter * 0.7);
      transform.scale.set(0.85 + (i % 3) * 0.12, 0.75 + (i % 4) * 0.14, 0.8);
      transform.updateMatrix();
      buckets[(i * 3 + row) % colors.length]!.push(transform.matrix.clone());
    }
  }
  buckets.forEach((matrices, colorIndex) => {
    const leaves = new THREE.InstancedMesh(geometry, new THREE.MeshLambertMaterial({ color: colors[colorIndex] }), matrices.length);
    leaves.name = `pw-leaves-${colorIndex}`;
    matrices.forEach((matrix, index) => leaves.setMatrixAt(index, matrix));
    leaves.instanceMatrix.needsUpdate = true;
    group.add(leaves);
  });
  const flowerColors = [0xfafafa, 0xe66ea0, 0xf2c200];
  for (let i = 0; i < 12; i += 1) {
    const flower = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), new THREE.MeshBasicMaterial({ color: flowerColors[i % 3] }));
    flower.name = "pw-flower";
    flower.position.set(0.2, 0.55 + ((i * 7) % 18) * 0.11, -2.1 + ((i * 11) % 15) * 0.29);
    group.add(flower);
  }
  return group;
}
