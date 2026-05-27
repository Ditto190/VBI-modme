'use client'

import { ActionBarPrimitive, type MessageState } from '@assistant-ui/react'
import type { FC } from 'react'
import { cn } from '../../lib/utils'
import { useTranslation } from '../../i18n'
import { Check, Copy } from '../ui/icons'
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

const MessageTimestamp = ({ date, label }: { date: Date; label: (time: string) => string }) => {
  const time = formatClockTime(date)
  const timestampLabel = label(time)

  return (
    <Tooltip title={timestampLabel}>
      <span aria-label={timestampLabel} className='vbi-agent-message-timestamp'>
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
  const { t } = useTranslation()
  const isAssistant = message.role === 'assistant'
  const isUser = message.role === 'user'
  const isCompleteAssistant = isAssistant && message.status?.type === 'complete'

  if (!isUser && !isCompleteAssistant) return null

  const autohide = isCompleteAssistant && isLatestAssistantMessage ? 'never' : 'always'
  const copyLabel = isUser ? t('agent.copyMessage') : t('agent.copyResponse')
  const timestampLabel = isUser
    ? (time: string) => t('agent.messageSentAt', { time })
    : (time: string) => t('agent.messageCompletedAt', { time })

  return (
    <div className='vbi-agent-message-action-slot'>
      <ActionBarPrimitive.Root autohide={autohide} className={cn('vbi-agent-message-actions', className)}>
        <ActionBarPrimitive.Copy
          aria-label={copyLabel}
          className='vbi-agent-message-copy'
          copiedDuration={1800}
          type='button'
        >
          <Copy className='vbi-agent-message-copy-icon h-3.5 w-3.5' data-slot='copy-icon' aria-hidden='true' />
          <Check className='vbi-agent-message-copied-icon h-3.5 w-3.5' data-slot='copied-icon' aria-hidden='true' />
        </ActionBarPrimitive.Copy>
        {isCompleteAssistant ? <MessageTiming className='vbi-agent-message-meta-control' side='top' /> : null}
        <MessageTimestamp date={message.createdAt} label={timestampLabel} />
      </ActionBarPrimitive.Root>
    </div>
  )
}
