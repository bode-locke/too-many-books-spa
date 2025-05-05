// Auth Types
export interface User {
  id: string
  email: string
  name?: string
  roles: string[]
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

// Error Types
export interface AppError {
  code: string
  message: string
  details?: unknown
  timestamp: number
}

// API Types
export interface ApiResponse<T> {
  data: T
  meta?: {
    total?: number
    page?: number
    limit?: number
  }
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: {
    total: number
    page: number
    limit: number
  }
}

// Book Types
export interface Book {
  id: string
  title: string
  author: string
  isbn?: string
  description?: string
  coverUrl?: string
  publishedDate?: string
  addedDate: string
  status: 'read' | 'reading' | 'to-read'
  rating?: number
  review?: string
}

// Collection Types
export interface Collection {
  id: string
  name: string
  description?: string
  books: Book[]
  createdAt: string
  updatedAt: string
} 