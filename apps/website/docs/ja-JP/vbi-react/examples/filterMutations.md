# フィルター条件の編集

この例では、`useWhereFilter` と `useHavingFilter` の mutation 入口を示します。

## 依存関係

- パッケージ依存: `@visactor/vbi-react`、`@visactor/vbi`、`react`
- 入力制約: Where/Having の変更を示せるように、`builder` には少なくとも `region` と `sales` フィールドが必要です

## コードスニペット

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { useHavingFilter, useWhereFilter } from '@visactor/vbi-react'

export function FilterDemo({ builder }: { builder: VBIChartBuilder }) {
  const { whereFilter, mutateWhereFilter, clearWhereFilter } = useWhereFilter(builder)
  const { havingFilter, mutateHavingFilter, clearHavingFilter } = useHavingFilter(builder)

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <button
        onClick={() =>
          mutateWhereFilter((where) => {
            where.add('region', (node) => node.setOperator('eq').setValue('East'))
          })
        }
      >
        Where 条件を追加
      </button>
      <button
        onClick={() =>
          mutateHavingFilter((having) => {
            having.add('sales', (node) => node.setAggregate({ func: 'sum' }).setOperator('gt').setValue(1000))
          })
        }
      >
        Having 条件を追加
      </button>
      <button onClick={clearWhereFilter}>Where をクリア</button>
      <button onClick={clearHavingFilter}>Having をクリア</button>
      <pre>{JSON.stringify({ whereFilter, havingFilter }, null, 2)}</pre>
    </div>
  )
}
```

## 期待される動作

- ボタンをクリックすると、Where/Having 条件がそれぞれ builder のフィルターツリーに追加されます。
- クリアボタンは対応するフィルター条件をただちに削除します。
- ページ下部の JSON で現在のフィルター DSL 構造を確認できます。
