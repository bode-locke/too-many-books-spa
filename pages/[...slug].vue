<template>
  <div class="min-h-screen bg-background dark:bg-dark-background flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <!-- Decorative Background -->
      <div class="absolute inset-0 bg-[url('/images/bookshelf-bg.svg')] opacity-5 dark:opacity-10"></div>
      
      <!-- Content -->
      <div class="relative z-10">
        <!-- Error Number -->
        <div class="text-9xl font-bold text-primary dark:text-dark-primary opacity-20">
          {{ error.statusCode }}
        </div>
        
        <!-- Message -->
        <div class="mt-4 space-y-4">
          <h1 class="text-3xl font-bold text-text dark:text-dark-text">
            {{ $t('error.title') }}
          </h1>
          <p class="text-lg text-text/70 dark:text-dark-text/70">
            {{ $t('error.description') }}
          </p>
        </div>
        
        <!-- Action Buttons -->
        <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center px-6 py-3 rounded-xl text-base font-medium text-white bg-primary dark:bg-dark-primary hover:bg-primary-light dark:hover:bg-dark-primary-light transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {{ $t('error.goHome') }}
          </NuxtLink>
          <button
            @click="goBack"
            class="inline-flex items-center justify-center px-6 py-3 rounded-xl text-base font-medium text-text dark:text-dark-text bg-background-light dark:bg-dark-background-light hover:bg-background dark:hover:bg-dark-background transition-all duration-300 border border-secondary/20 dark:border-dark-secondary/20"
          >
            {{ $t('error.goBack') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'

const router = useRouter()

const error = {
  statusCode: 404,
  message: 'Page not found'
}

const goBack = () => {
  router.back()
}

// Prevent Nuxt from showing its default 404 page
definePageMeta({
  layout: 'default',
  name: 'error'
})

// Set the error status code
useHead({
  title: 'Page Not Found',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})
</script> 