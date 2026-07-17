import { application } from './store'

declare global {
  interface Window {
    VBIApplication?: typeof application
  }
}

export const exposeApplicationToWindow = () => {
  if (typeof window === 'undefined') return
  window.VBIApplication = application
  Reflect.deleteProperty(window, 'VBIApplicationAPI')
  Reflect.deleteProperty(window, 'useApplication')
}
