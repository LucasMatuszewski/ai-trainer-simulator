/**
 * @vitest-environment jsdom
 *
 * C-79: ID-card portraits drawn from the EXACT mesh palette. The
 * critical contract is parity with `createNpcMesh`: the portrait's
 * skin/hair/shirt must resolve the same way the 3D mesh does (authored
 * `appearance` first, per-id hash fallback second) so a portrait can
 * never drift from the model it represents.
 */
import { describe, expect, it } from "vitest";
import { NPCS } from "../../../src/content/npcs";
import {
  HAIR_TONE_COLORS,
  SHIRT_TONE_COLORS,
  SKIN_TONE_COLORS,
  hairToneForNpc,
  shirtToneForNpc,
  skinToneForNpc,
} from "../../../src/engine/npc-mesh";
import {
  PORTRAIT_BACKDROP,
  PORTRAIT_GRID,
  drawPortrait,
  drawRobotPortrait,
  portraitPaletteFor,
} from "../../../src/ui/portraits";

const hex = (value: number): string => `#${value.toString(16).padStart(6, "0")}`;

describe("portrait palette parity with the 3D mesh (C-79 drift guard)", () => {
  it("resolves skin/hair/shirt exactly like createNpcMesh for EVERY NPC", () => {
    for (const npc of NPCS) {
      if (npc.gender === "dog") continue; // Burek is a special mesh
      const palette = portraitPaletteFor(npc);
      const meshSkin = npc.appearance?.skin ?? skinToneForNpc(npc.id);
      const meshHair = npc.appearance?.hair ?? hairToneForNpc(npc.id);
      const meshShirt = npc.appearance?.shirt ?? shirtToneForNpc(npc.id);
      expect(palette.skin, `${npc.id} skin`).toBe(hex(SKIN_TONE_COLORS[meshSkin]!));
      expect(palette.hair, `${npc.id} hair`).toBe(hex(HAIR_TONE_COLORS[meshHair]!));
      expect(palette.shirt, `${npc.id} shirt`).toBe(hex(SHIRT_TONE_COLORS[meshShirt]!));
    }
  });

  it("keeps the known authored appearances (spot checks)", () => {
    const kasia = NPCS.find((n) => n.id === "kasia")!;
    expect(kasia.appearance).toBeDefined();
    const kasiaPalette = portraitPaletteFor(kasia);
    expect(kasiaPalette.skin).toBe(hex(SKIN_TONE_COLORS[kasia.appearance!.skin!]!));
    expect(kasiaPalette.hair).toBe(hex(HAIR_TONE_COLORS[kasia.appearance!.hair!]!));
    expect(kasiaPalette.shirt).toBe(hex(SHIRT_TONE_COLORS[kasia.appearance!.shirt!]!));

    const marek = NPCS.find((n) => n.id === "marek")!;
    expect(marek.appearance).toBeDefined();
    const marekPalette = portraitPaletteFor(marek);
    expect(marekPalette.skin).toBe(hex(SKIN_TONE_COLORS[marek.appearance!.skin!]!));
    expect(marekPalette.hair).toBe(hex(HAIR_TONE_COLORS[marek.appearance!.hair!]!));
    expect(marekPalette.shirt).toBe(hex(SHIRT_TONE_COLORS[marek.appearance!.shirt!]!));
    // The palettes must differ: distinct people, distinct photos.
    expect(kasiaPalette).not.toEqual(marekPalette);
  });

  it("mirrors the mesh silhouettes: long hair + no tie for women, cap + red tie for men", () => {
    for (const npc of NPCS) {
      if (npc.gender === "dog") continue;
      const palette = portraitPaletteFor(npc);
      expect(palette.hairLong, npc.id).toBe(npc.gender === "female");
      expect(palette.tie, npc.id).toBe(npc.gender === "male" ? "#992222" : null);
    }
  });

  it("draws Burek as a dog in his fur colors (not a human tone)", () => {
    const burek = NPCS.find((n) => n.id === "burek")!;
    const palette = portraitPaletteFor(burek);
    expect(palette.skin).toBe("#c4a060"); // createDogMesh fur
    expect(palette.hair).toBe("#9b7440"); // createDogMesh dark fur
    expect(palette.tie).toBeNull();
  });
});

describe("portrait drawing", () => {
  it("sizes the backing store and no-ops gracefully without a 2D context", () => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    // jsdom without the canvas package: getContext returns null. The
    // draw must not throw and must keep the square backing store.
    expect(() => drawPortrait(canvas, NPCS[0]!)).not.toThrow();
    expect(canvas.width).toBe(64);
    expect(canvas.height).toBe(64);
  });

  it("exposes a 32x32 logical grid on a light ID-photo backdrop", () => {
    expect(PORTRAIT_GRID).toBe(32);
    // A business/ID photo backdrop is light and neutral.
    const n = parseInt(PORTRAIT_BACKDROP.slice(1), 16);
    expect((n >> 16) & 0xff).toBeGreaterThan(0xc0);
    expect((n >> 8) & 0xff).toBeGreaterThan(0xc0);
    expect(n & 0xff).toBeGreaterThan(0xc0);
  });

  it("draws the robot portrait without throwing and keeps it square", () => {
    const canvas = document.createElement("canvas");
    canvas.width = 96;
    expect(() => drawRobotPortrait(canvas, "Rusty")).not.toThrow();
    expect(canvas.height).toBe(96);
    expect(canvas.getAttribute("aria-label")).toBe("Rusty");
  });
});
