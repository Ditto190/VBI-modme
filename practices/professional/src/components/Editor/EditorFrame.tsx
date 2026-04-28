import { ConfigProvider, type ThemeConfig } from 'antd'
import type { Locale } from 'antd/es/locale'
import type { ReactNode, RefObject } from 'react'
import type { ProfessionalTheme } from 'src/constants/builder'

type EditorFrameProps = {
  antdLocale: Locale
  children: ReactNode
  isFullscreen: boolean
  mode: 'edit' | 'view'
  rootRef: RefObject<HTMLDivElement | null>
  theme: ProfessionalTheme
  themeConfig: ThemeConfig
}

export const EditorFrame = (props: EditorFrameProps) => (
  <ConfigProvider componentSize='small' locale={props.antdLocale} theme={props.themeConfig}>
    <div
      className={`pro-app pro-app--${props.theme}${props.mode === 'view' ? ' pro-app--view' : ''}${
        props.isFullscreen ? ' pro-app--fullscreen' : ''
      }`}
      ref={props.rootRef}
    >
      {props.children}
    </div>
  </ConfigProvider>
)
