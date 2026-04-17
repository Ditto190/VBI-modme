export type StarterDebugState = 'none' | 'empty' | 'error' | 'loading'

const VALID_DEBUG_STATES = new Set<StarterDebugState>(['empty', 'error', 'loading', 'none'])

export function readDebugState(search: string): StarterDebugState {
  const raw = new URLSearchParams(search).get('debugState') ?? 'none'
  return VALID_DEBUG_STATES.has(raw as StarterDebugState) ? (raw as StarterDebugState) : 'none'
}
