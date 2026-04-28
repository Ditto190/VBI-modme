import type { AgentActivity, AgentState, AgentStateListener } from './types/index.js'

const cloneState = (state: AgentState): AgentState => ({ ...state, activities: [...state.activities] })

export const createActivityLog = () => {
  const state: AgentState = { activities: [] }
  const listeners = new Set<AgentStateListener>()
  const getState = () => cloneState(state)
  const publish = () => listeners.forEach((listener) => listener(getState()))

  return {
    add: (kind: AgentActivity['kind'], text: string, detail?: string) => {
      state.activities.push({ detail, kind, text })
      publish()
    },
    clearError: () => {
      state.error = undefined
    },
    getState,
    setError: (error: unknown) => {
      state.error = error instanceof Error ? error.message : String(error)
      publish()
    },
    subscribe: (listener: AgentStateListener) => {
      listeners.add(listener)
      listener(getState())
      return () => void listeners.delete(listener)
    },
  }
}
