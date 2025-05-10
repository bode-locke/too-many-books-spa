<template>
    <div class="container mx-auto px-4 py-8">
      <div v-if="loading" class="flex justify-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
  
      <div v-else-if="error" class="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
        {{ error }}
      </div>
  
      <div v-else-if="!book" class="text-center py-8">
        <p class="text-text/70 dark:text-dark-text/70">{{ $t('error.description') }}</p>
        <button
          @click="router.back()"
          class="mt-4 inline-flex items-center gap-2 text-primary dark:text-dark-primary hover:text-primary-dark dark:hover:text-dark-primary"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          {{ $t('error.goBack') }}
        </button>
      </div>
  
      <div v-else class="max-w-4xl mx-auto">
        <!-- Back Button -->
        <button
          @click="router.back()"
          class="inline-flex items-center gap-2 text-text/70 dark:text-dark-text/70 hover:text-primary dark:hover:text-dark-primary mb-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          {{ $t('common.back') }}
        </button>
  
        <!-- Book Content -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Cover -->
          <div class="md:col-span-1">
            <div class="aspect-[2/3] rounded-xl overflow-hidden bg-background-light dark:bg-dark-background-light">
              <img
                v-if="book?.imageUri && book?.imageUri !== 'https://images.epagine.fr/no_image.png'"
                :src="book?.imageUri"
                :alt="book?.title"
                class="w-full h-full object-cover"
              />
              <div v-else class="flex items-center justify-center h-full text-text/20 dark:text-dark-text/20">
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
  
            <!-- Status and Rating (if available) -->
            <div v-if="book.status || book.rating" class="mt-4 space-y-3">
              <div v-if="book.status" class="flex items-center justify-center gap-2 text-sm">
                <div class="px-3 py-1.5 rounded-lg bg-primary/10 dark:bg-dark-primary/20 text-primary dark:text-dark-primary font-medium">
                  {{ formatStatus(book.status) }}
                </div>
              </div>
              <div v-if="book.rating" class="flex items-center justify-center gap-1">
                <div v-for="i in 5" :key="i" class="text-yellow-400">
                  <svg 
                    class="w-5 h-5" 
                    :class="i <= book.rating ? 'fill-current' : 'fill-none stroke-current opacity-50'" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Details -->
          <div class="md:col-span-2 space-y-6">
            <div>
              <h1 class="text-2xl font-bold text-text dark:text-dark-text mb-2">{{ book.title }}</h1>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="author in book.authors"
                  :key="author.id"
                  @click="filterByAuthor(author.id)"
                  class="text-primary dark:text-dark-primary hover:text-primary-dark dark:hover:text-dark-primary-light transition-colors"
                >
                  {{ author.name }}
                </button>
              </div>
            </div>
  
            <!-- Description -->
            <div v-if="book.description" class="prose dark:prose-invert max-w-none">
              <p class="text-text/80 dark:text-dark-text/80">{{ book.description }}</p>
            </div>
  
            <!-- Info Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <div class="text-sm text-text/70 dark:text-dark-text/70">{{ $t('book.price') }}</div>
                <div class="font-medium">{{ book.price.toFixed(2) }}€</div>
              </div>
              <div class="space-y-1">
                <div class="text-sm text-text/70 dark:text-dark-text/70">{{ $t('book.type') }}</div>
                <div>{{ formatType(book.type) }}</div>
              </div>
              <div class="space-y-1">
                <div class="text-sm text-text/70 dark:text-dark-text/70">{{ $t('book.language') }}</div>
                <div>{{ book?.language.toUpperCase() }}</div>
              </div>
              <div class="space-y-1">
                <div class="text-sm text-text/70 dark:text-dark-text/70">{{ $t('book.releaseDate') }}</div>
                <div>{{ new Date(book.releaseDate).toLocaleDateString('fr-FR') }}</div>
              </div>
              <div class="space-y-1">
                <div class="text-sm text-text/70 dark:text-dark-text/70">{{ $t('book.publisher') }}</div>
                <button
                  @click="filterByPublisher(book.publisher.id)"
                  class="text-primary dark:text-dark-primary hover:text-primary-dark dark:hover:text-dark-primary-light transition-colors"
                >
                  {{ book.publisher.name }}
                </button>
              </div>
              <div class="space-y-1">
                <div class="text-sm text-text/70 dark:text-dark-text/70">{{ $t('book.ean') }}</div>
                <div>{{ book.ean }}</div>
              </div>
              <div v-if="book.pagesNumber" class="space-y-1">
                <div class="text-sm text-text/70 dark:text-dark-text/70">{{ $t('book.pagesNumber') }}</div>
                <div>{{ book.pagesNumber }}</div>
              </div>
            </div>
  
            <!-- Review -->
            <div v-if="book.review" class="mt-6 p-4 bg-background-light dark:bg-dark-background-light rounded-lg">
              <h2 class="text-lg font-semibold text-text dark:text-dark-text mb-2">{{ $t('book.review') }}</h2>
              <p class="text-text/80 dark:text-dark-text/80">{{ book.review }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { capitalizeFirstLetter } from '~/utils/formatters'
  import type { Book } from '~/types'
  import { useApi } from '~/composables/useApi'
  import { useBooksStore } from '~/stores/books'
  
  definePageMeta({
    layout: 'default',
  })
  
  const router = useRouter()
  const route = useRoute()
  const store = useBooksStore()
  const bookId = route.params.id
  
  const { data: book, pending: loading, error } = await useAsyncData<Book>(
    `book-${bookId}`,
    async () => {
      const api = useApi()
      return await api.get(`/books/${bookId}`)
    }
  )
  
  const formatType = (type: string) => capitalizeFirstLetter(type)
  
  const formatStatus = (status: 'read' | 'reading' | 'to-read') => {
    const statusMap = {
      'read': 'Lu',
      'reading': 'En cours',
      'to-read': 'À lire'
    }
    return statusMap[status]
  }
  
  const filterByAuthor = (authorId: number) => {
    const author = book.value?.authors.find(a => a.id === authorId)
    if (author) {
      store.setAuthorFilter(author.name)
      router.push('/books')
    }
  }
  
  const filterByPublisher = (publisherId: number) => {
    const publisher = book.value?.publisher
    if (publisher && publisher.id === publisherId) {
      store.setPublisherFilter(publisher.name)
      router.push('/books')
    }
  }
  </script> 