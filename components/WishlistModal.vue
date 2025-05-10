<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <!-- Background overlay -->
      <div class="fixed inset-0 bg-black/50 dark:bg-black/70 transition-opacity" @click="close"></div>

      <!-- Modal panel -->
      <div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div v-if="isOpen" class="relative transform overflow-hidden rounded-lg bg-background dark:bg-dark-background text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <!-- Header -->
            <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-text dark:text-dark-text" id="modal-title">
                  {{ isAuthenticated ? $t('wishlist.title') : $t('auth.loginTitle') }}
                </h3>
                <button
                  @click="close"
                  class="rounded-lg p-2 text-text/50 dark:text-dark-text/50 hover:text-text dark:hover:text-dark-text transition-colors duration-200"
                >
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Content -->
            <div class="px-4 pb-5 sm:p-6">
              <template v-if="isAuthenticated">
                <p class="text-sm text-text/70 dark:text-dark-text/70">
                  {{ $t('wishlist.comingSoon') }}
                </p>
              </template>
              <template v-else>
                <LoginForm @success="close" />
              </template>
            </div>

            <!-- Footer -->
            <div v-if="isAuthenticated" class="bg-background-light dark:bg-dark-background-light px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                @click="close"
                class="inline-flex w-full justify-center rounded-lg bg-primary dark:bg-dark-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-dark dark:hover:bg-dark-primary-dark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary focus:ring-offset-2 sm:ml-3 sm:w-auto transition-colors duration-200"
              >
                {{ $t('common.close') }}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import LoginForm from '~/components/auth/LoginForm.vue'

defineOptions({
  components: {
    LoginForm
  }
})

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { isAuthenticated } = useAuth()

const close = () => {
  emit('close')
}
</script> 