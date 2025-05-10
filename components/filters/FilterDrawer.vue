<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform translate-y-full"
    enter-to-class="transform translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0"
    leave-to-class="transform translate-y-full"
  >
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 sm:hidden"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-black/50"
        @click="$emit('update:modelValue', false)"
      />
      
      <!-- Drawer -->
      <div
        class="absolute inset-0 bg-background dark:bg-dark-background"
        @click.stop
      >
        <!-- Drawer Header -->
        <div class="px-4 py-4 border-b border-secondary/20 dark:border-dark-secondary/20">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium text-text dark:text-dark-text">{{ t('books.filters') }}</h3>
            <button
              @click="$emit('update:modelValue', false)"
              class="text-text/50 dark:text-dark-text/50 hover:text-text dark:hover:text-dark-text transition-colors duration-200"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Drawer Content -->
        <div class="h-[calc(100vh-8rem)] overflow-y-auto">
          <div class="px-4 py-4 space-y-6">
            <!-- Sort Select -->
            <div>
              <label class="block text-sm font-medium text-text dark:text-dark-text mb-2">{{ t('books.sortBy') }}</label>
              <div class="relative">
                <select
                  :value="sortValue"
                  @change="$emit('update:sort', ($event.target as HTMLSelectElement).value)"
                  class="w-full appearance-none px-4 py-2 pr-10 rounded-lg border border-secondary/20 dark:border-dark-secondary/20 bg-white dark:bg-dark-background-light text-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:border-transparent"
                  :style="sortValue ? 'padding-left: 2.5rem;' : ''"
                >
                  <option value="">{{ t('books.sortBy') }}</option>
                  <option value="price:desc">{{ t('books.sortByPriceDesc') }}</option>
                  <option value="price:asc">{{ t('books.sortByPriceAsc') }}</option>
                  <option value="releaseDate:desc">{{ t('books.sortByDateDesc') }}</option>
                  <option value="releaseDate:asc">{{ t('books.sortByDateAsc') }}</option>
                </select>
                <!-- Reset Button -->
                <button
                  v-if="sortValue"
                  @click="$emit('reset-sort')"
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
            </div>

            <!-- Type Filter Badges -->
            <div>
              <label class="block text-sm font-medium text-text dark:text-dark-text mb-2">{{ t('books.bookTypes.title') }}</label>
              <TypeFilters
                :selected-types="selectedTypes"
                @toggle="$emit('toggle-type', $event)"
              />
            </div>

            <!-- Active Filters -->
            <div v-if="author || publisher">
              <label class="block text-sm font-medium text-text dark:text-dark-text mb-2">{{ t('books.activeFilters') }}</label>
              <FilterBadges
                :author="author"
                :publisher="publisher"
                @clear-author="$emit('clear-author')"
                @clear-publisher="$emit('clear-publisher')"
              />
            </div>
          </div>
        </div>

        <!-- Drawer Footer -->
        <div class="absolute bottom-0 left-0 right-0 px-4 py-4 border-t border-secondary/20 dark:border-dark-secondary/20 bg-background dark:bg-dark-background">
          <button
            @click="$emit('clear-all')"
            class="w-full px-4 py-2 rounded-lg bg-primary dark:bg-dark-primary text-white hover:bg-primary-dark dark:hover:bg-dark-primary-dark transition-colors duration-200"
          >
            {{ t('books.clearAllFilters') }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import TypeFilters from './TypeFilters.vue'
import FilterBadges from './FilterBadges.vue'

const { t } = useI18n()

defineProps<{
  modelValue: boolean
  sortValue: string
  selectedTypes: string[]
  author: string | null
  publisher: string | null
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
  'update:sort': [value: string]
  'toggle-type': [type: string]
  'clear-author': []
  'clear-publisher': []
  'clear-all': []
  'reset-sort': []
}>()
</script> 