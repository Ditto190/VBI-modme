import * as vscode from 'vscode'
import * as path from 'path'

interface SqlDocumentState {
  db: any // SQL.Database 实例
  tables: string[]
  schema: { name: string; type: string }[]
}

const docStates = new Map<string, SqlDocumentState>()

// ---- sql.js 懒加载 ----
let sqlModulePromise: Promise<any> | null = null

function getSqlJs(): Promise<any> {
  if (sqlModulePromise) return sqlModulePromise
  // sql.js CJS 导出: `exports["Module"] = initSqlJs`
  const initSqlJs = require('sql.js').Module || require('sql.js')
  sqlModulePromise = initSqlJs()
  return sqlModulePromise
}

// ---- 注册 PostgreSQL/DuckDB 兼容函数 ----
function registerCustomFunctions(db: any) {
  // date_part(part, timestamp) — PostgreSQL 兼容
  db.create_function('date_part', (part: string, ts: any) => {
    if (ts == null) return null
    const d = new Date(ts)
    if (isNaN(d.getTime())) return null
    switch (part) {
      case 'quarter':
        return Math.floor(d.getMonth() / 3) + 1
      case 'year':
        return d.getFullYear()
      case 'month':
        return d.getMonth() + 1
      case 'day':
        return d.getDate()
      case 'hour':
        return d.getHours()
      case 'minute':
        return d.getMinutes()
      case 'second':
        return d.getSeconds()
      default:
        return null
    }
  })

  // quantile(expression, q) — DuckDB 兼容
  db.create_aggregate('quantile', {
    init: () => ({ values: [] as number[], q: 0.5 }),
    step: (state: any, val: any, q: number) => {
      if (val != null && !isNaN(Number(val))) {
        state.values.push(Number(val))
        if (q != null) state.q = Number(q)
      }
    },
    finalize: (state: any) => {
      if (state.values.length === 0) return null
      state.values.sort((a: number, b: number) => a - b)
      const idx = Math.floor(state.values.length * state.q)
      return state.values[Math.min(idx, state.values.length - 1)]
    },
  })

  // var_samp(x) — 样本方差
  db.create_aggregate('var_samp', {
    init: () => ({ values: [] as number[] }),
    step: (state: any, val: any) => {
      if (val != null && !isNaN(Number(val))) {
        state.values.push(Number(val))
      }
    },
    finalize: (state: any) => {
      const n = state.values.length
      if (n < 2) return null
      const mean = state.values.reduce((a: number, b: number) => a + b, 0) / n
      return state.values.reduce((s: number, v: number) => s + (v - mean) ** 2, 0) / (n - 1)
    },
  })

  // var_pop(x) — 总体方差
  db.create_aggregate('var_pop', {
    init: () => ({ values: [] as number[] }),
    step: (state: any, val: any) => {
      if (val != null && !isNaN(Number(val))) {
        state.values.push(Number(val))
      }
    },
    finalize: (state: any) => {
      const n = state.values.length
      if (n === 0) return null
      const mean = state.values.reduce((a: number, b: number) => a + b, 0) / n
      return state.values.reduce((s: number, v: number) => s + (v - mean) ** 2, 0) / n
    },
  })

  // stddev(x) — 标准差
  db.create_aggregate('stddev', {
    init: () => ({ values: [] as number[] }),
    step: (state: any, val: any) => {
      if (val != null && !isNaN(Number(val))) {
        state.values.push(Number(val))
      }
    },
    finalize: (state: any) => {
      const n = state.values.length
      if (n < 2) return null
      const mean = state.values.reduce((a: number, b: number) => a + b, 0) / n
      const variance = state.values.reduce((s: number, v: number) => s + (v - mean) ** 2, 0) / (n - 1)
      return Math.sqrt(variance)
    },
  })
}

