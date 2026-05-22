import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { Inbox } from './icons'

export const Empty = ({
  className,
  description,
  icon,
}: {
  className?: string
  description: string
  icon?: ReactNode
}) => (
  <div
    className={cn(
      'flex min-h-32 flex-col items-center justify-center gap-2.5 rounded-md text-center text-[var(--vbi-text-muted)]',
      className,
    )}
  >
    <div className='flex h-9 w-9 items-center justify-center rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-control-muted)] text-[var(--vbi-text-soft)]'>
      {icon ?? <Inbox className='h-4 w-4' />}
    </div>
    <span className='text-[13px]'>{description}</span>
  </div>
)
