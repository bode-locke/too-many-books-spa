import { defineNuxtRouteMiddleware } from '#app'
import { useAuthStore } from '~/stores/auth'

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/books'
]

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()
  
  // Skip middleware for public routes
  if (publicRoutes.includes(to.path) || to.path.startsWith('/books/')) {
    // If user is authenticated and trying to access auth routes, redirect to dashboard
    if (authStore.isAuthenticated && to.path.startsWith('/auth/')) {
      return '/app/dashboard'
    }
    return
  }

  // For protected routes (/app/*)
  if (to.path.startsWith('/app/')) {
    // Always check auth for protected routes
    const isAuthenticated = await authStore.checkAuth()
    if (!isAuthenticated) {
      return '/auth/login'
    }
  }
}) 