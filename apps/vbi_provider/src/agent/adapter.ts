import { createVBIProviderWorkspace, type VBIProviderWorkspace } from './workspace'
import type { VBIProviderClient } from '../types'
import { createVBIResourceTools, type AgentTool } from '@visactor/vbi-agent'

export interface VBIProviderAgentAdapterOptions {
  chartId?: string
  client: VBIProviderClient
  insightId?: string
  reportId?: string
}

export interface VBIProviderAgentAdapter {
  tools: AgentTool[]
  workspace: VBIProviderWorkspace
}

export const createVBIProviderAgentAdapter = ({
  chartId,
  client,
  insightId,
  reportId,
}: VBIProviderAgentAdapterOptions): VBIProviderAgentAdapter => {
  const workspace = createVBIProviderWorkspace({ chartId, client, insightId, reportId })
  return {
    tools: createVBIResourceTools({ workspace }),
    workspace,
  }
}
