import { rs } from '@rstest/core'

export const createStream = (...chunks: unknown[]) => ({
  async *[Symbol.asyncIterator]() {
    yield* chunks
  },
})

export const openaiModel = { modelId: 'mock-model' }
export const chatMethod = rs.fn(() => openaiModel)
export const openaiProvider = { chat: chatMethod }
export const createOpenAI = rs.fn(() => openaiProvider)
export const jsonSchema = rs.fn((schema: unknown) => ({ jsonSchema: schema }) as any)
export const streamText = rs.fn()

export const resetOpenAIMocks = () => {
  createOpenAI.mockClear()
  chatMethod.mockClear()
  jsonSchema.mockClear()
  streamText.mockReset()
}
