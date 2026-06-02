'use client'

import type { VBIChartBuilder } from '@visactor/vbi'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { useStandardAppProps } from '../hooks/useStandardAppProps'
import { ensureDemoConnector } from '../services/demoConnector'
import { lazyComponent } from './LazyComponent'

const StandardAPP = lazyComponent(() => import('standard').then((module) => ({ default: module.APP })))

type StandardChartAppProps = {
  builder: VBIChartBuilder | null
  fallback: ReactNode
  mode: 'edit' | 'view'
}

export const StandardChartApp = ({ builder, fallback, mode }: StandardChartAppProps) => {
  const [connectorReady, setConnectorReady] = useState(false)
  const standardAppProps = useStandardAppProps()

  useEffect(() => {
    if (!builder) {
      setConnectorReady(false)
      return
    }

    let active = true
    setConnectorReady(false)
    ensureDemoConnector()
      .then(() => {
        if (active) setConnectorReady(true)
      })
      .catch((error: unknown) => {
        console.error('Failed to register demo connector', error)
        if (active) setConnectorReady(false)
      })

    return () => {
      active = false
    }
  }, [builder])

  if (!builder || !connectorReady) {
    return fallback
  }

  return <StandardAPP builder={builder} mode={mode} {...standardAppProps} />
}
