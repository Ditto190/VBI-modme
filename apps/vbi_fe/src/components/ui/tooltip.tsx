import type { ReactNode } from 'react'

export const Tooltip = ({ children, title }: { children: ReactNode; title: string }) => (
  <span className='ui-tooltip' data-tooltip={title}>
    {children}
  </span>
)
