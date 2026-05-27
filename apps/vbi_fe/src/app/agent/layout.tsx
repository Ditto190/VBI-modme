'use client'

import dynamic from 'next/dynamic'
import { ManageLayoutPage } from '../../views/ManageLayoutPage'

const AgentPage = dynamic(() => import('../../views/AgentPage').then((module) => module.AgentPage), {
  ssr: false,
})

const AgentLayout = () => (
  <ManageLayoutPage>
    <AgentPage />
  </ManageLayoutPage>
)

export default AgentLayout
