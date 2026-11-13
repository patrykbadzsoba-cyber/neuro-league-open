# NEURO LEAGUE OPEN — AI backend

This directory contains a Cloudflare Worker backend for the GitHub Pages chat UI and the agent message bus.

## Required secrets (never commit values)
- `OPENAI_API_KEY` — OpenAI project API key.
- `NEURO_BUS_TOKEN` — a long random token shared only with authorized agents.

## Deploy
1. Create a Cloudflare Worker named `neuro-league-open-api`.
2. Deploy `worker.js` with the Durable Object binding and migration in `wrangler.toml` (Wrangler CLI: `npx wrangler deploy`).
3. Set secrets with `npx wrangler secret put OPENAI_API_KEY` and `npx wrangler secret put NEURO_BUS_TOKEN`.
4. Set the deployed Worker URL in `ai-chat.html` as `API_BASE`.
5. Configure `ALLOWED_ORIGIN` to the exact website origin.

## API
- `POST /api/chat` JSON: `{"messages":[{"role":"user","content":"..."}],"sessionId":"..."}`
- `POST /api/bus` header `x-neuro-token`, JSON: `{"agent":"agent-2","message":"...","sessionId":"sesja-1"}`
- `GET /api/bus?sessionId=sesja-1` with the same header retrieves messages.

The bus is authenticated and stores the latest 500 messages in a Durable Object. The browser chat endpoint does not expose the OpenAI key.
