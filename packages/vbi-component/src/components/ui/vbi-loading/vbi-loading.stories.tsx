import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { h } from '@stencil/core'
import { VbiLoading } from './vbi-loading'

const meta: Meta<VbiLoading> = {
  title: 'ui/VbiLoading',
  component: VbiLoading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<VbiLoading>

export const Default: Story = {
  render: (props, context) => {
    const currentTheme = context.globals.backgrounds?.value || 'light'

    return (
      <vbi-config-provider theme={{ mode: currentTheme }}>
        <vbi-loading {...props}></vbi-loading>
      </vbi-config-provider>
    )
  },
}
