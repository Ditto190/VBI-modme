import { useEffect } from 'react'
import { getSessionUserName } from '../utils/collaboration'

export const useStoreLifecycle = (bootstrap: () => void | Promise<void>, dispose?: () => void | Promise<void>) => {
  useEffect(() => {
    void Promise.resolve(bootstrap()).catch(() => undefined)
    return () => {
      void Promise.resolve(dispose?.()).catch(() => undefined)
    }
  }, [bootstrap, dispose])
}

export const useUserStoreLifecycle = (
  bootstrap: (userName: string) => void | Promise<void>,
  dispose?: () => void | Promise<void>,
) => {
  useEffect(() => {
    void Promise.resolve(bootstrap(getSessionUserName())).catch(() => undefined)
    return () => {
      void Promise.resolve(dispose?.()).catch(() => undefined)
    }
  }, [bootstrap, dispose])
}
