import { useRuntimeConfig } from '#app'
import { useErrorHandler } from '~/composables/useErrorHandler'
import { useAuthStore } from '~/stores/auth'

interface ApiOptions {
  method?: string
  headers?: Record<string, string>
  body?: unknown
  params?: Record<string, string>
}

export const useApi = () => {
  const config = useRuntimeConfig()
  const { handleError } = useErrorHandler()
  const authStore = useAuthStore()

  const getHeaders = (): Record<string, string> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }

    // Add cookies to headers for server-side requests
    if (import.meta.server) {
      const cookies = useRequestHeaders(['cookie'])
      if (cookies.cookie) {
        headers.cookie = cookies.cookie
      }
    }

    return headers
  }

  const buildUrl = (endpoint: string, params?: Record<string, string>): string => {
    let url: string

    if (endpoint.startsWith('http')) {
      url = endpoint
    } else {
      const baseUrl = config.public.apiBase
      const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
      const normalizedEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
      url = `${normalizedBaseUrl}${normalizedEndpoint}`
    }

    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, value)
      })
      url = `${url}?${searchParams.toString()}`
    }

    return url
  }

  const request = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    try {
      const { method = 'GET', headers = {}, body, params } = options
      const url = buildUrl(endpoint, params)

      const response = await fetch(url, {
        method,
        headers: {
          ...getHeaders(),
          ...headers
        },
        body: body ? JSON.stringify(body) : undefined,
        credentials: 'include',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      })

      // If we get a 401, clear auth state and throw
      if (response.status === 401) {
        authStore.isAuthenticated = false
        throw new Error('Unauthorized')
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Request failed with status ${response.status}`)
      }

      if (response.status === 204) {
        return {} as T
      }

      return await response.json()
    } catch (err) {
      throw handleError(err, 'API Request failed')
    }
  }

  return {
    get: <T>(endpoint: string, params?: Record<string, string>) => 
      request<T>(endpoint, { method: 'GET', params }),
    
    post: <T>(endpoint: string, body?: unknown) => 
      request<T>(endpoint, { method: 'POST', body }),
    
    put: <T>(endpoint: string, body?: unknown) => 
      request<T>(endpoint, { method: 'PUT', body }),
    
    patch: <T>(endpoint: string, body?: unknown) => 
      request<T>(endpoint, { method: 'PATCH', body }),
    
    delete: <T>(endpoint: string) => 
      request<T>(endpoint, { method: 'DELETE' })
  }
} 