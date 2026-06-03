import { application } from './store'
import { useApplication } from './use-application'

const windowApplicationApi = {
  application,
  useApplication,
}

declare global {
  interface Window {
    VBIApplication?: typeof application
    VBIApplicationAPI?: typeof windowApplicationApi
    useApplication?: typeof useApplication
  }
}

export const exposeApplicationToWindow = () => {
  if (typeof window === 'undefined') return
  window.VBIApplication = application
  window.VBIApplicationAPI = windowApplicationApi
  window.useApplication = useApplication
}
