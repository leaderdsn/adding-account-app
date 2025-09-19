import { MAX_TAGS_COUNT } from "@/constants"
import type { Rule } from "ant-design-vue/es/form"

/**
 * Валидатор для проверки строки тегов на соответствие требованиям
 * @param {Rule} _rule - объект правила валидации (не используется)
 * @param {any} value - значение для валидации (ожидается строка с тегами)
 * @returns {Promise<void>} Promise, который resolve при успешной валидации или reject с ошибкой
 */

export const validateTags: Rule['validator'] = async (_rule: Rule, value: unknown): Promise<void> => {
  
  if (!value || typeof value !== 'string' || value?.length === 0) return Promise.resolve()
  
  if (!/^[A-Z; ]*$/.test(value)) {
    return Promise.reject('Можно вводить только заглавные латинские буквы и точку с запятой')
  }
  
  const tagsCount = value.split(';').filter((tag: string) => tag.trim()).length
  if (tagsCount > MAX_TAGS_COUNT) {
    return Promise.reject(`Максимум ${MAX_TAGS_COUNT} меток`)
  }

  return Promise.resolve()
}