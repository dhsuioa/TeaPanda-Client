import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { teaService } from '../api/teaService'
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
  const hasNextPage = computed(() => currentPage.value * pageSize < totalTeas.value)

  const fetchTeas = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await teaService.getTeas(currentPage.value, pageSize)
      teas.value = response.items
      totalTeas.value = response.total
    } catch (err: any) {
      error.value = err.message || 'Не удалось загрузить данные о чаях'
      console.error('Fetch teas error:', err)
    } finally {
      loading.value = false
    }
  }

  const setPage = (page: number) => {
    if (page > 0 && page <= totalPages.value) {
        currentPage.value = page
        fetchTeas()
    }
  }

  const rateTea = async (teaId: string, ratingValue: number) => {
    try {
      await teaService.evaluateTea(teaId, ratingValue)
      const teaToUpdate = teas.value.find(t => t.id === teaId)
      if (teaToUpdate) {
        teaToUpdate.rating = ratingValue
      }
      await fetchTeas()
    } catch (err: any) {
      console.error('Error rating tea:', err)
      alert('Не удалось обновить рейтинг: ' + (err.message || 'Ошибка сервера'))
      throw err
    }
  }

  return {
    teas,
    currentPage,
    pageSize,
    totalTeas,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    loading,
    error,
    fetchTeas,
    setPage,
    rateTea,
  }
})