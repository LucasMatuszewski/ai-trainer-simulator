/**
 * A visible ceiling light fixture (L-2026-08-31-04 #7).
 *
 * "Where is the source of the light on the ceiling?" - the rooms
 * had invisible PointLights. This fixture hangs just below the
 * ceiling: a dark rim disc with a warm, self-lit lamp face, so
 * the player can SEE where the light comes from. The actual
 * PointLight is created next to it by the room builder.
 */
import * as THREE from "three";

export function makeCeilingLight(): THREE.Group {
  const group = new THREE.Group();
  group.name = "ceiling-light";

  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.32, 0.08, 16),
    new THREE.MeshLambertMaterial({ color: 0x2c2c34 }),
  );
  rim.name = "ceiling-light-rim";
  group.add(rim);

  const lamp = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 0.03, 16),
    new THREE.MeshBasicMaterial({ color: 0xfff2cc }),
  );
  lamp.name = "ceiling-light-lamp";
  lamp.position.y = -0.05;
  group.add(lamp);

  return group;
}
