// PeerTube Cookie Consent Plugin - Client Script with Configurable Design
import Cookies from 'universal-cookie'

// Создаем экземпляр cookie manager
const cookies = new Cookies()

// Упрощенные функции для работы с согласием
function getConsentCategories() {
  return cookies.get('cookieConsentCategories') || null
}

function setConsentCategories(categories, days) {
  cookies.set('cookieConsentCategories', categories, {
    path: '/',
    maxAge: (days || 180) * 24 * 60 * 60,
    secure: location.protocol === 'https:',
    sameSite: 'lax'
  })
}

function removeConsentCategories() {
  cookies.remove('cookieConsentCategories', { path: '/' })
}

function injectCss(css) {
  const style = document.createElement('style')
  style.innerHTML = css
  document.head.appendChild(style)
}

function injectScripts(scripts, allowedCategories) {
  allowedCategories = allowedCategories || []
  for (let i = 0; i < scripts.length; i++) {
    const s = scripts[i]
    if (!s.category || allowedCategories.indexOf(s.category) !== -1) {
      const el = document.createElement('script')
      el.src = s.src
      if (s.async) el.async = true
      if (s.defer) el.defer = true
      document.head.appendChild(el)
    }
  }
}

function createElementFromMarkdown(markdown) {
  const container = document.createElement('div')
  container.innerHTML = markdown
    .replace(/\n/g, '<br>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  return container
}

function safeParse(jsonInput) {
  try {
    return JSON.parse(jsonInput)
  } catch (e) {
    console.error('[Cookie Consent Plugin] Błąd podczas parsowania skryptów:', e)
    return []
  }
}

function applyConsent(settings) {
  const scripts = safeParse(settings.scripts)
  const categories = getConsentCategories()
  if (!categories) return

  const allowed = []
  const keys = Object.keys(categories)
  for (let i = 0; i < keys.length; i++) {
    if (categories[keys[i]] === true) {
      allowed.push(keys[i])
    }
  }

  injectScripts(scripts, allowed)
}

function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

function darkenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) - amt
  const G = (num >> 8 & 0x00FF) - amt
  const B = (num & 0x0000FF) - amt
  return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
    (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
    (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1)
}

function showCookieSettings(settings) {
  const existing = document.getElementById('cookie-settings-modal')
  if (existing) existing.remove()

  const overlay = document.createElement('div')
  overlay.id = 'cookie-settings-modal'
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:99999;display:flex;align-items:center;justify-content:center;'

  const borderRadius = parseInt(settings.modalBorderRadius || '12')
  const accentColor = settings.modalAccentColor || '#007bff'
  const accentHover = darkenColor(accentColor, 15)

  const modal = document.createElement('div')
  modal.style.cssText = `background:#fff;padding:2em;border-radius:${borderRadius}px;max-width:450px;text-align:left;font-family:Arial,sans-serif;color:#333;box-shadow:0 8px 32px rgba(0,0,0,0.3);`

  const currentPrefs = getConsentCategories() || { funktional: true, statistik: false, marketing: false }

  const modalContent = `
    <h2 style="color:#333;margin-top:0;margin-bottom:1.5em;font-size:1.4em;">Ustawienia plików cookie</h2>
    <style>
      .cookie-option {
        display: flex;
        align-items: center;
        margin: 15px 0;
        padding: 8px 0;
      }
      .cookie-checkbox {
        width: 18px;
        height: 18px;
        margin-right: 12px;
        accent-color: ${accentColor};
        transform: scale(1.2);
      }
      .cookie-label {
        color: #333 !important;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        user-select: none;
      }
      .cookie-buttons {
        margin-top: 2em;
        padding-top: 1em;
        border-top: 1px solid #eee;
      }
      .cookie-btn-primary {
        background: ${accentColor};
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        margin-right: 12px;
        transition: background 0.2s;
      }
      .cookie-btn-primary:hover {
        background: ${accentHover};
      }
      .cookie-btn-secondary {
        background: #6c757d;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;
      }
      .cookie-btn-secondary:hover {
        background: #545b62;
      }
    </style>
    <form id="cookie-categories-form">
      <div class="cookie-option">
        <input type="checkbox" class="cookie-checkbox" name="funktional" id="funktional" ${currentPrefs.funktional ? 'checked' : ''}>
        <label class="cookie-label" for="funktional">Funkcjonalne</label>
      </div>
      <div class="cookie-option">
        <input type="checkbox" class="cookie-checkbox" name="statistik" id="statistik" ${currentPrefs.statistik ? 'checked' : ''}>
        <label class="cookie-label" for="statistik">Statystyczne</label>
      </div>
      <div class="cookie-option">
        <input type="checkbox" class="cookie-checkbox" name="marketing" id="marketing" ${currentPrefs.marketing ? 'checked' : ''}>
        <label class="cookie-label" for="marketing">Marketingowe</label>
      </div>
      <div class="cookie-buttons">
        <button type="submit" class="cookie-btn-primary">Zapisz</button>
        <button type="button" id="cancelCookieSettings" class="cookie-btn-secondary">Anuluj</button>
      </div>
    </form>
  `

  modal.innerHTML = modalContent
  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  document.getElementById('cancelCookieSettings').onclick = function() { 
    overlay.remove() 
  }

  document.getElementById('cookie-categories-form').onsubmit = function(e) {
    e.preventDefault()
    const form = new FormData(e.target)
    const prefs = {
      funktional: form.has('funktional'),
      statistik: form.has('statistik'),  
      marketing: form.has('marketing')
    }
    
    setConsentCategories(prefs, 180)
    overlay.remove()
    location.reload()
  }
}

