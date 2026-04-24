const normalize = (value: string) => value.trim()

export const matchByIdOrField = (
  item: { getField?: () => string; getId?: () => string },
  target: { field?: string; id?: string },
) => {
  if (target.id && item.getId?.() === normalize(target.id)) return true
  if (target.field && item.getField?.() === normalize(target.field)) return true
  return false
}

export const requireTarget = (input: { field?: string; id?: string }, label: string) => {
  if (input.id || input.field) return input
  throw new Error(`${label} target requires id or field`)
}
