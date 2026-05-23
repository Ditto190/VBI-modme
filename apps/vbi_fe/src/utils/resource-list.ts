import type { ResourceItem } from '../types'

export const matchesResourceSearch = (item: ResourceItem, query: string) => {
  const value = query.trim().toLowerCase()
  if (!value) return true
  return [item.id, item.name ?? ''].some((field) => field.toLowerCase().includes(value))
}
