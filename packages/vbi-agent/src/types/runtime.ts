export interface AgentActivity {
  detail?: string
  kind: 'assistant' | 'tool' | 'user'
  text: string
}

export interface AgentState {
  activities: AgentActivity[]
  error?: string
}

export interface AgentRuntimeController {
  getState(): AgentState
  start(task?: string): Promise<void>
  subscribe(listener: (snapshot: AgentState) => void): () => void
}
