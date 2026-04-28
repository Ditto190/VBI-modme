import type { VBIChartBuilder } from '@visactor/vbi'
import { useEffect } from 'react'
import { useVBIStore, useVBIStoreConfig } from 'src/model'
import { initDemoConnector } from 'src/utils/demoConnector'

export const useInitializeVBI = (builder?: VBIChartBuilder) => {
  const initialize = useVBIStore((state) => state.initialize)
  const storeBuilder = useVBIStore((state) => state.builder)
  const { locale, theme } = useVBIStoreConfig()

  useEffect(() => {
    let dispose: ReturnType<typeof initialize> | undefined
    void initDemoConnector().then(() => {
      const activeBuilder = builder ?? storeBuilder
      dispose = initialize(activeBuilder)
      if (locale) activeBuilder.locale.setLocale(locale)
      if (theme) activeBuilder.theme.setTheme(theme)
    })
    return () => dispose?.()
  }, [builder, initialize, locale, storeBuilder, theme])
}
