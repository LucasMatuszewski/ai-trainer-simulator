import { describe, it, expect, vi } from "vitest";
import { approachHumanConversation } from "../../src/webmcp/companion-conversation";

function setup() {
  const state = { busy: false, human: {x: 0, z: 0}, robot: {x: 3, z: 0} };
  const deps = { isBusy: () => state.busy, getHuman: () => state.human, getRobot: () => state.robot, walk: vi.fn(async () => ({arrived: true})) };
  return {state, deps};
}
describe("robot conversation approach", () => {
  it("does not approach while any human overlay is busy", async () => {
    const {state,deps}=setup();state.busy=true;
    expect((await approachHumanConversation(deps)).ok).toBe(false);
    expect(deps.walk).not.toHaveBeenCalled();
  });
  it("does not open dialogue if the human becomes busy during the walk", async () => {
    const {state,deps}=setup();deps.walk.mockImplementation(async()=>{state.busy=true;return {arrived:true};});
    expect((await approachHumanConversation(deps)).ok).toBe(false);
  });
  it("does not greet the human at their old position", async () => {
    const {state,deps}=setup();deps.walk.mockImplementation(async()=>{state.human={x:8,z:0};return {arrived:true};});
    expect((await approachHumanConversation(deps)).ok).toBe(false);
  });
  it("only accepts arrival at conversational distance", async () => {
    const {state,deps}=setup();state.robot={x:0.2,z:0};
    expect((await approachHumanConversation(deps)).ok).toBe(false);
  });
  it("preserves a failed walk and accepts a valid arrival", async () => {
    const {deps}=setup();deps.walk.mockResolvedValueOnce({arrived:false});
    expect((await approachHumanConversation(deps)).ok).toBe(false);
    expect(await approachHumanConversation(deps)).toEqual({ok:true});
  });
});
