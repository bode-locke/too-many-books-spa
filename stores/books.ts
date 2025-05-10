// stores/books.ts
import { defineStore } from 'pinia'
import type { Book } from '~/types'

interface ApiBook {
  id: number
  title: string
  imageUri: string
  price: number
  ean: string
  description: string
  releaseDate: string
  pagesNumber: number | null
  publisher: {
    id: number
    name: string
  }
  authors: Array<{
    id: number
    name: string
  }>
  language: string
  type: string
}

interface ApiResponse {
  items: ApiBook[]
  pagination: {
    total: number
    page: number
    limit: number
    total_pages: number
  }
}

interface BooksState {
  books: Book[]
  loading: boolean
  error: string | null
  searchQuery: string
  filters: {
    author: string | null
    publisher: string | null
    type: string[]
  }
  sort: {
    field: 'price' | 'releaseDate' | null
    order: 'asc' | 'desc' | null
  }
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const useBooksStore = defineStore('books', {
  state: (): BooksState => ({
    books: [],
    loading: false,
    error: null,
    searchQuery: '',
    filters: {
      author: null,
      publisher: null,
      type: []
    },
    sort: {
      field: null,
      order: null
    },
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0
    }
  }),

  actions: {
    async fetchBooks(page: number = 1, limit: number = 20) {
      this.loading = true
      this.error = null
      
      try {
        const { get } = useApi()
        const params: Record<string, string> = {
          page: page.toString(),
          limit: limit.toString()
        }

        if (this.searchQuery) {
          params.search = this.searchQuery
        }

        if (this.filters.author) {
          params.author = this.filters.author
        }

        if (this.filters.publisher) {
          params.publisher = this.filters.publisher
        }

        if (this.filters.type.length > 0) {
          params.types = this.filters.type.join(',')
        }

        if (this.sort.field && this.sort.order) {
          params.sort = `${this.sort.field}:${this.sort.order}`
        }

        const response = await get<ApiResponse>('books', params)
        
        // Transform API books to our Book type
        this.books = response.items.map(book => ({
          id: book.id,
          title: book.title,
          imageUri: book.imageUri,
          price: book.price,
          ean: book.ean,
          description: book.description,
          releaseDate: book.releaseDate,
          pagesNumber: book.pagesNumber ?? undefined,
          publisher: book.publisher,
          authors: book.authors,
          language: book.language,
          type: book.type,
          addedDate: new Date().toISOString()
        }))
        
        this.pagination = {
          page: response.pagination.page,
          limit: response.pagination.limit,
          total: response.pagination.total,
          totalPages: response.pagination.total_pages
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Failed to fetch books'
      } finally {
        this.loading = false
      }
    },

    setSearchQuery(query: string) {
      this.searchQuery = query
      this.pagination.page = 1 // Reset to first page when searching
      this.fetchBooks()
    },

    setAuthorFilter(author: string | null) {
      console.log('Store: Setting author filter to:', author)
      this.filters.author = author
      this.pagination.page = 1 // Reset to first page when filtering
      this.fetchBooks()
    },

    setPublisherFilter(publisher: string | null) {
      console.log('Store: Setting publisher filter to:', publisher)
      this.filters.publisher = publisher
      this.pagination.page = 1 // Reset to first page when filtering
      this.fetchBooks()
    },

    setTypeFilter(type: string | null) {
      if (type === null) {
        this.filters.type = []
      } else {
        const index = this.filters.type.indexOf(type)
        if (index === -1) {
          this.filters.type.push(type)
        } else {
          this.filters.type.splice(index, 1)
        }
      }
      this.pagination.page = 1 // Reset to first page when filtering
      this.fetchBooks()
    },

    setSort(field: 'price' | 'releaseDate' | null, order: 'asc' | 'desc' | null) {
      this.sort.field = field
      this.sort.order = order
      this.fetchBooks()
    },

    clearFilters() {
      this.filters.author = null
      this.filters.publisher = null
      this.filters.type = []
      this.searchQuery = ''
      this.pagination.page = 1
      this.fetchBooks()
    }
  },

  getters: {
    totalPages: (state) => state.pagination.totalPages,
    hasNextPage: (state) => state.pagination.page < state.pagination.totalPages,
    hasPreviousPage: (state) => state.pagination.page > 1
  }
})