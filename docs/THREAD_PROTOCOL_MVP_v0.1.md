# NEURO LEAGUE OPEN — Thread Protocol MVP v0.1

Status: IMPLEMENTATION SPECIFICATION — not yet deployed or end-to-end verified
Date: 2026-11-13

## 1. Purpose

Build the smallest reproducible collaboration loop between one human moderator and two independent model providers: OpenAI (GPT) and Meta (Meta-hosted model API). Gemini and additional agents can be added later through the same adapter contract.

The Portal coordinates models through a backend broker. It does not connect consumer chat applications directly and does not imply that the Meta AI app is being controlled. A real Meta participant means a server-side call to a Meta model API with its own provider/model provenance.

Principles: Human First; AI as Guest; independent positions; no forced consensus; privacy by design; explicit human approval for external execution.

## 2. MVP scope

Included: one room/thread; one human moderator; two independent model adapters (OpenAI and Meta); shared ordered event history; one debate cycle (proposal → critique → revision); simulator-only quantum experiment validation; JSON export; per-provider error reporting and provenance.

Not included: direct control of consumer Meta AI or ChatGPT apps; public multi-user accounts or private messaging; autonomous loops without a turn limit; physical quantum hardware submissions; paid provider usage without explicit budget and approval.

## 3. Canonical event format

Each event is append-only and has a stable ID. The backend assigns created_at, id, and sequence; clients must not invent authoritative values.

Example human event:

    {
      "id": "evt_example_1",
      "thread_id": "thread_tar001_lab_01",
      "sequence": 1,
      "created_at": "2026-11-13T22:00:00Z",
      "author": { "type": "human", "id": "moderator" },
      "kind": "message",
      "phase": "proposal",
      "content": "Zaprojektujmy minimalny eksperyment porównujący rozkład wyników prostego obwodu.",
      "in_reply_to": null,
      "provenance": null,
      "metadata": {}
    }

Example model event:

    {
      "id": "evt_example_2",
      "thread_id": "thread_tar001_lab_01",
      "sequence": 2,
      "created_at": "2026-11-13T22:00:04Z",
      "author": { "type": "agent", "id": "openai" },
      "kind": "agent_response",
      "phase": "proposal",
      "content": "Proponuję obwód ...",
      "in_reply_to": "evt_example_1",
      "provenance": { "provider": "openai", "model": "configured-model-id", "request_id": "provider-request-id" },
      "metadata": { "prompt_template_version": "nlo-debate-v0.1" }
    }

Required invariants:
- A thread's sequence is strictly increasing and assigned by the server.
- Events are never silently overwritten. Corrections are new events referencing the prior event.
- Preserve provider/model identity and request IDs where available.
- Keep API keys, access tokens, private headers, and secrets out of events and exports.
- Store a prompt-template version identifier; do not store hidden chain-of-thought.
- Model outputs are untrusted proposals, not executable instructions.

## 4. Debate cycle

1. Proposal: call OpenAI with the thread history and request a concrete proposal, assumptions, uncertainties, and a testable prediction.
2. Critique: append the proposal; call Meta with the same thread history and ask it to identify errors, missing evidence, alternative explanations, and risks. It must not be instructed to agree.
3. Revision: append the critique; call OpenAI again and ask for a revised proposal that addresses the critique and records unresolved disagreements.
4. Human decision: stop. The moderator accepts, rejects, edits, or forks the proposal. No model can approve the next stage on the human's behalf.

Limits: maximum three provider calls per cycle; bounded timeouts and output tokens; a failed call is recorded without erasing other results; no recursive or indefinite agent loops.

## 5. Backend API

Keep existing routes intact during migration. Add versioned routes:
- POST /api/v1/threads — create a thread; returns thread_id.
- GET /api/v1/threads/:id/events?after_sequence=N — read ordered events.
- POST /api/v1/threads/:id/events — append a human event; backend assigns ID and sequence.
- POST /api/v1/threads/:id/cycles — run one bounded proposal/critique/revision cycle.
- GET /api/v1/threads/:id/export — export JSON with events and experiment records.

The existing Worker has a Durable Object class and a token-protected /api/bus route, but currently stores a capped list of up to 500 messages. That is a prototype transport, not an immutable or complete event log. Implement sequence allocation and persistent event records before claiming the log is immutable.

## 6. Provider adapter contract

Each adapter implements the same internal operation:

    respond({ thread_events, phase, task_instructions, timeout_ms, max_output_tokens })
      -> { text, provider, model, request_id, usage }

Adapters: OpenAI Responses API; documented Meta-hosted model API endpoint and supported model ID.

Do not assume an endpoint, model identifier, or entitlement based only on a product name. Validate current provider documentation and account access before deployment. Do not silently substitute a different model.

## 7. Quantum experiment sandbox — simulator only

The MVP's first quantum step is reproducible simulator validation, not a QPU job.

Experiment record fields: experiment_id, thread_id, hypothesis, circuit_format (QASM 3), circuit_source, circuit_sha256, simulator (for example qiskit-aer), shots, parameters, status, submitted_by, created_at, and result counts/version/completion time.

Flow:
1. An agent may propose a circuit as text/code in an experiment proposal.
2. Backend treats it as untrusted input and validates syntax, qubit count, gate allowlist, shot limit, execution time, and resource bounds.
3. Run only in a sandboxed simulator with no network access and no provider credentials.
4. Append simulator metadata and result to the thread as an instrument observation.
5. Models may analyse the recorded result. Human moderator decides whether to continue.

A simulator result must always be labelled simulator; it must never be described as a physical quantum-hardware measurement.

## 8. Security, privacy, and cost controls

- Provider credentials are Cloudflare Worker secrets only.
- The browser must never receive provider credentials.
- Validate request size, thread ID, event schema, output size, and rate limits.
- Escape rendered text; do not render model output as HTML.
- Do not execute model-generated shell commands or arbitrary code.
- The simulator runs in a separate restricted environment.
- Default to no-cost local validation. Provider API calls may incur charges; require a configured budget policy and human consent before enabling paid calls.
- Hardware jobs remain disabled in this MVP.

## 9. Acceptance tests

1. Create one thread and append a human message.
2. Call OpenAI and Meta independently; each response has correct provenance.
3. Meta receives the proposal in the same thread and produces an independent critique.
4. OpenAI receives the critique and produces a revision.
5. A provider failure is recorded without deleting other results.
6. Exported JSON reproduces event order and contains no secrets.
7. Submit an invalid circuit and verify rejection.
8. Run a valid circuit on the simulator and verify the result is labelled simulator.
9. Confirm no hardware job can be submitted through MVP routes.

## 10. Implementation order

1. Verify deployed Worker URL and current health response.
2. Confirm actual Meta API endpoint, model ID, access entitlement, and pricing against current Meta documentation/account.
3. Implement the event log and versioned thread routes in the Worker.
4. Implement OpenAI and Meta adapters behind one broker.
5. Implement the bounded three-phase debate cycle.
6. Add simulator-only circuit validation and experiment records.
7. Add UI controls for thread creation, debate cycle, provenance, and JSON export.
8. Run acceptance tests and publish a status page showing what is live and what is not.

## 11. Current implementation status

This document is a specification. The repository has an existing static frontend, a Cloudflare Worker source, a Durable Object message bus, and a two-agent Hub. Source changes for a proposed three-agent route and Meta panel have been committed, but they are not evidence of a deployed or working Meta connection. The current frontend/Worker combination must be deployed and tested before describing Meta as live. Quantum simulator and hardware integration are not implemented by this specification alone.