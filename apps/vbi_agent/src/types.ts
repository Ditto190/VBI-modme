export interface AgentCommand {
  cwd?: string
  kind: 'agent'
  model?: string
  task?: string
}

export interface CliStreams {
  stderr: { write(chunk: string): unknown }
}

export interface CliRunDeps {
  runAgent?(command: AgentCommand): Promise<number> | number
  stderr?: CliStreams['stderr']
}
