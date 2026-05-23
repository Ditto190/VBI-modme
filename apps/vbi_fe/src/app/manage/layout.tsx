import { ManageLayoutPage } from '../../views/ManageLayoutPage'

export const dynamic = 'force-dynamic'

const ManageLayout = ({ children }: { children: React.ReactNode }) => <ManageLayoutPage>{children}</ManageLayoutPage>

export default ManageLayout
