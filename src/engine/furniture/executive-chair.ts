/**
 * The CEO executive chair (L-2026-08-31-04 #3).
 *
 * The old placeholder was a single blue box the CEO appeared to
 * sit INSIDE. This is a real high-back executive chair: dark
 * leather, a chrome column and 4-star base, armrests, and a tall
 * back with a small headrest. It faces +Z (south, toward the
 * glass wall and the office) matching the CEO's facing.
 */
import * as THREE from "three";

const LEATHER = 0x2a1f1a;
const LEATHER_SEAT = 0x33261f;
const CHROME = 0x9aa2ad;

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

export function makeExecutiveChair(): THREE.Group {
  const group = new THREE.Group();
  group.name = "executive-chair";

  const leather = new THREE.MeshLambertMaterial({ color: LEATHER });
  const leatherSeat = new THREE.MeshLambertMaterial({ color: LEATHER_SEAT });
  const chrome = new THREE.MeshLambertMaterial({ color: CHROME });

  // 4-star base: four spokes radiating from the column.
  for (let index = 0; index < 4; index += 1) {
    const spoke = box("chair-spoke", [0.55, 0.05, 0.09], chrome, [0, 0.05, 0]);
    spoke.rotation.y = (index * Math.PI) / 2 + Math.PI / 4;
    group.add(spoke);
    // Caster wheel at the end of each spoke.
    const wheel = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 6),
      new THREE.MeshLambertMaterial({ color: 0x1c1c1c }),
    );
    wheel.name = "chair-wheel";
    const angle = spoke.rotation.y;
    wheel.position.set(Math.sin(angle) * 0.26, 0.05, Math.cos(angle) * 0.26);
    group.add(wheel);
  }

  // Chrome column.
  const column = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.06, 0.35, 10),
    chrome,
  );
  column.name = "chair-column";
  column.position.set(0, 0.25, 0);
  group.add(column);

  // Seat cushion.
  group.add(box("chair-seat", [0.56, 0.1, 0.54], leatherSeat, [0, 0.47, 0.02]));

  // Tall back cushion, leaning slightly back (north).
  const back = box("chair-back", [0.56, 0.88, 0.13], leather, [0, 0.98, -0.26]);
  back.rotation.x = -0.09;
  group.add(back);
  // Headrest on top of the back.
  const headrest = box("chair-headrest", [0.42, 0.16, 0.1], leather, [0, 1.46, -0.3]);
  headrest.rotation.x = -0.09;
  group.add(headrest);

  // Armrests.
  for (const side of [-1, 1]) {
    group.add(box("chair-armrest-post", [0.05, 0.22, 0.05], chrome, [side * 0.32, 0.55, 0.02]));
    group.add(box("chair-armrest", [0.07, 0.04, 0.34], leather, [side * 0.32, 0.67, 0.02]));
  }

  return group;
}
