// @vitest-environment jsdom

/**
 * WS10 (C-77): the positional-audio adapter.
 *
 * The adapter must REUSE the existing SfxBus playback path (one pipeline,
 * no parallel WebAudio graph) by passing the computed positional gain as
 * the per-shot `volume` option of `bus.play`. These tests spy on the bus
 * volume call and check source-position resolution. jsdom environment:
 * this is the browser-facing wiring layer.
 */

import { afterEach, describe, expect, it, vi } from "vitest";
import { computeSoundGain } from "../../../src/audio/positional";
import {
  clearSoundSources,
  registerSoundSource,
} from "../../../src/audio/positional";
import {
  createPositionalSfx,
  type PositionalListenerState,
} from "../../../src/audio/positional-three";
import type { SfxBus } from "../../../src/audio/sfx";

const PHOTOCOPIER_POS = { x: 5.15, z: 16.75 };

function makeListener(overrides: Partial<PositionalListenerState> = {}): PositionalListenerState {
  return {
    // Standing 4 m south of the printer, facing -Z... i.e. AWAY from it.
    getPosition: () => ({ x: 5.15, z: 20.75 }),
    getFacingRad: () => 0,
    getRoom: () => "reception",
    ...overrides,
  };
}

function makeBus() {
  return { play: vi.fn() } as unknown as Pick<SfxBus, "play"> & {
    play: ReturnType<typeof vi.fn>;
  };
}

afterEach(() => {
  clearSoundSources();
});

describe("createPositionalSfx", () => {
  it("applies the computed gain as the bus volume for a registered source", () => {
    registerSoundSource("photocopier", {
      getPos: () => PHOTOCOPIER_POS,
      getRoom: () => "reception",
    });
    const bus = makeBus();
    const positional = createPositionalSfx({ sfx: bus, listener: makeListener() });

    positional.play("sfx_photocopier", "photocopier");

    expect(bus.play).toHaveBeenCalledTimes(1);
    const [id, opts] = bus.play.mock.calls[0] as [string, { volume: number }];
    expect(id).toBe("sfx_photocopier");
    // Listener at z=20.75 facing -Z (yaw 0, forward = -Z), source at
    // z=16.75: the source is BEHIND the listener at 4 m, same room.
    const expected = computeSoundGain({
      listener: { x: 5.15, z: 20.75, facingRad: 0 },
      source: PHOTOCOPIER_POS,
      sameRoom: true,
    });
    expect(expected).toBeLessThan(0.35); // sanity: behind => not full volume
    expect(opts.volume).toBeCloseTo(expected, 5);
  });

  it("falls back to a plain bus play (full volume) for an unregistered source", () => {
    const bus = makeBus();
    const positional = createPositionalSfx({ sfx: bus, listener: makeListener() });

    positional.play("sfx_click");

    expect(bus.play).toHaveBeenCalledWith("sfx_click");
  });

  it("resolves the source position live on every play (moving sources)", () => {
    let x = 0;
    registerSoundSource("robot", { getPos: () => ({ x, z: 0 }), getRoom: () => "main-office" });
    const bus = makeBus();
    const listener = makeListener({
      getPosition: () => ({ x: 0, z: -5 }),
      getFacingRad: () => Math.PI, // facing +Z: the robot at z=0 is dead ahead
      getRoom: () => "main-office", // same room as the robot
    });
    const positional = createPositionalSfx({ sfx: bus, listener });
    const nearExpected = computeSoundGain({
      listener: { x: 0, z: -5, facingRad: Math.PI },
      source: { x: 0, z: 0 },
      sameRoom: true,
    });

    positional.play("sfx_photocopier", "robot");
    const nearVolume = (bus.play.mock.calls[0] as [string, { volume: number }])[1].volume;
    expect(nearVolume).toBeCloseTo(nearExpected, 5);

    x = 30; // robot walks far away
    positional.play("sfx_photocopier", "robot");
    const farVolume = (bus.play.mock.calls[1] as [string, { volume: number }])[1].volume;
    expect(farVolume).toBeLessThan(nearVolume);
    expect(farVolume).toBeLessThan(0.3); // background again
  });

  it("crosses rooms through the source's room getter", () => {
    registerSoundSource("photocopier", {
      getPos: () => PHOTOCOPIER_POS,
      getRoom: () => "reception",
    });
    const bus = makeBus();
    // Listener moved to the kitchen: same coords, different room.
    const positional = createPositionalSfx({
      sfx: bus,
      listener: makeListener({ getRoom: () => "kitchen" }),
    });

    positional.play("sfx_photocopier", "photocopier");

    const opts = (bus.play.mock.calls[0] as [string, { volume: number }])[1];
    const sameRoomGain = computeSoundGain({
      listener: { x: 5.15, z: 20.75, facingRad: 0 },
      source: PHOTOCOPIER_POS,
      sameRoom: true,
    });
    expect(opts.volume).toBeCloseTo(sameRoomGain * 0.25, 5);
  });

  it("propagates a custom base and exposes gainFor for tests/debug", () => {
    registerSoundSource("photocopier", {
      getPos: () => PHOTOCOPIER_POS,
      getRoom: () => "reception",
    });
    const listener = makeListener({ getFacingRad: () => Math.PI }); // facing the printer
    const positional = createPositionalSfx({ sfx: makeBus(), listener, base: 0.5 });

    const g = positional.gainFor("photocopier");
    expect(g).not.toBeNull();
    expect(g).toBeCloseTo(
      computeSoundGain({
        listener: { x: 5.15, z: 20.75, facingRad: Math.PI },
        source: PHOTOCOPIER_POS,
        sameRoom: true,
        base: 0.5,
      }),
      5,
    );
    expect(positional.gainFor("nonexistent")).toBeNull();
  });

  it("never passes a volume outside [0, 1] to the bus", () => {
    registerSoundSource("photocopier", { getPos: () => PHOTOCOPIER_POS });
    const bus = makeBus();
    const positional = createPositionalSfx({
      sfx: bus,
      listener: makeListener(),
      base: 42,
    });

    positional.play("sfx_photocopier", "photocopier");

    const opts = (bus.play.mock.calls[0] as [string, { volume: number }])[1];
    expect(opts.volume).toBe(1);
  });
});
