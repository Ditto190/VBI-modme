import { createVBIProviderClient } from '@visactor/headless-bi-provider/client'

export const platformClient = createVBIProviderClient({
  baseUrl: '/api/v1',
})
