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

export function createNpcExchange(deps: NpcExchangeDeps): NpcExchange {
  let current: (NpcExchangeSnapshot & { line: string; reply: string; elapsed: number }) | null = null;

  function cancel(): void {
    if (!current) return;
    current = null;
    deps.stopRobot();
    deps.holdNpc(null);
  }

  return {
    start(npcId, line, reply) {
      if (current) return { ok: false, reason: "An NPC exchange is already active" };
      for (const [name, value] of [["npcId", npcId], ["line", line], ["reply", reply]]) {
        if (typeof value !== "string" || !value.trim() || value.length > 120) {
          return { ok: false, reason: `${name} must be a non-empty string of at most 120 characters` };
        }
      }
      if (!deps.isActive()) return { ok: false, reason: "Robot is not active" };
      if (deps.isHumanBusy()) return { ok: false, reason: "Human is busy" };
      if (!deps.getNpc(npcId)?.visible) return { ok: false, reason: "NPC is not visible" };

      current = { npcId, line, reply, elapsed: 0, status: "walking" };
      deps.holdNpc(npcId);
      const move = deps.moveTo(npcId);
      if (!move.ok) {
        cancel();
        return { ok: false, reason: move.reason || "Robot could not approach NPC" };
      }
      return { ok: true };
    },
    update(dt) {
      if (!current) return;
      const npc = deps.getNpc(current.npcId);
      if (deps.isHumanBusy() || !deps.isActive() || !npc?.visible) {
        cancel();
        return;
      }
      const robot = deps.getRobot();
      const elapsed = Number.isFinite(dt) && dt > 0 ? dt : 0;
      current.elapsed += elapsed;
      if (current.status === "walking") {
        if (current.elapsed >= 25) {
          cancel();
          return;
        }
        if (robot.walking) return;
      }

      const distance = Math.hypot(robot.position.x - npc.position.x, robot.position.z - npc.position.z);
      if (robot.walking || !Number.isFinite(distance) || distance < 0.7 || distance > 3.5) {
        cancel();
        return;
      }
      deps.faceEachOther(current.npcId);
      if (current.status === "walking") {
        current.status = "waiting-reply";
        current.elapsed = 0;
        deps.sayRobot(current.line);
      } else if (current.status === "waiting-reply" && current.elapsed >= 3) {
        current.status = "finishing";
        // A long frame must not erase a freshly emitted reply immediately.
        current.elapsed = 0;
        deps.sayNpc(current.npcId, current.reply);
      } else if (current.status === "finishing" && current.elapsed >= 4) {
        current = null;
        deps.holdNpc(null);
      }
    },
    cancel,
    snapshot: () => current ? { npcId: current.npcId, status: current.status } : null,
  };
}
