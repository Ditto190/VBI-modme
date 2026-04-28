import { useEffect } from 'react'
import { setCollaborativeUser } from '../utils/collaboration'
import { useChartBuilderModel } from '../models/chart-builder.model'
import { useInsightBuilderModel } from '../models/insight-builder.model'
import { useReportBuilderModel } from '../models/report-builder.model'
import type { BuilderByKind, BuilderModel } from '../models/resource-builder.types'
import type { ResourceKind } from '../types'

const emptySession = {
  builder: null,
  provider: null,
}

const getModel = (kind: ResourceKind) => {
  if (kind === 'chart') return useChartBuilderModel
  if (kind === 'insight') return useInsightBuilderModel
  return useReportBuilderModel
}

export const useResourceBuilder = <TKind extends ResourceKind>(kind: TKind, resourceId: string, userName: string) => {
  const model = getModel(kind) as unknown as BuilderModel<BuilderByKind[TKind]>
  const session = model((state) => state.sessions[resourceId] ?? emptySession)

  useEffect(() => {
    if (!resourceId) return
    model.getState().retain(resourceId)
    void model.getState().connect(resourceId).catch(console.error)
    return () => {
      void model.getState().release(resourceId)
    }
  }, [model, resourceId])

  useEffect(() => {
    if (!resourceId) return
    setCollaborativeUser(session.provider, userName)
  }, [resourceId, session.provider, userName])

  return session
}
