import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'
import { LoaderCircle } from './icons'

type ButtonSize = 'default' | 'icon' | 'lg' | 'sm'
type ButtonVariant = 'default' | 'destructive' | 'ghost' | 'primary' | 'secondary'

const buttonBaseClasses =
  'vbi-motion-press inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md border text-[13px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vbi-focus)] disabled:pointer-events-none disabled:translate-y-0 disabled:scale-100 disabled:opacity-50'

const buttonSizeClasses: Record<ButtonSize, string> = {
  default: 'h-8 px-2.5',
  icon: 'h-8 w-8 p-0',
  lg: 'h-9 px-3',
  sm: 'h-7 px-2 text-xs',
}

const buttonVariantClasses: Record<ButtonVariant, string> = {
  default: 'border-[var(--vbi-border)] bg-[var(--vbi-control)] text-[var(--vbi-text)] hover:bg-[var(--vbi-hover-bg)]',
  destructive: 'border-transparent bg-[var(--vbi-danger)] text-white hover:brightness-95 dark:text-white',
  ghost: 'border-transparent bg-transparent text-[var(--vbi-text)] hover:bg-[var(--vbi-hover-bg)]',
  primary:
    'border-transparent bg-[var(--vbi-primary)] text-[var(--vbi-primary-text)] hover:bg-[var(--vbi-primary-hover)]',
  secondary:
    'border-[var(--vbi-border)] bg-[var(--vbi-control-muted)] text-[var(--vbi-text)] hover:bg-[var(--vbi-hover-bg)]',
}

const getButtonClassName = ({
  className,
  size = 'default',
  variant = 'default',
}: {
  className?: string
  size?: ButtonSize
  variant?: ButtonVariant
}) => cn(buttonBaseClasses, buttonSizeClasses[size], buttonVariantClasses[variant], className)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  loading?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

export const Button = ({ children, className, disabled, icon, loading, size, variant, ...props }: ButtonProps) => (
  <button
    className={getButtonClassName({ className, size, variant })}
    disabled={disabled || loading}
    type='button'
    {...props}
  >
    {loading ? <LoaderCircle className='h-3.5 w-3.5 animate-spin' /> : icon}
    {children}
  </button>
)
