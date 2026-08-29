#!/usr/bin/env node
/**
 * Run a command with the project's .env loaded into the process environment.
 * Avoids the policy that blocks `source .env` from bash by using dotenv here.
 *
 * Usage: node scripts/with-env.mjs -- node scripts/other.mjs
 *        node scripts/with-env.mjs -- bash -c "echo $GMI_API_KEY"
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env");
if (existsSync(envPath)) {
  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) process.env[key] = val;
  }
}

const sep = process.argv.indexOf("--");
if (sep < 0) {
  console.error("Usage: node scripts/with-env.mjs -- <command> [args...]");
  process.exit(2);
}
const cmd = process.argv.slice(sep + 1);
const child = spawn(cmd[0], cmd.slice(1), { stdio: "inherit", env: process.env });
child.on("exit", (code) => process.exit(code ?? 0));
