# NPC exchange implementation handoff

Implemented only `src/webmcp/npc-exchange.ts` and `tests/unit/npc-exchange.test.ts`, plus this requested report. No commits or pushes. Existing concurrent work was preserved.

## Public API

```ts
/** Tick-driven fictional robot/NPC co-authorship; no game-resource effects. */
export type NpcExchangeResult = { ok: true } | { ok: false; reason: string };

export interface NpcExchangeSnapshot {
  npcId: string;
  status: "walking" | "waiting-reply" | "finishing";
}

export interface NpcExchangeDeps {
  isHumanBusy(): boolean;
  /** Whether the robot is joined and active. */
  isActive(): boolean;
  getNpc(id: string): { position: { x: number; z: number }; visible: boolean } | null;
  getRobot(): { position: { x: number; z: number }; walking: boolean };
  moveTo(id: string): { ok: boolean; reason?: string };
  stopRobot(): void;
  holdNpc(id: string | null): void;
  faceEachOther(id: string): void;
  sayRobot(line: string): void;
  sayNpc(id: string, line: string): void;
}

export interface NpcExchange {
  start(npcId: string, line: string, reply: string): NpcExchangeResult;
  /** Elapsed seconds; no timers or wall-clock catch-up. */
  update(dt: number): void;
  cancel(): void;
  snapshot(): NpcExchangeSnapshot | null;
}

export function createNpcExchange(deps: NpcExchangeDeps): NpcExchange;
```

## Wiring and behavior

- `isActive` means robot joined/active. `stopRobot` is REQUIRED; wire it to cancel robot movement. `holdNpc(null)` releases the held NPC.
- Call `update(dt)` each frame with elapsed **seconds**. No timers, async work, providers, resource effects, human dialogue or camera changes.
- Start validates nonblank strings, rejects more than 120 UTF-16 code units (including npcId), preserves accepted text exactly, checks visibility/joined/human-busy/overlap, holds NPC before movement, and releases/stops on a failed move. A movement error reason is preserved; a missing reason gets a fallback.
- Status sequence: `walking` -> `waiting-reply` -> `finishing` -> null. Snapshot is detached from internal state. Failed starts return `{ok:false, reason}`; update-time cancellations return the snapshot to null.
- Approach timeout is 25 accumulated seconds. Arrival requires stopped robot and inclusive 0.7–3.5m XZ distance. Every arrived update faces the pair; any later separation or resumed movement cancels before a reply can fire.
- Robot speaks once upon arrival. NPC replies after 3 seconds. Release follows after another 4 seconds. Transition ticks reset elapsed time so a long frame cannot skip a fresh line's display duration.
- Human busy, inactive robot, missing/hidden NPC, explicit cancel, timeout or invalid conversational distance stop movement and release the hold. Repeated cancel is safe; no late lines. Nonfinite/negative dt cannot advance timers.
- Dependencies are synchronous effects and expected not to throw. Integration/rendering remains with the parent task.

## Verification

- RED: initial scaffold ran 30 tests with 23 behavior failures.
- GREEN: `pnpm test tests/unit/npc-exchange.test.ts` — 30 passed.
- `pnpm typecheck` — passed.
- Five deliberate mutations were each caught: distance guard, missing NPC reply, missing hold, missing release, and oversized-text validation. Original implementation restored in `finally`; focused suite rerun — 30 passed.
- No browser/server changes or visual-phase completion claimed; this is the isolated coordinator handoff.
