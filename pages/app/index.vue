<template>
    <div>
      <!-- This page will redirect to dashboard -->
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth',
  redirect: '/app/dashboard'
})
</script> 