/** C-64: one Xerox cycle has four short scanner sweeps. */
export const PRINTER_FLASH_SWEEP_COUNT = 4;
export const PRINTER_FLASH_SWEEP_INTERVAL_S = 1.6;
export const PRINTER_FLASH_RAMP_S = 0.12;
export const PRINTER_FLASH_DECAY_S = 0.32;

/**
 * Pure timing curve for Renata's Xerox scanner bar. Each sweep rises
 * quickly, fades more slowly, and leaves a dark gap before the next pass.
 */
export function printerFlashIntensity(elapsedSeconds: number): number {
  if (!Number.isFinite(elapsedSeconds) || elapsedSeconds < 0) return 0;
  if (elapsedSeconds >= PRINTER_FLASH_SWEEP_COUNT * PRINTER_FLASH_SWEEP_INTERVAL_S) return 0;
  const withinSweep = elapsedSeconds % PRINTER_FLASH_SWEEP_INTERVAL_S;
  if (withinSweep <= PRINTER_FLASH_RAMP_S) return withinSweep / PRINTER_FLASH_RAMP_S;
  const decayElapsed = withinSweep - PRINTER_FLASH_RAMP_S;
  if (decayElapsed >= PRINTER_FLASH_DECAY_S) return 0;
  return 1 - decayElapsed / PRINTER_FLASH_DECAY_S;
}