function getManageButtonIcon(style) {
  switch (style) {
    case 'icon-gear': return '⚙️'
    case 'icon-cookie': return '🍪'
    case 'icon-settings': return '📋'
    default: return '⚙️'
  }
}

function getPositionStyle(position) {
  switch (position) {
    case 'bottom-left': return 'bottom: 20px; left: 20px;'
    case 'top-right': return 'top: 20px; right: 20px;'
    case 'top-left': return 'top: 20px; left: 20px;'
    default: return 'bottom: 20px; right: 20px;'
  }
}

function addManageButton(settings) {
  if (document.getElementById('cookie-manage-btn')) return
  
  const buttonStyle = settings.manageButtonStyle || 'icon-gear'
  const buttonColor = settings.manageButtonColor || '#007bff'
  const buttonPosition = settings.manageButtonPosition || 'bottom-right'
  const buttonColorHover = darkenColor(buttonColor, 15)
  
  const manageBtn = document.createElement('button')
  manageBtn.id = 'cookie-manage-btn'
  manageBtn.title = 'Zarządzaj ustawieniami plików cookie'
  
  if (buttonStyle.startsWith('icon-')) {
    // Круглая кнопка с иконкой
    manageBtn.innerHTML = getManageButtonIcon(buttonStyle)
    manageBtn.style.cssText = `
      position: fixed;
      ${getPositionStyle(buttonPosition)}
      width: 48px;
      height: 48px;
      font-size: 18px;
      z-index: 9999;
      background: ${buttonColor};
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 12px ${buttonColor}40;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    `
  } else {
    // Текстовая кнопка
    manageBtn.textContent = 'Ustawienia plików cookie'
    const isSmall = buttonStyle === 'text-small'
    manageBtn.style.cssText = `
      position: fixed;
      ${getPositionStyle(buttonPosition)}
      font-size: ${isSmall ? '12px' : '14px'};
      z-index: 9999;
      background: ${buttonColor};
      color: white;
      border: none;
      padding: ${isSmall ? '6px 12px' : '8px 16px'};
      border-radius: 4px;
      cursor: pointer;
      box-shadow: 0 2px 8px ${buttonColor}40;
      transition: all 0.3s ease;
    `
  }
  
  // Эффекты при наведении
  manageBtn.onmouseenter = function() {
    this.style.background = buttonColorHover
    if (buttonStyle.startsWith('icon-')) {
      this.style.transform = 'scale(1.1)'
    }
  }
  
  manageBtn.onmouseleave = function() {
    this.style.background = buttonColor
    if (buttonStyle.startsWith('icon-')) {
      this.style.transform = 'scale(1)'
    }
  }
  
  manageBtn.onclick = function() { showCookieSettings(settings) }
  document.body.appendChild(manageBtn)
}

