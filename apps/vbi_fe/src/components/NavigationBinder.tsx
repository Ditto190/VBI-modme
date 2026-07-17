import { useEffect } from 'react'
import { bindApplicationNavigation, setApplicationPathname } from '../application'
import { canonicalizeApplicationPathname } from '../application/routing/route'

export const NavigationBinder = () => {
  useEffect(() => {
    const syncPathname = () => {
      const canonicalPathname = canonicalizeApplicationPathname(window.location.pathname)
      if (window.location.pathname !== canonicalPathname) {
        window.history.replaceState(null, '', `${canonicalPathname}${window.location.search}${window.location.hash}`)
      }
      setApplicationPathname(canonicalPathname)
    }

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
