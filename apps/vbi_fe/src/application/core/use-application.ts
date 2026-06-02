import * as React from 'react'
import { useSyncExternalStore } from 'react'
import { applicationObjectIs } from './equality'
import { getApplicationSnapshot, subscribeApplicationSnapshot } from './subscribe'
import type { ApplicationHookOptions, ApplicationSelector } from './store'

type ReactWithClientInternals = typeof React & {
  __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?: {
    H: {
      useSyncExternalStore?: (...args: never[]) => unknown
    } | null
  }
}

const getReactDispatcher = () =>
  (React as ReactWithClientInternals).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?.H

const canUseReactHooks = () => {
  const dispatcherUseSyncExternalStore = getReactDispatcher()?.useSyncExternalStore
  if (typeof dispatcherUseSyncExternalStore !== 'function') return false
  return dispatcherUseSyncExternalStore.name !== 'throwInvalidHookError'
}

export const useApplication = <TSelected>(
  selector: ApplicationSelector<TSelected>,
  options: ApplicationHookOptions<TSelected> = {},
) => {
  if (!canUseReactHooks()) return selector(getApplicationSnapshot())

  const equality = options.equality ?? applicationObjectIs
  let selectedSnapshot = selector(getApplicationSnapshot())

  return useSyncExternalStore(
    subscribeApplicationSnapshot,
    () => {
      const nextSelected = selector(getApplicationSnapshot())
      if (equality(selectedSnapshot, nextSelected)) return selectedSnapshot
      selectedSnapshot = nextSelected
      return nextSelected
    },
    () => selectedSnapshot,
  )
}
