import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-05-04',
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-api-shield',
    '@nuxt/image',
    'nuxt-icon',
  ],
  image: {
    domains: ['images.epagine.fr'], // ✅ autorise les images externes
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  colorMode: {
    preference: 'light',
    fallback: 'light',
    storageKey: 'nuxt-color-mode',
    storage: 'localStorage',
    dataValue: 'theme',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    disableTransition: true
  },
  // pinia: {
  //   // autoImports: ['defineStore'],
  //   // persist: {
  //   //   storage: 'localStorage',
  //   //   paths: ['auth.isAuthenticated']
  //   // }
  // },
  i18n: {
    langDir: '../i18n/locales',
    locales: [
      {
        code: 'en',
        file: 'en.json',
        name: 'English'
      },
      {
        code: 'fr',
        file: 'fr.json',
        name: 'Français',
      }
    ],
    defaultLocale: 'fr',
    lazy: true,
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      redirectOn: 'root',
      alwaysRedirect: true
    }
  },
  nuxtApiShield: {
    limit: {
      max: 100,        
      duration: 60,  
      ban: 3600,      
    },
    delayOnBan: true, 
    errorMessage: "Too Many Requests",
    retryAfterHeader: true,
    log: {
      path: "logs",
      attempts: 100
    },
    routes: ['/api/']
  },
  app: {
    head: {
      title: 'Too Many Books',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Your personal book collection manager' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL + '/api'
    }
  },
  pages: true,
  nitro: {
    devProxy: {
      '/api': {
        target: process.env.API_BASE_URL ,
        changeOrigin: true,
        prependPath: false,
        cookieDomainRewrite: 'localhost',
        headers: {
          'Access-Control-Allow-Origin': process.env.FRONTEND_URL,
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
        }
      }
    },
    storage: {
      shield: {
        driver: 'memory'
      }
    },
    experimental: {
      tasks: true
    },
    scheduledTasks: {
      '*/15 * * * *': ['shield:clean'] // clean expired bans every 15 minutes
    }
  },
  icon: {
    serverBundle: {
      collections: ['fa']
    }
  },
})