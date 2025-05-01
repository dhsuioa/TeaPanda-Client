import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch } from '../utils/api'

interface TelegramUser {
  id: number
  first_name: string
  username: string
  photo_url: string
  auth_date: number
  hash: string
}

export function useTelegramAuth() {
  const isTelegramMiniApp = ref(false)
  const router = useRouter()
  let isAuthenticating = false

  const checkTelegramMiniApp = () => {
    const hasWebApp = !!window.Telegram?.WebApp
    const hasInitData = !!window.Telegram?.WebApp?.initData
    isTelegramMiniApp.value = hasWebApp && hasInitData
    console.log('isTelegramMiniApp:', isTelegramMiniApp.value)
  }

  const createDataCheckString = (data: Record<string, any>) => {
    const entries = Object.entries(data)
      .filter(([key]) => key !== 'hash')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
    return entries.join('\n')
  }

  const authenticate = async (authData: TelegramUser | { initData: string }) => {
    if (isAuthenticating) {
      console.log('Authentication already in progress, skipping')
      return
    }
    isAuthenticating = true
    console.log('Sending auth data:', JSON.stringify(authData, null, 2))
    if ('id' in authData) {
      console.log('Data check string (web):', createDataCheckString(authData))
    }
    try {
      const result = await apiFetch<{ token: string }>(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth`,
        {
          method: 'POST',
          body: JSON.stringify(authData),
        }
      )
      localStorage.setItem('jwt', result.token)
      router.push('/home')
    } catch (err: any) {
      console.error('Auth error:', err.message)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(authData),
        })
        const errorBody = await response.json()
        console.log('Server error response:', JSON.stringify(errorBody, null, 2))
      } catch (fetchErr) {
        console.error('Failed to fetch error body:', fetchErr)
      }
      alert('Ошибка авторизации')
    } finally {
      isAuthenticating = false
    }
  }

  const onTelegramAuth = (user: TelegramUser) => {
    console.log('Web auth data:', JSON.stringify(user, null, 2))
    authenticate(user)
  }

  const initMiniAppAuth = () => {
    if (isTelegramMiniApp.value && !isAuthenticating) {
      const initData = window.Telegram.WebApp.initData
      console.log('Raw initData:', initData)
      const params = new URLSearchParams(initData)
      console.log('Parsed initData params:', Array.from(params.entries()))
      // Логируем data-check-string из initData
      const initDataCheckString = createDataCheckString(Object.fromEntries(params))
      console.log('initData check string:', initDataCheckString)
      const user = JSON.parse(params.get('user') || '{}')
      console.log('Parsed user object:', JSON.stringify(user, null, 2))
      const authData = { initData }
      console.log('Mini Apps hash:', params.get('hash'))
      console.log('Mini Apps signature:', params.get('signature'))
      authenticate(authData)
    }
  }

  onMounted(() => {
    const webAppScript = document.createElement('script')
    webAppScript.src = 'https://telegram.org/js/telegram-web-app.js'
    webAppScript.async = true
    webAppScript.onload = () => {
      checkTelegramMiniApp()
      if (isTelegramMiniApp.value) {
        initMiniAppAuth()
      } else {
        const widgetScript = document.createElement('script')
        widgetScript.src = 'https://telegram.org/js/telegram-widget.js?22'
        widgetScript.async = true
        widgetScript.setAttribute('data-telegram-login', 'TeaPandaTestBot')
        widgetScript.setAttribute('data-size', 'large')
        widgetScript.setAttribute('data-onauth', 'onTelegramAuth(user)')
        widgetScript.setAttribute('data-request-access', 'write')
        document.getElementById('tg-login')?.appendChild(widgetScript)
        window.onTelegramAuth = onTelegramAuth as (user: Record<string, any>) => void
      }
    }
    document.head.appendChild(webAppScript)
  })

  return { isTelegramMiniApp }
}