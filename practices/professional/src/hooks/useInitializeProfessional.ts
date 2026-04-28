import type { VBIChartBuilder } from '@visactor/vbi'
import { useEffect } from 'react'
import { prepareProfessionalVBI, useVBIStore } from 'src/model'

export const useInitializeProfessional = (builder?: VBIChartBuilder) => {
  const initialize = useVBIStore((state) => state.initialize)
  const storeBuilder = useVBIStore((state) => state.builder)

  useEffect(() => {
    let active = true
    let dispose: ReturnType<typeof initialize> | undefined
    void prepareProfessionalVBI().then(() => {
      if (!active) return
      dispose = initialize(builder ?? storeBuilder)
    })
    return () => {
      active = false
      dispose?.()
    }
  }, [builder, initialize, storeBuilder])
}
