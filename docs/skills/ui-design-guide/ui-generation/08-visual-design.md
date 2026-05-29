# 08. VBI Builder 视觉设计规则

VBI builder 是高频操作工具，不是 landing page。设计目标是清晰、紧凑、稳定、可扫描。

## 总体风格

- 偏工作台，不偏营销页。
- 高信息密度，但不拥挤。
- 图表区域是主角，配置区服务于图表。
- 控件尺寸稳定，减少布局跳动。
- 明暗主题都要可读。

## 推荐布局

默认使用：

```text
左侧字段面板 + 中央图表 workspace + 配置 overlay / shelf / 右侧配置面板
```

常见变体：

- compact：左字段 + 上方 shelf + 中央图表。
- standard：左字段 + 上方 shelves + 图表。
- product：左字段 + 图表 workspace + overlay slots。

## 色彩

字段角色必须可区分：

- dimension：一种稳定冷色或绿色系。
- measure：一种稳定暖色或对比色。
- filter：第三种辅助色。
- accent：只用于主操作或当前激活状态。

避免：

- 全界面只有单一蓝紫渐变。
- 大面积装饰性渐变。
- 亮色主题里硬编码白色文字。
- 暗色主题里硬编码深色边框。

推荐用 CSS variables：

```css
.app {
  --surface: #edf1ef;
  --panel: #f5f7f6;
  --raised: #ffffff;
  --text: #172126;
  --muted: rgba(62, 72, 78, 0.64);
  --line: rgba(60, 72, 78, 0.18);
  --field-dimension: #557c1c;
  --field-measure: #95561f;
}
```

## Antd token

完整 UI 应同时使用 Antd `ConfigProvider`：

```tsx
<ConfigProvider componentSize='small' locale={antdLocale} theme={themeConfig}>
  <AppFrame />
</ConfigProvider>
```

规则：

- `componentSize='small'` 适合 VBI builder。
- `themeConfig` 与 CSS class 的 light/dark 状态保持一致。
- 组件内部优先使用 `theme.useToken()` 读取边框、圆角、颜色。

## 控件尺寸

- toolbar 高度稳定。
- token 高度稳定。
- slot 高度稳定。
- chart body 使用 `min-height: 0` 和 `height: 100%`。
- 可滚动区域必须限制在面板内部。

推荐：

```css
.panel {
  min-height: 0;
  overflow: hidden;
}

.panel-scroll {
  min-height: 0;
  overflow: auto;
}
```

## 文本处理

字段名、token、slot label 必须处理超长文本：

```css
.token-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

按钮文字不要过长。能用图标表达的 undo、redo、fullscreen、delete、settings，优先用 icon button。

## 状态设计

必须覆盖：

- initializing；
- no data；
- empty chart；
- loading VSeed；
- render error；
- loaded chart；
- schema changed。

状态 UI 不能改变主布局尺寸。loading 可以用 overlay，empty 可以在 chart body 内居中。

## 拖拽设计

拖拽 UI 要明确显示：

- 当前拖拽字段角色；
- 可投放 slot；
- 不可投放区域；
- 插入位置；
- drop 后 token 的新位置。

slot / shelf hover 状态不能改变布局尺寸，只改变背景、边框、outline。

## 不推荐

- 把说明文字铺满首屏。
- 多层 card 套 card。
- 图表放在小 preview 卡片里。
- 未加载数据时只显示空白。
- 字段列表没有搜索。
- 所有配置都放一个巨大表单里。
