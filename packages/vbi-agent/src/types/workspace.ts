import type { VBIChartBuilder, VBIReportBuilder } from '@visactor/vbi'
import type { ModelProvider } from './model.js'
import type { VBITool } from './tool.js'

export interface VBIWorkspaceSlot<TBuilder = unknown> {
  describe?(id?: string): Promise<unknown> | unknown
  open(id?: string): Promise<TBuilder>
  save?(id?: string): Promise<void>
}

export interface VBIAgentWorkspace {
  chart?: VBIWorkspaceSlot<VBIChartBuilder>
  report?: VBIWorkspaceSlot<VBIReportBuilder>
}

export interface VBIBuilderAgentInput {
  model: ModelProvider
  tools?: VBITool[]
  workspace: VBIAgentWorkspace
}
