import * as THREE from "three";

export interface BubbleHandle {
  update: (dt: number, camera: THREE.Camera) => void;
  show: (speakerPosition: THREE.Vector3, line: string) => void;
  clear: () => void;
  destroy: () => void;
}

export const INTER_NPC_LINES: string[] = [
  "Did you restart it?",
  "The printer is jammed again.",
  "Standup in 5, be ready.",
  "At 5?! Am or Pm?",
  "I'll merge it after lunch.",
  "Chat Bot is down again.",
  "Who broke the build? Again!",
  "Coffee? I just had 4.",
  "Can you review my PR?",
  "What Freud would say about that bat?",
  "I guess it's some bat-complex",
  "Did the deploy go out?",
  "The wifi is being weird today.",
  "!!! $#%#$@$% !!!",
  "Is he still staring at me?",
  "Shh... They are watching...",
  "Have you seen my pierogi?",
  "Just KISS, ok?",
];

const lastLineByList = new WeakMap<ReadonlyArray<string>, number>();

export function pickLine(lines: ReadonlyArray<string>, rng: () => number): string {
  if (lines.length === 0) return "";

  let index = Math.min(lines.length - 1, Math.floor(rng() * lines.length));
  const previous = lastLineByList.get(lines);
  if (lines.length > 1 && index === previous) index = (index + 1) % lines.length;
  lastLineByList.set(lines, index);
  return lines[index]!;
}

export function shouldShowBubble(
  distance: number,
  dtSinceLastCheck: number,
  rng: () => number,
): boolean {
  if (distance > 2.5) return false;
  const interval = 8 + rng() * 4;
  return dtSinceLastCheck >= interval && rng() < 0.25;
}

export function findClosestPair(
  npcs: ReadonlyArray<{ id: string; position: { x: number; z: number } }>,
  threshold: number,
): [string, string] | null {
  let closest: [string, string] | null = null;
  let closestDistanceSquared = threshold * threshold;

  for (let first = 0; first < npcs.length; first += 1) {
    for (let second = first + 1; second < npcs.length; second += 1) {
      const a = npcs[first]!;
      const b = npcs[second]!;
      const dx = a.position.x - b.position.x;
      const dz = a.position.z - b.position.z;
      const distanceSquared = dx * dx + dz * dz;
      if (distanceSquared <= closestDistanceSquared) {
        closestDistanceSquared = distanceSquared;
        closest = [a.id, b.id];
      }
    }
  }

  return closest;
}

function fitLine(line: string): string[] {
  const maximumCharacters = 32;
  const maximumTotal = maximumCharacters * 2 - 3;
  const shortened = line.length > maximumTotal
    ? `${line.slice(0, maximumTotal).trimEnd()}...`
    : line;
  if (shortened.length <= maximumCharacters) return [shortened];

  const breakAt = shortened.lastIndexOf(" ", maximumCharacters);
  const splitAt = breakAt > 0 ? breakAt : maximumCharacters;
  return [shortened.slice(0, splitAt), shortened.slice(splitAt).trimStart()];
}

function makeTexture(line: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  if (context === null) throw new Error("Unable to create speech bubble canvas");

  context.fillStyle = "#171528";
  context.fillRect(0, 0, canvas.width, canvas.height - 8);
  context.fillStyle = "#171528";
  context.beginPath();
  context.moveTo(112, 56);
  context.lineTo(128, 64);
  context.lineTo(144, 56);
  context.fill();
  context.strokeStyle = "#f4d35e";
  context.lineWidth = 3;
  context.strokeRect(1.5, 1.5, canvas.width - 3, canvas.height - 11);
  context.fillStyle = "#fff7d6";
  context.font = "bold 15px monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  const lines = fitLine(line);
  lines.forEach((text, index) => {
    const y = lines.length === 1 ? 28 : 19 + index * 20;
    context.fillText(text, 128, y, 248);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
}

export function createBubbleSystem(scene: THREE.Scene): BubbleHandle {
  const material = new THREE.SpriteMaterial({
    transparent: true,
    depthTest: false,
    sizeAttenuation: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.visible = false;
  sprite.scale.set(0.42, 0.105, 1);
  sprite.renderOrder = 1000;
  scene.add(sprite);

  let speakerPosition: THREE.Vector3 | null = null;
  let elapsed = 0;
  let lifetime = 0;
  let texture: THREE.CanvasTexture | null = null;
  let destroyed = false;

  const clear = (): void => {
    sprite.visible = false;
    speakerPosition = null;
    elapsed = 0;
  };

  return {
    update: (dt, camera) => {
      void camera;
      if (destroyed || !sprite.visible || speakerPosition === null) return;
      elapsed += Math.max(0, dt);
      sprite.position.set(speakerPosition.x, speakerPosition.y + 1.7, speakerPosition.z);
      material.opacity = Math.min(1, Math.max(0, (lifetime - elapsed) / 0.5));
      if (elapsed >= lifetime) clear();
    },
    show: (position, line) => {
      if (destroyed) return;
      texture?.dispose();
      texture = makeTexture(line);
      material.map = texture;
      material.opacity = 1;
      material.needsUpdate = true;
      speakerPosition = position;
      elapsed = 0;
      lifetime = 4 + Math.random() * 2;
      sprite.position.set(position.x, position.y + 1.7, position.z);
      sprite.visible = true;
    },
    clear,
    destroy: () => {
      if (destroyed) return;
      destroyed = true;
      clear();
      scene.remove(sprite);
      texture?.dispose();
      material.dispose();
    },
  };
}
