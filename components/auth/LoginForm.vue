<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="rounded-md shadow-sm space-y-2">
      <div>
        <label for="email" class="sr-only">{{ t('auth.email') }}</label>
        <input
          id="email"
          v-model="form.email"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="appearance-none relative block w-full px-3 py-2 border border-secondary dark:border-dark-secondary placeholder-secondary-text dark:placeholder-dark-text text-text dark:text-dark-text rounded-md focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary focus:z-10 sm:text-sm bg-background-light dark:bg-dark-background-light"
          :placeholder="t('auth.email')"
        />
      </div>
      <div>
        <label for="password" class="sr-only">{{ t('auth.password') }}</label>
        <input
          id="password"
          v-model="form.password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          class="appearance-none relative block w-full px-3 py-2 border border-secondary dark:border-dark-secondary placeholder-secondary-text dark:placeholder-dark-text text-text dark:text-dark-text rounded-md focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary focus:z-10 sm:text-sm bg-background-light dark:bg-dark-background-light"
          :placeholder="t('auth.password')"
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        :disabled="isLoading"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary dark:bg-dark-primary hover:bg-primary-dark dark:hover:bg-dark-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <ArrowRightStartOnRectangleIcon class="h-5 w-5 text-white group-hover:text-white/80" aria-hidden="true" />
        </span>
        {{ isLoading ? t('auth.loggingIn') : t('auth.login') }}
      </button>
    </div>

    <div class="text-center">
      <p class="text-sm text-secondary-text dark:text-dark-text">
        {{ t('auth.noAccount') }}
        <NuxtLink
          to="/auth/register"
          class="font-medium text-primary dark:text-dark-primary hover:text-primary/80 dark:hover:text-dark-primary/80"
        >
          {{ t('auth.register') }}
        </NuxtLink>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~/stores/auth'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/solid'

const { t } = useI18n()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)

const handleSubmit = async () => {
  try {
    isLoading.value = true
    await authStore.login(form.value.email, form.value.password)
    navigateTo('/app/dashboard')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    isLoading.value = false
  }
}
</script> 