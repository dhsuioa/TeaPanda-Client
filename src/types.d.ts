declare global {
    interface Window {
      Telegram: {
        WebApp: any
      }
      onTelegramAuth: (user: Record<string, any>) => void
    }
  }
  
  export {}