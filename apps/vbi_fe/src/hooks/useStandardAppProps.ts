import { useMemo } from 'react';
import { useAppPreferencesStore } from '../stores/app-preferences.store';

export const useStandardAppProps = () => {
  const locale = useAppPreferencesStore((state) => state.locale);
  const theme = useAppPreferencesStore((state) => state.themeMode);

  return useMemo(
    () => ({ hideLocale: true, hideTheme: true, locale, theme }),
    [locale, theme],
  );
};
