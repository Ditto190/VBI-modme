# 基本 Hooks

この例では、`useVBI` と `useVSeed` を組み合わせて使用する方法を示します。

## 依存関係

- パッケージ依存: `@visactor/vbi-react`、`@visactor/vbi`、`@visactor/vseed`、`react`
- 入力制約: 初期化済みの `VBIChartBuilder`（利用可能な connector をバインド済み）が必要です

## コードスニペット

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useVBI, useVSeed } from '@visactor/vbi-react'

export function BasicHooksDemo({ builder }: { builder: VBIChartBuilder }) {
  const { dsl } = useVBI(builder)
  const { vseed, loading, error, refetch } = useVSeed(builder, { debounce: 100 })

  if (error) {
    return <button onClick={() => void refetch()}>再試行: {error.message}</button>
  }

  if (loading || !vseed) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h4>chartType: {dsl.chartType}</h4>
      <pre>{JSON.stringify(vseed, null, 2)}</pre>
    </div>
  )
}
```

## 期待される動作

- builder が変化すると、`dsl` と `vseed` が同期して更新されます。
- 初回または更新中は `Loading...` を表示し、失敗時は手動で再試行できます。
- 成功後、現在の `chartType` と最新の VSeed JSON を確認できます。
