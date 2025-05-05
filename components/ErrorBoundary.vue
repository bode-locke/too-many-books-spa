<template>
  <div v-if="error" class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div class="text-center">
        <svg
          class="mx-auto h-12 w-12 text-red-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Something went wrong
        </h2>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {{ error.message }}
        </p>
      </div>
      <div class="mt-8 space-y-6">
        <button
          @click="resetError"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Try again
        </button>
        <button
          @click="goHome"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Go to home page
        </button>
      </div>
    </div>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import type { AppError } from '~/types'

const error = ref<AppError | null>(null)

const resetError = () => {
  error.value = null
}

const goHome = () => {
  navigateTo('/')
}

onErrorCaptured((err) => {
  error.value = {
    code: 'COMPONENT_ERROR',
    message: err instanceof Error ? err.message : 'An unexpected error occurred',
    timestamp: Date.now()
  }
  return false
})
</script> 