<template>
  <div class="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-background dark:bg-dark-background">
    <div class="max-w-md w-full space-y-6">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-dark-primary/10 rounded-2xl flex items-center justify-center">
          <BookOpenIcon class="h-8 w-8 text-primary dark:text-dark-primary" />
        </div>
        <h2 class="text-2xl font-bold text-text dark:text-dark-text">
          Edit Profile
        </h2>
        <p class="mt-2 text-sm text-secondary-text dark:text-dark-text">
          Update your profile information and password
        </p>
      </div>

      <form class="mt-4 space-y-3" @submit.prevent="updateProfile">
        <!-- Profile Picture -->
        <div class="flex items-center space-x-6">
          <div class="relative">
            <div class="w-24 h-24 rounded-full bg-primary/10 dark:bg-dark-primary/10 flex items-center justify-center">
              <svg
                v-if="!profilePicture"
                class="w-12 h-12 text-primary dark:text-dark-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <img
                v-else
                :src="profilePicture"
                alt="Profile"
                class="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <button
              @click="triggerFileInput"
              class="absolute bottom-0 right-0 p-1 bg-primary dark:bg-dark-primary rounded-full text-white hover:bg-primary/90 dark:hover:bg-dark-primary/90 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileChange"
            />
          </div>
          <div>
            <p class="text-sm text-text/70 dark:text-dark-text/70">Profile Picture</p>
            <p class="text-xs text-text/50 dark:text-dark-text/50">JPG, PNG or GIF. Max 2MB</p>
          </div>
        </div>

        <div class="rounded-md shadow-sm space-y-2">
          <!-- Username -->
          <div>
            <label for="username" class="sr-only">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="appearance-none relative block w-full px-3 py-2 border border-secondary dark:border-dark-secondary placeholder-secondary-text dark:placeholder-dark-text text-text dark:text-dark-text rounded-md focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary focus:z-10 sm:text-sm bg-background-light dark:bg-dark-background-light"
              placeholder="Username"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="sr-only">New Password</label>
            <div class="flex items-center">
              <input
                id="password"
                v-model="password"
                type="password"
                class="appearance-none relative block w-full px-3 py-2 border border-secondary dark:border-dark-secondary placeholder-secondary-text dark:placeholder-dark-text text-text dark:text-dark-text rounded-r-none rounded-l-md focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary focus:z-10 sm:text-sm bg-background-light dark:bg-dark-background-light"
                placeholder="New Password"
              />
              <button
                type="button"
                class="h-[38px] px-3 border border-l-0 border-secondary dark:border-dark-secondary rounded-r-md bg-background-light dark:bg-dark-background-light hover:bg-secondary/10 dark:hover:bg-dark-secondary/10 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                @click="showPassword = !showPassword"
                tabindex="-1"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5 text-secondary-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary" />
                <EyeSlashIcon v-else class="h-5 w-5 text-secondary-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary" />
              </button>
            </div>
            <p class="mt-2 text-sm text-text/70 dark:text-dark-text/70">
              Leave blank if you don't want to change your password
            </p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="sr-only">Confirm New Password</label>
            <div class="flex items-center">
              <input
                id="confirmPassword"
                v-model="confirmPassword"
                type="password"
                class="appearance-none relative block w-full px-3 py-2 border border-secondary dark:border-dark-secondary placeholder-secondary-text dark:placeholder-dark-text text-text dark:text-dark-text rounded-r-none rounded-l-md focus:outline-none focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary focus:z-10 sm:text-sm bg-background-light dark:bg-dark-background-light"
                placeholder="Confirm New Password"
              />
              <button
                type="button"
                class="h-[38px] px-3 border border-l-0 border-secondary dark:border-dark-secondary rounded-r-md bg-background-light dark:bg-dark-background-light hover:bg-secondary/10 dark:hover:bg-dark-secondary/10 focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-dark-primary focus:border-primary dark:focus:border-dark-primary"
                @click="showConfirmPassword = !showConfirmPassword"
                tabindex="-1"
              >
                <EyeIcon v-if="!showConfirmPassword" class="h-5 w-5 text-secondary-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary" />
                <EyeSlashIcon v-else class="h-5 w-5 text-secondary-text dark:text-dark-text hover:text-primary dark:hover:text-dark-primary" />
              </button>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-500 text-sm text-center">
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="success" class="text-green-500 text-sm text-center">
          Profile updated successfully!
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary dark:bg-dark-primary hover:bg-primary-dark dark:hover:bg-dark-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-dark-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <UserIcon class="h-5 w-5 text-white group-hover:text-white/80" aria-hidden="true" />
            </span>
            {{ isLoading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useApi } from '~/composables/useApi'
import { UserIcon, BookOpenIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

const { isAuthenticated } = useAuth()
const api = useApi()

interface UserProfile {
  username: string
  profilePicture: string
}

// Form state
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const profilePicture = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const isLoading = ref(false)
const error = ref('')
const success = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Fetch current profile data
const fetchProfile = async () => {
  try {
    const response = await api.get<UserProfile>('/users/me')
    username.value = response.username
    profilePicture.value = response.profilePicture
  } catch (err) {
    error.value = 'Failed to load profile data'
  }
}

// Handle file selection
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    if (file.size > 2 * 1024 * 1024) {
      error.value = 'File size must be less than 2MB'
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      profilePicture.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// Update profile
const updateProfile = async () => {
  isLoading.value = true
  error.value = ''
  success.value = false

  try {
    // Validate passwords match if either is provided
    if (password.value || confirmPassword.value) {
      if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        return
      }
      if (password.value.length < 8) {
        error.value = 'Password must be at least 8 characters long'
        return
      }
    }

    // Prepare the update data
    const updateData: Record<string, string> = {
      username: username.value
    }

    // Only include password if it's being changed
    if (password.value) {
      updateData.password = password.value
    }

    // Make the API call
    await api.put('/users/me', updateData)

    // Clear sensitive fields
    password.value = ''
    confirmPassword.value = ''

    // Show success message
    success.value = true

    // Hide success message after 3 seconds
    setTimeout(() => {
      success.value = false
    }, 3000)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to update profile'
  } finally {
    isLoading.value = false
  }
}

// Fetch profile data when component is mounted
onMounted(() => {
  fetchProfile()
})

// Protect route
definePageMeta({
  middleware: 'auth'
})
</script> 