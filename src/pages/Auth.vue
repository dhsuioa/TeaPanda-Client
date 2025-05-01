<template>
  <div>
    <div v-if="!isTelegramMiniApp" id="tg-login"></div>
    <p>Режим: {{ isTelegramMiniApp ? 'Telegram Mini Apps' : 'Веб' }}</p>
  </div>
</template>

<script setup lang="ts">
import { useTelegramAuth } from '../composables/useTelegramAuth'

const { isTelegramMiniApp } = useTelegramAuth()
</script>