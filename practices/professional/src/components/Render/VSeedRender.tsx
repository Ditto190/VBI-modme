import { message } from 'antd'
import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import type { VSeed } from '@visactor/vseed'
import type { ProfessionalTheme } from 'src/constants/builder'
import { renderVSeed } from './renderVSeed'

type VSeedRenderProps = {
  style?: CSSProperties
  themeMode?: ProfessionalTheme
  vseed: VSeed
}

export const VSeedRender = ({ style, themeMode = 'dark', vseed }: VSeedRenderProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    try {
      return renderVSeed(ref.current, vseed, themeMode)
    } catch (error: unknown) {
      console.error(error)
      message.error('图表渲染失败，请检查当前字段和筛选器配置。')
    }
  }, [themeMode, vseed])

  return <div ref={ref} className='pro-vseed-render' style={style} />
}
