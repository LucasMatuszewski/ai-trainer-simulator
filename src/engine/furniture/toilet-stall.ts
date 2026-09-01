/**
 * A toilet stall for the new C-57 WC (east of the kitchen).
 *
 * White porcelain toilet bowl + cistern, partition walls on both
 * sides (cream tile, with a thin grey frame), a door panel (cream
 * tile face, dark handle, gap underneath), and a small roll of
 * toilet paper on the wall. Faces +Z (the user sits on +Z facing
 * -Z, i.e. facing the back wall).
 *
 * Origin at floor level, center of the footprint. Stall footprint
 * is 1.2m wide (X) x 1.6m deep (Z); the back wall is at -Z.
 */
import * as THREE from "three";

const PARTITION = 0xeae3d2;
const PARTITION_DARK = 0xb6a98c;
const PARTITION_FRAME = 0x6e6052;
const DOOR = 0xddd2bc;
const HANDLE = 0x444a4f;
const TOILET_BOWL = 0xfafafa;
const TOILET_BOWL_SHADOW = 0xc8c8c8;
const TOILET_SEAT = 0xb6b0a4;
const TOILET_LID = 0xa39e8e;
const CISTERN = 0xf2f2f2;
const BUTTON = 0x7c7c7c;
const PIPE = 0xc8ccd1;
const TISSUE = 0xfafafa;
const TISSUE_BROWN = 0x9c6f4a;

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

