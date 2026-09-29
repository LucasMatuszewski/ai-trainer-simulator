import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  // WS9a: the long scenario drives (robot parking, lunch-rush encounters)
  // depend on in-game randomness (kitchen rolls, walk completion timing).
  // One retry keeps the suite honest without hiding game bugs: a failure
  // that reproduces on retry still fails the run.
  retries: 1,
  timeout: 240_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  // One browser at a time. Two parallel headless instances software-render
  // WebGL (SwiftShader) at full frame rate each, which saturates the CPU/iGPU
  // (the laptop overheats during suites) and causes "GPU stall due to
  // ReadPixels" hangs in page.screenshot -> spurious timeouts in otherwise
  // green specs. See docs/PERFORMANCE.md and Beads sacs-m2b9.
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    trace: "off",
    screenshot: "off",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
