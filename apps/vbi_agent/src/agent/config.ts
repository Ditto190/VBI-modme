import path from 'node:path'
import type { AgentCommand } from '../types.js'

const defaultBaseUrl = 'https://api.deepseek.com'
const defaultModel = 'deepseek-chat'

const readEnv = (name: string) => process.env[name]?.trim()

const resolveCwd = (cwd?: string) => (cwd ? path.resolve(process.cwd(), cwd) : process.cwd())

export const createAgentConfig = (command: AgentCommand) => ({
  model: {
    apiKey: readEnv('AGENT_API_KEY') ?? '',
    baseUrl: readEnv('AGENT_BASE_URL') ?? defaultBaseUrl,
    model: command.model ?? readEnv('AGENT_MODEL') ?? defaultModel,
  },
  runtime: {
    cwd: resolveCwd(command.cwd),
    timeoutMs: 30000,
  },
})
