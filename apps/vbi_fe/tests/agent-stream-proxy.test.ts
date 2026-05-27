import { beforeEach, describe, expect, rs, test } from '@rstest/core'
import { streamProxy } from '../src/views/agent/agent-stream-proxy'

const model = {
  api: 'openai-completions',
  id: 'deepseek-v4-flash',
  provider: 'deepseek',
}

const collectStreamEvents = async (stream: AsyncIterable<unknown>) => {
  const events: unknown[] = []
  for await (const event of stream) {
    events.push(event)
  }
  return events
}

const createSseResponse = (events: unknown[]) => {
  const encoder = new TextEncoder()
  return new Response(
    new ReadableStream({
      start(controller) {
        for (const event of events) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
        }
        controller.close()
      },
    }),
  )
}

const usage = {
  cacheRead: 0,
  cacheWrite: 0,
  cost: { cacheRead: 0, cacheWrite: 0, input: 0, output: 0, total: 0 },
  input: 2,
  output: 3,
  totalTokens: 5,
}

const createAssistantMessage = (content: unknown[] = []) => ({
  api: model.api,
  content,
  model: model.id,
  provider: model.provider,
  role: 'assistant',
  stopReason: 'stop',
  timestamp: 1,
  usage,
})

describe('streamProxy', () => {
  let restoreRequestAnimationFrame: (() => void) | undefined

  beforeEach(() => {
    rs.clearAllMocks()
    restoreRequestAnimationFrame?.()
    restoreRequestAnimationFrame = undefined
  })

  test('passes backend Pi assistant message events through from SSE', async () => {
    const finalMessage = createAssistantMessage([{ text: 'hello', type: 'text' }])

    globalThis.fetch = rs.fn(async () =>
      createSseResponse([
        { type: 'start', partial: createAssistantMessage() },
        { type: 'text_start', contentIndex: 0, partial: createAssistantMessage([{ text: '', type: 'text' }]) },
        { type: 'text_delta', contentIndex: 0, delta: 'hello', partial: finalMessage },
        { type: 'text_end', contentIndex: 0, content: 'hello', partial: finalMessage },
        { type: 'done', reason: 'stop', message: finalMessage },
      ]),
    ) as typeof fetch

    const stream = streamProxy(model, [{ role: 'user', content: 'hi' }], {
      authToken: 'token-1',
      proxyUrl: '/api/v1/agent',
      temperature: 0.2,
    })
    const events = await collectStreamEvents(stream)

    expect(fetch).toHaveBeenCalledWith(
      '/api/v1/agent/stream',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer token-1' }),
        method: 'POST',
      }),
    )
    expect(JSON.parse(String((fetch as ReturnType<typeof rs.fn>).mock.calls[0]?.[1]?.body))).toMatchObject({
      model,
      options: { temperature: 0.2 },
    })
    expect(events.at(-1)).toMatchObject({
      type: 'done',
      message: {
        content: [{ text: 'hello', type: 'text' }],
        role: 'assistant',
        stopReason: 'stop',
        usage: { input: 2, output: 3, totalTokens: 5 },
      },
    })
  })

  test('emits Pi error message when the backend rejects the stream request', async () => {
    globalThis.fetch = rs.fn(async () => new Response('', { status: 502, statusText: 'Bad Gateway' })) as typeof fetch

    const stream = streamProxy(model, [], {
      authToken: 'token-1',
      proxyUrl: '/api/v1/agent',
    })
    const events = await collectStreamEvents(stream)

    expect(events.at(-1)).toMatchObject({
      error: {
        errorMessage: 'Proxy error: 502 Bad Gateway',
        role: 'assistant',
        stopReason: 'error',
      },
      reason: 'error',
      type: 'error',
    })
  })

  test('defers the proxy request until the browser can paint running state', async () => {
    const originalRequestAnimationFrame = globalThis.requestAnimationFrame
    let nextFrame: FrameRequestCallback | undefined
    globalThis.requestAnimationFrame = rs.fn((callback: FrameRequestCallback) => {
      nextFrame = callback
      return 1
    }) as typeof requestAnimationFrame
    restoreRequestAnimationFrame = () => {
      globalThis.requestAnimationFrame = originalRequestAnimationFrame
    }

    globalThis.fetch = rs.fn(async () =>
      createSseResponse([
        {
          type: 'done',
          reason: 'stop',
          message: createAssistantMessage(),
        },
      ]),
    ) as typeof fetch

    const stream = streamProxy(model, [{ role: 'user', content: 'large prompt' }], {
      authToken: 'token-1',
      proxyUrl: '/api/v1/agent',
    })

    await Promise.resolve()
    expect(fetch).not.toHaveBeenCalled()

    nextFrame?.(0)
    const events = await collectStreamEvents(stream)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(events.at(-1)).toMatchObject({ type: 'done' })
  })
})
