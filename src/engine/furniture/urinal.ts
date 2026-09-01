/**
 * A wall-mounted urinal for the new C-57 WC (east of the kitchen).
 *
 * White porcelain basin, a chrome flush pipe dropping from above,
 * a small grate, and a hint of a splash-guard on the front. Faces
 * -Z (the user stands on -Z facing +Z, the wall).
 *
 * Origin at floor level, center of the wall mount footprint.
 */
import * as THREE from "three";

const WALL_MOUNT = 0xfafafa;
const WALL_MOUNT_SHADOW = 0xc8c8c8;
const PIPE = 0xc8ccd1;
const PIPE_DARK = 0x80848a;
const SCREEN = 0xddd2bc;
const SCREEN_FRAME = 0x6e6052;

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

export function makeUrinal(): THREE.Group {
  const group = new THREE.Group();
  group.name = "urinal";

  // -- Wall mounting plate ---------------------------------------------
  group.add(box("urinal-plate", [0.55, 0.7, 0.04], new THREE.MeshLambertMaterial({ color: WALL_MOUNT_SHADOW }), [0, 0.95, 0]));

  // -- The basin -------------------------------------------------------
  // A wider top (the "bowl" the user sees), narrowing to a flat base.
  // Approximated with a stepped set of boxes since we want a clean
  // pixelart silhouette.
  const bowlMat = new THREE.MeshLambertMaterial({ color: WALL_MOUNT });
  const bowlShadowMat = new THREE.MeshLambertMaterial({ color: WALL_MOUNT_SHADOW });

  // Upper bowl.
  group.add(box("urinal-bowl-upper", [0.5, 0.3, 0.32], bowlMat, [0, 0.9, 0.18]));
  // Mid section (slightly narrower).
  group.add(box("urinal-bowl-mid", [0.4, 0.18, 0.28], bowlShadowMat, [0, 0.66, 0.16]));
  // Lower trap section.
  group.add(box("urinal-bowl-lower", [0.25, 0.18, 0.18], bowlShadowMat, [0, 0.48, 0.12]));

  // Front rim (a slight lip on the top of the bowl).
  group.add(box("urinal-rim-front", [0.5, 0.04, 0.05], bowlShadowMat, [0, 1.05, 0.34]));
  group.add(box("urinal-rim-left", [0.05, 0.04, 0.32], bowlShadowMat, [-0.25, 1.05, 0.18]));
  group.add(box("urinal-rim-right", [0.05, 0.04, 0.32], bowlShadowMat, [0.25, 1.05, 0.18]));

  // Drain (a small dark disc at the bottom of the bowl).
  const drain = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.02, 12),
    new THREE.MeshBasicMaterial({ color: 0x1a1a1a }),
  );
  drain.name = "urinal-drain";
  drain.position.set(0, 0.65, 0.2);
  group.add(drain);

  // -- Flush pipe (the chrome pipe dropping from above) ---------------
  // The pipe goes from the top of the wall (y=2.4) down into the top
  // of the bowl (y=1.05), positioned behind the bowl.
  group.add(box("urinal-pipe-vertical", [0.07, 1.3, 0.07], new THREE.MeshLambertMaterial({ color: PIPE }), [0, 1.75, 0.05]));

  // Pipe bracket (a small dark plate on the wall).
  group.add(box("urinal-pipe-bracket", [0.1, 0.04, 0.1], new THREE.MeshLambertMaterial({ color: PIPE_DARK }), [0, 2.3, 0.02]));

  // Pipe spout (a small horizontal cylinder pointing forward into the bowl).
  group.add(box("urinal-pipe-spout", [0.05, 0.05, 0.1], new THREE.MeshLambertMaterial({ color: PIPE_DARK }), [0, 1.12, 0.1]));

  // -- Splash guard (privacy screen on the left side) -----------------
  group.add(box("urinal-screen", [0.04, 0.7, 0.4], new THREE.MeshLambertMaterial({ color: SCREEN }), [-0.35, 0.95, 0.25]));
  group.add(box("urinal-screen-frame-top", [0.05, 0.04, 0.4], new THREE.MeshLambertMaterial({ color: SCREEN_FRAME }), [-0.36, 1.32, 0.25]));
  group.add(box("urinal-screen-frame-bot", [0.05, 0.04, 0.4], new THREE.MeshLambertMaterial({ color: SCREEN_FRAME }), [-0.36, 0.62, 0.25]));

  return group;
}
