You are a delegate. The orchestrator owns tracking, process and commits: do not load the `agents-workflow-sacs`, `beads` or `cli-agent-delegation` skills, do not run `bd`, do not commit or push. Everything you need is in this brief. Write your result to `.agent-briefs/ws10-result.md`.

# Task: WS10 — Positional audio system + photocopier fix (Lucas: "strange and way too loud")

Branch `feat/jev-npc-decision-steering`. Read first: `docs/CHANGELOG.md` **C-77** (the scope), `src/audio/` (manifest, sfx bus, how sounds play today), the photocopier call sites (`grep -rn "sfx_photocopier\|photocopier" src/`), `src/engine/agent-companion.ts` (COMPANION_PERSONAL_RADIUS pattern for constants), and `src/engine/npc-controller.ts` ONLY to see how the copier is triggered (Renata's copy run) — do not modify that file (submit patches if needed).

## The problem

The photocopier sound plays at a fixed global volume: blaring when the player is far away or in another room. Lucas wants a **sound system**: louder when the source is closer and in front of the listener, quiet in a separate room, background-level overall.

## Build

1. **`src/audio/positional.ts`** (new, PURE core + a thin three.js adapter):
   - `computeSoundGain({ listener: {x, z, facingRad}, source: {x, z}, sameRoom: boolean, base = 0.35 }) => number` in [0, 1]:
     - distance attenuation: gain falls with distance (e.g. 1.0 at ≤3 m → ~0.25 at 15 m → min 0.05 beyond), tuned so the copier is BACKGROUND everywhere except near it,
     - same-room factor: same room ⇒ ×1.0, different room ⇒ ×0.25 (the walls muffle it),
     - facing factor: source in the listener's front hemisphere ⇒ ×1.0, side ⇒ ×0.8, behind ⇒ ×0.6 (subtle, not disorienting),
     - document the exact formulas in code; they must be unit-testable with no three.js import.
   - `sameRoomFor(listenerRoom, sourceRoom)` — room resolution comes from the caller (the engine knows WORLD_ROOMS); keep this module geometry-only.
2. **`src/audio/positional-three.ts`** (new, thin adapter): a registered positional source — holds the three.js AudioListener + the gain node/volume application to the existing sfx playback path (read how `src/audio/sfx.ts` plays; REUSE it — apply the computed gain, do not build a parallel audio pipeline). Register/update per frame or on play.
3. **Photocopier integration (patch or new glue module):** the copier sound must resolve its SOURCE position (the printer object's world position — obtainable via the existing scene; submit exact patches if the call site lacks access) and apply `computeSoundGain` each time it plays (Renata's copy run re-triggers every 60-120 s). The player listener position + facing come from the existing controls/camera (patches if needed).
4. **Design for more sources:** a tiny registry `registerSoundSource(id, getPos)` so future sources (coffee machine, robots) plug in — but ONLY the photocopier is wired in this task.
5. **Tests (TDD red→green; mutation-check):**
   - `tests/unit/audio/positional.test.ts`: distance curve monotonic decreasing; same-room vs cross-room factor; front/side/behind factors; gain clamped to [0,1]; a "background everywhere" assertion (gain < 0.3 beyond 10 m even same-room); pure formulas — no three.js.
   - jsdom test for the adapter: gain applied to the existing bus (spy on the bus volume call), source position resolution.

## Constraints

- Allowed files: `src/audio/positional.ts` (new), `src/audio/positional-three.ts` (new), `src/audio/sfx.ts` (only if volume application needs a setter — keep minimal), plus the new test files. Any other file (npc-controller call site, main.ts listener wiring) = proposed patches in the report, NOT applied.
- The copier must still PLAY for Renata's errand (behavior preserved, volume corrected). No new audio assets.
- `pnpm typecheck` + `pnpm test` green. Do not bump `src/version.ts`.

## Definition of done

Report at `.agent-briefs/ws10-result.md`: changed files, the exact gain formulas, red→green evidence, vitest summary, proposed patches for the call-site/listener wiring, deviations.
