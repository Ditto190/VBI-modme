import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-8 w-full rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-control)] px-2.5 text-[13px] text-[var(--vbi-text)] outline-none transition-colors placeholder:text-[var(--vbi-placeholder)] focus:border-[var(--vbi-border-strong)] focus:ring-2 focus:ring-[var(--vbi-focus)]',
        className,
      )}
      {...props}
    />
  ),
)

Input.displayName = 'Input'

export const Textarea = ({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={cn(
      'min-h-20 w-full rounded-md border border-[var(--vbi-border)] bg-[var(--vbi-control)] px-2.5 py-2 text-[13px] text-[var(--vbi-text)] outline-none transition-colors placeholder:text-[var(--vbi-placeholder)] focus:border-[var(--vbi-border-strong)] focus:ring-2 focus:ring-[var(--vbi-focus)]',
      className,
    )}
    {...props}
  />
)
