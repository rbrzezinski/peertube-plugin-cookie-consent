async function register({ registerSetting }) {
  console.log('[Cookie Consent Plugin] Registering server settings...')
  
  // Podstawowe ustawienia
  registerSetting({
    name: 'enableConsentBanner',
    label: 'Wyświetl baner zgody',
    type: 'input-checkbox',
    default: true,
    private: false
  })
  
  registerSetting({
    name: 'bannerMarkdown',
    label: 'Treść banera (Markdown)',
    type: 'markdown-text',
    default: 'Ta witryna korzysta z plików cookie.\n[Dowiedz się więcej](/datenschutz)',
    private: false
  })
  
  // Ustawienia wyglądu banera
  registerSetting({
    name: 'bannerBackgroundColor',
    label: 'Kolor tła banera',
    type: 'input',
    default: '#000000',
    descriptionHTML: 'Kod koloru HEX (np. #000000 dla czerni)',
    private: false
  })
  
  registerSetting({
    name: 'bannerTextColor',
    label: 'Kolor tekstu banera',
    type: 'input',
    default: '#ffffff',
    descriptionHTML: 'Kod koloru HEX (np. #ffffff dla bieli)',
    private: false
  })
  
  // Ustawienia przycisków
  registerSetting({
    name: 'buttonAcceptColor',
    label: 'Kolor przycisku "Akceptuj wszystkie"',
    type: 'input',
    default: '#28a745',
    descriptionHTML: 'Kod koloru HEX dla zielonego przycisku akceptacji',
    private: false
  })
  
  registerSetting({
    name: 'buttonEssentialColor',
    label: 'Kolor przycisku "Tylko niezbędne"',
    type: 'input',
    default: '#6c757d',
    descriptionHTML: 'Kod koloru HEX dla szarego przycisku niezbędnych',
    private: false
  })
  
  registerSetting({
    name: 'buttonSettingsColor',
    label: 'Kolor przycisku "Ustawienia"',
    type: 'input',
    default: '#007bff',
    descriptionHTML: 'Kod koloru HEX dla niebieskiego przycisku ustawień',
    private: false
  })
  
  // Ustawienia przycisku zarządzania
  registerSetting({
    name: 'manageButtonStyle',
    label: 'Styl przycisku zarządzania',
    type: 'select',
    options: [
      { label: 'Okrągły przycisk z ikoną koła zębatego', value: 'icon-gear' },
      { label: 'Okrągły przycisk z ikoną ciasteczka', value: 'icon-cookie' },
      { label: 'Okrągły przycisk z ikoną ustawień', value: 'icon-settings' },
      { label: 'Mały przycisk tekstowy', value: 'text-small' },
      { label: 'Zwykły przycisk tekstowy', value: 'text-normal' }
    ],
    default: 'icon-gear',
    private: false
  })
  
  registerSetting({
    name: 'manageButtonColor',
    label: 'Kolor przycisku zarządzania',
    type: 'input',
    default: '#007bff',
    descriptionHTML: 'Kod koloru HEX dla przycisku zarządzania',
    private: false
  })
  
  registerSetting({
    name: 'manageButtonPosition',
    label: 'Pozycja przycisku zarządzania',
    type: 'select',
    options: [
      { label: 'Dół po prawej', value: 'bottom-right' },
      { label: 'Dół po lewej', value: 'bottom-left' },
      { label: 'Góra po prawej', value: 'top-right' },
      { label: 'Góra po lewej', value: 'top-left' }
    ],
    default: 'bottom-right',
    private: false
  })
  
  // Ustawienia okna modalnego
  registerSetting({
    name: 'modalAccentColor',
    label: 'Kolor akcentu pól wyboru w oknie modalnym',
    type: 'input',
    default: '#007bff',
    descriptionHTML: 'Kod koloru HEX dla pól wyboru i elementów głównych',
    private: false
  })
  
  registerSetting({
    name: 'modalBorderRadius',
    label: 'Zaokrąglenie rogów okna modalnego (w px)',
    type: 'input',
    default: '12',
    descriptionHTML: 'Wartość w pikselach (np. 12 dla zaokrąglonych rogów)',
    private: false
  })
  
  // Ustawienia skryptów
  registerSetting({
    name: 'scripts',
    label: 'Skrypty ładowane po wyrażeniu zgody (format JSON)',
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
  
  // Dodatkowy CSS dla zaawansowanych użytkowników
  registerSetting({
    name: 'customCss',
    label: 'Dodatkowy kod CSS (dla ekspertów)',
    type: 'input-textarea',
    default: '',
    descriptionHTML: 'Dodatkowy kod CSS dla zaawansowanych modyfikacji',
    private: false
  })
  
  console.log('[Cookie Consent Plugin] Server settings registered successfully')
}

async function unregister() {
  console.log('[Cookie Consent Plugin] Unregistering plugin...')
  return
}

module.exports = { register, unregister }