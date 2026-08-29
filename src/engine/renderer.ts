/**
 * three.js renderer wrapper.
 *
 * Pixel-art look: render the 3D scene to a small canvas (e.g. 640x360) and
 * upscale via CSS `image-rendering: pixelated` on the canvas element.
 *
 * Previous version used a render-target + full-screen quad blit, but the
 * custom ShaderMaterial post-pass was producing a black canvas on some
 * drivers. Rendering directly to a small canvas (with CSS pixelated upscale)
 * is simpler, faster, and visually identical.
 *
 * Resize: keep the internal buffer at a small fixed pixel size (e.g. 480x270)
 * so we never pay for high-res rasterization, but the canvas element fills
 * the viewport. CSS scales it up with nearest-neighbor.
 */

import * as THREE from "three";

const RENDER_PIXEL_WIDTH = 480;
const RENDER_PIXEL_HEIGHT = 270;

export interface Engine {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  /** Kept for backward compat; not used internally any more. */
  renderTarget: null;
  fullScreenQuad: null;
  postScene: null;
  postCamera: null;
  update: (deltaSeconds: number) => void;
  render: () => void;
  resize: () => void;
  dispose: () => void;
}

export function createEngine(canvas: HTMLCanvasElement): Engine {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // Internal buffer is small; CSS upscales with `image-rendering: pixelated`.
  renderer.setSize(RENDER_PIXEL_WIDTH, RENDER_PIXEL_HEIGHT, false);

  // 3D scene.
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2a3340); // moody but visibly blue-grey

  // Camera: over-the-shoulder follow. Controls will overwrite this every
  // frame; the initial value just prevents a flicker before controls.update()
  // runs.
  const aspect = RENDER_PIXEL_WIDTH / RENDER_PIXEL_HEIGHT;
  const camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 100);
  camera.position.set(0, 2.5, 8);
  camera.lookAt(0, 0.5, 4);

  // Lighting: strong so we can actually see the room. Ambient 1.0 (no shadow
  // shading) + a bright key directional so the player can read the scene.
  const ambient = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xffffff, 1.2);
  key.position.set(5, 10, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xccddff, 0.6);
  fill.position.set(-5, 6, -5);
  scene.add(fill);

  function render(): void {
    renderer.setRenderTarget(null);
    renderer.clear();
    renderer.render(scene, camera);
  }

  function resize(): void {
    // The render buffer stays at 480x270 so we get the pixel-art look. The
    // canvas element itself is sized to fill the viewport (CSS handles the
    // upscale).
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Re-apply fixed buffer size; some browsers resize the buffer when CSS
    // changes if we don't.
    renderer.setSize(RENDER_PIXEL_WIDTH, RENDER_PIXEL_HEIGHT, false);
  }

  function update(_deltaSeconds: number): void {
    // Reserved for future per-frame updates (animations, particle systems).
  }

  function dispose(): void {
    renderer.dispose();
  }

  resize();
  window.addEventListener("resize", resize);

  return {
    scene,
    camera,
    renderer,
    renderTarget: null,
    fullScreenQuad: null,
    postScene: null,
    postCamera: null,
    update,
    render,
    resize,
    dispose,
  };
}
