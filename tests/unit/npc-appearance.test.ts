/**
 * C-63 (Lucas, 2026-09-02):
 *   "modify the npc model to have hands in skin color same as face. do
 *    not make whole arms longer, they length is ok now, I only need a
 *    skin color in the end of arm."
 *   "Can we add some skin color variety, maybe set it for every person
 *    together with other details about this person? Now everybody has
 *    exact same skin tone."
 *
 * Two contracts are pinned here:
 *  1. The hand is a separate, skin-colored box at the END of the arm,
 *     parented to the arm so it follows every rotation the walk cycle
 *     and the idle poses apply - and the TOTAL arm length is unchanged.
 *  2. Skin/hair/shirt are AUTHORED per person in `content/npcs.ts`, not
 *     derived from one shared constant, with a deterministic per-id
 *     fallback so the field stays optional.
 */
import * as THREE from "three";
import { describe, expect, it } from "vitest";
import {
  ARM_TOTAL_LENGTH,
  HAIR_TONE_COLORS,
  SHIRT_TONE_COLORS,
  SKIN_TONE_COLORS,
  createNpcMesh,
  skinToneForNpc,
} from "../../src/engine/npc-mesh";
import { NPCS } from "../../src/content/npcs";
import type { HairTone, ShirtTone, SkinTone } from "../../src/types";

function named(group: THREE.Object3D, name: string): THREE.Mesh {
  const found = group.getObjectByName(name);
  expect(found, `${name} is missing`).toBeInstanceOf(THREE.Mesh);
  return found as THREE.Mesh;
}

function colorOf(mesh: THREE.Mesh): number {
  const material = mesh.material as THREE.MeshLambertMaterial;
  return material.color.getHex();
}

describe("skin-colored hands (C-63)", () => {
  it.each(["male", "female"] as const)("gives a %s NPC a hand at the end of each arm", (gender) => {
    const npc = createNpcMesh(gender, 0, "bartek");
    for (const side of ["left", "right"] as const) {
      const arm = named(npc, `arm-${side}`);
      const hand = named(npc, `hand-${side}`);
      expect(hand.parent, "the hand must follow the arm's rotation").toBe(arm);
    }
  });

  it("paints the hands in exactly the head's skin color, not the shirt color", () => {
    const npc = createNpcMesh("female", 3, "klaudia");
    const skin = colorOf(named(npc, "head-mesh"));
    expect(colorOf(named(npc, "hand-left"))).toBe(skin);
    expect(colorOf(named(npc, "hand-right"))).toBe(skin);
    expect(colorOf(named(npc, "arm-left"))).not.toBe(skin);
  });

  it("keeps the total arm length unchanged - the sleeve gets shorter, the arm does not get longer", () => {
    // Lucas was explicit: "do not make whole arms longer, they length
    // is ok now". Shoulder is at y=0.95; the arm hangs down from it.
    const npc = createNpcMesh("male", 0, "bartek");
    npc.updateMatrixWorld(true);
    const hand = named(npc, "hand-left");
    const lowest = new THREE.Box3().setFromObject(hand).min.y;
    expect(lowest).toBeCloseTo(0.95 - ARM_TOTAL_LENGTH, 5);
    expect(ARM_TOTAL_LENGTH).toBeCloseTo(0.65, 5);
  });

  it("puts a hidden coffee mug in the right hand for the sip gesture", () => {
    const npc = createNpcMesh("male", 0, "bartek");
    const mug = npc.getObjectByName("mug");
    expect(mug?.parent).toBe(npc.getObjectByName("hand-right"));
    expect(mug?.visible, "the mug only appears during a coffee-sip").toBe(false);
  });

  it("gives the dog no humanoid hands", () => {
    const dog = createNpcMesh("dog");
    expect(dog.getObjectByName("hand-left")).toBeUndefined();
    expect(dog.getObjectByName("hand-right")).toBeUndefined();
  });
});

describe("per-person appearance (C-63)", () => {
  it("maps every named tone to a color", () => {
    const skins: SkinTone[] = ["porcelain", "fair", "olive", "tan", "brown", "deep"];
    const hairs: HairTone[] = ["black", "brown", "auburn", "blond", "grey", "dyed"];
    const shirts: ShirtTone[] = ["navy", "charcoal", "forest", "burgundy", "mustard", "teal", "violet", "rust"];
    for (const tone of skins) expect(SKIN_TONE_COLORS[tone]).toBeTypeOf("number");
    for (const tone of hairs) expect(HAIR_TONE_COLORS[tone]).toBeTypeOf("number");
    for (const tone of shirts) expect(SHIRT_TONE_COLORS[tone]).toBeTypeOf("number");
    expect(new Set(Object.values(SKIN_TONE_COLORS)).size).toBe(skins.length);
  });

  it("honors the authored skin tone over the id hash", () => {
    const npc = createNpcMesh("male", 0, "bartek", { skin: "deep" });
    expect(colorOf(named(npc, "head-mesh"))).toBe(SKIN_TONE_COLORS.deep);
    expect(colorOf(named(npc, "hand-left"))).toBe(SKIN_TONE_COLORS.deep);
  });

  it("falls back to a stable per-id tone when no appearance is authored", () => {
    expect(skinToneForNpc("tomek")).toBe(skinToneForNpc("tomek"));
    expect(colorOf(named(createNpcMesh("male", 0, "tomek"), "head-mesh")))
      .toBe(SKIN_TONE_COLORS[skinToneForNpc("tomek")]);
  });

  it("authors a skin tone for every human NPC, and gives the office more than one", () => {
    const humans = NPCS.filter((npc) => npc.gender !== "dog");
    for (const npc of humans) {
      expect(npc.appearance?.skin, `${npc.id} has no authored skin tone`).toBeDefined();
    }
    const tones = new Set(humans.map((npc) => npc.appearance!.skin));
    expect(tones.size, "everybody still has the exact same skin tone").toBeGreaterThanOrEqual(4);
  });

  it("does not give two colleagues the identical skin+hair+shirt combination", () => {
    const humans = NPCS.filter((npc) => npc.gender !== "dog");
    const looks = humans.map((npc) => JSON.stringify(npc.appearance));
    expect(new Set(looks).size).toBe(looks.length);
  });
});
