# Deploying Stack Underflow

Written 2026-09-03 for the contest push. **Nothing here has been run** — publishing and DNS are Lucas's calls.

## Why Vercel rather than Cloudflare Pages

Either works; the game is a static Vite build with no backend. Vercel wins on the one axis that matters today: `vercel --prod` from this directory publishes and prints a URL, with no dashboard step and no wrangler config to author under deadline. The apex `devpowers.com` stays on Coolify and is not touched.

Cloudflare becomes the better answer the moment multiplayer lands, because a room code maps exactly onto a Durable Object. That is the 2026-09-06 conversation, not today's.

## First deploy

```
pnpm dlx vercel@latest login
```

```
pnpm dlx vercel@latest --prod
```

Accept the defaults; `vercel.json` already sets the build command, output directory and framework. The second command prints the live URL — that is the one the submission needs.

## Custom domain

Candidates raised: `play.devpowers.com`, `game.devpowers.com`, `under.devpowers.com`. `play.` is the clearest to a judge scanning a list; `under.` is the better joke given the game is called Stack Underflow.

Add the subdomain in the Vercel project, then create the matching record in Cloudflare's `devpowers.com` zone. **Set that record to DNS-only (grey cloud), not proxied** — proxying Vercel through Cloudflare puts two CDNs in series and is a known source of certificate-issuance failures on first setup. The apex record is untouched.

## Verifying the WebMCP integration on the live URL

1. Open the deployed URL in Chrome with `chrome://flags/#enable-webmcp-testing` enabled, or in ChatGPT's browser.
2. The title screen must read **"Agent play ready — 19 WebMCP tools live"**. If it says agent play is unavailable, the browser has no model-context surface — that is the browser, not the deploy.
3. The browser console carries the same result under `[webmcp]`.

If the status line says ready but an agent still sees no tools, the namespace is the thing to check first: the bridge probes `document.modelContext`, then `navigator.modelContext`, then the testing shim, and logs which one answered.

## Not done here

Production DNS is unchanged, the repository is still private, and no deploy has been run.
