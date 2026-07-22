/// <reference types="vite/client" />
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
    const locale = import.meta.env.STORYBOOK_LOCALE ?? 'en-US'

    const provider = document.createElement('vbi-config-provider')
    const editor = document.createElement('vbi-chart-editor')
    Object.assign(editor, args)

    provider.addEventListener('vbiBuilderChange', ((e: CustomEvent) => {
      e.detail.locale.setLocale(locale)
    }) as EventListener)

    provider.appendChild(editor)
    return provider
  },
}
