import * as vscode from 'vscode'
import { SqlVisualizerProvider } from './SqlVisualizerProvider'

export function activate(context: vscode.ExtensionContext) {
  console.log('VBI SQL Visualizer Extension Activated!')
  vscode.window.showInformationMessage('VBI SQL Visualizer Extension Activated!')

  context.subscriptions.push(SqlVisualizerProvider.register(context))

  // Add a fallback command to force open the active file with our custom editor
  context.subscriptions.push(
    vscode.commands.registerCommand('vbi.forceOpenSqlVisualizer', () => {
      const activeEditor = vscode.window.activeTextEditor
      if (activeEditor) {
        vscode.commands.executeCommand('vscode.openWith', activeEditor.document.uri, SqlVisualizerProvider.viewType)
      } else {
        vscode.window.showErrorMessage('No active text editor to open with VBI Visualizer.')
      }
    }),
  )
}
