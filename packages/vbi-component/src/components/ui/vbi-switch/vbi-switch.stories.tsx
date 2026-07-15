import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { h } from '@stencil/core'
import { VbiSwitch } from './vbi-switch'

const meta: Meta<VbiSwitch> = {
  title: 'ui/VbiSwitch',
  component: VbiSwitch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<VbiSwitch>

export const Default: Story = {
  render: (props) => {
    return <vbi-switch {...props}></vbi-switch>
  },
}