// ---- 从 SQL 文本建库 ----
async function createDbForSql(sql: string, docUri: string): Promise<SqlDocumentState> {
  // 清理旧状态
  const old = docStates.get(docUri)
  if (old) {
    try {
      old.db.close()
    } catch {
      /* ignore */
    }
    docStates.delete(docUri)
  }

  const SQL = await getSqlJs()
  const db = new SQL.Database()
  registerCustomFunctions(db)

  // 执行用户 SQL（CREATE TABLE / INSERT 等），sql.js 原生支持多语句
  try {
    db.run(sql)
  } catch (e) {
    console.error('SQL execution error:', e)
  }

  const tables: string[] = []
  const schema: { name: string; type: string }[] = []

  // 发现表结构和字段
  try {
    const tableResult = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence'")
    if (tableResult.length > 0) {
      for (const row of tableResult[0].values) {
        const tableName = row[0] as string
        tables.push(tableName)

        try {
          const cols = db.exec(`PRAGMA table_info("${tableName}")`)
          if (cols.length > 0) {
            for (const col of cols[0].values) {
              // PRAGMA table_info 返回: [cid, name, type, notnull, dflt_value, pk]
              const colName = col[1] as string
              const colType = ((col[2] as string) || '').toUpperCase()
              const isNum = ['INT', 'REAL', 'FLOAT', 'DOUBLE', 'NUM', 'DECIMAL'].some((t) => colType.includes(t))
              schema.push({ name: colName, type: isNum ? 'number' : 'string' })
            }
          }
        } catch {
          /* ignore */
        }
      }
    }
  } catch {
    /* ignore */
  }

  const state = { db, tables, schema }
  docStates.set(docUri, state)
  return state
}

export class SqlVisualizerProvider implements vscode.CustomTextEditorProvider {
  public static readonly viewType = 'vbi.sqlVisualizer'

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new SqlVisualizerProvider(context)
    return vscode.window.registerCustomEditorProvider(SqlVisualizerProvider.viewType, provider)
  }

  constructor(private readonly context: vscode.ExtensionContext) {}

  public async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken,
  ): Promise<void> {
    webviewPanel.webview.options = {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, 'webview-ui', 'dist'))],
    }

    webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview)

    const processAndSendSchema = async () => {
      const sql = document.getText()
      const state = await createDbForSql(sql, document.uri.toString())
      webviewPanel.webview.postMessage({
        type: 'load-sql',
        content: sql,
        schema: state.schema,
        tables: state.tables,
      })
    }

    webviewPanel.webview.onDidReceiveMessage(async (e) => {
      switch (e.type) {
        case 'ready':
          await processAndSendSchema()
          break

        case 'execute-query': {
          const state = docStates.get(document.uri.toString())
          if (!state) {
            webviewPanel.webview.postMessage({
              type: 'query-result',
              requestId: e.requestId,
              dataset: [],
            })
            return
          }
          try {
            const result = state.db.exec(e.sql)
            if (result.length > 0) {
              const cols = result[0].columns
              const rows = result[0].values
              const dataset = rows.map((row: any[]) => {
                const obj: Record<string, any> = {}
                cols.forEach((col: string, i: number) => {
                  obj[col] = row[i]
                })
                return obj
              })
              webviewPanel.webview.postMessage({
                type: 'query-result',
                requestId: e.requestId,
                dataset,
              })
            } else {
              webviewPanel.webview.postMessage({
                type: 'query-result',
                requestId: e.requestId,
                dataset: [],
              })
            }
          } catch (err) {
            console.error('Query error:', err)
            webviewPanel.webview.postMessage({
              type: 'query-result',
              requestId: e.requestId,
              dataset: [],
            })
          }
          break
        }

        case 'get-schema': {
          const state = docStates.get(document.uri.toString())
          webviewPanel.webview.postMessage({
            type: 'schema-result',
            requestId: e.requestId,
            schema: state?.schema ?? [],
            tables: state?.tables ?? [],
          })
          break
        }
      }
    })

    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.uri.toString() === document.uri.toString()) {
        processAndSendSchema()
      }
    })

    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose()
      const state = docStates.get(document.uri.toString())
      if (state) {
        try {
          state.db.close()
        } catch {
          /* ignore */
        }
      }
      docStates.delete(document.uri.toString())
    })
  }

  private getHtmlForWebview(webview: vscode.Webview): string {
    const distPath = path.join(this.context.extensionPath, 'webview-ui', 'dist')
    const scriptUri = webview.asWebviewUri(vscode.Uri.file(path.join(distPath, 'assets', 'entry.js')))
    const styleUri = webview.asWebviewUri(vscode.Uri.file(path.join(distPath, 'assets', 'index.css')))

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline' 'unsafe-eval' blob:; style-src * 'unsafe-inline'; script-src * 'unsafe-inline' 'unsafe-eval'; worker-src * blob:; img-src * blob: data:;">
    <link href="${styleUri}" rel="stylesheet">
    <title>SQL Visualizer</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="${scriptUri}"></script>
</body>
</html>`
  }
}
