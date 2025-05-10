<template>
  <div>
    <slot v-if="!error" />
    <div v-else class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-text dark:text-dark-text">
            {{ t('error.title') }}
          </h2>
          <p class="mt-2 text-center text-sm text-secondary-text dark:text-dark-text">
            {{ t('error.message') }}
          </p>
        </div>
        <div class="mt-8 space-y-6">
          <button
            @click="handleRetry"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary dark:bg-dark-primary hover:bg-primary-dark dark:hover:bg-dark-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary"
          >
            {{ t('error.retry') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const error = ref<Error | null>(null)

onErrorCaptured((err) => {
  error.value = err
  return false
})

const handleRetry = () => {
  error.value = null
  window.location.reload()
}
</script> 