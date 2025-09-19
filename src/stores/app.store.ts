import type { Account, Accounts, Tags } from '@/types'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAppStore = defineStore(
  'app',
  () => {
    // State
    const accounts = ref<Accounts>([])

    // Getters
    const getAccountById = (id: string) => accounts.value.find(n => n.id === id)
    const isAccount = computed(() => accounts.value?.length > 0)

    // Actions
    const normalizeTags = (tags: Tags): Tags => {
      const uniqueTags = new Set()
      return tags
        .filter(tag => tag.text && tag.text.trim().length > 0)
        .filter(tag => {
          const normalizedText = tag.text.trim().toLowerCase()
          if (!uniqueTags.has(normalizedText)) {
            uniqueTags.add(normalizedText)
            return true
          }
          return false
        })
    }

    const addAccount = (account: Account) => {
      if (!getAccountById(account.id)) {
        const normalizedAccount: Account = {
          ...account,
          tags: normalizeTags(account.tags)
        }
        accounts.value.push(normalizedAccount)
      }
    }

    const updateAccount = (updatedAccount: Account) => {
      const index = accounts.value.findIndex(acc => acc.id === updatedAccount.id)
      if (index !== -1) {
        accounts.value[index] = {
          ...updatedAccount,
          tags: normalizeTags(updatedAccount.tags)
        }
      }
    }

    const removeAccount = (id: string) => {
      accounts.value = accounts.value.filter(account => account.id !== id)
    }

    return {
      isAccount,
      accounts,
      getAccountById,
      addAccount,
      updateAccount,
      removeAccount,
    }
  },
  {
    persist: true,
  }
)