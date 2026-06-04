import type { ApplicationCleanup } from './store'

export type LazyStore = {
  subscribe?: (listener: () => void) => unknown
}

const reportLazyLifecycleError = (error: unknown) => {
  console.error('VBI application lazy lifecycle failed', error)
}

export const subscribeLazyStore = (
  store: LazyStore | undefined,
  emit: () => void,
  subscribedStores: WeakSet<object>,
) => {
  if (!store || subscribedStores.has(store)) return
  store.subscribe?.(emit)
  subscribedStores.add(store)
}

export const runLazyCommand = async <TModule, TApplication, TResult>(
  loadModule: () => Promise<TModule>,
  getApplication: (module: TModule) => TApplication,
  command: (application: TApplication) => TResult | Promise<TResult>,
) => {
  const module = await loadModule()
  return command(getApplication(module))
}

export const runLazyLifecycleCommand = <TModule, TApplication>(
  loadModule: () => Promise<TModule>,
  getApplication: (module: TModule) => TApplication,
  command: (application: TApplication) => ApplicationCleanup,
): ApplicationCleanup => {
  let cleanup: ApplicationCleanup | null = null
  let disposed = false
  void loadModule()
    .then((module) => {
      if (disposed) return
      cleanup = command(getApplication(module))
      if (disposed) cleanup()
    })
    .catch((error) => {
      reportLazyLifecycleError(error)
    })

  return () => {
    if (disposed) return
    disposed = true
    cleanup?.()
  }
}
