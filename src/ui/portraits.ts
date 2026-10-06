/**
 * C-79 (Lucas): ID-card portraits for the roster and dialogue avatars
 * that reuse the EXACT colors of the 3D models — same hair, skin and
 * shirt — so matching portrait to model is instant. Drawn procedurally
 * from the same tone maps `createNpcMesh` reads, so the two can never
 * drift (a unit test pins the parity). The look is a business/ID photo:
 * front-facing neutral bust on a plain light studio backdrop.
 *
 * The emoji/letter avatar this replaces stays as the accessibility
 * label on the canvas element.
 */

import type { NPC } from "../types";
import {
  HAIR_TONE_COLORS,
  SHIRT_TONE_COLORS,
  SKIN_TONE_COLORS,
  hairToneForNpc,
  shirtToneForNpc,
  skinToneForNpc,
} from "../engine/npc-mesh";
import { COMPANION_ROBOT_COLORS } from "../engine/agent-companion";

/** One resolved portrait palette (hex strings, canvas-ready). */
export interface PortraitPalette {
  skin: string;
  hair: string;
  shirt: string;
  /** Female meshes wear the long-hair fall; male meshes the short cap. */
  hairLong: boolean;
  /** The male mesh's authored red tie; females have none. */
  tie: string | null;
}

const hex = (value: number): string => `#${value.toString(16).padStart(6, "0")}`;

/**
 * The portrait palette for one NPC, resolved exactly the way
 * `createNpcMesh` resolves it (authored `appearance` first, per-id
 * hash fallback second). Pure; the drift-guard test compares this
 * against the mesh constants for every NPC.
 */
export function portraitPaletteFor(npc: NPC): PortraitPalette {
  if (npc.gender === "dog") {
    // Burek: his fur colors come from createDogMesh (0xc4a060 body,
    // 0x9b7440 snout/ears/tail) — no human tone applies.
    return {
      skin: "#c4a060",
      hair: "#9b7440",
      shirt: "#c4a060",
      hairLong: false,
      tie: null,
    };
  }
  const skinTone = npc.appearance?.skin ?? skinToneForNpc(npc.id);
  const hairTone = npc.appearance?.hair ?? hairToneForNpc(npc.id);
  const shirtTone = npc.appearance?.shirt ?? shirtToneForNpc(npc.id);
  return {
    skin: hex(SKIN_TONE_COLORS[skinTone]!),
    hair: hex(HAIR_TONE_COLORS[hairTone]!),
    shirt: hex(SHIRT_TONE_COLORS[shirtTone]!),
    hairLong: npc.gender === "female",
    // createHumanoidBody: tie 0x992222 on male meshes only.
    tie: npc.gender === "male" ? "#992222" : null,
  };
}

/** A shade of `color` for hair depth (same hue, darker). */
function shade(color: string, factor: number): string {
  const n = parseInt(color.slice(1), 16);
  const r = Math.max(0, Math.round(((n >> 16) & 0xff) * factor));
  const g = Math.max(0, Math.round(((n >> 8) & 0xff) * factor));
  const b = Math.max(0, Math.round((n & 0xff) * factor));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

/** ID-photo studio backdrop — plain, light, slightly cool. */
export const PORTRAIT_BACKDROP = "#cdd3dc";
const BACKDROP_EDGE = "#b8bfca";
const INK = "#20242b";

/** The portrait's logical pixel grid (canvas is scaled by device pixels). */
export const PORTRAIT_GRID = 32;

/**
 * Draw the ID-card bust for `npc` onto `canvas`. A missing 2D context
 * (jsdom without the canvas package) degrades to a no-op that still
 * sizes the backing store.
 */
export function drawPortrait(canvas: HTMLCanvasElement, npc: NPC): void {
  const size = canvas.width;
  canvas.height = size;
  // Duck-typed context access: test doubles (and jsdom without the
  // canvas package) provide elements with no real getContext.
  if (typeof canvas.getContext !== "function") return;
  const ctx = canvas.getContext("2d");
  if (ctx === null) return;
  const cell = size / PORTRAIT_GRID;
  const px = (x: number, y: number, w: number, h: number, color: string): void => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x * cell), Math.round(y * cell), Math.ceil(w * cell), Math.ceil(h * cell));
  };

  const palette = portraitPaletteFor(npc);
  const hairDark = shade(palette.hair, 0.72);
  const skinDark = shade(palette.skin, 0.86);

  // Studio backdrop with a soft corner vignette (photo-print edge).
  px(0, 0, 32, 32, PORTRAIT_BACKDROP);
  px(0, 0, 32, 1, BACKDROP_EDGE);
  px(0, 31, 32, 1, BACKDROP_EDGE);
  px(0, 0, 1, 32, BACKDROP_EDGE);
  px(31, 0, 1, 32, BACKDROP_EDGE);

  if (npc.gender === "dog") {
    drawDogBust(px, palette);
    return;
  }

  // ── Shoulders (shirt) — the ID-photo crop cuts at mid-chest. ──
  px(7, 25, 18, 7, palette.shirt);
  px(5, 26, 3, 6, palette.shirt); // shoulder slopes
  px(24, 26, 3, 6, palette.shirt);
  px(5, 31, 3, 1, shade(palette.shirt, 0.8));
  px(24, 31, 3, 1, shade(palette.shirt, 0.8));
  // Neck.
  px(13, 22, 6, 4, palette.skin);
  px(13, 25, 6, 1, skinDark); // chin shadow on the neck
  if (palette.tie !== null) {
    // The male mesh's red tie, knot + blade, over a white collar.
    px(12, 25, 8, 2, "#e8e6e0");
    px(15, 25, 2, 2, palette.tie);
    px(15, 27, 2, 4, palette.tie);
  } else {
    // Female mesh: collar line in a darker shirt shade.
    px(13, 25, 6, 1, shade(palette.shirt, 0.8));
  }

  // ── Head (front-facing, ID-photo straight). ──
  px(10, 8, 12, 15, palette.skin);
  px(9, 10, 1, 10, palette.skin); // ears
  px(22, 10, 1, 10, palette.skin);
  px(10, 8, 12, 1, skinDark); // hairline shadow
  px(10, 22, 12, 1, skinDark); // jaw shadow

  // Hair: short cap (male) or cap + side falls to the shoulders (female).
  px(9, 6, 14, 3, palette.hair);
  px(9, 9, 2, 2, palette.hair);
  px(21, 9, 2, 2, palette.hair);
  if (palette.hairLong) {
    px(7, 8, 2, 17, palette.hair);
    px(23, 8, 2, 17, palette.hair);
    px(7, 24, 2, 1, hairDark);
    px(23, 24, 2, 1, hairDark);
  }

  // Face: brows, eyes, nose hint, neutral mouth.
  px(12, 13, 3, 1, hairDark);
  px(17, 13, 3, 1, hairDark);
  px(12, 14, 2, 2, INK);
  px(18, 14, 2, 2, INK);
  px(15, 17, 2, 1, skinDark);
  px(13, 19, 6, 1, shade(palette.skin, 0.7));
}

