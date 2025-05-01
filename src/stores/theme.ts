import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref<boolean>(localStorage.getItem('theme') === 'mytheme-dark')
  const theme = computed(() => (isDark.value ? 'mytheme-dark' : 'mytheme'))

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'mytheme-dark' : 'mytheme')
  }

  const initializeTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  initializeTheme()

  return { isDark, theme, toggleTheme, initializeTheme }
})