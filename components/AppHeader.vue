<template>
  <header class="fixed top-0 left-0 right-0 z-40 bg-background dark:bg-dark-background shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="hidden sm:block text-xl font-bold text-primary dark:text-dark-primary">
              {{ $t('app.title') }}
            </NuxtLink>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg hover:bg-background-light dark:hover:bg-dark-background-light"
            :title="$t('theme.toggle')"
          >
            <SunIcon v-if="colorMode.value === 'dark'" class="h-5 w-5 text-dark-text" />
            <MoonIcon v-else class="h-5 w-5 text-text" />
          </button>

          <button
            v-if="!isAuthLoading"
            @click="toggleLanguage"
            class="inline-flex items-center px-3 py-2 border border-secondary dark:border-dark-secondary text-sm font-medium rounded-md text-text dark:text-dark-text bg-background-light dark:bg-dark-background-light hover:bg-primary dark:hover:bg-dark-primary hover:text-white dark:hover:text-dark-text focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary"
            :title="$t('app.switchTo', { lang: locale === 'fr' ? 'English' : 'Français' })"
          >
            {{ locale === 'fr' ? 'EN' : 'FR' }}
          </button>

          <template v-if="!isAuthLoading">
            <template v-if="isAuthenticated">
              <NuxtLink
                to="/app/dashboard"
                class="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                {{ $t('auth.dashboard') }}
              </NuxtLink>
              <button
                @click="handleLogout"
                class="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                {{ $t('auth.logout') }}
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/auth/login"
                class="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                {{ $t('auth.login') }}
              </NuxtLink>
              <NuxtLink
                to="/auth/register"
                class="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                {{ $t('auth.register') }}
              </NuxtLink>
            </template>
          </template>
          <div v-else class="flex space-x-4">
            <div class="h-8 w-16 bg-background-light dark:bg-dark-background-light rounded animate-pulse"></div>
            <div class="h-8 w-16 bg-background-light dark:bg-dark-background-light rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useColorMode } from '#imports'

const { isAuthenticated, isLoading: isAuthLoading, logout, init } = useAuth()
const colorMode = useColorMode()
const { locale, setLocale } = useI18n()
const router = useRouter()

// Watch for route changes to update auth state
watch(
  () => router.currentRoute.value.path,
  async (newPath, oldPath) => {
    // Only check auth if we're moving to a protected route
    if (newPath.startsWith('/app')) {
      await init()
    }
  }
)

const toggleTheme = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}

const toggleLanguage = () => {
  const newLocale = locale.value === 'en' ? 'fr' : 'en'
  setLocale(newLocale)
}

const handleLogout = async () => {
  try {
    await logout()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>

<style scoped>
/* Remove custom styles as we're using Tailwind classes now */
</style> 