# Fix: 3D office scene renders almost-black, HUD missing

## Context
A 3D pixel-art browser game using three.js 0.169.0 + Vite + TypeScript. After
the user passes the title screen and character creation, the in-browser 3D
office view shows almost-entirely black with a few faint dark gray rectangles.
The mouse moves the view, so the scene IS rendering, but it is very dark and
distorted. The HUD (cash/day) is also not visible.

The code that matters:

## Files

### src/engine/renderer.ts (createEngine)
```ts
const RENDER_TARGET_WIDTH = 640;
const RENDER_TARGET_HEIGHT = 360;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
renderer.setPixelRatio(1);
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;

// render target — explicitly NOT sRGB to avoid double-encoding
const renderTarget = new THREE.WebGLRenderTarget(RENDER_TARGET_WIDTH, RENDER_TARGET_HEIGHT, {
  minFilter: THREE.NearestFilter,
  magFilter: THREE.NearestFilter,
  format: THREE.RGBAFormat,
  type: THREE.UnsignedByteType,
  depthBuffer: true,
  stencilBuffer: false,
});

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a1a1a);

const aspect = RENDER_TARGET_WIDTH / RENDER_TARGET_HEIGHT;
const camera = new THREE.PerspectiveCamera(55, aspect, 0.1, 100);
camera.position.set(0, 3, 9);
camera.lookAt(0, 0.5, 5);

const ambient = new THREE.AmbientLight(0xffffff, 0.5); scene.add(ambient);
const key = new THREE.DirectionalLight(0xffffff, 0.8); key.position.set(5, 10, 5); scene.add(key);
const fill = new THREE.DirectionalLight(0xccddff, 0.3); fill.position.set(-5, 6, -5); scene.add(fill);

const postScene = new THREE.Scene();
const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const quadGeom = new THREE.PlaneGeometry(2, 2);
const quadMat = new THREE.ShaderMaterial({
  uniforms: { tDiffuse: { value: renderTarget.texture }, resolution: { value: new THREE.Vector2(RENDER_TARGET_WIDTH, RENDER_TARGET_HEIGHT) } },
  vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`,
  fragmentShader: `precision highp float; uniform sampler2D tDiffuse; uniform vec2 resolution; varying vec2 vUv;
    void main() {
      vec3 color = texture2D(tDiffuse, vUv).rgb;
      color = floor(color * 32.0) / 32.0;
      gl_FragColor = vec4(color, 1.0);
    }`,
  depthTest: false, depthWrite: false,
});
const fullScreenQuad = new THREE.Mesh(quadGeom, quadMat);
postScene.add(fullScreenQuad);

function render() {
  renderer.setRenderTarget(renderTarget);
  renderer.clear();
  renderer.render(scene, camera);
  renderer.setRenderTarget(null);
  renderer.clear();
  renderer.render(postScene, postCamera);
}

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
```

### src/engine/controls.ts (camera follows player)
- Player start: (0, 0.5, 5)
- Per frame: yaw/pitch from mouse, camera placed at
  `player + (sin(yaw)*D*cos(pitch), H*(1-cos(pitch))+1, cos(yaw)*D*cos(pitch))`
  with D=4, H=2.5, looking at the player.
- `mousemove` handler updates `mouseDelta` only when pointer-locked. The
  browser console reports `The root document of this element is not valid
  for pointer lock` — pointer lock fails in Playwright. The user has not
  clicked to lock yet when the screen first appears.

### src/engine/scene.ts (summary)
- 18x18m office (x and z both in [-9, +9]), 3m walls, ceiling at 3.1m.
- Floor: BoxGeometry 18x0.2x18 at y=-0.1, color 0x3d4a3a (dark olive),
  MeshLambertMaterial.
- Walls + ceiling: same Lambert material, color 0x6b6356 (warm grey).
- Five MeshLambertMaterial NPCs (body 0x884422, head 0xddaa88) at y=0,
  body 0.5m tall, head 1.25m tall.
- 5 desks, meeting table, server rack, coffee machine, vending machine,
  all MeshLambertMaterial.

### Color values summary
- floor: 0x3d4a3a (RGB 61, 74, 58) — dark
- walls: 0x6b6356 (RGB 107, 99, 86) — medium
- ceiling: 0x2a2a2a — very dark
- ambient light: 0xffffff intensity 0.5
- directional: 0xffffff intensity 0.8 at (5,10,5)
- directional fill: 0xccddff intensity 0.3 at (-5,6,-5)

### Diagnostic
- Canvas size is 1265x933 (renderer sized it).
- Reading center pixels with `drawImage(canvas, ...)` + 2D context:
  `centerAvg: [0, 0, 0]` — fully black.
- The user's mouse moves the "rectangles" — so something IS rendering,
  it's just very dark/distorted.
- HUD IS in the DOM (querySelector confirms "1,500 zl" / "Day 1 - Morning"
  + a toast), but the user can't see it. Probably the black scene is
  just covering it visually in their screenshot.

## Questions for the reviewer
1. What is making the rendered scene appear almost-black? The two-pass
   pipeline + ShaderMaterial post quad, or the lighting, or the render
   target color space? List the most likely root causes in order.
2. Does the `floor(color * 32.0) / 32.0` color crush in the fragment
   shader cause black output for low-luminance values? (Yes/no, why.)
3. Should the post quad be replaced with a simpler `renderer.copyTextureToTexture`
   blit, or with three.js's built-in `OutputPass` / `EffectComposer`?
4. Is the render-target color-space handling correct as written?
5. Suggest a minimal change that is most likely to fix the black scene
   (a single change, not a rewrite). Be specific: which file, which
   line, what value to change it to, and WHY it will fix the symptom.

## What to deliver
- A short report (max 400 words) with the 5 numbered answers above.
- Conclude with: "Best single fix:" followed by the exact change.
- If you think the architecture itself is wrong, say so explicitly and
  propose the smallest rewrite that would work.

Do NOT modify any files. Just diagnose.
