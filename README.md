# peertube-plugin-cookie-consent

Ein DSGVO- und TTDSG-konformer Cookie-Consent-Banner für PeerTube-Instanzen.

Dieses Plugin zeigt einen konfigurierbaren Cookie-Banner an, blockiert Tracking-Skripte (z. B. Matomo, Umami, Facebook Pixel) bis zur Zustimmung des Nutzers und ermöglicht eine feingranulare Auswahl nach Kategorien (essenzielle, funktionale, Statistik, Marketing).

---

## 🛡️ Merkmale

- ✅ DSGVO/TTDSG-konform (Deutschland)
- 🍪 Cookie-Banner beim ersten Besuch
- ✔️ Drei Buttons:  
  - **Alle akzeptieren**  
  - **Nur essentielle Cookies**  
  - **Einstellungen** (öffnet modales Auswahlfenster)
- 📦 Cookie-Kategorien: `funktional`, `statistik`, `marketing`
- 📝 Markdown-Unterstützung für Bannertest
- 🎨 Anpassbares Styling (CSS)
- 🛠 Verwaltung über das PeerTube-Adminpanel
- 🔐 Speicherung des Einwilligungsstatus in Cookies (`Max-Age: 180 Tage`)
- 🔄 „Cookie-Einstellungen verwalten“-Button jederzeit im Footer verfügbar

---

## 🔧 Konfiguration (über PeerTube Admin UI)

Nach Installation und Neustart erscheint das Plugin in den Einstellungen:

| Einstellungsschlüssel        | Typ       | Beschreibung |
|-----------------------------|-----------|--------------|
| `enableConsentBanner`       | Boolean   | Aktiviert/Deaktiviert den Banner |
| `bannerMarkdown`            | Markdown  | Textinhalt des Banners (z. B. mit Link zu `/datenschutz`) |
| `customCss`                 | Textarea  | Eigene CSS-Regeln für das Banner |
| `scripts`                   | JSON      | Liste von Skripten, die nach Zustimmung geladen werden sollen |

**Beispiel:**

```json
[
  {
    "name": "Matomo",
    "src": "https://matomo.example.com/matomo.js",
    "async": true,
    "defer": true,
    "category": "statistik"
  },
  {
    "name": "Facebook Pixel",
    "src": "https://connect.facebook.net/en_US/fbevents.js",
    "category": "marketing"
  }
]