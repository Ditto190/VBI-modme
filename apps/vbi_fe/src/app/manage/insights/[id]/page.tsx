import { InsightEditorPage } from '../../../../views/manage-resource/InsightEditorPage'

type ManageInsightEditorRouteProps = {
  params: Promise<{ id: string }>
}

const ManageInsightEditorRoute = async ({ params }: ManageInsightEditorRouteProps) => {
  const { id } = await params
  return <InsightEditorPage id={id} />
}

export default ManageInsightEditorRoute
