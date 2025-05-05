import { defineStore } from 'pinia'
import type { AppError } from '~/types'
import { onUnmounted } from 'vue'

interface AppState {
  isLoading: boolean
  error: AppError | null
  sidebarOpen: boolean
  isMobile: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    isLoading: false,
    error: null,
    sidebarOpen: false,
    isMobile: false
  }),

  actions: {
    setLoading(loading: boolean) {
      this.isLoading = loading
    },

    setError(error: AppError | null) {
      this.error = error
    },

    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },

    setSidebarOpen(open: boolean) {
      this.sidebarOpen = open
    },

    setMobile(isMobile: boolean) {
      this.isMobile = isMobile
      // Close sidebar by default on mobile
      if (isMobile) {
        this.sidebarOpen = false
      }
    },

    initialize() {
      if (import.meta.client) {
        // Initialize sidebar state based on screen size
        const checkMobile = () => {
          this.setMobile(window.innerWidth < 768)
        }
        
        // Initial check
        checkMobile()
        
        // Add resize listener
        window.addEventListener('resize', checkMobile)
        
        // Cleanup on unmount
        onUnmounted(() => {
          window.removeEventListener('resize', checkMobile)
        })
      }
    }
  }
}) 