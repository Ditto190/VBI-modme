'use client'

import {
  AssistantRuntimeProvider,
  AuiIf,
  SimpleImageAttachmentAdapter,
  ThreadPrimitive,
  useExternalMessageConverter,
  useExternalStoreRuntime,
  type ExternalStoreAdapter,
  type ThreadMessage,
} from '@assistant-ui/react'
import { useCallback, useMemo } from 'react'
import type { Translate } from '../../../i18n'
import type { AgentConversationRuntime, AgentConversationRuntimeSnapshot } from '../agent-runtime'
import type { AgentModelId, AgentThinkingLevel } from '../agent-model-config'
import { AgentComposer } from './AgentComposer'
import { AgentThreadMessage } from './AgentMessageParts'
import {
  projectAgentMessagesForAssistantUi,
  readAppendMessageText,
  type ProjectedAgentThreadMessage,
} from './agent-message-adapter'

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

export const AgentChatPanel = ({
  modelId,
  onDraftSubmit,
  onModelChange,
  onThinkingLevelChange,
  runtime,
  snapshot,
  t,
  thinkingLevel,
}: {
  modelId: AgentModelId
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
        isRunning: snapshot.isRunning,
        messages: snapshot.messages,
      }),
    [runtime?.conversationId, snapshot.isRunning, snapshot.messages],
  )
  const convertProjectedMessage = useCallback((message: ProjectedAgentThreadMessage) => message.threadMessage, [])
  const convertedMessages = useExternalMessageConverter<ProjectedAgentThreadMessage>({
    callback: convertProjectedMessage,
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
