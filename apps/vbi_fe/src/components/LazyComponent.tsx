import { Suspense, lazy, type ComponentType, type ReactNode } from 'react'

export const lazyComponent = <TProps extends object = object>(
  load: () => Promise<{ default: ComponentType<TProps> | ComponentType<never> }>,
  fallback: ReactNode = null,
) => {
  const Component = lazy(load as () => Promise<{ default: ComponentType<TProps> }>)

  return function LazyComponent(props: TProps) {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    )
  }
}
