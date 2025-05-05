<template>
  <ErrorBoundary>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ErrorBoundary>
</template>

<script setup lang="ts">
// Initialize app store
const appStore = useAppStore()
onMounted(() => {
  appStore.initialize()
})
</script>
