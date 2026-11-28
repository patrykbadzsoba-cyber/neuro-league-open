# NEURO OPEN DESKTOP — wdrożenie wspólnego pokoju

Stan: frontend i kod integracji zapisane w repozytorium; produkcyjne wdrożenie Workera i test end-to-end nadal wymagają potwierdzenia.

## Co znajduje się w repozytorium
- `hub.html` — jedno środowisko: wspólna rozmowa człowieka, ChatGPT i Meta; panel statusu projektu i ostatnich commitów GitHub.
- `worker.js` — `POST /api/trio` wywołuje równolegle OpenAI Responses API i Meta Model API; Gemini nie jest uczestnikiem tego pokoju.
- `worker.js` — `POST /api/v1/threads` tworzy pokój, a `GET/POST /api/v1/threads/:id/events` zapisuje i odczytuje wspólną historię w Cloudflare Durable Objects.
- `worker.js` — `POST /api/research` wykonuje wyszukiwanie Exa po stronie serwera; klucz pozostaje w sekrecie Cloudflare.
- `hub.html` — panel RESEARCH ENGINE · EXA pokazuje tytuły, linki i wyróżnione fragmenty źródeł.
- `neuro-open.webmanifest`, `neuro-open-sw.js`, `assets/neuro-open-icon.svg` — instalacja jako web app i podstawowy cache powłoki.
- Panel projektu pobiera publiczne metadane repozytorium i ostatnie commity z GitHub.

## Sekrety Cloudflare Worker
W Workerze `neuro-league-open-api` skonfiguruj:
- `OPENAI_API_KEY`
- `META_MODEL_API_KEY`
- `EXA_API_KEY` — wyszukiwanie internetowe i pobieranie wyróżnionych fragmentów źródeł przez Exa.

Opcjonalne:
- `OPENAI_MODEL` (domyślnie `gpt-4.1-mini`)
- `META_MODEL` (domyślnie `muse-spark-1.3`)
- `EXA_DAILY_LIMIT` (domyślnie 20 zapytań dziennie; limit ochronny Workera, niezależny od limitu planu Exa).

Nie dodawaj kluczy do HTML, JavaScriptu przeglądarki, localStorage ani repozytorium. Nie wysyłaj ich w rozmowie.

## Wdrożenie backendu
W katalogu repozytorium:
```bash
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put META_MODEL_API_KEY
npx wrangler secret put EXA_API_KEY
npx wrangler deploy
```
Polecenia sekretów pytają o wartość w terminalu. Można też dodać sekrety w panelu Cloudflare.

## Adres backendu
Po wdrożeniu wpisz w panelu „Połączenie backendu” adres Workera przypisany do tego wdrożenia. Adres nie jest jeszcze wpisany na stałe do repozytorium.

## Testy wymagane przed uznaniem integracji za działającą
1. `GET /health` zwraca `openaiConfigured: true`, `metaConfigured: true` i `exaConfigured: true`.
2. `POST /api/research` z JSON-em `{"query":"aktualne badania dotyczące regeneracji rzek","numResults":5}` zwraca źródła Exa z tytułami, adresami URL i wyróżnionymi fragmentami.
3. Limit zapytań Exa w Workerze jest egzekwowany przez Durable Object i domyślnie wynosi 20 dziennie.
4. Utworzenie pokoju przez `POST /api/v1/threads` zwraca identyfikator.
5. Wysłanie wiadomości i odczyt zdarzeń przez `/api/v1/threads/:id/events` działa z domeny GitHub Pages.
6. Jedno pytanie wywołuje osobne odpowiedzi ChatGPT i Meta.
7. Otwarcie tego samego linku pokoju w drugim oknie/urządzeniu pokazuje tę samą historię.
8. Brak konfiguracji lub błąd dostawcy jest pokazywany jako błąd — aplikacja nie generuje fikcyjnych odpowiedzi.

## Meta — ważne rozróżnienie
Uczestnik Meta w tej wersji to Meta Model API (domyślnie Muse Spark), a nie zalogowana aplikacja konsumencka Meta AI. Połączenie z konsumencką Meta AI wymaga osobnej, oficjalnej ścieżki integracji i nie jest tu deklarowane.

## Koszty
Meta Model API wymaga klucza i może wymagać rozliczania konta. Exa rozlicza użycie według aktualnego planu i rodzaju zapytania; sam napis Free Tier w panelu nie jest gwarancją nieograniczonego ani bezkosztowego użycia. Worker ma ochronny limit 20 zapytań dziennie (konfigurowalny przez `EXA_DAILY_LIMIT`), ale nie jest to limit rozliczeniowy Exa. Zasada projektu: nie uruchamiać płatnych wywołań bez jawnie zapewnionego kredytu/sponsoringu oraz limitu wydatków. Kod nie gwarantuje bezpłatnego dostępu.

## Instalacja na macOS
Po opublikowaniu aktualnego `hub.html` w GitHub Pages otwórz pokój w Safari na Macu, następnie wybierz **Udostępnij → Dodaj do Docka**. Funkcja web app w Safari wymaga macOS Sonoma 14 lub nowszego. W starszym macOS można użyć przeglądarki obsługującej instalowanie aplikacji webowych albo później przygotować natywną paczkę desktopową.

## Granica obecnego statusu
Zmiany w repozytorium nie potwierdzają jeszcze wdrożenia Cloudflare Worker ani działających wywołań dostawców. Dopóki testy powyżej nie przejdą, status integracji AI pozostaje „kod przygotowany — wdrożenie do weryfikacji”.


