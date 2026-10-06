/**
 * Positional audio adapter (WS10, C-77) — thin glue between the pure
 * gain math in `./positional` and the EXISTING SfxBus playback path.
 *
 * Deliberately NOT a parallel audio pipeline: `SfxBus.play` already
 * accepts a per-shot `volume` option (it multiplies it into its own
 * per-shot GainNode), so applying position = passing the computed gain
 * as that option. No THREE.AudioListener / PannerNode graph is built;
 * the game's one WebAudio graph (AudioManager) stays the only one.
 *
 * The listener state (player position, yaw, room) is injected by the
 * caller — main.ts backs it with `controls.getPlayerPosition()` /
 * `controls.getYaw()` and `roomAt()` from engine/chatter.ts.
 */

import {
  computeSoundGain,
  getSoundSource,
  sameRoomFor,
  type Vec2,
} from "./positional";
import type { SfxBus } from "./sfx";

export interface PositionalListenerState {
  /** Current listener (player) world position. */
  getPosition: () => Vec2;
  /** Current yaw in radians; 0 faces -Z (controls.ts convention). */
  getFacingRad: () => number;
  /** Room id the listener is in (caller resolves geometry), or null. */
  getRoom: () => string | null;
}

export interface PositionalSfxOptions {
  /** The existing sfx bus — reused, not replaced. */
  sfx: Pick<SfxBus, "play">;
  listener: PositionalListenerState;
  /** Overall loudness of registered sources. Default 0.35. */
  base?: number;
}

export interface PositionalSfx {
  /**
   * Play `sfxId` positioned at registry source `sourceId`. When the two
   * ids are the same, `play(id)` suffices. Unregistered sources fall
   * back to a plain full-volume bus play (behavior preserved).
   */
  play(sfxId: string, sourceId?: string): void;
  /** Current positional gain for a source, or null if unregistered. */
  gainFor(sourceId: string): number | null;
}

export function createPositionalSfx(options: PositionalSfxOptions): PositionalSfx {
  const { sfx, listener, base } = options;

  const gainFor = (sourceId: string): number | null => {
    const source = getSoundSource(sourceId);
    if (!source) return null;
    const pos = source.getPos();
    const lp = listener.getPosition();
    return computeSoundGain({
      listener: { x: lp.x, z: lp.z, facingRad: listener.getFacingRad() },
      source: { x: pos.x, z: pos.z },
      sameRoom: sameRoomFor(listener.getRoom(), source.getRoom?.() ?? null),
      ...(base === undefined ? {} : { base }),
    });
  };

  return {
    play(sfxId: string, sourceId: string = sfxId): void {
      const gain = gainFor(sourceId);
      if (gain === null) {
        // Not a registered positional source: play exactly as before.
        sfx.play(sfxId);
        return;
      }
      sfx.play(sfxId, { volume: gain });
    },
    gainFor,
  };
}
