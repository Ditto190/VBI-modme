import { ReportDetailPage } from '../../../../views/ReportDetailPage'

type ManageReportDetailRouteProps = {
  params: Promise<{ id: string }>
}

const ManageReportDetailRoute = async ({ params }: ManageReportDetailRouteProps) => {
  const { id } = await params
  return <ReportDetailPage id={id} />
}

export default ManageReportDetailRoute
