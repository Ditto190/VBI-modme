export type ApplicationRouteName =
  | 'agent'
  | 'chartDetail'
  | 'charts'
  | 'insightDetail'
  | 'insights'
  | 'reportDetail'
  | 'reports'

export type ApplicationRouteTarget =
  | { name: 'agent'; conversationId?: string }
  | { name: 'chartDetail'; id: string }
  | { name: 'charts' }
  | { name: 'insightDetail'; id: string }
  | { name: 'insights' }
  | { name: 'reportDetail'; id: string }
  | { name: 'reports' }
  | string

export type ApplicationRouteMatch =
  | { name: 'agent'; conversationId?: string }
  | { name: 'chartDetail'; id: string }
  | { name: 'charts' }
  | { name: 'insightDetail'; id: string }
  | { name: 'insights' }
  | { name: 'reportDetail'; id: string }
  | { name: 'reports' }
