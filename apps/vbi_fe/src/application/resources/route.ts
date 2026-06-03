import type { ResourceKind } from '../../types'
import { resolveApplicationRoute } from '../routing/route'

export const resolveResourceDetailRoute = (kind: ResourceKind, id: string) => {
  if (kind === 'chart') return resolveApplicationRoute({ name: 'chartDetail', id })
  if (kind === 'insight') return resolveApplicationRoute({ name: 'insightDetail', id })
  return resolveApplicationRoute({ name: 'reportDetail', id })
}

export const resolveResourceListRoute = (kind: ResourceKind) => {
  if (kind === 'chart') return resolveApplicationRoute({ name: 'charts' })
  if (kind === 'insight') return resolveApplicationRoute({ name: 'insights' })
  return resolveApplicationRoute({ name: 'reports' })
}
