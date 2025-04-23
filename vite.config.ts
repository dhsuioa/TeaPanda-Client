import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const ngrokUrl = env.VITE_NGROK_URL

  return {
    plugins: [
      vue(),
      tailwindcss()
    ],
    server: {
      allowedHosts: [`https://${ngrokUrl}`, ngrokUrl],
    },
  }
})
