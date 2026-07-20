import { LikeFilled } from '@ant-design/icons-svg'
import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiIcon',
  component: 'vbi-icon',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: { control: 'color' },
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {
    icon: LikeFilled,
    size: 24,
    color: 'var(--color-primary)',
  },
  render: (args) => {
    const el = document.createElement('vbi-icon')
    Object.assign(el, args)
    return el
  },
}
