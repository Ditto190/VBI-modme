import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useNavigationStore } from '../stores/navigation.store'

export const NavigationBinder = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    useNavigationStore.getState().setNavigate(navigate)
  }, [navigate])

  useEffect(() => {
    useNavigationStore.getState().setPathname(location.pathname)
  }, [location.pathname])

  return null
}
