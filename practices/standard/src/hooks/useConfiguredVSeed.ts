import type { VSeed } from '@visactor/vseed';
import { useMemo } from 'react';
import { useVBIStoreConfig } from 'src/model';

export const useConfiguredVSeed = (vseed: VSeed | null) => {
  const { locale, theme } = useVBIStoreConfig();

  return useMemo(() => {
    if (!vseed || (!locale && !theme)) {
      return vseed;
    }

    return {
      ...vseed,
      ...(locale ? { locale } : {}),
      ...(theme ? { theme } : {}),
    } as VSeed;
  }, [locale, theme, vseed]);
};
