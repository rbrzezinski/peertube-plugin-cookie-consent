# peertube-plugin-cookie-consent

Baner zgody na pliki cookie zgodny z RODO i TTDSG dla instancji PeerTube, z w pełni konfigurowalnym wyglądem.

Wtyczka wyświetla konfigurowalny baner zgody, blokuje skrypty śledzące (np. Matomo, Umami, Facebook Pixel) do momentu udzielenia zgody przez użytkownika i umożliwia szczegółowy wybór kategorii (niezbędne, funkcjonalne, statystyczne, marketingowe).

---

## 🛡️ Cechy

- ✅ **Zgodność z RODO/TTDSG** (Polska)
- 🍪 **Baner cookie** przy pierwszej wizycie z trzema opcjami wyboru
- 🎨 **W pełni konfigurowalny wygląd** z poziomu panelu administratora
- 📦 **Kategorie ciasteczek**: `funktional`, `statistik`, `marketing`
- 📝 **Obsługa Markdown** dla tekstu banera
- 🛠 **Zarządzanie** z panelu administracyjnego PeerTube
- 🔐 **Bezpieczne przechowywanie** statusu zgody (180 dni)
- ⚙️ **Przycisk zarządzania** konfigurowalny jako ikona lub tekst
- 🌈 **Nowoczesny interfejs** z efektami najechania i animacjami
- 📱 **Responsywny design** dla wszystkich urządzeń

---

## 🎨 Dostosowanie wyglądu

Wtyczka oferuje szerokie możliwości konfiguracji bezpośrednio w panelu PeerTube:

### Baner
- **Kolor tła** banera cookie
- **Kolor tekstu** banera
- **Kolory przycisków** dla wszystkich trzech akcji (Akceptuj, Niezbędne, Ustawienia)

### Przycisk zarządzania
- **Opcje stylu**:
  - 🔧 Okrągły przycisk z ikoną koła zębatego
  - 🍪 Okrągły przycisk z ikoną ciastka  
  - 📋 Okrągły przycisk z ikoną ustawień
  - 📝 Mały przycisk tekstowy
  - 📄 Zwykły przycisk tekstowy
- **Pozycja**: dół prawo/lewo, góra prawo/lewo
- **Kolorystyka** przycisku

### Okno modalne
- **Kolor akcentu** dla pól wyboru i elementów głównych
- **Zaokrąglenie rogów** (konfigurowalne w pikselach)
- **Nowoczesna typografia** z lepszą czytelnością

---

## 🔧 Konfiguracja

Po instalacji wtyczka pojawia się w ustawieniach PeerTube z następującymi opcjami:

### Ustawienia podstawowe

| Ustawienie | Typ | Opis |
|------------|-----|------|
| `enableConsentBanner` | Boolean | Włącza/wyłącza baner |
| `bannerMarkdown` | Markdown | Treść banera (z obsługą linków) |

### Ustawienia wyglądu

| Ustawienie | Typ | Opis |
|------------|-----|------|
| `bannerBackgroundColor` | Pole koloru | Kolor tła banera (domyślnie #000000) |
| `bannerTextColor` | Pole koloru | Kolor tekstu banera (domyślnie #ffffff) |
| `buttonAcceptColor` | Pole koloru | Kolor przycisku "Akceptuj wszystkie" (domyślnie #28a745) |
| `buttonEssentialColor` | Pole koloru | Kolor przycisku "Tylko niezbędne" (domyślnie #6c757d) |
| `buttonSettingsColor` | Pole koloru | Kolor przycisku "Ustawienia" (domyślnie #007bff) |

### Przycisk zarządzania

| Ustawienie | Typ | Opis |
|------------|-----|------|
| `manageButtonStyle` | Lista wyboru | Styl przycisku zarządzania (ikona lub tekst) |
| `manageButtonColor` | Pole koloru | Kolor przycisku zarządzania |
| `manageButtonPosition` | Lista wyboru | Pozycja na stronie |

### Ustawienia okna modalnego

| Ustawienie | Typ | Opis |
|------------|-----|------|
| `modalAccentColor` | Pole koloru | Kolor akcentu dla pól wyboru (domyślnie #007bff) |
| `modalBorderRadius` | Liczba | Zaokrąglenie rogów okna w pikselach (domyślnie 12) |

### Ustawienia zaawansowane

| Ustawienie | Typ | Opis |
|------------|-----|------|
| `scripts` | JSON | Lista skryptów ładowanych po wyrażeniu zgody |
| `customCss` | Pole tekstowe | Dodatkowy kod CSS dla zaawansowanych użytkowników |

---

## 📋 Konfiguracja skryptów

Skonfiguruj skrypty śledzące w formacie JSON:

```json
[
  {
    "name": "Matomo Analytics",
    "src": "https://matomo.example.com/matomo.js",
    "async": true,
    "defer": true,
    "category": "statistik"
  },
  {
    "name": "Facebook Pixel",
    "src": "https://connect.facebook.net/en_US/fbevents.js",
    "category": "marketing"
  },
  {
    "name": "Google Analytics",
    "src": "https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID",
    "async": true,
    "category": "statistik"
  }
]
```

### Dostępne kategorie:
- **`funktional`**: Zawsze aktywna (technicznie konieczna)
- **`statistik`**: Analityka, statystyki odwiedzin
- **`marketing`**: Reklama, śledzenie, media społecznościowe

---

## 🚀 Instalacja

### Przez interfejs administracyjny PeerTube (zalecane)
1. Przejdź do **Administration** → **Plugins & Themes**
2. Wyszukaj `peertube-plugin-cookie-consent`
3. Kliknij **Install**
4. Skonfiguruj wtyczkę w ustawieniach

### Przez npm
```bash
npm install peertube-plugin-cookie-consent
```

### Instalacja ręczna
```bash
cd /var/www/peertube/peertube-latest
sudo -u peertube npm run plugin:install -- --npm-name peertube-plugin-cookie-consent
```

---

## 🎯 Użycie

1. **Zainstaluj** wtyczkę przez administrację PeerTube
2. **Skonfiguruj** kolory i style według własnych potrzeb
3. **Dodaj** skrypty śledzące w formacie JSON
4. **Dostosuj** tekst banera przy pomocy Markdown
5. **Zapisz** ustawienia

Wtyczka działa natychmiast po instalacji. Odwiedzający zobaczą baner podczas pierwszej wizyty i będą mogli wybrać swoje preferencje.

---

## 🔧 Szczegóły techniczne

- **Kompatybilność z PeerTube**: ≥ 5.2.0
- **Nowoczesne moduły ES6**: zoptymalizowane dla PeerTube 7.x
- **Universal-Cookie**: niezawodne zarządzanie plikami cookie
- **Responsywny design**: działa na wszystkich urządzeniach
- **Dostępność**: przyjazne dla czytników ekranu
- **Wydajność**: minimalny narzut JavaScript

---

## 📝 Licencja

AGPL-3.0 - zobacz plik [LICENSE](LICENSE) po szczegóły.

---

## 🤝 Współtworzenie

Wkład jest mile widziany! Otwórz Pull Request lub zgłoś Issue.

**Repozytorium**: [https://github.com/yarkolife/peertube-plugin-cookie-consent](https://github.com/yarkolife/peertube-plugin-cookie-consent)

---

## 📞 Wsparcie

W razie pytań lub problemów utwórz Issue w repozytorium GitHub.
---

*Stworzone z ❤️ dla społeczności PeerTube*