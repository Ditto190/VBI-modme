import { createVBIProviderClient } from '@visactor/headless-bi-provider';

export const platformClient = createVBIProviderClient({
  baseUrl: '/api/v1',
});
