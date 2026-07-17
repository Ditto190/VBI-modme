import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'chart/VbiChartRender',
  component: 'vbi-chart-render',
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

type Story = StoryObj

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
  render: (args) => {
    const el = document.createElement('vbi-chart-render')
    Object.assign(el, args)
    el.style.height = '300px'
    el.style.width = '100%'
    el.style.display = 'block'
    return el
  },
}
