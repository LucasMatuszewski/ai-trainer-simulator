Research task: WebMCP (Web Model Context Protocol) browser API, as of September 2026.

Answer these precisely, with source URLs, and write the answer to .agent-briefs/webmcp-spec-research-OUT.md:

1. The exact JavaScript API a web page uses to expose tools to a WebMCP-capable browser agent.
   Is it `navigator.modelContext.registerTool(...)`, `navigator.modelContext.provideContext({tools:[...]})`,
   an `addEventListener` model, or something else? Give a COMPLETE, COPY-PASTEABLE minimal working example
   of a page registering one tool with a JSON-schema input and returning a result.
2. The exact shape of a tool definition: name, description, inputSchema (JSON Schema? Zod?), and the
   return value shape (content array? plain object?).
3. Feature detection and polyfill: what do pages do when the browser has no WebMCP support? Is there an
   official polyfill package on npm (name + version)? Does the ChatGPT browser / Chrome Canary need a flag?
4. The official spec/explainer repo URL and the current status (W3C? WICG? draft?).
5. The OpenAI WebMCP Challenge (https://openai.com/pl-PL/webmcp-challenge/ and https://webmcp.devpost.com/):
   submission deadline (exact date+time+timezone), judging criteria and their weights, required
   deliverables (video? public URL? repo? written description?), and any rules about what must be
   demonstrated. Quote the criteria verbatim.

Be precise. If you cannot verify something, say "UNVERIFIED" rather than guessing. Do not write code into the repo.
