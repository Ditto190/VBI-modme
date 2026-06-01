import { useEffect, useState, useMemo } from 'react'
import { APP as VBIWorkbench } from 'streamlined'
import { VBI } from '@visactor/vbi'
import { convertDSLToSQL } from '@visactor/vquery'

const vscode = (window as any).acquireVsCodeApi?.()

const CONNECTOR_ID = 'vscode-sql'

let requestId = 0
const pending = new Map<number, (value: any) => void>()

function sendToHost(type: string, data: Record<string, any> = {}): Promise<any> {
  const id = ++requestId
  return new Promise((resolve) => {
    pending.set(id, resolve)
    vscode.postMessage({ type, requestId: id, ...data })
  })
}

// 监听 Extension Host 的响应
const hostListener = (event: MessageEvent) => {
  const msg = event.data
  if (msg.type === 'query-result' || msg.type === 'schema-result') {
    const resolve = pending.get(msg.requestId)
    if (resolve) {
      pending.delete(msg.requestId)
      resolve(msg)
    }
  }
}
window.addEventListener('message', hostListener)

function registerBridgeConnector() {
  let registered = false
  if (registered) return
  registered = true

  let currentSchema: { name: string; type: string }[] = []
  let currentTableName = 'data'

  VBI.registerConnector(CONNECTOR_ID, async () => ({
    discoverSchema: async () => {
      const result = await sendToHost('get-schema')
      if (result.schema && result.schema.length > 0) {
        currentSchema = result.schema
      }
      if (result.tables && result.tables.length > 0) {
        currentTableName = result.tables[0]
      }
      return currentSchema
    },
    query: async ({ queryDSL }: { queryDSL: any }) => {
      try {
        const sql = convertDSLToSQL(queryDSL, currentTableName)
        const result = await sendToHost('execute-query', { sql })
        return { dataset: result.dataset || [] }
      } catch (e) {
        console.error('Bridge query error:', e)
        return { dataset: [] }
      }
    },
  }))
}

function App() {
  const [initialized, setInitialized] = useState(false)

  const builder = useMemo(() => {
    if (!initialized) return undefined
    registerBridgeConnector()
    return VBI.chart.create(VBI.chart.createEmpty(CONNECTOR_ID))
  }, [initialized])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data
      if (message.type === 'load-sql' || message.type === 'update-sql') {
        setInitialized(true)
      }
    }

    window.addEventListener('message', handleMessage)
    if (vscode) vscode.postMessage({ type: 'ready' })

    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div style={{ height: '100vh', width: '100vw', margin: 0, padding: 0 }}>
      {builder ? (
        <VBIWorkbench builder={builder} mode='edit' />
      ) : (
        <div style={{ padding: '20px' }}>Open a .sql file to start...</div>
      )}
    </div>
  )
}

export default App
