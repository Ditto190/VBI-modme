import type { ResourceKind } from '../../types'
import { resolveApplicationRoute } from '../routing/route'

export const resolveResourceDetailRoute = (kind: ResourceKind, id: string) => {
  if (kind === 'chart') return resolveApplicationRoute({ name: 'chartDetail', id })
  if (kind === 'insight') return resolveApplicationRoute({ name: 'insightDetail', id })
  return resolveApplicationRoute({ name: 'reportDetail', id })
}

export const resolveResourceListRoute = (kind: ResourceKind) => {
  if (kind === 'chart') return resolveApplicationRoute({ name: 'chart' })
  if (kind === 'insight') return resolveApplicationRoute({ name: 'insight' })
  return resolveApplicationRoute({ name: 'report' })
}
