import enUS from './locales/en-US.json'
import zhCN from './locales/zh-CN.json'
import type { ProfessionalLocale } from 'src/constants/builder'

type Messages = typeof zhCN
export type MessageKey = keyof Messages

const messages: Record<ProfessionalLocale, Messages> = {
  'zh-CN': zhCN,
  'en-US': enUS,
}

export const createTranslator = (locale: ProfessionalLocale) => {
  return (key: MessageKey) => messages[locale][key] ?? key
}
