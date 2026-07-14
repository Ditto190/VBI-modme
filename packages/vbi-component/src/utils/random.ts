/**
 * Generates a short random ID string
 * Contains lowercase letters and numbers, max length of 7 characters.
 * @returns A short random ID string.
 */
export const randomShortId = (): string => {
  return Math.random().toString(36).slice(2, 9)
}
