export const stringifyJson = (value: unknown) => JSON.stringify(value, null, 2)

export const clipText = (value: string, limit = 4000) => {
  if (value.length <= limit) return value
  const half = Math.floor(limit / 2)
  return `${value.slice(0, half)}\n...\n${value.slice(-half)}`
}
