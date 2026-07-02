import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { h } from '@stencil/core'
import { VbiChartEditor } from './vbi-chart-editor'
import { LocalConnector } from '../../../utils/data/localConnector'
import { VBI } from '@visactor/vbi'

const connector = new LocalConnector()
connector.register()
const emptyDsl = VBI.chart.createEmpty(connector.id)

const meta: Meta<VbiChartEditor & { dsl?: any }> = {
  title: 'chart/VbiChartEditor',
  component: VbiChartEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    dsl: {
      control: 'object',
      description: 'VBI Chart DSL configuration',
    },
  },
}

export default meta

type Story = StoryObj<VbiChartEditor & { dsl?: any }>

export const Default: Story = {
  args: {
    dsl: emptyDsl,
  },
  render: ({ dsl, ...props }) => {
    const currentBuilder = VBI.chart.create(dsl)

    setTimeout(() => {
      console.log('fdd')
      currentBuilder.locale.setLocale('en-US')
    }, 3000)

    return (
      <vbi-config-provider builder={currentBuilder}>
        <vbi-chart-editor {...props}></vbi-chart-editor>
      </vbi-config-provider>
    )
  },
}
