import { application } from './store'
const windowApplicationApi = {
  application,
}

declare global {
  interface Window {
    VBIApplication?: typeof application
    VBIApplicationAPI?: typeof windowApplicationApi
  }
}

export const exposeApplicationToWindow = () => {
  if (typeof window === 'undefined') return
  window.VBIApplication = application
  window.VBIApplicationAPI = windowApplicationApi
  Reflect.deleteProperty(window, 'useApplication')
}
