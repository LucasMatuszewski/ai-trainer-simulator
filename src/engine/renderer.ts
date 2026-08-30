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

const RENDER_PIXEL_WIDTH = 640;
const RENDER_PIXEL_HEIGHT = 360;

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

export function configureRendererQuality(renderer: THREE.WebGLRenderer): void {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
}

export function createEngine(canvas: HTMLCanvasElement): Engine {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    // Antialias ON. The 480x270 buffer is still tiny so the GPU MSAA cost
    // is negligible, and the jagged edges look horrible at any zoom. The
    // CSS `image-rendering: pixelated` upscale on the canvas element is
    // what gives us the pixel-art look, not per-fragment disabling of MSAA.
    antialias: true,
    powerPreference: "high-performance",
    // preserveDrawingBuffer lets the browser's screenshot / toDataURL pick up
    // the most recent frame. Without it WebGL clears the back buffer after
    // each composite, and Playwright (and copy-paste) see a blank canvas.
    // Tiny perf cost in exchange for a much smoother dev experience.
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(1);
  configureRendererQuality(renderer);
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
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -30;
  key.shadow.camera.right = 30;
  key.shadow.camera.top = 25;
  key.shadow.camera.bottom = -25;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 60;
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
