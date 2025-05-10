<template>
  <ClientOnly>
    <div class="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-background dark:bg-dark-background">
      <div class="max-w-md w-full space-y-6">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-dark-primary/10 rounded-2xl flex items-center justify-center">
            <BookOpenIcon class="h-8 w-8 text-primary dark:text-dark-primary" />
          </div>
          <h2 class="text-2xl font-bold text-text dark:text-dark-text">
            {{ $t('auth.forgotPassword.title') }}
          </h2>
          <p class="mt-2 text-sm text-secondary-text dark:text-dark-text">
            {{ $t('auth.forgotPassword.subtitle') }}
          </p>
        </div>
        <form class="mt-4 space-y-3" @submit.prevent="handleSubmit">
          <div class="rounded-md shadow-sm space-y-2">
            <div>
              <label for="email" class="sr-only">{{ $t('auth.email') }}</label>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-secondary dark:border-dark-secondary placeholder-secondary-text dark:placeholder-dark-text text-text dark:text-dark-text rounded-md focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary focus:z-10 sm:text-sm bg-background-light dark:bg-dark-background-light"
                :placeholder="$t('auth.email')"
              />
            </div>
          </div>

          <div v-if="error" class="text-red-500 text-sm text-center">
            {{ error }}
          </div>
          <div v-if="success" class="text-green-500 text-sm text-center">
            {{ success }}
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary dark:bg-dark-primary hover:bg-primary-dark dark:hover:bg-dark-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <EnvelopeIcon class="h-5 w-5 text-white group-hover:text-white/80" aria-hidden="true" />
              </span>
              {{ isLoading ? $t('common.loading') : $t('auth.forgotPassword.submit') }}
            </button>
          </div>

          <div class="text-center">
            <p class="text-sm text-secondary-text dark:text-dark-text">
              {{ $t('auth.forgotPassword.backToLogin') }}
              <NuxtLink
                to="/auth/login"
                class="font-medium text-primary dark:text-dark-primary hover:text-primary/80 dark:hover:text-dark-primary/80"
              >
                {{ $t('auth.login') }}
              </NuxtLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { EnvelopeIcon, BookOpenIcon } from '@heroicons/vue/24/outline'
import { useApi } from '~/composables/useApi'

const { t } = useI18n()
const email = ref('')
const isLoading = ref(false)
const error = ref('')
const success = ref('')

const handleSubmit = async () => {
  if (isLoading.value) return

  try {
    isLoading.value = true
    error.value = ''
    success.value = ''

    const api = useApi()
    await api.post('/auth/forgot-password', { email: email.value })

    success.value = t('auth.forgotPassword.success')
    email.value = ''
  } catch (err) {
    error.value = t('auth.forgotPassword.error')
  } finally {
    isLoading.value = false
  }
}

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})
</script>