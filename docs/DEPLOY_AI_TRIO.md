# Wdrożenie wspólnego pokoju AI — trzy modele

Stan: kod źródłowy przygotowany; wdrożenie i test end-to-end niepotwierdzone.

## Co zostało zmienione
- `worker.js`: dodana trasa `POST /api/trio`, która równolegle wywołuje OpenAI Responses API, Gemini GenerateContent i Meta Model API Responses.
- `GET /health`: zwraca teraz również `metaConfigured` i `quantumConfigured`; nie ujawnia wartości sekretów.
- `hub.html`: dodany panel META MODEL, status konfiguracji i wysyłanie wspólnej historii do `/api/trio`.
- Dotychczasowa trasa `/api/duo` pozostaje, aby nie łamać starszych klientów.

## Wymagane sekrety Cloudflare Worker
Ustaw w ustawieniach Worker `neuro-league-open-api` (Workers & Pages → Settings → Variables and Secrets → Secrets):

- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `META_MODEL_API_KEY`

Opcjonalne zmienne:
- `OPENAI_MODEL` (domyślnie `gpt-4.1-mini`)
- `GEMINI_MODEL` (domyślnie `gemini-2.5-flash`)
- `META_MODEL` (domyślnie `muse-spark-1.3`)

Nie wpisuj kluczy do repozytorium, HTML, JavaScriptu przeglądarki ani localStorage. Nie wysyłaj ich w rozmowie.

## Wdrożenie
W katalogu repozytorium:
```bash
npx wrangler deploy
```
Jeśli Worker nie ma jeszcze skonfigurowanych sekretów, ustaw je z terminala:
```bash
npx wrangler secret put OPENAI_API_KEY
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put META_MODEL_API_KEY
```
Każde polecenie poprosi o wartość bez zapisywania jej w kodzie. Alternatywnie można użyć panelu Cloudflare.

## Ważne: koszt Meta
Meta Model API wymaga klucza i skonfigurowanego rozliczania konta. To nie jest automatycznie darmowy dostęp do konsumenckiej aplikacji Meta AI. W ramach zasady zero-kosztowej nie uruchamiaj płatnych wywołań bez jawnie zapewnionego kredytu/sponsoringu i limitu wydatków. Do testów można najpierw uruchomić tylko lokalne testy i sprawdzić status konfiguracji.

## Test po wdrożeniu
1. Otwórz `https://<worker-domain>/health` i sprawdź `openaiConfigured`, `geminiConfigured`, `metaConfigured`.
2. W Hubie ustaw adres Workera.
3. Wyślij krótkie pytanie testowe.
4. Potwierdź, że pojawiły się trzy osobne odpowiedzi i że każda ma własną tożsamość.
5. Jeśli którykolwiek dostawca nie odpowie, pokaż jego błąd oddzielnie; nie symuluj odpowiedzi.

## Granica obecnego wdrożenia
Kod wspólnego pokoju nie jest jeszcze dowodem, że Meta AI jest połączona na żywo. Połączenie staje się rzeczywiste dopiero po wdrożeniu Workera, bezpiecznym dodaniu sekretów i udanym teście end-to-end.
