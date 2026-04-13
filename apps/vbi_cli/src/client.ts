import { createRequire } from 'node:module'
import type { VBIProviderClient } from '@visactor/vbi-provider'

const getApiBaseUrl = () => process.env.VBI_API_BASE_URL?.trim() || 'http://localhost:3030/api/v1'

const require = createRequire(import.meta.url)

const loadSdk = (): { createVBIProviderClient(config: { baseUrl: string }): VBIProviderClient } =>
  require('../../packages/vbi-provider/dist/index.cjs') as {
    createVBIProviderClient(config: { baseUrl: string }): VBIProviderClient
  }

export const createCliClient = () =>
  loadSdk().createVBIProviderClient({
    baseUrl: getApiBaseUrl(),
  })
