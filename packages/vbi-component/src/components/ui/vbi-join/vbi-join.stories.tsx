import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { h } from '@stencil/core'
import { VbiJoin } from './vbi-join'

const meta: Meta<VbiJoin> = {
  title: 'ui/VbiJoin',
  component: VbiJoin,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<VbiJoin>

export const Default: Story = {
  render: (props, context) => {
    const currentTheme = context.globals.backgrounds?.value || 'light'

    return (
      <vbi-config-provider theme={{ mode: currentTheme }}>
        <vbi-join {...props}>
          <vbi-button>Button</vbi-button>
          <vbi-button>Button</vbi-button>
          <vbi-button>Button</vbi-button>
        </vbi-join>
      </vbi-config-provider>
    )
  },
}
