import { useSyncExternalStore } from 'react'
import { applicationObjectIs } from './equality'
import { application } from './store'
import type { ApplicationHookOptions, ApplicationSelector } from './store'

export const useApplication = <TSelected>(
  selector: ApplicationSelector<TSelected>,
  options: ApplicationHookOptions<TSelected> = {},
) => {
  const equality = options.equality ?? applicationObjectIs
  let selectedSnapshot = selector(application.getState())

  return useSyncExternalStore(
    application.subscribe,
    () => {
      const nextSelected = selector(application.getState())
      if (equality(selectedSnapshot, nextSelected)) return selectedSnapshot
      selectedSnapshot = nextSelected
      return nextSelected
    },
    () => selectedSnapshot,
  )
}
