<template>
  <div class="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-background dark:bg-dark-background">
    <div class="max-w-md w-full space-y-6">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-dark-primary/10 rounded-2xl flex items-center justify-center">
          <BookOpenIcon class="h-8 w-8 text-primary dark:text-dark-primary" />
        </div>
        <h2 class="text-2xl font-bold text-text dark:text-dark-text">
          {{ $t('auth.createAccount') }}
        </h2>
        <p class="mt-2 text-sm text-secondary-text dark:text-dark-text">
          {{ $t('auth.joinUs') }}
        </p>
      </div>
      <form class="mt-4 space-y-3" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-2">
          <div>
            <label for="name" class="sr-only">{{ $t('auth.name') }}</label>
            <input
              id="name"
              v-model="form.name"
              name="name"
              type="text"
              autocomplete="name"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-secondary dark:border-dark-secondary placeholder-secondary-text dark:placeholder-dark-text text-text dark:text-dark-text rounded-md focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary focus:z-10 sm:text-sm bg-background-light dark:bg-dark-background-light"
              :placeholder="$t('auth.name')"
            />
          </div>
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
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none relative block w-full px-3 py-2 border border-secondary dark:border-dark-secondary placeholder-secondary-text dark:placeholder-dark-text text-text dark:text-dark-text rounded-md focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary focus:z-10 sm:text-sm bg-background-light dark:bg-dark-background-light"
              :placeholder="$t('auth.password')"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary dark:bg-dark-primary hover:bg-primary-dark dark:hover:bg-dark-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <UserPlusIcon class="h-5 w-5 text-white group-hover:text-white/80" aria-hidden="true" />
            </span>
            {{ isSubmitting ? $t('auth.registering') : $t('auth.register') }}
          </button>
        </div>

        <div class="text-center">
          <p class="text-sm text-secondary-text dark:text-dark-text">
            {{ $t('auth.haveAccount') }}
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
</template>

<script setup lang="ts">
import { UserPlusIcon } from '@heroicons/vue/24/solid'
import { BookOpenIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'
import { ref } from 'vue'

const { login } = useAuth()
const isSubmitting = ref(false)
const error = ref<string | null>(null)

const form = ref({
  name: '',
  email: '',
  password: ''
})

const handleSubmit = async () => {
  try {
    error.value = null
    isSubmitting.value = true

    // First register the user
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form.value)
    })

    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.message || 'Registration failed')
    }

    // Then sign in the user
    await login(form.value.email, form.value.password)

    // Redirect to dashboard
    await navigateTo('/app/dashboard')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred during registration'
  } finally {
    isSubmitting.value = false
  }
}

definePageMeta({
  layout: 'default',
  colorMode: 'light'
})
</script> 