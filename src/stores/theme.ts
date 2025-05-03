import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const savedTheme = localStorage.getItem('theme')
  const isDark = ref<boolean>(
    savedTheme
      ? savedTheme === 'mytheme-dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  const theme = computed(() => (isDark.value ? 'mytheme-dark' : 'mytheme'))

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'mytheme-dark' : 'mytheme')
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  const initializeTheme = () => {
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  initializeTheme()

  return { isDark, theme, toggleTheme, initializeTheme }
})