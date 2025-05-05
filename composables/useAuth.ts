import { ref } from 'vue'
import { useApi } from './useApi'
import { useRouter } from 'vue-router'

export const useAuth = () => {
  const api = useApi()
  const router = useRouter()
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const login = async (email: string, password: string) => {
    try {
      console.log('Starting login process...')
      isLoading.value = true
      error.value = null
      
      // Make the login request to Symfony's login_check endpoint
      // Symfony will set the JWT token in an HttpOnly cookie
      await api.post('/login_check', {
        email: email,
        password: password
      })

      // Set authenticated state to true after successful login
      isAuthenticated.value = true
      
      // Redirect to dashboard after successful login
      await router.push('/app/dashboard')
      
      return true
    } catch (err) {
      console.error('Login error:', err)
      error.value = err instanceof Error ? err.message : 'Login failed'
      isAuthenticated.value = false
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      console.log('Starting logout process...')
      isLoading.value = true
      error.value = null
      
      // Make the logout request to Symfony's logout endpoint
      // Symfony will clear the JWT cookie
      await api.post('/logout')
      isAuthenticated.value = false
      
      // Redirect to home page after successful logout
      await router.push('/')
      
      return true
    } catch (err) {
      console.error('Logout error:', err)
      error.value = err instanceof Error ? err.message : 'Logout failed'
      return false
    } finally {
      isLoading.value = false
    }
  }

  const checkAuth = async () => {
    try {
      console.log('Checking authentication status...')
      isLoading.value = true
      error.value = null
      
      // Check if the user is authenticated by making a request to a protected endpoint
      // The JWT token will be automatically sent in the cookie
      await api.get('/users/me')
      isAuthenticated.value = true
      
      return true
    } catch (err) {
      console.error('Auth check error:', err)
      isAuthenticated.value = false
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Initialize auth state
  const init = async () => {
    // Only check auth if we're on a protected route and not already authenticated
    const currentPath = router.currentRoute.value.path
    if (currentPath.startsWith('/app') && !isAuthenticated.value) {
      await checkAuth()
    }
  }

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
    init
  }
} 