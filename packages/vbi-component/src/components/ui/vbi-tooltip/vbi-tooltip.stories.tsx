import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { h } from '@stencil/core'
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
  render: (props, context) => {
    const currentTheme = context.globals.backgrounds?.value || 'light'

    return (
      <vbi-config-provider theme={{ mode: currentTheme }}>
        <vbi-tooltip {...props}>
          <vbi-button>Hover me</vbi-button>
        </vbi-tooltip>
      </vbi-config-provider>
    )
  },
}
