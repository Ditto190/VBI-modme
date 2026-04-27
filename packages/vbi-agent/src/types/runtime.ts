import type { AgentState } from './activity.js'
import type { ModelProvider } from './model.js'
import type { AgentToolKit } from './tool.js'

export interface AgentRuntimeController {
  getState(): AgentState
  start(task?: string): Promise<void>
  subscribe(listener: (snapshot: AgentState) => void): () => void
}

export type RuntimeInput = { model: ModelProvider; tool: AgentToolKit }
