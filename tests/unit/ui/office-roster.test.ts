/**
 * @vitest-environment jsdom
 *
 * Closure verdict High 2: the roster's computer button is rendered with
 * the contract flag baked into the mount-time HTML. setComputerUnlocked
 * must flip it mid-session (Bartek's contract dialogue) without a full
 * roster remount.
 */
import { afterEach, describe, expect, it } from "vitest";
import { mountOfficeRoster } from "../../../src/ui/office-roster";
import { NPCS } from "../../../src/content/npcs";

const mounted: HTMLElement[] = [];

function mount(hasContract: boolean) {
  const parent = document.createElement("div");
  document.body.append(parent);
  mounted.push(parent);
  return mountOfficeRoster(parent, NPCS, () => {}, () => {}, () => {}, hasContract);
}

afterEach(() => {
  for (const parent of mounted.splice(0)) parent.remove();
});

describe("roster computer unlock (closure High 2)", () => {
  it("starts disabled without a contract and unlocks mid-session", () => {
    const roster = mount(false);
    const btn = () =>
      roster.root.querySelector<HTMLButtonElement>("button[data-action='computer']")!;
    expect(btn().disabled).toBe(true);
    expect(btn().title).toContain("contract");

    roster.setComputerUnlocked(true);
    expect(btn().disabled).toBe(false);
    expect(btn().title).toContain("Debug a client script");

    // And it re-locks if the flag ever says so (defensive symmetry).
    roster.setComputerUnlocked(false);
    expect(btn().disabled).toBe(true);
  });

  it("starts enabled when mounted with the contract already earned", () => {
    const roster = mount(true);
    const btn = roster.root.querySelector<HTMLButtonElement>("button[data-action='computer']")!;
    expect(btn.disabled).toBe(false);
  });
});
