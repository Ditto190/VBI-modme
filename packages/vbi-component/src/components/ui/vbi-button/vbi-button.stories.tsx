import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { h } from '@stencil/core'
import { VbiButton } from './vbi-button'

const meta: Meta<VbiButton> = {
  title: 'ui/VbiButton',
  component: VbiButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<VbiButton>

export const Default: Story = {
  render: (props) => {
    return <vbi-button {...props}>Test</vbi-button>
  },
}