/** Burek: dog bust in the createDogMesh fur colors. */
function drawDogBust(
  px: (x: number, y: number, w: number, h: number, color: string) => void,
  palette: PortraitPalette,
): void {
  // Chest/shoulders.
  px(9, 24, 14, 8, palette.shirt);
  // Head with snout.
  px(10, 10, 12, 10, palette.skin);
  px(14, 17, 5, 4, palette.hair); // snout in darkFur
  px(15, 19, 3, 1, INK); // nose
  // Floppy ears.
  px(8, 9, 2, 6, palette.hair);
  px(22, 9, 2, 6, palette.hair);
  px(8, 15, 2, 1, shade(palette.hair, 0.85));
  px(22, 15, 2, 1, shade(palette.hair, 0.85));
  // Eyes.
  px(12, 14, 2, 2, INK);
  px(18, 14, 2, 2, INK);
}

/**
 * Draw every `canvas[data-portrait]` inside `root` with its matching
 * NPC (lookup by the canvas's data-portrait id). Call after any render
 * that stamps portrait markup.
 */
export function drawPortraitsIn(root: ParentNode, npcs: readonly NPC[]): void {
  const byId = new Map(npcs.map((npc) => [npc.id, npc] as const));
  const canvases = root.querySelectorAll<HTMLCanvasElement>("canvas[data-portrait]");
  for (const canvas of canvases) {
    const npc = byId.get((canvas.dataset.portrait ?? "") as NPC["id"]);
    if (npc !== undefined) drawPortrait(canvas, npc);
  }
}

/**
 * C-79: the agent companion's portrait — a robot bust in the EXACT
 * colors `applyRobotSkin` paints the 3D companion with (imported from
 * the engine, so the pair cannot drift either).
 */
export function drawRobotPortrait(canvas: HTMLCanvasElement, label: string): void {
  const size = canvas.width;
  canvas.height = size;
  if (typeof canvas.setAttribute === "function") canvas.setAttribute("aria-label", label);
  if (typeof canvas.getContext !== "function") return;
  const ctx = canvas.getContext("2d");
  if (ctx === null) return;
  const cell = size / PORTRAIT_GRID;
  const px = (x: number, y: number, w: number, h: number, color: string): void => {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x * cell), Math.round(y * cell), Math.ceil(w * cell), Math.ceil(h * cell));
  };
  const chassis = hex(COMPANION_ROBOT_COLORS.CHASSIS);
  const faceplate = hex(COMPANION_ROBOT_COLORS.FACEPLATE);
  const visor = hex(COMPANION_ROBOT_COLORS.VISOR);
  const trim = hex(COMPANION_ROBOT_COLORS.TRIM);

  px(0, 0, 32, 32, PORTRAIT_BACKDROP);
  px(0, 0, 32, 1, BACKDROP_EDGE);
  px(0, 31, 32, 1, BACKDROP_EDGE);
  px(0, 0, 1, 32, BACKDROP_EDGE);
  px(31, 0, 1, 32, BACKDROP_EDGE);
  // Shoulders in brushed metal with trim seams.
  px(7, 25, 18, 7, chassis);
  px(5, 26, 3, 6, chassis);
  px(24, 26, 3, 6, chassis);
  px(5, 28, 22, 1, trim);
  // Neck.
  px(13, 22, 6, 4, trim);
  // Head: dark faceplate, visor band, antenna.
  px(10, 8, 12, 14, faceplate);
  px(12, 12, 8, 4, visor);
  px(13, 13, 2, 2, faceplate);
  px(17, 13, 2, 2, faceplate); // visor "eyes"
  px(15, 5, 2, 3, trim);
  px(15, 4, 2, 1, visor);
  // Speaker grille.
  px(12, 19, 8, 1, trim);
}
