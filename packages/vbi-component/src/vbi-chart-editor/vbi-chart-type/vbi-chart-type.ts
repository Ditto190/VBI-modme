import type { VBIChartBuilder } from '@visactor/vbi'
import { html, nothing, svg, type PropertyValues } from 'lit'
import { property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { repeat } from 'lit/directives/repeat.js'
import { customElement, VdashElement } from 'src/shared/element'
import styles from './vbi-chart-type.style'

export type VBIChartTypeGroupKey =
  | 'table'
  | 'comparison'
  | 'trend'
  | 'proportion'
  | 'distribution'
  | 'hierarchy'
  | 'dynamic'

export type VBIChartTypeIcon =
  | 'area'
  | 'bar'
  | 'circlePacking'
  | 'column'
  | 'dualAxis'
  | 'funnel'
  | 'heatmap'
  | 'hierarchy'
  | 'line'
  | 'pie'
  | 'radar'
  | 'sankey'
  | 'scatter'
  | 'table'

export interface VBIChartTypeGroupMeta {
  key: VBIChartTypeGroupKey
  labelKey: string
  descriptionKey: string
}

export interface VBIChartTypeMeta {
  type: string
  group: VBIChartTypeGroupKey
  labelKey: string
  descriptionKey: string
  icon: VBIChartTypeIcon
}

export interface ResolvedVBIChartTypeGroup extends VBIChartTypeGroupMeta {
  label: string
  description: string
}

export interface ResolvedVBIChartTypeMeta extends VBIChartTypeMeta {
  label: string
  description: string
}

export interface VBIChartTypeChangeDetail {
  chartType: string
  type: string
}

export type VBIChartTypeText = Partial<Record<string, string>>

const DEFAULT_TEXT: Record<string, string> = {
  toolbarChartTypePanelTitle: 'Choose a chart type',
  toolbarChartTypeFallbackDescription: 'Current chart type',
  toolbarChartTypeGroupsTableLabel: 'Tables',
  toolbarChartTypeGroupsTableDescription: 'Detail views and pivots',
  toolbarChartTypeGroupsComparisonLabel: 'Comparison',
  toolbarChartTypeGroupsComparisonDescription: 'Category comparisons and dual-axis views',
  toolbarChartTypeGroupsTrendLabel: 'Trends',
  toolbarChartTypeGroupsTrendDescription: 'Change over time and cumulative motion',
  toolbarChartTypeGroupsProportionLabel: 'Proportion',
  toolbarChartTypeGroupsProportionDescription: 'Composition, share and funnel views',
  toolbarChartTypeGroupsDistributionLabel: 'Distribution',
  toolbarChartTypeGroupsDistributionDescription: 'Correlation, density and statistical spread',
  toolbarChartTypeGroupsHierarchyLabel: 'Hierarchy',
  toolbarChartTypeGroupsHierarchyDescription: 'Nested and hierarchical structures',
  toolbarChartTypeGroupsDynamicLabel: 'Animated Race',
  toolbarChartTypeGroupsDynamicDescription: 'Animated visuals across ordered time',
  toolbarChartTypeItemsTableLabel: 'Table',
  toolbarChartTypeItemsTableDescription: 'Inspect raw records',
  toolbarChartTypeItemsPivotTableLabel: 'Pivot Table',
  toolbarChartTypeItemsPivotTableDescription: 'Cross-tab summarization',
  toolbarChartTypeItemsColumnLabel: 'Column',
  toolbarChartTypeItemsColumnDescription: 'Vertical category comparison',
  toolbarChartTypeItemsColumnParallelLabel: 'Grouped Column',
  toolbarChartTypeItemsColumnParallelDescription: 'Side-by-side metrics',
  toolbarChartTypeItemsColumnPercentLabel: '100% Column',
  toolbarChartTypeItemsColumnPercentDescription: 'Show proportional shares',
  toolbarChartTypeItemsBarLabel: 'Bar',
  toolbarChartTypeItemsBarDescription: 'Better for long labels',
  toolbarChartTypeItemsBarParallelLabel: 'Grouped Bar',
  toolbarChartTypeItemsBarParallelDescription: 'Horizontal grouped comparison',
  toolbarChartTypeItemsBarPercentLabel: '100% Bar',
  toolbarChartTypeItemsBarPercentDescription: 'Horizontal proportional stack',
  toolbarChartTypeItemsDualAxisLabel: 'Dual Axis',
  toolbarChartTypeItemsDualAxisDescription: 'Compare different scales',
  toolbarChartTypeItemsLineLabel: 'Line',
  toolbarChartTypeItemsLineDescription: 'Track change over time',
  toolbarChartTypeItemsAreaLabel: 'Area',
  toolbarChartTypeItemsAreaDescription: 'Emphasize accumulated volume',
  toolbarChartTypeItemsAreaPercentLabel: '100% Area',
  toolbarChartTypeItemsAreaPercentDescription: 'Share changes over time',
  toolbarChartTypeItemsPieLabel: 'Pie',
  toolbarChartTypeItemsPieDescription: 'Part-to-whole view',
  toolbarChartTypeItemsDonutLabel: 'Donut',
  toolbarChartTypeItemsDonutDescription: 'Highlights a center metric',
  toolbarChartTypeItemsRoseLabel: 'Rose',
  toolbarChartTypeItemsRoseDescription: 'Polar proportion display',
  toolbarChartTypeItemsRoseParallelLabel: 'Grouped Rose',
  toolbarChartTypeItemsRoseParallelDescription: 'Parallel polar metrics',
  toolbarChartTypeItemsFunnelLabel: 'Funnel',
  toolbarChartTypeItemsFunnelDescription: 'Stage conversion analysis',
  toolbarChartTypeItemsScatterLabel: 'Scatter',
  toolbarChartTypeItemsScatterDescription: 'Reveal correlation',
  toolbarChartTypeItemsHeatmapLabel: 'Heatmap',
  toolbarChartTypeItemsHeatmapDescription: 'Show matrix density',
  toolbarChartTypeItemsRadarLabel: 'Radar',
  toolbarChartTypeItemsRadarDescription: 'Multi-axis scoring view',
  toolbarChartTypeItemsTreeMapLabel: 'Treemap',
  toolbarChartTypeItemsTreeMapDescription: 'Compact hierarchical layout',
  toolbarChartTypeItemsSunburstLabel: 'Sunburst',
  toolbarChartTypeItemsSunburstDescription: 'Radial hierarchy view',
  toolbarChartTypeItemsCirclePackingLabel: 'Circle Packing',
  toolbarChartTypeItemsCirclePackingDescription: 'Nested containment view',
  toolbarChartTypeItemsSankeyLabel: 'Sankey',
  toolbarChartTypeItemsSankeyDescription: 'Flow allocation between source and target nodes',
  toolbarChartTypeItemsHierarchySankeyLabel: 'Hierarchy Sankey',
  toolbarChartTypeItemsHierarchySankeyDescription: 'Hierarchical flow allocation',
  toolbarChartTypeItemsRaceBarLabel: 'Race Bar',
  toolbarChartTypeItemsRaceBarDescription: 'Ranking race over time',
  toolbarChartTypeItemsRaceColumnLabel: 'Race Column',
  toolbarChartTypeItemsRaceColumnDescription: 'Animated vertical ranking',
  toolbarChartTypeItemsRaceLineLabel: 'Race Line',
  toolbarChartTypeItemsRaceLineDescription: 'Animated trend trajectory',
  toolbarChartTypeItemsRaceScatterLabel: 'Race Scatter',
  toolbarChartTypeItemsRaceScatterDescription: 'Animated multi-metric motion',
  toolbarChartTypeItemsRacePieLabel: 'Race Pie',
  toolbarChartTypeItemsRacePieDescription: 'Animated composition share',
  toolbarChartTypeItemsRaceDonutLabel: 'Race Donut',
  toolbarChartTypeItemsRaceDonutDescription: 'Animated donut with center focus',
}

export const VBI_CHART_TYPE_GROUPS: VBIChartTypeGroupMeta[] = [
  {
    key: 'table',
    labelKey: 'toolbarChartTypeGroupsTableLabel',
    descriptionKey: 'toolbarChartTypeGroupsTableDescription',
  },
  {
    key: 'comparison',
    labelKey: 'toolbarChartTypeGroupsComparisonLabel',
    descriptionKey: 'toolbarChartTypeGroupsComparisonDescription',
  },
  {
    key: 'trend',
    labelKey: 'toolbarChartTypeGroupsTrendLabel',
    descriptionKey: 'toolbarChartTypeGroupsTrendDescription',
  },
  {
    key: 'proportion',
    labelKey: 'toolbarChartTypeGroupsProportionLabel',
    descriptionKey: 'toolbarChartTypeGroupsProportionDescription',
  },
  {
    key: 'distribution',
    labelKey: 'toolbarChartTypeGroupsDistributionLabel',
    descriptionKey: 'toolbarChartTypeGroupsDistributionDescription',
  },
  {
    key: 'hierarchy',
    labelKey: 'toolbarChartTypeGroupsHierarchyLabel',
    descriptionKey: 'toolbarChartTypeGroupsHierarchyDescription',
  },
  {
    key: 'dynamic',
    labelKey: 'toolbarChartTypeGroupsDynamicLabel',
    descriptionKey: 'toolbarChartTypeGroupsDynamicDescription',
  },
]

export const VBI_CHART_TYPE_METAS: VBIChartTypeMeta[] = [
  {
    type: 'table',
    group: 'table',
    labelKey: 'toolbarChartTypeItemsTableLabel',
    descriptionKey: 'toolbarChartTypeItemsTableDescription',
    icon: 'table',
  },
  {
    type: 'pivotTable',
    group: 'table',
    labelKey: 'toolbarChartTypeItemsPivotTableLabel',
    descriptionKey: 'toolbarChartTypeItemsPivotTableDescription',
    icon: 'hierarchy',
  },
  {
    type: 'column',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsColumnLabel',
    descriptionKey: 'toolbarChartTypeItemsColumnDescription',
    icon: 'column',
  },
  {
    type: 'columnParallel',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsColumnParallelLabel',
    descriptionKey: 'toolbarChartTypeItemsColumnParallelDescription',
    icon: 'column',
  },
  {
    type: 'columnPercent',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsColumnPercentLabel',
    descriptionKey: 'toolbarChartTypeItemsColumnPercentDescription',
    icon: 'column',
  },
  {
    type: 'bar',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsBarLabel',
    descriptionKey: 'toolbarChartTypeItemsBarDescription',
    icon: 'bar',
  },
  {
    type: 'barParallel',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsBarParallelLabel',
    descriptionKey: 'toolbarChartTypeItemsBarParallelDescription',
    icon: 'bar',
  },
  {
    type: 'barPercent',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsBarPercentLabel',
    descriptionKey: 'toolbarChartTypeItemsBarPercentDescription',
    icon: 'bar',
  },
  {
    type: 'dualAxis',
    group: 'comparison',
    labelKey: 'toolbarChartTypeItemsDualAxisLabel',
    descriptionKey: 'toolbarChartTypeItemsDualAxisDescription',
    icon: 'dualAxis',
  },
  {
    type: 'line',
    group: 'trend',
    labelKey: 'toolbarChartTypeItemsLineLabel',
    descriptionKey: 'toolbarChartTypeItemsLineDescription',
    icon: 'line',
  },
  {
    type: 'area',
    group: 'trend',
    labelKey: 'toolbarChartTypeItemsAreaLabel',
    descriptionKey: 'toolbarChartTypeItemsAreaDescription',
    icon: 'area',
  },
  {
    type: 'areaPercent',
    group: 'trend',
    labelKey: 'toolbarChartTypeItemsAreaPercentLabel',
    descriptionKey: 'toolbarChartTypeItemsAreaPercentDescription',
    icon: 'area',
  },
  {
    type: 'pie',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsPieLabel',
    descriptionKey: 'toolbarChartTypeItemsPieDescription',
    icon: 'pie',
  },
  {
    type: 'donut',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsDonutLabel',
    descriptionKey: 'toolbarChartTypeItemsDonutDescription',
    icon: 'pie',
  },
  {
    type: 'rose',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsRoseLabel',
    descriptionKey: 'toolbarChartTypeItemsRoseDescription',
    icon: 'pie',
  },
  {
    type: 'roseParallel',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsRoseParallelLabel',
    descriptionKey: 'toolbarChartTypeItemsRoseParallelDescription',
    icon: 'radar',
  },
  {
    type: 'funnel',
    group: 'proportion',
    labelKey: 'toolbarChartTypeItemsFunnelLabel',
    descriptionKey: 'toolbarChartTypeItemsFunnelDescription',
    icon: 'funnel',
  },
  {
    type: 'scatter',
    group: 'distribution',
    labelKey: 'toolbarChartTypeItemsScatterLabel',
    descriptionKey: 'toolbarChartTypeItemsScatterDescription',
    icon: 'scatter',
  },
  {
    type: 'heatmap',
    group: 'distribution',
    labelKey: 'toolbarChartTypeItemsHeatmapLabel',
    descriptionKey: 'toolbarChartTypeItemsHeatmapDescription',
    icon: 'heatmap',
  },
  {
    type: 'radar',
    group: 'distribution',
    labelKey: 'toolbarChartTypeItemsRadarLabel',
    descriptionKey: 'toolbarChartTypeItemsRadarDescription',
    icon: 'radar',
  },
  {
    type: 'treeMap',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsTreeMapLabel',
    descriptionKey: 'toolbarChartTypeItemsTreeMapDescription',
    icon: 'hierarchy',
  },
  {
    type: 'sunburst',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsSunburstLabel',
    descriptionKey: 'toolbarChartTypeItemsSunburstDescription',
    icon: 'hierarchy',
  },
  {
    type: 'circlePacking',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsCirclePackingLabel',
    descriptionKey: 'toolbarChartTypeItemsCirclePackingDescription',
    icon: 'circlePacking',
  },
  {
    type: 'sankey',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsSankeyLabel',
    descriptionKey: 'toolbarChartTypeItemsSankeyDescription',
    icon: 'sankey',
  },
  {
    type: 'hierarchySankey',
    group: 'hierarchy',
    labelKey: 'toolbarChartTypeItemsHierarchySankeyLabel',
    descriptionKey: 'toolbarChartTypeItemsHierarchySankeyDescription',
    icon: 'sankey',
  },
  {
    type: 'raceBar',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceBarLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceBarDescription',
    icon: 'bar',
  },
  {
    type: 'raceColumn',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceColumnLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceColumnDescription',
    icon: 'column',
  },
  {
    type: 'raceLine',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceLineLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceLineDescription',
    icon: 'line',
  },
  {
    type: 'raceScatter',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceScatterLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceScatterDescription',
    icon: 'scatter',
  },
  {
    type: 'racePie',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRacePieLabel',
    descriptionKey: 'toolbarChartTypeItemsRacePieDescription',
    icon: 'pie',
  },
  {
    type: 'raceDonut',
    group: 'dynamic',
    labelKey: 'toolbarChartTypeItemsRaceDonutLabel',
    descriptionKey: 'toolbarChartTypeItemsRaceDonutDescription',
    icon: 'pie',
  },
]

export const VBI_CHART_TYPE_META_MAP = Object.fromEntries(
  VBI_CHART_TYPE_METAS.map((meta) => [meta.type, meta]),
) as Record<string, VBIChartTypeMeta>

export const DEFAULT_AVAILABLE_CHART_TYPES = [
  'table',
  'pivotTable',
  'column',
  'columnParallel',
  'columnPercent',
  'bar',
  'barParallel',
  'barPercent',
  'line',
  'area',
  'areaPercent',
  'dualAxis',
  'scatter',
  'pie',
  'donut',
  'rose',
  'roseParallel',
  'radar',
  'funnel',
  'heatmap',
  'treeMap',
  'sunburst',
  'circlePacking',
  'sankey',
  'hierarchySankey',
  'raceBar',
  'raceColumn',
  'raceLine',
  'raceScatter',
  'racePie',
  'raceDonut',
]

const translate = (key: string, text?: VBIChartTypeText): string => {
  return text?.[key] ?? DEFAULT_TEXT[key] ?? key
}

const showTextConverter = {
  fromAttribute: (value: string | null): boolean => {
    return value === null ? true : value !== 'false' && value !== '0'
  },
}

export const getVBIChartTypeGroups = (text?: VBIChartTypeText): ResolvedVBIChartTypeGroup[] => {
  return VBI_CHART_TYPE_GROUPS.map((group) => ({
    ...group,
    label: translate(group.labelKey, text),
    description: translate(group.descriptionKey, text),
  }))
}

export const getVBIChartTypeMeta = (chartType: string, text?: VBIChartTypeText): ResolvedVBIChartTypeMeta => {
  const meta = VBI_CHART_TYPE_META_MAP[chartType]

  if (!meta) {
    return {
      type: chartType,
      group: 'distribution',
      labelKey: chartType,
      descriptionKey: 'toolbarChartTypeFallbackDescription',
      icon: 'scatter',
      label: chartType,
      description: translate('toolbarChartTypeFallbackDescription', text),
    }
  }

  return {
    ...meta,
    label: translate(meta.labelKey, text),
    description: translate(meta.descriptionKey, text),
  }
}

const iconSvg = (icon: VBIChartTypeIcon) => {
  switch (icon) {
    case 'area':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16"/><path d="M5 16l4-6 4 3 5-7v10z"/></svg>`
    case 'bar':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h14"/><path d="M4 12h16"/><path d="M4 18h10"/></svg>`
    case 'circlePacking':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="9" cy="10" r="2.5"/><circle cx="14" cy="9" r="2"/><circle cx="14" cy="15" r="3"/></svg>`
    case 'column':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h16"/><path d="M7 17V9"/><path d="M12 17V5"/><path d="M17 17v-6"/></svg>`
    case 'dualAxis':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V5"/><path d="M19 19V5"/><path d="M5 18h14"/><path d="M7 14l4-5 3 3 3-5"/><path d="M7 16h3"/><path d="M12 16h3"/></svg>`
    case 'funnel':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16l-6 7v5l-4 2v-7z"/></svg>`
    case 'heatmap':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h5v5H5z"/><path d="M14 5h5v5h-5z"/><path d="M5 14h5v5H5z"/><path d="M14 14h5v5h-5z"/></svg>`
    case 'hierarchy':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7v6H4z"/><path d="M13 5h7v4h-7z"/><path d="M13 11h7v8h-7z"/><path d="M4 13h7v6H4z"/></svg>`
    case 'line':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16"/><path d="M5 15l4-5 4 3 5-7"/></svg>`
    case 'pie':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4a8 8 0 108 8h-8z"/><path d="M13 3v8h8a8 8 0 00-8-8z"/></svg>`
    case 'radar':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l7 5v7l-7 4-7-4V9z"/><path d="M12 8l4 3v4l-4 2-4-2v-4z"/><path d="M12 4v16"/><path d="M5 9l14 7"/><path d="M19 9L5 16"/></svg>`
    case 'sankey':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7c6 0 7 10 16 10"/><path d="M4 17c5 0 7-10 16-10"/><path d="M4 7v4"/><path d="M4 15v4"/><path d="M20 5v4"/><path d="M20 15v4"/></svg>`
    case 'scatter':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="15" r="1.8"/><circle cx="11" cy="9" r="1.8"/><circle cx="16" cy="14" r="1.8"/><circle cx="18" cy="7" r="1.8"/><path d="M4 20h16"/></svg>`
    case 'table':
      return svg`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z"/><path d="M4 10h16"/><path d="M4 15h16"/><path d="M10 5v14"/><path d="M16 5v14"/></svg>`
  }
}

/**
 * Chart type selector for the VBI chart editor.
 *
 * @tag vbi-chart-type
 *
 * @prop {VBIChartBuilder} builder - Optional VBI chart builder used as the source of truth.
 * @prop {string} chartType - Selected chart type when no builder is provided.
 * @prop {string[]} availableChartTypes - Available chart types when no builder is provided.
 * @prop {boolean} compact - Render the compact toolbar trigger.
 * @prop {boolean} showText - Show label text in the trigger.
 * @prop {VBIChartTypeText} text - Text override map keyed by the toolbar i18n keys.
 *
 * @cssprop [--vbi-chart-type-font-family] - Font family used by the selector.
 * @cssprop [--vbi-chart-type-bg] - Surface background color of trigger, cards, and panel.
 * @cssprop [--vbi-chart-type-text] - Primary text color.
 * @cssprop [--vbi-chart-type-text-secondary] - Secondary text color.
 * @cssprop [--vbi-chart-type-border] - Trigger border color.
 * @cssprop [--vbi-chart-type-border-secondary] - Card border color.
 * @cssprop [--vbi-chart-type-primary] - Accent color for selected and focus states.
 * @cssprop [--vbi-chart-type-primary-bg] - Accent background color.
 * @cssprop [--vbi-chart-type-primary-border] - Accent border color.
 * @cssprop [--vbi-chart-type-radius] - Base corner radius.
 * @cssprop [--vbi-chart-type-radius-lg] - Large corner radius.
 * @cssprop [--vbi-chart-type-shadow] - Floating panel shadow.
 *
 * @fires vbi-chart-type-change - Fired after a chart type is selected.
 */
@customElement('vbi-chart-type')
export class VBIChartType extends VdashElement {
  static override get observedAttributes() {
    const attributes = super.observedAttributes
    return attributes.includes('show-text') ? attributes : [...attributes, 'show-text']
  }

  static override get styles() {
    return styles
  }

  @property({ attribute: false }) accessor builder: VBIChartBuilder | undefined
  @property({ type: String, attribute: 'chart-type' }) accessor chartType = 'table'
  @property({ type: Array, attribute: false }) accessor availableChartTypes: string[] = DEFAULT_AVAILABLE_CHART_TYPES
  @property({ type: Boolean }) accessor compact = false
  @property({ attribute: 'show-text', converter: showTextConverter }) accessor showText = true
  @property({ attribute: false }) accessor text: VBIChartTypeText = {}

  @state() private accessor _open = false
  @state() private accessor _builderChartType = 'table'
  @state() private accessor _builderAvailableChartTypes: string[] = DEFAULT_AVAILABLE_CHART_TYPES

  private _stopBuilderObserve: (() => void) | undefined

  override attributeChangedCallback(name: string, oldValue: string | null, value: string | null): void {
    super.attributeChangedCallback(name, oldValue, value)

    if (name === 'show-text' && oldValue !== value) {
      this.showText = value === null ? true : value !== 'false' && value !== '0'
    }
  }

  override connectedCallback(): void {
    super.connectedCallback()
    this._syncShowTextAttribute()
    document.addEventListener('click', this._handleDocumentClick)
    document.addEventListener('keydown', this._handleDocumentKeydown)
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback()
    this._stopBuilderObserve?.()
    this._stopBuilderObserve = undefined
    document.removeEventListener('click', this._handleDocumentClick)
    document.removeEventListener('keydown', this._handleDocumentKeydown)
  }

  protected override willUpdate(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('builder')) {
      this._bindBuilder()
    }
  }

  private get _currentChartType(): string {
    return this.builder ? this._builderChartType : this.chartType
  }

  private get _availableChartTypes(): string[] {
    return this.builder ? this._builderAvailableChartTypes : this.availableChartTypes
  }

  private get _panelTitle(): string {
    return translate('toolbarChartTypePanelTitle', this.text)
  }

  private _syncShowTextAttribute(): void {
    if (!this.hasAttribute('show-text')) {
      return
    }

    const value = this.getAttribute('show-text')
    this.showText = value !== 'false' && value !== '0'
  }

  private _bindBuilder(): void {
    this._stopBuilderObserve?.()
    this._stopBuilderObserve = undefined

    if (!this.builder) {
      return
    }

    this._syncFromBuilder()
    this._stopBuilderObserve = this.builder.chartType.observe(() => {
      this._syncFromBuilder()
    })
  }

  private _syncFromBuilder(): void {
    if (!this.builder) {
      return
    }

    this._builderChartType = this.builder.chartType.getChartType()
    this._builderAvailableChartTypes = this.builder.chartType.getAvailableChartTypes()
  }

  private _handleDocumentClick = (event: MouseEvent): void => {
    if (!this._open || event.composedPath().includes(this)) {
      return
    }

    this._open = false
  }

  private _handleDocumentKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this._open = false
    }
  }

  private _togglePanel = (): void => {
    this._open = !this._open
  }

  private _selectChartType(type: string): void {
    if (this.builder) {
      this._builderChartType = type
      this.builder.chartType.changeChartType(type)
    } else {
      this.chartType = type
    }

    this._open = false
    this.dispatchEvent(
      new CustomEvent<VBIChartTypeChangeDetail>('vbi-chart-type-change', {
        detail: { chartType: type, type },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _groupedChartTypes() {
    const availableTypes = this._availableChartTypes
    return getVBIChartTypeGroups(this.text)
      .map((group) => ({
        ...group,
        items: availableTypes
          .map((type) => getVBIChartTypeMeta(type, this.text))
          .filter((meta) => meta.group === group.key),
      }))
      .filter((group) => group.items.length > 0)
  }

  private _renderIcon(icon: VBIChartTypeIcon) {
    return html`<span class="chart-icon">${iconSvg(icon)}</span>`
  }

  private _renderCard(meta: ResolvedVBIChartTypeMeta) {
    const selected = this._currentChartType === meta.type
    const tooltip = `${meta.label}: ${meta.description}`

    return html`
      <button
        class="card"
        type="button"
        title=${tooltip}
        aria-label=${tooltip}
        ?data-selected=${selected}
        @click=${() => this._selectChartType(meta.type)}
      >
        ${this._renderIcon(meta.icon)}
        <span class="card__label">${meta.label}</span>
      </button>
    `
  }

  private _renderPanel() {
    if (!this._open) {
      return nothing
    }

    const groups = this._groupedChartTypes()

    return html`
      <div class="panel" role="dialog" aria-label=${this._panelTitle}>
        <div class="panel__title">${this._panelTitle}</div>
        ${groups.length > 0
          ? html`
              <div class="panel__groups">
                ${repeat(
                  groups,
                  (group) => group.key,
                  (group) => html`
                    <section class="group">
                      <div class="group__heading" title=${group.description}>${group.label}</div>
                      <div class="group__grid">
                        ${repeat(
                          group.items,
                          (item) => item.type,
                          (item) => this._renderCard(item),
                        )}
                      </div>
                    </section>
                  `,
                )}
              </div>
            `
          : html`<div class="panel__empty">No chart types available</div>`}
      </div>
    `
  }

  override render() {
    const currentChartMeta = getVBIChartTypeMeta(this._currentChartType, this.text)
    const triggerTooltip = `${currentChartMeta.label}: ${currentChartMeta.description}`
    const triggerClasses = classMap({
      trigger: true,
      'trigger--compact': this.compact,
      'trigger--without-text': !this.showText,
    })

    return html`
      <div class="chart-type">
        <button
          class=${triggerClasses}
          type="button"
          title=${triggerTooltip}
          aria-label=${triggerTooltip}
          aria-haspopup="dialog"
          aria-expanded=${this._open ? 'true' : 'false'}
          @click=${this._togglePanel}
        >
          ${this._renderIcon(currentChartMeta.icon)}
          ${this.showText
            ? html`
                <span class="trigger__content">
                  <span class="trigger__label">${currentChartMeta.label}</span>
                  ${this.compact
                    ? nothing
                    : html`<span class="trigger__description">${currentChartMeta.description}</span>`}
                </span>
              `
            : nothing}
        </button>
        ${this._renderPanel()}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vbi-chart-type': VBIChartType
  }
}
