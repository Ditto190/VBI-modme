import { useNavigationStore } from '../../stores/navigation.store'
import { canonicalizeApplicationPathname } from './route'

export const bindApplicationNavigation = (navigate: (path: string) => void) => {
  useNavigationStore.getState().setNavigate(navigate)
}

export const setApplicationPathname = (pathname: string) => {
  useNavigationStore.getState().setPathname(canonicalizeApplicationPathname(pathname))
}
