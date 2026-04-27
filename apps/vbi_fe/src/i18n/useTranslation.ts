import { useMemo } from 'react';
import { useAppPreferencesStore } from '../stores/app-preferences.store';
import { createTranslator } from './utils';

export const useTranslation = () => {
  const locale = useAppPreferencesStore((state) => state.locale);
  const setLocale = useAppPreferencesStore((state) => state.setLocale);
  const t = useMemo(() => createTranslator(locale), [locale]);

  return { locale, setLocale, t };
};
