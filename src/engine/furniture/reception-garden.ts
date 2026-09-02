import * as THREE from "three";
import { makeTree } from "./garden";

export const RECEPTION_GARDEN_BOUNDS = { minX: -16, maxX: -6.55, minZ: 8, maxZ: 20.5 } as const;

function grass(name: string, minX: number, maxX: number, minZ: number, maxZ: number, color: number, y: number): THREE.Mesh {
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(maxX - minX, maxZ - minZ), new THREE.MeshLambertMaterial({ color }));
  plane.name = name;
  plane.rotation.x = -Math.PI / 2;
  plane.position.set((minX + maxX) / 2, y, (minZ + maxZ) / 2);
  return plane;
}

/** C-64: cheap corporate garden scenery visible through the reception glass. */
export function makeReceptionGarden(): THREE.Group {
  const group = new THREE.Group();
  group.name = "reception-garden";
  group.add(
    grass("reception-grass", -16, -6.55, 8, 20.5, 0x4a9c4a, 0.005),
    grass("reception-grass-stripe", -13, -8, 10, 18, 0x3d8440, 0.01),
  );
  const hills: ReadonlyArray<readonly [number, number, number, number]> = [
    [-13.5, 10.5, 2.8, 0.42], [-14.5, 14, 3.4, 0.38], [-13.8, 17.8, 2.6, 0.45], [-16.5, 13.5, 3.8, 0.32],
  ];
  const hillMaterial = new THREE.MeshLambertMaterial({ color: 0x3a7340 });
  for (const [x, z, radius, squash] of hills) {
    const hill = new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 8), hillMaterial);
    hill.name = "reception-hill";
    hill.position.set(x, 0, z);
    hill.scale.y = squash;
    group.add(hill);
  }
  const treeSpecs: ReadonlyArray<readonly [number, number, number]> = [
    [-8.1, 11.1, 1.05], [-8.25, 12.6, 0.9], [-8.05, 14.1, 1.15], [-8.3, 15.6, 0.88], [-8.12, 17.1, 1], [-8.28, 18.6, 0.8],
  ];
  for (const [x, z, scale] of treeSpecs) {
    const tree = makeTree(scale);
    tree.name = "reception-tree";
    tree.position.set(x, 0, z);
    group.add(tree);
  }
  const bushMaterial = new THREE.MeshLambertMaterial({ color: 0x35753a });
  for (const z of [10.35, 11.85, 13.35, 14.85, 16.35, 17.85]) {
    const bush = new THREE.Mesh(new THREE.SphereGeometry(0.48, 8, 6), bushMaterial);
    bush.name = "reception-bush";
    bush.scale.y = 0.7;
    bush.position.set(-7.6, 0.3, z);
    group.add(bush);
  }
  return group;
}
