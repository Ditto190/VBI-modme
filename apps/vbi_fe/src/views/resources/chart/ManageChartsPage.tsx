import { ResourceListPage } from '../shared/ResourceListPage'

export const ManageChartsPage = () => (
  <ResourceListPage
    kind='chart'
    labels={{
      create: 'charts.create',
      deleteTitle: 'charts.deleteTitle',
      title: 'charts.title',
      untitled: 'charts.untitled',
    }}
    userNameActivation
  />
)
