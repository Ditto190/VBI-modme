import type { VBIChartBuilder } from '@visactor/vbi'
import { createContext, useContext, useRef, type PropsWithChildren } from 'react'
import { useStore } from 'zustand'
import type { DemoLocale, DemoTheme } from 'src/constants/builder'
import { createVBIStore, type VBIStoreApi, type VBIStoreState } from './VBIStore'
import { createDefaultBuilder } from 'src/utils/demoConnector'

export type VBIStoreConfig = {
  hideLocale: boolean
  hideTheme: boolean
  locale?: DemoLocale
  theme?: DemoTheme
}

type ContextValue = { config: VBIStoreConfig; store: VBIStoreApi }
const VBIStoreContext = createContext<ContextValue | null>(null)

type VBIStoreProviderProps = PropsWithChildren<{
  builder?: VBIChartBuilder
  hideLocale?: boolean
  hideTheme?: boolean
  locale?: DemoLocale
  theme?: DemoTheme
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
  if (!storeRef.current) {
    storeRef.current = createVBIStore(builder ?? createDefaultBuilder())
  }

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
