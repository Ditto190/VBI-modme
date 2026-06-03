import { beforeEach, describe, expect, rs, test } from '@rstest/core'

type MockAgentTool = {
  name: string
}

type MockAgentOptions = {
  initialState?: {
    messages?: unknown[]
    model?: unknown
    thinkingLevel?: string
    tools?: unknown[]
  }
  tools?: MockAgentTool[]
}

const constructedAgents: Array<{ options: MockAgentOptions }> = []

class MockVBIAgent {
  state: {
    errorMessage: string
    isStreaming: boolean
    messages: unknown[]
    model: unknown
    streamingMessage: null
    thinkingLevel: string
    tools: MockAgentTool[]
  }

  constructor(options: MockAgentOptions) {
    constructedAgents.push({ options })
    this.state = {
      errorMessage: '',
      isStreaming: false,
      messages: options.initialState?.messages ?? [],
      model: options.initialState?.model,
      streamingMessage: null,
      thinkingLevel: options.initialState?.thinkingLevel ?? 'high',
      tools: options.tools ?? [],
    }
  }

  abort = rs.fn()
  prompt = rs.fn(async () => undefined)
  subscribe = rs.fn(() => rs.fn())
  waitForIdle = rs.fn(async () => undefined)
}

rs.mock('@visactor/vbi-agent', () => ({
  VBIAgent: MockVBIAgent,
}))

const { fallbackAgentBackendConfig } = await import('../src/application/agent/agent-model-config')
const { createAgentConversationRuntime } = await import('../src/application/agent/agent-runtime')

const createStorage = () => ({
  conversations: {
    delete: rs.fn(async () => undefined),
    get: rs.fn(async () => null),
    getAllMetadata: rs.fn(async () => []),
    rename: rs.fn(async () => null),
    save: rs.fn(async () => undefined),
  },
})

describe('agent runtime application tools', () => {
  beforeEach(() => {
    constructedAgents.length = 0
    rs.clearAllMocks()
  })

  test('constructs the browser VBIAgent with only application tools', async () => {
    const runtime = await createAgentConversationRuntime({
      agentConfig: fallbackAgentBackendConfig,
      storage: createStorage(),
    })

    expect(constructedAgents).toHaveLength(1)
    expect(constructedAgents[0]?.options.tools?.map((tool) => tool.name)).toEqual(['read_skill', 'vbi_application'])
    expect(constructedAgents[0]?.options.initialState.tools).toBeUndefined()

    runtime.destroy()
  })
})
