function setCookie(name, value, days) {
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  const expires = "expires=" + date.toUTCString()
  document.cookie = `${name}=${value}; ${expires}; path=/`
}

function getCookie(name) {
  const cname = name + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim()
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length)
    }
  }
  return ""
}

function injectCss(css) {
  const style = document.createElement('style')
  style.innerHTML = css
  document.head.appendChild(style)
}

function injectScripts(scripts, allowedCategories = []) {
  for (const s of scripts) {
    if (!s.category || allowedCategories.includes(s.category)) {
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

function getConsentCategories() {
  const json = getCookie('cookieConsentCategories')
  if (!json) return null
  try {
    return JSON.parse(json)
  } catch (e) {
    return null
  }
}

function applyConsent(settings) {
  const scripts = safeParse(settings.scripts)
  const categories = getConsentCategories()
  if (!categories) return

  const allowed = []
  for (const key of Object.keys(categories)) {
    if (categories[key] === true) allowed.push(key)
  }

  injectScripts(scripts, allowed)
}

function showCookieSettings() {
  const existing = document.getElementById('cookie-settings-modal')
  if (existing) existing.remove()

  const overlay = document.createElement('div')
  overlay.id = 'cookie-settings-modal'
  overlay.style = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:99999;display:flex;align-items:center;justify-content:center;'

  const modal = document.createElement('div')
  modal.style = 'background:#fff;padding:2em;border-radius:6px;max-width:400px;text-align:left;font-family:sans-serif;color:#000;'

  const currentPrefs = getConsentCategories() || { funktional: true, statistik: false, marketing: false }

  modal.innerHTML = `
    <h2 style="color:#000;margin-top:0;">Cookie-Einstellungen</h2>
    <form id="cookie-categories-form">
      <label style="display:block;margin:10px 0;"><input type="checkbox" name="funktional" ${currentPrefs.funktional ? 'checked' : ''}> Funktionalität</label>
      <label style="display:block;margin:10px 0;"><input type="checkbox" name="statistik" ${currentPrefs.statistik ? 'checked' : ''}> Statistik</label>
      <label style="display:block;margin:10px 0;"><input type="checkbox" name="marketing" ${currentPrefs.marketing ? 'checked' : ''}> Marketing</label>
      <br>
      <button type="submit" style="margin-right:10px;padding:10px 20px;">Speichern</button>
      <button type="button" id="cancelCookieSettings" style="padding:10px 20px;">Abbrechen</button>
    </form>
  `

  overlay.appendChild(modal)
  document.body.appendChild(overlay)

  document.getElementById('cancelCookieSettings').onclick = () => overlay.remove()

  document.getElementById('cookie-categories-form').onsubmit = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const prefs = {
      funktional: form.has('funktional'),
      statistik: form.has('statistik'),
      marketing: form.has('marketing')
    }
    setCookie('cookieConsentCategories', JSON.stringify(prefs), 180)
    overlay.remove()
    location.reload()
  }
}

// Правильная структура для PeerTube плагина
function register({ registerHook, peertubeHelpers }) {
  console.log('[Cookie Consent Plugin] Registering plugin...')

  // Регистрируем хук для инициализации приложения
  registerHook({
    target: 'action:application.init',
    handler: async () => {
      console.log('[Cookie Consent Plugin] Application initialized, loading settings...')
      
      try {
        const settings = await peertubeHelpers.getSettings()
        console.log('[Cookie Consent Plugin] Settings loaded:', settings)
        
        if (!settings || !settings.enableConsentBanner) {
          console.log('[Cookie Consent Plugin] Banner disabled in settings')
          return
        }

        // Проверяем, есть ли уже согласие
        const categories = getConsentCategories()
        if (categories) {
          console.log('[Cookie Consent Plugin] Consent already given, applying scripts')
          applyConsent(settings)
          
          // Добавляем кнопку управления настройками
          const manageBtn = document.createElement('button')
          manageBtn.textContent = 'Cookie-Einstellungen verwalten'
          manageBtn.style = 'position:fixed;bottom:10px;right:10px;font-size:0.8em;z-index:9999;background:#007bff;color:white;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;'
          manageBtn.onclick = showCookieSettings
          document.body.appendChild(manageBtn)
          return
        }

        // Если согласие не дано, показываем баннер
        console.log('[Cookie Consent Plugin] No consent found, showing banner')
        
        // Добавляем CSS
        if (settings.customCss) {
          injectCss(settings.customCss)
        }

        // Создаем баннер
        const wrapper = document.createElement('div')
        wrapper.className = 'cookie-banner'
        wrapper.style.cssText = `
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
        `

        const content = createElementFromMarkdown(settings.bannerMarkdown || 'Diese Website verwendet Cookies.')
        content.style.marginBottom = '10px'

        const btnAcceptAll = document.createElement('button')
        btnAcceptAll.textContent = 'Alle akzeptieren'
        btnAcceptAll.style.cssText = 'margin: 0.5em; padding: 8px 16px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;'
        btnAcceptAll.onclick = () => {
          const allCategories = { funktional: true, statistik: true, marketing: true }
          setCookie('cookieConsentCategories', JSON.stringify(allCategories), 180)
          wrapper.remove()
          applyConsent(settings)
          
          // Добавляем кнопку управления
          const manageBtn = document.createElement('button')
          manageBtn.textContent = 'Cookie-Einstellungen verwalten'
          manageBtn.style = 'position:fixed;bottom:10px;right:10px;font-size:0.8em;z-index:9999;background:#007bff;color:white;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;'
          manageBtn.onclick = showCookieSettings
          document.body.appendChild(manageBtn)
        }

        const btnEssenzielle = document.createElement('button')
        btnEssenzielle.textContent = 'Nur essentielle Cookies'
        btnEssenzielle.style.cssText = 'margin: 0.5em; padding: 8px 16px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;'
        btnEssenzielle.onclick = () => {
          const essentialOnly = { funktional: true, statistik: false, marketing: false }
          setCookie('cookieConsentCategories', JSON.stringify(essentialOnly), 180)
          wrapper.remove()
          
          // Добавляем кнопку управления
          const manageBtn = document.createElement('button')
          manageBtn.textContent = 'Cookie-Einstellungen verwalten'
          manageBtn.style = 'position:fixed;bottom:10px;right:10px;font-size:0.8em;z-index:9999;background:#007bff;color:white;border:none;padding:8px 12px;border-radius:4px;cursor:pointer;'
          manageBtn.onclick = showCookieSettings
          document.body.appendChild(manageBtn)
        }

        const btnSettings = document.createElement('button')
        btnSettings.textContent = 'Einstellungen'
        btnSettings.style.cssText = 'margin: 0.5em; padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;'
        btnSettings.onclick = showCookieSettings

        wrapper.appendChild(content)
        wrapper.appendChild(btnAcceptAll)
        wrapper.appendChild(btnEssenzielle)
        wrapper.appendChild(btnSettings)
        
        document.body.appendChild(wrapper)
        
        console.log('[Cookie Consent Plugin] Banner displayed successfully')
        
      } catch (error) {
        console.error('[Cookie Consent Plugin] Error during initialization:', error)
      }
    }
  })
}

// КРИТИЧЕСКИ ВАЖНО: правильный экспорт для PeerTube
// PeerTube ожидает объект с функцией register
const pluginExports = { register }

// Для CommonJS (Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = pluginExports
}

// Для браузера - устанавливаем глобальную переменную
if (typeof window !== 'undefined') {
  window.register = register
}

// Для AMD/UMD
if (typeof define === 'function' && define.amd) {
  define(function() { return pluginExports })
}