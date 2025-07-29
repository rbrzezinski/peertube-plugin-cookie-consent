# peertube-plugin-cookie-consent

Ein DSGVO- und TTDSG-konformer Cookie-Consent-Banner für PeerTube-Instanzen mit vollständig konfigurierbarem Design.

Dieses Plugin zeigt einen konfigurierbaren Cookie-Banner an, blockiert Tracking-Skripte (z. B. Matomo, Umami, Facebook Pixel) bis zur Zustimmung des Nutzers und ermöglicht eine feingranulare Auswahl nach Kategorien (essenzielle, funktionale, Statistik, Marketing).

---

## 🛡️ Merkmale

- ✅ **DSGVO/TTDSG-konform** (Deutschland)
- 🍪 **Cookie-Banner** beim ersten Besuch mit drei Auswahlmöglichkeiten
- 🎨 **Vollständig konfigurierbares Design** über die Admin-Oberfläche
- 📦 **Cookie-Kategorien**: `funktional`, `statistik`, `marketing`
- 📝 **Markdown-Unterstützung** für Bannertext
- 🛠 **Verwaltung** über das PeerTube-Adminpanel
- 🔐 **Sichere Speicherung** des Einwilligungsstatus (180 Tage)
- ⚙️ **Verwaltungsschaltfläche** als Icon oder Text konfigurierbar
- 🌈 **Moderne Benutzeroberfläche** mit Hover-Effekten und Animationen
- 📱 **Responsive Design** für alle Geräte

---

## 🎨 Design-Anpassungen

Das Plugin bietet umfangreiche Designoptionen direkt im PeerTube-Admin:

### Banner-Anpassungen
- **Hintergrundfarbe** des Cookie-Banners
- **Textfarbe** des Banners
- **Button-Farben** für alle drei Aktionen (Akzeptieren, Essentielle, Einstellungen)

### Verwaltungsschaltfläche
- **Stil-Optionen**:
  - 🔧 Runde Schaltfläche mit Zahnrad-Symbol
  - 🍪 Runde Schaltfläche mit Cookie-Symbol  
  - 📋 Runde Schaltfläche mit Einstellungs-Symbol
  - 📝 Kleine Textschaltfläche
  - 📄 Normale Textschaltfläche
- **Position**: Unten rechts/links, Oben rechts/links
- **Farbanpassung** der Schaltfläche

### Modal-Fenster
- **Akzentfarbe** für Checkboxen und primäre Elemente
- **Rundung der Ecken** (anpassbar in Pixeln)
- **Moderne Typografie** mit verbesserter Lesbarkeit

---

## 🔧 Konfiguration

Nach Installation erscheint das Plugin in den PeerTube-Einstellungen mit folgenden Optionen:

### Grundeinstellungen

| Einstellung | Typ | Beschreibung |
|-------------|-----|--------------|
| `enableConsentBanner` | Boolean | Aktiviert/Deaktiviert den Banner |
| `bannerMarkdown` | Markdown | Textinhalt des Banners (mit Link-Unterstützung) |

### Design-Einstellungen

| Einstellung | Typ | Beschreibung |
|-------------|-----|--------------|
| `bannerBackgroundColor` | Farbfeld | Hintergrundfarbe des Banners (Standard: #000000) |
| `bannerTextColor` | Farbfeld | Textfarbe des Banners (Standard: #ffffff) |
| `buttonAcceptColor` | Farbfeld | Farbe der "Alle akzeptieren" Taste (Standard: #28a745) |
| `buttonEssentialColor` | Farbfeld | Farbe der "Nur essentielle" Taste (Standard: #6c757d) |
| `buttonSettingsColor` | Farbfeld | Farbe der "Einstellungen" Taste (Standard: #007bff) |

### Verwaltungsschaltfläche

| Einstellung | Typ | Beschreibung |
|-------------|-----|--------------|
| `manageButtonStyle` | Auswahl | Stil der Verwaltungsschaltfläche (Icon oder Text) |
| `manageButtonColor` | Farbfeld | Farbe der Verwaltungsschaltfläche |
| `manageButtonPosition` | Auswahl | Position auf der Seite |

### Modal-Einstellungen

| Einstellung | Typ | Beschreibung |
|-------------|-----|--------------|
| `modalAccentColor` | Farbfeld | Akzentfarbe für Checkboxen (Standard: #007bff) |
| `modalBorderRadius` | Zahl | Rundung der Modal-Ecken in Pixeln (Standard: 12) |

### Erweiterte Einstellungen

| Einstellung | Typ | Beschreibung |
|-------------|-----|--------------|
| `scripts` | JSON | Liste von Skripten zum Laden nach Zustimmung |
| `customCss` | Textarea | Zusätzlicher CSS-Code für Experten |

---

## 📋 Skript-Konfiguration

Konfigurieren Sie Tracking-Skripte im JSON-Format:

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

### Verfügbare Kategorien:
- **`funktional`**: Immer aktiviert (technisch notwendig)
- **`statistik`**: Analytics, Besucherstatistiken
- **`marketing`**: Werbung, Tracking, Social Media

---

## 🚀 Installation

### Über PeerTube Admin-Interface (empfohlen)
1. Gehen Sie zu **Administration** → **Plugins & Themes**
2. Suchen Sie nach `peertube-plugin-cookie-consent`
3. Klicken Sie auf **Install**
4. Konfigurieren Sie das Plugin in den Einstellungen

### Über npm
```bash
npm install peertube-plugin-cookie-consent
```

### Manuelle Installation
```bash
cd /var/www/peertube/peertube-latest
sudo -u peertube npm run plugin:install -- --npm-name peertube-plugin-cookie-consent
```

---

## 🎯 Verwendung

1. **Installation** des Plugins über die PeerTube-Administration
2. **Konfiguration** der Farben und Stile nach Ihren Wünschen
3. **Einrichtung** der Tracking-Skripte im JSON-Format
4. **Anpassung** des Banner-Texts mit Markdown
5. **Speichern** der Einstellungen

Das Plugin funktioniert sofort nach der Installation. Besucher sehen beim ersten Besuch den Cookie-Banner und können ihre Präferenzen auswählen.

---

## 🔧 Technische Details

- **PeerTube-Kompatibilität**: ≥ 5.2.0
- **Moderne ES6-Module**: Optimiert für PeerTube 7.x
- **Universal-Cookie**: Robuste Cookie-Verwaltung
- **Responsive Design**: Funktioniert auf allen Geräten
- **Accessibility**: Screen-Reader-freundlich
- **Performance**: Minimaler JavaScript-Footprint

---

## 📝 Lizenz

AGPL-3.0 - Siehe [LICENSE](LICENSE) Datei für Details.

---

## 🤝 Beitragen

Beiträge sind willkommen! Bitte erstellen Sie einen Pull Request oder öffnen Sie ein Issue.

**Repository**: [https://github.com/yarkolife/peertube-plugin-cookie-consent](https://github.com/yarkolife/peertube-plugin-cookie-consent)

---

## 📞 Support

Bei Fragen oder Problemen erstellen Sie bitte ein Issue im GitHub-Repository.

---

*Entwickelt mit ❤️ für die PeerTube-Community*