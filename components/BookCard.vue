<template>
  <div 
    class="group flex flex-col bg-white dark:bg-dark-background-light rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
  >
    <!-- Book Cover -->
    <NuxtLink 
      :to="`/books/${book.id}`"
      class="relative aspect-[2/3] rounded-t-xl overflow-hidden bg-white dark:bg-dark-background-light cursor-pointer"
    >
      <img 
        v-if="book.imageUri && book.imageUri !== 'https://images.epagine.fr/no_image.png'" 
        :src="book.imageUri" 
        :alt="book.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div v-else class="flex flex-col items-center justify-center h-full text-gray-400 dark:text-dark-text/50">
        <svg class="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span class="text-xs text-center">{{ $t('book.noImage') }}</span>
      </div>
      <!-- Overlay on hover -->
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
        <span class="opacity-0 group-hover:opacity-100 text-white font-medium transition-opacity duration-300">
          {{ $t('book.viewDetails') }}
        </span>
      </div>
    </NuxtLink>

    <!-- Book Info -->
    <div class="flex flex-col flex-grow p-3">
      <h3 class="font-semibold text-base text-gray-900 dark:text-dark-text line-clamp-2 mb-1">
        {{ book.title }}
      </h3>
      <p class="text-xs text-gray-600 dark:text-dark-text/70 mb-3">
        <template v-for="(author, index) in book.authors" :key="author.id">
          <button 
            type="button"
            @click.stop="filterByAuthor(author.name)"
            class="text-primary hover:text-primary-dark dark:text-dark-primary dark:hover:text-dark-primary-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:ring-offset-2 rounded"
          >
            {{ author.name }}
          </button>
          <span v-if="index < book.authors.length - 1" class="mx-1">,</span>
        </template>
      </p>
      
      <!-- Book Details -->
      <div class="flex flex-wrap gap-1.5">
        <!-- Price -->
        <div class="inline-flex items-center px-2 py-1 bg-primary/10 dark:bg-dark-primary/20 text-primary dark:text-dark-primary-light rounded-full text-xs font-medium">
          <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ book.price.toFixed(2) }}€
        </div>

        <!-- Type -->
        <button 
          @click.stop="filterByType(book.type)"
          class="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-dark-background text-gray-700 dark:text-dark-text/70 hover:text-primary dark:hover:text-dark-primary rounded-full text-xs transition-colors duration-200"
        >
          <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          {{ formatType(book.type) }}
        </button>

        <!-- Wishlist Button -->
        <button 
          @click="showWishlistModal = true"
          class="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-dark-background text-gray-700 dark:text-dark-text/70 hover:text-red-500 dark:hover:text-red-400 rounded-full text-xs transition-colors duration-200"
          :title="t('book.addToWishlist')"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <!-- Additional Info -->
      <div class="mt-3 text-xs text-gray-500 dark:text-dark-text/50 space-y-0.5">
        <div class="flex items-center">
          <svg class="w-3 h-3 mr-1.5 text-gray-400 dark:text-dark-text/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ new Date(book.releaseDate).toLocaleDateString('fr-FR') }}
        </div>
        <div class="flex items-center">
          <svg class="w-3 h-3 mr-1.5 text-gray-400 dark:text-dark-text/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <button 
            type="button"
            @click.stop="filterByPublisher(book.publisher.name)"
            class="text-primary hover:text-primary-dark dark:text-dark-primary dark:hover:text-dark-primary-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:ring-offset-2 rounded"
          >
            {{ book.publisher.name }}
          </button>
        </div>
        <div class="flex items-center">
          <svg class="w-3 h-3 mr-1.5 text-gray-400 dark:text-dark-text/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v18m1.5-18H18a2 2 0 012 2v12a2 2 0 01-2 2h-7.5" />
          </svg>
          {{ book.ean }}
        </div>
      </div>
    </div>
  </div>

  <!-- Wishlist Modal -->
  <WishlistModal
    :is-open="showWishlistModal"
    @close="showWishlistModal = false"
  />
</template>

<script setup lang="ts">
import type { Book } from '~/types'
import { capitalizeFirstLetter } from '~/utils/formatters'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'

const { t } = useI18n()
const showWishlistModal = ref(false)

defineProps<{
  book: Book
}>()

const emit = defineEmits<{
  (e: 'filterByAuthor', authorName: string): void
  (e: 'filterByPublisher', publisherName: string): void
  (e: 'filterByType', type: string): void
}>()

const formatType = (type: string) => capitalizeFirstLetter(type)

const filterByAuthor = (authorName: string) => {
  emit('filterByAuthor', authorName)
}

const filterByPublisher = (publisherName: string) => {
  emit('filterByPublisher', publisherName)
}

const filterByType = (type: string) => {
  emit('filterByType', type)
}
</script> 