export function makeToiletStall(): THREE.Group {
  const group = new THREE.Group();
  group.name = "toilet-stall";

  // -- Partition walls (both sides) -------------------------------------
  // The stall is 1.2m wide (X), 1.6m deep (Z). Two side walls run from
  // x=+/-0.6 to inside, height 2.0m, depth 1.6m. They sit on the
  // outside of the bowl.
  const wallMat = new THREE.MeshLambertMaterial({ color: PARTITION });
  const frameMat = new THREE.MeshLambertMaterial({ color: PARTITION_FRAME });

  // Left partition.
  group.add(box("stall-partition-left", [0.06, 2.0, 1.6], wallMat, [-0.6 + 0.03, 1.0, 0]));
  group.add(box("stall-partition-left-frame-top", [0.07, 0.04, 1.6], frameMat, [-0.6 + 0.035, 2.0 - 0.02, 0]));
  group.add(box("stall-partition-left-frame-bot", [0.07, 0.04, 1.6], frameMat, [-0.6 + 0.035, 0.02, 0]));

  // Right partition.
  group.add(box("stall-partition-right", [0.06, 2.0, 1.6], wallMat, [0.6 - 0.03, 1.0, 0]));
  group.add(box("stall-partition-right-frame-top", [0.07, 0.04, 1.6], frameMat, [0.6 - 0.035, 2.0 - 0.02, 0]));
  group.add(box("stall-partition-right-frame-bot", [0.07, 0.04, 1.6], frameMat, [0.6 - 0.035, 0.02, 0]));

  // A vertical line on each partition to suggest tile rows.
  for (const side of [-0.6 + 0.03, 0.6 - 0.03]) {
    for (let i = 0; i < 4; i++) {
      group.add(box(
        `stall-tile-line-${side.toFixed(2)}-${i}`,
        [0.062, 0.01, 1.6],
        new THREE.MeshLambertMaterial({ color: PARTITION_DARK }),
        [side, 0.5 + i * 0.5, 0],
      ));
    }
  }

  // -- Front door panel (the "door" of the stall) ----------------------
  // A panel at +Z (the front), height 1.8m, with a 0.3m gap
  // underneath. Filled only between x=[-0.6, 0.6] of the stall.
  //
  // Per Lucas 2026-09-01: the door is pushed forward (z=0.78 ->
  // 0.83) so it sits in front of the door frame instead of being
  // coplanar with it. The previous position had the door panel
  // INSIDE the door-frame mesh (panel z range [0.76, 0.80],
  // frame z range [0.75, 0.825]) and the panel's back face
  // z-fought with the frame's interior. With the door at z=0.83
  // (panel z range [0.81, 0.85]) it clears the frame (z range
  // [0.75, 0.825]) cleanly.
  const doorMat = new THREE.MeshLambertMaterial({ color: DOOR });
  group.add(box("stall-door", [1.2, 1.5, 0.04], doorMat, [0, 0.3 + 0.75, 0.85]));

  // Door frame (top + sides). Unchanged from the previous layout
  // so the frame is still on the partition's +Z face.
  group.add(box("stall-door-frame-top", [1.2, 0.04, 0.05], frameMat, [0, 0.3 + 1.5 + 0.02, 0.8 - 0.025]));
  group.add(box("stall-door-frame-left", [0.04, 1.5, 0.05], frameMat, [-0.6 + 0.02, 0.3 + 0.75, 0.8 - 0.025]));
  group.add(box("stall-door-frame-right", [0.04, 1.5, 0.05], frameMat, [0.6 - 0.02, 0.3 + 0.75, 0.8 - 0.025]));

  // Door handle (a small horizontal bar on the +X side, dark).
  // Also pushed forward to match the new door z.
  group.add(box("stall-door-handle", [0.04, 0.04, 0.18], new THREE.MeshLambertMaterial({ color: HANDLE }), [0.45, 0.3 + 0.75, 0.86]));

  // -- The toilet itself -----------------------------------------------
  // Sit on the back wall (-Z) facing +Z. Bowl centered at z=-0.4.
  const bowlMat = new THREE.MeshLambertMaterial({ color: TOILET_BOWL });
  const bowlShadowMat = new THREE.MeshLambertMaterial({ color: TOILET_BOWL_SHADOW });

  // Base / pedestal of the toilet.
  group.add(box("toilet-base", [0.4, 0.35, 0.5], bowlMat, [0, 0.175, -0.4]));

  // Bowl (a slightly wider, lower section).
  group.add(box("toilet-bowl", [0.45, 0.1, 0.55], bowlShadowMat, [0, 0.35 + 0.05, -0.35]));

  // Bowl rim (the open top - a thin ring at the top of the bowl).
  const bowlRim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.04, 16),
    bowlMat,
  );
  bowlRim.name = "toilet-bowl-rim";
  bowlRim.position.set(0, 0.5, -0.35);
  group.add(bowlRim);

  // Toilet seat (a slightly thinner ring, beige).
  const seat = new THREE.Mesh(
    new THREE.CylinderGeometry(0.185, 0.185, 0.02, 16),
    new THREE.MeshLambertMaterial({ color: TOILET_SEAT }),
  );
  seat.name = "toilet-seat";
  seat.position.set(0, 0.52, -0.35);
  group.add(seat);

  // Toilet lid (open, leaning against the cistern).
  const lid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.19, 0.19, 0.02, 16),
    new THREE.MeshLambertMaterial({ color: TOILET_LID }),
  );
  lid.name = "toilet-lid";
  lid.position.set(0, 0.78, -0.55);
  lid.rotation.x = -Math.PI / 8;
  group.add(lid);

  // Cistern (the tank on the back wall).
  const cisternMat = new THREE.MeshLambertMaterial({ color: CISTERN });
  group.add(box("toilet-cistern", [0.45, 0.6, 0.18], cisternMat, [0, 0.55, -0.72]));

  // Cistern top.
  group.add(box("toilet-cistern-top", [0.45, 0.03, 0.18], cisternMat, [0, 0.86, -0.72]));

  // Flush button (a small disc on the top of the cistern).
  const button = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.02, 12),
    new THREE.MeshLambertMaterial({ color: BUTTON }),
  );
  button.name = "toilet-button";
  button.position.set(0, 0.88, -0.72);
  group.add(button);

  // Pipe connecting cistern to bowl (the visible white pipe).
  group.add(box("toilet-pipe", [0.06, 0.2, 0.06], new THREE.MeshLambertMaterial({ color: PIPE }), [0, 0.4, -0.6]));

  // -- Toilet paper roll on the left partition -------------------------
  // Holder bar + roll.
  group.add(box("toilet-paper-holder", [0.04, 0.04, 0.18], frameMat, [-0.45, 0.95, 0.1]));
  const roll = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, 0.13, 16),
    new THREE.MeshLambertMaterial({ color: TISSUE }),
  );
  roll.name = "toilet-paper-roll";
  roll.rotation.z = Math.PI / 2;
  roll.position.set(-0.45, 0.95, 0.1);
  group.add(roll);

  // Brown paper core of the roll.
  const core = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 0.135, 12),
    new THREE.MeshLambertMaterial({ color: TISSUE_BROWN }),
  );
  core.name = "toilet-paper-core";
  core.rotation.z = Math.PI / 2;
  core.position.set(-0.45, 0.95, 0.1);
  group.add(core);

  return group;
}
