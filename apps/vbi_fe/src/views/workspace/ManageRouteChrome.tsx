'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Dispatch, ReactNode, SetStateAction } from 'react'

export type ManageRouteRenameChrome = {
  fallbackTitle: string
  label: string
  value: string
  onChange: (value: string) => void
  onCommit: () => Promise<void> | void
}

export type ManageRouteChromeState = {
  actions?: ReactNode
  backLabel?: string
  contentClassName?: string
  rename?: ManageRouteRenameChrome
  title?: string
  onBack?: () => void
}

const ManageRouteChromeStateContext = createContext<ManageRouteChromeState>({})
const ManageRouteChromeSetterContext = createContext<Dispatch<SetStateAction<ManageRouteChromeState>> | null>(null)

export const ManageRouteChromeProvider = ({ children }: { children: ReactNode }) => {
  const [chrome, setChrome] = useState<ManageRouteChromeState>({})

  return (
    <ManageRouteChromeStateContext.Provider value={chrome}>
      <ManageRouteChromeSetterContext.Provider value={setChrome}>{children}</ManageRouteChromeSetterContext.Provider>
    </ManageRouteChromeStateContext.Provider>
  )
}

export const useManageRouteChromeState = () => {
  return useContext(ManageRouteChromeStateContext)
}

export const useManageRouteChrome = (chrome: ManageRouteChromeState) => {
  const setChrome = useContext(ManageRouteChromeSetterContext)

  useEffect(() => {
    if (!setChrome) return undefined

    setChrome(chrome)
  }, [chrome, setChrome])

  useEffect(() => {
    if (!setChrome) return undefined

    return () => setChrome({})
  }, [setChrome])
}
