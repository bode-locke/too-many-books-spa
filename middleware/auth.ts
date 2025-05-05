import { defineNuxtRouteMiddleware, navigateTo } from '#app'
import { useAuth } from '~/composables/useAuth'

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password'
]

// Define protected routes that require authentication
const protectedRoutes = [
  '/app/dashboard',
  '/app/profile',
  '/app/settings'
]

export default defineNuxtRouteMiddleware(async (to) => {
  const { isAuthenticated, checkAuth } = useAuth()
  
  // If we're on a protected route and not authenticated, check auth
  if (to.path.startsWith('/app') && !isAuthenticated.value) {
    const isAuth = await checkAuth()
    if (!isAuth) {
      return navigateTo('/auth/login')
    }
  }
  
  // If we're on an auth route and authenticated, redirect to dashboard
  if (to.path.startsWith('/auth') && isAuthenticated.value) {
    return navigateTo('/app/dashboard')
  }
}) 