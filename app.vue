<template>
  <ErrorBoundary>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ErrorBoundary>
</template>
<!-- 
<script setup lang="ts">
// Initialize app store
const appStore = useAppStore()
onMounted(() => {
  appStore.initialize()
})
</script> -->
<script setup lang="ts">
import { useColorMode } from '#imports'
import ErrorBoundary from '~/components/layout/ErrorBoundary.vue'

// Initialize app store and color mode
const appStore = useAppStore()
const colorMode = useColorMode()

onMounted(() => {
  appStore.initialize()
  // Ensure color mode is synchronized with localStorage
  if (import.meta.client) {
    const savedTheme = localStorage.getItem('nuxt-color-mode')
    if (savedTheme) {
      colorMode.preference = savedTheme
    } else {
      colorMode.preference = 'light'
    }
  }
})
</script>