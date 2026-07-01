/**
 * Generates a random v4 UUID.
 * @returns A random UUID string.
 */
export const randomUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * Generates a short random ID string
 * Contains lowercase letters and numbers, max length of 7 characters.
 * @returns A short random ID string.
 */
export const randomShortId = (): string => {
  return Math.random().toString(36).slice(2, 9)
}
