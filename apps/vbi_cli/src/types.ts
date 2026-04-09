import type { VBIProviderClient } from '@visactor/vbi-provider'

export type ChartCommand =
  | { action: 'create'; kind: 'chart'; name?: string }
  | { action: 'get' | 'remove'; id: string; kind: 'chart' }
  | { action: 'list'; kind: 'chart' }
  | { action: 'update'; id: string; kind: 'chart'; name: string }

export type InsightCommand =
  | { action: 'create'; content?: string; kind: 'insight'; name?: string }
  | { action: 'get' | 'remove'; id: string; kind: 'insight' }
  | { action: 'list'; kind: 'insight' }
  | { action: 'update'; content?: string; id: string; kind: 'insight'; name?: string }

export type ReportCommand =
  | { action: 'create'; kind: 'report'; name?: string }
  | { action: 'get' | 'remove' | 'snapshot'; id: string; kind: 'report' }
  | { action: 'list'; kind: 'report' }
  | { action: 'update'; id: string; kind: 'report'; name: string }

export type ReportPageCommand =
  | { action: 'add'; kind: 'report-page'; reportId: string; title?: string }
  | { action: 'remove'; kind: 'report-page'; pageId: string; reportId: string }
  | { action: 'reorder'; kind: 'report-page'; pageIds: string[]; reportId: string }
  | {
      action: 'update'
      chartId?: string
      insightId?: string
      kind: 'report-page'
      pageId: string
      reportId: string
      title?: string
    }

export type HelpCommand = { kind: 'help' }
export type CliCommand = ChartCommand | HelpCommand | InsightCommand | ReportCommand | ReportPageCommand

export interface CliStreams {
  stderr: { write(chunk: string): unknown }
  stdout: { write(chunk: string): unknown }
}

export interface CliCommandDeps extends CliStreams {
  client: VBIProviderClient
}

export interface CliRunDeps extends CliStreams {
  getClient(): Promise<VBIProviderClient> | VBIProviderClient
}
