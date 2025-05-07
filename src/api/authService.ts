import apiClient from './apiClient'

interface TelegramUserAuthData {
  id: number
  first_name: string
  username: string
  photo_url: string
  auth_date: number
  hash: string
}

interface MiniAppAuthData {
  initData: string
}

type AuthPayload = TelegramUserAuthData | MiniAppAuthData

interface AuthResponse {
  token: string
}

export const authService = {
  async authenticate(data: AuthPayload): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/api/v1/auth', data)
    return response.data
  },
}