Research brief: three.js vs Babylon.js for a 3D IT trainer simulator game

# Context
Building a 3D retro pixel-art (PS1/N64 era, late 90s look) browser game where the player walks around an office as an IT trainer, has dialogue with NPCs, plays mini-games, and tries not to go bankrupt. The whole game is single-player, runs in the browser, no server.

# Hard requirements
- **Browser-only, no install.** Must run in modern Chrome and Firefox on a mid-range laptop without GPU pain.
- **Pixel-art look.** The user wants "very detailed and cartoon pixelart like retro games from late 90s." Classic technique = render the 3D scene to a small render target (e.g. 320x180 or 640x360) and then upscale to canvas size with nearest-neighbor filtering. WebGL post-processing is fine. Both engines can do this.
- **~10-30 hand-built 3D models per location** (desks, monitors, chairs, vending machines, server racks, whiteboards, NPCs as low-poly blocky characters). Procedural primitives + texture atlas is acceptable; no need to load GLBs for everything.
- **WASD walk, click-to-interact, simple dialogue UI overlay, one mini-game (e.g. debug a script, kill a server).** No need for advanced physics.
- **Future: a second location or two.** Keep scope tight.
- **The user said: "ideally should work in the browser."** Godot and Unity are NOT preferred because they have heavier browser-export paths.

# What I need from you
You have Google access via `search_web` and `read_url`. Do NOT run shell commands. Compare three.js and Babylon.js for this specific use case and answer:

1. **Bundle size and load time** — which is smaller out of the box for a hello-cube? Cite a number.
2. **Low-res render target + nearest-neighbor upscale pattern** — is the pattern well-documented in each engine? Show a code snippet doc URL (Context7 if available) or a known blog post.
3. **Camera/character controller in 5 minutes** — which engine gets you from "hello cube" to "WASD walks around with collision" fastest? For a non-3D-game-programmer.
4. **Pixel-art UI overlay** — both engines should play well with HTML/CSS overlay for dialogue/menus. Any known gotchas?
5. **Maintenance, ecosystem, and "will it still work in 2 years"** — three.js is more mainstream; Babylon is more feature-complete. Which is safer for a hobby project Lucas will iterate on for months?
6. **Verdict** — three.js OR Babylon.js, with 3-4 sentence reasoning specific to THIS game.

Report back as a short markdown document (under 500 words). I will use your verdict to commit to one engine.
