type Point = { x: number; z: number };
interface HumanApproachDeps {
  isBusy(): boolean;
  getHuman(): Point | null;
  getRobot(): Point;
  walk(point: Point): Promise<{ arrived: boolean; reason?: string }>;
}

/** Check human priority again after the asynchronous walk, before opening UI. */
export async function approachHumanConversation(deps: HumanApproachDeps): Promise<{ok: boolean; reason?: string}> {
  if (deps.isBusy()) return {ok: false, reason: "Human is busy; wait until their conversation or overlay closes"};
  const human = deps.getHuman();
  if (!human) return {ok: false, reason: "Human is not in the office"};
  const target = {x: human.x, z: human.z};
  const result = await deps.walk(target);
  if (!result.arrived) return {ok: false, reason: result.reason ?? "Could not reach the human"};
  if (deps.isBusy()) return {ok: false, reason: "Human became busy during the approach"};
  const current = deps.getHuman();
  if (!current || Math.hypot(current.x - target.x, current.z - target.z) > 0.75) {
    return {ok: false, reason: "Human moved during the approach; retry from their current position"};
  }
  const robot = deps.getRobot();
  const gap = Math.hypot(robot.x - current.x, robot.z - current.z);
  if (!Number.isFinite(gap) || gap < 2.5 || gap > 3.5) {
    return {ok: false, reason: "Not at conversational distance; retry the approach"};
  }
  return {ok: true};
}
