import { Agent, type AgentOptions } from '@earendil-works/pi-agent-core'
import { systemPrompt as defaultSystemPrompt } from './history.js'
import { createBuilderTools } from './tools/builder-tools.js'
import type { VBIAgentWorkspace } from './types/index.js'

const createVBIAgentOptions = (options: AgentOptions, workspace: VBIAgentWorkspace): AgentOptions => ({
  ...options,
  initialState: {
    ...options.initialState,
    messages: options.initialState?.messages ?? [],
    systemPrompt: options.initialState?.systemPrompt ?? defaultSystemPrompt,
    tools: [...createBuilderTools(workspace), ...(options.initialState?.tools ?? [])],
  },
})

export class VBIAgent extends Agent {
  constructor(options: AgentOptions, workspace: VBIAgentWorkspace) {
    super(createVBIAgentOptions(options, workspace))
  }
}
