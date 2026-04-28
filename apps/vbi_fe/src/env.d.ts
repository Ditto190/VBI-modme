/// <reference types="@rsbuild/core/types" />

/**
 * Imports the SVG file as a React component.
 * @requires [@rsbuild/plugin-svgr](https://npmjs.com/package/@rsbuild/plugin-svgr)
 */
declare module '*.svg?react' {
  import type React from 'react'
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

interface Window {
  __VBI_FE_DEBUG__?: {
    actions: Record<string, Record<string, unknown>>
    dump(): Record<string, unknown>
    getState(storeName: string): unknown
  }
}
