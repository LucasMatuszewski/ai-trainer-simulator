/**
 * Tests for the interaction raycaster.
 *
 * The pure-data parts (ndcFromMouse) are fully testable. The
 * intersection (pickFromCamera) uses three.js' Raycaster under the
 * hood, but we can mock it with a stub that returns a fixed hit list
 * and verify the wrapping logic (NPC-wins, hit categorization, no-hit
 * path).
 */

import { describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import {
  ndcFromMouse,
  pickFromCamera,
  type InteractionHit,
} from "../../src/engine/interaction-raycaster";

describe("ndcFromMouse", () => {
  it("converts the center of the canvas to (0, 0)", () => {
    const ndc = ndcFromMouse(240, 135, { left: 0, top: 0, width: 480, height: 270 });
    expect(ndc.x).toBeCloseTo(0, 6);
    expect(ndc.y).toBeCloseTo(0, 6);
  });

  it("converts the top-left to (-1, +1)", () => {
    const ndc = ndcFromMouse(0, 0, { left: 0, top: 0, width: 480, height: 270 });
    expect(ndc.x).toBeCloseTo(-1, 6);
    expect(ndc.y).toBeCloseTo(1, 6);
  });

  it("converts the bottom-right to (+1, -1)", () => {
    const ndc = ndcFromMouse(480, 270, { left: 0, top: 0, width: 480, height: 270 });
    expect(ndc.x).toBeCloseTo(1, 6);
    expect(ndc.y).toBeCloseTo(-1, 6);
  });

  it("respects the canvas rect (canvas offset on the page)", () => {
    // Canvas starts at (100, 50) on the page. Mouse at (100, 50) on
    // the page is therefore at the top-left of the canvas: NDC
    // (-1, +1).
    const ndc = ndcFromMouse(100, 50, { left: 100, top: 50, width: 480, height: 270 });
    expect(ndc.x).toBeCloseTo(-1, 6);
    expect(ndc.y).toBeCloseTo(1, 6);
  });
});

describe("pickFromCamera", () => {
  // Build a stub raycaster that returns whatever hits[] we want. This
  // lets us test the wrapper logic without a real three.js scene.
  function makeStubRaycaster(hits: THREE.Intersection[]): THREE.Raycaster {
    return {
      intersectObjects: vi.fn().mockReturnValue(hits),
    } as unknown as THREE.Raycaster;
  }

  function makeMesh(): THREE.Mesh {
    return new THREE.Mesh();
  }

  it("returns the NPC hit when an NPC is in front of an object", () => {
    const npcMesh = makeMesh();
    const objMesh = makeMesh();
    const npcMap = new Map<string, THREE.Mesh>([["bartek", npcMesh]]);
    const objMap = new Map<string, THREE.Mesh>([["coffee-machine", objMesh]]);
    const raycaster = makeStubRaycaster([
      {
        object: npcMesh,
        point: new THREE.Vector3(0, 0, -1),
        distance: 2,
      } as THREE.Intersection,
      {
        object: objMesh,
        point: new THREE.Vector3(0, 0, -2),
        distance: 4,
      } as THREE.Intersection,
    ]);

    const hit: InteractionHit = pickFromCamera({
      raycaster,
      npcMeshes: npcMap,
      interactableMeshes: objMap,
    });
    expect(hit.kind).toBe("npc");
    if (hit.kind === "npc") {
      expect(hit.npcId).toBe("bartek");
      expect(hit.distance).toBe(2);
    }
  });

  it("returns the object hit when no NPC is in range", () => {
    const objMesh = makeMesh();
    const raycaster = makeStubRaycaster([
      {
        object: objMesh,
        point: new THREE.Vector3(0, 0, -1),
        distance: 2,
      } as THREE.Intersection,
    ]);
    const hit = pickFromCamera({
      raycaster,
      npcMeshes: new Map(),
      interactableMeshes: new Map([["coffee-machine", objMesh]]),
    });
    expect(hit.kind).toBe("object");
    if (hit.kind === "object") {
      expect(hit.objectId).toBe("coffee-machine");
    }
  });

  it("returns 'none' when no meshes are hit", () => {
    const raycaster = makeStubRaycaster([]);
    const hit = pickFromCamera({
      raycaster,
      npcMeshes: new Map(),
      interactableMeshes: new Map(),
    });
    expect(hit.kind).toBe("none");
  });

  it("ignores NPC hits past maxDistance", () => {
    const npcMesh = makeMesh();
    const raycaster = makeStubRaycaster([
      {
        object: npcMesh,
        point: new THREE.Vector3(0, 0, -100),
        distance: 100,
      } as THREE.Intersection,
    ]);
    const hit = pickFromCamera({
      raycaster,
      npcMeshes: new Map([["bartek", npcMesh]]),
      interactableMeshes: new Map(),
      maxDistance: 10,
    });
    expect(hit.kind).toBe("none");
  });

  it("returns the closest NPC when multiple are hit", () => {
    // Two NPCs are both in the raycast. The closer one (lower
    // distance) should win.
    const meshA = makeMesh();
    const meshB = makeMesh();
    const raycaster = makeStubRaycaster([
      {
        object: meshA,
        point: new THREE.Vector3(0, 0, -1),
        distance: 2,
      } as THREE.Intersection,
      {
        object: meshB,
        point: new THREE.Vector3(0, 0, -1),
        distance: 5,
      } as THREE.Intersection,
    ]);
    const hit = pickFromCamera({
      raycaster,
      npcMeshes: new Map([
        ["npc-a", meshA],
        ["npc-b", meshB],
      ]),
      interactableMeshes: new Map(),
    });
    expect(hit.kind).toBe("npc");
    if (hit.kind === "npc") {
      expect(hit.npcId).toBe("npc-a");
    }
  });

  it("resolves a hit on a CHILD mesh to the owning NPC group", () => {
    // Regression guard for the mesh-NPC rework: npcMeshes holds
    // GROUPS (head/torso/limb children carry the geometry), so the
    // raycast must be recursive and the hit must resolve to the
    // group's owner via the parent chain / userData.npcId.
    const group = new THREE.Group();
    group.userData.npcId = "bartek";
    const head = new THREE.Mesh();
    group.add(head);
    const raycaster = makeStubRaycaster([
      { object: head, point: new THREE.Vector3(), distance: 3 } as THREE.Intersection,
    ]);
    const hit = pickFromCamera({
      raycaster,
      npcMeshes: new Map([["bartek", group as unknown as THREE.Mesh]]),
      interactableMeshes: new Map(),
    });
    expect(hit.kind).toBe("npc");
    if (hit.kind === "npc") expect(hit.npcId).toBe("bartek");
  });
});
