'use client'

import {
  AssistantRuntimeProvider,
  AuiIf,
  SimpleImageAttachmentAdapter,
  ThreadPrimitive,
  useExternalMessageConverter,
  useExternalStoreRuntime,
  type AppendMessage,
  type ExternalStoreAdapter,
  type ThreadMessage,
  type ThreadMessageLike,
} from '@assistant-ui/react'
import { useMemo } from 'react'
import type { Translate } from '../../../i18n'
import type {
  AgentConversationRuntime,
  AgentConversationRuntimeSnapshot,
} from '../../../application/agent/agent-runtime'
import type { AgentModelId, AgentModelOption, AgentThinkingLevel } from '../../../application/agent/agent-model-config'
import { AgentComposer } from './AgentComposer'
import { AgentThreadMessage } from './AgentMessageParts'
import { projectAgentMessagesForAssistantUi } from './agent-message-adapter'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const AgentEmptyThread = ({ t }: { t: Translate }) => (
  <div className='vbi-agent-thread-empty'>
    <h1>{t('agent.emptyTitle')}</h1>
  </div>
)

const isCompleteAssistantMessage = (message: ThreadMessage) =>
  message.role === 'assistant' && (message.status === undefined || message.status.type === 'complete')

const hasAssistantText = (message: ThreadMessage) => {
  const content: unknown = message.content
  if (typeof content === 'string') return Boolean(content.trim())
  if (!Array.isArray(content)) return false
  return content.some(
    (part) => isRecord(part) && part.type === 'text' && typeof part.text === 'string' && part.text.trim(),
  )
}

const findLatestCopyableThreadMessageId = (messages: readonly ThreadMessage[]) => {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index]
    if (isCompleteAssistantMessage(message) && hasAssistantText(message)) return message.id
  }

  return ''
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

export const AgentChatPanel = ({
  modelId,
  modelOptions,
  onDraftSubmit,
  onModelChange,
  onThinkingLevelChange,
  runtime,
  snapshot,
  t,
  thinkingLevel,
}: {
  modelId: AgentModelId
  modelOptions: AgentModelOption[]
  onDraftSubmit?: (input: string) => Promise<void>
  onModelChange: (modelId: AgentModelId) => void
  onThinkingLevelChange: (thinkingLevel: AgentThinkingLevel) => void
  runtime: AgentConversationRuntime | null
  snapshot: AgentConversationRuntimeSnapshot
  t: Translate
  thinkingLevel: AgentThinkingLevel
}) => {
  const attachmentAdapter = useMemo(() => new SimpleImageAttachmentAdapter(), [])
  const projectedMessages = useMemo(
    () =>
      projectAgentMessagesForAssistantUi({
        conversationId: runtime?.conversationId ?? '',
        messages: snapshot.messages,
      }),
    [runtime?.conversationId, snapshot.messages],
  )
  const convertedMessages = useExternalMessageConverter<ThreadMessageLike>({
    callback: (message) => message,
    messages: projectedMessages,
    isRunning: snapshot.isRunning,
    joinStrategy: 'concat-content',
  })
  const latestCopyableAssistantMessageId = useMemo(
    () => findLatestCopyableThreadMessageId(convertedMessages),
    [convertedMessages],
  )
  const adapter = useMemo<ExternalStoreAdapter<ThreadMessage>>(
    () => ({
      messages: convertedMessages,
      isRunning: snapshot.isRunning,
      isSendDisabled: snapshot.isRunning || (!runtime && !onDraftSubmit),
      adapters: {
        attachments: attachmentAdapter,
      },
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
        await runtime?.cancel()
      },
      unstable_capabilities: {
        copy: true,
      },
    }),
    [attachmentAdapter, convertedMessages, onDraftSubmit, runtime, snapshot.isRunning],
  )
  const assistantRuntime = useExternalStoreRuntime(adapter)
  const isEmpty = snapshot.messages.length === 0

  return (
    <AssistantRuntimeProvider runtime={assistantRuntime}>
      <ThreadPrimitive.Root className='vbi-agent-thread' data-empty={isEmpty}>
        <div className='vbi-agent-thread-transcript'>
          <ThreadPrimitive.Viewport autoScroll className='vbi-agent-thread-viewport' turnAnchor='bottom'>
            <AuiIf condition={(state) => state.thread.isEmpty}>
              <AgentEmptyThread t={t} />
            </AuiIf>
            <ThreadPrimitive.Messages>
              {({ message }) => (
                <AgentThreadMessage
                  canCopy={message.role === 'user' || message.id === latestCopyableAssistantMessageId}
                  isLatestAssistantMessage={message.id === latestCopyableAssistantMessageId}
                  message={message}
                />
              )}
            </ThreadPrimitive.Messages>
          </ThreadPrimitive.Viewport>
        </div>
        <div className='vbi-agent-composer-dock'>
          <AgentComposer
            disabled={snapshot.isRunning}
            modelId={modelId}
            modelOptions={modelOptions}
            onModelChange={onModelChange}
            onThinkingLevelChange={onThinkingLevelChange}
            t={t}
            thinkingLevel={thinkingLevel}
            usageText={snapshot.usageText}
          />
        </div>
      </ThreadPrimitive.Root>
    </AssistantRuntimeProvider>
  )
}
