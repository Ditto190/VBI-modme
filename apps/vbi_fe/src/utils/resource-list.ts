import type { ResourceItem } from '../types'

export const matchesResourceSearch = (item: ResourceItem, query: string) => {
  const value = query.trim().toLowerCase()
  if (!value) return true
  return [item.id, item.name ?? ''].some((field) => field.toLowerCase().includes(value))
}

export const getFilteredResourceIds = (items: ResourceItem[], searchText: string) =>
  items.filter((item) => matchesResourceSearch(item, searchText)).map((item) => item.id)
