import { useCallback, useMemo, useRef, useSyncExternalStore } from 'react'
import type { VBIChartBuilder } from '@visactor/vbi'

export const useBuilderDocState = <T>(params: {
  builder: VBIChartBuilder | undefined
  fallback: T
  getSnapshot: (builder: VBIChartBuilder) => T
}) => {
  const { builder, fallback, getSnapshot } = params
  const versionRef = useRef(0)
  const getVersion = useCallback(() => versionRef.current, [])
  const subscribe = useCallback(
    (notify: () => void) => {
      if (!builder) return () => {}
      const sync = () => {
        versionRef.current += 1
        notify()
      }
      builder.doc.on('update', sync)
      return () => builder.doc.off('update', sync)
    },
    [builder],
  )
  const version = useSyncExternalStore(subscribe, getVersion, getVersion)

  return useMemo(() => (builder ? getSnapshot(builder) : fallback), [builder, fallback, getSnapshot, version])
}
