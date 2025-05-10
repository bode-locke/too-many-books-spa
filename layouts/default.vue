<template>
  <div class="min-h-screen bg-background dark:bg-dark-background text-text dark:text-dark-text flex flex-col">
    <AppHeader />
    <main class="flex-1 pt-16">
      <slot />
    </main>
    <div class="mt-8">
      <AppFooter />
    </div>
    <div v-if="pending" class="fixed inset-0 flex items-center justify-center bg-background/50 dark:bg-dark-background/50 z-50">
      <div class="w-16 h-16 border-4 border-primary dark:border-dark-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/layout/AppHeader.vue'
import AppFooter from '~/components/layout/AppFooter.vue'
const { pending } = useNuxtApp()

</script> 