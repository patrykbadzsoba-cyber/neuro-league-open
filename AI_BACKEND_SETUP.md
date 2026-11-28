# NEURO LEAGUE OPEN — konfiguracja backendu

Ten dokument opisuje aktualny backend Cloudflare Worker. Nie oznacza, że usługa została już wdrożona. Status produkcyjny potwierdzają dopiero udane wdrożenie oraz testy endpointów.

## Architektura

- Frontend: GitHub Pages, m.in. `hub.html` i `siec.html`.
- Backend: Cloudflare Worker `neuro-league-open-api`, kod w `worker.js`.
- Trwałe dane: Cloudflare Durable Object `NeuroBus`, skonfigurowany w `wrangler.toml`.
- Konfiguracja Durable Object i migracja SQLite znajdują się w `wrangler.toml`.
- Klucze dostawców są przechowywane jako sekrety Cloudflare Worker. Nie wolno umieszczać ich w HTML, JavaScript przeglądarki, localStorage ani repozytorium.

## Wymagane sekrety Workera

Ustaw w Cloudflare dla Workera `neuro-league-open-api`:

- `OPENAI_API_KEY` — wymagany dla `/api/chat`, `/api/duo` i `/api/trio`.
- `META_MODEL_API_KEY` — wymagany dla uczestnika Meta w `/api/trio`.
- `EXA_API_KEY` — wymagany dla wyszukiwarki `/api/research`.

Opcjonalne zmienne i sekrety:

- `OPENAI_MODEL` — domyślnie `gpt-4.1-mini`.
- `META_MODEL` — domyślnie `muse-spark-1.3`.
- `EXA_DAILY_LIMIT` — limit zapytań badawczych na dzień; domyślnie 20.
- `NEURAL_LINK_ADMIN_TOKEN` — chroni administracyjne endpointy moderacji katalogu.
- `NEURO_BUS_TOKEN` — chroni starszy endpoint komunikacyjny `/api/bus`.
- `IBM_QUANTUM_TOKEN` — opcjonalny; obecność jest raportowana przez `/health`, ale sama konfiguracja nie oznacza działającego eksperymentu kwantowego.

Ustaw `ALLOWED_ORIGIN` na dokładny origin strony, np. `https://patrykbadzsoba-cyber.github.io`. Wartość ta nie powinna zawierać ścieżki repozytorium.

## Wdrożenie

### Automatycznie przez GitHub Actions

Workflow `.github/workflows/deploy-worker.yml` wdraża Workera po zmianie `worker.js`, `wrangler.toml` lub samego workflow. W repozytorium GitHub muszą być wcześniej skonfigurowane sekrety Actions:

- `CLOUDFLARE_API_TOKEN` — token z uprawnieniem edycji Workers Scripts dla właściwego konta.
- `CLOUDFLARE_ACCOUNT_ID` — identyfikator konta Cloudflare.

Workflow nie tworzy sekretów dostawców AI w Cloudflare. Te sekrety trzeba ustawić osobno w konfiguracji Workera.

### Lokalnie przez Wrangler

W katalogu repozytorium:

```bash
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put META_MODEL_API_KEY
npx wrangler secret put EXA_API_KEY
npx wrangler secret put NEURAL_LINK_ADMIN_TOKEN
npx wrangler deploy
```

Polecenia dla opcjonalnych sekretów wykonuj tylko wtedy, gdy dana funkcja ma być używana. Nie wklejaj wartości sekretów do czatu ani do plików repozytorium.

## Endpointy

### Status

- `GET /health` — zwraca stan usługi i informacje logiczne, czy skonfigurowano klucze OpenAI, Meta, Exa i token administratora. Nie potwierdza samodzielnie poprawności kluczy ani dostępności dostawców.

### Rozmowy AI

- `POST /api/chat` — rozmowa z OpenAI. JSON: `{"messages":[{"role":"user","content":"..."}]}`.
- `POST /api/duo` — starszy wariant OpenAI + Gemini; wymaga `OPENAI_API_KEY` i `GEMINI_API_KEY`.
- `POST /api/trio` — aktualny wariant OpenAI + Meta Model API; wymaga `OPENAI_API_KEY` i `META_MODEL_API_KEY`.

