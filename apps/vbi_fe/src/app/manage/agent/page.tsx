'use client'

import dynamic from 'next/dynamic'

const AgentPage = dynamic(() => import('../../../views/AgentPage').then((module) => module.AgentPage), {
  ssr: false,
})

const ManageAgentPage = () => <AgentPage />

export default ManageAgentPage
