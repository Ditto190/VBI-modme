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

S’abonne aux changements de snapshot DSL du builder et renvoie le dernier `dsl` ainsi que le `builder` d’origine.

## Exemple minimal

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI } from '@visactor/vbi-react'

export function Demo({ builder }: { builder: VBIChartBuilder }) {
  const result = useVBI(builder)
  return <pre>{JSON.stringify(result, null, 2)}</pre>
}
```
