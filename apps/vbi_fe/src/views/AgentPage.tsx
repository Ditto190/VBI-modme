'use client'

import {
  AssistantRuntimeProvider,
  AttachmentPrimitive,
  AuiIf,
  ComposerPrimitive,
  MessagePrimitive,
  SimpleImageAttachmentAdapter,
  ThreadPrimitive,
  useExternalStoreRuntime,
  type AppendMessage,
  type EnrichedPartState,
  type ExternalStoreAdapter,
  type MessageState,
  type PartState,
  type ThreadAssistantMessagePart,
  type ThreadMessageLike,
  type ThreadUserMessagePart,
} from '@assistant-ui/react'
import { MarkdownTextPrimitive } from '@assistant-ui/react-markdown'
import type { AgentMessage } from '@earendil-works/pi-agent-core'
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  FileSearch,
  LoaderCircle,
  Plus,
  SendHorizontal,
  Square,
  X,
} from '../components/ui/icons'
import { MessageActionBar } from '../components/assistant-ui/message-actions'
import { Spinner } from '../components/ui/spinner'
import { useTranslation, type Translate } from '../i18n'
import { useAgentConversationsStore } from '../stores/agent-conversations.store'
import { useNavigationStore } from '../stores/navigation.store'
import {
  createAgentConversationId,
  readAgentContentText,
  setupVbiAgentIndexedDBStorage,
  type VbiAgentStorage,
} from './agent/agent-storage'
import type {
  AgentConversationRuntime,
  AgentConversationRuntimeSnapshot,
  AgentConversationRuntimeUpdate,
} from './agent/agent-runtime'
import { formatAgentContextUsage, formatCompactTokenCount, resolveAgentContextUsage } from './agent/agent-usage-display'
import { createAgentConversationRoute, readAgentConversationRouteId } from './manage-sidebar-routes'

