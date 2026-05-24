import { createVBIProviderResourceTools, type VBIProviderAgentTool } from './resource-tools'
import { createVBIProviderWorkspace, type VBIProviderWorkspace } from './workspace'
import type { VBIProviderClient } from '../types'

export interface VBIProviderAgentAdapterOptions {
  chartId?: string
  client: VBIProviderClient
  insightId?: string
  reportId?: string
}

export interface VBIProviderAgentAdapter {
  tools: VBIProviderAgentTool[]
  workspace: VBIProviderWorkspace
}

export const createVBIProviderAgentAdapter = ({
  chartId,
  client,
  insightId,
  reportId,
}: VBIProviderAgentAdapterOptions): VBIProviderAgentAdapter => ({
  tools: createVBIProviderResourceTools(client),
  workspace: createVBIProviderWorkspace({ chartId, client, insightId, reportId }),
})
