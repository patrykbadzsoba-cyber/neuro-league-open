# NEURAL LINK Network API v0.1

**Status:** kod przygotowany w repozytorium; wdrożenie Cloudflare Worker i test produkcyjny wymagają wykonania.

## Model danych

### Node
- `id`: UUID generowany przez serwer
- `name`, `place`, `category`, `stage`
- `description`, `offer`, `need`
- `submittedAt`, `publishedAt`
- `status`: `pending` lub `published`

Kategorie: Regeneracja przyrody, Energia, Badania i nauka, Technologia, Edukacja, Inne.

### Connection proposal
- `id`: UUID generowany przez serwer
- `target`: identyfikator węzła
- `purpose`, `message`
- `submittedAt`, `status`

W tej wersji propozycje nie zawierają danych kontaktowych i nie są automatycznie dostarczane właścicielowi węzła.

## Publiczne endpointy

### GET /api/network/nodes
Zwraca zaakceptowane karty:
```json
{"nodes":[{"id":"...","name":"...","status":"published"}]}
```

### POST /api/network/nodes
Przyjmuje zgłoszenie do moderacji. Wymagane pola: `name`, `place`, `category`, `stage`, `description`; opcjonalne `offer`, `need`.

Odpowiedź HTTP 202:
```json
{"ok":true,"id":"...","status":"pending_review","message":"Zgłoszenie przyjęte do moderacji. Nie jest jeszcze publiczne."}
```

Limit: 5 zgłoszeń dziennie z jednego adresu IP.

### POST /api/network/connections
Przyjmuje propozycję połączenia do prywatnej kolejki moderacji. Wymagane: `target`, `purpose`, `message`.

Odpowiedź HTTP 202 oznacza wyłącznie przyjęcie do kolejki, nie dostarczenie wiadomości drugiej stronie.

Limit: 10 propozycji dziennie z jednego adresu IP.

## Endpointy administratora

Wymagają nagłówka `x-neuro-admin-token` zgodnego z sekretem Workera `NEURAL_LINK_ADMIN_TOKEN`.

### GET /api/network/admin/pending?type=nodes
Pobiera oczekujące karty. Dla propozycji użyj `type=connections`.

### POST /api/network/admin/review
```json
{"type":"nodes","id":"UUID","decision":"approve"}
```
`type` to `nodes` lub `connections`; `decision` to `approve` albo `reject`.

Zatwierdzona karta węzła staje się publiczna. Zatwierdzona propozycja połączenia zostaje zdjęta z kolejki moderacji, ale nie jest wysyłana do właściciela węzła. To ograniczenie jest jawne i wymaga osobnego etapu implementacji komunikacji.

## Przechowywanie i bezpieczeństwo
Dane są przechowywane w Cloudflare Durable Object `NEURO_BUS`, pod identyfikatorem `neural-link-network`. Kolejka zgłoszeń ma limity pojemności. API nie przechowuje adresów IP w rekordach zgłoszeń; używa skrótu SHA-256 adresu IP wyłącznie do podstawowego limitowania częstotliwości.

CORS dopuszcza domenę GitHub Pages projektu. Token administratora nigdy nie trafia do HTML, JavaScriptu przeglądarki ani localStorage.

Przed szerokim uruchomieniem wymagane są: Cloudflare Turnstile, polityka retencji, procedura usuwania danych, testy bezpieczeństwa, obsługa nadużyć i testy obciążeniowe. Ograniczenie częstotliwości nie jest pełnym systemem antyspamowym.
