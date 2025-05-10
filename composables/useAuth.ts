import { useAuthStore } from '~/stores/auth'
import { computed } from 'vue'

export const useAuth = () => {
  const store = useAuthStore()
  
  return {
    isAuthenticated: computed(() => store.isAuthenticated),
    isLoading: computed(() => store.isLoading),
    error: computed(() => store.error),
    checkAuth: store.checkAuth,
    login: store.login,
    register: store.register,
    logout: store.logout
  }
} 