import { h } from '@stencil/core'
import type { Meta, StoryObj } from '@stencil/storybook-plugin'
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
  render: (props) => {
    return <vbi-loading {...props}></vbi-loading>
  },
}
