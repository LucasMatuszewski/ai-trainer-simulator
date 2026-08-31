/**
 * The internal garden and the outdoor scenery
 * (L-2026-08-31-04 #9 + L-2026-08-31-03).
 *
 * The office wings form a U: the CEO office on the west arm,
 * the training room on the east arm, the kitchen at the bottom.
 * The courtyard inside the U is an internal garden visible
 * through glass walls from BOTH rooms: a grass floor, trees and
 * bushes. East of the training room there is a second, outdoor
 * view: more trees, rolling hills and a low sun.
 *
 * Everything here is decoration only: no collision, no
 * interaction. The surrounding glass walls keep the player out.
 */
import * as THREE from "three";

const GRASS = 0x4a9c4a;
const GRASS_DARK = 0x3d8440;
const TRUNK = 0x6b4a2a;
const LEAF = 0x2e7d32;
const LEAF_DARK = 0x256029;
const BUSH = 0x35753a;

/** The internal garden courtyard: x=[9,19], z=[-19,-7.5]. */
export const GARDEN_BOUNDS = { minX: 9, maxX: 19, minZ: -19, maxZ: -7.5 } as const;

/** The outdoor scenery east of the training room. */
export const OUTDOOR_BOUNDS = { minX: 27.5, maxX: 34, minZ: -19, maxZ: -3 } as const;

function makeTree(scale: number, leafColor = LEAF): THREE.Group {
  const group = new THREE.Group();
  group.name = "tree";

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.14 * scale, 0.18 * scale, 1.4 * scale, 8),
    new THREE.MeshLambertMaterial({ color: TRUNK }),
  );
  trunk.name = "tree-trunk";
  trunk.position.y = 0.7 * scale;
  group.add(trunk);

  const foliageMaterial = new THREE.MeshLambertMaterial({ color: leafColor });
  const lower = new THREE.Mesh(new THREE.SphereGeometry(0.75 * scale, 10, 8), foliageMaterial);
  lower.name = "tree-foliage-lower";
  lower.position.y = 1.6 * scale;
  group.add(lower);
  const upper = new THREE.Mesh(new THREE.SphereGeometry(0.5 * scale, 10, 8), new THREE.MeshLambertMaterial({ color: LEAF_DARK }));
  upper.name = "tree-foliage-upper";
  upper.position.set(0.15 * scale, 2.2 * scale, 0.1 * scale);
  group.add(upper);

  return group;
}

function grassPlane(
  name: string,
  minX: number,
  maxX: number,
  minZ: number,
  maxZ: number,
  color: number,
): THREE.Mesh {
  const width = maxX - minX;
  const depth = maxZ - minZ;
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(width, depth),
    new THREE.MeshLambertMaterial({ color }),
  );
  plane.name = name;
  plane.rotation.x = -Math.PI / 2;
  plane.position.set((minX + maxX) / 2, 0.005, (minZ + maxZ) / 2);
  return plane;
}

/** The internal garden shared by the CEO office and training room. */
export function makeGarden(): THREE.Group {
  const group = new THREE.Group();
  group.name = "internal-garden";

  // Grass floor with a mowing-stripe twin for depth.
  group.add(grassPlane("garden-grass", GARDEN_BOUNDS.minX, GARDEN_BOUNDS.maxX, GARDEN_BOUNDS.minZ, GARDEN_BOUNDS.maxZ, GRASS));
  const stripe = grassPlane("garden-grass-stripe", 12, 16, GARDEN_BOUNDS.minZ + 1, GARDEN_BOUNDS.maxZ - 1, GRASS_DARK);
  stripe.position.y = 0.01;
  group.add(stripe);

  // Trees, varied in size and tone.
  const trees: ReadonlyArray<readonly [number, number, number]> = [
    [10.8, -17.6, 1.0],
    [15.4, -18.0, 1.25],
    [17.6, -14.8, 0.9],
    [10.6, -11.2, 1.1],
    [16.2, -9.6, 0.85],
    [13.2, -13.4, 1.35],
  ];
  for (const [x, z, scale] of trees) {
    const tree = makeTree(scale);
    tree.position.set(x, 0, z);
    group.add(tree);
  }

  // Bushes along the kitchen wall edge.
  const bushMaterial = new THREE.MeshLambertMaterial({ color: BUSH });
  for (const [x, z] of [[11.5, -8.3], [14.8, -8.2], [17.9, -8.4]] as const) {
    const bush = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 6), bushMaterial);
    bush.name = "garden-bush";
    bush.scale.y = 0.7;
    bush.position.set(x, 0.3, z);
    group.add(bush);
  }

  return group;
}

/** Outdoor scenery east of the training room: trees, hills, sun. */
export function makeOutdoorScenery(): THREE.Group {
  const group = new THREE.Group();
  group.name = "outdoor-scenery";

  group.add(grassPlane("outdoor-grass", OUTDOOR_BOUNDS.minX, OUTDOOR_BOUNDS.maxX, OUTDOOR_BOUNDS.minZ, OUTDOOR_BOUNDS.maxZ, GRASS_DARK));

  // Rolling hills on the horizon (flattened spheres).
  const hillMaterial = new THREE.MeshLambertMaterial({ color: 0x3a7340 });
  const hills: ReadonlyArray<readonly [number, number, number, number]> = [
    [30.0, -17.0, 3.2, 0.45],
    [33.5, -11.0, 2.6, 0.5],
    [31.0, -5.0, 3.0, 0.4],
  ];
  for (const [x, z, radius, squash] of hills) {
    const hill = new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 8), hillMaterial);
    hill.name = "outdoor-hill";
    hill.scale.y = squash;
    hill.position.set(x, 0, z);
    group.add(hill);
  }

  // A line of trees between the glass and the hills.
  const trees: ReadonlyArray<readonly [number, number, number]> = [
    [29.0, -16.5, 1.1],
    [28.6, -11.0, 0.95],
    [29.4, -6.0, 1.2],
    [28.9, -3.8, 0.85],
  ];
  for (const [x, z, scale] of trees) {
    const tree = makeTree(scale);
    tree.position.set(x, 0, z);
    group.add(tree);
  }

  // The low sun with a soft halo, facing west toward the glass.
  const sun = new THREE.Mesh(
    new THREE.CircleGeometry(1.3, 20),
    new THREE.MeshBasicMaterial({ color: 0xffdd44 }),
  );
  sun.name = "outdoor-sun";
  sun.position.set(31.5, 4.2, -11);
  sun.rotation.y = -Math.PI / 2;
  group.add(sun);
  const halo = new THREE.Mesh(
    new THREE.CircleGeometry(2.0, 20),
    new THREE.MeshBasicMaterial({ color: 0xffe9a0, transparent: true, opacity: 0.35 }),
  );
  halo.name = "outdoor-sun-halo";
  halo.position.set(31.6, 4.2, -11);
  halo.rotation.y = -Math.PI / 2;
  group.add(halo);

  return group;
}