const emptySnapshot: AgentConversationRuntimeSnapshot = {
  isRunning: false,
  messages: [],
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

type AssistantContentPart = Exclude<ThreadMessageLike['content'], string>[number]
type RenderedMessagePart = ThreadAssistantMessagePart | ThreadUserMessagePart
type AgentToolPart = Extract<EnrichedPartState, { type: 'tool-call' }>
type ToolDisplayStatus = 'done' | 'error' | 'running'
type ActivateConversationOptions = {
  fallbackTitle?: string
  showLoading?: boolean
}

type AgentThreadMessage = AgentMessage | Record<string, unknown>
type ToolResultPayload = {
  content: unknown
  details?: Record<string, unknown>
  isError: boolean
}

const largeUserMessageThreshold = 20_000
const largeUserMessagePreviewLength = 4_000

const stringifyJson = (value: unknown) => {
  try {
    return JSON.stringify(value ?? {}, null, 2)
  } catch {
    return '{}'
  }
}

const createMessageId = (conversationId: string, message: unknown, index: number) => {
  const timestamp = isRecord(message) && typeof message.timestamp === 'number' ? message.timestamp : index
  const role = isRecord(message) && typeof message.role === 'string' ? message.role : 'message'
  return `${conversationId}:${index}:${timestamp}:${role}`
}

const readMessageTimestamp = (message: unknown) =>
  isRecord(message) && typeof message.timestamp === 'number' ? message.timestamp : null

const readMessageRole = (message: unknown) =>
  isRecord(message) && typeof message.role === 'string' ? message.role : ''

const readToolCallId = (part: unknown) => {
  if (!isRecord(part)) return ''
  if (typeof part.id === 'string') return part.id
  if (typeof part.toolCallId === 'string') return part.toolCallId
  return ''
}

const readToolName = (part: unknown) => {
  if (!isRecord(part)) return ''
  if (typeof part.name === 'string') return part.name
  if (typeof part.toolName === 'string') return part.toolName
  return ''
}

const isToolCallBlock = (part: unknown) => isRecord(part) && part.type === 'toolCall'

const mergeToolResultIntoAssistantMessage = (message: Record<string, unknown>, result: Record<string, unknown>) => {
  if (message.role !== 'assistant' || !Array.isArray(message.content)) return null

  const toolCallId = typeof result.toolCallId === 'string' ? result.toolCallId : ''
  const toolName = typeof result.toolName === 'string' ? result.toolName : ''
  const toolResult: ToolResultPayload = {
    content: result.content,
    details: isRecord(result.details) ? result.details : undefined,
    isError: result.isError === true,
  }
  let matched = false
  const nextContent = message.content.map((part) => {
    if (!isToolCallBlock(part)) return part
    const isIdMatch = toolCallId && readToolCallId(part) === toolCallId
    const isNameFallback = !toolCallId && toolName && readToolName(part) === toolName && !isRecord(part.result)
    if (!isIdMatch && !isNameFallback) return part
    matched = true
    return {
      ...part,
      isError: toolResult.isError,
      result: {
        content: toolResult.content,
        details: toolResult.details,
      },
    }
  })

  return matched ? { ...message, content: nextContent } : null
}

export const mergeAgentToolResults = (messages: AgentMessage[]): AgentThreadMessage[] => {
  const mergedMessages: AgentThreadMessage[] = []

  for (const message of messages) {
    const record = message as unknown
    if (!isRecord(record) || record.role !== 'toolResult') {
      mergedMessages.push(message)
      continue
    }

    let merged = false
    for (let index = mergedMessages.length - 1; index >= 0; index -= 1) {
      const candidate = mergedMessages[index]
      if (!isRecord(candidate)) continue
      const nextMessage = mergeToolResultIntoAssistantMessage(candidate, record)
      if (!nextMessage) continue
      mergedMessages[index] = nextMessage
      merged = true
      break
    }

    if (!merged) {
      mergedMessages.push(message)
    }
  }

  return mergedMessages
}

const mapAssistantPart = (part: unknown): AssistantContentPart | null => {
  if (!isRecord(part) || typeof part.type !== 'string') return null

  if (part.type === 'text' && typeof part.text === 'string') {
    return { type: 'text', text: part.text }
  }
  if (part.type === 'thinking' && typeof part.thinking === 'string') {
    return { type: 'reasoning', text: part.thinking }
  }
  if (part.type === 'toolCall' && typeof part.name === 'string') {
    const args = isRecord(part.arguments) ? part.arguments : {}
    const result = isRecord(part.result)
      ? {
          content: part.result.content,
          details: isRecord(part.result.details) ? part.result.details : undefined,
        }
      : undefined
    return {
      type: 'tool-call',
      toolCallId: typeof part.id === 'string' ? part.id : `${part.name}:${stringifyJson(args)}`,
      toolName: part.name,
      args: args as never,
      argsText: stringifyJson(args),
      ...(result ? { result } : {}),
      ...(part.isError === true ? { isError: true } : {}),
    }
  }

  const text = readAgentContentText([part])
  return text ? { type: 'text', text } : null
}

const mapToolResultMessage = (message: Record<string, unknown>): ThreadMessageLike['content'] => {
  const toolName = typeof message.toolName === 'string' ? message.toolName : 'tool'
  const toolCallId = typeof message.toolCallId === 'string' ? message.toolCallId : `${toolName}:result`
  const details = isRecord(message.details) ? message.details : undefined

  return [
    {
      type: 'tool-call',
      toolCallId,
      toolName,
      args: {},
      argsText: '{}',
      result: {
        content: message.content,
        details,
      },
      isError: message.isError === true,
    },
  ]
}

const countToolCallsInRange = (messages: readonly AgentThreadMessage[], startIndex: number, endIndex: number) => {
  let count = 0
  for (let index = startIndex; index <= endIndex; index += 1) {
    const message = messages[index]
    if (!isRecord(message) || !Array.isArray(message.content)) continue
    count += message.content.filter(isToolCallBlock).length
  }
  return count
}

const createAssistantMessageTiming = (messages: readonly AgentThreadMessage[], index: number) => {
  const endTime = readMessageTimestamp(messages[index])
  if (endTime === null) return undefined

  for (let previousIndex = index - 1; previousIndex >= 0; previousIndex -= 1) {
    const candidate = messages[previousIndex]
    if (readMessageRole(candidate) !== 'user') continue
    const startTime = readMessageTimestamp(candidate)
    if (startTime === null) return undefined
    return {
      streamStartTime: startTime,
      totalStreamTime: Math.max(0, endTime - startTime),
      totalChunks: 1,
      toolCallCount: countToolCallsInRange(messages, previousIndex + 1, index),
    }
  }

  return undefined
}

const findLatestAssistantMessageId = (conversationId: string, messages: readonly AgentThreadMessage[]) => {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index]
    if (readMessageRole(message) !== 'assistant') continue
    return createMessageId(conversationId, message, index)
  }

  return ''
}

