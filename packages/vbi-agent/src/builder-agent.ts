import { Agent, type AgentOptions } from '@earendil-works/pi-agent-core'
import { systemPrompt as defaultSystemPrompt } from './history'
import { createVBIResourceTools } from './tools/resource-tools'
import type { VBIAgentWorkspace } from './types/index'

type VBIAgentInitialState = Omit<NonNullable<AgentOptions['initialState']>, 'tools'>

export interface VBIAgentOptions extends Omit<AgentOptions, 'initialState'> {
  initialState?: VBIAgentInitialState
}

const createVBIAgentOptions = (options: VBIAgentOptions, workspace: VBIAgentWorkspace): AgentOptions => ({
  ...options,
  initialState: {
    ...options.initialState,
    messages: options.initialState?.messages ?? [],
    systemPrompt: options.initialState?.systemPrompt ?? defaultSystemPrompt,
    tools: createVBIResourceTools({ workspace }),
  },
})

export class VBIAgent extends Agent {
  constructor(options: VBIAgentOptions, workspace: VBIAgentWorkspace) {
    super(createVBIAgentOptions(options, workspace))
  }
}
