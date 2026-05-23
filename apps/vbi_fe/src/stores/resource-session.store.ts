import { useChartBuilderModel, useInsightBuilderModel, useReportBuilderModel } from '../models'
import { setCollaborativeUser } from '../utils/collaboration'
import type { BuilderByKind, BuilderModel } from '../models/resource-builder.types'
import type { ResourceKind } from '../types'

const modelByKind = {
  chart: useChartBuilderModel,
  insight: useInsightBuilderModel,
  report: useReportBuilderModel,
} satisfies Record<ResourceKind, BuilderModel<BuilderByKind[ResourceKind]>>

const getBuilderModel = <TKind extends ResourceKind>(kind: TKind) =>
  modelByKind[kind] as unknown as BuilderModel<BuilderByKind[TKind]>

export const connectResourceSession = async (kind: ResourceKind, resourceId: string, userName: string) => {
  if (!resourceId) return
  const model = getBuilderModel(kind)
  model.getState().retain(resourceId)
  await model.getState().connect(resourceId)
  setCollaborativeUser(model.getState().sessions[resourceId]?.provider, userName)
}

export const releaseResourceSession = async (kind: ResourceKind, resourceId: string) => {
  if (!resourceId) return
  await getBuilderModel(kind).getState().release(resourceId)
}
