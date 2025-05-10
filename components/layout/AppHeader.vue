<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-background dark:bg-dark-background border-b border-secondary/20 dark:border-dark-secondary/20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <span class="text-xl font-bold text-primary dark:text-dark-primary">{{ $t('app.title') }}</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-4">
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light transition-colors duration-200"
            :title="$t('theme.toggle')"
          >
            <svg v-if="colorMode.value === 'light'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          </button>

          <!-- <button
            v-if="!isAuthLoading"
            @click="toggleLanguage"
            class="p-2 rounded-lg text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light transition-colors duration-200"
          >
            {{ locale === 'fr' ? 'EN' : 'FR' }}
          </button> -->

          <NuxtLink
            to="/books"
            class="inline-flex items-center p-2 rounded-lg text-sm font-medium text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light transition-colors duration-200"
          >
            {{ $t('nav.books') }}
          </NuxtLink>

          <template v-if="!isAuthLoading">
            <template v-if="isAuthenticated">
              <NuxtLink
                to="/app/dashboard"
                class="inline-flex items-center p-2 rounded-lg text-sm font-medium text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light transition-colors duration-200"
              >
                {{ $t('auth.dashboard') }}
              </NuxtLink>
              <div class="relative">
                <button
                  @click="isProfilePanelOpen = !isProfilePanelOpen"
                  class="inline-flex items-center p-2 rounded-lg text-sm font-medium text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light transition-colors duration-200"
                  :title="$t('profile.title')"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </button>
                <!-- Profile Panel -->
                <div
                  v-if="isProfilePanelOpen"
                  class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-background dark:bg-dark-background ring-1 ring-black ring-opacity-5"
                >
                  <div class="py-1">
                    <NuxtLink
                      to="/app/profile"
                      class="block px-4 py-2 text-sm text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light"
                      @click="isProfilePanelOpen = false"
                    >
                      {{ $t('profile.edit') }}
                    </NuxtLink>
                    <button
                      @click="handleLogout"
                      class="w-full text-left px-4 py-2 text-sm text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light"
                    >
                      {{ $t('auth.logout') }}
                    </button>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <NuxtLink
                to="/auth/login"
                class="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light transition-colors duration-200"
              >
                {{ $t('auth.login') }}
              </NuxtLink>
              <NuxtLink
                to="/auth/register"
                class="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light transition-colors duration-200"
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

        <!-- Mobile Navigation -->
        <div class="md:hidden flex items-center space-x-4">
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-200 p-1"
            :title="$t('theme.toggle')"
          >
            <svg v-if="colorMode.value === 'light'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
          </button>

          <!-- Books Link -->
          <NuxtLink
            to="/books"
            class="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-200 p-1"
            :title="$t('books.title')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </NuxtLink>

          <!-- Auth Actions -->
          <div v-if="!isAuthenticated" class="relative">
            <button
              @click="isAuthPanelOpen = !isAuthPanelOpen"
              class="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-200 p-1"
              :title="$t('auth.login')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
            <!-- Auth Panel -->
            <div
              v-if="isAuthPanelOpen"
              class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-background dark:bg-dark-background ring-1 ring-black ring-opacity-5"
            >
              <div class="py-1">
                <NuxtLink
                  to="/auth/login"
                  class="block px-4 py-2 text-sm text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light"
                  @click="isAuthPanelOpen = false"
                >
                  {{ $t('auth.login') }}
                </NuxtLink>
                <NuxtLink
                  to="/auth/register"
                  class="block px-4 py-2 text-sm text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light"
                  @click="isAuthPanelOpen = false"
                >
                  {{ $t('auth.register') }}
                </NuxtLink>
              </div>
            </div>
          </div>
          <div v-else class="flex items-center space-x-4">
            <NuxtLink
              to="/app/dashboard"
              class="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-200 p-1"
              :title="$t('dashboard.title')"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </NuxtLink>
            <div class="relative">
              <button
                @click="isProfilePanelOpen = !isProfilePanelOpen"
                class="text-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary transition-colors duration-200 p-1"
                :title="$t('profile.title')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>
              <!-- Profile Panel -->
              <div
                v-if="isProfilePanelOpen"
                class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-background dark:bg-dark-background ring-1 ring-black ring-opacity-5"
              >
                <div class="py-1">
                  <NuxtLink
                    to="/app/profile"
                    class="block px-4 py-2 text-sm text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light"
                    @click="isProfilePanelOpen = false"
                  >
                    {{ $t('profile.edit') }}
                  </NuxtLink>
                  <button
                    @click="handleLogout"
                    class="w-full text-left px-4 py-2 text-sm text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-light"
                  >
                    {{ $t('auth.logout') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useI18n } from 'vue-i18n'
import { useColorMode } from '#imports'

const { isAuthenticated, isLoading: isAuthLoading, logout } = useAuth()
const { locale, setLocale } = useI18n()
const colorMode = useColorMode()
const isAuthPanelOpen = ref(false)
const isProfilePanelOpen = ref(false)

const handleLogout = async () => {
  await logout()
  isProfilePanelOpen.value = false
  await navigateTo('/')
}

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// const toggleLanguage = () => {
//   const newLocale = locale.value === 'en' ? 'fr' : 'en'
//   setLocale(newLocale)
// }
</script>

<style scoped>
/* Remove custom styles as we're using Tailwind classes now */
</style> 