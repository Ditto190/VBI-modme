type BrowserImportMeta = ImportMeta & {
  env?: Record<string, string | undefined>
}

const readEnv = (key: string) => (import.meta as BrowserImportMeta).env?.[key]?.trim() || ''

export const browserEnv = {
  agentModel: readEnv('NEXT_PUBLIC_AGENT_MODEL') || readEnv('PUBLIC_AGENT_MODEL'),
  agentProvider: readEnv('NEXT_PUBLIC_AGENT_PROVIDER') || readEnv('PUBLIC_AGENT_PROVIDER'),
}
