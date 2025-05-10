<template>
  <div class="mb-6">
    <!-- Search Bar Container -->
    <div class="fixed sm:static top-[64px] left-0 right-0 z-10 bg-background dark:bg-dark-background p-2 sm:p-0 border-b border-secondary/20 dark:border-dark-secondary/20">
      <div class="w-full">
        <div class="flex items-center gap-2">
          <SearchBar
            v-model="searchQuery"
            :has-filters="hasActiveFilters"
            @clear="clearAllFilters"
            @update:modelValue="handleSearch"
          />

          <!-- Filter Button (Mobile Only) -->
          <button
            @click="isFilterDrawerOpen = true"
            class="sm:hidden inline-flex items-center px-4 py-2 rounded-lg border border-secondary/20 dark:border-dark-secondary/20 bg-white dark:bg-dark-background-light text-text dark:text-dark-text hover:bg-background-light dark:hover:bg-dark-background-lighter transition-colors duration-200"
          >
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            {{ t('books.filters') }}
            <span v-if="totalActiveFilters > 0" class="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-primary dark:bg-dark-primary text-white">
              {{ totalActiveFilters }}
            </span>
          </button>

          <!-- Sort Select (Desktop Only) -->
          <SortSelect
            v-model="sortValue"
            class="hidden sm:block"
            @update:modelValue="handleSort"
            @reset="resetSort"
          />
        </div>
      </div>
    </div>

    <!-- Desktop Filters -->
    <div class="hidden sm:block mt-4">
      <TypeFilters
        :selected-types="store.filters.type"
        @toggle="toggleTypeFilter"
      />

      <FilterBadges
        v-if="hasActiveFilters"
        :author="store.filters.author"
        :publisher="store.filters.publisher"
        @clear-author="clearAuthorFilter"
        @clear-publisher="clearPublisherFilter"
      />
    </div>

    <!-- Mobile Filter Drawer -->
    <FilterDrawer
      v-model="isFilterDrawerOpen"
      :sort-value="sortValue"
      :selected-types="store.filters.type"
      :author="store.filters.author"
      :publisher="store.filters.publisher"
      @update:sort="handleSort"
      @toggle-type="toggleTypeFilter"
      @clear-author="clearAuthorFilter"
      @clear-publisher="clearPublisherFilter"
      @clear-all="clearAllFilters"
      @reset-sort="resetSort"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useBooksStore } from '~/stores/books'
import { useDebounceFn } from '@vueuse/core'
import SearchBar from './SearchBar.vue'
import SortSelect from './SortSelect.vue'
import TypeFilters from './TypeFilters.vue'
import FilterBadges from './FilterBadges.vue'
import FilterDrawer from './FilterDrawer.vue'

const { t } = useI18n()
const store = useBooksStore()

const searchQuery = ref(store.searchQuery)
const sortValue = ref('')
const isFilterDrawerOpen = ref(false)

const hasActiveFilters = computed(() => 
  Boolean(store.filters.author || store.filters.publisher || store.filters.type.length > 0)
)

const totalActiveFilters = computed(() => {
  let count = 0
  if (store.filters.author) count++
  if (store.filters.publisher) count++
  count += store.filters.type.length
  if (sortValue.value) count++
  return count
})

const handleSearch = useDebounceFn((value: string) => {
  store.setSearchQuery(value)
}, 300)

// Watch for store changes to keep input in sync
watch(() => store.searchQuery, (newQuery) => {
  searchQuery.value = newQuery
})

const clearAllFilters = () => {
  store.clearFilters()
  sortValue.value = ''
  store.setSort(null, null)
  isFilterDrawerOpen.value = false
}

const clearAuthorFilter = () => {
  store.setAuthorFilter(null)
}

const clearPublisherFilter = () => {
  store.setPublisherFilter(null)
}

const handleSort = (value: string) => {
  sortValue.value = value
  if (!value) {
    store.setSort(null, null)
    return
  }
  const [field, order] = value.split(':')
  store.setSort(field as 'price' | 'releaseDate', order as 'asc' | 'desc')
}

const resetSort = () => {
  sortValue.value = ''
  store.setSort(null, null)
}

// Initialize sort value from store
if (store.sort.field && store.sort.order) {
  sortValue.value = `${store.sort.field}:${store.sort.order}`
}

const toggleTypeFilter = (type: string) => {
  store.setTypeFilter(type)
}
</script> 