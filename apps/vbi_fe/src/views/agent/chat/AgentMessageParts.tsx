'use client'

import {
  MessagePrimitive,
  type EnrichedPartState,
  type MessageState,
  type PartState,
  type ThreadAssistantMessagePart,
  type ThreadUserMessagePart,
} from '@assistant-ui/react'
import { MarkdownTextPrimitive } from '@assistant-ui/react-markdown'
import { useEffect, useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { MessageActionBar } from '../../../components/assistant-ui/message-actions'
import { CheckCircle2, ChevronDown, CircleAlert, FileSearch, LoaderCircle } from '../../../components/ui/icons'
import { formatAbbreviatedTokenCount } from '../agent-usage-display'
import { readAgentContentText } from '../agent-storage'
import {
  largeUserMessagePreviewLength,
  largeUserMessageThreshold,
  normalizeTabSeparatedTables,
  stringifyJson,
} from './agent-message-adapter'

type RenderedMessagePart = ThreadAssistantMessagePart | ThreadUserMessagePart
type AgentToolPart = Extract<EnrichedPartState, { type: 'tool-call' }>
type ToolDisplayStatus = 'done' | 'error' | 'running'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const AgentMarkdown = () => (
  <MarkdownTextPrimitive
    className='vbi-agent-markdown'
    preprocess={normalizeTabSeparatedTables}
    remarkPlugins={[remarkGfm]}
  />
)

const UserTextPart = ({ text }: { text: string }) => {
  if (text.length <= largeUserMessageThreshold) {
    return <span className='whitespace-pre-wrap break-words'>{text}</span>
  }

  const preview = text.slice(0, largeUserMessagePreviewLength).trimEnd()

  return (
    <div className='space-y-2 whitespace-pre-wrap break-words'>
      <span>{preview}</span>
      <span className='block text-xs text-[var(--vbi-text-muted)]'>
        {formatAbbreviatedTokenCount(text.length)} chars · preview
      </span>
    </div>
  )
}

const groupAgentMessagePart = (part: PartState) => {
  if (part.type === 'reasoning' || part.type === 'tool-call') return ['group-progress'] as const
  return null
}

const formatToolName = (toolName: string) =>
  toolName
    .split(/[_-]/g)
    .filter(Boolean)
    .map((part) => (part.toLowerCase() === 'vbi' ? 'VBI' : `${part.charAt(0).toUpperCase()}${part.slice(1)}`))
    .join(' ')

const readToolActionLabel = (part: AgentToolPart) => {
  const args = isRecord(part.args) ? part.args : {}
  const resource = typeof args.resource === 'string' ? args.resource : ''
  const action = typeof args.action === 'string' ? args.action : ''
  if (resource && action) return `${resource}.${action}`
  if (action) return action
  return formatToolName(part.toolName)
}

const hasUsefulJson = (value: string) => value !== '{}' && value !== '[]' && value.trim().length > 0

const resolveToolStatus = (part: AgentToolPart): ToolDisplayStatus => {
  if (part.isError || part.status?.type === 'incomplete') return 'error'
  if (part.status?.type === 'running' || !part.result) return 'running'
  return 'done'
}

const resolveToolGroupStatus = (status: PartState['status']): ToolDisplayStatus => {
  if (status.type === 'incomplete') return 'error'
  if (status.type === 'running' || status.type === 'requires-action') return 'running'
  return 'done'
}

const resolveActionsGroupStatus = (
  messageStatus: MessageState['status'],
  groupStatus: PartState['status'],
): ToolDisplayStatus => {
  if (messageStatus?.type === 'running') return 'running'
  if (messageStatus?.type === 'incomplete') return 'error'
  return resolveToolGroupStatus(groupStatus)
}

const ToolPart = ({ part }: { part: AgentToolPart }) => {
  const status = resolveToolStatus(part)
  const [open, setOpen] = useState(status === 'running')
  const resultText = isRecord(part.result) ? readAgentContentText(part.result.content) : ''
  const resultDisplay = isRecord(part.result) && isRecord(part.result.details) ? part.result.details.display : ''
  const actionLabel = readToolActionLabel(part)
  const argsText = hasUsefulJson(part.argsText) ? part.argsText : ''
  const displayText = typeof resultDisplay === 'string' && resultDisplay ? resultDisplay : resultText
  const renderDetail = open || status === 'running'

  useEffect(() => {
    if (status === 'running') setOpen(true)
  }, [status])

  return (
    <details className='vbi-agent-tool-part' open={open}>
      <summary
        onClick={(event) => {
          event.preventDefault()
          setOpen((current) => !current)
        }}
      >
        <span className='vbi-agent-tool-order' aria-hidden='true' />
        <span className='vbi-agent-tool-icon' data-status={status} aria-hidden='true'>
          {status === 'running' ? (
            <LoaderCircle className='h-3.5 w-3.5 animate-spin' />
          ) : status === 'error' ? (
            <CircleAlert className='h-3.5 w-3.5' />
          ) : (
            <CheckCircle2 className='h-3.5 w-3.5' />
          )}
        </span>
        <span className='vbi-agent-tool-title'>
          <span>{formatToolName(part.toolName)}</span>
          <strong>{actionLabel}</strong>
        </span>
        <span className='vbi-agent-tool-status' data-status={status}>
          {status === 'running' ? 'Running' : status === 'error' ? 'Error' : 'Done'}
        </span>
        <ChevronDown className='vbi-agent-tool-chevron h-3.5 w-3.5' aria-hidden='true' />
      </summary>
      {renderDetail && (argsText || displayText) ? (
        <div className='vbi-agent-tool-detail'>
          {argsText ? (
            <div>
              <span>Input</span>
              <pre>{argsText}</pre>
            </div>
          ) : null}
          {displayText ? (
            <div>
              <span>Result</span>
              <pre>{displayText}</pre>
            </div>
          ) : null}
        </div>
      ) : null}
    </details>
  )
}

const ProgressGroup = ({
  children,
  count,
  status,
}: {
  children: ReactNode
  count: number
  status: ToolDisplayStatus
}) => {
  const [open, setOpen] = useState(status === 'running')
  const renderContent = open || status === 'running'

  useEffect(() => {
    setOpen(status === 'running')
  }, [status])

  return (
    <details className='vbi-agent-progress-group' data-state={open ? 'open' : 'closed'} open={open}>
      <summary
        onClick={(event) => {
          event.preventDefault()
          setOpen((current) => !current)
        }}
      >
        <span className='vbi-agent-progress-icon' data-status={status} aria-hidden='true'>
          {status === 'running' ? (
            <LoaderCircle className='h-4 w-4 animate-spin' />
          ) : status === 'error' ? (
            <CircleAlert className='h-4 w-4' />
          ) : (
            <FileSearch className='h-4 w-4' />
          )}
        </span>
        <span className='vbi-agent-progress-copy'>
          <span className='vbi-agent-progress-title'>Reasoning</span>
          <span className='vbi-agent-progress-description'>Task progress and tool calls</span>
        </span>
        <span className='vbi-agent-progress-status'>
          {status === 'running'
            ? 'Working'
            : status === 'error'
              ? 'Needs attention'
              : `${count} ${count === 1 ? 'step' : 'steps'}`}
        </span>
        <ChevronDown className='vbi-agent-tool-chevron h-4 w-4' aria-hidden='true' />
      </summary>
      {renderContent ? <div className='vbi-agent-progress-content'>{children}</div> : null}
    </details>
  )
}

const ReasoningAction = ({ text }: { text: string }) => (
  <div className='vbi-agent-action-reasoning'>
    <span className='vbi-agent-tool-order' aria-hidden='true' />
    <div className='vbi-agent-action-reasoning-text'>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  </div>
)

const MessagePart = ({ part, role }: { part: EnrichedPartState; role: MessageState['role'] }) => {
  if (part.type === 'text' && role === 'user') return <UserTextPart text={part.text} />
  if (part.type === 'text') return <AgentMarkdown />
  if (part.type === 'reasoning') return <ReasoningAction text={part.text} />
  if (part.type === 'tool-call') return part.toolUI ?? <ToolPart part={part} />
  if (part.type === 'image') return <img className='vbi-agent-image-part' alt='' src={part.image} />
  if (part.type === 'file') return <pre>{part.filename || part.mimeType}</pre>
  if (part.type === 'data') return part.dataRendererUI ?? <pre>{stringifyJson(part.data)}</pre>
  return null
}

export const AgentThreadMessage = ({
  canCopy,
  isLatestAssistantMessage,
  message,
}: {
  canCopy: boolean
  isLatestAssistantMessage: boolean
  message: MessageState
}) => {
  const parts = message.content as readonly RenderedMessagePart[]
  const isIncomplete = message.status?.type === 'incomplete'

  return (
    <MessagePrimitive.Root
      className='vbi-agent-message'
      data-role={message.role}
      data-running={message.status?.type === 'running'}
    >
      <div className='vbi-agent-message-body'>
        <div className='vbi-agent-message-content'>
          {parts.length ? (
            <MessagePrimitive.GroupedParts groupBy={groupAgentMessagePart}>
              {({ part, children }) => {
                switch (part.type) {
                  case 'group-progress':
                    return (
                      <ProgressGroup
                        count={part.indices.length}
                        status={resolveActionsGroupStatus(message.status, part.status)}
                      >
                        {children}
                      </ProgressGroup>
                    )
                  case 'text':
                  case 'reasoning':
                  case 'tool-call':
                  case 'image':
                  case 'file':
                  case 'data':
                    return <MessagePart part={part} role={message.role} />
                  default:
                    return null
                }
              }}
            </MessagePrimitive.GroupedParts>
          ) : isIncomplete ? null : (
            <span className='vbi-agent-message-pending'>
              <LoaderCircle className='h-3.5 w-3.5 animate-spin' />
            </span>
          )}
        </div>
        {isIncomplete ? (
          <div className='vbi-agent-message-error'>
            <CircleAlert className='h-3.5 w-3.5' />
            <span>{String(message.status.error ?? message.status.reason)}</span>
          </div>
        ) : null}
        <MessageActionBar canCopy={canCopy} isLatestAssistantMessage={isLatestAssistantMessage} message={message} />
      </div>
    </MessagePrimitive.Root>
  )
}
