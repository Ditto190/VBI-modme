import { useCallback, useEffect, useRef, useState } from 'react'

export const useFullscreen = (enabled: boolean) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const [fallbackFullscreen, setFallbackFullscreen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!enabled) return
    const handleFullscreenChange = () =>
      setIsFullscreen(fallbackFullscreen || document.fullscreenElement === rootRef.current)
    handleFullscreenChange()
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [enabled, fallbackFullscreen])

  const toggleFullscreen = useCallback(async () => {
    if (!enabled || !rootRef.current) return
    if (fallbackFullscreen) {
      setFallbackFullscreen(false)
      setIsFullscreen(false)
      return
    }
    if (document.fullscreenElement === rootRef.current) {
      await document.exitFullscreen()
      return
    }
    if (document.fullscreenElement) await document.exitFullscreen()
    try {
      await rootRef.current.requestFullscreen()
    } catch {
      setFallbackFullscreen(true)
      setIsFullscreen(true)
    }
  }, [enabled, fallbackFullscreen])

  return { isFullscreen, rootRef, toggleFullscreen }
}
