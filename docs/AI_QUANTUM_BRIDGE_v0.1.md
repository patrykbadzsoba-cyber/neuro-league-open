# NEURO LEAGUE OPEN — AI + Quantum Bridge v0.1
Status: ARCHITECTURE DRAFT — implementation not yet connected
Date: 2026-11-13

## Mission
Build an open, auditable workspace where a human participant coordinates independent AI agents and reproducible quantum-computing experiments. The Portal is a neutral coordination layer, not the owner of the work and not an unrestricted controller.

Core rule: Human First; AI as Guest. The human decides what is submitted, which providers are used, and whether a hardware job is launched.

## What “Meta in the room” means
There are two distinct integration paths and they must not be confused:

1. **Meta Model API (direct model integration):** a server-side adapter can call Meta-hosted models through Meta's documented API. This gives NEURO a genuine independent Meta model participant. It is not the same thing as taking over a user's Meta AI app session or claiming that the consumer Meta AI chat is connected.
2. **Meta AI Connector:** NEURO can expose its own API/MCP tools to Meta AI through Meta's connector programme, subject to developer-preview/early-access approval. This is the path for Meta AI to call Portal tools from within Meta AI.

No browser scraping, session-cookie reuse, impersonation, or sharing provider API keys between participants.

## Multi-agent room
The existing `hub.html` is a two-agent ChatGPT/Gemini frontend and expects a backend:
- `GET /health`
- `POST /api/duo` with `{ messages }`
- response fields `chatgpt`, `gemini`, optional `errors`

Do not silently label this as live: the repository's current frontend requires a deployed backend and provider secrets. The Commons composer on the landing page is local-browser-only and is not a shared public discussion service.

### Target message envelope
```json
{
  "id": "uuid",
  "room_id": "string",
  "created_at": "ISO-8601",
  "speaker": { "type": "human|agent", "id": "human|chatgpt|meta|gemini" },
  "kind": "message|proposal|critique|experiment_request|experiment_result",
  "content": "string",
  "in_reply_to": "uuid|null",
  "provenance": { "provider": "string", "model": "string", "run_id": "string|null" }
}
```

### Target API surface
- `GET /health` — provider readiness only; never expose secrets.
- `GET /api/agents` — configured agent IDs and capabilities.
- `POST /api/rooms/:roomId/messages` — append a human message and return independently attributed agent responses.
- `GET /api/rooms/:roomId/events` — event stream (SSE or WebSocket) for live updates.
- `GET /api/rooms/:roomId/export` — export the full room history as JSON.

Each provider is an adapter with the same internal contract: `respond(messages, policy, abortSignal) -> { text, provider, model, usage }`. One provider failure must not erase other agents' responses. Preserve each agent's independent identity and do not force consensus.

## Quantum experiment workbench
Use a provider adapter so experiments are portable:
- `GET /api/quantum/backends` — available hardware and simulator backends, with provider and cost class.
- `POST /api/experiments` — save a proposed experiment and its hypothesis, circuit/source, parameters, shots, expected result, and approval state.
- `POST /api/experiments/:id/validate` — validate circuit and resource bounds without submitting a hardware job.
- `POST /api/experiments/:id/run` — submit only after explicit human approval; return provider job ID and status.
- `GET /api/experiments/:id/results` — retrieve counts, metadata, timestamps, backend identity, and reproducibility data.

Every run records: experiment ID, source/circuit hash, provider, backend, simulator-vs-hardware flag, shots, parameters, submission time, provider job ID, result, and errors. Never describe simulator output as a physical quantum-hardware result.

### First provider target: IBM Quantum
Target IBM Quantum Open Plan as the first real-hardware adapter. IBM currently advertises up to 10 minutes of quantum runtime per 28-day period on its free Open Plan. This is a limited quota, not unlimited compute. Keep simulator runs as the default for development and use hardware only after a human confirms the specific job and available quota.

### Cost and safety gate
- Default mode: local validation / simulator; no paid jobs.
- Hardware execution requires a visible confirmation naming provider, backend, shots, estimated or applicable cost/quota, and experiment.
- Enforce server-side timeouts, shot limits, request limits, and provider allowlists.
- Provider credentials belong only in server-side secret storage. Never put API keys in HTML, JavaScript bundles, localStorage, exported logs, or public Git history.
- AI agents may propose and critique experiments. They cannot approve their own hardware execution or change billing limits.
- No private financing is assumed. The system must work in a no-cost mode; any provider quota or sponsorship is explicitly disclosed.

## Open network / free connectivity
The Portal's application hosting and the user's internet connection are separate things. A public website cannot make the phone's mobile data free. A complementary civic-network track should investigate community mesh infrastructure (for example, Freifunk Hamburg), public access points, donated connectivity, and offline-first Portal functions.
- Freifunk is a community-operated mesh network; local nodes share access voluntarily. It is not a guarantee of universal internet coverage or free mobile data everywhere.
- Make Portal pages lightweight, cacheable, exportable, and usable for drafting offline; sync when a connection is available.
- Do not promise a free city-wide network until nodes, backhaul, governance, maintenance, and coverage are actually in place.

## Implementation sequence
1. Preserve the current live static site and current two-agent hub.
2. Add this architecture record and publish an honest status page.
3. Locate or create the backend deployment source; implement provider health checks and a Meta Model API adapter.
4. Add an independent Meta participant to the room, with explicit provider/model provenance.
5. Add the experiment registry, simulator validation, and approval gate.
6. Implement IBM Quantum Open Plan hardware adapter and run a tiny, human-approved calibration experiment.
7. Add SSE/WebSocket event delivery for genuinely live room updates.
8. Develop the Freifunk/offline-first connectivity track separately from AI and quantum execution.

## Definition of done
- Three independent agent identities can exchange messages through one shared room, with real provider calls and per-message provenance.
- The Portal displays connection state and errors honestly.
- A human can propose, inspect, approve, run, and reproduce an experiment.
- The result clearly states whether it came from a simulator or physical QPU.
- No paid hardware job can start without explicit human approval.
- No claim of live Meta, quantum, or shared public messaging is made before an end-to-end test passes.

## References checked on 2026-11-13
- Meta Model API quickstart: https://dev.meta.ai/docs/quickstart
- Meta AI Connectors: https://dev.meta.ai/products/connectors
- Meta AI Connector early access information: https://developers.meta.com/wearables/faq/
- IBM Quantum products / Open Plan: https://www.ibm.com/quantum/products
- Freifunk Hamburg FAQ: https://hamburg.freifunk.net/haufige-fragen
