import type { Tags } from "@/types";

/**
 * Преобразует массив тегов в отформатированную строку
 * @param {Tags} tags - массив тегов для преобразования
 * @returns {string} Строка с тегами в верхнем регистре, разделенными точкой с запятой
 */
export function formatTagsToString(tags: Tags): string {
  if (!Array.isArray(tags)) {
    return ''
  }
  
  return tags.map(tag => tag.text.toUpperCase()).join('; ')
}