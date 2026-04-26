import { vi } from 'vitest'

export const createStream = (...chunks: unknown[]) => ({
  async *[Symbol.asyncIterator]() {
    yield* chunks
  },
})

export const deepseekModel = { modelId: 'mock-deepseek-model' }
export const chatMethod = vi.fn(() => deepseekModel)
export const deepseekProvider = { chat: chatMethod }
export const createDeepSeek = vi.fn(() => deepseekProvider)
export const jsonSchema = vi.fn((schema: unknown) => ({ jsonSchema: schema }) as any)
export const streamText = vi.fn()

export const resetDeepSeekMocks = () => {
  createDeepSeek.mockClear()
  chatMethod.mockClear()
  jsonSchema.mockClear()
  streamText.mockReset()
}
