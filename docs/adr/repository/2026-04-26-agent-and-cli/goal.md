我在想，让agent和cli剥离实现，agent作为独立包，操作agent。

1. cli 负责对接provider，操作平台资源，处理具体的app业务逻辑。
2. agent 只负责获取builder，然后操作builder。

背后的目标是，让packages的原子组件可以开源出去，不和app 平台绑定。

因此, 我们应该怎么做才合适？
