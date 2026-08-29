import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  resolve: {
    // TypeScript build artefacts have historically been emitted beside the
    // source files. Prefer the source extension so an ignored, stale .js file
    // can never shadow the current .ts implementation in Vite or Vitest.
    extensions: [".mjs", ".mts", ".ts", ".jsx", ".tsx", ".js", ".json"],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
  },
  build: {
    target: "es2022",
    sourcemap: true,
  },
  test: {
    // Pure-logic tests use Node by default. Browser-event suites opt into
    // jsdom per file with the @vitest-environment directive.
    include: ["tests/unit/**/*.test.ts"],
    environment: "node",
  },
});