export const convertAgentMessageToThreadMessage =
  (conversationId: string, messages: readonly AgentThreadMessage[] = []) =>
  (message: AgentThreadMessage, index: number): ThreadMessageLike => {
    const record = message as unknown
    const timestamp = isRecord(record) && typeof record.timestamp === 'number' ? record.timestamp : Date.now()
    const createdAt = new Date(timestamp)
    const id = createMessageId(conversationId, record, index)

    if (!isRecord(record)) {
      return { id, role: 'assistant', content: '', createdAt }
    }

    if (record.role === 'user') {
      return {
        id,
        role: 'user',
        content: [{ type: 'text', text: readAgentContentText(record.content) }],
        createdAt,
      }
    }

    if (record.role === 'toolResult') {
      return {
        id,
        role: 'assistant',
        content: mapToolResultMessage(record),
        createdAt,
        status:
          record.isError === true
            ? { type: 'incomplete', reason: 'error', error: 'Tool execution failed' }
            : { type: 'complete', reason: 'stop' },
      }
    }

    if (record.role === 'assistant') {
      const content = Array.isArray(record.content)
        ? record.content.map(mapAssistantPart).filter((part): part is AssistantContentPart => Boolean(part))
        : [{ type: 'text' as const, text: readAgentContentText(record.content) }]

      return {
        id,
        role: 'assistant',
        content,
        createdAt,
        metadata: {
          timing: createAssistantMessageTiming(messages, index),
        },
        status:
          typeof record.errorMessage === 'string'
            ? { type: 'incomplete', reason: 'error', error: record.errorMessage }
            : { type: 'complete', reason: 'stop' },
      }
    }

    return {
      id,
      role: 'assistant',
      content: readAgentContentText(record.content),
      createdAt,
    }
  }

const readAppendMessageText = (message: AppendMessage) => {
  const text = message.content
    .map((part) => {
      if (part.type === 'text') return part.text
      if (part.type === 'image') return part.filename ? `[Image: ${part.filename}]` : '[Image attached]'
      if (part.type === 'file') return `[File: ${part.filename || part.mimeType}]`
      return ''
    })
    .filter(Boolean)
    .join('\n')
    .trim()
  const attachments = (message.attachments ?? [])
    .map((attachment) => `- ${attachment.type}: ${attachment.name}`)
    .filter(Boolean)
    .join('\n')

  if (!attachments) return text
  return [text, `Attached files:\n${attachments}`].filter(Boolean).join('\n\n').trim()
}

const escapeMarkdownTableCell = (value: string) => value.replace(/\\/g, '\\\\').replace(/\|/g, '\\|').trim()

const normalizeTabSeparatedTables = (text: string) => {
  const lines = text.split('\n')
  const normalizedLines: string[] = []

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    if (!line.includes('\t')) {
      normalizedLines.push(line)
      continue
    }

    const tableLines: string[] = []
    while (index < lines.length && lines[index].includes('\t') && lines[index].trim()) {
      tableLines.push(lines[index])
      index += 1
    }
    index -= 1

    const rows = tableLines.map((row) => row.split('\t').map(escapeMarkdownTableCell))
    const columnCount = Math.max(...rows.map((row) => row.length))
    if (rows.length < 2 || columnCount < 2) {
      normalizedLines.push(...tableLines)
      continue
    }

    const padRow = (row: string[]) => Array.from({ length: columnCount }, (_, columnIndex) => row[columnIndex] ?? '')
    const [header, ...body] = rows.map(padRow)
    normalizedLines.push(`| ${header.join(' | ')} |`)
    normalizedLines.push(`| ${header.map(() => '---').join(' | ')} |`)
    body.forEach((row) => normalizedLines.push(`| ${row.join(' | ')} |`))
  }

  return normalizedLines.join('\n')
}

const AgentMarkdown = () => (
  <MarkdownTextPrimitive
    className='vbi-agent-markdown'
    preprocess={normalizeTabSeparatedTables}
    remarkPlugins={[remarkGfm]}
  />
)

const AgentReasoningMarkdown = ({ text }: { text: string }) => (
  <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
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
        {formatCompactTokenCount(text.length)} chars · preview
      </span>
    </div>
  )
}

