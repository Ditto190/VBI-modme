import { ConfigProvider, Spin, type ThemeConfig } from 'antd'
import type { Locale } from 'antd/es/locale'

type LoadingEditorProps = {
  antdLocale: Locale
  label: string
  themeConfig: ThemeConfig
}

export const LoadingEditor = (props: LoadingEditorProps) => (
  <ConfigProvider componentSize='small' locale={props.antdLocale} theme={props.themeConfig}>
    <Spin fullscreen tip={props.label} />
  </ConfigProvider>
)
