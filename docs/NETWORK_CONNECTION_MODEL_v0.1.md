# NEURAL LINK — Network of Independent Connections
## Model połączeń v0.1

**Status:** prototyp koncepcyjny i lokalny; nie jest jeszcze usługą wieloużytkownikową.

### Cel
NEURAL LINK umożliwia niezależnym ludziom i projektom odnajdywanie się, wymianę wiedzy i dobrowolne proponowanie współpracy bez centralnego przejmowania kontroli.

### Zasada podstawowa
**Nie chcemy posiadać ludzi ani projektów. Chcemy umożliwiać im wzajemne połączenie.**

Każdy węzeł zachowuje własną nazwę, decyzje, zasoby, odpowiedzialność i prawo do odejścia.

### Węzeł
Węzłem może być osoba, lokalna społeczność, projekt badawczy, organizacja, inicjatywa środowiskowa, zespół technologiczny lub zasób wiedzy.

Karta węzła obejmuje:
- identyfikator i nazwę;
- miejsce działania;
- obszar tematyczny i etap;
- opis problemu, celu i aktualnego stanu;
- oferowane kompetencje;
- potrzeby i poszukiwane formy współpracy.

### Protokół połączenia
1. **DISCOVER** — odnalezienie potencjalnego partnera.
2. **CONNECT** — przygotowanie propozycji kontaktu.
3. **DIALOGUE** — uzgodnienie problemu i możliwego wkładu.
4. **AGREEMENT** — dobrowolne ustalenie zakresu współpracy.
5. **COLLABORATE** — realizacja uzgodnionych działań.
6. **VERIFY** — dokumentowanie i sprawdzanie rezultatów.
7. **SHARE** — udostępnianie wiedzy innym węzłom.

Każdy etap jest dobrowolny. Samo zgłoszenie nie oznacza zgody drugiej strony ani potwierdzenia partnerstwa.

### Pierwszy przykład: TAR-001
TAR-001 (Tarpenbek, Norderstedt/Hamburg, Niemcy) jest przykładowym węzłem pilotażowym. Opisuje planowaną strukturę: diagnoza, plan regeneracji, transparentność zasobów, rejestr działań i weryfikacja rezultatów. Status diagnozy: DRAFT 0.1 — do weryfikacji. Nie należy przedstawiać planowanych działań jako wykonanych ani wyników jako potwierdzonych.

### Status implementacji prototypu
Strona `siec.html` udostępnia:
- katalog i filtrowanie węzłów;
- kartę TAR-001;
- formularz tworzenia lokalnej karty węzła;
- formularz szkicu propozycji połączenia;
- eksport danych w formacie JSON.

W tej wersji wpisy i propozycje są przechowywane wyłącznie w localStorage przeglądarki użytkownika. Nie istnieje współdzielona baza, serwerowa publikacja, konta, weryfikacja tożsamości ani dostarczanie wiadomości do innych uczestników. Interfejs informuje o tym wprost.

### Wymagania przed uruchomieniem sieci wieloużytkownikowej
- backend i wspólna baza danych;
- zgoda na publikację oraz ustawienia widoczności;
- kontrola dostępu i możliwość usunięcia danych;
- ochrona przed spamem, podszywaniem się i nadużyciami;
- moderacja i mechanizm zgłaszania nadużyć;
- bezpieczne przechowywanie kontaktów i komunikacji;
- kopie zapasowe, logi bezpieczeństwa i polityka retencji;
- testy bezpieczeństwa, prywatności i dostępności.

### Zasady
- dobrowolność i brak obowiązkowego członkostwa;
- autonomia i prawo do odejścia;
- prywatność od początku;
- transparentność statusu danych i rezultatów;
- brak fikcyjnych profili, partnerstw i aktywności;
- możliwość kopiowania i rozwijania standardu niezależnie.

**Otwarte dla wszystkich. Należące do nikogo. Połączone wspólnym celem, a nie podporządkowaniem.**
