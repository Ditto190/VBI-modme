import { useSyncExternalStore } from 'react'
import { canonicalizeApplicationPathname } from './route'

let navigate: ((path: string) => void) | null = null
let pathname = ''
const listeners = new Set<() => void>()

const emitNavigationChange = () => {
  listeners.forEach((listener) => listener())
}

export const subscribeApplicationNavigation = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getApplicationPathname = () => pathname

export const bindApplicationNavigation = (nextNavigate: (path: string) => void) => {
  if (navigate === nextNavigate) return
  navigate = nextNavigate
  emitNavigationChange()
}

export const setApplicationPathname = (nextPathname: string) => {
  const canonicalPathname = canonicalizeApplicationPathname(nextPathname)
  if (pathname === canonicalPathname) return
  pathname = canonicalPathname
  emitNavigationChange()
}

export const goApplicationPath = (path: string) => {
  if (pathname === path) return
  navigate?.(path)
}

export const useApplicationPathname = () =>
  useSyncExternalStore(subscribeApplicationNavigation, getApplicationPathname, getApplicationPathname)
