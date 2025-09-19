<template>
  <main class="app-main container">
    <AAlert
      v-if="shouldShowNotification"
      :message="notificationMessage"
      type="info"
      show-icon
      closable
      @close="hideNotification"
    />
    <AppAccountList @show-notification="showNotification"/>
  </main>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app.store'
import { useNotification } from '@/composables/useNotification'
import AppAccountList from '@/components/account/AppAccountList.vue'
import { formatTagsToString } from '@/utils/formatTagsToString'

const appStore = useAppStore()
const { accounts } = storeToRefs(appStore)
const { isVisible, hideNotification, showNotification } = useNotification()

const hasTagsWithoutSemicolon = computed(() => {
  return accounts.value.some(account => {
    const tagsString = formatTagsToString(account.tags)
    const tagsArray = tagsString.split(';').filter(tag => tag.trim())
    
    return tagsArray.length === 1 && !tagsString.includes(';')
  })
})

const shouldShowNotification = computed(() => isVisible.value && hasTagsWithoutSemicolon.value)

const notificationMessage = "Для указания нескольких меток для одной пары логин/пароль используйте разделитель ';'"

watch(accounts, () => {
  if (hasTagsWithoutSemicolon.value) {
    showNotification()
  }
}, { deep: true })
</script>

<style lang="sass" scoped>
@use './AppMain.sass'
</style>