## NEURAL LINK — uruchomienie wspólnego katalogu węzłów

Kod katalogu i API znajduje się w:
- `siec.html` i `siec.js` — katalog, filtrowanie, zgłoszenia i propozycje połączeń;
- `worker.js` — API oraz kolejka zgłoszeń w Cloudflare Durable Objects;
- `docs/NEURAL_LINK_API_v0.1.md` — opis endpointów i moderacji.

### Co robi backend
- `GET /api/network/nodes` zwraca wyłącznie zaakceptowane, publiczne karty węzłów.
- `POST /api/network/nodes` przyjmuje nowe zgłoszenie do kolejki moderacji (maksymalnie 5 zgłoszeń dziennie z jednego adresu IP).
- `POST /api/network/connections` przyjmuje propozycję połączenia do prywatnej kolejki (maksymalnie 10 dziennie z jednego adresu IP).
- `GET /api/network/admin/pending?type=nodes` oraz `?type=connections` pokazują kolejki administratorowi.
- `POST /api/network/admin/review` zatwierdza lub odrzuca zgłoszenie. Zatwierdzone karty węzłów stają się publiczne.

Zgłoszenia nie są automatycznie wysyłane do właścicieli innych węzłów. W tej wersji propozycje połączeń trafiają do prywatnej kolejki moderacji; system nie ma jeszcze kont uczestników, powiadomień ani prywatnych skrzynek.

### Wymagane wdrożenie
1. W Cloudflare Workerze `neuro-league-open-api` dodaj sekret `NEURAL_LINK_ADMIN_TOKEN` — długi, losowy token dostępny wyłącznie administratorowi. Nie zapisuj go w repozytorium ani w przeglądarce.
2. Wykonaj ponowne wdrożenie Workera po aktualizacji `worker.js`:
   `npx wrangler secret put NEURAL_LINK_ADMIN_TOKEN`
   `npx wrangler deploy`
3. Otwórz `siec.html` i wpisz adres wdrożonego Workera w polu „Adres serwera NEURAL LINK”. Wybierz „Połącz i odśwież”.
4. Sprawdź `GET /health`: `networkAdminConfigured` powinno mieć wartość `true`.
5. Wyślij testowe zgłoszenie. Powinno otrzymać status `pending_review`; nie może pojawić się publicznie przed zatwierdzeniem.

### Moderacja przez API
Pobranie oczekujących zgłoszeń:
```bash
curl -H "x-neuro-admin-token: $NEURAL_LINK_ADMIN_TOKEN" \
  "https://WORKER-URL/api/network/admin/pending?type=nodes"
```

Zatwierdzenie lub odrzucenie karty:
```bash
curl -X POST "https://WORKER-URL/api/network/admin/review" \
  -H "content-type: application/json" \
  -H "x-neuro-admin-token: $NEURAL_LINK_ADMIN_TOKEN" \
  -d '{"type":"nodes","id":"ID_ZGŁOSZENIA","decision":"approve"}'
```

Dla propozycji połączeń użyj `"type":"connections"` oraz decyzji `approve` lub `reject`. Zatwierdzenie propozycji nie wysyła jej jeszcze do drugiej strony — wymaga to kolejnego etapu z bezpiecznym systemem kontaktu i zgodą uczestników.

### Granice i bezpieczeństwo
- Nie ma jeszcze kont, potwierdzania tożsamości ani komunikacji prywatnej.
- Zgłoszenia są moderowane przed publikacją; nie umieszczaj w nich danych wrażliwych.
- Ograniczenia liczby zgłoszeń są zabezpieczeniem podstawowym, nie pełną ochroną przed spamem. Przed szerszym otwarciem należy dodać Cloudflare Turnstile, politykę retencji i narzędzia obsługi żądań usunięcia danych.
- Nie twierdź, że backend działa produkcyjnie, dopóki Worker nie zostanie wdrożony i sprawdzony z domeny GitHub Pages.


## Automatyczne wdrożenie przez GitHub Actions

W repozytorium dodano ręczny workflow `.github/workflows/deploy-worker.yml`. Aby uruchomić wdrożenie bez lokalnego terminala:

1. W ustawieniach repozytorium otwórz **Settings → Secrets and variables → Actions → New repository secret**.
2. Dodaj `CLOUDFLARE_API_TOKEN` (token Cloudflare z uprawnieniem **Account → Workers Scripts → Edit** dla właściwego konta).
3. Dodaj `CLOUDFLARE_ACCOUNT_ID` (identyfikator konta Cloudflare).
4. W GitHub otwórz **Actions → Deploy NEURO LEAGUE OPEN API → Run workflow**.

Workflow wdraża kod Workera z `wrangler.toml`. Sekrety dostawców AI i Exa (`OPENAI_API_KEY`, `META_MODEL_API_KEY`, `EXA_API_KEY`, opcjonalnie `NEURAL_LINK_ADMIN_TOKEN`) nadal muszą być dodane jako sekrety samego Cloudflare Worker — workflow ich nie tworzy i nie umieszcza w repozytorium.

Po wdrożeniu Cloudflare przypisze adres `https://neuro-league-open-api.<subdomena-konta>.workers.dev`. Ten adres należy wkleić do pola „Adres Cloudflare Worker” w NEURO OPEN DESKTOP oraz do pola serwera w katalogu NEURAL LINK. Nie wpisuj kluczy API do tych pól.
