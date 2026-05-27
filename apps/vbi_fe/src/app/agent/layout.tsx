import { ManageLayoutPage } from '../../views/ManageLayoutPage'

export const dynamic = 'force-dynamic'

const AgentLayout = ({ children }: { children: React.ReactNode }) => <ManageLayoutPage>{children}</ManageLayoutPage>

export default AgentLayout
