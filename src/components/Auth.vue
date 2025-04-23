<template>
  <div id="telegram-login-container"></div>
</template>

<script setup>
import { onMounted } from 'vue'

const authPath = '/home'

onMounted(() => {
  window.onTelegramAuth = user => {
    console.log('Авторизован:', user)
  }

  if (!document.getElementById('telegram-login-script')) {
    const script = document.createElement('script')
    script.id = 'telegram-login-script'
    script.async = true
    script.src = 'https://telegram.org/js/telegram-widget.js?22'
    script.setAttribute('data-telegram-login', 'TeaPandaTestBot')
    script.setAttribute('data-size', 'large')
    script.setAttribute('data-auth-url', `${authPath}`)
    script.setAttribute('data-request-access', 'write')
    document.getElementById('telegram-login-container').appendChild(script)
  }
})
</script>
