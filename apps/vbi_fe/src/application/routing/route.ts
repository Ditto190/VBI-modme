import type { ApplicationRouteTarget } from './contract'

export const resolveApplicationRoute = (target: ApplicationRouteTarget) => {
  if (typeof target === 'string') return target

  switch (target.name) {
    case 'agent':
      return target.conversationId ? `/agent/${encodeURIComponent(target.conversationId)}` : '/agent'
    case 'chartDetail':
      return `/manage/charts/${encodeURIComponent(target.id)}`
    case 'charts':
      return '/manage/charts'
    case 'insightDetail':
      return `/manage/insights/${encodeURIComponent(target.id)}`
    case 'insights':
      return '/manage/insights'
    case 'reportDetail':
      return `/manage/reports/${encodeURIComponent(target.id)}`
    case 'reports':
      return '/manage/reports'
  }
}
