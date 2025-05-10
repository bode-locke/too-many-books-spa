<template>
  <div class="mt-2 flex items-center gap-2">
    <div v-if="author" class="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 dark:bg-dark-primary/20 text-primary dark:text-dark-primary-light text-sm">
      {{ t('books.filterByAuthor', { author }) }}
      <button
        @click="$emit('clear-author')"
        class="ml-2 text-primary dark:text-dark-primary-light hover:text-primary-dark dark:hover:text-dark-primary transition-colors duration-200"
        :title="t('books.removeFilter')"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div v-if="publisher" class="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 dark:bg-dark-primary/20 text-primary dark:text-dark-primary-light text-sm">
      {{ t('books.filterByPublisher', { publisher }) }}
      <button
        @click="$emit('clear-publisher')"
        class="ml-2 text-primary dark:text-dark-primary-light hover:text-primary-dark dark:hover:text-dark-primary transition-colors duration-200"
        :title="t('books.removeFilter')"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  author: string | null
  publisher: string | null
}>()

defineEmits<{
  'clear-author': []
  'clear-publisher': []
}>()
</script> 