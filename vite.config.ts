import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const ngrokUrl = env.VITE_NGROK_URL
  const apiBaseUrlForDevProxy = env.VITE_API_BASE_URL_DEV

  let allowedHostsArray: string[] = [ngrokUrl]
  if (ngrokUrl) {
    try {
      const ngrokHostname = new URL(ngrokUrl).hostname
      allowedHostsArray.push(ngrokHostname)
    } catch (e) {
      console.warn(`Invalid VITE_NGROK_URL: ${ngrokUrl}. It will not be added to allowedHosts.`)
    }
  }

  return {
    plugins: [
      vue(),
      tailwindcss(),
    ],
    server: {
      allowedHosts: allowedHostsArray,
      proxy: {
        '/api': {
          target: apiBaseUrlForDevProxy,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})