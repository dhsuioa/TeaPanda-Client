import apiClient from './apiClient'
import type { Tea } from '../types/tea'

interface TeasResponse {
  items: Tea[]
  total: number
}

export const teaService = {
  async getTeas(page: number, limit: number): Promise<TeasResponse> {
    const response = await apiClient.get<TeasResponse>('/api/v1/teas', {
      params: { page, limit },
    })
    return response.data
  },

  async evaluateTea(teaId: string, rating: number): Promise<void> {
    await apiClient.post(`/api/v1/teas/${teaId}/evaluate`, { rating })
  },

  async getTeaById(id: string): Promise<Tea> {
    const response = await apiClient.get<Tea>(`/api/v1/teas/${id}`)
    return response.data
  },
}