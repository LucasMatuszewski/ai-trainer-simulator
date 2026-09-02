import * as THREE from "three";

export interface BubbleHandle {
  update: (dt: number, camera: THREE.Camera) => void;
  show: (speakerPosition: THREE.Vector3, line: string) => void;
  clear: () => void;
  /**
   * C-61: hard show/hide for the whole layer. Bubbles are DOM now, so
   * they would float ABOVE the summary / minigame UI unless gated -
   * the sprite version hid behind those panels naturally.
   */
  setVisible: (visible: boolean) => void;
  /**
   * C-61 fix: the camera to project with. The sprite renderer ignored
   * its camera argument (three.js placed sprites in world space), but
   * DOM projection NEEDS the real engine camera - the controller's
   * old scene-graph lookup returned nothing (the camera is never
   * added to the scene), so bubbles projected from a phantom default
   * camera at the origin and were only readable near it.
   */
  setCamera: (camera: THREE.Camera | null) => void;
  destroy: () => void;
}

/**
 * C-61: inter-NPC speech bubbles are plain DOM text, positioned each
 * frame exactly like the hover label (project the speaker's head into
 * screen space). The old canvas-texture sprites were rasterized once
 * and GPU-scaled, so their quality depended on distance and window
 * size; DOM text rasterizes at native resolution and stays sharp at a
 * constant size - Lucas: the hover label "is perfectly sharp even from
 * the distance", the bubbles must use the same method. No frame or
 * background: just the text (Lucas allowed dropping them), set apart
 * from the ivory labels by a pale-blue tint.
 *
 * C-61 amendment (Lucas): one bubble per speaker (a new line replaces
 * the speaker's previous one - Sims/UO style) and screen-space
 * push-apart: when two bubbles would overlap, the newer one lifts
 * above the older for as long as the overlap lasts, then settles back
 * down. That is the classic MMO overhead-chat solution.
 */
const BUBBLE_POOL_SIZE = 6;

/** Bubble anchor above the speaker's feet (hover label sits at 2.1). */
const ANCHOR_HEIGHT = 1.7;

/** Text metrics for the push-apart estimate. VT323 at 26px advances
 *  ~11.5px per glyph; lines are 29px tall. Estimates only - the rects
 *  exist to keep bubbles apart, not to be pixel-perfect. */
const CHAR_PX = 11.5;
const LINE_PX = 29;
const GAP_PX = 6;
const MAX_LIFT_PX = 140;

export function pickLine(lines: ReadonlyArray<string>, rng: () => number): string {
  if (lines.length === 0) return "";

  let index = Math.min(lines.length - 1, Math.floor(rng() * lines.length));
  const previous = lastLineByList.get(lines);
  if (lines.length > 1 && index === previous) index = (index + 1) % lines.length;
  lastLineByList.set(lines, index);
  return lines[index]!;
}

const lastLineByList = new WeakMap<ReadonlyArray<string>, number>();

/** Cap a line to at most 2 rows of 36 characters (wrap on a space,
 *  ellipsize anything longer). Lines that already carry their own
 *  newline (the dog's bark + subtitle format) pass through untouched.
 *  Exported for tests. */
export function fitLine(line: string): string {
  if (line.includes("\n")) return line;
  const maximumCharacters = 36;
  const maximumTotal = maximumCharacters * 2 - 3;
  const shortened = line.length > maximumTotal
    ? `${line.slice(0, maximumTotal).trimEnd()}...`
    : line;
  if (shortened.length <= maximumCharacters) return shortened;

  const breakAt = shortened.lastIndexOf(" ", maximumCharacters);
  const splitAt = breakAt > 0 ? breakAt : maximumCharacters;
  return `${shortened.slice(0, splitAt)}\n${shortened.slice(splitAt).trimStart()}`;
}

interface BubbleSlot {
  el: HTMLDivElement;
  /** Slot busy flag - deliberately NOT el.hidden, which now toggles
   *  every frame with the view (behind-camera bubbles hide but stay
   *  busy, exactly like the old invisible sprites did). */
  active: boolean;
  /** The speaker this slot belongs to (their live position vector).
   *  A speaker's next line reuses their slot - one bubble per head. */
  speakerPosition: THREE.Vector3 | null;
  elapsed: number;
  lifetime: number;
}

/** For a new bubble: any invisible slot, else the one with the LEAST
 *  remaining lifetime, so bursts recycle the oldest bubbles first. */
function pickRecyclableSlot(slots: readonly BubbleSlot[]): BubbleSlot {
  let chosen = slots[0]!;
  let leastRemaining = Number.POSITIVE_INFINITY;
  for (const slot of slots) {
    if (!slot.active) return slot;
    const remaining = slot.lifetime - slot.elapsed;
    if (remaining < leastRemaining) {
      leastRemaining = remaining;
      chosen = slot;
    }
  }
  return chosen;
}

/** The game canvas - supplies the projection rect. Optional so the
 *  system can run headless in unit tests (bubbles just stay hidden). */
function defaultCanvas(): HTMLCanvasElement | null {
  if (typeof document === "undefined") return null;
  return document.querySelector<HTMLCanvasElement>("#game-canvas");
}

/** Estimated on-screen size of a fitted bubble (see CHAR_PX/LINE_PX). */
function estimateRect(text: string): { w: number; h: number } {
  const rows = text.split("\n");
  const widest = Math.max(...rows.map((row) => row.length));
  return { w: widest * CHAR_PX, h: rows.length * LINE_PX };
}

