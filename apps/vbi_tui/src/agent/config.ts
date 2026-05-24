import type { AgentCommand } from '../types/index.js'

const readEnv = (name: string) => process.env[name]?.trim()

const defaultAgentProvider = 'deepseek'
const defaultAgentModel = 'deepseek-v4-flash'

export const createAgentConfig = (command: AgentCommand) => ({
  model: {
    apiKey: readEnv('AGENT_API_KEY'),
    baseUrl: readEnv('AGENT_BASE_URL'),
    model: command.model ?? readEnv('AGENT_MODEL') ?? defaultAgentModel,
    provider: command.provider ?? readEnv('AGENT_PROVIDER') ?? defaultAgentProvider,
  },
  provider: {
    apiBaseUrl: command.apiBaseUrl ?? readEnv('VBI_API_BASE_URL') ?? 'http://localhost:3030/api/v1',
  },
})
