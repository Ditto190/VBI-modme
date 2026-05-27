'use client'

import { useMessageTiming } from '@assistant-ui/react'
import type { FC } from 'react'
import { cn } from '../../lib/utils'
import { Tooltip } from '../ui/tooltip'

type MessageTimingSide = 'top' | 'right' | 'bottom' | 'left'

const formatTimingMs = (ms: number | undefined): string => {
  if (ms === undefined) return '-'
  if (ms < 1000) return `${Math.round(ms)}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

const TimingRow = ({ label, value }: { label: string; value: string }) => (
  <div className='flex items-center justify-between gap-4'>
    <span className='text-[var(--vbi-text-muted)]'>{label}</span>
    <span className='font-mono tabular-nums'>{value}</span>
  </div>
)

export const MessageTiming: FC<{
  className?: string
  side?: MessageTimingSide
}> = ({ className, side = 'right' }) => {
  const timing = useMessageTiming()
  if (timing?.totalStreamTime === undefined) return null

  return (
    <Tooltip
      contentClassName='ui-tooltip-content--rich'
      side={side}
      title={
        <div className='grid min-w-36 gap-1.5 text-xs'>
          {timing.firstTokenTime !== undefined ? (
            <TimingRow label='First token' value={formatTimingMs(timing.firstTokenTime)} />
          ) : null}
          <TimingRow label='Total' value={formatTimingMs(timing.totalStreamTime)} />
          {timing.tokensPerSecond !== undefined ? (
            <TimingRow label='Speed' value={`${timing.tokensPerSecond.toFixed(1)} tok/s`} />
          ) : null}
          <TimingRow label='Chunks' value={String(timing.totalChunks)} />
        </div>
      }
    >
      <button
        aria-label='Message timing'
        className={cn(
          'inline-flex h-7 items-center rounded-md px-1.5 font-mono text-xs tabular-nums text-[var(--vbi-text-muted)] transition-colors hover:bg-[var(--vbi-hover-bg)] hover:text-[var(--vbi-text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--vbi-focus)]',
          className,
        )}
        data-slot='message-timing-trigger'
        type='button'
      >
        {formatTimingMs(timing.totalStreamTime)}
      </button>
    </Tooltip>
  )
}
