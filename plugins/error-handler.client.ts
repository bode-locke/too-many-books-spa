interface NuxtError {
  statusCode?: number
  message?: string
}

export default defineNuxtPlugin((nuxtApp) => {
  const navigateToError = (error: NuxtError) => {
    const statusCode = error?.statusCode || 500
    const message = error?.message || 'An error occurred'
    navigateTo({
      path: '/[...slug]',
      query: {
        statusCode,
        message
      }
    })
  }

  // Handle Vue errors
  nuxtApp.vueApp.config.errorHandler = (error: unknown, instance, info) => {
    console.error('Vue error:', error)
    const nuxtError = error as NuxtError
    if (nuxtError?.statusCode && nuxtError.statusCode !== 404) {
      navigateToError(nuxtError)
    }
  }

  // Handle Nuxt errors
  nuxtApp.hook('vue:error', (error: unknown, instance, info) => {
    console.error('Vue error hook:', error)
    const nuxtError = error as NuxtError
    if (nuxtError?.statusCode && nuxtError.statusCode !== 404) {
      navigateToError(nuxtError)
    }
  })

  // Handle app errors
  nuxtApp.hook('app:error', (error: unknown) => {
    console.error('App error:', error)
    const nuxtError = error as NuxtError
    if (nuxtError?.statusCode && nuxtError.statusCode !== 404) {
      navigateToError(nuxtError)
    }
  })

  // Handle route errors
  nuxtApp.hook('app:beforeMount', () => {
    const route = useRoute()
    if (route.matched.length === 0) {
      navigateToError({ statusCode: 404 })
    }
  })
}) 