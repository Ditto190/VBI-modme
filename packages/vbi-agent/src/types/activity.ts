export interface AgentActivity {
  detail?: string
  kind: 'assistant' | 'tool' | 'user'
  text: string
}

export interface AgentState {
  activities: AgentActivity[]
  error?: string
}

export type AgentStateListener = (snapshot: AgentState) => void
