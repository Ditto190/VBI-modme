import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  component: 'vbi-chart-editor',
  title: 'chart/VbiChartEditor',
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: (args) => {
    const provider = document.createElement('vbi-config-provider')
    const editor = document.createElement('vbi-chart-editor')
    Object.assign(editor, args)
    provider.appendChild(editor)
    return provider
  },
}
