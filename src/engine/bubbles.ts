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
 */
const BUBBLE_POOL_SIZE = 4;

/** Bubble anchor above the speaker's feet (hover label sits at 2.1). */
const ANCHOR_HEIGHT = 1.7;

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
 *  ellipsize anything longer). Exported for tests. */
export function fitLine(line: string): string {
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

  const clearSlot = (slot: BubbleSlot): void => {
    slot.active = false;
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
        slot.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
        slot.el.style.opacity = String(Math.min(1, Math.max(0, (slot.lifetime - slot.elapsed) / 0.5)));
        slot.el.hidden = false;
      }
    },
    show: (position, line) => {
      if (destroyed) return;
      const slot = pickRecyclableSlot(slots);
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
