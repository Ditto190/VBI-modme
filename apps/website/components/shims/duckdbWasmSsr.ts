export type AsyncDuckDBConnection = never
export type DuckDBBundles = Record<string, unknown>

export class ConsoleLogger {
  log() {}
}

export class AsyncDuckDB {
  constructor() {
    throw new Error('DuckDB web runtime is not available during SSG.')
  }
}

export const selectBundle = async () => {
  throw new Error('DuckDB web runtime is not available during SSG.')
}
