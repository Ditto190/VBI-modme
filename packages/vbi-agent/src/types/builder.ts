import type { ModelProvider } from './model.js'
import type { VBITool } from './tool.js'
import type { VBIAgentWorkspace } from './workspace.js'

export interface VBIBuilderAgentInput {
  model: ModelProvider
  tools?: VBITool[]
  workspace: VBIAgentWorkspace
}
