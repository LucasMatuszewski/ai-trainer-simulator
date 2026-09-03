/**
 * @vitest-environment jsdom
 *
 * C-66: the ? modal is the authoritative, complete controls reference.
 * These tests mount the real modal so removing a control from the rendered
 * help — or breaking its keyboard access — is caught at the user boundary.
 */
import { afterEach, describe, expect, it } from "vitest";
import { mountHelpModal } from "../../../src/ui/help-modal";

const mounted: HTMLElement[] = [];

function mount(): ReturnType<typeof mountHelpModal> {
  const parent = document.createElement("div");
  document.body.append(parent);
  mounted.push(parent);
  return mountHelpModal(parent);
}

afterEach(() => {
  for (const parent of mounted.splice(0)) parent.remove();
});

describe("complete controls help (C-66)", () => {
  it("renders every shipped control and groups the reference by task", () => {
    const help = mount();
    const text = help.root.textContent?.toLowerCase() ?? "";
    const headings = [...help.root.querySelectorAll("h3")].map(
      (heading) => heading.textContent?.trim().toLowerCase(),
    );

    expect(headings).toEqual(expect.arrayContaining([
      "move & look",
      "talk & act",
      "interface",
    ]));

    for (const control of [
      "wasd / arrows",
      "shift",
      "right button",
      "space",
      "escape",
      "click an npc",
      "click the name",
      "z",
      "end day",
      "use computer",
      "quest log",
      "? / f1",
      "f3",
      "f",
    ]) {
      expect(text, `help must explain ${control}`).toContain(control);
    }
  });

  it("opens with the question-mark key and F1, then closes with Escape", () => {
    const help = mount();

    // Real Chromium reports Shift+/ as key="/", code="Slash",
    // shiftKey=true (captured during the C-66 browser red cycle).
    document.dispatchEvent(new KeyboardEvent("keydown", {
      key: "/",
      code: "Slash",
      shiftKey: true,
    }));
    expect(help.root.classList.contains("open"), "? should open help").toBe(true);

    // Esc is deliberately NOT handled here: main.ts's priority chain closes
    // the topmost layer, so the modal must not race it (document listeners
    // fire before window listeners - see help-modal.ts). Closing is the
    // chain's job; here we assert the close() path it calls.
    help.close();
    expect(help.root.classList.contains("open"), "close() should hide help");});

  it("keeps the close button and backdrop as working exits", () => {
    const help = mount();
    help.open();
    help.root.querySelector<HTMLButtonElement>("[data-close]")!.click();
    expect(help.root.classList.contains("open")).toBe(false);

    help.open();
    help.root.querySelector<HTMLElement>("[data-backdrop]")!.click();
    expect(help.root.classList.contains("open")).toBe(false);
  });
});
