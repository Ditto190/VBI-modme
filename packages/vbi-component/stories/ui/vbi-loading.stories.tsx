import type { Meta, StoryObj } from '@storybook/web-components-vite'

const meta: Meta = {
  title: 'ui/VbiLoading',
  component: 'vbi-loading',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity'],
    },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'],
    },
  },
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: { type: 'spinner', size: 'md', color: 'primary' },
}
