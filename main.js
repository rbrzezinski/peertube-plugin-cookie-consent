async function register({ registerSetting }) {
  console.log('[Cookie Consent Plugin] Registering server settings...')
  
  // Основные настройки
  registerSetting({
    name: 'enableConsentBanner',
    label: 'Cookie-Banner anzeigen',
    type: 'input-checkbox',
    default: true,
    private: false
  })
  
  registerSetting({
    name: 'bannerMarkdown',
    label: 'Banner-Inhalt (Markdown)',
    type: 'markdown-text',
    default: 'Diese Website verwendet Cookies.\n[Mehr erfahren](/datenschutz)',
    private: false
  })
  
  // Настройки дизайна баннера
  registerSetting({
    name: 'bannerBackgroundColor',
    label: 'Hintergrundfarbe des Banners',
    type: 'input',
    default: '#000000',
    descriptionHTML: 'Hex-Farbcode (z.B. #000000 für schwarz)',
    private: false
  })
  
  registerSetting({
    name: 'bannerTextColor',
    label: 'Textfarbe des Banners',
    type: 'input',
    default: '#ffffff',
    descriptionHTML: 'Hex-Farbcode (z.B. #ffffff für weiß)',
    private: false
  })
  
  // Настройки кнопок
  registerSetting({
    name: 'buttonAcceptColor',
    label: 'Farbe der "Alle akzeptieren" Taste',
    type: 'input',
    default: '#28a745',
    descriptionHTML: 'Hex-Farbcode für den grünen "Akzeptieren" Button',
    private: false
  })
  
  registerSetting({
    name: 'buttonEssentialColor',
    label: 'Farbe der "Nur essentielle" Taste',
    type: 'input',
    default: '#6c757d',
    descriptionHTML: 'Hex-Farbcode für den grauen "Essentielle" Button',
    private: false
  })
  
  registerSetting({
    name: 'buttonSettingsColor',
    label: 'Farbe der "Einstellungen" Taste',
    type: 'input',
    default: '#007bff',
    descriptionHTML: 'Hex-Farbcode für den blauen "Einstellungen" Button',
    private: false
  })
  
  // Настройки кнопки управления
  registerSetting({
    name: 'manageButtonStyle',
    label: 'Stil der Verwaltungsschaltfläche',
    type: 'select',
    options: [
      { label: 'Runde Schaltfläche mit Zahnrad-Symbol', value: 'icon-gear' },
      { label: 'Runde Schaltfläche mit Cookie-Symbol', value: 'icon-cookie' },
      { label: 'Runde Schaltfläche mit Einstellungs-Symbol', value: 'icon-settings' },
      { label: 'Kleine Textschaltfläche', value: 'text-small' },
      { label: 'Normale Textschaltfläche', value: 'text-normal' }
    ],
    default: 'icon-gear',
    private: false
  })
  
  registerSetting({
    name: 'manageButtonColor',
    label: 'Farbe der Verwaltungsschaltfläche',
    type: 'input',
    default: '#007bff',
    descriptionHTML: 'Hex-Farbcode für die Verwaltungsschaltfläche',
    private: false
  })
  
  registerSetting({
    name: 'manageButtonPosition',
    label: 'Position der Verwaltungsschaltfläche',
    type: 'select',
    options: [
      { label: 'Unten rechts', value: 'bottom-right' },
      { label: 'Unten links', value: 'bottom-left' },
      { label: 'Oben rechts', value: 'top-right' },
      { label: 'Oben links', value: 'top-left' }
    ],
    default: 'bottom-right',
    private: false
  })
  
  // Настройки модального окна
  registerSetting({
    name: 'modalAccentColor',
    label: 'Akzentfarbe für Checkboxen im Modal',
    type: 'input',
    default: '#007bff',
    descriptionHTML: 'Hex-Farbcode für Checkboxen und primäre Elemente',
    private: false
  })
  
  registerSetting({
    name: 'modalBorderRadius',
    label: 'Rundung der Modal-Ecken (in px)',
    type: 'input',
    default: '12',
    descriptionHTML: 'Wert in Pixeln (z.B. 12 für abgerundete Ecken)',
    private: false
  })
  
  // Настройки скриптов
  registerSetting({
    name: 'scripts',
    label: 'Skripte zum Laden nach Einwilligung (JSON-Format)',
    type: 'input-textarea',
    default: JSON.stringify([
      {
        "name": "Matomo",
        "src": "https://matomo.example.com/matomo.js",
        "async": true,
        "defer": true,
        "category": "statistik"
      }
    ], null, 2),
    private: false
  })
  
  // Дополнительный CSS для продвинутых пользователей
  registerSetting({
    name: 'customCss',
    label: 'Zusätzlicher CSS-Code (für Experten)',
    type: 'input-textarea',
    default: '',
    descriptionHTML: 'Zusätzlicher CSS-Code für erweiterte Anpassungen',
    private: false
  })
  
  console.log('[Cookie Consent Plugin] Server settings registered successfully')
}

async function unregister() {
  console.log('[Cookie Consent Plugin] Unregistering plugin...')
  return
}

module.exports = { register, unregister }