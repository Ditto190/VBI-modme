import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { LoaderCircle } from './icons'

const buttonVariants = cva(
  'vbi-motion-press inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vbi-focus)] disabled:pointer-events-none disabled:translate-y-0 disabled:scale-100 disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-8 px-2.5',
        icon: 'h-8 w-8 p-0',
        sm: 'h-7 px-2 text-xs',
        lg: 'h-9 px-3',
      },
      variant: {
        default:
          'border-[var(--vbi-border)] bg-[var(--vbi-control)] text-[var(--vbi-text)] hover:bg-[var(--vbi-hover-bg)]',
        destructive: 'border-transparent bg-[var(--vbi-danger)] text-white hover:brightness-95 dark:text-white',
        ghost: 'border-transparent bg-transparent text-[var(--vbi-text)] hover:bg-[var(--vbi-hover-bg)]',
        primary:
          'border-transparent bg-[var(--vbi-primary)] text-[var(--vbi-primary-text)] shadow-[var(--vbi-primary-shadow)] hover:bg-[var(--vbi-primary-hover)]',
        secondary:
          'border-[var(--vbi-border)] bg-[var(--vbi-control-muted)] text-[var(--vbi-text)] hover:bg-[var(--vbi-hover-bg)]',
      },
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: ReactNode
    loading?: boolean
  }

export const Button = ({ children, className, disabled, icon, loading, size, variant, ...props }: ButtonProps) => (
  <button
    className={cn(buttonVariants({ className, size, variant }))}
    disabled={disabled || loading}
    type='button'
    {...props}
  >
    {loading ? <LoaderCircle className='h-3.5 w-3.5 animate-spin' /> : icon}
    {children}
  </button>
)
