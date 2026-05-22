'use client'

import type { VBIChartBuilder } from '@visactor/vbi'
import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import type { useStandardAppProps } from '../hooks/useStandardAppProps'
import { ensureDemoConnector } from '../services/demoConnector'

const StandardAPP = dynamic(() => import('standard').then((module) => module.APP), {
  ssr: false,
})

type StandardChartAppProps = {
  builder: VBIChartBuilder | null
  fallback: ReactNode
  mode: 'edit' | 'view'
  standardAppProps: ReturnType<typeof useStandardAppProps>
}

export const StandardChartApp = ({ builder, fallback, mode, standardAppProps }: StandardChartAppProps) => {
  const [connectorReady, setConnectorReady] = useState(false)

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
