<template>
  <div>
    <!-- This page will redirect to dashboard -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth',
  // colorMode: 'light'
})


// Redirect to dashboard
onMounted(() => {
  navigateTo('/app/dashboard')
})
</script> 