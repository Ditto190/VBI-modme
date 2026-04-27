export interface AgentScriptRuntimeInput {
  code: string
  globals?: Record<string, unknown>
}

export interface AgentScriptRuntimeResult {
  logs: string[]
  result: unknown
}
