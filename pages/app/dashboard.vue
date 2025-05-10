<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-2xl font-bold text-text dark:text-dark-text mb-8">{{ t('dashboard.title') }}</h1>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
      {{ error }}
    </div>

    <!-- Dashboard Content -->
    <div v-else class="space-y-8">
      <!-- Wishlist Section -->
      <section>
        <h2 class="text-xl font-semibold text-text dark:text-dark-text mb-4">{{ t('dashboard.wishlist') }}</h2>
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
          <BookCard
            v-for="book in wishlist"
            :key="book.id"
            :book="book"
          />
        </div>
        <div v-if="wishlist.length === 0" class="text-center py-8">
          <p class="text-text/70 dark:text-dark-text/70">{{ t('dashboard.emptyWishlist') }}</p>
        </div>
      </section>

      <!-- Collections Section -->
      <section>
        <h2 class="text-xl font-semibold text-text dark:text-dark-text mb-4">{{ t('dashboard.collections') }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="collection in collections" :key="collection.id" class="bg-background-light dark:bg-dark-background-light rounded-lg p-4">
            <h3 class="font-medium text-text dark:text-dark-text mb-2">{{ collection.name }}</h3>
            <p class="text-text/70 dark:text-dark-text/70 text-sm">{{ collection.books.length }} {{ t('dashboard.books') }}</p>
          </div>
        </div>
        <div v-if="collections.length === 0" class="text-center py-8">
          <p class="text-text/70 dark:text-dark-text/70">{{ t('dashboard.noCollections') }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Book, Collection } from '~/types'

definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

const { t } = useI18n()

const loading = ref(true)
const error = ref<string | null>(null)
const wishlist = ref<Book[]>([])
const collections = ref<Collection[]>([])

onMounted(async () => {
  try {
    // TODO: Fetch user's wishlist and collections
    loading.value = false
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'An error occurred'
    loading.value = false
  }
})
</script>