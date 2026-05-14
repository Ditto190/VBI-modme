# コンポーネントによるレイアウト

この例では、`BuilderLayout` + `FieldPanel` + `ChartRenderer` + `ChartTypeSelector` を示します。

## 依存関係

- パッケージ依存: `@visactor/vbi-react/components`、`@visactor/vbi`、`react`
- 入力制約: `FieldPanel` の追加・削除操作を示せるように、`builder` には選択可能なディメンション/メジャーフィールドが必要です

## コードスニペット

```tsx
import type { VBIChartBuilder } from '@visactor/vbi'
import { BuilderLayout, ChartRenderer, ChartTypeSelector, FieldPanel } from '@visactor/vbi-react/components'

export function LayoutDemo({ builder }: { builder: VBIChartBuilder }) {
  return (
    <BuilderLayout
      topBar={<ChartTypeSelector builder={builder} />}
      leftPanel={
        <FieldPanel
          builder={builder}
          dimensionOptions={[{ label: '地域', value: 'region' }]}
          measureOptions={[{ label: '売上', value: 'sales' }]}
        />
      }
      main={<ChartRenderer builder={builder} debounce={100} />}
    />
  )
}
```

## 期待される動作

- 上部でチャートタイプを切り替え、左側でディメンション/メジャーを追加・削除し、メイン領域でチャート DSL プレビューを表示します。
- フィールド操作後、メイン領域の内容は手動操作なしで自動更新されます。
- ビルドに失敗すると、`ChartRenderer` がデフォルトのエラーと再試行ボタンを表示します。
