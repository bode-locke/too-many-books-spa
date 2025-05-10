<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="type in types"
      :key="type"
      @click="$emit('toggle', type)"
      :class="[
        'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
        selectedTypes.includes(type)
          ? 'bg-primary dark:bg-dark-primary text-white shadow-md'
          : 'bg-background-light dark:bg-dark-background-light text-text dark:text-dark-text hover:bg-primary/10 dark:hover:bg-dark-primary/20'
      ]"
    >
      {{ t(`books.bookTypes.${type}`) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const types = ['novels', 'bd', 'comics', 'manga']

defineProps<{
  selectedTypes: string[]
}>()

defineEmits<{
  'toggle': [type: string]
}>()
</script> 