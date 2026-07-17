import { ResourceListPage } from '../shared/ResourceListPage'

export const ManageInsightsPage = () => (
  <ResourceListPage
    kind='insight'
    labels={{
      create: 'insights.create',
      deleteTitle: 'insights.deleteTitle',
      title: 'insights.title',
      untitled: 'insights.untitled',
    }}
    userNameActivation
  />
)