const groupAgentMessagePart = (part: PartState) => (part.type === 'tool-call' ? (['group-agent-tools'] as const) : null)

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

const ToolPart = ({ part }: { part: AgentToolPart }) => {
  const resultText = isRecord(part.result) ? readAgentContentText(part.result.content) : ''
  const resultDisplay = isRecord(part.result) && isRecord(part.result.details) ? part.result.details.display : ''
  const status = resolveToolStatus(part)
  const actionLabel = readToolActionLabel(part)
  const argsText = hasUsefulJson(part.argsText) ? part.argsText : ''
  const displayText = typeof resultDisplay === 'string' && resultDisplay ? resultDisplay : resultText

  return (
    <details className='vbi-agent-tool-part'>
      <summary>
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
      {argsText || displayText ? (
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

const ToolGroup = ({ children, count, status }: { children: ReactNode; count: number; status: ToolDisplayStatus }) => (
  <details className='vbi-agent-tool-group'>
    <summary>
      <span className='vbi-agent-tool-group-icon' data-status={status} aria-hidden='true'>
        {status === 'running' ? (
          <LoaderCircle className='h-4 w-4 animate-spin' />
        ) : status === 'error' ? (
          <CircleAlert className='h-4 w-4' />
        ) : (
          <FileSearch className='h-4 w-4' />
        )}
      </span>
      <span>
        {count} tool {count === 1 ? 'call' : 'calls'}
      </span>
      <span className='vbi-agent-tool-group-status'>
        {status === 'running' ? 'Running' : status === 'error' ? 'Needs attention' : 'Completed'}
      </span>
      <ChevronDown className='vbi-agent-tool-chevron h-4 w-4' aria-hidden='true' />
    </summary>
    <div className='vbi-agent-tool-group-content'>{children}</div>
  </details>
)

const MessagePart = ({ part, role }: { part: EnrichedPartState; role: MessageState['role'] }) => {
  if (part.type === 'text' && role === 'user') return <UserTextPart text={part.text} />
  if (part.type === 'text') return <AgentMarkdown />
  if (part.type === 'reasoning') {
    return (
      <details className='vbi-agent-reasoning-part'>
        <summary>Reasoning</summary>
        <AgentReasoningMarkdown text={part.text} />
      </details>
    )
  }
  if (part.type === 'tool-call') return <ToolPart part={part} />
  if (part.type === 'image') return <img className='vbi-agent-image-part' alt='' src={part.image} />
  if (part.type === 'file') return <pre>{part.filename || part.mimeType}</pre>
  if (part.type === 'data') return <pre>{stringifyJson(part.data)}</pre>
  return null
}

const AgentEmptyThread = ({ t }: { t: Translate }) => (
  <div className='vbi-agent-thread-empty'>
    <h1>{t('agent.emptyTitle')}</h1>
  </div>
)

const ComposerAttachment = () => (
  <AttachmentPrimitive.Root className='vbi-agent-composer-attachment'>
    <AttachmentPrimitive.unstable_Thumb className='vbi-agent-composer-attachment-thumb' aria-hidden='true' />
    <span className='vbi-agent-composer-attachment-name'>
      <AttachmentPrimitive.Name />
    </span>
    <AttachmentPrimitive.Remove
      aria-label='Remove attachment'
      className='vbi-agent-composer-attachment-remove'
      type='button'
    >
      <X className='h-3.5 w-3.5' />
    </AttachmentPrimitive.Remove>
  </AttachmentPrimitive.Root>
)

const ThreadMessage = ({
  isLatestAssistantMessage,
  message,
}: {
  isLatestAssistantMessage: boolean
  message: MessageState
}) => {
  const parts = message.content as readonly RenderedMessagePart[]

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
                  case 'group-agent-tools':
                    return (
                      <ToolGroup count={part.indices.length} status={resolveToolGroupStatus(part.status)}>
                        {children}
                      </ToolGroup>
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
          ) : (
            <span className='vbi-agent-message-pending'>
              <LoaderCircle className='h-3.5 w-3.5 animate-spin' />
            </span>
          )}
        </div>
        {message.status?.type === 'incomplete' ? (
          <div className='vbi-agent-message-error'>
            <CircleAlert className='h-3.5 w-3.5' />
            <span>{String(message.status.error ?? message.status.reason)}</span>
          </div>
        ) : null}
        <MessageActionBar isLatestAssistantMessage={isLatestAssistantMessage} message={message} />
      </div>
    </MessagePrimitive.Root>
  )
}

const AgentAssistantThread = ({
  onDraftSubmit,
  runtime,
  snapshot,
  t,
}: {
  onDraftSubmit?: (input: string) => Promise<void>
  runtime: AgentConversationRuntime | null
  snapshot: AgentConversationRuntimeSnapshot
  t: Translate
}) => {
  const usageText = runtime
    ? formatAgentContextUsage(
        resolveAgentContextUsage({
          messages: runtime.agent.state.messages,
          model: runtime.agent.state.model,
        }),
      )
    : '0 / - · -'
  const attachmentAdapter = useMemo(() => new SimpleImageAttachmentAdapter(), [])
  const mergedMessages = useMemo(() => mergeAgentToolResults(snapshot.messages), [snapshot.messages])
  const latestAssistantMessageId = useMemo(
    () => (runtime ? findLatestAssistantMessageId(runtime.conversationId, mergedMessages) : ''),
    [mergedMessages, runtime],
  )
  const adapter = useMemo<ExternalStoreAdapter<AgentThreadMessage>>(
    () => ({
      messages: mergedMessages,
      isRunning: snapshot.isRunning,
      isSendDisabled: snapshot.isRunning || (!runtime && !onDraftSubmit),
      adapters: {
        attachments: attachmentAdapter,
      },
      convertMessage: runtime
        ? convertAgentMessageToThreadMessage(runtime.conversationId, mergedMessages)
        : () => ({ role: 'assistant', content: '' }),
      onNew: async (message) => {
        const input = readAppendMessageText(message)
        if (!input) return
        if (runtime) {
          await runtime.send(input)
          return
        }
        await onDraftSubmit?.(input)
      },
      onCancel: async () => {
        runtime?.agent.abort()
      },
      unstable_capabilities: {
        copy: true,
      },
    }),
    [attachmentAdapter, mergedMessages, onDraftSubmit, runtime, snapshot.isRunning],
  )
  const assistantRuntime = useExternalStoreRuntime(adapter)
  const isEmpty = snapshot.messages.length === 0

  return (
    <AssistantRuntimeProvider runtime={assistantRuntime}>
      <ThreadPrimitive.Root className='vbi-agent-thread' data-empty={isEmpty}>
        <ThreadPrimitive.Viewport className='vbi-agent-thread-viewport' autoScroll turnAnchor='bottom'>
          <AuiIf condition={(state) => state.thread.isEmpty}>
            <AgentEmptyThread t={t} />
          </AuiIf>
          <ThreadPrimitive.Messages>
            {({ message }) => (
              <ThreadMessage isLatestAssistantMessage={message.id === latestAssistantMessageId} message={message} />
            )}
          </ThreadPrimitive.Messages>
        </ThreadPrimitive.Viewport>
        <div className='vbi-agent-thread-footer'>
          <ComposerPrimitive.AttachmentDropzone className='vbi-agent-composer-dropzone'>
            <ComposerPrimitive.Root className='vbi-agent-composer'>
              <div className='vbi-agent-composer-field'>
                <ComposerPrimitive.Input
                  aria-label={t('nav.agent')}
                  className='vbi-agent-composer-input'
                  placeholder={t('agent.composerPlaceholder')}
                  rows={2}
                  submitMode='enter'
                />
                <div className='vbi-agent-composer-attachments'>
                  <ComposerPrimitive.Attachments>{() => <ComposerAttachment />}</ComposerPrimitive.Attachments>
                </div>
              </div>
              <div className='vbi-agent-composer-toolbar'>
                <ComposerPrimitive.AddAttachment
                  aria-label='Attach image'
                  className='vbi-agent-composer-action vbi-agent-composer-attach'
                  multiple
                  type='button'
                >
                  <Plus className='h-5 w-5' />
                </ComposerPrimitive.AddAttachment>
                <AuiIf condition={(state) => state.thread.isRunning}>
                  <ComposerPrimitive.Cancel
                    aria-label='Stop'
                    className='vbi-agent-composer-action vbi-agent-composer-submit'
                    type='button'
                  >
                    <Square className='h-4 w-4' />
                  </ComposerPrimitive.Cancel>
                </AuiIf>
                <AuiIf condition={(state) => !state.thread.isRunning}>
                  <ComposerPrimitive.Send
                    aria-label='Send'
                    className='vbi-agent-composer-action vbi-agent-composer-submit'
                    type='button'
                  >
                    <SendHorizontal className='h-4 w-4' />
                  </ComposerPrimitive.Send>
                </AuiIf>
              </div>
            </ComposerPrimitive.Root>
          </ComposerPrimitive.AttachmentDropzone>
          <div className='vbi-agent-context-usage'>{usageText}</div>
        </div>
      </ThreadPrimitive.Root>
    </AssistantRuntimeProvider>
  )
}

export const AgentPage = () => {
  const runtimeMapRef = useRef(new Map<string, AgentConversationRuntime>())
  const storageRef = useRef<VbiAgentStorage | null>(null)
  const activeRuntimeUnsubscribeRef = useRef<(() => void) | null>(null)
  const activeConversationIdRef = useRef('')
  const activationSeqRef = useRef(0)
  const activeConversationId = useAgentConversationsStore((state) => state.activeConversationId)
  const clearActiveConversation = useAgentConversationsStore((state) => state.clearActiveConversation)
  const conversations = useAgentConversationsStore((state) => state.conversations)
  const initializeConversations = useAgentConversationsStore((state) => state.initialize)
  const selectConversation = useAgentConversationsStore((state) => state.selectConversation)
  const setConversationStatus = useAgentConversationsStore((state) => state.setConversationStatus)
  const upsertConversation = useAgentConversationsStore((state) => state.upsertConversation)
  const go = useNavigationStore((state) => state.go)
  const pathname = useNavigationStore((state) => state.pathname)
  const [activeRuntime, setActiveRuntime] = useState<AgentConversationRuntime | null>(null)
  const [activeSnapshot, setActiveSnapshot] = useState<AgentConversationRuntimeSnapshot>(emptySnapshot)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [storageReady, setStorageReady] = useState(false)
  const { t } = useTranslation()
  const routeConversationId = useMemo(() => readAgentConversationRouteId(pathname), [pathname])

  const handleConversationChange = useCallback(
    (update: AgentConversationRuntimeUpdate) => {
      if (update.metadata) {
        upsertConversation(update.metadata, update.status)
      } else {
        setConversationStatus(update.id, update.status)
      }
    },
    [setConversationStatus, upsertConversation],
  )

  const subscribeActiveRuntime = useCallback((runtime: AgentConversationRuntime) => {
    activeRuntimeUnsubscribeRef.current?.()
    activeRuntimeUnsubscribeRef.current = runtime.subscribe((snapshot) => {
      setActiveSnapshot(snapshot)
    })
  }, [])

  const clearActiveRuntime = useCallback(() => {
    activeRuntimeUnsubscribeRef.current?.()
    activeRuntimeUnsubscribeRef.current = null
    activeConversationIdRef.current = ''
    clearActiveConversation()
    setActiveRuntime(null)
    setActiveSnapshot(emptySnapshot)
    setIsLoading(false)
  }, [clearActiveConversation])

  const activateConversation = useCallback(
    async (conversationId: string, options: ActivateConversationOptions = {}) => {
      const storage = storageRef.current
      if (!storage) return null
      const showLoading = options.showLoading ?? true

      const activationSeq = activationSeqRef.current + 1
      activationSeqRef.current = activationSeq
      const isCurrentActivation = () => activationSeqRef.current === activationSeq

      setErrorMessage('')
      if (showLoading) setIsLoading(true)
      try {
        const currentConversationId = activeConversationIdRef.current
        const currentRuntime = currentConversationId ? runtimeMapRef.current.get(currentConversationId) : null
        if (currentRuntime) {
          const currentConversationStillExists = useAgentConversationsStore
            .getState()
            .conversations.some((conversation) => conversation.id === currentConversationId)

          if (!currentConversationStillExists) {
            currentRuntime.destroy()
            runtimeMapRef.current.delete(currentConversationId)
          } else if (!currentRuntime.agent.state.isStreaming) {
            const metadata = await currentRuntime.persist({ touch: false })
            if (!isCurrentActivation()) return null
            upsertConversation(metadata, 'completed')
          }
        }

        let runtime = runtimeMapRef.current.get(conversationId)
        let createdRuntime: AgentConversationRuntime | null = null
        if (!runtime) {
          const { createAgentConversationRuntime } = await import('./agent/agent-runtime')
          runtime = await createAgentConversationRuntime({
            conversationId,
            fallbackTitle: options.fallbackTitle ?? t('agent.newConversation'),
            onConversationChange: handleConversationChange,
            storage,
          })
          createdRuntime = runtime
        }

        if (!isCurrentActivation()) {
          createdRuntime?.destroy()
          return null
        }

        runtimeMapRef.current.set(conversationId, runtime)
        activeConversationIdRef.current = conversationId
        selectConversation(conversationId)
        setActiveRuntime(runtime)
        setActiveSnapshot(runtime.getSnapshot())
        subscribeActiveRuntime(runtime)
        return runtime
      } catch (error) {
        if (isCurrentActivation()) {
          setErrorMessage(error instanceof Error ? error.message : String(error))
        }
        return null
      } finally {
        if (isCurrentActivation()) {
          setIsLoading(false)
        }
      }
    },
    [handleConversationChange, selectConversation, subscribeActiveRuntime, t, upsertConversation],
  )

  const startDraftConversation = useCallback(
    async (input: string) => {
      if (!storageRef.current) return

      const conversationId = createAgentConversationId()
      const runtime = await activateConversation(conversationId, {
        fallbackTitle: input.slice(0, 80) || t('agent.newConversation'),
        showLoading: false,
      })
      if (!runtime) return

      go(createAgentConversationRoute(conversationId))
      await runtime.send(input)
    },
    [activateConversation, go, t],
  )

  useEffect(() => {
    let disposed = false

    const mountAgent = async () => {
      try {
        storageRef.current = await setupVbiAgentIndexedDBStorage()
        if (disposed) return

        await initializeConversations()
        if (disposed) return

        setStorageReady(true)
        setIsLoading(false)
      } catch (error) {
        if (!disposed) {
          setErrorMessage(error instanceof Error ? error.message : String(error))
          setIsLoading(false)
        }
      }
    }

    void mountAgent()

    return () => {
      disposed = true
      activationSeqRef.current += 1
      activeRuntimeUnsubscribeRef.current?.()
      activeRuntimeUnsubscribeRef.current = null
      runtimeMapRef.current.forEach((runtime) => runtime.destroy())
      runtimeMapRef.current.clear()
    }
  }, [initializeConversations])

  useEffect(() => {
    if (!storageReady) return
    if (!routeConversationId) {
      if (activeConversationIdRef.current || activeConversationId) {
        clearActiveRuntime()
      }
      return
    }

    if (routeConversationId === activeConversationIdRef.current) return
    void activateConversation(routeConversationId)
  }, [activateConversation, activeConversationId, clearActiveRuntime, routeConversationId, storageReady])

  useEffect(() => {
    if (
      !storageReady ||
      routeConversationId ||
      !activeConversationId ||
      activeConversationId === activeConversationIdRef.current
    )
      return
    go(createAgentConversationRoute(activeConversationId))
  }, [activeConversationId, go, routeConversationId, storageReady])

  useEffect(() => {
    if (!activeRuntime) return

    const activeSummary = conversations.find((conversation) => conversation.id === activeRuntime.conversationId)
    if (activeSummary) {
      activeRuntime.setTitle(activeSummary.title)
    }
  }, [activeRuntime, conversations])

  return (
    <div
      className='relative h-[calc(100vh-36px)] min-h-[520px] overflow-hidden bg-transparent'
      aria-label={t('nav.agent')}
    >
      <AgentAssistantThread
        key={activeRuntime?.conversationId ?? 'empty'}
        onDraftSubmit={startDraftConversation}
        runtime={activeRuntime}
        snapshot={activeSnapshot}
        t={t}
      />
      {isLoading ? (
        <div className='absolute inset-0 grid place-items-center bg-[var(--vbi-bg)] transition-colors duration-300'>
          <Spinner label={t('agent.loading')} />
        </div>
      ) : null}
      {errorMessage ? (
        <div className='absolute inset-0 grid place-items-center bg-[var(--vbi-bg)] px-6 text-center text-sm text-[var(--vbi-text-muted)] transition-colors duration-300'>
          <div>
            <div className='font-medium text-[var(--vbi-text-strong)]'>{t('agent.error')}</div>
            <div className='mt-2 max-w-xl break-words'>{errorMessage}</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
