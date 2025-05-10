import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    isLoading: false,
    error: null
  }),

  actions: {
    async checkAuth() {
      try {
        this.isLoading = true
        this.error = null
        
        const api = useApi()
        await api.get('/users/me')
        this.isAuthenticated = true
        return true
      } catch (err) {
        this.isAuthenticated = false
        return false
      } finally {
        this.isLoading = false
      }
    },

    async login(email: string, password: string) {
      try {
        this.isLoading = true
        this.error = null
        
        const api = useApi()
        await api.post('/login_check', { email, password })
        
        const isAuth = await this.checkAuth()
        if (isAuth) {
          this.error = null
          return true
        } else {
          this.error = 'Login failed. Please check your credentials.'
          return false
        }
      } catch (err) {
        this.error = 'Login failed. Please check your credentials.'
        this.isAuthenticated = false
        return false
      } finally {
        this.isLoading = false
      }
    },

    async register(email: string, password: string, name: string) {
      try {
        this.isLoading = true
        this.error = null
        
        const api = useApi()
        await api.post('/register', { email, password, name })
        this.isAuthenticated = true
        return true
      } catch (err) {
        this.error = 'Registration failed. Please try again.'
        return false
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      try {
        this.isLoading = true
        this.error = null
        
        const api = useApi()
        await api.post('/logout')
        
        // Clear auth state
        this.isAuthenticated = false
        this.error = null
        return true
      } catch (err) {
        this.error = 'Logout failed. Please try again.'
        this.isAuthenticated = false
        return false
      } finally {
        this.isLoading = false
      }
    }
  }
})
