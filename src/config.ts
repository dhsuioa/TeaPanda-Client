class AppConfig {
    public readonly VITE_API_BASE_URL: string
    public readonly VITE_NGROK_URL: string
    public readonly VITE_API_BASE_URL_DEV: string
  
    constructor() {
      this.VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888'
      this.VITE_API_BASE_URL_DEV = import.meta.env.VITE_API_BASE_URL_DEV || this.VITE_API_BASE_URL
      this.VITE_NGROK_URL = import.meta.env.VITE_NGROK_URL || ''
    }
  }
  
  export const config = new AppConfig()