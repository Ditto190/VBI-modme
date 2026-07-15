import { h } from '@stencil/core'
import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { VbiTab } from './vbi-tab'

const meta: Meta<VbiTab> = {
  title: 'ui/VbiTab',
  component: VbiTab,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<VbiTab>

export const Default: Story = {
  args: {
    items: [
      {
        id: 'tab-1',
        label: 'Overview',
        active: true,
      },
      {
        id: 'tab-2',
        label: 'Analytics',
      },
      {
        id: 'tab-3',
        label: 'Settings',
      },
      {
        id: 'tab-4',
        label: 'Disabled',
        disabled: true,
      },
    ],
  },
  render: (props) => {
    return <vbi-tab {...props} />
  },
}
