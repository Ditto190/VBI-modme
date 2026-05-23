export type ResourceKind = 'chart' | 'insight' | 'report'

export type ResourceItem = {
  id: string
  name: string | null
  createdAt: string
  updatedAt: string
}
