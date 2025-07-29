// PeerTube Cookie Consent Plugin - Client Script (ES6 Module)
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
    maxAge: (days || 180) * 24 * 60 * 60, // в секундах
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
    console.error('[Cookie Consent Plugin] Fehler beim Parsen von Skripten:', e)
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

function showCookieSettings() {
  const existing = document.getElementById('cookie-settings-modal')
  if (existing) existing.remove()

  const overlay = document.createElement('div')
  overlay.id = 'cookie-settings-modal'
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:99999;display:flex;align-items:center;justify-content:center;'

  const modal = document.createElement('div')
  modal.style.cssText = 'background:#fff;padding:2em;border-radius:6px;max-width:400px;text-align:left;font-family:sans-serif;color:#000;'

  const currentPrefs = getConsentCategories() || { funktional: true, statistik: false, marketing: false }

  modal.innerHTML = '<h2 style="color:#000;margin-top:0;">Cookie-Einstellungen</h2>' +
    '<form id="cookie-categories-form">' +
    '<label style="display:block;margin:10px 0;"><input type="checkbox" name="funktional" ' + (currentPrefs.funktional ? 'checked' : '') + '> Funktionalität</label>' +
    '<label style="display:block;margin:10px 0;"><input type="checkbox" name="statistik" ' + (currentPrefs.statistik ? 'checked' : '') + '> Statistik</label>' +
    '<label style="display:block;margin:10px 0;"><input type="checkbox" name="marketing" ' + (currentPrefs.marketing ? 'checked' : '') + '> Marketing</label>' +
    '<br>' +
    '<button type="submit" style="margin-right:10px;padding:10px 20px;">Speichern</button>' +
    '<button type="button" id="cancelCookieSettings" style="padding:10px 20px;">Abbrechen</button>' +
    '</form>'

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
    
    // Используем universal-cookie - автоматически конвертирует в JSON
    setConsentCategories(prefs, 180)
    
    overlay.remove()
    location.reload()
  }
}

function addManageButton() {
  // Проверяем что кнопка еще не добавлена
  if (document.getElementById('cookie-manage-btn')) return
  
  const manageBtn = document.createElement('button')
  manageBtn.id = 'cookie-manage-btn'
  manageBtn.textContent = 'Cookie-Einstellungen verwalten'
  manageBtn.style.cssText = 'position:fixed;bottom:10px;right:10px;font-size:0.8em;z-index:9999;background:#007bff;color:white;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;'
  manageBtn.onclick = showCookieSettings
  document.body.appendChild(manageBtn)
}

// Основная функция регистрации плагина - СОВРЕМЕННЫЙ СИНТАКСИС
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

    // Проверяем согласие с помощью universal-cookie
    const categories = getConsentCategories()
    if (categories) {
      console.log('[Cookie Consent Plugin] Consent already given:', categories)
      applyConsent(settings)
      addManageButton()
      return
    }

    // Создаем баннер
    console.log('[Cookie Consent Plugin] Creating banner...')
    
    // Добавляем CSS если есть
    if (settings.customCss) {
      injectCss(settings.customCss)
    }
    
    const wrapper = document.createElement('div')
    wrapper.className = 'cookie-banner'
    wrapper.style.cssText = 'position:fixed;bottom:0;left:0;width:100%;background:#000;color:#fff;padding:1em;text-align:center;z-index:9999;font-family:Arial,sans-serif;'

    const content = createElementFromMarkdown(settings.bannerMarkdown || 'Diese Website verwendet Cookies.')
    content.style.marginBottom = '10px'

    const btnAcceptAll = document.createElement('button')
    btnAcceptAll.textContent = 'Alle akzeptieren'
    btnAcceptAll.style.cssText = 'margin:0.5em;padding:8px 16px;background:#28a745;color:white;border:none;border-radius:4px;cursor:pointer;'
    btnAcceptAll.onclick = function() {
      const allCategories = { funktional: true, statistik: true, marketing: true }
      setConsentCategories(allCategories, 180)
      wrapper.remove()
      applyConsent(settings)
      addManageButton()
    }

    const btnEssenzielle = document.createElement('button')
    btnEssenzielle.textContent = 'Nur essentielle Cookies'
    btnEssenzielle.style.cssText = 'margin:0.5em;padding:8px 16px;background:#6c757d;color:white;border:none;border-radius:4px;cursor:pointer;'
    btnEssenzielle.onclick = function() {
      const essentialOnly = { funktional: true, statistik: false, marketing: false }
      setConsentCategories(essentialOnly, 180)
      wrapper.remove()
      addManageButton()
    }

    const btnSettings = document.createElement('button')
    btnSettings.textContent = 'Einstellungen'
    btnSettings.style.cssText = 'margin:0.5em;padding:8px 16px;background:#007bff;color:white;border:none;border-radius:4px;cursor:pointer;'
    btnSettings.onclick = showCookieSettings

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

// КРИТИЧЕСКИ ВАЖНО: Современный ES6 экспорт для PeerTube 7.2.2
export { register }