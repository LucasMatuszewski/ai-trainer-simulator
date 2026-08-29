/**
 * Camera director.
 *
 * Smoothly pans the camera to look at a target (usually an NPC). Used by the
 * office UI so clicking on a roster card frames that NPC without the player
 * having to walk over. Returns control when the animation finishes.
 *
 * The director does NOT touch player movement - the player is treated as the
 * camera operator in this game, and the camera independently frames whoever
 * you are talking to.
 */

import * as THREE from "three";

export interface CameraDirector {
  /** Schedule a smooth pan to look at the target from `offset` behind/above. */
  panTo: (target: THREE.Vector3, offset?: THREE.Vector3) => void;
  /** Snap the camera immediately (skip animation). */
  snapTo: (target: THREE.Vector3, offset?: THREE.Vector3) => void;
  /** Per-frame update. Returns true while a pan is in progress. */
  update: (dt: number) => boolean;
  /** Cancel any active pan. */
  cancel: () => void;
}

const PAN_SPEED = 4.5; // units per second of camera distance movement

export function createCameraDirector(camera: THREE.PerspectiveCamera): CameraDirector {
  let active = false;
  let fromCam = new THREE.Vector3();
  let fromTarget = new THREE.Vector3();
  let toCam = new THREE.Vector3();
  let toTarget = new THREE.Vector3();
  let t = 0;
  let duration = 0;

  function computeLookAt(target: THREE.Vector3, offset: THREE.Vector3 | undefined, outCam: THREE.Vector3, outTarget: THREE.Vector3): void {
    const off = offset ?? new THREE.Vector3(0, 2.5, 5.5);
    outTarget.copy(target);
    outCam.copy(target).add(off);
  }

  function distance(a: THREE.Vector3, b: THREE.Vector3): number {
    return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  return {
    panTo(target, offset) {
      computeLookAt(target, offset, toCam, toTarget);
      fromCam.copy(camera.position);
      // Estimate current target from camera position (camera looks at its
      // current target). For simplicity we use the projection: from the
      // camera's existing look direction, project a point in front.
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      fromTarget.copy(camera.position).addScaledVector(dir, 5);
      const dist = distance(fromCam, toCam) + distance(fromTarget, toTarget);
      duration = Math.max(0.4, dist / PAN_SPEED);
      t = 0;
      active = true;
    },
    snapTo(target, offset) {
      computeLookAt(target, offset, toCam, toTarget);
      camera.position.copy(toCam);
      camera.lookAt(toTarget);
      active = false;
      t = 0;
      duration = 0;
    },
    update(dt) {
      if (!active) return false;
      t += dt;
      const u = Math.min(1, t / duration);
      // Smoothstep ease.
      const e = u * u * (3 - 2 * u);
      camera.position.lerpVectors(fromCam, toCam, e);
      const tgt = new THREE.Vector3().lerpVectors(fromTarget, toTarget, e);
      camera.lookAt(tgt);
      if (u >= 1) {
        active = false;
        return false;
      }
      return true;
    },
    cancel() {
      active = false;
    },
  };
}
