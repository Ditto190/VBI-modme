'use client'

import { ActionBarPrimitive, type MessageState } from '@assistant-ui/react'
import type { FC } from 'react'
import { cn } from '../../lib/utils'
import { Copy } from '../ui/icons'
import { Tooltip } from '../ui/tooltip'
import { MessageTiming } from './message-timing'

type MessageActionBarProps = {
  className?: string
  isLatestAssistantMessage?: boolean
  message: MessageState
}

const formatClockTime = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

const MessageTimestamp = ({ date, label }: { date: Date; label: string }) => {
  const time = formatClockTime(date)

  return (
    <Tooltip title={`${label} ${time}`}>
      <span aria-label={`${label} ${time}`} className='vbi-agent-message-timestamp'>
        {time}
      </span>
    </Tooltip>
  )
}

export const MessageActionBar: FC<MessageActionBarProps> = ({
  className,
  isLatestAssistantMessage = false,
  message,
}) => {
  const isAssistant = message.role === 'assistant'
  const isUser = message.role === 'user'
  const isCompleteAssistant = isAssistant && message.status?.type === 'complete'

  if (!isUser && !isCompleteAssistant) return null

  const autohide = isCompleteAssistant && isLatestAssistantMessage ? 'never' : 'always'
  const copyLabel = isUser ? 'Copy message' : 'Copy response'
  const timestampLabel = isUser ? 'Sent at' : 'Completed at'

  return (
    <div className='vbi-agent-message-action-slot'>
      <ActionBarPrimitive.Root autohide={autohide} className={cn('vbi-agent-message-actions', className)}>
        <ActionBarPrimitive.Copy
          aria-label={copyLabel}
          className='vbi-agent-message-copy'
          copiedDuration={1800}
          type='button'
        >
          <Copy className='h-3.5 w-3.5' />
          <span>Copy</span>
        </ActionBarPrimitive.Copy>
        {isCompleteAssistant ? <MessageTiming className='vbi-agent-message-meta-control' side='top' /> : null}
        <MessageTimestamp date={message.createdAt} label={timestampLabel} />
      </ActionBarPrimitive.Root>
    </div>
  )
}
