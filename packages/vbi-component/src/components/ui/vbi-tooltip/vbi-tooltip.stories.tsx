import { h } from '@stencil/core'
import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { VbiTooltip } from './vbi-tooltip'

const meta: Meta<VbiTooltip> = {
  title: 'ui/VbiTooltip',
  component: VbiTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<VbiTooltip>

export const Default: Story = {
  args: {
    text: 'Simple tooltip',
    position: 'top',
    open: false,
  },
  render: (props) => {
    return (
      <vbi-tooltip {...props}>
        <vbi-button>Hover me</vbi-button>
      </vbi-tooltip>
    )
  },
}
