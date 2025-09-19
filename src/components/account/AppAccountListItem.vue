<template>
  <li class="app-account-list-item" :class="{ 'without-password':  !hasPasswordField }">
    <div class="app-account-list-item__fields">
      <AFormItem
        :name="['accounts', index, 'tags']"
        :rules="tagValidationRules"
      >
        <AInput 
          :value="localTagsString" 
          :maxlength="MAX_TAG_LENGTH" 
          :placeholder="TAGS_PLACEHOLDER"
          autocomplete="off"
          @blur="handleTagsBlur"
          @input="handleTagsInput"
        />
      </AFormItem>

      <AFormItem
        :name="['accounts', index, 'recordType']"
        :rules="recordTypeValidationRules"
      >
        <ASelect 
          :value="localAccount.recordType" 
          :options="recordTypeOptions"
          :placeholder="RECORD_TYPE_PLACEHOLDER" 
          @change="handleRecordTypeChange"
        />
      </AFormItem>

      <AFormItem
        :name="['accounts', index, 'login']"
        :rules="loginValidationRules"
      >
        <AInput 
          :value="localAccount.login"
          :maxlength="MAX_LOGIN_LENGTH" 
          :placeholder="LOGIN_PLACEHOLDER"
          autocomplete="username"
          @input="(e: Event) => handleInputChange(e, 'login')"
          @blur="() => handleFieldBlur('login')"
        />
      </AFormItem>

      <AFormItem
        v-if="hasPasswordField"
        :name="['accounts', index, 'password']"
        :rules="passwordValidationRules"
      >
        <AInputPassword 
          :value="localAccount.password" 
          :maxlength="MAX_PASSWORD_LENGTH" 
          :placeholder="PASSWORD_PLACEHOLDER"
          autocomplete="current-password"
          @input="(e: Event) => handleInputChange(e, 'password')"
          @blur="() => handleFieldBlur('password')"
        />
      </AFormItem>
    </div>

    <AButton 
      class="app-account-list-item__button" 
      type="link" 
      danger 
      size="large"
      :aria-label="REMOVE_BUTTON_LABEL"
      @click="handleRemoveAccount"
    >
      <DeleteOutlined />
    </AButton>
  </li>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import type { Rule } from 'ant-design-vue/es/form'
import type { Account, RecordTypes, RecordTypeValue } from '@/types'
import { 
  DEBOUNCE_DELAY,
  LOGIN_PLACEHOLDER, 
  MAX_LOGIN_LENGTH, 
  MAX_PASSWORD_LENGTH, 
  MAX_TAG_LENGTH,
  PASSWORD_PLACEHOLDER, 
  RECORD_TYPE_PLACEHOLDER, 
  REMOVE_BUTTON_LABEL, 
  REQUIRED_MESSAGE, 
  TAGS_PLACEHOLDER,
  TAG_INPUT_REGEXP,
} from '@/constants'
import { formatTagsToString } from '@/utils/formatTagsToString'
import { parseTagsString } from '@/utils/parseTagsString'
import { validateTags } from '@/utils/validateTags'
import { debounce } from '@/utils/debounce'

const props = defineProps<{
  account: Account,
  index: number,
}>()

const emits = defineEmits<{
  'update:account': [value: Account]
  'remove:account': [value: string]
}>()

const safeAccount = computed(() => props.account || { id: '', tags: [], recordType: '', login: '', password: '' })
const localAccount = ref({ ...safeAccount.value })
const localTagsString = ref(formatTagsToString(safeAccount.value.tags) || '')

const recordTypeOptions = ref<RecordTypes>([
  { value: 'LOCAL', label: 'Локальная' },
  { value: 'LDAP', label: 'LDAP' }
])

const tagValidationRules: Rule[] = [{ validator: validateTags }]

const recordTypeValidationRules: Rule[] = [{
  required: true,
  message: REQUIRED_MESSAGE,
  validator: () => {
    if (!localAccount.value.recordType) return Promise.reject(REQUIRED_MESSAGE)
    return Promise.resolve()
  }
}]

const loginValidationRules: Rule[] = [{
  required: true,
  message: REQUIRED_MESSAGE,
  validator: () => {
    if (!localAccount.value.login) return Promise.reject(REQUIRED_MESSAGE)
    return Promise.resolve()
  }
}]

const passwordValidationRules: Rule[] = [{
  required: true,
  message: REQUIRED_MESSAGE,
  validator: () => {
    if (localAccount.value.recordType !== 'LDAP' && !localAccount.value.password) {
      return Promise.reject(REQUIRED_MESSAGE)
    }
    return Promise.resolve()
  }
}]

const hasPasswordField = computed(() => localAccount.value.recordType !== 'LDAP')

const handleInputChange = (event: Event, field: 'login' | 'password') => {
  const input = event.target as HTMLInputElement
  localAccount.value[field] = input.value
  debouncedSave(field)
}

const handleRecordTypeChange = (value: RecordTypeValue) => {
  localAccount.value.recordType = value
  debouncedSave('recordType')
}

const handleTagsBlur = async () => {
  const cleanedValue = (localTagsString.value || '').replace(TAG_INPUT_REGEXP, '')
  localTagsString.value = cleanedValue
  localAccount.value.tags = parseTagsString(cleanedValue)
  debouncedSave('tags')
}

const handleTagsInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  const cursorPosition = input.selectionStart
  const originalValue = input.value || ''
  
  const processedValue = originalValue.toUpperCase().replace(TAG_INPUT_REGEXP, '')
  localTagsString.value = processedValue
  
  nextTick(() => {
    input.setSelectionRange(cursorPosition, cursorPosition)
  })
}

const handleFieldBlur = (field: string) => {
  debouncedSave(field)
}

const handleRemoveAccount = () => emits('remove:account', safeAccount.value.id)

const saveIfValid = async () => {
  const isAllValid = validateLocalFields()

  if (isAllValid) {
    emits('update:account', { ...localAccount.value })
  }
} 

const debouncedSave = debounce(() => saveIfValid(), DEBOUNCE_DELAY)

const validateLocalFields = (): boolean => {
  if (!localAccount.value.recordType) return false
  if (!localAccount.value.login) return false
  if (localAccount.value.recordType !== 'LDAP' && !localAccount.value.password) return false
  return true
}

watch(() => props.account, (newAccount) => {
  if (newAccount && newAccount.id === localAccount.value.id) {
    localAccount.value = { ...newAccount }
    localTagsString.value = formatTagsToString(newAccount.tags) || ''
  }
}, { deep: true })
</script>

<style lang="sass" scoped>
@use './AppAccountListItem.sass'
</style>