declare module '*.svg?react' {
  import type React from 'react'
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

declare module '*.css'

interface ImportMeta {
  env?: Record<string, string | undefined>
}
