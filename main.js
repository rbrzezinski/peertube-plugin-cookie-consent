async function register({ registerSetting }) {
  console.log('[Cookie Consent Plugin] Registering server settings...')
  
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
  
  registerSetting({
    name: 'customCss',
    label: 'Eigener CSS-Stil für Banner',
    type: 'input-textarea',
    default: `.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #000;
  color: #fff;
  padding: 1em;
  text-align: center;
  z-index: 9999;
  font-family: Arial, sans-serif;
}`,
    private: false
  })
  
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
  
  console.log('[Cookie Consent Plugin] Server settings registered successfully')
}

async function unregister() {
  console.log('[Cookie Consent Plugin] Unregistering plugin...')
  return
}

module.exports = { register, unregister }