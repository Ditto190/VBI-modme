import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const ManageAgentPage = () => {
  redirect('/agent')
}

export default ManageAgentPage
