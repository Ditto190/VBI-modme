import { AgentRouteClient } from '../../../views/AgentRouteClient'

const AgentLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AgentRouteClient />
    {children}
  </>
)

export default AgentLayout
