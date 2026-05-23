import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export const CenteredState = ({
  children,
  className,
  minHeight = 'md',
}: {
  children: ReactNode
  className?: string
  minHeight?: 'sm' | 'md'
}) => (
  <div
    className={cn(
      'vbi-motion-presence flex flex-col items-center justify-center gap-3 text-[var(--vbi-text-muted)]',
      minHeight === 'md' ? 'min-h-[280px]' : 'min-h-[260px]',
      className,
    )}
  >
    {children}
  </div>
)
