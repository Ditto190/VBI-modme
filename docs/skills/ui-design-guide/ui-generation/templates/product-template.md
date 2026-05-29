# Product 模板

参考：`practices/professional`

适合生成产品级 VBI 编辑器。目标是让图表工作区成为主区域，字段、配置、筛选、拖拽围绕它服务。

## 文件结构

```text
src/
  App.tsx
  App.css
  components/
    Editor/
      ProfessionalEditor.tsx
      useProfessionalEditorModel.ts
      EditorFrame.tsx
      EditorContent.tsx
      LeftDataPanel.tsx
      FieldBrowser.tsx
      FieldGroup.tsx
      FieldToken.tsx
      SlotFieldToken.tsx
      ChartWorkspace.tsx
      ChartToolbar.tsx
      ChartFilters.tsx
      ConfigOverlay.tsx
      SlotDropZone.tsx
      dnd/
    Filter/
      FilterPanel.tsx
      HavingFilterPanel.tsx
      FilterModal.tsx
      HavingFilterModal.tsx
      FilterChip.tsx
      RootOperatorControl.tsx
    Render/
      VSeedRender.tsx
      renderVSeed.ts
      index.ts
  config/
    slotConfig.ts
    themeConfig.ts
    labels.ts
    encodingLabels.ts
  hooks/
  model/
  utils/
  styles/
```

## 组件组合

```text
APP
  -> VBIStoreProvider
  -> ProfessionalEditor
      -> useInitializeProfessional
      -> useProfessionalEditorModel
      -> EditorFrame
          -> ProfessionalDndProvider
          -> LeftDataPanel
          -> ChartWorkspace
              -> ChartToolbar
              -> ChartFilters
              -> VSeedRender
              -> ConfigOverlay
```

## 推荐特点

- `useProfessionalEditorModel` 集中派生 props，让组件保持展示职责。
- `EditorFrame` 统一 theme、locale、mode、fullscreen。
- `ConfigOverlay` 根据空状态、拖拽、手动打开显示。
- slot drop target 随图表类型动态变化。
- 字段 token 支持菜单动作：rename、aggregate、format、sort、remove。
- Filter 体系独立，支持 WHERE 和 HAVING。

## 适合 agent 生成时采用

- 用户要求“完整 UI”或“产品级体验”。
- 需要 drag/drop 映射字段。
- 需要 overlay 配置。
- 需要复杂筛选、撤销/重做、主题、国际化。

## 不要简化掉

- `EditorFrame`：否则 theme/locale/fullscreen 会散落。
- `useProfessionalEditorModel`：否则组件会充满状态拼装逻辑。
- `ConfigOverlay`：这是 product 模板区别于普通三栏 UI 的关键。
- `VSeedRender` cleanup：否则会泄漏图表实例。
