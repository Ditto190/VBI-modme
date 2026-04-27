import { rs } from '@rstest/core'

export const createStream = (...chunks: unknown[]) => ({
  async *[Symbol.asyncIterator]() {
    yield* chunks
  },
})

export const deepseekModel = { modelId: 'mock-deepseek-model' }
export const chatMethod = rs.fn(() => deepseekModel)
export const deepseekProvider = { chat: chatMethod }
export const createDeepSeek = rs.fn(() => deepseekProvider)
export const jsonSchema = rs.fn((schema: unknown) => ({ jsonSchema: schema }) as any)
export const streamText = rs.fn()

export const resetDeepSeekMocks = () => {
  createDeepSeek.mockClear()
  chatMethod.mockClear()
  jsonSchema.mockClear()
  streamText.mockReset()
}
