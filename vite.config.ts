import { defineConfig, type Plugin } from "vite";
import { fileURLToPath, URL } from "node:url";

/**
 * WS1 dev-only proxy middleware (ADR-0009 §3.2, §6): forwards the
 * decisions request to OpenRouter with the SERVER-side key, so local
 * development never needs a browser-held key. Production uses the
 * deployed proxy (VITE_JEV_PROXY_URL); this middleware keeps the same
 * request/response shape on localhost.
 *
 * Hardening (review M13): model pinned server-side, 1 MB body cap,
 * origin-agnostic on localhost by design, key never echoed in errors.
 */
function jevDevProxy(): Plugin {
  const apiKey = process.env.OPENROUTER_API_KEY;
  return {
    name: "jev-dev-proxy",
    configureServer(server) {
      if (!apiKey) {
        server.config.logger.warn(
          "[jev-dev-proxy] OPENROUTER_API_KEY not set — /api/jev will return 503.",
        );
      }
      server.middlewares.use("/api/jev", (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "POST only" }));
          return;
        }
        if (!apiKey) {
          res.statusCode = 503;
          res.end(JSON.stringify({ error: "proxy not configured" }));
          return;
        }
        let body = "";
        let aborted = false;
        req.on("data", (chunk: Buffer) => {
          body += chunk;
          if (body.length > 1_000_000) {
            aborted = true;
            res.statusCode = 413;
            res.end(JSON.stringify({ error: "payload too large" }));
            req.destroy();
          }
        });
        req.on("end", () => {
          if (aborted) return;
          // Model is pinned server-side; a client-supplied model is ignored.
          let parsed: Record<string, unknown> = {};
          try {
            parsed = JSON.parse(body) as Record<string, unknown>;
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "invalid JSON" }));
            return;
          }
          const forward = JSON.stringify({ ...parsed, model: "typesafe/jev-1.13" });
          fetch("https://openrouter.ai/api/alpha/decisions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: forward,
          })
            .then(async (up) => {
              res.statusCode = up.status;
              res.setHeader("Content-Type", "application/json");
              res.end(await up.text());
            })
            .catch(() => {
              res.statusCode = 502;
              res.end(JSON.stringify({ error: "upstream unavailable" }));
            });
        });
      });
    },
  };
}

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
  plugins: [jevDevProxy()],
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
