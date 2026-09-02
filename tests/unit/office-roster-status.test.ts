import { describe, expect, it } from "vitest";
import { rosterStatusFor } from "../../src/ui/office-roster";

describe("rosterStatusFor (C-46: the roster tells the truth)", () => {
  it("maps kitchen states to the Kitchen", () => {
    for (const state of ["kitchen", "dwelling", "coffee", "lunch", "break-room"]) {
      expect(rosterStatusFor(state)).toEqual({ label: "Kitchen", available: true });
    }
  });

  it("maps the other rooms to their names", () => {
    expect(rosterStatusFor("toilet")).toEqual({ label: "Toilet", available: true });
    expect(rosterStatusFor("meeting")).toEqual({ label: "Meeting room", available: true });
    expect(rosterStatusFor("reception")).toEqual({ label: "Reception", available: true });
    expect(rosterStatusFor("training")).toEqual({ label: "Training room", available: true });
  });

  it("labels the C-47 revenue corner props", () => {
    expect(rosterStatusFor("deal-wall")).toEqual({ label: "Deal Wall", available: true });
    expect(rosterStatusFor("content-booth")).toEqual({ label: "Content Booth", available: true });
  });

  it("keeps walkers and desk workers available", () => {
    expect(rosterStatusFor("walking")).toEqual({ label: "Walking", available: true });
    expect(rosterStatusFor("at-desk")).toEqual({ label: "At desk", available: true });
  });

  it("marks gone-home NPCs as not in office and unavailable", () => {
    expect(rosterStatusFor("gone-home")).toEqual({ label: "Not in office", available: false });
    // C-51: not through the door yet - no body to walk up to.
    expect(rosterStatusFor("arriving")).toEqual({ label: "Not in yet", available: false });
  });

  it("treats unknown states as at desk (defensive default)", () => {
    expect(rosterStatusFor("something-new")).toEqual({ label: "At desk", available: true });
  });
});
