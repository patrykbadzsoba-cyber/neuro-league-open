# NEURO OPEN DESKTOP — wdrożenie wspólnego pokoju

Stan: frontend i kod integracji zapisane w repozytorium; produkcyjne wdrożenie Workera i test end-to-end nadal wymagają potwierdzenia.

## Co znajduje się w repozytorium
- `hub.html` — jedno środowisko: wspólna rozmowa człowieka, ChatGPT i Meta; panel statusu projektu i ostatnich commitów GitHub.
- `worker.js` — `POST /api/trio` wywołuje równolegle OpenAI Responses API i Meta Model API; Gemini nie jest uczestnikiem tego pokoju.
- `worker.js` — `POST /api/v1/threads` tworzy pokój, a `GET/POST /api/v1/threads/:id/events` zapisuje i odczytuje wspólną historię w Cloudflare Durable Objects.
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
Meta Model API wymaga klucza i może wymagać rozliczania konta. Zasada projektu: nie uruchamiać płatnych wywołań bez jawnie zapewnionego kredytu/sponsoringu oraz limitu wydatków. Kod nie gwarantuje bezpłatnego dostępu.

## Instalacja na macOS
Po opublikowaniu aktualnego `hub.html` w GitHub Pages otwórz pokój w Safari na Macu, następnie wybierz **Udostępnij → Dodaj do Docka**. Funkcja web app w Safari wymaga macOS Sonoma 14 lub nowszego. W starszym macOS można użyć przeglądarki obsługującej instalowanie aplikacji webowych albo później przygotować natywną paczkę desktopową.

## Granica obecnego statusu
Zmiany w repozytorium nie potwierdzają jeszcze wdrożenia Cloudflare Worker ani działających wywołań dostawców. Dopóki testy powyżej nie przejdą, status integracji AI pozostaje „kod przygotowany — wdrożenie do weryfikacji”.
