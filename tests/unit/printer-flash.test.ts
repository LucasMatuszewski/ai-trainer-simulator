import { describe, expect, it } from "vitest";
import {
  PRINTER_FLASH_SWEEP_COUNT,
  PRINTER_FLASH_SWEEP_INTERVAL_S,
  printerFlashIntensity,
} from "../../src/engine/printer-flash";

describe("printerFlashIntensity", () => {
  it("ramps up and decays during each scanner sweep", () => {
    expect(printerFlashIntensity(0)).toBe(0);
    expect(printerFlashIntensity(0.12)).toBeCloseTo(1);
    expect(printerFlashIntensity(0.3)).toBeGreaterThan(0);
    expect(printerFlashIntensity(0.5)).toBe(0);
  });

  it("returns zero between sweeps and after the copy cycle", () => {
    expect(printerFlashIntensity(PRINTER_FLASH_SWEEP_INTERVAL_S - 0.1)).toBe(0);
    expect(printerFlashIntensity(PRINTER_FLASH_SWEEP_INTERVAL_S)).toBe(0);
    expect(printerFlashIntensity(PRINTER_FLASH_SWEEP_COUNT * PRINTER_FLASH_SWEEP_INTERVAL_S)).toBe(0);
    expect(printerFlashIntensity(-1)).toBe(0);
  });

  it("repeats the same pulse for every configured sweep", () => {
    const sample = printerFlashIntensity(0.2);
    for (let sweep = 1; sweep < PRINTER_FLASH_SWEEP_COUNT; sweep += 1) {
      expect(printerFlashIntensity(sweep * PRINTER_FLASH_SWEEP_INTERVAL_S + 0.2)).toBeCloseTo(sample);
    }
  });
});
