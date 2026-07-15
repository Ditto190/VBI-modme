export interface ContextRequestDetail<T> {
  callback: (value: T) => void
  handled?: boolean
}

export const provideContext = <T>(el: HTMLElement, eventName: string, value: T): (() => void) => {
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<ContextRequestDetail<T>>).detail
    e.stopPropagation()
    detail.handled = true
    detail.callback(value)
  }
  el.addEventListener(eventName, handler)
  return () => el.removeEventListener(eventName, handler)
}

export const connectContext = <T>(el: HTMLElement, eventName: string, warningMessage?: string): T | undefined => {
  let value: T | undefined

  const detail: ContextRequestDetail<T> = {
    callback: (v) => {
      value = v
    },
  }

  el.dispatchEvent(
    new CustomEvent(eventName, {
      bubbles: true,
      composed: true,
      detail,
    }),
  )

  if (!detail.handled && warningMessage) {
    console.warn(warningMessage)
  }

  return value
}
