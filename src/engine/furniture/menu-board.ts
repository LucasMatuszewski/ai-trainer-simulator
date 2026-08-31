/**
 * A small kitchen table with chairs (C-36).
 *
 * A round(ish) table on a single pedestal, with three chairs around
 * it. Replaces the old box "table" in the kitchen. Faces +Z by
 * default; rotate for placement. Origin at floor level, center.
 */
import * as THREE from "three";

const TOP = 0x8a6a3a;
const TOP_TRIM = 0x5a4626;
const LEG = 0x4a3618;
const CHAIR = 0x25253d;
const CHAIR_BACK = 0x1c1c30;

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

export function makeKitchenTable(): THREE.Group {
  const group = new THREE.Group();
  group.name = "kitchen-table";

  // Tabletop.
  const top = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.7, 0.05, 16),
    new THREE.MeshLambertMaterial({ color: TOP }),
  );
  top.name = "table-top";
  top.position.set(0, 0.74, 0);
  group.add(top);

  // Top trim ring (a darker thin ring under the top).
  const trim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.71, 0.71, 0.02, 16),
    new THREE.MeshLambertMaterial({ color: TOP_TRIM }),
  );
  trim.name = "table-trim";
  trim.position.set(0, 0.72, 0);
  group.add(trim);

  // Pedestal.
  const pedestal = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.15, 0.65, 10),
    new THREE.MeshLambertMaterial({ color: LEG }),
  );
  pedestal.name = "table-pedestal";
  pedestal.position.set(0, 0.38, 0);
  group.add(pedestal);

  // Base (a 4-foot disc).
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.4, 0.4, 0.05, 16),
    new THREE.MeshLambertMaterial({ color: LEG }),
  );
  base.name = "table-base";
  base.position.set(0, 0.025, 0);
  group.add(base);

  // A mug on the table.
  const mug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.045, 0.1, 10),
    new THREE.MeshLambertMaterial({ color: 0xc8442c }),
  );
  mug.name = "table-mug";
  mug.position.set(0.3, 0.81, -0.2);
  group.add(mug);

  // A book / magazine on the table.
  group.add(box("table-magazine", [0.25, 0.02, 0.18], new THREE.MeshLambertMaterial({ color: 0x2244aa }), [-0.3, 0.77, 0.2]));

  return group;
}

export function makeKitchenChair(): THREE.Group {
  const group = new THREE.Group();
  group.name = "kitchen-chair";

  // Seat.
  const seat = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, 0.05, 0.45),
    new THREE.MeshLambertMaterial({ color: CHAIR }),
  );
  seat.name = "chair-seat";
  seat.position.set(0, 0.45, 0);
  group.add(seat);

  // Back.
  const back = new THREE.Mesh(
    new THREE.BoxGeometry(0.45, 0.55, 0.05),
    new THREE.MeshLambertMaterial({ color: CHAIR_BACK }),
  );
  back.name = "chair-back";
  back.position.set(0, 0.78, -0.2);
  group.add(back);

  // Four legs.
  for (const [lx, lz] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]] as Array<[number, number]>) {
    group.add(box("chair-leg", [0.04, 0.45, 0.04], new THREE.MeshLambertMaterial({ color: CHAIR_BACK }), [lx, 0.225, lz]));
  }

  return group;
}
