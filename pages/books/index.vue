<template>
  <div class="h-full overflow-auto sm:mt-0 mt-5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Filters -->
      <BookFilters />

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
        {{ error }}
      </div>

      <!-- Books List -->
      <div v-else class="space-y-6">
        <!-- Books Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
          <BookCard
            v-for="book in books"
            :key="book.id"
            :book="book"
            @filter-by-author="filterByAuthor"
            @filter-by-publisher="filterByPublisher"
            @filter-by-type="filterByType"
          />
        </div>

        <!-- No Results -->
        <div v-if="books.length === 0" class="text-center py-8">
          <p class="text-text/70 dark:text-dark-text/70">{{ t('dashboard.noResults') }}</p>
        </div>

        <!-- Pagination -->
        <div v-if="pagination && books.length > 0" class="flex items-center justify-center gap-2 mt-8">
          <button 
            @click="changePage(pagination.page - 1)"
            :disabled="!hasPreviousPage"
            class="inline-flex items-center px-3 py-2 rounded-lg bg-background-light dark:bg-dark-background-light text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-dark-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="hidden sm:inline">{{ t('pagination.previous') }}</span>
          </button>

          <div class="flex items-center gap-2">
            <template v-for="page in displayedPages" :key="page">
              <button
                v-if="page !== '...' && (page === pagination.page || page === 1 || page === totalPages || (typeof page === 'number' && page > pagination.page - 2 && page < pagination.page + 2))"
                @click="changePage(Number(page))"
                :class="[
                  'w-8 sm:w-10 h-8 sm:h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-200',
                  page === pagination.page
                    ? 'bg-primary dark:bg-dark-primary text-white'
                    : 'bg-background-light dark:bg-dark-background-light text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-dark-primary/20'
                ]"
              >
                {{ page }}
              </button>
              <span v-else-if="page === '...'" class="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center text-text/50 dark:text-dark-text/50">...</span>
            </template>
          </div>

          <button 
            @click="changePage(pagination.page + 1)"
            :disabled="!hasNextPage"
            class="inline-flex items-center px-3 py-2 rounded-lg bg-background-light dark:bg-dark-background-light text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-dark-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span class="hidden sm:inline">{{ t('pagination.next') }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useBooks } from '~/composables/useBooks'
import { useI18n } from 'vue-i18n'
import { useBooksStore } from '~/stores/books'
import BookFilters from '~/components/filters/BookFilters.vue'

const { t } = useI18n()
const store = useBooksStore()
const {
  books,
  loading,
  error,
  pagination,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  fetchBooks
} = useBooks()

const changePage = async (page: number) => {
  if (page < 1 || page > totalPages.value) return
  await fetchBooks(page, store.pagination.limit)
  // Use Nuxt's scrollTo to handle scroll position
  await navigateTo({ path: '/books', query: { page } })
  document.documentElement.scrollTo({ top: 0, behavior: 'instant' })
}

const filterByAuthor = async (authorName: string) => {
  store.setAuthorFilter(authorName)
  await navigateTo('/books')
}

const filterByPublisher = async (publisherName: string) => {
  store.setPublisherFilter(publisherName)
  await navigateTo('/books')
}

const filterByType = async (type: string) => {
  store.setTypeFilter(type)
  await navigateTo('/books')
}

// Add this computed property for pagination
const displayedPages = computed(() => {
  const currentPage = pagination.value.page
  const total = totalPages.value
  const pages: (number | string)[] = []

  if (total <= 7) {
    // If we have 7 or fewer pages, show all pages
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(total - 1, currentPage + 1); i++) {
      pages.push(i)
    }

    if (currentPage < total - 2) {
      pages.push('...')
    }

    // Always show last page
    pages.push(total)
  }

  return pages
})

onMounted(() => {
  fetchBooks()
})
</script> 