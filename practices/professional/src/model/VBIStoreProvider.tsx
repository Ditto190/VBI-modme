import type { VBIChartBuilder } from '@visactor/vbi'
import { createContext, useContext, useRef, type PropsWithChildren } from 'react'
import { useStore } from 'zustand'
import type { ProfessionalLocale, ProfessionalTheme } from 'src/constants/builder'
import { createVBIStore, type VBIStoreApi, type VBIStoreState } from './VBIStore'

export type VBIStoreConfig = {
  hideLocale: boolean
  hideTheme: boolean
  locale?: ProfessionalLocale
  theme?: ProfessionalTheme
}

type VBIStoreContextValue = {
  config: VBIStoreConfig
  store: VBIStoreApi
}

const VBIStoreContext = createContext<VBIStoreContextValue | null>(null)

type VBIStoreProviderProps = PropsWithChildren<{
  builder?: VBIChartBuilder
  hideLocale?: boolean
  hideTheme?: boolean
  locale?: ProfessionalLocale
  theme?: ProfessionalTheme
}>

export const VBIStoreProvider = ({
  builder,
  children,
  hideLocale = false,
  hideTheme = false,
  locale,
  theme,
}: VBIStoreProviderProps) => {
  const storeRef = useRef<VBIStoreApi | null>(null)
  if (!storeRef.current) storeRef.current = createVBIStore(builder)

  return (
    <VBIStoreContext.Provider value={{ config: { hideLocale, hideTheme, locale, theme }, store: storeRef.current }}>
      {children}
    </VBIStoreContext.Provider>
  )
}

export const useVBIStore = <T,>(selector: (state: VBIStoreState) => T) => {
  const context = useContext(VBIStoreContext)
  if (!context) throw new Error('useVBIStore must be used within VBIStoreProvider')
  return useStore(context.store, selector)
}

export const useVBIStoreConfig = () => {
  const context = useContext(VBIStoreContext)
  if (!context) throw new Error('useVBIStoreConfig must be used within VBIStoreProvider')
  return context.config
}
