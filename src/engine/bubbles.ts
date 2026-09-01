import * as THREE from "three";

export interface BubbleHandle {
  update: (dt: number, camera: THREE.Camera) => void;
  show: (speakerPosition: THREE.Vector3, line: string) => void;
  clear: () => void;
  destroy: () => void;
}

/**
 * C-46: up to MAX_CONVERSATIONS (=2) exchanges can run at once (plus
 * Burek's ambient bark), so the system keeps a small pool of bubble
 * sprites instead of the single sprite the old locked-pair design
 * could get away with.
 */
const BUBBLE_POOL_SIZE = 4;

export function pickLine(lines: ReadonlyArray<string>, rng: () => number): string {
  if (lines.length === 0) return "";

  let index = Math.min(lines.length - 1, Math.floor(rng() * lines.length));
  const previous = lastLineByList.get(lines);
  if (lines.length > 1 && index === previous) index = (index + 1) % lines.length;
  lastLineByList.set(lines, index);
  return lines[index]!;
}

const lastLineByList = new WeakMap<ReadonlyArray<string>, number>();

function fitLine(line: string): string[] {
  const maximumCharacters = 36;
  const maximumTotal = maximumCharacters * 2 - 3;
  const shortened = line.length > maximumTotal
    ? `${line.slice(0, maximumTotal).trimEnd()}...`
    : line;
  if (shortened.length <= maximumCharacters) return [shortened];

  const breakAt = shortened.lastIndexOf(" ", maximumCharacters);
  const splitAt = breakAt > 0 ? breakAt : maximumCharacters;
  return [shortened.slice(0, splitAt), shortened.slice(splitAt).trimStart()];
}

/**
 * C-55: draw the bubble at 4x the old pixel count with the hover
 * label's own font (VT323) and linear filtering. The old 256x64
 * canvas with a 16px monospace font and NearestFilter upscaled into
 * unreadable blocks - the hover label is plain DOM text at 26px VT323,
 * which is why it was sharp while the bubbles were mush.
 */
function makeTexture(line: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context === null) throw new Error("Unable to create speech bubble canvas");

  context.fillStyle = "#17152880";
  context.fillRect(0, 0, canvas.width, canvas.height - 16);
  context.fillStyle = "#17152899";
  context.beginPath();
  context.moveTo(224, 112);
  context.lineTo(256, 128);
  context.lineTo(288, 112);
  context.fill();
  context.strokeStyle = "#f4d35e80";
  context.lineWidth = 6;
  context.strokeRect(3, 3, canvas.width - 6, canvas.height - 22);
  context.fillStyle = "#fff7d6";
  context.textAlign = "center";
  context.textBaseline = "middle";
  const lines = fitLine(line);
  // One shared font size for both lines: shrink until the widest
  // line fits the bubble's inner width.
  const baseFontPx = 44;
  const maxTextWidth = canvas.width - 32;
  let fontPx = baseFontPx;
  const setFont = (): void => {
    context.font = `${fontPx}px "VT323", monospace`;
  };
  setFont();
  const widest = (): number => {
    let max = 0;
    for (const text of lines) max = Math.max(max, context.measureText(text).width);
    return max;
  };
  const measured = widest();
  if (measured > maxTextWidth) {
    fontPx = Math.max(24, Math.floor(baseFontPx * maxTextWidth / measured));
    setFont();
  }
  lines.forEach((text, index) => {
    const y = lines.length === 1 ? 56 : 40 + index * 44;
    context.fillText(text, canvas.width / 2, y);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  // C-55 amendment (Lucas: "very blurry now, like with some filter"):
  // NO mipmaps. The sprite renders smaller than the 512px texture at
  // typical viewports, so mip filtering blended in the half-res mip -
  // the text was effectively drawn from a 256x64 copy again, i.e. the
  // old blur. Plain linear sampling always reads the full-res canvas.
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

interface BubbleSlot {
  sprite: THREE.Sprite;
  material: THREE.SpriteMaterial;
  texture: THREE.CanvasTexture | null;
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
    if (!slot.sprite.visible) return slot;
    const remaining = slot.lifetime - slot.elapsed;
    if (remaining < leastRemaining) {
      leastRemaining = remaining;
      chosen = slot;
    }
  }
  return chosen;
}

export function createBubbleSystem(scene: THREE.Scene): BubbleHandle {
  // C-55: the canvas can only draw VT323 once the face is loaded; it
  // is normally in by the first bubble (the DOM uses it everywhere),
  // but ask for it explicitly so the first texture never falls back
  // to monospace.
  if (typeof document !== "undefined") {
    void document.fonts?.load('44px "VT323"').catch(() => { /* font stays fallback */ });
  }
  const slots: BubbleSlot[] = [];
  for (let i = 0; i < BUBBLE_POOL_SIZE; i += 1) {
    const material = new THREE.SpriteMaterial({
      transparent: true,
      depthTest: false,
      sizeAttenuation: false,
    });
    const sprite = new THREE.Sprite(material);
    sprite.visible = false;
    // C-55 amendment: back to the original on-screen size - the scale
    // bump bought nothing and Lucas flagged it as the visible change.
    sprite.scale.set(0.42, 0.105, 1);
    sprite.renderOrder = 1000;
    scene.add(sprite);
    slots.push({
      sprite,
      material,
      texture: null,
      speakerPosition: null,
      elapsed: 0,
      lifetime: 0,
    });
  }

  let destroyed = false;

  const clearSlot = (slot: BubbleSlot): void => {
    slot.sprite.visible = false;
    slot.speakerPosition = null;
    slot.elapsed = 0;
  };

  return {
    update: (dt, camera) => {
      void camera;
      if (destroyed) return;
      const safeDt = Math.max(0, dt);
      for (const slot of slots) {
        if (!slot.sprite.visible || slot.speakerPosition === null) continue;
        slot.elapsed += safeDt;
        slot.sprite.position.set(
          slot.speakerPosition.x,
          slot.speakerPosition.y + 1.7,
          slot.speakerPosition.z,
        );
        slot.material.opacity = Math.min(1, Math.max(0, (slot.lifetime - slot.elapsed) / 0.5));
        if (slot.elapsed >= slot.lifetime) clearSlot(slot);
      }
    },
    show: (position, line) => {
      if (destroyed) return;
      const slot = pickRecyclableSlot(slots);
      slot.texture?.dispose();
      slot.texture = makeTexture(line);
      slot.material.map = slot.texture;
      slot.material.opacity = 1;
      slot.material.needsUpdate = true;
      slot.speakerPosition = position;
      slot.elapsed = 0;
      // 6-8 s: long enough that the starter is still readable when the
      // reply lands at RESPONSE_DELAY_S (3.8 s) and the pair reads as
      // one exchange (Lucas, 2026-09-01).
      slot.lifetime = 6 + Math.random() * 2;
      slot.sprite.position.set(position.x, position.y + 1.7, position.z);
      slot.sprite.visible = true;
    },
    clear: () => {
      if (destroyed) return;
      for (const slot of slots) clearSlot(slot);
    },
    destroy: () => {
      if (destroyed) return;
      destroyed = true;
      for (const slot of slots) {
        clearSlot(slot);
        scene.remove(slot.sprite);
        slot.texture?.dispose();
        slot.material.dispose();
      }
    },
  };
}
