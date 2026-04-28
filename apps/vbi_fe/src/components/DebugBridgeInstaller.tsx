import { useEffect } from 'react'
import { createDebugBridge } from '../debug/bridge'

export const DebugBridgeInstaller = () => {
  useEffect(() => {
    if (!import.meta.env.DEV) return
    window.__VBI_FE_DEBUG__ = createDebugBridge()
    return () => {
      delete window.__VBI_FE_DEBUG__
    }
  }, [])

  return null
}
