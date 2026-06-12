/**
 * Global test-environment shims for jsdom.
 *
 * jsdom is missing several Web-API globals that third-party libraries
 * (e.g. @dnd-kit/dom, Web Awesome) access at module evaluation time.
 * Polyfill them here so every test file gets them automatically.
 */

// @dnd-kit/dom reads ResizeObserver at module level.
if (typeof globalThis.ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}
