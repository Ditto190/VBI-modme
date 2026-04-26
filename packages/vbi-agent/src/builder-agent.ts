import { createAgentRuntime } from './runtime.js'
import { createBuilderTools } from './tools/builder-tools.js'
import { createToolKit } from './tools/toolkit.js'
import type { AgentRuntimeController, VBIBuilderAgentInput } from './types.js'

export const createVBIBuilderAgent = ({ model, tools = [], workspace }: VBIBuilderAgentInput): AgentRuntimeController =>
  createAgentRuntime({
    model,
    tool: createToolKit([...createBuilderTools(workspace), ...tools]),
  })
