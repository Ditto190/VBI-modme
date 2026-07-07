import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { h } from '@stencil/core'
import { VbiChartRender } from './vbi-chart-render'

const meta: Meta<VbiChartRender> = {
  title: 'chart/VbiChartRender',
  component: VbiChartRender,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    vseed: {
      control: 'object',
      description: 'The VSeed configuration object used to render the chart or table',
    },
  },
}

export default meta

type Story = StoryObj<VbiChartRender>

const mockVSeed = {
  chartType: 'column',
  dataset: [
    { month: 'Monday', sales: 22 },
    { month: 'Tuesday', sales: 13 },
    { month: 'Wednesday', sales: 25 },
    { month: 'Thursday', sales: 29 },
    { month: 'Friday', sales: 38 },
  ],
  config: {
    column: {
      xField: 'month',
      yField: 'sales',
    },
  },
} as any

export const Default: Story = {
  args: {
    vseed: mockVSeed,
  },
  render: (props) => {
    return <vbi-chart-render {...props} style={{ height: '300px', width: '100%', display: 'block' }}></vbi-chart-render>
  },
}
