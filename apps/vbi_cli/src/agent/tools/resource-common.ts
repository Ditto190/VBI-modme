import { requireString } from './resource-input.js'
import type { ResourceInput } from './resource-input.js'

type CommonProvider<TCreate> = {
  create(input: TCreate): Promise<unknown>
  getDetail(): Promise<unknown>
  remove(): Promise<unknown>
  rename(name: string): Promise<unknown>
  snapshot(): Promise<unknown>
}

export const executeCommonResourceAction = <TCreate>(
  provider: CommonProvider<TCreate>,
  action: string,
  input: ResourceInput,
  createInput: TCreate,
  fallback: () => Promise<unknown>,
) => {
  if (action === 'create') return provider.create(createInput)
  if (action === 'get') return provider.getDetail()
  if (action === 'rename') return provider.rename(requireString(input, 'name'))
  if (action === 'remove') return provider.remove()
  if (action === 'snapshot') return provider.snapshot()
  return fallback()
}
