# ドキュメント

:::info
`TypeScript` の型を書くことは、間接的に設定項目のドキュメントを書くことです。
:::

VSeed のすべてのチャートタイプのドキュメントは、[`packages/vseed/src/types/chartType`](https://github.com/VisActor/VSeed/tree/main/packages/vseed/src/types/chartType) ディレクトリにあります。

## ドキュメントの自動生成

```bash title="source: scripts/build-docs.js"
pnpm run build:docs
```


:::warning
ドキュメントの内容は直接編集しないでください。いつでも上書きされる可能性があります。

`build:docs` は数秒で完了するため、増分更新は行っていません。ドキュメントを生成するたびに、既存のドキュメントはすべて削除され、新しいドキュメントが生成されます。

:::
