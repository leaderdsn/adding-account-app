/**
 * Откладывает вызов переданной функции на заданный интервал
 * @param {Function} callback - функция, которую нужно вызвать с задержкой
 * @param {number} delay - интервал в миллисекундах
 * @returns {Function} Функция, которая при вызове откладывает выполнение callback на указанный delay
 */

import type { Nullable } from "@/types"

export const debounce = (callback: Function, delay: number): ((...args: unknown[]) => void) => {
  let timeoutId: Nullable<number> = null

  return (...args: unknown[]) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      callback(...args)
    }, delay) as unknown as number
  }
}
