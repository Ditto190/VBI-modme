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
import { useCallback, useLayoutEffect, useMemo, useRef } from 'react'
import type { Translate } from '../../../i18n'
import type { AgentConversationRuntime, AgentConversationRuntimeSnapshot } from '../agent-runtime'
import type { AgentModelId, AgentThinkingLevel } from '../agent-model-config'
import { formatAgentContextUsage, resolveAgentContextUsage } from '../agent-usage-display'
import { AgentComposer } from './AgentComposer'
import { AgentThreadMessage } from './AgentMessageParts'
import {
  convertAgentMessageToThreadMessage,
  findLatestCopyableAssistantMessageId,
  findLatestAssistantMessageId,
  mergeAgentToolResults,
  readAppendMessageText,
  type AgentThreadMessage as AgentThreadMessageValue,
} from './agent-message-adapter'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const AgentEmptyThread = ({ t }: { t: Translate }) => (
  <div className='vbi-agent-thread-empty'>
    <h1>{t('agent.emptyTitle')}</h1>
  </div>
)

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
  const messageConversionContextRef = useRef({
    conversationId: '',
    indices: new WeakMap<object, number>(),
  })
  const convertExternalAgentMessage = useCallback((message: AgentThreadMessageValue) => {
    const { conversationId, indices } = messageConversionContextRef.current
    return convertAgentMessageToThreadMessage(conversationId, message, indices.get(message) ?? 0)
  }, [])
  const conversionMessages = useMemo(() => {
    const nextMessages =
      snapshot.isRunning && mergedMessages.length > 0
        ? mergedMessages.map((message, index) =>
            index === mergedMessages.length - 1 && isRecord(message) ? { ...message } : message,
          )
        : mergedMessages
    const indices = new WeakMap<object, number>()
    nextMessages.forEach((message, index) => {
      indices.set(message, index)
    })
    messageConversionContextRef.current = {
      conversationId: runtime?.conversationId ?? '',
      indices,
    }
    return nextMessages
  }, [mergedMessages, runtime?.conversationId, snapshot.isRunning])
  const convertedMessages = useExternalMessageConverter<AgentThreadMessageValue>({
    callback: convertExternalAgentMessage,
    messages: conversionMessages,
    isRunning: snapshot.isRunning,
    joinStrategy: 'none',
  })
  const latestAssistantMessageId = useMemo(
    () => (runtime ? findLatestAssistantMessageId(runtime.conversationId, mergedMessages) : ''),
    [mergedMessages, runtime],
  )
  const latestCopyableAssistantMessageId = useMemo(
    () =>
      runtime ? findLatestCopyableAssistantMessageId(runtime.conversationId, mergedMessages, snapshot.isRunning) : '',
    [mergedMessages, runtime, snapshot.isRunning],
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
        runtime?.agent.abort()
      },
      unstable_capabilities: {
        copy: true,
      },
    }),
    [attachmentAdapter, convertedMessages, onDraftSubmit, runtime, snapshot.isRunning],
  )
  const assistantRuntime = useExternalStoreRuntime(adapter)
  const isEmpty = snapshot.messages.length === 0
  const viewportRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return undefined

    let isPinnedToBottom = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 64
    let frame = 0

    const readPinnedState = () => {
      isPinnedToBottom = viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight < 64
    }
    const keepPinnedContentVisible = () => {
      if (!isPinnedToBottom) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        viewport.scrollTop = viewport.scrollHeight
      })
    }
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(keepPinnedContentVisible)
    if (resizeObserver) {
      const footer = footerRef.current
      const runningMessage = viewport.querySelector('.vbi-agent-message[data-running="true"]')
      if (footer) resizeObserver.observe(footer)
      if (runningMessage) resizeObserver.observe(runningMessage)
    }

    viewport.addEventListener('scroll', readPinnedState, { passive: true })
    keepPinnedContentVisible()

    return () => {
      cancelAnimationFrame(frame)
      viewport.removeEventListener('scroll', readPinnedState)
      resizeObserver?.disconnect()
    }
  }, [latestAssistantMessageId, snapshot.isRunning])

  return (
    <AssistantRuntimeProvider runtime={assistantRuntime}>
      <ThreadPrimitive.Root className='vbi-agent-thread' data-empty={isEmpty}>
        <ThreadPrimitive.Viewport
          ref={viewportRef}
          autoScroll
          className='vbi-agent-thread-viewport'
          turnAnchor='bottom'
        >
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
          <ThreadPrimitive.ViewportFooter ref={footerRef} className='vbi-agent-thread-footer'>
            <AgentComposer
              disabled={snapshot.isRunning}
              modelId={modelId}
              onModelChange={onModelChange}
              onThinkingLevelChange={onThinkingLevelChange}
              t={t}
              thinkingLevel={thinkingLevel}
              usageText={usageText}
            />
          </ThreadPrimitive.ViewportFooter>
        </ThreadPrimitive.Viewport>
      </ThreadPrimitive.Root>
    </AssistantRuntimeProvider>
  )
}
