export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
  
    return response.json() as Promise<T>
  }