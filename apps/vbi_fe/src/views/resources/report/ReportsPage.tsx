import { ResourceListPage } from '../shared/ResourceListPage'

export const ReportsPage = () => (
  <ResourceListPage
    kind='report'
    labels={{
      create: 'reports.create',
      deleteTitle: 'reports.deleteTitle',
      title: 'reports.title',
      untitled: 'reports.untitled',
    }}
  />
)
