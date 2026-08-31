/**
 * A small glass-top coffee table for the CEO office meeting
 * corner (L-2026-08-31-04 #8), with one book and a tiny plant
 * on top so it does not read as empty.
 */
import * as THREE from "three";

const GLASS = 0xbcd8e4;
const CHROME = 0x9aa2ad;

export function makeCoffeeTable(): THREE.Group {
  const group = new THREE.Group();
  group.name = "coffee-table";

  const top = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 0.03, 0.7),
    new THREE.MeshLambertMaterial({ color: GLASS, transparent: true, opacity: 0.45 }),
  );
  top.name = "coffee-table-top";
  top.position.y = 0.42;
  group.add(top);

  const chrome = new THREE.MeshLambertMaterial({ color: CHROME });
  for (const [x, z] of [[-0.52, 0.3], [0.52, 0.3], [-0.52, -0.3], [0.52, -0.3]] as const) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.42, 8), chrome);
    leg.name = "coffee-table-leg";
    leg.position.set(x, 0.21, z);
    group.add(leg);
  }

  const book = new THREE.Mesh(
    new THREE.BoxGeometry(0.26, 0.04, 0.19),
    new THREE.MeshLambertMaterial({ color: 0x6d3a3a }),
  );
  book.name = "coffee-table-book";
  book.position.set(-0.25, 0.455, 0.05);
  group.add(book);

  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.04, 0.09, 8),
    new THREE.MeshLambertMaterial({ color: 0x8a4a2a }),
  );
  pot.name = "coffee-table-plant-pot";
  pot.position.set(0.28, 0.48, -0.08);
  group.add(pot);
  const leaf = new THREE.Mesh(
    new THREE.SphereGeometry(0.08, 8, 6),
    new THREE.MeshLambertMaterial({ color: 0x2f8f3f }),
  );
  leaf.name = "coffee-table-plant-leaf";
  leaf.position.set(0.28, 0.56, -0.08);
  group.add(leaf);

  return group;
}
