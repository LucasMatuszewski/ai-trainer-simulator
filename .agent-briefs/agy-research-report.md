# 3D Engine Research: Three.js vs Babylon.js

### 1. Bundle Size & Load Time
* **Three.js**: **~160–200 KB** (minified + gzipped) for a hello-cube setup.
* **Babylon.js**: **~1.0–1.5 MB** (minified + gzipped) full bundle; **~500–700 KB** when tree-shaken with `@babylonjs/core`.
* **Advantage**: **Three.js** is ~3–4× lighter on initial download.

---

### 2. Low-Res Render Target + Nearest-Neighbor Upscale Pattern
Both engines easily achieve the retro late-90s / PS1 look:
* **Three.js**: Render to a `THREE.WebGLRenderTarget(w, h, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter })` displayed on a full-screen quad, or use the built-in [`RenderPixelatedPass`](https://threejs.org/examples/#webgl_postprocessing_pixel).
* **Babylon.js**: Set `engine.setHardwareScalingLevel(scale)` combined with CSS `canvas { image-rendering: pixelated; }`, or apply a pixelation shader with `BABYLON.PostProcess` ([Babylon.js Render Scale Docs](https://doc.babylonjs.com/features/featuresDeepDive/scene/renderScale)).
* **Advantage**: **Tie** (Both well-documented and simple to configure).

---

### 3. Camera / Character Controller in 5 Minutes
* **Three.js**: No built-in collision or character physics. Requires manually writing WASD keyboard event loops, gravity, and raycast/AABB collision math, or importing third-party physics libraries (e.g., `cannon-es` or `rapier3d`).
* **Babylon.js**: `UniversalCamera` provides first-person WASD navigation, mouse look, gravity, and ellipsoid mesh collisions natively in ~6 lines (`camera.checkCollisions = true; scene.collisionsEnabled = true;`).
* **Advantage**: **Babylon.js** is far faster and easier for a non-3D-game programmer.

---

### 4. Pixel-Art HTML/CSS UI Overlay
Both engines support standard absolute-positioned HTML/CSS overlays (`position: absolute; inset: 0;`).
* **Gotchas to watch**:
  * **Pointer Events**: Set root UI overlay to `pointer-events: none;` and interactive dialogue boxes/buttons to `pointer-events: auto;` so 3D scene clicks work uninterrupted.
  * **Keyboard Focus**: Modal dialogues and mini-games must isolate keyboard events so typing does not trigger WASD walk movements.
  * **Scaling Consistency**: Rendering UI in DOM keeps retro pixel fonts crisp at native resolution rather than blurring inside the downscaled 3D canvas.

---

### 5. Maintenance & Ecosystem ("2 Years Out")
* **Three.js**: Enormous ecosystem, but frequent monthly release changes (`r150` $\rightarrow$ `r160`) and reliance on fragmented third-party addons (controls, physics, loaders) increase bit-rot risk over long iteration cycles.
* **Babylon.js**: Microsoft-backed with strict backward-compatibility guarantees. A single integrated engine (collisions, audio, animations, inspector) means zero third-party glue code to break.
* **Advantage**: **Babylon.js** for stable, multi-month hobby development.

---

### 6. Verdict
For this specific game (office exploration, NPC interaction, light mini-games, retro look), **Babylon.js** is the superior choice. Even though Three.js has a smaller bundle size, Babylon.js provides out-of-the-box WASD walking, gravity, and solid-wall collision detection without needing external physics libraries. Its integrated tooling and backward-compatibility guarantee allow you to focus on gameplay and aesthetics rather than engine plumbing.

**VERDICT: Babylon.js**
