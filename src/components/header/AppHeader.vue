<template>
  <header class="app-header">
    <div class="container">
      <h1>Учётные записи</h1>
      <AButton class="app-header__button-add" :class="{'dynamic': !isAccount}" :danger="!isAccount"  @click="handleAddAccount"> <PlusOutlined /> </AButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { PlusOutlined } from '@ant-design/icons-vue'
import { useAppStore } from '@/stores/app.store'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { isAccount } = storeToRefs(appStore)

const handleAddAccount = () => {
  appStore.addAccount({ 
    id: Date.now().toString(),
    tags: [],
    recordType: null,
    login: null,
    password: null,
  })
}

</script>

<style lang="sass" scoped>
@use './AppHeader.sass'
</style>