import { useEffect } from 'react'
import { bindApplicationNavigation, setApplicationPathname } from '../application'

export const NavigationBinder = () => {
  useEffect(() => {
    const syncPathname = () => setApplicationPathname(window.location.pathname)

    bindApplicationNavigation((path) => {
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path)
      }
      syncPathname()
    })

    syncPathname()
    window.addEventListener('popstate', syncPathname)
    return () => window.removeEventListener('popstate', syncPathname)
  }, [])

  return null
}
