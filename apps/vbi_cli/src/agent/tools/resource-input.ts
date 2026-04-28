import type { ResourceInput } from '../../types/index.js'

export const stringifyJson = (value: unknown) => JSON.stringify(value, null, 2)

export const readString = (input: ResourceInput, key: string) =>
  typeof input[key] === 'string' && input[key].trim() ? input[key] : undefined

export const requireString = (input: ResourceInput, key: string) => {
  const value = readString(input, key)
  if (!value) throw new Error(`vbi_resource.${key} is required`)
  return value
}