function createStyledButton(text, color, onClick) {
  const button = document.createElement('button')
  const hoverColor = darkenColor(color, 15)
  
  button.textContent = text
  button.style.cssText = `
    margin: 0 8px;
    padding: 10px 20px;
    background: ${color};
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background 0.2s;
  `
  
  button.onmouseenter = function() { this.style.background = hoverColor }
  button.onmouseleave = function() { this.style.background = color }
  button.onclick = onClick
  
  return button
}

// Основная функция регистрации плагина
function register({ registerHook, peertubeHelpers }) {
  console.log('[Cookie Consent Plugin] Register function called')
  
  if (!registerHook || !peertubeHelpers) {
    console.error('[Cookie Consent Plugin] Missing required options')
    return
  }

  console.log('[Cookie Consent Plugin] Registering hooks...')

  registerHook({
    target: 'action:application.init',
    handler: function() {
      console.log('[Cookie Consent Plugin] Application initialized!')
      setTimeout(function() {
        initCookieBanner(peertubeHelpers)
      }, 1000)
    }
  })
}

function initCookieBanner(peertubeHelpers) {
  console.log('[Cookie Consent Plugin] Initializing cookie banner...')
  
  peertubeHelpers.getSettings().then(function(settings) {
    console.log('[Cookie Consent Plugin] Settings loaded:', settings)
    
    if (!settings || !settings.enableConsentBanner) {
      console.log('[Cookie Consent Plugin] Banner disabled in settings')
      return
    }

    // Проверяем согласие
    const categories = getConsentCategories()
    if (categories) {
      console.log('[Cookie Consent Plugin] Consent already given:', categories)
      applyConsent(settings)
      addManageButton(settings)
      return
    }

    // Создаем баннер с настройками
    console.log('[Cookie Consent Plugin] Creating banner...')
    
    // Добавляем CSS если есть
    if (settings.customCss) {
      injectCss(settings.customCss)
    }
    
    const bannerBgColor = settings.bannerBackgroundColor || '#000000'
    const bannerTextColor = settings.bannerTextColor || '#ffffff'
    
    const wrapper = document.createElement('div')
    wrapper.className = 'cookie-banner'
    wrapper.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      background: ${bannerBgColor};
      color: ${bannerTextColor};
      padding: 1.5em;
      text-align: center;
      z-index: 9999;
      font-family: Arial, sans-serif;
      box-shadow: 0 -4px 16px rgba(0,0,0,0.3);
    `

    const content = createElementFromMarkdown(settings.bannerMarkdown || 'Ta witryna korzysta z plików cookie.')
    content.style.cssText = 'margin-bottom: 15px; line-height: 1.4; font-size: 15px;'

    const btnAcceptAll = createStyledButton(
      'Akceptuj wszystkie',
      settings.buttonAcceptColor || '#28a745',
      function() {
        const allCategories = { funktional: true, statistik: true, marketing: true }
        setConsentCategories(allCategories, 180)
        wrapper.remove()
        applyConsent(settings)
        addManageButton(settings)
      }
    )

    const btnEssenzielle = createStyledButton(
      'Tylko niezbędne pliki cookie',
      settings.buttonEssentialColor || '#6c757d',
      function() {
        const essentialOnly = { funktional: true, statistik: false, marketing: false }
        setConsentCategories(essentialOnly, 180)
        wrapper.remove()
        addManageButton(settings)
      }
    )

    const btnSettings = createStyledButton(
      'Ustawienia',
      settings.buttonSettingsColor || '#007bff',
      function() { showCookieSettings(settings) }
    )

    wrapper.appendChild(content)
    wrapper.appendChild(btnAcceptAll)
    wrapper.appendChild(btnEssenzielle)
    wrapper.appendChild(btnSettings)
    
    document.body.appendChild(wrapper)
    
    console.log('[Cookie Consent Plugin] Banner displayed successfully!')
    
  }).catch(function(error) {
    console.error('[Cookie Consent Plugin] Error loading settings:', error)
  })
}

// ES6 экспорт для PeerTube 7.2.2
export { register }