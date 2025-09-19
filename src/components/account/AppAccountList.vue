<template>
  <ul class="app-account-list">
    <template v-if="accounts.length > 0">
      <div class="app-account-list__header">
        <span class="app-account-list__header-item">Метки</span>
        <span class="app-account-list__header-item">Тип записи</span>
        <span class="app-account-list__header-item">Логин</span>
        <span class="app-account-list__header-item">Пароль</span>
      </div>
      <AForm
        class="app-account-list__form"
        :model="{ accounts }"
        :validateOnRuleChange="false"
        :validateOnBlur="false"
        ref="formRef"
      >
        <AppAccountListItem 
          v-for="(item, idx) in accounts"
          :key="item.id" 
          :index="idx"
          :account="item"
          @update:account="handleUpdateAccount"
          @remove:account="handleRemoveAccount"
        />
      </AForm>
    </template>
    <div v-else class="app-account-list__empty">Нет данных</div>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import AppAccountListItem from './AppAccountListItem.vue'
import { useAppStore } from '@/stores/app.store'
import type { Account } from '@/types'

const emits = defineEmits<{
  'showNotification': [value: boolean]
}>()

const appStore = useAppStore()
const { accounts } = storeToRefs(appStore)
const formRef = ref()

const handleUpdateAccount = (updatedAccount: Account) => {
  appStore.updateAccount(updatedAccount)
  emits('showNotification', true)
}

const handleRemoveAccount = (id: string) => appStore.removeAccount(id)
</script>

<style lang="sass" scoped>
@use './AppAccountList.sass'
</style>