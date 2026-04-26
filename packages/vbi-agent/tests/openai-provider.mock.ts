import { vi } from 'vitest'

export const createStream = (...chunks: unknown[]) => ({
  async *[Symbol.asyncIterator]() {
    yield* chunks
  },
})

export const openaiModel = { modelId: 'mock-model' }
export const chatMethod = vi.fn(() => openaiModel)
export const openaiProvider = { chat: chatMethod }
export const createOpenAI = vi.fn(() => openaiProvider)
export const jsonSchema = vi.fn((schema: unknown) => ({ jsonSchema: schema }) as any)
export const streamText = vi.fn()

export const resetOpenAIMocks = () => {
  createOpenAI.mockClear()
  chatMethod.mockClear()
  jsonSchema.mockClear()
  streamText.mockReset()
}
