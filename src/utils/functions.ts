/**
 * Модуль для функций
 */

/**
 * Разбить число на разряды
 */
export function formatPrice(value: number | null | undefined): string {
  if (value === null || value === undefined) value = 0;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
