import type { AgentRuntimeController } from '@visactor/vbi-agent'

export type AgentCommandMode = 'prompt' | 'tui'

export interface AgentCommand {
  apiBaseUrl?: string
  cwd?: string
  mode: AgentCommandMode
  model?: string
  task?: string
}

export interface AgentAppProps {
  onExit(code: number): void
  runtime: AgentRuntimeController
  task?: string
}

export interface BashCommandResult {
  exitCode: number | null
  output: string
  signal: NodeJS.Signals | null
}

export interface CliIO {
  writeError?(text: string): void
  writeOutput?(text: string): void
}

export type CommonProvider<TCreate> = {
  create(input: TCreate): Promise<unknown>
  getDetail(): Promise<unknown>
  remove(): Promise<unknown>
  rename(name: string): Promise<unknown>
  snapshot(): Promise<unknown>
}

export type Resource = 'chart' | 'insight' | 'report'

export type ResourceInput = Record<string, unknown>
