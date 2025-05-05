import { useColorMode } from '@vueuse/core'

export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()
  
  // Set initial value to light if not already set
  if (colorMode.value === 'auto') {
    colorMode.value = 'light'
  }
}) 