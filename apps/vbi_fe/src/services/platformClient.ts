import { createVBIProviderClient } from '@visactor/vbi-provider';

export const platformClient = createVBIProviderClient({
  baseUrl: '/api/v1',
});
