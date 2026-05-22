import { redirect } from 'next/navigation'

type ReportDetailRedirectProps = {
  params: Promise<{ id: string }>
}

const ReportDetailRedirect = async ({ params }: ReportDetailRedirectProps) => {
  const { id } = await params
  redirect(`/manage/reports/${id}`)
}

export default ReportDetailRedirect
