import { useCallback, useRef, useSyncExternalStore } from 'react'

const subscribeFullscreen = (notify: () => void) => {
  document.addEventListener('fullscreenchange', notify)
  return () => document.removeEventListener('fullscreenchange', notify)
}

const getSnapshot = () => document.fullscreenElement

export const useFullscreen = (enabled: boolean) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const fullscreenElement = useSyncExternalStore(subscribeFullscreen, getSnapshot, () => null)
  const isFullscreen = fullscreenElement === rootRef.current

  const toggleFullscreen = useCallback(async () => {
    if (!enabled || !rootRef.current) return
    if (document.fullscreenElement === rootRef.current) {
      await document.exitFullscreen()
      return
    }
    if (document.fullscreenElement) await document.exitFullscreen()
    await rootRef.current.requestFullscreen()
  }, [enabled])

  return { isFullscreen, rootRef, toggleFullscreen }
}
