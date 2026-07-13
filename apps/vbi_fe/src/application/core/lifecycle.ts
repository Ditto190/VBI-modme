import type { ApplicationCleanup } from './store'

type ApplicationLifecycleOptions = {
  cancel?: () => void
  disposeImmediately?: boolean
  onError?: (error: unknown) => void
}

export const noopApplicationCleanup: ApplicationCleanup = () => undefined

export const createLatestApplicationLifecycle = () => {
  let version = 0

  return {
    start(
      activate: () => Promise<unknown> | unknown,
      dispose: () => Promise<unknown> | unknown,
      options: ApplicationLifecycleOptions = {},
    ): ApplicationCleanup {
      const lifecycleId = ++version
      let disposed = false
      let disposeStarted = false
      const activation = Promise.resolve()
        .then(activate)
        .catch((error) => {
          options.onError?.(error)
        })
      const runDispose = () => {
        if (disposeStarted) return undefined
        disposeStarted = true
        return dispose()
      }

      return () => {
        if (disposed || version !== lifecycleId) return
        disposed = true
        options.cancel?.()
        if (options.disposeImmediately) {
          void Promise.resolve()
            .then(runDispose)
            .catch(() => undefined)
        }
        void activation
          .finally(() => {
            if (version !== lifecycleId) return undefined
            return runDispose()
          })
          .catch(() => undefined)
      }
    },
  }
}