Uwaga: Meta Model API nie jest zalogowaną aplikacją konsumencką Meta AI. Gemini nie jest uczestnikiem aktualnego pokoju Trio.

### Wspólny pokój i zdarzenia

- `POST /api/v1/threads` — tworzy identyfikator pokoju.
- `GET /api/v1/threads/{threadId}/events?after=0` — pobiera zdarzenia.
- `POST /api/v1/threads/{threadId}/events` — zapisuje zdarzenie.

Zdarzenia są przechowywane w Durable Object przypisanym do identyfikatora pokoju. Nie oznacza to jeszcze istnienia kont użytkowników, potwierdzonych tożsamości ani prywatnych skrzynek.

### Wyszukiwanie

- `POST /api/research` — wyszukiwanie przez Exa. JSON: `{"query":"temat do zbadania","numResults":5}`. Limit domyślny wynosi 20 zapytań dziennie i jest egzekwowany przez Durable Object.

### Katalog NEURAL LINK

- `GET /api/network/nodes` — pobiera zatwierdzone, publiczne węzły.
- `POST /api/network/nodes` — zgłasza węzeł do moderacji.
- `POST /api/network/connections` — zgłasza propozycję połączenia do moderacji.
- `GET /api/network/admin/pending?type=nodes` — pobiera oczekujące zgłoszenia; wymaga nagłówka `x-neuro-admin-token`.
- `POST /api/network/admin/review` — zatwierdza lub odrzuca zgłoszenie; wymaga tego samego nagłówka.

Token administratora musi być sekretem Workera `NEURAL_LINK_ADMIN_TOKEN`. Nie wolno umieszczać go w kodzie frontendu.

### Starszy kanał wiadomości

- `POST /api/bus` — zapisuje wiadomość; wymaga nagłówka `x-neuro-token`.
- `GET /api/bus?sessionId=...` — pobiera wiadomości sesji; wymaga nagłówka `x-neuro-token`.

Oba endpointy wymagają sekretu Workera `NEURO_BUS_TOKEN`. To starszy kanał i nie należy mylić go z nowym API pokoi `/api/v1/threads`.

## Testy przed uznaniem wdrożenia za działające

1. `GET /health` zwraca `ok: true`.
2. Pola `openaiConfigured`, `metaConfigured` i `exaConfigured` mają wartość `true`, jeśli odpowiednie funkcje mają być aktywne.
3. `POST /api/v1/threads` tworzy pokój.
4. Zapis i odczyt zdarzenia w tym samym pokoju działa z domeny GitHub Pages.
5. `POST /api/trio` zwraca osobne wyniki OpenAI i Meta albo jawny błąd dostawcy — nigdy fikcyjną odpowiedź.
6. `POST /api/research` zwraca źródła i egzekwuje dzienny limit.
7. Zgłoszenie węzła nie staje się publiczne przed moderacją.
8. Żądania do endpointów administracyjnych bez prawidłowego tokena kończą się kodem HTTP 401.
9. Żądania z niedozwolonego origin nie uzyskują dostępu przez CORS.

## Prywatność, koszty i granice

- Nie przesyłaj kluczy API, haseł, kodów 2FA ani danych wrażliwych do publicznych wątków.
- Limity aplikacji ograniczają użycie, ale nie gwarantują bezpłatnego planu u dostawcy.
- Nie uruchamiaj płatnych wywołań bez jawnie zapewnionego budżetu lub kredytu oraz kontroli limitów.
- Zgłoszenia katalogu są moderowane, ale obecne limity nie zastępują pełnej ochrony antyspamowej, polityki retencji ani procedur usuwania danych.
- Kod zapisany w GitHub nie jest równoznaczny z wdrożonym backendem. Dopóki testy powyżej nie przejdą, status należy opisywać jako: „kod przygotowany — wdrożenie i integracja do weryfikacji”.