export function createBubbleSystem(
  _scene: THREE.Scene,
  parent: HTMLElement | null = typeof document === "undefined" ? null : document.body,
  canvas: HTMLCanvasElement | null = defaultCanvas(),
): BubbleHandle {
  const layer = document.createElement("div");
  layer.className = "npc-bubble-layer";
  const slots: BubbleSlot[] = [];
  for (let i = 0; i < BUBBLE_POOL_SIZE; i += 1) {
    const el = document.createElement("div");
    el.className = "npc-bubble";
    el.hidden = true;
    layer.appendChild(el);
    slots.push({ el, active: false, speakerPosition: null, elapsed: 0, lifetime: 0 });
  }
  parent?.appendChild(layer);

  let destroyed = false;
  let layerVisible = true;
  let projectionCamera: THREE.Camera | null = null;
  const projected = new THREE.Vector3();
  const slotBySpeaker = new WeakMap<THREE.Vector3, BubbleSlot>();

  const clearSlot = (slot: BubbleSlot): void => {
    slot.active = false;
    if (slot.speakerPosition !== null) slotBySpeaker.delete(slot.speakerPosition);
    slot.speakerPosition = null;
    slot.elapsed = 0;
    slot.el.hidden = true;
  };

  return {
    update: (dt, camera) => {
      if (destroyed) return;
      const safeDt = Math.max(0, dt);
      const effectiveCamera = projectionCamera ?? camera;
      const rect = canvas?.getBoundingClientRect?.() ?? null;
      const placed: Array<{ slot: BubbleSlot; x: number; y: number; w: number; h: number }> = [];
      for (const slot of slots) {
        if (!slot.active || slot.speakerPosition === null) continue;
        slot.elapsed += safeDt;
        if (slot.elapsed >= slot.lifetime) {
          clearSlot(slot);
          continue;
        }
        if (!layerVisible || rect === null) {
          slot.el.hidden = true;
          continue;
        }
        projected.set(
          slot.speakerPosition.x,
          slot.speakerPosition.y + ANCHOR_HEIGHT,
          slot.speakerPosition.z,
        ).project(effectiveCamera);
        // Behind / clipped by the far plane - same guard as the label.
        if (projected.z > 1 || projected.z < -1) {
          slot.el.hidden = true;
          continue;
        }
        const x = (projected.x * 0.5 + 0.5) * rect.width;
        const y = (-projected.y * 0.5 + 0.5) * rect.height;
        const size = estimateRect(slot.el.textContent ?? "");
        placed.push({ slot, x, y, w: size.w, h: size.h });
      }

      // Push-apart: older bubbles keep their place, newer ones lift
      // above any overlap (UO-style stacking). Offsets are recomputed
      // every frame, so a lifted bubble settles back down as soon as
      // the crowd clears. Horizontal proximity gates the lift - two
      // bubbles at opposite ends of the office never touch.
      placed.sort((a, b) => b.slot.elapsed - a.slot.elapsed);
      const lifts = new Map<BubbleSlot, number>();
      for (let i = 1; i < placed.length; i += 1) {
        const current = placed[i]!;
        let lift = 0;
        for (let iter = 0; iter < 4; iter += 1) {
          let need = 0;
          for (let j = 0; j < i; j += 1) {
            const other = placed[j]!;
            const otherLift = lifts.get(other.slot) ?? 0;
            const horizontalOverlap =
              Math.abs(current.x - other.x) < (current.w + other.w) / 2 + GAP_PX;
            if (!horizontalOverlap) continue;
            const otherTop = other.y - otherLift - other.h;
            const currentBottom = current.y - lift;
            if (currentBottom < otherTop - GAP_PX) continue;
            need = Math.max(need, currentBottom - otherTop + GAP_PX);
          }
          if (need <= 0) break;
          lift = Math.min(lift + need, MAX_LIFT_PX);
        }
        if (lift > 0) lifts.set(current.slot, lift);
      }

      for (const entry of placed) {
        const lift = lifts.get(entry.slot) ?? 0;
        entry.slot.el.style.transform =
          `translate(${entry.x}px, ${entry.y - lift}px) translate(-50%, -100%)`;
        entry.slot.el.style.opacity = String(
          Math.min(1, Math.max(0, (entry.slot.lifetime - entry.slot.elapsed) / 0.5)),
        );
        entry.slot.el.hidden = false;
      }
    },
    show: (position, line) => {
      if (destroyed) return;
      // One bubble per speaker: their new line replaces the old one.
      const owned = slotBySpeaker.get(position);
      const slot = owned ?? pickRecyclableSlot(slots);
      if (owned === undefined) {
        slotBySpeaker.set(position, slot);
        // The recycled slot may still belong to another speaker.
        if (slot.speakerPosition !== null && slot.speakerPosition !== position) {
          slotBySpeaker.delete(slot.speakerPosition);
        }
      }
      slot.active = true;
      slot.speakerPosition = position;
      slot.elapsed = 0;
      // 6-8 s: long enough that the starter is still readable when the
      // reply lands at RESPONSE_DELAY_S (3.8 s) and the pair reads as
      // one exchange (Lucas, 2026-09-01).
      slot.lifetime = 6 + Math.random() * 2;
      slot.el.textContent = fitLine(line);
      slot.el.style.opacity = "1";
      slot.el.hidden = !layerVisible;
    },
    clear: () => {
      if (destroyed) return;
      for (const slot of slots) clearSlot(slot);
    },
    setVisible: (visible) => {
      if (destroyed) return;
      layerVisible = visible;
      if (!visible) {
        for (const slot of slots) slot.el.hidden = true;
      }
    },
    setCamera: (camera) => {
      projectionCamera = camera;
    },
    destroy: () => {
      if (destroyed) return;
      destroyed = true;
      for (const slot of slots) clearSlot(slot);
      layer.remove();
    },
  };
}
