# vbi-provider Docs

本目录用于沉淀 `@visactor/vbi-provider` 的目标、ADR 与执行计划。

当前已确认的包定位：

- 它是平台 SDK，不是页面 SDK
- 页面、CLI、脚本都应通过 Provider 访问资源
- 当前已完成 Provider 契约稳定、远程 runtime 落地与前端主路径接入
- 当前远程 runtime 已同时消费 REST 管理面与 Hocuspocus collaboration 数据面
- `apps/vbi_fe` 与 `apps/vbi_cli` 都已成为这个包的正式消费者
