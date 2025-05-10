<template>
  <div class="relative w-auto">
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="w-auto appearance-none px-4 py-2 pr-10 rounded-lg border border-secondary/20 dark:border-dark-secondary/20 bg-white dark:bg-dark-background-light text-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent"
      :style="modelValue ? 'padding-left: 2.5rem;' : ''"
    >
      <option value="">{{ t('books.sortBy') }}</option>
      <option value="price:desc">{{ t('books.sortByPriceDesc') }}</option>
      <option value="price:asc">{{ t('books.sortByPriceAsc') }}</option>
      <option value="releaseDate:desc">{{ t('books.sortByDateDesc') }}</option>
      <option value="releaseDate:asc">{{ t('books.sortByDateAsc') }}</option>
    </select>
    <!-- Reset Button -->
    <button
      v-if="modelValue"
      @click="$emit('reset')"
      class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
      :title="t('books.clearSort')"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <!-- Custom Arrow -->
    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg class="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  modelValue: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
  'reset': []
}>()
</script> 