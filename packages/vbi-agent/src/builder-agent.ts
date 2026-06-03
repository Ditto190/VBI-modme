import { Agent, type AgentOptions, type AgentTool } from '@earendil-works/pi-agent-core'
import { systemPrompt as defaultSystemPrompt } from './history'
import { createVBIResourceTools } from './tools/resource-tools'
import type { VBIAgentWorkspace } from './types/index'

type VBIAgentInitialState = Omit<NonNullable<AgentOptions['initialState']>, 'tools'>

export interface VBIAgentOptions extends Omit<AgentOptions, 'initialState'> {
  initialState?: VBIAgentInitialState
  tools?: AgentTool[]
}

const createVBIAgentOptions = (options: VBIAgentOptions, workspace: VBIAgentWorkspace): AgentOptions => {
  const { initialState, tools, ...agentOptions } = options

  return {
    ...agentOptions,
    initialState: {
      messages: [],
      systemPrompt: defaultSystemPrompt,
      ...initialState,
      tools: tools ?? createVBIResourceTools({ workspace }),
    },
  }
}

export class VBIAgent extends Agent {
  constructor(options: VBIAgentOptions = {}, workspace: VBIAgentWorkspace = {}) {
    super(createVBIAgentOptions(options, workspace))
  }
}
