import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../api/authService'

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
    isTelegramMiniApp.value = !!window.Telegram?.WebApp?.initData
    console.log('isTelegramMiniApp:', isTelegramMiniApp.value)
  }

  const createDataCheckString = (data: Record<string, any>) => {
    const entries = Object.entries(data)
      .filter(([key]) => key !== 'hash')
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
    return entries.join('\n')
  }

  const authenticateWithService = async (authData: TelegramUser | { initData: string }) => {
    if (isAuthenticating) {
      console.log('Authentication already in progress, skipping')
      return
    }
    isAuthenticating = true
    console.log('Sending auth data to service:', JSON.stringify(authData, null, 2))
    try {
      const result = await authService.authenticate(authData)
      localStorage.setItem('jwt', result.token)
      // useAuthStore().setAuthData(result.token, decodedUserData)
      router.push('/')
    } catch (err: any) {
      console.error('Auth error from service:', err.message || err)
      alert('Ошибка авторизации: ' + (err.message || 'Проверьте данные или попробуйте позже'))
    } finally {
      isAuthenticating = false
    }
  }

  const onTelegramAuth = (user: TelegramUser) => {
    console.log('Web auth data:', JSON.stringify(user, null, 2))
    authenticateWithService(user)
  }

  const initMiniAppAuth = () => {
    if (isTelegramMiniApp.value && !isAuthenticating) {
      const initData = window.Telegram.WebApp.initData
      const authData = { initData }
      console.log('Raw initData:', initData)
      const params = new URLSearchParams(initData)
      const initDataCheckString = createDataCheckString(Object.fromEntries(params))
      console.log('initData check string:', initDataCheckString)
      authenticateWithService(authData)
    }
  }

  onMounted(() => {
    const webAppScript = document.createElement('script')
    webAppScript.src = 'https://telegram.org/js/telegram-web-app.js'
    webAppScript.async = true
    webAppScript.onload = () => {
      checkTelegramMiniApp()
      if (isTelegramMiniApp.value) {
        window.Telegram.WebApp.ready()
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