import type { Meta, StoryObj } from '@stencil/storybook-plugin'
import { h } from '@stencil/core'
import { VbiCheckbox } from './vbi-checkbox'

const meta: Meta<VbiCheckbox> = {
  title: 'ui/VbiCheckbox',
  component: VbiCheckbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<VbiCheckbox>

export const Default: Story = {
  render: (props) => {
    return <vbi-checkbox {...props}></vbi-checkbox>
  },
}
