// composables/useBooks.ts
import { useBooksStore } from '~/stores/books'

export const useBooks = () => {
  const store = useBooksStore()

  const fetchBooks = async (page: number = 1, limit: number = 20) => {
    await store.fetchBooks(page, limit)
  }

  return {
    books: computed(() => store.books),
    loading: computed(() => store.loading),
    error: computed(() => store.error),
    pagination: computed(() => store.pagination),
    totalPages: computed(() => store.totalPages),
    hasNextPage: computed(() => store.hasNextPage),
    hasPreviousPage: computed(() => store.hasPreviousPage),
    fetchBooks,
  }
}