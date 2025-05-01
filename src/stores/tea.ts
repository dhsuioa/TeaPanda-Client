import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiFetch } from '../utils/api'
import type { Tea } from '../types/tea'

export const useTeaStore = defineStore('tea', () => {
  const teas = ref<Tea[]>([])
  const currentPage = ref(1)
  const pageSize = 12
  const totalTeas = ref(0)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const totalPages = computed(() => Math.ceil(totalTeas.value / pageSize))
  const hasPreviousPage = computed(() => currentPage.value > 1)
  const hasNextPage = computed(() => (currentPage.value * pageSize) < totalTeas.value)

  const fetchTeas = async () => {
    try {
      loading.value = true
      const response = await apiFetch<{ items: Tea[]; total: number }>(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/teas?page=${currentPage.value}&limit=${pageSize}`
      )
      teas.value = response.items
      totalTeas.value = response.total
    } catch (err: any) {
      error.value = 'Не удалось загрузить данные о чаях'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const setPage = (page: number) => {
    currentPage.value = page
    fetchTeas()
  }

  return { teas, currentPage, pageSize, totalTeas, totalPages, hasPreviousPage, hasNextPage, loading, error, fetchTeas, setPage }
})