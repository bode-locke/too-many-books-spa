<template>
  <div class="min-h-screen bg-background dark:bg-dark-background">
    <!-- Hero Section with Book Shelf Design -->
    <div class="relative">
      <!-- Decorative Book Shelf Background -->
      <div class="absolute inset-0 bg-[url('/images/bookshelf-bg.svg')] opacity-5 dark:opacity-10"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <!-- Left Content -->
          <div class="flex-1 space-y-6 sm:space-y-8 relative z-10">
            <div class="inline-block bg-primary/10 dark:bg-dark-primary/10 px-4 py-2 rounded-full">
              <span class="text-primary dark:text-dark-primary font-medium">{{ $t('landing.tagline') }}</span>
            </div>
            <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span class="block text-text dark:text-dark-text">{{ $t('landing.title') }}</span>
              <span class="block text-primary dark:text-dark-primary mt-2">{{ $t('landing.subtitle') }}</span>
            </h1>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink
                v-if="isAuthenticated"
                to="/app/dashboard"
                class="inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-medium text-white bg-primary dark:bg-dark-primary hover:bg-primary-dark dark:hover:bg-dark-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl relative z-20"
              >
                {{ $t('landing.goToDashboard') }}
              </NuxtLink>
              <NuxtLink
                v-else
                to="/auth/register"
                class="inline-flex items-center justify-center px-8 py-4 rounded-xl text-lg font-medium text-white bg-primary dark:bg-dark-primary hover:bg-primary-dark dark:hover:bg-dark-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl relative z-20"
              >
                {{ $t('landing.getStarted') }}
              </NuxtLink>
            </div>
          </div>
          
          <!-- Right Content - Book Stack Animation -->
          <div class="hidden lg:block lg:w-1/2 relative">
            <div class="relative z-0">
              <div class="grid grid-cols-3 gap-4">
                <div class="space-y-4">
                  <div class="h-48 bg-background-light dark:bg-dark-background-light rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-dark-primary/5 dark:to-dark-primary/10"></div>
                    <div class="absolute left-0 top-0 bottom-0 w-2 bg-primary dark:bg-dark-primary"></div>
                    <div class="absolute left-4 top-4 w-24 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-8 w-20 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-12 w-16 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-20 w-24 h-1 bg-primary/20 dark:bg-dark-primary/20 rounded"></div>
                    <div class="absolute left-4 top-24 w-20 h-1 bg-primary/20 dark:bg-dark-primary/20 rounded"></div>
                  </div>
                  <div class="h-40 bg-background-light dark:bg-dark-background-light rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-dark-primary/5 dark:to-dark-primary/10"></div>
                    <div class="absolute left-0 top-0 bottom-0 w-2 bg-primary dark:bg-dark-primary"></div>
                    <div class="absolute left-4 top-4 w-20 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-8 w-16 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-16 w-20 h-1 bg-primary/20 dark:bg-dark-primary/20 rounded"></div>
                    <div class="absolute left-4 top-20 w-16 h-1 bg-primary/20 dark:bg-dark-primary/20 rounded"></div>
                  </div>
                </div>
                <div class="space-y-4 mt-8">
                  <div class="h-40 bg-background-light dark:bg-dark-background-light rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-dark-primary/5 dark:to-dark-primary/10"></div>
                    <div class="absolute left-0 top-0 bottom-0 w-2 bg-primary dark:bg-dark-primary"></div>
                    <div class="absolute left-4 top-4 w-20 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-8 w-16 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-16 w-20 h-1 bg-primary/20 dark:bg-dark-primary/20 rounded"></div>
                    <div class="absolute left-4 top-20 w-16 h-1 bg-primary/20 dark:bg-dark-primary/20 rounded"></div>
                  </div>
                  <div class="h-48 bg-background-light dark:bg-dark-background-light rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-dark-primary/5 dark:to-dark-primary/10"></div>
                    <div class="absolute left-0 top-0 bottom-0 w-2 bg-primary dark:bg-dark-primary"></div>
                    <div class="absolute left-4 top-4 w-24 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-8 w-20 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-12 w-16 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-20 w-24 h-1 bg-primary/20 dark:bg-dark-primary/20 rounded"></div>
                    <div class="absolute left-4 top-24 w-20 h-1 bg-primary/20 dark:bg-dark-primary/20 rounded"></div>
                  </div>
                </div>
                <div class="space-y-4">
                  <div class="h-48 bg-background-light dark:bg-dark-background-light rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-dark-primary/5 dark:to-dark-primary/10"></div>
                    <div class="absolute left-0 top-0 bottom-0 w-2 bg-primary dark:bg-dark-primary"></div>
                    <div class="absolute left-4 top-4 w-24 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-8 w-20 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-12 w-16 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-20 w-24 h-1 bg-primary/20 dark:bg-dark-primary/20 rounded"></div>
                    <div class="absolute left-4 top-24 w-20 h-1 bg-primary/20 dark:bg-dark-primary/20 rounded"></div>
                  </div>
                  <div class="h-40 bg-background-light dark:bg-dark-background-light rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-dark-primary/5 dark:to-dark-primary/10"></div>
                    <div class="absolute left-0 top-0 bottom-0 w-2 bg-primary dark:bg-dark-primary"></div>
                    <div class="absolute left-4 top-4 w-20 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-8 w-16 h-1 bg-primary/30 dark:bg-dark-primary/30 rounded"></div>
                    <div class="absolute left-4 top-16 w-20 h-1 bg-primary/20 dark:bg-dark-primary/20 rounded"></div>
                    <div class="absolute left-4 top-20 w-16 h-1 bg-primary/20 dark:bg-dark-primary/20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 dark:bg-dark-primary/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section with Book Cards -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl font-bold text-text dark:text-dark-text">{{ $t('landing.features.title') }}</h2>
        <p class="mt-4 text-lg text-text/70 dark:text-dark-text/70 max-w-2xl mx-auto">
          {{ $t('landing.features.subtitle') }}
        </p>
      </div>
      
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Collection Management Card -->
        <div class="group">
          <div class="relative h-full bg-background-light dark:bg-dark-background-light rounded-2xl p-8 border border-secondary/20 dark:border-dark-secondary/20 shadow-sm hover:shadow-xl transition-all duration-300">
            <div class="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 dark:bg-dark-primary/10 rounded-2xl transform group-hover:scale-110 transition-transform duration-300 hidden sm:block"></div>
            <div class="relative z-10">
              <div class="w-12 h-12 bg-primary dark:bg-dark-primary rounded-xl flex items-center justify-center mb-6">
                <BookOpenIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 class="text-xl font-semibold text-text dark:text-dark-text mb-4">{{ $t('landing.features.collection.title') }}</h3>
              <p class="text-text/70 dark:text-dark-text/70 leading-relaxed">
                {{ $t('landing.features.collection.description') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Wishlist & Alerts Card -->
        <div class="group">
          <div class="relative h-full bg-background-light dark:bg-dark-background-light rounded-2xl p-8 border border-secondary/20 dark:border-dark-secondary/20 shadow-sm hover:shadow-xl transition-all duration-300">
            <div class="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 dark:bg-dark-primary/10 rounded-2xl transform group-hover:scale-110 transition-transform duration-300 hidden sm:block"></div>
            <div class="relative z-10">
              <div class="w-12 h-12 bg-primary dark:bg-dark-primary rounded-xl flex items-center justify-center mb-6">
                <ChartBarIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 class="text-xl font-semibold text-text dark:text-dark-text mb-4">{{ $t('landing.features.wishlist.title') }}</h3>
              <p class="text-text/70 dark:text-dark-text/70 leading-relaxed">
                {{ $t('landing.features.wishlist.description') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Reviews & Notes Card -->
        <div class="group">
          <div class="relative h-full bg-background-light dark:bg-dark-background-light rounded-2xl p-8 border border-secondary/20 dark:border-dark-secondary/20 shadow-sm hover:shadow-xl transition-all duration-300">
            <div class="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 dark:bg-dark-primary/10 rounded-2xl transform group-hover:scale-110 transition-transform duration-300 hidden sm:block"></div>
            <div class="relative z-10">
              <div class="w-12 h-12 bg-primary dark:bg-dark-primary rounded-xl flex items-center justify-center mb-6">
                <ShareIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h3 class="text-xl font-semibold text-text dark:text-dark-text mb-4">{{ $t('landing.features.reviews.title') }}</h3>
              <p class="text-text/70 dark:text-dark-text/70 leading-relaxed">
                {{ $t('landing.features.reviews.description') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookOpenIcon, ChartBarIcon, ShareIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '~/composables/useAuth'

const { isAuthenticated } = useAuth()

definePageMeta({
  layout: 'default',
  colorMode: 'light'
})
</script>
