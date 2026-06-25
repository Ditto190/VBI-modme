import type { VBIStoreApi } from './store'

/**
 * Event-based context for sharing the VBI store from provider to children.
 *
 * Pattern: child dispatches a bubbling CustomEvent, the nearest ancestor
 * provider catches it and delivers the store via a callback in event.detail.
 *
 * Benefits over DOM-property approach:
 * - Works across shadow DOM boundaries (composed: true)
 * - Supports nested providers (nearest wins via stopPropagation)
 * - No DOM element mutation
 */
const VBI_STORE_REQUEST = 'vbi-store-request'

interface VBIStoreRequestDetail {
  callback: (store: VBIStoreApi) => void
  handled?: boolean
}

/**
 * Called by the provider to listen for store requests from descendants.
 * Returns a cleanup function to remove the listener.
 */
export const provideVBIStore = (el: HTMLElement, store: VBIStoreApi): (() => void) => {
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<VBIStoreRequestDetail>).detail
    e.stopPropagation()
    detail.handled = true
    detail.callback(store)
  }
  el.addEventListener(VBI_STORE_REQUEST, handler)
  return () => el.removeEventListener(VBI_STORE_REQUEST, handler)
}

/**
 * Called by child components to request the store from the nearest provider.
 * Synchronous — the event is dispatched and handled in the same microtask.
 */
export const connectVBIStore = (el: HTMLElement): VBIStoreApi | undefined => {
  let store: VBIStoreApi | undefined

  const detail: VBIStoreRequestDetail = {
    callback: (s) => {
      store = s
    },
  }

  el.dispatchEvent(
    new CustomEvent(VBI_STORE_REQUEST, {
      bubbles: true,
      composed: true,
      detail,
    }),
  )

  if (!detail.handled) {
    console.warn(
      `[VBI Warning] Could not find a <vbi-config-provider> wrapping the <${el.tagName.toLowerCase()}> element.`,
    )
  }

  return store
}
