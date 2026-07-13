import { cn } from '../../lib/utils'
import { LoaderCircle } from './icons'

export const Spinner = ({ className, label }: { className?: string; label?: string }) => (
  <div className={cn('inline-flex items-center justify-center gap-2 text-sm text-[var(--vbi-text-muted)]', className)}>
    <LoaderCircle className='h-4 w-4 animate-spin' />
    {label ? <span>{label}</span> : null}
  </div>
)

export const FullscreenSpinner = () => (
  <div className='fixed inset-0 z-50 flex items-center justify-center bg-[var(--vbi-bg)] transition-colors duration-300'>
    <Spinner className='text-[var(--vbi-text)]' />
  </div>
)
