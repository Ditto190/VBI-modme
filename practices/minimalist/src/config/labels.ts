import type { DemoLocale } from 'src/constants/builder'

const zh = {
  add: '添加',
  aggregate: '聚合',
  chartType: '图表类型',
  dimensions: '维度',
  dropHere: '拖到这里',
  emptyChart: '添加字段开始分析',
  exitFullscreen: '退出全屏',
  fields: '数据字段',
  filters: '筛选器',
  filterValue: '筛选值',
  fullscreen: '全屏',
  languageChinese: '中',
  languageEnglish: 'EN',
  limit: '限制',
  loading: '正在渲染...',
  measures: '指标',
  noFilters: '暂无筛选',
  operator: '操作符',
  remove: '移除',
  rowCount: '行',
  rawDate: '原始',
  search: '搜索字段',
  themeDark: '深色',
  themeLight: '浅色',
  value: '值',
}

const en: typeof zh = {
  add: 'Add',
  aggregate: 'Aggregate',
  chartType: 'Chart type',
  dimensions: 'Dimensions',
  dropHere: 'Drop here',
  emptyChart: 'Add fields to start',
  exitFullscreen: 'Exit fullscreen',
  fields: 'Fields',
  filters: 'Filters',
  filterValue: 'Filter value',
  fullscreen: 'Fullscreen',
  languageChinese: '中',
  languageEnglish: 'EN',
  limit: 'Limit',
  loading: 'Rendering...',
  measures: 'Measures',
  noFilters: 'No filters',
  operator: 'Operator',
  remove: 'Remove',
  rowCount: 'rows',
  rawDate: 'Raw',
  search: 'Search fields',
  themeDark: 'Dark',
  themeLight: 'Light',
  value: 'Value',
}

export type MinimalLabels = ReturnType<typeof getLabels>

export const getLabels = (locale?: DemoLocale) =>
  ({
    ...(locale === 'en-US' ? en : zh),
    locale: locale === 'en-US' ? 'en-US' : 'zh-CN',
  }) as const
