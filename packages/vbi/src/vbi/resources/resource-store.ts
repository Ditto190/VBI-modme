export interface ResourceStore<TBuilder, TDSL, TOptions = void> {
  registerBuilder: (id: string, builder: TBuilder) => void
  registerDSL: (id: string, dsl: TDSL) => void
  resolveBuilder: (id: string, options?: TOptions) => TBuilder | undefined
  build: (id: string) => TDSL | undefined
}

export const createResourceStore = <TBuilder extends { build: () => TDSL }, TDSL, TOptions>(
  createBuilder: (dsl: TDSL, options?: TOptions) => TBuilder,
): ResourceStore<TBuilder, TDSL, TOptions> => {
  const builders = new Map<string, TBuilder>()
  const dsls = new Map<string, TDSL>()

  const registerBuilder = (id: string, builder: TBuilder) => {
    dsls.delete(id)
    builders.set(id, builder)
  }

  const registerDSL = (id: string, dsl: TDSL) => {
    builders.delete(id)
    dsls.set(id, dsl)
  }

  const resolveBuilder = (id: string, options?: TOptions) => {
    const builder = builders.get(id)
    if (builder) {
      return builder
    }

    const dsl = dsls.get(id)
    if (!dsl) {
      return undefined
    }

    const nextBuilder = createBuilder(dsl, options)
    registerBuilder(id, nextBuilder)
    return nextBuilder
  }

  const build = (id: string) => {
    const builder = builders.get(id)
    if (builder) {
      return builder.build()
    }

    return dsls.get(id)
  }

  return {
    registerBuilder,
    registerDSL,
    resolveBuilder,
    build,
  }
}
