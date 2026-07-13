export type AgentCommandMode = 'prompt' | 'tui'

export interface AgentCommand {
  apiBaseUrl?: string
  mode: AgentCommandMode
  model?: string
  provider?: string
  task?: string
}

export interface CliIO {
  writeError?(text: string): void
  writeOutput?(text: string): void
}
