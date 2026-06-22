import { LikeFilled } from '@ant-design/icons-svg'
import { h } from '@stencil/core'
import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { VbiIcon } from './vbi-icon'

const meta: Meta<VbiIcon> = {
  title: 'ui/VbiIcon',
  component: VbiIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: { control: 'color' },
  },
}

export default meta

type Story = StoryObj<VbiIcon>

export const Default: Story = {
  args: {
    icon: LikeFilled,
    size: '24',
    color: 'var(--color-primary)',
  },
  render: (args, context) => {
    const currentTheme = context.globals.backgrounds?.value || 'light'

    return (
      <vbi-config-provider theme={{ mode: currentTheme }}>
        <vbi-icon {...args}></vbi-icon>
      </vbi-config-provider>
    )
  },
}
