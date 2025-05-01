import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<{ id: number; username: string } | null>(null)

  function setAuthData(authToken: string, userData: { id: number; username: string }) {
    token.value = authToken
    user.value = userData
  }

  function clearAuthData() {
    token.value = null
    user.value = null
  }

  return { token, user, setAuthData, clearAuthData }
})