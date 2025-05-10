<template>
  <div class="relative flex-grow">
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="t('books.searchPlaceholder')"
      class="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-secondary/20 dark:border-dark-secondary/20 bg-white dark:bg-dark-background-light text-text dark:text-dark-text placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent"
    />
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <!-- Clear Button -->
    <button
      v-if="modelValue || hasFilters"
      @click="$emit('clear')"
      class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
      :title="t('books.clearFilters')"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  modelValue: string
  hasFilters: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
  'clear': []
}>()
</script> 