import type { Tags } from "@/types"

/**
 * Преобразует строку с тегами в массив объектов тегов
 * @param {string} tagsStr - строка с тегами, разделенными точкой с запятой
 * @returns {Tags} Массив объектов тегов
 */
export function parseTagsString (tagsStr: string): Tags {
  if (!tagsStr || typeof tagsStr !== 'string') {
    return []
  }

  return tagsStr
    .split(';')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
    .map(tag => ({ text: tag }))
}
