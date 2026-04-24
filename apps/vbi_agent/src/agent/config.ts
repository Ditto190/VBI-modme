import path from 'node:path'
import type { AgentCommand } from '../parse.js'

const readEnv = (name: string) => process.env[name]?.trim()

const resolveCwd = (cwd?: string) => (cwd ? path.resolve(process.cwd(), cwd) : process.cwd())

export const createAgentConfig = (command: AgentCommand) => ({
  model: {
    apiKey: readEnv('AGENT_API_KEY'),
    baseUrl: readEnv('AGENT_BASE_URL'),
    model: command.model ?? readEnv('AGENT_MODEL'),
  },
  runtime: {
    cwd: resolveCwd(command.cwd),
    timeoutMs: 30000,
  },
})
