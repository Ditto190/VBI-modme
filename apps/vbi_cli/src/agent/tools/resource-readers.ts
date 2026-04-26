export type ResourceAction = 'create' | 'get' | 'list' | 'references' | 'remove' | 'rename' | 'snapshot'

export const stringifyJson = (value: unknown) => JSON.stringify(value, null, 2)

export const readString = (input: Record<string, unknown>, key: string) =>
  typeof input[key] === 'string' && input[key].trim() ? input[key] : undefined

export const requireString = (input: Record<string, unknown>, key: string) => {
  const value = readString(input, key)
  if (!value) throw new Error(`vbi_resource.${key} is required`)
  return value
}

export const readResource = (input: Record<string, unknown>) => {
  const value = input.resource
  if (value === 'chart' || value === 'insight' || value === 'report') return value
  throw new Error('vbi_resource.resource must be chart, insight, or report')
}

export const readAction = (input: Record<string, unknown>): ResourceAction => {
  const value = input.action
  if (
    value === 'create' ||
    value === 'get' ||
    value === 'list' ||
    value === 'references' ||
    value === 'remove' ||
    value === 'rename' ||
    value === 'snapshot'
  ) {
    return value
  }
  throw new Error('vbi_resource.action is invalid')
}

export const createInput = (input: Record<string, unknown>) => ({
  ...(readString(input, 'name') ? { name: readString(input, 'name') } : {}),
})
