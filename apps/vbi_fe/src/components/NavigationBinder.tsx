import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useNavigationStore } from '../stores/navigation.store'

export const NavigationBinder = () => {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    useNavigationStore.getState().setNavigate((path) => router.push(path))
  }, [router])

  useEffect(() => {
    useNavigationStore.getState().setPathname(pathname ?? '')
  }, [pathname])

  return null
}
