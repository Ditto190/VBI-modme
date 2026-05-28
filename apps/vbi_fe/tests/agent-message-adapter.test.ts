import { describe, expect, test } from '@rstest/core'
import {
  coalesceReasoningParts,
  convertAgentMessageToThreadMessage,
  mergeAgentToolResults,
  normalizeTabSeparatedTables,
  prepareAgentMessagesForAssistantUi,
  projectAgentMessagesForAssistantUi,
  readAppendMessageText,
} from '../src/views/agent/chat/agent-message-adapter'

describe('agent message adapter', () => {
  test('merges tool results into assistant tool-call parts', () => {
    const [message] = mergeAgentToolResults([
      {
        role: 'assistant',
        content: [
          {
            type: 'toolCall',
            id: 'tool-1',
            name: 'vbi_resource',
            arguments: { action: 'list', resource: 'chart' },
          },
        ],
        timestamp: 1,
      },
      {
        role: 'toolResult',
        toolCallId: 'tool-1',
        toolName: 'vbi_resource',
        content: [{ type: 'text', text: '{"items":[]}' }],
        details: { display: '{"items":[]}' },
      },
    ] as never)

    const converted = convertAgentMessageToThreadMessage('conversation-1', message, 0)

    expect(converted.content).toEqual([
      expect.objectContaining({
        result: expect.objectContaining({
          details: { display: '{"items":[]}' },
        }),
        toolCallId: 'tool-1',
        toolName: 'vbi_resource',
        type: 'tool-call',
      }),
    ])
  })

  test('preserves standalone tool-result errors as incomplete assistant messages', () => {
    const converted = convertAgentMessageToThreadMessage(
      'conversation-1',
      {
        role: 'toolResult',
        toolCallId: 'tool-1',
        toolName: 'vbi_resource',
        isError: true,
        content: [{ type: 'text', text: 'failed' }],
      } as never,
      0,
    )

    expect(converted.status).toEqual({ type: 'incomplete', reason: 'error', error: 'Tool execution failed' })
    expect(converted.content).toEqual([
      expect.objectContaining({
        isError: true,
        toolCallId: 'tool-1',
        type: 'tool-call',
      }),
    ])
  })

  test('maps reasoning parts and converts tab-separated tables to markdown tables', () => {
    const converted = convertAgentMessageToThreadMessage(
      'conversation-1',
      {
        role: 'assistant',
        content: [{ type: 'thinking', thinking: 'Checking resources.' }],
      } as never,
      0,
    )

    expect(converted.content).toEqual([{ type: 'reasoning', text: 'Checking resources.' }])
    expect(normalizeTabSeparatedTables('类型\t名称\n图表\t我的折线图')).toBe(
      '| 类型 | 名称 |\n| --- | --- |\n| 图表 | 我的折线图 |',
    )
  })

  test('preserves assistant content order for streaming text, reasoning, and tool calls', () => {
    const converted = convertAgentMessageToThreadMessage(
      'conversation-1',
      {
        role: 'assistant',
        content: [
          { type: 'text', text: 'I will inspect resources.' },
          { type: 'thinking', thinking: 'List charts.' },
          {
            type: 'toolCall',
            id: 'tool-chart',
            name: 'vbi_resource',
            arguments: { action: 'list', resource: 'chart' },
          },
          { type: 'reasoning', reasoning: 'List insights.' },
          {
            type: 'toolCall',
            id: 'tool-insight',
            name: 'vbi_resource',
            arguments: { action: 'list', resource: 'insight' },
          },
          { type: 'thinking', thinking: 'Summarize totals.' },
          { type: 'text', text: 'Done.' },
        ],
      } as never,
      0,
    )

    expect(converted.content).toEqual([
      { type: 'text', text: 'I will inspect resources.' },
      { type: 'reasoning', text: 'List charts.' },
      expect.objectContaining({ toolCallId: 'tool-chart', type: 'tool-call' }),
      { type: 'reasoning', text: 'List insights.' },
      expect.objectContaining({ toolCallId: 'tool-insight', type: 'tool-call' }),
      { type: 'reasoning', text: 'Summarize totals.' },
      { type: 'text', text: 'Done.' },
    ])
    expect((converted.content as { type: string }[]).filter((part) => part.type === 'reasoning')).toHaveLength(3)
  })

  test('keeps existing part references when there is at most one reasoning part', () => {
    const parts = [
      { type: 'text' as const, text: 'before' },
      { type: 'reasoning' as const, text: 'single step' },
      { type: 'text' as const, text: 'after' },
    ]

    expect(coalesceReasoningParts(parts)).toBe(parts)
  })

  test('keeps separated progress runs separated so GroupedParts can stream them naturally', () => {
    const parts = [
      { type: 'text' as const, text: 'before' },
      { type: 'reasoning' as const, text: 'first step' },
      {
        type: 'tool-call' as const,
        toolCallId: 'tool-1',
        toolName: 'vbi_resource',
        args: {},
        argsText: '{}',
      },
      { type: 'text' as const, text: 'between tools' },
      { type: 'reasoning' as const, text: 'second step' },
      {
        type: 'tool-call' as const,
        toolCallId: 'tool-2',
        toolName: 'vbi_resource',
        args: {},
        argsText: '{}',
      },
      { type: 'text' as const, text: 'after' },
    ]

    const coalesced = coalesceReasoningParts(parts as never)

    expect(coalesced).toBe(parts)
    expect(coalesced.map((part) => part.type)).toEqual([
      'text',
      'reasoning',
      'tool-call',
      'text',
      'reasoning',
      'tool-call',
      'text',
    ])
  })

  test('extracts text and attachment metadata from assistant-ui append messages', () => {
    expect(
      readAppendMessageText({
        role: 'user',
        content: [{ type: 'text', text: 'Build a report' }],
        attachments: [{ id: 'image-1', type: 'image', name: 'chart.png', contentType: 'image/png' }],
      } as never),
    ).toBe('Build a report\n\nAttached files:\n- image: chart.png')
  })

  test('projects same-name tool results by call order when ids are unavailable', () => {
    const prepared = prepareAgentMessagesForAssistantUi('conversation-1', [
      {
        role: 'assistant',
        content: [
          { type: 'toolCall', name: 'vbi_resource', arguments: { action: 'list', resource: 'chart' } },
          { type: 'toolCall', name: 'vbi_resource', arguments: { action: 'list', resource: 'report' } },
        ],
      },
      {
        role: 'toolResult',
        toolName: 'vbi_resource',
        content: [{ type: 'text', text: 'chart-result' }],
      },
      {
        role: 'toolResult',
        toolName: 'vbi_resource',
        content: [{ type: 'text', text: 'report-result' }],
      },
    ] as never)

    const converted = convertAgentMessageToThreadMessage(prepared.context, prepared.messages[0])
    const content = converted.content as Array<{ result?: { content?: Array<{ text?: string }> } }>

    expect(content[0]?.result?.content?.[0]?.text).toBe('chart-result')
    expect(content[1]?.result?.content?.[0]?.text).toBe('report-result')
  })

  test('projects VBI messages into assistant-ui messages through a single pure entrypoint', () => {
    const projected = projectAgentMessagesForAssistantUi({
      conversationId: 'conversation-1',
      isRunning: false,
      messages: [
        {
          role: 'assistant',
          content: [
            { type: 'thinking', thinking: 'Read charts.' },
            { type: 'toolCall', id: 'tool-1', name: 'vbi_resource', arguments: { resource: 'chart' } },
          ],
          timestamp: 1,
        },
        {
          role: 'toolResult',
          toolCallId: 'tool-1',
          toolName: 'vbi_resource',
          content: [{ type: 'text', text: 'chart-result' }],
          timestamp: 2,
        },
      ] as never,
    })

    expect(projected).toHaveLength(1)
    expect(projected[0]?.threadMessage).toEqual(
      expect.objectContaining({
        content: [
          { type: 'reasoning', text: 'Read charts.' },
          expect.objectContaining({
            result: expect.objectContaining({ content: [{ type: 'text', text: 'chart-result' }] }),
            toolCallId: 'tool-1',
            type: 'tool-call',
          }),
        ],
        id: 'conversation-1:0:1:assistant',
        role: 'assistant',
      }),
    )
  })
})
