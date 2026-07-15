import { h } from '@stencil/core'
import type { Meta, StoryObj } from '@stencil/storybook-plugin'
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
  render: (props) => {
    return (
      <vbi-join {...props}>
        <vbi-button>Button</vbi-button>
        <vbi-button>Button</vbi-button>
        <vbi-button>Button</vbi-button>
      </vbi-join>
    )
  },
}
