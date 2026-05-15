import {
  BarChartOutlined,
  DotChartOutlined,
  LineChartOutlined,
  NodeIndexOutlined,
  PieChartOutlined,
  TableOutlined,
} from '@ant-design/icons'
import type { VBIChartBuilder, VBIChartDSL } from '@visactor/vbi'
import { Select } from 'antd'
import { useState } from 'react'
import type { StreamLabels } from 'src/i18n'
import { ConfigSection } from './ConfigSection'
import { FilterSection } from './FilterSection'
import { MappingSlot } from './MappingSlot'
import { getEncodingSlots, getFacetSlots } from './slotConfig'
import type { SchemaField } from 'src/types'

type ConfigPanelProps = {
  builder: VBIChartBuilder
  dsl: VBIChartDSL
  fields: SchemaField[]
  labels: StreamLabels
}
type SectionKey = 'chartType' | 'encodings' | 'facet' | 'filters'

const chartIconByType = (type: string) => {
  if (type.includes('table')) return <TableOutlined />
  if (type.includes('pie') || type.includes('donut')) return <PieChartOutlined />
  if (type.includes('line') || type.includes('area')) return <LineChartOutlined />
  if (type.includes('scatter')) return <DotChartOutlined />
  if (type.toLowerCase().includes('sankey') || type.includes('tree') || type.includes('sunburst')) {
    return <NodeIndexOutlined />
  }
  return <BarChartOutlined />
}

type SlotProps = Omit<ConfigPanelProps, 'dsl'> & {
  dimensions: VBIChartDSL['dimensions']
  measures: VBIChartDSL['measures']
}

const renderSlot =
  ({ builder, dimensions, fields, labels, measures }: SlotProps) =>
  (slot: ReturnType<typeof getEncodingSlots>[number]) => (
    <MappingSlot
      key={`${slot.title}-${slot.dimensionEncoding ?? ''}-${slot.measureEncoding ?? ''}`}
      builder={builder}
      dimensions={dimensions.filter((dimension) => 'field' in dimension)}
      fields={fields}
      labels={labels}
      measures={measures.filter((measure) => 'field' in measure)}
      slot={slot}
    />
  )

export const ConfigPanel = (props: ConfigPanelProps) => {
  const { builder, dsl, labels } = props
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    chartType: true,
    encodings: true,
    facet: false,
    filters: true,
  })
  const facetSlots = getFacetSlots(builder, labels)
  const slotProps = { builder, fields: props.fields, labels, dimensions: dsl.dimensions, measures: dsl.measures }
  const toggleSection = (key: SectionKey) => setOpenSections((value) => ({ ...value, [key]: !value[key] }))

  return (
    <aside className='stream-panel stream-panel--config'>
      <header className='stream-config-head'>
        <strong>{labels.config}</strong>
      </header>
      <div className='stream-config-scroll'>
        <ConfigSection
          title={labels.chartType}
          open={openSections.chartType}
          onToggle={() => toggleSection('chartType')}
        >
          <Select
            className='stream-chart-type'
            value={dsl.chartType}
            options={builder.chartType.getAvailableChartTypes().map((type) => ({
              label: (
                <span className='stream-chart-type-option'>
                  {chartIconByType(type)}
                  {type}
                </span>
              ),
              value: type,
            }))}
            onChange={(type) => builder.chartType.changeChartType(type)}
          />
        </ConfigSection>
        <ConfigSection
          title={labels.encodings}
          open={openSections.encodings}
          onToggle={() => toggleSection('encodings')}
        >
          {getEncodingSlots(builder, labels).map(renderSlot(slotProps))}
        </ConfigSection>
        <ConfigSection title={labels.filters} open={openSections.filters} onToggle={() => toggleSection('filters')}>
          <FilterSection builder={builder} dsl={dsl} fields={props.fields} labels={labels} />
        </ConfigSection>
        {facetSlots.length > 0 && (
          <ConfigSection title={labels.facet} open={openSections.facet} onToggle={() => toggleSection('facet')}>
            {facetSlots.map(renderSlot(slotProps))}
          </ConfigSection>
        )}
      </div>
    </aside>
  )
}
