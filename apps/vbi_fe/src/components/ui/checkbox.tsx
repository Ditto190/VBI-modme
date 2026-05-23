import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export const Checkbox = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'grid h-3.5 w-3.5 cursor-pointer appearance-none place-content-center rounded-sm border border-[var(--vbi-border-strong)] bg-[var(--vbi-control)] transition duration-150 ease-out checked:animate-[vbi-subtle-pop_var(--vbi-motion)_var(--vbi-ease-pop)] checked:border-[var(--vbi-primary)] checked:bg-[var(--vbi-primary)] checked:shadow-[inset_0_0_0_3px_var(--vbi-control)] hover:scale-110 hover:border-[var(--vbi-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--vbi-focus)]',
        className,
      )}
      type='checkbox'
      {...props}
    />
  ),
)

Checkbox.displayName = 'Checkbox'
