import { ref } from 'vue'
import type { AppError } from '~/types'

export const useErrorHandler = () => {
  const error = ref<AppError | null>(null)

  const handleError = (err: unknown, context?: string): AppError => {
    let errorMessage = 'An unexpected error occurred'
    let errorCode = 'UNKNOWN_ERROR'

    if (err instanceof Error) {
      errorMessage = err.message
      errorCode = 'ERROR'
    } else if (typeof err === 'string') {
      errorMessage = err
      errorCode = 'ERROR'
    }

    const appError: AppError = {
      code: errorCode,
      message: context ? `${context}: ${errorMessage}` : errorMessage,
      timestamp: Date.now()
    }

    error.value = appError
    return appError
  }

  const clearError = () => {
    error.value = null
  }

  const isError = (code?: string) => {
    if (!error.value) return false
    return code ? error.value.code === code : true
  }

  return {
    error,
    handleError,
    clearError,
    isError
  }
} 