<template>
  <div class="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-background dark:bg-dark-background">
    <div class="max-w-md w-full space-y-6">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-dark-primary/10 rounded-2xl flex items-center justify-center">
          <BookOpenIcon class="h-8 w-8 text-primary dark:text-dark-primary" />
        </div>
        <h2 class="text-2xl font-bold text-text dark:text-dark-text">
          {{ t('auth.welcomeBack') }}
        </h2>
        <p class="mt-2 text-sm text-secondary-text dark:text-dark-text">
          {{ t('auth.signInToContinue') }}
        </p>
      </div>
      <LoginForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LoginForm from '~/components/auth/LoginForm.vue'
import { BookOpenIcon } from '@heroicons/vue/24/outline'

const { t } = useI18n()

definePageMeta({
  layout: 'default'
})
</script> 