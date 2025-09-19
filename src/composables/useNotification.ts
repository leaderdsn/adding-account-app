import { ref } from 'vue'

export function useNotification(initialVisible = false) {
  const isVisible = ref(initialVisible)

  const showNotification = () => {
    isVisible.value = true
  }

  const hideNotification = () => {
    isVisible.value = false
  }

  return {
    isVisible,
    showNotification,
    hideNotification,
  }
}