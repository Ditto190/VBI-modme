# useVBI

## Import

```ts
import { useVBI } from '@visactor/vbi-react'
```

## Signature

```ts
useVBI(builder: VBIChartBuilder): UseVBIReturn
```

## Description

Subscribes to changes in the builder's DSL snapshot and returns the latest `dsl` plus the original `builder`.

## Minimal Example

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useVBI(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
