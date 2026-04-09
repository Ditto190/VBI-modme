# @visactor/vbi-app-sdk

`@visactor/vbi-app-sdk` 是 VBI 平台级应用 SDK。

它提供三种一等 Provider：

- `ChartProvider`
- `InsightProvider`
- `ReportProvider`

以及统一的平台客户端入口：

- `createVBIPlatformClient`

这个包的职责不是定义 UI，而是为页面、CLI 和任意 JS 运行时提供一致的资源接入与 Builder 获取语义。
