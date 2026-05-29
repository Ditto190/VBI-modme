import { ChartEditorPage } from '../../../../views/manage-resource/ChartEditorPage'

type ManageChartEditorRouteProps = {
  params: Promise<{ id: string }>
}

const ManageChartEditorRoute = async ({ params }: ManageChartEditorRouteProps) => {
  const { id } = await params
  return <ChartEditorPage id={id} />
}

export default ManageChartEditorRoute
