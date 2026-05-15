# advanced Pipeline

## advanced pipeline

`advanced pipeline` は VSeed DSL を受け取り、advancedVSeed DSL を出力します。

`advancedVSeed` はグラフィック文法に基づいて設計されたデータ構造で、チャートとテーブルを統一的に記述するために使われます。これはビジネスとチャートライブラリをつなぐ橋渡しです。


`advancedVSeed` 自体も完全にシリアライズ可能です。そのため Node.js 環境で構築し、HTTP 経由で spec pipeline へ転送し、フロントエンドでチャートをレンダリングできます。
