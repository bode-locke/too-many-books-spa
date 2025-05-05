<template>
  <div class="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-background dark:bg-dark-background">
    <div class="max-w-md w-full space-y-6">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-dark-primary/10 rounded-2xl flex items-center justify-center">
          <BookOpenIcon class="h-8 w-8 text-primary dark:text-dark-primary" />
        </div>
        <h2 class="text-2xl font-bold text-text dark:text-dark-text">
          {{ $t('auth.login') }}
        </h2>
        <p class="mt-2 text-sm text-secondary-text dark:text-dark-text">
          {{ $t('auth.welcomeBack') }}
        </p>
      </div>
      <form class="mt-4 space-y-3" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-2">
          <div>
            <label for="email" class="sr-only">{{ $t('auth.email') }}</label>
            <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-secondary dark:border-dark-secondary placeholder-secondary-text dark:placeholder-dark-text text-text dark:text-dark-text rounded-md focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary focus:z-10 sm:text-sm bg-background-light dark:bg-dark-background-light"
              :placeholder="$t('auth.email')"
            />
          </div>
          <div>
            <label for="password" class="sr-only">{{ $t('auth.password') }}</label>
            <div class="flex items-center">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                autocomplete="current-password"
                required
                class="appearance-none relative block w-full px-3 py-2 border border-secondary dark:border-dark-secondary placeholder-secondary-text dark:placeholder-dark-text text-text dark:text-dark-text rounded-r-none rounded-l-md focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary focus:z-10 sm:text-sm bg-background-light dark:bg-dark-background-light"
                :placeholder="$t('auth.password')"
              />
              <button
                type="button"
                class="h-[38px] px-3 border border-l-0 border-secondary dark:border-dark-secondary rounded-r-md bg-background-light dark:bg-dark-background-light hover:bg-secondary/10 dark:hover:bg-dark-secondary/10 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                @click="showPassword = !showPassword"
                tabindex="-1"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5 text-secondary-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary" />
                <EyeSlashIcon v-else class="h-5 w-5 text-secondary-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="form.remember"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary dark:text-dark-primary focus:ring-primary dark:focus:ring-dark-primary border-secondary dark:border-dark-secondary rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-text dark:text-dark-text">
              {{ $t('auth.rememberMe') }}
            </label>
          </div>

          <div class="text-sm">
            <NuxtLink
              to="/auth/forgot-password"
              class="font-medium text-primary dark:text-dark-primary hover:text-primary/80 dark:hover:text-dark-primary/80"
            >
              {{ $t('auth.forgotPassword') }}
            </NuxtLink>
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary dark:bg-dark-primary hover:bg-primary-dark dark:hover:bg-dark-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <UserIcon class="h-5 w-5 text-white group-hover:text-white/80" aria-hidden="true" />
            </span>
            {{ isSubmitting ? $t('auth.loggingIn') : $t('auth.login') }}
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-secondary-text dark:text-dark-text">
            {{ $t('auth.noAccount') }}
            <NuxtLink
              to="/auth/register"
              class="font-medium text-primary dark:text-dark-primary hover:text-primary/80 dark:hover:text-dark-primary/80"
            >
              {{ $t('auth.register') }}
            </NuxtLink>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserIcon } from '@heroicons/vue/24/solid'
import { BookOpenIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const { login, error: authError } = useAuth()
const isSubmitting = ref(false)
const error = ref<string | null>(null)
const showPassword = ref(false)

const form = ref({
  email: '',
  password: '',
  remember: false
})

const handleSubmit = async () => {
  try {
    error.value = null
    isSubmitting.value = true

    const success = await login(form.value.email, form.value.password)
    
    if (success) {
      await router.push('/app/dashboard')
    } else {
      error.value = authError.value || 'Login failed'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred during login'
  } finally {
    isSubmitting.value = false
  }
}

definePageMeta({
  layout: 'default',
  colorMode: 'light'
})
</script> 