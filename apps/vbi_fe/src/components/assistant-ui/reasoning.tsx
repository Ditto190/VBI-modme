'use client'

import {
  createContext,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { ChevronDown, LoaderCircle } from '../ui/icons'

const reasoningVariants = cva('aui-reasoning-root', {
  variants: {
    variant: {
      outline: '',
      ghost: '',
      muted: '',
    },
  },
  defaultVariants: {
    variant: 'ghost',
  },
})

export type ReasoningRootProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof reasoningVariants> & {
    defaultOpen?: boolean
    onOpenChange?: (open: boolean) => void
    open?: boolean
  }

type ReasoningRootContextValue = {
  contentId: string
  onOpenChange: (open: boolean) => void
  open: boolean
}

const ReasoningRootContext = createContext<ReasoningRootContextValue | null>(null)

const useReasoningRootContext = () => {
  const context = useContext(ReasoningRootContext)
  if (!context) {
    throw new Error('Reasoning components must be rendered inside ReasoningRoot')
  }
  return context
}

export const ReasoningRoot = ({
  children,
  className,
  defaultOpen = false,
  onOpenChange,
  open: controlledOpen,
  variant,
  ...props
}: ReasoningRootProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen
  const contentId = useId()

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen)
      }
      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange],
  )
  const contextValue = useMemo(
    () => ({ contentId, onOpenChange: handleOpenChange, open: isOpen }),
    [contentId, handleOpenChange, isOpen],
  )

  return (
    <ReasoningRootContext.Provider value={contextValue}>
      <div
        className={cn(reasoningVariants({ variant }), className)}
        data-state={isOpen ? 'open' : 'closed'}
        data-slot='reasoning-root'
        data-variant={variant ?? 'ghost'}
        {...props}
      >
        {children}
      </div>
    </ReasoningRootContext.Provider>
  )
}

export type ReasoningTriggerProps = ComponentPropsWithoutRef<'button'> & {
  active?: boolean
  label?: ReactNode
  statusLabel?: ReactNode
}

export const ReasoningTrigger = ({
  active = false,
  children,
  className,
  label,
  onClick,
  statusLabel,
  type = 'button',
  ...props
}: ReasoningTriggerProps) => {
  const { contentId, onOpenChange, open } = useReasoningRootContext()

  return (
    <button
      aria-controls={contentId}
      aria-expanded={open}
      className={cn('aui-reasoning-trigger', className)}
      data-active={active ? 'true' : 'false'}
      data-slot='reasoning-trigger'
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        onOpenChange(!open)
      }}
      type={type}
      {...props}
    >
      {active ? (
        <LoaderCircle
          className='aui-reasoning-trigger-loading h-3.5 w-3.5 animate-spin'
          aria-hidden='true'
          data-slot='reasoning-trigger-loading'
        />
      ) : null}
      <span className='aui-reasoning-trigger-label' data-slot='reasoning-trigger-label'>
        {label ?? children ?? 'Reasoning'}
      </span>
      {statusLabel ? (
        <span
          className='aui-reasoning-trigger-status vbi-agent-chain-of-thought-status'
          data-slot='reasoning-trigger-status'
        >
          {statusLabel}
        </span>
      ) : null}
      <ChevronDown
        className='aui-reasoning-trigger-chevron vbi-agent-tool-chevron h-4 w-4'
        aria-hidden='true'
        data-slot='reasoning-trigger-chevron'
      />
    </button>
  )
}

export const ReasoningContent = ({ children, className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  const { contentId, open } = useReasoningRootContext()

  return (
    <div
      aria-hidden={!open}
      className={cn('aui-reasoning-content', className)}
      data-state={open ? 'open' : 'closed'}
      data-slot='reasoning-content'
      id={contentId}
      {...props}
    >
      {children}
    </div>
  )
}

export const ReasoningText = ({ children, className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('aui-reasoning-text', className)} data-slot='reasoning-text' {...props}>
    {children}
  </div>
)

export const Reasoning = ({ children, className, ...props }: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('aui-reasoning', className)} data-slot='reasoning' {...props}>
    {children}
  </div>
)
